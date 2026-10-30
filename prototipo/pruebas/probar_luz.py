# SPDX-License-Identifier: Apache-2.0
# © 2026 SENA – TecnoAcademia Tolima
"""Luz de los LED (LIENZO-003) en Chromium: el halo del LED de 5 mm sale del recuadro de su dibujo sin cortarse (en el
lienzo y en la imagen SVG), crece con la corriente de modo que 1 kΩ, 330 Ω y 220 Ω se ven distintos, el LED quemado
no da luz, el centro encandilado de la cápsula sube con el nivel, el LED blanco tiene un halo que se ve sobre el
lienzo claro, y las cuatro luces de cada placa caben con su halo dentro del dibujo de la placa. El brillo calculado
(`data-brillo`, las mediciones) no cambia: solo cambia el dibujo.
Ejecutar: python -I pruebas/probar_luz.py dist/prototipo.html pruebas/capturas
"""
import base64
import io
import json
import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
PAGINA = Path(sys.argv[1]).resolve().as_uri()
SALIDA = Path(sys.argv[2])
SALIDA.mkdir(parents=True, exist_ok=True)
RAIZ = 'document.querySelector("main .tecnocircuito").shadowRoot'
LED_SVG = RAIZ + '.querySelector(\'.tc-comp[data-id="led1"] svg\')'
CLAVE = 'tecnocircuito-prototipo-0'
MARGEN = 60  # px de lienzo alrededor del LED en las capturas: cabe el resplandor amplio
# Alcance total del halo en lados mayores del LED: las tres sombras van encadenadas (cada una difumina la anterior) y
# una sombra se ve hasta 1,5 veces su radio. Con el nivel máximo: 1,5 × (0,3 + 0,9 + 2,2).
ALCANCE_MAX = 1.5 * (0.3 + 0.9 + 2.2)
fallos = []
comprobaciones = 0


def revisar(condicion, texto):
    global comprobaciones
    comprobaciones += 1
    print(('OK   ' if condicion else 'FALLA') + ' ' + texto)
    if not condicion:
        fallos.append(texto)


def sombras(filtro):
    """Los (radio, opacidad) de cada drop-shadow del estilo `filter` (Chromium lo escribe con rgba primero)."""
    salida = []
    for parte in filtro.split('drop-shadow(')[1:]:
        rgba = parte[parte.index('rgba(') + 5:parte.index(')')].split(',')
        radio = float(parte.split(')')[1].split()[2].rstrip('px'))
        salida.append((radio, float(rgba[3])))
    return salida


with sync_playwright() as p:
    nav = p.chromium.launch()
    pg = nav.new_page(viewport={'width': 1366, 'height': 900})
    errores = []
    pg.on('console', lambda m: errores.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: errores.append(f'pageerror: {e}'))

    def iniciar(circuito=None, programa='fijo13', modo='realista'):
        pg.goto(PAGINA)
        pg.evaluate('localStorage.clear()')
        if circuito:
            pg.evaluate('([k, c]) => localStorage.setItem(k, JSON.stringify(c))', [CLAVE, circuito])
        pg.reload()
        if not circuito:
            pg.get_by_text('Ver un ejemplo armado').click()
            pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
        pg.wait_for_timeout(400)
        pg.locator('#modo').select_option(modo)
        pg.locator('#programa').select_option(programa)
        pg.locator('#iniciar').click()
        pg.wait_for_timeout(600)

    def poner_ohmios(ohmios):
        caja = pg.locator('.tc-comp[data-id="r1"]').bounding_box()
        pg.mouse.click(caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2)
        pg.locator('select[data-prop="ohmios"]').select_option(ohmios)
        pg.wait_for_timeout(300)
        pg.mouse.click(5, 890)  # suelta la selección: su contorno no entra en la captura
        pg.wait_for_timeout(200)

    def foto_led():
        """La captura alrededor del LED, el recuadro de su SVG y la cápsula, en px de la captura."""
        r = pg.evaluate(f'''() => {{ const s = {LED_SVG}, c = s.querySelector('[data-led]');
          const a = s.getBoundingClientRect(), b = c.getBoundingClientRect();
          return {{ svg: [a.x, a.y, a.width, a.height], capsula: [b.x, b.y, b.width, b.height],
                    brillo: Number(s.dataset.brillo), nivel: Number(c.dataset.nivel), filtro: c.style.filter,
                    centro: (l => l && l.getAttribute('display') !== 'none' ? Number(l.getAttribute('opacity')) : 0)(s.querySelector('[data-luz="LED"]')) }}; }}''')
        x, y, w, h = r['svg']
        im = Image.open(io.BytesIO(pg.screenshot(clip={'x': x - MARGEN, 'y': y - MARGEN, 'width': w + 2 * MARGEN, 'height': h + 2 * MARGEN}))).convert('RGB')
        return im, r

    def tamano_svg(svg):
        raiz = svg[:svg.index('>')]
        return tuple(int(float(raiz.split(f' {n}="')[1].split('"')[0])) for n in ('width', 'height'))

    def imagen_svg(svg):
        """El SVG exportado abierto como imagen (como lo ve quien recibe el archivo), sobre fondo gris."""
        vista = nav.new_page(viewport={'width': 1600, 'height': 1200})
        datos = base64.b64encode(svg.encode('utf-8')).decode('ascii')
        vista.set_content(f'<body style="margin:0;background:#888"><img id="i" src="data:image/svg+xml;base64,{datos}"></body>')
        vista.wait_for_function('document.getElementById("i").complete')
        vista.wait_for_timeout(200)
        im = Image.open(io.BytesIO(vista.screenshot(clip=vista.locator('#i').bounding_box()))).convert('RGB')
        vista.close()
        return im

    def firma_en(svg):
        """(x, y, ancho, alto) de la firma, con su escala, según su transform."""
        vista = nav.new_page()
        vista.set_content(f'<body style="margin:0">{svg}</body>')
        caja = vista.evaluate('(() => { const g = document.querySelector(".tc-firma"); if (!g) return null; const b = g.getBoundingClientRect(), r = g.ownerSVGElement.getBoundingClientRect(); return [b.x - r.x, b.y - r.y, b.width, b.height]; })()')
        vista.close()
        return caja

    def luz_fuera(im):
        """Cuánta luz roja cae fuera del recuadro del LED: lo que le falta de verde a cada píxel del anillo exterior."""
        ancho, alto = im.size
        total = 0
        for x in range(ancho):
            for y in range(alto):
                if MARGEN <= x < ancho - MARGEN and MARGEN <= y < alto - MARGEN:
                    continue
                total += max(0, 247 - im.getpixel((x, y))[1])
        return total

    # 1. Con 220 Ω el halo sale del recuadro del dibujo y se aclara hacia afuera: no hay caja. Con el recorte de antes,
    #    fuera del recuadro quedaba el fondo (verde 245 a 249) justo al lado de la luz.
    iniciar()
    poner_ohmios('220')
    im, r = foto_led()
    im.save(SALIDA / 'luz_1_220.png')
    revisar(pg.evaluate(f'{LED_SVG}.getAttribute("overflow")') == 'visible' and pg.evaluate(f'getComputedStyle({LED_SVG}).overflow') == 'visible',
            'el SVG del LED deja ver lo que sale de su marco (overflow visible)')
    fila = round(r['capsula'][1] + r['capsula'][3] / 2 - r['svg'][1]) + MARGEN  # a media altura de la cápsula
    columna = round(r['capsula'][0] + r['capsula'][2] / 2 - r['svg'][0]) + MARGEN
    perfil = [im.getpixel((MARGEN - d, fila))[1] for d in (2, 6, 12, 20)]
    revisar(perfil[0] < 230 and perfil == sorted(perfil) and perfil[0] < perfil[-1],
            f'a la izquierda: hay luz fuera del recuadro y se aclara hacia afuera (verde a 2, 6, 12 y 20 px: {perfil}; fondo 247)')
    perfil = [im.getpixel((columna, MARGEN - d))[1] for d in (2, 6, 12, 20)]
    revisar(perfil[0] < 230 and perfil == sorted(perfil) and perfil[0] < perfil[-1],
            f'arriba: hay luz fuera del recuadro y se aclara hacia afuera (verde: {perfil})')

    # 2. Más corriente, más luz: 10 kΩ, 1 kΩ, 330 Ω y 220 Ω se ven distintos; el brillo calculado es el del motor
    ESPERADO = {'10000': 0.023, '1000': 0.207, '330': 0.582, '220': 0.833}  # el motor en Node (probar_electrico: 220 Ω 12,50 mA)
    filas, centros = [], []
    for ohmios in ['10000', '1000', '330', '220']:
        poner_ohmios(ohmios)
        im, r = foto_led()
        im.save(SALIDA / f'luz_2_{ohmios}.png')
        filas.append((ohmios, r['brillo'], r['nivel'], luz_fuera(im), sombras(r['filtro'])))
        centros.append(r['centro'])
        print(f'   {ohmios} Ω: brillo {r["brillo"]:.3f}, nivel {r["nivel"]}, luz fuera {filas[-1][3]}, sombras {filas[-1][4]}')
    revisar(all(abs(b - ESPERADO[o]) < 0.006 for o, b, *_ in filas), 'el brillo calculado (`data-brillo`) no cambia: ' +
            ', '.join(f'{o} Ω {b:.3f}' for o, b, *_ in filas))
    revisar(all(len(s) == 3 for *_, s in filas), 'cada LED encendido lleva tres sombras de luz')
    revisar(all(0 < a < b for a, b in zip(centros, centros[1:])) and centros[-1] >= 0.9,
            f'el centro encandilado de la cápsula sube con el nivel y casi a pleno con 220 Ω (opacidad {centros})')
    revisar(filas[0][2] == 0.1, f'con 10 kΩ ({filas[0][1] * 100:.1f} %) el LED se ve tenue pero se ve: nivel {filas[0][2]} (mínimo 10 %)')
    for (o1, _, n1, l1, s1), (o2, _, n2, l2, s2) in zip(filas, filas[1:]):
        revisar(n2 > n1 and all(b[0] > a[0] and b[1] >= a[1] for a, b in zip(s1, s2)),
                f'{o1} Ω → {o2} Ω: sube el nivel ({n1} → {n2}) y cada sombra crece en alcance y no baja en opacidad')

    # 3. La imagen exportada lleva el mismo halo, también sin caja
    svg = pg.evaluate('lienzo.exportarSVG()')
    revisar('overflow="visible"' in svg and svg.count('drop-shadow(') >= 3, 'la imagen SVG lleva el LED con su halo y sin recorte')
    vista = nav.new_page(viewport={'width': 1400, 'height': 1000})
    vista.set_content(f'<body style="margin:0;background:#fff">{svg}</body>')
    vista.wait_for_timeout(200)
    r = vista.evaluate('''() => { const s = document.querySelector('svg#tc-led1'), c = s.querySelector('[data-led]');
      const a = s.getBoundingClientRect(), b = c.getBoundingClientRect(); return { svg: [a.x, a.y], capsula: [b.y + b.height / 2] }; }''')
    x, y = r['svg']
    im = Image.open(io.BytesIO(vista.screenshot(clip={'x': x - 21, 'y': r['capsula'][0] - 1, 'width': 22, 'height': 2}))).convert('RGB')
    perfil = [im.getpixel((21 - d, 0))[1] for d in (2, 6, 12, 20)]
    revisar(perfil[0] < 235 and perfil == sorted(perfil) and perfil[0] < perfil[-1],
            f'en la imagen exportada hay luz fuera del recuadro del LED y se aclara hacia afuera (verde: {perfil}; fondo 255)')
    vista.close()

    # 3b. El LED blanco: su halo es blanco azulado, para que se vea sobre el lienzo claro
    caja = pg.locator('.tc-comp[data-id="led1"]').bounding_box()
    pg.mouse.click(caja['x'] + caja['width'] / 2, caja['y'] + 10)
    pg.locator('select[data-prop="color"]').select_option('blanco')
    pg.wait_for_timeout(300)
    pg.mouse.click(5, 890)
    pg.wait_for_timeout(200)
    im, r = foto_led()
    im.save(SALIDA / 'luz_3_blanco.png')
    azul = [im.getpixel((MARGEN - d, fila)) for d in (2, 6)]
    revisar('rgba(143, 184, 255' in r['filtro'] and all(b - rr > 20 for rr, _, b in azul),
            f'el LED blanco da una luz blanca azulada que se ve sobre el lienzo (fuera del recuadro: {azul})')
    pg.locator('.tc-comp[data-id="led1"]').click(position={'x': caja['width'] / 2, 'y': 10})
    pg.locator('select[data-prop="color"]').select_option('rojo')
    pg.wait_for_timeout(200)
    pg.mouse.click(5, 890)

    # 4. Al detener, el LED se apaga y se va su luz
    pg.locator('#detener').click()
    pg.wait_for_timeout(200)
    apagado = pg.evaluate(f'''() => {{ const c = {LED_SVG}.querySelector('[data-led]');
      return !c.hasAttribute('data-encendido') && !c.style.filter && c.getAttribute('fill') === '#c70d05'
        && (l => !l || l.getAttribute('display') === 'none')({LED_SVG}.querySelector('[data-luz="LED"]')); }}''')
    revisar(apagado, 'detenida la simulación, el LED queda con su color apagado, sin halo ni centro encandilado')
    # Lo que ya había alrededor con el LED apagado (cables, rejilla) no es luz: se descuenta de cada medida
    base = luz_fuera(foto_led()[0])
    luces = [(o, l - base) for o, _, _, l, _ in filas]
    print(f'   luz alrededor sin lo que ya había ({base}): {luces}')
    for (o1, l1), (o2, l2) in zip(luces, luces[1:]):
        revisar(l1 > 0 and l2 > l1 * 1.25, f'{o1} Ω → {o2} Ω: la luz alrededor crece a simple vista ({l1} → {l2}, más del 25 %)')

    # 5. El LED quemado no da luz
    sin_resistencia = {
        'formato': 1, 'placa': 'uno', 'protoboard': None,
        'componentes': [{'id': 'led1', 'tipo': 'led', 'x': 385.8, 'y': -101.2, 'rot': 0, 'props': {'color': 'rojo'}}],
        'cables': [{'de': 'placa.D13', 'a': 'led1.anodo', 'color': 'verde', 'puntos': [[125, -20], [405, -20]]},
                   {'de': 'led1.catodo', 'a': 'placa.GND1', 'color': 'negro', 'puntos': [[395.4, -40], [115.5, -40]]}],
    }
    iniciar(sin_resistencia)
    quemado = pg.evaluate(f'''() => {{ const s = {LED_SVG}, c = s.querySelector('[data-led]');
      const centro = s.querySelector('[data-luz="LED"]');
      return {{ quemado: s.closest('.tc-comp').classList.contains('tc-quemado'),
               luz: c.hasAttribute('data-encendido') || !!c.style.filter || !!(centro && centro.getAttribute('display') !== 'none') }}; }}''')
    revisar(quemado['quemado'] and not quemado['luz'], 'el LED quemado se ve quemado y sin luz ni halo')
    tam_quemado = tamano_svg(pg.evaluate('lienzo.exportarSVG()'))
    pg.locator('#detener').click()
    pg.wait_for_timeout(200)
    tam_detenido = tamano_svg(pg.evaluate('lienzo.exportarSVG()'))
    revisar(tam_quemado == tam_detenido, f'la imagen exportada con el LED quemado mide lo mismo que detenida: {tam_quemado} y {tam_detenido}')

    # 5b. F01 de Codex (COD-20261030-003): el marco del archivo exportado no corta la luz. LED encendidos con «Ver
    #     encendido» en los cuatro extremos del circuito (uno girado): el SVG real, abierto como imagen, tiene sus cuatro
    #     bordes sin luz, y la firma y la marca de agua siguen dentro. Apagados, la imagen no crece.
    extremos = {
        'formato': 1, 'placa': 'uno', 'protoboard': None, 'cables': [],
        'componentes': [
            {'id': 'izq', 'tipo': 'led', 'x': -60, 'y': 280, 'rot': 0, 'props': {'color': 'rojo'}},
            {'id': 'der', 'tipo': 'led', 'x': 420, 'y': 120, 'rot': 90, 'props': {'color': 'verde'}},
            {'id': 'arr', 'tipo': 'led', 'x': 150, 'y': -90, 'rot': 0, 'props': {'color': 'azul'}},
            {'id': 'aba', 'tipo': 'led', 'x': 250, 'y': 300, 'rot': 180, 'props': {'color': 'blanco'}},
        ],
    }
    pg.goto(PAGINA)
    pg.evaluate('([k, c]) => localStorage.setItem(k, JSON.stringify(c))', [CLAVE, extremos])
    pg.reload()
    pg.wait_for_selector('.tc-pin[data-ref="aba.anodo"]', state='attached')
    pg.wait_for_timeout(400)
    tam_apagado = tamano_svg(pg.evaluate('lienzo.exportarSVG()'))
    for k in extremos['componentes']:
        caja = pg.locator(f'.tc-comp[data-id="{k["id"]}"] [data-led]').bounding_box()  # la cápsula: el marco es más grande
        pg.mouse.click(caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2)
        pg.get_by_label('Ver encendido').check()
        pg.mouse.click(5, 890)  # suelta la selección: la ficha abierta puede tapar el LED siguiente
        pg.wait_for_timeout(100)
    pg.mouse.click(5, 890)
    pg.wait_for_timeout(200)
    svg = pg.evaluate('lienzo.exportarSVG()')
    (SALIDA / 'luz_5_extremos.svg').write_text(svg, encoding='utf-8')
    encendidos = pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-comp[data-tipo=led] [data-led][data-encendido]")].map(n => n.closest(".tc-comp").dataset.id)')
    revisar(sorted(encendidos) == ['aba', 'arr', 'der', 'izq'], f'los cuatro LED de los extremos encendidos con «Ver encendido» ({encendidos})')
    im = imagen_svg(svg)
    im.save(SALIDA / 'luz_5_extremos.png')
    ancho, alto = im.size
    bordes = {'izquierdo': [im.getpixel((0, y)) for y in range(alto)], 'derecho': [im.getpixel((ancho - 1, y)) for y in range(alto)],
              'de arriba': [im.getpixel((x, 0)) for x in range(ancho)], 'de abajo': [im.getpixel((x, alto - 1)) for x in range(ancho)]}
    for lado, pixeles in bordes.items():
        peor = min(min(px) for px in pixeles)
        revisar(peor >= 250, f'imagen exportada: el borde {lado} queda sin luz (canal más bajo {peor}; fondo 255)')
    revisar(tamano_svg(svg) > tam_apagado, f'con los LED encendidos la imagen crece para que quepa su luz ({tam_apagado} → {tamano_svg(svg)})')
    revisar('class="tc-firma"' in svg and 'class="tc-marca-agua"' in svg, 'la imagen conserva la firma y la marca de agua')
    firma = firma_en(svg)
    revisar(firma is not None and 0 <= firma[0] and firma[0] + firma[2] <= tamano_svg(svg)[0] and firma[1] + firma[3] <= tamano_svg(svg)[1],
            f'la firma queda dentro de la imagen ({firma})')
    for k in extremos['componentes']:
        caja = pg.locator(f'.tc-comp[data-id="{k["id"]}"] [data-led]').bounding_box()  # la cápsula: el marco es más grande
        pg.mouse.click(caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2)
        pg.get_by_label('Ver encendido').uncheck()
        pg.mouse.click(5, 890)  # suelta la selección: la ficha abierta puede tapar el LED siguiente
        pg.wait_for_timeout(100)
    pg.mouse.click(5, 890)
    pg.wait_for_timeout(200)
    revisar(tamano_svg(pg.evaluate('lienzo.exportarSVG()')) == tam_apagado, 'apagados otra vez, la imagen vuelve a su tamaño sin luz')

    # 6. Las cuatro luces de cada placa: con su halo más amplio caben dentro del dibujo de la placa (que sigue
    #    recortando lo que sale de su marco), y las que prenden llevan las tres sombras
    for placa, programa, prenden in [('uno', 'fijo13', ['PWR', 'L']), ('nano', 'nano_adc67', ['PWR', 'TX']), ('nano_old', 'fijo13', ['PWR', 'L'])]:
        iniciar({'formato': 1, 'placa': placa, 'protoboard': None, 'componentes': [], 'cables': []}, programa, 'ideal')
        if 'TX' in prenden:
            pg.wait_for_function(f'''() => {RAIZ}.querySelector('.tc-comp[data-id="placa"] [data-led="TX"]').hasAttribute('data-encendido')''', timeout=5000)
        datos = pg.evaluate(f'''(alcance) => {{
          const s = {RAIZ}.querySelector('.tc-comp[data-id="placa"] svg'), [, , W, H] = s.getAttribute('viewBox').split(' ').map(Number);
          return {{ recorta: s.getAttribute('overflow') !== 'visible' && getComputedStyle(s).overflow === 'hidden',
            leds: [...s.querySelectorAll('[data-led]')].map(l => {{ const b = l.getBBox(), d = Math.max(b.width, b.height) * alcance;
              return {{ led: l.dataset.led, cabe: b.x - d >= 0 && b.y - d >= 0 && b.x + b.width + d <= W && b.y + b.height + d <= H,
                       sombras: l.style.filter.split('drop-shadow(').length - 1, prende: l.hasAttribute('data-encendido') }}; }}) }}; }}''', ALCANCE_MAX)
        nombres = sorted(d['led'] for d in datos['leds'])
        revisar(nombres == ['L', 'PWR', 'RX', 'TX'] and datos['recorta'], f'{placa}: cuatro luces ({", ".join(nombres)}); la placa sigue recortando su marco')
        revisar(all(d['cabe'] for d in datos['leds']), f'{placa}: el halo más amplio de cada luz cabe en la placa: ' +
                ', '.join(d['led'] + ('' if d['cabe'] else ' NO') for d in datos['leds']))
        encendidas = {d['led']: d['sombras'] for d in datos['leds'] if d['prende']}
        revisar(all(encendidas.get(n) == 3 for n in prenden), f'{placa}: {" y ".join(prenden)} prenden con las tres sombras ({encendidas})')
        pg.screenshot(path=str(SALIDA / f'luz_6_{placa}.png'))

    revisar(not errores, f'sin errores ni avisos en la consola ({len(errores)})')
    for e in errores[:5]:
        print('   ', e)
    nav.close()

print(f'\n{comprobaciones - len(fallos)}/{comprobaciones} comprobaciones OK')
sys.exit(1 if fallos else 0)
