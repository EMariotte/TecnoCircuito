// Prueba con Node la potencia de la tarea T3: shield L293D (74HC595, PWM y puente H), motores TT y batería LiPo 2S.
// Usa programas/carro_motores (AFMotor_R4, la librería del kit): M1 y M4 2 s adelante a 200, 1 s quietos, 2 s atrás
// a 255 y 1 s quietos.
// Uso: npm run probar:nucleo   (arma pruebas/nucleo.cjs y corre este archivo después de probar_nucleo.js)
const fs = require('fs');
const path = require('path');
const { crearNucleo, FRECUENCIA, pantallaProbador } = require('./nucleo.cjs');

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

// 8. El probador de celdas en el cable de balance: la pantalla, la alarma y los errores de cableado.
{
  const texto = (p) => (p ? p.map((d) => d.c + (d.punto ? '.' : '')).join('') : 'apagada');
  const e = { encendido: true, celdas: [3.7, 3.7], total: 7.4 };
  const secuencia = [0, 800, 1600, 2400, 3200, 4000, 4800].map((ms) => texto(pantallaProbador(e, ms)));
  revisar(secuencia.join(' | ') === '7.40 |  2S | -1- | 3.70 | -2- | 3.70 | 7.40',
    `la pantalla repite: total, celdas, «-1-», celda 1, «-2-», celda 2 (${secuencia.join(' | ')})`);
  revisar(texto(pantallaProbador({ encendido: true, celdas: [4.2, 4.2, 4.2], total: 12.6 }, 0)) === '12.6', 'con 12,6 V muestra «12.6»');
  revisar(pantallaProbador({ encendido: false, celdas: [], total: 0 }, 0) === null, 'sin batería, la pantalla queda apagada');

  const conProbador = (carga, cables, umbral = 3.3) => ({
    formato: 1,
    placa: 'uno',
    componentes: [
      { id: 'bateria1', tipo: 'bateria_lipo', x: 0, y: 250, props: { carga } },
      { id: 'probador1', tipo: 'probador_lipo', x: 330, y: 200, props: { umbral } },
    ],
    cables: cables.map(([de, a]) => ({ de: 'bateria1.' + de, a: 'probador1.' + a })),
  });
  const BIEN = [['BAL0', 'NEG'], ['BAL1', 'C1'], ['BAL2', 'C2']];
  const medir = (circuito) => {
    const n = crearNucleo({ hex, circuito, activas: REALISTA });
    const fallas = [];
    let f = null;
    for (let t = 0; t < 300; t += 16) {
      n.avanzar(CUADRO);
      f = n.foto();
      fallas.push(...f.fallas);
    }
    return { p: f.piezas.probador1, fallas, m: f.medicion };
  };
  const nominal = medir(conProbador('nominal', BIEN));
  revisar(nominal.p.encendido && nominal.p.celdas.length === 2 && Math.abs(nominal.p.total - 7.4) < 0.01 && !nominal.p.alarma,
    `nominal: el probador ve 2 celdas de ${nominal.p.celdas.map((v) => coma(v)).join(' y ')} V y no pita`);
  const fila = nominal.m && nominal.m.probadores && nominal.m.probadores[0];
  revisar(!!fila && fila.celdas.length === 2, 'la tabla de mediciones trae el probador');
  const desb = medir(conProbador('desbalanceada', BIEN, 3.5));
  const aviso = desb.fallas.find((x) => x.tipo === 'probador_alarma');
  revisar(desb.p.alarma && aviso && /celda 2/.test(aviso.mensaje), `desbalanceada (3,95 y 3,45 V) con alarma en 3,5 V: pita por la celda 2 («${aviso && aviso.mensaje}»)`);
  revisar(desb.fallas.some((x) => x.tipo === 'bateria_desbalanceada'), 'y la batería avisa que está desbalanceada');
  const descargada = medir(conProbador('descargada', BIEN));
  revisar(descargada.p.alarma, 'descargada (3,2 V por celda) con la alarma de fábrica (3,3 V): pita');
  const apagada = medir(conProbador('descargada', BIEN, 0));
  revisar(!apagada.p.alarma && apagada.p.encendido, 'con la alarma apagada no pita, pero sigue midiendo');
  const cruzado = medir(conProbador('nominal', [['BAL0', 'NEG'], ['BAL2', 'C1'], ['BAL1', 'C2']]));
  revisar(Math.abs(cruzado.p.celdas[0] - 7.4) < 0.01 && cruzado.p.alarma,
    `cables cruzados (1 al + y 2 al medio): la celda 1 sale en ${coma(cruzado.p.celdas[0])} V y la 2 en ${coma(cruzado.p.celdas[1])}: pita, como el real`);
  const sinNeg = medir(conProbador('nominal', [['BAL1', 'C1'], ['BAL2', 'C2']]));
  revisar(!sinNeg.p.encendido, 'sin el − conectado, el probador no enciende');
  const unaCelda = medir(conProbador('nominal', [['BAL0', 'NEG'], ['BAL1', 'C1']]));
  revisar(unaCelda.p.encendido && unaCelda.p.celdas.length === 1, 'con solo el − y el 1: ve una celda (1S) y se alimenta de ella');
  const porPotencia = medir(conProbador('nominal', [['NEG', 'NEG'], ['BAL1', 'C1'], ['POS', 'C2']]));
  revisar(porPotencia.p.celdas.length === 2 && Math.abs(porPotencia.p.total - 7.4) < 0.01, 'el − y el + del balance son los mismos de los cables de potencia');
}

// 9. Revisión de código del 11 oct.
{
  // El Worker avanza en pedazos que no son milisegundos exactos: los modelos «de cada ms» deben correr igual.
  const enPedazos = (ciclosPorPaso) => {
    const n = crearNucleo({ hex, circuito: carro(), activas: REALISTA, semilla: 1 });
    const total = FRECUENCIA * 1.5;
    for (let hecho = 0; hecho < total; hecho += ciclosPorPaso) n.avanzar(Math.min(ciclosPorPaso, total - hecho));
    return n.foto();
  };
  const exactos = enPedazos(FRECUENCIA / 1000);
  const raros = enPedazos(4801);
  // Lo que giró la rueda suma cada milisegundo del modelo: si corriera de más, giraría de más.
  revisar(Math.abs(exactos.piezas.motor1.giro - raros.piezas.motor1.giro) < 1 && Math.abs(exactos.msSimulados - raros.msSimulados) < 1,
    `en pedazos de 4801 ciclos la rueda gira lo mismo que de a 1 ms (${raros.piezas.motor1.giro.toFixed(1)}° y ${exactos.piezas.motor1.giro.toFixed(1)}°)`);
  // La shield agregada con la simulación corriendo ve los pines como ya están (D7 en BAJO y el PWM de 255 quieto en ALTO).
  const sinShield = carro();
  sinShield.componentes = sinShield.componentes.filter((c) => c.tipo !== 'shield_l293d');
  sinShield.cables = [];
  const n = crearNucleo({ hex, circuito: sinShield, activas: REALISTA, semilla: 1 });
  for (let t = 0; t < 3600; t += 16) { n.avanzar(CUADRO); n.foto(); } // ya va en «atras 255»
  n.ponerCircuito(carro());
  let f = null;
  for (let t = 0; t < 800; t += 16) { n.avanzar(CUADRO); f = n.foto(); }
  revisar(f.piezas.motor1.rpm < -150, `con la shield agregada en medio de «atras 255», el motor gira (${Math.round(f.piezas.motor1.rpm)} RPM)`);
}

console.log(fallos ? `\n${fallos} FALLAS` : '\nTodo bien.');
process.exit(fallos ? 1 : 0);
