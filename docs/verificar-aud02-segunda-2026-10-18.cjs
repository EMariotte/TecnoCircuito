// SPDX-License-Identifier: Apache-2.0
// Auditoría de fronteras: solo perfiles temporales y datos sintéticos.
'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../../TecnoBloques');
const source = path.join(root, 'escritorio/registro-disco.js');
const { crearRegistroDisco } = require(source);
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-aud02-segunda-'));
const t = new Date(2026, 9, 18, 16, 0).getTime();
const event = n => ({ v: 1, t, origen: 'editor', tipo: 'bloques_cambiados', datos: { bloques: n, tipos: {} },
  equipo: 'SINTETICO', sesion: 'auditoria', version_tb: '0.3.0', version_tc: '0.1.0-dev' });
const factory = carpeta => crearRegistroDisco({ carpeta, ahora: () => t, reintentoMs: 3600000 });
function start(name) {
  const carpeta = path.join(base, name);
  const disk = factory(carpeta);
  assert(disk.instructor({ accion: 'crear-pin', pin: '2468' }).ok);
  assert(disk.instructor({ accion: 'activar', pin: '2468', activo: true }).ok);
  assert(disk.escribir(event(0)));
  const file = path.join(carpeta, 'registros', disk.archivos()[0]);
  return { carpeta, disk, file };
}
function inspect(file) {
  const lines = fs.readFileSync(file, 'utf8').trimEnd().split('\n');
  const valid = [], invalid = [];
  lines.forEach((line, i) => { try { valid.push(JSON.parse(line)); } catch (e) { invalid.push(i + 1); } });
  return { lineasValidas: valid.length, lineasInvalidas: invalid, tipos: valid.map(e => e.tipo), bytes: fs.statSync(file).size };
}
const result = { sha256Disco: crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'), fechaUTC: new Date().toISOString() };
try {
  // Programa sintético sin comentarios, con texto Unicode que el contrato conserva.
  const large = { ...event(1), tipo: 'codigo_compilado', datos: { ok: true, codigo: 'const char texto[] = "' + 'ñ'.repeat(1400000) + '";' } };
  const text = JSON.stringify(large);
  const { revisarEvento } = require('../prototipo/pruebas/contrato_eventos.js');
  result.erroresContrato = revisarEvento(large);
  assert.equal(result.erroresContrato.length, 0);
  result.tamanoEvento = { caracteres: text.length, bytesUTF8: Buffer.byteLength(text), limiteCaracteres: 2 * 1024 * 1024 };
  const control = start('control');
  result.controlEntero = { aceptado: control.disk.escribir(large), ...inspect(control.file) };
  assert(result.controlEntero.aceptado);
  assert.equal(result.controlEntero.lineasInvalidas.length, 0);
  // Cierre abrupto simulado: el archivo conserva una línea completa y un prefijo real sin LF.
  for (const [name, prefix] of [['corto', Buffer.from(text).subarray(0, 24)], ['utf8', Buffer.from(text).subarray(0, 2500000)]]) {
    const c = start(name);
    const intact = fs.readFileSync(c.file);
    fs.appendFileSync(c.file, prefix);
    const cold = factory(c.carpeta);
    const accepted = cold.escribir(event(2));
    result[name] = { bytesParciales: prefix.length, eventoNuevoAceptado: accepted, ...inspect(c.file), estado: cold.estado(),
      primeraLineaIntacta: fs.readFileSync(c.file).subarray(0, intact.length).equals(intact) };
  }
  assert.equal(result.corto.lineasInvalidas.length, 0);
  assert(result.corto.primeraLineaIntacta && result.utf8.primeraLineaIntacta);
  // La recuperación confirmada debe conservar el fallo si tampoco puede guardar el PIN nuevo.
  const c = start('config');
  const config = path.join(c.carpeta, 'registro-config.json');
  fs.writeFileSync(config, '{ roto');
  const cold = factory(c.carpeta);
  result.configSinConfirmar = cold.instructor({ accion: 'crear-pin', pin: '9999' });
  const originalWrite = fs.writeFileSync;
  let thrown = null;
  try {
    fs.writeFileSync = function(file, ...args) {
      if (String(file) === config + '.tmp') throw Object.assign(new Error('ENOSPC sintético al guardar PIN'), { code: 'ENOSPC' });
      return originalWrite.call(this, file, ...args);
    };
    cold.instructor({ accion: 'crear-pin', pin: '9999', reemplazarIlegible: true });
  } catch (e) { thrown = e.code || String(e); }
  finally { fs.writeFileSync = originalWrite; }
  assert.equal(thrown, 'ENOSPC');
  result.configReemplazoFallido = { error: thrown, estado: cold.estado(), estadoTrasReinicio: factory(c.carpeta).estado(),
    existeConfig: fs.existsSync(config), archivadas: fs.readdirSync(c.carpeta).filter(n => n.startsWith('registro-config-ilegible-')).length,
    registros: inspect(c.file) };
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.utf8.lineasInvalidas.length || !result.configReemplazoFallido.estado.falla ? 1 : 0;
} finally {
  assert.equal(path.dirname(path.resolve(base)), path.resolve(os.tmpdir()));
  fs.rmSync(base, { recursive: true, force: true });
}
