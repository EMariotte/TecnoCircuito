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
export function calcularNodos(circuito) {
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
  return raiz;
}
