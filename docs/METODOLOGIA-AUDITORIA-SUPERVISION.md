# Auditoría y supervisión permanente de TecnoCircuito

> Actualización operativa del 17 oct: la metodología técnica de auditoría se conserva; el flujo, roles, estados y coordinación vigentes están en [TecnoSuite/PROCESO.md](../../TecnoSuite/PROCESO.md). Las tareas y cierres se siguen en sus fichas, sin duplicar el tablero aquí. La sección del primer ciclo describe el momento de formular esta metodología; su ejecución posterior está en el informe fechado.

> **Roles permanentes (18 oct, Efraín):** Claude es el único implementador, también de Nano + expansión; Codex audita, supervisa y verifica. Donde este documento asigna implementación a Codex, rige esta nota.

Autor: Codex (Sol). Fecha: 17 de octubre de 2026.

**Encargo permanente y metodología acordados con Efraín el 17 de octubre:** auditar el estado real del proyecto y supervisar sus cambios, con evidencia y seguimiento entre sesiones. Efraín aceptó la propuesta y pidió iniciar el primer ciclo. Este documento define el procedimiento; los resultados de cada auditoría se acreditan en su propio informe.

## 1. Alcance y continuidad

El alcance principal es TecnoCircuito: T1, T2, T3, Uno R3, Nano clásico y Nano antiguo. Incluye su contrato e integración con TecnoBloques y la aceptación de vistas provenientes de TecnoDiseñador. Auditar otras funciones de los proyectos hermanos o el futuro servicio central requiere delimitar ese trabajo; una lectura de su documentación no acredita su implementación.

La supervisión se incorpora al inicio, desarrollo y cierre de las sesiones y a las entregas. El encargo persiste en AGENTS.md; el estado está en CLAUDE.md y la historia en BITACORA.md. No se ha configurado ejecución automática fuera de las sesiones.

Se conserva la asignación de implementación vigente: Codex para Nano + expansión; para otros trabajos, el responsable que indique Efraín. El encargo de auditoría permite revisar, reproducir y documentar, sin convertirlo en autorización general para modificar funciones, cambiar el contrato, publicar o desplegar servicios.

## 2. Roles necesarios

Son responsabilidades de revisión, no una obligación de abrir un agente por cada fila.

| Rol | Responsable propuesto | Responsabilidad y evidencia |
|---|---|---|
| Dirección y aceptación | Efraín | Decide prioridades, alcance, uso en aula y publicación; aporta el criterio pedagógico y las mediciones del laboratorio. |
| Auditor y supervisor | Codex | Mantiene el mapa de riesgos; revisa código, contrato y pruebas; reproduce defectos, verifica cierres y comunica límites. |
| Implementación | Agente asignado por Efraín | Corrige con alcance definido y entrega diff, revisión Git, pruebas y limitaciones. |
| Revisión eléctrica y numérica | Codex; contraste físico por Efraín | Comprueba redes, alimentación, tiempos, unidades y procedencia de parámetros; separa medición, ajuste y supuesto. |
| Pruebas e integración | Codex como revisor | Sigue un caso desde bloques y compilación hasta Worker, circuito, interfaz, archivos y registro; comprueba también los propios comprobadores. |
| Experiencia de uso y aprendizaje | Codex en inspección; Efraín y aprendices en uso observado | Evalúa tareas T1–T3, recuperación de errores, claridad de mensajes, teclado, legibilidad y uso en el PC del aula. |
| Datos y entrega reproducible | Codex en revisión técnica; Efraín en decisiones de uso | Revisa minimización del registro, límites de IPC/archivos, licencias, versión distribuida y funcionamiento sin internet. |

Cuando Codex implemente, su propia revisión se identificará como tal. Los casos esperados se obtendrán del contrato, cálculos independientes o medidas; no solo de las constantes del código. Para cambios de riesgo alto, se recomendará una segunda revisión independiente, sin atribuirla a Claude u otro agente hasta que ocurra. Si se delega trabajo autorizado, se asignarán archivos o worktrees separados y se revisará la integración.

## 3. Ciclo de trabajo

1. **Establecer la referencia.** Leer instrucciones y estado; comprobar Git y trabajo existente; identificar revisiones de ambos proyectos, artefacto usado y alcance de la sesión. Distinguir la copia local de desarrollo, la etiqueta distribuida y el instalador probado.
2. **Elegir por riesgo.** Priorizar consecuencias: pérdida o exposición de datos, resultados eléctricos o temporales erróneos, incompatibilidad, bloqueo del trabajo y confusión pedagógica. Considerar también frecuencia y dificultad de detección. Separar gravedad de urgencia.
3. **Formular la comprobación.** Para cada comportamiento relevante: condición, entrada, resultado esperado, fuente de ese resultado y criterio de aceptación. Leer implementación y pruebas, buscando un supuesto compartido que pueda hacerlas equivocarse juntas.
4. **Comprobar primero lo afectado.** Ejecutar las pruebas apropiadas y añadir casos independientes cuando haya un vacío. Guardar reproducción mínima si falla. Ampliar al núcleo, Worker, navegador, integración o hardware según dependencias.
5. **Entregar al implementador.** Hallazgo con ID, gravedad, archivo/línea, revisión Git, pasos, esperado/observado, impacto, evidencia y criterio de cierre. Un resultado esperado que depende de una medida pendiente se registra como limitación, no como defecto demostrado del código.
6. **Verificar la corrección.** Revisar el diff y repetir el caso original, su regresión y las áreas afectadas. Distinguir corregido de verificado. Si cambia el código después de una ejecución, determinar qué evidencia debe repetirse.
7. **Cerrar la sesión.** Informar qué se sabe, qué falló, qué no se ejecutó y cuál es la próxima acción con responsable. Actualizar los documentos de estado y anexar la evidencia nueva a la bitácora, conservando los informes históricos.

R1–R8 permanecen cerrados en el alcance verificado de octubre 11. Un comportamiento nuevo se registra aparte; solo una reproducción pertinente justifica reabrir un cierre.

## 4. Matriz de pruebas

Las pruebas indicadas existen en parte. Los casos adicionales son objetivos de revisión: su presencia y calidad se comprobarán en la auditoría inicial.

| Área | Comprobaciones necesarias | Base existente |
|---|---|---|
| Motor eléctrico y conexiones | Casos con solución independiente; KCL y unidades; circuito abierto y corto; conexiones equivalentes por cable, protoboard o shield; entradas flotantes y convergencia. | `probar:motor`, fixtures y verificadores de correcciones. |
| Chip, reloj y potencia | Mismo tiempo simulado con pasos completos y parciales; pausa, reinicio y placa apagada; GPIO/PWM/ADC; conflicto Servo/PWM; corriente por pin, puerto y chip; carga USB, caída y recuperación; ideal/realista y claves individuales. | `probar:nucleo`, `probar:nano`, pruebas de potencia y Worker en navegador. |
| Familia Nano y expansión | Uno/Nano/Nano antiguo; A6/A7; una sola MCU; aliases heredados; cambio de placa; VIN/jack sin fuente; combinaciones de alimentación y ambas variantes visuales. | `probar:nano`, `probar_nano_ui.py`, contrato e implementación Nano. |
| Contrato y archivos | Válidos, malformados, truncados y límites; HEX con longitudes/checksum; compatibilidad de proyectos anteriores y extensiones; abrir–guardar–reabrir sin pérdida; placa fuera de la API pública. | `probar:contrato`, fixtures y pruebas de TecnoBloques. |
| Interfaz y uso | Recorridos completos T1–T3; agregar, conectar, mover y borrar; imán y protoboard; mediciones y fichas; mensajes de error y recuperación; teclado y legibilidad en aula. | Recorridos Chromium de la suite, `test:ui` y observación con Efraín. |
| Integración y rendimiento | Bloques → C++ → HEX → Worker → medición/serial; guardar y reabrir; CSV y gráfico; repetir corridas; cambios rápidos de pines; errores JS/Worker/compilador; comparar artefacto local y versión empaquetada antes de entregar. | `test:simulador`, `test:graficador`, `npm test`, pruebas de app y empaquetada del hermano. |
| Registro y privacidad | Secuencia y contenido del `.jsonl`, corridas y tiempos; pausa/reanudación; fallas sin contaminación entre corridas; cambio de equipo y reinicio de app; apagado por defecto; PIN y límites IPC; rutas y colisiones de nombres; errores de escritura/exportación; exclusión de datos acordada y C++ con comillas/escapes. Usar datos sintéticos. | `probar_registro.py`, esquema de eventos, `test:registro` y `test:registro-app`. |
| KiCad y vistas | Redes, pads, orientación, geometría y montaje; pines físicos frente a aliases; SVG sin cambiar conectividad; importación con KiCad real y revisión del informe DRC según alcance; Nano como módulo y expansión como diseño de referencia. | `probar:kicad`, pruebas PCB Uno/Nano y `probar_vistas.py`. |
| Validación física | Mismo montaje y programa; alimentación, instrumento, escala y resolución documentados; repetición y límites de generalización; medidas adicionales a las usadas para ajustar el modelo. | Registros de `validacion/` y prácticas de `prototipo/LEEME.md`. |
| Distribución y licencias | IIFE y Worker embebido, sin Node ni dependencia de red al ejecutar; recursos del instalador, versiones y avisos; exclusión de material privado o ajeno del paquete público. | Build, contrato, `LICENSE`, `NOTICE`, contenido del paquete y prueba instalada sin red. |

También se auditan los comprobadores: introducir errores controlados en copias o memoria para verificar que una excepción JS, un archivo ausente o una salida incorrecta produzcan un fallo visible y el estado de salida correspondiente. El precedente es R8; una suite que devuelve cero no basta si sus logs muestran errores.

En pruebas numéricas se fijarán límites antes de observar el resultado; no se ajustarán tolerancias para aprobar. Aleatoriedad o ruido deberán tener semilla reproducible cuando corresponda. El rendimiento se medirá con cargador, condiciones registradas y el criterio vigente; no se confunde velocidad de ejecución con exactitud del tiempo simulado.

## 5. Frecuencia para trabajar con eficiencia

| Momento | Comprobación |
|---|---|
| Cada sesión | Estado Git, cambios desde la última revisión, pendientes prioritarios y pruebas pertinentes al alcance. |
| Cada corrección | Reproducción original, regresión útil y sistemas afectados. |
| Cambio transversal | Ampliar a todos los consumidores: especialmente conexiones, reloj, energía, Worker, contrato y eventos. |
| Hito integrado o candidato de versión | Suite completa de TecnoCircuito; KiCad ejecutado; integración y pruebas pertinentes de TecnoBloques; errores de consola y archivos producidos revisados. |
| Antes del aula o del estudio | Evidencia física y de uso aplicable, versión exacta y pendientes conocidos revisados por Efraín. |
| Nueva evidencia física o repetición de un fallo | Revisar el riesgo y la validez de las conclusiones anteriores sobre ese comportamiento. |

Reutilizar evidencia solo cuando la revisión, el artefacto, las condiciones y las dependencias no hayan cambiado de manera relevante. No repetir toda la suite tras un cambio de redacción, ni omitir la integración cuando cambia el contrato. No escribir pruebas que solo repitan la implementación o verifiquen cambios documentales triviales.

En la auditoría inicial se obtendrá una referencia completa actual y se medirá el costo de los grupos. Después se seleccionarán pruebas por dependencias y riesgo; la cantidad total de aserciones será un dato secundario.

## 6. Evidencia y cierre

Cada informe indicará fecha, autor, alcance, revisiones Git, archivos modificados sin commit, comando, entorno, resultado y ubicación de evidencias no privadas. Diferenciará explícitamente **ejecutado y aprobado**, **fallido**, **no ejecutado** y **bloqueado por entorno o evidencia externa**. No ejecutado nunca contará como aprobado.

Cada comportamiento tendrá dimensiones separadas: revisión del código, prueba de software, integración, validación física y uso observado. No habrá un único «validado» que confunda esas dimensiones.

Un hallazgo seguirá esta secuencia: **abierto → reproducido → corregido, pendiente de verificación → cerrado con evidencia**. Una limitación física puede seguir pendiente aunque la corrección de software esté cerrada. Una prueba fallida que describe el defecto es una reproducción, no una regresión aprobada.

Para magnitudes físicas se conservan los criterios acordados: ±5 % en voltaje, ±10 % en corriente, ±1 % en tiempos y serial idéntico. Error relativo respecto a la medida; se informan aceptación estricta y aceptación con el margen instrumental U por separado. La expresión U = 0,005 × |lectura| + 0,02 V solo corresponde al UT33B+ en la escala de 20 V adoptada. Para medida cero se informa diferencia absoluta y se define el criterio apropiado antes de comparar; no se divide por cero.

No se generaliza un LED rojo a otros colores, un motor a toda la familia ni el ajuste a la validación independiente. Una huella importada o un DRC ejecutado no acreditan la tarjeta comercial ni una PCB lista para fabricar.

El informe de cada ciclo será breve: hallazgos priorizados, evidencia, alcance que sí queda respaldado, pendientes y siguiente responsable. Las reproducciones y cierres detallados irán en informes con ID; CLAUDE.md enlazará el estado actual y BITACORA.md conservará los hitos. AGENTS.md solo conservará reglas y asignaciones.

## 7. Primer ciclo recomendado

La referencia documental consultada es `390ef34a119df754a06ff35c96e2286800819f21`, con árbol sin cambios al inicio. Se leyeron AGENTS.md, CLAUDE.md, los scripts de pruebas de ambos proyectos, secciones del contrato, historia reciente y registros físicos relacionados. **En esta sesión de metodología no se ejecutó la suite ni se auditó exhaustivamente el código.** Los totales históricos del 16 oct no son resultados nuevos de Codex.

Orden recomendado:

1. **Referencia actual e inventario de evidencia.** Registrar revisiones/artefactos de ambos proyectos, comprobar herramientas y ejecutar la referencia completa; conciliar descripciones de versión o validación que se contradigan en la documentación, sin cambiar las medidas.
2. **Registro de eventos.** Revisar las fases implementadas y comprobar si permite reconstruir una sesión; conservar la prueba humana de fase 4 y la revisión de fase 5 como entregables distintos. Es el cambio más reciente y afecta la utilidad de los datos del estudio.
3. **Familia Nano y cambios posteriores.** Revisar alimentación, conexiones, vistas e integración desde el cierre anterior, con atención a supuestos heredados y exportación KiCad. Los pendientes físicos permanecen explícitos.
4. **T3 y su contraste físico.** Separar diferencias registradas de hipótesis: M1, motor bloqueado y arranque de servos. Preparar comprobaciones de software y una siguiente medición que permita distinguir causas; Efraín realiza la práctica física.
5. **Uso y distribución.** Recorridos T1–T3, recuperación de errores y desempeño en el PC del aula; versión empaquetada y sin red antes de una entrega autorizada.

El registro del 16 oct documenta que el Uno real no reinició con 5/6 SG90 mientras el modelo sí, que la polaridad observada de M1 difiere de la representación y que falta la tensión de batería durante bloqueo para separar causas. Son prioridades de contraste, no hallazgos nuevos reproducidos hoy. La centralización futura queda para una revisión específica cuando se decida su alcance.
