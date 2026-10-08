// Prototipo 3: el LED del pin 9 sube y baja de brillo con PWM.
void setup() {
  pinMode(9, OUTPUT);
}

void loop() {
  for (int v = 0; v <= 255; v += 5) {
    analogWrite(9, v);
    delay(20);
  }
  for (int v = 255; v >= 0; v -= 5) {
    analogWrite(9, v);
    delay(20);
  }
}
