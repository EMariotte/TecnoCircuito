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

// 4b. El eco de TecnoBloques (serial en UTF-8) se prueba con las fixtures: probar_fixtures.js

// ---- Tarea T1: botón, lectura digital desde el circuito y entrada flotante
const TODAS = { danoComponentes: true, limitePin: true, entradaFlotante: true, ruidoADC: true };
const IDEAL = { danoComponentes: false, limitePin: false, entradaFlotante: false, ruidoADC: false };
// LED con 220 Ω en el pin 13 y un botón en el pin 2. conPulldown: 5V → botón → pin 2, y 10 kΩ del pin 2 a GND.
// alGND: el botón une el pin 2 con GND (para INPUT_PULLUP). Sin las dos: el pin 2 queda al aire si no se presiona.
const T1 = ({ conPulldown = true, alGND = false } = {}) => {
  const c = LED9(220);
  c.cables[0] = { de: 'placa.D13', a: 'r1.1' };
  c.componentes.push({ id: 'btn1', tipo: 'pulsador', x: 0, y: 0, rot: 0, props: { color: 'rojo' } });
  c.cables.push({ de: 'placa.D2', a: 'btn1.1i' }, { de: alGND ? 'placa.GND3' : 'placa.5V', a: 'btn1.2i' });
  if (conPulldown && !alGND) {
    c.componentes.push({ id: 'r2', tipo: 'resistencia', x: 0, y: 0, rot: 0, props: { ohmios: 10000 } });
    c.cables.push({ de: 'btn1.1d', a: 'r2.1' }, { de: 'r2.2', a: 'placa.GND2' });
  }
  return c;
};
// Muestrea cada ms el LED del pin 13 (lo que el programa escribió según lo que leyó del pin 2).
let serialVisto = '';
function muestrear(n, ms) {
  let prendido = 0;
  let cambios = 0;
  let antes = null;
  for (let t = 0; t < ms; t++) {
    n.avanzar(FRECUENCIA / 1000);
    const foto = n.foto();
    serialVisto += foto.serial;
    const alto = foto.placa.led13;
    if (alto) prendido++;
    if (antes !== null && alto !== antes) cambios++;
    antes = alto;
  }
  return { prendido: prendido / ms, cambios };
}

// 6. Botón con pull-down: suelto lee BAJO, presionado lee ALTO; el monitor lo cuenta
{
  const n = crearNucleo({ hex: hex('boton_pulldown'), circuito: T1(), activas: TODAS, semilla: 1 });
  serialVisto = correr(n, 200).serial;
  const suelto = muestrear(n, 100);
  n.ponerPulsador('btn1', true);
  const presionado = muestrear(n, 100);
  const f = n.foto();
  n.ponerPulsador('btn1', false);
  const otraVez = muestrear(n, 100);
  const texto = serialVisto + n.foto().serial;
  revisar(suelto.prendido === 0 && presionado.prendido === 1 && otraVez.prendido === 0,
    `pull-down: suelto el LED queda apagado, presionado prendido y al soltar se apaga (${suelto.prendido}, ${presionado.prendido}, ${otraVez.prendido})`);
  revisar(Math.abs(f.voltajes['placa.D2'] - 5) < 0.01, `presionado, el pin 2 está a ${f.voltajes['placa.D2'].toFixed(2)} V`);
  revisar(/Presionado/.test(texto) && /Suelto/.test(texto), 'el monitor serial dice «Presionado» y «Suelto»');
}

// 7. Sin la pull-down, suelto el pin 2 queda al aire: en modo realista lee al azar; en modo ideal, BAJO
{
  const realista = crearNucleo({ hex: hex('boton_pulldown'), circuito: T1({ conPulldown: false }), activas: TODAS, semilla: 7 });
  correr(realista, 100);
  const azar = muestrear(realista, 3000);
  const f = realista.foto();
  revisar(azar.cambios >= 10 && azar.cambios <= 50 && azar.prendido > 0.2 && azar.prendido < 0.8,
    `realista: el LED se prende y se apaga solo (${azar.cambios} cambios en 3 s, unos 25 esperados; prendido ${(azar.prendido * 100).toFixed(0)} %)`);
  revisar(f.entradas.D2 && f.entradas.D2.alAire && f.voltajes['placa.D2'] === null, 'el pin 2 figura «al aire» y sin voltaje medible');
  realista.ponerPulsador('btn1', true);
  const firme = muestrear(realista, 100);
  revisar(firme.prendido === 1 && firme.cambios === 0, 'al presionar deja de flotar: el LED queda prendido y quieto');
  const ideal = crearNucleo({ hex: hex('boton_pulldown'), circuito: T1({ conPulldown: false }), activas: IDEAL, semilla: 7 });
  correr(ideal, 100);
  const quieto = muestrear(ideal, 500);
  revisar(quieto.prendido === 0 && quieto.cambios === 0, 'ideal: sin pull-down el pin 2 lee BAJO y el LED queda apagado y quieto');
}

// 8. Botón a GND con la pull-up interna (INPUT_PULLUP): la lógica va al revés y no hace falta resistencia
{
  const n = crearNucleo({ hex: hex('boton_pullup'), circuito: T1({ alGND: true }), activas: TODAS, semilla: 3 });
  correr(n, 200);
  const suelto = muestrear(n, 100);
  const vSuelto = n.foto().voltajes['placa.D2'];
  n.ponerPulsador('btn1', true);
  const presionado = muestrear(n, 100);
  revisar(suelto.prendido === 0 && presionado.prendido === 1, `pull-up interna: suelto apagado, presionado prendido (${suelto.prendido}, ${presionado.prendido})`);
  revisar(Math.abs(vSuelto - 5) < 0.01, `suelto, la pull-up deja el pin 2 a ${vSuelto.toFixed(2)} V`);
}

// ---- Tarea T2: ruido de analogRead() y entrada analógica al aire
// Lee del monitor serial las lecturas del programa «potenciometro» (una cada 100 ms).
function lecturas(n, cuantas) {
  let texto = '';
  for (let t = 0; t < cuantas * 100 + 200; t += 16) {
    n.avanzar(CUADRO);
    texto += n.foto().serial;
  }
  return renglones(texto);
}
const desviacion = (xs) => {
  const m = xs.reduce((s, x) => s + x, 0) / xs.length;
  return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / xs.length);
};

// 9. Ruido del ADC: en realista la lectura baila 1 o 2 pasos; en ideal es siempre la misma
{
  const ruido = lecturas(crearNucleo({ hex: hex('potenciometro'), circuito: conPot(0.5), activas: TODAS, semilla: 11 }), 40);
  const limpio = lecturas(crearNucleo({ hex: hex('potenciometro'), circuito: conPot(0.5), activas: IDEAL, semilla: 11 }), 40);
  const d = desviacion(ruido);
  revisar(d > 0.2 && d < 1.5 && Math.max(...ruido) - Math.min(...ruido) <= 6,
    `realista: perilla al 50 %, ${ruido.length} lecturas entre ${Math.min(...ruido)} y ${Math.max(...ruido)} (desviación ${d.toFixed(2)} pasos)`);
  revisar(new Set(limpio).size === 1 && Math.abs(limpio[0] - 511) <= 1, `ideal: siempre ${limpio[0]}`);
}

// 10. Sin la pata del medio, A0 queda al aire: en realista lee cualquier cosa; en ideal, 0
{
  const alAire = () => {
    const c = conPot(0.5);
    c.cables = c.cables.filter((k) => k.de !== 'pot1.SIG');
    return c;
  };
  const realista = lecturas(crearNucleo({ hex: hex('potenciometro'), circuito: alAire(), activas: TODAS, semilla: 5 }), 30);
  const ideal = lecturas(crearNucleo({ hex: hex('potenciometro'), circuito: alAire(), activas: IDEAL, semilla: 5 }), 30);
  revisar(Math.max(...realista) - Math.min(...realista) > 30, `realista: A0 al aire deambula entre ${Math.min(...realista)} y ${Math.max(...realista)}`);
  revisar(ideal.every((x) => x === 0), 'ideal: A0 al aire lee 0');
  // Sin GND el potenciómetro no divide: la pata del medio queda pegada a 5V (física, no una no idealidad)
  const sinGND = conPot(0.3);
  sinGND.cables = sinGND.cables.filter((k) => k.de !== 'pot1.GND');
  const pegado = lecturas(crearNucleo({ hex: hex('potenciometro'), circuito: sinGND, activas: IDEAL, semilla: 5 }), 10);
  revisar(pegado.every((x) => x >= 1020), `sin GND la perilla no hace nada: lee ${pegado[0]} (pegado a 5V)`);
}

// ---- Tarea T3: el servo (pieza Tecno, src/piezas/servo.js) con el programa real de la librería Servo
{
  const conServo = ({ modelo = 'sg90', vcc = 'placa.5V', gnd = 'placa.GND1', sig = 'placa.D9' } = {}) => ({
    formato: 1,
    placa: 'uno',
    componentes: [{ id: 'servo1', tipo: 'servo', x: 0, y: 0, rot: 0, props: { modelo } }],
    cables: [{ de: 'servo1.GND', a: gnd }, { de: 'servo1.VCC', a: vcc }, { de: 'servo1.SIG', a: sig }].filter((k) => k.a),
  });
  // Corre `ms` y devuelve lo que pasó con el servo cada 16 ms (como las fotos del Worker).
  const seguir = (n, ms) => {
    const r = [];
    for (let t = 0; t < ms; t += 16) {
      n.avanzar(CUADRO);
      const f = n.foto();
      r.push({ t: f.msSimulados, ...f.servos.servo1, consumo5V: f.medicion && f.medicion.consumo5V, fallas: f.fallas });
    }
    return r;
  };
  // servo_barrido: 0° (1 s), 90° (1 s), 180° (1 s), y vuelve a empezar
  const n = crearNucleo({ hex: hex('servo_barrido'), circuito: conServo(), activas: ACTIVAS, semilla: 1 });
  const v = seguir(n, 3000);
  const en = (ms) => v.find((x) => x.t >= ms);
  revisar(en(900).pulso >= 543 && en(900).pulso <= 545 && Math.abs(en(900).angulo) < 0.5, `write(0): pulso de ${en(900).pulso} µs → ${en(900).angulo}°`);
  revisar(Math.abs(en(1900).pulso - 1472) <= 1 && Math.abs(en(1900).angulo - 90) < 0.5, `write(90): pulso de ${en(1900).pulso} µs → ${en(1900).angulo}°`);
  revisar(en(2900).pulso >= 2399 && en(2900).pulso <= 2401 && Math.abs(en(2900).angulo - 180) < 0.5, `write(180): pulso de ${en(2900).pulso} µs → ${en(2900).angulo}°`);
  // Velocidad: el SG90 gira 60° en 0,1 s a 4,8 V; a 5 V, 90° le toman unos 0,14 s
  const inicio = v.find((x) => x.t > 2000 && x.moviendo);
  const fin = v.find((x) => x.t > 2000 && !x.moviendo && x.angulo > 179);
  const segundos = (fin.t - inicio.t) / 1000;
  revisar(segundos > 0.1 && segundos < 0.2, `de 90° a 180° tarda ${segundos.toFixed(2).replace('.', ',')} s (hoja de datos: 0,1 s por 60° a 4,8 V)`);
  const quieto = en(1900).i * 1000;
  const moviendo = Math.max(...v.filter((x) => x.t > 2060 && x.t < 2120).map((x) => x.i * 1000));
  const pico = Math.max(...v.map((x) => x.pico * 1000));
  revisar(quieto < 15 && moviendo > 150 && pico > 600, `consumo del SG90: ${quieto.toFixed(0)} mA quieto, ${moviendo.toFixed(0)} mA moviéndose y ${pico.toFixed(0)} mA de pico al arrancar`);
  revisar(Math.abs(en(1900).consumo5V * 1000 - quieto) < 1, `el 5V de la placa entrega lo que pide el servo (${(en(1900).consumo5V * 1000).toFixed(1)} mA)`);
  // El MG90S pide más corriente al moverse
  const mg = seguir(crearNucleo({ hex: hex('servo_barrido'), circuito: conServo({ modelo: 'mg90s' }), activas: ACTIVAS, semilla: 1 }), 2200);
  const mgMoviendo = Math.max(...mg.filter((x) => x.t > 2060 && x.t < 2120).map((x) => x.i * 1000));
  revisar(mgMoviendo > moviendo, `el MG90S pide más al moverse que el SG90 (${mgMoviendo.toFixed(0)} frente a ${moviendo.toFixed(0)} mA)`);
  // Errores del aula: sin GND o sin 5V no se mueve; alimentado desde un pin, avisa; a 3,3 V va más lento
  const sinGnd = seguir(crearNucleo({ hex: hex('servo_barrido'), circuito: conServo({ gnd: null }), activas: ACTIVAS, semilla: 1 }), 1000);
  revisar(sinGnd.every((x) => x.angulo === 90 && x.i === 0), 'sin el cable de GND el servo no se mueve ni consume');
  const desdePin = seguir(crearNucleo({ hex: hex('servo_barrido'), circuito: conServo({ vcc: 'placa.D7' }), activas: ACTIVAS, semilla: 1 }), 500);
  const aviso = desdePin.flatMap((x) => x.fallas).find((f) => f.tipo === 'servo_alimentacion');
  revisar(desdePin.every((x) => x.angulo === 90) && aviso && /pin 7/.test(aviso.mensaje), `alimentado desde el pin 7 no se mueve y avisa: «${aviso && aviso.mensaje}»`);
  const a33 = seguir(crearNucleo({ hex: hex('servo_barrido'), circuito: conServo({ vcc: 'placa.3V3' }), activas: ACTIVAS, semilla: 1 }), 3000);
  const ini33 = a33.find((x) => x.t > 2000 && x.moviendo);
  const fin33 = a33.find((x) => x.t > 2000 && !x.moviendo && x.angulo > 179);
  revisar(fin33 && (fin33.t - ini33.t) / 1000 > segundos * 1.3, `a 3,3 V gira más lento: ${((fin33.t - ini33.t) / 1000).toFixed(2).replace('.', ',')} s frente a ${segundos.toFixed(2).replace('.', ',')} s`);
  // Cuatro servos moviéndose a la vez desde el USB
  const cuatro = {
    formato: 1,
    placa: 'uno',
    componentes: ['D9', 'D6', 'D5', 'D3'].map((pin, k) => ({ id: 's' + k, tipo: 'servo', x: 0, y: 0, rot: 0, props: { modelo: 'sg90' } })),
    cables: ['D9', 'D6', 'D5', 'D3'].flatMap((pin, k) => [
      { de: 's' + k + '.GND', a: 'placa.GND1' }, { de: 's' + k + '.VCC', a: 'placa.5V' }, { de: 's' + k + '.SIG', a: 'placa.' + pin },
    ]),
  };
  const n4 = crearNucleo({ hex: hex('servos_cuatro'), circuito: cuatro, activas: ACTIVAS, semilla: 1 });
  let maximo = 0;
  for (let t = 0; t < 1500; t += 16) {
    n4.avanzar(CUADRO);
    const f = n4.foto();
    if (f.medicion) maximo = Math.max(maximo, f.medicion.consumo5V);
  }
  revisar(maximo > 0.5, `cuatro servos moviéndose a la vez piden ${(maximo * 1000).toFixed(0)} mA al 5V: más de los 500 mA del USB`);

  // ---- Energía del USB (no idealidad «limiteUSB», src/energia.js): con cuántos servos se reinicia la placa
  const conN = (k) => ({ ...cuatro, componentes: cuatro.componentes.slice(0, k), cables: cuatro.cables.slice(0, 3 * k) });
  const usb = (k, activas, ms = 8000) => {
    const m = crearNucleo({ hex: hex('servos_cuatro'), circuito: conN(k), activas, semilla: 1 });
    let serial = '';
    let fallas = [];
    let f = null;
    let retrocede = false;
    let antes = 0;
    let vMin = 5;
    for (let t = 0; t < ms; t += 16) {
      m.avanzar(CUADRO);
      f = m.foto();
      serial += f.serial;
      fallas = fallas.concat(f.fallas);
      if (f.msSimulados < antes) retrocede = true;
      antes = f.msSimulados;
      if (!f.energia.apagada) vMin = Math.min(vMin, f.energia.voltios);
    }
    return { inicios: (serial.match(/Inicio/g) || []).length, reinicios: f.energia.reinicios, fallas, retrocede, vMin, ms: f.msSimulados };
  };
  const uno = usb(1, { limiteUSB: true });
  const dos = usb(2, { limiteUSB: true });
  revisar(uno.reinicios === 0 && dos.reinicios === 0 && uno.inicios === 1 && dos.inicios === 1, 'con 1 y con 2 servos moviéndose a la vez, la placa no se reinicia');
  revisar(dos.vMin < 4.6 && dos.vMin > 4.2, `pero el 5V baja: con 2 servos llega a ${dos.vMin.toFixed(2).replace('.', ',')} V`);
  const tres = usb(3, { limiteUSB: true });
  const aviso3 = tres.fallas.find((x) => x.tipo === 'reinicio_usb');
  revisar(tres.reinicios > 3 && tres.inicios === tres.reinicios + 1 && aviso3, `con 3 servos arrancando a la vez la placa se reinicia una y otra vez (${tres.reinicios} veces en 8 s): «${aviso3 && aviso3.mensaje}»`);
  revisar(tres.fallas.filter((x) => x.tipo === 'reinicio_usb').length === 1, 'el aviso sale una sola vez, aunque se reinicie muchas');
  revisar(!tres.retrocede && Math.abs(tres.ms - 8000) < 20, `el tiempo simulado no retrocede con los reinicios (${Math.round(tres.ms)} ms)`);
  const ideal = usb(4, {});
  revisar(ideal.reinicios === 0 && ideal.inicios === 1, 'en modo ideal (USB sin límite), los cuatro servos no reinician la placa');
  // El fusible: más de 500 mA sostenidos lo calientan hasta que se abre; la placa se apaga y vuelve al enfriarse
  const { crearFusible } = require('./nucleo.cjs');
  if (crearFusible) {
    const fus = crearFusible();
    let t = 0;
    while (!fus.abierto && t < 60000) fus.avanzar(1, 1.0), t++;
    revisar(t > 5000 && t < 30000, `a 1 A sostenido, el fusible se abre a los ${(t / 1000).toFixed(1).replace('.', ',')} s (se dispara desde 1 A; 0,15 s a 8 A)`);
    let e = 0;
    while (fus.abierto && e < 60000) fus.avanzar(1, 0), e++;
    revisar(e > 1000 && e < 10000, `sin carga se enfría y se cierra a los ${(e / 1000).toFixed(1).replace('.', ',')} s`);
    const f8 = crearFusible();
    let t8 = 0;
    while (!f8.abierto && t8 < 5000) f8.avanzar(1, 8), t8++;
    revisar(t8 >= 140 && t8 <= 160, `a 8 A se abre a los ${t8} ms (hoja de datos: 150 ms)`);
  }
  // De punta a punta: 4,7 Ω entre el 5V y GND le piden 1 A sostenido al USB. El fusible se abre, la placa se
  // apaga (LED ON apagado) y, cuando se enfría, vuelve a encender sola.
  const carga = {
    formato: 1,
    placa: 'uno',
    componentes: [{ id: 'r1', tipo: 'resistencia', x: 0, y: 0, rot: 0, props: { ohmios: 4.7 } }],
    cables: [{ de: 'placa.5V', a: 'r1.1' }, { de: 'r1.2', a: 'placa.GND1' }],
  };
  const mc = crearNucleo({ hex: hex('parpadeo13'), circuito: carga, activas: { limiteUSB: true }, semilla: 1 });
  let seApago = null;
  let volvio = null;
  let avisoFusible = null;
  let ledOn = true;
  for (let t = 0; t < 25000; t += 16) {
    mc.avanzar(CUADRO);
    const f = mc.foto();
    avisoFusible = avisoFusible || f.fallas.find((x) => x.tipo === 'fusible_usb');
    if (f.energia.apagada && seApago === null) {
      seApago = f.msSimulados;
      ledOn = f.placa.encendida !== false;
    }
    if (seApago !== null && !f.energia.apagada && volvio === null) volvio = f.msSimulados;
  }
  revisar(seApago > 5000 && seApago < 20000 && !ledOn && avisoFusible, `con 1 A sostenido, la placa se apaga a los ${(seApago / 1000).toFixed(1).replace('.', ',')} s: «${avisoFusible && avisoFusible.mensaje}»`);
  revisar(volvio !== null && volvio - seApago > 1000 && volvio - seApago < 6000, `y vuelve a encender ${volvio ? ((volvio - seApago) / 1000).toFixed(1).replace('.', ',') : '?'} s después, cuando el fusible se enfría`);
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
