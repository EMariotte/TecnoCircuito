"""Prueba el prototipo 2 en Chromium: el circuito eléctrico (MNA) con el chip corriendo."""
import json
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
PAGINA = Path(sys.argv[1]).resolve().as_uri()
SALIDA = Path(sys.argv[2])
SALIDA.mkdir(parents=True, exist_ok=True)
RAIZ = 'document.querySelector("main .tecnocircuito").shadowRoot'
CLAVE = 'tecnocircuito-prototipo-0'
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

    def abrir_con(circuito=None, programa='fijo13', modo='realista'):
        pg.goto(PAGINA)
        pg.evaluate('localStorage.clear()')
        if circuito:
            pg.evaluate(f'localStorage.setItem("{CLAVE}", {json.dumps(json.dumps(circuito))})')
        pg.reload()
        if not circuito:
            pg.get_by_text('Ver un ejemplo armado').click()
        pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
        pg.wait_for_timeout(300)
        pg.locator('#modo').select_option(modo)
        pg.locator('#programa').select_option(programa)
        pg.locator('#iniciar').click()
        pg.wait_for_timeout(400)

    def pieza(m, grupo, clave, valor):
        return next(x for x in m[grupo] if x[clave] == valor)

    # 1. Ejemplo armado con 220 Ω y el pin 13 fijo en ALTO: mismos valores que el motor en Node
    abrir_con()
    m = pg.evaluate('sim._mediciones()')
    led, r1, pin = pieza(m, 'leds', 'id', 'led1'), pieza(m, 'resistencias', 'id', 'r1'), pieza(m, 'pines', 'pin', 'D13')
    revisar(abs(led['i'] - 0.01250) < 0.0001 and abs(led['v'] - 1.938) < 0.005 and abs(pin['v'] - 4.688) < 0.005,
            f'220 Ω: LED {led["i"] * 1000:.2f} mA a {led["v"]:.3f} V, pin 13 a {pin["v"]:.3f} V (Node: 12,50 mA, 1,938 V, 4,688 V)')
    revisar(abs(r1['i'] - led['i']) < 1e-9, 'misma corriente en la resistencia y en el LED')
    brillo220 = pg.evaluate(f'{RAIZ}.querySelector("wokwi-led").brightness')
    revisar(0.7 < brillo220 <= 1, f'el LED brilla al {brillo220 * 100:.0f} %')
    filas = pg.locator('#mediciones tbody tr').count()
    revisar(filas == 3, f'la tabla de mediciones muestra pin, resistencia y LED ({filas} filas)')

    # 2. El rótulo de un pin dice su voltaje
    caja = pg.locator('.tc-pin[data-ref="r1.2"]').bounding_box()
    pg.mouse.move(caja['x'] + caja['width'] / 2 + 1, caja['y'] + caja['height'] / 2)
    pg.mouse.move(caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2)
    rotulo = pg.locator('.tc-tip').inner_text()
    revisar(rotulo.endswith('1,94 V'), f'rótulo de la pata 2 de la resistencia: «{rotulo}»')
    pg.screenshot(path=str(SALIDA / 'electrico_1_220.png'))

    # 3. Cambiar la resistencia a 1 kΩ con la simulación andando: baja la corriente y el brillo
    caja = pg.locator('.tc-comp[data-id="r1"]').bounding_box()
    pg.mouse.click(caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2)
    pg.locator('select[data-prop="ohmios"]').select_option('1000')
    pg.wait_for_timeout(200)
    led = pieza(pg.evaluate('sim._mediciones()'), 'leds', 'id', 'led1')
    brillo1k = pg.evaluate(f'{RAIZ}.querySelector("wokwi-led").brightness')
    revisar(abs(led['i'] - 0.00310) < 0.0001 and brillo1k < brillo220 / 2,
            f'1 kΩ: {led["i"] * 1000:.2f} mA (Node: 3,10 mA), brillo {brillo1k * 100:.0f} %')

    # 4. Sin resistencia: el LED se quema, el pin pasa su límite y salen los mensajes y los eventos
    sin_resistencia = {
        'formato': 1, 'placa': 'uno',
        'componentes': [{'id': 'led1', 'tipo': 'led', 'x': 380, 'y': -100, 'rot': 0, 'props': {'color': 'rojo'}}],
        'cables': [{'de': 'placa.D13', 'a': 'led1.anodo', 'color': 'verde', 'puntos': [[125, -20], [405, -20]]},
                   {'de': 'led1.catodo', 'a': 'placa.GND1', 'color': 'negro', 'puntos': [[395, -40], [115.5, -40]]}],
        'protoboard': None,
    }
    abrir_con(sin_resistencia)
    mensajes = pg.locator('#fallas li').all_inner_texts()
    print('   fallas:', mensajes)
    revisar(any('se quemó' in t for t in mensajes) and any('pin 13' in t for t in mensajes), 'avisa el LED quemado y el exceso de corriente del pin 13')
    quemado = pg.evaluate(f'''() => {{
      const r = {RAIZ};
      return r.querySelector('.tc-comp[data-id="led1"]').classList.contains('tc-quemado') && !r.querySelector('wokwi-led').value;
    }}''')
    revisar(quemado, 'el LED queda gris, con el rótulo «quemado» y apagado')
    led = pieza(pg.evaluate('sim._mediciones()'), 'leds', 'id', 'led1')
    revisar(led['quemado'] and led['i'] == 0, 'un LED quemado queda abierto: ya no pasa corriente')
    eventos = pg.evaluate('[...document.querySelectorAll("#eventos li")].map(li => li.textContent)')
    de_falla = [e for e in eventos if ' falla ' in e]
    revisar(len(de_falla) == 2 and 'led_quemado' in ' '.join(de_falla), f'eventos de falla: {de_falla}')
    pg.screenshot(path=str(SALIDA / 'electrico_2_quemado.png'))

    # 5. Detener y volver a iniciar: el LED vuelve nuevo y se quema otra vez
    pg.locator('#detener').click()
    revisar(not pg.evaluate(f'{RAIZ}.querySelector(".tc-quemado")'), 'al detener, el LED vuelve a verse normal')
    pg.locator('#iniciar').click()
    pg.wait_for_timeout(300)
    revisar(pg.locator('#fallas li').count() == 2, 'al iniciar otra vez, el LED se quema de nuevo')

    # 6. Modo ideal: el mismo circuito sin resistencia no da fallas y el LED brilla
    abrir_con(sin_resistencia, modo='ideal')
    led = pieza(pg.evaluate('sim._mediciones()'), 'leds', 'id', 'led1')
    revisar(pg.locator('#fallas li').count() == 0 and led['brillo'] == 1 and not led['quemado'],
            f'modo ideal: sin fallas y el LED prendido con {led["i"] * 1000:.0f} mA')

    revisar(not errores, 'sin errores en la consola' + ('' if not errores else ': ' + ' | '.join(errores)))
    nav.close()

print('\n' + ('TODO BIEN' if not fallos else f'{len(fallos)} FALLAS'))
sys.exit(1 if fallos else 0)
