// Comprobaciones independientes de revisión; no forman parte de npm run probar.
// Uso desde la raíz: node docs/revision-2026-10-11.cjs
// Necesita los .cjs generados por la suite en prototipo/pruebas/.
// Solo lee código y ejecuta modelos: no cambia fuentes, medidas ni programas.
'use strict';
const fs = require('fs');
const path = require('path');
const raiz = path.join(__dirname, '..');
const { crearNucleo, FRECUENCIA } = require('../prototipo/pruebas/nucleo.cjs');
const { armarRed, revisarFallas, PinState } = require('../prototipo/pruebas/motor.cjs');
const { revisarCircuito } = require('../prototipo/pruebas/contrato.js');
const { FICHAS } = require('../prototipo/pruebas/codigo.cjs');
const hex = fs.readFileSync(path.join(raiz, 'prototipo/programas/fijo13.hex'), 'utf8');
const resultados = {};
const vacio = () => ({ formato: 1, placa: 'uno', componentes: [], cables: [], protoboard: null });

// R1: un mismo nodo alimentado desde la placa o por el conector de servo de la shield.
function circuitoFuente(porShield) {
  const c = vacio();
  c.componentes.push({ id: 'r1', tipo: 'resistencia', x: 300, y: 0, props: { ohmios: 1000 } });
  if (porShield) c.componentes.push({ id: 'shield1', tipo: 'shield_l293d', x: 0, y: 0, props: { puentePWR: false } });
  c.cables.push({ de: porShield ? 'shield1.S2_POS' : 'placa.5V', a: 'r1.1' },
    { de: 'r1.2', a: porShield ? 'shield1.S2_GND' : 'placa.GND1' });
  return c;
}
function medir(c) {
  const red = armarRed(c);
  red.ponerPines({ D13: PinState.High });
  return red.resolver();
}
const directo = medir(circuitoFuente(false));
const shield = medir(circuitoFuente(true));
resultados.fuente_por_shield = {
  erroresContrato: revisarCircuito(circuitoFuente(true)),
  directo_mA: directo.resistencias[0].i * 1000,
  shield_mA: shield.resistencias[0].i * 1000,
  fuentesDirectas: directo.fuentes.length, fuentesShield: shield.fuentes.length,
};

// R2: el fusible debe enfriarse según tiempo simulado, también con pasos menores de 1 ms.
const carga = vacio();
carga.componentes.push({ id: 'r1', tipo: 'resistencia', x: 300, y: 0, props: { ohmios: 4.7 } });
carga.cables.push({ de: 'placa.5V', a: 'r1.1' }, { de: 'r1.2', a: 'placa.GND1' });
const n = crearNucleo({ hex, circuito: carga, activas: { limiteUSB: true }, semilla: 1 });
let f;
for (let i = 0; i < 1500; i++) {
  n.avanzar(FRECUENCIA * 0.016);
  f = n.foto();
  if (f.energia.apagada) break;
}
if (!f.energia.apagada) throw new Error('No se pudo reproducir la apertura del fusible.');
const antes = f;
// 100 llamadas de 4801 ciclos: 30,00625 ms, no 100 ms.
for (let i = 0; i < 100; i++) n.avanzar(4801);
const despues = n.foto();
resultados.reloj_fusible_apagado = {
  msTranscurridos: despues.msSimulados - antes.msSimulados,
  enfriamientoEsperado_s: (despues.msSimulados - antes.msSimulados) / 1000,
  calorAntes: antes.energia.fusible, calorDespues: despues.energia.fusible,
  nota: 'La foto redondea calor a centésimas; la caída esperada ronda 0,01, la observada 0,03–0,04.',
};

// R3: el consumo de una salida cargada también debe aparecer en la alimentación del chip.
const salida = vacio();
salida.componentes.push({ id: 'r1', tipo: 'resistencia', x: 300, y: 0, props: { ohmios: 220 } });
salida.cables.push({ de: 'placa.D13', a: 'r1.1' }, { de: 'r1.2', a: 'placa.GND1' });
const nc = crearNucleo({ hex, circuito: salida, activas: { limiteUSB: true }, semilla: 1 });
for (let i = 0; i < 10; i++) { nc.avanzar(FRECUENCIA * 0.016); f = nc.foto(); }
resultados.consumo_salida = { pin_mA: f.medicion.pines.find(p => p.pin === 'D13').i * 1000,
  usb_mA: f.energia.amperios * 1000, nota: 'USB incluye únicamente los 50 mA fijos de la placa.' };

// R4: revisarFallas solo evalúa cada pin: no detecta un exceso agregado con pines individualmente bajo 40 mA.
const agregado = { leds: [], resistencias: [], pines: Array.from({ length: 8 }, (_, i) => ({ pin: 'D' + (i + 2), i: 0.03 })) };
resultados.limite_agregado = { corriente_mA: 240, fallas: revisarFallas(agregado, { limitePin: true }) };

// R5: suma correcta, estructura incorrecta: el contador dice 2 bytes y solo existe uno.
const fuenteHex = fs.readFileSync(path.join(raiz, 'prototipo/src/hex.js'), 'utf8');
const leerHex = new Function(fuenteHex.replace('export function leerHex', 'function leerHex') + '\nreturn leerHex;')();
const malformado = ':0200000001FD\n:00000001FF';
try { resultados.hex_truncado = { aceptado: true, primeraPalabra: leerHex(malformado)[0] }; }
catch (e) { resultados.hex_truncado = { aceptado: false, mensaje: e.message }; }

// R6: la declaración de validación debe depender del color comprobado.
resultados.ficha_led_azul = FICHAS.led.validacion({ color: 'azul' });
resultados.ficha_sg90 = FICHAS.servo.validacion({ modelo: 'sg90' });
console.log(JSON.stringify(resultados, null, 2));
