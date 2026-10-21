// SPDX-License-Identifier: Apache-2.0
// Diagnostico sintetico: nucleo y controlador reales, entrega del Worker controlada.
'use strict';
const loaderFs=require('fs'),loaderPath=require('path'),Module=require('module');
const root=loaderPath.resolve(__dirname,'..'),file=loaderPath.join(root,'prototipo/pruebas/probar_fotos.js');
const original=loaderFs.readFileSync(file,'utf8').split('// 1. El caso')[0];
const extra=String.raw`
const {contarHistoria,narrar,estaLimpio}=require(path.join(RAIZ,'../../TecnoBloques/herramientas/historia-registro.js'));
const {revisarEvento}=require('./contrato_eventos.js');
const cp=require('child_process'),os=require('os');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'reg004-reset-worker-'));
const resultados=[];
for(const [nombre,tardia,despues] of [['control-foto-antes-reset',false,10],['foto-anterior-llega-tras-reset',true,10],['control-misma-foto-cierre-mayor',true,40]]){
 const s=armar(LED_DIRECTO),n=nucleo();s.sim.iniciar();
 n.avanzar(FRECUENCIA*0.02);const pendiente=s.foto(n);
 if(!tardia)s.entregar(pendiente);
 s.sim.reiniciar();
 if(tardia)s.entregar(pendiente);
 n.reiniciarChip();n.avanzar(FRECUENCIA*despues/1000);s.entregar(s.foto(n));
 s.sim.detener();s.confirmar(despues);
 const ev=(tipo,datos)=>({v:1,origen:'editor',tipo,datos});
 const eventos=[ev('sesion_iniciada',{placa:'uno',nivel:3}),...s.eventos,ev('sesion_terminada',{ms:1000})].map((e,i)=>({...e,equipo:'SINTETICO',sesion:nombre,version_tb:'0.3.0',version_tc:'0.1.0-dev',t:Date.UTC(2026,9,21,15)+i*100}));
 const erroresEsquema=eventos.flatMap(revisarEvento);
 const [historia]=contarHistoria(eventos.map((ev,i)=>({archivo:nombre+'.jsonl',linea:i+1,ev})));
 const archivo=path.join(tmp,nombre+'.jsonl');fs.writeFileSync(archivo,eventos.map(e=>JSON.stringify(e)).join('\n')+'\n');
 const cli=path.join(RAIZ,'../../TecnoBloques/herramientas/historia-registro.js');
 const salidas={};for(const modo of ['texto','json']){const r=cp.spawnSync(process.execPath,[cli,archivo,...(modo==='json'?['--json']:[])],{encoding:'utf8',windowsHide:true});salidas[modo]={exit:r.status,stdout:r.stdout,stderr:r.stderr};}
 const aprobado=historia.corridas[0].coherente&&estaLimpio([historia],[])&&erroresEsquema.length===0;
 resultados.push({nombre,aprobado,tardia,msCierre:despues,tiempoFoto:pendiente.msSimulados,fallasFoto:pendiente.fallas,eventos,erroresEsquema,historia,texto:narrar([historia]),salidas});
 console.log(JSON.stringify({nombre,aprobado,erroresEsquema,coherente:historia.corridas[0].coherente,avisos:historia.avisos,eventos:eventos.map(e=>({tipo:e.tipo,ms:e.ms_sim,motivo:e.datos.motivo}))}));
}
const salida=process.argv[2]||path.join(tmp,'resultado.json');
console.log('Evidencia: '+salida);
fs.writeFileSync(salida,JSON.stringify({tmp,resultados},null,2)+'\n');
process.exitCode=resultados.some(r=>!r.aprobado)?1:0;
`;
const m=new Module(file,module);m.filename=file;m.paths=Module._nodeModulePaths(loaderPath.dirname(file));m._compile(original+'\n'+extra,file);
