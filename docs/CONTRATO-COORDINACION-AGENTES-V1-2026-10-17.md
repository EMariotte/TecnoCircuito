# Contrato de coordinación entre Claude y Codex

Versión 1 · 17 de octubre de 2026 · Establecido por pedido de Efraín.

## 1. Propósito, alcance y autoridad

Este acuerdo organiza el trabajo de Claude y Codex en TecnoCircuito y su integración con TecnoBloques. Debe leerse al iniciar cada sesión en cualquiera de los dos repositorios. Se enlaza desde sus archivos de entrada AGENTS.md y CLAUDE.md. Las instrucciones expresas de Efraín prevalecen; una nueva asignación suya se registra sin pedir de nuevo autorización para lo ya acordado.

Es la fuente única de las reglas de coordinación entre agentes. No reemplaza CONTRATO.md, que define el intercambio de software, ni las instrucciones técnicas, de privacidad o validación de cada proyecto. El estado del producto permanece en CLAUDE.md; los hitos, en las bitácoras; la evidencia, en informes y pruebas. No copiar extensamente esos estados aquí.

El acuerdo rige mientras los agentes trabajan en sesiones activas. Leer o escribir un archivo no ejecuta al otro agente ni garantiza que una sesión que ya estaba abierta lo relea. No se ha configurado vigilancia en segundo plano. Si el repositorio hermano o este acuerdo no están accesibles, avisar de esa limitación y continuar el trabajo que no dependa de ellos; no inventar su contenido.

## 2. Roles y responsabilidades

| Participante | Responsabilidad habitual | Límites y traspaso |
|---|---|---|
| Efraín | Dirige el proyecto, prioriza, asigna tareas y decide sobre aceptación, laboratorio y publicación. | Sus decisiones y excepciones expresas se registran. Un agente no le atribuye una autorización que no recibió. |
| Claude | Programador de las tareas que tenga asignadas: analiza, implementa y añade las regresiones pertinentes. | Entrega cambios y evidencia a Codex. No declara por sí solo verificado un hallazgo que requiere revisión de Codex. |
| Codex (Sol) | Auditor y supervisor permanente: revisa, reproduce, prioriza, verifica correcciones y mantiene seguimiento. | En revisión, documenta y reproduce; no toma correcciones funcionales ajenas sin encargo. |
| Codex en Nano + expansión | Conserva la asignación expresa de implementación, pruebas y revisión de Nano/expansión, incluido AUD-05. | Identifica la revisión de trabajo propio. Una segunda revisión, si se requiere, se solicita y solo se acredita cuando ocurra. |
| Ambos | Detectan pasos omitidos, incoherencias, conflictos de archivos y falta de evidencia; informan a Efraín y proponen cómo subsanarlos. | No esperan a que Efraín recuerde el procedimiento. No confunden una advertencia con una exigencia de permiso nueva. |

El rol habitual no autoriza trabajo nuevo ilimitado. Antes de implementar se identifica la tarea autorizada y quién la toma. Para los hallazgos del 17 oct, el [traspaso](TRASPASO-CLAUDE-AUDITORIA-2026-10-17.md) contiene las prioridades: Claude para el registro y coordinación de AUD-03; Codex conserva Nano/AUD-05 y la verificación de cierres. El acuse de Claude sigue pendiente hasta que él lo escriba o Efraín comunique su respuesta.

## 3. Inicio obligatorio de cada sesión

Antes de editar o afirmar el estado de una tarea, cada agente debe:

1. Leer AGENTS.md, el estado de CLAUDE.md y este acuerdo en el repositorio de trabajo. Consultar el estado del hermano si la tarea afecta su integración.
2. Comprobar `git status --short`, revisión y rama; identificar trabajo existente y cambios desde la última entrega. No atribuir al otro agente un cambio por el mero hecho de estar en el árbol.
3. Leer las entradas nuevas de los [dos canales](#4-canales-md-y-acuse-de-recibo), buscar mensajes dirigidos a él y sus respuestas. Registrar su acuse real si corresponde. No releer toda la historia si puede identificar con seguridad la última entrada atendida.
4. Identificar ID/objetivo, responsable, último estado respaldado, archivos previstos y siguiente paso. Contrastar lo que pide Efraín con la evidencia disponible; señalar un paso omitido si afecta al encargo.
5. Decirle brevemente a Efraín el rol activo, qué va a hacer y cualquier dependencia relevante. Si ya existe autorización y el trabajo puede continuar, avanzar sin solicitar una confirmación repetida.

Una sesión que recibe un traspaso durante el trabajo lo relee antes de su siguiente edición, prueba compartida o entrega pertinente. Los archivos de inicio incorporan esta regla; no hay garantía técnica de lectura automática por el otro agente.

## 4. Canales .md y acuse de recibo

- [CODEX-A-CLAUDE.md](../coordinacion/CODEX-A-CLAUDE.md): Codex añade sus mensajes, entregas, consultas y verificaciones para Claude.
- [CLAUDE-A-CODEX.md](../coordinacion/CLAUDE-A-CODEX.md): Claude añade sus mensajes, acuses y entregas para Codex.

Cada agente escribe solo en su canal, añadiendo entradas al final. No edita mensajes pasados ni escribe un acuse en nombre del otro. Una rectificación es una entrada nueva que referencia la anterior. Efraín puede comunicar una respuesta recibida por otro medio; se registra como información transmitida por él, con su procedencia, sin fabricar una intervención del otro agente.

Cada entrada lleva un ID único por remitente y fecha (`COD-20261017-001`, `CLA-20261017-001`), autor, destinatario, fecha de Bogotá, tipo y tarea/IDs relacionados. Para evitar colisiones, revisar el último ID del canal antes de añadir la entrada.

Contenido mínimo de una entrega:

```text
ID / autor / destinatario / fecha
Tipo: entrega | acuse | consulta | corrección | verificación | aviso
Responde a: ID anterior, si aplica
Tarea o hallazgos:
Revisión Git y cambios sin commit:
Archivos tomados o modificados:
Objetivo y criterio de aceptación:
Evidencia: comandos, resultados, errores revisados y enlaces
Limitaciones o decisiones pendientes:
Siguiente responsable y acción:
```

No repetir informes completos en el canal: enlazarlos. Para un acuse basta el ID leído, comprensión/alcance y archivos que se toman, o el motivo por el que aún no puede tomarse la tarea. Un acuse de lectura no significa aceptar el diseño, haber implementado ni haber validado el resultado.

**Estados de comunicación:** preparado → publicado en .md → leído con acuse. Entregado por un canal directo se afirma solo si ocurrió. Publicar en .md nunca se describe como notificar dentro de VS Code o ejecutar al receptor.

Si hace falta una respuesta para tocar archivos compartidos o decidir un diseño, mantener pendiente ese trabajo dependiente. Se puede avanzar en análisis, lectura y otras tareas autorizadas independientes. El silencio o el paso del tiempo no son autorización ni acuse.

## 5. Estados del trabajo y condiciones para avanzar

| Estado | Evidencia necesaria | Quién lo registra |
|---|---|---|
| Pendiente o propuesto | Objetivo, alcance y criterio de aceptación; no implica trabajo empezado. | Autor de la propuesta o supervisor. |
| Tomado / en curso | Tarea autorizada y responsable identificados, archivos/ámbito declarados. | Agente que lo toma, en su canal. |
| Reproducido | Caso mínimo, revisión, pasos y resultado observado frente al esperado. | Quien lo comprobó. |
| Corregido, pendiente de verificación | Diff y regresiones pertinentes, resultados y limitaciones. | Implementador. |
| Verificado / cerrado | Revisión del diff, caso original y dependencias comprobados; conclusión enlazada. | Revisor asignado; normalmente Codex. |
| Pendiente de hardware, uso o evidencia externa | Lo que falta y quién puede aportarlo. | Ambos, conservando su distinción del software. |

No equiparar «prueba omitida» con «aprobada», «diagnóstico que reproduce el error» con «regresión que pasa», «corregido» con «verificado» ni «software aprobado» con «hardware validado». Si se omite una comprobación por una decisión expresa, registrar esa excepción y el límite de la conclusión; no inventar resultados.

El caso original puede quedar conservado como diagnóstico histórico que deja de reproducir el defecto. Se añaden regresiones de comportamiento correcto y verificaciones de cierre; no se reescribe el informe original para ocultar el problema.

## 6. Obligación de advertir pasos omitidos

**Los dos agentes deben advertir a Efraín cuando detecten un paso necesario que se haya omitido, tanto si la omisión la cometió un agente como si la secuencia solicitada por Efraín deja ese paso pendiente.** Informar con respeto y evidencia, sin culpas ni comprobaciones ceremoniales.

La advertencia se da en la conversación activa antes de la acción afectada. Si también afecta al otro agente, se añade un aviso en el canal propio. Formato breve recomendado:

> Falta [paso] para [objetivo]. Lo veo en [evidencia o ausencia comprobada]. Esto deja pendiente [consecuencia concreta]. Puedo completar [acción autorizada] ahora; [dependencia o decisión real, solo si existe].

| Omisión o inconsistencia detectada | Conducta de ambos agentes |
|---|---|
| Hay una entrega publicada sin acuse, pero se supone que el otro ya trabaja. | Aclarar publicado/leído/en curso; pedir o registrar el acuse real. No atribuir actividad. |
| Se intenta corregir un hallazgo sin comprender su reproducción o criterio. | Recuperar o producir el caso y el resultado esperado antes de dar la corrección por demostrada. |
| Dos agentes pretenden editar el mismo archivo, o cambió desde su lectura. | Avisar y coordinar el archivo, rama o worktree antes de escribir. Continuar lo independiente. |
| Se quiere cerrar porque el implementador dice que pasó la suite. | Revisar el diff y el caso original, regresión y dependencias. Mantener «pendiente de verificación» hasta comprobarlo. |
| El resultado corresponde a otra revisión, artefacto o condiciones. | Explicar el límite y ejecutar solo las comprobaciones que deban renovarse. |
| Cambia el contrato o la integración y falta actualizar consumidores/documentación. | Identificar lo afectado y completar las actualizaciones y pruebas pertinentes dentro del encargo. |
| Se pretende llevar al aula un comportamiento sin la evidencia física aplicable o usar registros sin comprobar su utilidad. | Señalar exactamente la validación que falta; no generalizar desde una suite ni atribuir una medida inexistente. Aplicar las decisiones vigentes de Efraín. |
| Se solicita publicar o compartir algo y falta una autorización o revisión realmente exigida. | Explicar su origen y el paso concreto pendiente. Aprovechar las autorizaciones ya otorgadas; no pedirlas de nuevo. |

**Resolver sin burocracia:** si es una omisión rutinaria subsanable dentro del trabajo autorizado, subsanarla y comunicar el resultado. Si depende de evidencia externa o de otro agente, continuar lo que no dependa de ella. Solo detener la acción dependiente cuando falte una condición necesaria. Este acuerdo no concede a un agente autoridad para reemplazar las decisiones de Efraín: si él cambia el orden o autoriza una excepción, registrar qué cambió y qué evidencia sigue faltando, con honestidad.

## 7. Archivos, pruebas y cierre de sesión

- Antes de escribir, comprobar que el archivo no cambió desde la lectura; preservar trabajo ajeno. Cada agente mantiene su canal. Coordinar explícitamente archivos compartidos; para trabajo simultáneo incompatible, usar ramas/worktrees acordados.
- Seleccionar pruebas por impacto. Conservar umbrales, cargador y condiciones de rendimiento. No ejecutar en paralelo suites que compitan por sus artefactos o por la medida de velocidad. Una prueba no ejecutada queda identificada como tal.
- Al entregar, enlazar revisión Git y cambios sin commit, diff, comandos/códigos de salida, errores de consola/archivos revisados, limitaciones y siguiente responsable. Evitar repetir pruebas aprobadas sin un cambio o duda que lo justifique.
- Actualizar el estado y anexar el hito a la bitácora del proyecto afectado. Si el cambio de reglas, contrato o coordinación afecta a ambos, dejar la referencia en ambos. No reescribir las entradas históricas.
- No incorporar datos de aprendices, registros reales, alias, material privado ni referencias comerciales excluidas a estos canales públicos. Usar evidencia sintética y enlaces técnicos apropiados.
- Commit, push, etiquetas, publicación y despliegue conservan sus autorizaciones expresas. El intercambio por .md no las otorga.

## 8. Comprobación del propio procedimiento

Estas situaciones deben poder resolverse leyendo el acuerdo y los canales:

1. Codex publica una entrega; Claude no ha abierto sesión. Resultado: publicada, acuse pendiente; ningún estado «Claude trabajando».
2. Claude entrega una corrección sin prueba del caso original. Resultado: corregido pendiente de verificación, advertencia del paso que falta y comprobación pertinente antes de cerrar.
3. Efraín pide avanzar a una tarea independiente mientras espera hardware. Resultado: se avanza y se conserva la validación física pendiente, sin bloquear trabajo ajeno a ella.
4. Efraín autoriza una excepción o reasigna una tarea. Resultado: ambos respetan la decisión y registran alcance, responsable y evidencia pendiente; no solicitan el mismo permiso otra vez.
5. Codex corrige Nano. Resultado: se declara trabajo propio; una revisión externa o de Claude solo se acredita cuando exista su entrega real.

La instalación de este acuerdo consiste en archivos y enlaces de inicio. No se afirma que Claude lo haya leído o aceptado personalmente hasta observar su acuse. Su vigencia procede del pedido de Efraín, no de un acuse inventado.
