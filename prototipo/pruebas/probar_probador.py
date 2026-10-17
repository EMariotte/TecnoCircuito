"""Prueba en Chromium el probador de celdas (pieza Tecno) en el cable de balance de la LiPo: la pantalla de 7 segmentos
repite el total, «2S», «-1-», la celda 1, «-2-» y la celda 2, y pita si una celda baja del umbral."""
import sys
import time
from pathlib import Path
from playwright.sync_api import sync_playwright
sys.path.insert(0, str(Path(__file__).parent))  # python -I no agrega la carpeta de la prueba
from eventos_contrato import vigilar_eventos, revisar_eventos  # noqa: E402

sys.stdout.reconfigure(encoding='utf-8')
PAGINA = Path(sys.argv[1]).resolve().as_uri()
SALIDA = Path(sys.argv[2])
SALIDA.mkdir(parents=True, exist_ok=True)
RAIZ = 'document.querySelector("main .tecnocircuito").shadowRoot'
fallos = []
# Segmentos encendidos → letra (los mismos de src/piezas/probador_lipo.js)
LETRAS = {'abcdef': '0', 'bc': '1', 'abdeg': '2', 'abcdg': '3', 'bcfg': '4', 'acdfg': '5', 'acdefg': '6', 'abc': '7',
          'abcdefg': '8', 'abcdfg': '9', 'g': '-', 'abcefg': 'A', 'adef': 'C', 'def': 'L', '': ' '}


def revisar(condicion, texto):
    print(('OK   ' if condicion else 'FALLA') + ' ' + texto)
    if not condicion:
        fallos.append(texto)


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
    pg.wait_for_timeout(500)

    def pantalla():
        """Lo que muestra el probador ahora, como texto («7.40», « 2S», «-1-»)."""
        segs = pg.evaluate(f'''[...{RAIZ}.querySelectorAll('[data-id="probador1"] [data-seg]')]
            .filter(s => s.getAttribute("fill") === "#ff3b30").map(s => s.dataset.seg)''')
        t = ''
        for i in range(3):
            letra = LETRAS.get(''.join(sorted(s[1] for s in segs if s[0] == str(i) and s[1] != 'p')), '?')
            t += ('5' if letra == '5' else letra) + ('.' if f'{i}p' in segs else '')
        return t

    pg.get_by_text('Probador de celdas (T3)').click()
    pg.wait_for_selector('.tc-pin[data-ref="probador1.C8"]', state='attached')
    pines = pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-pin")].map(p => p.dataset.ref).filter(r => r.startsWith("probador1."))')
    revisar(len(pines) == 9, f'el probador tiene 9 pines (− y 1 a 8): {len(pines)}')
    bal = pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-pin")].map(p => p.dataset.ref).filter(r => /bateria1\\.BAL/.test(r))')
    revisar(sorted(bal) == ['bateria1.BAL0', 'bateria1.BAL1', 'bateria1.BAL2'], f'la batería tiene los 3 pines del cable de balance: {bal}')
    revisar(pantalla() == '   ', f'sin simular, la pantalla está apagada («{pantalla()}»)')

    # Simular: la pantalla recorre la secuencia
    pg.click('#iniciar')
    pg.wait_for_function('() => window.sim && sim.medidas().msSimulados > 200', timeout=15000)
    vistos = set()
    fin = time.time() + 10
    while time.time() < fin:
        vistos.add(pantalla())
        pg.wait_for_timeout(120)
    esperados = {'ALL', '7.40', ' 25', '-1-', '3.70', '-2-'}
    revisar(esperados <= vistos, f'la pantalla repite «ALL», total, «2S», «-1-», celda y «-2-»: {sorted(vistos)}')
    pitido = pg.evaluate(f'{RAIZ}.querySelector(\'[data-id="probador1"] [data-pitido]\').getAttribute("visibility")')
    revisar(pitido == 'hidden', 'con la batería nominal no pita')
    fila = pg.evaluate('[...document.querySelectorAll("#mediciones tbody tr")].map(r => r.textContent).find(x => x.includes("probador1")) || ""')
    revisar('2S' in fila and '3,70' in fila, f'la tabla: «{fila}»')
    pg.locator('main').screenshot(path=str(SALIDA / 'probador_1_nominal.png'))

    # Desbalanceada y alarma en 3,5 V: pita por la celda 2 (3,45 V)
    pg.locator(f'.tc-comp[data-id="bateria1"]').click(position={'x': 100, 'y': 60})
    pg.locator('main select[data-prop="carga"]').select_option('desbalanceada')
    pg.locator(f'.tc-comp[data-id="probador1"]').click(position={'x': 100, 'y': 60})
    pg.locator('main select[data-prop="umbral"]').select_option('3.5')
    pg.wait_for_timeout(400)
    aviso = pg.wait_for_function('() => /pita: la celda 2/.test(document.getElementById("fallas").textContent)', timeout=10000)
    visto_pitido = False
    for _ in range(10):
        visto_pitido = visto_pitido or pg.evaluate(f'{RAIZ}.querySelector(\'[data-id="probador1"] [data-pitido]\').getAttribute("visibility")') == 'visible'
        pg.wait_for_timeout(60)
    revisar(bool(aviso) and visto_pitido, 'desbalanceada (3,95 y 3,45 V) con alarma en 3,5 V: pita y lo dice en las fallas')
    revisar('3,5 V' in pg.evaluate(f'{RAIZ}.querySelector(\'[data-id="probador1"] [data-umbral]\').textContent'), 'el dibujo dice «alarma 3,5 V»')
    pg.locator('main').screenshot(path=str(SALIDA / 'probador_2_alarma.png'))
    pg.click('#detener')
    pg.wait_for_timeout(300)
    revisar(pantalla() == '   ', 'al detener, la pantalla se apaga')
    revisar_eventos(eventos_tc, revisar, 'probador')
    revisar(not errores, 'sin errores en la consola' + (': ' + ' | '.join(errores[:3]) if errores else ''))
    nav.close()

print(f'\n{len(fallos)} FALLAS' if fallos else '\nTodo bien.')
sys.exit(1 if fallos else 0)
