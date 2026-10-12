// Revisa un circuito contra el contrato: el esquema (contrato/circuito.schema.json) y lo que un esquema no ve,
// que cada cable y cada «en» lleguen a una pieza que existe y a un pin que esa pieza tiene.
// Uso como módulo: const { revisarCircuito } = require('./contrato.js');  → lista de problemas (vacía si está bien)
// Uso suelto:      node pruebas/contrato.js circuito1.json circuito2.json …   (sale con 1 si alguno tiene problemas)
const fs = require('fs');
const path = require('path');
const Ajv2020 = require('ajv/dist/2020').default;

const ESQUEMA = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'contrato', 'circuito.schema.json'), 'utf8'));
const validar = new Ajv2020({ allErrors: true, strict: false }).compile(ESQUEMA);
const D = ESQUEMA.$defs;
const HUECO = new RegExp(D['hueco-media'].pattern);

// Pines de cada pieza, tal como los define el esquema. Los tipos que no están aquí son «desconocidos»: no se revisan.
const PINES = {
  resistencia: D['pines-resistencia'].enum,
  led: D['pines-led'].enum,
  potenciometro: D['pines-potenciometro'].enum,
  pulsador: D['pines-pulsador'].enum,
  servo: D['pines-servo'].enum,
  shield_l293d: D['pines-shield_l293d'].enum,
  shield_nano_io: D['pines-shield_nano_io'].enum,
  motor_tt: D['pines-motor_tt'].enum,
  bateria_lipo: D['pines-bateria_lipo'].enum,
  probador_lipo: D['pines-probador_lipo'].enum,
};
const PINES_PLACA = { uno: D['pines-placa-uno'].enum, nano: D['pines-placa-nano'].enum, nano_old: D['pines-placa-nano'].enum };

function revisarCircuito(c) {
  if (!validar(c)) {
    return validar.errors
      .filter((e) => !['if', 'oneOf'].includes(e.keyword)) // repiten el error de adentro
      .map((e) => `esquema: ${e.instancePath || '(raíz)'} ${e.message}${e.params && e.params.allowedValues ? ' ' + JSON.stringify(e.params.allowedValues) : ''}`);
  }
  const problemas = [];
  const piezas = new Map();
  for (const k of c.componentes) {
    if (piezas.has(k.id)) problemas.push(`la pieza «${k.id}» está repetida`);
    piezas.set(k.id, k);
  }
  const pinValido = (ref) => {
    const corte = ref.indexOf('.');
    const [id, pin] = corte > 0 ? [ref.slice(0, corte), ref.slice(corte + 1)] : [ref, ''];
    if (id === 'placa') return !PINES_PLACA[c.placa] || PINES_PLACA[c.placa].includes(pin) || `la placa ${c.placa} no tiene el pin «${pin}»`;
    if (id === 'protoboard') return !c.protoboard ? 'hay un cable a la protoboard, pero no hay protoboard' : HUECO.test(pin) || `la protoboard no tiene el hueco «${pin}»`;
    const k = piezas.get(id);
    if (!k) return `no hay ninguna pieza «${id}»`;
    return !PINES[k.tipo] || PINES[k.tipo].includes(pin) || `la pieza «${id}» (${k.tipo}) no tiene el pin «${pin}»`;
  };
  c.cables.forEach((cable, i) => {
    if (cable.de === cable.a) problemas.push(`el cable ${i} empieza y termina en ${cable.de}`);
    for (const ref of [cable.de, cable.a]) {
      const r = pinValido(ref);
      if (r !== true) problemas.push(`cable ${i} (${cable.de} → ${cable.a}): ${r}`);
    }
  });
  // «en»: cada pata va en un hueco (si hay protoboard) o enchufada en el pin de otra pieza o de la placa; un hueco o un
  // pin recibe una sola pata, y una pieza no se enchufa en sí misma.
  const reciben = new Map();
  for (const k of c.componentes) {
    if (!k.en) continue;
    for (const [pata, ref] of Object.entries(k.en)) {
      if (ref.startsWith('protoboard.') && !c.protoboard) {
        problemas.push(`la pieza «${k.id}» tiene «en» en la protoboard, pero no hay protoboard`);
        continue;
      }
      if (ref.startsWith(k.id + '.')) {
        problemas.push(`«en» de «${k.id}», pata ${pata}: una pieza no se enchufa en sí misma`);
        continue;
      }
      const r = pinValido(ref);
      if (r !== true) problemas.push(`«en» de «${k.id}», pata ${pata}: ${r}`);
      // Una pata entra en un agujero real: los alias (SPI_* de la expansión, SDA/SCL/MISO/MOSI/SCK/SS del Nano) no.
      const [idDestino, pinDestino] = [ref.slice(0, ref.indexOf('.')), ref.slice(ref.indexOf('.') + 1)];
      const nano = c.placa === 'nano' || c.placa === 'nano_old';
      if (pinDestino.startsWith('SPI_') || (idDestino === 'placa' && nano && ['SDA', 'SCL', 'MISO', 'MOSI', 'SCK', 'SS'].includes(pinDestino))) {
        problemas.push(`«en» de «${k.id}», pata ${pata}: «${ref}» es otro nombre de un pin; se enchufa en el pin físico`);
      }
      if (reciben.has(ref)) problemas.push(`«${ref}» recibe dos patas: ${reciben.get(ref)} y ${k.id}.${pata}`);
      reciben.set(ref, `${k.id}.${pata}`);
    }
  }
  return problemas;
}

module.exports = { revisarCircuito, ESQUEMA, PINES, PINES_PLACA, HUECO };

if (require.main === module) {
  let malos = 0;
  for (const archivo of process.argv.slice(2)) {
    const problemas = revisarCircuito(JSON.parse(fs.readFileSync(archivo, 'utf8')));
    console.log((problemas.length ? 'FALLA ' : 'OK    ') + path.basename(archivo) + (problemas.length ? ':\n        ' + problemas.join('\n        ') : ''));
    if (problemas.length) malos++;
  }
  process.exit(malos ? 1 : 0);
}
