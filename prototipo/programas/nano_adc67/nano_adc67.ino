// Nano clásico: A6 y A7 solo son entradas analógicas.
// Conecta dos potenciómetros entre 5V/GND y sus cursores a A6 y A7.
void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.print(analogRead(A6));
  Serial.print(',');
  Serial.println(analogRead(A7));
  delay(100);
}
