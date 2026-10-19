// SPDX-License-Identifier: Apache-2.0
// Auditoría independiente del lector de historias: solo datos sintéticos, sin modificar producto.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const { contarHistoria, narrar } = require(path.resolve(root, '../TecnoBloques/herramientas/historia-registro.js'));
const { revisarEvento } = require(path.join(root, 'prototipo/pruebas/contrato_eventos.js'));
const fallo = { tipo: 'led_quemado', componente: 'led1' };
const circuito = { formato: 1, placa: 'uno', protoboard: null,
  componentes: [{ id: 'led1', tipo: 'led', x: 0, y: 0, rot: 0, props: { color: 'rojo' } }],
  cables: [{ de: 'placa.D13', a: 'led1.anodo' }, { de: 'led1.catodo', a: 'placa.GND1' }] };
const base = Date.UTC(2026, 9, 19, 18);
const fila = (i, tipo, datos, sim = false) => ({ v: 1, equipo: 'AUD_SINTETICO', sesion: 'auditoria-reg004',
  version_tb: '0.3.0', version_tc: '0.1.0-dev', t: base + i * 1000,
  origen: sim ? 'simulador' : 'editor', tipo, datos, ...(sim ? { corrida: 1, ms_sim: i * 1000 } : {}) });
const inicio = fila(0, 'sesion_iniciada', { placa: 'uno', nivel: 1 });
const arranque = fila(1, 'simulacion_iniciada', { placa: 'uno', modo: 'realista', activas: { danoComponentes: true, limitePin: true }, circuito }, true);
const falla = i => fila(i, 'falla', fallo, true);
const cierre = (i, fallas) => fila(i, 'simulacion_detenida', { ms_sim: i * 1000, fallas }, true);
const fin = i => fila(i, 'sesion_terminada', { ms: i * 1000 });
const casos = [
  { nombre: 'control-completo', eventos: [inicio, arranque, falla(2), cierre(3, [fallo]), fin(4)] },
  { nombre: 'corrida-sin-cierre-con-falla', eventos: [inicio, arranque, falla(2)] },
  { nombre: 'cierre-perdio-falla-AUD03', eventos: [inicio, arranque, falla(2), cierre(3, []), fin(4)] },
  { nombre: 'falla-despues-del-cierre', eventos: [inicio, arranque, cierre(2, []), falla(3), fin(4)] },
  { nombre: 'reaparece-falla-en-ultima-corrida-incompleta', eventos: [inicio, arranque, falla(2), cierre(3, [fallo]),
    { ...arranque, t: base + 4000, corrida: 2 }, { ...cierre(5, []), corrida: 2 },
    { ...arranque, t: base + 6000, corrida: 3 }, { ...falla(7), corrida: 3 }] },
];
let fallos = 0;
const resultados = casos.map(c => {
  const esquema = c.eventos.flatMap(revisarEvento);
  assert.deepEqual(esquema, [], c.nombre + ': cada línea debe ser válida según contrato');
  const historias = contarHistoria(c.eventos.map((ev, i) => ({ archivo: c.nombre + '.jsonl', linea: i + 1, ev })));
  const texto = narrar(historias);
  const resumen = texto.split('\n').find(l => l.includes('Resumen:'));
  const avisos = historias[0].avisos;
  if (c.nombre === 'control-completo') {
    assert.ok(resumen.includes('Fallas vistas: LED quemado (led1)'));
    assert.equal(avisos.length, 0);
  }
  const ocultaFallaVista = resumen.includes('Fallas vistas: ninguna');
  const omiteInconsistencia = c.nombre === 'falla-despues-del-cierre' && avisos.length === 0;
  const declaraCorregidaConUltimaFalla = c.nombre === 'reaparece-falla-en-ultima-corrida-incompleta' && resumen.includes('Corregidas al final: LED quemado (led1)');
  if (ocultaFallaVista || omiteInconsistencia || declaraCorregidaConUltimaFalla) fallos++;
  return { caso: c.nombre, eventos: c.eventos, erroresEsquema: esquema, resumen, avisos, ocultaFallaVista, omiteInconsistencia, declaraCorregidaConUltimaFalla, texto };
});
fs.writeFileSync(path.join(__dirname, 'reg004-evidencia-2026-10-19.json'), JSON.stringify(resultados, null, 2) + '\n');
for (const r of resultados) console.log(JSON.stringify({ caso: r.caso, erroresEsquema: r.erroresEsquema, resumen: r.resumen,
  avisos: r.avisos, ocultaFallaVista: r.ocultaFallaVista, omiteInconsistencia: r.omiteInconsistencia,
  declaraCorregidaConUltimaFalla: r.declaraCorregidaConUltimaFalla }));
console.log('Casos adversos que incumplen conservación/integridad de la historia: ' + fallos);
process.exitCode = fallos ? 1 : 0;
