"""Prueba el prototipo 3 en Chromium: el chip en un Web Worker, el promedio del PWM y el potenciómetro (T2)."""
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


# Última lectura completa del monitor serial (el último renglón puede venir a medias).
ULTIMA = '''() => { const r = document.getElementById('serial').textContent.split(/\\r?\\n/).slice(0, -1).filter(Boolean);
  return r.length ? Number(r[r.length - 1]) : null; }'''
POT = '() => lienzo.circuito().componentes.find(c => c.id === "pot1")'
# Muestrea el brillo del LED cada 20 ms durante `segundos`.
BRILLOS = f'''async (segundos) => {{
  const led = {RAIZ}.querySelector('wokwi-led');
  const b = []; const fin = performance.now() + segundos * 1000;
  while (performance.now() < fin) {{ await new Promise(r => setTimeout(r, 20)); b.push(led.value ? led.brightness : 0); }}
  return b;
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

    # 1. Ejemplo de la tarea T2: potenciómetro en A0 y LED en el pin 9
    pg.locator('#ejemploT2').click()
    pg.wait_for_selector('.tc-pin[data-ref="pot1.SIG"]', state='attached')
    pg.wait_for_timeout(300)
    revisar(pg.evaluate('document.getElementById("programa").value') == 'potenciometro', 'el ejemplo T2 elige el programa del potenciómetro')
    revisar(pg.evaluate('sim._medidas().hilo') == 'worker', 'el chip corre en un Web Worker')
    pg.locator('#iniciar').click()
    pg.wait_for_timeout(900)
    lectura = pg.evaluate(ULTIMA)
    revisar(lectura is not None and abs(lectura - 512) <= 3, f'con la perilla en la mitad, analogRead da {lectura} (≈ 512)')
    m = pg.evaluate('sim._mediciones()')
    util = (m.get('pwm') or {}).get('D9', 0)
    revisar(abs(util - (lectura // 4) / 255) < 0.01, f'el pin 9 tiene PWM al {util * 100:.0f} % (analogWrite {lectura // 4} de 255)')
    brillo = pg.evaluate(f'{RAIZ}.querySelector("wokwi-led").brightness')
    revisar(0.3 < brillo < 0.55, f'el LED brilla a medias: {brillo * 100:.0f} %')
    filas = pg.evaluate('[...document.querySelectorAll("#mediciones tbody tr")].map(t => t.textContent)')
    revisar(any('PWM' in f for f in filas) and any('perilla 50 %' in f for f in filas), 'la tabla muestra el PWM del pin 9 y la perilla del potenciómetro')
    pg.screenshot(path=str(SALIDA / 'p3_1_t2.png'))

    # 2. Girar la perilla con el mouse: cambia la lectura y la pieza no se mueve
    antes = pg.evaluate(POT)
    caja = pg.evaluate(f'''() => {{ const k = {RAIZ}.querySelector('wokwi-potentiometer').shadowRoot.querySelector('#knob').getBoundingClientRect();
      return {{ x: k.x, y: k.y, w: k.width, h: k.height }}; }}''')
    cx, cy = caja['x'] + caja['w'] / 2, caja['y'] + caja['h'] / 2
    pg.mouse.move(cx + caja['w'] * 0.3, cy - caja['h'] * 0.3)  # arriba a la derecha de la perilla
    pg.mouse.down()
    pg.mouse.move(cx + caja['w'] * 0.4, cy + caja['h'] * 0.1, steps=6)
    pg.mouse.move(cx + caja['w'] * 0.3, cy + caja['h'] * 0.35, steps=6)  # gira hacia la derecha (hacia VCC)
    pg.mouse.up()
    despues = pg.evaluate(POT)
    revisar(despues['x'] == antes['x'] and despues['y'] == antes['y'], 'girar la perilla no mueve el potenciómetro')
    revisar(despues['props']['posicion'] > antes['props']['posicion'] + 0.1,
            f"la perilla giró: de {antes['props']['posicion'] * 100:.0f} % a {despues['props']['posicion'] * 100:.0f} %")
    pg.wait_for_timeout(600)
    lectura2 = pg.evaluate(ULTIMA)
    esperada = round(despues['props']['posicion'] * 1024)
    revisar(lectura2 is not None and abs(lectura2 - min(1023, esperada)) <= 3, f'la lectura sigue a la perilla: {lectura2} (≈ {min(1023, esperada)})')
    seleccion = pg.evaluate(f'{RAIZ}.querySelector(".tc-sel").textContent')
    revisar('Potenciómetro' in seleccion, 'tocar la perilla también selecciona la pieza')

    # 3. Deslizador de la barra (para el teclado)
    pg.evaluate(f'''() => {{ const d = {RAIZ}.querySelector('[data-perilla]'); d.value = '20';
      d.dispatchEvent(new Event('input', {{ bubbles: true }})); }}''')
    pg.wait_for_timeout(600)
    lectura3 = pg.evaluate(ULTIMA)
    revisar(lectura3 is not None and abs(lectura3 - 205) <= 3, f'con el deslizador en 20 %, analogRead da {lectura3} (≈ 205)')
    dibujo = pg.evaluate(f'{RAIZ}.querySelector("wokwi-potentiometer").value')
    revisar(dibujo == 20, f'el dibujo de la perilla también gira: {dibujo}')
    pg.wait_for_timeout(500)
    eventos = pg.evaluate('[...document.querySelectorAll("#eventos li")].map(l => l.textContent).filter(t => t.includes("pot1") && t.includes("posicion"))')
    revisar(1 <= len(eventos) <= 3, f'el giro se anota como pocos eventos, no uno por grado ({len(eventos)})')
    pg.screenshot(path=str(SALIDA / 'p3_2_perilla.png'))

    # 4. Desvanecer: el brillo pasa por valores intermedios (PWM promediado), no solo prendido o apagado
    pg.locator('#programa').select_option('desvanecer9')
    pg.locator('#iniciar').click()
    b = pg.evaluate(BRILLOS, 2.5)
    intermedios = len([x for x in b if 0.1 < x < 0.7])
    revisar(max(b) > 0.7 and min(b) < 0.05, f'el brillo va de {min(b) * 100:.0f} % a {max(b) * 100:.0f} %')
    revisar(intermedios > len(b) * 0.4, f'el {intermedios * 100 // len(b)} % de las muestras son brillos intermedios')

    # 5. Con la página ocupada (como Blockly trabajando), el chip sigue al reloj en su hilo
    t0 = pg.evaluate('sim._medidas().msSimulados')
    pg.evaluate('() => { const fin = performance.now() + 1500; while (performance.now() < fin) {} }')
    pg.wait_for_timeout(300)
    t1 = pg.evaluate('sim._medidas().msSimulados')
    avance = t1 - t0
    vel = pg.evaluate('sim._medidas().velocidad')
    # Lo que se prueba es que la página bloqueada no frena el chip. Cuánto avanza depende de la velocidad del PC
    # (con batería, Windows la baja): por eso se compara con la velocidad que informa el mismo Worker.
    revisar(avance > 600, f'con la página bloqueada 1,5 s, el chip avanzó {avance:.0f} ms de 1800 (sin Worker serían unos 50 ms)')
    revisar(abs(avance / 1800 - vel) < 0.25, f'el avance concuerda con la velocidad que informa el Worker ({vel * 100:.0f} % en este PC ahora)')
    pg.locator('#detener').click()

    revisar(not errores, 'sin errores en la consola' + ('' if not errores else ': ' + ' | '.join(errores)))

    # 6. Sin Web Worker (navegador que no lo permite): el mismo código corre en la página
    pg2 = nav.new_page(viewport={'width': 1366, 'height': 900})
    errores2 = []
    pg2.on('pageerror', lambda e: errores2.append(f'pageerror: {e}'))
    pg2.add_init_script('delete window.Worker')
    pg2.goto(PAGINA)
    pg2.locator('#ejemploT2').click()
    pg2.wait_for_selector('.tc-pin[data-ref="pot1.SIG"]', state='attached')
    revisar(pg2.evaluate('sim._medidas().hilo') == 'pagina', 'sin Worker, la simulación corre en la página')
    pg2.locator('#iniciar').click()
    pg2.wait_for_timeout(900)
    lectura4 = pg2.evaluate(ULTIMA)
    revisar(lectura4 is not None and abs(lectura4 - 512) <= 3, f'y funciona igual: analogRead da {lectura4}')
    revisar(not errores2, 'sin errores en la página sin Worker' + ('' if not errores2 else ': ' + ' | '.join(errores2)))
    nav.close()

print(f'\n{len(fallos)} FALLAS' if fallos else '\nTodo bien.')
sys.exit(1 if fallos else 0)
