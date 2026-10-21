// SPDX-License-Identifier: Apache-2.0
// Verificación de criterios del lote, con datos sintéticos y salidas propias.
'use strict';
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto'),cp=require('child_process');
const root=path.resolve(__dirname,'..'),tb=path.resolve(root,'../TecnoBloques');
const {crearRegistroDisco}=require(path.join(tb,'escritorio/registro-disco.js'));
const lector=require(path.join(tb,'herramientas/historia-registro.js'));
const {revisarEvento}=require(path.join(root,'prototipo/pruebas/contrato_eventos.js'));
const scratch=fs.mkdtempSync(path.join(os.tmpdir(),'cla007-aceptacion-'));
const t0=new Date(2026,9,21,10).getTime(),resultados=[];
let seq=0;
const ev=(tipo,datos,extra={})=>({v:1,t:t0,origen:'editor',tipo,datos,equipo:'SINTETICO',sesion:'synthetic-007',version_tb:'0.3.0',version_tc:'0.1.0-dev',...extra});
const led={tipo:'led_quemado',componente:'led1'};
const cir={formato:1,placa:'uno',protoboard:null,componentes:[{id:'led1',tipo:'led',x:0,y:0,rot:0,props:{color:'rojo'}}],cables:[]};
const sim=(tipo,datos,n,ms,tramo=0)=>ev(tipo,datos,{origen:'simulador',corrida:n,ms_sim:ms,tramo});
const start=n=>sim('simulacion_iniciada',{placa:'uno',modo:'realista',activas:{danoComponentes:true},circuito:cir},n,0);
function eventos(){return [ev('sesion_iniciada',{placa:'uno',nivel:3}),start(1),sim('falla',led,1,500),sim('simulacion_detenida',{ms_sim:1000,fallas:[led]},1,1000),start(2),sim('simulacion_detenida',{ms_sim:1000,fallas:[]},2,1000),ev('sesion_terminada',{ms:1000})].map((e,i)=>({...e,t:t0+i*100}));}
function fixture(es=eventos()){
 const carpeta=path.join(scratch,'caso-'+(++seq));
 const d=crearRegistroDisco({carpeta,ahora:()=>t0,version:'0.3.0'});
 if(!d.instructor({accion:'crear-pin',pin:'2468'}).ok||!d.instructor({accion:'activar',pin:'2468',activo:true}).ok)throw Error('fixture');
 const errores=es.flatMap(revisarEvento);if(errores.length)throw Error('Entrada inválida: '+JSON.stringify(errores));
 for(const e of es)d.escribir(e);
 const usb=path.join(carpeta,'usb');fs.mkdirSync(usb);
 const exp=d.exportar({pin:'2468',destino:usb});if(!exp.ok)throw Error('exportación fixture');
 return {d,carpeta,usb,exp,es};
}
function analizar(rutas){const l=lector.leerArchivos(rutas),h=lector.contarHistoria(l.lineas);const cli=cp.spawnSync(process.execPath,[path.join(tb,'herramientas/historia-registro.js'),...rutas,'--json'],{encoding:'utf8',windowsHide:true});return {problemas:l.problemas,historias:h,cli:{exit:cli.status,stderr:cli.stderr}};}
function test(caso,fn){let r;try{r=fn();}catch(e){r={aprobado:false,errorInstrumento:e.stack};}resultados.push({caso,...r});console.log((r.aprobado?'OK ':'FALLA ')+caso);}
test('control-exportacion-integra',()=>{const f=fixture(),r=analizar([f.exp.carpeta]);return {aprobado:r.cli.exit===0&&r.historias[0].corridas[1].corrigio?.length===1,lectura:r};});
for(const [nombre,valor] of [['texto','1'],['ausente',undefined],['null',null],['negativo',-1],['fraccion',0.5],['objeto',{cantidad:1}]])test('manifiesto-pendientes-'+nombre,()=>{
 const f=fixture(),p=path.join(f.exp.carpeta,'exportacion.json'),m=JSON.parse(fs.readFileSync(p,'utf8'));
 if(valor===undefined)delete m.pendientes;else m.pendientes=valor;
 fs.writeFileSync(p,JSON.stringify(m));const r=analizar([f.exp.carpeta]);
 return {aprobado:r.cli.exit===1&&r.problemas.length>0&&!r.historias[0].resumen.includes('Corregidas al final: LED quemado'),manifiesto:m,lectura:r};
});
test('pendiente-real-tipo-texto-oculta-incertidumbre',()=>{
 const f=fixture(),old=fs.appendFileSync;let exp;
 try{
  fs.appendFileSync=function(p,...args){if(path.resolve(String(p)).startsWith(path.resolve(f.d.carpeta)+path.sep))throw Object.assign(Error('ENOSPC sintético'),{code:'ENOSPC'});return old.call(this,p,...args);};
  f.d.escribir(ev('ejemplo_cargado',{id:'no-esta-en-la-copia'},{t:t0+2000}));
  exp=f.d.exportar({pin:'2468',destino:f.usb});
 }finally{fs.appendFileSync=old;}
 const p=path.join(exp.carpeta,'exportacion.json'),m=JSON.parse(fs.readFileSync(p,'utf8'));
 const antes=analizar([exp.carpeta]),esperando=f.d.estado().falla.pendientes;
 m.pendientes=String(m.pendientes);fs.writeFileSync(p,JSON.stringify(m));const despues=analizar([exp.carpeta]);
 f.d.reintentar();
 return {aprobado:esperando===1&&antes.cli.exit===1&&despues.cli.exit===1&&!despues.historias[0].resumen.includes('Corregidas al final: LED quemado'),esperando,manifiesto:m,antes,despues};
});
for(const codigo of ['EACCES','EIO'])test('origen-'+codigo,()=>{
 const f=fixture(),old=fs.readdirSync;let respuesta;
 try{fs.readdirSync=function(p,...args){if(path.resolve(String(p))===path.resolve(f.d.carpeta))throw Object.assign(Error('error sintético'),{code:codigo});return old.call(this,p,...args);};respuesta=f.d.exportar({pin:'2468',destino:f.usb});}finally{fs.readdirSync=old;}
 return {aprobado:respuesta.motivo==='disco'&&respuesta.donde==='origen'&&respuesta.codigo===codigo,respuesta};
});
test('snapshots-repetidos-y-orden-inverso',()=>{
 const f=fixture(),a=f.exp.carpeta,b=f.d.exportar({pin:'2468',destino:f.usb}).carpeta;
 const r=analizar([b,a]),s=analizar([b]);const normal=x=>x.historias.map(h=>({pasos:h.pasos,resumen:h.resumen,corridas:h.corridas}));
 return {aprobado:r.cli.exit===0&&JSON.stringify(normal(r))===JSON.stringify(normal(s)),lectura:r};
});
test('utf8-bom-crlf-linea-mayor-64KiB',()=>{
 const es=[ev('sesion_iniciada',{placa:'uno',nivel:3}),ev('codigo_compilado',{ok:true,codigo:'const char*s="'+('漢'.repeat(70000))+'�";'}),ev('ejemplo_cargado',{id:'ROTO'}),ev('sesion_terminada',{ms:1000})].map((e,i)=>({...e,t:t0+i}));
 const p=path.join(scratch,'utf8.jsonl'),b=Buffer.concat([Buffer.from([0xef,0xbb,0xbf]),Buffer.from(es.map(e=>JSON.stringify(e)).join('\r\n')+'\r\n')]);b[b.indexOf(Buffer.from('ROTO'))]=255;fs.writeFileSync(p,b);
 const r=lector.leerArchivos([p]),apartadas=r.lineas.filter(l=>l.apartada);
 return {aprobado:apartadas.length===1&&apartadas[0].linea===3&&r.lineas.find(l=>l.ev?.tipo==='codigo_compilado')?.ev.datos.codigo===es[1].datos.codigo,apartadas,buenas:r.lineas.filter(l=>l.ev).map(l=>l.ev.tipo)};
});
// Inicio conocido en cero: documentar la frontera de la detección de mezclas; no se cuenta como defecto por sí sola.
for(const inicioConTramo of [true,false])test('observacion-mezcla-solo-inicio-'+inicioConTramo,()=>{
 const es=eventos();for(const e of es.filter(e=>e.origen==='simulador')){if((e.tipo==='simulacion_iniciada')!==inicioConTramo)delete e.tramo;}
 const f=fixture(es),r=analizar([f.exp.carpeta]);
 return {aprobado:true,observacion:'El inicio siempre establece cero; esta observación no demuestra un falso resultado temporal.',eventos:es,lectura:r};
});
const output=process.argv[2]||path.join(scratch,'resultado.json');
fs.writeFileSync(output,JSON.stringify({utc:new Date().toISOString(),script:__filename,instrumentoSHA256:crypto.createHash('sha256').update(fs.readFileSync(__filename)).digest('hex'),scratch,resultados},null,2)+'\n');
console.log(resultados.length+' escenarios; '+resultados.filter(r=>!r.aprobado).length+' incumplimientos; '+output);
process.exitCode=resultados.some(r=>!r.aprobado)?1:0;
