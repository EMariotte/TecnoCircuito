// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: microservo (SG90 y MG90S)
//
// Una sola pieza, con dos modelos que cambian el dibujo y los datos (consumo y velocidad).
// No toca la página: el dibujo es un texto SVG (lo usa el lienzo) y la lógica son funciones puras (las usa el núcleo).
//
// Cómo funciona un microservo: cada 20 ms recibe un pulso por el cable naranja. El ancho del pulso dice a qué
// ángulo ir: con la librería Servo de Arduino, 544 µs es 0° y 2400 µs es 180°. Un motor con engranajes gira el
// brazo hasta ese ángulo a una velocidad fija y lo sostiene. Mientras gira pide mucha más corriente que quieto,
// y justo al arrancar pide casi la corriente de bloqueo: varios servos que arrancan a la vez pueden pedirle al
// puerto USB más de lo que da (tarea T3).

// ---- Datos de cada modelo
// Valores típicos de las hojas de datos a 4,8 V. Cambian entre fabricantes y clones (el SG90 bloqueado va de unos
// 360 a 750 mA según la fuente): son el punto de partida y se ajustan con el multímetro en los servos del kit.
export const MODELOS_SERVO = {
  sg90: {
    nombre: 'SG90',
    engranajes: 'plástico',
    torque_kgcm: 1.8, // torque de bloqueo a 4,8 V
    seg60: 0.1, // segundos para girar 60° a 4,8 V, sin carga
    mA: { reposo: 10, movimiento: 200, arranque: 650 },
    cuerpo: '#2f6fd6', // azul translúcido
    borde: '#1d4f9f',
    eje: '#f4f4f4',
  },
  mg90s: {
    nombre: 'MG90S',
    engranajes: 'metal',
    torque_kgcm: 1.8, // a 4,8 V (2,2 kg·cm a 6 V)
    seg60: 0.1,
    mA: { reposo: 10, movimiento: 250, arranque: 700 },
    cuerpo: '#2b2b2b', // negro
    borde: '#111111',
    eje: '#c9ccd1', // engranaje de metal
  },
};
export const SERVO = {
  pulsoMin: 544, // µs para 0° (librería Servo de Arduino)
  pulsoMax: 2400, // µs para 180°
  pulsoValidoMin: 400, // un pulso fuera de este rango no es una orden (ruido o un pin que no es de servo)
  pulsoValidoMax: 2700,
  bandaMuerta: 5, // µs: un cambio menor no mueve el servo
  arranqueMs: 30, // al empezar a girar, el motor pide casi la corriente de bloqueo durante unos milisegundos
  voltiosRef: 4.8, // voltaje de los datos de la hoja
};

// ---- Lógica (la usa el núcleo, en el Worker)

export const anguloDePulso = (us) =>
  Math.max(0, Math.min(180, ((us - SERVO.pulsoMin) / (SERVO.pulsoMax - SERVO.pulsoMin)) * 180));

// Un servo que recibe pulsos y gira. Empieza a 90°, como queda al conectarlo.
export function crearServo(modelo) {
  const d = MODELOS_SERVO[modelo] || MODELOS_SERVO.sg90;
  let angulo = 90;
  let objetivo = 90;
  let pulso = null; // µs del último pulso válido
  let arranqueRestante = 0; // ms de corriente de arranque que quedan
  let moviendo = false;
  return {
    // Llegó un pulso de `us` microsegundos: fija el ángulo al que debe ir.
    pulso(us) {
      if (us < SERVO.pulsoValidoMin || us > SERVO.pulsoValidoMax) return;
      if (pulso !== null && Math.abs(us - pulso) < SERVO.bandaMuerta) return;
      pulso = us;
      objetivo = anguloDePulso(us);
    },
    // Avanza `ms` milisegundos con el servo alimentado a `voltios` (0 = sin alimentación: no gira ni consume).
    avanzar(ms, voltios) {
      if (!(voltios > 0)) {
        moviendo = false;
        arranqueRestante = 0;
        return;
      }
      const velocidad = (60 / (d.seg60 * 1000)) * (voltios / SERVO.voltiosRef); // grados por ms
      const falta = objetivo - angulo;
      const ahoraMueve = Math.abs(falta) > 0.01;
      if (ahoraMueve && !moviendo) arranqueRestante = SERVO.arranqueMs;
      moviendo = ahoraMueve;
      if (moviendo) angulo += Math.sign(falta) * Math.min(Math.abs(falta), velocidad * ms);
      arranqueRestante = Math.max(0, arranqueRestante - ms);
    },
    // Corriente que pide ahora, en amperios, a `voltios` (escala con el voltaje, como una carga resistiva).
    corriente(voltios) {
      if (!(voltios > 0)) return 0;
      const mA = arranqueRestante > 0 ? d.mA.arranque : moviendo ? d.mA.movimiento : d.mA.reposo;
      return (mA / 1000) * (voltios / SERVO.voltiosRef);
    },
    estado: () => ({ angulo, objetivo, pulso, moviendo, arrancando: arranqueRestante > 0 }),
  };
}

// ---- Dibujo (lo usa el lienzo). Vista desde arriba, a escala: 1 mm = 9,6 / 2,54 px.
// Se hizo a partir de las medidas del SG90 (cuerpo de 22,2 × 11,8 mm, aletas de 32,2 mm, eje a 5,9 mm de una
// punta), sin copiar el dibujo de nadie. El conector tiene los pines a 0,1": encaja en la protoboard.

const MM = 9.6 / 2.54;
const Y0 = 57.6; // altura del eje del cuerpo y del pin del medio (6 pasos de 0,1")
const OX = 14.4; // margen a la izquierda: a 180° el brazo sale del cuerpo
const ALETAS = { x: OX, ancho: 32.2 * MM };
const CUERPO = { x: OX + ((32.2 - 22.2) / 2) * MM, ancho: 22.2 * MM, alto: 11.8 * MM };
export const EJE_SERVO = { x: CUERPO.x + 5.9 * MM, y: Y0 };
const LARGO_BRAZO = 13.5 * MM;
const CONECTOR_X = 182.4; // 19 pasos de 0,1"
export const TAMANO_SERVO = { ancho: 201.6, alto: 86.4 };
// Orden del conector real, de arriba abajo: marrón (GND), rojo (VCC), naranja (señal).
export const PINES_SERVO = {
  GND: { x: CONECTOR_X, y: Y0 - 9.6, color: '#7a4a24' },
  VCC: { x: CONECTOR_X, y: Y0, color: '#d7263d' },
  SIG: { x: CONECTOR_X, y: Y0 + 9.6, color: '#f28c28' },
};

const r2 = (n) => Math.round(n * 100) / 100;

// El brazo se dibuja apuntando a la derecha (0°) y se gira: 90° apunta hacia arriba, 180° hacia la izquierda.
export const giroBrazo = (angulo) => `rotate(${r2(-angulo)} ${r2(EJE_SERVO.x)} ${r2(EJE_SERVO.y)})`;

// SVG completo (solo atributos: se ve igual en el lienzo, en la imagen exportada, en Word y en Inkscape).
export function dibujarServo(modelo = 'sg90', angulo = 90) {
  const d = MODELOS_SERVO[modelo] || MODELOS_SERVO.sg90;
  const { ancho, alto } = TAMANO_SERVO;
  const yC = Y0 - CUERPO.alto / 2;
  const ex = r2(EJE_SERVO.x);
  const finCuerpo = CUERPO.x + CUERPO.ancho;
  const translucido = modelo === 'sg90';
  const cables = Object.values(PINES_SERVO)
    .map((p, i) => {
      const yIni = Y0 - 4 + i * 4; // salen juntos del cuerpo y se abren hasta el conector
      return `<path d="M${r2(finCuerpo)} ${r2(yIni)} C ${r2(finCuerpo + 26)} ${r2(yIni)}, ${r2(CONECTOR_X - 34)} ${r2(p.y)}, ${r2(CONECTOR_X - 9)} ${r2(p.y)}" fill="none" stroke="${p.color}" stroke-width="2.6" stroke-linecap="round"/>`;
    })
    .join('');
  const huecosConector = Object.values(PINES_SERVO)
    .map((p) => `<rect x="${r2(p.x - 2.2)}" y="${r2(p.y - 2.2)}" width="4.4" height="4.4" fill="#8a8a8a"/>`)
    .join('');
  // Engranajes que se ven a través del plástico azul del SG90
  const engranajes = translucido
    ? `<circle cx="${r2(CUERPO.x + 15 * MM)}" cy="${Y0}" r="${r2(3.6 * MM)}" fill="#ffffff" fill-opacity="0.18"/>` +
      `<circle cx="${r2(CUERPO.x + 9.5 * MM)}" cy="${r2(Y0 + 2.2 * MM)}" r="${r2(2.2 * MM)}" fill="#ffffff" fill-opacity="0.14"/>`
    : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}" viewBox="0 0 ${ancho} ${alto}">` +
    `<title>Servo ${d.nombre}</title>` +
    cables +
    // conector hembra de 3 pines
    `<rect x="${r2(CONECTOR_X - 9)}" y="${r2(Y0 - 15.6)}" width="16" height="31.2" rx="1.5" fill="#222222"/>` +
    huecosConector +
    // aletas de montaje con sus agujeros
    `<rect x="${r2(ALETAS.x)}" y="${r2(yC + 1.5)}" width="${r2(ALETAS.ancho)}" height="${r2(CUERPO.alto - 3)}" rx="3" fill="${d.cuerpo}" fill-opacity="${translucido ? 0.75 : 1}" stroke="${d.borde}" stroke-width="1"/>` +
    `<circle cx="${r2(OX + 2.4 * MM)}" cy="${Y0}" r="${r2(1 * MM)}" fill="#ffffff" stroke="${d.borde}" stroke-width="0.8"/>` +
    `<circle cx="${r2(OX + (32.2 - 2.4) * MM)}" cy="${Y0}" r="${r2(1 * MM)}" fill="#ffffff" stroke="${d.borde}" stroke-width="0.8"/>` +
    // cuerpo
    `<rect x="${r2(CUERPO.x)}" y="${r2(yC)}" width="${r2(CUERPO.ancho)}" height="${r2(CUERPO.alto)}" rx="2.5" fill="${d.cuerpo}" fill-opacity="${translucido ? 0.85 : 1}" stroke="${d.borde}" stroke-width="1.2"/>` +
    engranajes +
    `<text x="${r2(CUERPO.x + 15.5 * MM)}" y="${r2(Y0 + 4.1 * MM)}" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#ffffff">${d.nombre}</text>` +
    // torre del eje
    `<circle cx="${ex}" cy="${Y0}" r="${r2(5.2 * MM)}" fill="${d.cuerpo}" stroke="${d.borde}" stroke-width="1.2"/>` +
    // brazo (se gira con transform; el núcleo dice el ángulo)
    `<g data-brazo="1" transform="${giroBrazo(angulo)}">` +
    `<path d="M${ex} ${r2(Y0 - 3.2 * MM / 2 - 1)} L${r2(EJE_SERVO.x + LARGO_BRAZO)} ${r2(Y0 - 1.1 * MM)} A ${r2(1.1 * MM)} ${r2(1.1 * MM)} 0 0 1 ${r2(EJE_SERVO.x + LARGO_BRAZO)} ${r2(Y0 + 1.1 * MM)} L${ex} ${r2(Y0 + 3.2 * MM / 2 + 1)} Z" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/>` +
    `<circle cx="${ex}" cy="${Y0}" r="${r2(3.4 * MM)}" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/>` +
    [0.45, 0.65, 0.85].map((f) => `<circle cx="${r2(EJE_SERVO.x + LARGO_BRAZO * f)}" cy="${Y0}" r="1.4" fill="#b8bcc2"/>`).join('') +
    `<circle cx="${ex}" cy="${Y0}" r="${r2(1.3 * MM)}" fill="${d.eje}" stroke="#7d8288" stroke-width="0.8"/>` +
    `</g>` +
    `</svg>`
  );
}
