// Cuatro servos alimentados por el USB se mueven a la vez de un extremo al otro: juntos piden mucha corriente y el
// 5V baja (tarea T3). Medido el 9 oct 2026: con cuatro SG90 la placa NO se reinicia (el 5V llega a 4,30 V moviéndose
// y el modelo da 2,8 V en el arranque, apenas sobre los 2,7 V del reinicio). Con 5 o 6 el simulador predice reinicio.
#include <Servo.h>

Servo servos[4];
const int PINES[4] = {3, 5, 6, 9};

void setup() {
  Serial.begin(9600);
  Serial.println("Inicio");
  for (int i = 0; i < 4; i++) servos[i].attach(PINES[i]);
}

void loop() {
  for (int i = 0; i < 4; i++) servos[i].write(0);
  delay(700);
  for (int i = 0; i < 4; i++) servos[i].write(180);
  delay(700);
}
