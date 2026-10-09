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
  motor_tt: D['pines-motor_tt'].enum,
  bateria_lipo: D['pines-bateria_lipo'].enum,
};
const PINES_PLACA = { uno: D['pines-placa-uno'].enum };

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
    const [id, pin] = ref.split('.');
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
  for (const k of c.componentes) {
    if (!k.en) continue;
    if (!c.protoboard) {
      problemas.push(`la pieza «${k.id}» tiene «en», pero no hay protoboard`);
      continue;
    }
    for (const [pata, hueco] of Object.entries(k.en)) {
      const r = pinValido(hueco);
      if (r !== true) problemas.push(`«en» de «${k.id}», pata ${pata}: ${r}`);
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
