# Continuidad de la shield L293D del kit (tarea T3)

- **Fecha:** 15 de octubre de 2026, en la TecnoAcademia Tolima.
- **Quién:** Efraín Mariotte (medida) y Claude (análisis).
- **Instrumento:** multímetro UNI-T UT33B+ en continuidad.
- **Pieza:** shield L293D Rev4 del kit, suelta (sin Uno ni batería).
- **Hoja original:** `2026-10-15-hoja-laboratorio-t3.md`, sección 1.

## Resultado

**Lo que importa para el simulador coincide:** cada motor lo manejan el pin de PWM y las dos salidas del 74HC595 que usa AFMotor_R4 (M1 = D11, Q2/Q3; M2 = D3, Q1/Q4; M3 = D6, Q5/Q7; M4 = D5, Q0/Q6). `CONEXIONES_SHIELD` no cambia.

**Lo que no coincidía era la netlist de KiCad** (`SHIELD_KICAD`): qué canal de cada L293D lleva cada motor.

## Medidas

### 74HC595 (U3): todo como se esperaba

D8 → 14, D4 → 11, D12 → 12, D7 → 13, 5V → 10 y 16, GND → 8.

### Cada motor, de punta a punta

| Motor | PWM → habilitación | A: salida del 595 → entrada → salida | B: salida del 595 → entrada → salida | Tornillos |
|---|---|---|---|---|
| M1 | D11 → U1.1 | Q2 → U1.2 → U1.3 | Q3 → U1.7 → U1.6 | 1.º y 2.º del bloque izquierdo |
| M2 | D3 → U1.9 | Q1 → **U1.15 → U1.14** | Q4 → **U1.10 → U1.11** | 4.º y 5.º del bloque izquierdo |
| M3 | D6 → **U2.9** | Q5 → **U2.15 → U2.14** | Q7 → **U2.10 → U2.11** | 4.º y 5.º del bloque derecho |
| M4 | D5 → **U2.1** | Q0 → **U2.2 → U2.3** | Q6 → **U2.7 → U2.6** | 1.º y 2.º del bloque derecho |

En negrita, lo que difería de la tabla anterior: M4 va por la primera mitad de U2 y M3 por la segunda, y en el segundo motor de cada L293D la A entra por la pata 15 y la B por la 10. En la hoja quedaron dos datos mal anotados, que Efraín corrigió después: Q6 llega a la pata 7 de U2 (no a la 6, que es una salida) y M3 sale por las patas 11 y 14 de U2.

### Potencia, servos, headers, puente y LED

| Qué | Medido |
|---|---|
| EXT_PWR + | pata 8 de U1 y de U2 |
| GND | patas 4, 5, 12 y 13; todos los GND unidos |
| SERVO_1 / SERVO_2, señal | D10 / D9 |
| Orden de los pines del servo, desde el borde | − + S (como el dibujo) |
| Filas A0-5 / +5 / Gnd | cada pin a su A0…A5 / los seis al 5V / los seis a GND |
| Separación entre filas | **2,54 mm** (los pines tienen juego): confirma la decisión del 14 oct |
| Puente PWR | une EXT_PWR + con el VIN del Uno |
| Resistencia del LED1 | 985 Ω (en la netlist, 1 kΩ) |

## Cambios

- `src/kicad.js`: `l293d()` pone la A del segundo motor en las patas 15/14 y la B en las 10/11; U2 es `l293d(4, 3)` («M4 y M3»).
- `pruebas/probar_kicad.js`: la tabla de canales es la medida.
- TecnoDiseñador puede pasar las filas analógicas a 2,54 mm, como ya estaba decidido.
