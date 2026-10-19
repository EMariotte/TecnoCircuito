// SPDX-License-Identifier: Apache-2.0
// Auditoría: datos sintéticos y carpetas temporales. No cambia producto.
// Exit 1: todavía hay condiciones de aceptación incumplidas, no una regresión aprobada.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const { spawnSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..', '..', 'TecnoBloques');
const diskFile = path.join(root, 'escritorio/registro-disco.js');
const current = require(diskFile).crearRegistroDisco;
const git = spawnSync('git', ['-c', `safe.directory=${root.replaceAll('\\', '/')}`, '-C', root, 'show', 'HEAD:escritorio/registro-disco.js'],
  { encoding: 'utf8', windowsHide: true });
assert.ifError(git.error);
assert.equal(git.status, 0, git.stderr);
const old = { exports: {} };
vm.runInNewContext(git.stdout, { module: old, require: createRequire(diskFile), Buffer, setInterval, clearInterval });
function realHandler(disk, source) {
  const line = source.split(/\r?\n/).find(l => l.startsWith("ipcMain.on('tb:registrar',"));
  assert(line, 'Adaptar extracción del manejador.');
  let handler;
  vm.runInNewContext(line, { registroEventos: disk, ipcMain: { on(channel, f) {
    assert.equal(channel, 'tb:registrar'); handler = f;
  } } });
  return event => handler({}, event);
}
const oldMain = spawnSync('git', ['-c', `safe.directory=${root.replaceAll('\\', '/')}`, '-C', root, 'show', 'HEAD:escritorio/main.js'],
  { encoding: 'utf8', windowsHide: true });
assert.equal(oldMain.status, 0, oldMain.stderr);
const currentMain = fs.readFileSync(path.join(root, 'escritorio/main.js'), 'utf8');
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-aud02-'));
const originalAppend = fs.appendFileSync;
const t = new Date(2026, 9, 18, 15, 0).getTime();
const event = n => ({ v: 1, t, origen: 'editor', tipo: 'bloques_cambiados', datos: { bloques: n, tipos: {} },
  equipo: 'AUDITORIA', sesion: 'sintetica', version_tb: '0.4.0', version_tc: '0.2.0' });
function start(name, factory = current) {
  const folder = path.join(base, name);
  const notices = [];
  const disk = factory({ carpeta: folder, ahora: () => t, reintentoMs: 3600000, alCambiar: (falla, fin) => notices.push({ falla, fin }) });
  assert(disk.instructor({ accion: 'crear-pin', pin: '2468' }).ok);
  assert(disk.instructor({ accion: 'activar', pin: '2468', activo: true }).ok);
  return { folder, disk, notices };
}
const result = {};
try {
  // Caso original, módulo real en HEAD. El manejador original calla lo que lanza escribir().
  const before = start('antes', old.exports.crearRegistroDisco);
  const beforeHandler = realHandler(before.disk, oldMain.stdout);
  let attempts = 0;
  fs.appendFileSync = function (file, ...args) {
    if (String(file).startsWith(before.folder + path.sep)) { attempts++; throw Object.assign(new Error('ENOSPC sintético'), { code: 'ENOSPC' }); }
    return originalAppend.call(this, file, ...args);
  };
  for (let n = 0; n < 2; n++) beforeHandler(event(n));
  fs.appendFileSync = originalAppend;
  result.original = { intentosFallidos: attempts, estado: before.disk.estado(), avisos: before.notices.length,
    archivos: before.disk.archivos().length };
  // Control positivo: el fallo que no escribe ni un byte sí se notifica y se recupera.
  const full = start('completo');
  const fullHandler = realHandler(full.disk, currentMain);
  fs.appendFileSync = function (file, ...args) {
    if (String(file).startsWith(full.folder + path.sep)) throw Object.assign(new Error('ENOSPC sintético'), { code: 'ENOSPC' });
    return originalAppend.call(this, file, ...args);
  };
  fullHandler(event(1));
  const during = full.disk.estado();
  fs.appendFileSync = originalAppend;
  full.disk.reintentar();
  const fullLines = fs.readFileSync(path.join(full.folder, 'registros', full.disk.archivos()[0]), 'utf8').trim().split('\n').map(JSON.parse);
  result.falloCompleto = { durante: during, despues: full.disk.estado(), avisos: full.notices,
    lineasValidas: fullLines.length, tipos: fullLines.map(l => l.tipo) };
  // Fallo a mitad de append: se escriben realmente 24 bytes y luego se lanza ENOSPC, solo en este archivo temporal.
  const partial = start('parcial');
  let injected = false;
  fs.appendFileSync = function (file, data, ...args) {
    if (!injected && String(file).startsWith(partial.folder + path.sep)) {
      injected = true;
      originalAppend.call(this, file, Buffer.from(data).subarray(0, 24));
      throw Object.assign(new Error('ENOSPC después de 24 bytes sintéticos'), { code: 'ENOSPC' });
    }
    return originalAppend.call(this, file, data, ...args);
  };
  partial.disk.escribir(event(2));
  const partialDuring = partial.disk.estado();
  fs.appendFileSync = originalAppend;
  partial.disk.reintentar();
  const contents = fs.readFileSync(path.join(partial.folder, 'registros', partial.disk.archivos()[0]), 'utf8');
  const lines = contents.trim().split('\n');
  const parsed = lines.map((line, index) => { try { return { numero: index + 1, evento: JSON.parse(line) }; }
    catch (e) { return { numero: index + 1, error: e.message, texto: line }; } });
  result.escrituraParcial = { inyeccion: '24 bytes escritos realmente en archivo temporal antes de ENOSPC; no se llenó un disco físico',
    durante: partialDuring, despues: partial.disk.estado(), avisos: partial.notices,
    lineasInvalidas: parsed.filter(l => l.error).length, lineas: parsed };
  // CONFIG antes del arranque: estado() decide qué hace iniciarRegistro() en la página.
  const config = start('config');
  const configFile = path.join(config.folder, 'registro-config.json');
  fs.writeFileSync(configFile, '{ roto');
  const cold = current({ carpeta: config.folder, ahora: () => t, reintentoMs: 3600000 });
  const state = cold.estado();
  result.configuracionAlArrancar = { estado: state, reglaRealInterfaz: 'registroEncendido = estado.activo; a.hidden = !registroEncendido',
    avisoOculto: !state.activo, fallaAusente: state.falla === null,
    puedeSobrescribirPinSinPinAnterior: cold.instructor({ accion: 'crear-pin', pin: '9999' }).ok };
} finally {
  fs.appendFileSync = originalAppend;
  assert.equal(path.dirname(path.resolve(base)), path.resolve(os.tmpdir()));
  fs.rmSync(base, { recursive: true, force: true });
}
result.sha256Disco = createHash('sha256').update(fs.readFileSync(diskFile)).digest('hex');
result.fechaUTC = new Date().toISOString();
console.log(JSON.stringify(result, null, 2));
const ok = result.falloCompleto.durante.falla && !result.falloCompleto.despues.falla &&
  !result.escrituraParcial.lineasInvalidas && !result.configuracionAlArrancar.avisoOculto;
process.exitCode = ok ? 0 : 1;
