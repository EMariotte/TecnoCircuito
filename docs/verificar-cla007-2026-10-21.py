# SPDX-License-Identifier: Apache-2.0
"""Evidencia de verificación de CLA-20261021-007; no modifica producto."""
from pathlib import Path
import datetime as dt
import hashlib
import json
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parents[1]
TS = ROOT.parent / 'TecnoSuite'
DOCS = ROOT / 'docs'
PREFIX = 'cla007-verificacion-'
DATE = '2026-10-21'
IDS = ['AUD-07', 'AUD-09', 'AUD-10', 'AUD-11', 'AUD-12', 'AUD-13', 'AUD-14']
REPORT = 'VERIFICACION-CLA007-AUD07-AUD09-AUD14-CODEX-2026-10-21.md'

def git(p, *args):
    return subprocess.run(['git', '-c', 'safe.directory='+p.as_posix(), '-C', str(p), *args], capture_output=True, text=True, encoding='utf-8', errors='replace')

def artifact(label, value):
    p = DOCS / (PREFIX + label + '-' + DATE + '.json')
    assert not p.exists(), p
    p.write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')

def run(label, args, cwd=ROOT):
    p = DOCS / (PREFIX+label+'-'+DATE+'.log')
    assert not p.exists(), p
    started = dt.datetime.now(dt.timezone.utc).isoformat()
    r = subprocess.run(args, cwd=cwd, capture_output=True, text=True, encoding='utf-8', errors='replace')
    p.write_text('UTC: '+started+'\nCOMANDO: '+subprocess.list2cmdline(args)+'\nCWD: '+str(cwd)+'\n'+r.stdout+r.stderr+f'\nexit={r.returncode}\n', encoding='utf-8')
    print(label, 'exit', r.returncode, 'OK', sum(l.startswith('OK') for l in r.stdout.splitlines()), flush=True)
    return r

def capture(label):
    out = {'utc': dt.datetime.now(dt.timezone.utc).isoformat(), 'entrega': 'CLA-20261021-007', 'repos': {}}
    for name in ['TecnoCircuito', 'TecnoBloques', 'TecnoSuite']:
        p = ROOT.parent / name
        responses = [git(p, *a) for a in [('rev-parse','HEAD'), ('branch','--show-current'), ('status','--short'), ('ls-files',)]]
        assert all(r.returncode == 0 for r in responses)
        files = {p / x for x in responses[3].stdout.splitlines()}
        if name == 'TecnoCircuito':
            files.update((p / 'docs').glob('*'))
            files.add(p / 'prototipo/dist/tecnocircuito.js')
        if name == 'TecnoBloques':
            files.add(p / 'dist/TecnoBloques.html')
        if name == 'TecnoSuite':
            files.update(p.rglob('*.md'))
        out['repos'][name] = {'head': responses[0].stdout.strip(), 'branch': responses[1].stdout.strip(), 'status': responses[2].stdout, 'archivos': {f.relative_to(p).as_posix(): hashlib.sha256(f.read_bytes()).hexdigest() for f in sorted(files) if f.is_file()}}
        d = git(p, 'diff', '--no-ext-diff')
        (DOCS / (PREFIX+'diff-'+name+'-'+label+'-'+DATE+'.log')).write_text(d.stdout+d.stderr, encoding='utf-8')
    artifact('version-'+label, out)
    return out

def initial():
    out = capture('inicio')
    stamp = dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
    for id in IDS:
        p = TS / f'tareas/{id}.md'
        old = p.read_text(encoding='utf-8')
        m = re.search(r'```json\s*\n(.*?)\n```', old, re.S)
        meta = json.loads(m[1])
        assert meta['estado'] == 'en_revision' and not meta['archivos_reservados']
        meta['archivos_reservados'] = ['TecnoCircuito:docs/'+REPORT]
        new = old[:m.start(1)]+json.dumps(meta,ensure_ascii=False,indent=2)+old[m.end(1):]
        new += '\n'+stamp+' · Codex: inicio de verificación conjunta de CLA-20261021-007 por pedido de Efraín: comprobar cada hallazgo F01–F08, regresiones y dependencias, distinguiendo la decisión A-05 (aviso por equipo) de la aceptación anterior. Sin implementar producto. Git, cambios existentes y hashes identificados en cla007-verificacion-version-inicio-2026-10-21.json; informe compartido por un solo revisor. Continúa SES-20261021-001 con 6 minutos declarados; incremento de esta verificación pendiente.\n'
        assert p.read_text(encoding='utf-8') == old
        p.write_text(new, encoding='utf-8')
    print(json.dumps({n: {'head':d['head'], 'branch':d['branch'], 'archivos':len(d['archivos'])} for n,d in out['repos'].items()}, indent=2))

def suites():
    commands = [('registro',['npm.cmd','--prefix','../TecnoBloques','run','test:registro']), ('historia',['npm.cmd','--prefix','../TecnoBloques','run','test:historia']), ('contrato',['npm.cmd','--prefix','prototipo','run','probar:contrato']), ('registro-app',['npm.cmd','--prefix','../TecnoBloques','run','test:registro-app']), ('preprocesador',['npm.cmd','--prefix','../TecnoBloques','run','test:registro-preprocesador']), ('herramientas',['npm.cmd','--prefix','../TecnoBloques','run','test:herramientas']), ('simulador',['npm.cmd','--prefix','../TecnoBloques','run','test:simulador']), ('generales',['npm.cmd','--prefix','../TecnoBloques','test'])]
    results = []
    for label,args in commands:
        r = run(label,args)
        results.append({'label':label,'exit':r.returncode})
    artifact('suites',results)

if __name__ == '__main__':
    {'inicio': initial, 'suites': suites, 'final': lambda: capture('final')}[sys.argv[1]]()
