// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: pulsador de 6 × 6 mm
//
// Vista medida por TecnoDiseñador desde el pulsador negro del kit (src/piezas/vistas/pulsador.js, con su registro).
// Reemplaza al dibujo de @wokwi/elements (especificación de entrega, sección 6.9). Visto desde arriba: las patas 1i y 1d
// (arriba) están unidas por dentro, igual que 2i y 2d (abajo), a 3 pasos de lado a lado y a 2 en el mismo lado.
// El capuchón toma el color de la ficha (el kit lo trae negro; los seis se conservan porque las piezas se comparten
// con Electrónica) y se hunde mientras el aprendiz lo presiona.

import VISTA_PULSADOR from './vistas/pulsador.js';
import { tamanoDe, pinesDe, svgDe, rellenar } from './vista_td.js';

// Los /* @__PURE__ */ dejan que esbuild quite el dibujo de donde no se usa, como el Worker.
export const TAMANO_PULSADOR = /* @__PURE__ */ tamanoDe(VISTA_PULSADOR);
export const PINES_PULSADOR = /* @__PURE__ */ pinesDe(VISTA_PULSADOR);
const colorDe = (props) => VISTA_PULSADOR.colores[props && props.color] || VISTA_PULSADOR.colores.rojo;

export function dibujarPulsador(props) {
  const svg = svgDe(VISTA_PULSADOR, {
    titulo: 'Pulsador de 6 × 6 mm',
    descripcion: 'Pulsador de 4 patas del kit, visto desde arriba. Dibujo medido por TecnoDiseñador.',
  });
  return rellenar(svg, 'data-relleno', 'capuchon', colorDe(props));
}

// Otro color en la ficha.
export function aplicarPulsador(svg, props) {
  svg.querySelector('[data-relleno="capuchon"]')?.setAttribute('fill', colorDe(props));
}

// Presionado, el capuchón se achica alrededor de su centro, como si bajara. `data-presionado` lo dice sin depender del
// dibujo (lo leen las pruebas).
export function presionarPulsador(svg, presionado) {
  const capuchon = svg.querySelector('[data-parte="capuchon"]');
  const boton = svg.querySelector('[data-relleno="capuchon"]');
  if (!capuchon || !boton) return;
  const cx = Number(boton.getAttribute('cx'));
  const cy = Number(boton.getAttribute('cy'));
  if (presionado) capuchon.setAttribute('transform', `translate(${cx} ${cy}) scale(0.86) translate(${-cx} ${-cy})`);
  else capuchon.removeAttribute('transform');
  svg.toggleAttribute('data-presionado', !!presionado);
}
