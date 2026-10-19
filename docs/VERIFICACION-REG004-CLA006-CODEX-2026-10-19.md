# REG-004 · CLA-20261019-006 devuelta por dos residuales de R1

19 oct 2026 · Codex (Sol). **R2 verificada en el caso original; R1 corregida en los resúmenes originales, pero aún incompleta.** REG-004 vuelve a pendiente por R1a/R1b, de gravedad media. Los cinco casos anteriores pasan; la ampliación encuentra una comparación contradictoria y una falla observada que desaparece del resumen. La aceptación humana sigue pendiente.

## R1a · La comparación se calcula antes de conocer todos los hechos

**Archivo:** `TecnoBloques/herramientas/historia-registro.js:221–239`, frente a la consolidación final `:249–260`. La entrega recalcula `fallas`, `completa`, `coherente` y el resumen al terminar de leer, pero deja `corrigio`/`siguen`/`nuevas` y el texto del cierre tal como se calcularon al recibir el cierre.

**Secuencia mínima:** corrida 1 con LED quemado y cierre coherente; corrida 2 con cierre vacío; llega después una falla `led_quemado` de la corrida 2; termina la sesión. Las líneas individuales cumplen el esquema; el orden tardío se hace inconsistente intencionadamente para revisar el lector, sin atribuirlo al emisor actual.

**Observado:** al final la corrida 2 tiene `fallas: [led_quemado]`, `coherente: false` y simultáneamente **`corrigio: [led_quemado]`**, `siguen: []`. El texto conserva **«Corrida 2 terminó… Sin fallas. Corrigió: LED quemado (led1)»**. El resumen final sí dice que no se puede asegurar, y R2 sí produce los dos avisos correctos. Esas mejoras no eliminan la afirmación de corrección que persiste en el paso y en los datos exportados por `--json`.

**Control:** la misma secuencia sin la falla tardía tiene dos corridas coherentes, ningún aviso y una corrección válida. Por tanto, no se objeta la comparación correcta ni se propone suprimirla universalmente.

**Impacto:** el lector atribuye una corrección a la misma corrida en la que ya reconoce la falla. Es relevante para reconstruir qué corrigió el equipo entre intentos, no solo para el resumen final.

**Corrección/comprobación requerida a Claude:** calcular o revisar también las comparaciones y sus textos después de consolidar todos los eventos; cuando la evidencia no acredita la corrección, expresarlo sin dejar una afirmación definitiva contradictoria en los pasos o en los datos. Añadir la regresión de dos corridas con la falla tardía en la segunda y mantener el control coherente. Comprobar también que una llegada tardía a la anterior no deje comparaciones posteriores desactualizadas.

## R1b · Una falla sin inicio de corrida sigue desapareciendo del resumen

**Archivo:** `historia-registro.js:94–98`, `:165–168` y `:205–208`. Se avisa que no se conoce el inicio, pero solo se conserva la falla en `fallasVistas` cuando existe `c`. `resumen()` recorre únicamente `h.corridas`.

**Secuencia mínima:** inicio de sesión → evento `falla` de corrida 1, LED quemado → fin de sesión. No hay `simulacion_iniciada`. Las tres líneas cumplen el esquema individual; la falta de inicio representa precisamente la pérdida/atribución que el lector de integridad debe señalar.

**Observado:** los pasos narran «falla: LED quemado (led1)» y hay un aviso de que la corrida no empezó en esa sesión, pero el resumen dice **«0 corrida(s). Fallas vistas: ninguna.»** El hecho recibido desaparece del agregado.

**Impacto:** vuelve a existir contradicción entre pasos y resumen, ahora en un caso vinculado a AUD-04. El aviso de atribución incierta es correcto, pero no convierte la falla recibida en ausencia de fallas.

**Corrección/comprobación requerida:** conservar los eventos de falla sin inicio conocido como hechos recibidos con atribución incompleta/incierta, separados si hace falta de las corridas reconocidas. No acreditarlos sin más al montaje de ese equipo, ni negar su existencia. Añadir esta regresión, comprobar el cierre sin inicio y mantener los controles completos. Claude decide la representación y el texto.

## Evidencia y comprobaciones

- `npm.cmd --prefix ../TecnoBloques run test:historia`: **24 OK, exit 0**; incluye los seis casos nuevos de Claude y el control completo. [Log](reg004-cla006-historia-2026-10-19.log). El mensaje de actualización de npm llegó por stderr y PowerShell lo presentó como `NativeCommandError`; es un aviso de actualización, no una aserción fallida ni una excepción del lector. No se actualizó npm.
- `node docs/verificar-reg004-cla006-2026-10-19.cjs original`: **exit 0**, los cinco casos anteriores pasan y los tres indicadores de defecto son falsos en todos. R2 detecta ahora la falla posterior al cierre y su discrepancia final; R1 conserva las fallas en los resúmenes originales. [Evidencia nueva](reg004-cla006-original-2026-10-19.json), [log](reg004-cla006-original-2026-10-19.log).
- `node docs/verificar-reg004-cla006-2026-10-19.cjs adversos`: **exit 1**, control de dos corridas coherentes aprobado y **dos casos residuales reproducidos**, cero errores de esquema en las líneas de los tres casos. [Eventos/datos/textos](reg004-cla006-adversos-2026-10-19.json), [log](reg004-cla006-adversos-2026-10-19.log). Diagnóstico de defecto, no regresión aprobada.
- `npm.cmd run test:registro-app` en TB: **86/86, exit 0**, con copia local; consola sin errores, 11 sesiones sintéticas generadas por la app real en Electron leídas sin avisos, con ambas fallas en I6/J7/L9. [Log](reg004-cla006-registro-app-2026-10-19.log). Esos registros completos no contienen los dos casos residuales.

El [instrumento de CLA-006](verificar-reg004-cla006-2026-10-19.cjs) ejecuta en memoria el diagnóstico original con su única modificación de destino de salida, y reutiliza sus fixtures para los adversos adicionales. **No reescribe el instrumento ni la evidencia histórica**, que conservan los cuatro fallos sobre el lector anterior. No se afirma haber ejecutado las seis regresiones nuevas de Claude contra una versión anterior que no está guardada como fuente local.

## Identidad, alcance y siguiente paso

TC main `f8f062e`; TB main `deaf16c`; TS main `9ab3c86`, con entregas y documentación sin commit ya existentes, preservadas. [Manifiesto](reg004-cla006-version-2026-10-19.json) con HEAD completos, ramas, estado y SHA256.

- Lector: `5004fd12abeadeaa0361297a03545e6a1136f1309a7e1d10b33476e51b4c2e27`.
- Prueba de historia: `9bb70e043d37f43c063abe9d2fefabe8ba6f5bd380a89623f26c58edf817b315`.

Se revisó la fuente completa de los archivos nuevos aún sin seguimiento, la documentación afectada y su correspondencia con CLA-006; se compara con el informe/manifiesto y reproducciones anteriores, sin inventar un diff Git contra una versión anterior no versionada. Se comprueban de nuevo los SHA256 al terminar, para identificar la misma entrega probada.

**Pendiente externo:** aceptación humana de Efraín de unos 10 minutos. **No ejecutado aquí:** instalador/aula, suite general TB, suite completa TC/KiCad, benchmark ni pruebas físicas. No cambian contrato, emisor, motor o herramientas de desarrollo; AUD-01–06 conservan sus cierres.

Siguiente: Claude toma/reserva R1a/R1b, corrige y añade regresiones; Codex vuelve a verificar. R2 original cerrada con evidencia, sin declarar toda REG-004 verificada. Informe e instrumento propios revisados por su autor, sin segunda revisión independiente. Codex no edita producto ni CLAUDE.md y no hace commit, push, etiquetas o publicación.
