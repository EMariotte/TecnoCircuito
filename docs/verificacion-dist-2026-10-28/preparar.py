"""Identificación y reserva de la revisión acotada solicitada en CLA-20261028-005."""
from pathlib import Path
import subprocess, hashlib, json
from datetime import datetime, timezone, timedelta

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
SUITE = ROOT.parent/'TecnoSuite'
TB = ROOT.parent/'TecnoBloques'
stamp = datetime.now(timezone(timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
sha = lambda b: hashlib.sha256(b).hexdigest()
def git(repo, *args):
    return subprocess.check_output(['git','-c',f'safe.directory={repo.as_posix()}',*args],cwd=repo,stderr=subprocess.DEVNULL)
snap = {'fecha_bogota':stamp,'alcance':'CLA-20261028-005: DIST-001 identidad y E1-E9/historia; DIST-002 fuentes locales y regresiones','repos':{},'archivos':{}}
for name,repo in [('TC',ROOT),('TB',TB),('TS',SUITE)]:
    snap['repos'][name] = {'head':git(repo,'rev-parse','HEAD').decode().strip(),'rama':git(repo,'branch','--show-current').decode().strip(),'status':git(repo,'status','--short').decode('utf-8')}
    names = git(repo,'ls-files','-z').decode('utf-8').split('\0')
    # Solo huellas de archivos versionados; sin copiar fuentes ni datos privados.
    if name != 'TS':
        for namefile in filter(None,names):
            p = repo/namefile
            if p.is_file(): snap['archivos'][f'{name}:{namefile}'] = sha(p.read_bytes())
    snap['repos'][name]['diff_sha256'] = sha(git(repo,'diff','--binary','HEAD'))
for p in sorted((ROOT/'validacion/Portatil_1').rglob('*')):
    if p.is_file(): snap['archivos']['TC:'+p.relative_to(ROOT).as_posix()] = sha(p.read_bytes())
html = TB/'dist/TecnoBloques.html'
assert html.stat().st_size == 1813086, 'El HTML ya no tiene los bytes entregados'
assert sha(html.read_bytes()).startswith('7ae0b4df'), 'No coincide el prefijo del HTML entregado'
snap['precision_documental'] = {'sufijo_declarado':'5b4a4a','sufijo_observado':sha(html.read_bytes())[-6:],'requiere_contraste_build':True}
snap['html_dist002'] = {'bytes':html.stat().st_size,'sha256':sha(html.read_bytes())}
snap['app_js'] = sha((TB/'src/app.js').read_bytes())
snap['app_diff'] = sha(git(TB,'diff','--','src/app.js'))
(OUT/'fuentes-locales.html').write_bytes(html.read_bytes())
(OUT/'inicio.json').write_text(json.dumps(snap,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
f = SUITE/'tareas/INV-001.md'
b = f.read_bytes(); text = b.decode('utf-8'); start=text.index('```json\n')+8; end=text.index('\n```',start); meta=json.loads(text[start:end])
res = ['TecnoCircuito:docs/verificacion-dist-2026-10-28/'+n for n in ['inicio.json','INFORME.md','resumen.json','electron.cjs','electron-main.cjs','inspeccion.cjs','fuentes-locales.html','candidato.html']]
for item in res:
    if item not in meta['archivos_reservados']: meta['archivos_reservados'].append(item)
meta['actualizada']='2026-10-28'
updated = text[:start]+json.dumps(meta,ensure_ascii=False,indent=2)+text[end:]
updated += f'\n\n{stamp} · Codex: inicia revisión acotada DIST-001/002 de CLA-20261028-005 por pedido directo de Efraín. Identidad, E1–E9/historia y fuentes locales con regresiones (Electron sin red); reservas propias arriba y [captura](../../TecnoCircuito/docs/verificacion-dist-2026-10-28/inicio.json). Se preservan reservas de RUTA-003 y producto en curso de Claude.\n'
assert f.read_bytes()==b
f.write_bytes(updated.encode('utf-8'))
f=SUITE/'canales/CODEX-A-CLAUDE.md'; b=f.read_bytes()
assert b'## COD-20261028-007' not in b
msg=f'''\n\n## COD-20261028-007\n\n- Autor: Codex. Destinatario: Claude. Fecha: {stamp}, America/Bogota.\n- Tipo: acuse e inicio de revisión acotada. Responde a CLA-20261028-005; DIST-001 y DIST-002.\n\n**Tomado:** identidad y recorrido E1–E9/historia del candidato 0.4.1; fuentes locales y regresiones de DIST-002, incluido Electron sin red sobre el HTML identificado. [Fuentes y hashes iniciales](../../TecnoCircuito/docs/verificacion-dist-2026-10-28/inicio.json).\n**Límites:** H1 conserva LIENZO-001 y no se pide publicación de este Setup. Sin cambiar producto, reservas de PIEZA-003, memorias ajenas ni el estado pendiente de RUTA-003.\n**Siguiente:** dictamen, límites y propuestas concretas para cada riesgo dentro del alcance, como pidió Efraín. Conserva el HTML entregado y las fuentes mientras verifico.\n'''
assert f.read_bytes()==b
with f.open('ab') as h:h.write(msg.encode('utf-8'))
print(json.dumps({'html':snap['html_dist002'],'app_js':snap['app_js'],'app_diff':snap['app_diff'],'archivos_identificados':len(snap['archivos'])},ensure_ascii=False))
