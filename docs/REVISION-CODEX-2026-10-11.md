# Revisión independiente de TecnoCircuito — 11 de octubre de 2026

Autor: Codex, revisor. Encargo de Efraín: evaluar el proyecto, comprobar las pruebas documentadas por Claude y establecer AGENTS.md. Revisión inicial: `38930661b36f55653cd9ec7ca562cbb603262c5f`; árbol de TecnoCircuito limpio al empezar. No había etiquetas locales.

## Resultado y alcance

**Se reprodujeron las 593 comprobaciones de los 19 grupos, sin fallos.** Se ejecutó KiCad real. La integración local con TecnoBloques aprobó 37 comprobaciones y su graficador 28. Los 15 programas `.ino` recompilaron para Uno con memoria flash idéntica a los HEX versionados.

La revisión encontró **ocho hallazgos abiertos: dos de gravedad alta, cinco media y uno menor**. La suite actual no detecta los seis primeros casos; se adjunta un [diagnóstico reproducible](revision-2026-10-11.cjs). Pasar la suite no basta para recomendar todavía la etiqueta de entrega al aula.

Se revisaron arquitectura, API, circuito y esquema, solucionador, chip/HEX, reloj/Worker, alimentación, piezas, lienzo, biblioteca, mediciones, SVG, KiCad, construcción, preparación de versión, pruebas y documentos de validación. Se comprobó el hermano para los recorridos de integración citados. Es una revisión estática y funcional amplia, no una auditoría formal de seguridad, accesibilidad ni del instalador completo de TecnoBloques.

**No se conectó hardware.** Las medidas físicas se contrastaron con sus registros, datos y pruebas; no se repitieron en el laboratorio. No se cambió código de producción, contrato, mediciones ni HEX. No se ejecutó la publicación, se creó una etiqueta ni se hizo commit o push.

## Entorno y pruebas ejecutadas

Windows, Node 24.15.0, npm 11.12.1, Python 3.14.4, Chromium 153.0.8010.12, KiCad 10.0.3 y Arduino CLI 1.5.1. Dependencias declaradas: avr8js 0.21.1, Wokwi 1.9.2, esbuild 0.28.2 y Ajv 8.20.0. No se confirmó si este PC estaba conectado al cargador; esta ejecución no certifica el rendimiento de los PC del aula.

| Grupo de `npm run probar` | Comprobaciones | Resultado |
|---|---:|---|
| Motor MNA | 18 | Aprobado |
| Núcleo | 65 | Aprobado |
| Potencia | 40 | Aprobado |
| Netlist KiCad, Node | 35 | Aprobado |
| Contrato | 68 | Aprobado |
| Fixtures de TecnoBloques | 20 | Aprobado, con alcance indicado abajo |
| PCB con KiCad real | 108 | Aprobado, ejecutado |
| Lienzo básico | 24 | Aprobado |
| Extras | 18 | Aprobado |
| Simulación | 19 | Aprobado |
| Eléctrico | 14 | Aprobado |
| PWM y Worker | 21 | Aprobado |
| Exportación SVG | 16 | Aprobado |
| T1 y T2 | 16 | Aprobado |
| Protoboard | 29 | Aprobado |
| Servo | 18 | Aprobado |
| Carro | 27 | Aprobado |
| Biblioteca | 27 | Aprobado |
| Probador LiPo | 10 | Aprobado |
| **Total** | **593** | **0 fallos** |

Las fixtures contienen 17 proyectos: 14 ejecutan el chip y tres de Mega solo verifican el formato; el log dice expresamente que sus HEX no se ejecutan. Los otros tres checks cubren presencia de fixtures, eco y T1. Nano se ejercita dentro del núcleo para estos programas, sin ampliar el soporte de la API pública. KiCad produjo las 15 piezas nuevas del carro, 63 conexiones por trazar y ningún solape; una netlist correcta no acredita la continuidad de la shield física.

| Comprobación adicional | Resultado y límites |
|---|---|
| `npm.cmd --prefix ../TecnoBloques run test:simulador` | 37 OK; compilación real con CLI, Worker, serial, PWM, guardado, paneles, SVG, KiCad, gráfico/CSV y rechazo de Nano; sin errores JS |
| `node ../TecnoBloques/test/graficador.js` | 28 OK, sin fallos |
| `npm.cmd --prefix ../TecnoBloques test` | Exit 0; ambos scripts recorrieron la app, pero registraron un recurso ausente y no aseguran el fallo del proceso ante errores: R8 |
| Recompilación aislada de los 15 `.ino` | Exit 0 en todos; comparación de los 32768 bytes de flash contra cada HEX versionado: idénticos |
| `npm.cmd pack --dry-run --json` en la raíz | Exit 0 y seis archivos documentales/esquema/manifest; **no incluye `dist/tecnocircuito.js` en este checkout**. Requiere preparar la versión; este dry-run no certifica un paquete instalable |
| `node docs/revision-2026-10-11.cjs` | Reproduce R1–R6; exit 0 indica ejecución del diagnóstico, no ausencia de defectos |

Programas recompilados: `boton_pulldown`, `boton_pullup`, `carro_continuo`, `carro_motores`, `desvanecer9`, `fijo13`, `parpadeo13`, `parpadeo8`, `potenciometro`, `pwm9`, `servo_barrido`, `servo_continuo`, `servos_cuatro`, `validar_adc` y `validar_flotante`.

Se usó `arduino-cli compile --fqbn arduino:avr:uno --build-path <salida-aislada>/build --output-dir <salida-aislada>/hex <carpeta-del-programa>`. Las salidas quedaron bajo `prototipo/pruebas/capturas/revision-codex/compilacion/`, excluidas de Git. La identidad se comparó decodificando Intel HEX, no comparando texto ni incorporando bootloader.

Los logs locales están en `prototipo/pruebas/revision-codex*-2026-10-11.log`, excluidos de Git, y las capturas en `prototipo/pruebas/capturas/`. Esta tabla conserva el resultado aunque esos temporales no acompañen un clone. La primera ejecución bajo sandbox no pudo iniciar esbuild por acceso a directorios antecesores; el reintento autorizado terminó correctamente. Los avisos de manejadores de imagen duplicados de KiCad no produjeron fallos.

## Hallazgos abiertos

### R1 — Alta: las fuentes eléctricas no siguen los puentes internos de la shield

**Ubicación:** [motor/red.js](../prototipo/src/motor/red.js), líneas 74, 90 y 133; [conexiones.js](../prototipo/src/conexiones.js).

Un circuito aceptado por el contrato conecta `shield1.S2_POS → resistencia de 1 kΩ → shield1.S2_GND`. Los puentes de la shield lo unen a 5V/GND del Uno, pero la solución entrega **0 mA** y no crea ninguna fuente. Con cables directos a `placa.5V` y `placa.GND1`, el mismo resistor recibe **5 mA**.

`armarRed` decide qué fuentes y pines crear por la referencia escrita en los cables (`usados.has`), en lugar de la equivalencia eléctrica resultante. Puede enseñar resultados distintos para montajes eléctricamente equivalentes. El modelo lógico del servo no descubre este defecto porque identifica la alimentación por otra vía.

**Corrección propuesta:** determinar uso de fuentes y pines por nodos equivalentes. Añadir regresiones para resistor/LED alimentados desde el conector de servo y señales a través de la shield; comparar con el montaje directo, incluidos cortocircuitos.

### R2 — Alta: el reloj acelera el enfriamiento mientras la placa está apagada

**Ubicación:** [nucleo.js](../prototipo/src/nucleo.js), `seguirApagada`, líneas 297–307; [energia.js](../prototipo/src/energia.js).

Después de abrir el fusible con una carga de 4,7 Ω, 100 llamadas de 4801 ciclos representan **30,00625 ms**. El calor reportado baja de **1 a 0,96**, como si hubieran pasado aproximadamente 100 ms; según `enfriaS = 3`, la caída debiera rondar 0,01. La foto redondea a centésimas.

`seguirApagada` avanza `base` por la fracción real, pero llama `avanzarServos()` una vez por cada fracción y esta procesa 1 ms entero. La corrección previa de `chip.correr` para pasos parciales no cubre este camino. La recuperación del fusible y los modelos temporales atendidos durante el apagado dependen del tamaño de las llamadas del Worker.

**Corrección propuesta:** acumular los ciclos parciales o pasar la duración real a todos los modelos. Probar apertura, enfriamiento y vuelta de energía con avances de 16000, 4801 y tamaños mezclados; comparar en tiempo simulado.

### R3 — Media: el presupuesto USB omite la corriente entregada por GPIO

**Ubicación:** [nucleo.js](../prototipo/src/nucleo.js), líneas 234 y 550.

Con D13 en ALTO y una resistencia de 220 Ω a GND, el pin entrega **20,408 mA**, pero la energía reporta solo **50 mA** de consumo fijo de la placa. `iCircuito` suma las fuentes 5V/3V3, sin la corriente que el chip entrega por sus salidas.

Las cargas desde GPIO quedan fuera del cálculo de caída y calentamiento USB. Este defecto es distinto de la aproximación ya conocida de fuentes ideales del circuito.

**Corrección propuesta:** incorporar el consumo de salidas sin contar dos veces corrientes de retorno. Comparar USB con/sin carga GPIO y con varias salidas y alimentación VIN.

### R4 — Media: el límite total del chip prometido por el contrato no está implementado

**Ubicación:** [CONTRATO.md](../CONTRATO.md), sección 8, `limitePin`; [motor/red.js](../prototipo/src/motor/red.js), línea 242.

El contrato promete «corriente máxima por pin y total del chip». `revisarFallas` evalúa cada pin por separado. Una medición sintética de **ocho pines a 30 mA, 240 mA agregados**, no genera ninguna falla. El diagnóstico prueba directamente la función, no simula un nuevo montaje físico.

**Corrección propuesta:** acordar y documentar los límites agregados y de grupos aplicables, implementar su detección y probar varias cargas individualmente permitidas. Si se reduce el alcance del contrato, sincronizarlo con el hermano; no declarar cumplida la promesa actual.

### R5 — Media: el lector HEX acepta un registro truncado con checksum correcto

**Ubicación:** [hex.js](../prototipo/src/hex.js), líneas 13–16.

La entrada `:0200000001FD` seguida de `:00000001FF` declara dos bytes de datos y solo contiene uno; su checksum suma correctamente. El lector la acepta y toma `FD`, el checksum, como segundo byte del programa: primera palabra **0xFD01**.

La comprobación pública del HEX no evita que un archivo estructuralmente dañado ejecute instrucciones distintas.

**Corrección propuesta:** exigir `datos.length === largo + 5` y longitudes/direcciones válidas por tipo de registro antes de copiar. Añadir casos truncados y excedentes con checksum válido, además de los HEX correctos actuales.

### R6 — Media: las fichas generalizan o presentan como medidos parámetros que no lo están

**Ubicación:** [biblioteca.js](../prototipo/src/biblioteca.js), líneas 61, 85 y 102; registros en [validacion/](../validacion/).

La ficha de un **LED azul** devuelve `estado: validado` y cita las 12 comparaciones realizadas solo con LED rojo. La ficha SG90 dice corriente «6, ~100 y 590 mA» medida, pero el registro establece **reposo menor de 10 mA** por resolución del multímetro y **6 mA típico de hoja de datos**. Los 0,1 pasos de ruido ADC son una estimación ajustada, no una desviación exacta medida con el programa corregido.

**Corrección propuesta:** condicionar el estado del LED al color contrastado y explicitar medición, resolución y parámetros ajustados en las fichas. Conservar los valores del modelo mientras no haya nueva evidencia; probar el contenido de las fichas por variante.

### R7 — Menor: instrucciones de uso desactualizadas

**Ubicación:** [LEEME.md](../prototipo/LEEME.md), líneas 46, 73 y 141; [README.md](../README.md), lista de piezas; comentario de [servos_cuatro.ino](../prototipo/programas/servos_cuatro/servos_cuatro.ino).

LEEME anuncia ocho recorridos de Chromium cuando hay doce; describe una entrada al aire que cambia cada 120 ms, anterior al modelo medido; y dice que la netlist aún no incluye shield/motor/batería pese a explicar arriba la exportación nueva. README omite piezas de potencia en su lista. El ejemplo de cuatro servos conserva un comentario de reinicio contrario a la validación posterior de USB.

**Corrección propuesta:** actualizar instrucciones y comentarios vigentes, manteniendo las entradas históricas de bitácora y registros físicos fechados.

### R8 — Media: `npm test` del hermano puede dar éxito con errores de navegador

**Ubicación en TecnoBloques:** `test/prueba.py`, línea 65; `test/prueba_todo.py`, líneas 331 y 388; script `test` en su package.json.

Durante esta revisión `npm test` terminó con **exit 0** aunque `prueba.py` imprimió `Failed to load resource: net::ERR_FILE_NOT_FOUND`. Una observación independiente de las solicitudes identificó **`dist/tbmedia/sprites.svg` ausente**. Los scripts imprimen los errores sin convertirlos en un exit fallido; `prueba_todo.py` además filtra errores que contienen `ERR_`.

Este hallazgo afecta la fuerza de la evidencia «npm test sin fallas» documentada para la integración, y no invalida las 37 comprobaciones específicas de `test:simulador`.

**Corrección propuesta para Claude en el hermano:** resolver el recurso faltante o clasificar con precisión su carácter esperado, rechazar errores inesperados y hacer que los scripts fallen ante aserciones/errores relevantes. Probar que un error JS o una aserción incorrecta dé exit distinto de cero.

## Contraste de las validaciones físicas documentadas

| Registro | Evidencia conservada y límite de lo comprobado |
|---|---|
| [LED rojo, 7 oct](../validacion/2026-10-07-led-rojo-multimetro.md) y JSON | Tres montajes, 12 comparaciones, reejecutados por la suite en tres checks agrupados. Corriente inferida por V/R; 1 kΩ nominal. No extiende la validación a otros colores. El caso 215 Ω no cierra por 0,13 V |
| [Entrada al aire](../validacion/2026-10-09-entrada-flotante.md) | Registro cualitativo del pin digital y la mano; regresiones del modelo aprobadas. El comportamiento de la entrada analógica no queda medido por esta práctica |
| [Ruido ADC](../validacion/2026-10-09-ruido-adc.md) | 37 líneas originales; errores de desviación por float reconocidos y programa corregido. 0,1 pasos es estimación; repetir posiciones físicas con el programa corregido sigue pendiente |
| [Ángulos SG90](../validacion/2026-10-09-servo-angulos.md) | Tres posiciones físicas 7°/90°/175° usadas por el modelo y las pruebas; no valida todas las unidades, MG90S ni precisión dinámica |
| [Corriente SG90](../validacion/2026-10-09-servo-corriente.md) | Reposo <10 mA, barrido ~100 mA, bloqueo 590 mA. Los 6 mA son típicos; pico en movimiento y MG90S pendientes. Las consecuencias antiguas de reinicio con tres servos fueron revisadas por el registro USB posterior |
| [USB 5V](../validacion/2026-10-09-usb-5v.md) | Voltajes con 0–4 SG90 y ausencia de reinicio con cuatro; modelo 5,11 V y 1,66 Ω ajustado. Cortes del puerto, calentamiento/enfriamiento del fusible y predicciones con más servos no se verificaron físicamente en esta revisión |
| [Velocidad PC aula](../validacion/2026-10-09-velocidad-pc-aula.md) | Evidencia histórica del commit `cdb7b7c`; declara «nunca bajó de 90 %» pero reconoce captura de 86 %. Cuatro servos dan 66 % en un modelo anterior que reiniciaba. Repetir con la revisión actual en TecnoBloques y cargador |

**Referencia del porcentaje:** `probar_motor.js`, línea 162, usa `abs(real − sim) / abs(sim)`. Es consistente con la tabla, pero el criterio general no explicita esta referencia. En la resistencia de 215 Ω, 2,61 V frente a 2,741 V da aproximadamente 4,78 % respecto del simulador y 5,02 % respecto de la medida. Acordar y documentar la referencia antes de interpretar el umbral; no modificar datos ni tolerancias para aprobar retrospectivamente.

No se encontró en estos registros una traza física que acredite el criterio general de **±1 % en tiempos**. Las tolerancias de velocidad de las pruebas de navegador son criterios de ejecución distintos. La repetición del serial en el simulador tampoco sustituye el contraste físico de CSV/gráfico, señalado como pendiente por Claude.

Siguen pendientes las mediciones del kit: caída L293D, cableado interno de shield, corriente/RPM del motor TT, LiPo bajo carga y celdas, secuencia/umbral del probador y MG90S. La prueba con aprendices y el rendimiento en TecnoBloques del aula también requieren observación externa.

## Siguiente trabajo y coordinación

1. Claude corrige R1 y R2 con regresiones que comparen nodos equivalentes y tamaños de avance, incluidos apagado y recuperación. Codex verifica cada caso y las partes afectadas.
2. Resolver R3–R6, y R8 en el hermano, antes de dar por acreditados sus contratos o declaraciones de validación. Actualizar R7 sin reescribir registros históricos.
3. Efraín continúa una práctica física por vez y registra instrumento, programa, montaje, condiciones, medida y criterio. Los hallazgos físicos no se cierran con pruebas sintéticas.
4. Registrar cada cierre en BITACORA.md con ID, autor, revisión, evidencia y pendientes; mantener este informe como foto de la revisión inicial.
5. Después de correcciones y laboratorio, preparar y comprobar el bundle etiquetado y su integración. La revisión actual no ejecutó `preparar-version`, la instalación desde etiqueta ni `test:app` del futuro paquete.
