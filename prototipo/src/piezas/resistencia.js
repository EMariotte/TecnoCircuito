// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: resistencia axial
//
// Vistas medidas por TecnoDiseñador desde las resistencias del kit (src/piezas/vistas/resistencia_*.js, con su
// registro). Reemplazan al dibujo de @wokwi/elements (especificación de entrega, sección 6.7). Acostada, vista desde
// arriba, con la pata 1 a la izquierda. La prop `vatios` elige el dibujo:
//   0.25 → ¼ W (beige, 6,3 mm), con las patas a 4 pasos.
//   0.5  → ½ W (azul, 8,7 mm), con las patas a 6 pasos: su cuerpo no cabe en 4.
//   sin `vatios` (una resistencia guardada antes de que hubiera dos potencias) → ¼ W con las patas abiertas a 6 pasos:
//         los mismos huecos que ocupaba el dibujo de wokwi, y el mismo límite de calor (decisión de Efraín, 27 oct).
// Las bandas se pintan con el código de colores de los ohmios.

import R025 from './vistas/resistencia_025w.js';
import R025_6 from './vistas/resistencia_025w6.js';
import R05 from './vistas/resistencia_05w.js';
import { tamanoDe, pinesDe, svgDe, rellenar } from './vista_td.js';

const vistaDe = (props) => ({ 0.25: R025, 0.5: R05 })[props && props.vatios] || R025_6;

// El marco y los pines dependen de la potencia: el lienzo rehace el dibujo al cambiarla (dibujo.marco).
export const marcoResistencia = (props) => ({ ...tamanoDe(vistaDe(props)), pines: pinesDe(vistaDe(props)) });

// Código de colores: del 0 (negro) al 9 (blanco), y los multiplicadores ×0,1 (oro) y ×0,01 (plata). La cuarta banda es
// la tolerancia del ±5 %: oro, como en las del kit. Los tonos son los de las bandas de la foto donde las hay.
const CODIGO = ['#1c1c1c', '#7b4a2a', '#d0312d', '#ee6a1e', '#f2c40f', '#2e9e44', '#2f6fde', '#8e44ad', '#9aa0a6', '#f4f4f4'];
const ORO = '#c9a040';
const PLATA = '#b8bcc0';

// Los colores de las 4 bandas: dos cifras, el multiplicador y la tolerancia. Un valor de más de dos cifras
// significativas se redondea a dos, como haría la resistencia comercial más cercana de 4 bandas.
export function bandas(ohmios) {
  const r = Number(ohmios) > 0 ? Number(ohmios) : 220;
  let e = Math.floor(Math.log10(r)) - 1;
  let cifras = Math.round(r / 10 ** e);
  if (cifras < 10) cifras = Math.round(r / 10 ** --e); // log10 de una potencia de 10 puede quedar un pelo corto
  if (cifras >= 100) cifras = Math.round(r / 10 ** ++e);
  e = Math.max(-2, Math.min(9, e));
  return [CODIGO[Math.floor(cifras / 10) % 10], CODIGO[cifras % 10], e === -1 ? ORO : e === -2 ? PLATA : CODIGO[e], ORO];
}

const TITULO = { 0.25: 'Resistencia de ¼ W', 0.5: 'Resistencia de ½ W' };

export function dibujarResistencia(props) {
  let svg = svgDe(vistaDe(props), {
    titulo: TITULO[props && props.vatios] || 'Resistencia de ¼ W con las patas abiertas',
    descripcion: 'Resistencia axial del kit, vista desde arriba. Dibujo medido por TecnoDiseñador.',
  });
  bandas(props && props.ohmios).forEach((color, i) => (svg = rellenar(svg, 'data-banda', i + 1, color)));
  return svg;
}

// Otro valor en la ficha: se pintan otra vez las bandas.
export function aplicarResistencia(svg, props) {
  bandas(props && props.ohmios).forEach((color, i) => svg.querySelector(`[data-banda="${i + 1}"]`)?.setAttribute('fill', color));
}
