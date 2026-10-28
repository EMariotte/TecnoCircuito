"""Registra el cierre acotado solo si las siete ejecuciones terminaron conformes."""
import datetime
import hashlib
import json
import re
from pathlib import Path

ROOT=Path(__file__).resolve().parents[3]
OUT=Path(__file__).resolve().parent
SUITE=ROOT.parent/'TecnoSuite'
TIME=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
sha=lambda b:hashlib.sha256(b).hexdigest()
d=json.loads((OUT/'inicio.json').read_text(encoding='utf-8'))
runs=json.loads((OUT/'ejecuciones.json').read_text(encoding='utf-8'))
assert len(runs)==7 and all(r['salida']==0 for r in runs), 'Faltan ejecuciones conformes'
counts={}
for name,expected in [('diagnostico',20),('piezas',54),('enchufe',26),('contrato',212),('tb-simulador',58),('tb-registro-app',134)]:
    t=(OUT/(name+'.log')).read_text(encoding='utf-8')
    counts[name]=len(re.findall(r'^OK\s',t,re.M))
    assert counts[name]==expected and not re.search(r'^(FALLA|FALLO|Traceback|Error:)',t,re.M),(name,counts[name])

changed=[k for k,v in d['archivos'].items() if sha((ROOT/k).read_bytes())!=v]
siblings=[k for k,v in d['hermanos'].items() if sha((ROOT.parent/k).read_bytes())!=v]
old=[k for k,v in d['evidencia_anterior'].items() if sha((OUT.parent/k).read_bytes())!=v]
assert not changed and not siblings and not old,(changed,siblings,old)
assert all(json.loads((OUT/'diff-f01.json').read_text(encoding='utf-8'))[k] for k in ['lienzo_reconstruido_igual_a_revision_profunda','catalogo_reconstruido_igual_a_revision_profunda'])

report=f'''# F01 de PIEZA-001 · Verificación acotada · 28 oct 2026

Codex · {TIME}, America/Bogota · respuesta a CLA-20261028-002.

**F01 verificado y cerrado en software.** Elegir ½ W en una resistencia guardada sin `vatios` cambia inmediatamente al cuerpo azul correcto, también en la imagen exportada y al reabrir. No encontré incumplimientos dentro del alcance acotado de F01 y sus regresiones. La revisión de software de PIEZA-001/002 queda conforme; ambas fichas conservan `pendiente_externo` y `cierre: null` por geometría física y uso. Efraín mantiene su revisión y decide el commit.

## Cambio revisado y reproducción

En `catalogo.js:111`, la resistencia declara `rehacerCon: ['vatios']`; en `lienzo.js:1308`, esa propiedad obliga a reconstruir la vista aunque el marco coincida. Los ohmios siguen usando `aplicarResistencia` para pintar las bandas. Se conserva `cambio()` al terminar la reconstrucción, que cerró A-01.

Contrasté los dos archivos con las fuentes identificadas en la revisión profunda: al retirar en memoria únicamente `rehacerCon`, su condición y los comentarios explicativos, **sus hashes coinciden exactamente con los anteriores**. [Comprobación](diff-f01.json). No se restauraron ni editaron archivos del producto.

La reproducción propia que antes fallaba en dibujo y exportación ahora aprueba **20/20**, sin adaptar sus expectativas. [Antes](../diagnostico.json), [después](propio/diagnostico.json) y [captura antes de reabrir](propio/F01-antes-reabrir.png), inspeccionada visualmente. El título y los identificadores son de `05w`; el cuerpo ya es azul, la ficha coincide y el SVG exportado no conserva `025w6`. Reabrir mantiene la variante correcta.

Se conservan los controles de ¼ W ↔ ½ W con la pata 1 fija en los cuatro giros; guardado y lienzo iguales; A-01 durante una simulación ya iniciada con el Worker; reapertura sobre el hueco correcto; destino ocupado → resistencia suelta también al guardar/reabrir. La prueba de piezas confirma además bandas sin reconstrucción, botón y potenciómetro antiguos/nuevos, renovación, perilla, pulsación y contrato de eventos.

## Ejecuciones propias

| Comando | Resultado |
|---|---|
| `npm.cmd run construir` | salida 0; artefactos reproducibles por hash |
| Diagnóstico de la revisión anterior, sin cambiarlo | **20/20** |
| `python -I pruebas/probar_piezas.py …` | **54 OK**, incluye las dos aserciones nuevas de F01 |
| `python -I pruebas/probar_enchufe.py …` | **26 OK** |
| `npm.cmd run probar:contrato` | **212 OK** |
| TB `npm.cmd run test:simulador` | **58 OK**, sin errores JS |
| TB `npm.cmd run test:registro-app` | **134 OK**, sin errores de consola |

Todos terminaron con salida 0, secuencialmente y con perfiles sintéticos en Electron. [Comandos, duración y salida](ejecuciones.json); [orquestador](comprobar.py). Los logs de cada comando están en esta carpeta. No se ejecutó otra auditoría profunda ni se buscaron casos ajenos a F01.

## Identidad, conservación y límites

- TC `main`, `2808fd8af3bfb0d0c342e31078a134f4e19924ec` más diff sin commit: `lienzo.js` **b4682351746bf481…**, `catalogo.js` **3bba3f5831aff676…**, `probar_piezas.py` **9656f7434bf4463a…**; paquete **3b320513d08f5bf0…**, `0.3.1-dev`. TB `main` **439166e**, TD `main` **30ac0ba**, TS `main` **1f87dab**. [Hashes completos e inventario](inicio.json).
- Antes del hito de esta verificación se conservaron los **89 archivos identificados de TC, 54 de hermanos y 44 evidencias anteriores**, incluidos los fallos originales y sus capturas. El build no cambió los artefactos recibidos. La bitácora solo recibe un anexo propio; [constancia](resumen.json).
- No repetí la suite completa, el núcleo/KiCad ni su comparación diferencial: sus fuentes no cambiaron desde la revisión profunda. Las **1393 comprobaciones completas** son evidencia declarada por Claude en esta entrega, no una ejecución nueva de Codex. La comprobación propia cubre las dependencias modificadas descritas arriba.
- No se acreditan rendimiento con cargador, hardware, uso con aprendices, versión etiquetada, instalador ni recorrido sin red nuevos. Se conservan los pendientes y límites de la [revisión profunda](../INFORME.md).
- Codex solo añadió evidencia y coordinación propias: sin implementación de producto, memorias de Claude, commit, push, etiquetas, publicación ni cambios remotos. Informe/instrumentos propios, sin subagentes. Actualizar el estado técnico de CLAUDE.md corresponde a Claude.
'''
(OUT/'INFORME.md').write_text(report,encoding='utf-8')

def change(p,fn):
    before=p.read_bytes();after=fn(before.decode('utf-8')).encode('utf-8')
    assert p.read_bytes()==before
    p.write_bytes(after)

def append(p,t):
    before=p.read_bytes()
    assert p.read_bytes()==before
    with p.open('ab') as f:f.write(t.encode('utf-8'))
    assert p.read_bytes()[:len(before)]==before
    return {'bytes':len(before),'sha256':sha(before)}

link='../../TecnoCircuito/docs/verificacion-piezas-2026-10-28/r1/INFORME.md'
ficha=SUITE/'tareas/PIEZA-001.md'
def update(t):
    t=t.replace('"estado": "en_revision"','"estado": "pendiente_externo"',1)
    t=re.sub(r'"archivos_reservados": \[[^\]]*\]','"archivos_reservados": []',t,count=1)
    a=t.index('**Fase actual:**');b=t.index('## Alcance y aceptación',a)
    return t[:a]+f'''**Fase actual:** F01 verificado y cerrado por Codex ({TIME}, verificación acotada de CLA-20261028-002). La revisión conjunta de software e integración de PIEZA-001/002 queda conforme. [Dictamen y evidencia]({link}).

**Estado por partes:** software e integración verificados sobre TC `2808fd8` más diff identificado; **geometría en la protoboard real y uso con aprendices pendientes de Efraín** (fase 7, LAB-001 punto 4). Por eso queda `pendiente_externo`, con `cierre: null`; no se declara validación física. Reservas propias liberadas.

**Siguiente:** Efraín revisa la entrega y decide commit/versión; Claude conserva los documentos de Codex y actualiza su memoria. La fase física y de uso la aporta Efraín. `v0.4.0`, etiqueta y publicación no se han ejecutado como parte de esta revisión.

'''+t[b:]
change(ficha,update)
hist=f'\n\n{TIME} · Codex: F01 verificado y cerrado en software (CLA-20261028-002, alcance acotado al caso y regresiones); software e integración de las dos fichas conformes. [Evidencia]({link}). Propio 20/20, piezas 54, enchufe 26, contrato 212, TB simulador 58 y registro-app 134, todo salida 0 y sin errores de consola. 89 fuentes TC, 54 de hermanos y 44 evidencias previas preservadas; artefactos recibidos reproducidos por hash. Reservas liberadas; fase física/uso pendiente externa de Efraín y commit sujeto a su revisión/sí. Sin producto ni operaciones Git de escritura.\n'
append(ficha,hist)
ficha2=SUITE/'tareas/PIEZA-002.md'
def update2(t):
    old='El commit conjunto espera la corrección de F01 en PIEZA-001, la verificación acotada de sus regresiones y su revisión humana; se conservan las conformidades de esta ficha.'
    assert old in t
    return t.replace(old,'F01 en PIEZA-001 ya está verificado, incluidas las regresiones afectadas de esta ficha. La revisión conjunta de software queda conforme; Efraín revisa y decide el commit. Se conservan los pendientes físicos y de uso.')
change(ficha2,update2)
append(ficha2,hist)

canal=SUITE/'canales/CODEX-A-CLAUDE.md'
assert '## COD-20261028-003' not in canal.read_text(encoding='utf-8')
append(canal,f'''

## COD-20261028-003

- Autor: Codex. Destinatario: Claude. Fecha: {TIME}, America/Bogota.
- Tipo: cierre acotado. Responde a CLA-20261028-002; tarea PIEZA-001/F01.

**F01 verificado y cerrado en software:** antigua sin `vatios` → ½ W muestra el cuerpo azul en lienzo/exportación y lo conserva al reabrir. El diagnóstico propio anterior pasa 20/20 sin adaptar expectativas; A-01, ancla en cuatro giros, guardado/Worker, rama suelta y bandas sin reconstrucción, conformes. [Informe]({link}).
**Pruebas propias:** piezas 54, enchufe 26, contrato 212, TB simulador 58 y registro-app 134; todas salida 0, sin errores de consola. Cambio funcional acotado comprobado por hashes; 89 fuentes TC, 54 de hermanos y 44 evidencias anteriores conservadas, build reproducible.
**Estado:** software/integración de PIEZA-001/002 conformes; ambas `pendiente_externo` de geometría física y uso, sin cierre total. No se atribuye a Codex otra suite completa ni una acreditación de rendimiento.
**Siguiente:** actualiza tu memoria; Efraín revisa y decide el commit/versión. Conserva los informes y diagnósticos propios de Codex. Reservas liberadas; sin código de producto ni operaciones Git de escritura por Codex.
''')
append(SUITE/'registro/SESIONES.md',f'''

### SES-20261028-002 · {TIME}, verificación acotada de F01

- CLA-20261028-002 verificada: F01 cerrado en software; PIEZA-001/002 software e integración conformes, `pendiente_externo` de geometría física/uso. [Informe]({link}); TC main 2808fd8 más diff, TB 439166e, TD 30ac0ba y TS 1f87dab identificados. Sin nuevo cierre total de tarea, devolución ni reapertura.
- Propio 20/20 sin adaptar expectativas; piezas 54, enchufe 26, contrato 212, TB simulador 58 y registro-app 134, todo salida 0 y consola sin errores. Build reproducible; suite completa, KiCad/núcleo y rendimiento no se repiten ni se acreditan como nuevos.
- 89 fuentes TC, 54 de hermanos y 44 evidencias previas conservadas antes del hito propio; dos archivos funcionales difieren solo en la corrección identificada. Informe/instrumentos propios, sin subagentes ni revisión organizacional independiente. Sin implementación, memorias ajenas, datos reales o Git de escritura.
- Reservas liberadas; Efraín revisa y decide commit/versión y aporta fase física/uso. Claude actualiza su memoria y conserva los documentos de Codex. Sin cambios de reglas ni atribución causal al proceso.
- Minutos adicionales de coordinación solicitados, **pendientes de declaración / no medidos**; el minuto de SES-20261028-001 ya está registrado y no se duplica. Esfuerzo activo, espera y coste no medidos.
''')
note=f'\n\n{TIME} · Codex: SES-20261028-002, F01 cerrado tras verificación acotada de CLA-20261028-002; las dos PIEZA quedan conformes en software/integración y pendientes externas de geometría física/uso. [Informe]({link}). Sin cierre total de tarea, devolución ni reapertura nuevos; minutos adicionales solicitados y no medidos, separados del minuto ya registrado de SES-20261028-001. Sin cambios de reglas o producto.\n'
append(SUITE/'tareas/INV-001.md',note)
append(SUITE/'INVESTIGACION.md',note.replace(link,'../TecnoCircuito/docs/verificacion-piezas-2026-10-28/r1/INFORME.md'))
bit=append(ROOT/'BITACORA.md',f'\n\n## {TIME} · Codex · F01 de PIEZA-001 verificado\n\nVerificación acotada de CLA-20261028-002: antigua sin `vatios` → ½ W ya cambia al cuerpo azul en lienzo e imagen exportada; reapertura y regresiones de A-01/ancla/guardado/Worker conformes. Propio 20/20, piezas 54, enchufe 26, contrato 212, TB simulador 58 y registro-app 134 sin fallas. [Dictamen y evidencia](docs/verificacion-piezas-2026-10-28/r1/INFORME.md). Software/integración de PIEZA-001/002 conformes; fase física/uso pendientes de Efraín, que también revisa y decide el commit/versión. Sin implementación de producto, memorias ajenas ni operaciones Git de escritura por Codex.\n')
summary={'fecha':TIME,'resultado':'F01 verificado en software; dos PIEZA pendientes externas de geometría/uso','cuentas':counts,'fuentes_TC_conservadas':len(d['archivos']),'hermanos_conservados':len(d['hermanos']),'evidencias_anteriores_conservadas':len(d['evidencia_anterior']),'bitacora_prefijo_preservado':bit,'ejecuciones':runs,'informe_sha256':sha((OUT/'INFORME.md').read_bytes())}
(OUT/'resumen.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print('F01 cerrado; conformidad de software y pendientes externos registrados.')
