// SPDX-License-Identifier: Apache-2.0
// Instrumento de auditoría de Codex, no implementación ni regresión aprobada del producto.
// Usa los controladores y núcleos reales; entrega de Worker controlada, datos sintéticos.
// node docs/verificar-aud03-aud05-2026-10-18.cjs fotos|fusible|corte-base
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
function ejecutar(nombre, marcador, agregado) {
  const archivo = path.join(root, 'prototipo/pruebas', nombre);
  const original = fs.readFileSync(archivo, 'utf8');
  assert.equal(original.split(marcador).length, 2, 'Ancla única del instrumento');
  const mod = new Module(archivo, module);
  mod.filename = archivo;
  mod.paths = Module._nodeModulePaths(path.dirname(archivo));
  mod._compile(original.split(marcador)[0] + agregado, archivo);
}
if (process.argv[2] === 'fotos') {
  ejecutar('probar_fotos.js', '// 1. El caso de la auditoría:', `
const assert = require('node:assert/strict');
const { crearRegistroEventos } = require(path.resolve(RAIZ, '../../TecnoBloques/src/registro.js'));
let pendientes = 0;
for (const orden of ['pausa-entrega-cierre', 'pausa-cierre-entrega', 'cierre-entrega', 'destruir-entrega']) {
  const s = armar(LED_DIRECTO), n = nucleo(), guardados = [];
  const registro = crearRegistroEventos({ escribir: e => guardados.push(e), versionTB: 'auditoria',
    versionTC: '0.1.0-dev', ahora: () => 1000, nuevaSesion: () => 'sintetica' });
  registro.empezar('AUDITORIA', {});
  s.sim.iniciar();
  s.entregar(s.foto(n));
  n.avanzar(FRECUENCIA * .016);
  const f = s.foto(n);
  assert.equal(f.fallas.length, 2);
  if (orden.startsWith('pausa')) s.sim.pausar();
  if (orden === 'pausa-entrega-cierre') s.entregar(f);
  if (orden.startsWith('destruir')) s.sim.destruir(); else s.sim.detener();
  if (orden !== 'pausa-entrega-cierre') s.entregar(f);
  for (const e of s.eventos) registro.registrar(e);
  registro.terminar();
  const cierre = guardados.find(e => e.tipo === 'simulacion_detenida');
  const fallas = guardados.filter(e => e.tipo === 'falla');
  const conserva = cierre.datos.fallas.length === f.fallas.length && fallas.length === f.fallas.length;
  console.log(JSON.stringify({ orden, fotoMs: f.msSimulados, fotoFallas: tiposDeFalla(f.fallas),
    fallasRegistradas: fallas.length, fallasCierre: cierre.datos.fallas.length, conserva,
    mismaCorrida: fallas.length ? fallas.every(e => e.corrida === cierre.corrida) : null }));
  if (orden === 'pausa-entrega-cierre') assert.ok(conserva, 'Control corregido');
  else if (!conserva) pendientes++;
}
console.log('Casos residuales que incumplen aceptación de cierre: ' + pendientes);
process.exitCode = pendientes ? 1 : 0;
`);
} else if (process.argv[2] === 'fusible') {
  ejecutar('probar_corte.js', 'const PASOS =', `
const assert = require('node:assert/strict');
const carga = { formato: 1, placa: 'uno', componentes: [
  { id: 'r', tipo: 'resistencia', x: 0, y: 0, rot: 0, props: { ohmios: 4.7 } }
], cables: [{ de: 'placa.5V', a: 'r.1' }, { de: 'r.2', a: 'placa.GND1' }] };
const rs = [256000, 16000, 7919].map(paso => {
  globalThis.__instrSinEnergia = 0; globalThis.__cicloCorte = null;
  const n = crearNucleo({ hex: hex('parpadeo13'), circuito: carga, activas: { limiteUSB: true }, semilla: 1 });
  const r = correr(n, 13500, paso);
  const salida = { paso, ...r, instruccionesSinEnergia: globalThis.__instrSinEnergia,
    primerCorteNano: globalThis.__cicloCorte };
  console.log(JSON.stringify(salida));
  return salida;
});
for (const r of rs) {
  assert.equal(r.instruccionesSinEnergia, 0);
  assert.ok(r.fallas.includes('fusible_usb'));
  assert.ok(!r.energia.apagada, 'El fusible vuelve a cerrar');
  assert.ok(Math.abs(r.ciclos - rs[0].ciclos) <= 8);
  for (const k of ['serial', 'fallas', 'energia']) assert.deepEqual(r[k], rs[0][k], k);
}
console.log('APROBADO: fusible abre y recupera alimentación; tres pasos, serial/fallas/energía iguales, cero instrucciones apagada.');
for (const k of ['__apagada', '__instrSinEnergia', '__cicloCorte']) delete globalThis[k];
`);
} else if (process.argv[2] === 'corte-base') {
  // Compila chip/núcleo de HEAD en memoria, con las mismas dependencias instaladas.
  // El resto del núcleo no cambió en la entrega; no se revierte ningún archivo de trabajo.
  (async () => {
    const { execFileSync } = require('node:child_process');
    const esbuild = require(path.join(root, 'prototipo/node_modules/esbuild'));
    const anteriores = new Map(['chip.js', 'nucleo.js'].map(nombre => [nombre,
      execFileSync('git', ['show', '4fce9d820b27ec09130151bf801d330ab07a987a:prototipo/src/' + nombre],
        { cwd: root, encoding: 'utf8', windowsHide: true })]));
    const r = await esbuild.build({ entryPoints: [path.join(root, 'prototipo/src/nucleo.js')],
      bundle: true, format: 'cjs', platform: 'node', write: false,
      plugins: [{ name: 'version-auditada-anterior', setup(build) {
        build.onLoad({ filter: /[\\/](chip|nucleo)\.js$/ }, args => ({
          contents: anteriores.get(path.basename(args.path)), resolveDir: path.dirname(args.path), loader: 'js',
        }));
      } }] });
    const archivo = path.join(root, 'prototipo/pruebas/probar_corte.js');
    let codigo = fs.readFileSync(archivo, 'utf8');
    const ancla = "let codigo = fs.readFileSync(archivo, 'utf8');";
    assert.equal(codigo.split(ancla).length, 2);
    codigo = codigo.replace(ancla, 'let codigo = ' + JSON.stringify(r.outputFiles[0].text) + ';');
    const mod = new Module(archivo, module);
    mod.filename = archivo;
    mod.paths = Module._nodeModulePaths(path.dirname(archivo));
    mod._compile(codigo, archivo);
  })().catch(e => { console.error(e); process.exitCode = 2; });
} else throw new Error('Indica fotos, fusible o corte-base');
