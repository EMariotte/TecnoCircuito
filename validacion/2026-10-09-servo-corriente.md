# Corriente del servo en la placa real (tarea T3)

- **Fecha:** 9 de octubre de 2026, en la TecnoAcademia Tolima.
- **Quién:** Efraín Mariotte (medida) y Claude (análisis).
- **Instrumento:** multímetro UNI-T UT33B+ en corriente continua, en el borne de 10 A (resolución de 10 mA), en serie con el cable rojo del servo: 5V del Uno → multímetro → servo.
- **Servo:** SG90 del kit, alimentado por el 5V del Uno por USB.
- **Programas** (TecnoBloques, grupo «Validación con la placa real»):
  - «Validar: servo 0°, 90° y 180°» (`servo_barrido.ino`) para el reposo y el bloqueo;
  - «Validar: servo en barrido continuo» (`servo_continuo.ino`, nuevo: va y viene sin parar, un grado cada 15 ms) para la corriente en movimiento, porque el multímetro es lento y no alcanza a leer un movimiento de 0,15 s.

## Medidas

| Situación | Placa real | Simulador antes | Simulador ahora |
|---|---|---|---|
| Quieto | 0 mA (menos de 10 mA, la resolución de la escala); sube a 10 mA si se empuja el brazo | 10 mA | **6 mA** (el típico de la hoja de datos) |
| Barrido continuo | ~100 mA | 674 mA (defecto del modelo, ver abajo) | **100 mA** |
| Bloqueado (el brazo sujeto con los dedos) | **590 mA** | 650 mA | **590 mA** |

## Lo que se corrigió en el modelo

1. **Corriente proporcional a lo que falta.** El control del servo empuja el motor en proporción a lo que le falta para llegar. Antes, cada paso de 1° del barrido contaba como un arranque completo, casi con la corriente de bloqueo, y daba 674 mA. Ahora el empuje es `lo que falta / bandaGrados` (máximo 1), tanto en el arranque como en el movimiento.
2. **`bandaGrados = 8`:** ajustado para que el barrido continuo dé los ~100 mA medidos.
3. **SG90:** reposo de 6 mA y bloqueo (arranque a fondo) de 590 mA.

## Consecuencias para la energía del USB

- Con 2 SG90 arrancando a la vez, el pico baja de 1,40 a unos 1,29 A: no se reinicia.
- Con 3, unos 1,8 A: se reinicia (límite del puerto: 1,5 A, por validar en la prueba 6).

## Pendiente

- **El MG90S** (servos del brazo robótico): las mismas tres medidas. Por ahora usa los valores de la hoja de datos (10, 250 y 700 mA).
- **La corriente «a fondo» en movimiento** (un salto grande, por ejemplo de 0° a 180°): el multímetro es muy lento para verla. Haría falta un osciloscopio o una resistencia de 1 Ω y el analizador lógico.
