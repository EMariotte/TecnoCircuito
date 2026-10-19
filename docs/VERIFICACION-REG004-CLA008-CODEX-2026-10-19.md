# REG-004 · Verificación de CLA-20261019-008

Codex · 19 de octubre de 2026 · continuación de SES-20261019-001.

**Resultado: software del lector e integración local verificados; R1c verificado en sus dos reproducciones. R1/R1a/R1b y R2 conservan su verificación en los casos ejecutados.** Los cierres contradictorios ya no eliminan fallas recibidas. REG-004 pasa a `pendiente_externo`: falta la aceptación humana de Efraín.

## Qué se verificó

Se revisaron el lector completo, las regresiones de Claude, la documentación de COMO-FUNCIONA §68 y las bitácoras. La entrega no modifica el contrato. El lector y su prueba son archivos nuevos sin seguimiento en Git; HEAD por sí solo no identifica esta implementación. Se conserva el trabajo existente de Claude y de Codex.

En `TecnoBloques/herramientas/historia-registro.js`, `hechos()` une las fallas de todos los `cierres` con las recibidas individualmente. Tanto las corridas propias como las que no tienen inicio conocido acumulan los cierres. En las propias, la consolidación exige coincidencia entre cierres y con las fallas individuales; los cierres contradictorios impiden una comparación concluyente. Cada cierre de una corrida propia conserva su paso; el último contiene el resumen consolidado.

**Reproducción original de R1c:** inicio de sesión → inicio de corrida → cierre con LED quemado → cierre vacío de esa misma corrida → fin. La falla permanece en `fallas`, `cierre` y resumen; `coherente=false`, se avisa la contradicción y el final no se afirma. En la variante sin inicio, el LED permanece marcado «sin atribuir: corrida 1» y no se asigna al montaje del equipo. Los dos controles anteriores también pasan.

La [evidencia de CLA-007](reg004-cla007-cierres-2026-10-19.json) conserva las dos pérdidas anteriores, con lector `cbdefdcc…cfda532`. El mismo diagnóstico, ejecutado con esta entrega y salida nueva, da **cero pérdidas, exit 0**. No se sobrescribieron diagnósticos ni resultados anteriores. La discriminación que Claude comunica haber ejecutado con su copia del scratchpad no se presenta como ejecución de Codex: aquí se contrasta la evidencia anterior propia conservada con la ejecución actual del mismo caso.

## Comprobaciones ejecutadas

| Comando | Resultado y evidencia |
|---|---|
| `npm.cmd --prefix ../TecnoBloques run test:historia` | **33 OK, exit 0.** Secuencia conocida exacta, integridad AUD-01–04, resúmenes incompletos, comparaciones tardías, hechos sin inicio y regresiones de cierres. [Log](reg004-cla008-historia-2026-10-19.log). |
| `node docs/verificar-reg004-cla008-2026-10-19.cjs original` | **5 casos, cero residuales, exit 0.** [Evidencia](reg004-cla008-original-2026-10-19.json), [log](reg004-cla008-original-2026-10-19.log). |
| `node docs/verificar-reg004-cla008-2026-10-19.cjs residuales` | **3 casos, cero residuales R1a/R1b, exit 0.** [Evidencia](reg004-cla008-residuales-2026-10-19.json), [log](reg004-cla008-residuales-2026-10-19.log). |
| `node docs/verificar-reg004-cla008-2026-10-19.cjs cierres` | **4 casos: dos controles y dos reproducciones R1c, cero pérdidas, exit 0.** [Evidencia](reg004-cla008-cierres-2026-10-19.json), [log](reg004-cla008-cierres-2026-10-19.log). |
| `node docs/verificar-reg004-cla008-2026-10-19.cjs ampliacion` | **4 casos adicionales aprobados, exit 0.** [Evidencia](reg004-cla008-ampliacion-2026-10-19.json), [log](reg004-cla008-ampliacion-2026-10-19.log). |
| `npm.cmd run test:registro-app` en TecnoBloques | **86/86, exit 0, sin errores de consola.** Construcción con simulador local; el lector reconstruye 11 sesiones sintéticas generadas por Electron sin avisos y conserva las fallas de I6, J7 y L9. [Log](reg004-cla008-registro-app-2026-10-19.log). |

La ampliación verifica: dos cierres con fallas diferentes conservan ambas e impiden comparar la siguiente corrida con la contradictoria; invertir el orden vacío/con falla no pierde el hecho; tres cierres sin inicio conservan las dos fallas sin atribuir; un cierre idéntico repetido conserva coherencia y permite que la siguiente corrida indique la corrección válida, con aviso de repetición. Todos los 16 casos independientes tienen líneas aceptadas por el revisor del esquema. Las secuencias contradictorias son deliberadas: no se atribuyen al emisor actual.

[Instrumento de esta revisión](verificar-reg004-cla008-2026-10-19.cjs). Reutiliza los casos anteriores en memoria cambiando el destino de evidencia; los cuatro casos adicionales contienen aserciones de hechos, incertidumbre y controles válidos. Instrumento e informe propios revisados por su autor, sin segunda revisión independiente.

## Identidad, límites y siguiente paso

TC `main` `f8f062e`, TB `main` `deaf16c`, TS `main` `9ab3c86`; cambios sin commit identificados en el [manifiesto](reg004-cla008-version-2026-10-19.json).

- Lector SHA256: `4ca98bf98587c1f7234af278c4217d2c13c9d6ecf1e2aeecd076f2df19dfaf64`.
- Prueba SHA256: `1b3f8fb5ea5605c16ffa8afdc4e2c70a5069c31d15c2504f5ab53932b6ffae0d`.
- Contrato, emisor del registro, prueba Electron, código de AUD-06 y package.json conservan sus hashes anteriores; COMO-FUNCIONA refleja los cierres acumulados. No se modificó producto ni memoria de Claude por Codex.

**Pendiente externo:** Efraín trabaja unos 10 minutos en la app y contrasta lo que hizo con la historia del lector. El informe público recogerá solo resultados técnicos de esa aceptación, sin datos de aprendices ni registros reales. Esta auditoría no acredita utilidad humana, hardware, aula, instalador ni publicación.

No se ejecutaron suite general TB, suite completa TC/KiCad ni benchmark; se probaron lector y dependencia integrada afectada. AUD-01–06 conservan sus cierres en su alcance. Sin nueva devolución ni reapertura funcional; se mantienen doce devoluciones acumuladas, once funcionales. Misma sesión, 12 minutos de coordinación declarados hasta esta revisión, incremento pendiente. No se cambió PROCESO v3, ni se hizo commit, push, etiqueta o publicación.
