// Biblioteca de piezas: las categorías del panel «+ Agregar», la búsqueda y la ficha de cada pieza.
// No toca la página: el lienzo la dibuja. Los datos salen de los mismos modelos que usa el simulador, así la ficha
// y la simulación nunca dicen cosas distintas.
//
// Una pieza nueva se agrega aquí con su ficha: { nombre, descripcion, palabras, pines, datos(props), validacion(props) }.
//   validacion → { estado: 'validado' | 'por_validar', texto }: si su modelo ya se comparó con la placa real.
import { LED } from './motor/red.js';
import { MODELOS_SERVO } from './piezas/servo.js';
import { MOTOR_TT } from './piezas/motor_tt.js';
import { CARGAS_LIPO, LIPO } from './piezas/bateria_lipo.js';

const coma = (n, dec = 1) => (Number.isInteger(n) ? String(n) : n.toFixed(dec).replace('.', ','));
const ohmios = (r) => (r >= 1000 ? coma(r / 1000) + ' kΩ' : r + ' Ω');
const validado = (texto) => ({ estado: 'validado', texto });
const porValidar = (texto) => ({ estado: 'por_validar', texto });

export const CATEGORIAS = [
  { nombre: 'Básicas', piezas: ['protoboard', 'resistencia', 'led'] },
  { nombre: 'Entradas', piezas: ['pulsador', 'potenciometro'] },
  { nombre: 'Actuadores', piezas: ['servo', 'motor_tt'] },
  { nombre: 'Potencia y energía', piezas: ['shield_l293d', 'bateria_lipo'] },
];

export const FICHAS = {
  protoboard: {
    nombre: 'Protoboard',
    descripcion: 'Placa de pruebas: une las patas de las piezas sin soldar. Cada columna de 5 huecos está unida por dentro, y los rieles + y − llevan la energía a lo largo.',
    palabras: ['breadboard', 'placa de pruebas', 'tablero', 'huecos', 'rieles'],
    pines: '400 huecos: tiras de 5 (a–e y f–j) y dos rieles + y − arriba y abajo',
    datos: () => [
      ['Puntos', '400 (media protoboard)'],
      ['Tiras', '30 columnas, de 5 huecos unidos'],
      ['Paso', '2,54 mm (0,1"), como las patas'],
    ],
    validacion: () => null,
  },
  resistencia: {
    nombre: 'Resistencia',
    descripcion: 'Limita la corriente. Va en serie con el LED para que no se queme, y como pull-down o pull-up en un botón.',
    palabras: ['resistor', 'ohm', 'ohmios', 'limitar', 'corriente', 'pull-down', 'pull-up'],
    pines: '1 y 2 (da igual el sentido)',
    datos: (p) => [
      ['Valor', ohmios(Number(p.ohmios) || 220)],
      ['Potencia máxima', '¼ W (0,25 W): más, se calienta'],
      ['Tolerancia', '±5 % (franja dorada)'],
    ],
    validacion: () => validado('Comparada con el multímetro el 7 oct 2026 (220, 330 y 1 kΩ con un LED rojo).'),
  },
  led: {
    nombre: 'LED',
    descripcion: 'Diodo que da luz. Tiene polaridad: la pata larga (ánodo) va hacia el +, y siempre con una resistencia en serie.',
    palabras: ['luz', 'foco', 'bombillo', 'diodo', 'lampara', 'indicador'],
    pines: 'ánodo (+, pata larga) y cátodo (−, pata corta)',
    datos: (p) => [
      ['Color', p.color || 'rojo'],
      ['Voltaje directo', `${coma(LED.vf[p.color] || LED.vf.rojo, 2)} V a ${LED.normalmA} mA`],
      ['Corriente', `de 5 a ${LED.normalmA} mA; se quema desde ${LED.quemamA} mA`],
      ['Resistencia con 5 V', `${Math.ceil((5 - (LED.vf[p.color] || LED.vf.rojo)) / (LED.normalmA / 1000) / 10) * 10} Ω o más`],
    ],
    validacion: () => validado('Comparado con el multímetro el 7 oct 2026 (LED rojo con 220, 330 y 1 kΩ: 12 de 12 dentro del criterio).'),
  },
  pulsador: {
    nombre: 'Botón',
    descripcion: 'Pulsador de 4 patas: al presionarlo une los dos lados. Con digitalRead() necesita una resistencia pull-down o INPUT_PULLUP; si no, la entrada queda al aire.',
    palabras: ['pulsador', 'interruptor', 'switch', 'tecla', 'boton', 'entrada digital'],
    pines: '1i y 1d unidas por dentro; 2i y 2d unidas por dentro. Al presionar, el 1 se une con el 2',
    datos: (p) => [
      ['Color', p.color || 'rojo'],
      ['Lectura', 'digitalRead(): ALTO o BAJO'],
      ['Sin pull-down', 'la entrada queda al aire (lee al azar)'],
    ],
    validacion: () => validado('La entrada al aire se midió con la placa real el 9 oct 2026 (se queda en su nivel; con la mano capta los 60 Hz).'),
  },
  potenciometro: {
    nombre: 'Potenciómetro',
    descripcion: 'Resistencia con perilla: la pata del medio (SIG) da un voltaje entre 0 y 5 V según el giro. Con analogRead() se lee de 0 a 1023.',
    palabras: ['perilla', 'knob', 'regulador', 'variable', 'analogico', 'analogread', 'trimmer'],
    pines: 'GND, SIG (el cursor, al pin analógico) y VCC (5V)',
    datos: (p) => [
      ['Valor', ohmios(Number(p.ohmios) || 10000)],
      ['Perilla', `${Math.round((Number(p.posicion) || 0) * 100)} %`],
      ['Lectura', 'analogRead(): 0 a 1023 (5 V / 1024 por paso)'],
    ],
    validacion: () => validado('Lectura analógica revisada el 7 oct 2026 y ruido del ADC medido el 9 oct (0,1 pasos).'),
  },
  servo: {
    nombre: 'Servo',
    descripcion: 'Motor que va a un ángulo de 0° a 180° y se queda ahí. Recibe un pulso cada 20 ms por el cable naranja: el ancho del pulso dice el ángulo.',
    palabras: ['servomotor', 'sg90', 'mg90s', 'angulo', 'brazo', 'micro servo', 'otto'],
    pines: 'GND (marrón), VCC (rojo, a 5V) y SIG (naranja, a un pin)',
    datos: (p) => {
      const m = MODELOS_SERVO[p.modelo] || MODELOS_SERVO.sg90;
      return [
        ['Modelo', `${m.nombre} (engranajes de ${p.modelo === 'mg90s' ? 'metal' : 'plástico'})`],
        ['Ángulo', '0° a 180° con write()'],
        ['Torque', `${coma(m.torque_kgcm)} kg·cm a 4,8 V`],
        ['Corriente', `quieto ${m.mA.reposo} mA · moviéndose ~${p.modelo === 'mg90s' ? m.mA.movimiento : 100} mA · bloqueado ${m.mA.arranque} mA`],
        ['Alimentación', 'el 5V de la placa (un pin da solo 40 mA)'],
      ];
    },
    validacion: (p) =>
      p.modelo === 'mg90s'
        ? porValidar('Valores de la hoja de datos: falta medir el MG90S del kit (corriente y ángulos).')
        : validado('SG90 medido con la placa real el 9 oct 2026: ángulos (7°, 90° y 175°) y corriente (6, ~100 y 590 mA).'),
  },
  motor_tt: {
    nombre: 'Motor TT',
    descripcion: 'Motorreductor amarillo de los carros: gira hacia un lado o el otro según la polaridad. Pide mucha corriente: va a los bornes M1 a M4 de la shield, nunca a un pin.',
    palabras: ['motor', 'rueda', 'llanta', 'carro', 'robot', 'motorreductor', 'motor dc', 'tt', 'amarillo'],
    pines: 'A (rojo) y B (negro); al invertirlos gira al revés',
    datos: (p) => [
      ['Voltaje', `3 a ${MOTOR_TT.voltiosRef} V`],
      ['Sin carga a 6 V', `${MOTOR_TT.rpmSinCarga} RPM y ${MOTOR_TT.mASinCarga} mA`],
      ['Bloqueado', `${coma(MOTOR_TT.mABloqueado / 1000)} A (al arrancar, un instante)`],
      ['Reducción', `1:${MOTOR_TT.reduccion} · rueda de ${MOTOR_TT.ruedaMM} mm`],
      ['Vista y lado', `${p.vista === 'rueda' ? 'con la rueda' : 'solo el eje'} · lado ${p.lado || 'izquierdo'}`],
    ],
    validacion: () => porValidar('Valores de hojas de datos: falta medir la corriente y las RPM del motor del kit.'),
  },
  shield_l293d: {
    nombre: 'Shield L293D',
    descripcion: 'Placa que va encima del Uno y maneja hasta 4 motores. El 74HC595 recibe el sentido de cada motor y los dos L293D le dan la corriente desde la batería de EXT_PWR.',
    palabras: ['l293d', 'puente h', 'driver', 'controlador de motores', '74hc595', 'afmotor', 'motor shield', 'escudo'],
    pines: 'bornes M1 a M4, EXT_PWR (+M y GND) y SERVO_1 (pin 10) y SERVO_2 (pin 9)',
    datos: (p) => [
      ['Motores', '4 DC (o 2 paso a paso), 0,6 A por canal'],
      ['Usa los pines', '4, 7, 8 y 12 (74HC595) y 11, 3, 6 y 5 (velocidad)'],
      ['Servos', 'SERVO_1 = pin 10 · SERVO_2 = pin 9'],
      ['Caída del L293D', '1,4 a 2 V: al motor le llega menos que la batería'],
      ['Puente PWR', p.puentePWR === false ? 'quitado: la batería solo va a los motores' : 'puesto: la batería también alimenta el Uno por VIN'],
      ['Librería', 'AFMotor_R4'],
    ],
    validacion: () => porValidar('Conexiones de la librería del kit y de las hojas de datos: falta medir la caída del L293D en la placa real.'),
  },
  bateria_lipo: {
    nombre: 'Batería LiPo 2S',
    descripcion: 'Batería recargable de 2 celdas para los motores. Va a EXT_PWR de la shield. Por debajo de 3,0 V por celda se daña: hay que cargarla a tiempo.',
    palabras: ['bateria', 'pila', 'lipo', 'energia', 'alimentacion', 'voltaje', 'celda', 'fuente', 'carga'],
    pines: 'POS (+, rojo) y NEG (−, negro). El cable blanco de balance es para el cargador',
    datos: (p) => {
      const c = CARGAS_LIPO[p.carga] || CARGAS_LIPO.nominal;
      return [
        ['Carga', `${c.nombre}: ${coma(c.voltios)} V (${coma(c.voltios / LIPO.celdas, 2)} V por celda)`],
        ['Llena / nominal / descargada', `${coma(CARGAS_LIPO.llena.voltios)} / ${coma(CARGAS_LIPO.nominal.voltios)} / ${coma(CARGAS_LIPO.descargada.voltios)} V`],
        ['Mínimo', `${coma(LIPO.minimoCeldaV)} V por celda (${coma(LIPO.minimoCeldaV * LIPO.celdas)} V)`],
        ['Capacidad', '1300 mAh'],
      ];
    },
    validacion: () => porValidar('Valores típicos de una LiPo 2S: falta medir la del kit con los motores.'),
  },
};

// Sin tildes ni mayúsculas: «Potenciómetro», «potenciometro» y «POTENCIOMETRO» se encuentran igual.
export const sinTildes = (t) => String(t).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Las piezas que coinciden con lo buscado (todas las palabras), en el orden de las categorías.
export function buscarPiezas(texto) {
  const palabras = sinTildes(texto).split(/\s+/).filter(Boolean);
  const todas = CATEGORIAS.flatMap((c) => c.piezas.map((tipo) => ({ tipo, categoria: c.nombre })));
  if (!palabras.length) return todas;
  return todas.filter(({ tipo, categoria }) => {
    const f = FICHAS[tipo];
    const donde = sinTildes([f.nombre, categoria, f.descripcion, ...f.palabras].join(' '));
    return palabras.every((p) => donde.includes(p));
  });
}

