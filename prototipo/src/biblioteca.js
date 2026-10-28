// Biblioteca de piezas: las categorías del panel «+ Agregar», la búsqueda y la ficha de cada pieza.
// No toca la página: el lienzo la dibuja. Los datos salen de los mismos modelos que usa el simulador, así la ficha
// y la simulación nunca dicen cosas distintas.
//
// Una pieza nueva se agrega aquí con su ficha: { nombre, descripcion, palabras, pines, datos(props), validacion(props) }.
//   validacion → { estado: 'validado' | 'por_validar', texto }: si su modelo ya se comparó con la placa real.
import { LED, potenciaDe } from './motor/red.js';
import { MODELOS_SERVO } from './piezas/servo.js';
import { MOTOR_TT } from './piezas/motor_tt.js';
import { CARGAS_LIPO, LIPO } from './piezas/bateria_lipo.js';
import { PROBADOR } from './piezas/probador_lipo.js';

const coma = (n, dec = 1) => (Number.isInteger(n) ? String(n) : n.toFixed(dec).replace('.', ','));
const ohmios = (r) => (r >= 1000 ? coma(r / 1000) + ' kΩ' : r + ' Ω');
const validado = (texto) => ({ estado: 'validado', texto });
const porValidar = (texto) => ({ estado: 'por_validar', texto });

export const CATEGORIAS = [
  { nombre: 'Básicas', piezas: ['protoboard', 'resistencia', 'led'] },
  { nombre: 'Entradas', piezas: ['pulsador', 'potenciometro'] },
  { nombre: 'Actuadores', piezas: ['servo', 'motor_tt'] },
  { nombre: 'Potencia y energía', piezas: ['shield_l293d', 'shield_nano_io', 'bateria_lipo', 'probador_lipo'] },
];

export const FICHAS = {
  shield_nano_io: {
    nombre: 'Expansión E/S del Nano',
    descripcion: 'El Nano va montado en esta tarjeta. Cada grupo reúne señal, 5V y tierra para conectar sensores o servos. El jack alimenta la regulación de la expansión; A6 y A7 solo leen señales analógicas.',
    palabras: ['nano', 'expansion', 'shield', 'sensores', 'servo', 'roja', 'azul', 'i2c', 'spi', 'jack'],
    pines: 'S: señal del pin indicado; V: 5V; G: tierra. I2C: SDA/A4 y SCL/A5, junto a UART. El bloque de seis contactos tiene tres de 3,3V (arriba) y tres GND (abajo); el 5V está en cada V, en I2C y en UART. SPI se conecta en el Nano: D12/MISO, D11/MOSI, D13/SCK y D10/SS. OUT_3V3 es la salida de la expansión, separada de la del módulo Nano',
    datos: (p) => [
      ['Tarjeta', p.variante === 'azul' ? 'Azul' : 'Roja'],
      ['Placa', 'Nano clásico ATmega328P · 16 MHz'],
      ['Entradas analógicas', 'A0 a A7; A6 y A7 solo analógicas'],
      ['Alimentación', p.alimentacion === 'jack' ? `Jack: ${Number(p.voltajeJack ?? 9)} V (o la batería conectada)` : p.alimentacion === 'apagada' ? 'Desconectada' : 'USB del Nano'],
      ['Regulación', 'Modelo de referencia 5V y 3,3V; salida externa 3,3V separada del módulo'],
      ['KiCad', 'Módulo Nano + regulación/filtrado de referencia, jack, I2C y conector SPI añadido al diseño'],
    ],
    validacion: () => porValidar('Dibujo medido por TecnoDiseñador desde la tarjeta del ambiente (registro del 13 oct); la roja y la azul tienen las mismas medidas. Falta medir continuidad, reguladores, puentes, polaridad y capacidad de cada tarjeta. I2C y los pines SPI del Nano son conexiones; sus dispositivos se incorporan por separado.'),
  },
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
    // Sin `vatios` (guardada antes de que hubiera dos potencias): ¼ W con las patas abiertas a 6 pasos.
    datos: (p) => [
      ['Valor', ohmios(Number(p.ohmios) || 220)],
      ['Potencia máxima', potenciaDe(p) === 0.5 ? '½ W (0,5 W): más, se calienta' : '¼ W (0,25 W): más, se calienta'],
      ['Cuerpo', potenciaDe(p) === 0.5 ? '8,7 mm, azul (la de ½ W del kit)' : '6,3 mm, beige (la de ¼ W del kit)'],
      ['Patas', potenciaDe(p) === 0.25 ? 'a 4 pasos (10,16 mm)' : 'a 6 pasos (15,24 mm)'],
      ['Tolerancia', '±5 % (franja dorada)'],
    ],
    validacion: () => validado('Comparada con el multímetro el 7 oct 2026 (220, 330 y 1 kΩ con un LED rojo). Dibujo medido por TecnoDiseñador desde las del kit (27 oct); falta probar sus pasos en la protoboard real.'),
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
    // Solo se midió el LED rojo: los otros colores usan el voltaje de la hoja de datos.
    validacion: (p) =>
      !p.color || p.color === 'rojo'
        ? validado('Comparado con el multímetro el 7 oct 2026 (LED rojo con 220, 330 y 1 kΩ: 11 de 12 dentro del criterio; la que queda en el límite cumple con la incertidumbre del multímetro). Dibujo medido por TecnoDiseñador desde los del kit (27 oct).')
        : porValidar(`Voltaje de la hoja de datos: se midió solo el LED rojo (7 oct 2026); falta medir el ${p.color}. Dibujo medido por TecnoDiseñador desde los del kit (27 oct).`),
  },
  pulsador: {
    nombre: 'Botón',
    descripcion: 'Pulsador de 4 patas: al presionarlo une los dos lados. Con digitalRead() necesita una resistencia pull-down o INPUT_PULLUP; si no, la entrada queda al aire.',
    palabras: ['pulsador', 'interruptor', 'switch', 'tecla', 'boton', 'entrada digital'],
    pines: '1i y 1d unidas por dentro; 2i y 2d unidas por dentro. Al presionar, el 1 se une con el 2',
    // Sin `modelo` (guardado antes): el dibujo antiguo, con las patas a 7 × 2 pasos, hasta que se mueve.
    datos: (p) => [
      ['Color', p.color || 'rojo'],
      p.modelo
        ? ['Tamaño', '6 × 6 mm; patas a 3 pasos de lado a lado y a 2 en el mismo lado']
        : ['Dibujo', 'el antiguo, con las patas a 7 pasos de lado a lado; al moverlo toma el del kit (6 × 6 mm)'],
      ['Lectura', 'digitalRead(): ALTO o BAJO'],
      ['Sin pull-down', 'la entrada queda al aire (lee al azar)'],
    ],
    validacion: () => validado('La entrada al aire se midió con la placa real el 9 oct 2026 (se queda en su nivel; con la mano capta los 60 Hz). Las uniones de las patas se midieron con el multímetro el 27 oct. Dibujo medido por TecnoDiseñador desde el del kit (27 oct).'),
  },
  potenciometro: {
    nombre: 'Potenciómetro',
    descripcion: 'Resistencia con perilla: la pata del medio (SIG) da un voltaje entre 0 y 5 V según el giro. Con analogRead() se lee de 0 a 1023.',
    palabras: ['perilla', 'knob', 'regulador', 'variable', 'analogico', 'analogread', 'trimmer'],
    pines: 'GND, SIG (el cursor, al pin analógico) y VCC (5V)',
    // Sin `modelo` (guardado antes): el dibujo antiguo, con las patas a 1 paso, hasta que se mueve.
    datos: (p) => [
      ['Valor', ohmios(Number(p.ohmios) || 10000)],
      ['Perilla', `${Math.round((Number(p.posicion) || 0) * 100)} %`],
      p.modelo ? ['Patas', 'a 2 pasos (5,08 mm)'] : ['Dibujo', 'el antiguo, con las patas a 1 paso; al moverlo toma el del kit (16 mm)'],
      ['Giro', '270°: a la derecha sube el voltaje'],
      ['Lectura', 'analogRead(): 0 a 1023 (5 V / 1024 por paso)'],
    ],
    validacion: () => validado('Lectura analógica revisada el 7 oct 2026. El ruido del ADC (unos 0,1 pasos) es una estimación del 9 oct: falta repetirlo con el programa corregido. El del kit es lineal (10,28 kΩ; 5,13 kΩ en el medio, 27 oct). Dibujo medido por TecnoDiseñador (27 oct).'),
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
        : validado('SG90 medido con la placa real el 9 oct 2026: ángulos (7°, 90° y 175°) y corriente (quieto menos de 10 mA, lo mínimo que muestra el multímetro; ~100 mA moviéndose; 590 mA bloqueado). Los 6 mA quieto son de la hoja de datos.'),
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
    validacion: () => porValidar('Corriente, RPM y corriente bloqueado medidas en un motor del kit (15 oct): dentro del criterio. Falta confirmar hacia dónde gira cada rueda con el mismo cableado.'),
  },
  shield_l293d: {
    nombre: 'Shield L293D',
    descripcion: 'Placa que va encima del Uno y maneja hasta 4 motores. El 74HC595 recibe el sentido de cada motor y los dos L293D le dan la corriente desde la batería de EXT_PWR.',
    palabras: ['l293d', 'puente h', 'driver', 'controlador de motores', '74hc595', 'afmotor', 'motor shield', 'escudo'],
    pines: 'bornes M1 a M4, EXT_PWR (+M y GND), SERVO_1 (pin 10, arriba) y SERVO_2 (pin 9), con los pines − + S, y los headers +5, Gnd y A0-5 (A0 a A5 del Uno). Tapa SCL, SDA e IOREF del Uno',
    datos: (p) => [
      ['Motores', '4 DC (o 2 paso a paso), 0,6 A por canal'],
      ['Usa los pines', '4, 7, 8 y 12 (74HC595) y 11, 3, 6 y 5 (velocidad)'],
      ['Servos', 'SERVO_1 = pin 10 · SERVO_2 = pin 9 · pines − + S (la señal a la derecha)'],
      ['Headers analógicos', '+5, Gnd y A0-5: A0 a A5 del Uno con su 5V y su GND'],
      ['Caída del L293D', '1,4 a 2 V: al motor le llega menos que la batería'],
      ['Puente PWR', p.puentePWR === false ? 'quitado: la batería solo va a los motores' : 'puesto: la batería también alimenta el Uno por VIN'],
      ['Librería', 'AFMotor_R4'],
      ['En KiCad', 'sale desarmada: U1 y U2 (L293D), U3 (74HC595), borneras, servos, headers analógicos, puente PWR, C1 a C4 y el LED'],
    ],
    validacion: () => validado('Dibujo medido por TecnoDiseñador (14 oct). Continuidad de la shield del kit y caída del L293D medidas el 15 oct: cada motor va por los pines de la librería del kit y al motor le llegan 1,4 V menos que la batería.'),
  },
  bateria_lipo: {
    nombre: 'Batería LiPo 2S',
    descripcion: 'Batería recargable de 2 celdas para los motores. Va a EXT_PWR de la shield. Por debajo de 3,0 V por celda se daña: hay que cargarla a tiempo.',
    palabras: ['bateria', 'pila', 'lipo', 'energia', 'alimentacion', 'voltaje', 'celda', 'fuente', 'carga'],
    pines: 'potencia: POS (+, rojo) y NEG (−, negro). Balance: BAL0 (−), BAL1 (entre las celdas) y BAL2 (+), para el cargador y el probador',
    datos: (p) => {
      const c = CARGAS_LIPO[p.carga] || CARGAS_LIPO.nominal;
      return [
        ['Carga', `${c.nombre}: ${coma(c.voltios)} V`],
        ['Celdas', c.celdas.map((v, i) => `${i + 1}: ${coma(v, 2)} V`).join(' · ')],
        ['Llena / nominal / descargada', `${coma(CARGAS_LIPO.llena.voltios)} / ${coma(CARGAS_LIPO.nominal.voltios)} / ${coma(CARGAS_LIPO.descargada.voltios)} V`],
        ['Mínimo', `${coma(LIPO.minimoCeldaV)} V por celda (${coma(LIPO.minimoCeldaV * LIPO.celdas)} V)`],
        ['Capacidad', '1300 mAh'],
      ];
    },
    validacion: () => validado('Medida con la LiPo del kit y los motores (15 oct): su resistencia interna, con cables y conector, es de 1,2 Ω. Con los dos motores andando baja unos 0,4 V.'),
  },
  probador_lipo: {
    nombre: 'Probador de celdas',
    descripcion: 'Se conecta al cable de balance y muestra el voltaje total, cuántas celdas hay y el de cada una. Si una celda baja del umbral, pita.',
    palabras: ['probador', 'medidor', 'zumbador', 'alarma', 'checker', 'tester', 'celdas', 'bateria', 'lipo', 'voltimetro', 'balance'],
    pines: '− (al negro del balance) y 1 a 8 (el + de cada celda, en orden)',
    datos: (p) => [
      ['Pantalla', 'total → «2S» → «-1-» y su voltaje → «-2-» y su voltaje…'],
      ['Alarma', p.umbral ? `pita si una celda baja de ${coma(p.umbral)} V` : 'apagada'],
      ['Mide', `de 1 a 8 celdas (LiPo, Li-ion, LiFe); de fábrica pita en ${coma(PROBADOR.umbralV)} V`],
      ['Energía', 'la toma de la misma batería, por el cable de balance'],
    ],
    validacion: () => validado('Comparado con el probador del kit (15 oct): la misma secuencia de pantalla, 1 s por paso y el umbral de 3,3 V. El real marca un 1 % menos que el multímetro.'),
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

