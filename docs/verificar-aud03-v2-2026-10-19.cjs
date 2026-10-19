// SPDX-License-Identifier: Apache-2.0
// Repite la reproducción independiente de V2, conservando la evidencia histórica.
// Uso: node docs/verificar-aud03-v2-2026-10-19.cjs electron
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const assert = require('node:assert/strict');
const file = path.join(__dirname, 'verificar-aud03-cierre-2026-10-19.cjs');
let source = fs.readFileSync(file, 'utf8');
const anchor = 'const result = { casos: cases,';
assert.equal(source.split(anchor).length, 2);
assert.equal(process.argv[2], 'electron');
source = source.replace("'aud03-electron-2026-10-19.json'", "'aud03-v2-electron-2026-10-19.json'");
source = source.replace(anchor, `
      // Además de no cruzar atribuciones, se exige conservación: un cierre ausente no puede aprobar.
      assert.equal(starts.length, 2);
      for (const start of starts) {
        const same = events.filter(e => e.corrida === start.corrida && e.origen === 'simulador');
        const close = same.filter(e => e.tipo === 'simulacion_detenida');
        assert.equal(close.length, 1);
        assert.equal(close[0].equipo, start.equipo);
        assert.equal(close[0].sesion, start.sesion);
        assert.equal(close[0].datos.fallas.length, 2);
        assert.equal(same.filter(e => e.tipo === 'falla').length, 2);
        const end = events.findIndex(e => e.tipo === 'sesion_terminada' && e.sesion === start.sesion);
        assert.ok(end > events.indexOf(close[0]));
      }
      assert.equal(beforeRelease.equipo, 'AUD_B');
      assert.equal(beforeRelease.promesaCumplida, false);
      assert.ok(beforeRelease.msDesdeDetener < 500);
      assert.ok(!events.some(e => e.equipo === 'AUD_C' && e.origen === 'simulador'));
      ` + anchor);
const m = new Module(file, module);
m.filename = file;
m.paths = Module._nodeModulePaths(__dirname);
m._compile(source, file);
