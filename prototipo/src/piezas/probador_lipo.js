// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: probador de celdas LiPo (1-8S) con zumbador
//
// El probador del kit («1-8S Lipo Li-ion Fe Batería Voltaje 2IN1 Probador Bajo Voltaje Zumbador Alarma»): se conecta al
// cable de balance de la batería y se alimenta de ella misma (no necesita el Arduino). Tiene 9 pines: − y las celdas
// 1 a 8, una pantalla de 3 dígitos de 7 segmentos y dos zumbadores.
//
// La pantalla repite, como el real: el voltaje total, el número de celdas («2S», «3S»…) y, por cada celda, «-1-» y su
// voltaje, «-2-» y su voltaje… Si una celda baja del umbral (3,3 V de fábrica; se cambia con el botón del real y aquí
// en la ficha), pita: los zumbadores suenan y la pantalla parpadea.
// El dibujo se hizo a partir del probador del kit (foto de Efraín), sin copiar el de nadie.

export const PROBADOR = {
  pasoMs: 1000, // cuánto dura cada cosa en la pantalla (medido el 15 oct con el probador del kit)
  umbralV: 3.3, // de fábrica
  umbrales: [0, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8], // 0 = alarma apagada
};

// ---- Dibujo (visto desde arriba): los zumbadores a la izquierda, la pantalla al centro y los pines abajo.
const ANCHO = 210;
const ALTO = 140;
export const TAMANO_PROBADOR = { ancho: ANCHO, alto: ALTO };
const PASO = 9.6;
const X_PIN0 = 82;
const Y_PIN = 132;
export const PINES_PROBADOR = Object.fromEntries(
  ['NEG', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'].map((k, n) => [k, { x: X_PIN0 + n * PASO, y: Y_PIN }]),
);

const r2 = (n) => Math.round(n * 100) / 100;
const texto = (x, y, t, { tam = 7, color = '#5a6673', peso = 'bold', marca = '' } = {}) =>
  `<text${marca} x="${r2(x)}" y="${r2(y)}" font-family="Arial, Helvetica, sans-serif" font-size="${tam}" font-weight="${peso}" text-anchor="middle" fill="${color}">${t}</text>`;

// Siete segmentos (a arriba, b arriba a la derecha, c abajo a la derecha, d abajo, e abajo a la izquierda,
// f arriba a la izquierda, g al medio) y el punto decimal.
const DIGITO = { ancho: 24, alto: 46, grueso: 5 };
const X_DIGITOS = [76, 112, 148];
const Y_DIGITOS = 34;
const ENCENDIDO = '#ff3b30';
const APAGADO = '#3a1414';
function segmentos(x, y) {
  const { ancho: w, alto: h, grueso: t } = DIGITO;
  const m = h / 2;
  const caja = (sx, sy, sw, sh) => ({ x: x + sx, y: y + sy, w: sw, h: sh });
  return {
    a: caja(t / 2, 0, w - t, t),
    b: caja(w - t, t / 2, t, m - t),
    c: caja(w - t, m + t / 2, t, m - t),
    d: caja(t / 2, h - t, w - t, t),
    e: caja(0, m + t / 2, t, m - t),
    f: caja(0, t / 2, t, m - t),
    g: caja(t / 2, m - t / 2, w - t, t),
  };
}
const LETRAS = {
  0: 'abcdef', 1: 'bc', 2: 'abdeg', 3: 'abcdg', 4: 'bcfg', 5: 'acdfg', 6: 'acdefg', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg',
  '-': 'g', S: 'acdfg', L: 'def', o: 'cdeg', A: 'abcefg', C: 'adef', ' ': '',
};

export function dibujarProbador(umbral = PROBADOR.umbralV) {
  const digitos = X_DIGITOS.map((x, i) => {
    const s = segmentos(x, Y_DIGITOS);
    return Object.entries(s).map(([k, c]) => `<rect data-seg="${i}${k}" x="${r2(c.x)}" y="${r2(c.y)}" width="${r2(c.w)}" height="${r2(c.h)}" rx="2" fill="${APAGADO}"/>`).join('') +
      `<circle data-seg="${i}p" cx="${r2(x + DIGITO.ancho + 5)}" cy="${r2(Y_DIGITOS + DIGITO.alto - 2)}" r="2.8" fill="${APAGADO}"/>`;
  }).join('');
  const pines = Object.entries(PINES_PROBADOR).map(([k, p], n) =>
    `<rect x="${r2(p.x - 1.2)}" y="122" width="2.4" height="${r2(p.y - 120)}" fill="#c9ccd1"/>` +
    texto(p.x, 108, n === 0 ? '−' : String(n), { tam: n === 0 ? 8 : 6.5 })).join('');
  // Ondas del pitido (se ven solo con la alarma)
  const ondas = [0, 1].map((n) => {
    const cy = 38 + n * 44;
    return `<path d="M${r2(8)} ${r2(cy - 10)} q -6 10 0 20 M${r2(3)} ${r2(cy - 15)} q -8 15 0 30" fill="none" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/>`;
  }).join('');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}" viewBox="0 0 ${ANCHO} ${ALTO}">` +
    `<title>Probador de celdas LiPo 1-8S con zumbador</title>` +
    // el cuerpo: la placa dentro de su funda transparente
    `<rect x="12" y="6" width="${ANCHO - 18}" height="110" rx="9" fill="#dfe4e8" stroke="#9aa3ab" stroke-width="1.2"/>` +
    `<rect x="17" y="11" width="${ANCHO - 28}" height="100" rx="6" fill="#26323d" opacity="0.15"/>` +
    // los dos zumbadores
    [38, 82].map((cy) => `<circle cx="38" cy="${cy}" r="20" fill="#1d1f22" stroke="#000000" stroke-width="0.8"/><circle cx="38" cy="${cy}" r="3" fill="#3a3d42"/>`).join('') +
    `<g data-pitido="1" visibility="hidden">${ondas}</g>` +
    // la pantalla y sus tres dígitos
    `<rect x="66" y="22" width="${ANCHO - 82}" height="72" rx="4" fill="#160909" stroke="#000000" stroke-width="1"/>` +
    digitos +
    // el conector de 9 pines con sus números
    `<rect x="${r2(X_PIN0 - 6)}" y="114" width="${r2(8 * PASO + 12)}" height="9" fill="#151515"/>` +
    pines +
    texto(ANCHO / 2 + 30, 18, '1-8S', { tam: 6.5 }) +
    texto(ANCHO / 2 - 30, 18, `alarma ${umbral ? String(umbral).replace('.', ',') + ' V' : 'apagada'}`, { tam: 6.5, peso: 'normal', marca: ' data-umbral="1"' }) +
    `</svg>`
  );
}

// Un voltaje en 3 dígitos, como el real: «7.40» o «12.6».
function voltaje3(v) {
  const t = v >= 9.995 ? v.toFixed(1) : v.toFixed(2);
  const [ent, dec] = t.split('.');
  const cifras = (ent + dec).slice(0, 3).split('');
  return cifras.map((c, i) => ({ c, punto: i === ent.length - 1 }));
}
const palabra3 = (t) => t.padEnd(3).slice(0, 3).split('').map((c) => ({ c, punto: false }));

// Lo que muestra la pantalla en el instante `ms`, como el del kit (15 oct): al conectarse, una vez, cuántas celdas
// encontró («2CS»); después repite «ALL» → total → «2S» → «-1-» → celda 1 → «-2-» → celda 2 → …
// estado: { encendido, celdas: [voltios…], total }. Devuelve 3 dígitos { c, punto } o null (apagada).
export function pantallaProbador(estado, ms) {
  if (!estado || !estado.encendido || !estado.celdas.length) return null;
  const n = estado.celdas.length;
  if (ms < PROBADOR.pasoMs) return palabra3(`${n}CS`);
  const pasos = [palabra3('ALL'), voltaje3(estado.total), palabra3(`${n}S`.padStart(3))];
  estado.celdas.forEach((v, i) => pasos.push(palabra3(`-${i + 1}-`), voltaje3(v)));
  return pasos[Math.floor((ms - PROBADOR.pasoMs) / PROBADOR.pasoMs) % pasos.length];
}

// Al simular: la pantalla, el pitido y, con la alarma, la pantalla parpadea (4 veces por segundo).
export function mostrarProbador(el, props, estado) {
  const umbral = el.querySelector('[data-umbral]');
  const u = props && typeof props.umbral === 'number' ? props.umbral : PROBADOR.umbralV;
  if (umbral) {
    const t = `alarma ${u ? String(u).replace('.', ',') + ' V' : 'apagada'}`;
    if (umbral.textContent !== t) umbral.textContent = t;
  }
  const ms = estado ? estado.ms || 0 : 0;
  const parpadeo = estado && estado.alarma && Math.floor(ms / 125) % 2 === 1;
  const p = parpadeo ? null : pantallaProbador(estado, ms);
  for (let i = 0; i < 3; i++) {
    const d = p ? p[i] : null;
    const encendidos = d ? LETRAS[d.c] || '' : '';
    for (const k of 'abcdefg') {
      const seg = el.querySelector(`[data-seg="${i}${k}"]`);
      const color = encendidos.includes(k) ? ENCENDIDO : APAGADO;
      if (seg && seg.getAttribute('fill') !== color) seg.setAttribute('fill', color);
    }
    const punto = el.querySelector(`[data-seg="${i}p"]`);
    const color = d && d.punto ? ENCENDIDO : APAGADO;
    if (punto && punto.getAttribute('fill') !== color) punto.setAttribute('fill', color);
  }
  const pitido = el.querySelector('[data-pitido]');
  const visible = estado && estado.alarma && Math.floor(ms / 250) % 2 === 0 ? 'visible' : 'hidden';
  if (pitido && pitido.getAttribute('visibility') !== visible) pitido.setAttribute('visibility', visible);
}
