# AUD-03: entrega devuelta por pérdida de hechos al cerrar

18 oct 2026 · Codex · Revisión de CLA-20261018-014 junto con la entrega AUD-05. **AUD-03 vuelve a pendiente, gravedad media.** La pausa original está corregida; el cierre con foto pendiente todavía incumple la aceptación de la ficha y PRUEBAS.md. Es el límite que Claude declaró, comprobado ahora; declararlo no acredita una excepción de Efraín.

## V1 residual: detener antes de recibir la foto pierde las fallas

**Archivos:** `prototipo/src/simulador.js:51` descarta cualquier foto en estado detenido; `:180` emite el cierre síncrono con las fallas recibidas hasta entonces; `:201` destruye después el Worker. La prueba `prototipo/pruebas/probar_fotos.js`, caso 7, exige que no aparezcan eventos después del cierre, pero no exige que este conserve los hechos pendientes.

**Reproducción:** núcleo real, Uno, fijo13.hex, LED rojo conectado directamente a D13/GND sin resistencia, semilla 1, daño y límite del pin activos. Después de 16,0000625 ms la foto contiene `corriente_pin` y `led_quemado`. Controlador real en VM, entrega de Worker controlada. Los eventos emitidos se pasan al consumidor real `crearRegistroEventos` de TecnoBloques, con equipo y sesión sintéticos; no se reemplaza el comportamiento del consumidor.

| Orden de acciones | Fallas en foto | Eventos falla registrados | Fallas en cierre |
|---|---:|---:|---:|
| Pausa → entregar foto → Detener (control corregido) | 2 | 2 | 2 |
| Pausa → Detener → entregar foto | 2 | 0 | 0 |
| Detener → entregar foto | 2 | 0 | 0 |
| Destruir → entregar foto | 2 | 0 | 0 |

**Impacto:** el registro del equipo cierra sin las dos fallas ya producidas. El consumidor no puede reconstruirlas a partir de los eventos que recibió. El control sí conserva ambas en la misma corrida. No se midió la frecuencia de esta intercalación en Electron ni se afirma un límite máximo de pérdida a partir de esta prueba.

**Comprobación que falta añadir:** exigir conservación y pertenencia de los hechos cuando el cierre precede a la recepción, incluyendo pausa/cierre, detención directa y destrucción; comprobar el cambio de sesión/equipo sin contaminación. Hay que conservar la política de cierre de AUD-04. No basta aceptar una foto después de cerrar y atribuirla al equipo siguiente. Claude implementa la solución; Codex no modifica el producto.

## Lo que sí pasa y límites de la revisión

- `probar:fotos`: **17 OK** sobre la entrega actual, dentro de la suite ejecutada por Codex. Pausa/reanudación, RESET, serial pendiente, recableado y descarte de corrida anterior pasan; el caso 7 sigue siendo una comprobación del límite, no de la aceptación completa.
- Diagnóstico propio `node docs/verificar-aud03-aud05-2026-10-18.cjs fotos`: **exit 1**, tres casos residuales y un control aprobado. Es reproducción de defecto, no regresión aprobada. [Salida conservada](aud0305-evidencia-2026-10-18.json).
- TecnoBloques con paquete local: `test:simulador` **53 OK**, `test:registro-app` **72 OK** y `test:graficador` **28 OK**, exit 0 y sin errores JS/consola en las pruebas de aplicación. La suite normal no intercala la foto pendiente de estos tres casos.
- La suite completa TC terminó **exit 1** por T1/T2 (3 cambios de entrada flotante en 3 s frente al máximo de 2). Su repetición aislada dio 17 OK; los nueve recorridos posteriores pasaron individualmente. Se conserva el fallo; no se presenta un comando completo aprobado. Detalle común y condiciones en el [informe AUD-05](CIERRE-AUD05-CODEX-2026-10-18.md).

La explicación de COMO-FUNCIONA §66 también debe evitar garantizar que el tiempo de una foto pendiente sea menor o igual al de la pausa: la pausa usa las últimas medidas recibidas, que pueden ser anteriores a la foto pendiente. El tiempo de la foto se conserva; no se ha acreditado aquella desigualdad.

## Identificación y siguiente paso

TC main `4fce9d820b27ec09130151bf801d330ab07a987a`; TB main `2db4e758e3ae6f7be48e254c5484ce5184627c61`; TS main `d5c92142bdd5ee30c23d4b7636476e5df02c89ae`. Entregas sin commit de Claude, con trabajo preexistente registrado antes de editar. `simulador.js` SHA256 `463decfc78f4ade6296b363959b66b788d81be088e377a876bd4b7cc94eb8c0b`; prueba fotos `8c6fc35144ecabe305b9c6fb6f4585cad84fdbf39f7a868788e7073b9a296994`, coincidentes antes/después.

[Manifiesto y artefactos](aud0305-version-2026-10-18.json), [instantánea inicial](aud0305-base-version-2026-10-18.json) e [instrumento de auditoría](verificar-aud03-aud05-2026-10-18.cjs). Cruce del parche sobre copia temporal comprobado: COMO-FUNCIONA recupera bytes exactos de CLA-014; package coincide tras normalizar CRLF→LF. No se revirtieron fuentes del espacio compartido.

Siguiente: Claude toma/reserva V1 residual y entrega conservación del cierre junto con sus regresiones y la documentación corregida. Codex vuelve a verificar. Sin cambios de contrato, memorias de Claude, producto, commit, push ni publicación por Codex. Instrumento e informe propios revisados por su autor; sin segunda revisión independiente acreditada. Software y consumidor local, sin validación física, instalador ni aula.
