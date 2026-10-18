// SPDX-License-Identifier: Apache-2.0
// Diagnósticos de defectos observados, NO pruebas de regresión aprobadas.
// Ejecutar desde la raíz: node docs/diagnostico-auditoria-2026-10-17.cjs
// Requiere los .cjs de la suite actual y el compilador AVR del hermano (o AVR_GXX).
// Solo datos sintéticos. No cambia las fuentes de ninguno de los proyectos.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');
const raiz = path.resolve(__dirname, '..');
const hermano = path.resolve(raiz, '..', 'TecnoBloques');
const { quitarComentarios, crearRegistroEventos } = require(path.join(hermano, 'src/registro.js'));
const { crearRegistroDisco } = require(path.join(hermano, 'escritorio/registro-disco.js'));
let reproducidos = 0;
function observado(id, detalle) {
  reproducidos++;
  console.log(JSON.stringify({ id, defectoReproducido: true, ...detalle }, null, 2));
}

// 01: el compilador reconoce el comentario después de unir líneas; el limpiador lo conserva.
{
  const marcador = 'MARCADOR_PRIVADO_SINTETICO';
  const entrada = 'int valor=1; /' + '\\' + '\n' + '/ ' + marcador + '\n';
  const herramientas = path.join(hermano, 'escritorio/recursos/arduino/datos/packages/arduino/tools/avr-gcc');
  const versiones = fs.existsSync(herramientas) ? fs.readdirSync(herramientas).sort() : [];
  const compilador = process.env.AVR_GXX || path.join(herramientas, versiones.at(-1) || '', 'bin/avr-g++.exe');
  const r = spawnSync(compilador, ['-E', '-P', '-x', 'c++', '-std=gnu++11', '-'], {
    input: entrada, encoding: 'utf8', windowsHide: true,
  });
  assert.ifError(r.error);
  assert.equal(r.status, 0, r.stderr);
  assert.ok(!r.stdout.includes(marcador));
  const registrado = quitarComentarios(entrada);
  assert.ok(registrado.includes(marcador), 'Este diagnóstico espera el defecto; si se corrigió, revisar como regresión.');
  const raw = 'const auto s = u8R"(a " b)"; // ' + marcador + '\n';
  const rr = spawnSync(compilador, ['-E', '-P', '-x', 'c++', '-std=gnu++11', '-'], {
    input: raw, encoding: 'utf8', windowsHide: true,
  });
  assert.ifError(rr.error);
  assert.equal(rr.status, 0, rr.stderr);
  assert.ok(!rr.stdout.includes(marcador));
  assert.ok(quitarComentarios(raw).includes(marcador));
  observado('AUD-01', { entrada, preprocesado: r.stdout.trim(), registrado,
    textoCrudoPrefijado: { entrada: raw, preprocesado: rr.stdout.trim(), registrado: quitarComentarios(raw) } });
}

// 02: ENOSPC controlado en memoria; ejecutar el handler IPC real conserva el estado activo y pierde todo.
{
  const carpeta = fs.mkdtempSync(path.join(os.tmpdir(), 'tecnocircuito-auditoria-sintetica-'));
  const disco = crearRegistroDisco({ carpeta });
  assert.ok(disco.instructor({ accion: 'crear-pin', pin: '2468' }).ok);
  assert.ok(disco.instructor({ accion: 'activar', pin: '2468', activo: true }).ok);
  let handler;
  const main = fs.readFileSync(path.join(hermano, 'escritorio/main.js'), 'utf8');
  const lineaIPC = main.split(/\r?\n/).find((l) => l.startsWith("ipcMain.on('tb:registrar',"));
  assert.ok(lineaIPC, 'No se encontró el handler; adaptar diagnóstico a la fuente actual.');
  vm.runInNewContext(lineaIPC, {
    registroEventos: disco,
    ipcMain: { on(canal, fn) { assert.equal(canal, 'tb:registrar'); handler = fn; } },
  });
  const registro = crearRegistroEventos({ escribir: (l) => handler({}, l), versionTB: 'auditoria',
    versionTC: 'auditoria', nuevaSesion: () => 'sesion-sintetica' });
  const appendOriginal = fs.appendFileSync;
  let intentos = 0;
  try {
    fs.appendFileSync = function (archivo, ...args) {
      if (String(archivo).startsWith(carpeta + path.sep)) {
        intentos++;
        throw Object.assign(new Error('ENOSPC sintetico'), { code: 'ENOSPC' });
      }
      return appendOriginal.call(this, archivo, ...args);
    };
    registro.empezar('AUDITORIA', { placa: 'uno', nivel: 1 });
    registro.editor('bloques_cambiados', { bloques: 1, tipos: { control: 1 } });
    assert.equal(intentos, 2);
    assert.ok(disco.estado().activo && registro.activo());
    assert.equal(disco.archivos().length, 0);
    observado('AUD-02', { intentosFallidos: intentos, activoEnDisco: disco.estado().activo,
      activoEnPagina: registro.activo(), archivos: disco.archivos().length,
      limite: 'Handler y módulos reales; fallo de disco inyectado. No prueba una ventana Electron.' });
  } finally { fs.appendFileSync = appendOriginal; }
}

// 03: entregar una foto ya emitida después de pulsar Pausa elimina definitivamente sus fallas.
{
  const { crearNucleo, FRECUENCIA } = require(path.join(raiz, 'prototipo/pruebas/nucleo.cjs'));
  const { leerHex } = require(path.join(raiz, 'prototipo/pruebas/codigo.cjs'));
  const hex = fs.readFileSync(path.join(raiz, 'prototipo/programas/fijo13.hex'), 'utf8');
  const circuito = { formato: 1, placa: 'uno', protoboard: null,
    componentes: [{ id: 'led1', tipo: 'led', x: 0, y: 0, props: { color: 'rojo' } }],
    cables: [{ de: 'placa.D13', a: 'led1.anodo' }, { de: 'led1.catodo', a: 'placa.GND1' }] };
  let worker;
  class WorkerControlado {
    constructor() { worker = this; this.mensajes = []; }
    postMessage(m) { this.mensajes.push(m); }
    terminate() {}
    recibir(m) { this.onmessage({ data: m }); }
  }
  const fuente = fs.readFileSync(path.join(raiz, 'prototipo/src/simulador.js'), 'utf8')
    .replace(/^import .*;\r?$/mg, '').replace(/^export /mg, '');
  const versionEventos = Number(/VERSION_EVENTOS\s*=\s*(\d+)/.exec(fs.readFileSync(path.join(raiz, 'prototipo/src/eventos.js'), 'utf8'))[1]);
  const entorno = vm.createContext({ leerHex, PLACAS: { uno: {} }, VERSION_EVENTOS: versionEventos, __CODIGO_TRABAJADOR__: 'controlado',
    Worker: WorkerControlado, Blob: class {}, URL: { createObjectURL: () => 'blob:controlado', revokeObjectURL() {} },
    console, requestAnimationFrame: () => 1, cancelAnimationFrame() {} });
  vm.runInContext(fuente, entorno);
  const eventos = [];
  const sim = entorno.crearSimulador({ hex,
    lienzo: { circuito: () => structuredClone(circuito), _mostrar() {}, alCambiar() {} },
    alEvento: (ev) => eventos.push(ev) });
  worker.recibir({ tipo: 'listo' });
  sim.iniciar();
  const turno = () => worker.mensajes.filter((m) => 'turno' in m).at(-1).turno;
  const n = crearNucleo({ hex, circuito, activas: { danoComponentes: true, limitePin: true }, semilla: 1 });
  worker.recibir({ tipo: 'foto', turno: turno(), ...n.foto(), velocidad: 1, msReales: 0 });
  n.avanzar(FRECUENCIA * 0.02);
  const pendiente = { tipo: 'foto', turno: turno(), ...n.foto(), velocidad: 1, msReales: 20 };
  assert.ok(pendiente.fallas.some((f) => f.tipo === 'led_quemado'));
  sim.pausar();
  worker.recibir(pendiente); // mensaje que estaba pendiente cuando se pulsó Pausa
  sim.iniciar();
  const posterior = { tipo: 'foto', turno: turno(), ...n.foto(), velocidad: 1, msReales: 20 };
  worker.recibir(posterior);
  sim.detener();
  const cierre = eventos.find((e) => e.tipo === 'simulacion_detenida');
  assert.ok(posterior.quemados.includes('led1'));
  assert.equal(cierre.datos.fallas.length, 0);
  assert.equal(eventos.filter((e) => e.tipo === 'falla').length, 0);
  observado('AUD-03', { fallasEnFotoDescartada: pendiente.fallas.map((f) => f.tipo),
    quemadosAlReanudar: posterior.quemados, fallasEnCierre: cierre.datos.fallas,
    limite: 'Núcleo y controlador reales; entrega del Worker controlada para fijar el orden de mensajes.' });
  sim.destruir();
}

// 04: confirmar otro equipo durante una corrida cambia su propietario a mitad de la historia.
{
  const app = fs.readFileSync(path.join(hermano, 'src/app.js'), 'utf8');
  const lineas = [];
  let id = 0;
  let dialogo;
  const registro = crearRegistroEventos({ escribir: (l) => lineas.push(l), nuevaSesion: () => `s${++id}`,
    ahora: () => 100, versionTB: 'auditoria', versionTC: 'auditoria' });
  const entorno = vm.createContext({ registroEventos: registro, modal: (d) => { dialogo = d; },
    pintarAvisoRegistro() {}, placaActual: 'uno', nivelActual: 1, simulador: { eventos: [] } });
  const inicioConfirmar = app.indexOf('function confirmarEquipo(');
  const finConfirmar = app.indexOf('/** Lo que pasa en el editor:', inicioConfirmar);
  const inicioEvento = app.indexOf('function registrarEventoSim(');
  const finEvento = app.indexOf('/* ---------- Registro de eventos', inicioEvento);
  assert.ok(inicioConfirmar >= 0 && finConfirmar > inicioConfirmar && inicioEvento >= 0 && finEvento > inicioEvento);
  vm.runInContext(app.slice(inicioConfirmar, finConfirmar), entorno);
  vm.runInContext(app.slice(inicioEvento, finEvento), entorno);
  registro.empezar('A7', { placa: 'uno', nivel: 1 });
  entorno.registrarEventoSim({ v: 1, t: 100, origen: 'simulador', tipo: 'simulacion_iniciada', corrida: 1, ms_sim: 0,
    datos: { circuito: { formato: 1, placa: 'uno', componentes: [], cables: [], protoboard: null } } });
  entorno.confirmarEquipo('B2');
  dialogo.botones[1].accion();
  entorno.registrarEventoSim({ v: 1, t: 100, origen: 'simulador', tipo: 'simulacion_detenida', corrida: 1, ms_sim: 2000,
    datos: { ms_sim: 2000, ms_simulados: 2000, fallas: [] } });
  assert.ok(lineas.some((e) => e.equipo === 'B2' && e.tipo === 'simulacion_detenida'));
  assert.ok(!lineas.some((e) => e.equipo === 'B2' && e.tipo === 'simulacion_iniciada'));
  assert.ok(!lineas.some((e) => e.equipo === 'A7' && e.tipo === 'simulacion_detenida'));
  observado('AUD-04', { historia: lineas.map(({ equipo, sesion, tipo, corrida }) => ({ equipo, sesion, tipo, corrida })),
    limite: 'Funciones reales de app.js y registro real; callbacks de interfaz invocados sin Electron.' });
}

// 05: observar en memoria instrucciones AVR ejecutadas después de detectar caída de energía.
{
  const Module = require('node:module');
  const archivo = path.join(raiz, 'prototipo/pruebas/nucleo.cjs');
  let codigo = fs.readFileSync(archivo, 'utf8');
  const instruccion = 'ejecutarInstruccion(cpu);';
  const corte = 'apagada = siguiente.apagada;';
  assert.equal(codigo.split(instruccion).length, 2, 'Instrumentación de instrucciones ambigua.');
  assert.equal(codigo.split(corte).length, 2, 'Instrumentación del corte ambigua.');
  codigo = codigo.replace(instruccion,
    'if(globalThis.__tcAuditOff){globalThis.__tcAuditIns++;globalThis.__tcAuditLast=cpu.cycles;} ejecutarInstruccion(cpu);');
  codigo = codigo.replace(corte,
    'apagada = siguiente.apagada; globalThis.__tcAuditOff=apagada; if(apagada && globalThis.__tcAuditCut===null) globalThis.__tcAuditCut=chip.ciclos;');
  const mod = new Module(archivo, module);
  mod.filename = archivo;
  mod.paths = Module._nodeModulePaths(path.dirname(archivo));
  mod._compile(codigo, archivo); // solo contadores; sin escribir el bundle ni cambiar el control de flujo
  const { crearNucleo, FRECUENCIA } = mod.exports;
  const hex = fs.readFileSync(path.join(raiz, 'prototipo/programas/nano_adc67.hex'), 'utf8');
  const resultados = [];
  try {
    for (const paso of [16, 1]) {
      globalThis.__tcAuditOff = false;
      globalThis.__tcAuditIns = 0;
      globalThis.__tcAuditCut = null;
      globalThis.__tcAuditLast = null;
      const n = crearNucleo({ hex, semilla: 77, activas: { limiteUSB: true }, circuito: {
        formato: 1, placa: 'nano', protoboard: null,
        componentes: [
          { id: 'exp', tipo: 'shield_nano_io', x: 0, y: 0, rot: 0,
            props: { variante: 'roja', alimentacion: 'jack', voltajeJack: 9 } },
          { id: 'r', tipo: 'resistencia', x: 0, y: 0, rot: 0, props: { ohmios: 0.25 } },
        ], cables: [{ de: 'exp.OUT_5V', a: 'r.1' }, { de: 'r.2', a: 'exp.GND_OUT' }],
      } });
      for (let ms = 0; ms < 16; ms += paso) n.avanzar(FRECUENCIA * paso / 1000);
      const energia = n.foto().energia;
      resultados.push({ paso_ms: paso, cicloCorte: globalThis.__tcAuditCut,
        instruccionesPosterioresAlCorte: globalThis.__tcAuditIns,
        ultimoCicloEjecutadoSinEnergia: globalThis.__tcAuditLast, v5: energia.voltios,
        reinicios: energia.reinicios, apagada: energia.apagada });
    }
    assert.ok(resultados.every((r) => r.apagada));
    assert.ok(resultados[0].instruccionesPosterioresAlCorte > 0);
    assert.equal(resultados[1].instruccionesPosterioresAlCorte, 0);
    observado('AUD-05', { resultados,
      limite: 'API del núcleo con pasos de 16 ms; el Worker actual limita sus pasos a 1 ms. Solo observación en memoria.' });
  } finally {
    for (const k of ['__tcAuditOff', '__tcAuditIns', '__tcAuditCut', '__tcAuditLast']) delete globalThis[k];
  }
}

console.log(`${reproducidos} defectos reproducidos. Esto NO acredita que estén corregidos.`);
