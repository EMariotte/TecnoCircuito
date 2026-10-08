"""Prueba la protoboard (prototipo 4) en Chromium: tiras, encaje de las patas, mover, girar, borrar y simular."""
import json
import subprocess
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
PAGINA = Path(sys.argv[1]).resolve().as_uri()
SALIDA = Path(sys.argv[2])
SALIDA.mkdir(parents=True, exist_ok=True)
RAIZ = 'document.querySelector("main .tecnocircuito").shadowRoot'
fallos = []


def revisar(condicion, texto):
    print(('OK   ' if condicion else 'FALLA') + ' ' + texto)
    if not condicion:
        fallos.append(texto)


with sync_playwright() as p:
    nav = p.chromium.launch()
    pg = nav.new_page(viewport={'width': 1366, 'height': 900})
    errores = []
    pg.on('console', lambda m: errores.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: errores.append(f'pageerror: {e}'))
    pg.goto(PAGINA)
    pg.evaluate('localStorage.clear()')
    pg.reload()
    pg.get_by_text('Ejemplo en protoboard (T1)').click()
    pg.wait_for_selector('.tc-pin[data-ref="protoboard.a1"]', state='attached')
    pg.wait_for_timeout(400)

    def centro(ref):
        caja = pg.locator(f'.tc-pin[data-ref="{ref}"]').bounding_box()
        return caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2

    def agregar(nombre):
        """Agrega una pieza con el menú «+ Agregar»."""
        pg.get_by_role('button', name='+ Agregar').click()
        pg.get_by_role('menuitem', name=nombre, exact=True).click()

    def pieza(id_):
        c = pg.evaluate('lienzo.circuito()')
        return c['protoboard'] if id_ == 'protoboard' else next((k for k in c['componentes'] if k['id'] == id_), None)

    def pantalla(wx, wy):
        return pg.evaluate(f'''([wx, wy]) => {{
          const r = {RAIZ};
          const m = new DOMMatrix(getComputedStyle(r.querySelector('.tc-mundo')).transform);
          const a = r.querySelector('.tc-area').getBoundingClientRect();
          return [a.left + m.e + wx * m.a, a.top + m.f + wy * m.a];
        }}''', [wx, wy])

    # ---- Dibujo y tiras
    revisar(pg.locator('.tc-hueco').count() == 400, f'la media protoboard tiene 400 huecos ({pg.locator(".tc-hueco").count()})')
    revisar(pg.locator('.tc-hueco.tc-ocupado').count() == 10, 'los 10 huecos con una pata encajada quedan marcados (no reciben clics)')
    x, y = centro('protoboard.b15')
    pg.mouse.move(x, y)
    pg.wait_for_timeout(100)
    tira = pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-tira")].map(d => d.dataset.ref.slice(11)).sort()')
    revisar(tira == ['a15', 'b15', 'c15', 'd15', 'e15'], f'al pasar por b15 se ilumina su tira: {tira}')
    revisar('unido por dentro con a15–e15' in pg.locator('.tc-tip').inner_text(), f'rótulo: «{pg.locator(".tc-tip").inner_text()}»')
    x, y = centro('protoboard.s+8')
    pg.mouse.move(x, y)
    pg.wait_for_timeout(100)
    revisar(pg.locator('.tc-tira').count() == 25, f'al pasar por un riel se ilumina el riel completo ({pg.locator(".tc-tira").count()} huecos)')
    x, y = centro('led1.anodo')
    pg.mouse.move(x, y)
    pg.wait_for_timeout(100)
    revisar('en el hueco a13' in pg.locator('.tc-tip').inner_text() and pg.locator('.tc-tira').count() == 5,
            f'una pata encajada dice su hueco e ilumina su tira («{pg.locator(".tc-tip").inner_text()}»)')

    # ---- El circuito funciona a través de la protoboard (botón con pull-down)
    pg.locator('#iniciar').click()
    pg.wait_for_timeout(500)
    led = lambda: pg.evaluate(f'{RAIZ}.querySelector("wokwi-led").value')
    suelto = led()
    bx, by = centro('protoboard.f23')  # en medio del botón (está encima de la protoboard)
    caja = pg.locator('.tc-comp[data-id="btn1"]').bounding_box()
    pg.mouse.move(caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2)
    pg.mouse.down()
    pg.wait_for_timeout(300)
    presionado = led()
    pg.locator('main').screenshot(path=str(SALIDA / 'pb_2_simulando.png'))
    pg.mouse.up()
    pg.wait_for_timeout(300)
    revisar(not suelto and presionado and not led(), 'a través de la protoboard: suelto el LED está apagado, presionado se prende y al soltar se apaga')
    x, y = centro('protoboard.i-5')
    pg.mouse.move(x, y)
    pg.wait_for_timeout(100)
    revisar(pg.locator('.tc-tip').inner_text().endswith('0,00 V'), f'el riel − de abajo marca 0 V: «{pg.locator(".tc-tip").inner_text()}»')
    pg.locator('#detener').click()

    # ---- Encajar una pieza nueva: arrastrar un LED hasta que sus patas caigan en b27 y b28
    agregar('LED')
    pg.wait_for_timeout(300)
    nuevo = pieza('led2')
    pb = pieza('protoboard')
    hx, hy = pb['x'] + 14.4 + 26 * 9.6, pb['y'] + 49.4  # hueco b27
    destino_x, destino_y = hx - 15 + 20, hy - 42 + 10  # el LED se toma por su centro (20, 10) para que la pata del cátodo (15, 42) caiga en b27
    caja = pg.locator('.tc-comp[data-id="led2"]').bounding_box()
    x0, y0 = caja['x'] + caja['width'] / 2, caja['y'] + 12
    tomado = pantalla(nuevo['x'] + 20, nuevo['y'] + 12)
    pg.mouse.move(tomado[0], tomado[1])
    pg.mouse.down()
    fin = pantalla(destino_x + 1.5, destino_y - 1.2)  # un poco corrido: el encaje lo corrige
    pg.mouse.move(fin[0], fin[1], steps=12)
    verdes = pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-destino")].map(d => d.dataset.ref.slice(11)).sort()')
    pg.locator('main').screenshot(path=str(SALIDA / 'pb_3_arrastrando.png'))
    pg.mouse.up()
    nuevo = pieza('led2')
    revisar(verdes == ['b27', 'b28'], f'mientras se arrastra, los huecos donde quedaría se ven en verde: {verdes}')
    revisar(nuevo.get('en') == {'catodo': 'protoboard.b27', 'anodo': 'protoboard.b28'},
            f'al soltarlo queda encajado: {nuevo.get("en")}')
    cx, cy = centro('led2.catodo')
    hx2, hy2 = centro('protoboard.b27')
    revisar(abs(cx - hx2) < 1 and abs(cy - hy2) < 1, 'la pata quedó justo sobre el hueco (el encaje corrigió el corrimiento)')

    # Un hueco ocupado no recibe otra pata: soltar el LED 3 encima del LED 2 lo deja suelto
    agregar('LED')
    pg.wait_for_timeout(300)
    l3 = pieza('led3')
    tomado = pantalla(l3['x'] + 20, l3['y'] + 12)
    fin = pantalla(destino_x, destino_y)
    pg.mouse.move(tomado[0], tomado[1])
    pg.mouse.down()
    pg.mouse.move(fin[0], fin[1], steps=10)
    pg.mouse.up()
    revisar('en' not in pieza('led3'), 'sobre huecos ocupados, el LED 3 queda suelto (sin «en»)')
    pg.keyboard.press('Delete')

    # Girar un LED encajado: con las patas en vertical caería en la misma tira, pero igual encaja en otros huecos
    x, y = centro('led2.anodo')
    caja = pg.locator('.tc-comp[data-id="led2"]').bounding_box()
    pg.mouse.click(caja['x'] + caja['width'] / 2, caja['y'] + 10)
    pg.keyboard.press('r')
    girado = pieza('led2')
    revisar(girado['rot'] == 90 and ('en' not in girado or len(set(girado['en'].values())) == 2),
            f'girar re-encaja o deja suelto el LED (rot {girado["rot"]}, en: {girado.get("en")})')

    # ---- Mover la protoboard: las piezas encajadas se mueven con ella
    antes_pb = pieza('protoboard')
    antes_r1 = pieza('r1')
    x, y = pantalla(antes_pb['x'] + 150, antes_pb['y'] + 92.6)  # el canal central: no hay huecos
    pg.mouse.move(x, y)
    pg.mouse.down()
    fin = pantalla(antes_pb['x'] + 150 + 40, antes_pb['y'] + 92.6 + 20)
    pg.mouse.move(fin[0], fin[1], steps=8)
    pg.mouse.up()
    despues_pb = pieza('protoboard')
    despues_r1 = pieza('r1')
    dx, dy = despues_pb['x'] - antes_pb['x'], despues_pb['y'] - antes_pb['y']
    revisar(abs(dx - 40) <= 1 and abs(dy - 20) <= 1 and abs(despues_r1['x'] - antes_r1['x'] - dx) < 0.01 and despues_r1['en'] == antes_r1['en'],
            f'mover la protoboard ({dx:.0f}, {dy:.0f}) mueve la resistencia igual y conserva sus huecos')
    xr, yr = centro('r1.1')
    xh, yh = centro('protoboard.c13')
    revisar(abs(xr - xh) < 1 and abs(yr - yh) < 1, 'la pata de la resistencia sigue sobre su hueco')

    # ---- Imagen SVG con la protoboard
    svg = pg.evaluate('lienzo.exportarSVG()')
    valido = pg.evaluate('(t) => !new DOMParser().parseFromString(t, "image/svg+xml").querySelector("parsererror")', svg)
    revisar(valido and svg.count('fill="#3d3b36"') == 400, 'la imagen SVG lleva la protoboard con sus 400 huecos y es válida')

    # ---- Borrar la protoboard: las piezas quedan sueltas y se van los cables a sus huecos
    pg.mouse.click(fin[0], fin[1])
    pg.keyboard.press('Delete')
    c = pg.evaluate('lienzo.circuito()')
    revisar(c['protoboard'] is None and not any('en' in k for k in c['componentes'])
            and not any('protoboard.' in k['de'] + k['a'] for k in c['cables']),
            f'borrar la protoboard deja las piezas sueltas y quita sus cables ({len(c["cables"])} cables quedan)')
    pg.get_by_role('button', name='+ Agregar').click()
    revisar(pg.get_by_role('menuitem', name='Protoboard', exact=True).is_enabled(), 'en el menú «+ Agregar» vuelve a estar «Protoboard»')
    pg.get_by_role('menuitem', name='Protoboard', exact=True).click()
    pg.wait_for_timeout(200)
    pg.get_by_role('button', name='+ Agregar').click()
    revisar(pg.evaluate('lienzo.circuito().protoboard') is not None and not pg.get_by_role('menuitem', name='Protoboard', exact=True).is_enabled(),
            '«Protoboard» agrega una y queda apagada en el menú')
    pg.keyboard.press('Escape')
    eventos = pg.evaluate('[...document.querySelectorAll("#eventos li")].map(li => li.textContent)')
    revisar(any('componente_quitado' in e and 'protoboard' in e for e in eventos) and any('componente_agregado' in e and 'protoboard' in e for e in eventos),
            'quitar y agregar la protoboard quedan en los eventos')

    # Lo que guarda el lienzo cumple el contrato (contrato/circuito.schema.json): el circuito tal como quedó
    # después de toda esta prueba, y cada ejemplo de la página después de pasar por el lienzo.
    carpeta = SALIDA / 'contrato'
    carpeta.mkdir(exist_ok=True)
    guardados = [carpeta / 'despues_de_la_prueba.json']
    guardados[0].write_text(json.dumps(pg.evaluate('lienzo.circuito()'), ensure_ascii=False), encoding='utf-8')
    for boton in ['ejemplo', 'ejemploT1', 'ejemploPB', 'ejemploT2']:
        pg.click('#' + boton)
        pg.wait_for_timeout(300)
        guardados.append(carpeta / f'{boton}.json')
        guardados[-1].write_text(json.dumps(pg.evaluate('lienzo.circuito()'), ensure_ascii=False), encoding='utf-8')
    revision = subprocess.run(['node', str(Path(__file__).parent / 'contrato.js'), *map(str, guardados)], capture_output=True, text=True, encoding='utf-8')
    print(revision.stdout.rstrip())
    revisar(revision.returncode == 0, f'los {len(guardados)} circuitos que guarda el lienzo cumplen el contrato (esquema y referencias)')

    revisar(not errores, 'sin errores en la consola' + ('' if not errores else ': ' + ' | '.join(errores)))
    nav.close()

print('\n' + ('TODO BIEN' if not fallos else f'{len(fallos)} FALLAS'))
sys.exit(1 if fallos else 0)
