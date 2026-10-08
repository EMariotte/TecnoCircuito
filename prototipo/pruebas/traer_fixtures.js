// Copia las fixtures de TecnoBloques (contrato, sección 9): cada <caso>.tbq.json y su <caso>.hex, desde
// ../TecnoBloques/test/salida/<caso>/ a pruebas/fixtures/<caso>/. Se commitean: así las pruebas corren sin
// la carpeta hermana. En TecnoBloques se generan con `npm test` (los .tbq.json) y `npm run compilar` (los .hex).
// Uso: npm run fixtures
const fs = require('fs');
const path = require('path');

const ORIGEN = path.join(__dirname, '..', '..', '..', 'TecnoBloques', 'test', 'salida');
const DESTINO = path.join(__dirname, 'fixtures');

if (!fs.existsSync(ORIGEN)) {
  console.log(`No está ${ORIGEN}.\nLas fixtures se traen desde TecnoBloques: clónalo al lado de TecnoCircuito y corre allá npm test y npm run compilar.`);
  process.exit(1);
}
const casos = fs
  .readdirSync(ORIGEN, { withFileTypes: true })
  .filter((d) => d.isDirectory() && fs.existsSync(path.join(ORIGEN, d.name, d.name + '.tbq.json')))
  .map((d) => d.name)
  .sort();
fs.rmSync(DESTINO, { recursive: true, force: true }); // un caso que TecnoBloques ya no genera tampoco queda aquí
let conHex = 0;
for (const caso of casos) {
  fs.mkdirSync(path.join(DESTINO, caso), { recursive: true });
  for (const ext of ['.tbq.json', '.hex']) {
    const de = path.join(ORIGEN, caso, caso + ext);
    if (!fs.existsSync(de)) continue;
    fs.copyFileSync(de, path.join(DESTINO, caso, caso + ext));
    if (ext === '.hex') conHex++;
  }
}
let creadoCon = '?';
try {
  creadoCon = JSON.parse(fs.readFileSync(path.join(DESTINO, casos[0], casos[0] + '.tbq.json'), 'utf8')).creadoCon;
} catch {}
console.log(`${casos.length} casos de TecnoBloques ${creadoCon} (${conHex} con .hex) en pruebas/fixtures/: ${casos.join(', ')}`);
