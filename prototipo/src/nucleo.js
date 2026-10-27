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
import { crearPotencia } from './potencia.js';
import { perfilPlaca, esNano } from './placas.js';
import { fuenteNano, resolverAlimentacionNano, NANO_REFERENCIA } from './alimentacion_nano.js';

export { FRECUENCIA, PinState };
export { USB, crearFusible } from './energia.js';
export { pantallaProbador } from './piezas/probador_lipo.js'; // para probar la pantalla con Node
export { perfilPlaca, esNano } from './placas.js';
export { NANO_REFERENCIA, FUENTES_NANO, fuenteNano, resolverAlimentacionNano } from './alimentacion_nano.js';

const DESTELLO_TX_MS = 60; // cuánto queda prendido el LED TX (o RX) de la placa después de enviar (o recibir)
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
// Nano: el circuito guardado se vuelve a resolver solo si una alimentación se movió más que un paso del ADC
// (5 V / 1024) desde la última vez que se puso en la red. Con PWM el 5V oscila unos mV cada milisegundo; comparar
// con el milisegundo anterior borraba las soluciones guardadas sin parar (sección 50) y hacía el Nano un 25-40 % más lento.
const TOLERANCIA_NANO_V = 0.005;

export function crearNucleo({ hex, circuito, activas = {}, semilla = Math.floor(Math.random() * 2 ** 32) }) {
  let perfil = perfilPlaca(circuito.placa);
  let nano = esNano(circuito.placa);
  let analogicosPlaca = perfil.analogicos;
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
  let planes = new Map(); // combinación → lo que leen las entradas (planDe)
  let puestas = {}; // pin → nivel que ya se le puso a la entrada (no se vuelve a poner si no cambia)
  let ultimaM = null; // voltajes que ya están en las entradas analógicas (de un plan)
  const estadosDe = new Map(); // combinación → estado de cada pin
  let tiempos = new Map(); // combinación → ciclos que pasó el chip en ella, en la ventana actual
  let ultimasPartes = []; // las de la ventana anterior, por si una foto llega sin tiempo (en pausa)
  let claveActual = 0;
  let desde = 0; // ciclo desde el que se cuenta la combinación actual
  // La ventana empieza en una combinación de pines y se corta la última vez que el chip volvió a ella: con PWM
  // eso son períodos completos, así el promedio no depende de dónde cae la foto. Lo que sigue pasa a la próxima.
  let ventana = { inicio: 0, clave: '' };
  let corte = null; // { tiempos, ciclo }: cómo iba la ventana la última vez que volvió a su combinación
  let medicion = null;
  let ultimoCambio = -Infinity; // ciclo del último cambio de pin (para saber si la señal está quieta)
  let cambioPin = {}; // pin → ciclo de su último cambio (su ciclo útil se sigue promediando mientras cambie)
  let evaluaciones = 0;
  let txHasta = 0;
  let rxHasta = 0;
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
  let ciclosApagada = 0; // ciclos sin energía que aún no completan un milisegundo (el Worker avanza en pedazos)
  let corteUSB = null; // { motivo: 'puerto' | 'fusible', amperios }: pasó en este milisegundo; se atiende al terminar
  let iCircuito = 0; // lo que el circuito le pide al USB: el 5V, el 3,3V y lo que entregan los pines (de la última foto)
  let v5 = USB.idealV;
  let reinicios = 0;
  let usbSuma = 0;
  let usbPico = 0;
  let usbMs = 0;
  let picos = []; // [ms, pico] de las últimas fotos: la tabla muestra el pico del último segundo
  // Shield L293D, motores TT y batería LiPo (tarea T3, src/potencia.js).
  const potencia = crearPotencia({ activas, avisar: (f) => avisar(f) });
  let motores5V = 0; // lo que piden al 5V los motores conectados directo (del milisegundo anterior)
  let porVin = false; // el Uno se alimenta de la batería por el VIN (y no del USB)
  let fuenteActualNano = null;
  let energiaNano = null;
  let corteNano = false;
  let aplicadaNano = null; // alimentación que tiene la red ahora (puede diferir de energiaNano en < TOLERANCIA_NANO_V)
  const estadosSinEnergia = Object.fromEntries(PINES_EN_ORDEN.map((p) => [p, PinState.Input]));

  const ms = () => ((base + chip.ciclos) / FRECUENCIA) * 1000;
  // La clave de una combinación de pines es un número: el estado de cada pin (0 a 3) es una cifra en base 4, en el
  // orden de PINES_EN_ORDEN. Así se actualiza sumando lo que cambió, sin armar un texto en cada cambio de pin.
  const clave = (e) => PINES_EN_ORDEN.reduce((k, pin) => k + e[pin] * PESO[pin], 0);

  function nuevoChip() {
    chip = crearChip(hex);
    if (nano) chip.ponerVoltajeReferencia(v5);
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
      const antes = estadosDe.get(claveActual);
      for (const pin in cambios) claveActual += (cambios[pin] - antes[pin]) * PESO[pin];
      if (!estadosDe.has(claveActual)) estadosDe.set(claveActual, { ...ahora }); // `ahora` lo reutiliza el chip
      if (claveActual === ventana.clave) corte = { tiempos: new Map(tiempos), ciclo: chip.ciclos };
      ultimoCambio = chip.ciclos;
      for (const pin in cambios) cambioPin[pin] = chip.ciclos;
      actualizarEntradas(); // un pin que pasa a entrada (o que maneja otra entrada) cambia lo que se lee
      if (servos.size) medirPulsos(cambios);
      potencia.pinesCambiaron(cambios, ahora, chip.ciclos);
    });
    chip.alCadaMs(ruidoAlAire);
    chip.alCadaMs(avanzarServos);
    for (const s of servos.values()) s.subida = null; // un chip nuevo empieza sin pulsos a medias
    potencia.reiniciarChip();
    ultimoCambio = -Infinity;
    cambioPin = {};
    chip.ponerLectorAnalogico(leerAnalogico);
    puestas = {};
    ultimaM = null;
    chip.alByteSerial((byte) => {
      serial.push(byte);
      txHasta = ms() + DESTELLO_TX_MS;
    });
    chip.alByteRecibido(() => {
      rxHasta = ms() + DESTELLO_TX_MS;
    });
  }

  function acumular() {
    const c = chip.ciclos;
    tiempos.set(claveActual, (tiempos.get(claveActual) || 0) + (c - desde));
    desde = c;
  }

  function rehacerRed() {
    perfil = perfilPlaca(circuitoActual.placa);
    nano = esNano(circuitoActual.placa);
    analogicosPlaca = perfil.analogicos;
    if (nano) {
      fuenteActualNano = fuenteNano(circuitoActual, calcularNodos(circuitoActual));
      energiaNano = resolverAlimentacionNano(fuenteActualNano, { realista: !!activas.limiteUSB });
      aplicadaNano = energiaNano;
      v5 = energiaNano.v5;
      apagada = energiaNano.apagada;
      chip.ponerVoltajeReferencia(v5);
    }
    // El jack solo es fuente cuando le entra voltaje: sin entrada queda sin fuente (no es un corto a GND).
    const fuentesExtra = nano && fuenteActualNano.expansion ? [
      { ref: fuenteActualNano.expansion + '.OUT_3V3', voltios: energiaNano.v33Expansion, nombre: 'la salida 3,3V de la expansión' },
      ...(energiaNano.entradaV > 0 ? [{ ref: fuenteActualNano.expansion + '.JACK_POS', voltios: energiaNano.entradaV, nombre: 'la entrada del jack' }] : []),
    ] : [];
    red = armarRed(circuitoActual, { quemados, presionados,
      ...(nano ? { alimentacion: voltajesFuenteNano(), fuentesExtra } : {}) });
    soluciones = new Map();
    planes = new Map();
    armarServos();
    potencia.armar(circuitoActual, calcularNodos(circuitoActual), nano ? {
      fuentesMotor: { '3V3': 'placa.3V3', ...(fuenteActualNano.expansion ? {
        [fuenteActualNano.expansion + '.OUT_3V3']: fuenteActualNano.expansion + '.OUT_3V3',
      } : {}) }, entradas: [fuenteActualNano.entradaRef],
    } : {});
    calcularMano();
    if (nano) avisarFuenteNano();
  }

  function voltajesFuenteNano() {
    return { '5V': energiaNano.v5, '3V3': energiaNano.v33, VIN: energiaNano.vin,
      ...(fuenteActualNano.expansion ? {
        [fuenteActualNano.expansion + '.OUT_3V3']: energiaNano.v33Expansion,
        [fuenteActualNano.expansion + '.JACK_POS']: energiaNano.entradaV,
      } : {}) };
  }

  // Solo avisa lo que el aprendiz puede arreglar. Que el modelo es de referencia lo dicen la ficha y la tabla de
  // mediciones: como falla salía en cada corrida y se mezclaba con las fallas reales del registro de eventos.
  function avisarFuenteNano() {
    const componente = fuenteActualNano.expansion || 'placa';
    if (fuenteActualNano.corto) {
      avisar({ tipo: 'cortocircuito', componente: fuenteActualNano.entradaRef,
        mensaje: 'La entrada del jack está unida directo a GND: es un cortocircuito. Quita ese cable.' });
    } else if (fuenteActualNano.alimentacion === 'jack' && fuenteActualNano.voltiosJack < NANO_REFERENCIA.minimoJackV) {
      avisar({ tipo: 'nano_alimentacion', componente, voltios: fuenteActualNano.voltiosJack,
        mensaje: `El jack recibe ${fuenteActualNano.voltiosJack.toFixed(1).replace('.', ',')} V: la referencia recomienda 7 a 12 V. Con menos voltaje bajan las salidas y el Nano puede quedar en reinicio.` });
    }
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
      const salidaExpansion = nano && fuenteActualNano.expansion && fuenteActualNano.expansion + '.OUT_3V3';
      s.fuente = mismo(c.id + '.VCC', 'placa.5V') ? '5V' : mismo(c.id + '.VCC', 'placa.3V3') ? '3V3'
        : salidaExpansion && mismo(c.id + '.VCC', salidaExpansion) ? salidaExpansion : pinVcc || null;
      s.conectado = aTierra && (s.fuente === '5V' || s.fuente === '3V3' || !!salidaExpansion && s.fuente === salidaExpansion);
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
  const voltiosServo = (s) => (!s.conectado || apagada && !nano ? 0 : s.fuente === '5V' ? v5
    : nano ? s.fuente === '3V3' ? energiaNano.v33 : energiaNano.v33Expansion : 3.3);

  // Cada milisegundo simulado: cada servo gira hacia su ángulo y se suma la corriente que pidió. Después se
  // revisa la energía del USB: con «limiteUSB», un golpe de corriente reinicia la placa y un exceso sostenido
  // calienta el fusible hasta que se abre y la apaga.
  function avanzarServos() {
    if (nano) return avanzarNano();
    // 0. La shield y los motores, con el 5V del milisegundo anterior. Si la batería llega al VIN con más de 6,6 V, el
    //    Uno se alimenta de ella (su regulador da 5 V) y el USB deja de entregar.
    if (potencia.hay) ({ i5V: motores5V, porVin } = potencia.cadaMs(chip.ciclos, { v5, logica: !apagada && v5 > USB.bodV }));
    // 1. Cada servo gira con el voltaje del milisegundo anterior (eso fija su velocidad).
    for (const s of servos.values()) s.logico.avanzar(1, voltiosServo(s));
    // 2. El 5V de este milisegundo, resuelto junto con lo que piden los servos del 5V (son como resistencias).
    const fijo = apagada ? 0 : USB.placaA + iCircuito + motores5V;
    let siemens = 0;
    for (const s of servos.values()) if (s.conectado && s.fuente === '5V') siemens += s.logico.corriente(1);
    v5 = apagada ? 0 : porVin ? USB.idealV : activas.limiteUSB ? voltajeConServos(fijo, siemens) : USB.idealV;
    // 3. La corriente de cada servo con ese voltaje.
    let amperios = fijo;
    for (const s of servos.values()) {
      const a = s.logico.corriente(voltiosServo(s));
      s.sumaA += a;
      s.picoA = Math.max(s.picoA, a);
      s.msVentana++;
      if (s.fuente === '5V' || s.fuente === '3V3') amperios += a;
    }
    if (porVin) amperios = 0; // la energía sale del VIN: el USB no entrega nada
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

  // Nano mantiene la alimentación aparte del modelo USB medido en el Uno. Se
  // recalculan las fuentes y la referencia ADC por tiempo simulado, también con
  // la CPU detenida por falta de energía. El fusible del Uno no participa aquí.
  function avanzarNano() {
    const antesApagada = apagada;
    const m = solucion(claveActual);
    const corriente = (pin) => m ? (m.fuentes.find((f) => f.pin === pin) || { i: 0 }).i : 0;
    // Una carga entre jack/VIN y GND toma corriente antes del regulador. Cuenta
    // en su batería/fuente de entrada, sin convertirse en carga de la salida5V.
    const iEntradaDirecta = Math.max(0, corriente(fuenteActualNano.expansion ? fuenteActualNano.entradaRef : 'VIN'));
    let motoresAux = {};
    if (potencia.hay) {
      const cargasBateria = fuenteActualNano.bateria ? { [fuenteActualNano.bateria]:
        (fuenteActualNano.alimentacion === 'jack' ? energiaNano.amperios : 0) + iEntradaDirecta } : {};
      ({ i5V: motores5V, iFuentes: motoresAux } = potencia.cadaMs(chip.ciclos, { v5, logica: !apagada,
        cargasBateria, consumoPorVinA: 0, habilitarVin: false,
        voltajesMotor: { '3V3': energiaNano.v33, ...(fuenteActualNano.expansion ? {
          [fuenteActualNano.expansion + '.OUT_3V3']: energiaNano.v33Expansion,
        } : {}) } }));
      const bateriaV = fuenteActualNano.bateria && potencia.voltajeBateria(fuenteActualNano.bateria);
      if (typeof bateriaV === 'number' && fuenteActualNano.voltiosJack > 0) fuenteActualNano.voltiosJack = bateriaV;
    }
    for (const s of servos.values()) s.logico.avanzar(1, voltiosServo(s));
    let g5 = v5 > 0 ? (Math.max(0, corriente('5V')) + (m ? m.pines.reduce((t, p) => t + Math.max(0, p.i), 0) : 0)) / v5 : 0;
    let g33 = energiaNano.v33 > 0 ? (Math.max(0, corriente('3V3')) + (motoresAux['3V3'] || 0)) / energiaNano.v33 : 0;
    let g33Expansion = energiaNano.v33Expansion > 0 && fuenteActualNano.expansion
      ? (Math.max(0, corriente(fuenteActualNano.expansion + '.OUT_3V3')) + (motoresAux[fuenteActualNano.expansion + '.OUT_3V3'] || 0)) / energiaNano.v33Expansion : 0;
    for (const s of servos.values()) if (s.conectado) {
      if (s.fuente === '5V') g5 += s.logico.corriente(1);
      else if (s.fuente === '3V3') g33 += s.logico.corriente(1);
      else g33Expansion += s.logico.corriente(1);
    }
    const siguiente = resolverAlimentacionNano(fuenteActualNano, { realista: !!activas.limiteUSB, g5, g33, g33Expansion, fijo5: motores5V });
    const cambio = ['v5', 'v33', 'v33Expansion', 'vin', 'entradaV'].some((p) => Math.abs(siguiente[p] - aplicadaNano[p]) > TOLERANCIA_NANO_V);
    energiaNano = siguiente;
    v5 = siguiente.v5;
    apagada = siguiente.apagada;
    porVin = fuenteActualNano.alimentacion === 'jack';
    if (!antesApagada && apagada) corteNano = true;
    if (cambio || antesApagada !== apagada) {
      aplicadaNano = siguiente;
      red.ponerAlimentacion(voltajesFuenteNano());
      chip.ponerVoltajeReferencia(v5);
      soluciones.clear(); planes.clear(); ultimaM = null;
      actualizarEntradas();
    }
    if (activas.limiteUSB && siguiente.i33Expansion > NANO_REFERENCIA.aviso3V3A) {
      avisar({ tipo: 'nano_3v3_sobrecarga', componente: fuenteActualNano.expansion + '.OUT_3V3',
        corriente_mA: Math.round(siguiente.i33Expansion * 1000),
        mensaje: 'La salida 3,3 V supera 100 mA en el modelo de referencia y su voltaje baja. Reduce la carga; el límite de tu expansión real está pendiente de comprobar.' });
    }
    if (activas.limiteUSB && siguiente.i33 > NANO_REFERENCIA.avisoNano3V3A) {
      avisar({ tipo: 'nano_3v3_sobrecarga', componente: 'placa.3V3', corriente_mA: Math.round(siguiente.i33 * 1000),
        mensaje: 'La salida 3,3 V del módulo Nano supera 50 mA, el máximo publicado para el Arduino Nano oficial. Reduce la carga; comprueba el límite de tu clon. Esta salida es distinta de la expansión.' });
    }
    for (const s of servos.values()) {
      const a = s.logico.corriente(voltiosServo(s));
      s.sumaA += a; s.picoA = Math.max(s.picoA, a); s.msVentana++;
    }
    const amperiosFuente = siguiente.amperios + (fuenteActualNano.alimentacion === 'jack' ? iEntradaDirecta : 0);
    usbSuma += amperiosFuente;
    usbPico = Math.max(usbPico, amperiosFuente);
    usbMs++;
  }

  // `porCarga`: la alimentación cayó por lo que pide el circuito (cuenta como reinicio de la placa, como en el Uno).
  // Si el aprendiz quitó la fuente (Desconectada, sin batería), el programa también vuelve a empezar, pero no es un
  // reinicio por energía: ese cambio ya lo registra el lienzo como un cambio del circuito.
  function atenderCorteNano({ porCarga = true } = {}) {
    corteNano = false;
    if (porCarga) reinicios++;
    if (v5 > 0) avisar({ tipo: 'nano_bajo_voltaje', componente: 'placa', voltios: v5,
      mensaje: 'La alimentación del Nano bajó del umbral de reinicio de referencia (2,7 V). El programa espera mientras vuelve la energía. Revisa la fuente y reduce la carga.' });
    base += chip.ciclos;
    nuevoChip();
    actualizarEntradas();
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
      ciclosApagada = 0;
    }
    reinicios++;
    // Chip nuevo: el programa empieza otra vez (si quedó apagada, empieza cuando vuelva la energía).
    base += chip.ciclos;
    nuevoChip();
    actualizarEntradas();
  }

  // Sin energía (fusible abierto): el tiempo pasa, el fusible se enfría y el chip espera. Los modelos «de cada ms»
  // corren solo al completar un milisegundo, como en chip.correr: con pedazos de 4801 ciclos el fusible no puede
  // enfriarse un ms entero en cada pedazo (se enfriaría 3 veces más rápido que el tiempo simulado).
  // Devuelve los ciclos del pedazo que quedan cuando vuelve la energía: los corre avanzar(), que vigila otro corte.
  function seguirApagada(ciclos) {
    const porMs = FRECUENCIA / 1000;
    let resto = ciclos;
    while (resto > 0 && apagada) {
      const paso = Math.min(resto, porMs - ciclosApagada);
      base += paso;
      resto -= paso;
      ciclosApagada += paso;
      if (ciclosApagada < porMs) break; // el pedazo terminó antes de completar el milisegundo
      ciclosApagada = 0;
      avanzarServos();
      if (!nano && !fusible.abierto) apagada = false; // se enfrió: vuelve la energía y el programa arranca
    }
    return resto;
  }
  // Un modelo «de cada ms» declaró un corte (el Nano sin energía, o el 5V del Uno cayó): el chip para ahí (AUD-05).
  const hayCorte = () => corteNano || corteUSB !== null;

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
    if (nano) Object.assign(r, { fuente: energiaNano.fuente, voltios3V3: energiaNano.v33,
      voltios3V3Expansion: energiaNano.v33Expansion, voltiosJack: energiaNano.entradaV,
      referencia: true, fusible: null, expansion: fuenteActualNano.expansion });
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
        i: s.msVentana ? s.sumaA / s.msVentana : s.logico.corriente(voltiosServo(s)),
        pico: s.picoA,
      };
      s.sumaA = 0;
      s.picoA = 0;
      s.msVentana = 0;
    }
    return r;
  }

  // ---- Entradas: lo que el circuito le deja leer al programa (digitalRead y analogRead)

  // Lo que depende solo de la combinación de pines (y del circuito), guardado como las soluciones: qué entradas y qué
  // canales quedan al aire y qué nivel lee cada entrada. Un programa que manda datos a la shield sin pausa cambia los
  // pines decenas de miles de veces por segundo, y recalcularlo en cada cambio era la mitad del tiempo.
  function planDe(k, e, m) {
    let p = planes.get(k);
    if (p) return p;
    const flotan = red.flotantes(e);
    const canales = new Set();
    analogicosPlaca.forEach((refs, canal) => {
      if (flotan.has(refs[0])) canales.add(canal);
    });
    const alAireAqui = new Set();
    const entradas = []; // [pin, nivel]: true o false; null = entre umbrales (se conserva el anterior); 'aire'
    for (const pin of ENTRADAS) {
      const estado = e[pin];
      if (estado !== PinState.Input && estado !== PinState.InputPullUp) continue;
      if (flotan.has(pin)) {
        alAireAqui.add(pin);
        entradas.push([pin, 'aire']);
        continue;
      }
      const v = m ? m.voltajes['placa.' + pin] : null;
      if (typeof v === 'number') entradas.push([pin, v >= (nano ? 0.6 * v5 : UMBRAL_ALTO) ? true : v <= (nano ? 0.3 * v5 : UMBRAL_BAJO) ? false : null]);
      else entradas.push([pin, estado === PinState.InputPullUp]); // sin nada conectado: la pull-up interna lo deja en ALTO
    }
    // Voltaje de cada entrada analógica con esta combinación (para no volver a ponerlo si no cambió).
    const analogicos = analogicosPlaca.map((refs) => {
      for (const r of refs) {
        const v = m ? m.voltajes['placa.' + r] : null;
        if (typeof v === 'number') return v;
      }
      return null;
    });
    p = { canales, alAire: alAireAqui, entradas, analogicos, refsAlAire: red.refsAlAire(e) };
    if (m) planes.set(k, p); // sin solución no se guarda: cuando el circuito se pueda calcular, se rehace
    return p;
  }
  // Pone el nivel de una entrada digital solo si cambió.
  function ponerEntrada(pin, nivel) {
    if (puestas[pin] === nivel) return;
    puestas[pin] = nivel;
    chip.ponerEntrada(pin, nivel);
  }

  // Escribe en el chip el nivel de cada entrada digital y el voltaje de cada analógica, con los pines de ahora.
  function actualizarEntradas() {
    if (!red || !chip) return;
    const e = estadosDe.get(claveActual) || chip.estados();
    const m = solucion(claveActual);
    const plan = planDe(claveActual, e, m);
    alAire = plan.alAire;
    for (const [pin, fijo] of plan.entradas) {
      if (fijo === 'aire') {
        if (!(pin in nivelAlAire)) nivelAlAire[pin] = azar() < 0.5;
        ponerEntrada(pin, activas.entradaFlotante ? nivelAlAire[pin] : false); // ideal: lee BAJO
        continue;
      }
      const nivel = fijo === null ? !!nivelAnterior[pin] : fijo;
      nivelAnterior[pin] = nivel;
      ponerEntrada(pin, nivel);
    }
    canalesAlAire = plan.canales;
    // El voltaje analógico está desde que se enciende la placa: no hay que esperar a la primera foto.
    if (m && plan.analogicos !== ultimaM) {
      plan.analogicos.forEach((v, canal) => {
        if (v !== null && (!ultimaM || ultimaM[canal] !== v)) chip.ponerAnalogico(canal, v);
      });
      ultimaM = plan.analogicos;
    }
    refsAlAire = plan.refsAlAire;
  }

  // Cada milisegundo simulado, las entradas al aire (solo en modo realista): con la mano cerca siguen la red de
  // 60 Hz; sin ella se quedan en su nivel y cambian muy de vez en cuando.
  function ruidoAlAire() {
    if (!activas.entradaFlotante || !alAire.size) return;
    for (const pin of alAire) {
      const nivel = tocaLaMano('placa.' + pin) ? zumbido() : azar() < CAMBIO_AL_AIRE_POR_MS ? !nivelAlAire[pin] : nivelAlAire[pin];
      if (nivel !== nivelAlAire[pin]) {
        nivelAlAire[pin] = nivel;
        ponerEntrada(pin, nivel);
      }
    }
  }

  // Cada analogRead(): el voltaje del circuito con el ruido del ADC, o un valor que deambula si está al aire.
  function leerAnalogico(canal, voltios) {
    if (canalesAlAire.has(canal)) {
      if (!activas.entradaFlotante) return 0;
      // Con la mano cerca, la entrada analógica también capta la red: una onda de 60 Hz de punta a punta.
      if (analogicosPlaca[canal] && tocaLaMano('placa.' + analogicosPlaca[canal][0])) return 2.5 + 2.5 * Math.sin(2 * Math.PI * RED_HZ * (ms() / 1000));
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
      red.ponerPines(nano && apagada ? estadosSinEnergia : estadosDe.get(k));
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
    // Los pines que cambiaron hace poco entran siempre, aunque en esta ventana no cambien (0 o 1): así una señal más
    // lenta que la foto, como el pulso de un servo, se promedia bien en la vista.
    const recientes = new Set(PINES_EN_ORDEN.filter((p) => p in cambioPin && chip.ciclos - cambioPin[p] < (QUIETA_MS / 1000) * FRECUENCIA));
    if (crudo) crudo.pwm = ciclosUtiles(partes, total, recientes);
    ponerAnalogicos(crudo); // analogRead() lee el promedio de la ventana, sin el promedio de la vista
    ultimaM = null;
    // La vista: exacta si ningún pin cambió en los últimos 50 ms (señal quieta); si no, promedio móvil.
    const quieta = chip.ciclos - ultimoCambio > (QUIETA_MS / 1000) * FRECUENCIA;
    const alfa = quieta ? 1 : 1 - Math.exp(-((total / FRECUENCIA) * 1000) / PROMEDIO_VISTA_MS);
    medicion = crudo ? suavizar(crudo, medicion, alfa) : null;
    const pines = chip.estados();
    const texto = serial.length ? decodificador.decode(Uint8Array.from(serial), { stream: true }) : '';
    serial = [];
    const vistaServos = fotoServos();
    const energia = fotoEnergia();
    const pot = potencia.foto(ms());
    // Lo que sale del USB por el circuito: lo que entregan el 5V y el 3,3V más lo que entregan los pines en ALTO (sale
    // del 5V por la pata VCC del chip). Lo que reciben los pines en BAJO ya lo entregó otra fuente: no se cuenta dos veces.
    iCircuito = medicion
      ? medicion.fuentes.reduce((t, f) => t + Math.max(0, f.i), 0) + medicion.pines.reduce((t, p) => t + Math.max(0, p.i), 0)
      : 0;
    if (medicion) {
      medicion.usb = energia;
      medicion.servos = Object.entries(vistaServos).map(([id, s]) => ({ id, ...s }));
      // Lo que entrega el pin 5V de la placa: lo del circuito más los servos que se alimentan de él.
      const del5V = (medicion.fuentes.find((f) => f.pin === '5V') || { i: 0 }).i;
      medicion.consumo5V = del5V + medicion.servos.filter((s) => s.fuente === '5V').reduce((t, s) => t + s.i, 0);
      Object.assign(medicion, pot.lista, { porVin });
    }
    const fallasNuevas = nuevas;
    nuevas = [];
    return {
      msSimulados: ms(),
      servos: vistaServos,
      piezas: pot.piezas,
      evaluaciones,
      leds: Object.fromEntries((medicion ? medicion.leds : []).map((l) => [l.id, l.brillo])),
      quemados: [...quemados],
      voltajes: voltajesConAire(),
      entradas: entradasParaVer(),
      // brilloL: la parte de la ventana con el pin 13 en ALTO. El LED L sigue al pin como los LED del circuito: si el
      // pin cambia más rápido que la foto, se ve a medio brillo en vez de parpadear al azar.
      placa: {
        led13: pines.D13 === PinState.High, brilloL: brilloDe('D13', partes, total),
        ledTX: ms() < txHasta, ledRX: ms() < rxHasta, ...(nano ? { encendida: true } : {}),
      },
      serial: texto,
      fallas: fallasNuevas,
      medicion,
      energia,
    };
  }

  // La placa sin energía: todo apagado; los servos se quedan donde estaban.
  function fotoApagada() {
    const m = nano ? solucion(claveActual) : null;
    const fallasNuevas = nuevas;
    nuevas = [];
    return {
      msSimulados: ms(),
      evaluaciones,
      servos: fotoServos(),
      piezas: potencia.foto(ms()).piezas,
      energia: fotoEnergia(),
      leds: {},
      quemados: [...quemados],
      voltajes: m?.voltajes || {},
      entradas: {},
      placa: { led13: false, brilloL: 0, ledTX: false, ledRX: false, encendida: false },
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
    analogicosPlaca.forEach((refs, canal) => {
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
    rxHasta = 0;
    energiaDeNuevo();
    nuevoChip();
    rehacerRed();
    actualizarEntradas();
  }

  // Al reiniciar a mano (RESET o una corrida nueva): el reloj vuelve a cero y el USB queda como recién conectado.
  function energiaDeNuevo() {
    base = 0;
    apagada = false;
    ciclosApagada = 0;
    corteUSB = null;
    picos = [];
    fusible.reiniciar();
    v5 = USB.idealV;
    motores5V = 0;
    porVin = false;
    corteNano = false;
    if (nano) {
      fuenteActualNano = fuenteNano(circuitoActual, calcularNodos(circuitoActual));
      energiaNano = resolverAlimentacionNano(fuenteActualNano, { realista: !!activas.limiteUSB });
      aplicadaNano = energiaNano;
      v5 = energiaNano.v5;
      apagada = energiaNano.apagada;
      if (red) red.ponerAlimentacion(voltajesFuenteNano());
      soluciones.clear(); planes.clear(); ultimaM = null;
    }
  }

  nuevoChip();
  rehacerRed();
  actualizarEntradas();

  return {
    get ciclos() {
      return base + chip.ciclos;
    },
    // Lo que pasa no depende del tamaño del paso (AUD-05): el chip corre hasta el milisegundo de un corte, el corte se
    // atiende ahí (reinicio o apagado) y el resto del paso sigue desde ese instante, con el tiempo global intacto.
    avanzar(ciclos) {
      let resto = ciclos;
      while (resto > 0) {
        if (apagada) {
          resto = seguirApagada(resto);
          continue;
        }
        const antes = chip.ciclos;
        chip.correr(resto, hayCorte);
        resto -= chip.ciclos - antes;
        if (corteNano) atenderCorteNano();
        if (corteUSB) atenderCorte();
      }
    },
    foto,
    ponerCircuito(c) {
      const estabaApagada = apagada;
      circuitoActual = c;
      rehacerRed();
      // Quitar la fuente devuelve el AVR a reset. Al reconectar comienza el
      // programa, con el reloj global y las piezas físicas conservados.
      if (nano && !estabaApagada && apagada) atenderCorteNano({ porCarga: false });
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
// `recientes`: pines que cambiaron hace poco; entran aunque en esta ventana se queden en 0 o en 1.
// Parte de la ventana en que `pin` estuvo en ALTO, de 0 a 1 (con dos decimales).
function brilloDe(pin, partes, total) {
  let alto = 0;
  for (const [k, t] of partes) if (Math.floor(k / PESO[pin]) % 4 === PinState.High) alto += t;
  return total > 0 ? Math.round((alto / total) * 100) / 100 : 0;
}

function ciclosUtiles(partes, total, recientes = new Set()) {
  const altos = {};
  const vistos = new Set();
  for (const [k, t] of partes) {
    for (let i = 0; i < PINES_EN_ORDEN.length; i++) {
      const alto = Math.floor(k / PESO[PINES_EN_ORDEN[i]]) % 4 === PinState.High;
      altos[i] = (altos[i] || 0) + (alto ? t : 0);
      vistos.add(i);
    }
  }
  const nombres = PINES_EN_ORDEN;
  const r = {};
  for (const i of vistos) {
    const f = altos[i] / total;
    if ((f > 0 && f < 1) || recientes.has(nombres[i])) r[nombres[i]] = Math.round(f * 1000) / 1000;
  }
  return r;
}
// El mismo orden en que chip.estados() entrega los pines (puerto D, B y C).
const PINES_EN_ORDEN = ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
const PESO = Object.fromEntries(PINES_EN_ORDEN.map((pin, i) => [pin, 4 ** i]));

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
      vatios: x.vatios,
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
