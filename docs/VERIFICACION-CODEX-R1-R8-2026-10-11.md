# Verificación de las correcciones R1–R8 — 11 de octubre de 2026

Autor: Codex, revisor. Encargo de Efraín: contrastar las correcciones de Claude documentadas en BITACORA.md, leer las referencias Nano1–Nano8 y registrar el alcance de KiCad para el conjunto Nano + expansión E/S.

Revisiones comprobadas: TecnoCircuito `5a543b191dabc6a07c4d73068c427db33bb76117`; TecnoBloques `b09eb59da331513cf7d7cd93b5168073e414c8be`. Ambos árboles estaban limpios antes de esta entrega. Se revisaron los diffs respecto de la revisión inicial y los registros actuales; no se modificó código de producción, contrato, medidas, HEX ni fuentes del hermano.

## Resultado

**R1–R5, R7 y R8 quedan verificados en el alcance de la revisión inicial. R6 tiene corregidos los casos originales, pero queda un pendiente documental relacionado con la decisión posterior de Efraín sobre porcentajes.** El informe inicial se conserva como evidencia histórica; este seguimiento registra el resultado posterior.

| ID | Estado | Evidencia independiente |
|---|---|---|
| R1 | Verificado | S1 y S2 entregan 5 mA a 1 kΩ; señales y voltajes de entrada son equivalentes al montaje directo. Corto entre positivo y tierra de conectores detectado |
| R2 | Verificado | 100 avances de 4801 ciclos suman 30,00625 ms y dejan calor 0,99. Recuperación a 2991,000 ms con pasos de 1 ms, 2991,023 ms con 4801 ciclos y 2994,611 ms con pasos mezclados |
| R3 | Verificado | GPIO de D13 entrega 20,408 mA y USB reporta 70,408 mA. Un pin configurado OUTPUT/LOW recibe corriente desde 5V y su retorno no se cuenta dos veces |
| R4 | Verificado según la decisión de Efraín | 240 mA entregados o recibidos generan `corriente_chip` por VCC o GND. Exactamente 200 mA no exceden el límite; 180 mA por cada lado no se suman entre sí; dos excesos generan dos avisos y en ideal se desactivan |
| R5 | Verificado | HEX correcto aceptado; caso truncado original, bytes excedentes, fin con datos, segmento/lineal con largo incorrecto y tipo desconocido rechazados |
| R6 | Correcciones originales verificadas; pendiente documental | Solo rojo lleva validación medida; los otros cuatro colores quedan pendientes. SG90 distingue <10 mA medidos de 6 mA típicos; ADC dice estimación y MG90S permanece pendiente. La frase 12/12 del LED requiere actualizarse con el criterio nuevo |
| R7 | Verificado en el alcance original | LEEME indica doce recorridos y el comportamiento actualizado de la entrada flotante/KiCad; README enumera las piezas de potencia y el comentario de cuatro servos concuerda con el registro USB posterior |
| R8 | Verificado en TecnoBloques | Ambos scripts originales devuelven 0 normalmente y 1 al inyectar un error JS o un archivo local ausente. La ejecución normal no registra el error de sprites.svg |

R4 se verificó contra la regla acordada: sumas de corriente GPIO por VCC y GND, separadas, a 200 mA. No es una nueva validación física de límites de daño ni de grupos de puertos.

## Comprobaciones ejecutadas

- `npm.cmd run probar` en TecnoCircuito: **611 OK, 0 fallos, 19 grupos**. KiCad 10.0.3 ejecutado; 108 comprobaciones, sin omisión. El build reprodujo los artefactos versionados sin diferencias.
- `node docs/verificar-correcciones-2026-10-11.cjs`: **34 comprobaciones independientes aprobadas**, más una observación separada del criterio nuevo de medida. [Código reproducible](verificar-correcciones-2026-10-11.cjs).
- `node docs/revision-2026-10-11.cjs`: los seis casos iniciales ya muestran los resultados corregidos. Sus notas de texto siguen describiendo el estado defectuoso original; no deben interpretarse como resultados actuales.
- `npm.cmd --prefix ../TecnoBloques run test:simulador`: **37 OK**, sin errores JS, con compilación real y copia local corregida.
- `node ../TecnoBloques/test/graficador.js`: **28 OK**.
- `npm.cmd --prefix ../TecnoBloques test`: **exit 0**, ambos recorridos, sin errores registrados.
- `python -I docs/verificar-r8-2026-10-11.py`: **seis escenarios aprobados**. [Código reproducible](verificar-r8-2026-10-11.py).

| Script original | Normal | Error JavaScript inyectado | Archivo local ausente inyectado |
|---|---:|---:|---:|
| `test/prueba.py` | exit 0 | exit 1, error registrado | exit 1, solicitud fallida registrada |
| `test/prueba_todo.py` | exit 0 | exit 1, error registrado | exit 1, solicitud fallida registrada |

R8 se comprobó sustituyendo `Page.goto` únicamente en el proceso Python que ejecuta cada script original. Tras cargar el HTML se provoca una excepción asíncrona o una imagen inexistente; no se alteraron archivos del hermano ni se borraron recursos. Las aserciones del verificador exigen el exit esperado y la evidencia de captura del error.

Los logs están en `prototipo/pruebas/revalidacion*-2026-10-11.log`; los escenarios R8 en `prototipo/pruebas/capturas/revalidacion-codex-r8/`. Son temporales excluidos de Git. Entorno: mismo Node 24.15.0, Python 3.14.4 y KiCad 10.0.3 de la revisión inicial. No se repitieron mediciones físicas, recompilación de todos los programas ni publicación: los cambios revisados no lo requieren para verificar R1–R8.

## Pendiente que impide un cierre documental completo de R6

Efraín decidió después de las correcciones usar `abs(simulador − medida) / abs(medida)` y expresar la incertidumbre del multímetro aparte. Se confirma que `probar_motor.js`, línea 213, **aún divide por el simulador**. La ficha del LED, README y una línea de validaciones de CLAUDE.md mantienen 12 de 12 dentro del criterio; otra línea de CLAUDE.md ya reconoce 11 de 12 y un caso en el límite.

Recalculando las mismas doce comparaciones sin cambiar datos, modelo ni tolerancias, once cumplen y el voltaje de la resistencia de 215 Ω da **5,00836 % respecto de 2,61 V medidos** con la precisión completa del modelo (aproximadamente 5,01 %). Los 5,02 % anotados anteriormente resultan de usar los 2,741 V redondeados de la tabla. Ambos superan numéricamente el 5 %: queda cerca del límite, pero no debe contarse como aprobado bajo ese umbral sin un criterio adicional acordado. La incertidumbre instrumental todavía no está cuantificada.

**Siguiente acción para Claude:** aplicar el denominador decidido en la prueba y alinear las declaraciones vigentes con ese resultado. Efraín debe completar la evidencia instrumental o repetir la medida que no cierra por 0,13 V; conservar el registro fechado original. No relajar tolerancias ni modificar los datos para que pase la suite. Codex verifica ese cierre después. También permanece pendiente la medición física de ±1 % en tiempos.

## Referencias Nano y alcance de KiCad registrado

Se leyeron los ocho archivos locales. Chromium decodificó los siete AVIF y se guardaron capturas temporales para inspección; los originales quedaron intactos. Nano1/2/6 muestran la roja (incluida la cara posterior y dimensiones anunciadas 58 × 54 mm); Nano7/8 muestran la azul y su cara posterior/perspectiva; Nano3/4 comparan ambas, siendo Nano4 la imagen de mayor detalle (800 × 800). Nano5 es un icono de 48 × 48.

Las fotos permiten reconocer diferencias de disposición y conectores. La publicidad dice funciones similares; no prueba continuidad, identificación exacta de reguladores ni capacidad de las salidas. Se necesitan esas verificaciones para fijar el modelo eléctrico de cada variante.

El encargo guardado en [AGENTS.md](../AGENTS.md) es un conjunto visual Nano + expansión roja/azul. **La exportación del conjunto a KiCad debe representar el módulo Nano, los componentes de regulación/filtrado de 5V y 3,3V, el jack y los conectores adicionales I2C/SPI, con sus redes.** La electrónica interna del Nano queda dentro del módulo. KiCad instalado dispone de `Module:Arduino_Nano` y `Module:Arduino_Nano_WithMountingHoles`; elegir la huella que corresponda al montaje verificado. El resto del circuito conserva sus componentes habituales.

Este encargo quedó registrado para implementación posterior; no se creó aún la tecnoparte ni se modificó el exportador. Las imágenes comerciales siguen excluidas del repositorio.
