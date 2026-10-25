# Auditoría completa de REG-005 · 22 de octubre de 2026

Autor: Codex (Sol), auditor y supervisor. Implementador: Claude. Encargo de Efraín: auditoría completa de REG-005, errores y riesgos con una posible solución para cada uno.

**Dictamen: devuelta para corrección; no hay visto bueno técnico del conjunto.** Se acreditan **9 defectos funcionales**, **1 defecto de comprobación** y **2 incoherencias documentales**. R02 tiene dos variantes, no dos defectos independientes. R05 y R07 corresponden a la misma tarea de conservación del proyecto, con dos reproducciones distintas. Las pruebas nominales aprobadas y los cierres históricos se conservan en su alcance; estos casos nuevos no reabren automáticamente AUD-01–AUD-14.

No se implementó código de producto, no se editaron las memorias de Claude y no se hizo commit, push, etiqueta ni publicación. Los instrumentos e informe de Codex fueron revisados por su propio autor; no hubo una segunda revisión independiente ni subagentes. Las reproducciones que fallan **no son regresiones aprobadas**. Una auditoría finita no permite prometer ausencia de todos los defectos posibles.

**Referencia exacta.** Entrega CLA-20261022-002 sin commit: TC main `cfeee9b`, TB main `1c6c660`, TS main `a3c8ca2`. Se revisaron sus diffs, implementación del registro y sus consumidores, contrato, esquema, documentación, pruebas y riesgos anteriores. El [manifiesto inicial](reg005-auditoria-2026-10-22/inicio-version.json) identifica HEAD completo, rama, trabajo previo y SHA256 de los archivos versionados de los tres productos; los diffs iniciales están en esa misma carpeta. La captura intermedia confirmó **cero archivos versionados alterados** respecto de la apertura, incluidos fuentes, memorias y artefactos reconstruidos.

Las evidencias solo contienen datos sintéticos. Se usaron perfil temporal propio de Electron, Worker real con reloj/canal controlados y fallos de disco/transporte inyectados en rutas o instancias propias. Las subidas del diagnóstico propio se sustituyeron en el IPC: **no se subió a una placa real**. Los diagnósticos de concurrencia controlan las esperas para hacer deterministas las intercalaciones; acreditan su posibilidad, no su frecuencia en el aula.

La [comprobación final de preservación](reg005-auditoria-2026-10-22/preservacion.json) confirma fuentes y memorias de Claude idénticas a la apertura; los únicos archivos previamente versionados que Codex cambió son las bitácoras y la coordinación listadas allí. También identifica por hash los cuatro artefactos construidos/distribuidos inspeccionados. [Versión final](reg005-auditoria-2026-10-22/final-version.json) y [huellas de evidencias](reg005-auditoria-2026-10-22/huellas-evidencia.json). El comprobador de TecnoSuite terminó con 36 fichas, 61 documentos, cero errores y cero avisos; no acredita por sí mismo el software.

**Resultados ejecutados.** Logs y comandos en [ejecuciones](reg005-auditoria-2026-10-22/ejecuciones.jsonl).

| Comprobación | Resultado y límite |
|---|---|
| `npm.cmd run probar`, TC completo | **Fallido:** 1251 comprobaciones `OK`, una `FALLA` en el último recorrido de registro. Build, Node, fixtures, KiCad real Uno/Nano y los demás recorridos Chromium terminaron. KiCad 10.0.3 ejecutado, sin omisión. No presentar este comando como aprobado. |
| Repetición aislada de `probar_registro.py` | **Aprobado:** 18/18 sin cambiar fuentes ni criterio. El fallo original se conserva y se explica en R08. |
| TB `test:registro`, `test:historia` | **Aprobados:** 204 y 198. |
| TB `test:registro-preprocesador` | **Aprobado:** 74 comprobaciones, incluidos 2000 programas con semilla 20261018 frente a avr-g++, con idempotencia. |
| TB `test:registro-app` | **Aprobado:** 115/115, sin errores JS, incluido el lote nuevo de la sección 10. |
| TB `test:simulador`, `test:graficador` | **Aprobados:** 53 y 28, con paquete TC local. |
| TB `npm.cmd test` | **Aprobado en su alcance:** exit 0, revisadas las dos secciones `ERRORES:`; no contienen errores JS. Los avisos pedagógicos intencionales no se cuentan como excepciones. |
| Instrumentos históricos sin editar | **Aprobados:** aceptación CLA-007 14/14 y auditoría profunda AUD-07/08 23/23. |
| Diagnóstico propio Node | **Fallido deliberadamente:** 9 escenarios, 6 incumplimientos en 5 familias y 3 controles conformes. R02 aporta dos incumplimientos. |
| Diagnóstico propio Electron | **Fallido deliberadamente:** 4 reproducciones y un control conforme; cero errores JS no controlados. |

El primer intento aislado no pudo construir por restricciones de acceso de esbuild; se repitió con las herramientas locales fuera de ese aislamiento. Ese impedimento de entorno no se contabiliza como defecto del producto. Las cifras anteriores proceden de las ejecuciones reales, no de la entrega de Claude. No hubo benchmark formal de velocidad, instalador, prueba de actualización, USB física, hardware ni aula. El permiso para dispositivos que Electron enumera no implica que el diagnóstico los haya usado.

**Hallazgos reproducidos, por impacto.** Los números de línea corresponden a las fuentes identificadas en el manifiesto. Las prioridades de las fichas no sustituyen la decisión de Efraín.

**R01 · Alta · Una pieza reemplazada conserva la identidad para comparar fallas.**

- Archivo: [TB historia-registro.js:406](../../TecnoBloques/herramientas/historia-registro.js#L406), creación de `piezas` en 799 y tratamiento de cambios en 673. El lienzo puede reutilizar identificadores, [TC lienzo.js:1051](../prototipo/src/lienzo.js#L1051).
- Condición: corrida 1 con `led1` quemado; baja de `led1`; alta de otro LED con el mismo `id` y tipo; corrida 2 sin esa falla. Todos los eventos cumplen el esquema, ambas corridas están confirmadas y no hay huecos.
- Observado: `corrigio` incluye el LED anterior y el resumen dice «Corregidas al final: LED quemado (led1)», sin aviso. El lector compara id y tipo, y no su continuidad. El control con la misma pieza también declara corrección, como corresponde.
- Impacto: se atribuye a la pieza que seguía una desaparición de falla que corresponde a su sustitución. No satisface «la pieza sigue» del contrato.
- Posible solución: mantener una generación por pieza en el lector y cortar la comparación al observar baja/alta o sustitución de proyecto. Si no puede acreditar continuidad, decir «ya no se observó: se reemplazó la pieza». Un identificador persistente futuro puede ayudar, pero la protección conservadora no necesita cambiar el circuito público.
- Regresión exigida: misma pieza; baja/alta con mismo id y mismo tipo; mismo id con otro tipo; reemplazo de proyecto; resumen y comparación entre corridas. Seguimiento: **AUD-15**.

**R02 · Alta · `confirmado: true` puede acompañar una corrida que perdió hechos; el fallo periódico también detiene el reloj sin informar al controlador.**

- Archivos: [trabajador.js:53](../prototipo/src/trabajador.js#L53), 60, 88 y 120; [simulador.js:244](../prototipo/src/simulador.js#L244); [nucleo.js:722](../prototipo/src/nucleo.js#L722).
- Condición original: el núcleo acumula fallas durante 15 ms; falla el envío de la foto de antes del RESET; después funcionan la foto nueva y el cierre. `nucleo.foto()` ya retiró sus fallas de la lista de pendientes antes de que `postMessage` falle.
- Observado: dos avisos de error en el canal de prueba, ninguna falla entregada y cierre `{fallas: [], confirmado: true}`. Sin fallo de transporte, el control entrega las dos fallas y confirma correctamente. La protección de TC-6 solo informa del fallo de la última foto, no de las anteriores.
- Variante periódica: si falla `enviarFoto` en `ciclo`, la excepción sale del callback y no se programa la vuelta siguiente. Tras 80 ms adicionales no hay actividad; una orden posterior de detener puede producir una foto y confirmación normales. No se reproduce un límite de memoria real: se reproduce la respuesta del software ante un error de transporte controlado.
- Impacto: el lector carece de información para excluir una corrida incompleta y puede interpretar la ausencia de falla como resultado íntegro; además la interfaz puede quedar diciendo que sigue una simulación cuyo reloj se congeló.
- Posible solución: conservar un estado de integridad por corrida, que cualquier fallo de extracción/envío vuelva incompleto hasta la siguiente corrida nueva, reutilizando `confirmado: false`. Conservar/reintentar los hechos retirados cuando sea viable. Proteger también la vuelta periódica y comunicar una parada/error recuperable al controlador. No requiere el rediseño de timestamps del núcleo que Efraín aplazó.
- Regresión exigida: pérdida antes de RESET, pérdida periódica, fallo de última foto, recuperación y corrida nueva limpia; emisor → lector sin acreditar corrección a través de una pérdida. Seguimiento: **AUD-16**.

**R05 · Alta · El temporizador del proyecto A introduce su C++ en el proyecto B.**

- Archivo: [TB app.js:879](../../TecnoBloques/src/app.js#L879).
- Condición: abrir un proyecto A con `texto` y, antes de los 200 ms, otro B sin `texto`. Los dos abren correctamente.
- Observado en Electron: el nombre es B, el modo texto queda encendido y `codigoActual()` y `proyectoActual().texto` contienen el marcador exclusivo `SOLO_A`. El autoguardado puede persistir esa mezcla.
- Impacto: programa, proyecto y circuito dejan de corresponder; se puede compilar, guardar o analizar el programa de otro proyecto.
- Posible solución: cancelar el temporizador pendiente al cambiar de proyecto y proteger su callback con una generación de carga. Preferir aplicar el estado de texto como parte de la misma carga cuando el editor ya esté preparado.
- Regresión exigida: A→B y A→B→C antes de ejecutarse el callback, B sin texto y B con texto propio; comprobar compilación y autoguardado. Seguimiento conjunto con R07: **AUD-19**.

**R07 · Alta · Abrir un proyecto inválido pierde el C++ editado del proyecto anterior.**

- Archivo: [TB app.js:856](../../TecnoBloques/src/app.js#L856): sale del modo texto antes de capturar `previo`.
- Condición: el proyecto actual tiene C++ manual con el marcador `CONSERVAR=42`; se intenta abrir un proyecto con un bloque desconocido.
- Observado en Electron: la apertura devuelve error y se restauran nombre, placa y bloques anteriores, pero `texto` pasa a `null`, el modo texto queda apagado y el código activo es el generado por los bloques. El respaldo ya se había tomado sin el texto.
- Impacto: pérdida de trabajo propio, aunque la app diga que no pudo abrir el archivo nuevo. Recuperar solo la placa en TB-8 no conserva el proyecto completo.
- Posible solución: capturar todo el proyecto y estado de edición **antes** de cualquier mutación; restaurarlos juntos si falla. Asegurar que una carga fallida tampoco deja temporizadores o autoguardados del intento.
- Regresión exigida: fallo en modo bloques y texto; igualdad del C++ manual, placa, nivel, circuito, librerías y respaldo/autoguardado después del rechazo. Seguimiento: **AUD-19**.

**R10 · Alta · Se analiza contenido distinto del que pasó la comprobación SHA256.**

- Archivo: [TB historia-registro.js:143](../../TecnoBloques/herramientas/historia-registro.js#L143), lectura posterior en 229.
- Condición: una copia exportada cambia entre la lectura para admitirla y la lectura para analizar sus líneas. El instrumento reemplaza únicamente su archivo temporal después de devolver el primer buffer; no cambia el manifiesto ni falsifica la respuesta del hash.
- Observado: dos lecturas, `problemas: []`; los bytes cuyo hash se verificó decían «Sin corregir: LED quemado», pero los analizados producen «Corregidas al final: LED quemado». El cambio entre comprobación y uso evade la admisión.
- Impacto: el visto bueno del manifiesto no acredita los datos usados en las conclusiones. Requiere modificación concurrente de la copia; no se afirma que el exportador normal la modifique por sí mismo.
- Posible solución: leer cada archivo una vez y usar **el mismo buffer** para hash, tamaño, decodificación y análisis. Guardar el resultado de admisión junto a esos bytes; no volver a abrirlo después para obtener los eventos.
- Regresión exigida: copia íntegra, copia alterada antes de admitir y sustitución entre las dos lecturas actuales; nunca asociar a un hash los eventos de otra lectura. TB-14 se había aplazado por rendimiento; esta consecuencia de integridad es nueva y debe decidirse como tal. Seguimiento: **AUD-22**.

**R03 · Media · `programa_subido` no siempre identifica la placa enviada a compilar/subir.**

- Archivo: [TB app.js:1367](../../TecnoBloques/src/app.js#L1367), espera en 1369 y petición en 1387.
- Condición: empieza Subir con Uno y monitor serial conectado; durante `await desconectarSerial()` cambia a Nano.
- Observado en Electron con IPC sintético: la petición contiene `fqbn: arduino:avr:nano:cpu=atmega328`, pero `programa_subido.datos.placa` dice `uno`. El control sin espera registra Uno y envía Uno. No se acreditó una subida física.
- Impacto: atribución falsa en el registro y solicitud construida con valores tomados en momentos diferentes. Congelar únicamente el nombre que se registra no congela la operación.
- Posible solución: capturar código, placa/FQBN, puerto y turno en un solo objeto antes de la primera espera. Revalidar el turno y la política de cambio de placa antes de enviar la petición; mostrar y registrar el mismo objeto que se ejecuta.
- Regresión exigida: cambiar placa y código durante desconexión; cambio de equipo antes de enviar; cambiar durante compilación/subida; control sin cambios. Seguimiento: **AUD-17**.

**R04 · Media · Apagar el registro y confirmar un equipo pendiente dejan una sesión huérfana al reencender.**

- Archivos: [TB app.js:1666](../../TecnoBloques/src/app.js#L1666), apagado en 1827.
- Condición: apagado y confirmación del equipo B esperan al mismo cierre. Se controla esa promesa para que apagar continúe antes de que termine el cambio de equipo.
- Observado en Electron: registro apagado (`activo: false`), pero el editor conserva equipo B y sesión. En disco solo terminó A: el inicio de B se envió cuando ya estaba apagado. Al reencender y confirmar B, el atajo de «ya es el equipo» no crea sesión; aparece `codigo_compilado` de B sin su `sesion_iniciada`.
- Impacto: hueco/atribución incompleta, pérdida del comienzo y desacuerdo entre estado del editor y proceso principal. La cola nueva serializa cambios de equipo entre sí, pero no con apagar.
- Posible solución: coordinar activar/apagar/cambio/cierre en la misma transición o usar una generación que invalide cambios pendientes cuando se apaga. Un apagado exitoso debe dejar sin equipo al editor, y el siguiente encendido exigir un inicio nuevo.
- Regresión exigida: ambos órdenes de apagar/confirmar, dos confirmaciones pendientes, apagado fallido, reencendido con el mismo y otro código; archivo sin sesiones huérfanas. Seguimiento: **AUD-18**.

**R06 · Media · El panel y la página reciben contadores de disco obsoletos.**

- Archivo: [TB registro-disco.js:154](../../TecnoBloques/escritorio/registro-disco.js#L154).
- Condición: ENOSPC persistente mientras crece la cola hasta su límite.
- Observado: el último aviso emitido sigue en `pendientes: 1, perdidos: 0`; `estado()` ya dice `pendientes: 5000, perdidos: 2`. `avisarSiCambio` deduplica solo por motivo y fecha de inicio. La recuperación sí informa; reabrir el panel puede obtener un estado reciente.
- Impacto: quien mantiene abierto el panel no ve las pérdidas y el volumen actuales. Es distinto del contador de `evento_descartado`, cuya actualización nominal sigue aprobada.
- Posible solución: incluir pendientes/perdidos en la comparación de estado y publicar actualizaciones, agrupándolas si hace falta para evitar una ráfaga de IPC. El panel abierto debe recibir el estado más reciente.
- Regresión exigida: crecimiento de cola, saturación con pérdida, recuperación parcial/completa y panel abierto; no repetir solo la primera señal de disco lleno. Seguimiento: **AUD-20**.

**R08 · Media, prueba · La suite de pausa usa un criterio incompatible con fotos tardías legítimas.**

- Archivo: [probar_registro.py:121](../prototipo/pruebas/probar_registro.py#L121).
- Observado real: la suite completa falla en 501→523 ms y pausa real de 183 ms. La repetición aislada pasa 18/18. El control determinista produce una foto **antes** de pausar, la recibe durante la pausa y muestra un delta de 22 ms al reanudar sin ejecutar ningún ciclo del núcleo durante esa pausa.
- Causa: TC-4 hace que la página use el último tiempo conocido de los hechos recibidos; no equivale a que el Worker haya avanzado estando pausado. El límite fijo de 20 ms compara conocimiento de la página en dos instantes.
- Impacto: falsos fallos de la suite y tentación de relajar tolerancias sin comprobar la pausa real. No es evidencia de un reloj que avanzó durante la pausa.
- Posible solución: comprobar el reloj del Worker después de procesar la orden de pausa y antes de reanudar, y comprobar por separado el tratamiento de fotos anteriores que llegan tarde. Conservar el criterio de no avanzar durante pausa; no resolverlo aumentando 20 a otra constante.
- Regresión exigida: foto anterior con retraso mayor de 20 ms, pausa real y RESET tras foto tardía, con reloj/canal controlados y recorrido Chromium. Seguimiento: **AUD-23**.

**R09 · Baja · Poder abrir el origen no demuestra que el error de lectura sea del destino.**

- Archivo: [TB registro-disco.js:187](../../TecnoBloques/escritorio/registro-disco.js#L187), uso en 485.
- Condición: el archivo original abre, pero falla con EIO al leer su contenido durante la copia.
- Observado con fallo acotado de lectura de origen: `codigo: EIO, donde: destino`. El texto del instructor atribuye ese resultado a la USB. La corrección TB-6 cubre un origen que no abre, pero no determina el lado de todos los errores de copia.
- Impacto: diagnóstico y acción de recuperación equivocados; la copia sigue marcada incompleta, por lo que aquí no se demuestra pérdida silenciosa ni una exportación aceptada indebidamente.
- Posible solución: distinguir las etapas de lectura y escritura al copiar. Si el sistema no permite determinar el lado de un fallo, usar un mensaje neutro conservando el código original, en lugar de asegurar que falló la USB. Una ampliación del formato de `donde` se acuerda antes de implementarla.
- Regresión exigida: origen que no abre, origen que abre pero falla al leer, destino lleno/bloqueado y copia normal. Seguimiento: **AUD-21**.

**Incoherencias documentales.** No se corrigen por Codex porque pertenecen a la entrega de Claude y, donde afecten el contrato, deben quedar coherentes en los dos productos.

| ID | Evidencia y riesgo | Posible solución / aceptación |
|---|---|---|
| D01 · Baja | La entrega y TC BITACORA dicen 25 hallazgos, 17 corregidos y 8 restantes. La ficha enumera TB-1…10 y TB-15 (11 IDs) y TC-1…7, TC-9 y TC-10 (9 IDs): 20 IDs de corrección/limpieza; la tabla de restantes nombra 5 IDs y menciona aparte el tiempo triple del cierre. No hay un mapa inequívoco de los 25 a las categorías 17/8. | Adjuntar una matriz de los 25 IDs, decisión, cambio o motivo de aplazamiento y prueba concreta; explicar agrupaciones/duplicados y TC-10. No certificar la cifra 17 por repetición del resumen. |
| D02 · Baja | CONTRATO 6.1 y `evento.schema.json` describen `sesion` como identificador por apertura de app; `crearRegistroEventos.empezar` genera otro en cada inicio de equipo. La tabla del contrato dice `corrida` dentro de la sesión, pero TC la cuenta mientras vive la página y no la reinicia al cambiar equipo. | Definir las unidades reales: cada inicio de sesión de equipo tiene UUID nuevo; corrida cuenta en la página y puede empezar por un número mayor que 1 en otra sesión. Alinear contrato, esquema y explicación para que el análisis no confunda apertura, equipo, sesión y corrida. |

**Riesgos y límites que permanecen, cada uno con tratamiento propuesto.** Son distintos de los defectos reproducidos. Se conservan las decisiones de aplazamiento de Efraín; esta auditoría no autoriza implementaciones ni cambia su proceso.

| Riesgo | Estado / evidencia | Posible solución o control |
|---|---|---|
| K01 · Cola volátil, cierre forzado y pérdida de energía | Cola en memoria; un cierre con disco averiado puede perder también el aviso de interrupción. Una sesión sin fin no demuestra qué faltó. | Diario durable o almacenamiento alterno; conservar estado de sesión incompleta y distinguir «final del archivo observado» de «final de la sesión». Decisión de Efraín sobre durabilidad requerida. |
| K02 · Escritura/copias frente a durabilidad física | Append/copia/hash y DRC probados en software; no se probó extracción USB ni un corte de energía. | Ensayo con USB real y expulsión, verificación después de reconectar; definir sincronización durable si se necesita. Efraín hace el laboratorio. |
| K03 · Bloqueo y memoria con volumen | Exportación síncrona en proceso principal; lee archivos completos para hash; lector conserva contenido y duplica lecturas. TB-12/14 aplazados; sin ensayo de semanas de datos. | Copia/hash por bloques y progreso fuera del proceso principal; presupuestos de memoria y volumen realista. Resolver R10 aun cuando se aplace la optimización general. |
| K04 · Coste por evento y límite posterior al IPC | Configuración leída por evento; una carga excesiva ya cruzó IPC cuando se mide su tamaño. TB-11 aplazado, sin latencia medida. | Límite de tamaño/frecuencia antes del IPC, configuración consistente en memoria y prueba de ráfagas con presupuesto explícito. |
| K05 · Reloj del PC y orden entre archivos | `t` puede retroceder; los nombres usan la fecha local y el lector ordena segmentos por ella. No hay secuencia durable por sesión. | Secuencia monotónica por emisor/sesión con política de copias, mantener `t` solo como hora; no inferir duración causal solo del reloj civil. Requiere acuerdo de contrato. |
| K06 · Procedencia del programa y paquete | Dos versiones y `version_tb` no identifican todo el binario; no hay enlace criptográfico compilación→HEX→corrida. Pruebas con TC local no acreditan la dependencia etiquetada del instalador. | Identificador de build, hash del artefacto y del programa/HEX, conservación del candidato exacto y verificación DIST-001. |
| K07 · Portabilidad y validación del lector | Necesita Node y el revisor/esquema del repositorio hermano; sin él avisa y usa validación mínima. No probado instalado aparte. | Empaquetar lector+esquema, probar sin red y evitar conclusiones fuertes cuando falte la validación completa. |
| K08 · Privacidad y control del PIN | PIN limita las opciones de la app, no cifra los archivos ni impide acceso local externo; los literales C++ conservan texto del usuario. | Permisos del PC, manejo de copias y revisión de texto antes de compartir; Efraín define la política del estudio. Nada privado ni de aprendices se usó aquí. |
| K09 · Integridad no equivale a autenticidad | SHA256 detecta discrepancias respecto del manifiesto; un tercero que sustituya archivo y manifiesto puede hacerlos coincidir. No hay firma. | Si el estudio exige autenticidad/procedencia, copia maestra controlada, hash guardado por otro canal o manifiesto firmado. No presentar el hash autocontenido como protección contra manipulación deliberada. |
| K10 · Retención y crecimiento | Sin cuota/rotación/aviso de poco espacio; las exportaciones duplican datos y pueden llenar el disco. | Política de retención, archivado verificado y alertas de capacidad; ensayo con poco espacio. No borrar registros automáticamente sin política de Efraín. |
| K11 · Cuenta de pérdidas y fallo del propio aviso | La cuenta empieza en cero al abrir; un evento sin sobre no se atribuye a equipo; si falla el aviso IPC no se ve. Tope de 1000 destinos por minuto explícito. | Estado de salud durable si se requiere; secuencia/contabilidad extremo a extremo, aviso de límite y destino alterno. No prometer pérdidas imposibles. |
| K12 · Resolución temporal de hechos | Las fallas llevan tiempo de la foto y los eventos de página el último tiempo conocido. No son el instante físico exacto del hecho. TC-8 aplazado. | Mantener el límite explícito; timestamp en núcleo solo si lo exige el análisis y Efraín autoriza el rediseño. No confundir R08 con validación de tiempos físicos. |
| K13 · Registros anteriores | Sin `tramo` no se distingue una foto pre-RESET tardía; sin `confirmado` no se sabe si el cierre agotó la espera. | Marcar generaciones/limitaciones del conjunto de datos; no reconstruir retroactivamente información ausente ni tratarla como medida. |
| K14 · Centralización de contexto y recursos | TB-13 aplazado: la asociación evento/sesión se reparte entre transiciones asíncronas. El fallback en página usa MessageChannel y no se perfiló memoria tras muchas destrucciones. | Invariantes de sesión y cola común para operaciones; perfil de recursos y cierre explícito de canales si se demuestra retención. R04 requiere protección sin esperar al rediseño general. La retención de memoria es hipótesis pendiente, no fuga acreditada. |
| K15 · Inferencias y uso humano | Registro y comparación no demuestran aprendizaje, causalidad, cableado real ni funcionamiento del instalador/aula. La aceptación humana previa de REG-004 sigue siendo histórica. | Lenguaje de observación, candidato congelado y evidencia de hardware/uso correspondiente. La suite de software no elimina LAB-001/LAB-002 ni sustituye la decisión de Efraín. |

**Reproducción y cierre exigido.**

```powershell
node docs/diagnosticar-reg005-2026-10-22.cjs
node docs/diagnosticar-reg005-electron-2026-10-22.cjs
```

El primero usa los `.cjs` generados por `probar:fotos`; el segundo necesita el HTML de TB construido con el paquete local TC. Los instrumentos importan módulos del hermano y no cambian sus fuentes. El segundo intercepta las subidas en su proceso de prueba. Salen con 1 en esta entrega porque esperan el comportamiento correcto y reproducen defectos. [Resultados Node](reg005-auditoria-2026-10-22/diagnostico-node.json), [resultados Electron](reg005-auditoria-2026-10-22/diagnostico-electron.json), [captura del retorno al código de bloques](reg005-auditoria-2026-10-22/diagnostico-proyecto.png).

Siguiente: Efraín decide el lote/prioridad; Claude reproduce y reserva antes de implementar y entrega una matriz por ID. Tras la corrección, Codex verifica originales, controles, regresiones y dependencias del lote acordado. Mantener aparte los riesgos aceptados, los aplazados y los pendientes físicos; no convertirlos todos en trabajo obligatorio de etapa 0. REG-005 no queda cerrada por las suites nominales ni por este informe.
