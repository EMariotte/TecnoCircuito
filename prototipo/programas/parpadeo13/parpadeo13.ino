// Prototipo 1: el LED del pin 13 prende y apaga cada medio segundo.
void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Hola desde el Uno simulado");
}

void loop() {
  digitalWrite(13, HIGH);
  Serial.println("Prendido");
  delay(500);
  digitalWrite(13, LOW);
  Serial.println("Apagado");
  delay(500);
}
