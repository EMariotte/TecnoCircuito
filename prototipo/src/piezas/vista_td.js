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

// Cambia el `fill` de la forma que lleva `atributo="valor"` en el texto del dibujo (la cápsula de un LED, una banda,
// el capuchón de un botón). Se pinta antes de crear el SVG: así la miniatura de «+ Agregar», el lienzo y la imagen
// exportada salen con los colores de la ficha. Un cambio posterior en la ficha pinta el SVG ya creado.
export const rellenar = (texto, atributo, valor, color) =>
  texto.replace(new RegExp(`<[^>]*\\s${atributo}="${valor}"[^>]*>`), (etiqueta) => etiqueta.replace(/\sfill="[^"]*"/, ` fill="${color}"`));

// Enciende o apaga cada `data-led` con sus colores de la entrega. El estado admite la foto del núcleo
// ({ledPower, led13, ledRX, ledTX}), {pwr, l, rx, tx} o {leds: {PWR, L, RX, TX}}; null o vacío los apaga.
// Cada valor es true/false o un brillo de 0 a 1 (el LED L sigue al promedio del pin 13). Encendido, el LED toma un
// color entre el apagado y el encendido según su brillo y un halo de su color, como un LED SMD real.
// `data-encendido` dice si está prendido sin depender del color (lo usan las pruebas y TecnoBloques).
const CLAVES_FOTO = { PWR: 'ledPower', L: 'led13', RX: 'ledRX', TX: 'ledTX' };
const canales = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const mezclar = (a, b, t) => '#' + canales(a).map((x, i) => Math.round(x + (canales(b)[i] - x) * t).toString(16).padStart(2, '0')).join('');

export function mostrarLeds(svg, leds, estado) {
  for (const [nombre, colores] of Object.entries(leds)) {
    const crudo = estado?.leds?.[nombre] ?? estado?.[nombre.toLowerCase()] ?? estado?.[CLAVES_FOTO[nombre]] ?? 0;
    const nivel = Math.max(0, Math.min(1, Number(crudo) || 0));
    // En pasos de 5 %, para no reescribir el dibujo por cambios que no se ven. Un LED que apenas prende se ve tenue,
    // pero se ve (mínimo 20 %), como el ojo ve un LED con poca corriente.
    const paso = nivel > 0.005 ? Math.max(0.2, Math.round(nivel * 20) / 20) : 0;
    const led = svg.querySelector(`[data-led="${nombre}"]`);
    if (!led || led.dataset.nivel === String(paso)) continue;
    led.dataset.nivel = String(paso);
    led.setAttribute('fill', paso ? mezclar(colores.apagado, colores.encendido, paso) : colores.apagado);
    led.toggleAttribute('data-encendido', paso > 0);
    // El halo se mide en las unidades del dibujo (mm o px): sale del lado mayor del LED. Dos sombras: una cercana,
    // que lo hace brillar, y una amplia y tenue, que es la luz alrededor.
    const caja = paso && typeof led.getBBox === 'function' ? led.getBBox() : null;
    const radio = caja && caja.width ? Math.max(caja.width, caja.height) : 0;
    const [r, g, b] = canales(colores.encendido);
    const sombra = (k, a) => `drop-shadow(0 0 ${(radio * k).toFixed(2)}px rgba(${r}, ${g}, ${b}, ${(paso * a).toFixed(2)}))`;
    if (radio) led.style.filter = `${sombra(0.35, 1)} ${sombra(1.2, 0.85)}`;
    else led.style.removeProperty('filter');
    // Con el lienzo oculto (otra pestaña de TecnoBloques) no hay medida: se vuelve a intentar en la próxima foto.
    if (paso && !radio) delete led.dataset.nivel;
  }
}
