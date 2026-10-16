# Probador de celdas LiPo con la batería del kit (tarea T3)

- **Fecha:** 15 de octubre de 2026, en la TecnoAcademia Tolima.
- **Quién:** Efraín Mariotte (medida) y Claude (análisis).
- **Instrumento:** UNI-T UT33B+ en voltios DC: ±(0,5 % de la lectura + 2 dígitos); 1 dígito = 0,01 V en la escala de 20 V.
- **Piezas:** probador de celdas 1-8S del kit y la LiPo 2S del kit, por el cable de balance.
- **Ejemplo:** «Validar: probador de celdas LiPo». Hoja original: `2026-10-15-hoja-laboratorio-t3.md`, sección 2.

## La pantalla

| Qué | Simulador antes | Real | Simulador ahora |
|---|---|---|---|
| Al conectar (una sola vez) | — | «2CS» (n.º de celdas) | **«2CS»** |
| Secuencia que se repite | total → «2S» → «-1-» → celda 1 → «-2-» → celda 2 | **«All»** → total → «2S» → «-1-» → celda 1 → «-2-» → celda 2 | igual a la real («ALL»: la «l» minúscula no se distingue en 7 segmentos) |
| Duración de cada cosa | 0,8 s | **1 s** | 1 s |
| Umbral de la alarma, de fábrica | 3,3 V | 3,3 V | sin cambio |
| Umbrales con el botón | 0 (apagada), 2,7 … 3,8 V | igual | sin cambio |

## Las celdas

| Celda | Probador | Multímetro | Diferencia |
|---|---|---|---|
| Celda 1 | 3,86 V | 3,90 V | −1,0 % |
| Celda 2 | 3,70 V | 3,74 V | −1,1 % |
| Total | 7,56 V | 7,64 V | −1,0 % |

El probador marca un 1 % menos que el multímetro, dentro del criterio de ±5 %. El simulador muestra el voltaje exacto de cada celda: la diferencia no se modela.

**La batería del kit estaba en 7,64 V** (3,90 y 3,74 V; 0,16 V de diferencia entre celdas): entre «nominal» (7,4 V) y «llena» (8,4 V). Con este voltaje se comparó el carro (`2026-10-15-carro-l293d.md`).

## Cambios

- `src/piezas/probador_lipo.js`: `pasoMs` 1000; «nCS» al conectarse y «ALL» antes del total; letras A y C en los 7 segmentos.
- `pruebas/probar_potencia.js` (secuencia completa) y `pruebas/probar_probador.py` (ve «ALL» en el navegador).
