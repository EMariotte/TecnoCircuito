# Entrada digital al aire en la placa real (tarea T1)

- **Fecha:** 9 de octubre de 2026, en la TecnoAcademia Tolima.
- **Quién:** Efraín Mariotte (medida) y Claude (análisis).
- **Programa:** `programas/validar_flotante/validar_flotante.ino`, subido desde TecnoBloques (Ejemplos → «Validar: entrada al aire»). El pin 2 queda como entrada sin pull-up. Durante 2 s cuenta cuántas veces cambia y qué parte del tiempo lee ALTO.
- **Placa:** Arduino Uno del kit, alimentado por USB desde el portátil.

## Medidas

| Caso | Montaje | Líneas (cambios en 2 s · % en ALTO) |
|---|---|---|
| Simulador (modelo de entonces) | pin 2 sin nada | 13 · 49,7 — 26 · 46,7 — 20 · 48,1 — 17 · 44,8 — 19 · 20,8 — 20 · 46,1 — 16 · 54,0 — 15 · 56,3 — 15 · 54,3 — 28 · 61,5 |
| A | pin 2 sin nada | 0 · 0,0 (4 líneas iguales) |
| B | cable de 20 cm solo en el pin 2, la otra punta al aire | 0 · 0,0 — 0 · 0,0 — 3 · 12,9 — 10 · 100,0 — 137 · 99,2 — 53 · 97,6 |
| C | el cable del caso B con la mano cerca o tocándolo | 225 · 51,3 — 263 · 35,7 — 258 · 35,1 — 260 · 35,3 — 269 · 35,4 — 264 · 35,4 — 252 · 35,3 |

**Observación de Efraín:** al principio todos los casos dieron 0. Los resultados de B y C aparecieron después de tocar el cable y frotarlo un poco, y de repetir la prueba.

## Análisis

1. **Sin nada cerca, la entrada real no cambia sola.** Se queda en un nivel (aquí BAJO) durante segundos: la entrada del ATmega casi no tiene fugas, y la carga que tiene se queda.
2. **Con un cable cargado (frotado), cambia en ráfagas** y se queda casi siempre en ALTO: la carga estática lo sube.
3. **Con la mano cerca, sigue la red eléctrica de 60 Hz** (Colombia). Cada ciclo cruza el umbral dos veces: 60 × 2 × 2 s = **240 cambios en 2 s**, y se midieron de 225 a 269. El ~35 % en ALTO es la parte de cada onda por encima del umbral de ALTO (3 V).
4. **El modelo del simulador** (un cambio al azar en promedio cada 120 ms, 50 % en ALTO) **no se parece a ninguno de los tres casos.**

## Propuesta de modelo nuevo (por decidir con Efraín)

- **Sin el mouse cerca:** la entrada se queda en su nivel, con cambios muy raros (como los casos A y B).
- **El mouse es la mano:** con el puntero sobre el cable o el pin al aire, la entrada sigue una onda de 60 Hz (unos 120 cambios por segundo, ~35 % en ALTO), como en el caso C.
- **Parámetro:** la frecuencia de la red (60 Hz en Colombia).
- **Por qué:** es lo que pasa de verdad, y el aprendiz lo descubre acercando el mouse al cable que olvidó conectar.

## Pendiente

- Decidir e implementar el modelo nuevo, y repetir el caso C en el simulador para compararlo.
- La entrada **analógica** al aire no se midió todavía.

## Modelo implementado (9 oct, aprobado por Efraín)

Efraín aprobó el modelo «la mano es el mouse», y se implementó el mismo día:

- **Sin el mouse cerca:** la entrada al aire se queda en su nivel. Cambia al azar en promedio cada 10 s (`CAMBIO_AL_AIRE_POR_MS = 1/10000`).
- **Con el mouse sobre un pin o un cable** unido a la entrada (por cables, la protoboard, resistencias o un botón): la entrada sigue la red de **60 Hz** (`RED_HZ`), en ALTO cuando sin(2π·60·t) > 0,454, que es el 35 % del tiempo.
- **Analógica:** con el mouse encima, lee la onda de 60 Hz de punta a punta.

**Comparación, con el mismo programa (`validar_flotante`):**

| Caso | Placa real | Simulador |
|---|---|---|
| Pin al aire, sin nada cerca | `cambios 0 alto 0.0 %` | 0 cambios en 3 s |
| Con la mano (mouse) | 225 a 269 cambios, ~35,3 % | `cambios 240 alto 35.1 %` |

En la página, con el mouse sobre la pata del botón, el LED del pin 13 brilla al 36 %. Parpadea 60 veces por segundo y el ojo lo ve a medias.
