// Prueba las fixtures de TecnoBloques (pruebas/fixtures/, se traen con `npm run fixtures`), sin navegador:
//   · cada proyecto .tbq.json tiene el formato 1 de TecnoBloques, y su circuito, si trae, cumple el contrato;
//   · cada .hex del ATmega328P (Uno y Nano) corre 1 s simulado en el chip sin fallar;
//   · el eco responde por el monitor serial, con las tildes bien.
// Uso: npm run probar:fixtures
const fs = require('fs');
const path = require('path');
const { crearNucleo, FRECUENCIA } = require('./nucleo.cjs');
const { revisarCircuito } = require('./contrato.js');

let fallos = 0;
function revisar(condicion, texto) {
  console.log((condicion ? 'OK    ' : 'FALLA ') + texto);
  if (!condicion) fallos++;
}
const CARPETA = path.join(__dirname, 'fixtures');
const CUADRO = FRECUENCIA * 0.016; // 16 ms simulados, como una foto del Worker
const VACIO = { formato: 1, placa: 'uno', componentes: [], cables: [], protoboard: null };
const CHIP_328P = ['uno', 'nano', 'nano_old']; // el Mega (ATmega2560) todavía no se simula

const casos = fs.existsSync(CARPETA) ? fs.readdirSync(CARPETA).sort() : [];
revisar(casos.length > 0, `hay fixtures de TecnoBloques: ${casos.length} casos`);
for (const caso of casos) {
  const archivo = (ext) => path.join(CARPETA, caso, caso + ext);
  const p = JSON.parse(fs.readFileSync(archivo('.tbq.json'), 'utf8'));
  const formato = p.app === 'TecnoBloques' && p.version === 1 && typeof p.placa === 'string' && ('bloques' in p || 'texto' in p);
  const circuito = p.circuito == null ? [] : revisarCircuito(p.circuito);
  let linea = `${caso} (${p.placa}, TecnoBloques ${p.creadoCon})`;
  linea += p.circuito == null ? ': sin circuito' : `: circuito con ${p.circuito.componentes.length} piezas`;
  if (!formato || circuito.length) {
    revisar(false, linea + (formato ? '' : ' · no tiene el formato 1') + (circuito.length ? ' · ' + circuito.join(' | ') : ''));
    continue;
  }
  if (!fs.existsSync(archivo('.hex'))) {
    revisar(true, linea + ' · sin .hex');
    continue;
  }
  if (!CHIP_328P.includes(p.placa)) {
    revisar(true, linea + ' · el .hex no se corre: la Mega todavía no se simula');
    continue;
  }
  try {
    const n = crearNucleo({ hex: fs.readFileSync(archivo('.hex'), 'utf8'), circuito: p.circuito || VACIO, semilla: 1 });
    let serial = '';
    let f = null;
    for (let t = 0; t < 1000; t += 16) {
      n.avanzar(CUADRO);
      f = n.foto();
      serial += f.serial;
    }
    const primera = serial.split(/\r?\n/).find((l) => l.trim()) || '';
    revisar(f.msSimulados > 999, `${linea} · corre ${Math.round(f.msSimulados)} ms en el chip` + (primera ? ` · serial: «${primera.slice(0, 40)}»` : ''));
  } catch (e) {
    revisar(false, `${linea} · el chip falló: ${e.message}`);
  }
}

// El eco: el programa de bloques responde por el monitor serial y prende el LED del pin 13
const eco = path.join(CARPETA, 'eco', 'eco.hex');
if (fs.existsSync(eco)) {
  const c = {
    formato: 1,
    placa: 'uno',
    componentes: [{ id: 'r1', tipo: 'resistencia', x: 0, y: 0, props: { ohmios: 220 } }, { id: 'led1', tipo: 'led', x: 0, y: 0, props: { color: 'rojo' } }],
    cables: [{ de: 'placa.D13', a: 'r1.1' }, { de: 'r1.2', a: 'led1.anodo' }, { de: 'led1.catodo', a: 'placa.GND1' }],
  };
  const n = crearNucleo({ hex: fs.readFileSync(eco, 'utf8'), circuito: c, semilla: 1 });
  let texto = '';
  for (let t = 0; t < 300; t += 16) { n.avanzar(CUADRO); texto += n.foto().serial; }
  n.enviarSerial('on\n');
  let led = 0;
  for (let t = 0; t < 300; t += 16) { n.avanzar(CUADRO); const f = n.foto(); texto += f.serial; led = f.leds.led1; }
  revisar(/Escribe on u off/.test(texto) && /Recibí: on/.test(texto) && led > 0.7, `el eco responde «Recibí: on» (con la tilde) y prende el LED (brillo ${(led * 100).toFixed(0)} %)`);
}

// La T1 de TecnoBloques con su circuito (el botón y la pull-down en la protoboard): el pin 13 copia el pin 2
const t1 = path.join(CARPETA, 't1_protoboard', 't1_protoboard');
if (fs.existsSync(t1 + '.hex')) {
  const p = JSON.parse(fs.readFileSync(t1 + '.tbq.json', 'utf8'));
  const n = crearNucleo({ hex: fs.readFileSync(t1 + '.hex', 'utf8'), circuito: p.circuito, activas: { entradaFlotante: true }, semilla: 1 });
  const brillo = (ms) => {
    let f = null;
    for (let t = 0; t < ms; t += 16) { n.avanzar(CUADRO); f = n.foto(); }
    return f.leds.led1 || 0;
  };
  const suelto = brillo(200);
  n.ponerPulsador('btn1', true);
  const presionado = brillo(200);
  n.ponerPulsador('btn1', false);
  const otraVez = brillo(200);
  revisar(suelto < 0.05 && presionado > 0.7 && otraVez < 0.05,
    `t1_protoboard con su circuito: LED ${(suelto * 100).toFixed(0)} % con el botón suelto, ${(presionado * 100).toFixed(0)} % presionado y ${(otraVez * 100).toFixed(0)} % al soltar`);
} else revisar(false, 'falta la fixture t1_protoboard (la T1 con circuito): corre npm test y npm run compilar en TecnoBloques, y npm run fixtures aquí');

console.log(fallos ? `\n${fallos} FALLA(S)` : '\nTODO BIEN');
process.exit(fallos ? 1 : 0);
