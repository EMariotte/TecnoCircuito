// Prueba la netlist de KiCad con Node, sin navegador: piezas, huellas, redes y que la protoboard desaparezca.
// Deja los .net en pruebas/capturas/kicad/ para probar_kicad_pcb.py, que los arma con las huellas reales de KiCad.
// Uso: npm run probar:kicad   (arma pruebas/kicad.cjs con esbuild y corre este archivo)
const fs = require('fs');
const path = require('path');
const { netlistKiCad, PIEZAS_KICAD, CONECTORES_SHIELD, SHIELD_KICAD, FUERA_KICAD } = require('./kicad.cjs');

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

// 5. El carro con la shield L293D desarmada (el ejemplo de la página)
const EJEMPLO_CARRO = new Function(pagina.slice(pagina.indexOf('const EJEMPLO_CARRO = '), pagina.indexOf('const EJEMPLO_PROBADOR')) + '; return EJEMPLO_CARRO;')();
const textoCarro = netlistKiCad(EJEMPLO_CARRO, { nombre: 'Carro con la shield L293D', fecha: FECHA });
fs.writeFileSync(path.join(SALIDA, 't3_carro.net'), textoCarro);
const carro = leer(textoCarro);
const valores = Object.fromEntries([...textoCarro.matchAll(/\(ref "([^"]+)"\)\s*\(value "([^"]*)"\)/g)].map((m) => [m[1], m[2]]));
revisar(
  igual(valores, {
    J1: 'Power', J2: 'Digital/PWM', J3: 'Analog', J4: 'Digital/PWM', U1: 'L293D', U2: 'L293D', U3: '74HC595',
    J5: 'M1 GND M2', J6: 'M4 GND M3', J7: 'EXT_PWR', J8: 'SERVO_1', J9: 'SERVO_2', JP1: 'PWR',
    C1: '100nF', C2: '100nF', C3: '100nF', C4: '100uF 25V', R1: '1k', D1: 'LED verde',
  }),
  'la shield sale desarmada: U1 y U2 (L293D), U3 (74HC595), borneras J5 a J7, servos J8 y J9, puente JP1, C1 a C4 y el LED con su R',
);
revisar(carro.piezas.U1 === 'Package_DIP:DIP-16_W7.62mm' && carro.piezas.J5 === 'TerminalBlock:TerminalBlock_MaiXu_MX126-5.0-05P_1x05_P5.00mm',
  'huellas: DIP-16 para los integrados y borneras de 5 mm');
// Lo que dice AFMotor_R4 (escrito aquí aparte de src/: si alguien cambia la tabla de la shield, esta prueba lo nota):
// PWM M1 = 11, M2 = 3, M3 = 6, M4 = 5; sentido A y B de cada motor en Q2/Q3, Q1/Q4, Q5/Q7 y Q0/Q6 del 74HC595.
const PATA_Q = { 0: 15, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7 };
const AFMOTOR = { 1: ['D11', 2, 3], 2: ['D3', 1, 4], 3: ['D6', 5, 7], 4: ['D5', 0, 6] };
const CANAL = { 1: ['U1', 1, 2, 3, 7, 6], 2: ['U1', 9, 10, 11, 15, 14], 3: ['U2', 1, 2, 3, 7, 6], 4: ['U2', 9, 10, 11, 15, 14] }; // en, inA, outA, inB, outB
const malos = [];
for (const [m, [pwm, qa, qb]] of Object.entries(AFMOTOR)) {
  const [u, en, inA, outA, inB, outB] = CANAL[m];
  if (!(carro.redes[pwm] || []).includes(`${u}.${en}`)) malos.push(`M${m}: ${pwm} no llega a ${u}.${en}`);
  if (!igual(carro.redes[`IN_M${m}A`], [`${u}.${inA}`, `U3.${PATA_Q[qa]}`].sort())) malos.push(`M${m} A: ${carro.redes[`IN_M${m}A`]}`);
  if (!igual(carro.redes[`IN_M${m}B`], [`${u}.${inB}`, `U3.${PATA_Q[qb]}`].sort())) malos.push(`M${m} B: ${carro.redes[`IN_M${m}B`]}`);
  if (!(carro.redes[`M${m}_A`] || []).includes(`${u}.${outA}`) || !(carro.redes[`M${m}_B`] || []).includes(`${u}.${outB}`)) malos.push(`M${m}: salidas`);
}
revisar(!malos.length, 'cada motor: su PWM llega a la habilitación de su canal y su sentido sale de la Q del 74HC595 que usa AFMotor_R4' + (malos.length ? ': ' + malos.join('; ') : ''));
revisar(igual(carro.redes.D8, ['J2.10', 'U3.14']) && igual(carro.redes.D4, ['J4.4', 'U3.11']) && igual(carro.redes.D12, ['J2.6', 'U3.12']) && igual(carro.redes.D7, ['J4.1', 'U3.13']),
  '74HC595: datos D8 (pata 14), reloj D4 (11), cierre D12 (12) y habilitación D7 (13)');
revisar(carro.redes['+5V'].includes('U3.10') && carro.redes['+5V'].includes('U1.16') && carro.redes['+5V'].includes('U2.16'), 'el 74HC595 (pata 10, borrado) y la lógica de los L293D (pata 16) van a +5V');
revisar(igual(carro.redes.VMOT, ['C4.1', 'J7.1', 'JP1.1', 'R1.1', 'U1.8', 'U2.8']) && igual(carro.redes.VIN, ['J1.8', 'JP1.2']),
  'VMOT: EXT_PWR, los motores de los L293D (pata 8), C4 y el LED; el puente PWR une VMOT con VIN');
revisar(igual(carro.redes.D10, ['J2.8', 'J8.1']) && igual(carro.redes.D9, ['J2.9', 'J9.1']), 'SERVO_1 va al pin 10 y SERVO_2 al 9');
revisar(['U1.4', 'U1.5', 'U1.12', 'U1.13', 'U2.4', 'U3.8', 'J5.3', 'J6.3', 'J7.2', 'C4.2', 'D1.1'].every((p) => carro.redes.GND.includes(p)), 'GND: los integrados, las borneras, EXT_PWR, C4 y el LED');
revisar(!/Motor TT|LiPo/.test(textoCarro.split('(nets')[0]), 'los motores y la batería usan las borneras de la shield: no agregan conectores');
revisar(netlistKiCad(EJEMPLO_CARRO, { nombre: 'Carro con la shield L293D', fecha: FECHA }) === textoCarro, 'exportar dos veces da el mismo texto');

// 6. Piezas de afuera: un conector solo si llegan a la placa por otro lado
const fuera = (componentes, cables) => leer(netlistKiCad({ formato: 1, placa: 'uno', componentes, cables }, { fecha: FECHA }));
const motorDirecto = fuera([{ id: 'motor1', tipo: 'motor_tt', props: {} }], [{ de: 'motor1.A', a: 'placa.5V' }, { de: 'motor1.B', a: 'placa.GND1' }]);
revisar(motorDirecto.piezas.J5 === 'TerminalBlock:TerminalBlock_MaiXu_MX126-5.0-02P_1x02_P5.00mm' && igual(motorDirecto.redes['+5V'], ['J1.5', 'J5.1']),
  'un motor directo al 5V (sin shield) llega por una bornera de 2 (J5)');
const servoEnShield = fuera(
  [{ id: 'shield1', tipo: 'shield_l293d', props: {} }, { id: 'servo1', tipo: 'servo', props: { modelo: 'sg90' } }],
  [{ de: 'servo1.SIG', a: 'shield1.S1_SIG' }, { de: 'servo1.VCC', a: 'shield1.S1_POS' }, { de: 'servo1.GND', a: 'shield1.S1_GND' }],
);
revisar(!servoEnShield.piezas.M1, 'un servo enchufado en SERVO_1 no repite su conector: usa J8');
const servoSuelto = fuera([{ id: 'servo1', tipo: 'servo', props: { modelo: 'sg90' } }], [{ de: 'servo1.SIG', a: 'placa.D9' }]);
revisar(servoSuelto.piezas.M1 === 'Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical', 'sin shield, el servo sigue siendo su conector de 3 pines (M1)');
const servoSinCables = fuera([{ id: 'servo1', tipo: 'servo', props: { modelo: 'sg90' } }], []);
revisar(!!servoSinCables.piezas.M1, 'un servo sin cables entra a las piezas, como cualquier pieza');
const soloBalance = fuera(
  [{ id: 'bateria1', tipo: 'bateria_lipo', props: {} }, { id: 'probador1', tipo: 'probador_lipo', props: {} }],
  [{ de: 'bateria1.BAL0', a: 'probador1.NEG' }, { de: 'bateria1.BAL1', a: 'probador1.C1' }, { de: 'bateria1.BAL2', a: 'probador1.C2' }],
);
revisar(Object.keys(soloBalance.piezas).length === 4, 'la batería con el probador no tocan la placa: no aparecen');
const bateriaVin = fuera([{ id: 'bateria1', tipo: 'bateria_lipo', props: {} }], [{ de: 'bateria1.POS', a: 'placa.VIN' }, { de: 'bateria1.NEG', a: 'placa.GND2' }]);
revisar(igual(bateriaVin.redes.VIN, ['J1.8', 'J5.1']) && !bateriaVin.piezas.J6, 'la batería al VIN llega por una bornera de 2; su balance, que no toca la placa, no agrega conector');
// Revisión de código del 11 oct: con la batería al VIN y el probador en el balance, el balance comparte el − con GND
// por dentro de la batería, pero sus cables solo van al probador: ni el balance ni el probador tocan la placa.
const conProbador = fuera(
  [{ id: 'bateria1', tipo: 'bateria_lipo', props: {} }, { id: 'probador1', tipo: 'probador_lipo', props: {} }],
  [{ de: 'bateria1.POS', a: 'placa.VIN' }, { de: 'bateria1.NEG', a: 'placa.GND2' },
    { de: 'bateria1.BAL0', a: 'probador1.NEG' }, { de: 'bateria1.BAL1', a: 'probador1.C1' }, { de: 'bateria1.BAL2', a: 'probador1.C2' }],
);
revisar(Object.keys(conProbador.piezas).join(',') === 'J1,J2,J3,J4,J5', `batería al VIN con el probador en el balance: solo la bornera de la batería (${Object.keys(conProbador.piezas).join(', ')})`);

// La tabla de huellas y pads, para que probar_kicad_pcb.py la compare con las librerías de KiCad
const tabla = Object.entries(PIEZAS_KICAD).map(([tipo, d]) => [tipo, { lib: d.lib, parte: d.parte, huella: d.huella, pads: d.pads }]);
for (const d of SHIELD_KICAD) tabla.push([`shield ${d.valor} ${d.nota || ''}`.trim(), { lib: d.lib, parte: d.parte, huella: d.huella, pads: Object.fromEntries(Object.keys(d.pads).map((pad) => [pad, pad])) }]);
for (const [tipo, grupos] of Object.entries(FUERA_KICAD)) for (const g of grupos) tabla.push([`${tipo} ${g.valor()}`, { lib: g.lib, parte: g.parte, huella: g.huella, pads: g.pines }]);
fs.writeFileSync(path.join(SALIDA, 'piezas.json'), JSON.stringify({ piezas: Object.fromEntries(tabla), conectores: CONECTORES_SHIELD }, null, 2));

console.log(fallos ? `\n${fallos} FALLA(S)` : '\nTODO BIEN');
process.exit(fallos ? 1 : 0);
