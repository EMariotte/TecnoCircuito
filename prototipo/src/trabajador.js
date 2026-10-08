// Web Worker del simulador (prototipo 3): corre el núcleo (chip + circuito) en su propio hilo y lleva el reloj.
// La página solo dibuja. Así el chip puede usar un núcleo completo del procesador sin congelar la página
// ni competir con Blockly, y la velocidad no depende de cuánto tarde la página en dibujar.
//
// Mensajes que recibe: crear, iniciar, pausar, reiniciar, detener, circuito, serial, pulsador.
// Mensajes que manda: listo, foto, error. Cada foto lleva la «corrida» con la que se pidió, para que la página
// descarte las que llegan tarde (de antes de pausar, detener o reiniciar).
import { crearNucleo, FRECUENCIA } from './nucleo.js';

const RITMO_FOTO_MS = 16; // unas 60 fotos por segundo, como los cuadros de la pantalla
const TAJADA_MS = 8; // cálculo máximo seguido antes de atender mensajes (pausar, serial, recableado)
const ATRASO_MAX_MS = 50; // si el PC no alcanza, no intenta recuperar más que esto: la simulación va más lenta
const VENTANA_VELOCIDAD_MS = 500; // la velocidad que se informa es el promedio de este tiempo
const CICLOS_MS = FRECUENCIA / 1000;

let nucleo = null;
let corriendo = false;
let corrida = 0;
let deuda = 0; // ciclos que el chip debe para alcanzar al reloj real
let ultimo = 0;
let ultimaFoto = 0;
let tiempoReal = 0; // ms de reloj corriendo, sin contar pausas
let programado = false;
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
  const f = nucleo.foto();
  self.postMessage({ tipo: 'foto', corrida, ...f, velocidad: velocidad(ahora), msReales: tiempoReal });
}

function ciclo() {
  if (!corriendo || !nucleo) return;
  const ahora = performance.now();
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
  if (ahora - ultimaFoto >= RITMO_FOTO_MS) enviarFoto(ahora);
  // Atrasado: sigue de inmediato. Al día: espera un momento (el reloj real tiene que avanzar).
  programar(deuda >= CICLOS_MS ? 0 : 2);
}

self.onmessage = (e) => {
  const m = e.data || {};
  try {
    if ('corrida' in m) corrida = m.corrida;
    switch (m.tipo) {
      case 'crear':
        nucleo = crearNucleo({ hex: m.hex, circuito: m.circuito, activas: m.activas });
        break;
      case 'iniciar':
        if (m.nuevo) {
          nucleo.reiniciarTodo();
          tiempoReal = 0;
        }
        corriendo = true;
        deuda = 0;
        ultimo = performance.now();
        historial.length = 0;
        enviarFoto();
        programar(0);
        break;
      case 'pausar':
        corriendo = false;
        break;
      case 'reiniciar':
        nucleo.reiniciarChip();
        deuda = 0;
        enviarFoto();
        break;
      case 'detener':
        corriendo = false;
        break;
      case 'circuito':
        nucleo.ponerCircuito(m.circuito);
        if (m.mostrar) enviarFoto(); // en pausa también: el aprendiz ve el cambio sin que avance el tiempo
        break;
      case 'serial':
        nucleo.enviarSerial(m.texto);
        break;
      case 'pulsador':
        nucleo.ponerPulsador(m.id, m.presionado);
        if (!corriendo) enviarFoto(); // en pausa también se ve el cambio
        break;
    }
  } catch (err) {
    self.postMessage({ tipo: 'error', mensaje: String((err && err.message) || err) });
  }
};

self.postMessage({ tipo: 'listo' });
