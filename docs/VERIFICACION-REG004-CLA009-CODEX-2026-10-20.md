# Verificación de CLA-20261020-009 · REG-004

20 de octubre de 2026 · Codex (Sol), por pedido de Efraín. **Resultado: correcciones originales comprobadas, devolución parcial por dos residuales de INT-RES-03. REG-004 sigue pendiente de cierre.** No se modificaron fuentes de producto, pruebas ni esquemas.

La nueva entrega elimina los 17 fallos de la revisión anterior: pasan sus **26 casos completos**, incluidos controles. La documentación de corrección frente a simple desaparición está alineada y el esquema solo cambió en su descripción. Sin embargo, la combinación de eventos repetidos con tiempos contradictorios y un cierre posterior al fin de sesión todavía puede acreditar corrección. No se convierte la aprobación de los casos originales en cierre de toda la familia.

## Versión revisada

Entrega sin commit, tres repositorios en `main`: TC `56baf57e38a16e13c95bcc281d90e1bfc578176c`, TB `86433d1341caa86b6d75dc3ab437aaa2cf8f008c`, TS `5665e60`. El trabajo existente de Claude y la evidencia anterior se conservaron.

| Archivo | SHA256 |
|---|---|
| TB `herramientas/historia-registro.js` | `63d4551f0e5989da80893f65ee6eafcf4c151a474970cf880eb96bb370bcfeff` |
| TB `test/historia-registro.js` | `94df9e2b62197a3fb8c3a7e84d78758b09ca5be75f238e04313619b343f52bf7` |
| TC `contrato/evento.schema.json` | `8f18ef5ce96cea63ee9d509b4720bbb54e96857f7091adf1c8ede22a46e7fccc` |

[Manifiesto inicial](reg004-cla009-version-inicio-2026-10-20.json) y [final](reg004-cla009-version-final-2026-10-20.json). Se revisaron código, diff de trabajo, contrato/esquema, regresiones, COMO-FUNCIONA 68, estado técnico, ficha y respuesta del canal. Las horas manuales del canal no se usan para calcular duración ni esfuerzo.

## Dos residuales comprobados, con sugerencia inmediata

### INT-RES-03a · Media · La deduplicación de hechos descarta evidencia temporal

**Archivo:** TB `herramientas/historia-registro.js:629`, 663 y 699–703. **Condición mínima:** iniciar corrida 1; recibir la misma falla `led_quemado/led1` a los **500 ms y 1500 ms**; cerrar esa corrida a los **1000 ms**; hacer una corrida 2 comparable y limpia. Todas las líneas cumplen el esquema. La secuencia temporal es contradictoria, precisamente lo que debe detectar el lector.

**Observado:** solo se conserva el primer tiempo de la falla. La corrida 1 queda `coherente:true`; la corrida 2 dice «Corrigió», y el resumen «Corregidas al final: LED quemado (led1). Sin corregir: ninguna». Texto y JSON salen con **código 0, sin avisos**. Si los dos eventos de falla se invierten, sí se detecta la contradicción y no se acredita corrección. La calidad de la conclusión depende de cuál repetición se conservó, aunque ambas entradas están disponibles.

**Sugerencia de solución:** separar el conjunto de fallas únicas, útil para contar y comparar, de la evidencia temporal de **todas** sus ocurrencias. Revisar cada tiempo recibido —o un resumen suficiente que conserve extremos y contradicciones— sin perderlo por deduplicación. Conservar también los tiempos de cada cierre y comprobarlos individualmente; no sustituirlos por el tiempo del último cierre. Una contradicción temporal debe impedir la comparación y la conclusión de corrección, manteniendo los hechos y el aviso.

Hay otras dos reproducciones de la misma familia:

- Primera falla a 500 ms, cierre a 1000 ms y repetición de la misma falla a 1500 ms **después del cierre**. Se avisa del evento posterior, pero la corrida sigue coherente y se acredita corrección.
- Falla a 1500 ms, primer cierre a 1000 ms y segundo cierre a 2000 ms, ambos con la misma falla. El segundo `c.ms_sim` reemplaza al primero y oculta la contradicción de aquel cierre; se avisa de cierre duplicado, pero se acredita corrección.

**Regresiones necesarias:** `falla-repetida-ms-mayor-antes-cierre`, `falla-repetida-ms-mayor-despues-cierre`, `segundo-cierre-oculta-tiempo-del-primero`. Mantener los controles de repetición a igual tiempo, de cierre repetido idéntico y de la falla tardía que llega primero. Repetir ambos órdenes de las ocurrencias; no corregir solo el mensaje final o una de las posiciones.

### INT-RES-03b · Media · Un cierre después del fin de sesión todavía acredita corrección

**Archivo:** TB `herramientas/historia-registro.js:521`, 620 y 646–703. **Condición:** corrida 1 completa con LED quemado; iniciar corrida 2; emitir `sesion_terminada`; después recibir el cierre limpio de la corrida 2. Todas las líneas cumplen el esquema. La app debe cerrar su corrida antes de terminar la sesión, como establece la coordinación de AUD-03/04.

**Observado:** se avisa del `simulacion_detenida` posterior al fin y la CLI sale 1, pero la corrida 2 queda `completa:true`, `coherente:true`, publica «Corrigió» y el resumen afirma «Corregidas al final… Sin corregir: ninguna». La nueva contradicción solo se añade si el **inicio** fue posterior al fin; no alcanza a una corrida que empezó antes y cuyo cierre llegó después. El aviso no limita la inferencia que usa ese cierre.

**Sugerencia de solución:** aplicar el estado terminal de la sesión a todos los eventos relevantes para completar o comparar una corrida. Conservar un cierre tardío como hecho observado, con su procedencia y motivo, pero no usarlo para acreditar el estado al terminar la sesión. Hacer que la contradicción llegue al criterio de comparación y al resumen, conservando el control donde la corrida sí termina antes de la sesión.

**Regresión necesaria:** `cierre-corrida-tras-fin-sesion`, junto a `control-cierre-corrida-antes-fin`. La ampliación incluye además una variante con falla y cierre después del fin: conserva la falla y no anuncia corrección, aunque eso por sí solo no acredita todas las reglas de ciclo de vida.

Las entradas completas, los estados calculados y las salidas de CLI en texto/JSON están en [ampliación de integridad](reg004-cla009-ampliacion-integridad-2026-10-20.json); [log](reg004-cla009-ampliacion-integridad-2026-10-20.log). Son **cuatro reproducciones de dos residuales**; no cuatro familias nuevas ni cuatro regresiones aprobadas.

## Qué sí quedó comprobado

- **INT-RES-01:** los cinco orígenes incompletos/incoherentes de la revisión anterior ya no acreditan corrección. Se conserva el control de corrección comparable y el caso aceptado por Efraín de corregir antes de cambiar de placa.
- **INT-RES-02:** los cuatro huecos posteriores al último cierre, incluidas líneas apartadas después del fin, limitan la conclusión final; se conserva la corrección histórica del paso.
- **INT-RES-03, casos originales:** corridas cruzadas con cierres, inicio después del fin, cierre con tiempos distintos en sobre/datos y reanudación imposible ya impiden comparar. No se cierra la familia por los residuales anteriores.
- **INT-RES-04:** la sesión escapada se atribuye al grupo correcto. También pasan casos adicionales de clave JSON escapada, objeto raíz con datos anidados, JSON roto con escape y pista textual ambigua atribuida por vecinos.
- **INT-RES-05:** las tres horas fuera de `Date` ya no tumban la narración; se conserva el límite representable. Una fecha inválida después de corregir limita el final; una anterior a ambas corridas conserva la comparación posterior.
- **DOC-01:** CONTRATO 6.1, descripción del esquema, COMO-FUNCIONA 68 y «Proyecto hermano» expresan la comparabilidad; ambas bitácoras registran la aclaración. El cambio de esquema frente a CLA-007 es únicamente descripción y finales de línea: reconstruir la descripción anterior reproduce su hash anterior, sin cambios de validación. [Contraste documental](reg004-cla009-contrato-diff-2026-10-20.json).

La regla de fin de sesión se interpreta contra el orden de escritura, no reordenando por el reloj real. No se confunde una línea válida con una secuencia causal válida.

## Pruebas ejecutadas y alcance

| Comprobación | Resultado |
|---|---|
| `npm.cmd --prefix ../TecnoBloques run test:historia` | **116 OK**, exit 0; [log](reg004-cla009-historia-2026-10-20.log). |
| `npm.cmd --prefix ../TecnoBloques run test:registro-app` | **87 OK**, exit 0, consola sin errores, 11 sesiones sintéticas generadas por Electron y leídas sin avisos; [log](reg004-cla009-registro-app-2026-10-20.log). |
| `npm.cmd --prefix ../TecnoBloques run test:registro` | **142 OK**, exit 0; [log](reg004-cla009-registro-2026-10-20.log). |
| `npm.cmd --prefix prototipo run probar:contrato` | **179 OK**, exit 0; [log](reg004-cla009-contrato-2026-10-20.log). |
| Repetición de la ampliación de CLA-007 | **26/26** cumplen sus comprobaciones, 0 residuales; [JSON](reg004-cla009-integral-bordes-integridad-2026-10-20.json), [log](reg004-cla009-bordes-2026-10-20.log). Antes eran 17 fallidos y 9 conformes. |
| Diagnósticos históricos | **53 casos aprobados**: 16 históricos, 10 de CLA-002, 17 de CLA-003, 8 bordes de CLA-004 y 2 historias con eventos de lienzo ya capturados. Logs `reg004-cla009-replay-{original,residuales,cierres,ampliacion,originales,adicionales,bordes,lienzo}-2026-10-20.log`. Las dos expectativas de espacios conservan la adaptación autorizada a igualdad exacta. No son recorridos nuevos del lienzo. |
| Auditoría integral E1/E2 | **42 ejecuciones**; persisten solo la observación deliberada de segmentos sin fecha al revés y AUD-07/08. [E1](reg004-cla009-integral-evidencia-2026-10-20.json), [E2](reg004-cla009-integral-ampliacion-2026-10-20.json). No se cuentan esos predicados diagnósticos como aprobación de cualquier conclusión. |
| Nueva ampliación | **18 casos**, 4 fallidos, 12 con el resultado esperado y 2 observaciones de un límite declarado. **Diagnóstico exit 1**, no regresión aprobada. Incluye **36 ejecuciones CLI** con stdout/stderr y código de salida conservados. |
| `git diff --check` | Aprobado en TC/TB/TS. Logs `reg004-cla009-diffcheck-…`. |

No se corrieron a la vez suites que comparten artefactos: Electron/registro terminaron antes del contrato. Los diagnósticos Node/CLI usan archivos temporales propios y no miden rendimiento. Los JSON y logs anteriores no se sobrescribieron; las fuentes se identifican antes y después de probar.

## Límites y siguiente paso

**Límite declarado por Claude, observado sin darlo por resuelto:** si una corrida antigua nunca cierra, se avisa de la falta de cierre pero no se marca como cruce. En dos casos con esa corrida iniciada antes de la última que vio la falla, las corridas siguientes completas permiten que el resumen anuncie corrección. Estas dos comprobaciones solo verificaron que existe el aviso; no se presentan como aprobación de toda la incertidumbre temporal ni se suman a los cuatro fallos nuevos.

**Sugerencia sobre ese límite:** explicitar qué puede concluirse si falta el cierre de una corrida anterior. Cuando no pueda acreditarse que terminó antes del tramo comparado, conservar la incertidumbre en vez de tratar el orden de los inicios como prueba del orden de los finales. No afirmar un cruce demostrado si lo único que falta es un evento de cierre.

REG-004 vuelve a `pendiente`, cierre null y reservas del revisor liberadas. Claude debe tomar/reservar INT-RES-03a/03b, conservar los hechos temporales y completar la comprobación del estado terminal de sesión, añadir regresiones y entregar una versión identificable. Codex repite originales, los nuevos residuales, controles y dependencias antes de cerrar.

AUD-07/08 siguen pendientes y reproducibles; esta entrega no los corrige ni los presenta como corregidos. REG-005 no se inicia. Se conserva la aceptación humana final documentada por Claude con Efraín, sin atribuir una nueva prueba humana al revisor ni usarla para aprobar secuencias adversas.

No se ejecutaron nuevamente suite global, simulador completo, compilador AVR, KiCad, rendimiento, instalador, hardware ni aula; las modificaciones revisadas afectan al lector y a una descripción de contrato. No se leyeron registros privados. Diagnósticos nuevos únicamente en `%TEMP%`, con evidencia pública sintética en `docs/`. Informes e instrumentos propios revisados por su autor, sin segunda revisión independiente. Sin programación de producto, commit, push, etiqueta o publicación por Codex.
