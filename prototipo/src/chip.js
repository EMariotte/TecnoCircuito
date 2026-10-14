// El chip de Uno y Nano clásico (ATmega328P) con avr8js: ejecuta el .hex real instrucción por instrucción
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
  ADCMuxInputType,
  PinState as PinStateAvr,
} from 'avr8js';
import { leerHex } from './hex.js';

export const FRECUENCIA = 16e6; // 16 MHz, el cristal del Uno
const CICLOS_MS = FRECUENCIA / 1000;
// La función que ejecuta cada instrucción, guardada una vez: al empaquetar, esbuild deja `avrInstruction` detrás de
// dos «getters» de módulo, y llamarlos en cada instrucción (millones por segundo) costaba ~14 % del tiempo del chip.
const ejecutarInstruccion = avrInstruction;

// Qué pin del Uno corresponde a cada bit de cada puerto del ATmega328P.
const PINES_UNO = [
  [portDConfig, ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7']],
  [portBConfig, ['D8', 'D9', 'D10', 'D11', 'D12', 'D13']],
  [portCConfig, ['A0', 'A1', 'A2', 'A3', 'A4', 'A5']],
];

// Copia propia de los estados de un pin (Low, High, Input, InputPullUp): por la misma razón que arriba, leer
// `PinState.High` de avr8js en cada cambio de pin pasaba por los getters de esbuild.
export const PinState = Object.freeze({ ...PinStateAvr });

export { leerHex }; // se conserva aquí para las pruebas que lo importan desde el chip

export function crearChip(hex) {
  const cpu = new CPU(leerHex(hex));
  // Los temporizadores hacen funcionar millis(), delay() y el PWM, igual que en la placa real.
  [timer0Config, timer1Config, timer2Config].forEach((config) => new AVRTimer(cpu, config));
  const usart = new AVRUSART(cpu, usart0Config, FRECUENCIA);
  // ADC de ocho canales: Nano expone también ADC6/ADC7, que no pertenecen a PORTC.
  const adc = new AVRADC(cpu, adcConfig);
  const puertos = PINES_UNO.map(([config, nombres]) => [new AVRIOPort(cpu, config), nombres]);
  const dondeEsta = {}; // pin → [puerto, bit], para poner el nivel de una entrada
  for (const [puerto, nombres] of puertos) nombres.forEach((nombre, bit) => (dondeEsta[nombre] = [puerto, bit]));
  // Cada analogRead() le pregunta al núcleo qué voltaje lee (ahí entran el ruido y la entrada al aire).
  // Si nadie responde, se lee el voltaje que dejó ponerAnalogico, como hace avr8js por omisión.
  let lectorAnalogico = null;
  adc.onADCRead = (entrada) => {
    let voltios = 0;
    if (entrada.type === ADCMuxInputType.SingleEnded) {
      const base = adc.channelValues[entrada.channel] || 0;
      voltios = lectorAnalogico ? lectorAnalogico(entrada.channel, base) : base;
    } else if (entrada.type === ADCMuxInputType.Constant) {
      voltios = entrada.voltage;
    } else if (entrada.type === ADCMuxInputType.Temperature) {
      voltios = 0.378125; // 25 °C, como avr8js
    }
    // Redondeado al microvoltio: justo en el borde entre dos pasos (2,5 V = 512), un error de cálculo de una
    // milmillonésima de voltio haría saltar la lectura entre 511 y 512 sin ruido de por medio.
    const exacto = Math.round(voltios * 1e6) / 1e6;
    const valor = Math.min(1023, Math.max(0, Math.floor((exacto / adc.referenceVoltage) * 1024)));
    cpu.addClockEvent(() => adc.completeADCRead(valor), adc.sampleCycles);
  };
  const alMs = [];

  const alPines = [];
  const alByte = [];
  const alRecibido = []; // cada byte del monitor serial que llega a la placa (el LED RX)
  const colaEntrada = [];
  let anterior = estados();

  function estados() {
    const e = {};
    for (const [puerto, nombres] of puertos) nombres.forEach((nombre, bit) => (e[nombre] = puerto.pinState(bit)));
    return e;
  }

  // avr8js avisa cada vez que el programa escribe en un puerto; aquí se filtra lo que cambió de verdad, mirando solo
  // los pines de ese puerto. `ahora` es el estado de todos los pines; se reutiliza: quien lo guarde, que lo copie.
  for (const [puerto, nombres] of puertos) {
    puerto.addListener(() => {
      let cambios = null;
      for (let bit = 0; bit < nombres.length; bit++) {
        const estado = puerto.pinState(bit);
        if (estado !== anterior[nombres[bit]]) {
          (cambios || (cambios = {}))[nombres[bit]] = estado;
          anterior[nombres[bit]] = estado;
        }
      }
      if (cambios) for (const fn of alPines) fn(cambios, anterior);
    });
  }
  usart.onByteTransmit = (byte) => alByte.forEach((fn) => fn(byte));

  // Avanza el chip `ciclos` ciclos de reloj. Al cruzar cada milisegundo simulado (y solo entonces) entrega un byte
  // pendiente del serial y corre los modelos «de cada ms» (servos, motores, energía, entradas al aire). El Worker
  // avanza en pedazos que no son ms exactos: el próximo milisegundo se cuenta en ciclos absolutos, no por llamada.
  let proximoMs = CICLOS_MS;
  function correr(ciclos) {
    const fin = cpu.cycles + ciclos;
    while (cpu.cycles < fin) {
      const tramo = Math.min(fin, proximoMs);
      while (cpu.cycles < tramo) {
        ejecutarInstruccion(cpu);
        cpu.tick();
      }
      if (cpu.cycles < proximoMs) break; // el pedazo terminó antes del próximo milisegundo
      proximoMs += CICLOS_MS;
      if (colaEntrada.length && !usart.rxBusy) {
        usart.writeByte(colaEntrada[0]); // si el programa no abrió el serial, el byte se pierde, como en la placa
        colaEntrada.shift();
        for (const fn of alRecibido) fn(); // el LED RX lo prende el conversor USB, aunque el programa no lea
      }
      for (const fn of alMs) fn();
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
    alByteRecibido: (fn) => alRecibido.push(fn),
    enviarSerial: (texto) => colaEntrada.push(...new TextEncoder().encode(texto)),
    // Voltaje que verá analogRead() en los canales ADC0–ADC7. A6/A7 no tienen GPIO.
    ponerAnalogico: (canal, voltios) => (adc.channelValues[canal] = Math.max(0, Math.min(5, voltios))),
    // En Nano la referencia DEFAULT del ADC sigue la alimentación real AVCC.
    ponerVoltajeReferencia: (voltios) => (adc.avcc = Math.max(0.001, Number(voltios) || 0)),
    // fn(canal, voltiosDelCircuito) → voltios que lee esta conversión.
    ponerLectorAnalogico: (fn) => (lectorAnalogico = fn),
    // Nivel que verá digitalRead() en un pin de entrada (true = ALTO).
    ponerEntrada(pin, nivel) {
      const lugar = dondeEsta[pin];
      if (lugar) lugar[0].setPin(lugar[1], !!nivel);
    },
    alCadaMs: (fn) => alMs.push(fn),
  };
}
