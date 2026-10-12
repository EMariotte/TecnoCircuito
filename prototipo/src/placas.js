// SPDX-License-Identifier: Apache-2.0
// Perfiles de las placas ATmega328P. Nano y Nano con cargador antiguo cambian el
// protocolo de carga, no el chip que ejecuta el HEX ni su reloj de 16 MHz.
const digitales = Object.freeze([...Array.from({ length: 14 }, (_, i) => 'D' + i), ...Array.from({ length: 6 }, (_, i) => 'A' + i)]);
const analogicosUno = Object.freeze([['A0'], ['A1'], ['A2'], ['A3'], ['A4', 'SDA'], ['A5', 'SCL']].map(Object.freeze));
const puentesUno = Object.freeze([['GND1', 'GND2', 'GND3'], ['A4', 'SDA'], ['A5', 'SCL']].map(Object.freeze));
const puentesNano = Object.freeze([
  ['GND1', 'GND2'], ['RESET', 'RESET2'], ['A4', 'SDA'], ['A5', 'SCL'],
  ['D12', 'MISO'], ['D11', 'MOSI'], ['D13', 'SCK'], ['D10', 'SS'],
].map(Object.freeze));
const analogicosNano = Object.freeze([...analogicosUno, Object.freeze(['A6']), Object.freeze(['A7'])]);
const pinesModuloNano = Object.freeze([...digitales, 'A6', 'A7', 'GND1', 'GND2', 'RESET', 'RESET2', '5V', '3V3', 'VIN', 'AREF']);

export const PLACA_UNO = Object.freeze({
  nombre: 'Arduino Uno R3', pinesDigitales: digitales, analogicos: analogicosUno,
  puentes: puentesUno, gnd: Object.freeze(['GND1', 'GND2', 'GND3']),
  pines: Object.freeze([...digitales, 'GND1', 'GND2', 'GND3', '5V', '3V3', 'VIN', 'RESET', 'AREF', 'SDA', 'SCL']),
});
export const PLACA_NANO = Object.freeze({
  nombre: 'Arduino Nano clásico', pinesDigitales: digitales, analogicos: analogicosNano,
  puentes: puentesNano, gnd: Object.freeze(['GND1', 'GND2']), pinesModulo: pinesModuloNano,
  pines: Object.freeze([...pinesModuloNano, 'SDA', 'SCL', 'MISO', 'MOSI', 'SCK', 'SS']),
});
export const esNano = (placa) => placa === 'nano' || placa === 'nano_old';
export const perfilPlaca = (placa) => esNano(placa) ? PLACA_NANO : PLACA_UNO;
