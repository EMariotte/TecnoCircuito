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

## 2026-10-07 — Ajustes de Efraín: colores de los cables, imagen SVG y tamaño del circuito

Efraín pidió cinco ajustes después de ver las dos páginas conectadas. Antes de empezar se guardó un respaldo: `respaldos/prototipo-2026-10-07-antes-de-T1-T2-y-protoboard.zip`.

- **Colores de los cables en el orden del código de colores:**
  - son 10: 0 negro, 1 marrón, 2 rojo, 3 naranja, 4 amarillo, 5 verde, 6 azul, 7 violeta, 8 gris y 9 blanco;
  - se agregaron marrón y gris, y «morado» se conserva como clave por los circuitos guardados;
  - cada muestra lleva su número;
  - **las teclas 0 a 9** cambian el color del cable elegido o del que se está dibujando, y las muestras también aparecen mientras se dibuja.
- **Error de integración encontrado y corregido:** las teclas del lienzo seguían hasta la página, así que Supr en el circuito podía borrar también un bloque elegido en Blockly. Ahora el lienzo las detiene.
- **Imagen SVG del circuito (`lienzo.exportarSVG()`):**
  - copia el dibujo de cada pieza con sus estilos;
  - pone un prefijo a los identificadores (dos LED usaban los mismos filtros);
  - deja la perilla del potenciómetro girada como atributo, para que Word, LibreOffice o Inkscape la vean igual;
  - lleva los cables encima y el fondo blanco.
  - Prueba nueva `probar_svg.py`: XML válido, sin identificadores repetidos, referencias completas, la imagen carga sola y es fiel a la pantalla. El botón «Guardar imagen (SVG)» está en la página de prueba.
- **El lienzo se vuelve a encuadrar cuando cambia de tamaño,** salvo que el aprendiz ya haya movido o acercado la vista a mano.
- **Prueba ajustada:** `probar_simulacion.py` empezaba a mirar el LED en el mismo instante en que borraba el cable, y la foto que ya venía del Worker lo traía prendido. Ahora espera 150 ms.
- **Pruebas:** `npm run probar` pasa los 8 grupos (motor y núcleo con Node, y seis en Chromium).

## 2026-10-07 — Contrato 1: medidas(), destruir() y exportarSVG()

Anotado con el mismo título en las dos bitácoras. El contrato sigue en borrador y no sube el número.

- **`sim.medidas()`** devuelve `{ msSimulados, msReales, velocidad, estado, hilo }`.
- **`sim.destruir()`** detiene la simulación y libera el Worker.
- Los nombres del prototipo (`_medidas`, `_destruir`) siguen funcionando, pero no son parte del contrato.
- **`lienzo.exportarSVG()`** devuelve el circuito como texto SVG, tal como se ve.
- TecnoBloques ya usa los tres; ver su bitácora.

## 2026-10-07 — Tareas T1 y T2 completas en el simulador

**T1 (LED y botón):**

- **Pieza nueva `pulsador`** (dibujo de 12 mm de Wokwi, con las patas al paso de la protoboard). Las patas con el mismo número están unidas por dentro, y al presionar se une la 1 con la 2.
- **Cómo se usa:** mientras la simulación corre, se mantiene presionado con el mouse. Detenida, se mueve como cualquier pieza. Si el mouse se sale del botón con el clic apretado, el botón se suelta.
- **Lectura digital desde el circuito:** el núcleo resuelve el circuito cada vez que cambia un pin, el cableado o un botón, y escribe en el chip (`setPin` de avr8js) el nivel de cada entrada. Usa los umbrales del ATmega a 5 V: ALTO desde 3 V, BAJO hasta 1,5 V, y en medio conserva el nivel anterior.
- **Entrada flotante (`entradaFlotante`):** una entrada sin ningún camino (cables, resistencias, potenciómetros o botones presionados) a 5V, a GND o a un pin que la maneje queda al aire. En modo realista cambia sola, en promedio cada 120 ms, así el LED se prende y se apaga a la vista. En modo ideal lee BAJO. La tabla de mediciones la marca «al aire» y sin voltaje medible.
- **Ajuste hecho al probar:** con cambios cada 7 ms el LED se veía siempre a medias, porque el ojo (y el promedio por cuadro) lo suaviza. Se dejó en 120 ms, a la vista.
- **Programas:** `boton_pulldown` (5V → botón → pin 2, con 10 kΩ a GND) y `boton_pullup` (botón a GND con `INPUT_PULLUP`). La página de prueba tiene el botón «Ejemplo con botón (T1)».

**T2 (potenciómetro y brillo):**

- **Ruido del ADC (`ruidoADC`):** cada `analogRead()` lleva un ruido de unos 0,6 pasos de desviación. Con la perilla al 50 % lee entre 511 y 514. En modo ideal, siempre 511.
- **Entrada analógica al aire:** sin la pata del medio, A0 deambula al azar en modo realista y lee 0 en ideal. Sin GND, el potenciómetro no divide y lee 1023: eso es física y sale igual en los dos modos.
- **Error corregido:** el primer `analogRead()` leía 0, porque el voltaje de A0 recién llegaba al chip con la primera foto, a los 16 ms. Ahora llega desde el arranque.

**Lienzo:**

- La barra queda siempre en una línea y se desplaza de lado si no cabe. Antes, al pasar a dos líneas, el área cambiaba de alto y la vista saltaba mientras se cableaba.
- El re-encuadre automático solo actúa con cambios de tamaño de más del 10 %.

**Pruebas:**

- 11 comprobaciones nuevas en `probar_nucleo.js` (Node, con semilla para que el azar se repita) y 15 en `probar_t1t2.py` (Chromium, con el botón presionado con el mouse).
- `npm run probar` pasa los 9 grupos. En TecnoBloques, `test:simulador` pasa 24 de 24.

**Falta validar con la placa real** (regla 2), con dos programas nuevos:

- `validar_adc`: el potenciómetro quieto en A0; da el mínimo, el máximo, el promedio y la desviación de 200 lecturas.
- `validar_flotante`: el pin 2 sin nada; da cuántas veces cambia en 2 s y qué parte del tiempo lee ALTO.

Con eso se ajustan `RUIDO_ADC_V` y `CAMBIO_AL_AIRE_POR_MS` en `src/nucleo.js`.

## 2026-10-07 — Contrato 1: botón, colores y entradas (T1 y T2)

Anotado con el mismo título en las dos bitácoras. El contrato sigue en borrador y no sube el número.

- **Sección 4:** tabla de piezas con sus pines y `props` (`resistencia`, `led`, `potenciometro` y el nuevo `pulsador`) y los 10 colores de cable en el orden del código de colores (`marron` y `gris` son nuevos).
- **Sección 6:** evento nuevo `boton_pulsado` (`{ id, ms }`, origen `circuito`).
- **Sección 7:** `entradaFlotante` cubre la entrada digital y la analógica. `ruidoADC` queda descrito.
- **Para TecnoBloques no cambia nada:** guarda el circuito sin interpretarlo y escribe los eventos que le lleguen.

## 2026-10-07 — Prototipo 4: la protoboard

La interfaz de la protoboard era el último riesgo técnico grande que no se había tocado.

- **Dibujo propio** (`src/protoboard.js`), porque @wokwi/elements no trae protoboard. Es la media de 400 puntos del kit:
  - 30 columnas, con las filas a–e y f–j separadas por el canal central (0,3");
  - dos rieles arriba y dos abajo, de 25 huecos cada uno;
  - líneas roja y azul, signos + y −, y números y letras como vienen impresos.
- **Huecos con nombre:** `a1` … `j30` y los rieles `s+N`, `s-N`, `i+N`, `i-N`. Las tiras unidas por dentro entran al cálculo de nodos, así que el motor eléctrico, la entrada flotante y las mediciones funcionan igual que con cables.
- **Encajar piezas:**
  - al soltar una pieza sobre la protoboard, si todas sus patas caen cerca de huecos libres, se corre lo justo para quedar en ellos, y su campo `en` dice qué pata va en qué hueco;
  - mientras se arrastra, los huecos donde quedaría se ven en verde;
  - un hueco ocupado no recibe otra pata;
  - al girar con R, se re-encaja o queda suelta.
  - Los dibujos de Wokwi no tienen las patas a 0,1" exactas (el LED a 10 px, la resistencia a 58,8), así que se tolera hasta 3,5 px.
- **Para aprender:** al pasar el mouse por un hueco, o por una pata encajada, se ilumina toda su tira (5 huecos o el riel completo). El rótulo dice «unido por dentro con a15–e15» o «todo el riel está unido», más el voltaje si se está simulando.
- **Mover la protoboard** mueve las piezas encajadas con ella. **Borrarla** deja las piezas sueltas y quita los cables que llegaban a sus huecos.
- **Cables a la protoboard:** un cable a un riel − sale negro y a un riel + sale rojo.
- **«+ Agregar»:** un solo botón abre el menú de piezas (LED, Resistencia, Potenciómetro, Botón y Protoboard). Con cinco botones, la barra no cabía en el panel de TecnoBloques, y en 2027 vendrán más piezas.
- **Ejemplo en protoboard (T1)** en la página de prueba: el LED con su resistencia, y el botón girado cruzando el canal central con su pull-down al riel − de abajo.

**Errores encontrados y corregidos al probar:**

- **Los huecos tapaban las piezas.** Estaban en la capa de pines, encima de todo, así que un clic en el cuerpo de una pieza suelta sobre la protoboard empezaba un cable. Ahora van dentro del dibujo de la protoboard, debajo de las piezas. Un hueco con un cable ya conectado no recibe otro, como en la real.
- **La protoboard no se podía elegir, mover ni borrar,** porque el lienzo le buscaba un `id` y no lo tiene (no es un componente).
- **La barra cambiaba de alto según lo elegido** (con «Borrar» era más alta). Al empezar un cable, la vista se corría 6 px y el doblez caía mal. Ahora tiene altura fija, y las opciones de la pieza se desplazan dentro de su espacio sin tapar el zoom.
- **En modo ideal, con la perilla al 50 %, la lectura saltaba entre 511 y 512** por un error de redondeo de una milmillonésima de voltio, justo en el borde de 2,5 V. El ADC redondea el voltaje al microvoltio, y ahora da 512 fijo.

**Pruebas:**

- `probar_protoboard.py`: 21 comprobaciones en Chromium.
- 2 nuevas del motor con Node: el LED en la protoboard da los mismos 12,50 mA que con cables, y con la resistencia en la otra mitad no pasa corriente.
- `npm run probar` pasa los 10 grupos. En TecnoBloques, `test:simulador` pasa 24 de 24.
- `VERSION` del paquete: `0.0.5-prototipo`.

**Falta:** probar la protoboard con dos o tres aprendices. Es la prueba que dice si la interfaz es fácil.

## 2026-10-07 — Contrato 1: protoboard

Anotado con el mismo título en las dos bitácoras. El contrato sigue en borrador y no sube el número.

- **Nueva sección 4.0:** el campo `protoboard` (`{ tipo: "media", x, y }` o `null`), los nombres de los huecos (`a1` … `j30`, `s+N`, `s-N`, `i+N`, `i-N`) y el campo opcional `en` de cada pieza (qué pata va en qué hueco), que es lo que manda para la conexión.
- **Eventos:** mover, agregar y quitar la protoboard salen como `componente_*` con `id: "protoboard"`. Encajar o soltar una pieza sale en `componente_cambiado` con su `en`.
- **Para TecnoBloques no cambia nada:** guarda el circuito sin interpretarlo.

## 2026-10-07 — Prototipo validado y repositorio publicado

**Decisión de Efraín:** «este primer prototipo demuestra lo que quería». La viabilidad queda validada y se crea el repositorio, que se publica igual que TecnoBloques.

- **Cómo nació:** la idea era validar con prototipos antes de crear el repositorio, pero el proyecto creció rápido. En un día pasó de cablear un LED al chip simulado, al circuito eléctrico validado con el multímetro, al Web Worker con PWM, a las tareas T1 y T2 y a la protoboard.
- **La historia queda en tres commits:**
  1. los prototipos 0 a 3 con la primera conexión a TecnoBloques, tomados del respaldo que se guardó antes de los ajustes de la tarde, con la bitácora hasta ese punto;
  2. los ajustes de Efraín, T1, T2 y el prototipo 4, con la bitácora hasta la protoboard;
  3. los archivos del repositorio y la documentación al día.
- **Archivos del repositorio,** como en TecnoBloques:
  - `LICENSE` (Apache 2.0);
  - `NOTICE` (© SENA – TecnoAcademia Tolima, autor Efraín Guillermo Mariotte Parra, con los avisos de avr8js, @wokwi/elements y Lit);
  - `README.md` con capturas y la sección «Cómo nació»;
  - `package.json` `tecnocircuito` 0.1.0.
- **`prototipo/dist/` entra al repositorio** para abrir el prototipo sin construir. Las capturas de las pruebas, los `.cjs`, los registros y `respaldos/` no entran. `investigacion/` sigue fuera.
- **Receta nueva:** `prototipo/RECETA-COMPONENTE-NUEVO.md`, los 10 pasos con que se creó la protoboard desde cero (no viene en @wokwi/elements), para repetirlos con otros componentes que no trae ningún simulador.
- **Para la próxima sesión:** explicarle a Efraín la exportación de la netlist de KiCad y si basta para empezar una placa en KiCad.
- **Falta** la primera etiqueta con `dist/tecnocircuito.js` en la raíz, para que TecnoBloques dependa de ella y el simulador llegue al instalador.

## 2026-10-07 — Piezas Tecno: dibujos originales en Apache 2.0

**Decisión de Efraín:** todos los dibujos serán propios y originales, mejores que los de Fritzing, y la receta queda para que cualquiera cree sus propias **piezas Tecno**.

- **Por qué no Fritzing:** sus piezas son CC BY-SA 3.0, que obliga a «compartir igual». Un dibujo adaptado seguiría siendo CC BY-SA, no podría volverse Apache 2.0 y llegaría hasta el SVG del aprendiz. Además, Creative Commons recomienda no usar sus licencias para software.
- **Por qué Apache 2.0 y no una licencia *copyleft*:**
  - Es servicio público.
  - Apache ya obliga a conservar el crédito al SENA (`NOTICE`, sección 4) y no deja usar el nombre (sección 6).
  - Lo valioso del simulador, la validación con la placa y las tareas del aula, no se copia con el código.
- **Hecho:**
  - `NOTICE` y `README` declaran las piezas Tecno en Apache 2.0 y aclaran que **las imágenes que produce TecnoCircuito son de quien las hace** y se publican libremente, sin la licencia ni el aviso.
  - La receta tiene la sección «Tus propias piezas Tecno».
  - `src/protoboard.js` lleva el encabezado SPDX: es la primera pieza Tecno.
- **Pendiente:** los dibujos que vienen de Wokwi (Uno, LED, botón) son MIT. Cuando tengamos versiones propias, el SVG exportado será del todo nuestro.

## 2026-10-07 — Marca en la imagen SVG

**Pedido de Efraín:** que cada circuito exportado recuerde de dónde salió, aunque la imagen sea libre.

- `exportarSVG()` agrega, abajo a la derecha, **«Hecho con TecnoCircuito · SENA – TecnoAcademia Tolima»**, en gris claro (Arial 9).
  - Va en una franja propia de 16 px debajo del circuito, así que no tapa piezas ni cables.
  - La imagen mide al menos 280 px de ancho, para que la marca quepa aunque el circuito sea pequeño.
- **Texto elegido:** «Hecho con» es como se dice en español «Made with» o «Powered by». Se descartó «Realizado por», porque el circuito lo hace el aprendiz, no TecnoCircuito. También se descartó «Con la tecnología de», que es largo y comercial.
- **No cambia la licencia:** la imagen sigue siendo de quien la hace (`NOTICE`). La marca es un recordatorio, no una condición.
- **Pruebas:** `probar_svg.py` suma 4 comprobaciones: el texto, que cabe, que está en la esquina y que queda debajo del circuito. Pasan las 15.
- **Contrato:** anotado en `CONTRATO.md` (API y fila de la versión 1). La API no cambia, solo el contenido de la imagen.

## 2026-10-08 — Llevar el circuito a KiCad: la netlist

**Pedido de Efraín:** después de la explicación de la sesión, implementarlo «solo con la netlist, con eso será suficiente por ahora». En el ambiente hay KiCad 10.0, el mismo que está instalado en el PC de desarrollo.

- **`src/kicad.js`** (pura, sin página) escribe la netlist «export» S-expression versión E, el formato del esquemático de KiCad.
  - Piezas: cada una con su referencia (A1, R1, D1, SW1, RV1), su valor y su huella.
  - Redes: salen de `calcularNodos()`. La protoboard y los cables desaparecen.
- **La tabla de huellas y pads se sacó de KiCad 10, no de memoria.** Los pines del Uno salen del símbolo oficial `MCU_Module:Arduino_UNO_R3` y se confirmaron con la posición de cada pad. Hallazgos:
  - el cátodo del LED es el pad 1;
  - la huella del botón de 6 mm repite los números 1, 1, 2, 2, igual que nuestras patas unidas por dentro;
  - el cursor del potenciómetro es el pad 2.
- **Reglas de las redes:**
  - del Uno solo entran los pines con cable;
  - una red necesita dos pads o más;
  - se nombra por el pin del Uno (`GND`, `+5V`, `D13`) o, si no toca ninguno, `Net-(D1-Pad2)`;
  - los identificadores son fijos por pieza, así que al reimportar KiCad reconoce las mismas huellas.
- **API:** `lienzo.exportarNetlist({ nombre })` (contrato 1). La página de prueba tiene «Guardar netlist (KiCad)», y TecnoBloques, «Llevar a KiCad».
- **Pruebas:**
  - `npm run probar:kicad` (Node): 17 comprobaciones. La más importante: la T1 en la protoboard y con cables da las mismas 5 redes.
  - `pruebas/probar_kicad_pcb.py` (con el Python de KiCad, que trae `pcbnew`): 21 comprobaciones.
    - Cada huella existe y tiene sus pads.
    - Los 31 pines del Uno caen en el pin correcto del símbolo.
    - Arma la placa con cada `.net`, como hace «Importar netlist».
    - El DRC de KiCad ve las conexiones por trazar: 9 en la T1 y 3 en la T2.
    - Si KiCad no está instalado, se salta.
  - `probar_svg.py` suma la descarga desde la página, y `test:simulador` de TecnoBloques el botón nuevo.
- **No se probó a mano** el menú «Archivo → Importar → Netlist» del editor de placas: KiCad no expone ese lector en Python. Queda para Efraín, con las instrucciones de `LEEME.md`.
- **Licencias:** no se copia nada de las librerías de KiCad. Solo se escriben los nombres de las huellas y los números de pad, y KiCad las busca en sus propias librerías.
- **Queda para más adelante:** el esquemático `.kicad_sch`, con etiquetas en vez de cables (ver `COMO-FUNCIONA.md`, sección 43).

## 2026-10-08 — Prueba de Efraín en KiCad: el Uno se solapa con las piezas

Efraín importó la netlist en el editor de placas de KiCad 10: **la importación funciona** y las piezas quedan conectadas. Encontró un problema para hacer un shield: KiCad no deja que las otras huellas se monten sobre la del Uno.

- **La causa:** la huella `Module:Arduino_UNO_R3` dibuja el Uno entero, con una zona de cortesía (*courtyard*) que cubre toda la placa. KiCad no deja que otra huella se monte sobre una zona de cortesía: es la regla «courtyard overlap» del DRC del editor de placas (no el ERC, que es del esquemático). Para KiCad, el Uno es una pieza más que ocupa espacio, no la placa de abajo.
- **El arreglo de Efraín funciona:** crear el proyecto con la plantilla del Uno y borrar la huella del Uno que trae la netlist. Las demás piezas quedan conectadas a los pines de la plantilla, porque las redes llevan los nombres de esos pines.
- **La solución propuesta (para más adelante):** KiCad 10 trae la plantilla **«Arduino Uno Shield»** (`share/kicad/template/Arduino_Uno`). Tiene el contorno exacto del Uno, 4 agujeros de montaje y 4 conectores hembra:
  - `J1` Power (8);
  - `J2` Digital/PWM (10);
  - `J3` Analog (6);
  - `J4` Digital/PWM (8).

  En vez de la huella del Uno, la netlist exportaría **esos 4 conectores, con las mismas referencias**. El aprendiz crea el proyecto desde la plantilla, importa la netlist y KiCad conecta las piezas a los conectores que ya están en su lugar, sin solapes ni nada que borrar. Hay que sacar de la plantilla qué pin de cada conector es cada pin del Uno, y probarlo con el DRC en `probar_kicad_pcb.py`.
- **Decisión de Efraín:** se deja documentado y se analiza después. Por ahora se sigue con el software actual.

## 2026-10-08 — Contrato 1: el esquema del circuito y las fixtures

Primer paso de la etapa 0 que el prototipo no había cerrado: **el formato del circuito tiene reglas escritas.** Antes vivía en prosa en `CONTRATO.md` y en el código de `normalizar()`. Efraín está fuera del ambiente, así que se hizo solo software.

- **`contrato/circuito.schema.json`** (JSON Schema 2020-12) es la fuente de:
  - los pines de cada pieza (los 31 del Uno, la resistencia, el LED, el potenciómetro y el botón);
  - los 10 colores de cable, los colores del LED y del botón;
  - los giros (0, 90, 180, 270) y el rango de la perilla;
  - los huecos de la media protoboard (un patrón que excluye las columnas sin hueco de los rieles).

  **No cambia el formato:** escribe las reglas que ya había. Es tolerante con lo nuevo, porque el contrato promete que una pieza o un campo nuevos no rompen nada.
- **`prototipo/pruebas/contrato.js`** revisa un circuito con el esquema (con `ajv`, MIT, solo para pruebas) y además lo que un esquema no ve: cables a piezas o pines que no existen, huecos que no existen, `en` sin protoboard, ids repetidos. Los mensajes de las referencias están en español; los del esquema los escribe `ajv`, en inglés.
- **`npm run probar:contrato`** (43 comprobaciones):
  - **el código está de acuerdo con el contrato:** los pines del dibujo del Uno y del catálogo, los colores, los 400 huecos de `protoboard.js` y la tabla de KiCad coinciden con el esquema;
  - **cumplen el esquema** el ejemplo de `CONTRATO.md` y los 5 ejemplos de la página;
  - **se rechazan 19 errores** con su motivo, y se aceptan un tipo de pieza y un campo nuevos.
- **`probar_protoboard.py`:** los 5 circuitos que guarda el lienzo cumplen el contrato. Son el que queda después de agregar, encajar, mover, girar y borrar, y cada ejemplo después de pasar por el lienzo.
- **`npm run fixtures`** trae los 16 casos de TecnoBloques 0.2.5 (`.tbq.json` y `.hex`) a `prototipo/pruebas/fixtures/`, y se commitean.
  - **`npm run probar:fixtures`:** los 13 programas del Uno y del Nano corren 1 s en el chip simulado sin fallar, y el eco responde «Recibí: on» con la tilde.
  - Los 3 de la Mega se saltan: esa placa todavía no se simula.
  - La prueba del eco salió de `probar_nucleo.js`, así que ya no depende de la carpeta hermana.
- **Hallazgo:** ninguna fixture de TecnoBloques trae `circuito`, porque se generaron antes del simulador. **Pendiente en TecnoBloques:** un caso de prueba con circuito (por ejemplo, la T1 en protoboard), para que el contrato se pruebe con un proyecto real de los dos lados.
- `npm run probar` pasa 14 grupos (307 comprobaciones).

## 2026-10-08 — KiCad: el Uno como los conectores del shield (sin solapes)

**Pedido de Efraín:** si el solape se arregla cambiando la huella del Uno por la del shield, hacerlo ya en vez de posponerlo.

- **`src/kicad.js`:** en vez de la huella `Module:Arduino_UNO_R3` (A1), la netlist lleva los 4 conectores de la plantilla «Arduino Uno Shield» de KiCad, con sus mismas referencias (J1 a J4), huellas y UUID. Al importar sobre un proyecto hecho con esa plantilla, KiCad los reconoce en su lugar y solo agrega las piezas.
- **De dónde salió la relación de pines:** de la netlist de la propia plantilla (`kicad-cli sch export netlist`). Por ejemplo, D13 es el pin 5 de J2, D2 el 6 de J4, A0 el 1 de J3, y GND2 el 6 de J1.
- **Pruebas:**
  - `probar_kicad.js` (18 comprobaciones), con las redes nuevas y los UUID.
  - `probar_contrato.js`: los conectores tienen cada pin del Uno una sola vez.
  - `probar_kicad_pcb.py` (39 comprobaciones):
    - vuelve a exportar la netlist de la plantilla y compara los 31 pines;
    - abre la placa de la plantilla, reconoce J1 a J4 y agrega las piezas dentro del contorno;
    - **el DRC no ve solapes.**
  - Control: la huella vieja del Uno con un LED encima sí da `courtyards_overlap`, el error que encontró Efraín.
- **Instrucciones nuevas** (`LEEME.md`): proyecto desde la plantilla «Arduino Uno Shield», importar la netlist y no marcar la opción de borrar huellas (borraría los agujeros de montaje).
- Imagen de la T1 sobre el shield en `docs/capturas/kicad-shield-t1.png`, en el README y en `COMO-FUNCIONA.md`, sección 43.
- **TecnoBloques:** el texto de «Llevar a KiCad» dice que se empiece desde la plantilla.
- **Por probar a mano:** la importación sobre la plantilla, en el editor de placas de KiCad 10.

## 2026-10-08 — Contrato 1: la prueba con circuito en los dos proyectos

**Pedido de Efraín:** que la prueba del contrato se haga en los dos proyectos.

- **TecnoBloques** genera un caso nuevo, `t1_protoboard`: el programa de bloques «escribir en el pin 13 lo que lee el pin 2», con la T1 armada en la protoboard en su campo `circuito`. El circuito está en `test/circuitos/t1_protoboard.json`. Además, su `test:simulador` revisa con `prototipo/pruebas/contrato.js` de aquí el circuito que guarda la app.
- **Aquí,** `npm run fixtures` lo trae (17 casos) y `probar:fixtures` lo corre con su circuito: el LED queda en 0 % con el botón suelto, sube a 83 % al presionarlo y vuelve a 0 % al soltarlo.

## 2026-10-08 — Validación humana del flujo completo (Efraín)

Efraín llevó un proyecto **desde cero** por todo el camino, en la app de escritorio (`npm run app:simulador`), y lo aprobó:

1. armó el programa con bloques y conectó los componentes en el simulador;
2. lo simuló, y funcionó;
3. exportó el circuito como imagen SVG y como netlist;
4. creó el proyecto en KiCad 10 desde la plantilla «Arduino Uno Shield» e importó la netlist: **KiCad la aceptó y el DRC no vio inconvenientes**;
5. guardó el proyecto como `.tbq.json` y lo volvió a abrir desde la app, con los bloques y el circuito conectado.

Con esto, el flujo del aula queda probado de punta a punta:

```
bloques → simulación → imagen SVG (evidencia) → netlist → placa en KiCad
```

## 2026-10-08 — Tarea T3: el servo (pieza Tecno) y la energía del USB

**Pedido de Efraín:** empezar a ampliar las piezas simulables con los dos microservos, «un solo elemento y que varíe el modelo con las variables de consumo y torque de cada uno», y que se vea cuando varios servos superan el consumo y se apaga el controlador, «un feature que no tiene ningún simulador».

- **Pieza Tecno `servo`** (`src/piezas/servo.js`, encabezado SPDX): dibujo original a escala desde las medidas del SG90, con dos modelos, **SG90** (azul translúcido, engranajes de plástico) y **MG90S** (negro, de metal).
  - Pines `GND`, `VCC` y `SIG` en un conector a 0,1".
  - El lienzo aprendió a dibujar piezas Tecno con SVG propio (`dibujo` en el catálogo en vez de `etiqueta` de Wokwi).
- **Modelo lógico:** mide el ancho de cada pulso con el ciclo exacto del cambio de pin. Con el programa real de la librería Servo, `write(0)`, `write(90)` y `write(180)` dan 544, 1471 y 2400 µs, y 0°, 89,9° y 180°. Gira a la velocidad de la hoja de datos (0,1 s por 60° a 4,8 V), proporcional al voltaje.
- **Modelo eléctrico:** consumo quieto, moviéndose y al arrancar (SG90: 10, 200 y 650 mA; MG90S: 10, 250 y 700 mA). Son valores típicos de varias hojas de datos, que varían entre clones. **Por validar con el multímetro.**
- **Errores del aula:**
  - sin GND o sin alimentación, no se mueve;
  - alimentado desde un pin, avisa (falla `servo_alimentacion`);
  - a 3,3 V va más lento.
- **Energía del USB** (`src/energia.js`, no idealidad `limiteUSB`):
  - el 5V baja con la corriente (0,4 Ω);
  - un golpe de más de unos 1,5 A reinicia la placa (falla `reinicio_usb`);
  - más de 500 mA sostenidos calientan el fusible MF-MSMF050-2 del Uno, que apaga la placa (falla `fusible_usb`) y vuelve a encender a los 3 s.
  - En la simulación, 1 y 2 SG90 funcionan, y con 3 o 4 arrancando a la vez la placa **se reinicia en bucle**, como en el aula.
  - El fusible calza con su hoja de datos (150 ms a 8 A). El reloj no retrocede con los reinicios.
- **Contrato 1:**
  - la pieza `servo` está en el esquema y en la tabla de piezas;
  - entran la clave `limiteUSB` (`reinicioPorCaida` queda reservada, dentro de ella) y las fallas nuevas;
  - el evento `reinicio_placa` se emite (motivo `boton` o `energia_usb`).
- **KiCad:** el servo es un conector `PinHeader_1x03` con el símbolo `Motor:Motor_Servo` (1 = señal, 2 = +, 3 = −), verificado con las librerías de KiCad 10.
- **Programas nuevos:** `servo_barrido` (0°, 90°, 180°) y `servos_cuatro` (4 servos a la vez). En la página, «Ejemplo con servo (T3)» y «Cuatro servos en el USB (T3)», y filas nuevas en la tabla: el servo y el USB.
- **Pruebas:**
  - `probar_nucleo.js`: 22 comprobaciones nuevas (servo y energía).
  - `probar_servo.py` (Chromium): 18.
  - El contrato y KiCad también cubren el servo.
  - `npm run probar` pasa 15 grupos.
- **Por validar en el aula** (`LEEME.md`, «Validar el servo y la energía del USB»): la corriente de cada servo, el voltaje del 5V con servos y **con cuántos servos se reinicia el Uno** con el PC y el cable del aula.

## 2026-10-08 — Validación humana del servo y de la energía del USB (Efraín)

- Efraín probó en la app de escritorio los **dos modelos, SG90 y MG90S**, y escribió **dos programas propios** para validar cada situación descrita: el servo siguiendo al programa y los errores y límites de energía. **Aprobado:** «realmente funciona».
- Siguen pendientes las medidas con hardware para ajustar los valores de partida: la corriente de cada servo, el 5V con servos y con cuántos servos se reinicia el Uno en el PC del aula (`prototipo/LEEME.md`, «Validar el servo y la energía del USB»).

**Cierre de la sesión del 8 oct:**
1. explicación e implementación de la netlist de KiCad, y el arreglo del solape con la plantilla «Arduino Uno Shield»;
2. esquema del circuito y fixtures, con la prueba del contrato en los dos proyectos;
3. validación humana del flujo completo, de bloques a KiCad;
4. servo SG90/MG90S como pieza Tecno y energía del USB, también validados.

Lo siguiente: la shield L293D y el motor DC (T3).

## 2026-10-09 — Validaciones con la placa real, primera parte (Efraín en el ambiente)

Efraín estuvo en la TecnoAcademia con el kit y se validó una prueba a la vez. Cada una tiene su registro en `validacion/`.

1. **Velocidad en un PC del aula** (`2026-10-09-velocidad-pc-aula.md`). Los PC son HP ProBook 450 G7 (i7-10510U, 8 GB, HDD), todos iguales. Con `prototipo.html` y un servo, **nunca bajó de 90 %**. Con cuatro servos reiniciando la placa en bucle, 66 %: es una situación de falla.
2. **Ruido de `analogRead()`** (`2026-10-09-ruido-adc.md`). El ADC real tiene unos **0,1 pasos** de ruido: con la perilla quieta no se mueve, salvo en el borde entre dos valores. `RUIDO_ADC_V` bajó de 0,6 a 0,1. Además se corrigió `validar_adc.ino`: con `float` de 32 bits daba `nan`, y ahora suma con enteros.
3. **Entrada al aire** (`2026-10-09-entrada-flotante.md`). La real **no cambia sola**, y con la mano capta la **red de 60 Hz** (225 a 269 cambios en 2 s, 35 % en ALTO). Nuevo modelo, aprobado por Efraín: **«la mano es el mouse»**. Con el mouse sobre el cable o el pin al aire, la entrada sigue los 60 Hz; sin él, se queda quieta. El simulador da `cambios 240 alto 35.1 %` con el mismo programa. Es interno: `lienzo._alAcercar`, el mensaje `mano` del Worker y `nucleo.ponerMano`.
4. **Ángulos del servo** (`2026-10-09-servo-angulos.md`). El SG90 del kit llega a 7°, 90° y 175° con `write(0/90/180)`. El modelo usa ahora esos puntos (`MODELOS_SERVO.sg90.angulos`). El MG90S está por medir.

**Ejemplos de validación en TecnoBloques:** el grupo «Validación con la placa real (instructor)», con el C++ exacto y su circuito. Así se simula y se sube a la placa con el mismo código (ver la bitácora de TecnoBloques).

**Pedidos de Efraín** (anotados en TecnoBloques, «Fase 2d»): exportar el monitor serial a **CSV** y un **graficador serial** donde se elige qué variables se ven.

**Hallazgo pendiente:** la tabla muestra «Pin 9: 1,84 V» con la señal del servo, y un multímetro mostraría unos 0,3 a 0,6 V. El promedio falla cuando el período de la señal (20 ms) es más largo que cada foto (16 ms).

## 2026-10-09 — Validaciones con la placa real, segunda parte, y cierre del día

5. **Corriente del SG90** (`2026-10-09-servo-corriente.md`), con el UT33B+ en 10 A:
   - medidas: menos de 10 mA quieto, ~100 mA en barrido continuo y 590 mA bloqueado;
   - hallazgo: el modelo daba 674 mA en el barrido, porque cada paso de 1° contaba como un arranque completo;
   - corrección: el control empuja en proporción a lo que falta (`bandaGrados` = 8, ajustado a los 100 mA). Ahora da 100 mA;
   - SG90: reposo 6 mA y bloqueo 590 mA;
   - ejemplo nuevo, «Validar: servo en barrido continuo» (`servo_continuo.ino`).
6. **5V del USB** (`2026-10-09-usb-5v.md`):
   - medidas: 5,06, 4,80, 4,68, 4,55 y 4,30 V con 0 a 4 SG90; la recta es **5,11 V − 1,66 Ω**, y el modelo suponía 0,4 Ω;
   - **con 4 SG90 la placa no se reinició;**
   - el modelo ahora resuelve el 5V junto con los servos (son como resistencias), y el reinicio lo dispara el bajo voltaje (< 2,7 V); con 4 SG90 queda en ~2,8 V, como en la placa;
   - el aviso dice «el 5V bajó a X V»;
   - «Cuatro servos en el USB» pasó a 4 SG90, y hay un ejemplo nuevo, «Seis servos en el USB», con la predicción: se reinicia.
7. **Otto en el USB** (Nano, sin pilas, ejemplo «Otto humanoide esquiva»): camina sin reiniciarse. El simulador, con el mismo programa y 4 o 6 servos, tampoco: predijo bien un caso que no se usó para ajustarlo.
8. **Hallazgo:** cuando una señal dura más que una foto (16 ms), su promedio salta entre fotos. Pasa con el pulso del servo en la tabla y con el LED de la mano (cada foto entre 7 y 50 %; promedio ~35 %). La prueba ahora promedia 1 s, como el ojo. **Arreglo pendiente:** suavizar en el núcleo.

**Cierre:** pasan los 15 grupos de `npm run probar` (387 comprobaciones), y en TecnoBloques `npm test`, `test:ui` y `test:simulador` (28 de 28).

**La próxima vez en el laboratorio:** 5 y 6 SG90 en un Uno (la predicción), el MG90S, y, opcional, el ADC con el programa corregido.

## 2026-10-10 — El promedio de la vista para señales lentas

Sesión de solo software. Es el primer pendiente que salió de las validaciones del 9 oct.

- **Problema:** cuando una señal es más lenta que una foto (≈16 ms), el promedio de la ventana salta. Pasaba con el pulso del servo (la tabla decía «Pin 9: 1,84 V») y con la red que capta la mano (el LED saltaba entre 0 y 83 %).
- **Arreglo** (`src/nucleo.js`): la vista se promedia como el ojo y el multímetro.
  - Con un pin cambiando en los últimos 50 ms, promedio móvil con τ = 100 ms.
  - Con la señal quieta, valor exacto al instante.
  - `analogRead()`, las fallas y el ciclo útil del PWM no cambian.
- **Primer intento descartado:** decidir «señal quieta» por una ventana con una sola combinación de pines. Las ventanas del servo a veces no tienen ningún cambio (1,5 ms en ALTO cada 20 ms) y el filtro se reiniciaba a 0. El criterio bueno es el tiempo desde el último cambio.
- **Resultado:** el pin 9 del servo marca de 0,31 a 0,38 V (un multímetro, ~0,37 V) y el LED de la mano se queda entre 33 y 49 %. La prueba nueva está en `probar_nucleo.js`.
- `npm run probar`: 15 grupos, 388 comprobaciones. `test:simulador` de TecnoBloques también pasa (PWM al 50,0 % y al 20,0 %).
- Explicado en `COMO-FUNCIONA.md`, sección 48.

## 2026-10-10 — Contrato 1: sim.mediciones() y el panel de mediciones en TecnoBloques

**Pedido de Efraín:** ver en TecnoBloques, con el circuito ampliado, el panel lateral con los cálculos internos (voltajes y corrientes), como en la página de prueba.

- **`sim.mediciones()`** (contrato 1): lo que mediría un multímetro en cada pieza, con el promedio de la vista. Antes era `_mediciones()`, solo del prototipo, y el nombre viejo se conserva.
- **`TecnoCircuito.filasDeMediciones(m)`** (`src/mediciones.js`): arma la tabla en español (pieza, voltaje, corriente y detalle). La página de prueba y TecnoBloques usan la misma función, así que el aprendiz lee lo mismo en los dos lados.
- **Hallazgo y arreglo:** el ciclo útil del pin de un servo salía en «PWM 28 %» y el real es 7,4 %. Era el mismo problema de las señales lentas. Ahora los pines que cambiaron en los últimos 50 ms entran siempre al cálculo, con 0 o 1 si en la ventana no cambian, y el promedio de la vista los suaviza: da de 6,3 a 7,6 %.
- **En la tabla,** el pin que manda la señal de un servo se describe como «señal de servo: pulso de 1471 µs», no como PWM.
- **Pruebas:**
  - `probar_nucleo.js` comprueba el ciclo útil del servo;
  - `test:simulador` de TecnoBloques comprueba el panel: aparece con el circuito ampliado, muestra el pin 9 y el servo, y se esconde en la vista dividida;
  - `npm run probar`: 15 grupos, 389 comprobaciones.

- **Validación humana (Efraín, 10 oct):** creó un proyecto nuevo en TecnoBloques, conectó un LED con su resistencia, usó el ejemplo de encendido por el monitor serial y, al simular con el circuito ampliado, vio cambiar las mediciones en el panel. Aprobado.

## 2026-10-10 — T3: shield L293D, motor TT y batería LiPo (piezas Tecno)

**Pedido de Efraín:** modelar las piezas de potencia del kit como piezas Tecno, con la shield lo más detallada posible y los nombres de sus tres integrados legibles. El kit: shield L293D Rev4, motores TT amarillos de 6 V y una LiPo 2S en EXT_PWR, con el puente PWR alimentando el VIN del Uno.

- **Shield «desarmada»** (`src/piezas/shield_l293d.js`): U3 74HC595, U1 y U2 L293D con sus nombres, borneras M1–M4, EXT_PWR, puente PWR, LED, conectores SERVO_1 (pin 10) y SERVO_2 (pin 9), agujeros en las posiciones reales del Uno. Va montada sobre el Uno: no se mueve ni se gira y hay una sola.
- **Motor TT** (`src/piezas/motor_tt.js`): vista «eje» (RPM encima) y vista «rueda» (flecha de avance y velocidad en cm/s), y lado izquierdo o derecho, que refleja el dibujo. Modelo de motor DC con reducción 1:48, de hojas de datos: 200 RPM y 150 mA sin carga a 6 V, 1,2 A bloqueado.
- **Batería LiPo 2S** (`src/piezas/bateria_lipo.js`): llena, nominal o descargada (8,4, 7,4 y 6,4 V), con su cable de balance dibujado. Descargada, avisa al empezar que corre el riesgo de perder sus celdas.
- **Lógica** (`src/potencia.js`): 74HC595 por los pines 8, 4, 12 y 7, como AFMotor_R4 (BSD-3); PWM de los pines 11, 3, 6 y 5 promediado por milisegundo y suavizado; puente H con la caída de 1,4 V + 1 V/A (`caidaL293D`); batería con 0,05 Ω; el Uno toma la energía del VIN con más de 6,6 V. Fallas nuevas: `bateria_baja`, `bateria_celdas`, `bateria_invertida`, `bateria_corto`, `bateria_en_5v`, `motores_sin_energia`, `motor_en_pin` y `l293d_corriente`.
- **Lienzo:** piezas con varias propiedades (`campos`), valores sí/no, dibujo que cambia de tamaño con sus propiedades (`dibujo.marco`) y piezas montadas.
- **Contrato 1:** las tres piezas en el esquema y en `CONTRATO.md`; `mediciones()` gana `shield`, `motores`, `baterias` y `porVin`.
- **Ejemplo:** «Carro con la shield L293D (T3)» y el programa `carro_motores` (AFMotor_R4). En TecnoBloques, «Validar: carro con la shield L293D».
- **Resultado en el simulador:** adelante a 200, 179 RPM con 5,4 V en el motor; atrás a 255, 227 RPM con 6,8 V (caída de 1,57 V); en modo ideal, 279 RPM. La rueda derecha, cableada igual que la izquierda, va hacia atrás.
- **Pruebas:** `probar_potencia.js` (24), `probar_carro.py` (25) y el contrato con cada vista del motor. `npm run probar`: 17 grupos, 449 comprobaciones. `test:simulador` de TecnoBloques: 28 de 28.
- **Falta:** validar con la placa real (LEEME, «Validar la shield L293D y el motor TT»), la netlist de KiCad con la shield desarmada, los pines del cable de balance y el probador de celdas.

## 2026-10-10 — Ajustes del carro pedidos por Efraín: velocidad, flecha y la shield como la real

**Validación humana de Efraín:** las piezas de potencia funcionan, pero en su app el carro iba al 33–40 % de velocidad. También pidió que la flecha siga el giro de la llanta y que la shield se parezca más a la real.

- **Velocidad:** en este PC no se pudo reproducir el 33 %. Con TecnoBloques maximizado y el carro, iba al 100 %, y el hilo de la página trabajaba ~90 ms por segundo. Pero el perfil del núcleo mostró que el 14 % se iba en los getters que esbuild pone delante de `avrInstruction`. Guardarla una vez en `src/chip.js` hace el chip un **72 % más rápido** (carro: de 1,32× a 2,27× el tiempo real en Node), para todos los programas. El cálculo de la shield y los motores no era el freno. Además, el motor solo toca su texto y su flecha cuando cambian. Ver `COMO-FUNCIONA.md`, sección 50. **Falta confirmar en el PC de Efraín** (¿con cargador o con batería?).
- **Flecha:** ahora apunta hacia donde la rueda, apoyada en el piso, empujaría el robot: contra el reloj en el dibujo → izquierda. «Adelante» y «atrás» no cambian. El símbolo de giro de la vista del eje (⟲ ⟳) también sigue el giro que se ve, incluido el lado derecho reflejado.
- **Shield:**
  - los tres integrados van de pie y en fila, como en la placa real (L293D, 74HC595, L293D), con su nombre a lo largo;
  - los conectores de servo van arriba a la izquierda;
  - sin agujeros de montaje;
  - la bornera de M3 y M4 queda a la misma distancia del borde que la de M1 y M2.
- **Rueda:** los rayos son 3 veces más gruesos.
- **Pruebas:**
  - `probar_carro.py` comprueba que la flecha va hacia donde rueda cada llanta;
  - `npm run probar`: 17 grupos, 451 comprobaciones;
  - `test:simulador` de TecnoBloques: 28 de 28.

## 2026-10-10 — El programa de bloques del carro iba al 22 %: ahora va a tiempo real

**Lo que vio Efraín:** su proyecto «Carro Bluetooth» (bloques: `repetir por siempre → avanzar(255)`, con `setSpeed` y `run` de M1 y M2 en cada vuelta) simulaba al 28–40 %. El ejemplo del carro iba al 100 %.

- **Causa:** sin pausa, cada `run()` manda 8 bits al 74HC595, así que los pines 4, 8 y 12 cambian decenas de miles de veces por segundo. En cada cambio, el núcleo recalculaba las entradas al aire y lo que lee cada entrada. Reproducido con `programas/carro_continuo`: 0,22× el chip real.
- **Arreglo:** lo que leen las entradas se guarda por combinación de pines (`planDe`); una entrada solo se escribe si cambió; la clave de la combinación es un número que se actualiza con lo que cambió; el chip mira solo el puerto que se escribió; y `PinState` es una copia propia, sin los getters de esbuild. **Ahora va a 1,29×** (casi 6 veces más rápido). Ver `COMO-FUNCIONA.md`, sección 50.
- **Prueba:** `probar_potencia.js`, sección 7: con órdenes sin pausa, M1 gira atrás y M2 adelante, y se informa la velocidad. `npm run probar`: 17 grupos, 452 comprobaciones.
- **En TecnoBloques:** la lista de ejemplos se desplaza; antes los últimos (los de validación) quedaban fuera de la ventana.

## 2026-10-10 — Biblioteca de piezas y ficha de cada pieza

**Pedido de Efraín** (punto 4 del orden acordado): un panel de piezas con buscador y una ficha de cada pieza, como en Cirkit Designer o Tinkercad, pero propios. Hoy hay 9 piezas; con los módulos de 2027 pasarán de 15.

- **`src/biblioteca.js`:** tiene `CATEGORIAS` (Básicas, Entradas, Actuadores, Potencia y energía), `FICHAS` y `buscarPiezas()`. Cada ficha trae nombre, para qué sirve, las palabras del aula, los pines, los datos y la validación. Los datos salen de los mismos modelos del simulador.
- **Panel «+ Agregar»:**
  - las miniaturas de cada pieza y un buscador que ignora tildes y mayúsculas (Enter agrega la primera);
  - clic para agregar en el centro, o arrastrar para dejar la pieza donde se suelta, con encaje en la protoboard.
- **Ficha:** reemplaza las propiedades de la barra.
  - Va del lado contrario a la pieza, se aparta mientras se arrastra y se esconde con el panel abierto.
  - Plegada muestra solo las propiedades; empieza plegada en la vista dividida de TecnoBloques.
  - Muestra «✓ Probado con la placa real» o «◐ Por probar», con fecha y medidas.
- **Pruebas:**
  - `probar_biblioteca.py` (27 comprobaciones);
  - el contrato revisa que ninguna pieza quede sin ficha ni categoría;
  - las pruebas que usaban el menú buscan ahora los botones del panel;
  - `npm run probar`: 18 grupos, 482 comprobaciones;
  - `test:simulador` de TecnoBloques: todo bien.
- **El contrato no cambia:** `crearLienzo` tiene la misma API, y los botones de cada pieza conservan `data-accion` y `data-tipo`.

## 2026-10-10 — Cable de balance de la LiPo y probador de celdas (punto 5)

**Pedido de Efraín:** el probador del kit, con foto en `Imagenes_módulos`. Tiene 3 dígitos de 7 segmentos y muestra el voltaje total, el número de celdas (2S, 3S), «-1-» y el voltaje de esa celda, y así con cada una, y vuelve a empezar.

- **Batería:**
  - el cable de balance tiene sus pines (`BAL0` −, `BAL1` medio, `BAL2` +); `BAL0` y `BAL2` son los mismos puntos que `NEG` y `POS`;
  - cada carga dice el voltaje de cada celda;
  - nueva carga **desbalanceada** (3,95 + 3,45 V), con su aviso al empezar.
- **Probador de celdas** (`src/piezas/probador_lipo.js`, pieza Tecno original hecha a partir de la foto):
  - 9 pines (− y 1 a 8), dos zumbadores y la pantalla de 3 dígitos;
  - la secuencia total → «2S» → «-1-» → celda 1 → «-2-» → celda 2, cada 0,8 s;
  - pita y parpadea si una celda baja del umbral (3,3 V de fábrica; se elige en la ficha);
  - se alimenta de la batería y cuenta las celdas por lo que tiene conectado; un cable cruzado da una celda rara, como en el real.
- **Fallas nuevas:** `bateria_desbalanceada` y `probador_alarma`. `mediciones()` trae `probadores` y las `celdas` de cada batería, y la tabla los muestra.
- **Biblioteca:** el probador entra en «Potencia y energía» con su ficha. Ejemplos: «Probador de celdas (T3)» en la página y «Validar: probador de celdas LiPo» en TecnoBloques.
- **Pruebas:** `probar_potencia.js` (sección 8, 15 comprobaciones) y `probar_probador.py` (10). `npm run probar`: 19 grupos, 508 comprobaciones. `test:simulador` y `npm test` de TecnoBloques: todo bien.
- **Falta:** comparar la pantalla con la del probador real (cuánto dura cada cosa, el umbral de fábrica) y medir las celdas de la LiPo del kit (LEEME, «Validar el probador de celdas con el real»).

## 2026-10-10 — Cierre de la sesión

- `probar_pwm.py`: el desvanecido se muestrea 4 s en vez de 2,5 s. Con toda la suite corriendo, la ventana corta a veces no alcanzaba el pico (falló una vez con 61 %; sola, 3 de 3 con 78 %).
- `npm run probar`: 19 grupos, 508 comprobaciones. TecnoBloques: `test:simulador` 33 de 33 y `npm test` sin fallas.

## 2026-10-11 — Netlist de KiCad con la shield L293D desarmada

**Decisión de Efraín:** desarmada y con todos los componentes adicionales (4 condensadores y el LED de energía con su resistencia).

- **`src/kicad.js`:**
  - `SHIELD_KICAD`: U1 y U2 L293D, U3 74HC595 (DIP-16), borneras J5 y J6 (MaiXu MX126 de 5 mm), J7 EXT_PWR, J8 y J9 SERVO_1/2, JP1 PWR, C1 a C3 de 100 nF, C4 de 100 µF y R1 1k con D1;
  - `FUERA_KICAD`: el conector de cada pieza de afuera (motor, batería, balance, probador), solo si llega a la placa por otro lado que no sea un conector de la shield.
- **Fuente única:** los pines y las salidas del 74HC595 de AFMotor_R4 pasaron a `CONEXIONES_SHIELD` (`src/piezas/shield_l293d.js`), que usan el simulador y KiCad.
- **El puente PWR** es la pieza JP1 (VMOT y VIN como redes distintas). Los pines del Uno que la shield toca por dentro (D9, D10, VIN, GND…) entran aunque no tengan cable.
- **Arreglos en el camino:**
  - el balance de la batería no saca conector solo por compartir el − y el + con el cable de potencia;
  - un servo sin cables sigue en la netlist.
- **Pruebas:**
  - `probar_kicad.js`, con el carro y cada motor contra la tabla de AFMotor_R4 escrita aparte;
  - `probar_kicad_pcb.py`, que sigue el `extends` del símbolo L293D y acomoda las piezas en el primer lugar libre (girándolas si hace falta).
  - Con KiCad 10.0.3: 15 piezas nuevas sobre el Uno, 63 conexiones por trazar y ningún solape.
- **Por hacer con Efraín:** abrir el carro en KiCad (plantilla «Arduino Uno Shield» → Importar netlist) y acomodar las piezas. Opcional en el laboratorio: continuidad en la shield del kit, para comparar su cableado con el dibujo.

## 2026-10-11 — En TecnoBloques: CSV y graficador del monitor serial

- TecnoBloques ya guarda lo que llega por el monitor serial (de la placa o del simulador) y lo exporta a CSV para Excel en español, o lo grafica con una casilla por variable (Fase 2d; ver su bitácora).
- Del simulador usa el tiempo simulado (`sim.medidas().msSimulados`): los datos no dependen de la velocidad de la simulación.
- No cambia el contrato.

## 2026-10-11 — Revisión de código, CLAUDE.md más liviano y la publicación v0.1.0 preparada

**Pedido de Efraín:** una mirada distinta a la nuestra antes de publicar.

- **CLAUDE.md:** de 33 KB a 14 KB. Quedó como foto del estado, con la arquitectura real (la «prevista» nombraba carpetas que no existen); la historia sigue en esta bitácora.
- **`/code-review` (TecnoCircuito, 9 hallazgos, todos corregidos):**
  - **El más serio:** el chip corría los modelos «de cada milisegundo» al final de cada pedazo que le pedía el Worker, aunque no fuera un milisegundo entero. En la app, los servos, los motores, el fusible y las entradas al aire avanzaban de más; en pedazos de 4801 ciclos, una rueda giraba 48° cuando debía girar 125°. Las pruebas con Node no lo veían porque avanzan de a milisegundos exactos. Ahora el próximo milisegundo se cuenta en ciclos absolutos, con una prueba que lo atrapa.
  - **La shield agregada con la simulación corriendo** no veía los pines que ya estaban (D7 en BAJO, PWM quieto en 255): ahora los sigue siempre.
  - **La netlist:** con la batería al VIN y el probador en el balance, sacaba conectores del balance y del probador. Ahora mira los cables propios de cada pin, sin los puentes internos de la batería (`calcularNodos(…, { balanceInterno: false })`).
  - **Lo que leen las entradas** ya no se guarda cuando el circuito no se pudo calcular.
  - **Limpiezas:** el umbral «cárgala» sale del modelo de la batería; la tabla de la shield usa los mismos nombres que `CONEXIONES_SHIELD`; un comentario fuera de lugar; un `</div>` de más; `PESO` en `ciclosUtiles`.
- **Publicación preparada, sin etiquetar:**
  - `TecnoCircuito.VERSION` sale del `package.json` de la raíz (`0.1.0-dev` en desarrollo, `0.1.0` con `--etiqueta`).
  - `npm run preparar-version` arma `dist/tecnocircuito.js` en la raíz y lo revisa: versión exacta, contrato y que el paquete lleve solo lo necesario (campo `files`). También pide el árbol limpio y que la etiqueta no exista.
  - Probado instalando el paquete en TecnoBloques desde un archivo: el armado lo toma como «etiqueta», la app ve la 0.1.0 con contrato 1 y el carro simula.
- **Contrato, sección 9:** describe cómo se trabaja de verdad (`--simulador-local`) y que el instalador exige una etiqueta fija.
- `npm run probar`: 19 grupos, 593 comprobaciones.

## 2026-10-11 — Cierre de la sesión: documentación completa y el análisis de herramientas

**El análisis que pidió Efraín** (¿hacen falta skills adicionales o puntos de vista distintos?):

- **¿Una skill de diseño?** No como algo permanente: la que hay es para páginas publicadas, no para la app. Sí una **mirada independiente**: una revisión de experiencia de uso hecha por otro agente, que no trae nuestra conversación. El encargo está en CLAUDE.md («Próxima sesión», software 3). Lo que más pesa sigue siendo la **prueba con 2 o 3 aprendices**.
- **¿Una skill de grafos para gastar menos tokens?** No hace falta: el proyecto es mediano y las búsquedas puntuales bastan. El gasto de más estaba en el CLAUDE.md (se carga en cada sesión): bajó de 33 a 14 KB.
- **El riesgo de confiarnos:** las pruebas comparten los supuestos de quien las escribe. Las defensas son:
  - la placa real (regla 2);
  - la **revisión de código independiente** (`/code-review`): se hizo y encontró 19 problemas que las pruebas no veían, entre ellos el del reloj del Worker;
  - la revisión de seguridad, que queda disponible.
- **Decidido:** adelgazar el CLAUDE.md (hecho), `/code-review` en los dos proyectos (hecho), la revisión de experiencia de uso en paralelo (Efraín) y la publicación `v0.1.0` preparada (hecho, sin etiquetar).

**COMO-FUNCIONA, al día:**

- secciones nuevas:
  - **54:** el reloj de los modelos «de cada milisegundo»;
  - **55:** en TecnoBloques, el monitor para analizar y los paneles plegables;
  - **56:** cómo se publica una versión;
- **49 y 53**, ampliadas: la shield agregada en marcha y el criterio de las piezas de afuera en KiCad.

**Quedó listo para la próxima sesión:**

- el laboratorio (8 prácticas en CLAUDE.md, cada una con su ejemplo en TecnoBloques);
- después, etiquetar la `v0.1.0` con `npm run preparar-version`;
- el informe de la revisión de experiencia de uso, para decidir qué cambiar.

## 2026-10-11 — Codex: revisión independiente y acuerdo de trabajo con Claude

**Pedido de Efraín:** Codex toma el rol de revisor, evalúa el proyecto, verifica las pruebas documentadas por Claude y crea `AGENTS.md` a partir de la evidencia.

- Revisión de partida: `38930661b36f55653cd9ec7ca562cbb603262c5f`, sin cambios iniciales ni etiquetas locales.
- `npm run probar`: **593 comprobaciones, 19 grupos, 0 fallos**. KiCad 10.0.3 ejecutado: 108 checks, sin omisión. Las tres fixtures Mega verifican formato, sin ejecutar sus HEX.
- TecnoBloques local: `test:simulador` **37 OK** y graficador **28 OK**. `npm test` terminó con código cero, pero registró `tbmedia/sprites.svg` ausente y sus scripts no fallan ante todos los errores del navegador (R8).
- Los **15 programas** recompilaron para Uno con Arduino CLI 1.5.1 en salidas aisladas; la flash coincidió con cada HEX versionado.
- [Informe independiente](docs/REVISION-CODEX-2026-10-11.md): ocho hallazgos abiertos, dos altos (fuentes eléctricas por los puentes de la shield; enfriamiento del fusible con pasos parciales durante apagado), cinco medios y uno menor. Incluye contraste de los siete registros físicos, límites de la evidencia y propuestas de regresión.
- [Diagnóstico reproducible](docs/revision-2026-10-11.cjs) de R1–R6. Su ejecución confirma los casos; no es una suite aprobada ni corrige los defectos.
- `npm pack --dry-run` no lleva aún el bundle de la raíz: queda pendiente prepararlo para la etiqueta. No se ejecutó la preparación de versión ni publicación.
- [AGENTS.md](AGENTS.md) establece: Claude implementa, Codex revisa, Efraín decide; traspasos con archivos/revisión/pruebas, cierres por ID en esta bitácora y privacidad/licencias/validación física compartidas. CLAUDE.md enlaza el acuerdo y los pendientes.
- **Alcance de esta entrega:** documentación y reproducciones, sin cambios funcionales, medidas nuevas, modificaciones de HEX, commit, push ni etiqueta. Las pruebas físicas se contrastaron con los registros; no se repitieron con hardware.

## 2026-10-11 — Claude: corrección de R1 a R8 de la revisión de Codex

**Pedido de Efraín:** Claude evalúa la revisión de Codex, la confirma y corrige los puntos acordados. Para R4, Efraín decide revisar 200 mA por VCC y 200 mA por GND. Autor: Claude (implementa). Revisión de partida: `987980f`. Codex debe verificar cada cierre (AGENTS.md).

Antes de cambiar nada, el diagnóstico `docs/revision-2026-10-11.cjs` reprodujo los seis casos (R1–R6). Cierres, con su explicación en COMO-FUNCIONA, sección 57:

- **R1 (alta), fuentes por la shield:** `armarRed` (`src/motor/red.js`) decide si un pin de la placa está conectado por **su nodo** (`conectado(pin)`) y ya no por el texto del cable. Una resistencia de 1 kΩ en el conector de servo da 5 mA, igual que con cables al 5V; antes daba 0. Los voltajes de los pines conectados por la shield también se miden, así que una entrada en S1/S2_SIG se lee. Pruebas: `probar_motor.js` 9c (4).
- **R2 (alta), reloj con la placa apagada:** `seguirApagada` (`src/nucleo.js`) cuenta los ciclos que no completan un milisegundo (`ciclosApagada`). Prueba: con pasos de 1 ms, de 4 801 ciclos y mezclados, la placa vuelve a encender a los 2 991 ms en los tres casos. El diagnóstico da un calor de 0,99 tras 30 ms (antes 0,96).
- **R3 (menor por magnitud), corriente de los pines en el USB:** `iCircuito` suma lo que entregan los pines en ALTO; lo que reciben en BAJO no se cuenta dos veces. Prueba: 50 + 22,7 + 20,4 = 93,1 mA. El diagnóstico da 70,4 mA (antes 50).
- **R4 (media), límite del chip:** falla nueva `corriente_chip`, por encima de 200 mA entregados (VCC) o recibidos (GND), con `componente` `placa.VCC` o `placa.GND`. No se revisan los límites de 100 mA por grupo de puertos (no son de daño). Contrato: falla y tabla de `limitePin` documentadas, más una fila en el historial; sin cambios de API. Pruebas: `probar_motor.js` 9d (5), entre ellas diez LED con 100 Ω (23,8 mA cada uno, 238 mA en total).
- **R5 (media), HEX:** `src/hex.js` exige `largo + 5` bytes por línea y el largo de cada tipo. Pruebas en `probar_contrato.js` (4): una línea corta, una con bytes de más, un tipo con largo equivocado y un tipo inexistente.
- **R6 (media), fichas:** el LED solo dice «validado» en rojo; el SG90 dice quieto «menos de 10 mA» (los 6 mA son de la hoja de datos); el ruido del ADC es «una estimación». Los modelos no cambian. Pruebas en `probar_contrato.js` (3).
- **R7 (menor), documentos:** LEEME, README y el comentario de `servos_cuatro.ino` (el `.hex` no cambia). No se tocaron registros fechados.
- **R8 (media, en TecnoBloques):** ver su bitácora. `npm test` ya falla ante errores de JavaScript o un archivo local que no carga, y `tbmedia/sprites.svg` dejó de pedirse.

**Pruebas:** `npm run probar` con **611 comprobaciones** en 19 grupos, sin fallos (eran 593; 18 nuevas). KiCad se ejecutó. En TecnoBloques, con la copia local: `test:simulador` 37 de 37, `test:graficador` y `npm test` sin errores. El diagnóstico de Codex ya da los valores corregidos en R1–R6.

**Abierto:**

- Codex verifica R1–R8.
- Efraín decide la referencia del porcentaje del criterio (respecto de la medida, 5,02 % en la resistencia con 215 Ω; respecto del simulador, 4,8 %) y si se suma la incertidumbre del multímetro. No se cambiaron datos ni tolerancias.
- No hay medida física del ±1 % en tiempos.
- Sin commit ni etiqueta.

## 2026-10-11 — Decisión: el porcentaje del criterio se calcula respecto de la medida

**Decisión de Efraín**, a partir de la observación de Codex. El error de validación es `|simulador − medida| / |medida|`, y la incertidumbre del multímetro se informa aparte; ni los datos ni las tolerancias cambian.

- Con esta referencia, el LED rojo con 215 Ω da **5,02 %** en el voltaje de la resistencia (2,61 V medidos contra 2,741 V simulados). El resultado del 7 oct queda en **11 de 12 dentro y 1 en el límite**. El registro de ese día no se reescribe.
- **Falta:** tomar la exactitud del UT33B+ de su manual y pasar `probar_motor.js` a esta referencia (hoy divide por el simulador).

## 2026-10-11 — Codex: verificación de R1–R8 y requisitos de Nano + expansión E/S

**Pedido de Efraín:** leer Nano1–Nano8 de `prototipo/Imagenes_módulos`, guardar el criterio de exportación a KiCad y validar las ocho correcciones de Claude. Autor: Codex (revisor). Revisiones comprobadas: TecnoCircuito `5a543b1`, TecnoBloques `b09eb59`.

- `npm run probar`: **611 OK, 0 fallos, 19 grupos**, KiCad ejecutado (108 checks). Integración con TecnoBloques **37 OK**, graficador **28 OK** y `npm test` sin errores (exit 0).
- [Verificación independiente](docs/verificar-correcciones-2026-10-11.cjs): **34 comprobaciones aprobadas** de conexiones equivalentes, reloj apagado con pasos parciales, consumo GPIO/retorno, límites de VCC/GND, estructura HEX y fichas por variante. Se añade una observación aparte del criterio de porcentaje, sin cambiar datos ni pruebas existentes.
- [Verificación R8](docs/verificar-r8-2026-10-11.py): seis escenarios sobre los scripts originales del hermano. Ambos dan exit 0 normalmente y exit 1 ante errores JS o archivos locales ausentes inyectados en memoria; no se editó ni eliminó ningún archivo del hermano.
- **Cierres:** R1–R5, R7 y R8 verificados. R6 corrige los casos originales (colores del LED, SG90 y ADC), pero conserva la frase 12/12 en la ficha. **Queda pendiente su cierre documental** junto con la decisión posterior de Efraín: aplicar el denominador de la medida en `probar_motor.js` y alinear los textos vigentes. Bajo el umbral numérico de 5 %, el caso 215 Ω da **5,00836 % con el modelo completo** (5,02 % con el voltaje redondeado de la tabla) y supera ligeramente el límite; no contarlo como aprobado sin evidencia/criterio adicional. No se alteran datos ni tolerancias. La incertidumbre instrumental y los tiempos físicos siguen pendientes.
- [Informe de seguimiento](docs/VERIFICACION-CODEX-R1-R8-2026-10-11.md), conservando intacto el informe inicial. CLAUDE.md y AGENTS.md enlazan el estado verificado y sus pendientes.
- **Nano:** se inspeccionaron las ocho referencias locales. Roja y azul tienen disposición/conectores diferentes; Nano4 es la comparación detallada y Nano5 un icono. Las fotos permiten dibujar; continuidad, reguladores y alimentación deben confirmarse antes de compartir modelo eléctrico.
- **Decisión KiCad guardada en AGENTS.md:** del conjunto Nano + expansión se exporta el **módulo Nano**, los componentes adicionales que regulan/filtran **5V y 3,3V**, el **jack** y los conectores **I2C/SPI** con sus redes. La electrónica del Nano permanece dentro del módulo; el resto del circuito mantiene su exportación normal. KiCad instalado trae `Module:Arduino_Nano` y la variante con agujeros; escoger según el montaje real.
- **Alcance de la entrega:** instrucciones, informe y verificadores; tecnoparte Nano y exportador aún sin implementar. Sin cambios de producción, contrato, medidas, HEX, commit, push ni etiqueta. Imágenes comerciales y capturas permanecen excluidas de Git.

## 2026-10-11 — Claude: el criterio respecto de la medida, en la prueba y en los textos (cierre documental de R6)

**Pedido de Efraín**, tras la [verificación de Codex](docs/VERIFICACION-CODEX-R1-R8-2026-10-11.md): pasar `probar_motor.js` a la nueva referencia. Efraín confirmó la exactitud del UT33B+ en voltios DC: ±(0,5 % de la lectura + 2 dígitos). Autor: Claude. Revisión de partida: `6a19f9f`.

- **La regla:** una comparación cumple si `|simulador − medida| ≤ criterio · |medida| + U`, donde U es la incertidumbre del multímetro.
  - Voltaje: U = 0,005 · lectura + 2 × 0,01 V. Las lecturas tienen dos decimales, así que se tomaron en la escala de 20 V.
  - Corriente (V/R): la misma incertidumbre relativa que su voltaje; la de la resistencia medida no se cuenta.
  - No cambian los datos, las tolerancias ni el modelo.
- **Resultado:**
  - `probar_motor.js` informa **11 de 12 dentro del criterio y 12 de 12 sumando la incertidumbre**.
  - El caso en el límite es la resistencia con 215 Ω: 5,01 % (5,008 % con la precisión completa del modelo, como calculó Codex), con 2,61 ± 0,033 V.
  - Corrijo una cifra mía: el 5,02 % anotado antes en esta bitácora salía del valor redondeado de la tabla (2,741 V).
- **Textos alineados:**
  - La ficha del LED rojo dice «11 de 12 dentro del criterio; la que queda en el límite cumple con la incertidumbre del multímetro», con una prueba nueva en `probar_contrato.js`.
  - README, CLAUDE.md y COMO-FUNCIONA, sección 57.
  - El registro del 7 oct no se reescribe.
- **Sigue abierto:**
  - Codex verifica este cierre.
  - La medida del caso con 215 Ω sigue sin cerrar por 0,13 V (contactos o momento de la medida): repetirla midiendo en las patas de la resistencia daría evidencia mejor que la incertidumbre.
  - No hay medida física del ±1 % en tiempos.

## 2026-10-11 — El registro de eventos queda aprobado (contrato, sección 6.1)

**Decisiones de Efraín**, sobre una propuesta de Claude. Se documentan hoy y se implementan en la próxima sesión, antes del cierre de la etapa 0 (30 oct).

- **Por qué ahora:** el paquete ya emitía eventos, pero el contrato no definía sus campos. TecnoBloques los guardaba solo en memoria (2000 como máximo) y se perdían al cerrar la app. Un registro mal hecho no se puede repetir, y la versión del estudio se congela en enero.
- **Quién se registra:** el **equipo**, con un código sin datos de los aprendices; un aprendiz solo es un equipo de uno. La tabla código–integrantes no está en el software. Reemplaza al `alias` que nombraba la sección 6.
- **Cuándo:** apagado por defecto. Lo enciende el instructor en cada PC, y la app avisa en pantalla. El equipo escribe su código al abrir, con confirmación. «Exportar registros» es solo para el instructor.
- **Qué lleva:**
  - el sobre: `v`, `t`, `origen`, `tipo` y `datos`; `corrida` y `ms_sim` en los eventos del simulador; `equipo`, `sesion`, `version_tb` y `version_tc`;
  - el **circuito completo** en cada `simulacion_iniciada`, para que cada corrida se analice sola;
  - las **fallas de la corrida** en `simulacion_detenida`, para ver qué se corrigió;
  - `simulacion_pausada`, nuevo;
  - los eventos del editor definidos en el contrato, entre ellos `codigo_compilado` con el C++ **sin comentarios** (los textos entre comillas se conservan y se revisan al exportar).
- **Qué no lleva:** el monitor serial, el paso del mouse y los movimientos intermedios.
- **Queda para 2027:** la asignación de la condición (el campo `condicion` queda reservado) y cómo se registra el trabajo en parejas o equipos dentro del diseño del estudio.
- **Implementación** (CLAUDE.md, «Próxima sesión»): el esquema `contrato/evento.schema.json` con su prueba, después TecnoCircuito, después TecnoBloques, y Codex verifica.

## 2026-10-11 — Codex: cierre verificado de R6

**Pedido de Efraín:** validar R6 para cerrar la corrección. Autor: Codex (revisor). Implementación comprobada `7424f8a`; HEAD `968bdfa`. El registro de eventos aprobado en el segundo commit es un encargo posterior y no se valida en esta entrega.

- **R6 cerrado en software y documentación.** La referencia es la medida; se informan 11/12 comparaciones estrictas y 12/12 con el margen instrumental acordado. La ficha del LED, README, CLAUDE.md y COMO-FUNCIONA coinciden; los otros colores siguen por validar, SG90 distingue <10 mA medidos de 6 mA típicos y ADC conserva «estimación».
- Exactitud contrastada con la [ficha oficial UNI-T](https://meters.uni-trend.com/product/ut33plus-series/): voltios DC ±(0,5 % de lectura + 2 dígitos). Escala adoptada 20 V, resolución 0,01 V; no se confirmó el selector físico en esta revisión. U es el margen publicado usado por la regla acordada, sin una nueva calibración.
- Recálculo independiente: resistencia de 215 Ω, 2,61 V medidos y 2,740718203 V simulados; error 5,008360254 %. Diferencia 0,130718203 V frente a 0,1305 V de límite estricto; U = 0,03305 V, límite con U = 0,16355 V. No se cambian datos, modelos ni tolerancias. La corriente V/R propaga U de V con R fija, como documentó Claude.
- Pruebas afectadas: motor **28 OK**, contrato **76 OK**, biblioteca en Chromium **27 OK** y build reproducible. [Verificador de cierre](docs/verificar-cierre-r6-2026-10-11.cjs): **16 OK**, incluidos casos que deben fallar aun con margen. Recorrido adicional del LED rojo → azul: **3 OK**. Total de esta ejecución **150 comprobaciones aprobadas**.
- [Informe de cierre](docs/CIERRE-R6-CODEX-2026-10-11.md); AGENTS.md y CLAUDE.md actualizados. Los informes anteriores se conservan como historia. **R1–R8 quedan verificados** en el alcance de la revisión original.
- Sigue recomendada la repetición física de la medida de 215 Ω que no cierra por 0,13 V; también los tiempos físicos ±1 %, ADC con el programa corregido y las prácticas T3 pendientes. El cierre documental no certifica esas prácticas.
- Entrega sin cambios funcionales, nuevas medidas, commit, push ni etiqueta.

## 2026-10-11 — Codex: Contrato 1: Nano + expansión E/S

**Pedido de Efraín:** Codex asume desarrollo, pruebas y revisión del Nano clásico con expansión roja/azul; después del plan autorizó «puedes iniciar». Revisión de partida TecnoCircuito `30ecd7d`, TecnoBloques `07cc3dd`. Se mantiene formato/contrato 1. El registro de eventos aprobado en 6.1 sigue como encargo separado.

- **Implementación:** perfiles `uno`/`nano`/`nano_old`, un ATmega328P de 16MHz, ocho ADC en Nano y A6/A7 sin GPIO/PWM/pull-up. Dibujos SVG originales del módulo y expansión; 85 terminales, variantes roja/azul con referencias estables, conectores GVS/I2C/SPI/UART. Biblioteca compatible, ficha, Worker, guardado, perillas, SVG y netlist integrados.
- **Alimentación:** referencia propia USB/jack/desconectada, caídas y cargas de 5V/ambas salidas 3,3V, batería cableada prioritaria y umbral de reinicio de referencia. MNA/GPIO/ADC ven la alimentación calculada; reloj y modelos avanzan incluso con CPU apagada y pasos parciales. No se heredan las mediciones ni el fusible del Uno. Jack y 3,3V externos permanecen separados de VIN/3V3 del módulo. El reinicio Nano usa `energia_nano`, con su fuente; Uno conserva `energia_usb`.
- **KiCad según el pedido:** Nano como `Module:Arduino_Nano`, 30 pads; expansión como diez piezas adicionales de referencia: dos LD1117, tres condensadores10µF/25V, dos100nF, jack PJ-102AH, I2C4pines y SPI6pines. No se desarma el Nano ni se agrega una huella opaca de toda la expansión; el resto del circuito conserva su exportación. Cada parte adicional lleva una nota de pendientes físicos.
- **Revisión independiente e integración:** se corrigieron corto del jack que mantenía CPU encendida, carga directa del jack omitida en batería, diagnóstico de batería invertida, motor TT silencioso en 3,3V, servo sin VCC y reinicio del HEX al volver la fuente. Regresiones añadidas. También se rechazó `en` en expansiones montadas, se conservaron coordenadas físicas de GND/RESET al resolver aliases y se corrigió CSS que dejaba visibles piezas incompatibles. Una prueba antigua todavía exigía `PLACAS=['uno']`; se actualizó al soporte efectivo y se repitió la suite completa.
- **Verificación final:** `npm.cmd run probar`: **945 OK, cero fallas, 23 grupos**, KiCad ejecutado y 13 recorridos de Chromium. Núcleo Nano **93**, netlist Nano **59**, KiCad Nano **80**, interfaz Nano **76**, contrato ampliado **100**. La suite conserva las comprobaciones existentes de Uno, potencia, metrología R6 y fixtures. Los DRC de las tres placas Nano de comprobación muestran **0 infracciones** y **32/30/30 conexiones sin enrutar**, no una PCB terminada.
- **TecnoBloques:** nuevo ejemplo `val_nano_adc67` y guardado de expansión inicial sin editar; Nano/Nano antiguo compilados por Arduino CLI con sus FQBN, ejecutados en Worker y reabiertos con variante azul/cables/perillas/campos adicionales conservados. Cambio incompatible con GND3 conserva el montaje original para volver a Uno; Mega continúa deshabilitada. `test:simulador` **51 OK, cero errores JS**; graficador **28 OK**; `npm test` exit0 y ambos registros `ERRORES` vacíos. Se actualizan su bitácora y «Proyecto hermano».
- **Documentación:** CONTRATO4.2/esquema, README, LEEME, COMO-FUNCIONA58, CLAUDE y AGENTS. [Implementación, fuentes, supuestos y protocolo físico](docs/IMPLEMENTACION-NANO-2026-10-11.md). Fotos comerciales, capturas y logs continúan excluidos de Git. `dist/tecnocircuito.js` de la raíz no se actualiza: sigue reservado a la etiqueta; el bundle de desarrollo usa `0.1.0-dev`.
- **Pendiente físico:** identificar reguladores y jack, continuidad de ambas variantes, aislamiento USB/jack, dimensiones, curvas de carga, reposo, caída/reinicio, disipación y montaje de huellas. El circuito exportado es una referencia de diseño, no una reconstrucción acreditada de las fotos. Sin emulación de dispositivos/protocolos completos I2C/SPI, temperatura/protecciones ni mediciones nuevas. Hardware antes del aula/fabricación; sin commit, push, etiqueta o publicación en esta entrega.

## 2026-10-11 — Codex: validación manual de Nano por Efraín y autorización de entrega

Efraín abrió TecnoBloques con `npm run app:simulador`, confirmó que aparece el Nano y luego informó: «el programa corre y de manera independiente mide los dos potenciómetros en A6 y A7». Se registra como validación manual del recorrido de software, complementaria a las 945 comprobaciones automáticas y las pruebas del hermano. No se registraron mediciones físicas nuevas: alimentación, geometría y ambas tarjetas comerciales siguen por validar.

Tras esa comprobación autorizó **commit y push** de los cambios de Nano en ambos proyectos. Se actualiza el estado de CLAUDE.md y el registro de implementación; se conserva como historia la entrega anterior sin commit. Se entregan fuentes, pruebas, contrato, documentación y bundle de desarrollo. La etiqueta, el instalador y `dist/tecnocircuito.js` de la raíz mantienen su flujo separado.

## 2026-10-11 — Codex: Contrato 1: I2C junto a UART y seis salidas de alimentación

**Corrección de Efraín**, después de probar Nano en la app y de los commits `0f13119`/`dc018aa`: I2C está junto a UART, al final del módulo; confirmó que el bloque de seis contactos es **dos GND, dos 3V3 y dos 5V**. Nano4 también muestra esas etiquetas. La identificación como SPI del primer SVG era una suposición del diseño de referencia y se corrige; no se atribuye a una medida de continuidad.

- Vista roja/azul: I2C y UART juntos en el extremo opuesto al USB. El bloque de seis contactos muestra alimentación; se eliminan el falso rótulo SPI y los tres contactos sueltos que lo duplicaban. La vista queda con **82 contactos físicos**.
- Modelo: `OUT_5V_2`, `OUT_3V3_2`, `GND_OUT_2` comparten sus redes primarias. Los dos 3V3 externos siguen separados del 3V3 del módulo. Se comprueban carga, caída y consumo al usar cualquiera de cada par, en ambas variantes.
- Compatibilidad: el esquema conserva `SPI_MISO/MOSI/SCK/SS/V/G` como seis aliases heredados. Los cables antiguos conservan referencias y redes y se dibujan sobre los pines reales del Nano, sin contactos imaginarios ni reasignación a tensiones. No cambian formato/contrato 1.
- KiCad conserva el conector SPI solicitado como **conector añadido al diseño de referencia**, conectado directamente a los pines del módulo; una nota explícita impide confundirlo con el bloque de alimentación comercial. Exportación y pads conservados.
- Pruebas dirigidas: Nano **105 OK**, recorrido Chromium **81 OK**, contrato **100 OK**, exportación Node **94 OK** (35 Uno +59 Nano), PCB Nano con KiCad real **80 OK**, MNA **28 OK** y núcleo/potencia Uno **107 OK**; cero fallas. Total **595 comprobaciones** en esta corrección. Se inspeccionaron SVG/capturas de ambas variantes. La suite completa de 945 corresponde a la entrega anterior y no se vuelve a contar como ejecutada aquí.
- Se reconstruye TecnoBloques con la copia local para mostrar la corrección. Contrato4.2/esquema, ficha, README, LEEME, COMO-FUNCIONA59, registro de implementación, AGENTS y memorias/bitácoras de ambos proyectos actualizados. Sin commit, push o etiqueta de esta corrección; hardware y continuidad pendientes.

### 2026-10-11 — Codex: autorización de entrega y cierre de sesión

Efraín autorizó el commit y push de la corrección de Nano + expansión en ambos repositorios: I2C junto a UART y seis contactos de alimentación duplicada GND/3V3/5V. Evidencia de esta corrección: 595 comprobaciones aprobadas, cero fallas; las suites completas e integración Electron citadas arriba corresponden a la entrega anterior. Se conserva la compatibilidad de los cables SPI antiguos y el conector SPI añadido al diseño de referencia KiCad.

Punto de continuidad para la próxima sesión: retomar los ajustes de Nano + expansión según la prioridad de Efraín. Continúan pendientes la continuidad, identificación de componentes y mediciones de las tarjetas reales. Esta entrega no incluye etiqueta ni instalador.

## 2026-10-12 — Requisitos para aceptar dibujos de TecnoDiseñador (solo vista)

**Pedido de Efraín:** validar si el proyecto hermano `TecnoDiseñador` (`..\TecnoDiseñador`, pipeline de dibujo SVG desde fotos propias) sirve como entrada para la cadena de piezas nuevas, a propósito de una tarjeta basada en el chip ATMega2560, buscando alejarse de cualquier elemento con licencia de Arduino.

- **Revisión:** `TecnoDiseñador/CLAUDE.md` y `PROCESO.md` aplican la misma disciplina de licencia que este proyecto. Su componente `mega2560-clon-azul` se midió desde fotos propias de una placa clon (CH340), sin usar el `.brd`/`.sch` ni la foto oficial de Arduino (CC BY-SA); el dibujo que sí derivaba del CAD oficial ya se retiró de su carpeta.
- **SVG revisado** (`entrega/mega2560-clon-azul-caricatura-detallado-app.svg`): vector puro, solo atributos y gradientes nativos de SVG, sin bitmaps ni CSS — cumple el paso 4 de `RECETA-COMPONENTE-NUEVO.md`. Quedan dos ajustes antes de aceptarlo: está medido en milímetros en vez de la rejilla de 0,1" = 9,6 px de TecnoCircuito, y trae un bloque `<metadata>` con manifiesto C2PA que hay que quitar.
- **Decisión de Efraín:** se acepta TecnoDiseñador como fuente, pero **solo para la vista** («es solo cosmético»); terminar una Tecnoparte —modelo eléctrico, modelo lógico, ficha, pruebas, validación— sigue siendo trabajo de TecnoCircuito, sin excepción, y eso no se traslada a otro proyecto.
- **Documentado:** nueva sección «Cuando el dibujo sale de TecnoDiseñador (pieza solo vista)» en `prototipo/RECETA-COMPONENTE-NUEVO.md`, con el checklist de aceptación (licencia confirmada en su registro, SVG limpio, sin metadatos ajenos, reescalado a la rejilla, encabezado SPDX propio, trazabilidad al registro de origen, estado explícito «solo vista»). `CLAUDE.md` actualizado: relación con TecnoDiseñador y nueva fila en «Decisiones tomadas».
- **Pendiente, aparte:** el soporte funcional de un chip ATmega2560 sigue bloqueado por otro lado: avr8js no implementa los temporizadores 3, 4 y 5 de esa familia, y no hay nada de 2560 en `src/chip.js`. La vista se puede traer ya; simularla todavía no.
- Entrega sin commit, push, código nuevo ni pieza incorporada: solo validación y documentación del proceso de aceptación.

## 2026-10-12 — Claude: revisión de la implementación del Nano, correcciones y optimización

**Pedido de Efraín:** validar si la implementación del Nano de Codex tiene errores y si se puede optimizar. Primero se entregó solo el informe (Codex es el implementador asignado, AGENTS.md); después Efraín **autorizó corregir y optimizar**.

- **Revisión:** las pruebas de Codex pasaban (Nano 105, núcleo OK). Con scripts propios se reprodujeron tres problemas fuera de sus supuestos.
- **Cambiar de placa dejaba al aprendiz sin lienzo (grave).** `normalizar` lanzaba un error ante una pieza montada de otra placa o un cable a un pin inexistente. Un proyecto nuevo Nano (con su expansión automática) → Uno daba «No se pudo abrir el circuito» en TecnoBloques, sin forma de arreglarlo. Ahora el lienzo quita lo que no va (pieza montada de otra placa, expansión repetida, cables a piezas quitadas o a pines que la placa no tiene), ignora un `en` en piezas montadas y lo avisa en su barra. TecnoBloques no sobrescribe el circuito guardado si el lienzo trae menos piezas o cables: volver a la placa original lo recupera. `IOREF` se agregó al perfil del Uno (el esquema lo admite). Nota en CONTRATO (API del lienzo); formato y contrato 1 sin cambios.
- **VIN y el jack sin entrada eran una fuente de 0 V (medio).** Corto a GND escondido: un LED con 220 Ω del 5V al VIN se prendía al 92 %, y unir 5V con VIN daba un falso cortocircuito. Ahora esas fuentes existen solo con entrada (batería o jack). El corto del jack con la fuente de la propiedad lo avisa `alimentacion_nano.js` con un solo mensaje claro; los cortos de las salidas de la expansión se nombran como los ve el aprendiz, sin `exp1.OUT_3V3`.
- **Optimización:** en realista, `avanzarNano` borraba las soluciones guardadas cada vez que el 5V cambiaba más de 1 µV respecto del milisegundo anterior; con PWM eso era cada 2 ms (1532 borrados en 3 s; 1016 resoluciones del circuito en 1 s). Ahora compara contra lo último aplicado a la red con tolerancia de un paso del ADC (5 mV): 3 resoluciones en 1 s. Tiempo real por 3 s simulados, Nano realista: pwm9 1143 → 902 ms, desvanecer9 1514 → 1267 ms (Uno: 848 y 1233 ms). Mismos voltajes. Explicación en COMO-FUNCIONA, sección 60.
- **Pruebas:** `npm run probar` completo: **972 OK, cero fallas**, 23 grupos, incluidos KiCad real y Chromium. Nano **112** (+7: VIN/jack sin fuente, 5V–VIN sin falso corto, mensajes, resoluciones con PWM) e interfaz Nano **84** (las tres pruebas «la API rechaza…» pasan a comprobar la adaptación; +3 del cambio de placa en los dos sentidos). TecnoBloques: `test:simulador` **52 OK** sin errores JS (prueba del GND3 actualizada + proyecto nuevo Nano → Uno) y `npm test` exit 0 con `ERRORES` vacío.
- **Quedan para decidir con Efraín (no se cambiaron):** el aviso `nano_referencia` sale como falla en cada simulación del Nano (aviso emergente en TecnoBloques y, con el registro de eventos, en `simulacion_detenida`); elegir «Desconectada» suma un `reinicio_placa`; al presionar un botón se recalcula la alimentación sin carga durante 1 ms.
- Sin mediciones físicas nuevas. `dist/tecnocircuito.js` de la raíz no se toca. Sin commit ni push.

## 2026-10-12 — Claude: el modelo de referencia deja de ser falla; desconectar a mano no es reinicio

Efraín aprobó las dos sugerencias que quedaban de la revisión del Nano y autorizó el commit y el push si la validación salía sin errores.

- **Sin `nano_referencia`:** el aviso de modelo de referencia ya no se emite como falla en cada corrida (aviso emergente en TecnoBloques, `simulacion_detenida` del registro de eventos). Lo siguen diciendo la ficha y la tabla de mediciones.
- **`reinicio_placa` del Nano solo por caída de carga:** quitar la fuente a mano (Desconectada, sin batería, jack a 0 V) vuelve a empezar el programa sin contar un reinicio; el lienzo ya lo registra como `componente_cambiado`. La caída por lo que pide el circuito sigue contando y avisando `nano_bajo_voltaje`.
- Contrato: el párrafo de diagnósticos del Nano (sección 4.2) se actualiza; formato y contrato 1 sin cambios. COMO-FUNCIONA, sección 60.
- Pruebas: Nano **114** (+2: ciclo a mano sin reinicio y sin `nano_referencia`; carga de 6 Ω con jack de 4 V que sí reinicia). Interfaz Nano: la prueba del evento `energia_nano` al desconectar se invierte (no debe aparecer).

## 2026-10-12 — Claude: especificación de entrega de vistas para TecnoDiseñador

**Pedido de Efraín:** documentar qué se espera de TecnoDiseñador y todos los datos que necesita TecnoCircuito al recibir un SVG, para migrar sin problemas. TecnoDiseñador entrega **solo apariencia**; la funcionalidad es de este proyecto.

- **Diagnóstico previo:** hoy el Nano, la expansión y la shield L293D son funciones JS que generan su SVG y calculan los pines en el mismo lugar (14, 35 y 15 KB, sin `id`). El Uno es de `@wokwi/elements`. La entrega real de TecnoDiseñador (2560 clon) está en mm con origen negativo, pesa 140–246 KB con unos 1.100 elementos, usa `id` genéricos (en la vista en vivo el lienzo no les cambia el nombre: chocarían entre piezas) y **no exporta la posición de los pines**, aunque su generador la calcula.
- **Especificación:** [docs/ENTREGA-VISTAS-TECNODISENADOR.md](docs/ENTREGA-VISTAS-TECNODISENADOR.md). Reparto de tareas; salida adicional `-tc.svg` + `-tc.json`; SVG en mm con origen arriba a la izquierda, sin CSS, filtros, máscaras ni metadatos, `id` con prefijo `td-`, `<text>` en Arial y máximo 50 KB; `data-contacto` (centro exacto = JSON), `data-led` (una forma con su color apagado) y `data-parte` (`g` sin transform). Fichas: Nano (30 pines con número físico), expansión roja/azul (82 contactos, marco común con el Nano, sin ventana) y shield L293D (18 contactos, marco y headers impuestos por el Uno de wokwi, que no respeta un paso exacto de 2,54 mm; versión App sobre su 2560 aparte). Orientación para servo, motor, LiPo y probador. Cómo informar diferencias sin inventar nombres.
- **Decisiones adoptadas** (las recomendaciones de la conversación, ajustables por Efraín): el Nano va encima de la expansión y la capa la ordena TecnoCircuito; texto como `<text>` Arial; límite de 50 KB; `GND1`/`RESET` = pines 29/28 y `GND2`/`RESET2` = pines 4/3, como el lienzo actual.
- **Revisor:** `prototipo/pruebas/revisar_vista_td.py` (Python estándar; lee los nombres de `contrato/circuito.schema.json`). Se probó con una entrega sintética armada desde la geometría actual (Nano, roja y azul: 73 comprobaciones, cumple, incluido el paso de 2,54/15,24 mm) y con una rota a propósito (8 fallas detectadas: `<image>`, `data:`, CSS, decimales, prefijo, contacto inventado y faltante, LED faltantes).
- **Pendientes de TecnoCircuito para la migración** (sección 9 de la especificación): orden de capas Nano/expansión, `data-led-pwr`/`data-puente` → `data-led`/`data-parte`, y alinear `GND1`/`GND2` y `RESET`/`RESET2` en la netlist de KiCad (hoy pads 4/3, al revés que el lienzo; misma señal eléctrica).
- En TecnoDiseñador (no es repositorio git): `PROCESO.md` (pasos 1 y 8), `CLAUDE.md` («Relación con otros proyectos») y su bitácora enlazan la especificación. Receta de componente nuevo enlazada. Sin cambios de código funcional. Sin commit.

## 2026-10-12 — Claude: el Uno pasa a Pieza Tecno (paso exacto de 2,54 mm en todas las placas)

**Decisión de Efraín:** documentar la necesidad de hacer el Uno como Pieza Tecno, para que ninguna placa del simulador tenga discrepancias con el paso exacto de 2,54 mm.

- **Evidencia:** las coordenadas actuales del Uno de `@wokwi/elements`, pasadas como entrega por `revisar_vista_td.py`, fallan la regla: SCL→SDA 2,64 mm, SDA→AREF 2,39, D9→D8 2,64, 3V3→5V 2,64, y el resto en 2,51. El Nano actual sí la cumple (2,54 y 15,24 mm). Consecuencia: una shield medida de verdad no encaja en el dibujo del Uno; por eso la especificación tenía que imponerle a la shield coordenadas falsas.
- **Especificación de entrega** (`docs/ENTREGA-VISTAS-TECNODISENADOR.md`): nueva **6.0**, una regla para todas las placas (paso exacto dentro de cada header; las separaciones entre headers se miden y se informan). Nueva **6.5**, la ficha del Uno R3 Tecno: Uno del kit con fotos propias; USB y jack a la izquierda; marco = placa + lo que sobresalen el USB y el jack, compartido con la shield; 31 contactos con los nombres actuales (`GND1` del header digital, `GND2`/`GND3` de alimentación, `SDA`/`SCL` con agujero propio; el pin sin rótulo y el ICSP sin contacto); LED `PWR`/`L`/`TX`/`RX`. La 6.3 pasa a provisional: con el Uno Tecno, la shield tiene una sola salida (la de la App), y se recomienda dibujar primero el Uno. La sección 9 suma la migración del Uno (`PLACAS.uno` deja `wokwi-arduino-uno`; los headers de la shield salen del JSON del Uno).
- **Revisor:** comprueba el paso en cualquier placa (Nano y Uno) y reconoce `uno` (`pines-placa-uno`). Entregas sintéticas: Nano, roja y azul cumplen (74 comprobaciones); el Uno de wokwi falla solo en el paso.
- `CLAUDE.md`: decisión nueva en la tabla y encargo planeado (primero el Uno, después la shield). TecnoDiseñador: pendiente y bitácora con el encargo.

## 2026-10-12 — Claude: revisión independiente del trabajo del día y correcciones

**Pedido de Efraín:** validar con un segundo agente si quedaron errores. Lo revisó un agente aparte, que solo revisó y no cambió nada.

- **Sin errores en el simulador.**
  - Comparó el núcleo de antes y de después de `1f5b3ac`: el Uno da los mismos resultados en ideal y en realista (parpadeo, potenciómetro con PWM, entrada flotante, 5V–GND, cuatro servos, carro con shield y LiPo).
  - Confirmó las cifras: Nano 114, interfaz Nano 84, TecnoBloques 52, 1016 → 3 resoluciones por segundo.
  - Confirmó que el bundle del commit es idéntico byte a byte al construido desde el código.
  - Encontró coherentes el contrato, la sección 60 y las tablas de la especificación.
- **Corregido en `revisar_vista_td.py`:**
  - Prefijo exacto por pieza (`td-nano-`, `td-exp-roja-`/`-azul-`, `td-uno-`, `td-l293d-`) y ningún `id` repetido entre piezas de una familia (antes Nano y expansión podían compartir `td-gPcb`).
  - Un contacto que falta tiene que estar nombrado en `diferencias` (antes bastaba cualquier frase); el paso de 2,54 mm se revisa con los pines presentes.
  - Sin errores de Python ante datos incompletos.
  - Decimales sin cero inicial (`.125`).
  - Unidades dentro del dibujo (`cx="11.22mm"`).
  - `url('#…')` con comillas, atributos de otros programas (`inkscape:…`), contactos en `<defs>`, `data-led`/`data-parte` repetidos y forma del LED.
  - `width`/`height` de la raíz en mm y marco fijo de la shield.
  - Ya no da falso positivo por un texto que diga «data:».
  - Probado con las 13 entregas sintéticas del revisor y las propias: cada una da la falla esperada o pasa, según el caso.
- **Especificación:**
  - Prefijos exactos.
  - Saltos del Uno de wokwi sin redondear (2,65 y 2,38 mm).
  - El Uno Tecno queda **anclado**: marco fijo de 72,58 × 53,34 mm, con la placa en (4; 0). Así, los circuitos guardados se corren menos de 0,3 mm.
  - Regla de los contactos que faltan.
  - **Decisión de licencia pendiente para el Uno:** el del kit es original (CC BY-SA). Recomendación: dibujar un clon si lo hay; si no, el original sin pistas.
- **TecnoBloques:** si lo guardado es solo la expansión por defecto del Nano (sin cables ni otras piezas), `abrirLienzo()` la reemplaza en vez de conservarla. Antes, un proyecto nuevo que pasaba por Nano y volvía a Uno repetía el aviso cada vez que se abría. `test:simulador` **52 OK**.
- **Riesgos sin cambios, de bajo impacto:** con «Desconectada», 5V y 3V3 siguen siendo fuentes de 0 V; JACK/VIN podrían quedar en 0 V si una batería llegara a 0 V a mitad de la corrida (harían falta unos 148 A).
- La fecha de fotos del Uno queda agendada en el laboratorio (punto 9). Sin commit.

## 2026-10-12 — Claude: imán entre pines (enchufar sin cables)

**Pedido y decisiones de Efraín:** que el imán funcione también entre pines, para conectar directo lo que en la mesa se enchufa (vio que el probador, con su zumbador, no se podía enchufar en la batería). Alcance: **todo lo físicamente posible**; guardar en el campo `en` ampliado; implementar ahora.

- **Contrato:** `en` acepta `"<id>.<pin>"` (otra pieza o la placa), además de `"protoboard.<hueco>"`. Esquema, revisor (`pruebas/contrato.js`: destino existente, no en sí misma, un pin recibe una sola pata) y CONTRATO.md con su fila de historia. Sin etiqueta publicada, el cambio no rompe proyectos.
- **Núcleo:** `conexiones.js` une las patas enchufadas aunque no haya protoboard. `red.js` y `kicad.js` cuentan una pata enchufada como un cable (si no, un LED directo en D13 no recibía la salida del pin y D13 no entraba a la netlist).
- **Lienzo:**
  - `calcularEnchufe` busca pares pata–pin (6 px), elige el corrimiento que enchufa más patas y alinea (3,5 px de tolerancia).
  - Vista previa en verde.
  - Lo enchufado se mueve con la pieza; al alejarla, se desenchufa.
  - Girar o borrar la «madre» suelta lo enchufado.
  - El imán actúa solo al soltar: no al girar ni al agregar con un clic.
  - Los pines ocupados no reciben clics ni otra pata.
  - Rótulo «enchufada en …».
  - `normalizar` valida cada entrada y avisa las que se pierden.
  - Textos de ayuda actualizados.
- **Pruebas nuevas:** contrato +6; potencia +4 (probador directo = cables, al revés marca mal, servo en SERVO_2 = cables, LED directo se quema); KiCad +1; Chromium `probar_enchufe.py` **18 OK** con arrastre real (incluido en `npm run probar`). Capturas revisadas: el probador queda con sus pines dentro del balance y el LED en GND/13.
- COMO-FUNCIONA, sección 61. TecnoBloques: nota en su bitácora y en «Proyecto hermano». Sin commit.

## 2026-10-12 — Claude: revisión independiente del imán entre pines y correcciones

Efraín pidió revisar el imán con un segundo agente antes del commit. **Sin errores en lo eléctrico ni en KiCad:** en 12 montajes, las fotos del núcleo con `en` y con cables fueron idénticas cuadro a cuadro, y en 9 la netlist también. La protoboard quedó igual que antes (29 OK en las dos versiones), el arrastre tarda 0,4 ms de mediana con 12 piezas y Nano + expansión, y los ciclos no cuelgan el lienzo. **Errores en el lienzo, corregidos:**

- **Patas unidas a la distancia (medio):**
  - Cuando una pieza se lleva otra enchufada que también iba en algo quieto.
  - Cuando la protoboard se lleva una pieza mezclada.
  - Al cambiar una propiedad que mueve los pines (el lado del motor, la variante de la expansión).

  Corrección: `revisarEnchufes()` después de soltar, girar y rehacer un dibujo. Una pata sigue enchufada solo si sigue a menos de 3,5 px de su destino. Al girar, ahora se suelta solo lo que quedó lejos, no todo el `en`.
- **Mezclado pin + hueco (medio):** una pata quedaba visualmente en un hueco sin conducir. Ahora los huecos libres también son destino, y el imán se ancla siempre en un pin.
- **TecnoBloques (medio):** al cambiar de placa no contaba los enchufes, y se perdían al volver. Ahora los cuenta.
- **Al abrir (menor):** se sueltan las patas que la pieza no tiene, las que apuntan a un pin que ya recibió otra, las que van a sí misma o a un alias. El aviso ya no culpa a la placa: «Se soltaron N conexiones directas sin destino».
- **Contrato (menor):**
  - El patrón de `en` es igual al de los cables, así que `placa.D13.x` se rechaza.
  - Una pata no se enchufa en un alias (SDA del Nano, `SPI_*`).
  - El revisor separa la referencia por el primer punto.
- **Pruebas (menor):** la del probador «al revés» pasaba aunque el `en` se ignorara. Ahora hay dos:
  - con las celdas cruzadas pita (prueba que el enchufe se usa);
  - al revés no enciende.

  La tabla dice «el − va al negro del balance (al revés no enciende)». COMO-FUNCIONA (sección 61) decía que el probador al revés «marcaba mal»; se corrigió ahí.
- **Pruebas nuevas:**
  - `probar_enchufe.py`: 18 → 25. Las siete nuevas **fallan con el código anterior** (comprobado con la copia del revisor) y pasan con el corregido.
  - Contrato: +3.
  - TecnoBloques `test:simulador`: 53 OK (LED en GND3: se suelta en el Nano y se recupera en el Uno).
- **Quedan como decisiones de diseño abiertas:** sin distinción macho/hembra, y el radio de 6 px. Están en COMO-FUNCIONA, sección 61.

## 2026-10-14 — Claude: vistas de TecnoDiseñador (Uno, Nano y expansión roja/azul)

**Pedido de Efraín:** integrar los SVG que ya entregó TecnoDiseñador sin reducir nada del funcionamiento actual, para luego publicar y probar desde TecnoBloques. Antes de empezar se le explicó la metodología (línea base, importador, Nano, Uno, pruebas, TecnoBloques, revisión, documentación) y aceptó las tres recomendaciones: seguir a la placa real en el bloque de seis, que Claude haga también la familia Nano (Codex revisa) e integrar ahora pero etiquetar después del laboratorio.

- **Revisor de la entrega:** las cuatro entregas cumplen la especificación. Diferencia importante: el bloque de seis contactos de la expansión real es **tres 3V3 y tres GND, sin 5V**.
- **Contrato (decisión de Efraín):** entran `OUT_3V3_3` y `GND_OUT_3`; `OUT_5V`/`OUT_5V_2` quedan como aliases del 5V del Nano, como los `SPI_*`. Esquema, revisor, CONTRATO (4.2 e historial), especificación de entrega, AGENTS.md y las dos bitácoras. En TecnoDiseñador se nombraron los terceros pines en `generar_nano_expansion.py`: solo cambian las salidas `-tc` (el maestro, el `-app` y los PNG salen idénticos byte a byte).
- **Importador `npm run vistas`:** pasa el revisor y escribe `src/piezas/vistas/*.js` (versionados). `src/piezas/vista_td.js` pone mm → px, título y LED (`data-encendido`).
- **Uno:** Pieza Tecno `src/piezas/uno.js`, mismos 31 pines y mismo marco; los pines se corren menos de 0,5 mm. La shield L293D toma sus headers apilables del Uno medido. Ya no se usa `wokwi-arduino-uno`.
- **Nano y expansión:** marco 60 × 53,5 mm; el Nano va encima de la expansión (`debajo`), sin ventana; la placa solo recibe el clic donde está pintada. El LED PWR de la expansión sigue al Nano. La roja y la azul tienen la misma geometría.
- **KiCad:** `GND2`/`RESET2` del Nano son los pads 4/3, como en el lienzo (especificación 9.5). Solo cambia el rótulo de dos pads de GND.
- **Worker:** los dibujos se colaban en el Worker (de 90 a 232 KB) porque llega a los módulos de la shield y la expansión. Las llamadas van con `/* @__PURE__ */` y `construir.js` se detiene si vuelve a pasar. Paquete: 282 → 430 KB; Worker: 89 KB.
- **Miniaturas:** renombran sus `id`, para no compartir degradados con la pieza del lienzo.

**Cómo se comprobó que no se perdió nada:**
- Línea base antes de tocar código: suite (1014 OK, 0 fallas), netlist y mediciones de 12 circuitos (ejemplos de validación de TecnoBloques, `t1_protoboard` y dos sintéticos del Nano con los nombres viejos) y capturas.
- Después: mediciones idénticas en los 12; netlist idéntica en los del Uno; en los del Nano solo cambian los rótulos de los pads 4 y 29.
- `probar_vistas.py` nuevo (29): contactos sobre sus puntos (±0,05 px) en las cuatro vistas, LED con la simulación, clic a través del marco del Nano, aliases dibujados sobre el Nano, pata en `OUT_5V` que se suelta con aviso, `id` sin repetir y SVG exportado válido.
- Pruebas ajustadas porque dependían del dibujo viejo: contrato, simulación, prototipo, SVG, Nano (UI y Node) y KiCad Nano.
- Resultado: suite completa **1053 OK en 25 grupos, 0 fallas** (antes 1014 en 24). TecnoBloques: `test:simulador` **53 OK** (se ajustó la búsqueda del LED «L» y del dibujo exportado de la expansión) y `npm test` con exit 0 y sin errores.

**Revisión independiente (`/code-review`, alta):** 8 hallazgos.
- Corregidos: los aliases de la expansión estaban en dos tablas (ahora `ALIASES_EXPANSION` es la fuente única de dibujo y red); la lista de rieles de `red.js` se deriva de la pieza; el importador acepta BOM, comentarios y DOCTYPE al inicio y conserva el espacio entre `<tspan>`; una sola función `renombrarIds` para miniaturas y exportación; `--origen` sin carpeta da un mensaje claro. Los módulos generados y la línea base de comportamiento siguen idénticos.
- Para decidir con Efraín: al abrir un proyecto, un `en` que apunte a un pin del Nano o de la expansión queda enchufado aunque el pin se haya movido (unos 18 px). Es lo que dice el contrato («al abrir, el `en` manda»), y el Nano y el imán no se han publicado, así que no hay proyectos del aula afectados. En el Uno el corrimiento es menor que la tolerancia del imán.
- Costo aceptado: las dos variantes van como SVG completos (unos 88 KB). Un solo dibujo con paleta por variante lo reduciría; queda como mejora.

**Pendiente:** revisión de Codex para la familia Nano, validación física sin cambios (los dibujos están medidos; la continuidad, el jack y los reguladores no), la shield L293D de TecnoDiseñador y la etiqueta `v0.1.0` después del laboratorio. Commit y push: a la espera del sí de Efraín.

## 2026-10-14 — Claude: LED de las placas e imán del Nano al abrir

**Pedido de Efraín** (después del commit `4a4377f`): mejorar el imán del Nano (no hay proyectos publicados) y los LED. Eligió las cuatro mejoras propuestas para los LED.

- **RX:** destella cuando el monitor serial le envía datos a la placa (`chip.alByteRecibido`). Antes nunca se prendía.
- **L con brillo promedio:** el núcleo informa `brilloL`, la parte de la ventana con el pin 13 en ALTO. Si el pin cambia más rápido que la foto, L se ve a medio brillo en vez de parpadear al azar. Programa de prueba nuevo: `programas/rapido13` (1 kHz, 25 %).
- **Halo:** el LED encendido toma un color según su brillo y un resplandor de su color (dos `drop-shadow`, con el radio medido sobre el LED, porque se miden en las unidades del dibujo).
- **Shield L293D:** `data-led="PWR"` con el mismo sistema, y el capuchón como `data-parte="puente-pwr"` (especificación, 9.4).
- **Imán al abrir:** una pieza enchufada cuyas patas quedaron fuera de la tolerancia (vista nueva del Nano) se corre con lo que cuelga de ella hasta sus pines, si todas piden el mismo corrimiento. Si no caben juntas, se queda enchufada donde estaba, como dice el contrato. Dentro de la tolerancia no se mueve nada.
- COMO-FUNCIONA, sección 63.

**Pruebas:** suite completa **1064 OK, 0 fallas** (antes 1053); TecnoBloques `test:simulador` **53 OK**. Sin cambios en el contrato: `brilloL` y `ledRX` son internos (Worker → lienzo).

## 2026-10-14 — TecnoDiseñador: shield L293D entregada y aprobada (Claude, desde TecnoDiseñador, con Efraín)

**Pedido de Efraín:** dejar anotado en TecnoCircuito lo que hay que tener en cuenta al implementar la shield medida. Solo se tocó documentación: `CONTRATO.md` (una nota de pendiente bajo la tabla de piezas, sin cambiar el formato) y la ficha 6.3 de `docs/ENTREGA-VISTAS-TECNODISENADOR.md`. No se tocó código, esquema ni pruebas.

- **Entrega:** `..\TecnoDiseñador\componentes\l293d-shield\entrega\tecnocircuito\shield_l293d-tc.svg/.json`. `revisar_vista_td.py` aprueba la familia Uno + shield (59 comprobaciones).
- **Decisiones de Efraín:**
  - la vista medida **tiene prioridad** sobre el dibujo actual de `shield_l293d.js`;
  - los headers **+5 / Gnd / A0-5 deben poder cablearse** (contrato pendiente; propuesta `A0_S`…`A5_G`);
  - el capuchón del puente PWR va dibujado puesto;
  - el texto es «Motor Shield L293D Rev4»;
  - los chips de la placa física ya están en su lugar: IC3 = 74HC595.
- **Hallazgos principales** (detalle y tabla de corrimientos en `HALLAZGOS-PARA-TECNOCIRCUITO.md`):
  - **servos invertidos:** SER1 arriba y pines «− + S»;
  - **bornera M1/M2 7,4 mm más abajo;**
  - LED1 verde de 5 mm entre IC1 e IC3;
  - headers apilables R2, sin SCL/SDA/IOREF;
  - la shield sobresale 0,5 mm del marco.

**Pendiente en TecnoCircuito:** importar la vista, ajustar servos y actividades, decidir los nombres de los headers analógicos (contrato, esquema y revisor) y validar en el laboratorio. Commit y push: a la espera del sí de Efraín.

## 2026-10-14 — Claude: la shield L293D medida, sus headers analógicos y los pines que tapa

**Pedido de Efraín:** leer los hallazgos de TecnoDiseñador sobre la shield, verificarlos y enumerar los cambios. Después aceptó las tres recomendaciones: nombres `A0_S`/`A0_V`/`A0_G` para los headers analógicos, tapar SCL/SDA/IOREF con la shield montada y dejar el recorte de 0,5 mm del borde.

- **Verificación:** el revisor aprueba el 1st + la shield; los 18 corrimientos del documento coinciden con el código (±0,01 mm). Cuatro hallazgos propios: SCL/SDA/IOREF tapados, los headers analógicos 1,18 mm a la izquierda de A0–A5, el servo enchufado con el imán que ahora va girado 270°, y los dobleces del ejemplo del carro.
- **Contrato:** la shield pasa de 18 a 36 contactos (`A0_S` … `A5_G`); con la shield montada, SCL, SDA e IOREF quedan tapados. Esquema, CONTRATO, especificación de entrega y las dos bitácoras; «Proyecto hermano» en TecnoBloques.
- **TecnoDiseñador:** `generar_l293d_shield.py` pone los 18 `data-contacto` (A0 a la izquierda); solo cambian las salidas `-tc`.
- **TecnoCircuito:** `npm run vistas` trae la shield; `shield_l293d.js` usa la vista medida (sin dibujo propio ni `HEADERS_UNO`); puentes eléctricos de los headers; `tapa` en el catálogo y `tc-tapado` en el lienzo; `aplicarShield` muestra u oculta el capuchón; KiCad con J10–J12 y LED de 5 mm; ficha actualizada; dobleces del ejemplo del carro en la página y en TecnoBloques.
- **Revisión independiente (`/code-review`, media):** corregidos el LED apagado que parecía encendido (verde oscuro propio), los headers marcados como «externos» en KiCad (un servo en A0/5V/GND perdía su conector; prueba que lo detecta), el capuchón aplicado sobre el DOM y el aviso de pines tapados. La prueba de PCB acomoda sin margen extra entre patios (el DRC revisa los solapes) y en saltos de 0,25 mm.
- **Línea base:** las mediciones de 13 circuitos (uno nuevo con dos servos en la shield) son idénticas; la netlist solo suma J10–J12 y la huella del LED.
- COMO-FUNCIONA, sección 64.

**Para el laboratorio:** qué llega a cada fila de los headers analógicos y su separación (3,03 mm en la foto, ¿o 2,54?), el orden − + S de los servos, LED1 y el puente PWR.

**Pruebas:** suite completa **1087 OK, 0 fallas** (antes 1064); TecnoBloques `test:simulador` **53 OK**.

## 2026-10-14 — Claude: decisión de Efraín, el paso estándar manda sobre la foto

Las filas +5 / Gnd / A0-5 de la shield van a **2,54 mm** entre sí (la entrega las tiene a 3,03 y 3,08 mm, como la foto). El estándar manda porque los pines reales tienen juego. Queda documentado para TecnoDiseñador: en su `CLAUDE.md` (decisión «Paso estándar de los headers» y pendiente 7), en su BITACORA y en `HALLAZGOS-PARA-TECNOCIRCUITO.md`. Aquí, en la especificación de entrega (sección 6.0) y en COMO-FUNCIONA (sección 64). Cuando regenere, basta `npm run vistas` y las pruebas: los nombres de los contactos no cambian.

## 2026-10-14 — Validación humana de las vistas y encargo para la próxima sesión (Efraín, con Claude)

**Efraín probó la app** (TecnoCircuito `d5ab43f`, TecnoBloques `fc81d23`): corrió todos los ejemplos y cambió los pines de las piezas enchufadas para validar el imán. Todo pasó y el imán funciona de manera satisfactoria. «Está gráficamente genial.» A los aprendices les gustó el diseño de las placas, muy cercano a la realidad, y el dibujo caricaturesco les fascinó: **aceptación 10/10**. Registro: `validacion/2026-10-14-vistas-uso.md` (validación de uso, no eléctrica; sin datos de los aprendices).

**Para la próxima sesión, solo software:**
1. **LED y resistencia como Piezas Tecno**, dibujados por TecnoDiseñador, para que todas las piezas de la suite nos pertenezcan.
2. **La resistencia en dos tamaños:** uno más pequeño para 0,5 W y el diseño actual para 2 W.
3. Antes del encargo a TecnoDiseñador, TecnoCircuito define sus fichas de vista y le explica el plan a Efraín.
4. El pulsador y el potenciómetro siguen siendo de wokwi; quedan anotados para completar la suite.

Anotado en `CLAUDE.md` («Próxima sesión») y en los pendientes de TecnoDiseñador.

## 2026-10-15/16 — Laboratorio de T3: shield, LiPo, motor y probador medidos (Efraín, con Claude)

**Efraín midió en el laboratorio** (15 oct) con la hoja `validacion/2026-10-15-hoja-laboratorio-t3.md`, que traía las predicciones del simulador. Registros: `validacion/2026-10-15-shield-continuidad.md`, `-probador-celdas.md`, `-carro-l293d.md` y `-servos-nano-usb.md`. Explicación: COMO-FUNCIONA, sección 65.

**Lo que confirmó:**
- **Continuidad de la shield:** cada motor va por el PWM y las salidas del 74HC595 de AFMotor_R4 (el simulador no cambia). Headers analógicos a 2,54 mm, servos − + S, puente PWR al VIN y LED1 con 985 Ω.
- **Probador:** umbral de 3,3 V y la misma secuencia de celdas; marca un 1 % menos que el multímetro.

**Lo que corrigió (16 oct):**
- **KiCad:** en cada L293D, el segundo motor entra por las patas 15/10 y sale por las 14/11; en U2, M4 va por la primera mitad y M3 por la segunda.
- **LiPo de 1,2 Ω** (antes 0,05): de 7,63 a 7,22 V con 0,32 A; el motor bloqueado (0,90 A; el modelo da 0,85 A) lo confirma.
- **Caída del L293D de 1,3 V** + 1 V/A (medida: 1,43 a 1,47 V con 0,13 A).
- **El multímetro en el motor con PWM** suma lo que genera el motor mientras el puente está apagado (5,36 V medidos a 200; antes el simulador mostraba 4,77 V y ahora 5,53 V).
- **Dos errores escondidos detrás de los 0,05 Ω:** el freno ya no gasta batería, y `bateria_celdas` espera 0,5 s (un arranque baja las celdas unos milisegundos).
- **Probador:** «2CS» al conectar, «ALL» antes del total y 1 s por paso.
- Fichas de la shield, la LiPo y el probador: validadas. Motor TT: dentro del criterio, pero falta el sentido de giro.

Con la batería en 7,64 V, todas las medidas del carro quedan dentro del criterio (tabla en el registro).

**Abierto:**
- **Sentido de giro:** la rueda derecha real avanza con el mismo cableado y la del simulador retrocede. La continuidad descarta la shield.
- **USB del Nano:** con 5 y 6 SG90, el 5V real baja a 4,12 y 4,03 V sin reiniciarse; el simulador del Nano casi no baja. No se cambió: primero, 5 y 6 SG90 con el Uno.
- **Modo ideal:** la resistencia de la LiPo no se apaga. Decidir con Efraín si se vuelve una no idealidad (cambia el contrato).
- MG90S suspendido (hay solo 4).

**Pruebas:** suite completa **1088 OK, 0 fallas** (16 oct, con el cargador; se actualizaron las predicciones viejas de potencia, Nano y carro); TecnoBloques `test:simulador` **53 OK**.

## 2026-10-16 — Contrato: la resistencia de la LiPo es una no idealidad (Efraín, con Claude)

**Decisión de Efraín:** la resistencia interna de la LiPo (1,2 Ω, medida el 15 oct) pasa a ser la no idealidad `resistenciaBateria`. El modo «realista» la enciende y el «ideal» la apaga; apagada, la batería da siempre su voltaje sin carga. Así se cumple la regla de que cada no idealidad se pueda apagar: con 0,05 Ω no se notaba, y con 1,2 Ω la batería baja 0,4 V con el carro andando.

- `src/simulador.js`: la clave entra en `CLAVES_NO_IDEALIDADES`. `src/potencia.js`: la batería y sus celdas usan la resistencia solo si está encendida.
- **CONTRATO**, sección 7 (la clave nueva y `caidaL293D` con su valor medido) y sección 10 (historial). Agregar una clave no rompe nada ni sube `v`.
- **TecnoBloques no cambia de código:** usa `modo: 'realista'` y no ajusta claves sueltas. Se anotó en su BITACORA y en su «Proyecto hermano».
- Pruebas: modo ideal con 8,40 V en el motor, y sin `resistenciaBateria` (con la caída del L293D encendida) la batería queda en 8,40 V. La prueba del Nano con la LiPo en el jack enciende la clave.

**Pruebas:** suite completa **1089 OK, 0 fallas** (16 oct); TecnoBloques `test:simulador` **53 OK**.

## 2026-10-16 — Laboratorio: polaridad de M1, motor bloqueado y servos en el Uno (Efraín, con Claude)

Registro: `validacion/2026-10-16-polaridad-bloqueo-servos-uno.md`. **El modelo no se cambió:** quedan medidas pendientes y Efraín las dejó para la próxima sesión de laboratorio.
- **Servos en el Uno:** con 5 y 6 SG90 por USB **no se reinicia**, igual que el Nano. El simulador predice reinicio desde 5: el golpe de arranque (590 mA por servo) está exagerado.
- **Polaridad de M1:** con FORWARD queda positivo el segundo tornillo (de arriba hacia abajo); el simulador y el dibujo ponen M1A en el primero. La librería AFMotor_R4 del kit (BSD-3) hace lo mismo que el simulador. Hipótesis: en la shield real, M1 tiene A y B al revés del dibujo y M4 no; eso explicaría las dos ruedas avanzando del 15 oct.
- **Motor bloqueado:** M1 da 3,00 V (adelante 200) y 3,44 V (atrás 255); el modelo da ~3,45 y 4,25 V. Apunta a un bobinado de ~3,8 Ω y una caída del L293D de ~1,7 V/A. Falta el voltaje de la batería durante el bloqueo.
- Pendientes en CLAUDE.md («Próxima sesión», punto 1).

## 2026-10-16 — Claude: etiqueta v0.1.0

Por pedido de Efraín, antes de dos días solo de software. `npm run preparar-version`: 480 KB, contrato 1, versión exacta. La suite pasó en verde sobre el mismo código (1089 OK; después solo cambió documentación). Commit `chore: v0.1.0 con dist/tecnocircuito.js` y etiqueta **`v0.1.0`**, publicada en GitHub.

En TecnoBloques: depende de `#v0.1.0` y sube a 0.3.0. `npm test`, `test:simulador` (53 OK) y `test:app` pasan. El instalador `TecnoBloques-Setup-0.3.0.exe` está armado y probado con `app-empaquetada.js`, con el simulador de la etiqueta. **El Release no se publicó:** las apps del aula se actualizan solas.

**La versión lleva estos pendientes conocidos** (`validacion/2026-10-16-polaridad-bloqueo-servos-uno.md`): el simulador predice reinicio con 5 SG90 y el Uno real no se reinicia; el positivo de M1 con FORWARD está en el otro tornillo; el motor bloqueado da más voltaje que el real.

## 2026-10-16 — Registro de eventos, fases 1 y 2: el esquema y el emisor de TecnoCircuito (Efraín, con Claude)

**Efraín aprobó el plan completo** (cinco fases: decisiones, esquema, emisor, registro en TecnoBloques, ¿sirve? y revisión). Decisiones del 16 oct, anotadas en CONTRATO 6.1: la `corrida` la cuenta el paquete mientras la app está abierta (TecnoBloques crea un simulador por cada Simular); `simulacion_detenida` manda `ms_sim` y conserva `ms_simulados`; `proyecto_abierto` va **sin el nombre** del proyecto (lo escribe el aprendiz); el código del equipo se limpia para el nombre del archivo; la opción del instructor se abre con atajo y PIN.

- **`contrato/evento.schema.json`** (nuevo): `$defs/evento` es lo que emite quien emite y la raíz es la línea del `.jsonl` con el sobre de TecnoBloques. Valida los `datos` de los 18 tipos de la sección 6/6.1, el circuito de `simulacion_iniciada` contra `circuito.schema.json`, y prohíbe el `mensaje` en las fallas y el `nombre` en `proyecto_abierto`. Lo nuevo (tipos, campos, fallas) se acepta.
- **`pruebas/contrato_eventos.js`** (nuevo): `revisarEvento` (con `revisarCircuito` para el circuito) y uso suelto con `.jsonl` o `.json`. TecnoBloques podrá usarlo para revisar su archivo.
- **`probar:contrato`** suma 59 comprobaciones: las 22 fallas que avisa el código están en el esquema y explicadas en la sección 6 (las tres del Nano faltaban en el contrato y se agregaron), las claves de `activas` son las del simulador, los ejemplos de las secciones 6 y 6.1 cumplen, un evento de cada tipo pasa emitido y en el archivo, y 26 casos mal formados se rechazan con su motivo.
- **Emisor** (`src/simulador.js`, `src/lienzo.js`, `src/eventos.js` nuevo con `VERSION_EVENTOS`): todos los eventos llevan `v: 1`; los del simulador, `corrida` y `ms_sim`. `simulacion_iniciada` lleva `activas` y el circuito completo; `simulacion_pausada` y `simulacion_reanudada` son nuevos (el segundo lo pidió Efraín: con los dos se sabe cuánto duró la pausa; reiniciar en pausa también reanuda); `simulacion_detenida` lleva las fallas de la corrida, una vez cada una; `reinicio_placa` por el botón lleva el momento en que se pulsó. El contador interno página↔Worker se llamaba también `corrida`: pasó a `turno` (`trabajador.js`) para no confundirlos.
- **Pruebas de Chromium:** `probar_registro.py` (nueva, 17 comprobaciones) reproduce lo que haría un equipo: LED sin resistencia → se quema → arma el circuito con 330 Ω en un lienzo y simulador nuevos → corrida 2 sin fallas, con pausa y reinicio. Además, 12 pruebas existentes revisan cada evento que emiten contra el esquema (`eventos_contrato.py`, con la misma revisión de Node). `pagina.html` guarda los eventos completos en `window.eventosTC`.

**Pruebas:** suite completa **1179 OK, 0 fallas** (16 oct). Sin medidas físicas: el registro no tiene no idealidades que validar. Falta la fase 3 (TecnoBloques).

## 2026-10-16 — Registro de eventos, fase 3: TecnoBloques (Efraín, con Claude)

TecnoBloques ya escribe el registro (commits `4d428b9` y `7e1432b` allá; detalle en su BITACORA): apagado por defecto, el instructor lo enciende con Ctrl+Alt+Mayús+R y su PIN, el equipo escribe su código con confirmación, un aviso discreto lo dice en pantalla, «Exportar registros» copia los `.jsonl`, y F12 solo abre las herramientas de desarrollo después del PIN. Sus pruebas revisan cada línea con `pruebas/contrato_eventos.js` de aquí: `test:registro` 58 OK y `test:registro-app` 36 OK (de punta a punta, en Electron).

Corrección a la entrada de las fases 1 y 2: `probar_registro.py` tiene **18** comprobaciones, no 17 (la de `simulacion_reanudada` entró después de escribirla).

Siguen la fase 4 (un script que cuente la historia de un `.jsonl` y la prueba de Efraín en la app) y la 5 (revisión).

## 2026-10-16 — Idea: registro central en la suite TecnoRuta (Efraín, con Claude)

Al cerrar la sesión, Efraín propuso que los `.jsonl` lleguen solos a una base de datos central de la suite TecnoRuta (Supabase) en vez de salir por USB. Claude leyó el CLAUDE.md de TecnoRuta (prototipo v0.2; su fase 2 con Supabase está pendiente) y dejó un borrador para decidir: [docs/PLAN-REGISTRO-CENTRAL-TECNORUTA.md](docs/PLAN-REGISTRO-CENTRAL-TECNORUTA.md). Propone un subidor en TecnoBloques con un token por PC que solo inserta, un `id` por línea para no duplicar, el archivo local como fuente y un proyecto de Supabase aparte para la investigación, sin cruzar los códigos de equipo con los alias en la base. Faltan las decisiones de Efraín (sección 4 del borrador), entre ellas la región de los datos y el consentimiento. El orden de las próximas sesiones quedó en CLAUDE.md, «Próxima sesión».

## 2026-10-17 — Codex (Sol): encargo permanente de auditoría y supervisión

Efraín validó la formulación del encargo y pidió que la auditoría y supervisión sean permanentes; autorizó avanzar a la metodología. Se registra la asignación en AGENTS.md y el estado en CLAUDE.md, conservando las responsabilidades de implementación y las autorizaciones de publicación existentes.

- Referencia inicial: `390ef34a119df754a06ff35c96e2286800819f21`; `git status --short` sin cambios al comenzar. Git avisó que no podía leer el ignore global del usuario; las lecturas de estado y revisión finalizaron con código 0.
- Documento nuevo: [METODOLOGIA-AUDITORIA-SUPERVISION.md](docs/METODOLOGIA-AUDITORIA-SUPERVISION.md). Propone roles, ciclo de revisión y cierre, matriz de pruebas, frecuencia por riesgo, trazabilidad de evidencia y un primer ciclo de auditoría.
- Contexto consultado: instrucciones y estado de TecnoCircuito, contrato, scripts de pruebas, historia reciente, cierre de R6 y registro físico de T3 del 16 oct; estado y scripts de TecnoBloques para delimitar la integración. Los resultados históricos se mantienen separados de verificaciones nuevas.
- Alcance de la sesión: documentación de metodología. No se ejecutaron pruebas funcionales ni mediciones, no se modificó código o contrato, no se configuraron automatizaciones y no hubo commit, push ni publicación. La metodología es una propuesta; el encargo permanente sí fue autorizado.
- Siguiente responsable: Codex para establecer la referencia actual y realizar el primer ciclo; Efraín para prioridades y contraste físico. Las discrepancias físicas conocidas conservan sus registros y pendientes.

## 2026-10-17 — Codex (Sol): primer ciclo de auditoría permanente

Efraín aceptó la metodología y pidió iniciar. Referencias: TecnoCircuito `390ef34a119df754a06ff35c96e2286800819f21`; TecnoBloques `5b6d37a1f4b65474ec52a162fb5c3c330bc48445`. Se conservaron los cambios documentales de la fase anterior y el árbol limpio del hermano. Dos subrevisiones Codex, solo lectura, apoyaron Nano y eventos; el agente principal verificó las reproducciones. La familia Nano incluye implementación previa de Codex; no se presenta como auditoría externa.

- Informe: [AUDITORIA-CODEX-2026-10-17.md](docs/AUDITORIA-CODEX-2026-10-17.md). **Cinco hallazgos abiertos:** AUD-01 (alto, comentarios C++ conservados), AUD-02 (alto, pérdida silenciosa por fallo de disco), AUD-04 (alto, cambio de equipo durante corrida), AUD-03 (medio, fallas en fotos descartadas) y AUD-05 (medio, instrucciones AVR tras brownout con pasos grandes). Los tres primeros afectan TecnoBloques; los otros, TecnoCircuito. No se reabren por ello los R1–R8 cerrados en su alcance anterior.
- Diagnóstico nuevo: `node docs/diagnostico-auditoria-2026-10-17.cjs`, cinco defectos reproducidos con datos sintéticos. El compilador AVR real contrasta los comentarios; el fallo de disco y los contadores de instrucciones se inyectan solo en memoria. No es una regresión aprobada.
- AUD-04 confirmado además con clics y compilación real en Electron: `node docs/repro-equipo-electron-2026-10-17.cjs`. Archivos sintéticos A7/B2, captura inspeccionada y secuencia del cambio de equipo en `prototipo/pruebas/capturas/auditoria-equipo-2026-10-17/` (excluidos de Git).
- **TecnoCircuito: cobertura de 26 grupos, 1179 OK por tramos.** `npm.cmd run probar` se detuvo en simulación con tres métricas de velocidad/parpadeo fallidas; comenzó en batería y coincidió con otro verificador. Tras conectar Efraín el cargador y comprobar AC, el grupo repetido y los restantes 13 grupos pasaron sin modificar umbrales: 799 OK previos + 380 OK de continuación. No se declara un comando completo con exit 0. Con cargador: 3224 ms simulados / 3224 ms reales. KiCad Uno/Nano se ejecutó, sin omitirlo.
- **TecnoBloques:** `test:simulador` 53 OK; `test:registro` 58; `test:registro-app` 36; `test:graficador` 28; `npm test` y `test:app` exit 0, con apartados de errores revisados y vacíos. Integración local, no instalador empaquetado.
- **Verificadores históricos:** correcciones 34 OK, cierre R6 16 OK (11/12 estrictas, 12/12 con U); R8 6/6 escenarios correctos, incluidos errores JS/archivo que deben devolver 1. Logs separados en `prototipo/pruebas/auditoria-2026-10-17-*.log`, excluidos de Git.
- Se consolidaron la metodología acordada y el estado de la auditoría en AGENTS.md/CLAUDE.md; se conciliaron dos frases de estado Nano con la revisión y la etiqueta. Se conserva la historia previa. Sin cambios funcionales, de contrato ni de medidas, sin commit/push/etiqueta/publicación y sin nueva validación física. No se probaron el instalador, su ejecución sin red ni uso humano nuevo.
- Siguiente responsable: asignar implementación de los altos de TecnoBloques y del protocolo de eventos; Codex conserva Nano y la supervisión de todos los cierres. Cada corrección debe comprobar caso original, regresión y dependencias. La aceptación del registro para el estudio sigue pendiente.

## 2026-10-17 — Codex (Sol): traspaso preparado para Claude Code

Por pedido de Efraín, se consolidó el [traspaso de auditoría](docs/TRASPASO-CLAUDE-AUDITORIA-2026-10-17.md) con mensaje listo para entregar, revisiones Git, prioridades AUD-01/02/04, coordinación de AUD-03 y asignación Nano/AUD-05 conservada en Codex. Incluye reproducciones, resultados previos, criterios de cierre y formato de devolución. El informe enlaza el seguimiento y CLAUDE.md registra el estado.

Efraín indicó que Claude trabaja en VS Code. No hay canal conectado para escribir en esa conversación y no se encontró un comando `claude` disponible en el entorno. Se dejó un aviso destacado en CLAUDE.md de TecnoBloques y una entrada al final de su BITACORA.md, verificando los hashes antes de editar y conservando sus bytes anteriores. **Esto es documentación compartida; la entrega directa y el acuse de Claude siguen pendientes.** No se afirma que se lo haya ejecutado o notificado dentro de VS Code.

Siguiente fase: correcciones con regresiones y verificación independiente por ID; después, cierre integrado con cargador y sin verificadores concurrentes, prueba humana de utilidad del registro y auditoría pendiente de distribución/uso. Los cinco hallazgos siguen abiertos. Esta sesión de traspaso no añade pruebas funcionales ni modifica código, contrato, medidas o versiones. Sin commit, push ni publicación.

## 2026-10-17 — Codex (Sol): contrato permanente de coordinación entre agentes

Efraín pidió formalizar los roles y la comunicación por .md para que ambos agentes tengan el acuerdo en el contexto de cada sesión y puedan advertirle cuando se omita un paso necesario. Se creó [CONTRATO-COORDINACION-AGENTES.md](docs/CONTRATO-COORDINACION-AGENTES.md), versión 1, como fuente única de coordinación. No cambia CONTRATO.md ni la API del producto.

- Roles conservados: Efraín dirige y decide; Claude programa sus tareas asignadas; Codex audita/supervisa y mantiene implementación Nano/expansión. Las nuevas instrucciones expresas de Efraín prevalecen y se registran.
- Inicio de sesión: enlace al acuerdo, estado, canales y comprobación de Git/rol/tarea/paso siguiente en AGENTS.md y CLAUDE.md de ambos repositorios. En TecnoBloques se creó AGENTS.md, que no existía; se comprobó su ausencia y los hashes de los otros dos archivos antes de editar. Las bitácoras conservan sus entradas anteriores.
- Canales por remitente: [CODEX-A-CLAUDE.md](coordinacion/CODEX-A-CLAUDE.md) y [CLAUDE-A-CODEX.md](coordinacion/CLAUDE-A-CODEX.md). Codex publicó COD-20261017-001 con el acuerdo y el traspaso; el canal de Claude solo contiene una cabecera inicializada por Codex, **sin mensajes ni acuses atribuidos a Claude**. No hay ejecución automática ni envío directo a VS Code.
- Ambos deben informar a Efraín del paso omitido, evidencia, consecuencia y cómo subsanarlo. Se completa lo rutinario autorizado y se continúa lo independiente; se respetan sus decisiones y excepciones, sin inventar resultados, cerrar sin evidencia ni pedir permisos repetidos.
- Se actualizaron el estado y las referencias del traspaso/informe. Se revisan enlaces, diffs, archivos de entrada y preservación de historia; no se ejecuta de nuevo la suite funcional por este cambio documental. Los cinco hallazgos mantienen su estado abierto. Sin cambios funcionales, medidas, versiones, commit, push ni publicación.

Siguiente responsable: Claude, al abrir su sesión, para leer y acusar COD-20261017-001 y declarar IDs/archivos; Codex para su trabajo asignado y la verificación de cierres. La vigencia del acuerdo procede del pedido de Efraín; no se afirma lectura o aceptación personal de Claude sin su respuesta real.

## 2026-10-17 — Codex (Sol): investigación de prácticas de desarrollo y comparación con el acuerdo .md

Efraín pidió investigar cómo trabajan equipos de desarrollo, explicar y evaluar alternativas, compararlas con el proceso instalado y ayudarle a decidir. Validó la formulación y autorizó avanzar. Entrega: [COMPARACION-PROCESOS-DESARROLLO-2026-10-17.md](docs/COMPARACION-PROCESOS-DESARROLLO-2026-10-17.md).

Se consultaron fuentes primarias de Google Engineering Practices, DORA, Kanban Guides, Scrum Guides, Git/GitHub, Cucumber, Martin Fowler, Michael Nygard, documentación oficial de OpenAI y Anthropic y estudios de METR. Se separan guías y experiencia industrial de evidencia experimental y de la inspección local. Tres subtareas Codex de lectura apoyaron prácticas de equipos, agentes y evaluación del proceso; el agente principal contrastó fuentes e integró la recomendación.

Recomendación para decidir: conservar .md como memoria y reglas, añadir flujo visible inspirado en Kanban, cambios pequeños, revisión de una versión exacta y comprobaciones por etapas; empezar con un piloto AUD-01. Scrum completo y orquestación automática se evalúan como opciones de mayor compromiso. No se prometen porcentajes de mejora ni se toma el acuerdo entre modelos como prueba suficiente.

Condición local relevante: documentos/canales nuevos aún sin commit; un worktree desde HEAD no los heredaría. La adopción debe preparar referencia y entorno, mantener una sola verdad operativa por tarea y respetar las autorizaciones vigentes de Efraín. No se inspeccionaron controles remotos ni se midió productividad comparativa propia.

Esta investigación solo añade informe y referencia de estado: no modifica el contrato de coordinación, canales, roles, código, pruebas, configuración, permisos o publicación. No se repite la suite por documentación. Los hallazgos de auditoría conservan su estado; el acuse real de Claude sigue pendiente. Siguiente paso: decisión de Efraín sobre el piloto y el medio de seguimiento, sin aplicar por anticipado la propuesta.

## 2026-10-17 — Codex (Sol): piloto completo de trabajo en la suite Tecno

Efraín autorizó aplicar el piloto a **todo TecnoBloques y TecnoCircuito**, con investigación paralela y registro a cargo de Codex; TecnoRuta queda previsto. Se creó el repositorio local [TecnoSuite](../TecnoSuite/README.md), sin commit ni remoto, como coordinación neutral de los productos. Su [acuerdo v2](../TecnoSuite/PROCESO.md) sustituye operativamente v1, cuyo texto íntegro se conserva en docs. El contrato de software no cambia.

Se actualizaron AGENTS.md, CLAUDE.md y README.md de ambos productos; metodología/contrato/canales locales dirigen al proceso común. Fichas únicas y tablero generado abarcan los cinco hallazgos, fases del registro, laboratorio Nano/T3, UX, distribución, evolución e incorporación futura. Codex mantiene la investigación y sesiones observadas; no se inventan tiempos ni acuses. Canales vigentes desde COD-20261017-002; no consta lectura de Claude.

Se conciliaron descripciones vencidas de etiqueta/instalador y contactos de expansión con los registros existentes. No se modifica código funcional, esquemas, medidas, versiones ni pendientes de hardware; ninguna corrección AUD se cierra por esta adopción. Las bitácoras e informes conservan su historia. Ver [entrega de instalación y comprobaciones](../TecnoSuite/registro/INSTALACION-2026-10-17.md) para evidencia documental, referencias exactas y límites. No se repite la suite funcional por documentación. Sin commit, push, etiqueta ni publicación; las instrucciones sin commit requieren copia controlada antes de usarse en otro worktree.


## 2026-10-18 — Claude: roles permanentes de implementación

Efraín aclaró que la asignación de Nano + expansión a Codex fue una prueba y decidió, de forma permanente, que **Claude es el único implementador y programador** de TecnoCircuito, TecnoBloques y sus dependencias, incluidos Nano/expansión y AUD-05. Codex audita, supervisa, verifica y lleva el registro del piloto, sin implementar código de producto. El código Nano que escribió Codex se conserva y su historia también.

Se actualizaron AGENTS.md, CLAUDE.md (estado y tabla de decisiones) y una nota en la metodología de auditoría; en TecnoSuite, PROCESO, AGENTS, fichas y canal (CLA-20261018-001). Sin cambios de código ni pruebas funcionales; sin commit ni push.

## 2026-10-18 — Claude: commits del piloto y CLAUDE.md por ficha

Con el sí de Efraín: commit `de54cfc` con la auditoría y el piloto de Codex tal como estaban, más los roles permanentes. Efraín aprobó la simplificación del proceso (TecnoSuite, PROC-001) y la regla de **memorias separadas**: este CLAUDE.md es solo de Claude y AGENTS.md es solo de Codex.

En CLAUDE.md, los cuatro párrafos de proceso del inicio pasan a un bloque corto, y «Próxima sesión» pasa a «Pendientes técnicos, por ficha». Se conservan todas las decisiones y montajes que enlazan LAB-001, LAB-002, UX-001, REG-004, REG-005, DIST-001, RUTA-001 y EVOL-001; se quitan el orden de prioridades (ahora en el tablero) y lo ya terminado (en esta bitácora). El README público ya no enlaza a la carpeta local `../TecnoSuite`. Sin cambios de código ni de contrato.

## 2026-10-18 08:10 · Codex: memorias v3 y devolución de PROC-001

Por encargo de Efraín se alineó AGENTS.md con PROCESO v3, roles permanentes, memorias separadas y congelación. En TecnoSuite se ajustó INVESTIGACION.md y se registró la sesión, con minutos de Efraín todavía no medidos.

PROC-001 se devuelve por dos omisiones de evidencia (preparación verificable de clones/worktrees y revisión propia) y una incoherencia ficha/tablero en los CLAUDE.md. Evidencia y versiones en PROC-001, TecnoSuite; entrega COD-20261018-001. Pendientes técnicos conservados y siete tildes comprobadas. Comprobador: 18 fichas, 43 documentos, 0 errores/avisos; herramienta: 10 OK. Sin código de producto, edición de CLAUDE.md/PROCESO, suites funcionales, hardware, commit ni publicación.

## 2026-10-18 08:19 · Codex: PROC-001 verificada

Segunda revisión de la entrega CLA-20261018-003: PROC-R1/R2/R3 cerrados por cotejo exacto y regresión documental. Evidencia, hashes de los archivos sin commit y precisión sobre la tabla inicial en PROC-001, TecnoSuite. Comprobador: 18 fichas, 43 documentos, cero errores/avisos; herramienta: 10 OK. Los cuerpos técnicos permanecen íntegros. Codex actualiza ficha, registro y su canal; no edita CLAUDE.md ni PROCESO.

Tercer cierre documental del piloto: datos del primer balance presentados en INVESTIGACION.md; pendientes la opinión corta de Claude y decisión de Efraín. Sin cierres funcionales nuevos, pruebas de producto, hardware, commit ni publicación.

## 2026-10-18 10:09 · Codex: AUD-01 devuelta tras verificación independiente

Revisada CLA-20261018-005 sobre TB 8897b85 y src/registro.js SHA256 792cb03ecc7fef575d9c0e1a9ed63fa57aed17664dda0d21adda24fcc2356135. Siete casos originales corregidos; subsisten comentario privado en número empalmado de macro (alta), alteración de macro multilínea/include válido (media) y falso negativo del oráculo (media). Informe y diagnóstico propios en TecnoCircuito/docs/VERIFICACION-AUD01-CODEX-2026-10-18.md y verificar-aud01-2026-10-18.cjs; entrega COD-20261018-003 y estado pendiente en la ficha.

Pruebas propias: Node 78 OK, Electron 36 OK sin errores, cargador Online. Preprocesador con semilla 18102026 y CASOS=5000: exit 0, 39 casos fijos, 5000 aleatorios con cuatro diferencias disculpadas por el límite de stray y cuatro comprobaciones de límites; V3 demuestra el falso negativo para macros. Diagnóstico adverso exit 1: reproduce incumplimientos, no acredita regresión aprobada. Codex no editó producto, pruebas ni memoria de Claude. Claude corrige con reservas coordinadas; sin commit, push, publicación ni validación física nueva.

## 2026-10-18 14:26 · Codex: cierre verificado de AUD-01

Verificada CLA-20261018-006 sobre src/registro.js SHA256 bff77d8ab7307dd498c74b726153a1f42e4c2b476b419c27f74366a698b8f4d7, sin commit. V1/V2/V3 cerrados: casos originales y variantes limpios, programas válidos preservados y juez capaz de rechazar las tres salidas defectuosas capturadas de la entrega anterior. Informe posterior: TecnoCircuito/docs/CIERRE-AUD01-CODEX-2026-10-18.md. No se reescribió el informe de devolución.

Pruebas propias: Node 89 OK, 66 comprobaciones fijas con 80 variantes, siete programas válidos, 2000 aleatorios sin excepciones y ocho fronteras adicionales. Electron tuvo una falla inicial al cerrar herramientas sin PIN; la repetición completa sin otra suite pasó 36/36, sin cambiar aserciones y sin acreditar una causa. Excepción /**/ vacío de Efraín respetada y remitida a REG-005 para documentarla.

Primer cierre funcional del grupo para el segundo balance; AUD-02/04 siguen sus fichas y Efraín conserva prioridades. Codex no modificó producto, tests ni CLAUDE.md. Sin instalador, hardware, commit, push ni publicación nuevos.

## 2026-10-18 15:00 · Claude: contrato 1, evento `registro_interrumpido` (AUD-02)

Por decisión de Efraín, la sección 6.1 suma el evento del editor `registro_interrumpido`.
- **Datos:** `desde`, `hasta`, `recuperados`, `perdidos` y `motivo`.
- **Quién lo escribe:** TecnoBloques, cuando el disco vuelve a funcionar después de una falla, detrás de las líneas que esperaron y uno por sesión afectada. Con `perdidos` mayor que 0, la sesión tiene un hueco.
- **Es aditivo:** agregar un tipo no rompe el contrato 1, y la tabla de versiones lo registra.
- **`contrato/evento.schema.json`:** valida los cinco campos y que el origen sea `editor`.
- **`probar:contrato`:** suma el ejemplo y tres rechazos (sin `perdidos`, con `perdidos` negativo, como evento del simulador), y su revisión de tipos de la sección 6 ahora incluye `registro_`. Da 175 OK. `probar_registro.py` da 18 OK.

Sin cambios en la API, el formato del circuito ni el paquete. El resto de la corrección está en la bitácora de TecnoBloques. Sin commit ni push.

## 2026-10-18 15:14 · Codex: AUD-02 devuelta tras verificación

Revisada CLA-20261018-007 con diez hashes coincidentes. El fallo completo de disco se notifica y recupera; subsisten dos altos: append parcial deja JSON inválido y anuncia recuperados 1/perdidos 0, y CONFIG al arrancar oculta la falla y ofrece crear PIN. Informe y reproducciones propios en TecnoCircuito/docs/VERIFICACION-AUD02-CODEX-2026-10-18.md y verificar-aud02-2026-10-18.cjs; evidencia Electron del arranque en repro-aud02-arranque-electron-2026-10-18.cjs.

Node 106 OK, Electron 47 OK sin errores, contrato aprobado y registro Chromium 18 OK; diagnósticos adversos exit 1. Offline: no se acredita rendimiento. AUD-02 vuelve a pendiente sin cierre; AUD-06 registra por separado la intermitencia anterior de herramientas sin PIN, sin iniciar implementación ni atribuir causa. El evento aditivo autorizado no se objeta. Codex no editó fuentes, tests ni CLAUDE.md. Sin commit, push ni publicación.

2026-10-18 15:38 · Codex: [segunda verificación AUD-02](docs/SEGUNDA-VERIFICACION-AUD02-CODEX-2026-10-18.md), devuelta por V3/V4 en recuperación de disco/configuración de TecnoBloques; V1/V2 originales pasan. Contrato y esquema conservan los hashes aprobados en la primera revisión. Node 121 y Electron 52 OK con consumidor del contrato; diagnóstico sintético UTF-8 pasa el revisor pero reproduce JSONL inválido. Sin producto ni CLAUDE.md editados; evidencia y siguiente paso en ficha AUD-02.

2026-10-18 19:03 · Codex: [tercera revisión AUD-02](docs/TERCERA-VERIFICACION-AUD02-CODEX-2026-10-18.md) trasladada a ficha/canal/registro después de retomar la sesión: V4 residual devuelto, V1/V2/V3 pasan. Dependencias de contrato sin cambios y revisor usado por Node/Electron; no nueva validación de hardware. La cuarta entrega de Claude conserva en_revision sin acreditarle las pruebas de la tercera. Sin producto ni memoria de Claude editados.

2026-10-18 19:09 · Codex: [cuarta verificación AUD-02](docs/CUARTA-VERIFICACION-AUD02-CODEX-2026-10-18.md) devuelta por V4 residual con fallo final y del propio deshacer; consumidores y contrato mantienen hashes y evidencia identificada. Node 133 OK, matriz 6/6; suite Electron fallida por AUD-06 separado. Sin producto ni memoria de Claude editados, validación física nueva ni publicación.

2026-10-18 19:50 · Codex: [cierre AUD-02](docs/CIERRE-AUD02-CODEX-2026-10-18.md), V1–V4 verificados en disco del hermano; [AUD-04 devuelta](docs/VERIFICACION-AUD04-CODEX-2026-10-18.md) por inicio tras desconexión serial pendiente con cambio de turno. Consumidores/contrato identificados, Node 142/Electron 67 OK, reproducción V1 exit 1. Segundo cierre funcional, 2/3. Sin producto/memoria de Claude editados, nueva validación física ni publicación.

2026-10-18 20:22 · Codex: [cierre AUD-04](docs/CIERRE-AUD04-CODEX-2026-10-18.md), integración local del hermano y atribución por turno verificadas; Electron 72 OK y diagnóstico independiente exit 0 con puerto sintético. Tercer cierre funcional; segundo balance presentado en TecnoSuite/INVESTIGACION.md. Hardware/instalador/aula no validados por estas pruebas; memoria de Claude preservada. Sin commit/push/publicación por Codex.

## 2026-10-18 20:45 · Claude: AUD-03, los hechos de una foto que llega tarde ya no se pierden, en revisión

La auditoría de Codex del 17 oct (AUD-03) encontró que, si el LED se quemaba justo antes de pulsar Pausa, la foto con la falla llegaba después y la página la descartaba entera: nunca salía el evento `falla` y el cierre decía «sin fallas». Lo reproduje con una prueba nueva, `probar_fotos.js`, que corre el `simulador.js` real con un Worker controlado y el núcleo real (la técnica del diagnóstico de Codex): 8 fallas sobre el código anterior. Además de las fallas de la pausa, también se perdían las del RESET y el texto del monitor serial.

**Corrección** (`src/simulador.js`; COMO-FUNCIONA, sección 66): una foto que llega tarde se separa en dos partes. **La vista** (dibujo, medición, tiempo) solo se usa si es del turno actual. **Los hechos** (fallas, serial, reinicios) se entregan si la foto es de la misma corrida, con el `ms_sim` de la foto. Una foto de una corrida anterior, o una que llega con la simulación detenida, se descarta entera. El protocolo con el Worker no cambia: la página guarda el turno con que empezó la corrida.

**Error corregido de paso:** al pulsar RESET, la página volvía a contar desde 0 los reinicios por energía, y el siguiente `reinicio_placa` por energía salía repetido. El núcleo cuenta los de toda la corrida.

**Pruebas** (20:09–20:42, con cargador):
- `probar:fotos` 17 OK, grupo nuevo de `npm run probar`.
- `npm run probar` completo: exit 0, 27 grupos, 1200 OK, cero fallas.
- TecnoBloques con este paquete local: `test:simulador` 53 y `test:registro-app` 72/72.

**Límite:** si se pulsa Detener mientras una foto viaja (a lo sumo unos 16 ms de simulación), sus hechos no llegan, porque el cierre sale en ese mismo instante.

Sin commit ni push.

## 2026-10-18 21:05 · Claude: AUD-05, el chip para en el milisegundo del corte, en revisión

La auditoría de Codex del 17 oct (AUD-05) mostró que, cuando el modelo de energía declaraba un corte, `chip.correr()` seguía ejecutando hasta el final del pedazo. Lo reproduje con una prueba nueva, `probar_corte.js`. El caso de la auditoría (Nano, 0,25 Ω en OUT_5V) da 184 852 instrucciones sin energía con un pedazo de 16 ms, igual que en el informe. Encontré además 5938 con pedazos de 7919 ciclos, que se parecen a los del Worker. Con seis SG90 en el USB del Uno, los reinicios dependían del tamaño del paso: 8 en 3 s con pasos de 16 ms y 110 con pasos de 1 ms.

**Corrección** (`src/chip.js`, `src/nucleo.js`; COMO-FUNCIONA, sección 67): `chip.correr(ciclos, parar)` se detiene en la frontera del milisegundo en que un modelo declara el corte. `avanzar()` atiende el corte en ese instante y sigue con lo que falta del pedazo, también después de que la energía vuelve.

**Una prueba existente cambió** (decisión de Efraín): la del Otto en `probar_nucleo.js` avanzaba en pedazos de 16 ms. Ahora la placa se reinicia unas 300 veces en 8 s, como ya pasaba en la app (el Worker avanza de a 1 ms o menos), y el «Inicio» casi nunca sale entero, así que la prueba cuenta cada arranque por su «I». Exagera lo medido el 16 oct: el Uno real no se reinició con 5 ni 6 SG90 (LAB-001).

**Pruebas** (20:50–21:03, con cargador):
- `probar:corte` 7 OK con pedazos de 16 ms, 1 ms y 7919 ciclos. Con el núcleo anterior fallan cuatro.
- `npm run probar` completo: exit 0, 28 grupos, 1207 OK, cero fallas.
- TecnoBloques con este paquete local: `test:simulador` 53 y `test:registro-app` 72/72.

Sin commit ni push.

2026-10-18 21:20 · Codex: revisión de CLA-014/015: **AUD-05 verificada** para corte lógico, pasos parciales y recuperación; **AUD-03 devuelta** por pérdida de hechos al cerrar con foto pendiente. [Cierre AUD-05](docs/CIERRE-AUD05-CODEX-2026-10-18.md), [revisión AUD-03](docs/VERIFICACION-AUD03-CODEX-2026-10-18.md), evidencia/manifiesto enlazados. Corte actual 7 OK; versión anterior cuatro fallos; fusible adicional en tres pasos exit 0. Fotos 17 OK, pero reproducción de cierre exit 1 (tres intercalaciones).
Suite completa TC exit 1 por T1/T2 (3 cambios de pin flotante frente a ≤2); una repetición aislada 17 OK y nueve recorridos restantes aprobados, sin borrar el fallo. KiCad real Uno/Nano ejecutado. TB local 53/72 y graficador 28 OK, sin errores de app. Cargador Online durante benchmarks; sin producto ni memoria de Claude editados por Codex, hardware, instalador, commit ni publicación. Siguiente: Claude corrige AUD-03, revisa T1/T2 y actualiza su memoria del cierre.

## 2026-10-18 22:25 · Claude: Contrato 1: el cierre de la corrida espera al Worker (AUD-03), en revisión

Codex devolvió AUD-03 (21:20) por V1: si se pulsaba Detener, o TecnoBloques destruía el simulador, mientras viajaba una foto con fallas, esas fallas no llegaban al cierre de la corrida. Era el límite que yo había declarado, y la aceptación incluye el cierre. Efraín eligió el «cierre que espera».

**Contrato 1 (aditivo):** `sim.detener()` y `sim.destruir()` devuelven una promesa que se cumple cuando sale `simulacion_detenida`. La simulación se ve detenida al instante, pero el cierre espera a que el Worker confirme que paró (`detenido`, después de una última foto). Como los mensajes llegan en orden, antes llegan las fotos en camino y sus fallas entran en el cierre. Si el Worker no confirma en 500 ms, el cierre sale con lo que llegó. `{ sinEsperar: true }` lo saca ya. CONTRATO, sección 2 y su historial.

**TecnoCircuito:** `simulador.js` (el cierre abierto, el tope, `destruir()` que espera y después libera el Worker, `iniciar()` que cierra primero la corrida anterior) y `trabajador.js` (la última foto y `detenido`). COMO-FUNCIONA, sección 66, corregida: el `ms_sim` de una falla que llega en la pausa puede ser mayor que el de la pausa (lo mostró Codex).

**TecnoBloques:** `detenerSimulacion()` devuelve la promesa. `cerrarTrabajoDelEquipo()` sube el turno al instante y espera el cierre antes de cerrar la sesión (cambiar de código, apagar el registro). `simular()` espera el cierre anterior antes de compilar. Al cerrar la ventana se usa `sinEsperar` (límite declarado). Un segundo clic en «Sí, somos ese equipo» mientras espera no abre otra sesión.

**T1/T2 con semilla fija** (decisión de Efraín): la prueba falló una vez a Codex por azar. Con 1000 semillas, HEAD y AUD-05 dan lo mismo semilla por semilla, y más de 2 cambios en 3 s sale en el 0,2 % de las semillas. `pagina.html?semilla=` pasa `_semilla` (interna, no es del contrato) y la prueba fija la suya.

**Pruebas** (22:00–22:24, con cargador):
- `probar:fotos` 31 OK, con el cierre que espera.
- `npm run probar` completo: exit 0, 28 grupos, 1221 OK, cero fallas.
- TecnoBloques: `test:registro-app` 72/72 y `test:simulador` 53.
- El diagnóstico de Codex, en una copia que solo agrega la confirmación del Worker: 0 casos residuales.

Sin commit ni push.

## 2026-10-19 11:23 · Codex: AUD-03 devuelta por atribución del cierre pendiente (CLA-016)

Verificación de TC main 3d4c4d9 y TB main f6e5cf3: el original/V1 conserva las dos fallas al cerrar (fotos 31 OK y cuatro órdenes del diagnóstico, cero residuales). Registro/simulación Chromium y contrato aprobados; registro-app de TecnoBloques 72/72, sin errores. Sin embargo, Electron con Worker/núcleo/compilador/disco reales reproduce V2 alta: después de Detener, cambiar B→C antes de confirmar atribuye a C dos fallas y el cierre de la corrida iniciada por B. Control de cambio directo correcto; espera original pendiente al cambiar, antes de 500 ms. AUD-03 vuelve a pendiente; Claude conserva la implementación. Es regresión de esta entrega, sin reabrir el cierre histórico de AUD-04.

T1/T2: primera ejecución fallida en la aserción ideal, repetición con observación aprobada; pin flotante 0 cambios en ambas, causa del primer fallo no aislada. No se acredita suite global ni estabilidad; sin hardware, instalador o aula. Informe e instrumentos propios revisados por Codex, sin segunda revisión independiente; producto y memorias de Claude conservados. Sin commit/push/publicación.

[Informe y evidencia](docs/VERIFICACION-AUD03-CODEX-2026-10-19.md).

## 2026-10-19 12:20 · Claude: AUD-03-V2 corregido en TecnoBloques; mensaje de T1/T2

Validé la devolución de Codex leyendo el código: era correcta. El defecto está solo en TecnoBloques. Detener se olvidaba del cierre pendiente, y cambiar de equipo, apagar el registro o volver a simular ya no lo esperaban. Ahora todos esperan la misma promesa (`simulador.cerrando`); el `destruir()` de TecnoCircuito ya la devolvía igual en una segunda llamada. Explicación y diagrama en COMO-FUNCIONA, sección 66. La regresión está en `test/registro-app.js` de TecnoBloques y falla con el código anterior.

- **T1/T2:** el mensaje de la lectura ideal dice ahora cuántas lecturas hubo y qué valores salieron, para distinguir las dos condiciones. El umbral no cambió.
- **Velocidad del PC:** con el PC en batería, la lectura realista salió con 15 lecturas, justo el mínimo. Esto apoya la hipótesis de que el fallo del 19 oct fue por pocas lecturas: cuántas salen en 2,5 s depende de la velocidad del PC.
- **Pruebas en TecnoCircuito:** `probar_t1t2.py` bien y `npm run construir` bien. Sin suite completa: el código de TecnoCircuito no cambió.

Sin commit ni push.

## 2026-10-19 12:28 · Codex: AUD-03 verificada y cerrada (CLA-20261019-001)

Verifiqué original, V1 y V2 sobre TC main 3d4c4d9 y TB main f6e5cf3 con el arreglo de Claude sin commit (app SHA256 4d4f1622…eabf75, test 7b372cd2…e07958), hashes conservados antes/después. La reproducción independiente en Electron conserva B activo a los 193,9 ms con el cierre pendiente; luego registra en B las dos fallas y el cierre antes de terminar su sesión, y C no hereda eventos. Control de cambio directo correcto; cero errores JS/esquema. Regresión: fotos 31, cuatro órdenes originales con ambas fallas, registro-app 84, integración simulador local 53 y T1/T2 17 OK (23 lecturas ideales, todas 512).

Cierre de software e integración local: no acredita instalador, hardware ni aula. Siguen los límites documentados del tope, sinEsperar y nueva corrida directa antes de confirmar. El fallo previo T1/T2 y la intermitencia AUD-06 no se borran. Nueve devoluciones pre-cierre acumuladas; sin reaperturas funcionales. Codex escribe auditoría/coordinación, sin producto, contrato, memorias de Claude, commit, push ni publicación. Siguiente: Claude actualiza sus memorias; Efraín decide qué sigue.

[Informe, evidencia y versión](docs/CIERRE-AUD03-CODEX-2026-10-19.md).

## 2026-10-19 12:40 · Codex cierra AUD-03 (original, V1 y V2)

Codex verificó la corrección de V2 ([cierre](docs/CIERRE-AUD03-CODEX-2026-10-19.md)):
- su reproducción en Electron, que antes fallaba, da exit 0, sin atribuciones cruzadas;
- `probar_fotos` 31 OK y su diagnóstico original en los cuatro órdenes;
- TecnoBloques: `test:registro-app` 84/84 y `test:simulador` 53;
- T1/T2: 17 OK, con 23 lecturas ideales, todas 512.

Siguen como límites documentados, sin conservación garantizada: `sinEsperar` al cerrar la ventana (las fotos en camino no entran), el tope de 500 ms sin confirmación e iniciar otra corrida en el mismo simulador antes de la confirmación. La causa del fallo de T1/T2 del 19 oct sigue siendo una hipótesis (pocas lecturas).

**Con este cierre, AUD-01 a AUD-05 quedan cerrados en software.** Sin hardware, instalador ni aula. Lo que sigue es REG-004 (fase 4 del registro, «¿sirve?»), cuando Efraín lo decida.

Sin commit ni push.

## 2026-10-19 14:10 · Claude: AUD-06 y REG-004 entregados a Codex (en TecnoBloques)

- **AUD-06:** F12 sin PIN se cerraba tarde porque `devtools-opened` llega de 0,4 a más de 0,8 s. Lo reproduje (4/50) y lo corregí con un vigía de 50 ms. Antes quedaban visibles de 92 a 205 ms; ahora de 22 a 66 ms. Detalle en la bitácora de TecnoBloques.
- **REG-004:** el lector `herramientas/historia-registro.js` cuenta la historia de los `.jsonl` y avisa los defectos de integridad de AUD-01 a AUD-04. Se explica en COMO-FUNCIONA, sección 68, con su diagrama. Falta la prueba de Efraín en la app.

Sin commit ni push.

## 2026-10-19 14:52 · Codex: AUD-06 verificada; REG-004 devuelta (CLA-004/005)

AUD-06: diff y fuentes identificadas antes/después (main 8125d6e8…8f6118, prueba 20f9dfa8…8147fc; package final compartido 41339280…ea8dab). Tres recorridos de 50 aperturas, todos 0 abiertas sin PIN a los 800 ms, F12 negativo y apertura persistente tras PIN; sin errores de página. Dos en batería y tercero con cargador confirmado por Efraín y BatteryStatus 2. Cierre funcional: no garantiza impedir apertura momentánea ni máximo universal de latencia, y no prueba instalador/aula.

REG-004 devuelta por dos defectos medios del lector: R1 niega fallas observadas o declara corregida una falla que reaparece en la última corrida incompleta; R2 no avisa de una falla posterior al cierre vacío. Cinco secuencias con líneas válidas según esquema, control completo aprobado y cuatro adversas fallidas; diagnóstico exit 1, no regresión aprobada. La suite normal test:historia da 18 OK; registro-app integrado 86/86 y lee 11 sesiones sintéticas sin avisos, sin cubrir esos adversos. Prueba humana de Efraín pendiente.

TC main f8f062e y TB main deaf16c con entregas sin commit, trabajo de Claude conservado; manifiesto SHA256. Diez devoluciones pre-cierre acumuladas/nueve funcionales, sin reapertura funcional. Codex solo auditoría/coordinación, sin producto, contrato, CLAUDE.md, commit, push ni publicación. Siguiente: Claude actualiza AUD-06 en su memoria y toma/reserva correcciones R1/R2 de REG-004; Efraín decide prioridad y entrega.

[Informe AUD-06](docs/CIERRE-AUD06-CODEX-2026-10-19.md) · [Informe REG-004](docs/VERIFICACION-REG004-CODEX-2026-10-19.md).

## 2026-10-19 15:30 · Claude: AUD-06 cerrado por Codex; REG-004 corregido (R1 y R2)

- **AUD-06:** Codex lo verificó y cerró ([cierre](docs/CIERRE-AUD06-CODEX-2026-10-19.md)). Se mantiene el límite: las herramientas alcanzan a abrirse un instante. El instalador y el aula no se probaron.
- **REG-004:** Codex lo devolvió por R1 (el resumen negaba fallas que sí se vieron) y R2 (una falla después del cierre no se avisaba) ([verificación](docs/VERIFICACION-REG004-CODEX-2026-10-19.md)). Lo corregí en TecnoBloques. Ahora el lector solo afirma lo que el registro respalda (COMO-FUNCIONA, sección 68). Su diagnóstico da 0 casos adversos y `test:historia` 24 OK. Otra vez en revisión.

Sin commit ni push.

## 2026-10-19 16:05 · Codex: REG-004/CLA-006 devuelta por residuales de R1; R2 original verificada

Los cinco casos originales ahora pasan (0 residuales) y la suite historia da 24 OK. R2 detecta la falla posterior al cierre y su discrepancia, y los resúmenes originales conservan hechos e incertidumbre. La ampliación reproduce dos residuales medios: una falla tardía de la segunda corrida deja el mismo LED en fallas y en corrigio, con el paso «Sin fallas. Corrigió»; una falla sin inicio conocido se narra/avisa, pero desaparece del resumen. Control de dos corridas coherentes correcto; los tres casos adicionales cumplen el esquema por línea; diagnóstico adverso exit 1, no regresión aprobada.

Integración local registro-app 86/86, sin errores de consola, 11 sesiones sintéticas leídas sin avisos. TC main f8f062e, TB main deaf16c con entregas sin commit, lector SHA256 5004fd12…4c2e27 y prueba 9bb70e04…17b315 conservados antes/después. El arreglo es de Claude; Codex solo escribe auditoría/coordinación y preserva sus fuentes/memorias y la evidencia histórica.

REG-004 vuelve a pendiente; R2 original verificada, R1a/R1b para Claude. Aceptación humana de Efraín pendiente, sin instalador/aula/hardware ni benchmark nuevos. Once devoluciones pre-cierre/diez funcionales, sin reapertura funcional; AUD-01–06 conservan cierres. Sin commit, push, etiqueta o publicación por Codex.

[Informe y evidencia](docs/VERIFICACION-REG004-CLA006-CODEX-2026-10-19.md).

## 2026-10-19 16:45 · Claude: REG-004, R1a y R1b corregidos

Codex verificó R2 y devolvió REG-004 por R1a (una falla tardía dejaba un «Corrigió» sin respaldo) y R1b (las fallas de una corrida sin inicio se perdían del resumen) ([verificación](docs/VERIFICACION-REG004-CLA006-CODEX-2026-10-19.md)). Corregido en TecnoBloques: el cierre y la comparación se escriben al final, y las fallas sin atribuir se conservan marcadas (COMO-FUNCIONA, sección 68). Sus dos diagnósticos dan 0 residuales y `test:historia` 29 OK. Otra vez en revisión.

Sin commit ni push.

## 2026-10-19 16:45 · Codex: REG-004/CLA-007, R1a/R1b verificados y residual R1c

Los cinco casos iniciales y tres de CLA-006 pasan (0 residuales); historia 29 OK e integración local registro-app 86/86, consola sin errores y 11 sesiones sintéticas sin avisos. R1a consolida comparaciones y textos con todos los hechos; R1b conserva eventos sin inicio como sin atribuir. Fuentes cbdefdcc…cfda532 / 69747b22…fa367b identificadas y conservadas antes/después sobre TB main deaf16c y TC main f8f062e, sin commit.

Entrega devuelta por R1c medio: dos cierres distintos de la misma corrida sustituyen el anterior y pueden borrar su LED quemado, único hecho recibido de esa falla. Con inicio, el resumen afirma ausencia y coherente=true pese al doble cierre avisado; sin inicio, sinAtribuir queda vacío. Cuatro casos válidos por línea: dos controles conservan el hecho y dos variantes de cierre repetido lo pierden; diagnóstico exit 1, no regresión aprobada. No se atribuye esa secuencia al emisor actual.

REG-004 pendiente de corrección de Claude y aceptación humana posterior de Efraín. Doce devoluciones pre-cierre/once funcionales, sin reapertura funcional. Codex solo auditoría/coordinación, sin producto/contrato/CLAUDE.md, commit, push ni publicación. Sin instalador/aula/hardware o benchmark nuevos; AUD-01–06 conservan cierres.

[Informe y evidencia](docs/VERIFICACION-REG004-CLA007-CODEX-2026-10-19.md).

## 2026-10-19 17:30 · Claude: REG-004, R1c corregido

Codex verificó R1a y R1b y devolvió REG-004 por R1c: un segundo cierre de la misma corrida borraba lo que dijo el primero ([verificación](docs/VERIFICACION-REG004-CLA007-CODEX-2026-10-19.md)). Corregido en TecnoBloques: se guardan todos los cierres (COMO-FUNCIONA, sección 68). `test:historia` 33 OK; contra la versión anterior fallan los dos casos de R1c, y el diagnóstico de Codex da 0. Otra vez en revisión.

Sin commit ni push.

## 2026-10-19 16:59 · Codex: REG-004/CLA-008, software e integración verificados

R1c verificado en sus dos reproducciones; R1/R1a/R1b y R2 conservan verificación en los casos ejecutados. Historia 33 OK, integración local Electron 86/86 sin errores de consola, 11 sesiones sintéticas leídas sin avisos. Dieciséis casos independientes aprobados: 5 originales, 3 residuales anteriores, 4 cierres y 4 ampliados; cero errores de esquema por línea. Los dos casos antes fallidos conservan sus hechos. Las contradicciones impiden comparar y el repetido idéntico mantiene la comparación válida.

REG-004 pendiente_externo de aceptación humana de Efraín (unos 10 minutos); Codex registra/verifica el resultado técnico público, sin datos reales. No se acredita hardware, aula o instalador. No se suma cierre total, devolución ni reapertura: doce devoluciones acumuladas/once funcionales; AUD-01–06 conservan cierres.

TC main f8f062e, TB main deaf16c, TS main 9ab3c86, entrega sin commit; lector 4ca98bf9…dfaf64 y prueba 1b3f8fb5…ffae0d estables antes/después. Trabajo existente y evidencia histórica preservados; sin producto/contrato/memorias ajenas, commit, push, etiqueta ni publicación por Codex. [Informe y evidencia](docs/VERIFICACION-REG004-CLA008-CODEX-2026-10-19.md).

## 2026-10-19 17:45 · Codex verifica el lector de REG-004

Software e integración verificados por Codex ([verificación](docs/VERIFICACION-REG004-CLA008-CODEX-2026-10-19.md)). REG-004 queda en `pendiente_externo` hasta la aceptación humana de Efraín. AUD-01 a AUD-06 están cerrados. Se suben las entregas de AUD-06 y REG-004 y los informes y evidencias de Codex, con el sí de Efraín.

## 2026-10-20 · Prueba humana de REG-004 y evento `placa_cambiada`

Efraín trabajó unos 6 minutos en la app como `PRUEBA-01` y `PRUEBA-02` (datos de prueba, sin aprendices) y contrastó la historia del registro con lo que hizo ([informe](validacion/2026-10-20-reg004-aceptacion.md)). Coincidió en las corridas, las fallas (LED quemado y corriente del pin, 64,7 mA), la corrección con 330 Ω y el cambio de equipo durante una corrida, sin avisos. Mostró tres defectos y Efraín decidió corregirlos:
- **Contrato 1, sección 6.1:** entra el evento del editor `placa_cambiada` (`de`, `a`). Efraín cambió de Nano a Uno después de empezar la sesión y nada lo decía. Agregar un tipo no rompe nada. Esquema (`contrato/evento.schema.json`) y revisor (`probar:contrato`, 179 OK) actualizados. Sin cambios en la API ni en el formato del circuito.
- **Lector (TecnoBloques):** sigue la placa y avisa si una corrida usa otra que la elegida; muestra la diferencia del C++ entre compilaciones («`delay(500);` → `delay(200);` (2 veces)»); junta los bloques seguidos y dice el estado final de cada pieza del circuito.

COMO-FUNCIONA, sección 68. Pruebas: `test:historia` 36 OK, `test:registro-app` 87/87, `test:simulador` 53, `test:registro` y `npm test` de TecnoBloques sin fallas. Falta una prueba corta de Efraín con la app corregida; REG-004 sigue en curso y después va a Codex.

## 2026-10-20 · Aceptación humana de REG-004

Segunda prueba de Efraín con la app corregida (`PRUEBA-03`): dos cambios de placa contados en su momento, cinco cambios de la resistencia durante una corrida contados como su valor final, el LED quemado y corregido, y «el mismo programa» en las tres compilaciones porque no cambió bloques. Coincide y no hay avisos. **Efraín acepta la historia** ([informe](validacion/2026-10-20-reg004-aceptacion.md)). REG-004 pasa a revisión de Codex (CLA-20261020-002).

## 2026-10-20 11:47 · Codex devuelve REG-004/CLA-20261020-002 por R3/R4

CLA-20261020-002 devuelta por R3/R4 medios. R3: identificadores reutilizados mezclan instancias; baja→alta→baja oculta la eliminación de la pieza inicial, y cambiar a 1000 Ω→borrar→agregar atribuye ese valor a la nueva de 220 Ω. Dos recorridos de lienzo real y sus historias lo confirman, sin errores JS/esquema. R4: trim y eliminación de líneas vacías dentro de literales raw hacen afirmar «el mismo programa» con datos distintos; cuatro programas compilan con avr-g++ y sus pares de .rodata difieren. Diagnóstico independiente: 10 casos, 6 controles aprobados y 4 fallos, exit 1; no regresión aprobada. [Informe](docs/VERIFICACION-REG004-CLA002-CODEX-2026-10-20.md).

Historia 36, contrato 179, registro-app 87, simulador 53 y registro 142 OK; placas sin errores JS. Electron: 11 sesiones sintéticas sin avisos ni errores de consola. Los 16 casos independientes previos pasan: R1/R1a/R1b/R1c/R2 conservan verificación y AUD-01–06 sus cierres. Primeros intentos de contrato/placas fallaron por sandbox; reintentos fuera del sandbox aprobados, logs originales conservados. Sin suite global, KiCad nuevo, hardware, instalador ni aula.

Claude toma/reserva y corrige R3/R4 con regresiones; luego Codex verifica. Aceptación humana del 20 oct conservada en su alcance; REG-004 pendiente, cierre null, reservas liberadas; REG-005 no iniciado. Fuentes de la entrega y memorias de Claude preservadas con hashes; sin implementación, commit, push o publicación de Codex.

## 2026-10-20 · REG-004: R3 y R4 de Codex corregidos

Codex devolvió la entrega del 20 oct ([verificación](docs/VERIFICACION-REG004-CLA002-CODEX-2026-10-20.md)) por dos defectos del lector, los dos reproducidos antes de corregir:
- **R3:** el lienzo da el primer id libre, así que una resistencia nueva después de quitar `r1` también es `r1`, y el lector las mezclaba: escondía que se quitó la pieza que estaba, o le atribuía a la nueva el valor de la quitada. Ahora cada alta es una pieza nueva, sin nada de la anterior («quitó r1 (resistencia); agregó otra r1 (resistencia)»).
- **R4:** al comparar programas, los espacios y las líneas vacías se quitaban también dentro de los literales, y un cambio de datos en un raw salía como «el mismo programa». Ahora los espacios se ignoran solo fuera de los literales.
- **Además:** una línea larga cambiada se muestra alrededor de lo que cambió; antes el corte podía esconder la diferencia.

COMO-FUNCIONA, sección 68. `test:historia` 50 OK (con el lector anterior fallan 8), el instrumento de Codex 10 de 10 y el lienzo real 2 de 2, sus 16 casos históricos sin residuales y `test:registro-app` 87/87. Va otra vez a revisión de Codex.

## 2026-10-20 12:04 · Codex verifica R3/R4 original y devuelve CLA-003 por R4a

CLA-20261020-003 devuelta por R4a medio; R3 y R4 original verificados. Los 10 casos de CLA-002 pasan y los dos recorridos reales del lienzo conservan la baja y evitan herencia. Los 16 casos históricos pasan sin residuales. R4a: una cadena común continuada con barra inversa y CRLF pierde el espacio/tabulador de la siguiente línea al comparar; el lector dice «el mismo programa» aunque los cuatro C++ compilan y .rodata difiere: 41204200/41094200 frente a 414200. Diecisiete casos adicionales: 15 aprobados y dos reproducciones fallidas, exit 1, cero errores de esquema; no regresión aprobada. [Informe](docs/VERIFICACION-REG004-CLA003-CODEX-2026-10-20.md).

Historia 50, registro-app 87 y registro 142 OK; Electron sin errores de consola, 11 sesiones sintéticas sin avisos. Contrastes de lienzo y avr-g++ ejecutados. App, prueba Electron, contrato, esquema y aceptación conservan hashes de CLA-002. Sin nuevas suites globales, contrato, simulador completo, KiCad, benchmark, hardware, instalador ni aceptación humana; no se acreditan como ejecuciones nuevas.

REG-004 pendiente, cierre null y reservas liberadas. Claude debe tomar/reservar R4a y entregar corrección con ambas regresiones y controles; Codex verifica después. Aceptación humana del 20 oct conservada en su alcance; REG-005 no iniciado. R1/R1a/R1b/R1c/R2 y AUD-01–06 conservan sus verificaciones. Fuentes y evidencias anteriores preservadas; sin producto ni memorias ajenas editados por Codex. Sin commit, push, etiqueta ni publicación por Codex.

## 2026-10-20 · REG-004: R4a de Codex corregido

Codex verificó R3 y R4 y devolvió la entrega por R4a ([verificación](docs/VERIFICACION-REG004-CLA003-CODEX-2026-10-20.md)): una cadena común que sigue en la línea siguiente con una `\` al final y un salto de Windows (CRLF) se daba por terminada en el salto, y el espacio o tabulador de la línea siguiente se ignoraba; el lector decía «el mismo programa» aunque avr-g++ guarda otros bytes. Ahora el empalme (la `\`, espacios opcionales, CR opcional y LF) continúa la cadena. También quité un espacio sobrante del diagrama de la sección 68. `test:historia` 56 OK (con el lector anterior fallan 3), el instrumento de Codex 17 de 17 y los anteriores sin fallos, `test:registro-app` 87/87.

## 2026-10-20 12:19 · Codex verifica R4a y devuelve CLA-004 por R4b

CLA-20261020-004 devuelta por R4b medio; R4a original verificado. Pasan los 17 casos de CLA-003, los 10 de CLA-002, los 16 históricos y los dos recorridos reales de R3. R4b: s.slice(j, j + 100) limita la búsqueda de empalmes dentro del literal. LF con 98 espacios y CRLF con 97 conservan el dato; LF con 99, CRLF con 98/120 espacios o 98 tabuladores afirman «el mismo programa» al cambiar A B por AB. Ocho casos de frontera: cuatro controles aprobados/cuatro reproducciones fallidas, exit 1, cero errores de esquema. Los 16 C++ compilan con avr-g++; los ocho pares de .rodata son 41204200 frente a 414200, con los avisos del compilador conservados. Diagnóstico, no regresión aprobada. [Informe](docs/VERIFICACION-REG004-CLA004-CODEX-2026-10-20.md).

Historia 56, registro-app 87 y registro 142 OK; Electron sin errores de consola y 11 sesiones sintéticas sin avisos. Diff --check limpio en TC/TB/TS. App, prueba Electron, contrato, esquema y aceptación conservan hashes; fuentes y evidencias previas preservadas. Sin nueva suite global, contrato, simulador completo, KiCad, benchmark, instalador, hardware ni prueba humana.

REG-004 pendiente, cierre null y reservas liberadas. Claude debe tomar/reservar R4b y entregar corrección con controles a ambos lados de la frontera; luego Codex verifica. El límite no debe generar igualdad injustificada. No se afirma que el editor DOM conserve esta entrada ni frecuencia natural. R1/R1a/R1b/R1c/R2/R3/R4 original/R4a conservan su verificación y AUD-01–06 sus cierres. Aceptación humana del 20 oct conservada en su alcance; REG-005 no iniciado. Sin producto ni memorias ajenas editados por Codex, commit, push, etiqueta o publicación.

## 2026-10-20 12:43 · Auditoría integral de REG-004 por familias, sin tocar código

Por instrucción de Efraín: 42 ejecuciones sintéticas, dos corridas reales del mismo circuito en Chromium (realista→ideal) y contrastes con avr-g++; 13 familias, cada una seguida inmediatamente por sugerencia, con decisiones/riesgos separados. No se tocó código. INT-01–INT-11 quedan en REG-004; nuevas AUD-07/08 pendientes por rechazo silencioso de tamaño y reemplazo de exportaciones del mismo minuto. [Informe](docs/AUDITORIA-INTEGRAL-REG004-CODEX-2026-10-20.md).

Recomendación central: igualdad exacta del C++ registrado y normalización solo visual. Separar hechos, integridad y comparabilidad antes de concluir «corregido». El prototipo confirma que pasar a ideal sin cambiar conexiones hace desaparecer fallas que el lector llama corregidas.

REG-004 sigue pendiente; Efraín decide prioridades y Claude implementa después de tomar/reservar. No inicia REG-005, no hay otra devolución ni reapertura automática. Sin fuentes, pruebas, esquemas o memorias ajenas modificados; diagnósticos nuevos solo en Temp. Sin suite global/hardware/aula/instalador nuevos, commit, push, etiqueta ni publicación por Codex.

## 2026-10-20 · REG-004: el lector de la historia, rehecho por capas

Codex devolvió la corrección de R4a por R4b (el empalme se buscaba solo en 100 caracteres) y, a pedido de Efraín, hizo una auditoría integral del lector ([informe](docs/AUDITORIA-INTEGRAL-REG004-CODEX-2026-10-20.md)): 13 familias, de las que INT-01 a INT-11 son del lector y AUD-07/AUD-08 de la app. En vez de seguir parchando casos sueltos, Efraín decidió:
- «El mismo programa» solo si el C++ registrado es idéntico; si difiere solo en espacios o saltos, «cambió solo en espacios o saltos de línea». Así R4, R4a, R4b e INT-08 dejan de depender de entender C++.
- «Corrigió» solo entre corridas comparables (mismo modo, mismas no idealidades, misma placa, la pieza sigue y sin huecos). Si no, «ya no se observó» con el motivo, o «no se compara».
- La línea de comandos siempre muestra la historia y sale con 1 si hay problemas.
- Orden: el lector, después AUD-07/08 y luego REG-005. Al final, otra prueba corta de Efraín.

El lector quedó por capas: lectura (UTF-8 estricto, BOM, esquema del contrato con el revisor de TecnoCircuito, líneas apartadas que dejan un hueco), hechos (sesión y equipo, archivos en el orden de su fecha, copias contadas una vez), integridad (huecos, contradicciones, ciclo de vida, reloj) y conclusiones. COMO-FUNCIONA, sección 68, reescrita. `test:historia` 94 OK; la auditoría de Codex, en copia, 33 de 34 en E1 (el caso de archivos sin fecha pasados al revés avisa en vez de reordenarlos) y E2 sin residuales del lector; sus instrumentos anteriores pasan, salvo dos controles que esperaban «el mismo programa» con otra sangría; `test:registro-app` 87/87. Va a revisión de Codex; falta la prueba corta de Efraín.

## 2026-10-20 · REG-004: prueba final de Efraín y el resumen

Efraín probó el lector nuevo en la app (`PRUEBA-04`): quemó el LED, lo corrigió con la resistencia, cambió el programa y al final la placa a Nano. La historia coincidió paso a paso, sin avisos, pero el resumen decía «Corregidas al final: ninguna» y «ya no se observaron (cambió la placa)», porque comparaba solo la corrida que vio la falla con la última. Ahora una falla está corregida al final si alguna corrida posterior comparable dejó de mostrarla, sin huecos hasta el final. `test:historia` 95 OK, con la regresión; `test:registro-app` 87/87. [Informe](validacion/2026-10-20-reg004-aceptacion.md).

## 2026-10-20 · REG-004: aceptación final de Efraín

Con el resumen corregido, Efraín acepta la historia del registro ([informe](validacion/2026-10-20-reg004-aceptacion.md)). Queda la verificación de Codex del lector rehecho (CLA-20261020-006 y -007).

## 2026-10-20 13:41 · Verificación de la respuesta a la auditoría integral de REG-004

Codex revisó CLA-20261020-006/007/008 por pedido de Efraín: lector 216a63f2…58a1c7, prueba ea3bb3a6…61532e, sin commit sobre TB 86433d1 y TC 56baf57. CLA-20261020-006/007 devueltas parcialmente: cinco familias residuales y una alineación documental. INT-RES-01: el resumen acredita corrección con corrida origen incompleta/incoherente (cinco variantes). INT-RES-02: ignora huecos posteriores al último cierre (cuatro). INT-RES-03: solapamiento de corridas sin aviso/exit 0 y otras contradicciones causales solo avisadas (cuatro). INT-RES-04: pistas JSON escapadas crean otra identidad y dejan el grupo original sin su hueco (una). INT-RES-05: horas finitas fuera de Date rompen narración o descartan la historia de una sesión (tres). DOC-01: contrato/esquema todavía equiparan desaparición a corrección sin condiciones. Sugerencia inmediata tras cada hallazgo en el informe; sin tocar código.

Historia 95, Electron registro-app 87 (11 sesiones sintéticas sin avisos, sin errores de consola) y registro 142 OK. 42 ejecuciones integrales: solo observación deliberada de segmentos sin fecha al revés y AUD-07/08 pendientes; 53 casos históricos aprobados con dos expectativas de espacios adaptadas a igualdad exacta. Ampliación nueva: 26 casos, 17 fallidos y 9 con resultado esperado; datos/CLI texto y JSON conservados, diagnóstico exit 1, no regresión aprobada. Caso de corrección comprobada antes de cambiar placa aprobado; aceptación humana final registrada por Claude conservada. Sin nuevo lienzo, compilador, suite global, KiCad, benchmark, hardware, instalador ni aula. [Informe](docs/VERIFICACION-REG004-INTEGRAL-CLA007-CODEX-2026-10-20.md). Claude toma y reserva las familias residuales, corrige comparabilidad compartida, huecos hasta fin, ciclo de vida y pistas decodificadas, además de fechas y documentación; entrega versión identificable y Codex verifica. REG-004 pendiente, cierre null, reservas documentales liberadas. AUD-07/08 y REG-005 mantienen el orden autorizado, sin implementación iniciada. No se reabren los cierres históricos R1–R4a/AUD-01–06 por estos nuevos adversos.

Sin fuentes, pruebas, esquemas ni memorias ajenas modificados. Diagnósticos nuevos solo en Temp; evidencia permanente sintética. Se conserva la aceptación humana final registrada por Claude con Efraín, sin atribuir otra sesión humana al revisor. Sin implementación, commit, push, etiqueta o publicación por Codex.

## 2026-10-20 · REG-004: un solo criterio para los pasos y el resumen (INT-RES-01 a 05)

Codex verificó el lector rehecho y lo devolvió por cinco familias de casos adversos y una de documentación ([verificación](docs/VERIFICACION-REG004-INTEGRAL-CLA007-CODEX-2026-10-20.md)). Todas venían de lo mismo: el resumen no usaba el criterio de los pasos. Ahora, para dar una falla por corregida al final, todo el tramo desde la corrida que la vio hasta la última línea de la sesión tiene que estar acreditado: corridas completas y coherentes (la de origen incluida) y sin huecos, también después del último cierre. Además:
- Las corridas que se cruzan, una corrida después del fin de la sesión, un cierre con dos tiempos y una pausa o reanudación imposible son contradicciones de la corrida, que le impiden compararse.
- La sesión de una línea apartada sale del JSON ya decodificado: un escape no crea otra sesión.
- Una hora que no es una fecha se aparta y la narración no se cae.
- **Contrato 6.1 y descripción de `fallas` en el esquema (solo redacción):** que una falla desaparezca es corrección solo entre corridas comparables. `probar:contrato` 179 OK.

COMO-FUNCIONA 68 actualizada. `test:historia` 116 OK (con el lector anterior fallan 18), los diagnósticos de Codex 26/26 y 17/17, `test:registro-app` 87/87. Las cuatro sesiones de prueba de Efraín conservan sus conclusiones.

## 2026-10-20 17:31 · Verificación de REG-004/CLA-20261020-009

Codex revisó la entrega por pedido de Efraín: lector 63d4551f…bcfeff, prueba 94df9e2b…f52bf7, esquema 8f18ef5c…e7fccc; sin commit sobre TC 56baf57 y TB 86433d1. CLA-20261020-009 devuelta parcialmente por INT-RES-03a/03b medios: tres variantes de evidencia temporal descartada por deduplicar fallas o reemplazar el tiempo de un cierre, y un cierre posterior al fin de sesión que sigue acreditando corrección. En la mínima de falla repetida a 500/1500 ms y cierre a 1000 ms, texto/JSON salen 0 y sin avisos; al invertir las ocurrencias sí detecta el tiempo imposible. No se cierra REG-004; sugerencia inmediata tras cada hallazgo en el informe, sin tocar código.

Los 26 casos anteriores pasan (17 fallos previos eliminados), al igual que 53 diagnósticos históricos. Historia 116, Electron registro-app 87 (11 sesiones sintéticas leídas sin avisos y consola sin errores), registro 142 y contrato 179 OK. E1/E2: 42 ejecuciones con solo la observación deliberada de segmentos sin fecha al revés y AUD-07/08 pendientes. Nueva ampliación: 18 casos, 4 fallidos, 12 con resultado esperado y 2 observaciones del límite declarado de corrida anterior sin cierre; 36 salidas CLI conservadas, diagnóstico exit 1, no regresión aprobada. INT-RES-01/02/04/05 y DOC-01 comprobados en los originales; los originales de INT-RES-03 pasan pero su familia conserva estos dos residuales. El cambio del esquema frente a CLA-007 se limita a descripción/finales de línea, verificado por reconstrucción de hash. Sin nuevo lienzo, compilador AVR, suite global, simulador completo, KiCad, benchmark, hardware, instalador o aula. [Informe](docs/VERIFICACION-REG004-CLA009-CODEX-2026-10-20.md). Claude toma/reserva INT-RES-03a/03b y entrega corrección por familia, preservando todas las evidencias temporales y aplicando el fin de sesión a los cierres tardíos; Codex verifica. REG-004 pendiente, cierre null, reservas del revisor liberadas. AUD-07/08 y REG-005 conservan el orden y no se inician por esta revisión. Aceptación humana final registrada por Claude conservada en su alcance; no hubo otra sesión humana del revisor.

Fuentes/evidencia previa preservadas por hash. Sin código, pruebas, esquemas o memorias ajenas editados; diagnósticos nuevos solo en Temp, evidencia permanente sintética. Sin implementación, commit, push, etiqueta o publicación por Codex.

## 2026-10-21 · REG-004: el tiempo de cada falla y de cada cierre (INT-RES-03a/03b)

Codex devolvió la entrega anterior por dos casos que todavía daban una corrección por acreditada ([verificación](docs/VERIFICACION-REG004-CLA009-CODEX-2026-10-20.md)): el lector se quedaba con la primera repetición de una falla y con el tiempo del último cierre, y un cierre que llegaba después de `sesion_terminada` seguía contando. Ahora:
- Cada falla que llega y cada cierre se guardan con su tiempo, también las repeticiones (`ocurrencias` y `tiemposCierre` en `--json`). Cada cierre se compara con las fallas, pausas y reinicios de **su mismo tramo del reloj**: el RESET del botón pone el reloj de la corrida en cero y empieza otro tramo. El lector anterior ya daba un falso positivo con un RESET seguido de un cierre pronto; ahora no. Lo comprueba una corrida real en Electron (reinicio a 1524 ms, cierre a 201 ms, sin avisos).
- Son contradicciones de la corrida, que le impiden compararse: dos cierres con tiempos distintos, cualquier evento después de su cierre (salvo un cierre repetido idéntico), cualquier evento después del fin de la sesión y empezar mientras otra corrida seguía abierta sin que esa se cerrara nunca (el límite que Codex dejó en observación).
- Límite conocido: si el Worker no confirma el cierre en 500 ms, una falla de esa espera puede tener más tiempo que el cierre; la corrida no se compara (se pierde una comparación, no se afirma nada falso).

COMO-FUNCIONA 68 con el diagrama de los tramos. `test:historia` 135 OK (con el lector anterior fallan 18), `test:registro-app` 88/88, `test:registro` 142, `probar:contrato` 179; los diagnósticos de Codex pasan, salvo un control de CLA-008 cuyos dos cierres «idénticos» dicen 3000 y 4000 ms, que ahora no es coherente.

## 2026-10-21 10:08 · Verificación de REG-004/CLA-20261021-001

Codex revisó por pedido de Efraín la entrega sin commit: lector 45bfba07…43a3b, prueba 2d6fe78e…a63f4 y Electron f50836ea…630eb, bases TC 56baf57/TB 86433d1/TS 5665e60. CLA-20261021-001 devuelta parcialmente por INT-RES-03c medio: una foto anterior al RESET que llega después se asigna al tramo nuevo; falla a 20 ms del reloj anterior y cierre confirmado a 10 ms del nuevo producen coherente=false y CLI 1 en una corrida válida. Núcleo y controlador reales con entrega de Worker controlada; tres casos, dos controles aprobados y un falso positivo, diagnóstico exit 1. INT-RES-03a/03b originales comprobados; REG-004 no se cierra.

Historia 135, Electron registro-app 88 (11 sesiones sintéticas sin avisos), registro 142, contrato 179 y fotos 31 OK. Ampliaciones anteriores 18/18 y 26/26; 53 casos históricos conformes, con dos expectativas de espacios y un control de cierre duplicado adaptados en memoria. El control original 3000/4000 falla y su log se conserva; con 3000/3000 pasan los cuatro casos. E1/E2: 42 ejecuciones, solo observación deliberada de segmentos sin fecha al revés y AUD-07/08. El primer intento de fotos fue bloqueado por el sandbox; reintento autorizado aprobado. Sin consola de error reportada en Electron. Sin suite global, simulador completo, AVR, KiCad, benchmark, instalador, hardware ni aula nuevos. [Informe](docs/VERIFICACION-REG004-CLA21001-CODEX-2026-10-21.md). Claude toma/reserva INT-RES-03c y entrega la atribución temporal del RESET con hechos pendientes, conservando las comprobaciones de tiempos imposibles genuinos; Codex verifica. REG-004 pendiente, cierre null y reservas liberadas; AUD-07/08 pendientes y REG-005 sin iniciar. Aceptación humana final registrada previamente conservada, sin nueva prueba humana de Codex.

Reproducción mínima conservada con datos sintéticos: núcleo/controlador reales y Worker controlado; sin afirmar frecuencia en aula ni una nueva validación humana. Fuentes y evidencias anteriores preservadas por hash. Sin implementación de producto, memorias de Claude editadas, commit, push, etiquetas o publicación por Codex.

## 2026-10-21 · Contrato 1: el tramo del reloj en los eventos del simulador (REG-004, INT-RES-03c)

Codex comprobó la entrega anterior y la devolvió por un falso positivo ([verificación](docs/VERIFICACION-REG004-CLA21001-CODEX-2026-10-21.md)): una foto tomada antes del RESET que llega después quedaba en el reloj nuevo, y una corrida válida salía «incoherente». Por el orden de escritura no se puede saber. Decisión de Efraín: identidad temporal explícita.
- **Contrato 6.1 (aditivo):** los eventos del simulador suman el campo opcional `tramo`, cuántos RESET con el botón llevaba la corrida cuando ocurrió el hecho. Esquema actualizado; `probar:contrato` 182 OK (se acepta y se rechazan el negativo y el decimal).
- **`simulador.js`:** guarda el turno de cada RESET de la corrida; el tramo de una foto es cuántos RESET tienen un turno menor o igual al suyo (el Worker marca cada foto con el turno de su última orden). Los eventos de la página llevan el tramo del momento.
- **Lector de TecnoBloques:** usa `tramo` cuando viene; un registro anterior se lee por el orden de escritura.

Por pedido de Efraín, Codex verifica solo este caso, sin buscar casos nuevos. `probar:fotos` 33 (la foto de antes del RESET, entregada antes y después, queda en el tramo 0), Chromium registro 18, simulación 20 y servo 19; la reproducción de Codex 3/3 con salida 0. En TecnoBloques, `test:historia` 142 (con el lector anterior fallan 2), `test:registro-app` 88/88, `test:registro` 142 y `test:simulador` 53. COMO-FUNCIONA 68 con el diagrama.

## 2026-10-21 10:49 · Cierre de REG-004/CLA-20261021-003

CLA-20261021-003 verificada en el alcance limitado pedido por Efraín: INT-RES-03c corregido mediante el campo opcional tramo, tres variantes originales con seis CLI 0, sin avisos ni errores de esquema; se conservan las fallas de la foto anterior. Los tiempos imposibles genuinos del reloj nuevo siguen impidiendo comparar. REG-004 pasa a verificado, reservas liberadas, aceptación humana final del 20 oct conservada. Verificación limitada por pedido de Efraín a 03c, controles y regresiones, sin buscar casos nuevos. Emisor 21ff8e07…e432d0, lector c4914ca6…f354d1, esquema 6b4fbb6d…788722 y bundle local 3cf0e35f…2905f5, sin commit sobre TC 56baf57/TB 86433d1.

Fotos 33, contrato 182, historia 142, Electron registro-app 88 (11 sesiones sintéticas sin avisos y consola sin errores), registro 142 e integración simulador 53 OK. Chromium registro 18, simulación 20 en reintento y servo 19 OK; primera simulación: 19 OK y un fallo de parpadeo D8 a 265 ms frente a 200 ms. Repetición sin cambios ni umbrales relajados, con cargador y sin suites concurrentes; ambos logs conservados. Ampliaciones anteriores 18/18 y 26/26, más 53 comprobaciones históricas conformes con las adaptaciones ya acordadas en memoria. Diff de fuentes limpio; el diff completo marca únicamente espacios finales en los dos generados, iguales a HEAD. Contrato, esquema, dos bitácoras y Proyecto hermano coherentes; hashes preservados. Sin casos nuevos buscados, E1/E2 nuevos, suite global TC, KiCad, instalador, hardware, aula ni nueva aceptación humana. [Informe](docs/VERIFICACION-REG004-CLA21003-CODEX-2026-10-21.md). Claude conserva los documentos de Codex y gestiona commit/push de TC, TB y TS conforme a la autorización de Efraín; Codex no los ejecuta. AUD-07/08 siguen pendientes y REG-005 no se inicia por este cierre. Registros anteriores sin tramo conservan su límite temporal documentado; no se declara corrección retroactiva.

Fuentes y evidencias anteriores preservadas por hash; sin producto ni memorias de Claude editados por Codex. Sin commit, push, etiquetas o publicación del revisor.

## 2026-10-21 · Contrato 1: evento_descartado; el registro ya no pierde eventos ni exportaciones en silencio (AUD-07 y AUD-08)

Dos hallazgos de la auditoría integral de Codex (INT-12 e INT-13) en el escritor del registro de TecnoBloques, corregidos con las decisiones de Efraín:
- **AUD-07, contrato 6.1 (aditivo):** entra el evento del editor `evento_descartado`. Un evento que no se puede guardar (su JSON pasa de 2 097 152 caracteres, no se puede convertir a texto o no trae tipo) deja este en su lugar, con `motivo` y, si se saben, `tipo`, `origen`, `corrida`, `largo` y `limite`. La esquina de la app dice «El registro perdió un evento · Avisen al instructor» hasta cerrarla y el panel del instructor lo detalla. La historia lo cuenta como un hueco. Esquema y revisor actualizados; `probar:contrato` 189 OK.
- **AUD-08:** cada exportación en su propia carpeta (sufijo -2, -3… si ya hay una del mismo minuto), sin pisar archivos, con `exportacion.json` (bytes y sha256 de cada archivo, `completa`). Sin cambio de contrato.

COMO-FUNCIONA 69 con los diagramas. En TecnoBloques: `test:registro` 174, `test:registro-app` 99 (Electron, con la esquina, el panel y dos exportaciones seguidas), `test:historia` 146. Los diagnósticos de Codex no reproducen INT-12 ni INT-13 (con la condición de INT-12 mirando la señal nueva).

## 2026-10-21 15:34 · Auditoría profunda única de AUD-07/AUD-08 y registro integrado

Auditoría profunda única de CLA-20261021-005 completada: ocho familias reproducidas (tres altas, cinco medias), 17 variantes de fallo en 25 escenarios diagnósticos. Las suites nominales pasan. F01: el lector ignora manifiestos y puede acreditar corrección con una copia incompleta/alterada; F03: configuración parseable mal formada lanza o admite estados inválidos; F04: tramos inexistentes eluden la comprobación temporal. F02: unión de copias pierde multiplicidad; F05: marcador descartado por cola llena se cuenta anotado; F06: panel obsoleto y aviso oculto al apagar; F07: EACCES del origen se confunde con vacío; F08: byte UTF-8 roto aparta otra línea válida. Propuesta y aceptación para cada causa, más once riesgos/límites separados, en un solo informe. Registro 174, historia 146, contrato 189, Electron registro-app 99, preprocesador 74, herramientas 6 e integración simulador 53 OK; npm test exit 0 y errores registrados de ambos scripts inspeccionados. Node adicional: 23 casos, 15 incumplimientos, 7 controles conformes y una hipótesis excluida por no ser entrada JSON del emisor normal. Electron adicional: dos fallos de interfaz reproducidos, sin errores de consola. Los diagnósticos salen 1 porque reproducen fallos; no son regresiones aprobadas. Datos sintéticos, mocks por ruta propia, fuentes y evidencias anteriores conservadas. Sin nueva suite global TC, KiCad, benchmark, instalador, USB física, hardware ni aula. [Informe](docs/AUDITORIA-PROFUNDA-AUD07-AUD08-CODEX-2026-10-21.md).

No hay visto bueno del conjunto. AUD-07 vuelve a pendiente por F05/F06; el original de AUD-08 queda verificado (destinos exclusivos y primera copia intacta), sin acreditar el consumidor ni la distribución. AUD-09–AUD-14 quedan pendientes para los problemas independientes. Claude prepara una corrección conjunta por paquetes y la matriz completa del informe, sin implementación iniciada por Codex; Efraín decide prioridades. REG-005 no se inicia por este registro. Los cierres históricos conservan sus comprobaciones acotadas. Auditoría ampliada por pedido directo de Efraín; sin validación de hardware o del aula ni aprobación del conjunto para publicar. Fuentes y evidencia previa preservadas por hash. Sin producto o memorias de Claude editados, commit, push, etiqueta o publicación por Codex.

## 2026-10-21 · Registro: el lote de las dos auditorías de AUD-07/08 (AUD-07, AUD-09 a AUD-14)

La entrega de AUD-07/08 pasó por dos auditorías: un auditor aparte que pidió Efraín (A-01 a A-10) y la auditoría profunda de Codex (F01 a F08; [informe](docs/AUDITORIA-PROFUNDA-AUD07-AUD08-CODEX-2026-10-21.md)), que verificó el caso original de AUD-08 y abrió AUD-09 a AUD-14. Se corrigió todo en un lote, con dos decisiones de Efraín: la esquina avisa los eventos perdidos **por equipo** y la historia **admite** una exportación antes de leerla.
- **Escritor:** un solo validador de la configuración (`null`, `[]` o encendido sin PIN son ilegibles, sin lanzar); el marcador cuenta como anotado solo al escribirse (pendiente o sin anotar si no); lleva la hora del evento perdido; la cuenta va también por sesión; exportar distingue el origen del destino, borra el pedazo de una copia fallida, compara bytes y anota `faltan`.
- **Historia:** admite exportaciones con su `exportacion.json`; lee la copia más completa de un mismo archivo; un tramo del reloj que no existe no es evidencia; decodifica UTF-8 por línea; un cierre perdido no acusa a las corridas siguientes; nada se compara a través de un hueco.
- **Contrato 6.1 (solo redacción):** la `t` de `evento_descartado`, sus motivos y qué tramo lleva cada evento del simulador.

COMO-FUNCIONA 69 reescrita. `probar:contrato` 189; en TecnoBloques `test:registro` 202 y `test:historia` 175. El diagnóstico de Codex da 23/23 sin incumplimientos (antes 15) y los del auditor no reproducen sus fallos.

## 2026-10-21 17:21 · Codex: verificación parcial del lote de la auditoría profunda

Verificación de CLA-20261021-007: siete de ocho familias (F02–F08) verificadas, seis fichas AUD-07/10/11/12/13/14 cerradas. AUD-09 devuelta por R1 residual de estructura de pendientes: seis formas inválidas y el caso con cola real salen limpios y acreditan final; una omisión, una devolución funcional. Cuatro originales de F01 y 23 escenarios Node pasan. Aviso por equipo comprobado según A-05 registrado por Claude; no se aprueba el criterio antiguo sustituido. Once riesgos/límites siguen explícitos, con mejora de hora; sin visto bueno del conjunto ni inicio de REG-005. Registro 202, historia 175, contrato 189, Electron registro 105, preprocesador 74, herramientas 6 e integración 53 OK; generales exit 0 y errores registrados revisados. Node adicional 14 escenarios: siete residuales, cinco controles y dos observaciones no elevadas a defecto; Electron independiente 4/4 y capturas verificadas. Solo datos sintéticos; fuentes, memorias de Claude y evidencias anteriores preservadas. Sin suite global TC, KiCad, benchmark, instalador, USB física, hardware, aula ni aceptación humana nueva. [Informe](docs/VERIFICACION-CLA007-AUD07-AUD09-AUD14-CODEX-2026-10-21.md). Bases TC main 0894750 / TB main 720b908 / TS main f6ccd45 con entrega sin commit identificada por hashes. Claude conserva la implementación; Codex deja reproducciones, cierres y devolución en fichas/canal COD-20261021-004. Sin publicación ni modificación de producto.

## 2026-10-21 · Registro: el manifiesto de una exportación se valida como estructura (AUD-09-R1)

Codex verificó AUD-07 y AUD-10 a AUD-14 ([verificación](docs/VERIFICACION-CLA007-AUD07-AUD09-AUD14-CODEX-2026-10-21.md)) y devolvió AUD-09 por un residual: un `pendientes` ausente o mal formado ("1", null, negativo, fracción, objeto) contaba como cero, y una exportación con un evento esperando salía limpia. Ahora el lector valida toda la estructura de `exportacion.json` de formato 1, sin convertir nada; si no es válido, la exportación no se admite. COMO-FUNCIONA 69. En TecnoBloques `test:historia` 192; el diagnóstico de aceptación de Codex da 14/14 y el profundo 23/23.

## 2026-10-21 18:00 · Codex: cierre verificado de AUD-09/R1

AUD-09/R1 verificado tras CLA-20261021-008: ocho familias F01–F08 verificadas en su matriz de software. Historia 192, registro 202, aceptación de Codex 14/14 y diagnóstico profundo 23/23, exit 0. El manifiesto inválido ya no acredita final, con cola real y controles cero/positivo. Fuentes y memorias de Claude preservadas; delta solo lector/prueba y documentación. Sin nueva devolución ni reapertura: acumulados 20/19 funcionales. Visto bueno técnico del lote, sin acreditar eliminados once riesgos/límites, distribución, USB real, hardware o aula; REG-005 sigue pendiente. [Informe](docs/CIERRE-AUD09-CLA008-CODEX-2026-10-21.md). Bases main TC 0894750 / TB 720b908 / TS f6ccd45, entrega sin commit y hashes completos en manifiestos. Claude conserva implementación, memorias y gestión de Git; Efraín decide la siguiente entrega. Codex registra cierre/canal COD-20261021-005 sin modificar producto.

## 2026-10-22 · Contrato 1: confirmado en el cierre; revisión final del registro (REG-005)

Fase 5 del registro. Revisión de código (`/code-review`, por separado en los dos proyectos): 25 hallazgos, cada uno verificado contra el código. Con la decisión de Efraín se corrigieron 17, cada uno con su regresión, que falla con el código anterior. Los otros 8 (rendimiento y rediseño) quedan en la tabla de riesgos de COMO-FUNCIONA 70.

- **Contrato 1, sección 6.1 (aditivo; decisión de Efraín):** `simulacion_detenida` suma `confirmado`. Es `false` si el cierre salió sin la confirmación del Worker (la espera de 500 ms, cerrar la ventana o una última foto que falló), y la historia no compara esa corrida. Esquema y `probar:contrato` actualizados. La sección 6.1 pasa a describir lo implementado: el tiempo de lo que emite la página, cómo se escribe y se exporta, la excepción `/**/` del 18 oct y los límites para leer los datos. Sin cambios en la API ni en el formato del circuito.
- **Simulador:**
  - Al pulsar RESET, lo pendiente sale con el turno de antes, en su tramo; si esa foto falla, el RESET se hace igual.
  - Lo que emite la página nunca dice un tiempo menor que un hecho ya registrado de su tramo. Antes daba un falso «falla después del cierre».
  - El Worker confirma que paró aunque su última foto falle.
  - Sin Worker, destruir sin esperar detiene el reloj de la página.
  - `activas` guarda solo las claves conocidas, como booleanos.
  - `destruir()` suelta sus oyentes del lienzo: `alCambiar`, `_alPulsar` y `_alAcercar` devuelven cómo quitarlos.
- COMO-FUNCIONA 70: el camino de un evento, el tiempo de cada evento del simulador, lo que encontró la revisión y la tabla de lo que el registro no garantiza (los once riesgos de Codex, tres de rendimiento y dos del simulador).

Pruebas: `probar:fotos` 46 (con `trabajador.js` real, reloj y canal controlados), `probar:contrato` 191, `probar:nucleo` 120, `probar:corte` 7; Chromium: registro 18, simulación 20, T1/T2 17, prototipo 25, servo 19. En TecnoBloques: `test:registro` 204, `test:historia` 198, `test:registro-app` 115, `test:simulador` 53 y `test:registro-preprocesador` (avr-g++, todos los casos y 2000 al azar) sin fallas. No se corrió la suite global, ni KiCad, el instalador, hardware o el aula.


## 2026-10-22 11:55 · Codex: auditoría completa de REG-005, devuelta

Auditoría completa autorizada por Efraín de CLA-20261022-002 sobre TC main cfeee9b / TB main 1c6c660 / TS main a3c8ca2 y entrega sin commit identificada por SHA256. Nueve defectos funcionales, uno de comprobación y dos documentales; seguimiento AUD-15–AUD-23 y 15 riesgos/límites con posibles soluciones. [Informe y reproducciones](docs/AUDITORIA-REG005-CODEX-2026-10-22.md). Sin visto bueno del conjunto ni reapertura automática de cierres históricos.

TC completo: 1251 OK y una falla de pausa; repetición aislada 18/18 sin cambios, KiCad real Uno/Nano ejecutado. TB registro 204, historia 198, preprocesador 74 con 2000 aleatorios, Electron registro 115, simulador 53, graficador 28 y generales aprobados con errores revisados. Históricos 14/14 y 23/23; diagnósticos propios Node 6 incumplimientos en 9 escenarios y Electron 4 en 5, con controles y sin errores JS. No son regresiones aprobadas. Solo datos sintéticos; fuentes y memorias de Claude preservadas, sin implementar producto, commit, push, etiqueta ni publicación. No probado instalador, USB real, hardware ni aula. Efraín decide prioridad; Claude conserva la implementación.


## 2026-10-24 — Lote alto de la auditoría de REG-005 (AUD-15, AUD-16, AUD-19 y AUD-22)

Efraín aprobó corregir primero los cuatro defectos de prioridad alta de la [auditoría de Codex](docs/AUDITORIA-REG005-CODEX-2026-10-22.md). Antes de corregir, los reproduje con copias de sus diagnósticos. Lo de este proyecto:

- **AUD-16 (R02), `src/trabajador.js` y `src/simulador.js`:** el núcleo entrega cada falla en una sola foto; si esa foto no salía, la falla se perdía y el cierre decía `confirmado: true`. Ahora el Worker lleva la integridad de la corrida: una foto que no sale la deja incompleta hasta la corrida nueva, y su `detenido` trae `integra: false`, así que el cierre dice `confirmado: false`. Los hechos perdidos no se reenvían en otra foto, porque quedarían con otro turno y otro tramo del reloj. La vuelta periódica ya no se corta si una foto falla: avisa la primera de la corrida y sigue. Si falla la primera foto, el reloj arranca igual.
- **Contrato 6.1 y esquema, solo redacción:** `confirmado: false` también cuando se perdió una foto (AUD-16), y «la pieza sigue» es la misma pieza, no otra con su id ni la de otro proyecto o ejemplo (AUD-15, en el lector de TecnoBloques). Sin campos nuevos.
- AUD-15, AUD-19 y AUD-22 son de TecnoBloques (su bitácora).

Las seis regresiones nuevas de `probar_fotos.js` (sección 14) fallan con el `trabajador.js` y el `simulador.js` anteriores, reconstruidos e identificados por su sha256. Dos de ellas fallan solo porque el campo `integra` no existía.

Pruebas (corridas una tras otra): `probar:fotos` 52, `probar:contrato` 191, `probar:nucleo` 120, `probar:corte` 7; Chromium: registro 18, simulación 20, T1/T2 17, prototipo 25, servo 19. En TecnoBloques: `test:registro` 204, `test:historia` 209, `test:registro-app` 120, `test:registro-preprocesador` 74, `test:simulador` 53, `test:graficador` 28. Sin fallas. Los diagnósticos de Codex, corridos desde una copia, pasan en R01, R02 (las dos variantes), R10, R05 y R07; R03, R04, R06 y R09 siguen fallando: son del lote siguiente. No se corrió la suite global de TC, KiCad, el instalador, hardware ni el aula.

## 2026-10-25 — Lote final del registro (F01 a F05, AUD-17 a AUD-26, D01 y D02)

Efraín decidió entregar en un lote todo lo que quedaba del registro tras la [verificación profunda de Codex del 24 oct](../TecnoSuite/registro/auditoria-20261024/INFORME.md), y contener ahora el riesgo W-R1. Lo de este proyecto:

- **AUD-26 (W-R1), `src/trabajador.js` y `src/simulador.js`:** una excepción del núcleo fuera de la foto (al avanzar, reiniciar o recablear) cortaba el reloj del Worker; la página seguía «corriendo» y el cierre decía `confirmado: true`. Ahora el Worker atrapa el error, para el reloj a propósito, deja la corrida incompleta y avisa con su turno y `parado: true`; «seguir» no vuelve a arrancar un núcleo que falló. La página no da por entera la corrida que avisó un error, la cierra si el reloj paró y su cierre sale con `confirmado: false`; también ante `error` o `messageerror` del Worker después de cargar. No se reintenta solo.
- **AUD-23 (R08), `pruebas/probar_registro.py` y `probar_fotos.js` 16:** la prueba de la pausa comparaba lo que la página sabía en dos momentos, y una foto anterior que llegaba tarde subía ese valor. En Chromium se compara ahora la primera foto del Worker al seguir con lo que se sabía al seguir; en Node, el reloj del Worker durante la pausa y la foto tardía por separado.
- **Contrato 6.1 y esquema, solo redacción:** `confirmado: false` también cuando el simulador avisó un error en la corrida (AUD-26), y qué son `sesion` y `corrida` (D02): una sesión por cada vez que un equipo confirma su código, no por apertura de la app; la corrida cuenta mientras la página está abierta y no vuelve a 1 en cada sesión. Sin campos nuevos ni cambios de validación.
- **COMO-FUNCIONA 71:** lo corregido en el lote, el diagrama de la contención de AUD-26, sesión y corrida, la matriz de los 25 hallazgos del 22 oct (D01: 20 con cambio, TC-10 en parte, y 5 sin cambio; la cifra «17/8» estaba mal contada) y lo que cambia en la tabla de riesgos.
- F01 a F05 y AUD-17, 18, 20 y 21 son de TecnoBloques (su bitácora).

Pruebas (una tras otra, 25 oct): suite completa (`npm --prefix prototipo run probar`, con KiCad real y Chromium) 1277 OK y ninguna falla; `probar:fotos` 71, y en Chromium la pausa duró 309 ms con 531 ms al pausar y al seguir, y la primera foto en 552. Con el `trabajador.js` y el `simulador.js` auditados por Codex, las regresiones de AUD-26 fallan (10) y la prueba se corta por la excepción que se escapa. El diagnóstico del Worker de Codex, corrido desde una copia: 29 de 29 conformes, también W-R1. Las pruebas de TecnoBloques, en su bitácora. Pasar una vez no prueba que la intermitencia de la pausa desapareció. No se corrió el instalador, hardware ni el aula.

## 2026-10-25 — Contrato 1: TecnoCircuito.MARCA y la firma de la imagen (MARCA-001)

**Pedido y decisiones de Efraín (25 oct):** TecnoBloques es el contenedor de la Suite y TecnoCircuito conserva su identidad dentro de él. Aprobó la propuesta mínima (panel Circuito, «Acerca de», imagen exportada), sumó una marca de agua en el SVG exportado, pidió «Hecho con:» seguido de la marca y la frase de TecnoCircuito, y autorizó el cambio aditivo del contrato y la versión 0.3.0 con su commit y etiqueta.

- **Contrato 1, sección 2 (aditivo):** entra `TecnoCircuito.MARCA` (`nombre`, `frase`, `simbolo`, `cabeza`), congelado. `src/marca.js` toma los SVG de `marca/svg/` al construir (`construir.js`: cargador `text` para `.svg`), así viajan en `dist/tecnocircuito.js` y se ven sin red.
- **`exportarSVG()`:** la franja de abajo lleva la firma (`marca/svg/firma.svg`, nueva en `generar.py`: «Hecho con:», el logo horizontal y la frase «Prueba tu idea antes de armarla en la placa.», todo en trazados) a escala 0,36, con letras chicas de 8,6 px. Encima del circuito, el símbolo de una tinta al 10 %, centrado. El texto anterior en Arial sale.
- **`marca/MARCA.md`:** la frase, la firma y las reglas de uso dentro de TecnoBloques. COMO-FUNCIONA 72.
- Los SVG que ya existían se regeneran idénticos; los PNG se dejaron como estaban (regenerarlos solo cambia sus bytes).

Pruebas (una tras otra, con cargador, 25 oct): suite completa (`npm --prefix prototipo run probar`, KiCad real y Chromium) 1283 OK y ninguna falla; `probar_svg.py` revisa la firma, la marca de agua y `MARCA`. TecnoBloques, en su bitácora. Sin commit: la versión 0.3.0 y su etiqueta van después de la verificación de Codex.

## 2026-10-25 — MARCA-001: la marca de agua va encima (devolución M1 de Codex)

Codex devolvió MARCA-001 (COD-20261025-002) por **M1**: el ejemplo de aceptación decía «marca de agua detrás del circuito» y `exportarSVG()` la pone encima. El ejemplo lo había escrito yo, y la puse encima a propósito sin consultarlo: detrás, la placa y las piezas, que son opacas, la tapan casi entera. Le mostré las dos a Efraín y **decidió encima, al 10 %**. El código no cambia. `probar_svg.py` suma dos comprobaciones: el orden de capas (fondo, circuito, marca de agua, firma) y que la marca de agua pisa la placa. Con la marca detrás, la del orden falla. `probar_svg.py` 24 OK. Guía de la marca y COMO-FUNCIONA 72 alineadas.

## 2026-10-25 — v0.3.0 etiquetada (MARCA-001)

Codex verificó y cerró MARCA-001 (COD-20261025-003); Efraín aprobó la versión con su commit, etiqueta y push. `npm run preparar-version` armó `dist/tecnocircuito.js` 0.3.0 (contrato 1). Suite completa con cargador (`npm --prefix prototipo run probar`, KiCad real y Chromium): 1285 OK y ninguna falla. Una corrida anterior, también en verde, se repitió porque el PC estaba en batería. Commits `5ebb76f` (MARCA-001), `fdf6eb8` (versión) y `0de3ffd` (paquete); etiqueta `v0.3.0`. TecnoBloques sigue con `#v0.2.0` hasta su 0.4.1, en DIST-001.

## 2026-10-25 — MARCA-002: el chip de TecnoCircuito en la serigrafía de las placas

Efraín aprobó una maqueta de cada placa y las reglas (25 oct): el chip solo, en una tinta, al 80 % del alto de la marca vecina, uno por placa y en un espacio libre. Uno a la izquierda de «1st» (4,2 mm); shield L293D después de «Rev4», girado (2,8 mm); expansión roja y azul entre el jack y el zócalo (2,8 mm); protoboard en el canal central, a la derecha, en azul. Sin marca el Nano y el probador.

- `marca/generar.py` escribe `marca/svg/chip-serigrafia.svg` (fuente única, dos colores de referencia y viewBox exacto). TecnoDiseñador lo dibuja en sus placas con `Lienzo.marca_tc()` (su bitácora) y `npm run vistas` trajo el Uno, la shield y la expansión: solo cambia el dibujo; pines, marcos, LEDs, partes y medidas iguales; el Nano no cambia.
- La protoboard lo recibe del lienzo (`dibujarProtoboard(tipo, chip)`), porque `protoboard.js` también entra al Worker y a las pruebas de Node. El Worker sigue en 91 KB.
- COMO-FUNCIONA 73 y `marca/MARCA.md`, sección «En la serigrafía de las placas».

Pruebas (una tras otra, con cargador, 25 oct): suite completa (`npm --prefix prototipo run probar`, KiCad real y Chromium) 1298 OK y ninguna falla (antes 1285). `probar_vistas.py` 57 (11 nuevas: chips por placa y su alto, sin cruzar contactos, LEDs ni textos, y en la imagen exportada) y `probar_protoboard.py` con 2 nuevas. Con la página anterior al cambio fallan esas 10. TecnoBloques `test:simulador` con esta copia: 58 OK, sin errores. Sin commit.

## 2026-10-27 — LED, resistencia, potenciómetro y pulsador como Piezas Tecno (PIEZA-001 y PIEZA-002)

Efraín pidió integrar las dos fichas a la vez y probar las cuatro piezas; los dibujos de TecnoDiseñador ya estaban aprobados. Inventario previo: las seis entregas `-tc` pasan el revisor (202 comprobaciones, 0 fallas), las cuatro con «Publicable: sí». **Decisión de Efraín (27 oct):** el dibujo nuevo del potenciómetro y del pulsador se marca con `modelo` (`16mm`, `6x6`).

- **Contrato 1, sección 4 (aditivo):** `vatios` en la resistencia (`0.25` o `0.5`: dibujo y límite de calor), `modelo` en el potenciómetro y el pulsador. Esquema, CONTRATO.md (tabla, párrafo de los circuitos guardados e historial) y `mediciones()` con los `vatios` de cada resistencia.
- **Piezas:** `src/piezas/led.js`, `resistencia.js` (bandas por código de colores), `potenciometro.js` (eje de −135° a +135°, rótulo «B10K») y `pulsador.js` (capuchón que se hunde); `npm run vistas` trae las seis vistas. `@wokwi/elements` queda solo para el potenciómetro y el pulsador guardados sin `modelo`.
- **Lienzo:** encaje al abrir también en la protoboard (el LED y la resistencia antiguos quedan sobre sus huecos), `noCompletar` (al abrir no se completan `vatios` ni `modelo`), cambio de potencia con la pata 1 fija, perilla con el mouse, aviso «Dibujo antiguo» y renovación al levantar la pieza, clic solo donde hay dibujo.
- **Núcleo:** el límite sale de `vatios` (sin él, 0,25 W) y la falla sugiere una de ½ W cuando alcanza. **KiCad:** la de ½ W lleva la huella de 15,24 mm.
- **Página de prueba:** los ejemplos sueltos y el de la protoboard pasan a las piezas del kit; el de la protoboard de antes queda como `EJEMPLO_PB_ANTIGUO` (botón «El mismo, guardado antes del 27 oct»).
- **Dos defectos que salieron al integrar, corregidos:** `normalizar` completaba al abrir las props que faltaban y borraba la marca de «guardada antes» (ahora `noCompletar`); `encajar` tomaba como guía la primera pata y con el LED medido (cátodo primero) arrastraba la pieza un paso entero hacia la protoboard (ahora, la pata que mejor cae; lo encontró `probar_enchufe.py`).
- COMO-FUNCIONA 74; NOTICE y especificación de entrega al día. En TecnoBloques: los ejemplos `val_adc` y `val_nano_adc67` con el potenciómetro del kit y `test/simulador.js` con el LED medido (su bitácora).

Pruebas (una tras otra, con cargador, 27 oct): suite completa (`npm --prefix prototipo run probar`, KiCad real y Chromium) 1372 OK y ninguna falla (antes 1298), con `probar_piezas.py` nueva (43). Antes y después contra HEAD: los 22 circuitos de referencia abren con las mismas conexiones, props y giros (solo se corren el LED y las resistencias encajados) y 126 corridas del núcleo dan fotos idénticas cuadro a cuadro, salvo el campo `vatios`. Paquete 527 → 556 KB; Worker 91 KB. TecnoBloques: `test:simulador` 58 y `test:registro-app` 134 sin fallas, `npm test` y `test:app` sin errores. Sin commit. Falta: auditor estricto y `/code-review`, la verificación de Codex, la versión `v0.4.0` con el sí de Efraín y la prueba en la protoboard real.

## 2026-10-28 — Revisión de PIEZA-001 y PIEZA-002, corregida en un lote

Por pedido de Efraín, un auditor estricto aparte y `/code-review` revisaron la entrega del 27 oct (`2808fd8`). Efraín aprobó corregir todo en un lote y aceptó mis cuatro recomendaciones. Detalle en COMO-FUNCIONA 74, «Revisión».

- **Lo alto (A-01, lo vieron los dos):** cambiar la potencia de una resistencia encajada dejaba guardados, y en el simulador, los huecos viejos: el lienzo avisaba el cambio antes de que el dibujo nuevo llegara y la pieza volviera a encajar. Ahora `cambio()` va al final de `rehacerVista`.
- **Lienzo:** el dibujo se rehace solo si cambian su tamaño o sus pines (otro valor solo pinta las bandas); `renovar` mide el centro de las patas respecto de la pieza (antes saltaba unos 12 px) y no emite `componente_cambiado {modelo}` (D3); al abrir, las piezas de wokwi en la protoboard no se corren y una vuelta sin corrimiento termina; aviso «Dibujo antiguo: muévelo un poco y toma el del kit.»
- **Una sola regla de vatios:** `potenciaDe` en `motor/red.js` (0.25 o 0.5, número o texto; lo demás, sin `vatios`), que usan el dibujo, la ficha, el calor y KiCad.
- **KiCad (D1 y D2):** la resistencia sin `vatios` lleva la DIN0207 a 15,24 mm, como se dibuja; el potenciómetro del kit, la Alps RK163 Single Horizontal (patas a 5 mm), y el guardado sin `modelo`, la RK09K de siempre.
- **Ficha:** con el dibujo antiguo, da las patas de ese dibujo (potenciómetro a 1 paso, botón a 7 de lado a lado).
- **Documentos:** contrato 4 (la resistencia antigua también se corre; el cambio de dibujo sin evento propio; D4: lo que ve una versión anterior, solo redacción); `validacion/2026-10-27-piezas-kit-medidas.md` con las medidas del 27 oct que cita la biblioteca, traídas de TecnoDiseñador; precisiones en las fichas de TecnoSuite.
- **Visto de paso, anterior a la entrega y sin tocar:** un potenciómetro de wokwi ya elegido mueve su perilla al volver a presionarlo (el dibujo de wokwi enfoca un control invisible). Solo queda en los guardados sin `modelo`.

Pruebas (28 oct): `probar_piezas.py` 43 → 52, con una regresión por hallazgo; contra `2808fd8` fallan 9, y las dos que pasan en los dos están explicadas en COMO-FUNCIONA. `probar_motor.js` y `probar_kicad.js` +2 cada una; `probar_kicad_pcb.py` encuentra las huellas nuevas en KiCad 10.0.3. Suite completa 1391 OK y ninguna falla, con batería y otra vez con cargador. TecnoBloques con este paquete: `test:simulador` 58 y `test:registro-app` 134, sin fallas. Sin commit: por decisión de Efraín, espera la verificación de Codex y su revisión.


## 2026-10-28 10:23 · Codex · Revisión profunda conjunta de PIEZA-001 y PIEZA-002

Verificada la entrega CLA-20261028-001 (TC `2808fd8` más diff identificado): suite completa 1391 OK/0 fallas, KiCad 10.0.3 ejecutado; integración local de TecnoBloques 58 y registro Electron 134 sin fallas. Comparación propia de 74 corridas del núcleo, 60 cuadros y dos referencias: ninguna diferencia inesperada; el control 220/330 Ω sí difiere. A-01 de guardado/Worker y sus ramas, conformes.

**PIEZA-001 devuelta solo por F01 (media):** al elegir ½ W en una resistencia guardada sin `vatios`, ficha y valor cambian pero lienzo e imagen exportada conservan el cuerpo beige de ¼ W; reabrir lo corrige. Regresión de CR-8 demostrada contra `2808fd8`. **PIEZA-002 conforme en software e integración**, con geometría física y uso pendientes de Efraín. [Informe, reproducción y límites](docs/verificacion-piezas-2026-10-28/INFORME.md). Corrección funcional a cargo de Claude; siguiente revisión acotada a F01 y regresiones afectadas. No se modificó código de producto ni memorias ajenas; sin commit/push. Batería observada: no se acredita rendimiento con cargador. El commit del lote y la revisión humana siguen pendientes.

## 2026-10-28 — F01 de Codex: la potencia siempre rehace el dibujo de la resistencia

Codex verificó la revisión (COD-20261028-002, profunda única; su informe en `docs/verificacion-piezas-2026-10-28/`): PIEZA-002 conforme en software e integración, y PIEZA-001 devuelta solo por **F01** (media). Una resistencia guardada sin `vatios` que pasaba directo a ½ W seguía con el cuerpo beige en el lienzo y en la imagen exportada, hasta reabrir. Lo causó mi optimización de CR-8: comparaba solo los marcos, y la ¼ W abierta y la ½ W tienen el mismo marco y las patas a 6 pasos. Ahora el catálogo dice qué props cambian el dibujo aunque el marco no cambie (`rehacerCon: ['vatios']`), y los ohmios siguen pintando solo las bandas.

Pruebas: la regresión nueva de `probar_piezas.py` (sin `vatios` → ½ W: la variante `05w` en el lienzo, la exportación y al reabrir, con las patas quietas) falló antes de corregir y pasa después; `probar_piezas.py` 54. Suite completa 1393 OK y ninguna falla (empezó con batería, terminó con cargador). TecnoBloques con este paquete: `test:simulador` 58 y `test:registro-app` 134. Sin commit: espera la verificación acotada de Codex y la revisión de Efraín.


## 2026-10-28 11:07 · Codex · F01 de PIEZA-001 verificado

Verificación acotada de CLA-20261028-002: antigua sin `vatios` → ½ W ya cambia al cuerpo azul en lienzo e imagen exportada; reapertura y regresiones de A-01/ancla/guardado/Worker conformes. Propio 20/20, piezas 54, enchufe 26, contrato 212, TB simulador 58 y registro-app 134 sin fallas. [Dictamen y evidencia](docs/verificacion-piezas-2026-10-28/r1/INFORME.md). Software/integración de PIEZA-001/002 conformes; fase física/uso pendientes de Efraín, que también revisa y decide el commit/versión. Sin implementación de producto, memorias ajenas ni operaciones Git de escritura por Codex.

## 2026-10-28 — PIEZA-001 y PIEZA-002 verificadas por Codex; ficha PIEZA-003

Codex verificó y cerró F01 (COD-20261028-003, acotada; `docs/verificacion-piezas-2026-10-28/r1/`): su diagnóstico pasa 20/20, con A-01, el ancla en cuatro giros, guardado y Worker conformes. Software e integración de las dos fichas, verificados; quedan en `pendiente_externo` por la geometría en la protoboard real y el uso. Efraín autorizó commit y push. Este commit lleva también la evidencia de las dos verificaciones de Codex.

Efraín preguntó si ya se puede quitar todo el código de Wokwi. `@wokwi/elements` y Lit (unos 29 KB del paquete) solo dibujan el potenciómetro y el botón guardados sin `modelo`: se pueden quitar, y queda abierta la ficha **PIEZA-003**, antes de la `v0.4.0`, con su decisión para los circuitos viejos (abren con el dibujo del kit; en la protoboard, si no caben, quedan sueltos con aviso). `avr8js` también es de Wokwi, pero es el emulador del ATmega328P que ejecuta el `.hex`: se queda (MIT; reemplazarlo sería escribir un emulador propio y repetir la validación de T1 a T3).

## 2026-10-28 — PIEZA-003: sin @wokwi/elements, todas las piezas son Piezas Tecno

Efraín preguntó si ya se podía quitar todo el código tomado de Wokwi. `@wokwi/elements` y Lit solo dibujaban el potenciómetro y el botón guardados sin `modelo`: se quitaron (ficha PIEZA-003, antes de la `v0.4.0`). `avr8js` también es de Wokwi, pero es el emulador del ATmega328P que ejecuta el `.hex`: se queda (MIT; reemplazarlo sería escribir un emulador propio y repetir la validación de T1 a T3). COMO-FUNCIONA 75.

- **Circuitos guardados sin `modelo`** (decisión de Efraín): abren con el dibujo del kit, corridos para que el centro de sus patas quede donde estaba. Para eso el catálogo guarda `dibujoAnterior`, las medidas del dibujo de antes (tomadas con la librería todavía puesta; no es código). Cableados, igual; en la protoboard o enchufados, si sus patas ya no caben, quedan sueltos con un aviso.
- **Se quitó:** las importaciones y la rama de wokwi del lienzo, la renovación al levantar, el aviso «Dibujo antiguo», la copia de estilos del shadow DOM al exportar, `antiguo`/`esAntiguo`/`definicionDe` del catálogo, las filas del dibujo antiguo en la ficha, la RK09K de KiCad y la dependencia. Con ello desaparece el defecto de la perilla de wokwi ya elegida.
- **Contrato 1, sección 4:** cómo abren esas piezas (el formato no cambia); descripciones del esquema. NOTICE, README y LEEME sin Wokwi Elements ni Lit; en TecnoBloques, el texto «Acerca de».

Pruebas (con cargador): suite completa 1386 OK y ninguna falla (salen las pruebas del dibujo de wokwi y entran las de la regla nueva); `probar_piezas.py` 50. Paquete 557 → 525 KB, sin la palabra «wokwi»; Worker 91 KB. TecnoBloques con este paquete: `test:simulador` 58, `test:registro-app` 134, `npm test` y `test:app` sin errores. Sin commit: falta la verificación de Codex.

## 2026-10-28 — DIST-001: TecnoBloques 0.4.1 recorrido sin red en un PC del aula

Efraín instaló el candidato 0.4.1 (con TecnoCircuito 0.3.1) en el HP ProBook 450 G7 del aula, sin red, y lo recorrió con la guía del 27 oct. Funcionó todo: instalación silenciosa sin preguntas ni ventana del driver (ya estaba), compilar y subir al Nano sin internet, monitor serial y CSV, simulación con Mediciones, la marca en las placas (no en el Nano) y en el SVG, y el registro exportado completo, cuya historia sale sin avisos. Registro en `validacion/2026-10-28-dist001-0.4.1-sin-red.md`, evidencias en `validacion/Portatil_1/`.

Dos hallazgos. **H1, conexión escondida al cambiar de placa:** una resistencia enchufada a la vez en la pata del LED y en un pin de la placa no se corre al pin de la placa nueva. Queda en el aire, conectada por dentro y sin aviso: el aprendiz ve un circuito y simula otro. Reproducido con `v0.3.1` y con `main`; en `main`, por la geometría nueva de PIEZA-001, pasa también al abrir en la misma placa un circuito guardado antes. **H2:** la única línea roja de la consola son las fuentes de Google de TecnoBloques; sin red, la letra cae a Segoe UI. Los dos esperan la decisión de Efraín; el candidato pasa a la verificación de Codex (paso 6).

## 2026-10-28 — LAB-001: primeras medidas con el cuaderno

Efraín midió con el cuaderno LAB-001 (página web que exporta un JSON; `validacion/lab001-2026-10-28.json`). Análisis en `validacion/2026-10-28-lab001.md`; el modelo no se cambió. El monitor serial con la placa real (CSV y gráfico) quedó validado. La caída del L293D sube unos 2 V/A, no 1 como usa el modelo: la recta 1,28 V + 2,08 V/A acierta el bloqueo con un 2 % de error. El bobinado mide 4 Ω (el modelo usa 5) y se confirmó la LiPo de 1,2 Ω. Hay una contradicción en los servos del Uno: la tabla dice «sin reinicio» con 10 servos, pero el CSV muestra «Inicio» cada 1,64 s. Hasta contar los reinicios no se toca el golpe de arranque. En el sentido de giro, M4 no cuadra con M1 y falta una foto de la numeración de los tornillos. Pendientes en la lista del registro.

## 2026-10-28 — PIEZA-003: preauditoría y corrección en un lote

Antes de entregar PIEZA-003 a Codex, un auditor aparte revisó el commit `106627a` (sin código, solo pruebas y casos propios). Encontró seis cosas; Efraín pidió corregir A1 a A5 y dejar A6 documentado.

- **A1 (alta):** al abrir un potenciómetro o botón guardado sin `modelo`, el lienzo lo corría con todo lo enchufado en él; un LED enchufado en sus patas quedaba a 23–27 px, conectado por dentro y sin aviso. Lo introducía PIEZA-003. Ahora la pieza renovada se corre sola y lo que ya no cabe en sus patas nuevas queda suelto con aviso («Se soltó el LED led1 del potenciómetro pot1: vuelve a ponerlo.»).
- **A2 (media; decisión de Efraín: medio paso):** la pieza suelta podía caer con las patas justo sobre otros huecos o pines y parecer encajada; al reabrir ya no había aviso. Ahora toda pieza que queda suelta al abrir se aparta medio paso (`apartar`), en la primera dirección en que ninguna pata queda sobre un hueco ni un pin.
- **A3:** un `modelo` nulo o vacío en el archivo hacía que la pieza se corriera en cada apertura; ahora se completa el del kit.
- **A4 y A5:** COMO-FUNCIONA 75 («siempre quedan sueltos»), las secciones 1, 5, 10 y 34 marcadas como históricas, la receta de componente nuevo y el comentario del ejemplo antiguo de `pagina.html` (ya no queda «wokwi» en `dist/prototipo.html`).
- **Pendiente, A6:** el «Acerca de» de TecnoBloques ya no nombra Wokwi Elements ni Lit, pero TecnoBloques sigue en `#v0.3.1`; ese texto (y `avr8js` en su NOTICE) entra con el paso de TecnoBloques a la `v0.4.0`.

Pruebas: `probar_piezas.py` con seis regresiones nuevas, que fallan con `106627a`; suite completa con cargador en una copia limpia (sin el trabajo de LAB-001 que estaba sin commit); TecnoBloques `test:simulador` 58 y `test:registro-app` 134. Paquete 527 KB. Se entrega a Codex para una verificación profunda única (CLA-20261028-007).

## 2026-10-28 — LAB-001: primeras medidas con el cuaderno

Efraín midió con el cuaderno LAB-001 (página web que exporta un JSON; `validacion/lab001-2026-10-28.json`). Análisis en `validacion/2026-10-28-lab001.md`; el modelo no se cambió. El monitor serial con la placa real (CSV y gráfico) quedó validado. La caída del L293D sube unos 2 V/A, no 1 como usa el modelo: la recta 1,28 V + 2,08 V/A acierta el bloqueo con un 2 % de error. El bobinado mide 4 Ω (el modelo usa 5) y se confirmó la LiPo de 1,2 Ω. Hay una contradicción en los servos del Uno: la tabla dice «sin reinicio» con 10 servos, pero el CSV muestra «Inicio» cada 1,64 s. Hasta contar los reinicios no se toca el golpe de arranque. En el sentido de giro, M4 no cuadra con M1 y falta una foto de la numeración de los tornillos. Pendientes en la lista del registro.

## 2026-10-28 — LAB-001: revisión con Efraín y ajuste del L293D y del motor TT

Efraín aclaró las dudas del registro. Los diez «Inicio» del CSV de servos eran subidas del programa: **el Uno no se reinicia ni con 10 servos** (6 SG90 + 4 MG90S), lo que confirma que el golpe de arranque del modelo está exagerado (ajuste pendiente, a decidir). T3-1 queda cerrada: lo de M4 fue un error de anotación. Los datos de T3-3 son los medidos. La corriente de T1-B se quita por no ser fiable, y el ruido del ADC se repite. **Modelo ajustado con su sí:** caída del L293D 1,3 V + 2 V/A (antes 1 V/A) y bobinado del motor TT de 4 Ω (`mABloqueado` 1500). Con eso, el frenado fuerte y el bloqueo quedan a −1,4 % y +0,3 %. Con 2 V/A apareció una oscilación de un milisegundo al otro con el motor a 255 (la batería quedaba sin carga); ahora la caída sigue la corriente suavizada (`CAIDA_SUAVE`), y `probar_potencia.js` revisa que no oscile.

## 2026-10-28 — PIEZA-003: preauditoría y corrección en un lote

Antes de entregar PIEZA-003 a Codex, un auditor aparte revisó el commit `106627a` (sin código, solo pruebas y casos propios). Encontró seis cosas; Efraín pidió corregir A1 a A5 y dejar A6 documentado.

- **A1 (alta):** al abrir un potenciómetro o botón guardado sin `modelo`, el lienzo lo corría con todo lo enchufado en él; un LED enchufado en sus patas quedaba a 23–27 px, conectado por dentro y sin aviso. Lo introducía PIEZA-003. Ahora la pieza renovada se corre sola y lo que ya no cabe en sus patas nuevas queda suelto con aviso («Se soltó el LED led1 del potenciómetro pot1: vuelve a ponerlo.»).
- **A2 (media; decisión de Efraín: medio paso):** la pieza suelta podía caer con las patas justo sobre otros huecos o pines y parecer encajada; al reabrir ya no había aviso. Ahora toda pieza que queda suelta al abrir se aparta medio paso (`apartar`), en la primera dirección en que ninguna pata queda sobre un hueco ni un pin.
- **A3:** un `modelo` nulo o vacío en el archivo hacía que la pieza se corriera en cada apertura; ahora se completa el del kit.
- **A4 y A5:** COMO-FUNCIONA 75 («siempre quedan sueltos»), las secciones 1, 5, 10 y 34 marcadas como históricas, la receta de componente nuevo y el comentario del ejemplo antiguo de `pagina.html` (ya no queda «wokwi» en `dist/prototipo.html`).
- **Pendiente, A6:** el «Acerca de» de TecnoBloques ya no nombra Wokwi Elements ni Lit, pero TecnoBloques sigue en `#v0.3.1`; ese texto (y `avr8js` en su NOTICE) entra con el paso de TecnoBloques a la `v0.4.0`.

Pruebas: `probar_piezas.py` con seis regresiones nuevas, que fallan con `106627a`; suite completa con cargador en una copia limpia (sin el trabajo de LAB-001 que estaba sin commit); TecnoBloques `test:simulador` 58 y `test:registro-app` 134. Paquete 527 KB. Se entrega a Codex para una verificación profunda única (CLA-20261028-007).

## 2026-10-29 — PIEZA-003: devolución de Codex (F01–F03) corregida

Codex devolvió la entrega tras su verificación profunda (COD-20261029-001); los tres casos se reprodujeron con su diagnóstico (26/30) antes de tocar código.

- **F03 (alta):** al apartar una resistencia que se soltó de un potenciómetro antiguo, el LED enchufado en ella se corría con ella y conservaba el ánodo en c16 a 4,8 px: seguía encendiendo. Ahora `apartar` corre el grupo entero y suelta, con aviso, lo que el grupo tenía enchufado fuera («Se soltó el LED led1 de la protoboard: vuelve a ponerlo.»). Se descartó dejar el LED en c16 y soltarlo de la resistencia: su cátodo quedaba sobre c15 sin conducir.
- **F02 (media; decisión de Efraín: al centro, como mucho medio paso):** con la pieza desfasada de la rejilla, ninguno de los ocho medios pasos libraba las patas (3,4 px) y se aplicaba el de respaldo sin comprobar. Ahora se corre como mucho medio paso por eje a donde sus patas quedan más lejos de todo hueco (6,8 px, entre cuatro huecos); si ni así, al sitio libre más cercano por anillos.
- **F01 (media):** un tipo desconocido soltado de una renovada rompía el aviso. Ahora es «la pieza fut1». De paso, el aviso usa el artículo de cada pieza («la resistencia r1») y nombra todo aquello de lo que se soltó.

Preauditoría con un auditor aparte, en dos pasadas: sin hallazgos altos ni medios; sus observaciones P1–P4 se corrigieron y Q1–Q2 quedaron documentadas. Pruebas: diagnóstico de Codex 30/30; `probar_piezas.py` con siete comprobaciones nuevas (seis fallan con `0a084e3`); suite completa 1401/0, en batería; TecnoBloques `test:simulador` y `test:registro-app` con este paquete.

## 2026-10-29 — LIENZO-001: ninguna conexión escondida al abrir o cambiar de placa

H1 de DIST-001, reproducido antes de tocar código con `repro_d12.py` sobre `63de777`: r1, enchufada en el ánodo de led1 y en D12, quedaba a 22 y 31 px con el Uno (circuito guardado con 0.3.1) y a 299 px del D12 con el Nano, conectada por dentro y sin aviso. Causa: `alinearEnchufesAlAbrir` corría cada pieza sola y solo si todas sus patas pedían el mismo corrimiento.

Decisión de Efraín (28 oct): las piezas unidas por enchufes se corren juntas hasta el pin que se movió, y lo que no cabe se suelta con aviso. Ahora se arman grupos de piezas unidas entre sí; cada pieza se corre sobre la pieza en que está enchufada y después el grupo entero hasta la placa o la protoboard, con el corrimiento que deja más patas sobre su destino. Una revisión final suelta, con aviso, toda pata que no quedó a 3,5 px o menos de su destino, y aparta la pieza si quedó suelta o con una pata sobre otro pin. El aviso nombra los pines de la placa («Se soltó el LED led1 de los pines A0 y D12 de la placa: vuelve a ponerlo.»), también en los de PIEZA-003. COMO-FUNCIONA 76.

Pruebas: `probar_piezas.py` con nueve comprobaciones nuevas (H1 con el Uno y con el Nano, Uno → Nano, cadena de tres en las dos placas, LED imposible en las dos placas y reabrir); siete fallan con `63de777`. Con la corrección, `repro_d12.py` da 0 px en las dos placas. `probar_vistas.py` exigía lo contrario para un LED que no cabe (VIN y A0_S): que siguiera enchufado a la distancia y sin aviso. Se cambió a la regla nueva.

## 2026-10-29 — LIENZO-001: devolución de Codex (F01) corregida

Codex devolvió la entrega (COD-20261029-004) por F01: en un grupo mixto (LED con el cátodo en c15; r1 en su ánodo y en D12), al soltar c15 el LED quedaba sin `en` propio y se tomaba como suelto, aunque r1 lo seguía recibiendo y estaba anclada en D12. Al apartarlo, se perdía también D12. Reproducido con su entrada: cuatro comprobaciones nuevas fallan con la entrega anterior y su diagnóstico da 4/8.

Ahora lo que perdió una conexión se aparta con todo su grupo (unido en los dos sentidos) solo si el grupo ya no tiene anclas, o si una pata quedó sobre un hueco o un pin que no es su destino. `sobreOtroDestino` ya no cuenta como ajenos los pines de las piezas del mismo grupo. Pruebas: `probar_piezas.py` con F01 en los dos órdenes, en edición y en solo lectura, más el control y la reapertura. El ayudante `ajenas_sin_enchufe` de la prueba ahora acepta el enchufe en los dos sentidos. El diagnóstico de Codex da 8/8.
