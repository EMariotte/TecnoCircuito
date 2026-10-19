# Verificación de AUD-02 · Codex · 18 oct 2026

## Resultado

**Devuelta a Claude.** El error completo de escritura se avisa y su recuperación normal funciona. Dos casos impiden cerrar: una escritura parcial deja JSON inválido mientras se anuncia recuperación sin pérdidas, y una configuración ilegible al arrancar oculta la falla y ofrece crear otro PIN.

Se revisó CLA-20261018-007, el diff, contrato, esquema, pruebas y consumidor. Codex no implementa correcciones ni modifica memorias de Claude. Este informe y sus reproducciones son trabajo propio de auditoría, con datos sintéticos.

## Versión exacta

- TB: `main`, HEAD `262238435baadc1bea313afc9154a89d789e4611`, cambios de entrega sin commit. TC: `main`, HEAD `b75c1d0c2979679e7958f49edbdf1cfddaa102d5`, contrato y documentación sin commit. TS: `main`, HEAD `bfc88ccfafab87678fa0143bf57c243d9de34a0d`, ficha/canal/tablero de la entrega sin commit.
- Se respetaron las modificaciones existentes. Los diez hashes de producto/pruebas/contrato coinciden con la entrega y son los contenidos probados.

| Archivo | SHA256 |
|---|---|
| TB `escritorio/registro-disco.js` | `a6e20d8ff1e0b4a1e45147a9bdbd332622c49bb9c47a0021dbc075c8e23db9c1` |
| TB `escritorio/main.js` | `218efbc94ba57129a5f5da5d9c67e2a0faf7be977f168c08b677ee03120de780` |
| TB `escritorio/preload.js` | `edd35da881c4838a05c8f7ec7cfc3dcb08ad9cf898cfac273d9eebba4ac01ecb` |
| TB `src/app.js` | `4df2625c1f94521ba33fd28783b72c8cc71112f0b2818bbe8be4a2124385762a` |
| TB `src/style.css` | `86f10bdac228ffa3bb03deedbb9e231d05b7e007bc30d299259fee1d815e44dc` |
| TB `test/registro.js` | `2bd8e094d7fdff4ad9c1f184fb973369ff67d45d8a32c8b04828686e8acb5f7c` |
| TB `test/registro-app.js` | `99abc44d48fa53273ad9b17632626a4e0de09742bace0d5377b61d47c3a93fb7` |
| TC `CONTRATO.md` | `e4fb1e59b97aa532ad1880bf0a340e024b278fb1631078e2906aa62e9385e936` |
| TC `contrato/evento.schema.json` | `29347289699a9b588e1b232175e90f0bba7ed9a3e9299a1b7d3d4572b4c08962` |
| TC `prototipo/pruebas/probar_contrato.js` | `6bd47e0cc59038d399d6f1046688a234dcc1d8b26dba22ea0aebd223ca0972c1` |

## AUD-02-V1 · alta: recuperación aparente después de un append parcial

**Archivo:** `TecnoBloques/escritorio/registro-disco.js:133`, dentro de `vaciar`, y conteo/marca posterior.

**Condición ejecutada:** el `appendFileSync` real escribe los primeros 24 bytes del evento en un archivo temporal y el envoltorio lanza `ENOSPC`; se restaura la función y se llama `reintentar`. Es inyección controlada de escritura parcial, no un disco físico lleno ni una demostración de su frecuencia. El límite declarado por Claude queda reproducido como fallo concreto del tratamiento de errores.

**Observado:** el código reanexa la línea completa después del prefijo incompleto, sin reparar el final del archivo. La primera línea comienza así:

```text
{"v":1,"t":1792353600000{"v":1,"t":1792353600000,"origen":"editor",...
```

`JSON.parse` la rechaza. Sin embargo, `estado().falla` vuelve a `null`, el callback comunica `fin: 'escrito'` y la marca dice `recuperados: 1`, `perdidos: 0`. El evento no quedó disponible como una línea JSON válida. La interfaz usa ese callback para «El registro volvió a guardarse».

**Impacto:** se certifica una recuperación que deja datos corruptos. Un lector JSONL que se detiene en el primer error puede dejar de procesar también eventos posteriores. No se afirma que haya ocurrido con datos reales.

**Comprobación requerida:** escritura parcial en el evento y, al menos, al guardar la marca de recuperación; recuperación definida del archivo sin concatenación inválida ni duplicados, filas previas preservadas y conteos que correspondan a eventos legibles. Probar no solo `throw` antes de escribir, sino bytes realmente escritos antes del error. La corrección corresponde a Claude.

## AUD-02-V2 · alta: CONFIG sigue siendo silencioso al arrancar

**Archivos:** `registro-disco.js:38`, `:154`, `:163`; `src/app.js:1494`, `:1500` y `:1611`.

**Reproducción:** en un perfil temporal se crea el PIN y se activa el registro usando el módulo real. Se escribe una configuración sintética truncada (`{ roto`) y se abre la app Electron normal con ese perfil.

**Observado en Electron, sin errores JS:**

```json
{
  "estado": {"activo": false, "tienePin": false, "falla": null},
  "avisoOculto": true,
  "tituloPanel": "Registro de eventos: crear el PIN del instructor"
}
```

`leer()` convierte cualquier error en «apagado/sin PIN». `estado()` usa esa lectura; la página no empieza el registro, no emite eventos y por eso nunca alcanza la lectura estricta que crearía `CONFIG`. La prueba actual llama primero a `escribir` con la configuración rota: no cubre el arranque real. El diagnóstico Node confirma además que `crear-pin` permite sobrescribir la configuración dañada sin acreditar el PIN anterior.

**Impacto:** el registro que estaba configurado como activo queda calladamente apagado al arrancar; el operador no ve la falla y puede sustituir la configuración/PIN como si nunca hubieran existido. El comportamiento tolerante de `leer()` ya existía en HEAD: no se atribuye su introducción a esta entrega, pero el tratamiento nuevo de CONFIG aún no cubre este flujo.

**Comprobación requerida:** diferenciar una instalación sin configuración de una existente ilegible; mostrar un estado comprensible desde el arranque y una recuperación definida que preserve la protección del instructor. No se pide activar a ciegas un registro cuya configuración no se conoce. Cubrir configuración truncada y fallo de lectura, sin necesitar un evento artificial para revelar la falla.

## Caso original y partes verificadas

El diagnóstico carga de HEAD el módulo de disco y el manejador real de `tb:registrar`: dos `ENOSPC` completos dejan cero archivos, cero avisos y `activo: true`. Sobre la entrega actual, el mismo manejador con un fallo completo produce una falla visible en el módulo, conserva el evento y, al reintentar, deja dos líneas válidas: el evento y `registro_interrumpido`.

En Electron se aprobó el recorrido estándar completo, incluidos archivo de solo lectura real, aviso del aprendiz, panel del instructor, continuidad de compilar/simular, reintento, orden de los eventos y marca con su sesión. Esto verifica el camino normal; no invalida V1/V2.

El evento nuevo `registro_interrumpido` fue autorizado en la entrega por decisión de Efraín y está documentado/esquematizado como aditivo. No se objeta agregarlo ni se cambia el contrato por cuenta de Codex; lo pendiente es que lo guardado y sus conteos describan fielmente la recuperación.

## Ejecuciones propias y límites

| Comprobación | Resultado |
|---|---|
| `npm.cmd run test:registro` | Script aprobado, 106 OK, incluidos 17 de falla. Se observaron `EPERM` real, reintento automático, cola/tope, apagado y CONFIG después de escribir. Alimentación Offline: los dos chequeos heredados con umbral temporal también pasaron numéricamente, pero **no se acredita rendimiento** bajo la condición de cargador del proyecto. |
| `npm.cmd run test:registro-app` | Aprobado, 47 OK, exit 0 y sin errores de consola. E1–E5 con archivo de solo lectura y marca final. La comprobación de cierre de herramientas sin PIN pasó en esta corrida. |
| `npm.cmd --prefix prototipo run probar:contrato` | Aprobado; evento, ejemplos y rechazos del esquema comprobados. |
| `npm.cmd --prefix prototipo run construir` | Construido artefacto local `0.1.0-dev`, contrato 1, 480 KB/Worker 90 KB. |
| `python -I prototipo/pruebas/probar_registro.py prototipo/dist/prototipo.html prototipo/pruebas/capturas` | Aprobado, 18 OK y sin errores de consola. |
| `node docs/verificar-aud02-2026-10-18.cjs` | Exit 1: control original reproducido y fallo completo corregido, pero parcial corrompe JSONL y CONFIG al arranque se presenta como apagado. |
| `node docs/repro-aud02-arranque-electron-2026-10-18.cjs` | Exit 1: perfil sintético, aviso oculto y panel que ofrece crear PIN; cero errores JS. |

El primer intento de contrato dentro del aislamiento falló por acceso denegado de esbuild y se repitió con la escalación permitida. La primera invocación del script Python omitió sus dos argumentos; se corrigió el comando y se ejecutó completo. Ninguno de esos intentos acredita éxito ni se clasifica como defecto del producto.

Evidencia: [diagnóstico Node](verificar-aud02-2026-10-18.cjs), [salida Node](aud02-evidencia-2026-10-18.json), [reproducción Electron](repro-aud02-arranque-electron-2026-10-18.cjs) y [salida Electron](aud02-arranque-electron-2026-10-18.json). Captura local excluida de Git: `prototipo/pruebas/capturas/aud02-config-arranque.png`.

El cierre con cola todavía en falla no se verificó en un recorrido propio; la cola solo en memoria y su pérdida al salir siguen como límite declarado. No se llenó un disco físico ni se acreditan hardware, aula, instalador o exportación del caso corrupto como válidos. No se repiten motor/KiCad ni el conjunto completo del simulador: las comprobaciones pertinentes de este cambio fueron disco/IPC/interfaz, contrato y emisor. AUD-01 conserva su cierre; el limpiador no cambió.

## Hallazgo separado: herramientas sin PIN

Se incorpora AUD-06 para conservar trazabilidad de la falla intermitente observada por Codex al verificar AUD-01 y comunicada de nuevo por Claude en CLA-20261018-007. Archivo señalado: `escritorio/main.js:49`; causa aún no demostrada. La prueba de hoy pasó. No se atribuye a AUD-02 ni se reabre AUD-01 por ello, y no se inicia una corrección desde esta auditoría.

**Siguiente:** Claude corrige V1/V2 y vuelve a entregar con regresiones útiles y reservas coordinadas. AUD-02 queda pendiente, sin cierre. Efraín conserva prioridades y decisiones de entrega. Sin código de producto implementado por Codex, commit, push ni publicación.
