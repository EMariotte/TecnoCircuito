"""Prueba el prototipo 1 en Chromium: avr8js ejecuta el .hex real y la regla de conexiones prende el LED."""
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


# Muestrea el LED cada 20 ms durante `segundos` y devuelve los intervalos entre cambios, en ms.
MUESTREO = f'''async (segundos) => {{
  const led = {RAIZ}.querySelector('wokwi-led');
  const placa = {RAIZ}.querySelector('wokwi-arduino-uno');
  const cambios = []; let previo = led.value; let prendido = 0, muestras = 0, l13 = 0;
  const fin = performance.now() + segundos * 1000;
  while (performance.now() < fin) {{
    await new Promise(r => setTimeout(r, 20));
    muestras++; if (led.value) prendido++; if (placa.led13) l13++;
    if (led.value !== previo) {{ cambios.push(performance.now()); previo = led.value; }}
  }}
  return {{ intervalos: cambios.slice(1).map((t, i) => t - cambios[i]), prendido: prendido / muestras, l13: l13 / muestras }};
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
    pg.get_by_text('Ver un ejemplo armado').click()
    pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
    pg.wait_for_timeout(300)

    api = pg.evaluate('({ v: TecnoCircuito.VERSION, s: typeof TecnoCircuito.crearSimulador })')
    revisar(api == {'v': '0.0.5-prototipo', 's': 'function'}, f'API con crearSimulador: {api}')

    # 1. Parpadeo en el pin 13 con el circuito bien armado
    pg.locator('#iniciar').click()
    r = pg.evaluate(MUESTREO, 3.2)
    medios = sorted(r['intervalos'])[1:-1] or r['intervalos']
    promedio = sum(medios) / len(medios) if medios else 0
    print(f'   intervalos (ms): {[round(x) for x in r["intervalos"]]}')
    revisar(len(r['intervalos']) >= 4, f'el LED cambia varias veces en 3 s ({len(r["intervalos"]) + 1} cambios)')
    revisar(abs(promedio - 500) <= 50, f'el LED cambia cada {promedio:.0f} ms (programa: 500 ms, tolerancia ±10 %)')
    revisar(0.35 <= r['prendido'] <= 0.65, f'prendido el {r["prendido"] * 100:.0f} % del tiempo')
    revisar(abs(r['l13'] - r['prendido']) < 0.1, 'el LED «L» de la placa sigue al pin 13')
    m = pg.evaluate('sim._medidas()')
    cuadros = m['msReales'] / 16.7
    revisar(m['evaluaciones'] <= 12,
            f'el circuito se evaluó {m["evaluaciones"]} veces en {m["msReales"] / 1000:.1f} s (unos {cuadros:.0f} cuadros): solo cuando cambió un pin')
    # Con el PC ocupado (por ejemplo, por esta misma prueba) la simulación puede ir algo más lenta: es lo esperado.
    revisar(0.90 <= m['msSimulados'] / m['msReales'] <= 1.05,
            f'reloj: {m["msSimulados"]:.0f} ms simulados en {m["msReales"]:.0f} ms reales (velocidad {m["velocidad"] * 100:.0f} %)')
    serial = pg.locator('#serial').inner_text()
    revisar(serial.startswith('Hola desde el Uno simulado') and 'Prendido' in serial and 'Apagado' in serial,
            f'monitor serial: {serial[:60]!r}…')
    pg.screenshot(path=str(SALIDA / 'sim_1_corriendo.png'))

    # 2. Cambiar el cableado mientras corre: sin el cable a GND, el LED no prende
    # Se elige el cable de GND por su tramo horizontal (y = −40 en el mundo) y se borra con Supr.
    x, y = pg.evaluate(f'''([wx, wy]) => {{
      const r = {RAIZ};
      const m = new DOMMatrix(getComputedStyle(r.querySelector('.tc-mundo')).transform);
      const a = r.querySelector('.tc-area').getBoundingClientRect();
      return [a.left + m.e + wx * m.a, a.top + m.f + wy * m.a];
    }}''', [250, -40])
    pg.mouse.click(x, y)
    pg.keyboard.press('Delete')
    quedan = [c['a'] for c in pg.evaluate('lienzo.circuito().cables')]
    pg.wait_for_timeout(150)  # la foto que ya venía del Worker todavía trae el LED prendido
    r = pg.evaluate(MUESTREO, 1.2)
    revisar('placa.GND1' not in quedan and r['prendido'] == 0, f'sin cable a GND el LED no prende (cables: {quedan})')
    revisar(r['l13'] > 0.3, 'el LED «L» de la placa sigue parpadeando: el programa no se detuvo')

    # 3. Cargar otro circuito reinicia la simulación
    pg.get_by_text('Ver un ejemplo armado').click()
    pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
    pg.wait_for_timeout(300)
    revisar(pg.evaluate('sim._medidas().estado') == 'detenido', 'al cambiar de circuito, la simulación vuelve a empezar detenida')

    # 4. Programa del pin 8 con el LED cableado al 13: no prende
    pg.locator('#programa').select_option('parpadeo8')
    pg.locator('#iniciar').click()
    r = pg.evaluate(MUESTREO, 1.5)
    serial = pg.locator('#serial').inner_text()
    revisar(r['prendido'] == 0 and serial.startswith('Parpadeo en el pin 8'),
            f'con el programa del pin 8 el LED (cableado al 13) no prende; serial: {serial.strip()!r}')

    # 5. Mover el cable del pin 13 al pin 8 mientras corre: ahora parpadea cada 200 ms
    pg.evaluate('''() => {
      const c = lienzo.circuito();
      c.cables[0].de = "placa.D8"; delete c.cables[0].puntos;
      localStorage.setItem("tecnocircuito-prototipo-0", JSON.stringify(c));
    }''')
    pg.reload()
    pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
    pg.wait_for_timeout(300)
    pg.locator('#programa').select_option('parpadeo8')
    pg.locator('#iniciar').click()
    r = pg.evaluate(MUESTREO, 2.0)
    medios = sorted(r['intervalos'])[1:-1] or r['intervalos']
    promedio = sum(medios) / len(medios) if medios else 0
    revisar(abs(promedio - 200) <= 30, f'cableado al pin 8: el LED cambia cada {promedio:.0f} ms (programa: 200 ms)')
    pg.screenshot(path=str(SALIDA / 'sim_2_pin8.png'))

    # 6. Pausar, reiniciar y detener
    pg.locator('#pausar').click()
    t0 = pg.evaluate('sim._medidas().msSimulados')
    pg.wait_for_timeout(400)
    revisar(pg.evaluate('sim._medidas().msSimulados') == t0, 'en pausa, el tiempo simulado no avanza')
    pg.locator('#iniciar').click()
    pg.wait_for_timeout(300)
    pg.locator('#reiniciar').click()
    revisar(pg.evaluate('sim._medidas().msSimulados') < 100, 'reiniciar vuelve el programa al principio')
    pg.locator('#detener').click()
    apagados = pg.evaluate(f'''() => {{
      const r = {RAIZ};
      return !r.querySelector('wokwi-led').value && !r.querySelector('wokwi-arduino-uno').ledPower;
    }}''')
    revisar(apagados, 'al detener, todo se apaga (también el LED ON de la placa)')
    eventos = pg.evaluate('[...document.querySelectorAll("#eventos b")].map(b => b.textContent)')
    revisar(eventos[:2] == ['simulacion_detenida', 'simulacion_iniciada'], f'eventos de la simulación: {eventos[:3]}')

    # 7. Un .hex dañado se rechaza con un mensaje claro
    msg = pg.evaluate('''() => { try { TecnoCircuito.crearSimulador({ lienzo, hex: ":1000000BAD\\n" }); return "aceptado"; }
                          catch (e) { return e.message; } }''')
    revisar('no es válido' in msg or 'dañado' in msg, f'.hex dañado: «{msg}»')

    revisar(not errores, 'sin errores en la consola' + ('' if not errores else ': ' + ' | '.join(errores)))
    nav.close()

print('\n' + ('TODO BIEN' if not fallos else f'{len(fallos)} FALLAS'))
sys.exit(1 if fallos else 0)
