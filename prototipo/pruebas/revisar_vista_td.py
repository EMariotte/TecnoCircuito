# SPDX-License-Identifier: Apache-2.0
# © 2026 SENA – TecnoAcademia Tolima
"""Revisa una entrega de vista de TecnoDiseñador (SVG + JSON «-tc») antes de migrarla a TecnoCircuito.

Especificación: docs/ENTREGA-VISTAS-TECNODISENADOR.md. Solo librería estándar; no cambia ningún archivo.
Uso:   python -I revisar_vista_td.py <pieza>-tc.json [otro-tc.json …]
Sale con 0 si todo cumple. Los nombres de los contactos salen del esquema del contrato (fuente única).
"""
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
NS = '{http://www.w3.org/2000/svg}'
ESQUEMA = Path(__file__).resolve().parents[2] / 'contrato' / 'circuito.schema.json'
LIMITE_BYTES = 50 * 1024
TOL_MM = 0.01
PERMITIDOS = {'svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'text', 'tspan',
              'defs', 'linearGradient', 'radialGradient', 'stop', 'clipPath', 'use'}
ATRIBUTOS_PROHIBIDOS = {'class', 'style'}
COLOR = re.compile(r'^#[0-9a-fA-F]{6}$')
# Alias sin contacto propio (contrato, sección 4): no se dibujan.
ALIAS_NANO = {'SDA', 'SCL', 'MISO', 'MOSI', 'SCK', 'SS'}
# Lo que cada pieza debe traer además de sus contactos (sección 6 de la especificación).
LEDS = {'nano': {'PWR', 'L', 'RX', 'TX'}, 'uno': {'PWR', 'L', 'RX', 'TX'}, 'shield_l293d': {'PWR'}}
PARTES = {'shield_l293d': {'puente-pwr'}}
FAMILIA_NANO = {'nano', 'shield_nano_io'}
# Todas las placas del simulador tienen sus headers en paso exacto de 2,54 mm (decisión de Efraín, 12 oct).
# Cada lista es un header, de izquierda (USB) a derecha: pines vecinos a 2,54 mm y a la misma altura.
FILAS_NANO = [['D12', 'D11', 'D10', 'D9', 'D8', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2', 'GND2', 'RESET2', 'D0', 'D1'],
              ['D13', '3V3', 'AREF', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', '5V', 'RESET', 'GND1', 'VIN']]
# Uno: el pin sin conexión del header de alimentación no tiene nombre; la separación entre headers es la medida.
HEADERS = {
    'nano': FILAS_NANO,
    'uno': [['SCL', 'SDA', 'AREF', 'GND1', 'D13', 'D12', 'D11', 'D10', 'D9', 'D8'],
            ['D7', 'D6', 'D5', 'D4', 'D3', 'D2', 'D1', 'D0'],
            ['IOREF', 'RESET', '3V3', '5V', 'GND2', 'GND3', 'VIN'],
            ['A0', 'A1', 'A2', 'A3', 'A4', 'A5']],
}

fallas = []
comprobaciones = 0


def revisar(condicion, texto):
    global comprobaciones
    comprobaciones += 1
    print(('OK   ' if condicion else 'FALLA') + ' ' + texto)
    if not condicion:
        fallas.append(texto)
    return condicion


def nombres_esperados(pieza):
    defs = json.loads(ESQUEMA.read_text(encoding='utf-8'))['$defs']
    if pieza == 'nano':
        return set(defs['pines-placa-nano']['enum']) - ALIAS_NANO
    if pieza == 'uno':
        return set(defs['pines-placa-uno']['enum'])
    if pieza == 'shield_nano_io':
        return {p for p in defs['pines-shield_nano_io']['enum'] if not p.startswith('SPI_')}
    clave = 'pines-' + pieza
    return set(defs[clave]['enum']) if clave in defs else None


def numero(texto):
    return float(re.sub(r'[a-z%]+$', '', texto.strip()))


def centro(el):
    local = el.tag.replace(NS, '')
    if local == 'circle':
        return numero(el.get('cx', '0')), numero(el.get('cy', '0'))
    if local == 'rect':
        return numero(el.get('x', '0')) + numero(el.get('width')) / 2, numero(el.get('y', '0')) + numero(el.get('height')) / 2
    return None


def revisar_entrega(ruta_json):
    print(f'\n== {ruta_json}')
    datos = json.loads(Path(ruta_json).read_text(encoding='utf-8'))
    pieza, variante = datos.get('pieza'), datos.get('variante')
    nombre = f'{pieza}{"/" + variante if variante else ""}'
    revisar(datos.get('formato') == 1 and datos.get('unidad') == 'mm', f'{nombre}: formato 1 y unidades en mm')
    esperados = nombres_esperados(pieza)
    if not revisar(esperados is not None, f'{nombre}: «{pieza}» es una pieza del contrato'):
        return None
    if pieza == 'shield_nano_io':
        revisar(variante in ('roja', 'azul'), f'{nombre}: la expansión declara variante «roja» o «azul»')
    ruta_svg = Path(ruta_json).parent / str(datos.get('archivo', ''))
    if not revisar(ruta_svg.is_file(), f'{nombre}: existe el SVG «{datos.get("archivo")}»'):
        return None
    crudo = ruta_svg.read_bytes()
    revisar(len(crudo) <= LIMITE_BYTES, f'{nombre}: pesa {len(crudo) / 1024:.1f} KB (máximo 50 KB)')
    texto = crudo.decode('utf-8')
    revisar('data:' not in texto and 'http://' not in texto.replace('http://www.w3.org/', '') and 'https://' not in texto,
            f'{nombre}: sin datos incrustados ni enlaces externos')
    decimales = re.findall(r'\d\.\d{3,}', re.sub(r'xmlns(:\w+)?="[^"]*"', '', texto))
    revisar(not decimales, f'{nombre}: números con máximo 2 decimales' + (f' (p. ej. {decimales[0]})' if decimales else ''))
    raiz = ET.fromstring(crudo)
    revisar(raiz.tag == NS + 'svg', f'{nombre}: la raíz es un <svg> con el espacio de nombres SVG')

    # Marco: viewBox 0 0 ancho alto, igual al JSON.
    marco = datos.get('marco') or {}
    vb = [numero(v) for v in (raiz.get('viewBox') or '').replace(',', ' ').split()]
    revisar(len(vb) == 4 and vb[0] == 0 and vb[1] == 0 and abs(vb[2] - marco.get('ancho', -1)) <= TOL_MM
            and abs(vb[3] - marco.get('alto', -1)) <= TOL_MM,
            f'{nombre}: viewBox «0 0 ancho alto» igual al marco del JSON ({raiz.get("viewBox")})')

    # Elementos y atributos permitidos.
    raros, atributos, eventos = set(), set(), set()
    padres = {hijo: padre for padre in raiz.iter() for hijo in padre}
    for el in raiz.iter():
        local = el.tag.replace(NS, '')
        if local not in PERMITIDOS:
            raros.add(local)
        for a in el.attrib:
            if a in ATRIBUTOS_PROHIBIDOS:
                atributos.add(a)
            if a.startswith('on'):
                eventos.add(a)
    revisar(not raros, f'{nombre}: solo elementos permitidos' + (f'; sobran: {", ".join(sorted(raros))}' if raros else ''))
    revisar(not atributos and not eventos, f'{nombre}: sin class, style ni eventos' + (f' ({", ".join(sorted(atributos | eventos))})' if atributos or eventos else ''))

    # id con prefijo, únicos, y referencias que existen.
    prefijo = datos.get('prefijo') or ''
    ids = [el.get('id') for el in raiz.iter() if el.get('id')]
    revisar(prefijo.startswith('td-') and all(i.startswith(prefijo) for i in ids) and len(ids) == len(set(ids)),
            f'{nombre}: {len(ids)} id únicos que empiezan con el prefijo «{prefijo}» (debe empezar con «td-»)')
    refs = set(re.findall(r'url\(#([^)]+)\)', texto)) | set(re.findall(r'href="#([^"]+)"', texto))
    revisar(refs <= set(ids), f'{nombre}: cada url(#…) y href="#…" apunta a un id del archivo' + (f'; faltan: {sorted(refs - set(ids))}' if refs - set(ids) else ''))
    textos = [el for el in raiz.iter() if el.tag == NS + 'text']
    def fuente(el):  # font-family se hereda del grupo más cercano que la declare
        while el is not None and not el.get('font-family'):
            el = padres.get(el)
        return el.get('font-family') if el is not None else ''
    revisar(all('Arial' in fuente(el) for el in textos),
            f'{nombre}: {len(textos)} textos con font-family Arial')

    # Contactos: exactamente los nombres del contrato, centrados en la coordenada del JSON.
    contactos = {}
    repetidos = set()
    for el in raiz.iter():
        n = el.get('data-contacto')
        if n is None:
            continue
        if n in contactos:
            repetidos.add(n)
        contactos[n] = el
    pines = datos.get('pines') or {}
    presentes = set(contactos)
    faltan, sobran = esperados - presentes, presentes - esperados
    diferencias = datos.get('diferencias') or []
    revisar(not sobran and not repetidos, f'{nombre}: ningún data-contacto inventado ni repetido' + (f' ({sorted(sobran | repetidos)})' if sobran or repetidos else ''))
    revisar(not faltan or bool(diferencias), f'{nombre}: {len(presentes & esperados)} de {len(esperados)} contactos del contrato' + (f'; faltan {sorted(faltan)} sin explicar en «diferencias»' if faltan else ''))
    revisar(set(pines) == presentes, f'{nombre}: el JSON trae los mismos nombres que el SVG')
    mal = []
    for n, el in contactos.items():
        c = centro(el)
        cadena = [el]
        while cadena[-1] in padres:
            cadena.append(padres[cadena[-1]])
        p = pines.get(n) or {}
        if c is None or any(x.get('transform') for x in cadena) or 'x' not in p \
                or abs(c[0] - p['x']) > TOL_MM or abs(c[1] - p['y']) > TOL_MM:
            mal.append(n)
    revisar(not mal, f'{nombre}: cada contacto es un circle/rect sin transform, centrado en su coordenada (±0,01 mm)' + (f'; revisar {sorted(mal)[:8]}' if mal else ''))

    if pieza in HEADERS and not faltan:
        headers = HEADERS[pieza]
        paso = [(f[i], f[i + 1], pines[f[i + 1]]['x'] - pines[f[i]]['x']) for f in headers for i in range(len(f) - 1)]
        malos = [f'{a}→{b} {d:.2f}' for a, b, d in paso if abs(d - 2.54) > 0.05]
        horizontal = all(abs(pines[f[0]]['y'] - pines[n]['y']) <= 0.05 for f in headers for n in f)
        revisar(not malos and horizontal, f'{pieza}: headers horizontales con paso exacto de 2,54 mm (±0,05)'
                + (f'; fuera de paso: {", ".join(malos[:6])}' if malos else ''))
        if pieza == 'nano':
            alto = [abs(pines[FILAS_NANO[1][i]]['y'] - pines[FILAS_NANO[0][i]]['y']) for i in range(15)]
            revisar(all(abs(d - 15.24) <= 0.05 for d in alto) and pines['D12']['y'] < pines['D13']['y'],
                    'nano: filas a 15,24 mm, USB a la izquierda y D12…D1 arriba')
        if pieza == 'uno':
            arriba, abajo = headers[0] + headers[1], headers[2] + headers[3]
            revisar(abs(pines['SCL']['y'] - pines['D0']['y']) <= 0.05 and abs(pines['IOREF']['y'] - pines['A5']['y']) <= 0.05
                    and pines['SCL']['y'] < pines['IOREF']['y'] and pines['D8']['x'] < pines['D7']['x'],
                    'uno: headers digitales arriba, alimentación y analógicas abajo, USB a la izquierda')

    # LED y partes.
    leds_svg = {el.get('data-led'): el for el in raiz.iter() if el.get('data-led')}
    leds_json = datos.get('leds') or {}
    revisar(LEDS.get(pieza, set()) <= set(leds_svg), f'{nombre}: tiene los LED {sorted(LEDS.get(pieza, set())) or "(ninguno obligatorio)"}')
    revisar(set(leds_svg) == set(leds_json) and all(COLOR.match(str(v.get('apagado', ''))) and COLOR.match(str(v.get('encendido', '')))
                                                    for v in leds_json.values()),
            f'{nombre}: cada data-led está en el JSON con color apagado y encendido #rrggbb')
    revisar(all(el.tag != NS + 'g' and (el.get('fill') or '').lower() == str(leds_json.get(n, {}).get('apagado', '')).lower()
                for n, el in leds_svg.items()),
            f'{nombre}: cada LED es una sola forma pintada con su color apagado')
    partes_svg = {el.get('data-parte'): el for el in raiz.iter() if el.get('data-parte')}
    partes_json = datos.get('partes') or {}
    revisar(PARTES.get(pieza, set()) <= set(partes_svg) and set(partes_svg) == set(partes_json)
            and all(el.tag == NS + 'g' and not el.get('transform') for el in partes_svg.values()),
            f'{nombre}: partes {sorted(partes_svg) or "(ninguna)"} como <g> sin transform propio, también en el JSON')

    origen, licencia = datos.get('origen') or {}, datos.get('licencia') or {}
    revisar(bool(origen.get('registro')) and bool(origen.get('generador')) and bool(origen.get('fotos')),
            f'{nombre}: origen con registro, generador y fotos')
    revisar(licencia.get('publicable') is True and licencia.get('sin_compartir_igual') is True,
            f'{nombre}: licencia publicable y sin material «compartir igual»')
    if diferencias:
        print('      diferencias informadas: ' + ' | '.join(diferencias))
    return pieza, (vb[2], vb[3]) if len(vb) == 4 else None


def principal(rutas):
    if not rutas:
        print(__doc__)
        return 2
    resultados = [r for r in (revisar_entrega(p) for p in rutas) if r]
    familia = {marco for pieza, marco in resultados if pieza in FAMILIA_NANO}
    if sum(1 for pieza, _ in resultados if pieza in FAMILIA_NANO) > 1:
        revisar(len(familia) == 1, 'familia Nano: el Nano y las expansiones comparten el mismo marco')
    print(f'\n{comprobaciones} comprobaciones; ' + (f'{len(fallas)} FALLAS' if fallas else 'la entrega cumple la especificación.'))
    return 1 if fallas else 0


if __name__ == '__main__':
    sys.exit(principal(sys.argv[1:]))
