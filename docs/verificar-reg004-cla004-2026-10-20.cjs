// SPDX-License-Identifier: Apache-2.0
// Verifica CLA-004 sin sobrescribir resultados de las entregas anteriores.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const assert = require('node:assert/strict');
if (process.argv[2] !== 'bordes') {
  const file = path.join(__dirname, 'verificar-reg004-cla003-2026-10-20.cjs');
  const source = fs.readFileSync(file, 'utf8').replaceAll('reg004-cla003-', 'reg004-cla004-');
  const m = new Module(file, module); m.filename = file; m.paths = Module._nodeModulePaths(__dirname); m._compile(source, file);
} else {
  const root = path.resolve(__dirname, '..');
  const { contarHistoria, narrar } = require(path.resolve(root, '../TecnoBloques/herramientas/historia-registro.js'));
  const { quitarComentarios } = require(path.resolve(root, '../TecnoBloques/src/registro.js'));
  const { revisarEvento } = require(path.join(root, 'prototipo/pruebas/contrato_eventos.js'));
  const codigo = (nl, cantidad, texto, espacio = ' ') => 'const char *texto = "A' + '\\' + espacio.repeat(cantidad) + nl + texto + '";' + nl + 'void setup() {}' + nl + 'void loop() {}' + nl;
  const variantes = [
    ['control-LF-cero', '\n', 0], ['control-CRLF-cero', '\r\n', 0],
    ['control-LF-98', '\n', 98], ['control-CRLF-97', '\r\n', 97],
    ['empalme-LF-99', '\n', 99], ['empalme-CRLF-98', '\r\n', 98],
    ['empalme-CRLF-120', '\r\n', 120], ['empalme-CRLF-98-tabs', '\r\n', 98, '\t'],
  ];
  const base = Date.UTC(2026, 9, 20, 17);
  const resultados = variantes.map(([caso, nl, n, espacio]) => {
    const antes = codigo(nl, n, ' B', espacio), despues = codigo(nl, n, 'B', espacio);
    const sobre = { v: 1, equipo: 'AUD_SINTETICO', sesion: caso, version_tb: '0.3.0', version_tc: '0.1.0-dev', origen: 'editor' };
    const eventos = [{ ...sobre, t: base, tipo: 'sesion_iniciada', datos: { placa: 'uno', nivel: 3 } },
      ...[antes, despues].map((codigo, i) => ({ ...sobre, t: base + 1000 * (i + 1), tipo: 'codigo_compilado', datos: { ok: true, error: null, bytes: 100, codigo: quitarComentarios(codigo) } })),
      { ...sobre, t: base + 3000, tipo: 'sesion_terminada', datos: { ms: 3000 } }];
    assert.deepEqual(eventos.flatMap(revisarEvento), []);
    const [historia] = contarHistoria(eventos.map((ev, i) => ({ archivo: caso + '.jsonl', linea: i + 1, ev })));
    const texto = narrar([historia]);
    const aprobado = !texto.includes('(el mismo programa)') && texto.includes('Programa:');
    console.log(`${aprobado ? 'OK' : 'FALLA'} ${caso}`);
    return { caso, aprobado, antes, despues, eventos, historia, texto, erroresEsquema: [] };
  });
  fs.writeFileSync(path.join(__dirname, 'reg004-cla004-bordes-2026-10-20.json'), JSON.stringify(resultados, null, 2) + '\n');
  const n = resultados.filter(r => !r.aprobado).length;
  console.log(`${resultados.length} casos; ${n} fallos; cero errores de esquema`);
  process.exitCode = n ? 1 : 0;
}
