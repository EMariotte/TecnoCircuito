# REG-004 · CLA-20261019-007: R1a/R1b verificados; residual R1c

19 oct 2026 · Codex (Sol). **R1a y R1b corregidos y verificados; R2 original conserva su verificación.** REG-004 vuelve a pendiente por **R1c, gravedad media**: dos cierres contradictorios de la misma corrida pueden borrar una falla ya informada por el primero. La aceptación humana de Efraín continúa pendiente.

## R1c · El último cierre sustituye hechos ya recibidos

**Archivo:** `TecnoBloques/herramientas/historia-registro.js:175` y `:227`: tanto las corridas sin inicio conocido como las propias conservan un único `cierre`, que cada `simulacion_detenida` sustituye. `hechos()` (`:83`) solo puede unir las fallas de ese último cierre con las individuales; no conserva las de los cierres anteriores. En corridas propias, `pasoCierre` también se reemplaza y el primer marcador de cierre desaparece al filtrar los pasos vacíos (`:231`, `:279`).

**Condición:** la falla tiene como única evidencia un cierre recibido; no llegó su evento individual. El lector ya admite cierres incoherentes y declara conservar sus hechos, por lo que esta situación se comprueba como registro parcial/inconsistente, no como salida esperada del emisor actual.

**Secuencia:** inicio de sesión → inicio de corrida 1 → cierre con `led_quemado` → segundo cierre de corrida 1 con `fallas: []` → fin de sesión. Cada línea cumple el esquema; el doble cierre se introduce intencionadamente para comprobar el lector de integridad.

**Observado:** el primer cierre y su falla desaparecen de los hechos y del texto. El resultado tiene `fallas: []`, `completa: true`, **`coherente: true`**, y el resumen afirma **«Fallas vistas: ninguna. Corregidas al final: ninguna. Sin corregir: ninguna.»** Sí avisa que la corrida tuvo eventos después de cerrar y que se cerró dos veces, pero esos avisos no acreditan la negación de la falla recibida ni la coherencia de dos cierres distintos.

**Variante sin inicio conocido:** sesión → cierre de corrida 1 con LED quemado → otro cierre vacío de corrida 1 → fin. `h.sinAtribuir` queda vacío y el resumen dice «0 corrida(s). Fallas vistas: ninguna». Solo permanece el aviso de inicio ausente. También se pierde la evidencia que R1b pretende conservar sin atribuir.

**Controles:** una corrida coherente conserva el LED sin avisos; el mismo primer cierre con LED, sin evento individual y **sin añadir el segundo cierre**, conserva la falla y declara incertidumbre. Añadir el cierre vacío es lo que borra ese hecho. No se objeta el aviso correcto de incoherencia ni se atribuye el problema al escritor actual de eventos.

**Impacto:** un lector destinado a narrar y advertir registros incompletos/inconsistentes pierde una falla que sí recibió y presenta ausencia de fallas. Reproduce la clase de pérdida de hechos de R1, ahora a través de cierres repetidos.

**Corrección/comprobación requerida a Claude:** conservar la evidencia de todos los cierres recibidos, o un equivalente que mantenga sus hechos y procedencia, tanto en corridas propias como sin atribuir. Un cierre posterior contradictorio no debe borrar fallas ni permitir una conclusión definitiva de ausencia/coherencia. Avisar la contradicción con el grado de atribución correspondiente. Añadir las dos regresiones y controles de cierre único; revisar también cierres repetidos idénticos sin perder hechos ni romper las comparaciones válidas. No se prescribe implementación de producto por Codex.

## Lo verificado de CLA-007

- **R1a:** el texto de los cierres y `corrigio`/`siguen`/`nuevas` se consolidan al final. La falla tardía de la segunda corrida ya no figura como corregida; una falla tardía de la anterior impide una comparación no acreditada. El control de dos corridas coherentes conserva su corrección válida.
- **R1b:** la falla sin inicio del caso original se conserva en `sinAtribuir` y en el resumen con su número; no pasa a una falla acreditada del montaje. La suite comprueba también un cierre sin inicio y la combinación con una corrida propia.
- Los **cinco casos iniciales** y los **tres de la revisión CLA-006** pasan sus criterios anteriores, con cero residuales. Sus fuentes y evidencias históricas se conservan intactas; se ejecutan copias en memoria cambiando solo el destino de salida.

## Comprobaciones ejecutadas

| Comando | Resultado |
|---|---|
| `npm.cmd --prefix ../TecnoBloques run test:historia` | **29 OK, exit 0**. [Log](reg004-cla007-historia-2026-10-19.log). |
| `node docs/verificar-reg004-cla007-2026-10-19.cjs original` | **Exit 0**, cinco casos, cero criterios residuales. [Evidencia](reg004-cla007-original-2026-10-19.json), [log](reg004-cla007-original-2026-10-19.log). |
| `node docs/verificar-reg004-cla007-2026-10-19.cjs residuales` | **Exit 0**, tres casos de CLA-006, cero residuales R1a/R1b. [Evidencia](reg004-cla007-residuales-2026-10-19.json), [log](reg004-cla007-residuales-2026-10-19.log). |
| `node docs/verificar-reg004-cla007-2026-10-19.cjs cierres` | **Exit 1**, dos controles aprobados y dos manifestaciones de R1c reproducidas. Cero errores de esquema en las líneas de los cuatro casos. [Evidencia completa](reg004-cla007-cierres-2026-10-19.json), [log](reg004-cla007-cierres-2026-10-19.log). Es diagnóstico de defecto, no regresión aprobada. |
| `npm.cmd run test:registro-app` en TB | **86/86, exit 0**, paquete local, consola sin errores; 11 sesiones sintéticas generadas por la app real en Electron leídas sin avisos. [Log](reg004-cla007-registro-app-2026-10-19.log). Esos registros completos no contienen cierres contradictorios de la misma corrida. |

[Instrumento de CLA-007](verificar-reg004-cla007-2026-10-19.cjs). El caso de cierre se amplió con el control que omite el evento individual para aislar la condición; su repetición responde a esa adición al instrumento, sin modificar producto ni repetir hasta aprobar.

## Identidad y límites

TC main `f8f062e`; TB main `deaf16c`; TS main `9ab3c86`, con las entregas y documentos sin commit registrados y preservados. [Manifiesto](reg004-cla007-version-2026-10-19.json), HEAD completos/ramas/estado y SHA256 antes/después.

- Lector: `cbdefdcce84ca07fc1a5b83191f7bc718b721bd05b88a8f68444149fb5fda532`.
- Prueba de historia: `69747b22f9c66bd3c634561b0aba12e6ed38266a345bca56d138a39a9cfa367b`.

Se revisaron fuente completa, pruebas y documentación afectadas. Archivos nuevos sin seguimiento: no se inventa un diff Git con una versión no versionada. La copia de CLA-007 que Claude comunica conservar en su scratchpad no se inspeccionó aquí; no se atribuye una discriminación anterior/actual no ejecutada.

**No ejecutado / pendiente externo:** prueba humana de Efraín, instalador, aula, hardware, suite general TB, suite completa TC/KiCad y benchmark. AUD-01–06 conservan sus cierres; R1c pertenece al lector nuevo. No se cambian contrato, producto ni memorias de Claude. Siguiente: Claude toma/reserva R1c y entrega corrección/regresiones; Codex verifica. Informe e instrumento propios revisados por su autor, sin segunda revisión independiente. Sin commit, push, etiqueta o publicación por Codex.
