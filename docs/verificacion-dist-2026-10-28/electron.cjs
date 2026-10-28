const path=require('path'),fs=require('fs'),os=require('os'),{pathToFileURL}=require('url');
const TB=path.resolve(__dirname,'../../../TecnoBloques');
const { _electron:electron }=require(path.join(TB,'node_modules/playwright-core'));
const executablePath=require(path.join(TB,'node_modules/electron'));
const env=Object.fromEntries(Object.entries(process.env).filter(([k])=>k!=='ELECTRON_RUN_AS_NODE'));
const checks=[],results=[];
function check(ok,label){checks.push({ok:!!ok,label});console.log(`${ok?'OK':'FALLA'} ${label}`);}
async function run(label,file){
  const userData=fs.mkdtempSync(path.join(os.tmpdir(),'codex-dist-fonts-'));
  let app;
  try{
    app=await electron.launch({executablePath,args:[path.join(__dirname,'electron-main.cjs'),`--user-data-dir=${userData}`],env,timeout:30000});
    const pg=await app.firstWindow();pg.setDefaultTimeout(15000);await app.context().setOffline(true);
    const blocked=await pg.evaluate(async()=>{try{await fetch('https://codex-offline-control.invalid/probe');return false;}catch{return true;}});
    check(blocked,`${label}: HTTP(S) inaccesible antes de cargar HTML (control de red)`);
    await app.evaluate(()=>{globalThis.auditRequests=[];});
    const errors=[],outside=[];pg.on('pageerror',e=>errors.push(e.message));pg.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    pg.on('request',r=>{if(/^https?:/.test(r.url()))outside.push(r.url());});
    await pg.goto(pathToFileURL(file).href);await pg.waitForFunction(()=>typeof Blockly!=='undefined'&&typeof espacio!=='undefined');
    const fonts=await pg.evaluate(async()=>{
      const spec=[['Atkinson Hyperlegible',400],['Atkinson Hyperlegible',700],['JetBrains Mono',400],['JetBrains Mono',600]];
      const loaded=[];
      for(const [family,weight] of spec){const f=await document.fonts.load(`${weight} 20px "${family}"`,'áéíóúñÁÉÍÓÚÑ¿¡');loaded.push({family,weight,faces:f.map(k=>({family:k.family,weight:k.weight,status:k.status}))});}
      await document.fonts.ready;
      const panel=document.createElement('div');panel.id='audit-fonts';panel.style='position:fixed;inset:80px 100px auto;background:white;color:black;padding:20px;z-index:100000';
      for(let i=0;i<spec.length;i++){const [family,weight]=spec[i],span=document.createElement('div');span.id='audit-f'+i;span.style=`font: ${weight} 20px "${family}"`;span.textContent='áéíóúñÁÉÍÓÚÑ¿¡ 0123 '+family+' '+weight;panel.append(span);}
      document.body.append(panel);
      return {loaded,body:getComputedStyle(document.body).fontFamily,faces:[...document.fonts].map(f=>({family:f.family,weight:f.weight,status:f.status})),online:navigator.onLine};
    });
    await pg.screenshot({path:path.join(__dirname,`electron-${label}.png`),timeout:15000});
    const cdp=await app.context().newCDPSession(pg);await cdp.send('DOM.enable');await cdp.send('CSS.enable');
    const {root}=await cdp.send('DOM.getDocument');const platform=[];
    for(let i=0;i<4;i++){const {nodeId}=await cdp.send('DOM.querySelector',{nodeId:root.nodeId,selector:'#audit-f'+i});platform.push((await cdp.send('CSS.getPlatformFontsForNode',{nodeId})).fonts);}
    const network=await app.evaluate(()=>globalThis.auditRequests);
    results.push({label,file,fonts,platform,errors,outside,network});
    if(label==='corregido'){
      check(outside.length===0&&network.length===0,'corregido: cero solicitudes HTTP(S)');
      check(errors.length===0,'corregido: cero errores JS/consola');
      check(fonts.loaded.every(f=>f.faces.length===1&&f.faces[0].status==='loaded'&&+f.faces[0].weight===f.weight),'corregido: cuatro familias/pesos resueltos desde FontFace');
      const ps=['AtkinsonHyperlegible-Regular','AtkinsonHyperlegible-Bold','JetBrainsMono-Regular','JetBrainsMono-SemiBold'];
      check(platform.every((ff,i)=>ff.length===1&&ff[0].isCustomFont&&ff[0].postScriptName===ps[i]&&ff[0].glyphCount>0),'corregido: CDP acredita cuatro fuentes reales sin fallback para español');
      check(fonts.body.includes('Atkinson Hyperlegible'),'corregido: Atkinson aplicada al body');
    }else{
      check(outside.some(u=>u.includes('fonts.googleapis.com')),'control previo: solicitud a Google reproducida');
      check(fonts.loaded.every(f=>f.faces.length===0),'control previo: ninguna de las cuatro fuentes incrustada');
    }
  }finally{if(app)await app.close();}
}
(async()=>{await run('anterior',path.join(__dirname,'fuentes-anteriores.html'));await run('corregido',path.join(__dirname,'fuentes-locales.html'));fs.writeFileSync(path.join(__dirname,'electron.json'),JSON.stringify({checks,results},null,2)+'\n');if(checks.some(c=>!c.ok))process.exitCode=1;})().catch(e=>{console.error(e);process.exitCode=1;});
