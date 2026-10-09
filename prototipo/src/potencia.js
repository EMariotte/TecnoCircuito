// Potencia (tarea T3): la shield L293D Rev4, los motores TT y la batería LiPo. Lo usa el núcleo cada milisegundo.
//
//   pines 8, 4, 12 y 7 ──► 74HC595 (registro) ──► sentido de cada motor (A y B) ─┐
//   pines 11, 3, 6 y 5 ──► PWM (habilitación) ───────────────────────────────────┼──► L293D (puente H) ──► M1 a M4
//   batería en EXT_PWR ──► VS de los L293D (con el puente PWR, también el VIN del Uno) ───────────┘
//
// Conexiones de la shield, como las usa AFMotor_R4 (la librería del kit, BSD-3):
//   - 74HC595: datos D8, reloj D4, cierre (latch) D12 y habilitación (OE, activa en BAJO) D7. shiftOut va MSBFIRST:
//     después de 8 pulsos de reloj, el bit 7 queda en Q7. Con el cierre, las salidas toman lo que hay en el registro.
//   - Bits (A, B) de cada motor: M1 = Q2, Q3 · M2 = Q1, Q4 · M3 = Q5, Q7 · M4 = Q0, Q6.
//     FORWARD: A = 1, B = 0. BACKWARD: A = 0, B = 1. RELEASE: los dos en 0 (con PWM, el puente une los bornes y frena).
//   - PWM: M1 = 11, M2 = 3, M3 = 6, M4 = 5. Sin PWM (pin en 0 o de entrada), el puente queda abierto y el motor gira libre.
//
// Caída del L293D (no idealidad «caidaL293D»): sus transistores son bipolares y se comen 1,4 V más 1 V por amperio
// (hoja de datos: 1,4 V típico a poca corriente, hasta unos 2 V cerca de 0,6 A). Con la batería llena (8,4 V) al motor
// le llegan unos 6,8 V. Por medir con el multímetro en la placa del kit.
//
// El PWM se promedia en cada milisegundo: el motor siente el voltaje medio (ciclo útil × voltaje), porque su
// inductancia y su inercia filtran los pulsos. El voltaje de la batería baja con la corriente (resistencia interna).
import { crearMotor } from './piezas/motor_tt.js';
import { LIPO, voltiosLipo } from './piezas/bateria_lipo.js';
import { PinState } from './chip.js';

export const SHIELD = {
  pinDatos: 'D8',
  pinReloj: 'D4',
  pinCierre: 'D12',
  pinHabilita: 'D7',
  pwm: { 1: 'D11', 2: 'D3', 3: 'D6', 4: 'D5' },
  bits: { 1: { A: 2, B: 3 }, 2: { A: 1, B: 4 }, 3: { A: 5, B: 7 }, 4: { A: 0, B: 6 } },
  caidaV: 1.4, // caída del puente H con poca corriente
  caidaPorA: 1.0, // y lo que sube por cada amperio
  maximoCanalA: 0.6, // corriente continua por canal del L293D
  avisoCanalMs: 500, // pasada de 0,6 A por este tiempo: se calienta
};
// El Uno toma su energía del VIN (por el regulador) cuando el VIN pasa de 6,6 V: un comparador apaga la del USB.
export const VIN_MINIMO_V = 6.6;
const PLACA_POR_VIN_A = 0.06;
// El PWM de los motores va a unos 1000 Hz: un milisegundo puede tener uno o dos pulsos. El ciclo útil se suaviza con
// esta constante de tiempo (unos pocos períodos), como lo hace la inductancia del motor con la corriente.
const PWM_MS = 4;
const SUAVE = 1 - Math.exp(-1 / PWM_MS); // lo que pide la placa al VIN (el regulador y el ATmega)
const PINES = ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
const coma = (n, dec = 1) => n.toFixed(dec).replace('.', ',');

export function crearPotencia({ activas, avisar }) {
  let shield = null; // { id, puente }
  let motores = new Map(); // id → { logico, lado, a, b, canal, iAntes, sumaV, sumaI, ms, sobreMs }
  let baterias = new Map(); // id → { carga, voc, v, valida, motores, vin, iAntes, sumaI, ms }
  let registro = 0; // lo que entró por el pin de datos
  let salidas = 0; // lo que muestran Q0 a Q7 (desde el último cierre)
  let habilitada = false; // OE en BAJO
  // PWM de cada pin de motor, en el milisegundo actual: si está en ALTO, desde cuándo, y cuántos ciclos lleva en ALTO.
  const pwm = {};
  let inicioMs = 0;
  let ciclo = {}; // ciclo útil de cada pin, suavizado (ver PWM_MS)
  let vs = 0; // voltaje de los motores (VS de los L293D)
  let vin = 0; // voltaje en el VIN del Uno (de la batería)
  let vsSuma = 0;
  let vsMs = 0;

  function reiniciarPWM() {
    for (const pin of Object.values(SHIELD.pwm)) pwm[pin] = { alto: false, desde: 0, acum: 0, cambios: 0, quieto: 0 };
    inicioMs = 0;
    ciclo = {};
  }
  reiniciarPWM();

  // Qué hay en el circuito y cómo está conectado. `raiz` da el nodo de cada pin (conexiones.calcularNodos).
  function armar(circuito, raiz) {
    const mismo = (a, b) => raiz(a) === raiz(b);
    const GND = 'placa.GND1';
    const c = circuito.componentes.find((k) => k.tipo === 'shield_l293d');
    shield = c ? { id: c.id, puente: !c.props || c.props.puentePWR !== false } : null;
    const nuevas = new Map();
    for (const k of circuito.componentes) {
      if (k.tipo !== 'bateria_lipo') continue;
      const carga = (k.props && k.props.carga) || 'nominal';
      const voc = voltiosLipo(carga);
      const antes = baterias.get(k.id);
      const POS = k.id + '.POS';
      const NEG = k.id + '.NEG';
      const b = { carga, voc, v: antes && antes.carga === carga ? antes.v : voc, iAntes: 0, sumaI: 0, ms: 0, motores: false, vin: false, valida: false };
      if (carga === 'descargada') {
        avisar({
          tipo: 'bateria_baja',
          componente: k.id,
          mensaje: `La batería ${k.id} está descargada: ${coma(voc)} V, ${coma(voc / LIPO.celdas, 2)} V por celda. Corre el riesgo de perder sus celdas: por debajo de ${coma(LIPO.minimoCeldaV)} V por celda una LiPo se daña y puede inflarse. Cárgala antes de seguir.`,
        });
      }
      const conectada = (ref) => (shield && mismo(ref, shield.id + '.EXT_POS')) || mismo(ref, 'placa.VIN') || mismo(ref, 'placa.5V');
      if (mismo(POS, NEG)) {
        avisar({ tipo: 'bateria_corto', componente: k.id, mensaje: `Los dos cables de la batería ${k.id} están unidos: es un cortocircuito. Una LiPo en corto se calienta y puede incendiarse. Quita ese cable.` });
      } else if (mismo(POS, GND) && conectada(NEG)) {
        avisar({ tipo: 'bateria_invertida', componente: k.id, mensaje: `La batería ${k.id} está al revés: el cable rojo (+) va a GND. Pon el rojo en + y el negro en −.` });
      } else if (mismo(NEG, GND)) {
        b.valida = true;
        if (mismo(POS, 'placa.5V')) {
          b.valida = false;
          avisar({ tipo: 'bateria_en_5v', componente: k.id, mensaje: `La batería ${k.id} está en el pin 5V: sus ${coma(voc)} V dañan la placa, que funciona a 5 V. Conéctala a EXT_PWR de la shield o al pin VIN.` });
        }
        b.motores = b.valida && !!shield && mismo(POS, shield.id + '.EXT_POS');
        b.vin = b.valida && mismo(POS, 'placa.VIN');
      }
      nuevas.set(k.id, b);
    }
    baterias = nuevas;
    // Cada borne de un motor: a qué va (un borne de la shield, GND, 5V, la batería, un pin del chip o nada).
    const borne = (ref) => {
      if (shield) {
        for (const n of [1, 2, 3, 4]) for (const s of ['A', 'B']) if (mismo(ref, `${shield.id}.M${n}${s}`)) return { tipo: 'shield', n, s };
      }
      if (mismo(ref, GND)) return { tipo: 'gnd' };
      if (mismo(ref, 'placa.5V')) return { tipo: '5v' };
      for (const [id, b] of baterias) if (b.valida && mismo(ref, id + '.POS')) return { tipo: 'bateria', id };
      const pin = PINES.find((p) => mismo(ref, 'placa.' + p));
      if (pin) return { tipo: 'pin', pin };
      return null;
    };
    const otros = new Map();
    for (const k of circuito.componentes) {
      if (k.tipo !== 'motor_tt') continue;
      const antes = motores.get(k.id);
      const m = antes || { logico: crearMotor(), iAntes: 0, sumaV: 0, sumaI: 0, ms: 0, sobreMs: 0 };
      m.lado = (k.props && k.props.lado) || 'izquierdo';
      m.a = borne(k.id + '.A');
      m.b = borne(k.id + '.B');
      const enShield = [m.a, m.b].filter((x) => x && x.tipo === 'shield');
      m.canal = enShield.length ? 'M' + enShield[0].n : null;
      const enPin = [m.a, m.b].find((x) => x && x.tipo === 'pin');
      if (enPin) {
        avisar({
          tipo: 'motor_en_pin',
          componente: k.id,
          mensaje: `El motor ${k.id} está conectado al pin ${enPin.pin.replace(/^D/, '')}: un pin da hasta 40 mA y el motor pide 150 mA o más (más de 1 A al arrancar). Conéctalo a los bornes M1 a M4 de la shield.`,
        });
      }
      otros.set(k.id, m);
    }
    motores = otros;
  }

  // Un cambio en los pines del chip: el registro 74HC595 y el PWM de los motores.
  function pinesCambiaron(cambios, ahora, ciclos) {
    if (!shield) return;
    const alto = (pin) => ahora[pin] === PinState.High;
    if (SHIELD.pinReloj in cambios && alto(SHIELD.pinReloj)) registro = ((registro << 1) | (alto(SHIELD.pinDatos) ? 1 : 0)) & 0xff;
    if (SHIELD.pinCierre in cambios && alto(SHIELD.pinCierre)) salidas = registro;
    if (SHIELD.pinHabilita in cambios) habilitada = ahora[SHIELD.pinHabilita] === PinState.Low;
    for (const pin of Object.values(SHIELD.pwm)) {
      if (!(pin in cambios)) continue;
      const p = pwm[pin];
      const sube = cambios[pin] === PinState.High;
      p.cambios = (p.cambios || 0) + 1;
      if (sube && !p.alto) Object.assign(p, { alto: true, desde: ciclos });
      else if (!sube && p.alto) {
        p.acum += ciclos - p.desde;
        p.alto = false;
      }
    }
  }

  // Un chip nuevo (reinicio): sus pines vuelven a ser entradas, así que la shield queda deshabilitada. El 74HC595 no se
  // reinicia: conserva lo que tenía.
  function reiniciarChip() {
    habilitada = false;
    reiniciarPWM();
  }

  // Cada milisegundo simulado. `v5`: el 5V de la placa; `logica`: el 74HC595 tiene energía.
  // Devuelve lo que los motores le piden al 5V (motor conectado directo al 5V) y si el Uno se alimenta por el VIN.
  function cadaMs(ciclos, { v5, logica }) {
    const dur = ciclos - inicioMs;
    for (const [pin, p] of Object.entries(pwm)) {
      if (p.alto) {
        p.acum += ciclos - p.desde;
        p.desde = ciclos;
      }
      const ahora = dur > 0 ? Math.min(1, p.acum / dur) : 0;
      const antes = ciclo[pin] || 0;
      // Quieto en 0 o en 1 (digitalWrite, analogWrite 0 o 255): exacto, sin esperar.
      ciclo[pin] = ahora === 0 || ahora === 1 ? (p.quieto >= PWM_MS ? ahora : antes + SUAVE * (ahora - antes)) : antes + SUAVE * (ahora - antes);
      p.quieto = p.cambios ? 0 : (p.quieto || 0) + 1;
      p.cambios = 0;
      p.acum = 0;
    }
    inicioMs = ciclos;
    // Voltaje de los motores (VS) y del VIN: el de la batería que llega ahí (del milisegundo anterior).
    vs = 0;
    vin = 0;
    for (const b of baterias.values()) {
      if (b.motores) vs = Math.max(vs, b.v);
      if (b.vin) vin = Math.max(vin, b.v);
    }
    const porVin = vin >= VIN_MINIMO_V;
    const encendida = logica || porVin;
    const iBateria = new Map();
    const sumarBateria = (id, a) => iBateria.set(id, (iBateria.get(id) || 0) + a);
    const deLosMotores = (a) => {
      for (const [id, b] of baterias) if (b.motores) return sumarBateria(id, a);
    };
    let i5V = 0;
    // Voltaje de cada borne: { v, d (fracción del tiempo que está manejado), shield } o null (al aire).
    const nivel = (x) => {
      if (!x) return null;
      if (x.tipo === 'shield') {
        if (!encendida || !habilitada) return null;
        const bit = (salidas >> SHIELD.bits[x.n][x.s]) & 1;
        return { v: bit ? vs : 0, d: ciclo[SHIELD.pwm[x.n]] || 0, shield: true };
      }
      if (x.tipo === 'gnd') return { v: 0, d: 1 };
      if (x.tipo === '5v') return { v: v5, d: 1, del5V: true };
      if (x.tipo === 'bateria') return { v: (baterias.get(x.id) || { v: 0 }).v, d: 1, bateria: x.id };
      return null; // un pin del chip: ya se avisó; no mueve el motor
    };
    let sinEnergia = false;
    for (const [id, m] of motores) {
      const a = nivel(m.a);
      const b = nivel(m.b);
      const d = a && b ? Math.min(a.d, b.d) : 0;
      if (!d) {
        m.vAhora = 0;
        m.logico.avanzar(1, 0, { conectado: false }); // puente abierto: gira libre y se detiene solo
      } else {
        const dif = a.v - b.v;
        const nShield = (a.shield ? 1 : 0) + (b.shield ? 1 : 0);
        let v = 0;
        if (Math.abs(dif) > 1e-9) {
          const caida = activas.caidaL293D && nShield ? (nShield / 2) * (SHIELD.caidaV + SHIELD.caidaPorA * Math.abs(m.iAntes)) : 0;
          v = Math.sign(dif) * Math.max(0, Math.abs(dif) - caida) * d;
        }
        m.vAhora = v;
        m.logico.avanzar(1, v, { conectado: true }); // con dif = 0 (los dos bornes iguales) el puente frena el motor
        if (nShield === 2 && (salidas >> SHIELD.bits[m.a.n][m.a.s] & 1) !== (salidas >> SHIELD.bits[m.b.n][m.b.s] & 1) && vs < 1) sinEnergia = true;
        // La corriente que sale de la fuente del borne más alto (solo la que va en el sentido en que empuja).
        const iMotor = m.logico.estado().i;
        const alto = dif >= 0 ? a : b;
        const iFuente = Math.max(0, iMotor * Math.sign(dif || 1)) * d;
        if (alto.shield) deLosMotores(iFuente);
        else if (alto.del5V) i5V += iFuente;
        else if (alto.bateria) sumarBateria(alto.bateria, iFuente);
      }
      const e = m.logico.estado();
      m.iAntes = e.i;
      m.sumaI += Math.abs(e.i);
      m.sumaV += Math.abs(m.vAhora || 0);
      m.ms++;
      // Más de 0,6 A por un canal del L293D por medio segundo: se calienta.
      const enShield = (m.a && m.a.tipo === 'shield') || (m.b && m.b.tipo === 'shield');
      m.sobreMs = enShield && Math.abs(e.i) > SHIELD.maximoCanalA ? m.sobreMs + 1 : 0;
      if (m.sobreMs > SHIELD.avisoCanalMs) {
        avisar({
          tipo: 'l293d_corriente',
          componente: id,
          mensaje: `El motor ${id} pide ${coma(Math.abs(e.i))} A y cada canal del L293D da hasta 0,6 A: el integrado se calienta y puede apagarse. Revisa que la rueda no esté trabada.`,
        });
      }
    }
    if (sinEnergia && shield) {
      avisar({
        tipo: 'motores_sin_energia',
        componente: shield.id,
        mensaje: `El programa manda a girar los motores, pero la shield no tiene energía para ellos: el USB no alimenta los bornes M1 a M4. Conecta la batería a EXT_PWR (rojo en +, negro en −).`,
      });
    }
    // La batería: su voltaje baja con la corriente que entrega (resistencia interna).
    for (const [id, b] of baterias) {
      if (!b.valida) continue;
      const amperios = (iBateria.get(id) || 0) + (b.vin && porVin ? PLACA_POR_VIN_A : 0);
      b.v = Math.max(0, b.voc - LIPO.ohmios * amperios);
      b.iAntes = amperios;
      b.sumaI += amperios;
      b.ms++;
      if (b.v / LIPO.celdas < LIPO.minimoCeldaV) {
        avisar({
          tipo: 'bateria_celdas',
          componente: id,
          mensaje: `La batería ${id} bajó a ${coma(b.v, 2)} V con los motores: menos de ${coma(LIPO.minimoCeldaV)} V por celda. Así se dañan las celdas: cárgala.`,
        });
      }
    }
    vsSuma += vs;
    vsMs++;
    return { i5V, porVin };
  }

  // Lo que se ve de cada pieza y lo que mide un multímetro, promediado desde la foto anterior.
  function foto() {
    const piezas = {};
    const lista = { motores: [], baterias: [], shield: null };
    for (const [id, m] of motores) {
      const e = m.logico.estado();
      const r = { rpm: e.rpm, giro: e.giro, velocidad: e.velocidad, i: m.ms ? m.sumaI / m.ms : Math.abs(e.i), voltios: m.ms ? m.sumaV / m.ms : 0 };
      piezas[id] = r;
      lista.motores.push({ id, canal: m.canal, lado: m.lado, ...r });
      Object.assign(m, { sumaI: 0, sumaV: 0, ms: 0 });
    }
    for (const [id, b] of baterias) {
      const r = { voltios: b.valida ? b.v : b.voc, i: b.ms ? b.sumaI / b.ms : 0, carga: b.carga, conectada: b.motores || b.vin };
      piezas[id] = r;
      lista.baterias.push({ id, ...r });
      Object.assign(b, { sumaI: 0, ms: 0 });
    }
    if (shield) {
      const motoresV = vsMs ? vsSuma / vsMs : vs;
      piezas[shield.id] = { motoresV };
      lista.shield = { id: shield.id, motoresV, puente: shield.puente, habilitada, salidas };
    }
    vsSuma = 0;
    vsMs = 0;
    return { piezas, lista };
  }

  return {
    armar,
    pinesCambiaron,
    reiniciarChip,
    cadaMs,
    foto,
    get hay() {
      return !!shield || motores.size > 0 || baterias.size > 0;
    },
  };
}
