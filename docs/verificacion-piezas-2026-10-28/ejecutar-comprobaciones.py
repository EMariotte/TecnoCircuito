"""Comprobaciones secuenciales de la auditoría; los fallos no se ocultan."""
import hashlib
import json
import subprocess
import sys
import tempfile
import time
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
results = []


def run(name, cmd, cwd=ROOT):
    start = time.monotonic()
    with (OUT / (name + '.log')).open('w', encoding='utf-8') as f:
        r = subprocess.run(cmd, cwd=cwd, stdout=f, stderr=subprocess.STDOUT,
                           encoding='utf-8', errors='replace')
    result = dict(nombre=name, comando=cmd, cwd=str(cwd), salida=r.returncode,
                  segundos=round(time.monotonic()-start, 2))
    results.append(result)
    print(json.dumps(result, ensure_ascii=False), flush=True)
    (OUT/'ejecuciones.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')


# La página histórica es autocontenida; solo se escribe una copia temporal, sin checkout.
tmp = Path(tempfile.mkdtemp(prefix='codex-pieza-2808fd8-'))
page = subprocess.run(['git','show','2808fd8:prototipo/dist/prototipo.html'],cwd=ROOT,capture_output=True,check=True).stdout
(tmp/'prototipo.html').write_bytes(page)
(OUT/'baseline.json').write_text(json.dumps(dict(revision='2808fd8',ruta='prototipo/dist/prototipo.html',
    sha256=hashlib.sha256(page).hexdigest(),temporal=str(tmp/'prototipo.html')),indent=2),encoding='utf-8')
run('diagnostico-2808fd8', [sys.executable,'-I',str(OUT/'diagnostico.py'),str(tmp/'prototipo.html'),str(OUT/'baseline-2808fd8')])

td = ROOT.parent/'TecnoDiseñador'
files=[]
for part in ['led-5mm','resistencia-axial','potenciometro-16mm','pulsador-6mm']:
    files += sorted((td/'componentes'/part/'entrega/tecnocircuito').glob('*-tc.json'))
assert len(files)==6, files
run('revisor-vistas',[sys.executable,'-I',str(ROOT/'prototipo/pruebas/revisar_vista_td.py'),*[str(f) for f in files]])
run('tb-simulador',['npm.cmd','run','test:simulador'],ROOT.parent/'TecnoBloques')
run('tb-registro-app',['npm.cmd','run','test:registro-app'],ROOT.parent/'TecnoBloques')
run('tb-test',['npm.cmd','test'],ROOT.parent/'TecnoBloques')
# El retorno de la página antigua es evidencia comparativa; los demás deben aprobar.
raise SystemExit(1 if any(r['salida'] for r in results if r['nombre']!='diagnostico-2808fd8') else 0)
