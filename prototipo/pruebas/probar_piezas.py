"""Las cuatro Piezas Tecno del kit en Chromium (PIEZA-001 y PIEZA-002): LED, resistencia, potenciómetro y pulsador.

Dibujo medido por TecnoDiseñador en la biblioteca y en el lienzo, colores, bandas, potencia y su límite, eje, botón,
encaje en la protoboard al paso exacto (el pulsador cruza el canal central, como el real) y los circuitos guardados
antes del 27 oct: abren con las mismas conexiones y las mismas mediciones; el botón y el potenciómetro sin `modelo`
abren con el dibujo del kit, cableados igual y, si sus patas no caben en sus huecos, sueltos con aviso (PIEZA-003).
"""
import json
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright
sys.path.insert(0, str(Path(__file__).parent))  # python -I no agrega la carpeta de la prueba
from eventos_contrato import vigilar_eventos, revisar_eventos  # noqa: E402

sys.stdout.reconfigure(encoding='utf-8')
PAGINA = Path(sys.argv[1]).resolve().as_uri()
SALIDA = Path(sys.argv[2])
SALIDA.mkdir(parents=True, exist_ok=True)
RAIZ = 'document.querySelector("main .tecnocircuito").shadowRoot'
PASO = 9.6


def pasos(nx, ny=0):
    """Una separación de nx × ny pasos, redondeada como la mide la prueba."""
    return (round(nx * PASO, 1), round(ny * PASO, 1))
fallos = []


def revisar(condicion, texto):
    print(('OK   ' if condicion else 'FALLA') + ' ' + texto)
    if not condicion:
        fallos.append(texto)


# El circuito antiguo de la página (EJEMPLO_PB_ANTIGUO), tal como lo guardaba la versión anterior.
pagina = Path(sys.argv[1]).resolve().parent.parent.joinpath('pagina.html').read_text(encoding='utf-8')
ANTIGUO = json.loads(pagina.split('const EJEMPLO_PB_ANTIGUO = ', 1)[1].split(';\n', 1)[0].split(';\r\n', 1)[0])
VACIO = {'formato': 1, 'placa': 'uno', 'componentes': [], 'cables': [], 'protoboard': None}
CON_PB = {**VACIO, 'protoboard': {'tipo': 'media', 'x': 300, 'y': 30}}

with sync_playwright() as p:
    nav = p.chromium.launch()
    pg = nav.new_page(viewport={'width': 1366, 'height': 900})
    eventos_tc = vigilar_eventos(pg)
    errores = []
    pg.on('console', lambda m: errores.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: errores.append(f'pageerror: {e}'))
    pg.goto(PAGINA)
    pg.evaluate('localStorage.clear()')
    pg.reload()

    def abrir(circuito):
        """Abre el circuito como si estuviera guardado (la página lo lee de localStorage al cargar)."""
        pg.evaluate('(c) => localStorage.setItem("tecnocircuito-prototipo-0", JSON.stringify(c))', circuito)
        pg.reload()
        pg.wait_for_selector('main .tecnocircuito')
        pg.wait_for_timeout(500)

    def pieza(id_):
        return next((k for k in pg.evaluate('lienzo.circuito()')['componentes'] if k['id'] == id_), None)

    def agregar(nombre):
        pg.get_by_role('button', name='+ Agregar').click()
        pg.get_by_role('button', name=nombre, exact=True).click()
        pg.wait_for_timeout(200)

    def mundo(sx, sy):
        return pg.evaluate(f'''([sx, sy]) => {{
          const r = {RAIZ}; const m = new DOMMatrix(getComputedStyle(r.querySelector('.tc-mundo')).transform);
          const a = r.querySelector('.tc-area').getBoundingClientRect();
          return [(sx - a.left - m.e) / m.a, (sy - a.top - m.f) / m.a]; }}''', [sx, sy])

    def pantalla(wx, wy):
        return pg.evaluate(f'''([wx, wy]) => {{
          const r = {RAIZ}; const m = new DOMMatrix(getComputedStyle(r.querySelector('.tc-mundo')).transform);
          const a = r.querySelector('.tc-area').getBoundingClientRect();
          return [a.left + m.e + wx * m.a, a.top + m.f + wy * m.a]; }}''', [wx, wy])

    def donde(ref):
        """Posición en el mundo de una pata, de un pin o de un hueco."""
        caja = pg.locator(f'.tc-pin[data-ref="{ref}"]').bounding_box()
        return mundo(caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2)

    def agarre(id_):
        """Un punto de la pieza que la mueve: sobre su dibujo, fuera del eje, del capuchón y de los pines (en pantalla)."""
        return pg.evaluate(f'''(id) => {{
          const r = {RAIZ}; const div = r.querySelector(`.tc-comp[data-id="${{id}}"]`); const b = div.getBoundingClientRect();
          for (let fy = 0.1; fy < 1; fy += 0.04) for (let fx = 0.3; fx < 0.7; fx += 0.05) {{
            const x = b.left + b.width * fx, y = b.top + b.height * fy; const e = r.elementFromPoint(x, y);
            if (e && e.closest('.tc-comp') === div && !e.closest('[data-parte="eje"], [data-parte="capuchon"], .tc-pin')) return [x, y];
          }}
          return null; }}''', id_)

    def arrastrar(id_, dx, dy, pasos=10):
        """Arrastra la pieza (dx, dy) en el mundo."""
        x, y = agarre(id_)
        wx, wy = mundo(x, y)
        fx, fy = pantalla(wx + dx, wy + dy)
        pg.mouse.move(x, y)
        pg.mouse.down()
        pg.mouse.move(fx, fy, steps=pasos)
        pg.mouse.up()
        pg.wait_for_timeout(150)

    def soltar_en(id_, pata, hueco):
        """Arrastra la pieza para que su pata caiga sobre el hueco (un poco corrida: el encaje la corrige)."""
        a, b = donde(f'{id_}.{pata}'), donde(f'protoboard.{hueco}')
        arrastrar(id_, b[0] - a[0] + 1.2, b[1] - a[1] - 1)

    def pegadas(id_):
        """Patas de la pieza que caen sobre un pin o un hueco ajeno (a 3,5 px o menos, la tolerancia del imán)."""
        return pg.evaluate(f'''(id) => {{
          const r = {RAIZ}; const m = new DOMMatrix(getComputedStyle(r.querySelector('.tc-mundo')).transform);
          const centro = (e) => {{ const b = e.getBoundingClientRect(); return [b.x + b.width / 2, b.y + b.height / 2]; }};
          const pines = [...r.querySelectorAll('.tc-pin[data-ref]')];
          const propias = pines.filter((e) => e.dataset.ref.startsWith(id + '.'));
          const ajenos = pines.filter((e) => !e.dataset.ref.startsWith(id + '.')).map(centro);
          return propias.filter((e) => {{ const [x, y] = centro(e); return ajenos.some(([u, v]) => Math.hypot(u - x, v - y) / m.a <= 3.5); }})
            .map((e) => e.dataset.ref); }}''', id_)

    def separacion(id_, a, b):
        pa, pb = donde(f'{id_}.{a}'), donde(f'{id_}.{b}')
        return round(abs(pb[0] - pa[0]), 1), round(abs(pb[1] - pa[1]), 1)

    def attr(id_, selector, nombre):
        return pg.evaluate(f'([id, s, n]) => {{ const e = {RAIZ}.querySelector(`.tc-comp[data-id="${{id}}"] ${{s}}`); return e && e.getAttribute(n); }}',
                           [id_, selector, nombre])

    def elegir(id_):
        x, y = agarre(id_)
        pg.mouse.click(x, y)
        pg.wait_for_timeout(100)

    def ficha():
        return pg.evaluate(f'{RAIZ}.querySelector(".tc-ficha").innerText')

    def guardado(id_):
        """La pieza como quedó guardada (la página guarda en cada cambio que avisa el lienzo)."""
        c = json.loads(pg.evaluate('localStorage.getItem("tecnocircuito-prototipo-0")') or '{}')
        return next((k for k in c.get('componentes', []) if k['id'] == id_), None)

    def igual_que_guardado(id_):
        vivo, g = pieza(id_), guardado(id_)
        return all(vivo.get(k) == g.get(k) for k in ('x', 'y', 'en', 'props')), vivo, g

    def centro_patas(id_):
        """Centro de las patas de la pieza, en pantalla."""
        return pg.evaluate(f'''(id) => {{ const ps = [...{RAIZ}.querySelectorAll(`.tc-pin[data-ref^="${{id}}."]`)].map(p => p.getBoundingClientRect());
          return [ps.reduce((s, b) => s + b.x + b.width / 2, 0) / ps.length, ps.reduce((s, b) => s + b.y + b.height / 2, 0) / ps.length]; }}''', id_)

    # ---- 1. La biblioteca y las piezas nuevas: dibujos medidos, sin wokwi
    abrir(VACIO)
    pg.get_by_role('button', name='+ Agregar').click()
    minis = pg.evaluate(f'''() => Object.fromEntries(['led', 'resistencia', 'pulsador', 'potenciometro'].map(t => {{
      const b = {RAIZ}.querySelector(`.tc-pieza[data-pieza="${{t}}"]`);
      return [t, {{ svg: !!b.querySelector('svg'), wokwi: [...b.querySelectorAll('*')].some(e => e.tagName.startsWith('WOKWI')) }}]; }}))''')
    revisar(all(m['svg'] and not m['wokwi'] for m in minis.values()), f'la biblioteca muestra los cuatro dibujos medidos, sin wokwi: {minis}')
    pg.keyboard.press('Escape')
    for nombre in ['LED', 'Resistencia', 'Botón', 'Potenciómetro']:
        agregar(nombre)
    c = {k['id']: k for k in pg.evaluate('lienzo.circuito()')['componentes']}
    revisar(c['r1']['props'] == {'ohmios': 220, 'vatios': 0.25} and c['led1']['props'] == {'color': 'rojo'}
            and c['btn1']['props'] == {'color': 'rojo', 'modelo': '6x6'} and c['pot1']['props'] == {'ohmios': 10000, 'posicion': 0.5, 'modelo': '16mm'},
            f'una pieza nueva trae vatios o modelo: {[c[i]["props"] for i in ["r1", "led1", "btn1", "pot1"]]}')
    tecno = pg.evaluate(f'''() => ['r1', 'led1', 'btn1', 'pot1'].map(id => {{ const d = {RAIZ}.querySelector(`.tc-comp[data-id="${{id}}"]`);
      return d.firstElementChild.tagName.toLowerCase() + (d.classList.contains('tc-solo-pintado') ? '+pintado' : ''); }})''')
    revisar(tecno == ['svg+pintado'] * 4, f'las cuatro son SVG propios y solo reciben el clic donde están pintadas: {tecno}')

    # Geometría: el paso exacto de 2,54 mm (9,6 px)
    revisar(separacion('led1', 'catodo', 'anodo') == pasos(1), f'LED: el cátodo y el ánodo a 1 paso {separacion("led1", "catodo", "anodo")}')
    revisar(separacion('r1', '1', '2') == pasos(4), f'resistencia de ¼ W: las patas a 4 pasos {separacion("r1", "1", "2")}')
    revisar(separacion('pot1', 'GND', 'SIG') == pasos(2) and separacion('pot1', 'GND', 'VCC') == pasos(4),
            f'potenciómetro: GND, SIG y VCC a 2 pasos {separacion("pot1", "GND", "VCC")}')
    revisar(separacion('btn1', '1i', '1d') == pasos(3) and separacion('btn1', '1i', '2i') == pasos(0, 2),
            f'pulsador: 3 pasos de lado a lado y 2 en el mismo lado {separacion("btn1", "1i", "1d")}, {separacion("btn1", "1i", "2i")}')

    # ---- 2. Lo que dice la ficha cambia el dibujo
    bandas = lambda id_: [attr(id_, f'[data-banda="{n}"]', 'fill') for n in range(1, 5)]
    revisar(bandas('r1') == ['#d0312d', '#d0312d', '#7b4a2a', '#c9a040'], f'220 Ω: rojo, rojo, marrón y oro {bandas("r1")}')
    elegir('r1')
    pg.evaluate(f'{RAIZ}.querySelector(\'.tc-comp[data-id="r1"] svg\').dataset.marca = "antes"')
    pg.locator('select[data-prop="ohmios"]').select_option('10000')
    pg.wait_for_timeout(150)
    revisar(bandas('r1') == ['#7b4a2a', '#1c1c1c', '#ee6a1e', '#c9a040'], f'10 kΩ: marrón, negro, naranja y oro {bandas("r1")}')
    revisar(attr('r1', 'svg', 'data-marca') == 'antes', 'otro valor solo pinta otra vez las bandas: el dibujo no se rehace')
    pg.locator('select[data-prop="vatios"]').select_option('0.5')
    pg.wait_for_timeout(200)
    revisar(separacion('r1', '1', '2') == pasos(6) and pieza('r1')['props']['vatios'] == 0.5 and bandas('r1')[0] == '#7b4a2a',
            f'½ W: las patas pasan a 6 pasos y las bandas siguen en 10 kΩ {separacion("r1", "1", "2")}')
    revisar('½ W (0,5 W)' in ficha() and '8,7 mm' in ficha() and 'a 6 pasos' in ficha(), 'la ficha dice ½ W, el cuerpo de 8,7 mm y las patas a 6 pasos')

    elegir('led1')
    pg.locator('select[data-prop="color"]').select_option('azul')
    pg.wait_for_timeout(100)
    revisar(attr('led1', '[data-led="LED"]', 'fill') == '#007ecc' and attr('led1', '[data-parte="quemado"]', 'display') == 'none',
            'LED azul: la cápsula toma el azul apagado de la foto; la parte «quemado» no se ve')

    revisar(attr('pot1', '[data-valor]', 'data-valor') is not None and pg.evaluate(f'{RAIZ}.querySelector(\'.tc-comp[data-id="pot1"] [data-valor]\').textContent') == 'B10K',
            'el potenciómetro dice «B10K», como el del kit')
    elegir('pot1')
    rotulos = []
    for ohmios in ['1000', '100000']:
        pg.locator('select[data-prop="ohmios"]').select_option(ohmios)
        pg.wait_for_timeout(100)
        rotulos.append(pg.evaluate(f'{RAIZ}.querySelector(\'.tc-comp[data-id="pot1"] [data-valor]\').textContent'))
    revisar(rotulos == ['B1K', 'B100K'], f'el rótulo sigue a los ohmios: {rotulos}')
    revisar(attr('pot1', '[data-parte="eje"]', 'transform') == 'rotate(0 8.89 8.03)', 'en la mitad, la ranura del eje queda vertical')

    elegir('btn1')
    pg.locator('select[data-prop="color"]').select_option('negro')
    pg.wait_for_timeout(100)
    revisar(attr('btn1', '[data-relleno="capuchon"]', 'fill') == '#1d2025', 'el botón negro toma el negro del kit')

    # El eje gira con el mouse y se detiene en los extremos (270°)
    caja = pg.evaluate(f'''() => {{ const k = {RAIZ}.querySelector('.tc-comp[data-id="pot1"] [data-parte="eje"]').getBoundingClientRect();
      return [k.x + k.width / 2, k.y + k.height / 2, k.width]; }}''')
    cx, cy, w = caja
    pg.mouse.move(cx, cy - w * 0.35)  # la ranura, arriba
    pg.mouse.down()
    for ang in range(0, 400, 20):  # más de una vuelta con el reloj: se queda en el tope
        import math
        pg.mouse.move(cx + math.sin(math.radians(ang)) * w * 0.35, cy - math.cos(math.radians(ang)) * w * 0.35)
    pg.mouse.up()
    pot = pieza('pot1')
    revisar(pot['props']['posicion'] == 1 and attr('pot1', '[data-parte="eje"]', 'transform') == 'rotate(135 8.89 8.03)',
            f'girar el eje con el mouse más de una vuelta lo deja en el tope: {pot["props"]["posicion"]} ({attr("pot1", "[data-parte=eje]", "transform")})')
    pg.screenshot(path=str(SALIDA / 'piezas_1_nuevas.png'))

    # ---- 3. Encaje en la protoboard, al paso exacto. Las cuatro piezas nuevas empiezan debajo de la protoboard.
    nuevas = [('r1', 'resistencia', 320, 250, {'ohmios': 220, 'vatios': 0.25}), ('pot1', 'potenciometro', 390, 240, {'ohmios': 10000, 'posicion': 0.5, 'modelo': '16mm'}),
              ('btn1', 'pulsador', 490, 250, {'color': 'rojo', 'modelo': '6x6'}), ('led1', 'led', 560, 240, {'color': 'rojo'})]
    abrir({**CON_PB, 'componentes': [{'id': i, 'tipo': t, 'x': x, 'y': y, 'rot': 0, 'props': pr} for i, t, x, y, pr in nuevas]})
    soltar_en('r1', '1', 'c5')
    revisar(pieza('r1').get('en') == {'1': 'protoboard.c5', '2': 'protoboard.c9'}, f'la resistencia de ¼ W encaja de c5 a c9: {pieza("r1").get("en")}')
    elegir('r1')
    pg.locator('select[data-prop="vatios"]').select_option('0.5')
    pg.wait_for_timeout(250)
    revisar(pieza('r1').get('en') == {'1': 'protoboard.c5', '2': 'protoboard.c11'}, f'cambiarla por una de ½ W deja la pata 1 en c5 y la 2 va a c11: {pieza("r1").get("en")}')
    a, b = donde('r1.2'), donde('protoboard.c11')
    revisar(abs(a[0] - b[0]) < 0.05 and abs(a[1] - b[1]) < 0.05, 'y la pata 2 queda justo sobre c11')
    ok, vivo, g = igual_que_guardado('r1')
    revisar(ok, f'lo guardado tiene los huecos y el lugar del lienzo: {g.get("en")} ({g.get("x")}, {g.get("y")}) y {vivo.get("en")} ({vivo.get("x")}, {vivo.get("y")})')

    soltar_en('pot1', 'GND', 'j3')
    revisar(pieza('pot1').get('en') == {'GND': 'protoboard.j3', 'SIG': 'protoboard.j5', 'VCC': 'protoboard.j7'},
            f'el potenciómetro encaja con las patas a 2 pasos: {pieza("pot1").get("en")}')

    elegir('btn1')
    pg.keyboard.press('r')
    pg.wait_for_timeout(100)
    soltar_en('btn1', '2i', 'e20')
    revisar(pieza('btn1').get('en') == {'1i': 'protoboard.e22', '1d': 'protoboard.f22', '2i': 'protoboard.e20', '2d': 'protoboard.f20'},
            f'el pulsador girado cruza el canal central, como el real: {pieza("btn1").get("en")}')

    soltar_en('led1', 'catodo', 'a27')
    revisar(pieza('led1').get('en') == {'catodo': 'protoboard.a27', 'anodo': 'protoboard.a28'}, f'el LED encaja en a27 y a28: {pieza("led1").get("en")}')
    # El marco del LED no tapa los huecos de al lado: a26 y a29 quedan bajo su marco transparente y siguen recibiendo el
    # clic. Sin `soloPintado` (se quita la clase un momento) el clic sería del LED: así la prueba sí mira el marco.
    def bajo_hueco(h):
        return pg.evaluate(f'''(h) => {{ const r = {RAIZ}; const b = r.querySelector(`.tc-pin[data-ref="protoboard.${{h}}"]`).getBoundingClientRect();
          const e = r.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2); return e && (e.dataset.ref || e.closest(".tc-comp")?.dataset.id); }}''', h)
    con = {h: bajo_hueco(h) for h in ['a26', 'a29']}
    pg.evaluate(f'{RAIZ}.querySelector(\'.tc-comp[data-id="led1"]\').classList.remove("tc-solo-pintado")')
    sin = {h: bajo_hueco(h) for h in ['a26', 'a29']}
    pg.evaluate(f'{RAIZ}.querySelector(\'.tc-comp[data-id="led1"]\').classList.add("tc-solo-pintado")')
    revisar(con == {'a26': 'protoboard.a26', 'a29': 'protoboard.a29'} and sin == {'a26': 'led1', 'a29': 'led1'},
            f'el marco transparente del LED no tapa los huecos a26 y a29 (con la clase: {con}; sin ella, del LED: {sin})')
    pg.screenshot(path=str(SALIDA / 'piezas_2_protoboard.png'))

    # ---- 4. El circuito de la T1 en la protoboard con las piezas del kit: el botón baja y prende el LED
    pg.click('#ejemploPB')
    pg.wait_for_timeout(400)
    pg.locator('#iniciar').click()
    pg.wait_for_timeout(500)
    x, y = pg.evaluate(f'''() => {{ const b = {RAIZ}.querySelector('.tc-comp[data-id="btn1"] [data-relleno]').getBoundingClientRect(); return [b.x + b.width / 2, b.y + b.height / 2]; }}''')
    pg.mouse.move(x, y)
    pg.mouse.down()
    pg.wait_for_timeout(400)
    abajo = {'presionado': attr('btn1', 'svg', 'data-presionado') is not None if False else pg.evaluate(f'{RAIZ}.querySelector(\'.tc-comp[data-id="btn1"] svg\').hasAttribute("data-presionado")'),
             'capuchon': attr('btn1', '[data-parte="capuchon"]', 'transform'),
             'led': pg.evaluate(f'{RAIZ}.querySelector(\'.tc-comp[data-id="led1"] [data-led]\').hasAttribute("data-encendido")'),
             'i': next(l['i'] for l in pg.evaluate('sim._mediciones()')['leds'] if l['id'] == 'led1')}
    pg.screenshot(path=str(SALIDA / 'piezas_3_presionado.png'))
    pg.mouse.up()
    pg.wait_for_timeout(300)
    revisar(abajo['presionado'] and 'scale(0.86)' in (abajo['capuchon'] or '') and abajo['led'],
            f'presionado, el capuchón se hunde y el LED prende ({abajo["capuchon"]})')
    revisar(attr('btn1', '[data-parte="capuchon"]', 'transform') is None, 'al soltarlo, el capuchón sube')
    kit_i = abajo['i']
    pg.locator('#detener').click()
    pg.wait_for_timeout(300)

    # ---- 5. El mismo circuito guardado antes del 27 oct. El LED y las resistencias abren con las mismas conexiones. El
    # botón, guardado sin `modelo`, abre con el dibujo del kit (PIEZA-003, decisión de Efraín): sus patas nuevas no caben
    # en los huecos de antes, así que queda suelto, con el centro de sus patas donde estaba, y se avisa.
    abrir(ANTIGUO)
    aviso = pg.evaluate(f'{RAIZ}.querySelector(".tc-aviso")?.textContent || ""')  # antes de tocar nada: un clic lo cambia
    ahora = {k['id']: k for k in pg.evaluate('lienzo.circuito()')['componentes']}
    antes = {k['id']: k for k in ANTIGUO['componentes']}
    otras = [i for i in antes if i != 'btn1']
    revisar(all(ahora[i]['en'] == antes[i]['en'] and ahora[i]['props'] == antes[i]['props'] for i in otras)
            and pg.evaluate('lienzo.circuito()')['cables'] == ANTIGUO['cables'],
            'el LED y las resistencias abren con los mismos huecos y las mismas props (sin vatios), y los cables son los mismos')
    revisar((ahora['led1']['x'], ahora['led1']['y']) != (antes['led1']['x'], antes['led1']['y']) and separacion('led1', 'catodo', 'anodo') == pasos(1),
            f'el LED toma el dibujo medido y se corre sobre sus huecos: ({antes["led1"]["x"]}, {antes["led1"]["y"]}) → ({ahora["led1"]["x"]}, {ahora["led1"]["y"]})')
    fuera = pg.evaluate(f'''() => {{ const r = {RAIZ}; const c = lienzo.circuito(); const malas = [];
      const centro = (ref) => {{ const b = r.querySelector(`.tc-pin[data-ref="${{ref}}"]`).getBoundingClientRect(); return [b.x + b.width / 2, b.y + b.height / 2]; }};
      for (const k of c.componentes) for (const [pata, ref] of Object.entries(k.en || {{}})) {{
        const [a, b] = [centro(k.id + '.' + pata), centro(ref)]; if (Math.hypot(a[0] - b[0], a[1] - b[1]) > 0.5) malas.push(k.id + '.' + pata); }}
      return malas; }}''')
    revisar(not fuera, f'cada pata queda sobre el hueco que dice su «en» ({fuera or "todas"})')
    revisar(separacion('r1', '1', '2') == pasos(6), 'la resistencia sin vatios se dibuja de ¼ W con las patas abiertas a 6 pasos, en sus mismos huecos')
    elegir('r1')
    seleccion = pg.evaluate(f'{RAIZ}.querySelector(\'select[data-prop="vatios"]\').selectedOptions[0].textContent')
    revisar(seleccion == '¼ W, patas abiertas' and 'a 6 pasos' in ficha() and '¼ W (0,25 W)' in ficha(),
            f'su ficha dice «{seleccion}», ¼ W y las patas a 6 pasos')
    # El botón: dibujo del kit, `modelo` completado, suelto y con el centro de sus patas donde estaba el de las antiguas
    # (el dibujo anterior, girado 90°, medía 67,28 × 45,35 px con las patas en x 0/67 e y 13/32), apartado medio paso
    # para que ninguna pata quede sobre un hueco: suelto, se ve suelto (A2 de la preauditoría).
    btn = ahora['btn1']
    a = antes['btn1']
    centro_antes = (a['x'] + 67.28 / 2 - (22.5 - 45.35 / 2), a['y'] + 45.35 / 2 + (33.5 - 67.28 / 2))
    centro_ahora = [sum(v) / 4 for v in zip(*[donde(f'btn1.{p}') for p in ['1i', '1d', '2i', '2d']])]
    revisar(btn['props'] == {'color': 'rojo', 'modelo': '6x6'} and 'en' not in btn
            and pg.evaluate(f'{RAIZ}.querySelector(\'.tc-comp[data-id="btn1"]\').firstElementChild.tagName') == 'svg',
            f'el botón guardado sin modelo abre con el dibujo del kit y queda suelto: {btn["props"]}, en: {btn.get("en")}')
    corrido = (centro_ahora[0] - centro_antes[0], centro_ahora[1] - centro_antes[1])
    revisar(all(min(abs(abs(v) - PASO / 2), abs(v)) < 0.6 for v in corrido) and max(abs(v) for v in corrido) > PASO / 2 - 0.6,
            f'con el centro de sus patas donde estaba el de las anteriores, apartado medio paso: {[round(v, 1) for v in centro_ahora]} y {[round(v, 1) for v in centro_antes]}')
    revisar(not pegadas('btn1'), f'ninguna pata del botón suelto queda sobre un hueco o un pin ({pegadas("btn1")})')
    revisar('El botón btn1 quedó suelto: ahora tiene el dibujo del kit y sus patas ya no caben donde estaban. Ponlo otra vez donde va.' in aviso,
            f'y se avisa: «{aviso}»')
    elegir('btn1')
    revisar('6 × 6 mm; patas' in ficha() and 'Dibujo antiguo' not in ficha(), 'su ficha da las medidas del kit')
    eventos = pg.evaluate('[...document.querySelectorAll("#eventos li")].map(li => li.textContent).filter(t => t.includes("btn1"))')
    revisar(not eventos, f'abrir no emite eventos del botón: no es un cambio del aprendiz ({eventos[:1]})')

    # Puesto otra vez en la protoboard, cruzando el canal en las mismas columnas, el circuito mide lo mismo que con las
    # piezas del kit.
    arrastrar('btn1', -corrido[0], 2 * PASO - corrido[1])
    btn = pieza('btn1')
    revisar(btn.get('en') == {'1i': 'protoboard.e24', '1d': 'protoboard.f24', '2i': 'protoboard.e22', '2d': 'protoboard.f22'},
            f'al ponerlo otra vez, encaja cruzando el canal en las mismas columnas: {btn.get("en")}')
    pg.locator('#iniciar').click()
    pg.wait_for_timeout(500)
    x, y = pg.evaluate(f'''() => {{ const b = {RAIZ}.querySelector('.tc-comp[data-id="btn1"] [data-relleno]').getBoundingClientRect(); return [b.x + b.width / 2, b.y + b.height / 2]; }}''')
    pg.mouse.move(x, y)
    pg.mouse.down()
    pg.wait_for_timeout(400)
    antiguo_i = next(l['i'] for l in pg.evaluate('sim._mediciones()')['leds'] if l['id'] == 'led1')
    pg.mouse.up()
    pg.wait_for_timeout(200)
    pg.locator('#detener').click()
    pg.wait_for_timeout(300)
    revisar(antiguo_i > 0.005 and abs(antiguo_i - kit_i) < 1e-9,
            f'presionado, el LED mide lo mismo que con las piezas del kit: {antiguo_i * 1000:.3f} mA y {kit_i * 1000:.3f} mA')

    # Un potenciómetro guardado sin modelo y cableado a la placa: abre con el dibujo del kit, el centro de sus patas
    # donde estaba (el dibujo anterior las tenía en x 29/39/49 e y 68,5), su perilla y su cable; sin aviso.
    abrir({**VACIO, 'componentes': [{'id': 'pot1', 'tipo': 'potenciometro', 'x': 250, 'y': 215, 'rot': 0, 'props': {'ohmios': 10000, 'posicion': 0.3}}],
           'cables': [{'de': 'placa.A0', 'a': 'pot1.SIG', 'color': 'verde'}]})
    pot = pieza('pot1')
    centro_pot = [sum(v) / 3 for v in zip(*[donde(f'pot1.{p}') for p in ['GND', 'SIG', 'VCC']])]
    aviso = pg.evaluate(f'{RAIZ}.querySelector(".tc-aviso")?.textContent || ""')
    revisar(pot['props'] == {'ohmios': 10000, 'posicion': 0.3, 'modelo': '16mm'} and attr('pot1', '[data-parte="eje"]', 'transform') == 'rotate(-54 8.89 8.03)'
            and pg.evaluate('lienzo.circuito()')['cables'] == [{'de': 'placa.A0', 'a': 'pot1.SIG', 'color': 'verde'}] and 'suelto' not in aviso,
            f'el potenciómetro guardado sin modelo abre con el dibujo del kit, su perilla en el 30 % (−54°) y su cable, sin aviso: {pot["props"]}')
    revisar(abs(centro_pot[0] - 289) < 0.6 and abs(centro_pot[1] - 283.5) < 0.6,
            f'con el centro de sus patas donde estaba el de las anteriores: {[round(v, 1) for v in centro_pot]} y [289, 283.5]')
    elegir('pot1')
    revisar('a 2 pasos (5,08 mm)' in ficha(), 'y su ficha da las patas del kit, a 2 pasos')

    # Un LED enchufado en un potenciómetro antiguo cableado: el potenciómetro se renueva y se corre solo; el LED ya no cabe
    # en sus patas nuevas, así que se suelta y se avisa, sin quedar unido a la distancia (A1 de la preauditoría).
    abrir({'formato': 1, 'placa': 'uno', 'protoboard': None,
           'componentes': [{'id': 'pot1', 'tipo': 'potenciometro', 'x': 400, 'y': 60, 'rot': 0, 'props': {'ohmios': 10000, 'posicion': 0.5}},
                           {'id': 'led1', 'tipo': 'led', 'x': 419.4, 'y': 85.3, 'rot': 0, 'props': {'color': 'rojo'},
                            'en': {'catodo': 'pot1.GND', 'anodo': 'pot1.SIG'}}],
           'cables': [{'de': 'placa.A0', 'a': 'pot1.SIG', 'color': 'verde'}, {'de': 'placa.GND1', 'a': 'pot1.VCC', 'color': 'negro'}]})
    aviso = pg.evaluate(f'{RAIZ}.querySelector(".tc-aviso")?.textContent || ""')
    led = pieza('led1')
    revisar('en' not in led and 'Se soltó el LED led1 del potenciómetro pot1' in aviso and not pegadas('led1'),
            f'el LED enchufado en el potenciómetro antiguo se suelta, con aviso y sin patas sobre pines: en {led.get("en")}, «{aviso}», {pegadas("led1")}')
    revisar(pieza('pot1')['props'].get('modelo') == '16mm' and 'suelto' not in aviso.split('Se soltó')[0],
            'el potenciómetro, cableado, toma el dibujo del kit sin quedar suelto')

    # Un potenciómetro antiguo encajado en c10–c12: sus patas del kit van a 2 pasos, no caben, queda suelto y apartado
    # medio paso: ninguna pata sobre un hueco (A2). Reabrir lo guardado no lo corre más.
    pot_pb = {'formato': 1, 'placa': 'uno', 'protoboard': {'tipo': 'media', 'x': 300, 'y': 30},
              'componentes': [{'id': 'pot1', 'tipo': 'potenciometro', 'x': 371.39, 'y': 20.5, 'rot': 0, 'props': {'ohmios': 10000, 'posicion': 0.5},
                               'en': {'GND': 'protoboard.c10', 'SIG': 'protoboard.c11', 'VCC': 'protoboard.c12'}}],
              'cables': [{'de': 'placa.A0', 'a': 'protoboard.a11', 'color': 'verde'}]}
    abrir(pot_pb)
    pot = pieza('pot1')
    revisar('en' not in pot and not pegadas('pot1'), f'el potenciómetro antiguo en la protoboard queda suelto y sin patas sobre huecos: {pot.get("en")}, {pegadas("pot1")}')
    reabierto = pg.evaluate("lienzo.circuito()")
    abrir(reabierto)
    revisar((pieza('pot1')['x'], pieza('pot1')['y']) == (pot['x'], pot['y']), 'reabrir lo guardado no lo corre más')

    # Con `modelo` nulo o vacío en el archivo, se completa el del kit: reabrir no lo vuelve a correr (A3).
    for vacio in (None, ''):
        abrir({**VACIO, 'componentes': [{'id': 'pot1', 'tipo': 'potenciometro', 'x': 250, 'y': 215, 'rot': 0, 'props': {'ohmios': 10000, 'posicion': 0.5, 'modelo': vacio}}]})
        uno = pieza('pot1')
        abrir(pg.evaluate('lienzo.circuito()'))
        dos = pieza('pot1')
        revisar(uno['props']['modelo'] == '16mm' and (uno['x'], uno['y']) == (dos['x'], dos['y']),
                f'con modelo {vacio!r}: se completa «16mm» y reabrir no lo corre ({uno["x"]}, {uno["y"]}) → ({dos["x"]}, {dos["y"]})')

    # Elegir una potencia en la resistencia antigua (c13 a c19): lo guardado, y lo que recibe el simulador, tiene los
    # huecos donde quedó el dibujo nuevo (hallazgo A-01 de la revisión: se avisaba el cambio antes de reacomodarla).
    abrir(ANTIGUO)
    elegir('r1')
    pg.locator('select[data-prop="vatios"]').select_option('0.25')
    pg.wait_for_timeout(300)
    ok, vivo, g = igual_que_guardado('r1')
    revisar(ok and vivo.get('en') != antes['r1']['en'] and vivo['props'].get('vatios') == 0.25,
            f'la resistencia antigua pasa a ¼ W y lo guardado coincide con el lienzo: {antes["r1"]["en"]} → {g.get("en")} ({vivo.get("en")})')

    # Una resistencia guardada sin `vatios`, suelta, pasa directo a ½ W: el dibujo cambia de variante aunque el marco y las
    # patas sean los mismos (¼ W abierta y ½ W, las dos a 6 pasos), en el lienzo, en la imagen exportada y al reabrir
    # (hallazgo F01 de Codex, 28 oct). Las patas no se mueven.
    suelta = {'formato': 1, 'placa': 'uno', 'protoboard': None, 'cables': [],
              'componentes': [{'id': 'r1', 'tipo': 'resistencia', 'x': 350, 'y': 200, 'rot': 0, 'props': {'ohmios': 1000}}]}
    abrir(suelta)
    patas_antes = (donde('r1.1'), donde('r1.2'))
    elegir('r1')
    pg.locator('select[data-prop="vatios"]').select_option('0.5')
    pg.wait_for_timeout(300)
    variante = lambda: pg.evaluate(f'''() => {{ const s = {RAIZ}.querySelector('.tc-comp[data-id="r1"] svg');
      return [s.querySelector('title')?.textContent, /td-resistencia-05w-/.test(s.outerHTML), /td-resistencia-025w6-/.test(s.outerHTML)]; }}''')
    vista = variante()
    exportada = pg.evaluate('lienzo.exportarSVG()')
    ok, vivo, g = igual_que_guardado('r1')
    revisar(vista == ['Resistencia de ½ W', True, False] and 'td-resistencia-05w-' in exportada and 'td-resistencia-025w6-' not in exportada
            and ok and g['props'].get('vatios') == 0.5 and (donde('r1.1'), donde('r1.2')) == patas_antes,
            f'sin vatios → ½ W: el dibujo y la imagen exportada pasan a la de ½ W, guardada y con las patas quietas ({vista})')
    abrir({**suelta, 'componentes': [g]})
    revisar(variante() == ['Resistencia de ½ W', True, False], f'y al reabrir sigue la de ½ W ({variante()})')

    # Un `vatios` escrito como texto se ve, se describe y aguanta igual que el número (una sola regla: potenciaDe)
    abrir({**CON_PB, 'componentes': [{'id': 'r1', 'tipo': 'resistencia', 'x': 320, 'y': 250, 'rot': 0, 'props': {'ohmios': 220, 'vatios': '0.25'}}]})
    elegir('r1')
    revisar(separacion('r1', '1', '2') == pasos(4) and '¼ W (0,25 W)' in ficha() and 'a 4 pasos' in ficha(),
            f'«vatios»: "0.25" es la de ¼ W en el dibujo y en la ficha, con las patas a 4 pasos {separacion("r1", "1", "2")}')

    # ---- 6. La imagen exportada lleva los dibujos medidos
    pg.click('#ejemploPB')
    pg.wait_for_timeout(400)
    svg = pg.evaluate('lienzo.exportarSVG()')
    valido = pg.evaluate('(t) => !new DOMParser().parseFromString(t, "image/svg+xml").querySelector("parsererror")', svg)
    ids = pg.evaluate('(t) => { const d = new DOMParser().parseFromString(t, "image/svg+xml"); const v = [...d.querySelectorAll("[id]")].map(e => e.id); return v.length - new Set(v).size; }', svg)
    revisar(valido and ids == 0 and 'data-led="LED"' in svg and svg.count('data-banda=') == 8 and 'data-relleno="capuchon"' in svg and 'wokwi' not in svg.lower(),
            f'la imagen SVG es válida, sin id repetidos, con el LED, las 8 bandas y el botón medidos ({len(svg) // 1024} KB)')

    revisar_eventos(eventos_tc, revisar, 'piezas')
    revisar(not errores, 'sin errores en la consola' + ('' if not errores else ': ' + ' | '.join(errores)))
    nav.close()

print('\n' + ('TODO BIEN' if not fallos else f'{len(fallos)} FALLAS'))
sys.exit(1 if fallos else 0)
