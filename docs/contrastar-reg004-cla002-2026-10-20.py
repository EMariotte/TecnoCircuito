# SPDX-License-Identifier: Apache-2.0
"""Contrasta reproducciones sintéticas con el lienzo y avr-g++ reales."""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'
sys.stdout.reconfigure(encoding='utf-8')

def compilador():
    tools = ROOT.parent / 'TecnoBloques/escritorio/recursos/arduino/datos/packages/arduino/tools/avr-gcc'
    gxx = next(tools.glob('*/bin/avr-g++.exe'))
    objcopy = gxx.with_name('avr-objcopy.exe')
    casos = json.loads((DOCS / 'reg004-cla002-adversos-2026-10-20.json').read_text(encoding='utf-8'))
    salida = []
    with tempfile.TemporaryDirectory(prefix='aud-reg004-compilador-') as tmp:
        for caso in casos:
            if not caso['caso'].startswith('programa-cambio-'):
                continue
            objetos = []
            for i, ev in enumerate(e for e in caso['eventos'] if e['tipo'] == 'codigo_compilado'):
                obj = Path(tmp) / f'{i}.o'
                datos = Path(tmp) / f'{i}.bin'
                codigo = ev['datos']['codigo']
                res = subprocess.run([str(gxx), '-c', '-x', 'c++', '-std=gnu++11', '-mmcu=atmega328p', '-o', str(obj), '-'], input=codigo, text=True, capture_output=True)
                assert res.returncode == 0, res.stderr
                res = subprocess.run([str(objcopy), '-O', 'binary', '-j', '.rodata', str(obj), str(datos)], text=True, capture_output=True)
                assert res.returncode == 0, res.stderr
                contenido = datos.read_bytes()
                assert contenido
                objetos.append({'codigo': codigo, 'rodata_hex': contenido.hex(), 'rodata_texto': contenido.decode('ascii')})
            assert objetos[0]['rodata_hex'] != objetos[1]['rodata_hex']
            salida.append({'caso': caso['caso'], 'compilador': str(gxx), 'compilaciones': objetos, 'datos_distintos': True})
            print(f"OK {caso['caso']}: ambos C++ compilan; .rodata diferente")
    (DOCS / 'reg004-cla002-compilador-2026-10-20.json').write_text(json.dumps(salida, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def lienzo():
    from playwright.sync_api import sync_playwright
    salida = []
    with sync_playwright() as p:
        nav = p.chromium.launch()
        pg = nav.new_page(viewport={'width': 1366, 'height': 900})
        errores = []
        pg.on('pageerror', lambda e: errores.append(str(e)))
        pg.goto((ROOT / 'prototipo/dist/prototipo.html').as_uri())
        pg.wait_for_function('typeof TecnoCircuito !== "undefined"')
        for caso in ('baja-alta-baja-id-reutilizado', 'propiedad-no-heredada-al-recrear'):
            inicial = {'formato': 1, 'placa': 'uno', 'protoboard': None, 'componentes': [{'id': 'r1', 'tipo': 'resistencia', 'x': 300, 'y': 20, 'rot': 0, 'props': {'ohmios': 220}}], 'cables': []}
            pg.evaluate('''c => {
                if (window.auditLienzo) window.auditLienzo.destruir();
                let host = document.getElementById('auditHost');
                if (!host) { host = document.createElement('div'); host.id = 'auditHost'; document.body.appendChild(host); }
                host.style.cssText = 'position:fixed;inset:0;z-index:99999;background:white';
                window.auditEventos = [];
                window.auditLienzo = TecnoCircuito.crearLienzo(host, { placa:'uno', circuito:c, alEvento:e=>window.auditEventos.push(e) });
            }''', inicial)
            pg.locator('#auditHost .tc-comp[data-id="r1"]').wait_for()
            pg.wait_for_timeout(300)
            pg.locator('#auditHost .tc-comp[data-id="r1"]').click(force=True)
            if caso == 'propiedad-no-heredada-al-recrear':
                pg.locator('#auditHost select[data-prop="ohmios"]').select_option('1000')
            pg.locator('#auditHost [data-accion="borrar"]').evaluate('(el)=>el.click()')
            pg.locator('#auditHost [data-accion="agregar"][data-tipo="resistencia"]').evaluate('(el)=>el.click()')
            pg.wait_for_timeout(300)
            if caso == 'baja-alta-baja-id-reutilizado':
                pg.locator('#auditHost [data-accion="borrar"]').evaluate('(el)=>el.click()')
            resultado = pg.evaluate('({eventos:window.auditEventos,final:window.auditLienzo.circuito()})')
            if caso == 'baja-alta-baja-id-reutilizado':
                assert not resultado['final']['componentes']
                assert [e['tipo'] for e in resultado['eventos']] == ['componente_quitado', 'componente_agregado', 'componente_quitado']
            else:
                assert resultado['final']['componentes'][0]['props']['ohmios'] == 220
                assert [e['tipo'] for e in resultado['eventos']] == ['componente_cambiado', 'componente_quitado', 'componente_agregado']
            salida.append({'caso': caso, 'inicial': inicial, **resultado})
            print(f"OK lienzo real {caso}: secuencia esperada; estado final comprobado")
        assert not errores, errores
        nav.close()
    (DOCS / 'reg004-cla002-lienzo-2026-10-20.json').write_text(json.dumps({'casos': salida, 'errores_js': errores}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

if __name__ == '__main__':
    {'compilador': compilador, 'lienzo': lienzo}[sys.argv[1]]()
