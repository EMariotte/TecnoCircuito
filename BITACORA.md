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
