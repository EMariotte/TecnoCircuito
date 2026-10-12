// SPDX-License-Identifier: Apache-2.0
// Netlist de KiCad: el circuito como lista de piezas (con su huella) y de redes, para empezar una placa en KiCad.
// No toca la página: la usan el lienzo (exportarNetlist) y las pruebas con Node.
//
// Formato: el «export» S-expression versión "E", el mismo que escribe Eeschema (kicad-cli sch export netlist).
// El aprendiz crea el proyecto desde la plantilla «Arduino Uno Shield» de KiCad y, en el editor de placas,
// Archivo → Importar → Netlist. Ver COMO-FUNCIONA.md, sección 43.
//
// Lo que desaparece: la protoboard, sus tiras y los cables (son solo conexiones; quedan dentro de cada red).
// El Uno no se fabrica: en su lugar van los 4 conectores del shield que se monta encima.
// El Nano clásico sí se monta como módulo: conserva su electrónica dentro de una huella de 30 pads.

import { calcularNodos } from './conexiones.js';
import { MODELOS_SERVO } from './piezas/servo.js';
import { CONEXIONES_SHIELD } from './piezas/shield_l293d.js';
import { esNano } from './placas.js';

// Los 4 conectores de la plantilla «Arduino Uno Shield» de KiCad (share/kicad/template/Arduino_Uno), con sus mismas
// referencias y sus mismos UUID: al importar, KiCad reconoce los que ya están en la placa de la plantilla, sobre el
// contorno del Uno. Qué pin del conector es cada pin del Uno sale de la netlist de la plantilla
// (kicad-cli sch export netlist), y lo comprueba pruebas/probar_kicad_pcb.py.
export const CONECTORES_SHIELD = [
  {
    ref: 'J1', valor: 'Power', parte: 'Conn_01x08', uuid: '00000000-0000-0000-0000-000056d71773',
    huella: 'Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical',
    pines: { IOREF: '2', RESET: '3', '3V3': '4', '5V': '5', GND2: '6', GND3: '7', VIN: '8' },
  },
  {
    ref: 'J2', valor: 'Digital/PWM', parte: 'Conn_01x10', uuid: '00000000-0000-0000-0000-000056d72368',
    huella: 'Connector_PinSocket_2.54mm:PinSocket_1x10_P2.54mm_Vertical',
    pines: { SCL: '1', SDA: '2', AREF: '3', GND1: '4', D13: '5', D12: '6', D11: '7', D10: '8', D9: '9', D8: '10' },
  },
  {
    ref: 'J3', valor: 'Analog', parte: 'Conn_01x06', uuid: '00000000-0000-0000-0000-000056d72f1c',
    huella: 'Connector_PinSocket_2.54mm:PinSocket_1x06_P2.54mm_Vertical',
    pines: { A0: '1', A1: '2', A2: '3', A3: '4', A4: '5', A5: '6' },
  },
  {
    ref: 'J4', valor: 'Digital/PWM', parte: 'Conn_01x08', uuid: '00000000-0000-0000-0000-000056d734d0',
    huella: 'Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical',
    pines: { D7: '1', D6: '2', D5: '3', D4: '4', D3: '5', D2: '6', D1: '7', D0: '8' },
  },
];
// Pin del Uno → { ref, pad } en los conectores del shield
const PIN_SHIELD = Object.fromEntries(CONECTORES_SHIELD.flatMap((j) => Object.entries(j.pines).map(([pin, pad]) => [pin, { ref: j.ref, pad }])));
// Nombre de la red cuando toca un pin del Uno (los tres GND y A4/SDA, A5/SCL están unidos en la placa).
const RED_UNO = { GND1: 'GND', GND2: 'GND', GND3: 'GND', '5V': '+5V', '3V3': '+3V3', SDA: 'A4', SCL: 'A5' };
// MCU_Module:Arduino_Nano_v3.x y Module:Arduino_Nano de KiCad 10.0.3. La numeración recorre las dos filas de
// 15 pads, no es la de los conectores del Uno. A6/A7 tienen pads propios, exclusivamente analógicos.
// El USB queda junto a los pads 15/16; el pad cuadrado 1 (TX) está en el extremo opuesto. Montaje por validar.
export const MODULO_NANO_KICAD = {
  ref: 'U', lib: 'MCU_Module', parte: 'Arduino_Nano_v3.x', huella: 'Module:Arduino_Nano', valor: 'Arduino Nano clásico',
  pines: {
    D1: '1', D0: '2', RESET: '3', GND1: '4', D2: '5', D3: '6', D4: '7', D5: '8', D6: '9', D7: '10',
    D8: '11', D9: '12', D10: '13', D11: '14', D12: '15', D13: '16', '3V3': '17', AREF: '18',
    A0: '19', A1: '20', A2: '21', A3: '22', A4: '23', A5: '24', A6: '25', A7: '26',
    '5V': '27', RESET2: '28', GND2: '29', VIN: '30',
  },
};
// Si una red toca varios pines del Uno (un corto), manda el primero de esta lista.
const PRIORIDAD_RED = ['GND', '+5V', '+3V3', 'VIN'];

const kOhm = (ohmios) => (ohmios >= 1000 ? +(ohmios / 1000).toFixed(2) + 'k' : String(ohmios));

// Cada tipo de pieza: referencia (como en KiCad), símbolo, huella, valor y pads.
// Los números de pad se comprobaron con las huellas de KiCad 10 (pruebas/probar_kicad_pcb.py).
export const PIEZAS_KICAD = {
  resistencia: {
    ref: 'R', lib: 'Device', parte: 'R', huella: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal',
    valor: (p) => kOhm(Number(p.ohmios) || 220), pads: { 1: '1', 2: '2' },
  },
  led: {
    // Pad 1 (el cuadrado) es el cátodo, como en el símbolo LED de KiCad (1 = K, 2 = A).
    ref: 'D', lib: 'Device', parte: 'LED', huella: 'LED_THT:LED_D5.0mm',
    valor: (p) => 'LED ' + (p.color || 'rojo'), pads: { catodo: '1', anodo: '2' },
  },
  pulsador: {
    // La huella repite los números: dos pads «1» y dos «2», unidos por dentro como 1i-1d y 2i-2d.
    ref: 'SW', lib: 'Switch', parte: 'SW_Push', huella: 'Button_Switch_THT:SW_PUSH_6mm',
    valor: () => 'Pulsador', pads: { '1i': '1', '1d': '1', '2i': '2', '2d': '2' },
  },
  servo: {
    // En la placa, el servo se enchufa a un conector macho de 3 pines. El símbolo Motor_Servo de KiCad tiene
    // 1 = señal (PWM), 2 = + y 3 = −: el mismo orden que el conector del servo (naranja, rojo, marrón).
    ref: 'M', lib: 'Motor', parte: 'Motor_Servo', huella: 'Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical',
    valor: (p) => 'Servo ' + (MODELOS_SERVO[p.modelo] || MODELOS_SERVO.sg90).nombre, pads: { SIG: '1', VCC: '2', GND: '3' },
  },
  potenciometro: {
    // 1 y 3 son los extremos; 2 es el cursor (la pata del medio).
    ref: 'RV', lib: 'Device', parte: 'R_Potentiometer', huella: 'Potentiometer_THT:Potentiometer_Alps_RK09K_Single_Vertical',
    valor: (p) => kOhm(Number(p.ohmios) || 10000), pads: { GND: '1', SIG: '2', VCC: '3' },
  },
};

// ---- La shield L293D desarmada (pieza Tecno shield_l293d): sus piezas reales y cómo se unen por dentro.
// Así el aprendiz diseña su propia shield de motores sobre la plantilla del Uno, y funciona con el mismo programa
// del kit (AFMotor_R4). Lo que viene de la librería (pines del Uno y salidas del 74HC595) está en CONEXIONES_SHIELD,
// la misma tabla que usa el simulador; las patas de cada integrado, de su hoja de datos; lo demás (qué canal lleva
// cada motor, condensadores, LED) es diseño propio, sin mirar el esquema de Adafruit (que es «compartir igual»).
// No lleva diodos: el L293D los trae por dentro (es la «D» del nombre).
//
// Cada pad dice a qué va: 'placa:PIN' un pin del Uno, 'pieza:PIN' un pin de la shield en el circuito (sigue sus
// cables: bornes, EXT_PWR, servos) o una red propia de la placa ('IN_M1A', 'LED_PWR').
const GND = 'placa:GND1';
const V5 = 'placa:5V';
const VMOT = 'pieza:EXT_POS';
// Patas del 74HC595 según la salida Q0 a Q7 (QA = pata 15; QB a QH = patas 1 a 7).
const PATA_Q = [15, 1, 2, 3, 4, 5, 6, 7];
// Un L293D maneja dos motores: el primero con los canales 1 y 2, el segundo con el 3 y el 4.
function l293d(m1, m2) {
  const pwm = CONEXIONES_SHIELD.pwm;
  return {
    1: 'placa:' + pwm[m1], 2: `IN_M${m1}A`, 3: `pieza:M${m1}A`, 6: `pieza:M${m1}B`, 7: `IN_M${m1}B`,
    9: 'placa:' + pwm[m2], 10: `IN_M${m2}A`, 11: `pieza:M${m2}A`, 14: `pieza:M${m2}B`, 15: `IN_M${m2}B`,
    4: GND, 5: GND, 12: GND, 13: GND, 8: VMOT, 16: V5,
  };
}
function hc595() {
  const c = CONEXIONES_SHIELD;
  const pads = { 8: GND, 16: V5, 10: V5, 11: 'placa:' + c.reloj, 12: 'placa:' + c.cierre, 13: 'placa:' + c.habilita, 14: 'placa:' + c.datos };
  for (const [m, { A, B }] of Object.entries(c.bits)) {
    pads[PATA_Q[A]] = `IN_M${m}A`;
    pads[PATA_Q[B]] = `IN_M${m}B`;
  }
  return pads;
}
const BORNERA_5 = 'TerminalBlock:TerminalBlock_MaiXu_MX126-5.0-05P_1x05_P5.00mm';
const BORNERA_2 = 'TerminalBlock:TerminalBlock_MaiXu_MX126-5.0-02P_1x02_P5.00mm';
const PINES_3 = 'Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical';
const DIP16 = 'Package_DIP:DIP-16_W7.62mm';
const C_100NF = { ref: 'C', lib: 'Device', parte: 'C', huella: 'Capacitor_THT:C_Disc_D5.0mm_W2.5mm_P5.00mm', valor: '100nF' };
// `externo`: un conector donde se enchufa algo de afuera (motores, batería, servos).
export const SHIELD_KICAD = [
  { ref: 'U', lib: 'Driver_Motor', parte: 'L293D', huella: DIP16, valor: 'L293D', nota: 'M1 y M2', pads: l293d(1, 2) },
  { ref: 'U', lib: 'Driver_Motor', parte: 'L293D', huella: DIP16, valor: 'L293D', nota: 'M3 y M4', pads: l293d(3, 4) },
  { ref: 'U', lib: '74xx', parte: '74HC595', huella: DIP16, valor: '74HC595', nota: 'sentido de los motores', pads: hc595() },
  { ref: 'J', lib: 'Connector_Generic', parte: 'Conn_01x05', huella: BORNERA_5, valor: 'M1 GND M2', externo: true,
    pads: { 1: 'pieza:M1A', 2: 'pieza:M1B', 3: 'pieza:GND_IZQ', 4: 'pieza:M2A', 5: 'pieza:M2B' } },
  { ref: 'J', lib: 'Connector_Generic', parte: 'Conn_01x05', huella: BORNERA_5, valor: 'M4 GND M3', externo: true,
    pads: { 1: 'pieza:M4A', 2: 'pieza:M4B', 3: 'pieza:GND_DER', 4: 'pieza:M3A', 5: 'pieza:M3B' } },
  { ref: 'J', lib: 'Connector_Generic', parte: 'Conn_01x02', huella: BORNERA_2, valor: 'EXT_PWR', externo: true, pads: { 1: VMOT, 2: 'pieza:EXT_GND' } },
  { ref: 'J', lib: 'Connector_Generic', parte: 'Conn_01x03', huella: PINES_3, valor: 'SERVO_1', externo: true, pads: { 1: 'pieza:S1_SIG', 2: 'pieza:S1_POS', 3: 'pieza:S1_GND' } },
  { ref: 'J', lib: 'Connector_Generic', parte: 'Conn_01x03', huella: PINES_3, valor: 'SERVO_2', externo: true, pads: { 1: 'pieza:S2_SIG', 2: 'pieza:S2_POS', 3: 'pieza:S2_GND' } },
  // El puente PWR: puesto, la batería de EXT_PWR también alimenta el VIN del Uno.
  { ref: 'JP', lib: 'Jumper', parte: 'Jumper_2_Open', huella: 'Connector_PinHeader_2.54mm:PinHeader_1x02_P2.54mm_Vertical', valor: 'PWR', pads: { 1: VMOT, 2: 'placa:VIN' } },
  // Un condensador de 100 nF junto a cada integrado y uno grande en el voltaje de los motores: sin ellos, el ruido de
  // los motores puede reiniciar el Arduino.
  { ...C_100NF, nota: 'junto a U1', pads: { 1: V5, 2: GND } },
  { ...C_100NF, nota: 'junto a U2', pads: { 1: V5, 2: GND } },
  { ...C_100NF, nota: 'junto a U3', pads: { 1: V5, 2: GND } },
  { ref: 'C', lib: 'Device', parte: 'C_Polarized', huella: 'Capacitor_THT:CP_Radial_D6.3mm_P2.50mm', valor: '100uF 25V', nota: 'voltaje de motores', pads: { 1: VMOT, 2: GND } },
  // LED de energía de los motores: con 1 kΩ, unos 5 mA con la LiPo y 10 mA con 12 V.
  { ref: 'R', lib: 'Device', parte: 'R', huella: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal', valor: '1k', nota: 'LED PWR', pads: { 1: VMOT, 2: 'LED_PWR' } },
  { ref: 'D', lib: 'Device', parte: 'LED', huella: 'LED_THT:LED_D3.0mm', valor: 'LED verde', nota: 'PWR', pads: { 1: GND, 2: 'LED_PWR' } },
];
// Nombre de la red de cada pin de la shield que no toca el Uno.
const RED_SHIELD = { EXT_POS: 'VMOT', M1A: 'M1_A', M1B: 'M1_B', M2A: 'M2_A', M2B: 'M2_B', M3A: 'M3_A', M3B: 'M3_B', M4A: 'M4_A', M4B: 'M4_B' };

// ---- Expansión Nano: circuito de referencia propio, pendiente de verificar contra ambas piezas reales.
// Las fotos no identifican sus reguladores, capacidades, protecciones ni el orden de I2C/SPI. Estos valores y
// huellas sirven para diseñar y revisar una placa; no acreditan una reconstrucción de la roja o la azul.
// ST LD1117 (DocID2572 Rev38): SOT-223, 1=GND, 2=VOUT (también TAB), 3=VIN; salida >=10uF para estabilidad.
// https://www.st.com/resource/en/datasheet/ld1117.pdf, figuras 2 y 4. Se eligen 10uF electrolíticos/100nF de entrada.
// Nano.VIN queda sin unión al jack: la expansión suministra su +5V por el pad27 del módulo. Su REG_3V3 es
// independiente del pad17 (3V3 interno del Nano). No alimentar simultáneamente por USB/jack sin revisar aislamiento.
const NOTA_NANO_IO = 'Circuito de referencia por validar: componentes, polaridad, orden de conectores, aislamiento USB/jack y montaje de ambas variantes pendientes';
const C_NANO = { ref: 'C', lib: 'Device', parte: 'C_Polarized', huella: 'Capacitor_THT:CP_Radial_D6.3mm_P2.50mm', valor: '10uF 25V', nota: NOTA_NANO_IO };
const LDO_NANO = { ref: 'U', lib: 'Regulator_Linear', huella: 'Package_TO_SOT_SMD:SOT-223-3_TabPin2', nota: NOTA_NANO_IO };
export const EXPANSION_NANO_KICAD = [
  { ...LDO_NANO, clave: 'REG_5V', parte: 'LD1117S50TR_SOT223', valor: 'LD1117S50TR 5V (referencia por validar)',
    pads: { 1: 'pieza:JACK_GND', 2: 'pieza:OUT_5V', 3: 'pieza:JACK_POS' } },
  { ...LDO_NANO, clave: 'REG_3V3', parte: 'LD1117S33TR_SOT223', valor: 'LD1117S33TR 3V3 (referencia por validar)',
    pads: { 1: 'pieza:JACK_GND', 2: 'pieza:OUT_3V3', 3: 'pieza:OUT_5V' } },
  { ...C_NANO, clave: 'FILTRO_JACK', pads: { 1: 'pieza:JACK_POS', 2: 'pieza:JACK_GND' } },
  { ...C_NANO, clave: 'FILTRO_5V', pads: { 1: 'pieza:OUT_5V', 2: 'pieza:JACK_GND' } },
  { ...C_NANO, clave: 'FILTRO_3V3', pads: { 1: 'pieza:OUT_3V3', 2: 'pieza:JACK_GND' } },
  { ...C_100NF, clave: 'DESACOPLE_JACK', nota: NOTA_NANO_IO, pads: { 1: 'pieza:JACK_POS', 2: 'pieza:JACK_GND' } },
  { ...C_100NF, clave: 'DESACOPLE_5V', nota: NOTA_NANO_IO, pads: { 1: 'pieza:OUT_5V', 2: 'pieza:JACK_GND' } },
  // PJ-102AH: 1=center (+), 2=sleeve (GND), 3=contacto conmutado de sleeve, deliberadamente sin red.
  // https://www.sameskydevices.com/product/resource/pj-102ah.pdf, p2. No confundir con jack de centro negativo.
  { ref: 'J', lib: 'Connector', parte: 'Barrel_Jack_Switch', huella: 'Connector_BarrelJack:BarrelJack_CUI_PJ-102AH_Horizontal',
    clave: 'JACK', valor: 'PJ-102AH centro + (referencia por validar)', nota: NOTA_NANO_IO, externo: true,
    pads: { 1: 'pieza:JACK_POS', 2: 'pieza:JACK_GND' } },
  { ref: 'J', lib: 'Connector_Generic', parte: 'Conn_01x04', huella: 'Connector_PinHeader_2.54mm:PinHeader_1x04_P2.54mm_Vertical',
    clave: 'I2C', valor: 'I2C SDA SCL 5V GND (referencia por validar)', nota: NOTA_NANO_IO, externo: true,
    pads: { 1: 'pieza:I2C_SDA', 2: 'pieza:I2C_SCL', 3: 'pieza:I2C_V', 4: 'pieza:I2C_G' } },
  { ref: 'J', lib: 'Connector_Generic', parte: 'Conn_01x06', huella: 'Connector_PinHeader_2.54mm:PinHeader_1x06_P2.54mm_Vertical',
    clave: 'SPI', valor: 'SPI MISO MOSI SCK SS 5V GND (referencia por validar)', nota: NOTA_NANO_IO, externo: true,
    pads: { 1: 'pieza:SPI_MISO', 2: 'pieza:SPI_MOSI', 3: 'pieza:SPI_SCK', 4: 'pieza:SPI_SS', 5: 'pieza:SPI_V', 6: 'pieza:SPI_G' } },
];
const RED_NANO_IO = { JACK_POS: 'JACK_VIN', OUT_3V3: 'REG_3V3' };

// ---- Piezas que no van en la placa (el motor, la batería, el probador): sus cables llegan a un conector. Si ya llegan
// a un conector de la shield (una bornera, EXT_PWR, un pin de servo), ese es su conector y no se agrega otro; si no
// tocan la placa (el balance con el probador), no aparecen.
export const FUERA_KICAD = {
  motor_tt: [{ ref: 'J', lib: 'Connector', parte: 'Screw_Terminal_01x02', huella: BORNERA_2, valor: () => 'Motor TT', pines: { A: '1', B: '2' } }],
  bateria_lipo: [
    { ref: 'J', lib: 'Connector', parte: 'Screw_Terminal_01x02', huella: BORNERA_2, valor: () => 'LiPo 2S', pines: { POS: '1', NEG: '2' } },
    { ref: 'J', lib: 'Connector_Generic', parte: 'Conn_01x03', huella: 'Connector_JST:JST_XH_B3B-XH-A_1x03_P2.50mm_Vertical', valor: () => 'Balance LiPo', sufijo: '/balance', pines: { BAL0: '1', BAL1: '2', BAL2: '3' } },
  ],
  probador_lipo: [
    { ref: 'J', lib: 'Connector_Generic', parte: 'Conn_01x09', huella: 'Connector_PinSocket_2.54mm:PinSocket_1x09_P2.54mm_Vertical', valor: () => 'Probador de celdas',
      pines: { NEG: '1', C1: '2', C2: '3', C3: '4', C4: '5', C5: '6', C6: '7', C7: '8', C8: '9' } },
  ],
};
// El servo es pieza de la placa (su conector de 3 pines), salvo que ya vaya enchufado a SERVO_1 o SERVO_2.
const SE_CUBRE = new Set(['servo']);

// Texto entre comillas, como lo escribe KiCad.
const q = (s) => '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';

// Identificador fijo (con forma de UUID) para cada pieza: al volver a exportar, KiCad reconoce las mismas huellas.
function uuidDe(texto) {
  const partes = [0x811c9dc5, 0x01000193, 0x9e3779b9, 0x85ebca6b].map((semilla) => {
    let h = semilla >>> 0;
    for (let i = 0; i < texto.length; i++) h = Math.imul(h ^ texto.charCodeAt(i), 0x01000193) >>> 0;
    return h.toString(16).padStart(8, '0');
  });
  const x = partes.join('');
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20, 32)}`;
}

// Devuelve la netlist como texto. opciones: { nombre, fecha (ISO), herramienta }.
//   Piezas: los 4 conectores del Uno o el módulo Nano, cada componente que KiCad conoce, la shield L293D
//   desarmada o la referencia de expansión Nano y conectores de piezas externas cuando hagan falta.
//   La protoboard no es pieza y el Nano nunca se desarma en su electrónica interna.
//   Redes: los grupos de calcularNodos() con dos pads o más, más las redes propias de la shield. Del Uno entran los
//   pines con un cable y los que usa la shield (los demás pines de los conectores quedan sin red).
export function netlistKiCad(circuito, { nombre = 'Circuito', fecha = new Date().toISOString().slice(0, 19), herramienta = 'TecnoCircuito' } = {}) {
  const nano = esNano(circuito.placa);
  if (nano && circuito.componentes.filter((c) => c.tipo === 'shield_nano_io').length > 1)
    throw new Error('Solo puedes exportar una expansión E/S por Nano. Quita la expansión adicional.');
  // En la placa, el puente PWR es una pieza (JP1): sus dos lados son redes distintas aunque en el circuito esté puesto.
  const circ = {
    ...circuito,
    componentes: circuito.componentes.map((c) => (c.tipo === 'shield_l293d' ? { ...c, props: { ...c.props, puentePWR: false } } : c)),
  };
  const nodo = calcularNodos(circ);
  const shield = circ.componentes.find((c) => c.tipo === 'shield_l293d') || null;
  // A qué red va un pad de la shield: un pin del circuito (su nodo) o una red propia ('#IN_M1A').
  const clave = (destino) => {
    const [tipo, pin] = destino.split(':');
    if (pin === undefined) return '#' + destino;
    return nodo((tipo === 'placa' ? 'placa' : shield.id) + '.' + pin);
  };
  const deShield = shield ? SHIELD_KICAD.map((d) => ({ ...d, id: `${shield.id}/${d.valor}${d.nota ? ' ' + d.nota : ''}`, enShield: true })) : [];
  const deExpansion = nano ? circ.componentes.filter((c) => c.tipo === 'shield_nano_io').flatMap((c) =>
    EXPANSION_NANO_KICAD.map((d) => ({ ...d, id: `${c.id}/${d.clave}`, expansion: c.id }))) : [];
  const claveExpansion = (d, destino, resolver = nodo) => {
    const [tipo, pin] = destino.split(':');
    return resolver((tipo === 'placa' ? 'placa' : d.expansion) + '.' + pin);
  };
  const cableados = new Set(circuito.cables.flatMap((c) => [c.de, c.a]));
  // Los pines del Uno que la shield toca por dentro (sus integrados, los servos en D9 y D10, GND, 5V, VIN) van aunque no
  // tengan cable: en la placa real llegan por los conectores apilables.
  const tocaShield = new Set(deShield.flatMap((d) => Object.values(d.pads).map(clave)));
  // Los 30 pads del módulo son físicos; sus GND y RESET repetidos conservan su unión interna aunque no haya cables.
  // Incluirlos también reconoce SDA/SCL y los alias SPI sin crear pads adicionales en el Nano.
  const pinesPlaca = nano ? Object.keys(MODULO_NANO_KICAD.pines) :
    Object.keys(PIN_SHIELD).filter((pin) => cableados.has('placa.' + pin) || tocaShield.has(nodo('placa.' + pin)));
  const delCircuito = circ.componentes.filter((c) => PIEZAS_KICAD[c.tipo]);
  // ¿Qué pines de una pieza llegan a la placa por sus propios cables (o la protoboard)? Se mira con los nodos sin los
  // puentes internos de la batería: el balance comparte el − y el + con el cable de potencia, pero si solo va al
  // probador no toca la placa.
  const externo = calcularNodos(circ, { balanceInterno: false });
  const claveExterna = (destino) => {
    const [tipo, pin] = destino.split(':');
    return pin === undefined ? '#' + destino : externo((tipo === 'placa' ? 'placa' : shield.id) + '.' + pin);
  };
  const enPlacaExt = new Set([
    ...pinesPlaca.map((pin) => externo('placa.' + pin)),
    ...deShield.flatMap((d) => Object.values(d.pads).map(claveExterna)),
    ...deExpansion.flatMap((d) => Object.values(d.pads).map((destino) => claveExpansion(d, destino, externo))),
    ...delCircuito.flatMap((c) => Object.keys(PIEZAS_KICAD[c.tipo].pads).map((pin) => externo(c.id + '.' + pin))),
  ]);
  const conConectorExt = new Set([
    ...deShield.filter((d) => d.externo).flatMap((d) => Object.values(d.pads).map(claveExterna)),
    ...deExpansion.filter((d) => d.externo).flatMap((d) => Object.values(d.pads).map((destino) => claveExpansion(d, destino, externo))),
  ]);
  const llegan = (id, pines) => pines.filter((pin) => enPlacaExt.has(externo(id + '.' + pin)));
  // Necesita su propio conector si algún pin llega a la placa por un punto que no es un conector de la shield.
  const necesitaConector = (id, pines) => llegan(id, pines).some((pin) => !conConectorExt.has(externo(id + '.' + pin)));
  // Ya enchufada a un conector de la shield (un servo en SERVO_1): todo lo que llega a la placa llega por ahí.
  const enConector = (id, pines) => {
    const l = llegan(id, pines);
    return l.length > 0 && l.every((pin) => conConectorExt.has(externo(id + '.' + pin)));
  };

  // Las piezas: módulo Nano si corresponde, circuito, shield/expansión y conectores externos. `pads`: pad → a qué va.
  const lista = [];
  if (nano) lista.push({ ...MODULO_NANO_KICAD, id: 'placa',
    pads: pinesPlaca.map((pin) => [MODULO_NANO_KICAD.pines[pin], nodo('placa.' + pin), null, pin]) });
  for (const c of delCircuito) {
    const def = PIEZAS_KICAD[c.tipo];
    if (SE_CUBRE.has(c.tipo) && enConector(c.id, Object.keys(def.pads))) continue; // ya va en SERVO_1 o SERVO_2
    lista.push({ ...def, id: c.id, valor: def.valor(c.props || {}), pads: Object.entries(def.pads).map(([pin, pad]) => [pad, nodo(c.id + '.' + pin)]) });
  }
  for (const d of deShield) {
    lista.push({ ...d, pads: Object.entries(d.pads).map(([pad, destino]) => [pad, clave(destino), destino.startsWith('pieza:') ? RED_SHIELD[destino.slice(6)] : null]) });
  }
  for (const d of deExpansion) {
    lista.push({ ...d, pads: Object.entries(d.pads).map(([pad, destino]) => [pad, claveExpansion(d, destino), RED_NANO_IO[destino.slice(6)] || null]) });
  }
  for (const c of circ.componentes) {
    for (const g of FUERA_KICAD[c.tipo] || []) {
      if (!necesitaConector(c.id, Object.keys(g.pines))) continue;
      lista.push({ ...g, id: c.id + (g.sufijo || ''), valor: g.valor(c.props || {}), pads: Object.entries(g.pines).map(([pin, pad]) => [pad, nodo(c.id + '.' + pin)]) });
    }
  }
  const cuenta = { J: nano ? 0 : CONECTORES_SHIELD.length }; // J1 a J4 solo en Uno; el Nano es U1
  for (const p of lista) {
    cuenta[p.ref] = (cuenta[p.ref] || 0) + 1;
    p.ref = p.ref + cuenta[p.ref];
  }

  const redes = new Map(); // clave → { pads: Map("ref pad" → {ref, pad, pinUno}), uno: Set, shield: Set, propia }
  const anotar = (k, ref, pad, pinUno, deLaShield) => {
    if (!redes.has(k)) redes.set(k, { pads: new Map(), uno: new Set(), shield: new Set(), propia: k.startsWith('#') ? k.slice(1) : null });
    const red = redes.get(k);
    red.pads.set(ref + ' ' + pad, { ref, pad, pinUno });
    if (pinUno) red.uno.add(RED_UNO[pinUno] || pinUno);
    if (deLaShield) red.shield.add(deLaShield);
  };
  if (!nano) for (const pin of pinesPlaca) anotar(nodo('placa.' + pin), PIN_SHIELD[pin].ref, PIN_SHIELD[pin].pad, pin, null);
  for (const p of lista) for (const [pad, k, deLaShield, pinPlaca] of p.pads)
    anotar(k, p.ref, String(pad), pinPlaca === 'RESET2' ? 'RESET' : pinPlaca, deLaShield);

  // El nombre de cada red: el del Uno (GND, +5V, D11…), el de la shield (VMOT, M1_A…) o el propio (IN_M1A).
  const numerico = (a, b) => a.localeCompare(b, 'en', { numeric: true });
  const listaRedes = [...redes.values()]
    .filter((r) => r.pads.size >= 2)
    .map((r) => {
      const pads = [...r.pads.values()].sort((a, b) => numerico(a.ref, b.ref) || numerico(a.pad, b.pad));
      const delUno = PRIORIDAD_RED.find((n) => r.uno.has(n)) || [...r.uno].sort(numerico)[0];
      return { nombre: delUno || [...r.shield].sort(numerico)[0] || r.propia || `Net-(${pads[0].ref}-Pad${pads[0].pad})`, pads };
    })
    .sort((a, b) => numerico(a.nombre, b.nombre));

  const L = [];
  const comp = (ref, valor, huella, lib, parte, id, uuid, nota) =>
    L.push(
      '\t\t(comp',
      `\t\t\t(ref ${q(ref)})`,
      `\t\t\t(value ${q(valor)})`,
      `\t\t\t(footprint ${q(huella)})`,
      `\t\t\t(libsource (lib ${q(lib)}) (part ${q(parte)}) (description ""))`,
      `\t\t\t(property (name "TecnoCircuito") (value ${q(id)}))`,
      ...(nota ? [`\t\t\t(property (name "TecnoCircuito_validacion") (value ${q(nota)}))`] : []),
      '\t\t\t(sheetpath (names "/") (tstamps "/"))',
      `\t\t\t(tstamps ${q(uuid)})`,
      '\t\t)',
    );
  L.push('(export', '\t(version "E")', '\t(design', `\t\t(source ${q(nombre)})`, `\t\t(date ${q(fecha)})`, `\t\t(tool ${q(herramienta)})`, '\t)');
  L.push('\t(components');
  if (!nano) for (const j of CONECTORES_SHIELD) comp(j.ref, j.valor, j.huella, 'Connector_Generic', j.parte, 'placa', j.uuid);
  for (const p of lista) comp(p.ref, p.valor, p.huella, p.lib, p.parte, p.id, uuidDe(nombre + '/' + p.id), p.expansion ? p.nota : null);
  L.push('\t)', '\t(nets');
  listaRedes.forEach((red, i) => {
    L.push('\t\t(net', `\t\t\t(code ${q(i + 1)})`, `\t\t\t(name ${q(red.nombre)})`, '\t\t\t(class "Default")');
    for (const n of red.pads) {
      const funcion = n.pinUno ? ` (pinfunction ${q(n.pinUno)})` : '';
      L.push(`\t\t\t(node (ref ${q(n.ref)}) (pin ${q(n.pad)})${funcion} (pintype "passive"))`);
    }
    L.push('\t\t)');
  });
  L.push('\t)', ')');
  return L.join('\n') + '\n';
}
