# Cinco y seis SG90 en el USB del Nano (tarea T3)

- **Fecha:** 15 de octubre de 2026, en la TecnoAcademia Tolima.
- **Quién:** Efraín Mariotte (medida) y Claude (análisis).
- **Instrumento:** UNI-T UT33B+ en voltios DC, entre 5V y GND.
- **Montaje:** **Nano con su expansión** (no el Uno), alimentado solo por el cable USB; los SG90 en el 5V de la expansión, moviéndose libres (sin bloquear).
- **Programa:** «Validar: seis servos en el USB» (`servos_cuatro`: saltan juntos de 0° a 180° cada 0,7 s; los servos 5 y 6 comparten señal con el 1 y el 2).
- **Hoja original:** `2026-10-15-hoja-laboratorio-t3.md`, sección 4.

## Medidas

| Servos | 5V real (promedio del multímetro) | ¿Se reinicia? (real) | Simulador Nano: 5V promedio | Simulador Nano: ¿se reinicia? |
|---|---|---|---|---|
| 5 SG90 | **4,12 V** | no («Inicio» una sola vez) | 4,87 V | no |
| 6 SG90 | **4,03 V** | no | 4,85 V | no |

## Análisis

1. **El reinicio coincide (no se reinicia), pero el voltaje no:** el Nano del simulador baja unos 0,15 V y el real, cerca de 1 V (−15 %, fuera del criterio). La alimentación de referencia del Nano (`alimentacion_nano.js`) no tiene la resistencia del USB.
2. **El modelo del USB del Uno sí lo explica.** Con 5,11 V − 1,66 Ω (`USB` en `src/energia.js`, medido el 9 oct) y unos 115 mA por SG90 en este programa, da 4,16 V con 5 y 3,96 V con 6. Las diferencias son de 1 y 2 %.
3. **El arranque no reinició el Nano, ni con 6.** El simulador del Uno predice reinicio desde 5 SG90, porque el 5V cae a 2,5 V en el arranque. Si el Nano real, con un USB parecido, aguanta 6, puede que el golpe de arranque del modelo esté exagerado. Por ejemplo, porque no cuenta los condensadores de la placa.

## Decisión pendiente

No se cambió el modelo. Si el Nano recibe el modelo del USB del Uno tal como está, predecirá reinicios que el Nano real no tuvo. **Para decidir:** repetir 5 y 6 SG90 con el **Uno** (el experimento original) y medir el 5V del Nano sin servos y con 1 a 4. Con eso se ajustan juntos la resistencia del USB del Nano y el golpe de arranque.

El MG90S quedó suspendido: hay solo 4 en el laboratorio.
