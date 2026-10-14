# SPDX-License-Identifier: Apache-2.0
# © 2026 SENA – TecnoAcademia Tolima
"""Vistas de TecnoDiseñador en el lienzo (Uno, Nano y expansión roja/azul), en Chromium:
cada contacto del dibujo cae en su punto de conexión, los LED siguen a la simulación, el marco transparente del Nano
deja pasar el clic a la expansión, los cables antiguos (OUT_5V) siguen dibujados, los id no se repiten y la imagen
exportada conserva los dibujos. Ejecutar: python -I pruebas/probar_vistas.py dist/prototipo.html pruebas/capturas
"""
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
PAGINA = Path(sys.argv[1]).resolve().as_uri()
SALIDA = Path(sys.argv[2])
SALIDA.mkdir(parents=True, exist_ok=True)
HEX = (Path(__file__).resolve().parents[1] / 'programas' / 'parpadeo13.hex').read_text(encoding='utf-8')
RAIZ = 'document.querySelector("#prueba .tecnocircuito").shadowRoot'
fallos = []
comprobaciones = 0


def revisar(condicion, texto):
    global comprobaciones
    comprobaciones += 1
    print(('OK   ' if condicion else 'FALLA') + ' ' + texto)
    if not condicion:
        fallos.append(texto)


def cable(de, a, color='verde'):
    return {'de': de, 'a': a, 'color': color}


def circuito(placa, variante=None, cables=()):
    componentes = [{'id': 'exp1', 'tipo': 'shield_nano_io', 'x': 0, 'y': 0, 'rot': 0,
                    'props': {'variante': variante, 'alimentacion': 'usb', 'voltajeJack': 9}}] if variante else []
    return {'formato': 1, 'placa': placa, 'protoboard': None, 'componentes': componentes, 'cables': list(cables)}


# Cada data-contacto del dibujo (en mm) contra el punto de conexión del lienzo (en px), para una pieza.
ALINEADOS = f'''(id) => {{
  const r = {RAIZ};
  const svg = r.querySelector(`.tc-comp[data-id="${{id}}"] > svg`);
  const k = svg.width.baseVal.value / svg.viewBox.baseVal.width;
  const contactos = [...svg.querySelectorAll('[data-contacto]')];
  const malos = contactos.filter(c => {{
    const pin = r.querySelector(`.tc-pin[data-ref="${{id}}.${{c.dataset.contacto}}"]`);
    const b = c.getBBox();
    return !pin || Math.abs(parseFloat(pin.style.left) - (b.x + b.width / 2) * k) > 0.05
      || Math.abs(parseFloat(pin.style.top) - (b.y + b.height / 2) * k) > 0.05;
  }}).map(c => c.dataset.contacto);
  const puntos = r.querySelectorAll(`.tc-pin[data-ref^="${{id}}."]`).length;
  return {{ contactos: contactos.length, puntos, malos }};
}}'''
ENCENDIDOS = f'''() => [...{RAIZ}.querySelectorAll('.tc-comp [data-led][data-encendido]')]
  .map(n => n.closest('.tc-comp').dataset.id + '.' + n.dataset.led).sort()'''


def abrir(pg, circ):
    pg.evaluate('''(c) => {
      if (window.sim) window.sim._destruir();
      if (window.lz) window.lz.destruir();
      document.getElementById('prueba')?.remove();
      const d = document.createElement('div');
      d.id = 'prueba';
      d.style.cssText = 'position:fixed;left:0;top:0;width:900px;height:700px;z-index:99;background:#fff';
      document.body.append(d);
      window.lz = TecnoCircuito.crearLienzo(d, { circuito: c });
    }''', circ)
    pg.wait_for_function(f'() => {RAIZ}.querySelectorAll(".tc-pin").length > 0 && {RAIZ}.querySelector(".tc-placa > svg")')
    pg.wait_for_timeout(300)


with sync_playwright() as p:
    navegador = p.chromium.launch()
    pg = navegador.new_page(viewport={'width': 900, 'height': 700})
    errores = []
    pg.on('pageerror', lambda e: errores.append(str(e)))
    pg.goto(PAGINA)

    print('— Contactos del dibujo y puntos de conexión')
    for placa, variante, esperados in [('uno', None, {'placa': 31}), ('nano', 'roja', {'placa': 30, 'exp1': 82}),
                                       ('nano', 'azul', {'placa': 30, 'exp1': 82}), ('nano_old', 'roja', {'placa': 30, 'exp1': 82})]:
        abrir(pg, circuito(placa, variante))
        for id_, n in esperados.items():
            r = pg.evaluate(ALINEADOS, id_)
            nombre = f'{placa}{"/" + variante if variante else ""} · {id_}'
            revisar(r['contactos'] == n == r['puntos'] and not r['malos'],
                    f'{nombre}: {r["contactos"]} contactos del dibujo, cada uno sobre su punto de conexión (±0,05 px)'
                    + (f'; fuera: {r["malos"]}' if r['malos'] else ''))
        pg.screenshot(path=str(SALIDA / f'vistas_{placa}_{variante or "sola"}.png'))

    print('— La shield L293D medida sobre el Uno')
    shield = lambda puente=True, cables=(): {'formato': 1, 'placa': 'uno', 'protoboard': None, 'cables': list(cables),
                                             'componentes': [{'id': 'sh', 'tipo': 'shield_l293d', 'x': 0, 'y': 0, 'rot': 0, 'props': {'puentePWR': puente}}]}
    abrir(pg, shield(cables=[cable('placa.SCL', 'placa.A0')]))
    pg.screenshot(path=str(SALIDA / 'vistas_uno_shield.png'))
    r = pg.evaluate(ALINEADOS, 'sh')
    revisar(r['contactos'] == 36 == r['puntos'] and not r['malos'], f'shield: {r["contactos"]} contactos del dibujo, cada uno sobre su punto de conexión'
            + (f'; fuera: {r["malos"]}' if r['malos'] else ''))
    p = pg.evaluate(f'''() => Object.fromEntries([...{RAIZ}.querySelectorAll('.tc-pin[data-ref^="sh."]')]
      .map(d => [d.dataset.ref.slice(3), [parseFloat(d.style.left), parseFloat(d.style.top)]]))''')
    revisar(p['S1_GND'][1] < p['S2_GND'][1] and p['S1_GND'][0] < p['S1_POS'][0] < p['S1_SIG'][0] and p['S2_GND'][0] < p['S2_POS'][0] < p['S2_SIG'][0],
            'servos como en la placa: SERVO_1 arriba y los pines «− + S» de izquierda a derecha')
    revisar(all(p[f'A{i}_S'][0] < p[f'A{i + 1}_S'][0] for i in range(5)) and p['A0_V'][1] < p['A0_G'][1] < p['A0_S'][1],
            'headers analógicos: A0 a A5 de izquierda a derecha y las filas +5, Gnd y A0-5 de arriba abajo')
    tapa = pg.evaluate(f'''() => ['SCL', 'SDA', 'IOREF', 'A0', 'D13'].map(n => getComputedStyle({RAIZ}.querySelector(`.tc-pin[data-ref="placa.${{n}}"]`)).display)''')
    lineas = pg.evaluate(f'() => {RAIZ}.querySelectorAll(".tc-cables .tc-cable-linea").length')
    revisar(tapa[:3] == ['none'] * 3 and 'none' not in tapa[3:] and lineas == 1,
            f'con la shield, SCL, SDA e IOREF quedan tapados ({tapa}); el cable que ya llegaba a SCL se conserva')
    aviso = pg.evaluate(f'''() => {RAIZ}.querySelector('.tc-ayuda').textContent''')
    revisar('La shield tapa SCL' in aviso and 'SDA' not in aviso.split(':')[0], f'y se avisa que la shield tapa SCL (solo lo que tiene algo): «{aviso}»')
    led = pg.evaluate(f'''() => {RAIZ}.querySelector('.tc-comp[data-id="sh"] [data-led="PWR"]').getAttribute('fill')''')
    revisar(led == '#2b6a3a', f'el LED de la shield, sin batería, se ve apagado (verde oscuro): {led}')
    revisar(pg.evaluate(f'''() => !!{RAIZ}.querySelector('.tc-comp[data-id="sh"] [data-led="PWR"]')
      && {RAIZ}.querySelector('.tc-comp[data-id="sh"] [data-parte="puente-pwr"]').getAttribute('display') === null'''),
            'la shield tiene su LED PWR y, con el puente puesto, el capuchón a la vista')
    abrir(pg, shield(puente=False))
    revisar(pg.evaluate(f'''() => {RAIZ}.querySelector('.tc-comp[data-id="sh"] [data-parte="puente-pwr"]').getAttribute('display') === 'none' '''),
            'con el puente quitado, el capuchón no se ve')
    abrir(pg, circuito('uno'))
    tapa = pg.evaluate(f'''() => ['SCL', 'SDA', 'IOREF'].map(n => getComputedStyle({RAIZ}.querySelector(`.tc-pin[data-ref="placa.${{n}}"]`)).display)''')
    revisar('none' not in tapa, f'sin la shield, SCL, SDA e IOREF se pueden cablear ({tapa})')

    print('— La placa es Pieza Tecno, sin el dibujo de wokwi')
    abrir(pg, circuito('uno'))
    r = pg.evaluate(f'''() => {{ const r = {RAIZ};
      return {{ wokwi: !!r.querySelector('wokwi-arduino-uno'), imagenes: r.querySelectorAll('.tc-comp image').length,
        leds: [...r.querySelectorAll('.tc-placa [data-led]')].map(n => n.dataset.led).sort() }}; }}''')
    revisar(not r['wokwi'] and not r['imagenes'], 'el Uno es el dibujo de TecnoDiseñador: sin wokwi-arduino-uno ni imágenes incrustadas')
    revisar(r['leds'] == ['L', 'PWR', 'RX', 'TX'], f'el Uno tiene sus cuatro LED con data-led: {r["leds"]}')

    print('— Los LED siguen a la simulación')
    for placa, variante in [('uno', None), ('nano', 'azul')]:
        abrir(pg, circuito(placa, variante))
        revisar(pg.evaluate(ENCENDIDOS) == [], f'{placa}: sin simular, todos los LED apagados')
        pg.evaluate('(hex) => { window.sim = TecnoCircuito.crearSimulador({ lienzo: window.lz, hex }); window.sim.iniciar(); }', HEX)
        pg.wait_for_function(f'() => {RAIZ}.querySelector(\'.tc-placa [data-led="L"][data-encendido]\')', timeout=8000)
        prendidos = pg.evaluate(ENCENDIDOS)
        esperado = ['placa.L', 'placa.PWR'] + (['exp1.PWR'] if variante else [])
        revisar(all(x in prendidos for x in esperado), f'{placa}: con parpadeo13 se encienden {", ".join(esperado)}')
        halo = pg.evaluate(f'''() => {RAIZ}.querySelector('.tc-placa [data-led="L"]').style.filter''')
        revisar('drop-shadow' in halo, f'{placa}: el LED L encendido tiene halo ({halo})')
        pg.evaluate('window.sim.serialEnviar("hola")')
        pg.wait_for_function(f'() => {RAIZ}.querySelector(\'.tc-placa [data-led="RX"][data-encendido]\')', timeout=3000)
        revisar(True, f'{placa}: el LED RX destella cuando el monitor serial envía datos a la placa')
        pg.wait_for_function(f'() => !{RAIZ}.querySelector(\'.tc-placa [data-led="L"][data-encendido]\')', timeout=8000)
        revisar(True, f'{placa}: el LED L se apaga y se prende con el pin 13')
        pg.evaluate('window.sim.detener()')
        pg.wait_for_timeout(200)
        revisar(pg.evaluate(ENCENDIDOS) == [], f'{placa}: al detener, todos los LED apagados (también PWR)')
        pg.evaluate('window.sim._destruir(); window.sim = null')

    print('— El Nano va encima de la expansión y su marco transparente deja pasar el clic')
    abrir(pg, circuito('nano', 'roja'))
    capas = pg.evaluate(f'''() => [...{RAIZ}.querySelector('.tc-capa-comp').children].map(d => d.dataset.id)''')
    revisar(capas.index('exp1') < capas.index('placa'), f'la expansión va debajo del Nano en las capas: {capas}')
    caja = pg.evaluate(f'''() => {{ const b = {RAIZ}.querySelector('.tc-comp[data-id="exp1"]').getBoundingClientRect();
      return {{ x: b.x, y: b.y, w: b.width, h: b.height }}; }}''')
    # (30 mm, 49 mm): placa roja, entre el pulsador RESET y la fila de agujeros, fuera del Nano.
    pg.mouse.click(caja['x'] + caja['w'] * 30 / 60, caja['y'] + caja['h'] * 49 / 53.5)
    elegido = pg.evaluate(f'''() => {RAIZ}.querySelector('.tc-comp.tc-seleccionado')?.dataset.id || null''')
    revisar(elegido == 'exp1', f'un clic en la expansión, dentro del marco del Nano, elige la expansión (elegido: {elegido})')
    # (20 mm, 26 mm): el cuerpo del Nano. La placa no se elige: el clic deselecciona, como antes.
    pg.mouse.click(caja['x'] + caja['w'] * 20 / 60, caja['y'] + caja['h'] * 26 / 53.5)
    elegido = pg.evaluate(f'''() => {RAIZ}.querySelector('.tc-comp.tc-seleccionado')?.dataset.id || null''')
    revisar(elegido is None, f'un clic en el cuerpo del Nano no elige la expansión de abajo (elegido: {elegido})')

    print('— Los nombres heredados siguen conectados')
    abrir(pg, circuito('nano', 'azul', [cable('exp1.OUT_5V', 'exp1.UART_V', 'rojo'), cable('exp1.OUT_5V_2', 'exp1.I2C_V', 'rojo'),
                                         cable('exp1.SPI_G', 'exp1.GND_OUT_3', 'negro'), cable('exp1.OUT_3V3_3', 'exp1.A0_S')]))
    # Los extremos de cada trazo son su primer y su último par de números.
    r = pg.evaluate(f'''() => {{ const r = {RAIZ};
      const p = (ref) => {{ const d = r.querySelector(`.tc-pin[data-ref="${{ref}}"]`); return [parseFloat(d.style.left), parseFloat(d.style.top)]; }};
      const extremos = [...r.querySelectorAll('.tc-cables .tc-cable-linea')].map(l => {{
        const n = (l.getAttribute('d').match(/-?[\\d.]+/g) || []).map(Number);
        return [n.slice(0, 2), n.slice(-2)];
      }});
      return {{ cables: lz.circuito().cables.length, extremos, cincoV: p('placa.5V'), gnd: p('placa.GND1') }}; }}''')
    revisar(r['cables'] == 4 and len(r['extremos']) == 4,
            f'el circuito con OUT_5V, OUT_5V_2 y SPI_G conserva sus 4 cables dibujados ({len(r["extremos"])})')
    sobre = lambda punto: sum(1 for par in r['extremos'] for e in par if abs(e[0] - punto[0]) < 0.5 and abs(e[1] - punto[1]) < 0.5)
    revisar(sobre(r['cincoV']) == 2 and sobre(r['gnd']) == 1,
            'los cables de OUT_5V y OUT_5V_2 terminan sobre el 5V del Nano, y el de SPI_G sobre su GND')

    # Con el imán, una pata no se enchufa en un alias: el agujero OUT_5V ya no existe en la placa medida.
    circ = circuito('nano', 'roja')
    circ['componentes'].append({'id': 'led1', 'tipo': 'led', 'x': 300, 'y': 0, 'rot': 0, 'props': {'color': 'rojo'},
                                'en': {'anodo': 'exp1.OUT_5V', 'catodo': 'exp1.GND_OUT_3'}})
    abrir(pg, circ)
    en = next(k for k in pg.evaluate('lz.circuito()')['componentes'] if k['id'] == 'led1').get('en')
    aviso = pg.evaluate(f'''() => {RAIZ}.querySelector('.tc-ayuda').textContent''')
    revisar(en == {'catodo': 'exp1.GND_OUT_3'} and 'Se soltó 1 conexión directa' in aviso,
            f'una pata enchufada en OUT_5V se suelta al abrir y se avisa; la de GND_OUT_3 se queda ({en})')

    print('— Al abrir, una pieza enchufada se corre a sus pines si el dibujo cambió desde que se guardó')
    # Como un proyecto guardado con el Nano anterior: el LED quedó lejos de D13/3V3 (ahora en otro lugar).
    circ = circuito('nano', 'roja')
    circ['componentes'] += [
        {'id': 'led1', 'tipo': 'led', 'x': 300, 'y': 300, 'rot': 0, 'props': {'color': 'rojo'},
         'en': {'anodo': 'placa.3V3', 'catodo': 'placa.D13'}},
        # Este no cabe: sus patas piden corrimientos distintos. Se queda donde está, enchufado (el en manda).
        {'id': 'led2', 'tipo': 'led', 'x': 500, 'y': 300, 'rot': 0, 'props': {'color': 'verde'},
         'en': {'anodo': 'placa.VIN', 'catodo': 'exp1.A0_S'}},
    ]
    abrir(pg, circ)
    r = pg.evaluate(f'''() => {{ const r = {RAIZ};
      const p = (ref) => {{ const d = r.querySelector(`.tc-pin[data-ref="${{ref}}"]`); return [parseFloat(d.style.left), parseFloat(d.style.top)]; }};
      const d = (a, b) => Math.hypot(p(a)[0] - p(b)[0], p(a)[1] - p(b)[1]);
      const c = lz.circuito().componentes;
      const k = (id) => c.find(x => x.id === id);
      return {{ led1: [d('led1.anodo', 'placa.3V3'), d('led1.catodo', 'placa.D13')], en1: k('led1').en,
        led2: [k('led2').x, k('led2').y], en2: k('led2').en, aviso: r.querySelector('.tc-ayuda').textContent }}; }}''')
    revisar(max(r['led1']) < 1 and r['en1'] == {'anodo': 'placa.3V3', 'catodo': 'placa.D13'},
            f'el LED guardado lejos queda sobre D13 y 3V3, con su en (distancias {[round(x, 2) for x in r["led1"]]} px)')
    revisar(r['led2'] == [500, 300] and r['en2'] == {'anodo': 'placa.VIN', 'catodo': 'exp1.A0_S'} and 'Se solt' not in r['aviso'],
            'el que ya no cabe en sus pines se queda donde estaba y sigue enchufado, sin aviso de soltar')

    print('— Los id del documento no se repiten (miniaturas de la biblioteca incluidas)')
    for placa, variante in [('nano', 'roja'), ('nano', 'azul'), ('uno', None), ('uno', 'shield')]:
        abrir(pg, shield() if variante == 'shield' else circuito(placa, variante))
        r = pg.evaluate(f'''() => {{ const ids = [...{RAIZ}.querySelectorAll('[id]')].map(n => n.id);
          const vistos = new Set(), repetidos = new Set();
          for (const id of ids) (vistos.has(id) ? repetidos : vistos).add(id);
          return {{ total: ids.length, repetidos: [...repetidos].slice(0, 5) }}; }}''')
        revisar(not r['repetidos'], f'{placa}{"/" + variante if variante else ""}: {r["total"]} id en el lienzo, ninguno repetido {r["repetidos"] or ""}')

    print('— La imagen exportada conserva los dibujos')
    for placa, variante, prefijo in [('uno', None, 'td-uno-'), ('nano', 'azul', 'td-exp-azul-'), ('uno', 'shield', 'td-l293d-')]:
        abrir(pg, shield() if variante == 'shield' else circuito(placa, variante))
        svg = pg.evaluate('lz.exportarSVG()')
        try:
            raiz = ET.fromstring(svg)
            ids = [e.get('id') for e in raiz.iter() if e.get('id')]
            valido = len(ids) == len(set(ids))
        except ET.ParseError:
            valido = False
        revisar(valido and prefijo in svg and 'data-contacto' in svg and '<image' not in svg,
                f'{placa}: el SVG exportado es XML válido, con el dibujo de TecnoDiseñador y sin id repetidos')
        (SALIDA / f'vistas_exportado_{placa}{"_" + variante if variante else ""}.svg').write_text(svg, encoding='utf-8')

    revisar(not errores, 'sin errores en la consola' + (f': {errores[:3]}' if errores else ''))
    navegador.close()

print(f'\n{comprobaciones} comprobaciones; ' + ('todo bien.' if not fallos else f'{len(fallos)} FALLAS'))
sys.exit(1 if fallos else 0)
