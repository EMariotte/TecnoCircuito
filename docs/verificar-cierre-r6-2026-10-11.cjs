// Verificación independiente del cierre documental de R6.
// Tras probar:motor y probar:contrato, desde la raíz: node docs/verificar-cierre-r6-2026-10-11.cjs
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { armarRed, PinState } = require('../prototipo/pruebas/motor.cjs');
const { FICHAS } = require('../prototipo/pruebas/codigo.cjs');
const raiz = path.join(__dirname, '..');
const prueba = fs.readFileSync(path.join(raiz, 'prototipo/pruebas/probar_motor.js'), 'utf8');
// Ejecuta los helpers reales de la regresión, sin cambiar su archivo ni hacerlos públicos.
const formula = prueba.match(/const comparar = ([\s\S]*?\n  \});/);
assert.ok(formula, 'No se encontró el helper real comparar; revisar este verificador si cambia su ubicación.');
const comparar = new Function('return (' + formula[1] + ');')();
const configuracion = prueba.match(/const UT33B = (\{[^;]+\});/);
assert.ok(configuracion);
const UT33B = new Function('return (' + configuracion[1] + ');')();
const formulaU = prueba.match(/const incertidumbreV = ([^;]+);/);
assert.ok(formulaU);
const incertidumbreV = new Function('UT33B', 'return (' + formulaU[1] + ');')(UT33B);
let checks = 0;
function revisar(condicion, texto) { assert.ok(condicion, texto); checks++; console.log('OK    ' + texto); }
revisar(UT33B.lectura === 0.005 && UT33B.digitos === 2 && UT33B.resolucionV === 0.01, 'UT33B+: 0,5 % + 2 dígitos, resolución adoptada 0,01 V');
revisar(Math.abs(incertidumbreV(2.61) - 0.03305) < 1e-12, 'en 2,61 V, el margen instrumental es 0,03305 V');
// Casos numéricos que distinguen el denominador y los dos niveles de aceptación.
const borde = comparar(10.51, 10, 0.05, 0);
revisar(Math.abs(borde.error - 0.051) < 1e-12 && !borde.solo && !borde.conU, '5,1 % respecto de la medida falla sin margen; no se divide por 10,51');
const aceptado = comparar(10.51, 10, 0.05, 0.02);
revisar(!aceptado.solo && aceptado.conU, 'el margen se informa aparte y permite 0,51 V dentro de 0,50 + 0,02 V');
const fuera = comparar(10.53, 10, 0.05, 0.02);
revisar(!fuera.solo && !fuera.conU, '0,53 V fuera de 0,52 V también se rechaza con margen');
const exacto = comparar(10.5, 10, 0.05, 0);
revisar(exacto.solo && exacto.conU, 'exactamente 5 % cumple el límite inclusivo');
const amperios = comparar(0.012, 0.01, 0.1, 0.002, 'A');
revisar(!amperios.solo && amperios.conU && amperios.u === 2 && amperios.unidad === 'mA', 'la corriente se compara en A y su margen se presenta como 2 mA');

const datos = JSON.parse(fs.readFileSync(path.join(raiz, 'validacion/led-rojo-multimetro.json'), 'utf8'));
const comparaciones = [];
for (const d of datos.medidas) {
  const r = d.ohmios_medido || d.ohmios_nominal;
  const c = { formato: 1, placa: 'uno', componentes: [
    { id: 'r', tipo: 'resistencia', props: { ohmios: r } }, { id: 'l', tipo: 'led', props: { color: 'rojo' } },
  ], cables: [{ de: 'placa.D13', a: 'r.1' }, { de: 'r.2', a: 'l.anodo' }, { de: 'l.catodo', a: 'placa.GND1' }] };
  const red = armarRed(c); red.ponerPines({ D13: PinState.High }); const m = red.resolver();
  for (const [magnitud, sim, real, criterio, u, unidad] of [
    ['v_pin', m.pines[0].v, d.v_pin, datos.criterio.voltaje, incertidumbreV(d.v_pin), 'V'],
    ['v_led', m.leds[0].v, d.v_led, datos.criterio.voltaje, incertidumbreV(d.v_led), 'V'],
    ['v_resistencia', m.resistencias[0].v, d.v_resistencia, datos.criterio.voltaje, incertidumbreV(d.v_resistencia), 'V'],
    ['corriente', m.leds[0].i, d.v_resistencia / r, datos.criterio.corriente, incertidumbreV(d.v_resistencia) / r, 'A'],
  ]) comparaciones.push({ ohmios: r, magnitud, sim, real, ...comparar(sim, real, criterio, u, unidad) });
}
revisar(comparaciones.length === 12 && comparaciones.filter(c => c.solo).length === 11 && comparaciones.every(c => c.conU), 'datos originales: 11/12 estrictas y 12/12 con el margen acordado');
const limite = comparaciones.filter(c => !c.solo);
revisar(limite.length === 1 && limite[0].ohmios === 215 && limite[0].magnitud === 'v_resistencia', 'único caso que necesita margen: voltaje de resistencia de 215 Ω');
const rojo = FICHAS.led.validacion({ color: 'rojo' });
revisar(rojo.estado === 'validado' && /11 de 12/.test(rojo.texto) && /incertidumbre/.test(rojo.texto) && !/12 de 12 dentro/.test(rojo.texto), 'la ficha roja distingue tolerancia y margen instrumental');
for (const color of ['amarillo', 'verde', 'azul', 'blanco']) revisar(FICHAS.led.validacion({ color }).estado === 'por_validar', 'LED ' + color + ' mantiene validación física pendiente');
revisar(/menos de 10 mA/.test(FICHAS.servo.validacion({ modelo: 'sg90' }).texto) && /hoja de datos/.test(FICHAS.servo.validacion({ modelo: 'sg90' }).texto), 'SG90 mantiene la distinción entre medida y valor típico');
revisar(/estimación/.test(FICHAS.potenciometro.validacion({}).texto), 'el ruido ADC sigue declarado como estimación');
console.log('CASO_LIMITE ' + JSON.stringify(limite[0]));
console.log(`TOTAL ${checks} comprobaciones de cierre R6 aprobadas`);
