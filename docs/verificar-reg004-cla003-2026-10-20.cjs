// SPDX-License-Identifier: Apache-2.0
// Revisión de CLA-003: reutiliza diagnósticos previos sin sobrescribir su evidencia.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const Module = require('node:module');
const modo = process.argv[2] || 'adicionales';
if (['originales', 'lienzo', 'original', 'residuales', 'cierres', 'ampliacion'].includes(modo)) {
  const file = path.join(__dirname, 'verificar-reg004-cla002-2026-10-20.cjs');
  const source = fs.readFileSync(file, 'utf8').replaceAll('reg004-cla002-', 'reg004-cla003-');
  if (modo === 'originales') process.argv[2] = 'pruebas';
  const m = new Module(file, module); m.filename = file; m.paths = Module._nodeModulePaths(__dirname);
  m._compile(source, file);
} else {
  const root = path.resolve(__dirname, '..');
  const { contarHistoria, narrar } = require(path.resolve(root, '../TecnoBloques/herramientas/historia-registro.js'));
  const { quitarComentarios } = require(path.resolve(root, '../TecnoBloques/src/registro.js'));
  const { revisarEvento } = require(path.join(root, 'prototipo/pruebas/contrato_eventos.js'));
  const base = Date.UTC(2026, 9, 20, 17);
  const ev = (tipo, datos, origen = 'editor') => ({ v: 1, equipo: 'AUD_SINTETICO', sesion: 'reg004-cla003',
    version_tb: '0.3.0', version_tc: '0.1.0-dev', t: base, origen, tipo, datos });
  const ini = ev('sesion_iniciada', { placa: 'uno', nivel: 3 });
  const fin = ev('sesion_terminada', { ms: 9000 });
  const cpp = literal => `const char *texto = ${literal};\nvoid setup() {}\nvoid loop() {}\n`;
  const raw = (text, prefix = '', delim = 'd') => {
    const codigo = cpp(prefix + 'R"' + delim + '(' + text + ')' + delim + '"');
    return prefix ? codigo.replace('const char *texto =', 'const auto texto =') : codigo;
  };
  const cadena = (salto, contenido) => cpp('"A' + '\\' + salto + contenido + '"');
  const casos = [];
  const programa = (nombre, antes, despues, cambio = true) => casos.push({ nombre, antes, despues, cambio,
    eventos: [ini, ...[antes, despues].map(codigo => ev('codigo_compilado', { ok: true, error: null, bytes: 100, codigo: quitarComentarios(codigo) })), fin],
    verificar: texto => assert.equal(texto.includes('(el mismo programa)'), !cambio, cambio ? 'Debe mostrar que el contenido cambió' : 'Control de igualdad') });
  programa('control-cadena-continua-LF', cadena('\n', ' B'), cadena('\n', 'B'));
  programa('cadena-continua-CRLF-espacio', cadena('\r\n', ' B'), cadena('\r\n', 'B'));
  programa('cadena-continua-CRLF-tab', cadena('\r\n', '\tB'), cadena('\r\n', 'B'));
  programa('control-cadena-escape-comillas', cpp('"A\\\" B"'), cpp('"A\\\"  B"'));
  programa('control-raw-vacio', raw('A\n\nB', '', ''), raw('A\nB', '', ''));
  for (const prefix of ['u8', 'u', 'U', 'L']) programa('control-raw-prefijo-' + prefix, raw(' A ', prefix), raw('A', prefix));
  programa('control-raw-delimitador-16', raw(' A ', '', 'abcdefghijklmnop'), raw('A', '', 'abcdefghijklmnop'));
  programa('control-raw-CRLF-dato', raw('A\r\nB'), raw('A\nB'));
  programa('control-raw-barra-y-n', raw('A\nB'), raw('A\\nB'));
  programa('control-raw-mismo', raw(' A\n\nB '), raw(' A\n\nB '), false);
  programa('control-espacios-internos-fuera-literal', 'void loop() { delay(500); }\n', 'void   loop() {   delay(500); }\n', false);
  programa('control-linea-larga', cpp('"' + 'x'.repeat(80) + 'A"'), cpp('"' + 'x'.repeat(80) + 'B"'));
  const agregado = ev('componente_agregado', { id: 'r1', tipo: 'resistencia' }, 'circuito');
  const quitado = ev('componente_quitado', { id: 'r1', tipo: 'resistencia' }, 'circuito');
  const cambiado = datos => ev('componente_cambiado', { id: 'r1', ...datos }, 'circuito');
  casos.push({ nombre: 'control-tres-recreaciones-sin-herencia', eventos: [ini, cambiado({ rot: 90, en: { 1: 'placa.D13' }, x: 100, y: 100, props: { ohmios: 1000 } }), quitado, agregado, cambiado({ rot: 180, props: { ohmios: 330 } }), quitado, agregado, cambiado({ props: { ohmios: 470 } }), fin],
    verificar: texto => { assert.ok(texto.includes('quitó r1')); assert.ok(texto.includes('agregó otra r1')); assert.ok(texto.includes('ohmios 470')); for (const x of ['1000', '330', 'giro 90', 'giro 180', 'enchufado', 'movió']) assert.ok(!texto.includes(x), x + ' no debe heredarse'); } });
  casos.push({ nombre: 'control-alta-baja-alta-baja', eventos: [ini, agregado, quitado, agregado, quitado, fin],
    verificar: texto => assert.ok(texto.includes('hizo cambios y los deshizo')) });
  const resultados = casos.map(c => {
    const eventos = c.eventos.map((e, i) => ({ ...e, t: base + i * 1000 }));
    const erroresEsquema = eventos.flatMap(revisarEvento); assert.deepEqual(erroresEsquema, []);
    const [historia] = contarHistoria(eventos.map((e, i) => ({ archivo: c.nombre + '.jsonl', linea: i + 1, ev: e })));
    const texto = narrar([historia]);
    let error = null;
    try { c.verificar(texto); } catch (e) { error = e.message; }
    console.log(`${error ? 'FALLA' : 'OK'} ${c.nombre}${error ? ': ' + error.split('\n')[0] : ''}`);
    return { caso: c.nombre, aprobado: !error, error, antes: c.antes, despues: c.despues, cambioEsperado: c.cambio, eventos, erroresEsquema, historia, texto };
  });
  fs.writeFileSync(path.join(__dirname, 'reg004-cla003-adicionales-2026-10-20.json'), JSON.stringify(resultados, null, 2) + '\n');
  const n = resultados.filter(c => !c.aprobado).length;
  console.log(`${casos.length} casos; ${n} fallos; cero errores de esquema`);
  process.exitCode = n ? 1 : 0;
}
