// Mide, con Node y sin navegador, qué tan rápido corre el chip simulado frente al real.
// Uso: node pruebas/medir_chip.js   (primero arma pruebas/chip.cjs con esbuild; ver package.json)
const fs = require('fs');
const path = require('path');
const { crearChip, FRECUENCIA, PinState } = require('./chip.cjs');

const SEGUNDOS = 10;
for (const nombre of ['parpadeo13', 'parpadeo8']) {
  const chip = crearChip(fs.readFileSync(path.join(__dirname, '..', 'programas', nombre + '.hex'), 'utf8'));
  const cambios = [];
  let serial = '';
  chip.alCambiarPines((c) => {
    for (const [pin, estado] of Object.entries(c)) cambios.push([pin, estado, (chip.ciclos / FRECUENCIA) * 1000]);
  });
  chip.alByteSerial((b) => (serial += String.fromCharCode(b)));
  const inicio = process.hrtime.bigint();
  chip.correr(SEGUNDOS * FRECUENCIA);
  const ms = Number(process.hrtime.bigint() - inicio) / 1e6;
  const altos = cambios.filter(([pin, e]) => pin === (nombre === 'parpadeo13' ? 'D13' : 'D8') && e === PinState.High).map(([, , t]) => t);
  const periodos = altos.slice(1).map((t, i) => t - altos[i]);
  const periodo = periodos.reduce((s, x) => s + x, 0) / periodos.length;
  console.log(
    `${nombre}: ${SEGUNDOS} s simulados en ${(ms / 1000).toFixed(2)} s reales → ${((SEGUNDOS * 1000) / ms).toFixed(1)}× más rápido que el chip real\n` +
      `  período medido: ${periodo.toFixed(3)} ms (${altos.length} pulsos) · serial: ${JSON.stringify(serial.slice(0, 40))}…`,
  );
}
