// Prototipo 2: el pin 13 queda siempre en ALTO, para medir con el multímetro el voltaje del LED,
// el de la resistencia y la corriente, y compararlos con el simulador.
void setup() {
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);
  Serial.begin(9600);
  Serial.println("Pin 13 en ALTO: listo para medir");
}

void loop() {
}
