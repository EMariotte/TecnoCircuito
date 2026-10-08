// Solucionador eléctrico por análisis nodal modificado (MNA), con Newton-Raphson para diodos y LED.
// No toca la página: corre igual en el navegador y en Node.
//
// La red se escribe como A·x = b:
//   x = [voltaje de cada nodo …, corriente de cada fuente de voltaje …]
//   cada fila de nodo es la ley de corrientes de Kirchhoff: lo que sale por los elementos = lo que se inyecta.
// Tierra (GND) es la referencia de 0 V y no tiene fila: en los elementos se escribe como el nodo −1.

export const VT = 0.025693; // voltaje térmico a 25 °C (k·T/q), en voltios
const GMIN = 1e-12; // conductancia mínima de cada nodo a tierra: un nodo al aire no deja la matriz sin solución

// ---- Ayudas para «sellar» (estampar) cada elemento en A y b

function sellarG(A, a, b, g) {
  if (a >= 0) A[a][a] += g;
  if (b >= 0) A[b][b] += g;
  if (a >= 0 && b >= 0) {
    A[a][b] -= g;
    A[b][a] -= g;
  }
}

function inyectar(B, nodo, corriente) {
  if (nodo >= 0) B[nodo] += corriente;
}

const voltaje = (x, nodo) => (nodo >= 0 ? x[nodo] : 0);

// ---- Elementos

// Resistencia entre los nodos a y b.
export function resistencia(a, b, ohmios) {
  return {
    a,
    b,
    g: 1 / ohmios,
    sellar(A) {
      sellarG(A, this.a, this.b, this.g);
    },
    corriente(x) {
      return (voltaje(x, this.a) - voltaje(x, this.b)) * this.g; // de a hacia b
    },
  };
}

// Fuente con resistencia interna (equivalente de Norton) entre `nodo` y tierra. Así se modela un pin del chip:
// en ALTO, 5 V detrás de unos 25 Ω. Con g = 0 el pin queda «al aire» (entrada).
export function fuenteConResistencia(nodo) {
  return {
    nodo,
    v: 0,
    g: 0,
    sellar(A, B) {
      sellarG(A, this.nodo, -1, this.g);
      inyectar(B, this.nodo, this.v * this.g);
    },
    corriente(x) {
      return (this.v - voltaje(x, this.nodo)) * this.g; // lo que el pin entrega al circuito
    },
  };
}

// Fuente de voltaje ideal entre `nodo` y tierra (5 V y 3,3 V de la placa). Agrega una fila a la matriz:
// la incógnita de esa fila es la corriente que pasa por la fuente. `fila` se asigna al cerrar la red.
export function fuenteVoltaje(nodo, voltios) {
  return {
    nodo,
    v: voltios,
    fila: -1,
    sellar(A, B) {
      A[this.nodo][this.fila] += 1;
      A[this.fila][this.nodo] += 1;
      B[this.fila] += this.v;
    },
    corriente(x) {
      return -x[this.fila]; // lo que la fuente entrega al circuito
    },
  };
}

// Diodo (la unión de un LED) entre ánodo a y cátodo k, con la ecuación de Shockley: I = Is·(e^(V/(n·VT)) − 1).
// Es no lineal: en cada vuelta de Newton-Raphson se reemplaza por una recta que toca la curva en el voltaje
// actual (una conductancia g y una fuente de corriente ieq), y se resuelve otra vez hasta que no cambie.
export function diodo(a, k, { Is, n }) {
  const vt = n * VT;
  const vcrit = vt * Math.log(vt / (Math.SQRT2 * Is));
  return {
    a,
    k,
    noLineal: true,
    vd: 0, // voltaje con el que se linealiza; se conserva entre soluciones para arrancar cerca
    sellar(A, B) {
      const e = Math.exp(this.vd / vt);
      const id = Is * (e - 1);
      const g = (Is * e) / vt + GMIN;
      const ieq = id - g * this.vd;
      sellarG(A, this.a, this.k, g);
      inyectar(B, this.a, -ieq);
      inyectar(B, this.k, ieq);
    },
    // Toma la solución nueva y prepara la siguiente vuelta. Devuelve cuánto se movió el voltaje.
    actualizar(x) {
      const nuevo = voltaje(x, this.a) - voltaje(x, this.k);
      const movimiento = Math.abs(nuevo - this.vd);
      this.vd = limitarUnion(nuevo, this.vd, vt, vcrit);
      return movimiento;
    },
    corriente(x) {
      const v = voltaje(x, this.a) - voltaje(x, this.k);
      return Is * Math.expm1(v / vt);
    },
  };
}

// Limita el salto del voltaje de la unión entre vueltas (la misma idea de «pnjlim» de SPICE).
// Sin esto, un salto de 0 a 3 V hace e^(3/0,05) ≈ 10^26 y Newton-Raphson se dispara.
function limitarUnion(nuevo, anterior, vt, vcrit) {
  if (nuevo > vcrit && Math.abs(nuevo - anterior) > 2 * vt) {
    if (anterior > 0) {
      const arg = 1 + (nuevo - anterior) / vt;
      return arg > 0 ? anterior + vt * Math.log(arg) : vcrit;
    }
    return vt * Math.log(nuevo / vt);
  }
  return nuevo;
}

// ---- Resolver

// red = { nodos, fuentes, elementos }. Devuelve { x, iteraciones, convergio }.
export function resolver(red, { maxIter = 200, tolerancia = 1e-9 } = {}) {
  const N = red.nodos + red.fuentes;
  const noLineales = red.elementos.filter((e) => e.noLineal);
  let x = new Float64Array(N);
  for (let it = 1; it <= maxIter; it++) {
    const A = Array.from({ length: N }, () => new Float64Array(N));
    const B = new Float64Array(N);
    for (const e of red.elementos) e.sellar(A, B);
    for (let i = 0; i < red.nodos; i++) A[i][i] += GMIN;
    x = gauss(A, B);
    if (!noLineales.length) return { x, iteraciones: it, convergio: true }; // lineal: basta una vuelta
    let movimiento = 0;
    for (const e of noLineales) movimiento = Math.max(movimiento, e.actualizar(x));
    if (movimiento < tolerancia) return { x, iteraciones: it, convergio: true };
  }
  return { x, iteraciones: maxIter, convergio: false };
}

// Eliminación de Gauss con pivoteo parcial. Las redes del aula tienen pocas decenas de incógnitas.
function gauss(A, B) {
  const N = B.length;
  for (let c = 0; c < N; c++) {
    let p = c;
    for (let f = c + 1; f < N; f++) if (Math.abs(A[f][c]) > Math.abs(A[p][c])) p = f;
    if (Math.abs(A[p][c]) < 1e-15) throw new Error('La red no tiene solución (dos fuentes en corto).');
    [A[c], A[p]] = [A[p], A[c]];
    [B[c], B[p]] = [B[p], B[c]];
    for (let f = c + 1; f < N; f++) {
      const m = A[f][c] / A[c][c];
      if (!m) continue;
      for (let k = c; k < N; k++) A[f][k] -= m * A[c][k];
      B[f] -= m * B[c];
    }
  }
  const x = new Float64Array(N);
  for (let f = N - 1; f >= 0; f--) {
    let s = B[f];
    for (let k = f + 1; k < N; k++) s -= A[f][k] * x[k];
    x[f] = s / A[f][f];
  }
  return x;
}
