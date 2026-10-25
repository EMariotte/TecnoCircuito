// Web Worker del simulador (prototipo 3): corre el núcleo (chip + circuito) en su propio hilo y lleva el reloj.
// La página solo dibuja. Así el chip puede usar un núcleo completo del procesador sin congelar la página
// ni competir con Blockly, y la velocidad no depende de cuánto tarde la página en dibujar.
//
// Mensajes que recibe: crear, iniciar, pausar, reiniciar, detener, circuito, serial, pulsador, mano.
// Mensajes que manda: listo, foto, detenido, error. Cada foto lleva el «turno» con el que se pidió, para que la
// página descarte la vista de las que llegan tarde (de antes de pausar, detener o reiniciar). «detenido» confirma
// que paró, después de una última foto, y dice si la corrida llegó entera (`integra`): la página cierra la corrida al
// recibirlo. Al reiniciar, antes del RESET sale una foto con el turno anterior. «error» lleva su turno y, si el
// núcleo falló y el reloj paró por eso, `parado: true` (AUD-26): la página cierra esa corrida sin compararla.
import { crearNucleo, FRECUENCIA } from './nucleo.js';

const RITMO_FOTO_MS = 16; // unas 60 fotos por segundo, como los cuadros de la pantalla
const TAJADA_MS = 8; // cálculo máximo seguido antes de atender mensajes (pausar, serial, recableado)
const ATRASO_MAX_MS = 50; // si el PC no alcanza, no intenta recuperar más que esto: la simulación va más lenta
const VENTANA_VELOCIDAD_MS = 500; // la velocidad que se informa es el promedio de este tiempo
const CICLOS_MS = FRECUENCIA / 1000;

let nucleo = null;
let corriendo = false;
let turno = 0;
let deuda = 0; // ciclos que el chip debe para alcanzar al reloj real
let ultimo = 0;
let ultimaFoto = 0;
let tiempoReal = 0; // ms de reloj corriendo, sin contar pausas
let programado = false;
let integra = true; // ninguna foto de esta corrida se perdió (AUD-16)
let paroPorError = false; // el núcleo falló en esta corrida: solo una corrida nueva vuelve a arrancar el reloj (AUD-26)
const historial = []; // [instante, ms reales, ciclos hechos]

// Seguir ya, sin la espera mínima de setTimeout: un mensaje a uno mismo.
const canal = new MessageChannel();
canal.port1.onmessage = seguir;
function seguir() {
  programado = false;
  ciclo();
}
function programar(esperaMs) {
  if (programado) return;
  programado = true;
  if (esperaMs > 0) setTimeout(seguir, esperaMs);
  else canal.port2.postMessage(null);
}

function velocidad(ahora) {
  while (historial.length && ahora - historial[0][0] > VENTANA_VELOCIDAD_MS) historial.shift();
  let real = 0;
  let hechos = 0;
  for (const [, r, h] of historial) {
    real += r;
    hechos += h;
  }
  return real > 0 ? Math.min(1, hechos / (real * CICLOS_MS)) : 1;
}

function enviarFoto(ahora = performance.now()) {
  ultimaFoto = ahora;
  try {
    const f = nucleo.foto();
    self.postMessage({ tipo: 'foto', turno, ...f, velocidad: velocidad(ahora), msReales: tiempoReal });
    return f;
  } catch (err) {
    // El núcleo entrega cada hecho (falla, serial) en una sola foto: si esa no sale, se pierde. No se manda en otra,
    // porque llevaría el turno y el tiempo de esa otra (otro tramo del reloj): la corrida queda incompleta hasta la
    // siguiente, y su «detenido» lo dice (AUD-16).
    integra = false;
    throw err;
  }
}
/**
 * Avisa a la página de un error, con el turno de la orden que se atendía: así la página no se lo atribuye a una corrida
 * que empezó después. `parado`: el núcleo falló y el reloj paró. Si el aviso tampoco sale, no hay a quién decirlo.
 */
function avisarError(err, parado = false) {
  try {
    self.postMessage({ tipo: 'error', turno, mensaje: String((err && err.message) || err), ...(parado ? { parado: true } : {}) });
  } catch (e) {
    // sin aviso: `integra` ya lo dice en el cierre
  }
}
/** Una foto que, si falla, se avisa y no detiene nada: la corrida solo queda incompleta (AUD-16). */
function fotoAvisando() {
  try {
    enviarFoto();
  } catch (err) {
    avisarError(err);
  }
}
/**
 * El núcleo falló (no la foto): su estado ya no es confiable. El reloj para a propósito y la corrida queda incompleta;
 * la página la cierra sin compararla. No se reintenta solo: si el error sigue, fallaría otra vez (W-R1, AUD-26).
 */
function pararPorError(err) {
  corriendo = false;
  integra = false;
  paroPorError = true;
  avisarError(err, true);
}

function ciclo() {
  if (!corriendo || !nucleo) return;
  const ahora = performance.now();
  try {
    const real = Math.max(0, ahora - ultimo);
    ultimo = ahora;
    tiempoReal += real;
    deuda = Math.min(deuda + real * CICLOS_MS, ATRASO_MAX_MS * CICLOS_MS);
    const inicio = performance.now();
    let hechos = 0;
    while (deuda >= 1 && performance.now() - inicio < TAJADA_MS) {
      const antes = nucleo.ciclos;
      nucleo.avanzar(Math.min(Math.floor(deuda), CICLOS_MS)); // de a 1 ms simulado
      const d = nucleo.ciclos - antes;
      deuda -= d;
      hechos += d;
    }
    historial.push([ahora, real, hechos]);
  } catch (err) {
    pararPorError(err);
    return;
  }
  // Una foto que falla no para el reloj: se avisa la primera de la corrida (unas 60 por segundo serían demasiadas) y
  // se sigue; el cierre dirá que la corrida no llegó entera (AUD-16)
  if (ahora - ultimaFoto >= RITMO_FOTO_MS) {
    const yaAvisado = !integra;
    try {
      enviarFoto(ahora);
    } catch (err) {
      if (!yaAvisado) avisarError(err);
    }
  }
  // Atrasado: sigue de inmediato. Al día: espera un momento (el reloj real tiene que avanzar).
  programar(deuda >= CICLOS_MS ? 0 : 2);
}

self.onmessage = (e) => {
  const m = e.data || {};
  try {
    // Lo que el núcleo tenía sin mandar al pulsar RESET (fallas, serial) es de antes del RESET: sale con el turno
    // anterior, para que quede en el tramo de su reloj y no en el nuevo (REG-005, TC-1). Si esa foto falla, se avisa y
    // el RESET sigue igual; la corrida queda incompleta (AUD-16).
    if (m.tipo === 'reiniciar' && nucleo) fotoAvisando();
    if ('turno' in m) turno = m.turno;
    switch (m.tipo) {
      case 'crear':
        nucleo = crearNucleo({ hex: m.hex, circuito: m.circuito, activas: m.activas, semilla: m.semilla });
        break;
      case 'iniciar':
        if (m.nuevo) {
          paroPorError = false;
          nucleo.reiniciarTodo();
          tiempoReal = 0;
          integra = true; // una corrida nueva empieza entera
        } else if (paroPorError) break; // seguir no rearranca un núcleo que falló (el RESET pide seguir enseguida)
        corriendo = true;
        deuda = 0;
        ultimo = performance.now();
        historial.length = 0;
        fotoAvisando(); // si la primera foto falla, el reloj arranca igual (AUD-16)
        programar(0);
        break;
      case 'pausar':
        corriendo = false;
        break;
      case 'reiniciar':
        nucleo.reiniciarChip();
        deuda = 0;
        fotoAvisando();
        break;
      case 'detener': {
        // Una última foto con lo que el núcleo tenía sin mandar (fallas, serial) y la confirmación: la página cierra
        // la corrida al recibirla, con todo lo de antes (AUD-03-V1). La confirmación sale aunque la foto falle; sin
        // msSimulados, la página sabe que lo pendiente no llegó (REG-005, TC-6). `integra` dice si se perdió alguna
        // foto antes, durante la corrida (AUD-16).
        corriendo = false;
        let f = null;
        try {
          if (nucleo) f = enviarFoto();
        } finally {
          self.postMessage({ tipo: 'detenido', turno, msSimulados: f ? f.msSimulados : undefined, integra });
        }
        break;
      }
      case 'circuito':
        nucleo.ponerCircuito(m.circuito);
        if (m.mostrar) fotoAvisando(); // en pausa también: el aprendiz ve el cambio sin que avance el tiempo
        break;
      case 'serial':
        nucleo.enviarSerial(m.texto);
        break;
      case 'pulsador':
        nucleo.ponerPulsador(m.id, m.presionado);
        if (!corriendo) fotoAvisando(); // en pausa también se ve el cambio
        break;
      case 'mano':
        nucleo.ponerMano(m.refs);
        break;
    }
  } catch (err) {
    // El núcleo falló al atender la orden (crear, iniciar, reiniciar, recablear…), o la última foto al detener: la
    // corrida queda incompleta y, si corría, el reloj para (AUD-26)
    pararPorError(err);
  }
};

self.postMessage({ tipo: 'listo' });
