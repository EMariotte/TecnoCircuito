// SPDX-License-Identifier: Apache-2.0
// AUD-03: una foto del Worker que llega tarde (después de pausar, reiniciar o recablear) puede traer hechos que no se
// repiten: las fallas nuevas, el texto del monitor serial y los reinicios. La vista vieja se descarta, pero sus hechos
// no: cada falla queda en su corrida y en el cierre, y nada de una corrida anterior pasa a la siguiente.
// Corre el simulador.js real (lado de la página) con un Worker controlado, que entrega las fotos del núcleo real en el
// orden que se quiera. La técnica es la del diagnóstico de la auditoría de Codex (docs/diagnostico-auditoria-2026-10-17.cjs).
// Uso: npm run probar:fotos
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { crearNucleo, FRECUENCIA } = require('./nucleo.cjs');
const { leerHex, PLACAS } = require('./codigo.cjs');

const RAIZ = path.join(__dirname, '..');
let fallos = 0;
function revisar(condicion, texto) {
  console.log((condicion ? 'OK    ' : 'FALLA ') + texto);
  if (!condicion) fallos++;
}

const HEX = fs.readFileSync(path.join(RAIZ, 'programas', 'fijo13.hex'), 'utf8'); // D13 en ALTO, sin pausa
const LED_DIRECTO = { formato: 1, placa: 'uno', protoboard: null, // sin resistencia: se quema y pasa del límite del pin
  componentes: [{ id: 'led1', tipo: 'led', x: 0, y: 0, props: { color: 'rojo' } }],
  cables: [{ de: 'placa.D13', a: 'led1.anodo' }, { de: 'led1.catodo', a: 'placa.GND1' }] };
const SIN_NADA = { formato: 1, placa: 'uno', protoboard: null, componentes: [], cables: [] };

const fuente = fs.readFileSync(path.join(RAIZ, 'src', 'simulador.js'), 'utf8')
  .replace(/^import .*;\r?$/mg, '').replace(/^export /mg, '');
const VERSION_EVENTOS = Number(/VERSION_EVENTOS\s*=\s*(\d+)/.exec(fs.readFileSync(path.join(RAIZ, 'src', 'eventos.js'), 'utf8'))[1]);

/**
 * Un simulador con su Worker controlado: `entregar(foto)` hace llegar una foto como si viniera del Worker y
 * `confirmar()` el «detenido» con que el Worker dice que paró. El reloj es falso: `pasar(ms)` corre las esperas.
 */
function armar(circuitoInicial) {
  let worker;
  let terminado = false;
  class WorkerControlado {
    constructor() { worker = this; this.mensajes = []; }
    postMessage(m) { this.mensajes.push(m); }
    terminate() { terminado = true; }
  }
  let ahora = 0;
  let esperas = [];
  const reloj = {
    setTimeout: (fn, ms) => { const e = { fn, en: ahora + (ms || 0) }; esperas.push(e); return e; },
    clearTimeout: (e) => { esperas = esperas.filter((x) => x !== e); },
  };
  const pasar = (ms) => {
    ahora += ms;
    for (const e of esperas.filter((x) => x.en <= ahora)) { esperas = esperas.filter((x) => x !== e); e.fn(); }
  };
  const vistas = [];
  const entorno = vm.createContext({ leerHex, PLACAS, VERSION_EVENTOS, __CODIGO_TRABAJADOR__: 'controlado',
    Worker: WorkerControlado, Blob: class {}, URL: { createObjectURL: () => 'blob:controlado', revokeObjectURL() {} },
    console, requestAnimationFrame: (fn) => { fn(); return 0; }, cancelAnimationFrame() {}, Promise, ...reloj });
  vm.runInContext(fuente, entorno);
  let circuito = structuredClone(circuitoInicial);
  let alCambiar = null;
  const eventos = [];
  const serial = [];
  const sim = entorno.crearSimulador({ hex: HEX,
    lienzo: { circuito: () => structuredClone(circuito), _mostrar: (v) => vistas.push(v), alCambiar: (fn) => { alCambiar = fn; } },
    alEvento: (ev) => eventos.push(ev) });
  sim.alSerial((t) => serial.push(t));
  worker.onmessage({ data: { tipo: 'listo' } });
  const turno = () => worker.mensajes.filter((m) => 'turno' in m).at(-1).turno;
  return {
    sim, eventos, serial, vistas,
    turno,
    pasar,
    terminado: () => terminado,
    /** Lo que mandaría el Worker ahora, con el turno que el Worker conoce en este momento. */
    foto: (n, extra = {}) => ({ tipo: 'foto', turno: turno(), ...n.foto(), velocidad: 1, msReales: 0, ...extra }),
    entregar: (f) => worker.onmessage({ data: f }),
    /** El Worker confirma que paró (con el turno de su última orden), como hace trabajador.js. */
    confirmar: (msSimulados) => worker.onmessage({ data: { tipo: 'detenido', turno: turno(), msSimulados } }),
    recablear: (nuevo) => { circuito = structuredClone(nuevo); alCambiar(structuredClone(nuevo)); },
  };
}
/** Detener como lo hace el Worker de verdad: detener y, enseguida, su confirmación. */
function detenerYConfirmar(s) {
  s.sim.detener();
  s.confirmar();
}
const nucleo = () => crearNucleo({ hex: HEX, circuito: LED_DIRECTO, activas: { danoComponentes: true, limitePin: true }, semilla: 1 });
const deTipo = (eventos, tipo) => eventos.filter((e) => e.tipo === tipo);
const tiposDeFalla = (fs) => fs.map((f) => f.tipo).sort().join(',');

// 1. El caso de la auditoría: la foto con las fallas sale antes de Pausa y llega después
{
  const s = armar(LED_DIRECTO);
  const n = nucleo();
  s.sim.iniciar();
  s.entregar(s.foto(n));
  n.avanzar(FRECUENCIA * 0.02);
  const pendiente = s.foto(n);
  revisar(pendiente.fallas.length >= 2, `la foto pendiente trae fallas nuevas (${tiposDeFalla(pendiente.fallas)})`);
  s.sim.pausar();
  const vistasAntes = s.vistas.length;
  const msAntes = s.sim.medidas().msSimulados;
  s.entregar(pendiente);
  const fallasEnPausa = deTipo(s.eventos, 'falla');
  revisar(tiposDeFalla(fallasEnPausa.map((e) => e.datos)) === tiposDeFalla(pendiente.fallas),
    'pausa: las fallas de la foto que llegó tarde se avisan igual');
  revisar(fallasEnPausa.length > 0 && fallasEnPausa.every((e) => e.corrida === deTipo(s.eventos, 'simulacion_iniciada')[0].corrida && e.ms_sim === Math.round(pendiente.msSimulados)),
    `pausa: con su corrida y el tiempo simulado de la foto (ms_sim ${fallasEnPausa.map((e) => e.ms_sim).join(', ')})`);
  revisar(s.vistas.length === vistasAntes && s.sim.medidas().msSimulados === msAntes,
    'pausa: la vista vieja no se dibuja y el tiempo mostrado no cambia');
  s.sim.iniciar();
  n.avanzar(FRECUENCIA * 0.01);
  const posterior = s.foto(n);
  s.entregar(posterior);
  detenerYConfirmar(s);
  const cierre = deTipo(s.eventos, 'simulacion_detenida')[0];
  revisar(posterior.quemados.includes('led1') && posterior.fallas.length === 0, 'al reanudar, el LED sigue quemado y el núcleo no repite la falla');
  revisar(cierre && tiposDeFalla(cierre.datos.fallas) === tiposDeFalla(pendiente.fallas),
    `el cierre de la corrida trae las fallas (${cierre && tiposDeFalla(cierre.datos.fallas)})`);
  revisar(deTipo(s.eventos, 'falla').length === pendiente.fallas.length, 'cada falla se avisa una sola vez');
}

// 2. Pausa y Detener sin reanudar: la foto llega en la pausa y el cierre la incluye
{
  const s = armar(LED_DIRECTO);
  const n = nucleo();
  s.sim.iniciar();
  n.avanzar(FRECUENCIA * 0.02);
  const pendiente = s.foto(n);
  s.sim.pausar();
  s.entregar(pendiente);
  detenerYConfirmar(s);
  const cierre = deTipo(s.eventos, 'simulacion_detenida')[0];
  revisar(tiposDeFalla(cierre.datos.fallas) === tiposDeFalla(pendiente.fallas), 'pausa y detener: el cierre trae las fallas de la foto que llegó en la pausa');
}

// 3. Reiniciar (el botón RESET): la foto de antes del reinicio trae fallas y texto del monitor serial
{
  const s = armar(LED_DIRECTO);
  const n = nucleo();
  s.sim.iniciar();
  n.avanzar(FRECUENCIA * 0.02);
  const pendiente = s.foto(n, { serial: 'antes del reinicio\n' });
  s.sim.reiniciar();
  s.entregar(pendiente);
  revisar(tiposDeFalla(deTipo(s.eventos, 'falla').map((e) => e.datos)) === tiposDeFalla(pendiente.fallas), 'reiniciar: las fallas de la foto de antes del reinicio se avisan');
  revisar(s.serial.join('') === 'antes del reinicio\n', 'reiniciar: lo que imprimió el programa antes del reinicio llega al monitor');
  detenerYConfirmar(s);
  revisar(tiposDeFalla(deTipo(s.eventos, 'simulacion_detenida')[0].datos.fallas) === tiposDeFalla(pendiente.fallas), 'reiniciar: y van en el cierre');
}

// 4. El monitor serial en pausa: el texto de la foto que llegó tarde no se pierde
{
  const s = armar(SIN_NADA);
  const n = crearNucleo({ hex: HEX, circuito: SIN_NADA, activas: {}, semilla: 1 });
  s.sim.iniciar();
  const pendiente = s.foto(n, { serial: 'hola\n' });
  s.sim.pausar();
  s.entregar(pendiente);
  revisar(s.serial.join('') === 'hola\n', 'pausa: el texto del monitor serial de la foto que llegó tarde se muestra');
  detenerYConfirmar(s);
}

// 5. Recablear durante la corrida no descarta nada: la foto con el turno de siempre se usa entera
{
  const s = armar(LED_DIRECTO);
  const n = nucleo();
  s.sim.iniciar();
  n.avanzar(FRECUENCIA * 0.02);
  const pendiente = s.foto(n);
  s.recablear(SIN_NADA);
  const vistasAntes = s.vistas.length;
  s.entregar(pendiente);
  revisar(s.vistas.length === vistasAntes + 1 && tiposDeFalla(deTipo(s.eventos, 'falla').map((e) => e.datos)) === tiposDeFalla(pendiente.fallas),
    'recablear: la foto se dibuja y sus fallas se avisan');
  detenerYConfirmar(s);
}

// 6. Sin contaminación: una foto de la corrida anterior que llega tarde no entra en la siguiente
{
  const s = armar(LED_DIRECTO);
  const n = nucleo();
  s.sim.iniciar();
  s.entregar(s.foto(n));
  n.avanzar(FRECUENCIA * 0.02);
  const deLaPrimera = s.foto(n, { serial: 'de la primera\n' });
  s.sim.detener();
  s.sim.iniciar(); // corrida 2 (el contador es de la página: sigue desde las anteriores de este archivo)
  const corrida2 = deTipo(s.eventos, 'simulacion_iniciada').at(-1).corrida;
  s.entregar(deLaPrimera);
  revisar(!s.eventos.some((e) => e.tipo === 'falla' && e.corrida === corrida2) && !s.serial.length,
    'otra corrida: las fallas y el texto de la foto de la corrida anterior no entran');
  const limpio = crearNucleo({ hex: HEX, circuito: SIN_NADA, activas: {}, semilla: 1 });
  s.entregar(s.foto(limpio));
  detenerYConfirmar(s);
  const cierre2 = deTipo(s.eventos, 'simulacion_detenida').at(-1);
  revisar(cierre2.corrida === corrida2 && cierre2.datos.fallas.length === 0, 'el cierre de la corrida nueva no trae fallas de la anterior');
}

// 7. AUD-03-V1: el cierre espera al Worker. Las fotos que venían en camino al pulsar Detener entregan sus fallas, y
// simulacion_detenida sale cuando el Worker confirma (antes no); su promesa se cumple entonces.
const cierres = (s) => deTipo(s.eventos, 'simulacion_detenida');
const promesaCumplida = async (p) => { let ok = false; p.then(() => { ok = true; }); await null; await null; return ok; };
(async () => {
  for (const [nombre, preparar] of [['detener', () => {}], ['pausa y detener', (s) => s.sim.pausar()]]) {
    const s = armar(LED_DIRECTO);
    const n = nucleo();
    s.sim.iniciar();
    n.avanzar(FRECUENCIA * 0.016);
    const pendiente = s.foto(n);
    preparar(s);
    const p = s.sim.detener();
    revisar(s.sim.medidas().estado === 'detenido' && cierres(s).length === 0 && !(await promesaCumplida(p)),
      `${nombre}: se ve detenida al instante, pero el cierre espera al Worker`);
    s.entregar(pendiente);
    s.confirmar(16);
    const c = cierres(s)[0];
    revisar(c && tiposDeFalla(c.datos.fallas) === tiposDeFalla(pendiente.fallas) && c.ms_sim === 16 && await promesaCumplida(p),
      `${nombre}: la foto en camino entrega sus fallas, el cierre las trae (${c && tiposDeFalla(c.datos.fallas)}) con el ms del Worker, y la promesa se cumple`);
    s.entregar(s.foto(n, { fallas: [{ tipo: 'led_quemado', componente: 'led2', mensaje: 'x' }] }));
    revisar(cierres(s).length === 1 && !deTipo(s.eventos, 'falla').some((e) => e.datos.componente === 'led2'),
      `${nombre}: después del cierre ya no entra nada`);
  }

  // La última foto que manda el Worker al parar: lo que el núcleo tenía sin mandar también va en el cierre
  {
    const s = armar(LED_DIRECTO);
    const n = nucleo();
    s.sim.iniciar();
    s.entregar(s.foto(n));
    n.avanzar(FRECUENCIA * 0.016); // el LED se quema después de la última foto que llegó
    s.sim.detener();
    s.entregar(s.foto(n)); // trabajador.js: al recibir «detener» manda una última foto (con el turno de detener)...
    s.confirmar(); // ...y la confirmación
    revisar(tiposDeFalla(cierres(s)[0].datos.fallas) === 'corriente_pin,led_quemado', 'la última foto del Worker al parar: sus fallas van en el cierre');
  }

  // destruir(): espera el mismo cierre y después libera el Worker
  {
    const s = armar(LED_DIRECTO);
    const n = nucleo();
    s.sim.iniciar();
    n.avanzar(FRECUENCIA * 0.016);
    const pendiente = s.foto(n);
    const p = s.sim.destruir();
    revisar(!s.terminado() && cierres(s).length === 0, 'destruir: el Worker sigue hasta el cierre');
    s.entregar(pendiente);
    s.confirmar();
    await p;
    revisar(tiposDeFalla(cierres(s)[0].datos.fallas) === tiposDeFalla(pendiente.fallas) && s.terminado(),
      'destruir: el cierre trae las fallas de la foto en camino y después se libera el Worker');
    s.sim.iniciar();
    revisar(deTipo(s.eventos, 'simulacion_iniciada').length === 1, 'destruir: después ya no acepta órdenes');
  }

  // Si el Worker no contesta, el cierre sale a los 500 ms con lo que llegó
  {
    const s = armar(LED_DIRECTO);
    const n = nucleo();
    s.sim.iniciar();
    n.avanzar(FRECUENCIA * 0.016);
    const pendiente = s.foto(n);
    const p = s.sim.detener();
    s.entregar(pendiente);
    s.pasar(499);
    const antes = cierres(s).length;
    s.pasar(1);
    revisar(antes === 0 && cierres(s).length === 1 && tiposDeFalla(cierres(s)[0].datos.fallas) === tiposDeFalla(pendiente.fallas) && await promesaCumplida(p),
      'sin respuesta del Worker: el cierre sale a los 500 ms, con las fallas que llegaron');
    s.confirmar();
    revisar(cierres(s).length === 1, 'una confirmación tardía no repite el cierre');
  }

  // { sinEsperar: true } (al cerrar la ventana): el cierre sale ya; lo que llegue después no entra
  {
    const s = armar(LED_DIRECTO);
    const n = nucleo();
    s.sim.iniciar();
    n.avanzar(FRECUENCIA * 0.016);
    const pendiente = s.foto(n);
    s.sim.destruir({ sinEsperar: true });
    revisar(cierres(s).length === 1 && cierres(s)[0].datos.fallas.length === 0, 'sinEsperar: el cierre sale en el mismo instante (límite al cerrar la ventana)');
    s.entregar(pendiente);
    revisar(!deTipo(s.eventos, 'falla').length, 'sinEsperar: una foto que llega después no agrega eventos');
  }

  // Iniciar otra corrida antes de la confirmación: el cierre de la anterior sale primero
  {
    const s = armar(LED_DIRECTO);
    const n = nucleo();
    s.sim.iniciar();
    n.avanzar(FRECUENCIA * 0.016);
    s.entregar(s.foto(n));
    s.sim.detener();
    s.sim.iniciar();
    const tipos = s.eventos.filter((e) => e.tipo.startsWith('simulacion_')).map((e) => e.tipo).join(',');
    revisar(tipos === 'simulacion_iniciada,simulacion_detenida,simulacion_iniciada' && cierres(s)[0].datos.fallas.length === 2,
      `iniciar antes de la confirmación: el cierre de la anterior sale antes del inicio nuevo (${tipos})`);
  }
  terminarPrueba();
})();

// 8. Un reinicio por energía se avisa una vez, aunque después se pulse RESET: el núcleo cuenta los reinicios de
// toda la corrida (solo vuelve a 0 en la siguiente), así que la página no debe volver a contarlos desde 0
{
  const s = armar(SIN_NADA);
  const n = crearNucleo({ hex: HEX, circuito: SIN_NADA, activas: {}, semilla: 1 });
  s.sim.iniciar();
  s.entregar(s.foto(n, { energia: { reinicios: 1 } }));
  s.sim.reiniciar();
  s.entregar(s.foto(n, { energia: { reinicios: 1 } }));
  const porEnergia = deTipo(s.eventos, 'reinicio_placa').filter((e) => e.datos.motivo === 'energia_usb');
  revisar(porEnergia.length === 1 && deTipo(s.eventos, 'reinicio_placa').filter((e) => e.datos.motivo === 'boton').length === 1,
    `RESET después de un reinicio por energía: ese reinicio se avisa una sola vez (${porEnergia.length})`);
  detenerYConfirmar(s);
}

// 9. INT-RES-03c (verificación de Codex de REG-004): el RESET pone el reloj de la corrida en cero. Una foto de antes
// del RESET que llega después conserva su tramo; el reinicio sale con el tramo de antes y lo demás con el nuevo.
for (const tarde of [false, true]) {
  const s = armar(LED_DIRECTO);
  const n = nucleo();
  s.sim.iniciar();
  n.avanzar(FRECUENCIA * 0.02);
  const pendiente = s.foto(n, { energia: { reinicios: 1 } });
  if (!tarde) s.entregar(pendiente);
  s.sim.reiniciar();
  if (tarde) s.entregar(pendiente);
  n.reiniciarChip();
  n.avanzar(FRECUENCIA * 0.01);
  s.entregar(s.foto(n, { fallas: [{ tipo: 'corriente_pin', componente: 'led2' }], energia: { reinicios: 1 } }));
  s.sim.detener();
  s.confirmar(10);
  const tramos = (tipo) => s.eventos.filter((e) => e.tipo === tipo).map((e) => `${e.datos.componente || e.datos.motivo || ''}:${e.tramo}`).join();
  const deLaFoto = s.eventos.filter((e) => (e.tipo === 'falla' && e.datos.componente !== 'led2') || (e.tipo === 'reinicio_placa' && e.datos.motivo === 'energia_usb'));
  revisar(deLaFoto.length === pendiente.fallas.length + 1 && deLaFoto.every((e) => e.tramo === 0 && e.ms_sim === Math.round(pendiente.msSimulados)) &&
    tramos('reinicio_placa').includes('boton:0') && tramos('falla').includes('led2:1') && s.eventos.every((e) => Number.isInteger(e.tramo)) &&
    deTipo(s.eventos, 'simulacion_iniciada')[0].tramo === 0 && deTipo(s.eventos, 'simulacion_detenida')[0].tramo === 1 && deTipo(s.eventos, 'simulacion_detenida')[0].ms_sim === 10,
  `la foto de antes del RESET ${tarde ? 'llega después' : 'llega antes'}: sus hechos quedan en el tramo 0 con su tiempo, el RESET en el 0 y lo del reloj nuevo en el 1 (fallas ${tramos('falla')}; reinicios ${tramos('reinicio_placa')})`);
}

// Los casos del cierre que espera (7) son asíncronos: el resumen sale cuando terminan.
function terminarPrueba() {
  console.log(fallos ? `\n${fallos} FALLA(S)` : '\nTODO BIEN');
  process.exit(fallos ? 1 : 0);
}
