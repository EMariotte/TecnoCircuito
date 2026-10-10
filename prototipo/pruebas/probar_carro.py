"""Prueba en Chromium las piezas Tecno de la T3 de potencia: shield L293D, motor TT y batería LiPo 2S.
Agregarlas con el menú, cambiar sus propiedades, la shield fija sobre el Uno y simular el carro con AFMotor_R4."""
import re
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
    pg.wait_for_timeout(500)

    def componentes():
        return pg.evaluate('lienzo.circuito()')['componentes']

    def de_tipo(tipo):
        return next((c for c in componentes() if c['tipo'] == tipo), None)

    def texto_de(id):
        return pg.evaluate(f'{RAIZ}.querySelector(\'[data-id="{id}"] svg\').textContent')

    def fila(texto):
        return pg.evaluate('(t) => [...document.querySelectorAll("#mediciones tbody tr")].map(r => r.textContent).find(x => x.includes(t)) || ""', texto)

    def agregar(nombre):
        pg.get_by_role('button', name='+ Agregar').click()
        pg.get_by_role('button', name=nombre, exact=True).click()
        pg.wait_for_timeout(300)

    # 1. La shield: va sobre el Uno, en (0, 0), con los nombres de sus tres integrados y sus 18 pines
    agregar('Shield L293D')
    sh = de_tipo('shield_l293d')
    revisar(sh is not None and sh['x'] == 0 and sh['y'] == 0 and sh['props'] == {'puentePWR': True}, f'«+ Agregar → Shield L293D» la monta sobre el Uno: {sh}')
    t = texto_de(sh['id'])
    revisar(t.count('L293D') >= 2 and '74HC595' in t, 'el dibujo tiene los nombres de los tres integrados: 74HC595 y dos L293D')
    pines = pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-pin")].map(p => p.dataset.ref).filter(r => r.startsWith("{sh["id"]}."))')
    revisar(len(pines) == 18, f'tiene 18 pines para cablear (bornes, EXT_PWR y servos): {len(pines)}')
    orden = pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-comp")].map(d => d.dataset.id)')
    revisar(orden.index(sh['id']) == orden.index('placa') + 1, f'se dibuja justo encima de la placa: {orden}')
    pg.get_by_role('button', name='+ Agregar').click()
    revisar(pg.get_by_role('button', name='Shield L293D', exact=True).is_disabled(), 'el menú no deja agregar una segunda shield')
    pg.get_by_role('button', name='+ Agregar').click()  # cierra el menú
    pg.locator(f'.tc-comp[data-id="{sh["id"]}"]').click(position={'x': 150, 'y': 110})
    revisar(pg.locator('main button[data-accion="girar"]').count() == 0, 'la shield no tiene «Girar»')
    # Arrastrarla no la mueve
    caja = pg.locator(f'.tc-comp[data-id="{sh["id"]}"]').bounding_box()
    pg.mouse.move(caja['x'] + caja['width'] * 0.5, caja['y'] + caja['height'] * 0.55)
    pg.mouse.down()
    pg.mouse.move(caja['x'] + caja['width'] * 0.5 + 80, caja['y'] + caja['height'] * 0.55 + 40, steps=5)
    pg.mouse.up()
    sh = de_tipo('shield_l293d')
    revisar(sh['x'] == 0 and sh['y'] == 0, 'arrastrarla no la mueve: sigue sobre el Uno')
    pg.locator(f'.tc-comp[data-id="{sh["id"]}"]').click(position={'x': caja['width'] * 0.5, 'y': caja['height'] * 0.55})
    pg.locator('main select[data-prop="puentePWR"]').select_option('false')
    pg.wait_for_timeout(200)
    revisar(de_tipo('shield_l293d')['props']['puentePWR'] is False, 'el campo «Puente PWR» guarda «quitado» (false, no el texto)')
    capuchon = pg.evaluate(f'!!{RAIZ}.querySelector(\'[data-id="{sh["id"]}"] [data-puente]\')')
    revisar(not capuchon, 'y el dibujo muestra los dos pines del puente sin su capuchón')
    pg.locator('main').screenshot(path=str(SALIDA / 'carro_1_shield.png'))

    # 2. El motor: dos vistas y dos lados; al cambiar la vista cambia el tamaño y los pines siguen ahí
    agregar('Motor TT')
    mo = de_tipo('motor_tt')
    revisar(mo['props'] == {'vista': 'eje', 'lado': 'izquierdo'}, f'«+ Agregar → Motor TT» lo agrega con la vista del eje: {mo["props"]}')
    antes = pg.locator(f'.tc-comp[data-id="{mo["id"]}"]').bounding_box()
    pg.locator('main select[data-prop="vista"]').select_option('rueda')
    pg.wait_for_timeout(300)
    despues = pg.locator(f'.tc-comp[data-id="{mo["id"]}"]').bounding_box()
    revisar(despues['height'] > antes['height'] * 1.8, f'con la rueda el dibujo crece ({antes["height"]:.0f} → {despues["height"]:.0f} px)')
    revisar(pg.locator('main select[data-prop="lado"]').count() == 1, 'después de rehacer el dibujo sigue seleccionado, con sus campos')
    pa = pg.evaluate(f'{RAIZ}.querySelector(\'.tc-pin[data-ref="{mo["id"]}.A"]\').getBoundingClientRect().x')
    pg.locator('main select[data-prop="lado"]').select_option('derecho')
    pg.wait_for_timeout(300)
    pb = pg.evaluate(f'{RAIZ}.querySelector(\'.tc-pin[data-ref="{mo["id"]}.A"]\').getBoundingClientRect().x')
    revisar(pb < pa - 100, 'del lado derecho el dibujo se refleja: los cables salen por la izquierda')
    revisar(len(pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-pin")].filter(p => p.dataset.ref.startsWith("{mo["id"]}."))')) == 2, 'rehacer el dibujo no deja pines repetidos')

    # 3. La batería: tres cargas
    agregar('Batería LiPo 2S')
    ba = de_tipo('bateria_lipo')
    revisar(ba['props'] == {'carga': 'nominal'} and '7,4 V' in texto_de(ba['id']), 'la batería aparece nominal (7,4 V)')
    pg.locator('main select[data-prop="carga"]').select_option('descargada')
    pg.wait_for_timeout(200)
    revisar('6,4 V' in texto_de(ba['id']), 'descargada, el dibujo dice 6,4 V')
    pg.locator('main').screenshot(path=str(SALIDA / 'carro_2_piezas.png'))

    # 4. El ejemplo del carro: los motores giran, la tabla los muestra y la rueda derecha va al revés
    pg.get_by_text('Carro con la shield L293D (T3)').click()
    pg.wait_for_selector('.tc-pin[data-ref="motor2.A"]', state='attached')
    revisar(pg.locator('#programa').input_value() == 'carro_motores', 'el ejemplo elige el programa del carro')
    pg.click('#iniciar')
    pg.wait_for_function('() => /adelante 200/.test(document.getElementById("serial").textContent)', timeout=15000)
    pg.wait_for_timeout(1200)
    m1 = fila('motor1 (M1)')
    m2 = fila('motor2 (M4)')
    revisar(re.search(r'1[5-9]\d RPM · adelante', m1) is not None, f'motor 1: «{m1}»')
    revisar(re.search(r'1[5-9]\d RPM · atrás', m2) is not None, f'motor 2, del lado derecho y cableado igual: va hacia atrás «{m2}»')
    vel = pg.evaluate(f'{RAIZ}.querySelector(\'[data-id="motor1"] [data-velocidad]\').textContent')
    revisar(vel.startswith('adelante'), f'debajo de la flecha de la rueda izquierda: «{vel}»')
    revisar('8,3' in fila('bateria1') or '8,4' in fila('bateria1'), f'batería: «{fila("bateria1")}»')
    revisar('VIN' in fila('motores (EXT_PWR)'), f'shield: «{fila("motores (EXT_PWR)")}»')
    pg.locator('main').screenshot(path=str(SALIDA / 'carro_3_simulando.png'))
    g1 = pg.evaluate(f'{RAIZ}.querySelector(\'[data-id="motor1"] [data-rueda]\').getAttribute("transform")')
    pg.wait_for_timeout(300)
    g2 = pg.evaluate(f'{RAIZ}.querySelector(\'[data-id="motor1"] [data-rueda]\').getAttribute("transform")')
    revisar(g1 != g2, 'la rueda gira en el dibujo')
    # La flecha apunta hacia donde la rueda, apoyada en el piso, empuja el robot: contra el reloj → a la izquierda.
    for mid in ('motor1', 'motor2'):
        a1 = pg.evaluate(f'{RAIZ}.querySelector(\'[data-id="{mid}"] [data-rueda]\').getAttribute("transform")')
        pg.wait_for_timeout(50)
        a2 = pg.evaluate(f'{RAIZ}.querySelector(\'[data-id="{mid}"] [data-rueda]\').getAttribute("transform")')
        delta = (float(re.match(r'rotate\((-?[\d.]+)', a2).group(1)) - float(re.match(r'rotate\((-?[\d.]+)', a1).group(1)) + 180) % 360 - 180
        reflejo = mid == 'motor2'  # el derecho está reflejado: en pantalla gira al revés
        contra_reloj = (delta < 0) != reflejo
        flecha = pg.evaluate(f'{RAIZ}.querySelector(\'[data-id="{mid}"] [data-flecha] path\').getAttribute("d")')
        izquierda = flecha.startswith('M40')
        revisar(delta != 0 and contra_reloj == izquierda, f'{mid}: la rueda gira {"contra el" if contra_reloj else "a favor del"} reloj y la flecha apunta a la {"izquierda" if izquierda else "derecha"}')
    pg.wait_for_function('() => /atras 255/.test(document.getElementById("serial").textContent)', timeout=15000)
    pg.wait_for_timeout(1200)
    m1 = fila('motor1 (M1)')
    revisar(re.search(r'2[0-4]\d RPM · atrás', m1) is not None, f'a 255 hacia atrás: «{m1}»')
    pg.click('#detener')
    revisar(not errores, 'sin errores en la consola' + (': ' + ' | '.join(errores[:3]) if errores else ''))
    nav.close()

print(f'\n{len(fallos)} FALLAS' if fallos else '\nTodo bien.')
sys.exit(1 if fallos else 0)
