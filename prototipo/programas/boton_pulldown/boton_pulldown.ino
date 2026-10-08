// Tarea T1: botón con resistencia pull-down. El botón une el pin 2 con 5V; una resistencia de 10 kΩ
// lleva el pin 2 a GND cuando está suelto. El LED del pin 13 se prende mientras el botón está presionado.
void setup() {
  pinMode(2, INPUT);
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Botón con pull-down listo");
}

int anterior = -1;

void loop() {
  int boton = digitalRead(2);
  digitalWrite(13, boton);
  if (boton != anterior) {
    Serial.println(boton == HIGH ? "Presionado" : "Suelto");
    anterior = boton;
  }
}
