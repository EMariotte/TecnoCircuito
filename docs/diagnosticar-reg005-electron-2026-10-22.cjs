// SPDX-License-Identifier: Apache-2.0
// App real con datos sintéticos; IPC de compilación/subida sustituido únicamente en este proceso de prueba.
'use strict';
const fs=require('fs'),path=require('path'),os=require('os'),{createRequire}=require('module');
const root=path.resolve(__dirname,'..'),tb=path.resolve(root,'../TecnoBloques'),req=createRequire(path.join(tb,'package.json'));
const {_electron:electron}=req('playwright-core');
const {crearRegistroDisco}=req('./escritorio/registro-disco.js');
const carpeta=fs.mkdtempSync(path.join(os.tmpdir(),'reg005-codex-'));
const d=crearRegistroDisco({carpeta});
d.instructor({accion:'crear-pin',pin:'2468'});d.instructor({accion:'activar',pin:'2468',activo:true});
const results=[],errores=[];
const leer=()=>fs.readdirSync(path.join(carpeta,'registros')).flatMap(f=>fs.readFileSync(path.join(carpeta,'registros',f),'utf8').trim().split('\n').filter(Boolean).map(JSON.parse));
const record=(id,expected,observed,ok)=>{results.push({id,expected,observed,ok});console.log((ok?'OK ':'FALLA ')+id);};
(async()=>{
 const app=await electron.launch({args:[tb,`--user-data-dir=${carpeta}`],cwd:tb,env:{...Object.fromEntries(Object.entries(process.env).filter(([k])=>k!=='ELECTRON_RUN_AS_NODE')),TB_HERRAMIENTAS:'instructor'}});
 try{
  const win=await app.firstWindow();await win.waitForLoadState('load');
  win.on('pageerror',e=>errores.push(String(e)));win.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errores.push(m.text());});
  await win.waitForSelector('#codigoEquipo');await win.locator('#codigoEquipo').fill('AUDITORIA');await win.locator('#codigoEquipo').press('Enter');
  await win.locator('#modalAcciones .primario').click();await win.waitForFunction(()=>registroEventos.activo());
  await app.evaluate(({ipcMain})=>{
   globalThis._auditSubidas=[];
   ipcMain.removeHandler('tb:subir');ipcMain.handle('tb:subir',(_e,datos)=>{globalThis._auditSubidas.push(datos);return {ok:false,etapa:'subir',salida:'Puerto sintético',memoria:{}};});
  });
  const controlDesde=leer().length;
  await win.evaluate(async()=>{
   ponerPlaca('uno');refrescarPines();abrirLienzo();serial.conectado=false;
   $('puerto').append(el('option',{value:'COM_CONTROL'},'Sintético'));$('puerto').value='COM_CONTROL';await subirPlaca(true);cerrarModal(false);
  });
  await win.waitForTimeout(100);
  const controlSubida=leer().slice(controlDesde).find(e=>e.tipo==='programa_subido');
  record('control-subida-sin-espera','Sin cambio durante espera, la placa registrada es la solicitada',controlSubida,controlSubida?.datos.placa==='uno');
  await app.evaluate(()=>{globalThis._auditSubidas=[];});
  const inicio=leer().length;
  await win.evaluate(()=>{
   ponerPlaca('uno');refrescarPines();abrirLienzo();
   $('puerto').append(el('option',{value:'COM_AUDITORIA'},'Sintético'));$('puerto').value='COM_AUDITORIA';
   window._auditDesconectarOriginal=desconectarSerial;
   window.desconectarSerial=()=>new Promise(r=>{window._auditSoltarSerial=r;});
   serial.conectado=true;window._auditSubida=subirPlaca(true);
  });
  await win.waitForFunction(()=>typeof window._auditSoltarSerial==='function');
  await win.evaluate(()=>{const s=$('placa');s.value='nano';s.dispatchEvent(new Event('change'));serial.conectado=false;window._auditSoltarSerial();});
  await win.evaluate(()=>window._auditSubida);await win.waitForTimeout(200);
  const peticiones=await app.evaluate(()=>globalThis._auditSubidas),eventos=leer().slice(inicio);
  const subido=eventos.find(e=>e.tipo==='programa_subido');
  record('R03-placa-subida-tras-espera','La placa registrada coincide con el FQBN realmente enviado', {peticiones,eventos},subido?.datos.placa==='nano'&&peticiones[0]?.fqbn.includes('nano'));
  await win.evaluate(()=>{window.desconectarSerial=window._auditDesconectarOriginal;serial.conectado=false;cerrarModal(false);});

  // Un callback de confirmarEquipo pendiente y un apagado esperan al mismo cierre.
  const antes=leer().length;
  await win.evaluate(()=>{
   window._auditDetenerOriginal=detenerSimulacion;
   window._auditPromesaCierre=new Promise(r=>window._auditSoltarCierre=r);
   window.detenerSimulacion=()=>window._auditPromesaCierre;
   panelInstructor('2468',{activo:true,archivos:1,falla:null,descartados:null});[...$('modalAcciones').querySelectorAll('button')].find(b=>b.textContent==='Apagar el registro').click();
  });
  await win.evaluate(()=>{confirmarEquipo('AUDITORIA_B');document.querySelector('#modalAcciones .primario').click();window._auditSoltarCierre();});
  await win.waitForFunction(()=>!registroEncendido);await win.evaluate(()=>cambioDeEquipo);await win.waitForTimeout(200);
  const estadoApagado=await win.evaluate(()=>({activo:registroEncendido,equipo:registroEventos.equipo(),sesion:registroEventos.sesion(),aviso:$('avisoRegistro').textContent}));
  record('R04-apagado-con-cambio-pendiente','Registro apagado deja al editor sin equipo y ningún equipo nuevo con solo sesion_terminada',{estado:estadoApagado,eventos:leer().slice(antes)},estadoApagado.equipo===null);
  await win.evaluate(()=>{window.detenerSimulacion=window._auditDetenerOriginal;});
  await win.evaluate(async()=>{
   const r=await escritorio.registro.instructor({accion:'activar',pin:'2468',activo:true});registroEncendido=r.activo;
   confirmarEquipo('AUDITORIA_B');document.querySelector('#modalAcciones .primario').click();await cambioDeEquipo;
   registrarEditor('codigo_compilado',{ok:true,codigo:'void setup(){}\nvoid loop(){}',error:null,bytes:1});
  });
  await win.waitForTimeout(100);
  results.at(-1).observed.trasReencender=leer().slice(antes);

  // Dos proyectos seguidos: el temporizador de texto del primero no pertenece al segundo.
  const carga=await win.evaluate(async()=>{
   const p=texto=>({app:'TecnoBloques',placa:'uno',nivel:3,nombre:texto?'A':'B',texto,bloques:{blocks:{languageVersion:0,blocks:[]}}});
   const a=cargarProyecto(p('void setup(){int SOLO_A=1;}\nvoid loop(){}'),true);
   const b=cargarProyecto(p(null),true);
   await new Promise(r=>setTimeout(r,300));
   return {a,b,nombre:$('nombreProyecto').value,texto:!!estado.texto,codigo:codigoActual(),proyecto:proyectoActual()};
  });
  record('R05-texto-del-proyecto-anterior','El proyecto B sin texto no hereda el C++ de A',carga,carga.nombre==='B'&&!carga.texto&&!carga.codigo.includes('SOLO_A'));
  const rollback=await win.evaluate(async()=>{
   entrarModoTexto('void setup(){int CONSERVAR=42;}\nvoid loop(){}','');
   const antes=proyectoActual();
   const resultado=cargarProyecto({app:'TecnoBloques',placa:'nano',nivel:1,bloques:{blocks:{languageVersion:0,blocks:[{type:'AUDITORIA_INEXISTENTE',x:0,y:0}]}}},true);
   await new Promise(r=>setTimeout(r,350));
   return {antes,resultado,despues:proyectoActual(),codigo:codigoActual(),texto:!!estado.texto};
  });
  record('R07-rollback-pierde-texto','Si abrir falla se conserva el proyecto completo, incluido el C++ editado',rollback,rollback.texto&&rollback.codigo.includes('CONSERVAR'));
  await win.screenshot({path:path.join(root,'docs/reg005-auditoria-2026-10-22/diagnostico-proyecto.png')});
 }finally{await app.close();}
 fs.writeFileSync(path.join(root,'docs/reg005-auditoria-2026-10-22/diagnostico-electron.json'),JSON.stringify({utc:new Date().toISOString(),carpeta,results,errores},null,2));
 console.log('Errores JS:',JSON.stringify(errores));process.exitCode=results.some(r=>!r.ok)||errores.length?1:0;
})().catch(e=>{fs.writeFileSync(path.join(root,'docs/reg005-auditoria-2026-10-22/diagnostico-electron.json'),JSON.stringify({carpeta,results,errores,errorInstrumento:e.stack},null,2));console.error(e.stack);process.exitCode=2;});
