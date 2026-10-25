"""Captura reproducible de auditoría; no modifica fuentes de producto."""
import hashlib, json, pathlib, subprocess, sys, datetime
ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs' / 'reg005-auditoria-2026-10-22'
OUT.mkdir(exist_ok=True)
CODES = []
def git(repo, *args):
    return subprocess.run(['git', '-c', 'safe.directory='+repo.as_posix(), '-C', str(repo), *args], capture_output=True).stdout
def snapshot(tag):
    result = {'utc': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'repos': {}}
    for name in ['TecnoCircuito', 'TecnoBloques', 'TecnoSuite']:
        repo = ROOT.parent / name
        files = git(repo, 'ls-files', '-z').decode('utf8').split('\0')
        hashes = {f: hashlib.sha256((repo/f).read_bytes()).hexdigest() for f in files if f and (repo/f).is_file()}
        result['repos'][name] = {'head':git(repo, 'rev-parse','HEAD').decode().strip(), 'branch':git(repo,'branch','--show-current').decode().strip(), 'status':git(repo,'status','--short').decode('utf8'), 'sha256': hashes}
        (OUT/(tag+'-diff-'+name+'.patch')).write_bytes(git(repo, 'diff','--no-ext-diff','--binary'))
    (OUT/(tag+'-version.json')).write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
    print('snapshot',tag,flush=True)
def run(name, repo, command):
    with (OUT/(name+'.log')).open('wb') as log:
        p=subprocess.run(command,cwd=ROOT.parent/repo,stdout=log,stderr=subprocess.STDOUT,shell=True)
    record={'name':name,'command':command,'cwd':repo,'exit':p.returncode}
    CODES.append(p.returncode)
    with (OUT/'ejecuciones.jsonl').open('a',encoding='utf8') as f: f.write(json.dumps(record)+'\n')
    print(json.dumps(record),flush=True)
if __name__ == '__main__':
    if sys.argv[1]=='snapshot': snapshot(sys.argv[2])
    elif sys.argv[1]=='tc': run('tc-suite-completa','TecnoCircuito','npm.cmd run probar')
    elif sys.argv[1]=='registro-tc': run('tc-registro-repeticion','TecnoCircuito','python -I prototipo/pruebas/probar_registro.py prototipo/dist/prototipo.html prototipo/pruebas/capturas')
    elif sys.argv[1]=='electron': run('diagnostico-electron','TecnoCircuito','node docs/diagnosticar-reg005-electron-2026-10-22.cjs')
    elif sys.argv[1]=='node': run('diagnostico-node','TecnoCircuito','node docs/diagnosticar-reg005-2026-10-22.cjs')
    elif sys.argv[1]=='historicos':
        run('aceptacion-historica','TecnoCircuito','node docs/diagnosticar-cla007-aceptacion-2026-10-21.cjs docs/reg005-auditoria-2026-10-22/aceptacion-historica.json')
        run('profunda-historica','TecnoCircuito','node docs/diagnosticar-aud0708-profunda-2026-10-21.cjs docs/reg005-auditoria-2026-10-22/profunda-historica.json')
    elif sys.argv[1]=='tb':
        for name,cmd in [('registro','test:registro'),('historia','test:historia'),('preprocesador','test:registro-preprocesador'),('registro-app','test:registro-app'),('simulador','test:simulador'),('graficador','test:graficador')]:
            run('tb-'+name,'TecnoBloques','npm.cmd run '+cmd)
        run('tb-generales','TecnoBloques','npm.cmd test')
    sys.exit(1 if any(CODES) else 0)
