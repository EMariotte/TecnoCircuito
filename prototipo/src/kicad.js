// Netlist de KiCad: el circuito como lista de piezas (con su huella) y de redes, para empezar una placa en KiCad.
// No toca la página: la usan el lienzo (exportarNetlist) y las pruebas con Node.
//
// Formato: el «export» S-expression versión "E", el mismo que escribe Eeschema (kicad-cli sch export netlist).
// El aprendiz crea el proyecto desde la plantilla «Arduino Uno Shield» de KiCad y, en el editor de placas,
// Archivo → Importar → Netlist. Ver COMO-FUNCIONA.md, sección 43.
//
// Lo que desaparece: la protoboard, sus tiras y los cables (son solo conexiones; quedan dentro de cada red).
// El Uno no se fabrica: en su lugar van los 4 conectores del shield que se monta encima.

import { calcularNodos } from './conexiones.js';
import { MODELOS_SERVO } from './piezas/servo.js';

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
//   Piezas: los 4 conectores del shield y cada componente que KiCad conoce (la protoboard no es pieza).
//   Redes: los grupos de calcularNodos() con dos pads o más. Del Uno solo entran los pines con un cable:
//   son los que usa el shield (los demás pines de los conectores quedan sin red).
export function netlistKiCad(circuito, { nombre = 'Circuito', fecha = new Date().toISOString().slice(0, 19), herramienta = 'TecnoCircuito' } = {}) {
  const piezas = circuito.componentes.filter((c) => PIEZAS_KICAD[c.tipo]).map((c) => ({ ...c }));
  const cuenta = {};
  for (const p of piezas) {
    const def = PIEZAS_KICAD[p.tipo];
    cuenta[def.ref] = (cuenta[def.ref] || 0) + 1;
    p.ref = def.ref + cuenta[def.ref];
  }

  const nodo = calcularNodos(circuito);
  const redes = new Map(); // raíz → { pads: Map("ref pad" → {ref, pad, pinUno}), uno: Set(nombres de red del Uno) }
  const anotar = (refPin, ref, pad, pinUno) => {
    const raiz = nodo(refPin);
    if (!redes.has(raiz)) redes.set(raiz, { pads: new Map(), uno: new Set() });
    const red = redes.get(raiz);
    red.pads.set(ref + ' ' + pad, { ref, pad, pinUno });
    if (pinUno) red.uno.add(RED_UNO[pinUno] || pinUno);
  };
  const cableados = new Set(circuito.cables.flatMap((c) => [c.de, c.a]));
  for (const [pin, { ref, pad }] of Object.entries(PIN_SHIELD)) if (cableados.has('placa.' + pin)) anotar('placa.' + pin, ref, pad, pin);
  for (const p of piezas) for (const [pin, pad] of Object.entries(PIEZAS_KICAD[p.tipo].pads)) anotar(p.id + '.' + pin, p.ref, pad, null);

  const numerico = (a, b) => a.localeCompare(b, 'en', { numeric: true });
  const lista = [...redes.values()]
    .filter((r) => r.pads.size >= 2)
    .map((r) => {
      const pads = [...r.pads.values()].sort((a, b) => numerico(a.ref, b.ref) || numerico(a.pad, b.pad));
      const delUno = PRIORIDAD_RED.find((n) => r.uno.has(n)) || [...r.uno].sort(numerico)[0];
      return { nombre: delUno || `Net-(${pads[0].ref}-Pad${pads[0].pad})`, pads };
    })
    .sort((a, b) => numerico(a.nombre, b.nombre));

  const L = [];
  const comp = (ref, valor, huella, lib, parte, id, uuid) =>
    L.push(
      '\t\t(comp',
      `\t\t\t(ref ${q(ref)})`,
      `\t\t\t(value ${q(valor)})`,
      `\t\t\t(footprint ${q(huella)})`,
      `\t\t\t(libsource (lib ${q(lib)}) (part ${q(parte)}) (description ""))`,
      `\t\t\t(property (name "TecnoCircuito") (value ${q(id)}))`,
      '\t\t\t(sheetpath (names "/") (tstamps "/"))',
      `\t\t\t(tstamps ${q(uuid)})`,
      '\t\t)',
    );
  L.push('(export', '\t(version "E")', '\t(design', `\t\t(source ${q(nombre)})`, `\t\t(date ${q(fecha)})`, `\t\t(tool ${q(herramienta)})`, '\t)');
  L.push('\t(components');
  for (const j of CONECTORES_SHIELD) comp(j.ref, j.valor, j.huella, 'Connector_Generic', j.parte, 'placa', j.uuid);
  for (const p of piezas) {
    const def = PIEZAS_KICAD[p.tipo];
    comp(p.ref, def.valor(p.props || {}), def.huella, def.lib, def.parte, p.id, uuidDe(nombre + '/' + p.id));
  }
  L.push('\t)', '\t(nets');
  lista.forEach((red, i) => {
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
