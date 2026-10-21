# Verificación de la respuesta a la auditoría integral de REG-004

20 de octubre de 2026 · Codex (Sol), por pedido de Efraín. Revisión de CLA-20261020-006/007 y del aviso de aceptación CLA-20261020-008. **Resultado: devolución parcial; REG-004 no queda verificada en su totalidad.**

El rediseño corrige los casos originales comprobados de la auditoría integral y elimina la igualdad de C++ inferida por un analizador parcial. La corrección aceptada por Efraín —conservar una corrección demostrada antes de cambiar de placa— también pasa. Sin embargo, nuevas combinaciones muestran cinco familias residuales: el resumen todavía acredita correcciones sin comparación válida, no propaga ciertos huecos y contradicciones, atribuye mal una línea apartada con identificador escapado y puede perder la salida al formatear fechas fuera del rango de JavaScript. Cada hallazgo va seguido de su sugerencia. No se modificó código de producto, pruebas ni esquemas.

## Versión y alcance

Repositorios en `main`, entrega sin commit: TecnoCircuito `56baf57e38a16e13c95bcc281d90e1bfc578176c`, TecnoBloques `86433d1341caa86b6d75dc3ab437aaa2cf8f008c`, TecnoSuite `5665e60`. El HEAD por sí solo no identifica esta entrega.

- Lector TB `herramientas/historia-registro.js`: SHA256 `216a63f298caa61a78b2450309697b336dbbea2e2e96be0ccc482a956f58a1c7`.
- Prueba TB `test/historia-registro.js`: SHA256 `ea3bb3a6d4196e508217ed43bdbd9225c39a44fe80e371d5155f75f23c61532e`.
- [Manifiesto inicial](reg004-cla007-integral-version-inicio-2026-10-20.json) y [manifiesto final](reg004-cla007-integral-version-final-2026-10-20.json): trabajo existente, fuentes y evidencia preservados. Se revisaron implementación, prueba, diff de trabajo, contrato, documentación y aceptación.

La aceptación humana final está [registrada por Claude con Efraín](../validacion/2026-10-20-reg004-aceptacion.md). Codex leyó ese informe y comprobó su caso sintético; no repitió la sesión humana ni accedió a registros privados. Las nuevas entradas son sintéticas; una línea válida por esquema no acredita una secuencia de eventos posible.

## Comprobaciones ejecutadas

| Comprobación | Resultado y alcance |
|---|---|
| `npm.cmd --prefix ../TecnoBloques run test:historia` | **95 OK**, exit 0; [log](reg004-cla007-integral-historia-2026-10-20.log). |
| `npm.cmd --prefix ../TecnoBloques run test:registro-app` | **87 OK**, exit 0; Electron sin errores de consola, 11 sesiones sintéticas generadas por la app y leídas sin avisos; [log](reg004-cla007-integral-registro-app-2026-10-20.log). |
| `npm.cmd --prefix ../TecnoBloques run test:registro` | **142 OK**, exit 0; [log](reg004-cla007-integral-registro-2026-10-20.log). |
| Repetición de E1/E2 de la auditoría integral | **42 ejecuciones**. E1: 33 no reproducen el defecto buscado; queda la observación deliberada de segmentos sin fecha pasados al revés. E2: los seis casos del lector no reproducen el defecto buscado; siguen AUD-07 y AUD-08. [E1](reg004-cla007-integral-evidencia-2026-10-20.json), [E2](reg004-cla007-integral-ampliacion-2026-10-20.json). Estos diagnósticos observan defectos; su exit 0 no certifica toda la historia. |
| Instrumentos anteriores, conservando sus fuentes y resultados históricos | **53 casos aprobados**: 16 históricos, 10 de CLA-002, 17 de CLA-003, 8 fronteras de CLA-004 y 2 historias con eventos del lienzo previamente capturados. Copias en memoria, resultados con prefijo nuevo. Dos expectativas de espacios se adaptaron a la decisión de igualdad exacta de Efraín. No hubo un recorrido nuevo del lienzo. |
| Ampliación de integridad sobre archivos JSONL y CLI | **26 casos: 9 cumplen lo esperado y 17 reproducen residuales**, diagnóstico exit 1. Cada caso ejecuta lectura, construcción, narración y CLI en texto/JSON. [Entradas y salidas completas](reg004-cla007-integral-bordes-integridad-2026-10-20.json), [log](reg004-cla007-integral-bordes-integridad-2026-10-20.log). **No es una regresión aprobada.** |
| `git diff --check` | Aprobado en TC/TB/TS; logs separados con prefijo `reg004-cla007-integral-diffcheck-`. |

Los 53 casos reutilizados tienen logs `reg004-cla007-integral-replay-{original,residuales,cierres,ampliacion,originales,adicionales,bordes,lienzo}-2026-10-20.log` y JSON con prefijo `reg004-cla007-integral-replay-`. El envoltorio de pruebas normal terminó dos veces con un error de codificación **al imprimir un resultado ya guardado**; ambos procesos de prueba habían salido con 0, los logs originales se conservaron y se inspeccionaron. No se presenta ese error del envoltorio como fallo del producto. En el instrumento propio se corrigió la selección del grupo de una pista escapada: se evaluó equipo **y sesión**, conservando las salidas CLI ya obtenidas.

## Hallazgos residuales por gravedad

### INT-RES-01 · Media · El resumen acepta como origen una corrida incompleta o incoherente

**Archivo:** TB `herramientas/historia-registro.js:322`, especialmente 343–347. **Condición:** una corrida registra LED quemado y después hay otra limpia, con las mismas condiciones; la primera quedó sin cierre, tiene cierres contradictorios, comenzó dos veces, recibió una falla con tiempo simulado posterior al cierre o su cierre no coincide con las fallas individuales. **Observado:** el paso de la segunda corrida dice «No se compara», pero el resumen afirma `Corregidas al final: LED quemado (led1). Sin corregir: ninguna.`. Se reproducen las cinco variantes, todas con cero errores de esquema por línea. La búsqueda de una corrida posterior comprueba `c.completa && c.coherente`, pero no exige esas condiciones a la corrida `donde` que aporta la falla. El resumen contradice la comparación que él mismo publica y el criterio de Efraín.

**Sugerencia de solución:** reutilizar un único criterio de comparación acreditada que revise **ambos extremos** y el tramo entre ellos, tanto para los pasos como para el resumen. Conservar el hecho de la falla; cuando falta evidencia del origen, expresar incertidumbre o ausencia observada, sin convertirla en una corrección demostrada. Mantener la regla aceptada por Efraín para una corrección realmente probada antes del cambio de placa.

**Reproducciones:** `source-cierre-contradictorio`, `source-inicio-repetido`, `source-ms-falla-despues-cierre`, `source-cierre-sin-falla-individual`, `source-incompleta`. Añadir las cinco regresiones junto a los controles `control-correccion-comparable`, `control-corrige-luego-cambia-placa` y `control-falla-reaparece`.

### INT-RES-02 · Media · Un hueco posterior al último cierre no limita la conclusión final

**Archivo:** TB `herramientas/historia-registro.js:345` y construcción de `huecos` en 494–497 y 658–663. **Condición:** corrida 1 con falla, corrida 2 comparable limpia, después una línea truncada, una línea identificada de versión no admitida o un `registro_interrumpido` con pérdidas, y fin. **Observado:** hay aviso y CLI 1, pero el resumen conserva «Corregidas al final… Sin corregir: ninguna». La comprobación acaba en `ultima.hastaPos`, antes de la pérdida. Ocurre también si una línea apartada identificada con esa sesión llega después de `sesion_terminada`. Son cuatro reproducciones: una JSON truncada, dos líneas deliberadamente inválidas por `v:2` y una secuencia de eventos válidos con pérdidas explícitas. No se puede saber si el hueco contenía otra corrida o la reaparición de la falla.

**Sugerencia de solución:** distinguir «se corrigió en la corrida 2» como hecho histórico de «corregida al final» como conclusión de integridad. Extender el análisis de pérdidas hasta el final del segmento de la sesión, incluidas sus líneas apartadas y avisos de recuperación; conservar la corrección histórica y dejar el estado final incierto cuando falte ese tramo. No invalidar el control donde el hueco ocurrió antes de ambas corridas.

**Reproducciones:** `hueco-tras-ultimo-cierre`, `hueco-identificado-tras-ultimo-cierre`, `hueco-identificado-tras-fin`, `perdida-tras-ultimo-cierre`. Controles: hueco antes, entre y dentro de las corridas, más recuperación con pérdidas entre corridas. Mostrar un aviso sin limitar el resumen no basta para cerrar esta familia.

### INT-RES-03 · Media · Las contradicciones de ciclo de vida y tiempo no siempre impiden comparar

**Archivo:** TB `herramientas/historia-registro.js:508`, 584–608, 621–635 y 677. **Condición:** iniciar la corrida 2 antes de cerrar la 1, terminar la 2 limpia y luego cerrar la 1 con falla. **Observado:** texto y JSON salen con **código 0, sin avisos**, la corrida 2 dice «Corrigió» y el resumen la da por corregida. El lector usa el orden de los inicios sin comprobar que la corrida anterior haya terminado antes. Otras tres variantes sí producen avisos, pero conservan las corridas como coherentes y acreditan corrección: corrida después del fin de sesión, cierre con `datos.ms_sim=1000` y sobre `ms_sim=2000`, y reanudación sin pausa. Las cuatro secuencias cumplen el esquema por línea, pero son incompatibles con el ciclo de vida declarado.

**Sugerencia de solución:** comprobar las transiciones y el orden causal entre corridas y sesión, conservando todos los hechos. Registrar como contradicciones con efecto en la comparación los estados imposibles y los tiempos incompatibles, en lugar de dejarlos únicamente como texto en Avisos. Compartir ese resultado con el resumen y la CLI. Definir qué aviso afecta a cada conclusión: no es necesario invalidar por igual una nota informativa y una contradicción causal.

**Reproducciones:** `corridas-solapadas`, `inicio-tras-fin-sesion`, `cierre-tiempo-contradictorio`, `pausa-estado-imposible`. Añadir controles de corridas consecutivas y de pausa/reanudación normal. En particular, el solapamiento debe dejar de anunciar un registro limpio.

### INT-RES-04 · Media · Una pista JSON escapada crea otra sesión y deja el hueco fuera de la original

**Archivo:** TB `herramientas/historia-registro.js:90–95`, 153–160 y 393–408. **Condición:** entre la corrida con falla y la limpia aparece un evento que se aparta por `v:2`; su identificador usa la representación JSON `"integri\u0064ad"`, que decodifica a `integridad`. **Observado:** `pista()` conserva la secuencia de escape como caracteres literales. Crea el grupo ficticio `integri\u0064ad` con el hueco y deja el grupo real `integridad` sin huecos ni avisos; el grupo real afirma corrección. La CLI global sale con 1 por la entrada no admitida, pero las conclusiones de la sesión original quedan falsamente limpias. Es una entrada inválida por versión, con identificador JSON válido, precisamente el caso que la cuarentena debe atribuir correctamente.

**Sugerencia de solución:** si JSON pudo analizarse, obtener las pistas del objeto raíz ya decodificado y validar su tipo. Reservar la recuperación por texto para JSON roto; decodificar los escapes de sus cadenas antes de comparar identidades y tratar una pista ambigua como incierta. No crear una identidad distinta por la representación textual del mismo valor.

**Reproducción:** `pista-sesion-escapada`, con ambos grupos y las salidas CLI conservados. Añadir variantes de escape en equipo y sesión, y un control con identidad realmente diferente. No basta con comprobar el primer grupo del mismo equipo: debe verificarse la sesión exacta.

### INT-RES-05 · Baja · Horas numéricas admitidas por el esquema pueden tumbar la narración

**Archivo:** TB `herramientas/historia-registro.js:42–43`, 75, 577–579 y 746–759. **Condición:** `t=8640000000000001` o `t=1e20`, enteros finitos no negativos admitidos por el esquema, pero fuera de `Date`; también `registro_interrumpido.desde/hasta=1e20`. **Observado:** en los dos casos de `t`, `--json` sale 0 y `limpio:true`, mientras la salida de texto termina con `RangeError: Invalid time value` y stdout vacío. En un lote pierde también la narración de otra sesión válida. Con la interrupción, el capturador devuelve una sesión de error con cero corridas, perdiendo su historia construida, que contenía LED quemado. El límite exacto `8640000000000000` sí se narra. Tres fallos y un control de frontera, todos con cero errores de esquema.

**Sugerencia de solución:** validar por separado que cada valor temporal que se va a mostrar sea representable, o usar una representación alternativa segura. Aislar el dato no representable sin descartar los hechos ya extraídos ni la salida de otras sesiones, y hacer coherentes integridad/estado de salida entre texto y JSON. Si se quiere estrechar el esquema, documentar y acordar ese alcance; no hace falta inventar una hora de sustitución.

Estos valores no los produce un reloj normal del aula; el hallazgo es de robustez ante archivos alterados o dañados, no evidencia de frecuencia natural. Reproducciones: `hora-fin-fuera-Date`, `hora-interrupcion-fuera-Date`, `Date-maximo-mas-un-milisegundo`; control `control-Date-limite-maximo`.

## Coherencia documental pendiente

**DOC-01 · Baja.** `CONTRATO.md:304` y la descripción de `simulacion_detenida.datos.fallas` en `contrato/evento.schema.json` todavía afirman sin condiciones: «Si una falla aparece en una corrida y no en la siguiente, se corrigió». Esa interpretación queda superada por las decisiones de Efraín documentadas en COMO-FUNCIONA 68, que distinguen comparabilidad, pérdidas y «ya no se observó».

**Sugerencia de solución:** Claude alinea ambas explicaciones con el criterio ya autorizado, sin convertir una actualización de redacción en un cambio de formato o en otro permiso pendiente. Mantener la historia previa de las bitácoras. Codex no editó el contrato ni el esquema.

## Cobertura de la respuesta de Claude y siguiente paso

- **Comprobado en los casos originales:** igualdad exacta del C++ y sus fronteras R4b/INT-08; diferencias largas INT-09; modo/no idealidades/placa/pieza retirada INT-01; separación por equipo; aislamiento de las entradas inválidas originales; inicios repetidos; ruta duplicada/copia exportada; BOM, UTF-8 inválido y ruta ausente; eventos desconocidos y nombre `__proto__`; contradicción placa/circuito y tiempo de falla; conservación de los casos históricos. Son verificaciones de casos concretos, no cierre de toda combinación de las familias.
- **Segmentos sin fecha al revés:** se confirma la diferencia deliberada que Claude declaró. No se reordena por reloj, se avisa del inicio fuera de posición y no se asegura el final. No se devuelve como defecto por conservar aquel predicado diagnóstico antiguo. Los archivos con fecha oficial sí se ordenan y su regresión pasa.
- **Tipos nuevos:** se confirma aviso y CLI 1; el lector no interpreta sus efectos y conserva las demás conclusiones. Es la limitación declarada de un análisis con versión congelada, no soporte de semánticas futuras.
- **AUD-07/08:** continúan pendientes, separados y reproducibles en E2. No fueron corregidos en esta entrega y Claude no los presentó como corregidos. No se reabre AUD-02 ni otro cierre histórico por ellos.

**REG-004 vuelve a pendiente**, cierre null y reservas documentales liberadas. Claude toma/reserva y corrige estas familias, conserva los controles y entrega una versión identificable. Prioridad: criterio único de comparabilidad, alcance completo de huecos, transiciones causales y atribución decodificada; después robustez de fechas y alineación documental. Codex verifica los casos fallidos, regresiones y dependencias antes del cierre. Se conserva la aceptación humana registrada, sin confundirla con una aprobación técnica de estos adversos. AUD-07, AUD-08 y REG-005 mantienen el orden decidido por Efraín.

No se repitieron la suite global de TC, KiCad, simulador completo, compilador AVR, rendimiento, instalador, hardware ni aula; no cambiaron las fuentes afectadas por esas comprobaciones respecto de las versiones ya registradas. Electron comprueba integración local con datos sintéticos, no despliegue ni uso con aprendices. No se usaron registros privados, contenido de investigación ni imágenes de terceros.

Los diagnósticos nuevos viven en `%TEMP%`: `reg004-cla007-integral-e1-2026-10-20.cjs`, `reg004-cla007-integral-e2-2026-10-20.cjs`, `reg004-cla007-regresiones-2026-10-20.cjs` y `reg004-cla007-bordes-integridad-2026-10-20.cjs`. Los JSON permanentes contienen las entradas, resultados y salidas CLI para reconstruir los casos aunque desaparezca Temp. Informes e instrumentos propios revisados por su autor; no hubo segunda revisión independiente. Sin implementación de Codex, commit, push, etiqueta o publicación.
