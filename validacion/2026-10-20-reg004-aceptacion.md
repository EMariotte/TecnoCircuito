# La historia del registro, contrastada por Efraín (REG-004)

- **Fecha:** 20 de octubre de 2026.
- **Quién:** Efraín Mariotte (trabajó en la app y contrastó la historia) y Claude (guía, lectura y registro).
- **Qué se probó:** TecnoBloques 0.3.0 en `86433d1` con el simulador local (`node build.js --simulador-local`), TecnoCircuito en `56baf57`. El lector `herramientas/historia-registro.js` de TecnoBloques (COMO-FUNCIONA, sección 68) sobre los registros que dejó la app.
- **Tipo de validación:** **de uso** (aceptación humana de REG-004). Datos de prueba: los códigos de equipo `PRUEBA-01` y `PRUEBA-02`, sin aprendices ni nombres. No es una medida eléctrica.

## Recorrido

1. El instructor crea el PIN (Ctrl+Alt+Mayús+R), enciende el registro y el equipo escribe su código, `PRUEBA-01`.
2. Arma un parpadeo en el pin 13 con bloques; LED y resistencia de 220 Ω en el Uno (cambió la placa desde el Nano después de empezar). Corrida 1 sin fallas.
3. Quita la resistencia y conecta el LED directo a GND. Corrida 2: la app muestra «El LED led1 se quemó: le pasaron 65 mA y aguanta unos 20 mA…» y «El pin 13 entrega 65 mA y aguanta 40 mA…».
4. Vuelve a poner la resistencia, de 330 Ω. Corrida 3 sin fallas.
5. Cambia la espera de 500 a 200 ms. Corrida 4.
6. Simula y, sin detener, cambia el código del equipo a `PRUEBA-02` (corrida 5). Cierra la app.

## Resultado

| Punto | Historia | ¿Coincide? |
|---|---|---|
| Equipos y sesiones | PRUEBA-01 (6 min) y PRUEBA-02 (28 s, sin corridas) | Sí |
| Corridas | 5 de PRUEBA-01 | Sí |
| Fallas | Corrida 2: LED quemado (led1) y corriente del pin (placa.D13), 64,7 mA | Sí, las mismas de la pantalla |
| Correcciones | Corrida 3: «Corrigió: LED quemado (led1), corriente del pin (placa.D13)» | Sí |
| Cambios del circuito | quitó r1 y conectó el LED a GND; después agregó r1 con 330 Ω | Sí (contó lo que hizo, no lo que decía la guía) |
| Cambio de equipo en una corrida (AUD-04) | La corrida 5 se cierra en el mismo milisegundo que la sesión de PRUEBA-01 | Sí |
| Avisos de integridad | Ninguno | Sí |
| **Placa** | «nano» en el encabezado; las corridas, con el Uno | **No**: el cambio de placa no quedaba en el registro |
| **Cambio del programa** | «Bloques: 8 (5 tipos)», igual que antes | **No**: no se veía `delay(500)` → `delay(200)` |
| **Ruido** | Líneas de bloques repetidas, «1 tipos», pasos intermedios del circuito | Se entiende, pero cuesta leerlo |

## Decisiones de Efraín y corrección

- **Placa:** evento nuevo del editor `placa_cambiada` `{de, a}`, cambio aditivo del contrato 1 (sección 6.1). El lector lo narra y avisa si una corrida usa otra placa que la elegida.
- **Programa y ruido:** el lector muestra la diferencia del C++ entre compilaciones, junta los bloques seguidos y dice el estado final de cada pieza.

Con la corrección, los mismos dos archivos se leen así (extracto):

```
Equipo PRUEBA-01 · 20 de oct de 2026, 10:59 a 11:04 · nano → uno, nivel 2
  10:59  Bloques: 8 (5 tipos).
  11:00  Circuito: agregó r1 (resistencia), led1 (led); cambió r1: giro 90°, enchufado en 2→placa.GND1; led1: color azul, …
  11:01  ▶ Corrida 1 (uno, realista; 2 piezas, 1 cable).
  11:01  Compiló: bien, 924 bytes (el mismo programa).
  11:03  Bloques: los mismos 8 (cambió valores o posiciones).
  11:03  Compiló: bien, 922 bytes. Programa: `delay(500);` → `delay(200);` (2 veces).
  ⚠ La corrida 1 simula con uno, pero la placa elegida era nano: falta un placa_cambiada.
```

El aviso es correcto: ese registro se hizo antes del evento nuevo. Con la app corregida, el cambio sale como «Cambió la placa: nano → uno.» (prueba `test:historia`, caso «la prueba de Efraín»; `test:registro-app` lo comprueba en Electron).

## Segunda prueba, con la app corregida (20 oct, 11:31 a 11:33)

Equipo `PRUEBA-03`. Efraín cambió la placa a Nano y de vuelta a Uno, ajustó la resistencia varias veces (también durante una corrida), quemó el LED quitándola y la volvió a poner. No cambió los bloques: las tres compilaciones son el mismo programa.

```
Equipo PRUEBA-03 · 20 de oct de 2026, 11:31 a 11:33 · uno → nano → uno, nivel 2
  11:31  Cambió la placa: uno → nano.
  11:31  Cambió la placa: nano → uno.
  11:31  ▶ Corrida 1 (uno, realista; 2 piezas, 1 cable).
  11:31  Circuito: cambió r1: ohmios 330.
  11:32  Compiló: bien, 922 bytes (el mismo programa).
  11:32  ■ Corrida 2 terminó: … Fallas: LED quemado (led1), corriente del pin (placa.D13). …
  11:33  ■ Corrida 3 terminó: … Sin fallas. Corrigió: LED quemado (led1), corriente del pin (placa.D13).
  Avisos: ninguno.
```

| Punto | ¿Coincide? |
|---|---|
| Cambios de placa, en su momento, y la placa de cada corrida | Sí |
| Cinco cambios de la resistencia durante la corrida 1, contados como su valor final (330 Ω) | Sí |
| «El mismo programa» en las tres compilaciones | Sí: Efraín no cambió bloques |
| Fallas, corrección y resumen | Sí, sin avisos |

La diferencia del programa no se probó en esta sesión. Quedó comprobada con los registros reales de la primera (`delay(500);` → `delay(200);` (2 veces), leídos con el lector corregido) y en `test:historia`.

**Aceptación de Efraín: la historia sirve y coincide con lo que hizo** (20 oct). Falta la verificación de Codex de la corrección.

## Después: el lector rehecho por capas (20 oct)

Las verificaciones de Codex (R3, R4, R4a, R4b) y su auditoría integral llevaron a rehacer el lector (COMO-FUNCIONA, sección 68). Efraín decidió:
1. «El mismo programa» solo si el C++ registrado es idéntico; si solo cambian espacios o saltos, «cambió solo en espacios o saltos de línea».
2. «Corrigió» solo entre corridas comparables (mismo modo, mismas no idealidades, misma placa, la pieza sigue y sin huecos); si no, «ya no se observó» con el motivo, o «no se compara».
3. La línea de comandos siempre muestra la historia y sale con 1 si hay problemas.
4. Primero el lector; después AUD-07/08 y REG-005.
5. **Una prueba corta más de Efraín**, porque las palabras nuevas cambian lo que se lee.

Leídos con el lector nuevo, los registros de las dos pruebas dicen lo mismo que antes, con la frase nueva de los bloques («cambió algo dentro de los mismos 8 (misma cantidad y mismos tipos)»).

## Prueba final, con el lector nuevo (20 oct, 13:19 a 13:21)

Equipo `PRUEBA-04`. Efraín quemó el LED quitando la resistencia, la volvió a poner (y la cambió varias veces durante la corrida), cambió el programa de 200 a 500 ms y al final cambió la placa a Nano.

| Punto | ¿Coincide? |
|---|---|
| Corrida 2: «Corrigió: LED quemado (led1), corriente del pin (placa.D13)» | Sí: misma placa, mismo modo y el LED seguía |
| «Programa: `delay(200);` → `delay(500);` (2 veces)» | Sí |
| «Cambió la placa: uno → nano.» y la corrida 4 en el Nano | Sí |
| «Compiló: bien, 1158 bytes (el mismo programa)» en el Nano | Sí: el texto es idéntico; el tamaño cambia con la placa |
| Avisos | Ninguno |
| **Resumen** | **No**: decía «Corregidas al final: ninguna. Ya no se observaron al final: … (cambió la placa: uno → nano)» y escondía la corrección de la corrida 2 |

**Corrección:** una falla es «corregida al final» si alguna corrida posterior a la última que la vio es comparable con ella y no hay huecos hasta el final. Con eso, el mismo registro dice «Corregidas al final: LED quemado (led1), corriente del pin (placa.D13). Sin corregir: ninguna.», que es lo que pasó. Regresión en `test:historia` (95 OK).

**Aceptación final de Efraín (20 oct): acepta la historia con el resumen corregido.** Queda la verificación de Codex del software.
