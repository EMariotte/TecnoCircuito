// Tarea T1: botón con la resistencia pull-up interna. El botón une el pin 2 con GND; sin presionar,
// la pull-up interna deja el pin 2 en ALTO. Por eso la lógica va al revés: presionado = LOW.
void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Botón con pull-up interna listo");
}

int anterior = -1;

void loop() {
  int boton = digitalRead(2);
  digitalWrite(13, boton == LOW);
  if (boton != anterior) {
    Serial.println(boton == LOW ? "Presionado" : "Suelto");
    anterior = boton;
  }
}
