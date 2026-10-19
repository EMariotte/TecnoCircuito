# Segunda verificación de AUD-02

2026-10-18 · Codex · America/Bogota. Entrega examinada: CLA-20261018-008. **Devuelta: no se acredita el cierre de AUD-02.** Se conserva el [primer informe](VERIFICACION-AUD02-CODEX-2026-10-18.md); los casos originales V1/V2 pasan ahora, pero quedan dos fronteras reproducidas de su recuperación.

## Hallazgos que impiden cerrar

### AUD-02-V4 · Alta · El reemplazo fallido elimina la señal persistente de configuración dañada

- **Archivo:** TecnoBloques/escritorio/registro-disco.js:239 y :241; lectura de ENOENT en :51. La aplicación del resultado está en src/app.js:1636.
- **Condición:** configuración ilegible, reemplazo confirmado por el instructor y ENOSPC al escribir registro-config.json.tmp. La reproducción inyecta el error únicamente sobre ese temporal sintético; el rename anterior sí se ejecuta realmente.
- **Observado:** el archivo dañado queda archivado, pero ya no existe registro-config.json y no se creó el PIN nuevo. instructor lanza ENOSPC; estado y un módulo recién iniciado devuelven activo false, tienePin false, falla null, configIlegible false. No es un borrado externo: el propio camino de recuperación quitó el archivo antes de asegurar el reemplazo.
- **Consumidor real:** después de preparar ese fallo con el módulo real, Electron arranca con avisoOculto true y panel «Registro de eventos: crear el PIN del instructor», sin errores JS. Es arranque posterior al fallo preparado en Node; esta reproducción no inyecta ENOSPC en un clic del renderer.
- **Impacto:** se presenta como instalación nueva una recuperación que no terminó; desaparece el aviso persistente de fallo. Los JSONL y la copia dañada siguen intactos en los casos ejecutados; no se afirma pérdida de esos archivos.
- **Corrección y regresión necesarias:** conservar una condición recuperable y visible si falla cualquier paso del reemplazo, devolver un resultado de disco comprensible y verificar reinicio/reintento. Mantener la decisión de Efraín: confirmación explícita, archivo dañado aparte y registro apagado tras un reemplazo completado. No se pide otra decisión sobre esa política.

### AUD-02-V3 · Media · La limpieza del fragmento final mezcla caracteres con bytes UTF-8

- **Archivo:** TecnoBloques/escritorio/registro-disco.js:156 y :160 frente al límite de escribir en :265.
- **Condición:** evento codigo_compilado sintético con una cadena de 1 400 000 letras ñ. Su JSON tiene 1 400 215 caracteres, por debajo del límite de 2 097 152, y 2 800 215 bytes UTF-8. El revisor del contrato devuelve cero errores y escribir acepta el evento completo en el control. No se afirma compilación real de ese programa.
- **Reproducción:** se conserva una primera línea válida y se escriben realmente los primeros 2 500 000 bytes del evento sin LF; esto simula el archivo dejado por un cierre abrupto, sin matar una app ni llenar un disco físico. Se crea un módulo nuevo y se escribe un evento pequeño.
- **Observado:** la búsqueda mira solo LINEA_MAX + 2 bytes. Como no encuentra el LF anterior, corta en mitad del fragmento. El evento nuevo se concatena a lo que queda: una línea válida y una inválida, archivo de 403 230 bytes, aunque escribir devuelve true y falla queda null. La primera línea completa permanece intacta. El control con fragmento de 24 bytes deja dos líneas válidas.
- **Impacto:** corrupción silenciosa del JSONL y pérdida de legibilidad del evento nuevo en una entrada que el escritor y el contrato permiten. Se clasifica media por requerir un fragmento grande y un reinicio.
- **Corrección y regresión necesarias:** recuperar hasta una frontera real de línea para todos los tamaños UTF-8 admitidos, preservando las líneas completas anteriores. Probar límites de bytes/caracteres, archivo con/sin línea previa y fragmentos multibyte; no basta ampliar una constante sin relacionarla con el límite de entrada.

## Comprobaciones ejecutadas por Codex

| Comprobación | Resultado y alcance |
|---|---|
| npm.cmd run test:registro, en TecnoBloques | Aprobado, 121 OK; incluye parcial de evento/marca, fallo del truncado, cola y recuperación, configuración ilegible, confirmación y exportación normal; ocho líneas contra el contrato actual. Los dos umbrales temporales heredados no se acreditan como rendimiento: alimentación no determinada en esta ronda. La consulta WMI fue denegada. |
| npm.cmd run test:registro-app, en TecnoBloques | Aprobado, 52 OK, sin errores de consola; build local, archivo real de solo lectura, compilación/simulación, E1–E5, cierre normal y reemplazo V2 completado. La prueba de herramientas sin PIN pasó en esta corrida. |
| node docs/verificar-aud02-2026-10-18.cjs | Caso original HEAD reproducido; fallo completo y parcial de 24 bytes recuperados, cero líneas inválidas, marca recuperados 1/perdidos 0; arranque CONFIG reconocido y PIN sin confirmación rechazado. Exit 1 por una regla antigua de UI copiada a mano dentro del diagnóstico. Coincido con la observación de Claude: ese booleano no prueba un defecto actual de la interfaz. [Captura nueva](aud02-segunda-originales-2026-10-18.json). |
| node docs/repro-aud02-arranque-electron-2026-10-18.cjs | Aprobado, exit 0: aviso visible, falla CONFIG, configIlegible true, panel «la configuración está dañada», erroresJS vacío. Confirma directamente el consumidor actual de V2. |
| node docs/verificar-aud02-segunda-2026-10-18.cjs | Fallido para aceptación, exit 1: reproduce V3/V4. Controles positivos: evento UTF-8 entero aceptado/legible, esquema sin errores, fragmento corto recuperado y primera línea intacta. [Evidencia](aud02-segunda-fronteras-2026-10-18.json). |
| node docs/repro-aud02-pin-fallido-electron-2026-10-18.cjs | Fallido para aceptación, exit 1: después del guardado fallido del PIN, aviso oculto, sin falla y panel de PIN nuevo; erroresJS vacío. |

No se relajaron umbrales ni se modificaron producto o pruebas de Claude. Los diagnósticos adversos no son regresiones aprobadas. Las reproducciones y este informe son trabajo propio de Codex, revisado por su autor; no se afirma una segunda revisión independiente.

## Versión y dependencias

Tres repositorios en main: TecnoBloques 262238435baadc1bea313afc9154a89d789e4611, TecnoCircuito b75c1d0c2979679e7958f49edbdf1cfddaa102d5 y TecnoSuite bfc88ccfafab87678fa0143bf57c243d9de34a0d. Hay trabajo sin commit previo a la revisión, conservado. Los diez [SHA256 completos](aud02-segunda-version-2026-10-18.json) coinciden con CLA-20261018-008 y las tres dependencias de contrato de la entrega anterior; se comprobaron antes y después de las pruebas.

Se revisaron los diffs de disco, IPC, UI y pruebas, además del evento aditivo autorizado y su consumidor. Contrato/esquema/prueba de contrato de TecnoCircuito no cambiaron respecto de la verificación anterior; no se repitió su suite completa ni el emisor Chromium, ya aprobados entonces. Las pruebas actuales Node/Electron sí validan las líneas contra el revisor del hermano. No se traslada esa aprobación a V3/V4.

## Límites y siguiente paso

No se probó un disco físico lleno, instalador, hardware o aula. El cierre normal está recorrido en Electron; el cierre con cola todavía fallando y el reinicio con esa cola perdida no se verificaron. La cola permanece en memoria según el límite declarado por Claude. Descartar un fragmento previo sin atribuir sesión no es motivo independiente de esta devolución; el bloqueo V3 es dejar JSON inválido y aparentar éxito. El borrado externo de configuración conserva el límite de confianza declarado; V4 ocurre por una operación interna.

AUD-06 permanece separada: Claude comunica una tercera ocurrencia intermitente; no es observación propia nueva ni prueba de causa. Claude toma y reserva la corrección de V3/V4, coordinando con AUD-04; Codex verificará la siguiente entrega. Sin commit, push ni publicación.
