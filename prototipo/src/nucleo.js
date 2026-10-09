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
import { calcularNodos } from './conexiones.js';
import { crearServo, MODELOS_SERVO } from './piezas/servo.js';
import { USB, crearFusible, voltajeConServos } from './energia.js';

export { FRECUENCIA, PinState };
export { USB, crearFusible } from './energia.js';

const DESTELLO_TX_MS = 60; // cuánto queda prendido el LED TX de la placa después de enviar
const ANALOGICOS = [['A0'], ['A1'], ['A2'], ['A3'], ['A4', 'SDA'], ['A5', 'SCL']];
// Entradas digitales que se leen del circuito (D0 y D1 son del monitor serial).
const ENTRADAS = ['D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
// Umbrales del ATmega328P a 5 V: ALTO desde 0,6·VCC y BAJO hasta 0,3·VCC. En medio la lectura no es segura:
// se conserva la anterior (como hace en la práctica la histéresis de la entrada).
const UMBRAL_ALTO = 3.0;
const UMBRAL_BAJO = 1.5;
// Entrada flotante (no idealidad «entradaFlotante»), medida con validar_flotante.ino en un Uno del kit
// (9 oct 2026, validacion/2026-10-09-entrada-flotante.md):
//   - sin nada cerca, la entrada se queda en su nivel: cambia muy de vez en cuando (aquí, en promedio cada 10 s);
//   - con la mano cerca, capta la red eléctrica: sigue una onda de 60 Hz (Colombia), unos 120 cambios por segundo
//     y ~35 % del tiempo en ALTO. En el simulador, la mano es el mouse: sobre el cable o el pin al aire.
const CAMBIO_AL_AIRE_POR_MS = 1 / 10000;
const RED_HZ = 60;
// ALTO cuando sin(2π·60·t) pasa este valor: así queda ~35 % del tiempo en ALTO (acos(0,454) / π = 0,35).
const ZUMBIDO_UMBRAL = Math.cos(0.35 * Math.PI);
// Ruido de analogRead() (no idealidad «ruidoADC»): desviación de 0,1 pasos del ADC (5 V / 1024).
// Medido con validar_adc.ino en un Uno del kit (9 oct 2026, validacion/2026-10-09-ruido-adc.md): con la perilla
// quieta la lectura no se mueve, salvo cuando el voltaje cae justo en el borde entre dos valores (ahí alterna).
const RUIDO_ADC_V = (0.1 * 5) / 1024;
const PASEO_AL_AIRE_V = 0.15; // cuánto deambula, por lectura, una entrada analógica al aire
// Lo que se ve y se mide de una señal que cambia se promedia en el tiempo, como lo hacen el ojo y el multímetro:
// promedio móvil con esta constante de tiempo. Hace falta cuando la señal es más lenta que una foto (≈16 ms): el pulso
// de un servo (50 Hz) o la red que capta la mano (60 Hz). Una señal quieta se muestra exacta, sin esperar.
const PROMEDIO_VISTA_MS = 100;
const QUIETA_MS = 50; // sin cambios de pin en este tiempo, la señal se considera quieta

export function crearNucleo({ hex, circuito, activas = {}, semilla = Math.floor(Math.random() * 2 ** 32) }) {
  const azar = crearAzar(semilla); // con semilla: las pruebas se pueden repetir
  const presionados = new Set(); // botones presionados ahora
  let manoRefs = []; // pines o cables que tiene el mouse encima: «la mano» del aprendiz
  let mano = { raiz: null, grupos: new Set() }; // grupos (por conducción) que toca la mano
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
  let ultimoCambio = -Infinity; // ciclo del último cambio de pin (para saber si la señal está quieta)
  let evaluaciones = 0;
  let txHasta = 0;
  let serial = []; // bytes que mandó el programa desde la última foto
  // UTF-8 con memoria entre fotos: una «í» son dos bytes y pueden caer en fotos distintas.
  let decodificador = new TextDecoder('utf-8');
  const quemados = new Set();
  const yaAvisadas = new Set();
  const fallas = [];
  let nuevas = [];
  // Servos (tarea T3): id → { modelo, senal, fuente, conectado, logico, subida, sumaA, picoA, msVentana }
  let servos = new Map();
  // Energía del USB (no idealidad «limiteUSB», src/energia.js). Un reinicio por energía crea un chip nuevo, pero el
  // tiempo sigue: `base` guarda los ciclos de los chips anteriores, así el reloj del Worker nunca retrocede.
  let base = 0;
  const fusible = crearFusible();
  let apagada = false; // el fusible se abrió: la placa no tiene energía hasta que se enfríe
  let corteUSB = null; // { motivo: 'puerto' | 'fusible', amperios }: pasó en este milisegundo; se atiende al terminar
  let iCircuito = 0; // lo que el circuito le pide al 5V y al 3,3V (de la última foto)
  let v5 = USB.idealV;
  let reinicios = 0;
  let usbSuma = 0;
  let usbPico = 0;
  let usbMs = 0;
  let picos = []; // [ms, pico] de las últimas fotos: la tabla muestra el pico del último segundo

  const ms = () => ((base + chip.ciclos) / FRECUENCIA) * 1000;
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
      ultimoCambio = chip.ciclos;
      actualizarEntradas(); // un pin que pasa a entrada (o que maneja otra entrada) cambia lo que se lee
      if (servos.size) medirPulsos(cambios);
    });
    chip.alCadaMs(ruidoAlAire);
    chip.alCadaMs(avanzarServos);
    for (const s of servos.values()) s.subida = null; // un chip nuevo empieza sin pulsos a medias
    ultimoCambio = -Infinity;
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
    armarServos();
    calcularMano();
  }

  // La mano toca todo lo que está unido a lo que tiene el mouse encima: por cables, la protoboard, resistencias o
  // potenciómetros (como el dedo sobre un cable capta la red en todo lo que conduce con él).
  function calcularMano() {
    if (!manoRefs.length) {
      mano = { raiz: null, grupos: new Set() };
      return;
    }
    const raiz = calcularNodos(circuitoActual, { presionados, conduccion: true });
    mano = { raiz, grupos: new Set(manoRefs.map(raiz)) };
  }
  const tocaLaMano = (ref) => mano.grupos.size > 0 && mano.grupos.has(mano.raiz(ref));
  // Nivel que capta una entrada al aire con la mano cerca: la onda de 60 Hz de la red, en el tiempo simulado.
  const zumbido = () => Math.sin(2 * Math.PI * RED_HZ * (ms() / 1000)) > ZUMBIDO_UMBRAL;

  // ---- Servos: el ancho de cada pulso dice el ángulo; el brazo gira a la velocidad del modelo y pide corriente

  // Para cada servo: a qué pin del chip va su señal y de dónde se alimenta. Un servo que ya existía conserva su
  // ángulo (es una pieza física: no vuelve a 90° porque se movió un cable).
  function armarServos() {
    const raiz = calcularNodos(circuitoActual);
    const mismo = (a, b) => raiz(a) === raiz(b);
    const nuevos = new Map();
    for (const c of circuitoActual.componentes) {
      if (c.tipo !== 'servo') continue;
      const modelo = MODELOS_SERVO[c.props && c.props.modelo] ? c.props.modelo : 'sg90';
      const antes = servos.get(c.id);
      const s = antes && antes.modelo === modelo ? antes : { modelo, logico: crearServo(modelo), subida: null, sumaA: 0, picoA: 0, msVentana: 0 };
      s.senal = PINES_EN_ORDEN.find((pin) => mismo(c.id + '.SIG', 'placa.' + pin)) || null;
      const aTierra = mismo(c.id + '.GND', 'placa.GND1');
      const pinVcc = PINES_EN_ORDEN.find((pin) => mismo(c.id + '.VCC', 'placa.' + pin));
      s.fuente = mismo(c.id + '.VCC', 'placa.5V') ? '5V' : mismo(c.id + '.VCC', 'placa.3V3') ? '3V3' : pinVcc || null;
      s.conectado = aTierra && (s.fuente === '5V' || s.fuente === '3V3');
      if (pinVcc && aTierra) {
        avisar({
          tipo: 'servo_alimentacion',
          componente: c.id,
          mensaje: `El servo ${c.id} toma la corriente del pin ${pinVcc.replace(/^D/, '')}: un pin da hasta 40 mA y el servo pide unos ${MODELOS_SERVO[modelo].mA.movimiento} mA al moverse. Conecta el cable rojo a 5V.`,
        });
      }
      nuevos.set(c.id, s);
    }
    servos = nuevos;
  }

  // Un cambio en el pin de señal de un servo: la subida marca el inicio del pulso y la bajada, su ancho.
  function medirPulsos(cambios) {
    for (const s of servos.values()) {
      if (!s.senal || !(s.senal in cambios)) continue;
      if (cambios[s.senal] === PinState.High) s.subida = chip.ciclos;
      else if (s.subida !== null) {
        if (s.conectado && !apagada) s.logico.pulso(((chip.ciclos - s.subida) / FRECUENCIA) * 1e6);
        s.subida = null;
      }
    }
  }

  // Voltaje con que se alimenta un servo ahora: el 5V baja con lo que se le pide al USB; sin energía, nada.
  const voltiosServo = (s) => (!s.conectado || apagada ? 0 : s.fuente === '5V' ? v5 : 3.3);

  // Cada milisegundo simulado: cada servo gira hacia su ángulo y se suma la corriente que pidió. Después se
  // revisa la energía del USB: con «limiteUSB», un golpe de corriente reinicia la placa y un exceso sostenido
  // calienta el fusible hasta que se abre y la apaga.
  function avanzarServos() {
    // 1. Cada servo gira con el voltaje del milisegundo anterior (eso fija su velocidad).
    for (const s of servos.values()) s.logico.avanzar(1, voltiosServo(s));
    // 2. El 5V de este milisegundo, resuelto junto con lo que piden los servos del 5V (son como resistencias).
    const fijo = apagada ? 0 : USB.placaA + iCircuito;
    let siemens = 0;
    for (const s of servos.values()) if (s.conectado && s.fuente === '5V') siemens += s.logico.corriente(1);
    v5 = apagada ? 0 : activas.limiteUSB ? voltajeConServos(fijo, siemens) : USB.idealV;
    // 3. La corriente de cada servo con ese voltaje.
    let amperios = fijo;
    for (const s of servos.values()) {
      const a = s.logico.corriente(voltiosServo(s));
      s.sumaA += a;
      s.picoA = Math.max(s.picoA, a);
      s.msVentana++;
      if (s.fuente === '5V' || s.fuente === '3V3') amperios += a;
    }
    if (activas.limiteUSB) {
      fusible.avanzar(1, amperios);
      if (!apagada && !corteUSB) {
        if (v5 < USB.bodV) corteUSB = { motivo: 'caida', amperios, voltios: v5 };
        else if (amperios > USB.limitePuertoA) corteUSB = { motivo: 'puerto', amperios };
        else if (fusible.abierto) corteUSB = { motivo: 'fusible', amperios };
      }
    }
    usbSuma += amperios;
    usbPico = Math.max(usbPico, amperios);
    usbMs++;
  }

  // Lo que pasó con la energía en este milisegundo: la placa se reinicia (golpe de corriente) o se apaga (fusible).
  function atenderCorte() {
    const { motivo, amperios, voltios } = corteUSB;
    corteUSB = null;
    if (motivo === 'caida') {
      avisar({
        tipo: 'reinicio_usb',
        componente: 'placa',
        corriente_mA: Math.round(amperios * 1000),
        voltios: Math.round(voltios * 100) / 100,
        mensaje: `La placa se reinició: los servos arrancaron a la vez y el 5V bajó a ${voltios.toFixed(1).replace('.', ',')} V; por debajo de 2,7 V el Arduino se reinicia. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`,
      });
    } else if (motivo === 'puerto') {
      avisar({
        tipo: 'reinicio_usb',
        componente: 'placa',
        corriente_mA: Math.round(amperios * 1000),
        mensaje: `La placa se reinició: los servos y el circuito pidieron ${amperios.toFixed(1).replace('.', ',')} A de golpe y el puerto USB da hasta unos ${String(USB.limitePuertoA).replace('.', ',')} A. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`,
      });
    } else {
      avisar({
        tipo: 'fusible_usb',
        componente: 'placa',
        corriente_mA: Math.round(amperios * 1000),
        mensaje: `La placa se apagó: el fusible del USB se calentó porque se le pidieron ${Math.round(amperios * 1000)} mA por varios segundos y aguanta 500 mA. Vuelve a encender cuando se enfríe. Alimenta los servos y motores con una fuente aparte.`,
      });
      apagada = true;
    }
    reinicios++;
    // Chip nuevo: el programa empieza otra vez (si quedó apagada, empieza cuando vuelva la energía).
    base += chip.ciclos;
    nuevoChip();
    actualizarEntradas();
  }

  // Sin energía (fusible abierto): el tiempo pasa, el fusible se enfría y el chip espera.
  function seguirApagada(ciclos) {
    const porMs = FRECUENCIA / 1000;
    let resto = ciclos;
    while (resto > 0 && apagada) {
      const paso = Math.min(resto, porMs);
      base += paso;
      resto -= paso;
      avanzarServos();
      if (!fusible.abierto) apagada = false; // se enfrió: vuelve la energía y el programa arranca
    }
    if (resto > 0) chip.correr(resto);
  }

  // Lo que pasó con el USB desde la última foto. El pico es el mayor del último segundo, como el «máximo» de un
  // multímetro: el golpe de corriente dura milisegundos y en una sola foto casi nunca se alcanza a ver.
  function fotoEnergia() {
    const ahora = ms();
    picos = picos.filter(([t]) => ahora - t < 1000);
    picos.push([ahora, usbPico]);
    const r = {
      amperios: usbMs ? usbSuma / usbMs : 0,
      pico: Math.max(...picos.map(([, a]) => a)),
      voltios: v5,
      fusible: Math.round(fusible.calor * 100) / 100,
      apagada,
      reinicios,
    };
    usbSuma = 0;
    usbPico = 0;
    usbMs = 0;
    return r;
  }

  // Lo que se ve y se mide de cada servo en esta foto; la corriente es el promedio de la ventana (y su pico).
  function fotoServos() {
    const r = {};
    for (const [id, s] of servos) {
      const e = s.logico.estado();
      r[id] = {
        modelo: s.modelo,
        angulo: Math.round(e.angulo * 10) / 10,
        pulso: e.pulso === null ? null : Math.round(e.pulso),
        senal: s.senal,
        fuente: s.fuente,
        moviendo: e.moviendo,
        i: s.msVentana ? s.sumaA / s.msVentana : s.logico.corriente(s.voltios),
        pico: s.picoA,
      };
      s.sumaA = 0;
      s.picoA = 0;
      s.msVentana = 0;
    }
    return r;
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

  // Cada milisegundo simulado, las entradas al aire (solo en modo realista): con la mano cerca siguen la red de
  // 60 Hz; sin ella se quedan en su nivel y cambian muy de vez en cuando.
  function ruidoAlAire() {
    if (!activas.entradaFlotante || !alAire.size) return;
    for (const pin of alAire) {
      const nivel = tocaLaMano('placa.' + pin) ? zumbido() : azar() < CAMBIO_AL_AIRE_POR_MS ? !nivelAlAire[pin] : nivelAlAire[pin];
      if (nivel !== nivelAlAire[pin]) {
        nivelAlAire[pin] = nivel;
        chip.ponerEntrada(pin, nivel);
      }
    }
  }

  // Cada analogRead(): el voltaje del circuito con el ruido del ADC, o un valor que deambula si está al aire.
  function leerAnalogico(canal, voltios) {
    if (canalesAlAire.has(canal)) {
      if (!activas.entradaFlotante) return 0;
      // Con la mano cerca, la entrada analógica también capta la red: una onda de 60 Hz de punta a punta.
      if (tocaLaMano('placa.' + ANALOGICOS[canal][0])) return 2.5 + 2.5 * Math.sin(2 * Math.PI * RED_HZ * (ms() / 1000));
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
    if (apagada) return fotoApagada();
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
    const crudo = sols.length ? promediar(sols) : null;
    if (crudo) crudo.pwm = ciclosUtiles(partes, total);
    ponerAnalogicos(crudo); // analogRead() lee el promedio de la ventana, sin el promedio de la vista
    // La vista: exacta si ningún pin cambió en los últimos 50 ms (señal quieta); si no, promedio móvil.
    const quieta = chip.ciclos - ultimoCambio > (QUIETA_MS / 1000) * FRECUENCIA;
    const alfa = quieta ? 1 : 1 - Math.exp(-((total / FRECUENCIA) * 1000) / PROMEDIO_VISTA_MS);
    medicion = crudo ? suavizar(crudo, medicion, alfa) : null;
    const pines = chip.estados();
    const texto = serial.length ? decodificador.decode(Uint8Array.from(serial), { stream: true }) : '';
    serial = [];
    const vistaServos = fotoServos();
    const energia = fotoEnergia();
    iCircuito = medicion ? medicion.fuentes.reduce((t, f) => t + Math.max(0, f.i), 0) : 0;
    if (medicion) {
      medicion.usb = energia;
      medicion.servos = Object.entries(vistaServos).map(([id, s]) => ({ id, ...s }));
      // Lo que entrega el pin 5V de la placa: lo del circuito más los servos que se alimentan de él.
      const del5V = (medicion.fuentes.find((f) => f.pin === '5V') || { i: 0 }).i;
      medicion.consumo5V = del5V + medicion.servos.filter((s) => s.fuente === '5V').reduce((t, s) => t + s.i, 0);
    }
    const fallasNuevas = nuevas;
    nuevas = [];
    return {
      msSimulados: ms(),
      servos: vistaServos,
      evaluaciones,
      leds: Object.fromEntries((medicion ? medicion.leds : []).map((l) => [l.id, l.brillo])),
      quemados: [...quemados],
      voltajes: voltajesConAire(),
      entradas: entradasParaVer(),
      placa: { led13: pines.D13 === PinState.High, ledTX: ms() < txHasta },
      serial: texto,
      fallas: fallasNuevas,
      medicion,
      energia,
    };
  }

  // La placa sin energía: todo apagado; los servos se quedan donde estaban.
  function fotoApagada() {
    const fallasNuevas = nuevas;
    nuevas = [];
    return {
      msSimulados: ms(),
      evaluaciones,
      servos: fotoServos(),
      energia: fotoEnergia(),
      leds: {},
      quemados: [...quemados],
      voltajes: {},
      entradas: {},
      placa: { led13: false, ledTX: false, encendida: false },
      serial: '',
      fallas: fallasNuevas,
      medicion: null,
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
    energiaDeNuevo();
    nuevoChip();
    rehacerRed();
    actualizarEntradas();
  }

  // Al reiniciar a mano (RESET o una corrida nueva): el reloj vuelve a cero y el USB queda como recién conectado.
  function energiaDeNuevo() {
    base = 0;
    apagada = false;
    corteUSB = null;
    picos = [];
    fusible.reiniciar();
    v5 = USB.idealV;
  }

  nuevoChip();
  rehacerRed();
  actualizarEntradas();

  return {
    get ciclos() {
      return base + chip.ciclos;
    },
    avanzar(ciclos) {
      if (apagada) return seguirApagada(ciclos);
      chip.correr(ciclos);
      if (corteUSB) atenderCorte();
    },
    foto,
    ponerCircuito(c) {
      circuitoActual = c;
      rehacerRed();
      actualizarEntradas();
    },
    // «La mano»: lo que tiene el mouse encima (refs de pines o de los extremos de un cable), o nada.
    ponerMano(refs) {
      manoRefs = Array.isArray(refs) ? refs.filter((r) => typeof r === 'string') : [];
      calcularMano();
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
      energiaDeNuevo();
      nuevoChip(); // como el botón RESET: el programa empieza de nuevo y lo quemado sigue quemado
      actualizarEntradas();
    },
    reiniciarTodo() {
      reinicios = 0;
      reiniciarTodo(); // otra corrida: piezas nuevas y fallas sin avisar
    },
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

// Promedio móvil de una medición: cada número se acerca al nuevo en la fracción `alfa` (1 = el nuevo, exacto). Las
// listas se emparejan por id o por pin (una pieza nueva entra con su valor); null («al aire») y lo que no es número
// se toman tal cual. Devuelve un objeto nuevo: las soluciones guardadas no se tocan.
function suavizar(nuevo, previo, alfa) {
  if (typeof nuevo === 'number') return typeof previo === 'number' && alfa < 1 ? previo + alfa * (nuevo - previo) : nuevo;
  if (Array.isArray(nuevo)) {
    const llave = (x) => (x && typeof x === 'object' ? x.id || x.pin : undefined);
    const antes = new Map((Array.isArray(previo) ? previo : []).map((x) => [llave(x), x]));
    return nuevo.map((x, i) => suavizar(x, llave(x) !== undefined ? antes.get(llave(x)) : (previo || [])[i], alfa));
  }
  if (nuevo && typeof nuevo === 'object') {
    const r = {};
    for (const k of Object.keys(nuevo)) r[k] = suavizar(nuevo[k], previo && typeof previo === 'object' ? previo[k] : undefined, alfa);
    return r;
  }
  return nuevo;
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
