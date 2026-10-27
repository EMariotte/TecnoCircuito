// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: potenciómetro de 16 mm
//
// Vista medida por TecnoDiseñador desde el potenciómetro B10K del kit (src/piezas/vistas/potenciometro.js, con su
// registro). Reemplaza al dibujo de @wokwi/elements (especificación de entrega, sección 6.8). Va de frente, con el eje
// hacia el aprendiz y las patas abajo, a 2 pasos: GND a la izquierda, SIG en el medio y VCC a la derecha.
// La perilla (`posicion`) gira el eje 270°: en 0 está todo contra el reloj (el cursor toca GND) y en 1, todo a favor
// (toca VCC); en el medio la ranura queda vertical, como se dibujó. El rótulo impreso sigue a los ohmios.

import VISTA_POT from './vistas/potenciometro.js';
import { tamanoDe, pinesDe, svgDe } from './vista_td.js';

// Los /* @__PURE__ */ dejan que esbuild quite el dibujo de donde no se usa, como el Worker.
export const TAMANO_POT = /* @__PURE__ */ tamanoDe(VISTA_POT);
export const PINES_POT = /* @__PURE__ */ pinesDe(VISTA_POT);
const EJE = VISTA_POT.partes.eje;
const r2 = (n) => Math.round(n * 100) / 100;

const posicionDe = (props) => Math.max(0, Math.min(1, Number(props?.posicion ?? 0.5) || 0));
export const anguloEje = (props) => (posicionDe(props) - 0.5) * 270 - (EJE.angulo_dibujado || 0);
const giro = (props) => `rotate(${r2(anguloEje(props))} ${EJE.pivote.x} ${EJE.pivote.y})`;

// Lo que trae impreso: «B» (lineal) y los ohmios, como «B10K» en el del kit, «B1K», «B100K» o «B4K7».
export function rotuloValor(ohmios) {
  const r = Number(ohmios) > 0 ? Number(ohmios) : 10000;
  const [n, letra] = r >= 1e6 ? [r / 1e6, 'M'] : r >= 1e3 ? [r / 1e3, 'K'] : [r, 'R'];
  const texto = String(+n.toFixed(2));
  return 'B' + (texto.includes('.') ? texto.replace('.', letra) : texto + letra);
}

export function dibujarPotenciometro(props) {
  return svgDe(VISTA_POT, {
    titulo: 'Potenciómetro de 16 mm',
    descripcion: 'Potenciómetro rotatorio del kit, de frente, con el eje estriado. Dibujo medido por TecnoDiseñador.',
  })
    .replace('<g data-parte="eje"', `<g data-parte="eje" transform="${giro(props)}"`)
    .replace(/(<text[^>]*\sdata-valor="[^"]*"[^>]*>)[^<]*/, `$1${rotuloValor(props && props.ohmios)}`);
}

// Otro valor o la perilla en otra posición: gira el eje y cambia el rótulo.
export function aplicarPotenciometro(svg, props) {
  svg.querySelector('[data-parte="eje"]')?.setAttribute('transform', giro(props));
  const valor = svg.querySelector('[data-valor]');
  if (valor) valor.textContent = rotuloValor(props && props.ohmios);
}
