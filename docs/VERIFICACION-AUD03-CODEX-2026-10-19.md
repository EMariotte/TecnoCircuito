# AUD-03: CLA-20261018-016 devuelta por atribución del cierre pendiente

19 oct 2026 · Codex (Sol). **AUD-03 vuelve a pendiente.** El caso original y V1 de conservación al detener están corregidos en TecnoCircuito. La integración introduce un residual de gravedad **alta**, V2: Detener seguido de cambio de equipo puede registrar las fallas y el cierre de la corrida en el equipo siguiente. No se cierra AUD-03 ni se modifica el cierre histórico de AUD-04: es una regresión de la nueva entrega.

## V2 · TecnoBloques olvida la espera cuando ya se pulsó Detener

**Archivo:** `TecnoBloques/src/app.js:1907–1916`. `detenerSimulacion()` pone `simulador.sim = null` y devuelve la promesa del cierre, pero no conserva una referencia compartida a esa espera. Su segunda llamada devuelve `Promise.resolve()` en la línea 1909. `cerrarTrabajoDelEquipo()` (1604–1608), llamado desde la confirmación del equipo (1583–1588), espera esa segunda promesa ya cumplida y permite terminar la sesión anterior mientras su Worker sigue entregando los hechos pendientes. El consumidor real `crearRegistroEventos()` completa cada evento con el equipo y sesión activos al recibirlo.

**Reproducción:** Electron, Arduino CLI, Worker, núcleo, app y registro/disco reales, perfil temporal y equipos sintéticos. Uno con un LED rojo conectado directamente a D13/GND; programa compilado que deja D13 alto. El instrumento retiene en memoria la entrega FIFO de las fotos y `detenido` del Worker real. No sustituye el cálculo, los mensajes, el cierre ni el consumidor. Esta retención hace determinista una intercalación; no mide su frecuencia natural.

1. Equipo `AUD_B`: iniciar la corrida 2 y retener la foto que ya trae `led_quemado` y `corriente_pin`.
2. Ejecutar `detenerSimulacion()`, la misma función que usa el botón Detener. `simulador.sim` queda nulo y su promesa todavía no se cumple.
3. Cambiar mediante la interfaz a `AUD_C`, antes de entregar los mensajes pendientes. El cambio se completa mientras sigue pendiente el cierre de B.
4. Entregar en orden las fotos y `detenido`, y esperar la promesa original.

**Resultado conservado:** a los **248,5 ms** de Detener, el equipo activo ya era C y la promesa original seguía pendiente, antes del tope de 500 ms. La corrida 2 tiene `simulacion_iniciada` en B; B cierra su sesión; C abre la suya y recibe las dos `falla` y `simulacion_detenida` de esa misma corrida, con ambas fallas en el resumen. Hay **tres eventos con atribución cruzada**, cero errores de esquema y cero errores JS/consola. El esquema valida la forma de cada línea, no esta relación entre sesiones.

**Control:** cambiar directamente de A a B, sin una llamada previa a Detener, mantiene A activo mientras espera y entrega sus dos fallas y su cierre antes de `sesion_terminada`. Por tanto, el camino directo corregido funciona; el residual requiere que otra acción haya iniciado ya la espera.

**Impacto:** se atribuyen errores eléctricos del equipo anterior al siguiente, y la historia del primero queda incompleta. El residual incumple la aceptación de AUD-03 «conserva las fallas y su corrida sin contaminación» y la política de atribución de AUD-04. No está comprendido en el límite declarado de cerrar la ventana: aquí la ventana sigue abierta y el Worker confirma antes del tope.

**Comprobación/corrección requerida a Claude:** conservar y compartir el cierre pendiente aunque se haya soltado `simulador.sim`; todas las acciones que dependen del cierre deben esperar esa misma operación. Añadir regresión Electron de Detener → cambiar equipo → entregar foto/confirmación, exigiendo que B conserve inicio, fallas y cierre antes de terminar, y que C no herede ninguno. Cubrir también la espera ya iniciada al apagar el registro y al volver a simular; comprobar el camino `sinEsperar` sin confundirlo con los cierres normales. Codex no implementa la solución.

## Comprobaciones ejecutadas

| Comando / caso | Resultado y alcance |
|---|---|
| `npm.cmd --prefix prototipo run probar:fotos` | **Aprobado**, 31 OK: pausa, RESET, serial, cierre, confirmación, destrucción, tope y descarte de otra corrida. |
| `node docs/verificar-aud03-cierre-2026-10-19.cjs fotos` | **Aprobado**, cuatro órdenes del diagnóstico original, dos fallas registradas y dos en cada cierre, misma corrida, cero residuales. |
| `npm.cmd --prefix prototipo run construir` | **Aprobado**, paquete local `0.1.0-dev`; sin regenerar HEX ni fixtures. |
| `python -I prototipo/pruebas/probar_registro.py prototipo/dist/prototipo.html prototipo/pruebas/capturas` | **Aprobado**, eventos/corridas/fallas y consola revisados. |
| `python -I prototipo/pruebas/probar_simulacion.py prototipo/dist/prototipo.html prototipo/pruebas/capturas` | **Aprobado**, simulación, pausa, reinicio, detención y eventos; consola sin errores. |
| `node prototipo/pruebas/probar_contrato.js` | **Aprobado**, usando los CJS recién generados por `probar:fotos`. |
| `npm.cmd run test:registro-app` en TB, con copia local | **Aprobado**, 72/72, exit 0, sin errores de consola; no contiene la intercalación V2. [Log](aud03-registro-app-2026-10-19.log). |
| `node docs/verificar-aud03-cierre-2026-10-19.cjs electron` | **Fallido**, exit 1 por V2, control directo correcto. Reproducido también antes del ajuste de observación del instrumento. [Evidencia](aud03-electron-2026-10-19.json), [log final](aud03-electron-2026-10-19.log). Es diagnóstico de defecto, no regresión aprobada. |

El instrumento de fotos adapta en memoria el diagnóstico histórico del 18 oct agregando solamente `s.confirmar(f.msSimulados)` antes de pasar los eventos al consumidor. Conserva intacto el archivo histórico. [Salida](aud03-fotos-original-2026-10-19.log), [instrumento actual](verificar-aud03-cierre-2026-10-19.cjs).

**T1/T2:** la primera ejecución de `python -I prototipo/pruebas/probar_t1t2.py ...` terminó **exit 1**, con el único fallo «ideal: la lectura no se mueve (siempre 512)». La condición exige tanto ≥15 lecturas como un único valor; su texto no distingue cuál falló. No se capturaron la lista ni el número del caso fallido y no se atribuye causa. El pin flotante sí dio **0 cambios**, con semilla 20261018. Una repetición con el [observador](observar-t1t2-2026-10-19.py), que solo imprime las listas y conserva las aserciones originales, terminó **exit 0**: 18 lecturas ideales, todas 512; realistas 511/512 y 0 cambios del pin flotante. [Log](aud03-t1t2-2026-10-19.log). La repetición no borra el fallo ni acredita estabilidad global; Claude debe precisar la intermitencia si vuelve a aparecer. La comparación de 1000 semillas de CLA-016 fue leída, **no repetida por Codex**.

## Versión, documentación y límites

TC `main` **3d4c4d9ed3804d59cdd4b901aab37c1fc52431a6**; TB `main` **f6e5cf3d9694dcbe6b113c72900259ef01a0fe46**; TS `main` **794d7bdb1e5f0060d8d686030d45ce5194ebc928**. Los tres árboles estaban limpios antes de registrar la reserva del revisor. Se revisaron los diffs frente a TC `4fce9d8` y TB `2db4e75`. Las fuentes corresponden a los SHA256 de CLA-016 y se comprueban nuevamente al entregar: [manifiesto](aud03-version-2026-10-19.json).

El contrato §2 documenta la promesa, la confirmación, el tope y `sinEsperar`; ambas bitácoras y «Proyecto hermano» reflejan el cambio. COMO-FUNCIONA §66 corrige la garantía anterior: una foto pendiente puede tener un tiempo mayor que el de la pausa. No se altera contrato ni memoria de Claude durante esta revisión.

**No ejecutado:** suite completa TC, KiCad, integración general `test:simulador`, suite general TB, instalador, hardware ni aula. Se eligieron las pruebas afectadas por Worker/cierre/registro; no cambian pads ni redes. No hay benchmark formal nuevo; no se obtuvo el estado del cargador por CIM dentro del sandbox. Los primeros intentos de `probar:fotos` y `probar:contrato` en sandbox fallaron por acceso de esbuild a directorios ascendentes: fallo de entorno, conservado separado de V2; fotos se ejecutó después con elevación y contrato con su CJS recién generado. No hubo rechazo de aprobación automática.

Los límites declarados de cierre de ventana, tope sin confirmación e inicio directo de otra corrida antes de confirmar no se convierten en garantía de conservación. La reproducción V2 no necesita ninguno de ellos. AUD-05 y R1–R8 conservan sus cierres anteriores, sin verificación física nueva.

**Siguiente:** Claude toma/reserva V2 y entrega la corrección con regresiones; Codex vuelve a verificar. Ficha pendiente, reservas del revisor liberadas y cierre nulo. Informe e instrumentos propios revisados por su autor, sin segunda revisión independiente. Sin cambios de producto, CLAUDE.md, commit, push, etiqueta ni publicación por Codex.
