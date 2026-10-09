# Ángulos del servo en la placa real (tarea T3)

- **Fecha:** 9 de octubre de 2026, en la TecnoAcademia Tolima.
- **Quién:** Efraín Mariotte (medida con transportador de 360°) y Claude (registro).
- **Programa:** `programas/servo_barrido/servo_barrido.ino` (TecnoBloques, Ejemplos → «Validar: servo 0°, 90° y 180°»). Pasa un segundo en `write(0)`, `write(90)` y `write(180)`.
- **Servo:** un SG90 del kit, alimentado por el 5V del Uno.

## Medidas

| Orden | Pulso que manda la librería Servo | Ángulo real |
|---|---|---|
| `write(0)` | 544 µs | **7°** (le faltan unos 7° para llegar a 0°) |
| `write(90)` | 1472 µs | **90°** exactos |
| `write(180)` | 2400 µs | **175°** (le faltan unos 5° para llegar a 180°) |

La referencia es la posición con `write(90)`, a 90° exactos. Desde ahí se midió cuánto falta a cada extremo.

## Análisis

- **Es lo típico de los clones:** el servo recorre unos 168° con el rango de la librería (544 a 2400 µs), no 180°.
- **Grados por microsegundo:** del centro hacia 0° van 928 µs para 83° (11,2 µs por grado); hacia 180°, 928 µs para 85° (10,9 µs por grado). Coincide con los 11 µs por grado típicos del SG90.

## Ajuste del simulador

- **Antes:** 544 µs = 0° y 2400 µs = 180°, en línea recta.
- **Ahora:** `MODELOS_SERVO.sg90.angulos` en `src/piezas/servo.js`, con el centro en 1472 µs (90°) y los µs por grado medidos a cada lado. `write(0)`, `write(90)` y `write(180)` dan 7°, 90° y 175°, como el SG90 del kit.
- `probar_nucleo.js` y `probar_servo.py` lo comprueban.

## Pendiente

- **El MG90S** usa por ahora los mismos valores: está por medir con los servos del brazo robótico.
- La corriente de los servos y la energía del USB (pruebas 5 y 6).
