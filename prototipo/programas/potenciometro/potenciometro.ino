// Prototipo 3 (tarea T2): el potenciómetro en A0 controla el brillo del LED del pin 9.
void setup() {
  pinMode(9, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lectura = analogRead(A0);
  analogWrite(9, lectura / 4);
  Serial.println(lectura);
  delay(100);
}
