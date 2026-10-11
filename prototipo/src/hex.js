// Lee un archivo Intel HEX (el que deja arduino-cli) y devuelve la memoria de programa.
// Va aparte del chip para que la página pueda revisar el .hex sin cargar avr8js (el chip corre en el Worker).
const MEMORIA_PROGRAMA = 0x8000; // 32 KB de flash del ATmega328P
// Bytes de datos de cada tipo de línea: 0 datos (cualquier largo), 1 fin, 2 segmento, 3 inicio de segmento,
// 4 dirección lineal, 5 inicio lineal. Los tipos 3 y 5 no cambian la memoria: se aceptan y se ignoran.
const LARGO_POR_TIPO = { 0: null, 1: 0, 2: 2, 3: 4, 4: 2, 5: 4 };

export function leerHex(texto) {
  const bytes = new Uint8Array(MEMORIA_PROGRAMA);
  let base = 0;
  let fin = false;
  for (const [n, crudo] of String(texto).split(/\r?\n/).entries()) {
    const linea = crudo.trim();
    if (!linea) continue;
    if (!/^:([0-9a-f]{2})+$/i.test(linea)) throw new Error(`El .hex no es válido (línea ${n + 1}).`);
    const datos = linea.slice(1).match(/../g).map((h) => parseInt(h, 16));
    if (datos.reduce((s, b) => s + b, 0) & 0xff) throw new Error(`El .hex está dañado (línea ${n + 1}).`);
    const [largo, dirAlta, dirBaja, tipo] = datos;
    // La suma no basta: una línea cortada puede sumar bien y usar su propia suma como dato. Cada línea trae
    // largo + 5 bytes (largo, dirección, tipo, datos y suma), y cada tipo tiene su largo.
    if (datos.length !== largo + 5 || !(tipo in LARGO_POR_TIPO) || (LARGO_POR_TIPO[tipo] !== null && largo !== LARGO_POR_TIPO[tipo])) {
      throw new Error(`El .hex está dañado (línea ${n + 1}).`);
    }
    const contenido = datos.slice(4, 4 + largo);
    if (tipo === 0) {
      const dir = base + ((dirAlta << 8) | dirBaja);
      if (dir + largo > MEMORIA_PROGRAMA) throw new Error('El programa no cabe en la memoria del Uno.');
      bytes.set(contenido, dir);
    } else if (tipo === 1) {
      fin = true;
      break;
    } else if (tipo === 2) {
      base = ((contenido[0] << 8) | contenido[1]) << 4;
    } else if (tipo === 4) {
      base = ((contenido[0] << 8) | contenido[1]) << 16;
    }
  }
  if (!fin) throw new Error('El .hex está incompleto: falta la línea final.');
  return new Uint16Array(bytes.buffer);
}
