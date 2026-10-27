// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: LED de 5 mm
//
// Vista medida por TecnoDiseñador desde los LED del kit (src/piezas/vistas/led.js, con su registro). Reemplaza al
// dibujo de @wokwi/elements (especificación de entrega, sección 6.6). Va de frente, parado en la protoboard: el cátodo
// (pata corta, del lado plano) a la izquierda y el ánodo, con su codo, a la derecha, a un paso exacto de 2,54 mm.
// La cápsula toma el color de la ficha; el brillo y el halo los pone mostrarLeds según la corriente, y la parte
// `quemado` (la cápsula oscurecida y una grieta) se ve solo con el LED quemado.

import VISTA_LED from './vistas/led.js';
import { tamanoDe, pinesDe, svgDe, mostrarLeds, rellenar } from './vista_td.js';

// Los /* @__PURE__ */ dejan que esbuild quite el dibujo de donde no se usa, como el Worker.
export const TAMANO_LED = /* @__PURE__ */ tamanoDe(VISTA_LED);
export const PINES_LED = /* @__PURE__ */ pinesDe(VISTA_LED);
const colores = (props) => VISTA_LED.colores[props && props.color] || VISTA_LED.colores.rojo;

export function dibujarLed(props) {
  const svg = svgDe(VISTA_LED, {
    titulo: 'LED de 5 mm',
    descripcion: 'LED difuso de 5 mm del kit, de frente. Dibujo medido por TecnoDiseñador desde los LED del ambiente.',
  });
  return rellenar(svg, 'data-led', 'LED', colores(props).apagado).replace('<g data-parte="quemado"', '<g data-parte="quemado" display="none"');
}

// Otro color en la ficha: la cápsula toma su color apagado; mostrarLed la vuelve a encender si hace falta.
export function aplicarLed(svg, props) {
  const led = svg.querySelector('[data-led="LED"]');
  if (!led) return;
  led.setAttribute('fill', colores(props).apagado);
  delete led.dataset.nivel;
}

// brillo: de 0 a 1, según la corriente (0 = apagado). Quemado, se ve la parte `quemado` y no prende.
// `data-brillo` deja el brillo tal cual (el dibujo lo redondea en pasos de 5 %): lo leen las pruebas y TecnoBloques.
export function mostrarLed(svg, props, { brillo = 0, quemado = false } = {}) {
  const nivel = quemado ? 0 : Math.max(0, Math.min(1, Number(brillo) || 0));
  mostrarLeds(svg, { LED: colores(props) }, { leds: { LED: nivel } });
  const parte = svg.querySelector('[data-parte="quemado"]');
  if (parte) parte.setAttribute('display', quemado ? 'inline' : 'none');
  svg.setAttribute('data-brillo', nivel.toFixed(3));
}
