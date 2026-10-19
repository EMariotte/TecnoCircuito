# Cierre verificado de AUD-02

2026-10-18 · Codex · America/Bogota. **AUD-02 verificada en software**, tras CLA-20261018-011 y las comprobaciones siguientes. V1–V4 cerrados en el alcance revisado. Se conservan los cuatro informes de devolución y sus evidencias.

## Corrección y comprobación

El fallo completo de escritura avisa, conserva los eventos en cola y los recupera en orden con registro_interrumpido. Los parciales de evento/marca se revierten antes de reintentar; la limpieza al reiniciar busca una frontera real de línea, también con UTF-8 largo. Una configuración ilegible se reconoce desde el arranque y el reemplazo necesita la confirmación autorizada por Efraín.

La quinta corrección resuelve V4: antes de mover una carpeta ilegible escribe registro-config.json.recuperando. Si fallan reemplazo y restauración, la marca permanece y un arranque posterior conserva CONFIG y configIlegible. Un reintento confirmado escribe la configuración nueva sin mover otra vez la evidencia; queda apagado y elimina la marca. Si no se puede crear la marca, no se mueve la carpeta.

| Evidencia ejecutada por Codex | Resultado |
|---|---|
| npm.cmd run test:registro, en TecnoBloques | Aprobado, 142 OK, exit 0. Cola/topes, orden, parcial de evento/marca, truncado que falla, exportación normal, matriz 2×3, doble fallo, reinicio, reintento fallido y exitoso, confirmación, evidencia intacta, marca imposible y marca vieja. Ocho líneas contra el contrato del hermano. |
| npm.cmd run test:registro-app, en TecnoBloques | Aprobado, 67 OK, exit 0, consola sin errores. Recorridos E1–E5/V2 con archivo real de solo lectura, compilación/simulación, cierre normal y nuevos recorridos de cambio de equipo. La prueba de herramientas sin PIN pasó hoy; AUD-06 conserva sus fallas anteriores. |
| node docs/verificar-aud02-tercera-2026-10-18.cjs | Aprobado, exit 0: matriz independiente 6/6 y caso UTF-8 original con cero líneas inválidas y primera línea intacta. [Captura](aud02-quinta-fronteras-2026-10-18.json). |
| node docs/repro-aud02-deshacer-fallido-2026-10-18.cjs | Aprobado, exit 0: control y doble fallo mantienen CONFIG tras reiniciar; evidencia sintética intacta. [Captura](aud02-quinta-deshacer-2026-10-18.json). El mismo diagnóstico falló sobre c09c7ef8…, según el cuarto informe. |
| node docs/repro-aud02-cuarta-electron-2026-10-18.cjs | Aprobado, exit 0: archivo, carpeta y carpeta con doble fallo muestran aviso visible, CONFIG y panel de dañada tras reiniciar. Errores JS vacíos en los tres perfiles. [Captura](aud02-quinta-electron-2026-10-18.json). |
| node docs/verificar-aud02-2026-10-18.cjs | HEAD reproduce el original; el handler actual notifica/recupera fallo completo y parcial de 24 bytes, cero líneas inválidas y marca recuperados 1/perdidos 0. Exit 1 por la regla antigua de UI copiada a mano, no por defecto actual; la UI se comprobó directamente arriba. [Captura](aud02-quinta-originales-2026-10-18.json). |

No se acreditan los dos umbrales temporales heredados de Node como rendimiento; alimentación no medida en esta ronda. Node terminó antes de iniciar Electron. No se modificaron umbrales ni fuentes/tests del implementador. Perfiles y datos sintéticos exclusivamente.

## Versión exacta e integración

Repositorios en main: TecnoBloques 262238435baadc1bea313afc9154a89d789e4611, TecnoCircuito b75c1d0c2979679e7958f49edbdf1cfddaa102d5 y TecnoSuite bfc88ccfafab87678fa0143bf57c243d9de34a0d. Cambios sin commit conservados. [Manifiesto de fuentes, parche y artefactos](aud02-aud04-version-verificada-2026-10-18.json), cotejado al inicio y al terminar: disco 2320f014… y prueba 37782364… de CLA-011; app 4e68e89c… y prueba Electron fb3be36e… de CLA-012. Se verificó la combinación actual. El HTML local construido tiene SHA256 77596ed2…; dependencia TC local c1c9c605….

El parche de AUD-04 fue revertido únicamente en una carpeta temporal para comprobar procedencia. Recupera app.js exactamente cd1add5f… y la prueba Electron 88dff2f3… al normalizar sus saltos a LF. El intento de comparación de bytes de esa prueba no coincidió por CRLF; se identificó y registró, sin tocar el árbol de trabajo. [Hashes](aud02-aud04-parche-verificado-2026-10-18.json).

Contrato/esquema y prueba de contrato TC conservan sus hashes aprobados; las suites actuales validan el consumidor del hermano. No se repitió la suite completa TC ni test:simulador independiente, sin cambio de núcleo/contrato. Compilar/simular sí se recorrió en Electron. El cierre de los fallos de disco no acredita el cierre de AUD-04: su variante serial tiene informe propio.

## Límites conservados y siguiente paso

Software probado e integración local comprobada. No se probó instalador, disco físico lleno, pérdida de energía, hardware ni aula. Cierre normal recorrido; cierre con cola aún fallando no probado. Lo pendiente sigue en memoria y un fragmento de cierre abrupto se descarta sin atribuir sesión, según los límites del plan. No se presenta como almacenamiento durable ante cualquier fallo.

La entrega declara además: marca vieja y borrado manual producen un aviso conservador; existsSync puede no observar una marca bajo ciertos permisos; doble fallo de limpieza de una copia de archivo puede dejar evidencia duplicada, sin eliminar la principal. Se distinguen esas condiciones de los casos de aceptación ejecutados; no se afirma haber reproducido cada combinación de permisos.

Claude actualiza su memoria por su canal. AUD-04 y AUD-06 mantienen sus dictámenes propios; Efraín decide prioridades y publicación. Segundo cierre funcional del grupo AUD-01/02/04: segundo balance 2/3, todavía no procede el balance final. Informe y diagnósticos propios revisados por Codex, sin revisión adicional independiente acreditada. Sin commit, push ni publicación.
