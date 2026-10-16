# Marca TecnoCircuito

![Logo horizontal](png/logo-horizontal.png)

## La idea

**El mismo robot de TecnoBloques, pero ahora es un chip sobre su circuito.** En TecnoBloques los bloques se vuelven un robot; en TecnoCircuito ese robot se conecta a un circuito real y el programa lo hace funcionar.

| Elemento | Qué dice |
|---|---|
| Dos bloques que encajan (pestaña y muesca) | **Familia TecnoBloques**: el programa de bloques encaja con el circuito |
| Cabeza con patas a los lados | **El chip**: el microcontrolador que ejecuta el programa, sea cual sea la tarjeta |
| Ojo LED | **La salida**: lo que el circuito muestra |
| Ojo pulso (onda cuadrada) | **La señal**: lo que el chip manda por sus pines |
| Pista: vía, resistencia, LED, vía | **El circuito** que arma el aprendiz (la tarea T1) |
| Antena en forma de T | **TecnoAcademia** (la misma de TecnoBloques) |

Las dos marcas son hermanas: misma cuadrícula, mismos bloques redondeados, misma antena y mismos colores. Se distinguen a simple vista por las patas del chip y por la pista de circuito en lugar del `</>`.

## Colores

Los mismos de TecnoBloques (paleta institucional SENA).

| Color | Código | Uso |
|---|---|---|
| Verde SENA | `#39A900` | Cabeza (chip), palabra «Circuito» |
| Azul SENA | `#00304D` | Fondo del ícono, ojos y pista, palabra «Tecno» |
| Blanco | `#FFFFFF` | Cuerpo sobre fondos oscuros |
| Verde claro | `#5fd12a` | «Circuito» sobre fondo oscuro |

Antes de imprimir material oficial, confírmalos con el manual de identidad del SENA.

## Tipografía

**Atkinson Hyperlegible**, en negrita para el nombre (libre, licencia OFL; copia en `fuentes/`). El nombre se escribe junto: **Tecno** (azul o blanco) + **Circuito** (verde). Debajo, la línea de respaldo **TecnoAcademia Tolima · SENA**. En los SVG el texto ya es trazado: se ven igual sin tener la fuente instalada.

## Archivos

| Archivo | Para qué |
|---|---|
| `svg/simbolo-app.svg` | **Logo cuadrado** (símbolo sobre fondo azul). App, web, materiales |
| `svg/simbolo-cabeza.svg` | Solo el chip, para 16–24 px (pestaña del navegador) |
| `svg/simbolo-sobre-claro.svg` / `simbolo-sobre-oscuro.svg` | Símbolo sin fondo, según el fondo donde va |
| `svg/una-tinta-azul.svg` / `una-tinta-blanca.svg` | Una sola tinta: stickers, grabado láser, impresión económica |
| `svg/logo-horizontal.svg` / `logo-horizontal-oscuro.svg` | **Banner horizontal**: símbolo + nombre, para fondos claros / oscuros |
| `png/icono-<tamaño>.png` | 16 a 1024 px (16 y 24 usan solo el chip) |
| `png/logo-horizontal.png` / `logo-horizontal-oscuro.png` | Banner horizontal en PNG (el del README) |
| `png/compartir.png` | 1200 × 630, para compartir enlaces y la vista previa de GitHub |

**Todo sale de `generar.py`.** Para cambiar la marca se edita ese archivo y se corre `python marca/generar.py` (necesita `playwright` con Chromium, `uharfbuzz` y `fonttools`).

**En el README:**

```html
<p align="center"><img src="marca/png/logo-horizontal.png" alt="TecnoCircuito" width="420"></p>
```

En GitHub, la imagen de vista previa se sube en Settings → Social preview con `png/compartir.png`.

## Reglas de uso

- Deja alrededor del símbolo un espacio libre de al menos la altura de la antena.
- Tamaño mínimo: el símbolo completo desde 32 px; por debajo, usa el chip solo.
- No cambies los colores, no estires el dibujo, no le agregues sombras ni contornos, y no pongas el símbolo verde-azul sobre fondos verdes (usa la versión de una tinta).
- El logo del SENA no se mezcla dentro del símbolo. Si una pieza lleva ambos, van separados según el manual del SENA.
- Si TecnoCircuito aparece junto a TecnoBloques, se muestran del mismo tamaño y con el mismo espacio entre ellos.
