# Verificación de CLA-20261021-001 · REG-004

21 de octubre de 2026 · Codex (Sol), por pedido de Efraín. **Resultado: INT-RES-03a/03b comprobados en sus originales; devolución parcial por INT-RES-03c, falso positivo con RESET y hechos pendientes del Worker. REG-004 no se cierra.** Sin modificaciones de producto, pruebas de producto o memorias de Claude.

La respuesta de Claude es correcta sobre los cuatro fallos originales, el límite de una corrida anterior sin cierre y el RESET sin fotos pendientes. Sin embargo, el orden de recepción no identifica el tramo del reloj de una foto. El emisor conserva legítimamente hechos de fotos anteriores al RESET que llegan después; el lector los atribuye al tramo nuevo y puede declarar imposible una corrida válida.

## Versión revisada

Cambios sin commit: TC `main` `56baf57e38a16e13c95bcc281d90e1bfc578176c`, TB `main` `86433d1341caa86b6d75dc3ab437aaa2cf8f008c`, TS `main` `5665e60fc0635263ace18e4e45ac1e3454f68fb1`. Estado Git y trabajo existente registrados antes de editar. [Manifiesto inicial](reg004-cla21001-version-inicio-2026-10-21.json); [final](reg004-cla21001-version-final-2026-10-21.json).

| Archivo | SHA256 |
|---|---|
| TB `herramientas/historia-registro.js` | `45bfba07f83d7cf72b552d4f92cb8cab7086db8650eab0baabdb54cd45243a3b` |
| TB `test/historia-registro.js` | `2d6fe78eddea7e7014e0d247584389c68d5a1f6283153f95d137eacd060a63f4` |
| TB `test/registro-app.js` | `f50836eae71a9b57ea5aa9c59e21fe180a6cf86ff1a8873d8588d1a639e630eb` |
| TC `contrato/evento.schema.json` | `8f18ef5ce96cea63ee9d509b4720bbb54e96857f7091adf1c8ede22a46e7fccc` |

Se revisaron el diff de trabajo, código del lector y emisor, regresiones, contrato, COMO-FUNCIONA 68, respuesta de Claude y ficha. El esquema conserva el hash de CLA-009; no hubo otro cambio de contrato. Se conservan las verificaciones históricas en su alcance.

## INT-RES-03c · Media · Una foto anterior al RESET se atribuye al reloj nuevo

**Archivos y condición:** TB `herramientas/historia-registro.js:645`, 650 y 719; TC `prototipo/src/simulador.js:67`, 75 y 179–189. El lector asigna cada falla al `c.tramo` vigente al recibirla e incrementa ese tramo al leer `reinicio_placa/boton`. El controlador del simulador conserva los hechos de fotos anteriores de la misma corrida aunque su vista se descarte. Pulsar RESET emite el marcador en la página antes de recibir necesariamente esas fotos; el evento de falla no lleva el turno/tramo del Worker.

**Reproducción mínima ejecutada con el núcleo y el controlador reales**, reutilizando el arnés de `probar_fotos.js`, con entrega del Worker controlada:

1. Iniciar el Uno con LED directo a D13, sin resistencia.
2. Avanzar el núcleo 20 ms y retener su foto: contiene LED quemado y corriente del pin.
3. Pulsar RESET en la página, sin entregar todavía esa foto.
4. Entregar la foto retenida. El controlador emite ambas fallas a 20 ms de su reloj anterior; este comportamiento ya es intencional en AUD-03.
5. Reiniciar el núcleo, avanzar 10 ms, entregar la foto nueva y confirmar la detención con 10 ms.

**Observado:** las dos fallas quedan en `tramo:1`, igual que el cierre de 10 ms. El lector publica «La corrida 1 tiene una falla después del tiempo simulado de su cierre», `coherente:false`; la CLI de texto y JSON salen con **1**. Las líneas cumplen el esquema y no faltan eventos. Los 20 ms pertenecen al reloj anterior: la entrega controlada prueba que la contradicción atribuida no ocurrió. El lector conserva los hechos, pero etiqueta como defectuosa una historia válida e impide compararla.

| Control con los mismos modelos | Resultado |
|---|---|
| Foto de 20 ms entregada **antes** del RESET; cierre nuevo a 10 ms | Coherente, sin avisos, ambas CLI 0. |
| Foto de 20 ms entregada **después** del RESET; cierre nuevo a 10 ms | **Falso positivo**, ambas CLI 1. |
| Misma foto pendiente después del RESET; cierre nuevo a 40 ms | Coherente, sin avisos, ambas CLI 0. |

**Impacto:** perder una comparación y generar un aviso de integridad falso en un uso permitido. No se reproduce una corrección falsa ni pérdida de fallas en estos tres casos. No se midió su frecuencia en Electron ni en el aula; es una reproducción determinista de integración con Worker controlado, no una carrera observada en la prueba humana.

**Sugerencia inmediata:** acreditar el límite entre relojes mediante coordinación del RESET con el Worker, conservando y ordenando los hechos previos antes de fijar el marcador del reloj nuevo, o mediante una identidad temporal explícita de los hechos. Revisar la alternativa mínima con Claude; si precisa ampliar el contrato, presentar el cambio a Efraín. No basta omitir la comprobación después de un RESET ni asignar tramos por una heurística de tiempos: eso volvería a permitir una falla imposible genuina del tramo nuevo. La información actual del JSONL no distingue por sí sola esas dos procedencias.

**Regresión necesaria:** foto previa retenida → RESET → foto previa con fallas → cierre menor del reloj nuevo, sin declarar una contradicción temporal inexistente. Conservar el control de foto antes del RESET, el cierre nuevo mayor y el caso genuinamente imposible de una falla del tramo nuevo posterior a su cierre. Cubrir también pausas y reinicios por energía que lleguen en fotos pendientes.

[Reproducción ejecutable](reproducir-reg004-reset-worker-2026-10-21.cjs), [entradas, estados y seis salidas CLI](reg004-cla21001-reset-worker-2026-10-21.json), [log](reg004-cla21001-reset-worker-2026-10-21.log). Tres casos, dos controles aprobados y un fallo; **diagnóstico exit 1, no regresión aprobada**. La copia permanente se volvió a ejecutar con el mismo resultado. Usa los `.cjs` generados por `npm.cmd --prefix prototipo run probar:fotos`; por defecto escribe su evidencia en Temp y admite una ruta de salida como primer argumento.

## Comprobaciones de la respuesta

- **INT-RES-03a:** pasan las tres reproducciones originales: repetición a 500/1500 ms antes del cierre de 1000, repetición después del cierre y segundo cierre que ocultaba el tiempo del primero. Se conservan todas las ocurrencias y tiempos de cierre. Repetición al mismo tiempo y cierre idéntico conservan la comparación.
- **INT-RES-03b:** el cierre tras `sesion_terminada` ya impide comparar y acreditar corrección; se conserva el control con cierre antes del fin.
- **Corrida anterior nunca cerrada:** los dos casos antes dejados en observación ahora impiden acreditar el orden y la corrección, sin afirmar que un cruce se haya demostrado. Se inspeccionaron las conclusiones, además del aviso que comprobaba el instrumento antiguo.
- **RESET habitual:** la regresión Electron pasa, con reinicio a un tiempo mayor que el cierre posterior; 11 sesiones sintéticas escritas por la app se leen sin avisos. Esto no cubría la foto previa retenida del nuevo hallazgo.
- **Control histórico con dos cierres diferentes:** se confirma lo dicho por Claude. `control-repetido-identico-y-comparacion` usa 3000/4000 ms; es correcto que ya no sea coherente. La ejecución original queda como fallida; una repetición en memoria con ambos cierres a 3000 ms aprueba sus cuatro casos. No se modificó el instrumento histórico ni se relajó la regla temporal. El control de CLA-009 con tiempos idénticos también pasa.
- **Aviso de sobrescritura de evidencia de Claude:** el archivo señalado tiene SHA256 `7943140ec8a918f34674910f599941721409a063aa4f858a1b12104a33e23551`, coincidente con el hash citado y con el contenido equivalente registrado antes. No hay cambio de contenido que invalidar en esta auditoría; la fecha de modificación no prueba por sí sola qué proceso lo escribió. Los hashes iniciales de evidencias anteriores se preservan durante esta revisión.

## Pruebas ejecutadas

| Comprobación | Resultado nuevo |
|---|---|
| `npm.cmd --prefix ../TecnoBloques run test:historia` | **135 OK**, exit 0. |
| `npm.cmd --prefix ../TecnoBloques run test:registro-app` | **88 OK**, exit 0; 11 sesiones sintéticas sin avisos; sin errores de consola reportados. |
| `npm.cmd --prefix ../TecnoBloques run test:registro` | **142 OK**, exit 0. |
| `npm.cmd --prefix prototipo run probar:contrato` | **179 OK**, exit 0. |
| `npm.cmd --prefix prototipo run probar:fotos` | **31 OK**, exit 0 en reintento autorizado; el primer intento quedó bloqueado por acceso del sandbox al compilador/rutas, no por una aserción. Ambos logs conservados. |
| Ampliación CLA-009 y bordes CLA-007 | **18/18 y 26/26**; cero residuales originales. |
| Diagnósticos históricos | **53 casos conformes**, con dos expectativas de espacios adaptadas a igualdad exacta y el control de cierre repetido ajustado únicamente en memoria; se conserva el fallo del control original 3000/4000. Las dos historias del lienzo usan eventos capturados previamente, no recorridos nuevos. |
| Auditoría integral E1/E2 | **42 ejecuciones**: queda la observación deliberada de segmentos sin fecha al revés y AUD-07/08 pendientes. No son 42 aprobaciones de secuencias limpias. |
| Ampliación RESET/Worker | **Tres casos; uno fallido**, reproducido de nuevo con el instrumento permanente. Datos válidos por esquema. |
| Diff y coordinación | `git diff --check` y comprobador del piloto; resultados en los logs de esta entrega. |

Logs y JSON de esta revisión llevan el prefijo `reg004-cla21001-`. El [orquestador de repetición](auditar-reg004-cla21001-2026-10-21.py) desvía escrituras a nombres nuevos y rechaza sobrescribir sus resultados. No modifica los instrumentos históricos. Las suites que comparten artefactos se ejecutaron en secuencia; no se midió rendimiento.

## Estado y siguiente paso

REG-004 vuelve a `pendiente`, cierre null y reservas del revisor liberadas. **Claude toma y reserva INT-RES-03c**, reproduce con el instrumento y entrega una solución que distinga la procedencia temporal sin perder hechos ni debilitar las comprobaciones de 03a. Codex verificará esa integración, los controles y las regresiones. Los originales de 03a/03b quedan comprobados en esta versión; este residual no reabre los cierres históricos AUD-01–06.

AUD-07/08 continúan pendientes; REG-005 no se inicia. Se conserva la aceptación humana final registrada por Claude con Efraín; Codex no efectuó otra prueba humana. El límite declarado del cierre sin confirmación en 500 ms sigue siendo un límite distinto: la reproducción de 03c **sí confirma** la detención del Worker y no depende del timeout.

Sin suite global nueva, compilación AVR, simulador completo, KiCad, benchmark, instalador, hardware ni aula. No se consultaron registros privados. Informes e instrumentos propios revisados por su autor; no se presenta una segunda revisión independiente. Sin implementación de producto, commit, push, etiquetas o publicación por Codex.
