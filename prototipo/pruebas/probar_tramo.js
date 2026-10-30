// El tramo del potenciómetro en Mediciones (MED-001), con Node: la resistencia entre el centro (SIG) y la pata que va a
// GND, para hacer las cuentas de la ley de Ohm. Regla de Efraín (29 oct): un tramo, el de la pata a GND; si ninguna
// pata va a GND, el tramo en uso (el que lleva corriente); si van las dos, los dos tramos.
// Uso: npm run probar:tramo   (arma pruebas/tramo.cjs con esbuild y corre este archivo)
const fs = require('fs');
const path = require('path');
const { armarRed, crearNucleo, FRECUENCIA, filasDeMediciones } = require('./tramo.cjs');

let fallos = 0;
let total = 0;
function revisar(condicion, texto) {
  total++;
  console.log((condicion ? 'OK    ' : 'FALLA ') + texto);
  if (!condicion) fallos++;
}
const cerca = (a, b, tol) => Math.abs(a - b) <= tol;

// Un potenciómetro de 10 kΩ con la perilla al 30 %: SIG–GND mide 3 kΩ y SIG–VCC, 7 kΩ.
function circuito(cables, extra = []) {
  return {
    formato: 1, placa: 'uno', protoboard: null,
    componentes: [{ id: 'pot1', tipo: 'potenciometro', x: 0, y: 0, rot: 0, props: { ohmios: 10000, posicion: 0.3, modelo: '16mm' } }, ...extra],
    cables: cables.map(([de, a]) => ({ de, a })),
  };
}
const R1 = { id: 'r1', tipo: 'resistencia', x: 0, y: 0, rot: 0, props: { ohmios: 1000, vatios: 0.25 } };
function medir(c) {
  const red = armarRed(c);
  red.ponerPines({});
  const m = red.resolver();
  const fila = filasDeMediciones(m).find((f) => f.pieza.startsWith('pot1'));
  return { m, pot: m.potenciometros[0], fila };
}
const tramo = (pot, pata) => (pot.tramos || []).find((t) => t.pata === pata) || {};

// 1. La pata GND a GND, la VCC a 5V y el centro a A0: el tramo a GND es SIG–GND, 3,0 kΩ, y el centro marca 1,5 V
{
  const { pot, fila } = medir(circuito([['pot1.GND', 'placa.GND1'], ['pot1.VCC', 'placa.5V'], ['pot1.SIG', 'placa.A0']]));
  const t = tramo(pot, 'GND');
  revisar((pot.tramos || []).length === 2 && t.aGND === true && tramo(pot, 'VCC').aGND === false && t.ohmios === 3000 && tramo(pot, 'VCC').ohmios === 7000,
    'pata GND a GND: mediciones() da los dos tramos, SIG–GND (3000 Ω, a GND) y SIG–VCC (7000 Ω)');
  revisar(cerca(pot.v, (5 * 3000) / 10000, 0.005), `el centro marca ${pot.v.toFixed(3)} V = 5 V × 3 kΩ / 10 kΩ`);
  revisar(cerca(t.v, pot.v, 1e-9) && cerca(t.v / t.i, 3000, 1), `ley de Ohm en el tramo: ${t.v} V / ${t.i} A = ${t.v / t.i} Ω`);
  revisar(fila.pieza === 'pot1 (10 kΩ)' && fila.detalle === 'perilla 30 % · tramo a GND (SIG–GND): 3,0 kΩ', `fila: «${fila.pieza}» · «${fila.detalle}»`);
  revisar(fila.voltaje === '1,50 V' && fila.corriente === '0,50 mA', `fila: ${fila.voltaje} y ${fila.corriente}: 1,50 V / 0,50 mA = 3,0 kΩ`);
}

// 2. Al revés: la pata VCC a GND y la GND a 5V. El tramo a GND es SIG–VCC, 7,0 kΩ, y el centro está a 3,5 V de GND
{
  const { pot, fila } = medir(circuito([['pot1.VCC', 'placa.GND1'], ['pot1.GND', 'placa.5V'], ['pot1.SIG', 'placa.A0']]));
  const t = tramo(pot, 'VCC');
  revisar(t.aGND === true && tramo(pot, 'GND').aGND === false, 'pata VCC a GND: el tramo a GND es SIG–VCC');
  revisar(cerca(t.v, (5 * 7000) / 10000, 0.005), `el centro está a ${t.v} V de la pata VCC (a GND) = 5 V × 7 kΩ / 10 kΩ`);
  revisar(cerca(t.v / t.i, 7000, 1), `ley de Ohm en el tramo: ${t.v / t.i} Ω`);
  revisar(fila.detalle === 'perilla 30 % · tramo a GND (SIG–VCC): 7,0 kΩ', `fila: «${fila.detalle}»`);
  // Con la pata VCC a GND, la fila da el voltaje y la corriente del tramo (no los de la pata GND, que está a 5 V)
  revisar(fila.voltaje === '3,50 V' && fila.corriente === '0,50 mA', `fila: ${fila.voltaje} y ${fila.corriente}: 3,50 V / 0,50 mA = 7,0 kΩ`);
}

// 3. Ninguna pata a GND, como resistencia variable: 5V → VCC, SIG → r1 → GND. El tramo en uso es SIG–VCC
{
  const { pot, fila, m } = medir(circuito([['pot1.VCC', 'placa.5V'], ['pot1.SIG', 'r1.1'], ['r1.2', 'placa.GND1']], [R1]));
  const t = tramo(pot, 'VCC');
  const i = 5 / (7000 + 1000);
  revisar(t.aGND === false && tramo(pot, 'GND').aGND === false && cerca(t.i, i, 1e-6) && tramo(pot, 'GND').i < 1e-9,
    `sin pata a GND: solo SIG–VCC lleva corriente (${t.i} A = 5 V / 8 kΩ)`);
  revisar(cerca(Math.abs(t.v), i * 7000, 0.001) && cerca(m.resistencias[0].i, t.i, 1e-9), `el tramo cae ${t.v} V = I × 7 kΩ, con la misma corriente que r1`);
  revisar(fila.detalle === 'perilla 30 % · tramo en uso (SIG–VCC): 7,0 kΩ', `fila: «${fila.detalle}»`);
  revisar(fila.voltaje === '4,38 V' && fila.corriente === '0,63 mA', `fila: ${fila.voltaje} y ${fila.corriente}: 4,375 V / 0,625 mA = 7,0 kΩ`);
}

// 4. Las dos patas a GND y el centro a 5V por r1: los dos tramos van a GND y se muestran los dos
{
  const { pot, fila } = medir(circuito([['pot1.GND', 'placa.GND1'], ['pot1.VCC', 'placa.GND2'], ['pot1.SIG', 'r1.2'], ['r1.1', 'placa.5V']], [R1]));
  revisar(tramo(pot, 'GND').aGND === true && tramo(pot, 'VCC').aGND === true, 'las dos patas a GND: los dos tramos van a GND');
  const paralelo = (3000 * 7000) / 10000;
  revisar(cerca(pot.v, (5 * paralelo) / (paralelo + 1000), 0.005), `el centro marca ${pot.v.toFixed(3)} V: 3 kΩ ∥ 7 kΩ = 2,1 kΩ con r1 de 1 kΩ`);
  revisar(fila.detalle === 'perilla 30 % · tramos a GND: SIG–GND 3,0 kΩ y SIG–VCC 7,0 kΩ', `fila: «${fila.detalle}»`);
}

// 5. Ninguna pata a GND y ninguna corriente (sin conectar): se muestran los dos tramos, sin decir a GND ni en uso
{
  const { pot, fila } = medir(circuito([]));
  revisar(tramo(pot, 'GND').aGND === false && tramo(pot, 'VCC').aGND === false && (pot.tramos || []).every((t) => t.i === 0),
    'sin conectar: ningún tramo a GND ni con corriente');
  revisar(fila.detalle === 'perilla 30 % · tramos: SIG–GND 3,0 kΩ y SIG–VCC 7,0 kΩ', `fila: «${fila.detalle}»`);
}

// 6. Los extremos de la perilla y valores por debajo de 1 kΩ: el tramo dice ohmios enteros
{
  const c = circuito([['pot1.GND', 'placa.GND1'], ['pot1.VCC', 'placa.5V'], ['pot1.SIG', 'placa.A0']]);
  for (const [posicion, esperado] of [[0.05, 'perilla 5 % · tramo a GND (SIG–GND): 500 Ω'], [0, 'perilla 0 % · tramo a GND (SIG–GND): 0 Ω'],
    [1, 'perilla 100 % · tramo a GND (SIG–GND): 10,0 kΩ']]) {
    c.componentes[0].props.posicion = posicion;
    const { fila } = medir(c);
    revisar(fila.detalle === esperado, `perilla al ${posicion * 100} %: «${fila.detalle}»`);
  }
}

// 7. En la simulación (el núcleo promedia las mediciones de cada foto): el tramo llega con la perilla al 30 %
{
  const hex = fs.readFileSync(path.join(__dirname, '..', 'programas', 'potenciometro.hex'), 'utf8');
  const c = circuito([['pot1.GND', 'placa.GND1'], ['pot1.VCC', 'placa.5V'], ['pot1.SIG', 'placa.A0']]);
  const n = crearNucleo({ hex, circuito: c, activas: { danoComponentes: true, limitePin: true } });
  let f = null;
  for (let t = 0; t < 300; t += 16) {
    n.avanzar(FRECUENCIA * 0.016);
    f = n.foto();
  }
  const pot = f.medicion.potenciometros[0];
  const t = tramo(pot, 'GND');
  revisar(t.aGND === true && t.ohmios === 3000 && cerca(t.v / t.i, 3000, 1), `núcleo: el tramo a GND llega en la medición (${t.v / t.i} Ω)`);
  const fila = filasDeMediciones(f.medicion).find((x) => x.pieza.startsWith('pot1'));
  revisar(fila && fila.detalle === 'perilla 30 % · tramo a GND (SIG–GND): 3,0 kΩ', `núcleo: fila «${fila && fila.detalle}»`);
}

console.log(`\n${total - fallos}/${total} comprobaciones OK`);
process.exit(fallos ? 1 : 0);
