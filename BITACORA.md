# BITÁCORA — TecnoCircuito

> Historial cronológico del proyecto. **Append-only:** se agregan entradas al final y nunca se editan ni se borran las pasadas.
> El estado actual está en [`CLAUDE.md`](CLAUDE.md). El contrato con TecnoBloques está en [`CONTRATO.md`](CONTRATO.md).

---

## 2026-10-06 — Primer barrido del estado del arte

Efraín y Claude exploran la idea de un simulador de circuitos con microcontrolador integrado a TecnoBloques, al estilo de Tinkercad o Wokwi, para que los aprendices documenten y simulen sus montajes.

- **Herramientas revisadas:** Tinkercad Circuits, Wokwi, SimulIDE, PICSimLab, Fritzing con su simulador, Falstad CircuitJS1, Edrys y ElectroBlocks. Simular un Arduino no es novedad, así que el simulador es desarrollo tecnológico.
- **Base técnica elegida:** avr8js (MIT) para ejecutar el `.hex` y @wokwi/elements (MIT) para los dibujos, más un solucionador eléctrico propio (MNA con Newton-Raphson).
- **Descartado:** Falstad CircuitJS1, porque es GPL-2.0-or-later y obligaría a cambiar la licencia.
- **Simulación híbrida:** eléctrica real para lo básico y lógica por protocolo para los módulos.
- **Etapas 0 a 4** estimadas: primera versión útil en 7 a 10 semanas; todos los bloques en 5 a 6 meses; con robots, 7 a 8 meses.
- El documento de trabajo quedó en `investigacion/` (privado).

## 2026-10-07 — Viabilidad, cronograma y proyecto independiente

**Evaluación de viabilidad:** la idea es viable. La parte técnica tiene un camino probado (Wokwi está hecho sobre avr8js y @wokwi/elements) y la integración con TecnoBloques es directa, porque su app ya compila con una carpeta propia donde queda el `.hex`.

**Decisiones de Efraín:**

- **Cronograma en dos tiempos:** de octubre a diciembre de 2026 se construye y valida la parte técnica; en 2027 se usa en el aula.
- **Las tareas mandan:** en 2026 solo se construye lo que piden tres tareas (LED y botón; potenciómetro y brillo; motor y servo con la shield L293D). Eso es la etapa 0, la etapa 1 y una etapa 3 reducida. Los módulos pasan a 2027.
- **Proyecto independiente:** repositorio propio (`EMariotte/TecnoCircuito`), con su `CLAUDE.md` y su bitácora, en la carpeta hermana de TecnoBloques.

**Contrato 1 (borrador)** en `CONTRATO.md`:

- paquete IIFE `window.TecnoCircuito`, commiteado en cada etiqueta y embebido por `build.js` de TecnoBloques;
- mismas claves de placa (`uno`, `nano`, `nano_old`, `mega`);
- el circuito va en el campo `circuito` del `.tbq.json`, y TecnoBloques lo guarda sin interpretarlo;
- el `.hex` llega por un IPC nuevo de TecnoBloques;
- el paquete emite eventos y TecnoBloques los escribe en disco;
- modo realista o ideal, con ajustes por no idealidad.

**Mecanismo de sincronización:** número de contrato revisado al arrancar, etiqueta fija, pruebas de contrato en los dos lados con fixtures commiteadas, scripts para trabajar con la copia local e instalador de TecnoBloques que se niega a empaquetar un simulador que no sea de una etiqueta.

**Hallazgo en TecnoBloques:** `proyectoActual()` arma el proyecto campo por campo, así que hoy borraría el circuito al guardar. Es el primer pendiente del lado de TecnoBloques.

En TecnoBloques quedó registrado en el commit `3c101bc` («docs: proyecto hermano TecnoCircuito iniciado»).

**Siguiente:** mover esta carpeta a `Proyectos Tecno\TecnoCircuito`, crear el repositorio y empezar la etapa 0 (ver «Primera sesión» en `CLAUDE.md`).

## 2026-10-07 — Prototipo 0: cableado sin simulación

**Decisión de Efraín:** antes de crear el repositorio se valida la viabilidad con prototipos. El primero arma una placa, una resistencia y un LED, solo con el cableado y sin simulación eléctrica.

- **Qué es:** la carpeta `prototipo/`, con @wokwi/elements 1.9.2 y esbuild 0.28.2. Sigue la API `crearLienzo` del contrato 1 y se empaqueta en un solo archivo (`dist/prototipo.html`) que funciona sin internet. El paquete pesa 69 KB.
- **Qué hace:**
  - cables con dobleces que se enderezan solos cuando quedan casi rectos;
  - color por convención: negro a GND, rojo a 5 V y verde para señales;
  - piezas que se mueven, se giran y se borran, más zoom y rótulos de los pines en español;
  - el circuito en el formato 1 y los eventos del contrato, en un panel aparte.
- **Probado** con Playwright y Chromium: 40 comprobaciones con clics reales, sin errores en la consola, en tema claro, en tema oscuro y a 390 px de ancho.
- **Embeberlo en TecnoBloques es viable:** el paquete no contiene `<script` ni `</script`. Los `<!--` que trae son comentarios del dibujo SVG del Uno y no rompen el HTML.
- **Error encontrado y corregido:** cuando un doblez queda encima de otro cable, ese cable se llevaba el clic. Ahora los dobleces del cable elegido van en una capa propia, encima de todos los cables.

**Hallazgos para el contrato (propuestas, sin aplicar):**

- Un cable llega a un pin físico, así que los tres GND del Uno necesitan nombre propio (`GND1`, `GND2` y `GND3`). El ejemplo del contrato usa `placa.GND`.
- Los cables necesitan un campo opcional `puntos` con sus dobleces. Sin él, el dibujo del aprendiz se pierde al guardar.
- El formato no dice dónde está la placa. El prototipo la deja fija en el origen y mueve la vista.
- `crearLienzo` necesita su propio `alEvento`. Si no, los cableados que el aprendiz hace antes de simular no quedan registrados.
- Cambiar el color o los dobleces de un cable no emite eventos. Falta decidir si el estudio los necesita.
- En un celular, los pines quedan muy pequeños para tocarlos con el dedo si no se hace zoom.

## 2026-10-07 — Contrato 1: ajustes del prototipo 0

Efraín prueba el prototipo 0 y acepta las cuatro propuestas. Se aplican a `CONTRATO.md`. El contrato sigue en borrador, así que no sube el número.

- **Cada pin físico tiene nombre propio:** en el Uno, `GND1`, `GND2` y `GND3`, además de `SDA` y `SCL`, aparte de `A4` y `A5`. El ejemplo del contrato pasa a `placa.GND1`.
- **`puntos` opcionales en los cables:** son los dobleces, como pares `[x, y]` desde `de` hasta `a`.
- **Placa fija en el origen:** su esquina superior izquierda es (0, 0) y no se mueve. Se definen las coordenadas (0,1 pulgadas = 9,6 px, con la `y` hacia abajo) y el giro (alrededor del centro, en el sentido del reloj).
- **`crearLienzo` recibe `alEvento`:** emite los eventos del cableado aunque nunca se simule. Los de la simulación siguen saliendo por el `alEvento` de `crearSimulador`.
- **Sigue abierto:** si cambiar el color o los dobleces de un cable debe emitir eventos.

**Error corregido en el prototipo:** la resistencia se veía corrida respecto a sus cables, unos 2,7 px hacia abajo. El prototipo ponía `display: block` en los dibujos, y eso dejaba el SVG dentro de una línea de texto. Con `display: flex` cada dibujo ocupa justo su espacio. La prueba principal ahora mide ese desfase en las tres piezas.

## 2026-10-07 — Prototipo 1: chip con avr8js y reloj común

Con el visto bueno de Efraín, el prototipo pasa del cableado a ejecutar programas reales. Todavía no hay cálculo eléctrico.

- **Qué hace:**
  - avr8js 0.21.1 ejecuta el `.hex` de dos programas compilados con el arduino-cli del Arduino IDE: parpadeo en D13 cada 0,5 s y en D8 cada 0,2 s;
  - una **regla de conexiones** decide si el LED prende: el ánodo tiene que llegar a un nodo en ALTO y el cátodo a uno en BAJO, y la resistencia cuenta como un simple paso;
  - el LED «L» de la placa sigue a D13, y el monitor serial muestra lo que imprime el programa;
  - se puede recablear con la simulación andando.
- **Contrato:** `crearSimulador` con `iniciar`, `pausar`, `reiniciar`, `detener`, `serialEnviar`, `alSerial`, `alFalla` y `alEstado`. Emite los eventos `simulacion_iniciada` y `simulacion_detenida`.
- **Reloj común:** en cada cuadro de pantalla el chip avanza el tiempo real transcurrido, con un tope de 12 ms de cálculo por cuadro. Si el PC no alcanza, la simulación va más lenta en vez de congelar la página.
- **Probado:**
  - 18 comprobaciones nuevas en Chromium, que suman 59 en total;
  - el LED cambia cada 492 ms en promedio, frente a los 500 ms del programa;
  - sin el cable a GND no prende, y con el programa del pin 8 solo parpadea si el cable va al pin 8;
  - un `.hex` dañado se rechaza con un mensaje claro.
- **Exactitud del chip,** medida con Node: 1000,171 ms de período para un programa de 1000 ms (0,017 % de error).
- **Riesgo medido:** el chip corre solo 1,7 veces más rápido que el real en el PC de Efraín. Alcanza para el parpadeo (100 % de velocidad en el navegador), pero deja poco margen para el solucionador eléctrico y el PWM. Hay que medirlo en un PC del aula.
- **Periféricos de avr8js 0.21.1:** todos los del ATmega328P (temporizadores 0 a 2, ADC, USART, SPI, TWI, EEPROM, watchdog). Para la Mega faltan los temporizadores 3, 4 y 5.
- **Hallazgo:** las salidas de prueba de TecnoBloques no dejan `.hex`, así que el prototipo compila sus propios programas con `npm run compilar`.

## 2026-10-07 — Prototipo 1: el circuito se resuelve solo cuando cambia un pin

Lo decidió Efraín, porque los PC del aula son más lentos que el suyo.

- **Cómo funciona:**
  - un cambio de pin solo marca «pendiente»;
  - al final del cuadro el circuito se evalúa una vez, aunque hayan cambiado varios pines;
  - los nodos se calculan una vez y solo se rehacen cuando el aprendiz recablea.
- **Medido:** con el parpadeo, el circuito se evaluó 8 veces en 3,3 s, en vez de unas 197 (una por cuadro).
- **Visto al probar:** con la página ocupada (el script de prueba muestrea el LED cada 20 ms en el mismo hilo), la velocidad bajó a 96 %. Confirma que el chip y la interfaz compiten por el hilo principal. La prueba ahora acepta entre 90 % y 105 % y muestra siempre la cifra real.
- **Pendiente de decidir:** el Web Worker y el promedio del PWM, que se explicaron a Efraín.

## 2026-10-07 — Prototipo 2: circuito eléctrico con MNA y Newton-Raphson

Con el visto bueno de Efraín, la regla de conexiones del prototipo 1 se reemplaza por un solucionador eléctrico propio.

- **Motor** (`src/motor/`, sin DOM, probado con Node):
  - `mna.js` arma A·x = b (análisis nodal modificado), lo resuelve con Gauss con pivoteo y aplica Newton-Raphson a los diodos, limitando el salto del voltaje de la unión (como pnjlim de SPICE) y con gmin en cada nodo;
  - `red.js` traduce el circuito y los pines del chip a la red: pin en ALTO = 5 V con 25 Ω, en BAJO = 0 V con 22 Ω, entrada = abierto, pull-up = 5 V con 35 kΩ; LED = Shockley con n = 2, 5 Ω internos e Is calculado para su voltaje directo a 20 mA; 5V y 3V3 = fuentes ideales.
- **Fallas:**
  - LED quemado por encima de 30 mA: queda abierto hasta detener la simulación;
  - corriente del pin por encima de 40 mA;
  - resistencia de más de 0,25 W;
  - cortocircuito de 5V o 3V3 a GND.
  Salen por `alFalla` con un mensaje en español y como evento `falla`. El modo ideal las apaga.
- **Rendimiento:** una solución tarda unos 7 µs arrancando de la anterior y unos 50 µs desde cero. Además, se guarda la solución de cada combinación de pines. El circuito no compite con el chip por la velocidad.
- **Probado:**
  - 13 comprobaciones del motor con Node: divisor exacto, Kirchhoff, 2,000 V a 20 mA, LED al revés, pin en BAJO, cortocircuitos y convergencia en 60 casos (máximo 21 vueltas);
  - 14 en Chromium, que coinciden con Node al centésimo;
  - las 59 de los prototipos 0 y 1 siguen pasando, así que el total es 86.
- **Valores esperados** con el pin 13 en ALTO y LED rojo:
  - 220 Ω: 12,50 mA, LED a 1,938 V;
  - 330 Ω: 8,73 mA, LED a 1,901 V;
  - 1 kΩ: 3,10 mA, LED a 1,820 V.
  Se validan con el multímetro y el programa nuevo `programas/fijo13`.
- **Riesgo de Newton-Raphson con LED:** cerrado para la corriente continua. Sigue abierto para PWM y motores.

## 2026-10-07 — Cierre de la sesión: viabilidad técnica demostrada en prototipos

Efraín probó el prototipo 2 y confirmó que funciona como se diseñó. Se cumplió el objetivo de la sesión.

**Qué quedó demostrado**, con las piezas reales y en un solo archivo que funciona sin internet:

| Prototipo | Qué valida | Resultado |
|---|---|---|
| 0 · Cableado | @wokwi/elements, posición de los pines, API `crearLienzo`, formato del circuito, eventos y empaquetado IIFE | Funciona; cuatro ajustes aplicados al contrato 1 |
| 1 · Chip | avr8js con `.hex` reales, reloj común, monitor serial y API `crearSimulador` | Período exacto al 0,017 %; velocidad de 100 % en el navegador |
| 2 · Circuito eléctrico | MNA con Newton-Raphson, modelos de pin y LED, fallas y modo ideal | Converge siempre; 7 µs por solución; LED quemado y límite del pin funcionando |

**Pruebas:** 86 comprobaciones automáticas (`npm run probar` en `prototipo/`). La explicación completa, con diagramas, está en `prototipo/COMO-FUNCIONA.md`.

**Riesgos:**

- **Newton-Raphson con LED:** cerrado en corriente continua.
- **Rendimiento:** medido. El chip corre 1,7 veces más rápido que el real en el PC de Efraín, y los PC del aula son más lentos. Las salidas ya están explicadas: resolver solo cuando cambia un pin (aplicado), Web Worker y promedio del PWM (pendientes, para el prototipo 3).

**En pausa hasta tener las medidas del laboratorio:**

- el multímetro con 220, 330 y 1 kΩ, usando el programa `fijo13`;
- la velocidad en un PC del aula.

Con esas medidas se ajustan los modelos y se sigue con el prototipo 3. Todavía no hay repositorio, por decisión de Efraín. Los pasos para retomar están en la sección «Próxima sesión» de `CLAUDE.md`.

## 2026-10-07 — Contrato 1: formato del proyecto y fixtures (v0.2.5)

Anotado desde la sesión de TecnoBloques, con el mismo título en las dos bitácoras.

- **El `.hex` no va en el proyecto.** El simulador lo recibe en memoria: TecnoBloques compila al pulsar «Simular». Guardarlo haría que corriera un programa viejo después de cambiar un bloque.
- **Estándar de guardado:** el `.tbq.json` lleva el programa (bloques o C++ a mano), el `circuito` y `creadoCon`. Nueva sección 4.1 en `CONTRATO.md`.
- **TecnoBloques 0.2.5 conserva los campos que no conoce,** así que ninguna versión del aula borrará un circuito.
- **Fixtures listas del lado de TecnoBloques:** `test/salida/<caso>/<caso>.tbq.json` y `<caso>.hex` para los 16 casos. Falta `npm run fixtures` aquí para copiarlas a `pruebas/fixtures/`.

## 2026-10-07 — Velocidad en un PC del aula

**Medida de Efraín** con `prototipo/dist/prototipo.html` en otro computador del ambiente: **76 a 100 %** cuando está estable y **54 a 66 %** cuando el LED enciende o apaga.

**Diagnóstico (Claude, desde la sesión de TecnoBloques):** se repitió el parpadeo del pin 13 con el LED cableado, en Chrome con Playwright, frenando la CPU por software y tomando un perfil con el protocolo de depuración de Chrome.

| CPU | Velocidad promedio | Tiempo libre de la CPU |
|---|---|---|
| PC de Efraín, sin freno | 100 % | 54 % |
| Frenada ×2 | 61 % (de 54 a 73 %) | 20 % |
| Frenada ×3, sin cables | 44 % | 15 % |

- **El PC del aula se comporta como el de Efraín frenado a la mitad.**
- **El freno es la emulación del chip:** las funciones de avr8js se llevan casi todo el tiempo de cálculo. El circuito (MNA) y el dibujo (`_mostrar`) no llegan al 0,1 %.
- **Por qué no alcanza:** el chip necesita cerca de la mitad de un núcleo del PC de Efraín para ir en tiempo real. En un PC dos veces más lento necesitaría casi un núcleo completo, pero `paso()` solo se da 12 ms de cada cuadro de 16,7 ms (72 %) para no congelar la página.
- **La caída al cambiar el LED** no apareció en este PC. En el del aula puede venir de lo que la página hace en ese momento: el texto del serial, la lista de eventos, la tabla de mediciones y el redibujo del LED. Hay que confirmarlo allá.

**Qué significa:**

- **El programa corre bien, solo más lento.** Dentro del chip el tiempo es exacto al ciclo. A 60 %, un parpadeo de 1 s se ve de unos 1,7 s.
- **Para el estudio no hay sesgo:** las dos condiciones (realista e ideal) corren a la misma velocidad.
- **Pero en el aula se nota,** y con TecnoBloques abierto (Blockly en el mismo hilo) sería peor.

**Decisiones para el prototipo 3:**

1. **El Web Worker pasa de mejora a requisito.** En un hilo aparte, el chip puede usar el núcleo completo sin el tope de 12 ms y sin competir con Blockly ni con el dibujo.
2. **Meta medible:** ≥ 90 % estable en el PC del aula, con TecnoBloques abierto.
3. **Ideas por medir después del Worker,** solo si no alcanza: entregar el serial y las mediciones a la página en lotes, y adelantar el reloj durante `delay()` sin ejecutar cada instrucción (más arriesgado).
4. **Anotar el procesador y la RAM del PC del aula** (Configuración → Sistema → Información) para tener la referencia de las pruebas.

## 2026-10-07 — Prototipo 3: Web Worker, promedio del PWM y potenciómetro

**Precisión de Efraín sobre la medida del aula:** la velocidad no se queda en 54–66 %. Baja solo un instante cuando el LED cambia y vuelve; él no siente el cambio. Las decisiones de la entrada anterior se mantienen: el Web Worker sigue siendo requisito.

**Qué se hizo** (detalle en `prototipo/COMO-FUNCIONA.md`, secciones 25 a 30):

- **Web Worker:** el chip y el circuito corren en otro hilo. La página solo manda órdenes, recibe unas 60 «fotos» por segundo y dibuja. El Worker sale de un Blob con su código embebido, así el paquete sigue siendo un solo archivo. Si el navegador no deja crearlo, el mismo código corre en la página.
- **Núcleo sin página** (`src/nucleo.js`): chip, red eléctrica, fallas y promedio. Se prueba con Node.
- **Promedio del PWM:** el núcleo suma el tiempo de cada combinación de pines y promedia sus soluciones. Cada combinación se resuelve una sola vez. Las fallas usan el pico: un LED sin resistencia con PWM se quema igual.
- **Ventanas en períodos completos:** al principio el ciclo útil variaba hasta 3 puntos según dónde caía la foto. Ahora cada ventana se corta cuando los pines vuelven a la combinación del inicio, y el ciclo útil da exacto.
- **Potenciómetro y `analogRead()`:** pieza nueva con pines `GND`, `SIG` y `VCC` y props `ohmios` y `posicion`. El ADC de avr8js lee el voltaje promedio de A0–A5. La perilla se gira con el mouse sin mover la pieza, o con un deslizador en la barra.
- **Programas nuevos:** `pwm9`, `desvanecer9` y `potenciometro` (tarea T2), más el botón «Ejemplo con potenciómetro (T2)».

**Medidas** (portátil de Efraín **sin cargador**):

| Medida | Resultado |
|---|---|
| Ciclo útil de `analogWrite(9, 64)` | 25,10 % exacto |
| `analogRead(A0)` con la perilla en 0, 25, 50, 75 y 100 % | 0, 255, 511, 767 y 1023 |
| Página bloqueada 1,5 s | el chip siguió y avanzó unos 1250 ms (en la página, unos 50) |
| Simulador anterior frente al Worker, mismo PC y momento | 62 % frente a 78 % del tiempo real |

- **Hallazgo de la batería:** sin cargador, el chip pasó de 1,7 a unas 0,5 veces el real en Node. Por eso fallan las 3 pruebas de tiempo del prototipo 1. Una comparación con y sin el ADC, y otra del núcleo contra el chip solo, mostraron que el código nuevo no agrega costo.
- **Pruebas:** 128 comprobaciones; pasan 125. Las 3 que fallan son de tiempo y dependen del cargador.
- `VERSION` del paquete: `0.0.4-prototipo`.

**Siguiente:** medir el prototipo 3 en el PC del aula con cargador (meta ≥ 90 %), repetir `npm run probar` con cargador y validar con el multímetro.

## 2026-10-07 — Prototipo 2 validado con el multímetro

**Medidas de Efraín** en la placa real: pin 13 en ALTO → resistencia → LED rojo → GND. Midió las resistencias: 215 Ω (la de 220) y 326 Ω (la de 330). La de 1 kΩ se tomó nominal.

| Resistencia | Pin 13 | LED | Resistencia | Corriente |
|---|---|---|---|---|
| 215 Ω | +0,2 % | +0,5 % | −4,8 % | −4,8 % |
| 326 Ω | 0,0 % | +1,5 % | −0,3 % | −0,3 % |
| 1 kΩ | +0,8 % | +2,2 % | −0,1 % | −0,1 % |

Diferencia de la placa real frente al simulador, calculado con las resistencias medidas. La corriente real sale del voltaje de la resistencia dividido por su valor.

- **Las 12 cumplen el criterio** (±5 % en voltaje, ±10 % en corriente). **El modelo no se ajusta.**
- **El caso de 220 Ω no cierra en la placa:** 4,69 − 1,95 = 2,74 V deberían estar en la resistencia, pero se midieron 2,61 V. Faltan 0,13 V en los contactos de la protoboard o los cables. El simulador da 2,741 V.
- **El LED real baja un poco menos con poca corriente** (+2,2 % con 1 kΩ). Se puede afinar la curva si se repite con más LED.
- **Registro y regresión:** `validacion/2026-10-07-led-rojo-multimetro.md` y `validacion/led-rojo-multimetro.json`. `npm run probar:motor` compara el modelo con esas medidas en cada corrida (3 comprobaciones nuevas, 131 en total).
- **Para la próxima:** medir la corriente en serie, medir la resistencia de 1 kΩ y repetir el caso de 220 Ω directo en las patas de la resistencia.

## 2026-10-07 — Contrato 1: primera conexión con TecnoBloques

Anotado desde la sesión de TecnoBloques, con el mismo título en las dos bitácoras.

- **Con cargador** pasan las 131 comprobaciones del prototipo, también las de tiempo (parpadeo de 503 ms, velocidad de 100 %). Con las 2 nuevas del UTF-8 son 133.
- **Efraín validó en la práctica el PWM y la lectura analógica** del prototipo 3.
- **Primera conexión:** TecnoBloques embebe `dist/tecnocircuito.js` con `npm run app:simulador` (solo en desarrollo). Tiene una pestaña «Circuito» con el lienzo, un botón «Simular» que compila con arduino-cli (`tbEscritorio.compilarHex`) y un monitor pequeño. El circuito se guarda en el `.tbq.json`.
- **`npm run test:simulador` (TecnoBloques): 19 de 19.** El eco de los ejemplos responde «Recibí: on» y prende el LED. Un programa de bloques con el potenciómetro da PWM al 49,8 % con la perilla en la mitad y al 20,0 % en el 20 %.
- **Error encontrado y corregido aquí:** el serial perdía las tildes, porque cada byte se convertía por separado. Ahora se decodifica como UTF-8. Lo prueba `probar_nucleo.js` con el `.hex` real del eco de TecnoBloques: la primera fixture del contrato que se usa.
- **Para el contrato:** se proponen `sim.destruir()` (TecnoBloques usa hoy `_destruir()`) y `sim.medidas()` (la línea de estado usa `_medidas()`). Anotados en `CONTRATO.md`.

