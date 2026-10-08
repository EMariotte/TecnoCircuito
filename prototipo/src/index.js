// Punto de entrada del paquete: define window.TecnoCircuito, como pide el contrato 1.
import { crearLienzo } from './lienzo.js';
import { crearSimulador } from './simulador.js';
import { PLACAS } from './catalogo.js';

window.TecnoCircuito = Object.freeze({
  VERSION: '0.0.4-prototipo',
  CONTRATO: 1,
  PLACAS: Object.freeze(Object.keys(PLACAS)),
  crearLienzo,
  crearSimulador,
});
