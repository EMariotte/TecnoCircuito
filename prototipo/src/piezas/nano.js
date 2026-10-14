// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: Nano clásico como módulo montable
//
// Vista medida por TecnoDiseñador desde el Nano clon CH340 del ambiente (src/piezas/vistas/nano.js, con su registro).
// Marco común de la familia Nano, 60 × 53,5 mm: el Nano está donde queda montado sobre la expansión, que comparte el
// marco, y lo demás es transparente. Filas a 15,24 mm y paso de 2,54 mm (lo comprueba el revisor de la entrega).
// Orden de terminales contrastado con el pinout oficial (datos, sin copiar su dibujo):
// https://content.arduino.cc/assets/Pinout-NANO_latest.pdf
// USB a la izquierda. A6/A7 son únicamente entradas analógicas del ATmega328P.

import VISTA_NANO from './vistas/nano.js';
import { tamanoDe, pinesDe, svgDe, mostrarLeds } from './vista_td.js';

export const TAMANO_NANO = /* @__PURE__ */ tamanoDe(VISTA_NANO);

// Claves locales del contrato: el lienzo les antepone «placa.».
// Los dos RESET y los dos GND son terminales físicos diferentes: GND2 y RESET2 en la fila de D12…D1.
export const PINES_NANO = /* @__PURE__ */ pinesDe(VISTA_NANO);

export function dibujarNano() {
  return svgDe(VISTA_NANO, {
    titulo: 'Nano clásico · módulo ATmega328P',
    descripcion: 'Módulo con treinta terminales físicos. A6 y A7 solo admiten entrada analógica. Dibujo medido por TecnoDiseñador; validación eléctrica pendiente.',
  });
}

// Admite la foto del núcleo ({ledPower, led13, ledRX, ledTX}), {pwr, l, rx, tx} o {leds: {PWR, L, RX, TX}}.
// No se deduce energía de la apariencia: el núcleo decide si hay alimentación.
export function mostrarNano(svg, estado = {}) {
  mostrarLeds(svg, VISTA_NANO.leds, estado);
}
