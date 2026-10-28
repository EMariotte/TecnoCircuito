# Verificación de PIEZA-001 y PIEZA-002 · 28 oct 2026

Autor: Codex. Entrega: CLA-20261028-001. Alcance: **profunda única**, conjunta, sobre `2808fd8` y el diff de revisión sin commit identificado en [inicio.json](inicio.json). Revisión de producto de Claude; instrumentos e informe propios de Codex, sin subagentes ni cambios de código de producto.

**Dictamen:** PIEZA-001 devuelta por **F01, gravedad media**. PIEZA-002 conforme en software e integración; conserva pendientes de geometría física y uso de Efraín, por lo que pasa a `pendiente_externo`. La revisión conjunta terminó; el commit del lote sigue esperando la corrección de F01, su verificación y la revisión de Efraín. No se autoriza publicación.

## F01 · Media · La resistencia antigua conserva el cuerpo de ¼ W al elegir ½ W

**Archivo y condición:** `prototipo/src/lienzo.js:1308`, con una resistencia guardada **sin `vatios`**, al elegir directamente `0.5` en la ficha. La condición que decide rehacer el dibujo solo compara tamaño y pines. Las vistas `resistencia_025w6.js` y `resistencia_05w.js` comparten marco **17,78 × 7,62 mm** y contactos **(1,27; 3,81)** / **(16,51; 3,81)**. El cuerpo y su color sí cambian entre las dos.

**Reproducción mínima:** abre un circuito válido con esta pieza; selecciónala y elige ½ W:

```json
{"formato":1,"placa":"uno","protoboard":null,"componentes":[{"id":"r1","tipo":"resistencia","x":350,"y":200,"rot":0,"props":{"ohmios":1000}}],"cables":[]}
```

**Esperado:** cuerpo azul de 8,7 mm de la variante `05w`, en el lienzo y en `exportarSVG()`, inmediatamente después de elegir la potencia; sin mover sus contactos ni perder el guardado correcto.

**Observado:**

| Superficie | Resultado |
|---|---|
| Circuito en vivo y guardado | `vatios: 0.5`, correcto |
| Ficha | «½ W (0,5 W)» y «8,7 mm, azul», correcto |
| Dibujo en el lienzo | Cuerpo pequeño beige; título «Resistencia de ¼ W con las patas abiertas» |
| Imagen SVG exportada | Lleva `td-resistencia-025w6-`, sin `td-resistencia-05w-` |
| Después de reabrir | Aparece correctamente el cuerpo azul de ½ W |

**Causa:** al ser iguales los dos marcos, se entra en `v.def.aplicar(...)`; `aplicarResistencia` solo cambia las bandas. La selección de otra vista de resistencia no se aplica. El optimizador de CR-8 introdujo esta regresión: el mismo caso pasa con la página de `2808fd8`, y falla con el diff entregado.

**Impacto:** una selección corriente desde un archivo antiguo deja una pieza diferente de la que describen la ficha y la potencia elegida. La imagen exportada conserva esa contradicción. No reproduje pérdida de conexiones, pérdida del nuevo valor ni un cálculo eléctrico incorrecto en este caso. La gravedad es media por la incoherencia de la representación educativa y del archivo gráfico.

**Evidencia:** [diagnostico.py](diagnostico.py), [resultados actuales](diagnostico.json), [contraste con 2808fd8](baseline-2808fd8/diagnostico.json), [captura antes de reabrir](F01-antes-reabrir.png) y [captura después](F01-despues-reabrir.png). Hay dos aserciones fallidas del **mismo defecto**, no dos hallazgos.

**Para Claude:** distingue un cambio de variante visual de un cambio de marco. Conserva la corrección de A-01 y la optimización al cambiar solo ohmios. Añade la transición **sin `vatios` → ½ W** comprobando el cuerpo o la variante real del SVG, exportación y reapertura; conserva ¼ W ↔ ½ W, ancla, guardado, caso suelto y entrega al Worker. La próxima verificación puede ser **acotada a F01 y sus regresiones**, incluidas las interacciones afectadas de PIEZA-002; esta revisión profunda no necesita repetirse entera.

## Comprobaciones ejecutadas

| Comprobación | Resultado propio |
|---|---|
| `npm.cmd run probar` en TC | **1391 OK / 0 fallas**, salida 0; incluye construcción, núcleo, motor, Nano, contrato, fixtures, Worker, navegador y registro |
| KiCad real dentro de la suite | **10.0.3 ejecutado** para Uno y Nano; sin omisión. Incluye huellas nuevas de resistencia y potenciómetro, pads, netlists y comprobaciones de PCB de la suite |
| `probar_piezas.py` dentro de la suite | **52 OK**, incluyendo correcciones declaradas de guardado, fichas, renovación y clic en el marco transparente |
| Revisor de las seis entregas SVG/JSON de TD | **202 comprobaciones**, cero fallas; procedencia y declaración publicable comprobadas por el revisor |
| Diagnóstico propio en Chromium | **18/20 conformes**; fallan solo dibujo y exportación de F01. Sin errores de consola |
| Mismo diagnóstico con página histórica `2808fd8` | **12/20 conformes**: reproduce los ocho incumplimientos de guardado/posición/Worker que corrige el diff; las dos aserciones de F01 pasan |
| Comparación diferencial propia del núcleo | **74/74 corridas**, 60 cuadros cada una, en tres revisiones; **8880 comparaciones de fotos** sin diferencias inesperadas |
| Control positivo de esa comparación | Cambiar 220 Ω por 330 Ω **sí produce diferencias** |
| TB `npm.cmd run test:simulador` | **58 OK**, salida 0; Arduino CLI y Electron con copia local, sin errores JS |
| TB `npm.cmd run test:registro-app` | **134 OK**, salida 0; perfiles temporales sintéticos, sin errores de consola |
| TB `npm.cmd test` | Salida 0; ambas listas `ERRORES:` vacías, revisadas junto con la salida |

Los comandos, salidas y duraciones de las comprobaciones complementarias están en [ejecuciones.json](ejecuciones.json). El comando de comparación independiente es `node docs/verificacion-piezas-2026-10-28/comparar-nucleo.cjs`; el diagnóstico actual, `python -I docs/verificacion-piezas-2026-10-28/diagnostico.py`. Su salida 1 **acredita F01 reproducido**, no una regresión aprobada.

La comparación diferencial usa los diez ejemplos `EJEMPLO*` de la página anterior a la entrega con seis programas, más catorce fixtures ejecutables (60 + 14 corridas). Compara `c9360bc` → árbol actual omitiendo únicamente el campo nuevo `medicion.resistencias[*].vatios`, y `2808fd8` → árbol actual sin omitir ese campo. Semilla 37, pulsadores presionados en cuadros 20–34. Las tres fuentes se compilan en memoria desde Git o desde el árbol identificado, sin checkout ni restauración sobre archivos del producto. [Programa](comparar-nucleo.cjs) y [resultados](comparacion-nucleo.json).

Se revisaron los diffs de contrato/esquema, catálogo, las cuatro piezas y sus vistas, lienzo/CSS/protoboard, biblioteca, núcleo/motor, KiCad, pruebas y ejemplos de TB; se inspeccionaron visualmente las capturas de piezas nuevas, protoboard y F01. En A-01 el diagnóstico independiente también comprueba simulación **ya corriendo**: al pasar la pata 2 de c9 aislada a c11 conectada a GND, el Worker empieza a medir potencia, guardado y lienzo coinciden y al reabrir la pata cae sobre c11. Con c11 ocupada, la resistencia queda suelta tanto en vivo como guardada y reabierta. Las transiciones ¼ W ↔ ½ W conservan la pata 1 en los cuatro giros.

## Versión, integridad y límites

- **TC:** `main`, `2808fd8af3bfb0d0c342e31078a134f4e19924ec`, más diff sin commit. `lienzo.js` SHA256 `edb3a6cb50e54947…`; paquete `94cab5ddc8fb6af2…`, **0.3.1-dev**, no etiqueta nueva. Los hashes completos de 89 archivos de TC y 54 del hermano/dibujante constan en `inicio.json`; [resumen.json](resumen.json) comprueba su conservación. La reconstrucción produjo los mismos dos artefactos de desarrollo.
- **TB:** `main`, `439166e131808e5210a330e08d84a5f7c218a1ea`; sus cambios previos de BITACORA/CLAUDE se preservaron. **TD:** `main`, `30ac0ba73db8fb19389e46dc98b364aa5abb3d84`, limpio. **TS:** `main`, `1f87dab`, con trabajo previo de coordinación y TecnoRuta identificado; se editaron solo las fichas/canal/registro propios relacionados.
- La primera ejecución del build fue bloqueada por lectura de directorios en el sandbox. Se conservó su log y la suite completa se ejecutó con acceso autorizado a las herramientas instaladas. No se atribuye ese bloqueo a un defecto de producto. El primer intento de comparación omitió `INICIAL` al extraer los ejemplos; se corrigió solo el instrumento y se ejecutaron las 74 corridas completas. Se conserva la salida inicial por trazabilidad.
- La lectura directa de energía posterior indica **batería** (`ACLineStatus: 0`, 90 %). Los resultados funcionales de la suite son conformes; **no se acredita una nueva medición de rendimiento con cargador** ni se usan las velocidades observadas para cambiar umbrales.
- No repetí exactamente el corpus histórico de **22 circuitos / 126 corridas** de Claude. La comparación nueva de 74 corridas y los casos de navegador tienen el alcance descrito arriba; no sustituyen retrospectivamente aquella evidencia.
- No se ejecutaron instalador, publicación, versión etiquetada, prueba sin red del candidato DIST-001 ni nuevas medidas físicas. La geometría en la protoboard real y el uso con aprendices siguen a cargo de Efraín. Las medidas ya registradas del potenciómetro y el pulsador son antecedentes, con escala/incertidumbre no anotadas; las pruebas de software no amplían su validación.
- El gesto conocido del potenciómetro de wokwi ya elegido permanece como límite anterior declarado por Claude; no se presenta como un nuevo defecto de esta entrega. Los avisos de terceros se conservan y los dibujos integrados son vectoriales. No se copiaron fotos, registros de aprendices ni material privado a esta evidencia.
- Codex no modificó fuentes de producto ni memorias de Claude, y no hizo commit, push, etiquetas o publicación. Solo añadió diagnósticos, informe, bitácora y coordinación propios. La revisión humana de Efraín y la autorización de commit siguen pendientes.
- Cierre documental: tablero regenerado y comprobador del proceso **52 fichas / 101 documentos, cero errores y avisos**. [Integridad final](integridad-final.json): ningún cambio inesperado en las fuentes o los hermanos, prefijo de BITACORA preservado y once enlaces de este informe existentes. `git diff --check` solo señala espacios finales en los dos artefactos minificados de desarrollo ya entregados, conservados por hash; la entrada propia de BITACORA pasa. No se modificaron los artefactos para silenciarlo.
