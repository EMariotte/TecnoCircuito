// Arma el paquete y la página de prueba:
//   dist/tecnocircuito.js  IIFE que define window.TecnoCircuito, con los dibujos dentro
//   dist/prototipo.html    un solo archivo que funciona sin internet (doble clic para abrirlo)
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const aqui = (f) => path.join(__dirname, f);
const esc = (s) => s.replace(/<\/script/gi, '<\\/script'); // igual que build.js de TecnoBloques

// 1. El Web Worker (chip + circuito) se arma aparte y entra al paquete como texto: así el paquete sigue
//    siendo un solo archivo y el Worker se crea desde un Blob, sin pedir otro archivo al servidor.
const trabajador = esbuild.buildSync({
  entryPoints: [aqui('src/trabajador.js')],
  bundle: true,
  format: 'iife',
  minify: true,
  write: false,
  target: ['chrome120'],
  legalComments: 'eof', // conserva el aviso de licencia de avr8js (MIT) dentro del Worker
}).outputFiles[0].text;

// 2. El paquete: lienzo, simulador (lado de la página) y el Worker embebido.
const { outputFiles } = esbuild.buildSync({
  define: { __CODIGO_TRABAJADOR__: JSON.stringify(trabajador) },
  entryPoints: [aqui('src/index.js')],
  bundle: true,
  format: 'iife',
  minify: true,
  write: false,
  target: ['chrome120'],
  loader: { '.css': 'text' },
  legalComments: 'eof', // conserva los avisos de licencia de Lit y de los dibujos
});
const js = outputFiles[0].text;
// Los «<!--» de los dibujos SVG no molestan. Junto con un «<script» sí: el HTML no cerraría bien el script.
if (js.includes('<!--') && /<script/i.test(js)) {
  console.error('El paquete tiene «<!--» y «<script»: no se puede embeber tal cual en el HTML.');
  process.exit(1);
}

fs.mkdirSync(aqui('dist'), { recursive: true });
fs.writeFileSync(aqui('dist/tecnocircuito.js'), js);
// Los .hex de programas/ van dentro de la página: en el prototipo no hay TecnoBloques que los entregue.
const programas = {};
for (const f of fs.readdirSync(aqui('programas'))) {
  if (f.endsWith('.hex')) programas[f.slice(0, -4)] = fs.readFileSync(aqui('programas/' + f), 'utf8');
}
const html = fs
  .readFileSync(aqui('pagina.html'), 'utf8')
  .replace('<!--PAQUETE-->', () => `<script>${esc(js)}</script>`)
  .replace('<!--PROGRAMAS-->', () => `<script>window.PROGRAMAS = ${esc(JSON.stringify(programas))};</script>`);
fs.writeFileSync(aqui('dist/prototipo.html'), html);
console.log(`dist/tecnocircuito.js ${(js.length / 1024).toFixed(0)} KB (Worker: ${(trabajador.length / 1024).toFixed(0)} KB) · dist/prototipo.html listo`);
