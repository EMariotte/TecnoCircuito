"""Prueba la imagen SVG del circuito (lienzo.exportarSVG): bien formada, sin identificadores repetidos y fiel a la pantalla."""
import re
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
PAGINA = Path(sys.argv[1]).resolve().as_uri()
SALIDA = Path(sys.argv[2])
SALIDA.mkdir(parents=True, exist_ok=True)
fallos = []


def revisar(condicion, texto):
    print(('OK   ' if condicion else 'FALLA') + ' ' + texto)
    if not condicion:
        fallos.append(texto)


with sync_playwright() as p:
    nav = p.chromium.launch()
    pg = nav.new_page(viewport={'width': 1366, 'height': 900}, accept_downloads=True)
    errores = []
    pg.on('console', lambda m: errores.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: errores.append(f'pageerror: {e}'))
    pg.goto(PAGINA)
    pg.evaluate('localStorage.clear()')
    pg.reload()
    pg.get_by_text('Ejemplo con potenciómetro (T2)').click()
    pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
    pg.wait_for_timeout(400)
    # La perilla en un ángulo que se note y la resistencia girada, para probar los dos casos difíciles.
    pg.evaluate('''() => {
      const c = lienzo.circuito();
      for (const k of c.componentes) {
        if (k.tipo === 'potenciometro') k.props.posicion = 0.8;
        if (k.tipo === 'resistencia') k.rot = 90;
      }
      localStorage.setItem("tecnocircuito-prototipo-0", JSON.stringify(c));
    }''')
    pg.reload()
    pg.wait_for_selector('.tc-pin[data-ref="led1.anodo"]', state='attached')
    pg.wait_for_timeout(400)
    pg.locator('main').screenshot(path=str(SALIDA / 'svg_1_pantalla.png'))

    svg = pg.evaluate('lienzo.exportarSVG()')
    (SALIDA / 'circuito.svg').write_text(svg, encoding='utf-8')
    revisar(svg.startswith('<svg xmlns="http://www.w3.org/2000/svg"'), f'empieza como un SVG ({len(svg) // 1024} KB)')
    analisis = pg.evaluate('''(texto) => {
      const doc = new DOMParser().parseFromString(texto, 'image/svg+xml');
      const error = doc.querySelector('parsererror');
      const ids = [...doc.querySelectorAll('[id]')].map(n => n.id);
      const repetidos = ids.filter((id, i) => ids.indexOf(id) !== i);
      const refs = [...texto.matchAll(/url\\(#([^)]+)\\)|href="#([^"]+)"/g)].map(m => m[1] || m[2]);
      const rotas = refs.filter(r => !ids.includes(r));
      return { error: error ? error.textContent.slice(0, 200) : null, ids: ids.length, repetidos, rotas,
               piezas: doc.querySelectorAll('svg > g > g[transform]').length };
    }''', svg)
    print('   ', analisis)
    revisar(analisis['error'] is None, 'es XML válido (lo abre cualquier programa)')
    revisar(not analisis['repetidos'], f'sin identificadores repetidos entre piezas ({analisis["ids"]} en total)')
    revisar(not analisis['rotas'], f'todas las referencias url(#…) y href apuntan a algo: {analisis["rotas"][:5]}')
    cables = pg.evaluate('lienzo.circuito().cables.length')
    revisar(svg.count('stroke-width="4.8"') == cables, f'tiene los {cables} cables')
    # El Uno de TecnoDiseñador no usa CSS: cada texto trae su tamaño (sin él, las letras saldrían gigantes).
    placa = re.search(r'<svg id="tc-placa".*?</svg>', svg, re.S)
    textos = re.findall(r'<text\b[^>]*>', placa.group(0)) if placa else []
    revisar(textos and all('font-size=' in t for t in textos), f'los {len(textos)} textos de la placa traen su tamaño, sin depender de estilos')
    revisar(re.search(r'id="tc-pot1-rotating"[^>]*transform="rotate\(', svg) or re.search(r'transform="rotate\([^"]+\)"[^>]*id="tc-pot1-rotating"', svg),
            'la perilla del potenciómetro queda girada como atributo')
    revisar('rotate(90)' in svg, 'la resistencia girada sale girada')
    # La marca (MARCA-001): la firma abajo a la derecha y el símbolo de una tinta como marca de agua.
    marca = pg.evaluate('''(texto) => {
      const caja = document.createElement('div');
      caja.innerHTML = texto;
      document.body.appendChild(caja);
      const svg = caja.querySelector('svg');
      const enImagen = (n) => {  // caja del grupo en las coordenadas de la imagen
        const b = n.getBBox(), m = n.transform.baseVal.consolidate().matrix;
        return { x0: m.e + b.x * m.a, y0: m.f + b.y * m.d, x1: m.e + (b.x + b.width) * m.a, y1: m.f + (b.y + b.height) * m.d, escala: m.a };
      };
      const circuito = enImagen(svg.querySelector(':scope > g'));
      const firma = svg.querySelector(':scope > g.tc-firma');
      const agua = svg.querySelector(':scope > g.tc-marca-agua');
      const r = { ancho: svg.width.baseVal.value, alto: svg.height.baseVal.value, circuito,
                  firma: firma && enImagen(firma), etiqueta: firma && firma.getAttribute('aria-label'),
                  agua: agua && enImagen(agua), opacidad: agua && Number(agua.getAttribute('opacity')),
                  textoSuelto: svg.querySelectorAll(':scope > text').length,
                  ultimo: svg.lastElementChild.getAttribute('class'),
                  // orden de pintado: lo que viene después se dibuja encima
                  capas: [...svg.children].map((n) => n.tagName + (n.getAttribute('class') ? '.' + n.getAttribute('class') : '')) };
      // la placa es opaca: la marca de agua tiene que pisarla, no quedar escondida detrás
      const p = svg.querySelector(':scope > g:first-of-type #tc-placa').getBoundingClientRect();
      const w = agua && agua.getBoundingClientRect();
      r.sobrePlaca = w ? Math.max(0, Math.min(p.right, w.right) - Math.max(p.left, w.left)) * Math.max(0, Math.min(p.bottom, w.bottom) - Math.max(p.top, w.top)) : 0;
      caja.remove();
      return r;
    }''', svg)
    print('   marca:', marca)
    f, a = marca['firma'], marca['agua']
    revisar(f is not None and marca['textoSuelto'] == 0, 'lleva la firma de TecnoCircuito en lugar del texto de antes')
    revisar(marca['etiqueta'] == 'Hecho con TecnoCircuito, TecnoAcademia Tolima · SENA. Prueba tu idea antes de armarla en la placa.',
            f'la firma dice «{marca["etiqueta"]}» (los lectores de pantalla la leen)')
    revisar(f['x0'] >= 0 and f['x1'] <= marca['ancho'] and f['y0'] >= 0 and f['y1'] <= marca['alto'], 'la firma cabe entera en la imagen')
    revisar(f['x1'] > marca['ancho'] - 16 and f['y1'] > marca['alto'] - 12, 'la firma está en la esquina inferior derecha')
    revisar(f['y0'] >= marca['circuito']['y1'], 'la firma va debajo del circuito, sin tapar nada')
    revisar(24 * f['escala'] >= 8, f'las letras chicas de la firma se leen ({24 * f["escala"]:.1f} px)')
    revisar(a is not None and 0 < marca['opacidad'] <= 0.1, f'lleva la marca de agua, tenue (opacidad {marca["opacidad"]})')
    if a:
        cx, cy = (a['x0'] + a['x1']) / 2, (a['y0'] + a['y1']) / 2
        revisar(a['x0'] >= 0 and a['x1'] <= marca['ancho'] and a['y1'] <= f['y0'], 'la marca de agua queda dentro del circuito, sin tocar la firma')
        # el dibujo del símbolo no llena su cuadro de 64 (la antena es angosta): se acepta un poco de holgura
        revisar(abs(cx - marca['ancho'] / 2) < 4 and abs(cy - f['y0'] / 2) < 12,
                f'la marca de agua está centrada en el circuito ({cx:.0f}, {cy:.0f})')
    # Decisión de Efraín (25 oct, tras la devolución M1 de Codex): la marca de agua va ENCIMA del circuito, al 10 %
    revisar(marca['capas'] == ['title', 'rect', 'g', 'g.tc-marca-agua', 'g.tc-firma'],
            f'capas en orden: fondo, circuito, marca de agua encima y firma ({" > ".join(marca["capas"])})')
    revisar(marca['sobrePlaca'] > 1000, f'la marca de agua pisa la placa, que es opaca ({marca["sobrePlaca"]:.0f} px² en común)')
    api = pg.evaluate('''() => { const m = TecnoCircuito.MARCA;
      return { nombre: m.nombre, frase: m.frase, simbolo: m.simbolo.slice(0, 40), cabeza: m.cabeza.slice(0, 40), congelada: Object.isFrozen(m) }; }''')
    revisar(api['nombre'] == 'TecnoCircuito' and api['frase'] == 'Prueba tu idea antes de armarla en la placa.'
            and api['simbolo'].startswith('<svg') and api['cabeza'].startswith('<svg') and api['congelada'],
            f'TecnoCircuito.MARCA trae nombre, frase, símbolo y cabeza, y no se puede cambiar: {api}')

    # Abrir el archivo solo, como lo abriría otro programa, y comparar con la pantalla
    # (como imagen dentro de una página: la foto de un SVG abierto solo se queda esperando en Chromium)
    vista = nav.new_page(viewport={'width': 900, 'height': 700})
    import base64
    datos_svg = base64.b64encode(svg.encode('utf-8')).decode('ascii')
    vista.set_content(f'<body style="margin:0;background:#888"><img id="i" src="data:image/svg+xml;base64,{datos_svg}" style="max-width:880px"></body>')
    vista.wait_for_function('document.getElementById("i").complete')
    if not vista.evaluate('document.getElementById("i").naturalWidth'):
        print('   no cargó; error del navegador:', vista.evaluate('''() => new Promise(r => { const i = new Image(); i.onload = () => r('carga'); i.onerror = e => r('error'); i.src = document.getElementById("i").src; })'''))
    medida = vista.evaluate('[document.getElementById("i").naturalWidth, document.getElementById("i").naturalHeight]')
    revisar(medida[0] > 100 and medida[1] > 100, f'la imagen se carga sola como archivo ({medida[0]} × {medida[1]} px)')
    vista.locator('#i').screenshot(path=str(SALIDA / 'svg_2_archivo.png'))

    # El botón de la página descarga el archivo
    with pg.expect_download() as descarga:
        pg.get_by_text('Guardar imagen (SVG)').click()
    revisar(descarga.value.suggested_filename == 'circuito.svg', f'el botón descarga «{descarga.value.suggested_filename}»')

    # La netlist de KiCad, desde el botón de la página
    with pg.expect_download() as descarga:
        pg.get_by_text('Guardar netlist (KiCad)').click()
    net = Path(descarga.value.path()).read_text(encoding='utf-8')
    revisar(descarga.value.suggested_filename == 'circuito.net' and net.startswith('(export\n\t(version "E")') and '(ref "J2")' in net and 'PinSocket_1x10' in net,
            f'«Guardar netlist (KiCad)» descarga «{descarga.value.suggested_filename}» con los conectores del shield y {net.count(chr(9) * 2 + "(net" + chr(10))} redes')

    revisar(not errores, 'sin errores en la consola' + ('' if not errores else ': ' + ' | '.join(errores)))
    nav.close()

print('\n' + ('TODO BIEN' if not fallos else f'{len(fallos)} FALLAS'))
sys.exit(1 if fallos else 0)
