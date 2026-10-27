# SPDX-License-Identifier: Apache-2.0
# © 2026 SENA – TecnoAcademia Tolima
"""Revisa una entrega de vista de TecnoDiseñador (SVG + JSON «-tc») antes de migrarla a TecnoCircuito.

Especificación: docs/ENTREGA-VISTAS-TECNODISENADOR.md. Solo librería estándar; no cambia ningún archivo.
Uso:   python -I revisar_vista_td.py <pieza>-tc.json [otro-tc.json …]
Sale con 0 si todo cumple. Los nombres de los contactos salen del esquema del contrato (fuente única).
Con varias piezas de una misma familia (Nano + expansiones, Uno + shield) revisa además que compartan
el marco y que sus id no se crucen.
"""
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
NS = '{http://www.w3.org/2000/svg}'
XLINK_HREF = '{http://www.w3.org/1999/xlink}href'
ESQUEMA = Path(__file__).resolve().parents[2] / 'contrato' / 'circuito.schema.json'
LIMITE_BYTES = 50 * 1024
TOL_MM = 0.01
PERMITIDOS = {'svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'text', 'tspan',
              'defs', 'linearGradient', 'radialGradient', 'stop', 'clipPath', 'use'}
ATRIBUTOS_PROHIBIDOS = {'class', 'style'}
# Atributos de posición y tamaño: números en unidades del viewBox (mm), sin «mm», «px» ni «%».
GEOMETRIA = {'x', 'y', 'width', 'height', 'cx', 'cy', 'r', 'rx', 'ry', 'x1', 'y1', 'x2', 'y2'}
NUMERO = re.compile(r'^\s*-?(\d+(\.\d*)?|\.\d+)\s*$')
MUCHOS_DECIMALES = re.compile(r'(?<![\d.])\d*\.\d{3,}')
COLOR = re.compile(r'^#[0-9a-fA-F]{6}$')
FORMAS_LED = {'circle', 'rect', 'ellipse', 'path'}
# Alias sin contacto propio (contrato, sección 4): no se dibujan.
ALIAS_NANO = {'SDA', 'SCL', 'MISO', 'MOSI', 'SCK', 'SS'}
# Expansión: SPI_* y OUT_5V/OUT_5V_2 son nombres heredados que terminan en pines del Nano (contrato, sección 4).
ALIAS_EXPANSION = {'SPI_MISO', 'SPI_MOSI', 'SPI_SCK', 'SPI_SS', 'SPI_V', 'SPI_G', 'OUT_5V', 'OUT_5V_2'}
# Lo que cada pieza debe traer además de sus contactos (sección 6 de la especificación).
LEDS = {'nano': {'PWR', 'L', 'RX', 'TX'}, 'uno': {'PWR', 'L', 'RX', 'TX'}, 'shield_l293d': {'PWR'}, 'led': {'LED'}}
PARTES = {'shield_l293d': {'puente-pwr'}, 'led': {'quemado'}, 'potenciometro': {'eje'}, 'pulsador': {'capuchon'}}
GIRAN = {'potenciometro': 'eje'}   # partes que giran: el JSON declara su pivote (sección 5)
VARIANTES = {'shield_nano_io': ('roja', 'azul'), 'resistencia': ('025w', '025w6', '05w')}
# LED y resistencia (secciones 6.6 y 6.7): marco y contactos fijos, en mm. ¼ W tiene las patas a 4 pasos; ½ W y la ¼ W
# de los circuitos guardados sin vatios (025w6), a 6 pasos, como el dibujo de wokwi, para que no se muevan.
SEIS_PASOS = {'marco': (17.78, 7.62), 'pines': {'1': (1.27, 3.81), '2': (16.51, 3.81)}}
FIJAS = {
    ('led', None): {'marco': (7.62, 12.70), 'pines': {'catodo': (2.54, 11.43), 'anodo': (5.08, 11.43)}},
    ('resistencia', '025w'): {'marco': (12.70, 5.08), 'pines': {'1': (1.27, 2.54), '2': (11.43, 2.54)}},
    ('resistencia', '025w6'): SEIS_PASOS,
    ('resistencia', '05w'): SEIS_PASOS,
    ('potenciometro', None): {'marco': (17.78, 25.40), 'pines': {'GND': (3.81, 24.13), 'SIG': (8.89, 24.13), 'VCC': (13.97, 24.13)}},
    ('pulsador', None): {'marco': (10.16, 7.62),
                         'pines': {'1i': (1.27, 1.27), '1d': (8.89, 1.27), '2i': (1.27, 6.35), '2d': (8.89, 6.35)}},
}
# Piezas chicas: un circuito tiene muchas a la vez.
LIMITE_CHICAS = {p: 15 * 1024 for p in ('led', 'resistencia', 'potenciometro', 'pulsador')}
FORMAS_BANDA = {'rect', 'path'}
# Familias que comparten marco (sección 6). La shield, mientras no exista el Uno Tecno, usa el marco del Uno de wokwi.
FAMILIAS = [{'nano', 'shield_nano_io'}, {'uno', 'shield_l293d'}]
MARCO_PROVISIONAL = {'shield_l293d': (72.58, 53.34)}
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
        return set(defs['pines-shield_nano_io']['enum']) - ALIAS_EXPANSION
    clave = 'pines-' + str(pieza)
    return set(defs[clave]['enum']) if clave in defs else None


def colores_de(tipo):
    """Los colores de una pieza en el contrato (props.color del componente «led» o «pulsador»)."""
    esquema = json.loads(ESQUEMA.read_text(encoding='utf-8'))
    for regla in esquema['$defs']['componente']['allOf']:
        if regla.get('if', {}).get('properties', {}).get('tipo', {}).get('const') == tipo:
            return regla['then']['properties']['props']['properties']['color']['enum']
    return []


def prefijo_esperado(pieza, variante):
    """Prefijo propio de cada pieza: el Nano y la expansión viven en el mismo documento y no pueden compartir id."""
    fijos = {'nano': 'td-nano-', 'uno': 'td-uno-', 'shield_l293d': 'td-l293d-'}
    if pieza == 'shield_nano_io':
        return f'td-exp-{variante}-'
    if pieza == 'resistencia':  # dos potencias distintas pueden estar en el mismo circuito
        return f'td-resistencia-{variante}-'
    return fijos.get(pieza, 'td-' + str(pieza).replace('_', '-') + '-')


def numero(texto):
    """Número sin unidades; None si no lo es (un «mm» dentro del dibujo cambiaría la escala)."""
    if texto is None or not NUMERO.match(texto):
        return None
    return float(texto)


def centro(el):
    local = el.tag.replace(NS, '')
    if local == 'circle':
        cx, cy = numero(el.get('cx', '0')), numero(el.get('cy', '0'))
        return (cx, cy) if None not in (cx, cy) else None
    if local == 'rect':
        x, y, w, h = (numero(el.get(a, '0' if a in 'xy' else None)) for a in ('x', 'y', 'width', 'height'))
        return (x + w / 2, y + h / 2) if None not in (x, y, w, h) else None
    return None


def menciona(textos, nombre):
    patron = re.compile(r'(?<![A-Za-z0-9_])' + re.escape(nombre) + r'(?![A-Za-z0-9_])')
    return any(patron.search(t) for t in textos)


def revisar_entrega(ruta_json):
    print(f'\n== {ruta_json}')
    try:
        datos = json.loads(Path(ruta_json).read_text(encoding='utf-8'))
    except (OSError, ValueError) as e:
        revisar(False, f'{ruta_json}: el JSON se puede leer ({e})')
        return None
    pieza, variante = datos.get('pieza'), datos.get('variante')
    nombre = f'{pieza}{"/" + variante if variante else ""}'
    revisar(datos.get('formato') == 1 and datos.get('unidad') == 'mm', f'{nombre}: formato 1 y unidades en mm')
    esperados = nombres_esperados(pieza)
    if not revisar(esperados is not None, f'{nombre}: «{pieza}» es una pieza del contrato'):
        return None
    if pieza in VARIANTES:
        revisar(variante in VARIANTES[pieza], f'{nombre}: declara una variante de {", ".join(f"«{v}»" for v in VARIANTES[pieza])}')
    ruta_svg = Path(ruta_json).parent / str(datos.get('archivo', ''))
    if not revisar(ruta_svg.is_file(), f'{nombre}: existe el SVG «{datos.get("archivo")}»'):
        return None
    crudo = ruta_svg.read_bytes()
    limite = LIMITE_CHICAS.get(pieza, LIMITE_BYTES)
    revisar(len(crudo) <= limite, f'{nombre}: pesa {len(crudo) / 1024:.1f} KB (máximo {limite // 1024} KB)')
    try:
        raiz = ET.fromstring(crudo)
    except ET.ParseError as e:
        revisar(False, f'{nombre}: el SVG es XML válido ({e})')
        return None
    revisar(raiz.tag == NS + 'svg', f'{nombre}: la raíz es un <svg> con el espacio de nombres SVG')
    padres = {hijo: padre for padre in raiz.iter() for hijo in padre}

    # Marco: viewBox «0 0 ancho alto» igual al JSON, y width/height de la raíz en mm.
    marco = datos.get('marco') or {}
    ancho, alto = marco.get('ancho'), marco.get('alto')
    vb = [numero(v) for v in (raiz.get('viewBox') or '').replace(',', ' ').split()]
    marco_ok = len(vb) == 4 and None not in vb and isinstance(ancho, (int, float)) and isinstance(alto, (int, float)) \
        and vb[0] == 0 and vb[1] == 0 and abs(vb[2] - ancho) <= TOL_MM and abs(vb[3] - alto) <= TOL_MM
    revisar(marco_ok, f'{nombre}: viewBox «0 0 ancho alto» igual al marco del JSON ({raiz.get("viewBox")})')
    en_mm = lambda v: v is not None and v.strip().endswith('mm') and numero(v.strip()[:-2]) is not None
    revisar(en_mm(raiz.get('width')) and en_mm(raiz.get('height')) and marco_ok
            and abs(numero(raiz.get('width').strip()[:-2]) - ancho) <= TOL_MM and abs(numero(raiz.get('height').strip()[:-2]) - alto) <= TOL_MM,
            f'{nombre}: width y height de la raíz en mm, iguales al marco')
    if pieza in MARCO_PROVISIONAL and marco_ok:
        fijo = MARCO_PROVISIONAL[pieza]
        revisar(abs(ancho - fijo[0]) <= TOL_MM and abs(alto - fijo[1]) <= TOL_MM,
                f'{nombre}: marco fijo {fijo[0]} × {fijo[1]} mm del Uno actual (sección 6.3)')
    fija = FIJAS.get((pieza, variante))
    if fija and marco_ok:
        revisar(abs(ancho - fija['marco'][0]) <= TOL_MM and abs(alto - fija['marco'][1]) <= TOL_MM,
                f'{nombre}: marco fijo {fija["marco"][0]:.2f} × {fija["marco"][1]:.2f} mm (secciones 6.6 y 6.7)')

    # Elementos y atributos permitidos; valores sin datos incrustados, enlaces externos, unidades ni 3 decimales.
    raros, prohibidos, externos, con_unidades, decimales = set(), set(), set(), set(), set()
    for el in raiz.iter():
        local = el.tag.replace(NS, '')
        if local not in PERMITIDOS:
            raros.add(local)
        for a, v in el.attrib.items():
            if a in ATRIBUTOS_PROHIBIDOS or a.startswith('on') or (a.startswith('{') and a != XLINK_HREF):
                prohibidos.add(a.split('}')[-1] if a.startswith('{') else a)
            if 'data:' in v or re.search(r'https?://', v):
                externos.add(f'{local}@{a.split("}")[-1]}')
            if a in ('href', XLINK_HREF) and not v.startswith('#'):
                externos.add(f'{local}@href')
            if el is not raiz and a in GEOMETRIA and numero(v) is None:
                con_unidades.add(f'{local}@{a}="{v}"')
            decimales.update(MUCHOS_DECIMALES.findall(v))
    revisar(not raros, f'{nombre}: solo elementos permitidos' + (f'; sobran: {", ".join(sorted(raros))}' if raros else ''))
    revisar(not prohibidos, f'{nombre}: sin class, style, eventos ni atributos de otros programas' + (f' ({", ".join(sorted(prohibidos))})' if prohibidos else ''))
    revisar(not externos, f'{nombre}: sin datos incrustados ni enlaces externos' + (f' ({", ".join(sorted(externos))})' if externos else ''))
    revisar(not con_unidades, f'{nombre}: posiciones y tamaños sin unidades (mm del viewBox)' + (f'; revisar {sorted(con_unidades)[:4]}' if con_unidades else ''))
    revisar(not decimales, f'{nombre}: números con máximo 2 decimales' + (f' (p. ej. {sorted(decimales)[0]})' if decimales else ''))

    # id con el prefijo de la pieza, únicos, y referencias que existen.
    prefijo = datos.get('prefijo') or ''
    debe = prefijo_esperado(pieza, variante)
    ids = [el.get('id') for el in raiz.iter() if el.get('id')]
    revisar(prefijo == debe and all(i.startswith(debe) for i in ids) and len(ids) == len(set(ids)),
            f'{nombre}: {len(ids)} id únicos con el prefijo de la pieza «{debe}»' + (f' (el JSON dice «{prefijo}»)' if prefijo != debe else ''))
    refs = set()
    for el in raiz.iter():
        for a, v in el.attrib.items():
            refs.update(re.findall(r'url\(\s*[\'"]?#([^\'")\s]+)', v))
            if a in ('href', XLINK_HREF) and v.startswith('#'):
                refs.add(v[1:])
    revisar(refs <= set(ids), f'{nombre}: cada url(#…) y href="#…" apunta a un id del archivo' + (f'; faltan: {sorted(refs - set(ids))}' if refs - set(ids) else ''))

    def fuente(el):  # font-family se hereda del grupo más cercano que la declare
        while el is not None and not el.get('font-family'):
            el = padres.get(el)
        return el.get('font-family') if el is not None else ''
    textos = [el for el in raiz.iter() if el.tag == NS + 'text']
    revisar(all('Arial' in fuente(el) for el in textos), f'{nombre}: {len(textos)} textos con font-family Arial')

    def ancestros(el):
        while el in padres:
            el = padres[el]
            yield el

    # Contactos: exactamente los nombres del contrato, centrados en la coordenada del JSON.
    contactos, repetidos = {}, set()
    for el in raiz.iter():
        n = el.get('data-contacto')
        if n is None:
            continue
        if n in contactos:
            repetidos.add(n)
        contactos[n] = el
    pines = datos.get('pines') or {}
    pines_ok = {n: p for n, p in pines.items()
                if isinstance(p, dict) and isinstance(p.get('x'), (int, float)) and isinstance(p.get('y'), (int, float))}
    revisar(len(pines_ok) == len(pines), f'{nombre}: cada pin del JSON tiene «x» e «y» numéricos'
            + (f'; revisar {sorted(set(pines) - set(pines_ok))[:6]}' if len(pines_ok) != len(pines) else ''))
    presentes = set(contactos)
    faltan, sobran = esperados - presentes, presentes - esperados
    diferencias = [str(d) for d in (datos.get('diferencias') or [])]
    revisar(not sobran and not repetidos, f'{nombre}: ningún data-contacto inventado ni repetido' + (f' ({sorted(sobran | repetidos)})' if sobran or repetidos else ''))
    sin_explicar = sorted(n for n in faltan if not menciona(diferencias, n))
    revisar(not sin_explicar, f'{nombre}: {len(presentes & esperados)} de {len(esperados)} contactos del contrato'
            + (f'; faltan {sin_explicar} sin nombrarlos en «diferencias»' if sin_explicar else ''))
    if faltan and not sin_explicar:
        print(f'      AVISO: faltan {sorted(faltan)}, informados en «diferencias»: TecnoCircuito decide con Efraín.')
    revisar(set(pines) == presentes, f'{nombre}: el JSON trae los mismos nombres que el SVG')
    mal = []
    for n, el in contactos.items():
        c, p = centro(el), pines_ok.get(n)
        cadena = [el, *ancestros(el)]
        if c is None or p is None or any(x.get('transform') for x in cadena) or any(x.tag == NS + 'defs' for x in cadena) \
                or abs(c[0] - p['x']) > TOL_MM or abs(c[1] - p['y']) > TOL_MM:
            mal.append(n)
    revisar(not mal, f'{nombre}: cada contacto es un circle/rect visible (fuera de <defs>, sin transform), centrado en su coordenada (±0,01 mm)'
            + (f'; revisar {sorted(mal)[:8]}' if mal else ''))
    if fija:
        corridos = [n for n, (x, y) in fija['pines'].items()
                    if n in pines_ok and (abs(pines_ok[n]['x'] - x) > TOL_MM or abs(pines_ok[n]['y'] - y) > TOL_MM)]
        revisar(not corridos, f'{nombre}: contactos en sus posiciones fijas (secciones 6.6 y 6.7)'
                + (f'; corridos: {", ".join(corridos)}' if corridos else ''))

    # Paso de 2,54 mm de las placas, con los pines que sí están (los que faltan ya se informaron arriba).
    if pieza in HEADERS:
        headers = [[n for n in f if n in pines_ok] for f in HEADERS[pieza]]
        completos = {n for f in HEADERS[pieza] for n in f} <= set(pines_ok)
        pares = [(a, b) for f in HEADERS[pieza] for a, b in zip(f, f[1:]) if a in pines_ok and b in pines_ok]
        malos = [f'{a}→{b} {pines_ok[b]["x"] - pines_ok[a]["x"]:.2f}' for a, b in pares if abs(pines_ok[b]['x'] - pines_ok[a]['x'] - 2.54) > 0.05]
        horizontal = all(abs(pines_ok[f[0]]['y'] - pines_ok[n]['y']) <= 0.05 for f in headers if f for n in f)
        revisar(not malos and horizontal, f'{pieza}: headers horizontales con paso exacto de 2,54 mm (±0,05), {len(pares)} pares'
                + (f'; fuera de paso: {", ".join(malos[:6])}' if malos else ''))
        if pieza == 'nano':
            alto_filas = [abs(pines_ok[b]['y'] - pines_ok[a]['y']) for a, b in zip(*FILAS_NANO) if a in pines_ok and b in pines_ok]
            orientado = not completos or pines_ok['D12']['y'] < pines_ok['D13']['y'] and pines_ok['D12']['x'] < pines_ok['D1']['x']
            revisar(all(abs(d - 15.24) <= 0.05 for d in alto_filas) and orientado, 'nano: filas a 15,24 mm, USB a la izquierda y D12…D1 arriba')
        if pieza == 'uno' and completos:
            revisar(abs(pines_ok['SCL']['y'] - pines_ok['D0']['y']) <= 0.05 and abs(pines_ok['IOREF']['y'] - pines_ok['A5']['y']) <= 0.05
                    and pines_ok['SCL']['y'] < pines_ok['IOREF']['y'] and pines_ok['D8']['x'] < pines_ok['D7']['x'],
                    'uno: headers digitales arriba, alimentación y analógicas abajo, USB a la izquierda')

    # LED y partes: sin repetidos, en el JSON, con la forma pedida.
    leds_svg, partes_svg, dobles = {}, {}, set()
    for el in raiz.iter():
        for clave, destino in (('data-led', leds_svg), ('data-parte', partes_svg)):
            n = el.get(clave)
            if n is not None:
                if n in destino:
                    dobles.add(f'{clave}="{n}"')
                destino[n] = el
    revisar(not dobles, f'{nombre}: cada data-led y data-parte aparece una sola vez' + (f' ({sorted(dobles)})' if dobles else ''))
    leds_json = datos.get('leds') or {}
    revisar(LEDS.get(pieza, set()) <= set(leds_svg), f'{nombre}: tiene los LED {sorted(LEDS.get(pieza, set())) or "(ninguno obligatorio)"}')
    revisar(set(leds_svg) == set(leds_json) and all(isinstance(v, dict) and COLOR.match(str(v.get('apagado', ''))) and COLOR.match(str(v.get('encendido', '')))
                                                    for v in leds_json.values()),
            f'{nombre}: cada data-led está en el JSON con color apagado y encendido #rrggbb')
    revisar(all(el.tag.replace(NS, '') in FORMAS_LED and not any(x.tag == NS + 'defs' for x in ancestros(el))
                and (el.get('fill') or '').lower() == str((leds_json.get(n) or {}).get('apagado', '')).lower()
                for n, el in leds_svg.items()),
            f'{nombre}: cada LED es una sola forma (circle, rect, ellipse o path) pintada con su color apagado')
    partes_json = datos.get('partes') or {}
    revisar(PARTES.get(pieza, set()) <= set(partes_svg) and set(partes_svg) == set(partes_json)
            and all(el.tag == NS + 'g' and not el.get('transform') for el in partes_svg.values()),
            f'{nombre}: partes {sorted(partes_svg) or "(ninguna)"} como <g> sin transform propio, también en el JSON')

    # LED: los cinco colores del contrato, y el archivo pintado con el rojo (sección 6.6).
    if pieza == 'led':
        colores = datos.get('colores') or {}
        revisar(set(colores) == set(colores_de('led')) and all(isinstance(v, dict) and COLOR.match(str(v.get('apagado', '')))
                                                          and COLOR.match(str(v.get('encendido', ''))) for v in colores.values()),
                f'{nombre}: «colores» trae {", ".join(colores_de("led"))} con apagado y encendido #rrggbb')
        revisar(leds_json.get('LED') == colores.get('rojo'), f'{nombre}: leds.LED repite el rojo de «colores»')
    # Partes que giran: pivote {x, y} y ángulo dibujado en el JSON (sección 5).
    if pieza in GIRAN:
        parte = partes_json.get(GIRAN[pieza]) or {}
        pivote = parte.get('pivote') or {}
        revisar(isinstance(pivote.get('x'), (int, float)) and isinstance(pivote.get('y'), (int, float))
                and isinstance(parte.get('angulo_dibujado'), (int, float)),
                f'{nombre}: la parte «{GIRAN[pieza]}» declara pivote {{x, y}} y angulo_dibujado')
    # Potenciómetro: un solo <text data-valor> (sección 6.8).
    valores = [el for el in raiz.iter() if el.get('data-valor') is not None]
    if pieza == 'potenciometro':
        revisar(len(valores) == 1 and valores[0].tag == NS + 'text' and (valores[0].text or '').strip(),
                f'{nombre}: un <text data-valor> con el valor impreso')
    else:
        revisar(not valores, f'{nombre}: sin data-valor (solo el potenciómetro lo lleva)')
    # Pulsador: data-relleno en una sola forma, pintada con el negro, y los seis colores (sección 6.9).
    rellenos = [el for el in raiz.iter() if el.get('data-relleno') is not None]
    if pieza == 'pulsador':
        colores = datos.get('colores') or {}
        revisar(set(colores) == set(colores_de('pulsador')) and all(COLOR.match(str(v)) for v in colores.values()),
                f'{nombre}: «colores» trae {", ".join(colores_de("pulsador"))}, cada uno #rrggbb')
        revisar(len(rellenos) == 1 and rellenos[0].get('data-relleno') == 'capuchon'
                and rellenos[0].tag.replace(NS, '') in FORMAS_LED
                and (rellenos[0].get('fill') or '').lower() == str(colores.get('negro', '')).lower(),
                f'{nombre}: un data-relleno="capuchon" en una sola forma, pintada con el negro de «colores»')
    else:
        revisar(not rellenos, f'{nombre}: sin data-relleno (solo el pulsador lo lleva)')
    # Resistencia: data-banda 1…n, cada una una sola forma con fill (sección 6.7).
    bandas_svg = {}
    for el in raiz.iter():
        n = el.get('data-banda')
        if n is not None:
            bandas_svg.setdefault(n, []).append(el)
    if pieza == 'resistencia':
        cuantas = datos.get('bandas')
        revisar(cuantas in (4, 5) and set(bandas_svg) == {str(i) for i in range(1, cuantas + 1)},
                f'{nombre}: «bandas» es 4 o 5 y el SVG tiene data-banda 1 a {cuantas}' + (f' (tiene {sorted(bandas_svg)})' if bandas_svg else ''))
        revisar(all(len(els) == 1 and els[0].tag.replace(NS, '') in FORMAS_BANDA and COLOR.match(els[0].get('fill') or '')
                    and not any(x.tag == NS + 'defs' for x in ancestros(els[0])) for els in bandas_svg.values()),
                f'{nombre}: cada banda es una sola forma (rect o path), fuera de <defs>, con fill #rrggbb')
    else:
        revisar(not bandas_svg, f'{nombre}: sin data-banda (solo la resistencia los lleva)')

    origen, licencia = datos.get('origen') or {}, datos.get('licencia') or {}
    revisar(bool(origen.get('registro')) and bool(origen.get('generador')) and bool(origen.get('fotos')),
            f'{nombre}: origen con registro, generador y fotos')
    revisar(licencia.get('publicable') is True and licencia.get('sin_compartir_igual') is True,
            f'{nombre}: licencia publicable y sin material «compartir igual»')
    if diferencias:
        print('      diferencias informadas: ' + ' | '.join(diferencias))
    return {'pieza': pieza, 'nombre': nombre, 'marco': (vb[2], vb[3]) if marco_ok else None, 'ids': set(ids)}


def principal(rutas):
    if not rutas:
        print(__doc__)
        return 2
    resultados = [r for r in (revisar_entrega(p) for p in rutas) if r]
    for familia in FAMILIAS:
        juntas = [r for r in resultados if r['pieza'] in familia]
        if len(juntas) < 2:
            continue
        print()
        revisar(len({r['marco'] for r in juntas}) == 1, f'familia {"/".join(sorted(familia))}: comparten el mismo marco')
        cruces = {i for a in juntas for b in juntas if a is not b for i in a['ids'] & b['ids']}
        revisar(not cruces, f'familia {"/".join(sorted(familia))}: ningún id se repite entre piezas' + (f' ({sorted(cruces)[:6]})' if cruces else ''))
    print(f'\n{comprobaciones} comprobaciones; ' + (f'{len(fallas)} FALLAS' if fallas else 'la entrega cumple la especificación.'))
    return 1 if fallas else 0


if __name__ == '__main__':
    sys.exit(principal(sys.argv[1:]))
