// Prueba el núcleo del prototipo 3 con Node, sin navegador: promedio del PWM, potenciómetro leído con
// analogRead(), LED quemado por el pico del PWM y cuánto tarda el chip con PWM.
// Uso: npm run probar:nucleo   (arma pruebas/nucleo.cjs con esbuild y corre este archivo)
const fs = require('fs');
const path = require('path');
const { crearNucleo, FRECUENCIA } = require('./nucleo.cjs');

let fallos = 0;
function revisar(condicion, texto) {
  console.log((condicion ? 'OK    ' : 'FALLA ') + texto);
  if (!condicion) fallos++;
}
const hex = (n) => fs.readFileSync(path.join(__dirname, '..', 'programas', n + '.hex'), 'utf8');
const mA = (i) => (i * 1000).toFixed(2).replace('.', ',') + ' mA';
const CUADRO = FRECUENCIA * 0.016; // 16 ms simulados, como una foto del Worker
// Cada ventana se corta en períodos completos del PWM (ver nucleo.js), así que el ciclo útil sale exacto;
// la tolerancia solo cubre el redondeo.
const TOLERANCIA_UTIL = 0.005;
// Los renglones completos del serial (el último puede venir cortado a mitad de un número).
const renglones = (texto) => texto.split(/\r?\n/).slice(0, -1).filter(Boolean).map(Number);

// Corre `ms` milisegundos simulados en cuadros de 16 ms y devuelve la última foto.
function correr(nucleo, ms) {
  let f = null;
  for (let t = 0; t < ms; t += 16) {
    nucleo.avanzar(CUADRO);
    f = nucleo.foto();
  }
  return f;
}

const LED9 = (ohmios) => ({
  formato: 1,
  placa: 'uno',
  componentes: [
    { id: 'r1', tipo: 'resistencia', x: 0, y: 0, rot: 0, props: { ohmios } },
    { id: 'led1', tipo: 'led', x: 0, y: 0, rot: 0, props: { color: 'rojo' } },
  ],
  cables: [
    { de: 'placa.D9', a: 'r1.1' },
    { de: 'r1.2', a: 'led1.anodo' },
    { de: 'led1.catodo', a: 'placa.GND1' },
  ],
  protoboard: null,
});
const conPot = (posicion) => {
  const c = LED9(220);
  c.componentes.push({ id: 'pot1', tipo: 'potenciometro', x: 0, y: 0, rot: 0, props: { ohmios: 10000, posicion } });
  c.cables.push({ de: 'pot1.GND', a: 'placa.GND2' }, { de: 'pot1.VCC', a: 'placa.5V' }, { de: 'pot1.SIG', a: 'placa.A0' });
  return c;
};
const ACTIVAS = { danoComponentes: true, limitePin: true };

// 1. PWM fijo: analogWrite(9, 64) → 25 % del tiempo en ALTO
{
  const n = crearNucleo({ hex: hex('pwm9'), circuito: LED9(220), activas: ACTIVAS });
  const f = correr(n, 300);
  const m = f.medicion;
  const util = m.pwm.D9;
  revisar(Math.abs(util - 64 / 255) < TOLERANCIA_UTIL,`ciclo útil del pin 9: ${(util * 100).toFixed(1)} % (programa: 64/255 = 25,1 %)`);
  const led = m.leds[0];
  // Con el pin siempre en ALTO, el LED con 220 Ω lleva 12,50 mA (prueba del motor): el promedio es ese × ciclo útil.
  revisar(Math.abs(led.i - 0.0125 * util) < 0.0002, `corriente promedio del LED: ${mA(led.i)} (esperado ${mA(0.0125 * util)})`);
  revisar(Math.abs(led.brillo - (led.i * 1000) / 15) < 1e-9 && led.brillo > 0.15 && led.brillo < 0.3, `brillo según el promedio: ${(led.brillo * 100).toFixed(0)} %`);
  revisar(f.evaluaciones <= 3, `el circuito se resolvió solo ${f.evaluaciones} veces en 0,3 s, con unos 150 cambios del pin`);
  revisar(f.fallas.length === 0 && n.fallas().length === 0, 'con 220 Ω no hay fallas');
  const v = m.voltajes['placa.D9'];
  revisar(Math.abs(v - 4.688 * util) < 0.02, `voltaje promedio del pin 9 (lo que mide un multímetro): ${v.toFixed(2)} V`);
}

// 2. Potenciómetro en A0: analogRead() sigue a la perilla y el LED del pin 9 también
for (const pos of [0.25, 0.75, 0, 1]) {
  const n = crearNucleo({ hex: hex('potenciometro'), circuito: conPot(pos), activas: ACTIVAS });
  let serial = '';
  let f;
  for (let t = 0; t < 500; t += 16) {
    n.avanzar(CUADRO);
    f = n.foto();
    serial += f.serial;
  }
  const lecturas = renglones(serial);
  const ultima = lecturas[lecturas.length - 1];
  const esperada = Math.min(1023, Math.round(pos * 1024));
  revisar(Math.abs(ultima - esperada) <= 2, `perilla al ${pos * 100} %: analogRead da ${ultima} (esperado ≈ ${esperada})`);
  const util = f.medicion.pwm.D9 || (pos >= 1 ? 1 : 0);
  const esperadaUtil = Math.floor(ultima / 4) / 255;
  revisar(Math.abs(util - esperadaUtil) < TOLERANCIA_UTIL,`  y el pin 9 queda en ${(util * 100).toFixed(1)} % (esperado ${(esperadaUtil * 100).toFixed(1)} %)`);
  const pot = f.medicion.potenciometros[0];
  revisar(Math.abs(pot.v - 5 * pos) < 0.01, `  voltaje en la pata del medio: ${pot.v.toFixed(2)} V`);
}

// 3. Girar la perilla con el programa andando
{
  const n = crearNucleo({ hex: hex('potenciometro'), circuito: conPot(0.2), activas: ACTIVAS });
  correr(n, 300);
  n.ponerCircuito(conPot(0.8));
  let serial = '';
  for (let t = 0; t < 400; t += 16) {
    n.avanzar(CUADRO);
    serial += n.foto().serial;
  }
  const ultima = renglones(serial).pop();
  revisar(Math.abs(ultima - 819) <= 2, `al girar la perilla de 20 % a 80 % con el programa andando, la lectura pasa a ${ultima}`);
}

// 4. LED sin resistencia con PWM: el promedio es bajo, pero el pico lo quema
{
  const c = LED9(220);
  c.componentes = c.componentes.filter((x) => x.id !== 'r1');
  c.cables = [{ de: 'placa.D9', a: 'led1.anodo' }, { de: 'led1.catodo', a: 'placa.GND1' }];
  const n = crearNucleo({ hex: hex('pwm9'), circuito: c, activas: ACTIVAS });
  const f = correr(n, 100);
  const tipos = n.fallas().map((x) => x.tipo);
  revisar(tipos.includes('led_quemado'), `con PWM al 25 % y sin resistencia, el LED se quema igual (el daño lo hace el pico): ${tipos.join(', ')}`);
  revisar(f.quemados.includes('led1') && f.medicion.leds[0].i === 0, 'el LED quemado queda abierto');
  const ideal = crearNucleo({ hex: hex('pwm9'), circuito: c, activas: {} });
  correr(ideal, 100);
  revisar(ideal.fallas().length === 0, 'en modo ideal, el mismo circuito no avisa fallas');
}

// 4b. Programa real de TecnoBloques (fixture «eco» de test/salida): el serial llega en UTF-8 («Recibí»)
{
  const fixture = path.join(__dirname, '..', '..', '..', 'TecnoBloques', 'test', 'salida', 'eco', 'eco.hex');
  if (!fs.existsSync(fixture)) console.log('      (sin la fixture eco de TecnoBloques: corre npm test y npm run compilar allá)');
  else {
    const c = LED9(220);
    c.cables[0] = { de: 'placa.D13', a: 'r1.1' };
    const n = crearNucleo({ hex: fs.readFileSync(fixture, 'utf8'), circuito: c, activas: ACTIVAS });
    let texto = '';
    for (let t = 0; t < 300; t += 16) { n.avanzar(CUADRO); texto += n.foto().serial; }
    n.enviarSerial('on\n');
    let led = 0;
    for (let t = 0; t < 300; t += 16) { n.avanzar(CUADRO); const f = n.foto(); texto += f.serial; led = f.leds.led1; }
    revisar(/Escribe on u off/.test(texto) && /Recibí: on/.test(texto), 'el eco de TecnoBloques responde «Recibí: on», con la tilde bien (UTF-8)');
    revisar(led > 0.7, `y prende el LED del pin 13 (brillo ${(led * 100).toFixed(0)} %)`);
  }
}

// 5. Cuánto tarda el chip (Node, este PC): sin PWM, con PWM y con el potenciómetro.
//    Es informativo: depende del PC y de si está con cargador (con batería, Windows baja la velocidad).
const velocidades = {};
for (const [nombre, circuito] of [['parpadeo13', LED9(220)], ['pwm9', LED9(220)], ['potenciometro', conPot(0.5)]]) {
  const n = crearNucleo({ hex: hex(nombre), circuito, activas: ACTIVAS });
  const inicio = process.hrtime.bigint();
  correr(n, 5000);
  const ms = Number(process.hrtime.bigint() - inicio) / 1e6;
  velocidades[nombre] = 5000 / ms;
  console.log(`      ${nombre}: 5 s simulados en ${ms.toFixed(0)} ms → ${(5000 / ms).toFixed(2)} veces más rápido que el chip real`);
}
console.log(`      con PWM el chip va al ${((velocidades.pwm9 / velocidades.parpadeo13) * 100).toFixed(0)} % de la velocidad sin PWM (mismo PC, misma corrida)`);

console.log(fallos ? `\n${fallos} FALLAS` : '\nTodo bien.');
process.exit(fallos ? 1 : 0);
