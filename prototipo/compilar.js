// Compila los programas de programas/<nombre>/<nombre>.ino para el Uno y deja programas/<nombre>.hex.
// Los .hex se guardan junto al código, así `npm run construir` no necesita arduino-cli.
// Usa ARDUINO_CLI, el arduino-cli del Arduino IDE 2 o el del PATH (igual que TecnoBloques).
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const IDE_CLI = path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Arduino IDE', 'resources', 'app', 'lib', 'backend', 'resources', 'arduino-cli.exe');
const CLI = process.env.ARDUINO_CLI || (fs.existsSync(IDE_CLI) ? IDE_CLI : 'arduino-cli');
const carpeta = path.join(__dirname, 'programas');

for (const nombre of fs.readdirSync(carpeta)) {
  const boceto = path.join(carpeta, nombre);
  if (!fs.statSync(boceto).isDirectory()) continue;
  const salida = path.join(boceto, 'compilado');
  execFileSync(CLI, ['compile', '--fqbn', 'arduino:avr:uno', '--output-dir', salida, boceto], {
    stdio: 'inherit',
    env: { ...process.env, ARDUINO_LOCALE: 'en' },
  });
  fs.copyFileSync(path.join(salida, `${nombre}.ino.hex`), path.join(carpeta, `${nombre}.hex`));
  fs.rmSync(salida, { recursive: true, force: true });
  console.log(`programas/${nombre}.hex listo`);
}
