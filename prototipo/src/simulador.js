// Simulador (prototipos 1 a 3), con la API de crearSimulador del contrato 1.
// Desde el prototipo 3, el chip y el circuito corren en un Web Worker (trabajador.js, con el núcleo de nucleo.js).
// Esta parte vive en la página: manda órdenes al Worker, recibe «fotos» de lo que pasa y las dibuja en el lienzo
// una vez por cuadro de pantalla. Si el navegador no deja crear el Worker, el mismo código corre en la página.
import { leerHex } from './hex.js';
import { PLACAS } from './catalogo.js';

import { VERSION_EVENTOS } from './eventos.js';

// Las corridas se cuentan mientras la página está abierta, no por simulador: TecnoBloques crea uno nuevo cada vez
// que se pulsa Simular, y así la corrida 2 es la segunda simulación de la sesión (contrato, sección 6.1).
let corridas = 0;

export const CLAVES_NO_IDEALIDADES = ['danoComponentes', 'limitePin', 'entradaFlotante', 'ruidoADC', 'limiteUSB', 'caidaL293D', 'resistenciaBateria'];
// Si el Worker no confirma que paró en este tiempo, el cierre de la corrida sale con lo que llegó (AUD-03-V1).
const ESPERA_CIERRE_MS = 500;
// El código del Worker, ya armado: lo pone construir.js. Va como texto para que todo quepa en un solo archivo.
const CODIGO_TRABAJADOR = typeof __CODIGO_TRABAJADOR__ === 'string' ? __CODIGO_TRABAJADOR__ : '';

export function crearSimulador(opciones = {}) {
  const { lienzo, hex } = opciones;
  const placa = opciones.placa || lienzo?.circuito?.()?.placa || 'uno';
  if (!PLACAS[placa]) throw new Error(`Este prototipo no simula la placa «${placa}».`);
  if (!lienzo || typeof lienzo._mostrar !== 'function') throw new Error('crearSimulador necesita un lienzo de TecnoCircuito.');
  if (typeof hex !== 'string') throw new Error('crearSimulador necesita el programa en formato Intel HEX.');
  if (lienzo.circuito().placa !== placa) throw new Error('El programa y el circuito deben usar la misma placa.');
  leerHex(hex); // se revisa aquí, de una vez: si el .hex está dañado, el error sale al crear el simulador
  const modo = opciones.modo === 'ideal' ? 'ideal' : 'realista';
  // El modo enciende o apaga todas las no idealidades; noIdealidades ajusta una por una encima del modo.
  const activas = Object.fromEntries(CLAVES_NO_IDEALIDADES.map((k) => [k, modo === 'realista']));
  Object.assign(activas, opciones.noIdealidades || {});
  const alEvento = typeof opciones.alEvento === 'function' ? opciones.alEvento : null;
  const oyentes = { serial: [], falla: [], estado: [] };

  let estado = 'detenido';
  let vivo = true; // acepta órdenes; destruir() lo apaga enseguida
  let oyendo = true; // recibe lo que manda el Worker; se apaga cuando el cierre de destruir() termina
  // El cierre de una corrida que espera al Worker (AUD-03): { turno, promesa, terminar(m) }. Mientras espera, la
  // página ya se ve detenida, pero las fotos pendientes de la corrida todavía entregan sus hechos.
  let cierre = null;
  let finDestruir = null;
  let turno = 0; // sube con cada cambio de estado (no es la «corrida» del registro): la vista de las fotos de antes se descarta
  let turnoCorrida = 0; // el turno con que empezó la corrida: las fotos desde ahí son de esta corrida (AUD-03)
  let vista = null; // la última foto, para dibujarla en el próximo cuadro
  let cuadro = 0;
  const medidas = { msSimulados: 0, msReales: 0, velocidad: 1, evaluaciones: 0 };
  let medicion = null;
  let reiniciosVistos = 0; // reinicios por energía ya avisados en esta corrida
  let corrida = 0; // el número de la corrida en el registro de eventos (sube en cada simulacion_iniciada)
  // El turno de cada RESET con el botón de esta corrida. Cada RESET pone el reloj de la corrida en cero y empieza otro
  // «tramo»: el de una foto es cuántos RESET hubo con un turno menor o igual al suyo. Así una foto de antes del RESET
  // que llega después queda en su tramo, con su reloj (INT-RES-03c; contrato 6.1, «tramo»).
  const turnosReset = [];
  const tramoDe = (t) => turnosReset.filter((r) => r <= t).length;
  const fallas = [];

  const trabajador = crearTrabajador(recibir);
  // `_semilla` (interna, no es del contrato): las pruebas fijan el azar del núcleo para que se repitan.
  const semilla = Number.isInteger(opciones._semilla) ? opciones._semilla : undefined;
  trabajador.enviar({ tipo: 'crear', hex, circuito: lienzo.circuito(), activas, semilla });

  // Una foto trae dos cosas. Los hechos (fallas nuevas, texto del monitor serial, reinicios) el núcleo los manda una
  // sola vez: se entregan aunque la foto llegue tarde, si es de esta corrida. La vista (lo que se dibuja y se mide)
  // solo si es del turno actual: una de antes de pausar o reiniciar mostraría un momento que ya pasó (AUD-03).
  // Con la corrida detenida, los hechos llegan hasta que el Worker confirma que paró: como los mensajes llegan en
  // orden, antes de su «detenido» llegan todas las fotos pendientes (AUD-03-V1).
  function recibir(m) {
    if (!oyendo) return;
    if (m.tipo === 'error') return console.error('TecnoCircuito:', m.mensaje);
    if (m.tipo === 'detenido') return cierre && m.turno === cierre.turno ? cierre.terminar(m) : undefined;
    if (m.tipo !== 'foto' || m.turno < turnoCorrida || (estado === 'detenido' && !cierre)) return;
    entregarHechos(m);
    if (m.turno !== turno || estado === 'detenido') return;
    Object.assign(medidas, { msSimulados: m.msSimulados, msReales: m.msReales, velocidad: m.velocidad, evaluaciones: m.evaluaciones });
    // La tabla usa los voltajes de la foto (con «al aire») y cómo lee el programa cada entrada.
    medicion = m.medicion ? { ...m.medicion, voltajes: m.voltajes, entradas: m.entradas } : null;
    vista = m;
    if (!cuadro) cuadro = requestAnimationFrame(dibujar);
  }
  function entregarHechos(m) {
    const ms = Math.round(m.msSimulados); // el tiempo simulado de la foto: el de los hechos, aunque llegue tarde
    const tramo = tramoDe(m.turno); // y el tramo de su reloj
    for (const f of m.fallas) {
      fallas.push(f);
      oyentes.falla.forEach((fn) => avisar(fn, { tipo: f.tipo, componente: f.componente, mensaje: f.mensaje }));
      const { mensaje, ...datos } = f;
      emitir('falla', datos, ms, tramo);
    }
    // Reinicios por la energía del USB (no idealidad «limiteUSB»): uno por foto, con cuántos hubo desde la anterior.
    const reinicios = m.energia ? m.energia.reinicios : 0;
    if (reinicios > reiniciosVistos) emitir('reinicio_placa', {
      motivo: m.energia.referencia ? 'energia_nano' : 'energia_usb',
      ...(m.energia.referencia ? { fuente: m.energia.fuente } : {}),
      nuevos: reinicios - reiniciosVistos, total: reinicios,
    }, ms, tramo);
    reiniciosVistos = Math.max(reiniciosVistos, reinicios);
    if (m.serial) oyentes.serial.forEach((fn) => avisar(fn, m.serial));
  }

  // Lo que se ve: el LED «L» de la placa sigue al pin 13, y cada LED brilla según su corriente promedio.
  function dibujar() {
    cuadro = 0;
    if (estado === 'detenido' || !vista) return lienzo._mostrar({ simulando: estado !== 'detenido' });
    lienzo._mostrar({
      simulando: true, // el lienzo deja presionar los botones con el mouse
      leds: vista.leds,
      quemados: vista.quemados,
      voltajes: vista.voltajes,
      servos: vista.servos || {},
      piezas: vista.piezas || {},
      // El LED L con su brillo promedio (0 a 1); TX y RX destellan al enviar y al recibir por el monitor serial.
      placa: { ledPower: vista.placa.encendida !== false, led13: vista.placa.brilloL ?? vista.placa.led13, ledTX: vista.placa.ledTX, ledRX: vista.placa.ledRX },
    });
  }

  function avisar(fn, valor) {
    try {
      fn(valor);
    } catch (err) {
      console.error(err); // un error de quien escucha no debe detener la simulación
    }
  }

  // Contrato, sección 6.1: cada evento del simulador lleva su corrida, el tiempo simulado de esa corrida y el tramo de
  // su reloj (los de la página, el tramo actual; los de una foto, el de su turno).
  function emitir(tipo, datos, msSim = medidas.msSimulados, tramo = turnosReset.length) {
    if (alEvento) avisar(alEvento, { v: VERSION_EVENTOS, t: Date.now(), origen: 'simulador', tipo, corrida, ms_sim: Math.round(msSim), tramo, datos });
  }

  function cambiarEstado(nuevo) {
    estado = nuevo;
    oyentes.estado.forEach((fn) => avisar(fn, nuevo));
  }

  // Un botón presionado o soltado con el mouse: lo resuelve el Worker al instante (no cambia el circuito guardado).
  // «La mano»: el mouse sobre un pin o un cable. Una entrada al aire que toca capta la red de 60 Hz.
  if (typeof lienzo._alAcercar === 'function') {
    lienzo._alAcercar((refs) => {
      if (vivo) trabajador.enviar({ tipo: 'mano', refs });
    });
  }
  if (typeof lienzo._alPulsar === 'function') {
    lienzo._alPulsar((id, presionado) => {
      if (vivo) trabajador.enviar({ tipo: 'pulsador', id, presionado });
    });
  }

  // Si el aprendiz cambia el cableado (o gira la perilla), el Worker resuelve otra vez al instante.
  lienzo.alCambiar((nuevo) => {
    if (!vivo) return;
    trabajador.enviar({ tipo: 'circuito', circuito: nuevo, mostrar: estado !== 'detenido', turno });
  });

  return {
    iniciar() {
      if (!vivo || estado === 'corriendo') return;
      // Una corrida nueva antes de que el Worker confirme el cierre de la anterior: ese cierre sale ya, con lo que
      // llegó, para que no quede después del inicio de la nueva.
      if (cierre) cierre.terminar();
      const nuevo = estado === 'detenido';
      turno++;
      if (nuevo) {
        turnoCorrida = turno;
        // Cada corrida empieza con piezas nuevas: sin LED quemados y sin fallas avisadas.
        fallas.length = 0;
        medicion = null;
        vista = null;
        reiniciosVistos = 0;
        turnosReset.length = 0;
        Object.assign(medidas, { msSimulados: 0, msReales: 0, velocidad: 1 });
        corrida = ++corridas;
        // El circuito completo: cada corrida se puede analizar sola, sin reconstruirla desde los cambios.
        emitir('simulacion_iniciada', { placa, modo, activas: { ...activas }, circuito: lienzo.circuito() });
      } else {
        emitir('simulacion_reanudada', {}); // con simulacion_pausada, dice cuánto duró la pausa
      }
      cambiarEstado('corriendo');
      trabajador.enviar({ tipo: 'iniciar', nuevo, turno });
    },
    pausar() {
      if (estado !== 'corriendo') return;
      turno++;
      trabajador.enviar({ tipo: 'pausar', turno });
      emitir('simulacion_pausada', {});
      cambiarEstado('pausado');
    },
    reiniciar() {
      if (!vivo || estado === 'detenido') return;
      turno++;
      // Reiniciar en pausa también la reanuda. Los eventos llevan el momento en que se pulsó; después el chip vuelve a
      // cero (sigue siendo la misma corrida).
      if (estado === 'pausado') emitir('simulacion_reanudada', {});
      emitir('reinicio_placa', { motivo: 'boton' });
      turnosReset.push(turno); // desde aquí, otro tramo: las fotos con este turno o uno mayor ya son del reloj nuevo
      medidas.msSimulados = 0; // el chip vuelve a cero ya; la foto del Worker llega un instante después
      // Como apretar el botón RESET: el programa empieza desde setup().
      trabajador.enviar({ tipo: 'reiniciar', turno });
      trabajador.enviar({ tipo: 'iniciar', nuevo: false, turno });
      // reiniciosVistos no vuelve a 0: el núcleo cuenta los reinicios por energía de toda la corrida, y contarlos otra
      // vez desde 0 avisaría de nuevo los que ya se avisaron (AUD-03).
      cambiarEstado('reiniciado');
      cambiarEstado('corriendo');
    },
    // Contrato 1: se ve detenida al instante y devuelve una promesa que se cumple cuando sale simulacion_detenida.
    // Ese cierre espera a que el Worker confirme que paró, así trae las fallas de las fotos que venían en camino
    // (AUD-03-V1); si el Worker no contesta en ESPERA_CIERRE_MS, sale con lo que llegó. { sinEsperar: true } lo saca
    // ya (al cerrar la ventana no se puede esperar).
    detener({ sinEsperar = false } = {}) {
      if (cierre) {
        const p = cierre.promesa;
        if (sinEsperar) cierre.terminar();
        return p;
      }
      if (estado === 'detenido') return Promise.resolve();
      turno++;
      trabajador.enviar({ tipo: 'detener', turno });
      let cumplir;
      const promesa = new Promise((r) => { cumplir = r; });
      const espera = setTimeout(() => cierre && cierre.terminar(), ESPERA_CIERRE_MS);
      const este = {
        turno,
        promesa,
        terminar(m) {
          if (cierre !== este) return;
          cierre = null;
          clearTimeout(espera);
          // Las fallas de esta corrida, una vez cada una: si una falta en la corrida siguiente, el equipo la corrigió.
          const vistas = new Map(fallas.map((f) => [f.tipo + '|' + f.componente, { tipo: f.tipo, componente: f.componente }]));
          const ms = Math.round(m && typeof m.msSimulados === 'number' ? m.msSimulados : medidas.msSimulados);
          emitir('simulacion_detenida', { ms_sim: ms, ms_simulados: ms, fallas: [...vistas.values()] }, ms);
          cumplir();
        },
      };
      cierre = este;
      cambiarEstado('detenido');
      medicion = null;
      dibujar();
      if (sinEsperar) este.terminar();
      return promesa;
    },
    serialEnviar(texto) {
      if (estado !== 'detenido') trabajador.enviar({ tipo: 'serial', texto: String(texto) });
    },
    alSerial: (fn) => typeof fn === 'function' && oyentes.serial.push(fn),
    alFalla: (fn) => typeof fn === 'function' && oyentes.falla.push(fn),
    alEstado: (fn) => typeof fn === 'function' && oyentes.estado.push(fn),
    // Contrato 1: lo que necesita la línea de estado. velocidad va de 0 a 1 (1 = al ritmo del chip real).
    medidas: () => ({ ...medidas, estado, hilo: trabajador.hilo() }),
    // Contrato 1: detiene la simulación, suelta el lienzo y libera el Worker. Después ya no se puede usar. Devuelve la
    // promesa del cierre (como detener): el Worker se libera cuando sale simulacion_detenida.
    destruir(opciones = {}) {
      if (finDestruir) {
        if (opciones.sinEsperar && cierre) cierre.terminar();
        return finDestruir;
      }
      vivo = false;
      cancelAnimationFrame(cuadro);
      cuadro = 0;
      finDestruir = this.detener(opciones).then(() => {
        oyendo = false;
        trabajador.terminar();
      });
      return finDestruir;
    },
    // Nombres del prototipo que TecnoBloques usó antes de que entraran al contrato: se conservan por ahora.
    _medidas() {
      return this.medidas();
    },
    _destruir(opciones) {
      return this.destruir(opciones);
    },
    // Contrato 1: lo que mediría un multímetro en cada pieza, con el promedio de la vista (sección 48 de COMO-FUNCIONA).
    // null si no se está simulando. TecnoCircuito.filasDeMediciones(m) lo convierte en la tabla en español.
    mediciones: () => (estado === 'detenido' || !medicion ? null : { ...medicion, fallas: [...fallas], modo, activas }),
    // Nombre del prototipo antes de entrar al contrato: se conserva por ahora.
    _mediciones() {
      return this.mediciones();
    },
  };
}

// Crea el Worker desde el código embebido. Si el navegador no lo permite, corre el mismo código en la página.
function crearTrabajador(alMensaje) {
  let destino = null;
  let hilo = 'worker';
  let listo = false;
  const antesDeListo = []; // si el Worker falla al cargar, estos mensajes se repiten en la página
  const recibir = (data) => {
    if (data && data.tipo === 'listo') {
      listo = true;
      antesDeListo.length = 0;
      return;
    }
    alMensaje(data);
  };
  function usarPagina() {
    hilo = 'pagina';
    destino = trabajadorEnPagina(recibir);
    antesDeListo.splice(0).forEach((m) => destino.postMessage(m));
  }
  try {
    if (!CODIGO_TRABAJADOR || typeof Worker !== 'function') throw new Error('sin Worker');
    const url = URL.createObjectURL(new Blob([CODIGO_TRABAJADOR], { type: 'text/javascript' }));
    const w = new Worker(url);
    w.onmessage = (e) => {
      if (e.data && e.data.tipo === 'listo') URL.revokeObjectURL(url);
      recibir(e.data);
    };
    w.onerror = (e) => {
      if (listo) return console.error('TecnoCircuito:', e.message);
      e.preventDefault();
      w.terminate();
      usarPagina();
    };
    destino = w;
  } catch {
    usarPagina();
  }
  return {
    enviar(m) {
      if (!listo && hilo === 'worker') antesDeListo.push(m);
      destino.postMessage(m);
    },
    terminar: () => destino && destino.terminate(),
    hilo: () => hilo,
  };
}

// El código del Worker corriendo en la página: un «self» falso que entrega los mensajes en tareas aparte.
function trabajadorEnPagina(recibir) {
  const falso = { onmessage: null, postMessage: (d) => setTimeout(() => recibir(d)) };
  new Function('self', CODIGO_TRABAJADOR)(falso); // eslint-disable-line no-new-func
  return {
    postMessage: (m) => setTimeout(() => falso.onmessage && falso.onmessage({ data: m })),
    terminate: () => (falso.onmessage = null),
  };
}
