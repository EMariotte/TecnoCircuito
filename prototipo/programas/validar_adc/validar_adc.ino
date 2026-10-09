// Validación del ruido de analogRead() (tarea T2). Con el potenciómetro quieto en A0, toma 200 lecturas
// y escribe la menor, la mayor, el promedio y la desviación estándar. Se compara con el simulador.
// Las sumas se hacen con enteros, respecto de la primera lectura: así la desviación sale exacta (con float de
// 32 bits y sumas del orden del millón se perdía precisión y salía nan).
void setup() {
  Serial.begin(9600);
}

void loop() {
  int primera = analogRead(A0);
  long suma = 0;       // suma de (v - primera)
  long cuadrados = 0;  // suma de (v - primera)²
  int menor = 1023;
  int mayor = 0;
  for (int i = 0; i < 200; i++) {
    int v = analogRead(A0);
    long d = v - primera;
    suma += d;
    cuadrados += d * d;
    if (v < menor) menor = v;
    if (v > mayor) mayor = v;
    delay(2);
  }
  float media = suma / 200.0;
  float varianza = cuadrados / 200.0 - media * media;
  float promedio = primera + media;
  float desviacion = sqrt(varianza > 0 ? varianza : 0);
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
