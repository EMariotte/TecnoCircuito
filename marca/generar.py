"""Genera todos los archivos de la marca TecnoCircuito a partir de un solo dibujo.

Es la hermana de marca/generar.py de TecnoBloques: misma cuadrícula de 64, mismos bloques
redondeados que encajan, misma antena en T y la misma paleta SENA. El robot de TecnoBloques
ya trae su programa; aquí el robot es un CHIP (cabeza verde con patas) sobre una PISTA de
circuito (bloque blanco con resistencia, LED y dos vías).

  Cabeza = chip: patas a los lados, ojo LED (salida) y ojo pulso (la señal que sale del chip).
  Cuerpo = circuito: vía, resistencia en zigzag, LED y vía.
  Antena en T = TecnoAcademia (igual que TecnoBloques).

Colores institucionales SENA: verde #39A900 y azul #00304D, más blanco.
Tipografía: Atkinson Hyperlegible (libre, OFL). Se incluye en marca/fuentes/ y el texto de los
logos se convierte en trazados, así los SVG se ven igual sin tener la fuente instalada.

Uso:  python marca/generar.py      (necesita playwright + chromium, uharfbuzz y fonttools)
"""
import base64, io, pathlib
import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from playwright.sync_api import sync_playwright

RAIZ = pathlib.Path(__file__).resolve().parent.parent
M = RAIZ / 'marca'
VERDE, AZUL, BLANCO = '#39A900', '#00304D', '#FFFFFF'
VERDE_CLARO = '#5fd12a'          # el verde de «Circuito» sobre fondo oscuro (igual que TecnoBloques)

# ---------------------------------------------------------------- geometría (cuadrícula de 64)
GAP = 1.8                       # separación entre los bloques encajados (igual que TecnoBloques)
TAB_W, TAB_D, TAB_S = 8, 3, 3   # pestaña: ancho abajo, profundidad, inclinación de los lados


def f(n):
    return f'{n:.2f}'.rstrip('0').rstrip('.')


def _bloque(x, y, w, h, r, color, muesca=False, pestana=False, cx=32):
    """Bloque redondeado con muesca arriba y/o pestaña abajo (misma forma que en TecnoBloques)."""
    m = TAB_W / 2 + TAB_S
    d = f'M{f(x + r)} {f(y)}'
    if muesca:
        d += f'H{f(cx - m)}l{TAB_S} {TAB_D}h{TAB_W}l{TAB_S}-{TAB_D}'
    d += f'H{f(x + w - r)}a{f(r)} {f(r)} 0 0 1 {f(r)} {f(r)}V{f(y + h - r)}a{f(r)} {f(r)} 0 0 1-{f(r)} {f(r)}'
    if pestana:
        d += f'H{f(cx + m)}l-{TAB_S} {TAB_D}h-{TAB_W}l-{TAB_S}-{TAB_D}'
    d += f'H{f(x + r)}a{f(r)} {f(r)} 0 0 1-{f(r)}-{f(r)}V{f(y + r)}a{f(r)} {f(r)} 0 0 1 {f(r)}-{f(r)}z'
    return f'<path d="{d}" fill="{color}"/>'


def _pata(x, y, w, h, color):
    return f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" rx="{f(h / 2)}" fill="{color}"/>'


def _pista(my, color):
    """La pista del cuerpo: vía, resistencia en zigzag, LED y vía (en el lugar del </> de TecnoBloques)."""
    t = 2.4
    m = f(my)
    s = (f'<circle cx="16.8" cy="{m}" r="2.1" fill="none" stroke="{color}" stroke-width="{t}"/>'
         f'<circle cx="47.9" cy="{m}" r="2.1" fill="none" stroke="{color}" stroke-width="{t}"/>')
    # resistencia: de 19 a 34.6, con el zigzag entre 21.5 y 32.7
    s += (f'<path d="M19 {m}H21.5l1.4-3.4 2.8 6.8 2.8-6.8 2.8 6.8 1.4-3.4H34.6" stroke="{color}" stroke-width="{t}" '
          f'fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
    # LED: triángulo que apunta a una barra, y el cable hasta la vía derecha
    s += (f'<path d="M34.6 {f(my - 3.6)}l5.2 3.6-5.2 3.6z" fill="{color}" stroke="{color}" stroke-width="1" stroke-linejoin="round"/>'
          f'<path d="M40.4 {f(my - 3.8)}v7.6M40.4 {m}H44.6" stroke="{color}" stroke-width="{t}" stroke-linecap="round"/>')
    return s


def chip(cabeza, cara, cuerpo, pista, solo_cabeza=False):
    """Dibujo del símbolo (sin fondo). cabeza/cuerpo: color de cada bloque; cara: ojos; pista: trazo del circuito."""
    hx, hy, hw, hh = (9, 19, 46, 30) if solo_cabeza else (16, 12.5, 32, 20)
    k, cx = hw / 32, hx + hw / 2
    # antena en T (la misma de TecnoBloques)
    s = (f'<path d="M{f(cx - 5.5 * k)} {f(hy - 6.5 * k)}h{f(11 * k)}M{f(cx)} {f(hy - 6.5 * k)}v{f(6.5 * k)}" '
         f'stroke="{cabeza}" stroke-width="{f(3.6 * k)}" stroke-linecap="round"/>')
    # patas del chip: tres por lado (dos en la cabeza sola, para que se lean a 16 px)
    ey = hy + hh / 2
    largo, grueso = 5.4 * k, 2.8 * k
    alturas = (0.30, 0.70) if solo_cabeza else (0.24, 0.5, 0.76)
    for a in alturas:
        y = hy + hh * a - grueso / 2
        s += _pata(hx - largo + 1.5 * k, y, largo, grueso, cabeza)
        s += _pata(hx + hw - 1.5 * k, y, largo, grueso, cabeza)
    s += _bloque(hx, hy, hw, hh, 5 * k, cabeza, pestana=not solo_cabeza, cx=cx)
    # ojo LED (salida): disco con un brillo
    lx = hx + hw * 0.31
    s += f'<circle cx="{f(lx)}" cy="{f(ey)}" r="{f(5.4 * k)}" fill="{cara}"/>'
    s += f'<circle cx="{f(lx - 1.7 * k)}" cy="{f(ey - 1.7 * k)}" r="{f(1.5 * k)}" fill="{cabeza}"/>'
    # ojo pulso (la señal): onda cuadrada
    px = hx + hw * 0.69 - 5 * k
    s += (f'<path d="M{f(px)} {f(ey + 3.6 * k)}h{f(2.5 * k)}v{f(-7.2 * k)}h{f(5 * k)}v{f(7.2 * k)}h{f(2.5 * k)}" '
          f'stroke="{cara}" stroke-width="{f(2.7 * k)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
    if not solo_cabeza:
        by = hy + hh + GAP
        s += _bloque(10, by, 44, 18, 6, cuerpo, muesca=True, pestana=True, cx=cx)
        s += _pista(by + 10, pista)
    return s


def svg(dibujo, fondo=None):
    t = f'<rect width="64" height="64" rx="14" fill="{fondo}"/>' if fondo else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">{t}{dibujo}</svg>\n'


# Chip de serigrafía (MARCA-002): el chip solo, en dos colores de referencia que cada placa cambia por los suyos
# (TINTA por su serigrafía y OJOS por el color de la placa, para que los ojos se vean calados). El viewBox es la caja
# exacta del dibujo, con la antena: quien lo usa lo escala por su alto sin calcular márgenes.
TINTA_REF, OJOS_REF = '#FFFFFF', '#000000'


def chip_serigrafia():
    k = 46 / 32                                   # la cabeza sola de chip(): (9, 19, 46, 30)
    x0 = 9 - 5.4 * k + 1.5 * k                    # punta de las patas de la izquierda
    y0 = 19 - 6.5 * k - 3.6 * k / 2               # borde de arriba del trazo de la antena
    ancho, alto = 2 * (32 - x0), 19 + 30 - y0
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x0)} {f(y0)} {f(ancho)} {f(alto)}">'
            f'{chip(TINTA_REF, OJOS_REF, TINTA_REF, OJOS_REF, solo_cabeza=True)}</svg>\n')


# ---------------------------------------------------------------- variantes del símbolo
SVGS = {
    'simbolo-app.svg': svg(chip(VERDE, AZUL, BLANCO, AZUL), AZUL),               # ícono principal (fondo azul)
    'simbolo-cabeza.svg': svg(chip(VERDE, AZUL, BLANCO, AZUL, True), AZUL),      # 16-24 px y favicon
    'simbolo-sobre-claro.svg': svg(chip(VERDE, AZUL, AZUL, BLANCO)),             # sin fondo, para fondos claros
    'simbolo-sobre-oscuro.svg': svg(chip(VERDE, AZUL, BLANCO, AZUL)),            # sin fondo, para fondos oscuros
    'una-tinta-azul.svg': svg(chip(AZUL, BLANCO, AZUL, BLANCO)),                 # impresión / grabado (sobre blanco)
    'una-tinta-blanca.svg': svg(chip(BLANCO, '#202020', BLANCO, '#202020')),     # sobre fondos oscuros
}


# ---------------------------------------------------------------- texto convertido en trazados
FUENTES = M / 'fuentes'


class Fuente:
    """Atkinson Hyperlegible: da trazados SVG con el espaciado de HarfBuzz (incluye el kerning)."""

    def __init__(self, archivo):
        tt = TTFont(str(FUENTES / archivo))
        tt.flavor = None
        buf = io.BytesIO()
        tt.save(buf)
        self.tt, self.glifos = tt, tt.getGlyphSet()
        self.upem = tt['head'].unitsPerEm
        self.hb = hb.Font(hb.Face(hb.Blob(buf.getvalue())))
        self.orden = tt.getGlyphOrder()

    def _formas(self, texto):
        b = hb.Buffer()
        b.add_str(texto)
        b.guess_segment_properties()
        hb.shape(self.hb, b, {'kern': True, 'liga': False})
        return b.glyph_infos, b.glyph_positions

    def ancho(self, texto, tam, tracking=0.0):
        infos, pos = self._formas(texto)
        return sum(p.x_advance for p in pos) * tam / self.upem + tracking * len(infos)

    def trazado(self, texto, x, y, tam, color, tracking=0.0, tramos=None):
        """Devuelve <g> con el texto como path. tramos: [(n_caracteres, color)] para colorear partes."""
        infos, pos = self._formas(texto)
        esc = tam / self.upem
        cur, salida = x, []
        for i, (inf, p) in enumerate(zip(infos, pos)):
            lapiz = SVGPathPen(self.glifos)
            self.glifos[self.orden[inf.codepoint]].draw(lapiz)
            col = color
            if tramos:
                acum = 0
                for n, c in tramos:
                    acum += n
                    if i < acum:
                        col = c
                        break
            d = lapiz.getCommands()
            if d:
                salida.append(f'<path transform="translate({f(cur + p.x_offset * esc)} {f(y)}) scale({esc:.5f} {-esc:.5f})" '
                              f'd="{d}" fill="{col}"/>')
            cur += p.x_advance * esc + tracking
        return ''.join(salida)


def _anidar(simbolo_svg, x, y, lado):
    """Pone un símbolo (svg de viewBox 64) dentro de otro dibujo, sin <img>."""
    interior = simbolo_svg.split('>', 1)[1].rsplit('</svg>', 1)[0]
    return f'<g transform="translate({f(x)} {f(y)}) scale({lado / 64:.5f})">{interior}</g>'


# ---------------------------------------------------------------- logos
def logo_horizontal(c_tecno, c_circuito, c_linea, simbolo_svg):
    """Símbolo + «TecnoCircuito» + línea de respaldo. Mismas proporciones que el de TecnoBloques."""
    negrita, normal = Fuente('AtkinsonHyperlegible-Bold.woff'), Fuente('AtkinsonHyperlegible-Regular.woff')
    x0, y0, lado, hueco = 30, 24, 112, 22
    tx = x0 + lado + hueco
    ancho = max(negrita.ancho('TecnoCircuito', 72, -1), normal.ancho('TecnoAcademia Tolima · SENA', 24, 0.3))
    w, h = round(tx + ancho + 30), y0 * 2 + lado
    cuerpo = _anidar(simbolo_svg, x0, y0, lado)
    cuerpo += negrita.trazado('TecnoCircuito', tx, 88, 72, c_tecno, -1, tramos=[(5, c_tecno), (8, c_circuito)])
    cuerpo += normal.trazado('TecnoAcademia Tolima · SENA', tx, 122, 24, c_linea, 0.3)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" '
            f'role="img" aria-label="TecnoCircuito, TecnoAcademia Tolima · SENA">{cuerpo}</svg>\n'), w, h


FRASE = 'Prueba tu idea antes de armarla en la placa.'


def firma(c_tecno, c_circuito, c_linea, simbolo_svg):
    """«Hecho con:» + el logo horizontal + la frase, para la imagen que exporta el lienzo (MARCA-001).
    El logo conserva sus proporciones; la frase es una línea más en la columna del nombre."""
    negrita, normal = Fuente('AtkinsonHyperlegible-Bold.woff'), Fuente('AtkinsonHyperlegible-Regular.woff')
    m, lado, hueco = 4, 112, 22
    etiqueta = 'Hecho con:'
    sx = m + normal.ancho(etiqueta, 24, 0.3) + hueco
    tx = sx + lado + hueco
    ancho = max(negrita.ancho('TecnoCircuito', 72, -1), normal.ancho('TecnoAcademia Tolima · SENA', 24, 0.3),
                normal.ancho(FRASE, 24))
    w, h = round(tx + ancho + m), m + 132 + 8 + m
    cuerpo = normal.trazado(etiqueta, m, m + 64, 24, c_linea, 0.3)
    cuerpo += _anidar(simbolo_svg, sx, m, lado)
    cuerpo += negrita.trazado('TecnoCircuito', tx, m + 64, 72, c_tecno, -1, tramos=[(5, c_tecno), (8, c_circuito)])
    cuerpo += normal.trazado('TecnoAcademia Tolima · SENA', tx, m + 98, 24, c_linea, 0.3)
    cuerpo += normal.trazado(FRASE, tx, m + 132, 24, c_linea)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" '
            f'role="img" aria-label="Hecho con TecnoCircuito, TecnoAcademia Tolima · SENA. {FRASE}">{cuerpo}</svg>\n')


def compartir():
    """Imagen 1200 × 630 para compartir enlaces y vista previa de GitHub (Social preview)."""
    negrita, normal = Fuente('AtkinsonHyperlegible-Bold.woff'), Fuente('AtkinsonHyperlegible-Regular.woff')
    d = f'<rect width="1200" height="630" fill="{AZUL}"/>'
    d += _anidar(SVGS['simbolo-sobre-oscuro.svg'], 90, 150, 330)
    d += negrita.trazado('TecnoCircuito', 476, 262, 92, BLANCO, -1.5, tramos=[(5, BLANCO), (8, VERDE_CLARO)])
    d += normal.trazado('Simulador de electrónica y robótica.', 476, 332, 30, '#e3edf3')
    d += normal.trazado(FRASE, 476, 372, 30, '#e3edf3')
    d += normal.trazado('TecnoAcademia Tolima · SENA', 476, 444, 24, '#9fb6c6', 0.3)
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">{d}</svg>\n'


def main():
    (M / 'svg').mkdir(parents=True, exist_ok=True)
    (M / 'png').mkdir(parents=True, exist_ok=True)
    claro, w1, h1 = logo_horizontal(AZUL, VERDE, '#5b6770', SVGS['simbolo-app.svg'])
    oscuro, w2, h2 = logo_horizontal(BLANCO, VERDE_CLARO, '#b9c4cc', SVGS['simbolo-app.svg'])
    SVGS['logo-horizontal.svg'] = claro
    SVGS['logo-horizontal-oscuro.svg'] = oscuro
    SVGS['compartir.svg'] = compartir()
    SVGS['firma.svg'] = firma(AZUL, VERDE, '#5b6770', SVGS['simbolo-app.svg'])
    SVGS['chip-serigrafia.svg'] = chip_serigrafia()
    for nombre, contenido in SVGS.items():
        (M / 'svg' / nombre).write_text(contenido, encoding='utf-8', newline='\n')

    b64 = lambda s: 'data:image/svg+xml;base64,' + base64.b64encode(s.encode()).decode()
    with sync_playwright() as p:
        nav = p.chromium.launch()
        pag = nav.new_page()

        def png(s, ancho, alto, esc=1):
            pag.set_viewport_size({'width': ancho, 'height': alto})
            pag.set_content(f'<html><body style="margin:0;background:transparent"><img src="{b64(s)}" width="{ancho}" '
                            f'height="{alto}" style="display:block"></body></html>')
            return pag.screenshot(omit_background=True, clip={'x': 0, 'y': 0, 'width': ancho, 'height': alto})

        app, cabeza = SVGS['simbolo-app.svg'], SVGS['simbolo-cabeza.svg']
        # Íconos: hasta 24 px se usa solo la cabeza (el símbolo completo se vuelve una mancha)
        for t in (16, 24, 32, 48, 64, 128, 180, 256, 512, 1024):
            (M / 'png' / f'icono-{t}.png').write_bytes(png(cabeza if t <= 24 else app, t, t))
        (M / 'png' / 'logo-horizontal.png').write_bytes(png(claro, w1 * 2, h1 * 2))
        (M / 'png' / 'logo-horizontal-oscuro.png').write_bytes(png(oscuro, w2 * 2, h2 * 2))
        (M / 'png' / 'compartir.png').write_bytes(png(SVGS['compartir.svg'], 1200, 630))
        nav.close()
    print('Marca generada en', M)


if __name__ == '__main__':
    main()
