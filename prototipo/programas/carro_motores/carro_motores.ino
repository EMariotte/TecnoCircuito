// Carro con la shield L293D Rev4 (librería AFMotor_R4, la del kit): motor izquierdo en M1 y derecho en M4.
// 2 s adelante a velocidad 200, 1 s quieto, 2 s atrás a velocidad 255 y 1 s quieto, una y otra vez.
// Sirve para probar el simulador (74HC595, PWM y puente H) y para medir en la placa real la caída del L293D.
#include <AFMotor_R4.h>

AF_DCMotor motor1(1);
AF_DCMotor motor4(4);

void mover(uint8_t sentido, uint8_t velocidad) {
  motor1.setSpeed(velocidad);
  motor4.setSpeed(velocidad);
  motor1.run(sentido);
  motor4.run(sentido);
}

void setup() {
  Serial.begin(9600);
  Serial.println("Carro listo");
}

void loop() {
  Serial.println("adelante 200");
  mover(FORWARD, 200);
  delay(2000);
  Serial.println("quieto");
  mover(RELEASE, 0);
  delay(1000);
  Serial.println("atras 255");
  mover(BACKWARD, 255);
  delay(2000);
  Serial.println("quieto");
  mover(RELEASE, 0);
  delay(1000);
}
