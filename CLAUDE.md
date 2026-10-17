# CLAUDE.md — TecnoCircuito

> Foto del estado actual para Claude Code. Se sobrescribe cuando algo cambia; la historia está en [`BITACORA.md`](BITACORA.md) (append-only) y las explicaciones técnicas en [`prototipo/COMO-FUNCIONA.md`](prototipo/COMO-FUNCIONA.md) (secciones numeradas).
> Actualizado: 16 de octubre de 2026.

## Estado en una línea

Repositorio publicado (https://github.com/EMariotte/TecnoCircuito). **T1/T2 validadas con la placa real; T3 casi validada (15 oct):** shield L293D (continuidad y caída), LiPo (1,2 Ω), motor TT y probador medidos y el modelo ajustado; quedan el sentido de giro de la rueda derecha, el USB del Nano con servos y el MG90S. **Nano/Nano antiguo + expansión roja/azul implementados y verificados en software**, con alimentación y geometría de referencia pendientes de validación física. **Vistas de TecnoDiseñador integradas (14 oct):** el Uno es Pieza Tecno y el Nano, la expansión y la shield usan dibujos medidos, sin cambiar el comportamiento (COMO-FUNCIONA, secciones 62 a 64). **Validación humana de uso (14 oct): todos los ejemplos y el imán pasaron; aceptación de los aprendices 10/10** (`validacion/2026-10-14-vistas-uso.md`). Suite: **26 grupos, 1179 OK, cero fallas** (16 oct, con el registro de eventos en TecnoCircuito: esquema, emisor y `probar_registro.py`); TecnoBloques **53 OK** en integración y pruebas generales exit 0 sin errores. **Efraín confirmó en la app las lecturas independientes de A6/A7** (11 oct). **`v0.1.0` etiquetada el 16 oct** (pedido de Efraín, antes de dos días solo de software), con los pendientes de T3 del 16 oct conocidos.

## Qué es

**Corrección posterior de Efraín (11 oct):** I2C junto a UART; el bloque de seis contactos es alimentación duplicada GND/3V3/5V. Vista corregida con 82 contactos físicos, compatibilidad de los aliases SPI antiguos y header SPI de KiCad explícitamente añadido al diseño de referencia. Pruebas de las partes afectadas: Nano **105**, interfaz **81**, contrato **100**, KiCad Node **94** (35 Uno +59 Nano), KiCad real Nano **80**, motor **28** y núcleo/potencia Uno **107**. Efraín autorizó commit y push de esta corrección; sin nuevas mediciones físicas ni etiqueta.

**Revisión del Nano por Claude (12 oct, autorizada por Efraín):** cambiar de placa ya no deja al aprendiz sin lienzo (se quita lo que no va y se avisa; TecnoBloques conserva el original), VIN y el jack sin entrada ya no son un corto a GND escondido, y el modo realista del Nano corre a la par del Uno (la caché del circuito ya no se borra cada 2 ms con PWM). Además, por decisión de Efraín: el modelo de referencia ya no es una falla (`nano_referencia` eliminado) y quitar la fuente a mano no emite `reinicio_placa`. COMO-FUNCIONA, sección 60. Commit y push autorizados (12 oct).

**Vistas de TecnoDiseñador (14 oct, autorizado por Efraín):** `npm run vistas` pasa el revisor y trae Uno, Nano y expansión roja/azul a `src/piezas/vistas/` (versionados). Lo eléctrico no cambió: mediciones idénticas en 12 circuitos de referencia. La medición corrigió el contrato: el bloque de seis de la expansión son **tres 3V3 y tres GND** (`OUT_3V3_3`, `GND_OUT_3`); `OUT_5V`/`OUT_5V_2` quedan como aliases del 5V del Nano. KiCad: `GND2`/`RESET2` del Nano en los pads 4/3. Paquete 430 KB (Worker 89 KB). Revisión `/code-review` hecha y corregida. Commit `4a4377f`. Después, por pedido de Efraín: al abrir, una pieza enchufada en un pin que se movió se corre a él; **LED de las placas** con RX al recibir, L con brillo promedio, halo y la shield con `data-led`/`data-parte` (COMO-FUNCIONA, sección 63). **Shield L293D medida integrada** (sección 64): 36 contactos con los headers +5/Gnd/A0-5 (`A0_S`…`A5_G`), servos SERVO_1 arriba con pines − + S, SCL/SDA/IOREF tapados con la shield montada y KiCad con J10–J12. Falta la revisión de Codex de la familia Nano.

**Trabajo conjunto con Codex:** R1–R8 verificados y cerrados, con el [cierre posterior de R6](docs/CIERRE-R6-CODEX-2026-10-11.md): 11/12 comparaciones estrictas y 12/12 con el margen instrumental acordado. Se conservan informes históricos y pendientes físicos. Después Efraín asignó a **Codex desarrollo, pruebas y revisión de Nano + expansión roja/azul**; reglas en [AGENTS.md](AGENTS.md). El software admite Nano/Nano antiguo, A6/A7, conjunto SVG, Worker, alimentación de referencia y exportación selectiva a KiCad. [Arquitectura, supuestos y protocolo físico](docs/IMPLEMENTACION-NANO-2026-10-11.md); evidencia final en BITACORA.md. **Ambas tarjetas pendientes de validación física y sin publicar.**

**Simulador de circuitos con microcontrolador** para TecnoBloques, el editor de bloques en español para Arduino de la **TecnoAcademia Tolima (SENA, Ibagué)**. El aprendiz arma el circuito en una protoboard dibujada, TecnoBloques compila su programa y TecnoCircuito lo ejecuta sobre ese circuito.

- **Simulación híbrida:** eléctrica real (MNA) para LED, resistencias, botones, potenciómetros y motores; lógica por protocolo para los módulos.
- **Muestra las fallas reales** (LED quemado, corriente de un pin, caída del L293D, reinicio por consumo). **Cada no idealidad se apaga** por configuración (modo «ideal»).
- **Instrumento de un proyecto de investigación SENNOVA** (estudio en 2027). Ver «Investigación».
- Usuarios: **aprendices, muchos menores de edad**. Textos en español, cortos y sin jerga.
- **Proyecto hermano:** TecnoBloques (`..\TecnoBloques`, https://github.com/EMariotte/TecnoBloques). **El contrato entre los dos está en [`CONTRATO.md`](CONTRATO.md)** (contrato 1) y es la fuente única.
- **Apoyo de dibujo:** TecnoDiseñador (`..\TecnoDiseñador`) produce SVG de referencia desde fotos propias, verificados contra material «compartir igual». Se acepta **solo como vista** (dibujo cosmético); el resto de la Tecnoparte se hace siempre en TecnoCircuito. **Qué entrega y con qué datos:** [docs/ENTREGA-VISTAS-TECNODISENADOR.md](docs/ENTREGA-VISTAS-TECNODISENADOR.md) (`-tc.svg` + `-tc.json`, fichas de Nano, expansión y shield, revisor `pruebas/revisar_vista_td.py`); aceptación en `prototipo/RECETA-COMPONENTE-NUEVO.md`.

## Cómo trabajar con Efraín

- **Tutéalo** y responde en español, cálido y directo. Lo construye Efraín (instructor) con Claude.
- **Commit y push solo con su sí explícito.** Al final de cada entrega pregunta «¿hago el commit y el push?». Convención: `feat:` `fix:` `docs:` `refactor:` `test:` `chore:`.
- **Nada llega al aula sin prueba con hardware** (ver «Validación»).
- Le gustan las **propuestas con criterio de experto**: recomendación clara y su porqué. Antes de implementar algo grande, explica el plan y espera su decisión.
- Quiere **entender cada detalle**: diagramas de bloques, guardados en COMO-FUNCIONA.md.
- **Verifica antes de decir que algo funciona** y di con honestidad lo que no se pudo probar.
- Valida en el laboratorio **una prueba a la vez desde TecnoBloques** (grupo de ejemplos «Validación con la placa real»); cada medida va a `validacion/` y el modelo se ajusta en el momento.
- GitHub: `EMariotte`. Windows 11, VS Code, KiCad 10.0.3 instalado.

## Decisiones tomadas (no reabrir sin un motivo nuevo)

| Decisión | Detalle |
|---|---|
| Solucionador eléctrico **propio** | MNA en JavaScript con Newton-Raphson para LED. Licencia Apache 2.0. |
| **Nada de código GPL** | Falstad, SimulIDE, Fritzing y PICSimLab solo como ideas. El esquema de la shield de Adafruit es «compartir igual»: no se mira. |
| **avr8js** (MIT, 0.21.1) | Ejecuta el `.hex` del ATmega328P. A la Mega le faltan los temporizadores 3, 4 y 5. |
| **@wokwi/elements** (MIT, 1.9.2) | Dibujos del LED, resistencia, botón y potenciómetro. El Uno ya es Pieza Tecno (14 oct). |
| **Placas con paso exacto de 2,54 mm** | Toda placa del simulador es Pieza Tecno con sus headers en paso exacto. El Uno de wokwi no cumplía: desde el 14 oct el Uno y la shield L293D son los medidos por TecnoDiseñador. Decisión de Efraín, 12 oct; ficha en [la especificación de entrega](docs/ENTREGA-VISTAS-TECNODISENADOR.md), secciones 6.0 y 6.5. |
| **Piezas Tecno originales** | Dibujos propios hechos desde la pieza real (servo, shield, motor TT, LiPo, probador), Apache 2.0 con encabezado SPDX. Receta: `prototipo/RECETA-COMPONENTE-NUEVO.md`. Las imágenes que exporta TecnoCircuito son libres (`NOTICE`). |
| Pieza = **vista + modelo eléctrico + modelo lógico + ficha** | La ficha va en `src/biblioteca.js`; el contrato revisa que no falte. |
| **Motor separado de la interfaz** | El núcleo se prueba con Node, sin navegador. |
| **Simula solo en la app de escritorio** | Necesita el `.hex` de arduino-cli. |
| **Repositorio propio y etiqueta fija** | TecnoBloques depende de una etiqueta; **versión congelada** mientras se use en el estudio de 2027. |
| **Las tareas mandan** | En 2026 solo se construye lo que piden T1, T2 y T3. |
| **Registro de eventos desde la etapa 0** | El paquete solo emite los eventos; TecnoBloques los guarda. |
| **Dibujos de TecnoDiseñador, solo como vista** | Se aceptan solo si su registro confirma que no usan material «compartir igual»; el SVG se limpia de metadatos ajenos y se reescala a la rejilla de 0,1". Terminar la Tecnoparte (modelo, ficha, pruebas, validación) sigue siendo trabajo de TecnoCircuito. |

## Alcance de 2026

| Tarea | Montaje | No idealidades | Estado |
|---|---|---|---|
| T1. LED y botón | LED con resistencia; botón con pull-up o pull-down | LED quemado; corriente del pin; entrada al aire | ✅ validada |
| T2. Potenciómetro y brillo | Potenciómetro en A0; LED con PWM | Ruido del ADC; entrada analógica al aire | ✅ validada |
| T3. Motor y servo | Shield L293D, motor TT, servo, LiPo | Caída del L293D; límite del USB; reinicio por caída | ◐ shield, LiPo, motor y probador medidos (15 oct); faltan sentido de giro, USB del Nano/Uno con 5–6 servos y MG90S |

**Calendario** (borrador): etapa 0 hasta el 30 oct; etapa 1 (chip y circuito DC) hasta el 27 nov; etapa 3 reducida (potencia) hasta el 11 dic; validación final del 14 al 18 dic (versión candidata «estudio 1.0»). Vamos adelantados en software. **Pasa a 2027:** módulos (HC-SR04, LCD, DHT11, MPU6050, PCA9685, MAX7219, HC-05), robots (Otto, carro en pista) y explicaciones con LLM verificadas por el simulador.

## Arquitectura (real)

Todo el código vive en `prototipo/` (todavía no hay paquete en la raíz).

```
prototipo/
├── src/
│   ├── index.js        API pública (window.TecnoCircuito): crearLienzo, crearSimulador, filasDeMediciones, VERSION, CONTRATO, PLACAS
│   ├── lienzo.js/.css  el lienzo en shadow DOM: piezas, cables, protoboard, biblioteca «+ Agregar», ficha, SVG y netlist
│   ├── catalogo.js     tipos de pieza (dibujo, pines, campos) · biblioteca.js: categorías, búsqueda y fichas
│   ├── simulador.js    lado de la página: órdenes al Worker y dibujo de cada foto
│   ├── trabajador.js   Web Worker (reloj); nucleo.js: chip + circuito + PWM + entradas + energía, sin DOM
│   ├── chip.js         avr8js (sin los getters de esbuild: sección 50; los modelos «cada ms» al cruzar cada ms: sección 54)
│   ├── placas.js       perfiles Uno/Nano; alimentacion_nano.js: fuentes y regulación de referencia del Nano
│   ├── motor/          MNA (mna.js) y armado de la red (red.js)
│   ├── conexiones.js   nodos del circuito (cables, protoboard, puentes internos de shield y batería)
│   ├── energia.js      USB del Uno (limiteUSB) · potencia.js: shield L293D, motores TT, LiPo y probador
│   ├── mediciones.js   la tabla en español de sim.mediciones()
│   ├── kicad.js        netlist: Uno J1–J4, L293D desarmada y Nano módulo + regulación/jack/I2C/SPI
│   └── piezas/         uno, nano, shield_nano_io (vistas de TecnoDiseñador: vistas/ + vista_td.js), servo, shield_l293d
│                       (y CONEXIONES_SHIELD: fuente única de AFMotor_R4), motor_tt, bateria_lipo, probador_lipo
├── programas/          .ino de prueba y sus .hex (npm run compilar)
├── pruebas/            Node (probar_*.js) y Chromium/Playwright (probar_*.py); probar_kicad_pcb.py usa KiCad
├── pagina.html         página de prueba con ejemplos · dist/: prototipo.html y tecnocircuito.js (npm run construir)
└── COMO-FUNCIONA.md · LEEME.md · RECETA-COMPONENTE-NUEVO.md
contrato/circuito.schema.json   el formato del circuito (lo revisa pruebas/contrato.js)
validacion/                     medidas de la placa real (se vuelven pruebas)
```

- **Un solo archivo de salida:** `dist/tecnocircuito.js`, un IIFE con avr8js y los dibujos dentro; TecnoBloques lo concatena sin bundler y funciona sin internet. **Nada de Node en el paquete.**
- **Rendimiento:** chip y circuito en un Web Worker; el circuito se resuelve una vez por combinación de pines y el PWM se promedia (secciones 25 a 30); lo que leen las entradas también se guarda por combinación (sección 50).
- **Publicar una versión** (en la raíz): `npm run preparar-version`; los pasos de la etiqueta los imprime el script (contrato, sección 9; COMO-FUNCIONA, sección 56).
- **Comandos** (en `prototipo/`): `npm run construir`, `npm run probar` (todo; con cargador: con batería fallan las pruebas de tiempo), `npm run probar:nucleo`, `npm run probar:kicad`, `npm run probar:contrato`, `npm run compilar`, `npm run fixtures`, `npm run vistas` (trae las vistas de `..\TecnoDiseñador`).

## Lo que hay que saber de TecnoBloques

Detalles en `..\TecnoBloques\CLAUDE.md` («Proyecto hermano», «App de escritorio»).

- **Placas:** TecnoBloques compila `uno`, `nano`, `nano_old`, `mega`; el simulador admite `uno`, `nano`, `nano_old`. Mega sigue pendiente. Nano nuevo guarda su expansión inicial sin necesitar una edición; su ejemplo ADC6/7 compila con cada FQBN y funciona en el Worker.
- **Proyecto `.tbq.json`** (formato 1): incluye `circuito`; el `.hex` se compila al simular. Contrato, sección 4.1.
- **Probar con el simulador local:** en TecnoBloques, `node build.js --simulador-local` y `npm run test:simulador`. Para abrir la app desde Claude Code: `env -u ELECTRON_RUN_AS_NODE npx electron .` (con esa variable puesta, Electron no abre ventana).
- **Kit:** shield L293D Rev4 (74HC595 en 4, 7, 8, 12; PWM M1 = 11, M2 = 3, M3 = 6, M4 = 5; SERVO_1 = 10, SERVO_2 = 9), librería **AFMotor_R4**; monitor serial en 0 y 1; I2C en A4 y A5.
- **Trampa de Servo y PWM:** la librería Servo inutiliza `analogWrite` en 9 y 10 (Uno/Nano); el simulador lo reproduce porque usa los temporizadores reales.
- TecnoBloques ya tiene el panel de mediciones, los paneles plegables, la biblioteca de ejemplos de validación, el CSV y el graficador del monitor serial (su `src/graficador.js`; explicado en COMO-FUNCIONA, sección 55).

## Validación contra el circuito real

- El mismo programa en la placa real y en el simulador. Criterios: **±5 % en voltaje, ±10 % en corriente, ±1 % en tiempos**; monitor serial idéntico.
- **El porcentaje se calcula respecto de la medida** (decisión de Efraín, 11 oct): `|simulador − medida| / |medida|`. Una comparación cumple si la diferencia es ≤ criterio · |medida| + la incertidumbre del instrumento. UT33B+ en voltios DC: ±(0,5 % de la lectura + 2 dígitos); en la escala de 20 V, 1 dígito = 0,01 V. Lo aplica `probar_motor.js`. Ninguna medida física respalda aún el ±1 % en tiempos.
- Instrumentos: multímetro UNI-T UT33B+; analizador lógico USB de 8 canales (pedido) con PulseView.
- **Uso validado** (14 oct, `validacion/2026-10-14-vistas-uso.md`): vistas medidas, LED de las placas e imán en la app, con Efraín y aprendices; aceptación 10/10. No reemplaza la validación eléctrica.
- **Validado** (registros en `validacion/`): LED rojo con 215/326/1000 Ω (7 oct: 11 de 12 dentro del criterio; la resistencia con 215 Ω da 5,01 % y cumple sumando la incertidumbre del UT33B+ (±0,5 % + 2 dígitos; ±0,033 V en 2,61 V)); velocidad en el PC del aula HP ProBook 450 G7 (≥ 90 %); ruido del ADC (0,1 pasos); entrada al aire (se queda en su nivel; con la mano capta 60 Hz: «la mano es el mouse»); SG90 (ángulos 7°/90°/175°; corriente quieto < 10 mA, ~100 y 590 mA); 5V del USB (5,11 V − 1,66 Ω; 4 SG90 no reinician); **15 oct:** continuidad de la shield L293D (AFMotor_R4 confirmado; KiCad corregido), caída del L293D (1,43–1,47 V con 0,13 A), LiPo del kit (1,2 Ω), motor TT (corriente, RPM y bloqueado dentro del criterio), probador (pantalla «2CS», «ALL», 1 s por paso) y 5/6 SG90 en el USB del **Nano** sin reinicio (4,12/4,03 V).

## Próxima sesión

**Laboratorio** (formato del 9 oct, varias prácticas seguidas; pasos en `prototipo/LEEME.md`):
1. **Pendientes de T3 (16 oct), en `validacion/2026-10-16-polaridad-bloqueo-servos-uno.md`:** el Uno **no** se reinicia con 5 ni 6 SG90 (el simulador sí: golpe de arranque exagerado) → probar 10 servos (6 SG90 + 4 MG90S) y anotar el 5V; M1 con FORWARD tiene positivo el **segundo** tornillo (el simulador, el primero) → medir M4, confirmar la orientación y un motor directo a la batería; motor bloqueado: 3,00 V (200) y 3,44 V (255) en M1 → falta la batería durante el bloqueo para separar el bobinado (¿3,8 Ω?) de la caída del L293D (¿1,7 V/A?); el 5V del Nano con 0 a 4 SG90.
2. **MG90S** (suspendido: hay solo 4): corrientes (quieto, barrido, bloqueado ≤ 2 s) y ángulos con el transportador. Con la hoja de datos, el simulador predice que 4 MG90S reinician el Uno.
3. Opcional: repetir el ADC con el programa corregido.
4. **La protoboard con 2 o 3 aprendices**, y la velocidad con TecnoBloques en el aula cuando exista `v0.1.0`.
5. ✅ **Shield L293D y motor TT** (15 oct). Lo que queda está en el punto 1.
6. ✅ **Probador de celdas** (15 oct).
7. ✅ **Continuidad de la shield del kit** (15 oct).
8. **Monitor serial con la placa real:** CSV y gráfico con `validar_adc` (solo se probaron con el simulador).
9. **Fotos para TecnoDiseñador:** ✅ Uno, Nano, expansión y shield L293D medidos e integrados (13–14 oct). Pendiente en TecnoDiseñador: pasar las filas +5/Gnd/A0-5 de la shield a 2,54 mm (decisión de Efraín: el estándar manda sobre la foto) y luego `npm run vistas` aquí. En el laboratorio: su continuidad. Lo que sigue es histórico: el **Uno R3 del kit**, según `TecnoDiseñador/plantillas/pedido-fotos.md` (desde arriba, regla a lo largo, regla a lo ancho girando 180°, cada chip de cerca), y decidir qué nombre queda impreso («UNO» es marca) y la **licencia**: el Uno del kit es original (CC BY-SA); conviene dibujar un clon si lo hay, o el original sin pistas (especificación 6.5). Después, las de la shield L293D. Ficha: especificación de entrega, sección 6.5.

**Software, en este orden (acordado el 11 oct):**
1. ✅ Adelgazar este archivo.
2. ✅ `/code-review` de los dos proyectos (11 oct): 19 hallazgos corregidos, con pruebas para los de comportamiento (el reloj de los modelos «cada ms» en el Worker era el más serio).
3. Revisión de experiencia de uso con un agente aparte: Efraín la hará con otro agente en paralelo. El encargo (11 oct):
   > Revisa la experiencia de uso de TecnoBloques y su simulador TecnoCircuito. Usuarios: aprendices de 14 a 17 años del SENA, en PC de aula. Abre la app con `env -u ELECTRON_RUN_AS_NODE npx electron .` en TecnoBloques (después de `node build.js --simulador-local`). Recorre: un ejemplo, la vista Dividido, la pestaña Circuito («+ Agregar», arrastrar, la ficha, Simular, Mediciones) y el Monitor serial (Texto/Gráfico, Exportar CSV), con capturas. Criterios: heurísticas de Nielsen, contraste WCAG AA, tamaño de botones, español claro para adolescentes, qué se entiende sin explicación. Entrega una lista priorizada (grave / medio / menor) con captura y propuesta concreta. **No cambies código: solo el informe.** Lee primero el CLAUDE.md de cada proyecto.

   Cuando llegue el informe, se decide con Efraín qué cambiar.
4. **Revisión de Codex cerrada** (11 oct): R1–R8 verificados. R6 quedó comprobado tras pasar `probar_motor.js` a la referencia de la medida y alinear fichas/textos; informa 11/12 estrictas y 12/12 con U. Informe de cierre enlazado arriba. Sigue como práctica recomendada repetir la medida de 215 Ω y mejorar su trazabilidad instrumental; permanecen los pendientes físicos de la sección «Validación».
5. ◐ **Registro de eventos: aprobado el 11 oct; plan de cinco fases aprobado el 16 oct. Hechos los pasos 1 y 2** (esquema `contrato/evento.schema.json` y emisor de TecnoCircuito, 16 oct; BITACORA). Sigue el paso 3, TecnoBloques (CONTRATO, sección 6.1, con las decisiones del 16 oct; plazo de la etapa 0: 30 oct). Decisiones de Efraín: el registro identifica al **equipo** con un código sin datos de los aprendices (la tabla código–integrantes queda fuera del software); **apagado por defecto**, lo enciende el instructor por PC, con aviso en pantalla; el equipo escribe su código al abrir, con confirmación; el circuito completo en cada `simulacion_iniciada`; las fallas de la corrida en `simulacion_detenida`; los eventos del editor definidos en el contrato; el C++ **sin comentarios** (los textos entre comillas se conservan y se revisan al exportar); el monitor serial no se registra; «Exportar registros» para el instructor. Orden de trabajo:
   1. `contrato/evento.schema.json` y su prueba en `probar:contrato`.
   2. TecnoCircuito: `v`, `corrida`, `ms_sim`, el circuito, las fallas por corrida y `simulacion_pausada`; las pruebas de Chromium validan cada evento contra el esquema.
   3. TecnoBloques: configuración del instructor, código del equipo, sobre, eventos del editor, quitar comentarios del C++ (con pruebas de comillas y escapes), IPC `tb:registrar` al `.jsonl`, «Exportar registros» y una prueba que valide el archivo.
   4. Codex verifica. En 2027 se definen la asignación de la condición (`condicion` queda reservado) y el registro por parejas o equipos en el diseño del estudio.
6. ✅ **`v0.1.0` etiquetada (16 oct)**, por pedido de Efraín antes de dos días solo de software, con los pendientes de T3 conocidos. TecnoBloques 0.3.0 depende de ella; su instalador (`TecnoBloques-Setup-0.3.0.exe`) está armado y probado, **sin publicar el Release** (las apps del aula se actualizan solas: publicarlo es decisión de Efraín). Corregir los pendientes de T3 lleva a `v0.1.1` (parche) o `v0.2.0` (contrato, sección 8).

**Próxima sesión, solo software (pedido de Efraín, 14 oct): LED y resistencia como Piezas Tecno**, para que todas las piezas de la suite nos pertenezcan (hoy salen de `@wokwi/elements`). La resistencia, en **dos tamaños**: un modelo más pequeño para las de **0,5 W** y el diseño actual para las de **2 W** (una propiedad nueva en la ficha; cambia el contrato). Los dibujos los hace TecnoDiseñador; antes de su encargo, TecnoCircuito define las fichas de vista (contactos `anodo`/`catodo` y `1`/`2`, LED con `data-led` y su color, marcos y paso de las patas) y explica el plan a Efraín. Para que toda la suite sea propia faltarán también el pulsador y el potenciómetro, que también son de wokwi.

**Primero en la próxima sesión de software (pedido de Efraín, 12 oct): diferenciar pines macho y hembra en el imán entre pines.** Hoy el imán enchufa cualquier pin en cualquier otro (incluso pata con pata); la idea es que cada pin declare si es macho (pata, pin de header macho) o hembra (header hembra, conector), y que el imán solo una macho con hembra. Antes de implementarlo, verbalizar el plan y el esfuerzo (qué pines de cada pieza son de cada tipo, contrato, pruebas). **El imán se queda en 6 px por ahora** (decisión de Efraín, 12 oct).

**Encargo a TecnoDiseñador:** ✅ Uno R3, Nano, expansión y shield L293D (integrados el 14 oct). **Imán entre pines (12 oct):** las piezas se enchufan sin cables en el pin de otra pieza o de la placa (`en` ampliado; COMO-FUNCIONA, sección 61). Pendiente de probarlo con aprendices junto con la protoboard.

**Pendientes conocidos:** el circuito del Uno no siente toda la caída del 5V (solo los servos ven el voltaje real); Nano sí entrega su alimentación de referencia a MNA/GPIO/ADC. Faltan validación física de Nano/expansión, esquemático `.kicad_sch` con etiquetas, diagrama de flujo del programa (TecnoBloques) y símbolo de marca en SVG (`MARCA_SVG` en `src/lienzo.js`).

## Riesgos técnicos

- **T3 medido el 15 oct** (`validacion/2026-10-15-*.md`, COMO-FUNCIONA sección 65): LiPo de 1,2 Ω (antes 0,05), caída del L293D de 1,3 V + 1 V/A (el aumento por amperio sigue sin medir), motor TT dentro del criterio con un solo motor medido. **Sin validar:** el sentido de giro (la rueda derecha real avanza con el mismo cableado), el USB del Nano (el real baja ~1 V con 5–6 SG90; el modelo casi nada) y si el golpe de arranque de los servos está exagerado (el Nano real no se reinició con 6). La resistencia de la LiPo es la no idealidad `resistenciaBateria` (16 oct, contrato).
- **Nano + expansión:** geometría y alimentación de referencia; sin identificar reguladores/protecciones comerciales. Confirmar continuidad, jack, aislamiento USB/jack, curvas de carga, disipación y montaje antes del aula o fabricación. La exportación de KiCad lleva notas de pendientes y no es una PCB terminada.
- Rendimiento con programas que cambian pines sin pausa: atendido (sección 50); medir con TecnoBloques en el aula.
- La protoboard con aprendices: falta probarla.
- Más adelante: tiempos estrictos del DHT11 y comandos completos del HD44780.

## Investigación (privada)

- `investigacion/` es **local y no entra a git**: estado del arte, diseño del estudio de 2027, ética y cronograma. Léelo para entender el modo ideal, el registro de eventos y la versión congelada.
- **Nada de esa carpeta va a archivos versionados**, ni registros de aprendices ni la tabla de alias. Este repositorio es público: en código, commits y bitácora solo va lo técnico.
- `prototipo/Imagenes_módulos/` tiene imágenes con licencia de terceros (referencia para dibujar): está en `.gitignore`.

## Reglas de desarrollo — siempre seguir

1. **Interfaz en español** para aprendices: frases cortas y mensajes de falla que dicen qué pasó y cómo arreglarlo.
2. **Todo componente nuevo se valida contra la placa real** antes de darlo por terminado; su traza va a `validacion/`.
3. **No copiar código GPL**; antes de mirar el código de otro proyecto, revisa su licencia.
4. **El contrato manda:** un cambio en `CONTRATO.md` se anota en las dos bitácoras y en «Proyecto hermano» de TecnoBloques.
5. **Registrar hitos en `BITACORA.md`** (nunca editar entradas pasadas) y actualizar este archivo cuando cambie el estado.
6. **`dist/tecnocircuito.js` de la raíz se commitea solo al etiquetar una versión**, construido desde el código de esa etiqueta.

## Ideas para más adelante

- Esquemático de KiCad (`.kicad_sch`) con etiquetas en vez de cables, reutilizando las tablas de `src/kicad.js`.
- Diagrama de flujo del programa en TecnoBloques (SVG, para documentación y TecnoRuta).
- Símbolo de TecnoCircuito en la marca de la imagen SVG.

## Referencias

- avr8js: https://github.com/wokwi/avr8js · @wokwi/elements: https://github.com/wokwi/wokwi-elements · TecnoBloques: https://github.com/EMariotte/TecnoBloques
- Solo ideas, sin copiar código: Fritzing, SimulIDE, Falstad CircuitJS1, Edrys, ElectroBlocks.

*TecnoCircuito · SENA TecnoAcademia Tolima · Octubre 2026*
