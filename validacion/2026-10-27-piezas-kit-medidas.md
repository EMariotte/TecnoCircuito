# Potenciómetro y pulsador del kit, con el multímetro

- **Fecha:** 27 de octubre de 2026, en la TecnoAcademia Tolima.
- **Quién:** Efraín Mariotte (medidas) y Claude (registro, 28 oct).
- **De dónde vienen:** los registros de TecnoDiseñador `componentes/potenciometro-16mm/registro-verificacion.md` y `componentes/pulsador-6mm/registro-verificacion.md` (commit `30ac0ba`). Se traen aquí porque las fichas de la biblioteca (`src/biblioteca.js`) las citan, y lo que se compara con la pieza real va en `validacion/` (hallazgo A-03 de la revisión de PIEZA-001 y PIEZA-002).
- **Instrumento:** multímetro UNI-T UT33B+. En esta medición no se anotó la escala ni la incertidumbre.
- **Tipo de validación:** las uniones y el valor de la pieza real. **No** cubre la geometría en la protoboard real, que sigue pendiente (LAB-001, punto 4), ni una comparación del circuito simulado con el real.

## Potenciómetro de 16 mm (B10K)

| Medida | Resultado | En el simulador |
|---|---|---|
| Entre los extremos | 10,28 kΩ | 10 kΩ (la medida es un 2,8 % mayor) |
| Del extremo al cursor, con el eje a 135° (la mitad del giro) | 5,13 kΩ | la mitad: es **lineal (B)**, como lo modela el simulador y lo dice su serigrafía «B10K» |
| Orden de las patas | izquierda `GND`, medio `SIG`, derecha `VCC`; con el eje todo girado contra el reloj, izquierda–medio = 0 Ω | el mismo orden y el mismo sentido de giro |

## Pulsador de 6 × 6 mm

| Medida | Resultado | En el simulador |
|---|---|---|
| Suelto | las patas del mismo lado no se tocan | `1i`–`1d` y `2i`–`2d` unidas por dentro; la 1 y la 2 (las del mismo lado), separadas |
| Presionado | se unen las cuatro | al presionar se une la 1 con la 2 |

Según el registro de TecnoDiseñador, las dos piezas **coinciden** con su modelo eléctrico. Las medidas de tamaño (pie de rey) son del dibujo y están en los mismos registros de TecnoDiseñador.
