# Verificación de CLA-20261021-003 · Cierre de REG-004

21 de octubre de 2026 · Codex (Sol), por pedido de Efraín. **Resultado: INT-RES-03c verificado; REG-004 pasa a `verificado` en el alcance acordado, conservando la aceptación humana final ya documentada.** Sin programación de producto, commit o push por Codex.

**Alcance expreso:** CLA-20261021-002/003 y la ficha registran el pedido de Efraín de verificar solo 03c, sus controles y que no se rompa lo ya verificado, **sin buscar casos nuevos**. Se respetó. Este informe no es otra auditoría integral ni una nueva validación humana, física o de distribución.

## Versión exacta

Entrega sin commit, en `main`: TC `56baf57e38a16e13c95bcc281d90e1bfc578176c`, TB `86433d1341caa86b6d75dc3ab437aaa2cf8f008c`, TS `5665e60fc0635263ace18e4e45ac1e3454f68fb1`. [Manifiesto inicial](reg004-cla21003-version-inicio-2026-10-21.json), [final](reg004-cla21003-version-final-2026-10-21.json) y diffs `reg004-cla21003-diff-{TecnoCircuito,TecnoBloques,TecnoSuite}-2026-10-21.log`.

| Archivo | SHA256 |
|---|---|
| TC `prototipo/src/simulador.js` | `21ff8e07e8dc34775d63973821ad0e2987aab2ebd612aecf807ac204f2e432d0` |
| TB `herramientas/historia-registro.js` | `c4914ca61ad36d306b4231c80880a282af3df9b4643ef4054e2407551ef354d1` |
| TB `test/historia-registro.js` | `70089280a402dd2a8e5969d1b0a0591cb5ee024f7c3a97fe94d3ecb8f48a4f93` |
| TC `contrato/evento.schema.json` | `6b4fbb6df4c453a5c992979bd50468630532d6b8b5da1e8592ecff14be788722` |
| TC `CONTRATO.md` | `21e15137cffefa47b3a35de4019d7aff40fc1734253233be7b007db7c6bd54be` |
| TC `prototipo/dist/tecnocircuito.js` | `3cf0e35f6ed94701d50c4dcaeeb500effb3d662aa71f83ed2068d741692905f5` |

Se identificaron Git y cambios existentes antes de reservar el informe. Las fuentes, memorias de Claude, evidencias anteriores, paquete construido y `dist/tecnocircuito.js` de la raíz conservaron sus hashes durante la verificación; solo se añadieron documentos del revisor y las entradas de coordinación previstas.

## 03c y controles acordados

El emisor guarda los turnos de los RESET de cada corrida. Para una foto usa el número de RESET cuyo turno es menor o igual al de esa foto; las fallas y reinicios por energía conservan así su reloj de origen. El marcador del RESET y la reanudación al reiniciar en pausa llevan el tramo anterior; los hechos posteriores y el cierre usan el nuevo. El lector usa `ev.tramo` para ocurrencias, marcas y cierres, sin quitar la comprobación de tiempos imposibles.

Se repitió **sin modificar** [la reproducción de Codex](reproducir-reg004-reset-worker-2026-10-21.cjs), con el núcleo y el controlador reales y entrega del Worker controlada:

| Secuencia acordada | Observado |
|---|---|
| Foto de 20 ms antes del RESET; cierre nuevo a 10 ms | Fallas en tramo 0; cierre en 1. Coherente, sin avisos. |
| Foto de 20 ms retenida hasta después del RESET; cierre nuevo a 10 ms | **Corregido:** fallas en tramo 0; cierre en 1. Coherente, sin avisos. |
| Misma foto pendiente; cierre nuevo a 40 ms | Coherente, sin avisos; se conserva la atribución 0/1. |

**3/3; las seis salidas CLI, texto y JSON, terminan con 0; cero errores de esquema.** El caso central que antes fallaba ya no produce «falla después del tiempo simulado de su cierre». Conserva las dos fallas y el cierre, sin esconder hechos. [Eventos, estados y salidas CLI](reg004-cla21003-reset-worker-2026-10-21.json), [log](reg004-cla21003-reset-worker-2026-10-21.log).

También se ejecutaron e inspeccionaron los controles entregados:

- `probar:fotos`: los dos órdenes de la foto previa conservan **fallas y reinicio por energía en tramo 0**, RESET en 0 y hechos nuevos/cierre en 1. Todos los eventos emitidos llevan un tramo entero. La suite pasa **33/33**.
- `test:historia`: los **siete casos de 03c** pasan: tres variantes originales, reinicio por energía de una foto previa, RESET en pausa y los dos tiempos imposibles genuinos del tramo nuevo. **Falla o pausa a 20 ms del tramo 1 frente a cierre a 10 ms del tramo 1 siguen siendo contradicción y no acreditan corrección.**
- Los casos existentes de **03a/03b** y de **corrida anterior sin cierre** pasan. Se conservan todas las ocurrencias y cierres, el fin de sesión limita la comparación y la corrida nunca cerrada no acredita el orden.
- Las dos ampliaciones anteriores pasan **18/18 y 26/26**; las **53 comprobaciones históricas** conservan su resultado con las adaptaciones ya acordadas: igualdad exacta del C++ y control de cierre repetido con tiempos idénticos. Solo se adaptaron copias en memoria; no se editaron instrumentos ni evidencias históricas.

No se diseñaron secuencias adversas nuevas ni se repitió E1/E2 como una auditoría integral. El [orquestador](auditar-reg004-cla21003-2026-10-21.py) conserva las ejecuciones y desvía las escrituras de los instrumentos a nombres nuevos.

## Contrato e integración

`tramo` es **opcional, entero y no negativo**, aditivo del contrato 1 según la decisión de Efraín registrada en CLA-002. Se verificaron CONTRATO 6.1 e historial, esquema, COMO-FUNCIONA 68, las dos bitácoras y «Proyecto hermano» de TecnoBloques. El registrador copia el sobre con `...ev` y conserva el campo; Electron integra el paquete local nuevo y el lector consume sus registros.

Quitar únicamente la línea de la propiedad nueva del esquema reproduce exactamente el SHA256 anterior `8f18ef5ce96cea63ee9d509b4720bbb54e96857f7091adf1c8ede22a46e7fccc`: no hay otro cambio de validación desde CLA-21001. [Contraste](reg004-cla21003-contrato-cambio-2026-10-21.json). La prueba del contrato acepta `tramo:1` y rechaza −1 y 0,5; también pasan los eventos históricos que no llevan el campo.

**Límite conservado y documentado:** los JSONL anteriores sin `tramo` siguen usando el orden de escritura; no recuperan una identidad temporal que nunca registraron y pueden conservar el falso positivo de la foto previa tardía. No se declara corregido retroactivamente ese conjunto de datos. Se mantiene además el límite del cierre sin confirmación del Worker en 500 ms ya documentado; la reproducción de 03c confirma el cierre y no depende de ese timeout.

## Pruebas nuevas de esta verificación

| Comando/comprobación | Resultado |
|---|---|
| `npm.cmd --prefix prototipo run probar:fotos` | **33 OK**, exit 0. |
| `npm.cmd --prefix prototipo run probar:contrato` | **182 OK**, exit 0. |
| `npm.cmd --prefix ../TecnoBloques run test:historia` | **142 OK**, exit 0. |
| `npm.cmd --prefix ../TecnoBloques run test:registro-app` | **88 OK**, exit 0; 11 sesiones sintéticas leídas sin avisos; consola sin errores. RESET real a **1507 ms** y cierre a **200 ms**. |
| `npm.cmd --prefix ../TecnoBloques run test:registro` | **142 OK**, exit 0. |
| `npm.cmd --prefix ../TecnoBloques run test:simulador` | **53 OK**, exit 0; errores de JavaScript comprobados, no solo el código de salida. |
| `python -I prototipo/pruebas/probar_registro.py …` | Chromium: **18 OK**, exit 0, consola sin errores. |
| `python -I prototipo/pruebas/probar_simulacion.py …` | Primera ejecución **19 OK y un fallo de parpadeo**; repetición sin cambios: **20 OK**, exit 0. Detalle abajo. |
| `python -I prototipo/pruebas/probar_servo.py …` | Chromium: **19 OK**, exit 0, consola sin errores. |
| Reproducción original y controles de 03c | **3/3**, seis CLI 0; datos válidos por esquema. |
| Integridad anterior e historia | **18/18 + 26/26 + 53** comprobaciones históricas conformes. |
| Fuentes/documentos y piloto | Diff de fuentes limpio; tablero regenerado y comprobador sin errores. Los dos generados mantienen espacios finales presentes en HEAD. |

Los logs nuevos llevan el prefijo `reg004-cla21003-`. Los comandos completos, rutas y códigos de salida están en cada log. [Resultados de Chromium](reg004-cla21003-chromium-2026-10-21.json). Capturas y datos de esos recorridos son sintéticos y se guardaron en Temp. Se ejecutaron en secuencia las suites que comparten artefactos; los diagnósticos Node de lectura usaron salidas separadas. Antes de las mediciones de Chromium se confirmó **`PowerOnline=True`**, sin otras suites en ejecución.

**Repetición de simulación:** la primera ejecución midió el parpadeo cableado a D8 en **265 ms** frente a los **200 ms** del programa y falló su tolerancia. El reloj general sí pasó, con 3197 ms simulados/3201 ms reales; contrato/eventos y consola también pasaron. Se repitió exclusivamente el mismo recorrido, sin cambios de código, configuración o umbrales, y sus 20 comprobaciones pasaron. Se conservan [el fallo inicial](reg004-cla21003-chromium-simulacion-2026-10-21.log) y [el reintento](reg004-cla21003-chromium-simulacion-reintento-2026-10-21.log). No se presenta como aprobación a la primera ni garantía general de rendimiento.

**Diff:** el chequeo completo sale 2 por espacios finales en `prototipo/dist/tecnocircuito.js:1–2` y `prototipo/dist/prototipo.html:146–147`. Se comprobó que HEAD tiene los mismos dos espacios al final de esas mismas líneas. El chequeo que excluye únicamente esos dos generados sale 0; no se modificaron para silenciarlo. No es un fallo funcional ni se oculta como diff completo limpio.

## Cierre y límites

**REG-004 queda `verificado`, revisor Codex, reservas liberadas**, con esta versión sin commit identificada por hashes y con la aceptación humana final del 20 oct conservada. No hubo nueva aceptación humana del revisor. No aparecen fallos pendientes de 03c en los casos y controles acordados; las regresiones ejecutadas sostienen lo ya verificado.

Siguiente: Claude conserva la documentación de Codex y gestiona commit/push de los tres repositorios conforme a la autorización de Efraín; Codex no los ejecuta. AUD-07/08 siguen pendientes y REG-005 no se inicia por este cierre. Los pendientes físicos de LAB-001/LAB-002 y los límites de distribución no cambian.

Sin suite global nueva de TecnoCircuito, KiCad, instalador, publicación, hardware ni aula. No se investigaron otros casos por pedido de Efraín. Documentos e instrumentos propios revisados por su autor, sin atribuir una segunda revisión independiente. El visto bueno acredita el alcance y las ejecuciones descritas.
