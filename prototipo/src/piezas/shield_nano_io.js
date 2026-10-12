// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: expansión E/S para Nano clásico
//
// SVG original a partir de referencias visuales locales, sin incorporar fotografías.
// Modelo de referencia: geometría, polaridad del jack, reguladores y conexiones reales
// de cada variante siguen pendientes de medida y continuidad en el kit.
// Se conserva un único Nano/ATmega328P: esta pieza distribuye señales y alimentación.

import { TAMANO_NANO } from './nano.js';

export const TAMANO_EXPANSION = { ...TAMANO_NANO };
const PASO = 9.6;
const DIGITALES = Array.from({ length: 14 }, (_, i) => `D${13 - i}`);
const ANALOGICOS = Array.from({ length: 8 }, (_, i) => `A${i}`);
const CANALES = [...DIGITALES, ...ANALOGICOS];
const EXTRAS = ['I2C_SDA', 'I2C_SCL', 'I2C_V', 'I2C_G',
  'SPI_MISO', 'SPI_MOSI', 'SPI_SCK', 'SPI_SS', 'SPI_V', 'SPI_G',
  'UART_TX', 'UART_RX', 'UART_V', 'UART_G', 'OUT_5V', 'OUT_3V3', 'GND_OUT', 'JACK_POS', 'JACK_GND'];
export const PINES_EXPANSION = [...CANALES.flatMap((pin) => ['S', 'V', 'G'].map((fila) => `${pin}_${fila}`)), ...EXTRAS];

// Fuente única para señales y rieles compartidos con el módulo.
// JACK_POS y OUT_3V3 son nodos privados de la expansión: su regulación se modela aparte.
// Unirlos a VIN/3V3 del Nano pondría en paralelo reguladores que aquí son independientes.
export const PUENTES_EXPANSION = [
  ...CANALES.flatMap((pin) => [[`${pin}_S`, `placa.${pin}`], [`${pin}_V`, 'placa.5V'], [`${pin}_G`, 'placa.GND1']]),
  ['I2C_SDA', 'placa.A4'], ['I2C_SCL', 'placa.A5'], ['I2C_V', 'placa.5V'], ['I2C_G', 'placa.GND1'],
  ['SPI_MISO', 'placa.D12'], ['SPI_MOSI', 'placa.D11'], ['SPI_SCK', 'placa.D13'], ['SPI_SS', 'placa.D10'],
  ['SPI_V', 'placa.5V'], ['SPI_G', 'placa.GND1'],
  ['UART_TX', 'placa.D1'], ['UART_RX', 'placa.D0'], ['UART_V', 'placa.5V'], ['UART_G', 'placa.GND1'],
  ['OUT_5V', 'placa.5V'], ['GND_OUT', 'placa.GND1'], ['JACK_GND', 'placa.GND1'],
];

export const ROTULOS_EXPANSION = Object.fromEntries([
  ...CANALES.flatMap((pin) => [
    [`${pin}_S`, `${pin} · señal${pin === 'A6' || pin === 'A7' ? ' (solo entrada analógica)' : ` (mismo ${pin} del Nano)`}`],
    [`${pin}_V`, `${pin} · V: alimentación de 5V (+)`],
    [`${pin}_G`, `${pin} · G: tierra (−)`],
  ]),
  ['I2C_SDA', 'I2C · SDA: datos (mismo A4 del Nano)'],
  ['I2C_SCL', 'I2C · SCL: reloj (mismo A5 del Nano)'],
  ['I2C_V', 'I2C · alimentación de 5V (+)'], ['I2C_G', 'I2C · tierra (−)'],
  ['SPI_MISO', 'SPI · MISO: datos hacia el Nano (D12)'],
  ['SPI_MOSI', 'SPI · MOSI: datos desde el Nano (D11)'],
  ['SPI_SCK', 'SPI · SCK: reloj (D13)'], ['SPI_SS', 'SPI · SS: selección (D10)'],
  ['SPI_V', 'SPI · alimentación de 5V (+)'], ['SPI_G', 'SPI · tierra (−)'],
  ['UART_TX', 'UART · TX: datos desde el Nano (D1)'], ['UART_RX', 'UART · RX: datos hacia el Nano (D0)'],
  ['UART_V', 'UART · alimentación de 5V (+)'], ['UART_G', 'UART · tierra (−)'],
  ['OUT_5V', '5V · salida de alimentación de la expansión (+)'],
  ['OUT_3V3', '3,3V · salida regulada de la expansión (+), separada del 3V3 del Nano'],
  ['GND_OUT', 'GND · tierra de las salidas (−)'],
  ['JACK_POS', 'Jack + · entrada de la expansión (modelo: positivo en el centro; comprobar en el kit)'],
  ['JACK_GND', 'Jack GND · tierra de la entrada (modelo: contacto exterior; comprobar en el kit)'],
]);

const varianteDe = (props) => props.variante === 'azul' ? 'azul' : 'roja';

// Todos los puntos se calculan aquí: SVG y capa de conexión usan la misma geometría.
// Dentro de cada bloque se respeta el paso de 2,54 mm. Los espacios entre bloques
// solo distinguen las dos presentaciones visuales; no son cotas de fabricación.
export function pinesExpansion(props = {}) {
  const azul = varianteDe(props) === 'azul';
  const pines = {};
  const gap = azul ? 4.8 : 3.2;
  const xDigital = azul ? 46.2 : 48.6;
  DIGITALES.forEach((pin, i) => {
    const saltos = (i >= 3 ? 1 : 0) + (i >= 7 ? 1 : 0) + (i >= 11 ? 1 : 0);
    const x = xDigital + i * PASO + saltos * gap;
    for (const [fila, y] of [['G', 29.2], ['V', 38.8], ['S', 48.4]]) pines[`${pin}_${fila}`] = { x, y };
  });
  ANALOGICOS.forEach((pin, i) => {
    const x = (azul ? 53.4 : 55.8) + i * PASO + (i >= 4 ? gap : 0);
    for (const [fila, y] of [['S', 160.6], ['V', 170.2], ['G', 179.8]]) pines[`${pin}_${fila}`] = { x, y };
  });
  const i2cX = azul ? 13.8 : 12.8;
  ['I2C_SDA', 'I2C_SCL', 'I2C_V', 'I2C_G'].forEach((pin, i) => { pines[pin] = { x: i2cX, y: 25 + i * PASO }; });
  const uartX = azul ? 207.2 : 205.6;
  ['UART_TX', 'UART_RX', 'UART_V', 'UART_G'].forEach((pin, i) => { pines[pin] = { x: uartX, y: 77.6 + i * PASO }; });
  ['SPI_MISO', 'SPI_MOSI', 'SPI_SCK', 'SPI_SS', 'SPI_V', 'SPI_G'].forEach((pin, i) => {
    pines[pin] = { x: (azul ? 149.6 : 148) + i % 3 * PASO, y: 166 + Math.floor(i / 3) * PASO };
  });
  ['OUT_5V', 'OUT_3V3', 'GND_OUT'].forEach((pin, i) => { pines[pin] = { x: uartX, y: 160 + i * PASO }; });
  pines.JACK_POS = { x: 12.4, y: 170 };
  pines.JACK_GND = { x: 27.6, y: 170 };
  return pines;
}

const r2 = (n) => Math.round(n * 100) / 100;
const texto = (x, y, contenido, { tam = 5, ancla = 'middle', color = '#ffffff', peso = 'normal' } = {}) =>
  `<text x="${r2(x)}" y="${r2(y)}" font-family="Arial, Helvetica, sans-serif" font-size="${tam}" font-weight="${peso}" text-anchor="${ancla}" fill="${color}">${contenido}</text>`;

function contacto(nombre, posicion, color) {
  const { x, y } = posicion;
  return `<g data-contacto="${nombre}">` +
    `<rect x="${r2(x - 4.3)}" y="${r2(y - 4.3)}" width="8.6" height="8.6" rx="0.7" fill="${color}" stroke="#111820" stroke-width="0.45"/>` +
    `<rect x="${r2(x - 1.8)}" y="${r2(y - 1.8)}" width="3.6" height="3.6" fill="#e1bc5c" stroke="#8e6c28" stroke-width="0.35"/>` +
    `<rect x="${r2(x - 0.8)}" y="${r2(y - 0.8)}" width="1.6" height="1.6" fill="#3e3526"/>` +
    `</g>`;
}

function regulador(x, y, rotulo) {
  return `<rect x="${x}" y="${y}" width="8.5" height="7" rx="0.6" fill="#292d33" stroke="#14171b" stroke-width="0.5"/>` +
    `<rect x="${x + 2.1}" y="${y - 1.8}" width="4.3" height="2" fill="#bac1c8"/>` +
    [0, 1, 2].map((i) => `<rect x="${x + 1 + i * 2.6}" y="${y + 6.8}" width="1.3" height="2.1" fill="#bac1c8"/>`).join('') +
    texto(x + 4.25, y + 14, rotulo, { tam: 4.3 });
}

export function dibujarExpansion(props = {}) {
  const variante = varianteDe(props);
  const azul = variante === 'azul';
  const pines = pinesExpansion(props);
  const { ancho, alto } = TAMANO_EXPANSION;
  const pcb = azul ? '#185ca5' : '#bc2731';
  const borde = azul ? '#103c70' : '#801a24';
  const pista = azul ? '#2c75bc' : '#d2454e';
  const colores = azul ? { S: '#e6c52f', V: '#e6c52f', G: '#e6c52f' } : { S: '#2475c7', V: '#cf3537', G: '#292b30' };
  const contactosCanales = CANALES.flatMap((pin) => ['G', 'V', 'S'].map((fila) => contacto(`${pin}_${fila}`, pines[`${pin}_${fila}`], colores[fila]))).join('');
  const comunicaciones = EXTRAS.filter((pin) => !pin.startsWith('JACK')).map((pin) =>
    contacto(pin, pines[pin], azul ? '#e6c52f' : pin.startsWith('UART') || pin.startsWith('I2C') ? '#e8e4da' : '#292b30')).join('');
  const modo = ['usb', 'jack', 'apagada'].includes(props.alimentacion) ? props.alimentacion : 'usb';
  const alimentacion = modo === 'jack' ? 'ALIM.: JACK' : modo === 'apagada' ? 'SIN ALIMENTACIÓN' : 'ALIM.: USB';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${r2(ancho)}" height="${r2(alto)}" viewBox="0 0 ${r2(ancho)} ${r2(alto)}">` +
    `<title>Expansión E/S ${variante} para Nano clásico</title>` +
    `<desc>Modelo de referencia pendiente de validar físicamente. S es señal, V es 5V y G es tierra. El jack y la salida externa de 3,3V tienen nodos propios.</desc>` +
    // Ventana transparente, incluidos USB y ambas filas del módulo situado debajo.
    `<path d="M7 0.5 H${r2(ancho - 7)} Q${r2(ancho - 0.5)} 0.5 ${r2(ancho - 0.5)} 7 V${r2(alto - 10)} L${r2(ancho - 10)} ${r2(alto - 0.5)} H10 L0.5 ${r2(alto - 10)} V7 Q0.5 0.5 7 0.5 Z M18.2 64 H195.8 V140.1 H18.2 Z" fill="${pcb}" fill-rule="evenodd" stroke="${borde}" stroke-width="1"/>` +
    `<path d="M42 57 H80 V60 H102 M137 60 H180 V57 M40 148 H71 M138 150 H179" fill="none" stroke="${pista}" stroke-width="1.4"/>` +
    [[8, 8], [ancho - 8, 8], [8, alto - 8], [ancho - 8, alto - 8]].map(([x, y]) =>
      `<circle cx="${r2(x)}" cy="${r2(y)}" r="4.4" fill="#f5f6f7" stroke="${borde}" stroke-width="1"/>`).join('') +
    contactosCanales + comunicaciones +
    // Dos reguladores externos representados sin afirmar encapsulado/valor del kit.
    regulador(91, 53.2, '5V') + regulador(118, 53.2, '3,3V') +
    `<circle cx="77" cy="59" r="4.2" fill="#bcc3ca" stroke="#4d5864" stroke-width="0.7"/>` +
    `<path d="M74.6 59 H79.4 M77 56.6 V61.4" stroke="#707983" stroke-width="0.6"/>` +
    `<rect x="136" y="56" width="5.6" height="3" rx="0.6" fill="#d4ae70" stroke="#826b46" stroke-width="0.4"/>` +
    `<rect x="145" y="56" width="5.6" height="3" rx="0.6" fill="#d4ae70" stroke="#826b46" stroke-width="0.4"/>` +
    // Entrada de barril: puntos eléctricos visibles en sus dos contactos.
    `<rect x="5.2" y="145.4" width="30.4" height="29.5" rx="2" fill="#24282e" stroke="#10151a" stroke-width="0.8"/>` +
    `<rect x="1" y="149" width="8" height="18" rx="1" fill="#424952" stroke="#171b20" stroke-width="0.7"/>` +
    `<rect x="1.8" y="152" width="3" height="12" rx="1.4" fill="#11161c"/>` +
    ['JACK_POS', 'JACK_GND'].map((nombre) => {
      const { x, y } = pines[nombre];
      return `<circle data-contacto="${nombre}" cx="${x}" cy="${y}" r="2.8" fill="#d8b361" stroke="#775d2e" stroke-width="0.6"/>`;
    }).join('') +
    // Rótulos de los puertos. La base azul lleva la misma convención S/V/G.
    DIGITALES.map((pin) => texto(pines[`${pin}_S`].x, 20.8, pin, { tam: 4.5, peso: 'bold' })).join('') +
    ANALOGICOS.map((pin) => texto(pines[`${pin}_S`].x, 152.8, pin, { tam: 4.8, peso: 'bold' })).join('') +
    ['G', 'V', 'S'].map((fila) => texto(37.6, pines[`D13_${fila}`].y + 1.8, fila, { tam: 5.3, peso: 'bold' })).join('') +
    ['S', 'V', 'G'].map((fila) => texto(44, pines[`A0_${fila}`].y + 1.8, fila, { tam: 5.3, peso: 'bold' })).join('') +
    texto(13, 17, 'I2C', { tam: 5, peso: 'bold' }) +
    [['I2C_SDA', 'SDA'], ['I2C_SCL', 'SCL'], ['I2C_V', '5V'], ['I2C_G', 'GND']].map(([pin, rotulo]) =>
      texto(pines[pin].x + 5.3, pines[pin].y + 1.7, rotulo, { tam: 4.2, ancla: 'start' })).join('') +
    texto(pines.UART_TX.x - 0.8, 61.9, 'UART', { tam: 4.7, peso: 'bold' }) +
    [['UART_TX', 'TX'], ['UART_RX', 'RX'], ['UART_V', '5V'], ['UART_G', 'GND']].map(([pin, rotulo]) =>
      texto(pines[pin].x - 5.7, pines[pin].y + 1.7, rotulo, { tam: 4.2, ancla: 'end' })).join('') +
    [['SPI_MISO', 'MISO'], ['SPI_MOSI', 'MOSI'], ['SPI_SCK', 'SCK']].map(([pin, rotulo]) =>
      texto(pines[pin].x, 159.5, rotulo, { tam: 3.4 })).join('') +
    [['SPI_SS', 'SS'], ['SPI_V', '5V'], ['SPI_G', 'GND']].map(([pin, rotulo]) =>
      texto(pines[pin].x, 184.5, rotulo, { tam: 3.8 })).join('') +
    texto(pines.SPI_MOSI.x, 195.2, 'SPI', { tam: 5.2, peso: 'bold' }) +
    [['OUT_5V', '5V'], ['OUT_3V3', '3,3V'], ['GND_OUT', 'GND']].map(([pin, rotulo]) =>
      texto(pines[pin].x - 6.1, pines[pin].y + 1.8, rotulo, { tam: 4.2, ancla: 'end' })).join('') +
    texto(pines.OUT_5V.x - 4, 151.8, 'SALIDAS', { tam: 4.2 }) +
    texto(12.4, 183, '+', { tam: 6 }) + texto(27.6, 183, 'GND', { tam: 4.2 }) +
    texto(20.4, 139.1, 'JACK', { tam: 4.8 }) +
    texto(84, 191, 'REGULACIÓN 5V / 3,3V', { tam: 4.6 }) +
    texto(84, 199, alimentacion, { tam: 4.4 }) +
    texto(ancho / 2, 10.8, 'EXPANSIÓN E/S', { tam: 6.3, peso: 'bold' }) +
    `</svg>`;
}
