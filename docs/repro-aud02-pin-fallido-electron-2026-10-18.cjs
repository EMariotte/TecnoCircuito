// SPDX-License-Identifier: Apache-2.0
// Arranque real tras un reemplazo confirmado cuyo guardado falla; perfil sintético.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../../TecnoBloques');
const { _electron: electron } = require(path.join(root, 'node_modules/playwright-core'));
const { crearRegistroDisco } = require(path.join(root, 'escritorio/registro-disco.js'));
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-aud02-pin-'));
const config = path.join(profile, 'registro-config.json');
fs.writeFileSync(config, '{ roto');
const disk = crearRegistroDisco({ carpeta: profile });
const before = disk.estado();
const originalWrite = fs.writeFileSync;
let error = null, app;
try {
  fs.writeFileSync = function(file, ...args) {
    if (String(file) === config + '.tmp') throw Object.assign(new Error('ENOSPC sintético'), { code: 'ENOSPC' });
    return originalWrite.call(this, file, ...args);
  };
  disk.instructor({ accion: 'crear-pin', pin: '9999', reemplazarIlegible: true });
} catch (e) { error = e.code || String(e); }
finally { fs.writeFileSync = originalWrite; }
(async () => {
  try {
    assert.equal(error, 'ENOSPC');
    const env = { ...process.env, TB_HERRAMIENTAS: 'instructor' };
    delete env.ELECTRON_RUN_AS_NODE;
    app = await electron.launch({ args: [root, `--user-data-dir=${profile}`], cwd: root, env });
    const win = await app.firstWindow();
    const errors = [];
    win.on('pageerror', e => errors.push(String(e)));
    await win.waitForLoadState('load');
    await win.waitForTimeout(1500);
    const state = await win.evaluate(async () => ({ estado: await window.tbEscritorio.registro.estado(),
      avisoOculto: document.getElementById('avisoRegistro').hidden }));
    await win.keyboard.press('Control+Alt+Shift+KeyR');
    await win.waitForTimeout(300);
    state.tituloPanel = await win.locator('#modalTitulo').textContent();
    console.log(JSON.stringify({ antes: before, errorAlGuardar: error, ...state, erroresJS: errors }, null, 2));
    process.exitCode = state.avisoOculto || !state.estado.falla ? 1 : 0;
  } finally {
    if (app) await app.close();
    assert.equal(path.dirname(path.resolve(profile)), path.resolve(os.tmpdir()));
    fs.rmSync(profile, { recursive: true, force: true });
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
