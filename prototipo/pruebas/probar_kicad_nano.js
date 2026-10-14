// SPDX-License-Identifier: Apache-2.0
// Prueba la exportación Nano y el circuito de referencia de expansión, sin navegador.
// Tras construir pruebas/kicad.cjs, ejecutar con Node; deja entradas para probar_kicad_nano_pcb.py.
const fs = require('fs');
const path = require('path');
const { netlistKiCad, MODULO_NANO_KICAD, EXPANSION_NANO_KICAD } = require('./kicad.cjs');

let fallos = 0;
let comprobaciones = 0;
function revisar(condicion, texto) {
  comprobaciones++;
  console.log((condicion ? 'OK    ' : 'FALLA ') + texto);
  if (!condicion) fallos++;
}
function leer(texto) {
  const componentes = {};
  for (const bloque of texto.split('\t\t(comp\n').slice(1)) {
    const ref = bloque.match(/\(ref "([^"]+)"\)/)[1];
    componentes[ref] = { valor: bloque.match(/\(value "([^"]*)"\)/)[1], huella: bloque.match(/\(footprint "([^"]+)"\)/)[1] };
  }
  const redes = {};
  for (const bloque of texto.split('\t\t(net\n').slice(1)) {
    const nombre = bloque.match(/\(name "([^"]+)"\)/)[1];
    redes[nombre] = [...bloque.matchAll(/\(node \(ref "([^"]+)"\) \(pin "([^"]+)"\)/g)].map((m) => m[1] + '.' + m[2]);
  }
  return { componentes, redes };
}
const igual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const FECHA = '2026-10-11T00:00:00';
const opciones = { nombre: 'Nano referencia', fecha: FECHA };
const SALIDA = path.join(__dirname, 'capturas', 'kicad_nano');
fs.mkdirSync(SALIDA, { recursive: true });

// Mapa independiente: numeración física del módulo según el símbolo KiCad y el Nano clásico. Los nombres de los pads
// repetidos (GND2/RESET2 en la fila de D12…D1) son los del lienzo: especificación de entrega, sección 6.1.
const FISICOS = ['D1', 'D0', 'RESET2', 'GND2', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12',
  'D13', '3V3', 'AREF', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', '5V', 'RESET', 'GND1', 'VIN'];
revisar(igual(Object.fromEntries(FISICOS.map((pin, i) => [pin, String(i + 1)])), MODULO_NANO_KICAD.pines),
  'los 30 pads del Nano conservan el mapa físico independiente, incluidos A6/A7 y RESET/GND repetidos');
const completo = {
  formato: 1, placa: 'nano',
  componentes: FISICOS.map((pin, i) => ({ id: 'r' + (i + 1), tipo: 'resistencia', props: { ohmios: 1000 } })),
  cables: FISICOS.map((pin, i) => ({ de: 'placa.' + pin, a: 'r' + (i + 1) + '.1' })),
};
const textoCompleto = netlistKiCad(completo, opciones);
const mapa = leer(textoCompleto);
for (const [i, pin] of FISICOS.entries()) {
  const red = pin.startsWith('GND') ? 'GND' : pin.startsWith('RESET') ? 'RESET' : pin === '5V' ? '+5V' : pin === '3V3' ? '+3V3' : pin;
  revisar(mapa.redes[red]?.includes('U1.' + (i + 1)) && mapa.redes[red]?.includes('R' + (i + 1) + '.1'),
    `${pin}: pad ${i + 1} del módulo unido a su resistencia externa`);
}
revisar(Object.keys(mapa.componentes).length === 31 && mapa.componentes.U1.huella === 'Module:Arduino_Nano',
  'Nano sin expansión: un módulo y las 30 piezas externas; ningún header del Uno');
revisar(!/ATmega|CH340|FT232|74HC595|PinSocket_1x08|PinSocket_1x10/.test(textoCompleto),
  'la electrónica del módulo no se desarma ni aparecen los cuatro conectores del Uno');
revisar(netlistKiCad({ ...completo, placa: 'nano_old' }, opciones) === textoCompleto,
  'nano_old conserva exactamente los pads, redes, huellas y UUID de nano');
fs.writeFileSync(path.join(SALIDA, 'nano_30_pads.net'), textoCompleto);

const expansion = (variante, alimentacion = 'usb') => ({
  formato: 1, placa: 'nano', componentes: [{ id: 'exp1', tipo: 'shield_nano_io', props: { variante, alimentacion, voltajeJack: 9 } }], cables: [],
});
const dosExpansiones = expansion('roja');
dosExpansiones.componentes.push({ id: 'exp2', tipo: 'shield_nano_io', props: { variante: 'azul' } });
let rechazoMultiple = '';
try { netlistKiCad(dosExpansiones, opciones); } catch (error) { rechazoMultiple = error.message; }
revisar(/una expansión E\/S por Nano/.test(rechazoMultiple),
  'dos expansiones se rechazan antes de exportar: no se repiten nombres de redes privadas que KiCad fusionaría');
const textoRoja = netlistKiCad(expansion('roja'), opciones);
const roja = leer(textoRoja);
revisar(Object.keys(roja.componentes).length === 11 && roja.componentes.U1.huella === 'Module:Arduino_Nano',
  'conjunto: módulo Nano, dos reguladores, cinco condensadores y solo jack/I2C/SPI');
revisar(igual(Object.keys(roja.componentes).filter((ref) => ref.startsWith('J')), ['J1', 'J2', 'J3']),
  'no se agregan todos los GVS, UART ni un módulo opaco de expansión');
revisar(igual(roja.redes.JACK_VIN, ['C1.1', 'C4.1', 'J1.1', 'U2.3']),
  'jack centro +, filtro de entrada y VIN del regulador 5V comparten JACK_VIN');
revisar(!Object.values(roja.redes).some((pads) => pads.includes('U1.30')),
  'Nano.VIN queda sin red: jack no paraleliza el regulador interno del módulo');
revisar(roja.redes['+5V'].includes('U1.27') && roja.redes['+5V'].includes('U2.2') && roja.redes['+5V'].includes('U3.3'),
  'salida 5V externa alimenta pad27 del Nano y entrada del regulador 3V3');
revisar(igual(roja.redes.REG_3V3, ['C3.1', 'U3.2']) && !roja.redes.REG_3V3.includes('U1.17'),
  '3V3 de expansión tiene filtro propio y permanece separada del pad17 del Nano');
revisar(['U1.4', 'U1.29', 'U2.1', 'U3.1', 'J1.2', 'C1.2', 'C2.2', 'C3.2', 'C4.2', 'C5.2'].every((pad) => roja.redes.GND.includes(pad)),
  'GND reúne ambos GND del módulo, reguladores, sleeve del jack y negativos de todos los filtros');
revisar(!Object.values(roja.redes).some((pads) => pads.includes('J1.3')),
  'contacto conmutado del jack (pad3) sin red; no se confunde con center o sleeve');
for (const [red, pad] of Object.entries({ A4: 'J2.1', A5: 'J2.2', D12: 'J3.1', D11: 'J3.2', D13: 'J3.3', D10: 'J3.4' }))
  revisar(roja.redes[red]?.includes(pad), `${red} llega al pad de comunicación ${pad}`);
revisar(['J2.3', 'J3.5'].every((pad) => roja.redes['+5V'].includes(pad)) && ['J2.4', 'J3.6'].every((pad) => roja.redes.GND.includes(pad)),
  'I2C y SPI incluyen alimentación5V y masa con su orden de referencia');
revisar((textoRoja.match(/TecnoCircuito_validacion/g) || []).length === 10 && /referencia por validar/.test(textoRoja),
  'cada componente de expansión declara que es circuito de referencia por validar');
revisar(netlistKiCad(expansion('azul'), opciones) === textoRoja,
  'variantes roja/azul tienen las mismas redes eléctricas de referencia');
revisar(netlistKiCad(expansion('roja', 'jack'), opciones) === textoRoja && netlistKiCad(expansion('roja', 'apagada'), opciones) === textoRoja,
  'selección de alimentación del simulador no altera las conexiones físicas exportadas');
revisar(!Object.values(roja.redes).some((pads) => pads.includes('U2.3') && pads.includes('U2.2')) &&
  !Object.values(roja.redes).some((pads) => pads.includes('U3.3') && pads.includes('U3.2')),
  'las entradas y salidas de ambos reguladores quedan en redes diferentes');
fs.writeFileSync(path.join(SALIDA, 'nano_expansion_roja.net'), textoRoja);
fs.writeFileSync(path.join(SALIDA, 'nano_expansion_azul.net'), netlistKiCad(expansion('azul'), opciones));

const conCarga = expansion('roja');
conCarga.componentes.push({ id: 'rNano', tipo: 'resistencia', props: { ohmios: 1000 } }, { id: 'rExp', tipo: 'resistencia', props: { ohmios: 220 } });
conCarga.cables.push({ de: 'placa.3V3', a: 'rNano.1' }, { de: 'exp1.OUT_3V3', a: 'rExp.1' },
  { de: 'rNano.2', a: 'placa.GND1' }, { de: 'rExp.2', a: 'exp1.GND_OUT' });
const cargas = leer(netlistKiCad(conCarga, opciones));
revisar(igual(cargas.redes['+3V3'], ['R1.1', 'U1.17']) && cargas.redes.REG_3V3.includes('R2.1') && !cargas.redes.REG_3V3.includes('R1.1'),
  'cargas externas de Nano3V3 y expansión3V3 conservan dos redes independientes');

const directa = {
  formato: 1, placa: 'nano', componentes: [{ id: 'r1', tipo: 'resistencia', props: { ohmios: 220 } }, { id: 'led1', tipo: 'led', props: {} }],
  cables: [{ de: 'placa.D13', a: 'r1.1' }, { de: 'r1.2', a: 'led1.anodo' }, { de: 'led1.catodo', a: 'placa.GND1' }],
};
const porExpansion = { ...directa, componentes: [...expansion('roja').componentes, ...directa.componentes],
  cables: [{ de: 'exp1.D13_S', a: 'r1.1' }, { de: 'r1.2', a: 'led1.anodo' }, { de: 'led1.catodo', a: 'exp1.D13_G' }] };
const d = leer(netlistKiCad(directa, opciones)).redes;
const e = leer(netlistKiCad(porExpansion, opciones)).redes;
revisar(igual(d.D13, e.D13.filter((pad) => !pad.startsWith('J'))) && igual(d['Net-(D1-Pad2)'], e['Net-(D1-Pad2)']),
  'LED/resistencia exportan su circuito habitual al llegar por GVS; la señal equivale al pin directo del Nano');

const aliases = { formato: 1, placa: 'nano', componentes: [{ id: 'r1', tipo: 'resistencia', props: {} }, { id: 'r2', tipo: 'resistencia', props: {} }],
  cables: [{ de: 'placa.SDA', a: 'r1.1' }, { de: 'placa.SCL', a: 'r2.1' }] };
const a = leer(netlistKiCad(aliases, opciones));
revisar(igual(a.redes.A4, ['R1.1', 'U1.23']) && igual(a.redes.A5, ['R2.1', 'U1.24']),
  'alias SDA/SCL llegan al módulo por pads23/24; no generan pads inexistentes');

const servo = expansion('azul');
servo.componentes.push({ id: 's1', tipo: 'servo', props: { modelo: 'sg90' } });
servo.cables.push({ de: 's1.SIG', a: 'exp1.D9_S' }, { de: 's1.VCC', a: 'exp1.D9_V' }, { de: 's1.GND', a: 'exp1.D9_G' });
revisar(!!leer(netlistKiCad(servo, opciones)).componentes.M1,
  'servo por GVS conserva su conector propio porque el alcance no exporta todos los headersGVS');
const motor = expansion('roja');
motor.componentes.push({ id: 'm1', tipo: 'motor_tt', props: {} });
motor.cables.push({ de: 'm1.A', a: 'exp1.OUT_3V3' }, { de: 'm1.B', a: 'exp1.GND_OUT' });
revisar(!!leer(netlistKiCad(motor, opciones)).componentes.J4,
  'pieza externa en salida3V3 conserva su bornera cuando no existe un conector exportado que la cubra');

fs.writeFileSync(path.join(SALIDA, 'piezas.json'), JSON.stringify({ modulo: MODULO_NANO_KICAD, expansion: EXPANSION_NANO_KICAD }, null, 2));
console.log(`\n${comprobaciones} comprobaciones; ${fallos} falla(s)`);
process.exit(fallos ? 1 : 0);
