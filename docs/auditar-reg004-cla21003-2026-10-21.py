# SPDX-License-Identifier: Apache-2.0
"""Verificación acotada de CLA-20261021-003; solo casos acordados y regresiones."""
from pathlib import Path
import datetime as dt
import hashlib
import importlib.util
import json
import os
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')
TC=Path(__file__).resolve().parents[1]
TS=TC.parent/'TecnoSuite'
DOCS=TC/'docs'
PREFIX='reg004-cla21003-'

def git(p,*args):
    return subprocess.run(['git','-c','safe.directory='+p.as_posix(),'-C',str(p),*args],capture_output=True,text=True,encoding='utf-8')

def run(label,args,cwd=TC):
    r=subprocess.run(args,cwd=cwd,capture_output=True,text=True,encoding='utf-8',errors='replace')
    log=DOCS/(PREFIX+label+'-2026-10-21.log')
    assert not log.exists(), log
    log.write_text('COMANDO: '+subprocess.list2cmdline(args)+'\nCWD: '+str(cwd)+'\n'+r.stdout+r.stderr+f'\nexit={r.returncode}\n',encoding='utf-8')
    print(label,'exit',r.returncode,'OK',sum(l.startswith('OK') for l in r.stdout.splitlines()),flush=True)
    return r

def initial():
    out={'utc':dt.datetime.now(dt.timezone.utc).isoformat(),'alcance':'INT-RES-03c, controles acordados y regresiones existentes; sin buscar casos nuevos','repos':{}}
    for name in ['TecnoCircuito','TecnoBloques','TecnoSuite']:
        p=TC.parent/name
        head=git(p,'rev-parse','HEAD');branch=git(p,'branch','--show-current');status=git(p,'status','--short');changed=git(p,'diff','--name-only')
        assert not any(r.returncode for r in [head,branch,status,changed])
        fs={p/x for x in changed.stdout.splitlines()}
        if name=='TecnoCircuito':fs.update((p/'docs').glob('*'));fs.update(p/x for x in ['dist/tecnocircuito.js','prototipo/src/trabajador.js','prototipo/src/nucleo.js','validacion/2026-10-20-reg004-aceptacion.md'])
        if name=='TecnoSuite':fs.update(p.rglob('*.md'))
        if name=='TecnoBloques':fs.update(p/x for x in ['src/registro.js','escritorio/registro-disco.js','package.json','test/simulador.js'])
        out['repos'][name]={'head':head.stdout.strip(),'branch':branch.stdout.strip(),'status':status.stdout,'archivos':{f.relative_to(p).as_posix():hashlib.sha256(f.read_bytes()).hexdigest() for f in sorted(fs) if f.is_file()}}
        diff=git(p,'diff','--',*(['prototipo/src/simulador.js','contrato/evento.schema.json','prototipo/pruebas/probar_fotos.js','prototipo/pruebas/probar_contrato.js','CONTRATO.md'] if name=='TecnoCircuito' else ['herramientas/historia-registro.js','test/historia-registro.js','src/app.js','test/registro-app.js'] if name=='TecnoBloques' else ['tareas/REG-004.md']))
        (DOCS/(PREFIX+'diff-'+name+'-2026-10-21.log')).write_text(diff.stdout+diff.stderr,encoding='utf-8')
    target=DOCS/(PREFIX+'version-inicio-2026-10-21.json');assert not target.exists();target.write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
    p=TS/'tareas/REG-004.md';old=p.read_text(encoding='utf-8');m=re.search(r'```json\s*\n(.*?)\n```',old,re.S);meta=json.loads(m[1]);assert meta['estado']=='en_revision' and not meta['archivos_reservados']
    meta['archivos_reservados']=['TecnoCircuito:docs/VERIFICACION-REG004-CLA21003-CODEX-2026-10-21.md']
    stamp=dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
    new=old[:m.start(1)]+json.dumps(meta,ensure_ascii=False,indent=2)+old[m.end(1):]
    new+='\n'+stamp+' · Codex: inicio de verificación de CLA-20261021-003, limitada por pedido de Efraín a INT-RES-03c, sus controles acordados y regresiones existentes; sin buscar casos nuevos. Bases TC main 56baf57 / TB main 86433d1 / TS main 5665e60; cambios sin commit identificados en manifiesto. Reserva exclusivamente documental. Continúa SES-20261021-001 con 2 minutos previos de coordinación declarados y nuevo incremento pendiente. Sin implementación de producto.\n'
    assert p.read_text(encoding='utf-8')==old;p.write_text(new,encoding='utf-8')
    print(json.dumps({name:{'head':d['head'],'branch':d['branch'],'status':d['status'],'hashes':{k:v for k,v in d['archivos'].items() if k in ['herramientas/historia-registro.js','test/historia-registro.js','prototipo/src/simulador.js','contrato/evento.schema.json','CONTRATO.md','prototipo/dist/tecnocircuito.js']}} for name,d in out['repos'].items()},ensure_ascii=False,indent=2))

def suites():
    commands=[('fotos',['npm.cmd','--prefix','prototipo','run','probar:fotos']),('contrato',['npm.cmd','--prefix','prototipo','run','probar:contrato']),('historia',['npm.cmd','--prefix','../TecnoBloques','run','test:historia']),('registro-app',['npm.cmd','--prefix','../TecnoBloques','run','test:registro-app']),('registro',['npm.cmd','--prefix','../TecnoBloques','run','test:registro']),('simulador',['npm.cmd','--prefix','../TecnoBloques','run','test:simulador'])]
    for label,cmd in commands:
        r=run(label,cmd)
        if r.returncode:raise SystemExit(r.returncode)

def replay():
    spec=importlib.util.spec_from_file_location('prev',DOCS/'auditar-reg004-cla21001-2026-10-21.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
    src=m.WRAPPER.read_text(encoding='utf-8').replace('reg004-cla21001-replay-','reg004-cla21003-replay-')
    src=src.replace(' }return v;};', "  v=v.replace('cierre(3,[fallo]),cierre(4,[fallo])', 'cierre(3,[fallo]),cierre(3,[fallo])');\n }return v;};")
    m.WRAPPER.write_text(src,encoding='utf-8')
    results=[]
    for label,file,arg in [('ampliacion-anterior',m.TEMP/'reg004-cla009-ampliacion-2026-10-20.cjs',[]),('bordes-anteriores',m.TEMP/'reg004-cla009-bordes-integridad-2026-10-20.cjs',[])]+[('historico-'+a,DOCS/'verificar-reg004-cla004-2026-10-20.cjs',[a]) for a in ['original','residuales','cierres','ampliacion','originales','adicionales','bordes','lienzo']]:
        r=run(label,['node',str(m.WRAPPER),str(file),*arg]);results.append({'caso':label,'exit':r.returncode});assert r.returncode==0
    (DOCS/(PREFIX+'replay-ejecuciones-2026-10-21.json')).write_text(json.dumps({'scratch':str(m.SCRATCH),'resultados':results},ensure_ascii=False,indent=2),encoding='utf-8')

if __name__=='__main__':
    {'inicio':initial,'suites':suites,'replay':replay}[sys.argv[1]]()
