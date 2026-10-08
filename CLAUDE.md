# CLAUDE.md — TecnoCircuito

> Memoria técnica del proyecto para Claude Code.
> Actualizado: 7 de octubre de 2026 · Estado: **prototipo validado y repositorio publicado** (https://github.com/EMariotte/TecnoCircuito). En `prototipo/` están los prototipos 0 a 4: cableado, chip con avr8js, circuito eléctrico (MNA), Web Worker y PWM, **las tareas T1 y T2 completas** y **la protoboard**. El 2 quedó validado con el multímetro (`validacion/`), y Efraín dio por validado el prototipo completo. **TecnoBloques ya lo usa en desarrollo** (`npm run app:simulador`). `npm run probar` pasa 10 grupos de pruebas y `test:simulador` de TecnoBloques 24 de 24. Falta la primera etiqueta con `dist/tecnocircuito.js`, para que el simulador llegue al instalador.

---

## Qué es este proyecto

**Simulador de circuitos con microcontrolador** para TecnoBloques, el editor de bloques en español para Arduino de la **TecnoAcademia Tolima (SENA, Ibagué)**. El aprendiz arma el circuito en una protoboard dibujada, TecnoBloques compila su programa y TecnoCircuito lo ejecuta sobre ese circuito.

- **Simulación híbrida:**
  - **eléctrica real** para LED, resistencias, botones, potenciómetros, divisores y motores;
  - **lógica, por protocolo,** para los módulos: servo, DHT, LCD, ultrasonido, MPU6050, PCA9685, MAX7219, HC-05.
- **Muestra las fallas reales:** LED quemado, corriente de más en un pin, caída de voltaje del driver L293D, reinicio de la placa por consumo. **Cada no idealidad se puede apagar por configuración** (modo «ideal»).
- **Es el instrumento de un proyecto de investigación SENNOVA** que se ejecuta en 2027. Los documentos de investigación están en `investigacion/`, que es **local y no entra a git** (ver «Investigación»).
- Lo construye Efraín (instructor) junto con Claude. Los **usuarios finales son aprendices**, muchos menores de edad: los textos de la interfaz van en español, cortos y sin jerga.
- **Proyecto hermano:** TecnoBloques, en `..\TecnoBloques` (https://github.com/EMariotte/TecnoBloques). TecnoCircuito es un paquete que TecnoBloques embebe. **El contrato entre los dos está en [`CONTRATO.md`](CONTRATO.md)** y es la fuente única.

> Este archivo es una **fotografía del estado actual** y se sobrescribe cuando algo cambia. El **historial cronológico** está en [`BITACORA.md`](BITACORA.md) (append-only).

---

## Cómo trabajar con Efraín

- **Tutéalo** (tú, nunca «usted») y responde en español, con un tono cálido y directo.
- **Commit y push solo con su sí explícito.** Al final de cada entrega pregunta «¿hago el commit y el push?».
- **Nada llega al aula sin prueba con hardware.** Lo que se publique pasa antes por la validación con la placa real (sección «Validación»).
- Le gustan las **propuestas con criterio de experto**, con una recomendación clara y su porqué.
- **Verifica antes de decir que algo funciona,** y di con honestidad lo que no se pudo probar.
- Usuario de GitHub: `EMariotte`. Trabaja en Windows 11 con VS Code.

---

## Decisiones tomadas (no reabrir sin un motivo nuevo)

| Decisión | Detalle |
|---|---|
| Solucionador eléctrico **propio** | Análisis nodal modificado (MNA) en JavaScript, con Newton-Raphson para LED y diodos. Así la licencia queda en Apache 2.0. |
| **No usar Falstad CircuitJS1** | Es GPL-2.0-or-later. Integrarlo obligaría a pasar a GPL. |
| **avr8js** (MIT) | Ejecuta el `.hex` del ATmega328P (Uno y Nano). El ATmega2560 (Mega) es posible pero está menos probado. |
| **@wokwi/elements** (MIT, v1.9.2) | Dibujos con la posición de los pines: Uno, Nano, Mega, LED, botón, potenciómetro, servo, LCD, DHT22, HC-SR04, MPU6050, zumbador y otros. |
| Componente = **vista + modelo eléctrico + modelo lógico** | Agregar un componente es llenar esas tres partes. Para uno que no trae ningún simulador (como la protoboard), seguir `prototipo/RECETA-COMPONENTE-NUEVO.md`. |
| **Motor separado de la interfaz** | El motor se prueba con Node, sin navegador y sin abrir TecnoBloques. |
| **Simula solo en la app de escritorio** | Necesita el `.hex` de arduino-cli. En la versión web de TecnoBloques solo habrá cableado y documentación. |
| **Prototipos antes del repositorio** | Decidido por Efraín el 7 oct 2026. Primero se validó la viabilidad con prototipos en `prototipo/`; el mismo día, con el prototipo 4 hecho, se creó y publicó el repositorio con esa historia en sus commits. |
| **Repositorio propio** | Decidido por Efraín el 7 oct 2026. TecnoBloques depende de una **etiqueta fija**, así que se pueden publicar arreglos de TecnoBloques sin cambiar el simulador. |
| **Las tareas mandan** | En 2026 solo se construye lo que piden las tres tareas de la sección «Alcance de 2026». |
| **Versión congelada** | Mientras el simulador se use en el estudio de 2027, su versión no cambia. Lo nuevo sale en otra versión. |
| **Registro de eventos desde la etapa 0** | Cableados, fallas detectadas y correcciones. El paquete solo emite los eventos; TecnoBloques los guarda. |

---

## Alcance de 2026 (octubre a diciembre)

### Las tres tareas que definen qué se construye

| Tarea | Montaje | No idealidades que se encienden o apagan |
|---|---|---|
| T1. LED y botón | LED con resistencia; botón con pull-up o pull-down | LED quemado sin resistencia; corriente máxima del pin; entrada flotante que lee al azar |
| T2. Potenciómetro y brillo | Potenciómetro en A0; LED con PWM | Ruido de la lectura analógica; entrada analógica flotante si falta GND o 5 V |
| T3. Motor y servo | Motor DC con la shield L293D; un servo | Caída de 1,4 a 2 V del L293D; límite de 500 mA del USB; reinicio de la placa por caída de voltaje |

Son un borrador: Efraín puede ajustarlas.

### Plan semana a semana

| Semanas | Fechas | Qué | Resultado |
|---|---|---|---|
| 1 | 13 al 16 oct | Efraín prueba el Uno R3 y el Nano en TecnoBloques. Se pide el analizador lógico USB de 8 canales. Se crea este repositorio. | Base estable |
| 1 a 3 | 13 al 30 oct | **Etapa 0. Bases:** formato del circuito, lienzo con protoboard, reloj común entre avr8js y el circuito, eventos, interruptor «realista / ideal». En TecnoBloques: los pendientes de su sección «Proyecto hermano». | Se cablea y se documenta; los eventos ya salen |
| 4 a 7 | 3 al 27 nov | **Etapa 1. Chip y circuito DC:** MNA con Newton-Raphson, pines como fuentes, LED, resistencia, botón, potenciómetro, zumbador, monitor serial, detección de daño. Validación con multímetro en la semana 7. | **T1 y T2 funcionan** |
| 8 y 9 | 30 nov al 11 dic | **Etapa 3 reducida. Potencia:** shield L293D (74HC595 y PWM, con su caída), motor DC, servo (pulso y consumo), presupuesto de corriente del USB, reinicio por caída de voltaje. | **T3 funciona** |
| 10 | 14 al 18 dic | **Validación final:** analizador lógico, multímetro, trazas guardadas como pruebas de regresión, informe técnico. | Versión candidata «estudio 1.0» |

- **Es apretado.** Las estimaciones suman entre 10 y 14 semanas. El colchón son las semanas de enero de 2027.
- **Cada etapa se valida al cerrarla,** no todo al final.

### Lo que pasa a 2027

- **Etapa 2 (módulos):** HC-SR04, LCD (HD44780 por PCF8574), DHT11, MPU6050, PCA9685, MAX7219 y HC-05 con un «celular virtual».
- **Etapa 4 (robots):** Otto animado y carro en una pista vista desde arriba.
- Explicaciones con LLM que el simulador verifica antes de mostrarlas.

### Estimación por etapa (referencia)

| Etapa | Desarrollo | Validación |
|---|---|---|
| 0. Bases | 2–3 sem | 1 sem |
| 1. Chip y circuito DC | 4–5 sem | 1–2 sem |
| 2. Módulos | 6–8 sem | 2–3 sem |
| 3. Potencia y motores (completa) | 4–5 sem | 2 sem |
| 4. Robots | 4–6 sem | 1–2 sem |

---

## Arquitectura prevista

```
TecnoCircuito/
├── CLAUDE.md · BITACORA.md · CONTRATO.md · README.md · LICENSE · NOTICE
├── package.json          ← versión semver; scripts de construir y probar
├── contrato/             ← esquemas JSON del circuito y de los eventos (contrato 1)
├── src/
│   ├── index.js          ← API pública: crearLienzo, crearSimulador, VERSION, CONTRATO, PLACAS
│   ├── simulador.js      ← lado de la página: órdenes al Worker, fotos y dibujo (prototipo 3)
│   ├── trabajador.js     ← el Web Worker: reloj y núcleo en otro hilo (entra al paquete como texto)
│   ├── nucleo.js         ← chip + circuito + promedio del PWM + entradas (digitalRead, ruido, al aire), sin página
│   ├── protoboard.js     ← media protoboard: huecos, tiras, dibujo y encaje de las patas (prototipo 4)
│   ├── motor/            ← MNA, Newton-Raphson, reloj común con el chip
│   ├── chip/             ← avr8js: puertos, ADC, temporizadores, USART; placas uno/nano/nano_old/mega
│   ├── componentes/      ← un archivo por componente: vista + modelo eléctrico + modelo lógico
│   └── lienzo/           ← protoboard, cables y dibujos de @wokwi/elements
├── construir.js          ← arma dist/tecnocircuito.js (IIFE, todo embebido)
├── dist/tecnocircuito.js ← SE COMMITEA en cada etiqueta (TecnoBloques lo instala sin compilar)
├── pruebas/              ← pruebas con Node, sin navegador
│   └── fixtures/         ← .tbq.json y .hex generados por TecnoBloques (se commitean)
├── validacion/           ← trazas del analizador lógico y medidas de multímetro de la placa real
└── investigacion/        ← LOCAL, ignorada por git (documentos del proyecto SENNOVA)
```

- **Un solo archivo de salida.** TecnoBloques concatena scripts sin módulos ni bundler y arma un HTML autocontenido que funciona sin internet. Por eso el paquete se entrega como un IIFE que define `window.TecnoCircuito`, con avr8js y los dibujos dentro. Para construirlo se sugiere esbuild.
- **Nada de Node en el paquete.** La app de TecnoBloques corre con `contextIsolation` y sin Node en la página. Todo lo que toca el disco o arduino-cli lo hace TecnoBloques por IPC.
- **Reloj común:** el chip avanza por ciclos y el circuito se resuelve en los instantes en que cambia un pin, más un paso fijo para lo analógico. El PWM se promedia para no resolver el circuito miles de veces por segundo.
- **Rendimiento:** ✅ hecho en el prototipo 3. El chip y el motor corren en un Web Worker creado desde un Blob, sin el tope de 72 % de la página y sin competir con Blockly. Si el navegador no deja crear el Worker, el mismo código corre en la página. Explicado en `prototipo/COMO-FUNCIONA.md`, secciones 25 a 30.

---

## Lo que hay que saber de TecnoBloques

Léelo en `..\TecnoBloques\CLAUDE.md`, sobre todo las secciones «Proyecto hermano», «App de escritorio» y «Decisiones técnicas fijas». Lo esencial:

- **Placas:** claves `uno`, `nano`, `nano_old` y `mega` (objeto `PLACAS` en `src/nucleo.js`). El simulador usa las mismas.
- **Proyecto `.tbq.json` (formato 1, TecnoBloques 0.2.5):** `{app:'TecnoBloques', version:1, nombre, placa, nivel, bloques, embebidos, texto, circuito, creadoCon, guardado}`. El `.hex` no se guarda: se compila al simular. TecnoBloques conserva los campos que no conoce. Ver `CONTRATO.md`, sección 4.1.
- **Compilación:** `escritorio/arduino.js` compila con `--build-path`. El `.hex` queda en `<build>/TecnoBloques.ino.hex`.
- **Puente de la app:** `window.tbEscritorio` (en `escritorio/preload.js`). Se le agregarán `compilarHex` y `registrar`.
- **Mapa de pines del kit** (Uno R3 y shield L293D), que la etapa 3 debe respetar:

  | Qué | Pines |
  |---|---|
  | 74HC595 de la shield L293D | 4, 7, 8, 12 |
  | PWM de los motores | M1 = 11, M2 = 3, M3 = 6, M4 = 5 |
  | Servos de la shield | SERVO_1 = 10, SERVO_2 = 9 |
  | Monitor serial | 0 y 1 |
  | I2C | A4 y A5 en Uno y Nano; 20 y 21 en Mega |

- **Trampa de Servo y PWM:** la librería Servo inutiliza `analogWrite` en los pines 9 y 10 del Uno y Nano, y en 11 y 12 del Mega. El simulador debe reproducirlo, porque usa los temporizadores reales.
- **Librería de motores:** AFMotor_R4, que maneja la shield por el 74HC595.

---

## Validación contra el circuito real

- **El mismo programa en la placa real y en el simulador,** sobre circuitos de referencia por componente.
- **Multímetro:** LED con 220, 330 y 1 kΩ, divisor de tensión y potenciómetro. Criterio: ±5 % en voltaje y ±10 % en corriente.
- **Monitor serial:** el comportamiento lógico debe ser idéntico.
- **Analizador lógico USB de 8 canales** (unos 10 a 15 USD, con PulseView): PWM, pulsos del servo y más adelante la trama del DHT y el I2C. Criterio de tiempos: ±1 %.
- **Las trazas reales se guardan en `validacion/` y se vuelven pruebas de regresión.**

## Riesgos técnicos

- Convergencia de Newton-Raphson con LED. **Cerrado en corriente continua por el prototipo 2:** converge en 60 casos (5 colores, de 0 Ω a 1 MΩ) en 21 vueltas como máximo, y cada solución tarda unos 7 µs. Sigue abierto para PWM y motores.
- Rendimiento en tiempo real con PWM. **Atendido en el prototipo 3:** el PWM se promedia por combinación de pines (el circuito se resuelve una vez por combinación) y el chip corre en un Web Worker, que fue un 25 % más rápido que la versión en la página en el mismo PC. Falta medirlo en un PC del aula, con cargador.
- La interfaz de la protoboard, que debe ser fácil para aprendices. **Prototipo 4 hecho:** encaje automático, tira iluminada y vista previa en verde. Falta probarla con dos o tres aprendices.
- Más adelante: los tiempos estrictos del DHT11 y el juego completo de comandos del HD44780.

---

## Próxima sesión: retomar desde aquí

**Lo primero (pedido por Efraín el 7 oct):** explicarle cómo funciona **exportar la netlist de KiCad** (formato `.net`, qué lleva cada pieza y cada red, cómo se asignan las huellas) y si **es suficiente para empezar una placa en KiCad**: qué se puede hacer en Pcbnew solo con la netlist y qué falta sin el esquemático. Ver «Ideas para más adelante».

El 7 oct quedaron los prototipos 0 a 4 funcionando, con T1 y T2 completas. **Para avanzar hacen falta estas mediciones y pruebas de Efraín:**

1. ✅ **Multímetro (7 oct):** pin 13 → resistencia → LED rojo → GND con 215, 326 y 1000 Ω. Las 12 comparaciones cumplen el criterio (la peor, −4,8 % en la resistencia de 220 Ω, por una caída en los contactos de la protoboard). **El modelo queda validado sin ajustes.** Registro en `validacion/2026-10-07-led-rojo-multimetro.md`; `npm run probar:motor` lo usa como prueba de regresión.
2. ✅ **Velocidad del prototipo 2 en un PC del aula (7 oct):** 76 a 100 % estable. Al cambiar el LED baja un instante a 54–66 % y vuelve; Efraín no nota el cambio. **El freno es la emulación del chip** (avr8js), no el circuito ni el dibujo. Ver la bitácora del 7 oct.
3. **Velocidad del prototipo 3 en ese mismo PC,** con el cargador conectado: abrir `prototipo/dist/prototipo.html`, iniciar el parpadeo y el «Ejemplo con potenciómetro (T2)», y anotar la velocidad. La línea de estado dice si corre «en un hilo aparte». Meta: ≥ 90 % estable.
4. ✅ **`npm run probar` con cargador (7 oct):** pasan todas, incluidas las de tiempo. Ojo: con batería, Windows baja la velocidad del procesador y fallan las 3 pruebas de tiempo del prototipo 1.
5. ✅ **PWM y lectura analógica validados por Efraín** (7 oct).
6. ✅ **Primera conexión con TecnoBloques** (7 oct): ver `prototipo/COMO-FUNCIONA.md`, secciones 31 y 32. `sim.destruir()`, `sim.medidas()` y `lienzo.exportarSVG()` ya están en el contrato.
7. **Validar T1 y T2 con la placa real** (regla 2), con dos programas nuevos. Las instrucciones están en `prototipo/LEEME.md`, «Validar T1 y T2 con la placa real».
   - `validar_adc`: ruido de `analogRead()` con la perilla quieta.
   - `validar_flotante`: cuántas veces cambia el pin 2 al aire.
   Con eso se ajustan `RUIDO_ADC_V` (hoy 0,6 pasos) y `CAMBIO_AL_AIRE_POR_MS` (hoy 1/120) en `src/nucleo.js`, y las medidas van a `validacion/`.
8. **Probar la protoboard con dos o tres aprendices:** armar la T1 en ella («Ejemplo en protoboard (T1)» como referencia) y anotar dónde se traban.

**Con esas medidas:**

- ✅ Medidas guardadas en `validacion/`; no hizo falta ajustar los modelos.
- ✅ Prototipo 3 hecho (7 oct): Web Worker, promedio del PWM y potenciómetro (T2). Falta su medida en el PC del aula (punto 3).
- ✅ Ajustes de Efraín (7 oct): colores de cable en el orden del código (teclas 0 a 9), imagen SVG del circuito y, en TecnoBloques, panel que se agranda y vista «Circuito».
- ✅ T1 y T2 completas (7 oct) y prototipo 4, la protoboard (7 oct). Ver `prototipo/COMO-FUNCIONA.md`, secciones 33 a 42.
- Después, Efraín decide si da por validada la viabilidad y se crea el repositorio (pasos 2 a 6 de abajo).

**Repositorio (creado el 7 oct):**

- ✅ `prototipo/` entró, con su `dist/` (para abrirlo sin construir). Se ignoran `prototipo/pruebas/capturas/`, `*.cjs`, `*.log`, `node_modules/` y `respaldos/`.
- La historia quedó en tres commits: prototipos 0 a 3 con la primera conexión (desde el respaldo previo), después los ajustes con T1, T2 y la protoboard, y al final los archivos del repositorio.
- ⬜ Primera etiqueta (`v0.1.0`) con `dist/tecnocircuito.js` en la raíz, para que TecnoBloques dependa de ella (contrato, sección 9).
- ✅ (TecnoBloques 0.2.5) TecnoBloques ya deja `<caso>.tbq.json` y `<caso>.hex` en `test/salida/<caso>/` (`npm test` y `npm run compilar`). Falta el script `npm run fixtures` de este lado.

## Primera sesión (checklist)

0. **Prototipos de viabilidad** (antes del repositorio):
   - ✅ Prototipo 0, cableado sin simulación (7 oct): `prototipo/`. Se abre con `dist/prototipo.html`, se arma con `npm run construir` y se prueba con `npm run probar` (Playwright). Sus hallazgos para el contrato están en la bitácora.
   - ✅ Prototipo 1, chip con avr8js (7 oct): parpadeo en D13 y en D8 con `.hex` reales (`npm run compilar`), regla de conexiones, reloj común y monitor serial. `npm run medir` mide la velocidad del chip con Node. Explicado en `prototipo/COMO-FUNCIONA.md`.
   - ✅ Velocidad del prototipo 2 en un PC del aula (7 oct): 76–100 % estable, con caídas de un instante al cambiar el LED. El freno es avr8js.
   - ✅ Prototipo 2, circuito eléctrico (7 oct): MNA con Newton-Raphson en `prototipo/src/motor/` (sin DOM, probado con Node), LED con brillo según corriente, fallas (LED quemado, pin, resistencia, cortocircuito) y modo ideal. 86 comprobaciones en total (`npm run probar`).
   - ✅ Prototipo 2 validado con el multímetro (7 oct): 12 de 12 dentro del criterio, sin ajustar el modelo. Ver `validacion/`.
   - ✅ Prototipo 3 (7 oct): chip y circuito en un Web Worker (`src/trabajador.js` y `src/nucleo.js`), PWM promediado por combinación de pines con ventanas cortadas en períodos completos, potenciómetro con `analogRead()` y modo en la página si no hay Worker. Pruebas: `npm run probar:nucleo` (Node) y `pruebas/probar_pwm.py`. Explicado en `prototipo/COMO-FUNCIONA.md`, secciones 25 a 30.
   - ✅ `npm run probar` con cargador: todo bien. ✅ PWM y lectura analógica validados por Efraín.
   - ✅ Primera conexión con TecnoBloques (7 oct): el eco y un programa de bloques con potenciómetro se simulan dentro de la app. Arreglado el serial en UTF-8.
   - ⬜ Anotar la velocidad del prototipo 3 en el PC del aula **con TecnoBloques abierto** (meta ≥ 90 %).
   - ✅ Contrato: `sim.destruir()`, `sim.medidas()` y `lienzo.exportarSVG()` en el paquete y en `CONTRATO.md` (7 oct).
   - ✅ T1 y T2 completas (7 oct): pieza `pulsador`, `digitalRead()` desde el circuito (umbrales del ATmega), `entradaFlotante` (digital y analógica) y `ruidoADC`. Programas `boton_pulldown`, `boton_pullup`, `validar_adc` y `validar_flotante`. Pruebas: `probar_nucleo.js` y `probar_t1t2.py`.
   - ✅ Prototipo 4, la protoboard (7 oct): `src/protoboard.js`, campo `en` en cada pieza (sección 4.0 del contrato), encaje con vista previa, tira iluminada y menú «+ Agregar». Prueba: `probar_protoboard.py`.
   - ⬜ Validar T1 y T2 con la placa real (`validar_adc` y `validar_flotante`) y probar la protoboard con aprendices.
1. ✅ La carpeta está en `Proyectos Tecno\TecnoCircuito`, al lado de TecnoBloques.
2. ✅ `git init`, `LICENSE` (Apache 2.0) y `NOTICE` (© SENA – TecnoAcademia Tolima, autor Efraín Guillermo Mariotte Parra, con avr8js, @wokwi/elements y Lit), igual que TecnoBloques (7 oct).
3. ✅ `README.md` y `package.json` (`tecnocircuito` 0.1.0, Apache-2.0) en la raíz (7 oct).
4. ✅ Repositorio público `EMariotte/TecnoCircuito` creado y publicado, con la autorización de Efraín (7 oct).
5. ✅ Periféricos de avr8js 0.21.1 (revisado el 7 oct): CPU con interrupciones, GPIO (puertos A a L, INT0/INT1 y PCINT), temporizadores 0, 1 y 2, ADC con los canales del ATmega328, USART, SPI, TWI (I2C), EEPROM, watchdog y reloj. **Para la Mega faltan los temporizadores 3, 4 y 5:** no hay configuración y habría que escribirla.
6. Empezar la etapa 0 por el formato del circuito y su esquema en `contrato/`, porque TecnoBloques depende de él.

---

## Ideas para más adelante (pedidas por Efraín el 7 oct)

- **Esquemático para KiCad,** para que quien quiera hacer una placa de circuito impreso no empiece de cero. Recomendación, en dos pasos:
  1. **Exportar la netlist de KiCad** (`.net`, el formato S-expression «export»). El simulador ya calcula los nodos (`calcularNodos`), así que es casi directo: cada pieza con su huella (`LED_THT:LED_D5.0mm`, `Resistor_THT:R_Axial_DIN0207…`, y el Uno como `Module:Arduino_UNO_R3`) y cada nodo como una red. En Pcbnew se importa y se empieza a ubicar sin dibujar nada.
  2. **Después, el esquemático (`.kicad_sch`)** con los símbolos acomodados solos. Es más trabajo, porque hay que ubicar los símbolos y referenciar las librerías de KiCad.
- **Diagrama de flujo del programa,** en TecnoBloques: se arma a partir de los bloques (inicio, acciones, decisiones «si» y repeticiones) y se dibuja como SVG. Sirve para la documentación del proyecto y como evidencia. Está anotado también en el CLAUDE.md de TecnoBloques.
- Las dos se pueden guardar en SVG, como el circuito (`lienzo.exportarSVG()`), y subir a TecnoRuta.

## Investigación (privada)

- `investigacion/TecnoCircuito-estado-del-arte.md` tiene el estado del arte, el diseño del estudio de 2027, la ética y el cronograma de investigación. **Léelo para entender por qué existen el modo ideal, el registro de eventos y la versión congelada.**
- **Nada de esa carpeta va a archivos versionados.** Tampoco van a git los registros de aprendices ni la tabla de alias: viven solo en el PC de Efraín.
- Este repositorio es público. En el código, los commits y esta bitácora solo va lo técnico.

---

## Reglas de desarrollo — siempre seguir

1. **Interfaz en español** para aprendices: frases cortas, verbos claros y mensajes de falla que dicen qué pasó y cómo arreglarlo.
2. **Todo componente nuevo se valida contra la placa real** antes de darlo por terminado, y su traza va a `validacion/`.
3. **No copiar código GPL.** Falstad CircuitJS1, SimulIDE, Fritzing y PICSimLab sirven solo como referencia de ideas. Antes de mirar el código de otro proyecto, revisa su licencia.
4. **El contrato manda.** Un cambio en `CONTRATO.md` se anota en las dos bitácoras y en la sección «Proyecto hermano» de TecnoBloques (ver el mecanismo en `CONTRATO.md`).
5. **Convención de commits:** `feat:` `fix:` `docs:` `refactor:` `test:` `chore:`.
6. **Registrar hitos en `BITACORA.md`.** Nunca editar ni borrar entradas pasadas. Actualizar este `CLAUDE.md` cuando cambie el estado.
7. **`dist/tecnocircuito.js` se commitea solo al etiquetar una versión,** construido desde el código de esa etiqueta.

---

## Referencias técnicas

- avr8js (MIT, v0.21.1): https://github.com/wokwi/avr8js
- @wokwi/elements (MIT, v1.9.2): https://github.com/wokwi/wokwi-elements
- TecnoBloques: https://github.com/EMariotte/TecnoBloques
- Referencias de diseño, sin copiar código: Fritzing con su simulador (https://blog.fritzing.org/2022/06/27/Simulating-Circuits-with-Fritzing), SimulIDE (https://github.com/Arcachofo/SimulIDE-dev), Falstad CircuitJS1 (https://github.com/sharpie7/circuitjs1), Edrys (https://github.com/edrys-org/edrys), ElectroBlocks (https://github.com/ElectroBlocks/ElectroBlocks).

---

*TecnoCircuito · SENA TecnoAcademia Tolima · Octubre 2026*
