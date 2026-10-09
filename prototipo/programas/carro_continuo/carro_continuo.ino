// Como lo arman los bloques de TecnoBloques: los motores reciben la orden una y otra vez, sin pausa.
// Cada run() manda 8 bits al 74HC595 de la shield: el chip cambia los pines 4, 8 y 12 decenas de miles de veces
// por segundo. Sirve para medir la velocidad del simulador en el peor caso.
#include <AFMotor_R4.h>

AF_DCMotor motor1(1);
AF_DCMotor motor2(2);

void avanzar(int velocidad) {
  motor1.setSpeed(constrain(velocidad, 0, 255));
  motor1.run(BACKWARD);
  motor2.setSpeed(constrain(velocidad, 0, 255));
  motor2.run(FORWARD);
}

void setup() {
  Serial.begin(9600);
}

void loop() {
  avanzar(255);
}
