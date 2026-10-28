# Verificación acotada de DIST-001 y DIST-002

28 de octubre de 2026 · Codex. Solicitud y alcance: CLA-20261028-005, autorizados por Efraín. Implementación de Claude; informe e instrumentos de Codex, autorrevisados, sin subagentes.

## Dictamen

**DIST-001: paso 6 verificado en el alcance de identidad del candidato y contraste del recorrido E1–E9 de Efraín.** Se conserva la limitación del candidato: contiene H1/LIENZO-001 y las fuentes externas antiguas. Este cierre acredita ese paso sobre el Setup identificado; no acredita la corrección de H1 ni recomienda publicar la 0.4.1. El próximo candidato requiere identidad y comprobaciones nuevas.

**DIST-002: verificada en software y configuración de empaquetado.** El HTML entregado se reconstruye íntegramente, carga las cuatro fuentes en Electron con HTTP(S) bloqueado, las usa para texto español sin recurrir a fuentes del sistema y no pide recursos externos. Regresiones generales y de escritorio aprobadas. Las dos OFL están presentes y declaradas en los archivos que electron-builder toma directamente del repositorio. **No se ha armado un instalador nuevo ni inspeccionado un asar nuevo con DIST-002.** Esa comprobación pertenece al próximo candidato.

No encontré defectos funcionales nuevos dentro de estos dos alcances. Hay una precisión documental menor: el sufijo abreviado del hash del HTML en CLA-20261028-005 y DIST-002 está mal transcrito; véase D1. No devuelve la implementación porque el artefacto se reproduce exactamente desde las fuentes identificadas.

## Identidad y preservación

- TC `main/f883ded`, TB `main/60f73ea`, TS `main/c349a7a`; estados existentes en [inicio.json](inicio.json). No se hizo commit, push, cambio de rama, publicación ni corrección del producto.
- Setup: 184818059 bytes, SHA256 `f32f62f3086c656101b257d14866219791efb5cb24d55303bf0dfc6b4c3390cb`.
- Asar armado e instalado: ambos SHA256 `b2ba0b1b40192de9ae7ad2e21a51fa4d7901bf9079ef2c5475587c052f1d689d`. `package.json`: TB 0.4.1 / dependencia fija TC `#v0.3.1`; el HTML contiene el bundle íntegro de esa etiqueta, SHA256 `f0815893488ad686763ce99de86ed2f1e4c6350a7ca394f71fdb24d89f04c3b9`.
- HTML de DIST-002: 1813086 bytes, SHA256 **`7ae0b4dfb1fa63ec3f222460967180eaebce7ce1746da934dd2816ae693b5a4a`**. `src/app.js` de PIEZA-003: `ba4464ed91d703f53db5cba1051120e5957d316296f6e28dfac41846fe48f6d6`; su diff: `8516567a272e83511696da80791fe025e90ff464a3076a1927d5e80243b3427c`. Coinciden con la entrega, salvo la errata del sufijo del HTML.
- 940 archivos identificados de producto y evidencias permanecen sin cambios, incluidos los de Efraín. [Integridad](integridad.json). Las pruebas escribieron sus salidas habituales y evidencia propia; se mantuvieron el diff de Claude, su memoria y las reservas de PIEZA-003/RUTA-003.

## Comprobaciones ejecutadas

| Comando / evidencia | Resultado | Alcance y límite |
|---|---|---|
| `node docs/verificacion-dist-2026-10-28/inspeccion.cjs` | **Aprobado, 30/30**, exit 0 | Setup/asar, versiones, bundle, archivos de escritorio y licencias frente a TB `c7252b8`, Arduino/CH340 presentes; construcción en memoria y fuentes/OFL/configuración del próximo paquete. No ejecuta empaquetar.js |
| `python -I docs/verificacion-dist-2026-10-28/evidencias.py` | **Aprobado, 9/9**, exit 0 | SVG, CSV, E9 y lector E7 en texto/JSON; stderr vacío |
| `node docs/verificacion-dist-2026-10-28/electron.cjs` | **Aprobado, 9/9**, exit 0 | Electron con perfil temporal propio, HTTP(S) bloqueado antes de navegar y control de inaccesibilidad; HTML anterior y corregido con las mismas demás fuentes |
| TB: `npm.cmd test` | **Aprobado**, exit 0, ambos apartados `ERRORES` vacíos | Regresiones existentes sobre el HTML identificado; se revisaron avisos esperados de programas inválidos |
| TB: `npm.cmd run test:app` | **Aprobado**, exit 0, `ERRORES: []` | Main/preload reales: puente, puertos, compilación correcta, puerto ficticio y C++ incorrecto con mensajes esperados. No subió a una placa |
| Capturas E1/E2/E3/E3b/E4b/E5/E8 | **Contrastadas visualmente** | Evidencia histórica de Efraín; no nueva instalación, desconexión física ni repetición humana por Codex |

Resultados completos: [inspección](inspeccion.json), [E4/E6/E7/E9](evidencias.json), [Electron](electron.json), [npm test](npm-test.txt), [test:app](test-app.txt), [historia](historia.txt), [historia JSON](historia.json).

La construcción se ejecutó en un contexto con las escrituras interceptadas: **no sobrescribió `dist/` de TecnoBloques**. Su HTML coincide byte por byte con el entregado. Usando las mismas demás entradas y el `build.js` anterior, la única diferencia del HTML local es el bloque de fuentes; la versión web conserva Google Fonts como permite la aceptación.

El control anterior en Electron pide la hoja de Google y no dispone de ninguna de las cuatro FontFace. El corregido no hace solicitudes HTTP(S), no emite errores y carga exactamente las familias/pesos 400/700 y 400/600. CDP identifica las fuentes realmente usadas como `AtkinsonHyperlegible-Regular`, `AtkinsonHyperlegible-Bold`, `JetBrainsMono-Regular` y `JetBrainsMono-SemiBold`, todas personalizadas, con glifos españoles renderizados. [Captura](electron-corregido.png).

Esta prueba de fuentes usa un harness Electron con el preload y el aislamiento del producto; no carga el main completo. El main real se comprueba por separado con `test:app`. El bloqueo HTTP(S) es controlado por la sesión de pruebas y se comprueba con una petición de control fallida; **no se desconectó la red del PC**. `navigator.onLine` siguió en true y no se usa como prueba de conectividad. No se acredita aquí el comportamiento del actualizador del proceso principal ni el rendimiento.

## Contraste del recorrido E1–E9

- E1 muestra el driver CH341S64 presente, CH341SER ausente y el hash íntegro correcto del Setup en D:. La primera consulta a E: falla, como indica el relato. E2 registra la invocación corregida y el mismo estado del driver. Que la instalación terminó sin preguntas/UAC/WCH corresponde al registro de Efraín; las capturas finales no demuestran por sí solas que nunca apareciera una ventana.
- E3 confirma TB 0.4.1 y TC 0.3.1. E3b, E4b y E5 son coherentes con el recorrido de la app, el gráfico del simulador y la marca del Uno. La compilación/subida real y el funcionamiento del Nano permanecen atribuidos a Efraín.
- E4 es un CSV separado por `;`, con datos de origen **simulador**; no valida el CSV de una placa real. E6/E6b tienen firma y marca de agua al 10 %, sin chip en el Nano y con chip en el Uno.
- E7: 20354 bytes, 62 eventos; SHA256 `643bcaa7f6779ec23ed88acb0489b73dec1b562dfd03b6fb3aaa40513d57d625`, igual al manifiesto completo, sin pendientes. Lector actual: una sesión, siete corridas, `limpio: true`, sin avisos ni problemas. Se contrasta la salida declarada con ejecución propia; no se interpreta «sin avisos» como ausencia de H1.
- E8 contiene un error visible de Google Fonts sin internet. E9 conserva `r1.en[2] = placa.D12` y además el cable `r1.2 → placa.D11`: es coherente con el análisis de H1. No se volvió a ejecutar la reproducción geométrica ni se certificó aquí su futura corrección.

## Situaciones pendientes y propuesta para Claude

| Situación | Impacto / estado | Propuesta y comprobación de salida |
|---|---|---|
| **H1 / LIENZO-001, alta, ya conocida**. El dibujo y la conexión interna difieren al cambiar placa o geometría; `prototipo/src/lienzo.js:391` conserva enlaces cuando no encajan todas las patas | Sigue en el candidato; no se cierra mediante esta revisión de identidad. E9 conserva el enlace oculto | Después de liberar PIEZA-003, calcular el grupo de piezas unidas por enchufes en ambos sentidos, con control de ciclos, y sus restricciones frente a placa/protoboard antes de moverlo. Aplicar un desplazamiento coherente al grupo; si las restricciones son incompatibles, soltar el enlace imposible con aviso, conservando enlaces válidos y cables explícitos. Hacer una comprobación final de **cada** `en`: sobre el destino dentro de la tolerancia, o eliminado con aviso. Usar los cuatro casos acordados en LIENZO-001; conservar guardado/reapertura e igualdad entre la conexión visible y la que recibe la simulación |
| **H2 / fuentes de Google en la 0.4.1** | Resuelto por DIST-002 en el HTML revisado; continúa presente en el Setup antiguo | Integrar el commit verificado en el próximo candidato; extraer del asar el HTML y compararlo con el build identificado. Probar fuentes sin red sobre ese asar y comprobar dentro de él ambas OFL y NOTICE. No trasladar este cierre a un instalador aún inexistente |
| **D1 / hash abreviado mal escrito, menor**. Canal y ficha dicen `…5b4a4a` | Solo documental; tamaño, prefijo, app.js/diff y build reproducido identifican la entrega | Añadir precisión con el hash completo terminado en `…3b5a4a`, conservando la historia. Usar hashes completos en la identificación del siguiente candidato |
| **Driver CH340 ausente e instalación con ventana** | No ejecutados con el instalador real; dos PC con driver presente no cubren este caso | Usar un PC de prueba sin ese driver o una imagen limpia con conexión USB real, sin retirar el driver del puesto de trabajo. Registrar UAC/WCH, código final y puerto COM antes/después; probar tanto `/S` como instalación con ventana. Si WCH no acepta `/S`, Claude debe documentar o corregir el comportamiento observado antes de atribuirle instalación silenciosa |
| **Próximo candidato y reservas** | PIEZA-003 ocupa lienzo.js; H1 todavía no implementado. El paquete nuevo no existe | Terminar y verificar PIEZA-003; Claude toma LIENZO-001 sobre esa versión, reproduce y entrega sus regresiones. Con las autorizaciones vigentes, preparar la etiqueta fija de TC y un nuevo candidato TB con DIST-002. Mantener el Setup 0.4.1/evidencia actual identificados; inspeccionar y recorrer el nuevo candidato por separado. Memoria y bitácora de TB se completan cuando sus reservas se liberen |
| **USB de la guía y tiempo de instalación** | E: no era la unidad correcta; ocho minutos incluyen errores de invocación | En la próxima guía indicar que se copie la ruta real desde el Explorador. Separar inicio efectivo/fin del instalador de la preparación; el registro actual no se usa como medida de velocidad |

Los glifos fuera del subconjunto latino pueden seguir usando la fuente del sistema; es el límite declarado por Claude y no un defecto nuevo detectado aquí. El CSV real y las validaciones eléctricas/de geometría/uso de LAB-001/LAB-002 conservan sus pendientes, sin ampliación de esta auditoría.

## Incidencias propias del instrumental

Se conservan [inspeccion-inicial.json](inspeccion-inicial.json) y [electron-inicial.json](electron-inicial.json). La comparación binaria inicial del package.json del asar era inadecuada: electron-builder elimina `scripts`, `devDependencies` y `build`; se contrastó después la proyección exacta, sin ninguna otra diferencia. El sufijo erróneo de la entrega se detectó al identificar el HTML y se resolvió por reproducción del build, sin ocultar D1.

El primer arranque de Electron falló por ACL del sandbox; se ejecutó con acceso autorizado, sin cambiar ACL ni desactivar su sandbox. La primera captura de una ventana oculta venció; el harness pasó a mostrar su ventana de prueba sin tomar el foco. La primera aserción `navigator.onLine === false` no probaba el bloqueo de la sesión; se sustituyó por la petición de control con HTTP(S) inaccesible. CDP se consultó después del render y usando los nombres PostScript reales, evitando confundir el nombre interno «JetBrains Mono SemiBold» con una fuente distinta.

Las dos suites existentes terminaron con exit 0; después, el envoltorio Python falló al imprimir una flecha con la consola cp1252. Los logs íntegros y códigos ya obtenidos se conservaron; no se repitieron suites por ese fallo de impresión. El lector E7 se guardó de nuevo directamente desde stdout para evitar la recodificación UTF-16 de PowerShell. La lectura opcional de metadatos WOFF2 con fontTools no se ejecutó por falta de Brotli; no se instaló nada y esa vía no se cuenta como aprobada. La evidencia de render proviene de Electron/CDP.

Estas incidencias pertenecen al diagnóstico, no son hallazgos del producto ni devoluciones de Claude. No hubo revisión independiente de los informes/instrumentos de Codex.

## Registro final

Dictamen comunicado en **COD-20261028-008**; fichas DIST-001 (paso 6) y DIST-002 marcadas `verificado` únicamente en los alcances descritos. Sesión **SES-20261028-004**. Reservas propias liberadas; las de RUTA-003 y el trabajo de PIEZA-003 se mantienen. Tablero regenerado y comprobador: **55 fichas, 104 documentos, 0 errores, 1 aviso por implementaciones simultáneas existentes**.

No se ejecutaron nuevamente la suite completa de TecnoCircuito/KiCad, la reproducción geométrica de H1, el instalador, el driver real, la subida a placa ni pruebas humanas/físicas. Ningún resultado de ese tipo se presenta como nuevo. Coordinación adicional de Efraín: **1 minuto declarado para SES-20261028-004**, contado una sola vez y separado de los tres minutos ya declarados en las sesiones anteriores de este día.
