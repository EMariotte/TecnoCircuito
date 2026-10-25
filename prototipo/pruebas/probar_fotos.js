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
// trabajador.js armado como lo arma construir.js (npm run probar:fotos lo deja en pruebas/trabajador.cjs)
const CODIGO_TRABAJADOR = fs.readFileSync(path.join(__dirname, 'trabajador.cjs'), 'utf8');
const VERSION_EVENTOS = Number(/VERSION_EVENTOS\s*=\s*(\d+)/.exec(fs.readFileSync(path.join(RAIZ, 'src', 'eventos.js'), 'utf8'))[1]);

/**
 * Un simulador con su Worker controlado: `entregar(foto)` hace llegar una foto como si viniera del Worker y
 * `confirmar()` el «detenido» con que el Worker dice que paró. El reloj es falso: `pasar(ms)` corre las esperas.
 */
function armar(circuitoInicial, extra = {}) {
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
  // Los oyentes que el simulador deja en el lienzo, con la función para quitarlos (como lienzo.js)
  const oyentes = { cambiar: [], pulsar: [], acercar: [] };
  const escuchar = (lista) => (fn) => { lista.push(fn); return () => lista.splice(lista.indexOf(fn), 1); };
  const alCambiar = (c) => oyentes.cambiar.forEach((fn) => fn(c));
  const eventos = [];
  const serial = [];
  const sim = entorno.crearSimulador({ hex: HEX,
    lienzo: { circuito: () => structuredClone(circuito), _mostrar: (v) => vistas.push(v), alCambiar: escuchar(oyentes.cambiar),
      _alPulsar: escuchar(oyentes.pulsar), _alAcercar: escuchar(oyentes.acercar) },
    alEvento: (ev) => eventos.push(ev), ...extra });
  sim.alSerial((t) => serial.push(t));
  worker.onmessage({ data: { tipo: 'listo' } });
  const turno = () => worker.mensajes.filter((m) => 'turno' in m).at(-1).turno;
  return {
    sim, eventos, serial, vistas, oyentes,
    turno,
    pasar,
    terminado: () => terminado,
    /** Lo que mandaría el Worker ahora, con el turno que el Worker conoce en este momento. */
    foto: (n, extra = {}) => ({ tipo: 'foto', turno: turno(), ...n.foto(), velocidad: 1, msReales: 0, ...extra }),
    entregar: (f) => worker.onmessage({ data: f }),
    /** El Worker confirma que paró (con el turno de su última orden), como hace trabajador.js. */
    confirmar: (msSimulados) => worker.onmessage({ data: { tipo: 'detenido', turno: turno(), msSimulados } }),
    recablear: (nuevo) => { circuito = structuredClone(nuevo); alCambiar(structuredClone(nuevo)); },
    /** Las órdenes que la página le mandó al Worker, y el Worker controlado (para sus onerror y onmessageerror). */
    mensajes: () => worker.mensajes,
    worker: () => worker,
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

  // REG-005 (TC-9): destruir() suelta los oyentes que dejó en el lienzo
  {
    const s = armar(LED_DIRECTO);
    const antes = Object.values(s.oyentes).map((l) => l.length).join();
    s.sim.iniciar();
    const p = s.sim.destruir();
    s.confirmar();
    await p;
    revisar(antes === '1,1,1' && Object.values(s.oyentes).every((l) => l.length === 0), `destruir: suelta sus oyentes del lienzo (antes ${antes})`);
  }

  // REG-005 (TC-5): sin Worker, el mismo código corre en la página. Destruir con { sinEsperar: true } lo detiene ya:
  // antes, el «detener» esperaba su turno, nadie lo recibía y el reloj seguía corriendo en la página.
  {
    const p = armarSinWorker();
    p.sim.iniciar();
    for (let k = 0; k < 10; k++) p.pasar(2);
    const corriendo = p.ciclos();
    p.sim.destruir({ sinEsperar: true });
    await null;
    for (let k = 0; k < 5; k++) p.pasar(2);
    const alDestruir = p.ciclos();
    for (let k = 0; k < 20; k++) p.pasar(2);
    revisar(p.hilo === 'pagina' && corriendo > 3 && p.ciclos() === alDestruir,
      `sin Worker: destruir sin esperar detiene el reloj de la página (${corriendo} vueltas antes; ${p.ciclos() - alDestruir} después)`);
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

// 10. REG-005 (TC-2 y TC-3): el cierre dice si el Worker lo confirmó. Sin confirmación (la espera de 500 ms o cerrar la
// ventana) sale `confirmado: false`, y su tiempo no queda antes del de una falla ya registrada: antes usaba el de la
// vista, que no avanza con una foto tardía, y el lector veía «una falla después del cierre».
for (const forma of ['espera', 'sinEsperar']) {
  const s = armar(LED_DIRECTO);
  const n = nucleo();
  s.sim.iniciar();
  s.entregar(s.foto(n)); // la vista queda en 0 ms
  n.avanzar(FRECUENCIA * 0.016);
  const pendiente = s.foto(n); // del turno de antes de Detener: entrega sus hechos pero no se dibuja
  if (forma === 'espera') {
    s.sim.detener();
    s.entregar(pendiente);
    s.pasar(500);
  } else {
    s.sim.pausar();
    s.entregar(pendiente);
    s.sim.destruir({ sinEsperar: true });
  }
  const c = cierres(s)[0];
  const msFalla = Math.max(...deTipo(s.eventos, 'falla').map((e) => e.ms_sim));
  revisar(c && c.datos.confirmado === false && msFalla === Math.round(pendiente.msSimulados) && c.ms_sim >= msFalla && c.datos.ms_sim === c.ms_sim,
    `${forma}: el cierre sin confirmar dice confirmado false y su tiempo (${c && c.ms_sim} ms) no queda antes de la falla (${msFalla} ms)`);
}
{
  const s = armar(LED_DIRECTO);
  s.sim.iniciar();
  s.sim.detener();
  s.confirmar(7);
  const c = cierres(s)[0];
  revisar(c.datos.confirmado === true && c.ms_sim === 7, 'con la confirmación del Worker: confirmado true y su tiempo');
  const s2 = armar(LED_DIRECTO);
  s2.sim.iniciar();
  s2.sim.detener();
  s2.confirmar(undefined); // trabajador.js confirma sin msSimulados si su última foto falló
  revisar(cierres(s2)[0].datos.confirmado === false, 'una confirmación sin la última foto: confirmado false');
}

// 11. REG-005 (TC-4): la pausa y el RESET llevan lo último que se sabe del reloj, también por una foto tardía
{
  const s = armar(LED_DIRECTO);
  const n = nucleo();
  s.sim.iniciar();
  s.entregar(s.foto(n)); // vista en 0 ms
  n.avanzar(FRECUENCIA * 0.016);
  const pendiente = s.foto(n);
  s.sim.pausar();
  s.entregar(pendiente); // llega tarde: sus hechos sí, su vista no
  s.sim.iniciar();
  s.sim.pausar(); // otra pausa antes de la próxima foto
  s.sim.reiniciar();
  const ms = Math.round(pendiente.msSimulados);
  const pausa = deTipo(s.eventos, 'simulacion_pausada')[1];
  const reset = deTipo(s.eventos, 'reinicio_placa').find((e) => e.datos.motivo === 'boton');
  revisar(pausa.ms_sim === ms && reset.ms_sim === ms && reset.tramo === 0,
    `la segunda pausa y el RESET dicen ${pausa.ms_sim} y ${reset.ms_sim} ms (la falla tardía fue a los ${ms})`);
  // Después del RESET, el reloj nuevo empieza en cero: lo de antes no sube su tiempo
  s.sim.pausar();
  revisar(deTipo(s.eventos, 'simulacion_pausada').at(-1).ms_sim === 0 && deTipo(s.eventos, 'simulacion_pausada').at(-1).tramo === 1,
    'después del RESET, la pausa es del tramo nuevo y empieza en 0 ms');
  detenerYConfirmar(s);
}

// 12. REG-005 (TC-7): activas guarda solo las no idealidades conocidas, como sí o no
{
  const s = armar(LED_DIRECTO, { noIdealidades: { limiteUSB: 0, ruidoADC: 'si', inventada: true } });
  s.sim.iniciar();
  const a = deTipo(s.eventos, 'simulacion_iniciada')[0].datos.activas;
  revisar(a.limiteUSB === false && a.ruidoADC === true && !('inventada' in a) && Object.values(a).every((v) => typeof v === 'boolean'),
    `activas: solo claves conocidas y booleanas (${JSON.stringify(a)})`);
  detenerYConfirmar(s);
}

// 13. REG-005: trabajador.js real, con reloj y canal controlados
{
  // TC-1: al pulsar RESET, lo que el núcleo tenía sin mandar sale con el turno de antes (su tramo), no en el nuevo
  const w = trabajadorReal();
  w.enviar({ tipo: 'crear', hex: HEX, circuito: LED_DIRECTO, activas: { danoComponentes: true, limitePin: true }, semilla: 1 });
  w.enviar({ tipo: 'iniciar', nuevo: true, turno: 1 });
  w.correr(15); // menos que el ritmo de fotos (16 ms): lo que pase queda sin mandar
  const fotosAntes = w.fotos().length;
  w.enviar({ tipo: 'reiniciar', turno: 2 });
  const nuevas = w.fotos().slice(fotosAntes);
  const [deAntes, deDespues] = nuevas;
  revisar(nuevas.length === 2 && deAntes.turno === 1 && deAntes.fallas.length >= 1 && deAntes.msSimulados >= 14 &&
    deDespues.turno === 2 && deDespues.fallas.length === 0 && deDespues.msSimulados < 1,
    `RESET: la foto con lo pendiente sale con el turno anterior (turno ${deAntes && deAntes.turno}, ${deAntes && tiposDeFalla(deAntes.fallas)}, ${deAntes && Math.round(deAntes.msSimulados)} ms) y la del reloj nuevo sin ello`);

  // TC-6: si la última foto falla al detener, la confirmación sale igual (sin msSimulados) y después el error
  w.fallarFotos = true;
  w.enviar({ tipo: 'detener', turno: 3 });
  const ultimos = w.salidas.slice(-2).map((m) => m.tipo).join();
  const detenido = w.salidas.find((m) => m.tipo === 'detenido');
  revisar(ultimos === 'detenido,error' && detenido.turno === 3 && detenido.msSimulados === undefined,
    `detener con una foto que falla: el Worker confirma igual, sin msSimulados (${ultimos})`);
}
{
  // Si la foto de antes del RESET falla, se avisa el error y el RESET se hace igual (el reloj vuelve a cero)
  const w = trabajadorReal();
  w.enviar({ tipo: 'crear', hex: HEX, circuito: LED_DIRECTO, activas: {}, semilla: 1 });
  w.enviar({ tipo: 'iniciar', nuevo: true, turno: 1 });
  w.correr(15);
  w.fallarFotos = true;
  w.enviar({ tipo: 'reiniciar', turno: 2 });
  w.fallarFotos = false;
  w.enviar({ tipo: 'detener', turno: 3 });
  const detenido = w.salidas.find((m) => m.tipo === 'detenido');
  revisar(w.salidas.some((m) => m.tipo === 'error') && detenido && detenido.turno === 3 && detenido.msSimulados < 1,
    `RESET con una foto que falla: se avisa y el chip vuelve a cero igual (${detenido && Math.round(detenido.msSimulados)} ms al detener)`);
}
{
  // Control: detener normal manda la última foto y la confirmación con su tiempo
  const w = trabajadorReal();
  w.enviar({ tipo: 'crear', hex: HEX, circuito: LED_DIRECTO, activas: {}, semilla: 1 });
  w.enviar({ tipo: 'iniciar', nuevo: true, turno: 1 });
  w.correr(5);
  w.enviar({ tipo: 'detener', turno: 2 });
  const [foto, detenido] = w.salidas.slice(-2);
  revisar(foto.tipo === 'foto' && detenido.tipo === 'detenido' && detenido.msSimulados === foto.msSimulados && foto.msSimulados >= 4 && detenido.integra === true,
    'detener normal: la última foto y la confirmación con su tiempo, entera');
}

// 14. AUD-16 (auditoría de Codex de REG-005, R02): una foto que no sale se lleva sus hechos. La corrida queda incompleta
// hasta la siguiente y su cierre dice confirmado false; la vuelta periódica sigue. El Worker real conectado a la página
// real: cada salida del Worker llega a la página, en orden.
function conectado() {
  const w = trabajadorReal();
  const s = armar(LED_DIRECTO);
  let entregadas = 0;
  const pasar = () => { for (const m of w.salidas.slice(entregadas)) s.entregar(m); entregadas = w.salidas.length; };
  w.enviar({ tipo: 'crear', hex: HEX, circuito: LED_DIRECTO, activas: { danoComponentes: true, limitePin: true }, semilla: 1 });
  const orden = (m) => { w.enviar({ ...m, turno: s.turno() }); pasar(); };
  return { w, s, pasar, orden, cierre: () => s.eventos.filter((e) => e.tipo === 'simulacion_detenida').at(-1) };
}
for (const fallar of [false, true]) {
  // La foto de antes del RESET (con las fallas de 15 ms) no sale; la del reloj nuevo y el cierre, sí
  const { w, s, orden, cierre } = conectado();
  s.sim.iniciar(); orden({ tipo: 'iniciar', nuevo: true });
  w.correr(15);
  s.sim.reiniciar();
  w.fallarFotos = fallar; orden({ tipo: 'reiniciar' }); w.fallarFotos = false;
  orden({ tipo: 'iniciar', nuevo: false });
  s.sim.detener(); orden({ tipo: 'detener' });
  const c = cierre();
  const errores = w.salidas.filter((m) => m.tipo === 'error').length;
  if (!fallar) revisar(c.datos.confirmado === true && c.datos.fallas.length >= 2 && !errores, `control AUD-16: sin fallo, el RESET entrega las fallas y el cierre confirma (${tiposDeFalla(c.datos.fallas)})`);
  // Fallan las dos fotos del RESET (la de antes y la del reloj nuevo): cada una avisa su error
  else revisar(c.datos.confirmado === false && c.datos.fallas.length === 0 && errores === 2, `AUD-16: se perdió la foto de antes del RESET con sus fallas: el cierre dice confirmado false (${errores} errores avisados)`);
}
{
  // La vuelta periódica: la foto falla en una vuelta del reloj, que no se corta; se avisa una vez y la corrida sigue
  const { w, s, orden, pasar, cierre } = conectado();
  s.sim.iniciar(); orden({ tipo: 'iniciar', nuevo: true });
  w.correr(15);
  w.fallarFotos = true;
  let escapo = null;
  try { w.correr(40); } catch (err) { escapo = err.message; }
  w.fallarFotos = false;
  const antes = w.fotos().length;
  w.correr(80);
  pasar();
  const despues = w.fotos().slice(antes);
  const errores = w.salidas.filter((m) => m.tipo === 'error').length;
  s.sim.detener(); orden({ tipo: 'detener' });
  const detenido = w.salidas.filter((m) => m.tipo === 'detenido').at(-1);
  revisar(!escapo && errores === 1 && despues.length >= 4 && despues.at(-1).msSimulados > despues[0].msSimulados && detenido.integra === false && cierre().datos.confirmado === false,
    `AUD-16: la foto periódica falla 40 ms: el reloj sigue (${despues.length} fotos después), un error avisado y el cierre sin confirmar`);
  // La corrida siguiente empieza entera
  s.sim.iniciar(); orden({ tipo: 'iniciar', nuevo: true });
  w.correr(20);
  s.sim.detener(); orden({ tipo: 'detener' });
  revisar(w.salidas.filter((m) => m.tipo === 'detenido').at(-1).integra === true && cierre().datos.confirmado === true && cierre().corrida === 2,
    'AUD-16: la corrida nueva después de la pérdida empieza entera y se confirma');
}
{
  // Si falla la primera foto de la corrida, el reloj arranca igual y el cierre no confirma
  const { w, s, orden, cierre } = conectado();
  s.sim.iniciar();
  w.fallarFotos = true; orden({ tipo: 'iniciar', nuevo: true }); w.fallarFotos = false;
  w.correr(40);
  s.sim.detener(); orden({ tipo: 'detener' });
  revisar(w.fotos().length >= 2 && cierre().datos.confirmado === false, `AUD-16: falla la primera foto: el reloj arranca igual (${w.fotos().length} fotos) y el cierre no confirma`);
}
{
  // Con la última foto fallida (TC-6), la confirmación tampoco dice entera
  const w = trabajadorReal();
  w.enviar({ tipo: 'crear', hex: HEX, circuito: LED_DIRECTO, activas: {}, semilla: 1 });
  w.enviar({ tipo: 'iniciar', nuevo: true, turno: 1 });
  w.correr(5);
  w.fallarFotos = true;
  w.enviar({ tipo: 'detener', turno: 2 });
  const detenido = w.salidas.find((m) => m.tipo === 'detenido');
  revisar(detenido.integra === false && detenido.msSimulados === undefined, 'AUD-16: con la última foto fallida, el Worker confirma sin tiempo y sin decir entera');
}

// 15. AUD-26 (riesgo W-R1 de la verificación de Codex del 24 oct): un error del núcleo fuera de la foto. El Worker para
// el reloj a propósito, lo avisa con `parado` y no vuelve a arrancar solo; la página cierra la corrida sin confirmar en vez
// de verse corriendo sin avanzar. El núcleo real, con una falla inyectada en avanzar, reiniciarChip o ponerCircuito.
/** El Worker y la página conectados, con el núcleo que puede fallar; `seguir()` lleva las órdenes y las respuestas. */
function conectadoConFallas() {
  const { codigo, fallas } = trabajadorConFallas();
  const w = trabajadorEn(codigo, { __nucleo: fallas.nucleo });
  // Una excepción que se escapa del reloj del Worker (lo que pasaba antes de AUD-26) se anota, no corta la prueba
  const escapadas = [];
  const correr = w.correr;
  w.correr = (ms) => { try { correr(ms); } catch (err) { escapadas.push(err.message); } };
  const s = armar(LED_DIRECTO);
  let enviadas = 0, entregadas = 0;
  const seguir = () => {
    for (let vuelta = 0; vuelta < 10; vuelta++) {
      const ordenes = s.mensajes().slice(enviadas);
      enviadas = s.mensajes().length;
      for (const m of ordenes) { try { w.enviar(m); } catch (err) { escapadas.push(err.message); } }
      const respuestas = w.salidas.slice(entregadas);
      entregadas = w.salidas.length;
      for (const m of respuestas) s.entregar(m);
      if (!ordenes.length && !respuestas.length) return;
    }
  };
  seguir(); // la página ya pidió «crear»
  const cierres = () => deTipo(s.eventos, 'simulacion_detenida');
  const errores = () => w.salidas.filter((m) => m.tipo === 'error');
  return { w, s, fallas, seguir, cierres, errores, escapadas, estado: () => s.sim.medidas().estado };
}
for (const [nombre, provocar] of [
  ['avanzar falla una vez', (x) => { x.fallas.veces.avanzar = 1; x.w.correr(10); }],
  ['avanzar falla siempre', (x) => { x.fallas.veces.avanzar = Infinity; x.w.correr(10); }],
  ['reiniciarChip falla al pulsar RESET', (x) => { x.fallas.veces.reiniciarChip = 1; x.s.sim.reiniciar(); }],
  ['ponerCircuito falla al recablear', (x) => { x.fallas.veces.ponerCircuito = 1; x.s.recablear({ ...LED_DIRECTO, cables: LED_DIRECTO.cables.slice(0, 1) }); }],
]) {
  const x = conectadoConFallas();
  x.s.sim.iniciar(); x.seguir();
  x.w.correr(15); x.seguir();
  provocar(x); x.seguir();
  const fotosAlParar = x.w.fotos().length;
  x.w.correr(200); x.seguir(); // el reloj no sigue ni se reintenta solo
  const quieto = x.w.fotos().length === fotosAlParar;
  const c = x.cierres()[0];
  revisar(!x.escapadas.length && x.errores().length === 1 && x.errores()[0].parado === true && quieto && x.estado() === 'detenido' && c && c.datos.confirmado === false,
    `AUD-26, ${nombre}: el Worker para y lo avisa una vez, la página cierra la corrida sin confirmar (${x.errores().length} error, estado ${x.estado()}` +
    `${x.escapadas.length ? `, se escapó: ${x.escapadas[0]}` : ''})`);
  // Una corrida nueva vuelve a empezar entera, si el núcleo ya no falla
  x.fallas.veces.avanzar = 0;
  x.s.sim.iniciar(); x.seguir();
  x.w.correr(20); x.seguir();
  x.s.sim.detener(); x.seguir();
  revisar(x.cierres().length === 2 && x.cierres()[1].datos.confirmado === true && x.cierres()[1].corrida === 2,
    `control AUD-26, ${nombre}: la corrida siguiente empieza entera y se confirma`);
}
{
  // Si el núcleo sigue fallando, cada intento para una vez: no hay un bucle de errores
  const x = conectadoConFallas();
  x.fallas.veces.avanzar = Infinity;
  for (let i = 0; i < 3; i++) { x.s.sim.iniciar(); x.seguir(); x.w.correr(50); x.seguir(); }
  revisar(x.errores().length === 3 && x.cierres().length === 3 && x.cierres().every((c) => c.datos.confirmado === false),
    `AUD-26: con el núcleo fallando siempre, tres intentos dan tres errores y tres cierres sin confirmar (${x.errores().length})`);
}
{
  // Control: sin errores, el arnés con el núcleo envuelto confirma como siempre
  const x = conectadoConFallas();
  x.s.sim.iniciar(); x.seguir(); x.w.correr(40); x.seguir(); x.s.sim.detener(); x.seguir();
  revisar(!x.errores().length && x.cierres()[0].datos.confirmado === true && x.cierres()[0].datos.fallas.length >= 1, 'control AUD-26: sin errores, la corrida se confirma con sus fallas');
}
{
  // Un error del Worker que no lleva turno (el Worker mismo falló) o un mensaje que no se pudo leer: la corrida no se da
  // por entera; con el error del Worker, además, se cierra
  const s = armar(LED_DIRECTO);
  s.sim.iniciar();
  s.worker().onerror({ message: 'error sintético del Worker', preventDefault() {} });
  revisar(s.sim.medidas().estado === 'detenido' && s.mensajes().at(-1).tipo === 'detener', 'AUD-26: un error del Worker después de cargar cierra la corrida');
  s.confirmar(5);
  revisar(cierres(s)[0].datos.confirmado === false, 'AUD-26: y su cierre sale sin confirmar, aunque el Worker confirme que paró');
  const s2 = armar(LED_DIRECTO);
  s2.sim.iniciar();
  s2.worker().onmessageerror();
  s2.sim.detener(); s2.confirmar(5);
  revisar(s2.sim.medidas().estado === 'detenido' && cierres(s2)[0].datos.confirmado === false, 'AUD-26: un mensaje que no se pudo leer deja la corrida sin confirmar');
  // Control: el error de una corrida anterior (su turno es de antes) no toca la nueva
  const s3 = armar(LED_DIRECTO);
  s3.sim.iniciar(); s3.sim.detener();
  const turnoViejo = s3.turno();
  s3.confirmar(5);
  s3.sim.iniciar();
  s3.entregar({ tipo: 'error', turno: turnoViejo, mensaje: 'tarde', parado: true });
  revisar(s3.sim.medidas().estado === 'corriendo', 'control AUD-26: un error con el turno de una corrida anterior no detiene la nueva');
  s3.sim.detener(); s3.confirmar(5);
  revisar(cierres(s3)[1].datos.confirmado === true, 'control AUD-26: y la nueva se confirma');
}
{
  // Sin Worker: el mismo código corre en la página. El núcleo falla al avanzar: el reloj de la página para y la corrida
  // se cierra sin confirmar
  const { codigo, fallas } = trabajadorConFallas();
  const eventos = [];
  const p = armarSinWorker(codigo, { __nucleo: fallas.nucleo }, (ev) => eventos.push(ev));
  const escapadas = [];
  const pasar = (ms) => { try { p.pasar(ms); } catch (err) { escapadas.push(err.message); } };
  p.sim.iniciar();
  for (let i = 0; i < 30; i++) pasar(1);
  fallas.veces.avanzar = 1;
  for (let i = 0; i < 30; i++) pasar(1);
  const vueltasAlParar = p.ciclos();
  for (let i = 0; i < 200; i++) pasar(1);
  const cierre = eventos.find((e) => e.tipo === 'simulacion_detenida');
  revisar(!escapadas.length && p.sim.medidas().estado === 'detenido' && cierre && cierre.datos.confirmado === false && p.ciclos() - vueltasAlParar < 5,
    `AUD-26 sin Worker: el núcleo falla, el reloj de la página para y el cierre sale sin confirmar (${p.ciclos() - vueltasAlParar} vueltas después` +
    `${escapadas.length ? `; se escapó: ${escapadas[0]}` : ''})`);
}

// 16. AUD-23 (auditoría de Codex de REG-005, R08): la pausa. El reloj del Worker no avanza mientras está pausado; aparte,
// una foto de antes de pausar que llega tarde sube lo que la página sabe al reanudar, y eso es legítimo.
{
  const w = trabajadorReal();
  w.enviar({ tipo: 'crear', hex: HEX, circuito: LED_DIRECTO, activas: { danoComponentes: true, limitePin: true }, semilla: 1 });
  w.enviar({ tipo: 'iniciar', nuevo: true, turno: 1 });
  w.correr(50);
  w.enviar({ tipo: 'pausar', turno: 2 });
  const sonda = () => { w.enviar({ tipo: 'pulsador', id: 'nada', presionado: false, turno: 2 }); return w.fotos().at(-1).msSimulados; }; // en pausa, una foto
  const alPausar = sonda();
  const fotos = w.fotos().length;
  w.correr(300);
  const sinFotos = w.fotos().length === fotos;
  const despues = sonda();
  w.enviar({ tipo: 'iniciar', nuevo: false, turno: 3 });
  const alSeguir = w.fotos().at(-1);
  revisar(sinFotos && despues === alPausar && alSeguir.turno === 3 && alSeguir.msSimulados === alPausar && alPausar > 40,
    `AUD-23: en 300 ms de pausa el reloj del Worker no avanza (${Math.round(alPausar)} ms al pausar, ${Math.round(despues)} después, ${Math.round(alSeguir.msSimulados)} al seguir)`);
}
{
  // La foto de antes de pausar llega con la pausa ya hecha: al reanudar, la página sabe más de 20 ms más que al pausar,
  // pero es la hora del Worker de antes de pausar. Después, un RESET la toma como lo último que se sabe de su tramo.
  const { w, s, orden, pasar } = conectado();
  s.sim.iniciar(); orden({ tipo: 'iniciar', nuevo: true });
  w.correr(40); // fotos hechas, sin entregar todavía
  const ultimaAntes = w.fotos().at(-1).msSimulados;
  s.sim.pausar(); orden({ tipo: 'pausar' }); // la página pausa sabiendo solo la primera foto
  w.correr(300);
  const sinFotosEnPausa = w.fotos().at(-1).msSimulados === ultimaAntes;
  pasar(); // llegan tarde
  s.sim.iniciar(); orden({ tipo: 'iniciar', nuevo: false });
  const pausa = deTipo(s.eventos, 'simulacion_pausada')[0], sigue = deTipo(s.eventos, 'simulacion_reanudada')[0];
  const primeraAlSeguir = w.fotos().at(-1).msSimulados;
  revisar(sigue.ms_sim - pausa.ms_sim > 20 && sinFotosEnPausa && sigue.ms_sim <= primeraAlSeguir && primeraAlSeguir - ultimaAntes <= 16,
    `AUD-23: la foto tardía sube la reanudación de ${pausa.ms_sim} a ${sigue.ms_sim} ms, sin que el Worker avance en la pausa (su primera foto al seguir: ${Math.round(primeraAlSeguir)} ms)`);
  w.correr(20); pasar();
  s.sim.reiniciar(); orden({ tipo: 'reiniciar' }); orden({ tipo: 'iniciar', nuevo: false });
  const reset = deTipo(s.eventos, 'reinicio_placa').find((e) => e.datos.motivo === 'boton');
  s.sim.pausar(); orden({ tipo: 'pausar' });
  const pausaNueva = deTipo(s.eventos, 'simulacion_pausada').at(-1);
  revisar(reset.tramo === 0 && reset.ms_sim >= sigue.ms_sim && pausaNueva.tramo === 1 && pausaNueva.ms_sim < 20,
    `AUD-23: el RESET después de la foto tardía es del tramo 0 (${reset.ms_sim} ms) y la pausa siguiente empieza en el tramo 1 (${pausaNueva.ms_sim} ms)`);
  s.sim.detener(); orden({ tipo: 'detener' });
}

/**
 * La fuente de trabajador.js con el núcleo real, que puede fallar a pedido: `fallas.veces.avanzar = 1` hace que la
 * próxima llamada lance (Infinity: todas). Así se ejercita el Worker de verdad, sin tocar su código.
 */
function trabajadorConFallas() {
  const fuenteTrabajador = fs.readFileSync(path.join(RAIZ, 'src', 'trabajador.js'), 'utf8')
    .replace(/^import \{ crearNucleo, FRECUENCIA \} from '\.\/nucleo\.js';\r?$/m, 'const { crearNucleo, FRECUENCIA } = __nucleo;');
  if (!fuenteTrabajador.includes('= __nucleo;')) throw new Error('trabajador.js ya no importa crearNucleo como esperaba la prueba');
  const veces = { avanzar: 0, reiniciarChip: 0, ponerCircuito: 0 };
  const nucleoQueFalla = {
    FRECUENCIA,
    crearNucleo(opciones) {
      const n = crearNucleo(opciones);
      for (const k of Object.keys(veces)) {
        const original = n[k].bind(n);
        n[k] = (...args) => {
          if (veces[k] > 0) { veces[k]--; throw new Error(`${k}: falla sintética del núcleo`); }
          return original(...args);
        };
      }
      return n;
    },
  };
  return { codigo: fuenteTrabajador, fallas: { veces, nucleo: nucleoQueFalla } };
}

/** trabajador.js real (pruebas/trabajador.cjs) con un `self` falso, el reloj en `correr(ms)` y el canal a mano. */
function trabajadorReal() {
  return trabajadorEn(CODIGO_TRABAJADOR, {});
}
/** Lo mismo con otro código del Worker y lo que ese código necesite en su contexto (el núcleo que puede fallar, AUD-26). */
function trabajadorEn(codigo, contexto) {
  let ahora = 0;
  let esperas = [];
  const w = { salidas: [], fallarFotos: false };
  const entorno = vm.createContext({
    ...contexto,
    console, TextDecoder, performance: { now: () => ahora },
    setTimeout: (fn, ms) => { esperas.push({ fn, en: ahora + (ms || 0) }); return esperas.length; },
    clearTimeout() {},
    MessageChannel: class {
      constructor() {
        const port1 = { onmessage: null };
        this.port1 = port1;
        this.port2 = { postMessage: () => esperas.push({ fn: () => port1.onmessage(), en: ahora }) };
      }
    },
    self: {
      onmessage: null,
      postMessage: (m) => {
        if (w.fallarFotos && m.tipo === 'foto') throw new Error('la foto no se pudo mandar');
        w.salidas.push(m);
      },
    },
  });
  vm.runInContext(codigo, entorno);
  w.enviar = (m) => entorno.self.onmessage({ data: m });
  w.fotos = () => w.salidas.filter((m) => m.tipo === 'foto');
  w.correr = (ms) => {
    for (const fin = ahora + ms; ahora < fin;) {
      ahora = Math.min(fin, ahora + 1);
      for (const e of esperas.filter((x) => x.en <= ahora)) { esperas = esperas.filter((x) => x !== e); e.fn(); }
    }
  };
  return w;
}

/** El simulador sin Worker (el navegador no lo deja crear): trabajador.js corre en la página con el reloj falso. */
function armarSinWorker(codigo = CODIGO_TRABAJADOR, contexto = {}, alEvento = undefined) {
  let ahora = 0;
  let esperas = [];
  let vueltas = 0; // cada vuelta del reloj del Worker lee la hora
  const setTimeoutFalso = (fn, ms) => { const e = { fn, en: ahora + (ms || 0) }; esperas.push(e); return e; };
  const entorno = vm.createContext({ ...contexto, leerHex, PLACAS, VERSION_EVENTOS, __CODIGO_TRABAJADOR__: codigo,
    console, Promise, TextDecoder, performance: { now: () => { vueltas++; return ahora; } },
    requestAnimationFrame: () => 0, cancelAnimationFrame() {},
    setTimeout: setTimeoutFalso, clearTimeout: (e) => { esperas = esperas.filter((x) => x !== e); },
    MessageChannel: class {
      constructor() {
        const port1 = { onmessage: null };
        this.port1 = port1;
        this.port2 = { postMessage: () => setTimeoutFalso(() => port1.onmessage(), 0) };
      }
    } });
  vm.runInContext(fuente, entorno);
  const sim = entorno.crearSimulador({ hex: HEX, lienzo: { circuito: () => structuredClone(LED_DIRECTO), _mostrar() {}, alCambiar() {} }, alEvento });
  return {
    sim,
    hilo: sim.medidas().hilo,
    ciclos: () => vueltas,
    pasar: (ms) => {
      ahora += ms;
      for (const e of esperas.filter((x) => x.en <= ahora)) { esperas = esperas.filter((x) => x !== e); e.fn(); }
    },
  };
}

// Los casos del cierre que espera (7) son asíncronos: el resumen sale cuando terminan.
function terminarPrueba() {
  console.log(fallos ? `\n${fallos} FALLA(S)` : '\nTODO BIEN');
  process.exit(fallos ? 1 : 0);
}
