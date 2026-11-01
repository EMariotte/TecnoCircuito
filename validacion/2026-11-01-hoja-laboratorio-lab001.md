# Hoja de laboratorio: lo que falta de LAB-001 (preparada el 1 de noviembre de 2026)

Hoja para la próxima sesión de laboratorio de Efraín. Reúne las preguntas y medidas pendientes de las dos entregas del cuaderno LAB-001 ([28 oct](2026-10-28-lab001.md) y [29 oct](2026-10-29-lab001.md)). Al terminar, se exporta el cuaderno como siempre y Claude lo revisa.

- **Instrumento:** UNI-T UT33B+. **Anota siempre la escala** junto a cada corriente (200 µA, 2000 µA, 20 mA, 200 mA o 10 A).
- **Al exportar:** las notas de una exportación anterior no pasan a la siguiente (en la segunda se borraron las de T3-1 y T3-4). Si algo importa, escríbelo otra vez.

## Seguridad (igual que el 15 oct)

1. **Después de cada medida de corriente, devuelve la punta roja al borne de voltios.** Medir la LiPo con la punta en el borne de 10 A es un corto directo a la batería.
2. Motores y servos: borne y escala de **10 A**.
3. Motor bloqueado: **1 s como máximo**. Servo bloqueado: 2 s como máximo.

## Primero, tres preguntas sobre la entrega del 29 oct

Se contestan de memoria o con las fotos. Sin ellas no se usan esos datos.

| # | Prueba | Pregunta | Respuesta |
|---|---|---|---|
| P1 | T3-5, Nano con 0 a 6 SG90 | ¿Qué expansión era (roja o azul)? ¿El USB salía del Acer o del HP del aula? | |
| P2 | T3-6, MG90S | ¿En qué escala se leyeron `i_barrido` (0,8 a 1,0) e `i_bloq` (1,3 a 1,5)? ¿Eran mA o A? ¿`i_quieto` (4,73 a 4,80) era una corriente o el voltaje del 5V? | |
| P3 | T3-8, segundo motor TT | ¿El amperímetro iba en serie con el motor o con la batería, y en qué escala? ¿Cómo se midieron las rpm? ¿El «bloqueado» llegó a detener el eje (marcó 150 rpm)? | |

## Orden de la sesión

| # | Prueba | Qué falta | ¿Hecha? |
|---|---|---|---|
| 1 | T1-B, resistencia de 215 Ω | La corriente | |
| 2 | T3-6, MG90S | Las corrientes, con la escala | |
| 3 | T3-8, segundo motor TT | Libre y bloqueado del eje | |
| 4 | T2-A y T2-C, ruido del ADC | Repetir en el HP del aula | |
| 5 | T1-A y T2-B, tiempos y PWM | Esperan el analizador lógico | |
| 6 | U-1, U-2 y U-3 | Con aprendices y en el aula | |

---

## 1. T1-B: la corriente con 215 Ω

El 28 oct se midió el voltaje (5V 4,72 V, LED 2,85 V, resistencia 1,78 V), pero la corriente no. El 29 oct dio 0,005 mA en la escala de **200 µA**, que no sirve: se esperan unos **8 mA**.

- [ ] Multímetro en serie, **escala de 20 mA** (borne mA). Anota la corriente.
- [ ] ¿Es el **mismo LED rojo** de la medida del 7 oct? 2,85 V es mucho para un LED rojo a 8 mA (el del 7 oct daba cerca de 2 V). Si no es el mismo, anota el color o el modelo.

## 2. T3-6: corrientes de los MG90S

Los ángulos ya están. Faltan las corrientes, medidas como el SG90 del 9 oct: **borne y escala de 10 A**, en serie con el cable rojo del servo.

| | Quieto (mA) | Barrido continuo (mA) | Bloqueado ≤2 s (mA) | Escala |
|---|---|---|---|---|
| MG90S 1 | | | | |
| MG90S 2 | | | | |
| MG90S 3 | | | | |
| MG90S 4 | | | | |

- Quieto: «Validar: servo 0°, 90° y 180°», con el brazo detenido en 90°.
- Barrido: «Validar: servo en barrido continuo».
- La escala de 10 A mide de a 10 mA: un servo quieto puede marcar 0,00 o 0,01. Anótalo tal cual.
- Si puedes, anota también el 5V en cada caso (con el otro multímetro).

## 3. T3-8: segundo motor TT

Con el amperímetro **en serie con el motor** (entre el borne M1 de la shield y el motor), borne y escala de 10 A. M1 a 255, salvo donde dice 200.

| | Batería (V) | Motor (V) | Corriente (A) | rpm | ¿Cómo se midieron las rpm? |
|---|---|---|---|---|---|
| 255 libre | | | | | |
| 200 libre | | | | | |
| 255 bloqueado **del eje** (≤1 s) | | | | 0 | |

- Bloqueado quiere decir **detenido**: si el eje sigue girando, anótalo como «frenado».
- Si alcanzas, repite el **primer motor** bloqueado del eje con la misma batería. Así se sabe si el juego de la llanta afectó las medidas del 28 oct.
- Anota el voltaje de la batería en reposo antes de empezar (el 29 oct estaba en 7,8 V; el 28 oct, en 6,8 V).

## 4. T2-A y T2-C: ruido del ADC en el HP del aula

El 28 oct, con el Acer y su cargador, la placa tuvo cuatro veces el ruido del simulador (0,32 pasos frente a 0,07). El 9 oct, en el HP, dio 0,1 pasos. Antes de tocar el ruido del modelo se repite en el HP.

- [ ] HP del aula, con su cargador. Ejemplo «Validar: ruido de analogRead()», potenciómetro quieto en tres posiciones (25 %, 50 % y 75 %), unos 30 s en cada una. Guarda el CSV del monitor.
- [ ] Con el simulador, en el mismo ejemplo, **anota la lectura al 50 %** (el 28 oct faltó).

## 5. T1-A y T2-B: tiempos y PWM

Esperan el analizador lógico. Sin cambios.

## 6. U-1, U-2 y U-3: con aprendices y en el aula

- U-1: el imán del lienzo, con aprendices.
- U-2: la velocidad del simulador en el PC del aula.
- U-3: que las piezas caigan bien en los huecos de la protoboard (PIEZA-001 y PIEZA-002).

---

## Ya resuelto (no hay que repetir)

- T3-1 sentido de giro, T3-2 bobinado de 4 Ω, T3-3 caída del L293D (modelo ajustado el 28 oct).
- T3-4 el Uno con 10 servos no se reinicia, y T3-5 el Nano con 6 tampoco: el golpe de arranque del modelo se ajusta en software (decisión de Efraín, 1 nov).
- T3-7 continuidad de la shield.
- Los ángulos de los MG90S (T3-6). Con ellos se abrió la ficha de la desviación propia de cada servo (decisión de Efraín, 1 nov).
- El monitor serial con la placa real: CSV y gráfico.
