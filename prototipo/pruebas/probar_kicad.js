// Prueba la netlist de KiCad con Node, sin navegador: piezas, huellas, redes y que la protoboard desaparezca.
// Deja los .net en pruebas/capturas/kicad/ para probar_kicad_pcb.py, que los arma con las huellas reales de KiCad.
// Uso: npm run probar:kicad   (arma pruebas/kicad.cjs con esbuild y corre este archivo)
const fs = require('fs');
const path = require('path');
const { netlistKiCad, PIEZAS_KICAD, CONECTORES_SHIELD } = require('./kicad.cjs');

let fallos = 0;
function revisar(condicion, texto) {
  console.log((condicion ? 'OK    ' : 'FALLA ') + texto);
  if (!condicion) fallos++;
}
const SALIDA = path.join(__dirname, 'capturas', 'kicad');
fs.mkdirSync(SALIDA, { recursive: true });
const FECHA = '2026-10-08T00:00:00';

// Lee la netlist de vuelta: piezas {ref → huella} y redes {nombre → ["R1.2", …]}.
function leer(texto) {
  const piezas = {};
  for (const m of texto.matchAll(/\(ref "([^"]+)"\)\s*\(value "[^"]*"\)\s*\(footprint "([^"]+)"\)/g)) piezas[m[1]] = m[2];
  const redes = {};
  for (const bloque of texto.split('\t\t(net\n').slice(1)) {
    const nombre = bloque.match(/\(name "([^"]+)"\)/)[1];
    redes[nombre] = [...bloque.matchAll(/\(node \(ref "([^"]+)"\) \(pin "([^"]+)"\)/g)].map((m) => m[1] + '.' + m[2]);
  }
  return { piezas, redes };
}
const balanceado = (t) => [...t].reduce((n, ch) => (n < 0 ? n : n + (ch === '(') - (ch === ')')), 0) === 0;
const igual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// 1. La tarea T1 en la protoboard: el ejemplo de la página, tal cual
const pagina = fs.readFileSync(path.join(__dirname, '..', 'pagina.html'), 'utf8');
const EJEMPLO_PB = JSON.parse(pagina.match(/const EJEMPLO_PB = (\{.*\});/)[1]);
const texto = netlistKiCad(EJEMPLO_PB, { nombre: 'T1 en protoboard', fecha: FECHA });
fs.writeFileSync(path.join(SALIDA, 't1_protoboard.net'), texto);
const t1 = leer(texto);
console.log(texto.split('\n').slice(0, 8).join('\n') + '\n…');
revisar(texto.startsWith('(export\n\t(version "E")') && balanceado(texto), 'es una netlist «export» versión E, con los paréntesis cerrados');
revisar(
  igual(t1.piezas, {
    J1: 'Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical',
    J2: 'Connector_PinSocket_2.54mm:PinSocket_1x10_P2.54mm_Vertical',
    J3: 'Connector_PinSocket_2.54mm:PinSocket_1x06_P2.54mm_Vertical',
    J4: 'Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical',
    R1: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal',
    D1: 'LED_THT:LED_D5.0mm',
    SW1: 'Button_Switch_THT:SW_PUSH_6mm',
    R2: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal',
  }),
  'los 4 conectores del shield y las 4 piezas, con su huella; ni el Uno ni la protoboard son piezas: ' + Object.keys(t1.piezas).join(', '),
);
revisar(/\(ref "R1"\)\s*\(value "220"\)/.test(texto) && /\(ref "R2"\)\s*\(value "10k"\)/.test(texto), 'los valores: R1 220 y R2 10k');
const ESPERADAS = {
  D2: ['J4.6', 'R2.1', 'SW1.1'],
  D13: ['J2.5', 'R1.2'],
  GND: ['D1.1', 'J1.6', 'R2.2'],
  'Net-(D1-Pad2)': ['D1.2', 'R1.1'],
  '+5V': ['J1.5', 'SW1.2'],
};
revisar(igual(Object.keys(t1.redes).sort(), Object.keys(ESPERADAS).sort()), 'cinco redes: ' + Object.keys(t1.redes).join(', '));
for (const [nombre, pads] of Object.entries(ESPERADAS)) revisar(igual(t1.redes[nombre], pads), `${nombre}: ${(t1.redes[nombre] || []).join(', ')}`);
revisar(!/protoboard|"a19"|"i-/.test(texto.split('(nets')[1]), 'en las redes no queda ningún hueco de la protoboard');
revisar(CONECTORES_SHIELD.every((j) => texto.includes(`(ref "${j.ref}")`) && texto.includes(`(tstamps "${j.uuid}")`)),
  'los conectores llevan las referencias y los UUID de la plantilla «Arduino Uno Shield» de KiCad (así se reconocen al importar)');
revisar(netlistKiCad(EJEMPLO_PB, { nombre: 'T1 en protoboard', fecha: FECHA }) === texto, 'exportar dos veces da el mismo texto (KiCad reconoce las mismas huellas)');

// 2. El mismo circuito con cables directos da las mismas redes
const conCables = {
  formato: 1,
  placa: 'uno',
  componentes: EJEMPLO_PB.componentes.map(({ en, ...c }) => c),
  cables: [
    { de: 'placa.D13', a: 'r1.2' },
    { de: 'r1.1', a: 'led1.anodo' },
    { de: 'led1.catodo', a: 'placa.GND2' },
    { de: 'placa.5V', a: 'btn1.2d' },
    { de: 'placa.D2', a: 'btn1.1d' },
    { de: 'btn1.1i', a: 'r2.1' },
    { de: 'r2.2', a: 'placa.GND2' },
  ],
};
revisar(igual(leer(netlistKiCad(conCables, { fecha: FECHA })).redes, t1.redes), 'con cables y sin protoboard salen las mismas cinco redes');

// 3. Tarea T2: potenciómetro en A0 (extremos y cursor en los pads 1, 3 y 2)
const t2 = {
  formato: 1,
  placa: 'uno',
  componentes: [{ id: 'pot1', tipo: 'potenciometro', props: { ohmios: 10000, posicion: 0.5 } }],
  cables: [
    { de: 'pot1.GND', a: 'placa.GND1' },
    { de: 'pot1.SIG', a: 'placa.A0' },
    { de: 'pot1.VCC', a: 'placa.5V' },
  ],
};
const textoT2 = netlistKiCad(t2, { nombre: 'T2 potenciometro', fecha: FECHA });
fs.writeFileSync(path.join(SALIDA, 't2_potenciometro.net'), textoT2);
const r2 = leer(textoT2).redes;
revisar(igual(r2, { '+5V': ['J1.5', 'RV1.3'], A0: ['J3.1', 'RV1.2'], GND: ['J2.4', 'RV1.1'] }), 'T2: ' + JSON.stringify(r2));
revisar(/\(ref "RV1"\)\s*\(value "10k"\)/.test(textoT2), 'el potenciómetro es RV1, de 10k');

// 4. Casos de borde
const suelta = netlistKiCad({ formato: 1, placa: 'uno', componentes: [{ id: 'led1', tipo: 'led', props: {} }], cables: [] }, { fecha: FECHA });
revisar(/\(ref "D1"\)/.test(suelta) && Object.keys(leer(suelta).redes).length === 0, 'una pieza sin cables entra a las piezas, sin redes');
const corto = leer(netlistKiCad({ formato: 1, placa: 'uno', componentes: [], cables: [{ de: 'placa.D13', a: 'placa.GND1' }] }, { fecha: FECHA })).redes;
revisar(igual(corto, { GND: ['J2.4', 'J2.5'] }), 'un corto de D13 a GND queda en la red GND: ' + JSON.stringify(corto));
const raro = netlistKiCad({ formato: 1, placa: 'uno', componentes: [], cables: [] }, { nombre: 'Proyecto "uno" \\ prueba', fecha: FECHA });
revisar(raro.includes('(source "Proyecto \\"uno\\" \\\\ prueba")') && balanceado(raro), 'las comillas del nombre se escapan como en KiCad');

// La tabla de huellas y pads, para que probar_kicad_pcb.py la compare con las librerías de KiCad
const tabla = Object.entries(PIEZAS_KICAD).map(([tipo, d]) => [tipo, { lib: d.lib, parte: d.parte, huella: d.huella, pads: d.pads }]);
fs.writeFileSync(path.join(SALIDA, 'piezas.json'), JSON.stringify({ piezas: Object.fromEntries(tabla), conectores: CONECTORES_SHIELD }, null, 2));

console.log(fallos ? `\n${fallos} FALLA(S)` : '\nTODO BIEN');
process.exit(fallos ? 1 : 0);
