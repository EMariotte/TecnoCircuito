// SPDX-License-Identifier: Apache-2.0
// Modelo de referencia del conjunto Nano + expansión. Todos los parámetros de
// impedancia, reposo y caída siguientes son SUPUESTOS de simulación, sin
// medida del Nano ni de las expansiones roja/azul. No identifica reguladores por
// las fotos y no reproduce el PTC, 5,11 V ni 1,66 Ω medidos en el Uno del kit.
import { voltiosLipo } from './piezas/bateria_lipo.js';

export const NANO_REFERENCIA = Object.freeze({
  usbV: 5, salida5V: 5, salida3V3: 3.3,
  reposoA: 0.025, resistenciaFuenteOhm: 0.25,
  // Reguladores externos elegidos para la referencia LD1117: 1,2 V de margen.
  // https://www.st.com/resource/en/datasheet/ld1117.pdf (no identifica la pieza comercial).
  caidaJackV: 1.2, caida3V3V: 1.2, caidaNano3V3V: 0.3, resistencia3V3Ohm: 0.5,
  aviso3V3A: 0.1, minimoJackV: 7, maximoJackV: 12,
  // Límite publicado para el módulo Arduino Nano oficial; comprobar clones.
  // https://docs.arduino.cc/resources/pinouts/A000005-full-pinout.pdf
  avisoNano3V3A: 0.05,
  // Umbral de reset de referencia; los fuses del Nano real se deben comprobar.
  resetV: 2.7,
  validacion: 'Modelo de referencia; Nano y expansión pendientes de medición física.',
});
export const FUENTES_NANO = Object.freeze(['usb', 'jack', 'apagada']);

// Los cables al jack privado (o VIN del Nano suelto) tienen prioridad sobre voltajeJack. Nunca se convierte
// una LiPo invertida o en corto en una fuente positiva. USB/jack/apagada son la
// selección explícita del modelo, no un interruptor comercial ya identificado.
export function fuenteNano(circuito, raiz) {
  const expansion = circuito.componentes.find((c) => c.tipo === 'shield_nano_io');
  const props = expansion && expansion.props || {};
  let alimentacion = FUENTES_NANO.includes(props.alimentacion) ? props.alimentacion : 'usb';
  const entradaRef = expansion ? expansion.id + '.JACK_POS' : 'placa.VIN';
  let voltios = Number.isFinite(Number(props.voltajeJack)) ? Math.max(0, Math.min(12, Number(props.voltajeJack))) : 9;
  let bateria = null;
  for (const c of circuito.componentes) {
    if (c.tipo !== 'bateria_lipo') continue;
    if (raiz(c.id + '.POS') === raiz(entradaRef)) {
      bateria = c.id;
      voltios = raiz(c.id + '.NEG') === raiz('placa.GND1') && raiz(entradaRef) !== raiz('placa.GND1')
        ? voltiosLipo(c.props && c.props.carga) : 0;
      break;
    }
    if (raiz(c.id + '.NEG') === raiz(entradaRef)) {
      bateria = c.id;
      voltios = 0;
      break;
    }
  }
  // También una fuente descrita por voltajeJack queda anulada por un corto del
  // jack: la propiedad no puede suministrar energía atravesando el mismo nodo.
  // `corto`: la fuente de la propiedad quedó en corto (el de una batería lo avisa potencia.js como bateria_corto).
  let corto = false;
  if (raiz(entradaRef) === raiz('placa.GND1')) {
    corto = !bateria && alimentacion === 'jack' && voltios > 0;
    voltios = 0;
  }
  if (!expansion && bateria) alimentacion = 'jack';
  return { alimentacion, voltiosJack: voltios, bateria, corto, expansion: expansion ? expansion.id : null, entradaRef };
}

// g5/g33: conductancia de cargas pasivas y servos en cada salida; fijo5: motores
// u otras cargas de corriente. Se resuelven juntas las dos salidas: el regulador
// de 3,3 V toma su corriente de 5 V y deja de entregar al quitar la fuente.
export function resolverAlimentacionNano(fuente, { realista = false, g5 = 0, g33 = 0, g33Expansion = 0, fijo5 = 0 } = {}) {
  const p = NANO_REFERENCIA;
  const entradaV = fuente.alimentacion === 'jack' || fuente.bateria ? fuente.voltiosJack : 0;
  const vin = fuente.expansion ? 0 : entradaV;
  const abierto = fuente.alimentacion === 'apagada';
  const nominal = abierto ? 0 : fuente.alimentacion === 'usb' ? p.usbV
    : entradaV <= 0 ? 0 : realista ? Math.max(0, Math.min(p.salida5V, entradaV - p.caidaJackV)) : Math.min(p.salida5V, entradaV);
  const r5 = realista ? p.resistenciaFuenteOhm : 0;
  const r33 = realista ? p.resistencia3V3Ohm : 0;
  const reposo = nominal > 0 ? p.reposoA : 0;
  let v5 = nominal;
  let v33 = 0;
  let v33Expansion = 0;
  for (let i = 0; i < 12; i++) {
    v33 = Math.max(0, Math.min(p.salida3V3, v5 - (realista ? p.caidaNano3V3V : 0))) / (1 + r33 * Math.max(0, g33));
    v33Expansion = fuente.expansion ? Math.max(0, Math.min(p.salida3V3, v5 - (realista ? p.caida3V3V : 0))) / (1 + r33 * Math.max(0, g33Expansion)) : 0;
    v5 = Math.max(0, (nominal - r5 * (reposo + Math.max(0, fijo5) + v33 * Math.max(0, g33) + v33Expansion * Math.max(0, g33Expansion))) / (1 + r5 * Math.max(0, g5)));
  }
  v33 = Math.max(0, Math.min(p.salida3V3, v5 - (realista ? p.caidaNano3V3V : 0))) / (1 + r33 * Math.max(0, g33));
  v33Expansion = fuente.expansion ? Math.max(0, Math.min(p.salida3V3, v5 - (realista ? p.caida3V3V : 0))) / (1 + r33 * Math.max(0, g33Expansion)) : 0;
  const i33 = v33 * Math.max(0, g33);
  const i33Expansion = v33Expansion * Math.max(0, g33Expansion);
  const amperios = nominal > 0 ? reposo + Math.max(0, fijo5) + v5 * Math.max(0, g5) + i33 + i33Expansion : 0;
  return { v5, v33, v33Expansion, vin, entradaV, amperios, i33, i33Expansion, apagada: v5 < p.resetV, fuente: fuente.alimentacion, referencia: true };
}
