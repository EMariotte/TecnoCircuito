"""Prueba el prototipo 0 en Chromium: arma el circuito con clics reales y revisa los datos."""
import json
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
PAGINA = Path(sys.argv[1]).resolve().as_uri()
SALIDA = Path(sys.argv[2])
SALIDA.mkdir(parents=True, exist_ok=True)
fallos = []


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
    pg.wait_for_function('document.querySelectorAll("main .tecnocircuito").length === 1')
    pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
    pg.wait_for_timeout(300)
    pg.screenshot(path=str(SALIDA / '1_inicio.png'))

    api = pg.evaluate('({ v: TecnoCircuito.VERSION, c: TecnoCircuito.CONTRATO, p: TecnoCircuito.PLACAS })')
    revisar(api == {'v': '0.0.5-prototipo', 'c': 1, 'p': ['uno']}, f'API del contrato: {api}')
    pines = pg.locator('.tc-pin').count()
    revisar(pines == 31 + 2 + 2, f'pines dibujados: {pines} (31 de la placa + 2 + 2)')
    desfases = pg.evaluate('''() => [...document.querySelector("main .tecnocircuito").shadowRoot.querySelectorAll(".tc-comp")]
      .map(comp => {
        const a = comp.getBoundingClientRect(), b = comp.firstElementChild.shadowRoot.querySelector("svg").getBoundingClientRect();
        return [comp.dataset.id, Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y), Math.abs(b.width - a.width), Math.abs(b.height - a.height))];
      })''')
    revisar(all(d < 0.5 for _, d in desfases), f'cada dibujo ocupa justo su espacio (desfase máximo en px: {desfases})')

    def centro(ref):
        caja = pg.locator(f'.tc-pin[data-ref="{ref}"]').bounding_box()
        return caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2

    # El rótulo del pin
    x, y = centro('placa.D13')
    pg.mouse.move(x, y)
    pg.wait_for_timeout(100)
    rotulo = pg.locator('.tc-tip').inner_text()
    revisar(rotulo == 'Pin 13', f'rótulo al pasar por D13: «{rotulo}»')

    # Cable 1, con clic-clic y un doblez: D13 → arriba → pata 1 de la resistencia
    xd, yd = centro('placa.D13')
    xr, yr = centro('r1.1')
    pg.mouse.click(xd, yd)
    revisar(pg.evaluate('!!document.querySelector("main .tecnocircuito").shadowRoot.querySelector(".tc-dibujando")'), 'modo dibujar al hacer clic en un pin')
    pg.mouse.click(xd + 3, yr + 3)  # un poco corrido: el imán debe enderezarlo
    pg.mouse.click(xr, yr)

    # Cable 2, con clic-clic y un doblez: pata 2 → derecha → ánodo
    x2, y2 = centro('r1.2')
    xa, ya = centro('led1.anodo')
    pg.mouse.click(x2, y2)
    pg.mouse.click(xa - 2, y2 + 2)
    pg.mouse.click(xa, ya)

    # Cable 3, arrastrando de un pin al otro: cátodo → GND1 (sin dobleces)
    xc, yc = centro('led1.catodo')
    xg, yg = centro('placa.GND1')
    pg.mouse.move(xc, yc)
    pg.mouse.down()
    pg.mouse.move((xc + xg) / 2, (yc + yg) / 2, steps=6)
    pg.mouse.move(xg, yg, steps=6)
    pg.mouse.up()
    pg.wait_for_timeout(100)

    c = pg.evaluate('lienzo.circuito()')
    cables = [(k['de'], k['a'], k['color'], k.get('puntos')) for k in c['cables']]
    print('   cables:', json.dumps(cables))
    revisar(len(cables) == 3, '3 cables creados')
    revisar(cables[0][:2] == ('placa.D13', 'r1.1') and cables[0][3] == [[125, -20.35]], 'cable 1 con el doblez enderezado en (125, -20,35)')
    revisar(cables[1][:2] == ('r1.2', 'led1.anodo') and cables[1][3] == [[405, -20.35]], 'cable 2 con el doblez enderezado en (405, -20,35)')
    revisar(cables[2][:3] == ('led1.catodo', 'placa.GND1', 'negro'), 'cable 3 por arrastre, negro porque va a GND')
    revisar(cables[0][2] == 'verde', 'cable de señal verde por defecto')
    pg.screenshot(path=str(SALIDA / '2_cableado.png'))

    # Mover el LED: los cables lo siguen
    antes = pg.evaluate('document.querySelector("main .tecnocircuito").shadowRoot.querySelectorAll(".tc-cable-linea")[1].getAttribute("d")')
    caja = pg.locator('.tc-comp[data-id="led1"]').bounding_box()
    pg.mouse.move(caja['x'] + caja['width'] / 2, caja['y'] + 12)
    pg.mouse.down()
    pg.mouse.move(caja['x'] + caja['width'] / 2 + 60, caja['y'] + 12 - 30, steps=8)
    pg.mouse.up()
    despues = pg.evaluate('document.querySelector("main .tecnocircuito").shadowRoot.querySelectorAll(".tc-cable-linea")[1].getAttribute("d")')
    led = next(k for k in pg.evaluate('lienzo.circuito()')['componentes'] if k['id'] == 'led1')
    revisar(led['x'] != 380 and antes != despues, f'LED movido a ({led["x"]}, {led["y"]}) y el cable lo sigue')

    # Girar la resistencia con R
    caja = pg.locator('.tc-comp[data-id="r1"]').bounding_box()
    pg.mouse.click(caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2)
    pg.keyboard.press('r')
    r1 = next(k for k in pg.evaluate('lienzo.circuito()')['componentes'] if k['id'] == 'r1')
    revisar(r1['rot'] == 90, f'resistencia girada: rot = {r1["rot"]}')
    xr1, yr1 = centro('r1.1')
    xr2, yr2 = centro('r1.2')
    revisar(abs(xr1 - xr2) < 1 and yr2 > yr1, 'tras girar, las patas quedan una arriba de la otra')
    pg.screenshot(path=str(SALIDA / '3_movido_y_girado.png'))

    # Cambiar el valor y el color desde la barra
    pg.locator('select[data-prop="ohmios"]').select_option('1000')
    r1 = next(k for k in pg.evaluate('lienzo.circuito()')['componentes'] if k['id'] == 'r1')
    revisar(r1['props'] == {'ohmios': 1000}, f'valor de la resistencia: {r1["props"]}')

    # Seleccionar el cable 1 por la mitad de su tramo vertical (lejos del cable de GND) y borrarlo con Supr
    pg.mouse.click(xd, yd - 30)
    orden = pg.evaluate('[...document.querySelector("main .tecnocircuito").shadowRoot.querySelectorAll(".tc-muestra")].map(b => b.textContent + b.dataset.color)')
    revisar(orden == ['0negro', '1marron', '2rojo', '3naranja', '4amarillo', '5verde', '6azul', '7morado', '8gris', '9blanco'],
            f'al elegir un cable aparecen los 10 colores en el orden del código, con su número: {orden}')
    pg.locator('.tc-muestra[data-color="naranja"]').click()
    revisar(pg.evaluate('lienzo.circuito().cables[0].color') == 'naranja', 'cable 1 pasa a naranja con la muestra')
    pg.keyboard.press('2')
    revisar(pg.evaluate('lienzo.circuito().cables[0].color') == 'rojo', 'la tecla 2 lo pone rojo (código de colores)')
    pg.keyboard.press('3')
    pg.screenshot(path=str(SALIDA / '3b_cable_elegido.png'))
    pg.mouse.click(xd, yd - 30)
    pg.keyboard.press('Delete')
    revisar(len(pg.evaluate('lienzo.circuito().cables')) == 2, 'Supr borra el cable elegido')

    # Agregar un LED desde la barra
    pg.get_by_role('button', name='+ Agregar').click()
    pg.get_by_role('menuitem', name='LED', exact=True).click()
    ids = [k['id'] for k in pg.evaluate('lienzo.circuito()')['componentes']]
    revisar(ids == ['r1', 'led1', 'led2'], f'+ LED agrega led2: {ids}')

    eventos = pg.evaluate('[...document.querySelectorAll("#eventos b")].map(b => b.textContent).reverse()')
    print('   eventos:', eventos)
    esperado = ['cable_agregado', 'cable_agregado', 'cable_agregado', 'componente_cambiado', 'componente_cambiado',
                'componente_cambiado', 'cable_quitado', 'componente_agregado']
    revisar(eventos == esperado, 'eventos en el orden esperado')

    # El ejemplo armado y la persistencia al recargar
    pg.get_by_text('Ver un ejemplo armado').click()
    pg.wait_for_timeout(400)
    pg.screenshot(path=str(SALIDA / '4_ejemplo.png'))
    pg.reload()
    pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
    pg.wait_for_timeout(300)
    revisar(len(pg.evaluate('lienzo.circuito().cables')) == 3, 'al recargar, el circuito sigue ahí')

    # Una pieza desconocida se conserva al guardar
    pg.evaluate('''() => {
      const c = lienzo.circuito();
      c.componentes.push({ id: 'x1', tipo: 'motor_dc', x: -120, y: 40, rot: 0, props: { rpm: 200 } });
      c.campoNuevo = { a: 1 };
      localStorage.setItem('tecnocircuito-prototipo-0', JSON.stringify(c));
    }''')
    pg.reload()
    pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
    c = pg.evaluate('lienzo.circuito()')
    revisar(any(k['id'] == 'x1' and k['props'] == {'rpm': 200} for k in c['componentes']) and c.get('campoNuevo') == {'a': 1},
            'pieza desconocida y campo nuevo se conservan')
    pg.screenshot(path=str(SALIDA / '5_desconocida.png'))

    # Tema oscuro
    oscuro = nav.new_page(viewport={'width': 1366, 'height': 768}, color_scheme='dark')
    oscuro.goto(PAGINA)
    oscuro.evaluate('localStorage.clear()')
    oscuro.reload()
    oscuro.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
    oscuro.get_by_text('Ver un ejemplo armado').click()
    oscuro.wait_for_timeout(400)
    oscuro.screenshot(path=str(SALIDA / '6_oscuro.png'))

    # Celular (ancho de 390 px)
    cel = nav.new_page(viewport={'width': 390, 'height': 844})
    cel.goto(PAGINA)
    cel.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
    cel.wait_for_timeout(300)
    cel.screenshot(path=str(SALIDA / '7_celular.png'))
    ancho = cel.evaluate('document.documentElement.scrollWidth')
    revisar(ancho <= 390, f'sin desplazamiento horizontal en el celular (ancho {ancho})')

    revisar(not errores, 'sin errores en la consola' + ('' if not errores else ': ' + ' | '.join(errores)))
    nav.close()

print('\n' + ('TODO BIEN' if not fallos else f'{len(fallos)} FALLAS'))
sys.exit(1 if fallos else 0)
