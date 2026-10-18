// SPDX-License-Identifier: Apache-2.0
// Verifica V3 con salidas defectuosas capturadas, y límites del contraste de preprocesado.
// No modifica las fuentes ni las pruebas de producto. Solo datos sintéticos.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { createRequire } = require('node:module');
const { spawnSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..', '..', 'TecnoBloques');
const current = require(path.join(root, 'src/registro.js')).quitarComentarios;
const captured = JSON.parse(fs.readFileSync(path.join(__dirname, 'aud01-evidencia-2026-10-18.json'), 'utf8').replace(/^\uFEFF/, ''));
assert.equal(captured.sha256Registro, '792cb03ecc7fef575d9c0e1a9ed63fa57aed17664dda0d21adda24fcc2356135');
const oldResults = new Map([[captured.privacidad.entrada, captured.privacidad.salida],
  ...captured.preservacion.map(c => [c.entrada, c.salida])]);
const testFile = path.join(root, 'test/registro-preprocesador.js');
const test = fs.readFileSync(testFile, 'utf8').replaceAll('\r\n', '\n');
const prefix = test.split('\ntry {')[0];
assert(prefix.length < test.length);
function oracle(cleaner, inputs) {
  const realRequire = createRequire(testFile);
  const injected = name => name === '../src/registro.js' ? { quitarComentarios: cleaner } : realRequire(name);
  const env = new Function('require', '__dirname', 'console', prefix + '\nreturn { contrastar, carpeta };')(
    injected, path.dirname(testFile), { log() {} });
  try { return env.contrastar(inputs); }
  finally {
    assert.equal(path.dirname(path.resolve(env.carpeta)), path.resolve(os.tmpdir()));
    fs.rmSync(env.carpeta, { recursive: true, force: true });
  }
}
const inputs = [...oldResults.keys()];
const bad = oracle(p => oldResults.has(p) ? oldResults.get(p) : current(p), inputs);
const good = oracle(current, inputs);
const literal = '#define T "x // LITERAL_LEGITIMO"\n#define U R"(y " // OTRO_LITERAL)" /* COMENTARIO_PRIVADO */\nint main(){return 0;}\n';
const literalFailures = oracle(current, [literal]);
const literalOut = current(literal);
const compiler = process.env.AVR_GXX || path.join(root, 'escritorio/recursos/arduino/datos/packages/arduino/tools/avr-gcc/7.3.0-atmel3.6.1-arduino7/bin/avr-g++.exe');
const marker = 'COMENTARIO_PRIVADO';
const borders = [
  ['comentario en #if', '#if 1 /* ' + marker + ' */\nint main(){return 0;}\n#endif\n', false],
  ['comentario multilínea en #if', '#if 1 /* ' + marker + '\n */ && 1\nint main(){return 0;}\n#endif\n', false],
  ['comentario en bloque #if 0', '#if 0\nint n; // ' + marker + '\n#endif\nint main(){return 0;}\n', false],
  ['texto ordinario en bloque #if 0', '#if 0\nconst char*s="// ' + marker + '";\n#endif\nint main(){return 0;}\n', true],
  ['texto crudo en bloque #if 0', '#if 0\nR"(\n// ' + marker + '\n)"\n#endif\nint main(){return 0;}\n', true],
  ['texto sin cerrar en bloque #if 0', '#if 0\n"a\n// ' + marker + '\n#endif\nint main(){return 0;}\n', false],
  ['comentarios de bloques condicionales anidados', '#if 0\n#if 1\n/* ' + marker + ' */\n#endif\n#endif\nint main(){return 0;}\n', false],
  ['separador vacío decidido por Efraín', '#define M a \\// ' + marker + '\nint main(){return 0;}\n', false],
];
function compile(source) {
  const r = spawnSync(compiler, ['-fsyntax-only', '-x', 'c++', '-std=gnu++11', '-mmcu=atmega328p', '-'],
    { input: source, encoding: 'utf8', windowsHide: true });
  assert.ifError(r.error);
  return { estado: r.status, errores: r.stderr };
}
const borderResults = borders.map(([nombre, entrada, retenerLiteral]) => {
  const salida = current(entrada);
  return { nombre, entrada, salida, original: compile(entrada), limpio: compile(salida),
    literalConservadoOComentarioEliminado: salida.includes(marker) === retenerLiteral,
    lineasConservadas: (entrada.match(/\r\n|\r|\n/g) || []).length === (salida.match(/\r\n|\r|\n/g) || []).length };
});
const result = {
  fechaUTC: new Date().toISOString(),
  sha256Registro: createHash('sha256').update(fs.readFileSync(path.join(root, 'src/registro.js'))).digest('hex'),
  v3: { fuenteControlNegativo: 'Salidas reales capturadas de la primera entrega (792cb03e), no una copia reconstruida de su implementación',
    entradas: inputs.length, rechazadasAntes: bad.length, erroresDetectados: bad.map(f => f.motivos), fallosActuales: good.length,
    fallosLiteralLegitimo: literalFailures.length, conservaLiterales: literalOut.includes('LITERAL_LEGITIMO') && literalOut.includes('OTRO_LITERAL'),
    eliminaComentario: !literalOut.includes('COMENTARIO_PRIVADO') },
  fronteras: borderResults,
};
console.log(JSON.stringify(result, null, 2));
const ok = bad.length === inputs.length && !good.length && !literalFailures.length && result.v3.conservaLiterales &&
  result.v3.eliminaComentario && borderResults.every(b => b.original.estado === 0 && b.limpio.estado === 0 &&
    b.literalConservadoOComentarioEliminado && b.lineasConservadas);
process.exitCode = ok ? 0 : 1;
