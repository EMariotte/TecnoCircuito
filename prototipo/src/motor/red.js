// Traduce el circuito del contrato y el estado de los pines del chip a una red eléctrica (motor/mna.js),
// la resuelve, mide cada pieza y revisa las fallas. No toca la página.
import { calcularNodos } from '../conexiones.js';
import { resistencia, fuenteConResistencia, fuenteVoltaje, diodo, resolver, VT } from './mna.js';
import { PinState } from 'avr8js';

// ---- Modelos. Valores de partida tomados de hojas de datos; se ajustan con el multímetro (validación).

// Pin del ATmega328P a 5 V: en ALTO entrega 5 V detrás de unos 25 Ω, en BAJO se va a 0 V detrás de unos 22 Ω.
export const PIN = { voltios: 5, rAlto: 25, rBajo: 22, rPullUp: 35000, maxmA: 40 };
const PINES_UNO = [...Array.from({ length: 14 }, (_, i) => 'D' + i), 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
const ALIAS = { A4: 'SDA', A5: 'SCL' };

// LED de 5 mm: voltaje directo a 20 mA según el color, factor de idealidad n y resistencia interna.
export const LED = {
  vf: { rojo: 2.0, amarillo: 2.05, verde: 2.2, azul: 3.1, blanco: 3.1 },
  n: 2,
  rs: 5,
  iRef: 0.02, // corriente a la que se da el voltaje directo
  normalmA: 20, // corriente de trabajo
  quemamA: 30, // por encima de esto se quema
  plenomA: 15, // corriente a la que el dibujo brilla al máximo
};
const RESISTENCIA_MAX_W = 0.25; // resistencias de 1/4 W del kit
// Potenciómetro: la perilla parte la resistencia total en dos. En los extremos queda un mínimo (como el real),
// así el solucionador nunca recibe 0 Ω.
export const POT = { minimo: 1 };

// Is sale de pedir que el LED tenga su voltaje directo a 20 mA.
export function modeloLed(color) {
  const vf = LED.vf[color] || LED.vf.rojo;
  const vUnion = vf - LED.iRef * LED.rs;
  return { Is: LED.iRef / Math.expm1(vUnion / (LED.n * VT)), n: LED.n };
}

const PATAS = { led: ['anodo', 'catodo'], resistencia: ['1', '2'], potenciometro: ['GND', 'SIG', 'VCC'] };

// Arma la red una vez por cableado. Cambiar los pines (ponerPines) no la rehace: solo cambia las fuentes.
export function armarRed(circuito, { quemados = new Set() } = {}) {
  const raiz = calcularNodos(circuito);
  const tierra = raiz('placa.GND1');
  const indices = new Map();
  let n = 0;
  const nodo = (ref) => {
    const r = raiz(ref);
    if (r === tierra) return -1;
    if (!indices.has(r)) indices.set(r, n++);
    return indices.get(r);
  };
  const buscar = (ref) => (raiz(ref) === tierra ? -1 : indices.get(raiz(ref))); // undefined: al aire

  const elementos = [];
  const fuentes = [];
  const fallasFijas = [];
  const usados = new Set(circuito.cables.flatMap((c) => [c.de, c.a]));

  // 5 V y 3,3 V de la placa: fuentes de voltaje ideales.
  const nodosFuente = new Map();
  for (const [pin, voltios] of [['5V', 5], ['3V3', 3.3]]) {
    if (!usados.has('placa.' + pin)) continue;
    const k = nodo('placa.' + pin);
    const choque = k === -1 ? 'GND' : nodosFuente.get(k);
    if (choque) {
      fallasFijas.push({ tipo: 'cortocircuito', componente: 'placa.' + pin, mensaje: `El pin ${pin} está unido directo a ${choque}: es un cortocircuito.` });
      continue;
    }
    nodosFuente.set(k, pin);
    const f = fuenteVoltaje(k, voltios);
    fuentes.push(f);
    elementos.push(f);
  }

  // Pines del chip que tienen algo conectado: una fuente con resistencia que cambia según el estado del pin.
  const pines = {};
  for (const pin of PINES_UNO) {
    if (!usados.has('placa.' + pin) && !usados.has('placa.' + ALIAS[pin])) continue;
    pines[pin] = fuenteConResistencia(nodo('placa.' + pin));
    elementos.push(pines[pin]);
  }

  const resistencias = [];
  const leds = [];
  const potenciometros = [];
  for (const c of circuito.componentes) {
    if (c.tipo === 'resistencia') {
      const r = resistencia(nodo(c.id + '.1'), nodo(c.id + '.2'), Number(c.props.ohmios) || 1);
      resistencias.push({ id: c.id, ohmios: Number(c.props.ohmios) || 1, el: r });
      if (r.a !== r.b) elementos.push(r);
    } else if (c.tipo === 'led') {
      const a = nodo(c.id + '.anodo');
      const k = nodo(c.id + '.catodo');
      const led = { id: c.id, a, k, quemado: quemados.has(c.id) };
      if (!led.quemado && a !== k) {
        // ánodo ── rs ── unión ──|>|── cátodo   (un LED quemado queda abierto: no se agrega)
        const union = n++;
        led.rs = resistencia(a, union, LED.rs);
        led.diodo = diodo(union, k, modeloLed(c.props.color));
        elementos.push(led.rs, led.diodo);
      }
      leds.push(led);
    } else if (c.tipo === 'potenciometro') {
      // GND ──[R·p]── SIG ──[R·(1−p)]── VCC   (p = posición de la perilla, 0 a 1: en 1, SIG queda pegada a VCC)
      const total = Number(c.props.ohmios) || 10000;
      const p = Math.max(0, Math.min(1, Number(c.props.posicion)));
      const gnd = nodo(c.id + '.GND');
      const sig = nodo(c.id + '.SIG');
      const vcc = nodo(c.id + '.VCC');
      const bajo = resistencia(gnd, sig, Math.max(POT.minimo, total * p));
      const alto = resistencia(sig, vcc, Math.max(POT.minimo, total * (1 - p)));
      for (const r of [bajo, alto]) if (r.a !== r.b) elementos.push(r);
      potenciometros.push({ id: c.id, ohmios: total, posicion: p, bajo, alto });
    }
  }
  fuentes.forEach((f, i) => (f.fila = n + i));

  return {
    fallasFijas,
    // Pone cada pin como lo dejó el programa.
    ponerPines(estados) {
      for (const [pin, f] of Object.entries(pines)) {
        const e = estados[pin];
        if (e === PinState.High) Object.assign(f, { v: PIN.voltios, g: 1 / PIN.rAlto });
        else if (e === PinState.Low) Object.assign(f, { v: 0, g: 1 / PIN.rBajo });
        else if (e === PinState.InputPullUp) Object.assign(f, { v: PIN.voltios, g: 1 / PIN.rPullUp });
        else Object.assign(f, { v: 0, g: 0 }); // entrada: no entrega ni recibe corriente
      }
    },
    // Resuelve y mide: voltaje de cada pin conectado, corriente de cada pieza y de cada pin.
    resolver() {
      const r = resolver({ nodos: n, fuentes: fuentes.length, elementos });
      const V = (ref) => {
        const i = buscar(ref);
        return i === undefined ? null : i < 0 ? 0 : r.x[i];
      };
      const voltajes = {};
      for (const ref of usados) voltajes[ref] = V(ref);
      for (const c of circuito.componentes) {
        for (const p of PATAS[c.tipo] || []) {
          voltajes[c.id + '.' + p] = V(c.id + '.' + p);
        }
      }
      const resta = (a, b) => (a === null || b === null ? null : a - b);
      return {
        convergio: r.convergio,
        iteraciones: r.iteraciones,
        voltajes,
        leds: leds.map((l) => {
          const i = l.diodo ? l.diodo.corriente(r.x) : 0;
          return { id: l.id, quemado: l.quemado, v: resta(V(l.id + '.anodo'), V(l.id + '.catodo')), i, brillo: Math.max(0, Math.min(1, (i * 1000) / LED.plenomA)) };
        }),
        resistencias: resistencias.map((x) => {
          const i = x.el.a === x.el.b ? 0 : x.el.corriente(r.x);
          return { id: x.id, ohmios: x.ohmios, v: resta(V(x.id + '.1'), V(x.id + '.2')), i, w: i * i * x.ohmios };
        }),
        pines: Object.entries(pines)
          .filter(([, f]) => f.g > 0)
          .map(([pin, f]) => ({ pin, v: V('placa.' + pin), i: f.corriente(r.x) })),
        fuentes: fuentes.map((f) => ({ pin: f.v === 5 ? '5V' : '3V3', i: f.corriente(r.x) })),
        // Potenciómetro: voltaje en la pata del medio (respecto a su GND) y corriente de punta a punta.
        potenciometros: potenciometros.map((x) => ({
          id: x.id,
          ohmios: x.ohmios,
          posicion: x.posicion,
          v: resta(V(x.id + '.SIG'), V(x.id + '.GND')),
          // corriente que atraviesa la pista (de VCC a GND), sin signo: como la muestran las resistencias
          i: Math.abs(x.bajo.a !== x.bajo.b ? x.bajo.corriente(r.x) : x.alto.a !== x.alto.b ? x.alto.corriente(r.x) : 0),
        })),
      };
    },
  };
}

// Revisa la medición contra los límites de cada pieza. `activas` son las no idealidades encendidas.
export function revisarFallas(m, activas) {
  const mA = (i) => (Math.abs(i) * 1000).toFixed(0);
  const fallas = [];
  if (activas.danoComponentes) {
    for (const l of m.leds) {
      if (!l.quemado && l.i * 1000 > LED.quemamA) {
        fallas.push({
          tipo: 'led_quemado',
          componente: l.id,
          corriente_mA: +(l.i * 1000).toFixed(1),
          mensaje: `El LED ${l.id} se quemó: le pasaron ${mA(l.i)} mA y aguanta unos ${LED.normalmA} mA. Ponle una resistencia en serie (220 Ω sirve).`,
        });
      }
    }
    for (const r of m.resistencias) {
      if (r.w > RESISTENCIA_MAX_W) {
        fallas.push({
          tipo: 'resistencia_caliente',
          componente: r.id,
          potencia_W: +r.w.toFixed(2),
          mensaje: `La resistencia ${r.id} se calienta: disipa ${r.w.toFixed(2).replace('.', ',')} W y aguanta 0,25 W. Usa una de más ohmios.`,
        });
      }
    }
  }
  if (activas.limitePin) {
    for (const p of m.pines) {
      if (Math.abs(p.i) * 1000 > PIN.maxmA) {
        const nombre = p.pin.startsWith('D') ? 'pin ' + p.pin.slice(1) : 'pin ' + p.pin;
        fallas.push({
          tipo: 'corriente_pin',
          componente: 'placa.' + p.pin,
          corriente_mA: +(Math.abs(p.i) * 1000).toFixed(1),
          mensaje: `El ${nombre} entrega ${mA(p.i)} mA y aguanta ${PIN.maxmA} mA: en la placa real se puede dañar. Revisa que haya una resistencia.`,
        });
      }
    }
  }
  return fallas;
}
