# AUD-03 · verificación de CLA-20261019-001

19 oct 2026 · Codex (Sol). **AUD-03 verificada y cerrada en software e integración local**, incluidos el caso original y los residuales V1/V2. Implementación de Claude; fuentes y pruebas identificadas antes/después. No acredita hardware, instalador ni uso en el aula.

## Resultado de la reproducción de V2

**V2 corregida:** Detener → cambiar de equipo mientras sigue pendiente el cierre conserva la corrida completa en el equipo que la inició. El cambio funcional está en `TecnoBloques/src/app.js`: `simulador.cerrando` conserva el objeto soltado; las llamadas posteriores a `detenerSimulacion(opciones)` vuelven a pedir `destruir(opciones)` a ese objeto. Cada llamada espera el mismo cierre subyacente; la referencia solo se limpia si todavía corresponde a ese simulador. `sinEsperar` puede finalizar el cierre ya iniciado al salir de la ventana.

Repetí la intercalación de la devolución anterior con Electron, Arduino CLI, Worker, núcleo, app, registro y disco reales. Solo se retiene y libera en orden FIFO la entrega de `foto`/`detenido`; perfil y equipos sintéticos. Se conserva la evidencia anterior, que daba exit 1 con dos fallas y el cierre de B atribuidos a C.

En esta entrega, a los **193,9 ms** de Detener, **B sigue activo**, `simulador.sim` ya es nulo y la promesa original continúa pendiente. Al liberar los mensajes, las dos fallas y el cierre quedan en **la corrida 2 y la sesión de B**, antes de `sesion_terminada`; C abre su sesión después y no recibe eventos del simulador. El control de cambio directo A→B también conserva su corrida completa. **Cero atribuciones cruzadas, cero errores de esquema y cero errores JS/consola.**

El [instrumento de V2](verificar-aud03-v2-2026-10-19.cjs) ejecuta en memoria el instrumento anterior, cambiando el nombre del archivo de salida y añadiendo aserciones de conservación: exactamente un cierre y dos fallas por corrida, mismo equipo/sesión y cierre anterior al fin de sesión. Así, perder todos los eventos tampoco aprobaría. [Evidencia nueva](aud03-v2-electron-2026-10-19.json), [log](aud03-v2-electron-2026-10-19.log), [reproducción fallida anterior](aud03-electron-2026-10-19.json).

## Regresión ejecutada por Codex

| Comando | Resultado y alcance |
|---|---|
| `node prototipo/pruebas/probar_fotos.js` | **Aprobado, 31 OK**: pausa/reanudación, RESET, serial, destrucción, confirmación, tope y separación de corridas; controlador y núcleo reales. [Log](aud03-v2-fotos-2026-10-19.log). |
| `node docs/verificar-aud03-cierre-2026-10-19.cjs fotos` | **Aprobado**, cuatro órdenes del caso original/V1: dos eventos falla, dos fallas en cada cierre y misma corrida; cero residuales. Consumidor real TB. [Log](aud03-v2-original-2026-10-19.log). |
| `npm.cmd run test:registro-app` en TB | **Aprobado, 84/84, exit 0**, sin errores de consola. Incluye AUD-04 y V2 en los cuatro caminos descritos abajo. [Log](aud03-v2-registro-app-2026-10-19.log). |
| `node docs/verificar-aud03-v2-2026-10-19.cjs electron` | **Aprobado, exit 0**, caso independiente de la devolución y control, sin pérdida ni atribución cruzada. |
| `python -I prototipo/pruebas/probar_t1t2.py prototipo/dist/prototipo.html prototipo/pruebas/capturas` | **Aprobado, 17 OK, exit 0**: semilla 20261018, 0 cambios flotantes; 23 lecturas realistas entre 511/512 y 23 ideales, todas 512; consola/esquema sin errores. [Log](aud03-v2-t1t2-2026-10-19.log). |
| `npm.cmd run test:simulador` en TB | **Aprobado, 53 OK, exit 0**, con paquete local: compilación Arduino CLI, Worker, serial/CSV/gráfico, recorridos Uno/Nano/Nano antiguo, proyectos y mediciones; sin errores JS. [Log](aud03-v2-simulador-2026-10-19.log). |

La nueva regresión Electron de Claude conserva la corrida completa al **Detener → cambiar equipo** (I6→J7), al **Detener → Simular** (J7) y al **Detener → apagar el registro** (L9). Al **Detener → cerrar ventana** (K8), exige el cierre anterior al fin de sesión, conservando la excepción declarada: las fotos retenidas no se reciben. Sus 35 líneas de I6 a L9 y las 49 de C3 a I6 cumplen el esquema.

La aserción del orden entre corridas al volver a simular, por sí sola, no discrimina el defecto anterior porque compilar tarda más que el tope. La prueba también comprueba que una segunda llamada a Detener permanezca pendiente antes de liberar el Worker; esta sí cubre la espera compartida. La reproducción independiente aporta además el caso que falló en la revisión anterior. La discriminación de siete controles con `app.js` anterior comunicada por Claude se leyó; Codex no revirtió las fuentes del espacio compartido para repetirla.

**T1/T2:** se revisó el diff: solo mejora el mensaje con cantidad y valores; las dos condiciones (≥15 lecturas y un valor único) no cambian. El fallo de la revisión anterior permanece documentado; la ejecución aprobada actual no aísla su causa ni borra su intermitencia. La hipótesis de muestreo insuficiente sigue siendo una hipótesis. AUD-06 pasó en esta ejecución, sin cerrar su intermitencia histórica; se conservan también las corridas fallidas declaradas por Claude.

## Identidad, documentación y límites

TC `main` **3d4c4d9ed3804d59cdd4b901aab37c1fc52431a6**; TB `main` **f6e5cf3d9694dcbe6b113c72900259ef01a0fe46**; TS `main` **794d7bdb1e5f0060d8d686030d45ce5194ebc928**. **Entrega sin commit:** HEAD no incluye por sí solo el arreglo de V2. Se registró antes de editar el trabajo de Claude y las evidencias/entradas anteriores de Codex; se preservan. [Manifiesto](aud03-v2-version-2026-10-19.json).

- TB `src/app.js`: SHA256 `4d4f162227c266b3945ca62626b7f30204b56918c0e31823eabf1cafa6eabf75`.
- TB `test/registro-app.js`: `7b372cd273d4744f0748399500701d736ed6964874eec9c518cac2e2c7e07958`.
- TC `prototipo/pruebas/probar_t1t2.py`: `93b24cb152179328afd2c945b836cb684d8f79aafc2ed9bab1c4c8fb464ba0e3`.

Las fuentes de controlador/Worker/núcleo y el contrato de TC no cambian respecto de la entrega anterior. Los CJS de las pruebas y el paquete local son los ya construidos con esas fuentes; TB se construyó con `--simulador-local`. COMO-FUNCIONA §66 documenta la espera compartida y sus límites. Se revisaron las entradas de ambas bitácoras; la frase general de la entrada de Claude en TB «en cada caso ... con sus fallas» debe leerse con la excepción de cierre de ventana, que la prueba y la entrega sí explicitan. Se pide a Claude precisar esa frase mediante una entrada nueva, sin reescribir su historia ni bloquear el cierre funcional.

Los SHA256 de todas las fuentes identificadas al inicio coinciden al terminar las pruebas; el manifiesto añade el HTML construido de TB, los CJS usados y los logs. No se cierra una versión posterior distinta por accidente. Reproducido antes: sí. Software probado: sí. Integrado localmente: sí. Validado físicamente: no. Aceptado en uso nuevo: no ejecutado, corresponde a Efraín. Ficha verificada y reservas documentales liberadas al entregar.

**No ejecutado en esta verificación:** suite completa TC, KiCad, suite general TB, instalador, placa física ni aula. No se cambian redes/pads ni el motor; se eligieron pruebas de cierre, registro y consumidor. No hay benchmark nuevo ni validación física. `sinEsperar`, el tope sin confirmación y el inicio directo de otra corrida en el mismo simulador antes de confirmar conservan sus límites documentados; no se promete conservación universal bajo esas condiciones.

Codex revisa implementación de Claude. Informe e instrumento propios revisados por su autor, sin segunda revisión independiente acreditada. Solo se escriben auditoría y coordinación; no se edita producto, contrato ni CLAUDE.md, ni se hace commit, push, etiqueta o publicación. AUD-05 y R1–R8 conservan sus cierres anteriores. REG-004/REG-005 siguen sus fichas; el cierre de AUD-03 no las inicia ni sustituye sus verificaciones o la aceptación de Efraín.
