// Prueba del servo: va a 0°, 90° y 180°, un segundo en cada uno, y avisa por el monitor serial.
#include <Servo.h>

Servo servo;

void ir(int angulo) {
  servo.write(angulo);
  Serial.println(angulo);
  delay(1000);
}

void setup() {
  Serial.begin(9600);
  servo.attach(9);
}

void loop() {
  ir(0);
  ir(90);
  ir(180);
}
