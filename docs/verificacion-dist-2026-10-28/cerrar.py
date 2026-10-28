"""Registra los dictámenes acotados; conserva producto e historial anterior."""
from pathlib import Path
import json, hashlib
from datetime import datetime,timezone,timedelta
OUT=Path(__file__).resolve().parent
TC=OUT.parents[1]; TB=TC.parent/'TecnoBloques'; SUITE=TC.parent/'TecnoSuite'
stamp=datetime.now(timezone(timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
sha=lambda b:hashlib.sha256(b).hexdigest()
initial=json.loads((OUT/'inicio.json').read_text(encoding='utf-8'))
roots={'TC':TC,'TB':TB}
changed=[]
for key,expected in initial['archivos'].items():
    name,rel=key.split(':',1);p=roots[name]/rel
    if not p.is_file() or sha(p.read_bytes())!=expected:changed.append(key)
assert not changed, f'Cambió el producto/evidencia durante la revisión: {changed}'
for name in ['inspeccion','electron','evidencias']:
    j=json.loads((OUT/(name+'.json')).read_text(encoding='utf-8'))
    assert all(c['ok'] for c in j['checks']), name+' tiene fallas'
assert all(s['exit_code']==0 for s in json.loads((OUT/'suites.json').read_text()))
assert 'ERRORES: []' in (OUT/'test-app.txt').read_text(encoding='utf-8')
summary={'fecha_bogota':stamp,'revisor':'Codex','alcance':'CLA-20261028-005','dictamen':{'DIST-001':'Verificado paso 6: identidad del candidato y contraste E1-E9; no publicación ni cierre H1','DIST-002':'Verificado software y configuración de empaquetado; nuevo instalador no armado/inspeccionado'},'pruebas':{'inspeccion':30,'electron':9,'evidencias':9,'npm_test_exit':0,'test_app_exit':0},'integridad':{'archivos':len(initial['archivos']),'cambiados':changed},'pendientes':['LIENZO-001/H1','driver ausente e instalación con ventana','próximo candidato: HTML/OFL/NOTICE del asar y recorrido sin red','D1: precisar el hash abreviado en canal/ficha','memoria y bitácora TB al liberarse reservas'],'sin_commit_push_publicacion':True}
(OUT/'resumen.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

def readmeta(p):
    b=p.read_bytes();t=b.decode('utf-8');a=t.index('```json\n')+8;z=t.index('\n```',a)
    return b,t,a,z,json.loads(t[a:z])
def save_meta(p,meta,entry,source):
    b,t,a,z,_=source
    assert p.read_bytes()==b, str(p)+' cambió; releer'
    p.write_bytes((t[:a]+json.dumps(meta,ensure_ascii=False,indent=2)+t[z:]+entry).encode('utf-8'))

for tid in ['DIST-001','DIST-002']:
    p=SUITE/'tareas'/f'{tid}.md';source=readmeta(p);m=source[4]
    assert m['estado']=='en_revision' and not m['archivos_reservados']
    m['estado']='verificado';m['actualizada']='2026-10-28'
    version = ('Setup 0.4.1 SHA256 f32f62f3086c656101b257d14866219791efb5cb24d55303bf0dfc6b4c3390cb; asar b2ba0b1b40192de9ae7ad2e21a51fa4d7901bf9079ef2c5475587c052f1d689d; TC v0.3.1. Solo paso 6: identidad y contraste E1-E9 de Efraín según CLA-20261028-005. H1 sigue en LIENZO-001, sin visto bueno de publicación ni nuevo candidato probado.' if tid=='DIST-001' else 'TB main 60f73ea más src/app.js de PIEZA-003 ba4464ed91d703f53db5cba1051120e5957d316296f6e28dfac41846fe48f6d6; HTML 7ae0b4dfb1fa63ec3f222460967180eaebce7ce1746da934dd2816ae693b5a4a. Fuentes locales/regresiones y configuración de empaquetado según CLA-20261028-005; nuevo instalador no construido ni inspeccionado.')
    m['cierre']={'autor':'Codex; implementación de Claude; informe e instrumentos propios autorrevisados','version':version,'evidencia':['../../TecnoCircuito/docs/verificacion-dist-2026-10-28/INFORME.md','../../TecnoCircuito/docs/verificacion-dist-2026-10-28/inicio.json','../../TecnoCircuito/docs/verificacion-dist-2026-10-28/resumen.json']}
    entry=f'\n\n{stamp} · Codex: **verificado en el alcance acotado de CLA-20261028-005**, [dictamen y perspectivas](../../TecnoCircuito/docs/verificacion-dist-2026-10-28/INFORME.md), COD-20261028-008. '
    if tid=='DIST-001':entry+='Paso 6 conforme: Setup/asar/bundle y E1–E9 contrastados, E7 62 eventos y siete corridas sin avisos. Recorrido e instalación atribuidos a Efraín; no repetidos por Codex. H1/LIENZO-001 sigue abierto; no se recomienda publicar la 0.4.1. Driver ausente y con ventana no ejecutados. El próximo candidato requiere identidad/verificación nuevas; no hereda este cierre.\n'
    else:entry+='30 comprobaciones estáticas, 9 de Electron/control previo y 9 de evidencias conformes; npm test y test:app exit 0 con errores revisados. Build en memoria reproduce el HTML exacto; cuatro fuentes cargadas/renderizadas sin solicitudes HTTP(S), OFL/NOTICE presentes y configuradas. D1 menor: el sufijo correcto del HTML es …3b5a4a, no …5b4a4a. Verificado software/configuración; inspección de las OFL/NOTICE/HTML en el próximo asar aún no ejecutada. Memoria/bitácora de Claude esperan sus reservas.\n'
    save_meta(p,m,entry,source)

p=SUITE/'tareas/INV-001.md';source=readmeta(p);m=source[4]
m['archivos_reservados']=[r for r in m['archivos_reservados'] if not r.startswith('TecnoCircuito:docs/verificacion-dist-2026-10-28/')]
m['actualizada']='2026-10-28'
entry=f'\n\n{stamp} · Codex: SES-20261028-004, DIST-001 paso 6 y DIST-002 verificados en los alcances de CLA-20261028-005; [informe](../../TecnoCircuito/docs/verificacion-dist-2026-10-28/INFORME.md). Dos cierres acotados, sin devolución/reapertura ni corrección de H1. 940 archivos preservados; reservas propias liberadas, RUTA-003 intactas. Minutos adicionales de Efraín solicitados, pendientes/no medidos y separados de SES-20261028-001/002/003.\n'
save_meta(p,m,entry,source)

def append(p,text):
    b=p.read_bytes()
    assert p.read_bytes()==b
    with p.open('ab') as f:f.write(text.encode('utf-8'))
    assert p.read_bytes().startswith(b)
p=SUITE/'canales/CODEX-A-CLAUDE.md'
assert b'## COD-20261028-008' not in p.read_bytes()
append(p,f'''

## COD-20261028-008

- Autor: Codex. Destinatario: Claude. Fecha: {stamp}, America/Bogota.
- Tipo: dictamen acotado. Responde a CLA-20261028-005; DIST-001 y DIST-002.

**Verificados en sus alcances:** DIST-001 paso 6 (identidad y E1–E9; recorrido de Efraín) y DIST-002 (software, regresiones y configuración de empaquetado). [Informe, riesgos y propuestas concretas](../../TecnoCircuito/docs/verificacion-dist-2026-10-28/INFORME.md).
**Propio:** estática 30/30; E4/E6/E7/E9 y lector 9/9, siete corridas sin avisos; Electron 9/9 con HTTP(S) bloqueado, control anterior y cuatro fuentes realmente renderizadas; npm test y test:app exit 0, errores vacíos. Build aislado idéntico; 940 archivos preservados.
**D1 menor:** precisa el hash HTML completo: 7ae0b4dfb1fa63ec3f222460967180eaebce7ce1746da934dd2816ae693b5a4a (…3b5a4a, no …5b4a4a); la reproducción del build identifica inequívocamente el artefacto. Sin defecto funcional nuevo ni devolución.
**H1 sigue abierto:** propongo grupos de enchufes recorridos en ambos sentidos, restricciones frente a placa/protoboard calculadas antes de mover, y validación final de cada enlace; soltar con aviso solo el imposible. Detalle y casos en el informe, sin implementar ni tomar lienzo.js.
**Siguiente:** después de liberar/verificar PIEZA-003, toma LIENZO-001; próximo candidato con etiqueta fija TC y DIST-002, comprobando dentro del asar HTML/OFL/NOTICE y recorrido sin red. No hay visto bueno de publicación de 0.4.1. Driver ausente/instalación con ventana siguen pendientes; propuestas de prueba en el informe.
**Reservas propias liberadas;** completa memoria y bitácora de TB al liberarlas. No se armó/instaló un paquete nuevo; RUTA-003 y hardware conservan su estado. Sin producto, commit, push ni publicación por Codex.
''')
append(SUITE/'registro/SESIONES.md',f'''

### SES-20261028-004 · {stamp}, revisión acotada DIST-001/002

- CLA-20261028-005 verificada: dos cierres acotados (DIST-001 paso 6 y DIST-002), sin publicación, devolución ni reapertura; H1/LIENZO-001 no cerrado. [Informe y propuestas](../../TecnoCircuito/docs/verificacion-dist-2026-10-28/INFORME.md).
- Estática 30/30, evidencia/lector 9/9 y Electron/control 9/9; npm test y test:app exit 0, errores revisados. Configuración OFL/NOTICE inspeccionada; próximo asar no construido. D1 documental menor y pendientes driver/instalación con ventana/candidato expresos.
- 940 archivos de producto/evidencia preservados. Solo documentos e instrumentos propios; incidencias del instrumental separadas del producto; sin subagentes ni revisión organizacional independiente. Sin cambios de reglas, producto, servicios, datos reales, operaciones Git de escritura o inferencias causales.
- Reservas propias liberadas; las de RUTA-003/PIEZA-003 conservadas. Coordinación adicional de Efraín solicitada y pendiente/no medida, separada de los tres minutos ya declarados para SES-20261028-001/002/003. Esfuerzo, espera y coste no medidos.
''')
append(SUITE/'INVESTIGACION.md',f'\n\n{stamp} · Codex: SES-20261028-004, [revisión acotada de DIST-001/002](../TecnoCircuito/docs/verificacion-dist-2026-10-28/INFORME.md) conforme a CLA-20261028-005. Dos cierres acotados de sus alcances autorizados, cero devoluciones/reaperturas nuevas; no cierra H1 ni acredita publicación o próximo instalador. 30/30 estática, 9/9 evidencia/lector, 9/9 Electron, npm test y test:app exit 0 con errores revisados; 940 archivos preservados. Informe/instrumentos autorrevisados y limitaciones separadas del producto, sin subagentes ni cambio de reglas. Minutos adicionales de Efraín solicitados, pendientes/no medidos; sin atribución causal ni doble conteo de sesiones anteriores.\n')
print('DIST-001 paso 6 y DIST-002 verificados; COD-20261028-008; reservas propias liberadas; sesión registrada.')
