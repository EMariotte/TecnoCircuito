// Punto de entrada del paquete: define window.TecnoCircuito, como pide el contrato 1.
import { crearLienzo } from './lienzo.js';
import { crearSimulador } from './simulador.js';
import { PLACAS } from './catalogo.js';
import { filasDeMediciones } from './mediciones.js';
import { MARCA } from './marca.js';

window.TecnoCircuito = Object.freeze({
  VERSION: typeof __VERSION_TC__ === 'string' ? __VERSION_TC__ : '0.0.0-dev', // la pone construir.js (package.json de la raíz)
  CONTRATO: 1,
  PLACAS: Object.freeze(Object.keys(PLACAS)),
  MARCA,
  crearLienzo,
  crearSimulador,
  filasDeMediciones,
});
