// Catálogo del prototipo: qué dibujo de @wokwi/elements usa cada pieza, cómo se llaman sus pines
// en el contrato y qué lee el aprendiz al pasar el mouse por un pin.
// Las piezas Tecno (dibujo propio, sin Wokwi) traen `dibujo` en vez de `etiqueta`: ver src/piezas/.

import { MODELOS_SERVO, TAMANO_SERVO, PINES_SERVO, dibujarServo, giroBrazo } from './piezas/servo.js';
import { TAMANO_SHIELD, PINES_SHIELD, ROTULOS_SHIELD, dibujarShield, mostrarShield } from './piezas/shield_l293d.js';
import { vistaMotor, pinesMotor, dibujarMotor, mostrarMotor } from './piezas/motor_tt.js';
import { CARGAS_LIPO, TAMANO_LIPO, PINES_LIPO, dibujarLipo, mostrarLipo } from './piezas/bateria_lipo.js';
import { PROBADOR, TAMANO_PROBADOR, PINES_PROBADOR, dibujarProbador, mostrarProbador } from './piezas/probador_lipo.js';
import { TAMANO_NANO, PINES_NANO, dibujarNano, mostrarNano } from './piezas/nano.js';
import { TAMANO_EXPANSION, pinesExpansion, dibujarExpansion, mostrarExpansion, ROTULOS_EXPANSION } from './piezas/shield_nano_io.js';
import { TAMANO_UNO, PINES_UNO, dibujarUno, mostrarUno } from './piezas/uno.js';

const rotuloNano = (pin) => {
  if (/^A[67]$/.test(pin)) return `${pin} · solo entrada analógica (sin salida digital)`;
  if (/^A[0-5]$/.test(pin)) return `${pin} · entrada analógica y digital`;
  if (/^D\d+$/.test(pin)) return `Pin ${pin.slice(1)}${['D3', 'D5', 'D6', 'D9', 'D10', 'D11'].includes(pin) ? ' · PWM ~' : ''}${pin === 'D0' ? ' · RX' : pin === 'D1' ? ' · TX' : ''}`;
  if (pin.startsWith('GND')) return 'GND · tierra (−)';
  if (pin.startsWith('RESET')) return 'RESET · reinicia el Nano';
  return { '5V': '5V · alimentación del Nano', '3V3': '3,3V · salida del módulo Nano', VIN: 'VIN · entrada del módulo Nano', AREF: 'AREF · referencia analógica', SDA: 'SDA · el mismo A4', SCL: 'SCL · el mismo A5', MOSI: 'MOSI · el mismo D11', MISO: 'MISO · el mismo D12', SCK: 'SCK · el mismo D13', SS: 'SS · el mismo D10' }[pin] || pin;
};
const definicionNano = (nombre) => ({ nombre, dibujo: { ...TAMANO_NANO, pines: PINES_NANO, svg: dibujarNano }, rotulo: rotuloNano, mostrar: mostrarNano });

// En el orden del código de colores de las resistencias: la tecla 0 a 9 elige el color de ese número.
// Las claves son las del contrato; «morado» se conserva por los circuitos ya guardados y se muestra como violeta.
export const COLORES_CABLE = {
  negro: '#2b2b2b', // 0
  marron: '#8b5a2b', // 1
  rojo: '#d7263d', // 2
  naranja: '#f28c28', // 3
  amarillo: '#e8c20c', // 4
  verde: '#2e9e44', // 5
  azul: '#2f6fde', // 6
  morado: '#8e44ad', // 7
  gris: '#9aa0a6', // 8
  blanco: '#f4f4f4', // 9
};
export const CODIGO_COLORES = Object.keys(COLORES_CABLE); // posición = número del código
export const NOMBRE_COLOR = { marron: 'marrón', morado: 'violeta' }; // el resto se escribe igual que la clave

// Convención del aula: negro a tierra, rojo al positivo, verde para señales.
export function colorPorDefecto(de, a) {
  const refs = [de, a];
  if (refs.some((r) => /^placa\.GND/.test(r) || /^protoboard\.[si]-/.test(r))) return 'negro'; // GND o riel −
  if (refs.some((r) => /^placa\.(5V|3V3|VIN)$/.test(r) || /^protoboard\.[si]\+/.test(r))) return 'rojo'; // 5V o riel +
  return 'verde';
}

const PWM_UNO = ['3', '5', '6', '9', '10', '11'];

export const PLACAS = {
  uno: {
    nombre: 'Arduino Uno',
    // Pieza Tecno (src/piezas/uno.js). Cada pin físico tiene nombre propio (la placa tiene tres GND), porque un cable
    // llega a un agujero concreto.
    dibujo: { ...TAMANO_UNO, pines: PINES_UNO, svg: dibujarUno },
    mostrar: mostrarUno,
    rotulo(pin) {
      if (pin === 'D0') return 'Pin 0 · RX del monitor serial';
      if (pin === 'D1') return 'Pin 1 · TX del monitor serial';
      if (/^D\d+$/.test(pin)) return 'Pin ' + pin.slice(1) + (PWM_UNO.includes(pin.slice(1)) ? ' · PWM ~' : '');
      if (/^A\d$/.test(pin)) return pin + ' · entrada analógica';
      if (pin.startsWith('GND')) return 'GND · tierra (−)';
      return {
        '5V': '5V · positivo (+)',
        '3V3': '3,3V · positivo (+)',
        VIN: 'VIN · entrada de la fuente',
        SDA: 'SDA · I2C (es el mismo A4)',
        SCL: 'SCL · I2C (es el mismo A5)',
        AREF: 'AREF · referencia analógica',
        IOREF: 'IOREF',
        RESET: 'RESET · reinicia la placa',
      }[pin] || pin;
    },
  },
  nano: definicionNano('Arduino Nano'),
  nano_old: definicionNano('Arduino Nano (bootloader antiguo)'),
};

export const TIPOS = {
  shield_nano_io: {
    // Va montada debajo del Nano (`debajo`), como en la mesa, y su LED de encendido sigue a la placa (`sigueAPlaca`).
    nombre: 'Expansión E/S del Nano', prefijo: 'exp', montada: true, debajo: true, sigueAPlaca: true, placas: ['nano', 'nano_old'],
    props: { variante: 'roja', alimentacion: 'usb', voltajeJack: 9 },
    dibujo: { marco: (props) => ({ ...TAMANO_EXPANSION, pines: pinesExpansion(props) }), svg: dibujarExpansion },
    mostrar: mostrarExpansion,
    rotulo: (pin) => ROTULOS_EXPANSION[pin] || pin,
    campos: [
      { prop: 'variante', etiqueta: 'Tarjeta', opciones: [['roja', 'Roja'], ['azul', 'Azul']] },
      { prop: 'alimentacion', etiqueta: 'Alimentación', opciones: [['usb', 'USB del Nano'], ['jack', 'Jack de la expansión'], ['apagada', 'Desconectada']] },
      { prop: 'voltajeJack', etiqueta: 'Fuente en el jack', opciones: [[0, '0 V'], [5, '5 V'], [7, '7 V'], [9, '9 V'], [12, '12 V']] },
    ],
  },
  resistencia: {
    nombre: 'Resistencia',
    etiqueta: 'wokwi-resistor',
    prefijo: 'r',
    props: { ohmios: 220 },
    nombrePin: (n) => ({ 1: '1', 2: '2' })[n],
    rotulo: (pin) => 'pata ' + pin,
    campo: {
      prop: 'ohmios',
      etiqueta: 'Valor',
      opciones: [[220, '220 Ω'], [330, '330 Ω'], [1000, '1 kΩ'], [10000, '10 kΩ']],
    },
    aplicar(el, props) {
      el.value = String(props.ohmios);
    },
  },
  led: {
    nombre: 'LED',
    etiqueta: 'wokwi-led',
    prefijo: 'led',
    props: { color: 'rojo' },
    nombrePin: (n) => ({ A: 'anodo', C: 'catodo' })[n],
    rotulo: (pin) => ({ anodo: 'ánodo (+), pata larga', catodo: 'cátodo (−), pata corta' })[pin] || pin,
    campo: {
      prop: 'color',
      etiqueta: 'Color',
      opciones: [['rojo', 'Rojo'], ['verde', 'Verde'], ['amarillo', 'Amarillo'], ['azul', 'Azul'], ['blanco', 'Blanco']],
    },
    aplicar(el, props) {
      el.color = { rojo: 'red', verde: 'green', amarillo: 'yellow', azul: 'blue', blanco: 'white' }[props.color] || 'red';
    },
  },
  // Tarea T1. Botón de 4 patas: las dos patas con el mismo número están unidas por dentro (1i con 1d, 2i con 2d)
  // y al presionar se une la 1 con la 2. Se presiona con el mouse mientras la simulación corre.
  pulsador: {
    nombre: 'Botón',
    etiqueta: 'wokwi-pushbutton',
    prefijo: 'btn',
    props: { color: 'rojo' },
    nombrePin: (n) => ({ '1.l': '1i', '1.r': '1d', '2.l': '2i', '2.r': '2d' })[n],
    rotulo: (pin) =>
      ({
        '1i': 'pata 1 · unida por dentro con la otra pata 1',
        '1d': 'pata 1 · unida por dentro con la otra pata 1',
        '2i': 'pata 2 · unida por dentro con la otra pata 2',
        '2d': 'pata 2 · unida por dentro con la otra pata 2',
      })[pin] || pin,
    campo: {
      prop: 'color',
      etiqueta: 'Color',
      opciones: [['rojo', 'Rojo'], ['verde', 'Verde'], ['azul', 'Azul'], ['amarillo', 'Amarillo'], ['blanco', 'Blanco'], ['negro', 'Negro']],
    },
    aplicar(el, props) {
      el.color = { rojo: 'red', verde: 'green', azul: 'blue', amarillo: 'yellow', blanco: 'white', negro: 'black' }[props.color] || 'red';
    },
  },
  // Tarea T3. Pieza Tecno: microservo SG90 o MG90S (src/piezas/servo.js). El núcleo lee el ancho del pulso del pin
  // al que va la señal y gira el brazo; el modelo cambia el dibujo, el consumo y la velocidad.
  servo: {
    nombre: 'Servo',
    prefijo: 'servo',
    props: { modelo: 'sg90' },
    dibujo: {
      ancho: TAMANO_SERVO.ancho,
      alto: TAMANO_SERVO.alto,
      pines: PINES_SERVO,
      svg: (props) => dibujarServo(props.modelo, 90),
    },
    rotulo: (pin) =>
      ({
        GND: 'GND · cable marrón: va a tierra (−)',
        VCC: 'VCC · cable rojo: va a 5V (+)',
        SIG: 'Señal · cable naranja: va al pin que manda los pulsos',
      })[pin] || pin,
    campo: {
      prop: 'modelo',
      etiqueta: 'Modelo',
      opciones: Object.entries(MODELOS_SERVO).map(([k, d]) => [k, `${d.nombre} (engranajes de ${d.engranajes})`]),
    },
    // Cambiar el modelo redibuja la pieza (el color y el rótulo cambian).
    aplicar(el, props) {
      const nuevo = new DOMParser().parseFromString(dibujarServo(props.modelo, 90), 'image/svg+xml').documentElement;
      el.replaceChildren(...[...nuevo.childNodes].map((n) => el.ownerDocument.importNode(n, true)));
    },
    // Mientras se simula, el brazo va al ángulo que calcula el núcleo.
    mostrar(el, estado) {
      const brazo = el.querySelector('[data-brazo]');
      if (brazo) brazo.setAttribute('transform', giroBrazo(estado && typeof estado.angulo === 'number' ? estado.angulo : 90));
    },
  },
  // Tarea T3. Pieza Tecno: la shield de motores L293D (src/piezas/shield_l293d.js). Va montada sobre el Uno: no se
  // arrastra ni se gira, y hay una sola. Sus pines son los bornes de los motores, EXT_PWR y los conectores de servo.
  shield_l293d: {
    nombre: 'Shield L293D',
    prefijo: 'shield',
    montada: true,
    placas: ['uno'],
    props: { puentePWR: true },
    dibujo: { ancho: TAMANO_SHIELD.ancho, alto: TAMANO_SHIELD.alto, pines: PINES_SHIELD, svg: (props) => dibujarShield(props.puentePWR !== false) },
    rotulo: (pin) => ROTULOS_SHIELD[pin] || pin,
    campos: [{ prop: 'puentePWR', etiqueta: 'Puente PWR', opciones: [[true, 'puesto (la batería también alimenta el Uno)'], [false, 'quitado']] }],
    aplicar(el, props) {
      const nuevo = new DOMParser().parseFromString(dibujarShield(props.puentePWR !== false), 'image/svg+xml').documentElement;
      el.replaceChildren(...[...nuevo.childNodes].map((n) => el.ownerDocument.importNode(n, true)));
    },
    mostrar: mostrarShield,
  },
  // Tarea T3. Pieza Tecno: motorreductor TT de 6 V (src/piezas/motor_tt.js), con dos vistas y su lado del robot.
  // La vista cambia el tamaño del dibujo: el lienzo lo rehace al cambiarla (dibujo.marco).
  motor_tt: {
    nombre: 'Motor TT',
    prefijo: 'motor',
    props: { vista: 'eje', lado: 'izquierdo' },
    dibujo: {
      marco: (props) => ({ ...vistaMotor(props), pines: pinesMotor(props) }),
      svg: (props) => dibujarMotor(props),
    },
    rotulo: (pin) => ({ A: 'borne A del motor (cable rojo)', B: 'borne B del motor (cable negro)' })[pin] || pin,
    campos: [
      { prop: 'vista', etiqueta: 'Vista', opciones: [['eje', 'solo el eje (RPM)'], ['rueda', 'con la rueda']] },
      { prop: 'lado', etiqueta: 'Lado del robot', opciones: [['izquierdo', 'izquierdo'], ['derecho', 'derecho']] },
    ],
    mostrar(el, estado, props) {
      mostrarMotor(el, props || {}, estado);
    },
  },
  // Tarea T3. Pieza Tecno: batería LiPo 2S (src/piezas/bateria_lipo.js), con cuatro estados de carga y su cable de balance.
  bateria_lipo: {
    nombre: 'Batería LiPo 2S',
    prefijo: 'bateria',
    props: { carga: 'nominal' },
    dibujo: { ancho: TAMANO_LIPO.ancho, alto: TAMANO_LIPO.alto, pines: PINES_LIPO, svg: (props) => dibujarLipo(props.carga) },
    rotulo: (pin) =>
      ({
        POS: '+ · cable rojo de potencia',
        NEG: '− · cable negro de potencia',
        BAL0: 'balance − · el mismo − de la batería',
        BAL1: 'balance · entre la celda 1 y la 2',
        BAL2: 'balance + · el mismo + de la batería',
      })[pin] || pin,
    campos: [
      {
        prop: 'carga',
        etiqueta: 'Carga',
        opciones: Object.entries(CARGAS_LIPO).map(([k, c]) => [k, `${c.nombre} (${String(c.voltios).replace('.', ',')} V: ${c.celdas.map((v) => String(v).replace('.', ',')).join(' + ')})`]),
      },
    ],
    aplicar(el, props) {
      const nuevo = new DOMParser().parseFromString(dibujarLipo(props.carga), 'image/svg+xml').documentElement;
      el.replaceChildren(...[...nuevo.childNodes].map((n) => el.ownerDocument.importNode(n, true)));
    },
    mostrar(el, estado, props) {
      mostrarLipo(el, (props || {}).carga, estado);
    },
  },
  // Tarea T3. Pieza Tecno: probador de celdas LiPo 1-8S con zumbador (src/piezas/probador_lipo.js). Se conecta al
  // cable de balance; muestra el total, el número de celdas y cada celda, y pita si una baja del umbral.
  probador_lipo: {
    nombre: 'Probador de celdas',
    prefijo: 'probador',
    props: { umbral: PROBADOR.umbralV },
    dibujo: { ancho: TAMANO_PROBADOR.ancho, alto: TAMANO_PROBADOR.alto, pines: PINES_PROBADOR, svg: (props) => dibujarProbador(props.umbral) },
    rotulo: (pin) => (pin === 'NEG' ? '− · al negro del balance' : `celda ${pin.slice(1)} · al + de la celda ${pin.slice(1)}`),
    campos: [
      {
        prop: 'umbral',
        etiqueta: 'Alarma (pita por debajo de)',
        opciones: PROBADOR.umbrales.map((u) => [u, u ? `${String(u).replace('.', ',')} V por celda` : 'apagada']),
      },
    ],
    aplicar(el, props) {
      mostrarProbador(el, props, null);
    },
    mostrar(el, estado, props) {
      mostrarProbador(el, props || {}, estado);
    },
  },
  // Prototipo 3 (tarea T2). «posicion» va de 0 (perilla hacia GND) a 1 (hacia VCC).
  potenciometro: {
    nombre: 'Potenciómetro',
    etiqueta: 'wokwi-potentiometer',
    prefijo: 'pot',
    props: { ohmios: 10000, posicion: 0.5 },
    nombrePin: (n) => ({ GND: 'GND', SIG: 'SIG', VCC: 'VCC' })[n],
    rotulo: (pin) => ({ GND: 'GND · va a tierra (−)', SIG: 'SIG · pata del medio: la señal', VCC: 'VCC · va a 5V (+)' })[pin] || pin,
    campo: {
      prop: 'ohmios',
      etiqueta: 'Valor',
      opciones: [[1000, '1 kΩ'], [10000, '10 kΩ'], [100000, '100 kΩ']],
    },
    perilla: { prop: 'posicion', etiqueta: 'Perilla' }, // también se gira con el mouse sobre el dibujo
    aplicar(el, props) {
      el.min = 0;
      el.max = 100;
      el.value = Math.round((Number(props.posicion) || 0) * 100);
    },
  },
};
