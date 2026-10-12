"""SPDX-License-Identifier: Apache-2.0
Prueba Nano con KiCad real: símbolos, 30 pads, orientación, reguladores/jack y redes.

Necesita los archivos producidos por probar_kicad_nano.js. KiCad ausente es fallo, no omisión.
Genera placas de comprobación con huellas separadas; no fija dimensiones ni valida fabricación/hardware.
"""
import glob
import json
import re
import subprocess
import sys
from pathlib import Path

try:
    import pcbnew
except ImportError:
    candidatos = sorted(glob.glob(r'C:\Program Files\KiCad\*\bin\python.exe'))
    if not candidatos:
        print('FALLA KiCad no está instalado: la prueba Nano requiere KiCad real.')
        sys.exit(1)
    sys.exit(subprocess.call([candidatos[-1], '-I', __file__] + sys.argv[1:]))

KICAD = Path(sys.executable).parent.parent
HUELLAS = KICAD / 'share' / 'kicad' / 'footprints'
SIMBOLOS = KICAD / 'share' / 'kicad' / 'symbols'
CLI = KICAD / 'bin' / 'kicad-cli.exe'
SALIDA = Path(__file__).resolve().parent / 'capturas' / 'kicad_nano'
fallos = 0
comprobaciones = 0


def revisar(condicion, texto):
    global fallos, comprobaciones
    comprobaciones += 1
    print(('OK    ' if condicion else 'FALLA ') + texto)
    if not condicion:
        fallos += 1


def leer(texto):
    pila = [[]]
    for f in re.findall(r'\(|\)|"(?:\\.|[^"\\])*"|[^\s()"]+', texto):
        if f == '(':
            pila.append([])
        elif f == ')':
            hecho = pila.pop()
            pila[-1].append(hecho)
        else:
            pila[-1].append(re.sub(r'\\(.)', r'\1', f[1:-1]) if f.startswith('"') else f)
    if len(pila) != 1 or len(pila[0]) != 1:
        raise ValueError('S-expression incompleta')
    return pila[0][0]


def hijos(nodo, nombre):
    return [h for h in nodo[1:] if isinstance(h, list) and h and h[0] == nombre]


def valor(nodo, nombre):
    h = hijos(nodo, nombre)
    return h[0][1] if h and len(h[0]) > 1 else None


def pines(lib, parte):
    texto = (SIMBOLOS / f'{lib}.kicad_sym').read_text(encoding='utf-8')
    i = texto.find(f'(symbol "{parte}"')
    if i < 0:
        raise ValueError(f'No existe símbolo {lib}:{parte}')
    j = texto.find('\n\t(symbol "', i + 10)
    bloque = texto[i:j if j > 0 else len(texto)]
    base = re.search(r'\(extends "([^"]+)"\)', bloque)
    if base:
        return pines(lib, base.group(1))
    return {n: nombre for nombre, n in re.findall(r'\(pin \w+ \w+.*?\(name "([^"]*)".*?\(number "([^"]*)"', bloque, re.S)}


def cargar(nombre):
    lib, parte = nombre.split(':')
    return pcbnew.FootprintLoad(str(HUELLAS / f'{lib}.pretty'), parte)


print('KiCad', pcbnew.Version())
tabla = json.loads((SALIDA / 'piezas.json').read_text(encoding='utf-8'))
modulo = tabla['modulo']
fp = cargar(modulo['huella'])
revisar(fp is not None, 'Module:Arduino_Nano existe en la biblioteca instalada')
if fp is None:
    sys.exit(1)
por_pad = {p.GetNumber(): p for p in fp.Pads()}
revisar(set(por_pad) == {str(i) for i in range(1, 31)}, 'huella Nano tiene exactamente 30 pads físicos')
simbolo = pines(modulo['lib'], modulo['parte'])
normalizar = {'D1': 'D1/TX', 'D0': 'D0/RX', 'RESET': '~{RESET}', 'RESET2': '~{RESET}',
              'GND1': 'GND', 'GND2': 'GND', '5V': '+5V'}
revisar(all(simbolo.get(pad) == normalizar.get(pin, pin) for pin, pad in modulo['pines'].items()),
        'cada pin del mapa Nano corresponde al nombre del símbolo MCU_Module:Arduino_Nano_v3.x')
for n in range(1, 31):
    p = por_pad[str(n)]
    posicion = p.GetPosition()
    x, y = (0, (n - 1) * 2.54) if n <= 15 else (15.24, (30 - n) * 2.54)
    revisar(abs(pcbnew.ToMM(posicion.x) - x) < 1e-6 and abs(pcbnew.ToMM(posicion.y) - y) < 1e-6,
            f'Nano pad{n}: filas separadas15.24mm y paso2.54mm ({x:.2f},{y:.2f})')
huella_texto = (HUELLAS / 'Module.pretty' / 'Arduino_Nano.kicad_mod').read_text(encoding='utf-8')
revisar(por_pad['1'].GetShape() == pcbnew.PAD_SHAPE_RECT and re.search(r'\(fp_text user "USB"\s*\(at 7\.62 35\.56', huella_texto),
        'pad1 cuadrado identifica TX; serigrafíaUSB está junto al extremo de pads15/16')

for d in tabla['expansion']:
    h = cargar(d['huella'])
    revisar(h is not None, f'{d["clave"]}: huella instalada {d["huella"]}')
    if h is None:
        continue
    numeros = [p.GetNumber() for p in h.Pads()]
    revisar(set(d['pads']) <= set(numeros) and set(d['pads']) <= set(pines(d['lib'], d['parte'])),
            f'{d["clave"]}: todos los pads exportados existen en huella y símbolo')
    if d['clave'].startswith('REG_'):
        nombres = pines(d['lib'], d['parte'])
        revisar(nombres == {'1': 'GND', '2': 'VO', '3': 'VI'} and numeros.count('2') == 2,
                f'{d["clave"]}: 1GND/2VOUT/3VIN; TAB comparte número2 y salida')
    if d['clave'] == 'JACK':
        revisar(set(numeros) == {'1', '2', '3'} and set(d['pads']) == {'1', '2'},
                'jack tiene 3 pads físicos; solo centro1 y sleeve2 llevan red, contacto3 sin conectar')

archivos = sorted(SALIDA.glob('*.net'))
revisar(len(archivos) == 3, 'existen netlists del Nano30pads y expansión de ambas variantes')
for archivo in archivos:
    net = leer(archivo.read_text(encoding='utf-8'))
    revisar(net[0] == 'export' and valor(net, 'version') == 'E', f'{archivo.name}: formato E leído y cerrado')
    placa = pcbnew.BOARD()
    huellas = {}
    for i, comp in enumerate(hijos(hijos(net, 'components')[0], 'comp')):
        ref = valor(comp, 'ref')
        h = cargar(valor(comp, 'footprint'))
        if h is None:
            raise ValueError(f'{archivo.name}: huella ausente {ref}')
        h.SetReference(ref)
        h.SetValue(valor(comp, 'value'))
        h.SetPosition(pcbnew.VECTOR2I(pcbnew.FromMM(50 + (i % 8) * 80), pcbnew.FromMM(50 + (i // 8) * 80)))
        placa.Add(h)
        huellas[ref] = h
    # Contorno amplio de comprobación: no representa el tamaño de la expansión comercial.
    for de, a in [((10, 10), (670, 10)), ((670, 10), (670, 390)), ((670, 390), (10, 390)), ((10, 390), (10, 10))]:
        borde = pcbnew.PCB_SHAPE()
        borde.SetShape(pcbnew.SHAPE_T_SEGMENT)
        borde.SetLayer(pcbnew.Edge_Cuts)
        borde.SetStart(pcbnew.VECTOR2I(pcbnew.FromMM(de[0]), pcbnew.FromMM(de[1])))
        borde.SetEnd(pcbnew.VECTOR2I(pcbnew.FromMM(a[0]), pcbnew.FromMM(a[1])))
        borde.SetWidth(pcbnew.FromMM(0.05))
        placa.Add(borde)
    perdidos = []
    asignados = {}
    for red in hijos(hijos(net, 'nets')[0], 'net'):
        nombre = valor(red, 'name')
        info = pcbnew.NETINFO_ITEM(placa, nombre)
        placa.Add(info)
        for nodo in hijos(red, 'node'):
            ref, numero = valor(nodo, 'ref'), valor(nodo, 'pin')
            pads = [p for p in huellas[ref].Pads() if p.GetNumber() == numero]
            if not pads:
                perdidos.append(ref + '.' + numero)
            for p in pads:
                p.SetNet(info)
            asignados[ref + '.' + numero] = nombre
    revisar(not perdidos, f'{archivo.name}: todos los nodos encuentran pads reales (incluido TAB de reguladores)')
    pcb = SALIDA / (archivo.stem + '.kicad_pcb')
    pcbnew.SaveBoard(str(pcb), placa)
    leida = pcbnew.LoadBoard(str(pcb))
    vuelta = {fp.GetReference() + '.' + p.GetNumber(): p.GetNetname() for fp in leida.GetFootprints() for p in fp.Pads()}
    revisar(all(vuelta.get(k) == nombre for k, nombre in asignados.items()),
            f'{archivo.name}: KiCad guarda y abre la PCB conservando todas las redes')
    if 'expansion' in archivo.stem:
        revisar(vuelta['U1.17'] == '' and vuelta['U1.30'] == '' and vuelta['U2.3'] == 'JACK_VIN' and vuelta['U3.2'] == 'REG_3V3',
                f'{archivo.name}: PCB conserva aislamientoNanoVIN/3V3 frente a alimentación de expansión')
        revisar(vuelta['U2.2'] == vuelta['U3.3'] == vuelta['U1.27'] == '+5V' and vuelta['J1.3'] == '',
                f'{archivo.name}: salida5V llega al Nano; contacto conmutado del jack no conectado')
    informe = SALIDA / (archivo.stem + '_drc.json')
    resultado = subprocess.run([str(CLI), 'pcb', 'drc', '--format', 'json', '--severity-all', '-o', str(informe), str(pcb)], capture_output=True, text=True)
    revisar(resultado.returncode == 0 and informe.exists(), f'{archivo.name}: kicad-cli DRC ejecutado ({resultado.stdout.strip()})')
    if informe.exists():
        drc = json.loads(informe.read_text(encoding='utf-8'))
        solapes = [v for v in drc.get('violations', []) if 'courtyard' in v.get('type', '') or 'overlap' in v.get('type', '')]
        revisar(not solapes, f'{archivo.name}: las huellas separadas no se solapan en la PCB de comprobación')
        revisar(bool(drc.get('unconnected_items')), f'{archivo.name}: DRC reconoce las redes pendientes de trazar')

print(f'\n{comprobaciones} comprobaciones; {fallos} falla(s)')
sys.exit(1 if fallos else 0)
