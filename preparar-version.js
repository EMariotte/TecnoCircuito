// Prepara una versión de TecnoCircuito para que TecnoBloques la instale (contrato, secciones 1 y 9).
// Arma el paquete con la versión exacta del package.json, lo deja en dist/tecnocircuito.js (en la raíz) y lo revisa.
// No crea la etiqueta: eso se hace a mano, con el sí de Efraín y después de validar con la placa real.
// Uso: npm run preparar-version
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const RAIZ = __dirname;
const { version } = require('./package.json');
const etiqueta = 'v' + version;
const correr = (cmd, cwd = RAIZ) => execSync(cmd, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const problemas = [];

// 1. El árbol limpio: lo que se etiqueta debe ser exactamente lo que está en git.
const sucio = correr('git status --porcelain').split('\n').filter((l) => l.trim() && !/ dist\/tecnocircuito\.js$/.test(l));
if (sucio.length) problemas.push(`hay cambios sin commit:\n  ${sucio.join('\n  ')}`);
if (correr('git tag --list ' + etiqueta).trim()) problemas.push(`la etiqueta ${etiqueta} ya existe: sube la versión en package.json`);

// 2. Armar con la versión exacta y copiarlo a la raíz.
console.log(correr('node construir.js --etiqueta', path.join(RAIZ, 'prototipo')).trim());
fs.mkdirSync(path.join(RAIZ, 'dist'), { recursive: true });
fs.copyFileSync(path.join(RAIZ, 'prototipo', 'dist', 'tecnocircuito.js'), path.join(RAIZ, 'dist', 'tecnocircuito.js'));

// 3. Revisar lo que quedó: la versión exacta, el contrato y que funcione sin la página de prueba.
const js = fs.readFileSync(path.join(RAIZ, 'dist', 'tecnocircuito.js'), 'utf8');
if (!js.includes(JSON.stringify(version)) || js.includes(JSON.stringify(version + '-dev'))) problemas.push(`dist/tecnocircuito.js no dice la versión ${version}`);
const contrato = Number((fs.readFileSync(path.join(RAIZ, 'prototipo', 'src', 'index.js'), 'utf8').match(/CONTRATO: (\d+)/) || [])[1]);
if (!contrato || !js.includes('CONTRATO:' + contrato)) problemas.push('el paquete no trae el número de contrato de src/index.js');
const paquete = JSON.parse(correr('npm pack --dry-run --json'))[0];
const archivos = paquete.files.map((f) => f.path).sort();
if (!archivos.includes('dist/tecnocircuito.js')) problemas.push('npm pack no incluiría dist/tecnocircuito.js');
if (archivos.some((f) => f.startsWith('prototipo/') || f.startsWith('investigacion/') || f.startsWith('validacion/'))) problemas.push('npm pack incluiría archivos que no van en el paquete');

console.log(`\nTecnoCircuito ${version} · contrato ${contrato || '?'} · ${(js.length / 1024).toFixed(0)} KB · el paquete lleva: ${archivos.join(', ')}`);
if (problemas.length) {
  console.error('\nNo está listo:\n- ' + problemas.join('\n- '));
  process.exit(1);
}
console.log(`
Listo para etiquetar ${etiqueta}. Los pasos que siguen (con el sí de Efraín):
  1. npm run probar                                  (todo en verde, con cargador)
  2. git add dist/tecnocircuito.js && git commit -m "chore: ${etiqueta} con dist/tecnocircuito.js"
  3. git tag ${etiqueta} && git push && git push origin ${etiqueta}
  En TecnoBloques:
  4. en package.json, "tecnocircuito": "github:EMariotte/TecnoCircuito#${etiqueta}" y npm install
  5. npm test, npm run test:simulador y npm run test:app
  6. commit "chore: TecnoCircuito ${etiqueta}"; el instalador (npm run instalador) ya lleva el simulador.`);
