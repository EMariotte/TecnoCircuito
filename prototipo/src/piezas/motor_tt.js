// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: motorreductor TT amarillo de 6 V (1:48)
//
// Una sola pieza con dos vistas, como el servo con sus dos modelos:
//   «eje»:   el motor de lado, con su eje de doble plano girando y las RPM encima;
//   «rueda»: el mismo motor con la rueda de 66 mm girando y, debajo, hacia dónde avanzaría el robot y a qué velocidad.
// «lado» (izquierdo o derecho) refleja el dibujo, como se montan los dos motores de un carro: con el mismo giro, una
// rueda empuja hacia adelante y la otra hacia atrás. Es el error más común con un carro, y aquí se ve sin moverlo.
//
// Modelo (motor de corriente continua con reducción): V = I·R + k·ω  y  J·dω/dt = k·I − b·ω (rueda en el aire).
// Valores típicos de un motorreductor TT 1:48 a 6 V (hojas de datos de varios fabricantes; por medir en el kit):
// sin carga ~200 RPM en el eje de salida y ~150 mA; bloqueado ~1,2 A. Medidas del dibujo: las del motor del kit.

const MM = 9.6 / 2.54;

// ---- Modelo eléctrico y mecánico
export const MOTOR_TT = {
  reduccion: 48,
  voltiosRef: 6,
  rpmSinCarga: 200, // en el eje de salida, a 6 V
  mASinCarga: 150,
  mABloqueado: 1200,
  tauMecanicoMs: 40, // cuánto tarda en llegar al 63 % de su velocidad
  ruedaMM: 66,
};
const R = MOTOR_TT.voltiosRef / (MOTOR_TT.mABloqueado / 1000); // Ω del bobinado (de la corriente de bloqueo)
const W0 = ((MOTOR_TT.rpmSinCarga * MOTOR_TT.reduccion) * 2 * Math.PI) / 60; // rad/s del motor sin carga
const I0 = MOTOR_TT.mASinCarga / 1000;
const K = (MOTOR_TT.voltiosRef - I0 * R) / W0; // V·s/rad (y N·m/A)
const B = (K * I0) / W0; // rozamiento viscoso
const J = ((MOTOR_TT.tauMecanicoMs / 1000) * K * K) / R; // inercia equivalente

// Un motor. avanzar(ms, voltios, frena): voltios entre A y B (positivo: A más alto); `frena`: los dos bornes unidos
// (el puente H en BRAKE o RELEASE con la habilitación encendida). Sin voltaje ni freno, gira libre y se detiene solo.
export function crearMotor() {
  let w = 0; // rad/s del motor (antes de la reducción)
  let i = 0;
  let giro = 0; // grados que lleva girado el eje de salida (para el dibujo)
  return {
    avanzar(ms, voltios, { conectado = true, frena = false } = {}) {
      const dt = ms / 1000;
      if (conectado) i = (voltios - K * w) / R;
      else i = frena ? -(K * w) / R : 0;
      const par = K * i - B * w;
      w += (par / J) * dt;
      giro = (giro + ((w / MOTOR_TT.reduccion) * dt * 180) / Math.PI) % 360;
    },
    estado() {
      const rpm = (w * 60) / (2 * Math.PI) / MOTOR_TT.reduccion;
      return { rpm, i, giro, velocidad: (rpm / 60) * Math.PI * (MOTOR_TT.ruedaMM / 10) }; // velocidad en cm/s
    },
  };
}

// ---- Dibujo. El motor de lado (cara de la caja de engranajes), a escala: 64,2 × 22,5 mm, eje a 11,2 mm del extremo.
const LARGO = 64.2 * MM;
const ALTO = 22.5 * MM;
const CAJA = 40 * MM; // la caja amarilla; el resto es la carcasa del motor
const EJE_X = 11.2 * MM;
const RUEDA = (MOTOR_TT.ruedaMM * MM) / 2;
// Marco de cada vista: dónde queda el motor y el eje, y el tamaño del dibujo.
const VISTAS = {
  eje: { ancho: 300, alto: 128, x0: 20, y0: 36 },
  rueda: { ancho: 380, alto: 310, x0: 135 - EJE_X, y0: 132 - ALTO / 2 },
};
export const vistaMotor = (props) => VISTAS[props && props.vista === 'rueda' ? 'rueda' : 'eje'];
// Los dos cables del motor terminan en dos pines a 0,1" (A rojo y B negro): a la derecha del dibujo, o a la izquierda
// si el motor es del lado derecho (todo el dibujo va reflejado).
const pinesSinReflejo = (v) => {
  const y = v.y0 + ALTO / 2;
  return { A: { x: v.ancho - 12, y: y - 4.8, color: '#d7263d' }, B: { x: v.ancho - 12, y: y + 4.8, color: '#2b2b2b' } };
};
export function pinesMotor(props) {
  const v = vistaMotor(props);
  const p = pinesSinReflejo(v);
  if (props && props.lado === 'derecho') for (const k of ['A', 'B']) p[k] = { ...p[k], x: v.ancho - p[k].x };
  return p;
}

const r2 = (n) => Math.round(n * 100) / 100;
const texto = (x, y, t, { tam = 11, color = '#1f2328', peso = 'bold', marca = '' } = {}) =>
  `<text${marca ? ` ${marca}="1"` : ''} x="${r2(x)}" y="${r2(y)}" font-family="Arial, Helvetica, sans-serif" font-size="${tam}" font-weight="${peso}" text-anchor="middle" fill="${color}">${t}</text>`;

function cuerpo(x0, y0) {
  const yc = y0 + ALTO / 2;
  return (
    // carcasa del motor (metálica) con su tapa negra
    `<rect x="${r2(x0 + CAJA - 2)}" y="${r2(yc - 9.5 * MM)}" width="${r2(LARGO - CAJA + 2)}" height="${r2(19 * MM)}" rx="6" fill="#b9bec5" stroke="#7d8288" stroke-width="1"/>` +
    `<rect x="${r2(x0 + LARGO - 6 * MM)}" y="${r2(yc - 8 * MM)}" width="${r2(6 * MM)}" height="${r2(16 * MM)}" rx="4" fill="#2b2b2b"/>` +
    // caja de engranajes amarilla con sus agujeros de montaje
    `<rect x="${r2(x0)}" y="${r2(y0)}" width="${r2(CAJA)}" height="${r2(ALTO)}" rx="4" fill="#f2c318" stroke="#b58f00" stroke-width="1.2"/>` +
    `<circle cx="${r2(x0 + 31.8 * MM - 8.75 * MM)}" cy="${r2(yc)}" r="${r2(1.5 * MM)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/>` +
    `<circle cx="${r2(x0 + 31.8 * MM + 8.75 * MM - 6)}" cy="${r2(yc)}" r="${r2(1.5 * MM)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/>`
  );
}

// Cables desde la tapa del motor hasta los dos pines.
function cables(v) {
  const p = pinesSinReflejo(v);
  const xi = v.x0 + LARGO;
  const yc = v.y0 + ALTO / 2;
  return ['A', 'B'].map((k, n) => {
    const yi = yc + (n ? 3 : -3);
    return `<path d="M${r2(xi)} ${r2(yi)} C ${r2(xi + 20)} ${r2(yi)}, ${r2(p[k].x - 22)} ${r2(p[k].y)}, ${r2(p[k].x - 6)} ${r2(p[k].y)}" fill="none" stroke="${p[k].color}" stroke-width="2.6" stroke-linecap="round"/>` +
      `<rect x="${r2(p[k].x - 4.2)}" y="${r2(p[k].y - 3)}" width="8.4" height="6" rx="1" fill="#222222"/>`;
  }).join('');
}

// El eje de doble plano visto de frente (gira con data-eje).
function eje(cx, cy) {
  const r = 2.7 * MM;
  return `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(r + 3)}" fill="#e2b210" stroke="#b58f00" stroke-width="0.8"/>` +
    `<g data-eje="1" transform="rotate(0 ${r2(cx)} ${r2(cy)})"><path d="M${r2(cx - r)} ${r2(cy - 1.8 * MM)} H${r2(cx + r)} V${r2(cy + 1.8 * MM)} H${r2(cx - r)} Z" fill="#fafafa" stroke="#9aa0a6" stroke-width="0.8"/>` +
    `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(r)}" fill="none" stroke="#9aa0a6" stroke-width="0.8"/></g>`;
}

// La rueda de 66 mm con 5 rayos (gira con data-rueda).
function rueda(cx, cy) {
  const rayos = [0, 72, 144, 216, 288].map((a) =>
    `<rect x="${r2(cx - 12)}" y="${r2(cy - RUEDA * 0.72)}" width="24" height="${r2(RUEDA * 0.72)}" rx="6" fill="#f2c318" transform="rotate(${a} ${r2(cx)} ${r2(cy)})"/>`).join('');
  const tacos = Array.from({ length: 24 }, (_, n) =>
    `<rect x="${r2(cx - 3)}" y="${r2(cy - RUEDA - 1)}" width="6" height="8" fill="#3a3a3a" transform="rotate(${n * 15} ${r2(cx)} ${r2(cy)})"/>`).join('');
  // Llanta (anillo negro) y aro amarillo: entre los rayos queda el hueco y se ve el motor detrás, como en la real.
  return `<g data-rueda="1" transform="rotate(0 ${r2(cx)} ${r2(cy)})">` +
    `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(RUEDA * 0.88)}" fill="none" stroke="#1c1c1c" stroke-width="${r2(RUEDA * 0.24)}"/>` + tacos +
    `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(RUEDA * 0.74)}" fill="none" stroke="#f2c318" stroke-width="6"/>` + rayos +
    `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(7 * MM)}" fill="#f2c318" stroke="#b58f00" stroke-width="1"/>` +
    `<rect x="${r2(cx - 2.7 * MM)}" y="${r2(cy - 1.8 * MM)}" width="${r2(5.4 * MM)}" height="${r2(3.6 * MM)}" fill="#7a5d00"/></g>`;
}

// SVG completo. Las partes que cambian al simular: data-eje / data-rueda (giro), data-rpm, data-flecha y data-velocidad.
export function dibujarMotor(props = {}) {
  const v = vistaMotor(props);
  const derecho = props.lado === 'derecho';
  const cx = v.x0 + EJE_X;
  const cy = v.y0 + ALTO / 2;
  // El lado derecho se dibuja reflejado de punta a punta (con sus cables); los textos y la flecha no se reflejan.
  const reflejo = derecho ? ` transform="translate(${v.ancho} 0) scale(-1 1)"` : '';
  const xTexto = derecho ? v.ancho - cx : cx;
  let dentro = cuerpo(v.x0, v.y0) + cables(v);
  // el rótulo de la caja, sin reflejar
  const xRotulo = derecho ? v.ancho - (v.x0 + 26 * MM) : v.x0 + 26 * MM;
  let fuera = texto(xRotulo, v.y0 + 15, 'TT 1:48', { tam: 10, color: '#7a5d00' });
  if (props.vista === 'rueda') {
    dentro += rueda(cx, cy);
    fuera +=
      `<line x1="${r2(xTexto - RUEDA - 10)}" y1="${r2(cy + RUEDA + 2)}" x2="${r2(xTexto + RUEDA + 10)}" y2="${r2(cy + RUEDA + 2)}" stroke="#9aa0a6" stroke-width="2" stroke-dasharray="6 4"/>` +
      `<g data-flecha="1" transform="translate(${r2(xTexto)} ${r2(cy + RUEDA + 20)})"></g>` +
      texto(xTexto, cy + RUEDA + 46, 'quieto', { tam: 13, marca: 'data-velocidad' });
  } else {
    dentro += eje(cx, cy);
    fuera += texto(xTexto, v.y0 - 12, '0 RPM', { tam: 13, marca: 'data-rpm' });
  }
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${v.ancho}" height="${v.alto}" viewBox="0 0 ${v.ancho} ${v.alto}">` +
    `<title>Motor TT 6 V (${props.vista === 'rueda' ? 'con rueda' : 'eje'}, lado ${derecho ? 'derecho' : 'izquierdo'})</title>` +
    `<g${reflejo}>${dentro}</g>${fuera}</svg>`
  );
}

// Lo que se ve al simular: el giro, las RPM o la flecha con la velocidad. El lado derecho está montado al revés:
// el mismo giro lo lleva hacia atrás. La flecha apunta hacia donde la rueda, apoyada en el piso, empujaría el cuerpo
// del robot: una rueda que en el dibujo gira contra el reloj avanza hacia la izquierda.
// Solo se toca lo que cambió: el dibujo se actualiza unas 60 veces por segundo.
const ultimo = new WeakMap();
export function mostrarMotor(el, props, estado) {
  const v = vistaMotor(props);
  const cx = v.x0 + EJE_X;
  const cy = v.y0 + ALTO / 2;
  const e = estado || { rpm: 0, giro: 0, velocidad: 0 };
  const giro = el.querySelector('[data-eje],[data-rueda]');
  if (giro) giro.setAttribute('transform', `rotate(${r2(-e.giro)} ${r2(cx)} ${r2(cy)})`);
  const rpm = el.querySelector('[data-rpm]');
  const antes = ultimo.get(el) || {};
  // En el dibujo, el giro es contra el reloj con RPM positivas; reflejado (lado derecho), a favor del reloj.
  const contraReloj = (e.rpm > 0) !== (props.lado === 'derecho');
  if (rpm) {
    const t = Math.abs(e.rpm) < 1 ? '0 RPM' : `${Math.round(Math.abs(e.rpm))} RPM ${contraReloj ? '⟲' : '⟳'}`;
    if (t !== antes.rpm) rpm.textContent = antes.rpm = t;
  }
  const vel = el.querySelector('[data-velocidad]');
  const flecha = el.querySelector('[data-flecha]');
  if (vel && flecha) {
    const sentido = Math.sign(e.velocidad) * (props.lado === 'derecho' ? -1 : 1); // +1 adelante, −1 atrás
    const cms = Math.abs(e.velocidad);
    const quieto = cms < 0.5;
    const t = quieto ? 'quieto' : `${sentido > 0 ? 'adelante' : 'atrás'} · ${Math.round(cms)} cm/s`;
    if (t !== antes.vel) vel.textContent = antes.vel = t;
    const d = quieto ? 0 : contraReloj ? -1 : 1; // hacia donde rueda: contra el reloj → izquierda
    const clave = `${d}|${sentido}`;
    if (clave !== antes.flecha) {
      antes.flecha = clave;
      flecha.innerHTML = quieto ? '' : `<path d="M${-40 * d} -5 H${22 * d} V-12 L${40 * d} 0 L${22 * d} 12 V5 H${-40 * d} Z" fill="${sentido > 0 ? '#2e9e44' : '#d7263d'}"/>`;
    }
  }
  ultimo.set(el, antes);
}
