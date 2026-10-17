// Revisa eventos contra el contrato: el esquema (contrato/evento.schema.json) y, en simulacion_iniciada, el circuito
// que lleva, con lo que un esquema no ve (contrato.js).
// Uso como módulo: const { revisarEvento } = require('./contrato_eventos.js');
//   revisarEvento(ev)                    → la línea del archivo, con el sobre completo de TecnoBloques
//   revisarEvento(ev, { emitido: true }) → lo que emite el paquete, antes del sobre
//   → lista de problemas (vacía si está bien)
// Uso suelto: node pruebas/contrato_eventos.js [--emitidos] registro.jsonl eventos.json …
//   (.jsonl: un evento por línea; .json: una lista de eventos. Sale con 1 si alguno tiene problemas.)
const fs = require('fs');
const path = require('path');
const Ajv2020 = require('ajv/dist/2020').default;
const { revisarCircuito, ESQUEMA: ESQUEMA_CIRCUITO } = require('./contrato.js');

const ESQUEMA = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'contrato', 'evento.schema.json'), 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strict: false });
ajv.addSchema(ESQUEMA_CIRCUITO);
const validarLinea = ajv.compile(ESQUEMA);
const validarEmitido = ajv.getSchema(ESQUEMA.$id + '#/$defs/evento');

function revisarEvento(ev, { emitido = false } = {}) {
  const validar = emitido ? validarEmitido : validarLinea;
  if (!validar(ev)) {
    return validar.errors
      .filter((e) => !['if', 'oneOf', 'allOf'].includes(e.keyword)) // repiten el error de adentro
      .map((e) => `esquema: ${e.instancePath || '(raíz)'} ${e.message}${e.params && e.params.allowedValues ? ' ' + JSON.stringify(e.params.allowedValues) : ''}`);
  }
  if (ev.tipo === 'simulacion_iniciada') return revisarCircuito(ev.datos.circuito).map((p) => 'circuito: ' + p);
  return [];
}

// Lee un .jsonl (un evento por línea) o un .json (una lista de eventos).
function leerEventos(archivo) {
  const texto = fs.readFileSync(archivo, 'utf8');
  if (archivo.endsWith('.jsonl')) return texto.split(/\r?\n/).filter((l) => l.trim()).map((l) => JSON.parse(l));
  return JSON.parse(texto);
}

module.exports = { revisarEvento, leerEventos, ESQUEMA };

if (require.main === module) {
  const emitido = process.argv.includes('--emitidos');
  let malos = 0;
  for (const archivo of process.argv.slice(2).filter((a) => !a.startsWith('--'))) {
    const eventos = leerEventos(archivo);
    const conProblemas = eventos.map((ev, i) => [i, ev, revisarEvento(ev, { emitido })]).filter(([, , p]) => p.length);
    console.log((conProblemas.length ? 'FALLA ' : 'OK    ') + `${path.basename(archivo)}: ${eventos.length} eventos` +
      conProblemas.map(([i, ev, p]) => `\n        ${i + 1} (${ev && ev.tipo}): ${p.join(' | ')}`).join(''));
    if (conProblemas.length) malos++;
  }
  process.exit(malos ? 1 : 0);
}
