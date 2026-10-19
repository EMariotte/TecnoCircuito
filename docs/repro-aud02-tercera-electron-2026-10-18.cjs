// SPDX-License-Identifier: Apache-2.0
// Configuración sintética: fallo del rename final, archivo frente a carpeta.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../../TecnoBloques');
const { _electron: electron } = require(path.join(root, 'node_modules/playwright-core'));
const { crearRegistroDisco } = require(path.join(root, 'escritorio/registro-disco.js'));
const profiles = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-aud02-tercera-app-'));
const results = [];
let app;
(async () => {
  try {
    for (const clase of ['archivo', 'carpeta']) {
      const profile = path.join(profiles, clase);
      fs.mkdirSync(profile);
      const config = path.join(profile, 'registro-config.json');
      if (clase === 'archivo') fs.writeFileSync(config, '{ roto');
      else fs.mkdirSync(config);
      const disk = crearRegistroDisco({ carpeta: profile });
      const before = disk.estado();
      assert(before.configIlegible);
      const rename = fs.renameSync;
      let respuesta, error = null, injected = 0;
      try {
        fs.renameSync = function(a, b, ...args) {
          if (String(a) === config + '.tmp' && String(b) === config) {
            injected++;
            throw Object.assign(new Error('ENOSPC sintético al reemplazar'), { code: 'ENOSPC' });
          }
          return rename.call(this, a, b, ...args);
        };
        respuesta = disk.instructor({ accion: 'crear-pin', pin: '9999', reemplazarIlegible: true });
      } catch (e) { error = e.code || String(e); }
      finally { fs.renameSync = rename; }
      assert.equal(injected, 1);
      assert.equal(error, null);
      assert.deepEqual(respuesta, { ok: false, motivo: 'disco' });
      const env = { ...process.env, TB_HERRAMIENTAS: 'instructor' };
      delete env.ELECTRON_RUN_AS_NODE;
      app = await electron.launch({ args: [root, `--user-data-dir=${profile}`], cwd: root, env });
      const win = await app.firstWindow();
      const errors = [];
      win.on('pageerror', e => errors.push(String(e)));
      win.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      await win.waitForLoadState('load');
      await win.waitForTimeout(1500);
      const state = await win.evaluate(async () => ({ estado: await window.tbEscritorio.registro.estado(),
        avisoOculto: document.getElementById('avisoRegistro').hidden }));
      await win.keyboard.press('Control+Alt+Shift+KeyR');
      await win.waitForTimeout(300);
      state.tituloPanel = await win.locator('#modalTitulo').textContent();
      results.push({ clase, antes: before, respuesta, error, ...state, erroresJS: errors });
      await app.close();
      app = null;
    }
    console.log(JSON.stringify(results, null, 2));
    process.exitCode = results.some(r => r.avisoOculto || !r.estado.falla) ? 1 : 0;
  } finally {
    if (app) await app.close();
    assert.equal(path.dirname(path.resolve(profiles)), path.resolve(os.tmpdir()));
    fs.rmSync(profiles, { recursive: true, force: true });
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
