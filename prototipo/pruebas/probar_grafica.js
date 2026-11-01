// La gráfica de mediciones en el tiempo (MED-002), la parte que no toca la página, con Node: qué se puede medir, el
// límite de 6 medidas y de 2 unidades, la ventana de 10 s, el CSV y las muestras de una simulación de verdad.
// Uso: npm run probar:grafica   (arma pruebas/grafica.cjs con esbuild y corre este archivo)
const fs = require('fs');
const path = require('path');
const { medidasDe, sePuedeMarcar, crearRegistroGrafica, marcasEje, MAX_MEDIDAS, MAX_UNIDADES, VENTANA_MS, armarRed, crearNucleo, FRECUENCIA } = require('./grafica.cjs');

let fallos = 0;
let total = 0;
function revisar(condicion, texto) {
  total++;
  console.log((condicion ? 'OK    ' : 'FALLA ') + texto);
  if (!condicion) fallos++;
}
const cerca = (a, b, tol) => Math.abs(a - b) <= tol;

// El ejemplo con potenciómetro (T2): pin 9 → r1 (220 Ω) → LED, y el potenciómetro de 10 kΩ al 30 % en A0
const T2 = {
  formato: 1, placa: 'uno', protoboard: null,
  componentes: [
    { id: 'r1', tipo: 'resistencia', x: 0, y: 0, rot: 0, props: { ohmios: 220, vatios: 0.25 } },
    { id: 'led1', tipo: 'led', x: 0, y: 0, rot: 0, props: { color: 'rojo' } },
    { id: 'pot1', tipo: 'potenciometro', x: 0, y: 0, rot: 0, props: { ohmios: 10000, posicion: 0.3, modelo: '16mm' } },
  ],
  cables: [['placa.D9', 'r1.1'], ['r1.2', 'led1.anodo'], ['led1.catodo', 'placa.GND1'], ['pot1.GND', 'placa.GND2'], ['pot1.VCC', 'placa.5V'], ['pot1.SIG', 'placa.A0']]
    .map(([de, a]) => ({ de, a })),
};

// 1. La lista: voltaje y corriente de pines, resistencias, LED y potenciómetro, más el brillo, el PWM y el tramo
{
  const red = armarRed(T2);
  red.ponerPines({ D9: 1 });
  const m = { ...red.resolver(), pwm: { D9: 0.5 } };
  const lista = medidasDe(m);
  const ids = lista.map((x) => x.id);
  const esperados = ['D9.voltaje', 'D9.corriente', 'D9.pwm', 'pot1.voltaje', 'pot1.corriente', 'pot1.tramo_GND', 'r1.voltaje', 'r1.corriente',
    'led1.voltaje', 'led1.corriente', 'led1.brillo'];
  revisar(JSON.stringify(ids) === JSON.stringify(esperados), `la lista tiene todo lo medible, en el orden de la tabla: ${ids.join(', ')}`);
  const de = (id) => lista.find((x) => x.id === id);
  revisar(de('D9.voltaje').unidad === 'V' && de('D9.corriente').unidad === 'mA' && de('D9.pwm').unidad === '%' && de('pot1.tramo_GND').unidad === 'kΩ'
    && de('led1.brillo').unidad === '%', 'unidades: V, mA, % y kΩ');
  revisar(de('D9.pwm').valor === 50 && cerca(de('pot1.tramo_GND').valor, 3, 1e-9) && cerca(de('led1.corriente').valor, m.leds[0].i * 1000, 1e-9)
    && cerca(de('led1.brillo').valor, m.leds[0].brillo * 100, 1e-9), `valores: PWM 50 %, tramo 3 kΩ, LED ${de('led1.corriente').valor.toFixed(2)} mA y brillo ${de('led1.brillo').valor.toFixed(0)} %`);
  revisar(de('D9.voltaje').nombre === 'Pin 9 · voltaje' && de('pot1.tramo_GND').nombre === 'pot1 · tramo SIG–GND', `nombres: «${de('D9.voltaje').nombre}», «${de('pot1.tramo_GND').nombre}»`);
  revisar(cerca(de('pot1.voltaje').valor, 1.5, 0.005) && cerca(de('pot1.voltaje').valor / de('pot1.corriente').valor, 3, 0.001),
    'el potenciómetro da el voltaje y la corriente de su tramo, como la fila de MED-001 (V / mA = 3 kΩ)');
  // Un pin fijo (no está en pwm): 100 % en ALTO
  revisar(medidasDe({ ...m, pwm: {} }).find((x) => x.id === 'D9.pwm').valor === 100, 'un pin fijo en ALTO cuenta como PWM 100 %');
  revisar(medidasDe(null).length === 0, 'sin simulación no hay nada que medir');
}

// 2. Hasta 6 medidas y hasta 2 unidades
{
  const catalogo = new Map([
    ['a.voltaje', { unidad: 'V' }], ['b.voltaje', { unidad: 'V' }], ['c.voltaje', { unidad: 'V' }], ['d.voltaje', { unidad: 'V' }],
    ['a.corriente', { unidad: 'mA' }], ['b.corriente', { unidad: 'mA' }], ['c.corriente', { unidad: 'mA' }], ['a.brillo', { unidad: '%' }],
  ]);
  revisar(MAX_MEDIDAS === 6 && MAX_UNIDADES === 2, 'los límites: 6 medidas y 2 unidades');
  revisar(sePuedeMarcar(['a.voltaje'], 'a.corriente', catalogo).ok, 'V y mA juntos se pueden (un eje a cada lado)');
  const r = sePuedeMarcar(['a.voltaje', 'a.corriente'], 'a.brillo', catalogo);
  revisar(!r.ok && /Dos unidades/.test(r.motivo) && /%/.test(r.motivo), `una tercera unidad no: «${r.motivo}»`);
  const seis = ['a.voltaje', 'b.voltaje', 'c.voltaje', 'd.voltaje', 'a.corriente', 'b.corriente'];
  const r7 = sePuedeMarcar(seis, 'c.corriente', catalogo);
  revisar(!r7.ok && /Hasta 6/.test(r7.motivo), `la séptima no: «${r7.motivo}»`);
  revisar(sePuedeMarcar(seis, 'a.voltaje', catalogo).ok, 'una que ya está marcada sigue permitida');
}

// 3. La ventana: se llena sola hasta 10 s y después avanza, mostrando los últimos 10 s
{
  const r = crearRegistroGrafica();
  const m = (v) => ({ leds: [{ id: 'led1', v, i: 0.01, brillo: 0.5 }], pines: [], resistencias: [] });
  for (let t = 0; t <= 4000; t += 100) r.agregar(t, m(t / 1000));
  let w = r.ventana();
  revisar(w.tIni === 0 && w.tFin === VENTANA_MS && w.filas.length === 41, `a los 4 s: eje de 0 a 10 s con 41 muestras (${w.tIni}–${w.tFin}, ${w.filas.length})`);
  for (let t = 4100; t <= 25000; t += 100) r.agregar(t, m(t / 1000));
  w = r.ventana();
  revisar(w.tIni === 15000 && w.tFin === 25000 && w.filas[0].t === 15000 && w.filas[w.filas.length - 1].t === 25000,
    `a los 25 s: los últimos 10 s (${w.tIni / 1000}–${w.tFin / 1000} s)`);
  revisar(r.muestras.length === 251, `el registro guarda todo (251 muestras) para el CSV`);
  w = r.ventana(12000);
  revisar(w.tIni === 2000 && w.tFin === 12000 && w.filas[w.filas.length - 1].t === 12000, 'en pausa a los 12 s: la ventana de 2 a 12 s');
  revisar(!r.agregar(25000, m(1)) && !r.agregar(24000, m(1)) && r.muestras.length === 251, 'si el reloj simulado no avanza, no se agrega otra muestra');
  r.limpiar();
  revisar(r.muestras.length === 0 && r.catalogo.size === 3, 'borrar vacía las muestras y conserva la lista de medidas');
  r.agregar(0, m(1));
  r.reiniciar();
  revisar(r.muestras.length === 0 && r.catalogo.size === 0, 'otra simulación (reiniciar) vacía las muestras y la lista: el circuito pudo cambiar');
  const corto = crearRegistroGrafica(100);
  for (let t = 0; t < 1000; t++) corto.agregar(t, m(1));
  revisar(corto.muestras.length <= 105 && corto.muestras[corto.muestras.length - 1].t === 999, `con tope, se van las más viejas (${corto.muestras.length})`);
}

// 4. El CSV: para Excel en español, con las medidas marcadas
{
  const r = crearRegistroGrafica();
  r.agregar(0, { leds: [{ id: 'led1', v: 1.95, i: 0.0125, brillo: 0.8333 }], pines: [], resistencias: [] });
  r.agregar(50, { leds: [{ id: 'led1', v: 1.96, i: 0.01, brillo: 0.6667 }], pines: [], resistencias: [] });
  const csv = r.csv(['led1.voltaje', 'led1.corriente']);
  const filas = csv.slice(1).trim().split('\r\n');
  revisar(csv.charCodeAt(0) === 0xfeff && csv.endsWith('\r\n'), 'marca UTF-8 y fin de línea de Windows');
  revisar(filas[0] === 't_s;"led1 · voltaje (V)";"led1 · corriente (mA)"', `encabezado: ${filas[0]}`);
  revisar(filas[1] === '0;1,95;12,5' && filas[2] === '0,05;1,96;10', `filas con coma decimal: ${filas[1]} / ${filas[2]}`);
  revisar(r.csv().split('\r\n')[0].split(';').length === 4, 'sin marcadas, el CSV lleva todas las medidas');
}

// 5. Marcas de los ejes (las del graficador de TecnoBloques)
{
  revisar(JSON.stringify(marcasEje(0, 10, 5)) === '[0,2,4,6,8,10]' && JSON.stringify(marcasEje(0, 1, 4)) === '[0,0.5,1]', 'marcas redondas: 0, 2, 4… y 0, 0,5, 1');
}

// 6. Con una simulación de verdad (el núcleo con el programa del potenciómetro): las muestras avanzan con el tiempo simulado
{
  const hex = fs.readFileSync(path.join(__dirname, '..', 'programas', 'potenciometro.hex'), 'utf8');
  const n = crearNucleo({ hex, circuito: T2, activas: { danoComponentes: true, limitePin: true } });
  const r = crearRegistroGrafica();
  let ms = 0;
  for (let k = 0; k < 40; k++) {
    n.avanzar(FRECUENCIA * 0.05);
    ms += 50;
    r.agregar(ms, n.foto().medicion);
  }
  const ultima = r.muestras[r.muestras.length - 1].valores;
  revisar(r.muestras.length === 40 && r.catalogo.has('D9.pwm') && r.catalogo.has('led1.brillo') && r.catalogo.has('pot1.tramo_GND'),
    `40 muestras en 2 s simulados, con ${r.catalogo.size} medidas`);
  revisar(cerca(ultima['D9.pwm'], (Math.floor(Math.round(0.3 * 1024) / 4) / 255) * 100, 1) && cerca(ultima['pot1.voltaje'], 1.5, 0.01),
    `el pin 9 sigue a la perilla: PWM ${ultima['D9.pwm'].toFixed(1)} % y el centro a ${ultima['pot1.voltaje'].toFixed(2)} V`);
}

// Muestras de una simulación: cada 50 ms simulados durante `segundos`
function muestrear(circuito, programa, segundos) {
  const hex = fs.readFileSync(path.join(__dirname, '..', 'programas', programa + '.hex'), 'utf8');
  const n = crearNucleo({ hex, circuito, activas: { limiteUSB: true }, semilla: 1 });
  const r = crearRegistroGrafica();
  for (let ms = 50; ms <= segundos * 1000; ms += 50) {
    n.avanzar(FRECUENCIA * 0.05);
    r.agregar(ms, n.foto().medicion);
  }
  return r;
}
const maximo = (r, id) => Math.max(...r.muestras.map((x) => x.valores[id] ?? -Infinity));
const pieza = (id, tipo, props = {}) => ({ id, tipo, x: 0, y: 0, rot: 0, props });

// 7. La placa (pedido de Efraín del 1 nov): un Uno con un servo y un motor en el 5V y 330 Ω en el 3,3V
{
  const UNO = { formato: 1, placa: 'uno', protoboard: null,
    componentes: [pieza('s1', 'servo', { modelo: 'sg90' }), pieza('m1', 'motor_tt'), pieza('r1', 'resistencia', { ohmios: 330, vatios: 0.25 })],
    cables: [['s1.GND', 'placa.GND1'], ['s1.VCC', 'placa.5V'], ['s1.SIG', 'placa.D9'], ['m1.A', 'placa.5V'], ['m1.B', 'placa.GND2'],
      ['r1.1', 'placa.3V3'], ['r1.2', 'placa.GND3']].map(([de, a]) => ({ de, a })) };
  const r = muestrear(UNO, 'servo_barrido', 1.5);
  const ids = [...r.catalogo.keys()];
  const placa = ['placa_5V.voltaje', 'placa_5V.corriente', 'placa_3V3.voltaje', 'placa_3V3.corriente', 'alimentacion.corriente', 'alimentacion.pico', 'alimentacion.fusible'];
  revisar(JSON.stringify(ids.slice(-placa.length)) === JSON.stringify(placa) && ids.includes('s1.corriente') && ids.includes('m1.corriente'),
    `la placa al final de la lista, como en la tabla: ${ids.slice(-placa.length).join(', ')}`);
  const de = (id) => r.catalogo.get(id);
  revisar(de('placa_5V.corriente').nombre === '5V de la placa · corriente' && de('alimentacion.pico').nombre === 'USB (placa y circuito) · pico del último segundo'
    && de('alimentacion.fusible').unidad === '%', `nombres: «${de('placa_5V.corriente').nombre}», «${de('alimentacion.pico').nombre}»`);
  const u = r.muestras[r.muestras.length - 1].valores;
  revisar(cerca(u['placa_3V3.corriente'], 10, 0.05) && u['placa_3V3.voltaje'] === 3.3, `el 3,3V entrega 3,3 V / 330 Ω = ${u['placa_3V3.corriente'].toFixed(2)} mA`);
  // Frenando, el motor genera: su fila (|i|) puede pasar de lo que toma del 5V, nunca quedar por debajo
  revisar(cerca(u['placa_5V.corriente'], u['s1.corriente'] + u['m1.corriente'], 0.5)
    && r.muestras.every((x) => x.valores['placa_5V.corriente'] <= x.valores['s1.corriente'] + x.valores['m1.corriente'] + 0.5),
    `el 5V entrega lo del servo más lo del motor (${u['s1.corriente'].toFixed(1)} + ${u['m1.corriente'].toFixed(1)} mA)`);
  revisar(r.muestras.every((x) => x.valores['alimentacion.corriente'] > x.valores['placa_5V.corriente'] + x.valores['placa_3V3.corriente']),
    'el USB da más que las dos salidas juntas: también alimenta la placa');
  revisar(r.muestras.every((x) => x.valores['alimentacion.pico'] >= x.valores['alimentacion.corriente'] - 1e-9)
    && maximo(r, 'alimentacion.pico') - maximo(r, 'alimentacion.corriente') > 100,
    `el pico ve el arranque que el promedio esconde (${maximo(r, 'alimentacion.pico').toFixed(0)} frente a ${maximo(r, 'alimentacion.corriente').toFixed(0)} mA)`);
  revisar(u['alimentacion.fusible'] === 0 && cerca(u['placa_5V.voltaje'], 5.11 - 1.66 * u['alimentacion.corriente'] / 1000, 0.1),
    `con ${u['alimentacion.corriente'].toFixed(0)} mA el fusible no se calienta (aguanta 500) y el 5V baja con la corriente (${u['placa_5V.voltaje'].toFixed(2)} V)`);
}

// 8. El Nano con la expansión y jack: el 3,3V del módulo y el de la expansión van aparte, y no tiene fusible
{
  const NANO = { formato: 1, placa: 'nano', protoboard: null,
    componentes: [pieza('exp', 'shield_nano_io', { variante: 'roja', alimentacion: 'jack', voltajeJack: 9 }),
      pieza('r1', 'resistencia', { ohmios: 1000, vatios: 0.25 }), pieza('r2', 'resistencia', { ohmios: 220, vatios: 0.25 })],
    cables: [['r1.1', 'placa.3V3'], ['r1.2', 'exp.GND_OUT'], ['r2.1', 'exp.OUT_3V3'], ['r2.2', 'exp.GND_OUT_2']].map(([de, a]) => ({ de, a })) };
  const r = muestrear(NANO, 'nano_adc67', 0.5);
  const u = r.muestras[r.muestras.length - 1].valores;
  revisar(['placa_3V3.corriente', 'expansion_3V3.voltaje', 'expansion_3V3.corriente', 'alimentacion.voltaje'].every((k) => r.catalogo.has(k))
    && !r.catalogo.has('alimentacion.fusible') && r.catalogo.get('alimentacion.voltaje').nombre === 'Nano · alimentación · voltaje del jack',
    'Nano con jack: 3,3V del módulo y de la expansión, voltaje del jack y sin fusible');
  revisar(cerca(u['placa_3V3.corriente'], u['placa_3V3.voltaje'], 0.05) && cerca(u['expansion_3V3.corriente'], u['expansion_3V3.voltaje'] / 220 * 1000, 0.1),
    `cada 3,3V entrega lo de su resistencia (${u['placa_3V3.corriente'].toFixed(2)} y ${u['expansion_3V3.corriente'].toFixed(1)} mA)`);
  revisar(cerca(u['alimentacion.voltaje'], 9, 0.01), `el jack a ${u['alimentacion.voltaje'].toFixed(2)} V`);
}

// 9. Una medida que llega tarde (el programa configura el pin 9 después de la primera muestra) va en su lugar de la tabla
{
  const r = crearRegistroGrafica();
  const led = { id: 'led1', v: 2, i: 0.01, brillo: 0.5 };
  r.agregar(50, { leds: [led], pines: [], resistencias: [] });
  r.agregar(100, { leds: [led], pines: [{ pin: 'D9', v: 5, i: 0.01 }], resistencias: [] });
  revisar(JSON.stringify([...r.catalogo.keys()]) === '["D9.voltaje","D9.corriente","D9.pwm","led1.voltaje","led1.corriente","led1.brillo"]',
    `el pin 9 llega en la segunda muestra y va primero, como en la tabla: ${[...r.catalogo.keys()].join(', ')}`);
  r.agregar(150, { leds: [led], pines: [], resistencias: [] });
  revisar([...r.catalogo.keys()].length === 6 && r.muestras[0].valores['D9.voltaje'] === undefined,
    'una medida que deja de venir sigue en la lista; las muestras de antes no la tienen');
}

console.log(`\n${total - fallos}/${total} comprobaciones OK`);
process.exit(fallos ? 1 : 0);
