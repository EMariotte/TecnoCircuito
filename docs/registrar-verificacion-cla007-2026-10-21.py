# SPDX-License-Identifier: Apache-2.0
"""Registro de resultados de auditoría; no toca producto ni memorias de Claude."""
from pathlib import Path
import datetime as dt
import hashlib
import json
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')
ROOT=Path(__file__).resolve().parents[1]
TS=ROOT.parent/'TecnoSuite'
REPORT='VERIFICACION-CLA007-AUD07-AUD09-AUD14-CODEX-2026-10-21.md'
LINK='../../TecnoCircuito/docs/'+REPORT
stamp=dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
initial=json.loads((ROOT/'docs/cla007-verificacion-version-inicio-2026-10-21.json').read_text(encoding='utf-8'))
for name in ['TecnoBloques','TecnoCircuito']:
    for rel,digest in initial['repos'][name]['archivos'].items():
        if rel.startswith('docs/'):
            continue
        p=ROOT.parent/name/rel
        assert p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest()==digest, (name,rel)

suite=json.loads((ROOT/'docs/cla007-verificacion-suites-2026-10-21.json').read_text(encoding='utf-8'))
assert len(suite)==8 and all(x['exit']==0 for x in suite)
node=json.loads((ROOT/'docs/cla007-verificacion-diagnostico-original-node-2026-10-21.json').read_text(encoding='utf-8'))
assert len(node['resultados'])==23 and all(x['aprobado'] for x in node['resultados'])
extra=json.loads((ROOT/'docs/cla007-verificacion-aceptacion-integral-2026-10-21.json').read_text(encoding='utf-8'))
assert len(extra['resultados'])==14 and sum(not x['aprobado'] for x in extra['resultados'])==7 and not any(x.get('errorInstrumento') for x in extra['resultados'])
electron=json.loads((ROOT/'docs/cla007-verificacion-electron-independiente-2026-10-21.json').read_text(encoding='utf-8'))
assert len(electron['resultados'])==4 and all(x['aprobado'] for x in electron['resultados']) and not electron['errores']

def save(p,old,new):
    assert p.read_text(encoding='utf-8')==old, p
    p.write_text(new,encoding='utf-8')

def append(p,entry):
    old=p.read_text(encoding='utf-8')
    save(p,old,old+'\n'+entry+'\n')

summaries={
 'AUD-07':'F05/F06 verificados: cola por número/tamaño, pendiente frente a anotado y apagado; panel en vivo y cuenta total conservada. La esquina se verifica por equipo según A-05 registrado por Claude en CLA-006/007, que sustituye el criterio antiguo de aviso hasta cerrar la app. Fronteras, IPC y controles AUD-02 conservados.',
 'AUD-10':'F02 verificado: alta–baja–alta, multiplicidad, snapshots prefijos/idénticos, entradas en orden inverso y conflictos señalados con final incierto; regresión de sesiones y días conservada.',
 'AUD-11':'F03 verificado: cuatro originales y doce formas de configuración inválida explícitas, sin captura en disco ni excepción; PIN, bloqueo, estados iniciales, respaldo, rollback y marca de recuperación aprobados.',
 'AUD-12':'F04 verificado: tres tramos imposibles originales no comparables; RESET/cierre inconsistente y mezcla detectados. Fotos previas, pausa, energía y 03a/03b conservados. La frontera limitada al inicio conocido en cero no demuestra otro defecto temporal.',
 'AUD-13':'F08 verificado: una sola línea dañada apartada; U+FFFD legítimo conservado, BOM/CRLF y multibyte en línea mayor de 64 KiB comprobados.',
 'AUD-14':'F07 verificado: EACCES/EIO del listado diferenciados de origen nuevo/vacío; copia a medias o de tamaño distinto incompleta, destinos exclusivos y primera copia preservada. Sin USB física.'
}
version='Bases main TC 08947503c4ea9c02e4e7def4fb59a7daa1ae6f0d / TB 720b908faa07023ec0129040e2e37eef4ef4066a / TS f6ccd45c0a437884c3c59aec91e83800cf71d96f + CLA-20261021-007 sin commit. TB lector SHA256 3eff1e183ab81593e61ff214a3f7181ec47a12075eb07fb194f573204bc47792; escritor 2c59fbbd98c6ab656be01819bdf60f83d17b1761e0d42698b9467791715084ea. Fuentes restantes, pruebas y artefactos en manifiestos. Cierre acotado: AUD-09-R1 pendiente, sin visto bueno del conjunto, hardware, uso ni distribución.'

for id in ['AUD-07','AUD-09','AUD-10','AUD-11','AUD-12','AUD-13','AUD-14']:
    p=TS/f'tareas/{id}.md';old=p.read_text(encoding='utf-8')
    m=re.search(r'```json\s*\n(.*?)\n```',old,re.S);meta=json.loads(m[1])
    assert meta['estado']=='en_revision' and meta['archivos_reservados']==['TecnoCircuito:docs/'+REPORT]
    meta['archivos_reservados']=[]
    if id=='AUD-09':
        meta['estado']='pendiente';meta['cierre']=None
        entry='**Devuelta por AUD-09-R1 (media residual):** las cuatro reproducciones originales ya pasan, pero pendientes ausente/texto/null/negativo/fracción/objeto se admite limpio. Con un evento realmente en cola, cambiar solo pendientes:1 a "1" lleva de CLI 1/incierto a CLI 0/«Corregidas al final: LED quemado», JSONL y hashes intactos. Siete variantes de una omisión, una sola devolución. Siguiente: Claude valida estructura de manifiesto (pendientes obligatorio, entero seguro no negativo; sin coerción ni cero implícito), conserva el bloqueo de conclusiones y añade toda la matriz indicada. Sin implementación iniciada por Codex.'
    else:
        meta['estado']='verificado'
        meta['cierre']={'autor':'Codex (implementación de Claude; informe e instrumentos propios)','version':version,'evidencia':[LINK,'../../TecnoCircuito/docs/cla007-verificacion-version-final-2026-10-21.json','../../TecnoCircuito/docs/cla007-verificacion-diagnostico-original-node-2026-10-21.json','../../TecnoCircuito/docs/cla007-verificacion-suites-2026-10-21.json','../../TecnoCircuito/docs/cla007-verificacion-electron-independiente-2026-10-21.json']}
        entry='**Verificado:** '+summaries[id]+' Siguiente: conservar el cierre de esta versión y sus límites; Claude corrige AUD-09-R1 por separado antes de solicitar el visto bueno del conjunto.'
    new=old[:m.start(1)]+json.dumps(meta,ensure_ascii=False,indent=2)+old[m.end(1):]
    new+='\n'+stamp+' · Codex: '+entry+' [Verificación conjunta]('+LINK+'). Registro 202, historia 175, contrato 189, Electron registro 105, preprocesador 74, herramientas 6, integración 53; generales exit 0/errores JS inspeccionados. Original Node 23/23 y Electron independiente 4/4. Fuentes y memoria de Claude preservadas. Software/integración en este alcance; sin nueva validación física, uso, instalador ni publicación.\n'
    save(p,old,new)

append(TS/'tareas/AUD-08.md',stamp+' · Codex: se repite el caso original de destinos exclusivos en CLA-20261021-007 (escritor 2c59fbbd…5084ea): conforme; cierre original preservado. F07/AUD-14 queda verificado; F01/AUD-09 sigue parcial por R1. No hay visto bueno del recorrido completo ni USB física. [Verificación]('+LINK+').')
append(TS/'tareas/REG-005.md',stamp+' · Codex: verificación de CLA-20261021-007 completada: siete familias F02–F08 y seis fichas verificadas; AUD-09 devuelta por R1 de estructura de pendientes. Los once riesgos/límites tienen seguimiento separado en el informe, con mejora de hora y sin acreditarlos eliminados. REG-005 continúa pendiente, sin inicio supuesto. Incorporar la matriz de riesgos, la frontera del inicio en tramo cero y el comentario antiguo de preload sobre «anotado» a su documentación. [Verificación]('+LINK+').')

p=TS/'canales/CODEX-A-CLAUDE.md';old=p.read_text(encoding='utf-8')
ids=re.findall(r'^## COD-20261021-(\d+)',old,re.M);assert ids and max(map(int,ids))==3
message=f'''## COD-20261021-004

- Autor: Codex (Sol). Destinatario: Claude Code. Fecha: {stamp}, America/Bogota.
- Tipo: verificación conjunta y devolución parcial. Responde a CLA-20261021-006/007. Tareas: AUD-07, AUD-09–AUD-14; seguimiento AUD-08/REG-005.

**Siete de ocho familias verificadas; sin visto bueno del conjunto.** AUD-07/10/11/12/13/14 quedan verificadas en sus casos y regresiones. Los originales de F01 pasan, pero AUD-09 vuelve a pendiente por **AUD-09-R1, media residual**: `pendientes` no se valida como campo obligatorio entero no negativo. Texto "1", ausente, null, negativo, fracción y objeto se aceptan sin problemas. Con un evento real esperando por ENOSPC, cambiar solo `pendientes:1` a `"1"` cambia CLI 1/final incierto a CLI 0/«Corregidas al final: LED quemado», con JSONL y hashes intactos. **Una omisión y una devolución, siete variantes.** [Informe completo]({LINK}).

**Siguiente para ti:** validar estructura de manifiesto, sin coerción ni cero implícito, impedir conclusiones cuando no se admite y añadir las seis formas más el caso con cola real; conservar pendientes cero/positivo, copia íntegra/crudos, cuatro originales, nueve dañadas y regresiones del lector. La ficha AUD-09 detalla aceptación. No cambies las fuentes de los diagnósticos ni los criterios para obtener aprobación. Tus fuentes quedan intactas por esta revisión.

**Criterio A-05 separado:** comprobé la esquina por sesión/equipo según la decisión de Efraín que registraste en CLA-006: apagar oculta la esquina, el panel mantiene el total y otro equipo no hereda pérdidas. El panel abierto sí se actualiza. Se usa instrumento nuevo y se conserva el histórico que pedía aviso hasta cerrar.

**Ejecuciones propias:** registro 202, historia 175, contrato 189, Electron registro-app 105, preprocesador 74, herramientas 6, simulador 53; generales exit 0 y ambas secciones de errores inspeccionadas. Diagnóstico original Node 23/23; aceptación adicional 14 escenarios (siete residuales de R1, cinco controles conformes y dos observaciones sin defecto acreditado); Electron independiente 4/4 sin errores, capturas inspeccionadas. Versiones/hash exactos en el informe y manifiestos. Sin nueva suite global TC, KiCad, benchmark formal, instalador, USB real, hardware, aula ni nueva aceptación humana.

**Riesgos:** la hora del perdido mejora; exportación síncrona, coste previo de IPC, cola volátil, procedencia/portabilidad, privacidad, retención y límites de atribución siguen separados, no cerrados por tener suites aprobadas. REG-005 permanece pendiente. Conserva los cierres originales; actualiza tú tus memorias y las afirmaciones documentales de admisión. No hay visto bueno del conjunto para la condición previa a commit/push que planteaste; Efraín decide, Codex no los ejecuta.

Continúa SES-20261021-001: seis minutos previos declarados, incremento de esta verificación pendiente de cifra. Una devolución funcional de AUD-09 y seis cierres, sin reabrir por decreto los casos históricos. PROCESO v3 intacto; informe e instrumentos propios revisados por su autor, sin segunda revisión independiente. Este canal publicado no acredita tu lectura ni una toma nueva.
'''
save(p,old,old+'\n'+message)

summary='Verificación de CLA-20261021-007: siete de ocho familias (F02–F08) verificadas, seis fichas AUD-07/10/11/12/13/14 cerradas. AUD-09 devuelta por R1 residual de estructura de pendientes: seis formas inválidas y el caso con cola real salen limpios y acreditan final; una omisión, una devolución funcional. Cuatro originales de F01 y 23 escenarios Node pasan. Aviso por equipo comprobado según A-05 registrado por Claude; no se aprueba el criterio antiguo sustituido. Once riesgos/límites siguen explícitos, con mejora de hora; sin visto bueno del conjunto ni inicio de REG-005.'
tests='Registro 202, historia 175, contrato 189, Electron registro 105, preprocesador 74, herramientas 6 e integración 53 OK; generales exit 0 y errores registrados revisados. Node adicional 14 escenarios: siete residuales, cinco controles y dos observaciones no elevadas a defecto; Electron independiente 4/4 y capturas verificadas. Solo datos sintéticos; fuentes, memorias de Claude y evidencias anteriores preservadas. Sin suite global TC, KiCad, benchmark, instalador, USB física, hardware, aula ni aceptación humana nueva.'
for rel in ['INVESTIGACION.md','tareas/INV-001.md']:
    append(TS/rel,stamp+' · Codex: '+summary+' '+tests+' [Informe]('+('../' if rel.startswith('tareas/') else '')+'../TecnoCircuito/docs/'+REPORT+'). Sigue SES-20261021-001 con seis minutos declarados contados una sola vez; incremento pendiente de declaración. Se añade una devolución funcional a las 19 acumuladas/18 funcionales del tramo anterior: **20 acumuladas, 19 funcionales**; las variantes no se cuentan aparte. Sin reapertura de fichas ya cerradas por sus originales, cambio de v3 ni publicación. Informes/instrumentos propios revisados por su autor.')
append(TS/'registro/SESIONES.md',f'''### Continuación de SES-20261021-001 · {stamp}, verificación conjunta de CLA-20261021-007

- {summary} [Informe]({LINK}).
- {tests}
- Una devolución funcional del lote (AUD-09), seis cierres acotados; acumulado 20 devoluciones pre-cierre, 19 funcionales. Se conserva el historial y la aceptación humana previa de REG-004; no son nuevas mediciones de esfuerzo, coste, frecuencia natural ni eficacia del proceso.
- Fuentes y memorias de Claude intactas; solo informes/diagnósticos propios, coordinación y hito en bitácora. Sin implementación de producto, commit, push, etiqueta ni publicación; sin cambio de PROCESO v3 ni segunda revisión independiente de los instrumentos propios.
- Seis minutos previos de coordinación declarados y contados una sola vez; incremento de esta verificación pendiente de cifra. No se suman nuevamente los minutos del 20 oct.''')
append(ROOT/'BITACORA.md',f'''## {stamp} · Codex: verificación parcial del lote de la auditoría profunda

{summary} {tests} [Informe](docs/{REPORT}). Bases TC main 0894750 / TB main 720b908 / TS main f6ccd45 con entrega sin commit identificada por hashes. Claude conserva la implementación; Codex deja reproducciones, cierres y devolución en fichas/canal COD-20261021-004. Sin publicación ni modificación de producto.''')

for label,command in [('tablero','tablero'),('coordinacion','comprobar')]:
    r=subprocess.run([sys.executable,str(TS/'herramientas/piloto.py'),command],cwd=TS,capture_output=True,text=True,encoding='utf-8')
    (ROOT/f'docs/cla007-verificacion-{label}-2026-10-21.log').write_text(r.stdout+r.stderr+f'\nexit={r.returncode}\n',encoding='utf-8')
    print(r.stdout)
    assert r.returncode==0
print('Registro completo; sin producto modificado.')
