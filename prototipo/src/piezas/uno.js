// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: placa Uno R3
//
// Vista medida por TecnoDiseñador desde el Uno clon del ambiente (src/piezas/vistas/uno.js, con su registro), sin
// pistas ni datos del diseño de referencia de Arduino. Reemplaza al dibujo del Uno de @wokwi/elements, que no tenía el
// paso exacto de 2,54 mm (especificación de entrega, sección 6.5).
// Marco fijo de 72,58 × 53,34 mm con la placa desde x = 4 mm, como el de wokwi: la placa no se mueve respecto de las
// piezas ni de los dobleces de los cables guardados. Los nombres de los pines son los mismos de siempre.

import VISTA_UNO from './vistas/uno.js';
import { MM, tamanoDe, pinesDe, svgDe, mostrarLeds } from './vista_td.js';

// Los /* @__PURE__ */ dejan que el Worker, que llega aquí por la shield L293D, se arme sin el dibujo.
export const TAMANO_UNO = /* @__PURE__ */ tamanoDe(VISTA_UNO);
export const PINES_UNO = /* @__PURE__ */ pinesDe(VISTA_UNO);

// Los cuatro headers, de izquierda a derecha, con el pin sin rótulo del de alimentación (no tiene contacto, pero la
// shield L293D lleva su agujero encima). La separación entre headers es la medida; dentro de cada uno, 2,54 mm.
function headers() {
  const fila = (nombres) => ({ y: PINES_UNO[nombres[0]].y, xs: nombres.map((n) => PINES_UNO[n].x) });
  const alimentacion = fila(['IOREF', 'RESET', '3V3', '5V', 'GND2', 'GND3', 'VIN']);
  return [
    fila(['SCL', 'SDA', 'AREF', 'GND1', 'D13', 'D12', 'D11', 'D10', 'D9', 'D8']),
    fila(['D7', 'D6', 'D5', 'D4', 'D3', 'D2', 'D1', 'D0']),
    { y: alimentacion.y, xs: [alimentacion.xs[0] - 2.54 * MM, ...alimentacion.xs] },
    fila(['A0', 'A1', 'A2', 'A3', 'A4', 'A5']),
  ];
}
export const HEADERS_UNO = /* @__PURE__ */ headers();

export function dibujarUno() {
  return svgDe(VISTA_UNO, {
    titulo: 'Placa Uno R3',
    descripcion: 'Placa con ATmega328P. Dibujo medido por TecnoDiseñador desde la placa del ambiente.',
  });
}

// La foto del núcleo: {ledPower, led13, ledTX, ledRX}. null apaga todo (sin simulación).
export function mostrarUno(svg, estado) {
  mostrarLeds(svg, VISTA_UNO.leds, estado);
}
