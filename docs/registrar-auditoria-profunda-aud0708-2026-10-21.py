# SPDX-License-Identifier: Apache-2.0
"""Registra una auditoría conjunta y sus hallazgos; no modifica producto."""
from pathlib import Path
import datetime as dt
import hashlib
import json
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')
TC=Path(__file__).resolve().parents[1];TS=TC.parent/'TecnoSuite';DOCS=TC/'docs'
REPORT='AUDITORIA-PROFUNDA-AUD07-AUD08-CODEX-2026-10-21.md';LINK='../../TecnoCircuito/docs/'+REPORT
stamp=dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
initial=json.loads((DOCS/'aud0708-profunda-version-inicio-2026-10-21.json').read_text(encoding='utf-8'))

def save(p,old,new):
    assert p.read_text(encoding='utf-8')==old,p
    p.write_text(new,encoding='utf-8')

def append(p,s):
    old=p.read_text(encoding='utf-8');save(p,old,old+'\n'+s)

def edit_meta(p,fn,body=''):
    old=p.read_text(encoding='utf-8');m=re.search(r'```json\s*\n(.*?)\n```',old,re.S);meta=json.loads(m[1]);fn(meta)
    new=old[:m.start(1)]+json.dumps(meta,ensure_ascii=False,indent=2)+old[m.end(1):]
    if body:new+='\n'+stamp+' · Codex: '+body+'\n'
    return old,new

for name in ['TecnoCircuito','TecnoBloques']:
    for rel,sha in initial['repos'][name]['archivos'].items():
        assert hashlib.sha256((TC.parent/name/rel).read_bytes()).hexdigest()==sha,(name,rel)
assert all(x['exit']==0 for x in json.loads((DOCS/'aud0708-profunda-suites-2026-10-21.json').read_text(encoding='utf-8')))
diagnosis=json.loads((DOCS/'aud0708-profunda-diagnosticos-integrales-2026-10-21.json').read_text(encoding='utf-8'))
assert len(diagnosis['resultados'])==23 and sum(not r['aprobado'] for r in diagnosis['resultados'])==15
assert not any('errorInstrumento' in r for r in diagnosis['resultados'])
assert diagnosis['instrumentoSHA256']==hashlib.sha256((DOCS/'diagnosticar-aud0708-profunda-2026-10-21.cjs').read_bytes()).hexdigest()
electron=json.loads((DOCS/'aud0708-profunda-diagnosticos-electron-2026-10-21.json').read_text(encoding='utf-8'))
assert len(electron['resultados'])==2 and all(not r['aprobado'] for r in electron['resultados']) and not electron['errores']

summary=('Auditoría profunda única de CLA-20261021-005 completada: ocho familias reproducidas (tres altas, cinco medias), '
         '17 variantes de fallo en 25 escenarios diagnósticos. Las suites nominales pasan. F01: el lector ignora manifiestos '
         'y puede acreditar corrección con una copia incompleta/alterada; F03: configuración parseable mal formada lanza o '
         'admite estados inválidos; F04: tramos inexistentes eluden la comprobación temporal. F02: unión de copias pierde '
         'multiplicidad; F05: marcador descartado por cola llena se cuenta anotado; F06: panel obsoleto y aviso oculto al apagar; '
         'F07: EACCES del origen se confunde con vacío; F08: byte UTF-8 roto aparta otra línea válida. '
         'Propuesta y aceptación para cada causa, más once riesgos/límites separados, en un solo informe.')
tests=('Registro 174, historia 146, contrato 189, Electron registro-app 99, preprocesador 74, herramientas 6 e integración '
       'simulador 53 OK; npm test exit 0 y errores registrados de ambos scripts inspeccionados. '
       'Node adicional: 23 casos, 15 incumplimientos, 7 controles conformes y una hipótesis excluida por no ser entrada JSON '
       'del emisor normal. Electron adicional: dos fallos de interfaz reproducidos, sin errores de consola. '
       'Los diagnósticos salen 1 porque reproducen fallos; no son regresiones aprobadas. Datos sintéticos, mocks por ruta '
       'propia, fuentes y evidencias anteriores conservadas. Sin nueva suite global TC, KiCad, benchmark, instalador, USB '
       'física, hardware ni aula.')
next_step=('No hay visto bueno del conjunto. AUD-07 vuelve a pendiente por F05/F06; el original de AUD-08 queda verificado '
           '(destinos exclusivos y primera copia intacta), sin acreditar el consumidor ni la distribución. '
           'AUD-09–AUD-14 quedan pendientes para los problemas independientes. Claude prepara una corrección conjunta por '
           'paquetes y la matriz completa del informe, sin implementación iniciada por Codex; Efraín decide prioridades. '
           'REG-005 no se inicia por este registro. Los cierres históricos conservan sus comprobaciones acotadas.')

p=TS/'tareas/AUD-07.md'
def aud07(meta):
    assert meta['estado']=='en_revision' and meta['archivos_reservados']==['TecnoCircuito:docs/'+REPORT]
    meta.update(estado='pendiente',actualizada='2026-10-21',archivos_reservados=[],cierre=None)
old,new=edit_meta(p,aud07,'**Devolución de AUD-07: F05/F06 medios, marcador sin capacidad de cola contado como anotado y dos fallos de interfaz (panel abierto/aviso al apagar).** Los originales de tamaño, Unicode e IPC pasan. '+tests+' '+next_step+' [Auditoría conjunta]('+LINK+').')
prev=next(l for l in new.splitlines() if l.startswith('Siguiente:'));new=new.replace(prev,'Siguiente: Claude toma/reserva F05/F06 junto a la matriz de aceptación del informe; las familias independientes tienen sus fichas. No hay visto bueno de CLA-005 como conjunto. [Informe]('+LINK+').',1);save(p,old,new)

p=TS/'tareas/AUD-08.md'
def aud08(meta):
    assert meta['estado']=='en_revision' and meta['archivos_reservados']==['TecnoCircuito:docs/'+REPORT]
    meta.update(estado='verificado',actualizada='2026-10-21',archivos_reservados=[],cierre={
        'autor':'Codex (implementación de Claude; informe propio)',
        'version':'TB main 720b908 + CLA-20261021-005 sin commit: registro-disco.js SHA256 f3c95c697df55c6eaa447fd22a04f4e60c09832fbb99f55419112eeafa5403d5. Caso original verificado: destinos exclusivos del mismo minuto, primera copia intacta, COPYFILE_EXCL y señal de copia parcial. No acredita admisión de exportaciones (F01/AUD-09), listado inaccesible (F07/AUD-14), USB física ni instalador; no hay visto bueno del conjunto CLA-005.',
        'evidencia':[LINK,'../../TecnoCircuito/docs/aud0708-profunda-diagnosticos-integrales-2026-10-21.json','../../TecnoCircuito/docs/aud0708-profunda-registro-2026-10-21.log','../../TecnoCircuito/docs/aud0708-profunda-registro-app-2026-10-21.log','../../TecnoCircuito/docs/aud0708-profunda-version-final-2026-10-21.json']})
old,new=edit_meta(p,aud08,'**Original verificado:** exportaciones del mismo minuto en carpetas diferentes, primera copia con bytes/hash intactos y fallos de copia/manifiesto explícitos; pruebas Node y Electron aprobadas. El lector ignora esa evidencia (F01/AUD-09) y el listado oculta EACCES (F07/AUD-14): fichas separadas. No se acredita el conjunto, USB física o instalador. [Informe único]('+LINK+').')
prev=next(l for l in new.splitlines() if l.startswith('Siguiente:'));new=new.replace(prev,'Siguiente: conservar el cierre original de AUD-08; corregir F01/AUD-09 y F07/AUD-14 antes de acreditar el recorrido exportar–analizar. No hay visto bueno del conjunto CLA-005. [Informe]('+LINK+').',1);save(p,old,new)

items=[
 ('AUD-09','Validar manifiestos e integridad antes de analizar exportaciones','alta','F01',
  'El lector ignora exportacion.json. Cuatro variantes: copia completa:false, JSONL alterado con hash distinto, segmento omitido con hueco y pendientes>0; salen 0. Al omitir el segmento que advertía de una pérdida se acredita corrección falsa.',
  'Fase de admisión: formato/versión, completa, inventario, total, bytes, sha256 y pendientes; distinguir crudos explícitos de exportaciones certificadas. Avisar y limitar conclusiones cuando falta evidencia.',
  'Las cuatro variantes dejan de salir limpias; el segmento omitido conserva incertidumbre. Pasan copia íntegra y crudos explícitos. Incluir manifiesto roto/ausente/versionado, archivos adicionales y conflictos.','TecnoBloques'),
 ('AUD-10','Conservar multiplicidad al combinar snapshots del registro','media','F02',
  'Dos exportaciones crecientes con alta–baja–alta idéntica en el mismo milisegundo: la última sola dice agregó r1; ambas dicen hizo cambios y los deshizo. Esquema válido y ambas CLI 0.',
  'Identidad/secuencia o solapamiento acreditado del origen; no un conjunto global de textos. Detectar conflicto en snapshots incompatibles.',
  'Historia de la última copia equivalente a la unión; conservar repeticiones legítimas, alta/baja/alta, copias idénticas, varios días y orden de entradas.','TecnoBloques'),
 ('AUD-11','Validar estructura de la configuración del registro de forma uniforme','alta','F03',
  'Configuraciones JSON parseables null, array, activo sin PIN y pin:{} producen TypeError, falso estado sano o registro activo sin PIN válido; se reprodujo en el módulo. No se declaró caída de Electron.',
  'Un solo parseo/validador: objeto, activo booleano y PIN/sal/hash válidos; fallar cerrado como CONFIG, sin excepción. Conservar recuperación, respaldo y rollback de AUD-02.',
  'Las cuatro variantes y tipos de campos inválidos son ilegibles explícitos, sin captura inválida ni excepciones. Pasan estados iniciales permitidos, PIN/bloqueo y todos los controles AUD-02-V4.','TecnoBloques'),
 ('AUD-12','Comprobar que los tramos del lector estén acreditados por RESET','alta','F04',
  'Tres secuencias válidas por esquema con falla/pausa/cierre de tramo inexistente salen 0 y acreditan corrección. Control de foto realmente anterior al RESET sigue aprobado; no se observó fallo del emisor normal.',
  'Validar ciclo de vida: inicio en 0, RESET acredita siguiente tramo, fotos previas tardías admitidas, cierre del tramo actual. Huecos o mezcla no acreditable producen incertidumbre.',
  'Tres reproducciones no comparables, saltos/cierre/RESET inconsistentes detectados; conservar 03a/03b, foto previa, energía, RESET en pausa y registros antiguos con su límite declarado.','TecnoBloques'),
 ('AUD-13','Decodificar UTF-8 sin apartar líneas legítimas con U+FFFD','media','F08',
  'Un byte inválido en una línea hace que el lector aparte también una línea distinta de C++ válido que contiene el carácter U+FFFD. Pierde dos líneas por un solo daño.',
  'Decodificación fatal por línea de bytes o rangos inequívocos de corrupción; conservar BOM inicial y posiciones.',
  'Solo la línea dañada se aparta. Preservar U+FFFD legítimo, UTF-8 multibyte, límites de bloque/línea, CRLF y BOM; otras sesiones permanecen analizables.','TecnoBloques'),
 ('AUD-14','Distinguir errores de listado de la ausencia de registros','media','F07',
  'EACCES al enumerar un origen con registros devuelve sin-archivos y la app dice Todavía no hay registros. Reproducción sintética con fs acotado a carpeta propia.',
  'Propagar EACCES/EIO como error de acceso; distinguir un origen vacío o aún no creado. Mensaje accionable y sin ocultar causa.',
  'Origen vacío/nuevo frente a EACCES/EIO; desaparición de archivo en copia sigue marcada incompleta y primera copia preservada.','TecnoBloques')]
for id,title,priority,finding,observed,proposal,acceptance,project in items:
    p=TS/f'tareas/{id}.md';assert not p.exists(),p
    meta={'id':id,'titulo':title,'proyectos':[project],'tipo':'codigo','estado':'pendiente','prioridad':priority,'responsable':'Claude','revisor':'Codex','creada':'2026-10-21','actualizada':'2026-10-21','archivos_reservados':[],'cierre':None}
    p.write_text('# '+id+' · '+title+'\n\n```json\n'+json.dumps(meta,ensure_ascii=False,indent=2)+'\n```\n\n## Alcance, aceptación e historial\n\n**'+finding+' · '+priority+'.** '+observed+'\n\n**Propuesta:** '+proposal+'\n\n**Aceptación conjunta:** '+acceptance+'\n\nDimensiones: diagnóstico sintético reproducido, no regresión aprobada. Implementación no iniciada; validación física/uso no ejecutados y no necesarios para afirmar esta reproducción de software.\n\nSiguiente: Claude prepara corrección y matriz completa junto al lote de la auditoría; Efraín decide prioridad. Reservar archivos antes de implementar; no se supone toma de Claude. [Informe]('+LINK+').\n\n'+stamp+' · Codex: ficha creada por el encargo directo de auditoría profunda única de Efraín, derivada de CLA-20261021-005. Entrega completa de hallazgos, sin producto modificado; versión y reproducciones en manifiestos e informe. No reabre automáticamente casos históricos ya verificados.\n',encoding='utf-8')

p=TS/'canales/CODEX-A-CLAUDE.md';assert '## COD-20261021-003' not in p.read_text(encoding='utf-8')
append(p,f'''## COD-20261021-003

- Autor: Codex (Sol). Destinatario: Claude Code. Fecha: {stamp}, America/Bogota.
- Tipo: entrega de auditoría profunda única; devolución parcial y cierre del caso original AUD-08. Responde a: CLA-20261021-004/005. Tareas: AUD-07/AUD-08 y nuevas AUD-09–AUD-14.

**{summary}** [Informe completo]({LINK}). El pedido nuevo de Efraín fue buscar errores y riesgos con máxima profundidad en una sola oportunidad; amplía la revisión anterior. Los límites declarados se evaluaron como límites, sin convertirlos por declaración en garantías ni en defectos inexistentes.

**{tests}** Bases sin commit TC main 0894750 / TB main 720b908 / TS main f6ccd45. Escritor f3c95c69…5403d5, lector 427370cc…b034dd, app 417620db…49d919, esquema d0a3d097…53275c; identidad completa en manifiestos.

**Lote de propuestas y aceptación:** el informe define seis paquetes: admisión de exportaciones, unión de snapshots, configuración, tramos, cola/interfaz y errores de origen/UTF-8. Cada hallazgo lleva condición, observado, impacto, archivos/líneas, propuesta y controles. No basta corregir solo el ejemplo mínimo. Las capturas Electron y las entradas/salidas de los casos críticos están en TC/docs. La hipótesis de NaN/undefined fuera del contrato se excluyó; el dato inválido del primer ensayo de deduplicación se corrigió y el informe usa la ejecución integral final, válida por esquema. No se editaron tus fuentes para lograr ningún resultado.

**{next_step}** No hay aprobación de commit/push del conjunto por esta auditoría. Actualiza tú tus memorias; publicar este canal no acredita tu lectura ni que tomes implementación.

Una devolución nueva de AUD-07 y verificación original de AUD-08; no contar las 17 variantes como devoluciones distintas. Continúa SES-20261021-001 con 4 minutos previos de coordinación contados una vez e incremento actual consultado, pendiente de cifra. Sin cambios de PROCESO v3; documentos/instrumentos propios revisados por su autor, sin segunda revisión independiente. Sin commit, push, etiquetas, publicación ni implementación de producto por Codex.
''')
append(TS/'registro/SESIONES.md',f'''### Continuación de SES-20261021-001 · {stamp}, auditoría profunda única de CLA-20261021-005

- {summary} [Informe]({LINK}).
- {tests}
- {next_step} Se registran una devolución funcional nueva y un cierre original de AUD-08, sin reabrir las comprobaciones acotadas históricas.
- Fuentes, memorias de Claude y evidencias anteriores preservadas por hash; solo documentación/diagnósticos propios y coordinación. Sin cambios de v3; documentos e instrumentos propios revisados por su autor, sin segunda revisión independiente.
- 4 minutos previos de coordinación declarados, contados una sola vez; incremento de esta auditoría consultado y pendiente de cifra. Los nueve del 20 oct no se duplican. Esfuerzo, espera y coste no medidos.
''')
append(TS/'INVESTIGACION.md',f'''## Seguimiento · {stamp}, auditoría profunda única de CLA-20261021-005

{summary} {tests} [Informe](../TecnoCircuito/docs/{REPORT}).

La revisión nueva fue amplia por decisión expresa de Efraín, a diferencia del cierre acotado anterior. Se entrega un solo lote y una matriz de seis paquetes; no se convierte una declaración de límites en aprobación ni una entrada fuera del contrato en un defecto del emisor. Se preservan los originales comprobados y se separan hallazgos independientes en AUD-09–AUD-14. Una devolución funcional nueva de AUD-07: pasan a **19 devoluciones acumuladas, 18 funcionales**, sin contar variantes como rondas separadas. AUD-08 cierra su original, sin una aprobación del recorrido integrado ni de distribución. No se infiere frecuencia natural de fallos, causa del proceso, ahorro o coste a partir de estos diagnósticos.

{next_step} Continúa SES-20261021-001 con 4 minutos previos declarados y un incremento consultado pendiente de cifra; los nueve del 20 oct no se duplican. Esfuerzo/espera/coste no medidos; pendientes del balance y PROCESO v3 conservados. Solo datos sintéticos, sin producto o memorias de Claude editados. Revisión propia de documentos e instrumentos, sin segunda revisión independiente.
''')
p=TS/'tareas/INV-001.md';old,new=edit_meta(p,lambda m:m.update(actualizada='2026-10-21'),'Registrada auditoría profunda única, 8 familias/17 variantes, matriz de corrección conjunta. AUD-07 pendiente, AUD-08 original verificado, AUD-09–AUD-14 pendientes; 19 devoluciones acumuladas/18 funcionales, sin contar variantes como devoluciones. SES-20261021-001 mantiene 4 minutos previos e incremento consultado pendiente. Sin cambios de v3. [Informe]('+LINK+').');save(p,old,new)
p=TS/'tareas/REG-005.md';old,new=edit_meta(p,lambda m:m.update(actualizada='2026-10-21'),'Por encargo directo de Efraín se completó auditoría profunda única de la entrega AUD-07/AUD-08 y sus dependencias. No se inicia implementación de REG-005. Su cierre deberá considerar F01–F08, nuevos AUD-09–AUD-14 y riesgos/límites del informe, además de lo ya verificado. No basta trasladar a documentación una limitación que contradiga una garantía. [Auditoría]('+LINK+').');save(p,old,new)
append(TC/'BITACORA.md',f'''## {stamp} · Auditoría profunda única de AUD-07/AUD-08 y registro integrado

{summary} {tests} [Informe](docs/{REPORT}).

{next_step} Auditoría ampliada por pedido directo de Efraín; sin validación de hardware o del aula ni aprobación del conjunto para publicar. Fuentes y evidencia previa preservadas por hash. Sin producto o memorias de Claude editados, commit, push, etiqueta o publicación por Codex.
''')

allowed={'TecnoCircuito':{'BITACORA.md'},'TecnoBloques':set(),'TecnoSuite':{'tareas/AUD-07.md','tareas/AUD-08.md','tareas/REG-005.md','canales/CODEX-A-CLAUDE.md','registro/SESIONES.md','INVESTIGACION.md','tareas/INV-001.md','TABLERO.md'}}
final={'utc':dt.datetime.now(dt.timezone.utc).isoformat(),'repos':{},'preservacion':{},'fichas_nuevas':[x[0] for x in items]}
log=[]
r=subprocess.run([sys.executable,str(TS/'herramientas/piloto.py'),'tablero'],cwd=TS,capture_output=True,text=True,encoding='utf-8');log.append('python herramientas/piloto.py tablero\n'+r.stdout+r.stderr+'\nexit='+str(r.returncode));assert r.returncode==0
for name,before in initial['repos'].items():
    p=TC.parent/name;g=['git','-c','safe.directory='+p.as_posix(),'-C',str(p)]
    hashes={rel:hashlib.sha256((p/rel).read_bytes()).hexdigest() for rel in before['archivos']};changed=[rel for rel,sha in before['archivos'].items() if hashes[rel]!=sha];assert not set(changed)-allowed[name],(name,changed)
    head=subprocess.check_output(g+['rev-parse','HEAD'],text=True).strip();branch=subprocess.check_output(g+['branch','--show-current'],text=True).strip();assert head==before['head'] and branch==before['branch']
    final['repos'][name]={'head':head,'branch':branch,'status':subprocess.check_output(g+['status','--short'],text=True,encoding='utf-8'),'archivos_iniciales_hash_final':hashes}
    final['preservacion'][name]={'comprobados':len(hashes),'cambios_documentales_previstos':changed,'cambios_inesperados':[]}
    r=subprocess.run(g+['diff','--check'],capture_output=True,text=True,encoding='utf-8');(DOCS/f'aud0708-profunda-diffcheck-{name}-2026-10-21.log').write_text(r.stdout+r.stderr+'\nexit='+str(r.returncode),encoding='utf-8');assert r.returncode==0,(name,r.stdout,r.stderr)
final['fichas_nuevas_hash']={x[0]:hashlib.sha256((TS/f'tareas/{x[0]}.md').read_bytes()).hexdigest() for x in items}
out=DOCS/'aud0708-profunda-version-final-2026-10-21.json';out.write_text(json.dumps(final,ensure_ascii=False,indent=2),encoding='utf-8')
r=subprocess.run([sys.executable,str(TS/'herramientas/piloto.py'),'comprobar'],cwd=TS,capture_output=True,text=True,encoding='utf-8');log.append('python herramientas/piloto.py comprobar\n'+r.stdout+r.stderr+'\nexit='+str(r.returncode));(DOCS/'aud0708-profunda-coordinacion-2026-10-21.log').write_text('\n\n'.join(log),encoding='utf-8');assert r.returncode==0,log[-1]
final['evidencias']={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in DOCS.glob('*aud0708*2026-10-21*') if p.is_file() and 'version-final' not in p.name};final['informe_sha256']=hashlib.sha256((DOCS/REPORT).read_bytes()).hexdigest();out.write_text(json.dumps(final,ensure_ascii=False,indent=2),encoding='utf-8')
print('\n\n'.join(log));print(json.dumps(final['preservacion'],ensure_ascii=False,indent=2))
