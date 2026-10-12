# SPDX-License-Identifier: Apache-2.0
# © 2026 SENA – TecnoAcademia Tolima
"""Enchufe directo (imán entre pines) en Chromium: el probador en el balance de la LiPo y un LED en D13/GND del Uno,
sin cables. Arrastrar con el mouse, vista previa en verde, mover en grupo, desenchufar, borrar, girar y guardar.
Ejecutar: python -I pruebas/probar_enchufe.py dist/prototipo.html pruebas/capturas
"""
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
comprobaciones = 0

# Sin cables: la batería, el probador girado 90° (sus pines quedan en vertical, como el balance) y un LED suelto.
CIRCUITO = {
    'formato': 1, 'placa': 'uno', 'protoboard': None, 'cables': [],
    'componentes': [
        {'id': 'bat1', 'tipo': 'bateria_lipo', 'x': 0, 'y': 280, 'rot': 0, 'props': {'carga': 'nominal'}},
        {'id': 'prob1', 'tipo': 'probador_lipo', 'x': 470, 'y': 60, 'rot': 90, 'props': {'umbral': 3.3}},
        {'id': 'led1', 'tipo': 'led', 'x': 330, 'y': 60, 'rot': 0, 'props': {'color': 'rojo'}},
    ],
}
BALANCE = {'NEG': 'bat1.BAL0', 'C1': 'bat1.BAL1', 'C2': 'bat1.BAL2'}


def revisar(condicion, texto):
    global comprobaciones
    comprobaciones += 1
    print(('OK   ' if condicion else 'FALLA') + ' ' + texto)
    if not condicion:
        fallos.append(texto)


with sync_playwright() as p:
    nav = p.chromium.launch()
    pg = nav.new_page(viewport={'width': 1366, 'height': 900})
    errores = []
    pg.on('console', lambda m: errores.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: errores.append(f'pageerror: {e}'))
    try:
        pg.goto(PAGINA)
        pg.evaluate('([clave, c]) => localStorage.setItem(clave, JSON.stringify(c))', [CLAVE, CIRCUITO])
        pg.reload()
        pg.wait_for_selector('.tc-pin[data-ref="prob1.NEG"]', state='attached')
        pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
        pg.wait_for_timeout(400)

        def centro(ref):
            caja = pg.locator(f'.tc-pin[data-ref="{ref}"]').bounding_box()
            return caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2

        def pieza(id_):
            return next((k for k in pg.evaluate('lienzo.circuito()')['componentes'] if k['id'] == id_), None)

        def cuerpo(id_):
            caja = pg.locator(f'.tc-comp[data-id="{id_}"]').bounding_box()
            return caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2

        def arrastrar(id_, dx, dy, antes_de_soltar=None):
            x, y = cuerpo(id_)
            pg.mouse.move(x, y)
            pg.mouse.down()
            pg.mouse.move(x + dx, y + dy, steps=12)
            visto = antes_de_soltar() if antes_de_soltar else None
            pg.mouse.up()
            pg.wait_for_timeout(100)
            return visto

        def enchufar(id_, pata, destino, corrimiento=(2.0, -1.5)):
            """Arrastra la pieza para que su pata caiga cerca (corrida) del pin de destino; el imán la alinea."""
            (px, py), (dx, dy) = centro(f'{id_}.{pata}'), centro(destino)
            verdes = lambda: sorted(pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-pin.tc-destino")].map(d => d.dataset.ref)'))
            return arrastrar(id_, dx - px + corrimiento[0], dy - py + corrimiento[1], verdes)

        def alineadas(pares):
            return all(abs(centro(a)[0] - centro(b)[0]) < 1 and abs(centro(a)[1] - centro(b)[1]) < 1 for a, b in pares)

        # ---- 1. El probador en el balance de la batería, sin cables
        verdes = enchufar('prob1', 'NEG', 'bat1.BAL0')
        pg.locator('main').screenshot(path=str(SALIDA / 'enchufe_1_probador.png'))
        revisar(verdes == sorted(BALANCE.values()), f'mientras se arrastra, los tres pines del balance se ven en verde: {verdes}')
        revisar(pieza('prob1').get('en') == BALANCE, f'al soltarlo queda enchufado: {pieza("prob1").get("en")}')
        revisar(alineadas([(f'prob1.{a}', b) for a, b in BALANCE.items()]), 'el imán corrigió el corrimiento: cada pata quedó justo sobre su pin')
        ocupados = pg.evaluate(f'[...{RAIZ}.querySelectorAll(".tc-pin.tc-ocupado")].map(d => d.dataset.ref).sort()')
        revisar(set(BALANCE.values()) <= set(ocupados), 'los pines del balance que reciben una pata quedan marcados (se cablea la pata, que está encima)')
        pg.mouse.move(*centro('prob1.C1'))
        pg.wait_for_timeout(150)
        tip = pg.evaluate(f'{RAIZ}.querySelector(".tc-tip").textContent')
        revisar('enchufada en bat1 · BAL1' in tip, f'el rótulo de la pata dice dónde está enchufada: «{tip}»')
        revisar('componente_cambiado' in pg.locator('#eventos').inner_text() and 'bat1.BAL0' in pg.locator('#eventos').inner_text(),
                'el evento componente_cambiado lleva el «en» con los pines (lo guarda el registro)')

        # ---- 2. Mover la batería se lleva el probador; mover el probador lo desenchufa
        antes = pieza('prob1')
        arrastrar('bat1', 60, 40)
        despues = pieza('prob1')
        revisar(despues.get('en') == BALANCE and (despues['x'], despues['y']) != (antes['x'], antes['y'])
                and alineadas([(f'prob1.{a}', b) for a, b in BALANCE.items()]),
                'al mover la batería, el probador enchufado se mueve con ella y sigue enchufado')
        arrastrar('prob1', 160, 0)
        revisar('en' not in pieza('prob1'), 'al alejar el probador se desenchufa (queda sin «en»)')

        # ---- 3. Borrar o girar la batería suelta lo que tenía enchufado
        enchufar('prob1', 'NEG', 'bat1.BAL0')
        revisar(pieza('prob1').get('en') == BALANCE, 'se vuelve a enchufar')
        x, y = cuerpo('bat1')
        pg.mouse.click(x, y)
        pg.keyboard.press('r')
        pg.wait_for_timeout(100)
        revisar('en' not in pieza('prob1'), 'al girar la batería, sus pines se mueven y el probador queda suelto')
        pg.keyboard.press('r'); pg.keyboard.press('r'); pg.keyboard.press('r')
        pg.wait_for_timeout(100)
        arrastrar('prob1', 120, 0)  # con la batería otra vez derecha, el probador quedó alineado pero suelto: se aleja
        enchufar('prob1', 'NEG', 'bat1.BAL0')
        revisar(pieza('prob1').get('en') == BALANCE, 'con la batería derecha, se enchufa otra vez')
        x, y = cuerpo('bat1')
        pg.mouse.click(x, y)
        pg.keyboard.press('Delete')
        pg.wait_for_timeout(100)
        revisar(pieza('bat1') is None and pieza('prob1') is not None and 'en' not in pieza('prob1'),
                'al borrar la batería, el probador queda suelto en su lugar')

        # ---- 4. Un LED con sus patas en D13 y GND del Uno (la placa de wokwi no tiene el paso exacto: el imán tolera)
        verdes = enchufar('led1', 'anodo', 'placa.D13', corrimiento=(1.5, 1.5))
        en_led = pieza('led1').get('en') or {}
        revisar(set(en_led.values()) == {'placa.D13', 'placa.GND1'} and en_led.get('anodo') == 'placa.D13',
                f'el LED queda enchufado en D13 (ánodo) y GND (cátodo): {en_led}')
        revisar(verdes == ['placa.D13', 'placa.GND1'], f'la vista previa marcó D13 y GND: {verdes}')
        pg.mouse.move(*centro('placa.D13'))
        pg.wait_for_timeout(150)
        tip = pg.evaluate(f'{RAIZ}.querySelector(".tc-tip").textContent')
        revisar('enchufada en D13 de Arduino Uno' in tip,
                f'sobre D13 se ve la pata del LED (está encima) y dice dónde va enchufada: «{tip}»')
        pg.locator('main').screenshot(path=str(SALIDA / 'enchufe_2_led_uno.png'))

        # ---- 5. Guardar y reabrir conserva los enchufes y las posiciones
        guardado = pg.evaluate('lienzo.circuito()')
        pg.reload()
        pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
        pg.wait_for_timeout(400)
        revisar(pg.evaluate('lienzo.circuito()') == guardado and alineadas([('led1.anodo', 'placa.D13')]),
                'recargar recupera el LED enchufado, en el mismo lugar')

        # ---- 6. Soltar lejos de todo no enchufa nada
        arrastrar('prob1', -40, 200)
        revisar('en' not in pieza('prob1'), 'soltado lejos de cualquier pin, el probador queda suelto')

        # ---- Revisión independiente (12 oct): casos que antes dejaban un «en» vigente sin que la pata estuviera encima.
        def pantalla(wx, wy):
            return pg.evaluate(f'''([wx, wy]) => {{
              const r = {RAIZ};
              const m = new DOMMatrix(getComputedStyle(r.querySelector('.tc-mundo')).transform);
              const a = r.querySelector('.tc-area').getBoundingClientRect();
              return [a.left + m.e + wx * m.a, a.top + m.f + wy * m.a];
            }}''', [wx, wy])

        def mundo(ref):
            x, y = centro(ref)
            return pg.evaluate(f'''([x, y]) => {{
              const r = {RAIZ};
              const m = new DOMMatrix(getComputedStyle(r.querySelector('.tc-mundo')).transform);
              const a = r.querySelector('.tc-area').getBoundingClientRect();
              return [(x - a.left - m.e) / m.a, (y - a.top - m.f) / m.a];
            }}''', [x, y])

        def cargar(circuito, esperar):
            pg.evaluate('([clave, c]) => localStorage.setItem(clave, JSON.stringify(c))', [CLAVE, circuito])
            pg.reload()
            pg.wait_for_selector(f'.tc-pin[data-ref="{esperar}"]', state='attached')
            pg.wait_for_timeout(400)

        # 7. Una pata en un pin (VIN) y la otra en un hueco: el imán conecta las dos (antes el hueco quedaba sin conectar).
        #    Después, la protoboard se lleva el LED: la pata de VIN se suelta (antes seguía unida a la distancia).
        mixto = {'formato': 1, 'placa': 'uno', 'cables': [], 'protoboard': {'tipo': 'media', 'x': 700, 'y': 450},
                 'componentes': [{'id': 'led2', 'tipo': 'led', 'x': 420, 'y': 90, 'rot': 0, 'props': {'color': 'rojo'}}]}
        cargar(mixto, 'protoboard.a1')
        vin, a1, cat, ano = mundo('placa.VIN'), mundo('protoboard.a1'), mundo('led2.catodo'), mundo('led2.anodo')
        mixto['protoboard'].update(x=round(vin[0] + ano[0] - cat[0] - (a1[0] - 700), 2), y=round(vin[1] + ano[1] - cat[1] - (a1[1] - 450), 2))
        cargar(mixto, 'protoboard.a1')
        enchufar('led2', 'catodo', 'placa.VIN')
        revisar(pieza('led2').get('en') == {'catodo': 'placa.VIN', 'anodo': 'protoboard.a1'},
                f'una pata en VIN y la otra sobre un hueco: quedan conectadas las dos ({pieza("led2").get("en")})')
        pb = pg.evaluate('lienzo.circuito().protoboard')
        x0, y0 = pantalla(pb['x'] + 150, pb['y'] + 92.6)  # el canal central: no hay huecos
        pg.mouse.move(x0, y0)
        pg.mouse.down()
        pg.mouse.move(x0 + 70, y0 + 60, steps=12)
        pg.mouse.up()
        pg.wait_for_timeout(100)
        ocupado = pg.evaluate(f'{RAIZ}.querySelector(\'.tc-pin[data-ref="placa.VIN"]\').classList.contains("tc-ocupado")')
        revisar(pieza('led2').get('en') == {'anodo': 'protoboard.a1'} and not ocupado,
                f'la protoboard se lleva el LED: la pata de VIN se suelta y VIN se puede volver a cablear ({pieza("led2").get("en")})')

        # 8. Cambiar una propiedad que mueve los pines (el lado del motor) suelta lo que quedó lejos.
        motor = {'formato': 1, 'placa': 'uno', 'cables': [], 'protoboard': None, 'componentes': [
            {'id': 'bat1', 'tipo': 'bateria_lipo', 'x': 0, 'y': 280, 'rot': 0, 'props': {'carga': 'nominal'}},
            {'id': 'mot1', 'tipo': 'motor_tt', 'x': 470, 'y': 40, 'rot': 0, 'props': {'vista': 'eje', 'lado': 'izquierdo'},
             'en': {'A': 'bat1.POS', 'B': 'bat1.NEG'}}]}
        cargar(motor, 'mot1.A')
        revisar(pieza('mot1').get('en') == {'A': 'bat1.POS', 'B': 'bat1.NEG'}, 'al abrir, el «en» del archivo manda (aunque el dibujo no esté encima)')
        x, y = cuerpo('mot1')
        pg.mouse.click(x, y)
        pg.locator('main .tc-ficha select[data-prop="lado"]').select_option('derecho')
        pg.wait_for_timeout(300)
        revisar('en' not in pieza('mot1'), 'al cambiar el lado del motor, sus pines se mueven y lo que quedó lejos se suelta')

        # 9. Al abrir: patas que la pieza no tiene, dos patas en un pin y alias del Nano se sueltan, con un aviso propio.
        resultado = pg.evaluate(r'''async () => {
          const abrir = async (placa, circuito) => {
            const d = document.createElement('div'); document.body.append(d);
            const l = TecnoCircuito.crearLienzo(d, { placa, circuito });
            await new Promise((r) => setTimeout(r, 300));
            const ayuda = d.querySelector('.tecnocircuito').shadowRoot.querySelector('.tc-ayuda').textContent;
            const c = l.circuito(); l.destruir(); d.remove();
            return { c, ayuda };
          };
          const led = (id, en) => ({ id, tipo: 'led', x: 0, y: 0, rot: 0, props: {}, en });
          const uno = await abrir('uno', { formato: 1, placa: 'uno', cables: [], protoboard: null, componentes: [
            led('l1', { patita: 'placa.D13' }), led('l2', { anodo: 'placa.D11' }), led('l3', { anodo: 'placa.D11' }), led('l4', { anodo: 'l4.catodo' })] });
          const nano = await abrir('nano', { formato: 1, placa: 'nano', cables: [], protoboard: null, componentes: [
            led('l5', { anodo: 'placa.SDA', catodo: 'placa.GND1' })] });
          return { uno, nano };
        }''')
        en_uno = {k['id']: k.get('en') for k in resultado['uno']['c']['componentes']}
        revisar(en_uno == {'l1': None, 'l2': {'anodo': 'placa.D11'}, 'l3': None, 'l4': None},
                f'al abrir se sueltan una pata inventada, la segunda pata en el mismo pin y una pieza enchufada en sí misma: {en_uno}')
        revisar(resultado['uno']['ayuda'] == 'Se soltaron 3 conexiones directas sin destino.',
                f'el aviso no culpa a la placa: «{resultado["uno"]["ayuda"]}»')
        en_nano = resultado['nano']['c']['componentes'][0].get('en')
        revisar(en_nano == {'catodo': 'placa.GND1'}, f'en el Nano, SDA es otro nombre de A4: una pata no se enchufa en el alias ({en_nano})')
    except Exception as e:
        revisar(False, f'el recorrido no pudo completarse: {type(e).__name__}: {e}')
        pg.screenshot(path=str(SALIDA / 'enchufe_error.png'))
    finally:
        revisar(not errores, 'sin errores ni avisos de consola' + (': ' + ' | '.join(errores[:8]) if errores else ''))
        nav.close()

print(f'\n{comprobaciones} comprobaciones; ' + (f'{len(fallos)} FALLAS' if fallos else 'todo bien.'))
sys.exit(1 if fallos else 0)
