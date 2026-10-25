"""Comprueba preservación y deja las huellas de evidencias de auditoría."""
import hashlib, json, pathlib, re
ROOT=pathlib.Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/reg005-auditoria-2026-10-22'
a=json.loads((OUT/'inicio-version.json').read_text(encoding='utf-8'))
b=json.loads((OUT/'final-version.json').read_text(encoding='utf-8'))
expected={
 'TecnoCircuito':{'BITACORA.md'},
 'TecnoBloques':{'BITACORA.md'},
 'TecnoSuite':{'TABLERO.md','INVESTIGACION.md','canales/CODEX-A-CLAUDE.md','registro/SESIONES.md','tareas/INV-001.md','tareas/REG-005.md'},
}
changes={n:[f for f,h in r['sha256'].items() if b['repos'][n]['sha256'].get(f)!=h] for n,r in a['repos'].items()}
unexpected={n:[f for f in fs if f not in expected[n]] for n,fs in changes.items()}
assert not any(unexpected.values()),unexpected
assert all(a['repos'][n]['sha256'].get('CLAUDE.md')==b['repos'][n]['sha256'].get('CLAUDE.md') for n in a['repos'])
report=ROOT/'docs/AUDITORIA-REG005-CODEX-2026-10-22.md'
links=[]
for link in re.findall(r'\]\(([^)]+)\)',report.read_text(encoding='utf-8')):
    if not re.match(r'https?://',link):
        target=(report.parent/link.split('#')[0]).resolve()
        links.append({'link':link,'exists':target.exists()})
assert all(l['exists'] for l in links),links
artifacts={}
for p in [ROOT/'prototipo/dist/tecnocircuito.js',ROOT/'prototipo/dist/prototipo.html',ROOT/'dist/tecnocircuito.js',ROOT.parent/'TecnoBloques/dist/TecnoBloques.html']:
    if p.is_file(): artifacts[str(p.relative_to(ROOT.parent))]=hashlib.sha256(p.read_bytes()).hexdigest()
stats={}
for p in OUT.glob('*.log'):
    t=p.read_text(encoding='utf-8',errors='replace')
    stats[p.name]={'OK':len(re.findall(r'^OK\s',t,re.M)),'FALLA':len(re.findall(r'^FALLA',t,re.M))}
doc={'changes':changes,'unexpected':unexpected,'memoriasClaudeIguales':True,'fuentesProductoIguales':True,'links':links,'artifactsSHA256':artifacts,'logCounts':stats}
(OUT/'preservacion.json').write_text(json.dumps(doc,ensure_ascii=False,indent=2),encoding='utf-8')
evidences=[p for p in OUT.iterdir() if p.is_file() and p.name!='huellas-evidencia.json']+[report,ROOT/'docs/auditar-reg005-2026-10-22.py',ROOT/'docs/diagnosticar-reg005-2026-10-22.cjs',ROOT/'docs/diagnosticar-reg005-electron-2026-10-22.cjs',pathlib.Path(__file__)]
(OUT/'huellas-evidencia.json').write_text(json.dumps({p.relative_to(ROOT).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in evidences},indent=2),encoding='utf-8')
print(json.dumps({'changes':changes,'unexpected':unexpected,'linksChecked':len(links),'artifacts':len(artifacts)},ensure_ascii=True))
