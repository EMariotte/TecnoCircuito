// Lee un archivo Intel HEX (el que deja arduino-cli) y devuelve la memoria de programa.
// Va aparte del chip para que la página pueda revisar el .hex sin cargar avr8js (el chip corre en el Worker).
const MEMORIA_PROGRAMA = 0x8000; // 32 KB de flash del ATmega328P

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
