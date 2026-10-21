// SPDX-License-Identifier: Apache-2.0
// Casos originales de F06, con el criterio A-05 documentado por Claude en CLA-006/007.
// La evidencia de octubre anterior se conserva; no cambia el producto ni el diagnóstico histórico.
'use strict';
const fs=require('fs'),path=require('path'),os=require('os'),{createRequire}=require('module');
const root=path.resolve(__dirname,'..'),tb=path.resolve(root,'../TecnoBloques');
const req=createRequire(path.join(tb,'package.json')),{_electron:electron}=req('playwright-core');
const {crearRegistroDisco}=req('./escritorio/registro-disco.js');
const carpeta=fs.mkdtempSync(path.join(os.tmpdir(),'cla007-electron-'));
const disco=crearRegistroDisco({carpeta});
if(!disco.instructor({accion:'crear-pin',pin:'2468'}).ok||!disco.instructor({accion:'activar',pin:'2468',activo:true}).ok)throw Error('Fixture');
const resultados=[],errores=[];
(async()=>{
 const env={...Object.fromEntries(Object.entries(process.env).filter(([k])=>k!=='ELECTRON_RUN_AS_NODE')),TB_HERRAMIENTAS:'instructor'};
 const app=await electron.launch({args:[tb,`--user-data-dir=${carpeta}`],cwd:tb,env});
 try{
  const win=await app.firstWindow();await win.waitForLoadState('load');
  win.on('pageerror',e=>errores.push(String(e)));win.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errores.push(m.text());});
  await win.waitForSelector('#codigoEquipo');await win.locator('#codigoEquipo').fill('SINTETICO');await win.locator('#codigoEquipo').press('Enter');
  await win.locator('#modalAcciones button',{hasText:'Sí, somos ese equipo'}).click();await win.waitForFunction(()=>registroEventos.activo());
  const descartar=()=>win.evaluate(()=>registroEventos.editor('codigo_compilado',{ok:true,error:null,bytes:1,codigo:'x'.repeat(2*1024*1024)}));
  const panel=async()=>{await win.keyboard.press('Control+Alt+Shift+KeyR');await win.locator('#pinInstructor').fill('2468');await win.locator('#modalAcciones button',{hasText:'Entrar'}).click();await win.waitForSelector('#descartadosRegistro',{state:'attached'});};
  await descartar();await win.waitForFunction(()=>registroDescartados?.cantidad===1);await panel();
  const antes=await win.locator('#descartadosRegistro').textContent();
  await descartar();await win.waitForFunction(()=>registroDescartados?.cantidad===2);
  const durante=await win.evaluate(()=>({cantidad:registroDescartados.cantidad,panel:$('descartadosRegistro').textContent,esquina:$('avisoRegistro').textContent,visible:!$('avisoRegistro').hidden}));
  resultados.push({caso:'F06-panel-abierto-en-vivo',aprobado:/^2 eventos/.test(durante.panel)&&durante.esquina.includes('Equipo SINTETICO')&&durante.esquina.includes('2 eventos'),antes,durante});
  await win.screenshot({path:path.join(carpeta,'panel-en-vivo.png')});
  await win.locator('#modalAcciones button',{hasText:'Apagar el registro'}).click();await win.waitForFunction(()=>!registroEncendido);
  const apagado=await win.evaluate(()=>({cantidad:registroDescartados.cantidad,visible:!$('avisoRegistro').hidden,activo:registroEncendido}));
  await panel();const panelApagado=await win.locator('#descartadosRegistro').textContent();
  resultados.push({caso:'F06-A05-apagado-conserva-total-instructor',aprobado:!apagado.visible&&apagado.cantidad===2&&/^2 eventos/.test(panelApagado),apagado,panelApagado});
  await win.screenshot({path:path.join(carpeta,'panel-apagado.png')});
  await win.locator('#modalAcciones button',{hasText:'Encender el registro'}).click();await win.waitForSelector('#codigoEquipo');
  await win.locator('#codigoEquipo').fill('OTRO');await win.locator('#codigoEquipo').press('Enter');await win.locator('#modalAcciones button',{hasText:'Sí, somos ese equipo'}).click();
  await win.waitForFunction(()=>registroEventos.equipo()==='OTRO');
  const nuevo=await win.evaluate(()=>({total:registroDescartados.cantidad,texto:$('avisoRegistro').textContent,clase:$('avisoRegistro').className}));
  resultados.push({caso:'F06-A05-otro-equipo-no-hereda-aviso',aprobado:nuevo.total===2&&nuevo.texto==='Esta sesión se registra · Equipo OTRO'&&!nuevo.clase.includes('falla'),nuevo});
  await panel();const totalOtro=await win.locator('#descartadosRegistro').textContent();
  resultados.push({caso:'F06-A05-total-persiste-con-otro-equipo',aprobado:/^2 eventos/.test(totalOtro),totalOtro});
 }finally{await app.close();}
 const output=process.argv[2]||path.join(carpeta,'resultado.json');fs.writeFileSync(output,JSON.stringify({utc:new Date().toISOString(),carpeta,resultados,errores},null,2)+'\n');
 for(const r of resultados)console.log((r.aprobado?'OK ':'FALLA ')+r.caso);
 console.log('Consola: '+JSON.stringify(errores));console.log('Evidencia: '+output);process.exitCode=resultados.some(r=>!r.aprobado)||errores.length?1:0;
})().catch(e=>{console.error(e.stack);process.exitCode=2;});
