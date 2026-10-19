# Cuarta verificación de AUD-02

2026-10-18 · Codex · America/Bogota. Entrega CLA-20261018-010. **Devuelta, sin cierre:** V4 conserva un fallo residual cuando tampoco se puede deshacer el reemplazo de carpeta. La corrección de la tercera devolución pasa su matriz completa; se reconoce ese resultado.

## V4 residual · Media · El fallo del propio deshacer vuelve a ocultar CONFIG

- **Archivos:** TecnoBloques/escritorio/registro-disco.js:77 (error del deshacer absorbido), :270 (devolución de carpeta) y :51 (principal ausente interpretada como instalación nueva).
- **Condición:** configuración ilegible en forma de carpeta, reemplazo confirmado por el instructor, movimiento aparte completado y EPERM inyectado tanto al renombrar el temporal como al intentar devolver la carpeta. Son dos errores controlados del sistema de archivos, no un disco físico lleno. Es precisamente el límite que Claude declara en CLA-010; no se atribuye ocultación de ese límite en esta entrega.
- **Resultado Node:** responde {ok:false,motivo:disco}, sin lanzar; el temporal se elimina, no existe configuración principal y estado() / una instancia nueva devuelven activo false, tienePin false, falla null y configIlegible false. La carpeta archivada y el archivo sintético que contiene permanecen intactos. «Principal vacía» en la entrega significa aquí que la ruta no existe, no un archivo JSON vacío.
- **Resultado Electron:** con el perfil posterior al fallo preparado en Node, aviso oculto y panel «Registro de eventos: crear el PIN del instructor», errores JS vacíos. El mismo diagnóstico conserva dos controles: archivo y carpeta con un solo fallo del rename final, ambos con CONFIG visible, aviso visible y panel de dañada.
- **Impacto:** el error se devuelve al intento inmediato, pero desaparece la señal persistente tras una recuperación incompleta; reiniciar lo presenta como instalación nueva. El fallo está en el flujo interno, no en un borrado externo de configuración. No se afirma pérdida de la evidencia archivada ni de registros previos.
- **Qué falta:** definir una recuperación que sobreviva al fallo de restauración, conserve la evidencia y siga mostrando que la recuperación no terminó al reiniciar. La regresión debe cubrir fallo final + fallo al deshacer, un reintento posterior y los dos controles ya corregidos. Declarar el límite no acredita por sí solo el cumplimiento de la aceptación de AUD-02; no consta una excepción de Efraín que autorice cerrarla con este resultado.

## Comprobaciones ejecutadas por Codex

| Comprobación | Resultado |
|---|---|
| npm.cmd run test:registro, TecnoBloques | Aprobado: 133 OK, exit 0. Incluye matriz archivo/carpeta × temporal/aparte/rename final, V1/V2/V3, cola, exportación normal y contrato del hermano. No se acredita rendimiento con los dos umbrales temporales heredados; alimentación no medida en esta ronda. Terminó antes de iniciar Electron. |
| npm.cmd run test:registro-app, TecnoBloques | Suite fallida, exit 1: 51 OK/1 falla de cierre de herramientas sin PIN (AUD-06). Recorridos de registro E1–E5/V2, compilación/simulación, cierre normal y esquema pasan; consola sin errores. Se conserva la falla sin repetir para convertirla en aprobación. |
| node docs/verificar-aud02-tercera-2026-10-18.cjs | Aprobado, exit 0: V3 Unicode legible y matriz 6/6, con evidencia intacta y CONFIG al reiniciar. [Captura actual](aud02-cuarta-fronteras-2026-10-18.json). |
| node docs/verificar-aud02-2026-10-18.cjs | Original HEAD reproducido; fallo completo y parcial de 24 bytes actuales recuperados, cero líneas inválidas, marca correcta y CONFIG reconocido. Exit 1 exclusivamente por el booleano viejo de UI copiado a mano, ya declarado obsoleto; no cuenta como defecto actual. [Captura](aud02-cuarta-originales-2026-10-18.json). |
| node docs/repro-aud02-deshacer-fallido-2026-10-18.cjs | Control con restauración posible pasa; doble fallo pierde el estado CONFIG, con evidencia archivada intacta. Exit 1 de aceptación, no regresión aprobada. [Captura](aud02-cuarta-deshacer-2026-10-18.json). |
| node docs/repro-aud02-cuarta-electron-2026-10-18.cjs | Dos controles con fallo único conservan el aviso; carpeta con fallo final y al deshacer lo oculta. Se comprueba que llegaron exactamente una o dos inyecciones según el caso y que respondió disco sin lanzar. Exit 1, erroresJS vacíos en los tres perfiles. [Captura](aud02-cuarta-electron-2026-10-18.json). |

Los diagnósticos nuevos verifican el retorno disco, sin exigir la excepción de las reproducciones antiguas. Toda evidencia es sintética, perfiles temporales aislados y limpieza limitada al directorio temporal verificado. No se modificaron producto ni pruebas de Claude. Informe y reproducciones propios de Codex, revisados por su autor; no se afirma revisión independiente adicional.

## Versión y límites

Repositorios en main: TecnoBloques 262238435baadc1bea313afc9154a89d789e4611, TecnoCircuito b75c1d0c2979679e7958f49edbdf1cfddaa102d5 y TecnoSuite bfc88ccfafab87678fa0143bf57c243d9de34a0d. Cambios sin commit conservados. [Diez hashes de fuentes y dependencias](aud02-cuarta-version-2026-10-18.json), cotejados antes/después: disco c09c7ef8… y prueba 15cdf5df… coinciden con CLA-010; las otras ocho fuentes no cambiaron respecto de la revisión anterior.

Revisados el flujo de guardar/deshacer y la matriz nueva de pruebas. IPC/UI/esquema/emisor mantienen sus hashes; los consumidores Node/Electron usan el revisor del hermano. No se repitieron las suites completas de contrato/emisor TC ni las generales de TB, sin cambios pertinentes nuevos; test:registro-app sí recorrió compilación/simulación. Los resultados adicionales declarados por Claude siguen atribuidos a él.

No se probó disco físico lleno, instalador, hardware ni aula. Cierre normal probado; cierre con cola todavía fallando no probado. La cola en memoria y el descarte de un fragmento sin atribución siguen como límites declarados; no son motivos nuevos de esta devolución. AUD-06 conserva su propia ficha y no se mezcla con el fallo de configuración.

Siguiente: Claude toma y reserva la corrección puntual del estado persistente de recuperación en V4; Codex verifica la siguiente entrega. Sin commit, push ni publicación. Los cerca de diez minutos comunicados por Efraín quedan registrados como incremento único, acumulado aproximado 40 minutos; no son tiempo cronometrado.
