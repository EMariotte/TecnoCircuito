// Simulador (prototipos 1 a 3), con la API de crearSimulador del contrato 1.
// Desde el prototipo 3, el chip y el circuito corren en un Web Worker (trabajador.js, con el núcleo de nucleo.js).
// Esta parte vive en la página: manda órdenes al Worker, recibe «fotos» de lo que pasa y las dibuja en el lienzo
// una vez por cuadro de pantalla. Si el navegador no deja crear el Worker, el mismo código corre en la página.
import { leerHex } from './hex.js';

const CLAVES_NO_IDEALIDADES = ['danoComponentes', 'limitePin', 'entradaFlotante', 'ruidoADC', 'limiteUSB'];
// El código del Worker, ya armado: lo pone construir.js. Va como texto para que todo quepa en un solo archivo.
const CODIGO_TRABAJADOR = typeof __CODIGO_TRABAJADOR__ === 'string' ? __CODIGO_TRABAJADOR__ : '';

export function crearSimulador(opciones = {}) {
  const { lienzo, hex } = opciones;
  const placa = opciones.placa || 'uno';
  if (placa !== 'uno') throw new Error(`Este prototipo solo simula la placa «uno».`);
  if (!lienzo || typeof lienzo._mostrar !== 'function') throw new Error('crearSimulador necesita un lienzo de TecnoCircuito.');
  if (typeof hex !== 'string') throw new Error('crearSimulador necesita el programa en formato Intel HEX.');
  leerHex(hex); // se revisa aquí, de una vez: si el .hex está dañado, el error sale al crear el simulador
  const modo = opciones.modo === 'ideal' ? 'ideal' : 'realista';
  // El modo enciende o apaga todas las no idealidades; noIdealidades ajusta una por una encima del modo.
  const activas = Object.fromEntries(CLAVES_NO_IDEALIDADES.map((k) => [k, modo === 'realista']));
  Object.assign(activas, opciones.noIdealidades || {});
  const alEvento = typeof opciones.alEvento === 'function' ? opciones.alEvento : null;
  const oyentes = { serial: [], falla: [], estado: [] };

  let estado = 'detenido';
  let vivo = true;
  let corrida = 0; // sube con cada cambio de estado: las fotos de antes se descartan
  let vista = null; // la última foto, para dibujarla en el próximo cuadro
  let cuadro = 0;
  const medidas = { msSimulados: 0, msReales: 0, velocidad: 1, evaluaciones: 0 };
  let medicion = null;
  let reiniciosVistos = 0; // reinicios por energía ya avisados en esta corrida
  const fallas = [];

  const trabajador = crearTrabajador(recibir);
  trabajador.enviar({ tipo: 'crear', hex, circuito: lienzo.circuito(), activas });

  function recibir(m) {
    if (!vivo) return;
    if (m.tipo === 'error') return console.error('TecnoCircuito:', m.mensaje);
    if (m.tipo !== 'foto' || m.corrida !== corrida || estado === 'detenido') return;
    Object.assign(medidas, { msSimulados: m.msSimulados, msReales: m.msReales, velocidad: m.velocidad, evaluaciones: m.evaluaciones });
    // La tabla usa los voltajes de la foto (con «al aire») y cómo lee el programa cada entrada.
    medicion = m.medicion ? { ...m.medicion, voltajes: m.voltajes, entradas: m.entradas } : null;
    for (const f of m.fallas) {
      fallas.push(f);
      oyentes.falla.forEach((fn) => avisar(fn, { tipo: f.tipo, componente: f.componente, mensaje: f.mensaje }));
      const { mensaje, ...datos } = f;
      emitir('falla', datos);
    }
    // Reinicios por la energía del USB (no idealidad «limiteUSB»): uno por foto, con cuántos hubo desde la anterior.
    const reinicios = m.energia ? m.energia.reinicios : 0;
    if (reinicios > reiniciosVistos) emitir('reinicio_placa', { motivo: 'energia_usb', nuevos: reinicios - reiniciosVistos, total: reinicios });
    reiniciosVistos = reinicios;
    if (m.serial) oyentes.serial.forEach((fn) => avisar(fn, m.serial));
    vista = m;
    if (!cuadro) cuadro = requestAnimationFrame(dibujar);
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
      placa: { ledPower: vista.placa.encendida !== false, led13: vista.placa.led13, ledTX: vista.placa.ledTX },
    });
  }

  function avisar(fn, valor) {
    try {
      fn(valor);
    } catch (err) {
      console.error(err); // un error de quien escucha no debe detener la simulación
    }
  }

  function emitir(tipo, datos) {
    if (alEvento) avisar(alEvento, { t: Date.now(), origen: 'simulador', tipo, datos });
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
    trabajador.enviar({ tipo: 'circuito', circuito: nuevo, mostrar: estado !== 'detenido', corrida });
  });

  return {
    iniciar() {
      if (!vivo || estado === 'corriendo') return;
      const nuevo = estado === 'detenido';
      corrida++;
      if (nuevo) {
        // Cada corrida empieza con piezas nuevas: sin LED quemados y sin fallas avisadas.
        fallas.length = 0;
        medicion = null;
        vista = null;
        reiniciosVistos = 0;
        Object.assign(medidas, { msSimulados: 0, msReales: 0, velocidad: 1 });
        emitir('simulacion_iniciada', { placa, modo });
      }
      cambiarEstado('corriendo');
      trabajador.enviar({ tipo: 'iniciar', nuevo, corrida });
    },
    pausar() {
      if (estado !== 'corriendo') return;
      corrida++;
      trabajador.enviar({ tipo: 'pausar', corrida });
      cambiarEstado('pausado');
    },
    reiniciar() {
      if (!vivo || estado === 'detenido') return;
      corrida++;
      medidas.msSimulados = 0; // el chip vuelve a cero ya; la foto del Worker llega un instante después
      // Como apretar el botón RESET: el programa empieza desde setup().
      trabajador.enviar({ tipo: 'reiniciar', corrida });
      trabajador.enviar({ tipo: 'iniciar', nuevo: false, corrida });
      reiniciosVistos = 0;
      emitir('reinicio_placa', { motivo: 'boton' });
      cambiarEstado('reiniciado');
      cambiarEstado('corriendo');
    },
    detener() {
      if (estado === 'detenido') return;
      corrida++;
      trabajador.enviar({ tipo: 'detener', corrida });
      emitir('simulacion_detenida', { ms_simulados: Math.round(medidas.msSimulados) });
      cambiarEstado('detenido');
      medicion = null;
      dibujar();
    },
    serialEnviar(texto) {
      if (estado !== 'detenido') trabajador.enviar({ tipo: 'serial', texto: String(texto) });
    },
    alSerial: (fn) => typeof fn === 'function' && oyentes.serial.push(fn),
    alFalla: (fn) => typeof fn === 'function' && oyentes.falla.push(fn),
    alEstado: (fn) => typeof fn === 'function' && oyentes.estado.push(fn),
    // Contrato 1: lo que necesita la línea de estado. velocidad va de 0 a 1 (1 = al ritmo del chip real).
    medidas: () => ({ ...medidas, estado, hilo: trabajador.hilo() }),
    // Contrato 1: detiene la simulación, libera el Worker y suelta el lienzo. Después ya no se puede usar.
    destruir() {
      if (!vivo) return;
      this.detener();
      vivo = false;
      cancelAnimationFrame(cuadro);
      trabajador.terminar();
    },
    // Nombres del prototipo que TecnoBloques usó antes de que entraran al contrato: se conservan por ahora.
    _medidas() {
      return this.medidas();
    },
    _destruir() {
      this.destruir();
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
