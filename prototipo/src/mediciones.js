// La tabla de mediciones en español, a partir de sim.mediciones() (contrato 1). Es la misma en la página de prueba
// y en TecnoBloques: una sola fuente para lo que el aprendiz lee. No toca la página: devuelve filas de texto.
//
//   TecnoCircuito.filasDeMediciones(sim.mediciones())
//     → [{ pieza: 'Pin 9', voltaje: '0,36 V', corriente: '0,00 mA', detalle: 'PWM 50 %' }, …]

const num = (x, dec) => x.toFixed(dec).replace('.', ',');
const voltios = (v) => (v === null || v === undefined ? 'al aire' : num(v, 2) + ' V');
const miliamperios = (i) => num(i * 1000, Math.abs(i) < 0.01 ? 2 : 1) + ' mA';
const ohmios = (r, dec) => (r >= 1000 ? num(r / 1000, dec) + ' k' : r + ' ') + 'Ω';
const nombrePin = (pin) => 'Pin ' + pin.replace(/^D/, '');

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
    ...(m.potenciometros || []).map((x) => fila(`${x.id} (${ohmios(x.ohmios, 0)})`, voltios(x.v), miliamperios(x.i), `perilla ${Math.round(x.posicion * 100)} %`)),
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
    ...(m.baterias || []).map((b) =>
      fila(`${b.id} (LiPo 2S)`, voltios(b.voltios), b.conectada ? miliamperios(b.i) : '',
        `${num(b.voltios / 2, 2)} V por celda${b.voltios / 2 < 3.3 ? ' · cárgala' : ''}${b.conectada ? '' : ' · sin conectar'}`)),
    ...(servos.length ? [fila('5V de la placa (USB)', '', miliamperios(m.consumo5V), 'el USB da hasta 500 mA')] : []),
    ...(usb && (servos.length || usb.reinicios || usb.pico > 0.2)
      ? [fila('USB (placa y circuito)', voltios(usb.voltios), miliamperios(usb.amperios),
          `pico ${miliamperios(usb.pico)} · fusible ${Math.round(usb.fusible * 100)} %${usb.reinicios ? ` · ${usb.reinicios} reinicios` : ''}`)]
      : []),
  ];
}
