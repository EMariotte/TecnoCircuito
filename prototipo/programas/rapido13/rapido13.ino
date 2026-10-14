// Prueba del LED L: el pin 13 cambia mil veces por segundo, en ALTO un cuarto del tiempo.
// Mucho más rápido que una foto del simulador (16 ms): el LED L se ve a un cuarto de brillo, sin parpadear.
void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delayMicroseconds(250);
  digitalWrite(13, LOW);
  delayMicroseconds(750);
}
