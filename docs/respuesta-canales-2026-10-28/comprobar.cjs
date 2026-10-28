// Comprobación documental de las entregas; no ejecuta ni cambia el producto.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {execFileSync} = require('child_process');
const root = path.resolve(__dirname, '../..');
const asar = require(path.join(root, '../TecnoBloques/node_modules/@electron/asar'));
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const base = path.join(process.env.LOCALAPPDATA, 'TecnoBloques-build');
const setup = fs.readFileSync(path.join(base, 'TecnoBloques-Setup-0.4.1.exe'));
const armado = path.join(base, 'win-unpacked/resources/app.asar');
const instalado = path.join(process.env.LOCALAPPDATA, 'Programs/tecnobloques/resources/app.asar');
const pkg = JSON.parse(asar.extractFile(armado, 'package.json'));
const html = asar.extractFile(armado, 'dist/TecnoBloques.html').toString();
const bundle = execFileSync('git', ['show', 'v0.3.1:dist/tecnocircuito.js'], {cwd:root, maxBuffer:10*1024*1024});
const dir = path.join(root, 'validacion/Portatil_1/E7-registro');
const out = {
  setup: {bytes:setup.length, sha256:hash(setup)},
  asar: {armado:hash(fs.readFileSync(armado)), instalado:hash(fs.readFileSync(instalado))},
  version:pkg.version, dependencia:pkg.dependencies.tecnocircuito,
  bundleTC: {sha256:hash(bundle), incluido:html.includes(bundle.toString().replace(/<\/script/gi, '<\\/script'))},
  googleFontsEnCandidato:html.includes('fonts.googleapis.com'),
  manifiesto:JSON.parse(fs.readFileSync(path.join(dir,'exportacion.json'))),
  registro:fs.readdirSync(dir).filter(f=>f.endsWith('.jsonl')).map(f=>({archivo:f, sha256:hash(fs.readFileSync(path.join(dir,f)))})),
};
fs.writeFileSync(path.join(__dirname,'comprobacion.json'),JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify(out,null,2));
