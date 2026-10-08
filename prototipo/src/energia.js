// El 5V de la placa cuando se alimenta por USB (Uno R3), y lo que pasa cuando se le pide demasiado corriente
// (no idealidad «limiteUSB», tarea T3). No toca la página: lo usa el núcleo cada milisegundo simulado.
//
//   USB del PC (5,0 V) ──[fusible reajustable]──[cable, transistor ≈ 0,4 Ω]── 5V de la placa ── circuito y servos
//
//   1. Caída: el 5V baja con la corriente (unos 4,8 V a 500 mA). Los servos giran más lento.
//   2. Golpe de corriente: si se pide más de lo que el puerto del PC deja pasar de golpe, su voltaje se cae y el
//      ATmega se reinicia por bajo voltaje (brown-out). Pasa cuando varios servos arrancan a la vez.
//   3. Fusible: el del Uno (MF-MSMF050-2) sostiene 500 mA y se dispara desde 1 A (0,15 s a 8 A). Si se le pide
//      más de 500 mA por un rato, se calienta, se abre y la placa se apaga hasta que se enfría.
//
// Los datos del fusible y del brown-out son de las hojas de datos. La resistencia del camino y el límite del puerto
// son valores de partida: cambian con cada PC y cada cable, y se ajustan en el aula (cuántos servos aguanta).
export const USB = {
  voltios: 5.0,
  ohmios: 0.4,
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

// Voltaje del 5V con `amperios` pedidos al USB (sin el corte del puerto ni el fusible).
export const voltaje5V = (amperios) => Math.max(0, USB.voltios - amperios * USB.ohmios);
