"""Registra exclusivamente informes, fichas, canal propio e historia de la auditoría."""
import datetime as dt
import hashlib
import json
import pathlib
import re
import subprocess

ROOT = pathlib.Path(__file__).resolve().parents[1]
SUITE = ROOT.parent / 'TecnoSuite'
OUT = ROOT / 'docs' / 'reg005-auditoria-2026-10-22'
BASE = json.loads((OUT / 'inicio-version.json').read_text(encoding='utf-8'))
STAMP = dt.datetime.now(dt.timezone.utc).astimezone(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
REPORT = '../../TecnoCircuito/docs/AUDITORIA-REG005-CODEX-2026-10-22.md'

tasks = [
 ('AUD-15','Conservar la identidad de piezas al comparar corridas',['TecnoBloques','TecnoCircuito'],'alta','R01','Una baja y alta con el mismo id y tipo acredita corrección de la pieza anterior.','Mantener generaciones/continuidad de pieza; probar reemplazo, mismo id/tipo, tipo distinto y controles, en comparación y resumen.'),
 ('AUD-16','Conservar integridad de corrida tras un fallo de foto',['TecnoCircuito','TecnoBloques'],'alta','R02','Se pierden fallas antes de RESET y el cierre dice confirmado true; la excepción de una foto periódica también corta la programación del reloj.','Invalidar integridad ante cualquier foto fallida hasta la corrida nueva; proteger la vuelta periódica y comprobar entrega o exclusión de comparaciones en el lector.'),
 ('AUD-17','Congelar los datos de subida antes de la espera serial',['TecnoBloques'],'media','R03','Durante la desconexión serial se cambia a Nano: el IPC usa Nano y programa_subido registra Uno.','Una sola captura de código, placa/FQBN, puerto y turno; probar cambios antes de enviar y durante subida, con control sin cambios y sin hardware real.'),
 ('AUD-18','Coordinar apagado y cambios pendientes de equipo',['TecnoBloques'],'media','R04','Al apagar queda un equipo con sesión cuyo inicio no llegó al disco; reencender y confirmar el mismo código registra actividad huérfana.','Coordinar todas las transiciones de registro/equipo; probar los dos órdenes, cola, fallo de apagado y reencendido con inicio nuevo.'),
 ('AUD-19','Conservar el proyecto y su C++ durante aperturas sucesivas o fallidas',['TecnoBloques'],'alta','R05 y R07','El temporizador de A introduce su texto en B; abrir un archivo con bloque desconocido restaura el proyecto anterior sin el C++ manual.','Generación/cancelación de carga y respaldo anterior a toda mutación. Probar A/B/C, texto y bloques, rechazo de apertura, igualdad del programa, circuito y autoguardado.'),
 ('AUD-20','Actualizar los contadores de cola y pérdida de disco en vivo',['TecnoBloques'],'media','R06','El último aviso mantiene pendientes 1 y perdidos 0 cuando el estado ya tiene 5000 y 2.','Publicar cambios en contadores, con agrupación si corresponde; panel abierto, saturación y recuperación parcial/completa.'),
 ('AUD-21','Evitar atribuir al destino errores de lectura de origen',['TecnoBloques'],'normal','R09','Un original que abre pero falla al leer con EIO se informa como error de la USB; la copia sí se marca incompleta.','Identificar la etapa de copia o dar un mensaje neutro si el lado es indeterminado. Probar origen no abrible, lectura fallida, destino lleno y control; acordar cualquier cambio de formato.'),
 ('AUD-22','Analizar los mismos bytes que se verificaron con el manifiesto',['TecnoBloques'],'alta','R10','La lectura para hash ve una corrida con falla y la lectura para análisis otra sin ella: cero problemas y falsa corrección.','Un mismo buffer para hash/tamaño/decodificación/análisis. Probar copia íntegra, alteración previa y reemplazo entre comprobación y uso. Es integridad nueva, no solo el rendimiento aplazado de TB-14.'),
 ('AUD-23','Comprobar la pausa sin confundir fotos anteriores recibidas tarde',['TecnoCircuito'],'media','R08','La suite falla en pausa 501 a 523 ms; la repetición pasa. Un control demuestra delta 22 con cero ciclos ejecutados durante la pausa.','Comprobar el reloj del Worker tras procesar pausa y separar la recepción de fotos anteriores. No ampliar el umbral de 20 para aprobar.'),
]

def check(path):
    repo = path.relative_to(ROOT.parent).parts[0]
    rel = path.relative_to(ROOT.parent / repo).as_posix()
    expected = BASE['repos'][repo]['sha256'].get(rel)
    if not expected or hashlib.sha256(path.read_bytes()).hexdigest() != expected:
        raise RuntimeError('Releer antes de editar: '+str(path))

def append(path, text):
    with path.open('a',encoding='utf-8',newline='\n') as f: f.write('\n\n'+text.rstrip()+'\n')

def metadata(path, change):
    text=path.read_text(encoding='utf-8')
    m=re.search(r'```json\s*\n(.*?)\n```',text,re.S)
    data=json.loads(m[1]);change(data)
    path.write_text(text[:m.start(1)]+json.dumps(data,ensure_ascii=False,indent=2)+text[m.end(1):],encoding='utf-8',newline='\n')

existing = [SUITE/'tareas/REG-005.md',SUITE/'tareas/INV-001.md',SUITE/'INVESTIGACION.md',SUITE/'registro/SESIONES.md',SUITE/'canales/CODEX-A-CLAUDE.md',ROOT/'BITACORA.md',ROOT.parent/'TecnoBloques/BITACORA.md']
for p in existing: check(p)
for ident,*_ in tasks:
    if (SUITE/'tareas'/f'{ident}.md').exists(): raise RuntimeError('ID ocupado: '+ident)
if 'COD-20261022-001' in (SUITE/'canales/CODEX-A-CLAUDE.md').read_text(encoding='utf-8'): raise RuntimeError('ID de canal ocupado')

for ident,title,projects,priority,findings,observed,acceptance in tasks:
    data={'id':ident,'titulo':title,'proyectos':projects,'tipo':'codigo','estado':'pendiente','prioridad':priority,'responsable':'Claude','revisor':'Codex','creada':'2026-10-22','actualizada':'2026-10-22','archivos_reservados':[],'cierre':None}
    body=f'''# {ident} · {title}

```json
{json.dumps(data,ensure_ascii=False,indent=2)}
```

## Alcance, aceptación e historial

**REG-005 / {findings}.** {observed}

**Posible solución y aceptación:** {acceptance}

Dimensiones: reproducido con datos sintéticos; diagnóstico fallido, no regresión aprobada. Software nominal/integración ejecutados en la auditoría; defecto sin corrección ni cierre verificado. Sin validación física ni de uso. Bases main TC cfeee9b / TB 1c6c660 / TS a3c8ca2 más entrega CLA-20261022-002 sin commit; hashes y límites en el [informe]({REPORT}).

Siguiente: Efraín decide prioridad/lote; Claude reproduce, toma y reserva antes de implementar. Codex verifica después el caso original, controles y dependencias. No se supone inicio ni se reabren automáticamente cierres históricos.

{STAMP} · Codex: ficha creada por la auditoría completa de REG-005 solicitada por Efraín. Evidencia, fuente y criterio en el informe; sin producto modificado.
'''
    (SUITE/'tareas'/f'{ident}.md').write_text(body,encoding='utf-8',newline='\n')

metadata(SUITE/'tareas/REG-005.md',lambda d:d.update(estado='pendiente',actualizada='2026-10-22',archivos_reservados=[],cierre=None))
append(SUITE/'tareas/REG-005.md',f'''{STAMP} · Codex: auditoría completa de CLA-20261022-002 por pedido de Efraín, **devuelta**: 9 defectos funcionales, 1 de comprobación y 2 incoherencias documentales; 15 riesgos/límites con tratamiento separado. Seguimiento AUD-15–AUD-23 (R05/R07 comparten AUD-19). TC completo: 1251 OK y 1 falla de pausa; repetición aislada 18/18, ambos conservados. TB registro 204, historia 198, preprocesador 74/2000 aleatorios, Electron registro 115, simulador 53, graficador 28 y generales aprobados con errores revisados. Instrumentos históricos 14/14 y 23/23; propios Node 6 incumplimientos/9 escenarios y Electron 4/5, sin errores JS. Sin visto bueno del conjunto; fuentes y memorias de Claude preservadas; no se reabren cierres históricos ni se dan por eliminados los riesgos aplazados. D01/D02 permanecen en esta ficha. Siguiente: Efraín decide lote/prioridad, Claude implementa. [Informe]({REPORT}).''')

metadata(SUITE/'tareas/INV-001.md',lambda d:d.update(actualizada='2026-10-22'))
append(SUITE/'tareas/INV-001.md',f'''{STAMP} · Codex: SES-20261022-001 registra auditoría completa de REG-005 autorizada por Efraín, una devolución del lote (no una por variante), AUD-15–AUD-23 pendientes, cero cierres/reaperturas de fichas históricas. Acumulado: 21 devoluciones, 20 funcionales; no se mide frecuencia natural ni esfuerzo. Minutos de coordinación pendientes de declaración. Opinión CLA-20261022-001 leída, sus propuestas siguen para decisión de Efraín; PROCESO v3 sin cambios. [Informe]({REPORT}).''')

append(SUITE/'registro/SESIONES.md',f'''### SES-20261022-001 · {STAMP}, auditoría completa REG-005

- Encargo de Efraín: auditoría completa, errores/riesgos y soluciones. REG-005 devuelta: 9 defectos funcionales, 1 de prueba y 2 documentales; 15 riesgos separados, AUD-15–AUD-23 pendientes. [Informe]({REPORT}).
- TC completo fallido (1251 OK/1 falla de pausa), repetición aislada 18/18; KiCad real ejecutado. TB registro 204, historia 198, preprocesador 74 con 2000 aleatorios, Electron 115, simulador 53, graficador 28 y generales aprobados/errores revisados; históricos 14/14 y 23/23. Diagnósticos propios fallidos: Node 6/9 y Electron 4/5, con controles y cero errores JS.
- Una devolución nueva, 21 acumuladas/20 funcionales; cero cierres y cero reaperturas de fichas históricas. Datos sintéticos, fuentes/memorias preservadas; sin instalador, USB física, hardware o aula; sin medir frecuencia, ahorro, espera/coste ni esfuerzo activo.
- Solo auditoría, reproducciones y documentación/coordinación; sin implementación, commit/push o publicación. Opinión de Claude CLA-20261022-001 leída; Efraín decide sus propuestas, PROCESO v3 intacto. Informe/instrumentos propios revisados por su autor, sin segunda revisión independiente.
- Minutos de coordinación de Efraín pendientes de declaración; los 10 del 21 oct no se trasladan a esta sesión.
''')

append(SUITE/'INVESTIGACION.md',f'''## Seguimiento · {STAMP}, auditoría completa de REG-005

Por pedido explícito de Efraín se hizo una auditoría completa de CLA-20261022-002: 9 defectos funcionales, 1 de comprobación y 2 incoherencias documentales; 15 riesgos/límites separados. REG-005 devuelta, AUD-15–AUD-23 pendientes para priorización, sin inicio atribuido a Claude. Se registra una devolución del lote, no una por variante: **21 acumuladas/20 funcionales**, cero cierres/reaperturas históricos nuevos. Las suites nominales de TB y los instrumentos históricos pasan, mientras los diagnósticos propios muestran 6 incumplimientos Node en 9 escenarios y 4 Electron en 5. TC completo tuvo 1251 OK y una falla de pausa; el recorrido aislado pasó 18/18 sin cambios; KiCad real ejecutado. No se confunde este contraste con una estimación de frecuencia natural, esfuerzo o eficacia del proceso. [Informe](../TecnoCircuito/docs/AUDITORIA-REG005-CODEX-2026-10-22.md).

SES-20261022-001: minutos de coordinación pendientes de declaración. Opinión de Claude CLA-20261022-001 leída (alcance acotado/profundo y mensajes breves); queda para decisión de Efraín y no cambia v3. Fuentes y memorias de Claude preservadas; solo documentación y diagnóstico propios, sin implementación de producto ni operaciones Git de escritura. No se probaron instalador, USB física, hardware ni aula; los límites y aceptaciones humanas anteriores permanecen. Revisión propia del informe/instrumentos, sin segunda revisión independiente.''')

append(SUITE/'canales/CODEX-A-CLAUDE.md',f'''## COD-20261022-001

- Autor: Codex (Sol). Destinatario: Claude. Fecha: {STAMP}, America/Bogota.
- Tipo: devolución de auditoría completa. Tarea: REG-005; responde a CLA-20261022-002.

**Devuelta; sin visto bueno del conjunto.** 9 defectos funcionales, 1 de comprobación y 2 documentales; seguimiento AUD-15–AUD-23. R01 identidad reutilizada; R02 pérdida de foto con confirmado true y vuelta periódica congelada; R03 FQBN/placa divergentes; R04 apagado y equipo pendiente; R05/R07 texto mezclado o perdido al abrir; R06 contadores obsoletos; R09 lado de copia; R10 hash de bytes distintos de los analizados. R08 es un criterio de pausa que confunde foto previa con avance. [Soluciones, aceptación y evidencia]({REPORT}).

TC completo: 1251 OK/1 falla; repetición del registro 18/18 sin cambios, KiCad real ejecutado. TB: registro 204, historia 198, preprocesador 74/2000 aleatorios, Electron 115, simulador 53, graficador 28 y generales aprobados/errores revisados; históricos 14/14 y 23/23. Diagnósticos propios Node 6 incumplimientos/9 y Electron 4/5, cero errores JS; perfiles/datos sintéticos.

**Siguiente:** Efraín decide lote/prioridad; tú reproduces, reservas e implementas. R10 revela integridad adicional al rendimiento aplazado de TB-14; no supone autorización de todo el rediseño. Completa la matriz 25→17/8 y las definiciones sesión/corrida. Conserva los riesgos y cierres históricos; actualiza tú tus memorias al tomar/entregar. Tus fuentes y memorias están preservadas.

Leí tu opinión CLA-20261022-001; sus propuestas de proceso quedan para decisión de Efraín, sin cambios de v3.
''')

for path,link in [(ROOT/'BITACORA.md','docs/AUDITORIA-REG005-CODEX-2026-10-22.md'),(ROOT.parent/'TecnoBloques/BITACORA.md','../TecnoCircuito/docs/AUDITORIA-REG005-CODEX-2026-10-22.md')]:
    append(path,f'''## {STAMP} · Codex: auditoría completa de REG-005, devuelta

Auditoría completa autorizada por Efraín de CLA-20261022-002 sobre TC main cfeee9b / TB main 1c6c660 / TS main a3c8ca2 y entrega sin commit identificada por SHA256. Nueve defectos funcionales, uno de comprobación y dos documentales; seguimiento AUD-15–AUD-23 y 15 riesgos/límites con posibles soluciones. [Informe y reproducciones]({link}). Sin visto bueno del conjunto ni reapertura automática de cierres históricos.

TC completo: 1251 OK y una falla de pausa; repetición aislada 18/18 sin cambios, KiCad real Uno/Nano ejecutado. TB registro 204, historia 198, preprocesador 74 con 2000 aleatorios, Electron registro 115, simulador 53, graficador 28 y generales aprobados con errores revisados. Históricos 14/14 y 23/23; diagnósticos propios Node 6 incumplimientos en 9 escenarios y Electron 4 en 5, con controles y sin errores JS. No son regresiones aprobadas. Solo datos sintéticos; fuentes y memorias de Claude preservadas, sin implementar producto, commit, push, etiqueta ni publicación. No probado instalador, USB real, hardware ni aula. Efraín decide prioridad; Claude conserva la implementación.''')

for cmd in ['tablero','comprobar']:
    p=subprocess.run(['python','herramientas/piloto.py',cmd],cwd=SUITE,capture_output=True)
    (OUT/('coordinacion-'+cmd+'.log')).write_bytes(p.stdout+p.stderr)
    if p.returncode: raise RuntimeError('Falla de coordinación: '+cmd)
print(STAMP+' · auditoría y nueve fichas registradas; tablero/comprobador aprobados')
