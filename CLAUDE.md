# CLAUDE.md — TecnoCircuito

> Foto del estado actual para Claude Code. Se sobrescribe cuando algo cambia; la historia está en [`BITACORA.md`](BITACORA.md) (append-only) y las explicaciones técnicas en [`prototipo/COMO-FUNCIONA.md`](prototipo/COMO-FUNCIONA.md) (secciones numeradas).
> Actualizado: 11 de octubre de 2026.

## Estado en una línea

Prototipo validado y publicado (https://github.com/EMariotte/TecnoCircuito). Tareas **T1 y T2 completas y validadas con la placa real; T3 completa en software** (servo, energía del USB, shield L293D, motor TT, LiPo 2S, probador de celdas), con el servo SG90 y el USB validados y el resto **por validar en el laboratorio**. `npm run probar` (en `prototipo/`): 19 grupos, 593 comprobaciones. Falta la primera etiqueta `v0.1.0` para que el simulador llegue al instalador de TecnoBloques.

## Qué es

**Simulador de circuitos con microcontrolador** para TecnoBloques, el editor de bloques en español para Arduino de la **TecnoAcademia Tolima (SENA, Ibagué)**. El aprendiz arma el circuito en una protoboard dibujada, TecnoBloques compila su programa y TecnoCircuito lo ejecuta sobre ese circuito.

- **Simulación híbrida:** eléctrica real (MNA) para LED, resistencias, botones, potenciómetros y motores; lógica por protocolo para los módulos.
- **Muestra las fallas reales** (LED quemado, corriente de un pin, caída del L293D, reinicio por consumo). **Cada no idealidad se apaga** por configuración (modo «ideal»).
- **Instrumento de un proyecto de investigación SENNOVA** (estudio en 2027). Ver «Investigación».
- Usuarios: **aprendices, muchos menores de edad**. Textos en español, cortos y sin jerga.
- **Proyecto hermano:** TecnoBloques (`..\TecnoBloques`, https://github.com/EMariotte/TecnoBloques). **El contrato entre los dos está en [`CONTRATO.md`](CONTRATO.md)** (contrato 1) y es la fuente única.

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
| **@wokwi/elements** (MIT, 1.9.2) | Dibujos del Uno, LED, resistencia, botón y potenciómetro. |
| **Piezas Tecno originales** | Dibujos propios hechos desde la pieza real (servo, shield, motor TT, LiPo, probador), Apache 2.0 con encabezado SPDX. Receta: `prototipo/RECETA-COMPONENTE-NUEVO.md`. Las imágenes que exporta TecnoCircuito son libres (`NOTICE`). |
| Pieza = **vista + modelo eléctrico + modelo lógico + ficha** | La ficha va en `src/biblioteca.js`; el contrato revisa que no falte. |
| **Motor separado de la interfaz** | El núcleo se prueba con Node, sin navegador. |
| **Simula solo en la app de escritorio** | Necesita el `.hex` de arduino-cli. |
| **Repositorio propio y etiqueta fija** | TecnoBloques depende de una etiqueta; **versión congelada** mientras se use en el estudio de 2027. |
| **Las tareas mandan** | En 2026 solo se construye lo que piden T1, T2 y T3. |
| **Registro de eventos desde la etapa 0** | El paquete solo emite los eventos; TecnoBloques los guarda. |

## Alcance de 2026

| Tarea | Montaje | No idealidades | Estado |
|---|---|---|---|
| T1. LED y botón | LED con resistencia; botón con pull-up o pull-down | LED quemado; corriente del pin; entrada al aire | ✅ validada |
| T2. Potenciómetro y brillo | Potenciómetro en A0; LED con PWM | Ruido del ADC; entrada analógica al aire | ✅ validada |
| T3. Motor y servo | Shield L293D, motor TT, servo, LiPo | Caída del L293D; límite del USB; reinicio por caída | ◐ software hecho; validar shield, motor, LiPo y probador |

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
│   ├── motor/          MNA (mna.js) y armado de la red (red.js)
│   ├── conexiones.js   nodos del circuito (cables, protoboard, puentes internos de shield y batería)
│   ├── energia.js      USB del Uno (limiteUSB) · potencia.js: shield L293D, motores TT, LiPo y probador
│   ├── mediciones.js   la tabla en español de sim.mediciones()
│   ├── kicad.js        netlist de KiCad (shield del Uno J1–J4 y la shield L293D desarmada)
│   └── piezas/         servo, shield_l293d (y CONEXIONES_SHIELD: fuente única de AFMotor_R4), motor_tt, bateria_lipo, probador_lipo
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
- **Comandos** (en `prototipo/`): `npm run construir`, `npm run probar` (todo; con cargador: con batería fallan las pruebas de tiempo), `npm run probar:nucleo`, `npm run probar:kicad`, `npm run probar:contrato`, `npm run compilar`, `npm run fixtures`.

## Lo que hay que saber de TecnoBloques

Detalles en `..\TecnoBloques\CLAUDE.md` («Proyecto hermano», «App de escritorio»).

- **Placas:** `uno`, `nano`, `nano_old`, `mega`. El simulador por ahora solo simula `uno`.
- **Proyecto `.tbq.json`** (formato 1): incluye `circuito`; el `.hex` se compila al simular. Contrato, sección 4.1.
- **Probar con el simulador local:** en TecnoBloques, `node build.js --simulador-local` y `npm run test:simulador`. Para abrir la app desde Claude Code: `env -u ELECTRON_RUN_AS_NODE npx electron .` (con esa variable puesta, Electron no abre ventana).
- **Kit:** shield L293D Rev4 (74HC595 en 4, 7, 8, 12; PWM M1 = 11, M2 = 3, M3 = 6, M4 = 5; SERVO_1 = 10, SERVO_2 = 9), librería **AFMotor_R4**; monitor serial en 0 y 1; I2C en A4 y A5.
- **Trampa de Servo y PWM:** la librería Servo inutiliza `analogWrite` en 9 y 10 (Uno/Nano); el simulador lo reproduce porque usa los temporizadores reales.
- TecnoBloques ya tiene el panel de mediciones, los paneles plegables, la biblioteca de ejemplos de validación, el CSV y el graficador del monitor serial (su `src/graficador.js`; explicado en COMO-FUNCIONA, sección 55).

## Validación contra el circuito real

- El mismo programa en la placa real y en el simulador. Criterios: **±5 % en voltaje, ±10 % en corriente, ±1 % en tiempos**; monitor serial idéntico.
- Instrumentos: multímetro UNI-T UT33B+; analizador lógico USB de 8 canales (pedido) con PulseView.
- **Validado** (registros en `validacion/`): LED rojo con 215/326/1000 Ω (7 oct, 12 de 12); velocidad en el PC del aula HP ProBook 450 G7 (≥ 90 %); ruido del ADC (0,1 pasos); entrada al aire (se queda en su nivel; con la mano capta 60 Hz: «la mano es el mouse»); SG90 (ángulos 7°/90°/175°; corriente 6, ~100 y 590 mA); 5V del USB (5,11 V − 1,66 Ω; 4 SG90 no reinician).

## Próxima sesión

**Laboratorio** (formato del 9 oct, varias prácticas seguidas; pasos en `prototipo/LEEME.md`):
1. **5 y 6 SG90** saltando juntos («Validar: seis servos en el USB»): el simulador predice reinicio.
2. **MG90S:** corrientes (quieto, barrido, bloqueado ≤ 2 s) y ángulos con el transportador.
3. Opcional: repetir el ADC con el programa corregido.
4. **La protoboard con 2 o 3 aprendices**, y la velocidad con TecnoBloques en el aula cuando exista `v0.1.0`.
5. **Shield L293D y motor TT** («Validar: carro con la shield L293D»): LiPo quieta y con motores, caída del L293D en M1, corriente y RPM sin carga, corriente bloqueado (≤ 1 s), hacia dónde gira cada rueda.
6. **Probador de celdas** («Validar: probador de celdas LiPo»): secuencia y duración de la pantalla, umbral de fábrica, cada celda con el multímetro.
7. **Continuidad de la shield del kit** (suelta, sin Uno ni batería): a qué pata de cada integrado llega cada pin y borne; comparar con `SHIELD_KICAD` (sección 53).
8. **Monitor serial con la placa real:** CSV y gráfico con `validar_adc` (solo se probaron con el simulador).

**Software, en este orden (acordado el 11 oct):**
1. ✅ Adelgazar este archivo.
2. ✅ `/code-review` de los dos proyectos (11 oct): 19 hallazgos corregidos, con pruebas para los de comportamiento (el reloj de los modelos «cada ms» en el Worker era el más serio).
3. Revisión de experiencia de uso con un agente aparte: Efraín la hará con otro agente en paralelo. El encargo (11 oct):
   > Revisa la experiencia de uso de TecnoBloques y su simulador TecnoCircuito. Usuarios: aprendices de 14 a 17 años del SENA, en PC de aula. Abre la app con `env -u ELECTRON_RUN_AS_NODE npx electron .` en TecnoBloques (después de `node build.js --simulador-local`). Recorre: un ejemplo, la vista Dividido, la pestaña Circuito («+ Agregar», arrastrar, la ficha, Simular, Mediciones) y el Monitor serial (Texto/Gráfico, Exportar CSV), con capturas. Criterios: heurísticas de Nielsen, contraste WCAG AA, tamaño de botones, español claro para adolescentes, qué se entiende sin explicación. Entrega una lista priorizada (grave / medio / menor) con captura y propuesta concreta. **No cambies código: solo el informe.** Lee primero el CLAUDE.md de cada proyecto.

   Cuando llegue el informe, se decide con Efraín qué cambiar.
4. ◐ **Publicación `v0.1.0` preparada, sin etiquetar** (11 oct): `npm run preparar-version` en la raíz arma `dist/tecnocircuito.js` con la versión exacta y lo revisa; probado instalando el paquete en TecnoBloques (la app lo usa como «etiqueta») y el instalador ya exige una etiqueta fija. **Etiquetar solo después del laboratorio**, siguiendo los pasos que imprime el script.

**Pendientes conocidos:** el esquema de los eventos del contrato (falta desde la etapa 0; lo necesita el estudio); el circuito no siente la caída del 5V (solo los servos ven el voltaje real); el esquemático `.kicad_sch` con etiquetas; el diagrama de flujo del programa (en TecnoBloques); el símbolo de marca en la imagen SVG (`MARCA_SVG` en `src/lienzo.js`).

## Riesgos técnicos

- **Supuestos sin validar en T3:** resistencia interna de la LiPo (0,05 Ω), datos del motor TT (200 RPM y 150 mA sin carga a 6 V, 1,2 A bloqueado), caída del L293D (1,4 V + 1 V/A), cableado interno de la shield del kit y pantalla del probador. Las pruebas comparten estos supuestos: solo el laboratorio los confirma.
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
