# SPDX-License-Identifier: Apache-2.0
"""Orquestación de auditoría; solo evidencia y coordinación, sin producto."""
from pathlib import Path
import datetime as dt
import hashlib
import json
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')
ROOT=Path(__file__).resolve().parents[1];TS=ROOT.parent/'TecnoSuite';DOCS=ROOT/'docs'
PREFIX='aud0708-profunda-'

def git(p,*args):
    return subprocess.run(['git','-c','safe.directory='+p.as_posix(),'-C',str(p),*args],capture_output=True,text=True,encoding='utf-8')

def run(label,args,cwd=ROOT):
    out=DOCS/(PREFIX+label+'-2026-10-21.log');assert not out.exists(),out
    r=subprocess.run(args,cwd=cwd,capture_output=True,text=True,encoding='utf-8',errors='replace')
    out.write_text('COMANDO: '+subprocess.list2cmdline(args)+'\nCWD: '+str(cwd)+'\n'+r.stdout+r.stderr+f'\nexit={r.returncode}\n',encoding='utf-8')
    print(label,'exit',r.returncode,'OK',sum(l.startswith('OK') for l in r.stdout.splitlines()),flush=True)
    return r

def initial():
    out={'utc':dt.datetime.now(dt.timezone.utc).isoformat(),'encargo':'Auditoría profunda única de CLA-20261021-005 y registro integrado, errores y riesgos con propuestas; autorización nueva de Efraín amplía la revisión acotada anterior.','repos':{}}
    for name in ['TecnoCircuito','TecnoBloques','TecnoSuite']:
        p=ROOT.parent/name;head=git(p,'rev-parse','HEAD');branch=git(p,'branch','--show-current');status=git(p,'status','--short');changed=git(p,'diff','--name-only')
        assert all(r.returncode==0 for r in [head,branch,status,changed])
        files={p/x for x in changed.stdout.splitlines()}
        if name=='TecnoCircuito':files.update((p/'docs').glob('*'));files.update(p/x for x in ['prototipo/src/simulador.js','prototipo/src/trabajador.js','prototipo/dist/tecnocircuito.js','dist/tecnocircuito.js','AGENTS.md'])
        elif name=='TecnoBloques':files.update(p/x for x in ['AGENTS.md','package.json','escritorio/registro-disco.js','escritorio/main.js','escritorio/preload.js','src/registro.js','src/app.js','herramientas/historia-registro.js','test/registro.js','test/historia-registro.js','test/registro-app.js','build.js'])
        else:files.update(p.rglob('*.md'))
        out['repos'][name]={'head':head.stdout.strip(),'branch':branch.stdout.strip(),'status':status.stdout,'archivos':{f.relative_to(p).as_posix():hashlib.sha256(f.read_bytes()).hexdigest() for f in sorted(files) if f.is_file()}}
        d=git(p,'diff','--',*(['contrato/evento.schema.json','prototipo/pruebas/probar_contrato.js','CONTRATO.md','prototipo/COMO-FUNCIONA.md'] if name=='TecnoCircuito' else ['escritorio/registro-disco.js','escritorio/main.js','escritorio/preload.js','src/registro.js','src/app.js','herramientas/historia-registro.js','test/registro.js','test/registro-app.js','test/historia-registro.js'] if name=='TecnoBloques' else ['tareas/AUD-07.md','tareas/AUD-08.md']))
        (DOCS/(PREFIX+'diff-'+name+'-2026-10-21.log')).write_text(d.stdout+d.stderr,encoding='utf-8')
    target=DOCS/(PREFIX+'version-inicio-2026-10-21.json');assert not target.exists();target.write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
    stamp=dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
    for id in ['AUD-07','AUD-08']:
        p=TS/f'tareas/{id}.md';old=p.read_text(encoding='utf-8');m=re.search(r'```json\s*\n(.*?)\n```',old,re.S);meta=json.loads(m[1]);assert meta['estado']=='en_revision' and not meta['archivos_reservados'];meta['archivos_reservados']=['TecnoCircuito:docs/AUDITORIA-PROFUNDA-AUD07-AUD08-CODEX-2026-10-21.md'];new=old[:m.start(1)]+json.dumps(meta,ensure_ascii=False,indent=2)+old[m.end(1):];new+='\n'+stamp+' · Codex: inicio de auditoría profunda única de CLA-20261021-005 por pedido directo de Efraín: amplía el alcance a errores y riesgos del registro integrado, sin implementar producto. Base TC main 0894750 / TB main 720b908 / TS main f6ccd45, cambios sin commit identificados en manifiesto. Reserva del informe compartido con la otra ficha, un solo revisor. Se cubrirán descarte, IPC, cola/recuperación, exportación/manifiestos, lector, privacidad, contrato e integración. Continúa SES-20261021-001 con 4 minutos previos declarados; nuevo incremento pendiente.\n';assert p.read_text(encoding='utf-8')==old;p.write_text(new,encoding='utf-8')
    print(json.dumps({n:{'head':d['head'],'branch':d['branch'],'status':d['status'],'archivos':{k:v for k,v in d['archivos'].items() if n=='TecnoBloques' or k=='contrato/evento.schema.json'}} for n,d in out['repos'].items() if n!='TecnoSuite'},ensure_ascii=False,indent=2))

def suites():
    commands=[('registro',['npm.cmd','--prefix','../TecnoBloques','run','test:registro']),('historia',['npm.cmd','--prefix','../TecnoBloques','run','test:historia']),('contrato',['npm.cmd','--prefix','prototipo','run','probar:contrato']),('registro-app',['npm.cmd','--prefix','../TecnoBloques','run','test:registro-app']),('preprocesador',['npm.cmd','--prefix','../TecnoBloques','run','test:registro-preprocesador']),('herramientas',['npm.cmd','--prefix','../TecnoBloques','run','test:herramientas']),('simulador',['npm.cmd','--prefix','../TecnoBloques','run','test:simulador']),('generales',['npm.cmd','--prefix','../TecnoBloques','test'])]
    results=[]
    for label,args in commands:
        r=run(label,args);results.append({'label':label,'exit':r.returncode})
    (DOCS/(PREFIX+'suites-2026-10-21.json')).write_text(json.dumps(results,indent=2),encoding='utf-8')

if __name__=='__main__':{'inicio':initial,'suites':suites}[sys.argv[1]]()
