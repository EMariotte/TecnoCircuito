"""Prueba las tareas T1 y T2 en Chromium: botón presionado con el mouse, entrada al aire y ruido del ADC."""
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


# Muestrea el LED del circuito cada 20 ms y cuenta cuántas veces cambia.
MUESTREO = f'''async (segundos) => {{
  const led = {RAIZ}.querySelector('wokwi-led');
  let cambios = 0, prendido = 0, muestras = 0, antes = led.value;
  const fin = performance.now() + segundos * 1000;
  while (performance.now() < fin) {{
    await new Promise(r => setTimeout(r, 20));
    muestras++; if (led.value) prendido++;
    if (led.value !== antes) {{ cambios++; antes = led.value; }}
  }}
  return {{ cambios, prendido: prendido / muestras }};
}}'''

with sync_playwright() as p:
    nav = p.chromium.launch()
    pg = nav.new_page(viewport={'width': 1366, 'height': 900})
    errores = []
    pg.on('console', lambda m: errores.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: errores.append(f'pageerror: {e}'))
    pg.goto(PAGINA)
    pg.evaluate('localStorage.clear()')
    pg.reload()

    def centro_de(selector):
        caja = pg.locator(selector).bounding_box()
        return caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2

    def led():
        return pg.evaluate(f'{RAIZ}.querySelector("wokwi-led").value')

    def fila(texto):
        return pg.evaluate('(t) => [...document.querySelectorAll("#mediciones tbody tr")].map(r => r.textContent).find(x => x.includes(t)) || ""', texto)

    # ---- T1: botón con pull-down
    pg.get_by_text('Ejemplo con botón (T1)').click()
    pg.wait_for_selector('.tc-pin[data-ref="btn1.1i"]', state='attached')
    pg.wait_for_timeout(300)
    revisar(pg.locator('#programa').input_value() == 'boton_pulldown', 'el ejemplo elige el programa del botón con pull-down')

    # Detenido, el botón se mueve como cualquier pieza
    bx, by = centro_de('.tc-comp[data-id="btn1"]')
    pg.mouse.move(bx, by)
    pg.mouse.down()
    pg.mouse.move(bx + 30, by, steps=5)
    pg.mouse.move(bx, by, steps=5)
    pg.mouse.up()
    revisar(pg.evaluate('lienzo.circuito().componentes.find(c => c.id === "btn1").x') == 330,
            'detenido, el botón se arrastra como cualquier pieza (y volvió a su lugar)')

    pg.locator('#iniciar').click()
    pg.wait_for_timeout(500)
    revisar(not led(), 'simulando, con el botón suelto el LED está apagado')
    revisar('lee BAJO' in fila('Pin 2'), f'la tabla dice que el pin 2 lee BAJO («{fila("Pin 2")}»)')

    bx, by = centro_de('.tc-comp[data-id="btn1"]')
    pg.mouse.move(bx, by)
    pg.mouse.down()
    pg.wait_for_timeout(300)
    presionado = {'led': led(), 'dibujo': pg.evaluate(f'{RAIZ}.querySelector("wokwi-pushbutton").pressed'), 'fila': fila('Pin 2')}
    pg.screenshot(path=str(SALIDA / 't1_presionado.png'))
    pg.mouse.up()
    pg.wait_for_timeout(300)
    revisar(presionado['led'] and presionado['dibujo'] and 'lee ALTO' in presionado['fila'],
            f'mantener presionado el botón con el mouse prende el LED (tabla: «{presionado["fila"]}»)')
    revisar(not led() and not pg.evaluate(f'{RAIZ}.querySelector("wokwi-pushbutton").pressed'), 'al soltarlo el LED se apaga y el botón sube')
    serial = pg.locator('#serial').inner_text()
    revisar('Presionado' in serial and 'Suelto' in serial, 'el monitor serial dice «Presionado» y «Suelto»')
    eventos = pg.evaluate('[...document.querySelectorAll("#eventos li")].map(li => li.textContent).filter(t => t.includes("boton_pulsado"))')
    revisar(len(eventos) == 1 and '"id":"btn1"' in eventos[0], f'queda el evento boton_pulsado con su duración: {eventos[:1]}')
    revisar(pg.evaluate('lienzo.circuito().componentes.find(c => c.id === "btn1").x') == 330, 'simulando, presionar el botón no lo mueve')

    # ---- T1: sin la pull-down, el pin 2 queda al aire
    def sin_pulldown(modo):
        c = pg.evaluate('lienzo.circuito()')
        c['componentes'] = [k for k in c['componentes'] if k['id'] != 'r2']
        c['cables'] = [k for k in c['cables'] if 'r2.' not in k['de'] and 'r2.' not in k['a']]
        pg.evaluate(f'localStorage.setItem("{CLAVE}", {json.dumps(json.dumps(c))})')
        pg.reload()
        pg.wait_for_selector('.tc-pin[data-ref="btn1.1i"]', state='attached')
        pg.wait_for_timeout(300)
        pg.locator('#programa').select_option('boton_pulldown')
        pg.locator('#modo').select_option(modo)
        pg.locator('#iniciar').click()
        pg.wait_for_timeout(400)
        return pg.evaluate(MUESTREO, 3)

    azar = sin_pulldown('realista')
    revisar(azar['cambios'] >= 8 and 0.15 < azar['prendido'] < 0.85,
            f'realista, sin pull-down: el LED se prende y se apaga solo ({azar["cambios"]} cambios en 3 s, prendido {azar["prendido"] * 100:.0f} %)')
    revisar('al aire' in fila('Pin 2'), f'la tabla dice que el pin 2 está al aire («{fila("Pin 2")}»)')
    pg.screenshot(path=str(SALIDA / 't1_al_aire.png'))
    quieto = sin_pulldown('ideal')
    revisar(quieto['cambios'] == 0 and quieto['prendido'] == 0, 'ideal, sin pull-down: el LED queda apagado y quieto')

    # ---- T2: ruido de analogRead()
    def lecturas(modo, segundos=2.5):
        pg.goto(PAGINA)
        pg.evaluate('localStorage.clear()')
        pg.reload()
        pg.get_by_text('Ejemplo con potenciómetro (T2)').click()
        pg.wait_for_selector('.tc-pin[data-ref="pot1.SIG"]', state='attached')
        pg.wait_for_timeout(300)
        pg.locator('#modo').select_option(modo)
        pg.locator('#iniciar').click()
        pg.wait_for_timeout(segundos * 1000)
        texto = pg.locator('#serial').inner_text()
        return [int(x) for x in texto.split()[1:-1] if x.isdigit()]  # sin la primera ni la última (pueden venir cortadas)

    ruido = lecturas('realista')
    limpio = lecturas('ideal')
    revisar(len(ruido) >= 15 and 1 < len(set(ruido)) and max(ruido) - min(ruido) <= 6,
            f'realista: la lectura del potenciómetro baila un poco ({len(ruido)} lecturas entre {min(ruido)} y {max(ruido)})')
    revisar(len(limpio) >= 15 and len(set(limpio)) == 1, f'ideal: la lectura no se mueve (siempre {limpio[0] if limpio else "?"})')

    revisar(not errores, 'sin errores en la consola' + ('' if not errores else ': ' + ' | '.join(errores)))
    nav.close()

print('\n' + ('TODO BIEN' if not fallos else f'{len(fallos)} FALLAS'))
sys.exit(1 if fallos else 0)
