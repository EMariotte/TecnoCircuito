# SPDX-License-Identifier: Apache-2.0
"""Identifica la entrega y registra coordinación documental; no modifica producto."""
import datetime as dt
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

TC = Path(__file__).resolve().parents[1]
TS = TC.parent / 'TecnoSuite'
DOCS = TC / 'docs'

def git(root, *args):
    return subprocess.check_output(['git', '-c', f'safe.directory={root.as_posix()}', '-C', str(root), *args], text=True, encoding='utf-8')

def snapshot(label):
    data = {'momento_utc': dt.datetime.now(dt.timezone.utc).isoformat(), 'repos': {}}
    for name in ('TecnoCircuito', 'TecnoBloques', 'TecnoSuite'):
        root = TC.parent / name
        status = git(root, 'status', '--short')
        paths = git(root, 'ls-files', '-m', '-o', '--exclude-standard').splitlines()
        data['repos'][name] = {
            'head': git(root, 'rev-parse', 'HEAD').strip(),
            'rama': git(root, 'branch', '--show-current').strip(),
            'status': status,
            'archivos': {p: hashlib.sha256((root / p).read_bytes()).hexdigest() for p in paths if (root / p).is_file()},
        }
    data['artefactos'] = {}
    for name, relative in [('TecnoCircuito', 'prototipo/dist/tecnocircuito.js'), ('TecnoCircuito', 'prototipo/dist/prototipo.html'), ('TecnoBloques', 'dist/TecnoBloques.html')]:
        path = TC.parent / name / relative
        if path.is_file():
            data['artefactos'][f'{name}:{relative}'] = {'bytes': path.stat().st_size, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
    target = DOCS / f'reg004-cla002-version-{label}-2026-10-20.json'
    target.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(target.name)
    if label != 'inicio':
        before = json.loads((DOCS / 'reg004-cla002-version-inicio-2026-10-20.json').read_text(encoding='utf-8'))
        for name in ('TecnoCircuito', 'TecnoBloques'):
            for relative, digest in before['repos'][name]['archivos'].items():
                if relative.startswith('docs/auditar-') or relative == 'BITACORA.md':
                    continue
                assert hashlib.sha256((TC.parent / name / relative).read_bytes()).hexdigest() == digest, f'Entrega cambió: {name}:{relative}'
        print('Fuentes, pruebas, contrato, memorias de Claude y aceptación humana de la entrega conservados.')

def inicio():
    path = TS / 'tareas/REG-004.md'
    old = path.read_text(encoding='utf-8')
    match = re.search(r'```json\s*\n(.*?)\n```', old, re.S)
    meta = json.loads(match[1])
    assert meta['estado'] == 'en_revision' and not meta['archivos_reservados']
    meta['archivos_reservados'] = [
        'TecnoCircuito:docs/VERIFICACION-REG004-CLA002-CODEX-2026-10-20.md',
        'TecnoCircuito:docs/verificar-reg004-cla002-2026-10-20.cjs',
    ]
    text = old[:match.start(1)] + json.dumps(meta, ensure_ascii=False, indent=2) + old[match.end(1):]
    text += '\n2026-10-20 11:38 · Codex: inicio auditoría de CLA-20261020-002 por pedido de Efraín. TC main 56baf57, TB main 86433d1, TS main 5665e60; entrega sin commit identificada en reg004-cla002-version-inicio-2026-10-20.json. Reservas documentales del revisor, sin implementación de producto. Revisión del diff, contrato, casos de placa/programa/resumen, regresión histórica e integración local; aceptación humana aportada por Efraín, no atribuida a pruebas de Codex.\n'
    assert path.read_text(encoding='utf-8') == old
    path.write_text(text, encoding='utf-8')
    path = TS / 'registro/SESIONES.md'
    old = path.read_text(encoding='utf-8')
    assert '## SES-20261020-001 ' not in old
    path.write_text(old + '\n## SES-20261020-001 · auditoría REG-004/CLA-002, 2026-10-20 11:38, America/Bogota\n- Efraín pide confirmar la entrega y autoriza iniciar; Codex revisa TC 56baf57/TB 86433d1/TS 5665e60, main, con cambios de Claude sin commit conservados.\n- Objetivo: auditar placa_cambiada, diferencias del programa y resumen del circuito, con regresión e integración; sin programación de producto.\n- Aceptación humana documentada por Claude con Efraín (PRUEBA-03); no constituye verificación nueva del revisor.\n- Minutos de coordinación de Efraín pendientes de respuesta; esfuerzo, espera y coste no medidos.\n', encoding='utf-8')
    print('Inicio y reservas documentales registrados; sin mensajes externos.')

def anexar(path, texto):
    old = path.read_text(encoding='utf-8')
    assert texto.strip() not in old
    assert path.read_text(encoding='utf-8') == old
    path.write_text(old + '\n' + texto, encoding='utf-8')

def terminar():
    stamp = dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
    report = '../../TecnoCircuito/docs/VERIFICACION-REG004-CLA002-CODEX-2026-10-20.md'
    detalle = ('CLA-20261020-002 devuelta por R3/R4 medios. R3: identificadores reutilizados mezclan instancias; '
        'baja→alta→baja oculta la eliminación de la pieza inicial, y cambiar a 1000 Ω→borrar→agregar atribuye ese valor a la nueva de 220 Ω. '
        'Dos recorridos de lienzo real y sus historias lo confirman, sin errores JS/esquema. '
        'R4: trim y eliminación de líneas vacías dentro de literales raw hacen afirmar «el mismo programa» con datos distintos; '
        'cuatro programas compilan con avr-g++ y sus pares de .rodata difieren. '
        'Diagnóstico independiente: 10 casos, 6 controles aprobados y 4 fallos, exit 1; no regresión aprobada.')
    pruebas = ('Historia 36, contrato 179, registro-app 87, simulador 53 y registro 142 OK; placas sin errores JS. '
        'Electron: 11 sesiones sintéticas sin avisos ni errores de consola. '
        'Los 16 casos independientes previos pasan: R1/R1a/R1b/R1c/R2 conservan verificación y AUD-01–06 sus cierres. '
        'Primeros intentos de contrato/placas fallaron por sandbox; reintentos fuera del sandbox aprobados, logs originales conservados. '
        'Sin suite global, KiCad nuevo, hardware, instalador ni aula.')
    siguiente = ('Claude toma/reserva y corrige R3/R4 con regresiones; luego Codex verifica. '
        'Aceptación humana del 20 oct conservada en su alcance; REG-004 pendiente, cierre null, reservas liberadas; REG-005 no iniciado. '
        'Fuentes de la entrega y memorias de Claude preservadas con hashes; sin implementación, commit, push o publicación de Codex.')
    path = TS / 'tareas/REG-004.md'
    old = path.read_text(encoding='utf-8')
    match = re.search(r'```json\s*\n(.*?)\n```', old, re.S)
    meta = json.loads(match[1])
    assert meta['estado'] == 'en_revision' and meta['cierre'] is None
    meta.update(estado='pendiente', archivos_reservados=[])
    text = old[:match.start(1)] + json.dumps(meta, ensure_ascii=False, indent=2) + old[match.end(1):]
    anterior = 'Siguiente: Efraín realiza la prueba humana de unos 10 minutos en la app y contrasta la historia con lo que hizo. Codex registra/verifica solo el resultado técnico público; Claude actualiza sus memorias. Software e integración local verificados en CLA-008; sin aceptación humana ni cierre total todavía.'
    assert anterior in text
    text = text.replace(anterior, 'Siguiente: Claude toma y reserva las correcciones R3/R4 de CLA-20261020-002 y sus regresiones; después Codex verifica. La aceptación humana del 20 oct está documentada. La auditoría adicional detectó dos defectos del lector; falta cierre técnico total. [Informe](' + report + ').')
    text += f'\n{stamp} · Codex: **{detalle}**\n- {pruebas}\n- {siguiente} [Informe]({report}).\n'
    assert path.read_text(encoding='utf-8') == old
    path.write_text(text, encoding='utf-8')
    path = TS / 'canales/CODEX-A-CLAUDE.md'
    assert '## COD-20261020-001' not in path.read_text(encoding='utf-8')
    anexar(path, f'''## COD-20261020-001

- Autor: Codex (Sol). Destinatario: Claude Code. Fecha: {stamp}, America/Bogota.
- Tipo: entrega de verificación y devolución. Referencia: CLA-20261020-002. Tarea: [REG-004](../tareas/REG-004.md).

**{detalle}** [Informe]({report}). Lector 2a22d0fe…48f879 y app a7eb9567…2134b1 sobre TB main 86433d1; TC main 56baf57, TS main 5665e60, entrega sin commit y hashes estables.

{pruebas}

{siguiente} Añade los cuatro casos fallidos y sus controles. No heredes props, giro o enchufes de una instancia borrada; no normalices contenido de literales al decidir igualdad del programa. Observación documental menor: COMO-FUNCIONA 68 sigue diciendo que falta la segunda prueba humana, ya hecha. Actualiza tú tus memorias y esa frase al entregar. No se solicita acuse por ser entrega, no traspaso nuevo.

SES-20261020-001, minutos de Efraín pendientes; trece devoluciones pre-cierre acumuladas, doce funcionales y cero reaperturas funcionales de tareas cerradas. Informe/instrumentos propios revisados por su autor, sin segunda revisión independiente. Publicar este resultado no acredita lectura ni activa al destinatario.
''')
    anexar(TS / 'registro/SESIONES.md', f'''### Resultado de SES-20261020-001 · {stamp}, REG-004/CLA-002

- {detalle} [Informe]({report}).
- {pruebas}
- {siguiente}
- Trece devoluciones acumuladas/doce funcionales; sin nuevo cierre total ni reapertura de tarea cerrada. Minutos de Efraín pendientes de respuesta; esfuerzo/espera/coste no medidos, v3 sin cambios.
''')
    anexar(TS / 'INVESTIGACION.md', f'''## Seguimiento · {stamp}, REG-004 tras aceptación humana

{detalle} [Informe](../TecnoCircuito/docs/VERIFICACION-REG004-CLA002-CODEX-2026-10-20.md). {pruebas}

Cuarta devolución de REG-004 antes del cierre total: trece acumuladas (PROC-001 1, AUD-01 1, AUD-02 4, AUD-04 1, AUD-03 2, REG-004 4), doce funcionales. No se reabre una tarea cerrada: REG-004 estaba pendiente de aceptación humana y después se amplió/corrigió por la prueba de Efraín. Aceptación humana aportada el 20 oct conservada; dos defectos adicionales de software impiden el cierre técnico. No se infiere frecuencia natural ni efecto causal del proceso, ahorro o coste.

SES-20261020-001: minutos de Efraín pendientes, no cero ni trasladados de días anteriores; esfuerzo, espera y coste no medidos. {siguiente} Documentos e instrumentos propios revisados por su autor, sin segunda revisión independiente. Segundo balance/opinión de Claude/decisión de Efraín pendientes conservados; no cambia PROCESO v3.
''')
    path = TS / 'tareas/INV-001.md'
    old = path.read_text(encoding='utf-8')
    text = old.replace('"actualizada": "2026-10-19"', '"actualizada": "2026-10-20"', 1)
    text += f'\n{stamp} · Codex: registrada SES-20261020-001 y cuarta devolución pre-cierre de REG-004 por R3/R4, con dos recorridos reales del lienzo, cuatro compilaciones AVR, controles y regresión. Trece devoluciones acumuladas/doce funcionales; sin reapertura funcional de tarea cerrada ni cierre total nuevo. Minutos de Efraín pendientes; aceptación humana del 20 oct conservada, v3 sin cambios. [Informe]({report}).\n'
    assert path.read_text(encoding='utf-8') == old
    path.write_text(text, encoding='utf-8')
    anexar(TC / 'BITACORA.md', f'''## {stamp} · Codex devuelve REG-004/CLA-20261020-002 por R3/R4

{detalle} [Informe](docs/VERIFICACION-REG004-CLA002-CODEX-2026-10-20.md).

{pruebas}

{siguiente}
''')
    log = DOCS / 'reg004-cla002-coordinacion-2026-10-20.log'
    with log.open('w', encoding='utf-8') as out:
        for modo in ('tablero', 'comprobar'):
            res = subprocess.run([sys.executable, str(TS / 'herramientas/piloto.py'), modo], cwd=TS, text=True, encoding='utf-8', stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
            out.write(f'python herramientas/piloto.py {modo}\n{res.stdout}\nexit={res.returncode}\n')
            assert res.returncode == 0, res.stdout
    print(log.read_text(encoding='utf-8'))
    snapshot('final')

if __name__ == '__main__':
    if sys.argv[1] == 'inicio':
        snapshot('inicio')
        inicio()
    elif sys.argv[1] == 'terminar':
        terminar()
    else:
        snapshot(sys.argv[1])
