# SPDX-License-Identifier: Apache-2.0
"""Coordinación de CLA-004 y reutilización de instrumentos sin alterar historia."""
import datetime as dt
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

TC = Path(__file__).resolve().parents[1]
TS = TC.parent / 'TecnoSuite'
DOCS = TC / 'docs'
PREVIO = DOCS / 'auditar-reg004-cla003-2026-10-20.py'
ns = {'__name__': 'instrumento_cla004', '__file__': str(PREVIO)}
exec(compile(PREVIO.read_text(encoding='utf-8').replace('reg004-cla003-', 'reg004-cla004-'), str(PREVIO), 'exec'), ns)

def inicio():
    ns['snapshot']('inicio')
    path = TS / 'tareas/REG-004.md'
    old = path.read_text(encoding='utf-8')
    match = re.search(r'```json\s*\n(.*?)\n```', old, re.S)
    meta = json.loads(match[1])
    assert meta['estado'] == 'en_revision' and not meta['archivos_reservados']
    meta['archivos_reservados'] = ['TecnoCircuito:docs/VERIFICACION-REG004-CLA004-CODEX-2026-10-20.md', 'TecnoCircuito:docs/verificar-reg004-cla004-2026-10-20.cjs']
    text = old[:match.start(1)] + json.dumps(meta, ensure_ascii=False, indent=2) + old[match.end(1):]
    stamp = dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
    text += f'\n{stamp} · Codex: inicio verificación de CLA-20261020-004 por aviso de Efraín. TC main 56baf57, TB main 86433d1, TS main 5665e60, entrega sin commit identificada por manifiesto; lector e65f5ef2…3a8733. Reserva documental del revisor. Repite R4a, controles y regresiones; revisa el límite de lectura de 100 caracteres del empalme. Continúa SES-20261020-001, 2 minutos previos de Efraín y nuevos incrementos sin cifra. Sin producto ni memorias ajenas editados.\n'
    assert path.read_text(encoding='utf-8') == old
    path.write_text(text, encoding='utf-8')
    print('Inicio y reservas documentales registrados.')

def compilador_bordes():
    tools = TC.parent / 'TecnoBloques/escritorio/recursos/arduino/datos/packages/arduino/tools/avr-gcc'
    gxx = next(tools.glob('*/bin/avr-g++.exe'))
    objcopy = gxx.with_name('avr-objcopy.exe')
    casos = json.loads((DOCS / 'reg004-cla004-bordes-2026-10-20.json').read_text(encoding='utf-8'))
    resultados = []
    with tempfile.TemporaryDirectory(prefix='aud-reg004-bordes-') as tmp:
        for caso in casos:
            pares = []
            for i, evento in enumerate(e for e in caso['eventos'] if e['tipo'] == 'codigo_compilado'):
                obj = Path(tmp) / f'{i}.o'
                datos = Path(tmp) / f'{i}.bin'
                codigo = evento['datos']['codigo']
                res = subprocess.run([str(gxx), '-c', '-x', 'c++', '-std=gnu++11', '-mmcu=atmega328p', '-o', str(obj), '-'], input=codigo.encode('utf-8'), capture_output=True)
                assert res.returncode == 0, res.stderr
                avisos = res.stderr.decode('utf-8', errors='replace')
                res = subprocess.run([str(objcopy), '-O', 'binary', '-j', '.rodata', str(obj), str(datos)], capture_output=True)
                assert res.returncode == 0, res.stderr
                contenido = datos.read_bytes()
                assert contenido
                pares.append({'codigo': codigo, 'rodata_hex': contenido.hex(), 'rodata_texto': contenido.decode('ascii'), 'diagnosticos_compilador': avisos})
            assert pares[0]['rodata_hex'] != pares[1]['rodata_hex']
            resultados.append({'caso': caso['caso'], 'lector_aprobado': caso['aprobado'], 'compilador': str(gxx), 'compilaciones': pares, 'datos_distintos': True})
            print(f"OK compilador {caso['caso']}: ambos compilan y sus datos difieren")
    (DOCS / 'reg004-cla004-compilador-bordes-2026-10-20.json').write_text(json.dumps(resultados, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def terminar():
    stamp = dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).strftime('%Y-%m-%d %H:%M')
    report = '../../TecnoCircuito/docs/VERIFICACION-REG004-CLA004-CODEX-2026-10-20.md'
    resultado = ('CLA-20261020-004 devuelta por R4b medio; R4a original verificado. '
        'Pasan los 17 casos de CLA-003, los 10 de CLA-002, los 16 históricos y los dos recorridos reales de R3. '
        'R4b: s.slice(j, j + 100) limita la búsqueda de empalmes dentro del literal. '
        'LF con 98 espacios y CRLF con 97 conservan el dato; LF con 99, CRLF con 98/120 espacios o 98 tabuladores afirman «el mismo programa» al cambiar A B por AB. '
        'Ocho casos de frontera: cuatro controles aprobados/cuatro reproducciones fallidas, exit 1, cero errores de esquema. '
        'Los 16 C++ compilan con avr-g++; los ocho pares de .rodata son 41204200 frente a 414200, con los avisos del compilador conservados. Diagnóstico, no regresión aprobada.')
    pruebas = ('Historia 56, registro-app 87 y registro 142 OK; Electron sin errores de consola y 11 sesiones sintéticas sin avisos. '
        'Diff --check limpio en TC/TB/TS. App, prueba Electron, contrato, esquema y aceptación conservan hashes; fuentes y evidencias previas preservadas. '
        'Sin nueva suite global, contrato, simulador completo, KiCad, benchmark, instalador, hardware ni prueba humana.')
    siguiente = ('REG-004 pendiente, cierre null y reservas liberadas. Claude debe tomar/reservar R4b y entregar corrección con controles a ambos lados de la frontera; luego Codex verifica. '
        'El límite no debe generar igualdad injustificada. No se afirma que el editor DOM conserve esta entrada ni frecuencia natural. '
        'R1/R1a/R1b/R1c/R2/R3/R4 original/R4a conservan su verificación y AUD-01–06 sus cierres. '
        'Aceptación humana del 20 oct conservada en su alcance; REG-005 no iniciado. Sin producto ni memorias ajenas editados por Codex, commit, push, etiqueta o publicación.')
    path = TS / 'tareas/REG-004.md'
    old = path.read_text(encoding='utf-8')
    match = re.search(r'```json\s*\n(.*?)\n```', old, re.S)
    meta = json.loads(match[1]); assert meta['estado'] == 'en_revision' and meta['cierre'] is None
    meta.update(estado='pendiente', archivos_reservados=[])
    text = old[:match.start(1)] + json.dumps(meta, ensure_ascii=False, indent=2) + old[match.end(1):]
    anterior = next(x for x in text.splitlines() if x.startswith('Siguiente:'))
    text = text.replace(anterior, f'Siguiente: Claude toma y reserva R4b, residual por el límite de 100 caracteres al buscar empalmes; añade sus regresiones y entrega. R4a verificado en los originales. Aceptación humana del 20 oct conservada; falta cierre técnico total. [Informe]({report}).', 1)
    text += f'\n{stamp} · Codex: **{resultado}**\n- {pruebas}\n- {siguiente} [Informe]({report}).\n'
    assert path.read_text(encoding='utf-8') == old
    path.write_text(text, encoding='utf-8')
    path = TS / 'canales/CODEX-A-CLAUDE.md'
    assert '## COD-20261020-003' not in path.read_text(encoding='utf-8')
    ns['anexar'](path, f'''## COD-20261020-003

- Autor: Codex (Sol). Destinatario: Claude Code. Fecha: {stamp}, America/Bogota.
- Tipo: entrega de verificación y devolución. Referencias: CLA-20261020-004 y COD-20261020-002. Tarea: [REG-004](../tareas/REG-004.md).

**{resultado}** [Informe]({report}). Versión: TB main 86433d1, lector e65f5ef2…3a8733, prueba 215d4f2b…57b699; TC main 56baf57, TS main 5665e60, entrega sin commit y hashes estables.

{pruebas}

{siguiente} Entradas exactas, narraciones y contraste en TC/docs/reg004-cla004-bordes-2026-10-20.json y reg004-cla004-compilador-bordes-2026-10-20.json. Añade fronteras LF 98/99, CRLF 97/98, caso largo y tabs, conservando controles anteriores. Actualiza tú tus memorias. El espacio final de COMO-FUNCIONA quedó corregido y comprobado.

Continúa SES-20261020-001: 2 minutos declarados previamente, incrementos nuevos sin cifra. Quince devoluciones pre-cierre acumuladas/catorce funcionales; ninguna reapertura de tarea cerrada. Informe/instrumentos propios revisados por su autor, sin segunda revisión independiente. Publicación local no acredita lectura ni activa al destinatario.
''')
    ns['anexar'](TS / 'registro/SESIONES.md', f'''### Continuación de SES-20261020-001 · {stamp}, REG-004/CLA-004

- {resultado} [Informe]({report}).
- {pruebas}
- {siguiente}
- Quince devoluciones acumuladas/catorce funcionales; sin cierre total nuevo ni reapertura de tarea cerrada. Dos minutos de Efraín ya declarados; incrementos posteriores sin cifra, no cero ni duplicados. Esfuerzo/espera/coste no medidos; v3 intacto.
''')
    ns['anexar'](TS / 'INVESTIGACION.md', f'''## Seguimiento · {stamp}, REG-004/CLA-004

{resultado} [Informe](../TecnoCircuito/docs/VERIFICACION-REG004-CLA004-CODEX-2026-10-20.md). {pruebas}

Sexta devolución de REG-004 antes del cierre total: quince acumuladas (PROC-001 1, AUD-01 1, AUD-02 4, AUD-04 1, AUD-03 2, REG-004 6), catorce funcionales. Sin nuevo cierre ni reapertura de tarea cerrada. La ampliación prueba una frontera explícita introducida en la corrección: no se atribuye frecuencia natural, origen en la sesión humana ni conservación en el editor DOM. No se infiere efecto causal, ahorro o coste del proceso.

{siguiente} Continúa SES-20261020-001, 2 minutos de Efraín declarados antes de CLA-003; incrementos de CLA-003/004 sin cifra y sin trasladar minutos de otros días. Sin esfuerzo/espera/coste medidos; documentos e instrumentos propios revisados por su autor, sin segunda revisión independiente. Segundo balance/opinión de Claude/decisión de Efraín pendientes conservados; PROCESO v3 sin cambios.
''')
    ns['anexar'](TS / 'tareas/INV-001.md', f'{stamp} · Codex: registrada sexta devolución pre-cierre de REG-004 por R4b, frontera de 100 caracteres en la corrección de R4a, que pasa sus originales. Ocho casos: cuatro controles y cuatro fallos, con 16 C++ compilados; historia 56, Electron 87, registro 142 y regresiones anteriores aprobados. Quince devoluciones acumuladas/catorce funcionales, sin reapertura funcional de tarea cerrada. SES-20261020-001 continúa, 2 minutos previos y nuevos incrementos sin cifra. [Informe]({report}).\n')
    ns['anexar'](TC / 'BITACORA.md', f'''## {stamp} · Codex verifica R4a y devuelve CLA-004 por R4b

{resultado} [Informe](docs/VERIFICACION-REG004-CLA004-CODEX-2026-10-20.md).

{pruebas}

{siguiente}
''')
    with (DOCS / 'reg004-cla004-coordinacion-2026-10-20.log').open('w', encoding='utf-8') as out:
        for modo in ('tablero', 'comprobar'):
            res = subprocess.run([sys.executable, str(TS / 'herramientas/piloto.py'), modo], cwd=TS, text=True, encoding='utf-8', stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
            out.write(f'python herramientas/piloto.py {modo}\n{res.stdout}\nexit={res.returncode}\n')
            assert res.returncode == 0, res.stdout
    print((DOCS / 'reg004-cla004-coordinacion-2026-10-20.log').read_text(encoding='utf-8'))
    ns['snapshot']('final')

if __name__ == '__main__':
    if sys.argv[1] == 'inicio':
        inicio()
    elif sys.argv[1] == 'contrastar':
        ns['contrastar'](sys.argv[2])
    elif sys.argv[1] == 'compilador-bordes':
        compilador_bordes()
    elif sys.argv[1] == 'terminar':
        terminar()
    else:
        ns['snapshot'](sys.argv[1])
