# REG-004 · verificación de CLA-20261020-003

Codex (Sol), 20 de octubre de 2026, America/Bogota. **R3 y los casos originales de R4 verificados; entrega devuelta por R4a, residual de gravedad media.** La aceptación humana de Efraín permanece documentada para los recorridos realizados.

## R4a · se ignoran datos dentro de una cadena continuada con CRLF

**Archivo:** `TecnoBloques/herramientas/historia-registro.js:145`, dentro de `lineasDe()`.

**Condición:** dos compilaciones contienen una cadena común de C++ continuada con barra inversa seguida de un salto de línea Windows (CRLF). Al cambiar el espacio o tabulador al inicio de la siguiente línea, el contenido de la cadena cambia. El lector afirma **«Compiló: bien, 100 bytes (el mismo programa).»** en ambos casos.

Reproducción mínima: usar este programa con **CRLF después de la barra inversa**, y eliminar en la segunda compilación el espacio anterior a `B`:

```cpp
const char *texto = "A\
 B";
void setup() {}
void loop() {}
```

El resultado del primer programa es el texto `A B`; el segundo, `AB`. En la variante con tabulador, `A<TAB>B` cambia a `AB`. Las entradas exactas, con CR y LF preservados, están en [el diagnóstico](reg004-cla003-adicionales-2026-10-20.json), casos `cadena-continua-CRLF-espacio` y `cadena-continua-CRLF-tab`.

**Causa:** `j += 2` salta la barra inversa y el CR. El bucle se detiene en el LF siguiente y da por terminado el literal. El contenido de la continuación pasa por la normalización de espacios externos. El control equivalente con barra inversa y LF sí conserva el espacio: no es una limitación declarada de cambios de formato fuera de literales, sino pérdida de datos dentro de uno.

**Contraste ejecutado:** los cuatro programas, después de pasar por `quitarComentarios`, se enviaron como bytes a avr-g++ 7.3.0 con `-c -x c++ -std=gnu++11 -mmcu=atmega328p`; todos compilan. Se extrajo `.rodata` mediante avr-objcopy:

| Par | Antes | Después |
|---|---|---|
| Espacio en continuación CRLF | `41204200` (`A B`) | `414200` (`AB`) |
| Tabulador en continuación CRLF | `41094200` (`A<TAB>B`) | `414200` (`AB`) |

Todos los eventos cumplen el esquema. El lector narra igualdad a pesar de las diferencias binarias. [Compilaciones y bytes](reg004-cla003-compilador-2026-10-20.json), [log del diagnóstico](reg004-cla003-adicionales-2026-10-20.log).

**Impacto:** una modificación del programa desaparece de la historia que debe explicar los cambios entre compilaciones. El alcance demostrado es el consumidor de registros válidos y el compilador. No se atribuye esta entrada a la prueba humana ni se afirma haber demostrado que el editor DOM de la app preserve CRLF al pegar código.

**Cierre requerido:** conservar los datos dentro de cadenas continuadas tanto con LF como con CRLF; añadir las dos variantes y sus controles a la regresión. Debe desaparecer la falsa afirmación de igualdad, sin perder los controles de literal raw, escapes, programa idéntico ni normalización fuera de literales. La corrección funcional corresponde a Claude.

## Qué queda verificado

- **R3:** los dos recorridos originales se repitieron en Chromium con controles reales del lienzo; el lector ahora conserva la baja y no hereda el valor de la resistencia borrada. Dos secuencias reales, estados finales y narraciones comprobados, sin errores JS/esquema. También pasan varias recreaciones consecutivas sin herencia de propiedades, giro, enchufes ni movimiento.
- **R4 original:** ambos cambios de literales raw, espacios y línea vacía, ya producen diferencias de programa. Pasan controles de prefijos `u8/u/U/L`, delimitador de 16 caracteres y vacío, raw con CRLF, salto real frente al texto `\\n`, escapes de comillas y literal idéntico.
- **Línea larga:** el caso independiente con una diferencia después de 80 caracteres ya se reconoce; la prueba de Claude comprueba además el texto esperado alrededor del cambio.
- La frase desactualizada de COMO-FUNCIONA 68 sobre repetir la aceptación humana fue corregida por Claude.
- Los 16 casos históricos independientes siguen aprobados: R1/R1a/R1b/R1c/R2 conservan su verificación; AUD-01–06 mantienen sus cierres.

## Versión y preservación

TC `main` `56baf57`, TB `main` `86433d1`, TS `main` `5665e60`; entrega sin commit. [Manifiesto inicial](reg004-cla003-version-inicio-2026-10-20.json), [tras pruebas](reg004-cla003-version-pruebas-2026-10-20.json). HEAD completos, trabajo previo, hashes y artefactos están en los manifiestos.

- Lector: SHA256 `6bbec190f9cb4847fa70f13cfef33253c7cdd68a69bf006cd3f272412c3b2e78`.
- Prueba de historia: `bcefd9243a0659001948599c40889bf46a89e3ec7b1293a8e908a92308a12655`.
- La app, su prueba Electron, contrato, esquema, prueba de contrato e informe de aceptación conservan los hashes de CLA-002. El paquete TC local conserva SHA256 `c9dfb1f5065823a65719d37181e56278f2bc9eb76af79742e800811f5aaa747f`.

Se revisó el diff del lector y sus pruebas, los cambios documentales de la entrega y las referencias afectadas. Se conservaron fuentes, memorias de Claude y evidencias anteriores. Los instrumentos históricos se reutilizaron en memoria con nombres nuevos para sus salidas; los resultados fallidos del ciclo anterior no se sobrescribieron.

## Ejecuciones de esta verificación

| Comando | Resultado |
|---|---|
| `npm.cmd --prefix ../TecnoBloques run test:historia` | Aprobado: 50 OK. [Log](reg004-cla003-historia-2026-10-20.log). |
| `node docs/verificar-reg004-cla003-2026-10-20.cjs originales` | Aprobado: 10 casos originales de CLA-002, cero fallos/esquema. [Resultados](reg004-cla003-adversos-2026-10-20.json). |
| El mismo instrumento: `original`, `residuales`, `cierres`, `ampliacion` | Aprobados los 16 casos históricos (5+3+4+4), cero residuales/esquema. Cuatro JSON y logs nuevos bajo `reg004-cla003-…-2026-10-20`. |
| `python -I docs/auditar-reg004-cla003-2026-10-20.py contrastar lienzo`, seguido de `node docs/verificar-reg004-cla003-2026-10-20.cjs lienzo` | Aprobados los dos recorridos originales y sus historias. [Estados reales](reg004-cla003-lienzo-2026-10-20.json), [historias](reg004-cla003-lienzo-historia-2026-10-20.json). |
| `node docs/verificar-reg004-cla003-2026-10-20.cjs` | **Fallido, exit 1:** 17 casos adicionales, 15 aprobados y dos variantes de R4a fallidas; cero errores de esquema. Es diagnóstico, no regresión aprobada. |
| `python -I docs/auditar-reg004-cla003-2026-10-20.py contrastar compilador` | Aprobado el contraste: cuatro compilaciones y dos pares de datos distintos. El contraste confirma el defecto del lector. |
| `npm.cmd --prefix ../TecnoBloques run test:registro` | Aprobado: 142 OK. [Log](reg004-cla003-registro-2026-10-20.log). |
| `npm.cmd --prefix ../TecnoBloques run test:registro-app` | Aprobado: 87 OK, sin errores de consola y 11 sesiones sintéticas generadas por Electron sin avisos. [Log](reg004-cla003-registro-app-2026-10-20.log). |

No se repitieron la suite global, contrato, simulador completo ni KiCad: el cambio desde CLA-002 se limita al lector, su prueba y documentación. La evidencia de contrato 179 y simulador 53 del ciclo anterior conserva su alcance y sus hashes pertinentes; no se cuenta como una ejecución nueva. Sin benchmark, instalador, hardware ni prueba humana nueva. La integración Electron de registro sí se ejecuta con el lector modificado. Los resultados se revisan con sus logs, no solo por exit code.

Observación documental menor: `git diff --check` detecta espacios finales en `prototipo/COMO-FUNCIONA.md:1906`, añadidos en el diagrama de Claude; no se corrigieron en el rol de revisor. Claude debe limpiar esa línea al entregar R4a.

## Siguiente paso

REG-004 vuelve a `pendiente`, cierre `null` y reservas del revisor liberadas. Claude toma/reserva R4a, reproduce los dos casos y entrega corrección con regresiones; Codex verifica. La aceptación humana documentada del 20 oct permanece en su alcance; falta el cierre técnico total. REG-005 no se inicia. Sin código de producto, memorias ajenas, commit, push, etiquetas o publicación por Codex. Informe e instrumentos propios revisados por su autor, sin segunda revisión independiente.
