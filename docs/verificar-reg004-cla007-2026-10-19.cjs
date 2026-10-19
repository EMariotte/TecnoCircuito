// SPDX-License-Identifier: Apache-2.0
// Auditoría de CLA-007. Datos sintéticos; preserva los diagnósticos y las evidencias anteriores.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const assert = require('node:assert/strict');
const original = path.join(__dirname, 'verificar-reg004-2026-10-19.cjs');
const anterior = path.join(__dirname, 'verificar-reg004-cla006-2026-10-19.cjs');
function ejecutar(file, source) {
  const m = new Module(file, module); m.filename = file; m.paths = Module._nodeModulePaths(__dirname); m._compile(source, file);
}
const modo = process.argv[2];
if (modo === 'original') {
  let source = fs.readFileSync(original, 'utf8');
  assert.equal(source.split("'reg004-evidencia-2026-10-19.json'").length, 2);
  source = source.replace("'reg004-evidencia-2026-10-19.json'", "'reg004-cla007-original-2026-10-19.json'");
  ejecutar(original, source);
} else if (modo === 'residuales') {
  let source = fs.readFileSync(anterior, 'utf8');
  assert.equal(source.split("'reg004-cla006-adversos-2026-10-19.json'").length, 2);
  source = source.replace("'reg004-cla006-adversos-2026-10-19.json'", "'reg004-cla007-residuales-2026-10-19.json'");
  // El instrumento anterior selecciona su rama por argv: solo se cambia el nombre de salida de los resultados.
  process.argv[2] = 'adversos'; ejecutar(anterior, source);
} else if (modo === 'cierres') {
  const source = fs.readFileSync(original, 'utf8');
  const anchor = 'let fallos = 0;'; assert.equal(source.split(anchor).length, 2);
  ejecutar(original, source.split(anchor)[0] + `
const extras = [
 { nombre: 'control-cierre-coherente', eventos: [inicio,arranque,falla(2),cierre(3,[fallo]),fin(4)] },
 { nombre: 'control-cierre-sin-falla-suelta', eventos: [inicio,arranque,cierre(2,[fallo]),fin(4)] },
 { nombre: 'dos-cierres-distintos-sin-falla-suelta', eventos: [inicio,arranque,cierre(2,[fallo]),cierre(3,[]),fin(4)] },
 { nombre: 'dos-cierres-huerfanos-distintos', eventos: [inicio,cierre(2,[fallo]),cierre(3,[]),fin(4)] }
];
const resultados = extras.map(c => {
 const erroresEsquema = c.eventos.flatMap(revisarEvento); assert.deepEqual(erroresEsquema,[]);
 const [h] = contarHistoria(c.eventos.map((ev,i)=>({archivo:c.nombre+'.jsonl',linea:i+1,ev})));
 const texto=narrar([h]);
 const pierdeHechoDeCierre = h.resumen.includes('Fallas vistas: ninguna');
 if(c.nombre==='control-cierre-coherente'){assert.ok(!pierdeHechoDeCierre);assert.equal(h.avisos.length,0);}
 if(c.nombre==='control-cierre-sin-falla-suelta'){assert.ok(!pierdeHechoDeCierre);assert.ok(h.avisos.length>0);}
 return {caso:c.nombre,eventos:c.eventos,erroresEsquema,historia:h,texto,pierdeHechoDeCierre};
});
fs.writeFileSync(path.join(__dirname,'reg004-cla007-cierres-2026-10-19.json'),JSON.stringify(resultados,null,2)+'\\n');
for(const r of resultados)console.log(JSON.stringify({caso:r.caso,resumen:r.historia.resumen,avisos:r.historia.avisos,pierdeHechoDeCierre:r.pierdeHechoDeCierre}));
const n=resultados.filter(r=>r.pierdeHechoDeCierre).length;console.log('Casos con hechos de cierre perdidos: '+n);process.exitCode=n?1:0;
`);
} else throw new Error('Indica original, residuales o cierres');
