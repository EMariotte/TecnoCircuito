// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: shield de motores L293D (Rev4 del kit)
//
// La shield se monta encima del Uno: su dibujo usa el mismo marco que el del Uno (72,58 × 53,34 mm, con 4 mm a la
// izquierda para el conector USB) y sus conectores apilables quedan sobre los pines del Uno, que se siguen pudiendo
// cablear desde arriba, como en la placa real.
//
// Por dentro (modelo lógico en src/potencia.js):
//   74HC595 (U3): datos por el pin 8, reloj por el 4, cerrojo por el 12 y habilitación (activa en BAJO) por el 7.
//   L293D (U1 y U2): dos puentes H cada uno. Velocidad por PWM: M1 = 11, M2 = 3, M3 = 6, M4 = 5.
//   Qué salida del 74HC595 va a cada motor (A, B): M1 = Q2, Q3 · M2 = Q1, Q4 · M3 = Q5, Q7 · M4 = Q0, Q6.
//   Datos de la librería del kit (AFMotor_R4, BSD-3) y de las hojas de datos; por confirmar con continuidad en la placa.
//   Servos: SERVO_1 = pin 10 y SERVO_2 = pin 9, alimentados por el 5V del Uno.
//   EXT_PWR: la alimentación de los motores. Con el puente PWR puesto, también alimenta el Vin del Uno.
// El dibujo se hizo a partir de la placa del kit y de las hojas de datos, sin copiar el de nadie.

const MM = 9.6 / 2.54;
export const TAMANO_SHIELD = { ancho: 72.58 * MM, alto: 53.34 * MM };
const BORDE_X = 4 * MM; // donde empieza la placa (a la izquierda queda el conector USB del Uno)
const PASO_BORNERA = 5 * MM; // borneras de tornillo de 5 mm

// Pines del Uno (posición en el dibujo del Uno): los conectores apilables de la shield van justo encima.
const FILAS_UNO = [
  { y: 9, xs: [87, 97, 106, 115.5, 125, 134.5, 144, 153.5, 163, 173] },
  { y: 9, xs: [189, 198.5, 208, 217.5, 227, 236.5, 246, 255.5] },
  { y: 191.5, xs: [121.5, 131, 140.5, 150, 160, 169.5, 179, 188.5] },
  { y: 191.5, xs: [208, 217.5, 227, 236.5, 246, 255.5] },
];

// Puntos de conexión de la shield (bornes de tornillo y pines de los servos).
const xIzq = BORDE_X + 4.6 * MM;
const xDer = TAMANO_SHIELD.ancho - 0.5 - 4.6 * MM; // a la misma distancia del borde que la de M1 y M2
const yBorneras = 60;
const bornera = (x, i) => ({ x, y: yBorneras + i * PASO_BORNERA });
export const PINES_SHIELD = {
  M1A: bornera(xIzq, 0), M1B: bornera(xIzq, 1), GND_IZQ: bornera(xIzq, 2), M2A: bornera(xIzq, 3), M2B: bornera(xIzq, 4),
  M4A: bornera(xDer, 0), M4B: bornera(xDer, 1), GND_DER: bornera(xDer, 2), M3A: bornera(xDer, 3), M3B: bornera(xDer, 4),
  EXT_POS: { x: 86, y: 176 }, EXT_GND: { x: 86 + PASO_BORNERA, y: 176 },
  S2_SIG: { x: 26, y: 14 }, S2_POS: { x: 35.6, y: 14 }, S2_GND: { x: 45.2, y: 14 },
  S1_SIG: { x: 26, y: 24 }, S1_POS: { x: 35.6, y: 24 }, S1_GND: { x: 45.2, y: 24 },
};
export const ROTULOS_SHIELD = {
  M1A: 'M1 · borne A del motor 1', M1B: 'M1 · borne B del motor 1',
  M2A: 'M2 · borne A del motor 2', M2B: 'M2 · borne B del motor 2',
  M3A: 'M3 · borne A del motor 3', M3B: 'M3 · borne B del motor 3',
  M4A: 'M4 · borne A del motor 4', M4B: 'M4 · borne B del motor 4',
  GND_IZQ: 'GND · tierra (−)', GND_DER: 'GND · tierra (−)',
  EXT_POS: 'EXT_PWR + · batería de los motores (+)', EXT_GND: 'EXT_PWR GND · batería de los motores (−)',
  S1_SIG: 'SERVO_1 · señal (pin 10)', S1_POS: 'SERVO_1 · + (5V)', S1_GND: 'SERVO_1 · − (GND)',
  S2_SIG: 'SERVO_2 · señal (pin 9)', S2_POS: 'SERVO_2 · + (5V)', S2_GND: 'SERVO_2 · − (GND)',
};
// Lo que la shield une por dentro con el Uno (para las conexiones del circuito).
export const PUENTES_SHIELD = [
  ['S1_SIG', 'placa.D10'], ['S2_SIG', 'placa.D9'],
  ['S1_POS', 'placa.5V'], ['S2_POS', 'placa.5V'],
  ['S1_GND', 'placa.GND1'], ['S2_GND', 'placa.GND1'],
  ['GND_IZQ', 'placa.GND1'], ['GND_DER', 'placa.GND1'], ['EXT_GND', 'placa.GND1'],
];

const r2 = (n) => Math.round(n * 100) / 100;
const texto = (x, y, t, { tam = 6.2, ancla = 'middle', peso = 'bold', color = '#ffffff', giro = 0 } = {}) =>
  `<text x="${r2(x)}" y="${r2(y)}" font-family="Arial, Helvetica, sans-serif" font-size="${tam}" font-weight="${peso}" text-anchor="${ancla}" fill="${color}"${giro ? ` transform="rotate(${giro} ${r2(x)} ${r2(y)})"` : ''}>${t}</text>`;

// Integrado DIP-16 visto desde arriba, de pie como en la placa real: cuerpo de 19,3 × 6,4 mm, 8 patas por lado a
// 2,54 mm y la muesca de la pata 1 arriba. Se dibuja acostado y se gira 90°; su nombre se lee a lo largo, como en el chip.
function dip16(cx, cy, nombre, ref) {
  const largo = 19.3 * MM;
  const ancho = 6.4 * MM;
  const x0 = cx - largo / 2;
  const y0 = cy - ancho / 2;
  let patas = '';
  for (let i = 0; i < 8; i++) {
    const x = cx - 3.5 * 2.54 * MM + i * 2.54 * MM;
    patas += `<rect x="${r2(x - 1.6)}" y="${r2(y0 - 3.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`;
    patas += `<rect x="${r2(x - 1.6)}" y="${r2(y0 + ancho - 0.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`;
  }
  return (
    `<g transform="rotate(90 ${r2(cx)} ${r2(cy)})">` +
    patas +
    `<rect x="${r2(x0)}" y="${r2(y0)}" width="${r2(largo)}" height="${r2(ancho)}" rx="1.5" fill="#1d1f22" stroke="#000000" stroke-width="0.6"/>` +
    `<path d="M${r2(x0)} ${r2(cy - 2.6)} a 2.6 2.6 0 0 1 0 5.2" fill="#3a3d42"/>` + // muesca de la pata 1
    texto(cx + 1.5, cy + 2.6, nombre, { tam: 7.4, color: '#e8e8e8' }) +
    `</g>` +
    texto(cx, cy - largo / 2 - 3, ref, { tam: 5.2 })
  );
}

// Bornera de tornillo: un bloque con un tornillo por borne.
function bornera_(x, y0, n, vertical = true) {
  const w = vertical ? 5.6 * MM : n * PASO_BORNERA + 0.6 * MM;
  const h = vertical ? n * PASO_BORNERA + 0.6 * MM : 5.6 * MM;
  const bx = vertical ? x - w / 2 : x - PASO_BORNERA / 2 - 0.3 * MM;
  const by = vertical ? y0 - PASO_BORNERA / 2 - 0.3 * MM : y0 - h / 2;
  let tornillos = '';
  for (let i = 0; i < n; i++) {
    const tx = vertical ? x : x + i * PASO_BORNERA;
    const ty = vertical ? y0 + i * PASO_BORNERA : y0;
    tornillos += `<circle cx="${r2(tx)}" cy="${r2(ty)}" r="6.4" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/>`;
    tornillos += `<line x1="${r2(tx - 4.2)}" y1="${r2(ty)}" x2="${r2(tx + 4.2)}" y2="${r2(ty)}" stroke="#555a61" stroke-width="1.4"/>`;
  }
  return `<rect x="${r2(bx)}" y="${r2(by)}" width="${r2(w)}" height="${r2(h)}" rx="1.5" fill="#2364b8" stroke="#123b70" stroke-width="0.8"/>` + tornillos;
}

// Capacitor electrolítico visto desde arriba
const electrolitico = (x, y, d) =>
  `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(d / 2)}" fill="#2a2a2a" stroke="#000000" stroke-width="0.6"/>` +
  `<path d="M${r2(x)} ${r2(y - d / 2)} a ${r2(d / 2)} ${r2(d / 2)} 0 0 1 0 ${r2(d)}" fill="#8a8f96" opacity="0.55"/>` +
  `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(d / 2 - 2.2)}" fill="none" stroke="#c9ccd1" stroke-width="0.5"/>`;

// La shield completa. `puentePWR`: si el puente PWR está puesto (la batería de EXT_PWR también alimenta el Vin del Uno).
export function dibujarShield(puentePWR = true) {
  const { ancho, alto } = TAMANO_SHIELD;
  const headers = FILAS_UNO.map(({ y, xs }) => {
    const x0 = xs[0] - 4.6;
    const x1 = xs[xs.length - 1] + 4.6;
    return `<rect x="${r2(x0)}" y="${r2(y - 4.6)}" width="${r2(x1 - x0)}" height="9.2" fill="#151515"/>` +
      xs.map((x) => `<rect x="${r2(x - 1.6)}" y="${r2(y - 1.6)}" width="3.2" height="3.2" fill="#4a4a4a"/>`).join('');
  }).join('');
  const servos = ['S2', 'S1'].map((s) => ['SIG', 'POS', 'GND'].map((p) => {
    const q = PINES_SHIELD[`${s}_${p}`];
    return `<rect x="${r2(q.x - 4.4)}" y="${r2(q.y - 4.4)}" width="8.8" height="8.8" fill="#151515"/><rect x="${r2(q.x - 1.4)}" y="${r2(q.y - 1.4)}" width="2.8" height="2.8" fill="#d6b45a"/>`;
  }).join('')).join('');
  const jumperX = 132;
  const jumperY = 176;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${r2(ancho)}" height="${r2(alto)}" viewBox="0 0 ${r2(ancho)} ${r2(alto)}">` +
    `<title>Shield de motores L293D</title>` +
    // placa
    `<rect x="${r2(BORDE_X)}" y="0.5" width="${r2(ancho - BORDE_X - 0.5)}" height="${r2(alto - 1)}" rx="6" fill="#1f5cab" stroke="#123b70" stroke-width="1"/>` +
    // pistas de adorno (cobre bajo la máscara)
    `<path d="M44 70 H66 M44 112 H66 M221 70 H245 M221 112 H245 M98 96 H129 M161 96 H189" stroke="#2f72c8" stroke-width="2" fill="none"/>` +
    headers +
    // integrados de pie, en fila como en la placa real: L293D (U1), 74HC595 (U3) y L293D (U2), con sus nombres
    dip16(82, 86, 'L293D', 'U1') +
    dip16(145, 86, '74HC595', 'U3') +
    dip16(205, 86, 'L293D', 'U2') +
    // capacitores y LED de encendido
    electrolitico(118, 140, 6.3 * MM) + electrolitico(205, 140, 6.3 * MM) +
    `<rect x="146" y="128" width="10" height="5" rx="1" fill="#d9a441"/><rect x="160" y="128" width="10" height="5" rx="1" fill="#d9a441"/>` +
    `<circle data-led-pwr="1" cx="${jumperX + 20}" cy="${jumperY}" r="3.2" fill="#1f5a2c" stroke="#0e2a14" stroke-width="0.6"/>` +
    // bornes de los motores, EXT_PWR y servos
    bornera_(xIzq, yBorneras, 5) + bornera_(xDer, yBorneras, 5) +
    bornera_(PINES_SHIELD.EXT_POS.x, PINES_SHIELD.EXT_POS.y, 2, false) +
    servos +
    // puente PWR (dos pines y, si está puesto, el capuchón)
    `<rect x="${jumperX - 9}" y="${jumperY - 4.4}" width="18" height="8.8" fill="#151515"/>` +
    `<rect x="${jumperX - 6.4}" y="${jumperY - 1.4}" width="2.8" height="2.8" fill="#d6b45a"/><rect x="${jumperX + 3.6}" y="${jumperY - 1.4}" width="2.8" height="2.8" fill="#d6b45a"/>` +
    (puentePWR ? `<rect data-puente="1" x="${jumperX - 9.6}" y="${jumperY - 5.2}" width="19.2" height="10.4" rx="1.5" fill="#2b2b2b" stroke="#000000" stroke-width="0.6"/>` : '') +
    // botón de reinicio
    `<rect x="${r2(BORDE_X + 6)}" y="160" width="18" height="18" rx="2" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/><circle cx="${r2(BORDE_X + 15)}" cy="169" r="5" fill="#2b2b2b"/>` +
    // serigrafía
    texto(xIzq + 13, yBorneras + PASO_BORNERA / 2 + 3, 'M1', { tam: 7 }) + texto(xIzq + 13, yBorneras + 3.5 * PASO_BORNERA + 3, 'M2', { tam: 7 }) +
    texto(xIzq + 12, yBorneras + 2 * PASO_BORNERA + 2.5, 'GND', { tam: 5 }) +
    texto(xDer - 13, yBorneras + PASO_BORNERA / 2 + 3, 'M4', { tam: 7 }) + texto(xDer - 13, yBorneras + 3.5 * PASO_BORNERA + 3, 'M3', { tam: 7 }) +
    texto(xDer - 12, yBorneras + 2 * PASO_BORNERA + 2.5, 'GND', { tam: 5 }) +
    texto(PINES_SHIELD.EXT_POS.x + PASO_BORNERA / 2, 193, 'EXT_PWR', { tam: 5.6 }) +
    texto(PINES_SHIELD.EXT_POS.x, 165, '+M', { tam: 5 }) + texto(PINES_SHIELD.EXT_GND.x, 165, 'GND', { tam: 5 }) +
    texto(jumperX, jumperY - 8, 'PWR', { tam: 5.6 }) +
    texto(52, 16, 'SERVO_2', { tam: 5, ancla: 'start' }) + texto(52, 26, 'SERVO_1', { tam: 5, ancla: 'start' }) +
    texto(26, 7.4, 'S', { tam: 4.6 }) + texto(35.6, 7.4, '+', { tam: 5 }) + texto(45.2, 7.4, '−', { tam: 5 }) +
    texto(BORDE_X + 15, 156, 'RESET', { tam: 4.6 }) +
    texto(196, 162, 'Motor Shield L293D', { tam: 6.4 }) +
    texto(196, 170, 'Rev4', { tam: 5, peso: 'normal' }) +
    `</svg>`
  );
}
