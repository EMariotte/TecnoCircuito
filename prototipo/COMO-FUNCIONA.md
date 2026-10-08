# Cómo funciona el prototipo 0

> Explicación del lienzo de cableado: qué hace cada archivo, cómo se arma y cómo se ejecuta.
> Escrita el 7 de octubre de 2026. Los números de línea de `src/lienzo.js` están al día con el prototipo 4.

## 1. Vista general

Hay dos momentos: cuando se **construye** el archivo y cuando **corre** en el navegador.

```
CONSTRUCCIÓN  (npm run construir → construir.js)
┌──────────────────┐
│ src/index.js     │──┐
│ src/lienzo.js    │  │   esbuild junta todo,        ┌─────────────────────────┐   se mete en    ┌──────────────────────┐
│ src/lienzo.css   │  ├─► lo minimiza y lo envuelve ─►│ dist/tecnocircuito.js   │─► pagina.html ─►│ dist/prototipo.html  │
│ src/catalogo.js  │  │   en un IIFE                  │ 69 KB: código + Lit     │   (<script>)    │ un archivo, sin red  │
│ 3 dibujos wokwi  │──┘                               │ + 3 dibujos             │                 └──────────────────────┘
└──────────────────┘                                  └─────────────────────────┘

EJECUCIÓN
┌──────────────────────────────┐   crearLienzo(elemento, {placa, circuito, alEvento})   ┌───────────────────────────────┐
│ pagina.html (banco de prueba)│ ──────────────────────────────────────────────────────► │ LIENZO                        │
│  · localStorage  ◄─ guardar  │ ◄───────── alCambiar(circuito completo) ─────────────── │  datos ......... la verdad    │
│  · panel JSON    ◄─ mostrar  │ ◄───────── alEvento({t, origen, tipo, datos}) ──────── │  dibujo ........ se deriva    │
│  · lista eventos ◄─ anotar   │                                                         │  interacción ... puntero/tecla│
└──────────────────────────────┘                                                         └───────────────────────────────┘
        En TecnoBloques, este papel lo hará app.js (guardar en el .tbq.json y escribir el registro .jsonl)
```

| Archivo | Qué hace |
|---|---|
| [src/index.js](src/index.js) | Define `window.TecnoCircuito` con `VERSION`, `CONTRATO`, `PLACAS` y `crearLienzo`. Es lo único que se ve desde afuera. |
| [src/catalogo.js](src/catalogo.js) | Solo datos de las piezas: qué dibujo de wokwi usa cada una, cómo se traducen sus pines al contrato (`'GND.1'` → `GND1`, `'A'` → `anodo`), el texto de cada rótulo, las propiedades por defecto, el campo que se edita en la barra y `aplicar()`, que pasa las propiedades al dibujo. |
| [src/lienzo.js](src/lienzo.js) | Todo el comportamiento. |
| [src/lienzo.css](src/lienzo.css) | La apariencia, con colores definidos para el tema claro y el oscuro. |

Agregar una pieza nueva es, en buena parte, agregar una entrada en `catalogo.js`.

## 2. La regla central: los datos mandan y el dibujo se deriva

```
 acción del aprendiz ──► cambia `datos` ──┬──► redibuja:  ubicar() · dibujarCables() · pintarBarra()
                                          └──► avisa:     emitir(evento)  y  cambio() → alCambiar
```

`datos` es exactamente el JSON del contrato: `formato`, `placa`, `componentes`, `cables` y `protoboard`. El lienzo nunca lee el estado desde el dibujo. Si algo se ve mal, el problema está en cómo se dibuja, no en lo que se guarda. Por eso guardar y volver a abrir siempre da lo mismo.

## 3. Las capas de la página

```
elemento que entrega TecnoBloques
└─ div.tecnocircuito ═══ shadow DOM: el CSS de afuera no entra y el de adentro no sale
   └─ .tc
      ├─ .tc-barra   [+ LED] [+ Resistencia] │ opciones de lo elegido │ [−] [Ver todo] [+]
      └─ .tc-area    recibe TODOS los eventos del puntero; fondo de puntos cada 0,1"
         ├─ .tc-mundo ◄── una sola transformación:  translate(px, py)  scale(escala)
         │   ├─ capa 1  .tc-capa-comp    dibujos wokwi: placa, r1, led1      (abajo)
         │   ├─ capa 2  <svg>            ├ .tc-cables  un <g> por cable
         │   │                           ├ .tc-asas    dobleces del cable elegido
         │   │                           └ .tc-previa  el cable a medio dibujar
         │   └─ capa 3  .tc-capa-pines   un cuadrito invisible de 9 px por pin (arriba)
         ├─ .tc-tip     rótulo del pin («Pin 13»)
         └─ .tc-ayuda   línea de ayuda de abajo
```

- **Los pines van encima de todo,** para que un pin siempre gane el clic, aunque ya tenga un cable llegando.
- **Los dobleces tienen capa propia,** porque si no, un cable dibujado después los tapa y no se pueden agarrar.
- **Zoom y desplazamiento son una sola transformación** sobre `.tc-mundo`, así que dibujos, cables y pines se mueven juntos.
- **El SVG de cables mide 10.000 × 10.000 px** y empieza en (−5000, −5000). Así cualquier cable recibe clics, incluso a la izquierda o arriba de la placa.
- **Cada dibujo va dentro de un contenedor con `display: flex`.** Con `display: block`, el SVG queda dentro de una línea de texto y baja unos píxeles: era el desfase de la resistencia.

## 4. Coordenadas

Hay dos sistemas de coordenadas:

- **El mundo** es el del contrato: píxeles del dibujo a escala 1, con la placa en (0, 0). 0,1 pulgadas son 9,6 px. Todo lo guardado está en mundo.
- **La pantalla** son los píxeles que se ven.

```
pantalla = cámara.p + mundo × cámara.escala          aMundo(e):  mundo = (pantalla − cámara.p) / escala
```

- **Zoom** ([zoom](src/lienzo.js#L1052)): calcula qué punto del mundo está bajo el cursor, cambia la escala y recoloca la cámara para que ese punto siga bajo el cursor.
- **Ver todo** ([encuadrar](src/lienzo.js#L1090)): calcula la caja que rodea todas las piezas y los dobleces y la centra, sin pasar de 2,4×.
- **Giro de una pieza:** CSS la gira alrededor de su centro, y [girarPunto](src/lienzo.js#L330) hace la misma cuenta para saber dónde quedó cada pin:

```
centro c = (w/2, h/2)     d = pin − c     pin girado = c + ( d.x·cosθ − d.y·senθ ,  d.x·senθ + d.y·cosθ )
```

Para que esa cuenta coincida con lo que hace CSS, cada pieza recibe un ancho y un alto exactos, iguales al tamaño de su dibujo.

## 5. Arranque

```
crearLienzo(elemento, opciones)
 1. normalizar(circuito) ......... copia el circuito, completa lo que falte y conserva campos y piezas desconocidas
 2. arma el shadow DOM y engancha los eventos
 3. crearVista() por la placa y por cada pieza  ── en paralelo, cada una asíncrona:
       crea <wokwi-led> ─► espera updateComplete (Lit terminó de dibujar)
       ─► tamaño natural leído del SVG (width="15.645mm" → 59,1 px)
       ─► lee pinInfo ─► crea un .tc-pin por pin, con el nombre del contrato ─► ubicar()
 4. Promise.all(...) ─► dibujarCables() ─► encuadrar()
 5. ResizeObserver: si el lienzo nació oculto, encuadra la primera vez que tenga tamaño
```

El tamaño se lee de los atributos del SVG y no del diseño de la página. En TecnoBloques el panel puede nacer oculto, y en ese caso el diseño mide 0. Una pieza de tipo desconocido se muestra como un recuadro «¿servo?», y sus datos se guardan intactos.

## 6. Interacción: tres variables de estado

| Variable | Qué guarda | Cuánto dura |
|---|---|---|
| `sel` | lo elegido: una pieza o un cable | hasta elegir otra cosa |
| `trazando` | el cable a medio dibujar: pin de salida, dobleces, cursor y destino | entre varios clics |
| `gesto` | lo que hace el puntero mientras está presionado: `pin`, `mover`, `paneo` o `asa` | solo mientras el botón está abajo |

Al presionar ([pointerdown](src/lienzo.js#L724)), el lienzo decide en este orden:

```
¿es un pin? ───────────► ¿dibujando?  sí → terminarCable(pin)
                                       no → empezarCable(pin) + gesto 'pin' (por si arrastra)
¿dibujando? ───────────► gesto 'paneo' con punto: si no arrastra, al soltar agrega un doblez
¿es un doblez? ────────► gesto 'asa' (arrastrar el doblez)
¿es un cable? ─────────► seleccionar ese cable
¿es una pieza (no la placa)? ► seleccionar + gesto 'mover'
si no (fondo o placa) ─► quitar la selección + gesto 'paneo' (mover la vista)
```

- **Al mover** ([pointermove](src/lienzo.js#L882)), el puntero no cuenta como arrastre hasta pasar de 4 px. Así se distingue un clic de un arrastre.
- **Al soltar** ([alSoltar](src/lienzo.js#L933)), se cierra el gesto: guardar la posición, agregar un doblez o terminar un cable arrastrado.
- **Los gestos de arrastre capturan el puntero** (`setPointerCapture`), para que no se pierdan si el mouse sale de la pieza.
- **Esa captura también desvía el doble clic,** y por eso [dblclick](src/lienzo.js#L971) busca con `elementFromPoint` qué hay de verdad bajo el puntero.

## 7. El ciclo de un cable

```
 [reposo] ──clic en un pin──► [dibujando] ◄────────────────────────┐
     ▲                          │ clic en el fondo → agregarPunto() │ (con imán)
     │                          ├───────────────────────────────────┘
     │                          ├─ Supr → quita el último doblez
     │                          ├─ Esc, o clic en el mismo pin ──► [reposo]  (cancelado)
     │                          └─ clic en otro pin (o soltar el arrastre encima)
     │                                    ▼
     │                      terminarCable():
     │                        1. ajustarFinal: endereza el último tramo
     │                        2. ¿esos pines ya están unidos? → aviso y fin
     │                        3. color por convención: GND → negro · 5V/3V3/VIN → rojo · otro → verde
     │                        4. datos.cables.push(...)
     └─── cable queda elegido ◄ 5. emitir('cable_agregado') + cambio()
```

El imán actúa en dos momentos:

- **Al agregar un doblez** ([alinear](src/lienzo.js#L462)): si queda a menos de 8 px de pantalla del punto anterior en x o en y, se iguala esa coordenada. Así salen tramos perfectamente rectos.
- **Al llegar al pin final** ([ajustarFinal](src/lienzo.js#L471)): el último doblez se alinea con el pin. Solo se mueve en el eje que no rompe el tramo anterior. Por eso el cable D13 → resistencia queda como una «L» exacta aunque el clic caiga 3 px corrido.

## 8. Cómo se dibuja un cable

```
puntosDe(cable) = [ posición(de), …puntos, posición(a) ]       posición = pin del catálogo + lugar + giro
        │
trazo(): M p0  L … Q esquina …  L pN      tramos rectos con esquinas redondeadas (radio ≤ 5)
        │
un <g> por cable, de abajo hacia arriba:
   borde  (oscuro, 4,8)   ─ contorno, para que se vea sobre cualquier fondo (incluido el cable blanco)
   línea  (color, 3)      ─ el cable
   2 puntas (círculos)    ─ los extremos
   toque  (invisible, 12) ─ zona ancha para atinarle con el clic
```

[dibujarCables](src/lienzo.js#L381) sincroniza los elementos en vez de borrarlos y crearlos de nuevo: solo cambia sus atributos `d`, el color y la clase. Si se reemplazaran entre el primer y el segundo clic, el navegador no reconocería el doble clic. El cable elegido pasa al frente, y sus dobleces van a la capa `.tc-asas`.

## 9. Eventos y cambios

| Acción | Evento (`alEvento`) | `alCambiar` |
|---|---|---|
| terminar un cable | `cable_agregado {de, a}` | sí |
| borrar un cable | `cable_quitado {de, a}` | sí |
| agregar una pieza | `componente_agregado {id, tipo}` | sí |
| borrar una pieza | un `cable_quitado` por cada cable suyo, y después `componente_quitado` | sí |
| soltar una pieza arrastrada | `componente_cambiado {id, x, y}` (uno solo, no uno por movimiento) | sí |
| girar o cambiar una propiedad | `componente_cambiado {id, rot}` o `{id, props}` | sí |
| color o dobleces de un cable | ninguno (sigue abierto) | sí |
| «Ver encendido» | ninguno: solo cambia el dibujo | no |

Si el código que escucha falla, el `try/catch` de [emitir](src/lienzo.js#L1252) y [cambio](src/lienzo.js#L1261) evita que se rompa el lienzo. El contrato lo exige: el editor nunca se cae por el simulador.

## 10. La construcción ([construir.js](construir.js))

1. **esbuild parte de `index.js`** y sigue los `import`. Importa solo los tres dibujos que se usan (`arduino-uno-element.js` y los otros dos), no el índice con los 40. Por eso el paquete pesa 69 KB.
2. **El CSS entra como texto** (`loader: text`) y el lienzo lo pone dentro del shadow DOM.
3. **Formato `iife`, minimizado** y con `legalComments: 'eof'`, para que los avisos de licencia de Lit (BSD-3) queden al final del archivo.
4. **Revisión de seguridad:** si el paquete trae `<!--` y `<script` a la vez, se detiene, porque el HTML no cerraría bien el `<script>`. Hoy solo trae `<!--` de los comentarios del dibujo del Uno, y eso es inofensivo.
5. **Escapa `</script`** igual que `build.js` de TecnoBloques. El paquete se inserta con una función y no con un texto de reemplazo, porque el código minimizado contiene `$&`, y `replace()` lo interpretaría.

## 11. Las pruebas

`npm run probar` corre los dos scripts de [pruebas/](pruebas/) con Playwright. Abren `prototipo.html` en Chromium y hacen lo mismo que una persona: clics, arrastres, teclas y rueda. Después leen `lienzo.circuito()` y los eventos para comprobar el resultado. Son 41 comprobaciones, más capturas de pantalla en tema claro, en tema oscuro y en un celular, que se guardan en `pruebas/capturas/`.

---

# Prototipo 1: el chip y el reloj

> Agregado el 7 de octubre de 2026. Archivos nuevos: [src/chip.js](src/chip.js), [src/conexiones.js](src/conexiones.js) y [src/simulador.js](src/simulador.js).

## 12. Dos simulaciones distintas

```
  programas/parpadeo13.ino ─► arduino-cli (npm run compilar) ─► parpadeo13.hex ─► dentro de la página
                                                                                        │
 ┌──────────────────────────────┐  pin cambió   ┌──────────────────────────┐  prende/apaga  ┌───────────┐
 │ CHIP · chip.js (avr8js)      │ ────────────► │ REGLA · conexiones.js    │ ─────────────► │ lienzo    │
 │ CPU + puertos B, C, D        │  D13 = ALTO   │ ¿ánodo en un nodo ALTO y │  _mostrar()    │ (dibujos) │
 │ + temporizadores 0, 1 y 2    │               │  cátodo en un nodo BAJO? │                └───────────┘
 │ + USART (monitor serial)     │ ── bytes ──► monitor serial                                    ▲
 └──────────────────────────────┘                                    el aprendiz recablea ─────────┘
        lógico y exacto al ciclo                 topología, sin física           (alCambiar → se evalúa otra vez)
```

- **El chip es lógico:** avr8js ejecuta cada instrucción del ATmega328P. `digitalWrite(13, HIGH)` escribe un 1 en el bit 5 de `PORTB`, y avr8js avisa. No hacen falta ecuaciones, porque es información digital.
- **El circuito es eléctrico,** y eso queda para el prototipo 2 (MNA). Por ahora una **regla de conexiones** decide si cada LED prende.

## 13. El chip ([src/chip.js](src/chip.js))

1. **`leerHex()`** lee el Intel HEX línea por línea. Revisa la suma de verificación de cada línea, que el programa quepa en los 32 KB y que esté la línea final, y llena la memoria de programa.
2. **`crearChip()`** arma la CPU con los periféricos que usa un programa de Arduino:
   - los temporizadores 0, 1 y 2, porque `millis()`, `delay()` y el PWM dependen de ellos;
   - los puertos B, C y D, con la tabla que dice qué bit es cada pin (`PORTB` bit 5 = D13);
   - la USART, que es el monitor serial.
3. **Avisos:** avr8js llama a un oyente cada vez que el programa escribe en un puerto. `chip.js` compara con el estado anterior y avisa solo los pines que cambiaron de verdad.
4. **`correr(ciclos)`** ejecuta `avrInstruction` y `cpu.tick` en tajadas de 1 ms simulado (16.000 ciclos). Entre tajada y tajada entrega un byte pendiente del serial, al ritmo de 9600 baudios.

`chip.js` no toca la página, así que corre igual en Node: `npm run medir` lo usa sin navegador.

## 14. La regla de conexiones ([src/conexiones.js](src/conexiones.js))

```
1. nodos:  se unen los pines de cada cable, los puentes internos de la placa
           (GND1=GND2=GND3, A4=SDA, A5=SCL) y las dos patas de cada resistencia
2. ALTO:   nodos con 5V, 3V3, VIN o un pin de salida en ALTO
   BAJO:   nodos con GND o un pin de salida en BAJO
3. LED:    prende si ánodo ∈ ALTO, cátodo ∈ BAJO y no hay corto ni patas unidas
```

Cuando un LED no prende, la regla dice por qué: «está al revés», «el cátodo no llega a GND», etc. La regla no sabe nada de corrientes. Por eso un LED sin resistencia prende sin quemarse, y con 220 Ω o con 10 kΩ brilla igual. Eso lo resuelve el prototipo 2.

## 15. El reloj común ([src/simulador.js](src/simulador.js))

> Desde el prototipo 3, este reloj vive en el Web Worker y cambió un poco: ver la sección 27.

```
cada cuadro de pantalla (≈16,7 ms):
   ms reales desde el cuadro anterior (máximo 50 ms, por si la pestaña se durmió)
   meta = ciclos + ms × 16.000
   mientras no llegue a la meta y no pasen 12 ms de cálculo:  chip.correr(1 ms)
   velocidad = ciclos hechos / ciclos pedidos
   entrega el texto del serial
   si algún pin cambió (o se recableó): evalúa la regla UNA vez y actualiza los LED
```

**El circuito solo se resuelve cuando hace falta.** Un cambio de pin solo marca `pendiente`. Al final del cuadro se evalúa una vez, aunque hayan cambiado varios pines. Los nodos (`calcularNodos`) se calculan una vez y solo se rehacen cuando el aprendiz cambia el cableado. Con el parpadeo, el circuito se evalúa unas 8 veces en 3,3 s, en vez de unas 197 (una por cuadro).

- **El tiempo simulado sigue al tiempo real,** así que `delay(500)` dura medio segundo en la pantalla.
- **Si el PC no alcanza,** la simulación va más lenta en vez de congelar la página, y la velocidad baja de 100 %.
- **En la pantalla,** cada cambio puede verse hasta un cuadro tarde (16,7 ms). **Dentro del chip** el tiempo es exacto al ciclo: eso es lo que se compara con el analizador lógico.

## 16. La API del simulador

`crearSimulador({lienzo, placa, hex, modo, alEvento})` devuelve `iniciar`, `pausar`, `reiniciar`, `detener`, `serialEnviar`, `alSerial`, `alFalla` y `alEstado`, como dice el contrato. Además trae dos funciones que solo existen en el prototipo:

- **`_medidas()`** devuelve el tiempo simulado, el tiempo real y la velocidad.
- **`_destruir()`** detiene la simulación y la desconecta del lienzo.

El simulador muestra lo que pasa por `lienzo._mostrar()`, que solo cambia el dibujo y nunca los datos del circuito. Los eventos `simulacion_iniciada` y `simulacion_detenida` salen con `origen: 'simulador'`.

## 17. Lo que midió el prototipo 1

| Medida | Resultado |
|---|---|
| Período del parpadeo, en el chip (Node) | 1000,171 ms para un programa de 1000 ms: error de 0,017 % (los 0,17 ms son el tiempo real de `Serial.println` y `digitalWrite`) |
| Período en la pantalla (Chromium) | 492 ms en promedio para 500 ms; cada cambio varía hasta un cuadro (±16 ms) |
| Velocidad en el navegador | 100 % |
| **Margen del chip en este PC** | **1,7 veces más rápido que el chip real**, en Node y sin nada más |

---

# Prototipo 2: el circuito eléctrico

> Agregado el 7 de octubre de 2026. Archivos nuevos: [src/motor/mna.js](src/motor/mna.js) (el solucionador) y [src/motor/red.js](src/motor/red.js) (circuito → red eléctrica, mediciones y fallas). La regla de conexiones del prototipo 1 se retiró: [src/conexiones.js](src/conexiones.js) solo agrupa los pines en nodos.

## 18. Del dibujo a las ecuaciones

```
circuito del contrato  +  estado de los pines del chip
        │
        ▼
calcularNodos ── los cables unen pines; cada grupo es un NODO (GND es la referencia, 0 V)
        │
        ▼
armarRed (red.js) ── cada pieza se vuelve un elemento eléctrico entre dos nodos:

   pin del chip   ─[ 25 Ω ]─(+5 V)     ALTO: 5 V detrás de 25 Ω · BAJO: 0 V detrás de 22 Ω
                                       entrada: abierto · entrada con pull-up: 5 V detrás de 35 kΩ
   5V y 3V3       fuente de voltaje ideal
   resistencia    ─[ R ]─
   LED            ánodo ─[ 5 Ω ]─ unión ─|>|─ cátodo     (diodo de Shockley; un LED quemado no se agrega)
        │
        ▼
resolver (mna.js) ── arma A·x = b y lo resuelve con Newton-Raphson
        │
        ▼
medición ── voltaje de cada pin · corriente de cada pieza · brillo · fallas
```

## 19. El análisis nodal modificado

Cada nodo tiene una incógnita: su voltaje. Cada fuente de voltaje ideal suma otra: la corriente que entrega. Por cada nodo se escribe la ley de corrientes de Kirchhoff (lo que sale = lo que entra). Así queda un sistema **A·x = b**:

```
        ┌                      ┐ ┌    ┐   ┌                        ┐
        │ conductancias  │  1  │ │ V1 │   │ corrientes inyectadas  │
   A =  │ (1/R) entre    │ ... │ │ V2 │ = │ (fuentes de los pines) │
        │ nodos          │     │ │ …  │   │                        │
        │────────────────┼─────│ │────│   │────────────────────────│
        │ 1 …            │  0  │ │ I5V│   │ 5                      │  ← la fila de la fuente de 5 V
        └                      ┘ └    ┘   └                        ┘
```

Cada pieza «sella» (estampa) su parte en A y b:

- **Una resistencia** entre a y b suma 1/R en `A[a][a]` y `A[b][b]`, y resta 1/R en `A[a][b]` y `A[b][a]`.
- **Un pin** es una resistencia a tierra más una corriente inyectada V/R. Es el equivalente de Norton: es más simple que una fuente ideal y es más fiel, porque un pin real cae de voltaje cuando entrega corriente.
- **Además, cada nodo lleva una conductancia diminuta a tierra** (10⁻¹² S, como el «gmin» de SPICE). Así, un nodo al aire, como un LED con una pata suelta, no deja la matriz sin solución.

El sistema se resuelve con **eliminación de Gauss con pivoteo parcial**. Las redes del aula tienen pocas decenas de nodos, y una matriz de ese tamaño se resuelve en microsegundos.

## 20. Newton-Raphson para el LED

La resistencia es lineal (V = I·R), pero el LED no: su corriente crece de forma exponencial con el voltaje (ecuación de Shockley).

```
I = Is · (e^(V / (n·VT)) − 1)          VT = 25,7 mV a 25 °C,  n = 2
```

No se puede despejar de una vez. Newton-Raphson lo resuelve por aproximaciones:

```
1. supone un voltaje para el LED (al principio 0 V, después el de la última solución)
2. reemplaza la curva por su recta tangente en ese punto:  I ≈ g·V + ieq
   (g es una conductancia y ieq una corriente: los dos se sellan como si fueran lineales)
3. resuelve A·x = b
4. lee el voltaje nuevo del LED. ¿Se movió menos de 1 nV?  sí → listo
                                                         no → vuelve a 2 con ese voltaje
```

**Por qué no se dispara.** Si de una vuelta a la otra el voltaje salta de 0 a 3 V, e^(3/0,05) da 10²⁶ y los números se desbordan. `limitarUnion` deja que el voltaje suba poco a poco cuando pasa del codo de la curva. Es la misma técnica de SPICE (pnjlim). Con eso converge en todos los casos probados (5 colores × 12 resistencias, de 0 Ω a 1 MΩ), en 21 vueltas como máximo.

**Por qué es rápido.** El LED guarda su último voltaje, así que la siguiente solución arranca cerca. Además, el simulador guarda la solución de cada combinación de pines (el parpadeo solo tiene dos). En la práctica casi no se resuelve nada: se reutiliza.

| | Tiempo por solución (Node, PC de Efraín) |
|---|---|
| arrancando de la solución anterior | ≈ 7 µs |
| desde cero (armar la red y resolver) | ≈ 50 µs |
| el chip, para comparar | ≈ 9.800 µs por cuadro de pantalla |

## 21. Modelos y de dónde salen los números

| Pieza | Modelo | De dónde sale |
|---|---|---|
| Pin en ALTO / BAJO | 5 V con 25 Ω / 0 V con 22 Ω | Curvas de la hoja de datos del ATmega328P (unos 4,5 V a 20 mA) |
| Pull-up interno | 35 kΩ | Hoja de datos: entre 20 y 50 kΩ |
| LED | Shockley con n = 2 y 5 Ω internos. **Is se calcula** para que dé su voltaje directo a 20 mA | Rojo 2,0 V · amarillo 2,05 V · verde 2,2 V · azul y blanco 3,1 V |
| Límites | pin 40 mA · LED se quema por encima de 30 mA · resistencia 0,25 W | Hojas de datos y resistencias de 1/4 W del kit |

**Todos estos valores son de partida.** La validación con el multímetro los ajusta. Los valores esperados con el programa «Pin 13 siempre en ALTO» están en la sección 24.

## 22. Fallas, modo ideal y brillo

- **Revisión:** después de cada solución, `revisarFallas` compara cada pieza con sus límites. Cada falla se avisa una sola vez por corrida, por `alFalla` (mensaje en español) y como evento `falla` del contrato (tipo, componente y corriente).
- **LED quemado:** queda **abierto**. Se rehace la red sin él y se resuelve otra vez, porque sin el LED cambian las corrientes. Sigue quemado hasta detener la simulación, como en la placa: ya no prende aunque se corrija el circuito.
- **Modo:** `realista` enciende `danoComponentes` y `limitePin`, `ideal` los apaga, y `noIdealidades` ajusta una por una. En modo ideal las corrientes son las mismas: solo no hay daño ni límites.
- **Cortocircuito de 5V o 3V3 a GND:** se detecta al armar la red, porque una fuente ideal en corto no tiene solución.
- **Brillo:** corriente / 15 mA, hasta un máximo de 1. Con 220 Ω da 83 % y con 1 kΩ, 21 %.
- **Lo que se ve:** el simulador lo pasa al lienzo por `_mostrar`, junto con los voltajes. El rótulo de cada pin conectado muestra su voltaje, como la punta de un multímetro.

## 23. El flujo completo en un cuadro

```
chip.correr(…)  ──► ¿cambió un pin? ──► pendiente = true
                                              │
fin del cuadro: ¿pendiente? ──► clave = estado de los pines ──► ¿solución guardada? ── sí ──┐
                                                                     │ no                    │
                                                    red.ponerPines → red.resolver()          │
                                                                     ▼                       │
                                                        revisarFallas ◄──────────────────────┘
                                                                     │
                                          ¿LED quemado? ── sí ──► rehacer la red sin él y resolver otra vez
                                                                     │
                                       lienzo._mostrar({brillo, quemados, voltajes, LED de la placa})
```

## 24. Valores esperados para el multímetro

El circuito es pin 13 en ALTO → resistencia → LED rojo → GND, con el programa «Pin 13 siempre en ALTO». Los calcula `npm run probar:motor`.

| Resistencia | Corriente | V del LED | V de la resistencia | V del pin 13 |
|---|---|---|---|---|
| 220 Ω | 12,50 mA | 1,938 V | 2,749 V | 4,688 V |
| 330 Ω | 8,73 mA | 1,901 V | 2,881 V | 4,782 V |
| 1 kΩ | 3,10 mA | 1,820 V | 3,103 V | 4,922 V |

El criterio del proyecto es ±5 % en voltaje y ±10 % en corriente. Si la placa real se sale de esa franja, se ajustan los modelos de la sección 21. Los primeros candidatos son la resistencia del pin y el voltaje directo del LED.

**Medido el 7 de octubre de 2026** (Efraín, multímetro, placa real; resistencias medidas de 215 y 326 Ω): las 12 comparaciones cumplen el criterio y **el modelo no se ajustó**. La peor es la caída en la resistencia de 220 Ω (−4,8 %): en la placa, el pin menos el LED da 2,74 V pero en la resistencia se midieron 2,61 V, así que faltan 0,13 V en los contactos. El detalle está en `../validacion/2026-10-07-led-rojo-multimetro.md`, y `npm run probar:motor` lo usa como prueba de regresión.

---

# Prototipo 3: Web Worker, promedio del PWM y potenciómetro

> Agregado el 7 de octubre de 2026. Archivos nuevos: [src/nucleo.js](src/nucleo.js) (chip + circuito + promedio, sin página), [src/trabajador.js](src/trabajador.js) (el Web Worker y su reloj) y [src/hex.js](src/hex.js) (leer el `.hex` sin cargar avr8js). [src/simulador.js](src/simulador.js) quedó como la parte de la página.

## 25. Por qué un Web Worker

- **La medida del aula:** en un PC del ambiente, el prototipo 2 iba entre 76 y 100 %. Al cambiar el LED bajaba un instante a 54–66 %. Efraín no notó el cambio, pero el margen era poco.
- **El freno es el chip:** un perfil del navegador mostró que avr8js se lleva casi todo el cálculo. El circuito y el dibujo no llegan al 0,1 %.
- **El tope de la página:** en la página, el chip solo podía usar 12 ms de cada cuadro de 16,7 ms (72 %), para no congelarla. En un PC lento eso no alcanza. Y con TecnoBloques abierto, Blockly usa el mismo hilo.
- **El Worker es otro hilo:** el chip puede usar un núcleo completo del procesador, y ni Blockly ni el dibujo lo frenan.

## 26. Cómo se reparte el trabajo

```
página (simulador.js)                         Worker (trabajador.js + nucleo.js)
  crearSimulador ── crear {hex, circuito} ──►   crea el núcleo: chip + red eléctrica
  iniciar/pausar/… ── {tipo, corrida} ─────►    reloj: avanza el chip al ritmo real
  lienzo.alCambiar ── circuito ────────────►    rehace la red (la perilla también)
  serialEnviar ── serial ──────────────────►    cola de entrada del chip
  dibuja 1 vez por cuadro ◄── foto ─────────    unas 60 por segundo: brillos, voltajes,
  alSerial, alFalla, eventos ◄──────────────    serial, fallas nuevas, medición, velocidad
```

- **El Worker sale de un Blob:** `construir.js` arma primero `trabajador.js` y lo mete en el paquete como texto. Así el paquete sigue siendo un solo archivo, como pide TecnoBloques.
- **La «corrida»:** cada orden que cambia el estado (iniciar, pausar, reiniciar, detener) sube un número. Cada foto lleva el número con que se pidió, y la página descarta las que llegan tarde. Así, después de pausar, el tiempo no avanza por una foto atrasada.
- **Sin Worker:** si el navegador no deja crearlo, el mismo código corre en la página con un `self` falso. Funciona igual, pero sin la ventaja del hilo aparte. `sim._medidas().hilo` dice `worker` o `pagina`.
- **El `.hex` se revisa en la página** con `hex.js` (sin avr8js), así un `.hex` dañado da el error al crear el simulador, como antes.

## 27. El reloj en el Worker

```
cada vuelta:
   deuda += tiempo real que pasó × 16.000 ciclos/ms   (máximo 50 ms de deuda)
   mientras haya deuda y no pasen 8 ms de cálculo:  avanzar el chip 1 ms
   cada 16 ms reales: mandar una foto
   si quedó deuda: seguir ya (un mensaje a sí mismo)
   si está al día: esperar 2 ms
```

- **Sin tope de 72 %:** cuando el chip va atrasado, el Worker sigue de inmediato con un `MessageChannel`, que no tiene la espera mínima de `setTimeout`. Las tajadas de 8 ms solo sirven para atender mensajes, como pausar o el serial.
- **Si el PC no alcanza:** la deuda no pasa de 50 ms. El chip va más lento que el real en vez de intentar recuperar todo, igual que antes.
- **La velocidad que se informa** es el promedio del último medio segundo. Ya no es la de un solo cuadro, así que no salta en cada cambio del LED.

## 28. El promedio del PWM

- **El problema:** con `analogWrite`, el pin cambia unas 1000 veces por segundo. Resolver el circuito en cada cambio sería caro, y la pantalla no puede mostrar 1000 cambios por segundo.
- **La solución:** el chip avisa cada cambio de pin con su ciclo exacto. El núcleo suma cuánto tiempo pasó en cada **combinación de pines**. En cada foto, promedia las soluciones del circuito de esas combinaciones según su tiempo.
- **Cada combinación se resuelve una sola vez** y se guarda. Con PWM en un pin hay solo dos: ALTO y BAJO. Con el LED en PWM al 25 %, el circuito se resolvió 3 veces en 0,3 s, con unos 150 cambios del pin.
- **Lo que se promedia:** corrientes, voltajes (lo que lee un multímetro), potencia de las resistencias (lo que calienta) y el brillo del LED, que sale de la corriente promedio.
- **Las fallas usan el pico, no el promedio:** el LED se quema por la corriente de cada combinación. Un LED sin resistencia con PWM al 25 % se quema igual, como en la placa real.
- **La ventana se corta en períodos completos:** si la foto cae a mitad de un período del PWM, el promedio se corre un poco. Por eso cada ventana termina la última vez que los pines volvieron a la combinación con que empezó, y lo que sigue pasa a la ventana siguiente. Con un pin en PWM, eso son períodos completos: el ciclo útil da exacto con ventanas de 5 a 20 ms. Si los pines cambian lento, como en el parpadeo, la ventana se cierra como antes y el cambio se ve al instante.
- **`medicion.pwm`** da el ciclo útil de cada pin que cambió en la ventana. La tabla de la página lo muestra como «PWM 25 %».

## 29. El potenciómetro y `analogRead()`

- **Modelo:** la perilla parte la resistencia total en dos: `GND ── R·p ── SIG ── R·(1−p) ── VCC`, con `p` de 0 a 1. Cada mitad tiene un mínimo de 1 Ω, para que el solucionador nunca reciba 0 Ω.
- **El ADC:** `chip.js` agrega el `AVRADC` de avr8js. En cada foto, el núcleo le pone a cada canal (A0–A5) el voltaje promedio que dejó el circuito. Si la entrada está al aire, se deja el valor anterior. El ruido y la entrada flotante llegan con las no idealidades de T2.
- **En el lienzo:** el botón «+ Potenciómetro» agrega uno de 10 kΩ en la mitad. La perilla se gira con el mouse sobre el dibujo, sin mover la pieza. Al seleccionarlo, la barra trae el valor (1 kΩ, 10 kΩ o 100 kΩ) y un deslizador «Perilla» para el teclado.
- **Eventos:** el giro cambia el circuito al instante, pero el evento `componente_cambiado` se anota cuando la perilla se queda quieta 0,4 s. Así no hay un evento por cada grado.
- **Formato del circuito:** `{ "tipo": "potenciometro", "props": { "ohmios": 10000, "posicion": 0.5 } }`, con pines `GND`, `SIG` y `VCC`.

## 30. Lo que midió el prototipo 3

| Medida | Resultado |
|---|---|
| Ciclo útil de `analogWrite(9, 64)` | 25,10 % con ventanas de 5 a 20 ms (programa: 64/255 = 25,10 %) |
| Corriente promedio del LED con 220 Ω y PWM al 25 % | 3,14 mA, igual a 12,50 mA × 25,1 % |
| `analogRead(A0)` con la perilla en 0, 25, 50, 75 y 100 % | 0, 255, 511, 767 y 1023 |
| Girar la perilla de 20 a 80 % con el programa andando | la lectura pasa a 819 |
| LED sin resistencia con PWM al 25 % | se quema y avisa el exceso del pin; en modo ideal, nada |
| Página bloqueada 1,5 s (como Blockly ocupado) | el chip siguió: avanzó unos 1250 ms (en la página habrían sido unos 50) |
| Simulador viejo frente al Worker, mismo PC y mismo momento | 62 % frente a 78 % del tiempo real |

- **Validado por Efraín (7 oct):** el PWM y la lectura analógica funcionan en la práctica: el brillo sigue a `analogWrite` y `analogRead()` sigue a la perilla.
- **Con cargador (7 oct):** pasan las 131 comprobaciones de `npm run probar`, también las de tiempo (parpadeo de 503 ms para 500 ms y velocidad de 100 %).
- **Ojo con la batería:** las medidas de la tabla se hicieron con el portátil de Efraín **sin cargador**. Con batería, Windows baja la velocidad del procesador: el chip pasó de 1,7 a unas 0,5 veces el real en Node. Las pruebas de tiempo del prototipo 1 (`probar_simulacion.py`) fallan así, porque miden el parpadeo contra el reloj real. Hay que repetirlas con el cargador conectado.
- **Lo que falta medir:** la velocidad en un PC del aula, con cargador y con TecnoBloques abierto. La meta es ≥ 90 % estable.

---

# Primera conexión con TecnoBloques

> 7 de octubre de 2026. TecnoBloques 0.2.5 + este prototipo, en la app de escritorio. El lado de TecnoBloques está explicado en la sección «Proyecto hermano» de su `CLAUDE.md`.

## 31. Cómo se conectan

```
TecnoBloques (app de escritorio)                          TecnoCircuito (este prototipo)
  npm run app:simulador                                     npm run construir → dist/tecnocircuito.js
    build.js --simulador-local  ── embebe ──────────────►   window.TecnoCircuito (contrato 1)
  pestaña «Circuito»: crearLienzo(circuito del proyecto)
  botón «Simular»:
    tbEscritorio.compilarHex({codigo, fqbn})  ← arduino-cli compila el C++ de los bloques
    crearSimulador({lienzo, hex, modo: 'realista'})  ─────►  Worker: chip + circuito
    monitor serial (y el pequeño de la pestaña)  ◄─ alSerial ─┘
  el circuito se guarda en el .tbq.json (campo «circuito»), tal cual
```

- **Solo en desarrollo, por ahora:** `build.js` embebe esta copia solo con `--simulador-local`. El instalador sale sin simulador, y `empaquetar.js` se niega a empaquetar si el HTML trae la copia local. Al aula llegará desde una versión etiquetada de este repositorio.
- **Lo que probó `npm run test:simulador`** (en TecnoBloques, 19 comprobaciones, todas bien):
  - el ejemplo «Eco serial y LED» de TecnoBloques se compila con arduino-cli, se simula en el Worker y responde «Recibí: on» y «off» prendiendo y apagando el LED;
  - un programa hecho con bloques (`analogWrite(9, analogRead(A0) / 4)`) sigue al potenciómetro: perilla al 50 % → PWM al 49,8 %; al 20 % → 20,0 %;
  - el circuito se guarda en el proyecto y vuelve al abrirlo; un error de C++ se explica en español; con el Nano, la pestaña avisa que el simulador solo tiene el Uno.

## 32. Lo que encontró la primera conexión

- **Error corregido: el serial perdía las tildes.** El núcleo convertía cada byte por separado, y «Recibí» (la «í» son dos bytes en UTF-8) salía como «RecibÃ­». Ahora el núcleo junta los bytes de cada foto y los decodifica como UTF-8, con memoria entre fotos. Lo prueba `probar_nucleo.js` con el `.hex` real del eco que deja TecnoBloques en `test/salida` (la primera fixture usada).
- **Falta en el contrato: `destruir()` del simulador.** TecnoBloques necesita cerrar el Worker al cambiar de proyecto o de placa. Hoy usa `_destruir()`, que es solo del prototipo. Se propone agregar `sim.destruir()` a la API (cambio compatible).
- **El monitor no podía estar en otra pestaña.** Para ver el LED y escribirle al programa a la vez, TecnoBloques agregó un monitor pequeño al pie de la pestaña «Circuito». El monitor serial de siempre también muestra la simulación.
- **El estado «Simulando · … · velocidad» sale de `_medidas()`,** que también es solo del prototipo. Conviene pasarlo al contrato como `sim.medidas()` (tiempo simulado y velocidad), porque es lo que el aprendiz ve.

---

# Ajustes de Efraín y tareas T1 y T2

> Agregado el 7 de octubre de 2026 (tarde). Archivos tocados: [src/catalogo.js](src/catalogo.js), [src/lienzo.js](src/lienzo.js), [src/chip.js](src/chip.js), [src/nucleo.js](src/nucleo.js), [src/motor/red.js](src/motor/red.js) y [src/conexiones.js](src/conexiones.js).

## 33. Colores de cable en el orden del código de colores

```
 tecla:   0      1       2     3        4         5      6     7        8     9
 color: negro  marrón  rojo  naranja  amarillo  verde  azul  violeta  gris  blanco
 clave: negro  marron  rojo  naranja  amarillo  verde  azul  morado   gris  blanco   ← lo que se guarda
```

- **El orden lo da `COLORES_CABLE`,** y `CODIGO_COLORES[n]` dice qué color va con la tecla n. «morado» se conserva como clave porque ya había circuitos guardados con ella.
- **Con un cable elegido o mientras se dibuja uno,** la tecla 0 a 9 llama a `ponerColor()`. Las muestras de la barra hacen lo mismo y llevan su número, así el aprendiz aprende el código de colores sin darse cuenta.
- **Las teclas que usa el lienzo** (Supr, Esc, R y 0 a 9) se detienen con `stopPropagation()` y no siguen hacia la página. Sin eso, Supr en el circuito también borraba un bloque elegido en Blockly.

## 34. La imagen SVG del circuito (`lienzo.exportarSVG()`)

```
 por cada pieza (en el orden de las capas):        al final, los cables (encima, como en pantalla)
   SVG del dibujo de Wokwi (está en su shadow DOM)
   ├─ clonar y quitar los comentarios de Lit
   ├─ perilla: --knob-angle (CSS) → transform="rotate(…)" (atributo: lo entienden Word e Inkscape)
   ├─ identificadores: light1 → tc-led1-light1 (dos LED usaban los mismos filtros)
   ├─ estilos del shadow DOM → <style> limitado a la pieza (#tc-placa text { font-size: 2px … })
   └─ <g transform="translate(x y) rotate(rot)">
```

Sin los estilos, las letras de la placa salen gigantes. Sin el prefijo, el segundo LED tomaría el filtro del primero. La prueba `probar_svg.py` revisa que sea XML válido, que no repita identificadores, que toda referencia apunte a algo y que la imagen cargue sola.

## 35. Las entradas: del circuito al `digitalRead()`

```
 cambia un pin del programa ─┐
 cambia el cableado ─────────┼──► actualizarEntradas() (nucleo.js)
 se presiona/suelta un botón ┘        │
                                      ├─ solución del circuito con los pines de ahora (guardada por combinación)
                                      ├─ red.flotantes(): ¿qué entradas no tienen ningún camino a 5V, GND o un pin?
                                      ├─ cada entrada (D2–D13, A0–A5):
                                      │     al aire → nivel al azar (realista) o BAJO (ideal)
                                      │     V ≥ 3,0 V → ALTO · V ≤ 1,5 V → BAJO · en medio → el nivel anterior
                                      │     sin nada conectado y con INPUT_PULLUP → ALTO
                                      ├─ chip.ponerEntrada(pin, nivel)  →  setPin() de avr8js  →  digitalRead()
                                      └─ los voltajes de A0–A5 al ADC desde ya (no espera a la foto)
```

- **Por qué en cada cambio y no en cada foto:** un programa que hace `pinMode(2, INPUT_PULLUP)` y lee en la línea siguiente tiene que ver el ALTO al instante, como en la placa. Las soluciones se guardan por combinación de pines, así que no cuesta: con PWM, cada cambio de pin solo busca en la memoria.
- **Los umbrales son los del ATmega328P a 5 V** (0,6·VCC y 0,3·VCC). En medio la placa real no garantiza nada, y conservar el nivel anterior imita su histéresis.
- **D0 y D1 no se tocan:** son del monitor serial.

## 36. Entrada flotante y ruido del ADC

**¿Cuándo está «al aire» una entrada?** `red.flotantes()` arma grupos de pines por conducción: cables, resistencias, potenciómetros y botones presionados. Los LED no cuentan, porque apagados no conducen. Un grupo está manejado si contiene GND, 5V, 3,3V, un pin de salida o un pin con pull-up. Una entrada en un grupo sin manejar está al aire.

| No idealidad | Realista | Ideal |
|---|---|---|
| `entradaFlotante`, digital | cambia sola, en promedio cada 120 ms (`CAMBIO_AL_AIRE_POR_MS`) | lee BAJO |
| `entradaFlotante`, analógica | deambula: cada lectura se mueve un poco al azar (`PASEO_AL_AIRE_V`) | lee 0 |
| `ruidoADC` | cada `analogRead()` suma un ruido normal de unos 0,6 pasos (`RUIDO_ADC_V`) | sin ruido |

- **Por qué 120 ms y no más rápido:** con cambios cada 7 ms el LED se veía siempre a medias, porque el ojo y el promedio por cuadro lo suavizan. A 120 ms se ve «el LED se prende y se apaga solo», que es lo que el aprendiz tiene que reconocer.
- **Los dos valores son de partida.** Se ajustan con `validar_flotante.ino` y `validar_adc.ino` en la placa real.
- **El azar tiene semilla** (`crearAzar`, mulberry32). Las pruebas con Node usan una semilla fija y dan siempre lo mismo.
- **El ADC redondea el voltaje al microvoltio.** Justo en 2,5 V (512), un error de cálculo de una milmillonésima hacía saltar la lectura entre 511 y 512.
- **Sin GND, el potenciómetro no divide:** la pata del medio queda pegada a 5V y lee 1023. Eso no es una no idealidad sino física, y sale igual en los dos modos.

## 37. El botón (`pulsador`)

```
   1i ●──────────● 1d        las patas con el mismo número: la misma lámina de metal por dentro
          ┌──┐
          │  │  ← al presionar se une la 1 con la 2
          └──┘
   2i ●──────────● 2d
```

- **En `conexiones.js`,** `1i` va siempre unida con `1d`, y `2i` con `2d`. Si el botón está en `presionados`, también `1i` con `2i`. Presionarlo cambia el cableado de ese momento: se rehace la red y se leen las entradas otra vez.
- **Mientras se simula, el clic presiona el botón y no lo mueve,** como en la placa. Detenido, se mueve como cualquier pieza.
  - El lienzo no captura el puntero en el botón: si lo hace, el dibujo de Wokwi cree que el mouse salió y se suelta solo.
  - Si el mouse se sale del botón con el clic apretado, se suelta, como un dedo que se resbala.
- **Al soltarlo sale el evento `boton_pulsado { id, ms }`,** que muestra cómo prueba el aprendiz su montaje.
- **El estado presionado no se guarda en el circuito.** Llega al Worker por un mensaje propio (`pulsador`).

---

# Prototipo 4: la protoboard

> Agregado el 7 de octubre de 2026. Archivo nuevo: [src/protoboard.js](src/protoboard.js).

## 38. Geometría y nombres

```
        ┌───────────────────────────────────────────────────────────────┐
  +  s+ │  ● ● ● ● ●   ● ● ● ● ●   ● ● ● ● ●   ● ● ● ● ●   ● ● ● ● ●   │  riel + de arriba (25 huecos, unido)
  −  s- │  ● ● ● ● ●   ● ● ● ● ●   ● ● ● ● ●   ● ● ● ● ●   ● ● ● ● ●   │  riel − de arriba
        │ 1       5         10        15        20        25        30  │
     a  │ ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  …              │  ┐
     …  │ │  │  │  │  │                                                 │  │ cada columna une a–e
     e  │ ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  …              │  ┘
        │════════════════════ canal central (0,3") ═════════════════════│
     f  │ ●  ●  ●  ●  ●  …                                               │  ┐
     …  │ │  │  │  │  │                                                  │  │ y aparte f–j
     j  │ ●  ●  ●  ●  ●  …                                               │  ┘
  −  i- │  ● ● ● ● ●   …                                                 │  riel − de abajo
  +  i+ │  ● ● ● ● ●   …                                                 │  riel + de abajo
        └───────────────────────────────────────────────────────────────┘
```

- **La distancia entre huecos es la de los pines:** 0,1" = 9,6 px. Entre `e` y `f` hay 3 pasos, como en la protoboard real, para que un chip o un botón queden cruzando el canal.
- **Los nombres son los impresos:** `a1` … `j30`. Los rieles, `s+N`, `s-N`, `i+N` e `i-N`, usan la columna que tienen debajo, y les falta un hueco cada 6 columnas.
- **`huecos()` y `tiras()`** dan la lista de huecos y los grupos unidos por dentro, y se guardan en memoria.

## 39. Las tiras en el circuito

`calcularNodos()` une los huecos de cada tira y cada pata encajada con su hueco (campo `en`). Desde ahí todo funciona igual que con cables:

```
 D13 ──cable──► a19 ═tira 19═ c19 ◄─pata 2─ r1 ─pata 1─► c13 ═tira 13═ a13 ◄─ánodo─ LED
```

El motor también da el voltaje de todos los huecos de una tira que toca algo. Así el rótulo de cualquier hueco de esa tira muestra su voltaje, como la punta de un multímetro.

## 40. Encajar una pieza (`encajar()` en protoboard.js)

```
 1. las patas de la pieza en coordenadas de la protoboard (con su giro)
 2. la primera pata → su hueco más cercano; si está a más de un paso, la pieza no está sobre la protoboard
 3. corrimiento = lo que le falta a la primera pata para caer justo en su hueco
 4. con ese corrimiento, cada pata debe caer a menos de 3,5 px de un hueco libre y distinto
 5. sí → la pieza se corre lo justo y queda «en»: { anodo: "protoboard.a13", … }
    no → queda suelta (sin «en»)
```

- **Por qué 3,5 px:** los dibujos de Wokwi no tienen las patas a 0,1" exactas. El LED las tiene a 10 px, la resistencia a 58,8 (6,1 pasos) y el potenciómetro a 10. La tolerancia las acepta sin confundir huecos vecinos (9,6 px).
- **Cuándo se encaja:**
  - al soltar una pieza arrastrada;
  - al girarla, porque puede caer en otros huecos o quedar suelta;
  - al agregarla, si aparece sobre la protoboard.
- **Mientras se arrastra,** `mostrarDestino()` pinta en verde los huecos donde quedaría.

## 41. Capas: por qué los huecos van dentro del dibujo de la protoboard

```
 capa de pines        patas de las piezas (siempre encima: se puede cablear una pata)
 capa de cables       cables
 capa de piezas       placa · PROTOBOARD (con sus 400 huecos dentro) · piezas encima
```

En la primera versión, los huecos estaban en la capa de pines, encima de todo. Un clic en el cuerpo de una pieza suelta sobre la protoboard caía en un hueco y empezaba un cable. Dentro del dibujo de la protoboard quedan debajo de las piezas, y además se mueven solos con ella.

Hay dos efectos de paso, y los dos son como en la real:

- **Un hueco con un cable ya conectado no recibe otro.** El cable está encima.
- **Un hueco con una pata encajada** (`tc-ocupado`) no recibe clics. Se cablea la pata, que es el mismo nodo.

## 42. Mover, borrar y la barra

- **Mover la protoboard** corre también las piezas que tienen `en`, y sus huecos no cambian. **Borrarla** quita los `en` y los cables a sus huecos.
- **«+ Agregar»** abre un menú. Va fuera de la barra porque la barra se desplaza de lado y lo cortaría. En el menú, «Protoboard» se apaga si ya hay una.
- **La barra tiene altura fija** y siempre va en una línea. Si cambiara de alto con lo elegido, la vista se correría bajo el mouse del aprendiz mientras cablea. Las opciones de la pieza elegida se desplazan dentro de su espacio sin tapar el zoom.
