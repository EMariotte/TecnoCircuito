// Prueba de la corriente del servo en movimiento (tarea T3): el servo va y viene sin parar entre 10° y 170°,
// un grado cada 15 ms (unos 2,4 s por vuelta). Así el multímetro, que es lento, alcanza a leer la corriente
// mientras gira. El monitor serial avisa en cada extremo.
#include <Servo.h>

Servo servo;

void setup() {
  Serial.begin(9600);
  servo.attach(9);
}

void loop() {
  for (int a = 10; a <= 170; a++) {
    servo.write(a);
    delay(15);
  }
  Serial.println("170");
  for (int a = 170; a >= 10; a--) {
    servo.write(a);
    delay(15);
  }
  Serial.println("10");
}
