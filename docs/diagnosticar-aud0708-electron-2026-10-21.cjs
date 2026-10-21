// SPDX-License-Identifier: Apache-2.0
// Diagnóstico de avisos, con Electron y datos sintéticos propios. No modifica producto.
'use strict';
const fs=require('fs'),path=require('path'),os=require('os'),{createRequire}=require('module');
const root=path.resolve(__dirname,'..'),tb=path.resolve(root,'../TecnoBloques');
const req=createRequire(path.join(tb,'package.json')),{_electron:electron}=req('playwright-core');
const {crearRegistroDisco}=req('./escritorio/registro-disco.js');
const carpeta=fs.mkdtempSync(path.join(os.tmpdir(),'aud0708-electron-'));
const disco=crearRegistroDisco({carpeta});
if(!disco.instructor({accion:'crear-pin',pin:'2468'}).ok||!disco.instructor({accion:'activar',pin:'2468',activo:true}).ok)throw Error('No se activó fixture');
const resultados=[],errores=[];
(async()=>{
 const env={...Object.fromEntries(Object.entries(process.env).filter(([k])=>k!=='ELECTRON_RUN_AS_NODE')),TB_HERRAMIENTAS:'instructor'};
 const app=await electron.launch({args:[tb,`--user-data-dir=${carpeta}`],cwd:tb,env});
 try{
  const win=await app.firstWindow();await win.waitForLoadState('load');
  win.on('pageerror',e=>errores.push(String(e)));win.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errores.push(m.text());});
  await win.waitForSelector('#codigoEquipo');await win.locator('#codigoEquipo').fill('SINTETICO');await win.locator('#codigoEquipo').press('Enter');
  await win.locator('#modalAcciones button',{hasText:'Sí, somos ese equipo'}).click();
  await win.waitForFunction(()=>registroEventos.activo());
  const descartar=()=>win.evaluate(()=>registroEventos.editor('codigo_compilado',{ok:true,error:null,bytes:1,codigo:'x'.repeat(2*1024*1024)}));
  await descartar();await win.waitForFunction(()=>registroDescartados?.cantidad===1);
  await win.keyboard.press('Control+Alt+Shift+KeyR');await win.locator('#pinInstructor').fill('2468');await win.locator('#modalAcciones button',{hasText:'Entrar'}).click();
  await win.waitForSelector('#descartadosRegistro',{state:'attached'});
  const antes=await win.locator('#descartadosRegistro').textContent();
  await descartar();await win.waitForFunction(()=>registroDescartados?.cantidad===2);
  const durante=await win.evaluate(()=>({cantidad:registroDescartados.cantidad,panel:$('descartadosRegistro').textContent,esquina:$('avisoRegistro').textContent,visible:!$('avisoRegistro').hidden}));
  resultados.push({caso:'panel-abierto-no-se-actualiza',aprobado:/^2 eventos/.test(durante.panel),antes,durante});
  await win.screenshot({path:path.join(carpeta,'panel-abierto.png')});
  await win.locator('#modalAcciones button',{hasText:'Apagar el registro'}).click();
  await win.waitForFunction(()=>!registroEncendido);
  const apagado=await win.evaluate(()=>({cantidad:registroDescartados.cantidad,visible:!$('avisoRegistro').hidden,texto:$('avisoRegistro').textContent,activo:registroEncendido}));
  resultados.push({caso:'aviso-se-oculta-antes-de-cerrar-app',aprobado:apagado.visible&&apagado.cantidad===2,apagado});
  await win.screenshot({path:path.join(carpeta,'aviso-tras-apagar.png')});
 }finally{await app.close();}
 const out=process.argv[2]||path.join(carpeta,'resultado.json');
 fs.writeFileSync(out,JSON.stringify({utc:new Date().toISOString(),carpeta,resultados,errores},null,2)+'\n');
 for(const r of resultados)console.log((r.aprobado?'OK ':'FALLA ')+r.caso+' '+JSON.stringify(r));
 console.log('Consola:',JSON.stringify(errores));console.log('Evidencia:',out);
 process.exitCode=resultados.some(r=>!r.aprobado)||errores.length?1:0;
})().catch(e=>{console.error(e.stack);process.exitCode=2;});
