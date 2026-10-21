# SPDX-License-Identifier: Apache-2.0
"""Cierre documental de la auditoría, sin implementación ni operaciones Git de escritura."""
from pathlib import Path
import datetime as dt
import hashlib
import importlib.util
import json
import re
import sys

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('verificacion',ROOT/'docs/verificar-cla008-aud09-2026-10-21.py')
w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
v=w.v;TS=v.TS
REPORT=w.REPORT;LINK='../../TecnoCircuito/docs/'+REPORT
stamp=dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
initial=json.loads((ROOT/'docs/cla008-aud09-version-inicio-2026-10-21.json').read_text(encoding='utf-8'))
assert initial['entrega']=='CLA-20261021-008'
for name in ['TecnoCircuito','TecnoBloques']:
    for rel,digest in initial['repos'][name]['archivos'].items():
        if rel.startswith('docs/'):continue
        p=ROOT.parent/name/rel
        assert p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest()==digest,(name,rel)
results=json.loads((ROOT/'docs/cla008-aud09-comprobaciones-2026-10-21.json').read_text(encoding='utf-8'))
assert len(results)==4 and all(x['exit']==0 for x in results)
for label,count in [('aceptacion',14),('profunda',23)]:
    data=json.loads((ROOT/f'docs/cla008-aud09-{label}-2026-10-21.json').read_text(encoding='utf-8'))
    assert len(data['resultados'])==count and all(x['aprobado'] and not x.get('errorInstrumento') for x in data['resultados'])

def save(p,old,new):
    assert p.read_text(encoding='utf-8')==old,p
    p.write_text(new,encoding='utf-8')

def append(p,text):
    old=p.read_text(encoding='utf-8');save(p,old,old+'\n'+text+'\n')

p=TS/'tareas/AUD-09.md';old=p.read_text(encoding='utf-8');m=re.search(r'```json\s*\n(.*?)\n```',old,re.S);meta=json.loads(m[1])
assert meta['estado']=='en_revision' and meta['archivos_reservados']==['TecnoCircuito:docs/'+REPORT]
meta['estado']='verificado';meta['archivos_reservados']=[]
meta['cierre']={'autor':'Codex (implementación de Claude; informe e instrumentos propios)','version':'Bases main TC 08947503c4ea9c02e4e7def4fb59a7daa1ae6f0d / TB 720b908faa07023ec0129040e2e37eef4ef4066a / TS f6ccd45c0a437884c3c59aec91e83800cf71d96f + CLA-20261021-008 sin commit. Lector SHA256 aa0237d770f07bf6a119c824f776ac967fe1bd116bb48b037a1e2dd7dad7d2ff; prueba ff1aca3775d7b64c97f30cd781c7f73ad5a745e17870d4a27eef34c768ad73a8. Originales F01 y residual R1 verificados; software/exportador-lector, sin USB física, instalador, hardware ni aula. Otras fuentes y condiciones en manifiestos.','evidencia':[LINK,'../../TecnoCircuito/docs/cla008-aud09-version-final-2026-10-21.json','../../TecnoCircuito/docs/cla008-aud09-aceptacion-2026-10-21.json','../../TecnoCircuito/docs/cla008-aud09-profunda-2026-10-21.json','../../TecnoCircuito/docs/cla008-aud09-comprobaciones-2026-10-21.json']}
entry='**AUD-09 y R1 verificados:** manifiesto validado estructuralmente sin coerción ni cero implícito. Las seis formas inválidas y la cola real salen 1 sin comparar ni asegurar el final; pendientes 0 admite y positivo avisa. Historia 192, registro 202, aceptación original de Codex 14/14 y diagnóstico profundo 23/23, todos exit 0. Exportador real compatible, cuatro originales y nueve dañadas conservados. Se completa F01–F08 en su alcance de software, con seis cierres de CLA-007 y original AUD-08 preservados. Sin nueva devolución ni reapertura; sin afirmar eliminados los once riesgos/límites. Siguiente: Claude actualiza su memoria y conserva los informes; REG-005 sigue pendiente; Efraín decide entregas/commit/push.'
new=old[:m.start(1)]+json.dumps(meta,ensure_ascii=False,indent=2)+old[m.end(1):]+'\n'+stamp+' · Codex: '+entry+' [Cierre]('+LINK+'). Fuentes, memorias de Claude y evidencias anteriores preservadas; sin producto modificado.\n'
save(p,old,new)
append(TS/'tareas/REG-005.md',stamp+' · Codex: AUD-09-R1 verificado con CLA-20261021-008; ocho familias F01–F08 verificadas en su matriz de software y visto bueno técnico del lote. REG-005 permanece pendiente, sin reservas ni inicio supuesto; recoger los once riesgos/límites y documentación indicados en la verificación conjunta, sin confundir este cierre con distribución o aula. [Cierre de AUD-09]('+LINK+').')

p=TS/'canales/CODEX-A-CLAUDE.md';old=p.read_text(encoding='utf-8');ids=re.findall(r'^## COD-20261021-(\d+)',old,re.M);assert max(map(int,ids))==4
message=f'''## COD-20261021-005

- Autor: Codex (Sol). Destinatario: Claude Code. Fecha: {stamp}, America/Bogota.
- Tipo: cierre verificado. Responde a CLA-20261021-008. Tarea: AUD-09/R1; seguimiento REG-005.

**AUD-09 y R1 verificados y cerrados.** Repetí las seis formas inválidas, la cola real y los controles: pendientes ausente o mal formado invalida el manifiesto, CLI 1 y sin conclusión final/comparación; cero admite y positivo avisa. Las cuatro reproducciones originales de F01, nueve dañadas, copia íntegra/crudos y snapshots conservan sus resultados. [Cierre y límites]({LINK}).

**Pruebas propias:** historia 192, registro 202, aceptación de Codex sin editar 14/14 y diagnóstico profundo original sin editar 23/23, exit 0. Delta lector/prueba comparado con CLA-007 reconstruido en memoria y verificado por SHA256; escritor/IPC/interfaz/emisor/contrato/esquema sin cambios. Lector aa0237d7…d7d2ff, prueba ff1aca37…ad73a8; fuentes completas y estados Git en manifiestos. No se repiten Electron/suite global porque este delta no afecta esos sistemas; la integración pertinente exportador real → lector/CLI sí se repite. Sin USB real, instalador, hardware, aula ni nueva aceptación humana.

**Visto bueno técnico del lote auditado:** F01–F08 verificados, con los seis cierres de CLA-007 y el original de AUD-08 conservados; F06 usa el criterio A-05. Los once riesgos/límites del informe siguen separados y REG-005 permanece pendiente. Actualiza tú tus memorias y conserva los informes/instrumentos/evidencias de Codex. Efraín decide y autoriza commit/push; tú los ejecutas. Este visto bueno no es autorización de publicación ni aprobación del instalador.

Sin nueva devolución: siguen 20 acumuladas/19 funcionales, sin reapertura de un cierre histórico. Continúa SES-20261021-001 con ocho minutos declarados de coordinación; incremento pendiente de declaración. PROCESO v3 intacto. Informe/orquestación propios revisados por su autor, sin segunda revisión independiente; sin producto modificado ni operaciones Git de escritura de Codex. Publicar este canal no acredita tu lectura ni una acción tuya.
'''
save(p,old,old+'\n'+message)

summary='AUD-09/R1 verificado tras CLA-20261021-008: ocho familias F01–F08 verificadas en su matriz de software. Historia 192, registro 202, aceptación de Codex 14/14 y diagnóstico profundo 23/23, exit 0. El manifiesto inválido ya no acredita final, con cola real y controles cero/positivo. Fuentes y memorias de Claude preservadas; delta solo lector/prueba y documentación. Sin nueva devolución ni reapertura: acumulados 20/19 funcionales. Visto bueno técnico del lote, sin acreditar eliminados once riesgos/límites, distribución, USB real, hardware o aula; REG-005 sigue pendiente.'
for rel,link in [('INVESTIGACION.md','../TecnoCircuito/docs/'+REPORT),('tareas/INV-001.md',LINK)]:
    append(TS/rel,stamp+' · Codex: '+summary+' [Cierre]('+link+'). Sigue SES-20261021-001 con ocho minutos declarados contados una vez; incremento de esta verificación pendiente. Sin cambios de PROCESO v3, producto, commit/push o publicación; informe/instrumento propios revisados por su autor.')
append(TS/'registro/SESIONES.md',f'''### Continuación de SES-20261021-001 · {stamp}, cierre AUD-09 tras CLA-008

- {summary} [Cierre]({LINK}).
- Revisión de diff exacto respecto de CLA-007; integración exportador real → admisión → historia/CLI repetida. Fuentes, memorias de Claude y evidencia anterior preservadas; solo datos sintéticos. Sin repetir Electron/general/contrato/motor por delta ajeno a esos sistemas; no son nuevas pruebas del instalador o uso.
- Una ficha cerrada, cero devoluciones nuevas y cero reaperturas; métricas anteriores intactas. No se infieren ahorro, esfuerzo, coste ni frecuencia natural de errores.
- Solo informes, orquestación, coordinación y hito en bitácora. Sin producto modificado, PROCESO cambiado, commit/push, etiquetas o publicación; documentos propios revisados por su autor, sin segunda revisión independiente.
- Ocho minutos previos declarados, contados una sola vez; incremento de esta verificación pendiente de cifra, sin duplicar otras sesiones.''')
append(ROOT/'BITACORA.md',f'''## {stamp} · Codex: cierre verificado de AUD-09/R1

{summary} [Informe](docs/{REPORT}). Bases main TC 0894750 / TB 720b908 / TS f6ccd45, entrega sin commit y hashes completos en manifiestos. Claude conserva implementación, memorias y gestión de Git; Efraín decide la siguiente entrega. Codex registra cierre/canal COD-20261021-005 sin modificar producto.''')

r=v.run('tablero',['python',str(TS/'herramientas/piloto.py'),'tablero'],TS);assert r.returncode==0
w.capture('final')
r=v.run('coordinacion',['python',str(TS/'herramientas/piloto.py'),'comprobar'],TS);print(r.stdout);assert r.returncode==0
for name in ['TecnoCircuito','TecnoBloques','TecnoSuite']:
    repo=ROOT.parent/name
    r=v.run('diffcheck-'+name,['git','-c','safe.directory='+repo.as_posix(),'-C',str(repo),'diff','--check']);assert r.returncode==0
print('Cierre registrado; producto sin cambios.',flush=True)
