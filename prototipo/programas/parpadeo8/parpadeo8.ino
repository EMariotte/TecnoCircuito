// Prototipo 1: el pin 8 prende y apaga cada 0,2 segundos.
// Sirve para comprobar que el LED solo parpadea si está cableado al pin que usa el programa.
void setup() {
  pinMode(8, OUTPUT);
  Serial.begin(9600);
  Serial.println("Parpadeo en el pin 8");
}

void loop() {
  digitalWrite(8, HIGH);
  delay(200);
  digitalWrite(8, LOW);
  delay(200);
}
