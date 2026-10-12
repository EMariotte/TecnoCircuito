// SPDX-License-Identifier: Apache-2.0
// Prueba software con HEX compilado para Nano. No valida la expansión física.
// Requiere pruebas/nucleo.cjs y motor.cjs reconstruidos con las fuentes actuales.
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const { crearNucleo, FRECUENCIA, perfilPlaca, esNano, resolverAlimentacionNano, NANO_REFERENCIA } = require('./nucleo.cjs');
const { armarRed, PinState } = require('./motor.cjs');
const hex = (nombre) => fs.readFileSync(path.join(__dirname, '..', 'programas', nombre + '.hex'), 'utf8');
let comprobaciones = 0;
function verificar(condicion, mensaje) { assert.ok(condicion, mensaje); comprobaciones++; console.log('OK    ' + mensaje); }
const casi = (a, b, tol = 1e-5) => Math.abs(a - b) <= tol;
const pieza = (id, tipo, props = {}) => ({ id, tipo, x: 0, y: 0, rot: 0, props });
const cable = (de, a) => ({ de, a });
const circuito = (placa = 'nano', variante = null, props = {}) => ({ formato: 1, placa,
  componentes: variante ? [pieza('exp', 'shield_nano_io', { variante, alimentacion: 'usb', voltajeJack: 9, ...props })] : [], cables: [], protoboard: null });
const nucleo = (c, nombre = 'nano_adc67', activas = {}) => crearNucleo({ hex: hex(nombre), circuito: c, activas, semilla: 77 });
function correr(n, duracion, trozos = [FRECUENCIA * 0.016]) {
  const fin = n.ciclos + FRECUENCIA * duracion / 1000;
  let texto = '', foto = null, k = 0;
  while (n.ciclos < fin) {
    n.avanzar(Math.min(trozos[k++ % trozos.length], fin - n.ciclos));
    foto = n.foto(); texto += foto.serial;
  }
  return { foto, texto };
}
function pots(placa, variante, a6 = 0.25, a7 = 0.75) {
  const c = circuito(placa, variante);
  for (const [canal, posicion] of [[6, a6], [7, a7]]) {
    const id = 'p' + canal;
    c.componentes.push(pieza(id, 'potenciometro', { ohmios: 10000, posicion }));
    c.cables.push(cable(id + '.SIG', variante ? `exp.A${canal}_S` : 'placa.A' + canal),
      cable(id + '.VCC', variante ? `exp.A${canal}_V` : 'placa.5V'),
      cable(id + '.GND', variante ? `exp.A${canal}_G` : 'placa.GND2'));
  }
  return c;
}
function lecturas(texto) { return texto.split(/\r?\n/).filter((s) => /^\d+,\d+$/.test(s)).map((s) => s.split(',').map(Number)); }

verificar(esNano('nano') && esNano('nano_old') && !esNano('uno'), 'nano/nano_old comparten la familia ATmega328P');
verificar(perfilPlaca('nano') === perfilPlaca('nano_old'), 'el cargador antiguo no añade un segundo chip ni cambia el mapa');
verificar(perfilPlaca('nano').analogicos.length === 8 && perfilPlaca('uno').analogicos.length === 6, 'Nano expone ocho canales ADC y Uno conserva seis');
verificar(!perfilPlaca('nano').pinesDigitales.includes('A6') && !perfilPlaca('nano').pinesDigitales.includes('A7'), 'A6/A7 están fuera del mapa digital y del promedio PWM');
verificar(!perfilPlaca('nano').pines.includes('GND3') && perfilPlaca('nano').gnd.length === 2, 'Nano tiene dos tierras; no hereda GND3 del Uno');
verificar(perfilPlaca('nano').puentes.some((g) => g.includes('RESET') && g.includes('RESET2')), 'RESET y RESET2 comparten nodo');

for (const placa of ['nano', 'nano_old']) for (const variante of [null, 'roja', 'azul']) {
  const c = pots(placa, variante);
  const n = nucleo(c);
  const r = correr(n, 450);
  const l = lecturas(r.texto);
  verificar(l.length >= 3 && l.every(([a, b]) => Math.abs(a - 256) <= 1 && Math.abs(b - 768) <= 1), `${placa}/${variante || 'suelto'}: HEX real lee A6≈256 y A7≈768`);
  verificar(casi(r.foto.voltajes['placa.A6'], 1.25, 0.002) && casi(r.foto.voltajes['placa.A7'], 3.75, 0.002), `${placa}/${variante || 'suelto'}: voltajes ADC disponibles en el núcleo`);
  const red = armarRed(c);
  red.ponerPines({ A6: PinState.High, A7: PinState.InputPullUp });
  const m = red.resolver();
  verificar(casi(m.voltajes['placa.A6'], 1.25, 0.002) && casi(m.voltajes['placa.A7'], 3.75, 0.002) && !m.pines.some((p) => ['A6', 'A7'].includes(p.pin)), `${placa}/${variante || 'suelto'}: estados inventados no crean GPIO ni pull-up en ADC6/7`);
}

// Al desconectar A6/A7: ideal lee cero; realista conserva el modelo al aire, con
// semilla y mano por canal. No se confunden con entradas digitales PORTC6/7.
{
  const c = circuito('nano', 'roja');
  const ideal = lecturas(correr(nucleo(c), 450).texto);
  verificar(ideal.length >= 3 && ideal.every(([a, b]) => a === 0 && b === 0), 'ADC6/7 al aire: modo ideal lee cero');
  const n = nucleo(c, 'nano_adc67', { entradaFlotante: true, ruidoADC: true });
  n.ponerMano(['exp.A6_S']);
  const real = lecturas(correr(n, 450).texto);
  verificar(real.some(([a, b]) => a > 0 && b > 0), 'ADC6/7 al aire siguen el modelo realista y aceptan la mano en el conector equivalente');
  const red = armarRed(c);
  verificar(red.flotantes({}).has('A6') && red.flotantes({}).has('A7'), 'la red reconoce ADC6/7 flotantes sin exigir estado GPIO');
}

// GPIO, alias SPI y PWM conservan el comportamiento con el único AVR real.
for (const placa of ['nano', 'nano_old']) for (const variante of ['roja', 'azul']) {
  const c = circuito(placa, variante);
  c.componentes.push(pieza('r', 'resistencia', { ohmios: 220 }));
  c.cables.push(cable('exp.SPI_SCK', 'r.1'), cable('r.2', 'exp.GND_OUT'));
  const f = correr(nucleo(c, 'fijo13'), 80).foto;
  verificar(f.placa.led13 && casi(f.voltajes['placa.D13'], 5 * 220 / 245, 0.005), `${placa}/${variante}: SCK es D13; salida digital con resistencia interna`);
  const pwm = circuito(placa, variante);
  pwm.componentes.push(pieza('r', 'resistencia', { ohmios: 1000 }));
  pwm.cables.push(cable('exp.D9_S', 'r.1'), cable('r.2', 'exp.D9_G'));
  const fp = correr(nucleo(pwm, 'pwm9'), 300).foto;
  verificar(Math.abs(fp.medicion.pwm.D9 - 64 / 255) < 0.005, `${placa}/${variante}: analogWrite(9,64) mantiene el PWM del AVR`);
}

// Referencia ADC DEFAULT sigue AVCC: una carga reduce 5V y las perillas, pero
// sus lecturas proporcionales se conservan. Una señal fija externa3.3/5 cambia.
{
  const c = pots('nano', 'roja');
  c.componentes.push(pieza('carga', 'resistencia', { ohmios: 2 }));
  c.cables.push(cable('exp.OUT_5V', 'carga.1'), cable('carga.2', 'exp.GND_OUT'));
  const r = correr(nucleo(c, 'nano_adc67', { limiteUSB: true }), 450);
  verificar(r.foto.energia.voltios < 4.6 && casi(r.foto.energia.voltios, r.foto.voltajes['exp.OUT_5V'], 0.002), 'la caída de alimentación aparece en MNA y en las mediciones');
  const l = lecturas(r.texto);
  verificar(l.length >= 3 && l.every(([a, b]) => Math.abs(a - 256) <= 1 && Math.abs(b - 768) <= 1), 'ADC6/7 leen la perilla respecto de AVCC real, sin falsa caída del valor digital');
  c.cables = c.cables.filter((x) => x.de !== 'p7.SIG');
  c.cables.push(cable('exp.OUT_3V3', 'placa.A7'));
  const s = correr(nucleo(c, 'nano_adc67', { limiteUSB: true }), 450);
  const ultima = lecturas(s.texto).at(-1);
  verificar(Math.abs(ultima[1] - Math.floor(1024 * s.foto.energia.voltios3V3Expansion / s.foto.energia.voltios)) <= 1, 'ADC7 alimentado por 3,3 V externa responde a la caída de AVCC');
}

for (const variante of ['roja', 'azul']) {
  const idealUSB = correr(nucleo(circuito('nano', variante)), 20).foto;
  verificar(casi(idealUSB.energia.voltios, 5) && casi(idealUSB.energia.voltios3V3Expansion, 3.3) && idealUSB.energia.fusible === null, `${variante}: USB nominal sin fusible PTC del Uno`);
  const jack = circuito('nano', variante, { alimentacion: 'jack', voltajeJack: 9 });
  const fj = correr(nucleo(jack, 'parpadeo13', { limiteUSB: true }), 40).foto;
  verificar(fj.energia.fuente === 'jack' && casi(fj.voltajes['exp.JACK_POS'], 9) && casi(fj.voltajes['placa.VIN'], 0), `${variante}: jack externo9 V regula 5V y conserva VIN del módulo separado`);
  verificar(casi(fj.energia.voltios, 5 - 0.025 * 0.25) && fj.energia.referencia, `${variante}: reposo y caída usan supuestos Nano explícitos`);
  const baja = circuito('nano', variante, { alimentacion: 'jack', voltajeJack: 5 });
  const fb = correr(nucleo(baja, 'parpadeo13', { limiteUSB: true }), 40).foto;
  verificar(fb.energia.voltios < 3.81 && fb.energia.voltios3V3Expansion < 2.61 && fb.energia.voltios3V3 > 3.2, `${variante}: alimentación insuficiente distingue salida3.3 externa y móduloNano`);
  const apagado = circuito('nano', variante, { alimentacion: 'apagada' });
  const fa = correr(nucleo(apagado), 100, [333, 4801, 9000]).foto;
  verificar(fa.energia.apagada && fa.energia.voltios === 0 && fa.voltajes['exp.OUT_3V3'] === 0 && fa.voltajes['exp.OUT_5V'] === 0 && !fa.placa.encendida, `${variante}: sin fuente, los rieles privados y Nano muestran cero`);
  verificar(Math.abs(fa.msSimulados - 100) < 0.001 && fa.serial === '', `${variante}: apagada conserva reloj simulado en pasos parciales sin ejecutar el HEX`);
  const limite = circuito('nano', variante);
  limite.componentes.push(pieza('r', 'resistencia', { ohmios: 10 }));
  limite.cables.push(cable('r.1', 'exp.OUT_3V3'), cable('r.2', 'exp.GND_OUT'));
  const n = nucleo(limite, 'parpadeo13', { limiteUSB: true });
  const fl = correr(n, 40).foto;
  verificar(fl.energia.voltios3V3Expansion < 3.2 && casi(fl.voltajes['placa.3V3'], 3.3), `${variante}: cargar salida3.3 externa no une la salida3V3 del módulo`);
  verificar(n.fallas().some((f) => f.tipo === 'nano_3v3_sobrecarga') && !n.fallas().some((f) => f.tipo === 'fusible_usb'), `${variante}: aviso3.3 sobrecargada de referencia sin simular PTC del Uno`);
  verificar(casi(fl.energia.amperios, NANO_REFERENCIA.reposoA + fl.energia.voltios3V3Expansion / 10, 0.001), `${variante}: la carga3.3 cuenta una vez en la corriente de alimentación`);
}

// Batería realmente cableada al jack, incluso por contactos equivalentes del
// balance. La fuente recibe la LiPo, registra corriente y caída, sin consumoUno.
{
  const c = circuito('nano', 'roja', { alimentacion: 'jack', voltajeJack: 9 });
  c.componentes.push(pieza('bat', 'bateria_lipo', { carga: 'nominal' }), pieza('r', 'resistencia', { ohmios: 20 }));
  c.cables.push(cable('bat.BAL2', 'exp.JACK_POS'), cable('bat.BAL0', 'exp.JACK_GND'), cable('exp.OUT_5V', 'r.1'), cable('r.2', 'exp.GND_OUT'));
  const f = correr(nucleo(c, 'parpadeo13', { limiteUSB: true }), 100).foto;
  const b = f.medicion.baterias[0];
  verificar(f.energia.voltiosJack < 7.4 && f.energia.voltiosJack > 7.3 && casi(f.voltajes['exp.JACK_POS'], b.voltios, 0.001), 'la LiPo cableada reemplaza voltajeJack y la caída interna llega a MNA');
  verificar(casi(b.i, f.energia.amperios, 0.001) && b.i > 0.25 && b.conectada, 'corriente del jack registrada en batería sin añadir60mA del Uno');
  const sinTierra = JSON.parse(JSON.stringify(c));
  sinTierra.cables = sinTierra.cables.filter((x) => x.a !== 'exp.JACK_GND');
  const fsin = correr(nucleo(sinTierra), 40).foto;
  verificar(fsin.energia.apagada && fsin.energia.voltiosJack === 0, 'jack con batería sin retornoGND no inventa alimentación desde la propiedad');
  const inversa = JSON.parse(JSON.stringify(c));
  inversa.cables[0] = cable('bat.NEG', 'exp.JACK_POS'); inversa.cables[1] = cable('bat.POS', 'exp.JACK_GND');
  const inv = nucleo(inversa);
  verificar(correr(inv, 40).foto.energia.apagada, 'batería invertida no se convierte en una fuente positiva');
}

// Servo por el conector S/V/G y pasos de reloj completos/parciales.
for (const variante of ['roja', 'azul']) for (const realista of [false, true]) {
  const c = circuito('nano', variante, { alimentacion: 'jack', voltajeJack: 9 });
  c.cables.push(cable('exp.JACK_POS', 'exp.JACK_GND'));
  const n = nucleo(c, 'parpadeo13', { limiteUSB: realista });
  const f = correr(n, 40).foto;
  verificar(f.energia.voltiosJack === 0 && f.energia.voltios === 0 && f.energia.apagada && !f.placa.encendida,
    `${variante}/${realista ? 'realista' : 'ideal'}: corto en el jack anula la fuente de la propiedad y detiene el Nano`);
  verificar(n.fallas().some((x) => x.tipo === 'cortocircuito' && x.componente === 'exp.JACK_POS'),
    `${variante}/${realista ? 'realista' : 'ideal'}: el jack en corto conserva su diagnóstico eléctrico`);
}
for (const expansion of [true, false]) {
  const c = circuito('nano', expansion ? 'roja' : null, { alimentacion: 'jack' });
  const entrada = expansion ? 'exp.JACK_POS' : 'placa.VIN';
  c.componentes.push(pieza('bat', 'bateria_lipo', { carga: 'nominal' }), pieza('r', 'resistencia', { ohmios: 20 }));
  c.cables.push(cable('bat.POS', entrada), cable('bat.NEG', 'placa.GND2'),
    cable(entrada, 'r.1'), cable('r.2', 'placa.GND2'));
  const f = correr(nucleo(c, 'parpadeo13', { limiteUSB: true }), 100).foto;
  const b = f.medicion.baterias[0];
  const iDirecta = f.medicion.fuentes.find((x) => x.pin === (expansion ? entrada : 'VIN')).i;
  verificar(iDirecta > 0.36 && casi(b.i, 0.025 + iDirecta, 0.001) && casi(f.energia.amperios, b.i, 0.001),
    `${expansion ? 'jack externo' : 'VIN Nano suelto'}: carga directa de entrada incluida una vez en fuente y batería`);
  verificar(casi(f.energia.voltios, 5 - 0.025 * 0.25, 0.001),
    `${expansion ? 'jack externo' : 'VIN Nano suelto'}: carga de entrada no provoca una falsa caída en el regulador de5V`);
  if (expansion) {
    c.componentes.find((x) => x.id === 'exp').props.alimentacion = 'usb';
    const u = correr(nucleo(c, 'parpadeo13', { limiteUSB: true }), 100).foto;
    verificar(u.medicion.baterias[0].i > 0.36 && casi(u.energia.amperios, 0.025, 0.001),
      'con selecciónUSB la carga directa del jack sigue en la batería y no se atribuye al USB');
  }
}

for (const placa of ['nano', 'nano_old']) {
  const c = circuito(placa, 'azul');
  c.componentes.push(pieza('s', 'servo', { modelo: 'sg90' }));
  c.cables.push(cable('s.SIG', 'exp.D9_S'), cable('s.VCC', 'exp.D9_V'), cable('s.GND', 'exp.D9_G'));
  const f = correr(nucleo(c, 'servo_barrido'), 900).foto;
  verificar(Math.abs(f.servos.s.angulo - 7) < 0.5 && f.servos.s.pulso >= 543 && f.servos.s.pulso <= 545, `${placa}: libreríaServo conserva Timer1/pulso544µs por expansión`);
  const otro = correr(nucleo(c, 'servo_barrido'), 900, [4801, 333, 9000, 16000]).foto;
  verificar(Math.abs(otro.servos.s.angulo - f.servos.s.angulo) < 0.5 && Math.abs(otro.msSimulados - f.msSimulados) < 0.02, `${placa}: modelos temporales coinciden al avanzar con pasos parciales`);
}

{
  const montar = (alimentacion, voltajeJack) => {
    const c = circuito('nano', 'roja', { alimentacion, voltajeJack });
    c.componentes.push(pieza('s', 'servo', { modelo: 'sg90' }));
    c.cables.push(cable('s.SIG', 'exp.D9_S'), cable('s.VCC', 'exp.D9_V'), cable('s.GND', 'exp.D9_G'));
    return c;
  };
  // El HEX emite el primer pulso después de50ms de arranque; 120ms incluyen
  // suficiente desplazamiento para distinguir las dos velocidades.
  const usb = correr(nucleo(montar('usb', 9), 'servo_barrido', { limiteUSB: true }), 120).foto;
  const jack = correr(nucleo(montar('jack', 5), 'servo_barrido', { limiteUSB: true }), 120).foto;
  verificar(jack.servos.s.angulo > usb.servos.s.angulo + 5 && jack.energia.voltios < usb.energia.voltios,
    'el servo gira más lento cuando el jack insuficiente reduce la alimentación real');
  const apagado = correr(nucleo(montar('apagada', 9), 'servo_barrido'), 80).foto;
  verificar(apagado.servos.s.angulo === 90 && apagado.servos.s.i === 0, 'servo alimentado por expansión apagada no se mueve ni consume');
  const motor = circuito('nano', 'azul');
  motor.componentes.push(pieza('m', 'motor_tt', { lado: 'izquierdo' }));
  motor.cables.push(cable('m.A', 'exp.OUT_5V'), cable('m.B', 'exp.GND_OUT'));
  const f = correr(nucleo(motor, 'parpadeo13', { limiteUSB: true }), 300).foto;
  verificar(f.piezas.m.rpm > 100 && f.medicion.motores[0].i > 0.1 && f.energia.voltios < 5,
    'motorTT directo al 5V del Nano consume corriente y su carga reduce el riel');
  const suelto = circuito('nano_old');
  suelto.componentes.push(pieza('bat', 'bateria_lipo', { carga: 'nominal' }));
  suelto.cables.push(cable('bat.POS', 'placa.VIN'), cable('bat.NEG', 'placa.GND2'));
  const fv = correr(nucleo(suelto, 'parpadeo13', { limiteUSB: true }), 80).foto;
  verificar(fv.energia.fuente === 'jack' && fv.voltajes['placa.VIN'] > 7.3 && casi(fv.medicion.baterias[0].i, 0.025, 0.001),
    'Nano suelto porVIN usa consumo propio de referencia sin incorporar60mA del Uno');
}

{
  const c = circuito('nano');
  c.componentes.push(pieza('s', 'servo', { modelo: 'sg90' }));
  c.cables.push(cable('s.SIG', 'placa.D9'), cable('s.GND', 'placa.GND1'));
  const f = correr(nucleo(c, 'servo_barrido'), 100).foto;
  verificar(f.servos.s.angulo === 90 && f.servos.s.i === 0, 'Nano suelto: servo sin VCC no aparece conectado ni consume');
  const encendido = circuito('nano', 'roja');
  const n = nucleo(encendido, 'fijo13');
  const primero = correr(n, 80);
  const apagado = circuito('nano', 'roja', { alimentacion: 'apagada' });
  n.ponerCircuito(apagado);
  const durante = correr(n, 80, [333, 4801]);
  n.ponerCircuito(encendido);
  const vuelta = correr(n, 80);
  verificar(primero.texto.includes('Pin 13') && durante.texto === '' && vuelta.texto.includes('Pin 13'), 'quitar y reconectar la fuente reinicia el HEX y conserva el tiempo simulado');
  verificar(vuelta.foto.msSimulados >= 240 && vuelta.foto.energia.reinicios === 1, 'un ciclo de alimentación registra un reinicio sin retroceder el reloj');
}

{
  const fuente = { alimentacion: 'jack', voltiosJack: 3, expansion: 'exp' };
  const a = resolverAlimentacionNano(fuente, { realista: true });
  verificar(a.apagada && a.v5 < 2.7 && a.v33Expansion <= a.v5, 'bajo umbral de referencia la CPU espera; las salidas nunca superan alimentación');
  const c = circuito('nano', 'roja', { alimentacion: 'jack', voltajeJack: 3 });
  const f = correr(nucleo(c, 'parpadeo13', { limiteUSB: true }), 50).foto;
  verificar(f.energia.apagada && f.serial === '' && f.voltajes['exp.OUT_5V'] < 2.7 && f.voltajes['exp.OUT_5V'] > 0, 'CPU detenida por bajo voltaje conserva la tensión residual real en MNA');
  const u = correr(nucleo(circuito('uno'), 'parpadeo13', { limiteUSB: true }), 50).foto;
  verificar(!u.energia.referencia && u.energia.fusible === 0 && casi(u.energia.voltios, 5.11 - 1.66 * 0.05, 0.001), 'Uno conserva USB5.11V/R1.66Ω/reposo50mA y su fusible original');
}
{
  const c = circuito('nano', 'roja', { alimentacion: 'jack' });
  c.componentes.push(pieza('bat', 'bateria_lipo', { carga: 'nominal' }));
  c.cables.push(cable('bat.NEG', 'exp.JACK_POS'), cable('bat.POS', 'exp.JACK_GND'));
  const n = nucleo(c, 'parpadeo13', { limiteUSB: true });
  const f = correr(n, 30).foto;
  verificar(f.energia.apagada && f.medicion === null && n.fallas().some(x => x.tipo === 'bateria_invertida'), 'batería invertida al jack: CPU apagada y diagnóstico de polaridad explícito');
}
for (const fuente of ['placa.3V3', 'exp.OUT_3V3']) {
  const c = circuito('nano', 'azul');
  c.componentes.push(pieza('m', 'motor_tt'));
  c.cables.push(cable('m.A', fuente), cable('m.B', 'exp.GND_OUT'));
  const n = nucleo(c, 'parpadeo13', { limiteUSB: true });
  const f = correr(n, 200).foto;
  const motor = f.medicion.motores[0];
  const rail = fuente === 'placa.3V3' ? f.energia.voltios3V3 : f.energia.voltios3V3Expansion;
  verificar(motor.voltios > 2 && motor.i > 0.05 && f.piezas.m.rpm > 40 && rail < 3.3, `${fuente}: motor TT reconoce el riel y su consumo reduce la salida`);
  verificar(f.energia.amperios > 0.075 && f.energia.voltios < 4.99, `${fuente}: consumo del motor también cuenta en la alimentación común`);
  if (fuente === 'placa.3V3') verificar(n.fallas().some(x => x.tipo === 'nano_3v3_sobrecarga' && x.componente === 'placa.3V3'), 'módulo Nano: aviso de 50mA separado del límite supuesto de la expansión');
}
for (const variante of ['roja', 'azul']) for (const [primero, segundo] of [
  ['OUT_5V', 'OUT_5V_2'], ['OUT_3V3', 'OUT_3V3_2'], ['GND_OUT', 'GND_OUT_2'],
]) {
  const c = circuito('nano', variante);
  c.componentes.push(pieza('r', 'resistencia', { ohmios: 220 }));
  c.cables.push(cable('r.1', primero === 'GND_OUT' ? 'exp.OUT_5V' : 'exp.' + segundo),
    cable('r.2', primero === 'GND_OUT' ? 'exp.' + segundo : 'exp.GND_OUT'));
  const f = correr(nucleo(c, 'parpadeo13', { limiteUSB: true }), 50).foto;
  verificar(casi(f.voltajes['exp.' + primero], f.voltajes['exp.' + segundo]) && f.medicion.resistencias[0].i > 0.009,
    `${variante}: segundo contacto de ${primero} alimenta la carga y comparte la red correcta`);
  const d = JSON.parse(JSON.stringify(c));
  d.cables = d.cables.map(k => ({ de: k.de.replace('exp.' + segundo, 'exp.' + primero), a: k.a.replace('exp.' + segundo, 'exp.' + primero) }));
  const directo = correr(nucleo(d, 'parpadeo13', { limiteUSB: true }), 50).foto;
  verificar(casi(f.energia.voltios, directo.energia.voltios) && casi(f.energia.amperios, directo.energia.amperios),
    `${variante}: elegir uno u otro contacto de ${primero} conserva caída y consumo`);
}
console.log(`\nNano: ${comprobaciones} comprobaciones aprobadas; hardware pendiente.`);
