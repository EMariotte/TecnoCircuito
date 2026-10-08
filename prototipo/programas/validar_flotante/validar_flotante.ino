// Validación de la entrada flotante (tarea T1). El pin 2 queda como entrada SIN nada conectado.
// Durante 2 segundos cuenta cuántas veces cambia y qué parte del tiempo lee ALTO.
// Con una entrada flotante, los números varían de una medida a otra: eso es lo que hay que ver.
void setup() {
  pinMode(2, INPUT);
  Serial.begin(9600);
}

void loop() {
  long cambios = 0;
  long altos = 0;
  long muestras = 0;
  int anterior = digitalRead(2);
  unsigned long inicio = millis();
  while (millis() - inicio < 2000) {
    int v = digitalRead(2);
    if (v != anterior) cambios++;
    if (v == HIGH) altos++;
    anterior = v;
    muestras++;
  }
  Serial.print("cambios ");
  Serial.print(cambios);
  Serial.print(" alto ");
  Serial.print(100.0 * altos / muestras, 1);
  Serial.println(" %");
}
