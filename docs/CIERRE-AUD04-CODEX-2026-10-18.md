# Cierre verificado de AUD-04

2026-10-18 20:22 · Codex · America/Bogota. **AUD-04 verificada en software**, tras CLA-20261018-013. Caso original y AUD-04-V1 cerrados en el alcance comprobado. Se conserva el [informe de devolución](VERIFICACION-AUD04-CODEX-2026-10-18.md) con sus capturas.

## Qué cambió y qué se verificó

La política aprobada por Efraín se conserva: cambiar de equipo detiene la simulación y cierra su corrida antes de terminar la sesión; los bloques pendientes quedan en el equipo anterior; confirmar el mismo código conserva sesión y simulación. Una preparación pendiente de otro turno no inicia una corrida nueva.

La corrección coloca las esperas de compilación y desconexión serial antes de la comprobación final del turno. Después crea e inicia el simulador sin otra espera intercalada. simulador.compilando permanece activo durante la desconexión. En subirPlaca, el turno se captura antes de la primera espera; se revisó ese guard por código.

**Comprobaciones ejecutadas por Codex:**

- npm.cmd run test:registro-app, en TecnoBloques: **72 OK, exit 0**, sin errores de consola. Incluye cambio corriendo/en pausa, mismo código, compilación pendiente, bloques pendientes, cierre normal, apagado y desconexión serial pendiente con/sin cambio. Las 41 líneas de C3–H5 cumplen el contrato del hermano. Los recorridos de fallo/recuperación de registro E1–E5/V2 también pasan. La prueba de herramientas sin PIN pasó, sin cerrar AUD-06 por una aprobación aislada.
- node docs/verificar-aud04-serial-electron-2026-10-18.cjs, sin modificarlo: **exit 0**. [Captura nueva](aud04-cierre-evidencia-2026-10-18.json). Original A7→B2 detenido correctamente; control serial sin cambio inicia en B2. Con cambio B2→C3 durante close(), compilando permanece true hasta terminar, C3 queda sin simulación y aparece el aviso de pulsar Simular otra vez. La compilación ya completada queda en B2; C3 tiene solo sesion_iniciada/sesion_terminada. Esquema y erroresJS vacíos.
- El mismo diagnóstico dio exit 1 sobre 4e68e89c… en la devolución anterior. La regresión actual verifica el caso que fallaba y el control positivo; no se utiliza el aborto de la reproducción antigua como aprobación.

Electron, Arduino CLI, desconectarSerial y simulador son reales; solo el objeto puerto y su cierre pendiente son sintéticos. No se abrió ni escribió una placa física. No se acredita rendimiento.

## Versión y dependencias

Repositorios en main: TB a05aeac634d3c599b7ec55b16ea2945f33bb077c, TC c7921a4ffce8685a82030765d4564dd65274635b, TS f6d5ad624afefd5d19e31590abd8411d0cdb38a0. HEAD nuevos observados localmente; commit/push de AUD-02 fueron comunicados por Claude. Este cierre no ejecuta commit, push ni publicación.

AUD-04 sigue sin commit: app SHA256 ad171ee7b959c0055a5751e9a9150f1895641311fdab5a358a502e159c88fef1; prueba Electron 5d1bb735503834a2d0580aacd0dfb30a21025c62fb187c80f8a357a1aa766f67. Coinciden con CLA-013 antes/después de las comprobaciones. [Manifiesto completo](aud04-cierre-version-2026-10-18.json): incluye fuentes/dependencias y el HTML construido c4a5697f….

Revisado git diff sobre a05aeac, incluida la política original y la corrección de V1. Disco/registro y sus pruebas, IPC y contrato/esquema mantienen los hashes verificados anteriormente. No se repitieron Node 142 ni las suites completas generales/TC al no cambiar esas fuentes; se conserva su aprobación anterior sin presentarla como una ejecución nueva. Electron sí ejercitó el consumidor de compilación/simulación y el revisor de eventos del hermano.

## Límites y siguiente paso

Reproducido antes; software probado e integración local comprobada. Puerto físico, carga real durante cambio de equipo, terminación abrupta sin pagehide, instalador y aula no probados. El cambio visible de detener la simulación al cambiar equipo conserva la observación de uso pendiente. No se auditó cada await de toda la aplicación ni se acredita toda su concurrencia.

Codex no editó fuentes/tests ni CLAUDE.md. Informe y diagnóstico propios revisados por su autor; sin revisión adicional independiente acreditada. Claude actualiza su memoria por el canal.

Tercer cierre funcional del grupo AUD-01/02/04: **3/3**. Inicio AUD-04 19:25, verificación 20:22: 57 minutos de calendario, con espera/corrección/revisión incluidas, no esfuerzo activo. Segundo balance presentado en TecnoSuite/INVESTIGACION.md; faltan opinión breve de Claude y decisión de Efraín. AUD-03/05/06 y validaciones físicas/de uso conservan sus fichas. Sin commit, push ni publicación.
