# SPDX-License-Identifier: Apache-2.0
# © 2026 SENA – TecnoAcademia Tolima
"""La gráfica de mediciones en el tiempo (MED-002) en Chromium, en la página de prueba: la pestaña, la lista de chequeo,
el límite de 6 medidas y de 2 unidades, el dibujo con un eje por unidad, la ventana de 10 s, pausa, borrar, el CSV,
el reinicio al simular de nuevo y el evento grafica_vista (que cumple el esquema, sin valores). Sin errores de consola.
Ejecutar: python -I pruebas/probar_grafica.py dist/prototipo.html pruebas/capturas
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright
sys.path.insert(0, str(Path(__file__).parent))  # python -I no agrega la carpeta de la prueba
from eventos_contrato import vigilar_eventos, revisar_eventos  # noqa: E402

sys.stdout.reconfigure(encoding='utf-8')
PAGINA = Path(sys.argv[1]).resolve().as_uri()
SALIDA = Path(sys.argv[2])
SALIDA.mkdir(parents=True, exist_ok=True)
fallos = []
comprobaciones = 0


def revisar(condicion, texto):
    global comprobaciones
    comprobaciones += 1
    print(('OK   ' if condicion else 'FALLA') + ' ' + texto)
    if not condicion:
        fallos.append(texto)


with sync_playwright() as p:
    nav = p.chromium.launch()
    pg = nav.new_page(viewport={'width': 1366, 'height': 900}, accept_downloads=True)
    eventos_tc = vigilar_eventos(pg)
    errores = []
    pg.on('console', lambda m: errores.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: errores.append(f'pageerror: {e}'))

    estado = lambda: pg.evaluate('grafica.estado()')  # noqa: E731
    vistas = lambda: [e['datos']['medidas'] for e in eventos_tc if e.get('tipo') == 'grafica_vista']  # noqa: E731

    def marcar(medida, si=True):
        casilla = pg.locator(f'#grafica [data-medida="{medida}"]')
        casilla.click()
        pg.wait_for_timeout(80)
        return casilla.is_checked()

    def colores_en_lienzo(colores):
        """Cuántos píxeles del canvas tienen cada color (±30 por canal): la línea de esa medida se dibujó. Una sola
        lectura del canvas (varias seguidas hacen que Chromium avise en la consola)."""
        return pg.evaluate('''(lista) => {
          const c = document.querySelector('#grafica canvas'), g = c.getContext('2d');
          const d = g.getImageData(0, 0, c.width, c.height).data;
          return lista.map((hex) => {
            const [r, v, a] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
            let n = 0;
            for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 200 && Math.abs(d[i] - r) < 30 && Math.abs(d[i + 1] - v) < 30 && Math.abs(d[i + 2] - a) < 30) n++;
            return n;
          });
        }''', colores)

    pg.goto(PAGINA)
    pg.evaluate('localStorage.clear()')
    pg.reload()
    pg.get_by_text('Ejemplo con potenciómetro (T2)').click()
    pg.wait_for_timeout(500)

    # 1. La pestaña: al abrirla sale grafica_vista sin medidas; sin simular, la lista está vacía y lo dice
    revisar(pg.locator('#pestanaGrafica').is_visible() and pg.locator('#grafica').is_hidden(), 'Mediciones tiene dos pestañas: Tabla y Gráfica (cerrada)')
    pg.locator('#pestanaGrafica').click()
    pg.wait_for_timeout(200)
    revisar(pg.locator('#grafica').is_visible() and pg.locator('#panelTabla').is_hidden(), 'la pestaña Gráfica se abre y oculta la tabla')
    revisar(vistas() == [[]], f'al abrirla sale grafica_vista con la lista vacía ({vistas()})')
    revisar('Pulsa Simular' in pg.locator('#grafica .tc-graf-vacio').inner_text() and estado()['medidas'] == [], 'sin simular: no hay medidas y la gráfica lo dice')

    # 2. Simulando: la lista de chequeo con todo lo medible, con su valor actual; al final, la placa (pedido de Efraín del 1 nov)
    PLACA = ['placa_5V.voltaje', 'placa_5V.corriente', 'placa_3V3.voltaje', 'placa_3V3.corriente',
             'alimentacion.corriente', 'alimentacion.pico', 'alimentacion.fusible']
    pg.locator('#iniciar').click()
    pg.wait_for_timeout(800)
    e = estado()
    esperadas = ['D9.voltaje', 'D9.corriente', 'D9.pwm', 'pot1.voltaje', 'pot1.corriente', 'pot1.tramo_GND', 'r1.voltaje', 'r1.corriente',
                 'led1.voltaje', 'led1.corriente', 'led1.brillo'] + PLACA
    revisar(e['conectada'] and e['medidas'] == esperadas, f'la lista: {", ".join(e["medidas"])}')
    valor = pg.locator('#grafica [data-valor="pot1.tramo_GND"]').inner_text()
    revisar(valor == '5', f'cada medida muestra su valor actual (tramo del potenciómetro: {valor} kΩ)')

    # 3. Marcar: hasta 6 medidas y 2 unidades, cada una con su color
    for m in ['D9.voltaje', 'led1.corriente', 'pot1.voltaje']:
        marcar(m)
    revisar(not marcar('D9.pwm') and 'Dos unidades' in estado()['aviso'], f'una tercera unidad (%) no se marca: «{estado()["aviso"]}»')
    for m in ['r1.voltaje', 'led1.voltaje', 'r1.corriente']:
        marcar(m)
    e = estado()
    revisar(len(e['marcadas']) == 6 and len(set(e['colores'])) == 6, f'seis medidas marcadas, cada una con su color ({e["colores"]})')
    revisar(not marcar('D9.corriente') and 'Hasta 6' in estado()['aviso'] and len(estado()['marcadas']) == 6, f'la séptima no se marca: «{estado()["aviso"]}»')
    apagadas = pg.locator('#grafica .tc-graf-apagada').count()
    revisar(apagadas == len(esperadas) - 6, f'con seis marcadas, las que quedan sin marcar se ven apagadas ({apagadas})')
    marcar('r1.voltaje')
    marcar('led1.voltaje')
    marcar('r1.corriente')
    pg.wait_for_timeout(1800)
    revisar(vistas()[-1] == ['D9.voltaje', 'led1.corriente', 'pot1.voltaje'] and len(vistas()) <= 3,
            f'marcar y desmarcar seguidas deja un solo evento al final, con las marcadas en orden ({vistas()})')

    # 4. El dibujo: una línea por medida en su color, un eje a cada lado
    pg.wait_for_timeout(1500)
    e = estado()
    lineas = colores_en_lienzo(e['colores'])
    revisar(all(n > 30 for n in lineas), f'cada medida marcada tiene su línea en el canvas ({lineas} píxeles)')
    pg.locator('#grafica').screenshot(path=str(SALIDA / 'grafica_1.png'))

    # 5. Pausa: la gráfica se congela y el registro sigue guardando
    pg.locator('#grafica [data-grafica="pausa"]').click()
    antes = estado()
    pg.wait_for_timeout(800)
    despues = estado()
    revisar(despues['pausa'] and despues['muestras'] > antes['muestras'] and despues['ventana']['filas'] == antes['ventana']['filas'],
            f'en pausa la ventana no se mueve ({antes["ventana"]["filas"]} filas) y siguen llegando muestras ({antes["muestras"]} → {despues["muestras"]})')
    pg.locator('#grafica [data-grafica="pausa"]').click()
    pg.wait_for_timeout(300)
    revisar(not estado()['pausa'] and estado()['ventana']['filas'] > despues['ventana']['filas'], 'al seguir, la gráfica alcanza lo último')

    # 6. La ventana de 10 s: se llena sola y después avanza
    e = estado()
    revisar(e['ventana']['tIni'] == 0 and e['ventana']['tFin'] == 10000, f'antes de 10 s el eje va de 0 a 10 s ({e["ventana"]})')
    pg.wait_for_function('grafica.estado().ventana.tIni > 500', timeout=20000)
    e = estado()
    revisar(abs(e['ventana']['tFin'] - e['ventana']['tIni'] - 10000) < 1 and e['ventana']['tIni'] > 0,
            f'después de 10 s se ven los últimos 10 s ({e["ventana"]["tIni"] / 1000:.1f} a {e["ventana"]["tFin"] / 1000:.1f} s)')
    pg.locator('#grafica').screenshot(path=str(SALIDA / 'grafica_2_avanza.png'))

    # 7. El CSV: las medidas marcadas, para Excel en español
    with pg.expect_download() as descarga:
        pg.locator('#grafica [data-grafica="csv"]').click()
    muestras = estado()['muestras']
    texto = Path(descarga.value.path()).read_text(encoding='utf-8-sig')
    filas = texto.strip().split('\n')
    revisar(descarga.value.suggested_filename.endswith('.csv') and filas[0].strip() == 't_s;"Pin 9 · voltaje (V)";"led1 · corriente (mA)";"pot1 · voltaje (V)"',
            f'CSV: {descarga.value.suggested_filename}, encabezado {filas[0].strip()}')
    revisar(abs(len(filas) - 1 - muestras) <= 5 and all(',' in c for c in filas[-1].strip().split(';')[1:]),
            f'CSV: {len(filas) - 1} filas, una por muestra ({muestras} al bajarlo), con coma decimal: {filas[-1].strip()}')

    # 8. Borrar
    pg.locator('#grafica [data-grafica="borrar"]').click()
    pg.wait_for_timeout(100)
    revisar(estado()['muestras'] <= 3 and estado()['marcadas'] == ['D9.voltaje', 'led1.corriente', 'pot1.voltaje'], 'borrar vacía la gráfica y conserva las marcadas')

    # 9. Detener conserva lo que hay; simular de nuevo empieza de cero
    pg.wait_for_timeout(1000)
    pg.locator('#detener').click()
    pg.wait_for_timeout(400)
    detenida = estado()
    pg.wait_for_timeout(400)
    revisar(not detenida['conectada'] and detenida['muestras'] > 5 and estado()['muestras'] == detenida['muestras'],
            f'al detener deja de tomar muestras y conserva las {detenida["muestras"]}')
    pg.locator('#iniciar').click()
    pg.wait_for_timeout(300)
    e = estado()
    revisar(e['conectada'] and e['muestras'] < detenida['muestras'] and e['ventana']['tIni'] == 0 and e['marcadas'] == detenida['marcadas'],
            f'al simular de nuevo la gráfica empieza de cero ({e["muestras"]} muestras) con las mismas marcadas')

    # 10. Reiniciar (el reloj simulado vuelve a 0): la gráfica también empieza de cero
    pg.wait_for_timeout(1500)
    antes = estado()['muestras']
    pg.locator('#reiniciar').click()
    pg.wait_for_timeout(400)
    revisar(estado()['muestras'] < antes and estado()['ventana']['tIni'] == 0, f'Reiniciar: la gráfica vuelve a empezar ({antes} → {estado()["muestras"]})')

    # 11. Cerrar y abrir la pestaña: sale otra vez grafica_vista con lo marcado
    n = len(vistas())
    pg.locator('#pestanaTabla').click()
    pg.locator('#pestanaGrafica').click()
    pg.wait_for_timeout(200)
    revisar(len(vistas()) == n + 1 and vistas()[-1] == ['D9.voltaje', 'led1.corriente', 'pot1.voltaje'], 'al abrir otra vez la pestaña sale grafica_vista con lo marcado')

    # 11b. F01 (verificación de Codex, 1 nov): marcar y salir antes de 1,5 s no pierde la selección, y sale una sola vez
    tres = ['D9.voltaje', 'led1.corriente', 'pot1.voltaje']
    n = len(vistas())
    marcar('r1.voltaje')
    pg.locator('#pestanaTabla').click()
    pg.wait_for_timeout(100)
    revisar(len(vistas()) == n + 1 and vistas()[-1] == tres + ['r1.voltaje'],
            f'F01: marcar y volver a Tabla antes de 1,5 s deja la selección en el registro al instante ({vistas()[-1]})')
    pg.wait_for_timeout(1800)
    revisar(len(vistas()) == n + 1, 'F01: pasados 1,5 s no sale otro (sin duplicados)')
    pg.locator('#pestanaGrafica').click()  # sale el de abrir, con lo marcado
    pg.wait_for_timeout(200)
    n = len(vistas())
    marcar('r1.voltaje')
    marcar('r1.corriente')
    pg.evaluate('grafica.publicarPendiente()')
    revisar(len(vistas()) == n + 1 and vistas()[-1] == tres + ['r1.corriente'],
            f'F01: varios cambios seguidos y publicarPendiente(): uno solo, con la selección final ({vistas()[-1]})')
    pg.evaluate('grafica.publicarPendiente()')
    pg.wait_for_timeout(1800)
    revisar(len(vistas()) == n + 1, 'F01: publicarPendiente() sin nada pendiente no emite, y el temporizador ya no está')
    marcar('r1.corriente')
    marcar('r1.corriente')
    pg.locator('#pestanaTabla').click()
    pg.wait_for_timeout(100)
    revisar(len(vistas()) == n + 1, 'F01: si al salir la selección es la del último evento, no sale otro')
    pg.locator('#pestanaGrafica').click()
    pg.wait_for_timeout(200)
    marcar('r1.corriente')
    pg.wait_for_timeout(1800)
    revisar(estado()['marcadas'] == tres and vistas()[-1] == tres, 'quedándose en la pestaña, el evento sale 1,5 s después, como antes')
    pg.locator('#detener').click()
    pg.wait_for_timeout(300)

    # 12. Otro circuito (el ejemplo armado: pin 13, r1 y led1): la lista es la del circuito nuevo y de las marcadas
    #     quedan solo las que siguen existiendo (led1.corriente); el registro lo dice
    pg.locator('#ejemplo').click()
    pg.wait_for_timeout(500)
    pg.locator('#programa').select_option('fijo13')
    pg.locator('#iniciar').click()
    pg.wait_for_timeout(2400)
    e = estado()
    revisar(e['medidas'] == ['D13.voltaje', 'D13.corriente', 'D13.pwm', 'r1.voltaje', 'r1.corriente', 'led1.voltaje', 'led1.corriente', 'led1.brillo'] + PLACA
            and e['marcadas'] == ['led1.corriente'] and vistas()[-1] == ['led1.corriente'],
            f'con otro circuito, la lista es la nueva ({len(e["medidas"])} medidas) y de las marcadas queda led1.corriente ({vistas()[-1]})')
    pg.locator('#detener').click()
    pg.wait_for_timeout(300)

    # 13. Los eventos cumplen el esquema y no llevan valores
    revisar_eventos(eventos_tc, revisar, 'grafica')
    revisar(all(set(e['datos']) == {'medidas'} for e in eventos_tc if e.get('tipo') == 'grafica_vista'), 'grafica_vista solo lleva las medidas, sin valores ni tiempos')
    revisar(not errores, f'sin errores ni avisos en la consola ({len(errores)})')
    for e in errores[:5]:
        print('   ', e)
    nav.close()

print(f'\n{comprobaciones - len(fallos)}/{comprobaciones} comprobaciones OK')
sys.exit(1 if fallos else 0)
