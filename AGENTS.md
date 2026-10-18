# AGENTS.md — TecnoCircuito

Instrucciones para Codex y los agentes que lean este archivo. **Encargo permanente de Efraín (17 oct): Codex audita y supervisa TecnoCircuito, incluido su contrato e integración con TecnoBloques.** **Roles permanentes (Efraín, 18 oct): Claude es el único implementador y programador**, también de Nano + expansión E/S; Codex audita, supervisa y verifica, sin implementar código de producto. La asignación de Nano a Codex (después del cierre de R6) fue una prueba y se conserva en la historia. Responde en español, tutéalo y comunica resultados con evidencia.

## Inicio de sesión y coordinación obligatoria

Por pedido de Efraín (17 oct), el piloto rige para **todo TecnoCircuito y TecnoBloques**. Al iniciar lee [TecnoSuite/PROCESO.md](../TecnoSuite/PROCESO.md), [tablero](../TecnoSuite/TABLERO.md), ficha activa, estado técnico de CLAUDE.md y entradas nuevas de [Codex para Claude](../TecnoSuite/canales/CODEX-A-CLAUDE.md) y [Claude para Codex](../TecnoSuite/canales/CLAUDE-A-CODEX.md). Comprueba Git, trabajo existente, rol, tarea, responsable y reservas antes de editar. Acusa recibo solo por ti mismo.

**Ambos agentes deben advertirle a Efraín si falta un paso necesario**, con evidencia, consecuencia y solución. Completa lo autorizado y continúa lo independiente; respeta excepciones expresas sin pedir permisos repetidos. Codex mantiene auditoría y supervisión; Claude es el único implementador. Codex lleva el [registro e investigación del piloto](../TecnoSuite/INVESTIGACION.md). El estado operativo solo se edita en fichas; el tablero es generado. Los mensajes .md no ejecutan al otro agente.

El [contrato local anterior](docs/CONTRATO-COORDINACION-AGENTES.md) remite al acuerdo común v2. Los documentos nuevos siguen sin commit: un worktree/clon debe recibir las instrucciones mediante copia controlada o commit autorizado antes de trabajar; no vienen de HEAD por sí solos.

## Contexto y fuentes

TecnoCircuito es el simulador de Arduino de TecnoBloques para aprendices de la TecnoAcademia Tolima (SENA). En 2026 el alcance es T1 (LED/botón), T2 (potenciómetro/PWM) y T3 (servo, shield L293D, motor TT, LiPo y probador). La API pública admite **Uno R3, Nano clásico y Nano antiguo**; aceptar otra placa en un esquema o fixture no significa soportarla en la interfaz. Nano + expansión conserva validación física pendiente.

- [CLAUDE.md](CLAUDE.md): estado del proyecto, decisiones y siguientes prácticas. Lee su estado al empezar; consulta el resto según la tarea.
- [CONTRATO.md](CONTRATO.md) y [esquema](contrato/circuito.schema.json): fuente única del intercambio con TecnoBloques.
- [BITACORA.md](BITACORA.md): historia compartida; añade entradas, nunca reescribas las anteriores.
- [COMO-FUNCIONA.md](prototipo/COMO-FUNCIONA.md): explicaciones técnicas numeradas; consulta las secciones relacionadas.
- [LEEME.md](prototipo/LEEME.md): uso y prácticas de laboratorio.
- [validacion/](validacion/): mediciones registradas por Efraín; distingue dato medido, ajuste y supuesto.
- [Revisión inicial de Codex](docs/REVISION-CODEX-2026-10-11.md): resultados, limitaciones y hallazgos abiertos R1–R8. Es un informe fechado, no una lista automáticamente resuelta por cambios posteriores.
- [Primer seguimiento de las correcciones](docs/VERIFICACION-CODEX-R1-R8-2026-10-11.md): evidencia histórica de R1–R5, R7 y R8 verificados y del pendiente que entonces tenía R6. Su estado posterior está en el cierre enlazado a continuación.
- [Cierre posterior de R6](docs/CIERRE-R6-CODEX-2026-10-11.md): verificado por Codex tras las correcciones `7424f8a`; **R1–R8 cerrados** en el alcance de la revisión original. Se distinguen 11/12 comparaciones estrictas y 12/12 con el margen instrumental acordado. Los pendientes físicos siguen en los registros y CLAUDE.md.
- [Primer ciclo de auditoría permanente](docs/AUDITORIA-CODEX-2026-10-17.md): alcance, evidencia y nuevos hallazgos AUD-01–AUD-05; sus cierres requieren comprobación posterior.

No mantengas una segunda copia extensa del estado en este archivo. Actualízalo cuando cambien las reglas de trabajo; los hitos van en la bitácora, el estado técnico en CLAUDE.md y el estado de tareas en las fichas de TecnoSuite.

## Nano con expansión E/S (contexto técnico)

Efraín pidió un conjunto visual Nano clásico + expansión E/S, con variantes **roja y azul**. Referencias locales: `prototipo/Imagenes_módulos/Nano1.avif` a `Nano8.avif` (incluye `nano2`, `nano3` y `Nano5.png`). Codex leyó las ocho: Nano4 es la comparación más detallada; Nano5 es un icono, no una fotografía de la placa. Las fotos anuncian funciones similares pero muestran diferencias de conectores y disposición: confirma cada mapa eléctrico, reguladores y alimentación. Las medidas anunciadas de la roja son 58 × 54 mm; comprobar en hardware antes de fijar geometría. Dibuja SVG originales, sin incorporar estas imágenes comerciales al repositorio público.

**Exportación a KiCad decidida por Efraín:** del conjunto deben salir la huella del **Nano como módulo montable**, los componentes adicionales de la expansión que regulan/filtran las salidas **5V y 3,3V**, la **entrada del jack** y los conectores adicionales de comunicación **I2C y SPI**, con sus redes. Representa el Nano por su huella y pines de módulo, conservando dentro de él su electrónica. La exportación del conjunto se limita a esos elementos; el resto del circuito conserva su exportación normal. KiCad 10.0.3 instalado trae `Module:Arduino_Nano`; verifica pads, orientación y montaje frente a la pieza real. La selección de reguladores, condensadores, protecciones, puentes, jack y su polaridad depende de la evidencia de cada variante.

La implementación de software y sus supuestos están en [IMPLEMENTACION-NANO-2026-10-11.md](docs/IMPLEMENTACION-NANO-2026-10-11.md); el estado y pruebas finales, en CLAUDE.md y BITACORA.md. Mantén separados apariencia, único ATmega328P y alimentación de expansión. No declares físicamente validada ninguna variante sin continuidad, identificación y mediciones de la tarjeta real. KiCad exporta un diseño de referencia explícito, no una reconstrucción acreditada de las fotos.

**Corrección posterior de Efraín:** I2C está junto a UART, al final del Nano; el bloque de seis contactos es dos GND, dos 3V3 y dos 5V, **no SPI**. La vista tiene 82 contactos físicos. Los seis nombres `SPI_*` del primer modelo son aliases heredados para conservar redes/cables anteriores sobre los pines del Nano. El header SPI exportado a KiCad es un conector adicional del diseño de referencia, sin corresponder al bloque de alimentación real. La identificación verbal no es una medición de continuidad.

**Vistas medidas (14 oct, Claude, autorizado por Efraín):** el Nano, la expansión roja/azul y el Uno usan los dibujos de TecnoDiseñador (`npm run vistas`; COMO-FUNCIONA, sección 62). Marco común Nano 60 × 53,5 mm, con el Nano encima de la expansión, sin ventana. La medición corrigió el bloque de seis: **tres 3V3 y tres GND, sin 5V**. Son `OUT_3V3`/`_2`/`_3` y `GND_OUT`/`_2`/`_3`; `OUT_5V`/`OUT_5V_2` quedan como aliases del 5V del Nano, igual que `SPI_*`. La roja y la azul tienen la misma geometría. En KiCad, `GND2`/`RESET2` son ahora los pads 4/3, como en el lienzo. Sigue pendiente la validación física.

## Auditoría y supervisión permanente

- Efraín autorizó el seguimiento continuo entre sesiones el 17 de octubre de 2026. Incorpora la revisión del estado, los cambios y los pendientes al trabajo de cada sesión y entrega, según su alcance.
- Metodología acordada con Efraín el 17 oct: [METODOLOGIA-AUDITORIA-SUPERVISION.md](docs/METODOLOGIA-AUDITORIA-SUPERVISION.md). Distingue evidencia de software, integración, hardware y uso; cada auditoría acredita únicamente sus comprobaciones ejecutadas.
- Conserva las asignaciones de implementación. El encargo de auditoría no autoriza por sí solo correcciones funcionales fuera de lo asignado, cambios de contrato ni publicación.
- Registra los hallazgos y sus cierres con evidencia; no conviertas resultados históricos, pruebas omitidas o declaraciones del implementador en verificaciones nuevas. Si Codex revisa su propia implementación, indícalo.
- El encargo persiste en estas instrucciones; no implica que haya ejecuciones automáticas configuradas fuera de las sesiones. El estado técnico sigue en CLAUDE.md, las tareas en TecnoSuite y los hitos en BITACORA.md.

## Rol de revisor

1. Comprueba primero `git status --short` y la revisión de código. Respeta cualquier trabajo existente.
2. Revisa la implementación, el contrato, los ejemplos y las pruebas relacionadas. Busca casos fuera de los supuestos de la suite.
3. Ejecuta las comprobaciones pertinentes y deja reproducciones mínimas para los defectos. Un diagnóstico que reproduce un error no es una prueba de regresión aprobada.
4. Entrega hallazgos por gravedad con archivo, condición, resultado observado, impacto y comprobación que debe añadirse. Separa fallos del código, límites de la prueba y validaciones físicas pendientes.
5. En el rol de revisor, escribe informes, instrucciones y reproducciones; deja las correcciones funcionales a Claude, el único implementador.
6. No declares resuelto un hallazgo solo porque el implementador lo diga: revisa el diff y verifica el caso original, la regresión y los sistemas afectados.

## Trabajo conjunto con Claude

- Efraín decide prioridades. Claude implementa todo, incluida la familia Nano + expansión; Codex revisa y verifica. Estos roles son permanentes (18 oct).
- El traspaso de cada tarea incluye: objetivo o ID del hallazgo, revisión de Git, archivos cambiados, comandos y resultados, limitaciones y siguiente responsable.
- Registra cada hito con fecha y autor en BITACORA.md. Conserva el informe original; el cierre posterior cita su ID y la evidencia nueva.
- Antes de editar, comprueba que el archivo no haya cambiado durante la revisión. Evita que los dos agentes modifiquen simultáneamente el mismo archivo; para tareas simultáneas que lo requieran, acuerda ramas o worktrees separados.
- Compartir archivos no envía automáticamente mensajes ni ejecuta al otro agente. Codex puede repartir subtareas de auditoría o investigación entre sus subagentes, nunca de implementación. No atribuyas a Claude acciones que no hayas observado.
- Si cambia el contrato, actualiza su documentación y deja constancia en ambas bitácoras y en «Proyecto hermano» de TecnoBloques, según el alcance autorizado.

## Arquitectura que hay que preservar

El código vive en `prototipo/src/`. `motor/` resuelve MNA; `chip.js` ejecuta avr8js; `nucleo.js`, `energia.js` y `potencia.js` conectan reloj, entradas y consumo. `trabajador.js` ejecuta el núcleo en un Worker. `simulador.js` y `lienzo.js` llevan la interfaz; `biblioteca.js` contiene las fichas; `kicad.js` exporta la netlist. `piezas/shield_l293d.js` concentra las conexiones de la shield.

- Mantén el núcleo independiente del DOM y el paquete como un IIFE único con Worker embebido, sin Node ni acceso a internet en ejecución.
- Conserva las no idealidades configurables y el contrato 1 mientras no se acuerde un cambio.
- Los modelos temporales deben avanzar por tiempo simulado: comprueba pasos completos, parciales y placa apagada. Los nodos equivalentes deben dar el mismo resultado aunque la conexión llegue por una shield o la protoboard.
- Toda pieza tiene vista, modelo eléctrico, modelo lógico y ficha; sigue [RECETA-COMPONENTE-NUEVO.md](prototipo/RECETA-COMPONENTE-NUEVO.md).
- Interfaz en español: explica qué pasó y cómo corregir el montaje, con textos comprensibles para adolescentes.

## Comandos de comprobación — Windows / PowerShell

Desde la raíz, con las dependencias y herramientas ya instaladas:

```powershell
npm.cmd run construir
npm.cmd run probar
npm.cmd --prefix prototipo run probar:motor
npm.cmd --prefix prototipo run probar:nucleo
npm.cmd --prefix prototipo run probar:nano
npm.cmd --prefix prototipo run probar:kicad
npm.cmd --prefix prototipo run probar:contrato
npm.cmd --prefix prototipo run probar:fixtures
node docs/revision-2026-10-11.cjs
node docs/verificar-correcciones-2026-10-11.cjs
node docs/verificar-cierre-r6-2026-10-11.cjs
```

La suite completa construye el paquete y ejecuta Node, 13 recorridos de Chromium/Playwright y KiCad para Uno/Nano. Necesita Python con Playwright y Chromium instalados; KiCad debe ejecutar su prueba, no quedar omitido. El diagnóstico de revisión necesita los `.cjs` generados por la suite y describe seis casos de R1–R6.

El diagnóstico inicial conserva notas históricas del defecto: para comprobar el código corregido usa `verificar-correcciones-2026-10-11.cjs` (aserciones y observación del criterio nuevo). `python -I docs/verificar-r8-2026-10-11.py` verifica los dos scripts originales del hermano con ejecución normal y errores JS/archivo inyectados en memoria; necesita su HTML construido, deja logs temporales y no cambia sus fuentes.

Para integración, si existe el repositorio hermano y la tarea lo incluye:

```powershell
npm.cmd --prefix ../TecnoBloques run test:simulador
npm.cmd --prefix ../TecnoBloques run test:graficador
npm.cmd --prefix ../TecnoBloques test
```

`test:simulador` construye TecnoBloques con la copia local, abre Electron y compila programas con Arduino CLI. Las pruebas escriben capturas y salidas temporales. Examina también sus errores registrados: el código de salida por sí solo no basta (R8).

`compilar` regenera HEX; `fixtures` copia datos del hermano. No los uses como comprobaciones de solo lectura: revisa los cambios o compila en salidas aisladas. Prueba con cargador cuando evalúes velocidad; declara las condiciones y no relajes umbrales para obtener un resultado favorable.

## Validación, privacidad y entrega

- Una suite aprobada demuestra comportamiento del software, no valida hardware. Nada llega al aula sin la prueba física correspondiente.
- Criterios existentes: ±5 % en voltaje, ±10 % en corriente, ±1 % en tiempos y serial idéntico. El error relativo usa la **medida como denominador**; informa por separado cumplimiento estricto y cumplimiento con U bajo la regla acordada (`diferencia ≤ tolerancia × |medida| + U`). Para el UT33B+ en la escala adoptada de 20 V, U = 0,5 % de lectura + 2 × 0,01 V. Explicita resolución, escala y límites de la evidencia; un parámetro ajustado o típico no es una medición directa.
- La evidencia del LED rojo no valida todos los colores; el reposo de SG90 medido como menos de 10 mA no acredita 6 mA exactos. Shield, motor, LiPo, probador y MG90S mantienen pendientes físicos según el informe.
- No pases contenido de `investigacion/`, datos de aprendices, registros ni tablas de alias a archivos públicos. Las imágenes de terceros son referencias locales excluidas de Git.
- Código propio Apache-2.0; avr8js y Wokwi MIT, con sus avisos. No copies código GPL ni material incompatible; conserva SPDX y NOTICE.
- Verifica el diff y las comprobaciones apropiadas antes de entregar. Indica lo que no pudiste probar y actualiza la documentación de estado cuando corresponda.
- Commit y push requieren el sí explícito de Efraín, según CLAUDE.md. No crees etiquetas ni publiques como parte de una revisión. `dist/tecnocircuito.js` de la raíz se versiona únicamente al preparar una etiqueta; el build de desarrollo usa `0.1.0-dev`.
- `npm.cmd run preparar-version` reconstruye y copia archivos aunque luego rechace un árbol sucio: no es una comprobación sin cambios. Antes de una entrega etiquetada revisa el paquete completo, incluida su entrada `dist/tecnocircuito.js`.
