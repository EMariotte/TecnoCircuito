# Validación con multímetro · LED rojo en el pin 13

> 7 de octubre de 2026 · Medido por Efraín en la placa real · Datos en [`led-rojo-multimetro.json`](led-rojo-multimetro.json), que usa `npm run probar:motor` como prueba de regresión.

**Montaje:** pin 13 en ALTO → resistencia → LED rojo → GND. El simulador se calculó con la resistencia **medida** (215 y 326 Ω; la de 1 kΩ no se midió y se tomó la nominal).

**Criterio del proyecto:** ±5 % en voltaje y ±10 % en corriente.

| Resistencia | Pin 13: real / simulador | LED: real / simulador | Resistencia: real / simulador | Corriente: real* / simulador |
|---|---|---|---|---|
| 220 Ω (215 medido) | 4,69 / 4,681 V (+0,2 %) | 1,95 / 1,941 V (+0,5 %) | 2,61 / 2,741 V (−4,8 %) | 12,14 / 12,75 mA (−4,8 %) |
| 330 Ω (326 medido) | 4,78 / 4,779 V (0,0 %) | 1,93 / 1,902 V (+1,5 %) | 2,87 / 2,877 V (−0,3 %) | 8,80 / 8,83 mA (−0,3 %) |
| 1 kΩ | 4,96 / 4,922 V (+0,8 %) | 1,86 / 1,820 V (+2,2 %) | 3,10 / 3,103 V (−0,1 %) | 3,10 / 3,10 mA (−0,1 %) |

\* La corriente real se calculó como voltaje de la resistencia ÷ resistencia medida. No se midió con el multímetro en serie.

## Resultado

**Las 12 comparaciones cumplen el criterio. El modelo queda validado y no se ajusta.**

## Observaciones

- **El caso de 220 Ω no cierra en la placa:** el pin menos el LED da 4,69 − 1,95 = 2,74 V, pero en la resistencia se midieron 2,61 V. Faltan 0,13 V, que deben estar en los contactos de la protoboard o los cables (unos 11 Ω a 12 mA), o en el momento de la medida. El simulador da 2,741 V, justo el valor que cierra. Por eso esa fila queda en −4,8 %, cerca del borde.
- **El LED real baja un poco menos con poca corriente:** con 1 kΩ, el simulador da 0,04 V menos que la placa (+2,2 %). Está dentro del criterio. Si se repite con otros LED rojos, se puede afinar la curva (`LED.n` o `LED.rs` en `prototipo/src/motor/red.js`).
- **El pin del chip** coincide en los tres casos (máximo 0,8 %): el modelo de 25 Ω en ALTO sirve.

## Para una próxima medida

- Medir la corriente con el multímetro en serie, en vez de calcularla.
- En el caso de 220 Ω, medir el voltaje directo en las patas de la resistencia, para confirmar la caída en los contactos.
- Medir la resistencia de 1 kΩ.
