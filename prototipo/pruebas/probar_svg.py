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
    revisar('#tc-placa text' in svg, 'lleva el estilo de los textos de la placa (sin él, las letras salen gigantes)')
    revisar(re.search(r'id="tc-pot1-rotating"[^>]*transform="rotate\(', svg) or re.search(r'transform="rotate\([^"]+\)"[^>]*id="tc-pot1-rotating"', svg),
            'la perilla del potenciómetro queda girada como atributo')
    revisar('rotate(90)' in svg, 'la resistencia girada sale girada')
    marca = pg.evaluate('''(texto) => {
      const caja = document.createElement('div');
      caja.innerHTML = texto;
      document.body.appendChild(caja);
      const svg = caja.querySelector('svg');
      const t = svg.querySelector(':scope > text');
      const m = t.getBBox();
      const c = svg.querySelector(':scope > g').getBBox();
      const tr = svg.querySelector(':scope > g').transform.baseVal.consolidate().matrix;
      const r = { texto: t.textContent, x0: m.x, x1: m.x + m.width, y0: m.y, y1: m.y + m.height,
                  ancho: svg.width.baseVal.value, alto: svg.height.baseVal.value, finCircuito: c.y + c.height + tr.f };
      caja.remove();
      return r;
    }''', svg)
    print('   marca:', marca)
    revisar(marca['texto'] == 'Hecho con TecnoCircuito · SENA – TecnoAcademia Tolima', f'lleva la marca «{marca["texto"]}»')
    revisar(marca['x0'] >= 0 and marca['x1'] <= marca['ancho'] and marca['y1'] <= marca['alto'], 'la marca cabe entera en la imagen')
    revisar(marca['x1'] > marca['ancho'] - 20 and marca['y1'] > marca['alto'] - 12, 'la marca está en la esquina inferior derecha')
    revisar(marca['y0'] >= marca['finCircuito'], 'la marca va debajo del circuito, sin tapar nada')

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
