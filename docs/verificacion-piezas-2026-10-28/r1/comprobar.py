"""Verificación acotada de CLA-20261028-002; conserva la evidencia anterior."""
import json
import os
import subprocess
import sys
import time
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
ROOT=Path(__file__).resolve().parents[3]
OUT=Path(__file__).resolve().parent
PY=sys.executable
ENV={**os.environ,'PYTHONIOENCODING':'utf-8'}
commands=[
 ('construir',['npm.cmd','run','construir'],ROOT),
 ('diagnostico',[PY,'-I',str(OUT.parent/'diagnostico.py'),str(ROOT/'prototipo/dist/prototipo.html'),str(OUT/'propio')],ROOT),
 ('piezas',[PY,'-I','pruebas/probar_piezas.py','dist/prototipo.html',str(OUT/'capturas')],ROOT/'prototipo'),
 ('enchufe',[PY,'-I','pruebas/probar_enchufe.py','dist/prototipo.html',str(OUT/'capturas')],ROOT/'prototipo'),
 ('contrato',['npm.cmd','run','probar:contrato'],ROOT/'prototipo'),
 ('tb-simulador',['npm.cmd','run','test:simulador'],ROOT.parent/'TecnoBloques'),
 ('tb-registro-app',['npm.cmd','run','test:registro-app'],ROOT.parent/'TecnoBloques'),
]
results=[]
for name,cmd,cwd in commands:
    start=time.monotonic()
    with (OUT/(name+'.log')).open('wb') as f:
        done=subprocess.run(cmd,cwd=cwd,env=ENV,stdout=f,stderr=subprocess.STDOUT)
    record=dict(nombre=name,comando=cmd,cwd=str(cwd),salida=done.returncode,segundos=round(time.monotonic()-start,2))
    results.append(record)
    (OUT/'ejecuciones.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(record,ensure_ascii=False),flush=True)
    if done.returncode:
        print((OUT/(name+'.log')).read_bytes().decode('utf-8',errors='replace')[-2500:])
        raise SystemExit(done.returncode)
