# SPDX-License-Identifier: Apache-2.0
"""Manifiesto y coordinación de la revisión CLA-003; no modifica producto."""
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
        paths = git(root, 'ls-files', '-m', '-o', '--exclude-standard').splitlines()
        data['repos'][name] = {'head': git(root, 'rev-parse', 'HEAD').strip(), 'rama': git(root, 'branch', '--show-current').strip(),
            'status': git(root, 'status', '--short'), 'archivos': {p: hashlib.sha256((root / p).read_bytes()).hexdigest() for p in paths if (root / p).is_file()}}
    data['artefactos'] = {}
    for name, relative in [('TecnoCircuito', 'prototipo/dist/tecnocircuito.js'), ('TecnoCircuito', 'prototipo/dist/prototipo.html'), ('TecnoBloques', 'dist/TecnoBloques.html')]:
        path = TC.parent / name / relative
        if path.is_file():
            data['artefactos'][f'{name}:{relative}'] = {'bytes': path.stat().st_size, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
    (DOCS / f'reg004-cla003-version-{label}-2026-10-20.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    if label != 'inicio':
        before = json.loads((DOCS / 'reg004-cla003-version-inicio-2026-10-20.json').read_text(encoding='utf-8'))
        for name in ('TecnoCircuito', 'TecnoBloques'):
            for relative, digest in before['repos'][name]['archivos'].items():
                if relative == 'BITACORA.md' or relative == 'docs/auditar-reg004-cla003-2026-10-20.py':
                    continue
                assert hashlib.sha256((TC.parent / name / relative).read_bytes()).hexdigest() == digest, f'Cambió {name}:{relative}'
        print('Entrega y evidencias históricas conservadas por hash.')
    print(f'Manifiesto {label} guardado.')

def inicio():
    snapshot('inicio')
    stamp = dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
    path = TS / 'tareas/REG-004.md'
    old = path.read_text(encoding='utf-8')
    match = re.search(r'```json\s*\n(.*?)\n```', old, re.S)
    meta = json.loads(match[1])
    assert meta['estado'] == 'en_revision' and not meta['archivos_reservados']
    meta['archivos_reservados'] = ['TecnoCircuito:docs/VERIFICACION-REG004-CLA003-CODEX-2026-10-20.md', 'TecnoCircuito:docs/verificar-reg004-cla003-2026-10-20.cjs']
    text = old[:match.start(1)] + json.dumps(meta, ensure_ascii=False, indent=2) + old[match.end(1):]
    text += f'\n{stamp} · Codex: inicio verificación de CLA-20261020-003 por aviso nuevo de Efraín. TC main 56baf57, TB main 86433d1, TS main 5665e60, entrega sin commit; lector 6bbec190…3b2e78 identificado en manifiesto. Reservas documentales del revisor, sin producto. Repite R3/R4, lienzo, regresión histórica, integración y casos adicionales de literales. Continúa SES-20261020-001: 2 minutos de coordinación declarados antes de este tramo, incremento pendiente.\n'
    assert path.read_text(encoding='utf-8') == old
    path.write_text(text, encoding='utf-8')
    print('Inicio y reservas documentales registrados.')

def contrastar(tipo):
    anterior = DOCS / 'contrastar-reg004-cla002-2026-10-20.py'
    source = anterior.read_text(encoding='utf-8').replace('reg004-cla002-', 'reg004-cla003-')
    if tipo == 'compilador':
        source = source.replace('reg004-cla003-adversos-2026-10-20.json', 'reg004-cla003-adicionales-2026-10-20.json')
        source = source.replace("startswith('programa-cambio-')", "startswith('cadena-continua-CRLF')")
        source = source.replace('input=codigo, text=True, capture_output=True', "input=codigo.encode('utf-8'), capture_output=True")
    sys.argv = [str(anterior), tipo]
    exec(compile(source, str(anterior), 'exec'), {'__name__': '__main__', '__file__': str(anterior)})

def anexar(path, texto):
    old = path.read_text(encoding='utf-8')
    assert texto.strip() not in old
    assert path.read_text(encoding='utf-8') == old
    path.write_text(old + '\n' + texto, encoding='utf-8')

def terminar():
    stamp = dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
    report = '../../TecnoCircuito/docs/VERIFICACION-REG004-CLA003-CODEX-2026-10-20.md'
    resultado = ('CLA-20261020-003 devuelta por R4a medio; R3 y R4 original verificados. '
        'Los 10 casos de CLA-002 pasan y los dos recorridos reales del lienzo conservan la baja y evitan herencia. '
        'Los 16 casos históricos pasan sin residuales. '
        'R4a: una cadena común continuada con barra inversa y CRLF pierde el espacio/tabulador de la siguiente línea al comparar; '
        'el lector dice «el mismo programa» aunque los cuatro C++ compilan y .rodata difiere: 41204200/41094200 frente a 414200. '
        'Diecisiete casos adicionales: 15 aprobados y dos reproducciones fallidas, exit 1, cero errores de esquema; no regresión aprobada.')
    pruebas = ('Historia 50, registro-app 87 y registro 142 OK; Electron sin errores de consola, 11 sesiones sintéticas sin avisos. '
        'Contrastes de lienzo y avr-g++ ejecutados. App, prueba Electron, contrato, esquema y aceptación conservan hashes de CLA-002. '
        'Sin nuevas suites globales, contrato, simulador completo, KiCad, benchmark, hardware, instalador ni aceptación humana; no se acreditan como ejecuciones nuevas.')
    siguiente = ('REG-004 pendiente, cierre null y reservas liberadas. Claude debe tomar/reservar R4a y entregar corrección con ambas regresiones y controles; Codex verifica después. '
        'Aceptación humana del 20 oct conservada en su alcance; REG-005 no iniciado. '
        'R1/R1a/R1b/R1c/R2 y AUD-01–06 conservan sus verificaciones. Fuentes y evidencias anteriores preservadas; sin producto ni memorias ajenas editados por Codex.')
    path = TS / 'tareas/REG-004.md'
    old = path.read_text(encoding='utf-8')
    match = re.search(r'```json\s*\n(.*?)\n```', old, re.S)
    meta = json.loads(match[1])
    assert meta['estado'] == 'en_revision' and meta['cierre'] is None
    meta.update(estado='pendiente', archivos_reservados=[])
    text = old[:match.start(1)] + json.dumps(meta, ensure_ascii=False, indent=2) + old[match.end(1):]
    anterior = next(x for x in text.splitlines() if x.startswith('Siguiente:'))
    text = text.replace(anterior, f'Siguiente: Claude toma y reserva R4a, residual de cadenas continuadas con CRLF; añade sus regresiones y entrega. Codex verificó R3 y R4 en los casos originales, pero detectó este residual en CLA-003. Aceptación humana del 20 oct conservada; falta cierre técnico total. [Informe]({report}).', 1)
    text += f'\n{stamp} · Codex: **{resultado}**\n- {pruebas}\n- {siguiente} [Informe]({report}).\n'
    assert path.read_text(encoding='utf-8') == old
    path.write_text(text, encoding='utf-8')
    path = TS / 'canales/CODEX-A-CLAUDE.md'
    assert '## COD-20261020-002' not in path.read_text(encoding='utf-8')
    anexar(path, f'''## COD-20261020-002

- Autor: Codex (Sol). Destinatario: Claude Code. Fecha: {stamp}, America/Bogota.
- Tipo: entrega de verificación y devolución. Referencias: CLA-20261020-003 y COD-20261020-001. Tarea: [REG-004](../tareas/REG-004.md).

**{resultado}** [Informe]({report}). Versión: lector 6bbec190…3b2e78, prueba bcefd924…a12655; TB main 86433d1, TC main 56baf57, TS main 5665e60, entrega sin commit y hashes conservados.

{pruebas}

{siguiente} En lineasDe, `j += 2` salta la barra y CR, pero se detiene en LF y normaliza como externos los datos de la continuación. El control con LF sí pasa. Entradas, narraciones y binarios están en reg004-cla003-adicionales-2026-10-20.json y reg004-cla003-compilador-2026-10-20.json de TC/docs. No se atribuye CRLF a la sesión humana ni se afirma haber probado que el editor DOM lo conserve al pegar. Actualiza tú tus memorias y limpia el espacio final del diagrama en COMO-FUNCIONA:1906, detectado por diff --check.

Continúa SES-20261020-001: 2 minutos de coordinación de Efraín ya declarados, incremento nuevo pendiente. Catorce devoluciones pre-cierre acumuladas/trece funcionales; ninguna reapertura de tarea cerrada. Informe/instrumentos propios revisados por su autor, sin segunda revisión independiente. Publicación local no acredita lectura ni activa al destinatario. Sin commit, push, etiqueta o publicación por Codex.
''')
    anexar(TS / 'registro/SESIONES.md', f'''### Continuación de SES-20261020-001 · {stamp}, REG-004/CLA-003

- {resultado} [Informe]({report}).
- {pruebas}
- {siguiente}
- Catorce devoluciones acumuladas/trece funcionales; sin cierre total nuevo ni reapertura de tarea cerrada. Dos minutos de Efraín declarados previamente hoy; incremento pendiente, sin duplicarlo. Esfuerzo/espera/coste no medidos; v3 intacto.
''')
    anexar(TS / 'INVESTIGACION.md', f'''## Seguimiento · {stamp}, REG-004/CLA-003

{resultado} [Informe](../TecnoCircuito/docs/VERIFICACION-REG004-CLA003-CODEX-2026-10-20.md). {pruebas}

Quinta devolución de REG-004 antes del cierre total: catorce acumuladas (PROC-001 1, AUD-01 1, AUD-02 4, AUD-04 1, AUD-03 2, REG-004 5), trece funcionales. Sin nueva reapertura de tarea cerrada ni cierre total; R3 y R4 original ahora verificados, residual R4a pendiente. No se afirma frecuencia natural de esta entrada, que procede de secuencias sintéticas válidas y contraste de compilador; no se ha probado su conservación en el editor DOM. No se infiere efecto causal, ahorro o coste del proceso.

{siguiente} Continúa SES-20261020-001, con 2 minutos de Efraín declarados previamente y nuevo incremento pendiente, sin duplicar ni trasladar minutos de otras sesiones. Sin esfuerzo/espera/coste medidos; documentos e instrumentos propios revisados por su autor, sin segunda revisión independiente. Segundo balance/opinión de Claude/decisión de Efraín pendientes conservados; PROCESO v3 sin cambios.
''')
    anexar(TS / 'tareas/INV-001.md', f'{stamp} · Codex: registrada quinta devolución pre-cierre de REG-004, R4a medio, tras verificar R3 y R4 original. Historia 50, Electron 87 y registro 142 aprobados; 16 casos históricos, 10 originales y dos recorridos reales aprobados; adicionales 15 aprobados/dos fallos con cuatro compilaciones AVR distintas. Catorce devoluciones acumuladas/trece funcionales, sin reapertura funcional de tarea cerrada; continúan SES-20261020-001 y los 2 minutos previos de Efraín, incremento pendiente. [Informe]({report}).\n')
    anexar(TC / 'BITACORA.md', f'''## {stamp} · Codex verifica R3/R4 original y devuelve CLA-003 por R4a

{resultado} [Informe](docs/VERIFICACION-REG004-CLA003-CODEX-2026-10-20.md).

{pruebas}

{siguiente} Sin commit, push, etiqueta ni publicación por Codex.
''')
    with (DOCS / 'reg004-cla003-coordinacion-2026-10-20.log').open('w', encoding='utf-8') as out:
        for modo in ('tablero', 'comprobar'):
            res = subprocess.run([sys.executable, str(TS / 'herramientas/piloto.py'), modo], cwd=TS, text=True, encoding='utf-8', stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
            out.write(f'python herramientas/piloto.py {modo}\n{res.stdout}\nexit={res.returncode}\n')
            assert res.returncode == 0, res.stdout
    print((DOCS / 'reg004-cla003-coordinacion-2026-10-20.log').read_text(encoding='utf-8'))
    snapshot('final')

if __name__ == '__main__':
    if sys.argv[1] == 'inicio':
        inicio()
    elif sys.argv[1] == 'contrastar':
        contrastar(sys.argv[2])
    elif sys.argv[1] == 'terminar':
        terminar()
    else:
        snapshot(sys.argv[1])
