<p align="center"><img src="marca/png/logo-horizontal.png" alt="TecnoCircuito" width="420"></p>

# TecnoCircuito

**Simulador de circuitos con microcontrolador** para [TecnoBloques](https://github.com/EMariotte/TecnoBloques), el editor de bloques en español para Arduino de la TecnoAcademia Tolima (SENA). El aprendiz arma el circuito en una protoboard dibujada, TecnoBloques compila su programa y TecnoCircuito lo ejecuta sobre ese circuito, mostrando también las fallas reales: un LED que se quema, un pin con demasiada corriente, una entrada que lee al azar.

![La tarea T1 armada en la protoboard, con el botón presionado](docs/capturas/protoboard-t1.png)

## Qué hace hoy

- **El programa real:** [avr8js](https://github.com/wokwi/avr8js) ejecuta el `.hex` que compila arduino-cli, instrucción por instrucción, con `delay()`, `millis()`, PWM, `analogRead()` y el monitor serial. Corre en un Web Worker, aparte de la página.
- **El circuito real:** un solucionador eléctrico propio (análisis nodal modificado con Newton-Raphson) calcula voltajes y corrientes. Se comparó con el multímetro contra la placa: 11 de 12 medidas dentro del criterio, y la que queda en el límite (5,01 %) cumple al sumar la incertidumbre del multímetro.
- **Las fallas, y un modo ideal que las apaga:**
  - LED quemado, pin que se pasa de su límite y chip que se pasa de su límite total;
  - entrada al aire que lee al azar;
  - ruido en `analogRead()`;
  - servos que piden más corriente de la que da el USB: el 5V baja, la placa se reinicia o el fusible la apaga, como en la real;
  - caída de voltaje del L293D y batería LiPo que se descarga o se desbalancea.
- **Piezas:** Arduino Uno, LED, resistencia, potenciómetro, botón, microservo (SG90 o MG90S), shield de motores L293D, motor TT, batería LiPo 2S, probador de celdas y una media protoboard de 400 puntos en la que las piezas se encajan solas. La protoboard, el servo y las piezas de potencia son **piezas Tecno**: dibujos propios, hechos desde la pieza real.
- **Arduino Nano clásico y Nano antiguo:** conjunto con expansión E/S roja o azul, ocho entradas analógicas (A6/A7 solo ADC), conectores GVS/I2C/UART y seis contactos de salida medidos en la vista (tres GND y tres 3,3V); los nombres OUT_5V heredados son aliases del 5V del Nano. SPI se conecta en los pines del Nano. La continuidad, la alimentación y el montaje conservan validación física pendiente.
- **Para documentar:** el circuito se guarda como imagen SVG, para un proyecto o una evidencia.
- **Para hacer una placa:** el circuito se exporta como netlist de KiCad. Sobre la plantilla «Arduino Uno Shield» de KiCad aparecen las piezas con sus conexiones a los conectores del Uno, listas para diseñar un shield.
- **KiCad con Nano:** exporta el módulo Nano de 30 pads, regulación/filtro de referencia de 5V y 3,3V, jack e I2C/SPI. [Alcance, supuestos y pruebas físicas](docs/IMPLEMENTACION-NANO-2026-10-11.md).

  ![La T1 sobre la plantilla del shield en KiCad](docs/capturas/kicad-shield-t1.png)

| Botón con pull-down (tarea T1) | LED sin resistencia: se quema |
|---|---|
| ![](docs/capturas/boton-t1.png) | ![](docs/capturas/led-quemado.png) |

## Estado

La versión `v0.1.0` fue etiquetada el 16 de octubre de 2026 y está incorporada al instalador 0.3.0 preparado de TecnoBloques, según sus bitácoras; su Release no se había publicado. T1 y T2 están validadas con placa real. T3 tiene mediciones y ajustes documentados, con contrastes físicos todavía pendientes; Nano/expansión conserva validación física pendiente. La auditoría del 17 de octubre documentó cinco defectos de software entre los dos proyectos. Consulta el [estado técnico](CLAUDE.md), el [informe fechado](docs/AUDITORIA-CODEX-2026-10-17.md) y las fichas vigentes; una suite aprobada no acredita hardware.

## Colaboración en la suite

TecnoCircuito y TecnoBloques se construyen con dos agentes de IA: Claude programa y Codex revisa y verifica; Efraín decide. Su coordinación (proceso común, tareas y mensajes) vive en un repositorio privado aparte, `TecnoSuite/`, que se coloca junto a este. La documentación técnica y la historia permanecen aquí.

## Probarlo

Abre `prototipo/dist/prototipo.html` en el navegador. Es un solo archivo y funciona sin internet. Para reconstruirlo y correr las pruebas:

```
cd prototipo
npm install
npm run construir
npm run probar      # Node, huellas reales de KiCad y trece recorridos en Chromium (Python + Playwright)
```

## Cómo nació

La idea era validar con prototipos antes de crear el repositorio. El proyecto creció rápido: en un solo día (7 de octubre de 2026) pasó del cableado de un LED al chip simulado, al circuito eléctrico, al Web Worker con PWM, a las tareas T1 y T2 y a la protoboard. Al final se publicó con su historia:

- [BITACORA.md](BITACORA.md): la historia completa, paso a paso;
- [prototipo/COMO-FUNCIONA.md](prototipo/COMO-FUNCIONA.md): cómo está hecho, con diagramas;
- [prototipo/RECETA-COMPONENTE-NUEVO.md](prototipo/RECETA-COMPONENTE-NUEVO.md): cómo crear un componente que no trae ningún simulador;
- [CONTRATO.md](CONTRATO.md): cómo se hablan TecnoCircuito y TecnoBloques.

## Licencia

Apache 2.0 (ver [LICENSE](LICENSE) y [NOTICE](NOTICE)). Incluye avr8js (MIT), el emulador del ATmega328P.

- **Piezas Tecno:** las piezas hechas para TecnoCircuito, como la protoboard, tienen dibujos originales y también son Apache 2.0. Para crear las tuyas, sigue la [receta](prototipo/RECETA-COMPONENTE-NUEVO.md).
- **Tus imágenes son tuyas:** las imágenes que produce TecnoCircuito (por ejemplo, el SVG de un circuito) son de quien las hace. Se pueden usar, compartir y publicar libremente, sin incluir la licencia ni el aviso.

Hecho en la TecnoAcademia Tolima (SENA, Ibagué) por Efraín Guillermo Mariotte Parra, con Claude.
