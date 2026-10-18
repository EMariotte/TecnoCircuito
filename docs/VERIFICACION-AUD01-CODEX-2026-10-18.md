# Segunda comprobación de AUD-01 · Codex · 18 oct 2026

## Resultado

**Devuelta a Claude: la exclusión de comentarios todavía falla en C++ válido.** Los siete casos originales comprobados fallan en HEAD y pasan en la corrección. Esto no basta para cerrar el hallazgo alto: una variante de empalme conserva un comentario que también emite el consumidor real de `codigo_compilado`.

Revisión de la implementación de Claude, entrega CLA-20261018-005. Codex no modifica producto ni pruebas de TecnoBloques; los diagnósticos y este informe son trabajo propio de auditoría. Datos exclusivamente sintéticos. Se conserva el informe del 17 oct.

## Versión y condiciones

- TecnoBloques: `main`, HEAD `8897b850c07856194b75a937ca855f1d31115d44`, con cambios sin commit en `src/registro.js`, `test/registro.js`, `package.json`, `CLAUDE.md`, `BITACORA.md` y el nuevo `test/registro-preprocesador.js`.
- TecnoCircuito: `main`, HEAD `3efbd2bd8fb6d431998b7e1372a5822f3eac7f58`, limpio al inicio. TecnoSuite: `main`, HEAD `c220eef4193b5b512ad23839fb7c3d3c2d7eabe4`, con cambios en ficha AUD-01, canal de Claude y tablero.
- SHA256 de las fuentes probadas: `src/registro.js` = `792cb03ecc7fef575d9c0e1a9ed63fa57aed17664dda0d21adda24fcc2356135`; `test/registro.js` = `270b99f5b09ba815e26d00e6ce92922fad832df6c9d358f1c942fc46d9baac48`; `test/registro-preprocesador.js` = `631b3c232d56ea4bd7fb4074ed50cbd39e9bf2450e4c0ccece114591e6339841`; `package.json` = `2fcdabf96ed4cf16ed00a7b995cd30225bc56211747230970d14a1c23e47216f`.
- Windows/PowerShell; avr-g++ 7.3.0 del paquete local de TecnoBloques; `-std=gnu++11`. El diagnóstico usa `-fsyntax-only -mmcu=atmega328p` para comprobar que las entradas son programas válidos y `-E -P -dD` para inspeccionar definiciones de macros. Alimentación `Online` comprobada antes de Electron. No se evalúa velocidad del simulador.

## AUD-01-V1 · alta: un número empalmado oculta un comentario al limpiador

**Archivo:** `TecnoBloques/src/registro.js:68`; consumidor `src/app.js:1558`.

Entrada mínima; la primera línea acaba en una barra inversa real:

```cpp
#define M 1e\
+R"(a " // MARCADOR_PRIVADO_SINTETICO)"
int main(){return 0;}
```

El programa compila sin errores. La macro no se expande y su lista de reemplazo es léxicamente válida. El compilador ve el número de preprocesado `1e+R` y luego el texto ordinario `"(a "`; el resto de la línea es un comentario. Con `-E -P -dD` devuelve esta definición sin el marcador:

```cpp
#define M 1e+R"(a "
```

**Observado:** `quitarComentarios` devuelve la entrada completa, con el marcador privado. Sin el empalme, lo quita correctamente. En el bucle de números, tras saltar el empalme, `c[p - 1]` consulta el carácter físico anterior (el salto) en vez del carácter lógico `e`. El `+` termina erróneamente el número y `R"` abre un supuesto texto crudo que abarca el comentario.

Se contrastaron 40 variantes: `e/E/p/P`, `+/-` y los cinco prefijos crudos; las 40 conservan el marcador que el compilador excluye. Se ejecutó además la función real `registrarCompilacion` extraída de `app.js`, con registro activo y sumidero sintético: emite `codigo_compilado` con el comentario. Esta prueba del consumidor no es un recorrido Electron del caso nuevo.

**Impacto:** persiste la misma clase de exposición potencial de texto de comentarios de AUD-01. No hay evidencia de exposición de datos reales. Debe corregirse antes de considerar fiable el registro.

**Para cerrar:** reproducir el caso contra el compilador, corregir su clasificación léxica y comprobar las variantes, LF/CRLF y el evento emitido; conservar los literales y las regresiones existentes.

## AUD-01-V2 · media: las directivas válidas pierden contenido o significado

**Archivo:** `TecnoBloques/src/registro.js:54` y el reconocimiento de comentarios en `:48`.

Primer caso, no incluido en los límites de la entrega:

```cpp
#define VALOR (1 /* comentario
 */ + 2)
int dato = VALOR;
```

El original compila y se expande a `int dato = (1 + 2);`. El limpio deja un salto que termina la directiva antes de tiempo:

```cpp
#define VALOR (1
 + 2)
int dato = VALOR;
```

El compilador rechaza el limpio con `expected unqualified-id before '+' token`. Conservar el número de saltos físicos no acredita conservar el significado del preprocesado. Este comportamiento también estaba en HEAD; no se atribuye su introducción a Claude.

Segundo caso, ya declarado como límite por Claude, ahora contrastado con un header real del paquete:

```cpp
#include <avr//io.h>
int main(){return 0;}
```

El original compila con `-mmcu=atmega328p`. El limpiador deja `#include <avr` y el compilador lo rechaza. `//` es parte del nombre del header en este contexto. También existía en HEAD. Aunque no expone un comentario, incumple conservar el C++ completo y dificulta reconstruir el programa registrado. C++ escrito a mano forma parte del producto; la prueba no se limita a los includes del generador.

**Para cerrar:** añadir casos de directivas al contraste y conservar su contenido y significado, además de la numeración física que se requiera. La implementación corresponde a Claude; una excepción de alcance, a Efraín.

## AUD-01-V3 · media: el oráculo aprueba el comentario retenido de V1

**Archivo:** `TecnoBloques/test/registro-preprocesador.js:51` y `:86`.

El contraste usa `-E -P` y `-E -P -C`. Esas salidas no muestran la definición de una macro sin usar. Ejecutando **sin modificar** la función `contrastar` de la prueba sobre la entrada de V1 devuelve cero fallos, aunque el marcador siga en el código que se registra. Es un falso negativo reproducido, no una suposición sobre la cobertura.

**Para cerrar:** exigir que el oráculo detecte esta pérdida de privacidad en definiciones de macros, y comprobar un literal legítimo dentro de una macro para no confundirlo con comentario. No basta comparar únicamente la expansión final del programa. Las 40 variantes nuevas tampoco aparecen en el generador aleatorio actual.

Otros límites de la prueba permanecen declarados: normaliza espacios incluso dentro de literales y la excepción global por `stray` puede disculpar diferencias distintas de la barra suelta. No se presentan como defectos de producto nuevos sin una reproducción adicional; no amplían lo que acreditan los resultados aprobados.

## Comprobaciones propias

| Comprobación | Resultado y alcance |
|---|---|
| `npm.cmd run test:registro` | Aprobado: 78 OK; el rendimiento de sus dos entradas grandes se ejecutó sin otra suite activa. |
| `$env:SEMILLA='18102026'; $env:CASOS='5000'; npm.cmd run test:registro-preprocesador` | Aprobado por el script, exit 0: 39 casos fijos, 5000 aleatorios (cuatro diferencias disculpadas por el límite declarado de `stray`) y cuatro comprobaciones de límites. Parte aleatoria: 567,3 s de calendario, no esfuerzo activo medido. V3 demuestra que este aprobado no acredita exclusión de comentarios en definiciones de macros. |
| `npm.cmd run test:registro-app` | Aprobado: 36 comprobaciones, `TODO BIEN`, sin errores de consola; build con copia local y registro sintético. No acredita los casos adversos nuevos. |
| `node docs/verificar-aud01-2026-10-18.cjs` | Fallido, exit 1: siete casos históricos corregidos, pero V1 conserva comentarios, V2 altera programas válidos y V3 no detecta V1. Es diagnóstico de aceptación incumplida, no regresión aprobada. |

Evidencia reproducible: [diagnóstico](verificar-aud01-2026-10-18.cjs) y [salida JSON](aud01-evidencia-2026-10-18.json). El diagnóstico solo lee producto, ejecuta compilador y funciones reales con datos sintéticos y limpia su carpeta temporal controlada. El original histórico `diagnostico-auditoria-2026-10-17.cjs` se conserva: espera defectos y no sustituye las comprobaciones de resultado correcto.

No se repiten suites de motor, KiCad ni el conjunto completo de simulación: no cambiaron esas partes y el consumidor afectado tuvo su recorrido específico. No se prueba instalador, hardware ni uso en el aula. AUD-02/03/04/05 conservan sus estados; aprobar el recorrido normal de registro no cierra sus defectos.

**Siguiente responsable:** Claude para corregir y entregar AUD-01 de nuevo, con reservas coordinadas sobre `src/registro.js`; Codex para verificar el caso original, los nuevos casos y las dependencias afectadas. Sin commit, push ni publicación por esta revisión.
