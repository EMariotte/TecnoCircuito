// SPDX-License-Identifier: Apache-2.0
// Auditoría independiente de CLA-20261020-002; solo datos sintéticos, sin modificar producto.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const Module = require('node:module');
if (['original', 'residuales', 'cierres', 'ampliacion'].includes(process.argv[2])) {
  const file = path.join(__dirname, 'verificar-reg004-cla008-2026-10-19.cjs');
  const source = fs.readFileSync(file, 'utf8').replaceAll('reg004-cla008-', 'reg004-cla002-');
  const m = new Module(file, module); m.filename = file; m.paths = Module._nodeModulePaths(__dirname);
  const guardar = fs.writeFileSync;
  fs.writeFileSync = (destino, ...args) => guardar(typeof destino === 'string' && path.basename(destino).startsWith('reg004-cla002-')
    ? destino.replace('-2026-10-19.json', '-2026-10-20.json') : destino, ...args);
  try { m._compile(source, file); } finally { fs.writeFileSync = guardar; }
} else if (process.argv[2] === 'lienzo') {
  const root = path.resolve(__dirname, '..');
  const { contarHistoria, narrar } = require(path.resolve(root, '../TecnoBloques/herramientas/historia-registro.js'));
  const { revisarEvento } = require(path.join(root, 'prototipo/pruebas/contrato_eventos.js'));
  const evidencia = JSON.parse(fs.readFileSync(path.join(__dirname, 'reg004-cla002-lienzo-2026-10-20.json'), 'utf8'));
  let fallos = 0;
  const resultados = evidencia.casos.map(c => {
    const base = Date.UTC(2026, 9, 20, 16);
    const sobre = { v: 1, equipo: 'AUD_SINTETICO', sesion: c.caso, version_tb: '0.3.0', version_tc: '0.1.0-dev', origen: 'editor', t: base };
    const eventos = [{ ...sobre, tipo: 'sesion_iniciada', datos: { placa: 'uno', nivel: 3 } },
      ...c.eventos.map((e, i) => ({ ...sobre, ...e, t: base + (i + 1) * 1000 })),
      { ...sobre, t: base + 10000, tipo: 'sesion_terminada', datos: { ms: 10000 } }];
    assert.deepEqual(eventos.flatMap(revisarEvento), []);
    const [h] = contarHistoria(eventos.map((ev, i) => ({ archivo: 'lienzo-real.jsonl', linea: i + 1, ev })));
    const texto = narrar([h]);
    const falso = c.caso === 'baja-alta-baja-id-reutilizado'
      ? texto.includes('hizo cambios y los deshizo') && !c.final.componentes.length
      : texto.includes('ohmios 1000') && c.final.componentes[0].props.ohmios === 220;
    if (falso) fallos++;
    console.log(`${falso ? 'FALLA' : 'OK'} lector con eventos del lienzo real: ${c.caso}`);
    return { caso: c.caso, eventos, inicial: c.inicial, final: c.final, historia: h, texto, resumenContradiceEstado: falso };
  });
  fs.writeFileSync(path.join(__dirname, 'reg004-cla002-lienzo-historia-2026-10-20.json'), JSON.stringify(resultados, null, 2) + '\n');
  process.exitCode = fallos ? 1 : 0;
} else {
  const root = path.resolve(__dirname, '..');
  const { contarHistoria, narrar } = require(path.resolve(root, '../TecnoBloques/herramientas/historia-registro.js'));
  const { quitarComentarios } = require(path.resolve(root, '../TecnoBloques/src/registro.js'));
  const { revisarEvento } = require(path.join(root, 'prototipo/pruebas/contrato_eventos.js'));
  const base = Date.UTC(2026, 9, 20, 16);
  const ev = (tipo, datos, origen = 'editor') => ({ v: 1, equipo: 'AUD_SINTETICO', sesion: 'reg004-cla002',
    version_tb: '0.3.0', version_tc: '0.1.0-dev', t: base, origen, tipo, datos });
  const ini = ev('sesion_iniciada', { placa: 'uno', nivel: 3 });
  const fin = ev('sesion_terminada', { ms: 9000 });
  const circuito = (tipo, datos) => ev(tipo, datos, 'circuito');
  const agrega = () => circuito('componente_agregado', { id: 'r1', tipo: 'resistencia' });
  const quita = () => circuito('componente_quitado', { id: 'r1', tipo: 'resistencia' });
  const cambia = (props) => circuito('componente_cambiado', { id: 'r1', props });
  const compila = codigo => ev('codigo_compilado', { ok: true, error: null, bytes: 100, codigo: quitarComentarios(codigo) });
  const raw = (contenido) => 'const char *texto = R"marca(\n' + contenido + '\n)marca";\nvoid setup() {}\nvoid loop() {}\n';
  const esperar = (ms) => `void setup() {}\nvoid loop() { delay(${ms}); }\n`;
  const casos = [
    { nombre: 'control-alta-y-baja-nueva', eventos: [ini, agrega(), quita(), fin],
      verificar: texto => assert.ok(texto.includes('hizo cambios y los deshizo')) },
    { nombre: 'control-baja-existente', eventos: [ini, quita(), fin],
      verificar: texto => assert.ok(texto.includes('quitó r1 (resistencia)')) },
    { nombre: 'baja-alta-baja-id-reutilizado', eventos: [ini, quita(), agrega(), quita(), fin],
      verificar: texto => { assert.ok(texto.includes('quitó r1 (resistencia)'), 'Debe conservar la baja de la pieza que existía antes del tramo'); assert.ok(!texto.includes('hizo cambios y los deshizo')); } },
    { nombre: 'propiedad-no-heredada-al-recrear', eventos: [ini, cambia({ ohmios: 1000 }), quita(), agrega(), fin],
      verificar: texto => assert.ok(!texto.includes('ohmios 1000'), 'La resistencia nueva predeterminada de 220 ohmios no hereda el valor de la pieza borrada') },
    { nombre: 'control-ultimo-valor-misma-pieza', eventos: [ini, cambia({ ohmios: 1000 }), cambia({ ohmios: 330 }), fin],
      verificar: texto => { assert.ok(texto.includes('ohmios 330')); assert.ok(!texto.includes('ohmios 1000')); } },
    { nombre: 'control-programa-delay', eventos: [ini, compila(esperar(500)), compila(esperar(200)), fin],
      verificar: texto => { assert.ok(texto.includes('delay(500)')); assert.ok(texto.includes('delay(200)')); } },
    { nombre: 'control-programa-indentacion', eventos: [ini, compila('void setup() {}\nvoid loop() {\n delay(500);\n}\n'), compila('void setup() {}\nvoid loop() {\n    delay(500);\n}\n'), fin],
      verificar: texto => assert.ok(texto.includes('(el mismo programa)')) },
    { nombre: 'programa-cambio-espacios-en-literal-raw', eventos: [ini, compila(raw(' A ')), compila(raw('A')), fin],
      verificar: texto => { assert.ok(!texto.includes('(el mismo programa)'), 'El contenido de un literal raw cambió: los espacios pertenecen a los datos'); assert.ok(texto.includes('Programa:')); } },
    { nombre: 'programa-cambio-linea-vacia-en-literal-raw', eventos: [ini, compila(raw('A\n\nB')), compila(raw('A\nB')), fin],
      verificar: texto => { assert.ok(!texto.includes('(el mismo programa)'), 'Eliminar una línea vacía de un literal raw cambia su contenido'); assert.ok(texto.includes('Programa:')); } },
    { nombre: 'control-cambios-placa', eventos: [ini, ev('placa_cambiada', { de: 'uno', a: 'nano' }), ev('placa_cambiada', { de: 'nano', a: 'uno' }), fin],
      verificar: (texto, h) => { assert.deepEqual(h.placas, ['uno', 'nano', 'uno']); assert.deepEqual(h.avisos, []); assert.ok(texto.includes('uno → nano → uno')); } },
  ];
  const resultados = casos.map(c => {
    const eventos = c.eventos.map((x, i) => ({ ...x, t: base + i * 1000 }));
    const erroresEsquema = eventos.flatMap(revisarEvento);
    assert.deepEqual(erroresEsquema, [], c.nombre + ': entradas válidas');
    const [historia] = contarHistoria(eventos.map((x, i) => ({ archivo: c.nombre + '.jsonl', linea: i + 1, ev: x })));
    const texto = narrar([historia]);
    let error = null;
    try { c.verificar(texto, historia); } catch (e) { error = e.message; }
    console.log(`${error ? 'FALLA' : 'OK'} ${c.nombre}${error ? ': ' + error.split('\n')[0] : ''}`);
    return { caso: c.nombre, aprobado: !error, error, erroresEsquema, eventos, historia, texto };
  });
  fs.writeFileSync(path.join(__dirname, 'reg004-cla002-adversos-2026-10-20.json'), JSON.stringify(resultados, null, 2) + '\n');
  const fallos = resultados.filter(x => !x.aprobado).length;
  console.log(`${resultados.length} casos; ${fallos} fallos; cero errores de esquema`);
  process.exitCode = fallos ? 1 : 0;
}
