# SPDX-License-Identifier: Apache-2.0
# © 2026 SENA – TecnoAcademia Tolima
"""Recorrido Nano clásico + expansión: interfaz, Worker, persistencia, SVG y KiCad.

Usa el HEX nano_adc67 compilado con Arduino CLI que contiene la página construida.
Las lecturas ideales comprueban software; este recorrido no valida el hardware.
Ejecutar: python -I pruebas/probar_nano_ui.py dist/prototipo.html pruebas/capturas
"""
import base64
import json
import re
import sys
from pathlib import Path

from playwright.sync_api import TimeoutError as TimeoutPlaywright, sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
PAGINA = Path(sys.argv[1]).resolve().as_uri()
SALIDA = Path(sys.argv[2])
SALIDA.mkdir(parents=True, exist_ok=True)
RAIZ = 'document.querySelector("main .tecnocircuito").shadowRoot'
CLAVE = 'tecnocircuito-prototipo-0'
fallos = []
comprobaciones = 0

# Se descarta el último renglón incompleto y se admiten CR/CR/LF del USART.
ULTIMA = r'''() => {
  const filas = document.getElementById('serial').textContent.split('\n').slice(0, -1);
  const pares = filas.map(f => /^(\d+),(\d+)$/.exec(f.trim())).filter(Boolean);
  return pares.length ? pares.at(-1).slice(1).map(Number) : null;
}'''
ESPERAR_ADC = r'''([a, b]) => {
  const filas = document.getElementById('serial').textContent.split('\n').slice(0, -1);
  const pares = filas.map(f => /^(\d+),(\d+)$/.exec(f.trim())).filter(Boolean);
  if (!pares.length) return false;
  const ultima = pares.at(-1).slice(1).map(Number);
  return Math.abs(ultima[0] - a) <= 2 && Math.abs(ultima[1] - b) <= 2;
}'''


def revisar(condicion, texto):
    global comprobaciones
    comprobaciones += 1
    print(('OK   ' if condicion else 'FALLA') + ' ' + texto)
    if not condicion:
        fallos.append(texto)


def sexpr(texto):
    """Lee la netlist sin depender de espacios, referencias o fecha del exportador."""
    pila = [[]]
    for token in re.findall(r'"(?:\\.|[^"\\])*"|[()]|[^()\s]+', texto):
        if token == '(':
            nuevo = []
            pila[-1].append(nuevo)
            pila.append(nuevo)
        elif token == ')':
            if len(pila) == 1:
                raise ValueError('Paréntesis sobrante en la netlist')
            pila.pop()
        else:
            pila[-1].append(json.loads(token) if token.startswith('"') else token)
    if len(pila) != 1 or len(pila[0]) != 1:
        raise ValueError('La netlist está incompleta')
    return pila[0][0]


def campo(nodo, nombre, defecto=None):
    return next((n for n in nodo[1:] if isinstance(n, list) and n and n[0] == nombre), defecto)


def valor(nodo, nombre, defecto=None):
    n = campo(nodo, nombre)
    return n[1] if n and len(n) > 1 else defecto


def revisar_netlist(texto):
    net = sexpr(texto)
    componentes = campo(net, 'components')[1:]
    por_id = {}
    for c in componentes:
        p = next((n for n in c[1:] if isinstance(n, list) and n[0] == 'property'
                  and valor(n, 'name') == 'TecnoCircuito'), None)
        if p:
            por_id[valor(p, 'value')] = c
    modulo = por_id.get('placa', [])
    revisar(valor(modulo, 'footprint') == 'Module:Arduino_Nano', 'KiCad usa el módulo montable Module:Arduino_Nano')
    revisar(sum(valor(c, 'footprint') == 'Module:Arduino_Nano' for c in componentes) == 1,
            'KiCad exporta un solo módulo Nano')
    revisar(not any('PinSocket_1x08' in (valor(c, 'footprint', '')) or 'PinSocket_1x10' in (valor(c, 'footprint', ''))
                    for c in componentes), 'KiCad no sustituye el Nano por los headers del Uno')
    requeridos = {'REG_5V', 'REG_3V3', 'FILTRO_JACK', 'FILTRO_5V', 'FILTRO_3V3',
                  'DESACOPLE_JACK', 'DESACOPLE_5V', 'JACK', 'I2C', 'SPI'}
    exportados = {nombre.split('/', 1)[1] for nombre in por_id if nombre.startswith('exp1/')}
    revisar(exportados == requeridos, f'KiCad exporta regulación, filtros, jack, I2C y SPI: {sorted(exportados)}')
    revisar({'pot6', 'pot7'} <= por_id.keys(), 'los dos potenciómetros conservan su exportación normal')
    revisar('referencia por validar' in texto, 'la netlist identifica los componentes de referencia pendientes de validar')

    redes = {}
    for n in campo(net, 'nets')[1:]:
        for pin in n[1:]:
            if isinstance(pin, list) and pin and pin[0] == 'node':
                redes[(valor(pin, 'ref'), valor(pin, 'pin'))] = valor(n, 'code')

    def red(nombre, pin):
        return redes.get((valor(por_id.get(nombre, []), 'ref'), str(pin)))

    for conector, pin, pad in [('I2C', 1, 23), ('I2C', 2, 24), ('SPI', 1, 15),
                               ('SPI', 2, 14), ('SPI', 3, 16), ('SPI', 4, 13)]:
        revisar(red('exp1/' + conector, pin) is not None and red('exp1/' + conector, pin) == red('placa', pad),
                f'{conector} pin {pin} llega al pad {pad} del Nano')
    revisar(red('placa', 25) is not None and red('placa', 25) == red('pot6', 2)
            and red('placa', 26) == red('pot7', 2), 'A6/A7 mantienen sus pads 25/26 y sus cursores en KiCad')
    revisar(red('exp1/JACK', 1) is not None and red('exp1/JACK', 1) == red('exp1/REG_5V', 3)
            and red('exp1/JACK', 1) != red('placa', 30), 'el jack alimenta la regulación externa y conserva separado VIN del Nano')
    revisar(red('exp1/REG_5V', 2) is not None and red('exp1/REG_5V', 2) == red('placa', 27)
            and red('placa', 27) == red('exp1/I2C', 3) == red('exp1/SPI', 5), 'la salida regulada 5V llega al Nano y a I2C/SPI')
    revisar(red('exp1/REG_3V3', 2) is not None and red('exp1/REG_3V3', 2) == red('exp1/FILTRO_3V3', 1)
            and red('exp1/REG_3V3', 2) != red('placa', 17), '3,3V externo tiene filtro y permanece separado del pad 17 del Nano')


with sync_playwright() as p:
    nav = p.chromium.launch()
    pg = nav.new_page(viewport={'width': 1366, 'height': 900}, accept_downloads=True)
    errores = []
    pg.on('console', lambda m: errores.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: errores.append(f'pageerror: {e}'))

    def esperar_lectura(a, b, texto):
        try:
            pg.wait_for_function(ESPERAR_ADC, arg=[a, b], timeout=12000)
            cumple = True
        except TimeoutPlaywright:
            cumple = False
        lectura = pg.evaluate(ULTIMA)
        revisar(cumple, f'{texto}: {lectura} (≈ {a},{b}, margen 2 pasos)')
        return cumple

    def seleccionar_expansion():
        pieza = pg.locator('.tc-comp[data-id="exp1"]')
        pieza.click(position={'x': pieza.bounding_box()['width'] - 35, 'y': 15})
        pg.locator('main .tc-ficha select[data-prop="variante"]').wait_for()

    def cambiar(prop, opcion):
        pg.locator(f'main .tc-ficha select[data-prop="{prop}"]').select_option(str(opcion))
        pg.wait_for_function(f'''() => {RAIZ}.querySelectorAll('.tc-pin[data-ref^="exp1."]').length === 82''')

    def puntos():
        return pg.evaluate(f'''() => Object.fromEntries([...{RAIZ}.querySelectorAll('.tc-pin')]
          .map(p => [p.dataset.ref, [parseFloat(p.style.left), parseFloat(p.style.top)]]))''')

    def geometria():
        return pg.evaluate(f'''() => {{
          const root = {RAIZ};
          const nano = root.querySelector('.tc-comp[data-id="placa"] > svg');
          const exp = root.querySelector('.tc-comp[data-id="exp1"] > svg');
          const contactos = [...exp.querySelectorAll('[data-contacto]')].map(c => {{
            const pin = root.querySelector('.tc-pin[data-ref="exp1.' + c.dataset.contacto + '"]');
            const b = c.getBBox();
            return !!pin && Math.abs(parseFloat(pin.style.left) - b.x - b.width / 2) < 0.02
              && Math.abs(parseFloat(pin.style.top) - b.y - b.height / 2) < 0.02;
          }});
          return {{ nanoSVG: !!nano, ancho: nano.width.baseVal.value, alto: nano.height.baseVal.value,
            mismoMarco: nano.getAttribute('viewBox') === exp.getAttribute('viewBox'),
            ventana: !!exp.querySelector('path[fill-rule="evenodd"]'),
            contactos: contactos.length, alineados: contactos.every(Boolean),
            leds: [...nano.querySelectorAll('[data-led]')].map(n => n.dataset.led).sort(),
            marcas: !!nano.querySelector('image') || !!exp.querySelector('image') }};
        }}''')

    try:
        pg.goto(PAGINA)
        pg.evaluate('localStorage.clear()')
        pg.reload()
        pg.locator('#ejemploNano').click()
        pg.wait_for_selector('.tc-pin[data-ref="exp1.A7_S"]', state='attached')
        pg.wait_for_selector('.tc-pin[data-ref="pot7.SIG"]', state='attached')
        circuito = pg.evaluate('lienzo.circuito()')
        revisar(circuito['placa'] == 'nano' and pg.locator('#placa').input_value() == 'nano', 'el ejemplo abre Nano en circuito y selector')
        revisar(pg.locator('#programa').input_value() == 'nano_adc67', 'el ejemplo elige el programa compilado para A6/A7')
        revisar(len(circuito['componentes']) == 3 and len(circuito['cables']) == 6, 'el ejemplo monta expansión, dos potenciómetros y seis cables')
        refs = puntos()
        revisar(len([r for r in refs if r.startswith('placa.')]) == 30, 'el Nano muestra treinta terminales físicos')
        revisar(len([r for r in refs if r.startswith('exp1.')]) == 82, 'la expansión muestra ochenta y dos terminales')
        revisar(refs['exp1.I2C_SDA'][0] > refs['placa.D1'][0]
                and abs(refs['exp1.I2C_SDA'][1] - refs['exp1.UART_TX'][1]) < 0.01
                and 9.6 < refs['exp1.UART_TX'][0] - refs['exp1.I2C_SDA'][0] < 12,
                'I2C está junto a UART, al final del Nano y fuera del cuerpo del módulo')
        revisar(all('exp1.' + p in refs for p in ['OUT_5V', 'OUT_5V_2', 'OUT_3V3', 'OUT_3V3_2', 'GND_OUT', 'GND_OUT_2'])
                and not any('exp1.' + p in refs for p in ['SPI_MISO', 'SPI_MOSI', 'SPI_SCK', 'SPI_SS', 'SPI_V', 'SPI_G']),
                'el bloque de seis contactos es alimentación duplicada y no dibuja un falso puerto SPI')
        revisar({'placa.A6', 'placa.A7', 'placa.RESET2', 'placa.GND2'} <= refs.keys()
                and not any(r in refs for r in ['placa.D20', 'placa.D21', 'placa.IOREF']), 'A6/A7 tienen contactos analógicos propios, sin GPIO adicionales ni IOREF del Uno')
        g = geometria()
        revisar(g['nanoSVG'] and g['mismoMarco'] and abs(g['ancho'] - 219.21) < 0.02 and abs(g['alto'] - 204.09) < 0.02,
                'Nano y expansión comparten el marco SVG nominal 58 × 54 mm')
        revisar(g['ventana'] and not g['marcas'], 'la expansión deja una ventana para el Nano y usa dibujos propios, sin imágenes incrustadas')
        revisar(g['contactos'] == 82 and g['alineados'], 'los 82 puntos de cableado coinciden con los contactos dibujados')
        revisar(g['leds'] == ['L', 'PWR', 'RX', 'TX'], 'el Nano tiene sus cuatro LED actualizables')
        pwr_apagado = pg.locator('.tc-comp[data-id="placa"] [data-led="PWR"]').get_attribute('fill')
        tx_apagado = pg.locator('.tc-comp[data-id="placa"] [data-led="TX"]').get_attribute('fill')
        l_apagado = pg.locator('.tc-comp[data-id="placa"] [data-led="L"]').get_attribute('fill')

        seleccionar_expansion()
        ficha = pg.locator('main .tc-ficha').text_content()
        revisar('A6 y A7 solo' in ficha and 'referencia' in ficha and 'Por probar con la placa real' in ficha,
                'la ficha explica A6/A7 y declara el modelo pendiente de validar físicamente')
        revisar(pg.locator('main .tc-ficha select[data-prop]').count() == 3, 'la ficha permite elegir variante, alimentación y voltaje del jack')
        pg.locator('main').screenshot(path=str(SALIDA / 'nano_1_roja.png'))

        # Biblioteca: una sola expansión, solo para Nano; la shield L293D sigue en Uno.
        pg.get_by_role('button', name='+ Agregar').click()
        botones = pg.locator('main .tc-pieza:visible').evaluate_all('(b) => b.map(x => x.dataset.pieza)')
        revisar(len(botones) == 10 and 'shield_nano_io' in botones and 'shield_l293d' not in botones,
                'la biblioteca Nano tiene diez piezas compatibles y oculta la shield del Uno')
        b_exp = pg.locator('main .tc-pieza[data-tipo="shield_nano_io"]')
        revisar(b_exp.is_disabled(), 'la expansión ya montada no se puede agregar dos veces')
        b_exp.evaluate('(b) => b.dispatchEvent(new MouseEvent("click", {bubbles:true}))')
        revisar(sum(c['tipo'] == 'shield_nano_io' for c in pg.evaluate('lienzo.circuito().componentes')) == 1,
                'el controlador conserva una sola expansión aunque reciba otro clic')
        pg.keyboard.press('Escape')

        # La API también rechaza importaciones que la interfaz no permite construir.
        rechazos = pg.evaluate('''() => {
          const base = lienzo.circuito();
          const duplicada = structuredClone(base);
          duplicada.componentes.push({...duplicada.componentes[0], id:'exp2'});
          const incompatible = structuredClone(base); incompatible.placa = 'uno';
          const encajada = structuredClone(base);
          encajada.protoboard = {tipo:'media', x:300, y:20};
          encajada.componentes[0].en = {A6_S:'protoboard.a1'};
          return [duplicada, incompatible, encajada].map(c => {
            let prueba = null;
            try { prueba = TecnoCircuito.crearLienzo(document.createElement('div'), {placa:c.placa, circuito:c}); return null; }
            catch (e) { return e.message; }
            finally { if (prueba) prueba.destruir(); }
          });
        }''')
        for caso, rechazo in zip(['expansión duplicada', 'expansión Nano sobre Uno', 'expansión encajada por «en» en protoboard'], rechazos):
            revisar(bool(rechazo), f'la API rechaza {caso}: {rechazo}')

        # Los proyectos anteriores con SPI_* mantienen sus redes y un extremo visible
        # sobre el pin real del Nano; no se reinterpretan como contactos de alimentación.
        legado = pg.evaluate('''async () => {
          const pares = [['SPI_MISO','D12'],['SPI_MOSI','D11'],['SPI_SCK','D13'],['SPI_SS','D10'],['SPI_V','5V'],['SPI_G','GND1']];
          const c = lienzo.circuito();
          c.cables.push(...pares.map(([alias]) => ({de:'exp1.'+alias,a:'pot6.SIG'})));
          const antes = JSON.stringify(c.cables);
          const host = document.createElement('div');
          host.style.cssText='position:fixed;left:0;top:0;width:800px;height:600px'; document.body.append(host);
          let aux;
          try {
            aux = TecnoCircuito.crearLienzo(host,{placa:'nano',circuito:c});
            await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
            const root = host.querySelector('.tecnocircuito').shadowRoot;
            const lineas = [...root.querySelectorAll('.tc-cables .tc-cable-linea')];
            const alineadas = pares.every(([,pin],i) => {
              const p = root.querySelector('.tc-pin[data-ref="placa.'+pin+'"]');
              const inicio = /^M([-\\d.]+) ([-\\d.]+)/.exec(lineas[i+6]?.getAttribute('d') || '');
              return inicio && Math.abs(Number(inicio[1])-parseFloat(p.style.left)) < .02 && Math.abs(Number(inicio[2])-parseFloat(p.style.top)) < .02;
            });
            return {cables:lineas.length,alineadas,conservadas:JSON.stringify(aux.circuito().cables)===antes,
              fantasmas:root.querySelectorAll('.tc-pin[data-ref^="exp1.SPI_"]').length};
          } finally { aux?.destruir(); host.remove(); }
        }''')
        revisar(legado['cables'] == 12 and legado['alineadas'], 'los seis aliases SPI antiguos dibujan sus cables sobre los pines reales del Nano')
        revisar(legado['conservadas'] and legado['fantasmas'] == 0, 'la reapertura conserva referencias SPI antiguas sin crear contactos físicos ni cambiar redes')

        pg.locator('#modo').select_option('ideal')
        revisar(pg.evaluate('sim._medidas().hilo') == 'worker', 'el único programa del Nano corre en el Worker')
        pg.locator('#iniciar').click()
        esperar_lectura(256, 768, 'los cursores A6=25 % y A7=75 % llegan al ADC del AVR')
        revisar(pg.locator('.tc-comp[data-id="placa"] [data-led="PWR"]').get_attribute('fill') != pwr_apagado, 'PWR se enciende al alimentar el Nano')
        pg.wait_for_function(f'''() => {RAIZ}.querySelector('.tc-comp[data-id="placa"] [data-led="TX"]').getAttribute('fill') !== {json.dumps(tx_apagado)}''', timeout=5000)
        revisar(True, 'el LED TX muestra la actividad del monitor serial')
        m = pg.evaluate('sim.mediciones()')
        revisar(abs(m['voltajes']['placa.A6'] - 1.25) < 0.01 and abs(m['voltajes']['placa.A7'] - 3.75) < 0.01,
                'la medición y el ADC ven los mismos nodos A6/A7 a través de la expansión')
        revisar(not any(p in m['entradas'] for p in ['A6', 'A7']), 'el Worker conserva A6/A7 fuera de las entradas digitales')
        revisar(m['voltajes']['exp1.OUT_5V_2'] == m['voltajes']['exp1.OUT_5V']
                and m['voltajes']['exp1.OUT_3V3_2'] == m['voltajes']['exp1.OUT_3V3']
                and m['voltajes']['exp1.GND_OUT_2'] == m['voltajes']['exp1.GND_OUT'],
                'los dos contactos de cada salida comparten el voltaje de su red de alimentación')

        # Cambiar la tarjeta redibuja los contactos y las puntas, preservando redes y CPU.
        seleccionar_expansion()
        cables_roja = pg.evaluate('lienzo.circuito().cables')
        puntos_roja = puntos()
        trazos_roja = pg.locator('main .tc-cables .tc-cable-linea').evaluate_all('(p) => p.map(x => x.getAttribute("d"))')
        t0 = pg.evaluate('sim.medidas().msSimulados')
        cambiar('variante', 'azul')
        puntos_azul = puntos()
        revisar(pg.evaluate('lienzo.circuito().cables') == cables_roja, 'roja → azul conserva las seis referencias de cables')
        revisar(puntos_roja['exp1.A6_S'] != puntos_azul['exp1.A6_S'] and puntos_roja['placa.A6'] == puntos_azul['placa.A6'],
                'cambiar la variante mueve sus conectores y conserva la posición del módulo')
        revisar(pg.locator('main .tc-cables .tc-cable-linea').evaluate_all('(p) => p.map(x => x.getAttribute("d"))') != trazos_roja,
                'las puntas dibujadas siguen a los conectores movidos')
        revisar(geometria()['alineados'], 'los contactos azules y la capa de pines siguen coincidiendo')
        esperar_lectura(256, 768, 'el cambio de variante conserva el ADC')
        revisar(pg.evaluate('sim._medidas().estado') == 'corriendo' and pg.evaluate('sim.medidas().msSimulados') > t0,
                'el Worker sigue ejecutando la misma corrida tras cambiar la variante')

        # Perilla mediante teclado sobre el control real de la ficha, sin editar el circuito.
        pg.locator('.tc-comp[data-id="pot6"]').click(position={'x': 10, 'y': 20})
        antes = next(c for c in pg.evaluate('lienzo.circuito().componentes') if c['id'] == 'pot6')
        perilla = pg.locator('main .tc-ficha input[data-perilla]')
        perilla.focus()
        perilla.press('End')
        for _ in range(20):
            perilla.press('ArrowLeft')
        despues = next(c for c in pg.evaluate('lienzo.circuito().componentes') if c['id'] == 'pot6')
        revisar(abs(despues['props']['posicion'] - 0.8) < 0.001, 'la perilla de A6 pasa de 25 % a 80 % con el teclado')
        revisar([antes['x'], antes['y'], antes['rot']] == [despues['x'], despues['y'], despues['rot']], 'girar la perilla mantiene el potenciómetro en su sitio')
        esperar_lectura(819, 768, 'A6 responde al giro y A7 conserva su lectura')

        seleccionar_expansion()
        cambiar('alimentacion', 'jack')
        cambiar('voltajeJack', 12)
        pg.wait_for_function('() => sim.mediciones()?.usb?.fuente === "jack" && sim.mediciones().voltajes["exp1.JACK_POS"] === 12')
        m = pg.evaluate('sim.mediciones()')
        revisar(m['voltajes']['placa.VIN'] == 0 and m['voltajes']['placa.5V'] == 5 and m['voltajes']['exp1.OUT_3V3'] == 3.3,
                'jack de 12 V conserva VIN separado y da las salidas ideales 5V/3,3V del modelo')
        esperar_lectura(819, 768, 'cambiar la fuente y el voltaje no pierde los cursores')
        cambiar('alimentacion', 'apagada')
        pg.wait_for_function(f'''() => sim.mediciones() === null && {RAIZ}.querySelector('.tc-comp[data-id="placa"] [data-led="PWR"]').getAttribute('fill') === {json.dumps(pwr_apagado)}''')
        revisar(pg.locator('.tc-comp[data-id="placa"] [data-led="PWR"]').get_attribute('fill') == pwr_apagado,
                'al desconectar, el Worker apaga PWR y las salidas')
        cambiar('alimentacion', 'usb')
        pg.wait_for_function('() => sim.mediciones()?.usb?.fuente === "usb" && sim.mediciones().voltajes["placa.5V"] === 5')
        esperar_lectura(819, 768, 'al volver al USB, el ADC vuelve a responder')
        revisar('energia_nano' in pg.locator('#eventos').inner_text(), 'el reinicio por fuente del Nano se registra con su motivo propio')
        pg.locator('main').screenshot(path=str(SALIDA / 'nano_2_azul_adc.png'))

        # Imagen y netlist desde los botones que usa el aprendiz.
        with pg.expect_download() as descarga:
            pg.locator('#imagen').click()
        svg = Path(descarga.value.path()).read_text(encoding='utf-8')
        (SALIDA / 'nano_azul.svg').write_text(svg, encoding='utf-8')
        revisar(descarga.value.suggested_filename == 'circuito.svg', 'el botón descarga la imagen SVG')
        analisis = pg.evaluate(r'''(texto) => {
          const doc = new DOMParser().parseFromString(texto, 'image/svg+xml');
          const ids = [...doc.querySelectorAll('[id]')].map(n => n.id);
          const refs = [...texto.matchAll(/url\(#([^)]+)\)|href="#([^"]+)"/g)].map(m => m[1] || m[2]);
          return {error:!!doc.querySelector('parsererror'), repetidos:ids.filter((id,i) => ids.indexOf(id) !== i),
            rotas:refs.filter(r => !ids.includes(r)), leds:doc.querySelectorAll('#tc-placa [data-led]').length,
            contactos:doc.querySelectorAll('#tc-exp1 [data-contacto]').length};
        }''', svg)
        revisar(not analisis['error'], 'la imagen exportada es XML SVG válido')
        revisar(not analisis['repetidos'] and not analisis['rotas'], 'el SVG tiene identificadores únicos y referencias completas')
        revisar(analisis['leds'] == 4 and analisis['contactos'] == 82, 'el SVG conserva el Nano inferior y todos los contactos de la expansión')
        revisar(svg.count('stroke-width="4.8"') == 6, 'el SVG incluye los seis cables del circuito')
        imagen = nav.new_page(viewport={'width': 1000, 'height': 760})
        datos_svg = base64.b64encode(svg.encode('utf-8')).decode('ascii')
        imagen.set_content(f'<img id="nano" src="data:image/svg+xml;base64,{datos_svg}" style="max-width:980px">')
        imagen.wait_for_function('document.getElementById("nano").complete')
        revisar(imagen.locator('#nano').evaluate('(i) => i.naturalWidth > 100 && i.naturalHeight > 100'), 'la imagen exportada se puede abrir por sí sola')
        imagen.locator('#nano').screenshot(path=str(SALIDA / 'nano_3_svg.png'))
        imagen.close()
        with pg.expect_download() as descarga:
            pg.locator('#netlist').click()
        netlist = Path(descarga.value.path()).read_text(encoding='utf-8')
        (SALIDA / 'nano_azul.net').write_text(netlist, encoding='utf-8')
        revisar(descarga.value.suggested_filename == 'circuito.net', 'el botón descarga la netlist KiCad')
        revisar_netlist(netlist)

        pg.locator('#detener').click()
        pg.wait_for_function(f'''() => {RAIZ}.querySelector('.tc-comp[data-id="placa"] [data-led="PWR"]').getAttribute('fill') === {json.dumps(pwr_apagado)}''')
        revisar(True, 'al detener, PWR vuelve a su estado apagado')
        guardado = pg.evaluate('lienzo.circuito()')
        revisar(pg.evaluate('(clave) => JSON.parse(localStorage.getItem(clave))', CLAVE) == guardado,
                'localStorage guarda variante, fuente, perilla y referencias completas')
        pg.reload()
        pg.wait_for_selector('.tc-pin[data-ref="exp1.A7_S"]', state='attached')
        revisar(pg.evaluate('lienzo.circuito()') == guardado, 'recargar recupera exactamente el montaje Nano guardado')
        revisar(pg.locator('#placa').input_value() == 'nano' and pg.locator('#programa').input_value() == 'nano_adc67',
                'recargar mantiene coherentes los selectores de placa y programa Nano')
        pg.locator('#modo').select_option('ideal')
        pg.locator('#iniciar').click()
        esperar_lectura(819, 768, 'el circuito guardado vuelve a ejecutar sus entradas en el Worker')
        pg.locator('#detener').click()

        # Nano_old usa la misma electrónica; cambia la opción de compilación/cargador.
        pg.locator('#placa').select_option('nano_old')
        nuevo = pg.evaluate('lienzo.circuito()')
        revisar(nuevo['placa'] == 'nano_old' and len(nuevo['componentes']) == 1
                and nuevo['componentes'][0]['tipo'] == 'shield_nano_io' and not nuevo['cables'], 'elegir Nano antiguo crea un conjunto nuevo con una sola expansión')
        revisar(pg.locator('#programa').input_value() == 'nano_adc67', 'Nano antiguo elige el mismo programa de lectura A6/A7')
        fixture_old = dict(guardado, placa='nano_old')
        pg.evaluate('([clave,c]) => localStorage.setItem(clave,JSON.stringify(c))', [CLAVE, fixture_old])
        pg.reload()
        pg.wait_for_selector('.tc-pin[data-ref="pot7.SIG"]', state='attached')
        revisar(pg.locator('#placa').input_value() == 'nano_old' and geometria()['leds'] == ['L', 'PWR', 'RX', 'TX'],
                'un montaje guardado Nano antiguo conserva la misma vista y terminales físicos')
        pg.locator('#modo').select_option('ideal')
        pg.locator('#iniciar').click()
        esperar_lectura(819, 768, 'Nano antiguo ejecuta el mismo HEX y devuelve las mismas lecturas del AVR')
        revisar(pg.evaluate('sim._medidas().hilo') == 'worker', 'Nano antiguo también ejecuta el chip en el Worker')
        pg.locator('#detener').click()
        pg.locator('#programa').select_option('fijo13')
        pg.locator('#iniciar').click()
        pg.wait_for_function(f'''() => {RAIZ}.querySelector('.tc-comp[data-id="placa"] [data-led="L"]').getAttribute('fill') !== {json.dumps(l_apagado)}''')
        revisar(True, 'el LED L del Nano antiguo sigue a digitalWrite(13, HIGH)')
        pg.locator('#detener').click()

        pg.locator('#placa').select_option('uno')
        pg.get_by_role('button', name='+ Agregar').click()
        visibles_uno = pg.locator('main .tc-pieza:visible').evaluate_all('(b) => b.map(x => x.dataset.pieza)')
        revisar(len(visibles_uno) == 10 and 'shield_l293d' in visibles_uno and 'shield_nano_io' not in visibles_uno,
                'al volver al Uno su biblioteca conserva diez piezas y oculta la expansión Nano incompatible')
        incompatible = pg.locator('main .tc-pieza[data-tipo="shield_nano_io"]')
        revisar(incompatible.is_hidden() and incompatible.is_disabled(), 'la expansión Nano está oculta y deshabilitada sobre Uno')
        incompatible.evaluate('(b) => b.dispatchEvent(new MouseEvent("click", {bubbles:true}))')
        revisar(not any(c['tipo'] == 'shield_nano_io' for c in pg.evaluate('lienzo.circuito().componentes')),
                'el controlador no agrega una expansión incompatible al Uno')

    except Exception as e:
        revisar(False, f'el recorrido no pudo completarse: {type(e).__name__}: {e}')
        pg.screenshot(path=str(SALIDA / 'nano_error.png'))
    finally:
        revisar(not errores, 'sin errores ni avisos de consola' + (': ' + ' | '.join(errores[:8]) if errores else ''))
        nav.close()

print(f'\n{comprobaciones} comprobaciones; ' + (f'{len(fallos)} FALLAS' if fallos else 'todo bien.'))
sys.exit(1 if fallos else 0)
