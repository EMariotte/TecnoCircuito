// Netlist de KiCad: el circuito como lista de piezas (con su huella) y de redes, para empezar una placa en KiCad.
// No toca la página: la usan el lienzo (exportarNetlist) y las pruebas con Node.
//
// Formato: el «export» S-expression versión "E", el mismo que escribe Eeschema (kicad-cli sch export netlist).
// En el editor de placas de KiCad (Pcbnew): Archivo → Importar → Netlist. Aparecen las huellas con las líneas
// que dicen qué va con qué; el aprendiz ubica las piezas y traza las pistas. Ver COMO-FUNCIONA.md, sección 43.
//
// Lo que desaparece: la protoboard, sus tiras y los cables (son solo conexiones; quedan dentro de cada red).
// La placa no se fabrica: la huella del Uno es el contorno y los conectores de un shield que se monta encima.

import { calcularNodos } from './conexiones.js';

// Pines del Uno → número de pad de la huella Module:Arduino_UNO_R3. Sale del símbolo MCU_Module:Arduino_UNO_R3
// de KiCad 10 y se comprobó con la posición de cada pad (pruebas/probar_kicad_pcb.py).
const PADS_UNO = {
  IOREF: '2', RESET: '3', '3V3': '4', '5V': '5', GND2: '6', GND3: '7', VIN: '8',
  A0: '9', A1: '10', A2: '11', A3: '12', A4: '13', A5: '14',
  D0: '15', D1: '16', D2: '17', D3: '18', D4: '19', D5: '20', D6: '21', D7: '22',
  D8: '23', D9: '24', D10: '25', D11: '26', D12: '27', D13: '28',
  GND1: '29', AREF: '30', SDA: '31', SCL: '32',
};
// Nombre de la red cuando toca un pin del Uno (los tres GND y A4/SDA, A5/SCL están unidos en la placa).
const RED_UNO = { GND1: 'GND', GND2: 'GND', GND3: 'GND', '5V': '+5V', '3V3': '+3V3', SDA: 'A4', SCL: 'A5' };
// Si una red toca varios pines del Uno (un corto), manda el primero de esta lista.
const PRIORIDAD_RED = ['GND', '+5V', '+3V3', 'VIN'];

const kOhm = (ohmios) => (ohmios >= 1000 ? +(ohmios / 1000).toFixed(2) + 'k' : String(ohmios));

// Cada tipo de pieza: referencia (como en KiCad), símbolo, huella, valor y pads.
// Los números de pad se comprobaron con las huellas de KiCad 10 (pruebas/probar_kicad_pcb.py).
export const PIEZAS_KICAD = {
  placa: {
    ref: 'A', lib: 'MCU_Module', parte: 'Arduino_UNO_R3', huella: 'Module:Arduino_UNO_R3',
    valor: () => 'Arduino_UNO_R3', pads: PADS_UNO,
  },
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
//   Piezas: la placa y cada componente que KiCad conoce (la protoboard no es pieza: es parte de las redes).
//   Redes: los grupos de calcularNodos() con dos pads o más. Del Uno solo entran los pines con un cable,
//   porque son los agujeros que se usan en el shield.
export function netlistKiCad(circuito, { nombre = 'Circuito', fecha = new Date().toISOString().slice(0, 19), herramienta = 'TecnoCircuito' } = {}) {
  const piezas = [{ id: 'placa', tipo: 'placa', props: {} }, ...circuito.componentes.filter((c) => PIEZAS_KICAD[c.tipo])];
  const cuenta = {};
  for (const p of piezas) {
    const def = PIEZAS_KICAD[p.tipo];
    cuenta[def.ref] = (cuenta[def.ref] || 0) + 1;
    p.ref = def.ref + cuenta[def.ref];
  }

  const nodo = calcularNodos(circuito);
  const cableados = new Set(circuito.cables.flatMap((c) => [c.de, c.a]));
  const redes = new Map(); // raíz → { pads: Map("ref pad" → {ref, pad, pinUno}), uno: Set(nombres de red del Uno) }
  for (const p of piezas) {
    for (const [pin, pad] of Object.entries(PIEZAS_KICAD[p.tipo].pads)) {
      const refPin = p.id + '.' + pin;
      if (p.tipo === 'placa' && !cableados.has(refPin)) continue;
      const raiz = nodo(refPin);
      if (!redes.has(raiz)) redes.set(raiz, { pads: new Map(), uno: new Set() });
      const red = redes.get(raiz);
      red.pads.set(p.ref + ' ' + pad, { ref: p.ref, pad, pinUno: p.tipo === 'placa' ? pin : null });
      if (p.tipo === 'placa') red.uno.add(RED_UNO[pin] || pin);
    }
  }

  const ordenRef = (a, b) => a.ref.localeCompare(b.ref, 'en', { numeric: true }) || a.pad.localeCompare(b.pad, 'en', { numeric: true });
  const lista = [...redes.values()]
    .filter((r) => r.pads.size >= 2)
    .map((r) => {
      const pads = [...r.pads.values()].sort(ordenRef);
      const delUno = PRIORIDAD_RED.find((n) => r.uno.has(n)) || [...r.uno].sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))[0];
      const nombreRed = delUno || `Net-(${pads[0].ref}-Pad${pads[0].pad})`;
      return { nombre: nombreRed, pads };
    })
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'en', { numeric: true }));

  const L = [];
  L.push('(export', '\t(version "E")', '\t(design', `\t\t(source ${q(nombre)})`, `\t\t(date ${q(fecha)})`, `\t\t(tool ${q(herramienta)})`, '\t)');
  L.push('\t(components');
  for (const p of piezas) {
    const def = PIEZAS_KICAD[p.tipo];
    L.push(
      '\t\t(comp',
      `\t\t\t(ref ${q(p.ref)})`,
      `\t\t\t(value ${q(def.valor(p.props || {}))})`,
      `\t\t\t(footprint ${q(def.huella)})`,
      `\t\t\t(libsource (lib ${q(def.lib)}) (part ${q(def.parte)}) (description ""))`,
      `\t\t\t(property (name "TecnoCircuito") (value ${q(p.id)}))`,
      '\t\t\t(sheetpath (names "/") (tstamps "/"))',
      `\t\t\t(tstamps ${q(uuidDe(nombre + '/' + p.id))})`,
      '\t\t)',
    );
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
