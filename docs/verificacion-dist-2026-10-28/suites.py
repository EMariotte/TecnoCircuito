"""Corre regresiones existentes secuencialmente y conserva stdout/stderr y códigos."""
from pathlib import Path
import subprocess,json,os,sys
sys.stdout.reconfigure(encoding='utf-8',errors='replace')
OUT=Path(__file__).resolve().parent
TB=OUT.parents[1].parent/'TecnoBloques'
commands=[('npm-test',['npm.cmd','test']),('test-app',['npm.cmd','run','test:app'])]
results=[]
for label,cmd in commands:
    p=subprocess.run(cmd,cwd=TB,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,env={**os.environ,'PYTHONIOENCODING':'utf-8'},timeout=300)
    text=p.stdout.decode('utf-8',errors='replace')
    (OUT/(label+'.txt')).write_text(text,encoding='utf-8')
    results.append({'suite':label,'command':cmd,'exit_code':p.returncode})
    (OUT/'suites.json').write_text(json.dumps(results,indent=2)+'\n',encoding='utf-8')
    print(label,'exit',p.returncode,flush=True)
    print(text[-3500:],flush=True)
    if p.returncode:break
(OUT/'suites.json').write_text(json.dumps(results,indent=2)+'\n',encoding='utf-8')
raise SystemExit(1 if any(x['exit_code'] for x in results) else 0)
