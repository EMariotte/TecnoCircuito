// Verificación independiente de R1–R6 después de las correcciones de Claude.
// Desde la raíz, después de npm run probar: node docs/verificar-correcciones-2026-10-11.cjs
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { armarRed, revisarFallas, PinState } = require('../prototipo/pruebas/motor.cjs');
const { crearNucleo, FRECUENCIA } = require('../prototipo/pruebas/nucleo.cjs');
const { FICHAS, leerHex } = require('../prototipo/pruebas/codigo.cjs');
const raiz = path.join(__dirname, '..');
const hex = fs.readFileSync(path.join(raiz, 'prototipo/programas/fijo13.hex'), 'utf8');
let total = 0;
function comprobar(condicion, nombre) { assert.ok(condicion, nombre); total++; console.log('OK    ' + nombre); }
const vacio = () => ({ formato: 1, placa: 'uno', componentes: [], cables: [], protoboard: null });
const res = (id, ohmios) => ({ id, tipo: 'resistencia', x: 0, y: 0, props: { ohmios } });
const shield = { id: 's', tipo: 'shield_l293d', x: 0, y: 0, props: { puentePWR: false } };
function medir(c, estados = {}) { const r = armarRed(c); r.ponerPines(estados); return r.resolver(); }
function circuitoRes(de, a, ohmios = 1000, porShield = false) {
  const c = vacio(); c.componentes.push(res('r', ohmios)); if (porShield) c.componentes.push(shield);
  c.cables.push({ de, a: 'r.1' }, { de: 'r.2', a }); return c;
}

// R1: ambos conectores, alimentación, señales, entradas y cortocircuito.
const directo = medir(circuitoRes('placa.5V', 'placa.GND1'));
for (const [conector, pin] of [['S1', 'D10'], ['S2', 'D9']]) {
  const m = medir(circuitoRes('s.' + conector + '_POS', 's.' + conector + '_GND', 1000, true));
  comprobar(Math.abs(m.resistencias[0].i - 0.005) < 1e-9 && Math.abs(m.resistencias[0].i - directo.resistencias[0].i) < 1e-9,
    `R1 ${conector}: 5 mA por la alimentación de la shield`);
  const salida = medir(circuitoRes('s.' + conector + '_SIG', 's.' + conector + '_GND', 1000, true), { [pin]: PinState.High });
  const original = medir(circuitoRes('placa.' + pin, 'placa.GND1'), { [pin]: PinState.High });
  comprobar(Math.abs(salida.resistencias[0].i - original.resistencias[0].i) < 1e-9 && salida.voltajes['placa.' + pin] > 4,
    `R1 ${conector}: salida y voltaje del pin equivalentes al montaje directo`);
  const entrada = vacio(); entrada.componentes.push(shield); entrada.cables.push({ de: 's.' + conector + '_SIG', a: 's.' + conector + '_POS' });
  const alto = medir(entrada, { [pin]: PinState.Input });
  comprobar(alto.voltajes['placa.' + pin] > 4.9, `R1 ${conector}: entrada recibe el voltaje conectado por la shield`);
}
const corto = vacio(); corto.componentes.push(shield); corto.cables.push({ de: 's.S1_POS', a: 's.S2_GND' });
comprobar(armarRed(corto).fallasFijas.some(f => f.tipo === 'cortocircuito'), 'R1 corto entre conectores detectado');

// R2: después de abrir el fusible, pasos parciales y recuperación por tiempo simulado.
function apagado() {
  const n = crearNucleo({ hex, circuito: circuitoRes('placa.5V', 'placa.GND1', 4.7), activas: { limiteUSB: true }, semilla: 1 });
  for (let i = 0; i < 2000 && !n.foto().energia.apagada; i++) n.avanzar(FRECUENCIA * 0.016);
  assert.ok(n.foto().energia.apagada, 'precondición: fusible abierto'); return n;
}
const n = apagado();
const antes = n.foto(); for (let i = 0; i < 100; i++) n.avanzar(4801); const despues = n.foto();
comprobar(Math.abs(despues.msSimulados - antes.msSimulados - 30.00625) < 1e-6 && despues.energia.fusible === 0.99,
  'R2 100 avances de 4801 ciclos: 30,00625 ms y calor 0,99');
function recuperacion(pasos) {
  const n = apagado(); const inicio = n.ciclos;
  for (let k = 0; n.foto().energia.apagada && n.ciclos - inicio < FRECUENCIA * 5; k++) n.avanzar(pasos[k % pasos.length]);
  assert.ok(!n.foto().energia.apagada, 'precondición: recuperación'); return (n.ciclos - inicio) / FRECUENCIA * 1000;
}
const ms = recuperacion([16000]);
for (const pasos of [[4801], [333, 4801, 16000, 9000, 160000]]) {
  const actual = recuperacion(pasos);
  comprobar(ms > 2900 && ms < 3100 && Math.abs(actual - ms) <= 11, `R2 recuperación: ${actual.toFixed(3)} ms frente a ${ms.toFixed(3)} ms`);
}

// R3: consumo real de la medición, incluido un sumidero ya alimentado desde 5V.
function consumo(c, programa = hex, cuadros = 20) {
  const n = crearNucleo({ hex: programa, circuito: c, activas: { limiteUSB: true }, semilla: 1 });
  let f; for (let i = 0; i < cuadros; i++) { n.avanzar(FRECUENCIA * 0.016); f = n.foto(); } return f;
}
const conPin = consumo(circuitoRes('placa.D13', 'placa.GND1', 220));
const entrega = conPin.medicion.pines.find(p => p.pin === 'D13').i;
comprobar(entrega > 0.02 && Math.abs(conPin.energia.amperios - 0.05 - entrega) < 1e-7, 'R3 USB suma 50 mA y la salida GPIO');
// A los 800 ms, parpadeo13 configura D13 como OUTPUT y lo mantiene LOW.
const parpadeo = fs.readFileSync(path.join(raiz, 'prototipo/programas/parpadeo13.hex'), 'utf8');
const f = consumo(circuitoRes('placa.5V', 'placa.D13', 220), parpadeo, 50);
const esperado = 0.05 + f.medicion.fuentes.reduce((s, x) => s + Math.max(0, x.i), 0) + f.medicion.pines.reduce((s, x) => s + Math.max(0, x.i), 0);
comprobar(f.medicion.pines.some(p => p.i < -0.02) && Math.abs(f.energia.amperios - esperado) < 1e-7,
  'R3 corriente recibida por D13 en BAJO no se cuenta dos veces en USB');

// R4: ambos signos, frontera de 200 mA, dos excesos e ideal.
function fallas(corrientes, activas = { limitePin: true }) {
  return revisarFallas({ leds: [], resistencias: [], pines: corrientes.map((i, k) => ({ pin: 'D' + k, i })) }, activas);
}
for (const [signo, pata] of [[1, 'VCC'], [-1, 'GND']]) {
  const f = fallas(Array(8).fill(signo * 0.03));
  comprobar(f.length === 1 && f[0].tipo === 'corriente_chip' && f[0].componente === 'placa.' + pata, `R4 240 mA por ${pata}`);
  comprobar(!fallas(Array(8).fill(signo * 0.025)).length, `R4 exactamente 200 mA por ${pata} sin exceso`);
}
comprobar(!fallas([...Array(6).fill(0.03), ...Array(6).fill(-0.03)]).length, 'R4 180 mA por cada lado no se agregan entre sí');
comprobar(fallas([...Array(8).fill(0.03), ...Array(8).fill(-0.03)]).length === 2, 'R4 dos excesos generan dos fallas');
comprobar(!fallas(Array(8).fill(0.03), {}).length, 'R4 modo ideal sin falla agregada');

// R5: datos, suma y largos por tipo, con un HEX correcto de control.
const linea = d => ':' + [...d, (-d.reduce((s, b) => s + b, 0)) & 255].map(b => b.toString(16).padStart(2, '0')).join('');
const fin = ':00000001FF';
comprobar(leerHex(hex)[0] !== 0, 'R5 HEX real sigue aceptado');
for (const [nombre, texto] of [
  ['truncado original', ':0200000001FD'], ['bytes excedentes', linea([1, 0, 0, 0, 12, 148])],
  ['fin con datos', linea([1, 0, 0, 1, 0])], ['segmento corto', linea([1, 0, 0, 2, 0])],
  ['lineal corto', linea([1, 0, 0, 4, 0])], ['tipo desconocido', linea([0, 0, 0, 7])],
]) {
  let rechazo = false; try { leerHex(texto + '\n' + fin); } catch { rechazo = true; }
  comprobar(rechazo, 'R5 rechaza ' + nombre);
}

// R6: todos los colores y la distinción entre dato medido y estimado.
comprobar(FICHAS.led.validacion({ color: 'rojo' }).estado === 'validado', 'R6 LED rojo conserva la evidencia física');
for (const color of ['azul', 'verde', 'amarillo', 'blanco']) comprobar(FICHAS.led.validacion({ color }).estado === 'por_validar', 'R6 LED ' + color + ' pendiente físico');
const sg90 = FICHAS.servo.validacion({ modelo: 'sg90' }).texto;
comprobar(/menos de 10 mA/.test(sg90) && /6 mA.*hoja de datos/.test(sg90), 'R6 SG90 diferencia resolución del multímetro y corriente típica');
comprobar(/estimación/.test(FICHAS.potenciometro.validacion({}).texto), 'R6 ADC conserva carácter estimado');
comprobar(FICHAS.servo.validacion({ modelo: 'mg90s' }).estado === 'por_validar', 'R6 MG90S sigue pendiente');
console.log(`TOTAL ${total} comprobaciones independientes aprobadas`);

// Observación aparte: la decisión posterior de Efraín usa la medida como denominador.
// No altera la regresión existente ni convierte su resultado pendiente en una prueba aprobada.
const medidas = JSON.parse(fs.readFileSync(path.join(raiz, 'validacion/led-rojo-multimetro.json'), 'utf8'));
const comparaciones = [];
for (const d of medidas.medidas) {
  const ohmios = d.ohmios_medido || d.ohmios_nominal;
  const c = vacio(); c.componentes.push(res('r', ohmios), { id: 'l', tipo: 'led', x: 0, y: 0, props: { color: 'rojo' } });
  c.cables.push({ de: 'placa.D13', a: 'r.1' }, { de: 'r.2', a: 'l.anodo' }, { de: 'l.catodo', a: 'placa.GND1' });
  const m = medir(c, { D13: PinState.High });
  for (const [magnitud, sim, real, criterio] of [
    ['v_pin', m.pines[0].v, d.v_pin, medidas.criterio.voltaje],
    ['v_led', m.leds[0].v, d.v_led, medidas.criterio.voltaje],
    ['v_resistencia', m.resistencias[0].v, d.v_resistencia, medidas.criterio.voltaje],
    ['corriente', m.leds[0].i, d.v_resistencia / ohmios, medidas.criterio.corriente],
  ]) {
    const error = Math.abs(sim - real) / Math.abs(real);
    comparaciones.push({ ohmios, magnitud, error_porcentaje: error * 100, dentro: error <= criterio });
  }
}
console.log('OBSERVACION_CRITERIO_MEDIDA ' + JSON.stringify({ dentro: comparaciones.filter(x => x.dentro).length,
  total: comparaciones.length, fuera: comparaciones.filter(x => !x.dentro) }));
