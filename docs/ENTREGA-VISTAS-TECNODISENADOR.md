# Entrega de vistas: de TecnoDiseñador a TecnoCircuito

12 de octubre de 2026 · Especificación de entrega, versión 1. Fuente única: este archivo. TecnoDiseñador la enlaza desde su `CLAUDE.md`.

**Estado (14 oct):** integradas en TecnoCircuito las entregas del Uno, el Nano, la expansión roja y azul (`npm run vistas`, COMO-FUNCIONA, sección 62) y la shield L293D, con sus headers analógicos (sección 64). **27 oct:** fichas del LED (6.6) y de la resistencia (6.7), para PIEZA-001; el revisor ya las comprueba.

**Para quién:** el agente que dibuja en `..\TecnoDiseñador` y Efraín. Dice exactamente qué archivos entregar, con qué reglas y con qué datos, para que el dibujo reemplace la vista de una pieza de TecnoCircuito **sin tocar nada a mano** al migrarlo.

**En cinco líneas:**
1. TecnoDiseñador entrega **solo apariencia**: un SVG por variante y un JSON con la posición de cada contacto. Nada funcional.
2. Todo en **milímetros**, con el origen arriba a la izquierda del marco y la vista desde arriba, como se ve la pieza real.
3. Cada contacto lleva `data-contacto` con el **nombre del contrato** de la sección 6. Cada LED lleva `data-led` y cada parte que cambia lleva `data-parte`.
4. Sin CSS, sin imágenes, sin metadatos, `id` con prefijo propio y **máximo 50 KB** por SVG.
5. Antes de entregar se pasa `revisar_vista_td.py` (sección 8). Si la placa real no coincide con lo esperado, se **informa**, no se inventa.

---

## 1. Quién hace qué

| TecnoDiseñador (cosmético) | TecnoCircuito (funcional) |
|---|---|
| Medir la pieza real desde fotos propias y dibujarla fiel, con su estilo. | Nombres de pines y contrato (`CONTRATO.md`, `contrato/circuito.schema.json`). |
| Ubicar en el dibujo cada contacto, LED y parte que cambia, con los nombres que da este documento. | Qué se puede conectar, el modelo eléctrico y el lógico, la simulación, las fallas y los avisos. |
| Registrar de dónde salió cada dato y que no usa material «compartir igual». | Encender LED, girar brazos y ruedas, mostrar u ocultar partes durante la simulación. |
| Informar diferencias entre la pieza real y lo esperado. | Decidir si una diferencia cambia el contrato; validar con la placa real y el multímetro. |
| | Envolver el SVG en `src/piezas/`, escalarlo, ordenar las capas, ficha, pruebas y KiCad. |

TecnoDiseñador **no** escribe código para TecnoCircuito, **no** edita sus archivos, **no** decide nombres de pines y **no** afirma conexiones eléctricas (qué pin llega a cuál, polaridades, reguladores). Si la serigrafía dice algo, se dibuja tal cual, con sus erratas. Lo eléctrico lo confirma TecnoCircuito con continuidad en el laboratorio.

## 2. Qué se entrega

En `componentes/<modelo>/entrega/tecnocircuito/`, generado por el mismo script que el resto del componente:

```
<pieza>[-<variante>]-tc.svg      un SVG por variante (sección 3)
<pieza>[-<variante>]-tc.json     datos de ese SVG (sección 5)
```

- `<pieza>` es el nombre de la sección 6: `nano`, `shield_nano_io`, `shield_l293d`… `<variante>` solo cuando la pieza tiene variantes: `roja`, `azul`.
- Es una salida **adicional** a los entregables habituales de TecnoDiseñador (SVG maestro, `-app`, PNG). No los reemplaza.
- Junto con la entrega, el `registro-verificacion.md` del componente debe estar cerrado, con «Publicable: sí» y la licencia confirmada (receta de TecnoCircuito, sección «Cuando el dibujo sale de TecnoDiseñador»).

## 3. Reglas del SVG `-tc`

**Unidades y marco**
- Raíz: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ANCHO ALTO" width="ANCHOmm" height="ALTOmm">`, con ANCHO y ALTO en **mm** y el **origen (0, 0) arriba a la izquierda** del marco. La `y` crece hacia abajo.
- El marco lo fija la sección 6 para cada pieza. El dibujo puede no llenarlo: lo que queda fuera de la placa es **transparente**, sin rectángulo de fondo.
- TecnoCircuito reemplaza `width` y `height` por píxeles (1 mm = 9,6 / 2,54 = 3,7795 px). No hay que reescalar nada a mano.
- Números con **máximo 2 decimales** (0,01 mm).

**Qué se dibuja:** la pieza **vista desde arriba**, tal como es (el LED es la excepción: va de frente, sección 6.6). Las piezas montadas se dibujan completas aunque otra las tape en la realidad (por ejemplo, la expansión con sus zócalos bajo el Nano). **El orden de las capas lo pone TecnoCircuito**: no se recortan ventanas ni agujeros para ver otra pieza.

**Permitido:** `g`, `path`, `rect`, `circle`, `ellipse`, `line`, `polyline`, `polygon`, `text`, `tspan`, `defs`, `linearGradient`, `radialGradient`, `stop`, `clipPath` y `use` que apunte a un `id` del mismo archivo. Atributos de presentación (`fill`, `stroke`, `opacity`, `font-size`, `transform`…) y los `data-*` de la sección 4.

**Prohibido:**
- `<image>`, `data:` incrustado, `<style>`, `class`, `style="…"`, `<script>`, `on*` y `<foreignObject>`.
- `<filter>` y `<mask>`: son caros de dibujar con muchas piezas en pantalla. El volumen se hace con degradados y tonos.
- `<metadata>`, `<title>` y `<desc>`: TecnoCircuito pone los suyos.
- Animaciones (`animate`, `animateTransform`, `set`) y enlaces externos (`href` a `http…`).

**`id`:** todos empiezan con el prefijo **exacto** de la pieza, son únicos y cada `url(#…)` apunta a uno que existe. Prefijos: `td-nano-`, `td-exp-roja-`, `td-exp-azul-`, `td-uno-`, `td-l293d-`, `td-led-`, `td-resistencia-025w-`, `td-resistencia-05w-`, `td-resistencia-2w-`; para otra pieza, `td-` + su tipo con guiones (`td-bateria-lipo-`). Motivo: en el lienzo, el Nano y la expansión viven en el mismo documento. Si los dos tienen un `gPcb`, la expansión roja se puede pintar con el azul del Nano.

**Texto:** `<text>` con `font-family="Arial, Helvetica, sans-serif"`, **no** letras convertidas en trazados (pesan el doble). Un rótulo menor de 1 mm de alto no se lee en pantalla: se puede omitir o simplificar.

**Tamaño:** **máximo 50 KB por SVG**; se recomienda no pasar de unos 600 elementos. **El LED y la resistencia, máximo 15 KB** y unos 150 elementos: un circuito tiene muchos a la vez. Como referencia, los dibujos actuales pesan: Nano 14 KB, expansión 35 KB, shield 15 KB. El paquete completo de TecnoCircuito pesa 285 KB y viaja dentro de TecnoBloques. Si hace falta recortar, se sacrifica el detalle que a la escala del lienzo no se ve (pistas finas, componentes de 0402, sombras sobre sombras), nunca los contactos ni la serigrafía de los pines.

## 4. Atributos que necesita TecnoCircuito

| Atributo | En qué elemento | Para qué | Regla |
|---|---|---|---|
| `data-contacto="<nombre>"` | Un `circle` o `rect` por contacto: el agujero o borne donde se conecta un cable | Comprobar que el punto de conexión cae sobre el dibujo | Su centro (`cx, cy` o `x + width/2, y + height/2`) es **exactamente** la coordenada del JSON. Sin `transform` en él ni en sus grupos padre. Un elemento por nombre; los nombres, de la sección 6. |
| `data-led="<nombre>"` | Una sola forma (`circle`, `rect`, `ellipse` o `path`) con `fill` | Encender y apagar el LED cambiando su `fill` | En el archivo va el color **apagado**. Brillos y reflejos van encima, en elementos aparte, y deben verse bien sobre los dos colores. Va en **todo** LED de la placa real, aunque hoy no se use; su nombre es el de la serigrafía. |
| `data-parte="<nombre>"` | Un `g` con todo lo de esa parte | Mostrar u ocultar (puente PWR) o girar (brazo, rueda) | El `g` **no lleva `transform` propio**, porque TecnoCircuito lo escribe; si hace falta uno, va en un hijo. Las partes que giran declaran su pivote en el JSON. |

| `data-banda="<n>"` | Solo en la resistencia: una sola forma (`rect` o `path`) con `fill` por banda de color, `1` la más cercana a la pata `1` | Pintar el código de colores según los ohmios | Bandas `1` a `4` (o `1` a `5`, según el JSON). En el archivo, cualquier color: TecnoCircuito los reemplaza. Brillos encima, en elementos aparte. |

El lienzo dibuja sus propios puntos de clic encima. El SVG **no** es interactivo y no marca nada como «clicable».

## 5. El JSON `-tc`

Ejemplo (Nano, valores ilustrativos):

```json
{
  "formato": 1,
  "pieza": "nano",
  "variante": null,
  "archivo": "nano-tc.svg",
  "unidad": "mm",
  "marco": { "ancho": 58.0, "alto": 54.0 },
  "prefijo": "td-nano-",
  "pines": {
    "D1": { "x": 46.78, "y": 19.38 },
    "D0": { "x": 44.24, "y": 19.38 }
  },
  "leds": {
    "PWR": { "apagado": "#19472b", "encendido": "#45e76e" },
    "L":   { "apagado": "#65501d", "encendido": "#ffcf40" },
    "RX":  { "apagado": "#644022", "encendido": "#ff9e39" },
    "TX":  { "apagado": "#644022", "encendido": "#ff9e39" }
  },
  "partes": {},
  "medidas": {
    "contorno": { "ancho": 43.2, "alto": 18.0, "incertidumbre": 0.2 },
    "notas": "Clon CH340 del ambiente; regla en las dos direcciones."
  },
  "diferencias": [],
  "origen": {
    "registro": "componentes/nano-clon-ch340/registro-verificacion.md",
    "generador": "generar_nano_clon.py",
    "fecha": "2026-10-20",
    "fotos": ["fuentes/IMG_2001.jpg", "fuentes/IMG_2002.jpg"]
  },
  "licencia": { "publicable": true, "sin_compartir_igual": true }
}
```

| Campo | Qué es |
|---|---|
| `formato` | `1`, la versión de esta especificación. |
| `pieza`, `variante` | Los de la sección 6; `variante` es `null` si la pieza no tiene. |
| `archivo` | El SVG que describe, en la misma carpeta. |
| `marco` | Igual al `viewBox` del SVG, en mm. |
| `prefijo` | El de los `id` del SVG: el exacto de la sección 3. |
| `pines` | **Todos** los nombres de la sección 6 → `{x, y}` en mm, en el sistema del SVG, con 2 decimales. Ni uno más ni uno menos. |
| `leds` | Cada `data-led` del SVG con su color apagado y encendido (`#rrggbb`). El encendido lo propone TecnoDiseñador a partir de la foto o del color típico del LED. |
| `partes` | Cada `data-parte`: `{ "descripcion": "…" }` y, si gira, `"pivote": {x, y}` y `"angulo_dibujado"` en grados. |
| `colores` | Solo en el LED: los cinco colores del contrato (`rojo`, `verde`, `amarillo`, `azul`, `blanco`), cada uno con `apagado` y `encendido`. `leds.LED` repite el rojo, que es el color del archivo. |
| `bandas` | Solo en la resistencia: `4` o `5`, cuántos `data-banda` tiene el dibujo. |
| `medidas` | Lo medido: contorno, agujeros, separación de los headers, con su incertidumbre. **Es informativo.** TecnoCircuito lo usa para revisar su geometría, y lo valida aparte antes de usarlo en KiCad o en cualquier dato funcional. |
| `diferencias` | Lista de textos con lo que no coincide con la sección 6: contactos que faltan o sobran, serigrafía distinta, otra disposición. Vacía si todo coincide. |
| `origen` | Registro de verificación, generador, fecha y fotos usadas (rutas dentro del componente). |
| `licencia` | Las dos en `true`; si no, no se acepta. |

## 6. Ficha de cada pieza

### 6.0 Regla para todas las placas del simulador

**Ampliada por Efraín (14 oct): el paso estándar manda sobre la medida de la foto**, porque los pines reales tienen juego. Vale también para las filas de un mismo bloque de headers (como +5 / Gnd / A0-5 de la shield, a 2,54 mm entre filas), y la medida va en `medidas` y `diferencias`.

**Decisión de Efraín (12 oct):** toda placa del simulador (Uno, Nano y, cuando llegue, la 2560) es una **Pieza Tecno** con sus headers en **paso exacto de 2,54 mm**: pines vecinos de un mismo header a 2,54 mm (±0,05) y a la misma altura. La separación entre headers distintos es la que se mide en la placa real (en el Uno, por ejemplo, los headers digitales no están a un múltiplo de 2,54 mm entre sí): se mide y se informa en `medidas`, no se fuerza. El revisor de la sección 8 comprueba la regla en el Nano y en el Uno.

**Por qué:** las shields y expansiones se apilan sobre la placa, los cables caen en sus pines y la protoboard usa la misma rejilla de 2,54 mm. Si el dibujo de la placa no respeta el paso, ninguna pieza medida de verdad le encaja. Es lo que pasa hoy con el Uno de `@wokwi/elements`: pasado por el revisor, tiene cuatro saltos fuera de paso (SCL→SDA, D9→D8 y 3V3→5V de 2,65 mm, y SDA→AREF de 2,38) y el resto en 2,51 mm. Son los valores sin redondear: con las coordenadas redondeadas a 0,01 mm, el revisor da 2,64 y 2,39. Por eso existe el Uno Tecno de la sección 6.5.

### 6.1 Nano clásico (`pieza: "nano"`, sirve también para `nano_old`)

- **Pieza:** el Nano clon del ambiente (CH340, cargador nuevo según la bitácora de TecnoBloques del 7 oct). Si en el kit hay Nano de dos aspectos, se dibuja el que usan los aprendices y se anota en `diferencias`.
- **Orientación:** vista desde arriba (lado de los componentes), con el **USB a la izquierda**.
- **Marco:** el marco común de la familia Nano (sección 6.2). El Nano se dibuja en la posición exacta que ocupa montado sobre las expansiones. Sin expansión, el lienzo usa el mismo marco y lo demás queda transparente.
- **Pines:** 30. Filas a 15,24 mm entre sí y 2,54 mm entre pines vecinos (el revisor lo comprueba con ±0,05 mm). Numeración física estándar: el pin 1 es D1/TX, en la fila de arriba, en el extremo opuesto al USB.

| Fila de arriba, de izquierda (USB) a derecha | Pin físico | Nombre |
|---|---|---|
| D12 | 15 | `D12` |
| D11 … D2 | 14 … 5 | `D11` … `D2` |
| GND | 4 | `GND2` |
| RST | 3 | `RESET2` |
| RX0 | 2 | `D0` |
| TX1 | 1 | `D1` |

| Fila de abajo, de izquierda (USB) a derecha | Pin físico | Nombre |
|---|---|---|
| D13 | 16 | `D13` |
| 3V3 | 17 | `3V3` |
| REF | 18 | `AREF` |
| A0 … A7 | 19 … 26 | `A0` … `A7` |
| 5V | 27 | `5V` |
| RST | 28 | `RESET` |
| GND | 29 | `GND1` |
| VIN | 30 | `VIN` |

`GND1`/`GND2` y `RESET`/`RESET2` son pines distintos con la misma señal: se ubican **como dice esta tabla** (la que usa hoy el lienzo). `SDA`, `SCL`, `MISO`, `MOSI`, `SCK` y `SS` son otros nombres de A4, A5, D12, D11, D13 y D10: **no** llevan contacto propio. No hay `GND3`, `IOREF`, `D20` ni `D21`.

- **LED:** `PWR`, `L`, `RX` y `TX`, con `data-led`. Si la serigrafía del clon los rotula distinto (por ejemplo `POW`, `13`), se usan estos nombres y la diferencia se anota.
- **Partes:** ninguna. El botón RESET y el mini-USB son solo dibujo.

### 6.2 Expansión E/S del Nano (`pieza: "shield_nano_io"`, `variante: "roja"` o `"azul"`)

- **Marco común de la familia Nano:** se superponen la roja y la azul con el Nano en la misma posición (alineando sus zócalos), y el marco es el rectángulo más pequeño que contiene a las dos, redondeado hacia arriba a 0,1 mm. **El SVG del Nano y los dos de la expansión tienen el mismo `viewBox`.** Hoy el marco es 58 × 54 mm, la medida anunciada de la roja; la medición de TecnoDiseñador lo reemplaza.
- **Orientación:** la misma del Nano (USB a la izquierda).
- **Capas:** la expansión se dibuja completa, con sus zócalos hembra; el Nano va encima, como en la realidad. **Sin ventana transparente.** Ese cambio de capas lo hace TecnoCircuito al migrar (sección 9).
- **Contactos: 82.** Son los mismos nombres en las dos variantes, aunque cambien de lugar:

| Grupo | Nombres | Cuántos |
|---|---|---|
| Canales digitales | `D0_S`, `D0_V`, `D0_G` … `D13_S`, `D13_V`, `D13_G` (S = señal, V = 5V, G = tierra) | 42 |
| Canales analógicos | `A0_S`, `A0_V`, `A0_G` … `A7_S`, `A7_V`, `A7_G` | 24 |
| I2C | `I2C_SDA`, `I2C_SCL`, `I2C_V`, `I2C_G` | 4 |
| UART | `UART_TX`, `UART_RX`, `UART_V`, `UART_G` | 4 |
| Bloque de alimentación de seis contactos | `OUT_3V3`, `OUT_3V3_2`, `OUT_3V3_3`, `GND_OUT`, `GND_OUT_2`, `GND_OUT_3` | 6 |
| Jack | `JACK_POS` (centro), `JACK_GND` (exterior) | 2 |

- **Cómo asignar nombres:** por la serigrafía de cada canal («D7» + fila S/V/G → `D7_S`…), y en I2C y UART por sus rótulos (SDA, SCL, TX, RX, V o 5V, G o GND). En el bloque de seis (tres 3V3 y tres GND en la placa medida; contrato del 14 oct), cada fila lleva de izquierda a derecha el nombre simple, `_2` y `_3`. En el jack, el punto de `JACK_POS` y `JACK_GND` va donde se vean sus patas desde arriba o, si no se ven, sobre el cuerpo del jack, del lado del centro y del exterior. La polaridad real la confirma TecnoCircuito: no se afirma.
- **No se dibujan:** los nombres `SPI_*`, `OUT_5V` y `OUT_5V_2` (son alias heredados sobre pines del Nano, sin contacto propio) ni ningún texto de estado: el «ALIM.: USB/JACK» que dibuja hoy TecnoCircuito es suyo y, si se mantiene, lo agrega TecnoCircuito.
- **LED:** si la placa real tiene un LED de encendido, va con `data-led="PWR"`.
- **Variantes:** un SVG y un JSON por color, cada uno con sus coordenadas.

### 6.3 Shield L293D Rev4 (`pieza: "shield_l293d"`)

> **Entregada y aprobada (14 oct):** `..\TecnoDiseñador\componentes\l293d-shield\entrega\tecnocircuito\` (`shield_l293d-tc.svg/.json`). **Decisión de Efraín: la vista medida tiene prioridad sobre el dibujo anterior de `shield_l293d.js`.** Todas las diferencias (servos invertidos, bornera M1/M2 7,4 mm más abajo, LED1, headers R2 y headers +5/Gnd/A0-5 que deben poder cablearse) están en `HALLAZGOS-PARA-TECNOCIRCUITO.md`, en esa misma carpeta. Lo que sigue es la ficha original.

- **Pieza:** la shield del kit, la misma que TecnoCircuito ya modela. Fotos propias pendientes (registro de TecnoDiseñador, 12 oct). Las dos SVG de una foto de tienda que hay en `fuentes/` no sirven.
- **Marco: fijo**, el del dibujo del Uno que usa el lienzo (`@wokwi/elements`): `viewBox="0 0 72.58 53.34"`. El `x = 0` incluye 4 mm a la izquierda para el USB del Uno, así que la placa empieza cerca de `x = 4`.
- **Headers apilables:** sus agujeros van **en estas coordenadas** (mm), que son las del dibujo del Uno y **no** son un paso exacto de 2,54 mm. Se usan tal cual para que la shield quede sobre los pines del Uno; si la medida real difiere más de 0,3 mm, se anota en `diferencias`. Estos agujeros **no** llevan `data-contacto`: los cables siguen llegando a los pines del Uno.

| Fila | y (mm) | x (mm), de izquierda a derecha |
|---|---|---|
| Arriba, 10 pines | 2,38 | SCL 23,02 · SDA 25,66 · AREF 28,05 · GND 30,56 · D13 33,07 · D12 35,59 · D11 38,10 · D10 40,61 · D9 43,13 · D8 45,77 |
| Arriba, 8 pines | 2,38 | D7 50,01 · D6 52,52 · D5 55,03 · D4 57,55 · D3 60,06 · D2 62,57 · D1 65,09 · D0 67,60 |
| Abajo, 8 pines | 50,67 | (sin conexión) 32,15 · IOREF 34,66 · RESET 37,17 · 3V3 39,69 · 5V 42,33 · GND 44,85 · GND 47,36 · VIN 49,87 |
| Abajo, 6 pines | 50,67 | A0 55,03 · A1 57,55 · A2 60,06 · A3 62,57 · A4 65,09 · A5 67,60 |

- **Dos usos, dos salidas (provisional):** en la colección de la App, TecnoDiseñador encaja la shield sobre su 2560 medido; en TecnoCircuito va sobre el Uno de wokwi. Un mismo generador puede dar las dos. La versión de la App usa las posiciones reales de los headers; la salida `-tc` los pone en las coordenadas de la tabla anterior. El resto del dibujo es idéntico.
- **Cuando exista el Uno Tecno (sección 6.5)**, la tabla de arriba deja de valer: el marco y los headers apilables salen del `uno-tc.json`, en paso exacto. Entonces hay **una sola salida**, la misma de la App, y se regenera la shield. **Orden recomendado: primero el Uno, después la shield**, para medir la shield una sola vez.
- **Contactos: 36** (18 hasta el 14 oct).
  - Bornera izquierda, de arriba abajo: `M1A`, `M1B`, `GND_IZQ`, `M2A`, `M2B`.
  - Bornera derecha, de arriba abajo: `M4A`, `M4B`, `GND_DER`, `M3A`, `M3B`.
  - EXT_PWR: `EXT_POS` y `EXT_GND`.
  - Servos: `S1_SIG`, `S1_POS`, `S1_GND` (SERVO_1) y `S2_SIG`, `S2_POS`, `S2_GND` (SERVO_2).
  - Headers analógicos (contrato del 14 oct): `A0_S` … `A5_S` (fila «A0-5»), `A0_V` … `A5_V` («+5») y `A0_G` … `A5_G` («Gnd»), con A0 a la izquierda.

  En las borneras, el punto es el tornillo. Si la serigrafía real ordena distinto, se nombra por la serigrafía y se anota.
- **LED:** el de encendido, `data-led="PWR"`.
- **Partes:** `data-parte="puente-pwr"` con el capuchón del puente PWR, dibujado **puesto**. TecnoCircuito lo oculta cuando el puente se quita en la ficha. Los dos pines del puente quedan fuera de la parte.

### 6.4 Otras piezas (servo, motor TT, LiPo, probador)

Las mismas reglas valen para cualquier otra Pieza Tecno. Los nombres de contacto están en `contrato/circuito.schema.json` (`pines-<tipo>`). Cada una tiene partes que cambian, y **antes de empezar** hay que pedirle a TecnoCircuito su ficha de vista. Como orientación:

| Pieza | Contactos | Partes que cambian hoy |
|---|---|---|
| `servo` (SG90 y MG90S) | `GND`, `VCC`, `SIG` (puntas de los cables) | `brazo`, que gira, con pivote en el eje |
| `motor_tt` | `A`, `B` | `rueda` y `eje`, que giran; tiene dos vistas con marcos distintos |
| `bateria_lipo` | `POS`, `NEG`, `BAL0`, `BAL1`, `BAL2` | indicador de carga |
| `probador_lipo` | `NEG`, `C1` … `C8` | pantalla de 7 segmentos (`data-seg`) y aviso de pitido |

El Uno tiene su propia ficha en la sección 6.5; el LED y la resistencia, en las secciones 6.6 y 6.7.

### 6.5 Uno R3 (`pieza: "uno"`): encargo planeado

Hoy el Uno lo dibuja `@wokwi/elements` y no cumple la regla 6.0. **Decisión de Efraín (12 oct): el Uno pasa a ser Pieza Tecno**, medido desde la placa del kit con el proceso de TecnoDiseñador, para que todas las placas del simulador tengan paso exacto. Por compatibilidad, los nombres son **los mismos que hoy**, así que ningún circuito guardado cambia.

- **Pieza:** el Uno R3 del kit, el que se usa en el aula (el que TecnoBloques probó el 7 oct, detectado como «Arduino UNO»). Solo fotos propias; el diseño y las fotos oficiales de Arduino son «compartir igual» y no se usan. Logos y marcas se quitan; qué nombre queda impreso («UNO», «R3»…) se le pregunta a Efraín, como se hizo con «MEGA» → «2560».
- **Decisión de licencia, pendiente de Efraín antes de empezar:** ese Uno es un **Arduino original** (VID 2341, según la bitácora de TecnoBloques), no un clon como la 2560. Dibujarlo fielmente, aunque sea desde fotos propias, puede ser una obra derivada de su diseño de referencia CC BY-SA. Opciones:
  1. Dibujar un **Uno clon** del ambiente, si lo hay, como se hizo con la 2560.
  2. Dibujar el original **sin pistas ni detalles del trazado**: solo contorno, conectores, componentes principales y serigrafía de los pines.
  3. Consultar antes de publicar.

  Recomendación: la opción 1 si hay un clon; si no, la 2.
- **Orientación:** vista desde arriba, **USB y jack a la izquierda**, headers digitales arriba y headers de alimentación y analógicos abajo (como el lienzo actual).
- **Marco: fijo, 72,58 × 53,34 mm, igual que hoy.** La esquina superior izquierda de la placa va en **(4,00; 0,00)**, como en el dibujo actual, para que el Uno no se mueva respecto de las piezas, la protoboard y los dobleces de los cables guardados. Si el USB o el jack sobresalen más de 4 mm, se dibujan recortados en el borde del marco y se anota en `diferencias`. **La shield L293D usa este mismo marco**, igual que el Nano y la expansión comparten el suyo.
- **Contactos: 31**, de izquierda a derecha. Los nombres vienen del contrato y coinciden con la traducción actual del lienzo:

| Header | Pines, de izquierda a derecha | Nombres |
|---|---|---|
| Digital arriba, 10 pines | SCL, SDA, AREF, GND, 13, 12, 11, 10, 9, 8 | `SCL`, `SDA`, `AREF`, `GND1`, `D13`, `D12`, `D11`, `D10`, `D9`, `D8` |
| Digital arriba, 8 pines | 7, 6, 5, 4, 3, 2, TX→1, RX←0 | `D7`, `D6`, `D5`, `D4`, `D3`, `D2`, `D1`, `D0` |
| Alimentación abajo, 8 pines | (sin rótulo), IOREF, RESET, 3.3V, 5V, GND, GND, VIN | — (sin contacto), `IOREF`, `RESET`, `3V3`, `5V`, `GND2`, `GND3`, `VIN` |
| Analógico abajo, 6 pines | A0 … A5 | `A0` … `A5` |

  `GND1` es el del header digital; `GND2` y `GND3`, los de alimentación, de izquierda a derecha. `SDA` y `SCL` tienen agujero propio, aunque sean la misma señal que A4 y A5. El pin sin rótulo del header de alimentación y el ICSP (6 pines) se dibujan, pero **sin** `data-contacto`.
- **Paso:** 2,54 mm exactos dentro de cada header (el revisor lo comprueba). Las separaciones entre headers (de D8 a D7, de VIN a A0, de una fila a la otra) se miden y van en `medidas`.
- **LED:** `PWR` (rotulado «ON» en la placa), `L`, `TX` y `RX`, con `data-led`. Se usan estos nombres, como en el Nano.
- **Partes:** ninguna. El botón RESET, el USB, el jack y el ICSP son solo dibujo.
- **Qué hace TecnoCircuito con esta entrega** (sección 9): reemplaza `wokwi-arduino-uno` por la Pieza Tecno `src/piezas/uno.js`, enciende los LED desde la simulación, regenera los headers apilables de la shield L293D desde este JSON y actualiza las pruebas que dependen de las coordenadas del Uno. `@wokwi/elements` se sigue usando para el LED, la resistencia, el botón y el potenciómetro.

### 6.6 LED de 5 mm (`pieza: "led"`): encargo de PIEZA-001

Reemplaza a `wokwi-led` (decisión de Efraín, 26 oct). Los nombres de contacto no cambian, así que ningún circuito guardado cambia de conexión.

- **Pieza:** el LED difuso de 5 mm del kit, desde fotos propias (ficha PIEZA-001 en TecnoSuite).
- **Orientación: de frente**, parado sobre la protoboard, como el dibujo de hoy. Es la única pieza que no va vista desde arriba: desde arriba, un LED es un círculo y no se ven sus patas.
- **Marco: fijo, 7,62 × 12,70 mm** (3 × 5 pasos de 2,54 mm).
- **Contactos: 2, en posiciones fijas** (el revisor las comprueba):

| Nombre | x (mm) | y (mm) | Qué es |
|---|---|---|---|
| `catodo` | 2,54 | 11,43 | Pata corta, a la izquierda, del lado plano de la cápsula |
| `anodo` | 5,08 | 11,43 | Pata larga, a la derecha |

  El punto es la punta de cada pata, donde entra en el hueco. El ánodo lleva un **codo** visible, para que se note que es la pata larga aunque las dos lleguen a la misma altura. El lado plano del borde de la cápsula queda del lado del cátodo.
- **LED:** `data-led="LED"` en la cápsula, en una sola forma. El archivo va pintado con el **rojo apagado**; los reflejos y el borde van encima, en elementos aparte, y deben verse bien con los cinco colores, apagados y encendidos.
- **Colores:** el JSON trae `colores` con los cinco del contrato (`rojo`, `verde`, `amarillo`, `azul`, `blanco`), cada uno con `apagado` (la cápsula difusa sin corriente, tomada de la foto) y `encendido`. TecnoCircuito cambia el `fill` de la cápsula; el brillo intermedio y el halo los pone él, sin filtros.
- **Partes:** `data-parte="quemado"`, con lo que se ve cuando el LED se quema (la cápsula oscurecida por dentro y una marca en el chip). Se dibuja **visible**; TecnoCircuito la oculta mientras el LED está sano.
- **Tamaño:** máximo 15 KB.

### 6.7 Resistencia (`pieza: "resistencia"`, `variante: "025w"`, `"05w"` o `"2w"`): encargo de PIEZA-001

Reemplaza a `wokwi-resistor` (decisión de Efraín, 26 oct). Tres potencias, una entrega por cada una: la prop `vatios` de la ficha elige cuál se dibuja. Los nombres de contacto no cambian.

- **Pieza:** las resistencias de ¼ W, ½ W y 2 W del kit, desde fotos propias.
- **Orientación:** acostada, vista desde arriba, con la pata `1` a la izquierda.
- **Marco y contactos: fijos.** ¼ W y ½ W comparten el marco y las patas a **4 pasos**; 2 W tiene las patas a **6 pasos**, como el dibujo de hoy, para que los circuitos guardados no se muevan.

| Variante | Marco (mm) | `1` (x; y) | `2` (x; y) | Cuerpo, de largo máximo |
|---|---|---|---|---|
| `025w` (¼ W) | 12,70 × 5,08 | 1,27; 2,54 | 11,43; 2,54 | 7,62 mm |
| `05w` (½ W) | 12,70 × 5,08 | 1,27; 2,54 | 11,43; 2,54 | 7,62 mm |
| `2w` (2 W) | 17,78 × 7,62 | 1,27; 3,81 | 16,51; 3,81 | 12,70 mm |

  El punto es donde la pata doblada entra en el hueco. Entre el cuerpo y cada contacto se ve un tramo de pata. Si el cuerpo real no cabe en su largo máximo (algunas de ½ W miden unos 9 mm), **el estándar manda**: se dibuja recortado al máximo, como pide la regla 6.0, y la medida real va en `medidas` y en `diferencias`. TecnoCircuito decide con Efraín si cambia el paso de esa variante.
- **Bandas:** `data-banda="1"` … `"4"`, o hasta `"5"` si el kit trae resistencias de 5 bandas (lo dice la foto), y `bandas` en el JSON con ese número. La banda `1` es la más cercana a la pata `1`; la de tolerancia, la más cercana a la `2`, con el espacio mayor antes de ella. TecnoCircuito las pinta según los ohmios.
- **Cuerpo:** del color de la foto de cada potencia. Es solo dibujo y no se cambia en la simulación.
- **LED y partes:** ninguno. TecnoCircuito muestra el aviso de calor con su propia capa.
- **Tamaño:** máximo 15 KB por variante.

## 7. Si la pieza real no coincide

Puede pasar que falte o sobre un contacto, que la serigrafía diga otra cosa o que la roja y la azul no tengan los mismos grupos. Entonces:

1. Se dibuja la pieza **real**.
2. En el JSON se ponen **solo** los nombres de la sección 6 que existen en la pieza. Cada diferencia va en `diferencias`, en una frase («la azul no tiene `A7_V`: el canal A7 solo tiene S y G»).
3. **Nunca** se inventa un nombre nuevo ni se reutiliza uno para otra cosa. TecnoCircuito decide con Efraín si cambia el contrato.

El revisor de la sección 8 marca como falla un nombre que falte **si no aparece escrito en `diferencias`**. Si está nombrado ahí, lo muestra como aviso, y TecnoCircuito lo revisa y decide; la entrega no se rechaza por eso. El paso de 2,54 mm se sigue revisando con los pines que sí están.

## 8. Cómo se comprueba antes de entregar

El revisor está en TecnoCircuito. Solo usa la librería estándar de Python y no cambia ningún archivo:

```
python -I ../TecnoCircuito/prototipo/pruebas/revisar_vista_td.py componentes/<modelo>/entrega/tecnocircuito/<pieza>-tc.json [otro-tc.json …]
```

Revisa: que el SVG cumpla la sección 3; el paso exacto de 2,54 mm en las placas (Nano y Uno, sección 6.0); los `id` y sus referencias; que los nombres de `data-contacto` sean exactamente los de la sección 6 y que cada centro coincida con el JSON (±0,01 mm); los LED y las partes que pide cada pieza; los colores; en el LED y la resistencia, su marco y sus contactos fijos, los cinco colores y las bandas; el tamaño; los campos del JSON y la licencia. Con varias piezas de una familia (Nano + expansiones; Uno + shield), comprueba además que compartan el marco y que ningún `id` se repita entre ellas. También rechaza unidades dentro del dibujo (`cx="11.22mm"`), atributos de otros programas (`inkscape:…`) y contactos dentro de `<defs>`. Sale con 0 si todo está bien. Cada falla dice qué arreglar.

Además, TecnoCircuito revisa a ojo la vista en el lienzo, sobre la pieza real y con los cables puestos.

## 9. Qué hace TecnoCircuito al migrar (para que TecnoDiseñador sepa qué no tiene que hacer)

1. Copia el SVG a `src/piezas/` dentro del módulo de la pieza, con su encabezado SPDX y el enlace al registro de origen.
2. Escala ×3,7795 (mm → px) poniendo `width` y `height`; genera `PINES_NANO`, `pinesExpansion()`, `PINES_SHIELD`… desde el JSON.
3. Ordena las capas: el Nano por encima de la expansión. Hoy el lienzo dibuja las piezas montadas encima de la placa y por eso la expansión tiene ventana; ese cambio es de TecnoCircuito.
4. Conecta `data-led` y `data-parte` con la simulación. La shield pasa de `data-led-pwr`/`data-puente` a `data-led="PWR"`/`data-parte="puente-pwr"`.
5. Alinea con la tabla de la sección 6.1 la numeración de `GND1`/`GND2` y `RESET`/`RESET2` en la netlist de KiCad, que hoy los asigna al revés (pads 4/3). Es la misma señal eléctrica, así que el cambio es solo de nombres.
6. Pruebas: contactos alineados con los puntos de cableado, LED, sin imágenes ni metadatos, tamaño. Recorrido en Chromium y en TecnoBloques.
7. Los circuitos guardados se conservan, porque los cables se refieren a los contactos por nombre. Si la geometría cambia mucho, los dobleces de los cables pueden quedar corridos.
8. En la ficha, el dibujo pasa de «Dibujo basado en referencias» a «Dibujo medido por TecnoDiseñador (registro …)». La validación eléctrica sigue pendiente hasta el laboratorio.
9. Con el Uno (6.5): `PLACAS.uno` deja la etiqueta `wokwi-arduino-uno` y usa la Pieza Tecno con su `mostrar` para los LED. Las coordenadas `FILAS_UNO` de la shield salen del JSON del Uno. Como el marco y la esquina de la placa no cambian, los pines solo se corren lo que se equivocaba el dibujo de wokwi (menos de 0,3 mm).
10. Con el LED y la resistencia (6.6 y 6.7): `src/piezas/led.js` y `src/piezas/resistencia.js` reemplazan a `wokwi-led` y `wokwi-resistor`. TecnoCircuito pinta la cápsula con el color de la ficha, el brillo y el halo con la simulación, muestra `quemado` y pinta las bandas con el código de colores de los ohmios. La prop `vatios` elige la variante y el límite de calor; una resistencia guardada sin `vatios` se dibuja con la variante `2w` (patas a 6 pasos) y conserva el límite de hoy, 0,25 W. Al abrir un circuito, una pieza encajada en la protoboard se recoloca sobre sus huecos, porque el dibujo nuevo pone las patas unos pocos píxeles más allá que el de wokwi: la conexión la manda `en` y no cambia.
