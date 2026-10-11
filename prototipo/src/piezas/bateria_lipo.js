// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: batería LiPo de 2 celdas (2S, 7,4 V)
//
// La batería del carro del kit: va a EXT_PWR de la shield y, con el puente PWR puesto, también alimenta el Vin del Uno.
// Cuatro estados para elegir: llena (8,4 V, 4,2 V por celda), nominal (7,4 V), descargada (6,4 V, 3,2 V por celda) y
// desbalanceada (7,4 V, pero con una celda en 3,95 V y la otra en 3,45 V).
// Descargada o desbalanceada, avisa al iniciar: por debajo de 3,0 V por celda una LiPo se daña y puede hincharse.
// Modelo: dos celdas en serie con resistencia interna; con los motores arrancando, su voltaje baja un poco.
// Tiene dos cables, como la real: el de potencia (rojo y negro) y el de balance (JST-XH de 3 pines: BAL0 es el −,
// BAL1 el punto entre las dos celdas y BAL2 el +). Por el de balance se mide cada celda con el probador.

const MM = 9.6 / 2.54;

export const CARGAS_LIPO = {
  llena: { nombre: 'llena', voltios: 8.4, celdas: [4.2, 4.2], color: '#2e9e44', barras: 3 },
  nominal: { nombre: 'nominal', voltios: 7.4, celdas: [3.7, 3.7], color: '#e8a20c', barras: 2 },
  descargada: { nombre: 'descargada', voltios: 6.4, celdas: [3.2, 3.2], color: '#d7263d', barras: 1 },
  desbalanceada: { nombre: 'desbalanceada', voltios: 7.4, celdas: [3.95, 3.45], color: '#c2410c', barras: 2 },
};
export const LIPO = {
  celdas: 2,
  ohmios: 0.05, // resistencia interna del paquete y sus cables (típica de una 2S pequeña; por medir)
  minimoCeldaV: 3.0, // por debajo, la celda se daña
  avisoCeldaV: 3.3, // descargada: hay que cargarla
};
export const voltiosLipo = (carga) => (CARGAS_LIPO[carga] || CARGAS_LIPO.nominal).voltios;
export const celdasLipo = (carga) => (CARGAS_LIPO[carga] || CARGAS_LIPO.nominal).celdas;

// ---- Dibujo: el paquete visto desde arriba (72 × 34 mm, una 2S de unos 1300 mAh) y sus cables.
const ANCHO = 360;
const ALTO = 150;
const X0 = 10;
const Y0 = 10;
const LARGO = 72 * MM;
const GROSOR = 34 * MM;
export const TAMANO_LIPO = { ancho: ANCHO, alto: ALTO };
// Pines del cable de potencia: + (rojo) y − (negro), a 0,1".
// Pines del conector de balance (JST-XH): − (negro), punto medio (rojo claro) y + (rojo), a 0,1" para cablearlos.
const XBAL = X0 + LARGO + 58;
const YBAL = Y0 + GROSOR - 34;
export const PINES_LIPO = {
  POS: { x: ANCHO - 12, y: Y0 + 30, color: '#d7263d' },
  NEG: { x: ANCHO - 12, y: Y0 + 39.6, color: '#2b2b2b' },
  BAL0: { x: XBAL, y: YBAL, color: '#2b2b2b' },
  BAL1: { x: XBAL, y: YBAL + 9.6, color: '#e05a5a' },
  BAL2: { x: XBAL, y: YBAL + 19.2, color: '#d7263d' },
};

const r2 = (n) => Math.round(n * 100) / 100;
const texto = (x, y, t, { tam = 11, color = '#ffffff', peso = 'bold', ancla = 'middle', marca = '' } = {}) =>
  `<text${marca ? ` ${marca}="1"` : ''} x="${r2(x)}" y="${r2(y)}" font-family="Arial, Helvetica, sans-serif" font-size="${tam}" font-weight="${peso}" text-anchor="${ancla}" fill="${color}">${t}</text>`;

export function dibujarLipo(carga = 'nominal') {
  const c = CARGAS_LIPO[carga] || CARGAS_LIPO.nominal;
  const xFin = X0 + LARGO;
  const potencia = ['POS', 'NEG'].map((k, n) => {
    const p = PINES_LIPO[k];
    const yi = Y0 + 24 + n * 10;
    return `<path d="M${r2(xFin)} ${r2(yi)} C ${r2(xFin + 26)} ${r2(yi)}, ${r2(p.x - 26)} ${r2(p.y)}, ${r2(p.x - 6)} ${r2(p.y)}" fill="none" stroke="${p.color}" stroke-width="4.2" stroke-linecap="round"/>` +
      `<rect x="${r2(p.x - 4.4)}" y="${r2(p.y - 3.4)}" width="8.8" height="6.8" rx="1" fill="#222222"/>`;
  }).join('');
  // cable de balance: negro, rojo intermedio y rojo, hasta un conector JST-XH blanco de 3 pines (BAL0, BAL1, BAL2)
  const balance = ['BAL0', 'BAL1', 'BAL2'].map((k, n) => {
    const p = PINES_LIPO[k];
    const yi = Y0 + GROSOR - 40 + n * 4;
    return `<path d="M${r2(xFin)} ${r2(yi)} C ${r2(xFin + 18)} ${r2(yi)}, ${r2(p.x - 30)} ${r2(p.y)}, ${r2(p.x - 7)} ${r2(p.y)}" fill="none" stroke="${p.color}" stroke-width="1.8"/>`;
  }).join('') +
    `<rect x="${r2(XBAL - 7)}" y="${r2(YBAL - 6)}" width="14" height="31.2" rx="1.5" fill="#f4f3ee" stroke="#9aa0a6" stroke-width="0.8"/>` +
    ['BAL0', 'BAL1', 'BAL2'].map((k) => `<rect x="${r2(XBAL - 2.4)}" y="${r2(PINES_LIPO[k].y - 2.4)}" width="4.8" height="4.8" fill="#c9a227"/>`).join('') +
    texto(XBAL - 14, YBAL + 2.5, '−', { tam: 8, color: '#5a6673' }) + texto(XBAL - 14, YBAL + 21.7, '+', { tam: 8, color: '#5a6673' }) +
    texto(XBAL, Y0 + GROSOR + 2, 'balance', { tam: 8, color: '#5a6673', peso: 'normal' });
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}" viewBox="0 0 ${ANCHO} ${ALTO}">` +
    `<title>Batería LiPo 2S 7,4 V (${c.nombre})</title>` +
    potencia + balance +
    // el paquete y su etiqueta
    `<rect x="${X0}" y="${Y0}" width="${r2(LARGO)}" height="${r2(GROSOR)}" rx="8" fill="#2f3640" stroke="#1b1f24" stroke-width="1.2"/>` +
    `<rect x="${X0 + 14}" y="${Y0 + 12}" width="${r2(LARGO - 28)}" height="${r2(GROSOR - 24)}" rx="4" fill="#3f4752"/>` +
    texto(X0 + LARGO / 2, Y0 + 36, 'LiPo 2S · 7,4 V', { tam: 15 }) +
    texto(X0 + LARGO / 2, Y0 + 54, '2 celdas · 1300 mAh', { tam: 10, peso: 'normal', color: '#c9ccd1' }) +
    // estado de carga: barra de 3 niveles y el voltaje
    `<g data-carga="1">` +
    [0, 1, 2].map((n) => `<rect x="${r2(X0 + LARGO / 2 - 33 + n * 23)}" y="${Y0 + 66}" width="20" height="12" rx="2" fill="${n < c.barras ? c.color : '#5a6370'}"/>`).join('') +
    texto(X0 + LARGO / 2, Y0 + 98, `${String(c.voltios).replace('.', ',')} V · ${c.nombre}`, { tam: 12, color: { '#2e9e44': '#7fd88f', '#e8a20c': '#ffd166', '#c2410c': '#ffb27a' }[c.color] || '#ff8a8a', marca: 'data-voltios' }) +
    `</g>` +
    `</svg>`
  );
}

// Al simular, el voltaje real (con la caída por la corriente) reemplaza al nominal.
export function mostrarLipo(el, carga, estado) {
  const t = el.querySelector('[data-voltios]');
  if (!t) return;
  const c = CARGAS_LIPO[carga] || CARGAS_LIPO.nominal;
  const v = estado && typeof estado.voltios === 'number' ? estado.voltios : c.voltios;
  t.textContent = `${v.toFixed(2).replace('.', ',')} V · ${c.nombre}`;
}
