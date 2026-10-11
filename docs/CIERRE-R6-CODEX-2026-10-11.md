# Cierre verificado de R6 — 11 de octubre de 2026

Autor: Codex, revisor. Encargo de Efraín: verificar las correcciones posteriores para cerrar R6. Implementación revisada: commit `7424f8a8b8a7f027138d4d63fbbb304da92d3871`; HEAD durante la comprobación `968bdfa5392db40cbe7ce442aa5376cfce0a2f55`. Árbol limpio al comenzar. Los informes anteriores se conservan como historia.

**Resultado: R6 cerrado en su alcance de software y documentación.** La prueba calcula el porcentaje respecto de la medida, informa por separado la aceptación estricta y la aceptación con el margen instrumental acordado, y las declaraciones vigentes coinciden con los resultados. Los colores no medidos siguen pendientes; SG90 y ADC mantienen la distinción entre medida, valor típico y estimación.

## Criterio y contraste instrumental

La regla documentada por Claude y acordada con Efraín es:

```text
error relativo = |simulador − medida| / |medida|
aceptación estricta: diferencia ≤ tolerancia × |medida|
aceptación con margen: diferencia ≤ tolerancia × |medida| + U
U en voltios DC = 0,005 × |lectura| + 2 × 0,01 V
```

Se contrastó la exactitud publicada del UT33B+, ±(0,5 % de la lectura + 2 dígitos), en la [ficha oficial de UNI-T](https://meters.uni-trend.com/product/ut33plus-series/). El fabricante publica selección manual, escala de 20 V y display de 2000 cuentas, compatibles con resolución de 0,01 V en esa escala. Los 20 V son la escala adoptada en la implementación, inferida de las magnitudes y cifras registradas; esta revisión no confirmó en el laboratorio la posición del selector.

Aquí U representa el margen de exactitud publicado que el proyecto decidió incorporar, no una nueva calibración ni una incertidumbre estadística calculada. Para corriente derivada de V/R, el código propaga U del voltaje tratando R como fija; no incluye la exactitud de la resistencia, limitación ya documentada por Claude.

No cambiaron los datos de `validacion/`, las tolerancias del 5 %/10 %, los modelos eléctricos ni los HEX respecto de `6a19f9f`.

| Resultado de las doce comparaciones originales | Recalculado por Codex |
|---|---:|
| Cumplen la tolerancia estricta | 11 de 12 |
| Cumplen con el margen instrumental acordado | 12 de 12 |
| Caso que necesita el margen | Voltaje de resistencia de 215 Ω |
| Medida / modelo en ese caso | 2,61 / 2,7407182026328907 V |
| Error respecto de la medida | 5,008360254 % |
| Diferencia absoluta | 0,130718203 V |
| Límite estricto del 5 % | 0,1305 V |
| U del instrumento adoptada | 0,03305 V |
| Límite con U | 0,16355 V |

La ficha, README, CLAUDE.md y COMO-FUNCIONA ahora distinguen estos resultados; no presentan las doce comparaciones como estrictamente dentro del 5 %/10 %.

## Verificaciones ejecutadas

- `npm.cmd run probar:motor`: **28 OK, 0 fallos**, incluida la regresión que muestra 11/12 y 12/12.
- `npm.cmd run probar:contrato`: **76 OK, 0 fallos**, incluidos color del LED, texto 11/12, SG90 y estimación ADC.
- `npm.cmd run construir`: build reproducible del paquete actual, sin diferencias en sus artefactos versionados.
- `python -I pruebas/probar_biblioteca.py dist/prototipo.html pruebas/capturas`: **27 OK, 0 fallos**, sin errores de consola.
- [Verificador independiente](verificar-cierre-r6-2026-10-11.cjs), ejecutado con `node docs/verificar-cierre-r6-2026-10-11.cjs`: **16 comprobaciones aprobadas**. Extrae y ejecuta los helpers reales de la regresión; prueba un caso que distingue los denominadores, la frontera inclusiva, aceptación/rechazo con margen, conversión A/mA, los datos originales y las fichas.
- Observación adicional en Chromium: **tres comprobaciones aprobadas**. El LED rojo muestra 11/12 y el margen instrumental; cambiarlo a azul cambia su estado a «Por probar con la placa real» y elimina esa declaración de medición; sin errores JS.

Total de esta ejecución: **150 comprobaciones aprobadas** (131 de las pruebas afectadas, 16 independientes y tres del recorrido adicional). Logs de los grupos y del verificador en `prototipo/pruebas/cierre-r6-*-2026-10-11.log`, excluidos de Git. Se seleccionaron las pruebas de las partes modificadas; la revisión anterior conserva la ejecución general y de integración.

## Estado y siguientes prácticas

Con este cierre, R1–R8 de la revisión original quedan verificados. El nuevo contrato de registro de eventos del commit `968bdfa` corresponde a un encargo posterior y no queda validado por esta comprobación de R6.

Permanece como práctica física recomendada repetir la medida de 215 Ω directamente en las patas de la resistencia: el registro inicial no cierra por unos 0,13 V. Confirmar escala/condiciones instrumentales mejoraría su trazabilidad. También siguen pendientes los tiempos físicos ±1 %, la repetición del ADC con el programa corregido y las piezas de T3 ya señaladas. Esos pendientes no se dan por resueltos al cerrar la corrección documental.

Esta entrega añade el verificador y el registro de cierre y actualiza AGENTS.md, CLAUDE.md y BITACORA.md. Sin cambios funcionales, nuevas medidas, commit, push ni etiqueta.
