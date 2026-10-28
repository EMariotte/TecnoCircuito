// Auditoría estática reproducible; reconstruye el HTML en memoria y salidas propias.
const fs=require('fs'), path=require('path'),crypto=require('crypto'),vm=require('vm'),{execFileSync}=require('child_process');
const OUT=__dirname, TC=path.resolve(OUT,'../..'),TB=path.resolve(TC,'../TecnoBloques');
const asar=require(path.join(TB,'node_modules/@electron/asar'));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const git=(r,...args)=>execFileSync('git',['-c',`safe.directory=${r.replaceAll('\\','/')}`,...args],{cwd:r,maxBuffer:15e6});
const checks=[];
function check(ok,detail){checks.push({ok:!!ok,detail});console.log(`${ok?'OK':'FALLA'} ${detail}`);}
const base=path.join(process.env.LOCALAPPDATA,'TecnoBloques-build');
const setup=fs.readFileSync(path.join(base,'TecnoBloques-Setup-0.4.1.exe'));
check(setup.length===184818059&&hash(setup)==='f32f62f3086c656101b257d14866219791efb5cb24d55303bf0dfc6b4c3390cb','Setup: tamaño y SHA256 exactos');
const armado=path.join(base,'win-unpacked/resources/app.asar'),installed=path.join(process.env.LOCALAPPDATA,'Programs/tecnobloques/resources/app.asar');
check(hash(fs.readFileSync(armado))==='b2ba0b1b40192de9ae7ad2e21a51fa4d7901bf9079ef2c5475587c052f1d689d'&&hash(fs.readFileSync(armado))===hash(fs.readFileSync(installed)),'asar armado/instalado coincide con entrega');
const pkg=JSON.parse(asar.extractFile(armado,'package.json'));
check(pkg.version==='0.4.1'&&pkg.dependencies.tecnocircuito==='github:EMariotte/TecnoCircuito#v0.3.1','versiones y dependencia fija del candidato');
const oldhtml=asar.extractFile(armado,'dist/TecnoBloques.html').toString();
const bundle=git(TC,'show','v0.3.1:dist/tecnocircuito.js').toString();
check(oldhtml.includes(bundle.replace(/<\/script/gi,'<\\/script')),'bundle de v0.3.1 íntegro en HTML candidato');
fs.writeFileSync(path.join(OUT,'candidato.html'),oldhtml);
for(const f of ['escritorio/main.js','escritorio/preload.js','escritorio/arduino.js','escritorio/registro-disco.js','src/registro.js','LICENSE','NOTICE']){
  check(hash(asar.extractFile(armado,f))===hash(git(TB,'show',`c7252b8:${f}`)),`${f} del asar coincide con c7252b8`);
}
const sourcePkg=JSON.parse(git(TB,'show','c7252b8:package.json'));
check(JSON.stringify(pkg)===JSON.stringify(Object.fromEntries(Object.entries(sourcePkg).filter(([k])=>!['scripts','devDependencies','build'].includes(k)))),'package.json: solo se omiten scripts, devDependencies y build al empaquetar');
for(const f of ['arduino/arduino-cli.exe','drivers/CH341SER.EXE'])check(fs.existsSync(path.join(base,'win-unpacked/resources',f)),`recurso ${f}`);
const current=fs.readFileSync(path.join(TB,'dist/TecnoBloques.html'));
let generated={},writes=[];
const proxy=Object.create(fs);
proxy.mkdirSync=(dir,opts)=>{if(path.resolve(dir)!==path.join(TB,'dist'))throw Error('mkdir fuera del build');};
proxy.writeFileSync=(f,b)=>{if(!['TecnoBloques.html','artefacto.html'].includes(path.basename(f)))throw Error('write inesperado');generated[path.basename(f)]=Buffer.from(b);writes.push(f);};
function build(code){generated={};writes=[];vm.runInNewContext(code,{__dirname:TB,require:n=>n==='fs'?proxy:n==='path'?path:require(require.resolve(n,{paths:[TB]})),process:{argv:['node','build.js']},console:{log(){},error:console.error},Buffer},{filename:'build-en-memoria.js'});return {...generated};}
const code=fs.readFileSync(path.join(TB,'build.js'),'utf8');const result=build(code);
fs.writeFileSync(path.join(OUT,'build-local.html'),result['TecnoBloques.html']);
check(hash(result['TecnoBloques.html'])===hash(current),'build actual aislado reproduce byte por byte el HTML entregado');
check(!/fonts\.(googleapis|gstatic)\.com/.test(current.toString()),'HTML local sin Google Fonts');
check(/fonts.googleapis.com/.test(result['artefacto.html'].toString()),'artefacto web conserva Google Fonts permitido');
const before=build(git(TB,'show','60f73ea^:build.js').toString());
fs.writeFileSync(path.join(OUT,'fuentes-anteriores.html'),before['TecnoBloques.html']);
check(before['TecnoBloques.html'].toString().includes('https://fonts.googleapis.com/css2'),'control: build previo conserva solicitud externa');
// La única diferencia entre ambos build, usando las mismas demás fuentes, es la inserción de fuentes.
const removeFonts=s=>s.replace(/<link rel="preconnect"[^\n]*display=swap">/,'FONTS').replace(/<style>@font-face\{[^\n]+<\/style>/,'FONTS');
check(removeFonts(before['TecnoBloques.html'].toString())===removeFonts(current.toString()),'regresión: solo cambia el bloque de fuentes del HTML local');
const expected=[['Atkinson Hyperlegible',400,'atkinson-hyperlegible-400'],['Atkinson Hyperlegible',700,'atkinson-hyperlegible-700'],['JetBrains Mono',400,'jetbrains-mono-400'],['JetBrains Mono',600,'jetbrains-mono-600']];
for(const [family,weight,file] of expected){const b64=fs.readFileSync(path.join(TB,'fuentes',file+'.woff2')).toString('base64');check(current.toString().includes(`font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;src:url(data:font/woff2;base64,${b64}) format('woff2')`),`${family} ${weight} incrustada exacta`);}
const actualPkg=JSON.parse(fs.readFileSync(path.join(TB,'package.json')));const notice=fs.readFileSync(path.join(TB,'NOTICE'),'utf8');
for(const file of ['OFL-atkinson-hyperlegible.txt','OFL-jetbrains-mono.txt']){const text=fs.readFileSync(path.join(TB,'fuentes',file),'utf8');check(text.includes('SIL OPEN FONT LICENSE Version 1.1')&&text.includes('PREAMBLE')&&text.includes('TERMINATION')&&text.includes('DISCLAIMER'),`${file}: texto OFL completo y configurado en instalador`);check(actualPkg.build.files.includes('fuentes/'+file),`${file}: inclusión explícita build.files`);}
check(notice.includes('Atkinson Hyperlegible')&&notice.includes('JetBrains Mono')&&notice.includes('OFL'),'NOTICE de las dos fuentes');
const e7=path.join(TC,'validacion/Portatil_1/E7-registro');const manifest=JSON.parse(fs.readFileSync(path.join(e7,'exportacion.json')));const entry=manifest.archivos[0],reg=fs.readFileSync(path.join(e7,entry.archivo));
check(manifest.completa===true&&manifest.pendientes===0&&manifest.total===1&&reg.length===entry.bytes&&hash(reg)===entry.sha256,'E7: integridad de exportación completa');
const rows=reg.toString().trim().split(/\r?\n/).map(l=>JSON.parse(l));
check(rows.length===62,'E7: 62 eventos JSON válidos');
const resultOut={fecha:new Date().toISOString(),checks,shaHTML:hash(current),shaSetup:hash(setup),shaAsar:hash(fs.readFileSync(armado)),recursos:fs.readdirSync(path.join(base,'win-unpacked/resources')),eventos:rows.length};
fs.writeFileSync(path.join(OUT,'inspeccion.json'),JSON.stringify(resultOut,null,2)+'\n');
if(checks.some(c=>!c.ok))process.exitCode=1;
