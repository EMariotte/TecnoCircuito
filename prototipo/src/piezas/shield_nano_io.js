// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: expansión E/S para Nano clásico
//
// Vistas roja y azul medidas por TecnoDiseñador desde la expansión del ambiente (src/piezas/vistas/, con su registro).
// Comparten el marco de la familia Nano: el Nano va encima, en su lugar, sin ventana (el lienzo ordena las capas).
// Modelo de referencia: polaridad del jack, reguladores y conexiones reales de cada variante siguen pendientes de
// continuidad en el kit. Se conserva un único Nano/ATmega328P: esta pieza distribuye señales y alimentación.

import VISTA_ROJA from './vistas/shield_nano_io_roja.js';
import VISTA_AZUL from './vistas/shield_nano_io_azul.js';
import { tamanoDe, pinesDe, svgDe, mostrarLeds } from './vista_td.js';

// Los /* @__PURE__ */ dejan que el Worker, que solo usa los puentes eléctricos, se arme sin los dibujos.
export const TAMANO_EXPANSION = /* @__PURE__ */ tamanoDe(VISTA_ROJA);
const DIGITALES = Array.from({ length: 14 }, (_, i) => `D${13 - i}`);
const ANALOGICOS = Array.from({ length: 8 }, (_, i) => `A${i}`);
const CANALES = [...DIGITALES, ...ANALOGICOS];
// El bloque de seis contactos de la placa real son tres 3V3 (arriba) y tres GND (abajo), de izquierda a derecha
// (medido por TecnoDiseñador; contrato del 14 oct).
const EXTRAS = ['I2C_SDA', 'I2C_SCL', 'I2C_V', 'I2C_G',
  'UART_TX', 'UART_RX', 'UART_V', 'UART_G', 'OUT_3V3', 'OUT_3V3_2', 'OUT_3V3_3', 'GND_OUT', 'GND_OUT_2', 'GND_OUT_3', 'JACK_POS', 'JACK_GND'];
export const PINES_EXPANSION = [...CANALES.flatMap((pin) => ['S', 'V', 'G'].map((fila) => `${pin}_${fila}`)), ...EXTRAS];

// Nombres heredados del primer diseño de referencia, sin contacto en la placa medida. SPI_*: el bloque de seis era
// SPI y es alimentación (confirmado por Efraín). OUT_5V/OUT_5V_2: ese bloque no tiene 5V (TecnoDiseñador, 13 oct).
// Fuente única: un cable antiguo conserva su red (PUENTES_EXPANSION) y se dibuja sobre ese pin del Nano (lienzo).
export const ALIASES_EXPANSION = Object.freeze({
  SPI_MISO: 'D12', SPI_MOSI: 'D11', SPI_SCK: 'D13', SPI_SS: 'D10', SPI_V: '5V', SPI_G: 'GND1', OUT_5V: '5V', OUT_5V_2: '5V',
});
// Los rieles de alimentación de la expansión, con sus aliases: la red los mide aunque no tengan cable (motor/red.js).
export const RIELES_EXPANSION = [...Object.keys(ALIASES_EXPANSION).filter((p) => p.startsWith('OUT_')),
  ...EXTRAS.filter((p) => /^(OUT_|GND_OUT|JACK_)/.test(p))];

// Fuente única para señales y rieles compartidos con el módulo.
// JACK_POS y OUT_3V3 son nodos privados de la expansión: su regulación se modela aparte.
// Unirlos a VIN/3V3 del Nano pondría en paralelo reguladores que aquí son independientes.
export const PUENTES_EXPANSION = [
  ...CANALES.flatMap((pin) => [[`${pin}_S`, `placa.${pin}`], [`${pin}_V`, 'placa.5V'], [`${pin}_G`, 'placa.GND1']]),
  ['I2C_SDA', 'placa.A4'], ['I2C_SCL', 'placa.A5'], ['I2C_V', 'placa.5V'], ['I2C_G', 'placa.GND1'],
  ...Object.entries(ALIASES_EXPANSION).map(([alias, pin]) => [alias, `placa.${pin}`]),
  ['UART_TX', 'placa.D1'], ['UART_RX', 'placa.D0'], ['UART_V', 'placa.5V'], ['UART_G', 'placa.GND1'],
  ['GND_OUT', 'placa.GND1'], ['JACK_GND', 'placa.GND1'],
  ['GND_OUT_2', 'placa.GND1'], ['OUT_3V3_2', 'OUT_3V3'],
  ['GND_OUT_3', 'placa.GND1'], ['OUT_3V3_3', 'OUT_3V3'],
];

export const ROTULOS_EXPANSION = Object.fromEntries([
  ...CANALES.flatMap((pin) => [
    [`${pin}_S`, `${pin} · señal${pin === 'A6' || pin === 'A7' ? ' (solo entrada analógica)' : ` (mismo ${pin} del Nano)`}`],
    [`${pin}_V`, `${pin} · V: alimentación de 5V (+)`],
    [`${pin}_G`, `${pin} · G: tierra (−)`],
  ]),
  ['I2C_SDA', 'I2C · SDA: datos (mismo A4 del Nano)'],
  ['I2C_SCL', 'I2C · SCL: reloj (mismo A5 del Nano)'],
  ['I2C_V', 'I2C · alimentación de 5V (+)'], ['I2C_G', 'I2C · tierra (−)'],
  ['SPI_MISO', 'SPI · MISO: datos hacia el Nano (D12)'],
  ['SPI_MOSI', 'SPI · MOSI: datos desde el Nano (D11)'],
  ['SPI_SCK', 'SPI · SCK: reloj (D13)'], ['SPI_SS', 'SPI · SS: selección (D10)'],
  ['SPI_V', 'SPI · alimentación de 5V (+)'], ['SPI_G', 'SPI · tierra (−)'],
  ['UART_TX', 'UART · TX: datos desde el Nano (D1)'], ['UART_RX', 'UART · RX: datos hacia el Nano (D0)'],
  ['UART_V', 'UART · alimentación de 5V (+)'], ['UART_G', 'UART · tierra (−)'],
  ['OUT_5V', '5V · alimentación (+), el mismo 5V del Nano'],
  ['OUT_5V_2', '5V · alimentación (+), el mismo 5V del Nano'],
  ['OUT_3V3', '3,3V · salida regulada de la expansión (+), separada del 3V3 del Nano'],
  ['OUT_3V3_2', '3,3V · otro contacto de la misma salida regulada (+)'],
  ['OUT_3V3_3', '3,3V · otro contacto de la misma salida regulada (+)'],
  ['GND_OUT', 'GND · tierra de las salidas (−)'],
  ['GND_OUT_2', 'GND · otro contacto de tierra (−)'],
  ['GND_OUT_3', 'GND · otro contacto de tierra (−)'],
  ['JACK_POS', 'Jack + · entrada de la expansión (modelo: positivo en el centro; comprobar en el kit)'],
  ['JACK_GND', 'Jack GND · tierra de la entrada (modelo: contacto exterior; comprobar en el kit)'],
]);

const vistaDe = (props) => (props.variante === 'azul' ? VISTA_AZUL : VISTA_ROJA);
const PINES = /* @__PURE__ */ new Map([[VISTA_ROJA, /* @__PURE__ */ pinesDe(VISTA_ROJA)], [VISTA_AZUL, /* @__PURE__ */ pinesDe(VISTA_AZUL)]]);

// Los puntos salen de la entrega de TecnoDiseñador: el SVG y la capa de conexión usan la misma geometría.
export function pinesExpansion(props = {}) {
  return PINES.get(vistaDe(props));
}

// Rótulo de la alimentación elegida en la ficha, en la franja libre entre el Nano y el jack (mm del marco).
function rotuloAlimentacion(props) {
  const modo = ['usb', 'jack', 'apagada'].includes(props.alimentacion) ? props.alimentacion : 'usb';
  const texto = modo === 'jack' ? 'ALIM.: JACK' : modo === 'apagada' ? 'SIN ALIMENTACIÓN' : 'ALIM.: USB';
  return `<text x="17" y="38.6" font-family="Arial, Helvetica, sans-serif" font-size="1.9" font-weight="bold" text-anchor="middle" ` +
    `fill="#ffffff" stroke="#1d1d1d" stroke-width="0.3" paint-order="stroke">${texto}</text>`;
}

export function dibujarExpansion(props = {}) {
  const vista = vistaDe(props);
  return svgDe(vista, {
    titulo: `Expansión E/S ${vista.variante} para Nano clásico`,
    descripcion: 'Dibujo medido por TecnoDiseñador. S es señal, V es 5V y G es tierra. El jack y la salida externa de 3,3V tienen nodos propios. Validación eléctrica pendiente.',
    encima: rotuloAlimentacion(props),
  });
}

// El LED de encendido de la expansión sigue al 5V del Nano: lo enciende la misma foto de la placa.
export function mostrarExpansion(svg, estado, props = {}) {
  mostrarLeds(svg, vistaDe(props).leds, estado ? { leds: { PWR: estado.ledPower ? 1 : 0 } } : null);
}
