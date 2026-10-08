// Cuatro servos alimentados por el USB se mueven a la vez de un extremo al otro: juntos piden más corriente
// de la que da el puerto USB. Con la placa real, así se reinicia el Arduino (tarea T3).
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
