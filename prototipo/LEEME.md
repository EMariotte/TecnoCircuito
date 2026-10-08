# Prototipos 0 a 4 · cableado, chip, circuito eléctrico, PWM, tareas T1 y T2, y protoboard

Sirven para validar TecnoCircuito antes de crear el repositorio, con las piezas reales: los dibujos de @wokwi/elements, avr8js, un solucionador eléctrico propio, la API del contrato 1 (`crearLienzo` y `crearSimulador`) y el empaquetado en un solo archivo.

- **Prototipo 0:** cableado de una placa, una resistencia y un LED.
- **Prototipo 1:** avr8js ejecuta el `.hex` real compilado con arduino-cli, con un reloj común entre el chip y la pantalla.
- **Prototipo 2:** el circuito se resuelve con análisis nodal modificado (MNA) y Newton-Raphson. Calcula los voltajes y corrientes reales. El LED brilla según su corriente y se quema si no tiene resistencia, y el pin avisa si se pasa de su límite. Todo eso se apaga en modo ideal.
- **Prototipo 3:** el chip y el circuito corren en un Web Worker, en un hilo aparte de la página. El PWM se promedia y el LED brilla a medias. El potenciómetro en A0 se lee con `analogRead()`, que es la tarea T2. Si el navegador no deja crear el Worker, todo corre en la página.
- **Tareas T1 y T2 completas:** el botón se presiona con el mouse mientras se simula, y `digitalRead()` lee del circuito. Una entrada sin pull-up ni pull-down queda al aire y lee al azar, y `analogRead()` tiene un poco de ruido. Las dos cosas se apagan en modo ideal.
- **Prototipo 4:** una media protoboard de 400 puntos. Las piezas se encajan en los huecos, la tira unida por dentro se ilumina al pasar el mouse, y las piezas encajadas se mueven con ella.

## Abrirlo

Haz doble clic en `dist/prototipo.html`. Funciona sin internet.

## Qué se puede hacer

- **Cables:** clic en un pin para empezar, clic en el espacio libre para doblar el cable y clic en otro pin para terminar. También se puede arrastrar de un pin a otro. Esc cancela.
- **Cable elegido:** cambiar el color, arrastrar sus dobleces, agregar un doblez con doble clic sobre el cable o quitarlo con doble clic sobre el doblez. Supr borra el cable.
- **Piezas:** «+ Agregar» abre el menú (LED, Resistencia, Potenciómetro, Botón, Servo y Protoboard). Las piezas se arrastran, se giran con R y se borran con Supr. Se puede cambiar el color del LED y del botón, y el valor de la resistencia o del potenciómetro. La perilla se gira con el mouse sobre el dibujo o con el deslizador de la barra.
- **Colores de cable:** 10, en el orden del código de colores. Con un cable elegido o mientras se dibuja, las teclas 0 a 9 eligen el color (0 negro, 1 marrón, 2 rojo… 9 blanco).
- **Protoboard:**
  - al soltar una pieza encima, sus patas se encajan en los huecos libres más cercanos (mientras se arrastra se ven en verde);
  - al pasar el mouse por un hueco se ilumina su tira;
  - al mover la protoboard, las piezas encajadas se mueven con ella.
- **Imagen:** «Guardar imagen (SVG)» descarga el circuito tal como se ve, para documentar un proyecto o como evidencia en TecnoRuta.
- **KiCad:** «Guardar netlist (KiCad)» descarga `circuito.net`, con las piezas, sus huellas y sus conexiones, para diseñar una placa (ver abajo).
- **Vista:** la rueda del mouse hace zoom y arrastrar el fondo mueve la vista.
- **Simulación:**
  - elige el programa (parpadeo, PWM, potenciómetro, botón con pull-down o con pull-up interna, y los dos de validación) y el modo (realista o ideal), y usa Iniciar, Pausar, Reiniciar y Detener;
  - «Ejemplo con botón (T1)», «Ejemplo en protoboard (T1)», «Ejemplo con potenciómetro (T2)», «Ejemplo con servo (T3)» y «Cuatro servos en el USB (T3)» arman el circuito de cada tarea y eligen su programa;
  - mientras corre, los botones se presionan manteniendo el clic sobre ellos;
  - el cableado y los valores se pueden cambiar mientras corre;
  - el panel muestra la velocidad frente al chip real, las fallas, el monitor serial y una tabla de voltajes y corrientes;
  - al pasar el mouse por un pin conectado se ve su voltaje.

El panel de la derecha también muestra el circuito en el formato 1 del contrato y los eventos que TecnoBloques guardaría. El navegador recuerda el circuito entre visitas.

## Reconstruirlo y probarlo

```
npm install
npm run compilar      # solo si cambian los .ino de programas/ (necesita arduino-cli)
npm run construir
npm run probar        # arma, prueba el motor y el núcleo con Node y corre ocho pruebas en Chromium
npm run probar:nucleo # solo el núcleo (PWM, potenciómetro, botón, entradas al aire, ruido del ADC), sin navegador
npm run probar:motor  # solo el motor eléctrico, sin navegador, con la tabla para el multímetro
npm run probar:kicad  # solo la netlist de KiCad, sin navegador
npm run probar:contrato  # el esquema del circuito (contrato/circuito.schema.json) contra el código y los ejemplos
npm run fixtures     # trae los proyectos de prueba de TecnoBloques (necesita ../TecnoBloques)
npm run probar:fixtures  # esos proyectos: formato, circuito y su .hex corriendo en el chip
python -I pruebas/probar_kicad_pcb.py   # la netlist con las huellas reales de KiCad (se salta si no está instalado)
npm run medir         # velocidad del chip con Node, sin navegador
```

- **Pruebas en el navegador:** usan Python con Playwright y Chromium, los mismos que usan las pruebas de TecnoBloques, y guardan capturas en `pruebas/capturas/`.
- **`npm run compilar`:** usa el arduino-cli del Arduino IDE 2, igual que TecnoBloques. Los `.hex` quedan guardados en `programas/`, así que construir no lo necesita.

## Validar con el multímetro

1. Arma en la protoboard: pin 13 → resistencia → LED rojo (pata larga) → GND.
2. Sube `programas/fijo13/fijo13.ino`, que deja el pin 13 siempre en ALTO.
3. Mide el voltaje del LED, el de la resistencia y la corriente, y compáralos con la tabla de la sección 24 de [COMO-FUNCIONA.md](COMO-FUNCIONA.md), con 220, 330 y 1 kΩ.

El criterio es ±5 % en voltaje y ±10 % en corriente.

## Validar T1 y T2 con la placa real

Son dos programas que dan números para comparar con el simulador:

1. **Ruido de `analogRead()`:** potenciómetro en A0 (patas a GND y 5V), perilla quieta. Sube `programas/validar_adc/validar_adc.ino` y anota lo que imprime cada segundo: mínimo, máximo, promedio y desviación de 200 lecturas. El simulador, en modo realista, da una desviación de unos 0,6 a 0,8 pasos.
2. **Entrada al aire:** el pin 2 sin nada conectado. Sube `programas/validar_flotante/validar_flotante.ino` y anota cuántos cambios cuenta en 2 s y el porcentaje en ALTO. Repite acercando la mano al cable o tocando el pin. El simulador cambia en promedio cada 120 ms (unos 16 cambios en 2 s).

Con esos números se ajustan `RUIDO_ADC_V` y `CAMBIO_AL_AIRE_POR_MS` en `src/nucleo.js`. Los mismos programas también corren en el simulador, para compararlos.

## Validar el servo y la energía del USB con la placa real

Los valores del servo y del USB son de partida (hojas de datos y valores típicos). Con el kit se ajustan así:

1. **Consumo del servo** (multímetro en serie con el cable rojo, en la escala de 2 A o de 10 A): con `programas/servo_barrido/servo_barrido.ino`, anota la corriente quieto, moviéndose y con el brazo frenado con la mano por un segundo (bloqueado). Hazlo con el SG90 y con el MG90S. El simulador usa 10, 200 y 650 mA (SG90) y 10, 250 y 700 mA (MG90S): `MODELOS_SERVO` en `src/piezas/servo.js`.
2. **Voltaje del 5V** (multímetro entre 5V y GND) con 1 y con 2 servos moviéndose. Moviéndose, el simulador da unos 4,9 y 4,8 V (en el instante del arranque baja a 4,7 y 4,5 V, pero un multímetro no alcanza a verlo): `USB.ohmios` en `src/energia.js`.
3. **Con cuántos servos se reinicia** (`programas/servos_cuatro/servos_cuatro.ino`, con 1, 2, 3 y 4 servos alimentados del 5V de la placa por USB): mira si el monitor serial repite «Inicio». En el PC del aula y con el cable del kit. El simulador se reinicia desde 3 SG90: `USB.limitePuertoA` (1,5 A).

Las medidas van a `validacion/` y se vuelven pruebas, como las del LED.

## Llevar el circuito a KiCad

1. Arma el circuito (por ejemplo, «Ejemplo en protoboard (T1)») y pulsa «Guardar netlist (KiCad)».
2. Abre KiCad (probado con la 10.0) y crea el proyecto **desde la plantilla «Arduino Uno Shield»** (Archivo → Nuevo proyecto desde plantilla). Trae el contorno del Uno, sus 4 conectores (J1 a J4) y los agujeros de montaje.
3. Abre el **editor de placas** (PCB) y usa **Archivo → Importar → Netlist** (en español puede decir «Lista de redes»). Elige `circuito.net`, carga la netlist y actualiza la placa con los botones de esa ventana. No marques la opción de borrar las huellas que no están en la netlist: borraría los agujeros de montaje.
4. KiCad reconoce J1 a J4 y agrega las piezas, con líneas finas entre las patas que van unidas. Ubícalas dentro del contorno y traza las pistas.

La placa que se diseña es un **shield**: se monta encima del Uno con los conectores. Cómo funciona: [COMO-FUNCIONA.md](COMO-FUNCIONA.md), sección 43.

## Cómo está hecho

Ver [COMO-FUNCIONA.md](COMO-FUNCIONA.md): diagramas de bloques, capas, coordenadas, interacción, el chip, el reloj, el solucionador eléctrico, el Worker y el PWM, las entradas (T1 y T2), la protoboard y la construcción.

## Crear un componente nuevo

Ver [RECETA-COMPONENTE-NUEVO.md](RECETA-COMPONENTE-NUEVO.md): los 10 pasos que se siguieron con la protoboard, que no trae ningún simulador.

## Qué no hace

Solo dibuja y simula el Uno y la media protoboard. Todavía no tiene la tarea T3 (shield L293D, motor y servo) ni los módulos de 2027.
