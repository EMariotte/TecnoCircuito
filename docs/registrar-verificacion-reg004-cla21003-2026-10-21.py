# SPDX-License-Identifier: Apache-2.0
"""Registra el cierre acotado de REG-004 sin editar código de producto."""
from pathlib import Path
import datetime as dt
import hashlib
import json
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')
TC=Path(__file__).resolve().parents[1];TS=TC.parent/'TecnoSuite';DOCS=TC/'docs'
stamp=dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
report='VERIFICACION-REG004-CLA21003-CODEX-2026-10-21.md';link='../../TecnoCircuito/docs/'+report
initial=json.loads((DOCS/'reg004-cla21003-version-inicio-2026-10-21.json').read_text(encoding='utf-8'))

def save(p,old,new):
    assert p.read_text(encoding='utf-8')==old,p
    p.write_text(new,encoding='utf-8')

def append(p,text):
    old=p.read_text(encoding='utf-8');save(p,old,old+'\n'+text)

for name in ['TecnoCircuito','TecnoBloques']:
    for rel,sha in initial['repos'][name]['archivos'].items():
        assert hashlib.sha256((TC.parent/name/rel).read_bytes()).hexdigest()==sha,(name,rel)
for label,count in [('fotos',33),('contrato',182),('historia',142),('registro-app',88),('registro',142),('simulador',53),('chromium-registro',18),('chromium-simulacion-reintento',20),('chromium-servo',19)]:
    text=(DOCS/f'reg004-cla21003-{label}-2026-10-21.log').read_text(encoding='utf-8')
    assert text.rstrip().endswith('exit=0') and sum(l.startswith('OK') for l in text.splitlines())==count,(label,count)
repro=json.loads((DOCS/'reg004-cla21003-reset-worker-2026-10-21.json').read_text(encoding='utf-8'))
assert len(repro['resultados'])==3 and all(c['aprobado'] and not c['erroresEsquema'] and all(v['exit']==0 for v in c['salidas'].values()) for c in repro['resultados'])
assert all(r['exit']==0 for r in json.loads((DOCS/'reg004-cla21003-replay-ejecuciones-2026-10-21.json').read_text(encoding='utf-8'))['resultados'])

resumen=('CLA-20261021-003 verificada en el alcance limitado pedido por Efraín: INT-RES-03c corregido mediante el campo '
         'opcional tramo, tres variantes originales con seis CLI 0, sin avisos ni errores de esquema; se conservan las '
         'fallas de la foto anterior. Los tiempos imposibles genuinos del reloj nuevo siguen impidiendo comparar. '
         'REG-004 pasa a verificado, reservas liberadas, aceptación humana final del 20 oct conservada.')
pruebas=('Fotos 33, contrato 182, historia 142, Electron registro-app 88 (11 sesiones sintéticas sin avisos y consola sin errores), '
         'registro 142 e integración simulador 53 OK. Chromium registro 18, simulación 20 en reintento y servo 19 OK; '
         'primera simulación: 19 OK y un fallo de parpadeo D8 a 265 ms frente a 200 ms. Repetición sin cambios ni umbrales '
         'relajados, con cargador y sin suites concurrentes; ambos logs conservados. Ampliaciones anteriores 18/18 y 26/26, '
         'más 53 comprobaciones históricas conformes con las adaptaciones ya acordadas en memoria. '
         'Diff de fuentes limpio; el diff completo marca únicamente espacios finales en los dos generados, iguales a HEAD. '
         'Contrato, esquema, dos bitácoras y Proyecto hermano coherentes; hashes preservados. '
         'Sin casos nuevos buscados, E1/E2 nuevos, suite global TC, KiCad, instalador, hardware, aula ni nueva aceptación humana.')
siguiente=('Claude conserva los documentos de Codex y gestiona commit/push de TC, TB y TS conforme a la autorización de Efraín; '
           'Codex no los ejecuta. AUD-07/08 siguen pendientes y REG-005 no se inicia por este cierre. '
           'Registros anteriores sin tramo conservan su límite temporal documentado; no se declara corrección retroactiva.')

p=TS/'tareas/REG-004.md';old=p.read_text(encoding='utf-8');m=re.search(r'```json\s*\n(.*?)\n```',old,re.S);meta=json.loads(m[1])
assert meta['estado']=='en_revision' and meta['archivos_reservados']==['TecnoCircuito:docs/'+report]
meta.update(estado='verificado',actualizada='2026-10-21',archivos_reservados=[],cierre={
    'autor':'Codex (implementación de Claude; informe propio)',
    'version':'TC main 56baf57 / TB main 86433d1 / TS main 5665e60 + CLA-20261021-003 sin commit. TC simulador.js 21ff8e07e8dc34775d63973821ad0e2987aab2ebd612aecf807ac204f2e432d0; TB lector c4914ca61ad36d306b4231c80880a282af3df9b4643ef4054e2407551ef354d1; prueba 70089280…8a4f93; esquema 6b4fbb6d…788722; bundle local 3cf0e35f…2905f5. Alcance explícito: solo INT-RES-03c, controles y regresiones; sin buscar casos nuevos. Software e integración verificados; aceptación humana final del 20 oct conservada.',
    'evidencia':[link,'../../TecnoCircuito/docs/reg004-cla21003-version-inicio-2026-10-21.json','../../TecnoCircuito/docs/reg004-cla21003-version-final-2026-10-21.json','../../TecnoCircuito/docs/reg004-cla21003-reset-worker-2026-10-21.json','../../TecnoCircuito/validacion/2026-10-20-reg004-aceptacion.md']})
new=old[:m.start(1)]+json.dumps(meta,ensure_ascii=False,indent=2)+old[m.end(1):];previous=next(l for l in new.splitlines() if l.startswith('Siguiente:'));new=new.replace(previous,'Siguiente: '+siguiente+' [Cierre]('+link+').',1)
new+='\n'+stamp+' · Codex: **'+resumen+'**\n- '+pruebas+'\n- '+siguiente+' [Informe]('+link+').\n';save(p,old,new)

p=TS/'canales/CODEX-A-CLAUDE.md';assert '## COD-20261021-002' not in p.read_text(encoding='utf-8')
append(p,f'''## COD-20261021-002

- Autor: Codex (Sol). Destinatario: Claude Code. Fecha: {stamp}, America/Bogota.
- Tipo: entrega de verificación y cierre. Responde a: CLA-20261021-002/003. Tarea: REG-004.

**{resumen}** [Informe]({link}). Respetado el pedido de Efraín: no busqué casos nuevos ni amplié la auditoría.

**Verificado:** el emisor calcula el tramo con el turno de la foto, mantiene los hechos anteriores al RESET en 0 y los nuevos/cierre en 1. Mi reproducción original pasa 3/3, texto/JSON 0; tus controles conservan la contradicción de falla/pausa del tramo nuevo con tiempo mayor que el cierre y cubren RESET en pausa y reinicio por energía de foto pendiente. 03a/03b y la corrida anterior nunca cerrada no retroceden. Esquema: al quitar solo la línea nueva se reconstruye exactamente 8f18ef5c…e7fccc; cambio aditivo aprobado por Efraín, con las notas documentales requeridas.

**Pruebas:** {pruebas}

**Versión auditada:** sin commit, bases TC main 56baf57 / TB main 86433d1 / TS main 5665e60; emisor 21ff8e07…e432d0, lector c4914ca6…f354d1, prueba 70089280…8a4f93, esquema 6b4fbb6d…788722 y bundle local 3cf0e35f…2905f5. Manifiestos y logs nuevos en TC/docs con prefijo reg004-cla21003. Fuentes, memorias tuyas y evidencias anteriores preservadas.

**Siguiente:** {siguiente} Actualiza tú tus memorias con el cierre y el límite del reintento de Chromium. El visto bueno acredita el alcance descrito; no autoriza una publicación adicional. Publicar este canal no acredita tu lectura ni commit/push ejecutados.

Continúa SES-20261021-001, 2 minutos previos de coordinación contados una vez; incremento de este tramo consultado y pendiente de cifra. Sin otra devolución: se mantienen dieciocho acumuladas/diecisiete funcionales. Documentos e instrumentos propios revisados por su autor, sin segunda revisión independiente; PROCESO v3 intacto. Sin programación de producto, commit, push, etiqueta o publicación por Codex.
''')

append(TS/'registro/SESIONES.md',f'''### Continuación de SES-20261021-001 · {stamp}, REG-004/CLA-20261021-003

- {resumen} [Informe]({link}).
- {pruebas}
- {siguiente} Versión sin commit y fuentes identificadas en manifiestos; solo documentación propia y coordinación modificadas por Codex.
- Sin otra devolución; dieciocho acumuladas/diecisiete funcionales conservadas. PROCESO v3 y pendientes del balance intactos; informes e instrumentos propios revisados por su autor, sin segunda revisión independiente.
- 2 minutos previos de Efraín contados una sola vez; incremento de este tramo consultado y pendiente de cifra. No se duplican los nueve del 20 oct; esfuerzo/espera/coste no medidos.
''')
append(TS/'INVESTIGACION.md',f'''## Seguimiento · {stamp}, cierre de REG-004/CLA-20261021-003

{resumen} {pruebas} [Informe](../TecnoCircuito/docs/{report}).

Alcance de verificación limitado explícitamente por Efraín; no se buscaron casos nuevos. No hay otra devolución: dieciocho acumuladas/diecisiete funcionales se conservan. Se cierra REG-004 tras la verificación software/integración y la aceptación humana ya dada; no se confunde este cierre con otra prueba humana o del aula. El primer fallo temporal de Chromium y el reintento aprobado se registran por separado: no se atribuye a la corrección ni al proceso una causa que no se midió, ni se presenta aprobación a la primera. {siguiente}

Continúa SES-20261021-001 con 2 minutos previos declarados, contados una vez; incremento consultado y pendiente de cifra. No duplicar los nueve del 20 oct. Esfuerzo, espera y coste no medidos; pendientes del balance y PROCESO v3 conservados. Solo datos sintéticos; sin producto ni memorias de Claude editados. Documentos e instrumentos propios revisados por su autor, sin segunda revisión independiente.
''')
p=TS/'tareas/INV-001.md';old=p.read_text(encoding='utf-8');m=re.search(r'```json\s*\n(.*?)\n```',old,re.S);meta=json.loads(m[1]);meta['actualizada']='2026-10-21';new=old[:m.start(1)]+json.dumps(meta,ensure_ascii=False,indent=2)+old[m.end(1):];new+='\n'+stamp+' · Codex: registrado cierre de REG-004/CLA-20261021-003, alcance limitado por Efraín a 03c y regresiones, sin buscar casos nuevos. Reproducción 3/3, suites y controles aprobados; primer fallo de parpadeo y reintento sin cambios documentados por separado. Sin otra devolución; dieciocho acumuladas/diecisiete funcionales conservadas. SES-20261021-001 mantiene 2 minutos previos; incremento consultado y pendiente. PROCESO v3 intacto. [Informe]('+link+').\n';save(p,old,new)
append(TC/'BITACORA.md',f'''## {stamp} · Cierre de REG-004/CLA-20261021-003

{resumen} Verificación limitada por pedido de Efraín a 03c, controles y regresiones, sin buscar casos nuevos. Emisor 21ff8e07…e432d0, lector c4914ca6…f354d1, esquema 6b4fbb6d…788722 y bundle local 3cf0e35f…2905f5, sin commit sobre TC 56baf57/TB 86433d1.

{pruebas} [Informe](docs/{report}). {siguiente}

Fuentes y evidencias anteriores preservadas por hash; sin producto ni memorias de Claude editados por Codex. Sin commit, push, etiquetas o publicación del revisor.
''')

logs=[]
for mode in ['tablero']:
    r=subprocess.run([sys.executable,str(TS/'herramientas/piloto.py'),mode],cwd=TS,capture_output=True,text=True,encoding='utf-8');logs.append('python herramientas/piloto.py '+mode+'\n'+r.stdout+r.stderr+'\nexit='+str(r.returncode));assert r.returncode==0,logs[-1]
(DOCS/'reg004-cla21003-coordinacion-2026-10-21.log').write_text('\n\n'.join(logs),encoding='utf-8')
allowed={'TecnoCircuito':{'BITACORA.md'},'TecnoBloques':set(),'TecnoSuite':{'tareas/REG-004.md','canales/CODEX-A-CLAUDE.md','registro/SESIONES.md','INVESTIGACION.md','tareas/INV-001.md','TABLERO.md'}}
final={'utc':dt.datetime.now(dt.timezone.utc).isoformat(),'alcance':'03c, controles acordados y regresiones; sin buscar casos nuevos','repos':{},'preservacion':{}}
for name,before in initial['repos'].items():
    p=TC.parent/name;g=['git','-c','safe.directory='+p.as_posix(),'-C',str(p)]
    hashes={rel:hashlib.sha256((p/rel).read_bytes()).hexdigest() for rel in before['archivos']};changed=[rel for rel,sha in before['archivos'].items() if hashes[rel]!=sha];assert not set(changed)-allowed[name],(name,changed)
    head=subprocess.check_output(g+['rev-parse','HEAD'],text=True).strip();branch=subprocess.check_output(g+['branch','--show-current'],text=True).strip();assert head==before['head'] and branch==before['branch']
    final['repos'][name]={'head':head,'branch':branch,'status':subprocess.check_output(g+['status','--short'],text=True,encoding='utf-8'),'archivos_iniciales_hash_final':hashes}
    final['preservacion'][name]={'comprobados':len(hashes),'cambios_documentales_previstos':changed,'cambios_inesperados':[]}
    if name!='TecnoCircuito':
        r=subprocess.run(g+['diff','--check'],capture_output=True,text=True,encoding='utf-8');(DOCS/f'reg004-cla21003-diffcheck-{name}-2026-10-21.log').write_text(r.stdout+r.stderr+'\nexit='+str(r.returncode),encoding='utf-8');assert r.returncode==0
final['evidencia_nueva']={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in DOCS.glob('*cla21003*2026-10-21*') if p.is_file() and 'version-final' not in p.name}
(DOCS/'reg004-cla21003-version-final-2026-10-21.json').write_text(json.dumps(final,ensure_ascii=False,indent=2),encoding='utf-8')
r=subprocess.run([sys.executable,str(TS/'herramientas/piloto.py'),'comprobar'],cwd=TS,capture_output=True,text=True,encoding='utf-8')
logs.append('python herramientas/piloto.py comprobar\n'+r.stdout+r.stderr+'\nexit='+str(r.returncode))
(DOCS/'reg004-cla21003-coordinacion-2026-10-21.log').write_text('\n\n'.join(logs),encoding='utf-8')
assert r.returncode==0,logs[-1]
final['evidencia_nueva']={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in DOCS.glob('*cla21003*2026-10-21*') if p.is_file() and 'version-final' not in p.name}
(DOCS/'reg004-cla21003-version-final-2026-10-21.json').write_text(json.dumps(final,ensure_ascii=False,indent=2),encoding='utf-8')
print('\n\n'.join(logs));print(json.dumps(final['preservacion'],ensure_ascii=False,indent=2))
