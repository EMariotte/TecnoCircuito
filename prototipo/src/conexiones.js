import { tiras } from './protoboard.js';
import { PUENTES_SHIELD } from './piezas/shield_l293d.js';
import { PUENTES_EXPANSION } from './piezas/shield_nano_io.js';
import { perfilPlaca, esNano } from './placas.js';

// Agrupa en nodos eléctricos los pines unidos por cables, como seguir un cable con el dedo.
// En el prototipo 1 aquí también estaba la «regla de conexiones» que decidía si un LED prendía;
// desde el prototipo 2 eso lo calcula el solucionador eléctrico (motor/), y la resistencia ya no es un paso.

// Pines de la placa unidos por dentro: son el mismo nodo eléctrico.
// Devuelve una función que da el nodo (un representante del grupo) de cada pin "<id>.<pin>".
//   presionados: ids de los botones presionados ahora (al presionar se une la pata 1 con la 2).
//   conduccion:  además une las patas de resistencias y potenciómetros. No sirve para resolver el circuito:
//                sirve para saber si una entrada tiene algún camino a 5V, a GND o a un pin que la maneje.
//   balanceInterno: une el balance de la batería con sus cables de potencia (BAL0 = NEG, BAL2 = POS). La netlist lo
//                apaga para saber si el cable de balance llega a la placa por sí mismo.
export function calcularNodos(circuito, { presionados = new Set(), conduccion = false, balanceInterno = true } = {}) {
  const padre = new Map();
  const raiz = (r) => {
    if (!padre.has(r)) padre.set(r, r);
    while (padre.get(r) !== r) {
      padre.set(r, padre.get(padre.get(r)));
      r = padre.get(r);
    }
    return r;
  };
  const unir = (a, b) => padre.set(raiz(a), raiz(b));
  for (const grupo of perfilPlaca(circuito.placa).puentes) grupo.forEach((pin) => unir('placa.' + grupo[0], 'placa.' + pin));
  for (const cable of circuito.cables) unir(cable.de, cable.a);
  // Protoboard: cada tira está unida por dentro, y cada pata encajada queda unida a su hueco.
  if (circuito.protoboard) {
    for (const grupo of tiras(circuito.protoboard.tipo).values()) grupo.forEach((h) => unir('protoboard.' + grupo[0], 'protoboard.' + h));
    for (const c of circuito.componentes) {
      if (!c.en) continue;
      for (const [pata, hueco] of Object.entries(c.en)) unir(c.id + '.' + pata, hueco);
    }
  }
  for (const c of circuito.componentes) {
    if (c.tipo === 'shield_nano_io' && esNano(circuito.placa)) {
      for (const [pin, otro] of PUENTES_EXPANSION) unir(c.id + '.' + pin, otro.startsWith('placa.') ? otro : c.id + '.' + otro);
    } else if (c.tipo === 'shield_l293d') {
      // La shield va enchufada al Uno: sus conectores de servo y sus GND son pines de la placa.
      for (const [pin, otro] of PUENTES_SHIELD) unir(c.id + '.' + pin, otro);
      // Con el puente PWR puesto, la batería de EXT_PWR también llega al Vin del Uno.
      if (!c.props || c.props.puentePWR !== false) unir(c.id + '.EXT_POS', 'placa.VIN');
    } else if (c.tipo === 'bateria_lipo' && balanceInterno) {
      // El cable de balance sale de los mismos puntos: BAL0 es el −, BAL2 es el + (BAL1, el punto entre las celdas).
      unir(c.id + '.BAL0', c.id + '.NEG');
      unir(c.id + '.BAL2', c.id + '.POS');
    } else if (c.tipo === 'pulsador') {
      unir(c.id + '.1i', c.id + '.1d'); // misma lámina de metal por dentro
      unir(c.id + '.2i', c.id + '.2d');
      if (presionados.has(c.id)) unir(c.id + '.1i', c.id + '.2i');
    } else if (conduccion && c.tipo === 'resistencia') {
      unir(c.id + '.1', c.id + '.2');
    } else if (conduccion && c.tipo === 'potenciometro') {
      unir(c.id + '.GND', c.id + '.SIG');
      unir(c.id + '.SIG', c.id + '.VCC');
    }
  }
  return raiz;
}
