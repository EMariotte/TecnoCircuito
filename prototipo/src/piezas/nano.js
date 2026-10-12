// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: Nano clásico como módulo montable
//
// SVG original. El marco común permite montar la expansión sin mover el Nano.
// Los 58 × 54 mm son la medida anunciada de la expansión, pendiente de medir en el kit.
// El módulo nominal mide 45 × 18 mm; filas a 15,24 mm y paso de 2,54 mm.
// Orden de terminales contrastado con el pinout oficial (datos, sin copiar su dibujo):
// https://content.arduino.cc/assets/Pinout-NANO_latest.pdf
// USB a la izquierda. A6/A7 son únicamente entradas analógicas del ATmega328P.

const MM = 9.6 / 2.54;
const PASO = 9.6;
export const TAMANO_NANO = { ancho: 58 * MM, alto: 54 * MM };

const CUERPO = {
  x: (TAMANO_NANO.ancho - 45 * MM) / 2,
  y: (TAMANO_NANO.alto - 18 * MM) / 2,
  ancho: 45 * MM,
  alto: 18 * MM,
};
const X_PIN = (TAMANO_NANO.ancho - 14 * PASO) / 2;
const Y_SUP = (TAMANO_NANO.alto - 6 * PASO) / 2;
const Y_INF = Y_SUP + 6 * PASO;
const FILAS = [
  { y: Y_SUP, nombres: ['D12', 'D11', 'D10', 'D9', 'D8', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2', 'GND2', 'RESET2', 'D0', 'D1'] },
  { y: Y_INF, nombres: ['D13', '3V3', 'AREF', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', '5V', 'RESET', 'GND1', 'VIN'] },
];

// Claves locales del contrato: el lienzo les antepone «placa.».
// Los dos RESET y los dos GND son terminales físicos diferentes.
export const PINES_NANO = Object.fromEntries(FILAS.flatMap(({ y, nombres }) =>
  nombres.map((nombre, i) => [nombre, { x: X_PIN + i * PASO, y }])));

const r2 = (n) => Math.round(n * 100) / 100;
const texto = (x, y, contenido, tam = 5, color = '#f5f9ff') =>
  `<text x="${r2(x)}" y="${r2(y)}" font-family="Arial, Helvetica, sans-serif" font-size="${tam}" text-anchor="middle" fill="${color}">${contenido}</text>`;
const COLORES_LED = {
  PWR: { apagado: '#19472b', encendido: '#45e76e' },
  L: { apagado: '#65501d', encendido: '#ffcf40' },
  RX: { apagado: '#644022', encendido: '#ff9e39' },
  TX: { apagado: '#644022', encendido: '#ff9e39' },
};

function integrado(x, y, lado) {
  let patas = '';
  for (let i = 0; i < 8; i++) {
    const offset = 2.5 + i * (lado - 5) / 7;
    patas += `<rect x="${r2(x + offset - 0.65)}" y="${r2(y - 2.2)}" width="1.3" height="2.4" fill="#b8c0c8"/>`;
    patas += `<rect x="${r2(x + offset - 0.65)}" y="${r2(y + lado - 0.2)}" width="1.3" height="2.4" fill="#b8c0c8"/>`;
    patas += `<rect x="${r2(x - 2.2)}" y="${r2(y + offset - 0.65)}" width="2.4" height="1.3" fill="#b8c0c8"/>`;
    patas += `<rect x="${r2(x + lado - 0.2)}" y="${r2(y + offset - 0.65)}" width="2.4" height="1.3" fill="#b8c0c8"/>`;
  }
  return patas + `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(lado)}" height="${r2(lado)}" rx="1.2" fill="#25282c" stroke="#101214" stroke-width="0.6"/>` +
    `<circle cx="${r2(x + 2.8)}" cy="${r2(y + 2.8)}" r="1" fill="#7e848a"/>`;
}

export function dibujarNano(props = {}) {
  const { ancho, alto } = TAMANO_NANO;
  const centroY = alto / 2;
  const leds = ['PWR', 'L', 'RX', 'TX'].map((nombre, i) => {
    const x = CUERPO.x + 37 + i * 10.6;
    return `<rect data-led="${nombre}" x="${r2(x - 2.4)}" y="${r2(centroY + 10)}" width="4.8" height="3.2" rx="0.6" fill="${COLORES_LED[nombre].apagado}" stroke="#20252b" stroke-width="0.4"/>` +
      texto(x, centroY + 19, nombre, 4.2);
  }).join('');
  const terminales = FILAS.map(({ y, nombres }, fila) => nombres.map((nombre) => {
    const { x } = PINES_NANO[nombre];
    const rotulo = nombre.startsWith('GND') ? 'GND' : nombre.startsWith('RESET') ? 'RST' : nombre;
    return `<circle cx="${r2(x)}" cy="${r2(y)}" r="2.7" fill="#d7b763" stroke="#8a6f37" stroke-width="0.5"/>` +
      `<rect x="${r2(x - 1.05)}" y="${r2(y - 1.05)}" width="2.1" height="2.1" fill="#55504a"/>` +
      texto(x, y + (fila ? -5.2 : 9), rotulo, rotulo.length > 3 ? 3.5 : 4);
  }).join('')).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${r2(ancho)}" height="${r2(alto)}" viewBox="0 0 ${r2(ancho)} ${r2(alto)}">` +
    `<title>Nano clásico · módulo ATmega328P</title>` +
    `<desc>Módulo con treinta terminales físicos. A6 y A7 solo admiten entrada analógica. Dibujo y medidas nominales pendientes de comparación con el kit.</desc>` +
    `<rect x="${r2(CUERPO.x)}" y="${r2(CUERPO.y)}" width="${r2(CUERPO.ancho)}" height="${r2(CUERPO.alto)}" rx="3.3" fill="#14628e" stroke="#0a3f60" stroke-width="0.9"/>` +
    `<path d="M${r2(CUERPO.x + 35)} ${r2(centroY - 9)} H${r2(CUERPO.x + 64)} V${r2(centroY - 16)} H${r2(CUERPO.x + 94)} M${r2(CUERPO.x + 91)} ${r2(centroY + 9)} H${r2(CUERPO.x + 125)} V${r2(centroY + 22)}" fill="none" stroke="#277ba6" stroke-width="1.1"/>` +
    // Mini-USB: la ventana de la expansión deja visible también su boca metálica.
    `<rect x="${r2(CUERPO.x - 5.5)}" y="${r2(centroY - 12.5)}" width="25.5" height="25" rx="2" fill="#cbd0d6" stroke="#6c747d" stroke-width="0.8"/>` +
    `<rect x="${r2(CUERPO.x - 5.5)}" y="${r2(centroY - 8.5)}" width="6.2" height="17" rx="0.8" fill="#525b65"/>` +
    `<rect x="${r2(CUERPO.x - 4.2)}" y="${r2(centroY - 5.5)}" width="2.5" height="11" fill="#1d252d"/>` +
    integrado(CUERPO.x + 90, centroY - 14, 26) +
    texto(CUERPO.x + 103, centroY - 1, '328P', 4.5, '#b9bec4') +
    `<rect x="${r2(CUERPO.x + 127)}" y="${r2(centroY - 14)}" width="12" height="6.5" rx="2" fill="#c5c9cd" stroke="#737b84" stroke-width="0.5"/>` +
    `<line x1="${r2(CUERPO.x + 130)}" y1="${r2(centroY - 12)}" x2="${r2(CUERPO.x + 136)}" y2="${r2(centroY - 12)}" stroke="#727b83" stroke-width="0.5"/>` +
    // Pulsador RESET, solo apariencia: no crea terminales adicionales.
    `<rect x="${r2(CUERPO.x + 144)}" y="${r2(centroY - 6)}" width="10" height="11" rx="1.2" fill="#b9c0c7" stroke="#69737f" stroke-width="0.5"/>` +
    `<circle cx="${r2(CUERPO.x + 149)}" cy="${r2(centroY - 0.5)}" r="3" fill="#343a41"/>` +
    texto(CUERPO.x + 149, centroY + 12, 'RESET', 4.3) +
    leds + terminales +
    texto(CUERPO.x + 53, centroY - 13, 'NANO CLÁSICO', 6.2) +
    texto(CUERPO.x + 103, centroY + 17, 'A6 / A7: solo analógico', 4.5) +
    `</svg>`;
}

// Admite la foto del núcleo ({ledPower, led13, ledRX, ledTX}), {pwr, l, rx, tx}
// o {leds: {PWR, L, RX, TX}}.
// No se deduce energía de la apariencia: el núcleo decide si hay alimentación.
export function mostrarNano(svg, estado = {}) {
  const clavesFoto = { PWR: 'ledPower', L: 'led13', RX: 'ledRX', TX: 'ledTX' };
  for (const [nombre, colores] of Object.entries(COLORES_LED)) {
    const intensidad = estado?.leds?.[nombre] ?? estado?.[nombre.toLowerCase()] ?? estado?.[clavesFoto[nombre]] ?? 0;
    const color = intensidad > 0 ? colores.encendido : colores.apagado;
    const led = svg.querySelector(`[data-led="${nombre}"]`);
    if (led && led.getAttribute('fill') !== color) led.setAttribute('fill', color);
  }
}
