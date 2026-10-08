// El chip del Uno (ATmega328P) con avr8js: ejecuta el .hex real instrucción por instrucción
// y avisa cuando cambia un pin o cuando el programa manda un byte por el monitor serial.
import {
  CPU,
  avrInstruction,
  AVRTimer,
  timer0Config,
  timer1Config,
  timer2Config,
  AVRIOPort,
  portBConfig,
  portCConfig,
  portDConfig,
  AVRUSART,
  usart0Config,
  AVRADC,
  adcConfig,
  PinState,
} from 'avr8js';
import { leerHex } from './hex.js';

export const FRECUENCIA = 16e6; // 16 MHz, el cristal del Uno

// Qué pin del Uno corresponde a cada bit de cada puerto del ATmega328P.
const PINES_UNO = [
  [portDConfig, ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7']],
  [portBConfig, ['D8', 'D9', 'D10', 'D11', 'D12', 'D13']],
  [portCConfig, ['A0', 'A1', 'A2', 'A3', 'A4', 'A5']],
];

export { PinState };

export { leerHex }; // se conserva aquí para las pruebas que lo importan desde el chip

export function crearChip(hex) {
  const cpu = new CPU(leerHex(hex));
  // Los temporizadores hacen funcionar millis(), delay() y el PWM, igual que en la placa real.
  [timer0Config, timer1Config, timer2Config].forEach((config) => new AVRTimer(cpu, config));
  const usart = new AVRUSART(cpu, usart0Config, FRECUENCIA);
  // analogRead(): el ADC lee el voltaje que el circuito deja en A0–A5 (lo pone ponerAnalogico).
  const adc = new AVRADC(cpu, adcConfig);
  const puertos = PINES_UNO.map(([config, nombres]) => [new AVRIOPort(cpu, config), nombres]);

  const alPines = [];
  const alByte = [];
  const colaEntrada = [];
  let anterior = estados();

  function estados() {
    const e = {};
    for (const [puerto, nombres] of puertos) nombres.forEach((nombre, bit) => (e[nombre] = puerto.pinState(bit)));
    return e;
  }

  // avr8js avisa cada vez que el programa escribe en un puerto; aquí se filtra lo que cambió de verdad.
  for (const [puerto] of puertos) {
    puerto.addListener(() => {
      const ahora = estados();
      const cambios = {};
      for (const nombre in ahora) if (ahora[nombre] !== anterior[nombre]) cambios[nombre] = ahora[nombre];
      anterior = ahora;
      if (Object.keys(cambios).length) alPines.forEach((fn) => fn(cambios, ahora));
    });
  }
  usart.onByteTransmit = (byte) => alByte.forEach((fn) => fn(byte));

  // Avanza el chip `ciclos` ciclos de reloj. Cada 1 ms simulado entrega un byte pendiente del serial.
  function correr(ciclos) {
    const fin = cpu.cycles + ciclos;
    while (cpu.cycles < fin) {
      const tramo = Math.min(fin, cpu.cycles + FRECUENCIA / 1000);
      while (cpu.cycles < tramo) {
        avrInstruction(cpu);
        cpu.tick();
      }
      if (colaEntrada.length && !usart.rxBusy) {
        usart.writeByte(colaEntrada[0]); // si el programa no abrió el serial, el byte se pierde, como en la placa
        colaEntrada.shift();
      }
    }
  }

  return {
    correr,
    estados,
    get ciclos() {
      return cpu.cycles;
    },
    alCambiarPines: (fn) => alPines.push(fn),
    alByteSerial: (fn) => alByte.push(fn),
    enviarSerial: (texto) => colaEntrada.push(...new TextEncoder().encode(texto)),
    // Voltaje (0 a 5 V) que verá analogRead() en el canal 0–5 (A0–A5).
    ponerAnalogico: (canal, voltios) => (adc.channelValues[canal] = Math.max(0, Math.min(5, voltios))),
  };
}
