"""Cierra la evidencia propia sin alterar fuentes; anexa el hito a la bitácora."""
import datetime
import hashlib
import json
import re
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
OUT=Path(__file__).resolve().parent
d=json.loads((OUT/'inicio.json').read_text(encoding='utf-8'))
sha=lambda b:hashlib.sha256(b).hexdigest()
bit=ROOT/'BITACORA.md'
before=bit.read_bytes()
assert sha(before)==d['archivos']['BITACORA.md'], 'La bitácora cambió: releer antes de anexar'
changed=[k for k,v in d['archivos'].items() if sha((ROOT/k).read_bytes())!=v]
siblings=[k for k,v in d['hermanos'].items() if sha((ROOT.parent/k).read_bytes())!=v]
assert not changed and not siblings,(changed,siblings)

entry='''

## 2026-10-28 10:23 · Codex · Revisión profunda conjunta de PIEZA-001 y PIEZA-002

Verificada la entrega CLA-20261028-001 (TC `2808fd8` más diff identificado): suite completa 1391 OK/0 fallas, KiCad 10.0.3 ejecutado; integración local de TecnoBloques 58 y registro Electron 134 sin fallas. Comparación propia de 74 corridas del núcleo, 60 cuadros y dos referencias: ninguna diferencia inesperada; el control 220/330 Ω sí difiere. A-01 de guardado/Worker y sus ramas, conformes.

**PIEZA-001 devuelta solo por F01 (media):** al elegir ½ W en una resistencia guardada sin `vatios`, ficha y valor cambian pero lienzo e imagen exportada conservan el cuerpo beige de ¼ W; reabrir lo corrige. Regresión de CR-8 demostrada contra `2808fd8`. **PIEZA-002 conforme en software e integración**, con geometría física y uso pendientes de Efraín. [Informe, reproducción y límites](docs/verificacion-piezas-2026-10-28/INFORME.md). Corrección funcional a cargo de Claude; siguiente revisión acotada a F01 y regresiones afectadas. No se modificó código de producto ni memorias ajenas; sin commit/push. Batería observada: no se acredita rendimiento con cargador. El commit del lote y la revisión humana siguen pendientes.
'''
with bit.open('ab') as f:f.write(entry.encode('utf-8'))
assert sha(bit.read_bytes()[:len(before)])==d['archivos']['BITACORA.md']

logs={}
rawdir=OUT/'logs-originales'
rawdir.mkdir(exist_ok=True)
for f in OUT.glob('*.log'):
    raw=f.read_bytes()
    (rawdir/f.name).write_bytes(raw)
    if raw.startswith(b'\xff\xfe'):
        text=raw.decode('utf-16');coding='utf-16'
    else:
        lines=[];coding='utf-8 o cp1252 por línea'
        for line in raw.splitlines(keepends=True):
            try:lines.append(line.decode('utf-8'))
            except UnicodeDecodeError:lines.append(line.decode('cp1252'))
        text=''.join(lines)
    f.write_text(text,encoding='utf-8')
    logs[f.name]={'sha256_original':sha(raw),'codificacion_original':coding,
                  'OK':len(re.findall(r'^OK\s',text,re.M)),
                  'FALLA':len(re.findall(r'^FALLA',text,re.M)),
                  'FALLO':len(re.findall(r'^FALLO',text,re.M)),
                  'ERRORES_y_siguiente':[text[m.start():m.start()+100] for m in re.finditer(r'^ERRORES:',text,re.M)]}

summary={'fecha':datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=-5))).isoformat(),
    'dictamen':'PIEZA-001 devuelta por F01; PIEZA-002 software conforme, físico/uso pendiente externo',
    'archivos_TC_identificados':len(d['archivos']),'sin_cambio_antes_del_hito':not changed,
    'hermanos_identificados':len(d['hermanos']),'hermanos_sin_cambio':not siblings,
    'bitacora_prefijo_preservado':{'bytes':len(before),'sha256':sha(before)},
    'suite_TC_salida_observada':0,'logs':logs,
    'ejecuciones':json.loads((OUT/'ejecuciones.json').read_text(encoding='utf-8'))}
(OUT/'resumen.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=True,indent=2))
