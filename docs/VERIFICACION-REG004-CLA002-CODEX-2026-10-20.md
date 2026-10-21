# REG-004 · auditoría de CLA-20261020-002

Codex (Sol), 20 de octubre de 2026, America/Bogota. **Entrega devuelta por R3 y R4, gravedad media.** La aceptación humana de Efraín se conserva como evidencia de los recorridos documentados; no cierra los defectos adicionales del lector.

## R3 · el resumen mezcla piezas distintas que reutilizan el mismo identificador

**Archivo:** `TecnoBloques/herramientas/historia-registro.js`, líneas 64–84, especialmente la reutilización de `pieza(d.id)` al agregar (67) y el descarte `p.agregada && p.quitada` (84).

**Condición y reproducción:** antes del tramo existe `r1`. El lienzo asigna el primer identificador libre (`prototipo/src/lienzo.js:1051`), por lo que borrar y agregar una resistencia reutiliza `r1`.

1. Borrar `r1`, agregar otra resistencia y borrarla, sin un evento ajeno al circuito entre las acciones. Los eventos reales son `componente_quitado → componente_agregado → componente_quitado`, todos con `r1`. Al final no hay resistencia. El lector afirma **«Circuito: hizo cambios y los deshizo.»**, aunque desapareció la pieza que existía antes del tramo.
2. Cambiar la resistencia existente a 1000 Ω, borrarla y agregar otra. El lienzo crea la nueva con **220 Ω** (`prototipo/src/catalogo.js:98`). El lector afirma **«Circuito: agregó r1 (resistencia); cambió r1: ohmios 1000.»**: conserva propiedades de la pieza destruida y las atribuye a la nueva.

**Observado y comprobado:** ambos recorridos ejecutados en Chromium contra el paquete local recién construido, con controles reales del lienzo; secuencias y estados finales guardados. Los mismos eventos, completados con un sobre sintético válido, producen las dos narraciones falsas. Cero errores JS y de esquema. No es solo una secuencia hipotética admitida por el esquema.

**Impacto:** el resumen puede ocultar que una pieza fue eliminada o informar un valor eléctrico que la pieza final no tiene. Invalida la reconstrucción de cambios entre corridas, objetivo de REG-004.

**Comprobación que debe añadirse:** regresiones de ambos recorridos y controles de pieza nueva agregada/quitada, baja de pieza existente y varios cambios de valor de una misma pieza. El resumen debe distinguir el estado anterior, cada recreación y el estado final; ninguna recreación debe heredar propiedades, giro, enchufes o movimiento de una instancia borrada. Cuando el registro no permite acreditar el valor final, no debe inventarlo.

Evidencia: [secuencias y estados del lienzo](reg004-cla002-lienzo-2026-10-20.json), [historias resultantes](reg004-cla002-lienzo-historia-2026-10-20.json), [diagnóstico independiente](reg004-cla002-adversos-2026-10-20.json).

## R4 · «el mismo programa» oculta cambios dentro de literales C++ multilínea

**Archivo:** `TecnoBloques/herramientas/historia-registro.js:106`, usado en 115 y 282.

**Condición:** dos compilaciones seguidas contienen un literal raw de C++ con cambios en los espacios de sus líneas o en sus líneas vacías. `lineasDe()` aplica `trim()` y elimina todas las líneas vacías, también dentro de las cadenas.

Reproducción mínima del contenido del programa:

```cpp
const char *texto = R"marca(
 A 
)marca";
void setup() {}
void loop() {}
```

En la segunda compilación, sustituir la línea ` A ` por `A`. Variante: sustituir `A\n\nB` por `A\nB` dentro del mismo literal. `quitarComentarios` conserva los dos programas y todos los eventos cumplen el esquema. Sin embargo, el lector llama a la segunda compilación **«(el mismo programa)»** en ambos casos.

**Contraste independiente:** los cuatro programas compilan con el avr-g++ 7.3.0 instalado, `-c -x c++ -std=gnu++11 -mmcu=atmega328p`. Se extrajo `.rodata` con avr-objcopy:

| Cambio | Antes | Después |
|---|---|---|
| Espacios dentro de la cadena | `0a2041200a00` | `0a410a00` |
| Línea vacía dentro de la cadena | `0a410a0a420a00` | `0a410a420a00` |

**Impacto:** una modificación de los datos del programa desaparece de la historia, precisamente donde se debe explicar qué cambió entre compilaciones. El modo de edición C++ está admitido por la app (`src/app.js:691`). No se afirma que Efraín usara literales raw en sus pruebas.

**Comprobación que debe añadirse:** ambos cambios de literal deben aparecer como cambios; conservar controles de código idéntico, cambio de `delay(500)` a `delay(200)` y cambios de sangría fuera de literales. No basta aumentar la cantidad de líneas mostradas: el error ocurre antes, al decidir la igualdad.

Evidencia: [programas, narraciones y aserciones](reg004-cla002-adversos-2026-10-20.json), [compilaciones y datos binarios](reg004-cla002-compilador-2026-10-20.json).

## Versión revisada y alcance aprobado

Tres repositorios en `main`, sin commit de la entrega: TC `56baf57e38a16e13c95bcc281d90e1bfc578176c`, TB `86433d1341caa86b6d75dc3ab437aaa2cf8f008c`, TS `5665e60` (HEAD completo en el manifiesto). [Inicio y trabajo existente](reg004-cla002-version-inicio-2026-10-20.json), [versión tras las pruebas y artefactos](reg004-cla002-version-pruebas-2026-10-20.json).

- Lector: SHA256 `2a22d0fefd2f7c5c0ae76e2dece475aee82f41df9083c7ca5980c6d54c48f879`.
- App: `a7eb9567478e6eafac9e253d4ff92ed8f881b788c5217c6e47d95cc64a2134b1`.
- Esquema: `b875cabf2f447ef02f48ddda7d76ea9ef16ccb4865005305624fca685950cd6e`.
- Prueba de historia: `87c44f785cfa604a3a9eb9fa27896095054ccb47ff92563b51f9f0fd9b8730ee`.
- Prueba Electron: `dee9ab8977e2cacdf64e0bb4698a8951444661a0c6f7083bbda210bfccf14ab2`.

Las fuentes, pruebas, contrato y memorias de Claude se conservaron con hashes iguales antes/después. Se revisaron todos los diffs de producto y pruebas de esta entrega, contrato, ambas bitácoras, «Proyecto hermano» de TB y COMO-FUNCIONA 68. El cambio aditivo `placa_cambiada` es coherente entre esos documentos y el esquema. `ponerPlaca` cubre las cuatro asignaciones previas; el recorrido Electron nuevo ejercita selector y ejemplo. No se presenta la lectura de los otros dos caminos como una prueba de subida física o de apertura de proyecto con registro.

Observación documental menor: el último párrafo de COMO-FUNCIONA 68 todavía dice «Falta repetir una prueba corta de Efraín», aunque el informe de aceptación y las entradas posteriores de las bitácoras ya documentan PRUEBA-03. Claude debe actualizar ese cierre al entregar las correcciones; la aceptación humana registrada no se invalida por esa frase desactualizada.

## Comprobaciones ejecutadas

| Comando | Resultado y evidencia |
|---|---|
| `npm.cmd run construir` | Aprobado; paquete local `0.1.0-dev`, Worker embebido; [log](reg004-cla002-build-2026-10-20.log). |
| `npm.cmd --prefix prototipo run probar:contrato` | Aprobado, 179 OK; [log](reg004-cla002-contrato-reintento-2026-10-20.log). Primer intento falló por acceso del sandbox de esbuild, conservado en log separado; reintento fuera del sandbox aprobado. |
| `npm.cmd --prefix ../TecnoBloques run test:historia` | Aprobado, 36 OK; [log](reg004-cla002-historia-2026-10-20.log). |
| `npm.cmd --prefix ../TecnoBloques run test:registro-app` | Aprobado, 87 OK, consola sin errores, 11 sesiones sintéticas generadas por Electron sin avisos; [log](reg004-cla002-registro-app-2026-10-20.log). |
| `npm.cmd --prefix ../TecnoBloques run test:simulador` | Aprobado, 53 OK, sin errores JS; [log](reg004-cla002-simulador-2026-10-20.log). |
| `npm.cmd --prefix ../TecnoBloques run test:registro` | Aprobado, 142 OK; [log](reg004-cla002-registro-2026-10-20.log). |
| `npm.cmd --prefix ../TecnoBloques run test:placas` | Aprobado, `ERRORES JS: []`; [log](reg004-cla002-placas-reintento-2026-10-20.log). Primer intento no pudo iniciar Electron por permisos del sandbox, conservado aparte. No se subió a hardware. |
| `node docs/verificar-reg004-cla002-2026-10-20.cjs original`, `residuales`, `cierres`, `ampliacion` | Aprobados los 16 casos independientes previos: 5 + 3 + 4 + 4; cero residuales y cero errores de esquema. Resultados JSON con esos cuatro nombres bajo `reg004-cla002-…-2026-10-20.json`. Se reutilizaron los instrumentos históricos en memoria, sin sobrescribir sus evidencias. |
| `node docs/verificar-reg004-cla002-2026-10-20.cjs` | **Fallido, exit 1**: 10 casos, 6 controles aprobados y 4 reproducciones de R3/R4 fallidas. Diagnóstico; no es una regresión aprobada. [Log](reg004-cla002-adversos-2026-10-20.log). |
| `python -I docs/contrastar-reg004-cla002-2026-10-20.py lienzo` y `… compilador` | Aprobados los contrastes: dos secuencias reales y cuatro compilaciones con diferencias binarias. Que el contraste apruebe confirma los defectos del lector, no su corrección. |
| `node docs/verificar-reg004-cla002-2026-10-20.cjs lienzo` | **Fallido, exit 1**: las dos narraciones contradicen el estado final del lienzo real. [Log](reg004-cla002-lienzo-historia-2026-10-20.log). |

Los logs se inspeccionaron además de sus códigos de salida. Las suites que comparten artefactos se ejecutaron sin solaparse. No hubo benchmark nuevo ni relajación de umbrales. Sin suite global TC/TB, KiCad nuevo, instalador, hardware ni recorrido nuevo con aprendices: no son necesarios para reproducir estos dos defectos del lector y no se acreditan aquí.

## Estado y siguiente paso

REG-004 vuelve a `pendiente`, cierre `null`, responsable Claude, reservas del revisor liberadas. **R1/R1a/R1b/R1c/R2 conservan su verificación en los casos repetidos; AUD-01–06 mantienen sus cierres.** La prueba humana del 20 oct permanece como evidencia de uso aportada por Efraín; la segunda sesión no probó un cambio de programa, como advierte su informe. REG-005 no se inicia.

Claude debe tomar y reservar las correcciones de R3/R4, reproducir antes de modificar, añadir regresiones y entregar una versión identificable. Codex verificará originales, controles e integración afectada. Codex no modificó código de producto, memorias de Claude ni instrucciones del proceso; no hizo commit, push, etiqueta o publicación. Informe e instrumentos propios revisados por su autor; sin segunda revisión independiente.
