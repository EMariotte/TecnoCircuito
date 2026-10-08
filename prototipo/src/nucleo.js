// Núcleo de la simulación (prototipo 3): el chip, el circuito eléctrico y el promedio del PWM.
// No toca la página ni lleva el reloj: corre igual en el Web Worker, en la página (si no hay Worker) y en Node.
//
// Promedio del PWM: el chip avisa cada cambio de pin con su ciclo exacto. El núcleo suma cuánto tiempo pasó
// en cada combinación de pines y, en cada «foto» (unas 60 por segundo), promedia las soluciones del circuito
// de esas combinaciones según su tiempo. Cada combinación se resuelve una sola vez y se guarda: con PWM en un
// pin hay solo dos (ALTO y BAJO), así que el circuito no se resuelve miles de veces por segundo.
// Lo que se ve y lo que mide un multímetro es el promedio; las fallas (LED quemado, pin) se revisan con el
// valor de cada combinación, porque el pico de corriente es el que daña.
import { crearChip, FRECUENCIA, PinState } from './chip.js';
import { armarRed, revisarFallas, LED } from './motor/red.js';

export { FRECUENCIA, PinState };

const DESTELLO_TX_MS = 60; // cuánto queda prendido el LED TX de la placa después de enviar
const ANALOGICOS = [['A0'], ['A1'], ['A2'], ['A3'], ['A4', 'SDA'], ['A5', 'SCL']];
// Entradas digitales que se leen del circuito (D0 y D1 son del monitor serial).
const ENTRADAS = ['D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
// Umbrales del ATmega328P a 5 V: ALTO desde 0,6·VCC y BAJO hasta 0,3·VCC. En medio la lectura no es segura:
// se conserva la anterior (como hace en la práctica la histéresis de la entrada).
const UMBRAL_ALTO = 3.0;
const UMBRAL_BAJO = 1.5;
// Entrada flotante (no idealidad «entradaFlotante»): cada milisegundo puede cambiar con esta probabilidad.
// En promedio cambia cada 120 ms, sin orden: el LED se prende y se apaga solo, a la vista. Más rápido, el LED
// se ve siempre a medias (el ojo promedia). Valor de partida: se ajusta con validar_flotante.ino en la placa.
const CAMBIO_AL_AIRE_POR_MS = 1 / 120;
// Ruido de analogRead() (no idealidad «ruidoADC»): desviación de unos 0,6 pasos del ADC (5 V / 1024).
// Valor de partida: se ajusta con validar_adc.ino en la placa real.
const RUIDO_ADC_V = (0.6 * 5) / 1024;
const PASEO_AL_AIRE_V = 0.15; // cuánto deambula, por lectura, una entrada analógica al aire

export function crearNucleo({ hex, circuito, activas = {}, semilla = Math.floor(Math.random() * 2 ** 32) }) {
  const azar = crearAzar(semilla); // con semilla: las pruebas se pueden repetir
  const presionados = new Set(); // botones presionados ahora
  let alAire = new Set(); // entradas digitales sin nada que las maneje
  let canalesAlAire = new Set(); // canales analógicos (0 a 5) al aire
  let refsAlAire = new Set();
  const nivelAlAire = {}; // pin → nivel que va tomando al azar
  const paseo = new Map(); // canal → voltaje al azar de una entrada analógica al aire
  const nivelAnterior = {}; // pin → último nivel leído (para la zona entre umbrales)
  let chip = null;
  let circuitoActual = circuito;
  let red = null;
  let soluciones = new Map(); // solución guardada por combinación de pines
  const estadosDe = new Map(); // combinación → estado de cada pin
  let tiempos = new Map(); // combinación → ciclos que pasó el chip en ella, en la ventana actual
  let ultimasPartes = []; // las de la ventana anterior, por si una foto llega sin tiempo (en pausa)
  let claveActual = '';
  let desde = 0; // ciclo desde el que se cuenta la combinación actual
  // La ventana empieza en una combinación de pines y se corta la última vez que el chip volvió a ella: con PWM
  // eso son períodos completos, así el promedio no depende de dónde cae la foto. Lo que sigue pasa a la próxima.
  let ventana = { inicio: 0, clave: '' };
  let corte = null; // { tiempos, ciclo }: cómo iba la ventana la última vez que volvió a su combinación
  let medicion = null;
  let evaluaciones = 0;
  let txHasta = 0;
  let serial = []; // bytes que mandó el programa desde la última foto
  // UTF-8 con memoria entre fotos: una «í» son dos bytes y pueden caer en fotos distintas.
  let decodificador = new TextDecoder('utf-8');
  const quemados = new Set();
  const yaAvisadas = new Set();
  const fallas = [];
  let nuevas = [];

  const ms = () => (chip.ciclos / FRECUENCIA) * 1000;
  const clave = (e) => {
    let k = '';
    for (const n in e) k += e[n];
    return k;
  };

  function nuevoChip() {
    chip = crearChip(hex);
    const e = chip.estados();
    claveActual = clave(e);
    estadosDe.set(claveActual, e);
    desde = 0;
    tiempos = new Map();
    ultimasPartes = [];
    ventana = { inicio: 0, clave: claveActual };
    corte = null;
    chip.alCambiarPines((cambios, ahora) => {
      acumular();
      claveActual = clave(ahora);
      if (!estadosDe.has(claveActual)) estadosDe.set(claveActual, ahora);
      if (claveActual === ventana.clave) corte = { tiempos: new Map(tiempos), ciclo: chip.ciclos };
      actualizarEntradas(); // un pin que pasa a entrada (o que maneja otra entrada) cambia lo que se lee
    });
    chip.alCadaMs(ruidoAlAire);
    chip.ponerLectorAnalogico(leerAnalogico);
    chip.alByteSerial((byte) => {
      serial.push(byte);
      txHasta = ms() + DESTELLO_TX_MS;
    });
  }

  function acumular() {
    const c = chip.ciclos;
    tiempos.set(claveActual, (tiempos.get(claveActual) || 0) + (c - desde));
    desde = c;
  }

  function rehacerRed() {
    red = armarRed(circuitoActual, { quemados, presionados });
    soluciones = new Map();
  }

  // ---- Entradas: lo que el circuito le deja leer al programa (digitalRead y analogRead)

  // Resuelve el circuito con los pines de ahora y escribe en el chip el nivel de cada entrada digital.
  function actualizarEntradas() {
    if (!red || !chip) return;
    const e = estadosDe.get(claveActual) || chip.estados();
    const m = solucion(claveActual);
    const flotan = red.flotantes(e);
    alAire = new Set();
    for (const pin of ENTRADAS) {
      const estado = e[pin];
      if (estado !== PinState.Input && estado !== PinState.InputPullUp) continue;
      if (flotan.has(pin)) {
        alAire.add(pin);
        if (!(pin in nivelAlAire)) nivelAlAire[pin] = azar() < 0.5;
        chip.ponerEntrada(pin, activas.entradaFlotante ? nivelAlAire[pin] : false); // ideal: lee BAJO
        continue;
      }
      const v = m ? m.voltajes['placa.' + pin] : null;
      let nivel;
      if (typeof v === 'number') nivel = v >= UMBRAL_ALTO ? true : v <= UMBRAL_BAJO ? false : !!nivelAnterior[pin];
      else nivel = estado === PinState.InputPullUp; // sin nada conectado: la pull-up interna lo deja en ALTO
      nivelAnterior[pin] = nivel;
      chip.ponerEntrada(pin, nivel);
    }
    canalesAlAire = new Set();
    ANALOGICOS.forEach((refs, canal) => {
      if (flotan.has(refs[0])) canalesAlAire.add(canal);
    });
    // El voltaje analógico está desde que se enciende la placa: no hay que esperar a la primera foto.
    if (m) ponerAnalogicos(m);
    refsAlAire = red.refsAlAire(e);
  }

  // Cada milisegundo simulado, las entradas al aire pueden cambiar (solo en modo realista).
  function ruidoAlAire() {
    if (!activas.entradaFlotante || !alAire.size) return;
    for (const pin of alAire) {
      if (azar() < CAMBIO_AL_AIRE_POR_MS) {
        nivelAlAire[pin] = !nivelAlAire[pin];
        chip.ponerEntrada(pin, nivelAlAire[pin]);
      }
    }
  }

  // Cada analogRead(): el voltaje del circuito con el ruido del ADC, o un valor que deambula si está al aire.
  function leerAnalogico(canal, voltios) {
    if (canalesAlAire.has(canal)) {
      if (!activas.entradaFlotante) return 0;
      const antes = paseo.has(canal) ? paseo.get(canal) : 1 + 3 * azar();
      const v = Math.max(0, Math.min(5, antes + normal() * PASEO_AL_AIRE_V));
      paseo.set(canal, v);
      return v;
    }
    return activas.ruidoADC ? voltios + normal() * RUIDO_ADC_V : voltios;
  }

  // Número al azar con distribución normal (media 0, desviación 1), por el método de Box-Muller.
  function normal() {
    return Math.sqrt(-2 * Math.log(1 - azar())) * Math.cos(2 * Math.PI * azar());
  }

  // Avisa una falla una sola vez por corrida. Devuelve true si es nueva.
  function avisar(f) {
    const k = f.tipo + '|' + f.componente;
    if (yaAvisadas.has(k)) return false;
    yaAvisadas.add(k);
    fallas.push(f);
    nuevas.push(f);
    return true;
  }

  // La solución de una combinación de pines, con sus fallas revisadas. Si se quema un LED, queda abierto
  // y se resuelve otra vez, porque sin ese LED las corrientes cambian.
  function solucion(k) {
    for (let vuelta = 0; vuelta < 4; vuelta++) {
      const guardada = soluciones.get(k);
      if (guardada) return guardada;
      red.ponerPines(estadosDe.get(k));
      let m = null;
      try {
        m = red.resolver();
      } catch {
        m = null;
      }
      evaluaciones++;
      if (!m || !m.convergio) {
        avisar({ tipo: 'sin_solucion', componente: 'circuito', mensaje: 'El simulador no pudo calcular este circuito. Revisa si hay un corto.' });
        return null;
      }
      soluciones.set(k, m);
      let seQuemo = false;
      for (const f of [...red.fallasFijas, ...revisarFallas(m, activas)]) {
        if (avisar(f) && f.tipo === 'led_quemado') {
          quemados.add(f.componente);
          seQuemo = true;
        }
      }
      if (!seQuemo) return m;
      rehacerRed();
    }
    return soluciones.get(k) || null;
  }

  // Cierra la ventana de tiempo: promedia el circuito, actualiza las entradas analógicas y entrega lo que se ve.
  function foto() {
    acumular();
    let usar = tiempos;
    if (corte && corte.ciclo > ventana.inicio) {
      // Se usa la ventana hasta el corte; lo que pasó después queda para la próxima foto.
      usar = corte.tiempos;
      const resto = new Map();
      for (const [k, t] of tiempos) {
        const d = t - (corte.tiempos.get(k) || 0);
        if (d > 0) resto.set(k, d);
      }
      tiempos = resto;
      ventana = { inicio: corte.ciclo, clave: ventana.clave };
    } else {
      tiempos = new Map();
      ventana = { inicio: chip.ciclos, clave: claveActual };
    }
    corte = null;
    let partes = [...usar].filter(([, t]) => t > 0);
    if (!partes.length) partes = ultimasPartes.length ? ultimasPartes : [[claveActual, 1]];
    ultimasPartes = partes;
    const total = partes.reduce((s, [, t]) => s + t, 0);
    const sols = [];
    for (const [k, t] of partes) {
      const m = solucion(k);
      if (!m) {
        sols.length = 0;
        break;
      }
      sols.push([m, t / total]);
    }
    medicion = sols.length ? promediar(sols) : null;
    if (medicion) medicion.pwm = ciclosUtiles(partes, total);
    ponerAnalogicos();
    const pines = chip.estados();
    const texto = serial.length ? decodificador.decode(Uint8Array.from(serial), { stream: true }) : '';
    serial = [];
    const fallasNuevas = nuevas;
    nuevas = [];
    return {
      msSimulados: ms(),
      evaluaciones,
      leds: Object.fromEntries((medicion ? medicion.leds : []).map((l) => [l.id, l.brillo])),
      quemados: [...quemados],
      voltajes: voltajesConAire(),
      entradas: entradasParaVer(),
      placa: { led13: pines.D13 === PinState.High, ledTX: ms() < txHasta },
      serial: texto,
      fallas: fallasNuevas,
      medicion,
    };
  }

  // Lo que está al aire no tiene un voltaje que un multímetro pueda medir: se muestra como «al aire» (null).
  function voltajesConAire() {
    if (!medicion) return {};
    if (!refsAlAire.size) return medicion.voltajes;
    const v = { ...medicion.voltajes };
    for (const ref of refsAlAire) if (ref in v) v[ref] = null;
    return v;
  }

  // Cómo lee el programa cada entrada digital en este momento (para la tabla y las pruebas).
  function entradasParaVer() {
    const r = {};
    for (const pin of ENTRADAS) {
      if (alAire.has(pin)) r[pin] = { alto: !!activas.entradaFlotante && !!nivelAlAire[pin], alAire: true };
      else if (pin in nivelAnterior) r[pin] = { alto: nivelAnterior[pin], alAire: false };
    }
    return r;
  }

  // analogRead() lee el voltaje promedio que el circuito deja en cada entrada analógica.
  function ponerAnalogicos(m = medicion) {
    if (!m) return;
    ANALOGICOS.forEach((refs, canal) => {
      for (const r of refs) {
        const v = m.voltajes['placa.' + r];
        if (typeof v === 'number') return chip.ponerAnalogico(canal, v);
      }
    });
  }

  function reiniciarTodo() {
    quemados.clear();
    yaAvisadas.clear();
    fallas.length = 0;
    nuevas = [];
    serial = [];
    decodificador = new TextDecoder('utf-8');
    txHasta = 0;
    nuevoChip();
    rehacerRed();
    actualizarEntradas();
  }

  nuevoChip();
  rehacerRed();
  actualizarEntradas();

  return {
    get ciclos() {
      return chip.ciclos;
    },
    avanzar: (ciclos) => chip.correr(ciclos),
    foto,
    ponerCircuito(c) {
      circuitoActual = c;
      rehacerRed();
      actualizarEntradas();
    },
    // Un botón se presiona o se suelta (con el mouse, mientras corre la simulación).
    ponerPulsador(id, presionado) {
      if (presionado) presionados.add(id);
      else presionados.delete(id);
      rehacerRed();
      actualizarEntradas();
    },
    enviarSerial: (texto) => chip.enviarSerial(String(texto)),
    reiniciarChip() {
      nuevoChip(); // como el botón RESET: el programa empieza de nuevo y lo quemado sigue quemado
      actualizarEntradas();
    },
    reiniciarTodo, // otra corrida: piezas nuevas y fallas sin avisar
    fallas: () => [...fallas],
  };
}

// Fracción del tiempo en ALTO de cada pin que cambió dentro de la ventana (el «ciclo útil» del PWM).
function ciclosUtiles(partes, total) {
  if (partes.length < 2) return {};
  const altos = {};
  const vistos = new Set();
  for (const [k, t] of partes) {
    for (let i = 0; i < k.length; i++) {
      const alto = +k[i] === PinState.High;
      altos[i] = (altos[i] || 0) + (alto ? t : 0);
      vistos.add(i);
    }
  }
  const nombres = PINES_EN_ORDEN;
  const r = {};
  for (const i of vistos) {
    const f = altos[i] / total;
    if (f > 0 && f < 1) r[nombres[i]] = Math.round(f * 1000) / 1000;
  }
  return r;
}
// El mismo orden en que chip.estados() entrega los pines (puerto D, B y C).
const PINES_EN_ORDEN = ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'];

// Promedio, pesado por tiempo, de las soluciones de cada combinación de pines.
function promediar(sols) {
  if (sols.length === 1) return sols[0][0];
  const base = sols[0][0];
  const pesoDe = (lista) => lista.reduce((s, [, w]) => s + w, 0);
  // Promedia un número que puede faltar (null = «al aire»): si falta en alguna combinación, queda null.
  const prom = (sacar) => {
    let s = 0;
    for (const [m, w] of sols) {
      const v = sacar(m);
      if (v === null || v === undefined) return null;
      s += w * v;
    }
    return s;
  };
  // Para listas cuyos elementos pueden no estar en todas las combinaciones (un pin que pasa a ser entrada).
  const porNombre = (lista, llave, campos) => {
    const nombres = [...new Set(sols.flatMap(([m]) => m[lista].map((x) => x[llave])))];
    return nombres.map((n) => {
      const r = { [llave]: n };
      const con = sols.filter(([m]) => m[lista].some((x) => x[llave] === n));
      const peso = pesoDe(con);
      for (const c of campos) {
        if (c === 'i') r.i = sols.reduce((s, [m, w]) => s + w * ((m[lista].find((x) => x[llave] === n) || { i: 0 }).i || 0), 0);
        else r[c] = peso ? con.reduce((s, [m, w]) => s + w * (m[lista].find((x) => x[llave] === n)[c] || 0), 0) / peso : null;
      }
      return r;
    });
  };
  const voltajes = {};
  for (const ref of Object.keys(base.voltajes)) voltajes[ref] = prom((m) => m.voltajes[ref]);
  return {
    convergio: sols.every(([m]) => m.convergio),
    iteraciones: Math.max(...sols.map(([m]) => m.iteraciones || 0)),
    voltajes,
    leds: base.leds.map((l, n) => {
      const i = prom((m) => (m.leds[n] ? m.leds[n].i : 0));
      return {
        id: l.id,
        quemado: sols.some(([m]) => m.leds[n] && m.leds[n].quemado),
        v: prom((m) => (m.leds[n] ? m.leds[n].v : null)),
        i,
        brillo: Math.max(0, Math.min(1, (i * 1000) / LED.plenomA)),
      };
    }),
    resistencias: base.resistencias.map((x, n) => ({
      id: x.id,
      ohmios: x.ohmios,
      v: prom((m) => m.resistencias[n].v),
      i: prom((m) => m.resistencias[n].i),
      w: prom((m) => m.resistencias[n].w), // potencia promedio: lo que calienta de verdad
    })),
    pines: porNombre('pines', 'pin', ['v', 'i']),
    fuentes: porNombre('fuentes', 'pin', ['i']),
    potenciometros: (base.potenciometros || []).map((x, n) => ({
      id: x.id,
      ohmios: x.ohmios,
      posicion: x.posicion,
      v: prom((m) => m.potenciometros[n].v),
      i: prom((m) => m.potenciometros[n].i),
    })),
  };
}

// Generador de números al azar con semilla (mulberry32): la misma semilla da la misma secuencia.
function crearAzar(semilla) {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
