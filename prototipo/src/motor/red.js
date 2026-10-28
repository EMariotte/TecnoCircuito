// Traduce el circuito del contrato y el estado de los pines del chip a una red eléctrica (motor/mna.js),
// la resuelve, mide cada pieza y revisa las fallas. No toca la página.
import { calcularNodos } from '../conexiones.js';
import { huecos } from '../protoboard.js';
import { resistencia, fuenteConResistencia, fuenteVoltaje, diodo, resolver, VT } from './mna.js';
import { PinState } from 'avr8js';
import { perfilPlaca, esNano } from '../placas.js';
import { RIELES_EXPANSION } from '../piezas/shield_nano_io.js';

// ---- Modelos. Valores de partida tomados de hojas de datos; se ajustan con el multímetro (validación).

// Pin del ATmega328P a 5 V: en ALTO entrega 5 V detrás de unos 25 Ω, en BAJO se va a 0 V detrás de unos 22 Ω.
// maxmA: máximo absoluto por pin. chipMaxmA: máximo absoluto por las patas VCC y por las GND del chip (hoja de datos,
// «DC Current VCC and GND Pins»): lo que entregan todos los pines en ALTO sale por VCC; lo que reciben en BAJO, por GND.
export const PIN = { voltios: 5, rAlto: 25, rBajo: 22, rPullUp: 35000, maxmA: 40, chipMaxmA: 200 };

// LED de 5 mm: voltaje directo a 20 mA según el color, factor de idealidad n y resistencia interna.
export const LED = {
  vf: { rojo: 2.0, amarillo: 2.05, verde: 2.2, azul: 3.1, blanco: 3.1 },
  n: 2,
  rs: 5,
  iRef: 0.02, // corriente a la que se da el voltaje directo
  normalmA: 20, // corriente de trabajo
  quemamA: 30, // por encima de esto se quema
  plenomA: 15, // corriente a la que el dibujo brilla al máximo
};
// La potencia de una resistencia: 0.25 o 0.5 (las del kit), o null si se guardó sin `vatios` (antes de que la pieza
// tuviera dos potencias: la de ¼ W con las patas abiertas a 6 pasos). Es la única regla: la usan el dibujo, la ficha,
// el límite de calor y KiCad, así nunca dicen cosas distintas. Otro valor (el esquema no lo admite) cuenta como sin
// `vatios`.
export const potenciaDe = (props) => {
  const w = Number(props && props.vatios);
  return w === 0.25 || w === 0.5 ? w : null;
};
// Lo que aguanta sin calentarse: su potencia; una guardada sin `vatios` es de ¼ W, como siempre.
export const vatiosDe = (props) => potenciaDe(props) || 0.25;
// Potenciómetro: la perilla parte la resistencia total en dos. En los extremos queda un mínimo (como el real),
// así el solucionador nunca recibe 0 Ω.
export const POT = { minimo: 1 };

// Is sale de pedir que el LED tenga su voltaje directo a 20 mA.
export function modeloLed(color) {
  const vf = LED.vf[color] || LED.vf.rojo;
  const vUnion = vf - LED.iRef * LED.rs;
  return { Is: LED.iRef / Math.expm1(vUnion / (LED.n * VT)), n: LED.n };
}

// Las patas de las piezas que el núcleo arma una por una.
export const PATAS = { led: ['anodo', 'catodo'], resistencia: ['1', '2'], potenciometro: ['GND', 'SIG', 'VCC'], pulsador: ['1i', '1d', '2i', '2d'], servo: ['GND', 'VCC', 'SIG'] };

// Arma la red una vez por cableado (y por botones presionados). Cambiar los pines (ponerPines) no la rehace:
// solo cambia las fuentes. Un botón presionado une sus patas 1 y 2: es parte del cableado de ese momento.
export function armarRed(circuito, { quemados = new Set(), presionados = new Set(), alimentacion = {}, fuentesExtra = [] } = {}) {
  const perfil = perfilPlaca(circuito.placa);
  const nano = esNano(circuito.placa);
  const digitales = perfil.pinesDigitales;
  const analogicosSolos = perfil.analogicos.map((refs) => refs[0]).filter((p) => !digitales.includes(p));
  let voltiosGPIO = alimentacion['5V'] ?? PIN.voltios;
  const raiz = calcularNodos(circuito, { presionados });
  const conduce = calcularNodos(circuito, { presionados, conduccion: true }); // para saber qué entradas flotan
  const tierra = raiz('placa.GND1');
  const indices = new Map();
  let n = 0;
  const nodo = (ref) => {
    const r = raiz(ref);
    if (r === tierra) return -1;
    if (!indices.has(r)) indices.set(r, n++);
    return indices.get(r);
  };
  const buscar = (ref) => (raiz(ref) === tierra ? -1 : indices.get(raiz(ref))); // undefined: al aire

  const elementos = [];
  const fuentes = [];
  const fallasFijas = [];
  // Lo que llega por un cable o por una pata enchufada directo en un pin (sin protoboard de por medio).
  const usados = new Set(circuito.cables.flatMap((c) => [c.de, c.a]));
  for (const c of circuito.componentes) for (const [pata, ref] of Object.entries(c.en || {})) {
    if (!ref.startsWith('protoboard.')) usados.add(c.id + '.' + pata).add(ref);
  }
  // Un pin de la placa está conectado si un cable llega a su nodo, aunque no lo nombre: el conector de servo de la
  // shield ES el 5V, el GND y el D9/D10 del Uno (puentes internos de conexiones.js). Se decide por nodo, no por el
  // texto del cable, para que dos montajes eléctricamente iguales den lo mismo.
  const raicesUsadas = new Set([...usados].map(raiz));
  const conectado = (pin) => raicesUsadas.has(raiz('placa.' + pin));
  // Pines de la placa que se miden (su voltaje lo leen las entradas y la tabla), lleguen o no por un cable directo.
  const refsPlaca = [...digitales, ...analogicosSolos, '5V', '3V3', ...(nano ? ['VIN', 'GND1', 'GND2'] : [])]
    .filter((p) => conectado(p) || nano && ['5V', '3V3', 'VIN', 'GND1', 'GND2'].includes(p)).map((pin) => 'placa.' + pin);
  // ADC6/7 reciben voltaje de la red, sin elemento fuente y sin pull-up.
  for (const p of analogicosSolos) if (conectado(p)) nodo('placa.' + p);
  const refsExpansion = nano ? circuito.componentes.filter((c) => c.tipo === 'shield_nano_io')
    .flatMap((c) => RIELES_EXPANSION.map((p) => c.id + '.' + p)) : [];
  for (const ref of refsExpansion) nodo(ref);
  // Huecos de la protoboard cuya tira toca algo (un cable o una pata encajada): el rótulo de cualquiera de ellos
  // muestra el voltaje de la tira, como la punta de un multímetro.
  const huecosConAlgo = [];
  if (circuito.protoboard) {
    const raices = new Set([...usados].map(raiz));
    for (const c of circuito.componentes) for (const pata of Object.keys(c.en || {})) raices.add(raiz(c.id + '.' + pata));
    for (const h of huecos(circuito.protoboard.tipo)) {
      const ref = 'protoboard.' + h.nombre;
      if (raices.has(raiz(ref))) huecosConAlgo.push(ref);
    }
  }

  // 5 V y 3,3 V de la placa: fuentes de voltaje ideales. El VIN del Nano solo es fuente cuando le entra voltaje
  // (batería o jack); sin entrada queda sin fuente, como en la placa: una fuente de 0 V sería un corto a GND escondido.
  const nodosFuente = new Map();
  const fuentesAArmar = [['5V', 5, 'placa.5V'], ['3V3', 3.3, 'placa.3V3'], ...(nano && alimentacion.VIN > 0 ? [['VIN', 0, 'placa.VIN']] : []),
    ...fuentesExtra.map(({ ref, voltios = 0, nombre }) => [ref, voltios, ref, nombre])];
  for (const [pin, predeterminado, ref, nombre] of fuentesAArmar) {
    if (!conectado(pin) && !nano && ref.startsWith('placa.')) continue;
    const voltios = alimentacion[pin] ?? predeterminado;
    const k = nodo(ref);
    const choque = k === -1 ? 'GND' : nodosFuente.get(k);
    if (choque) {
      // Las salidas de la expansión se nombran como las ve el aprendiz, no por su identificador interno.
      const mensaje = nombre ? `${nombre[0].toUpperCase() + nombre.slice(1)} está unida directo a ${choque}: es un cortocircuito. Quita ese cable.`
        : `El pin ${pin} está unido directo a ${choque}: es un cortocircuito.`;
      fallasFijas.push({ tipo: 'cortocircuito', componente: ref, mensaje });
      continue;
    }
    nodosFuente.set(k, nombre || pin);
    const f = fuenteVoltaje(k, voltios);
    f.pin = pin;
    f.ref = ref;
    fuentes.push(f);
    elementos.push(f);
  }

  // Pines del chip que tienen algo conectado: una fuente con resistencia que cambia según el estado del pin.
  const pines = {};
  for (const pin of digitales) {
    if (!conectado(pin)) continue; // A4 y A5 cuentan también por SDA y SCL: son el mismo nodo
    pines[pin] = fuenteConResistencia(nodo('placa.' + pin));
    elementos.push(pines[pin]);
  }

  const resistencias = [];
  const leds = [];
  const potenciometros = [];
  for (const c of circuito.componentes) {
    if (c.tipo === 'resistencia') {
      const r = resistencia(nodo(c.id + '.1'), nodo(c.id + '.2'), Number(c.props.ohmios) || 1);
      resistencias.push({ id: c.id, ohmios: Number(c.props.ohmios) || 1, vatios: vatiosDe(c.props), el: r });
      if (r.a !== r.b) elementos.push(r);
    } else if (c.tipo === 'led') {
      const a = nodo(c.id + '.anodo');
      const k = nodo(c.id + '.catodo');
      const led = { id: c.id, a, k, quemado: quemados.has(c.id) };
      if (!led.quemado && a !== k) {
        // ánodo ── rs ── unión ──|>|── cátodo   (un LED quemado queda abierto: no se agrega)
        const union = n++;
        led.rs = resistencia(a, union, LED.rs);
        led.diodo = diodo(union, k, modeloLed(c.props.color));
        elementos.push(led.rs, led.diodo);
      }
      leds.push(led);
    } else if (c.tipo === 'potenciometro') {
      // GND ──[R·p]── SIG ──[R·(1−p)]── VCC   (p = posición de la perilla, 0 a 1: en 1, SIG queda pegada a VCC)
      const total = Number(c.props.ohmios) || 10000;
      const p = Math.max(0, Math.min(1, Number(c.props.posicion)));
      const gnd = nodo(c.id + '.GND');
      const sig = nodo(c.id + '.SIG');
      const vcc = nodo(c.id + '.VCC');
      const bajo = resistencia(gnd, sig, Math.max(POT.minimo, total * p));
      const alto = resistencia(sig, vcc, Math.max(POT.minimo, total * (1 - p)));
      for (const r of [bajo, alto]) if (r.a !== r.b) elementos.push(r);
      potenciometros.push({ id: c.id, ohmios: total, posicion: p, bajo, alto });
    }
  }
  fuentes.forEach((f, i) => (f.fila = n + i));

  // Grupos (por conducción) que tienen algo que fija su voltaje: GND, 5V, 3,3V, un pin de salida o una pull-up.
  function gruposManejados(estados) {
    const manejados = new Set([conduce('placa.GND1')]);
    for (const f of fuentes) manejados.add(conduce(f.ref));
    for (const pin of digitales) {
      const e = estados[pin];
      if (e === PinState.High || e === PinState.Low || e === PinState.InputPullUp) manejados.add(conduce('placa.' + pin));
    }
    return manejados;
  }
  const todasLasRefs = new Set([...usados, ...refsPlaca, ...refsExpansion, ...huecosConAlgo]);
  for (const f of fuentesExtra) todasLasRefs.add(f.ref);
  for (const c of circuito.componentes) for (const p of PATAS[c.tipo] || []) todasLasRefs.add(c.id + '.' + p);

  return {
    fallasFijas,
    // Entradas flotantes: pines en modo entrada (sin pull-up) sin ningún camino, por cables, resistencias,
    // potenciómetros o botones presionados, a GND, a 5V, a 3,3V o a un pin que los maneje. Leen al azar.
    flotantes(estados) {
      const manejados = gruposManejados(estados);
      const r = new Set();
      for (const pin of digitales) if (estados[pin] === PinState.Input && !manejados.has(conduce('placa.' + pin))) r.add(pin);
      for (const pin of analogicosSolos) if (!manejados.has(conduce('placa.' + pin))) r.add(pin);
      return r;
    },
    // Puntas (cables y patas de las piezas) que quedan al aire: un multímetro no mediría un voltaje fijo ahí.
    refsAlAire(estados) {
      const manejados = gruposManejados(estados);
      const r = new Set();
      for (const ref of todasLasRefs) if (!manejados.has(conduce(ref))) r.add(ref);
      return r;
    },
    // Cambia las salidas de alimentación sin reconstruir el cableado. El núcleo
    // invalida las soluciones guardadas cada vez que cambia alguno de estos V.
    ponerAlimentacion(voltajes) {
      voltiosGPIO = voltajes['5V'] ?? voltiosGPIO;
      for (const f of fuentes) if (voltajes[f.pin] !== undefined) f.v = voltajes[f.pin];
    },
    // Pone cada pin como lo dejó el programa.
    ponerPines(estados) {
      for (const [pin, f] of Object.entries(pines)) {
        const e = estados[pin];
        if (e === PinState.High) Object.assign(f, { v: voltiosGPIO, g: 1 / PIN.rAlto });
        else if (e === PinState.Low) Object.assign(f, { v: 0, g: 1 / PIN.rBajo });
        else if (e === PinState.InputPullUp) Object.assign(f, { v: voltiosGPIO, g: 1 / PIN.rPullUp });
        else Object.assign(f, { v: 0, g: 0 }); // entrada: no entrega ni recibe corriente
      }
    },
    // Resuelve y mide: voltaje de cada pin conectado, corriente de cada pieza y de cada pin.
    resolver() {
      const r = resolver({ nodos: n, fuentes: fuentes.length, elementos });
      const V = (ref) => {
        const i = buscar(ref);
        return i === undefined ? null : i < 0 ? 0 : r.x[i];
      };
      const voltajes = {};
      for (const ref of usados) voltajes[ref] = V(ref);
      for (const ref of refsPlaca) voltajes[ref] = V(ref);
      for (const ref of huecosConAlgo) voltajes[ref] = V(ref);
      for (const f of fuentesExtra) voltajes[f.ref] = V(f.ref);
      for (const ref of refsExpansion) voltajes[ref] = V(ref);
      for (const c of circuito.componentes) {
        for (const p of PATAS[c.tipo] || []) {
          voltajes[c.id + '.' + p] = V(c.id + '.' + p);
        }
      }
      const resta = (a, b) => (a === null || b === null ? null : a - b);
      return {
        convergio: r.convergio,
        iteraciones: r.iteraciones,
        voltajes,
        leds: leds.map((l) => {
          const i = l.diodo ? l.diodo.corriente(r.x) : 0;
          return { id: l.id, quemado: l.quemado, v: resta(V(l.id + '.anodo'), V(l.id + '.catodo')), i, brillo: Math.max(0, Math.min(1, (i * 1000) / LED.plenomA)) };
        }),
        resistencias: resistencias.map((x) => {
          const i = x.el.a === x.el.b ? 0 : x.el.corriente(r.x);
          return { id: x.id, ohmios: x.ohmios, vatios: x.vatios, v: resta(V(x.id + '.1'), V(x.id + '.2')), i, w: i * i * x.ohmios };
        }),
        pines: Object.entries(pines)
          .filter(([, f]) => f.g > 0)
          .map(([pin, f]) => ({ pin, v: V('placa.' + pin), i: f.corriente(r.x) })),
        fuentes: fuentes.map((f) => ({ pin: f.pin, i: f.corriente(r.x) })),
        // Potenciómetro: voltaje en la pata del medio (respecto a su GND) y corriente de punta a punta.
        potenciometros: potenciometros.map((x) => ({
          id: x.id,
          ohmios: x.ohmios,
          posicion: x.posicion,
          v: resta(V(x.id + '.SIG'), V(x.id + '.GND')),
          // corriente que atraviesa la pista (de VCC a GND), sin signo: como la muestran las resistencias
          i: Math.abs(x.bajo.a !== x.bajo.b ? x.bajo.corriente(r.x) : x.alto.a !== x.alto.b ? x.alto.corriente(r.x) : 0),
        })),
      };
    },
  };
}

// Revisa la medición contra los límites de cada pieza. `activas` son las no idealidades encendidas.
export function revisarFallas(m, activas) {
  const mA = (i) => (Math.abs(i) * 1000).toFixed(0);
  const fallas = [];
  if (activas.danoComponentes) {
    for (const l of m.leds) {
      if (!l.quemado && l.i * 1000 > LED.quemamA) {
        fallas.push({
          tipo: 'led_quemado',
          componente: l.id,
          corriente_mA: +(l.i * 1000).toFixed(1),
          mensaje: `El LED ${l.id} se quemó: le pasaron ${mA(l.i)} mA y aguanta unos ${LED.normalmA} mA. Ponle una resistencia en serie (220 Ω sirve).`,
        });
      }
    }
    for (const r of m.resistencias) {
      const aguanta = r.vatios || 0.25;
      if (r.w > aguanta) {
        // Si una de ½ W alcanza, se dice: el kit las tiene.
        const otra = aguanta < 0.5 && r.w <= 0.5 ? ' o una de ½ W' : '';
        fallas.push({
          tipo: 'resistencia_caliente',
          componente: r.id,
          potencia_W: +r.w.toFixed(2),
          mensaje: `La resistencia ${r.id} se calienta: disipa ${r.w.toFixed(2).replace('.', ',')} W y aguanta ${String(aguanta).replace('.', ',')} W. Usa una de más ohmios${otra}.`,
        });
      }
    }
  }
  if (activas.limitePin) {
    for (const p of m.pines) {
      if (Math.abs(p.i) * 1000 > PIN.maxmA) {
        const nombre = p.pin.startsWith('D') ? 'pin ' + p.pin.slice(1) : 'pin ' + p.pin;
        fallas.push({
          tipo: 'corriente_pin',
          componente: 'placa.' + p.pin,
          corriente_mA: +(Math.abs(p.i) * 1000).toFixed(1),
          mensaje: `El ${nombre} entrega ${mA(p.i)} mA y aguanta ${PIN.maxmA} mA: en la placa real se puede dañar. Revisa que haya una resistencia.`,
        });
      }
    }
    // El chip entero: cada pin puede estar bajo 40 mA y aun así la suma pasar de 200 mA por VCC (pines en ALTO
    // que entregan) o por GND (pines en BAJO que reciben). Son dos sumas aparte: una corriente no pasa por las dos.
    const entrega = m.pines.reduce((t, p) => t + Math.max(0, p.i), 0);
    const recibe = m.pines.reduce((t, p) => t + Math.max(0, -p.i), 0);
    for (const [suma, pata, verbo] of [[entrega, 'VCC', 'entregan'], [recibe, 'GND', 'reciben']]) {
      if (suma * 1000 > PIN.chipMaxmA) {
        fallas.push({
          tipo: 'corriente_chip',
          componente: 'placa.' + pata, // VCC y GND se avisan aparte (una falla por tipo y componente)
          corriente_mA: +(suma * 1000).toFixed(1),
          mensaje: `Entre todos, los pines ${verbo} ${mA(suma)} mA y el chip aguanta ${PIN.chipMaxmA} mA en total: en la placa real se puede dañar. Usa resistencias más grandes o menos pines a la vez.`,
        });
      }
    }
  }
  return fallas;
}
