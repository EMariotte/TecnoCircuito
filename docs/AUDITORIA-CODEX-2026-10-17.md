# Primer ciclo de auditoría permanente — 17 de octubre de 2026

Autor: Codex (Sol), con revisión independiente de subtareas de eventos y Nano por agentes Codex. Encargo de Efraín: iniciar la metodología acordada de auditoría y supervisión permanente.

## Resultado y alcance

**Cinco defectos nuevos reproducidos: tres de gravedad alta y dos de gravedad media.** Las pruebas existentes no cubren las condiciones que los reproducen. El diagnóstico reproduce defectos; que termine con código cero no significa que los defectos estén corregidos.

| ID | Gravedad | Resultado observado | Responsable de implementación |
|---|---|---|---|
| AUD-01 | Alta | El registro conserva comentarios en dos construcciones válidas de C++. | TecnoBloques; agente que asigne Efraín. |
| AUD-02 | Alta | Un error de escritura pierde eventos sin cambiar el estado de registro activo ni informar el fallo. | TecnoBloques; agente que asigne Efraín. |
| AUD-04 | Alta | Cambiar de equipo durante una corrida adjudica su cierre al equipo nuevo, sin inicio ni circuito. | TecnoBloques; agente que asigne Efraín. |
| AUD-03 | Media | Una foto pendiente descartada al pausar pierde definitivamente sus fallas; el cierre puede indicar ninguna aunque el LED siga quemado. | TecnoCircuito; asignar la corrección del protocolo de eventos. |
| AUD-05 | Media | El núcleo ejecuta instrucciones tras detectar brownout si se avanza en pasos grandes. El Worker actual limita el paso a 1 ms. | Codex, dentro de Nano, en una tarea de corrección separada. |

Alta significa que debe corregirse antes de considerar fiable el registro para recoger datos del estudio. Media requiere corrección pero tiene una condición más acotada o una mitigación vigente. Se distingue impacto de frecuencia: los casos léxicos de AUD-01 y el orden de mensajes de AUD-03 no ocurren en todos los programas o interacciones.

La revisión se concentró en los cambios recientes del registro, sus límites con TecnoBloques y la familia Nano. No constituye una revisión exhaustiva línea por línea de todos los proyectos ni una nueva validación física. R1–R8 conservan sus cierres anteriores; estos IDs corresponden a casos nuevos.

## Referencias y entorno

- TecnoCircuito: `390ef34a119df754a06ff35c96e2286800819f21`.
- TecnoBloques: `5b6d37a1f4b65474ec52a162fb5c3c330bc48445`.
- Al comenzar este ciclo había cambios documentales de la sesión de metodología en AGENTS.md, CLAUDE.md, BITACORA.md y un documento nuevo. TecnoBloques estaba limpio. Se conservaron esos cambios.
- Nano incluye implementación previa de Codex: esa parte es revisión de trabajo propio. Se añadió una subrevisión separada por otro agente Codex, cuya reproducción verificó el agente principal; no es una revisión externa al equipo Codex.
- Node v24.15.0, npm 11.12.1, Python 3.14.4; Windows x64, Intel Core i5-9300H, 8 procesadores lógicos. Compilador de contraste: AVR GCC 7.3.0-atmel3.6.1-arduino7 del paquete de TecnoBloques.
- Paquete construido de desarrollo: `0.1.0-dev`, contrato 1. La integración local no acredita el instalador ni equivale a probar la dependencia distribuida `v0.1.0`.
- Git no podía leer el ignore global del usuario. Para leer el hermano se usó `git -c safe.directory=...`, solo por comando, sin modificar configuración global.
- El primer intento de build dentro del aislamiento falló por acceso denegado de esbuild. Se ejecutó la suite con la escalación permitida; ese fallo de entorno no se clasifica como defecto del código.
- Se detectó batería al 34 % mediante `GetSystemPowerStatus`. Efraín conectó el cargador y se verificó `ACLineStatus=1` al 32 %. Las comprobaciones de rendimiento se repitieron con cargador y sin otro verificador activo.

## Reproducción común

Desde la raíz, tras generar los `.cjs` de las pruebas actuales:

```powershell
node docs/diagnostico-auditoria-2026-10-17.cjs
```

El [diagnóstico](diagnostico-auditoria-2026-10-17.cjs) contiene únicamente datos sintéticos, lee las fuentes de ambos proyectos y no las modifica. Necesita los paquetes locales y el compilador AVR del hermano; `AVR_GXX` permite indicar otro ejecutable. AUD-02 crea una carpeta temporal con configuración sintética. AUD-03 controla la entrega de mensajes y AUD-05 añade contadores solo en memoria: se especifican sus límites a continuación.

AUD-04 dispone además de un [recorrido reproducible en Electron](repro-equipo-electron-2026-10-17.cjs): `node docs/repro-equipo-electron-2026-10-17.cjs`. Necesita el HTML de TecnoBloques construido con `--simulador-local`, compila un ejemplo real y usa un perfil temporal con equipos sintéticos.

Evidencia local, excluida de Git: `prototipo/pruebas/auditoria-2026-10-17-*.log` y los artefactos de `prototipo/pruebas/capturas/`. No se utilizaron registros de aprendices ni datos de investigación privados.

## AUD-01 — Alta: comentarios C++ que llegan al registro

**Archivos:** `TecnoBloques/src/registro.js:11`, reconocimiento de literales crudos en `:41`; consumidor en `TecnoBloques/src/app.js:1557`.

**Condición:** compilar C++ con una continuación de línea entre las dos barras de un comentario, o con un literal crudo prefijado que contenga una comilla interior.

**Esperado:** conservar el programa sin comentarios, conforme a CONTRATO 6.1, respetando los textos literales.

**Observado:** `quitarComentarios` conserva `MARCADOR_PRIVADO_SINTETICO` en ambos casos. Con exactamente las mismas entradas, `avr-g++ -E -P -x c++ -std=gnu++11 -` termina correctamente y elimina ese marcador, confirmando que pertenece a un comentario y no al programa.

Primer caso, representado como cadena JSON para hacer visible la barra inversa y el salto:

```json
"int valor=1; /\\\n/ MARCADOR_PRIVADO_SINTETICO\n"
```

Segundo caso:

```cpp
const auto s = u8R"(a " b)"; // MARCADOR_PRIVADO_SINTETICO
```

El comprobador recorre caracteres antes de resolver la unión de líneas. Además, el reconocimiento de `R"` descarta el caso si el carácter anterior es alfanumérico, como ocurre con `u8R`, `uR`, `UR` y `LR`.

**Impacto:** puede persistir texto libre en comentarios que el contrato prometía excluir; algunos literales también pueden alterarse al limpiar el código. No se afirma que se hayan expuesto datos reales: la reproducción usa un marcador sintético.

**Cierre requerido:** regresiones para continuaciones LF/CRLF, comentarios de línea/bloque y todos los prefijos crudos admitidos, con comillas y escapes. Deben eliminar el comentario y conservar el contenido de los literales. Contrastar las construcciones con el preprocesador; no basta añadir al limpiador los dos ejemplos exactos.

## AUD-02 — Alta: pérdida silenciosa ante fallo de disco

**Archivos:** `TecnoBloques/escritorio/registro-disco.js:78`, `escritorio/main.js:97`, `src/registro.js:128`; aviso en `src/app.js:1491`.

**Condición:** registro encendido y equipo confirmado; `appendFileSync` falla, por ejemplo por disco lleno o permisos.

**Observado:** el handler real `tb:registrar` captura el error sin devolver ni emitir estado de fallo. El emisor de la página tampoco obtiene confirmación. Se inyectó `ENOSPC` solo en memoria para la ruta temporal sintética: dos eventos intentados, dos errores, cero archivos; `disco.estado().activo` y `registro.activo()` siguieron en `true`.

**Impacto:** se puede perder una sesión completa mientras la interfaz anuncia «Esta sesión se registra». La prueba existente verifica que un error no interrumpa el trabajo, pero no exige informar que el registro dejó de guardarse.

**Límite de la evidencia:** módulos reales y handler IPC extraído de la fuente; error de disco controlado. No se llenó el disco ni se provocó un fallo físico del equipo, y este diagnóstico no abrió Electron.

**Cierre requerido:** inyectar fallo de escritura en la integración; comprobar un estado visible y comprensible de registro fallido, recuperación definida y ausencia de pérdida silenciosa. El trabajo del aprendiz debe poder continuar; no es necesario bloquear el editor para informar al instructor.

## AUD-04 — Alta: una corrida cambia de equipo a mitad de su registro

**Archivos:** `TecnoBloques/src/app.js:1524`, `:1472`, `:2053`; `src/registro.js:106` y `:126`.

**Condición:** A7 inicia una simulación; durante la corrida pulsa el aviso del registro y confirma B2.

**Observado con las funciones reales de la aplicación y el emisor real:**

```text
A7 / s1: sesion_iniciada
A7 / s1: simulacion_iniciada, corrida 1
A7 / s1: sesion_terminada
B2 / s2: sesion_iniciada
B2 / s2: simulacion_detenida, corrida 1
```

`confirmarEquipo` cambia la sesión sin detener o delimitar la simulación existente. Los siguientes eventos reciben el sobre del equipo actual. B2 queda sin inicio ni circuito; A7, sin cierre de corrida. Los eventos individuales pueden ser válidos frente al esquema, que no garantiza coherencia entre líneas.

**Impacto:** atribución incorrecta entre equipos y reconstrucción incompleta de sus actividades.

**Confirmación adicional en Electron:** se cargó «Eco serial y LED», se compiló con Arduino CLI y se inició la simulación como A7. Se pulsó el aviso, se escribió y confirmó B2; el simulador seguía en estado `corriendo`. Al detenerlo, los archivos reales `A7-2026-10-17.jsonl` y `B2-2026-10-17.jsonl` reprodujeron la misma separación incorrecta. Sin errores JS. La captura fue inspeccionada: muestra «Equipo B2» y la simulación activa.

Evidencia local: `prototipo/pruebas/capturas/auditoria-equipo-2026-10-17/resultado.json` y `equipo-b2-corrida-de-a7.png`. El recorrido usa únicamente códigos y contenido sintéticos; no recoge datos de aprendices. La confirmación de este caso no acredita todavía las variantes de compilación pendiente o cambio de equipo con simulación pausada.

**Cierre requerido:** definir y probar la frontera de equipo/sesión para simulaciones activas y pausadas, compilaciones pendientes y resúmenes diferidos. Ninguna actividad previa debe pasar al nuevo equipo; cada corrida debe conservar inicio, circuito y cierre coherentes.

## AUD-03 — Media: fallas consumidas por una foto descartada

**Archivos:** `prototipo/src/simulador.js:50`, `:147`, `:169`; consumo de nuevas fallas en `nucleo.js:719`; protocolo de pausa/detención en `trabajador.js:99` y `:107`.

**Condición:** una foto con fallas ya fue emitida por el Worker y sigue pendiente cuando se pulsa Pausa. La página incrementa `turno` antes de recibirla y la descarta.

**Reproducción:** programa `fijo13.hex`, LED rojo directo de D13 a GND, núcleo real. Tras 20 ms se obtiene una foto que contiene `led_quemado` y `corriente_pin`. Se controla exclusivamente la entrega de esa foto para que llegue después de pausar. Al reanudar se entrega la siguiente foto real y se detiene.

**Observado:** el LED continúa en `quemados: ['led1']`, pero no se emite ninguna `falla` y `simulacion_detenida.datos.fallas` queda vacío. `foto()` ya vació las fallas nuevas y las siguientes no las repiten.

**Impacto:** una interacción puede borrar evidencia de una falla persistente. El análisis previsto «si la falla ya no aparece, se corrigió» puede producir una conclusión equivocada. El mismo canal transporta serial y estado; esta reproducción acredita específicamente pérdida de fallas.

**Límite de la evidencia:** núcleo y controlador reales con Worker controlado para fijar un orden de mensajes permitido por el protocolo. No se midió la frecuencia de esa intercalación en uso humano.

**Cierre requerido:** simular entregas pendientes al pausar, detener, reiniciar y recablear. Separar el descarte de una vista vieja de la entrega fiable de hechos o conservar un acumulado autoritativo. El cierre debe incluir cada falla de su corrida y excluir las de corridas anteriores.

## AUD-05 — Media: AVR activo tras brownout con pasos grandes

**Archivos:** `prototipo/src/nucleo.js:840`, corte en `:397`; bucle de instrucciones en `chip.js:105`; mitigación del Worker en `trabajador.js:68`.

**Condición:** Nano con expansión roja, jack nominal de 9 V, resistencia de 0,25 Ω entre OUT_5V y GND, `nano_adc67.hex`, `limiteUSB: true` y semilla 77. Es una carga sintética de software, no una práctica propuesta con hardware.

**Observado al avanzar los mismos 16 ms:**

| Resultado | Un paso de 16 ms | Pasos de 1 ms |
|---|---:|---:|
| Ciclo en que el modelo declara corte | 16 000 | 16 000 |
| Instrucciones ejecutadas después del corte | 184 852 | 0 |
| Último ciclo ejecutado tras el corte | 255 999 | Ninguno |
| Voltaje final de referencia | 2,496875 V | 2,496875 V |
| Placa declarada apagada / reinicios | Sí / 1 | Sí / 1 |

El modelo declara `apagada` en un callback de cada ms, pero `chip.correr(ciclos)` continúa su bucle; el reset se atiende al volver a `avanzar`. La instrumentación añade únicamente contadores en memoria al bundle actual, sin cambiar su control de flujo ni escribir el archivo.

**Impacto y límite:** el resultado del núcleo depende del tamaño de paso cuando aparece el corte. Una comprobación adicional del revisor, con fotos iguales y restauración de alimentación, obtuvo una línea serial adicional con pasos grandes. El Worker actual usa pasos de hasta 1 ms; no se demostró este defecto en su ejecución normal ni una incorrección de la tarjeta real.

**Cierre requerido:** detener la ejecución AVR en la frontera del corte, conservar el tiempo global y comparar pasos grandes/parciales bajo caída y recuperación. Verificar instrucciones, serial y modelos temporales; no limitar la prueba a que el voltaje final coincida.

## Comprobaciones ejecutadas

| Comprobación | Resultado nuevo de este ciclo |
|---|---|
| Build y cobertura completa de TecnoCircuito, por tramos | 26 grupos, 1179 `OK`: 8 grupos Node, 2 KiCad real y 16 Chromium. |
| `npm.cmd --prefix ../TecnoBloques run test:simulador` | 53 OK, exit 0, sin errores JS. Arduino CLI y Worker reales; Uno/Nano/Nano antiguo. |
| `npm.cmd --prefix ../TecnoBloques run test:registro` | 58 OK, exit 0. |
| `npm.cmd --prefix ../TecnoBloques run test:registro-app` | 36 OK, exit 0; archivo producido revisado contra el esquema, sin errores de consola. |
| `npm.cmd --prefix ../TecnoBloques run test:graficador` | 28 OK, exit 0. |
| `npm.cmd --prefix ../TecnoBloques test` | Exit 0; se revisaron ambos apartados `ERRORES:`, vacíos. |
| `npm.cmd --prefix ../TecnoBloques run test:app` | Exit 0; compilación, puerto falso y error C++ ejercitados; `ERRORES: []`. |
| `node docs/verificar-correcciones-2026-10-11.cjs` | 34 comprobaciones independientes aprobadas. |
| `node docs/verificar-cierre-r6-2026-10-11.cjs` | 16 aprobadas; mantiene 11/12 estrictas y 12/12 con margen instrumental. |
| `python -I docs/verificar-r8-2026-10-11.py` | 6/6 escenarios correctos: ejecución normal devuelve 0; JS y archivo ausente inyectados devuelven 1 en los dos scripts originales. |
| Diagnóstico nuevo y recorrido Electron AUD-04 | Los cinco defectos están reproducidos; no son regresiones aprobadas ni correcciones. |

**La cobertura de TecnoCircuito se obtuvo en dos tramos; no hubo un `npm run probar` completo con exit 0.** El comando original pasó 799 comprobaciones previas al grupo de simulación y se detuvo allí con tres fallos: solo cuatro cambios del LED, 72 % encendido y relación 2513/3282 ms. El PC había comenzado en batería y otro verificador estuvo activo durante esa parte; no se atribuye el resultado a una sola causa.

Tras confirmar cargador se repitió `probar_simulacion.py` y se ejecutaron los 13 grupos restantes con los mismos comandos del `package.json`, secuencialmente y sin cambiar el código ni los umbrales. Los 14 grupos terminaron con exit 0 y 380 OK. El grupo repetido obtuvo siete cambios del LED, 57 % encendido y 3224 ms simulados en 3224 ms reales. El total 1179 excluye todas las comprobaciones del primer grupo fallido: 799 + 380. No se sumaron resultados históricos ni duplicados.

Las pruebas KiCad Uno y Nano se ejecutaron; no quedaron omitidas. Las netlists conservaron redes/pads al guardar y abrir; se revisaron los informes DRC usados por las pruebas. Los elementos sin conectar corresponden a placas de comprobación pendientes de trazado, no a una certificación de PCB fabricable.

Los logs locales distinguen `suite`, `continuacion`, `tb-simulador`, `tb-registro-app`, `tb-general`, `tb-app`, `correcciones`, `r6`, `r8`, `diagnostico` y `equipo-electron`. El resumen de continuación y el de integración están en `prototipo/pruebas/capturas/auditoria-2026-10-17-*.json`. `test:registro` y `test:graficador` se verificaron en la salida directa de sus comandos. Los errores de inyección de R8 se conservaron aparte y son resultados esperados del metatest.

No se ejecutó una prueba del instalador empaquetado, funcionamiento instalado sin red ni una nueva evaluación humana de accesibilidad/usabilidad. La velocidad obtenida corresponde a este PC y montaje, no al PC del aula ni a la exactitud de tiempos eléctricos físicos.

Se concilió el estado Nano de CLAUDE.md: la revisión dejó de estar anunciada como pendiente y se comprobó la presencia de Nano/expansión en el artefacto de `v0.1.0`, separándola de la validación física pendiente. En el CLAUDE.md del hermano quedan frases heredadas que dicen que el instalador sale sin simulador, junto a su encabezado que describe el 0.3.0 preparado con él. Se señala al responsable de ese estado para conciliación; este ciclo no modificó su documentación ni acreditó su instalador.

## Pendientes físicos y de uso

Se conservan las diferencias registradas en `validacion/2026-10-16-polaridad-bloqueo-servos-uno.md`: polaridad de M1, tensión del motor bloqueado y arranque de servos. Faltan mediciones para separar algunas causas; esta auditoría no ajustó sus modelos.

Nano/expansiones roja y azul conservan pendientes de continuidad, identificación de reguladores/protecciones, alimentación, disipación y montaje. Los resultados de KiCad representan el diseño de referencia. La inspección de uso y los recorridos automatizados no reemplazan las prácticas observadas con aprendices ni validan tiempos físicos ±1 %.

## Traspaso

No se modificó código funcional, contrato, datos físicos ni artefacto distribuido de la raíz. Se entregan informe y diagnóstico. Primero deben corregirse y verificarse los problemas del registro; después, el límite temporal Nano en una tarea con regresiones. La aceptación del registro para el estudio queda pendiente de los cierres y de la prueba humana de utilidad ya prevista.

Codex conserva la supervisión y verificará cada corrección contra su caso original. Para las correcciones de TecnoBloques y del protocolo de eventos se conserva la necesidad de asignación del implementador por Efraín. Sin commit, push, etiqueta ni publicación.

## Seguimiento posterior — traspaso solicitado el 17 oct

Efraín pidió documentar y notificar los resultados al agente programador Claude Code, que usa VS Code. Se preparó el [traspaso con mensaje, prioridades, reparto y condiciones de devolución](TRASPASO-CLAUDE-AUDITORIA-2026-10-17.md) y se dejaron avisos en CLAUDE.md y bitácoras de ambos proyectos. No hay canal conectado a su conversación de VS Code: la entrega directa y el acuse siguen pendientes. No se atribuye a Claude recepción ni ejecución del encargo.

La siguiente fase es corrección y verificación de hallazgos, empezando por los tres altos del registro. Codex conserva Nano/AUD-05 y la supervisión de cierres; AUD-03 requiere coordinar archivos del protocolo de eventos. Este seguimiento no modifica los resultados anteriores ni acredita correcciones.

Después, Efraín pidió un [contrato permanente de roles y comunicación](CONTRATO-COORDINACION-AGENTES.md). Se instaló la lectura de inicio en ambos repositorios y se publicó COD-20261017-001 en el canal .md de Codex. La recepción se acreditará por la respuesta del otro agente en su propio canal; no hay acuse de Claude al establecer el procedimiento. Ambos deben advertir a Efraín sobre pasos necesarios omitidos y conservar los estados y límites de evidencia descritos en el acuerdo.
