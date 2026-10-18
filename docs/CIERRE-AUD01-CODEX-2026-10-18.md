# Verificación de la segunda entrega de AUD-01 · Codex · 18 oct 2026

## Alcance e identificación

Revisión de CLA-20261018-006 y de las correcciones V1, V2 y V3 devueltas en [el informe anterior](VERIFICACION-AUD01-CODEX-2026-10-18.md). Se conserva aquel informe y su evidencia, sin reescribir la devolución.

TecnoBloques sigue en `main`, HEAD `8897b850c07856194b75a937ca855f1d31115d44`; las modificaciones de producto no tienen commit. Fuentes probadas:

| Archivo | SHA256 |
|---|---|
| `src/registro.js` | `bff77d8ab7307dd498c74b726153a1f42e4c2b476b419c27f74366a698b8f4d7` |
| `test/registro.js` | `0b364b0013671e326f62ff9ac810f78a20f72447b57433a49a6c2634fe489850` |
| `test/registro-preprocesador.js` | `b85b0036d8719c7f5ca908adebe21cbbc9b665341e0a796753fce2ddf7a18d36` |
| `package.json` | `2fcdabf96ed4cf16ed00a7b995cd30225bc56211747230970d14a1c23e47216f` |

TC: `main`, `3efbd2bd8fb6d431998b7e1372a5822f3eac7f58`; TS: `main`, `c220eef4193b5b512ad23839fb7c3d3c2d7eabe4`. Se respetaron los documentos, diagnósticos y cambios previos sin commit, incluida RUTA-001 ajena a esta revisión. Codex solo escribe evidencia, registros y fichas; no modifica fuentes, pruebas ni memorias de Claude.

Condiciones: Windows/PowerShell, avr-g++ 7.3.0 del paquete local, GNU C++11, `-mmcu=atmega328p` al comprobar sintaxis. Alimentación `Online` observada. El build Electron usa la copia local de TecnoCircuito; no acredita la dependencia distribuida ni el instalador.

## Resultado de los casos devueltos

| Hallazgo | Comprobación independiente | Resultado |
|---|---|---|
| V1, comentario privado conservado | Reejecución del diagnóstico anterior de Codex: siete originales, 40 variantes y función real `registrarCompilacion`. La suite nueva añade 80 variantes LF/CRLF. | Comentario eliminado en 40/40 variantes del diagnóstico; el consumidor emite código limpio. Los siete originales conservan su corrección. |
| V2, macro/include alterados | Sintaxis real del original y del limpio de `#define VALOR` con comentario multilínea y `#include <avr//io.h>`. | Ambos limpios compilan; el número de líneas se conserva. Las nuevas continuaciones evitan cortar la macro y el header queda íntegro. |
| V3, el oráculo no detectaba V1 | El juez nuevo se ejecutó en memoria con las **tres salidas defectuosas realmente capturadas** de `792cb03e…`, sin reconstruir aquella implementación ni cambiar los tests. Después se repitió con el limpiador actual y con textos legítimos dentro de macros. | Rechaza 3/3 salidas defectuosas: comentario retenido y dos cambios del programa. Con el limpiador actual devuelve cero fallos y conserva los textos legítimos. |

La corrección del número usa el carácter lógico anterior; el seguimiento de directivas conserva los saltos de sus comentarios mediante empalmes y distingue nombres de header. El juez añade `-dD -undef`, `-CC`, cabeceras sintéticas vacías para el contraste y compilación con cabeceras reales para siete programas válidos. Se revisó el diff y su relación con el consumidor; no basta la declaración del implementador.

El campo `oraculo.pasoIndebidamente` del diagnóstico anterior sigue llamándose así: con el limpiador ya corregido, cero fallos es lo correcto. **Ese booleano no sirve para verificar V3 en esta versión.** La comprobación pertinente es el rechazo de las tres salidas defectuosas capturadas, que se registra por separado.

Evidencia: [salida de los casos originales y V1/V2](aud01-segunda-evidencia-2026-10-18.json), [comprobador adicional de V3 y fronteras](verificar-segunda-aud01-2026-10-18.cjs), [salida de V3 y fronteras](aud01-segunda-oraculo-2026-10-18.json).

## Fronteras y excepción expresa

Se añadieron ocho comprobaciones independientes con compilación antes/después y aserciones directas sobre el texto: comentarios de una línea y multilínea en `#if`, comentarios en `#if 0`, textos ordinarios y crudos legítimos dentro de bloques inactivos, una cadena sin cerrar en un bloque inactivo, condicionales anidados y el separador vacío de la decisión de Efraín. Ocho de ocho pasan; se preservan las líneas. El caso con cadena sin cerrar compila con el mismo aviso antes y después.

Esto comprueba casos concretos que el `-E` final omite; no convierte ese oráculo en una prueba completa de todas las ramas condicionales. Los textos legítimos se conservan incluso en un bloque inactivo, conforme a la decisión de registrar los literales.

**Excepción ya decidida por Efraín, registrada a las 12:50 por Claude:** para impedir que una barra suelta se vuelva un empalme, se admite un separador `/**/` vacío. No contiene texto del comentario original. Se verificó su programa válido antes y después. No se exige quitarlo para cerrar, ni se pide otra autorización para esa excepción. Su documentación integrada corresponde al trabajo existente REG-005, junto con la actualización de la sección 6.1 del contrato; no se cambia el contrato por cuenta de Codex.

La normalización de espacios y del separador vacío dentro del oráculo limita lo que este demuestra por sí solo. Las aserciones de texto exacto de `test:registro` y los casos independientes cubren el comportamiento comprobado; no se declaran pruebas universales de todos los literales.

## Ejecuciones propias

| Comando o comprobación | Resultado |
|---|---|
| `npm.cmd run test:registro` | Aprobado: 89 OK; incluye el texto exacto y los casos corregidos. |
| `$env:SEMILLA='2026101802'; $env:CASOS='2000'; npm.cmd run test:registro-preprocesador` | Aprobado, exit 0: 65 casos individuales, un grupo de 80 variantes (66 comprobaciones fijas), siete programas válidos y 2000 aleatorios sin fallas ni excepciones. Parte aleatoria: 330,8 s de calendario, no esfuerzo activo. |
| `node docs/verificar-aud01-2026-10-18.cjs` | Aprobado, exit 0: siete originales, cero variantes con comentario de 40, consumidor limpio y dos programas de V2 que compilan. |
| `node docs/verificar-segunda-aud01-2026-10-18.cjs` | Aprobado, exit 0: controles negativos de V3 rechazados, controles actuales aceptados y ocho fronteras comprobadas. |
| `npm.cmd run test:registro-app` | Primera corrida: exit 1 por una falla de cierre de herramientas; consumidor del registro y consola correctos. Repetición íntegra sin otra suite: exit 0, 36 OK, sin errores de consola, mismas aserciones y tiempos. |

En la primera corrida Electron hubo **una falla**: «y si se abren por otro camino, se cierran solas» (herramientas de desarrollo sin PIN). El resto del recorrido, incluida la compilación, el evento sin comentarios, las siete líneas de contrato y la consola sin errores, pasó. Se ejecutaba a la vez el contraste AVR; ello es una condición observada, **no prueba de la causa**. Se conservan este fallo y el resultado de la repetición íntegra, sin relajar tiempos ni aserciones. `escritorio/main.js` y esta prueba de cierre de herramientas no forman parte del diff de AUD-01.

La primera corrida tuvo alimentación `Online`; antes de la repetición se observó `Offline`. La repetición comprueba funcionalidad del consumidor y de la interfaz, no rendimiento ni velocidad del simulador. No se presenta el fallo inicial como corregido por código ni se atribuye una causa demostrada; no se reprodujo al repetir sin otra suite activa.

## Cierre y límites

**AUD-01 verificada en esta versión; V1, V2 y V3 cerrados.** Se acredita el caso original, los casos devueltos, las regresiones, controles negativos del juez y el consumidor afectado. No se encontraron nuevos bloqueantes en este alcance. La ficha de TecnoSuite enlaza esta evidencia y los hashes; el cierre documental no cambia las fuentes de Claude.

La evidencia es de software e integración local. No se ejecutan instalador, hardware, aula ni suites de motor/KiCad, porque este cambio es del limpiador y sus pruebas; el recorrido específico del consumidor es el pertinente. Los resultados anteriores de Claude no se convierten en ejecuciones de Codex.

AUD-02/03/04/05 conservan sus tareas; una prueba normal del registro no verifica sus defectos. Se mantiene el siguiente balance acordado para tres cierres funcionales de AUD-01, AUD-02 y AUD-04. Sin commit, push, etiquetas ni publicación por esta revisión.
