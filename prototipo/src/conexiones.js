import { tiras } from './protoboard.js';

// Agrupa en nodos eléctricos los pines unidos por cables, como seguir un cable con el dedo.
// En el prototipo 1 aquí también estaba la «regla de conexiones» que decidía si un LED prendía;
// desde el prototipo 2 eso lo calcula el solucionador eléctrico (motor/), y la resistencia ya no es un paso.

// Pines de la placa unidos por dentro: son el mismo nodo eléctrico.
const PUENTES_UNO = [
  ['GND1', 'GND2', 'GND3'],
  ['A4', 'SDA'],
  ['A5', 'SCL'],
];

// Devuelve una función que da el nodo (un representante del grupo) de cada pin "<id>.<pin>".
//   presionados: ids de los botones presionados ahora (al presionar se une la pata 1 con la 2).
//   conduccion:  además une las patas de resistencias y potenciómetros. No sirve para resolver el circuito:
//                sirve para saber si una entrada tiene algún camino a 5V, a GND o a un pin que la maneje.
export function calcularNodos(circuito, { presionados = new Set(), conduccion = false } = {}) {
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
  for (const grupo of PUENTES_UNO) grupo.forEach((pin) => unir('placa.' + grupo[0], 'placa.' + pin));
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
    if (c.tipo === 'pulsador') {
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
