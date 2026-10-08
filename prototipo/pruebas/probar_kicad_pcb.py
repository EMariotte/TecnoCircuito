"""Prueba la netlist con KiCad de verdad: huellas, símbolos y la placa armada como en «Importar netlist».

Necesita KiCad (probado con 10.0.3) y los .net que deja `npm run probar:kicad` en pruebas/capturas/kicad/.
Se corre con cualquier Python: busca el Python de KiCad (que trae el módulo pcbnew) y se vuelve a lanzar con él.
Si KiCad no está instalado, avisa y se salta (no falla).

1. Cada huella de la tabla (src/kicad.js) existe en las librerías de KiCad y tiene los pads que usamos.
2. Cada pad corresponde al pin correcto del símbolo oficial (D13 = 28, el cátodo del LED = 1 …).
3. Con cada .net se arma una placa: cada nodo encuentra su pad y queda en su red.
4. El DRC de KiCad (kicad-cli) ve las conexiones pendientes de cada red, como las líneas finas del aprendiz.
"""
import glob
import json
import re
import subprocess
import sys
from pathlib import Path

AQUI = Path(__file__).resolve().parent
SALIDA = AQUI / 'capturas' / 'kicad'

try:
    import pcbnew
except ImportError:
    pythons = sorted(glob.glob(r'C:\Program Files\KiCad\*\bin\python.exe'))
    if not pythons:
        print('KiCad no está instalado: se salta la prueba con KiCad.')
        sys.exit(0)
    sys.exit(subprocess.call([pythons[-1], '-I', __file__] + sys.argv[1:]))

KICAD = Path(sys.executable).parent.parent
HUELLAS = KICAD / 'share' / 'kicad' / 'footprints'
SIMBOLOS = KICAD / 'share' / 'kicad' / 'symbols'
CLI = KICAD / 'bin' / 'kicad-cli.exe'

fallos = 0


def revisar(condicion, texto):
    global fallos
    print(('OK    ' if condicion else 'FALLA ') + texto)
    if not condicion:
        fallos += 1


def leer_sexpr(texto):
    """Convierte el texto S-expression en listas anidadas (los textos entre comillas quedan como str)."""
    fichas = re.findall(r'\(|\)|"(?:\\.|[^"\\])*"|[^\s()"]+', texto)
    pila = [[]]
    for f in fichas:
        if f == '(':
            pila.append([])
        elif f == ')':
            hecho = pila.pop()
            pila[-1].append(hecho)
        elif f.startswith('"'):
            pila[-1].append(re.sub(r'\\(.)', r'\1', f[1:-1]))
        else:
            pila[-1].append(f)
    return pila[0][0]


def hijos(nodo, nombre):
    return [h for h in nodo[1:] if isinstance(h, list) and h and h[0] == nombre]


def valor(nodo, nombre):
    h = hijos(nodo, nombre)
    return h[0][1] if h and len(h[0]) > 1 else None


def pines_del_simbolo(lib, parte):
    texto = (SIMBOLOS / f'{lib}.kicad_sym').read_text(encoding='utf-8')
    i = texto.find(f'(symbol "{parte}"')
    j = texto.find('\n\t(symbol "', i + 10)
    bloque = texto[i:j if j > 0 else len(texto)]
    return {n: nombre for nombre, n in re.findall(r'\(pin \w+ \w+.*?\(name "([^"]*)".*?\(number "([^"]*)"', bloque, re.S)}


def nombre_en_simbolo_uno(pin):
    if pin.startswith('GND'):
        return 'GND'
    return {'5V': '+5V', 'RESET': '~{RESET}', 'D0': 'D0/RX', 'D1': 'D1/TX', 'A4': 'SDA/A4', 'A5': 'SCL/A5',
            'SDA': 'SDA/A4', 'SCL': 'SCL/A5'}.get(pin, pin)


def cargar_huella(huella):
    lib, nombre = huella.split(':')
    return pcbnew.FootprintLoad(str(HUELLAS / f'{lib}.pretty'), nombre)


print('KiCad', pcbnew.Version())
piezas = json.loads((SALIDA / 'piezas.json').read_text(encoding='utf-8'))

# 1 y 2. Huellas y símbolos
for tipo, d in piezas.items():
    fp = cargar_huella(d['huella'])
    revisar(fp is not None, f'{tipo}: la huella {d["huella"]} existe')
    if fp is None:
        continue
    numeros = {p.GetNumber() for p in fp.Pads()}
    faltan = sorted(set(d['pads'].values()) - numeros)
    revisar(not faltan, f'{tipo}: tiene los pads {sorted(set(d["pads"].values()), key=lambda x: int(x) if x.isdigit() else 0)}' + (f' (faltan {faltan})' if faltan else ''))
    simbolo = pines_del_simbolo(d['lib'], d['parte'])
    if tipo == 'placa':
        malos = [f'{pin}→{pad} es «{simbolo.get(pad)}»' for pin, pad in d['pads'].items() if simbolo.get(pad) != nombre_en_simbolo_uno(pin)]
        revisar(not malos, f'placa: los {len(d["pads"])} pines del Uno caen en el pin correcto del símbolo {d["lib"]}:{d["parte"]}' + (f': {malos}' if malos else ''))
    elif tipo == 'led':
        revisar(simbolo.get(d['pads']['catodo']) == 'K' and simbolo.get(d['pads']['anodo']) == 'A',
                f'led: cátodo = pad {d["pads"]["catodo"]} (K) y ánodo = pad {d["pads"]["anodo"]} (A), como en el símbolo')
    else:
        revisar(set(d['pads'].values()) <= set(simbolo), f'{tipo}: los pads son pines del símbolo {d["lib"]}:{d["parte"]} {sorted(simbolo)}')

# 3 y 4. Cada netlist se arma en una placa y se revisa con el DRC de KiCad
for archivo in sorted(SALIDA.glob('*.net')):
    net = leer_sexpr(archivo.read_text(encoding='utf-8'))
    revisar(net[0] == 'export' and valor(net, 'version') == 'E', f'{archivo.name}: KiCad la leería como «export» versión E')
    placa = pcbnew.BOARD()
    huellas = {}
    for i, comp in enumerate(hijos(hijos(net, 'components')[0], 'comp')):
        fp = cargar_huella(valor(comp, 'footprint'))
        fp.SetReference(valor(comp, 'ref'))
        fp.SetValue(valor(comp, 'value'))
        fp.SetPosition(pcbnew.VECTOR2I_MM(100 * (i > 0) + 30 * i, 100))
        placa.Add(fp)
        huellas[valor(comp, 'ref')] = fp
    perdidos = []
    pads_por_red = {}
    for red in hijos(hijos(net, 'nets')[0], 'net'):
        info = pcbnew.NETINFO_ITEM(placa, valor(red, 'name'))
        placa.Add(info)
        for nodo in hijos(red, 'node'):
            ref, pin = valor(nodo, 'ref'), valor(nodo, 'pin')
            pads = [p for p in huellas[ref].Pads() if p.GetNumber() == pin] if ref in huellas else []
            if not pads:
                perdidos.append(f'{ref}.{pin}')
            for p in pads:
                p.SetNet(info)
            pads_por_red[valor(red, 'name')] = pads_por_red.get(valor(red, 'name'), 0) + len(pads)
    revisar(not perdidos, f'{archivo.name}: {len(huellas)} huellas y {len(pads_por_red)} redes; cada nodo encontró su pad' + (f' (no: {perdidos})' if perdidos else ''))
    pcb = SALIDA / (archivo.stem + '.kicad_pcb')
    pcbnew.SaveBoard(str(pcb), placa)
    informe = SALIDA / (archivo.stem + '_drc.json')
    subprocess.run([str(CLI), 'pcb', 'drc', '--format', 'json', '--severity-all', '-o', str(informe), str(pcb)], capture_output=True)
    drc = json.loads(informe.read_text(encoding='utf-8'))
    pendientes = drc.get('unconnected_items', [])
    esperadas = sum(n - 1 for n in pads_por_red.values())
    revisar(len(pendientes) == esperadas,
            f'{archivo.name}: el DRC de KiCad ve {len(pendientes)} conexiones por trazar (esperadas {esperadas}, una menos que los pads de cada red)')

print(f'\n{fallos} FALLA(S)' if fallos else '\nTODO BIEN')
sys.exit(1 if fallos else 0)
