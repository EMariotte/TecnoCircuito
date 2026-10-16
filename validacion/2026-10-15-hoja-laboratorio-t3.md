# Hoja de laboratorio: T3 con la placa real (15 de octubre de 2026)

Hoja para llenar en el laboratorio. La columna «Simulador» es lo que predice TecnoCircuito en `2acf2b6`, en modo realista (las corridas están anotadas en la sección «De dónde salen las predicciones»). Al terminar, cada bloque se pasa a su registro en `validacion/`, como los del 9 de octubre, y el modelo se ajusta en el momento.

- **Quién:** Efraín Mariotte (medida) y Claude (análisis).
- **Instrumento:** UNI-T UT33B+. En voltios DC: ±(0,5 % de la lectura + 2 dígitos); en la escala de 20 V, 1 dígito = 0,01 V. Corriente: borne de 10 A (resolución de 10 mA).
- **Criterios:** ±5 % en voltaje y ±10 % en corriente, respecto de la medida (más la incertidumbre del instrumento).
- **Kit:** shield L293D Rev4, motores TT amarillos, LiPo 2S, probador de celdas, SG90 y MG90S.

## Seguridad (leer antes de empezar)

1. **Después de cada medida de corriente, devuelve la punta roja al borne de voltios (V).** Si mides el voltaje de la LiPo con la punta en el borne de 10 A, haces un corto directo a la batería.
2. Las corrientes de motores y servos se miden en el borne y la escala de **10 A**.
3. Motor bloqueado: **1 s como máximo**. Servo bloqueado: 2 s como máximo.
4. Nada metálico suelto cerca de EXT_PWR ni de los bornes. La LiPo se desconecta antes de tocar cables.

## Orden de la sesión

| # | Prueba | Ejemplo de TecnoBloques | ¿Hecha? |
|---|---|---|---|
| 1 | Continuidad de la shield suelta | (sin programa) | |
| 2 | Probador de celdas y estado de la LiPo | «Validar: probador de celdas LiPo» | |
| 3 | Carro con la shield L293D | «Validar: carro con la shield L293D» | |
| 4 | 5 y 6 SG90 en el USB | «Validar: seis servos en el USB» | |
| 5 | MG90S | «Validar: servo 0°, 90° y 180°» y «servo en barrido continuo» | |

---

## 1. Continuidad de la shield (suelta, sin Uno ni batería)

Multímetro en continuidad. La pata 1 de cada integrado está a la izquierda de la muesca, y se cuenta en U. Lo que tiene que coincidir con AFMotor_R4 es **qué pin del Uno y qué salida del 74HC595 maneja cada motor**. El número de pata puede variar según el fabricante, y eso está bien.

**Identificación:** ¿cuál L293D lleva M1/M2 (U1) y cuál M3/M4 (U2)? Anota su posición en la placa: _M1/M2 estan en el microcontrolador de la izquierda en el dibujo cerca de M1 y M2  y U2 esta a la derecha igual que en el dibujo, la pata 3 del U1 va al primer tornillo de la bornera, lado izquierdo de U1 es M1, lado derecho es M2, la pata 6 de U1 va al segundo tornillo de la bornera, pata 11 de U1 va a el ultimo tornillo de la bornera y la pata 14 va al penultimo tornillo de bornera izquierda.

para U2 la pata 3 de U2 va al primer Tornillo, pata 6 al segundo tornillo, pata 16 al 4to tornillo y pata 11 al ultimo tornillo_____________

### 74HC595 (U3)

| Desde | Pata esperada | ¿Pita? / pata real |
|---|---|---|
| D8 (datos) | 14 |si| 14
| D4 (reloj) | 11 | si| 11
| D12 (cierre) | 12 | si | 12
| D7 (habilita) | 13 |si |13
| 5V | 10 y 16 |si | 10 y 16
| GND | 8 |si | 8

### Salidas del 74HC595 a los L293D

| Salida (pata del 595) | Controla | Llega a (esperado) | Real |
|---|---|---|---|
| Q0 (15) | M4 A | U2, pata 10 |u2 pata 2 |
| Q1 (1) | M2 A | U1, pata 10 | u1 pata 15|
| Q2 (2) | M1 A | U1, pata 2 |U1, pata 2 |
| Q3 (3) | M1 B | U1, pata 7 | U1, pata 7|
| Q4 (4) | M2 B | U1, pata 15 |u1 pata 10 |
| Q5 (5) | M3 A | U2, pata 2 | u2 pata 15 |
| Q6 (6) | M4 B | U2, pata 15 |u2 pata 6 |
| Q7 (7) | M3 B | U2, pata 7 | u2 pata 10|

### PWM (habilitación de cada canal)

| Pin del Uno | Motor | Llega a (esperado) | Real |
|---|---|---|---|
| D11 | M1 | U1, pata 1 | U1, pata 1 |
| D3 | M2 | U1, pata 9 |u1 pata 9 |
| D6 | M3 | U2, pata 1 |U2 pata 9 |
| D5 | M4 | U2, pata 9 |U2 pata 1 |

### Bornes

| Borne | Llega a (esperado) | Real |
|---|---|---|
| M1 A / M1 B | U1, patas 3 / 6 | U1, patas 3 / 6|
| M2 A / M2 B | U1, patas 11 / 14 | U1, patas 14 / 11 |
| M3 A / M3 B | U2, patas 3 / 6 |U2, patas 3 / 6 |
| M4 A / M4 B | U2, patas 11 / 14 | U2, patas 11 / 14|
| EXT_PWR + | pata 8 de U1 y de U2 | pata 8 de U1 y de U2|
| GND (bornera central, EXT_PWR −) | patas 4, 5, 12 y 13; todos los GND entre sí |patas 4, 5, 12 y 13; todos los GND entre sí |

### Servos, headers analógicos, puente y LED (pendientes del 14 oct)

| Qué | Esperado | Real |
|---|---|---|
| SERVO_1, señal | D10 | D10|
| SERVO_2, señal | D9 | D9|
| Orden de los pines del servo (desde el borde) | − + S (según la foto) |− + S |
| Fila A0-5 | cada pin a su A0…A5 | cada pin a su A0…A5|
| Fila +5 | los seis al 5V |los seis al 5V |
| Fila Gnd | los seis a GND | los seis a GND|
| Separación entre filas (regla) | 3,03 mm en la foto; el simulador usa 2,54 (decisión del 14 oct) | 2.54mm, tiene juego los pines y se pueden correr|
| Puente PWR | une EXT_PWR + con el VIN del Uno |une EXT_PWR + con el VIN del Uno |
| LED1 | entre EXT_PWR + (con resistencia) y GND; anota el valor de la resistencia | 985 ohms|

---

## 2. Probador de celdas y estado de la LiPo

Se hace antes del carro para saber cómo está la batería: el simulador tiene tres estados (llena 8,4 V, nominal 7,4 V, descargada 6,4 V).

| Qué | Simulador | Real |
|---|---|---|
| Secuencia de la pantalla | total → «2S» → «-1-» → celda 1 → «-2-» → celda 2, y se repite | nCS(donde n es el número de celdas) → All → voltage total → «2S» → «-1-» → celda 1 → «-2-» → celda 2, y se repite|
| Duración de cada cosa | 0,8 s | 1 s|
| Umbral de la alarma, de fábrica | 3,3 V | 3,3v|
| Cómo se cambia el umbral con el botón | 0 (apagada), 2,7 … 3,8 V, de 0,1 en 0,1 | 0 (apagada), 2,7 … 3,8 V, de 0,1 en 0,1|

| Celda (balance: negro al medio, medio al rojo) | Probador | Multímetro |
|---|---|---|
| Celda 1 |3,86 |3,90 |
| Celda 2 | 3,70| 3,74|
| Total (cable de potencia) |7.56 | 7,64|

**Estado de la LiPo para el resto de la sesión:** llena / nominal / descargada → nominal

---

## 3. Carro con la shield L293D

Programa: M1 y M4 **2 s adelante a 200**, 1 s quietos, **2 s atrás a 255**, 1 s quietos. Motor izquierdo en M1 y derecho en M4, **cableados igual (rojo en A)**, la LiPo en EXT_PWR y el puente PWR puesto. Las ruedas van en el aire.

El multímetro es lento: lee el valor estable de la mitad de cada tramo de 2 s. Con PWM (a 200), el multímetro da el **promedio**, que es lo mismo que calcula el simulador.

### Voltajes

| Medida | Llena (8,4) | Nominal (7,4) | Descargada (6,4) | Real |
|---|---|---|---|---|
| Batería, quieta (EXT_PWR) | 8,40 V | 7,40 V | 6,40 V | 7,63|
| Batería, motores a 255 | 8,38 V | 7,38 V | 6,39 V |7,22 |
| Entre los bornes de M1, adelante 200 | 5,36 V | 4,59 V | 3,83 V | 5,36|
| Entre los bornes de M1, atrás 255 | 6,81 V | 5,84 V | 4,87 V | 5,79|
| **Caída del L293D a 255** (batería − M1) | 1,57 V | 1,55 V | 1,52 V |1,47|

### Motor sin carga (rueda en el aire)

| Medida | Llena | Nominal | Descargada | Real |
|---|---|---|---|---|
| Corriente de M1, adelante 200 | 131 mA | 113 mA | 94 mA | 120mA|
| Corriente de M1, atrás 255 | 170 mA | 146 mA | 122 mA | 130 mA|
| RPM a 200 (vueltas en 2 s × 30, o cámara lenta) | 179 | 153 | 128 | 160|
| RPM a 255 | 227 | 195 | 162 | 185|

Para contar las RPM, pega una cinta en la rueda y graba con el celular en cámara lenta. En 2 s a 227 RPM la rueda da unas 7,6 vueltas.

### Motor bloqueado (rueda frenada con la mano, 1 s como máximo, a 255)

| Medida | Llena | Nominal | Descargada | Real |
|---|---|---|---|---|
| Corriente | 1,16 A | 0,99 A | 0,83 A |0,900 A |

Cálculo con el mismo modelo, porque el simulador no tiene opción de bloquear la rueda: bobinado de 5 Ω (6 V / 1,2 A), caída del L293D de 1,4 V + 1 V/A y LiPo de 0,05 Ω. Está por encima de los 0,6 A continuos por canal del L293D: en el simulador avisa a los 0,5 s.

### Sentido de giro (FORWARD, cableados igual)

| Rueda | Simulador | Real |
|---|---|---|
| Izquierda (M1) | hacia adelante | hacia adelante|
| Derecha (M4) | hacia atrás (hay que invertir sus cables) | hacia adelante|

### ¿Se reinicia el Uno?

| Qué | Simulador | Real |
|---|---|---|
| Monitor serial | «Carro listo», «adelante 200», «quieto», «atras 255», sin repetir «Carro listo» | Carro listo, adelante 200, quieto, atras 255, quieto|
| LED de la shield (PWR) | encendido con la batería | encendido con la bateria|

---

## 4. Servos en el USB (5 y 6 SG90)

«Validar: seis servos en el USB». Para 5, desconecta uno. Todos se alimentan del 5V de la placa, en el PC del aula y con el cable del kit. Mira si el monitor serial repite «Inicio».

| Servos | Simulador | Real |
|---|---|---|
| 4 SG90 (medido el 9 oct: no se reinicia) | no se reinicia; 5V promedio 4,42 V | ya medido |
| 5 SG90 | **se reinicia** (21 veces en 8 s); el 5V cae a 2,49 V al arrancar |4,12 V |
| 6 SG90 | **se reinicia** (22 veces en 8 s); el 5V cae a 2,26 V | 4,03v|
| 5V con el multímetro, 5 SG90 (si no se reinicia) | — | |

Si con 5 no se reinicia, el umbral de reinicio (2,7 V) o el pico de arranque están exagerados y hay que ajustarlos.

---

## 5. MG90S

Hoy el simulador usa la hoja de datos: 10 mA quieto, 250 mA a fondo y 700 mA bloqueado (`MODELOS_SERVO` en `src/piezas/servo.js`). En el barrido continuo empuja en proporción a lo que le falta, como el SG90: por eso da menos que los 250 mA de un movimiento a fondo.

| Medida | Simulador | Real |
|---|---|---|
| Quieto | 10 mA | |
| Barrido continuo (`servo_continuo`, promedio) | 117 mA (el SG90 da 97; medido ~100) | |
| Bloqueado (≤ 2 s) | 700 mA | |
| Ángulos con write(0) / write(90) / write(180) (transportador) | 7° / 90° / 175° (usa la calibración del SG90) | |
| Opcional: 4 MG90S en el USB | **se reinicia** (21 veces en 8 s) | |

Ojo: con los datos de la hoja, el simulador predice que **4 MG90S ya reinician** el Uno por USB. Si en la placa real no pasa, este es un buen dato para ajustar el modelo.

---

## De dónde salen las predicciones

Núcleo en Node (`pruebas/nucleo.cjs`, construido desde `2acf2b6`), modo realista (`caidaL293D`, `limiteUSB`, `danoComponentes`, `limitePin`):

- **Carro:** `carro_motores.hex`, el circuito de `pruebas/probar_potencia.js` con las tres cargas; fotos a 1,8 s (adelante 200), 2,9 s (quieto) y 4,8 s (atrás 255).
- **Servos:** `servos_cuatro.hex` con 4, 5 y 6 servos en el 5V (pines 9, 6, 5, 3, 9, 6), 8 s, `limiteUSB`; promedio del 5V después del primer segundo.
- **MG90S en barrido:** `servo_continuo.hex` con un servo en D9, promedio de 2 a 8 s.
- **Motor bloqueado:** cálculo a mano con las constantes de `MOTOR_TT`, `SHIELD` y `LIPO`.
