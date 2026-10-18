// SPDX-License-Identifier: Apache-2.0
// Reproduce AUD-04 en Electron con equipos sintéticos y compilación Arduino real.
// No es una regresión aprobada: espera observar el defecto actual.
// Requiere el HTML del hermano construido con --simulador-local.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const raiz = path.resolve(__dirname, '..');
const hermano = path.resolve(raiz, '..', 'TecnoBloques');
const { _electron: electron } = require(path.join(hermano, 'node_modules/playwright-core'));
const { crearRegistroDisco } = require(path.join(hermano, 'escritorio/registro-disco.js'));

(async () => {
  const datos = fs.mkdtempSync(path.join(os.tmpdir(), 'tecnocircuito-auditoria-equipo-'));
  const disco = crearRegistroDisco({ carpeta: datos });
  assert.ok(disco.instructor({ accion: 'crear-pin', pin: '2468' }).ok);
  assert.ok(disco.instructor({ accion: 'activar', pin: '2468', activo: true }).ok);
  const env = Object.fromEntries(Object.entries(process.env).filter(([k]) => k !== 'ELECTRON_RUN_AS_NODE'));
  const app = await electron.launch({ args: [hermano, `--user-data-dir=${datos}`], cwd: hermano, env });
  try {
    const win = await app.firstWindow();
    const errores = [];
    win.on('pageerror', (e) => errores.push(String(e)));
    await win.waitForLoadState('load');
    const boton = (texto) => win.locator('#modalAcciones button', { hasText: texto }).click();
    async function confirmar(codigo) {
      await win.locator('#codigoEquipo').fill(codigo);
      await boton('Seguir');
      await win.waitForFunction((c) => document.getElementById('modalTitulo').textContent.includes(c), codigo);
      await boton('Sí, somos ese equipo');
    }
    await confirmar('A7');
    await win.evaluate(async () => {
      cargarEjemplo(EJEMPLOS.find((e) => e.id === 'eco'));
      await simular();
    });
    await win.waitForFunction(() => simulador.sim && simulador.sim.medidas().msSimulados > 100, null, { timeout: 40000 });
    const antes = await win.evaluate(() => ({ equipo: registroEventos.equipo(), estado: simulador.sim.medidas().estado }));
    await win.locator('#avisoRegistro').click();
    await confirmar('B2');
    const despues = await win.evaluate(() => ({ equipo: registroEventos.equipo(), estado: simulador.sim?.medidas().estado }));
    const salida = path.join(raiz, 'prototipo/pruebas/capturas/auditoria-equipo-2026-10-17');
    fs.mkdirSync(salida, { recursive: true });
    await win.screenshot({ path: path.join(salida, 'equipo-b2-corrida-de-a7.png') });
    await win.evaluate(() => detenerSimulacion());
    await win.waitForTimeout(400); // el IPC send debe llegar al proceso principal
    const eventos = disco.archivos().flatMap((f) => fs.readFileSync(path.join(disco.carpeta, f), 'utf8')
      .split('\n').filter(Boolean).map((l) => JSON.parse(l)));
    const es = (equipo, tipo) => eventos.some((e) => e.equipo === equipo && e.tipo === tipo);
    assert.equal(antes.equipo, 'A7');
    assert.equal(antes.estado, 'corriendo');
    assert.equal(despues.equipo, 'B2');
    assert.equal(despues.estado, 'corriendo');
    assert.ok(es('A7', 'simulacion_iniciada') && !es('A7', 'simulacion_detenida'));
    assert.ok(es('B2', 'simulacion_detenida') && !es('B2', 'simulacion_iniciada'));
    assert.deepEqual(errores, []);
    const resultado = { id: 'AUD-04', defectoReproducidoEnElectron: true, antes, despues,
      archivos: disco.archivos(),
      historia: eventos.map(({ t, equipo, sesion, tipo, corrida }) => ({ t, equipo, sesion, tipo, corrida }))
        .sort((a, b) => a.t - b.t), errores };
    fs.writeFileSync(path.join(salida, 'resultado.json'), JSON.stringify(resultado, null, 2));
    console.log(JSON.stringify(resultado, null, 2));
  } finally { await app.close(); }
})().catch((e) => { console.error(e); process.exitCode = 1; });
