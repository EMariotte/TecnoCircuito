// SPDX-License-Identifier: Apache-2.0
// Auditoría de Codex: datos sintéticos, fuentes de producto sin modificar.
// Un exit 1 indica aceptación incumplida; la reproducción no es una regresión aprobada.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const { spawnSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..', '..', 'TecnoBloques');
const source = fs.readFileSync(path.join(root, 'src/registro.js'), 'utf8');
const limpiar = require(path.join(root, 'src/registro.js')).quitarComentarios;
const compiler = process.env.AVR_GXX || path.join(root, 'escritorio/recursos/arduino/datos/packages/arduino/tools/avr-gcc/7.3.0-atmel3.6.1-arduino7/bin/avr-g++.exe');
function ejecutar(exe, args, input) {
  const r = spawnSync(exe, args, { input, encoding: 'utf8', windowsHide: true, maxBuffer: 16 * 1024 * 1024 });
  assert.ifError(r.error);
  return { estado: r.status, salida: r.stdout, errores: r.stderr };
}
function gcc(input, args) {
  return ejecutar(compiler, [...args, '-x', 'c++', '-std=gnu++11', '-mmcu=atmega328p', '-'], input);
}
const head = ejecutar('git', ['-c', `safe.directory=${root.replaceAll('\\', '/')}`, '-C', root, 'show', 'HEAD:src/registro.js']);
assert.equal(head.estado, 0, head.errores);
const previo = { exports: {} };
vm.runInNewContext(head.salida, { module: previo });
const marca = 'MARCADOR_PRIVADO_SINTETICO';
const originales = [
  ['empalme LF', 'int valor=1; /\\\n/ ' + marca + '\n'],
  ['empalme CRLF', 'int valor=1; /\\\r\n/ ' + marca + '\r\n'],
  ['bloque empalmado', 'int valor; /\\\n* ' + marca + ' *\\\n/ int otro;\n'],
  ...['u8R', 'uR', 'UR', 'LR'].map(p => [p, 'const auto s = ' + p + '"(a " b)"; // ' + marca + '\n']),
];
const resultados = originales.map(([nombre, entrada]) => {
  const compilado = gcc(entrada, ['-fsyntax-only']);
  const cpp = gcc(entrada, ['-E', '-P']);
  assert.equal(compilado.estado, 0, compilado.errores);
  assert.equal(cpp.estado, 0, cpp.errores);
  assert(!cpp.salida.includes(marca));
  const antes = previo.exports.quitarComentarios(entrada);
  const despues = limpiar(entrada);
  return { nombre, defectoAntes: antes.includes(marca), corregidoAhora: !despues.includes(marca), entrada, despues };
});
const empalme = String.fromCharCode(92) + '\n';
const entradaPrivada = '#define M 1e' + empalme + '+R"(a " // ' + marca + ')"\nint main(){return 0;}\n';
const limpioPrivado = limpiar(entradaPrivada);
const sinEmpalme = entradaPrivada.replace(empalme, '');
const macro = '#define VALOR (1 /* comentario\n */ + 2)\nint dato = VALOR;\n';
const include = '#include <avr//io.h>\nint main(){return 0;}\n';
const sintaxisPrivada = gcc(entradaPrivada, ['-fsyntax-only']);
const definiciones = gcc(entradaPrivada, ['-E', '-P', '-dD']);
assert.equal(sintaxisPrivada.estado, 0, sintaxisPrivada.errores);
assert.equal(definiciones.estado, 0, definiciones.errores);
assert(!definiciones.salida.includes(marca), 'El compilador debe identificar el marcador como comentario.');
const variantes = [
  ...['e', 'E', 'p', 'P'].flatMap(e => ['+', '-'].flatMap(signo => ['R', 'u8R', 'uR', 'UR', 'LR'].map(prefijo => {
    const entrada = '#define M 1' + e + empalme + signo + prefijo + '"(a " // ' + marca + ')"\nint main(){return 0;}\n';
    const cpp = gcc(entrada, ['-E', '-P', '-dD']);
    assert.equal(cpp.estado, 0, cpp.errores);
    assert(!cpp.salida.includes(marca));
    return { e, signo, prefijo, conservaComentario: limpiar(entrada).includes(marca) };
  }))),
];
const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
const funcion = app.match(/function registrarCompilacion\(r, codigo\) \{[\s\S]*?\n\}/);
assert(funcion, 'Adaptar extracción del consumidor si cambió su forma.');
const eventos = [];
const entorno = { registroEventos: { activo: () => true }, quitarComentarios: limpiar,
  registrarEditor: (tipo, datos) => eventos.push({ tipo, datos }), tipoErrorCompilacion: () => 'sintetico' };
vm.runInNewContext(funcion[0], entorno);
entorno.registrarCompilacion({ etapa: 'compilar', ok: true }, entradaPrivada);
assert.equal(eventos.length, 1);
// Usa el oráculo sin modificarlo; no ejecuta la parte aleatoria ni reescribe pruebas.
const testFile = path.join(root, 'test/registro-preprocesador.js');
const testSource = fs.readFileSync(testFile, 'utf8').replaceAll('\r\n', '\n');
const prefix = testSource.split('\ntry {')[0];
assert(prefix.length < testSource.length, 'Adaptar extracción del oráculo.');
const oracle = new Function('require', '__dirname', 'console', prefix + '\nreturn { contrastar, carpeta };')(
  createRequire(testFile), path.dirname(testFile), { log() {} });
let fallosDetectados;
try { fallosDetectados = oracle.contrastar([entradaPrivada]); }
finally {
  assert.equal(path.dirname(path.resolve(oracle.carpeta)), path.resolve(os.tmpdir()));
  fs.rmSync(oracle.carpeta, { recursive: true, force: true });
}
const preservacion = [['macro multilínea', macro], ['include válido', include]].map(([nombre, entrada]) => {
  const original = gcc(entrada, ['-fsyntax-only']);
  const salida = limpiar(entrada);
  const despues = gcc(salida, ['-fsyntax-only']);
  const salidaHead = previo.exports.quitarComentarios(entrada);
  const sintaxisHead = gcc(salidaHead, ['-fsyntax-only']);
  assert.equal(original.estado, 0, original.errores);
  return { nombre, entrada, salida, compilabaAntes: original.estado === 0, compilaLimpio: despues.estado === 0,
    erroresLimpio: despues.errores, salidaHead, compilaLimpioHead: sintaxisHead.estado === 0 };
});
const evidencia = {
  fechaUTC: new Date().toISOString(), versionCompilador: ejecutar(compiler, ['-dumpversion']).salida.trim(),
  sha256Registro: createHash('sha256').update(fs.readFileSync(path.join(root, 'src/registro.js'))).digest('hex'),
  originales: resultados,
  privacidad: { entrada: entradaPrivada, salida: limpioPrivado, originalCompila: true,
    definicionCompilador: definiciones.salida.split(/\r?\n/).filter(l => l.startsWith('#define M ')),
    eliminaSinEmpalme: !limpiar(sinEmpalme).includes(marca), conservaConEmpalme: limpioPrivado.includes(marca),
    variantes: variantes.length, variantesQueConservanComentario: variantes.filter(v => v.conservaComentario).length,
    consumidorRealEmiteComentario: eventos[0].datos.codigo.includes(marca),
    limiteConsumidor: 'Función real extraída de app.js, con sumidero sintético; no es recorrido Electron del caso nuevo.' },
  oraculo: { numeroDeFallosDetectados: fallosDetectados.length, pasoIndebidamente: fallosDetectados.length === 0 },
  preservacion,
};
console.log(JSON.stringify(evidencia, null, 2));
const cumple = resultados.every(r => r.defectoAntes && r.corregidoAhora) &&
  !evidencia.privacidad.conservaConEmpalme && preservacion.every(r => r.compilaLimpio);
process.exitCode = cumple ? 0 : 1;
