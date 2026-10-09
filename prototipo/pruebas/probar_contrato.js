// Prueba el esquema del circuito (contrato/circuito.schema.json) con Node, sin navegador:
//   1. el código está de acuerdo con el contrato (pines, colores, huecos de la protoboard, tabla de KiCad);
//   2. los ejemplos del contrato y de la página de prueba cumplen el esquema;
//   3. los circuitos con errores se rechazan con un mensaje que dice qué está mal.
// Lo que guarda el lienzo se revisa en Chromium (probar_protoboard.py). Uso: npm run probar:contrato
const fs = require('fs');
const path = require('path');
const { revisarCircuito, ESQUEMA, PINES, PINES_PLACA, HUECO } = require('./contrato.js');
const { COLORES_CABLE, TIPOS, PLACAS, huecos, PIEZAS_KICAD, CONECTORES_SHIELD } = require('./codigo.cjs');

let fallos = 0;
function revisar(condicion, texto) {
  console.log((condicion ? 'OK    ' : 'FALLA ') + texto);
  if (!condicion) fallos++;
}
const mismo = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
const D = ESQUEMA.$defs;

// 1. El código está de acuerdo con el contrato
console.log('— El código y el contrato dicen lo mismo');
const uno = fs.readFileSync(require.resolve('@wokwi/elements/dist/esm/arduino-uno-element.js'), 'utf8');
const pinesWokwi = [...new Set([...uno.matchAll(/\{ name: '([^']+)', x:/g)].map((m) => PLACAS.uno.nombrePin(m[1])))];
revisar(mismo(pinesWokwi, PINES_PLACA.uno), `los ${pinesWokwi.length} pines del dibujo del Uno, con su nombre del contrato, son los del esquema`);
const DIBUJO = { resistencia: ['1', '2'], led: ['A', 'C'], potenciometro: ['GND', 'SIG', 'VCC'], pulsador: ['1.l', '1.r', '2.l', '2.r'] };
for (const [tipo, nombres] of Object.entries(DIBUJO)) {
  revisar(mismo(nombres.map(TIPOS[tipo].nombrePin), PINES[tipo]), `${tipo}: los pines del catálogo (${nombres.map(TIPOS[tipo].nombrePin).join(', ')}) son los del esquema`);
}
for (const [tipo, def] of Object.entries(TIPOS).filter(([, d]) => d.dibujo)) {
  revisar(mismo(Object.keys(def.dibujo.pines), PINES[tipo]), `${tipo} (pieza Tecno): los pines de su dibujo (${Object.keys(def.dibujo.pines).join(', ')}) son los del esquema`);
}
const modelosEsquema = D.componente.allOf.find((r) => r.if.properties.tipo.const === 'servo').then.properties.props.properties.modelo.enum;
revisar(mismo(TIPOS.servo.campo.opciones.map((o) => o[0]), modelosEsquema), `servo: los modelos del catálogo (${modelosEsquema.join(', ')}) son los del esquema`);
revisar(mismo(Object.keys(TIPOS), Object.keys(PINES)), `cada tipo del catálogo tiene sus pines en el esquema (${Object.keys(TIPOS).join(', ')})`);
revisar(JSON.stringify(Object.keys(COLORES_CABLE)) === JSON.stringify(D['color-cable'].enum), 'los 10 colores de cable, en el mismo orden del código de colores');
for (const tipo of ['led', 'pulsador']) {
  const delEsquema = D.componente.allOf.find((r) => r.if.properties.tipo.const === tipo).then.properties.props.properties.color.enum;
  revisar(mismo(TIPOS[tipo].campo.opciones.map((o) => o[0]), delEsquema), `${tipo}: los colores del catálogo son los del esquema`);
}
const nombres = huecos('media').map((h) => h.nombre);
const NO_HUECOS = ['a0', 'a31', 'k1', 's+1', 's-7', 'i+13', 'i-19', 's+25', 'x+3', 'a', 's+'];
revisar(nombres.length === 400 && nombres.every((n) => HUECO.test(n)) && !NO_HUECOS.some((n) => HUECO.test(n)),
  `los 400 huecos de protoboard.js cumplen el patrón del esquema, y ${NO_HUECOS.join(', ')} no`);
for (const [tipo, d] of Object.entries(PIEZAS_KICAD)) {
  revisar(mismo(Object.keys(d.pads), PINES[tipo]), `KiCad: la tabla de pads de ${tipo} tiene todos los pines del esquema, ni más ni menos`);
}
const enConectores = CONECTORES_SHIELD.flatMap((j) => Object.keys(j.pines));
revisar(mismo(enConectores, PINES_PLACA.uno) && new Set(enConectores).size === enConectores.length,
  `KiCad: los conectores J1 a J4 del shield tienen cada pin del Uno una sola vez (${enConectores.length})`);

// 2. Los ejemplos cumplen el esquema
console.log('— Los ejemplos cumplen el contrato');
const contrato = fs.readFileSync(path.join(__dirname, '..', '..', 'CONTRATO.md'), 'utf8').replace(/\r\n/g, '\n');
const delContrato = JSON.parse(contrato.split('## 4. Formato del circuito')[1].match(/```json\n([\s\S]*?)\n```/)[1]);
const p1 = revisarCircuito(delContrato);
revisar(!p1.length, 'el ejemplo de CONTRATO.md, sección 4' + (p1.length ? ': ' + p1.join(' | ') : ''));
const pagina = fs.readFileSync(path.join(__dirname, '..', 'pagina.html'), 'utf8');
const bloque = pagina.slice(pagina.indexOf('const INICIAL = {'), pagina.indexOf(String.fromCharCode(10), pagina.indexOf('const EJEMPLO_SEIS =')));
const ejemplos = new Function(bloque + '\nreturn { INICIAL, EJEMPLO, EJEMPLO_T1, EJEMPLO_T2, EJEMPLO_PB, EJEMPLO_SERVO, EJEMPLO_SERVOS, EJEMPLO_SEIS };')();
for (const [nombre, circuito] of Object.entries(ejemplos)) {
  const p = revisarCircuito(circuito);
  revisar(!p.length, `${nombre} de la página de prueba` + (p.length ? ': ' + p.join(' | ') : ''));
}

// 3. Lo que está mal se rechaza, y lo nuevo se acepta
console.log('— Lo que está mal se rechaza con su motivo');
const base = () => JSON.parse(JSON.stringify(ejemplos.EJEMPLO_PB));
const casos = [
  ['un tipo de pieza que esta versión no conoce', (c) => c.componentes.push({ id: 'm1', tipo: 'motor', x: 0, y: 0, props: { rpm: 200 } }), null],
  ['un campo que esta versión no conoce', (c) => { c.notas = 'de una versión nueva'; c.componentes[0].etiqueta = 'R de la T1'; }, null],
  ['un cable sin color ni dobleces', (c) => c.cables.push({ de: 'placa.D3', a: 'protoboard.j1' }), null],
  ['formato 2', (c) => { c.formato = 2; }, /formato/],
  ['placa «leonardo»', (c) => { c.placa = 'leonardo'; }, /placa/],
  ['giro de 45°', (c) => { c.componentes[0].rot = 45; }, /rot/],
  ['cable «fucsia»', (c) => { c.cables[0].color = 'fucsia'; }, /color/],
  ['LED «morado»', (c) => { c.componentes[1].props.color = 'morado'; }, /props\/color/],
  ['un servo de un modelo que no existe', (c) => c.componentes.push({ id: 's1', tipo: 'servo', x: 0, y: 0, props: { modelo: 'mg996r' } }), /modelo/],
  ['un cable a la pata «PWM» del servo (se llama SIG)', (c) => { c.componentes.push({ id: 's1', tipo: 'servo', x: 0, y: 0, props: { modelo: 'sg90' } }); c.cables.push({ de: 'placa.D9', a: 's1.PWM' }); }, /no tiene el pin «PWM»/],
  ['potenciómetro con la perilla en 1,5', (c) => c.componentes.push({ id: 'p', tipo: 'potenciometro', x: 0, y: 0, props: { posicion: 1.5 } }), /posicion/],
  ['resistencia de 0 Ω', (c) => { c.componentes[0].props.ohmios = 0; }, /ohmios/],
  ['una pieza llamada «placa»', (c) => { c.componentes[0].id = 'placa'; }, /id/],
  ['un id con punto', (c) => { c.componentes[0].id = 'r.1'; }, /id/],
  ['un doblez con tres números', (c) => { c.cables[0].puntos = [[1, 2, 3]]; }, /puntos/],
  ['la pata «pata» en el «en» del LED', (c) => { c.componentes[1].en = { pata: 'protoboard.a1' }; }, /en/],
  ['dos piezas con el mismo id', (c) => c.componentes.push({ ...c.componentes[0] }), /repetida/],
  ['un cable a una pieza que no existe', (c) => { c.cables[0].a = 'led9.anodo'; }, /no hay ninguna pieza «led9»/],
  ['un cable a un pin que la pieza no tiene', (c) => { c.cables[0].a = 'r1.3'; }, /no tiene el pin «3»/],
  ['un cable a un pin que el Uno no tiene', (c) => { c.cables[0].de = 'placa.D14'; }, /no tiene el pin «D14»/],
  ['un cable al hueco a31', (c) => { c.cables[0].a = 'protoboard.a31'; }, /no tiene el hueco «a31»/],
  ['una pata en el hueco s+7 (no existe en el riel)', (c) => { c.componentes[0].en['1'] = 'protoboard.s+7'; }, /no tiene el hueco «s\+7»/],
  ['«en» sin protoboard', (c) => { c.protoboard = null; c.cables = []; }, /no hay protoboard/],
  ['un cable que empieza y termina en el mismo pin', (c) => c.cables.push({ de: 'placa.D4', a: 'placa.D4' }), /empieza y termina/],
];
for (const [texto, cambiar, espera] of casos) {
  const c = base();
  cambiar(c);
  const p = revisarCircuito(c);
  if (espera === null) revisar(!p.length, `se acepta ${texto}` + (p.length ? ': ' + p.join(' | ') : ''));
  else revisar(p.length > 0 && p.some((x) => espera.test(x)), `se rechaza ${texto}: ${p[0] || '(no se rechazó)'}`);
}

console.log(fallos ? `\n${fallos} FALLA(S)` : '\nTODO BIEN');
process.exit(fallos ? 1 : 0);
