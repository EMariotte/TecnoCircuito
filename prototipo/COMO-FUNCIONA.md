# Cómo funciona el prototipo 0

> Explicación del lienzo de cableado: qué hace cada archivo, cómo se arma y cómo se ejecuta.
> Escrita el 7 de octubre de 2026. Los números de línea de `src/lienzo.js` están al día con el prototipo 4.

## 1. Vista general

> **Histórico.** Desde PIEZA-003 (sección 75) el paquete ya no lleva `@wokwi/elements` ni Lit: todas las piezas son Piezas Tecno. Lo que sigue describe cómo era cuando se escribió.

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

> **Histórico.** Desde PIEZA-003 (sección 75) el paquete ya no lleva `@wokwi/elements` ni Lit: todas las piezas son Piezas Tecno. Lo que sigue describe cómo era cuando se escribió.

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

> **Histórico.** Desde PIEZA-003 (sección 75) el paquete ya no lleva `@wokwi/elements` ni Lit: todas las piezas son Piezas Tecno. Lo que sigue describe cómo era cuando se escribió.

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
- **La «corrida»:** cada orden que cambia el estado (iniciar, pausar, reiniciar, detener) sube un número (el «turno»). Cada foto lleva el número con que se pidió, y la página descarta **la vista** de las que llegan tarde. Así, después de pausar, el tiempo no avanza por una foto atrasada. Sus **hechos** (fallas, serial, reinicios) sí se entregan si son de la misma corrida: sección 66.
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

> **Histórico.** Desde PIEZA-003 (sección 75) el paquete ya no lleva `@wokwi/elements` ni Lit: todas las piezas son Piezas Tecno. Lo que sigue describe cómo era cuando se escribió.

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

> **Actualizado el 9 de octubre de 2026, con las medidas de la placa real:** el ruido del ADC bajó de 0,6 a 0,1 pasos, y la entrada al aire ahora usa «la mano es el mouse» (sección 47). Lo que sigue describe la primera versión.

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

## 43. Llevar el circuito a KiCad (la netlist)

> Hecho el 8 de octubre de 2026, a pedido de Efraín: «solo con la netlist, con eso será suficiente por ahora». Probado con KiCad 10.0.3.

Una **netlist** es el circuito sin dibujo: **qué piezas hay** (cada una con su huella, el dibujo físico de sus patas en la placa) y **qué patas están unidas** (cada grupo es una red). KiCad la importa en su editor de placas y desde ahí el aprendiz diseña un **shield**: una placa que se monta encima del Uno con sus piezas soldadas.

```
  Lo que ve el aprendiz                    Lo que guarda la netlist
  ────────────────────                     ────────────────────────
  Uno ──cable── protoboard                 Piezas:  J1–J4 (conectores del shield), R1 220, D1 LED, SW1 botón, R2 10k
        │ tiras, rieles,                   Redes:   D13            = J2.5,  R1.2
        │ cables, colores,                          Net-(D1-Pad2)  = D1.2,  R1.1
        │ posiciones                                GND            = D1.1,  J1.6, R2.2
        └──────────────── calcularNodos() ─►        +5V            = J1.5,  SW1.2
                                                    D2             = J4.6,  R2.1, SW1.1
```

**El simulador ya hacía el trabajo difícil:** `calcularNodos()` es lo mismo que usa el solucionador eléctrico. La protoboard, sus tiras y los cables desaparecen, porque solo son conexiones y quedan dentro de cada red.

### El archivo `.net`

Es el formato «export» S-expression versión «E», el mismo que escribe el esquemático de KiCad (`kicad-cli sch export netlist`):

```lisp
(export (version "E")
  (design (source "T1 en protoboard") (date "…") (tool "TecnoCircuito"))
  (components
    (comp (ref "D1") (value "LED rojo") (footprint "LED_THT:LED_D5.0mm")
      (libsource (lib "Device") (part "LED") (description ""))
      (property (name "TecnoCircuito") (value "led1"))      ← de qué pieza del lienzo viene
      (sheetpath (names "/") (tstamps "/"))
      (tstamps "…"))                                         ← fijo por pieza: al reimportar, KiCad reconoce la misma huella
    …)
  (nets
    (net (code "3") (name "GND") (class "Default")
      (node (ref "J1") (pin "6") (pinfunction "GND2") (pintype "passive"))
      (node (ref "D1") (pin "1") (pintype "passive"))
      …)))
```

### La tabla de huellas y pads (`PIEZAS_KICAD` en [src/kicad.js](src/kicad.js))

Cada pin nuestro tiene que caer en **el número de pad correcto** de la huella. Si no, KiCad no avisa: une la pata equivocada, como un LED al revés que se descubre con la placa ya fabricada.

| Pieza | Ref | Huella de KiCad | Nuestro pin → pad |
|---|---|---|---|
| Uno (desde el 8 oct, los conectores del shield) | J1 Power | `Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical` | IOREF → 2 · RESET → 3 · 3V3 → 4 · 5V → 5 · GND2, GND3 → 6, 7 · VIN → 8 |
| | J2 Digital/PWM | `…PinSocket_1x10…` | SCL → 1 · SDA → 2 · AREF → 3 · GND1 → 4 · D13 … D8 → 5 … 10 |
| | J3 Analog | `…PinSocket_1x06…` | A0 … A5 → 1 … 6 |
| | J4 Digital/PWM | `…PinSocket_1x08…` | D7 … D0 → 1 … 8 |
| Resistencia | R | `Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal` (la de ¼ W; la de ½ W y la guardada sin `vatios`, en la sección 74) | 1 → 1 · 2 → 2 |
| LED | D | `LED_THT:LED_D5.0mm` | cátodo → 1 (el pad cuadrado) · ánodo → 2 |
| Botón | SW | `Button_Switch_THT:SW_PUSH_6mm` | 1i, 1d → 1 · 2i, 2d → 2 (la huella repite los números, como nuestras patas unidas por dentro) |
| Potenciómetro | RV | `Potentiometer_THT:Potentiometer_Alps_RK163_Single_Horizontal` (el del kit; el guardado sin `modelo`, la RK09K: sección 74) | GND → 1 · SIG → 2 (el cursor) · VCC → 3 |

- **De dónde salió:**
  - las piezas, de sus símbolos y huellas oficiales de KiCad 10;
  - los conectores, de la netlist de la plantilla «Arduino Uno Shield» (`kicad-cli sch export netlist`). La prueba la vuelve a exportar y compara pin por pin.
  - La primera versión (7 oct) usaba la huella `Module:Arduino_UNO_R3`; ver el hallazgo al final de esta sección.
- **Licencia:** no copiamos nada de las librerías de KiCad. Solo escribimos el nombre de la huella y el número de cada pad, y KiCad las busca en sus propias librerías.

### Reglas de las redes

- **Del Uno solo entran los pines con un cable.** Son los agujeros que usa el shield. Si el LED va a GND2, entra el pad 6 y no los otros GND.
- **Una red necesita dos pads o más.** Una pata suelta no lleva red.
- **El nombre de la red:**
  - el del pin del Uno que toca (`GND`, `+5V`, `+3V3`, `D13`, `A0`…);
  - si no toca ninguno, uno automático como el de KiCad: `Net-(D1-Pad2)`;
  - si toca varios (un corto), manda `GND`, luego `+5V`. La netlist no lo arregla: el simulador ya lo marca como falla.
- **Se escribe siempre igual:** las piezas y las redes van en orden fijo, así que exportar dos veces el mismo circuito da el mismo texto.

### En KiCad: qué hace el aprendiz

```
 circuito.net ──► Editor de placas (Pcbnew): Archivo → Importar → Netlist
                    │
   1. Aparecen las huellas, amontonadas               ✔ automático
   2. Líneas finas (ratsnest) dicen qué va con qué    ✔ automático
   3. Ubicar las piezas                               ✋ el aprendiz
   4. Dibujar el contorno de la placa                 ✋ el aprendiz
   5. Trazar las pistas siguiendo las líneas finas    ✋ el aprendiz
   6. Revisión de reglas (DRC) y archivos Gerber      ✔ KiCad lo verifica
```

KiCad no deja unir con una pista dos redes distintas. Así, **la placa tiene las mismas conexiones que el circuito que funcionó en el simulador.**

**Lo que no trae, por ser solo netlist:**
- no hay esquemático, así que no se puede documentar el circuito como diagrama ni correr la revisión eléctrica (ERC);
- para cambiar el circuito, se cambia en TecnoCircuito y se vuelve a importar. Gracias a los `tstamps` fijos, KiCad actualiza las mismas huellas en vez de duplicarlas.

El esquemático (`.kicad_sch`, con etiquetas en vez de cables) queda para más adelante.

Un detalle del botón: KiCad pide unir también las dos patas «1» entre sí (y las dos «2»), aunque por dentro ya lo están. Es normal en esa huella, y una pista corta lo resuelve.

### Cómo se prueba

```
 npm run probar:kicad                        python -I pruebas/probar_kicad_pcb.py
 (Node, sin KiCad)                           (con KiCad instalado; si no, se salta)
 ─────────────────                           ──────────────────────────────────────
 · el ejemplo T1 de la página da 5 redes     · cada huella existe en las librerías de KiCad 10
   exactas                                   · cada pad corresponde al pin del símbolo oficial
 · con cables o en protoboard, las mismas      (los 31 del Uno, cátodo = K, …)
   redes                                     · arma la placa con cada .net, como «Importar netlist»
 · T2, una pieza suelta, un corto, nombres   · el DRC de KiCad ve las conexiones por trazar
   con comillas                                (9 en la T1, 3 en la T2)
 · deja los .net y la tabla en
   pruebas/capturas/kicad/ ─────────────────►
```

El Python de KiCad trae el módulo `pcbnew`, pero no su lector de netlists. Por eso la prueba carga cada huella y le pone a cada pad su red, que es lo mismo que hace «Importar netlist».

**Lo que solo se puede probar a mano:** el menú «Importar netlist» del editor de placas. Ver [LEEME.md](LEEME.md), «Llevar el circuito a KiCad».

### Hallazgo de la prueba en KiCad (8 oct): el Uno se solapa con las piezas

Efraín importó la netlist en KiCad 10 y funcionó: aparecen las piezas con sus conexiones. Pero el DRC no deja montar las piezas encima del Uno, así que no queda como un shield.

- **La causa:** la huella `Module:Arduino_UNO_R3` dibuja el Uno entero, con una zona de cortesía (*courtyard*) que cubre toda la placa. KiCad no deja que otra huella se monte sobre una zona de cortesía: es la regla «courtyard overlap» del DRC del editor de placas (no el ERC, que es del esquemático). Para KiCad, el Uno es una pieza más que ocupa espacio, no la placa de abajo.
- **El arreglo de Efraín funciona:** crear el proyecto con la plantilla del Uno y borrar la huella del Uno que trae la netlist. Las demás piezas quedan conectadas a los pines de la plantilla, porque las redes llevan los nombres de esos pines.
- **La solución propuesta (para más adelante):** KiCad 10 trae la plantilla **«Arduino Uno Shield»** (`share/kicad/template/Arduino_Uno`). Tiene el contorno exacto del Uno, 4 agujeros de montaje y 4 conectores hembra:
  - `J1` Power (8);
  - `J2` Digital/PWM (10);
  - `J3` Analog (6);
  - `J4` Digital/PWM (8).

  En vez de la huella del Uno, la netlist exportaría **esos 4 conectores, con las mismas referencias**. El aprendiz crea el proyecto desde la plantilla, importa la netlist y KiCad conecta las piezas a los conectores que ya están en su lugar, sin solapes ni nada que borrar.

### La solución: los conectores de la plantilla (hecha el 8 oct)

```
 ANTES (7 oct)                                   AHORA (8 oct)
 ─────────────                                   ─────────────
 netlist: A1 = Module:Arduino_UNO_R3             netlist: J1, J2, J3, J4 = los conectores de la plantilla
          (dibuja el Uno entero, con una                  (mismas referencias y mismos UUID)
           zona de cortesía en toda la placa)
 KiCad: las piezas encima del Uno →              KiCad: proyecto desde la plantilla «Arduino Uno Shield»,
        «courtyard overlap»                             importar la netlist → reconoce J1–J4 en su lugar,
                                                        agrega R1, D1, SW1… → las piezas van dentro del
                                                        contorno, sin solapes
```

- **Cómo reconoce KiCad los conectores:** al importar, enlaza cada pieza de la netlist con la huella que ya está en la placa, por su referencia (J1) o por su UUID. Usamos los dos iguales a los de la plantilla, así que funciona con cualquiera de las dos opciones del diálogo.
- **Qué pin es cada uno:** sale de la netlist de la propia plantilla. Por ejemplo, D13 es el pin 5 de J2, D2 el 6 de J4 y A0 el 1 de J3.
- **Cómo se probó** (`probar_kicad_pcb.py`, con KiCad 10.0.3):
  - abre la placa de la plantilla, reconoce J1–J4 por su referencia y agrega las piezas nuevas dentro del contorno;
  - el DRC ve las 9 conexiones por trazar de la T1 y **ningún solape**;
  - como control, la huella vieja del Uno con un LED encima sí da `courtyards_overlap`, el mismo error que encontró Efraín.
- **Los demás pines de los conectores quedan sin red.** El Uno ya une por dentro sus tres GND, así que no hace falta trazar pistas entre ellos.

![La T1 sobre la plantilla del shield, armada por la prueba](../docs/capturas/kicad-shield-t1.png)

## 44. El esquema del circuito (`contrato/circuito.schema.json`)

> Hecho el 8 de octubre de 2026. Cierra la parte de la etapa 0 que pide «el formato del circuito y su esquema».

Hasta aquí, las reglas del circuito estaban en tres lugares: la prosa de `CONTRATO.md`, el código de `normalizar()` en el lienzo y la cabeza de quien lo escribió. Ahora hay un archivo que manda, y pruebas que obligan al código y a los ejemplos a estar de acuerdo con él.

```
                      contrato/circuito.schema.json   ← manda: pines, colores, giros, huecos
                                    │
        ┌───────────────────────────┼─────────────────────────────┐
        ▼                           ▼                             ▼
  el código dice lo mismo     los ejemplos lo cumplen       lo que guarda el lienzo lo cumple
  (probar_contrato.js)        (probar_contrato.js)          (probar_protoboard.py, en Chromium)
  · pines del dibujo del Uno  · CONTRATO.md, sección 4      · después de agregar, encajar,
  · catálogo y colores        · los 5 de la página            mover, girar y borrar
  · 400 huecos de la          · 19 errores rechazados       · cada ejemplo de la página
    protoboard                · lo nuevo, aceptado
  · tabla de KiCad
                                    ▲
                      pruebas/fixtures/ (npm run fixtures, desde TecnoBloques)
                      · cada .tbq.json y su circuito · cada .hex corriendo en el chip
```

### Dos capas de revisión

| Capa | Quién | Qué revisa | Ejemplo de mensaje |
|---|---|---|---|
| Forma | el esquema (con `ajv`) | Tipos, valores permitidos, patrones | `/componentes/0/rot must be equal to one of the allowed values [0,90,180,270]` |
| Referencias | `pruebas/contrato.js` | Que lo nombrado exista | `cable 0 (placa.D13 → led9.anodo): no hay ninguna pieza «led9»` |

Un esquema JSON no puede decir «este cable llega a una pieza que está en la lista de piezas»: solo mira cada valor por separado. Por eso hay una segunda capa, que **lee los pines del propio esquema**, así que no repite la tabla.

### Tolerante con lo nuevo

El contrato promete que una pieza nueva no rompe a una versión vieja (sección 4), y que agregar piezas o campos sube solo la versión menor (sección 8). Por eso:

- un `tipo` que el esquema no conoce **es válido** (se muestra como «desconocido»);
- un campo que no conoce **es válido** (TecnoBloques conserva los campos que no conoce);
- lo que sí conoce lo revisa estricto: un LED «morado» o un giro de 45° no pasan.

### Las fixtures

`npm run fixtures` copia de `../TecnoBloques/test/salida/<caso>/` cada `<caso>.tbq.json` y `<caso>.hex`. Se commitean, para que las pruebas corran sin la carpeta hermana. `probar:fixtures` revisa el formato del proyecto, su circuito si trae, y corre cada `.hex` del ATmega328P un segundo en el chip, con el mismo núcleo del Worker.

Hoy son 16 casos de la 0.2.5, y **ninguno trae circuito**, porque se generaron antes del simulador. El siguiente paso, del lado de TecnoBloques, es un caso con la T1 en protoboard.

## 45. El servo (pieza Tecno: SG90 y MG90S)

> **Actualizado el 9 de octubre de 2026, con medidas de un SG90 del kit:** `write(0/90/180)` llega a 7°, 90° y 175° (`angulos`); la corriente es de 6 mA en reposo y 590 mA bloqueado; y el control empuja **en proporción a lo que falta** (`bandaGrados` = 8), así que un barrido lento pide ~100 mA y no la corriente de arranque en cada paso. Registros: `validacion/2026-10-09-servo-angulos.md` y `2026-10-09-servo-corriente.md`.

> Hecho el 8 de octubre de 2026. Es la segunda pieza Tecno y la primera con las tres partes: dibujo, modelo eléctrico y modelo lógico. Todo está en [src/piezas/servo.js](src/piezas/servo.js).

**Una sola pieza, dos modelos.** Comparten la forma, el conector y la manera de recibir órdenes. Cambian el color (azul translúcido o negro), los engranajes (plástico o metal) y el consumo. La propiedad `modelo` elige cuál.

```
        programa (librería Servo)                    núcleo (en el Worker)                      lienzo
  servo.write(90) ─► Timer1 genera un pulso    ┌────────────────────────────────┐
  cada 20 ms en el pin 9 ───────────────────►  │ medirPulsos(): subida → bajada  │
                                               │ = 1472 µs → objetivo 90°        │
                                               │ avanzarServos() cada 1 ms:      │   foto.servos   ┌──────────────┐
                                               │  gira a 600 °/s · V/4,8         │ ──────────────► │ brazo girado │
                                               │  corriente: reposo / movimiento │   {angulo, i}   │ (transform)  │
                                               │  / arranque                     │                 └──────────────┘
                                               └────────────────────────────────┘
```

### Las tres partes

| Parte | Qué hace | Dónde |
|---|---|---|
| Dibujo | SVG a escala (1 mm = 3,78 px) desde las medidas del SG90. El brazo es un grupo `data-brazo` que se gira con `transform`. El conector tiene los pines a 0,1": encaja en la protoboard | `dibujarServo()`, `giroBrazo()` |
| Modelo lógico | Mide el ancho de cada pulso con el ciclo exacto del cambio de pin. Con la librería Servo, 544 µs = 0° y 2400 µs = 180°. Ignora pulsos fuera de 400–2700 µs y cambios menores que la banda muerta (5 µs) | `crearServo().pulso()` |
| Movimiento | Gira hacia el objetivo a la velocidad de la hoja de datos (0,1 s por 60° a 4,8 V), proporcional al voltaje: a 3,3 V va más lento | `crearServo().avanzar()` |
| Modelo eléctrico | Pide corriente según lo que hace: quieto, moviéndose, o arrancando (los primeros 30 ms de cada movimiento, casi la corriente de bloqueo). Escala con el voltaje | `crearServo().corriente()` |

### Los datos de cada modelo (por validar con el multímetro)

| | SG90 | MG90S |
|---|---|---|
| Engranajes | plástico | metal |
| Torque (4,8 V) | 1,8 kg·cm | 1,8 kg·cm (2,2 a 6 V) |
| Velocidad (4,8 V) | 0,1 s / 60° | 0,1 s / 60° |
| Quieto / moviéndose / arranque | 10 / 200 / 650 mA | 10 / 250 / 700 mA |

Los consumos cambian mucho entre fabricantes y clones: el SG90 bloqueado va de unos 360 a 750 mA según la fuente. Por eso son valores de partida, y la validación con los servos del kit los ajusta (LEEME, «Validar el servo y la energía del USB»).

### Lo que revisa el núcleo de cada servo (`armarServos()`)

- **La señal:** a qué pin del chip llega `SIG` (por cables, la protoboard o los dos).
- **La alimentación:** si `VCC` está en 5V, en 3,3V o en un pin, y si `GND` está a tierra.
  - Sin GND o sin alimentación, no se mueve ni consume.
  - Alimentado desde un pin (error común en el aula), no se mueve y avisa: «un pin da hasta 40 mA y el servo pide unos 200 mA al moverse. Conecta el cable rojo a 5V».
- **Un servo conserva su ángulo** aunque se mueva un cable o se reinicie la placa, porque es una pieza física.

### En KiCad

En la placa, el servo es un conector macho de 3 pines (`PinHeader_1x03`) con el símbolo `Motor:Motor_Servo`: 1 = señal, 2 = + y 3 = −. Es el mismo orden que el conector del servo (naranja, rojo, marrón).

## 46. La energía del USB (no idealidad `limiteUSB`)

> **Actualizado el 9 de octubre de 2026, con medidas en un PC del aula:** el camino del USB es **5,11 V − 1,66 Ω** (no 0,4 Ω). El 5V se resuelve **junto con los servos** en cada milisegundo (un servo arrancando es como una resistencia), y el reinicio lo dispara el **bajo voltaje** (< 2,7 V). Con 4 SG90 no se reinicia (como la placa real); desde 5, sí. Las tablas de abajo son de la primera versión. Registro: `validacion/2026-10-09-usb-5v.md`.

> Hecho el 8 de octubre de 2026, a pedido de Efraín: que se vea cuando varios servos piden más de lo que da el USB. Ningún otro simulador lo muestra. Está en [src/energia.js](src/energia.js) y se revisa cada milisegundo en el núcleo.

```
 USB del PC (5,0 V) ──[fusible 500 mA]──[cable y transistor ≈ 0,4 Ω]── 5V de la placa ── placa (50 mA), circuito y servos
```

| Efecto | Cuándo | Qué se ve | De dónde sale el valor |
|---|---|---|---|
| Caída | siempre | el 5V baja (unos 4,8 V a 500 mA) y los servos giran más lento | 0,4 Ω: valor de partida |
| Reinicio | un golpe de corriente mayor que el que deja pasar el puerto | la placa se reinicia: el programa vuelve a `setup()`, los servos se quedan donde estaban | 1,5 A: valor de partida (cambia con cada PC) |
| Apagado | más de 500 mA sostenidos | el fusible se calienta, se abre y la placa se apaga (LED ON apagado); vuelve sola a los 3 s, cuando se enfría | fusible MF-MSMF050-2 del Uno: sostiene 0,5 A, se dispara desde 1 A, 0,15 s a 8 A |

**Por qué varios servos reinician la placa:** al empezar a moverse, cada servo pide casi su corriente de bloqueo por unos milisegundos. Si arrancan juntos, esos picos se suman:

| SG90 arrancando a la vez | Pico | 5V más bajo | Resultado |
|---|---|---|---|
| 1 | 0,72 A | 4,72 V | funciona |
| 2 | 1,40 A | 4,47 V | funciona |
| 3 | 1,96 A | 4,28 V | se reinicia una y otra vez |
| 4 | 2,37 A | 4,09 V | se reinicia una y otra vez |

El bucle es el mismo que se ve en el aula. Al reiniciarse, `attach()` manda los servos a 90°; todos arrancan a la vez y la placa se reinicia de nuevo. El aviso sale una vez, pero la tabla cuenta los reinicios y cada uno queda en el evento `reinicio_placa`.

**El reloj no retrocede.** Un reinicio crea un chip nuevo, y el núcleo guarda en `base` los ciclos de los chips anteriores. Así, para el Worker el tiempo sigue avanzando.

**Lo que se mide:**
- `foto.energia`: corriente promedio, pico del último segundo (como el «máximo» de un multímetro: el golpe dura milisegundos), voltaje del 5V, calor del fusible (0 a 1), si está apagada y cuántos reinicios hubo.
- La tabla de la página lo muestra en la fila «USB (placa y circuito)».

**En modo ideal** (`limiteUSB` apagada) el USB no tiene límite: el mismo circuito con cuatro servos funciona. Así se compara cómo debería funcionar con cómo funciona de verdad.

## 47. La mano es el mouse (entrada al aire, medida en la placa real)

> Hecho el 9 de octubre de 2026, a partir de la prueba de Efraín con `validar_flotante` (`validacion/2026-10-09-entrada-flotante.md`). Efraín aprobó el modelo antes de implementarlo.

**Lo que mostró la placa real:** una entrada al aire **no cambia sola**. Se queda en su nivel, porque casi no tiene fugas. Pero con la mano cerca, el cuerpo funciona como una antena que capta la **red eléctrica de 60 Hz**, y la entrada la sigue: unos 120 cambios por segundo y 35 % del tiempo en ALTO.

```
 lienzo (página)                       simulador          Worker                núcleo (cada 1 ms)
 mouse sobre un pin o un cable  ──►  _alAcercar(refs) ──► {tipo:'mano'} ──►  ponerMano(refs)
 (solo mientras se simula;                                                      │
  se avisa solo cuando cambia)                                                  ▼
                                                     ¿la mano toca el grupo de la entrada al aire?
                                                     (por conducción: cables, protoboard, resistencias,
                                                      potenciómetros y botones presionados)
                                                        sí → nivel = sin(2π · 60 Hz · t) > 0,454  (35 % ALTO)
                                                        no → se queda; cambia al azar, en promedio cada 10 s
```

| Parámetro | Valor | De dónde sale |
|---|---|---|
| `RED_HZ` | 60 | La red eléctrica de Colombia |
| `ZUMBIDO_UMBRAL` | cos(0,35 π) ≈ 0,454 | 35 % del tiempo en ALTO, como en la placa |
| `CAMBIO_AL_AIRE_POR_MS` | 1/10 000 | Sin nada cerca, 0 cambios en 8 s en la placa |

- **Analógica:** con la mano encima, `analogRead()` lee la onda de 60 Hz de punta a punta (0 a 1023). Ojo: un programa que lee cada 100 ms ve casi siempre el mismo punto, porque 100 ms son justo 6 ciclos; es el efecto estroboscópico, y también pasa en la placa real.
- **En modo ideal** (`entradaFlotante` apagada), la entrada al aire lee BAJO y la mano no hace nada.
- **El tiempo es el simulado** (`ms()`): si el simulador va más lento que el reloj real, la onda también va más lenta, como todo lo demás.

**Para qué sirve en el aula:** el aprendiz olvida la resistencia pull-down y su circuito parece funcionar, porque el LED queda quieto. Pero al pasar el mouse por el cable del botón, el LED se enciende a medias. Es lo mismo que pasa en la mesa al acercar la mano, y lo lleva a descubrir para qué sirve la pull-down.

**Cómo se comparó:** con el mismo programa en los dos lados. La placa con la mano dio de 225 a 269 cambios en 2 s y 35,3 % en ALTO; el simulador, con el mouse, `cambios 240 alto 35.1 %`.

## 48. El promedio de la vista (señales más lentas que una foto)

> Hecho el 10 de octubre de 2026. Salió de las validaciones del 9 oct: la tabla decía «Pin 9: 1,84 V» con un servo, y el LED de la mano saltaba entre 0 y 83 % de una foto a otra.

**El problema.** Cada foto promedia lo que pasó en su ventana (≈16 ms), cortada en períodos completos (sección 27). Con el PWM a 490 Hz entran unos 8 períodos, y el promedio sale exacto. Pero una señal más lenta que la ventana no alcanza a dar un período completo:
- el pulso de un servo (50 Hz: 1,5 ms en ALTO cada 20 ms);
- la red de 60 Hz que capta «la mano».

Cada foto toma un pedazo distinto de la onda, y su promedio salta. Algunas ventanas del servo ni siquiera tienen un cambio de pin.

**El arreglo: promediar como el ojo y el multímetro**, que integran unos 100 ms:

```
 ventana de la foto ──► promedio crudo ──┬──► analogRead() (sin cambio)
                                          │
                                          ▼
                         ¿algún pin cambió en los últimos 50 ms?
                            no → la vista es el valor exacto, al instante (un botón, un LED fijo)
                            sí → promedio móvil: vista += α · (crudo − vista),  α = 1 − e^(−ventana / 100 ms)
```

- **`suavizar()`** recorre la medición (voltajes, LED, resistencias, pines, PWM) y empareja las listas por `id` o `pin`, así una pieza nueva entra con su valor. Devuelve un objeto nuevo: las soluciones guardadas no se tocan.
- **Lo que NO cambia:**
  - las fallas, que se revisan con el valor de cada combinación (el pico es el que daña);
  - `analogRead()`;
  - el ciclo útil del PWM y los servos.
- **Resultado:**
  - el pin 9 del servo a 90° marca entre 0,31 y 0,38 V, como un multímetro (~0,37 V);
  - el LED de la mano se queda entre 33 y 49 %;
  - el PWM del pin 9 sigue exacto (50,0 % y 20,0 % en `test:simulador`).
- **Constantes** (`src/nucleo.js`): `PROMEDIO_VISTA_MS = 100` y `QUIETA_MS = 50`.

## 49. Potencia: shield L293D, motor TT y batería LiPo (piezas Tecno)

> Hecho el 10 de octubre de 2026. Tres piezas Tecno nuevas, con dibujo propio: [src/piezas/shield_l293d.js](src/piezas/shield_l293d.js), [src/piezas/motor_tt.js](src/piezas/motor_tt.js) y [src/piezas/bateria_lipo.js](src/piezas/bateria_lipo.js). La lógica que las une está en [src/potencia.js](src/potencia.js). Los valores son de hojas de datos: **falta validarlos con la placa real** (LEEME, «Validar la shield L293D y el motor TT»).

**La shield va «desarmada» por dentro:** se ven y se nombran sus tres integrados (U3 74HC595, U1 y U2 L293D), sus borneras, EXT_PWR, el puente PWR, los conectores de servo y el botón de reinicio. Va montada sobre el Uno, en su mismo lugar: no se arrastra ni se gira, y hay una sola. Las conexiones salen de la librería del kit (AFMotor_R4, BSD-3) y de las hojas de datos, no del esquema de Adafruit (que es «compartir igual»).

```
  programa (AFMotor_R4)                         núcleo: potencia.js, cada cambio de pin y cada 1 ms
  motor1.run(FORWARD) ─► shiftOut por           ┌───────────────────────────────────────────────┐
  D8 (datos), D4 (reloj), D12 (cierre) ───────► │ 74HC595: reloj ↑ → entra un bit; cierre ↑ →   │
  D7 en BAJO (habilita) ───────────────────────►│ las salidas Q0–Q7 = sentido de cada motor      │
                                                │ (M1 = Q2, Q3 · M2 = Q1, Q4 · M3 = Q5, Q7 ·     │
  motor1.setSpeed(200) ─► PWM en D11 ─────────► │  M4 = Q0, Q6)                                  │
  (M2 = D3, M3 = D6, M4 = D5)                   │ PWM: ciclo útil de cada ms, suavizado (4 ms)   │
                                                │ L293D: A ≠ B → V = útil × (VS − caída)         │
  batería en EXT_PWR ─► VS de los L293D ──────► │        A = B → frena · sin PWM → gira libre    │
  (con el puente PWR, también el VIN del Uno)   │ motor: V = I·R + k·ω ; J·dω/dt = k·I − b·ω     │
                                                │ batería: V = 8,4 − 1,2 Ω × corriente           │
                                                └───────────────┬───────────────────────────────┘
                                                                │ foto.piezas { rpm, giro, velocidad, i, voltios }
                                                                ▼
                                        lienzo: la rueda gira, RPM, flecha «adelante/atrás · N cm/s»
```

### Las tres piezas

| Pieza | Dibujo | Propiedades | Pines |
|---|---|---|---|
| `shield_l293d` | La Rev4 a escala del Uno, con los tres integrados de pie y en fila como en la placa real (L293D U1, 74HC595 U3 y L293D U2, con su nombre a lo largo del chip), sin agujeros de montaje (la shield no los tiene), las dos borneras a la misma distancia del borde, borneras M1–M4, EXT_PWR (+M y GND), puente PWR (con o sin capuchón), LED de energía (prende si los motores tienen energía) y conectores SERVO_1 y SERVO_2 | `puentePWR` (sí/no) | `M1A` … `M4B`, `GND_IZQ`, `GND_DER`, `EXT_POS`, `EXT_GND`, `S1_*`, `S2_*` |
| `motor_tt` | El motorreductor amarillo de lado. Vista «eje»: el eje de doble plano girando y las RPM encima. Vista «rueda»: la rueda de 66 mm girando y, debajo, la flecha de hacia dónde la rueda, apoyada en el piso, empujaría el cuerpo del robot (si en el dibujo gira contra el reloj, la flecha apunta a la izquierda), con «adelante» o «atrás» y la velocidad | `vista` (eje o rueda), `lado` (izquierdo o derecho: refleja el dibujo) | `A` (rojo), `B` (negro) |
| `bateria_lipo` | El paquete 2S de 1300 mAh, con su cable de potencia (rojo y negro) y el de balance (JST-XH, solo dibujado: lo usará el probador de celdas) | `carga` (llena 8,4 V, nominal 7,4 V, descargada 6,4 V) | `POS`, `NEG` |

**El lado del robot** es el error más común con un carro: con los dos motores cableados igual y `FORWARD`, una rueda empuja hacia adelante y la otra hacia atrás, porque el motor derecho está montado al revés. En el simulador se ve sin mover el carro: la flecha de la rueda derecha sale roja, «atrás».

### Lo que hace el lienzo con ellas

- **Dibujo que cambia de tamaño:** el motor con la rueda es más grande que con el eje. La definición trae `dibujo.marco(props)` (tamaño y pines según las propiedades), y al cambiar la vista o el lado el lienzo rehace el dibujo (`rehacerVista`), sin dejar pines repetidos.
- **Varias propiedades por pieza** (`campos` en el catálogo) y valores sí/no (el puente PWR se guarda como `true` o `false`, no como texto).
- **Pieza montada** (`montada: true`): va en (0, 0), justo encima del Uno y debajo de lo demás; arrastrarla mueve la vista; no tiene «Girar» y el menú no deja agregar otra.
- **Los conectores de servo de la shield** ya son los pines 10 (SERVO_1) y 9 (SERVO_2), y sus GND son el GND del Uno (`PUENTES_SHIELD`, en `conexiones.js`). Con el puente PWR puesto, EXT_POS queda unido al VIN.

### Lo que revisa el núcleo (`potencia.armar`)

| Situación | Qué pasa | Falla |
|---|---|---|
| Batería descargada | Avisa en la primera foto: riesgo de perder las celdas | `bateria_baja` |
| La batería baja de 3,0 V por celda con los motores | Avisa | `bateria_celdas` |
| Batería al revés, en corto o en el pin 5V | Avisa; no alimenta nada | `bateria_invertida`, `bateria_corto`, `bateria_en_5v` |
| Los motores reciben la orden pero no hay batería en EXT_PWR | No giran: el USB no alimenta los bornes | `motores_sin_energia` |
| Motor en un pin del chip | Avisa: un pin da 40 mA | `motor_en_pin` |
| Más de 0,6 A por un canal del L293D por medio segundo (rueda trabada) | Avisa: el integrado se calienta | `l293d_corriente` |
| Motor directo al 5V y GND | Gira con el 5V del USB y su corriente entra a la energía del USB (golpe de ~1 A al arrancar) | — |
| Batería en el VIN con más de 6,6 V | El Uno toma la energía del VIN (su regulador da 5 V) y el USB deja de entregar | — |

### La caída del L293D (no idealidad `caidaL293D`)

Sus transistores son bipolares: entre los dos lados del puente se comen unos **1,3 V más 1 V por amperio** (medido el 15 oct: 1,43 a 1,47 V con 0,13 A; ver la sección 65). Con la batería llena, al motor le llegan unos 6,5 V a toda velocidad; en modo ideal, todo lo que da la batería. Por eso el carro va más lento con la shield que conectado directo a la batería.

**La shield se puede agregar con la simulación corriendo.** El 74HC595, el pin 7 (habilitación) y el PWM de los pines 11, 3, 6 y 5 se siguen siempre, haya o no shield. Si el aprendiz la agrega después, ya sabe cómo están los pines: por ejemplo, con D7 en BAJO y un `analogWrite(…, 255)` que dejó el pin quieto en ALTO, los motores arrancan sin esperar un cambio (lo encontró la revisión de código del 11 oct).

### El PWM de los motores

AFMotor_R4 pone el PWM a unos 1000 Hz: en un milisegundo puede haber uno o dos pulsos, y el ciclo útil de cada milisegundo salta. Se suaviza con una constante de tiempo de 4 ms (unos pocos períodos), como lo hace la inductancia del motor; un pin quieto en 0 o en 1 se toma exacto. El motor siente el voltaje medio: ciclo útil × (VS − caída).

### Lo que muestra la tabla de mediciones

Una fila por motor (canal, voltaje medio en sus bornes, corriente, RPM y «adelante/atrás · N cm/s» según su lado), una para la shield (voltaje de los motores, el puente PWR y si el Uno toma la energía del VIN) y una por batería (voltaje, corriente y voltios por celda, con «cárgala» por debajo de 3,3 V).

### Pruebas

- `pruebas/probar_potencia.js` (Node, con `programas/carro_motores`): 24 comprobaciones. Adelante a 200 = 179 RPM con 5,4 V; atrás a 255 = 227 RPM con 6,8 V (caída de 1,57 V); ideal = 279 RPM; descargada = 128 RPM y aviso en la primera foto; sin batería, batería al revés, motor en un pin y motor al 5V del USB.
- `pruebas/probar_carro.py` (Chromium): agregar las tres piezas, la shield fija y única, el puente, las vistas y el lado del motor, las cargas de la batería y el ejemplo del carro simulando (la rueda gira, la tabla y la flecha).
- `probar_contrato.js` revisa los pines de cada vista del motor y los valores de cada campo contra el esquema.

## 50. Un 72 % más rápido: la llamada a `avrInstruction`

> Hallado el 10 de octubre de 2026, buscando por qué el carro iba lento en la app de Efraín.

Al perfilar el núcleo con Node (`node --cpu-prof`), el 14 % del tiempo se iba en dos funciones `get` que no son del simulador. Son del empaquetador: avr8js viene como CommonJS, y esbuild deja cada cosa importada de él detrás de dos «getters» de módulo. `avrInstruction(cpu)` se llama una vez por instrucción del chip, millones de veces por segundo, y cada vez pasaba por los dos getters. Además, eso impedía que el motor de JavaScript la optimizara junto con el ciclo.

**El arreglo** (`src/chip.js`) es una línea: guardar la función una sola vez, `const ejecutarInstruccion = avrInstruction;`, y llamar a esa.

| Programa (Node, este PC, con cargador) | Antes | Después |
|---|---|---|
| Parpadeo en el pin 13 | 1,48 × el chip real | 2,37 × |
| Carro con la shield, los dos motores y la batería | 1,32 × | 2,27 × |

Sirve para todos los programas, no solo para el carro. El cálculo de la shield, los motores y la batería es poco: el carro va apenas 4 % más lento que un parpadeo. El resto del tiempo es la emulación del chip.

**El dibujo:** el motor solo toca su texto y su flecha cuando cambian (antes rehacía la flecha unas 60 veces por segundo). Con TecnoBloques maximizado y las dos ruedas girando, el hilo de la página trabaja unos 90 ms por segundo, y el simulador va en otro hilo (el Worker).

### El peor caso: órdenes a los motores sin pausa (10 oct)

Efraín armó con bloques `repetir por siempre → avanzar(255)`, y `avanzar` llama `setSpeed` y `run` de dos motores. Sin pausa, cada `run()` manda 8 bits al 74HC595: el chip cambia los pines 4, 8 y 12 decenas de miles de veces por segundo. Con ese programa el simulador iba al **22 %** (`programas/carro_continuo`).

En cada cambio de pin el núcleo recalculaba qué entradas quedan al aire y qué lee cada una, aunque esa combinación de pines ya hubiera salido mil veces. Cuatro arreglos, todos del mismo tipo (no repetir lo que ya se sabe):

| Arreglo | Dónde |
|---|---|
| Lo que leen las entradas (al aire, niveles digitales y voltajes analógicos) se guarda por combinación de pines (`planDe`), como las soluciones del circuito | `nucleo.js` |
| Una entrada o un canal analógico solo se escribe en el chip si su valor cambió | `nucleo.js` |
| La clave de cada combinación es un número en base 4 que se actualiza con los pines que cambiaron, en vez de armar un texto de 20 letras | `nucleo.js` |
| El chip mira solo los pines del puerto que se escribió, y `PinState` es una copia propia (sin los getters de esbuild) | `chip.js` |

Resultado en Node: de **0,22×** a **1,29×** el chip real con ese programa. El carro del ejemplo va a 2,2×. `probar_potencia.js` lo prueba (sección 7) e informa la velocidad.

## 51. La biblioteca de piezas y la ficha

> Hecho el 10 de octubre de 2026 (punto 4 del orden acordado con Efraín). Datos en [src/biblioteca.js](src/biblioteca.js); el panel y la ficha, en [src/lienzo.js](src/lienzo.js).

```
  «+ Agregar»                                         pieza elegida
  ┌──────────────────────────┐                        ┌───────────────────────────────┐
  │ Piezas                 × │                        │ Servo servo1        detalles ▾│  ← plegada: nombre y propiedades
  │ [Buscar: motor, luz, …]  │  buscarPiezas(texto):  │ Modelo [SG90 ▾]               │
  │ BÁSICAS                  │  sin tildes ni         ├───────────────────────────────┤
  │  ▭ Protoboard            │  mayúsculas; todas     │ Para qué sirve (descripción)  │  ← abierta: además los detalles
  │  ▭ Resistencia  ─clic──► │  las palabras          │ Datos (del mismo modelo)      │
  │  ▭ LED      ─arrastre──► pieza donde se suelta    │ Pines                         │
  │ ENTRADAS …               │                        │ ✓ Probado con la placa real   │
  └──────────────────────────┘                        └───────────────────────────────┘
```

**Datos, no dibujo.** Cada pieza tiene en `FICHAS` su nombre, una descripción corta (para qué sirve y el error típico), las palabras con que la buscaría un aprendiz, sus pines, `datos(props)` y `validacion(props)`. Los datos salen de los mismos modelos del simulador (`LED`, `MODELOS_SERVO`, `MOTOR_TT`, `CARGAS_LIPO`): si cambia un modelo, cambia la ficha. `CATEGORIAS` dice en qué grupo va cada una.

**El panel** se arma una vez al crear el lienzo (quien use el lienzo encuentra los botones `data-accion="agregar"` de siempre). Cada pieza lleva su miniatura: el SVG de las piezas Tecno y de la protoboard, o el elemento de Wokwi reducido con `zoom`. El buscador filtra escondiendo, sin rehacer nada.

**Arrastrar:** al apretar sobre una pieza del panel se captura el puntero; pasado el umbral de clic aparece un «fantasma» con la miniatura. Al soltar sobre el lienzo (y no sobre el panel), la pieza queda centrada en ese punto (`agregarComponente(tipo, punto)`) y, si cae sobre la protoboard, se encaja como siempre.

**La ficha** reemplaza las propiedades de la barra (la barra queda con el nombre, Girar y Borrar):

- va **del lado contrario a la pieza elegida**, para no taparla;
- se vuelve casi transparente mientras se arrastra algo o se mueve la vista;
- no se muestra con el panel de piezas abierto;
- **plegada** muestra solo el nombre y las propiedades. Empieza abierta si el lienzo mide 900 px o más (la página de prueba, el circuito ampliado) y plegada en la vista dividida de TecnoBloques. Después queda como la deja el aprendiz.

**La validación a la vista:** «✓ Probado con la placa real» (verde) o «◐ Por probar con la placa real» (ámbar), con la fecha y lo medido. Es la regla 2 del proyecto hecha visible: el aprendiz y el instructor saben qué tan confiable es cada modelo. Hoy: resistencia, LED, botón, potenciómetro y SG90 probados; MG90S, motor TT, shield y batería por probar.

**Pruebas:** `probar_biblioteca.py` (Chromium, 27 comprobaciones): categorías, miniaturas, buscador («luz», «pila», «POTENCIOMETRO», «rueda carro», sin resultados), Enter, arrastrar al lienzo y al panel, Esc, la ficha del servo con los dos modelos, el lado contrario, plegar y la protoboard. `probar_contrato.js` revisa que cada pieza del catálogo tenga categoría y ficha completa.

## 52. El cable de balance y el probador de celdas (pieza Tecno)

> Hecho el 10 de octubre de 2026 (punto 5 del orden acordado), con la foto del probador del kit y la descripción de Efraín de su pantalla. Archivos: [src/piezas/probador_lipo.js](src/piezas/probador_lipo.js) y [src/piezas/bateria_lipo.js](src/piezas/bateria_lipo.js); la lógica, en [src/potencia.js](src/potencia.js).

```
   LiPo 2S                                   probador 1-8S                       pantalla (cada 1 s; al conectar, «2CS»; antes del total, «ALL»)
  ┌───────────────┐  BAL0 (−) ─────────────► −                                ┌─────┐┌─────┐┌─────┐┌─────┐┌─────┐┌─────┐
  │ celda 1  3,7 V│  BAL1 (medio) ─────────► 1   celda 1 = V(1) − V(−)        │7.40 ││ 2S  ││ -1- ││3.70 ││ -2- ││3.70 │ → otra vez
  │ celda 2  3,7 V│  BAL2 (+) ─────────────► 2   celda 2 = V(2) − V(1)        └─────┘└─────┘└─────┘└─────┘└─────┘└─────┘
  └───────────────┘  POS (+) y NEG (−): los mismos puntos que BAL2 y BAL0    si una celda < umbral: pita y parpadea
```

**El cable de balance.** La batería tiene ahora sus 3 pines de balance (`BAL0`, `BAL1`, `BAL2`). Por dentro, `BAL0` es el mismo − del cable negro y `BAL2` el mismo + del rojo (`conexiones.js` los une), y `BAL1` es el punto entre las dos celdas. Cada carga dice el voltaje de cada celda; con corriente, cada celda pierde su parte de la caída por la resistencia interna.

**Carga «desbalanceada»** (la habíamos dejado para después): 7,4 V en total, pero 3,95 + 3,45 V. Avisa al empezar (`bateria_desbalanceada`), y es la que hace útil al probador: el total parece normal, pero una celda está baja.

**El probador** se alimenta de la misma batería, por el cable de balance (necesita el − y al menos el 1). Mide, en orden, el voltaje de cada pin respecto al anterior: C1 − (−), C2 − C1… hasta el primer pin sin conectar. Así cuenta las celdas («2S», «3S») y, con un cable cruzado, muestra una celda rara (7,4 V y 0 V) y pita, como el real.

**La pantalla** son 3 dígitos de 7 segmentos dibujados uno a uno (`data-seg`); `pantallaProbador(estado, ms)` es una función pura que dice qué mostrar en cada instante: el total («7.40», o «12.6» desde 10 V), «2S», y por cada celda «-1-» y su voltaje. Avanza con el tiempo simulado. Con la alarma, la pantalla parpadea 4 veces por segundo y se dibujan las ondas del pitido junto a los zumbadores. El umbral (2,7 a 3,8 V, o apagada) se elige en la ficha; en el real se cambia con su botón.

**Solo se ve al simular:** el probador no usa el Arduino, pero el simulador calcula su pantalla en el Worker, junto con la batería.

**Pruebas:** `probar_potencia.js`, sección 8 (15: la secuencia, «12.6», nominal, desbalanceada con alarma en 3,5 V, descargada, alarma apagada, cables cruzados, sin −, una sola celda y el balance por los cables de potencia) y `probar_probador.py` (Chromium, 10: los 9 pines, los 3 del balance, la pantalla leída segmento a segmento, la tabla, el pitido y el apagado al detener).

## 53. La shield L293D desarmada en la netlist de KiCad

> Hecho el 11 de octubre de 2026, con la decisión de Efraín: **desarmada, con todos los componentes adicionales** (los 4 condensadores y el LED de energía con su resistencia). Código: [src/kicad.js](src/kicad.js) (`SHIELD_KICAD`, `FUERA_KICAD`).

**Para qué:** con el carro armado en el simulador, «Llevar a KiCad» entrega la shield de motores en sus piezas reales, y el aprendiz diseña su propia placa sobre la plantilla «Arduino Uno Shield». Funciona con el mismo programa del kit, porque usa los mismos pines y las mismas salidas del 74HC595 que AFMotor_R4.

```
   Uno (J1–J4)                U3 74HC595                        U1 L293D (M1 y M2)        J5 bornera
   D8  ─────────────────────► 14 SER                            1  EN1,2 ◄──── D11
   D4  ─────────────────────► 11 SRCLK        Q2 (2) ─ IN_M1A ─► 2  1A    3  1Y ─ M1_A ──► 1
   D12 ─────────────────────► 12 RCLK         Q3 (3) ─ IN_M1B ─► 7  2A    6  2Y ─ M1_B ──► 2
   D7  ─────────────────────► 13 ~OE                                                  GND ► 3
   +5V ─────────────────────► 10 ~SRCLR, 16   Q1 (1) ─ IN_M2A ─► 10 3A   11  3Y ─ M2_A ──► 4
                                              Q4 (4) ─ IN_M2B ─► 15 4A   14  4Y ─ M2_B ──► 5
                                                                 9  EN3,4 ◄─── D3
                                              Q5, Q7, Q0, Q6 ──► U2 (M3 y M4), EN ◄── D6 y D5 ──► J6
   J7 EXT_PWR + ── VMOT ──► pata 8 de U1 y U2 · C4 100 µF · R1 1k → D1 (LED) · JP1 (PWR) ──► VIN
   C1, C2, C3 100 nF entre +5V y GND, uno junto a cada integrado · J8 SERVO_1 = D10 · J9 SERVO_2 = D9
```

**De dónde sale cada conexión:**

| Qué | De dónde |
|---|---|
| Pines del Uno (D8, D4, D12, D7; PWM 11, 3, 6, 5) y qué Q del 74HC595 da el sentido de cada motor | AFMotor_R4 (BSD-3). Es `CONEXIONES_SHIELD` en `src/piezas/shield_l293d.js`: **la misma tabla para el simulador y para KiCad** |
| Qué pata es qué en el L293D y en el 74HC595 | Hojas de datos (y los símbolos de KiCad, que coinciden: QA es Q0 en la pata 15) |
| Qué canal lleva cada motor, los condensadores, el LED, el puente PWR | Diseño propio. No se miró el esquema de Adafruit («compartir igual») |

No lleva diodos: el L293D los trae por dentro (es la «D» del nombre).

**Las piezas de afuera** (motor, batería, probador) no van en la placa: una netlist de placa no puede llevar piezas sin huella. Cada una llega por un conector:

- si sus cables van a un conector de la shield (bornera de un motor, EXT_PWR, SERVO_1/2), ese es su conector y no se agrega otro;
- si llegan a la placa por otro lado (un motor directo al 5V, la batería al VIN), aparece una bornera de 2 (o el JST del balance, o la regleta de 9 del probador);
- si no tocan la placa (el balance con el probador), no aparecen;
- **cómo se decide si una pieza de afuera «llega» a la placa:** por los cables propios de cada pin (o la protoboard), con los nodos **sin** los puentes internos de la batería (`calcularNodos(circuito, { balanceInterno: false })`). Dentro de la batería, el − y el + del balance son los mismos puntos que los del cable de potencia; si se contaran, un balance que solo va al probador «llegaría» a GND y a VIN por el cable de potencia y sacaría conectores que no van (lo encontró la revisión de código del 11 oct);
- un servo enchufado a SERVO_1 no repite su conector de 3 pines.

**El puente PWR** es una pieza (JP1): en la netlist sus dos lados son redes distintas, `VMOT` y `VIN`, aunque en el circuito esté puesto.

**Los nombres de las redes** se leen en KiCad: los del Uno (`D11`, `+5V`, `GND`, `VIN`), los de la shield (`VMOT`, `M1_A` … `M4_B`) y los propios (`IN_M1A` … `IN_M4B`, `LED_PWR`). Los pines del Uno que la shield usa por dentro entran aunque no tengan cable, porque en la placa real llegan por los conectores apilables.

**Pruebas:**

- `probar_kicad.js`:
  - el carro: las 19 piezas con sus valores;
  - cada motor contra la tabla de AFMotor_R4, escrita aparte en la prueba (si alguien cambia la tabla de la shield, la prueba lo nota);
  - el 74HC595, VMOT, VIN, los servos y GND;
  - los casos de las piezas de afuera.
- `probar_kicad_pcb.py` (KiCad 10.0.3):
  - las 15 piezas nuevas se arman sobre la plantilla, cada pad encuentra su red y caben dentro del contorno del Uno, giradas si hace falta;
  - el DRC ve 63 conexiones por trazar y ningún solape;
  - el símbolo L293D de KiCad hereda sus patas del L293, y la prueba lo sigue.

## 54. El reloj de los modelos «de cada milisegundo»

> Corregido el 11 de octubre de 2026, con la revisión de código. Código: `correr()` en [src/chip.js](src/chip.js).

Varios modelos avanzan **de a 1 ms simulado**: los servos (giran y piden corriente), los motores TT, la batería, el fusible y el 5V del USB, las entradas al aire, y la entrega de un byte del monitor serial. El chip los llama con `alCadaMs`.

**El error.** `correr(ciclos)` ejecutaba el pedazo que le pedían y, al terminar cada pedazo, llamaba a los modelos, **aunque el pedazo no fuera un milisegundo entero**. El Worker no pide milisegundos exactos: pide lo que debe según el reloj real (por ejemplo 2,3 ms = 16 000 + 16 000 + 4 800 ciclos), así que los modelos corrían más veces de las que tocaba.

```
 antes:   |──── 16 000 ────|──── 16 000 ────|─ 4 800 ─|           3 llamadas en 2,3 ms
                          ▲                ▲          ▲
 ahora:   |──── 16 000 ────|──── 16 000 ────|─ 4 800 ─|─ …        2 llamadas en 2,3 ms
                          ▲                ▲                      (la 3.ª, al cruzar los 3 ms)
          proximoMs = 16 000, 32 000, 48 000…  (en ciclos absolutos del chip)
```

**El arreglo:** el chip guarda en qué ciclo cae el próximo milisegundo (`proximoMs`) y llama a los modelos **solo al cruzarlo**, sin importar de qué tamaño sean los pedazos.

**Por qué las pruebas no lo veían:** las pruebas con Node avanzan de a milisegundos exactos, justo el caso en que el error no aparece. La prueba nueva (`probar_potencia.js`, sección 9) avanza el carro en pedazos de 4 801 ciclos y compara cuánto giró la rueda con el avance exacto. Con el código viejo, la rueda giraba **48°** cuando debía girar **125°**; con el arreglo, igual en los dos casos.

**Qué cambia:** en la app, los servos, los motores y el fusible ahora van al mismo ritmo que en las pruebas de Node, que son las que se compararon con la placa real. Los modelos validados no cambian.

## 55. En TecnoBloques: el monitor para analizar (CSV y gráfico) y los paneles plegables

> Hecho el 11 de octubre de 2026 en TecnoBloques ([src/graficador.js](../../TecnoBloques/src/graficador.js)), con las decisiones de Efraín: CSV con «;» y coma decimal, y el gráfico solo en la pestaña Monitor serial. Se explica aquí, como la conexión de las secciones 31 y 32, porque usa el tiempo del simulador.

```
  placa (Web Serial) ──┐                                  ┌─► CSV  t_ms;origen;linea;min;max…  (Excel en español)
                       ├─► agregarSalida (texto)          │
  simulador ───────────┤                                  │
  (sim.alSerial)       └─► registro.agregar(texto, origen, ms) ──► líneas { t, origen, linea, valores }
                                                          │
                                                          └─► graficador (canvas): una línea por variable
```

**El registro** guarda cada línea completa con su hora, su origen y sus números. Entiende `temp:25 luz:512`, `temp=25`, `Temperatura: 25.3 C`, `min 430 max 431` y números sueltos (`valor1`, `valor2`…). Un `nan` queda como hueco. Una etiqueta debe empezar con letra (así «12:30» no crea columnas), con un tope de 40 columnas y 20 000 líneas.

**La hora:**

- **con la placa:** los ms desde que se conectó;
- **con el simulador:** el **tiempo simulado** (`sim.medidas().msSimulados`). Los datos no dependen de si la simulación iba al 100 % o al 60 %, así que son comparables con los de la placa;
- al reconectar o simular de nuevo, el tiempo de ese origen sigue en vez de volver a 0.

**El CSV:** separado por «;», con coma decimal y la marca UTF-8, para que se abra con doble clic en Excel en español. Una línea que empieza con `= + - @` lleva un apóstrofo, para que Excel no la tome como fórmula.

**El gráfico:**

- **Colores:** 8 en orden fijo (cada variable conserva el suyo), validados con un programa para que se distingan aun con daltonismo, en modo claro y oscuro. Tres de los claros se ven suaves sobre el fondo: por eso cada línea lleva su nombre y su último valor al final, la leyenda tiene casillas y al pasar el mouse se ven los valores.
- **Controles:** pausa (el registro sigue guardando), ventana de 5 a 60 s y escala automática, de 0 a 1023 o de 0 a 5 V. La placa y el simulador no se mezclan: se grafica el origen del último dato.
- **Solo se dibuja a la vista** y cuando llega algo nuevo, para no quitarle tiempo al simulador.

**Los paneles plegables** de la pestaña Circuito: el monitor del simulador y las mediciones se ocultan con un botón arriba a la derecha y le dejan el espacio al circuito. Su estado queda en las preferencias, y con el monitor recogido un punto avisa que llegó texto.

**Pruebas:** `npm run test:graficador` (Node: formatos, líneas en trozos, el tiempo, el CSV, los casos de la revisión) y `test:simulador` (con «Validar: ruido de analogRead()»: variables, casillas, pausa y CSV). Falta probarlo con la placa real (laboratorio).

## 56. Cómo se publica una versión

> Preparado el 11 de octubre de 2026; la primera etiqueta, `v0.1.0`, va después de validar la T3 en el laboratorio. Reglas en [CONTRATO.md](../CONTRATO.md), secciones 1 y 9.

TecnoBloques no usa la carpeta `prototipo/`: instala **una versión fija** desde GitHub, y su instalador del aula solo acepta esa.

```
 TecnoCircuito                                        TecnoBloques
 package.json  "version": "0.1.0"                     package.json
      │                                                 "tecnocircuito": "github:EMariotte/TecnoCircuito#v0.1.0"
      ▼                                                      │ npm install
 npm run preparar-version                                    ▼
   ├─ árbol limpio y la etiqueta no existe             node_modules/tecnocircuito/dist/tecnocircuito.js
   ├─ construir.js --etiqueta → VERSION = "0.1.0"            │
   ├─ copia a dist/tecnocircuito.js (raíz)                   ▼ node build.js  («simulador: etiqueta»)
   ├─ revisa versión, contrato y lo que lleva            dist/TecnoBloques.html
   └─ imprime los pasos: commit, git tag v0.1.0, push        │ npm run instalador
                                                             ▼ empaquetar.js: ¿viene de una etiqueta, con esa versión?
                                                         instalador del aula
```

- **`TecnoCircuito.VERSION`** sale del `package.json` de la raíz. En desarrollo dice `0.1.0-dev`, y solo `preparar-version` arma la exacta (`0.1.0`): una copia en desarrollo nunca se confunde con una versión.
- **El paquete lleva solo lo necesario** (campo `files`): `dist/tecnocircuito.js`, `CONTRATO.md`, `contrato/`, la licencia y el README. Ni el prototipo, ni `validacion/`, ni `investigacion/`.
- **`dist/tecnocircuito.js` de la raíz se commitea solo al etiquetar,** construido desde el código de esa etiqueta (regla 6).
- **El instalador de TecnoBloques se niega** si el simulador es la copia local, o si no viene de `github:EMariotte/TecnoCircuito#vX.Y.Z` con esa misma versión instalada. Probado con un paquete armado a mano (rechazado), sin simulador (aceptado) y con la copia local (rechazada).
- **Ensayo hecho el 11 oct, sin etiquetar:** el paquete instalado desde un archivo local en TecnoBloques; el armado lo tomó como «etiqueta», la app vio la 0.1.0 con contrato 1 y el carro simuló.

## 57. Lo que corrigió la revisión de Codex (R1 a R8)

> Corregido el 11 de octubre de 2026. El informe es [docs/REVISION-CODEX-2026-10-11.md](../docs/REVISION-CODEX-2026-10-11.md) y su diagnóstico, [docs/revision-2026-10-11.cjs](../docs/revision-2026-10-11.cjs). Codex revisa y Claude implementa ([AGENTS.md](../AGENTS.md)). Las 593 pruebas pasaban: ninguna miraba estos casos.

### R1. Dos montajes iguales deben dar lo mismo: se decide por nodo, no por el nombre del cable

`armarRed` ([src/motor/red.js](src/motor/red.js)) creaba la fuente de 5V solo si algún cable decía `placa.5V`, y la de un pin solo si algún cable decía `placa.D9`. Pero la shield une por dentro su conector de servo con esos pines (`PUENTES_SHIELD` en [src/piezas/shield_l293d.js](src/piezas/shield_l293d.js)):

```
   cable directo                       por la shield
   placa.5V ──── r1 ──── placa.GND1    shield1.S2_POS ──── r1 ──── shield1.S2_GND
                                            │ (puente interno)          │
                                         placa.5V                   placa.GND1
   antes: 5 mA                         antes: 0 mA (ningún cable decía «placa.5V»: no había fuente)
   ahora: 5 mA                         ahora: 5 mA
```

**El arreglo:** se calcula el nodo de cada punta de cable (`raicesUsadas`), y un pin de la placa cuenta como conectado si **su nodo** está entre ellos (`conectado(pin)`). Vale para el 5V, el 3,3V, los 20 pines y las entradas: un botón leído por la señal del servo de la shield ahora se lee. La shield sola, sin nada en sus conectores, no conecta ningún pin. Pruebas: `probar_motor.js`, 9c (la resistencia por la shield, un LED en la señal S2 con D9 en ALTO, el corto del + al − del conector y la shield sola).

### R2. Con la placa apagada, el fusible también se enfría con el tiempo simulado

Es el mismo error de la sección 54, en otro camino. Con el fusible abierto el chip no corre, y `seguirApagada` ([src/nucleo.js](src/nucleo.js)) avanza el tiempo. Llamaba a los modelos «de cada ms» **en cada pedazo** del Worker, aunque el pedazo fuera de 4 801 ciclos (0,3 ms). El fusible se enfriaba un milisegundo entero cada vez, unas 3 veces más rápido de lo real, y la placa volvía a encender antes de tiempo.

**El arreglo:** `ciclosApagada` cuenta los ciclos que aún no completan un milisegundo, y los modelos corren solo al completarlo, como `proximoMs` en el chip. Prueba: `probar_nucleo.js` apaga la placa con 4,7 Ω y la deja enfriar avanzando de a 1 ms, de a 4 801 ciclos y con pedazos mezclados. Vuelve a encender a los 2 991 ms en los tres casos (± un pedazo).

### R3. Lo que entregan los pines también sale del USB

```
   USB (5,11 V − 1,66 Ω × I) ──► 5V de la placa ─┬─► 50 mA: la placa sola
                                                 ├─► pin 5V y 3,3V ─► el circuito
                                                 └─► pata VCC del chip ─► pines en ALTO ─► el circuito   ← faltaba
```

Un pin en ALTO saca su corriente del 5V por la pata VCC del chip. Ahora `iCircuito` suma lo que entregan el 5V, el 3,3V **y los pines en ALTO**. Lo que reciben los pines en BAJO no se suma: esa corriente ya salió de otra fuente y se contaría dos veces. El efecto es pequeño (un LED de 20 mA baja el 5V unos 33 mV), pero el fusible y el reinicio ven la corriente completa. `consumo5V` sigue siendo solo lo que sale por el pin 5V. Prueba: el pin 13 con 220 Ω, más otra de 220 Ω en el 5V, da 50 + 22,7 + 20,4 = 93,1 mA.

### R4. El chip entero: 200 mA por VCC y 200 mA por GND

La hoja de datos del ATmega328P da dos límites: **40 mA por pin** y **200 mA por las patas VCC y por las GND**. El contrato los prometía los dos (`limitePin`) y solo se revisaba el primero.

```
                 ┌────────── ATmega328P ──────────┐
   5V ──► VCC ───┤  pines en ALTO: entregan ─────►│── D2 … D13, A0 … A5
                 │  suma ≤ 200 mA                 │
   GND ◄── GND ──┤  pines en BAJO: reciben ◄──────│
                 │  suma ≤ 200 mA                 │
                 └────────────────────────────────┘
```

`revisarFallas` suma aparte lo que entregan y lo que reciben (una corriente no pasa por las dos patas) y avisa `corriente_chip`, con `componente` `placa.VCC` o `placa.GND`: «Entre todos, los pines entregan 238 mA y el chip aguanta 200 mA en total… Usa resistencias más grandes o menos pines a la vez.» Ejemplo de la prueba (`probar_motor.js`, 9d): diez LED rojos con 100 Ω dan 23,8 mA por pin (bajo 40) y 238 mA entre todos; con ocho son 190 mA y no hay falla. **No** se revisan los límites de 100 mA por grupo de puertos de la hoja de datos: son condiciones para que el pin dé su voltaje, no de daño, y para un aprendiz serían ruido (decisión de Efraín, 11 oct).

### R5. El .hex: cada línea con su largo

```
   :  02   00 00   00   0C 94   5E
      │    │       │    │       └─ suma: el byte que deja todo en 0
      │    │       │    └───────── datos: tantos como dice el largo
      │    │       └────────────── tipo: 0 datos, 1 fin, 2 y 4 dirección (2 bytes), 3 y 5 inicio (4 bytes)
      │    └────────────────────── dirección
      └─────────────────────────── largo
```

La suma sola no basta: `:0200000001FD` dice 2 bytes, trae 1 y su suma da bien, así que el lector tomaba la suma como segundo byte del programa. Ahora [src/hex.js](src/hex.js) exige `largo + 5` bytes por línea y el largo de cada tipo. El `.hex` lo hace arduino-cli, así que en el aula casi no pasa; pero un archivo dañado no debe correr instrucciones distintas. Pruebas en `probar_contrato.js`.

### R6. La ficha dice «probado con la placa real» solo de lo que se midió

| Ficha | Antes | Ahora |
|---|---|---|
| LED de otro color | «validado» (se midió solo el rojo) | «por validar»: voltaje de la hoja de datos |
| SG90 | corriente «6, ~100 y 590 mA» medida | quieto **menos de 10 mA** (lo mínimo que muestra el multímetro); los 6 mA son de la hoja de datos |
| Potenciómetro | ruido «medido» de 0,1 pasos | 0,1 pasos es una **estimación**; falta repetirlo con el programa corregido |

Los valores del modelo no cambian: cambia lo que se dice de ellos. Importa porque el simulador es el instrumento del estudio de 2027. Pruebas en `probar_contrato.js`.

### R7 y R8. Documentos y pruebas de TecnoBloques

- **R7:** LEEME (doce recorridos de Chromium, la entrada al aire medida, la netlist con la shield), README (las piezas de potencia) y el comentario de `servos_cuatro.ino` (con cuatro SG90 la placa no se reinicia). Los registros fechados y la bitácora no se reescriben.
- **R8 (TecnoBloques):** `npm test` terminaba en 0 aunque imprimía errores. Ahora `test/prueba.py` y `test/prueba_todo.py` salen con 1 si hay un error de JavaScript o un archivo local que no carga. El que faltaba era `tbmedia/sprites.svg`: los estilos de Blockly lo piden por ruta, e `inject` mide el texto, lo que ya pide los fondos. Ahora los estilos se ponen con `Blockly.Css.inject` **antes** del `inject`, y sus rutas se cambian por las imágenes que van dentro del HTML (también los cursores `.cur`).

**El porcentaje del criterio** (decisión de Efraín, 11 oct) se calcula **respecto de la medida**, con la incertidumbre del multímetro aparte: `|simulador − medida| / |medida|`. Una comparación cumple si `|simulador − medida| ≤ criterio · |medida| + U`, donde U es la incertidumbre del UT33B+ en voltios DC: ±(0,5 % de la lectura + 2 dígitos). Las lecturas tienen dos decimales, así que se tomaron en la escala de 20 V (1 dígito = 0,01 V). La corriente, calculada como V/R, lleva la misma incertidumbre relativa que su voltaje. `probar_motor.js` lo aplica e informa las dos cuentas: **11 de 12 dentro del criterio y 12 de 12 sumando la incertidumbre**. El caso en el límite es la resistencia con 215 Ω: 5,01 % (5,008 % con la precisión completa del modelo; el 5,02 % anotado antes salía del valor redondeado, como señaló Codex), con 2,61 ± 0,033 V. El registro del 7 oct no se reescribe.

## 58. Nano + expansión E/S: un chip, dos variantes y tres capas de prueba (11 oct 2026, Codex)

La placa se define por sus capacidades, no por el dibujo del Uno. [placas.js](src/placas.js) reúne pines físicos, GPIO y canales ADC. Uno conserva seis entradas analógicas; Nano tiene ocho. A6/A7 entran al ADC sin convertirse en salidas digitales. Nano y Nano antiguo ejecutan el mismo ATmega328P a 16 MHz.

```mermaid
flowchart TB
  MOD[Nano clásico: un módulo de 30 pines; SPI en sus GPIO] <--> EXP[Expansión roja o azul: GVS, I2C, UART y alimentación]
  EXP --> MNA[Red MNA con aliases y alimentación]
  MNA --> ADC[ADC A0 a A7]
  ADC --> AVR[Un ATmega328P en Worker]
  AVR --> MNA
  MNA --> SVG[Vista y SVG del conjunto]
  MNA --> KICAD[Netlist: Nano módulo, regulación/filtro, jack, I2C/SPI]
```

La expansión tiene nombres estables para sus **82 contactos físicos** y conserva seis aliases SPI del primer modelo. `conexiones.js` une señal/V/G y las salidas duplicadas al nodo correspondiente. La variante cambia el SVG y las coordenadas, mientras las referencias de los cables siguen iguales. Los aliases del Nano y los SPI heredados apuntan a pines físicos del módulo, así la interfaz no dibuja contactos imaginarios.

La alimentación del Nano está en [alimentacion_nano.js](src/alimentacion_nano.js), separada de las mediciones del Uno. El jack entra a un regulador externo de referencia de 5V; este también alimenta el regulador externo de 3,3V. `JACK_POS` y `OUT_3V3` siguen separados de VIN y 3V3 del módulo. Las caídas llegan a MNA, GPIO y referencia ADC. Las cargas de entrada se contabilizan antes del regulador; las de salida participan en su caída. Los motores TT reconocen 5V y ambas salidas 3,3V, además de las fuentes existentes.

Las pruebas tienen tres niveles: núcleo Node con HEX real; Chromium para interacción/Worker/guardado/SVG; KiCad para símbolos, 30 pads, redes, guardado/reapertura y DRC de huellas. TecnoBloques añade compilación Arduino CLI con los dos FQBN y reapertura del proyecto. Eso comprueba software; continuidad, geometría, protección y capacidad térmica requieren hardware. [Detalle de supuestos, componentes exportados y protocolo del laboratorio](../docs/IMPLEMENTACION-NANO-2026-10-11.md).

## 59. I2C junto a UART y seis contactos de alimentación (11 oct 2026, Codex)

Efraín corrigió la ubicación de I2C y confirmó el significado del bloque de seis contactos de Nano4: **dos GND, dos 3V3 y dos 5V**. El primer SVG lo había identificado como SPI en el diseño de referencia; se corrige esa identificación. I2C y UART quedan juntos en el extremo opuesto al USB.

Mover un contacto cambia sus coordenadas; el cable lo sigue porque conserva su referencia. Los tres contactos secundarios (`OUT_5V_2`, `OUT_3V3_2`, `GND_OUT_2`) se unen a la misma red del contacto primario. Cargas en uno u otro dan igual caída y consumo; ambos 3V3 externos siguen separados del 3V3 del módulo.

Para abrir los proyectos anteriores, `SPI_MISO/MOSI/SCK/SS/V/G` conservan sus redes y se dibujan sobre los pines reales del Nano. No se cambian en silencio por salidas de tensión. KiCad conserva el header SPI solicitado como **conector adicional del diseño de referencia**, con una nota explícita. La identificación verbal no reemplaza las mediciones de continuidad y voltaje del laboratorio.

## 60. Revisión del Nano: VIN sin fuente, cambio de placa y la caché del 5V (12 oct 2026, Claude)

Efraín pidió revisar la implementación del Nano de Codex. Las pruebas pasaban; los tres problemas estaban en casos que no cubrían.

**1. Cambiar de placa ya no deja al aprendiz sin lienzo.** TecnoBloques reabre el lienzo con el circuito guardado al cambiar de placa. Desde la sección 58, `normalizar` lanzaba un error si el circuito traía algo que la placa no tiene, y el lienzo no abría. Lo más común: un proyecto nuevo pasa a Nano (trae su expansión) y vuelve a Uno → «No se pudo abrir el circuito». Ahora el lienzo **adapta** el circuito y lo dice en su barra de ayuda:

```mermaid
flowchart LR
  G[Circuito guardado] --> N[normalizar con la placa elegida]
  N -->|pieza montada de otra placa, expansión repetida| Q[se quita]
  N -->|cable a una pieza quitada o a un pin que la placa no tiene| Q
  N --> L[El lienzo abre]
  Q --> A[«Se quitó lo que no va en Arduino Uno: Expansión E/S del Nano.»]
  L --> T{¿TecnoBloques ve menos piezas o cables?}
  T -->|sí| C[Conserva el original hasta que el aprendiz edite: volver a la otra placa lo recupera]
  T -->|no| S[Guarda el circuito del lienzo]
```

Un `en` de protoboard en una pieza montada se ignora (antes era un error). `IOREF` se agregó al perfil del Uno: el esquema lo admite y el filtro no debe quitar esos cables.

**2. VIN y el jack sin entrada no son una fuente de 0 V.** El VIN del Nano y `JACK_POS` eran fuentes ideales de 0 V cuando no les entraba voltaje: un corto a GND escondido. Un LED con 220 Ω del 5V al VIN se prendía al 92 %. Ahora esas fuentes solo existen cuando hay entrada (batería o jack); sin ella el nodo queda sin fuente, como en la placa. Unir 5V con VIN por USB tampoco es ya un «cortocircuito». El corto del jack con la fuente de la propiedad lo avisa `alimentacion_nano.js` (`corto`), con un solo mensaje claro en vez del falso «el jack recibe 0 V». Los cortos de las salidas de la expansión se nombran como los ve el aprendiz («La salida 3,3V de la expansión está unida directo a GND»), no por su identificador interno.

**3. La caché del circuito vuelve a funcionar en modo realista.** Cada milisegundo, `avanzarNano` resuelve la alimentación con la carga del momento. Con PWM, el 5V oscila unos mV (el LED prende y apaga), y el código borraba todas las soluciones guardadas (sección 50) cuando el 5V cambiaba más de 1 µV respecto **al milisegundo anterior**:

```
antes:  |5V(ahora) − 5V(ms anterior)| > 0,000001 V  → borrar caché     → 1016 resoluciones en 1 s
ahora:  |5V(ahora) − 5V(puesto en la red)| > 0,005 V → borrar caché     →    3 resoluciones en 1 s
```

Se compara contra lo último **aplicado** a la red, con tolerancia de un paso del ADC (5 V / 1024). Así la red nunca se aleja más de 5 mV del modelo, muy por debajo del criterio de ±5 %, y el error no se acumula. La tabla de mediciones y los servos siguen usando el voltaje exacto de cada milisegundo. Tiempo real para 3 s simulados, Nano realista: pwm9 1143 → 879 ms, desvanecer9 1514 → 1247 ms (el Uno: 818 y 1220 ms). En modo ideal no cambia nada.

Pruebas: `probar_nano.js` (VIN y jack sin fuente, 5V–VIN sin falso corto, mensajes legibles, resoluciones con PWM), `probar_nano_ui.py` (adaptar al cambiar de placa en los dos sentidos) y `test/simulador.js` de TecnoBloques (el original se recupera al volver).

**Después de la revisión, decidido por Efraín (12 oct):**

- **`nano_referencia` ya no es una falla.** Salía en cada simulación del Nano: aviso emergente en TecnoBloques y, con el registro de eventos, una «falla» en todas las corridas, mezclada con las del aprendiz. Que la alimentación es un modelo de referencia lo dicen la ficha de la expansión y la fila «Nano · alimentación» de la tabla de mediciones.
- **Quitar la fuente a mano no es un reinicio por energía.** Las dos maneras de quedarse sin energía se separan:

```
caída por carga (avanzarNano, cada ms):  5V < 2,7 V  →  programa de nuevo + reinicios++ + reinicio_placa (energia_nano)
cambio del circuito (ponerCircuito):     Desconectada, sin batería, jack a 0 V  →  programa de nuevo, sin contar
```

El segundo caso ya queda en el registro como `componente_cambiado` del lienzo. Pruebas nuevas: el ciclo a mano deja `reinicios` en 0; una carga de 6 Ω con el jack a 4 V (realista) baja el 5V a 2,68 V, reinicia una vez y avisa `nano_bajo_voltaje`.

## 61. El imán entre pines: enchufar sin cables (12 oct 2026, Claude)

**Pedido de Efraín:** que el imán que encaja las piezas en la protoboard funcione también entre pines, para conectar lo que en la mesa se enchufa sin cables: el probador en el balance de la LiPo, el servo en SERVO_1/SERVO_2 de la shield, un LED en D13 y GND del Uno, una pata contra otra. Decidió el alcance: **todo lo físicamente posible**.

**Cómo se guarda: el mismo campo `en`.** Ya decía qué pata va en qué hueco de la protoboard; ahora también puede decir en qué pin de otra pieza o de la placa va enchufada:

```
probador1.en = { NEG: "bat1.BAL0", C1: "bat1.BAL1", C2: "bat1.BAL2" }
led1.en      = { anodo: "placa.D13", catodo: "placa.GND1" }
```

`conexiones.js` une cada pata con lo que diga `en`, sea un hueco o un pin. Por eso la simulación, las mediciones, el probador, los servos y KiCad funcionan sin modelos nuevos: todos parten de esos nodos. Hubo que cuidar dos lugares que decidían «conectado» mirando solo los cables: el pin de la placa en `red.js` (sin esto, el LED en D13 no recibía la salida del pin) y los pines del Uno que entran a la netlist en `kicad.js`.

**Qué pasa al soltar una pieza (lienzo):**

```mermaid
flowchart TB
  S[Se suelta la pieza] --> P{¿Todas sus patas caen en huecos libres de la protoboard?}
  P -->|sí| E1[Encaja en la protoboard]
  P -->|no| B[Buscar pares pata–pin a menos de 6 px; un pin libre no recibe ya otra pata]
  B --> M{¿Hay alguno?}
  M -->|no| L[Queda suelta, sin «en»]
  M -->|sí| A[Elegir el corrimiento que enchufa más patas; a igualdad, el más corto]
  A --> E2[La pieza se alinea; cada pata a menos de 3,5 px de un pin o de un hueco libre queda enchufada]
```

**La regla que lo mantiene honesto: una pata sigue enchufada solo si sigue encima de su destino.** `revisarEnchufes()` se ejecuta después de soltar cualquier arrastre, de girar y de cambiar una propiedad que rehace el dibujo (la vista o el lado del motor, la variante de la expansión). Lo que quedó a más de 3,5 px de su hueco o su pin se suelta y deja de conducir. Ejemplos que encontró la revisión independiente: un LED enchufado en la batería y en D13, que la batería se lleva; un LED con una pata en un hueco y otra en VIN, que la protoboard se lleva; un motor enchufado al que se le cambia el lado. Sin esta regla, esas patas quedaban unidas a la distancia. Al abrir un archivo, en cambio, el `en` manda aunque el dibujo no esté encima (contrato).

- **Vista previa:** mientras se arrastra, los pines donde quedaría se ven en verde, igual que los huecos.
- **En grupo:** lo enchufado en una pieza se mueve con ella (la batería se lleva al probador), como lo encajado sigue a la protoboard. Al alejar la pieza enchufada, se desenchufa.
- **Mezclado:** una pata puede ir en un pin y otra en un hueco de la protoboard (el LED con el cátodo en VIN y el ánodo en la protoboard). El imán se ancla siempre en un pin; si todas las patas caen en huecos, es encajar en la protoboard, todo o nada, como antes.
- **Girar o borrar** la pieza «madre» suelta lo que tenía enchufado en ella; las demás patas de esas piezas siguen donde estaban. **El imán actúa solo al soltar**: girar no enchufa por casualidad, y una pieza agregada con un clic (aparece en el centro) tampoco.
- **No se apilan:** un pin con una pata enchufada no recibe otra, y una pata ya enchufada no recibe otra pieza. El pin ocupado no recibe clics: se cablea la pata, que está encima.
- **Rótulo:** «LED: ánodo (+) · enchufada en D13 de Arduino Uno».
- **Al abrir un circuito**, se suelta un `en` que no puede ser: a una pieza que no existe, a un pin de otra placa, a un alias (SDA del Nano, `SPI_*` de la expansión: se enchufa en el pin físico), desde una pata que la pieza no tiene, a sí misma, o a un pin que ya recibió otra pata. El aviso es propio: «Se soltaron 3 conexiones directas sin destino». TecnoBloques también cuenta los enchufes al decidir si conserva el montaje original al cambiar de placa.

**Lo que enseña:** enchufar al revés tiene consecuencias, como en la mesa. El probador al revés no enciende (la tabla dice «el − va al negro del balance»), el servo con la señal en GND no se mueve y el LED directo en D13 sin resistencia se quema. Para el probador y el servo hay que girar la pieza (R) antes de enchufarla, porque sus pines están en otra orientación que el conector, igual que en la realidad.

**El Uno de wokwi** no tiene el paso exacto (sección 60 y especificación de vistas): entre GND y D13 hay 9,5 px y no 9,6. La tolerancia de 3,5 px lo absorbe; con el Uno Tecno quedará exacto.

**Decisiones de diseño que quedan abiertas** (las señaló la revisión, no son errores): el simulador no distingue pines macho de hembra (se puede unir pata con pata, como torcer dos patas en la mesa), y con 6 px de radio una pieza soltada muy cerca de la pata de otra se enchufa; la vista previa en verde avisa antes de soltar.

**Pruebas:** contrato (enchufe a la placa y a otra pieza aceptados; pieza inexistente, pin inexistente, alias, un punto de más, en sí misma y dos patas en un pin, rechazados); potencia (probador enchufado = con cables; con las celdas cruzadas pita, lo que prueba que el enchufe se usa; al revés no enciende; servo en SERVO_2 = con cables; LED directo en D13/GND se quema); KiCad (LED enchufado = con cables); Chromium `probar_enchufe.py` (25) con arrastre real del mouse: vista previa, alineación, marca de ocupado, rótulo, evento, mover en grupo, desenchufar, girar, borrar, guardar y reabrir, soltar lejos, mezclado pin + hueco, la protoboard que se lleva una pieza mezclada, cambiar el lado del motor y lo que se suelta al abrir. Las siete pruebas de la revisión fallan con el código anterior y pasan con el corregido.

## 62. Las vistas de TecnoDiseñador: Uno, Nano y expansión medidos (14 oct 2026, Claude)

**Qué cambió:** el Uno, el Nano y la expansión roja y azul se ven ahora con los dibujos que TecnoDiseñador midió desde las placas del ambiente. El Uno dejó de ser el dibujo de `@wokwi/elements` y pasó a ser una Pieza Tecno, con sus headers en paso exacto de 2,54 mm. **Solo cambió la apariencia.** Los cables, la red eléctrica, la simulación y KiCad hablan de los contactos por nombre (`placa.D13`, `exp1.A0_S`), nunca por coordenadas, así que el motor no se enteró del cambio.

```mermaid
flowchart LR
  TD["TecnoDiseñador<br/>uno-tc.svg/json<br/>nano-tc.svg/json<br/>shield_nano_io-roja/azul-tc"] --> I["npm run vistas<br/>(pasa el revisor;<br/>si falla, no escribe nada)"]
  I --> V["src/piezas/vistas/*.js<br/>SVG en mm + pines + LED<br/>(generado y versionado)"]
  V --> P["uno.js · nano.js · shield_nano_io.js<br/>mm → px, título, LED"]
  P --> L["lienzo: dibujo, puntos de clic,<br/>LED, capas"]
  L -. "solo nombres de contacto" .-> M["conexiones → MNA → núcleo<br/>→ mediciones · KiCad<br/>(sin cambios)"]
```

**El camino de un dibujo:**
1. TecnoDiseñador entrega, por pieza, un SVG en milímetros con un `data-contacto` en cada agujero y un `data-led` en cada LED, y un JSON con la posición de cada contacto (especificación de entrega).
2. `npm run vistas` (en `prototipo/`) pasa `revisar_vista_td.py` con las cuatro entregas juntas y escribe `src/piezas/vistas/<pieza>.js`: el contenido del SVG en una línea, su marco, sus pines y sus LED. Los módulos generados se versionan, así que construir el paquete o etiquetar una versión no necesita la carpeta de TecnoDiseñador. Si TecnoDiseñador mejora un dibujo, se actualiza con ese comando y las pruebas.
3. `src/piezas/vista_td.js` pone la raíz: el tamaño en píxeles (1 mm = 9,6/2,54 px) con el `viewBox` en mm, el título y la descripción. También enciende los LED (`mostrarLeds`): cambia el `fill` al color encendido de la entrega y marca `data-encendido`, que es lo que miran las pruebas y TecnoBloques.

**Las capas del Nano.** Antes, la expansión iba encima del Nano y tenía una ventana recortada para verlo. Ahora es como en la mesa: el Nano va encima, enchufado en los zócalos. La expansión lleva `debajo: true` en el catálogo y el lienzo la pone justo antes de la placa. El marco del Nano (60 × 53,5 mm, el de toda la familia) es transparente fuera de la placa y taparía los clics sobre la expansión. Por eso la placa solo recibe el clic donde está pintada (`pointer-events` en `lienzo.css`): un clic en la expansión, aunque caiga dentro del marco del Nano, elige la expansión.

**El LED de la expansión** (`PWR`) sigue al de la placa (`sigueAPlaca`): se enciende cuando el Nano tiene alimentación, sea por USB o por el jack.

**El bloque de seis contactos.** La medida mostró que la placa real no tiene 5V ahí: son tres 3,3V y tres GND. Efraín decidió seguir a la placa:

| Antes (modelo de referencia) | Ahora (placa medida) |
|---|---|
| `OUT_5V`, `OUT_5V_2` | aliases heredados: siguen unidos al 5V y su cable se dibuja sobre el 5V del Nano, como los `SPI_*` |
| `OUT_3V3`, `OUT_3V3_2` | `OUT_3V3`, `OUT_3V3_2`, `OUT_3V3_3` (fila de arriba) |
| `GND_OUT`, `GND_OUT_2` | `GND_OUT`, `GND_OUT_2`, `GND_OUT_3` (fila de abajo) |

Ningún cable guardado cambia de red. Una pata enchufada con el imán en `OUT_5V` sí se suelta al abrir, con aviso, porque ese agujero ya no existe. La roja y la azul tienen las mismas medidas (lo decidió Efraín el 13 oct): al cambiar de tarjeta cambia el color, no los puntos.

**El Uno y la shield L293D.** El marco del Uno no cambió (72,58 × 53,34 mm, con la placa desde x = 4 mm). Los pines se corrieron menos de 0,5 mm (≤ 1,7 px), lo que se equivocaba el dibujo de wokwi, así que los dobleces de los cables guardados siguen en su lugar. Los headers apilables de la shield salen ahora de los pines del Uno medido (`HEADERS_UNO`). El dibujo de la shield sigue siendo el nuestro, hasta que TecnoDiseñador mida la del kit.

**KiCad.** Los pads del Nano se alinearon con el lienzo: `GND2`/`RESET2` son los pads 4 y 3 (fila de D12…D1) y `GND1`/`RESET` los 29 y 28. Son la misma señal: en la netlist solo cambia el rótulo de dos pads de la red GND.

**El Worker no lleva dibujos.** El Worker importa los puentes eléctricos de la shield y de la expansión, que viven en los mismos módulos que los dibujos. Una llamada como `tamanoDe(VISTA)` al cargar el módulo hacía que esbuild guardara los dibujos (unos 150 KB) dentro del Worker, que nunca dibuja. Esas llamadas van marcadas `/* @__PURE__ */`, y `construir.js` se detiene si el Worker trae un `data-contacto`. Resultado: el paquete pasó de 282 a 430 KB y el Worker se quedó en 89 KB.

**La miniatura de la biblioteca** renombra sus `id` (`tc-mini-…`). Si no, la expansión del lienzo podía tomar los degradados de la miniatura, que vive en el mismo documento y puede estar oculta (un degradado dentro de algo oculto no pinta).

**Cómo se comprobó que no se perdió nada:**
- **Línea base antes de tocar el código:** suite completa (1014 OK, 0 fallas); netlist de KiCad y mediciones del núcleo de 12 circuitos (los 9 ejemplos de validación de TecnoBloques, `t1_protoboard` y dos circuitos sintéticos del Nano con los nombres viejos); capturas del lienzo.
- **Después:** las mediciones son idénticas en los 12 circuitos (salvo las lecturas nuevas de `OUT_3V3_3` y `GND_OUT_3`). La netlist es idéntica en los del Uno; en los del Nano solo cambia el rótulo de los pads 4 y 29.
- **`probar_vistas.py`** (nuevo, 29 comprobaciones): cada `data-contacto` cae sobre su punto de conexión (±0,05 px) en el Uno, el Nano y las dos expansiones; los LED L, PWR y el de la expansión siguen a la simulación y se apagan al detener; la expansión va debajo y recibe el clic dentro del marco del Nano; los cables con `OUT_5V`, `OUT_5V_2` y `SPI_G` siguen dibujados sobre el Nano; una pata enchufada en `OUT_5V` se suelta al abrir, con aviso; ningún `id` se repite en el lienzo (miniaturas incluidas); la imagen exportada es XML válido con los dibujos.
- Se ajustaron las pruebas que dependían del dibujo viejo: el Uno de wokwi (`led13`, su CSS en la imagen exportada, la x de D13: 124,61 px en vez de 125), la ventana de la expansión, I2C y UART (en la placa medida son dos conectores, uno encima del otro), y el mapa de pads de KiCad.

**Pendiente:** la validación eléctrica sigue igual que antes: los dibujos están medidos, pero la continuidad, el jack y los reguladores de la expansión se confirman en el laboratorio.

## 63. LED de las placas e imán al abrir (14 oct 2026, Claude)

Después de integrar las vistas (sección 62), Efraín pidió mejorar los LED y el imán del Nano.

**Los LED de la placa, de punta a punta:**

```mermaid
flowchart LR
  C["chip.js<br/>byte enviado (TX)<br/>byte recibido (RX)"] --> N["nucleo.js · foto()<br/>brilloL = parte de la ventana con D13 en ALTO<br/>ledTX / ledRX = destello de 60 ms"]
  N --> S["simulador.js<br/>{ledPower, led13: brilloL, ledTX, ledRX}"]
  S --> L["lienzo · mostrar()<br/>vista_td.js: mostrarLeds"]
  L --> D["data-led: color según el brillo,<br/>halo y data-encendido"]
```

- **RX:** antes nunca se prendía, porque el núcleo no lo informaba. Ahora `chip.js` avisa cada vez que entrega a la placa un byte del monitor serial (`alByteRecibido`), y el LED destella 60 ms, igual que TX al enviar. Se prende aunque el programa no lea el serial, porque en la placa real lo prende el conversor USB.
- **L con brillo promedio:** antes era prendido o apagado según el pin en el instante de la foto. Si el pin 13 cambiaba más rápido que la foto (cada 16 ms), L parpadeaba al azar. Ahora el núcleo calcula qué parte de la ventana estuvo en ALTO (`brilloDe`, con los mismos tiempos que promedian el PWM del circuito) y L se ve con ese brillo. Con `rapido13` (1 kHz, 25 % en ALTO) se ve estable a un cuarto de brillo; con `parpadeo13`, apagado y prendido del todo, como antes.
- **Color y halo:** `mostrarLeds` mezcla el color apagado y el encendido según el brillo, en pasos de 5 % (para no reescribir el dibujo por cambios que no se ven), con un mínimo de 20 % para que un LED tenue se vea. Encendido, lleva un halo de su color con dos sombras CSS (`drop-shadow`): una cercana y otra amplia. En un SVG, `drop-shadow` se mide en las unidades del dibujo (mm en las vistas de TecnoDiseñador, px en la shield), así que el radio sale del lado mayor del LED (`getBBox`). Si el lienzo está oculto no hay medida, y se vuelve a intentar en la próxima foto.
- **Shield L293D:** su LED usa el mismo sistema (`data-led="PWR"`, `mostrarShield`) y el capuchón del puente PWR es la parte `data-parte="puente-pwr"`, como pide la especificación de entrega (sección 9.4). Cuando TecnoDiseñador entregue la shield medida, encaja sin cambios.

**El imán al abrir.** El `en` es lo que manda para la conexión (contrato). Con la vista nueva del Nano, una pieza guardada enchufada en sus pines quedaba conectada pero dibujada unos 18 px lejos. Ahora, al abrir, `alinearEnchufesAlAbrir()` revisa cada pieza enchufada en pines (no en la protoboard):
- si todas sus patas están dentro de la tolerancia del imán (3,5 px), no se toca: un LED de 10 px en dos pines a 9,6 px se queda donde se guardó;
- si alguna quedó lejos y todas piden el mismo corrimiento, la pieza se corre con lo que cuelga de ella hasta quedar sobre sus pines;
- si sus patas ya no caben juntas en sus pines, o si también tiene patas en la protoboard, se queda donde estaba y sigue enchufada, como dice el archivo.

No se emiten eventos: abrir no es una edición del aprendiz.

**Pruebas:** núcleo (L estable a 25 % con `rapido13`, apagado y prendido con `parpadeo13`, RX apagado sin datos, prendido al recibir y apagado después); `probar_vistas.py` (35: halo en L, RX en pantalla en el Uno y en el Nano, el LED corrido a D13/3V3 al abrir y el que no cabe, que se queda); `probar_carro.py` (el capuchón como `data-parte`); `probar_enchufe.py` (25, el LED en D13/GND sigue en el mismo lugar al recargar).

## 64. La shield L293D medida: headers analógicos, servos y pines tapados (14 oct 2026, Claude)

TecnoDiseñador midió la shield del kit y dejó sus hallazgos en `TecnoDiseñador/componentes/l293d-shield/entrega/tecnocircuito/HALLAZGOS-PARA-TECNOCIRCUITO.md`. Efraín decidió que **la vista medida manda** sobre el dibujo anterior, y aceptó las tres recomendaciones: los nombres de los headers analógicos, tapar los pines del Uno sin agujero encima y aceptar el recorte de 0,5 mm del borde.

**Qué cambió en el funcionamiento:**

| | Antes | Ahora |
|---|---|---|
| Contactos | 18 | **36**: entran `A0_S` … `A5_S` (señal), `A0_V` … `A5_V` (+5) y `A0_G` … `A5_G` (Gnd) |
| Puentes eléctricos | servos, GND | además `Ax_S` → `placa.Ax`, `Ax_V` → `placa.5V`, `Ax_G` → `placa.GND1` |
| Servos | SERVO_2 arriba, pines «S + −» | **SERVO_1 arriba, pines «− + S»** (la señal a la derecha). Siguen en los pines 10 y 9 |
| SCL, SDA, IOREF del Uno | se cableaban a través de la shield | **tapados** mientras la shield está montada |
| Puente PWR | se dibujaba o no | la parte `puente-pwr` se oculta con `display="none"` (`aplicarShield`) |
| KiCad | J5–J9 | además **J10** (A0-5), **J11** (+5) y **J12** (Gnd); LED de 5 mm |

```mermaid
flowchart LR
  subgraph shield["Shield L293D (montada)"]
    S["A0-5: A0_S … A5_S"]
    V["+5: A0_V … A5_V"]
    G["Gnd: A0_G … A5_G"]
  end
  subgraph uno["Uno"]
    A["A0 … A5"]
    C5["5V"]
    CG["GND1"]
    T["SCL · SDA · IOREF<br/>(tapados: sin agujero en la shield)"]
  end
  S --> A
  V --> C5
  G --> CG
```

**Pines tapados.** La shield del kit es del diseño R2: sus headers apilables son 8 + 8 y 6 + 6, sin agujeros sobre SCL, SDA, IOREF ni el pin sin rótulo del Uno. En la mesa, con la shield puesta, esos pines no se pueden usar. El catálogo lo declara (`tapa: ['SCL', 'SDA', 'IOREF']`). Mientras la shield esté montada, el lienzo oculta esos puntos de conexión (`tc-tapado`) y el imán no enchufa patas ahí. Un cable que ya llegaba a SCL se conserva, porque sigue siendo el mismo nodo que A5. Al quitar la shield vuelven.

**Lo que no cambió.** La red eléctrica de los motores, los servos y el puente es la misma: las mediciones de los 13 circuitos de referencia (incluidos el carro y uno nuevo con dos servos en la shield) son idénticas antes y después. La netlist de KiCad solo suma los tres headers y cambia la huella del LED a 5 mm.

**Lo que se movió (solo el dibujo).** La bornera M1/M2 bajó 7,4 mm, EXT_PWR se corrió 2,6 mm y los servos entre 2,2 y 7,7 mm. Los cables guardados siguen conectados porque van por nombre. Se corrigieron los dos dobleces del ejemplo del carro, que estaban bajo EXT_PWR (página de prueba y TecnoBloques). Un servo enchufado con el imán en el orden viejo (girado 90°) sigue conectado al abrir, pero se ve corrido: en el orden nuevo va girado 270°.

**Detalles medidos que conviene saber:** los headers analógicos están 1,18 mm a la izquierda de A0–A5 del Uno, porque son un conector propio de la shield. La shield se recorta 0,5 mm por la derecha y 0,35 mm por arriba del marco común del Uno (decisión de Efraín: no agrandar el marco). En la vista ya no existe `dibujarShield` con dibujo propio ni `HEADERS_UNO`: los agujeros apilables vienen dibujados por TecnoDiseñador sobre los pines del Uno medido.

**Lo que corrigió la revisión independiente (`/code-review`):**
- **LED apagado que parecía encendido:** la entrega propone `#7fe08e` (el verde de un LED difuso apagado), casi igual al encendido. Un aprendiz creería que los motores tienen batería. Apagado se usa un verde oscuro (`#2b6a3a`); encendido, el de la entrega.
- **KiCad:** los headers analógicos no son conectores «externos» (donde se enchufan motores, batería o servos). Si lo fueran, un servo cableado a A0, 5V y GND perdería su propio conector en la netlist, porque esos nodos quedarían cubiertos por J10–J12. Hay una prueba que lo detecta.
- **El puente:** se aplica sobre el dibujo con `aplicarShield` también al crear la pieza (el lienzo llama a `aplicar` de las piezas Tecno al crearlas), sin reemplazar texto del SVG.
- **Aviso de pines tapados:** al abrir un circuito o al montar la shield, si un cable o una pata llegaba a SCL, SDA o IOREF, la barra lo dice: «La shield tapa SCL: lo que llega ahí sigue conectado, pero en la placa real no se podría. Pásalo a otro pin.»
- **PCB de comprobación (`probar_kicad_pcb.py`):** con tres headers más, el acomodo automático ya no encontraba lugar para J12 con 0,5 mm extra entre patios. El patio de cada huella ya trae su distancia de seguridad, y la prueba revisa con el DRC de KiCad que no haya solapes: el margen extra pasó a 0 y la búsqueda a saltos de 0,25 mm.

**Filas de los headers analógicos a 2,54 mm (decisión de Efraín, 14 oct):** la entrega las tiene a 3,03 y 3,08 mm entre sí, como la foto. Así, un conector de 3 pines (servo o sensor) no entra de pie en una columna. Efraín decidió que el paso estándar manda sobre la foto, porque los pines reales tienen juego. TecnoDiseñador las corrige y regenera, y aquí basta `npm run vistas`: los nombres no cambian.

**Pendiente de laboratorio:** qué llega a cada fila de los headers analógicos, el orden real − + S de los servos, qué indica LED1 y qué hace el puente PWR, y que el GND de las borneras sea el del Uno.

**Pruebas:**
- Contrato: 36 contactos contra el esquema.
- KiCad: J10–J12 en A0–A5 (junto a J3 del Uno), +5V y GND; un servo cableado a A0, 5V y GND conserva su conector.
- Núcleo: un potenciómetro en +5/Gnd/A3 de la shield da 1,500 V en A3, igual que directo a la placa.
- `probar_carro.py`: 36 pines y el capuchón oculto.
- `probar_vistas.py` (46): 36 contactos alineados, el aviso de SCL tapado, el LED apagado oscuro, servos «− + S» con SERVO_1 arriba, A0 a A5 de izquierda a derecha, SCL/SDA/IOREF tapados con la shield y libres sin ella, el cable viejo a SCL conservado, el LED y el puente, `id` sin repetir e imagen exportada.

## 65. Laboratorio de T3: la shield, la LiPo y el probador medidos (15 oct 2026, Claude)

> Medidas de Efraín en el laboratorio el 15 de octubre. Registros: `validacion/2026-10-15-shield-continuidad.md`, `-probador-celdas.md`, `-carro-l293d.md` y `-servos-nano-usb.md`. La hoja original, con las predicciones de antes, es `validacion/2026-10-15-hoja-laboratorio-t3.md`.

**La shield del kit es la de AFMotor_R4.** La continuidad confirma que cada motor lo manejan el PWM y las dos salidas del 74HC595 que usa la librería. Lo que difería era el cableado interno de los L293D (qué canal lleva cada motor), y eso solo lo usa la netlist de KiCad (`l293d()` en `src/kicad.js`).

**La batería tiene 1,2 Ω, no 0,05.** Contando el paquete, los cables y el conector. Lo dicen dos medidas independientes:

```
  sin carga ─────────────── 7,63 V
  motores a 255 (0,32 A) ── 7,22 V   →  R = (7,63 − 7,22) / 0,32 ≈ 1,2 Ω
  rueda bloqueada ───────── 0,90 A   →  con 1,2 Ω el modelo da 0,85 A; con 0,05 Ω daba 1,03 A
```

**Lo que lee el multímetro en el motor con PWM.** El L293D apaga el puente cuando el PWM está en BAJO. Los bornes quedan al aire y el motor, que sigue girando, genera su propio voltaje (la «fem», k·ω). El multímetro promedia las dos partes:

```
  voltaje en los bornes del motor (PWM a 200 = 78 %)

   5,9 V ┤ ┌──────────┐  ┌──────────┐      encendido: batería − caída del L293D
         │ │          │  │          │
   4,0 V ┤ │          └──┘          └──    apagado: la fem del motor (al aire)
         │ │
     0 V ┼─┘
            ◄─ 78 % ─►◄22%►

  promedio del PWM:     0,78 × 5,9                ≈ 4,6 V   (lo que mostraba el simulador)
  lo que lee el multímetro: 0,78 × 5,9 + 0,22 × 4,0 ≈ 5,5 V   (medido: 5,36 V)
```

El motor sigue moviéndose con el promedio del PWM, porque su inercia filtra los pulsos. Solo cambia lo que se informa: `motor_tt.js` entrega `fem` y `potencia.js` suma `(1 − ciclo útil) × fem` al voltaje del motor en `mediciones()`.

**Dos errores que estaban escondidos detrás de los 0,05 Ω:**
- **El freno no gasta batería.** Con RELEASE y el PWM encendido, el puente une los dos bornes del motor a GND. La corriente de frenado da la vuelta por el puente, pero el simulador se la cobraba a la batería, que bajaba a 5,9 V en cada «quieto».
- **El aviso `bateria_celdas` espera 0,5 s** (`LIPO.avisoCeldaMs`). Al arrancar a 255 desde quieto, los dos motores piden unos 2 A por unos milisegundos y las celdas bajan de 3,0 V sin dañarse.

**El probador del kit:** dice «2CS» una vez al conectarse y después repite «ALL», el total, «2S» y cada celda, 1 s por paso (antes 0,8 s y sin «ALL»).

**Lo que sigue abierto:**
- **Sentido de giro:** con el mismo cableado, la rueda derecha real avanzó y la del simulador retrocede. La continuidad descarta la shield; falta revisar los motores.
- **USB del Nano:** con 5 y 6 SG90 el 5V real baja a 4,12 y 4,03 V, y el simulador del Nano casi no baja. El modelo del USB del Uno (5,11 V − 1,66 Ω) lo explica, pero también predice reinicios que el Nano real no tuvo. Antes de cambiarlo: 5 y 6 SG90 con el Uno.
- ~~Modo ideal~~ **Resuelto el 16 oct (decisión de Efraín):** la resistencia de la batería es la no idealidad `resistenciaBateria`. El modo «realista» la enciende; apagada, la batería da siempre su voltaje sin carga.

**Cómo quedó el modelo frente a lo medido** (batería en 7,64 V): batería con motores 7,22 V (real 7,22), M1 a 255 5,78 V (5,79), M1 a 200 5,53 V (5,36), corriente 114/144 mA (120/130), RPM 155/193 (160/185), motor bloqueado 0,85 A (0,90). Todo dentro del criterio.

## 66. Las fotos que llegan tarde: la vista se descarta, los hechos no (AUD-03, 18 oct 2026, Claude)

> Defecto encontrado por la auditoría de Codex del 17 oct (AUD-03). Archivos: [src/simulador.js](src/simulador.js) y la prueba [pruebas/probar_fotos.js](pruebas/probar_fotos.js) (`npm run probar:fotos`).

**El problema.** Cada foto del Worker trae dos clases de cosas:
- **la vista:** brillos, voltajes, medición y tiempo simulado, que se pueden volver a pedir;
- **los hechos:** las fallas nuevas, el texto del monitor serial y los reinicios por energía. El núcleo los manda **una sola vez** y no los repite en la foto siguiente.

Antes, la página descartaba entera una foto con un turno viejo. Si el LED se quemaba justo antes de pulsar Pausa, la foto con `led_quemado` llegaba después de la pausa y se tiraba. El LED seguía quemado, pero nunca salía el evento `falla` y el cierre de la corrida decía «sin fallas». Lo mismo pasaba con lo que el programa imprimía justo antes de Pausa o de RESET.

```
  Worker                                página
  foto (turno 1): led_quemado ──┐
                                │       Pausa: turno 2
                                └────►  llega la foto del turno 1
                                        antes: se descarta entera → la falla se pierde
                                        ahora: hechos ✔ (falla, serial)   vista ✘ (no se dibuja)
```

**La regla nueva:**

| La foto es… | Vista | Hechos |
|---|---|---|
| del turno actual | se dibuja | se entregan |
| de un turno anterior de la misma corrida (antes de Pausa o RESET) | se descarta | se entregan, con el `ms_sim` de la foto |
| de una corrida anterior (`turno` menor que el de su `simulacion_iniciada`) | se descarta | se descartan: no contaminan la corrida nueva |
| que llega después de Detener, antes de que el Worker confirme | se descarta | se entregan y van en el cierre |
| que llega después del cierre | se descarta | se descartan: el cierre ya salió |

- **Cómo sabe de qué corrida es:** el turno sube siempre y la página guarda el turno con que empezó la corrida (`turnoCorrida`). Una foto con un turno igual o mayor es de esta corrida.
- **En el registro:** una falla de una foto que llegó en la pausa sale **después** de `simulacion_pausada`, con el `ms_sim` de su foto, que es cuando ocurrió. Ese `ms_sim` puede ser **mayor** que el de la pausa: la pausa lleva el tiempo de la última foto que se dibujó, y el Worker siguió unos ms hasta recibir la orden. (La primera versión de esta sección decía «menor o igual»; Codex mostró que no se puede garantizar.) Las fallas de la corrida van en su `simulacion_detenida`.
- **Error corregido de paso: el RESET volvía a avisar los reinicios por energía.** La página ponía en 0 su cuenta de reinicios vistos al pulsar RESET, pero el núcleo cuenta los de toda la corrida. La foto siguiente repetía el `reinicio_placa` por energía. Ahora la cuenta solo vuelve a 0 en una corrida nueva.

**El cierre que espera (AUD-03-V1, decisión de Efraín, 18 oct).** La primera corrección no cubría Detener: si se pulsaba (o TecnoBloques destruía el simulador) mientras una foto viajaba, el cierre ya había salido y sus fallas se perdían. Codex lo devolvió. Ahora el cierre espera al Worker:

```
  página                                   Worker
  detener(): se ve detenida ─ detener ───►  para; manda una última foto (lo que el núcleo tenía sin mandar)
             cierre abierto                 y «detenido»
  foto en camino ◄──────────────────────── (hechos: van al cierre)
  última foto    ◄──────────────────────── (hechos: van al cierre)
  «detenido»     ◄────────────────────────
  simulacion_detenida con todas las fallas; la promesa de detener() se cumple
```

- **Los mensajes llegan en orden:** cuando llega «detenido», ya llegaron todas las fotos de antes.
- **Si el Worker no contesta en 500 ms,** el cierre sale con lo que llegó. Una confirmación tardía no lo repite.
- **`destruir()`** espera el mismo cierre y después libera el Worker. Desde que se llama ya no acepta órdenes.
- **Iniciar otra corrida antes de la confirmación:** el cierre de la anterior sale en ese momento, para que no quede después del inicio de la nueva.
- **TecnoBloques espera el cierre** antes de cerrar la sesión de un equipo (cambiar de código, apagar el registro) y antes de compilar otra vez. Así AUD-04 se conserva: la corrida y su cierre quedan en el equipo que la empezó.
- **Lo que no cubre:** al cerrar la ventana no se puede esperar. TecnoBloques usa `{ sinEsperar: true }` y el cierre sale en ese instante, sin la foto en camino (a lo sumo unos 16 ms de simulación).

**Una sola espera para todos (AUD-03-V2, 19 oct).** Codex encontró un hueco en TecnoBloques. Detener soltaba el simulador (`simulador.sim = null`) y se olvidaba de su cierre. Si el equipo cambiaba antes de que el Worker confirmara, la segunda llamada a `detenerSimulacion()` no veía nada que esperar y la sesión se cerraba. Así, las fallas y el cierre de la corrida de B quedaban en el registro de C. Ahora TecnoBloques guarda el simulador que se está cerrando (`simulador.cerrando`) y todos esperan la misma promesa:

```
 Detener ──► destruir() ──► simulador.cerrando = sim ──► [Worker confirma o 500 ms] ──► simulacion_detenida ──► cerrando = null
                                   ▲
 cambiar de equipo ─┐              │ destruir() otra vez: la MISMA promesa
 apagar el registro ├──────────────┘ (con sinEsperar, la termina ya)
 volver a simular ──┤
 cerrar la ventana ─┘
```

TecnoCircuito no cambió: su `destruir()` ya devolvía la misma promesa si se llamaba dos veces. La prueba está en `test/registro-app.js` de TecnoBloques. Retiene en orden las fotos y el «detenido» del Worker real y revisa los cuatro caminos. Sin la corrección fallan los seis controles que revisan la espera: sesión y corrida al cambiar de equipo, la segunda llamada al volver a simular, cerrar la ventana, y sesión y corrida al apagar. También falla el de AUD-04 al apagar, porque J7 heredaba eventos de I6. El orden de las corridas al volver a simular pasa igual, porque la compilación tarda más que el tope de 500 ms; sin esa demora, el cierre viejo también podría quedar después del inicio nuevo.

**La prueba** (`probar_fotos.js`, Node): corre el `simulador.js` real con un Worker controlado, que entrega las fotos del núcleo real en el orden que se quiera, y un reloj falso. Es la técnica del diagnóstico de Codex. Revisa:
- la pausa (con y sin reanudar), el RESET, el serial en la pausa, el recableado y una foto de la corrida anterior;
- el RESET después de un reinicio por energía;
- el cierre que espera: Detener y Pausa→Detener con una foto en camino, la última foto del Worker, `destruir()`, el tope de 500 ms, `sinEsperar` e iniciar antes de la confirmación.

**La semilla de las pruebas.** Las pruebas de Chromium usan `pagina.html?semilla=N`, que pasa `_semilla` al simulador (opción interna, no es del contrato). La de T1/T2 fija la suya: con una semilla al azar, «≤ 2 cambios en 3 s» de la entrada al aire fallaba en ~0,2 % de las corridas sin que hubiera un error (medido el 18 oct con 1000 semillas: 728 sin cambios, 233 con 1, 37 con 2 y 2 con 3).

## 67. El chip para en el milisegundo del corte (AUD-05, 18 oct 2026, Claude)

> Defecto encontrado por la auditoría de Codex del 17 oct (AUD-05). Archivos: [src/chip.js](src/chip.js), [src/nucleo.js](src/nucleo.js) y la prueba [pruebas/probar_corte.js](pruebas/probar_corte.js) (`npm run probar:corte`).

**El problema.** Los modelos de energía corren «cada ms» (sección 54): ahí se descubre que el Nano se quedó sin alimentación o que el 5V del Uno cayó por debajo de 2,7 V. Pero `chip.correr(ciclos)` seguía ejecutando hasta terminar el pedazo, y el corte se atendía después. Lo que pasaba dependía del tamaño del pedazo:

| Mismos 16 ms del caso de la auditoría (Nano, 0,25 Ω en OUT_5V) | Instrucciones sin energía |
|---|---:|
| un pedazo de 16 ms | 184 852 |
| pedazos de 7919 ciclos (como los del Worker, que no caen en el ms exacto) | 5 938 |
| pedazos de 1 ms exactos | 0 |

Con seis SG90 en el USB del Uno, los mismos 3 s daban 8 reinicios en pedazos de 16 ms y 110 en pedazos de 1 ms.

**La corrección:**

```
  avanzar(ciclos)                         chip.correr(resto, hayCorte)
  ┌─────────────────────────────┐         ┌───────────────────────────────────┐
  │ mientras falte:             │         │ instrucciones hasta el próximo ms │
  │   apagada → seguirApagada() ├──resto─►│ modelos de cada ms (energía…)     │
  │             devuelve resto  │         │ ¿hayCorte()? → para en este ms    │
  │   correr(resto, hayCorte) ──┼────────►└───────────────────────────────────┘
  │   resto −= lo que avanzó    │
  │   atender el corte          │  reinicio: chip nuevo desde ese instante
  └─────────────────────────────┘  apagada: el tiempo pasa sin instrucciones
```

- `chip.correr(ciclos, parar)`: después de los modelos de cada ms pregunta `parar()`. Si hay un corte, se detiene en esa frontera.
- `avanzar()` atiende el corte en ese instante (reinicio o apagado) y sigue con lo que falta del pedazo. Si la energía vuelve dentro del mismo pedazo, sigue vigilando otro corte. El tiempo global no cambia.
- **Consecuencia:** con seis SG90 en el USB del Uno, la placa se reinicia cada pocas decenas de ms (299 veces en 8 s). Eso ya pasaba en la app, porque el Worker avanza de a 1 ms o menos; lo que cambió es la prueba de `probar_nucleo.js`, que avanzaba en pedazos de 16 ms. Ahora cuenta cada arranque por la «I» de «Inicio», porque muchas veces no alcanza a salir entero (decisión de Efraín, 18 oct). **Exagera lo medido:** el Uno real no se reinició con 5 ni 6 SG90 (16 oct); sigue pendiente en LAB-001.

**La prueba** (`probar_corte.js`, Node) avanza lo mismo en pedazos de 16 ms, de 1 ms y de 7919 ciclos, y exige el mismo resultado:
- **Nano sin energía:** ninguna instrucción sin energía, el mismo ciclo de corte y lo mismo en serial, energía y fallas.
- **Nano con la energía de vuelta:** el mismo serial y el mismo tiempo.
- **Uno con seis servos:** un arranque por reinicio y lo mismo en serial, energía y fallas.

El contador de instrucciones se agrega en memoria al núcleo armado, sin escribirlo (técnica del diagnóstico de Codex). El tiempo se compara con una tolerancia de unos ciclos, porque el chip ejecuta instrucciones enteras y cada pedazo puede pasarse un poco, como en el Worker.


## 68. La historia de un registro: ¿sirve lo que se guarda? (REG-004, 19 y 20 oct 2026, Claude)

El registro de eventos (contrato, sección 6.1) guarda una línea por cada cosa que pasa. Leer un `.jsonl` a mano no dice si sirve para el estudio. La fase 4 responde esa pregunta con un lector que cuenta la historia en español. Vive en TecnoBloques (`herramientas/historia-registro.js`, porque TecnoBloques escribe los registros), no usa dependencias propias y solo lee.

El 20 oct se rehízo por capas, después de la auditoría integral de Codex ([informe](../docs/AUDITORIA-INTEGRAL-REG004-CODEX-2026-10-20.md)). Hasta entonces cada verificación encontraba un caso suelto nuevo; la causa era que el lector afirmaba cosas que el registro no respaldaba. Ahora cada capa le entrega a la siguiente solo lo que está acreditado:

```
 .jsonl (uno o varios, o una carpeta)
        │
        ▼  1. LECTURA (leerArchivos)
 cada línea: UTF-8 estricto, BOM solo al inicio, JSON y el esquema del contrato (el revisor de TecnoCircuito)
        │  la que no sirve se APARTA con su motivo y deja un hueco en su sesión (la sesión sale del JSON ya
        │  decodificado; si está roto, de su texto con los escapes decodificados; si no se sabe, de sus vecinas)
        │  una ruta que no existe se dice; la misma ruta dos veces se lee una vez
        ▼  2. HECHOS (contarHistoria)
 sesiones por sesión + equipo · archivos de una sesión en el orden de la fecha de su nombre
 una línea que ya llegó en otro archivo (copias que se pisan) se cuenta una vez
 corridas con su modo, sus no idealidades, su placa y sus piezas
        │
        ▼  3. INTEGRIDAD
 huecos (líneas apartadas, eventos perdidos) · contradicciones · ciclo de vida · reloj  ──►  «Avisos»
        │  un hueco impide comparar a través de él; una duda de la sesión impide asegurar el final
        ▼  4. CONCLUSIONES
 «corrigió» solo entre corridas comparables · si no, «ya no se observó (motivo)» o «no se compara»
        │  narrar (o --json, para el análisis)
        ▼
 la historia en texto · código de salida: 0 limpio, 1 con avisos o líneas apartadas, 2 sin nada que leer
```

**Qué cuenta, en orden:**
- Lo que hace el equipo: los cambios del circuito seguidos se juntan en una frase («quitó r1 (resistencia); agregó otra r1 (resistencia); cambió r1: ohmios 330; movió r1»), y lo mismo con los bloques. También cuenta cada cambio de placa, cada compilación con su resultado y qué cambió del programa, y lo que sube a la placa real.
- Cada corrida, con su placa, su modo, sus fallas, pausas, pulsos de botón y reinicios.
- Al cerrar una corrida, la compara con la anterior de la misma sesión. Ahí sale lo que busca el estudio: «Corrigió: LED quemado (led1)».
- Un resumen por sesión: fallas vistas, corregidas al final, las que ya no se observaron (y por qué) y las que siguen sin corregir.

### Las palabras de las conclusiones (decisiones de Efraín, 20 oct)

**«Corrigió»** solo se dice entre dos corridas **comparables**: completas y coherentes, sin un hueco del registro entre ellas, con el mismo modo, las mismas no idealidades encendidas y la misma placa, y la pieza de la falla sigue en el circuito. Si una falla desaparece y algo de eso cambió, la historia dice **«Ya no se observó»** y el motivo, porque desaparecer no es corregir:

| Lo que cambió entre las corridas | La historia dice |
|---|---|
| El modo, de realista a ideal | «Ya no se observó: LED quemado (led1) (cambió el modo: realista → ideal).» |
| Se apagó una no idealidad | «… (cambió lo que se revisa: danoComponentes apagada).» |
| Otra placa | «… (cambió la placa: uno → nano).» |
| Quitaron la pieza | «… (quitó led1).» |
| Hay un hueco o algo incoherente entre las dos | «No se compara con la corrida 1: hay un hueco en el registro entre las dos.» |

El resumen usa **el mismo criterio que los pasos**, para no contradecirlos (INT-RES-01 y 02, verificación de Codex del 20 oct). Para cada falla que ya no está al final se mira el **tramo** que va desde la última corrida que la vio hasta la última línea de la sesión:

```
 corrida que la vio ── corridas siguientes ── … ── última corrida ── fin de la sesión (última línea)
 └──────────────── todas completas y coherentes, sin huecos en todo el tramo ──────────────────┘
        └── alguna posterior comparable (mismo modo, no idealidades, placa y la pieza sigue)
```

- Si alguna corrida del tramo, **la que la vio incluida**, está incompleta o es incoherente: «No se puede asegurar: LED quemado (led1) (la corrida 1 quedó sin cierre)». Esa corrida pudo esconder que la falla volvió.
- Si hay un hueco en el tramo, también **después del último cierre** (una línea apartada, eventos perdidos): «No se puede asegurar: … (hay un hueco en el registro después de verla)». La corrección que dijo un paso sigue siendo un hecho de ese momento; lo que no se asegura es el final.
- Si el tramo está acreditado y alguna corrida posterior es comparable: «Corregidas al final». Así, una corrección hecha en las mismas condiciones sigue valiendo aunque después cambien la placa o el modo (lo mostró la prueba final de Efraín).
- Si ninguna posterior es comparable: «Ya no se observaron al final», con el motivo de la última corrida. Y el final entero queda en «no se puede asegurar, porque…» si la última corrida no está completa y coherente, si llegaron fallas sin atribuir o si la sesión tiene una duda propia: no tiene `sesion_iniciada`, empieza dos veces o comparte su código con otro equipo.

**«El mismo programa»** solo se dice si el C++ registrado es **idéntico, carácter por carácter**. Si solo difiere en espacios o saltos de línea, dice «Programa: cambió solo en espacios o saltos de línea»: es un hecho sobre el texto y no afirma que el programa haga lo mismo. Antes el lector intentaba decidir qué espacios eran datos (dentro de las cadenas) y cuáles no; cada verificación de Codex encontró un borde nuevo (R4, R4a, R4b, INT-08), porque eso exige entender C++. Con la igualdad exacta esa pregunta desaparece. Para mostrar qué cambió, las líneas se comparan sin espacios a los lados (la subsecuencia común más larga); los cambios iguales se juntan con «(2 veces)»; una línea larga se muestra alrededor de lo que cambió, y si el detalle no cabe, lo dice («cambió un tramo de 4 líneas (el detalle no cabe)») en vez de mostrar dos lados iguales.

**La línea de comandos** siempre muestra la historia. Sale con **0** si todo está limpio, con **1** si hay avisos o líneas que no se pudieron leer (para que un análisis automático no tome por limpio un registro con problemas) y con **2** si no se le dio nada que leer.

### Qué avisa

| Aviso | De dónde viene |
|---|---|
| El C++ de `codigo_compilado` tiene comentarios | AUD-01 |
| Hueco: eventos perdidos cuando el disco falló, o una línea apartada (JSON dañado, bytes que no son UTF-8, fuera del esquema, sin hora, de otra versión) | AUD-02 · INT-02, INT-04, INT-07 |
| Hueco: un evento que no se pudo guardar (`evento_descartado`: demasiado grande, no se pudo convertir a texto o sin tipo). Si era de una corrida, esa corrida no se compara; si era su inicio, sus eventos quedan sin atribuir (sección 69) | AUD-07 |
| Una exportación que no se pudo admitir (incompleta, alterada, con archivos de más o de menos, sin manifiesto) o con eventos pendientes; copias del mismo archivo que no coinciden; un tramo del reloj que no existe o una corrida que mezcla eventos con y sin tramo (sección 69) | AUD-09, AUD-10, AUD-12 |
| Las fallas del cierre no son las que llegaron una a una; cierres que no coinciden entre sí | AUD-03 · R1 |
| Una corrida tiene eventos en una sesión donde no empezó | AUD-04 |
| La sesión comparte su código con otro equipo (se cuentan aparte) | INT-03 |
| Sin `sesion_iniciada`, o no es lo primero (¿archivos en otro orden?); empieza o termina dos veces; corrida sin cierre; eventos después de terminar | INT-05 · app cerrada de golpe |
| **Contradicciones de una corrida**, que además le impiden compararse: empieza dos veces, se cruza con otra (empezó otra antes de que esta cerrara), empezó con otra abierta que nunca se cerró, empezó después del fin de la sesión, pausa o reanudación imposible, su cierre dice dos tiempos simulados, sus cierres dicen tiempos distintos, una falla, una pausa o un reinicio después del tiempo de su cierre, eventos después de su cierre o después del fin de la sesión, su circuito dice otra placa | INT-05, INT-11 · INT-RES-03, 03a y 03b |
| Una corrida simula con otra placa que la elegida («falta un `placa_cambiada`») | Prueba de Efraín |
| El reloj del computador retrocedió (solo se avisa: la historia sigue el orden de escritura) | INT-11 |
| Una línea con una hora que no es una fecha (más allá de lo que `Date` representa) se aparta | INT-RES-05 |
| Eventos de un tipo que esta historia no interpreta | INT-10: el contrato los permite, pero en el estudio la versión está congelada, así que un tipo nuevo dice que el análisis quedó incompleto |

Las **notas** no son problemas: un BOM que se quitó, una ruta repetida o líneas que llegaron en dos archivos.

Los números de corrida los cuenta TecnoCircuito mientras la página está abierta (sección 66). Por eso una corrida se identifica por su sesión y su número. Los **hechos** de una corrida son la unión de las fallas de todos sus cierres y las que llegaron una a una (R1, R1c): una falla que se vio nunca desaparece del resumen. Las fallas de una corrida que no empezó en la sesión entran marcadas «[sin atribuir: corrida N]» (R1b).

**El tiempo de una corrida** (INT-RES-03a y 03b, verificación de Codex del 20 oct). Cada falla que llega y cada cierre se guardan con su tiempo simulado, **también las repeticiones** (`ocurrencias` y `tiemposCierre` en `--json`): antes se guardaba solo la primera repetición y el último cierre, y una contradicción podía quedar escondida según el orden. Cada cierre se compara con todo lo que llegó en **su mismo tramo del reloj**. El RESET del botón pone el reloj de la corrida en cero (sección 66), así que empieza un tramo nuevo; un reinicio por energía no lo hace, porque el núcleo conserva el reloj.

**De dónde sale el tramo** (INT-RES-03c, decisión de Efraín del 21 oct). Una foto tomada antes del RESET puede llegar a la página después, y sus hechos se entregan igual (AUD-03). Por el orden de escritura no se sabe de qué lado del RESET vino, así que desde el 21 oct **cada evento del simulador trae su `tramo`** (contrato 6.1, campo opcional). La página lo sabe sin adivinar: el Worker marca cada foto con el turno de la última orden que recibió, y la página guarda el turno de cada RESET de la corrida (`turnosReset` en `simulador.js`). El tramo de una foto es cuántos RESET tienen un turno menor o igual al suyo:

```
 página:  ▶ inicio (turno 1) ─── RESET (turno 2) ─────────────── Detener (turno 3)
 Worker:  foto turno 1, 20 ms ────────┐ (en camino)   foto turno 2, 10 ms ─── detenido, 10 ms
 registro: reinicio_placa  tramo 0    │
           falla a 20 ms   tramo 0 ◄──┘ llegó después, pero su turno (1) es de antes del RESET (2)
           cierre a 10 ms  tramo 1     el cierre se compara solo con el tramo 1: no hay contradicción
```

Los eventos de la página (pausa, reanudar, el propio RESET, el cierre) llevan el tramo de ese momento; el RESET y un «reanudar» que sale al pulsarlo en pausa, el de antes. El lector usa `tramo` cuando viene; un registro anterior, sin él, se cuenta por el orden de escritura, con el límite de la foto que llega tarde.

```
 tramo 0:  0 ── falla a 1,5 s ── RESET (sale con 1,6 s)
 tramo 1:                         0 ── falla a 0,4 s ── cierre a 1,0 s
                                  └──── el cierre se compara con su tramo ────┘
 la falla de 1,5 s es del tramo 0: no contradice el cierre de 1,0 s (uso normal)
 una falla, pausa o reinicio de más de 1,0 s en el tramo 1, sí: la corrida no se compara
```

Sin los tramos, un equipo que pulsa RESET y detiene pronto quedaba con una corrida «incoherente» sin motivo: el lector anterior ya tenía ese falso positivo con las fallas. Lo demás del ciclo de vida: el cierre es lo último de una corrida (AUD-03), así que cualquier evento de ella después de su cierre es una contradicción, salvo un cierre repetido idéntico (mismas fallas y mismo tiempo); y la app cierra la corrida antes de terminar la sesión, así que un cierre o un hecho que llega después de `sesion_terminada` se conserva, pero no acredita cómo quedó. Una corrida que empieza mientras otra sigue abierta, y esa nunca se cierra, tampoco se compara: no se sabe si se cruzaron.

**Límite conocido:** si el Worker no confirma el cierre en 500 ms (sección 66), el cierre sale con el último tiempo que mostró la página, y una falla que llegó en esa espera puede tener más tiempo. La corrida queda «no se compara»: se pierde una comparación, pero no se afirma nada falso.

**Uso:** `npm run historia -- %APPDATA%\TecnoBloques\registros` en TecnoBloques, o con la carpeta que sale de «Exportar registros». Con `--json` sale la historia como datos (`limpio`, `historias`, `problemas`, `notas`). Para validar con el esquema necesita el repositorio de TecnoCircuito al lado (`..\TecnoCircuito`); si no está, lo dice y sale con 1.

### La prueba de Efraín (20 oct)

Que el lector funcione no prueba que la historia sirva. Por eso Efraín trabajó en la app como equipos de prueba y contrastó la historia con lo que hizo ([informe](../validacion/2026-10-20-reg004-aceptacion.md)). La primera prueba coincidió en las corridas, las fallas, la corrección y el cambio de equipo, y mostró tres defectos:

```
 lo que hizo Efraín               lo que decía la historia            después
 ───────────────────────────      ─────────────────────────────       ───────────────────────────────────────
 eligió el Uno (venía del Nano)   «nano» en el encabezado; nada       «Cambió la placa: nano → uno.»
                                  decía el cambio                     (evento nuevo placa_cambiada)
 delay 500 → 200 en los bloques   «Bloques: 8 (5 tipos)», igual       «Programa: `delay(500);` → `delay(200);`
                                  que antes                            (2 veces).»
 armó LED y resistencia           «cambió r1: desenchufado; r1:       «cambió r1: giro 90°, enchufado en
                                  giro 90°; r1: desenchufado; …»       2→placa.GND1»
```

- **La placa:** TecnoBloques emite `placa_cambiada` `{de, a}` cada vez que cambia la placa elegida, por cualquier camino: el selector, la placa que detectó la subida, un proyecto o un ejemplo (una sola función, `ponerPlaca`, en `src/app.js`). Va antes de lo que provoca. Es un cambio aditivo del contrato 1 (sección 6.1). El encabezado dice todas las placas que pasaron («nano → uno») y cada corrida dice con cuál simuló; si una corrida usa otra placa que la elegida, se avisa que falta un `placa_cambiada`.
- **Los bloques:** los `bloques_cambiados` seguidos se cuentan en un solo paso: «8 (5 tipos) → 1 (1 tipo)», o «cambió algo dentro de los mismos 8 (misma cantidad y mismos tipos)», que es lo que el resumen acredita.
- **El circuito:** de cada pieza se dice cómo quedó, no los pasos intermedios. Lo que se hizo y se deshizo en el mismo tramo no se cuenta; si todo se deshizo, «hizo cambios y los deshizo». El lienzo da el primer id libre, así que si el equipo quita `r1` y agrega otra resistencia, la nueva también es `r1` (R3): cada alta empieza una pieza nueva que no hereda nada de la quitada.

```
 eventos del tramo                       piezas con el id r1                 la historia dice
 ─────────────────────────────────       ─────────────────────────────       ──────────────────────────────
 cambia r1 a 1000 Ω                      la que estaba: 1000 Ω
 quita r1                                la que estaba: quitada        ──►   quitó r1 (resistencia);
 agrega r1                               otra, nueva: sin valores            agregó otra r1 (resistencia)
```

La segunda prueba, con la app corregida (`PRUEBA-03`), coincidió sin avisos y **Efraín aceptó la historia**. Las palabras nuevas del rediseño cambian lo que se lee, así que hizo una prueba final (`PRUEBA-04`): quemó el LED, lo corrigió con la resistencia, cambió el programa y después la placa a Nano. La historia coincidió, pero el resumen decía «Corregidas al final: ninguna… ya no se observaron (cambió la placa)», porque comparaba solo con la última corrida y escondía la corrección de la corrida 2. Se corrigió con la regla de arriba, con su regresión. En el informe público va solo lo técnico, sin registros de aprendices.

### Pruebas

- `npm run test:historia` (175 OK; 21 por INT-RES-01 a 05, 19 por INT-RES-03a/03b y el límite de la corrida abierta, 4 por `evento_descartado`, 7 por INT-RES-03c con `tramo` y 29 por el lote de la sección 69: la foto de antes del RESET que llega después, el reinicio por energía de esa foto, el RESET en pausa, sus controles y dos tiempos imposibles del reloj nuevo): una secuencia sintética armada con el sobre real (`crearRegistroEventos`) y un reloj fijo tiene que salir renglón por renglón; otra con los defectos de AUD-01 a AUD-04 tiene que avisarlos todos. Siguen los casos de R1 a R3 (cierres faltantes, contradictorios, tardíos o sin inicio, y piezas que reutilizan el id), la sesión de Efraín y una regresión por familia de la auditoría: el programa (idéntico, solo espacios, los raw y empalmes de R4/R4a/R4b, INT-08, líneas largas de INT-09), INT-01 (modo, no idealidad, placa y pieza), INT-02 (hueco entre corridas y su control), INT-03, INT-04 (cuatro líneas inválidas y una sesión rota que no tumba la buena), INT-05, INT-10, INT-11 y la línea de comandos (código de salida, INT-06 e INT-07 con archivos de verdad). Los datos sintéticos cumplen el esquema, porque ahora el lector lo valida.
- `test:registro-app` (con la sección 9 de AUD-07/08 en otra carpeta de datos): al final lee los registros reales que la app escribió en Electron (11 sesiones, de A7 a L9). Ninguno tiene avisos, y las corridas con el LED quemado cuentan sus dos fallas. Una corrida de E2 pulsa RESET a los 1,5 s y se detiene poco después: el reinicio sale con 1524 ms y el cierre con 201 ms, y la historia lo lee sin avisos.
- `probar:fotos` de TecnoCircuito (33): la misma foto de antes del RESET, entregada antes y después del RESET con el `simulador.js` real, deja sus hechos en el tramo 0 con su tiempo, el RESET en el 0 y lo del reloj nuevo, con el cierre, en el 1.
- Los instrumentos de Codex pasan, salvo dos controles que esperaban «el mismo programa» con solo otra sangría: por la decisión de Efraín ahora dicen «cambió solo en espacios o saltos de línea».

## 69. Lo que no se puede guardar, las exportaciones y su lectura (AUD-07 a AUD-14, 21 oct 2026, Claude)

La auditoría integral de Codex (20 oct) encontró dos pérdidas silenciosas en el escritor del registro de TecnoBloques (`escritorio/registro-disco.js`). Su corrección pasó después por dos auditorías más, el mismo día: una de un auditor aparte que pidió Efraín (A-01 a A-10) y la auditoría profunda de Codex (F01 a F08, fichas AUD-09 a AUD-14). Todo se corrigió en un solo lote.

### Un evento que no se puede guardar (AUD-07)

Una línea se guarda si su JSON mide como mucho **2 097 152 caracteres** (unidades de texto de JavaScript, sin el salto de línea, como cuenta también la cola). En bytes UTF-8 una «ñ» o un emoji pesan el doble, y un carácter como «€», «…» o «漢» el triple: en el límite, una línea de «漢» pesa unos 6,3 MB. Antes, la línea más larga se perdía en silencio. Ahora, por decisión de Efraín, en su lugar va un evento nuevo del contrato, **`evento_descartado`**:

```
 la página                      el proceso principal (registro-disco.js)          el archivo .jsonl
 ─────────────────────          ───────────────────────────────────────────        ─────────────────────────
 registrar(ev) ── IPC ──►  escribir(línea):
                             ¿registro apagado? ─────────────── sí ──► nada (como antes)
                             ¿configuración que no sirve? ───── sí ──► espera, falla CONFIG (AUD-11)
                             ¿sin tipo? ────────────────────── sí ──┐
                             ¿no se puede convertir a texto? ─ sí ──┤
                             ¿más de 2 097 152 caracteres? ─── sí ──┴► evento_descartado ──► {motivo, tipo, origen,
                             si no ────────────────────────────────► la línea, como siempre    corrida, largo, limite},
 si el evento no cruza el IPC                                                          con la hora del perdido
 (no se puede copiar) ─────────────────────────────────────────────► evento_descartado (motivo: no_serializable)
                             la cuenta sube ──► la esquina, solo para el equipo que está trabajando
                                             └► el panel del instructor: la cuenta de toda la app
```

- **La hora:** el `evento_descartado` lleva la `t` del evento perdido, si la traía. Así queda en su lugar, no después del evento siguiente (antes aparecía un aviso falso de «reloj que retrocede»), y cerca de medianoche va al archivo de su día (A-02).
- **Anotado, pendiente o sin anotar (F05):** el marcador va por el mismo camino que las demás líneas. Con el disco fallando espera en la cola (pendiente) y solo se cuenta como **anotado** cuando queda escrito. Si no cabe en la cola, si el instructor apaga el registro antes de escribirlo o si su sobre no sirve, queda **sin anotar**. El panel lo dice así: «2 quedaron anotados en el registro; 1 espera a que el disco funcione para anotarse».
- **La esquina por equipo (A-05, decisión de Efraín):** «Equipo B2 · El registro perdió un evento · Avisen al instructor», solo con las pérdidas de la sesión del equipo que está trabajando. Al cambiar de equipo vuelve a la normal, y sin equipo dice «Falta el código del equipo». Con el registro apagado no hay equipo y la esquina se oculta; la cuenta de toda la app queda en el panel del instructor, que es quien lo apaga. El panel se actualiza en vivo si está abierto (F06).
- **Nada lanza:** la página manda su aviso aunque el evento traiga un getter que falla (A-07), y los manejadores del IPC del proceso principal no dejan escapar una excepción del registro.

### La configuración (AUD-11)

`estado()`, `escribir()` y las acciones del instructor usan un solo validador: `registro-config.json` tiene que ser un objeto con `activo` booleano y, si hay PIN, su sal (32 hexadecimales) y su resumen (64). **Encendido exige PIN**, porque sin él nadie podría apagarlo. `null`, `[]`, un número, `{ "activo": true }` o un PIN roto son una configuración ilegible, como un JSON roto: falla CONFIG visible, nada se escribe, nadie entra con el PIN, el archivo no se toca y se arregla creando un PIN nuevo, que guarda aparte la dañada (como en AUD-02-V2).

### Las exportaciones (AUD-08 y AUD-14)

```
 exportar ──► listar los .jsonl de este PC ── ¿no se pueden leer (EACCES, EIO)? ──► «disco», donde: origen (AUD-14)
          ──► mkdir «…_1205» sin recursive ── ¿ya existe? ── mkdir «…_1205-2» … hasta 1000 (código TOPE)
          ──► cada .jsonl: copiar sin pisar (COPYFILE_EXCL), comprobar que tenga los bytes del original y su sha256
              si una copia falla: se borra el pedazo copiado y se detiene («copia-incompleta», con su código y su lado)
          ──► exportacion.json: {formato, version_tb, t, completa, total, archivos: [{archivo, bytes, sha256}],
                                 pendientes, y si quedó incompleta: faltan, error}
```

El nombre de la carpeta y el `t` del manifiesto salen de una sola hora. La app dice el error en palabras («la memoria USB está llena», «no hay permiso para leer los registros de este computador», «la carpeta ya no está (¿se sacó la memoria USB?)»), no el mensaje de Node.

### Lo que la historia hace con todo esto (AUD-09, AUD-10, AUD-12, AUD-13, A-01 y A-03)

- **Admisión de una exportación (AUD-09).** Si una carpeta tiene `exportacion.json` o se llama como una exportación, la historia la admite antes de leerla: el manifiesto se lee, es del formato 1 y tiene la estructura que escribe TecnoBloques (`app`, `version_tb`, `t`, `completa`, `total`, `archivos` y `pendientes` obligatorios, con sus tipos y sin convertir nada: un `pendientes` que falta o es «1» no es cero; con `completa: false`, `faltan` y `error`; AUD-09-R1), dice `completa: true`, cada archivo listado está con sus bytes y su sha256, no hay `.jsonl` de más y los nombres no salen de la carpeta. Si algo falla, se dice como problema (la línea de comandos sale con 1) y sus sesiones **no comparan corridas ni aseguran el final**. `pendientes > 0` también se dice y no deja asegurar el final. Un archivo suelto se lee crudo, sin verificar, y la carpeta de la app no es una exportación.
- **Copias del mismo archivo (AUD-10).** Dos exportaciones traen el mismo archivo en dos momentos. La más larga contiene a la otra desde el principio y es la que se lee, con todas sus repeticiones (una pieza agregada, quitada y agregada otra vez no se pierde). Si una copia no es el comienzo de la otra, se avisa y no se asegura el final.
- **El tramo tiene que existir (AUD-12).** Una corrida empieza en el tramo 0 y cada RESET del botón abre el siguiente. Un evento con un tramo mayor que los RESET que hubo, un evento de la página (pausa, reanudar, el RESET o el cierre) que no es del tramo actual, una corrida que empieza en otro tramo o que mezcla eventos con tramo y sin él: la corrida no se compara.
- **UTF-8 por línea (AUD-13).** Cada línea se decodifica sola: un byte roto aparta solo su línea, y un «�» escrito a propósito en otra línea se conserva. El BOM se quita solo al comienzo del archivo.
- **El cierre perdido (A-01).** Si el `evento_descartado` era el cierre de una corrida, se sabe que existió: las corridas siguientes no se acusan de haber empezado con ella abierta, y su aviso dice «perdió su cierre (no se guardó)».
- **Nada se compara a través de un hueco (A-03).** En un hueco (una línea apartada, un `evento_descartado` o eventos perdidos en `registro_interrumpido`) pudo perderse una compilación, un resumen de bloques o un cambio de placa. Después de él, la compilación siguiente no se compara con la anterior («después de un hueco: no se compara con la compilación anterior»), los bloques empiezan de nuevo y no se acusa un `placa_cambiada` que falta.

**Pruebas:** `test:registro` de TecnoBloques (202): las fronteras con «x», «ñ», emojis y «漢»; los motivos; la configuración (doce formas mal formadas, el reemplazo y el control); anotado, pendiente y sin anotar con la cola llena por número y por tamaño; la cuenta por sesión; la hora y el día del marcador; la carpeta de origen sin permiso; la copia que escribe la mitad y falla, la que termina con otro tamaño y el tope de 1000. `test:historia` (192): los tramos imposibles, el cierre perdido, los huecos, las copias y la admisión (una exportación entera, nueve dañadas y trece manifiestos mal formados, con `pendientes` 0 y 2 como controles y un evento de verdad en la cola), UTF-8 con BOM y CRLF. `test:registro-app`, en Electron, en una carpeta de datos aparte: la esquina por equipo, el panel que se actualiza abierto, el registro apagado y dos exportaciones obligadas a usar el sufijo con carpetas señuelo. Los diagnósticos de Codex (23 casos) y del auditor (r01 a r08) no reproducen ninguno de sus fallos.

## 70. El registro de punta a punta, la revisión final y sus límites (REG-005, 22 oct 2026, Claude)

Fase 5 del registro: una revisión de código de los dos proyectos (`/code-review`, por separado), la corrección de lo que encontró, la sección 6.1 del contrato reescrita para describir lo que hay, y en esta sección el camino completo de un evento y la lista de lo que el registro **no** garantiza, con su estado.

### El camino de un evento

```
 TecnoCircuito (el paquete; no guarda nada)                 TecnoBloques: la página (src/app.js, src/registro.js)
 ──────────────────────────────────────────                 ──────────────────────────────────────────────────────
 lienzo ── alEvento ── cable_agregado, componente_…  ─┐
                       boton_pulsado                  │    registroEventos.registrar(ev):
 simulador (página) ── alEvento ── simulacion_…,       ├──►   ¿hay equipo? (registro encendido y código confirmado)
   ▲                   reinicio_placa (botón),        │      + sobre: equipo, sesion, version_tb, version_tc
   │ fotos (turno)     falla, reinicio por energía ───┘      + eventos del editor: sesion_iniciada, placa_cambiada,
 Worker: núcleo                                              codigo_compilado (C++ sin comentarios), programa_subido…
 (chip + circuito)                                                │ IPC
                                                                  ▼
 TecnoBloques: el proceso principal (escritorio/registro-disco.js; solo él toca el disco)
 ─────────────────────────────────────────────────────────────────────────────────────────
   ¿línea válida y ≤ 2 097 152 caracteres? ── no ──► evento_descartado en su lugar (69)
   escribir entera en registros/<equipo>-<fecha>.jsonl ── el disco falla ──► cola en memoria (5000 líneas o 20 MB);
                                                                             al recuperarse: las líneas y registro_interrumpido
   «Exportar registros» ──► intenta escribir la cola ──► carpeta nueva + copias sin pisar + exportacion.json (sha256)
                                                                  │
                                                                  ▼
 herramientas/historia-registro.js (npm run historia -- <carpeta>), sección 68
 ────────────────────────────────────────────────────────────────────────────
   admitir la exportación (manifiesto) ─► leer con el esquema ─► hechos por equipo y sesión ─► integridad (huecos,
   contradicciones, tramos, cierres) ─► conclusiones: «corrigió» solo entre corridas comparables; si no, «ya no se
   observó (motivo)» o «no se compara»
```

### El tiempo de cada evento del simulador

El Worker lleva el reloj; la página solo recibe fotos. Cada foto trae su `turno` (el estado con que se pidió) y los hechos que el núcleo no había mandado. Tres reglas, las dos primeras corregidas hoy:

```
 Worker  ──── 1000 ms ──── 1015 ms (el LED se quema, todavía sin foto) ──┐
                                                                         │  RESET (turno 2)
 antes:  foto(turno 2, ms 0) ── trae la falla de 1015 ── tramo 1, 0 ms   │  ✗ un hecho de antes, en el reloj nuevo
 ahora:  foto(turno 1, ms 1015) ── la falla, tramo 0 ── luego el RESET ──┘  ✓ en su tramo, con su tiempo (TC-1)
```

1. **Al pulsar RESET, lo pendiente sale primero con el turno de antes** (`trabajador.js`). La página lo recibe como una foto tardía de su tramo (sección 66). Si esa foto falla, el Worker avisa el error y el RESET se hace igual.
2. **Lo que emite la página lleva lo último que sabe del reloj de su tramo**: el mayor entre la vista y los hechos ya emitidos de ese tramo (`msAhora()` en `simulador.js`). Antes usaba solo la vista, que no avanza con una foto tardía, y un cierre sin confirmar podía decir 1000 ms con una falla ya registrada a 1014: la historia lo leía como «una falla después del cierre» (TC-3). La pausa y el RESET usan la misma regla (TC-4); el Worker pudo ir unos ms adelante, y eso se dice en el contrato.
3. **El cierre dice si el Worker lo confirmó** (`confirmado`, decisión de Efraín): `true` con la confirmación y su última foto; `false` si salió por la espera de 500 ms, por cerrar la ventana (`sinEsperar`) o porque la última foto falló. Si una foto falla al detener, el Worker igual confirma que paró, sin tiempo (TC-6), y la página lo marca `false`. La historia no compara una corrida con `confirmado: false` («se cerró sin la confirmación del simulador (pudieron quedar fallas sin llegar)»), sin avisarlo como defecto del registro, porque cerrar la ventana mientras se simula es normal.

**La frontera del tramo 0** (nota de la verificación de Codex del 21 oct): `simulacion_iniciada` abre la corrida siempre en el tramo 0, lleve o no el campo, y no cuenta para «mezcla eventos con tramo y sin él»; esa revisión mira los eventos posteriores. Un inicio con un tramo distinto de 0 sí es una contradicción.

### Lo que encontró la revisión y qué se hizo

| | Hallazgo | Qué se hizo |
|---|---|---|
| TB-1 | `quitarComentarios` no era idempotente: cada pasada añadía un espacio tras el `\/**/`, y la historia acusaba «C++ con comentarios» sobre un registro correcto | El separador que ya está queda igual; `test:registro-preprocesador` revisa ahora, en cada caso y en 2000 al azar, que limpiar otra vez no cambie nada |
| TC-1 a TC-4, TC-6 | Arriba | Corregidos |
| TC-2 | Un cierre sin confirmación perdía fallas en camino sin dejarlo dicho | Campo `confirmado` (contrato 6.1) y la historia no compara esa corrida |
| TC-5 | Sin Worker, destruir sin esperar dejaba el reloj corriendo en la página | Terminar entrega el «detener» en el acto |
| TC-7 | `activas` copiaba cualquier valor de `noIdealidades` (una línea inválida para el esquema) | Solo las claves conocidas, como sí o no |
| TC-9 | `destruir()` no soltaba sus oyentes del lienzo | `alCambiar`, `_alPulsar` y `_alAcercar` devuelven cómo quitarlos, y `destruir()` los suelta |
| TB-2 | Si apagar el registro fallaba por el disco, el equipo quedaba sin sesión con el registro encendido | Vuelve a su sesión y el panel dice qué hacer |
| TB-3, TB-4, TB-9 | «Cambiar a Nano» no rehacía el lienzo; cambiar la placa o el proyecto mientras se compilaba simulaba el .hex en el lienzo nuevo; `programa_subido` tomaba la placa después de subir | El lienzo se rehace; la simulación no empieza si cambió la placa o el lienzo; la placa se toma al empezar |
| TB-5, TB-6 | Exportar no intentaba antes escribir lo que esperaba; un original bloqueado (antivirus) se le culpaba a la USB | Se vacía la cola antes de copiar; si el original no se puede abrir para leer, el error es del origen |
| TB-7 | Un código confirmado mientras otro cambio de equipo esperaba se perdía | Los cambios van en cola, uno detrás de otro |
| TB-8 | Un proyecto que no abría dejaba dos `placa_cambiada` que nadie hizo | El cambio se registra solo si el proyecto abre |
| TB-10, TB-15 | Una librería con «-» quedaba como error «compilar»; dos mensajes del instructor no decían qué hacer | Una sola expresión para los dos usos; mensajes con la acción |
| TB-11, TB-12, TB-14 | Rendimiento: la configuración se lee dos veces por evento, la exportación copia y calcula el sha256 sin soltar la ventana, la historia lee dos veces cada archivo | No se cambian ahora: van a la tabla de abajo, con la medición pendiente |
| TC-8, TB-13 | Rediseño: sellar el tiempo de cada hecho en el núcleo; atar cada evento a su sesión en un solo lugar | Ideas para después de la etapa 0: rehacen lo que Codex acaba de verificar |

### Lo que el registro no garantiza (estado al 22 oct)

Los once riesgos y límites que dejó la auditoría profunda de Codex (21 oct), los tres de rendimiento de la revisión y los dos del simulador. Ninguno se da por cerrado porque las pruebas pasen.

| Riesgo o límite | Estado | Qué lo resolvería | Quién |
|---|---|---|---|
| Exportación síncrona y en memoria (TB-12) | Permanece: copia, relee y calcula el sha256 en el proceso principal; la ventana se congela mientras tanto. Sin prueba de volumen | Copiar y calcular por bloques, fuera del hilo de la ventana, con progreso; medir con semanas de registros en el PC del aula | Claude, si la medición lo pide |
| Coste por evento (TB-11) y del IPC | Permanece: la configuración se lee dos veces por evento y el límite de una línea se revisa después de cruzar el IPC | Configuración en memoria y un presupuesto antes del IPC; medir latencia con ráfagas de eventos | Claude, si la medición lo pide |
| Cierre de la app con el disco averiado | Permanece: la cola está en memoria; lo que espera al cerrar se pierde, con o sin `registro_interrumpido`. El aviso lo mostró | Guardar la cola en otro lugar o un criterio de «sesión incompleta» para el análisis | Efraín decide |
| Durabilidad física de la USB | Pendiente externo: la copia y el sha256 están probados en el disco; no hubo USB real, extracción ni expulsión | Probar con una USB real, expulsión segura y leer la copia con la historia | Efraín (laboratorio) |
| Hora y orden | Mejoró (la hora del evento perdido, medianoche); permanece: `t` es el reloj del PC, sin secuencia propia | Una secuencia por sesión si el estudio necesita orden garantizado | Efraín decide |
| Procedencia de la versión | Pendiente: `exportacion.json` dice `version_tb`, pero no identifica el paquete exacto que produjo los datos | Resolverlo con la versión congelada (DIST-001) antes del estudio | REG-005/DIST-001 |
| Portabilidad del lector | Permanece: la historia necesita Node y el esquema de TecnoCircuito al lado; no se probó instalada aparte | Empaquetarla y probarla sin red en el PC donde se analice | Claude, cuando se decida dónde se analiza |
| PIN y privacidad | Mejoró la configuración; permanece: el PIN no cifra los `.jsonl`, y los textos entre comillas del C++ pueden traer lo que el aprendiz escribió | Efraín define permisos y manejo de copias; revisar los textos antes de compartir (contrato 6.1) | Efraín |
| Retención y crecimiento | Pendiente: sin cuota, rotación ni aviso de poco espacio | Decidir retención y archivado; probar con poco espacio | Efraín decide |
| Qué prueba una «corrección» | Límite que permanece: el registro dice qué pasó en el simulador entre corridas comparables; no prueba aprendizaje ni causa, ni une criptográficamente el `.hex` con la compilación | Mantener el lenguaje de observación; evidencia adicional si el estudio la exige | Efraín (diseño del estudio) |
| Tope de 1000 exportaciones por minuto, cuenta volátil, fallo del aviso | Parcial: tope explícito (TOPE), panel por estados, cuenta por sesión. Permanecen: la cuenta empieza en cero al abrir; un evento sin sobre no se cuenta por equipo; si falla el propio aviso por IPC, no se ve | Documentado; no se presentan como pérdidas imposibles | — |
| Lecturas repetidas de la historia (TB-14) | Permanece: admitir lee y calcula el sha256 de cada archivo y después lo lee otra vez | Calcular el sha256 sobre lo ya leído, si una carpeta grande lo pide | Claude, si se necesita |
| Registros sin `tramo` (antes del 21 oct) | Límite que permanece: una foto de antes del RESET que llega después se lee en el reloj nuevo | Ninguno retroactivo | — |
| Cierres sin `confirmado` (antes del 22 oct) | Límite que permanece: un cierre por la espera de 500 ms no se distingue | Ninguno retroactivo; desde el 22 oct, `confirmado` | — |

**Pruebas:** en TecnoCircuito, `probar:fotos` suma el Worker real con reloj y canal controlados (la foto antes del RESET, el RESET cuando esa foto falla, la confirmación cuando la última foto falla, el modo sin Worker) y los casos de la página (`confirmado` con espera, `sinEsperar` y confirmación sin foto; la pausa y el RESET después de una foto tardía; `activas`; los oyentes); `probar:contrato` acepta `confirmado: false` y rechaza uno que no es booleano. En TecnoBloques, `test:registro-preprocesador` (avr-g++, todos los casos y 2000 al azar, ahora también idempotente), `test:historia` (TB-1 y `confirmado`, con sus controles), `test:registro` (TB-5 y TB-6, con sus controles) y la sección 10 de `test:registro-app`, en Electron, con la app real (TB-2, TB-3, TB-4, TB-7, TB-8, TB-9 y TB-10). Cada regresión nueva falla con el código anterior.

## 71. El lote final del registro: lo que encontraron las dos verificaciones de Codex (24 oct 2026, Claude)

Codex auditó la entrega del 22 oct (REG-005) y devolvió nueve defectos, un criterio de prueba y dos incoherencias de documentación (AUD-15 a AUD-23, D01 y D02). Su verificación profunda del 24 oct encontró cinco causas más (F01 a F05) y un riesgo, W-R1. Efraín decidió corregir todo en un solo lote y contener W-R1 ahora. Cada corrección tiene su regresión, y las regresiones fallan con el código que Codex auditó.

### Qué se corrigió

| Ficha | Lo que pasaba | Qué se hizo | Dónde se prueba |
|---|---|---|---|
| AUD-15 (R01, F02) | El lienzo da el primer id libre: si se quita `led1` y se agrega otro LED, también es `led1`. La historia daba por corregida la falla del anterior, o decía que «sigue» la del nuevo | Cada corrida guarda la generación de sus piezas (cuántas altas y bajas tuvo cada id), los proyectos y ejemplos abiertos y las piezas que cambiaron mientras corría; cada falla, la pieza que la tuvo. Una falla se corrige o sigue solo en la misma pieza. La de otra pieza con el mismo id se nombra «pieza 2» (también en los datos, `pieza`) | `test:historia` |
| AUD-16 (R02) | Una foto perdida se llevaba sus fallas y el cierre decía `confirmado: true` | El Worker lleva `integra` (verificada por Codex el 24 oct) | `probar:fotos` 14 |
| AUD-17 (R03) | Si la placa cambiaba mientras se soltaba el monitor serial, se subía con un FQBN y se registraba otra placa | Lo que se sube va en un solo objeto, tomado antes de la espera. Si cambió la placa o el puerto, la subida empieza otra vez con lo de ahora, una vez, con todas sus comprobaciones; si cambió el equipo, no se sube. Lo enviado, lo mostrado y lo registrado son lo mismo | `test:registro-app` 11 |
| AUD-18 (R04) | Apagar el registro con un cambio de equipo pendiente dejaba al editor con un equipo que el disco ya no registraba | Apagar y encender van en la misma fila que los cambios de equipo; un cambio que llega con el registro apagado no empieza sesión | `test:registro-app` 11 |
| AUD-19 (R05, R07, F03) | El C++ de un proyecto entraba con un temporizador; uno que no abría perdía el C++ a mano; un C++ vacío se abría como bloques | El C++ entra en la misma carga; el respaldo se toma antes de cambiar nada; `texto` cadena (también vacía) es modo texto, null es bloques y otro tipo se rechaza | `test:proyectos`, `test:registro-app` 10 |
| AUD-20 (R06) | El panel del instructor se quedaba con la cuenta del primer aviso de disco lleno | El aviso sale enseguida al empezar o terminar la falla, al cambiar el motivo o al perder líneas; lo que espera se avisa junto, cada 250 ms | `test:registro`, `test:registro-app` 6b |
| AUD-21 (R09) | Un original que abre pero falla al leerse se le culpaba a la USB | La copia se hace en dos etapas, leer el original y escribir la copia: el lado del error es la etapa que falló. Una copia distinta del original es del destino (`TAMANO` o `DISTINTA`) | `test:registro` |
| AUD-22 (R10, F01) | El hash se comprobaba sobre una lectura y se analizaba otra; con el archivo suelto antes que su carpeta, se perdían los bytes comprobados | Cada archivo se lee una vez; el mismo archivo por dos caminos se junta en un descriptor con los bytes comprobados y la restricción más exigente. Dos lecturas distintas del mismo archivo no concluyen | `test:historia` |
| AUD-23 (R08) | La prueba de la pausa comparaba lo que la página sabía en dos momentos (una foto tardía legítima subía 22 ms) | En Chromium se compara la primera foto del Worker al seguir con lo que se sabía al seguir; en Node, el reloj del Worker durante la pausa y la foto tardía por separado | `probar_registro.py`, `probar:fotos` 16 |
| AUD-24 (F04) | Guardar enseguida de abrir un proyecto llevaba los bloques sin las definiciones de los bloques propios | Las definiciones se sacan del programa en ese momento (`generarPrograma`, que también trae las que ellas llaman), no del último código generado | `test:proyectos` |
| AUD-25 (F05) | Elegir A y después B podía abrir A si la lectura de A terminaba al final; Abrir abría lo de antes mientras se leía | Cada selección tiene su número; la lectura vieja no escribe, al elegir otro archivo la caja se vacía, Abrir espera, un error de lectura se dice y lo escrito a mano manda | `test:proyectos` |
| AUD-26 (W-R1) | Una excepción del núcleo fuera de la foto cortaba el reloj del Worker; la página seguía «corriendo» y el cierre decía `confirmado: true` | Ver abajo | `probar:fotos` 15 |

### Cuando el núcleo falla (AUD-26)

```
 ciclo del Worker ── nucleo.avanzar lanza ──► el reloj para a propósito, la corrida queda incompleta
                                              y sale «error» con su turno y parado: true
 una orden (reiniciar, recablear…) lanza ───► lo mismo; «seguir» no vuelve a arrancar un núcleo que falló
 una foto no sale ──────────────────────────► AUD-16: se avisa, el reloj sigue y la corrida queda incompleta
 la página recibe «error» de su corrida ────► no la da por entera; si el reloj paró, la cierra ya
                                              (simulacion_detenida con confirmado: false)
 error o messageerror del Worker (después de listo) ──► lo mismo; el de messageerror no la cierra
```

No se reintenta solo: si el error sigue, cada vez que se pulsa Simular la corrida para una vez y se cierra sin confirmar. El aviso de una corrida anterior (su turno es de antes) no toca la nueva. Sin Worker, el mismo código corre en la página y hace lo mismo.

### Qué son la sesión y la corrida (D02)

- **Sesión** (`sesion`): un identificador al azar por cada vez que un equipo confirma su código: al abrir la app, al cambiar de equipo o al encender otra vez el registro. Termina con `sesion_terminada` (otro código, apagar el registro o cerrar la app). Una apertura de la app puede tener varias sesiones, y un equipo, varias en el día; la historia cuenta cada una aparte.
- **Corrida** (`corrida`): cuenta en el paquete mientras la página está abierta, no por sesión. Sube con cada `simulacion_iniciada` y no vuelve a 1 al cambiar de equipo: una sesión puede empezar en la corrida 4. Ninguna corrida cruza dos sesiones, porque TecnoBloques la cierra antes de terminar la sesión (AUD-04).

El contrato (6.1) y el esquema decían «por cada vez que se abre la app» y «dentro de la sesión»: ahora dicen lo que hay.

### Los 25 hallazgos de la revisión del 22 oct (D01)

La entrega del 22 oct dijo «17 corregidos y 8 no». Estaba mal contado. Son 25 identificadores: 20 tuvieron cambio (TC-10, solo en parte) y 5 no. Esta matriz sale de los resultados originales de las dos revisiones.

| ID | Hallazgo | Decisión | Qué se hizo o por qué no | Prueba |
|---|---|---|---|---|
| TB-1 | `quitarComentarios` no era idempotente: falso aviso AUD-01 | Corregir | El separador `\/**/` que ya está queda igual | `test:registro-preprocesador` (casos y 2000 al azar), `test:historia` |
| TB-2 | Si apagar fallaba por el disco, el equipo quedaba sin sesión | Corregir | El equipo vuelve a su sesión | `test:registro-app` 10, «TB-2» |
| TB-3 | «Cambiar a Nano» no rehacía el lienzo | Corregir | El lienzo se rehace | `test:registro-app` 10, «TB-3» |
| TB-4 | Cambiar la placa mientras se preparaba la simulación | Corregir | No se simula si cambió la placa o el lienzo | `test:registro-app` 10, «TB-4» |
| TB-5 | Exportar no intentaba escribir antes lo que esperaba | Corregir | Se vacía la cola antes de copiar | `test:registro`, «TB-5» |
| TB-6 | Un original bloqueado se le culpaba a la USB | Corregir | Desde AUD-21, con la copia en dos etapas | `test:registro`, «TB-6» y «AUD-21» |
| TB-7 | Un código confirmado durante otro cambio se perdía | Corregir | Fila de cambios de equipo (desde AUD-18, también con apagar) | `test:registro-app` 10, «TB-7», y 11 |
| TB-8 | Un proyecto que no abría dejaba dos `placa_cambiada` | Corregir | Se registra solo si abre | `test:registro-app` 10, «TB-8» |
| TB-9 | `programa_subido` tomaba la placa después de subir | Corregir | Desde AUD-17, del objeto de la subida | `test:registro-app` 10, «TB-9», y 11 |
| TB-10 | Una librería con «-» quedaba como error «compilar» | Corregir | Una sola expresión para el registro y el mensaje | `test:registro-app` 10, «TB-10» |
| TB-11 | Rendimiento: la configuración se lee dos veces por evento | No ahora | Riesgo de la tabla de la sección 70, con medición pendiente | — |
| TB-12 | Rendimiento: la exportación es síncrona y en memoria | No ahora | Riesgo de la tabla; desde AUD-21 lee el original y la copia, lo mismo en memoria que antes | — |
| TB-13 | Estructura: los controles `turno === turnoEquipo` repartidos | No ahora | Rediseño para después de la etapa 0 | — |
| TB-14 | Rendimiento: la historia leía dos veces cada archivo | No ahora | Resuelto de paso por AUD-22: cada archivo se lee una vez | `test:historia`, «F01» y «AUD-22» |
| TB-15 | Dos mensajes del instructor no decían qué hacer | Corregir | Mensajes con la acción | `test:registro-app` 10, «TB-2» (el mensaje del disco) |
| TC-1 | Al RESET, lo pendiente salía en el tramo nuevo | Corregir | Una foto con el turno anterior antes del RESET | `probar:fotos` 13 |
| TC-2 | Un cierre sin confirmar perdía fallas sin decirlo | Corregir | Campo `confirmado` (decisión de Efraín) | `probar:fotos` 10, `test:historia` |
| TC-3 | Un cierre sin confirmar usaba el tiempo de la vista | Corregir | `msAhora()` | `probar:fotos` 10 |
| TC-4 | La pausa y el RESET usaban el tiempo de la vista | Corregir | `msAhora()` | `probar:fotos` 11 |
| TC-5 | Sin Worker, destruir sin esperar dejaba el reloj corriendo | Corregir | Terminar entrega el «detener» en el acto | `probar:fotos`, «sin Worker» |
| TC-6 | Si la última foto fallaba, no llegaba «detenido» | Corregir | La confirmación sale igual, sin tiempo | `probar:fotos` 13 |
| TC-7 | `activas` copiaba cualquier valor | Corregir | Solo las claves conocidas, como sí o no | `probar:fotos` 12 |
| TC-8 | Estructura: el tiempo de cada hecho se infiere en la página | No ahora | Rediseño para después de la etapa 0 | — |
| TC-9 | `destruir()` no soltaba sus oyentes del lienzo | Corregir | Se sueltan | `probar:fotos`, «oyentes» |
| TC-10 | El tiempo va tres veces en `simulacion_detenida`, y la espera llamaba a `cierre.terminar()` | En parte | La espera llama a `este.terminar()`; el tiempo triple es del contrato y se queda | `probar:fotos` 10 (el cierre por la espera) |

La cifra «17/8» no cuadra con los identificadores y no se puede reconstruir cómo se agrupó: la cuenta correcta es la de esta matriz, 20 con cambio (TC-10 en parte) y 5 sin cambio. Ningún hallazgo quedó sin decisión.

### Lo que cambia en la tabla de riesgos de la sección 70

- **Lecturas repetidas de la historia (TB-14):** resuelto por AUD-22. La historia lee cada archivo una vez.
- **Exportación síncrona y en memoria (TB-12):** permanece. Desde AUD-21 lee el original y la copia completos, como antes leía la copia.
- **Errores del núcleo (W-R1):** contenido por AUD-26. No se identificó una entrada válida que lo provoque; la contención se probó con fallas inyectadas.
- **Avisos del disco:** el panel abierto ve lo que espera con un retraso de hasta 250 ms; las pérdidas y el fin de la falla se ven enseguida.
- Los demás riesgos (K01 a K15 de Codex) quedan como estaban; ninguno se da por cerrado porque las pruebas pasen.

**Pruebas:** en TecnoCircuito, `probar:fotos` suma las secciones 15 (AUD-26: avanzar falla una vez y siempre, RESET y recablear que fallan, el error del Worker, `messageerror`, un error viejo y la ruta sin Worker) y 16 (AUD-23); `probar_registro.py` mide la pausa con la primera foto al seguir. En TecnoBloques, `test:historia` (F01 y F02), `test:registro` (AUD-20 y AUD-21), `test:proyectos` (nueva: AUD-19, AUD-24 y AUD-25) y la sección 11 de `test:registro-app` (AUD-17 y AUD-18, más AUD-20 con el panel abierto). Las regresiones nuevas fallan con el código auditado; tres pruebas de exportación que inyectaban la falla en `copyFileSync` ahora la inyectan en la etapa que corresponde, con el mismo criterio.

## 72. La marca de TecnoCircuito dentro de TecnoBloques (MARCA-001, 25 oct 2026, Claude)

Efraín decidió que TecnoBloques sea el contenedor de la Suite y que TecnoCircuito conserve su identidad dentro de él. La idea de diseño: **TecnoBloques es la casa y TecnoCircuito firma donde trabaja**, en pocos lugares (reglas en `marca/MARCA.md`).

**Cómo viaja la marca.** `src/marca.js` importa cuatro SVG de `marca/svg/` como texto (`construir.js` les da el cargador `text`, igual que al CSS). Así quedan dentro de `dist/tecnocircuito.js`: funcionan sin red, y cada versión del paquete trae la suya. La API pública es `TecnoCircuito.MARCA` (contrato, sección 2): `nombre`, `frase`, `simbolo` (fondo azul, desde 32 px) y `cabeza` (el chip solo, de 16 a 24 px). El objeto está congelado. Un TecnoBloques que la lee con un paquete anterior no la encuentra y sigue igual.

**La firma** (`marca/svg/firma.svg`, 749 × 148) la arma `generar.py`: «Hecho con:», el logo horizontal con sus proporciones y la frase como tercera línea de la columna del nombre. Todo el texto es trazado (Atkinson Hyperlegible), así que se ve igual en Word, LibreOffice o Inkscape sin la fuente. Su `aria-label` dice lo mismo en texto, y el grupo de la imagen lo copia.

**`exportarSVG()`** pone la firma a escala 0,36 en una franja propia debajo del circuito: las letras chicas (24 en el dibujo) quedan de 8,6 px, como el texto de antes (9 px en Arial). El ancho mínimo de la imagen sale de la firma (294 px). Encima del circuito va el símbolo de una tinta azul (azul y blanco) al 10 %, centrado y del lado de la mitad del lado menor del circuito: el blanco se nota sobre la placa y el azul sobre el fondo. Los dos grupos van después del circuito, así el primer `<g>` sigue siendo el circuito. **La marca de agua va encima y no detrás** (decisión de Efraín, 25 oct): Codex la devolvió (M1) porque el ejemplo de aceptación decía «detrás», y detrás la placa y las piezas, que son opacas, la tapan casi entera. Efraín vio las dos y eligió encima, al 10 %. Los dos llevan clase (`tc-firma`, `tc-marca-agua`) para que se puedan encontrar.

**Pruebas:** `pruebas/probar_svg.py` revisa que la firma cabe, está abajo a la derecha y debajo del circuito, que sus letras chicas miden al menos 8 px, que la marca de agua es tenue, centrada y no toca la firma, que las capas van en orden (fondo, circuito, marca de agua, firma) y que la marca de agua pisa la placa, que la imagen se abre sola como archivo y que `TecnoCircuito.MARCA` trae sus cuatro campos y no se puede cambiar. Del lado de TecnoBloques, `test:simulador`.

## 73. El chip de TecnoCircuito en la serigrafía de las placas (MARCA-002, 25 oct 2026, Claude)

La firma de la imagen exportada se borra con un recorte, como pasa con la de Fritzing. Una marca dentro del dibujo de la placa, en cambio, viaja con ella. Efraín aprobó una maqueta de cada placa y estas reglas: el chip solo, en una tinta, al 80 % del alto de la marca vecina, uno por placa y en un espacio libre (`marca/MARCA.md`).

**Una sola fuente.** `marca/generar.py` escribe `marca/svg/chip-serigrafia.svg`: el chip de `chip(…, solo_cabeza=True)` en dos colores de referencia, `#FFFFFF` para la tinta y `#000000` para los ojos. Su viewBox es la caja exacta del dibujo (3,39 7,07 57,21 × 41,93), con la antena, así que basta escalarlo por el alto.

**Las placas de TecnoDiseñador** (Uno, shield L293D y expansión roja y azul) lo traen ya dibujado en su vista. `Lienzo.marca_tc()` lee el archivo desde la carpeta hermana, cambia los colores (serigrafía `#F6FCFC` y el color de la placa) y lo pone en la serigrafía. La escala va en dos factores de dos decimales cada uno, `scale(0.1) scale(1)` o `scale(0.1) scale(0.67)`, porque la salida `-tc` redondea los números a dos decimales y un factor solo perdería hasta un 5 %. `npm run vistas` las trajo como siempre: pines, marcos, LEDs, partes y medidas iguales, y el dibujo con un grupo más (`td-…-marca-tc`, unos 950 caracteres). El Uno queda en 49,7 KB, dentro del límite de 50 KB. El Nano no cambia.

**La protoboard** se dibuja aquí. `dibujarProtoboard(tipo, chip)` recibe el texto del chip desde el lienzo (`CHIP_SERIGRAFIA_SVG` de `src/marca.js`) y lo pone en el canal central, a la derecha, en azul `#00304D` y al 80 % del alto del canal. `protoboard.js` no importa el SVG porque también entra al Worker (por `motor/red.js` y `conexiones.js`) y a las pruebas de Node, que se arman sin cargador de SVG. Sin chip, dibuja la protoboard sin marca. El Worker sigue en 91 KB.

**Pruebas:**
- `probar_vistas.py`: cuántos chips trae cada placa y de qué alto (Uno 4,19 mm; shield y expansión 2,81 mm; Nano ninguno), que el chip no cruce ningún contacto, LED ni texto de su placa, y que siga en la imagen exportada, donde su id lleva delante el de la pieza (`tc-placa-td-uno-marca-tc`).
- `probar_protoboard.py`: un chip, dentro del canal, a la derecha, al 80 % y solo en azul y el color del canal.

Con la página anterior a este cambio fallan las 8 comprobaciones nuevas de las vistas y las 2 de la protoboard.

## 74. LED, resistencia, potenciómetro y pulsador como Piezas Tecno (PIEZA-001 y PIEZA-002, 27 oct 2026, Claude)

Eran las cuatro últimas piezas que se dibujaban con `@wokwi/elements`, y sus patas no caían en el paso exacto de 2,54 mm (el LED a 10 px, la resistencia a 58,8). Efraín fotografió las del kit, TecnoDiseñador las dibujó con las fichas de vista 6.6 a 6.9 de la especificación de entrega y Efraín aprobó los dibujos. Por pedido suyo, las dos fichas se integraron juntas, con una sola entrega, porque tocan los mismos archivos.

**De la foto al lienzo:**

```mermaid
flowchart LR
  TD["TecnoDiseñador<br/>led-tc · resistencia-025w/025w6/05w-tc<br/>potenciometro-tc · pulsador-tc<br/>(.svg + .json)"] -->|npm run vistas<br/>revisor en 0 fallas| V["src/piezas/vistas/*.js<br/>(versionados)"]
  V --> P["src/piezas/led.js · resistencia.js<br/>potenciometro.js · pulsador.js<br/>dibujar(props): colores, bandas,<br/>eje y rótulo ya pintados"]
  P --> C["catalogo.js · TIPOS<br/>aplicar · mostrar · presionar<br/>noCompletar · antiguo · ancla · soloPintado"]
  C --> L["lienzo.js<br/>abrir, ficha, arrastre,<br/>perilla y botón"]
  C --> N["motor/red.js<br/>límite de calor por vatios"]
```

Cada pieza pinta su dibujo **antes de crearlo** (`rellenar` en `vista_td.js` cambia el `fill` de la cápsula, de cada banda o del capuchón en el texto del SVG). Así la miniatura de «+ Agregar», el lienzo y la imagen exportada salen iguales. Un cambio posterior en la ficha pinta el SVG ya creado (`aplicar`).

**Props nuevas (contrato 1, sección 4, aditivas; decisiones de Efraín):**

| Pieza | Prop | Valores | Qué cambia |
|---|---|---|---|
| `resistencia` | `vatios` | `0.25` o `0.5` | El dibujo (¼ W beige de 6,3 mm con las patas a 4 pasos; ½ W azul de 8,7 mm a 6 pasos) y lo que aguanta antes de calentarse. |
| `potenciometro` | `modelo` | `16mm` | Marca el dibujo medido (patas a 2 pasos). |
| `pulsador` | `modelo` | `6x6` | Marca el dibujo medido (patas a 3 × 2 pasos). |

Una pieza nueva las trae. El LED no necesita prop: sus patas siguen a 1 paso.

**Un circuito guardado antes del 27 oct** abre con las mismas conexiones y mediciones:

| Pieza guardada | Al abrir | Al tocarla |
|---|---|---|
| LED | Dibujo medido, corrido unos píxeles (5,4; −1,2) para que cada pata quede sobre el hueco que dice su `en`. | — |
| Resistencia sin `vatios` | ¼ W con las patas abiertas a 6 pasos (variante `025w6`): los mismos huecos y el límite de 0,25 W. La ficha dice «¼ W, patas abiertas». | Elegir ¼ W o ½ W la cambia. |
| Potenciómetro o pulsador sin `modelo` | El dibujo de wokwi de antes, en el mismo lugar, con la ficha que avisa «Dibujo antiguo: muévelo un poco y toma el del kit.» y da las patas de ese dibujo (a 1 paso; a 7 de lado a lado). | Al levantarlo toma el `modelo` y el dibujo medido, con sus patas centradas donde estaban las de antes; al soltarlo encaja con las patas nuevas. No emite un evento propio (ver «Revisión», abajo). |

Para esto hicieron falta dos cosas en el lienzo:
- **`noCompletar`.** Al abrir, `normalizar` completa las props que faltan con las de una pieza nueva. Eso le ponía `vatios` y `modelo` a todo lo guardado, y borraba justo la marca de «guardada antes». Ahora cada tipo dice qué props no se completan.
- **El encaje al abrir también en la protoboard.** `alinearEnchufesAlAbrir` ya corría las piezas enchufadas en pines (sección 63). Ahora corre también la pieza encajada en la protoboard cuyas patas no caen justo en sus huecos, si todas piden el mismo corrimiento. En la protoboard la tolerancia es 0,01 px, porque cada pata debe quedar justo sobre su hueco, como cuando se suelta ahí. Con tolerancia de imán (3,5 px), el LED corrido 5,5 px no se habría movido. El potenciómetro y el pulsador con el dibujo de wokwi no se corren: ese dibujo no cae justo en la rejilla y se quedan donde estaban. Una vuelta sin nada que correr termina.

**LED.** La cápsula toma el color apagado de la foto y, con la corriente, `mostrarLeds` la lleva hacia el encendido con su halo (el mismo de los LED de las placas, sección 63). `data-brillo` en el SVG deja el brillo sin redondear: lo leen las pruebas y TecnoBloques, que antes leían `brightness` del elemento de wokwi. Quemado, se ve la parte `quemado` (la cápsula oscurecida y una grieta) y sigue el rótulo; ya no se pone gris.

**Resistencia.** Las bandas siguen el código de colores de los ohmios: dos cifras, el multiplicador (oro ×0,1, plata ×0,01) y la tolerancia en oro. Un valor con más de dos cifras significativas se redondea a dos. La potencia sale de una sola regla, `potenciaDe(props)` en `motor/red.js`: `0.25` o `0.5` (número o texto), y cualquier otra cosa cuenta como guardada sin `vatios`. La usan el dibujo, la ficha, el límite de calor (`vatiosDe`: sin `vatios`, 0,25 W) y KiCad, así nunca dicen cosas distintas. `mediciones()` da los `vatios` de cada una. Si una de ½ W alcanzaría, la falla lo sugiere: «… aguanta 0,25 W. Usa una de más ohmios o una de ½ W.» Al cambiar la potencia con la pieza encajada, la pata 1 se queda en su hueco (`ancla`) y la pieza vuelve a encajar con la pata 2 donde le toque; si ya no cabe, queda suelta y se avisa. Otro valor solo pinta otra vez las bandas: el dibujo se rehace solo si cambian su tamaño o sus pines. En KiCad, la huella va con el dibujo:

| Resistencia | Huella |
|---|---|
| ¼ W (patas a 4 pasos) | `R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal`, la de siempre |
| ½ W (6 pasos) | `R_Axial_DIN0309_L9.0mm_D3.2mm_P15.24mm_Horizontal` |
| guardada sin `vatios` (¼ W con las patas abiertas a 6 pasos) | `R_Axial_DIN0207_L6.3mm_D2.5mm_P15.24mm_Horizontal` (decisión de Efraín, 28 oct; antes, la de 10,16 mm) |

El potenciómetro del kit (16 mm, patas a 5 mm) lleva `Potentiometer_Alps_RK163_Single_Horizontal`, con los pads 1, 2 y 3 a 5 mm; uno guardado sin `modelo`, la `Alps_RK09K_Single_Vertical` de siempre (decisión de Efraín, 28 oct). El pulsador sigue con `SW_PUSH_6mm`, que ya era la del de 6 × 6 mm.

**Potenciómetro.** El eje gira de −135° (`posicion` 0, el cursor en GND) a +135° (`posicion` 1). Con el mouse, el lienzo suma lo que giró el puntero alrededor del eje por el camino corto (pasar por abajo no salta de un extremo al otro) y se detiene en los topes. El rótulo impreso sigue a los ohmios: «B1K», «B10K», «B100K».

**Pulsador.** Presionado, el capuchón se achica al 86 % alrededor de su centro y el SVG lleva `data-presionado`. Girado 90°, cruza el canal central de la protoboard, porque de la fila e a la f hay 3 pasos, como las patas del real.

**El encaje ya no depende del orden de las patas.** `encajar` (protoboard.js) tomaba como guía la primera pata de la lista y le permitía correrse hasta un paso entero hacia un hueco. El LED de wokwi listaba primero el ánodo; el medido lista primero el cátodo, y con eso un LED soltado con el cátodo junto a VIN y el ánodo sobre a1 caía entero en a1 y a2 (lo encontró `probar_enchufe.py`). Ahora la guía es la pata que cae más cerca de un hueco.

**El clic, solo donde hay dibujo.** El marco de rejilla de estas piezas es más grande que su cuerpo; el de la resistencia de ¼ W llega hasta las filas b y d. Como la placa (sección 62), solo reciben el clic donde están pintadas (`tc-solo-pintado`), y los huecos bajo el marco transparente se siguen alcanzando. No se aplica al dibujo de wokwi, que maneja sus propios eventos.

**Revisión (28 oct).** Antes de la entrega a Codex, un auditor estricto aparte y `/code-review` revisaron las dos fichas; Efraín aprobó corregir todo en un lote y aceptó las recomendaciones (D1 a D4). Lo más importante: **cambiar la potencia de una resistencia encajada dejaba guardados los huecos viejos** (A-01, lo vieron los dos). El lienzo avisaba el cambio (`cambio`) antes de que el dibujo nuevo llegara y la pieza volviera a encajar. Lo guardado y el simulador quedaban con la pata 2 en c19 mientras el lienzo la mostraba en c17, y al reabrir se conectaba en c19.

```mermaid
sequenceDiagram
  participant F as Ficha (vatios)
  participant L as lienzo.js
  participant V as crearVista (asíncrono)
  participant G as Guardado y simulador
  F->>L: alCambiarPropiedad
  L->>V: rehacerVista: quita el dibujo y pide el nuevo
  Note over L,G: Antes: cambio() aquí → se guardaba c13–c19
  V-->>L: dibujo nuevo listo
  L->>L: pata 1 en su hueco (ancla) · encajarPieza → c13–c17
  L->>G: Ahora: cambio() aquí → se guarda c13–c17
```

| Hallazgo | Qué pasaba | Corrección |
|---|---|---|
| A-01 (alto) | Lo de arriba. | `cambio()` al final de `rehacerVista`, cuando la pieza ya quedó en su lugar. |
| CR-8 | Cambiar solo los ohmios también rehacía el dibujo (y pasaba por el mismo camino). | Se rehace si cambia el marco (tamaño o pines), si la prop está en `rehacerCon` del catálogo o si la pieza no tiene `aplicar`; si no, `aplicar` pinta las bandas. |
| F01 (Codex, media) | La primera versión de CR-8 solo comparaba marcos. La resistencia guardada sin `vatios` (¼ W abierta) y la de ½ W tienen el mismo marco y las patas a 6 pasos: al elegir ½ W seguía el cuerpo beige en el lienzo y en la imagen exportada, hasta reabrir. | `rehacerCon: ['vatios']` en la resistencia: la potencia siempre rehace el dibujo; los ohmios no. |
| A-02 | La prueba «el marco del LED no tapa b29» pasaba sin `soloPintado`: b29 está fuera del marco. | La prueba mira a26 y a29, y comprueba que sin la clase el clic sería del LED. |
| CR-2 | Al levantar una pieza antigua, el dibujo nuevo saltaba unos 12 px: el centro de las patas se medía antes y después de que el arrastre corriera la pieza. | El centro se mide respecto de la pieza (`c.x`, `c.y`). |
| CR-3 | Con piezas de wokwi en la protoboard, `alinearEnchufesAlAbrir` daba hasta una vuelta por pieza sin mover nada. | Las de wokwi se saltan y una pieza sin corrimiento no cuenta como corrida. |
| CR-6 | `vatios: "0.25"` daba la de ¼ W en el dibujo y «a 6 pasos» en la ficha. | Una sola regla, `potenciaDe`. |
| A-03 | Documentos: el contrato no decía que la resistencia antigua se corre; las fichas de TecnoSuite decían «nada se mueve» y «al soltarla»; las medidas del 27 oct estaban solo en TecnoDiseñador. | Contrato 4 y fichas corregidos; `validacion/2026-10-27-piezas-kit-medidas.md`. |
| A-04 | El aviso «vuelve a ponerlo en la protoboard» salía también para una pieza cableada sin protoboard; con el dibujo antiguo, la ficha daba las medidas del nuevo. | «Dibujo antiguo: muévelo un poco y toma el del kit.»; la ficha da las patas del dibujo que se ve. |
| D1 y D2 (Efraín) | Huellas de KiCad que no correspondían al dibujo. | Las tablas de arriba. |
| D3 (Efraín) | `renovar` emitía `componente_cambiado {modelo}`, que la historia del registro podía contar como un cambio del aprendiz. | Ya no lo emite, como tampoco una pieza que se corre al abrir. El `modelo` llega a lo guardado al soltarla y al registro con el circuito de la siguiente `simulacion_iniciada`. |
| D4 (Efraín) | Una versión anterior que abre un circuito nuevo lo conecta bien, pero con los dibujos de wokwi sobre los huecos nuevos. | Documentado en el contrato, sección 4; no tiene arreglo en esas versiones. |

Se descartaron dos: la huella de ½ W sí se comprobaba en KiCad, y `encajar` recorre las patas dos veces, lo que no pesa con 2 a 4 patas.

**Pruebas:**
- `probar_piezas.py` (nueva, 43): biblioteca sin wokwi; props de una pieza nueva; paso exacto de las cuatro; bandas de 220 Ω y 10 kΩ; ½ W a 6 pasos con su ficha; colores del LED y del botón; rótulos «B1K» y «B100K»; el eje con el mouse hasta el tope; encaje al paso (resistencia de c5 a c9 y, al pasarla a ½ W, a c11 con la pata 1 fija; potenciómetro en j3/j5/j7; pulsador girado en e/f; LED en a27/a28 sin tapar b29); el botón que baja y prende el LED; el circuito antiguo con sus mismos huecos, props y cables, el LED corrido, la resistencia a 6 pasos, el botón de wokwi con su aviso y la misma corriente del LED que con las piezas del kit; el botón y el potenciómetro antiguos que se renuevan al moverlos; la imagen exportada.
- Adaptadas al dibujo nuevo: `probar_electrico`, `probar_extras`, `probar_protoboard`, `probar_simulacion`, `probar_t1t2`, `probar_pwm` (leían el `wokwi-led`), `probar_svg` (el eje medido y la perilla antigua), `probar_prototipo` (la resistencia trae `vatios`) y `probar_nano_ui` (el potenciómetro más grande quedaba bajo la ficha).
- `probar_motor.js` (+5): el límite por `vatios` y la sugerencia de ½ W. `probar_kicad.js` (+1): la huella de ½ W, que `probar_kicad_pcb.py` encuentra en KiCad 10. `probar_contrato.js` (212): las props nuevas en el esquema y los ejemplos.
- `probar_enchufe.py` encontró el defecto de `encajar` con el LED medido y pasa con la corrección.
- Suite completa con cargador: 1372 OK y ninguna falla (antes 1298). TecnoBloques: `test:simulador` 58 y `test:registro-app` 134 sin fallas; `npm test` y `test:app` sin errores.
- **Antes y después:** 22 circuitos de referencia (los ejemplos de la página y de TecnoBloques de HEAD, `t1_protoboard` y su fixture) abren en el lienzo con las mismas conexiones, props y giros que con HEAD; solo se corren el LED y las resistencias encajados. En el núcleo, 126 corridas (cada circuito con 3 a 6 programas, 60 cuadros, los botones presionados del 20 al 35) dan fotos idénticas cuadro a cuadro, salvo el campo nuevo `vatios`. La comparación sí detecta un cambio: con 330 Ω en vez de 220, las seis corridas difieren desde el primer cuadro.
- Paquete: 527 KB → 556 KB (los seis dibujos); el Worker sigue en 91 KB.
- **Revisión (28 oct):** `probar_piezas.py` pasa de 43 a 52, con una regresión por hallazgo: lo guardado igual que el lienzo tras cambiar la potencia (nueva y antigua), el dibujo que no se rehace con otro valor, a26/a29 con y sin la clase, la pieza antigua que no salta al levantarla (antes, 11,7 px) ni emite `{modelo}`, el botón antiguo que se queda en su lugar, las fichas del dibujo antiguo y `vatios: "0.25"`. Contra el código de `2808fd8` fallan 9 de ellas; pasan en los dos la de a26/a29 (refuerza la prueba, no corrige código) y la del botón quieto (CR-3 eran vueltas sin efecto visible). `probar_motor.js` (+2: `potenciaDe` y el límite con `"0.5"` y con 2) y `probar_kicad.js` (+2: las tres huellas de la resistencia, `"0.5"` y las dos del potenciómetro); `probar_kicad_pcb.py` encuentra en KiCad 10.0.3 la RK163 y la DIN0207 de 15,24 mm con sus pads.
- **F01 (Codex, 28 oct):** `probar_piezas.py` 54, con la resistencia sin `vatios` suelta que pasa a ½ W: la variante `05w` en el lienzo y en `exportarSVG()`, guardada, con las patas quietas y otra vez al reabrir. Falló con la primera corrección (reproducción) y pasa con `rehacerCon`.
- Suite completa tras la revisión (28 oct), con batería y otra vez con cargador: 1391 OK y ninguna falla las dos veces. TecnoBloques con este paquete: `test:simulador` 58 y `test:registro-app` 134, sin fallas.

**Límites:**
- La geometría no se ha probado en la protoboard real con aprendices (fase 7 de PIEZA-001, LAB-001 punto 4).
- El potenciómetro de frente tapa con su cuerpo los huecos de arriba de sus patas, como el real visto de frente.
- `@wokwi/elements` y Lit siguen en el paquete por el potenciómetro y el pulsador antiguos. Cuando no queden circuitos guardados con ellos, se pueden quitar. *(Quitados el 28 oct: sección 75.)*
- Los `-tc.svg` de TecnoDiseñador traen unos 2,6 KB de degradados que no usan (la plantilla de sus `defs`). Pesan en el paquete y en cada pieza del lienzo; se pueden quitar en el generador de TecnoDiseñador.
- Un potenciómetro con el dibujo de wokwi que ya está elegido mueve su perilla al volver a presionarlo: el primer clic enfoca un control invisible del dibujo de wokwi y el siguiente lo mueve hasta donde cayó el puntero. Viene de antes de esta entrega y hoy solo les pasa a los guardados sin `modelo`, que toman el dibujo nuevo al primer arrastre. *(Desaparece con el dibujo de wokwi: sección 75.)*

## 75. Sin @wokwi/elements: todas las piezas son Piezas Tecno (PIEZA-003, 28 oct 2026, Claude)

Después de PIEZA-001 y PIEZA-002, `@wokwi/elements` (MIT) solo dibujaba el potenciómetro y el botón **guardados antes del 27 oct** sin `modelo`, y arrastraba a Lit (BSD-3-Clause), la librería con que están hechos esos dibujos. Efraín preguntó si ya se podía quitar todo el código de Wokwi y pidió hacerlo antes de la `v0.4.0`. Hoy no hay proyectos de aprendices guardados y los ejemplos de TecnoBloques ya traían las piezas del kit.

**Lo que queda de Wokwi: `avr8js`.** También es de Wokwi (MIT), pero es otra cosa: el emulador del ATmega328P, que ejecuta el `.hex` instrucción por instrucción con los temporizadores, el PWM, el serial, el ADC y las interrupciones (39 KB del Worker). Se queda. Reemplazarlo sería escribir un emulador propio y repetir la validación de T1 a T3 con la placa real. Lo que las reglas del proyecto excluyen es el código GPL, y avr8js no lo es.

**Qué pasa con un circuito guardado sin `modelo`** (decisión de Efraín, 28 oct):

```mermaid
flowchart TD
  A["Potenciómetro o botón guardado sin modelo"] --> B["normalizar: completa el modelo y anota dónde estaba<br/>el centro de sus patas (dibujoAnterior del catálogo)"]
  B --> C["crearVista: el dibujo del kit"]
  C --> D["colocarRenovadas: lo corre solo (sin lo enchufado en él)<br/>para que el centro de sus patas nuevas quede donde estaba"]
  D --> E{"¿Tenía «en»?<br/>(protoboard o enchufado)"}
  E -->|no: cableado| F["Igual que antes: los cables<br/>siguen a sus pines"]
  E -->|sí| G{"¿Sus patas caben en esos huecos<br/>con el mismo corrimiento (imán)?"}
  G -->|sí| H["alinearEnchufesAlAbrir<br/>lo deja justo encima"]
  G -->|no| I["Queda suelto (sin «en») y se avisa:<br/>«El botón btn1 quedó suelto: ahora tiene el dibujo<br/>del kit y sus patas ya no caben donde estaban.<br/>Ponlo otra vez donde va.»"]
  D --> J{"¿Hay piezas enchufadas en él<br/>que ya no caben en sus patas nuevas?"}
  J -->|sí| K["Quedan sueltas y se avisa:<br/>«Se soltó el LED led1 del potenciómetro pot1:<br/>vuelve a ponerlo.»"]
  I --> L["apartar: toda pieza suelta se corre, con lo que cuelga de ella,<br/>sin patas sobre un hueco ni un pin; lo que colgaba y estaba<br/>enchufado fuera se suelta de ahí con aviso"]
  K --> L
```

- **`dibujoAnterior`** en el catálogo: el tamaño del dibujo de antes y dónde tenía cada pata. Son medidas tomadas el 28 oct, con la librería todavía puesta, no código: el potenciómetro de 20 × 20 mm con GND, SIG y VCC en (29; 68,5), (39; 68,5) y (49; 68,5) px; el botón de 17,802 × 12 mm con `1i` (0; 13), `2i` (0; 32), `1d` (67; 13) y `2d` (67; 32). El centro se calcula con el mismo giro que usa el lienzo para los pines (`rotarPunto`, que ahora comparte `girarPunto`).
- **En la protoboard quedan sueltos si alguna pata enchufada ya no cabe**, que es lo normal: el potenciómetro de antes tenía las patas a 1 paso y el del kit a 2; el botón, a 7 pasos de lado a lado, y el del kit a 3. Pierden esas conexiones de la protoboard; los cables que llegaban a los huecos se quedan. Un potenciómetro con solo `SIG` en la protoboard sí cabe y sigue encajado (sus otras patas no conducían antes ni ahora).
- **Se corre solo.** Lo enchufado en él se queda sobre sus patas de antes; si ya no cabe en las nuevas, queda suelto con el aviso «Se soltó el LED led1 del potenciómetro pot1: vuelve a ponerlo.». Nunca queda unido a la distancia (A1 de la preauditoría).
- **Suelto, se ve suelto.** Toda pieza que queda suelta al abrir se aparta medio paso (`apartar`, en la primera de ocho direcciones en que ninguna de sus patas queda a 3,5 px o menos de un hueco o un pin). Sin eso podía caer con las patas justo sobre otros huecos y parecer encajada sin conducir; y al reabrir ya no hay aviso (A2, decisión de Efraín: medio paso).
- **Si ningún medio paso sirve** (una pieza guardada fuera de la rejilla: a 2,4 px en cada eje, todos dejan las patas a 3,4 px de un hueco), se corre como mucho medio paso por eje, en octavos de paso, a donde sus patas quedan más lejos de todo hueco o pin: en la rejilla, justo entre cuatro huecos, a 6,8 px. Si ni así quedan libres, va al sitio libre más cercano del primer anillo cuadrado (de un octavo de paso) que tenga alguno, hasta diez pasos: a lo sumo √2 más lejos que el más cercano de verdad. Solo si no hay ninguno (no pasa con un circuito real; recorrerlos todos tarda hasta 1,5 s por pieza) se queda en el más libre de medio paso (F02 de Codex, 29 oct; decisión de Efraín: al centro, como mucho medio paso).
- **Se corre con lo que cuelga de ella, y nada queda unido a la distancia.** Una resistencia que se soltó del potenciómetro se aparta con el LED enchufado en ella. Si ese LED tenía además el ánodo en c16, se suelta de c16 con el aviso «Se soltó el LED led1 de la protoboard: vuelve a ponerlo.». Antes quedaba unido a c16 a 4,8 px y encendía con 13,9 mA. Se suelta el enlace de fuera, y no el de la resistencia, para que ninguna pata quede sobre el hueco que dejó sin conducir (F03 de Codex, 29 oct).
- **El aviso nombra cada pieza con su artículo** («la resistencia r1», «el LED led1») **y todo aquello de lo que se soltó** («Se soltó el botón btn2 de la protoboard y de la placa»). Los artículos femeninos salen de una lista en `lienzo.js` (`FEMENINOS`): un tipo nuevo femenino debe entrar en ella. Un tipo que este lienzo no conoce, de una versión futura, es «la pieza fut1»: antes el aviso fallaba y no se mostraba (F01 de Codex, 29 oct).
- **Un `modelo` nulo o vacío** en el archivo se completa con el del kit; si no, la pieza se renovaba y se corría en cada apertura (A3).
- **Abrir no emite eventos:** no es un cambio del aprendiz, como tampoco el LED que se corre. El `modelo` llega a lo guardado con el siguiente cambio y al registro con el circuito de la siguiente `simulacion_iniciada`.
- **KiCad:** el potenciómetro lleva siempre la Alps RK163, porque se dibuja siempre como el del kit (la huella va con el dibujo).

**Lo que se quitó:** las dos importaciones de `lienzo.js` y su rama del dibujo de wokwi en `crearVista` (`tamanoNatural`, `pinInfo`, `nombrePin`); la renovación al levantar la pieza (`renovar`) y el aviso «Dibujo antiguo» de la ficha; en la imagen exportada, la copia de los estilos del shadow DOM (`estilosDe`), los comentarios de Lit y la perilla por variable CSS; `esPerilla` y la rama del gesto de la perilla de wokwi; `antiguo`, `esAntiguo` y `definicionDe` del catálogo, y `modelo` de `noCompletar`; las filas del dibujo antiguo en la ficha de la biblioteca; la RK09K en KiCad; `@wokwi/elements` de `package.json` (con él, Lit). El pulsador conserva sus dos cuidados al presionarlo: `preventDefault` (sin eventos de mouse de compatibilidad ni selección) y no capturar el puntero (si el mouse se sale con el clic apretado, el botón se suelta). Con eso también desaparece el defecto de la perilla de wokwi ya elegida (sección 74, «Límites»).

**Paquete:** 557 KB → 525 KB; el Worker sigue en 91 KB. Ya no contiene la palabra «wokwi».

**Pruebas:**
- `probar_piezas.py`: el circuito de antes abre con el LED y las resistencias en sus huecos y el botón suelto con el dibujo del kit, el centro de sus patas en (525,5; 103,3) más medio paso, ninguna pata sobre un hueco, y el aviso; puesto otra vez en e/f, el LED mide lo mismo que con las piezas del kit. El potenciómetro cableado abre con el dibujo del kit, su perilla y su cable, sin aviso, con el centro de sus patas en (289; 283,5).
- `probar_svg.py`: el potenciómetro guardado sin `modelo` sale en la imagen con el eje del kit girado, y la imagen no trae `wokwi` ni `<style>`.
- `probar_contrato.js`: las patas de `dibujoAnterior` son las del esquema. `probar_kicad.js`: el potenciómetro sin `modelo` lleva la RK163.
- Regresiones de la preauditoría (fallan con `106627a`): el LED enchufado en un potenciómetro antiguo se suelta con aviso y sin patas sobre pines (A1); el potenciómetro antiguo en c10–c12 queda suelto, sin patas sobre huecos, y reabrir no lo corre (A2); con `modelo` `null` o `""` se completa y reabrir no lo corre (A3).

**Preauditoría (28 oct, antes de Codex):** un auditor aparte, con el árbol de `106627a`, encontró A1 (alta: lo enchufado en la pieza renovada se corría con ella y quedaba unido a la distancia; lo introducía PIEZA-003), A2 (media: la pieza suelta podía parecer encajada), A3, A4 (esta sección decía «siempre quedan sueltos») y A5 (textos que presentaban a Wokwi Elements y Lit como presentes). Corregidos en un lote. **Queda pendiente A6:** el «Acerca de» de TecnoBloques (`src/app.js`, sin commit) ya no nombra Wokwi Elements ni Lit, pero TecnoBloques depende todavía de `#v0.3.1`, que sí los trae; ese texto entra junto con el paso de TecnoBloques a la `v0.4.0`, y con él el NOTICE de TecnoBloques nombrará `avr8js` (que nunca nombró). Conforme según el auditor: sin restos de wokwi ni Lit en el paquete, SVG y netlist idénticos a HEAD en los 10 ejemplos del kit, pulsador igual, suite 1386/0.

**Límites:** un circuito guardado sin `modelo` con el potenciómetro o el botón en la protoboard pierde esas conexiones y hay que volver a ponerlos; hoy no hay proyectos así. Una versión anterior de TecnoCircuito sigue abriendo los circuitos nuevos como dice la sección 74.
