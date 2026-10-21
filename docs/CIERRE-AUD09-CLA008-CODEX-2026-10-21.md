# AUD-09 · cierre verificado de CLA-20261021-008

21 de octubre de 2026 · Codex (Sol). **AUD-09-R1 corregido y verificado. Se cierra AUD-09.** Con los seis cierres de CLA-007 y el original de AUD-08 conservados, quedan verificadas las ocho familias F01–F08 de la auditoría profunda, en su alcance de software. Hay visto bueno técnico del lote auditado; REG-005 y los riesgos/límites de entrega, hardware y uso siguen separados.

## Versión comprobada

Working trees `main`, entrega sin commit: TC `08947503c4ea9c02e4e7def4fb59a7daa1ae6f0d`, TB `720b908faa07023ec0129040e2e37eef4ef4066a`, TS `f6ccd45c0a437884c3c59aec91e83800cf71d96f`. Entrega leída: [CLA-20261021-008](../../TecnoSuite/canales/CLAUDE-A-CODEX.md), en respuesta a COD-20261021-004.

| Archivo | SHA256 |
|---|---|
| TB `herramientas/historia-registro.js` | `aa0237d770f07bf6a119c824f776ac967fe1bd116bb48b037a1e2dd7dad7d2ff` |
| TB `test/historia-registro.js` | `ff1aca3775d7b64c97f30cd781c7f73ad5a745e17870d4a27eef34c768ad73a8` |
| TC `prototipo/COMO-FUNCIONA.md` | `367e67d2e1cdfedca8ac4b8f17f3f892f8a7a3bc6641ef940657c16b6951adc3` |
| TB escritor, sin cambios desde CLA-007 | `2c59fbbd98c6ab656be01819bdf60f83d17b1761e0d42698b9467791715084ea` |

[Manifiesto inicial](cla008-aud09-version-inicio-2026-10-21.json), [final](cla008-aud09-version-final-2026-10-21.json) y [diff específico respecto de CLA-007](cla008-aud09-delta-cla007-2026-10-21.log). Para obtener ese diff se reconstruyeron en memoria las dos fuentes anteriores usando HEAD y el diff conservado; su SHA256 coincidió con el manifiesto de CLA-007 antes de compararlas con las actuales. No se aplicó un parche al producto.

El delta funcional se limita al lector y su prueba; COMO-FUNCIONA 69 describe la validación estructural. Escritor, interfaz, IPC, emisor, contrato y esquema no cambiaron respecto de lo comprobado en la verificación anterior. Las memorias de Claude se leen y se preservan, sin editarlas.

## Caso original y aceptación

El [residual devuelto](VERIFICACION-CLA007-AUD07-AUD09-AUD14-CODEX-2026-10-21.md) aceptaba `pendientes` inválido como si fuera cero: una exportación con un evento realmente en cola pasaba de CLI 1/final incierto a CLI 0/«Corregidas al final: LED quemado» al convertir únicamente `1` a `"1"` en el manifiesto.

**Ahora se valida la estructura antes de admitirla, sin coerción:** `app`, versión, hora, `completa`, total, inventario y `pendientes`; los contadores y tamaños son enteros seguros no negativos. Las exportaciones incompletas requieren sus campos `faltan` y `error`, y una completa no puede llevarlos. Después se mantienen las comprobaciones de inventario, bytes y SHA256. La CLI, los huecos y las limitaciones semánticas del lector usan el resultado de admisión.

| Condición comprobada | Resultado observado |
|---|---|
| `pendientes` ausente, texto, null, negativo, fracción u objeto | Manifiesto no válido, CLI 1; sin comparación ni corrección final acreditada |
| Evento real esperando por ENOSPC, primero con entero 1 y después con texto `"1"` | El entero avisa la evidencia que falta; el texto invalida el manifiesto. Ambos CLI 1; ninguno acredita el final |
| `pendientes: 0`, exportación íntegra | CLI 0 y conserva las conclusiones legítimas |
| `pendientes: 2` | Avisa los eventos pendientes y no asegura el final |
| Otros campos mal formados y combinaciones de `completa`/`faltan`/`error` | Rechazo estructural con CLI 1, sin conclusiones acreditadas |
| Cuatro originales de F01: parcial, hash alterado, segmento omitido y pendientes | Continúan detectados; omitir el segmento que contenía el hueco ya no acredita corrección |
| Copia íntegra, nueve dañadas, crudos y snapshots | Regresiones conservadas; el exportador real y el lector son compatibles |

La prueba antigua que solo cambiaba `completa` a false ahora agrega `faltan`/`error`, para seguir ejercitando el aviso de copia incompleta con una estructura válida. La combinación inválida sin esos campos tiene una regresión propia de rechazo. Se revisó este cambio: no elimina el caso adverso anterior ni lo convierte en aprobado por cambiar el criterio.

## Ejecuciones propias

| Comprobación | Resultado |
|---|---|
| `npm.cmd --prefix ../TecnoBloques run test:historia` | **192 OK**, exit 0; regresiones históricas y de R1 |
| `npm.cmd --prefix ../TecnoBloques run test:registro` | **202 OK**, exit 0; incluye escritura, cola/recuperación y lectura de exportaciones reales |
| Diagnóstico de aceptación de Codex, sin editar | **14/14 conformes**, exit 0; antes reproducía siete variantes de R1 |
| Diagnóstico profundo Node original, sin editar | **23/23 conformes**, exit 0; casos originales, controles e hipótesis excluida identificados en su evidencia |
| Diff, preservación y coordinación | Fuentes/evidencia anterior preservadas por hash; comprobador y `diff --check` en los logs de cierre |

[Resultados de comandos](cla008-aud09-comprobaciones-2026-10-21.json), [aceptación](cla008-aud09-aceptacion-2026-10-21.json), [diagnóstico original](cla008-aud09-profunda-2026-10-21.json). Logs nuevos con prefijo `cla008-aud09-`. Las dos suites se ejecutaron secuencialmente; los instrumentos usan datos sintéticos, carpetas temporales propias e inyecciones restauradas en `finally`. Se inspeccionaron las salidas, no solo el código de salida.

No se repitieron Electron, pruebas generales de la app, integración completa del simulador, preprocesador, esquema, suite global de TecnoCircuito, KiCad ni benchmark: el delta no cambia esos sistemas. Sus resultados de CLA-007 se conservan como evidencia anterior acotada, sin presentarlos como ejecuciones nuevas. La integración nueva pertinente aquí es exportador real → admisión → historia/CLI y está comprobada. Sin nueva prueba de instalador, USB física, hardware, aula o aceptación humana.

## Alcance del cierre y siguiente paso

**No queda un fallo reproducido abierto de F01–F08 en la matriz de esta auditoría.** AUD-09 queda `verificado` y los cierres AUD-07/08/10–14 se conservan; F06 usa el criterio por equipo que sustituyó el aviso hasta cerrar la app, según la decisión registrada en CLA-006/007. Se conserva la aceptación humana previa de REG-004 en su alcance.

Los [once riesgos y límites](VERIFICACION-CLA007-AUD07-AUD09-AUD14-CODEX-2026-10-21.md) no se convierten en resueltos por este cierre: exportación síncrona/volumen, coste previo de IPC, cola volátil, USB real, orden/procedencia, portabilidad, privacidad, retención y atribución mantienen el seguimiento indicado. Este visto bueno de software no acredita distribución o uso en aula.

**Siguiente:** Claude actualiza sus memorias y conserva los informes de Codex; REG-005 sigue pendiente para la revisión/documentación final. Efraín decide la aceptación de entrega y autoriza commit/push por separado; Claude los ejecuta. Codex no hace commit, push, etiquetas ni publicación.

Informe e instrumento de orquestación propios revisados por su autor, sin segunda revisión independiente. No se modificó producto ni PROCESO v3. Continúa SES-20261021-001 con ocho minutos de coordinación declarados, contados una sola vez; incremento de esta verificación pendiente de declaración.
