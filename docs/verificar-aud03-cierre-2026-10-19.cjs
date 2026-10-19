// SPDX-License-Identifier: Apache-2.0
// Instrumento de auditoría: app, Worker, compilador y disco reales; entrega de mensajes retenida en memoria.
// No modifica el producto. Datos sintéticos. Uso: node docs/verificar-aud03-cierre-2026-10-19.cjs fotos|electron
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const tb = path.resolve(root, '../TecnoBloques');
if (process.argv[2] === 'fotos') {
  // Adapta únicamente la confirmación exigida por el nuevo protocolo; conserva el diagnóstico histórico intacto.
  const Module = require('node:module');
  const file = path.join(__dirname, 'verificar-aud03-aud05-2026-10-18.cjs');
  const source = fs.readFileSync(file, 'utf8');
  const anchor = 'for (const e of s.eventos) registro.registrar(e);';
  assert.equal(source.split(anchor).length, 2);
  const m = new Module(file, module);
  m.filename = file; m.paths = Module._nodeModulePaths(__dirname);
  m._compile(source.replace(anchor, 's.confirmar(f.msSimulados);\n  ' + anchor), file);
} else if (process.argv[2] === 'electron') {
  const { _electron: electron } = require(path.join(tb, 'node_modules/playwright-core'));
  const { crearRegistroDisco } = require(path.join(tb, 'escritorio/registro-disco.js'));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-aud03-cierre-'));
  const disk = crearRegistroDisco({ carpeta: profile });
  assert(disk.instructor({ accion: 'crear-pin', pin: '2468' }).ok);
  assert(disk.instructor({ accion: 'activar', pin: '2468', activo: true }).ok);
  let app;
  (async () => {
    try {
      const env = { ...process.env, TB_HERRAMIENTAS: 'instructor' }; delete env.ELECTRON_RUN_AS_NODE;
      app = await electron.launch({ args: [tb, `--user-data-dir=${profile}`], cwd: tb, env });
      const win = await app.firstWindow(), errors = [], cases = [];
      win.on('pageerror', e => errors.push(String(e)));
      win.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      await win.waitForLoadState('load');
      const button = text => win.locator('#modalAcciones button', { hasText: text }).click();
      async function confirm(code) {
        await win.locator('#codigoEquipo').fill(code); await button('Seguir');
        await win.waitForFunction(c => document.getElementById('modalTitulo').textContent.includes(c), code);
        await button('Sí, somos ese equipo');
        await win.waitForFunction(c => registroEventos.equipo() === c, code);
      }
      await confirm('AUD_A');
      await win.evaluate(() => {
        // El Worker ejecuta el código original; solo se retiene la entrega a su oyente, en orden FIFO.
        const NativeWorker = window.Worker;
        window.__aud03 = { hold: true, queue: [], copied: [], released: [] };
        window.Worker = class extends NativeWorker {
          set onmessage(fn) {
            super.onmessage = e => {
              if (__aud03.hold && ['foto', 'detenido'].includes(e.data?.tipo)) {
                __aud03.copied.push(structuredClone(e.data));
                __aud03.queue.push(() => { __aud03.released.push(e.data.tipo); fn(e); });
              } else fn(e);
            };
          }
        };
        window.__aud03.release = () => { __aud03.hold = false; for (const deliver of __aud03.queue.splice(0)) deliver(); };
      });
      const circuit = { formato: 1, placa: 'uno', protoboard: null,
        componentes: [{ id: 'led1', tipo: 'led', x: 380, y: -100, rot: 0, props: { color: 'rojo' } }],
        cables: [{ de: 'placa.D13', a: 'led1.anodo' }, { de: 'led1.catodo', a: 'placa.GND1' }] };
      async function prepare() {
        await win.evaluate(async c => {
          __aud03.hold = true; __aud03.queue = []; __aud03.copied = []; __aud03.released = [];
          cargarEjemplo(EJEMPLOS.find(e => e.id === 'eco'));
          const p = proyectoActual(); p.circuito = c; cargarProyecto(p, true);
          entrarModoTexto('void setup(){pinMode(13, OUTPUT);digitalWrite(13, HIGH);}\nvoid loop(){}\n', '');
          await simular();
        }, circuit);
        await win.waitForFunction(() => __aud03.copied.some(m => m.tipo === 'foto' && m.fallas?.length >= 2), null, { timeout: 40000 });
      }
      // Control: cambio de equipo inicia el cierre y debe esperar las fotos y detenido.
      await prepare();
      await win.locator('#avisoRegistro').click();
      await win.locator('#codigoEquipo').fill('AUD_B'); await button('Seguir');
      await button('Sí, somos ese equipo');
      await win.waitForFunction(() => __aud03.copied.some(m => m.tipo === 'detenido'));
      const controlBefore = await win.evaluate(() => ({ equipo: registroEventos.equipo(), cambiandoEquipo }));
      await win.evaluate(() => __aud03.release());
      await win.waitForFunction(() => registroEventos.equipo() === 'AUD_B');
      cases.push({ caso: 'cambio-directo-control', antesDeEntregar: controlBefore });
      assert.equal(controlBefore.equipo, 'AUD_A');
      // Adverso: Detener ya dejó simulador.sim=null. Cambiar equipo debe esperar el MISMO cierre pendiente.
      await prepare();
      await win.evaluate(() => { window.__aud03StopAt = performance.now(); window.__aud03StopDone = false; window.__aud03Stop = detenerSimulacion().then(() => { __aud03StopDone = true; }); });
      await win.waitForFunction(() => __aud03.copied.some(m => m.tipo === 'detenido'));
      const stopped = await win.evaluate(() => ({ equipo: registroEventos.equipo(), simuladorNulo: simulador.sim === null, promesaCumplida: __aud03StopDone }));
      await win.locator('#avisoRegistro').click();
      await win.locator('#codigoEquipo').fill('AUD_C'); await button('Seguir'); await button('Sí, somos ese equipo');
      await win.waitForFunction(() => cambiandoEquipo || registroEventos.equipo() === 'AUD_C');
      const beforeRelease = await win.evaluate(() => ({ equipo: registroEventos.equipo(), promesaCumplida: __aud03StopDone, msDesdeDetener: performance.now() - __aud03StopAt }));
      await win.evaluate(async () => { __aud03.release(); await __aud03Stop; });
      await win.waitForFunction(() => registroEventos.equipo() === 'AUD_C');
      cases.push({ caso: 'detener-cambiar-equipo-entregar', alDetener: stopped, antesDeEntregar: beforeRelease });
      await win.waitForTimeout(150);
      await app.close(); app = null;
      const events = disk.archivos().flatMap(f => fs.readFileSync(path.join(disk.carpeta, f), 'utf8').split('\n').filter(Boolean).map(JSON.parse));
      const { revisarEvento } = require(path.join(root, 'prototipo/pruebas/contrato_eventos.js'));
      const schema = events.flatMap(revisarEvento);
      const history = events.map(({ equipo, sesion, tipo, corrida, ms_sim, datos }) => ({ equipo, sesion, tipo, corrida, ms_sim,
        ...(tipo === 'falla' || tipo === 'simulacion_detenida' ? { datos } : {}) }));
      const starts = events.filter(e => e.tipo === 'simulacion_iniciada');
      const wrong = events.filter(e => e.origen === 'simulador' && starts.some(s => s.corrida === e.corrida && (s.equipo !== e.equipo || s.sesion !== e.sesion)));
      const result = { casos: cases, historia: history, atribucionCruzada: wrong.map(e => ({ tipo: e.tipo, corrida: e.corrida, equipo: e.equipo })), erroresContrato: schema, erroresJS: errors,
        alcance: 'Electron/Arduino CLI/Worker/núcleo/registro/disco reales; retención FIFO sintética de foto/detenido, liberada antes de 500 ms; sin hardware.' };
      fs.writeFileSync(path.join(__dirname, 'aud03-electron-2026-10-19.json'), JSON.stringify(result, null, 2) + '\n');
      console.log(JSON.stringify(result, null, 2));
      process.exitCode = wrong.length || errors.length || schema.length ? 1 : 0;
    } finally {
      if (app) await app.close();
      assert.equal(path.dirname(path.resolve(profile)), path.resolve(os.tmpdir()));
      fs.rmSync(profile, { recursive: true, force: true });
    }
  })().catch(e => { console.error(e); process.exitCode = 2; });
} else throw new Error('Indica fotos o electron');
