# Tercera verificación de AUD-02

2026-10-18 · Codex · America/Bogota. Entrega CLA-20261018-009. **Devuelta por una variante residual de V4.** Los casos originales V1/V2 y el caso UTF-8 V3 pasan; el reemplazo de un archivo de configuración dañado también conserva ahora el fallo ante las tres etapas de error probadas. Se preservan los dos informes anteriores y sus capturas.

## V4 residual · Media en esta condición · Una configuración que es carpeta desaparece antes de completar el reemplazo

**Archivos:** TecnoBloques/escritorio/registro-disco.js:263, callback guardarAparte; :72–76, callback seguido del rename final y limpieza del temporal.

**Condición reproducida:** registro-config.json es una carpeta, condición ilegible que esta entrega reconoce y prueba explícitamente. El instructor confirma crear un PIN nuevo. Escribir el temporal funciona y la carpeta se mueve realmente al nombre aparte; se inyecta ENOSPC únicamente cuando el temporal se renombra a registro-config.json. El módulo devuelve correctamente {ok:false,motivo:disco}, sin lanzar.

**Resultado:** el catch borra el temporal y no restaura ni mantiene una señal persistente en la ruta principal. estado() y una instancia nueva devuelven activo false, tienePin false, falla null, configIlegible false. La carpeta archivada y su contenido sintético siguen intactos; no se afirma pérdida de esa evidencia. El bloqueo es el fallo que vuelve a quedar oculto tras una recuperación incompleta.

**Consumidor confirmado:** Electron, con ese perfil tras el fallo preparado en Node, oculta el aviso y presenta «Registro de eventos: crear el PIN del instructor». No hay errores JS. El control idéntico con un archivo '{ roto' mantiene CONFIG, aviso visible y panel «la configuración está dañada». Esta prueba observa el reinicio real; no inyecta ENOSPC mediante un clic de la página.

**Por qué queda dentro de AUD-02:** la variante carpeta ya es una entrada ilegible soportada y probada por el implementador. La suite prueba reemplazarla con éxito; después, las tres pruebas de fallo usan únicamente archivos. No comprueba carpeta + fallo del rename final. El movimiento que hace desaparecer la principal es interno; no se confunde con el límite autorizado sobre borrado externo de configuración.

**Alcance de la gravedad:** se mantiene el ID V4 y se clasifica media esta condición residual, más estrecha que el caso de archivo de la devolución anterior. No es un defecto nuevo de Unicode ni una nueva tarea independiente. AUD-02 sigue sin cierre porque no cumple la recuperación visible para esa rama incluida en la entrega.

**Corrección y regresión que faltan:** conservar un fallo reconocible y recuperable tras un reemplazo incompleto de carpeta, incluido el reinicio, y comprobar las tres etapas de fallo para ambas formas de configuración ilegible. Mantener evidencia archivada y reintento definido. La política aprobada por Efraín permanece: confirmación explícita, dañada aparte y registro apagado cuando el reemplazo termine correctamente.

## Evidencia propia

| Comprobación | Resultado |
|---|---|
| npm.cmd run test:registro, en TecnoBloques | Aprobado: 130 OK, exit 0. Parciales de evento/marca, truncado que falla, cola, exportación normal, configuración ilegible, confirmación, nombres aparte y ocho líneas contra el contrato del hermano. |
| npm.cmd run test:registro-app, en TecnoBloques | **Fallido como suite:** 51 OK y una falla, exit 1: «y si se abren por otro camino, se cierran solas». Es una observación propia nueva de AUD-06, separada. Los recorridos de registro E1–E5/V2, compilación/simulación, cierre normal y esquema pasan; consola sin errores. No se repitió para convertirla en aprobada. |
| node docs/verificar-aud02-2026-10-18.cjs | HEAD reproduce el original; el manejador actual notifica y recupera fallo completo. El parcial real de 24 bytes deja cero líneas inválidas y marca recuperados 1/perdidos 0. CONFIG detectado desde el arranque y PIN sin confirmación rechazado. Exit 1 por la regla vieja de UI copiada a mano, ya reconocida como obsoleta. [Captura actual](aud02-tercera-originales-2026-10-18.json). |
| node docs/verificar-aud02-tercera-2026-10-18.cjs | V3 original aprobado: fragmento de 2 500 000 bytes, evento nuevo legible y línea anterior intacta; control entero admitido por escritor y contrato. V4 archivo aprobado en temporal/copia/rename final; carpeta aprobada en temporal/movimiento aparte y **fallida en rename final**. Matriz 5/6, exit 1. [Captura](aud02-tercera-fronteras-2026-10-18.json). |
| node docs/repro-aud02-tercera-electron-2026-10-18.cjs | Archivo: fallo CONFIG visible tras reiniciar. Carpeta: aviso oculto, falla null, panel de instalación nueva. Las dos llamadas devuelven disco sin lanzar y cada una alcanza exactamente una inyección del rename final; erroresJS vacío. Exit 1. [Captura](aud02-tercera-electron-2026-10-18.json). |

Los dos diagnósticos de la segunda revisión exigían una excepción ENOSPC para comprobar la inyección de entonces. Ese requisito instrumental quedó obsoleto al devolver ahora motivo disco. Coincido con Claude: ese aborto no demuestra un defecto del producto. Creé diagnósticos nuevos que esperan el retorno correcto, conservando las versiones históricas; el fallo residual descrito arriba se alcanza después de verificar ese retorno y no depende de la aserción antigua.

La suite Node contiene dos umbrales temporales heredados: no se usan aquí como prueba de rendimiento. Alimentación no medida en esta ronda; al iniciar el build Electron seguía terminando el bloque asíncrono de cola de Node. No se modificaron umbrales, producto ni pruebas del implementador. Datos y perfiles sintéticos exclusivamente. Las reproducciones y este informe son propios de Codex, revisados por su autor; no se afirma revisión independiente adicional.

## Versión, dependencias y límites

Tres repositorios en main: TecnoBloques 262238435baadc1bea313afc9154a89d789e4611, TecnoCircuito b75c1d0c2979679e7958f49edbdf1cfddaa102d5 y TecnoSuite bfc88ccfafab87678fa0143bf57c243d9de34a0d. Trabajo sin commit conservado. [Diez hashes completos](aud02-tercera-version-2026-10-18.json) cotejados antes y después: disco 4e35306f… y test/registro 02adb498… coinciden con CLA-009; los otros ocho archivos/dependencias mantienen las versiones revisadas anteriormente. Se revisaron la implementación actual, su diff y las regresiones añadidas; IPC/UI/contrato conservan sus hashes.

No se repitieron el contrato completo ni el emisor Chromium de TecnoCircuito, sin cambios desde su comprobación aprobada anterior. Los consumidores actuales Node/Electron usan el revisor del hermano. No se ejecutaron otra vez las suites generales ni test:simulador independiente: el consumidor de simulación sí se recorrió dentro de test:registro-app. Los resultados adicionales declarados por Claude se conservan como suyos.

No se probó disco físico lleno, instalador, hardware ni aula. Cierre normal probado; cierre con cola todavía fallando no probado. La cola en memoria y el descarte de fragmentos sin atribución de sesión siguen como límites declarados, sin agregarlos como motivos nuevos de devolución. La copia aparte sobrante cuando falla un reemplazo de archivo no es un bloqueo.

Siguiente: Claude toma y reserva la corrección puntual de V4 en la rama carpeta y añade la regresión; Codex verifica. AUD-06 se actualiza con la nueva observación, sin afirmar causa. Sin commit, push ni publicación.

## Nota al retomar la sesión · 2026-10-18 19:03

Este informe corresponde exclusivamente a CLA-20261018-009 (disco 4e35306f… y prueba 02adb498…). Se habían ejecutado las comprobaciones y escrito el informe antes de la interrupción; faltaba trasladar el resultado a ficha/canal/registro. Al retomar, CLA-20261018-010 y la ficha documentan una cuarta entrega, con archivos distintos. Su estado en_revision se conserva; este informe no verifica ni devuelve esa cuarta versión. No se reejecutaron las pruebas de la tercera entrega sobre la cuarta para atribuirles resultados indistintamente.
