"""Auditoría propia de las transiciones de piezas. No modifica fuentes del producto.

Uso: python -I docs/verificacion-piezas-2026-10-28/diagnostico.py
Una aserción fallida es un defecto reproducido, no una regresión aprobada.
"""
import copy
import json
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
PAGE = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / 'prototipo/dist/prototipo.html'
if len(sys.argv) > 2:
    OUT = Path(sys.argv[2]).resolve()
OUT.mkdir(parents=True, exist_ok=True)
SR = 'document.querySelector("main .tecnocircuito").shadowRoot'
EMPTY = dict(formato=1, placa='uno', componentes=[], cables=[], protoboard=None)
checks, evidence, errors = [], {}, []


def check(name, ok, actual):
    checks.append(dict(caso=name, aprobado=bool(ok), observado=actual))
    print(('OK ' if ok else 'FALLO ') + name, flush=True)


with sync_playwright() as p:
    browser = p.chromium.launch()
    pg = browser.new_page(viewport=dict(width=1366, height=900))
    pg.on('pageerror', lambda e: errors.append(str(e)))
    pg.on('console', lambda e: errors.append(e.text) if e.type == 'error' else None)
    pg.goto(PAGE.as_uri())

    def open_circuit(c):
        pg.evaluate('(c) => localStorage.setItem("tecnocircuito-prototipo-0",JSON.stringify(c))', c)
        pg.reload()
        pg.wait_for_function('typeof lienzo !== "undefined" && typeof sim !== "undefined"')
        pg.wait_for_timeout(350)

    def state():
        return pg.evaluate('lienzo.circuito()')

    def resistor():
        return next(k for k in state()['componentes'] if k['id'] == 'r1')

    def saved():
        return pg.evaluate('JSON.parse(localStorage.getItem("tecnocircuito-prototipo-0"))').get('componentes', [])

    def choose_w(w):
        pg.locator('.tc-comp[data-id="r1"] [data-banda="2"]').click()
        pg.locator('select[data-prop="vatios"]').select_option(str(w))
        pg.wait_for_timeout(180)

    def drawing():
        return pg.evaluate(f'''() => {{const s={SR}.querySelector('.tc-comp[data-id="r1"] svg');
          return {{titulo:s.querySelector('title').textContent, prefijos:[...s.querySelectorAll('[id]')].map(n=>n.id),
            ficha:{SR}.querySelector('.tc-ficha').innerText, exportado:lienzo.exportarSVG()}};}}''')

    def pin(ref):
        return pg.evaluate(f'''ref => {{const b={SR}.querySelector(`.tc-pin[data-ref="${{ref}}"]`).getBoundingClientRect();
          return [b.x+b.width/2,b.y+b.height/2];}}''', ref)

    # Cambio de potencia en cuatro giros: el ancla queda fija y el callback guarda el estado final.
    for rot in (0, 90, 180, 270):
        c = copy.deepcopy(EMPTY)
        c['componentes'] = [dict(id='r1', tipo='resistencia', x=350, y=200, rot=rot,
                                props=dict(ohmios=1000, vatios=0.25))]
        open_circuit(c)
        a = pin('r1.1')
        choose_w(0.5)
        b = pin('r1.1')
        r = resistor()
        g = next(k for k in saved() if k['id'] == 'r1')
        d = drawing()
        check(f'C-ancla-guardado-{rot}', max(abs(a[i]-b[i]) for i in (0,1)) < 0.1 and r == g,
              dict(antes=a, despues=b, vivo=r, guardado=g))
        check(f'C-dibujo-05-{rot}', '½ W' in d['titulo'] and any('td-resistencia-05w-' in x for x in d['prefijos']), d['titulo'])
        choose_w(0.25)
        b = pin('r1.1')
        check(f'C-vuelta-025-{rot}', max(abs(a[i]-b[i]) for i in (0,1)) < 0.1 and '¼ W' in drawing()['titulo'], b)

    # A-01 original durante una simulación: c9 estaba aislada; c11 llega a tierra.
    c = copy.deepcopy(EMPTY)
    c['protoboard'] = dict(tipo='media', x=300, y=30)
    c['componentes'] = [dict(id='r1', tipo='resistencia', x=348, y=79.4, rot=0,
                            en={'1':'protoboard.c5','2':'protoboard.c9'}, props=dict(ohmios=100, vatios=0.25))]
    c['cables'] = [dict(de='placa.5V', a='protoboard.a5'), dict(de='placa.GND1', a='protoboard.a11')]
    open_circuit(c)
    pg.locator('#iniciar').click()
    pg.wait_for_timeout(500)
    before = pg.evaluate('sim._mediciones().resistencias.find(r=>r.id==="r1")')
    choose_w(0.5)
    pg.wait_for_timeout(500)
    after = pg.evaluate('sim._mediciones().resistencias.find(r=>r.id==="r1")')
    live = resistor()
    g = next(k for k in saved() if k['id'] == 'r1')
    check('C-A01-worker-guardado', before['w'] < 1e-6 and after['w'] > 0.2 and live == g and live['en']['2'] == 'protoboard.c11',
          dict(antes=before, despues=after, vivo=live, guardado=g))
    pg.locator('#detener').click()
    pg.wait_for_timeout(150)
    pg.reload()
    pg.wait_for_timeout(400)
    a, b = pin('r1.2'), pin('protoboard.c11')
    check('C-A01-reabrir', max(abs(a[i]-b[i]) for i in (0,1)) < 0.1, dict(pata=a,hueco=b))

    # A-01 segunda rama: destino ocupado -> se suelta y no reaparece encajada al reabrir.
    c['componentes'].append(dict(id='led1',tipo='led',x=400,y=20,rot=0,props=dict(color='rojo'),
                                en={'catodo':'protoboard.c11','anodo':'protoboard.c12'}))
    open_circuit(c)
    choose_w(0.5)
    live=resistor()
    g=next(k for k in saved() if k['id']=='r1')
    check('C-A01-suelta-guardada',not live.get('en') and live==g,dict(vivo=live,guardado=g))
    pg.reload()
    pg.wait_for_timeout(400)
    check('C-A01-suelta-reabierta',not resistor().get('en'),resistor())

    # Fuera de la suite: guardada sin vatios -> 1/2 W. Marco idéntico, cuerpo diferente.
    c=copy.deepcopy(EMPTY)
    c['componentes']=[dict(id='r1',tipo='resistencia',x=350,y=200,rot=0,props=dict(ohmios=1000))]
    open_circuit(c)
    before=drawing()
    choose_w(0.5)
    after=drawing()
    evidence['F01']={'antes':before,'despues':after,'vivo':resistor(),'guardado':saved()}
    check('F01-antigua-a-05-dibujo', '½ W' in after['titulo'] and any('td-resistencia-05w-' in x for x in after['prefijos']),
          dict(titulo=after['titulo'],props=resistor()['props'],ficha=after['ficha']))
    check('F01-antigua-a-05-exportacion', 'td-resistencia-05w-' in after['exportado'] and 'td-resistencia-025w6-' not in after['exportado'],
          dict(azul='td-resistencia-05w-' in after['exportado'],beige='td-resistencia-025w6-' in after['exportado']))
    pg.screenshot(path=str(OUT/'F01-antes-reabrir.png'))
    pg.reload()
    pg.wait_for_timeout(400)
    reopened=drawing()
    evidence['F01']['reabierto']=reopened
    check('C-F01-reabrir-corrige-vista','½ W' in reopened['titulo'] and any('td-resistencia-05w-' in x for x in reopened['prefijos']),reopened['titulo'])
    pg.screenshot(path=str(OUT/'F01-despues-reabrir.png'))
    check('C-consola',not errors,errors)
    browser.close()

(OUT/'diagnostico.json').write_text(json.dumps(dict(checks=checks,evidencia=evidence,errores=errors),ensure_ascii=False,indent=2),encoding='utf-8')
print(f'{sum(x["aprobado"] for x in checks)}/{len(checks)} conformes',flush=True)
raise SystemExit(1 if any(not x['aprobado'] for x in checks) else 0)
