# SPDX-License-Identifier: Apache-2.0
# © 2026 SENA – TecnoAcademia Tolima
"""Orden de las piezas en el lienzo (LIENZO-002) en Chromium: «Traer adelante» y «Enviar atrás» en la ficha mueven
la pieza un solo puesto, los extremos no hacen nada, los cables y la protoboard no cambian de lugar, lo montado en la
placa no se mueve, y el orden se guarda con el circuito en la `capa` de cada pieza: al reabrir, en la imagen SVG y al
rehacer el dibujo. Es solo del dibujo (decisión de Efraín): `componentes` y la netlist de KiCad no cambian.
Ejecutar: python -I pruebas/probar_orden.py dist/prototipo.html pruebas/capturas
"""
import copy
import math
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright
sys.path.insert(0, str(Path(__file__).parent))  # python -I no agrega la carpeta de la prueba
from eventos_contrato import vigilar_eventos, revisar_eventos  # noqa: E402

sys.stdout.reconfigure(encoding='utf-8')
PAGINA = Path(sys.argv[1]).resolve().as_uri()
SALIDA = Path(sys.argv[2])
SALIDA.mkdir(parents=True, exist_ok=True)
RAIZ = 'document.querySelector("main .tecnocircuito").shadowRoot'
CLAVE = 'tecnocircuito-prototipo-0'
fallos = []
comprobaciones = 0

# Tres piezas encimadas a la derecha de la placa, la shield (montada) en medio de `componentes` y una resistencia sobre
# la protoboard. Sin `capa`, las piezas sueltas se apilan como antes: r1, led1, pot1, r2 (de abajo arriba).
CIRCUITO = {
    'formato': 1, 'placa': 'uno', 'cables': [],
    'protoboard': {'tipo': 'media', 'x': 400, 'y': 250},
    'componentes': [
        {'id': 'r1', 'tipo': 'resistencia', 'x': 420, 'y': 70, 'rot': 0, 'props': {'ohmios': 220, 'vatios': 0.25}},
        {'id': 'shield1', 'tipo': 'shield_l293d', 'x': 0, 'y': 0, 'rot': 0, 'props': {'puentePWR': True}},
        {'id': 'led1', 'tipo': 'led', 'x': 430, 'y': 40, 'rot': 0, 'props': {'color': 'rojo'}},
        {'id': 'pot1', 'tipo': 'potenciometro', 'x': 440, 'y': 50, 'rot': 0, 'props': {'ohmios': 10000, 'posicion': 0.5, 'modelo': '16mm'}},
        {'id': 'r2', 'tipo': 'resistencia', 'x': 470, 'y': 300, 'rot': 0, 'props': {'ohmios': 1000, 'vatios': 0.25}},
    ],
}
COMPONENTES = ['r1', 'shield1', 'led1', 'pot1', 'r2']  # el orden de `componentes` no cambia nunca
FECHA = '2026-10-29T00:00:00'  # la netlist lleva la fecha: fija, para compararla


def revisar(condicion, texto):
    global comprobaciones
    comprobaciones += 1
    print(('OK   ' if condicion else 'FALLA') + ' ' + texto)
    if not condicion:
        fallos.append(texto)


def pila_de(circuito):
    """Las piezas sueltas en el orden en que se apilan según su `capa` (la regla del contrato, sección 4)."""
    sueltas = [(k, n) for n, k in enumerate(circuito['componentes']) if k['tipo'] not in ('shield_l293d', 'shield_nano_io')]

    def capa(k):
        c = k.get('capa')
        return c if isinstance(c, int) and not isinstance(c, bool) and c >= 0 else math.inf
    return [k['id'] for k, n in sorted(sueltas, key=lambda x: (capa(x[0]), x[1]))]


with sync_playwright() as p:
    nav = p.chromium.launch()
    pg = nav.new_page(viewport={'width': 1366, 'height': 900})
    eventos_tc = vigilar_eventos(pg)
    errores = []
    pg.on('console', lambda m: errores.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: errores.append(f'pageerror: {e}'))

    def abrir(circuito):
        pg.evaluate('([clave, c]) => localStorage.setItem(clave, JSON.stringify(c))', [CLAVE, circuito])
        pg.reload()
        pg.wait_for_selector('.tc-pin[data-ref="r2.2"]', state='attached')
        pg.wait_for_timeout(400)

    def circuito():
        return pg.evaluate('lienzo.circuito()')

    def orden_datos():
        return [k['id'] for k in circuito()['componentes']]

    def pila():
        return pila_de(circuito())

    def guardado():
        return pg.evaluate(f'JSON.parse(localStorage.getItem("{CLAVE}"))')

    def orden_dibujo():
        return pg.evaluate(f'[...{RAIZ}.querySelector(".tc-capa-comp").children].map((d) => d.dataset.id)')

    def sueltas(orden):
        return [i for i in orden if i not in ('placa', 'shield1', 'protoboard')]

    def netlist():
        return pg.evaluate('(fecha) => lienzo.exportarNetlist({ nombre: "orden", fecha })', FECHA)

    def encima(a, b):
        """Cuál de las dos piezas se ve en un punto donde se tapan (None si no se tapan en ningún punto)."""
        return pg.evaluate(f'''([a, b]) => {{
          const sr = {RAIZ};
          const caja = (id) => sr.querySelector(`.tc-comp[data-id="${{id}}"]`).getBoundingClientRect();
          const ra = caja(a), rb = caja(b);
          const x0 = Math.max(ra.left, rb.left), x1 = Math.min(ra.right, rb.right);
          const y0 = Math.max(ra.top, rb.top), y1 = Math.min(ra.bottom, rb.bottom);
          for (let x = x0 + 1; x < x1; x += 2) for (let y = y0 + 1; y < y1; y += 2) {{
            const pilas = sr.elementsFromPoint(x, y).map((e) => e.closest('.tc-comp')).filter(Boolean).map((d) => d.dataset.id);
            if (pilas.includes(a) && pilas.includes(b)) return pilas.indexOf(a) < pilas.indexOf(b) ? a : b;
          }}
          return null;
        }}''', [a, b])

    def elegir(id_):
        """Clic en un punto de la pieza que se ve (no tapado por otra)."""
        punto = pg.evaluate(f'''(id) => {{
          const sr = {RAIZ};
          const r = sr.querySelector(`.tc-comp[data-id="${{id}}"]`).getBoundingClientRect();
          for (let x = r.left + 2; x < r.right; x += 2) for (let y = r.top + 2; y < r.bottom; y += 2) {{
            const e = sr.elementFromPoint(x, y);
            if (e && !e.closest('.tc-pin') && e.closest('.tc-comp')?.dataset.id === id) return [x, y];
          }}
          return null;
        }}''', id_)
        if not punto:
            raise RuntimeError(f'{id_} está tapada del todo')
        pg.mouse.click(*punto)
        pg.wait_for_timeout(80)

    def boton(accion):
        return pg.locator(f'.tc-ficha [data-accion="{accion}"]')

    def pulsar(accion):
        boton(accion).click()
        pg.wait_for_timeout(80)

    try:
        pg.goto(PAGINA)
        abrir(CIRCUITO)

        # 1. Sin `capa`, la pila sigue a `componentes`, como antes; la placa, la shield y la protoboard van debajo.
        dibujo = orden_dibujo()
        revisar(dibujo == ['placa', 'shield1', 'protoboard', 'r1', 'led1', 'pot1', 'r2'],
                f'sin capa, el dibujo sigue el orden de componentes, con la placa, la shield y la protoboard debajo: {dibujo}')
        revisar(encima('r1', 'led1') == 'led1' and encima('led1', 'pot1') == 'pot1' and encima('r1', 'pot1') == 'pot1',
                'las tres piezas se tapan y la última de componentes se ve encima')
        red_antes = netlist()

        # 2. Los botones están en la ficha de una pieza suelta; en la del medio, los dos encendidos.
        elegir('led1')
        revisar(boton('adelante').count() == 1 and boton('atras').count() == 1,
                'la ficha del LED trae «Traer adelante» y «Enviar atrás»')
        revisar(boton('adelante').count() == 1 and boton('adelante').is_enabled() and boton('atras').is_enabled()
                and boton('adelante').inner_text() == 'Traer adelante' and boton('atras').inner_text() == 'Enviar atrás',
                'en una pieza del medio, los dos botones están encendidos y con su nombre')
        eventos_antes = pg.evaluate('window.eventosTC.length')

        # 3. Traer adelante sube un solo puesto: led1 pasa sobre pot1, no sobre r2. `componentes` no cambia.
        pulsar('adelante')
        c = circuito()
        capas = {k['id']: k.get('capa') for k in c['componentes']}
        revisar(pila() == ['r1', 'pot1', 'led1', 'r2'] and orden_datos() == COMPONENTES,
                f'traer adelante sube led1 un solo puesto en la pila ({pila()}) y componentes no cambia ({orden_datos()})')
        revisar(capas == {'r1': 0, 'shield1': None, 'led1': 2, 'pot1': 1, 'r2': 3},
                f'cada pieza suelta queda con su capa y la shield sin ella: {capas}')
        revisar(sueltas(orden_dibujo()) == ['r1', 'pot1', 'led1', 'r2'] and encima('led1', 'pot1') == 'led1'
                and encima('r1', 'led1') == 'led1',
                f'el dibujo sigue la pila: led1 se ve sobre pot1 ({sueltas(orden_dibujo())})')
        revisar(pila_de(guardado()) == pila() and [k['id'] for k in guardado()['componentes']] == COMPONENTES,
                'el cambio de orden se avisa y la página guarda las capas')
        revisar(pg.evaluate(f'{RAIZ}.activeElement?.dataset.accion') == 'adelante',
                'el foco sigue en «Traer adelante» después del clic')

        # 4. Un clic más y queda arriba de todo: «Traer adelante» se apaga y no hace nada.
        pulsar('adelante')
        revisar(pila() == ['r1', 'pot1', 'r2', 'led1'] and boton('adelante').is_disabled() and boton('atras').is_enabled(),
                f'arriba de todo, «Traer adelante» queda apagado: {pila()}')
        revisar(pg.evaluate(f'{RAIZ}.activeElement?.dataset.accion') == 'atras',
                'con «Traer adelante» apagado, el foco pasa a «Enviar atrás»')
        boton('adelante').click(force=True)
        pg.wait_for_timeout(80)
        revisar(pila() == ['r1', 'pot1', 'r2', 'led1'], 'en el extremo de arriba, el clic no cambia nada')

        # 5. Enviar atrás, un puesto por clic, hasta el fondo de la pila.
        pasos = []
        for _ in range(3):
            pulsar('atras')
            pasos.append(pila())
        revisar(pasos == [['r1', 'pot1', 'led1', 'r2'], ['r1', 'led1', 'pot1', 'r2'], ['led1', 'r1', 'pot1', 'r2']],
                f'enviar atrás baja un puesto por clic: {pasos}')
        revisar(boton('atras').is_disabled() and boton('adelante').is_enabled(), 'debajo de todo, «Enviar atrás» queda apagado')
        boton('atras').click(force=True)
        pg.wait_for_timeout(80)
        revisar(pila() == ['led1', 'r1', 'pot1', 'r2'] and encima('r1', 'led1') == 'r1' and encima('led1', 'pot1') == 'pot1',
                'en el extremo de abajo, el clic no cambia nada y led1 se ve debajo de las otras')
        revisar(sueltas(orden_dibujo()) == ['led1', 'r1', 'pot1', 'r2'] and orden_dibujo()[:3] == ['placa', 'shield1', 'protoboard'],
                f'la placa, la shield y la protoboard siguen debajo de todo: {orden_dibujo()}')
        revisar(orden_datos() == COMPONENTES and netlist() == red_antes,
                'después de seis cambios de orden, componentes y la netlist de KiCad son los mismos')
        revisar(pg.evaluate('window.eventosTC.length') == eventos_antes,
                'cambiar el orden no emite eventos de registro (el contrato de eventos no cambia)')

        # 6. Lo montado en la placa y la protoboard no traen los botones.
        elegir('shield1')
        revisar(pg.evaluate(f'{RAIZ}.querySelector(".tc-ficha").hidden') is False and boton('adelante').count() == 0
                and boton('atras').count() == 0, 'la ficha de la shield (montada en la placa) no trae los botones')
        elegir('protoboard')
        revisar(boton('adelante').count() == 0 and boton('atras').count() == 0, 'la ficha de la protoboard no trae los botones')

        # 7. La protoboard nunca queda encima: r2, al fondo de la pila, sigue sobre ella.
        elegir('r2')
        for _ in range(3):
            pulsar('atras')
        revisar(pila() == ['r2', 'led1', 'r1', 'pot1'] and boton('atras').is_disabled(),
                f'r2 baja hasta el fondo de la pila: {pila()}')
        revisar(encima('r2', 'protoboard') == 'r2', 'aun en el fondo de la pila, r2 se ve sobre la protoboard')

        # 8. Los cables siempre van encima: un cable que pasa sobre led1, con led1 abajo y arriba de la pila.
        c = circuito()
        centro = pg.evaluate(f'''() => {{ const d = {RAIZ}.querySelector('.tc-comp[data-id="led1"]');
          return [parseFloat(d.style.left) + parseFloat(d.style.width) / 2, parseFloat(d.style.top) + parseFloat(d.style.height) / 2]; }}''')
        c['cables'] = [{'de': 'placa.D13', 'a': 'pot1.SIG', 'color': 'azul',
                        'puntos': [[centro[0] - 12, centro[1]], [centro[0] + 12, centro[1]]]}]
        abrir(c)

        def cable_encima():
            return pg.evaluate(f'''() => {{
              const sr = {RAIZ};
              const r = sr.querySelector('.tc-comp[data-id="led1"]').getBoundingClientRect();
              const pila = sr.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2);
              const cable = pila.findIndex((e) => e.closest('.tc-cables'));
              const pieza = pila.findIndex((e) => e.closest('.tc-comp'));
              return cable >= 0 && pieza >= 0 && cable < pieza;
            }}''')
        revisar(cable_encima(), 'el cable que pasa sobre led1 se ve encima con led1 abajo en la pila')
        elegir('led1')
        for _ in range(2):
            pulsar('adelante')
        revisar(pila()[-1] == 'led1' and cable_encima(), 'y sigue encima con led1 arriba de todo')

        # 9. Guardar y reabrir conserva el orden; la imagen SVG lo sigue.
        antes = pila()
        pg.reload()
        pg.wait_for_selector('.tc-pin[data-ref="r2.2"]', state='attached')
        pg.wait_for_timeout(400)
        revisar(pila() == antes == ['r2', 'r1', 'pot1', 'led1'] and orden_datos() == COMPONENTES,
                f'al reabrir, las capas conservan la pila ({pila()}) y componentes no cambia')
        revisar(sueltas(orden_dibujo()) == ['r2', 'r1', 'pot1', 'led1'] and encima('led1', 'pot1') == 'led1',
                f'y el dibujo también: {sueltas(orden_dibujo())}')
        revisar(circuito()['formato'] == 1, 'el formato del circuito sigue siendo 1')
        svg = pg.evaluate('lienzo.exportarSVG()')
        en_svg = sorted(['r2', 'r1', 'pot1', 'led1'], key=lambda i: svg.index(f'id="tc-{i}"'))
        revisar(en_svg == ['r2', 'r1', 'pot1', 'led1'] and svg.index('id="tc-placa"') < svg.index('id="tc-r2"'),
                f'la imagen SVG dibuja las piezas en el mismo orden ({en_svg})')
        revisar(svg.index('id="tc-led1"') < svg.index('stroke-width="4.8"'), 'en la imagen SVG, los cables van después de las piezas')

        # 10. Rehacer el dibujo (cambiar la potencia) no la manda arriba de la pila.
        elegir('r1')
        pg.locator('.tc-ficha select[data-prop="vatios"]').select_option('0.5')
        pg.wait_for_timeout(300)
        revisar(next(k for k in circuito()['componentes'] if k['id'] == 'r1')['props']['vatios'] == 0.5
                and sueltas(orden_dibujo()) == ['r2', 'r1', 'pot1', 'led1'],
                f'con el dibujo rehecho, r1 sigue en su puesto de la pila: {sueltas(orden_dibujo())}')

        # 11. Una pieza agregada después va encima, sin capa; al reabrir, sigue encima.
        pg.evaluate(f'{RAIZ}.querySelector(\'[data-accion="agregar"][data-tipo="led"]\').click()')
        pg.wait_for_timeout(300)
        nueva = [k for k in circuito()['componentes'] if k['id'] not in COMPONENTES]
        revisar(len(nueva) == 1 and 'capa' not in nueva[0] and sueltas(orden_dibujo())[-1] == nueva[0]['id']
                and pila()[-1] == nueva[0]['id'],
                f'una pieza agregada después va encima de todo, sin capa: {sueltas(orden_dibujo())}')
        pg.reload()
        pg.wait_for_selector('.tc-pin[data-ref="r2.2"]', state='attached')
        pg.wait_for_timeout(400)
        revisar(len(nueva) == 1 and sueltas(orden_dibujo()) == ['r2', 'r1', 'pot1', 'led1', nueva[0]['id']],
                f'y al reabrir sigue encima: {sueltas(orden_dibujo())}')

        # 12. Un circuito guardado con capas abre en ese orden; una capa inválida cuenta como si no estuviera.
        con_capas = copy.deepcopy(CIRCUITO)
        for k, capa in zip(con_capas['componentes'], [2, None, 'x', 0, 1.5]):
            if capa is not None:
                k['capa'] = capa
        abrir(con_capas)
        revisar(sueltas(orden_dibujo()) == ['pot1', 'r1', 'led1', 'r2'] and orden_datos() == COMPONENTES,
                f'pot1 (capa 0) y r1 (capa 2) abajo; led1 («x») y r2 (1.5), sin capa válida, encima: {sueltas(orden_dibujo())}')

        # 13. En solo lectura no hay botones.
        pg.screenshot(path=str(SALIDA / 'orden.png'))
        lectura = pg.evaluate('''async (c) => { document.querySelector('main').remove();
          const div = document.createElement('div'); div.style.cssText = 'position:fixed;left:0;top:0;width:1200px;height:800px';
          document.body.append(div); window.lectura = TecnoCircuito.crearLienzo(div, { circuito: c, soloLectura: true });
          await new Promise((r) => setTimeout(r, 400)); const sr = div.querySelector('.tecnocircuito').shadowRoot;
          return [...sr.querySelector('.tc-capa-comp').children].map((e) => e.dataset.id); }''', con_capas)
        revisar(sueltas(lectura) == ['pot1', 'r1', 'led1', 'r2'], f'en solo lectura, la pila sigue las capas: {lectura}')
        RAIZ = 'document.querySelector(".tecnocircuito").shadowRoot'
        elegir('pot1')
        revisar(pg.evaluate(f'{RAIZ}.querySelectorAll("[data-accion=adelante], [data-accion=atras]").length') == 0
                and orden_dibujo() == lectura, 'en solo lectura, un clic en la pieza no trae los botones ni cambia la pila')
        pg.evaluate('lectura.destruir()')
    except Exception as e:
        revisar(False, f'el recorrido no pudo completarse: {type(e).__name__}: {e}')
        pg.screenshot(path=str(SALIDA / 'orden_error.png'))
    finally:
        revisar_eventos(eventos_tc, revisar, 'orden')
        revisar(not errores, 'sin errores ni avisos de consola' + (': ' + ' | '.join(errores[:8]) if errores else ''))
        nav.close()

print(f'\n{comprobaciones} comprobaciones; ' + (f'{len(fallos)} FALLAS' if fallos else 'todo bien.'))
sys.exit(1 if fallos else 0)
