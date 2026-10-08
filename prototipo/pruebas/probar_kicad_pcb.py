"""Prueba la netlist con KiCad de verdad: huellas, símbolos, la plantilla «Arduino Uno Shield» y la placa armada.

Necesita KiCad (probado con 10.0.3) y los .net que deja `npm run probar:kicad` en pruebas/capturas/kicad/.
Se corre con cualquier Python: busca el Python de KiCad (que trae el módulo pcbnew) y se vuelve a lanzar con él.
Si KiCad no está instalado, avisa y se salta (no falla).

1. Cada huella de las piezas existe en las librerías de KiCad, con los pads que usamos y los pines de su símbolo.
2. Los conectores J1 a J4 son los de la plantilla «Arduino Uno Shield» (referencia, huella y UUID), y cada pin
   del Uno cae en el pin del conector que la plantilla le da (se compara con la netlist de la propia plantilla).
3. Con cada .net se arma la placa sobre la plantilla, como «Importar netlist»: los conectores se reconocen por su
   referencia, las piezas nuevas van dentro del contorno del Uno y cada nodo encuentra su pad.
4. El DRC de KiCad ve las conexiones por trazar y ningún solape de huellas (el problema de la huella del Uno).
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
PLANTILLA = KICAD / 'share' / 'kicad' / 'template' / 'Arduino_Uno'
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


def cargar_huella(huella):
    lib, nombre = huella.split(':')
    return pcbnew.FootprintLoad(str(HUELLAS / f'{lib}.pretty'), nombre)


def red_en_plantilla(pin):
    """Nombre de la red que la plantilla le da al pin del Uno."""
    if pin.startswith('GND'):
        return 'GND'
    fijos = {'5V': '+5V', '3V3': '+3V3', 'VIN': 'VCC', 'RESET': '/~{RESET}', 'D0': '/RX{slash}0', 'D1': '/TX{slash}1',
             'A4': '/SDA{slash}A4', 'SDA': '/SDA{slash}A4', 'A5': '/SCL{slash}A5', 'SCL': '/SCL{slash}A5'}
    if pin in fijos:
        return fijos[pin]
    if re.fullmatch(r'D\d+', pin):
        return {'/' + pin[1:], '/*' + pin[1:]}  # los PWM llevan * en la plantilla
    return '/' + pin


print('KiCad', pcbnew.Version())
tabla = json.loads((SALIDA / 'piezas.json').read_text(encoding='utf-8'))

# 1. Huellas y símbolos de las piezas
for tipo, d in tabla['piezas'].items():
    fp = cargar_huella(d['huella'])
    revisar(fp is not None, f'{tipo}: la huella {d["huella"]} existe')
    if fp is None:
        continue
    numeros = {p.GetNumber() for p in fp.Pads()}
    faltan = sorted(set(d['pads'].values()) - numeros)
    revisar(not faltan, f'{tipo}: tiene los pads {sorted(set(d["pads"].values()))}' + (f' (faltan {faltan})' if faltan else ''))
    simbolo = pines_del_simbolo(d['lib'], d['parte'])
    if tipo == 'led':
        revisar(simbolo.get(d['pads']['catodo']) == 'K' and simbolo.get(d['pads']['anodo']) == 'A',
                f'led: cátodo = pad {d["pads"]["catodo"]} (K) y ánodo = pad {d["pads"]["anodo"]} (A), como en el símbolo')
    else:
        revisar(set(d['pads'].values()) <= set(simbolo), f'{tipo}: los pads son pines del símbolo {d["lib"]}:{d["parte"]} {sorted(simbolo)}')

# 2. Los conectores son los de la plantilla
revisar((PLANTILLA / 'Arduino_Uno.kicad_pcb').exists(), f'KiCad trae la plantilla «Arduino Uno Shield» ({PLANTILLA.name})')
ref_net = SALIDA / 'plantilla.net'
subprocess.run([str(CLI), 'sch', 'export', 'netlist', '-o', str(ref_net), str(PLANTILLA / 'Arduino_Uno.kicad_sch')], capture_output=True)
plantilla = leer_sexpr(ref_net.read_text(encoding='utf-8'))
comps = {valor(c, 'ref'): c for c in hijos(hijos(plantilla, 'components')[0], 'comp')}
red_de_pad = {}
for red in hijos(hijos(plantilla, 'nets')[0], 'net'):
    for nodo in hijos(red, 'node'):
        red_de_pad[(valor(nodo, 'ref'), valor(nodo, 'pin'))] = valor(red, 'name')
for j in tabla['conectores']:
    c = comps.get(j['ref'])
    revisar(c is not None and valor(c, 'footprint') == j['huella'] and valor(c, 'tstamps') == j['uuid'],
            f'{j["ref"]} ({j["valor"]}): misma referencia, huella y UUID que en la plantilla')
    malos = []
    for pin, pad in j['pines'].items():
        esperada, real = red_en_plantilla(pin), red_de_pad.get((j['ref'], pad))
        if not (real in esperada if isinstance(esperada, set) else real == esperada):
            malos.append(f'{pin}→{pad} es «{real}»')
    revisar(not malos, f'{j["ref"]}: {", ".join(j["pines"])} caen en el pin que les da la plantilla' + (f': {malos}' if malos else ''))

# 3 y 4. Cada netlist se arma sobre la placa de la plantilla y se revisa con el DRC de KiCad
for archivo in sorted(SALIDA.glob('t*.net')):
    net = leer_sexpr(archivo.read_text(encoding='utf-8'))
    revisar(net[0] == 'export' and valor(net, 'version') == 'E', f'{archivo.name}: KiCad la leería como «export» versión E')
    placa = pcbnew.LoadBoard(str(PLANTILLA / 'Arduino_Uno.kicad_pcb'))
    contorno = placa.GetBoardEdgesBoundingBox()
    en_placa = {fp.GetReference(): fp for fp in placa.GetFootprints()}
    huellas, nuevas = {}, []
    for comp in hijos(hijos(net, 'components')[0], 'comp'):
        ref = valor(comp, 'ref')
        if ref in en_placa:  # como «Importar netlist»: se reconoce la huella que ya está
            huellas[ref] = en_placa[ref]
            revisar(str(en_placa[ref].GetFPID().GetUniStringLibId()) == valor(comp, 'footprint'), f'{archivo.name}: {ref} es la huella que ya está en la plantilla')
            continue
        fp = cargar_huella(valor(comp, 'footprint'))
        fp.SetReference(ref)
        fp.SetValue(valor(comp, 'value'))
        placa.Add(fp)
        huellas[ref] = fp
        nuevas.append(fp)
    # Las piezas nuevas, en filas dentro del contorno del Uno (entre los conectores de arriba y los de abajo)
    x, y, alto_fila = contorno.GetLeft() + pcbnew.FromMM(6), contorno.GetTop() + pcbnew.FromMM(9), 0
    for fp in nuevas:
        caja = fp.GetCourtyard(pcbnew.F_CrtYd).BBox() if fp.GetCourtyard(pcbnew.F_CrtYd).OutlineCount() else fp.GetBoundingBox()
        if x + caja.GetWidth() > contorno.GetRight() - pcbnew.FromMM(6):
            x, y, alto_fila = contorno.GetLeft() + pcbnew.FromMM(6), y + alto_fila + pcbnew.FromMM(2), 0
        fp.Move(pcbnew.VECTOR2I(x - caja.GetLeft(), y - caja.GetTop()))
        x += caja.GetWidth() + pcbnew.FromMM(2)
        alto_fila = max(alto_fila, caja.GetHeight())
    dentro = all(contorno.Contains(fp.GetBoundingBox()) for fp in nuevas)
    for fp in huellas.values():  # «Actualizar PCB»: las redes salen de la netlist
        for p in fp.Pads():
            p.SetNetCode(0)
    perdidos, pads_por_red = [], {}
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
    revisar(not perdidos, f'{archivo.name}: {len(nuevas)} piezas nuevas y {len(pads_por_red)} redes; cada nodo encontró su pad' + (f' (no: {perdidos})' if perdidos else ''))
    revisar(dentro, f'{archivo.name}: las piezas caben dentro del contorno del Uno')
    pcb = SALIDA / (archivo.stem + '_shield.kicad_pcb')
    pcbnew.SaveBoard(str(pcb), placa)
    informe = SALIDA / (archivo.stem + '_drc.json')
    subprocess.run([str(CLI), 'pcb', 'drc', '--format', 'json', '--severity-all', '-o', str(informe), str(pcb)], capture_output=True)
    drc = json.loads(informe.read_text(encoding='utf-8'))
    pendientes = drc.get('unconnected_items', [])
    esperadas = sum(n - 1 for n in pads_por_red.values())
    solapes = [v['description'] for v in drc.get('violations', []) if 'courtyard' in v.get('type', '') or 'overlap' in v.get('type', '')]
    revisar(len(pendientes) == esperadas,
            f'{archivo.name}: el DRC de KiCad ve {len(pendientes)} conexiones por trazar (esperadas {esperadas}, una menos que los pads de cada red)')
    revisar(not solapes, f'{archivo.name}: el DRC no ve solapes de huellas sobre el shield' + (f': {solapes[:3]}' if solapes else ''))

print(f'\n{fallos} FALLA(S)' if fallos else '\nTODO BIEN')
sys.exit(1 if fallos else 0)
