# AUD-06 · cierre funcional de CLA-20261019-004

19 oct 2026 · Codex (Sol). **Verificada en el alcance funcional de cierre de herramientas sin PIN y apertura autorizada después del PIN.** Implementación de Claude. No acredita que sea imposible abrirlas momentáneamente, ni un límite universal de latencia, ni el instalador.

## Cambio revisado y caso original

`TecnoBloques/escritorio/main.js:48–57` conserva el cierre por `devtools-opened` y añade un vigía de 50 ms mientras no haya autorización. El vigía comprueba el estado de las herramientas y las cierra sin esperar aquel aviso. Se cancela al autorizar al instructor o al destruir/cerrar la ventana; la comprobación usa el objeto de esa ventana. No cambia la validación del PIN ni el trabajo del equipo.

El defecto original ya había sido observado por Codex en las revisiones del 18 oct: herramientas abiertas por otra vía seguían abiertas al comprobar a los 800 ms, con aprobaciones intermitentes posteriores. La ficha conserva esas observaciones; no se transforman en cierres por una repetición aprobada. Claude aporta además 4/50 sobre el `main.js` anterior y sondas de los avisos de Electron. **Codex no repitió ahora esa medición anterior ni las nueve corridas comunicadas por Claude.** Se revisó el diff sobre TB `deaf16c` y se repitió el mismo recorrido funcional sobre el arreglo identificado.

## Comprobaciones nuevas de Codex

Dos recorridos predefinidos de `node test/herramientas-app.js 50`, secuenciales, con el HTML local ya construido; después se añadió uno al confirmar Efraín que había conectado el cargador. No se aumentó el plazo de **800 ms** ni se repitió hasta obtener una aprobación: el tercero responde a un cambio de condición.

| Recorrido | Aperturas sin PIN que siguen abiertas a los 800 ms | Modos |
|---|---:|---|
| 1 | **0/50** | Por defecto, detach, undocked, right, bottom: 0/10 cada uno |
| 2 | **0/50** | Los mismos cinco modos: 0/10 cada uno |
| 3, con cargador | **0/50** | Los mismos cinco modos: 0/10 cada uno |

Los tres verifican también que **F12 sin PIN no abre**, que **F12 después del PIN abre y permanece abierto**, y que la apertura por otra vía con PIN permanece abierta. Sin errores de página, exit 0. [Log 1](aud06-herramientas-1-2026-10-19.log), [log 2](aud06-herramientas-2-2026-10-19.log), [log con cargador](aud06-herramientas-cargador-2026-10-19.log).

`npm.cmd run test:registro-app` con copia local: **86/86, exit 0**, sin errores de consola. Comprueba el consumidor con PIN, cambios de equipo, escritura/recuperación del registro, simulaciones, cierres y el lector de las sesiones sintéticas. [Log integrado](aud06-reg004-registro-app-2026-10-19.log). La aprobación de esas 86 comprobaciones no aprueba los casos adversos del lector REG-004, que se devuelven por separado.

**Condiciones:** Windows/Electron de desarrollo, `TB_HERRAMIENTAS=instructor`, perfiles temporales y PIN/equipos sintéticos. Primeros dos recorridos en batería: `BatteryStatus=1`, 92 % en la consulta inicial y 89 % al empezar el recorrido repetido. Efraín confirmó después que conectó el cargador; antes del tercero Windows indicó `BatteryStatus=2`, 90 %. En esa condición, el muestreo de aperturas visibles registró 20–65 ms en 24 aperturas captadas; las otras no aportan duración visible medible por esa técnica. Se acredita la conducta a los 800 ms y se informa la observación con cargador, **sin convertirla en máximo universal de ~70 ms ni en comparación controlada de rendimiento antes/después**. No se mide el primer píxel visible. No hubo otras suites compitiendo durante los tres recorridos.

## Identidad, límites y entrega

TB `main` **deaf16c**, TC `main` **f8f062e**, TS `main` **9ab3c86**, con trabajo sin commit de Claude registrado y preservado. [Manifiesto compartido](aud06-reg004-version-2026-10-19.json), con HEAD completos, ramas, estado previo y SHA256 antes/después.

- `escritorio/main.js`: `8125d6e8bc779e4a5065e653e285c94534bc80c3b29b2af3f264adeb248f6118`.
- `test/herramientas-app.js`: `20f9dfa804e6ebfe210ce52388d6706ae3b695884dc66218cc32c5e02a8147fc`.
- `package.json` final, compartido con REG-004: `41339280da6ad9e837943b794b6c1fe508175b2e4e803351bd9a8fc0dcea8dab`. El cambio de hash frente a CLA-004 está identificado en CLA-005 y solo añade los comandos del lector.

Software probado e integrado: sí, alcance anterior. **No ejecutado:** instalador/app empaquetada, aula, comparación controlada de rendimiento anterior/actual, suite general TB, suite completa TC o KiCad. No cambian motor/contrato/redes. Se mantiene el límite de apertura momentánea: el arreglo cierra las herramientas, no desactiva la capacidad de abrirlas. Ciento cincuenta aperturas aprobadas no demuestran ausencia universal de intermitencia; la combinación de cambio causal revisado, controles negativos/positivos y recorridos repetidos acredita esta verificación funcional.

Ficha verificada y reservas del revisor liberadas al entregar. Siguiente: Claude actualiza su memoria; Efraín decide el siguiente trabajo y cualquier entrega/publicación. REG-004 se resuelve en su informe propio. Informe de Codex revisado por su autor, sin segunda revisión independiente acreditada. Sin implementación de producto, edición de CLAUDE.md, commit, push, etiqueta ni publicación por Codex.
