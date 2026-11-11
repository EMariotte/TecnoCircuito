// Revisa el archivo de respuestas de una misión de TecnoBloques contra contrato/respuestas.schema.json (EST-004) y lo que
// un esquema no ve: los pasos en orden, sin repetir, y sus sesiones coherentes.
// Uso como módulo: const { revisarRespuestas } = require('./contrato_respuestas.js');
//   revisarRespuestas(doc) → lista de problemas (vacía si está bien)
// Uso suelto: node pruebas/contrato_respuestas.js respuestas-A7-estudio_x1-20261126-0942.json …  (sale con 1 si alguno falla)
const fs = require('fs');
const path = require('path');
const Ajv2020 = require('ajv/dist/2020').default;

const ESQUEMA = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'contrato', 'respuestas.schema.json'), 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strict: false });
const validar = ajv.compile(ESQUEMA);

function revisarRespuestas(doc) {
  if (!validar(doc)) {
    return validar.errors
      .filter((e) => !['if', 'allOf', 'anyOf'].includes(e.keyword)) // repiten el error de adentro
      .map((e) => `esquema: ${e.instancePath || '(raíz)'} ${e.message}`);
  }
  const problemas = [];
  doc.pasos.forEach((p, i) => { if (p.paso !== i + 1) problemas.push(`pasos: el ${i + 1}.º dice ser el paso ${p.paso}`); });
  const vistas = new Set();
  for (const p of doc.pasos) {
    for (const r of p.respuestas) {
      if (vistas.has(r.pregunta)) problemas.push(`pasos: la pregunta «${r.pregunta}» está dos veces`);
      vistas.add(r.pregunta);
    }
  }
  // Las sesiones (r1 de EST-004): una respuesta va en la sesión de su paso (se guardan juntos), y toda sesión anotada está
  // en «sesiones». Sin equipo no hubo registro, así que no hay sesiones.
  const lista = new Set(doc.sesiones);
  for (const p of doc.pasos) {
    if (p.sesion !== null && !lista.has(p.sesion)) problemas.push(`pasos: el paso ${p.paso} está en una sesión que no está en «sesiones»`);
    for (const r of p.respuestas) if (r.sesion !== p.sesion) problemas.push(`pasos: la respuesta «${r.pregunta}» no va en la sesión de su paso`);
  }
  if (doc.equipo === null && (doc.sesiones.length || doc.pasos.some((p) => p.sesion !== null))) problemas.push('equipo: sin equipo (registro apagado) no hay sesiones del registro');
  return problemas;
}

module.exports = { revisarRespuestas, ESQUEMA };

if (require.main === module) {
  let malos = 0;
  for (const archivo of process.argv.slice(2)) {
    const p = revisarRespuestas(JSON.parse(fs.readFileSync(archivo, 'utf8')));
    console.log(`${p.length ? 'FALLA' : 'OK   '} ${archivo}${p.length ? ': ' + p.join(' | ') : ''}`);
    if (p.length) malos++;
  }
  process.exit(malos ? 1 : 0);
}
