// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Piezas con vista medida por TecnoDiseñador
//
// TecnoDiseñador entrega solo la apariencia: el SVG en milímetros, con un `data-contacto` en cada punto de conexión,
// un `data-led` en cada LED y la posición de cada contacto (docs/ENTREGA-VISTAS-TECNODISENADOR.md). `npm run vistas`
// los trae a src/piezas/vistas/. Aquí se ponen en píxeles del lienzo (1 mm = 9,6 / 2,54 px) y se encienden sus LED.
// Lo eléctrico (qué pin es qué nodo) no sale del dibujo: sigue en el contrato y en el modelo de cada pieza.

export const MM = 9.6 / 2.54;
const r2 = (n) => Math.round(n * 100) / 100;

export const tamanoDe = (vista) => ({ ancho: vista.marco.ancho * MM, alto: vista.marco.alto * MM });

export const pinesDe = (vista) =>
  Object.fromEntries(Object.entries(vista.pines).map(([nombre, p]) => [nombre, { x: p.x * MM, y: p.y * MM }]));

// La raíz la pone TecnoCircuito: tamaño en píxeles, el viewBox en mm de la entrega, y su título y descripción.
// `encima` es lo que agrega TecnoCircuito sobre el dibujo (en mm), como el rótulo de alimentación de la expansión.
export function svgDe(vista, { titulo, descripcion, encima = '' }) {
  const { ancho, alto } = vista.marco;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${r2(ancho * MM)}" height="${r2(alto * MM)}" viewBox="0 0 ${ancho} ${alto}">` +
    `<title>${titulo}</title><desc>${descripcion}</desc>${vista.cuerpo}${encima}</svg>`;
}

// Enciende o apaga cada `data-led` con sus colores de la entrega. El estado admite la foto del núcleo
// ({ledPower, led13, ledRX, ledTX}), {pwr, l, rx, tx} o {leds: {PWR, L, RX, TX}}; null o vacío los apaga.
// `data-encendido` dice lo mismo sin depender del color (lo usan las pruebas).
const CLAVES_FOTO = { PWR: 'ledPower', L: 'led13', RX: 'ledRX', TX: 'ledTX' };
export function mostrarLeds(svg, leds, estado) {
  for (const [nombre, colores] of Object.entries(leds)) {
    const intensidad = estado?.leds?.[nombre] ?? estado?.[nombre.toLowerCase()] ?? estado?.[CLAVES_FOTO[nombre]] ?? 0;
    const prendido = intensidad > 0;
    const color = prendido ? colores.encendido : colores.apagado;
    const led = svg.querySelector(`[data-led="${nombre}"]`);
    if (!led || led.getAttribute('fill') === color) continue;
    led.setAttribute('fill', color);
    led.toggleAttribute('data-encendido', prendido);
  }
}
