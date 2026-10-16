# Polaridad de M1, motor bloqueado y servos en el Uno (tarea T3)

- **Fecha:** 16 de octubre de 2026, en la TecnoAcademia Tolima.
- **Quién:** Efraín Mariotte (medida) y Claude (análisis).
- **Instrumento:** UNI-T UT33B+ en voltios DC.
- **Montaje:** el del carro (`2026-10-15-carro-l293d.md`) y, para los servos, el Uno solo por USB.
- **Estado:** medidas parciales. **El modelo no se cambió:** faltan los datos de la lista «Pendiente».

## Medidas

### Polaridad de M1 («Validar: carro con la shield L293D»)

| Orden | Tornillo positivo de M1 (de arriba hacia abajo) | Lo que supone el simulador |
|---|---|---|
| FORWARD (adelante 200) | **el segundo** | el primero (M1A) |
| BACKWARD (atrás 255) | **el primero** | el segundo (M1B) |

La librería del kit (AFMotor_R4, BSD-3) hace lo mismo que el simulador: FORWARD pone en ALTO Q2 (`MOTOR1_A`). Según la continuidad del 15 oct, Q2 llega por U1 al primer tornillo, y el dibujo pone M1A arriba. Una de las tres cosas está al revés frente a la shield real.

**Hipótesis:** si solo M1 tiene A y B al revés del dibujo y M4 no, con el mismo cableado visto de frente los dos motores reciben polaridades opuestas. Como van montados en espejo, las dos ruedas avanzan, que es lo que se vio el 15 oct.

### M1 con la rueda bloqueada (≤ 1 s)

| Orden | M1 real | Modelo (LiPo en 7,64 V) |
|---|---|---|
| adelante 200 | **3,00 V** | ~3,45 V |
| atrás 255 | **3,44 V** | 4,25 V |

Con los 0,90 A del 15 oct, el bobinado sería de unos 3,8 Ω (el modelo usa 5 Ω, de la hoja: 1,2 A a 6 V). La caída del L293D subiría unos 1,7 V por amperio (el modelo usa 1). Sin el voltaje de la batería durante el bloqueo, las dos cifras no se separan.

### 5 y 6 SG90 en el USB del Uno («Validar: seis servos en el USB»)

**No se reinició, ni con 5 ni con 6.** El simulador predice reinicio desde 5: en el arranque, el 5V cae a 2,5 y 2,3 V. El Nano tampoco se reinició con 6 (15 oct). Las dos placas indican que **el golpe de arranque del modelo está exagerado**: cada SG90 arranca pidiendo los 590 mA medidos con el brazo frenado.

## Pendiente para la próxima sesión de laboratorio

1. **M4 en «adelante 200»:** qué tornillo queda positivo, de arriba hacia abajo.
2. **La orientación:** confirmar que «arriba» es con la shield como en el dibujo (bornera M1/M2 a la izquierda, EXT_PWR abajo).
3. **Un motor directo a la batería** (rojo al +, un instante): montado a la izquierda, ¿la rueda va hacia adelante o hacia atrás?
4. **La batería sin carga** (EXT_PWR, programa detenido) y **con la rueda bloqueada en «atrás 255»** (≤ 1 s), para separar el bobinado del motor y la caída del L293D.
5. **El límite de reinicio con servos:** 6 SG90 más los 4 MG90S (10 servos) en el Uno, y si «Inicio» se repite. Si se puede, el 5V con 5 y 6 SG90.
6. **El 5V del Nano** sin servos y con 1 a 4 SG90, para su resistencia del USB.

Con esto se ajustan juntos: el dibujo de los tornillos (y el ejemplo del carro), `MOTOR_TT.mABloqueado`, `SHIELD.caidaPorA`, el arranque de los servos (`MODELOS_SERVO`, `src/energia.js`) y el USB del Nano.
