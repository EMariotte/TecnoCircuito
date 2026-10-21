# REG-004 · auditoría integral y propuesta de solución

Codex (Sol), 20 de octubre de 2026. Encargo de Efraín: revisar proactivamente las situaciones problemáticas y anotar una sugerencia inmediatamente después de cada hallazgo, **sin tocar código**.

**Resultado:** 42 ejecuciones sintéticas, un recorrido de dos corridas en Chromium y contrastes con avr-g++. Se agrupan los resultados en **13 familias de problemas**, más decisiones y riesgos pendientes. No son 13 fallos encontrados por la suite normal: varios requieren entradas dañadas, contradictorias o condiciones específicas. Tampoco es una garantía de haber agotado todas las entradas posibles.

**Recomendación principal:** separar hechos, integridad y conclusiones. Comparar el C++ registrado exacto para decidir identidad; usar cualquier normalización solo como ayuda visual. La ausencia posterior de una falla debe narrarse como «no se observó», y solo compararse cuando los registros y las condiciones lo permitan. Este enfoque evita seguir ampliando un analizador parcial de C++ y corrigiendo síntomas aislados.

## Hallazgos y sugerencias inmediatas

### INT-01 · Media: «corrigió» puede significar que se desactivó la detección

En `TecnoBloques/herramientas/historia-registro.js:233` y la comparación entre corridas, basta que una falla desaparezca de la lista para llamarla corregida. Se reproduce al pasar de realista a ideal, desactivar `danoComponentes` o retirar la pieza. **Contraste con el prototipo real:** el mismo circuito, sin cambiar una conexión, produce LED quemado/corriente del pin en realista y ninguna falla en ideal; el lector afirma que corrigió ambas, sin avisos. La app TB actual inicia realista; no se afirma que su interfaz ofrezca ese cambio de modo. La entrada ideal sí está admitida por el contrato y el paquete TC.

**Sugerencia de solución:** conservar por corrida modo, no idealidades activas, placa, componentes y referencia al montaje/programa. Usar «ya no se observó» como descripción de hechos. Separar «pieza retirada», «cambió la detección», «no comparable» y «posible corrección»; no deducir reparación ni aprendizaje solo de la ausencia de avisos. Probar también sustitución de una pieza que reutiliza su id y ausencia de excitación del pin.

Evidencia: casos `cambio-a-ideal`, `modelo-desactivado`, `pieza-retirada` de [E1](reg004-integral-evidencia-2026-10-20.json), y [recorrido real con su historia](reg004-integral-realista-ideal-historia-2026-10-20.json). Los dos snapshots de circuito son idénticos; cero errores JS y de esquema.

### INT-02 · Alta: los huecos se avisan, pero el resumen conserva una certeza injustificada

Un `registro_interrumpido` con `perdidos: 1` deja un aviso y aun así permite «Corregidas al final: LED quemado. Sin corregir: ninguna». También ocurre si hay una línea JSON truncada entre eventos: el problema aparece al final del informe, pero no degrada la conclusión de la sesión. `resumen()` no recibe esas incertidumbres.

**Sugerencia de solución:** propagar un estado de integridad desde la lectura hasta cada conclusión. Asociar los huecos a su sesión y rango; cuando una línea dañada no permite conocer su sesión, conservar la incertidumbre del archivo/tramo. No comparar a través de un tramo perdido ni afirmar un final sin fallas sin una base suficiente. Un snapshot posterior puede restablecer parte del estado, pero no reconstruye hechos históricos perdidos: deben seguir marcados.

Evidencia: `hueco-con-perdidos` y `linea-invalida-no-degrada-resumen`, [E1](reg004-integral-evidencia-2026-10-20.json).

### INT-03 · Alta: avisar un conflicto de equipo no evita atribuirle la corrección de otro

`contarHistoria()` agrupa solo por `sesion` (línea 256). Si ese identificador trae líneas de dos equipos, avisa el conflicto en la línea 306, pero sigue sumando sus corridas y concluye que el primer equipo corrigió una falla porque la corrida del segundo no la tuvo. Las líneas individuales cumplen el esquema; la secuencia es contradictoria. No se afirma que el generador actual produzca naturalmente esa colisión.

**Sugerencia de solución:** separar o poner en cuarentena identidades incompatibles antes de calcular resultados. Mantener equipo y sesión como datos inmutables del grupo, con procedencia, y excluir de sus conclusiones toda línea que contradiga esa identidad. No basta añadir un aviso al mismo resumen contaminado. Repetir los controles normales de cambio de equipo de AUD-04 al implementar.

Evidencia: `mismo-id-sesion-otro-equipo`, [E1](reg004-integral-evidencia-2026-10-20.json). No reabre AUD-04: se demuestra un problema adicional del consumidor ante entradas contradictorias.

### INT-04 · Alta: una entrada inválida puede abortar todo el lote o inventar una hora

`leerArchivos()` (línea 35) solo comprueba que existan equipo, sesión y tipo. `datos: null`, una sesión objeto o `t: "ayer"` llegan al análisis y lanzan excepciones. Una sesión mala hace perder la salida del lote que también contenía una sesión válida. Si falta `t`, `Intl.DateTimeFormat` usa la hora actual y el lector muestra una hora que no estaba en el archivo, sin aviso. Una versión `v: 2` se procesa como si fuera la versión admitida. Estas entradas son **inválidas según el esquema**; el problema es que no se rechazan o aíslan antes de interpretarlas.

**Sugerencia de solución:** validar primero cada sobre y cada evento conocido con el esquema vigente, conservando la tolerancia acordada a campos/tipos nuevos. Aislar la línea/sesión inválida y continuar las demás con un diagnóstico preciso. Nunca completar silenciosamente tiempos, versión o identidad ausentes. No reutilizar valores por defecto destinados a la interfaz para reparar datos de investigación.

Evidencia: `entrada-datos-null`, `entrada-t-no-numerico`, `entrada-sesion-objeto`, `estructura-invalida-aborta-otras-sesiones`, `version-no-admitida`, [E1](reg004-integral-evidencia-2026-10-20.json), y `falta-t-se-inventa-hora`, [E2](reg004-integral-ampliacion-2026-10-20.json). El primer diagnóstico llamó «CONTROL» al caso sin `t` porque buscaba una excepción; la ampliación confirma el defecto real, que es la hora inventada. Ese rótulo inicial no se cuenta como aprobación.

### INT-05 · Media: el ciclo de vida de sesiones y corridas no está completamente definido

Una sesión sin `sesion_iniciada`, o con dos inicios, puede terminar con «Avisos: ninguno». Un segundo `simulacion_iniciada` con el mismo número sustituye la entrada del `Map`, deja dos objetos en `h.corridas` y puede convertir una falla de la misma corrida en una supuesta corrección. Se conserva el hecho, pero se interpreta una continuación ambigua como dos corridas distintas. Los avisos existentes no impiden esa conclusión.

**Sugerencia de solución:** definir una máquina de estados explícita de sesión/corrida y una política para transiciones imposibles. Mantener una sola identidad de corrida y registrar sus inicios contradictorios sin sustituir su estado anterior. Una transición inválida debe impedir comparaciones que dependan de ella. Cubrir inicio ausente/repetido, pausa antes de inicio, reanudación sin pausa, cierre repetido, eventos después del cierre y reinicios dentro de la corrida.

Evidencia: `sesion-sin-inicio`, `sesion-doble-inicio`, `corrida-inicio-repetido`, [E1](reg004-integral-evidencia-2026-10-20.json). Las variantes nuevas de pausa/reanudación son cobertura propuesta, no resultados ejecutados en este barrido.

### INT-06 · Media: importar el mismo contenido dos veces o segmentos invertidos altera la historia

Pasar dos veces la misma ruta duplica las corridas. Cargar dos segmentos en orden inverso deja el cierre antes del inicio, crea fallas sin atribuir y una corrida incompleta. El orden depende de los argumentos o del orden alfabético de los archivos, no de una secuencia acreditada. Además, se conserva solo `basename`, lo que dificulta distinguir archivos homónimos de carpetas diferentes; esto último se constató por lectura del código.

**Sugerencia de solución:** preparar un manifiesto de entrada con ruta canónica, tamaño/hash y procedencia; eliminar la repetición de la misma ruta física y detectar copias/exportaciones solapadas sin borrar eventos legítimos solo porque su JSON coincida. Verificar el orden de segmentos o pedirlo explícitamente si no se puede reconstruir. No ordenar ciegamente por `t`, porque el reloj del PC puede retroceder. Un ordinal o identificador de evento nuevo requeriría acordar el cambio de contrato con Efraín.

Evidencia: `ruta-duplicada`, `segmentos-invertidos`, [E1](reg004-integral-evidencia-2026-10-20.json). El escritor divide por fecha; el ensamblaje debe contemplar sesiones que cruzan medianoche y varias exportaciones.

### INT-07 · Media: la lectura de archivos tiene pérdidas y abortos evitables

Un BOM al inicio hace perder `sesion_iniciada`. Un byte UTF-8 inválido dentro de un texto se reemplaza por `�` sin registrar problema. Una ruta inexistente aborta la lectura de otras rutas válidas. No se trata de declarar válidos esos archivos: se trata de conservar evidencia y no fabricar una lectura aparentemente íntegra.

**Sugerencia de solución:** reconocer un BOM exclusivamente al inicio del archivo, validar UTF-8 con decodificación estricta y manejar errores de apertura/lectura por archivo. Conservar el original y registrar archivo/posición/motivo; continuar lo independiente. Probar también permisos, archivo vacío, última línea completa sin LF, última línea truncada, archivos homónimos, extensión inesperada y enlaces/rutas equivalentes. No sustituir bytes inválidos silenciosamente.

Evidencia: `bom-pierde-primera-linea`, `archivo-inexistente-aborta-validos`, [E1](reg004-integral-evidencia-2026-10-20.json), y `utf8-invalido-sustituido-sin-aviso`, [E2](reg004-integral-ampliacion-2026-10-20.json). Una carpeta vacía con extensión `.jsonl` no produjo el aborto esperado inicialmente; no se presenta como defecto reproducido.

### INT-08 · Media: el analizador parcial de C++ sigue declarando igualdad falsa

Además de R4b, se reproduce «el mismo programa» al empalmar el prefijo `R` o `u8R` con la comilla de un literal raw y cambiar espacios dentro del texto. También al sustituir saltos CR de directivas por espacios: ambos programas compilan y sus datos globales difieren. En código con error sintáctico registrado como `ok: false`, tampoco debe asumirse que el texto inválido se puede normalizar como un programa analizado correctamente. El preprocesamiento, los literales y los límites del explorador requieren reglas que `lineasDe()` no implementa por completo.

**Sugerencia de solución:** decidir «idéntico al código registrado anterior» mediante igualdad exacta del C++ registrado. Las diferencias de formato pueden agruparse visualmente, pero no justificar igualdad semántica. Si Efraín quiere clasificar equivalencia semántica, tratarla como otra función con un analizador adecuado, criterios explícitos y salida «no determinado» cuando falle; no seguir ampliando este explorador para sostener una afirmación innecesaria. Probar todos los terminadores admitidos por el compilador, empalmes en prefijos/tokens, literales con escapes, código inválido y fronteras de longitud.

Evidencia: `cpp-raw-prefijo-empalmado`, `cpp-directivas-CR`, `cpp-invalido-cadena-sin-cerrar`, [E1](reg004-integral-evidencia-2026-10-20.json); `cpp-raw-prefijo-u8R-empalmado`, [E2](reg004-integral-ampliacion-2026-10-20.json); [contraste con avr-g++](reg004-integral-compilador-2026-10-20.json). Los pares válidos compilan con datos distintos; los dos ejemplos inválidos efectivamente fallan al compilar. R4b sigue documentado en su [verificación anterior](VERIFICACION-REG004-CLA004-CODEX-2026-10-20.md).

### INT-09 · Media: varios cambios contiguos en líneas largas pueden mostrarse como «X → X»

El ajuste de `cambioDeLinea` cubre el reemplazo de una sola línea por otra. Si dos líneas largas adyacentes cambian después del carácter 80, se usa `lado()` (línea 205), que corta cada una a 50 caracteres: ambos lados del cambio mostrado son idénticos. El lector detecta que hubo cambio, pero oculta cuál. El compilador confirma que los datos son distintos.

**Sugerencia de solución:** aplicar un recorte que conserve diferencias a todos los tramos, no solo al caso 1→1. Si no hay espacio para mostrarlas fielmente, decir «cambió este tramo; detalle omitido» y conservar la referencia al código completo. No presentar dos recortes idénticos como explicación. Cubrir inserciones, eliminaciones, cambios adyacentes, más de tres líneas y cambios antes/después de cada umbral de presentación.

Evidencia: `cpp-cambios-adyacentes-truncados`, [E2](reg004-integral-ampliacion-2026-10-20.json), y [compilador](reg004-integral-compilador-2026-10-20.json). El control inicial de dos líneas separadas por líneas sin cambios sí pasó; el fallo confirmado requiere el tramo adyacente.

### INT-10 · Media: algunos eventos futuros desaparecen o se convierten en cambios «deshechos»

Un tipo desconocido de origen `circuito` entra directamente en el grupo del circuito y termina como «hizo cambios y los deshizo», sin aviso. Un tipo desconocido de editor llamado `__proto__`, válido según el patrón de tipos, tampoco se cuenta en los avisos por usar un objeto común como diccionario. El control de un nombre ordinario de editor sí avisa. El contrato permite extensiones; esa tolerancia no debería producir una explicación inventada.

**Sugerencia de solución:** centralizar la clasificación de eventos conocidos antes de agruparlos y conservar los desconocidos como hechos no interpretados, con origen y procedencia. Usar `Map` o diccionarios sin prototipo para claves externas. La salida debe distinguir «sin efecto neto acreditado» de «hay eventos que este lector no interpreta».

Evidencia: `desconocido-circuito`, `desconocido-nombre-prototipo`, `control-desconocido-editor`, [E1](reg004-integral-evidencia-2026-10-20.json).

### INT-11 · Media: los campos redundantes y los tiempos no se contrastan entre sí

Una corrida que declara `placa: nano` pero contiene un snapshot de circuito `uno` se acepta sin aviso si la sesión también decía Nano. El tiempo del cierre puede contradecir el `ms_sim` del sobre o ser anterior al de una falla de la misma corrida. Un reloj real que retrocede produce una secuencia extraña sin explicación. Las líneas pueden ser válidas aisladamente y aun así no ser coherentes entre sí.

**Sugerencia de solución:** añadir invariantes de coherencia entre snapshot, placa declarada y cronología de la corrida, respetando la semántica real de reinicios. Conservar el orden de recepción como hecho y advertir cambios de reloj, sin repararlos ordenando por fecha. Mantener separados tiempo real, tiempo simulado y duración declarada. Si dos fuentes discrepan, mostrar la discrepancia y evitar una duración o atribución única no acreditada.

Evidencia: `desfase-tiempo-cierre`, `reloj-retrocede`, [E1](reg004-integral-evidencia-2026-10-20.json); `placa-snapshot-no-coincide`, `tiempo-falla-posterior-a-cierre`, [E2](reg004-integral-ampliacion-2026-10-20.json). No se ha reproducido un salto espontáneo del reloj del PC.

### INT-12 · Media: una línea demasiado grande se rechaza sin activar una falla del registro

En `TecnoBloques/escritorio/registro-disco.js:312`, tres eventos válidos de longitudes JSON **2 097 151**, **2 097 152** y **2 097 153** se aceptan, aceptan y rechazan. En el tercero, `escribir()` devuelve `false`, pero el registro sigue activo, `falla: null` y no hay notificación `alCambiar`. El límite se mide en unidades de longitud de cadena de JS, no necesariamente bytes UTF-8. `escritorio/main.js:110` ignora ese retorno en el IPC. Se probó el módulo y se revisó su conexión; no se ejecutó este caso en la interfaz Electron.

**Sugerencia de solución:** conservar un límite de seguridad, pero convertir el rechazo de un evento registrable en un resultado visible y contabilizado, con causa y sesión. No truncar el C++ o circuito silenciosamente: el contrato los exige completos. Si se decide fragmentar o guardar referencias externas, requiere diseño y cambio de contrato autorizado. Añadir regresiones a ambos lados del límite y una prueba Electron que acredite la señal al instructor y la pérdida registrada.

Evidencia: `limite-linea-rechaza-sin-senal`, [E2](reg004-integral-ampliacion-2026-10-20.json). Se abre **AUD-07**; no se reabre AUD-02, cuyo cierre acreditó fallos de escritura/recuperación en su alcance original.

### INT-13 · Media: dos exportaciones del mismo minuto reemplazan la primera

`registro-disco.js:338` usa un nombre con precisión de minuto, `mkdirSync(..., { recursive: true })` y `copyFileSync`. Dos exportaciones con el mismo instante sintético devuelven `ok: true` y la **misma carpeta**. Al agregar un evento entre ellas, el archivo de la primera exportación pasa de 4 194 305 a 4 194 487 bytes: quedó reemplazado por la segunda. El comentario promete una carpeta nueva. Solo se usaron archivos sintéticos propios.

**Sugerencia de solución:** reservar un destino nuevo de forma exclusiva y añadir un sufijo hasta que no exista; no asumir que segundos o milisegundos bastan. Registrar qué archivos/hash/versiones forman cada exportación y distinguir «completa» de una copia parcial si falla a mitad. Probar dos exportaciones con el mismo reloj, destino ya existente y error durante una copia. No implementar ahora publicación ni envío automático.

Evidencia: `exportar-mismo-minuto-sobrescribe-carpeta`, [E2](reg004-integral-ampliacion-2026-10-20.json). Se abre **AUD-08**, pendiente de Claude.

## Decisiones y riesgos adicionales, sin presentarlos como defectos ya acreditados

**CLI con problemas y exit 0:** se reprodujo que una línea dañada deja salida JSON con `problemas` y código 0. Para una lectura humana puede ser deliberado; para una importación automática puede convertirse en una falsa aceptación. **Sugerencia:** acordar un modo estricto y estados de salida documentados, separados de la salida parcial útil; el valor por defecto lo decide Efraín. No exigir cambiarlo como si ya existiera ese requisito.

**Memoria y tiempos de análisis:** el lector carga todos los archivos, eventos, historias y salida en memoria; la comparación tiene límites de detalle, pero no hay un presupuesto global de lectura. No se ejecutó una prueba de agotamiento ni un benchmark nuevo. **Sugerencia:** fijar límites explícitos de bytes/eventos/trabajo, leer por flujo cuando corresponda y degradar a «detalle omitido» o «análisis incompleto», conservando hechos; ningún límite puede convertirse en «el mismo programa».

**Privacidad de los textos:** el contrato conserva cadenas del C++; quitar comentarios no elimina posibles nombres, contraseñas o identificadores escritos dentro de ellas. No se inspeccionaron registros reales ni se acreditó una fuga nueva. **Sugerencia:** mantener la revisión de exportación y el procedimiento de datos sintéticos/consentimiento ya acordado; no copiar registros de aula al repositorio ni alterar cadenas automáticamente, porque cambiaría el programa registrado.

**Duplicados de fallas y vocabulario:** un cierre que repite dos veces la misma falla puede marcarse incoherente frente a un solo evento individual; los «mismos bloques» acreditan conteos/tipos, no igualdad del programa. **Sugerencia:** comparar conjuntos de hechos con claves estructuradas y describir exactamente lo observado («mismo conteo y tipos»), sin inferir estructura, intención o aprendizaje. El duplicado de cierre se reprodujo en [E1](reg004-integral-evidencia-2026-10-20.json); la amplitud del vocabulario de bloques requiere decisión de presentación.

## Orden sugerido de trabajo para Claude

1. Fijar vocabulario y reglas de certeza/comparabilidad; decidir identidad exacta del C++ registrado. Son las decisiones que evitan perseguir casos sueltos.
2. Separar lectura/validación, reconstrucción de hechos, evaluación de integridad y presentación. Conservar entradas y procedencia sin mutaciones destructivas.
3. Resolver de forma conjunta INT-01 a INT-11, con regresión por familia y controles correctos, no solo una aserción por reproducción. Mantener R4b y los cierres anteriores como controles.
4. Tomar AUD-07 y AUD-08 por separado, con reservas y pruebas de módulo/IPC/interfaz según impacto. No iniciar todas las implementaciones a la vez.
5. Entregar una revisión identificable completa para Codex. La aceptación humana anterior se conserva para su recorrido; Efraín decide si las nuevas reglas de presentación requieren otro contraste de uso.

No es una autorización para que Codex implemente ni una propuesta de cambiar PROCESO v3. Claude sigue siendo el único programador y Efraín decide prioridades, aceptación y cambios de contrato.

## Evidencia, versión y límites

- TB `main` `86433d1341caa86b6d75dc3ab437aaa2cf8f008c`, lector SHA256 `e65f5ef2471ef6424c679373d4dfebaa7f1af097e41c6ac92a9b1ff3193a8733`, entrega sin commit. TC `main` `56baf57`, TS `main` `5665e60`. [Referencia inicial](reg004-integral-version-inicio-2026-10-20.json), [preservación y fuentes finales](reg004-integral-version-final-2026-10-20.json).
- [E1: 34 ejecuciones](reg004-integral-evidencia-2026-10-20.json), [E2: 8 ejecuciones](reg004-integral-ampliacion-2026-10-20.json). Incluyen casos de control, entradas inválidas y secuencias con líneas válidas; no se confunden esas categorías. Los campos `erroresEsquema` acreditan esa distinción.
- [Compilador](reg004-integral-compilador-2026-10-20.json): cuatro pares válidos compilan con datos distintos y un par con errores sintácticos falla como se esperaba. Hay 31 reproducciones JSONL en la carpeta temporal indicada por ese archivo.
- [Prototipo: dos corridas reales](reg004-integral-realista-ideal-2026-10-20.json), [historia producida](reg004-integral-realista-ideal-historia-2026-10-20.json). «Real» aquí significa ejecución en Chromium del software local, no hardware ni aula.
- Los diagnósticos ejecutables se escribieron **solo en la carpeta temporal**, sin añadir ni modificar `.js`, `.cjs`, `.py`, esquemas, pruebas o memorias del producto. Sus rutas están en los JSON. Los artefactos permanentes nuevos son este informe, datos/logs y documentación de coordinación.
- El exit 0 de los recopiladores significa que terminaron y guardaron sus observaciones; **no significa que los defectos estén corregidos ni que sea una regresión aprobada**. Los contrastes y sus resultados se revisaron individualmente.
- No se repitió la suite normal: no cambió código de producto y sus 56/87/142 comprobaciones del ciclo anterior no se cuentan como ejecuciones de este barrido. No se acreditan suite global, nuevo instalador, hardware, aula, benchmark, privacidad humana ni todos los recorridos Electron.
- REG-004 sigue pendiente. Los hallazgos del lector se agrupan en su alcance; AUD-07/08 separan los dos defectos independientes del escritor/exportador. No se agrega otra devolución por una entrega nueva inexistente ni se reabren cierres históricos automáticamente.

Informe y diagnósticos propios revisados por su autor; sin segunda revisión independiente. No hubo commit, push, etiqueta ni publicación.
