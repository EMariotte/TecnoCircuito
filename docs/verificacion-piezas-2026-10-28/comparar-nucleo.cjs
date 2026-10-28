// Comparación diferencial propia, semilla fija. Los bundles históricos se leen de Git en memoria.
// No cambia checkout, fuentes, fixtures ni compilados de la suite.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');
const root = path.resolve(__dirname, '../..');
const esbuild = require(path.join(root, 'prototipo/node_modules/esbuild'));
const src = path.join(root, 'prototipo/src') + path.sep;
const git = (rev, p) => execFileSync('git', ['show', `${rev}:${p}`], { cwd: root, encoding: 'utf8', maxBuffer: 8e6 });
const clone = x => JSON.parse(JSON.stringify(x));
async function kernel(rev) {
  const bundle = await esbuild.build({ entryPoints:[path.join(src, 'nucleo.js')], bundle:true, platform:'node', format:'cjs', write:false,
    plugins:rev ? [{ name:'fuentes-historicas', setup(build) {
      build.onLoad({ filter:/\.js$/ }, args => {
        if (!args.path.startsWith(src)) return null;
        const rel = path.relative(root,args.path).split(path.sep).join('/');
        return { contents:git(rev,rel), loader:'js', resolveDir:path.dirname(args.path) };
      });
    }}] : [] });
  const m = {exports:{}};
  new Function('module','exports','require',bundle.outputFiles[0].text)(m,m.exports,require);
  return m.exports;
}
function clean(f, old) {
  const x=clone(f);
  if(old && x.medicion) for(const r of x.medicion.resistencias || []) delete r.vatios;
  return x;
}
async function main() {
  const [old,head,now] = await Promise.all([kernel('HEAD^'),kernel('HEAD'),kernel(null)]);
  const page=git('HEAD^','prototipo/pagina.html');
  const start=page.indexOf('  const INICIAL =');
  const end=page.indexOf('  let lienzo =',start);
  const code=page.slice(start,end);
  const names=[...code.matchAll(/const (EJEMPLO\w*)\s*=/g)].map(x=>x[1]);
  const examples=vm.runInNewContext(code+`;Object.fromEntries([${names.map(n=>`["${n}",${n}]`).join(',')}])`);
  const cases=[];
  const programs=['parpadeo13','pwm9','potenciometro','boton_pulldown','servo_barrido','fijo13'];
  for(const [name,circuito] of Object.entries(examples)) for(const program of programs) {
    cases.push({name:`pagina/${name}/${program}`,circuito,hex:fs.readFileSync(path.join(root,`prototipo/programas/${program}.hex`),'utf8')});
  }
  const fixtureRoot=path.join(root,'prototipo/pruebas/fixtures');
  for(const name of fs.readdirSync(fixtureRoot)) {
    const base=path.join(fixtureRoot,name,name),h=base+'.hex';
    const project=JSON.parse(fs.readFileSync(base+'.tbq.json','utf8'));
    if(!fs.existsSync(h)||!['uno','nano','nano_old'].includes(project.placa)) continue;
    cases.push({name:`fixture/${name}`,circuito:project.circuito||{formato:1,placa:project.placa,componentes:[],cables:[]},hex:fs.readFileSync(h,'utf8')});
  }
  const results=[];
  for(const item of cases) {
    const ns=[old,head,now].map(k=>k.crearNucleo({hex:item.hex,circuito:clone(item.circuito),semilla:37,
      activas:{danoComponentes:true,limitePin:true,limitePuerto:true,limiteChip:true,entradaFlotante:true,ruidoADC:true,limiteUSB:true}}));
    const mismatches=[];
    for(let frame=0;frame<60;frame++) {
      if(frame===20||frame===35) for(const n of ns) for(const c of item.circuito.componentes) if(c.tipo==='pulsador') n.ponerPulsador(c.id,frame===20);
      const photos=ns.map(n=>{n.avanzar(old.FRECUENCIA*0.016);return n.foto();});
      if(JSON.stringify(clean(photos[0],true))!==JSON.stringify(clean(photos[2],true))) mismatches.push({frame,par:'pre-entrega/actual',fotos:photos});
      if(JSON.stringify(photos[1])!==JSON.stringify(photos[2])) mismatches.push({frame,par:'2808fd8/actual',fotos:photos});
    }
    results.push({caso:item.name,conforme:mismatches.length===0,diferencias:mismatches.slice(0,1)});
    console.log((mismatches.length?'FALLO ':'OK ')+item.name);
  }
  // Control positivo: una resistencia de otro valor debe alterar la corriente y la foto.
  const c={formato:1,placa:'uno',componentes:[{id:'r1',tipo:'resistencia',props:{ohmios:220}},{id:'led1',tipo:'led',props:{color:'rojo'}}],
    cables:[{de:'placa.D13',a:'r1.1'},{de:'r1.2',a:'led1.anodo'},{de:'led1.catodo',a:'placa.GND1'}]};
  const b=clone(c);b.componentes[0].props.ohmios=330;
  const hex=fs.readFileSync(path.join(root,'prototipo/programas/fijo13.hex'),'utf8');
  const control=[c,b].map(circuito=>{const n=now.crearNucleo({hex,circuito,semilla:37});n.avanzar(old.FRECUENCIA*0.032);return n.foto();});
  const detected=JSON.stringify(control[0])!==JSON.stringify(control[1]);
  console.log('Control de 220/330 ohmios:',detected);
  fs.writeFileSync(path.join(__dirname,'comparacion-nucleo.json'),JSON.stringify({referencias:['HEAD^','HEAD','arbol identificado en inicio.json'],casos:results,cuadrosPorCaso:60,controlDetectado:detected,control},null,2));
  console.log(`${results.filter(x=>x.conforme).length}/${results.length} corridas, dos comparaciones por corrida`);
  process.exitCode=results.some(x=>!x.conforme)||!detected?1:0;
}
main().catch(e=>{console.error(e);process.exitCode=2;});
