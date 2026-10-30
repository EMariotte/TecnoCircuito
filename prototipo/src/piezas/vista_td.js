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
// `desborde`: lo pintado puede salir del marco (el halo del LED de 5 mm, LIENZO-003). Las placas no lo llevan: su
// dibujo tiene partes fuera del marco (el conector USB del Uno) que no se ven, y sus LED quedan lejos del borde.
export function svgDe(vista, { titulo, descripcion, encima = '', desborde = false }) {
  const { ancho, alto } = vista.marco;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${r2(ancho * MM)}" height="${r2(alto * MM)}" viewBox="0 0 ${ancho} ${alto}"${desborde ? ' overflow="visible"' : ''}>` +
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

// El halo de cada nivel (LIENZO-003): la cápsula cambia poco de color entre apagado y encendido (el rojo, de #c70d05 a
// #fe0c01), así que la diferencia de brillo la da la luz alrededor. Tres sombras de su color, cada una con su
// alcance (en lados mayores del LED) y su opacidad, que crecen con el nivel: con 1 kΩ, 330 Ω y 220 Ω se ven distintas.
// `curva` > 1 la hace crecer más al final: el resplandor amplio aparece casi solo con mucha corriente.
const HALO = [
  { alcance: [0.15, 0.3], opacidad: [0.7, 1], curva: 1, claro: 0.35 }, // cerca: la cápsula brilla, más clara
  { alcance: [0.3, 0.9], opacidad: [0.35, 0.95], curva: 1 }, // la luz alrededor
  { alcance: [0.4, 2.2], opacidad: [0, 0.75], curva: 2 }, // el resplandor amplio
];
const entre = ([a, b], t) => a + (b - a) * t;

// El centro encandilado (pedido de Efraín, 30 oct: que se vea como una fuente de luz fuerte): una mancha casi blanca
// de su color, difuminada, dentro de la cápsula y debajo de sus sombras y brillos. Crece en opacidad con el nivel.
// No lleva `data-led`: el color de la cápsula sigue siendo el que leen las pruebas. `colores.luz`, si está, es el color
// del halo cuando el encendido no se vería sobre el lienzo (el LED blanco).
function centro(led, colores, paso, caja) {
  let luz = led.parentNode.querySelector(`[data-luz="${led.dataset.led}"]`);
  if (!paso || !caja) {
    if (luz) luz.setAttribute('display', 'none');
    return;
  }
  if (!luz) {
    luz = document.createElementNS(led.namespaceURI, 'ellipse');
    luz.setAttribute('data-luz', led.dataset.led);
    luz.setAttribute('pointer-events', 'none');
    if (led.hasAttribute('transform')) luz.setAttribute('transform', led.getAttribute('transform'));
    led.after(luz);
  }
  const { x, y, width: w, height: h } = caja;
  const alto = h > w; // el LED de 5 mm: el centro va en la cúpula
  luz.setAttribute('cx', r2(x + w / 2));
  luz.setAttribute('cy', r2(y + h * (alto ? 0.4 : 0.5)));
  luz.setAttribute('rx', r2(w * 0.36));
  luz.setAttribute('ry', r2(h * (alto ? 0.34 : 0.36)));
  luz.setAttribute('fill', mezclar(colores.encendido, '#ffffff', 0.88));
  luz.setAttribute('opacity', Math.min(1, 1.1 * paso).toFixed(2));
  luz.style.filter = `blur(${r2(Math.min(w, h) * 0.12)}px)`;
  luz.removeAttribute('display');
}

// La caja que ocupa la luz de los LED encendidos de un dibujo que la deja salir de su marco (`desborde`), en px de la
// pieza sin girar: { x0, y0, x1, y1 }, o null si no hay luz afuera. La usa la imagen exportada para su encuadre.
export function luzFuera(svg) {
  if (!svg || svg.getAttribute('overflow') !== 'visible' || !svg.viewBox || !svg.viewBox.baseVal.width) return null;
  const escala = Number(svg.getAttribute('width')) / svg.viewBox.baseVal.width;
  let caja = null;
  for (const led of svg.querySelectorAll('[data-led][data-encendido][data-alcance]')) {
    const b = led.getBBox();
    const d = Number(led.dataset.alcance);
    const [x0, y0, x1, y1] = [b.x - d, b.y - d, b.x + b.width + d, b.y + b.height + d].map((n) => n * escala);
    caja = caja
      ? { x0: Math.min(caja.x0, x0), y0: Math.min(caja.y0, y0), x1: Math.max(caja.x1, x1), y1: Math.max(caja.y1, y1) }
      : { x0, y0, x1, y1 };
  }
  return caja;
}

export function mostrarLeds(svg, leds, estado) {
  for (const [nombre, colores] of Object.entries(leds)) {
    const crudo = estado?.leds?.[nombre] ?? estado?.[nombre.toLowerCase()] ?? estado?.[CLAVES_FOTO[nombre]] ?? 0;
    const nivel = Math.max(0, Math.min(1, Number(crudo) || 0));
    // En pasos de 5 %, para no reescribir el dibujo por cambios que no se ven. Un LED que apenas prende se ve tenue,
    // pero se ve (mínimo 10 %), como el ojo ve un LED con poca corriente.
    const paso = nivel > 0.005 ? Math.max(0.1, Math.round(nivel * 20) / 20) : 0;
    const led = svg.querySelector(`[data-led="${nombre}"]`);
    if (!led || led.dataset.nivel === String(paso)) continue;
    led.dataset.nivel = String(paso);
    led.setAttribute('fill', paso ? mezclar(colores.apagado, colores.encendido, paso) : colores.apagado);
    led.toggleAttribute('data-encendido', paso > 0);
    // El halo se mide en las unidades del dibujo (mm o px): sale del lado mayor del LED.
    const caja = paso && typeof led.getBBox === 'function' ? led.getBBox() : null;
    const radio = caja && caja.width ? Math.max(caja.width, caja.height) : 0;
    const sombra = ({ alcance, opacidad, curva, claro = 0 }) => {
      const [r, g, b] = canales(mezclar(colores.luz || colores.encendido, '#ffffff', claro * paso));
      return `drop-shadow(0 0 ${(radio * entre(alcance, paso ** curva)).toFixed(2)}px rgba(${r}, ${g}, ${b}, ${entre(opacidad, paso ** curva).toFixed(2)}))`;
    };
    if (radio) led.style.filter = HALO.map(sombra).join(' ');
    else led.style.removeProperty('filter');
    centro(led, colores, radio ? paso : 0, caja);
    // Hasta dónde se ve la luz, en unidades del dibujo, para que la imagen exportada no la corte (F01 de Codex en
    // LIENZO-003). Cada sombra difumina la anterior: el desvío total es la raíz de la suma de los cuadrados, y el
    // desvío de una sombra es la mitad de su radio. A tres desvíos queda menos del 0,2 % de su luz.
    if (radio) {
      const radios = HALO.map(({ alcance, curva }) => radio * entre(alcance, paso ** curva));
      led.dataset.alcance = (1.5 * Math.hypot(...radios)).toFixed(2);
    } else delete led.dataset.alcance;
    // Con el lienzo oculto (otra pestaña de TecnoBloques) no hay medida: se vuelve a intentar en la próxima foto.
    if (paso && !radio) delete led.dataset.nivel;
  }
}
