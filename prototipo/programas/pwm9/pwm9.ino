// Prototipo 3: PWM fijo en el pin 9 (analogWrite 64 de 255, un 25 %), para comprobar el promedio del PWM.
void setup() {
  pinMode(9, OUTPUT);
  analogWrite(9, 64);
}

void loop() {
}
