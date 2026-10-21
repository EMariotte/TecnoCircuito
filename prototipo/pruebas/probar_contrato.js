// Prueba el esquema del circuito (contrato/circuito.schema.json) con Node, sin navegador:
//   1. el código está de acuerdo con el contrato (pines, colores, huecos de la protoboard, tabla de KiCad);
//   2. los ejemplos del contrato y de la página de prueba cumplen el esquema;
//   3. los circuitos con errores se rechazan con un mensaje que dice qué está mal;
//   4. los eventos del registro (contrato/evento.schema.json): uno de cada tipo se acepta y los mal formados no.
// Lo que guarda el lienzo se revisa en Chromium (probar_protoboard.py). Uso: npm run probar:contrato
const fs = require('fs');
const path = require('path');
const { revisarCircuito, ESQUEMA, PINES, PINES_PLACA, HUECO } = require('./contrato.js');
const { revisarEvento, ESQUEMA: ESQUEMA_EVENTO } = require('./contrato_eventos.js');
const { COLORES_CABLE, TIPOS, PLACAS, huecos, PIEZAS_KICAD, CONECTORES_SHIELD, CATEGORIAS, FICHAS, leerHex, ALIASES_EXPANSION, CLAVES_NO_IDEALIDADES } = require('./codigo.cjs');

let fallos = 0;
function revisar(condicion, texto) {
  console.log((condicion ? 'OK    ' : 'FALLA ') + texto);
  if (!condicion) fallos++;
}
const mismo = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
const D = ESQUEMA.$defs;

// 1. El código está de acuerdo con el contrato
console.log('— El código y el contrato dicen lo mismo');
// Las placas son piezas Tecno con vista de TecnoDiseñador: sus contactos son los del esquema, salvo los nombres que
// son otro nombre del mismo pin (SDA es A4 en el Nano: no tiene agujero propio; en el Uno sí lo tiene).
const ALIAS_NANO = ['SDA', 'SCL', 'MISO', 'MOSI', 'SCK', 'SS'];
for (const placa of ['uno', 'nano', 'nano_old']) {
  const pines = Object.keys(PLACAS[placa].dibujo.pines);
  const esquema = PINES_PLACA[placa].filter((p) => placa === 'uno' || !ALIAS_NANO.includes(p));
  revisar(mismo(pines, esquema), `los ${pines.length} contactos del dibujo de ${PLACAS[placa].nombre} son los del esquema`);
}
const DIBUJO = { resistencia: ['1', '2'], led: ['A', 'C'], potenciometro: ['GND', 'SIG', 'VCC'], pulsador: ['1.l', '1.r', '2.l', '2.r'] };
for (const [tipo, nombres] of Object.entries(DIBUJO)) {
  revisar(mismo(nombres.map(TIPOS[tipo].nombrePin), PINES[tipo]), `${tipo}: los pines del catálogo (${nombres.map(TIPOS[tipo].nombrePin).join(', ')}) son los del esquema`);
}
// Una pieza Tecno cuyo dibujo depende de sus propiedades (el motor y sus vistas) se revisa con cada valor de sus campos.
for (const [tipo, def] of Object.entries(TIPOS).filter(([, d]) => d.dibujo)) {
  const variantes = def.dibujo.marco ? (def.campos || []).flatMap((c) => c.opciones.map(([v]) => ({ ...def.props, [c.prop]: v }))) : [def.props];
  for (const props of variantes) {
    const pines = Object.keys((def.dibujo.marco ? def.dibujo.marco(props) : def.dibujo).pines);
    const nombres = tipo === 'shield_nano_io' ? [...pines, ...Object.keys(ALIASES_EXPANSION)] : pines;
    revisar(mismo(nombres, PINES[tipo]), `${tipo} (pieza Tecno${def.dibujo.marco ? ', ' + JSON.stringify(props) : ''}): los contactos físicos y aliases documentados coinciden con el esquema`);
  }
}
// La biblioteca de piezas: cada tipo del catálogo (y la protoboard) está en una sola categoría y tiene su ficha completa.
{
  const enCategorias = CATEGORIAS.flatMap((c) => c.piezas);
  const tipos = [...Object.keys(TIPOS), 'protoboard'];
  revisar(mismo(enCategorias, tipos) && new Set(enCategorias).size === enCategorias.length,
    `biblioteca: cada pieza está en una sola categoría (${CATEGORIAS.map((c) => c.nombre + ': ' + c.piezas.length).join(', ')})`);
  const incompletas = tipos.filter((t) => {
    const f = FICHAS[t];
    const props = (TIPOS[t] || {}).props || {};
    return !f || !f.nombre || !f.descripcion || !f.pines || !Array.isArray(f.palabras) || !Array.isArray(f.datos(props)) || f.datos(props).some((d) => d.length !== 2 || d.some((x) => typeof x !== 'string' || /undefined|NaN/.test(x)));
  });
  revisar(!incompletas.length, `biblioteca: cada pieza tiene su ficha (descripción, pines, palabras y datos sin «undefined»)${incompletas.length ? ': faltan ' + incompletas : ''}`);
  const nombres = Object.keys(TIPOS).filter((t) => FICHAS[t].nombre !== TIPOS[t].nombre);
  revisar(!nombres.length, `biblioteca: el nombre de la ficha es el del catálogo${nombres.length ? ' (distintos: ' + nombres + ')' : ''}`);
}

// Las fichas solo dicen «probado con la placa real» de lo que se midió (revisión de Codex del 11 oct, R6).
{
  const led = (color) => FICHAS.led.validacion({ color }).estado;
  revisar(led('rojo') === 'validado' && led(undefined) === 'validado' && ['amarillo', 'verde', 'azul', 'blanco'].every((c) => led(c) === 'por_validar'),
    'ficha del LED: validado solo el rojo (el único medido); los otros colores, por validar');
  revisar(/11 de 12/.test(FICHAS.led.validacion({ color: 'rojo' }).texto), 'ficha del LED rojo: 11 de 12 dentro del criterio (el porcentaje va respecto de la medida)');
  const sg90 = FICHAS.servo.validacion({ modelo: 'sg90' }).texto;
  revisar(/menos de 10 mA/.test(sg90) && /hoja de datos/.test(sg90), 'ficha del SG90: la corriente quieto se midió como «menos de 10 mA»; los 6 mA son de la hoja de datos');
  revisar(/estimación/.test(FICHAS.potenciometro.validacion({}).texto), 'ficha del potenciómetro: el ruido del ADC (0,1 pasos) dice que es una estimación');
}

// El .hex: cada línea trae largo + 5 bytes y su tipo tiene un largo fijo; una línea cortada con la suma correcta no
// puede colarse como programa (R5).
{
  const linea = (bytes) => ':' + [...bytes, (0x100 - (bytes.reduce((t, b) => t + b, 0) & 0xff)) & 0xff].map((b) => b.toString(16).padStart(2, '0').toUpperCase()).join('');
  const fin = ':00000001FF';
  const rechaza = (texto) => {
    try {
      leerHex(texto);
      return false;
    } catch (e) {
      return /dañado/.test(e.message);
    }
  };
  const bueno = leerHex(fs.readFileSync(path.join(__dirname, '..', 'programas', 'fijo13.hex'), 'utf8'));
  const dos = leerHex(linea([2, 0, 0, 0, 0x0c, 0x94]) + '\n' + fin);
  revisar(bueno[0] !== 0 && dos[0] === 0x940c, 'un .hex correcto se lee (fijo13 y una línea de 2 bytes)');
  revisar(rechaza(':0200000001FD\n' + fin), 'una línea que dice 2 bytes y trae 1 (con la suma correcta) se rechaza');
  revisar(rechaza(linea([1, 0, 0, 0, 0x0c, 0x94]) + '\n' + fin), 'una línea que dice 1 byte y trae 2 (con la suma correcta) se rechaza');
  revisar(rechaza(linea([1, 0, 0, 2, 0x10]) + '\n' + fin) && rechaza(linea([1, 0, 0, 1, 0]) + '\n' + fin) && rechaza(linea([0, 0, 0, 7]) + '\n' + fin),
    'una dirección de segmento de 1 byte, un fin con datos y un tipo que no existe se rechazan');
}

// Los valores de cada campo del catálogo son los que el esquema acepta para esa propiedad.
for (const [tipo, def] of Object.entries(TIPOS)) {
  const regla = D.componente.allOf.find((r) => r.if.properties.tipo.const === tipo);
  for (const campo of def.campos || []) {
    const esquema = regla && regla.then.properties.props.properties[campo.prop];
    const valores = campo.opciones.map((o) => o[0]);
    const ok = esquema && (esquema.enum ? mismo(valores, esquema.enum) : esquema.type === 'boolean' && valores.every((v) => typeof v === 'boolean'));
    revisar(!!ok, `${tipo}.${campo.prop}: los valores del catálogo (${valores.join(', ')}) son los del esquema`);
  }
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
const bloque = pagina.slice(pagina.indexOf('const INICIAL = {'), pagina.indexOf('const $ = (id)'));
const ejemplos = new Function(bloque + '\nreturn { INICIAL, EJEMPLO, EJEMPLO_T1, EJEMPLO_T2, EJEMPLO_PB, EJEMPLO_SERVO, EJEMPLO_SERVOS, EJEMPLO_SEIS, EJEMPLO_CARRO, EJEMPLO_PROBADOR };')();
for (const [nombre, circuito] of Object.entries(ejemplos)) {
  const p = revisarCircuito(circuito);
  revisar(!p.length, `${nombre} de la página de prueba` + (p.length ? ': ' + p.join(' | ') : ''));
}

// Nano: la variante cambia la vista, no los nombres del cableado ni los canales del ADC.
const bloqueNano = pagina.slice(pagina.indexOf('const EJEMPLO_NANO = {'), pagina.indexOf('let lienzo'));
const nano = new Function(bloqueNano + '\nreturn EJEMPLO_NANO;')();
for (const placa of ['nano', 'nano_old']) for (const variante of ['roja', 'azul']) {
  const c = JSON.parse(JSON.stringify(nano));
  c.placa = placa; c.componentes[0].props.variante = variante;
  const p = revisarCircuito(c);
  revisar(!p.length, `${placa} + expansión ${variante}: el ejemplo A6/A7 cumple el contrato${p.length ? ': ' + p.join(' | ') : ''}`);
}
const casosNano = [
  ['dos expansiones montadas', c => c.componentes.push({ ...c.componentes[0], id: 'exp2' })],
  ['expansión del Nano sobre Uno', c => { c.placa = 'uno'; }],
  ['shield L293D del Uno sobre Nano', c => c.componentes.push({ id: 'sh1', tipo: 'shield_l293d', x: 0, y: 0 })],
  ['expansión encajada en protoboard', c => { c.protoboard = { tipo: 'media', x: 300, y: 0 }; c.componentes[0].en = { OUT_5V: 'protoboard.a1' }; }],
  ['tercer GND del Uno en Nano', c => c.cables.push({ de: 'placa.GND3', a: 'exp1.GND_OUT' })],
  ['GPIO D20 inexistente en Nano', c => c.cables.push({ de: 'placa.D20', a: 'exp1.A6_S' })],
  ['una pata enchufada en SDA, otro nombre de A4 del Nano', c => c.componentes.push({ id: 'lx', tipo: 'led', x: 0, y: 0, props: {}, en: { anodo: 'placa.SDA' } })],
  ['una pata enchufada en SPI_MOSI, alias de la expansión', c => c.componentes.push({ id: 'lx', tipo: 'led', x: 0, y: 0, props: {}, en: { anodo: 'exp1.SPI_MOSI' } })],
];
for (const [nombre, cambiar] of casosNano) {
  const c = JSON.parse(JSON.stringify(nano)); cambiar(c);
  revisar(revisarCircuito(c).length > 0, `se rechaza ${nombre}`);
}
{
  const c = JSON.parse(JSON.stringify(nano));
  c.cables.push({ de: 'placa.SDA', a: 'exp1.I2C_SDA' }, { de: 'placa.SCK', a: 'exp1.SPI_SCK' });
  revisar(!revisarCircuito(c).length, 'aliases de I2C y SPI del Nano aceptados como conexiones de los pines físicos');
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
  // Enchufe directo (12 oct): una pata en el pin de otra pieza o de la placa, sin protoboard de por medio.
  ['un LED enchufado directo en D13 y GND1 de la placa', (c) => { c.componentes[1].en = { anodo: 'placa.D13', catodo: 'placa.GND1' }; }, null],
  ['una pata enchufada en el pin de otra pieza', (c) => { c.componentes[1].en = { anodo: c.componentes[0].id + '.2' }; }, null],
  ['una pata enchufada en una pieza que no existe', (c) => { c.componentes[1].en = { anodo: 'led9.anodo' }; }, /no hay ninguna pieza «led9»/],
  ['una pata enchufada en un pin que el Uno no tiene', (c) => { c.componentes[1].en = { anodo: 'placa.D14' }; }, /no tiene el pin «D14»/],
  ['una pieza enchufada en sí misma', (c) => { c.componentes[1].en = { anodo: c.componentes[1].id + '.catodo' }; }, /en sí misma/],
  ['una pata enchufada en «placa.D13.x» (un punto de más)', (c) => { c.componentes[1].en = { anodo: 'placa.D13.x' }; }, /pattern/],
  ['dos patas en el mismo pin', (c) => { c.componentes[1].en = { anodo: 'placa.D13' }; c.componentes[0].en = { 1: 'placa.D13' }; }, /recibe dos patas/],
  ['un cable que empieza y termina en el mismo pin', (c) => c.cables.push({ de: 'placa.D4', a: 'placa.D4' }), /empieza y termina/],
];
for (const [texto, cambiar, espera] of casos) {
  const c = base();
  cambiar(c);
  const p = revisarCircuito(c);
  if (espera === null) revisar(!p.length, `se acepta ${texto}` + (p.length ? ': ' + p.join(' | ') : ''));
  else revisar(p.length > 0 && p.some((x) => espera.test(x)), `se rechaza ${texto}: ${p[0] || '(no se rechazó)'}`);
}

// 4. Los eventos del registro (contrato/evento.schema.json; contrato, sección 6.1)
console.log('— Los eventos del registro cumplen el contrato');
{
  const E = ESQUEMA_EVENTO.$defs;
  // El código y el esquema dicen lo mismo: cada falla que el núcleo puede avisar está entre las conocidas, y las
  // claves de «activas» son las del simulador. Las fallas se buscan en el código como «tipo: '…', componente».
  const fuentes = ['nucleo.js', 'energia.js', 'potencia.js', 'alimentacion_nano.js', 'motor/red.js']
    .map((f) => fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8')).join('\n');
  const enCodigo = [...new Set([...fuentes.matchAll(/tipo: '([a-z0-9_]+)',\s*componente/g)].map((m) => m[1]))];
  const sinDocumentar = enCodigo.filter((t) => !E['fallas-conocidas'].enum.includes(t));
  revisar(enCodigo.length >= 20 && !sinDocumentar.length, `las ${enCodigo.length} fallas que avisa el código están en el esquema${sinDocumentar.length ? ' (faltan: ' + sinDocumentar + ')' : ''}`);
  const contrato6 = contrato.split('## 6. Eventos')[1].split('### 6.1')[0];
  const sinContrato = E['fallas-conocidas'].enum.filter((t) => !contrato6.includes('`' + t + '`'));
  revisar(!sinContrato.length, `cada falla conocida está explicada en CONTRATO.md, sección 6${sinContrato.length ? ' (faltan: ' + sinContrato + ')' : ''}`);
  revisar(mismo(CLAVES_NO_IDEALIDADES, E['claves-no-idealidad'].enum), `las ${CLAVES_NO_IDEALIDADES.length} claves de «activas» son las del simulador`);
  revisar(mismo(E.placa.enum, ESQUEMA.properties.placa.enum), 'las placas de los eventos son las del circuito');

  // Los ejemplos de la sección 6 son eventos válidos como los emite el paquete.
  const ejemplos6 = contrato.split('## 6. Eventos')[1].match(/```json\n([\s\S]*?)\n```/)[1].split('\n').map((l) => JSON.parse(l));
  const p6 = ejemplos6.flatMap((ev) => revisarEvento(ev, { emitido: true }));
  revisar(ejemplos6.length === 2 && !p6.length, `los ${ejemplos6.length} ejemplos de CONTRATO.md, sección 6` + (p6.length ? ': ' + p6.join(' | ') : ''));
  // El ejemplo del sobre en la sección 6.1 es una línea válida del archivo.
  const sobre = JSON.parse(contrato.split('**El sobre de cada evento:**')[1].match(/```json\n([\s\S]*?)\n```/)[1]);
  const pSobre = revisarEvento(sobre);
  revisar(!pSobre.length, 'el ejemplo del sobre de CONTRATO.md, sección 6.1' + (pSobre.length ? ': ' + pSobre.join(' | ') : ''));

  // Un evento de cada tipo, como lo emite quien emite (sin el sobre de TecnoBloques).
  const t = 1760600000000;
  const sim = (tipo, datos, ms = 1520) => ({ v: 1, t, origen: 'simulador', tipo, corrida: 2, ms_sim: ms, datos });
  const circ = (tipo, datos) => ({ v: 1, t, origen: 'circuito', tipo, datos });
  const edi = (tipo, datos) => ({ v: 1, t, origen: 'editor', tipo, datos });
  const activas = Object.fromEntries(CLAVES_NO_IDEALIDADES.map((k) => [k, true]));
  const EVENTOS = {
    componente_agregado: circ('componente_agregado', { id: 'led1', tipo: 'led' }),
    componente_quitado: circ('componente_quitado', { id: 'protoboard', tipo: 'protoboard' }),
    componente_cambiado: circ('componente_cambiado', { id: 'led1', x: 120, y: 40, en: { anodo: 'protoboard.a5', catodo: 'protoboard.a6' } }),
    'componente_cambiado (giro)': circ('componente_cambiado', { id: 'r1', rot: 90, en: null }),
    'componente_cambiado (props)': circ('componente_cambiado', { id: 'r1', props: { ohmios: 220 } }),
    cable_agregado: circ('cable_agregado', { de: 'placa.D13', a: 'r1.1' }),
    cable_quitado: circ('cable_quitado', { de: 'placa.D13', a: 'r1.1' }),
    boton_pulsado: circ('boton_pulsado', { id: 'b1', ms: 340 }),
    simulacion_iniciada: sim('simulacion_iniciada', { placa: 'uno', modo: 'realista', activas, circuito: ejemplos.EJEMPLO_PB }, 0),
    simulacion_pausada: sim('simulacion_pausada', {}),
    simulacion_reanudada: sim('simulacion_reanudada', {}),
    simulacion_detenida: sim('simulacion_detenida', { ms_sim: 1520, ms_simulados: 1520, fallas: [{ tipo: 'led_quemado', componente: 'led1' }] }),
    'simulacion_detenida (sin fallas)': sim('simulacion_detenida', { ms_sim: 800, fallas: [] }),
    falla: sim('falla', { tipo: 'led_quemado', componente: 'led1', corriente_mA: 41.2 }),
    reinicio_placa: sim('reinicio_placa', { motivo: 'energia_usb', nuevos: 1, total: 2 }),
    'reinicio_placa (botón)': sim('reinicio_placa', { motivo: 'boton' }),
    sesion_iniciada: edi('sesion_iniciada', { placa: 'nano', nivel: 2 }),
    proyecto_abierto: edi('proyecto_abierto', { placa: 'uno' }),
    ejemplo_cargado: edi('ejemplo_cargado', { id: 'validar_led' }),
    placa_cambiada: edi('placa_cambiada', { de: 'nano', a: 'uno' }),
    bloques_cambiados: edi('bloques_cambiados', { bloques: 7, tipos: { arduino_setup: 1, digital_write: 2 } }),
    codigo_compilado: edi('codigo_compilado', { ok: true, error: null, bytes: 924, codigo: 'void setup() {\n  Serial.println("http://x");\n}\nvoid loop() {}\n' }),
    'codigo_compilado (con error)': edi('codigo_compilado', { ok: false, error: 'sintaxis', bytes: null, codigo: 'void loop() {' }),
    programa_subido: edi('programa_subido', { ok: true, placa: 'uno' }),
    sesion_terminada: edi('sesion_terminada', { ms: 3600000 }),
    registro_interrumpido: edi('registro_interrumpido', { desde: t - 120000, hasta: t, recuperados: 7, perdidos: 0, motivo: 'ENOSPC' }),
  };
  const SOBRE = { equipo: 'A7', sesion: '5f2c9a', version_tb: '0.4.0', version_tc: '0.2.0' };
  for (const [nombre, ev] of Object.entries(EVENTOS)) {
    const p = revisarEvento(ev, { emitido: true });
    const pLinea = revisarEvento({ ...ev, ...SOBRE });
    revisar(!p.length && !pLinea.length, `evento ${nombre}: emitido y en el archivo` + ([...p, ...pLinea].length ? ': ' + [...p, ...pLinea].join(' | ') : ''));
  }
  const tiposConEjemplo = new Set(Object.values(EVENTOS).map((ev) => ev.tipo));
  const delContrato6 = [...new Set([...contrato.split('## 6. Eventos')[1].split('## 7.')[0].matchAll(/`([a-z]+_[a-z_]+)`/g)].map((m) => m[1]))]
    .filter((x) => /^(componente|cable|boton|simulacion|reinicio|sesion|proyecto|ejemplo|placa|bloques|codigo|programa|registro)_/.test(x) && !/_(mA|tb|tc)$/.test(x) && !E['fallas-conocidas'].enum.includes(x));
  const sinEjemplo = delContrato6.filter((x) => !tiposConEjemplo.has(x));
  revisar(!sinEjemplo.length, `cada tipo de evento de la sección 6 tiene su ejemplo aquí (${tiposConEjemplo.size})${sinEjemplo.length ? ': faltan ' + sinEjemplo : ''}`);

  // Lo que está mal se rechaza con su motivo; lo nuevo se acepta.
  const casosEv = [
    ['un tipo de evento que esta versión no conoce', () => ({ ...edi('bloque_arrastrado', { x: 1 }) }), null],
    ['un campo que esta versión no conoce', () => ({ ...EVENTOS.falla, nota: 'nueva', datos: { ...EVENTOS.falla.datos, temperatura: 80 } }), null],
    ['una falla que esta versión no conoce', () => sim('falla', { tipo: 'motor_caliente', componente: 'm1' }), null],
    ['sin «v»', () => { const e = { ...EVENTOS.falla }; delete e.v; return e; }, /v/],
    ['«v» 2', () => ({ ...EVENTOS.falla, v: 2 }), /\/v/],
    ['la hora como texto', () => ({ ...EVENTOS.falla, t: '2026-10-16' }), /\/t/],
    ['origen «otro»', () => ({ ...EVENTOS.cable_agregado, origen: 'otro' }), /origen/],
    ['registro_interrumpido sin «perdidos»', () => edi('registro_interrumpido', { desde: 1, hasta: 2, recuperados: 3, motivo: 'EPERM' }), /perdidos/],
    ['registro_interrumpido con «perdidos» negativo', () => edi('registro_interrumpido', { ...EVENTOS.registro_interrumpido.datos, perdidos: -1 }), /perdidos/],
    ['registro_interrumpido que dice venir del simulador', () => ({ ...EVENTOS.registro_interrumpido, origen: 'simulador', corrida: 1, ms_sim: 0 }), /origen/],
    ['un evento del simulador sin «corrida»', () => { const e = { ...EVENTOS.falla }; delete e.corrida; return e; }, /corrida/],
    ['la corrida 0', () => ({ ...EVENTOS.falla, corrida: 0 }), /corrida/],
    ['una falla con su tramo del reloj (21 oct)', () => ({ ...EVENTOS.falla, tramo: 1 }), null],
    ['el tramo negativo', () => ({ ...EVENTOS.falla, tramo: -1 }), /tramo/],
    ['el tramo con decimales', () => ({ ...EVENTOS.falla, tramo: 0.5 }), /tramo/],
    ['una falla con el mensaje en pantalla', () => sim('falla', { ...EVENTOS.falla.datos, mensaje: 'El LED se quemó' }), /mensaje/],
    ['una falla sin componente', () => sim('falla', { tipo: 'led_quemado' }), /componente/],
    ['una falla que dice venir del lienzo', () => ({ ...EVENTOS.falla, origen: 'circuito' }), /origen/],
    ['simulacion_detenida sin la lista de fallas', () => sim('simulacion_detenida', { ms_sim: 10 }), /fallas/],
    ['simulacion_iniciada sin el circuito', () => sim('simulacion_iniciada', { placa: 'uno', modo: 'realista', activas }, 0), /circuito/],
    ['simulacion_iniciada en modo «medio»', () => sim('simulacion_iniciada', { ...EVENTOS.simulacion_iniciada.datos, modo: 'medio' }, 0), /modo/],
    ['simulacion_iniciada con un cable a una pieza que no existe', () => sim('simulacion_iniciada', { ...EVENTOS.simulacion_iniciada.datos, circuito: { ...ejemplos.EJEMPLO_PB, cables: [{ de: 'placa.D13', a: 'led9.anodo' }] } }, 0), /circuito: .*led9/],
    ['una no idealidad «a medias»', () => sim('simulacion_iniciada', { ...EVENTOS.simulacion_iniciada.datos, activas: { ...activas, limiteUSB: 'a medias' } }, 0), /activas/],
    ['un cable sin su punta «a»', () => circ('cable_agregado', { de: 'placa.D13' }), /a/],
    ['un cable a «D13» sin la pieza', () => circ('cable_agregado', { de: 'D13', a: 'r1.1' }), /de/],
    ['un giro de 45°', () => circ('componente_cambiado', { id: 'r1', rot: 45 }), /rot/],
    ['proyecto_abierto con el nombre que escribió el aprendiz', () => edi('proyecto_abierto', { placa: 'uno', nombre: 'LED de Sofía' }), /nombre/],
    ['codigo_compilado sin el código', () => edi('codigo_compilado', { ok: true }), /codigo/],
    ['sesion_iniciada en la placa «leonardo»', () => edi('sesion_iniciada', { placa: 'leonardo', nivel: 1 }), /placa/],
    ['placa_cambiada sin «de»', () => edi('placa_cambiada', { a: 'uno' }), /de/],
    ['placa_cambiada a la placa «leonardo»', () => edi('placa_cambiada', { de: 'uno', a: 'leonardo' }), /\/a/],
    ['placa_cambiada que dice venir del simulador', () => ({ ...EVENTOS.placa_cambiada, origen: 'simulador', corrida: 1, ms_sim: 0 }), /origen/],
    ['bloques_cambiados con el XML en vez del resumen', () => edi('bloques_cambiados', { xml: '<xml/>' }), /bloques/],
  ];
  for (const [texto, armar, espera] of casosEv) {
    const p = revisarEvento(armar(), { emitido: true });
    if (espera === null) revisar(!p.length, `se acepta ${texto}` + (p.length ? ': ' + p.join(' | ') : ''));
    else revisar(p.length > 0 && p.some((x) => espera.test(x)), `se rechaza ${texto}: ${p[0] || '(no se rechazó)'}`);
  }
  // La línea del archivo necesita el sobre completo de TecnoBloques.
  for (const campo of Object.keys(SOBRE)) {
    const linea = { ...EVENTOS.falla, ...SOBRE };
    delete linea[campo];
    const p = revisarEvento(linea);
    revisar(p.some((x) => x.includes(campo)), `se rechaza una línea del archivo sin «${campo}»: ${p[0] || '(no se rechazó)'}`);
  }
  revisar(revisarEvento({ ...EVENTOS.falla, ...SOBRE, equipo: '' }).length > 0, 'se rechaza una línea con el código de equipo vacío');
}

console.log(fallos ? `\n${fallos} FALLA(S)` : '\nTODO BIEN');
process.exit(fallos ? 1 : 0);
