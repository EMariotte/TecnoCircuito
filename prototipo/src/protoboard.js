// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: protoboard
//
// Protoboard (prototipo 4): geometría, nombres de los huecos, tiras conectadas por dentro y dibujo.
// No toca la página: la usan el lienzo (dibujo y encaje de las patas) y conexiones.js (las tiras).
//
// Media protoboard de 400 puntos, como la del kit: 30 columnas; filas a–e arriba y f–j abajo, separadas por el
// canal central (0,3", donde se monta un chip o un botón); y dos rieles arriba y dos abajo, de 25 huecos cada uno.
//   Huecos de las tiras: a1 … j30 (fila y columna, como vienen impresos en la protoboard).
//   Huecos de los rieles: s+3, s-3 (superior), i+3, i-3 (inferior); el número es la columna que tienen debajo.
// Por dentro: cada columna une a–e y, aparte, f–j; cada riel está unido de punta a punta.

export const PASO = 9.6; // 0,1 pulgadas: la distancia entre huecos (la misma de los pines de la placa)
const MARGEN_X = 14.4;
const FILAS_ARRIBA = ['a', 'b', 'c', 'd', 'e'];
const FILAS_ABAJO = ['f', 'g', 'h', 'i', 'j'];
// Altura (y) de cada fila, en px del dibujo. Entre e y f está el canal central: 3 pasos.
const Y = { 's+': 11, 's-': 20.6, a: 39.8, b: 49.4, c: 59, d: 68.6, e: 78.2, f: 107, g: 116.6, h: 126.2, i: 135.8, j: 145.4, 'i-': 164.6, 'i+': 174.2 };
const RIELES = [
  ['s+', 'superior', '+'],
  ['s-', 'superior', '−'],
  ['i-', 'inferior', '−'],
  ['i+', 'inferior', '+'],
];

export const TIPOS_PROTOBOARD = {
  media: { nombre: 'Media protoboard (400 puntos)', columnas: 30, ancho: 307.2, alto: 185.2 },
};

const xColumna = (c) => MARGEN_X + (c - 1) * PASO;
// Los rieles tienen 25 huecos en grupos de 5: falta uno cada 6 columnas (la 1, 7, 13, 19 y 25).
const hayRiel = (c) => c >= 2 && (c - 1) % 6 !== 0;

// Todos los huecos: { nombre, x, y, tira }. La tira es el grupo de huecos unidos por dentro.
const memoriaHuecos = new Map();
export function huecos(tipo = 'media') {
  if (memoriaHuecos.has(tipo)) return memoriaHuecos.get(tipo);
  const t = TIPOS_PROTOBOARD[tipo] || TIPOS_PROTOBOARD.media;
  const lista = [];
  memoriaHuecos.set(tipo, lista);
  for (let c = 1; c <= t.columnas; c++) {
    for (const f of FILAS_ARRIBA) lista.push({ nombre: f + c, x: xColumna(c), y: Y[f], tira: 'arriba' + c });
    for (const f of FILAS_ABAJO) lista.push({ nombre: f + c, x: xColumna(c), y: Y[f], tira: 'abajo' + c });
    for (const [r] of RIELES) if (hayRiel(c)) lista.push({ nombre: r + c, x: xColumna(c), y: Y[r], tira: r });
  }
  return lista;
}

// Grupos de huecos unidos por dentro (para conexiones.js y para iluminar la tira al pasar el mouse).
const memoriaTiras = new Map();
export function tiras(tipo = 'media') {
  if (memoriaTiras.has(tipo)) return memoriaTiras.get(tipo);
  const grupos = new Map();
  memoriaTiras.set(tipo, grupos);
  for (const h of huecos(tipo)) {
    if (!grupos.has(h.tira)) grupos.set(h.tira, []);
    grupos.get(h.tira).push(h.nombre);
  }
  return grupos;
}

export function tiraDe(nombre) {
  const riel = /^([si][+-])\d+$/.exec(nombre);
  if (riel) return riel[1];
  const m = /^([a-j])(\d+)$/.exec(nombre);
  if (!m) return null;
  return (FILAS_ARRIBA.includes(m[1]) ? 'arriba' : 'abajo') + m[2];
}

// Lo que lee el aprendiz al pasar el mouse por un hueco.
export function rotuloHueco(nombre) {
  const riel = /^([si])([+-])(\d+)$/.exec(nombre);
  if (riel) {
    const lado = riel[1] === 's' ? 'de arriba' : 'de abajo';
    return `Protoboard: riel ${riel[2] === '+' ? '+' : '−'} ${lado} · todo el riel está unido`;
  }
  const m = /^([a-j])(\d+)$/.exec(nombre);
  if (!m) return 'Protoboard';
  const [primera, ultima] = FILAS_ARRIBA.includes(m[1]) ? ['a', 'e'] : ['f', 'j'];
  return `Protoboard: hueco ${m[1]}${m[2]} · unido por dentro con ${primera}${m[2]}–${ultima}${m[2]}`;
}

// Dibujo SVG (texto). Solo usa atributos, así se ve igual dentro del lienzo y en la imagen exportada.
export function dibujarProtoboard(tipo = 'media') {
  const t = TIPOS_PROTOBOARD[tipo] || TIPOS_PROTOBOARD.media;
  const { ancho, alto, columnas } = t;
  const p = [];
  p.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}" viewBox="0 0 ${ancho} ${alto}">`);
  p.push(`<rect x="0.5" y="0.5" width="${ancho - 1}" height="${alto - 1}" rx="4" fill="#f4f3ee" stroke="#cdc9bd"/>`);
  // Canal central
  p.push(`<rect x="2" y="${(Y.e + Y.f) / 2 - 4}" width="${ancho - 4}" height="8" fill="#e2dfd4"/>`);
  // Líneas de colores de los rieles: roja junto al +, azul junto al −
  const linea = (y, color) => p.push(`<line x1="${MARGEN_X - 6}" y1="${y}" x2="${ancho - MARGEN_X + 6}" y2="${y}" stroke="${color}" stroke-width="1.2"/>`);
  linea(Y['s+'] - 5.5, '#d7263d');
  linea(Y['s-'] + 5.5, '#2f6fde');
  linea(Y['i-'] - 5.5, '#2f6fde');
  linea(Y['i+'] + 5.5, '#d7263d');
  const texto = (x, y, s, color = '#8a867a', tam = 5.5) =>
    p.push(`<text x="${x}" y="${y}" font-family="sans-serif" font-size="${tam}" font-weight="700" fill="${color}" text-anchor="middle">${s}</text>`);
  for (const [r, , signo] of RIELES) {
    const color = signo === '+' ? '#d7263d' : '#2f6fde';
    texto(5.2, Y[r] + 2.2, signo, color, 7);
    texto(ancho - 5.2, Y[r] + 2.2, signo, color, 7);
  }
  // Números de columna y letras de fila
  for (let c = 1; c <= columnas; c++) {
    if (c === 1 || c % 5 === 0) {
      texto(xColumna(c), Y.a - 6.2, c);
      texto(xColumna(c), Y.j + 10.4, c);
    }
  }
  for (const f of [...FILAS_ARRIBA, ...FILAS_ABAJO]) {
    texto(5.2, Y[f] + 2, f);
    texto(ancho - 5.2, Y[f] + 2, f);
  }
  // Huecos
  for (const h of huecos(tipo)) {
    p.push(`<rect x="${(h.x - 1.7).toFixed(2)}" y="${(h.y - 1.7).toFixed(2)}" width="3.4" height="3.4" rx="0.7" fill="#3d3b36"/>`);
  }
  p.push('</svg>');
  return p.join('');
}

// ¿Dónde caen las patas de una pieza? Recibe las patas en coordenadas del dibujo de la protoboard y devuelve
// el corrimiento para que la primera pata quede justo en un hueco y a qué hueco va cada pata, o null si alguna
// no cae cerca de un hueco libre. tolerancia: cuánto puede quedar corrida una pata (los dibujos de Wokwi no
// siempre tienen las patas a 0,1" exactas).
export function encajar(patas, { tipo = 'media', ocupados = new Set(), tolerancia = 3.5 } = {}) {
  if (!patas.length) return null;
  const lista = huecos(tipo);
  const cercano = (x, y) => {
    let mejor = null;
    let d = Infinity;
    for (const h of lista) {
      const dh = Math.hypot(h.x - x, h.y - y);
      if (dh < d) {
        d = dh;
        mejor = h;
      }
    }
    return { hueco: mejor, distancia: d };
  };
  const primero = cercano(patas[0].x, patas[0].y);
  if (primero.distancia > PASO) return null; // la pieza no está sobre la protoboard
  const dx = primero.hueco.x - patas[0].x;
  const dy = primero.hueco.y - patas[0].y;
  const en = {};
  const usados = new Set();
  for (const pata of patas) {
    const { hueco, distancia } = cercano(pata.x + dx, pata.y + dy);
    if (distancia > tolerancia || ocupados.has(hueco.nombre) || usados.has(hueco.nombre)) return null;
    en[pata.nombre] = hueco.nombre;
    usados.add(hueco.nombre);
  }
  return { dx, dy, en };
}
