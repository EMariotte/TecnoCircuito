// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: placa Uno R3
//
// Vista medida por TecnoDiseñador desde el Uno clon del ambiente (src/piezas/vistas/uno.js, con su registro), sin
// pistas ni datos del diseño de referencia de Arduino. Reemplaza al dibujo del Uno de @wokwi/elements, que no tenía el
// paso exacto de 2,54 mm (especificación de entrega, sección 6.5).
// Marco fijo de 72,58 × 53,34 mm con la placa desde x = 4 mm, como el de wokwi: la placa no se mueve respecto de las
// piezas ni de los dobleces de los cables guardados. Los nombres de los pines son los mismos de siempre.

import VISTA_UNO from './vistas/uno.js';
import { tamanoDe, pinesDe, svgDe, mostrarLeds } from './vista_td.js';

// Los /* @__PURE__ */ dejan que esbuild quite el dibujo de donde no se usa, como el Worker.
export const TAMANO_UNO = /* @__PURE__ */ tamanoDe(VISTA_UNO);
export const PINES_UNO = /* @__PURE__ */ pinesDe(VISTA_UNO);

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
