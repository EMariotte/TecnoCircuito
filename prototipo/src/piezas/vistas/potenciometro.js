// SPDX-License-Identifier: Apache-2.0
// © 2026 SENA – TecnoAcademia Tolima · Vista de potenciometro medida por TecnoDiseñador
// Registro de origen: TecnoDiseñador/componentes/potenciometro-16mm/registro-verificacion.md (2026-10-27)
// Archivo generado por «npm run vistas»: no se edita a mano.

export default {
 "pieza": "potenciometro",
 "variante": null,
 "prefijo": "td-potenciometro-",
 "marco": {
  "ancho": 17.78,
  "alto": 25.4
 },
 "pines": {
  "GND": {
   "x": 3.81,
   "y": 24.13
  },
  "SIG": {
   "x": 8.89,
   "y": 24.13
  },
  "VCC": {
   "x": 13.97,
   "y": 24.13
  }
 },
 "leds": {},
 "partes": {
  "eje": {
   "descripcion": "extremo del eje con su ranura, dibujado en la posición del medio",
   "pivote": {
    "x": 8.89,
    "y": 8.03
   },
   "angulo_dibujado": 0
  }
 },
 "origen": {
  "registro": "componentes/potenciometro-16mm/registro-verificacion.md",
  "generador": "generar_potenciometro_16mm.py",
  "fecha": "2026-10-27"
 },
 "diferencias": [
  "Las patas están a 5,0 mm (pie de rey): se dibujan a 5,08, dos pasos de la rejilla (el estándar manda).",
  "El kit no trae perilla: se dibuja el eje estriado con su ranura, que es lo que gira.",
  "El kit solo trae «B10K»; el simulador ofrece 1 kΩ, 10 kΩ y 100 kΩ (los componentes se comparten con Electrónica), así que el texto «B10K» es un data-valor que TecnoCircuito cambia."
 ],
 "cuerpo": "<defs><linearGradient id=\"td-potenciometro-gPcb\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#147CBD\"/><stop offset=\"1\" stop-color=\"#126AA6\"/></linearGradient><linearGradient id=\"td-potenciometro-gIc\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#44525B\"/><stop offset=\"1\" stop-color=\"#303B44\"/></linearGradient><linearGradient id=\"td-potenciometro-gMet\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#F8FCF9\"/><stop offset=\"0.55\" stop-color=\"#DCE6E5\"/><stop offset=\"1\" stop-color=\"#A8B9BD\"/></linearGradient><linearGradient id=\"td-potenciometro-gMetV\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#F8FCF9\"/><stop offset=\"0.5\" stop-color=\"#DCE6E5\"/><stop offset=\"1\" stop-color=\"#A8B9BD\"/></linearGradient><linearGradient id=\"td-potenciometro-gGold\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#F7D57A\"/><stop offset=\"0.55\" stop-color=\"#DDB04A\"/><stop offset=\"1\" stop-color=\"#A97C25\"/></linearGradient><linearGradient id=\"td-potenciometro-gPlast\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#3C454B\"/><stop offset=\"1\" stop-color=\"#20272C\"/></linearGradient><linearGradient id=\"td-potenciometro-gHole\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#05090B\"/><stop offset=\"1\" stop-color=\"#262E33\"/></linearGradient><linearGradient id=\"td-potenciometro-gBlk\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#3E464C\"/><stop offset=\"1\" stop-color=\"#22292E\"/></linearGradient><linearGradient id=\"td-potenciometro-gCer\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#E9D3AC\"/><stop offset=\"1\" stop-color=\"#C7A676\"/></linearGradient><linearGradient id=\"td-potenciometro-gLed\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#FFFFFF\"/><stop offset=\"1\" stop-color=\"#E4E1D6\"/></linearGradient><linearGradient id=\"td-potenciometro-gGlass\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#F4F7F7\"/><stop offset=\"1\" stop-color=\"#C9D1D3\"/></linearGradient><radialGradient id=\"td-potenciometro-gCan\" cx=\"0.36\" cy=\"0.32\" r=\"0.72\"><stop offset=\"0\" stop-color=\"#FFFFFF\"/><stop offset=\"0.45\" stop-color=\"#E3EAEA\"/><stop offset=\"1\" stop-color=\"#A8B9BD\"/></radialGradient><radialGradient id=\"td-potenciometro-gAct\" cx=\"0.38\" cy=\"0.34\" r=\"0.7\"><stop offset=\"0\" stop-color=\"#F49A86\"/><stop offset=\"1\" stop-color=\"#C9563F\"/></radialGradient></defs><rect x=\"2.71\" y=\"19.63\" width=\"2.2\" height=\"2\" rx=\"0.15\" fill=\"#C9CAB6\" stroke=\"#6F7D82\" stroke-width=\"0.1\"/><rect x=\"3.41\" y=\"21.63\" width=\"0.8\" height=\"3\" rx=\"0.15\" fill=\"#C9CAB6\" stroke=\"#6F7D82\" stroke-width=\"0.1\"/><circle data-contacto=\"GND\" cx=\"3.81\" cy=\"24.13\" r=\"0.34\" fill=\"#9AA8AC\" stroke=\"#6F7D82\" stroke-width=\"0.08\"/><rect x=\"7.79\" y=\"19.63\" width=\"2.2\" height=\"2\" rx=\"0.15\" fill=\"#C9CAB6\" stroke=\"#6F7D82\" stroke-width=\"0.1\"/><rect x=\"8.49\" y=\"21.63\" width=\"0.8\" height=\"3\" rx=\"0.15\" fill=\"#C9CAB6\" stroke=\"#6F7D82\" stroke-width=\"0.1\"/><circle data-contacto=\"SIG\" cx=\"8.89\" cy=\"24.13\" r=\"0.34\" fill=\"#9AA8AC\" stroke=\"#6F7D82\" stroke-width=\"0.08\"/><rect x=\"12.87\" y=\"19.63\" width=\"2.2\" height=\"2\" rx=\"0.15\" fill=\"#C9CAB6\" stroke=\"#6F7D82\" stroke-width=\"0.1\"/><rect x=\"13.57\" y=\"21.63\" width=\"0.8\" height=\"3\" rx=\"0.15\" fill=\"#C9CAB6\" stroke=\"#6F7D82\" stroke-width=\"0.1\"/><circle data-contacto=\"VCC\" cx=\"13.97\" cy=\"24.13\" r=\"0.34\" fill=\"#9AA8AC\" stroke=\"#6F7D82\" stroke-width=\"0.08\"/><circle cx=\"8.89\" cy=\"8.03\" r=\"7.9\" fill=\"#9A4B2A\" stroke=\"#1B2226\" stroke-width=\"0.36\"/><rect x=\"1.59\" y=\"8.03\" width=\"14.6\" height=\"12\" rx=\"0.6\" fill=\"#9A4B2A\" stroke=\"#1B2226\" stroke-width=\"0.36\"/><circle cx=\"8.89\" cy=\"8.03\" r=\"7.9\" fill=\"#9A4B2A\"/><rect x=\"1.59\" y=\"8.03\" width=\"14.6\" height=\"12\" rx=\"0.6\" fill=\"#9A4B2A\"/><circle cx=\"3.81\" cy=\"16.73\" r=\"1.25\" fill=\"#C9CAB6\" stroke=\"#6F7D82\" stroke-width=\"0.1\"/><circle cx=\"3.81\" cy=\"16.73\" r=\"0.5\" fill=\"#3A2A22\"/><circle cx=\"8.89\" cy=\"16.73\" r=\"1.25\" fill=\"#C9CAB6\" stroke=\"#6F7D82\" stroke-width=\"0.1\"/><circle cx=\"8.89\" cy=\"16.73\" r=\"0.5\" fill=\"#3A2A22\"/><circle cx=\"13.97\" cy=\"16.73\" r=\"1.25\" fill=\"#C9CAB6\" stroke=\"#6F7D82\" stroke-width=\"0.1\"/><circle cx=\"13.97\" cy=\"16.73\" r=\"0.5\" fill=\"#3A2A22\"/><g font-family=\"Arial, Helvetica, sans-serif\" font-weight=\"bold\"><text data-valor=\"ohmios\" x=\"8.89\" y=\"2.49\" font-size=\"2.4\" text-anchor=\"middle\" fill=\"#F6FCFC\">B10K</text></g><path d=\"M2.56 2.93 L15.21 2.93 A8.12 8.12 0 0 1 14.78 13.63 L3 13.63 A8.12 8.12 0 0 1 2.56 2.93Z\" fill=\"#A3ACA5\" stroke=\"#1B2226\" stroke-width=\"0.24\" stroke-linejoin=\"round\"/><path d=\"M8.89 2.93L8.89 3.53\" stroke=\"#000000\" stroke-width=\"0.12\" stroke-linecap=\"square\" fill=\"none\" opacity=\"0.3\"/><path d=\"M8.89 12.53L8.89 13.63\" stroke=\"#000000\" stroke-width=\"0.12\" stroke-linecap=\"square\" fill=\"none\" opacity=\"0.3\"/><path d=\"M3.17 3.38 A7.58 7.58 0 0 0 1.31 9.53\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"0.5\" stroke-linecap=\"round\" opacity=\"0.4\"/><rect x=\"1.74\" y=\"3.03\" width=\"1.9\" height=\"2.2\" rx=\"0.45\" fill=\"#C4BD86\" stroke=\"#1B2226\" stroke-width=\"0.12\"/><rect x=\"14.14\" y=\"3.03\" width=\"1.9\" height=\"2.2\" rx=\"0.45\" fill=\"#C4BD86\" stroke=\"#1B2226\" stroke-width=\"0.12\"/><rect x=\"1.74\" y=\"10.33\" width=\"1.9\" height=\"2.2\" rx=\"0.45\" fill=\"#C4BD86\" stroke=\"#1B2226\" stroke-width=\"0.12\"/><rect x=\"14.14\" y=\"10.33\" width=\"1.9\" height=\"2.2\" rx=\"0.45\" fill=\"#C4BD86\" stroke=\"#1B2226\" stroke-width=\"0.12\"/><circle cx=\"8.89\" cy=\"8.03\" r=\"4.5\" fill=\"#B4BCB6\" stroke=\"#1B2226\" stroke-width=\"0.2\"/><circle cx=\"8.89\" cy=\"8.03\" r=\"3.6\" fill=\"none\" stroke=\"#000000\" stroke-width=\"0.25\" opacity=\"0.3\"/><g data-parte=\"eje\"><circle cx=\"8.89\" cy=\"8.03\" r=\"3\" fill=\"#8E9890\" stroke=\"#1B2226\" stroke-width=\"0.18\"/><path d=\"M11.44 8.03L11.84 8.03\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M11.29 8.9L11.66 9.04\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M10.84 9.67L11.15 9.93\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M10.16 10.24L10.37 10.59\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M9.33 10.54L9.4 10.94\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M8.45 10.54L8.38 10.94\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M7.62 10.24L7.42 10.59\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M6.94 9.67L6.63 9.93\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M6.49 8.9L6.12 9.04\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M6.34 8.03L5.94 8.03\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M6.49 7.16L6.12 7.02\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M6.94 6.39L6.63 6.13\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M7.62 5.82L7.42 5.47\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M8.45 5.52L8.38 5.12\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M9.33 5.52L9.4 5.12\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M10.16 5.82L10.37 5.47\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M10.84 6.39L11.15 6.13\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><path d=\"M11.29 7.16L11.66 7.02\" stroke=\"#000000\" stroke-width=\"0.12\" opacity=\"0.35\"/><rect x=\"8.46\" y=\"5.18\" width=\"0.85\" height=\"5.7\" rx=\"0.15\" fill=\"#2A2E2C\"/><ellipse cx=\"7.64\" cy=\"6.73\" rx=\"0.55\" ry=\"0.35\" fill=\"#FFFFFF\" opacity=\"0.45\"/></g>"
};
