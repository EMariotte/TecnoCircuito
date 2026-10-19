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
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-aud02-tercera-'));
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
  let thrown = null, respuesta = null;
  try {
    fs.writeFileSync = function(file, ...args) {
      if (String(file) === config + '.tmp') throw Object.assign(new Error('ENOSPC sintético al guardar PIN'), { code: 'ENOSPC' });
      return originalWrite.call(this, file, ...args);
    };
    respuesta = cold.instructor({ accion: 'crear-pin', pin: '9999', reemplazarIlegible: true });
  } catch (e) { thrown = e.code || String(e); }
  finally { fs.writeFileSync = originalWrite; }
  assert.equal(thrown, null);
  assert.deepEqual(respuesta, { ok: false, motivo: 'disco' });
  result.configReemplazoFallido = { respuesta, error: thrown, estado: cold.estado(), estadoTrasReinicio: factory(c.carpeta).estado(),
    existeConfig: fs.existsSync(config), archivadas: fs.readdirSync(c.carpeta).filter(n => n.startsWith('registro-config-ilegible-')).length,
    registros: inspect(c.file) };
  // Mismo reemplazo, tres etapas de fallo y dos formas de configuración ilegible soportadas.
  result.matrizConfig = [];
  for (const clase of ['archivo', 'carpeta']) for (const etapa of ['temporal', 'archivo-aparte', 'rename-final']) {
    const carpeta = path.join(base, clase + '-' + etapa);
    fs.mkdirSync(carpeta);
    const cfg = path.join(carpeta, 'registro-config.json');
    if (clase === 'archivo') fs.writeFileSync(cfg, '{ roto');
    else { fs.mkdirSync(cfg); fs.writeFileSync(path.join(cfg, 'sintetico.txt'), 'evidencia sintetica'); }
    const d = factory(carpeta);
    const before = d.estado();
    assert(before.configIlegible && before.falla.motivo === 'CONFIG');
    const write = fs.writeFileSync, copy = fs.copyFileSync, rename = fs.renameSync;
    const fallo = () => { throw Object.assign(new Error('ENOSPC sintético'), { code: 'ENOSPC' }); };
    let respuesta = null, error = null;
    try {
      fs.writeFileSync = function(a, ...args) { return etapa === 'temporal' && String(a) === cfg + '.tmp' ? fallo() : write.call(this, a, ...args); };
      fs.copyFileSync = function(a, ...args) { return etapa === 'archivo-aparte' && String(a) === cfg ? fallo() : copy.call(this, a, ...args); };
      fs.renameSync = function(a, b, ...args) {
        if ((etapa === 'rename-final' && String(a) === cfg + '.tmp' && String(b) === cfg) ||
            (etapa === 'archivo-aparte' && clase === 'carpeta' && String(a) === cfg)) return fallo();
        return rename.call(this, a, b, ...args);
      };
      respuesta = d.instructor({ accion: 'crear-pin', pin: '9999', reemplazarIlegible: true });
    } catch (e) { error = e.code || String(e); }
    finally { fs.writeFileSync = write; fs.copyFileSync = copy; fs.renameSync = rename; }
    const after = d.estado(), cold = factory(carpeta).estado();
    const archives = fs.readdirSync(carpeta).filter(n => n.startsWith('registro-config-ilegible-'));
    const protectedEvidence = fs.existsSync(cfg) ? cfg : path.join(carpeta, archives[0] || 'inexistente');
    const intact = fs.existsSync(protectedEvidence) && (clase === 'archivo' ? fs.readFileSync(protectedEvidence, 'utf8') === '{ roto' : fs.readFileSync(path.join(protectedEvidence, 'sintetico.txt'), 'utf8') === 'evidencia sintetica');
    result.matrizConfig.push({ clase, etapa, respuesta, error, existePrincipal: fs.existsSync(cfg), existeTemporal: fs.existsSync(cfg + '.tmp'), evidenciaIntacta: intact,
      copiasAparte: archives.length, estado: after, estadoTrasReinicio: cold,
      cumple: !error && respuesta && respuesta.motivo === 'disco' && cold.configIlegible && cold.falla && cold.falla.motivo === 'CONFIG' });
  }
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.utf8.lineasInvalidas.length || !result.configReemplazoFallido.estado.falla || result.matrizConfig.some(c => !c.cumple) ? 1 : 0;
} finally {
  assert.equal(path.dirname(path.resolve(base)), path.resolve(os.tmpdir()));
  fs.rmSync(base, { recursive: true, force: true });
}
