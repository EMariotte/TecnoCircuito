"""Contrasta E4/E6/E7/E9 sin modificar evidencia de Efraín."""
from pathlib import Path
import json, subprocess, xml.etree.ElementTree as ET, csv
OUT=Path(__file__).resolve().parent
TC=OUT.parents[1]; TB=TC.parent/'TecnoBloques'; E=TC/'validacion/Portatil_1'
checks=[]
def check(ok,label):
    checks.append({'ok':bool(ok),'label':label})
for suffix,args in [('txt',[]),('json',['--json'])]:
    p=subprocess.run(['node',str(TB/'herramientas/historia-registro.js'),str(E/'E7-registro'),*args],stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    check(p.returncode==0 and not p.stderr,'lector E7 '+suffix+': exit 0 y stderr vacío')
    (OUT/('historia.'+suffix)).write_bytes(p.stdout)
    if suffix=='json':j=json.loads(p.stdout)
h=j['historias'][0]
check(j['limpio'] and len(j['historias'])==1 and len(h['corridas'])==7 and not h['avisos'] and not j['problemas'],'historia E7: una sesión, siete corridas y sin avisos/problemas')
csvpath=E/'E4-monitor.csv'
with csvpath.open(encoding='utf-8-sig',newline='') as f: rows=list(csv.DictReader(f,delimiter=';'))
check(bool(rows) and all(r['origen']=='simulador' for r in rows),'CSV E4 del simulador (no acredita placa real)')
for filename,chip in [('E6-circuito.svg',False),('E6b-circuito-uno.svg',True)]:
    root=ET.parse(E/filename).getroot(); els=list(root.iter())
    classes=lambda c:[el for el in els if c in el.get('class','').split()]
    check(bool(classes('tc-firma')) and bool(classes('tc-marca-agua')) and classes('tc-marca-agua')[0].get('opacity')=='0.1',filename+': firma y marca de agua al 10%')
    check(('marca-tc' in (E/filename).read_text(encoding='utf-8'))==chip,filename+': chip según placa')
project=json.loads((E/'E9-proyecto-nano.tbq.json').read_text(encoding='utf-8'))
c=project['circuito'];r=next(p for p in c['componentes'] if p['id']=='r1')
check(c['placa']=='nano' and r['en']['2']=='placa.D12' and any(x['de']=='r1.2' and x['a']=='placa.D11' for x in c['cables']),'E9 conserva D12 enchufado y cable D11: evidencia coherente con H1')
out={'checks':checks,'csv_filas':len(rows),'historia_limpia':j['limpio'],'corridas':len(h['corridas'])}
(OUT/'evidencias.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
for c in checks:print(('OK ' if c['ok'] else 'FALLA ')+c['label'])
raise SystemExit(0 if all(c['ok'] for c in checks) else 1)
