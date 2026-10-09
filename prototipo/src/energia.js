// El 5V de la placa cuando se alimenta por USB (Uno R3), y lo que pasa cuando se le pide demasiado corriente
// (no idealidad «limiteUSB», tarea T3). No toca la página: lo usa el núcleo cada milisegundo simulado.
//
//   USB del PC (5,11 V) ──[cable, puerto, fusible y transistor ≈ 1,66 Ω]── 5V de la placa ── circuito y servos
//
//   1. Caída: el 5V baja con la corriente. Los servos giran más lento y empujan menos.
//   2. Reinicio: si varios servos arrancan a la vez, el 5V se hunde; por debajo de 2,7 V el ATmega se reinicia por
//      bajo voltaje (brown-out). Un servo arrancando se comporta como una resistencia (pide menos si el voltaje
//      baja), así que el 5V se calcula junto con los servos en cada milisegundo (voltajeConServos).
//   3. Golpe al puerto: si aun así se piden más de 1,5 A, el puerto del PC corta (valor de partida, sin medir).
//   4. Fusible: el del Uno (MF-MSMF050-2) sostiene 500 mA y se dispara desde 1 A (0,15 s a 8 A). Si se le pide
//      más de 500 mA por un rato, se calienta, se abre y la placa se apaga hasta que se enfría.
//
// Medido el 9 oct 2026 en un PC del aula (HP ProBook 450 G7) con el cable del kit (validacion/2026-10-09-usb-5v.md):
// 5,06 V sin servos y 4,80, 4,68, 4,55 y 4,30 V con 1 a 4 SG90 moviéndose: la recta es 5,11 V − 1,66 Ω × corriente.
// Con 4 SG90 moviéndose a la vez la placa NO se reinició: el modelo da 2,8 V en el arranque, apenas sobre 2,7 V.
export const USB = {
  voltios: 5.11,
  ohmios: 1.66,
  idealV: 5.0, // con «limiteUSB» apagada: un 5V perfecto
  limitePuertoA: 1.5,
  placaA: 0.05, // lo que consume la placa sola (ATmega328P, el chip USB y el LED ON)
  bodV: 2.7, // reinicio por bajo voltaje del ATmega328P con los fusibles del Uno (BODLEVEL 2,7 V)
  fusible: { sostieneA: 0.5, disparaA: 1.0, segundosA8A: 0.15, enfriaS: 3 },
};

// Fusible reajustable (PTC): se calienta con la corriente que pasa de la que sostiene, se abre al llegar a su
// límite y se cierra otra vez cuando se enfría. `calor` va de 0 (frío) a 1 (se dispara).
export function crearFusible() {
  const { sostieneA, segundosA8A, enfriaS } = USB.fusible;
  const k = (8 ** 2 - sostieneA ** 2) * segundosA8A; // A²·s: a 8 A se dispara en 0,15 s
  let calor = 0;
  let abierto = false;
  return {
    avanzar(ms, amperios) {
      const s = ms / 1000;
      if (!abierto && amperios > sostieneA) calor += ((amperios ** 2 - sostieneA ** 2) / k) * s;
      else calor = Math.max(0, calor - s / enfriaS); // se enfría (abierto, casi no pasa corriente)
      if (calor >= 1) abierto = true;
      if (abierto && calor === 0) abierto = false;
    },
    get abierto() {
      return abierto;
    },
    get calor() {
      return calor;
    },
    reiniciar() {
      calor = 0;
      abierto = false;
    },
  };
}

// Voltaje del 5V con `fijoA` amperios que no dependen del voltaje (la placa y el circuito) y cargas que sí: los servos,
// con `siemens` = amperios por voltio en total. V = 5,11 − 1,66·(fijo + siemens·V)  →  V = (5,11 − 1,66·fijo) / (1 + 1,66·siemens).
export const voltajeConServos = (fijoA, siemens = 0) => Math.max(0, (USB.voltios - USB.ohmios * fijoA) / (1 + USB.ohmios * siemens));
