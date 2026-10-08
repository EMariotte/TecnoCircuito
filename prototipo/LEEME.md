# Prototipos 0 a 3 · cableado, chip, circuito eléctrico y PWM

Sirven para validar TecnoCircuito antes de crear el repositorio, con las piezas reales: los dibujos de @wokwi/elements, avr8js, un solucionador eléctrico propio, la API del contrato 1 (`crearLienzo` y `crearSimulador`) y el empaquetado en un solo archivo.

- **Prototipo 0:** cableado de una placa, una resistencia y un LED.
- **Prototipo 1:** avr8js ejecuta el `.hex` real compilado con arduino-cli, con un reloj común entre el chip y la pantalla.
- **Prototipo 2:** el circuito se resuelve con análisis nodal modificado (MNA) y Newton-Raphson. Calcula los voltajes y corrientes reales. El LED brilla según su corriente y se quema si no tiene resistencia, y el pin avisa si se pasa de su límite. Todo eso se apaga en modo ideal.
- **Prototipo 3:** el chip y el circuito corren en un Web Worker, en un hilo aparte de la página. El PWM se promedia y el LED brilla a medias. El potenciómetro en A0 se lee con `analogRead()`, que es la tarea T2. Si el navegador no deja crear el Worker, todo corre en la página.

## Abrirlo

Haz doble clic en `dist/prototipo.html`. Funciona sin internet.

## Qué se puede hacer

- **Cables:** clic en un pin para empezar, clic en el espacio libre para doblar el cable y clic en otro pin para terminar. También se puede arrastrar de un pin a otro. Esc cancela.
- **Cable elegido:** cambiar el color, arrastrar sus dobleces, agregar un doblez con doble clic sobre el cable o quitarlo con doble clic sobre el doblez. Supr borra el cable.
- **Piezas:** arrastrarlas, girarlas con R y borrarlas con Supr. Se pueden agregar LED, resistencias y potenciómetros, y cambiar el color del LED y el valor de la resistencia o del potenciómetro. La perilla se gira con el mouse sobre el dibujo o con el deslizador de la barra.
- **Vista:** la rueda del mouse hace zoom y arrastrar el fondo mueve la vista.
- **Simulación:**
  - elige el programa (parpadeo en el pin 13 o en el 8, pin 13 siempre en ALTO, PWM fijo en el pin 9, LED que sube y baja de brillo, o potenciómetro que controla el brillo) y el modo (realista o ideal), y usa Iniciar, Pausar, Reiniciar y Detener;
  - «Ejemplo con potenciómetro (T2)» arma el circuito de la tarea 2 y elige su programa;
  - el cableado y los valores se pueden cambiar mientras corre;
  - el panel muestra la velocidad frente al chip real, las fallas, el monitor serial y una tabla de voltajes y corrientes;
  - al pasar el mouse por un pin conectado se ve su voltaje.

El panel de la derecha también muestra el circuito en el formato 1 del contrato y los eventos que TecnoBloques guardaría. El navegador recuerda el circuito entre visitas.

## Reconstruirlo y probarlo

```
npm install
npm run compilar      # solo si cambian los .ino de programas/ (necesita arduino-cli)
npm run construir
npm run probar        # arma, prueba el motor y el núcleo con Node y corre cinco pruebas en Chromium
npm run probar:nucleo # solo el núcleo (PWM, potenciómetro, LED quemado por el pico), sin navegador
npm run probar:motor  # solo el motor eléctrico, sin navegador, con la tabla para el multímetro
npm run medir         # velocidad del chip con Node, sin navegador
```

- **Pruebas en el navegador:** usan Python con Playwright y Chromium, los mismos que usan las pruebas de TecnoBloques, y guardan capturas en `pruebas/capturas/`.
- **`npm run compilar`:** usa el arduino-cli del Arduino IDE 2, igual que TecnoBloques. Los `.hex` quedan guardados en `programas/`, así que construir no lo necesita.

## Validar con el multímetro

1. Arma en la protoboard: pin 13 → resistencia → LED rojo (pata larga) → GND.
2. Sube `programas/fijo13/fijo13.ino`, que deja el pin 13 siempre en ALTO.
3. Mide el voltaje del LED, el de la resistencia y la corriente, y compáralos con la tabla de la sección 24 de [COMO-FUNCIONA.md](COMO-FUNCIONA.md), con 220, 330 y 1 kΩ.

El criterio es ±5 % en voltaje y ±10 % en corriente.

## Cómo está hecho

Ver [COMO-FUNCIONA.md](COMO-FUNCIONA.md): diagramas de bloques, capas, coordenadas, interacción, el chip, el reloj, el solucionador eléctrico y la construcción.

## Qué no hace

No tiene protoboard, solo dibuja y simula el Uno y todavía no promedia el PWM. El chip corre en el hilo principal, sin Web Worker.
