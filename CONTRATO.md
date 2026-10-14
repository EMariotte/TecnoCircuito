# Contrato entre TecnoCircuito y TecnoBloques

> **Contrato 1 · borrador** · 7 de octubre de 2026
> Este archivo es la **fuente única** de cómo se hablan los dos proyectos. TecnoBloques lo resume en la sección «Proyecto hermano» de su `CLAUDE.md`.
> Mientras esté en borrador se puede cambiar sin subir el número. Pasa a firme con la primera etiqueta `v1.0.0`.

---

## 1. Distribución

- TecnoCircuito entrega **`dist/tecnocircuito.js`**: un IIFE sin dependencias externas que define **`window.TecnoCircuito`**. Lleva dentro avr8js y los dibujos.
- El archivo se **commitea ya construido en cada etiqueta**. Instalarlo desde GitHub no compila nada. Lo arma `npm run preparar-version` (en la raíz): toma la versión del `package.json` (sin «-dev»), revisa el contrato y que el paquete lleve solo `dist/tecnocircuito.js`, `CONTRATO.md`, `contrato/`, `LICENSE`, `NOTICE` y `README.md` (campo `files`).
- `TecnoCircuito.VERSION` sale del `package.json` de la raíz: exacta en una etiqueta y con «-dev» en cualquier otra copia.
- TecnoBloques lo declara con una etiqueta fija:

  ```json
  "dependencies": { "tecnocircuito": "github:EMariotte/TecnoCircuito#v1.0.0" }
  ```

- `build.js` de TecnoBloques lo embebe en `dist/TecnoBloques.html` con un `<script>` más, después de Blockly y antes del código de la app.

## 2. API

```js
TecnoCircuito.VERSION    // '1.0.0'  versión del paquete (semver)
TecnoCircuito.CONTRATO   // 1        sube solo cuando se rompe la compatibilidad
TecnoCircuito.PLACAS     // ['uno', 'nano', 'nano_old']  placas que sabe dibujar y simular hoy; comprobar por clave
TecnoCircuito.filasDeMediciones(m)  // la tabla en español a partir de sim.mediciones():
                         //   [{ pieza: 'Pin 9', voltaje: '0,37 V', corriente: '0,00 mA', detalle: 'señal de servo: …' }, …]

// Lienzo: protoboard y cables. Funciona sin .hex (sirve también en la versión web).
const lienzo = TecnoCircuito.crearLienzo(elemento, {
  placa: 'uno',
  circuito,                 // objeto de la sección 4, o null para empezar vacío
  soloLectura: false,
  tema: 'claro',            // 'claro' | 'oscuro'
  alEvento: (evento) => {}  // eventos del cableado (sección 6), aunque nunca se simule
});
lienzo.circuito();          // devuelve el circuito actual (para guardarlo en el proyecto)
lienzo.alCambiar(fn);       // fn(circuito) cada vez que el aprendiz cambia algo
// Para cambiar la placa: guardar circuito(), destruir el lienzo y crear otro con la placa elegida.
// Si el circuito trae lo que la placa no tiene (una pieza montada de otra placa, un cable a GND3 en el Nano),
// el lienzo lo quita al abrir y lo avisa en su barra; circuito() devuelve el adaptado. Para no perderlo, quien
// llama conserva el original hasta que el aprendiz edite (así lo hace TecnoBloques). COMO-FUNCIONA, sección 60.
lienzo.ponerTema('oscuro');
lienzo.exportarSVG();       // el circuito como texto SVG, tal como se ve (documentación, evidencias en TecnoRuta),
                            // con la marca «Hecho con TecnoCircuito · SENA – TecnoAcademia Tolima» abajo a la derecha
lienzo.exportarNetlist({ nombre });  // el circuito como netlist de KiCad (.net, «export» versión E): piezas con su huella
                            // y redes. El Uno va como los 4 conectores (J1–J4) de la plantilla «Arduino Uno Shield»
                            // de KiCad; en su editor de placas, Archivo → Importar → Netlist
                            // Nano: módulo de 30 pads; expansión: referencia de regulación, jack e I2C/SPI (sección 4.2)
lienzo.destruir();

// Simulador: necesita el .hex. Usa el mismo lienzo para mostrar lo que pasa.
const sim = TecnoCircuito.crearSimulador({
  lienzo,                   // el lienzo donde se ve la simulación
  placa: 'uno',
  hex,                      // texto Intel HEX
  modo: 'realista',         // 'realista' | 'ideal'
  noIdealidades: {},        // ajustes por no idealidad: { caidaL293D: false, … }
  alEvento: (evento) => {}  // eventos de la simulación (sección 6)
});
sim.iniciar(); sim.pausar(); sim.reiniciar(); sim.detener();
sim.serialEnviar('A\n');
sim.alSerial((texto) => {});   // texto ya decodificado como UTF-8 («Recibí» llega con su tilde)
sim.alFalla((falla) => {}); // { tipo, componente, mensaje }  mensaje en español, corto
sim.alEstado((estado) => {}); // 'corriendo' | 'pausado' | 'detenido' | 'reiniciado'
sim.medidas();   // { msSimulados, msReales, velocidad, estado, hilo }  para la línea de estado
                 //   velocidad: 0 a 1 (1 = al ritmo del chip real) · hilo: 'worker' | 'pagina'
sim.mediciones(); // lo que mediría un multímetro en cada pieza (null si no se simula): voltajes, leds, resistencias,
                 //   pines, potenciometros, servos, pwm, consumo5V, usb, entradas, fallas, modo, activas;
                 //   con la shield: shield, motores, baterias y porVin.
                 //   Las señales que cambian se promedian como el ojo y el multímetro (~100 ms).
sim.destruir();  // detiene, libera el Worker y suelta el lienzo; después el objeto ya no sirve
```

- `sim.mediciones()` y `TecnoCircuito.filasDeMediciones()` entraron el 10 oct 2026, para que TecnoBloques muestre la misma tabla que la página de prueba. La estructura de `mediciones()` puede ganar campos (piezas nuevas), pero no cambiar los que hay. El nombre del prototipo, `_mediciones`, sigue funcionando.
- `sim.medidas()` y `sim.destruir()` entraron al contrato el 7 oct 2026, tras la primera conexión. Los nombres del prototipo (`_medidas`, `_destruir`) siguen funcionando mientras TecnoBloques se actualiza, pero no son parte del contrato.

- **Ninguna función lanza errores hacia el editor por fallas del circuito o del programa.** Esas fallas salen por `alFalla`. Solo se lanza un error por un uso equivocado de la API, como una placa que no existe.

## 3. Placas

- Las claves son las de `PLACAS` en `src/nucleo.js` de TecnoBloques: `uno`, `nano`, `nano_old` y `mega`.
- `nano` y `nano_old` se simulan igual. Solo cambia el cargador en la placa real.
- Desde el 11 oct 2026, se dibujan y simulan `uno`, `nano` y `nano_old`. `mega` conserva su clave en el formato de proyecto, pero aún no se dibuja ni simula. Consulta `TecnoCircuito.PLACAS`; no presupongas su orden.
- Nano clásico: un ATmega328P a 16 MHz, ocho entradas ADC; A6/A7 son exclusivamente analógicas. El conector I2C y los pines SPI son conexiones eléctricas y etiquetas de red; no se añaden dispositivos ni emulación completa de esos protocolos.
- Si TecnoBloques usa una placa que no está en `TecnoCircuito.PLACAS`, desactiva «Simular» y lo explica.
- **Para agregar una placa (por ejemplo el Uno R4):** primero el perfil en TecnoBloques, después la placa aquí, y se sube la versión menor.

## 4. Formato del circuito

Va en el campo `circuito` del proyecto `.tbq.json`. **TecnoBloques lo guarda y lo devuelve tal cual, sin interpretarlo.**

```json
{
  "formato": 1,
  "placa": "uno",
  "componentes": [
    { "id": "r1", "tipo": "resistencia", "x": 300, "y": -26, "rot": 0, "props": { "ohmios": 220 } },
    { "id": "led1", "tipo": "led", "x": 380, "y": -100, "rot": 0, "props": { "color": "rojo" } }
  ],
  "cables": [
    { "de": "placa.D13", "a": "r1.1", "color": "naranja", "puntos": [[125, -20.35]] },
    { "de": "r1.2", "a": "led1.anodo", "color": "naranja", "puntos": [[405, -20.35]] },
    { "de": "led1.catodo", "a": "placa.GND1", "color": "negro", "puntos": [[395, -40], [115.5, -40]] }
  ],
  "protoboard": null
}
```

- **Coordenadas:** en píxeles del dibujo a escala 1, donde 0,1 pulgadas (la distancia entre pines) son 9,6 px. La `y` crece hacia abajo.
- **La placa está fija en el origen:** su esquina superior izquierda es (0, 0) y no se mueve. Para acomodar el circuito se mueve la vista, no la placa. Por eso el formato no guarda la posición de la placa.
- **Componentes:** `x` y `y` son la esquina superior izquierda del dibujo sin girar. `rot` vale 0, 90, 180 o 270 y gira el dibujo alrededor de su centro, en el sentido del reloj.
- Los extremos de un cable son `"<id>.<pin>"`. La placa siempre se llama `placa`.
- **Cada pin físico tiene nombre propio,** porque un cable llega a un agujero concreto. En el Uno: `D0`–`D13`, `A0`–`A5`, `GND1`, `GND2`, `GND3`, `5V`, `3V3`, `VIN`, `AREF`, `IOREF`, `RESET`, `SDA` y `SCL`. Los tres GND son el mismo nodo eléctrico, igual que `SDA` con `A4` y `SCL` con `A5`, pero son pines distintos.
- **Nano:** 30 pines físicos: `D0`–`D13`, `A0`–`A7`, `GND1`, `GND2`, `RESET`, `RESET2`, `5V`, `3V3`, `VIN`, `AREF`. Los aliases `SDA`, `SCL`, `MISO`, `MOSI`, `SCK`, `SS` llegan respectivamente a A4, A5, D12, D11, D13, D10, sin agujeros adicionales. No hay `GND3`, `IOREF`, `D20` ni `D21`.
- **`puntos`** (opcional) son los dobleces del cable, en orden desde `de` hasta `a`: una lista de pares `[x, y]` en las mismas coordenadas. Sin `puntos`, el cable va recto.
- **El esquema manda:** [`contrato/circuito.schema.json`](contrato/circuito.schema.json) (JSON Schema 2020-12) define los nombres de pines de cada pieza, los colores y los huecos de la protoboard. Lo que un esquema no puede revisar (que cada cable llegue a una pieza que existe y a un pin que esa pieza tiene) lo revisa `prototipo/pruebas/contrato.js`. Es tolerante con lo nuevo: un tipo de pieza o un campo que no conoce no lo invalida. Resumen de las piezas:

  | `tipo` | Pines | `props` |
  |---|---|---|
  | `resistencia` | `1`, `2` | `ohmios` |
  | `led` | `anodo`, `catodo` | `color`: rojo, verde, amarillo, azul o blanco |
  | `potenciometro` | `GND`, `SIG`, `VCC` | `ohmios`, `posicion` (0 hacia GND, 1 hacia VCC) |
  | `pulsador` | `1i`, `1d`, `2i`, `2d` | `color` |
  | `servo` | `GND` (marrón), `VCC` (rojo), `SIG` (naranja, la señal) | `modelo`: `sg90` o `mg90s` (cambia el dibujo, el consumo y la velocidad) |
  | `shield_l293d` | `M1A`, `M1B`, `M2A`, `M2B`, `M3A`, `M3B`, `M4A`, `M4B`, `GND_IZQ`, `GND_DER`, `EXT_POS`, `EXT_GND`, `S1_SIG`, `S1_POS`, `S1_GND`, `S2_SIG`, `S2_POS`, `S2_GND` | `puentePWR`: `true` (la batería también alimenta el VIN) o `false`. Va montada sobre el Uno: `x` e `y` son 0, sin `en`, y hay una sola |
  | `shield_nano_io` | Para D0–D13 y A0–A7: `<pin>_S`, `<pin>_V`, `<pin>_G`; conectores adicionales y alimentación en 4.2 | `variante`: `roja` o `azul`; `alimentacion`: `usb`, `jack`, `apagada`; `voltajeJack`: 0, 5, 7, 9 o 12. Solo Nano/Nano antiguo; máximo una, `x=y=rot=0`, sin `en` |
  | `motor_tt` | `A` (rojo), `B` (negro) | `vista`: `eje` o `rueda`; `lado`: `izquierdo` o `derecho` (refleja el dibujo y el sentido de avance) |
  | `bateria_lipo` | `POS` (rojo, +), `NEG` (negro, −); balance: `BAL0` (el −), `BAL1` (entre las celdas), `BAL2` (el +) | `carga`: `llena` (4,2 + 4,2 V), `nominal` (3,7 + 3,7), `descargada` (3,2 + 3,2) o `desbalanceada` (3,95 + 3,45) |
  | `probador_lipo` | `NEG` (el − del balance), `C1` a `C8` (el + de cada celda) | `umbral`: pita si una celda baja de este voltaje (2,7 a 3,8 V; 0 = apagada; de fábrica 3,3) |

  En la shield, `S1_SIG` es el pin 10 y `S2_SIG` el 9, sus `*_POS` son el 5V y sus GND (con `EXT_GND`) son el GND del Uno.

  En el pulsador, las patas con el mismo número están unidas por dentro, y al presionarlo se une la 1 con la 2. Si está presionado o no, no se guarda: solo existe mientras se simula.
- **Colores de cable:** `negro`, `marron`, `rojo`, `naranja`, `amarillo`, `verde`, `azul`, `morado` (se muestra como violeta), `gris` y `blanco`, en el orden del código de colores (0 a 9).
- **Agregar un tipo de componente nuevo no rompe el contrato.** Una versión vieja del simulador muestra el componente como «desconocido» y no lo simula.

### 4.0 Protoboard

Un circuito tiene como máximo una protoboard. Va en el campo `protoboard` (o `null` si no hay):

```json
"protoboard": { "tipo": "media", "x": 300, "y": 30 },
"componentes": [
  { "id": "led1", "tipo": "led", "x": 405, "y": 27.8, "rot": 0, "props": { "color": "rojo" },
    "en": { "catodo": "protoboard.a12", "anodo": "protoboard.a13" } }
],
"cables": [ { "de": "placa.D13", "a": "protoboard.a19", "color": "naranja" } ]
```

- **`tipo`:** `media`, la protoboard de 400 puntos del kit. `x` y `y` son su esquina superior izquierda, y se mueve como una pieza.
- **Huecos:** se nombran como vienen impresos.
  - Las tiras son `a1` … `j30` (fila y columna). Cada columna une `a`–`e` y, aparte, `f`–`j`, porque el canal central las separa.
  - Los rieles son `s+N`, `s-N` (superiores) e `i+N`, `i-N` (inferiores). N es la columna que tienen debajo, y cada riel está unido de punta a punta. Tienen 25 huecos: falta uno cada 6 columnas (1, 7, 13, 19 y 25).
  - Un cable llega a un hueco con `"protoboard.<hueco>"`.
- **`en` (opcional, en cada componente):** dónde va cada pata. Puede ir en un hueco de la protoboard, `{ "<pata>": "protoboard.<hueco>" }` (solo si hay protoboard), o **enchufada directo en el pin de otra pieza o de la placa**, `{ "<pata>": "<id>.<pin>" }`: el probador en el balance de la batería (`{ "NEG": "bat1.BAL0", "C1": "bat1.BAL1", "C2": "bat1.BAL2" }`), el servo en SERVO_1 de la shield o un LED en `placa.D13` y `placa.GND1` (desde el 12 oct). **Es lo que manda para la conexión,** no la posición del dibujo. Lo pone el lienzo al soltar una pieza (imán) y lo quita si queda suelta. Un hueco o un pin recibe una sola pata; una pieza no se enchufa en sí misma; las piezas montadas (shields) no llevan `en`. Al abrir, una entrada que apunta a algo que no existe se quita y se avisa.
- Mover, agregar o quitar la protoboard emite `componente_cambiado`, `componente_agregado` o `componente_quitado` con `id: "protoboard"`. Al encajar o soltar una pieza, `componente_cambiado` lleva su `en` (o `null`).

### 4.1 El proyecto que lo contiene (lo define TecnoBloques)

El circuito viaja dentro del proyecto `.tbq.json` de TecnoBloques. Es un solo archivo para abrir el proyecto en otro computador y simularlo. El formato completo está en la sección «Proyecto (`.tbq.json`)» del `CLAUDE.md` de TecnoBloques. Lo que importa aquí:

```json
{
  "app": "TecnoBloques", "version": 1,
  "nombre": "Mi carro", "placa": "uno", "nivel": 2,
  "bloques": { … }, "embebidos": { … }, "texto": null,
  "circuito": { "formato": 1, … },
  "creadoCon": "0.2.5", "guardado": "2026-10-07T…"
}
```

- **El `.hex` no va en el proyecto.** La fuente del programa son `bloques` o `texto`. TecnoBloques compila al pulsar «Simular» (sección 5).
- **Desde la 0.2.5, TecnoBloques conserva los campos que no conoce,** así que nunca borra `circuito` aunque sea una versión anterior al simulador.
- `circuito.placa` y la `placa` del proyecto deben coincidir. Si no coinciden, manda la del proyecto, que es la que se compila.
- `creadoCon` dice qué versión de TecnoBloques guardó el archivo. Sirve para reproducir un caso.

### 4.2 Nano + expansión E/S (modelo de referencia)

**Vistas medidas (14 oct):** el Nano y las dos expansiones son dibujos de TecnoDiseñador medidos desde las placas del ambiente, con un marco común de 60 × 53,5 mm. La roja y la azul tienen los mismos contactos en el mismo lugar; cambia el color. La medición mostró que el bloque de seis contactos son **tres 3V3 y tres GND, sin 5V**: entran `OUT_3V3_3` y `GND_OUT_3`, y `OUT_5V`/`OUT_5V_2` pasan a ser aliases que terminan en el 5V del Nano, como los `SPI_*`. Ningún cable guardado cambia de red. Una pata enchufada (`en`) en `OUT_5V` se suelta al abrir, porque ese contacto ya no existe en la placa, y se avisa.

Al crear un Nano con `circuito: null`, el lienzo inserta `exp1`, roja, USB, jack de referencia de 9 V. Abrir un circuito existente conserva sus piezas, incluso si es un Nano sin expansión. Cambiar roja/azul conserva IDs y cables. La expansión y el Nano comparten el origen; siguen siendo un módulo y una pieza de expansión, con **un solo chip**.

```json
{"id":"exp1","tipo":"shield_nano_io","x":0,"y":0,"rot":0,
 "props":{"variante":"roja","alimentacion":"usb","voltajeJack":9}}
```

| Pines de expansión | Nodo eléctrico |
|---|---|
| `<pin>_S`, `<pin>_V`, `<pin>_G` | Señal del Nano, 5V, GND; A6/A7 continúan solo ADC |
| `I2C_SDA`, `I2C_SCL`, `I2C_V`, `I2C_G` | A4, A5, 5V, GND |
| `SPI_MISO`, `SPI_MOSI`, `SPI_SCK`, `SPI_SS`, `SPI_V`, `SPI_G` (aliases heredados) | D12, D11, D13, D10, 5V, GND del Nano; sus cables se dibujan sobre los pines del módulo, sin contactos adicionales en la expansión |
| `UART_TX`, `UART_RX`, `UART_V`, `UART_G` | D1, D0, 5V, GND |
| `OUT_3V3`/`OUT_3V3_2`/`OUT_3V3_3`, `GND_OUT`/`GND_OUT_2`/`GND_OUT_3` | Bloque de seis contactos de la placa medida: tres 3,3V del regulador externo (fila de arriba) y tres GND (abajo), de izquierda a derecha |
| `OUT_5V`, `OUT_5V_2` (aliases heredados) | 5V del Nano; sus cables se dibujan sobre el pin 5V del módulo, sin contacto en la expansión |
| `JACK_POS`, `JACK_GND` | Entrada privada del regulador externo, GND |

`JACK_POS` no se une automáticamente al `VIN` del módulo; `OUT_3V3` tampoco al `3V3` del Nano. Así no se ponen reguladores en paralelo. La selección USB/jack/desconectada es una propiedad del **modelo**, no un interruptor identificado en las fotos. Una LiPo cableada al jack tiene prioridad sobre `voltajeJack`; un corto o polaridad invertida no se convierte en una fuente positiva.

El Nano usa alimentación de referencia propia; no hereda la resistencia, el fusible ni las mediciones del Uno. `limiteUSB` activa sus caídas y umbral de reinicio de referencia. `mediciones().usb` conserva su nombre por compatibilidad y añade `referencia`, `fuente`, `voltios3V3`, `voltios3V3Expansion` y `voltiosJack`; `fusible` es `null`. Las filas explican que falta validación física.

**KiCad:** `exportarNetlist()` representa el Nano con `Module:Arduino_Nano` (30 pads) y conserva dentro de él ATmega, USB y reguladores internos. Si hay expansión, agrega una **referencia de diseño**: LD1117 de 5V y 3,3V, tres condensadores de 10µF/25V, dos de 100nF, jack PJ-102AH, I2C de cuatro pines y SPI de seis. Los headers GVS y UART de la expansión no se exportan como piezas adicionales; sus redes y el resto del circuito se conservan. Los componentes de expansión llevan la propiedad `TecnoCircuito_validacion` con una nota que identifica los pendientes físicos.

La netlist permite iniciar el diseño; no certifica el circuito de ninguna tarjeta comercial ni entrega una PCB terminada. Confirmar jack/polaridad, regulación, disipación, aislamiento USB/jack y montaje real antes de fabricar. [Implementación y protocolo físico](docs/IMPLEMENTACION-NANO-2026-10-11.md).

El Nano añade los diagnósticos `nano_alimentacion` (entrada fuera del intervalo de referencia), `nano_3v3_sobrecarga` (módulo original 50mA o expansión de referencia 100mA) y `nano_bajo_voltaje` (umbral de reinicio de referencia). Que su alimentación es un modelo de referencia lo dicen la ficha y la tabla de mediciones, no una falla (desde el 12 oct ya no se emite `nano_referencia`: salía en cada corrida). `reinicio_placa` usa `motivo: 'energia_nano'` y `fuente` cuando la alimentación cae por lo que pide el circuito; quitar la fuente a mano (Desconectada, sin batería) reinicia el programa sin emitirlo, porque ya es un cambio del circuito. Uno conserva `energia_usb`. Mientras el Nano está sin energía, `sim.mediciones()` devuelve `null`; la vista apaga PWR y conserva la respuesta del reloj/modelos.

**Corrección confirmada por Efraín (11 oct):** I2C se sitúa junto a UART, al final del Nano. El bloque de seis contactos de la expansión es alimentación, no SPI. La vista ofrece **82 contactos físicos** y el esquema conserva los seis aliases `SPI_*` del primer diseño para abrir proyectos sin cambiar sus redes. SPI se accede en los pines del Nano; el header SPI exportado a KiCad es un conector **añadido al diseño de referencia**, no ese bloque de alimentación. No se cambian formato ni contrato.

## 5. Programa (.hex)

- Texto Intel HEX, tal como lo deja arduino-cli en `<build>/TecnoBloques.ino.hex`.
- Cada línea se revisa: su suma, que traiga los bytes que dice su largo y el largo de su tipo. Un `.hex` dañado es un uso equivocado de la API: `crearSimulador` lanza un error (11 oct 2026).
- TecnoBloques lo obtiene con un IPC nuevo:

  ```js
  window.tbEscritorio.compilarHex({ codigo, fqbn })
  // → { ok, hex, salida, memoria }   misma forma que subir() con soloCompilar, más el hex
  ```

## 6. Eventos

El paquete emite eventos por `alEvento`. **No guarda nada.** TecnoBloques los completa y los escribe.

- El `alEvento` de `crearLienzo` emite los eventos con `origen: 'circuito'`: el cableado y los componentes, desde que se abre el lienzo y aunque nunca se simule.
- El `alEvento` de `crearSimulador` emite los eventos con `origen: 'simulador'`.
- TecnoBloques puede pasar la misma función a los dos.

```json
{ "t": 1734567890123, "origen": "circuito", "tipo": "cable_agregado", "datos": { "de": "placa.D13", "a": "r1.1" } }
{ "t": 1734567895000, "origen": "simulador", "tipo": "falla", "datos": { "tipo": "led_quemado", "componente": "led1" } }
```

- `t`: milisegundos desde 1970. `origen`: `circuito` o `simulador`.
- Tipos del contrato 1: `componente_agregado`, `componente_quitado`, `componente_cambiado`, `cable_agregado`, `cable_quitado`, `boton_pulsado`, `simulacion_iniciada`, `simulacion_detenida`, `falla`, `reinicio_placa`.
- `falla` lleva en `datos.tipo` qué pasó: `led_quemado`, `resistencia_caliente`, `corriente_pin`, `corriente_chip` (entre todos, los pines pasan de 200 mA por las patas VCC o por las GND del chip; `componente` es `placa.VCC` o `placa.GND`), `cortocircuito`, `sin_solucion`, `servo_alimentacion` (un servo alimentado desde un pin), `reinicio_usb` (la placa se reinició por un golpe de corriente) o `fusible_usb` (el fusible del USB se abrió y la placa se apagó). Con la shield L293D, el motor TT y la batería (10 oct): `bateria_baja` (descargada; se avisa al empezar), `bateria_celdas` (bajó de 3,0 V por celda), `bateria_invertida`, `bateria_corto`, `bateria_en_5v`, `motores_sin_energia` (los motores reciben la orden y no hay batería en EXT_PWR), `motor_en_pin` y `l293d_corriente` (más de 0,6 A por canal). Con el balance y el probador (10 oct): `bateria_desbalanceada` (se avisa al empezar) y `probador_alarma` (una celda bajó del umbral del probador). Cada falla se avisa una vez por corrida.
- `reinicio_placa` (origen `simulador`): `{ motivo: 'boton' }` al pulsar Reiniciar, o `{ motivo: 'energia_usb', nuevos, total }` cuando la placa se reinicia o se apaga por la energía del USB (una vez por foto, con cuántos hubo).
- `boton_pulsado` (origen `circuito`) sale al soltar un botón presionado con el mouse durante la simulación: `{ id, ms }`, con cuánto tiempo estuvo presionado. Muestra cómo prueba el aprendiz su montaje.
- TecnoBloques completa cada evento, suma los suyos con `origen: 'editor'` y los escribe en un archivo por equipo: ver 6.1. (Hasta el 11 oct decía `alias`; desde la decisión de ese día, el registro identifica al equipo, nunca al aprendiz.)
- **Agregar un tipo de evento nuevo no rompe el contrato.** Cambiar o quitar uno sí.

### 6.1 El registro de eventos (aprobado el 11 oct 2026; se implementa en la próxima sesión)

> Decisiones de Efraín del 11 de octubre de 2026. Hasta que se implemente, rige lo de arriba. Al implementarlo, esta sección pasa a describir lo que hay, nace `contrato/evento.schema.json` y se anota en las dos bitácoras.

**Para qué.** El registro permite reconstruir el trabajo de cada equipo: qué armó, qué falla vio, qué cambió y si la falla desapareció en la corrida siguiente. También permite saber con qué modo y con qué no idealidades trabajó.

**Quién se registra: el equipo, nunca el aprendiz.**

- Cada línea lleva `equipo`: un código sin nombres ni datos de los aprendices. Un aprendiz que trabaja solo es un equipo de uno.
- La tabla que une cada código con sus integrantes no está en el software ni en este repositorio.
- El código lo escribe el equipo al abrir la app, con una confirmación («¿Son el equipo *código*?»), así un PC compartido entre grupos no mezcla registros. TecnoBloques solo revisa que no esté vacío: su formato no es parte del contrato.

**Cuándo se registra.**

- **Apagado por defecto.** Lo enciende el instructor en cada PC, desde una opción de configuración que el aprendiz no ve.
- Con el registro encendido, la app lo dice en pantalla, con un aviso discreto («Esta sesión se registra»).
- **Exportar registros** (solo para el instructor) copia los `.jsonl` a una carpeta o a una USB.
- Archivo: `%APPDATA%\TecnoBloques\registros\<equipo>-<fecha>.jsonl`, una línea JSON por evento.

**El sobre de cada evento:**

```json
{"v":1,"t":1760212345678,"origen":"simulador","tipo":"falla","corrida":3,"ms_sim":1520,
 "datos":{"tipo":"led_quemado","componente":"led1","corriente_mA":41.2},
 "equipo":"…","sesion":"5f2c…","version_tb":"0.2.6","version_tc":"0.1.0"}
```

| Campo | Lo pone | Qué es |
|---|---|---|
| `v` | quien emite | versión del esquema de eventos (empieza en 1) |
| `t` | quien emite | hora real, en ms desde 1970 |
| `origen`, `tipo`, `datos` | quien emite | como arriba; `origen` suma `editor` |
| `corrida` | TecnoCircuito | número de la simulación dentro de la sesión (1, 2, 3…), en los eventos del simulador |
| `ms_sim` | TecnoCircuito | tiempo simulado de esa corrida, en los eventos del simulador |
| `equipo`, `sesion`, `version_tb`, `version_tc` | TecnoBloques | el código del equipo, un identificador al azar por cada vez que se abre la app, y las dos versiones |

**Eventos del simulador que cambian o se agregan** (los demás siguen como arriba, con sus campos escritos en el esquema):

| Tipo | `datos` |
|---|---|
| `simulacion_iniciada` | `placa`, `modo`, `activas` (las no idealidades encendidas) y **`circuito` completo** (sección 4): cada corrida se puede analizar sola, sin reconstruirla desde los cambios |
| `simulacion_pausada` | nuevo, sin datos |
| `simulacion_detenida` | `ms_sim` y **`fallas`**: `[{ tipo, componente }]` de esa corrida. Si una falla aparece en una corrida y no en la siguiente, se corrigió |

**Eventos del editor** (`origen: 'editor'`, los emite TecnoBloques):

| Tipo | `datos` |
|---|---|
| `sesion_iniciada` | `placa`, `nivel` y `condicion` (reservado: el modo asignado, si lo hay) |
| `proyecto_abierto` / `ejemplo_cargado` | `nombre` del proyecto o `id` del ejemplo |
| `bloques_cambiados` | resumen: cuántos bloques y cuántos de cada tipo. No el XML entero |
| `codigo_compilado` | `ok`, `error` (el tipo de error, si lo hay), `bytes` y **`codigo`**: el C++ completo **sin comentarios** |
| `programa_subido` | `ok` y `placa`: el programa fue a la placa real |
| `sesion_terminada` | `ms` de la sesión |

**El código sin comentarios.** Se quitan los `//` y los `/* */`, respetando los textos entre comillas y los caracteres escapados (un `"http://…"` no se corta). Los textos entre comillas se conservan porque son parte del programa. Al exportar los datos para el análisis se revisan aparte.

**Lo que no se registra:** el texto del monitor serial (mucho volumen y texto libre que el análisis no necesita), el paso del mouse y los movimientos intermedios al arrastrar (se registra la posición final).

**Reglas:** agregar un tipo o un campo no rompe nada y el análisis ignora lo que no conoce. Cambiar o quitar uno sube `v`. El paquete sigue sin guardar nada.

## 7. Modo y no idealidades

- `modo: 'realista'` enciende todas las no idealidades. `modo: 'ideal'` las apaga todas.
- `noIdealidades` ajusta una por una encima del modo. Claves del contrato 1:

  | Clave | Qué hace |
  |---|---|
  | `danoComponentes` | LED quemado, resistencia que se calienta, pin dañado |
  | `limitePin` | corriente máxima por pin (40 mA) y total del chip (200 mA por las patas VCC, lo que entregan los pines en ALTO, y 200 mA por las GND, lo que reciben en BAJO), de la hoja de datos del ATmega328P |
  | `entradaFlotante` | una entrada sin ningún camino a 5V, a GND o a un pin que la maneje queda al aire. Medido en la placa real (9 oct 2026): sin nada cerca se queda en su nivel (cambia muy de vez en cuando); con el mouse encima del pin o de su cable («la mano») capta la red de 60 Hz (unos 120 cambios por segundo, 35 % en ALTO). La analógica deambula, o sigue la onda de 60 Hz con la mano. Apagada, lee BAJO y 0 |
  | `ruidoADC` | ruido pequeño en `analogRead`: 0,1 pasos de desviación, medido en un Uno del kit (9 oct 2026). Con la perilla quieta, la lectura solo alterna si el voltaje cae en el borde entre dos valores |
  | `caidaL293D` | caída del puente H de la shield: 1,4 V más 1 V por amperio (1,4 a 2 V), de la hoja de datos; por medir. Apagada, al motor le llega el voltaje completo de la batería |
  | `limiteUSB` | energía del USB, medida en un PC del aula (9 oct 2026): el 5V es 5,11 V − 1,66 Ω × corriente; si baja de 2,7 V (varios servos arrancando a la vez) la placa se reinicia; más de 1,5 A también la reinicia (sin medir); más de 500 mA sostenidos calientan el fusible hasta que se abre y la apagan, y vuelve a encender al enfriarse. Apagada, el 5V es 5,0 V sin límite |
  | `reinicioPorCaida` | reservada. El reinicio por caída de voltaje ya va dentro de `limiteUSB` |

- **Quién decide el modo:** TecnoBloques. El paquete solo lo recibe.

## 8. Reglas de versión

| Cambio | Contrato | Versión del paquete |
|---|---|---|
| Arreglo que no cambia el comportamiento | igual | parche (1.0.**1**) |
| Componente, evento, placa o clave de no idealidad nuevos | igual | menor (1.**1**.0) |
| Cambiar o quitar algo de la API, del formato del circuito o de los eventos | **+1** | mayor (**2**.0.0) |

- Si cambia el `formato` del circuito, el paquete debe **abrir los formatos viejos** y convertirlos.

## 9. Mecanismo para que ninguno rompa al otro

1. **Contrato con número.** TecnoBloques tiene la constante `CONTRATO_TC`. Al arrancar compara `TecnoCircuito.CONTRATO` con ella. Si no coinciden, o si el paquete falta, oculta «Simular» y el editor funciona normal.
2. **Etiqueta fija.** TecnoBloques nunca depende de una rama. Para actualizar:
   1. etiquetar aquí `vX.Y.Z` con `dist/tecnocircuito.js` construido;
   2. en TecnoBloques, cambiar la etiqueta en `package.json` y correr `npm install`;
   3. correr `npm test`, `npm run test:simulador` y `npm run test:app`;
   4. commit en TecnoBloques: `chore: TecnoCircuito vX.Y.Z`.
3. **Pruebas de contrato en los dos lados:**
   - **Aquí:** `prototipo/pruebas/fixtures/` guarda proyectos `.tbq.json` y `.hex` generados por TecnoBloques. `npm run fixtures` los copia desde `../TecnoBloques/test/salida/<caso>/` (`<caso>.tbq.json` y `<caso>.hex`, desde la 0.2.5) cuando la carpeta hermana existe. Se commitean, así que las pruebas corren sin TecnoBloques. `npm run probar:fixtures` revisa cada proyecto y su circuito contra el esquema, y corre cada `.hex` del ATmega328P en el chip simulado.
   - **En TecnoBloques:** `npm run test:simulador` compila sus programas de prueba, los corre con Node en la versión fija del simulador y comprueba que guardar y abrir un proyecto conserva `circuito` y cualquier campo desconocido.
4. **Trabajo en los dos a la vez:**
   - `node build.js --simulador-local` (o `npm run app:simulador` y `npm run test:simulador`) en TecnoBloques usa la copia de `../TecnoCircuito/prototipo/dist/tecnocircuito.js`, sin instalar nada;
   - `node build.js` usa la versión instalada desde la etiqueta (`node_modules/tecnocircuito`), o ninguna;
   - **`escritorio/empaquetar.js` se niega a armar el instalador** si el HTML trae la copia local, o si trae un simulador que no viene de `github:EMariotte/TecnoCircuito#vX.Y.Z` con esa misma versión instalada. Así un simulador en desarrollo nunca llega al aula por la actualización automática.
5. **Versión congelada.** Mientras el simulador se use en un estudio con aprendices, TecnoBloques no cambia la etiqueta. Se pueden publicar versiones de TecnoBloques sin tocarla.
6. **Documentación cruzada.** Cada cambio del contrato se anota en las dos bitácoras con el mismo título («Contrato N: …»), se actualiza este archivo y la sección «Proyecto hermano» de TecnoBloques.
7. **Claude en cada proyecto:** antes de tocar algo de las secciones 2 a 7, lee este archivo desde la carpeta hermana (`..\TecnoCircuito\CONTRATO.md` desde TecnoBloques).
8. **Más adelante (opcional):** una acción de GitHub en cada repositorio que corra las pruebas de contrato del otro con las fixtures commiteadas, sin necesitar arduino-cli.

## 10. Historial del contrato

| Contrato | Fecha | Cambio |
|---|---|---|
| 1 (borrador) | 7 oct 2026 | Primera versión: IIFE, API, placas, formato del circuito, `.hex`, eventos, modo y no idealidades. |
| 1 (borrador) | 7 oct 2026 | Ajustes del prototipo 0: cada pin físico con nombre propio (`GND1` a `GND3`), `puntos` opcionales en los cables, placa fija en el origen con coordenadas definidas y `alEvento` en `crearLienzo`. Sigue en borrador, así que no sube el número. |
| 1 (borrador) | 7 oct 2026 | Sección 4.1: el proyecto `.tbq.json` que contiene el circuito (TecnoBloques 0.2.5 conserva los campos desconocidos y guarda `creadoCon`; el `.hex` no va en el proyecto). Fixtures disponibles en `test/salida`. |
| 1 (borrador) | 7 oct 2026 | Primera conexión con TecnoBloques: `alSerial` entrega texto UTF-8; se proponen `sim.destruir()` y `sim.medidas()`. `tbEscritorio.compilarHex` ya existe en TecnoBloques (sección 5). |
| 1 (borrador) | 7 oct 2026 | `sim.medidas()`, `sim.destruir()` y `lienzo.exportarSVG()` entran a la API. Tabla de piezas y pines (con `pulsador`), 10 colores de cable en el orden del código, evento `boton_pulsado`, `entradaFlotante` digital y analógica. Sección 4.0: la protoboard (`tipo`, `x`, `y`, nombres de los huecos) y el campo `en` de cada pieza. La imagen de `exportarSVG()` lleva la marca «Hecho con TecnoCircuito · SENA – TecnoAcademia Tolima» en una franja inferior. El 8 oct entra `lienzo.exportarNetlist({ nombre })`: la netlist de KiCad (sin la protoboard ni los cables, que quedan dentro de las redes). El 8 oct entra el esquema `contrato/circuito.schema.json`: escribe las reglas que ya había, sin cambiar el formato. En la netlist, el Uno pasa a ser los conectores J1–J4 de la plantilla «Arduino Uno Shield» de KiCad (la API no cambia). El 8 oct entran la pieza `servo` (`GND`, `VCC`, `SIG`; `modelo` sg90 o mg90s), la no idealidad `limiteUSB`, las fallas `servo_alimentacion`, `reinicio_usb` y `fusible_usb`, y el evento `reinicio_placa` empieza a emitirse. El 10 oct entran `sim.mediciones()` y `TecnoCircuito.filasDeMediciones(m)` (la tabla de mediciones en español, la misma en la página de prueba y en TecnoBloques). El 10 oct entran las piezas `shield_l293d`, `motor_tt` y `bateria_lipo`, la no idealidad `caidaL293D` empieza a funcionar, las fallas de la batería y de los motores, y `mediciones()` gana `shield`, `motores`, `baterias` y `porVin`. El 10 oct entran el cable de balance de `bateria_lipo` (`BAL0`, `BAL1`, `BAL2`), la carga `desbalanceada`, la pieza `probador_lipo`, las fallas `bateria_desbalanceada` y `probador_alarma`, y `mediciones()` gana `probadores` (y `celdas` en cada batería). |
| 1 (borrador) | 11 oct 2026 | Revisión de Codex: entra la falla `corriente_chip` (R4: `limitePin` ya prometía el total del chip y no se revisaba); el `.hex` se revisa línea por línea (R5). Sin cambios en la API ni en el formato del circuito. |
| 1 (borrador) | 11 oct 2026 | Sección 6.1: el registro de eventos queda aprobado, para implementar en la próxima sesión. Identifica al **equipo** (código sin datos de los aprendices); apagado por defecto y encendido por el instructor; sobre con `v`, `corrida`, `ms_sim`, `equipo` y `sesion`; el circuito completo en `simulacion_iniciada`, las fallas de la corrida en `simulacion_detenida` y `simulacion_pausada` nuevo; eventos del editor definidos aquí; el C++ sin comentarios; sin el monitor serial. Hasta que se implemente, rige la sección 6. |
| 1 (borrador) | 11 oct 2026 | Contrato 1: Nano + expansión E/S. Soporte efectivo `nano`/`nano_old`, A6/A7 solo ADC, expansión roja/azul de 85 terminales, alimentación de referencia separada del Uno, guardado y exportación selectiva de módulo/regulación/jack/I2C/SPI. Mega sigue pendiente. Sección 4.2 y esquema ampliados sin subir formato ni contrato. |
| 1 (borrador) | 12 oct 2026 | `en` también enchufa una pata en el pin de otra pieza o de la placa (`{ "<pata>": "<id>.<pin>" }`), sin protoboard ni cables: imán entre pines, decidido por Efraín. Un hueco o pin recibe una sola pata; ninguna pieza se enchufa en sí misma. Esquema y revisor del contrato actualizados. Sin cambio de formato: todavía no hay etiqueta publicada. |
| 1 (borrador) | 11 oct 2026 | Corrección posterior de Efraín: I2C junto a UART; el bloque de seis contactos es dos GND, dos 3V3 y dos 5V. Vista con 82 contactos físicos, tres IDs nuevos de salida duplicada y seis aliases SPI heredados, dibujados sobre el Nano. El SPI de KiCad queda explícito como conector añadido al diseño; no se reinterpreta ningún cable antiguo. |
| 1 (borrador) | 14 oct 2026 | Vistas de TecnoDiseñador: el Uno pasa a ser Pieza Tecno (mismos 31 pines) y el Nano y la expansión usan dibujos medidos. La placa real tiene tres 3V3 y tres GND en el bloque de seis: entran `OUT_3V3_3` y `GND_OUT_3`, y `OUT_5V`/`OUT_5V_2` quedan como aliases heredados del 5V del Nano (decisión de Efraín). Esquema y revisor actualizados. No cambian el formato ni la red de ningún cable guardado. |
