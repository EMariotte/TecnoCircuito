# Comparación de procesos para Efraín, Claude y Codex

Investigación y recomendación de Codex (Sol) · 17 de octubre de 2026.

**Estado: propuesta para decidir.** Efraín autorizó investigar, explicar y comparar prácticas con el acuerdo .md actual. Este informe no reemplaza el [contrato de coordinación vigente](CONTRATO-COORDINACION-AGENTES.md), no configura herramientas y no autoriza commits, publicación o cambios funcionales.

## 1. Recomendación

Conservar los .md como instrucciones, memoria y evidencia; complementarlos con un flujo de tareas pequeñas, control del trabajo simultáneo, revisión de una versión exacta del código y comprobaciones automáticas por impacto. Empezar con un piloto local y adoptar Issues/PR de GitHub si su visibilidad y notificaciones compensan el mantenimiento adicional.

La combinación propuesta es: **flujo inspirado en Kanban + cambios pequeños y ramas cortas + implementador/revisor + ejemplos de aceptación y regresiones + automatización gradual**. Para decisiones de arquitectura, registrar brevemente el porqué. Reservar la orquestación automática de varios agentes para un problema de coordinación que ya se haya observado y pueda medirse.

Esta es una evaluación contextual. Las fuentes no permiten declarar un método universalmente superior para todas las personas, agentes y proyectos.

Flujo ilustrativo propuesto, conservando la excepción de implementación Nano a cargo de Codex:

```mermaid
flowchart LR
    A[Necesidad y prioridad de Efraín] --> B[Ejemplos y alcance]
    B --> C[Cambio pequeño y pruebas]
    C --> D[Revisión de la versión exacta]
    D -->|Ajustes necesarios| C
    D -->|Verificado| E[Integración y comprobación conjunta]
    E --> F[Uso y hardware cuando corresponda]
    F --> G[Entrega autorizada]
```

## 2. Cómo se investigó

Se compararon cuatro clases de información:

1. Guías originales de los responsables de Kanban, Scrum, Git y GitHub: definen prácticas y capacidades; no demuestran por sí solas resultados superiores.
2. Experiencia de ingeniería publicada por Google, OpenAI y Anthropic: útil para diseñar un proceso; tiene contexto y posibles intereses de proveedor.
3. Investigación empírica: DORA orienta sobre capacidades de entrega; METR aporta un experimento acotado y una actualización con limitaciones. No se trasladan sus efectos automáticamente a este equipo.
4. Inspección local: contrato, canales, estado Git, documentación de inicio y scripts de pruebas. Es evidencia de nuestra situación, no una medición comparativa de productividad.

Tres subagentes Codex investigaron prácticas de equipos, agentes y fricciones locales en lectura; el agente principal contrastó las páginas primarias y sintetizó las conclusiones. Se consultaron fuentes disponibles hasta el 17 oct 2026. No se utilizaron testimonios de redes sociales como fundamento de la recomendación.

## 3. Las prácticas cumplen funciones diferentes

| Pregunta | Práctica que ayuda | Aplicación propuesta |
|---|---|---|
| ¿Qué hacemos ahora y qué está esperando? | Kanban o Scrum | Flujo ligero y visible, adecuado a sesiones y laboratorio. |
| ¿Qué comportamiento queremos? | Ejemplos de aceptación / BDD | Acordar ejemplos concretos antes de implementar. |
| ¿Cómo escribimos y cambiamos código? | Pasos pequeños, regresiones y TDD cuando aporte | Corregir una conducta comprobable por vez. |
| ¿Cómo aislamos e integramos cambios? | Git, ramas cortas y worktrees cuando haya concurrencia | Revisar una versión concreta y evitar archivos compartidos en edición. |
| ¿Cómo detectamos errores? | Revisión y pruebas por capas | Combinar comprobaciones automáticas, criterio técnico y contraste físico. |
| ¿Cómo conservamos decisiones? | Instrucciones breves y registros de decisiones | Referencias estables y documentación selectiva. |
| ¿Cuándo añadir agentes? | Delegación y orquestación por necesidad | Paralelizar tareas independientes; mantener responsable de integración. |

Estas prácticas se pueden combinar. Un PR no reemplaza Kanban; un tablero no demuestra corrección; TDD no sustituye el laboratorio.

## 4. Explicación y evaluación

### 4.1 Kanban frente a Scrum

Kanban exige hacer explícito cómo fluye el trabajo, controlar el trabajo en curso y observar sus resultados. El tablero representa ese flujo; mantenerlo requiere actualizarlo. [Guía Kanban, mayo 2025](https://kanbanguides.org/the-kanban-guide/2025.5/).

**Adaptación propuesta:** una vista con pendiente, en curso, en revisión, verificado y pendiente de evidencia externa; una ficha por ID con responsable y siguiente acción. Durante el piloto, un cambio funcional activo reduce variables; ese límite es una hipótesis nuestra, no un número prescrito por la guía. Conviene a sesiones variables y dependencias de laboratorio. Evaluación: alta adecuación, mantenimiento bajo si evita estados duplicados.

Scrum organiza objetivos e incrementos mediante Sprints y eventos definidos. Adoptarlo completo implica una cadencia, responsabilidades y revisiones regulares. [Scrum Guide, noviembre 2020](https://scrumguides.org/scrum-guide.html).

**Evaluación contextual:** puede aportar si hay un calendario y equipo que lo sostenga. Hoy tomaría de él la revisión del resultado y la mejora periódica del proceso, sin adoptar todas sus ceremonias ni llamar Scrum a una selección parcial. Un agente adicional con nombre de Scrum Master no crea por sí solo esa capacidad.

### 4.2 Ejemplos de aceptación y BDD

BDD construye entendimiento compartido mediante ejemplos de comportamiento y los conecta con comprobaciones del sistema; va más allá de instalar una herramienta. [Cucumber: BDD](https://cucumber.io/docs/bdd/).

**Ejemplo local, AUD-02:** dado un registro activo, cuando falla la escritura, el trabajo del aprendiz continúa y la interfaz informa que el registro no se está guardando. Falta acordar detalles de recuperación, pero ya existe una conducta que observar.

**Evaluación:** muy útil para que Efraín valide la intención sin tener que leer todo el código. Es suficiente comenzar con ejemplos claros y las pruebas existentes; introducir Cucumber/Gherkin no es requisito. Riesgo: un ejemplo demasiado estrecho puede dejar casos importantes fuera; debe acompañarse de casos límite y conocimiento del dominio.

### 4.3 Cambios pequeños y revisión por cambio

Google recomienda cambios coherentes que puedan entenderse y revisarse como una unidad, incluyendo sus pruebas relacionadas y separando refactorizaciones amplias de correcciones de comportamiento. [Google: Small CLs](https://google.github.io/eng-practices/review/developer/small-cls.html).

**Aplicación:** una corrección de AUD-01 con sus regresiones, sin mezclarla con el aviso de disco de AUD-02. Si hay una dependencia real se documenta; no se divide artificialmente un arreglo hasta hacerlo incomprensible. Evaluación: prioridad muy alta para nuestro código y revisión. El costo es aprender a descomponer y revisar pronto.

GitHub Flow ofrece una unidad de colaboración: rama, cambio, pull request, revisión e integración. Un PR reúne el diff y la conversación sobre él. [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow).

**Adaptación:** adoptar esa disciplina incluso si al principio la entrega es local. Un expediente local puede reunir ID, base, patch exacto, archivos nuevos y evidencia; una plataforma de PR añade comentarios y controles configurables. La integración de código y la publicación al aula se deciden separadamente. Se conservan las autorizaciones vigentes de Efraín.

### 4.4 Aislamiento: ramas y worktrees

Una rama identifica una línea de cambios; un worktree permite trabajar en otro directorio asociado al repositorio. Cambiar de rama dentro de un solo directorio no crea dos áreas de trabajo concurrentes. [Manual oficial de Git: worktree](https://git-scm.com/docs/git-worktree).

**Aplicación:** usar un área por tarea cuando haya ediciones simultáneas o artefactos que puedan interferirse. Revisión e integración tendrán un responsable. Las ramas deben mantenerse pequeñas y cercanas a la base común; DORA describe esa integración frecuente como parte del desarrollo basado en trunk. [DORA: trunk-based development](https://dora.dev/capabilities/trunk-based-development/).

**Límites locales:** las pruebas comparten algunos nombres temporales, bundles y rutas al hermano. Un worktree no aísla CPU, puertos o carpetas temporales del sistema. Hay que preparar el entorno de ambos repositorios y serializar las medidas de rendimiento. Tampoco hay que abrir una rama permanente por agente: el cambio y su vida útil deben guiar su alcance. El soporte futuro de una versión congelada podría justificar una rama de mantenimiento específica.

### 4.5 Implementador y revisor

La revisión técnica debe examinar funcionamiento, diseño, complejidad, pruebas y documentación pertinente, y distinguir problemas reales de preferencias. [Google: qué revisar](https://google.github.io/eng-practices/review/reviewer/looking-for.html), [estándar de revisión](https://google.github.io/eng-practices/review/reviewer/standard.html).

**Aplicación:** Claude entrega una corrección pequeña y Codex intenta comprobar o refutar que satisface los requisitos; se revisa una versión exacta. Para Nano se declara que Codex implementa y se busca la segunda perspectiva adecuada al riesgo. Una errata de documentación no requiere una cadena de revisiones como la alimentación de la placa.

**Evaluación:** encaja muy bien con nuestro reparto. El segundo agente aporta otra perspectiva; puede compartir supuestos y no garantiza independencia del error. Las evaluaciones de agentes combinan verificadores de código, modelos y humanos, con límites diferentes. [Anthropic: evaluación de agentes](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).

### 4.6 Regresiones, TDD y automatización

TDD describe ciclos cortos donde se formula una prueba que falla, se implementa el comportamiento y se mejora el diseño manteniendo las pruebas. [Martin Fowler: Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html).

**Aplicación:** es apropiado para los fallos reproducidos y modelos con expectativas conocidas. La expectativa debe salir del contrato, cálculo u observación, no limitarse a copiar las constantes del código. No proponemos escribir pruebas que repitan la implementación ni hacer TDD obligatorio para cambios triviales de texto.

CI combina integración frecuente, construcción y comprobaciones automáticas para acortar la retroalimentación. Tener scripts manuales es una buena base, pero no equivale por sí solo a practicar integración continua. [DORA: CI](https://dora.dev/capabilities/continuous-integration/).

**Adopción propuesta:** empezar por grupos rápidos y reproducibles por cambio; separar las pruebas de integración, Electron y KiCad según impacto; reservar rendimiento para condiciones controladas y hardware para su práctica. Automatizar un test defectuoso replica su defecto: conservar las comprobaciones de errores de consola y de los propios comprobadores. Configurar CI requiere preparar dependencias y entornos; no basta añadir un archivo YAML.

### 4.7 Memoria, contexto y decisiones de arquitectura

OpenAI recomienda instrucciones prácticas y breves en AGENTS.md, con referencias específicas cuando hace falta más detalle. [OpenAI Docs: buenas prácticas](https://learn.chatgpt.com/guides/best-practices). Anthropic trata el contexto como un recurso que conviene seleccionar y recuperar según la tarea. [Context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).

**Aplicación:** conservar el contrato y los canales .md, reducir repeticiones de estado y hacer una entrada breve por sesión con rol, tarea, revisión y siguiente acción. La historia detallada se consulta cuando aporte. El acuerdo actual exige muchos enlaces de inicio; conviene comprobar su costo antes de añadir más instrucciones.

Para decisiones significativas, un ADR registra contexto, decisión y consecuencias, conservando las decisiones sustituidas. [Michael Nygard: ADR](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).

**Evaluación:** útil para asuntos como dónde vive la verdad de la tarea, evolución del contrato o política de registro. Nuestros documentos técnicos ya explican numerosas decisiones; habría que enlazarlos o adoptar el formato cuando falte el porqué, sin migrar toda la historia ni crear un ADR por cada arreglo.

### 4.8 Orquestación y varios agentes

Anthropic describe patrones de secuencia, orquestador/trabajadores y productor/evaluador, recomendando aumentar complejidad cuando aporte valor comprobable. [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents). La documentación de Codex aconseja especial cuidado con trabajo paralelo de escritura y reconoce su mayor consumo de tokens. [OpenAI Docs: subagentes](https://learn.chatgpt.com/docs/agent-configuration/subagents).

**Aplicación:** investigación y revisiones acotadas se pueden delegar en paralelo; la modificación de archivos relacionados exige aislamiento y responsable de integración. Para tareas pequeñas basta un agente y verificaciones pertinentes; en tareas importantes encaja implementador más revisor. Una arquitectura con coordinador puede servir más adelante si las esperas manuales lo justifican.

**Evaluación actual:** no invertiría primero en una plataforma de agentes. Los dos programas abiertos que tenemos no están conectados entre sí; los .md son un canal consultado por las sesiones, no un mecanismo para iniciarlas o comprobar su resultado automáticamente. Una futura conexión necesitaría comprobar capacidades, permisos, trazas y costo antes de sustituir el procedimiento.

## 5. Qué aporta y qué limita nuestro acuerdo actual

La inspección encontró ambos repositorios en main, con un worktree cada uno y cambios documentales sin commit. No se encontraron configuraciones de CI versionadas; no se inspeccionaron controles remotos. El canal de Claude continúa sin acuse real. Es una observación de esta sesión.

| Aspecto | Ya tenemos | Mejora que propongo |
|---|---|---|
| Roles y alcance | Reparto, excepción Nano y advertencias de pasos omitidos. | Conservarlos; aplicar rigor proporcional al cambio. |
| Memoria | Contrato, estado, bitácora, informes y canales. | Entradas breves y enlaces; reducir estados repetidos. |
| Comunicación | Publicación y acuse diferenciados. | Mantener el acuse para traspasos, sin exigirlo por cada acción rutinaria. |
| Trabajo pendiente | Estados definidos en texto, repartidos entre documentos. | Una ficha canónica por tarea y una vista que la enlace. |
| Código concurrente | Regla de coordinar archivos; un directorio actual por repo. | Aislamiento real cuando se edite en paralelo. |
| Revisión | Se exige base, diff, pruebas y cierre comprobado. | Preservar el contenido exacto revisado para que no cambie durante la revisión. |
| Verificación | Suite amplia y diagnósticos independientes. | Automatizar grupos apropiados y asociar evidencia a la versión. |
| Control de omisiones | Ambos deben avisar y resolver lo autorizado. | Automatizar lo mecánico; reservar el criterio humano/agente para lo que no puede decidir un script. |

**Diagnóstico:** el .md es adecuado como memoria y acuerdo; su eficacia depende de que alguien lo consulte y mantenga. Git, pruebas y controles de integración aportan mecanismos que una instrucción escrita no ejecuta. Tenerlos conectados evita depender exclusivamente de recordar el procedimiento.

## 6. Alternativas para decidir

Esta tabla evalúa paquetes de adopción; sus componentes no son excluyentes. Las valoraciones son juicio contextual, no resultados medidos ni una clasificación universal.

| Alternativa | Aporte respecto a hoy | Costo y limitación | Recomendación |
|---|---|---|---|
| A. Mantener solo el acuerdo .md y operación manual | Continuidad y mínimo cambio de herramientas. | Depende de lectura, acuses y comprobaciones manuales; concurrencia frágil. | Base válida mientras probamos mejoras; capacidad limitada para crecer. |
| B. .md breves + flujo visible + cambios pequeños + revisión + automatización gradual | Conecta intención, versión de código y evidencia; permite mejorar por etapas. | Requiere elegir una verdad de tareas, preparar el entorno y mantener checks. | **Mejor ajuste inicial para este equipo.** |
| C. Scrum completo con las mismas prácticas técnicas | Añade cadencia, objetivo periódico e inspección formal. | Demanda tiempo y constancia adicionales; no elimina necesidades técnicas. | Considerarlo cuando una cadencia regular aporte más que su costo. |
| D. Orquestación automática entre agentes | Puede automatizar reparto, activación y reintentos. | Mayor infraestructura, costo de ejecución y complejidad de diagnóstico. | Posponer hasta identificar una espera repetida que justifique automatizarla. |

**Herramienta de seguimiento:** si se prioriza trabajar local y sin depender de un servicio, una ficha Markdown por tarea y un índice corto son suficientes para el piloto. Si se prioriza visibilidad remota, comentarios por línea y notificaciones, Issues/PR de GitHub aportan una interfaz preparada. Adoptar uno como verdad operativa; los otros documentos lo enlazan. La plataforma no reemplaza pruebas ni aporta por sí sola un canal al Claude de VS Code.

## 7. Metodología de adopción propuesta

### Preparar la referencia

Revisar la documentación ya creada y elegir una fuente del estado de tareas. Antes de abrir worktrees, resolver cómo estará disponible esa documentación: actualmente parte está sin seguimiento y un worktree creado desde HEAD no la incorpora. Se puede preparar una transferencia controlada con hashes o un commit autorizado; **esta investigación no otorga ese permiso**.

No duplicar una tarea entre tablero local y GitHub. Definir una sola ficha con objetivo, aceptación, responsable, estado, base/cambio revisado, evidencia y siguiente acción. Mantener CLAUDE como resumen y los canales como traspasos, con enlaces.

### Pilotar un hallazgo completo

Usar AUD-01: es software comprobable con un preprocesador independiente y tiene alcance identificable. Claude conserva el papel de implementador y Codex el de revisor; todavía hace falta su acuse real.

1. Formular el objetivo y ejemplos de aceptación, incluidos casos límite y contenido que debe conservarse.
2. Declarar archivos, base y entorno; preparar aislamiento solo si aporta al modo de trabajo elegido.
3. Conservar el diagnóstico histórico y añadir regresiones correctas: continuaciones LF/CRLF, comentarios y literales prefijados con comillas/escapes. Contrastar con el compilador real.
4. Implementar una corrección coherente sin mezclar otros hallazgos; ejecutar los grupos pertinentes.
5. Entregar un commit autorizado o un expediente local con HEAD, patch, archivos nuevos y hashes. Si cambia el contenido, determinar qué verificación se renueva.
6. Revisar el diff, caso original y casos adicionales. Mantener «corregido, pendiente de verificación» hasta demostrar el cierre.
7. Integrar con las autorizaciones vigentes y comprobar el resultado integrado; conservar por separado aceptación de software, uso y hardware.

Probar después AUD-02 y AUD-04 con el mismo procedimiento, atendiendo que comparten archivos. El piloto no requiere lanzar los tres arreglos a la vez. Para las reglas de baja relevancia que produzcan ruido, reducir o eliminar la regla en la revisión del proceso; un [ejemplo de reglas de revisión de OpenAI](https://developers.openai.com/blog/custom-code-review-rules-for-codex) distingue orientación del agente y controles automatizados.

### Medir antes de automatizar más

Registrar tiempo hasta verificación, tiempo esperando revisión/traspaso, reaperturas, conflictos, fallos detectados tras integrar y esfuerzo de Efraín para coordinar. Separar tiempo activo de tiempo calendario; el trabajo del laboratorio puede generar espera legítima. Si hay datos de costo/tokens, medirlos; no inventarlos. La prueba de tres tareas permite aprender sobre el flujo, no demostrar causalidad estadística ni comparar el valor de modelos.

Una vez estable, automatizar los checks rápidos que hoy se repiten. Después incorporar integración/KiCad en entornos adecuados y estudiar si una plataforma de tareas o un mecanismo de activación reduce una espera real. No convertir cada paso del agente en un ritual verificable: comprobar que el resultado satisface los requisitos y conservar trazabilidad suficiente.

## 8. Qué sabemos sobre productividad con IA

METR estudió 16 desarrolladores y 246 tareas en repositorios maduros: con las herramientas ensayadas a comienzos de 2025 tardaron 19 % más. Los propios autores acotan el resultado a ese contexto. [Estudio original, 10 jul 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).

En febrero de 2026, METR explicó que su seguimiento no daba una señal fiable del efecto actual por selección de participantes/tareas y dificultades de medición, incluida concurrencia de agentes. [Actualización, 24 feb 2026](https://metr.org/blog/2026-02-24-uplift-update/).

La consecuencia para nuestra decisión es medir lo que aceptamos y mantenemos en nuestro proyecto. Ni el entusiasmo por los agentes ni una cifra de un ensayo distinto permiten prometer una aceleración. Es preferible evaluar tareas verificadas y el esfuerzo total, en vez de líneas generadas, volumen de mensajes o sensación de avance.

## 9. Decisión pendiente

Recomiendo **B, comenzando con piloto local**. Mantener el acuerdo vigente hasta que Efraín decida qué simplificar o añadir. Si el piloto confirma utilidad, formalizar solo los cambios que mejoraron el trabajo y elegir la plataforma de seguimiento. No se modificaron reglas operativas, canales, asignaciones, código o permisos de publicación por este informe.

## Decisión posterior de Efraín · 17 de octubre de 2026

Después de esta comparación, Efraín autorizó aplicar el piloto a **todo el proyecto en TecnoBloques y TecnoCircuito**, con investigación paralela y registro a cargo de Codex; TecnoRuta se incorporará posteriormente. El piloto deja de estar pendiente de decisión y no se limita a AUD-01. Implementación y reglas vigentes: [TecnoSuite](../../TecnoSuite/README.md), [proceso v2](../../TecnoSuite/PROCESO.md) y [registro de investigación](../../TecnoSuite/INVESTIGACION.md). Los apartados anteriores conservan la propuesta evaluada y sus fuentes, sin reescribir la historia.
