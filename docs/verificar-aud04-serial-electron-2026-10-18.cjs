// SPDX-License-Identifier: Apache-2.0
// Arduino CLI y Electron reales; puerto sintético con close() pendiente, sin hardware.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../../TecnoBloques');
const { _electron: electron } = require(path.join(root, 'node_modules/playwright-core'));
const { crearRegistroDisco } = require(path.join(root, 'escritorio/registro-disco.js'));
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-aud04-serial-'));
const disk = crearRegistroDisco({ carpeta: profile });
assert(disk.instructor({ accion: 'crear-pin', pin: '2468' }).ok);
assert(disk.instructor({ accion: 'activar', pin: '2468', activo: true }).ok);
let app;
(async () => {
  try {
    const env = { ...process.env, TB_HERRAMIENTAS: 'instructor' };
    delete env.ELECTRON_RUN_AS_NODE;
    app = await electron.launch({ args: [root, `--user-data-dir=${profile}`], cwd: root, env });
    const win = await app.firstWindow();
    const errors = [];
    win.on('pageerror', e => errors.push(String(e)));
    win.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
    await win.waitForLoadState('load');
    const button = text => win.locator('#modalAcciones button', { hasText: text }).click();
    async function confirm(code) {
      await win.locator('#codigoEquipo').fill(code);
      await button('Seguir');
      await win.waitForFunction(c => document.getElementById('modalTitulo').textContent.includes(c), code);
      await button('Sí, somos ese equipo');
    }
    await confirm('A7');
    await win.evaluate(async () => { cargarEjemplo(EJEMPLOS.find(e => e.id === 'eco')); await simular(); });
    await win.waitForFunction(() => simulador.sim && simulador.sim.medidas().msSimulados > 100, null, { timeout: 40000 });
    await win.locator('#avisoRegistro').click();
    await confirm('B2');
    const original = await win.evaluate(() => ({ equipo: registroEventos.equipo(), sinSimulacion: simulador.sim === null }));
    assert.equal(original.equipo, 'B2');
    assert(original.sinSimulacion, 'El original AUD-04 debe estar corregido.');

    // Se ejecuta desconectarSerial real; solo el objeto puerto es sintético.
    async function esperarCierre() {
      await win.evaluate(() => {
      window.__aud04Closing = false;
      serial.lector = null;
      serial.bucle = null;
      serial.conectado = true;
      serial.puerto = { close: () => {
        window.__aud04Closing = true;
        return new Promise(resolve => { window.__aud04Release = resolve; });
      } };
      window.__aud04Pending = simular();
      });
      await win.waitForFunction(() => window.__aud04Closing, null, { timeout: 40000 });
    }
    await esperarCierre();
    await win.evaluate(async () => { window.__aud04Release(); await window.__aud04Pending; });
    const controlSerial = await win.evaluate(() => ({ equipo: registroEventos.equipo(), estado: simulador.sim?.medidas().estado || null }));
    assert.equal(controlSerial.equipo, 'B2');
    assert.equal(controlSerial.estado, 'corriendo');
    await win.evaluate(() => detenerSimulacion());
    await esperarCierre();
    const waiting = await win.evaluate(() => ({ equipo: registroEventos.equipo(), sinSimulacion: simulador.sim === null, compilando: simulador.compilando }));
    await win.locator('#avisoRegistro').click();
    await confirm('C3');
    await win.evaluate(async () => { window.__aud04Release(); await window.__aud04Pending; });
    await win.waitForTimeout(500);
    const after = await win.evaluate(() => ({ equipo: registroEventos.equipo(), estado: simulador.sim?.medidas().estado || null,
      toast: document.getElementById('toast').textContent }));
    await app.close();
    app = null;
    const events = disk.archivos().flatMap(f => fs.readFileSync(path.join(disk.carpeta, f), 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)));
    const history = events.map(({ equipo, sesion, tipo, corrida }) => ({ equipo, sesion, tipo, corrida }));
    const a = events.filter(e => e.equipo === 'A7');
    assert(a.findIndex(e => e.tipo === 'simulacion_detenida') >= 0);
    assert(a.findIndex(e => e.tipo === 'simulacion_detenida') < a.findIndex(e => e.tipo === 'sesion_terminada'));
    const { revisarEvento } = require('../prototipo/pruebas/contrato_eventos.js');
    const schema = events.flatMap(revisarEvento);
    assert.deepEqual(schema, []);
    const result = { original, controlSerialSinCambio: controlSerial, esperandoCierreSerialSintetico: waiting, despues: after, historia: history, erroresContrato: schema, erroresJS: errors,
      alcance: 'Desconexión serial real con puerto sintético; compilación y simulador reales. No se abrió ni escribió una placa física.' };
    console.log(JSON.stringify(result, null, 2));
    process.exitCode = after.estado === null && !events.some(e => e.equipo === 'C3' && e.tipo === 'simulacion_iniciada') && !errors.length ? 0 : 1;
  } finally {
    if (app) await app.close();
    assert.equal(path.dirname(path.resolve(profile)), path.resolve(os.tmpdir()));
    fs.rmSync(profile, { recursive: true, force: true });
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
