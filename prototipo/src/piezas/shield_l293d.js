// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: shield de motores L293D (Rev4 del kit)
//
// Vista medida por TecnoDiseñador desde la shield del ambiente (src/piezas/vistas/shield_l293d.js, con su registro).
// Usa el mismo marco que el Uno (72,58 × 53,34 mm, con 4 mm a la izquierda para el USB) y sus agujeros apilables
// quedan sobre los pines del Uno, que se siguen pudiendo cablear desde arriba, como en la placa real. Es el diseño R2:
// no tiene agujeros sobre SCL, SDA ni IOREF del Uno, que quedan tapados (TAPA_SHIELD).
//
// Por dentro (modelo lógico en src/potencia.js):
//   74HC595 (IC3): datos por el pin 8, reloj por el 4, cerrojo por el 12 y habilitación (activa en BAJO) por el 7.
//   L293D (IC1 e IC2): dos puentes H cada uno. Velocidad por PWM: M1 = 11, M2 = 3, M3 = 6, M4 = 5.
//   Qué salida del 74HC595 va a cada motor (A, B): M1 = Q2, Q3 · M2 = Q1, Q4 · M3 = Q5, Q7 · M4 = Q0, Q6.
//   Datos de la librería del kit (AFMotor_R4, BSD-3) y de las hojas de datos; por confirmar con continuidad en la placa.
//   Servos: SERVO_1 = pin 10 (arriba) y SERVO_2 = pin 9, alimentados por el 5V del Uno; pines «− + S».
//   Headers analógicos «+5», «Gnd» y «A0-5»: A0 a A5 del Uno con su 5V y su GND (por confirmar con continuidad).
//   EXT_PWR: la alimentación de los motores. Con el puente PWR puesto, también alimenta el Vin del Uno.

import VISTA_SHIELD from './vistas/shield_l293d.js';
import { tamanoDe, pinesDe, svgDe, mostrarLeds } from './vista_td.js';

// Los /* @__PURE__ */ dejan que el Worker, que llega aquí por los puentes eléctricos, se arme sin el dibujo.
export const TAMANO_SHIELD = /* @__PURE__ */ tamanoDe(VISTA_SHIELD);
// Puntos de conexión: bornes de tornillo, EXT_PWR, pines de los servos y headers analógicos.
export const PINES_SHIELD = /* @__PURE__ */ pinesDe(VISTA_SHIELD);
// Pines del Uno que la shield tapa (no tiene agujero encima): no se cablean ni reciben patas mientras está montada.
export const TAPA_SHIELD = ['SCL', 'SDA', 'IOREF'];

const ANALOGICOS = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
export const ROTULOS_SHIELD = {
  M1A: 'M1 · borne A del motor 1', M1B: 'M1 · borne B del motor 1',
  M2A: 'M2 · borne A del motor 2', M2B: 'M2 · borne B del motor 2',
  M3A: 'M3 · borne A del motor 3', M3B: 'M3 · borne B del motor 3',
  M4A: 'M4 · borne A del motor 4', M4B: 'M4 · borne B del motor 4',
  GND_IZQ: 'GND · tierra (−)', GND_DER: 'GND · tierra (−)',
  EXT_POS: 'EXT_PWR + · batería de los motores (+)', EXT_GND: 'EXT_PWR GND · batería de los motores (−)',
  S1_SIG: 'SERVO_1 · señal (pin 10)', S1_POS: 'SERVO_1 · + (5V)', S1_GND: 'SERVO_1 · − (GND)',
  S2_SIG: 'SERVO_2 · señal (pin 9)', S2_POS: 'SERVO_2 · + (5V)', S2_GND: 'SERVO_2 · − (GND)',
  ...Object.fromEntries(ANALOGICOS.flatMap((a) => [
    [`${a}_S`, `${a} · señal (el mismo ${a} del Uno)`],
    [`${a}_V`, `${a} · +5: alimentación de 5V (+)`],
    [`${a}_G`, `${a} · Gnd: tierra (−)`],
  ])),
};
// Cómo usa la shield los pines del Uno, como lo hace AFMotor_R4 (la librería del kit, BSD-3). Es la fuente única: la usan
// el simulador (src/potencia.js) y la netlist de KiCad con la shield desarmada (src/kicad.js).
//   74HC595: datos, reloj, cierre (latch) y habilitación (OE, activa en BAJO).
//   pwm: el pin de velocidad de cada motor (va a la habilitación de su canal del L293D).
//   bits: qué salida Q del 74HC595 da el sentido A y B de cada motor.
export const CONEXIONES_SHIELD = {
  datos: 'D8',
  reloj: 'D4',
  cierre: 'D12',
  habilita: 'D7',
  pwm: { 1: 'D11', 2: 'D3', 3: 'D6', 4: 'D5' },
  bits: { 1: { A: 2, B: 3 }, 2: { A: 1, B: 4 }, 3: { A: 5, B: 7 }, 4: { A: 0, B: 6 } },
};

// Lo que la shield une por dentro con el Uno (para las conexiones del circuito).
export const PUENTES_SHIELD = [
  ['S1_SIG', 'placa.D10'], ['S2_SIG', 'placa.D9'],
  ['S1_POS', 'placa.5V'], ['S2_POS', 'placa.5V'],
  ['S1_GND', 'placa.GND1'], ['S2_GND', 'placa.GND1'],
  ['GND_IZQ', 'placa.GND1'], ['GND_DER', 'placa.GND1'], ['EXT_GND', 'placa.GND1'],
  ...ANALOGICOS.flatMap((a) => [[`${a}_S`, `placa.${a}`], [`${a}_V`, 'placa.5V'], [`${a}_G`, 'placa.GND1']]),
];

// Mientras se simula, el LED de la shield se prende si los motores tienen energía. El color apagado de la entrega
// (#7fe08e, el de un LED verde difuso) se ve casi igual al encendido: un aprendiz creería que los motores tienen
// batería. Apagado se usa un verde oscuro; encendido, el de la entrega.
const APAGADO_PWR = '#2b6a3a';
export function mostrarShield(svg, estado) {
  const leds = { PWR: { apagado: APAGADO_PWR, encendido: VISTA_SHIELD.leds.PWR.encendido } };
  mostrarLeds(svg, leds, { leds: { PWR: estado && estado.motoresV > 1 ? 1 : 0 } });
}

// El capuchón del puente PWR es la parte `puente-pwr`: la vista lo trae puesto y `aplicarShield` lo oculta si se quita
// en la ficha (el lienzo la llama al crear la pieza y al cambiar la propiedad).
export function dibujarShield() {
  return svgDe(VISTA_SHIELD, {
    titulo: 'Shield de motores L293D',
    descripcion: 'Shield L293D Rev4 del kit, medida por TecnoDiseñador. M1–M4: motores; EXT_PWR: su batería; SERVO_1 (pin 10) y SERVO_2 (pin 9); headers +5, Gnd y A0-5.',
  });
}

// Muestra u oculta el capuchón según `puentePWR`, sin rehacer el dibujo.
export function aplicarShield(svg, props = {}) {
  const parte = svg.querySelector('[data-parte="puente-pwr"]');
  if (!parte) return;
  if (props.puentePWR === false) parte.setAttribute('display', 'none');
  else parte.removeAttribute('display');
}
