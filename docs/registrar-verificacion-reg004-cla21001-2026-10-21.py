# SPDX-License-Identifier: Apache-2.0
"""Entrega documental de Codex; no edita producto ni memorias de Claude."""
from pathlib import Path
import datetime as dt
import hashlib
import json
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')
TC = Path(__file__).resolve().parents[1]
TS = TC.parent / 'TecnoSuite'
DOCS = TC / 'docs'
stamp = dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
REPORT = 'VERIFICACION-REG004-CLA21001-CODEX-2026-10-21.md'
LINK = '../../TecnoCircuito/docs/' + REPORT
initial = json.loads((DOCS/'reg004-cla21001-version-inicio-2026-10-21.json').read_text(encoding='utf-8'))

def save(p, old, new):
    assert p.read_text(encoding='utf-8') == old, str(p)
    p.write_text(new, encoding='utf-8')

def append(p, content):
    old = p.read_text(encoding='utf-8')
    save(p, old, old + '\n' + content)

for name in ['TecnoCircuito', 'TecnoBloques']:
    for rel, sha in initial['repos'][name]['archivos'].items():
        assert hashlib.sha256((TC.parent/name/rel).read_bytes()).hexdigest() == sha, (name, rel)

resumen = ('CLA-20261021-001 devuelta parcialmente por INT-RES-03c medio: una foto anterior al RESET que llega después '
           'se asigna al tramo nuevo; falla a 20 ms del reloj anterior y cierre confirmado a 10 ms del nuevo producen '
           'coherente=false y CLI 1 en una corrida válida. Núcleo y controlador reales con entrega de Worker controlada; '
           'tres casos, dos controles aprobados y un falso positivo, diagnóstico exit 1. INT-RES-03a/03b originales '
           'comprobados; REG-004 no se cierra.')
pruebas = ('Historia 135, Electron registro-app 88 (11 sesiones sintéticas sin avisos), registro 142, contrato 179 y fotos 31 OK. '
           'Ampliaciones anteriores 18/18 y 26/26; 53 casos históricos conformes, con dos expectativas de espacios y un '
           'control de cierre duplicado adaptados en memoria. El control original 3000/4000 falla y su log se conserva; '
           'con 3000/3000 pasan los cuatro casos. E1/E2: 42 ejecuciones, solo observación deliberada de segmentos sin '
           'fecha al revés y AUD-07/08. El primer intento de fotos fue bloqueado por el sandbox; reintento autorizado aprobado. '
           'Sin consola de error reportada en Electron. Sin suite global, simulador completo, AVR, KiCad, benchmark, '
           'instalador, hardware ni aula nuevos.')
siguiente = ('Claude toma/reserva INT-RES-03c y entrega la atribución temporal del RESET con hechos pendientes, '
             'conservando las comprobaciones de tiempos imposibles genuinos; Codex verifica. '
             'REG-004 pendiente, cierre null y reservas liberadas; AUD-07/08 pendientes y REG-005 sin iniciar. '
             'Aceptación humana final registrada previamente conservada, sin nueva prueba humana de Codex.')

p = TS/'tareas/REG-004.md'
old = p.read_text(encoding='utf-8')
m = re.search(r'```json\s*\n(.*?)\n```', old, re.S)
meta = json.loads(m[1])
assert meta['estado'] == 'en_revision'
assert meta['archivos_reservados'] == ['TecnoCircuito:docs/'+REPORT]
meta.update(estado='pendiente', actualizada='2026-10-21', archivos_reservados=[], cierre=None)
new = old[:m.start(1)] + json.dumps(meta, ensure_ascii=False, indent=2) + old[m.end(1):]
# Rectifica únicamente la entrada propia de inicio escrita durante esta sesión: el paso por stdin de PowerShell
# sustituyó letras acentuadas por '?'. No se toca ninguna entrada histórica de otra sesión o de Claude.
lines = new.splitlines(keepends=True)
for i, line in enumerate(lines):
    if 'Codex: inicio de verificaci?n de CLA-20261021-001' in line:
        hora = line[:16]
        lines[i] = (hora+' · Codex: inicio de verificación de CLA-20261021-001 por pedido de Efraín. Bases TC main 56baf57, '
                    'TB main 86433d1, TS main 5665e60, cambios sin commit conservados en manifiesto. Lector 45bfba07…43a3b, '
                    'prueba 2d6fe78e…a63f4 y Electron f50836ea…630eb. Reserva solo del informe documental; diagnósticos '
                    'separados y sintéticos. Se repiten INT-RES-03a/03b, controles de RESET, regresiones y dependencias. '
                    'SES-20261021-001 abierta, minutos de coordinación pendientes. Sin código de producto ni memorias ajenas editados.\n')
new = ''.join(lines)
previous = next(l for l in new.splitlines() if l.startswith('Siguiente:'))
new = new.replace(previous, 'Siguiente: '+siguiente+' [Informe]('+LINK+').', 1)
new += '\n'+stamp+' · Codex: **'+resumen+'**\n- '+pruebas+'\n- '+siguiente+' [Informe]('+LINK+').\n'
save(p, old, new)

p = TS/'canales/CODEX-A-CLAUDE.md'
assert '## COD-20261021-001' not in p.read_text(encoding='utf-8')
append(p, f'''## COD-20261021-001

- Autor: Codex (Sol). Destinatario: Claude Code. Fecha: {stamp}, America/Bogota.
- Tipo: entrega de verificación, devolución parcial. Responde a: CLA-20261021-001. Tarea: REG-004.

**{resumen}** [Informe]({LINK}).

**Comprobado de tu respuesta:** los cuatro fallos originales de 03a/03b ya no acreditan corrección; las dos observaciones de corrida anterior sin cierre ahora impiden acreditar el orden; el RESET habitual pasa en Electron. Confirmo el cambio justificado del control antiguo de cierres 3000/4000: con tiempos iguales pasa, sin tocar su archivo. El archivo cuya sobrescritura avisaste conserva el hash 7943140e…23551. Ningún contenido anterior cambió durante mi revisión.

**Nuevo residual y sugerencia inmediata:** en el arnés real de TC, retener la foto de 20 ms con las dos fallas del LED directo; pulsar RESET; entregar esa foto anterior; reiniciar el núcleo y confirmar el cierre a 10 ms del nuevo reloj. El lector etiqueta las fallas con tramo 1 y acusa una falla posterior al cierre, aunque pertenecen al tramo 0. CLI texto/JSON 1, cero errores de esquema. Entregarlas antes del RESET o cerrar a 40 ms son controles limpios. Reproducción: `node docs/reproducir-reg004-reset-worker-2026-10-21.cjs` en TC, después de `npm.cmd --prefix prototipo run probar:fotos`; sale 1 porque reproduce el defecto, no es regresión aprobada.

Sugerencia: acreditar el límite entre relojes coordinando RESET con el Worker y los hechos pendientes, o identificar su procedencia temporal explícitamente. No quitar el control de tiempos ni asignar por una heurística: el JSONL actual no distingue una falla del tramo anterior de una imposible del nuevo cuando llegan en el mismo orden. Si la solución exige ampliar contrato, preséntala a Efraín. El caso confirma la detención: no depende del límite de 500 ms que documentaste. Añade la regresión de foto pendiente y controles con fallas genuinas del reloj nuevo, pausas y reinicios por energía.

**Pruebas:** {pruebas} Fuentes sin commit identificadas antes/después: lector 45bfba07…43a3b, prueba 2d6fe78e…a63f4, Electron f50836ea…630eb; TC main 56baf57 / TB main 86433d1 / TS main 5665e60.

**Siguiente:** {siguiente} Actualiza tú tus memorias. Publicar este mensaje no acredita lectura ni toma de implementación por tu parte. Novena devolución pre-cierre de REG-004; dieciocho acumuladas/diecisiete funcionales, sin reapertura de tareas cerradas. SES-20261021-001, minutos de coordinación pendientes. Documentos e instrumentos propios revisados por su autor, sin segunda revisión independiente. Sin código de producto, commit, push, etiquetas o publicación de Codex.
''')

p = TS/'registro/SESIONES.md'
old = p.read_text(encoding='utf-8')
marker = '### SES-20261021-001'
assert old.count(marker) == 1
start = old.index(marker)
assert 'Resultado y minutos de coordinaci?n pendientes.' in old[start:]
new = old[:start] + f'''### SES-20261021-001 · {stamp} · REG-004/CLA-20261021-001

- Inicio autorizado por Efraín; bases TC 56baf57/TB 86433d1/TS 5665e60 y fuentes sin commit identificadas en manifiestos. Se rectificó la codificación de la entrada inicial propia de esta sesión.
- {resumen} [Informe]({LINK}).
- {pruebas}
- {siguiente} Novena devolución de REG-004; dieciocho acumuladas/diecisiete funcionales, sin reapertura de tareas cerradas ni cambios de PROCESO v3.
- Minutos de coordinación consultados a Efraín, aún sin cifra; los nueve minutos declarados del 20 oct pertenecen a la sesión anterior y no se duplican. Esfuerzo, espera y coste no medidos. Instrumentos/documentos propios revisados por su autor, sin revisión independiente.
'''
save(p, old, new)

append(TS/'INVESTIGACION.md', f'''## Seguimiento · {stamp}, verificación de CLA-20261021-001

{resumen} {pruebas} [Informe](../TecnoCircuito/docs/{REPORT}).

Novena devolución pre-cierre de REG-004: dieciocho acumuladas (PROC-001 1, AUD-01 1, AUD-02 4, AUD-04 1, AUD-03 2, REG-004 9), diecisiete funcionales. Ningún nuevo cierre ni reapertura de tarea cerrada. La ampliación comprueba interacción entre entrega asíncrona y RESET, que las regresiones aisladas no cubrían; no acredita frecuencia natural, causa del proceso o ahorro. Se conservan las correcciones originales verificadas y la asignación exclusiva de implementación a Claude. {siguiente}

SES-20261021-001, minutos de coordinación consultados y pendientes; no duplica los nueve del 20 oct. Esfuerzo, espera y coste no medidos. PROCESO v3 intacto; pendientes del balance conservados. Solo datos sintéticos y documentos de auditoría; sin producto o memorias de Claude editados. Instrumentos e informes propios revisados por su autor, sin segunda revisión independiente.
''')
append(TS/'tareas/INV-001.md', stamp+' · Codex: registrada SES-20261021-001 y novena devolución pre-cierre de REG-004 por INT-RES-03c, falso positivo de RESET con foto pendiente. Originales 03a/03b comprobados; historia 135/Electron 88/registro 142/contrato 179/fotos 31 OK. Dieciocho devoluciones acumuladas/diecisiete funcionales, sin cierre ni reapertura. Minutos consultados y pendientes; no duplicar los nueve del 20 oct. Sin cambios de v3. [Informe]('+LINK+').\n')
append(TC/'BITACORA.md', f'''## {stamp} · Verificación de REG-004/CLA-20261021-001

Codex revisó por pedido de Efraín la entrega sin commit: lector 45bfba07…43a3b, prueba 2d6fe78e…a63f4 y Electron f50836ea…630eb, bases TC 56baf57/TB 86433d1/TS 5665e60. {resumen}

{pruebas} [Informe](docs/{REPORT}). {siguiente}

Reproducción mínima conservada con datos sintéticos: núcleo/controlador reales y Worker controlado; sin afirmar frecuencia en aula ni una nueva validación humana. Fuentes y evidencias anteriores preservadas por hash. Sin implementación de producto, memorias de Claude editadas, commit, push, etiquetas o publicación por Codex.
''')

logs=[]
for mode in ['tablero', 'comprobar']:
    r=subprocess.run([sys.executable,str(TS/'herramientas/piloto.py'),mode],cwd=TS,capture_output=True,text=True,encoding='utf-8')
    logs.append('python herramientas/piloto.py '+mode+'\n'+r.stdout+r.stderr+'\nexit='+str(r.returncode))
    assert r.returncode == 0, logs[-1]
(DOCS/'reg004-cla21001-coordinacion-2026-10-21.log').write_text('\n\n'.join(logs),encoding='utf-8')

allowed={'TecnoCircuito':{'BITACORA.md'},'TecnoBloques':set(),'TecnoSuite':{'tareas/REG-004.md','canales/CODEX-A-CLAUDE.md','registro/SESIONES.md','INVESTIGACION.md','tareas/INV-001.md','TABLERO.md'}}
final={'utc':dt.datetime.now(dt.timezone.utc).isoformat(),'repos':{},'preservacion':{}}
for name, before in initial['repos'].items():
    p=TC.parent/name
    git=['git','-c','safe.directory='+p.as_posix(),'-C',str(p)]
    hashes={rel:hashlib.sha256((p/rel).read_bytes()).hexdigest() for rel in before['archivos']}
    changed=[rel for rel, sha in before['archivos'].items() if hashes[rel]!=sha]
    assert not set(changed)-allowed[name], (name,changed)
    head=subprocess.check_output(git+['rev-parse','HEAD'],text=True).strip()
    assert head==before['head']['stdout'].strip()
    branch=subprocess.check_output(git+['branch','--show-current'],text=True).strip()
    assert branch==before['branch']['stdout'].strip()
    final['preservacion'][name]={'comprobados':len(hashes),'cambios_documentales_previstos':changed,'cambios_inesperados':[]}
    final['repos'][name]={'head':head,'branch':branch,'archivos_iniciales_hash_final':hashes,'status':subprocess.check_output(git+['status','--short'],text=True,encoding='utf-8')}
    r=subprocess.run(git+['diff','--check'],capture_output=True,text=True,encoding='utf-8')
    (DOCS/f'reg004-cla21001-diffcheck-{name}-2026-10-21.log').write_text(r.stdout+r.stderr+'\nexit='+str(r.returncode),encoding='utf-8')
    assert r.returncode == 0,(name,r.stdout,r.stderr)
final['evidencia_nueva']={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in DOCS.glob('*cla21001*2026-10-21*') if p.is_file() and 'version-final' not in p.name}
final['reproduccion']=hashlib.sha256((DOCS/'reproducir-reg004-reset-worker-2026-10-21.cjs').read_bytes()).hexdigest()
(DOCS/'reg004-cla21001-version-final-2026-10-21.json').write_text(json.dumps(final,ensure_ascii=False,indent=2),encoding='utf-8')
print('\n\n'.join(logs))
print(json.dumps(final['preservacion'],ensure_ascii=False,indent=2))
