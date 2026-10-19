// SPDX-License-Identifier: Apache-2.0
// Instrumento de auditoría de CLA-006. Conserva las evidencias históricas; datos sintéticos.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const assert = require('node:assert/strict');
const file = path.join(__dirname, 'verificar-reg004-2026-10-19.cjs');
let source = fs.readFileSync(file, 'utf8');
const output = "'reg004-evidencia-2026-10-19.json'";
assert.equal(source.split(output).length, 2);
source = source.replace(output, "'reg004-cla006-original-2026-10-19.json'");
if (process.argv[2] === 'original') {
  const m = new Module(file, module); m.filename = file; m.paths = Module._nodeModulePaths(__dirname); m._compile(source, file);
} else if (process.argv[2] === 'adversos') {
  const anchor = 'let fallos = 0;';
  assert.equal(source.split(anchor).length, 2);
  const tail = `
const casosAdicionales = [
  { nombre: 'control-dos-corridas-coherentes', eventos: [inicio, arranque, falla(2), cierre(3, [fallo]),
    { ...arranque, t: base + 4000, corrida: 2 }, { ...cierre(5, []), corrida: 2 }, fin(6)] },
  { nombre: 'falla-tardia-en-segunda-corrida', eventos: [inicio, arranque, falla(2), cierre(3, [fallo]),
    { ...arranque, t: base + 4000, corrida: 2 }, { ...cierre(5, []), corrida: 2 }, { ...falla(6), corrida: 2 }, fin(7)] },
  { nombre: 'falla-sin-inicio-de-corrida', eventos: [inicio, falla(2), fin(3)] },
];
const resultados = casosAdicionales.map(c => {
  const esquema = c.eventos.flatMap(revisarEvento); assert.deepEqual(esquema, []);
  const [h] = contarHistoria(c.eventos.map((ev, i) => ({ archivo: c.nombre + '.jsonl', linea: i + 1, ev })));
  const texto = narrar([h]);
  const c2 = h.corridas.find(c => c.numero === 2);
  const comparacionContradictoria = !!c2 && c2.fallas.some(f => f.tipo === 'led_quemado') &&
    (c2.corrigio || []).some(f => f.tipo === 'led_quemado');
  const ocultaFallaHuerfana = c.nombre === 'falla-sin-inicio-de-corrida' && h.resumen.includes('Fallas vistas: ninguna');
  if (c.nombre === 'control-dos-corridas-coherentes') {
    assert.equal(h.avisos.length, 0);
    assert.ok(c2.corrigio.some(f => f.tipo === 'led_quemado'));
    assert.ok(!comparacionContradictoria && !ocultaFallaHuerfana);
  }
  return { caso: c.nombre, eventos: c.eventos, erroresEsquema: esquema, historia: h, texto, comparacionContradictoria, ocultaFallaHuerfana };
});
fs.writeFileSync(path.join(__dirname, 'reg004-cla006-adversos-2026-10-19.json'), JSON.stringify(resultados, null, 2) + '\\n');
for (const r of resultados) console.log(JSON.stringify({ caso: r.caso, erroresEsquema: r.erroresEsquema,
  resumen: r.historia.resumen, comparacion: r.historia.corridas.find(c => c.numero === 2), avisos: r.historia.avisos,
  comparacionContradictoria: r.comparacionContradictoria, ocultaFallaHuerfana: r.ocultaFallaHuerfana }));
const n = resultados.filter(r => r.comparacionContradictoria || r.ocultaFallaHuerfana).length;
console.log('Casos residuales: ' + n); process.exitCode = n ? 1 : 0;
`;
  const m = new Module(file, module); m.filename = file; m.paths = Module._nodeModulePaths(__dirname);
  m._compile(source.split(anchor)[0] + tail, file);
} else throw new Error('Indica original o adversos');
