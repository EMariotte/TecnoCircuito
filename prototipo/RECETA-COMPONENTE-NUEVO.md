# Receta: crear un componente que no trae ningún simulador

> Escrita el 7 de octubre de 2026, a partir de cómo se hizo la **protoboard** (prototipo 4), que no viene en @wokwi/elements.
> Sirve para lo que viene: la shield L293D, el motor DC, el HC-05, el PCA9685, la matriz MAX7219, el DHT11, el carro y Otto.

## Lo que pasó con la protoboard

@wokwi/elements (MIT) trae los dibujos del Uno, el LED, la resistencia, el potenciómetro, el botón y otros, cada uno con la posición de sus pines. **No trae protoboard.** El simulador de Wokwi sí tiene una, pero no está en ese paquete libre. Fritzing tiene dibujos, pero su licencia (CC BY-SA) no se puede mezclar con Apache 2.0.

Por eso se construyó desde cero, **sin copiar el código ni los dibujos de nadie**, a partir del objeto real: una media protoboard de 400 puntos, con huecos a 0,1", el canal central de 0,3" y los rieles. El resultado es [src/protoboard.js](src/protoboard.js), unas 170 líneas, más su integración en el lienzo.

Un componente de TecnoCircuito tiene **tres partes**: vista, modelo eléctrico y modelo lógico. Algunos no necesitan las tres. La protoboard no tiene modelo lógico: solo une huecos. El botón no tiene dibujo propio: usa el de Wokwi.

## Los 10 pasos

### 1. Mirar el objeto real y su hoja de datos

Antes de escribir código, anota las medidas y el comportamiento.

| Qué anotar | En la protoboard |
|---|---|
| Medidas y distancia entre patas o huecos | Huecos a 0,1" (9,6 px en el lienzo), canal central de 0,3", 30 columnas |
| Qué está unido por dentro | Cada columna une a–e y, aparte, f–j; cada riel, de punta a punta |
| Cómo viene impreso | Letras a–j, números 1–30, rieles con + y − en rojo y azul |
| Cómo se usa en el aula | Las piezas se clavan en los huecos; un chip o un botón cruzan el canal |

**Regla de licencias (regla 3 del proyecto):** las hojas de datos y el objeto real se pueden usar libremente. SimulIDE, Falstad y PICSimLab (GPL) y los dibujos de Fritzing (CC BY-SA) sirven solo para ver ideas, nunca para copiar.

### 2. Decidir los nombres de los pines (es contrato)

Los nombres quedan guardados en los proyectos de los aprendices, así que se eligen una vez y no cambian.

- **Como vienen impresos en la pieza real:** `a1` … `j30`. El aprendiz los encuentra igual en la mesa.
- **Sin puntos,** porque una referencia es `"<id>.<pin>"`. Los rieles quedaron `s+3`, `s-3`, `i+3`, `i-3`.
- **Cada pata física con nombre propio,** aunque dos estén unidas por dentro (como `GND1`, `GND2` y `GND3` en el Uno, o `1i` y `1d` en el botón).
- Se anotan en la tabla de piezas de `CONTRATO.md`, sección 4. La protoboard tiene su propia sección, la 4.0.

### 3. La geometría, en un solo lugar

Una función devuelve cada punto de conexión con su posición en px del dibujo (`huecos()` en la protoboard). Todo sale de ahí: el dibujo, los puntos donde se conectan los cables y el encaje de las patas. Si una medida cambia, cambia en un solo lugar.

- **Usa el paso de 0,1" = 9,6 px** para todo lo que deba calzar en la protoboard o en los pines de la placa.
- Si la pieza tiene patas que van en la protoboard, ponlas a múltiplos de 9,6 px. Los dibujos de Wokwi no siempre lo hacen (el LED tiene las patas a 10 px), y por eso el encaje tolera 3,5 px.

### 4. El dibujo: SVG hecho a mano, solo con atributos

```js
`<svg xmlns="http://www.w3.org/2000/svg" width="307.2" height="185.2" viewBox="0 0 307.2 185.2">
   <rect … fill="#f4f3ee"/>   <rect … (canal central)/>   <line … stroke="#d7263d"/> …   <rect … (cada hueco)/>
 </svg>`
```

- **En px, con `width`, `height` y `viewBox`.** Así el lienzo sabe su tamaño aunque el panel esté oculto.
- **Solo atributos** (`fill`, `stroke`, `font-size`), sin CSS ni variables. Así se ve igual en el lienzo, en la imagen SVG exportada, en Word y en Inkscape.
- **Simple:** el aprendiz tiene que reconocer la pieza, no admirarla. Colores parecidos a los del objeto real y los textos que trae impresos.
- Si la pieza tiene partes que cambian (un LED encendido, un motor que gira), el dibujo debe poder recibir ese estado. Puede ser un elemento propio (como los de Wokwi, hechos con Lit) o una función que redibuje.

### 5. Los puntos de conexión en el lienzo

Cada pin es un cuadrito invisible (`.tc-pin`) con `data-ref="<id>.<pin>"`. Ahí empiezan y terminan los cables, y ahí aparecen el rótulo y el voltaje.

- **Las patas de una pieza** van en la capa de pines, encima de todo, porque siempre se pueden cablear.
- **Los huecos de algo que está debajo de otras piezas,** como la protoboard, van **dentro de su propio dibujo**. Si no, tapan los clics sobre las piezas que tienen encima. Fue el primer error que salió al probarla.
- **El rótulo dice qué es, en palabras del aprendiz:** «Protoboard: hueco b15 · unido por dentro con a15–e15».

### 6. El modelo eléctrico

Qué ve el solucionador (MNA, [src/motor/red.js](src/motor/red.js)). Hay tres tipos de pieza:

| Tipo de pieza | Cómo entra al circuito | Ejemplos |
|---|---|---|
| Une pines sin resistencia | En `calcularNodos()` ([src/conexiones.js](src/conexiones.js)): se unen sus pines en un mismo nodo | Protoboard (tiras), botón (patas internas y al presionar) |
| Se comporta como resistencias y fuentes | En `armarRed()`: resistencias, fuentes con resistencia interna, fuentes de voltaje | Resistencia, potenciómetro, pin del chip |
| No lineal | Un elemento con `sellar()` y `actualizar()` para Newton-Raphson | LED (diodo de Shockley); más adelante el L293D y el motor |

Cada valor del modelo sale de la hoja de datos y **se valida con el multímetro** (paso 10).

### 7. El modelo lógico (si habla con el programa)

Si la pieza se comunica por un protocolo (DHT11, HC-SR04, LCD por I2C, servo), el núcleo la atiende con avr8js, en el Worker:

- **Entradas y salidas digitales:** `setPin()`, como el botón (`actualizarEntradas()` en [src/nucleo.js](src/nucleo.js)).
- **Analógicas:** el lector del ADC, como el potenciómetro.
- **Protocolos:** USART, TWI (I2C) y SPI de avr8js, o mirando el tiempo exacto de cada cambio de pin, como el promedio del PWM.

La protoboard no tiene modelo lógico. El servo, el DHT11 y la LCD sí lo tendrán.

### 8. Lo que el aprendiz puede hacer con la pieza

Hay que decidir cómo se agrega, se mueve, se gira y se borra, y si tiene algo propio. La protoboard tuvo varias cosas propias:

- **encajar las patas** al soltar una pieza, con la función pura `encajar()`, que se prueba sola;
- **vista previa en verde** mientras se arrastra;
- **tira iluminada** al pasar el mouse;
- **las piezas encajadas se mueven con ella;**
- **borrarla** deja las piezas sueltas.

Cada interacción nueva tiene que respetar las reglas del lienzo:

- **la vista no salta bajo el mouse:** la barra tiene altura fija y el re-encuadre solo actúa con cambios de tamaño grandes;
- **las teclas no salen del lienzo,** para no tocar Blockly;
- **cada cambio emite su evento** (`componente_cambiado` con su `en`).

### 9. Las pruebas

| Dónde | Qué probar | En la protoboard |
|---|---|---|
| Node, sin navegador | La física y la lógica | El LED en la protoboard da los mismos 12,50 mA que con cables; con la resistencia al otro lado del canal no pasa corriente (`probar_motor.js`) |
| Chromium, con clics reales | Lo que hace el aprendiz | 21 comprobaciones: tiras, encaje, vista previa, hueco ocupado, girar, mover, borrar, el botón funcionando a través de ella y la imagen SVG (`probar_protoboard.py`) |
| A ojo | Que se vea bien | Capturas en `pruebas/capturas/` |

Agrega la prueba nueva a `npm run probar`, y un ejemplo armado a la página de prueba («Ejemplo en protoboard (T1)»).

### 10. Validar con la placa real (regla 2)

Ningún componente se da por terminado sin compararlo con el objeto real:

- **multímetro** para voltajes y corrientes, con ±5 % y ±10 %;
- **analizador lógico** para tiempos y protocolos, con ±1 %;
- **monitor serial** para el comportamiento.

Las medidas van a `validacion/` y se vuelven pruebas de regresión. La protoboard es solo conexiones (un cable ideal), así que se valida con aprendices: que puedan armar la T1 en ella sin ayuda.

## Lista rápida

```
□ 1. Objeto real y hoja de datos anotados (medidas, qué une por dentro, cómo viene impreso)
□ 2. Nombres de pines elegidos y escritos en CONTRATO.md (sección 4)
□ 3. Geometría en una sola función (paso de 9,6 px si va en la protoboard)
□ 4. Dibujo SVG en px, solo con atributos, sin copiar dibujos ajenos
□ 5. Puntos de conexión en la capa correcta, con rótulo en palabras del aprendiz
□ 6. Modelo eléctrico (unir nodos, resistencias y fuentes, o no lineal)
□ 7. Modelo lógico, si habla con el programa (setPin, ADC, USART, TWI, SPI, tiempos)
□ 8. Interacción (agregar, mover, girar, borrar y lo propio de la pieza) con sus eventos
□ 9. Pruebas con Node y con Chromium, en npm run probar, más un ejemplo en la página
□ 10. Validación con la placa real; medidas a validacion/
```
