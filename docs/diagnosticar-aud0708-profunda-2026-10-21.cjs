// SPDX-License-Identifier: Apache-2.0
// Diagnósticos sintéticos. No modifica producto, configuración real ni evidencias anteriores.
'use strict';
const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),tb=path.resolve(root,'../TecnoBloques');
const {crearRegistroDisco}=require(path.join(tb,'escritorio/registro-disco.js'));
const {crearRegistroEventos}=require(path.join(tb,'src/registro.js'));
const lector=require(path.join(tb,'herramientas/historia-registro.js'));
const {revisarEvento}=require(path.join(root,'prototipo/pruebas/contrato_eventos.js'));
const scratch=fs.mkdtempSync(path.join(os.tmpdir(),'aud0708-profunda-'));
const t0=new Date(2026,9,21,10).getTime(),resultados=[];
let seq=0;
function fixture(){
 const carpeta=path.join(scratch,'caso-'+(++seq)),avisos=[],cambios=[];let tiempo=t0;
 const d=crearRegistroDisco({carpeta,ahora:()=>tiempo,version:'0.3.0',alDescartar:x=>avisos.push(x),alCambiar:(f,fin)=>cambios.push({f,fin})});
 if(!d.instructor({accion:'crear-pin',pin:'2468'}).ok||!d.instructor({accion:'activar',pin:'2468',activo:true}).ok)throw Error('fixture sin activar');
 const usb=path.join(carpeta,'usb');fs.mkdirSync(usb);
 return {d,carpeta,usb,avisos,cambios,reloj:t=>{tiempo=t;}};
}
const ev=(tipo,datos={},extra={})=>({v:1,t:t0,origen:'editor',tipo,datos,equipo:'SINTETICO',sesion:'sintetica',version_tb:'0.3.0',version_tc:'0.1.0-dev',...extra});
const inicio=(extra={})=>ev('sesion_iniciada',{placa:'uno',nivel:3},extra);
const fin=(extra={})=>ev('sesion_terminada',{ms:Math.max(0,(extra.t??t0)-t0)},extra);
const programa=(extra={})=>ev('codigo_compilado',{ok:true,error:null,bytes:10,codigo:'void setup(){}\nvoid loop(){delay(500);}\n'},extra);
function eventosDisco(f){return f.d.archivos().flatMap(n=>fs.readFileSync(path.join(f.d.carpeta,n),'utf8').trim().split('\n').filter(Boolean).map(l=>JSON.parse(l)));}
function analizar(rutas){
 const leidos=lector.leerArchivos(rutas),hs=lector.contarHistoria(leidos.lineas);
 const c=cp.spawnSync(process.execPath,[path.join(tb,'herramientas/historia-registro.js'),...rutas,'--json'],{encoding:'utf8',windowsHide:true});
 return {problemas:leidos.problemas,notas:leidos.notas,historias:hs,texto:lector.narrar(hs,leidos.problemas,leidos.notas),cli:{exit:c.status,stdout:c.stdout,stderr:c.stderr}};
}
function test(caso,criterio,fn){
 if(process.env.AUDIT_FILTER&&!new RegExp(process.env.AUDIT_FILTER).test(caso))return;
 let r;try{r=fn();}catch(e){r={aprobado:false,errorInstrumento:String(e.stack)}}
 resultados.push({caso,criterio,...r});console.log((r.aprobado?'OK ':'FALLA ')+caso);
}
function patch(method,fn,body){const old=fs[method];fs[method]=function(...args){return fn(old,...args)};try{return body();}finally{fs[method]=old;}}

test('control-activo-y-apagado','Evento pequeño guardado; apagado no cuenta descartes',()=>{
 const f=fixture();f.d.escribir(inicio());f.d.escribir(fin());const antes=eventosDisco(f).length;
 f.d.instructor({accion:'activar',pin:'2468',activo:false});const retorno=f.d.escribir(ev('codigo_compilado',{ok:true,codigo:'x'.repeat(2097153)}));
 return {aprobado:antes===2&&retorno===false&&f.d.estado().descartados===null,estado:f.d.estado()};
});
for(const relleno of ['x','ñ','😀'])test('frontera-'+relleno,'Límite inferior y exacto aceptados; superior anotado',()=>{
 const f=fixture(),base=JSON.stringify(ev('codigo_compilado',{ok:true,codigo:''})).length;
 const rs=[];
 for(const n of [2097151,2097152,2097153]){
  const faltan=n-base,s=relleno.repeat(Math.floor(faltan/relleno.length))+'x'.repeat(faltan%relleno.length);
  const linea=ev('codigo_compilado',{ok:true,codigo:s});rs.push({largo:JSON.stringify(linea).length,retorno:f.d.escribir(linea)});
 }
 const marcadores=eventosDisco(f).filter(e=>e.tipo==='evento_descartado');
 return {aprobado:rs[0].retorno&&rs[1].retorno&&!rs[2].retorno&&marcadores.length===1&&!revisarEvento(marcadores[0]).length,fronteras:rs,marcadores,estado:f.d.estado()};
});
test('descarte-con-cola-saturada','La cuenta no debe afirmar anotación de un marcador que no entró en la cola',()=>{
 const f=fixture();
 patch('appendFileSync',(old,a,...rest)=>{if(String(a).startsWith(f.carpeta))throw Object.assign(Error('ENOSPC sintetico'),{code:'ENOSPC'});return old(a,...rest);},()=>{
  for(let n=0;n<5000;n++)f.d.escribir(ev('ejemplo_cargado',{id:'x-'+n}));
  f.d.escribir(ev('codigo_compilado',{ok:true,codigo:'x'.repeat(2097153)}));
 });
 const antes=f.d.estado();f.d.reintentar();const todas=eventosDisco(f),marcadores=todas.filter(e=>e.tipo==='evento_descartado'),interrupciones=todas.filter(e=>e.tipo==='registro_interrumpido');
 return {aprobado:marcadores.length===1||antes.descartados.sinAnotar>0,antes,despues:f.d.estado(),marcadores,interrupciones,total:todas.length};
});
test('exportaciones-mismo-reloj','Destinos distintos y primera copia intacta',()=>{
 const f=fixture();f.d.escribir(inicio());f.d.escribir(fin());const a=f.d.exportar({pin:'2468',destino:f.usb});
 const archivo=f.d.archivos()[0],p=path.join(a.carpeta,archivo),sha=()=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');const antes=sha();
 f.d.escribir(ev('ejemplo_cargado',{id:'nuevo'}));const b=f.d.exportar({pin:'2468',destino:f.usb});
 return {aprobado:a.ok&&b.ok&&a.carpeta!==b.carpeta&&sha()===antes,a,b,hashPrimera:antes};
});
test('copia-incompleta-leida-como-limpia','El consumidor debe reconocer completa:false de su exportación',()=>{
 const f=fixture();for(const equipo of ['A','B']){f.d.escribir(inicio({equipo,sesion:'s-'+equipo}));f.d.escribir(fin({equipo,sesion:'s-'+equipo}));}
 let numero=0;
 const exp=patch('copyFileSync',(old,de,a,...rest)=>{if(String(a).startsWith(f.usb)&&++numero===2)throw Object.assign(Error('ENOSPC sintetico'),{code:'ENOSPC'});return old(de,a,...rest);},()=>f.d.exportar({pin:'2468',destino:f.usb}));
 const manifiesto=JSON.parse(fs.readFileSync(path.join(exp.carpeta,'exportacion.json'),'utf8')),lectura=analizar([exp.carpeta]);
 return {aprobado:!exp.ok&&!manifiesto.completa&&lectura.cli.exit!==0,exportacion:exp,manifiesto,lectura};
});
test('archivo-alterado-y-hash-ignorado','El consumidor debe avisar si una copia difiere de su sha256',()=>{
 const f=fixture();for(const e of [inicio(),programa(),fin()])f.d.escribir(e);const exp=f.d.exportar({pin:'2468',destino:f.usb});
 const m=JSON.parse(fs.readFileSync(path.join(exp.carpeta,'exportacion.json'),'utf8')),p=path.join(exp.carpeta,m.archivos[0].archivo);
 fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('delay(500)','delay(900)'));const lectura=analizar([exp.carpeta]),sha=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
 return {aprobado:lectura.cli.exit!==0,hashEsperado:m.archivos[0].sha256,hashActual:sha,lectura};
});
test('archivo-omitido-oculta-hueco','Una copia que pierde un segmento no debe acreditar corrección ni salir limpia',()=>{
 const f=fixture(),dia=86400000,led={tipo:'led_quemado',componente:'led1'};
 const cir={formato:1,placa:'uno',protoboard:null,componentes:[{id:'led1',tipo:'led',x:0,y:0,rot:0,props:{color:'rojo'}}],cables:[]};
 const sim=(tipo,datos,n,t,ms)=>ev(tipo,datos,{origen:'simulador',corrida:n,t,ms_sim:ms,tramo:0});
 const eventos=[inicio(),sim('simulacion_iniciada',{placa:'uno',modo:'realista',activas:{danoComponentes:true},circuito:cir},1,t0+100,0),sim('falla',led,1,t0+200,500),sim('simulacion_detenida',{ms_sim:1000,fallas:[led]},1,t0+300,1000),
  ev('registro_interrumpido',{desde:t0+400,hasta:t0+dia,recuperados:0,perdidos:1,motivo:'ENOSPC'},{t:t0+dia}),
  sim('simulacion_iniciada',{placa:'uno',modo:'realista',activas:{danoComponentes:true},circuito:cir},2,t0+2*dia,0),sim('simulacion_detenida',{ms_sim:1000,fallas:[]},2,t0+2*dia+100,1000),fin({t:t0+2*dia+200})];
 const erroresEsquema=eventos.flatMap(revisarEvento);for(const e of eventos)f.d.escribir(e);
 const exp=f.d.exportar({pin:'2468',destino:f.usb});const completa=analizar([exp.carpeta]);
 const m=JSON.parse(fs.readFileSync(path.join(exp.carpeta,'exportacion.json'),'utf8'));const omitido=m.archivos[1].archivo;
 // Se mueve exclusivamente un archivo de esta exportación temporal, sin tocar el origen.
 fs.renameSync(path.join(exp.carpeta,omitido),path.join(f.carpeta,'segmento-apartado.jsonl'));
 const incompleta=analizar([exp.carpeta]);
 return {aprobado:incompleta.cli.exit!==0,erroresEsquema,omitido,manifiesto:m,completa,incompleta};
});
test('dos-exportaciones-pierden-repeticion-legitima','Combinar snapshots debe conservar la multiplicidad y el estado del último',()=>{
 const f=fixture(),alta=ev('componente_agregado',{id:'r1',tipo:'resistencia',x:0,y:0,rot:0,props:{ohmios:220}},{origen:'circuito',t:t0+100});
 f.d.escribir(inicio());f.d.escribir(alta);const a=f.d.exportar({pin:'2468',destino:f.usb});
 const baja=ev('componente_quitado',{id:'r1',tipo:'resistencia'},{origen:'circuito',t:t0+100});f.d.escribir(baja);f.d.escribir(alta);f.d.escribir(fin({t:t0+1000}));const b=f.d.exportar({pin:'2468',destino:f.usb});
 const sola=analizar([b.carpeta]),juntas=analizar([a.carpeta,b.carpeta]),normal=h=>h.historias.map(x=>x.pasos.map(p=>p.texto));
 return {aprobado:JSON.stringify(normal(sola))===JSON.stringify(normal(juntas)),erroresEsquema:[inicio(),alta,baja,fin({t:t0+1000})].flatMap(revisarEvento),sola,juntas};
});
test('listar-origen-sin-permiso','Error de lectura debe diferenciarse de ausencia de registros',()=>{
 const f=fixture();f.d.escribir(inicio());f.d.escribir(fin());
 const r=patch('readdirSync',(old,a,...rest)=>{if(path.resolve(String(a))===path.resolve(f.d.carpeta))throw Object.assign(Error('EACCES sintetico'),{code:'EACCES'});return old(a,...rest);},()=>f.d.exportar({pin:'2468',destino:f.usb}));
 return {aprobado:r.motivo==='disco',exportacion:r,hayArchivo:fs.readdirSync(f.d.carpeta)};
});
for(const [nombre,valor] of [['null',null],['array',[]],['sin-pin',{activo:true}],['pin-roto',{activo:true,pin:{}}]])test('configuracion-'+nombre,'Configuración mal formada debe fallar cerrada y no lanzar al registrar',()=>{
 const f=fixture();fs.writeFileSync(path.join(f.carpeta,'registro-config.json'),JSON.stringify(valor));let excepcion=null,retorno=null,instructor=null;
 try{retorno=f.d.escribir(programa());}catch(e){excepcion=String(e);}
 try{instructor=f.d.instructor({accion:'entrar',pin:'2468'});}catch(e){instructor={excepcion:String(e)};}
 const estado=f.d.estado();
 return {aprobado:estado.configIlegible&&!estado.activo&&!excepcion&&!instructor?.excepcion,estado,retorno,excepcion,instructor,archivos:f.d.archivos()};
});
test('utf8-invalido-aparta-texto-valido-con-UFFFD','Un byte roto no debe invalidar otra línea con el carácter U+FFFD legítimo',()=>{
 const p=path.join(scratch,'utf8-mixto.jsonl'),a=JSON.stringify(programa({datos:{ok:true,codigo:'const char* s="�";'}})),b=JSON.stringify(ev('ejemplo_cargado',{id:'INVALIDO'}));
 const buffer=Buffer.from([JSON.stringify(inicio()),a,b,JSON.stringify(fin())].join('\n')+'\n');buffer[buffer.indexOf(Buffer.from('INVALIDO'))]=255;fs.writeFileSync(p,buffer);
 const lectura=lector.leerArchivos([p]);return {aprobado:lectura.lineas.filter(l=>l.apartada).length===1,apartadas:lectura.lineas.filter(l=>l.apartada),buenas:lectura.lineas.filter(l=>!l.apartada).map(l=>l.ev.tipo),problemas:lectura.problemas};
});
test('control-entrada-fuera-contrato-JSON','NaN/undefined no son datos JSON: observación de frontera, no defecto acreditado del emisor normal',()=>{
 const f=fixture();const entrada=programa({datos:{ok:true,codigo:'x',noFinito:NaN,detalle:undefined}});const retorno=f.d.escribir(entrada),salida=eventosDisco(f)[0];
 return {aprobado:true,retorno,salida,estado:f.d.estado(),nota:'Hipótesis excluida de fallos: entrada fuera del contrato JSON; el emisor normal no produce este campo.'};
});

for(const variante of ['falla-tramo-sin-reset','cierre-tramo-inexistente','pausa-tramo-inexistente','control-foto-previa-tras-reset'])test(variante,'El tramo explícito debe ser compatible con los RESET observados, sin perder fotos previas',()=>{
 const led={tipo:'led_quemado',componente:'led1'},cir={formato:1,placa:'uno',protoboard:null,componentes:[{id:'led1',tipo:'led',x:0,y:0,rot:0,props:{color:'rojo'}}],cables:[]};
 const sim=(tipo,datos,n,ms,tramo)=>ev(tipo,datos,{origen:'simulador',corrida:n,ms_sim:ms,tramo});
 const start=n=>sim('simulacion_iniciada',{placa:'uno',modo:'realista',activas:{danoComponentes:true},circuito:cir},n,0,0);
 let middle=[];
 if(variante==='falla-tramo-sin-reset')middle=[sim('falla',led,1,1500,1),sim('simulacion_detenida',{ms_sim:1000,fallas:[led]},1,1000,0)];
 if(variante==='cierre-tramo-inexistente')middle=[sim('falla',led,1,1500,0),sim('simulacion_detenida',{ms_sim:1000,fallas:[led]},1,1000,9)];
 if(variante==='pausa-tramo-inexistente')middle=[sim('falla',led,1,500,0),sim('simulacion_pausada',{},1,1500,9),sim('simulacion_reanudada',{},1,1500,9),sim('simulacion_detenida',{ms_sim:1000,fallas:[led]},1,1000,0)];
 if(variante==='control-foto-previa-tras-reset')middle=[sim('reinicio_placa',{motivo:'boton'},1,0,0),sim('falla',led,1,1500,0),sim('simulacion_detenida',{ms_sim:1000,fallas:[led]},1,1000,1)];
 const eventos=[inicio(),start(1),...middle,start(2),sim('simulacion_detenida',{ms_sim:1000,fallas:[]},2,1000,0),fin()].map((e,i)=>({...e,t:t0+i*100}));
 const p=path.join(scratch,variante+'.jsonl');fs.writeFileSync(p,eventos.map(e=>JSON.stringify(e)).join('\n')+'\n');const lectura=analizar([p]);
 const erroresEsquema=eventos.flatMap(revisarEvento),h=lectura.historias[0];
 const control=variante.startsWith('control-');return {aprobado:!erroresEsquema.length&&(control?h.corridas[0].coherente&&!h.avisos.length:!h.corridas[0].coherente&&!h.resumen.includes('Corregidas al final: LED quemado')),erroresEsquema,eventos,lectura};
});

test('exportacion-con-pendientes-leida-como-limpia','El consumidor debe informar los eventos que el manifiesto declara fuera de la copia',()=>{
 const f=fixture();f.d.escribir(inicio({equipo:'A',sesion:'anterior'}));f.d.escribir(fin({equipo:'A',sesion:'anterior'}));
 const exp=patch('appendFileSync',(old,a,...rest)=>{if(String(a).startsWith(f.carpeta))throw Object.assign(Error('ENOSPC sintetico'),{code:'ENOSPC'});return old(a,...rest);},()=>{
  f.d.escribir(inicio({equipo:'B',sesion:'actual'}));return f.d.exportar({pin:'2468',destino:f.usb});
 });
 const manifiesto=JSON.parse(fs.readFileSync(path.join(exp.carpeta,'exportacion.json'),'utf8')),lectura=analizar([exp.carpeta]);
 f.d.reintentar();
 return {aprobado:manifiesto.pendientes>0&&lectura.cli.exit!==0,exportacion:exp,manifiesto,lectura};
});

test('frontera-UTF8-tres-bytes','El límite en unidades UTF-16 admite su tamaño UTF-8 real sin truncar',()=>{
 const f=fixture(),base=JSON.stringify(ev('codigo_compilado',{ok:true,codigo:''})).length;
 const linea=ev('codigo_compilado',{ok:true,codigo:'漢'.repeat(2097152-base)});const texto=JSON.stringify(linea),retorno=f.d.escribir(linea),salida=eventosDisco(f)[0];
 return {aprobado:retorno&&JSON.stringify(salida)===texto,largo:texto.length,bytes:Buffer.byteLength(texto),retorno};
});

const output=process.argv[2]||path.join(scratch,'resultados.json');
fs.writeFileSync(output,JSON.stringify({utc:new Date().toISOString(),script:__filename,instrumentoSHA256:crypto.createHash('sha256').update(fs.readFileSync(__filename)).digest('hex'),scratch,resultados},null,2)+'\n');
console.log(`${resultados.length} casos; ${resultados.filter(r=>!r.aprobado).length} incumplimientos de criterios diagnósticos. Evidencia: ${output}`);
process.exitCode=resultados.some(r=>!r.aprobado)?1:0;
