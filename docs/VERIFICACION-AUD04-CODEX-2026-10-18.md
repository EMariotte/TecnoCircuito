# Verificación de AUD-04

2026-10-18 · Codex · America/Bogota. Entrega CLA-20261018-012. **Devuelta por AUD-04-V1, media en esta condición:** se inicia en el equipo nuevo una simulación preparada por el anterior si el cambio ocurre durante la desconexión serial. El caso original de cambio durante una corrida ya está corregido.

## Hallazgo

**Archivo y causa:** TecnoBloques/src/app.js:1821 comprueba turnoEquipo después de compilar, pero :1845 vuelve a suspenderse en await desconectarSerial(). No vuelve a comprobar el turno antes de :1847 asignar simulador.sim y :1850 iniciar la corrida. desconectarSerial real espera cancelar el lector, terminar el bucle y cerrar el puerto (:1246 y siguientes).

**Reproducción:** Electron y Arduino CLI reales con datos sintéticos. Se confirma A7, se simula y se cambia a B2 mediante los controles visibles: la simulación se detiene y el cierre queda en A7 antes de sesion_terminada. Este control acredita la corrección original. Luego se conecta únicamente en memoria un objeto puerto sintético cuyo close() queda pendiente; la función desconectarSerial de producto no se reemplaza. Se ejecuta simular de B2, se espera a alcanzar close(), se cambia a C3 con los controles visibles y se libera el cierre.

**Observado:** mientras espera, B2 tiene codigo_compilado, compilando false y simulador.sim null. El cambio termina la sesión de B2. Al resolver close(), C3 empieza a correr sin pulsar Simular otra vez: simulacion_iniciada aparece en C3 aunque la preparación y codigo_compilado quedaron en B2. El código posterior al await conserva una referencia local al simulador que el cierre de sesión no podía detener porque aún no estaba en simulador.sim.

**Control adicional:** la misma desconexión sintética sin cambiar de equipo inicia normalmente en B2. Después, con la misma rama y cambiando a C3, se reproduce el fallo de nuevo. Todas las líneas cumplen el esquema y no hay errores JS; eso no detecta esta ruptura de atribución.

**Impacto y gravedad:** contradice la política decidida por Efraín de descartar trabajo preparado por otro turno y pedir Simular otra vez; reparte preparación e inicio entre sesiones. La condición es más estrecha que el original y requiere una desconexión pendiente, por lo que se clasifica media. Se acredita el fallo de lógica con un puerto sintético; no se afirma reproducción ni validación sobre un puerto/hardware físicos.

**Qué falta:** validar la pertenencia del trabajo después de las operaciones asíncronas que aún preceden al inicio, y disponer del simulador preparado si el turno ya cambió. Añadir regresión con close() pendiente, cambio de equipo, control sin cambio y comprobación de eventos por sesión. Revisar los caminos afines sin alterar la política ya aprobada.

## Comprobaciones propias

- npm.cmd run test:registro-app: **67 OK**, exit 0, consola sin errores. Incluye el original corriendo, pausa, mismo código, compilación pendiente, resumen de bloques, cierre de app, apagado y 34 líneas C3–G4 contra contrato. Se reconocen estos resultados.
- npm.cmd run test:registro: **142 OK**, exit 0, para el registro de disco integrado y sus dependencias. AUD-02 tiene cierre propio.
- [Diagnóstico independiente](verificar-aud04-serial-electron-2026-10-18.cjs): **exit 1 de aceptación**, caso original corregido y control serial sin cambio aprobados; el cambio durante close() reproduce AUD-04-V1. [Captura con control](aud04-serial-control-evidencia-2026-10-18.json). La [primera captura](aud04-serial-evidencia-2026-10-18.json), previa a añadir el control serial, reproduce la misma secuencia. No son regresiones aprobadas.

La reproducción antigua del 17 oct esperaba el defecto y abortaría al ver la detención corregida. No se usa ese aborto para aprobar la regresión: el diagnóstico nuevo observa y verifica directamente el orden correcto del original y el caso adicional.

## Versión, alcance y entrega

TB main 262238435baadc1bea313afc9154a89d789e4611; app SHA256 4e68e89c72fffe0daecaec916ceaa84ec04ea2d940154dc0f8b053e9d8fb3dd8 y test/registro-app fb3be36ef082bf3bc16cb2500926a036983b4e46d1688606b1e31bdd12d3f0be. TC main b75c1d0c2979679e7958f49edbdf1cfddaa102d5; TS main bfc88ccfafab87678fa0143bf57c243d9de34a0d. Sin commit, hashes comprobados antes/después. [Manifiesto](aud02-aud04-version-verificada-2026-10-18.json) con fuentes y HTML construido. No se modificaron archivos del implementador.

Se revisaron el parche y los cambios de simular, cierre del turno, bloques pendientes y subida. La [reconstrucción temporal](aud02-aud04-parche-verificado-2026-10-18.json) recupera app base exactamente y prueba base equivalente con LF; no se aplicó el parche al repositorio real. El cruce con AUD-02 se verifica sobre la combinación actual; devolver AUD-04 no reabre el cierre de recuperación de disco de AUD-02.

No se probó una carga física ni un cambio de equipo durante ella; el guard de subida se revisó por código. No se validó terminación abrupta del proceso ni aula; pagehide no cubre un proceso terminado de golpe, como declara Claude. No se acredita rendimiento. Los resultados generales/preprocesador adicionales de la entrega siguen atribuidos al implementador y no se ejecutaron otra vez sin necesidad.

Datos y perfiles sintéticos; nunca se abrió ni escribió una placa. Diagnóstico e informe propios de Codex revisados por su autor, sin revisión adicional independiente acreditada. Claude toma/reserva y corrige AUD-04-V1; Codex verifica después. Sin commit, push ni publicación.
