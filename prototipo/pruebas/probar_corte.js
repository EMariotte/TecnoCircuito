// SPDX-License-Identifier: Apache-2.0
// AUD-05: cuando el modelo de energía declara un corte (el Nano se queda sin alimentación o el Uno se reinicia porque
// el 5V cayó), el chip se detiene en ese milisegundo, aunque el núcleo avance en pasos grandes. Lo que pasa no puede
// depender del tamaño del paso: los mismos milisegundos en pasos de 16 ms, de 1 ms o en pedazos irregulares dan el
// mismo serial, los mismos reinicios, el mismo tiempo y ninguna instrucción con la placa sin energía.
// El contador de instrucciones se agrega en memoria al núcleo armado, sin escribirlo (técnica del diagnóstico de la
// auditoría de Codex, docs/diagnostico-auditoria-2026-10-17.cjs). Uso: npm run probar:corte
'use strict';
const fs = require('fs');
const path = require('path');
const Module = require('module');

let fallos = 0;
function revisar(condicion, texto) {
  console.log((condicion ? 'OK    ' : 'FALLA ') + texto);
  if (!condicion) fallos++;
}

// El núcleo con dos contadores: instrucciones con la placa sin energía y el ciclo en que se declaró el corte. El
// contador lee el `apagada` del núcleo que corre (el último creado), sea cual sea el camino que lo cambió.
const archivo = path.join(__dirname, 'nucleo.cjs');
let codigo = fs.readFileSync(archivo, 'utf8');
const INSTRUCCION = 'ejecutarInstruccion(cpu);';
const CORTE = 'apagada = siguiente.apagada;';
const ESTADO = 'let apagada = false;';
const RETENIDA = 'let retenida = false;';
const VOLTAJE = 'let v5 = USB.idealV;';
if ([INSTRUCCION, CORTE, ESTADO, RETENIDA, VOLTAJE].some((t) => codigo.split(t).length !== 2)) throw new Error('No encuentro dónde poner los contadores en nucleo.cjs');
// También cuenta lo que el chip ejecuta mientras la placa está en reinicio por bajo voltaje (SERVO-001): debe ser nada.
codigo = codigo.replace(INSTRUCCION, 'if (globalThis.__apagada && globalThis.__apagada()) globalThis.__instrSinEnergia++; if (globalThis.__retenida && globalThis.__retenida()) globalThis.__instrRetenida++; if (globalThis.__v5 && globalThis.__v5() < 2.7 && !globalThis.__apagada() && !globalThis.__retenida()) globalThis.__instrBajo++; ' + INSTRUCCION)
  .replace(ESTADO, ESTADO + ' globalThis.__apagada = () => apagada;')
  .replace(RETENIDA, RETENIDA + ' globalThis.__retenida = () => retenida;')
  .replace(VOLTAJE, VOLTAJE + ' globalThis.__v5 = () => v5;') // instrucciones con el 5V bajo 2,7 V sin apagado ni reinicio (F01 de AUD-27)
  .replace(CORTE, CORTE + ' if (apagada && globalThis.__cicloCorte === null) globalThis.__cicloCorte = base + chip.ciclos;');
const mod = new Module(archivo, module);
mod.filename = archivo;
mod.paths = Module._nodeModulePaths(__dirname);
mod._compile(codigo, archivo);
const { crearNucleo, FRECUENCIA } = mod.exports;
const CICLOS_MS = FRECUENCIA / 1000;
const hex = (n) => fs.readFileSync(path.join(__dirname, '..', 'programas', n + '.hex'), 'utf8');

/**
 * Avanza `ms` milisegundos en pasos de `paso` ciclos y junta lo que se ve en cada foto. Como el Worker, cuenta lo que
 * el núcleo avanzó de verdad: el chip ejecuta instrucciones enteras y cada pedazo puede pasarse unos ciclos.
 */
function correr(nucleo, ms, paso, cadaFotoMs = 16) {
  const total = ms * CICLOS_MS;
  const inicio = nucleo.ciclos;
  let hecho = 0;
  let proximaFoto = cadaFotoMs * CICLOS_MS;
  let serial = '';
  let fallas = [];
  const apagadas = []; // si la placa estaba apagada en cada foto
  while (hecho < total) {
    nucleo.avanzar(Math.max(1, Math.min(paso, total - hecho, proximaFoto - hecho)));
    hecho = nucleo.ciclos - inicio;
    if (hecho >= proximaFoto) {
      const f = nucleo.foto();
      serial += f.serial;
      fallas = fallas.concat(f.fallas.map((x) => x.tipo));
      apagadas.push(f.energia.apagada);
      proximaFoto += cadaFotoMs * CICLOS_MS;
    }
  }
  const f = nucleo.foto();
  return { serial: serial + f.serial, fallas: fallas.concat(f.fallas.map((x) => x.tipo)), ciclos: nucleo.ciclos, ms: f.msSimulados, energia: f.energia, apagadas };
}
const PASOS = [['16 ms', 16 * CICLOS_MS], ['1 ms', CICLOS_MS], ['pedazos de 7919 ciclos', 7919]];
const iguales = (rs, clave) => rs.every((r) => JSON.stringify(r[clave]) === JSON.stringify(rs[0][clave]));
// El mismo tiempo: lo que se pasa la última instrucción (unos pocos ciclos), no más.
const mismoTiempo = (rs) => rs.every((r) => Math.abs(r.ciclos - rs[0].ciclos) <= 8);

// 1. Nano con la expansión roja, jack de 9 V y 0,25 Ω entre OUT_5V y GND: la alimentación se cae (caso de la auditoría)
const NANO_CARGA = { formato: 1, placa: 'nano', protoboard: null,
  componentes: [
    { id: 'exp', tipo: 'shield_nano_io', x: 0, y: 0, rot: 0, props: { variante: 'roja', alimentacion: 'jack', voltajeJack: 9 } },
    { id: 'r', tipo: 'resistencia', x: 0, y: 0, rot: 0, props: { ohmios: 0.25 } },
  ], cables: [{ de: 'exp.OUT_5V', a: 'r.1' }, { de: 'r.2', a: 'exp.GND_OUT' }] };
const NANO_SIN_CARGA = { ...NANO_CARGA, componentes: [NANO_CARGA.componentes[0]], cables: [] };
{
  const rs = PASOS.map(([nombre, paso]) => {
    globalThis.__instrSinEnergia = 0;
    globalThis.__cicloCorte = null;
    const n = crearNucleo({ hex: hex('nano_adc67'), semilla: 77, activas: { limiteUSB: true }, circuito: NANO_CARGA });
    const r = correr(n, 16, paso);
    return { nombre, ...r, instr: globalThis.__instrSinEnergia, corte: globalThis.__cicloCorte };
  });
  for (const r of rs) {
    revisar(r.corte !== null && r.energia.apagada && r.instr === 0,
      `Nano sin energía, pasos de ${r.nombre}: corte en el ciclo ${r.corte}, ${r.instr} instrucciones sin energía`);
  }
  revisar(iguales(rs, 'corte') && mismoTiempo(rs) && iguales(rs, 'serial') && iguales(rs, 'energia') && iguales(rs, 'fallas'),
    `Nano sin energía: con los tres tamaños de paso, el mismo corte, tiempo, serial, energía y fallas (${rs[0].energia.voltios} V, ${rs[0].energia.reinicios} reinicio)`);

  // 2. Después vuelve la energía (se quita la carga): el programa arranca igual con cualquier tamaño de paso
  const vuelta = PASOS.map(([nombre, paso]) => {
    globalThis.__instrSinEnergia = 0;
    globalThis.__cicloCorte = null;
    const n = crearNucleo({ hex: hex('nano_adc67'), semilla: 77, activas: { limiteUSB: true }, circuito: NANO_CARGA });
    const antes = correr(n, 16, paso);
    n.ponerCircuito(NANO_SIN_CARGA);
    const despues = correr(n, 1500, paso);
    return { nombre, serial: antes.serial + despues.serial, ciclos: despues.ciclos, energia: despues.energia, fallas: antes.fallas.concat(despues.fallas), instr: globalThis.__instrSinEnergia };
  });
  revisar(vuelta.every((r) => !r.energia.apagada && r.serial.length > 0 && r.instr === 0) && iguales(vuelta, 'serial') && mismoTiempo(vuelta) && iguales(vuelta, 'energia'),
    `Nano, vuelve la energía: el mismo serial (${vuelta[0].serial.split('\n').filter(Boolean).length} líneas), tiempo y energía con los tres tamaños de paso`);
}

// 3. Uno con catorce SG90 desde el USB: el 5V cae y la placa se reinicia una y otra vez. Con seis ya no (SERVO-001: sin
//    golpe de arranque, como el Uno real en LAB-001); mientras el 5V sigue bajo 2,7 V, la placa queda en reinicio.
{
  const PINES = Array.from({ length: 14 }, (_, k) => ['D9', 'D6', 'D5', 'D3'][k % 4]);
  const SEIS = { formato: 1, placa: 'uno', protoboard: null,
    componentes: PINES.map((pin, k) => ({ id: 's' + k, tipo: 'servo', x: 0, y: 0, rot: 0, props: { modelo: 'sg90' } })),
    cables: PINES.flatMap((pin, k) => [{ de: `s${k}.GND`, a: 'placa.GND1' }, { de: `s${k}.VCC`, a: 'placa.5V' }, { de: `s${k}.SIG`, a: 'placa.' + pin }]) };
  const rs = PASOS.map(([nombre, paso]) => {
    const n = crearNucleo({ hex: hex('servos_cuatro'), circuito: SEIS, activas: { limiteUSB: true }, semilla: 1 });
    return { nombre, ...correr(n, 3000, paso) };
  });
  // El programa imprime «Inicio» al arrancar; cada arranque se cuenta por su «I». Si al terminar la placa sigue en
  // reinicio (el 5V todavía bajo), el último arranque aún no ocurrió.
  const arranques = (r) => (r.serial.match(/I/g) || []).length;
  revisar(rs.every((r) => r.energia.reinicios > 1 && [r.energia.reinicios, r.energia.reinicios + 1].includes(arranques(r))),
    `Uno con catorce servos: cada reinicio arranca el programa una vez (${rs.map((r) => `${r.nombre}: ${r.energia.reinicios} reinicios, ${arranques(r)} arranques`).join('; ')})`);
  revisar(iguales(rs, 'serial') && mismoTiempo(rs) && iguales(rs, 'energia') && iguales(rs, 'fallas'),
    'Uno con catorce servos: el mismo serial, tiempo, energía y fallas con los tres tamaños de paso');
}

// 4. AUD-27: una carga de 2 Ω entre 5V y GND hunde el 5V bajo 2,7 V (reinicio retenido) y calienta el fusible. Al
//    abrirse, la placa se apaga y lo avisa, aunque esté en reinicio; sin energía no se ejecuta nada; al enfriarse vuelve.
//    Control: 4,7 Ω abre el fusible sin bajar de 2,7 V (como antes).
{
  const carga = (ohmios) => ({ formato: 1, placa: 'uno', protoboard: null,
    componentes: [{ id: 'r1', tipo: 'resistencia', x: 0, y: 0, rot: 0, props: { ohmios, vatios: 0.5 } }],
    cables: [{ de: 'r1.1', a: 'placa.5V' }, { de: 'r1.2', a: 'placa.GND1' }] });
  // Una vez apagada, cuándo volvió a encender (el fusible se enfrió)
  const vuelve = (r) => { const k = r.apagadas.indexOf(true); return k >= 0 && r.apagadas.indexOf(false, k) > k; };
  for (const [ohmios, segundos] of [[2, 12], [4.7, 25]]) { // con 0,8 A, el fusible tarda más en abrirse
    const om = String(ohmios).replace('.', ',');
    const rs = PASOS.map(([nombre, paso]) => {
      globalThis.__instrSinEnergia = 0;
      globalThis.__instrRetenida = 0;
      globalThis.__instrBajo = 0;
      const n = crearNucleo({ hex: hex('servos_cuatro'), circuito: carga(ohmios), activas: { limiteUSB: true }, semilla: 1 });
      return { nombre, ...correr(n, segundos * 1000, paso), instr: globalThis.__instrSinEnergia, instrRet: globalThis.__instrRetenida, instrBajo: globalThis.__instrBajo };
    });
    const r = rs[0];
    const fallas = [...new Set(r.fallas)];
    revisar(rs.every((x) => x.apagadas.includes(true) && x.fallas.includes('fusible_usb')),
      `${om} Ω: el fusible se abre y la placa se apaga y lo avisa (fallas: ${fallas.join(', ')})`);
    revisar(ohmios === 2 ? r.fallas.includes('reinicio_usb') : !r.fallas.includes('reinicio_usb'),
      ohmios === 2 ? '2 Ω: antes, el 5V bajó de 2,7 V (reinicio retenido): el fusible corta igual' : '4,7 Ω: el 5V no baja de 2,7 V: solo el fusible');
    revisar(rs.every((x) => x.instr === 0 && x.instrRet === 0), `${om} Ω: sin energía y en reinicio el chip no ejecuta nada (${rs.map((x) => x.instr + x.instrRet).join(', ')} instrucciones)`);
    revisar(rs.every(vuelve), `${om} Ω: al enfriarse el fusible, la placa vuelve a encender`);
    // F01 de AUD-27: al volver la energía, el programa arranca solo si el 5V llega a 2,7 V. Con 2 Ω sigue bajo: el
    // chip no corre (un solo arranque, el del principio). Con 4,7 Ω llega: el programa arranca otra vez.
    const arranques = (r.serial.match(/I/g) || []).length;
    revisar(rs.every((x) => x.instrBajo === 0) && (ohmios === 2 ? arranques === 1 : arranques >= 2),
      `${om} Ω: al volver la energía no se ejecuta nada con el 5V bajo 2,7 V (${rs.map((x) => x.instrBajo).join(', ')} instrucciones) y ${ohmios === 2 ? 'el programa no vuelve a arrancar' : 'el programa arranca otra vez'} (${arranques} arranques)`);
    revisar(iguales(rs, 'serial') && mismoTiempo(rs) && iguales(rs, 'energia') && iguales(rs, 'fallas') && iguales(rs, 'apagadas') && rs.every((x) => Math.abs(x.ms - segundos * 1000) < 20),
      `${om} Ω: lo mismo con los tres tamaños de paso, y el reloj sigue (${Math.round(r.ms)} ms)`);
  }
}

for (const k of ['__apagada', '__retenida', '__v5', '__instrSinEnergia', '__instrRetenida', '__instrBajo', '__cicloCorte']) delete globalThis[k];
console.log(fallos ? `\n${fallos} FALLA(S)` : '\nTODO BIEN');
process.exit(fallos ? 1 : 0);
