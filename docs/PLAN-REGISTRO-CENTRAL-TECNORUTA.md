# Registro central en TecnoRuta (borrador para decidir)

> Idea de Efraín del 16 de octubre de 2026, al terminar la fase 3 del registro de eventos. **Es un borrador para discutir:** no hay nada implementado ni decidido, salvo lo que ya está en CONTRATO.md, sección 6.1.
> Proyectos que toca: TecnoBloques (escribe y subiría los registros), TecnoCircuito (el esquema de eventos) y TecnoRuta (la base de datos central).

## 1. Qué se busca

Hoy cada PC del aula guarda sus registros en `%APPDATA%\TecnoBloques\registros\<equipo>-<fecha>.jsonl`, y el instructor los saca con «Exportar registros» a una USB. Con 15 o 20 PC por grupo y varios grupos por semana, eso es lento, se puede olvidar y deja copias sueltas en memorias USB.

La idea: **que los registros lleguen solos a una base central**, sin USB, sin perder líneas y sin abrir la puerta a datos personales.

## 2. Lo que ya está decidido y el plan respeta

- El registro identifica al **equipo** con un código, nunca al aprendiz (11 oct).
- **La tabla que une cada código con sus integrantes y su alias de TecnoRuta solo está en el PC de Efraín** (11 oct). La base central no la tendría.
- El registro está **apagado por defecto**; lo enciende el instructor por PC, con PIN (16 oct).
- El C++ va sin comentarios; el monitor serial no se registra; `proyecto_abierto` va sin el nombre del proyecto.
- El esquema `contrato/evento.schema.json` es la regla de cada línea.

## 3. Cómo funcionaría (propuesta)

```
 PC del aula (TecnoBloques)                         Supabase (suite TecnoRuta)
 ┌──────────────────────────────┐                   ┌──────────────────────────────────────┐
 │ registros\*.jsonl            │                   │ función registrar_eventos(token, …)  │
 │   (la fuente: no se borra)   │── HTTPS, cada ───►│   revisa el token del PC             │
 │ subidor (proceso principal)  │   pocos minutos   │   revisa cada línea (v, tipo, equipo)│
 │ subidos.json: hasta qué      │   y al cerrar     │   inserta; si el id ya está, lo salta│
 │   línea va cada archivo      │◄── cuántas entraron│                                      │
 └──────────────────────────────┘                   │ tabla eventos   (solo insertar)      │
   sin internet: espera y                           │ tabla equipos_pc (token por PC,      │
   reintenta; la USB sigue                          │   revocable)                         │
   funcionando                                      │ lectura: solo el rol investigador    │
                                                    └──────────────────────────────────────┘
```

- **El archivo local sigue siendo la fuente.** Subir es una copia. Si no hay internet, no se pierde nada, y «Exportar registros» sigue igual.
- **Cada PC se empareja una vez:** el instructor, con su PIN, pega un código de emparejamiento generado en TecnoRuta. El PC recibe un *token* propio que solo sirve para **insertar** (no para leer) y que se puede revocar. En el instalador **no va ninguna llave** de la base: cualquiera podría sacarla.
- **Sin duplicados:** cada línea lleva un `id` único desde que se escribe (un campo nuevo del sobre; agregar un campo no rompe el contrato). La base tiene `unique(id)`, así que reenviar es inofensivo.
- **La misma regla en los dos lados:** la base revisa lo mínimo (v, tipo, equipo, tamaño) y el análisis revisa con `evento.schema.json`. Opción: una Edge Function con el mismo esquema.
- **Nadie lee desde el aula.** La lectura queda para un rol «investigador» (Efraín y, si se aprueba, la universidad aliada), con exportación a `.jsonl` o CSV para el análisis.
- **El panel del instructor** mostraría «Subidos: 120 de 124 · última subida 10:32» y un botón «Subir ahora».

## 4. Decisiones para Efraín (con la recomendación de Claude)

1. **¿Un proyecto de Supabase aparte o dentro del de TecnoRuta?** Recomendación: **uno aparte, «TecnoRuta · investigación»**, dentro de la suite. Así las llaves, los permisos y el borrado al terminar el estudio no se mezclan con las notas de los aprendices. El plan gratuito permite dos proyectos activos (confirmarlo al crearlo).
2. **¿La base central cruza el código del equipo con los alias de TecnoRuta?** Recomendación: **no.** El cruce sigue fuera de línea, en tu PC, como se decidió el 11 oct. Si se cruzara en la base, un error de permisos expondría quién hizo qué.
3. **¿En qué región quedan los datos?** Son datos de investigación con menores (Ley 1581 de 2012). Hay que elegir la región del proyecto (Supabase ofrece São Paulo) y decirlo en el consentimiento: el envío a un servidor fuera de Colombia debe estar autorizado.
4. **¿Cuándo se sube?** Recomendación: al abrir la app, cada 5 minutos con el registro encendido y al cerrar. Nunca bloquea al aprendiz.
5. **¿Se puede borrar lo de un equipo?** Para el derecho de supresión: borrar por código de equipo desde el rol investigador.
6. **¿Qué pasa con los PC que ya registraron sin subir?** Al emparejar, el subidor manda lo que haya pendiente desde el principio.

## 5. Orden de trabajo (propuesta)

1. **Decisiones** de la sección 4, y revisar el consentimiento con lo de la nube.
2. **Contrato:** `id` en el sobre (TecnoBloques lo pone al escribir), y la sección 6.1 dice cómo se suben las líneas. Agregar no rompe el contrato 1.
3. **TecnoRuta:** el proyecto de Supabase de investigación, con su esquema SQL, RLS, la función `registrar_eventos` y el emparejamiento. Es una pieza pequeña e independiente de la fase 2 de TecnoRuta (la app de notas), y puede ir primero.
4. **TecnoBloques:** el subidor en el proceso principal, `subidos.json`, el emparejamiento en el panel del instructor y las pruebas: sin internet, reintento, duplicados, token revocado.
5. **Piloto** con el código de Efraín en uno o dos PC del aula, comparando lo que llegó a la base con los `.jsonl` locales, línea por línea.

## 6. Riesgos

- **Red del aula:** puede bloquear el acceso a Supabase. Hay que probarla antes; la USB queda como respaldo.
- **Un token robado** solo permite insertar líneas falsas con el código de un equipo. Se mitiga con la revocación, un límite por minuto y la revisión del análisis.
- **Volumen:** cada `simulacion_iniciada` lleva el circuito completo y cada `codigo_compilado` el C++. No está medido: hay que medirlo en el piloto y compararlo con el espacio del plan gratuito de Supabase (hoy, 500 MB de base de datos; confirmarlo al crear el proyecto).
- **Ética:** nada se sube con aprendices antes del aval del comité y del consentimiento que mencione la nube.
