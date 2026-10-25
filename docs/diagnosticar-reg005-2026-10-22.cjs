// SPDX-License-Identifier: Apache-2.0
// Instrumento de auditoría: datos sintéticos y fallo de transporte controlado. No corrige producto.
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm'),os=require('os'),crypto=require('crypto'),{createRequire}=require('module');
const root=path.resolve(__dirname,'..'),tb=path.resolve(root,'../TecnoBloques');
const out=path.join(__dirname,'reg005-auditoria-2026-10-22');
const lector=require(path.join(tb,'herramientas/historia-registro.js'));
const {revisarEvento}=require(path.join(root,'prototipo/pruebas/contrato_eventos.js'));
const results=[];
function record(id,expected,observed,ok){results.push({id,expected,observed,ok});console.log((ok?'OK ':'FALLA ')+id);}
const base=Date.UTC(2026,9,22,15);
const cir={formato:1,placa:'uno',protoboard:null,componentes:[{id:'led1',tipo:'led',x:0,y:0,rot:0,props:{color:'rojo'}}],cables:[]};
const falla={tipo:'led_quemado',componente:'led1'};
function history(replacement){
 let k=0;
 const ev=(tipo,datos,origen='editor',corrida)=>({v:1,t:base+100*k++,tipo,datos,origen,equipo:'AUDITORIA',sesion:'reg005-identidad',version_tb:'0.3.0',version_tc:'0.1.0-dev',...(corrida?{corrida,ms_sim:tipo==='simulacion_iniciada'?0:100,tramo:0}:{})});
 const start=n=>ev('simulacion_iniciada',{placa:'uno',modo:'realista',activas:{danoComponentes:true},circuito:cir},'simulador',n);
 const end=(n,fs)=>ev('simulacion_detenida',{fallas:fs,ms_sim:100,confirmado:true},'simulador',n);
 const es=[ev('sesion_iniciada',{placa:'uno',nivel:3}),start(1),ev('falla',falla,'simulador',1),end(1,[falla])];
 if(replacement)es.push(ev('componente_quitado',{id:'led1',tipo:'led'},'circuito'),ev('componente_agregado',{id:'led1',tipo:'led'},'circuito'));
 es.push(start(2),end(2,[]),ev('sesion_terminada',{ms:1000}));
 const errors=es.flatMap(revisarEvento);
 if(errors.length)throw Error(JSON.stringify(errors));
 const h=lector.contarHistoria(es.map((ev,i)=>({ev,archivo:'AUDITORIA-2026-10-22.jsonl',linea:i+1})))[0];
 return {eventos:es,historia:h};
}
const normal=history(false),replacement=history(true);
record('control-misma-pieza','Sin reemplazo: comparación y corrección',normal,normal.historia.corridas[1].corrigio?.length===1);
record('R01-identidad-reutilizada','Tras baja y alta, la pieza anterior no sigue: no acreditar corrección de ella',replacement,!replacement.historia.corridas[1].corrigio?.length&&!replacement.historia.resumen.includes('Corregidas al final: LED quemado'));
{
 const carpeta=fs.mkdtempSync(path.join(os.tmpdir(),'reg005-hash-')),archivo='AUDITORIA-2026-10-22.jsonl',p=path.join(carpeta,archivo);
 const limpia=normal.eventos;
 const conFalla=structuredClone(limpia);
 const c2=conFalla.find(e=>e.tipo==='simulacion_detenida'&&e.corrida===2);c2.datos.fallas=[falla];
 conFalla.splice(conFalla.indexOf(c2),0,{...structuredClone(c2),tipo:'falla',datos:falla});
 const texto=es=>es.map(e=>JSON.stringify(e)).join('\n')+'\n';
 const original=Buffer.from(texto(conFalla));fs.writeFileSync(p,original);
 fs.writeFileSync(path.join(carpeta,'exportacion.json'),JSON.stringify({formato:1,app:'TecnoBloques',version_tb:'0.3.0',t:base,completa:true,total:1,pendientes:0,archivos:[{archivo,bytes:original.length,sha256:crypto.createHash('sha256').update(original).digest('hex')}]}));
 const read=fs.readFileSync;let lecturas=0,leida;
 fs.readFileSync=function(f,...args){const bytes=read(f,...args);if(path.resolve(String(f))===path.resolve(p)&&++lecturas===1)fs.writeFileSync(p,texto(limpia));return bytes;};
 try{leida=lector.leerArchivos([carpeta]);}finally{fs.readFileSync=read;}
 const hs=lector.contarHistoria(leida.lineas);
 record('R10-hash-de-otros-bytes','Analizar exactamente los bytes cuya huella fue verificada, o detectar la modificación entre lecturas',{lecturas,problemas:leida.problemas,antes:lector.contarHistoria(conFalla.map((ev,i)=>({ev,archivo,linea:i+1})))[0].resumen,despues:hs[0]?.resumen},leida.problemas.length>0||!hs[0]?.resumen.includes('Corregidas al final: LED quemado'));
}

// El estado mostrado en vivo debe seguir el tamaño de la cola y las pérdidas, no solo su primer error.
{
 const {crearRegistroDisco}=require(path.join(tb,'escritorio/registro-disco.js'));
 const carpeta=fs.mkdtempSync(path.join(os.tmpdir(),'reg005-disco-')),avisos=[];
 const d=crearRegistroDisco({carpeta,ahora:()=>base,alCambiar:(f,fin)=>avisos.push({f,fin})});
 d.instructor({accion:'crear-pin',pin:'2468'});d.instructor({accion:'activar',pin:'2468',activo:true});
 const old=fs.appendFileSync;
 fs.appendFileSync=function(p,...args){if(String(p).startsWith(carpeta))throw Object.assign(Error('Disco lleno sintético'),{code:'ENOSPC'});return old(p,...args);};
 let durante;
 try{
  for(let i=0;i<5002;i++)d.escribir({v:1,t:base,equipo:'AUDITORIA',sesion:'cola',origen:'editor',tipo:'ejemplo_cargado',datos:{id:'eco'}});
  durante=d.estado();
 }finally{fs.appendFileSync=old;d.reintentar();}
 const visible=avisos.filter(x=>x.f).at(-1)?.f;
 record('R06-contadores-de-disco-obsoletos','El aviso en vivo informa la cola y las pérdidas actuales', {durante,avisos,visible},visible?.pendientes===durante.falla.pendientes&&visible?.perdidos===durante.falla.perdidos);
}
{
 const {crearRegistroDisco}=require(path.join(tb,'escritorio/registro-disco.js'));
 const carpeta=fs.mkdtempSync(path.join(os.tmpdir(),'reg005-copia-')),destino=path.join(carpeta,'usb');fs.mkdirSync(destino);
 const d=crearRegistroDisco({carpeta,ahora:()=>base});
 d.instructor({accion:'crear-pin',pin:'2468'});d.instructor({accion:'activar',pin:'2468',activo:true});
 d.escribir({v:1,t:base,equipo:'AUDITORIA',sesion:'lectura',origen:'editor',tipo:'sesion_iniciada',datos:{placa:'uno'}});
 const original=fs.copyFileSync;let respuesta;
 fs.copyFileSync=function(de,a,...args){if(String(de).startsWith(d.carpeta))throw Object.assign(Error('Error sintético al leer el contenido del origen (abrir sí funciona)'),{code:'EIO',path:de,dest:a});return original(de,a,...args);};
 try{respuesta=d.exportar({pin:'2468',destino});}finally{fs.copyFileSync=original;}
 record('R09-error-lectura-no-es-error-usb','Un origen que abre pero falla al leer no debe atribuirse con certeza al destino',{respuesta},respuesta.donde==='origen'||respuesta.donde==='indeterminado');
}

// Reutiliza solo las factorías del banco de pruebas entregado, sin ejecutar sus casos ni alterar su archivo.
const bank=path.join(root,'prototipo/pruebas/probar_fotos.js');
let code=fs.readFileSync(bank,'utf8');
const prefix=code.slice(0,code.indexOf('// 1. El caso de la auditoría'));
const workerFactory=code.slice(code.indexOf('function trabajadorReal()'),code.indexOf('/** El simulador sin Worker'));
const ctx=vm.createContext({require:createRequire(bank),__dirname:path.dirname(bank),console,structuredClone,TextDecoder,process,record});
vm.runInContext(prefix+'\n'+workerFactory+`\n
function escenario(fallar){
 const w=trabajadorReal(),s=armar(LED_DIRECTO);
 let entregadas=0;
 function transferir(){for(const m of w.salidas.slice(entregadas)){s.entregar(m);}entregadas=w.salidas.length;}
 w.enviar({tipo:'crear',hex:HEX,circuito:LED_DIRECTO,activas:{danoComponentes:true,limitePin:true},semilla:1});
 s.sim.iniciar();w.enviar({tipo:'iniciar',nuevo:true,turno:1});transferir();
 w.correr(15);
 s.sim.reiniciar();w.fallarFotos=fallar;w.enviar({tipo:'reiniciar',turno:2});w.fallarFotos=false;transferir();
 w.enviar({tipo:'iniciar',nuevo:false,turno:2});transferir();
 s.sim.detener();w.enviar({tipo:'detener',turno:3});transferir();
 return {salidas:w.salidas,eventos:s.eventos,cierre:s.eventos.find(e=>e.tipo==='simulacion_detenida')};
}
const control=escenario(false),perdida=escenario(true);
record('control-reset-sin-fallo','El RESET entrega las fallas y cierre confirmado',control,control.cierre.datos.confirmado&&control.cierre.datos.fallas.length>=2);
record('R02-foto-perdida-antes-reset','Perder una foto con hechos invalida la integridad de toda esa corrida',perdida,perdida.cierre.datos.confirmado===false||perdida.cierre.datos.fallas.length>=2);
{
 const s=armar(LED_DIRECTO),n=nucleo();s.sim.iniciar();s.entregar(s.foto(n));n.avanzar(FRECUENCIA*0.022);
 const pendiente=s.foto(n),ciclos=n.ciclos;s.sim.pausar();s.entregar(pendiente);s.sim.iniciar();
 const pausa=s.eventos.find(e=>e.tipo==='simulacion_pausada'),reanuda=s.eventos.find(e=>e.tipo==='simulacion_reanudada');
 record('R08-control-foto-anterior-en-pausa','Una foto producida antes de pausar puede elevar ms_sim al reanudar, sin avance durante la pausa',{pausa,reanuda,ciclosAntes:ciclos,ciclosDespues:n.ciclos,delta:reanuda.ms_sim-pausa.ms_sim},n.ciclos===ciclos&&reanuda.ms_sim-pausa.ms_sim>20);
}
{
 const w=trabajadorReal();
 w.enviar({tipo:'crear',hex:HEX,circuito:LED_DIRECTO,activas:{danoComponentes:true,limitePin:true},semilla:1});
 w.enviar({tipo:'iniciar',nuevo:true,turno:1});w.correr(15);w.fallarFotos=true;
 let excepcion=null;try{w.correr(3);}catch(e){excepcion=e.message;}
 w.fallarFotos=false;const antes=w.salidas.length;w.correr(80);const nuevas=w.salidas.slice(antes);
 w.enviar({tipo:'detener',turno:2});
 record('R02-variante-foto-periodica','Un fallo periódico debe producir estado de error y no dejar una corrida congelada con cierre aparentemente íntegro',{excepcion,sinActividadPosterior:nuevas.length===0,salidas:w.salidas},!excepcion||nuevas.some(m=>m.tipo==='error'));
}
`,ctx);
fs.writeFileSync(path.join(out,'diagnostico-node.json'),JSON.stringify({utc:new Date().toISOString(),results},null,2));
process.exitCode=results.some(x=>!x.ok)?1:0;
