"""Prueba en Chromium los eventos para el registro (contrato, sección 6.1).

Lo que hace un equipo: arma un LED sin resistencia, simula, se quema, detiene, arma el circuito con la resistencia y
simula otra vez; pausa, sigue, reinicia y detiene. Del registro tiene que salir esa historia: la corrida 1 con el LED
quemado, la corrida 2 sin fallas, con su circuito completo al empezar, y cada evento dentro del esquema.
"""
import json
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))  # python -I no agrega la carpeta de la prueba
from eventos_contrato import revisar_eventos  # noqa: E402

sys.stdout.reconfigure(encoding='utf-8')
PAGINA = Path(sys.argv[1]).resolve().as_uri()
SALIDA = Path(sys.argv[2])
SALIDA.mkdir(parents=True, exist_ok=True)
CLAVE = 'tecnocircuito-prototipo-0'
fallos = []


def revisar(condicion, texto):
    print(('OK   ' if condicion else 'FALLA') + ' ' + texto)
    if not condicion:
        fallos.append(texto)


SIN_RESISTENCIA = {
    'formato': 1, 'placa': 'uno',
    'componentes': [{'id': 'led1', 'tipo': 'led', 'x': 380, 'y': -100, 'rot': 0, 'props': {'color': 'rojo'}}],
    'cables': [{'de': 'placa.D13', 'a': 'led1.anodo', 'color': 'verde', 'puntos': [[125, -20], [405, -20]]},
               {'de': 'led1.catodo', 'a': 'placa.GND1', 'color': 'negro', 'puntos': [[395, -40], [115.5, -40]]}],
    'protoboard': None,
}

with sync_playwright() as p:
    nav = p.chromium.launch()
    pg = nav.new_page(viewport={'width': 1366, 'height': 900})
    errores = []
    pg.on('console', lambda m: errores.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: errores.append(f'pageerror: {e}'))

    pg.goto(PAGINA)
    pg.evaluate('localStorage.clear()')
    pg.evaluate(f'localStorage.setItem("{CLAVE}", {json.dumps(json.dumps(SIN_RESISTENCIA))})')
    pg.reload()
    pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
    pg.locator('#modo').select_option('realista')
    pg.locator('#programa').select_option('fijo13')
    pg.evaluate('window.eventosTC.length = 0')  # desde aquí: lo que haría el equipo

    # Corrida 1: el LED sin resistencia se quema
    pg.locator('#iniciar').click()
    pg.wait_for_function('document.querySelectorAll("#fallas li").length >= 2')
    pg.wait_for_timeout(200)
    pg.locator('#detener').click()

    # El equipo arma el circuito con la resistencia (un lienzo y un simulador nuevos, como en TecnoBloques)
    pg.locator('#ejemplo').click()
    pg.wait_for_selector('.tc-pin[data-ref="r1.1"]', state='attached')
    caja = pg.locator('.tc-comp[data-id="r1"]').bounding_box()
    pg.mouse.click(caja['x'] + caja['width'] / 2, caja['y'] + caja['height'] / 2)
    pg.locator('select[data-prop="ohmios"]').select_option('330')

    # Corrida 2: sin fallas; pausa, sigue, reinicia y detiene
    pg.locator('#iniciar').click()
    pg.wait_for_timeout(500)
    pg.locator('#pausar').click()
    pg.wait_for_timeout(300)
    # AUD-23: al seguir, la primera foto del turno nuevo dice dónde estaba el reloj del Worker. Si avanzó en la pausa,
    # se nota aquí; una foto de antes de pausar que llegó tarde, no (también es de antes de pausar).
    primera_al_seguir = pg.evaluate('''() => new Promise((listo) => {
      const antes = window.sim.medidas().msSimulados;
      document.querySelector('#iniciar').click();
      const desde = performance.now();
      const mirar = () => {
        const ms = window.sim.medidas().msSimulados;
        if (ms !== antes || performance.now() - desde > 2000) listo(ms); else setTimeout(mirar, 0);
      };
      mirar();
    })''')
    pg.wait_for_timeout(300)
    pg.locator('#reiniciar').click()
    pg.wait_for_timeout(300)
    pg.locator('#detener').click()
    # El cierre de la corrida sale cuando el Worker confirma que paró (AUD-03-V1): unos ms después del clic
    pg.wait_for_function('window.eventosTC.filter(e => e.tipo === "simulacion_detenida").length === 2', timeout=3000)

    eventos = revisar_eventos(pg, revisar, 'registro')
    sim = [e for e in eventos if e['origen'] == 'simulador']
    tipos_sim = [e['tipo'] for e in sim if e['tipo'] != 'falla']
    revisar(tipos_sim == ['simulacion_iniciada', 'simulacion_detenida', 'simulacion_iniciada', 'simulacion_pausada',
                          'simulacion_reanudada', 'reinicio_placa', 'simulacion_detenida'],
            f'la historia de la simulación, en orden: {tipos_sim}')
    revisar(all(e.get('v') == 1 for e in eventos), 'cada evento lleva «v»: 1, también los del lienzo')

    iniciadas = [e for e in sim if e['tipo'] == 'simulacion_iniciada']
    detenidas = [e for e in sim if e['tipo'] == 'simulacion_detenida']
    revisar([e['corrida'] for e in iniciadas] == [1, 2],
            f'la corrida sigue contando con un simulador nuevo: {[e["corrida"] for e in iniciadas]}')
    revisar(all(e['corrida'] == 1 for e in sim[:sim.index(detenidas[0]) + 1]) and all(e['corrida'] == 2 for e in sim[sim.index(iniciadas[1]):]),
            'cada evento del simulador lleva la corrida en la que pasó')

    # La corrida 1 tiene el LED quemado; la 2, ninguna falla: el equipo la corrigió
    f1 = {(f['tipo'], f['componente']) for f in detenidas[0]['datos']['fallas']}
    revisar(('led_quemado', 'led1') in f1 and len(f1) == len(detenidas[0]['datos']['fallas']),
            f'simulacion_detenida de la corrida 1 trae sus fallas, una vez cada una: {sorted(f1)}')
    fallas_1 = [e for e in sim if e['tipo'] == 'falla']
    revisar({(e['datos']['tipo'], e['datos']['componente']) for e in fallas_1} == f1 and all(e['corrida'] == 1 for e in fallas_1),
            'las fallas de la lista son las que se avisaron durante la corrida 1')
    revisar(all('mensaje' not in e['datos'] for e in fallas_1), 'las fallas van sin el mensaje en pantalla')
    revisar(detenidas[1]['datos']['fallas'] == [], 'simulacion_detenida de la corrida 2: sin fallas (se corrigió)')

    # Cada corrida se puede analizar sola: el circuito completo y la configuración van al empezar
    c1, c2 = iniciadas[0]['datos']['circuito'], iniciadas[1]['datos']['circuito']
    revisar([k['id'] for k in c1['componentes']] == ['led1'] and len(c1['cables']) == 2, 'la corrida 1 empezó con el LED solo')
    r1 = next((k for k in c2['componentes'] if k['id'] == 'r1'), None)
    revisar(r1 is not None and r1['props'].get('ohmios') == 330,
            f'la corrida 2 empezó con la resistencia de 330 Ω que eligió el equipo ({r1 and r1["props"]})')
    activas = iniciadas[1]['datos']['activas']
    revisar(iniciadas[1]['datos']['modo'] == 'realista' and len(activas) == 7 and all(activas.values()),
            f'modo realista: las 7 no idealidades encendidas ({", ".join(k for k, v in activas.items() if v)})')

    # El tiempo simulado: 0 al empezar, avanza, y el reinicio lleva el momento en que se pulsó
    revisar(all(e['ms_sim'] == 0 for e in iniciadas), 'simulacion_iniciada lleva ms_sim 0')
    pausada = next(e for e in sim if e['tipo'] == 'simulacion_pausada')
    reinicio = next(e for e in sim if e['tipo'] == 'reinicio_placa')
    revisar(pausada['ms_sim'] > 200 and reinicio['ms_sim'] > pausada['ms_sim'],
            f'el tiempo simulado avanza: pausa en {pausada["ms_sim"]} ms, reinicio en {reinicio["ms_sim"]} ms')
    reanudada = next(e for e in sim if e['tipo'] == 'simulacion_reanudada')
    # AUD-23: la reanudación lleva lo último que sabía la página, que puede ser más que al pausar si llegó tarde una foto
    # de antes de pausar (TC-4). Que el reloj no avanzó lo dice la primera foto del Worker al seguir: queda a lo sumo una
    # foto (16 ms) y una mirada más (16 ms) por delante de lo que se sabía; si hubiera avanzado en 300 ms de pausa, no.
    revisar(reanudada['ms_sim'] >= pausada['ms_sim'] and primera_al_seguir - reanudada['ms_sim'] <= 40
            and reanudada['t'] - pausada['t'] >= 250,
            f'la pausa duró {reanudada["t"] - pausada["t"]} ms reales y el reloj del simulador no avanzó: se sabía '
            f'{pausada["ms_sim"]} ms al pausar y {reanudada["ms_sim"]} al seguir, y su primera foto dice {round(primera_al_seguir)} ms')
    d2 = detenidas[1]
    revisar(d2['datos']['ms_sim'] == d2['ms_sim'] == d2['datos']['ms_simulados'] and d2['ms_sim'] < reinicio['ms_sim'],
            f'simulacion_detenida: ms_sim (y ms_simulados, el nombre de antes) cuenta desde el reinicio ({d2["ms_sim"]} ms)')

    # Los eventos del lienzo siguen sin corrida: pasan aunque nunca se simule
    cambio = [e for e in eventos if e['tipo'] == 'componente_cambiado' and e['datos'].get('props', {}).get('ohmios') == 330]
    revisar(len(cambio) == 1 and 'corrida' not in cambio[0], 'el cambio de la resistencia queda como evento del lienzo, sin corrida')

    revisar(not errores, 'sin errores en la consola' + ('' if not errores else ': ' + ' | '.join(errores)))
    nav.close()

print('\n' + ('TODO BIEN' if not fallos else f'{len(fallos)} FALLAS'))
sys.exit(1 if fallos else 0)
