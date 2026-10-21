# SPDX-License-Identifier: Apache-2.0
"""Verifica el residual AUD-09-R1 sin modificar producto."""
from pathlib import Path
import datetime as dt
import importlib.util
import json
import re
import sys

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('evidencia',ROOT/'docs/verificar-cla007-2026-10-21.py')
v=importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)
v.PREFIX='cla008-aud09-'
REPORT='CIERRE-AUD09-CLA008-CODEX-2026-10-21.md'

def capture(label):
    v.capture(label)
    p=ROOT/f'docs/cla008-aud09-version-{label}-2026-10-21.json'
    data=json.loads(p.read_text(encoding='utf-8'))
    data['entrega']='CLA-20261021-008'
    p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

def initial():
    capture('inicio')
    p=v.TS/'tareas/AUD-09.md'
    old=p.read_text(encoding='utf-8')
    m=re.search(r'```json\s*\n(.*?)\n```',old,re.S)
    meta=json.loads(m[1])
    assert meta['estado']=='en_revision' and not meta['archivos_reservados']
    meta['archivos_reservados']=['TecnoCircuito:docs/'+REPORT]
    stamp=dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
    new=old[:m.start(1)]+json.dumps(meta,ensure_ascii=False,indent=2)+old[m.end(1):]
    new+='\n'+stamp+' · Codex: inicio de verificación de CLA-20261021-008/AUD-09-R1 por pedido de Efraín. Base y cambios previos identificados en cla008-aud09-version-inicio-2026-10-21.json. Repetir las seis formas inválidas, la cola real, los controles y las regresiones del lector/escritor. Sin producto modificado ni nueva auditoría abierta del resto. Se conservan seis cierres de CLA-007; continúa SES-20261021-001 con 8 minutos declarados, incremento pendiente.\n'
    assert p.read_text(encoding='utf-8')==old
    p.write_text(new,encoding='utf-8')
    print('Versión inicial y reserva documental registradas.',flush=True)

def tests():
    commands=[
      ('historia',['npm.cmd','--prefix','../TecnoBloques','run','test:historia']),
      ('registro',['npm.cmd','--prefix','../TecnoBloques','run','test:registro']),
      ('aceptacion',['node','docs/diagnosticar-cla007-aceptacion-2026-10-21.cjs','docs/cla008-aud09-aceptacion-2026-10-21.json']),
      ('profunda',['node','docs/diagnosticar-aud0708-profunda-2026-10-21.cjs','docs/cla008-aud09-profunda-2026-10-21.json'])
    ]
    results=[]
    for label,args in commands:
        r=v.run(label,args)
        results.append({'label':label,'exit':r.returncode})
    v.artifact('comprobaciones',results)

if __name__=='__main__':
    {'inicio':initial,'pruebas':tests,'final':lambda:capture('final')}[sys.argv[1]]()
