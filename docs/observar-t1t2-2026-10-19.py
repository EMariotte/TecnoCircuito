# SPDX-License-Identifier: Apache-2.0
"""Ejecuta la prueba original, agregando solo observación de sus listas de lecturas."""
from pathlib import Path
import sys

source_file = Path(__file__).resolve().parents[1] / 'prototipo/pruebas/probar_t1t2.py'
source = source_file.read_text(encoding='utf-8')
anchor = "    revisar(len(limpio) >= 15 and len(set(limpio)) == 1,"
assert source.count(anchor) == 1
source = source.replace(anchor, "    print('OBSERVACION_T2', repr({'realista': ruido, 'ideal': limpio}))\n" + anchor)
sys.argv = [str(source_file), str(source_file.parents[1] / 'dist/prototipo.html'), str(source_file.parent / 'capturas')]
exec(compile(source, str(source_file), 'exec'), {'__file__': str(source_file), '__name__': '__main__'})
