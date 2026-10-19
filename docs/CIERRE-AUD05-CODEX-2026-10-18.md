# Cierre verificado de AUD-05

18 oct 2026 · Codex · **AUD-05 verificada en el alcance de corte lógico de energía, pasos parciales y recuperación**, tras CLA-20261018-015. La implementación es de Claude. No se declara aprobado globalmente el candidato: AUD-03 sigue abierta y la suite completa tuvo un fallo T1/T2 que se conserva abajo.

## Caso original y discriminación

Revisado el diff de chip.js y nucleo.js sobre TC main `4fce9d820b27ec09130151bf801d330ab07a987a`. `chip.correr(ciclos, parar)` devuelve el control después de los modelos de cada ms cuando hay corte; `avanzar` atiende el corte y consume el resto, incluida la vuelta desde apagado, sin ejecutar instrucciones apagada. El cambio no redefine el modelo físico de alimentación.

Codex compiló chip/núcleo de ese HEAD **en memoria**, con las dependencias actuales, y ejecutó la prueba nueva de Claude: **4 fallos, exit 1**. Reproduce 184852 instrucciones sin energía en 16 ms y 5938 con pasos de 7919 ciclos; con 1 ms da cero. También falla igualdad del serial tras recuperar energía y del Uno con seis servos (8 frente a 110 reinicios en 3 s). No se restauraron fuentes ni se tomó ese exit 1 como aprobación.

La misma prueba sobre la entrega actual, `probar:corte`, pasó **7 OK** dentro de la suite propia de Codex:

- Nano con expansión roja, jack 9 V, carga 0,25 Ω, nano_adc67, semilla 77: corte lógico en ciclo 16000 y **cero instrucciones sin energía** con pasos de 16 ms, 1 ms y 7919 ciclos. Mismos serial, tiempo, energía y fallas.
- Retirada la carga, vuelve la alimentación: mismo serial de 15 líneas y mismo tiempo con los tres pasos.
- Uno con seis SG90: 110 reinicios y 111 arranques en 3 s para los tres pasos; mismo serial, energía y fallas.

La comparación admite hasta ocho ciclos finales por instrucciones indivisibles, sin acumular lo pedido como si fuera lo avanzado. Se revisó la modificación autorizada por Efraín a las 20:58: contar el arranque del Otto por «I» en lugar de exigir «Inicio» completo. La suite de núcleo observó 299 reinicios/300 arranques en 8 s; sigue declarada su discrepancia con el hardware (LAB-001). No se altera por ello la aceptación física.

## Comprobación adicional: fusible, apagado y vuelta

`node docs/verificar-aud03-aud05-2026-10-18.cjs fusible`: **exit 0**. Uno, parpadeo13, resistencia 4,7 Ω entre 5V y GND, límite USB, semilla 1; 13,5 s simulados en pasos de 256000, 16000 y 7919 ciclos, con fotos cada 16 ms. La instrumentación lee el estado apagada real en cada instrucción, en memoria.

Los tres recorridos notifican `fusible_usb`, recuperan alimentación y terminan en **216000001 ciclos**, un reinicio y **cero instrucciones apagada**, con serial, fallas y energía idénticos. La suite existente también pasó apertura, enfriamiento y pasos parciales. Esta prueba adicional cubre el límite de comparación del fusible que Claude había declarado.

## Regresión e integración ejecutadas

**Condiciones:** Windows; cargador Online (ACLineStatus=1, batería 69% antes de empezar), sin otras suites compitiendo durante los benchmarks. Build de desarrollo `0.1.0-dev`; sin compilar HEX ni regenerar fixtures. Datos sintéticos.

`npm.cmd run probar` **falló, exit 1**, al llegar a `probar_t1t2.py`: el pin flotante sin mano registró **3 cambios en 3 s**, esperado ≤2. Antes pasaron motor, núcleo/potencia, Nano, KiCad Node, contrato, fotos (17), corte (7), fixtures (17), KiCad real 10.0.3 para Uno/Nano y los recorridos Chromium anteriores. Benchmarks observados: parpadeo13 2,50x; pwm9 3,60x; potenciómetro 2,43x; motor 1,34x, sin relajar umbrales.

Se repitió **una vez** T1/T2 aisladamente: **17 OK, exit 0**. Se completaron individualmente los nueve recorridos restantes: protoboard 30, servo 19, carro 28, biblioteca 27, probador 11, Nano UI 85, enchufe 26, vistas 46 y registro 18, todos exit 0, sin errores de consola declarados en sus salidas. **No hubo un `npm run probar` completo con exit 0 por Codex.** El primer comando no tiene log integral persistido; se conserva su fallo textual y los resultados observados, sin inventar un total global de OK.

T1/T2 usa semilla aleatoria y el modelo permite cambios estocásticos sin mano (nucleo.js:34/589). La lógica flotante y el umbral de su prueba no se modificaron en estas entregas. La aleatoriedad es una explicación posible de la intermitencia, **no una causa aislada mediante comparación con HEAD**. Se encarga a Claude su diagnóstico; la repetición aprobada no borra el fallo ni acredita estabilidad. El cierre de AUD-05 se limita a la aceptación de corte/recuperación reproducida con semillas fijas y controles antes/después; no acredita una entrega global libre de fallos.

TecnoBloques construido con copia local: `npm.cmd run test:simulador` **53 OK**, `npm.cmd run test:registro-app` **72 OK**, ambos exit 0 y sin errores JS/consola; `npm.cmd run test:graficador` **28 OK**, exit 0. Se ejercitan compilación Arduino CLI, Uno/Nano, eventos y consumidor del serial. AUD-06 pasó en esta corrida, sin cerrar su intermitencia histórica.

## Versión, límites y cierre

TB main `2db4e758e3ae6f7be48e254c5484ce5184627c61`, limpio; TS main `d5c92142bdd5ee30c23d4b7636476e5df02c89ae`. AUD-05 sin commit, encima de AUD-03, ambas de Claude. Hashes de fuentes y pruebas coinciden antes/después:

- chip.js `a5378cae59d406cf4765d611b24ef80f1470bf53344df0054272f2b67af13956`.
- nucleo.js `12cac2d81ebfd051794b3bec779a6d257a1250d263b374225ffa54d3cd3c2119`.
- probar_corte.js `13a2e95de90c8f532e6961b1a711d98cde0c9355f9e52def444eaf42f8fa9fe5`.

[Manifiesto completo](aud0305-version-2026-10-18.json), [resultados conservados](aud0305-evidencia-2026-10-18.json), [instrumento](verificar-aud03-aud05-2026-10-18.cjs). Paquete local SHA256 `4f5d3553dbd1838514a1f843a303978a8005a3a4d7427efe9722afb6613d3cdf`; HTML de TecnoBloques `5e2b725de750588e4652f3e1d839808ce416b6d219a049db401b4bd6851eda3f`. Parche compartido revertido solo en copia temporal: documento exacto, package igual a CLA-014 tras normalizar saltos CRLF/LF, sin diferencia funcional añadida.

**Reproducido antes: sí. Software corregido: sí, alcance anterior. Integración local: sí. Hardware/aula: pendiente externo, no probado. Distribución instalada y candidato global: no acreditados.** No se reabre R1–R8 ni se cierra LAB-001/LAB-002. Contrato/esquemas sin cambios en estas entregas; Node de registro/disco y distribución completa TB no se repitieron por no cambiar esas fuentes.

Codex escribió informe, instrumento y trazabilidad, sin editar producto ni CLAUDE.md; son documentos propios revisados por su autor, sin atribuir segunda revisión independiente. Siguiente: Claude actualiza su memoria al cierre AUD-05, corrige AUD-03 residual y diagnostica el fallo de la prueba T1/T2. Sin commit, push, etiqueta ni publicación por Codex.
