# REG-004 · verificación de CLA-20261020-004

Codex (Sol), 20 de octubre de 2026, America/Bogota. **R4a verificado en los casos originales; entrega devuelta por R4b, residual de gravedad media.** R3, R4 original y las regresiones históricas conservan su verificación.

## R4b · el límite de 100 caracteres vuelve a ocultar cambios de datos

**Archivo:** `TecnoBloques/herramientas/historia-registro.js:149`, `s.slice(j, j + 100)` al reconocer un empalme dentro de una cadena.

**Condición:** una cadena C++ continúa en la siguiente línea con barra inversa, espacios intermedios y LF o CRLF, extensión admitida por el avr-g++ usado por la app. Si barra, espacios y salto no caben en los 100 caracteres examinados, el lector deja de reconocer el empalme. Vuelve a tratar el contenido de la continuación como texto externo al literal y puede borrar sus espacios significativos al comparar.

**Reproducción mínima:** dos compilaciones del mismo programa. En la primera, la cadena se forma con `A`, barra inversa, **98 espacios**, CRLF, un espacio y `B`, y la comilla de cierre. En la segunda se elimina únicamente el espacio anterior a `B`. El compilador guarda `A B` y `AB`, respectivamente; el lector afirma **«Compiló: bien, 100 bytes (el mismo programa).»**.

La secuencia exacta se genera con `node docs/verificar-reg004-cla004-2026-10-20.cjs bordes`. Las cadenas completas y los eventos válidos están en [la evidencia](reg004-cla004-bordes-2026-10-20.json). No hay límite contractual de 100 caracteres para esta entrada.

| Terminación y espacios entre barra/salto | Resultado del lector |
|---|---|
| LF, 0 o 98 espacios | Detecta correctamente el cambio |
| LF, **99 espacios** | Afirma «el mismo programa» |
| CRLF, 0 o 97 espacios | Detecta correctamente el cambio |
| CRLF, **98 o 120 espacios** | Afirma «el mismo programa» |
| CRLF, **98 tabuladores** | Afirma «el mismo programa» |

**Contraste:** se compilaron los ocho pares (16 programas) con avr-g++ 7.3.0, `-c -x c++ -std=gnu++11 -mmcu=atmega328p`, enviando los bytes exactos del código registrado. Todos compilan; el compilador avisa «backslash and newline separated by space» cuando corresponde. En los ocho pares, avr-objcopy extrae `.rodata` **`41204200` frente a `414200`** (`A B` frente a `AB`). Los cuatro controles y cuatro fallos del lector difieren por la frontera de lectura, no por validez del C++. [Compilaciones, avisos y bytes](reg004-cla004-compilador-bordes-2026-10-20.json).

**Impacto y alcance:** el lector vuelve a ocultar una modificación del programa y atribuye igualdad injustificada. Es una condición específica, reproducida con datos sintéticos válidos y contrastada con el compilador; no se afirma frecuencia natural ni que el editor DOM conserve esa entrada al pegar. La prueba humana de Efraín no contiene este caso. R4a en sus dos reproducciones anteriores sí pasa ahora.

**Cierre requerido:** el límite de exploración no debe producir una falsa afirmación de igualdad. Añadir controles a ambos lados de la frontera (LF 98/99 y CRLF 97/98), un empalme más largo y tabuladores. Conservar los controles de LF/CRLF cortos, cadenas idénticas, barra escapada y literales raw. Si el lector no puede analizar una entrada, no debe afirmar que el programa es el mismo. Claude implementa la corrección; Codex no modificó producto.

## Versión y preservación

TC `main` `56baf57`, TB `main` `86433d1`, TS `main` `5665e60`, entrega sin commit. [Manifiesto inicial](reg004-cla004-version-inicio-2026-10-20.json), [tras pruebas](reg004-cla004-version-pruebas-2026-10-20.json); contienen HEAD completos, trabajo previo y hashes.

- Lector SHA256: `e65f5ef2471ef6424c679373d4dfebaa7f1af097e41c6ac92a9b1ff3193a8733`.
- Prueba de historia: `215d4f2b8696b491062375824aa3f6b18eaef15647aa3cac62e85e3d3557b699`.
- App, prueba Electron, contrato, esquema, prueba de contrato y aceptación humana conservan los hashes de la entrega anterior. El paquete TC local sigue en SHA256 `c9dfb1f5065823a65719d37181e56278f2bc9eb76af79742e800811f5aaa747f`.

Se revisaron el cambio de `lineasDe`, las seis regresiones nuevas, COMO-FUNCIONA 68, bitácoras y memorias pertinentes. Se identificó el límite de exploración que no aparecía entre los límites anunciados en CLA-004. El espacio final del diagrama quedó corregido por Claude: `git diff --check` pasa en los tres repositorios. Fuentes, memorias de Claude y evidencias previas conservadas; los instrumentos anteriores se ejecutaron en memoria con salidas de esta revisión.

## Pruebas de esta entrega

| Comando | Resultado |
|---|---|
| `npm.cmd --prefix ../TecnoBloques run test:historia` | Aprobado: 56 OK. [Log](reg004-cla004-historia-2026-10-20.log). |
| `node docs/verificar-reg004-cla004-2026-10-20.cjs` | Aprobado: 17/17 casos de CLA-003; incluye los dos R4a antes fallidos. [Resultados](reg004-cla004-adicionales-2026-10-20.json). |
| El mismo instrumento: `originales` | Aprobado: 10/10 casos de CLA-002. [Resultados](reg004-cla004-adversos-2026-10-20.json). |
| El mismo instrumento: `original`, `residuales`, `cierres`, `ampliacion` | Aprobados los 16 casos históricos (5+3+4+4), cero residuales y cero errores de esquema. Cuatro JSON y logs nuevos bajo `reg004-cla004-…-2026-10-20`. |
| `python -I docs/auditar-reg004-cla004-2026-10-20.py contrastar lienzo`, seguido de `node docs/verificar-reg004-cla004-2026-10-20.cjs lienzo` | Aprobados los dos recorridos de R3 en Chromium y sus historias; sin errores JS/esquema. [Estados](reg004-cla004-lienzo-2026-10-20.json), [historias](reg004-cla004-lienzo-historia-2026-10-20.json). |
| `node docs/verificar-reg004-cla004-2026-10-20.cjs bordes` | **Fallido, exit 1:** ocho casos, cuatro controles aprobados y cuatro falsos «el mismo programa». Cero errores de esquema. Diagnóstico, no regresión aprobada. [Log](reg004-cla004-bordes-2026-10-20.log). |
| `python -I docs/auditar-reg004-cla004-2026-10-20.py compilador-bordes` | Aprobado el contraste de ocho pares; confirma los cuatro fallos del lector. [Log](reg004-cla004-compilador-bordes-2026-10-20.log). |
| `npm.cmd --prefix ../TecnoBloques run test:registro` | Aprobado: 142 OK. [Log](reg004-cla004-registro-2026-10-20.log). |
| `npm.cmd --prefix ../TecnoBloques run test:registro-app` | Aprobado: 87 OK, consola sin errores y 11 sesiones sintéticas sin avisos. [Log de Electron](reg004-cla004-registro-app-2026-10-20.log). |

Sin suite global, nueva ejecución de contrato/simulador completo/KiCad, benchmark, instalador, hardware ni aceptación humana nueva. El impacto desde CLA-003 está en el lector y sus pruebas/documentación; no se convierten los 179 de contrato y 53 de simulador del ciclo anterior en pruebas nuevas. Los logs se inspeccionan además de los códigos de salida.

## Estado y siguiente responsable

REG-004 vuelve a `pendiente`, cierre `null` y reservas del revisor liberadas. Claude debe tomar y reservar R4b, reproducir las fronteras y entregar corrección con regresiones; Codex verifica después. La aceptación humana documentada del 20 oct permanece en su alcance; falta cierre técnico total. REG-005 no se inicia. R1/R1a/R1b/R1c/R2/R3/R4 original y R4a conservan verificación en los casos ejecutados; AUD-01–06 siguen cerrados en su alcance anterior.

Sin código de producto, memorias ajenas, commit, push, etiquetas o publicación por Codex. Informe e instrumentos propios revisados por su autor, sin segunda revisión independiente.
