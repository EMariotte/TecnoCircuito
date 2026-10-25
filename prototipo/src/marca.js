// La marca de TecnoCircuito dentro del paquete (MARCA-001). Sale de marca/svg/, que genera marca/generar.py, y
// construir.js la lee como texto: así viaja en dist/tecnocircuito.js, funciona sin red y cada versión lleva la suya.
import simbolo from '../../marca/svg/simbolo-app.svg';
import cabeza from '../../marca/svg/simbolo-cabeza.svg';
import unaTinta from '../../marca/svg/una-tinta-azul.svg';
import firma from '../../marca/svg/firma.svg';

// Contrato, sección 2: lo que TecnoBloques usa para mostrar la identidad de TecnoCircuito.
export const MARCA = Object.freeze({
  nombre: 'TecnoCircuito',
  frase: 'Prueba tu idea antes de armarla en la placa.',
  simbolo: simbolo.trim(), // símbolo sobre fondo azul (viewBox 64): desde 32 px
  cabeza: cabeza.trim(), // solo el chip, para 16 a 24 px (la guía de la marca no deja el símbolo entero ahí)
});

// Para la imagen que exporta el lienzo: la marca de agua y la firma de abajo.
export const UNA_TINTA_SVG = unaTinta.trim();
export const FIRMA_SVG = firma.trim();

/** El dibujo de un SVG sin su etiqueta <svg>, para meterlo dentro de otro (igual que _anidar en generar.py). */
export function interiorSVG(texto) {
  return texto.slice(texto.indexOf('>') + 1, texto.lastIndexOf('</svg>'));
}

/** Ancho y alto declarados en la etiqueta <svg> (la firma los trae; el símbolo no, y vale 64). */
export function medidaSVG(texto) {
  const etiqueta = texto.slice(0, texto.indexOf('>'));
  const leer = (a) => Number((etiqueta.match(new RegExp(`\\s${a}="([\\d.]+)"`)) || [])[1]) || 64;
  return { ancho: leer('width'), alto: leer('height') };
}
