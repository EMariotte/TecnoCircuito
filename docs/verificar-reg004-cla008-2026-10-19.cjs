// SPDX-License-Identifier: Apache-2.0
// Auditoría de CLA-008. Solo datos sintéticos; no sobrescribe evidencias anteriores.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const assert = require('node:assert/strict');
function ejecutar(file, source) {
  const m = new Module(file, module); m.filename = file;
  m.paths = Module._nodeModulePaths(__dirname); m._compile(source, file);
}
const modo = process.argv[2];
if (['original', 'residuales', 'cierres'].includes(modo)) {
  const file = path.join(__dirname, 'verificar-reg004-cla007-2026-10-19.cjs');
  const source = fs.readFileSync(file, 'utf8').replaceAll('reg004-cla007-', 'reg004-cla008-');
  ejecutar(file, source);
} else if (modo === 'ampliacion') {
  const file = path.join(__dirname, 'verificar-reg004-2026-10-19.cjs');
  const source = fs.readFileSync(file, 'utf8');
  const anchor = 'let fallos = 0;'; assert.equal(source.split(anchor).length, 2);
  ejecutar(file, source.split(anchor)[0] + `
const otro = { tipo: 'corriente_pin', componente: 'placa' };
const extras = [
 {nombre:'cierres-distintos-y-corrida-siguiente', eventos:[inicio,arranque,cierre(2,[fallo]),cierre(3,[otro]),
  {...arranque,t:base+4000,corrida:2},{...cierre(5,[]),corrida:2},fin(6)]},
 {nombre:'cierres-distintos-orden-inverso',eventos:[inicio,arranque,cierre(2,[]),cierre(3,[fallo]),fin(4)]},
 {nombre:'tres-cierres-huerfanos',eventos:[inicio,cierre(2,[fallo]),cierre(3,[otro]),cierre(4,[]),fin(5)]},
 {nombre:'control-repetido-identico-y-comparacion',eventos:[inicio,arranque,falla(2),cierre(3,[fallo]),cierre(4,[fallo]),
  {...arranque,t:base+5000,corrida:2},{...cierre(6,[]),corrida:2},fin(7)]}
];
const resultados=extras.map(c=>{
 const erroresEsquema=c.eventos.flatMap(revisarEvento);assert.deepEqual(erroresEsquema,[]);
 const [h]=contarHistoria(c.eventos.map((ev,i)=>({archivo:c.nombre+'.jsonl',linea:i+1,ev})));
 const first=h.corridas[0]; const next=h.corridas[1];
 assert.ok(h.resumen.includes('LED quemado (led1)'));
 if(c.nombre==='cierres-distintos-y-corrida-siguiente'){
  assert.equal(first.cierres.length,2);assert.equal(first.coherente,false);assert.equal(first.fallas.length,2);
  assert.equal(next.corrigio,null);assert.equal(next.siguen,null);assert.equal(next.nuevas,null);
  assert.ok(h.pasos.some(p=>p.texto.includes('No se compara con la corrida 1: sus cierres no coinciden entre sí')));
  assert.equal(h.pasos.filter(p=>p.corrida===1&&p.texto.startsWith('■')).length,2);
 }
 if(c.nombre==='cierres-distintos-orden-inverso'){
  assert.equal(first.coherente,false);assert.equal(first.fallas.length,1);
  assert.ok(h.resumen.includes('no se puede asegurar'));
 }
 if(c.nombre==='tres-cierres-huerfanos'){
  assert.equal(h.corridas.length,0);assert.equal(h.sinAtribuir[0].fallas.length,2);
  assert.ok(h.resumen.includes('corriente del pin (placa) [sin atribuir: corrida 1]'));
 }
 if(c.nombre==='control-repetido-identico-y-comparacion'){
  assert.equal(first.coherente,true);assert.equal(first.fallas.length,1);
  assert.equal(next.corrigio.length,1);assert.ok(h.pasos.some(p=>p.texto.includes('Corrigió: LED quemado')));
  assert.ok(h.avisos.some(a=>a.includes('se cierra dos veces')));
 }
 return {caso:c.nombre,eventos:c.eventos,erroresEsquema,historia:h,texto:narrar([h])};
});
fs.writeFileSync(path.join(__dirname,'reg004-cla008-ampliacion-2026-10-19.json'),JSON.stringify(resultados,null,2)+'\\n');
for(const r of resultados)console.log(r.caso+': OK');
console.log('Ampliación: '+resultados.length+' casos aprobados');
`);
} else throw new Error('Indica original, residuales, cierres o ampliacion');
