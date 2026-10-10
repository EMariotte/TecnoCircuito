"""Prueba el servo (pieza Tecno, tarea T3) en Chromium: agregarlo, cambiar el modelo, la imagen SVG y simularlo."""
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


def angulo(transform):
    """El ángulo del brazo sale del rotate(-a …) que le pone el lienzo."""
    m = re.match(r'rotate\((-?[\d.]+)', transform or '')
    return -float(m.group(1)) if m else None


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

    def fila(texto):
        return pg.evaluate('(t) => [...document.querySelectorAll("#mediciones tbody tr")].map(r => r.textContent).find(x => x.includes(t)) || ""', texto)

    def brazos():
        return pg.evaluate(f'[...{RAIZ}.querySelectorAll("[data-brazo]")].map(g => g.getAttribute("transform"))')

    # Agregar un servo con el menú: aparece con sus 3 pines y el modelo SG90
    pg.get_by_role('button', name='+ Agregar').click()
    pg.get_by_role('button', name='Servo', exact=True).click()
    pg.wait_for_timeout(300)
    servo = next((c for c in pg.evaluate('lienzo.circuito()')['componentes'] if c['tipo'] == 'servo'), None)
    revisar(servo is not None and servo['props'] == {'modelo': 'sg90'}, f'«+ Agregar → Servo» agrega {servo and servo["id"]} con el modelo SG90')
    pines = pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-pin")].map(p => p.dataset.ref).filter(r => r.startsWith("{servo["id"]}."))')
    revisar(sorted(pines) == sorted([f'{servo["id"]}.GND', f'{servo["id"]}.VCC', f'{servo["id"]}.SIG']), f'tiene sus 3 pines para cablear: {pines}')
    textos = pg.evaluate(f'{RAIZ}.querySelector(\'[data-id="{servo["id"]}"] svg\').textContent')
    revisar('SG90' in textos, 'el dibujo dice SG90')

    # Cambiar el modelo a MG90S: el dibujo cambia (negro, con su nombre) y queda en el circuito
    pg.locator(f'{"main"} select[data-prop="modelo"]').select_option('mg90s')
    pg.wait_for_timeout(200)
    textos = pg.evaluate(f'{RAIZ}.querySelector(\'[data-id="{servo["id"]}"] svg\').textContent')
    modelo = next(c for c in pg.evaluate('lienzo.circuito()')['componentes'] if c['id'] == servo['id'])['props']['modelo']
    revisar('MG90S' in textos and modelo == 'mg90s', f'al elegir MG90S el dibujo cambia y el circuito guarda «{modelo}»')
    svg = pg.evaluate('lienzo.exportarSVG()')
    revisar('MG90S' in svg and 'data-brazo' in svg, 'la imagen SVG lleva el servo con su brazo')
    net = pg.evaluate('lienzo.exportarNetlist({})')
    revisar('(footprint "Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical")' in net and '(value "Servo MG90S")' in net,
            'la netlist de KiCad lleva el conector de 3 pines del servo')
    pg.locator('main').screenshot(path=str(SALIDA / 'servo_1_agregado.png'))

    # Simular el ejemplo: el brazo sigue al programa (0°, 90°, 180°) y la tabla muestra el consumo
    pg.get_by_text('Ejemplo con servo (T3)').click()
    pg.wait_for_selector('.tc-pin[data-ref="servo1.SIG"]', state='attached')
    revisar(pg.locator('#programa').input_value() == 'servo_barrido', 'el ejemplo elige el programa del barrido')
    revisar(angulo(brazos()[0]) == 90, f'antes de simular, el brazo está a 90° ({brazos()[0]})')
    pg.click('#iniciar')
    pg.wait_for_function('() => /0\\r?\\n90/.test(document.getElementById("serial").textContent)', timeout=15000)
    pg.wait_for_timeout(500)
    a90 = angulo(brazos()[0])
    revisar(a90 is not None and abs(a90 - 90) < 2, f'con write(90) el brazo queda a {a90}°')
    revisar('pulso 147' in fila('servo1') and 'mA' in fila('servo1'), f'la tabla muestra el servo: «{fila("servo1")}»')
    revisar('5V de la placa' in fila('5V de la placa'), f'y lo que entrega el 5V: «{fila("5V de la placa")}»')
    pg.wait_for_function('() => /90\\r?\\n180/.test(document.getElementById("serial").textContent)', timeout=15000)
    pg.wait_for_timeout(500)
    a180 = angulo(brazos()[0])
    revisar(a180 is not None and abs(a180 - 175) < 2, f'con write(180) el brazo queda a {a180}° (el SG90 del kit llega a 175°)')
    pg.locator('main').screenshot(path=str(SALIDA / 'servo_2_simulando.png'))
    pg.click('#detener')
    pg.wait_for_timeout(300)
    revisar(angulo(brazos()[0]) == 90, 'al detener, el dibujo vuelve a 90° (lo que se guarda no cambia)')

    # Seis servos en el USB (como un Otto): el 5V se hunde al arrancar y la placa se reinicia (con 4 no: medido)
    pg.get_by_text('Seis servos en el USB (T3)').click()
    pg.wait_for_selector('.tc-pin[data-ref="servo6.SIG"]', state='attached')
    pg.click('#iniciar')
    pg.wait_for_function('() => /Inicio/.test(document.getElementById("serial").textContent)', timeout=15000)
    maximo = 0
    for _ in range(30):
        pg.wait_for_timeout(100)
        m = re.search(r'pico ([\d.]+),(\d+) mA', fila('USB (placa y circuito)').replace('.', ''))
        if m:
            maximo = max(maximo, float(m.group(1) + '.' + m.group(2)))
    revisar(maximo > 1000, f'con los seis arrancando a la vez, el USB llega a un pico de {maximo:.0f} mA')
    aviso = pg.evaluate('document.getElementById("fallas").textContent')
    revisar('se reinició' in aviso and 'fuente aparte' in aviso, f'en modo realista la placa se reinicia y lo explica: «{aviso[:120]}…»')
    usb = fila('USB (placa y circuito)')
    revisar('reinicios' in usb, f'la tabla cuenta los reinicios: «{usb}»')
    eventos = pg.evaluate('[...document.querySelectorAll("#eventos li")].map(li => li.textContent)')
    revisar(any('reinicio_placa' in e and 'energia_usb' in e for e in eventos), 'los reinicios quedan en los eventos (reinicio_placa, motivo energia_usb)')
    pg.locator('main').screenshot(path=str(SALIDA / 'servo_3_cuatro.png'))
    pg.click('#detener')

    revisar(not errores, 'sin errores en la consola' + ('' if not errores else ': ' + ' | '.join(errores)))
    nav.close()

print('\n' + ('TODO BIEN' if not fallos else f'{len(fallos)} FALLAS'))
sys.exit(1 if fallos else 0)
