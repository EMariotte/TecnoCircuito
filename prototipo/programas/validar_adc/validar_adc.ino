// Validación del ruido de analogRead() (tarea T2). Con el potenciómetro quieto en A0, toma 200 lecturas
// y escribe la menor, la mayor, el promedio y la desviación estándar. Se compara con el simulador.
void setup() {
  Serial.begin(9600);
}

void loop() {
  long suma = 0;
  long cuadrados = 0;
  int menor = 1023;
  int mayor = 0;
  for (int i = 0; i < 200; i++) {
    int v = analogRead(A0);
    suma += v;
    cuadrados += (long)v * v;
    if (v < menor) menor = v;
    if (v > mayor) mayor = v;
    delay(2);
  }
  float promedio = suma / 200.0;
  float desviacion = sqrt(cuadrados / 200.0 - promedio * promedio);
  Serial.print("min ");
  Serial.print(menor);
  Serial.print(" max ");
  Serial.print(mayor);
  Serial.print(" promedio ");
  Serial.print(promedio, 2);
  Serial.print(" desviacion ");
  Serial.println(desviacion, 2);
  delay(1000);
}
