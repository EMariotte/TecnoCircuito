"""Ejecuta las pruebas originales de TecnoBloques con errores controlados, sin editar sus archivos.

Desde la raíz: python -I docs/verificar-r8-2026-10-11.py
Necesita el HTML del hermano construido con la copia local y Python/Playwright/Chromium.
"""
import json
import runpy
import subprocess
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
RAIZ = Path(__file__).resolve().parent.parent
HERMANO = RAIZ.parent / 'TecnoBloques'
SALIDA = RAIZ / 'prototipo/pruebas/capturas/revalidacion-codex-r8'

if len(sys.argv) == 3:
    from playwright.sync_api import Page
    original = Page.goto
    caso = sys.argv[2]

    def goto_con_error(self, *args, **kwargs):
        resultado = original(self, *args, **kwargs)
        if caso == 'javascript':
            self.evaluate("setTimeout(() => { throw new Error('CODEX_R8_ERROR_CONTROLADO'); }, 0)")
        elif caso == 'archivo':
            faltante = (SALIDA / 'CODEX_R8_ARCHIVO_INEXISTENTE.svg').as_uri()
            self.evaluate('(url) => { const i = new Image(); i.src = url; document.body.appendChild(i); }', faltante)
        return resultado

    Page.goto = goto_con_error
    runpy.run_path(str(HERMANO / 'test' / sys.argv[1]), run_name='__main__')
else:
    SALIDA.mkdir(parents=True, exist_ok=True)
    assert not (SALIDA / 'CODEX_R8_ARCHIVO_INEXISTENTE.svg').exists()
    resultados = []
    for script in ['prueba.py', 'prueba_todo.py']:
        for caso in ['normal', 'javascript', 'archivo']:
            p = subprocess.run([sys.executable, '-I', str(Path(__file__).resolve()), script, caso],
                               cwd=HERMANO, capture_output=True, text=True, encoding='utf-8', errors='replace')
            salida = p.stdout + p.stderr
            (SALIDA / f'{script}-{caso}.log').write_text(salida, encoding='utf-8')
            esperado = 0 if caso == 'normal' else 1
            marca = '' if caso == 'normal' else ('CODEX_R8_ERROR_CONTROLADO' if caso == 'javascript' else 'no cargó:')
            correcto = p.returncode == esperado and marca in salida and (caso != 'javascript' or 'pageerror:' in salida)
            resultado = {'script': script, 'caso': caso, 'exit': p.returncode, 'esperado': esperado, 'correcto': correcto}
            resultados.append(resultado)
            print(json.dumps(resultado, ensure_ascii=False), flush=True)
    (SALIDA / 'resultados.json').write_text(json.dumps(resultados, indent=2), encoding='utf-8')
    sys.exit(0 if all(r['correcto'] for r in resultados) else 1)
