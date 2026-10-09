// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: batería LiPo de 2 celdas (2S, 7,4 V)
//
// La batería del carro del kit: va a EXT_PWR de la shield y, con el puente PWR puesto, también alimenta el Vin del Uno.
// Tres estados para elegir: llena (8,4 V, 4,2 V por celda), nominal (7,4 V) y descargada (6,4 V, 3,2 V por celda).
// Descargada, avisa al iniciar: por debajo de 3,0 V por celda una LiPo se daña y puede hincharse.
// Modelo: una fuente con resistencia interna; con los motores arrancando, su voltaje baja un poco.
// Tiene dos cables, como la real: el de potencia (rojo y negro, con sus pines) y el de balance (JST-XH de 3 pines),
// que por ahora solo se dibuja: lo usará el probador de celdas.

const MM = 9.6 / 2.54;

export const CARGAS_LIPO = {
  llena: { nombre: 'llena', voltios: 8.4, color: '#2e9e44' },
  nominal: { nombre: 'nominal', voltios: 7.4, color: '#e8a20c' },
  descargada: { nombre: 'descargada', voltios: 6.4, color: '#d7263d' },
};
export const LIPO = {
  celdas: 2,
  ohmios: 0.05, // resistencia interna del paquete y sus cables (típica de una 2S pequeña; por medir)
  minimoCeldaV: 3.0, // por debajo, la celda se daña
  avisoCeldaV: 3.3, // descargada: hay que cargarla
};
export const voltiosLipo = (carga) => (CARGAS_LIPO[carga] || CARGAS_LIPO.nominal).voltios;

// ---- Dibujo: el paquete visto desde arriba (72 × 34 mm, una 2S de unos 1300 mAh) y sus cables.
const ANCHO = 356;
const ALTO = 150;
const X0 = 10;
const Y0 = 10;
const LARGO = 72 * MM;
const GROSOR = 34 * MM;
export const TAMANO_LIPO = { ancho: ANCHO, alto: ALTO };
// Pines del cable de potencia: + (rojo) y − (negro), a 0,1".
export const PINES_LIPO = {
  POS: { x: ANCHO - 12, y: Y0 + 30, color: '#d7263d' },
  NEG: { x: ANCHO - 12, y: Y0 + 39.6, color: '#2b2b2b' },
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
  // cable de balance: negro, rojo intermedio y rojo, hasta un conector JST-XH blanco de 3 pines
  const balance = ['#2b2b2b', '#e05a5a', '#d7263d'].map((color, n) => {
    const yi = Y0 + GROSOR - 40 + n * 4;
    const yf = Y0 + GROSOR - 30 + n * 6;
    return `<path d="M${r2(xFin)} ${r2(yi)} C ${r2(xFin + 18)} ${r2(yi)}, ${r2(xFin + 28)} ${r2(yf)}, ${r2(xFin + 44)} ${r2(yf)}" fill="none" stroke="${color}" stroke-width="1.8"/>`;
  }).join('') +
    `<rect x="${r2(xFin + 44)}" y="${r2(Y0 + GROSOR - 36)}" width="14" height="20" rx="1.5" fill="#f4f3ee" stroke="#9aa0a6" stroke-width="0.8"/>` +
    texto(xFin + 51, Y0 + GROSOR - 4, 'balance', { tam: 8, color: '#5a6673', peso: 'normal' });
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
    [0, 1, 2].map((n) => `<rect x="${r2(X0 + LARGO / 2 - 33 + n * 23)}" y="${Y0 + 66}" width="20" height="12" rx="2" fill="${n < { descargada: 1, nominal: 2, llena: 3 }[carga] ? c.color : '#5a6370'}"/>`).join('') +
    texto(X0 + LARGO / 2, Y0 + 98, `${String(c.voltios).replace('.', ',')} V · ${c.nombre}`, { tam: 12, color: c.color === '#2e9e44' ? '#7fd88f' : c.color === '#e8a20c' ? '#ffd166' : '#ff8a8a', marca: 'data-voltios' }) +
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
