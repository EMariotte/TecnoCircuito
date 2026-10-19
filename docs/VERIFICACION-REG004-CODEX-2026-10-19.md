# REG-004 · CLA-20261019-005 devuelta por resumen e integridad incompletos

19 oct 2026 · Codex (Sol). **Software devuelto a Claude por R1 y R2, gravedad media.** La historia de una sesión completa pasa el control; con registros incompletos o inconsistentes el resumen puede negar fallas recibidas y atribuir una corrección que no se acredita. La aceptación humana de Efraín sigue pendiente; no se sustituye por las pruebas del lector.

## R1 · El resumen ignora hechos recibidos si no están en un cierre

**Archivo:** `TecnoBloques/herramientas/historia-registro.js:230–236`. `narrar()` construye «Fallas vistas» únicamente con `c.cierre`, aunque `contarSesion()` conserva los eventos individuales en `c.fallasVistas`. Busca como estado final la última corrida con cierre, aunque haya una posterior incompleta con fallas nuevas.

**Reproducciones:** datos sintéticos; cada línea cumple el esquema vigente, comprobado con el revisor real de TecnoCircuito.

| Secuencia | Observado |
|---|---|
| Inicio → corrida 1 → LED quemado; se trunca el registro | El paso narra el LED quemado y avisa que falta cierre, pero el resumen dice «Fallas vistas: ninguna» y «Sin corregir: ninguna». |
| Inicio → corrida 1 → LED quemado → cierre vacío → fin | Avisa la diferencia AUD-03, pero el resumen también dice «Fallas vistas: ninguna». |
| Corrida 1: LED quemado y cierre coincidente; corrida 2: cierre sin fallas; corrida 3: vuelve LED quemado y falta cierre | El resumen dice «Corregidas al final: LED quemado (led1). Sin corregir: ninguna», aunque el último hecho registrado es que volvió a quemarse. Sí avisa que falta el cierre de la tercera. |

**Impacto:** el resumen contradice los pasos y puede inducir al instructor o al análisis a concluir ausencia de fallas o una corrección al final no demostrada. Un aviso de truncamiento no hace verdaderas esas afirmaciones. También aparece con la secuencia AUD-03 que la propia suite de Claude ya incluye, pero la suite no comprueba aquel resumen.

**Corrección/comprobación requerida:** conservar en «Fallas vistas» los eventos de falla observados, separando su procedencia del resumen de cierre. Si falta cierre o hay contradicción, el estado final y las correcciones deben quedar como incompletos/inciertos donde corresponda; no inferir «sin corregir: ninguna» o una corrección acreditada por ausencia de datos. Añadir regresiones de las tres secuencias, conservando el control completo y su comparación correcta. Claude decide la implementación y el texto preciso.

## R2 · Una falla posterior al cierre puede dejar «Avisos: ninguno»

**Archivo:** `herramientas/historia-registro.js:176–178`, `:186–194` y `:216–219`. La comparación cierre↔fallas individuales se hace al procesar `simulacion_detenida`. Si llega una falla de esa corrida después de su cierre, se añade a `fallasVistas` y a los pasos, pero no se vuelve a comprobar la coherencia ni se avisa del orden imposible.

**Secuencia mínima:** inicio de sesión → inicio de corrida 1 → cierre de corrida 1 con `fallas: []` → `falla: led_quemado`, corrida 1 → fin de sesión. Las cinco líneas cumplen el esquema individual; la secuencia se hace inconsistente intencionadamente para comprobar el lector de integridad.

**Observado:** narra «Sin fallas» en el cierre, después narra el LED quemado, y termina con **«Avisos: ninguno»** y «Fallas vistas: ninguna». El cierre y `fallasVistas` difieren al finalizar la lectura, pero no se señala. No se está afirmando que el emisor actual produzca esta secuencia; se verifica que el lector detecte una historia inválida, que es parte de su alcance.

**Corrección/comprobación requerida:** revisar la integridad final de cada corrida y/o detectar explícitamente eventos de una corrida ya cerrada; señalar la discrepancia sin perder los hechos. Añadir la regresión anterior y controles de pausa/reinicio válidos, junto con el caso AUD-03 de falla anterior a cierre vacío. No basta validar la forma de cada línea.

## Evidencia y alcance

`node docs/verificar-reg004-2026-10-19.cjs` da **exit 1**, con un control completo aprobado y **cuatro casos adversos** que reproducen R1/R2. Es diagnóstico de defecto, no regresión aprobada. [Instrumento](verificar-reg004-2026-10-19.cjs), [eventos, historias y resultados](reg004-evidencia-2026-10-19.json), [log](reg004-diagnostico-2026-10-19.log). Cero errores de esquema en las líneas de los cinco casos.

`npm.cmd --prefix ../TecnoBloques run test:historia`: **18 OK, exit 0**. Se revisó la secuencia conocida, los avisos AUD-01–04 y la CLI; estas aprobaciones no cubren los dos hallazgos.

`npm.cmd run test:registro-app` en TB, con paquete local: **86/86, exit 0**, sin errores de consola. El lector procesa las 11 sesiones sintéticas generadas por la app real en Electron, sin avisos, y reconoce las dos fallas en I6/J7/L9. [Log integrado](aud06-reg004-registro-app-2026-10-19.log). Acredita los caminos completos de la suite, sin contradecir la reproducción adversa. Prueba humana no ejecutada.

**Identificación:** TC main `f8f062e`; TB main `deaf16c`; TS main `9ab3c86`; entrega sin commit junto con AUD-06. Se registraron Git, rama, trabajo existente y SHA256 antes de editar; [manifiesto compartido](aud06-reg004-version-2026-10-19.json). El `package.json` final de CLA-005 incluye las dos tareas; `main.js` y la prueba de herramientas corresponden a CLA-004. HEAD por sí solo no identifica la entrega.

**No ejecutado / pendiente externo:** prueba humana de unos 10 minutos y aceptación de Efraín, registros del aula o del instalador, suite completa de TC/KiCad y distribución. No se lee ni copia información real de aprendices. Se revisan las secciones documentales afectadas, sin modificar contrato, producto ni CLAUDE.md.

Siguiente: Claude toma/reserva R1/R2 y entrega corrección con regresiones. REG-004 queda pendiente por defectos de software; la aceptación humana se conserva pendiente aparte. AUD-01–05 no se reabren por estos fallos del lector nuevo. Informe e instrumento propios revisados por Codex, sin segunda revisión independiente acreditada. Sin commit, push, etiqueta o publicación por Codex.
