// SPDX-License-Identifier: Apache-2.0
// Perfil y registros sintéticos; comprueba el arranque CONFIG sin tocar datos de usuario.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..', '..', 'TecnoBloques');
const { _electron: electron } = require(path.join(root, 'node_modules/playwright-core'));
const { crearRegistroDisco } = require(path.join(root, 'escritorio/registro-disco.js'));
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-aud02-arranque-'));
const disk = crearRegistroDisco({ carpeta: profile });
assert(disk.instructor({ accion: 'crear-pin', pin: '2468' }).ok);
assert(disk.instructor({ accion: 'activar', pin: '2468', activo: true }).ok);
fs.writeFileSync(path.join(profile, 'registro-config.json'), '{ roto');
let app;
(async () => {
  try {
    const env = { ...process.env, TB_HERRAMIENTAS: 'instructor' };
    delete env.ELECTRON_RUN_AS_NODE;
    app = await electron.launch({ args: [root, `--user-data-dir=${profile}`], cwd: root, env });
    const win = await app.firstWindow();
    const errors = [];
    win.on('pageerror', e => errors.push(String(e)));
    await win.waitForLoadState('load');
    await win.waitForTimeout(1500);
    const state = await win.evaluate(async () => ({
      estado: await window.tbEscritorio.registro.estado(),
      avisoOculto: document.getElementById('avisoRegistro').hidden,
      textoAviso: document.getElementById('avisoRegistro').textContent,
    }));
    await win.keyboard.press('Control+Alt+Shift+KeyR');
    await win.waitForTimeout(300);
    state.tituloPanel = await win.locator('#modalTitulo').textContent();
    state.erroresJS = errors;
    const output = path.join(__dirname, '..', 'prototipo/pruebas/capturas/aud02-config-arranque.png');
    fs.mkdirSync(path.dirname(output), { recursive: true });
    await win.screenshot({ path: output });
    console.log(JSON.stringify(state, null, 2));
    process.exitCode = state.avisoOculto || !state.estado.falla ? 1 : 0;
  } finally {
    if (app) await app.close();
    assert.equal(path.dirname(path.resolve(profile)), path.resolve(os.tmpdir()));
    fs.rmSync(profile, { recursive: true, force: true });
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
