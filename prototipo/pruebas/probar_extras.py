"""Prueba las funciones secundarias del prototipo 0: dobleces, encendido, cancelar, zoom y avisos."""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
PAGINA = Path(sys.argv[1]).resolve().as_uri()
SALIDA = Path(sys.argv[2])
fallos = []
RAIZ = 'document.querySelector("main .tecnocircuito").shadowRoot'


def revisar(condicion, texto):
    print(('OK   ' if condicion else 'FALLA') + ' ' + texto)
    if not condicion:
        fallos.append(texto)


with sync_playwright() as p:
    nav = p.chromium.launch()
    pg = nav.new_page(viewport={'width': 1366, 'height': 768})
    errores = []
    pg.on('console', lambda m: errores.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: errores.append(f'pageerror: {e}'))
    pg.goto(PAGINA)
    pg.evaluate('localStorage.clear()')
    pg.reload()
    pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
    pg.get_by_text('Ver un ejemplo armado').click()
    pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
    pg.wait_for_timeout(300)

    def centro(ref):
        caja = pg.locator(f'.tc-pin[data-ref="{ref}"]').bounding_box()
        return caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2

    def cables():
        return pg.evaluate('lienzo.circuito().cables')

    # Doble clic en el tramo horizontal del cable D13 → r1.1: agrega un doblez
    xd, yd = centro('placa.D13')
    xr, yr = centro('r1.1')
    xm = (xd + xr) / 2
    pg.mouse.dblclick(xm, yr)
    puntos = cables()[0]['puntos']
    revisar(len(puntos) == 2 and puntos[0] == [125, -20.35] and puntos[1][1] == -20.35,
            f'doble clic agrega un doblez sobre el cable, sin torcerlo: {puntos}')

    # Arrastrar ese doblez hacia arriba: el imán lo mantiene en la vertical si se suelta cerca
    asas = pg.locator('.tc-asa')
    revisar(asas.count() == 2, f'el cable elegido muestra sus 2 dobleces ({asas.count()})')
    caja = asas.nth(1).bounding_box()
    ax, ay = caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2
    pg.mouse.move(ax, ay)
    pg.mouse.down()
    pg.mouse.move(ax, ay - 40, steps=6)
    pg.mouse.up()
    puntos = cables()[0]['puntos']
    revisar(puntos[1][1] < -20.35, f'doblez arrastrado hacia arriba: {puntos[1]}')
    pg.screenshot(path=str(SALIDA / '8_doblez.png'))

    # Doble clic en el doblez: se quita
    caja = asas.nth(1).bounding_box()
    pg.mouse.dblclick(caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2)
    revisar(len(cables()[0]['puntos']) == 1, 'doble clic en un doblez lo quita')

    # Esc cancela un cable a medio dibujar; Supr quita el último doblez mientras se dibuja
    x5, y5 = centro('placa.5V')
    pg.mouse.click(x5, y5)
    pg.mouse.click(x5, y5 + 60)
    pg.mouse.click(x5 + 80, y5 + 60)
    n = pg.evaluate(f'{RAIZ}.querySelector(".tc-previa .tc-cable-linea").getAttribute("d").split(" Q").length - 1')
    revisar(n == 2, f'la vista previa muestra 2 dobleces ({n})')
    pg.keyboard.press('Delete')
    n = pg.evaluate(f'{RAIZ}.querySelector(".tc-previa .tc-cable-linea").getAttribute("d").split(" Q").length - 1')
    revisar(n == 1, f'Supr quita el último doblez mientras se dibuja ({n})')
    pg.keyboard.press('Escape')
    dibujando = pg.evaluate(f'!!{RAIZ}.querySelector(".tc-dibujando")')
    revisar(not dibujando and len(cables()) == 3, 'Esc cancela el cable a medio dibujar')

    # Color con las teclas mientras se dibuja: 6 = azul (código de colores). Las teclas no salen del lienzo.
    pg.evaluate('window._teclasFuera = []; document.addEventListener("keydown", e => window._teclasFuera.push(e.key))')
    xr1, yr1 = centro('r1.1')
    pg.mouse.click(x5, y5)
    pg.keyboard.press('6')
    trazo_azul = pg.evaluate(f'{RAIZ}.querySelector(".tc-previa .tc-cable-linea").getAttribute("stroke")')
    activa = pg.evaluate(f'{RAIZ}.querySelector(".tc-muestra.tc-activa").dataset.color')
    pg.mouse.click(xr1, yr1)
    nuevo = cables()[-1]
    revisar(trazo_azul == '#2f6fde' and activa == 'azul' and nuevo['color'] == 'azul' and nuevo['de'] == 'placa.5V',
            f'tecla 6 mientras se dibuja: el cable nuevo sale azul ({nuevo["color"]}), no rojo como pide la convención para 5V')
    pg.keyboard.press('Delete')
    fuera = pg.evaluate('window._teclasFuera')
    revisar(len(cables()) == 3 and fuera == [], f'Supr borra el cable y las teclas del lienzo no llegan a la página (Blockly): {fuera}')

    # Clic otra vez en el pin de salida: también cancela
    pg.mouse.click(x5, y5)
    pg.mouse.click(x5, y5)
    revisar(not pg.evaluate(f'!!{RAIZ}.querySelector(".tc-dibujando")'), 'clic en el mismo pin cancela el cable')

    # Cable repetido: aviso y no se agrega
    x13, y13 = centro('placa.D13')
    xr1, yr1 = centro('r1.1')
    pg.mouse.click(xr1, yr1)
    pg.mouse.click(x13, y13)
    aviso = pg.locator('.tc-ayuda').inner_text()
    revisar(len(cables()) == 3 and 'ya están unidos' in aviso, f'cable repetido: «{aviso}»')

    # Ver encendido (solo el dibujo; el circuito no cambia)
    antes = cables()
    caja = pg.locator('.tc-comp[data-id="led1"]').bounding_box()
    pg.mouse.click(caja['x'] + caja['width'] / 2, caja['y'] + 10)
    pg.get_by_label('Ver encendido').check()
    encendido = pg.evaluate(f'{RAIZ}.querySelector("wokwi-led").value')
    revisar(encendido is True and cables() == antes, 'Ver encendido prende el dibujo sin tocar el circuito')
    pg.locator('select[data-prop="color"]').select_option('verde')
    revisar(pg.evaluate(f'{RAIZ}.querySelector("wokwi-led").color') == 'green', 'cambiar el color del LED')
    pg.wait_for_timeout(150)
    pg.screenshot(path=str(SALIDA / '9_encendido.png'))

    # Zoom con la rueda y «Ver todo»
    escala = lambda: pg.evaluate(f'new DOMMatrix(getComputedStyle({RAIZ}.querySelector(".tc-mundo")).transform).a')
    e0 = escala()
    pg.mouse.move(500, 400)
    pg.mouse.wheel(0, -300)
    pg.wait_for_timeout(100)
    e1 = escala()
    revisar(e1 > e0, f'la rueda acerca: {e0:.2f} → {e1:.2f}')
    ver_todo = pg.get_by_role('button', name='Ver todo', exact=True)
    ver_todo.click()
    revisar(abs(escala() - e0) < 0.01, f'«Ver todo» vuelve a encuadrar ({escala():.2f})')

    # Mover la vista arrastrando el fondo (aquí, sobre la placa, que no se mueve)
    tx = lambda: pg.evaluate(f'new DOMMatrix(getComputedStyle({RAIZ}.querySelector(".tc-mundo")).transform).e')
    t0 = tx()
    pg.mouse.move(150, 650)
    pg.mouse.down()
    pg.mouse.move(250, 600, steps=5)
    pg.mouse.up()
    revisar(abs(tx() - t0 - 100) < 1, f'arrastrar el fondo mueve la vista ({t0:.0f} → {tx():.0f})')

    # Borrar el LED borra también sus cables
    ver_todo.click()
    caja = pg.locator('.tc-comp[data-id="led1"]').bounding_box()
    pg.mouse.click(caja['x'] + caja['width'] / 2, caja['y'] + 10)
    pg.keyboard.press('Delete')
    c = pg.evaluate('lienzo.circuito()')
    revisar([k['id'] for k in c['componentes']] == ['r1'] and len(c['cables']) == 1, 'borrar el LED quita también sus 2 cables')

    revisar(not errores, 'sin errores en la consola' + ('' if not errores else ': ' + ' | '.join(errores)))
    nav.close()

print('\n' + ('TODO BIEN' if not fallos else f'{len(fallos)} FALLAS'))
sys.exit(1 if fallos else 0)
