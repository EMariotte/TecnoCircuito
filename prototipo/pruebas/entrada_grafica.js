// Lo que usa probar_grafica.js (esbuild lo arma en pruebas/grafica.cjs): la parte de la gráfica que no toca la página,
// el motor y el núcleo para armar mediciones de verdad.
export { medidasDe, sePuedeMarcar, crearRegistroGrafica, marcasEje, MAX_MEDIDAS, MAX_UNIDADES, VENTANA_MS } from '../src/grafica.js';
export { armarRed } from '../src/motor/index.js';
export { crearNucleo, FRECUENCIA } from '../src/nucleo.js';
