// Prueba con Node la potencia de la tarea T3: shield L293D (74HC595, PWM y puente H), motores TT y batería LiPo 2S.
// Usa programas/carro_motores (AFMotor_R4, la librería del kit): M1 y M4 2 s adelante a 200, 1 s quietos, 2 s atrás
// a 255 y 1 s quietos.
// Uso: npm run probar:nucleo   (arma pruebas/nucleo.cjs y corre este archivo después de probar_nucleo.js)
const fs = require('fs');
const path = require('path');
const { crearNucleo, FRECUENCIA } = require('./nucleo.cjs');

let fallos = 0;
function revisar(condicion, texto) {
  console.log((condicion ? 'OK    ' : 'FALLA ') + texto);
  if (!condicion) fallos++;
}
const hex = fs.readFileSync(path.join(__dirname, '..', 'programas', 'carro_motores.hex'), 'utf8');
const CUADRO = FRECUENCIA * 0.016;
const coma = (n, d = 2) => n.toFixed(d).replace('.', ',');

// El carro del kit: shield, motor izquierdo en M1, derecho en M4 y la LiPo en EXT_PWR.
function carro({ carga = 'llena', bateria = true, puente = true, invertida = false, cables = null } = {}) {
  return {
    formato: 1,
    placa: 'uno',
    componentes: [
      { id: 'shield1', tipo: 'shield_l293d', x: 0, y: 0, props: { puentePWR: puente } },
      { id: 'motor1', tipo: 'motor_tt', x: 0, y: 300, props: { vista: 'rueda', lado: 'izquierdo' } },
      { id: 'motor2', tipo: 'motor_tt', x: 400, y: 300, props: { vista: 'rueda', lado: 'derecho' } },
      ...(bateria ? [{ id: 'bateria1', tipo: 'bateria_lipo', x: 0, y: 600, props: { carga } }] : []),
    ],
    cables: cables || [
      { de: 'motor1.A', a: 'shield1.M1A' },
      { de: 'motor1.B', a: 'shield1.M1B' },
      { de: 'motor2.A', a: 'shield1.M4A' },
      { de: 'motor2.B', a: 'shield1.M4B' },
      ...(bateria
        ? invertida
          ? [{ de: 'bateria1.NEG', a: 'shield1.EXT_POS' }, { de: 'bateria1.POS', a: 'shield1.EXT_GND' }]
          : [{ de: 'bateria1.POS', a: 'shield1.EXT_POS' }, { de: 'bateria1.NEG', a: 'shield1.EXT_GND' }]
        : []),
    ],
  };
}

// Corre hasta `hasta` ms y devuelve la foto de ese momento, con todas las fallas y el serial.
function correr(circuito, activas, hasta) {
  const n = crearNucleo({ hex, circuito, activas });
  const r = { fallas: [], serial: '', fotos: [] };
  for (let t = 0; t < hasta; t += 16) {
    n.avanzar(CUADRO);
    const f = n.foto();
    r.fallas.push(...f.fallas);
    r.serial += f.serial;
    r.fotos.push(f);
  }
  r.ultima = r.fotos[r.fotos.length - 1];
  r.en = (ms) => r.fotos[Math.floor(ms / 16)];
  return r;
}
const REALISTA = { caidaL293D: true, limiteUSB: true, danoComponentes: true, limitePin: true };
const IDEAL = { caidaL293D: false, limiteUSB: false };

// 1. Con la batería llena: el programa mueve los motores por el 74HC595 y el PWM, con la caída del L293D.
{
  const r = correr(carro(), REALISTA, 6000);
  revisar(/Carro listo\r?\nadelante 200\r?\nquieto\r?\natras 255/.test(r.serial), 'el programa de AFMotor_R4 corre: «Carro listo», «adelante 200», «quieto», «atras 255»');
  const ad = r.en(1800).piezas;
  revisar(ad.motor1.rpm > 160 && ad.motor1.rpm < 200, `adelante a 200 (78 %): el motor 1 gira a ${Math.round(ad.motor1.rpm)} RPM (sin carga, con 8,4 V − caída del L293D)`);
  revisar(Math.abs(ad.motor1.rpm - ad.motor2.rpm) < 5, `los dos motores van igual: ${Math.round(ad.motor1.rpm)} y ${Math.round(ad.motor2.rpm)} RPM`);
  revisar(ad.motor1.voltios > 5 && ad.motor1.voltios < 5.7, `al motor le llegan ${coma(ad.motor1.voltios)} V en promedio (0,78 × (8,4 − 1,5))`);
  revisar(ad.motor1.velocidad > 0, `motor 1 (izquierdo) con FORWARD: avanza (${coma(ad.motor1.velocidad, 0)} cm/s)`);
  revisar(ad.motor1.i > 0.08 && ad.motor1.i < 0.25, `sin carga pide ${Math.round(ad.motor1.i * 1000)} mA`);
  const at = r.en(4800).piezas;
  revisar(at.motor1.rpm < -200 && at.motor1.rpm > -245, `atrás a 255: gira al revés a ${Math.round(at.motor1.rpm)} RPM`);
  revisar(at.motor1.voltios > 6.6 && at.motor1.voltios < 7.1, `a 255 le llegan ${coma(at.motor1.voltios)} V: la caída del L293D es de ${coma(at.bateria1.voltios - at.motor1.voltios)} V`);
  revisar(Math.abs(r.en(2900).piezas.motor1.rpm) < 15, `con RELEASE se detiene solo en menos de 1 s (${Math.round(r.en(2900).piezas.motor1.rpm)} RPM a los 0,9 s)`);
  revisar(r.ultima.medicion && r.ultima.medicion.porVin === true && r.ultima.energia.amperios === 0, 'con el puente PWR y 8,4 V, el Uno toma la energía del VIN: el USB no entrega nada');
  revisar(r.en(4800).piezas.bateria1.voltios < 8.4 && r.en(4800).piezas.bateria1.voltios > 8.3, `la batería baja a ${coma(r.en(4800).piezas.bateria1.voltios)} V con los motores (resistencia interna)`);
  revisar(!r.fallas.length, 'sin fallas: ' + (r.fallas.map((f) => f.tipo).join(', ') || 'ninguna'));
  const sh = r.en(1800).medicion.shield;
  revisar(sh && sh.habilitada && sh.motoresV > 8, `la shield está habilitada (pin 7 en BAJO) con ${coma(sh.motoresV)} V para los motores`);
}

// 2. Modo ideal: sin la caída del L293D el motor recibe los 8,4 V completos.
{
  const r = correr(carro(), IDEAL, 4900);
  const at = r.en(4800).piezas;
  revisar(at.motor1.voltios > 8.3, `ideal: a 255 al motor le llegan ${coma(at.motor1.voltios)} V (sin caída)`);
  revisar(at.motor1.rpm < -260, `ideal: gira más rápido, ${Math.round(at.motor1.rpm)} RPM`);
}

// 3. Batería descargada: avisa al empezar y el carro va más lento.
{
  const r = correr(carro({ carga: 'descargada' }), REALISTA, 1900);
  const aviso = r.fallas.find((f) => f.tipo === 'bateria_baja');
  revisar(aviso && r.fotos[0].fallas.some((f) => f.tipo === 'bateria_baja'), `descargada: avisa en la primera foto: «${aviso && aviso.mensaje}»`);
  revisar(r.en(1800).piezas.motor1.rpm < 140, `descargada: el motor va a ${Math.round(r.en(1800).piezas.motor1.rpm)} RPM`);
  revisar(r.ultima.medicion.porVin === false && r.ultima.energia.amperios > 0, 'con 6,4 V en el VIN el Uno sigue tomando la energía del USB');
}

// 4. Sin batería: el USB no alimenta los motores; se avisa.
{
  const r = correr(carro({ bateria: false }), REALISTA, 600);
  const aviso = r.fallas.find((f) => f.tipo === 'motores_sin_energia');
  revisar(aviso && Math.abs(r.ultima.piezas.motor1.rpm) < 1, `sin batería los motores no giran y se avisa: «${aviso && aviso.mensaje}»`);
}

// 5. Batería al revés, motor en un pin del chip y motor directo al 5V del USB.
{
  const r = correr(carro({ invertida: true }), REALISTA, 300);
  revisar(r.fallas.some((f) => f.tipo === 'bateria_invertida') && Math.abs(r.ultima.piezas.motor1.rpm) < 1, 'batería al revés: se avisa y los motores no giran');
  const enPin = correr(carro({ cables: [{ de: 'motor1.A', a: 'placa.D9' }, { de: 'motor1.B', a: 'placa.GND2' }] }), REALISTA, 200);
  revisar(enPin.fallas.some((f) => f.tipo === 'motor_en_pin'), 'motor en el pin 9: «' + (enPin.fallas.find((f) => f.tipo === 'motor_en_pin') || {}).mensaje + '»');
  const usb = correr(carro({ bateria: false, cables: [{ de: 'motor1.A', a: 'placa.5V' }, { de: 'motor1.B', a: 'placa.GND2' }] }), REALISTA, 1000);
  const e = usb.ultima.energia;
  revisar(usb.ultima.piezas.motor1.rpm > 100 && e.amperios > 0.15, `motor directo al 5V: gira a ${Math.round(usb.ultima.piezas.motor1.rpm)} RPM y el USB entrega ${Math.round(e.amperios * 1000)} mA`);
  revisar(e.pico > 0.4, `al arrancar, el motor pide un golpe de ${Math.round(e.pico * 1000)} mA al USB`);
}

// 6. El motor del lado derecho, cableado igual, avanza al revés: es el error más común con un carro.
{
  const r = correr(carro(), REALISTA, 1900);
  const m = r.en(1800).medicion.motores;
  const der = m.find((x) => x.id === 'motor2');
  const sentido = Math.sign(der.velocidad) * (der.lado === 'derecho' ? -1 : 1);
  revisar(der.canal === 'M4' && sentido < 0, 'el motor derecho en M4 con el mismo cableado va hacia atrás: hay que invertir sus cables o su sentido');
}

// 7. Como lo arman los bloques: las órdenes a los motores sin pausa (programas/carro_continuo, M1 atrás y M2 adelante
//    a 255). El 74HC595 recibe datos decenas de miles de veces por segundo: es el peor caso para la velocidad.
{
  const continuo = fs.readFileSync(path.join(__dirname, '..', 'programas', 'carro_continuo.hex'), 'utf8');
  const c = carro({
    cables: [
      { de: 'motor1.A', a: 'shield1.M1A' },
      { de: 'motor1.B', a: 'shield1.M1B' },
      { de: 'motor2.A', a: 'shield1.M2A' },
      { de: 'motor2.B', a: 'shield1.M2B' },
      { de: 'bateria1.POS', a: 'shield1.EXT_POS' },
      { de: 'bateria1.NEG', a: 'shield1.EXT_GND' },
    ],
  });
  const n = crearNucleo({ hex: continuo, circuito: c, activas: REALISTA });
  const inicio = process.hrtime.bigint();
  let f = null;
  for (let t = 0; t < 2000; t += 16) {
    n.avanzar(CUADRO);
    f = n.foto();
  }
  const ms = Number(process.hrtime.bigint() - inicio) / 1e6;
  revisar(f.piezas.motor1.rpm < -200 && f.piezas.motor2.rpm > 200, `órdenes sin pausa: M1 atrás (${Math.round(f.piezas.motor1.rpm)} RPM) y M2 adelante (${Math.round(f.piezas.motor2.rpm)} RPM)`);
  // Informativo (depende del PC y del cargador): antes del 10 oct iba a 0,22 veces el chip real.
  console.log(`      2 s simulados en ${ms.toFixed(0)} ms → ${(2000 / ms).toFixed(2)} veces el chip real`);
}

console.log(fallos ? `\n${fallos} FALLAS` : '\nTodo bien.');
process.exit(fallos ? 1 : 0);
