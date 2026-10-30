// La tabla de mediciones en español, a partir de sim.mediciones() (contrato 1). Es la misma en la página de prueba
// y en TecnoBloques: una sola fuente para lo que el aprendiz lee. No toca la página: devuelve filas de texto.
//
//   TecnoCircuito.filasDeMediciones(sim.mediciones())
//     → [{ pieza: 'Pin 9', voltaje: '0,36 V', corriente: '0,00 mA', detalle: 'PWM 50 %' }, …]

import { LIPO } from './piezas/bateria_lipo.js';

const num = (x, dec) => x.toFixed(dec).replace('.', ',');
const voltios = (v) => (v === null || v === undefined ? 'al aire' : num(v, 2) + ' V');
const miliamperios = (i) => num(i * 1000, Math.abs(i) < 0.01 ? 2 : 1) + ' mA';
const ohmios = (r, dec) => (r >= 1000 ? num(r / 1000, dec) + ' k' : r + ' ') + 'Ω';
const nombrePin = (pin) => 'Pin ' + pin.replace(/^D/, '');

// El tramo del potenciómetro (MED-001, regla de Efraín del 29 oct): el que va a GND; si ninguna pata va a GND, el que
// lleva corriente; si van las dos (o ninguno lleva corriente), los dos. Para hacer las cuentas de la ley de Ohm, con un
// solo tramo la fila da su voltaje y su corriente (V / I = el tramo), aunque la pata a GND sea la que se llama VCC.
const EN_USO = 1e-6; // A: menos que esto (lo que toma una entrada analógica) no cuenta como tramo en uso
const valorTramo = (t) => (t.ohmios >= 1000 ? num(t.ohmios / 1000, 1) + ' kΩ' : Math.round(t.ohmios) + ' Ω');
function filaPotenciometro(x, fila) {
  const pieza = `${x.id} (${ohmios(x.ohmios, 0)})`;
  const perilla = `perilla ${Math.round(x.posicion * 100)} %`;
  const tramos = x.tramos || [];
  if (!tramos.length) return fila(pieza, voltios(x.v), miliamperios(x.i), perilla);
  const aGND = tramos.filter((t) => t.aGND);
  const enUso = tramos.filter((t) => t.i > EN_USO);
  const [elegidos, nombre] = aGND.length ? [aGND, 'a GND'] : enUso.length ? [enUso, 'en uso'] : [tramos, ''];
  if (elegidos.length === 1) {
    const t = elegidos[0];
    return fila(pieza, voltios(t.v), miliamperios(t.i), `${perilla} · tramo ${nombre} (SIG–${t.pata}): ${valorTramo(t)}`);
  }
  const lista = elegidos.map((t) => `SIG–${t.pata} ${valorTramo(t)}`).join(' y ');
  return fila(pieza, voltios(x.v), miliamperios(x.i), `${perilla} · tramos${nombre ? ' ' + nombre : ''}: ${lista}`);
}

export function filasDeMediciones(m) {
  if (!m || !m.leds) return [];
  const fila = (pieza, voltaje, corriente, detalle) => ({ pieza, voltaje: voltaje || '', corriente: corriente || '', detalle: detalle || '' });
  // Cómo lee el programa una entrada: ALTO, BAJO o al aire (en modo realista, con el mouse cerca capta la red).
  const lee = (pin) => {
    const e = m.entradas && m.entradas[pin];
    return !e ? '' : e.alAire ? `al aire: lee ${e.alto ? 'ALTO' : 'BAJO'}; acércale el mouse` : e.alto ? 'lee ALTO' : 'lee BAJO';
  };
  const conPin = new Set(m.pines.map((p) => p.pin));
  const servos = m.servos || [];
  // Un pin que manda la señal de un servo: se lee como pulso, no como PWM de brillo.
  const deServo = (pin) => servos.find((s) => s.senal === pin && s.pulso);
  const detallePin = (p) => {
    const s = deServo(p.pin);
    if (s) return `señal de servo: pulso de ${s.pulso} µs`;
    const u = m.pwm && m.pwm[p.pin];
    return u > 0.005 && u < 0.995 ? `PWM ${Math.round(u * 100)} %` : lee(p.pin);
  };
  const usb = m.usb;
  return [
    ...m.pines.map((p) => fila(nombrePin(p.pin), voltios(p.v), miliamperios(p.i), detallePin(p))),
    ...Object.keys(m.entradas || {})
      .filter((pin) => !conPin.has(pin) && ('placa.' + pin) in m.voltajes)
      .map((pin) => fila(nombrePin(pin) + ' (entrada)', voltios(m.voltajes['placa.' + pin]), '', lee(pin))),
    ...(m.potenciometros || []).map((x) => filaPotenciometro(x, fila)),
    ...m.resistencias.map((r) => fila(`${r.id} (${ohmios(r.ohmios, 1)})`, voltios(r.v), miliamperios(r.i), num(r.w * 1000, 1) + ' mW')),
    ...m.leds.map((l) => fila(l.id, voltios(l.v), miliamperios(l.i), l.quemado ? 'quemado' : `brillo ${Math.round(l.brillo * 100)} %`)),
    ...servos.map((s) =>
      fila(`${s.id} (${s.modelo.toUpperCase()})`, '', miliamperios(s.i),
        !s.fuente ? 'sin alimentación' : !s.senal ? 'sin señal' : `${Math.round(s.angulo)}°${s.moviendo ? ', moviéndose' : ''}${s.pulso ? ` · pulso ${s.pulso} µs` : ''}`)),
    ...(m.shield
      ? [fila(`${m.shield.id}: motores (EXT_PWR)`, voltios(m.shield.motoresV), '',
          m.shield.motoresV < 1 ? 'sin energía: conecta la batería a EXT_PWR' : `puente PWR ${m.shield.puente ? 'puesto' : 'quitado'}${m.porVin ? ' · el Uno toma la energía del VIN' : ''}`)]
      : []),
    ...(m.motores || []).map((x) => {
      const cms = Math.abs(x.velocidad);
      const sentido = Math.sign(x.velocidad) * (x.lado === 'derecho' ? -1 : 1) > 0 ? 'adelante' : 'atrás';
      return fila(`${x.id} (${x.canal || 'sin shield'})`, voltios(x.voltios), miliamperios(x.i),
        Math.abs(x.rpm) < 1 ? 'quieto' : `${Math.round(Math.abs(x.rpm))} RPM · ${sentido} ${Math.round(cms)} cm/s`);
    }),
    ...(m.baterias || []).map((b) => {
      const celdas = b.celdas || [b.voltios / 2, b.voltios / 2];
      return fila(`${b.id} (LiPo 2S)`, voltios(b.voltios), b.conectada ? miliamperios(b.i) : '',
        `celdas ${celdas.map((v) => num(v, 2)).join(' y ')} V${Math.min(...celdas) < LIPO.avisoCeldaV ? ' · cárgala' : ''}${b.conectada ? '' : ' · sin conectar'}`);
    }),
    ...(m.probadores || []).map((p) =>
      fila(`${p.id} (probador)`, p.encendido ? voltios(p.total) : '', '',
        !p.encendido ? 'apagado: el − va al negro del balance (al revés no enciende)' : `${p.celdas.length}S · ${p.celdas.map((v, i) => `${i + 1}: ${num(v, 2)} V`).join(' · ')}${p.alarma ? ' · ¡pita!' : ''}`)),
    ...(servos.length && !usb?.referencia ? [fila('5V de la placa (USB)', '', miliamperios(m.consumo5V), 'el USB da hasta 500 mA')] : []),
    ...(usb?.referencia ? [
      fila('Nano · alimentación', voltios(usb.voltios), miliamperios(usb.amperios), `${usb.fuente === 'jack' ? 'jack de la expansión' : usb.fuente === 'apagada' ? 'desconectada' : 'USB'} · modelo de referencia por validar${usb.apagada ? ' · placa apagada' : ''}`),
      fila('Nano · 3,3V del módulo', voltios(usb.voltios3V3), '', 'salida del módulo'),
      ...(usb.expansion ? [fila('Expansión · 3,3V', voltios(usb.voltios3V3Expansion), '', 'regulación externa · red separada del módulo')] : []),
      ...(usb.fuente === 'jack' ? [fila(usb.expansion ? 'Expansión · jack' : 'Nano · VIN', voltios(usb.voltiosJack), '', 'entrada del regulador de referencia')] : []),
    ] : []),
    ...(usb && !usb.referencia && (servos.length || usb.reinicios || usb.pico > 0.2)
      ? [fila('USB (placa y circuito)', voltios(usb.voltios), miliamperios(usb.amperios),
          `pico ${miliamperios(usb.pico)} · fusible ${Math.round(usb.fusible * 100)} %${usb.reinicios ? ` · ${usb.reinicios} reinicios` : ''}`)]
      : []),
  ];
}
