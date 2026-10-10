"""Prueba en Chromium la biblioteca de piezas («+ Agregar») y la ficha de la pieza elegida."""
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
    pg.get_by_text('Empezar de nuevo').click()
    pg.wait_for_timeout(300)

    def visibles():
        return pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-pieza")].filter(b => !b.hidden && b.offsetParent).map(b => b.getAttribute("aria-label"))')

    def buscar(texto):
        pg.locator('main .tc-buscar').fill(texto)
        pg.wait_for_timeout(100)
        return visibles()

    def componentes():
        return pg.evaluate('lienzo.circuito()')['componentes']

    # 1. El panel: categorías, piezas con su dibujo y el buscador con el foco
    pg.get_by_role('button', name='+ Agregar').click()
    pg.wait_for_timeout(400)
    cats = pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-bib-titulo")].map(t => t.textContent)')
    revisar(cats == ['Básicas', 'Entradas', 'Actuadores', 'Potencia y energía'], f'cuatro categorías: {cats}')
    todas = visibles()
    revisar(len(todas) == 9, f'nueve piezas: {todas}')
    minis = pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-pieza .tc-mini")].map(m => m.firstElementChild ? m.firstElementChild.tagName.toLowerCase() : "")')
    revisar(all(minis), f'cada pieza tiene su dibujo en chico: {minis}')
    revisar(pg.evaluate(f'{RAIZ}.activeElement && {RAIZ}.activeElement.classList.contains("tc-buscar")'), 'al abrir, el cursor queda en el buscador')
    pg.locator('main').screenshot(path=str(SALIDA / 'biblioteca_1_panel.png'))

    revisar(pg.evaluate(f'{RAIZ}.querySelector(".tc-ficha").hidden'), 'con el panel de piezas abierto, la ficha no tapa más el lienzo')

    # 2. El buscador: palabras del aula, sin importar tildes ni mayúsculas
    revisar(buscar('luz') == ['LED'], f'«luz» → {buscar("luz")}')
    revisar(buscar('pila') == ['Batería LiPo 2S'], f'«pila» → {buscar("pila")}')
    revisar(buscar('POTENCIOMETRO') == ['Potenciómetro'], f'«POTENCIOMETRO» (sin tilde) → {buscar("POTENCIOMETRO")}')
    m = buscar('motor')
    revisar('Motor TT' in m and 'Shield L293D' in m, f'«motor» → {m}')
    revisar(buscar('rueda carro') == ['Motor TT'], f'«rueda carro» (las dos palabras) → {buscar("rueda carro")}')
    buscar('xyz')
    vacio = pg.evaluate(f'{RAIZ}.querySelector(".tc-bib-vacio").textContent')
    revisar(visibles() == [] and 'xyz' in vacio, f'sin resultados lo dice: «{vacio}»')
    pg.locator('main').screenshot(path=str(SALIDA / 'biblioteca_2_buscar.png'))
    # Enter agrega la primera que quedó
    buscar('sg90')
    pg.locator('main .tc-buscar').press('Enter')
    pg.wait_for_timeout(300)
    servo = next((c for c in componentes() if c['tipo'] == 'servo'), None)
    revisar(servo is not None and pg.evaluate(f'{RAIZ}.querySelector(".tc-biblioteca").hidden'), 'Enter agrega la primera (el servo) y cierra el panel')

    # 3. Arrastrar desde el panel: la pieza queda centrada donde se soltó
    pg.get_by_role('button', name='+ Agregar').click()
    buscar('')
    led = pg.locator('main .tc-pieza[aria-label="LED"]').bounding_box()
    area = pg.locator('main .tc-area').bounding_box()
    destino = (area['x'] + area['width'] * 0.62, area['y'] + area['height'] * 0.7)
    ya = {c['id'] for c in componentes()}
    pg.mouse.move(led['x'] + 30, led['y'] + 20)
    pg.mouse.down()
    pg.mouse.move(led['x'] + 80, led['y'] + 40, steps=4)
    fantasma = pg.evaluate(f'!!{RAIZ}.querySelector(".tc-fantasma")')
    pg.mouse.move(*destino, steps=10)
    pg.mouse.up()
    pg.wait_for_timeout(400)
    leds = [c for c in componentes() if c['tipo'] == 'led' and c['id'] not in ya]  # el circuito inicial ya trae un LED
    caja = pg.locator(f'.tc-comp[data-id="{leds[0]["id"]}"]').bounding_box() if leds else None
    centro = (caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2) if caja else (0, 0)
    revisar(fantasma and len(leds) == 1 and abs(centro[0] - destino[0]) < 12 and abs(centro[1] - destino[1]) < 12,
            f'arrastrado al lienzo, el LED queda donde se soltó (centro a {abs(centro[0] - destino[0]):.0f} y {abs(centro[1] - destino[1]):.0f} px)')
    revisar(not pg.evaluate(f'!!{RAIZ}.querySelector(".tc-fantasma")'), 'y el fantasma desaparece')
    # Soltarlo sobre el mismo panel no agrega nada
    pg.get_by_role('button', name='+ Agregar').click()
    r1 = pg.locator('main .tc-pieza[aria-label="Resistencia"]').bounding_box()
    antes = len(componentes())
    pg.mouse.move(r1['x'] + 30, r1['y'] + 20)
    pg.mouse.down()
    pg.mouse.move(r1['x'] + 60, r1['y'] + 120, steps=6)
    pg.mouse.up()
    pg.wait_for_timeout(300)
    revisar(len(componentes()) == antes, 'soltada sobre el panel, no se agrega nada')
    pg.keyboard.press('Escape')
    pg.wait_for_timeout(100)
    revisar(pg.evaluate(f'{RAIZ}.querySelector(".tc-biblioteca").hidden'), 'Esc cierra el panel')

    # 4. La ficha: para qué sirve, sus propiedades, datos, pines y si está probada con la placa real
    pg.locator(f'.tc-comp[data-id="{servo["id"]}"]').click()
    pg.wait_for_timeout(200)
    texto = pg.evaluate(f'{RAIZ}.querySelector(".tc-ficha").textContent')
    revisar('Servo' in texto and '0° a 180°' in texto and 'Pines:' in texto and 'Probado con la placa real' in texto,
            'la ficha del servo SG90: para qué sirve, ángulo, pines y «✓ Probado con la placa real»')
    revisar(pg.locator('main .tc-ficha select[data-prop="modelo"]').count() == 1 and pg.locator('main .tc-barra select').count() == 0,
            'el modelo se elige en la ficha (la barra queda con el nombre, Girar y Borrar)')
    pg.locator('main .tc-ficha select[data-prop="modelo"]').select_option('mg90s')
    pg.wait_for_timeout(200)
    texto = pg.evaluate(f'{RAIZ}.querySelector(".tc-ficha").textContent')
    revisar('MG90S' in texto and 'Por probar con la placa real' in texto and '700 mA' in texto, 'con el MG90S la ficha cambia sus datos y avisa «◐ Por probar con la placa real»')
    pg.locator('main').screenshot(path=str(SALIDA / 'biblioteca_3_ficha.png'))
    # Va del lado contrario a la pieza
    lado = pg.evaluate(f'''(() => {{
        const f = {RAIZ}.querySelector(".tc-ficha").getBoundingClientRect();
        const p = {RAIZ}.querySelector('.tc-comp[data-id="{servo["id"]}"]').getBoundingClientRect();
        return {{ choca: !(f.right < p.left || p.right < f.left || f.bottom < p.top || p.bottom < f.top) }};
    }})()''')
    revisar(not lado['choca'], 'la ficha no tapa la pieza elegida')
    # Se pliega y sigue plegada al elegir otra pieza
    pg.get_by_role('button', name='Ficha de Servo: ocultar los detalles').click()
    pg.wait_for_timeout(100)
    plegada = pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-ficha-info")].every(x => x.hidden)')
    revisar(plegada and pg.locator('main .tc-ficha select[data-prop="modelo"]').is_visible(), 'plegada, la ficha oculta los detalles y deja a la vista el modelo')
    pg.locator(f'.tc-comp[data-id="{leds[0]["id"]}"]').click()
    pg.wait_for_timeout(100)
    revisar(pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-ficha-info")].every(x => x.hidden)') and 'LED' in pg.evaluate(f'{RAIZ}.querySelector(".tc-ficha-titulo").textContent'),
            'y sigue plegada al elegir el LED')
    pg.get_by_role('button', name='Ficha de LED: ver los detalles').click()
    pg.wait_for_timeout(100)
    texto = pg.evaluate(f'{RAIZ}.querySelector(".tc-ficha").textContent')
    revisar('150 Ω o más' in texto, 'la ficha del LED dice qué resistencia usar con 5 V (150 Ω o más)')
    # Sin nada elegido, no hay ficha
    pg.keyboard.press('Escape')
    pg.wait_for_timeout(100)
    revisar(pg.evaluate(f'{RAIZ}.querySelector(".tc-ficha").hidden'), 'sin nada elegido, la ficha se esconde')

    # 5. La protoboard también se arrastra desde el panel
    pg.get_by_role('button', name='+ Agregar').click()
    pb = pg.locator('main .tc-pieza[aria-label="Protoboard"]').bounding_box()
    pg.mouse.move(pb['x'] + 30, pb['y'] + 20)
    pg.mouse.down()
    pg.mouse.move(area['x'] + area['width'] * 0.45, area['y'] + area['height'] * 0.3, steps=10)
    pg.mouse.up()
    pg.wait_for_timeout(400)
    revisar(pg.evaluate('lienzo.circuito().protoboard') is not None, 'la protoboard se arrastra y queda en el lienzo')
    texto = pg.evaluate(f'{RAIZ}.querySelector(".tc-ficha").textContent')
    revisar('400' in texto and 'Probado' not in texto, 'su ficha explica las tiras (sin aviso de validación: no tiene modelo eléctrico)')
    pg.locator('main').screenshot(path=str(SALIDA / 'biblioteca_4_protoboard.png'))

    revisar(not errores, 'sin errores en la consola' + (': ' + ' | '.join(errores[:3]) if errores else ''))
    nav.close()

print(f'\n{len(fallos)} FALLAS' if fallos else '\nTodo bien.')
sys.exit(1 if fallos else 0)
