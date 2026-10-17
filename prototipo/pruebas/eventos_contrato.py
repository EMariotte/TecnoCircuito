"""Revisa contra el contrato (contrato/evento.schema.json) los eventos que emite la página de prueba.

La revisión la hace Node con el mismo código de probar:contrato (pruebas/contrato_eventos.js), así Python y Node no
pueden entender el esquema de dos maneras. Uso, desde una prueba de Chromium:

    sys.path.insert(0, str(Path(__file__).parent))   # python -I no agrega la carpeta de la prueba
    from eventos_contrato import vigilar_eventos, revisar_eventos
    eventos = vigilar_eventos(pg)          # antes de abrir la página: junta los eventos aunque se recargue
    …
    revisar_eventos(eventos, revisar, 'servos')
"""
import json
import subprocess
import tempfile
from pathlib import Path

REVISOR = Path(__file__).with_name('contrato_eventos.js')


def vigilar_eventos(pg):
    """Junta en una lista cada evento que la página anota (pagina.html llama a window.guardarEventoTC)."""
    eventos = []

    def guardar(ev):  # Playwright no acepta un método integrado como eventos.append
        eventos.append(ev)

    pg.expose_function('guardarEventoTC', guardar)
    return eventos


def revisar_eventos(fuente, revisar, nombre):
    """Cada evento cumple el esquema. `fuente` es la lista de vigilar_eventos o una página (sus window.eventosTC).
    Devuelve la lista de eventos para revisar más cosas."""
    eventos = list(fuente) if isinstance(fuente, list) else fuente.evaluate('window.eventosTC || []')
    with tempfile.TemporaryDirectory() as carpeta:
        archivo = Path(carpeta) / f'eventos-{nombre}.json'
        archivo.write_text(json.dumps(eventos, ensure_ascii=False), encoding='utf-8')
        r = subprocess.run(['node', str(REVISOR), '--emitidos', str(archivo)], capture_output=True, text=True, encoding='utf-8')
    tipos = sorted({e.get('tipo') for e in eventos})
    revisar(r.returncode == 0 and len(eventos) > 0,
            f'{nombre}: los {len(eventos)} eventos cumplen contrato/evento.schema.json ({", ".join(tipos)})'
            + ('' if r.returncode == 0 else ':\n' + (r.stdout + r.stderr).strip()[:3000]))
    return eventos
