// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Pieza Tecno: microservo (SG90 y MG90S)
//
// Una sola pieza, con dos modelos que cambian el dibujo y los datos (consumo y velocidad).
// No toca la página: el dibujo es un texto SVG (lo usa el lienzo) y la lógica son funciones puras (las usa el núcleo).
//
// Cómo funciona un microservo: cada 20 ms recibe un pulso por el cable naranja. El ancho del pulso dice a qué
// ángulo ir: con la librería Servo de Arduino, 544 µs es 0° y 2400 µs es 180°. Un motor con engranajes gira el
// brazo hasta ese ángulo a una velocidad fija y lo sostiene. Mientras gira pide mucha más corriente que quieto:
// varios servos que giran a la vez pueden pedirle al puerto USB más de lo que da (tarea T3).
//
// Sin golpe de arranque (SERVO-001, LAB-001): hasta el 1 nov, al empezar a girar el servo pedía la corriente de
// bloqueo durante 30 ms, y el Uno se reiniciaba desde 5 SG90. En la placa real, el Uno con 6 SG90 y 4 MG90S no se
// reinicia (5V más bajo 3,05 V, 28 oct) ni el Nano con 6 SG90 (3,91 V, 29 oct). Sin el golpe, con la corriente de
// movimiento (que baja con el voltaje, como una resistencia) y la recta del USB, el modelo da 4,70 / 3,94 / 3,55 /
// 2,85 V con 1 / 4 / 6 SG90 / 6 SG90 + 4 MG90S; medido: 4,77 / 3,87 / 3,67 / 3,05 V
// (validacion/2026-10-28-lab001.md). Lo que sí queda: después de cada orden, el control sigue empujando el motor
// unos 30 ms para llegar y frenar, aunque el paso sea pequeño («asentar»). Por eso un barrido de un grado cada 15 ms
// pide ~100 mA (medido el 9 oct), y un salto grande, la corriente de movimiento, que ya es mayor.

// ---- Datos de cada modelo
// Valores típicos de las hojas de datos a 4,8 V. Cambian entre fabricantes y clones (el SG90 bloqueado va de unos
// 360 a 750 mA según la fuente): son el punto de partida y se ajustan con el multímetro en los servos del kit.
export const MODELOS_SERVO = {
  sg90: {
    nombre: 'SG90',
    engranajes: 'plástico',
    torque_kgcm: 1.8, // torque de bloqueo a 4,8 V
    seg60: 0.1, // segundos para girar 60° a 4,8 V, sin carga
    // Medido con el UT33B+ en un SG90 del kit (9 oct 2026, validacion/2026-10-09-servo-corriente.md): quieto, menos de
    // 10 mA (la escala de 10 A mide de a 10 mA; 6 mA es el típico de la hoja); en barrido continuo, ~100 mA;
    // bloqueado, 590 mA (dato de la pieza: el modelo no frena el brazo). «movimiento» es a fondo (un salto grande);
    // «asentar», lo mínimo que pide en los 30 ms que siguen a cada orden (ajustado con el barrido continuo).
    mA: { reposo: 6, movimiento: 200, asentar: 100, bloqueado: 590 },
    // Ángulo real según el pulso, medido con transportador en un SG90 del kit (9 oct 2026,
    // validacion/2026-10-09-servo-angulos.md): write(90) = 1472 µs llega a 90°; write(0) = 544 µs se queda en 7°
    // y write(180) = 2400 µs llega a 175°. Por eso, µs por grado a cada lado del centro.
    angulos: { centroUs: 1472, usPorGradoBajo: 928 / 83, usPorGradoAlto: 928 / 85 },
    cuerpo: '#2f6fd6', // azul translúcido
    borde: '#1d4f9f',
    eje: '#f4f4f4',
  },
  mg90s: {
    nombre: 'MG90S',
    engranajes: 'metal',
    torque_kgcm: 1.8, // a 4,8 V (2,2 kg·cm a 6 V)
    seg60: 0.1,
    mA: { reposo: 10, movimiento: 250, asentar: 125, bloqueado: 700 }, // asentar: como el SG90, por medir
    angulos: { centroUs: 1472, usPorGradoBajo: 928 / 83, usPorGradoAlto: 928 / 85 }, // como el SG90: por medir
    cuerpo: '#2b2b2b', // negro
    borde: '#111111',
    eje: '#c9ccd1', // engranaje de metal
  },
};
export const SERVO = {
  pulsoMin: 544, // µs que manda write(0) (librería Servo de Arduino)
  pulsoMax: 2400, // µs que manda write(180)
  pulsoValidoMin: 400, // un pulso fuera de este rango no es una orden (ruido o un pin que no es de servo)
  pulsoValidoMax: 2700,
  bandaMuerta: 5, // µs: un cambio menor no mueve el servo
  asentarMs: 30, // después de cada orden, el control empuja el motor por lo menos con la corriente «asentar»
  // El control del servo empuja el motor en proporción a lo que falta: con más de esta banda empuja a fondo
  // (corriente de movimiento completa); con un paso pequeño, poco. Ajustado para que el barrido
  // continuo (servo_continuo.ino) dé los ~100 mA medidos en un SG90 del kit (9 oct 2026).
  bandaGrados: 8,
  voltiosRef: 4.8, // voltaje de los datos de la hoja
};

// ---- Lógica (la usa el núcleo, en el Worker)

// Desviación propia de cada servo (SERVO-002, idea de Efraín en LAB-001): cada servo real llega a ángulos un poco
// distintos (cuatro MG90S: 0 a −1° en 0°, 180 a 184° en 180°). Cada servo del lienzo recibe, al agregarlo o la
// primera vez que se abre un proyecto que no la tiene, una desviación al azar de −5° a +5° en cada límite, con un
// decimal; se guarda en el proyecto (`props.desviacion`), así no cambia de una simulación a otra.
export const DESVIACION_MAX = 5;
export const desviacionValida = (d) =>
  !!d && typeof d === 'object' && [d.inferior, d.superior].every((x) => typeof x === 'number' && Number.isFinite(x) && Math.abs(x) <= DESVIACION_MAX);
export function desviacionNueva(azar = Math.random) {
  const grados = () => Math.round((azar() * 2 - 1) * DESVIACION_MAX * 10) / 10 || 0; // sin −0
  return { inferior: grados(), superior: grados() };
}

// Ángulo al que va el brazo con un pulso de `us` microsegundos, según lo medido en cada modelo. La desviación propia
// corre el ángulo en proporción a la distancia al centro: nada en 90° (está calibrado) y toda en cada límite. El tope
// mecánico está en 0° y 180°.
export function anguloDePulso(us, modelo = 'sg90', desviacion = null) {
  const a = (MODELOS_SERVO[modelo] || MODELOS_SERVO.sg90).angulos;
  let grados = us <= a.centroUs ? 90 - (a.centroUs - us) / a.usPorGradoBajo : 90 + (us - a.centroUs) / a.usPorGradoAlto;
  if (desviacionValida(desviacion)) {
    grados += grados < 90 ? (desviacion.inferior * (90 - grados)) / 90 : (desviacion.superior * (grados - 90)) / 90;
  }
  return Math.max(0, Math.min(180, grados));
}

// Un servo que recibe pulsos y gira. Empieza a 90°, como queda al conectarlo.
export function crearServo(modelo, desviacion = null) {
  const d = MODELOS_SERVO[modelo] || MODELOS_SERVO.sg90;
  let angulo = 90;
  let objetivo = 90;
  let pulso = null; // µs del último pulso válido
  let asentarRestante = 0; // ms que le quedan a la corriente de asentar
  let moviendo = false;
  let empuje = 0; // 0 a 1: cuánto empuja el control al motor (proporcional a lo que falta)
  return {
    // Llegó un pulso de `us` microsegundos: fija el ángulo al que debe ir.
    pulso(us) {
      if (us < SERVO.pulsoValidoMin || us > SERVO.pulsoValidoMax) return;
      if (pulso !== null && Math.abs(us - pulso) < SERVO.bandaMuerta) return;
      pulso = us;
      objetivo = anguloDePulso(us, modelo, desviacion);
    },
    // Avanza `ms` milisegundos con el servo alimentado a `voltios` (0 = sin alimentación: no gira ni consume).
    avanzar(ms, voltios) {
      if (!(voltios > 0)) {
        moviendo = false;
        asentarRestante = 0;
        return;
      }
      const velocidad = (60 / (d.seg60 * 1000)) * (voltios / SERVO.voltiosRef); // grados por ms
      const falta = objetivo - angulo;
      const ahoraMueve = Math.abs(falta) > 0.01;
      empuje = Math.min(1, Math.abs(falta) / SERVO.bandaGrados);
      if (ahoraMueve && !moviendo) asentarRestante = SERVO.asentarMs;
      moviendo = ahoraMueve;
      if (moviendo) angulo += Math.sign(falta) * Math.min(Math.abs(falta), velocidad * ms);
      asentarRestante = Math.max(0, asentarRestante - ms);
    },
    // Corriente que pide ahora, en amperios, a `voltios` (escala con el voltaje, como una carga resistiva).
    corriente(voltios) {
      if (!(voltios > 0)) return 0;
      const { reposo, movimiento, asentar } = d.mA;
      const base = moviendo ? reposo + (movimiento - reposo) * empuje : reposo;
      const mA = asentarRestante > 0 ? Math.max(base, asentar) : base;
      return (mA / 1000) * (voltios / SERVO.voltiosRef);
    },
    estado: () => ({ angulo, objetivo, pulso, moviendo }),
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
