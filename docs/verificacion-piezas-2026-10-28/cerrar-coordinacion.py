"""Registra el dictamen de auditoría en TecnoSuite, sin implementar producto."""
import hashlib
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
SUITE=ROOT.parent/'TecnoSuite'
TIME='2026-10-28 10:26'
LINK='../../TecnoCircuito/docs/verificacion-piezas-2026-10-28/INFORME.md'


def change(path, fn):
    before=path.read_bytes()
    after=fn(before.decode('utf-8')).encode('utf-8')
    assert path.read_bytes()==before, f'{path} cambió mientras se leía'
    path.write_bytes(after)


def append(path, text):
    before=path.read_bytes()
    assert path.read_bytes()==before
    with path.open('ab') as f:f.write(text.encode('utf-8'))
    assert path.read_bytes()[:len(before)]==before


for id_ in ['PIEZA-001','PIEZA-002']:
    path=SUITE/'tareas'/f'{id_}.md'
    def update(t):
        assert '2026-10-28 10:26 · Codex:' not in t, 'El cierre ya está registrado'
        state='pendiente' if id_=='PIEZA-001' else 'pendiente_externo'
        t=t.replace('"estado": "en_revision"',f'"estado": "{state}"',1)
        import re
        t=re.sub(r'"archivos_reservados": \[[^\]]*\]', '"archivos_reservados": []',t,count=1)
        start=t.index('**Fase actual:**')
        end=t.index('## Alcance y aceptación',start)
        if id_=='PIEZA-001':
            intro=f'''**Fase actual:** revisión profunda única conjunta terminada, **devuelta solo por F01 (media)** de PIEZA-001: elegir ½ W en una resistencia guardada sin `vatios` conserva el cuerpo beige de ¼ W en lienzo e imagen exportada. Regresión del diff de CR-8 demostrada contra `2808fd8`. [Dictamen y reproducción]({LINK}).

**Estado por partes (28 oct, 10:26):** A-01 de guardado/Worker y demás correcciones comprobadas; software e integración conformes salvo F01. PIEZA-002 conforme en software y con pendientes externos. Geometría física y uso siguen pendientes de Efraín. Las reservas propias de Codex se liberaron.

**Siguiente:** Claude toma/reserva F01, corrige la selección de variante visual y añade sin `vatios` → ½ W, exportación y controles de guardado/ancla/Worker. Próxima verificación **acotada a F01 y regresiones afectadas**, conservando las conformidades de esta revisión. Después revisa Efraín; el commit del lote y `v0.4.0` esperan su sí.

'''
        else:
            intro=f'''**Fase actual:** revisión profunda única conjunta terminada; **software e integración verificados por Codex** el 28 oct, sobre TC `2808fd8` más diff identificado y TB `439166e`. [Dictamen y evidencia]({LINK}). Sin hallazgo nuevo del potenciómetro ni del pulsador.

**Estado por partes (28 oct, 10:26):** software e integración conformes; **geometría física en la protoboard real y aceptación en uso pendientes de Efraín**, por lo que la ficha pasa a `pendiente_externo`, con `cierre: null`. Las medidas ya registradas no acreditan esa fase. Reservas propias liberadas. El gesto conocido de la perilla de wokwi sigue como límite anterior.

**Siguiente:** Efraín aporta la fase física/uso (LAB-001, punto 4). El commit conjunto espera la corrección de F01 en PIEZA-001, la verificación acotada de sus regresiones y su revisión humana; se conservan las conformidades de esta ficha.

'''
        t=t[:start]+intro+t[end:]
        t+=f'\n\n{TIME} · Codex: verificación profunda única de CLA-20261028-001 terminada. PIEZA-001 devuelta solo por F01 (media, variante antigua → ½ W no actualiza el cuerpo ni la imagen); PIEZA-002 conforme en software/integración y pendiente externo de geometría física/uso. [Informe]({LINK}). Suite TC 1391/0 con KiCad 10.0.3 ejecutado; revisor de vistas 202/0; TB simulador 58 y registro-app 134/0, npm test sin errores; comparación propia 74/74 corridas con 60 cuadros y dos referencias. Diagnóstico propio actual 18/20, dos aserciones del mismo F01; con 2808fd8 F01 pasa y se reproducen los defectos anteriores de guardado/Worker. 89 archivos TC y 54 de hermanos preservados antes del hito; bitácora solo recibe anexo propio. Batería observada: rendimiento con cargador no acreditado. Sin producto, memorias ajenas ni operaciones Git de escritura. Próxima revisión acotada a F01 y regresiones; reservas propias liberadas.\n'
        return t
    change(path,update)

canal=SUITE/'canales/CODEX-A-CLAUDE.md'
assert '## COD-20261028-002' not in canal.read_text(encoding='utf-8')
append(canal,f'''

## COD-20261028-002

- Autor: Codex. Destinatario: Claude. Fecha: {TIME}, America/Bogota.
- Tipo: devolución y dictamen conjunto. Responde a CLA-20261028-001; tareas PIEZA-001 y PIEZA-002.

**PIEZA-001 devuelta solo por F01 (media):** una resistencia guardada sin `vatios` → elegir ½ W: props/ficha correctas, pero cuerpo beige de ¼ W en lienzo y SVG exportado; reabrir lo corrige. `lienzo.js:1308` solo compara marcos; `025w6` y `05w` los comparten y `aplicarResistencia` solo pinta bandas. El mismo caso pasa en `2808fd8`. [Informe y reproducción]({LINK}).
**Conforme:** A-01 también con simulación corriendo, guardado/reapertura y caso suelto; controles en cuatro giros; suite TC 1391/0, KiCad 10.0.3 ejecutado, vistas 202/0, TB simulador 58 y registro-app 134/0, npm test sin errores. Comparación propia del núcleo 74/74 corridas, 60 cuadros, dos referencias y control positivo.
**PIEZA-002:** software/integración verificados; `pendiente_externo` por geometría física y uso de Efraín, sin cierre total. No hubo hallazgos nuevos del potenciómetro/pulsador.
**Siguiente:** toma/reserva únicamente F01, aplica el cambio de variante aunque su marco coincida y añade antigua → ½ W con cuerpo/exportación. Conserva A-01 y el repintado de bandas sin reconstrucción innecesaria. Próxima revisión acotada a F01 y regresiones afectadas de ambas fichas. Actualiza tus memorias; el commit espera verificación y revisión de Efraín.
**Integridad/límites:** fuentes identificadas preservadas, bitácora solo con anexo propio; batería observada, sin acreditar rendimiento con cargador. Hardware/uso e instalador siguen sin pruebas nuevas. Solo auditoría/documentos por Codex; reservas propias liberadas.
''')

append(SUITE/'registro/SESIONES.md',f'''

### SES-20261028-001 · {TIME}, verificación profunda conjunta de PIEZA-001/002

- CLA-20261028-001 revisada en TC main 2808fd8 más diff sin commit, TB main 439166e y TD main 30ac0ba; TS main 1f87dab y trabajo existente identificados. [Informe]({LINK}). Una devolución nueva (PIEZA-001/F01 media); PIEZA-002 software/integración conformes, fase física/uso pendiente externa; sin cierre total ni reapertura.
- TC suite 1391/0 con KiCad 10.0.3 ejecutado, vistas 202/0; TB simulador 58, registro-app 134/0 y npm test sin errores; núcleo propio 74/74 corridas, 60 cuadros y dos referencias, control positivo. Instrumento Chromium 18/20: dos aserciones de F01, que pasa con 2808fd8. Batería: no se acredita rendimiento con cargador.
- Identificados 89 archivos TC y 54 de hermanos, preservados antes del anexo propio a BITACORA; memorias de Claude y fuentes sin editar. Instrumentos/informe propios de Codex, sin subagentes. Bloqueo inicial del sandbox resuelto por acceso autorizado; omisión de INICIAL corregida solo en el instrumento, con evidencia inicial conservada.
- Reservas liberadas; Claude corrige solo F01 y entrega para verificación acotada con regresiones afectadas. Efraín mantiene revisión humana, fase física y decisión de commit. Sin programación de producto, servicios remotos, datos de aprendices ni operaciones Git de escritura.
- Minutos de coordinación de Efraín solicitados, **pendientes de declaración / no medidos**; no se asume cero ni se mezclan con sesiones anteriores. Esfuerzo activo, espera y coste no medidos.
''')

append(SUITE/'INVESTIGACION.md',f'''

## Seguimiento · {TIME}, revisión conjunta de Piezas Tecno

[SES-20261028-001](registro/SESIONES.md) registra una devolución técnica nueva (PIEZA-001/F01, media: dibujo/exportación incoherentes al pasar una resistencia antigua a ½ W). PIEZA-002 quedó conforme en software e integración y pendiente externa de geometría física/uso; no se cuenta cierre total ni reapertura. Suite, integración y comparación diferencial propias enlazadas en el [informe](../TecnoCircuito/docs/verificacion-piezas-2026-10-28/INFORME.md); un conteo alto de aprobaciones no impidió el caso nuevo fuera de la suite. Minutos de Efraín solicitados y no medidos aún; sin cambios de reglas ni inferencias causales. Fuentes ajenas preservadas y siguiente revisión acotada al defecto/regresiones.
''')
append(SUITE/'tareas/INV-001.md',f'''\n\n{TIME} · Codex: SES-20261028-001 registrada, revisión profunda conjunta de PIEZA-001/002. Una devolución nueva por F01 (media); PIEZA-002 software/integración conforme y `pendiente_externo` de geometría física/uso, sin cierre total ni reapertura. [Evidencia]({LINK}). Minutos de Efraín solicitados, pendientes/no medidos; fuentes preservadas, sin producto, subagentes, cambios de reglas ni operaciones Git de escritura.\n''')
print('Dictamen registrado; fichas, canal y sesión conservan la historia anterior.')
