# Verificación conjunta de CLA-20261021-007

21 de octubre de 2026 · Codex (Sol). Encargo de Efraín: comprobar si se cumplieron todos los aspectos de la [auditoría profunda](AUDITORIA-PROFUNDA-AUD07-AUD08-CODEX-2026-10-21.md).

**Resultado: cumplimiento parcial, sin visto bueno del conjunto.** Los casos originales de las ocho familias dejan de reproducirse. Se verifican siete familias (F02–F08) y seis fichas: AUD-07, AUD-10, AUD-11, AUD-12, AUD-13 y AUD-14. F01/AUD-09 mejora sustancialmente, pero su aceptación no está completa: el manifiesto admite `pendientes` ausente o mal formado y vuelve a acreditar un final que debería quedar incierto. AUD-09 se devuelve por ese residual. AUD-08 conserva su cierre original. Los once riesgos y límites del informe anterior tienen tratamiento separado; no quedaron todos eliminados por este lote.

Esta es una verificación del lote identificado, con pruebas adicionales de sus criterios de aceptación. No se atribuyen a Codex las ejecuciones de Claude ni las conclusiones del otro auditor. No se implementó producto.

## Versión y criterio vigente

Entrega leída: [CLA-20261021-006/007](../../TecnoSuite/canales/CLAUDE-A-CODEX.md). Working trees en `main`, sin commit de la entrega: TC `08947503c4ea9c02e4e7def4fb59a7daa1ae6f0d`, TB `720b908faa07023ec0129040e2e37eef4ef4066a`, TS `f6ccd45c0a437884c3c59aec91e83800cf71d96f`. No se verificó publicación remota.

| Fuente de la entrega | SHA256 |
|---|---|
| TB `escritorio/registro-disco.js` | `2c59fbbd98c6ab656be01819bdf60f83d17b1761e0d42698b9467791715084ea` |
| TB `herramientas/historia-registro.js` | `3eff1e183ab81593e61ff214a3f7181ec47a12075eb07fb194f573204bc47792` |
| TB `src/app.js` | `fbffc6d9e5f0fb065bf342a201e1eec17c5d4e21aadac9e6776185a542d5f658` |
| TB `src/registro.js` | `33073baaafaa38c69cfd7d58817b30de0f2a047f9d5acd76a63a51fa55d38d62` |
| TB `escritorio/main.js` | `aa1a231d96fedb9690a5ba34372bfe84b6e1da6efbbc5288ee6095b22d4921d5` |
| TC `CONTRATO.md` | `ad386b3a8492cfe14ea2b694c5775c640784e96a63e0ea6e1de2dadcf37ca752` |
| TC `contrato/evento.schema.json` | `95be2a402a8477152168ac482fe458141fe6272061468bbe05e78fec05497dc3` |

[Manifiesto inicial](cla007-verificacion-version-inicio-2026-10-21.json) y [final](cla007-verificacion-version-final-2026-10-21.json) identifican archivos, trabajo previo, ramas y artefactos. Los diffs completos se conservan en los logs con prefijo `cla007-verificacion-diff-`. Antes de editar se reservaron únicamente informes en las siete fichas; se respetaron los cambios existentes de Claude y las evidencias anteriores.

**F06 tiene una aceptación sustituida, no una aprobación del requisito antiguo.** Claude registra en CLA-006 una decisión de Efraín: la esquina muestra las pérdidas de la sesión del equipo activo; al cambiar de equipo se limpia, y al apagar el registro se oculta. El panel del instructor conserva el total de la app. Reemplaza «hasta cerrar la app» del informe anterior. Se comprueba el criterio nuevo con un instrumento separado; no se altera el diagnóstico histórico para esconder su resultado.

## Matriz de cumplimiento de los ocho hallazgos

| Hallazgo / ficha | Resultado de la verificación | Evidencia y alcance |
|---|---|---|
| F01 / AUD-09, admisión | **Parcial, devuelto** | Parcial, hash distinto, archivo omitido y pendientes enteros se detectan; copia íntegra y crudos pasan. Se añaden nueve dañadas en la suite de Claude. Persiste la falta de validación estructural de `pendientes`, descrita abajo. |
| F02 / AUD-10, multiplicidad | **Verificado** | Alta–baja–alta idéntica conserva el último estado al combinar snapshots; copias repetidas y orden inverso equivalentes. La implementación comprueba prefijos por sesión/nombre; las copias incompatibles generan aviso e incertidumbre final. Se conservan el orden de días y sesiones distintas de dos PC en las regresiones. |
| F03 / AUD-11, configuración | **Verificado** | Los cuatro originales y doce formas mal formadas quedan ilegibles/CONFIG, sin excepción ni captura en disco. Validador compartido, PIN, bloqueo, creación inicial, respaldo, rollback y marca de recuperación cubiertos por `test:registro`. IPC y cierre protegidos; no se declara prueba de caída previa de Electron. |
| F04 / AUD-12, reloj | **Verificado** | Las tres variantes originales quedan incoherentes/no comparables. Regresiones de RESET inconsistente, cierre de tramo anterior y mezcla de eventos; controles de foto previa, energía, RESET en pausa, 03a/03b y tiempos imposibles conservados. |
| F05 / AUD-07, anotación | **Verificado** | Marcador rechazado por cola de 5000 líneas cuenta sin anotar; saturación por tamaño, pendiente → escrito y apagado con marcador pendiente pasan. `anotados` sube al escribirlo, con aviso de cambio. Se preservan límites Unicode y recuperación AUD-02. |
| F06 / AUD-07, interfaz | **Verificado con criterio A-05** | Panel abierto se actualiza; aviso referido al equipo actual; apagar oculta la esquina y conserva el total en el panel; otra sesión no hereda el aviso. El requisito antiguo de persistencia tras apagar fue sustituido expresamente en la entrega. |
| F07 / AUD-14, origen | **Verificado** | EACCES y EIO sintéticos al listar devuelven disco/origen/código, diferenciados del origen nuevo/vacío. Desaparición/error de copia y tamaño incorrecto quedan incompletos; primera exportación preservada y mensajes de interfaz revisados. No acredita permisos de USB real. |
| F08 / AUD-13, UTF-8 | **Verificado** | Solo se aparta la línea del byte roto; U+FFFD legítimo se conserva. BOM inicial, CRLF y línea multibyte de más de 64 KiB comprobados. El lector separa por LF en bytes antes de decodificar cada línea. |

El diagnóstico original Node pasa **23/23** en esta versión: [salida](cla007-verificacion-diagnostico-original-node-2026-10-21.json). Incluye controles y una hipótesis excluida por no ser entrada JSON del emisor, por lo que no son 23 defectos cerrados. Se inspeccionaron también las conclusiones del caso de archivo intermedio omitido; ya no declara la corrección anterior.

## Residual AUD-09-R1 · gravedad media · `pendientes` inválido equivale a cero

**Archivo:** [TB `herramientas/historia-registro.js:148`](../../TecnoBloques/herramientas/historia-registro.js#L148), función `admitirExportacion`. La lista de archivos sí valida tipos y huellas; para `pendientes` solo se ejecuta `Number.isInteger(m.pendientes) && m.pendientes > 0`. Cualquier otra forma queda sin motivo de rechazo ni limitación. La ausencia del campo no acredita cero.

**Reproducción principal, sin cambiar producto ni JSONL:**

1. Se escriben dos corridas sintéticas comparables, una con LED quemado y otra sin la falla.
2. Se inyecta ENOSPC exclusivamente sobre los append de la carpeta temporal propia. Un evento adicional de la misma sesión queda realmente en cola. Se exportan los archivos disponibles: `completa:true`, `pendientes:1`.
3. Con ese manifiesto original, la CLI sale **1**, informa el evento pendiente y el resumen dice «Corregidas al final: no se puede asegurar».
4. Se cambia exclusivamente el tipo del campo a `"pendientes":"1"`, conservando los registros, tamaños y SHA256. La CLI sale **0**, sin problemas, y el resumen pasa a **«Corregidas al final: LED quemado (led1). Sin corregir: ninguna.»** La cola de origen seguía teniendo un evento, antes de recuperarla al terminar el instrumento.

Se reprodujeron también **seis formas inválidas**: texto `"1"`, ausente, `null`, negativo, fracción y objeto. Todas se admiten limpias en la prueba. Son variantes de una sola omisión; no siete tareas ni siete devoluciones distintas. El escritor normal genera el campo entero; la prueba acredita una debilidad del consumidor ante metadatos dañados o transformados, no que el escritor actual produzca espontáneamente esos tipos. Tampoco se presenta SHA256 como firma contra alguien que pueda reemplazar todo el manifiesto.

**Impacto:** desaparece la incertidumbre de una captura que no está íntegra y se acredita una conclusión final sin cumplir la fase de admisión exigida por F01. La gravedad residual es media por requerir un manifiesto mal formado; los originales de ausencia total de admisión, de mayor alcance, ya están corregidos.

**Propuesta para Claude:** validar el manifiesto de formato 1 como estructura antes de admitirlo. `pendientes` debe estar presente y ser entero seguro no negativo; si falta o es inválido, marcar la exportación no admitida, CLI 1 y ninguna conclusión final/comparación acreditada de sus sesiones. No convertir cadenas ni asumir cero. Revisar en el mismo validador los demás metadatos obligatorios del formato, manteniendo explícito qué campos son informativos/opcionales y el rechazo de formatos desconocidos. Conservar la lectura deliberada de crudos como recorrido separado.

**Aceptación pendiente, conjunta:** las seis formas inválidas y el caso con cola real deben dejar de salir limpios; `pendientes:0` conserva CLI 0 y sus conclusiones cuando lo demás es íntegro; un entero positivo sigue avisando y limita el final. Repetir las cuatro reproducciones originales, nueve exportaciones dañadas, copia íntegra/crudos, snapshots y regresiones históricas del lector. Corregir la redacción de COMO-FUNCIONA si anuncia una validación estructural más amplia que la implementada.

Instrumento: [diagnóstico de aceptación](diagnosticar-cla007-aceptacion-2026-10-21.cjs). Evidencia definitiva: [ejecución integral](cla007-verificacion-aceptacion-integral-2026-10-21.json), **14 escenarios: siete incumplimientos del mismo residual, cinco controles conformes y dos observaciones de frontera sin defecto acreditado**. Exit 1 significa reproducción, no regresión aprobada. Se conserva el ensayo anterior de 13 escenarios; al instrumento solo se añadió la prueba con cola real, sin cambiar producto ni umbrales.

Las dos observaciones son mezclas limitadas al evento de inicio. El lector fija ahí el tramo cero y no lo incluye en las banderas de mezcla de los eventos posteriores. No se demostró una conclusión temporal falsa por esa frontera y no se eleva a defecto. La documentación podría precisar esa excepción.

## Seguimiento de los once riesgos y límites anteriores

| Aspecto anterior | Estado que esta entrega permite afirmar | Mejora o siguiente comprobación |
|---|---|---|
| Exportación síncrona y memoria | **Permanece.** Se leen archivos enteros para calcular hash y el principal copia síncronamente. Sin prueba extrema de volumen. | Copia/hash por bloques fuera de UI, progreso/cancelación y carga representativa antes de ampliar esa garantía. |
| Coste previo de IPC | **Permanece.** El límite se comprueba después de cruzar IPC y serializar; las fronteras UTF-16/UTF-8 pasan. | Presupuesto previo y medición de latencia/memoria con entradas grandes. No confundir frontera admitida con resistencia ilimitada. |
| Cierre con disco averiado | **Permanece.** Cola volátil y último reintento; distinguir pendiente/anotado mejora la información, no la durabilidad. | Decidir almacenamiento alternativo o aviso y criterio de sesión incompleta. No prometer cero pérdidas. |
| Durabilidad física de USB | **Pendiente externo.** Hash/copia lógica comprobados; sin extracción o expulsión física nueva. | Efraín prueba USB real, expulsión segura y readmisión de copia. |
| Hora de marcadores y orden | **Mejora verificada:** marcador conserva `t` válido del perdido y su día, con control de medianoche. **Permanece:** orden por fecha y dependencia del reloj; sin secuencia monotónica nueva. | No extender el arreglo de hora a una garantía universal de causalidad u orden. |
| Procedencia/versiones | **Pendiente de entrega.** Working tree auditado identificado por hashes; manifiesto no identifica de forma suficiente el artefacto productor congelado. | Resolver procedencia y paquete en REG-005/DIST-001, antes del estudio/distribución. |
| Portabilidad del lector | **Permanece.** Depende de Node y del revisor hermano; no se probó instalación aislada. | Empaquetar/versionar analizador y probar sin red con validador completo en destino. |
| PIN y privacidad | **Mejora de configuración verificada; límite permanece.** PIN no cifra JSONL ni elimina datos que se escriban en literales/códigos. Solo datos sintéticos revisados. | Efraín define permisos y manejo de copias; revisión del contenido antes de compartir. |
| Retención/crecimiento | **Pendiente.** Sin cuota/rotación ni umbral preventivo nuevo. | Decisión de retención/archivado y prueba de poco espacio; eliminación solo en alcance autorizado. |
| Atribución de corrección/programa | **Límite permanece.** Se comprueban condiciones registradas; no prueba de aprendizaje, causalidad ni vínculo criptográfico HEX–compilación. | Mantener lenguaje de observación y decidir evidencia adicional si el estudio la exige. |
| 1000 destinos, cuenta volátil, IPC/sobre insuficiente | **Parcialmente tratado:** TOPE explícito, panel por estados y cuenta por sesión. **Límites conservados:** cuenta reiniciada al abrir, falta de sobre y fallo del propio aviso IPC. | Mantenerlos documentados y revisar su consecuencia analítica en REG-005; no presentarlos como pérdidas imposibles. |

No se convierten estas recomendaciones en cambios de alcance o tareas iniciadas automáticamente. La corrección de los hallazgos de software y la aceptación de riesgos para usar el registro son decisiones distintas.

## Pruebas ejecutadas y límites

| Comando / instrumento propio | Resultado |
|---|---|
| `npm.cmd --prefix ../TecnoBloques run test:registro` | **202 OK**, exit 0; incluye controles AUD-02 de recuperación y F05/configuración/exportación |
| `npm.cmd --prefix ../TecnoBloques run test:historia` | **175 OK**, exit 0; casos históricos y lote nuevo |
| `npm.cmd --prefix prototipo run probar:contrato` | **189 OK**, exit 0 |
| `npm.cmd --prefix ../TecnoBloques run test:registro-app` | **105 OK**, exit 0; 11 sesiones sintéticas sin avisos, sección de descartes separada y consola sin errores |
| `npm.cmd --prefix ../TecnoBloques run test:registro-preprocesador` | **74 OK**, exit 0 |
| `npm.cmd --prefix ../TecnoBloques run test:herramientas` | **6 OK**, exit 0; 0/50 aperturas sin PIN permanecen a 800 ms, controles autorizados y sin errores de página |
| `npm.cmd --prefix ../TecnoBloques run test:simulador` | **53 OK**, exit 0, sin errores de JavaScript |
| `npm.cmd --prefix ../TecnoBloques test` | **Exit 0**; inspeccionadas vacías las dos secciones de errores JS de los scripts, aparte de los avisos pedagógicos esperados |
| Diagnóstico original Node, sin editar | **23/23 conformes**, exit 0; ver alcance de controles/exclusión arriba |
| Diagnóstico adicional de aceptación | **7 reproducciones residuales / 14 escenarios**, exit 1, cero errores del instrumento |
| Electron independiente con criterio A-05 | **4/4 conformes**, exit 0 y consola sin errores; capturas inspeccionadas |
| Preservación, diff y coordinación | Fuentes, memorias de Claude y evidencias anteriores preservadas por hash; `diff --check` y comprobador de coordinación en los logs de cierre |

Logs nuevos con prefijo `cla007-verificacion-`. Las suites que comparten artefactos y las que comprueban tiempos se ejecutan secuencialmente. Los diagnósticos Node usan carpetas temporales propias, sin tocar datos reales; sus inyecciones de `fs` se restauran en `finally`. El caso de cola real incluye su control antes/después. Las comprobaciones de admisión no se sustituyen por el exit de una suite nominal.

[Resumen de suites](cla007-verificacion-suites-2026-10-21.json), [Electron independiente](cla007-verificacion-electron-independiente-2026-10-21.json), [instrumento de interfaz](verificar-cla007-electron-2026-10-21.cjs), [panel en vivo](cla007-verificacion-panel-en-vivo-2026-10-21.png) y [panel con registro apagado](cla007-verificacion-panel-apagado-2026-10-21.png). La captura del stdout de Python en el log general tiene sustituciones de algunos acentos por la codificación de consola; los marcadores ASCII de errores y los estados de salida se conservaron. No se atribuye ese problema de captura al lector UTF-8 del producto.

La primera comprobación de coordinación detectó seis referencias al manifiesto final aún no generado. Se conserva su log y se repite después de generar el manifiesto; el resultado de cierre está en `cla007-verificacion-coordinacion-final-2026-10-21.log`. Es un error del orden de generación de la evidencia del revisor, sin cambio de producto ni de los resultados funcionales.

No se ejecutan nueva suite global de TecnoCircuito, KiCad, instalador, benchmark formal, USB física, hardware, aula ni nueva aceptación humana. El lote no modifica modelos eléctricos/pads y no acredita un candidato distribuible. Se conserva la aceptación humana previa de REG-004 en su alcance; las fuentes de Claude no se editan para conseguir resultados favorables.

## Decisión y siguiente paso

Claude corrige **AUD-09-R1** y entrega su validador/regresión contra la matriz indicada. Codex verifica ese residual y las dependencias que cambien. Las seis fichas verificadas conservan este cierre y los hashes; no requieren volver a implementarse. REG-005 sigue pendiente y debe incorporar el seguimiento explícito de riesgos y limitaciones; esta revisión no lo inicia ni lo cierra.

Sin visto bueno del conjunto para la condición que Claude había pedido antes de commit/push; Efraín decide las entregas. Codex no hace commit, push, etiquetas ni publicación. Contrato, esquema, ambas bitácoras y «Proyecto hermano» fueron revisados en el diff. Los comentarios antiguos de `preload.js` todavía resumen el descarte como «quedó anotado» y omiten sus estados nuevos; es una mejora documental para Claude, sin evidencia de un consumidor funcional incorrecto por ese comentario.

Informe e instrumentos propios revisados por su autor, sin segunda revisión independiente. No se editan memorias de Claude, PROCESO v3 ni archivos de aprendices. La sesión conserva los seis minutos declarados de coordinación; incremento de esta verificación pendiente de declaración de Efraín.
