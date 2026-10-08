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
