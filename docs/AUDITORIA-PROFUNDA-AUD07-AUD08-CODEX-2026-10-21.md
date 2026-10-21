# Auditoría profunda de CLA-20261021-005 y del registro integrado

21 de octubre de 2026 · Codex (Sol), por encargo directo de Efraín: revisión amplia, estricta y una sola entrega de hallazgos y propuestas. **Resultado: el conjunto no está aprobado. Ocho familias de fallos reproducidos, con diecisiete variantes; tres de gravedad alta y cinco media.** Se entregan juntas, con una matriz de aceptación para corregirlas como un lote.

Las suites declaradas pasan, pero no cubren varias combinaciones de fallo. Lo más grave es que el lector puede declarar limpia una exportación incompleta o alterada y acreditar una corrección después de perder el archivo que advertía de un hueco. También acepta tramos temporalmente imposibles como si fueran evidencia coherente. No se encontraron únicamente problemas de mensajes en pantalla.

**Decisión de revisión:** AUD-07 vuelve a `pendiente` por F05/F06. El defecto original de AUD-08 —sobrescribir la primera exportación del mismo minuto— **sí queda verificado como corregido**, con su alcance explícito; F01 y F07 se registran por separado y bloquean considerar fiable el recorrido completo de exportar y analizar. Nuevas fichas AUD-09–AUD-14 para los problemas independientes. No se reabren por decreto los cierres históricos de sus casos originales.

## Alcance y versión

La instrucción nueva de Efraín amplía expresamente la revisión acotada anterior. Se cubrieron el diff completo de esta entrega, emisor del editor, IPC, escritura y configuración, cola y recuperación, interfaz, exportación y manifiestos, lectura y conclusiones, contrato y documentación, privacidad y límites de distribución. No se auditó de nuevo toda la electrónica del simulador ni se atribuye esta revisión a hardware, instalador o aula.

Versiones sin commit, en `main`: TC **`08947503c4ea9c02e4e7def4fb59a7daa1ae6f0d`**, TB **`720b908faa07023ec0129040e2e37eef4ef4066a`**, TS **`f6ccd45`** (identidad completa en manifiestos). El push previo es una declaración de Claude; esta auditoría identificó los commits locales y no verificó GitHub remotamente.

| Archivo de la entrega | SHA256 |
|---|---|
| TB `escritorio/registro-disco.js` | `f3c95c697df55c6eaa447fd22a04f4e60c09832fbb99f55419112eeafa5403d5` |
| TB `src/registro.js` | `ea2a8588f6ed562c5c6a735e667ce6d515ddd2ead1f75d5359f579ae34f0c6a3` |
| TB `src/app.js` | `417620db97c0fea96cab038b6f35bb41a67b920630e5dd1935b9ef027849d919` |
| TB `herramientas/historia-registro.js` | `427370cc7b4405f874afc1bee84778d3a31f2ab2e71195934dbb477a4cb034dd` |
| TC `contrato/evento.schema.json` | `d0a3d097bf057d318fd26963aa71f705cc3792fce1aa562e60f8472fac53275c` |

[Manifiesto inicial](aud0708-profunda-version-inicio-2026-10-21.json), [final](aud0708-profunda-version-final-2026-10-21.json). Diffs conservados con prefijo `aud0708-profunda-diff-`. Antes de editar se registraron Git, trabajo existente y reservas documentales. Fuentes, memorias de Claude y evidencias anteriores preservadas por hash; Codex no corrigió producto ni hizo commit/push.

## Hallazgos, por gravedad

| ID | Gravedad | Problema | Seguimiento |
|---|---|---|---|
| F01 | **Alta** | El lector ignora la integridad de la exportación y puede acreditar una corrección falsa | AUD-09 |
| F03 | **Alta** | Configuración JSON mal formada: excepciones, registro sin PIN válido o apagado silencioso | AUD-11 |
| F04 | **Alta** | Un `tramo` imposible evita la comprobación temporal y acredita corrección | AUD-12 |
| F02 | Media | Al combinar exportaciones se pierden repeticiones legítimas y cambia la historia | AUD-10 |
| F05 | Media | Se cuenta como anotado un descarte cuyo marcador no entró en la cola | AUD-07 |
| F06 | Media | El panel queda desactualizado y el aviso desaparece antes de cerrar la app | AUD-07 |
| F07 | Media | Un error de acceso al origen se presenta como «no hay registros» | AUD-14 |
| F08 | Media | Un byte UTF-8 roto hace apartar otra línea que sí era válida | AUD-13 |

### F01 · Alta · El manifiesto no participa en la lectura ni en las conclusiones

**Ubicación:** TB `herramientas/historia-registro.js:117–169`; escritor `escritorio/registro-disco.js:390–425`. El exportador sí genera `exportacion.json`, pero `leerArchivos()` solo busca `.jsonl`: nunca comprueba `completa`, `total`, archivos, tamaños, hashes o `pendientes`. La documentación reconoce que lo ignora; eso describe el problema, no controla su impacto.

**Cuatro reproducciones: lenguaje de la app frente al resultado del lector.**

1. Dos equipos A/B. La copia de B falla con ENOSPC sintético después de copiar A. `exportar()` devuelve `copia-incompleta`, 1 de 2, y el manifiesto dice `completa:false`. Pasar esa carpeta al lector produce **CLI 0, sin problemas de lectura y una historia aparentemente limpia de A**. B desaparece del análisis.
2. Exportación completa. Cambiar `delay(500)` por `delay(900)` únicamente en la copia conserva JSON y esquema válidos, pero rompe su SHA256. El lector la acepta con **CLI 0**; no informa la discrepancia.
3. Sesión repartida en tres fechas. El archivo intermedio contiene `registro_interrumpido` con una pérdida. Con los tres archivos, el resumen no asegura la corrección. Mover fuera de la copia únicamente ese archivo —el manifiesto sigue listándolo— cambia el resultado a **«Corregidas al final: LED quemado (led1). Sin corregir: ninguna», CLI 0**. No es una hipótesis: ambas salidas están conservadas.
4. Hay una sesión nueva esperando por ENOSPC y un archivo anterior completo. La copia dice `completa:true, pendientes:1`. El lector omite esa advertencia y vuelve a salir **0**. `completa` certifica la copia de los archivos disponibles, no la integridad de toda la captura; el consumidor no debe confundir ambas cosas.

**Impacto:** pérdida de equipos, modificaciones no detectadas y conclusiones de corrección sin evidencia suficiente. Los hashes de la exportación no protegen el análisis si nadie los verifica. No se afirma que sean firmas contra un adversario que también pueda reemplazar el manifiesto.

**Propuesta:** introducir una fase de admisión de exportaciones, anterior a los hechos y conclusiones. Validar versión/formato del manifiesto, `completa`, inventario y número de archivos, bytes y SHA256; conservar `pendientes` como una limitación explícita. Una exportación parcial o alterada debe salir con aviso/error y no acreditar conclusiones a través del segmento desconocido. Separar la lectura deliberada de registros crudos de la lectura de una exportación certificada; no imponer retrospectivamente un manifiesto a todo JSONL antiguo. Los nombres del manifiesto deben limitarse a archivos del directorio admitido. Ante versiones desconocidas, declarar qué no se verificó.

**Aceptación:** las cuatro reproducciones dejan de salir limpias; la tercera conserva la incertidumbre. Una copia íntegra sigue pasando. Cubrir manifiesto ausente en una exportación identificable, JSON roto, `completa:false`, archivo ausente/adicional, tamaño/hash distintos y `pendientes>0`. Documentar cuándo se permite inspección parcial y cómo se impiden conclusiones definitivas. **Origen:** omisión de integración de la nueva función de manifiestos con el lector.

### F03 · Alta · Las dos lecturas de configuración no validan la misma estructura

**Ubicación:** TB `escritorio/registro-disco.js:62–80`, `comprobar()`, `vaciar():247`, `escribir():351–352`; `main.js`, receptor `tb:registrar`. Que el contenido se pueda parsear como JSON no significa que sea una configuración válida.

**Cuatro variantes ejecutadas, en carpetas sintéticas:**

| Contenido de `registro-config.json` | Observado |
|---|---|
| `null` | `escribir()` lanza **TypeError al leer `activo`**; contradice su promesa de no lanzar. `estado()` sí lo considera ilegible: los caminos discrepan. |
| `[]` | `configIlegible:false`, registro aparentemente apagado y escritura rechazada sin una falla de configuración. |
| `{ "activo": true }` | `activo:true`, `tienePin:false`, sin falla; el módulo acepta la escritura. |
| `{ "activo": true, "pin": {} }` | El estado lo considera activo y con PIN, pero entrar con el PIN lanza `ERR_INVALID_ARG_TYPE` al construir el hash esperado. |

**Impacto:** ante una configuración dañada pero parseable, puede haber escritura sin configuración válida, cese silencioso de captura o una excepción que llega a un receptor IPC sin protección equivalente. Se reprodujeron las excepciones del módulo; **no se afirma haber demostrado la terminación del proceso Electron**. La gravedad corresponde a integridad/disponibilidad del registro y a tratar como válido el estado activo sin PIN, no a un ataque remoto demostrado.

**Propuesta:** un único lector con validación estructural compartida para `estado`, `escribir` e instructor: objeto no nulo/no array, `activo` booleano y metadatos de PIN con tipos, formato y longitudes válidos. Permitir únicamente los estados iniciales sin PIN que el producto admita; no admitir activo sin una configuración de instructor válida. La configuración inválida debe quedar visible como CONFIG y seguir la recuperación con respaldo de AUD-02. Ningún dato de configuración debe provocar una excepción no controlada del registrador/IPC.

**Aceptación:** las cuatro variantes, tipos escalares, `activo` de tipo incorrecto y sal/hash mal formados fallan de forma explícita y consistente, sin habilitar captura ni perder el archivo original. Conservar creación normal, apagado, PIN correcto/equivocado, bloqueo, recuperación de archivo/carpeta y rollback de AUD-02-V4. **Origen:** debilidad preexistente; los casos sintácticamente rotos del cierre anterior no acreditaban estos casos nuevos. AUD-11 separa ese alcance.

### F04 · Alta · `tramo` se usa como evidencia sin comprobar que ese tramo exista

**Ubicación:** TB `herramientas/historia-registro.js:563`, 737–749. Se valida que el campo sea un entero no negativo, pero no que sea compatible con los RESET observados. Comparar únicamente ocurrencias y cierres de igual tramo permite eludir la comprobación asignándoles tramos distintos e imposibles.

**Tres reproducciones con líneas válidas por esquema:**

- Falla a **1500 ms, tramo 1**, sin ningún RESET; cierre a **1000 ms, tramo 0**.
- Falla a **1500 ms, tramo 0**; cierre a **1000 ms, tramo 9**, también sin RESET.
- Pausa/reanudación a **1500 ms, tramo 9**; cierre a **1000 ms, tramo 0**.

Una corrida posterior comparable y limpia hace que las tres terminen con **`coherente:true`, «Corregidas al final: LED quemado», CLI 0 y sin avisos**. El control de una foto realmente anterior al RESET que llega después sigue pasando.

**Impacto:** datos temporalmente contradictorios aceptados como base para inferir corrección. Son pruebas adversas del **consumidor** ante archivos dañados/editados o un emisor futuro defectuoso; no se observó que el emisor normal actual produzca esos tramos.

**Propuesta:** validar el ciclo de vida del reloj: una corrida empieza en tramo 0; cada RESET de botón acredita el siguiente tramo; se permiten fotos tardías de tramos anteriores, pero no hechos de un tramo que aún no existe. El cierre debe corresponder al tramo actual acreditado. Si faltan marcadores o se mezclan registros antiguos y nuevos sin poder acreditarlo, declarar incertidumbre, sin inventar la época ni desactivar el control de tiempos.

**Aceptación:** las tres variantes quedan incoherentes/no comparables; conservar foto previa antes/después, cierre nuevo mayor, RESET en pausa, reinicios por energía y los controles de 03a/03b. Añadir en el mismo lote salto de tramo, marcador de RESET inconsistente y cierre de tramo anterior. **Origen:** debilidad del lector anterior a esta entrega, fuera de la verificación acotada que Efraín había pedido para 03c; nueva ficha AUD-12, no invalidación retroactiva del caso original aprobado.

### F02 · Media · La deduplicación entre exportaciones elimina eventos legítimos

**Ubicación:** TB `herramientas/historia-registro.js:449–458`. El mapa recuerda el texto de una línea y el primer archivo. En otro archivo elimina **todas** las líneas iguales a ese texto, sin considerar su multiplicidad ni la secuencia común de los snapshots.

**Reproducción válida por esquema:** primera exportación con un alta de `r1`; después baja y nueva alta idéntica, con el mismo milisegundo, y fin de sesión; segunda exportación. Leer solo la última dice **«agregó r1 (resistencia)»**. Leer ambas dice **«hizo cambios y los deshizo»**. Ambas CLI salen **0, sin avisos**. La segunda alta real se confundió con la línea de la primera copia. No se necesitó sobrescribir ninguna exportación.

**Impacto:** la misma sesión produce historias distintas según se entregue solo la copia reciente o también una anterior. Puede cambiar el estado final narrado de una pieza. La prueba existente solo comprobaba que apareciera una nota de deduplicación, no que la historia fuera equivalente.

**Propuesta:** deduplicar por identidad de evento o por un solapamiento acreditado de secuencias/posiciones, conservando las repeticiones dentro del origen. Para snapshots crecientes del mismo archivo, comprobar el prefijo común y usar la secuencia completa; si no son compatibles, avisar del conflicto en lugar de fusionar silenciosamente. Un ID/secuencia estable del emisor sería otra opción y exigiría decisión de contrato.

**Aceptación:** `historia(última)` y `historia(primera, última)` son equivalentes en este caso; conservar dos repeticiones legítimas, copias idénticas, varios días y entradas en distinto orden. No deduplicar globalmente solo por el contenido. **Origen:** limitación preexistente de REG-004, nueva ficha AUD-10.

### F05 · Media · «Anotado» no distingue un marcador perdido por cola llena

**Ubicación:** TB `escritorio/registro-disco.js:203–234`; `src/app.js:1572–1578`. `encolar()` no devuelve si aceptó la línea; `descartar()` no ajusta `sinAnotar` si el `evento_descartado` tampoco cabe.

**Reproducción:** ENOSPC sintético, llenar las **5000 líneas** de cola y mandar un evento demasiado grande. El estado dice **`cantidad:1, sinAnotar:0`**. Tras recuperar el disco no existe ningún `evento_descartado`. Sí aparece `registro_interrumpido` con `perdidos:1`: hay una advertencia genérica de pérdida, pero no el marcador con tipo/motivo que se prometió guardar. El texto del instructor calcula a partir de esos contadores que quedó anotado.

**Propuesta:** hacer observable el resultado de encolar/escribir el marcador y separar, como mínimo, anotación pendiente, guardada y no anotada. No llamar guardado a lo que solo espera en memoria. Si se pierde el marcador, conservar la advertencia y contarlo explícitamente; mantener el aviso de AUD-02 sin doble conteo.

**Aceptación:** cola por debajo/exactamente/al límite, pérdida por número y por tamaño, recuperación y apagado. El conteo y el mensaje deben cuadrar con los marcadores efectivamente conservados. **Origen:** combinación nueva de AUD-07 con el límite existente de AUD-02; se conserva el cierre de AUD-02 en sus casos originales.

### F06 · Media · Dos fallos de la proyección del estado a la interfaz

**Ubicación:** TB `src/app.js:1509`, 1533–1536 y 1753–1754. **Electron real, sin errores de consola:**

1. Abrir el panel después de un descarte y provocar otro mientras sigue abierto. La esquina dice **2 eventos**, el estado tiene cantidad 2, pero el panel sigue diciendo **1 evento**. Solo se construyó al abrirlo; el callback no actualiza esa parte visible. [Captura](aud0708-profunda-panel-abierto-2026-10-21.png).
2. Apagar el registro sin cerrar la app. `descartados.cantidad` sigue en 2, pero el aviso queda **oculto**. Contradice el requisito y la explicación «hasta cerrar la app». [Captura](aud0708-profunda-aviso-tras-apagar-2026-10-21.png).

**Propuesta:** una proyección común del estado de descartes para esquina y panel que se actualice al recibir la señal; mantener el aviso de pérdida visible hasta el cierre aunque la captura se apague, distinguiendo «registro apagado» de «hubo pérdidas». Respetar la prioridad visual de falla de disco/configuración.

**Aceptación:** pérdida con panel cerrado/abierto, primer descarte durante el panel, dos descartes consecutivos, apagar/encender, prioridad frente a falla de disco y reapertura de la app que reinicia la cuenta. Verificar texto, visibilidad y cantidad, no solo la variable interna. **Origen:** fallos de esta entrega; AUD-07 no se cierra.

### F07 · Media · Una carpeta inaccesible se confunde con una carpeta vacía

**Ubicación:** TB `escritorio/registro-disco.js:377–391`; mensaje del panel de exportación. `archivos()` captura cualquier excepción y devuelve `[]`.

**Reproducción:** con registros presentes, inyectar EACCES exclusivamente al enumerar su directorio. `exportar()` devuelve **`sin-archivos`**. La app lo traduce a **«Todavía no hay registros en este computador»**, en vez de informar que no pudo leerlos.

**Propuesta:** distinguir ausencia legítima de archivos de EACCES/EIO u otros fallos de lectura; devolver causa y mensaje accionable. Mantener el comportamiento vacío para una carpeta que todavía no se creó. No es necesario convertir un fallo de exportación en una falla de escritura, pero sí conservar su causa.

**Aceptación:** origen vacío, origen inexistente al instalar, directorio sin permisos, EIO y archivo que desaparece durante la copia; el último sigue produciendo copia incompleta y no destruye destinos previos. **Origen:** comportamiento preexistente del listado, nuevo hallazgo AUD-14; no niega que el conflicto de nombres de AUD-08 esté corregido.

### F08 · Media · La recuperación de UTF-8 invalida una línea distinta de la dañada

**Ubicación:** TB `herramientas/historia-registro.js:146–158`. Si algún byte del archivo no se decodifica, se marca el archivo entero como `utf8Malo`; después se aparta cualquier línea que contenga `�`.

**Reproducción:** una línea válida de C++ contiene el carácter **U+FFFD** como texto legítimo. Otra línea distinta contiene un byte 0xFF inválido. El lector aparta **las dos líneas**, aunque solo una tenía bytes incorrectos, y pierde el C++ válido de la primera. Que el glifo coincida con el reemplazo del decodificador no demuestra corrupción en esa posición.

**Propuesta:** separar líneas por los bytes de LF y decodificar cada una en modo fatal, con tratamiento de BOM solo al comienzo del archivo. Mantener posiciones exactas y el U+FFFD legítimo. Otra implementación que identifique inequívocamente los rangos de bytes dañados también sirve.

**Aceptación:** solo se aparta la línea realmente dañada; pasan U+FFFD legítimo solo y junto a otra línea rota, UTF-8 multibyte en límites de bloque/línea, CRLF y BOM. **Origen:** comportamiento preexistente del lector; nueva ficha AUD-13.

## Riesgos y límites: no confundirlos con fallos ya reproducidos

Estos puntos completan la evaluación sin inflar el número de defectos. Para cada uno se indica la mejora propuesta y qué falta acreditar.

| Riesgo/límite | Evidencia o condición | Propuesta y criterio de salida |
|---|---|---|
| Bloqueo y memoria del proceso principal | Exportación síncrona; `readFileSync` carga cada JSONL entero para su SHA256. El coste crece con el mayor archivo, sin un tope diario. No se hizo una prueba de volumen extremo. | Copia y hash por bloques fuera del hilo de UI, progreso y cancelación; probar volumen representativo del periodo completo, errores/cancelación y orden de eventos. La cancelación deja un destino explícitamente incompleto. |
| El límite en caracteres no limita el coste previo del IPC | El rechazo ocurre después de copiar el objeto al proceso principal y convertirlo a JSON. La frontera con texto de tres bytes pasó: **2 097 152 unidades → 6 291 078 bytes**. Eso acredita la unidad usada, no resistencia a mensajes arbitrariamente grandes. | Prevalidación/prepresupuesto antes de cruzar IPC y defensa acotada en el principal; conservar Unicode, los límites de cola y la anotación del rechazo. Medir latencia/memoria con entradas grandes sintéticas sin rebajar umbrales. |
| Pérdida al cerrar con disco averiado | La cola es de memoria; `will-quit` hace un último intento. Si sigue sin poder escribir, lo pendiente se pierde, como está declarado. | Si el objetivo es no perder esos eventos, hace falta almacenamiento alternativo o un diario durable y una decisión de coste/privacidad. Si se mantiene este diseño, advertencia inequívoca antes de cerrar y criterio de sesión no acreditada. No prometer pérdida cero. |
| Persistencia física de la USB | Copiar, releer y calcular hash no equivale a acreditar durabilidad tras una extracción. No se ejecutó desconexión física ni se validaron los permisos de una USB real. | Prueba controlada por Efraín, expulsión segura y verificación del manifiesto al reabrir la copia. Distinguir copia lógica completa de persistencia física; no certificarla con mocks de `fs`. |
| Fuente de tiempo y colocación de marcadores | El marcador de descarte usa la hora de recepción, no conserva necesariamente `t` del evento perdido. Los archivos se ordenan por fecha del nombre y se advierte cuando el reloj retrocede. | Documentar esa semántica; para orden fuerte, secuencia estable monotónica del evento. Probar cambio de fecha/reloj y recuperación sin convertir el orden de las fechas en evidencia causal. No se reprodujo un defecto adicional de medianoche en esta auditoría. |
| Versiones y procedencia | `version_tb`/`version_tc` identifican versiones; el desarrollo comparte números entre cambios sin commit. Un hash de los JSONL no identifica por sí solo el programa que los produjo. | Conservar versión congelada, hashes del paquete/revisor y condiciones junto a las exportaciones del estudio. Resolverlo en REG-005/DIST-001 antes de distribución; los manifiestos de esta auditoría sí identifican su working tree. |
| El lector no es un analizador portable del instalador | Depende de Node y del revisor del repositorio hermano; sin él declara validación mínima. El instalador no se probó aquí. | Entrega/versionado independiente de la herramienta de análisis o paquete explícito de análisis, con prueba sin red en la máquina destino y validación completa; no usar una conclusión semántica como acreditada si faltó el revisor. |
| PIN y privacidad | El PIN protege acciones de la app; los JSONL están en archivos locales legibles por quien tenga permisos de Windows. C++ sin comentarios todavía conserva cadenas, y el código de equipo es texto introducido por personas. No se observaron datos reales: todas las pruebas fueron sintéticas. | Configuración del instructor antes del aula, permisos de carpeta y política de copia/retención; revisión del contenido antes de compartir. No llamar anonimización a quitar comentarios ni presentar el PIN como cifrado o autenticación de los archivos. No cambiar la política de preservar literales sin decisión de Efraín. |
| Retención y crecimiento | No hay rotación/cuota de registros en esta función; el disco lleno activa la cola finita y luego pérdidas. | Definir retención y archivado, umbral de espacio y aviso previo con Efraín; probar disco con poco espacio. Separar eliminación autorizada de archivos de aprendiz de una limpieza automática del software. |
| Atribución de corrección y de programa | La historia compara condiciones registradas y presencia de piezas por id/tipo; no demuestra causa pedagógica ni identidad física. El HEX ejecutado no queda ligado criptográficamente a una compilación en el inicio de cada corrida. | Mantener el vocabulario limitado a lo observado; si el estudio exige atribución más fuerte, definir identidad de instancia/programa/compilación y sus huellas antes de ampliar el contrato. No presentar esta auditoría como validación del aprendizaje. |
| Límites declarados de la entrega | 1000 destinos por minuto; contador en memoria; descartes sin equipo o sin sobre suficiente; IPC que impide incluso enviar el marcador. Son límites expresos, no nuevas reproducciones ocultadas como aprobaciones. | Mantenerlos visibles y definir la consecuencia para el análisis. Si cambian los objetivos de aceptación, convertirlos en trabajo concreto. La cuenta en memoria no sustituye al registro persistido; F05 trata la afirmación falsa sobre un marcador concreto. |

## Qué sí se verificó de la respuesta de Claude

- La corrección original de **AUD-07** funciona en las fronteras inferior/exacta/superior de 2 Mi unidades, con ASCII, ñ y emoji. La variante de tres bytes también pasa sin truncar. Registro apagado no cuenta pérdidas; un evento pequeño se escribe. Ciclos/BigInt y fallo de clonación tienen los controles entregados; el esquema nuevo pasa sus 189 comprobaciones. Esto no cubría la saturación de la cola ni las dos condiciones de interfaz nuevas.
- El defecto original de **AUD-08** está eliminado: dos exportaciones del mismo minuto usan destinos distintos y la primera conserva bytes/hash después de eventos nuevos. `mkdir` exclusivo y `COPYFILE_EXCL` se preservan; fallos de copia/manifiesto se anuncian como incompletos. **El consumidor posterior no usa esas garantías: F01.**
- Contrato 6.1, esquema, ambas bitácoras y «Proyecto hermano» recogen el evento nuevo. No se cambió la unidad del límite a bytes: es una decisión declarada y se comprobó su frontera real.
- Las pruebas generales no mostraron errores JS registrados. Se inspeccionó la sección `ERRORES` de ambos scripts, además del exit 0; los avisos pedagógicos de los ejemplos no se confundieron con errores JS. No se observó una regresión funcional de los casos nominales anteriores.

## Ejecuciones y evidencia

| Comprobación ejecutada | Resultado |
|---|---|
| `npm.cmd --prefix ../TecnoBloques run test:registro` | **174 OK**, exit 0 |
| `npm.cmd --prefix ../TecnoBloques run test:historia` | **146 OK**, exit 0 |
| `npm.cmd --prefix prototipo run probar:contrato` | **189 OK**, exit 0 |
| `npm.cmd --prefix ../TecnoBloques run test:registro-app` | **99 OK**, exit 0; incluye 11 sesiones sintéticas anteriores sin avisos y otra sesión para descartes/exportaciones; consola sin errores |
| `npm.cmd --prefix ../TecnoBloques run test:registro-preprocesador` | **74 OK**, exit 0 |
| `npm.cmd --prefix ../TecnoBloques run test:herramientas` | **6 OK**, exit 0 |
| `npm.cmd --prefix ../TecnoBloques run test:simulador` | **53 OK**, exit 0, consola/JS comprobados |
| `npm.cmd --prefix ../TecnoBloques test` | Exit 0; inspeccionados los errores registrados de ambos scripts |
| Diagnóstico Node integral | **23 casos: 15 reproducciones de incumplimiento, 7 controles conformes y una hipótesis excluida por entrada fuera del contrato JSON**. Diagnóstico exit 1, cero errores del instrumento en la ejecución integral. |
| Diagnóstico Electron adicional | **2/2 condiciones defectuosas reproducidas**, cero errores de consola. Diagnóstico exit 1; capturas verificadas. |
| Diff/preservación/coordinación | Hashes iniciales/finales; diff y comprobador del piloto en los logs de cierre |

**En conjunto: 25 escenarios diagnósticos, 17 variantes de fallo agrupadas en 8 familias.** No son 17 tareas ni 17 fallos de las suites oficiales. No se mide con esto una frecuencia natural de ocurrencia ni una probabilidad de error.

Instrumentos: [Node](diagnosticar-aud0708-profunda-2026-10-21.cjs), [Electron](diagnosticar-aud0708-electron-2026-10-21.cjs), [orquestación](auditar-aud07-aud08-2026-10-21.py). Evidencia principal: [Node integral](aud0708-profunda-diagnosticos-integrales-2026-10-21.json), [Electron](aud0708-profunda-diagnosticos-electron-2026-10-21.json), [suites](aud0708-profunda-suites-2026-10-21.json). Los casos de metadatos temporales, copia y multiplicidad incluyen entradas o salidas CLI; los mocks se restringen a rutas temporales propias y se restauran en `finally`. Los diagnósticos salen con 1 cuando reproducen un incumplimiento; no son regresiones aprobadas.

Se conservaron los ensayos de construcción del instrumento. En el primer ejemplo de deduplicación faltaba `datos.tipo` de la baja y el fin tenía una hora anterior; se corrigió **solo el dato sintético**, se verificó su esquema y se repitió el diagnóstico completo. La hipótesis NaN/undefined se excluyó de los fallos acreditados porque no era una entrada JSON del emisor normal. El informe usa la ejecución **integral final identificada por hash**, no esos ensayos, para sus resultados. No se ocultaron como aprobaciones ni como defectos de producto.

No se ejecutaron nueva suite global de TecnoCircuito, KiCad, benchmark formal, instalador, validación física, USB real ni uso con aprendices: no se hicieron cambios de motor/pads ni se está aprobando un candidato distribuible. Las mediciones de rendimiento siguen siendo las de informes anteriores, no resultados nuevos de esta auditoría.

## Plan conjunto de corrección y aceptación, para evitar rondas por casos aislados

| Paquete de trabajo de Claude | Casos que deben quedar resueltos juntos | Controles que se deben preservar |
|---|---|---|
| 1. Admisión de exportaciones (F01/AUD-09) | Parcial, alteración válida, segmento omitido, pendientes; versión/esquema/inventario/hash | Copia completa; lectura explícita de crudos; no pisar destinos y no modificar origen |
| 2. Unión de snapshots (F02/AUD-10) | Prefijos crecientes, multiplicidad, conflictos y orden | Alta/baja/alta real, copias idénticas, varios días, historia igual a la última copia completa |
| 3. Configuración (F03/AUD-11) | Todas las formas JSON inválidas y tipos de campos/PIN | Estados iniciales permitidos, PIN/bloqueo, respaldo y recuperación AUD-02-V4 |
| 4. Relojes del lector (F04/AUD-12) | Tramos no acreditados, cierre/RESET inconsistente | Fotos anteriores tardías, RESET en pausa, energía y 03a/03b |
| 5. Cola y estado visible (F05/F06/AUD-07) | Marcador que no cabe, pendientes frente a guardados, actualización del panel y aviso al apagar | Fronteras Unicode, apagado antes de cualquier pérdida, prioridad disco/configuración, cuenta reiniciada solo al cerrar |
| 6. Errores de origen y decodificación (F07/AUD-14 y F08/AUD-13) | Lectura inaccesible frente a vacía, línea UTF-8 dañada frente a U+FFFD legítimo | Copia parcial bien señalada, BOM/CRLF, demás sesiones conservadas |

Claude puede ordenar los paquetes para evitar editar simultáneamente los mismos archivos; ninguna ficha nueva supone implementación iniciada. Reproducir primero, corregir las causas y añadir la matriz completa, no ajustar el diagnóstico para que deje de detectar el defecto. Después de cambios se verifica ese lote contra su diff y versiones exactas: no se promete aprobación automática de una implementación futura ni se propone otra auditoría abierta como sustituto de esta entrega.

**Conclusión de entrega:** no hay visto bueno del conjunto de CLA-005. AUD-07 requiere corrección; AUD-08 tiene verificado su caso original con los límites indicados; AUD-09–AUD-14 quedan pendientes. REG-005 no se inicia por Codex ni se da por concluido. Los cierres históricos conservan sus comprobaciones en su alcance y los pendientes físicos de LAB-001/LAB-002 no cambian. Todos los hallazgos de esta auditoría se presentan juntos con su propuesta y aceptación; ninguna revisión finita garantiza que no exista otro defecto.

Informes e instrumentos propios revisados por su autor, sin segunda revisión independiente. Solo datos sintéticos; sin investigación privada, datos de aprendices o tablas de alias. Sin programación de producto, edición de memorias de Claude, commit, push, etiqueta ni publicación de Codex.
