// Prueba el motor eléctrico con Node, sin navegador: leyes de circuitos, modelo del LED, fallas,
// convergencia y tiempo por solución. Al final imprime los valores esperados para comparar con el multímetro.
// Uso: npm run probar:motor   (arma pruebas/motor.cjs con esbuild y corre este archivo)
const { armarRed, revisarFallas, resolver, resistencia, fuenteVoltaje, LED, PinState } = require('./motor.cjs');

let fallos = 0;
function revisar(condicion, texto) {
  console.log((condicion ? 'OK    ' : 'FALLA ') + texto);
  if (!condicion) fallos++;
}
const mA = (i) => (i * 1000).toFixed(2).replace('.', ',') + ' mA';
const V = (v) => (v === null ? 'al aire' : v.toFixed(3).replace('.', ',') + ' V');
const TODAS = { danoComponentes: true, limitePin: true };

// Circuito de la tarea T1: pin → resistencia → LED → GND
function circuitoLed({ ohmios = 220, color = 'rojo', pin = 'D13', alReves = false, sinResistencia = false } = {}) {
  const [anodo, catodo] = alReves ? ['catodo', 'anodo'] : ['anodo', 'catodo'];
  const componentes = [{ id: 'led1', tipo: 'led', props: { color } }];
  const cables = [{ de: 'led1.' + catodo, a: 'placa.GND1' }];
  if (sinResistencia) cables.push({ de: 'placa.' + pin, a: 'led1.' + anodo });
  else {
    componentes.push({ id: 'r1', tipo: 'resistencia', props: { ohmios } });
    cables.push({ de: 'placa.' + pin, a: 'r1.1' }, { de: 'r1.2', a: 'led1.' + anodo });
  }
  return { formato: 1, placa: 'uno', componentes, cables };
}
function medir(circuito, estados = { D13: PinState.High }) {
  const red = armarRed(circuito);
  red.ponerPines(estados);
  return red.resolver();
}

// 1. Divisor de tensión: 5 V con dos resistencias de 1 kΩ dan exactamente 2,5 V
{
  const f = fuenteVoltaje(0, 5);
  f.fila = 2;
  const r = resolver({ nodos: 2, fuentes: 1, elementos: [f, resistencia(0, 1, 1000), resistencia(1, -1, 1000)] });
  revisar(Math.abs(r.x[1] - 2.5) < 1e-6 && r.iteraciones === 1, `divisor 1 kΩ + 1 kΩ: ${V(r.x[1])} (lineal: ${r.iteraciones} vuelta)`);
}

// 2. LED rojo con 220 Ω: converge y la corriente es la misma en el pin, la resistencia y el LED (Kirchhoff)
{
  const m = medir(circuitoLed());
  const [ip, ir, il] = [m.pines[0].i, m.resistencias[0].i, m.leds[0].i];
  revisar(m.convergio, `220 Ω converge en ${m.iteraciones} vueltas`);
  revisar(Math.abs(ip - ir) < 1e-9 && Math.abs(ir - il) < 1e-9, `misma corriente en pin, resistencia y LED: ${mA(il)}`);
  revisar(il > 0.010 && il < 0.014, `corriente con 220 Ω entre 10 y 14 mA: ${mA(il)}`);
}

// 3. El modelo del LED da su voltaje directo a 20 mA: con 25 Ω del pin + 125 Ω, I = (5 − 2,0) / 150 = 20 mA
{
  const m = medir(circuitoLed({ ohmios: 125 }));
  revisar(Math.abs(m.leds[0].i - 0.02) < 0.0002 && Math.abs(m.leds[0].v - LED.vf.rojo) < 0.01,
    `LED rojo a ${mA(m.leds[0].i)}: ${V(m.leds[0].v)} (hoja de datos: 2,0 V a 20 mA)`);
}

// 4. Sin resistencia: el LED se quema y el pin pasa de su límite
{
  const m = medir(circuitoLed({ sinResistencia: true }));
  const tipos = revisarFallas(m, TODAS).map((f) => f.tipo).sort();
  revisar(tipos.join() === 'corriente_pin,led_quemado', `sin resistencia: ${mA(m.leds[0].i)} → fallas: ${tipos.join(', ')}`);
  revisar(revisarFallas(m, {}).length === 0, 'en modo ideal, las mismas corrientes no dan fallas');
}

// 5. LED al revés: casi nada de corriente y ninguna falla
{
  const m = medir(circuitoLed({ alReves: true }));
  revisar(Math.abs(m.leds[0].i) < 1e-9 && revisarFallas(m, TODAS).length === 0, `LED al revés: ${m.leds[0].i.toExponential(1)} A, sin fallas`);
}

// 6. El pin en BAJO recibe corriente: 5V → resistencia → LED → D13 en BAJO
{
  const c = { formato: 1, placa: 'uno', componentes: [{ id: 'r1', tipo: 'resistencia', props: { ohmios: 220 } }, { id: 'led1', tipo: 'led', props: { color: 'rojo' } }],
    cables: [{ de: 'placa.5V', a: 'r1.1' }, { de: 'r1.2', a: 'led1.anodo' }, { de: 'led1.catodo', a: 'placa.D13' }] };
  const bajo = medir(c, { D13: PinState.Low });
  const alto = medir(c, { D13: PinState.High });
  revisar(bajo.pines[0].i < -0.01 && alto.leds[0].i < 1e-6, `pin en BAJO recibe ${mA(-bajo.pines[0].i)}; en ALTO el LED se apaga`);
}

// 7. Pin en ALTO directo a GND: el pin pasa de su límite (≈ 200 mA)
{
  const m = medir({ formato: 1, placa: 'uno', componentes: [], cables: [{ de: 'placa.D13', a: 'placa.GND2' }] });
  revisar(revisarFallas(m, TODAS).some((f) => f.tipo === 'corriente_pin'), `pin 13 en ALTO unido a GND: ${mA(m.pines[0].i)}, falla del pin`);
}

// 8. 5V unido a GND: cortocircuito detectado antes de resolver
{
  const red = armarRed({ formato: 1, placa: 'uno', componentes: [], cables: [{ de: 'placa.5V', a: 'placa.GND1' }] });
  revisar(red.fallasFijas[0]?.tipo === 'cortocircuito', `5V a GND: «${red.fallasFijas[0]?.mensaje}»`);
}

// 9. Convergencia en un barrido de 0 Ω a 1 MΩ y con todos los colores
{
  let peor = 0;
  let todas = true;
  for (const color of Object.keys(LED.vf)) {
    for (const ohmios of [0.001, 1, 10, 47, 100, 220, 330, 1000, 4700, 10000, 100000, 1e6]) {
      const m = medir(circuitoLed({ ohmios, color }));
      todas = todas && m.convergio;
      peor = Math.max(peor, m.iteraciones);
    }
  }
  revisar(todas, `converge en los 60 casos (5 colores × 12 resistencias), peor caso: ${peor} vueltas`);
}

// 9b. Protoboard (prototipo 4): las patas encajadas y las tiras unen igual que los cables
{
  const pb = (resistenciaEn) => ({
    formato: 1,
    placa: 'uno',
    protoboard: { tipo: 'media', x: 300, y: 30 },
    componentes: [
      { id: 'r1', tipo: 'resistencia', props: { ohmios: 220 }, en: resistenciaEn },
      { id: 'led1', tipo: 'led', props: { color: 'rojo' }, en: { catodo: 'protoboard.a12', anodo: 'protoboard.a13' } },
    ],
    cables: [
      { de: 'placa.D13', a: 'protoboard.a19' },
      { de: 'protoboard.e12', a: 'protoboard.i-12' },
      { de: 'protoboard.i-2', a: 'placa.GND2' },
    ],
  });
  const directo = medir(circuitoLed()).leds[0].i;
  const enTira = medir(pb({ 1: 'protoboard.c13', 2: 'protoboard.c19' })).leds[0].i;
  revisar(Math.abs(enTira - directo) < 1e-9, `en la protoboard el LED con 220 Ω da lo mismo que con cables: ${mA(enTira)}`);
  // La misma resistencia en la otra mitad (f–j): el canal central corta la tira, así que no hay circuito
  const cortado = medir(pb({ 1: 'protoboard.g13', 2: 'protoboard.g19' })).leds[0].i;
  revisar(Math.abs(cortado) < 1e-9, `con la resistencia en la otra mitad (f–j) no pasa corriente: el canal central separa las tiras (${mA(cortado)})`);
}

// 9c. La shield une su conector de servo con el 5V, el GND y el D9/D10 del Uno: lo que se conecta ahí da lo mismo que
//     con un cable directo a la placa (revisión de Codex del 11 oct, R1: antes daba 0 mA por la shield).
{
  const SHIELD = { id: 'shield1', tipo: 'shield_l293d', props: { puentePWR: false } };
  const r1k = { id: 'r1', tipo: 'resistencia', props: { ohmios: 1000 } };
  const directo = medir({ formato: 1, placa: 'uno', componentes: [r1k], cables: [{ de: 'placa.5V', a: 'r1.1' }, { de: 'r1.2', a: 'placa.GND1' }] });
  const porShield = medir({ formato: 1, placa: 'uno', componentes: [SHIELD, r1k], cables: [{ de: 'shield1.S2_POS', a: 'r1.1' }, { de: 'r1.2', a: 'shield1.S2_GND' }] });
  const [id, is] = [directo.resistencias[0].i, porShield.resistencias[0].i];
  revisar(Math.abs(id - 0.005) < 1e-6 && Math.abs(is - id) < 1e-9 && porShield.fuentes.length === 1,
    `1 kΩ en el + y el − del conector de servo de la shield: ${mA(is)}, lo mismo que con cables al 5V y GND (${mA(id)})`);
  // LED con 220 Ω en la señal del servo 2 de la shield (es el D9 del Uno)
  const led = circuitoLed({ pin: 'D9' });
  const ledShield = { ...led, componentes: [SHIELD, ...led.componentes], cables: led.cables.map((c) => (c.de === 'placa.D9' ? { ...c, de: 'shield1.S2_SIG' } : c)) };
  const a = medir(led, { D9: PinState.High });
  const b = medir(ledShield, { D9: PinState.High });
  revisar(a.leds[0].i > 0.01 && Math.abs(b.leds[0].i - a.leds[0].i) < 1e-9 && Math.abs(b.voltajes['placa.D9'] - a.voltajes['placa.D9']) < 1e-9,
    `LED con 220 Ω en la señal S2 de la shield con D9 en ALTO: ${mA(b.leds[0].i)} y el pin 9 a ${V(b.voltajes['placa.D9'])}, igual que con el cable al pin 9`);
  // Un cable del + al − de los conectores de servo une el 5V con GND por dentro de la shield
  const corto = armarRed({ formato: 1, placa: 'uno', componentes: [SHIELD], cables: [{ de: 'shield1.S2_POS', a: 'shield1.S1_GND' }] });
  revisar(corto.fallasFijas.some((f) => f.tipo === 'cortocircuito' && f.componente === 'placa.5V'), 'un cable del + al − del conector de servo es un corto del 5V a GND, como en la placa');
  // La shield sola, sin nada en sus conectores, no crea fuentes ni pines
  const sola = medir({ formato: 1, placa: 'uno', componentes: [SHIELD], cables: [] });
  revisar(sola.fuentes.length === 0 && sola.pines.length === 0, 'la shield sola, sin nada en sus conectores, no conecta ningún pin');
}

// 9d. El chip entero aguanta 200 mA por sus patas VCC y otros 200 mA por las GND (R4): cada pin puede estar bajo
//     40 mA y la suma pasarse. Diez LED rojos con 100 Ω en los pines 2 a 11, todos en ALTO.
{
  const diez = Array.from({ length: 10 }, (_, k) => 'D' + (k + 2));
  const circuito = { formato: 1, placa: 'uno', componentes: [], cables: [] };
  for (const pin of diez) {
    circuito.componentes.push({ id: 'r' + pin, tipo: 'resistencia', props: { ohmios: 100 } }, { id: 'led' + pin, tipo: 'led', props: { color: 'rojo' } });
    circuito.cables.push({ de: 'placa.' + pin, a: 'r' + pin + '.1' }, { de: 'r' + pin + '.2', a: 'led' + pin + '.anodo' }, { de: 'led' + pin + '.catodo', a: 'placa.GND1' });
  }
  const alto = Object.fromEntries(diez.map((p) => [p, PinState.High]));
  const m = medir(circuito, alto);
  const fallas = revisarFallas(m, TODAS);
  const total = m.pines.reduce((t, p) => t + p.i, 0);
  revisar(fallas.length === 1 && fallas[0].tipo === 'corriente_chip' && fallas[0].componente === 'placa.VCC',
    `diez LED con 100 Ω: cada pin da ${mA(m.pines[0].i)} (bajo 40 mA), pero entre todos ${mA(total)}: ${fallas.map((f) => f.tipo).join(', ')} «${fallas[0] && fallas[0].mensaje}»`);
  const ocho = medir(circuito, Object.fromEntries(diez.slice(0, 8).map((p) => [p, PinState.High])));
  revisar(!revisarFallas(ocho, TODAS).length, `con ocho de ellos en ALTO (${mA(ocho.pines.reduce((t, p) => t + Math.max(0, p.i), 0))}) no hay falla`);
  // Lo que reciben los pines en BAJO sale por las patas GND: se suma aparte de lo que entregan
  const pines = (n, amperios) => Array.from({ length: n }, (_, k) => ({ pin: 'D' + (k + 2), i: amperios }));
  const recibe = revisarFallas({ leds: [], resistencias: [], pines: pines(8, -0.03) }, TODAS);
  revisar(recibe.length === 1 && recibe[0].componente === 'placa.GND', 'ocho pines en BAJO que reciben 30 mA cada uno (240 mA) pasan del límite de GND');
  const mitad = revisarFallas({ leds: [], resistencias: [], pines: [...pines(6, 0.03), ...pines(6, -0.03)] }, TODAS);
  revisar(!mitad.length, 'seis pines que entregan y seis que reciben 30 mA (180 mA por cada lado) no pasan del límite');
  revisar(!revisarFallas(m, { danoComponentes: true }).length, 'sin la no idealidad limitePin, el límite del chip tampoco se revisa');
}

// 10. Tiempo por solución
{
  const red = armarRed(circuitoLed());
  red.ponerPines({ D13: PinState.High });
  const N = 2000;
  let t = process.hrtime.bigint();
  for (let k = 0; k < N; k++) red.resolver();
  const caliente = Number(process.hrtime.bigint() - t) / 1e3 / N;
  t = process.hrtime.bigint();
  for (let k = 0; k < 200; k++) {
    const r = armarRed(circuitoLed());
    r.ponerPines({ D13: PinState.High });
    r.resolver();
  }
  const frio = Number(process.hrtime.bigint() - t) / 1e3 / 200;
  revisar(caliente < 200, `una solución tarda ${caliente.toFixed(1)} µs arrancando de la anterior y ${frio.toFixed(1)} µs desde cero`);
}

// Valores esperados para comparar con el multímetro (programa «D13 siempre en ALTO»)
console.log('\nValores esperados con el pin 13 en ALTO, resistencia y LED rojo a GND:');
console.log('  Resistencia │ Corriente │ V del LED │ V de la resistencia │ V del pin 13');
for (const ohmios of [220, 330, 1000]) {
  const m = medir(circuitoLed({ ohmios }));
  const fila = [mA(m.leds[0].i), V(m.leds[0].v), V(m.resistencias[0].v), V(m.pines[0].v)];
  console.log(`  ${String(ohmios).padStart(7)} Ω   │ ${fila[0].padStart(9)} │ ${fila[1].padStart(9)} │ ${fila[2].padStart(19)} │ ${fila[3].padStart(12)}`);
}

// Regresión contra la placa real: las medidas del multímetro (validacion/) deben seguir dentro del criterio.
// El error se calcula respecto de la medida, |simulador − medida| / |medida| (decisión de Efraín, 11 oct 2026), y la
// incertidumbre del multímetro va aparte: una comparación cumple si |simulador − medida| ≤ criterio · |medida| + U.
// UT33B+ en voltios DC: ±(0,5 % de la lectura + 2 dígitos). Las lecturas tienen dos decimales (4,69 V, 2,61 V):
// escala de 20 V, 1 dígito = 0,01 V. La corriente se calculó como V de la resistencia / R, así que lleva la misma
// incertidumbre relativa que ese voltaje (la de la resistencia medida no se cuenta).
{
  const archivo = require('path').join(__dirname, '..', '..', 'validacion', 'led-rojo-multimetro.json');
  const datos = JSON.parse(require('fs').readFileSync(archivo, 'utf8'));
  const { voltaje, corriente } = datos.criterio;
  const UT33B = { lectura: 0.005, digitos: 2, resolucionV: 0.01 };
  const incertidumbreV = (v) => UT33B.lectura * Math.abs(v) + UT33B.digitos * UT33B.resolucionV;
  const pct = (x) => (x * 100).toFixed(2).replace('.', ',') + ' %';
  // Una comparación: error respecto de la medida, si cumple el criterio solo y si cumple sumando la incertidumbre.
  const comparar = (sim, real, criterio, u, unidad = 'V') => {
    const dif = Math.abs(sim - real);
    return { error: dif / Math.abs(real), solo: dif <= criterio * Math.abs(real), conU: dif <= criterio * Math.abs(real) + u, u: unidad === 'V' ? u : u * 1000, unidad: unidad === 'V' ? 'V' : 'mA' };
  };
  let total = 0;
  let solo = 0;
  let conU = 0;
  for (const d of datos.medidas) {
    const ohmios = d.ohmios_medido || d.ohmios_nominal;
    const m = medir(circuitoLed({ ohmios }));
    const iReal = d.v_resistencia / ohmios;
    const c = [
      comparar(m.pines[0].v, d.v_pin, voltaje, incertidumbreV(d.v_pin)),
      comparar(m.leds[0].v, d.v_led, voltaje, incertidumbreV(d.v_led)),
      comparar(m.resistencias[0].v, d.v_resistencia, voltaje, incertidumbreV(d.v_resistencia)),
      comparar(m.leds[0].i, iReal, corriente, iReal * (incertidumbreV(d.v_resistencia) / d.v_resistencia), 'A'),
    ];
    total += c.length;
    solo += c.filter((x) => x.solo).length;
    conU += c.filter((x) => x.conU).length;
    const peorV = c.slice(0, 3).reduce((a, b) => (b.error > a.error ? b : a));
    const limite = c.filter((x) => !x.solo && x.conU).map((x) => `${pct(x.error)} queda en el límite: cumple con la incertidumbre del multímetro (±${x.u.toFixed(3).replace('.', ',')} ${x.unidad})`);
    revisar(c.every((x) => x.conU),
      `placa real con ${ohmios} Ω: voltajes hasta ${pct(peorV.error)} y corriente a ${pct(c[3].error)} de la medida (criterio ${voltaje * 100} % y ${corriente * 100} %)${limite.length ? '; ' + limite.join('; ') : ''}`);
  }
  revisar(conU === total, `LED rojo del 7 oct: ${solo} de ${total} comparaciones dentro del criterio y ${conU} de ${total} sumando la incertidumbre del UT33B+`);
}

console.log('\n' + (fallos ? `${fallos} FALLAS` : 'TODO BIEN'));
process.exit(fallos ? 1 : 0);
