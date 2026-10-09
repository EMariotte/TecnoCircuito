# Contrato entre TecnoCircuito y TecnoBloques

> **Contrato 1 · borrador** · 7 de octubre de 2026
> Este archivo es la **fuente única** de cómo se hablan los dos proyectos. TecnoBloques lo resume en la sección «Proyecto hermano» de su `CLAUDE.md`.
> Mientras esté en borrador se puede cambiar sin subir el número. Pasa a firme con la primera etiqueta `v1.0.0`.

---

## 1. Distribución

- TecnoCircuito entrega **`dist/tecnocircuito.js`**: un IIFE sin dependencias externas que define **`window.TecnoCircuito`**. Lleva dentro avr8js y los dibujos.
- El archivo se **commitea ya construido en cada etiqueta**. Instalarlo desde GitHub no compila nada.
- TecnoBloques lo declara con una etiqueta fija:

  ```json
  "dependencies": { "tecnocircuito": "github:EMariotte/TecnoCircuito#v1.0.0" }
  ```

- `build.js` de TecnoBloques lo embebe en `dist/TecnoBloques.html` con un `<script>` más, después de Blockly y antes del código de la app.

## 2. API

```js
TecnoCircuito.VERSION    // '1.0.0'  versión del paquete (semver)
TecnoCircuito.CONTRATO   // 1        sube solo cuando se rompe la compatibilidad
TecnoCircuito.PLACAS     // ['uno', 'nano', 'nano_old', 'mega']  placas que sabe simular

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
lienzo.ponerPlaca('mega');
lienzo.ponerTema('oscuro');
lienzo.exportarSVG();       // el circuito como texto SVG, tal como se ve (documentación, evidencias en TecnoRuta),
                            // con la marca «Hecho con TecnoCircuito · SENA – TecnoAcademia Tolima» abajo a la derecha
lienzo.exportarNetlist({ nombre });  // el circuito como netlist de KiCad (.net, «export» versión E): piezas con su huella
                            // y redes. El Uno va como los 4 conectores (J1–J4) de la plantilla «Arduino Uno Shield»
                            // de KiCad; en su editor de placas, Archivo → Importar → Netlist
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
sim.destruir();  // detiene, libera el Worker y suelta el lienzo; después el objeto ya no sirve
```

- `sim.medidas()` y `sim.destruir()` entraron al contrato el 7 oct 2026, tras la primera conexión. Los nombres del prototipo (`_medidas`, `_destruir`) siguen funcionando mientras TecnoBloques se actualiza, pero no son parte del contrato.

- **Ninguna función lanza errores hacia el editor por fallas del circuito o del programa.** Esas fallas salen por `alFalla`. Solo se lanza un error por un uso equivocado de la API, como una placa que no existe.

## 3. Placas

- Las claves son las de `PLACAS` en `src/nucleo.js` de TecnoBloques: `uno`, `nano`, `nano_old` y `mega`.
- `nano` y `nano_old` se simulan igual. Solo cambia el cargador en la placa real.
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
- **`puntos`** (opcional) son los dobleces del cable, en orden desde `de` hasta `a`: una lista de pares `[x, y]` en las mismas coordenadas. Sin `puntos`, el cable va recto.
- **El esquema manda:** [`contrato/circuito.schema.json`](contrato/circuito.schema.json) (JSON Schema 2020-12) define los nombres de pines de cada pieza, los colores y los huecos de la protoboard. Lo que un esquema no puede revisar (que cada cable llegue a una pieza que existe y a un pin que esa pieza tiene) lo revisa `prototipo/pruebas/contrato.js`. Es tolerante con lo nuevo: un tipo de pieza o un campo que no conoce no lo invalida. Resumen de las piezas:

  | `tipo` | Pines | `props` |
  |---|---|---|
  | `resistencia` | `1`, `2` | `ohmios` |
  | `led` | `anodo`, `catodo` | `color`: rojo, verde, amarillo, azul o blanco |
  | `potenciometro` | `GND`, `SIG`, `VCC` | `ohmios`, `posicion` (0 hacia GND, 1 hacia VCC) |
  | `pulsador` | `1i`, `1d`, `2i`, `2d` | `color` |
  | `servo` | `GND` (marrón), `VCC` (rojo), `SIG` (naranja, la señal) | `modelo`: `sg90` o `mg90s` (cambia el dibujo, el consumo y la velocidad) |

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
- **`en` (opcional, en cada componente):** qué pata va en qué hueco, como `{ "<pata>": "protoboard.<hueco>" }`. **Es lo que manda para la conexión,** no la posición del dibujo. Lo pone el lienzo al encajar una pieza y lo quita si la pieza queda suelta. Sin protoboard, `en` no vale.
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

## 5. Programa (.hex)

- Texto Intel HEX, tal como lo deja arduino-cli en `<build>/TecnoBloques.ino.hex`.
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
- `falla` lleva en `datos.tipo` qué pasó: `led_quemado`, `resistencia_caliente`, `corriente_pin`, `cortocircuito`, `sin_solucion`, `servo_alimentacion` (un servo alimentado desde un pin), `reinicio_usb` (la placa se reinició por un golpe de corriente) o `fusible_usb` (el fusible del USB se abrió y la placa se apagó). Cada falla se avisa una vez por corrida.
- `reinicio_placa` (origen `simulador`): `{ motivo: 'boton' }` al pulsar Reiniciar, o `{ motivo: 'energia_usb', nuevos, total }` cuando la placa se reinicia o se apaga por la energía del USB (una vez por foto, con cuántos hubo).
- `boton_pulsado` (origen `circuito`) sale al soltar un botón presionado con el mouse durante la simulación: `{ id, ms }`, con cuánto tiempo estuvo presionado. Muestra cómo prueba el aprendiz su montaje.
- TecnoBloques agrega `alias`, `sesion`, `version_tb` y `version_tc`. Suma sus propios eventos con `origen: 'editor'` (cambios de bloques, compilaciones, errores) y escribe una línea JSON por evento en `%APPDATA%\TecnoBloques\registros\<alias>-<fecha>.jsonl`.
- **Agregar un tipo de evento nuevo no rompe el contrato.** Cambiar o quitar uno sí.

## 7. Modo y no idealidades

- `modo: 'realista'` enciende todas las no idealidades. `modo: 'ideal'` las apaga todas.
- `noIdealidades` ajusta una por una encima del modo. Claves del contrato 1:

  | Clave | Qué hace |
  |---|---|
  | `danoComponentes` | LED quemado, resistencia que se calienta, pin dañado |
  | `limitePin` | corriente máxima por pin y total del chip |
  | `entradaFlotante` | una entrada sin ningún camino a 5V, a GND o a un pin que la maneje queda al aire. Medido en la placa real (9 oct 2026): sin nada cerca se queda en su nivel (cambia muy de vez en cuando); con el mouse encima del pin o de su cable («la mano») capta la red de 60 Hz (unos 120 cambios por segundo, 35 % en ALTO). La analógica deambula, o sigue la onda de 60 Hz con la mano. Apagada, lee BAJO y 0 |
  | `ruidoADC` | ruido pequeño en `analogRead`: 0,1 pasos de desviación, medido en un Uno del kit (9 oct 2026). Con la perilla quieta, la lectura solo alterna si el voltaje cae en el borde entre dos valores |
  | `caidaL293D` | caída de 1,4 a 2 V en las salidas de la shield |
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
   - `npm run simulador:local` (en TecnoBloques) instala `file:../TecnoCircuito`;
   - `npm run simulador:fijo` vuelve a la etiqueta de `package.json`;
   - **`escritorio/empaquetar.js` se niega a armar el instalador si la dependencia no es una etiqueta.** Así un simulador en desarrollo nunca llega al aula por la actualización automática.
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
| 1 (borrador) | 7 oct 2026 | `sim.medidas()`, `sim.destruir()` y `lienzo.exportarSVG()` entran a la API. Tabla de piezas y pines (con `pulsador`), 10 colores de cable en el orden del código, evento `boton_pulsado`, `entradaFlotante` digital y analógica. Sección 4.0: la protoboard (`tipo`, `x`, `y`, nombres de los huecos) y el campo `en` de cada pieza. La imagen de `exportarSVG()` lleva la marca «Hecho con TecnoCircuito · SENA – TecnoAcademia Tolima» en una franja inferior. El 8 oct entra `lienzo.exportarNetlist({ nombre })`: la netlist de KiCad (sin la protoboard ni los cables, que quedan dentro de las redes). El 8 oct entra el esquema `contrato/circuito.schema.json`: escribe las reglas que ya había, sin cambiar el formato. En la netlist, el Uno pasa a ser los conectores J1–J4 de la plantilla «Arduino Uno Shield» de KiCad (la API no cambia). El 8 oct entran la pieza `servo` (`GND`, `VCC`, `SIG`; `modelo` sg90 o mg90s), la no idealidad `limiteUSB`, las fallas `servo_alimentacion`, `reinicio_usb` y `fusible_usb`, y el evento `reinicio_placa` empieza a emitirse. |
