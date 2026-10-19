// SPDX-License-Identifier: Apache-2.0
// Límite declarado en CLA-010: fallo del reemplazo y del intento de deshacerlo.
'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const file = path.resolve(__dirname, '../../TecnoBloques/escritorio/registro-disco.js');
const { crearRegistroDisco } = require(file);
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-aud02-deshacer-'));
const results = [];
try {
  for (const fallaDeshacer of [false, true]) {
    const carpeta = path.join(base, fallaDeshacer ? 'doble' : 'control');
    fs.mkdirSync(carpeta);
    const config = path.join(carpeta, 'registro-config.json');
    fs.mkdirSync(config);
    fs.writeFileSync(path.join(config, 'sintetico.txt'), 'evidencia sintetica');
    const nuevo = () => crearRegistroDisco({ carpeta });
    const disk = nuevo();
    assert(disk.estado().configIlegible);
    const rename = fs.renameSync;
    const erroresInyectados = [];
    let respuesta, error = null;
    try {
      fs.renameSync = function(a, b, ...args) {
        const final = String(a) === config + '.tmp' && String(b) === config;
        const vuelta = String(a).includes('registro-config-ilegible-') && String(b) === config;
        if (final || (vuelta && fallaDeshacer)) {
          erroresInyectados.push(final ? 'rename-final' : 'deshacer');
          throw Object.assign(new Error('EPERM sintético'), { code: 'EPERM' });
        }
        return rename.call(this, a, b, ...args);
      };
      respuesta = disk.instructor({ accion: 'crear-pin', pin: '9999', reemplazarIlegible: true });
    } catch (e) { error = e.code || String(e); }
    finally { fs.renameSync = rename; }
    assert.equal(error, null);
    assert.deepEqual(respuesta, { ok: false, motivo: 'disco' });
    assert.deepEqual(erroresInyectados, fallaDeshacer ? ['rename-final', 'deshacer'] : ['rename-final']);
    const aparte = fs.readdirSync(carpeta).find(n => n.startsWith('registro-config-ilegible-'));
    const evidencia = fs.existsSync(config) ? config : path.join(carpeta, aparte);
    results.push({ fallaDeshacer, respuesta, error, erroresInyectados, existePrincipal: fs.existsSync(config),
      evidenciaIntacta: fs.readFileSync(path.join(evidencia, 'sintetico.txt'), 'utf8') === 'evidencia sintetica',
      estado: disk.estado(), estadoTrasReinicio: nuevo().estado() });
  }
  assert(results[0].estadoTrasReinicio.configIlegible);
  console.log(JSON.stringify({ fechaUTC: new Date().toISOString(), sha256Disco: crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'), casos: results }, null, 2));
  process.exitCode = results.some(r => !r.estadoTrasReinicio.falla) ? 1 : 0;
} finally {
  assert.equal(path.dirname(path.resolve(base)), path.resolve(os.tmpdir()));
  fs.rmSync(base, { recursive: true, force: true });
}
