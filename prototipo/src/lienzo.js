// Lienzo del prototipo 0: la placa, las piezas y los cables, sin simulación.
// Sigue la API de crearLienzo del contrato 1, para que integrarlo a TecnoBloques sea directo.
import '@wokwi/elements/dist/esm/arduino-uno-element.js';
import '@wokwi/elements/dist/esm/resistor-element.js';
import '@wokwi/elements/dist/esm/led-element.js';
import '@wokwi/elements/dist/esm/potentiometer-element.js';
import '@wokwi/elements/dist/esm/pushbutton-element.js';
import estilos from './lienzo.css';
import { PLACAS, TIPOS, COLORES_CABLE, CODIGO_COLORES, NOMBRE_COLOR, colorPorDefecto } from './catalogo.js';
import { netlistKiCad } from './kicad.js';
import { CATEGORIAS, FICHAS, buscarPiezas } from './biblioteca.js';
import { TIPOS_PROTOBOARD, dibujarProtoboard, huecos, tiraDe, rotuloHueco, encajar } from './protoboard.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
// Marca de la imagen SVG exportada (abajo a la derecha). La imagen sigue siendo de quien la hace (NOTICE).
const MARCA_SVG = 'Hecho con TecnoCircuito · SENA – TecnoAcademia Tolima';
const MARCA_ANCHO_MIN = 280; // px: la marca (unos 245 px en Arial 9) cabe aunque el circuito sea pequeño
const ORIGEN_SVG = 5000; // la capa de cables empieza en (-5000, -5000): así todo cable recibe clics
const UMBRAL_CLIC = 4; // px de pantalla: si el puntero se mueve menos, es un clic y no un arrastre
const IMAN = 8; // px de pantalla: un doblez se alinea con el punto vecino si queda así de cerca
const PASO_REJILLA = 9.6; // 0,1 pulgadas: la distancia entre pines de la placa y de la protoboard
const ESCALA_MIN = 0.4;
const ESCALA_MAX = 5;

const copia = (o) => JSON.parse(JSON.stringify(o));
const redondear = (v) => Math.round(v * 100) / 100;
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const colorHex = (nombre) =>
  COLORES_CABLE[nombre] || (/^#[0-9a-f]{3,8}$/i.test(nombre || '') ? nombre : COLORES_CABLE.verde);

export function crearLienzo(elemento, opciones = {}) {
  if (!(elemento instanceof HTMLElement)) throw new Error('crearLienzo necesita un elemento de la página.');
  const placa = opciones.placa || 'uno';
  if (!PLACAS[placa]) throw new Error(`Este prototipo no dibuja la placa «${placa}».`);
  const soloLectura = !!opciones.soloLectura;
  const alEvento = typeof opciones.alEvento === 'function' ? opciones.alEvento : null;
  const oyentes = [];
  const datos = normalizar(opciones.circuito, placa);

  // El lienzo vive en un shadow DOM para que el CSS de TecnoBloques no lo afecte.
  const host = document.createElement('div');
  host.className = 'tecnocircuito';
  elemento.appendChild(host);
  const raiz = host.attachShadow({ mode: 'open' });
  raiz.innerHTML = `<style>${estilos}</style>
<div class="tc">
  <div class="tc-barra">
    <div class="tc-grupo tc-agregar">
      <button type="button" data-accion="menu" aria-haspopup="menu" aria-expanded="false">+ Agregar</button>
    </div>
    <div class="tc-sel"></div>
    <div class="tc-grupo">
      <button type="button" data-accion="alejar" title="Alejar" aria-label="Alejar">−</button>
      <button type="button" data-accion="encuadrar" title="Ver todo el circuito">Ver todo</button>
      <button type="button" data-accion="acercar" title="Acercar" aria-label="Acercar">+</button>
    </div>
  </div>
  <div class="tc-area" tabindex="0">
    <div class="tc-mundo">
      <div class="tc-capa-comp"></div>
      <svg class="tc-capa-cables"><g transform="translate(${ORIGEN_SVG} ${ORIGEN_SVG})"><g class="tc-cables"></g><g class="tc-asas"></g><g class="tc-previa"><path class="tc-cable-borde"/><path class="tc-cable-linea"/></g></g></svg>
      <div class="tc-capa-pines"></div>
    </div>
    <div class="tc-tip" hidden></div>
    <div class="tc-ayuda" aria-live="polite"></div>
  </div>
  <div class="tc-menu tc-biblioteca" role="dialog" aria-label="Piezas" hidden>
    <div class="tc-bib-cabeza">
      <b>Piezas</b>
      <button type="button" class="tc-cerrar" data-accion="cerrar" aria-label="Cerrar las piezas" title="Cerrar (Esc)">×</button>
    </div>
    <input type="search" class="tc-buscar" placeholder="Buscar: motor, luz, pila…" aria-label="Buscar una pieza" autocomplete="off">
    <div class="tc-bib-lista"></div>
    <p class="tc-bib-vacio" hidden></p>
    <p class="tc-bib-ayuda">Clic: la pieza aparece en el centro · Arrástrala para ponerla donde quieras</p>
  </div>
  <div class="tc-ficha" hidden></div>
</div>
</div>`;
  const $ = (s) => raiz.querySelector(s);
  const tc = $('.tc');
  const barra = $('.tc-barra');
  const menu = $('.tc-biblioteca');
  const buscador = $('.tc-buscar');
  const bibLista = $('.tc-bib-lista');
  const bibVacio = $('.tc-bib-vacio');
  const ficha = $('.tc-ficha');
  const botonMenu = barra.querySelector('[data-accion="menu"]');
  const barraSel = $('.tc-sel');
  const area = $('.tc-area');
  const mundo = $('.tc-mundo');
  const capaComp = $('.tc-capa-comp');
  const capaPines = $('.tc-capa-pines');
  const gCables = $('.tc-cables');
  const gAsas = $('.tc-asas'); // los dobleces del cable elegido, encima de todos los cables
  const [previaBorde, previaLinea] = $('.tc-previa').children;
  const ayuda = $('.tc-ayuda');
  const tip = $('.tc-tip');

  const camara = { px: 0, py: 0, escala: 1.5 };
  const vistas = new Map(); // id → { id, def, div, el, w, h, pines: Map(nombre → { px, py, div }), lista }
  const graficos = new Map(); // cable → { g, borde, linea, p0, p1, toque, asas }
  let sel = null; // { tipo: 'comp', id } | { tipo: 'cable', cable }
  let trazando = null; // { de, puntos: [{ x, y }], cursor, destino }
  let gesto = null; // lo que hace el puntero mientras está presionado
  let tipRef = null;
  let tAviso = null;
  let listo = false;
  let encuadrado = false;
  let camaraManual = false; // el aprendiz movió o acercó la vista: ya no se re-encuadra sola
  let tamanoEncuadre = null; // tamaño del área cuando se encuadró por última vez
  let destruido = false;
  let vistaSim = { simulando: false, leds: {}, quemados: [], voltajes: {}, placa: {}, servos: {}, piezas: {} }; // lo que el simulador pide mostrar
  const pulsados = new Set(); // botones presionados con el mouse ahora
  const oyentesPulsar = []; // el simulador escucha aquí los botones (no cambian el circuito guardado)
  const oyentesMano = []; // y aquí «la mano»: el pin o el cable que tiene el mouse encima
  let manoClave = ''; // lo último avisado, para avisar solo cuando cambia

  const componente = (id) => datos.componentes.find((c) => c.id === id);
  // La placa está fija en el origen; la protoboard es un objeto aparte del circuito (no está en componentes).
  const pieza = (id) => (id === 'protoboard' ? datos.protoboard : componente(id));
  // Una pieza «montada» (la shield) va encima de la placa, en su mismo lugar.
  const montada = (c) => !!(c && TIPOS[c.tipo] && TIPOS[c.tipo].montada);
  const lugar = (id) => (id === 'placa' || montada(componente(id)) ? { x: 0, y: 0, rot: 0 } : pieza(id));

  // ---- Piezas

  function crearVista(id, tipo, props) {
    const def = id === 'placa' ? PLACAS[placa] : TIPOS[tipo];
    const div = document.createElement('div');
    div.className = 'tc-comp' + (id === 'placa' ? ' tc-placa' : '');
    div.dataset.id = id;
    if (tipo) div.dataset.tipo = tipo;
    let el;
    if (def && def.dibujo) {
      // Pieza Tecno: su dibujo es un SVG propio (src/piezas/), con el tamaño y los pines que trae la definición.
      const plantilla = document.createElement('template');
      plantilla.innerHTML = def.dibujo.svg(props);
      el = plantilla.content.firstElementChild;
    } else if (def) {
      el = document.createElement(def.etiqueta);
      if (def.aplicar) def.aplicar(el, props);
      if (def.perilla) el.addEventListener('input', () => girarPerilla(id, Number(el.value) / 100));
    } else {
      // Pieza de una versión más nueva: se muestra y se conserva, pero no se dibuja.
      el = document.createElement('div');
      el.className = 'tc-desconocido';
      el.textContent = `¿${tipo}?`;
      el.title = 'Esta pieza es de una versión más nueva de TecnoCircuito.';
    }
    div.appendChild(el);
    // Una pieza montada (la shield) va justo encima de la placa: debajo de la protoboard y de las demás piezas.
    const vPlaca = vistas.get('placa');
    if (def && def.montada && vPlaca) capaComp.insertBefore(div, vPlaca.div.nextSibling);
    else capaComp.appendChild(div);
    const vista = { id, def, div, el, w: 64, h: 40, pines: new Map(), lista: false };
    vistas.set(id, vista);
    return Promise.resolve(el.updateComplete).then(() => {
      if (vistas.get(id) !== vista) return; // la quitaron mientras se dibujaba
      if (def && def.dibujo) {
        const marco = def.dibujo.marco ? def.dibujo.marco(props) : def.dibujo;
        Object.assign(vista, { w: marco.ancho, h: marco.alto });
        for (const [nombre, p] of Object.entries(marco.pines)) {
          const marca = document.createElement('div');
          marca.className = 'tc-pin';
          marca.dataset.ref = `${id}.${nombre}`;
          capaPines.appendChild(marca);
          vista.pines.set(nombre, { px: p.x, py: p.y, div: marca });
        }
      } else if (def) {
        Object.assign(vista, tamanoNatural(el));
        for (const p of el.pinInfo || []) {
          const nombre = def.nombrePin(p.name);
          if (!nombre) continue;
          const marca = document.createElement('div');
          marca.className = 'tc-pin';
          marca.dataset.ref = `${id}.${nombre}`;
          capaPines.appendChild(marca);
          vista.pines.set(nombre, { px: p.x, py: p.y, div: marca });
        }
      }
      vista.lista = true;
      ubicar(vista);
      aplicarSim(vista);
    });
  }

  // La protoboard: su dibujo va debajo de las piezas y cada hueco es un punto de conexión (como un pin).
  function crearVistaProtoboard() {
    const tipo = datos.protoboard.tipo;
    const t = TIPOS_PROTOBOARD[tipo] || TIPOS_PROTOBOARD.media;
    const div = document.createElement('div');
    div.className = 'tc-comp tc-protoboard';
    div.dataset.id = 'protoboard';
    div.dataset.tipo = 'protoboard';
    const plantilla = document.createElement('template');
    plantilla.innerHTML = dibujarProtoboard(tipo);
    const el = plantilla.content.firstElementChild;
    div.appendChild(el);
    const vPlaca = vistas.get('placa');
    capaComp.insertBefore(div, vPlaca ? vPlaca.div.nextSibling : capaComp.firstChild);
    const vista = { id: 'protoboard', def: { protoboard: true }, div, el, w: t.ancho, h: t.alto, pines: new Map(), lista: true };
    // Los huecos van dentro del dibujo de la protoboard, no en la capa de pines: así quedan debajo de las piezas
    // (un clic en el cuerpo de una pieza es de la pieza) y se mueven solos con la protoboard.
    for (const h of huecos(tipo)) {
      const marca = document.createElement('div');
      marca.className = 'tc-pin tc-hueco';
      marca.dataset.ref = 'protoboard.' + h.nombre;
      marca.style.left = h.x + 'px';
      marca.style.top = h.y + 'px';
      div.appendChild(marca);
      vista.pines.set(h.nombre, { px: h.x, py: h.y, div: marca });
    }
    vistas.set('protoboard', vista);
    ubicar(vista);
    marcarOcupados();
    return Promise.resolve();
  }

  function agregarProtoboard(punto = null) {
    if (datos.protoboard) return;
    // A la derecha de lo que ya hay, a la altura de la placa: donde suele estar en la mesa. O donde se soltó.
    const caja = cajaDelCircuito();
    const t = TIPOS_PROTOBOARD.media;
    datos.protoboard = punto
      ? { tipo: 'media', x: Math.round(punto.x - t.ancho / 2), y: Math.round(punto.y - t.alto / 2) }
      : { tipo: 'media', x: Math.round(Math.max(300, caja ? caja.x1 + 30 : 300)), y: 30 };
    crearVistaProtoboard();
    pintarAgregar();
    emitir('componente_agregado', { id: 'protoboard', tipo: 'protoboard' });
    seleccionar({ tipo: 'comp', id: 'protoboard' });
    if (!camaraManual && !punto) encuadrar();
    cambio();
  }

  // «+ Protoboard» solo aparece si todavía no hay una.
  function pintarAgregar() {
    const b = menu.querySelector('[data-accion="protoboard"]');
    if (!b) return; // en solo lectura no hay biblioteca
    b.disabled = !!datos.protoboard;
    b.title = datos.protoboard ? 'Ya hay una protoboard' : '';
    // Las piezas montadas sobre la placa (la shield) van una sola vez.
    for (const [tipo, def] of Object.entries(TIPOS)) {
      if (!def.montada) continue;
      const m = menu.querySelector(`[data-tipo="${tipo}"]`);
      const hay = datos.componentes.some((k) => k.tipo === tipo);
      if (m) Object.assign(m, { disabled: hay, title: hay ? `Ya hay una ${def.nombre}` : '' });
    }
  }

  // ---- Encaje de las patas en la protoboard

  function patasSobreProtoboard(c) {
    const v = vistas.get(c.id);
    const pb = datos.protoboard;
    if (!v || !v.lista || !pb || !v.pines.size) return null;
    return [...v.pines].map(([nombre, p]) => {
      const q = girarPunto(v, c, p);
      return { nombre, x: q.x - pb.x, y: q.y - pb.y };
    });
  }

  function huecosOcupados(salvo) {
    const r = new Set();
    for (const k of datos.componentes) if (k !== salvo && k.en) for (const ref of Object.values(k.en)) r.add(ref.slice('protoboard.'.length));
    return r;
  }

  function calcularEncaje(c) {
    const patas = patasSobreProtoboard(c);
    return patas ? encajar(patas, { tipo: datos.protoboard.tipo, ocupados: huecosOcupados(c) }) : null;
  }

  // Al soltar una pieza: si todas sus patas caen en huecos libres, queda encajada (justo en los huecos) y su
  // campo «en» dice qué pata va en qué hueco. Si no, queda suelta y sin «en».
  function encajarPieza(c) {
    if (montada(c)) return false; // la shield va sobre el Uno, nunca en la protoboard
    const r = calcularEncaje(c);
    if (r) {
      c.x = redondear(c.x + r.dx);
      c.y = redondear(c.y + r.dy);
      c.en = Object.fromEntries(Object.entries(r.en).map(([pata, h]) => [pata, 'protoboard.' + h]));
    } else {
      delete c.en;
    }
    ubicar(vistas.get(c.id));
    marcarOcupados();
    dibujarCables();
    return !!r;
  }

  // Mientras se arrastra una pieza sobre la protoboard, se ven en verde los huecos donde quedaría.
  let destinos = [];
  function mostrarDestino(c) {
    limpiarDestino();
    const r = datos.protoboard && calcularEncaje(c);
    const v = vistas.get('protoboard');
    if (!r || !v) return;
    destinos = Object.values(r.en).map((h) => v.pines.get(h).div);
    destinos.forEach((d) => d.classList.add('tc-destino'));
  }
  function limpiarDestino() {
    destinos.forEach((d) => d.classList.remove('tc-destino'));
    destinos = [];
  }

  // Un hueco con una pata encajada no recibe clics: se cablea la pata, que está encima (y es el mismo nodo).
  function marcarOcupados() {
    const v = vistas.get('protoboard');
    if (!v) return;
    const ocupados = huecosOcupados(null);
    for (const [nombre, p] of v.pines) p.div.classList.toggle('tc-ocupado', ocupados.has(nombre));
  }

  // Al pasar por un hueco (o por una pata encajada), se ilumina toda su tira: lo que está unido por dentro.
  let tiraIluminada = [];
  function iluminarTira(ref) {
    tiraIluminada.forEach((d) => d.classList.remove('tc-tira'));
    tiraIluminada = [];
    const v = vistas.get('protoboard');
    if (!ref || !v) return;
    const [id, pin] = partirRef(ref);
    let hueco = id === 'protoboard' ? pin : null;
    if (!hueco) {
      const c = componente(id);
      if (c && c.en && c.en[pin]) hueco = c.en[pin].slice('protoboard.'.length);
    }
    if (!hueco) return;
    const tira = tiraDe(hueco);
    for (const [nombre, p] of v.pines) {
      if (tiraDe(nombre) === tira) {
        p.div.classList.add('tc-tira');
        tiraIluminada.push(p.div);
      }
    }
  }

  // Prende o apaga en el dibujo lo que indica el simulador. Solo toca el dibujo, nunca `datos`.
  function aplicarSim(v) {
    if (v.id === 'placa') {
      for (const led of ['ledPower', 'led13', 'ledTX', 'ledRX']) v.el[led] = !!vistaSim.placa[led];
    } else if (v.def === TIPOS.led) {
      const brillo = Number(vistaSim.leds[v.id]) || 0; // 0 a 1, según la corriente
      v.el.value = brillo > 0.005;
      v.el.brightness = brillo;
      v.div.classList.toggle('tc-quemado', vistaSim.quemados.includes(v.id));
    } else if (v.def && v.def.mostrar) {
      const estado = vistaSim.simulando ? vistaSim.piezas[v.id] || vistaSim.servos[v.id] || null : null;
      v.def.mostrar(v.el, estado, (componente(v.id) || {}).props);
    }
  }

  // Tamaño del dibujo sin depender del diseño de la página: así funciona aunque el panel esté oculto.
  function tamanoNatural(el) {
    const svg = el.shadowRoot && el.shadowRoot.querySelector('svg');
    const w = svg && medida(svg.getAttribute('width'));
    const h = svg && medida(svg.getAttribute('height'));
    return w && h ? { w, h } : { w: el.offsetWidth || 64, h: el.offsetHeight || 40 };
  }

  function ubicar(v) {
    if (!v) return;
    const c = lugar(v.id);
    if (!c) return;
    Object.assign(v.div.style, {
      left: c.x + 'px',
      top: c.y + 'px',
      width: v.w + 'px',
      height: v.h + 'px',
      transform: c.rot ? `rotate(${c.rot}deg)` : '',
    });
    if (v.id === 'protoboard') return; // sus huecos están dentro de su dibujo: se mueven con él
    for (const p of v.pines.values()) {
      const q = girarPunto(v, c, p);
      p.div.style.left = q.x + 'px';
      p.div.style.top = q.y + 'px';
    }
  }

  // Posición de un pin en el mundo. CSS gira la pieza alrededor de su centro; aquí se hace lo mismo.
  function girarPunto(v, c, p) {
    const rot = (((c.rot || 0) % 360) + 360) % 360;
    if (!rot) return { x: c.x + p.px, y: c.y + p.py };
    const a = (rot * Math.PI) / 180;
    const cos = Math.round(Math.cos(a) * 1e9) / 1e9;
    const sin = Math.round(Math.sin(a) * 1e9) / 1e9;
    const cx = v.w / 2;
    const cy = v.h / 2;
    const dx = p.px - cx;
    const dy = p.py - cy;
    return { x: redondear(c.x + cx + dx * cos - dy * sin), y: redondear(c.y + cy + dx * sin + dy * cos) };
  }

  function partirRef(ref) {
    const i = ref.indexOf('.');
    return i > 0 ? [ref.slice(0, i), ref.slice(i + 1)] : [ref, ''];
  }

  function posicion(ref) {
    const [id, pin] = partirRef(ref);
    const v = vistas.get(id);
    if (!v || !v.lista) return null;
    const c = lugar(id);
    const p = v.pines.get(pin);
    if (p) return girarPunto(v, c, p);
    return v.def ? null : { x: c.x + v.w / 2, y: c.y + v.h / 2 }; // pieza desconocida: al centro
  }

  function pinDe(ref) {
    const [id, pin] = partirRef(ref);
    const v = vistas.get(id);
    return v && v.pines.get(pin);
  }

  // ---- Cables

  function puntosDe(cable) {
    const a = posicion(cable.de);
    const b = posicion(cable.a);
    if (!a || !b) return null;
    return [a, ...(cable.puntos || []).map(([x, y]) => ({ x, y })), b];
  }

  function svg(tipo, atributos, padre) {
    const e = document.createElementNS(SVG_NS, tipo);
    for (const k in atributos) e.setAttribute(k, atributos[k]);
    padre.appendChild(e);
    return e;
  }

  // Sincroniza el SVG con los datos sin reemplazar los trazos, para no romper el doble clic.
  function dibujarCables() {
    for (const [cable, gr] of graficos) {
      if (!datos.cables.includes(cable)) {
        gr.g.remove();
        gr.asas.forEach((asa) => asa.remove());
        graficos.delete(cable);
      }
    }
    datos.cables.forEach((cable, i) => {
      let gr = graficos.get(cable);
      if (!gr) {
        const g = svg('g', { class: 'tc-cable' }, gCables);
        gr = {
          g,
          borde: svg('path', { class: 'tc-cable-borde' }, g),
          linea: svg('path', { class: 'tc-cable-linea' }, g),
          p0: svg('circle', { class: 'tc-punta', r: 2.4 }, g),
          p1: svg('circle', { class: 'tc-punta', r: 2.4 }, g),
          toque: svg('path', { class: 'tc-cable-toque' }, g),
          asas: [],
        };
        graficos.set(cable, gr);
      }
      const pts = puntosDe(cable);
      gr.g.style.display = pts ? '' : 'none';
      if (!pts) return;
      const d = trazo(pts);
      const color = colorHex(cable.color);
      for (const p of [gr.borde, gr.linea, gr.toque]) p.setAttribute('d', d);
      gr.linea.setAttribute('stroke', color);
      gr.toque.dataset.i = i;
      punta(gr.p0, pts[0], color);
      punta(gr.p1, pts[pts.length - 1], color);
      const elegido = !!(sel && sel.tipo === 'cable' && sel.cable === cable);
      gr.g.classList.toggle('tc-seleccionado', elegido);
      if (elegido && gCables.lastChild !== gr.g) gCables.appendChild(gr.g); // el cable elegido pasa al frente
      const n = elegido ? (cable.puntos || []).length : 0;
      while (gr.asas.length > n) gr.asas.pop().remove();
      while (gr.asas.length < n) gr.asas.push(svg('circle', { class: 'tc-asa', r: 3.6 }, gAsas));
      gr.asas.forEach((asa, k) => {
        asa.setAttribute('cx', cable.puntos[k][0]);
        asa.setAttribute('cy', cable.puntos[k][1]);
        asa.dataset.i = i;
        asa.dataset.p = k;
      });
    });
  }

  function punta(circulo, p, color) {
    circulo.setAttribute('cx', p.x);
    circulo.setAttribute('cy', p.y);
    circulo.setAttribute('fill', color);
  }

  function dibujarPrevia() {
    const a = trazando && posicion(trazando.de);
    if (!a) {
      previaBorde.setAttribute('d', '');
      previaLinea.setAttribute('d', '');
      return;
    }
    const puntos = trazando.puntos.map((p) => ({ ...p }));
    const ultimo = puntos.length ? puntos[puntos.length - 1] : a;
    let fin = trazando.cursor ? alinear(trazando.cursor, ultimo) : ultimo;
    const destino = trazando.destino && posicion(trazando.destino);
    if (destino) {
      fin = destino;
      ajustarFinal(puntos, a, destino);
    }
    const d = trazo([a, ...puntos, fin]);
    previaBorde.setAttribute('d', d);
    previaLinea.setAttribute('d', d);
    previaLinea.setAttribute('stroke', colorHex(colorDelTrazo()));
  }

  // Color del cable a medio dibujar: el que eligió el aprendiz (tecla o muestra) o el de la convención del aula.
  function colorDelTrazo() {
    return trazando.color || colorPorDefecto(trazando.de, trazando.destino || '');
  }

  // Un doblez que queda casi en línea con el punto anterior se endereza.
  function alinear(p, previo) {
    const iman = IMAN / camara.escala;
    return {
      x: redondear(Math.abs(p.x - previo.x) < iman ? previo.x : p.x),
      y: redondear(Math.abs(p.y - previo.y) < iman ? previo.y : p.y),
    };
  }

  // Al llegar al pin final, el último tramo también se endereza si quedó casi recto.
  function ajustarFinal(puntos, inicio, destino) {
    if (!puntos.length) return;
    const iman = IMAN / camara.escala;
    const b = puntos[puntos.length - 1];
    const p = puntos.length > 1 ? puntos[puntos.length - 2] : inicio;
    if (Math.abs(b.y - destino.y) < iman && b.y !== p.y) b.y = destino.y;
    if (Math.abs(b.x - destino.x) < iman && b.x !== p.x) b.x = destino.x;
  }

  function empezarCable(ref) {
    seleccionar(null);
    trazando = { de: ref, puntos: [], cursor: null, destino: null, color: null };
    tc.classList.add('tc-dibujando');
    marcarPin(ref, true);
    dibujarPrevia();
    pintarBarra(); // las muestras de color también sirven mientras se dibuja
    actualizarAyuda();
  }

  function cancelarCable() {
    if (!trazando) return;
    marcarPin(trazando.de, false);
    trazando = null;
    tc.classList.remove('tc-dibujando');
    dibujarPrevia();
    pintarBarra();
    actualizarAyuda();
  }

  // Cambia el color del cable que se está dibujando o del cable elegido (muestra o tecla 0 a 9).
  function ponerColor(nombre) {
    if (!COLORES_CABLE[nombre]) return;
    if (trazando) {
      trazando.color = nombre;
      dibujarPrevia();
    } else if (sel && sel.tipo === 'cable') {
      if (sel.cable.color === nombre) return;
      sel.cable.color = nombre;
      dibujarCables();
      cambio();
    } else {
      return;
    }
    pintarBarra();
  }

  function terminarCable(ref) {
    const t = trazando;
    if (!t) return;
    if (ref === t.de) return cancelarCable(); // clic otra vez en el pin de salida: se arrepintió
    const inicio = posicion(t.de);
    const destino = posicion(ref);
    if (inicio && destino) ajustarFinal(t.puntos, inicio, destino);
    cancelarCable();
    if (datos.cables.some((c) => (c.de === t.de && c.a === ref) || (c.de === ref && c.a === t.de))) {
      avisar('Esos dos pines ya están unidos.');
      return;
    }
    const cable = { de: t.de, a: ref, color: t.color || colorPorDefecto(t.de, ref) };
    if (t.puntos.length) cable.puntos = t.puntos.map((p) => [redondear(p.x), redondear(p.y)]);
    datos.cables.push(cable);
    emitir('cable_agregado', { de: cable.de, a: cable.a });
    seleccionar({ tipo: 'cable', cable });
    cambio();
  }

  function agregarPunto(p) {
    const previo = trazando.puntos.length ? trazando.puntos[trazando.puntos.length - 1] : posicion(trazando.de);
    trazando.puntos.push(previo ? alinear(p, previo) : p);
    dibujarPrevia();
    actualizarAyuda();
  }

  function quitarPunto() {
    if (!trazando || !trazando.puntos.length) return;
    trazando.puntos.pop();
    dibujarPrevia();
    actualizarAyuda();
  }

  function marcarPin(ref, si) {
    const p = pinDe(ref);
    if (p) p.div.classList.toggle('tc-activo', si);
  }

  function quitarCable(cable) {
    datos.cables = datos.cables.filter((k) => k !== cable);
    emitir('cable_quitado', { de: cable.de, a: cable.a });
  }

  // ---- Selección y acciones

  function seleccionar(s) {
    sel = s;
    for (const v of vistas.values()) {
      v.div.classList.toggle('tc-seleccionado', !!s && s.tipo === 'comp' && s.id === v.id);
    }
    dibujarCables();
    pintarBarra();
    actualizarAyuda();
  }

  function pintarBarra() {
    pintarFicha();
    barraSel.textContent = '';
    if (soloLectura || (!sel && !trazando)) return;
    const agregar = (html) => barraSel.insertAdjacentHTML('beforeend', html);
    // Las diez muestras, en el orden del código de colores, con su número (la tecla que las elige).
    const muestras = (activo) =>
      CODIGO_COLORES.forEach((nombre, numero) => {
        const hex = COLORES_CABLE[nombre];
        const texto = NOMBRE_COLOR[nombre] || nombre;
        agregar(
          `<button type="button" class="tc-muestra${activo === nombre ? ' tc-activa' : ''}" data-accion="color" data-color="${nombre}" ` +
            `title="${numero} · ${texto}" aria-label="Cable ${texto} (tecla ${numero})" style="background:${hex};color:${tintaSobre(hex)}">${numero}</button>`,
        );
      });
    if (trazando) {
      agregar('<span class="tc-etiqueta">Cable nuevo</span>');
      muestras(colorDelTrazo());
      return;
    }
    if (sel.tipo === 'cable') {
      agregar('<span class="tc-etiqueta">Cable</span>');
      muestras(sel.cable.color);
    } else if (sel.id === 'protoboard') {
      agregar(`<span class="tc-etiqueta">${(TIPOS_PROTOBOARD[datos.protoboard.tipo] || TIPOS_PROTOBOARD.media).nombre}</span>`);
    } else {
      const c = componente(sel.id);
      const def = TIPOS[c.tipo];
      const v = vistas.get(c.id);
      agregar(`<span class="tc-etiqueta">${def ? def.nombre : 'Pieza desconocida'}</span>`);
      if (!montada(c)) agregar('<button type="button" data-accion="girar">Girar</button>');
    }
    agregar('<button type="button" data-accion="borrar">Borrar</button>');
  }

  // ---- Ficha de la pieza elegida: para qué sirve, sus propiedades, sus datos y si su modelo ya se probó con la placa real.

  // Plegada, la ficha muestra solo el nombre y las propiedades; abierta, también para qué sirve, los datos y la
  // validación. Empieza abierta si el lienzo es ancho; después queda como la dejó el aprendiz.
  let fichaAbierta = null;
  const escapar = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  function pintarFicha() {
    const tipo = sel && sel.tipo === 'comp' && !trazando ? (sel.id === 'protoboard' ? 'protoboard' : (componente(sel.id) || {}).tipo) : null;
    const f = tipo && FICHAS[tipo];
    ficha.hidden = !f || !menu.hidden; // con el panel de piezas abierto, la ficha no se muestra
    if (!f) return (ficha.textContent = '');
    if (fichaAbierta === null && area.clientWidth) fichaAbierta = area.clientWidth >= 900;
    const abierta = fichaAbierta !== false;
    const c = sel.id === 'protoboard' ? null : componente(sel.id);
    const def = c && TIPOS[c.tipo];
    const v = c && vistas.get(c.id);
    let props = '';
    if (c && def && !soloLectura) {
      for (const campo of def.campos || (def.campo ? [def.campo] : [])) {
        const actual = String(c.props[campo.prop]);
        const opciones = campo.opciones
          .map(([valor, texto]) => `<option value="${valor}"${actual === String(valor) ? ' selected' : ''}>${texto}</option>`)
          .join('');
        props += `<label class="tc-campo">${campo.etiqueta} <select data-prop="${campo.prop}">${opciones}</select></label>`;
      }
      if (def.perilla) {
        const valor = Math.round((Number(c.props[def.perilla.prop]) || 0) * 100);
        props += `<label class="tc-campo">${def.perilla.etiqueta} <input type="range" min="0" max="100" value="${valor}" data-perilla aria-label="${def.perilla.etiqueta} del potenciómetro"></label>`;
      }
      if (c.tipo === 'led') {
        const encendido = v && v.el.value ? ' checked' : '';
        props += `<label class="tc-check"><input type="checkbox" data-accion="encender"${encendido}> Ver encendido</label>`;
      }
    }
    ficha.innerHTML =
      `<button type="button" class="tc-ficha-titulo" data-accion="ficha" aria-expanded="${abierta}" aria-label="Ficha de ${escapar(f.nombre)}: ${abierta ? 'ocultar los detalles' : 'ver los detalles'}">` +
      `<span>${escapar(f.nombre)}${c ? ` <small>${escapar(c.id)}</small>` : ''}</span><span class="tc-ficha-flecha">${abierta ? 'menos ▴' : 'detalles ▾'}</span></button>` +
      `<div class="tc-ficha-cuerpo"${abierta || props ? '' : ' hidden'}>` +
      `<p class="tc-ficha-desc tc-ficha-info"${abierta ? '' : ' hidden'}>${escapar(f.descripcion)}</p>` +
      (props ? `<div class="tc-ficha-props">${props}</div>` : '') +
      `<div class="tc-ficha-datos tc-ficha-info"${abierta ? '' : ' hidden'}></div>` +
      `</div>`;
    pintarDatosFicha();
    ubicarFicha();
  }

  // La ficha va del lado contrario a la pieza elegida, para no taparla.
  function ubicarFicha() {
    if (ficha.hidden || !sel) return;
    const v = vistas.get(sel.id);
    const p = sel.id === 'protoboard' ? datos.protoboard : componente(sel.id);
    let izquierda = false;
    if (v && p) {
      const centro = camara.px + (p.x + v.w / 2) * camara.escala;
      izquierda = centro > area.clientWidth / 2;
    }
    ficha.classList.toggle('tc-ficha-izq', izquierda);
  }

  // Los datos dependen de las propiedades (el modelo del servo, la carga de la batería): se rehacen al cambiarlas.
  function pintarDatosFicha() {
    const caja = ficha.querySelector('.tc-ficha-datos');
    if (!caja || !sel) return;
    const tipo = sel.id === 'protoboard' ? 'protoboard' : (componente(sel.id) || {}).tipo;
    const f = FICHAS[tipo];
    if (!f) return;
    const props = sel.id === 'protoboard' ? {} : componente(sel.id).props || {};
    const val = f.validacion(props);
    caja.innerHTML =
      `<dl>${f.datos(props).map(([k, d]) => `<dt>${escapar(k)}</dt><dd>${escapar(d)}</dd>`).join('')}</dl>` +
      `<p class="tc-ficha-pines"><b>Pines:</b> ${escapar(f.pines)}</p>` +
      (val
        ? `<p class="tc-ficha-val ${val.estado === 'validado' ? 'tc-validado' : 'tc-por-validar'}">` +
          `<b>${val.estado === 'validado' ? '✓ Probado con la placa real' : '◐ Por probar con la placa real'}</b> ${escapar(val.texto)}</p>`
        : '');
  }

  ficha.addEventListener('click', (e) => {
    if (!e.target.closest('[data-accion="ficha"]')) return;
    fichaAbierta = fichaAbierta === false;
    pintarFicha();
    ficha.querySelector('.tc-ficha-titulo').focus(); // el botón se rehízo: el foco (y las teclas) siguen ahí
  });

  // ---- Biblioteca de piezas («+ Agregar»): por categorías, con buscador, clic para agregar o arrastrar al lienzo.

  let bibliotecaLista = false;
  function armarBiblioteca() {
    if (bibliotecaLista) return;
    bibliotecaLista = true;
    for (const cat of CATEGORIAS) {
      const grupo = document.createElement('div');
      grupo.className = 'tc-bib-cat';
      grupo.innerHTML = `<div class="tc-bib-titulo">${cat.nombre}</div>`;
      for (const tipo of cat.piezas) {
        const f = FICHAS[tipo];
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'tc-pieza';
        b.dataset.accion = tipo === 'protoboard' ? 'protoboard' : 'agregar';
        if (tipo !== 'protoboard') b.dataset.tipo = tipo;
        b.dataset.pieza = tipo;
        b.setAttribute('aria-label', f.nombre);
        b.innerHTML = `<span class="tc-mini"></span><span class="tc-pieza-texto"><b>${escapar(f.nombre)}</b><small>${escapar(f.descripcion.split('. ')[0].replace(/\.$/, ''))}</small></span>`;
        b.querySelector('.tc-mini').append(miniatura(tipo));
        grupo.append(b);
      }
      bibLista.append(grupo);
    }
  }

  // El dibujo de la pieza en chico: el SVG de las piezas Tecno y de la protoboard, o el elemento de Wokwi reducido.
  function miniatura(tipo) {
    const plantilla = document.createElement('template');
    if (tipo === 'protoboard') {
      plantilla.innerHTML = dibujarProtoboard('media');
      return plantilla.content.firstElementChild;
    }
    const def = TIPOS[tipo];
    if (def.dibujo) {
      plantilla.innerHTML = def.dibujo.svg(tipo === 'motor_tt' ? { ...def.props, vista: 'rueda' } : def.props);
      return plantilla.content.firstElementChild;
    }
    const el = document.createElement(def.etiqueta);
    if (def.aplicar) def.aplicar(el, copia(def.props));
    Promise.resolve(el.updateComplete).then(() => {
      const t = tamanoNatural(el);
      el.style.zoom = String(Math.min(1, 58 / t.w, 42 / t.h));
    });
    el.inert = true; // es un dibujo: la perilla de la miniatura no se gira
    return el;
  }

  function filtrarBiblioteca() {
    const quedan = new Set(buscarPiezas(buscador.value).map((x) => x.tipo));
    for (const b of bibLista.querySelectorAll('.tc-pieza')) b.hidden = !quedan.has(b.dataset.pieza);
    for (const g of bibLista.querySelectorAll('.tc-bib-cat')) g.hidden = !g.querySelector('.tc-pieza:not([hidden])');
    bibVacio.hidden = quedan.size > 0;
    bibVacio.textContent = quedan.size ? '' : `No hay piezas con «${buscador.value.trim()}». Prueba con otra palabra: motor, luz, pila…`;
  }
  buscador.addEventListener('input', filtrarBiblioteca);
  buscador.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const primera = bibLista.querySelector('.tc-pieza:not([hidden]):not([disabled])');
    if (primera) primera.click(); // Enter agrega la primera que quedó
  });

  // Arrastrar una pieza desde la biblioteca: un fantasma sigue al puntero y, al soltar sobre el lienzo, la pieza
  // queda ahí (y se encaja si cae sobre la protoboard).
  let arrastre = null;
  let ignorarClic = false;
  menu.addEventListener('pointerdown', (e) => {
    const b = e.target.closest('.tc-pieza');
    if (!b || b.disabled || soloLectura || e.button !== 0) return;
    arrastre = { b, x0: e.clientX, y0: e.clientY, fantasma: null };
    b.setPointerCapture(e.pointerId);
  });
  menu.addEventListener('pointermove', (e) => {
    if (!arrastre) return;
    if (!arrastre.fantasma) {
      if (Math.hypot(e.clientX - arrastre.x0, e.clientY - arrastre.y0) < UMBRAL_CLIC) return;
      const f = document.createElement('div');
      f.className = 'tc-fantasma';
      f.append(arrastre.b.querySelector('.tc-mini').firstElementChild.cloneNode(true));
      tc.append(f);
      arrastre.fantasma = f;
      menu.classList.add('tc-arrastrando');
    }
    const t = tc.getBoundingClientRect();
    arrastre.fantasma.style.left = e.clientX - t.left + 'px';
    arrastre.fantasma.style.top = e.clientY - t.top + 'px';
  });
  function soltarArrastre(e, cancelar) {
    if (!arrastre) return;
    const { b, fantasma } = arrastre;
    arrastre = null;
    menu.classList.remove('tc-arrastrando');
    if (!fantasma) return; // fue un clic: lo atiende el evento click
    fantasma.remove();
    ignorarClic = true;
    setTimeout(() => (ignorarClic = false), 0);
    if (cancelar) return;
    const ra = area.getBoundingClientRect();
    const rm = menu.getBoundingClientRect();
    const dentro = (r) => e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!dentro(ra) || dentro(rm)) return; // soltada fuera del lienzo o sobre el panel: no se agrega
    abrirMenu(false);
    if (b.dataset.accion === 'protoboard') agregarProtoboard(aMundo(e));
    else agregarComponente(b.dataset.tipo, aMundo(e));
  }
  menu.addEventListener('pointerup', (e) => soltarArrastre(e, false));
  menu.addEventListener('pointercancel', (e) => soltarArrastre(e, true));

  // `punto`: dónde soltó la pieza el aprendiz (en el mundo); sin él, aparece en el centro de lo que se ve.
  function agregarComponente(tipo, punto = null) {
    const def = TIPOS[tipo];
    if (!def) return;
    let n = 1;
    while (componente(def.prefijo + n)) n++;
    const id = def.prefijo + n;
    // Aparece en el centro de lo que se ve, un poco corrida para que no se apilen.
    const cx = (area.clientWidth / 2 - camara.px) / camara.escala;
    const cy = (area.clientHeight / 2 - camara.py) / camara.escala;
    const corrimiento = (datos.componentes.length % 4) * 14;
    const c = {
      id,
      tipo,
      x: def.montada ? 0 : Math.round(cx - 20 + corrimiento),
      y: def.montada ? 0 : Math.round(cy - 20 + corrimiento),
      rot: 0,
      props: copia(def.props),
    };
    datos.componentes.push(c);
    crearVista(id, tipo, c.props).then(() => {
      const v = vistas.get(id);
      if (punto && v && !def.montada && componente(id) === c) {
        // Centrada donde se soltó.
        c.x = Math.round(punto.x - v.w / 2);
        c.y = Math.round(punto.y - v.h / 2);
        ubicar(v);
        dibujarCables();
        cambio();
      }
      // Si aparece sobre la protoboard y sus patas caen en huecos libres, queda encajada.
      if (datos.protoboard && componente(id) === c && encajarPieza(c)) {
        emitir('componente_cambiado', { id, x: c.x, y: c.y, en: copia(c.en) });
        cambio();
      }
    });
    emitir('componente_agregado', { id, tipo });
    seleccionar({ tipo: 'comp', id });
    cambio();
  }

  // Rehace el dibujo de una pieza cuyo tamaño o pines dependen de sus propiedades (la vista del motor).
  function rehacerVista(c) {
    const v = vistas.get(c.id);
    if (v) {
      v.div.remove();
      for (const p of v.pines.values()) p.div.remove();
      vistas.delete(c.id);
    }
    crearVista(c.id, c.tipo, c.props).then(() => {
      dibujarCables();
      if (sel && sel.id === c.id) seleccionar({ tipo: 'comp', id: c.id });
    });
  }

  function girar() {
    if (!sel || sel.tipo !== 'comp' || sel.id === 'protoboard') return;
    const c = componente(sel.id);
    if (montada(c)) return;
    c.rot = ((c.rot || 0) + 90) % 360;
    ubicar(vistas.get(c.id));
    if (datos.protoboard) encajarPieza(c); // girada, puede encajar en otros huecos o quedar suelta
    dibujarCables();
    emitir('componente_cambiado', { id: c.id, rot: c.rot, en: c.en ? copia(c.en) : null });
    cambio();
  }

  function borrar() {
    if (!sel) return;
    if (sel.tipo === 'cable') {
      quitarCable(sel.cable);
    } else if (sel.id === 'protoboard') {
      // Sin protoboard, las piezas quedan sueltas y los cables que llegaban a sus huecos se quitan.
      datos.cables.filter((k) => k.de.startsWith('protoboard.') || k.a.startsWith('protoboard.')).forEach((k) => quitarCable(k));
      for (const k of datos.componentes) delete k.en;
      datos.protoboard = null;
      const v = vistas.get('protoboard');
      if (v) {
        v.div.remove(); // sus huecos están dentro
        vistas.delete('protoboard');
      }
      tiraIluminada = [];
      destinos = [];
      pintarAgregar();
      emitir('componente_quitado', { id: 'protoboard', tipo: 'protoboard' });
    } else {
      const c = componente(sel.id);
      const v = vistas.get(sel.id);
      datos.cables.filter((k) => k.de.startsWith(c.id + '.') || k.a.startsWith(c.id + '.')).forEach((k) => quitarCable(k));
      datos.componentes = datos.componentes.filter((k) => k !== c);
      if (v) {
        v.div.remove();
        for (const p of v.pines.values()) p.div.remove();
        vistas.delete(c.id);
      }
      emitir('componente_quitado', { id: c.id, tipo: c.tipo });
      marcarOcupados(); // sus huecos quedan libres
    }
    ocultarTip();
    seleccionar(null);
    cambio();
  }

  function abrirMenu(abrir) {
    menu.hidden = !abrir;
    pintarFicha(); // la ficha se esconde mientras el panel de piezas está abierto
    botonMenu.setAttribute('aria-expanded', String(abrir));
    if (!abrir) return;
    armarBiblioteca();
    pintarAgregar(); // lo que ya está (la protoboard, la shield) no se puede agregar otra vez
    filtrarBiblioteca();
    buscador.focus({ preventScroll: true });
  }
  menu.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-accion]');
    if (!b || ignorarClic) return;
    abrirMenu(false);
    if (b.dataset.accion === 'cerrar') return botonMenu.focus();
    alAccion(b);
  });
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      abrirMenu(false);
      botonMenu.focus();
    }
  });
  raiz.addEventListener('pointerdown', (e) => {
    if (!menu.hidden && !e.target.closest('.tc-biblioteca') && e.target !== botonMenu) abrirMenu(false);
  });

  barra.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-accion]');
    if (!b) return;
    if (b.dataset.accion === 'menu') return abrirMenu(menu.hidden);
    alAccion(b);
  });
  function alAccion(b) {
    const accion = b.dataset.accion;
    if (accion === 'acercar') return zoom(1.25);
    if (accion === 'alejar') return zoom(0.8);
    if (accion === 'encuadrar') {
      camaraManual = false;
      return encuadrar();
    }
    if (soloLectura) return;
    if (accion === 'agregar') agregarComponente(b.dataset.tipo);
    else if (accion === 'protoboard') agregarProtoboard();
    else if (accion === 'girar') girar();
    else if (accion === 'borrar') borrar();
    else if (accion === 'color') {
      ponerColor(b.dataset.color);
      area.focus({ preventScroll: true }); // así las teclas (0 a 9, Supr, Esc) siguen llegando al lienzo
    }
  }

  function alCambiarPropiedad(e) {
    if (soloLectura || !sel || sel.tipo !== 'comp') return;
    const c = componente(sel.id);
    const v = vistas.get(sel.id);
    const def = TIPOS[c.tipo];
    if (e.target.dataset.accion === 'encender') {
      v.el.value = e.target.checked; // solo cambia el dibujo: no es parte del circuito
      return;
    }
    const prop = e.target.dataset.prop;
    if (!prop || !def) return;
    const tipoProp = typeof def.props[prop];
    const valor = tipoProp === 'number' ? Number(e.target.value) : tipoProp === 'boolean' ? e.target.value === 'true' : e.target.value;
    c.props = { ...c.props, [prop]: valor };
    if (def.dibujo && def.dibujo.marco) rehacerVista(c); // cambia el tamaño o los pines del dibujo
    else def.aplicar(v.el, c.props);
    pintarDatosFicha();
    emitir('componente_cambiado', { id: c.id, props: copia(c.props) });
    cambio();
  }

  function alMoverPerilla(e) {
    if (soloLectura || !sel || sel.tipo !== 'comp' || !('perilla' in e.target.dataset)) return;
    const v = vistas.get(sel.id);
    girarPerilla(sel.id, Number(e.target.value) / 100);
    if (v) TIPOS.potenciometro.aplicar(v.el, componente(sel.id).props);
  }
  for (const caja of [barra, ficha]) {
    caja.addEventListener('change', alCambiarPropiedad);
    caja.addEventListener('input', alMoverPerilla);
  }

  // Un botón se presiona o se suelta. El estado va al simulador (no es parte del circuito guardado); al soltar
  // queda el evento boton_pulsado con cuánto duró, que sirve de evidencia de cómo prueba el aprendiz su montaje.
  function pulsar(id, presionado, ms) {
    const v = vistas.get(id);
    if (v) v.el.pressed = presionado;
    if (presionado) pulsados.add(id);
    else if (!pulsados.delete(id)) return;
    for (const fn of oyentesPulsar) {
      try {
        fn(id, presionado);
      } catch (err) {
        console.error(err);
      }
    }
    if (!presionado && ms !== undefined) emitir('boton_pulsado', { id, ms: Math.round(ms) });
  }

  // La perilla cambió (con el mouse sobre el dibujo o con el deslizador de la barra).
  const tPerilla = new Map();
  function girarPerilla(id, posicion) {
    const c = componente(id);
    const v = vistas.get(id);
    if (!c) return;
    const def = TIPOS[c.tipo];
    if (soloLectura) return v && def.aplicar(v.el, c.props); // en solo lectura vuelve a donde estaba
    const p = Math.max(0, Math.min(1, Math.round(posicion * 100) / 100));
    if (p === c.props[def.perilla.prop]) return;
    c.props = { ...c.props, [def.perilla.prop]: p };
    const deslizador = sel && sel.tipo === 'comp' && sel.id === id && ficha.querySelector('[data-perilla]');
    if (deslizador && Number(deslizador.value) !== Math.round(p * 100)) deslizador.value = Math.round(p * 100);
    if (sel && sel.id === id) pintarDatosFicha();
    cambio(); // el simulador lo ve al instante
    // El evento se anota una vez que la perilla se queda quieta, no por cada grado que gira.
    clearTimeout(tPerilla.get(id));
    tPerilla.set(id, setTimeout(() => emitir('componente_cambiado', { id, props: copia(c.props) }), 400));
  }

  // ---- Puntero

  function aMundo(e) {
    const r = area.getBoundingClientRect();
    return { x: (e.clientX - r.left - camara.px) / camara.escala, y: (e.clientY - r.top - camara.py) / camara.escala };
  }

  function capturar(e) {
    try {
      area.setPointerCapture(e.pointerId);
    } catch {
      // sin captura el gesto igual funciona mientras el puntero no salga del lienzo
    }
  }

  function iniciarPaneo(e, extra = {}) {
    gesto = { tipo: 'paneo', x0: e.clientX, y0: e.clientY, px0: camara.px, py0: camara.py, movido: false, ...extra };
    capturar(e);
  }

  area.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    area.focus({ preventScroll: true });
    ocultarTip();
    const t = e.target;
    const m = aMundo(e);
    if (soloLectura) return iniciarPaneo(e);
    const pin = t.closest('.tc-pin');
    if (pin) {
      e.preventDefault();
      if (trazando) return terminarCable(pin.dataset.ref);
      empezarCable(pin.dataset.ref);
      gesto = { tipo: 'pin', ref: pin.dataset.ref, x0: e.clientX, y0: e.clientY, movido: false };
      return;
    }
    if (trazando) return iniciarPaneo(e, { punto: m }); // un clic (sin arrastrar) agrega un doblez
    const asa = t.closest('.tc-asa');
    if (asa) {
      gesto = { tipo: 'asa', cable: datos.cables[+asa.dataset.i], k: +asa.dataset.p, x0: e.clientX, y0: e.clientY, movido: false };
      return capturar(e);
    }
    const toque = t.closest('.tc-cable-toque');
    if (toque) return seleccionar({ tipo: 'cable', cable: datos.cables[+toque.dataset.i] });
    const comp = t.closest('.tc-comp');
    if (comp && comp.dataset.id !== 'placa') {
      const id = comp.dataset.id;
      const c = pieza(id);
      if (c.tipo === 'pulsador') {
        // Sin los eventos de mouse de compatibilidad: así el dibujo de Wokwi no se presiona ni se queda pegado solo.
        e.preventDefault();
        if (vistaSim.simulando) {
          // Mientras corre la simulación, el botón se presiona (no se mueve), como en la placa.
          // Sin capturar el puntero: si se captura, el dibujo de Wokwi cree que el mouse salió y se suelta solo.
          pulsar(id, true);
          gesto = { tipo: 'pulsar', id, x0: e.clientX, y0: e.clientY, movido: false, desde: performance.now() };
          return;
        }
      }
      seleccionar({ tipo: 'comp', id });
      if (montada(c)) return iniciarPaneo(e); // la shield no se mueve: arrastrarla mueve la vista
      // Sobre la perilla del potenciómetro, el arrastre la gira (lo maneja el dibujo de Wokwi): no se mueve la pieza.
      if (TIPOS[c.tipo] && TIPOS[c.tipo].perilla && e.composedPath().some(esPerilla)) return;
      gesto = { tipo: 'mover', id, dx: m.x - c.x, dy: m.y - c.y, x0: e.clientX, y0: e.clientY, movido: false };
      return capturar(e);
    }
    seleccionar(null);
    iniciarPaneo(e);
  });

  area.addEventListener('pointermove', (e) => {
    const m = aMundo(e);
    // Si el mouse se sale del botón con el clic apretado, el botón se suelta (como un dedo que se resbala).
    if (gesto && gesto.tipo === 'pulsar' && !(e.target.closest && e.target.closest(`.tc-comp[data-id="${gesto.id}"]`))) {
      const g = gesto;
      gesto = null;
      pulsar(g.id, false, performance.now() - g.desde);
    }
    if (gesto) {
      if (!gesto.movido && Math.hypot(e.clientX - gesto.x0, e.clientY - gesto.y0) > UMBRAL_CLIC) {
        gesto.movido = true;
        ficha.classList.add('tc-ficha-quieta'); // mientras se arrastra, la ficha se aparta (casi transparente)
      }
      if (gesto.movido && gesto.tipo === 'mover') {
        const c = pieza(gesto.id);
        const nx = Math.round(m.x - gesto.dx);
        const ny = Math.round(m.y - gesto.dy);
        if (gesto.id === 'protoboard') {
          // Las piezas encajadas se mueven con la protoboard, como en la mesa.
          for (const k of datos.componentes) {
            if (!k.en) continue;
            k.x = redondear(k.x + nx - c.x);
            k.y = redondear(k.y + ny - c.y);
            ubicar(vistas.get(k.id));
          }
        }
        c.x = nx;
        c.y = ny;
        ubicar(vistas.get(gesto.id));
        if (gesto.id !== 'protoboard' && datos.protoboard) mostrarDestino(c);
        dibujarCables();
      } else if (gesto.movido && gesto.tipo === 'paneo') {
        camaraManual = true;
        camara.px = gesto.px0 + e.clientX - gesto.x0;
        camara.py = gesto.py0 + e.clientY - gesto.y0;
        area.classList.add('tc-paneando');
        aplicarCamara();
      } else if (gesto.movido && gesto.tipo === 'asa') {
        const pts = puntosDe(gesto.cable);
        let q = alinear(m, pts[gesto.k]);
        q = alinear(q, pts[gesto.k + 2]);
        gesto.cable.puntos[gesto.k] = [q.x, q.y];
        dibujarCables();
      }
    }
    if (trazando) {
      const pin = e.target.closest && e.target.closest('.tc-pin');
      trazando.cursor = m;
      trazando.destino = pin && pin.dataset.ref !== trazando.de ? pin.dataset.ref : null;
      dibujarPrevia();
    }
    if (!gesto || gesto.tipo === 'pin') mostrarTip(e.target.closest && e.target.closest('.tc-pin'));
    if (vistaSim.simulando) avisarMano(e.target);
  });

  // «La mano»: mientras se simula, el mouse sobre un pin o un cable es como acercar la mano a ese punto.
  function avisarMano(objetivo) {
    let refs = [];
    const pin = objetivo && objetivo.closest && objetivo.closest('.tc-pin');
    const toque = objetivo && objetivo.closest && objetivo.closest('.tc-cable-toque');
    if (pin) refs = [pin.dataset.ref];
    else if (toque && datos.cables[+toque.dataset.i]) refs = [datos.cables[+toque.dataset.i].de, datos.cables[+toque.dataset.i].a];
    const clave = refs.join('|');
    if (clave === manoClave) return;
    manoClave = clave;
    for (const fn of oyentesMano) fn(refs);
  }

  function alSoltar(e) {
    const g = gesto;
    gesto = null;
    area.classList.remove('tc-paneando');
    ficha.classList.remove('tc-ficha-quieta');
    if (g && g.movido && g.tipo === 'mover') ubicarFicha();
    if (!g) return;
    if (g.tipo === 'pulsar') return pulsar(g.id, false, performance.now() - g.desde);
    if (g.tipo === 'mover' && g.movido) {
      const c = pieza(g.id);
      if (g.id === 'protoboard') {
        emitir('componente_cambiado', { id: 'protoboard', x: c.x, y: c.y });
      } else {
        limpiarDestino();
        if (datos.protoboard || c.en) encajarPieza(c);
        emitir('componente_cambiado', { id: g.id, x: c.x, y: c.y, en: c.en ? copia(c.en) : null });
      }
      cambio();
    } else if (g.tipo === 'asa' && g.movido) {
      cambio();
    } else if (g.tipo === 'paneo' && !g.movido && g.punto && trazando) {
      agregarPunto(g.punto);
    } else if (g.tipo === 'pin' && g.movido && trazando && e.type === 'pointerup') {
      // Arrastró desde un pin: si suelta sobre otro pin, el cable termina ahí.
      const bajo = raiz.elementFromPoint(e.clientX, e.clientY);
      const pin = bajo && bajo.closest('.tc-pin');
      if (pin && pin.dataset.ref !== g.ref) terminarCable(pin.dataset.ref);
    }
  }
  area.addEventListener('pointerup', alSoltar);
  area.addEventListener('pointercancel', alSoltar);
  area.addEventListener('pointerleave', () => {
    ocultarTip();
    if (manoClave) avisarMano(null);
    if (gesto && gesto.tipo === 'pulsar') {
      const g = gesto;
      gesto = null;
      pulsar(g.id, false, performance.now() - g.desde);
    }
  });

  area.addEventListener('dblclick', (e) => {
    if (soloLectura || trazando) return;
    // Si el puntero quedó capturado, el doble clic llega al área: se mira qué hay debajo del puntero.
    const bajo = raiz.elementFromPoint(e.clientX, e.clientY) || e.target;
    const asa = bajo.closest('.tc-asa');
    const toque = bajo.closest('.tc-cable-toque');
    if (asa) {
      // Doble clic en un doblez: se quita.
      const cable = datos.cables[+asa.dataset.i];
      cable.puntos.splice(+asa.dataset.p, 1);
      if (!cable.puntos.length) delete cable.puntos;
      dibujarCables();
      actualizarAyuda();
      cambio();
    } else if (toque) {
      // Doble clic en un cable: se agrega un doblez sobre el tramo más cercano, sin torcerlo.
      const cable = datos.cables[+toque.dataset.i];
      const pts = puntosDe(cable);
      const m = aMundo(e);
      let k = 0;
      let punto = m;
      let mejor = Infinity;
      for (let j = 0; j < pts.length - 1; j++) {
        const q = proyectar(m, pts[j], pts[j + 1]);
        if (dist(m, q) < mejor) {
          mejor = dist(m, q);
          k = j;
          punto = q;
        }
      }
      (cable.puntos = cable.puntos || []).splice(k, 0, [redondear(punto.x), redondear(punto.y)]);
      seleccionar({ tipo: 'cable', cable });
      cambio();
    }
  });

  area.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      const r = area.getBoundingClientRect();
      const factor = Math.min(1.5, Math.max(0.66, Math.exp(-e.deltaY * 0.0015)));
      zoom(factor, e.clientX - r.left, e.clientY - r.top);
    },
    { passive: false },
  );

  tc.addEventListener('keydown', (e) => {
    if (e.target.closest && e.target.closest('select, input')) return;
    const sinModificador = !e.ctrlKey && !e.metaKey && !e.altKey;
    let usada = true;
    if (e.key === 'Escape') {
      if (trazando) cancelarCable();
      else seleccionar(null);
    } else if (soloLectura) {
      usada = false;
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      if (trazando) quitarPunto();
      else borrar();
    } else if ((e.key === 'r' || e.key === 'R') && sinModificador) {
      girar();
    } else if (/^[0-9]$/.test(e.key) && sinModificador && (trazando || (sel && sel.tipo === 'cable'))) {
      ponerColor(CODIGO_COLORES[Number(e.key)]); // código de colores: 0 negro, 1 marrón, 2 rojo… 9 blanco
    } else {
      usada = false;
    }
    // Las teclas que usa el lienzo no siguen hacia la página: así Supr no borra también un bloque de Blockly.
    if (usada) e.stopPropagation();
  });

  // ---- Cámara

  function aplicarCamara() {
    mundo.style.transform = `translate(${camara.px}px, ${camara.py}px) scale(${camara.escala})`;
    const paso = PASO_REJILLA * camara.escala;
    area.style.backgroundSize = `${paso}px ${paso}px`;
    area.style.backgroundPosition = `${camara.px}px ${camara.py}px`;
    ocultarTip();
  }

  function zoom(factor, sx, sy) {
    camaraManual = true;
    if (sx === undefined) {
      sx = area.clientWidth / 2;
      sy = area.clientHeight / 2;
    }
    const escala = Math.min(ESCALA_MAX, Math.max(ESCALA_MIN, camara.escala * factor));
    const wx = (sx - camara.px) / camara.escala;
    const wy = (sy - camara.py) / camara.escala;
    Object.assign(camara, { escala, px: sx - wx * escala, py: sy - wy * escala });
    aplicarCamara();
  }

  // Caja que rodea todas las piezas y los dobleces de los cables, en coordenadas del mundo.
  function cajaDelCircuito() {
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    const incluir = (x, y) => {
      x0 = Math.min(x0, x);
      y0 = Math.min(y0, y);
      x1 = Math.max(x1, x);
      y1 = Math.max(y1, y);
    };
    for (const v of vistas.values()) {
      const c = lugar(v.id);
      if (!c) continue;
      const girado = (c.rot || 0) % 180 !== 0;
      const mw = (girado ? v.h : v.w) / 2;
      const mh = (girado ? v.w : v.h) / 2;
      incluir(c.x + v.w / 2 - mw, c.y + v.h / 2 - mh);
      incluir(c.x + v.w / 2 + mw, c.y + v.h / 2 + mh);
    }
    for (const cable of datos.cables) for (const [x, y] of cable.puntos || []) incluir(x, y);
    return isFinite(x0) ? { x0, y0, x1, y1 } : null;
  }

  function encuadrar() {
    const ancho = area.clientWidth;
    const alto = area.clientHeight;
    if (!ancho || !alto) return false;
    const caja = cajaDelCircuito();
    if (!caja) return false;
    const { x0, y0, x1, y1 } = caja;
    const margen = 48;
    const ajuste = Math.min((ancho - 2 * margen) / (x1 - x0 || 1), (alto - 2 * margen) / (y1 - y0 || 1));
    const escala = Math.min(2.4, Math.max(ESCALA_MIN, ajuste));
    Object.assign(camara, { escala, px: ancho / 2 - ((x0 + x1) / 2) * escala, py: alto / 2 - ((y0 + y1) / 2) * escala });
    tamanoEncuadre = { ancho, alto };
    aplicarCamara();
    return true;
  }

  // ---- Imagen SVG del circuito (para la documentación del proyecto o una evidencia en TecnoRuta)

  // Arma un SVG que se abre igual en el navegador, Word, LibreOffice o Inkscape: fondo blanco, cada pieza con
  // su dibujo de Wokwi (con sus estilos y sus identificadores renombrados) y los cables encima, como en pantalla.
  // Abajo a la derecha lleva la marca «Hecho con TecnoCircuito», en una franja propia para no tapar nada.
  function exportarSVG() {
    const caja = cajaDelCircuito() || { x0: 0, y0: 0, x1: 100, y1: 100 };
    const margen = 12;
    const franja = 16;
    const ancho = Math.max(MARCA_ANCHO_MIN, Math.ceil(caja.x1 - caja.x0 + 2 * margen));
    const alto = Math.ceil(caja.y1 - caja.y0 + 2 * margen) + franja;
    const partes = [
      `<svg xmlns="${SVG_NS}" xmlns:xlink="http://www.w3.org/1999/xlink" width="${ancho}" height="${alto}" viewBox="0 0 ${ancho} ${alto}">`,
      '<title>Circuito armado en TecnoCircuito</title>',
      `<rect width="${ancho}" height="${alto}" fill="#ffffff"/>`,
      `<g transform="translate(${redondear(margen - caja.x0)} ${redondear(margen - caja.y0)})">`,
    ];
    for (const div of capaComp.children) {
      const v = vistas.get(div.dataset.id);
      if (v && v.lista) partes.push(piezaSVG(v));
    }
    for (const cable of datos.cables) {
      const pts = puntosDe(cable);
      if (!pts) continue;
      const d = trazo(pts);
      const color = colorHex(cable.color);
      const extremo = (p) => `<circle cx="${p.x}" cy="${p.y}" r="2.4" fill="${color}" stroke="#000000" stroke-opacity="0.55" stroke-width="0.8"/>`;
      partes.push(
        `<g fill="none" stroke-linecap="round" stroke-linejoin="round">` +
          `<path d="${d}" stroke="#000000" stroke-opacity="0.42" stroke-width="4.8"/>` +
          `<path d="${d}" stroke="${color}" stroke-width="3"/>${extremo(pts[0])}${extremo(pts[pts.length - 1])}</g>`,
      );
    }
    partes.push(
      '</g>',
      `<text x="${ancho - margen}" y="${alto - 9}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" ` +
        `font-size="9" fill="#7a7a7a">${escaparXML(MARCA_SVG)}</text>`,
      '</svg>',
    );
    return partes.join('\n');
  }

  function piezaSVG(v) {
    const c = lugar(v.id);
    if (!c) return '';
    const t = c.rot
      ? `translate(${c.x + v.w / 2} ${c.y + v.h / 2}) rotate(${c.rot}) translate(${-v.w / 2} ${-v.h / 2})`
      : `translate(${c.x} ${c.y})`;
    if (!v.def) {
      const tipo = escaparXML((componente(v.id) || {}).tipo || '');
      return (
        `<g transform="${t}"><rect width="${v.w}" height="${v.h}" rx="6" fill="none" stroke="#5a6673" stroke-dasharray="4 3"/>` +
        `<text x="${v.w / 2}" y="${v.h / 2 + 3}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#5a6673">¿${tipo}?</text></g>`
      );
    }
    const original = v.el.shadowRoot ? v.el.shadowRoot.querySelector('svg') : v.el.tagName && v.el.tagName.toLowerCase() === 'svg' ? v.el : null;
    if (!original) return '';
    const clon = original.cloneNode(true);
    // Lit deja comentarios de marca dentro del dibujo: en el archivo no hacen falta.
    const marcas = [];
    const caminante = document.createTreeWalker(clon, NodeFilter.SHOW_COMMENT);
    while (caminante.nextNode()) marcas.push(caminante.currentNode);
    marcas.forEach((n) => n.remove());
    // La perilla del potenciómetro gira con una variable CSS: se deja también como atributo, que todos entienden.
    const angulo = /--knob-angle:\s*(-?[\d.]+)deg/.exec(clon.getAttribute('style') || '');
    const rotador = clon.querySelector('#rotating');
    if (angulo && rotador) rotador.setAttribute('transform', `rotate(${angulo[1]} 10 8)`);
    clon.setAttribute('width', redondear(v.w));
    clon.setAttribute('height', redondear(v.h));
    clon.removeAttribute('id');
    // Dos LED usan los mismos identificadores (sus filtros de brillo): cada pieza lleva su prefijo.
    const prefijo = 'tc-' + v.id;
    const ids = [...new Set([...clon.querySelectorAll('[id]')].map((n) => n.id))];
    let texto = new XMLSerializer().serializeToString(clon);
    for (const id of ids) texto = renombrarId(texto, id, prefijo);
    texto = texto.replace(/^<svg\b/, `<svg id="${prefijo}"`);
    const css = v.el.shadowRoot ? estilosDe(v.el, prefijo, ids) : '';
    return `<g transform="${t}">${css ? `<style><![CDATA[\n${css}\n]]></style>` : ''}${texto}</g>`;
  }

  // ---- Rótulos y ayuda

  function rotulo(ref) {
    const [id, pin] = partirRef(ref);
    if (id === 'placa') return PLACAS[placa].rotulo(pin);
    if (id === 'protoboard') return rotuloHueco(pin);
    const c = componente(id);
    const def = c && TIPOS[c.tipo];
    const enHueco = c && c.en && c.en[pin] ? ` · en el hueco ${c.en[pin].slice('protoboard.'.length)}` : '';
    return def ? `${def.nombre}: ${def.rotulo(pin)}${enHueco}` : pin;
  }

  function mostrarTip(pin) {
    const ref = pin ? pin.dataset.ref : null;
    if (ref === tipRef) return;
    tipRef = ref;
    iluminarTira(ref);
    const p = ref && posicion(ref);
    if (!p) {
      tip.hidden = true;
      return;
    }
    const sy = camara.py + p.y * camara.escala;
    // Con la simulación andando, el rótulo también dice el voltaje del pin, como la punta de un multímetro.
    const v = vistaSim.voltajes[ref];
    const voltaje = v === undefined ? '' : v === null ? ' · al aire' : ` · ${v.toFixed(2).replace('.', ',')} V`;
    tip.textContent = rotulo(ref) + voltaje;
    tip.style.left = camara.px + p.x * camara.escala + 'px';
    tip.style.top = sy + 'px';
    tip.classList.toggle('tc-abajo', sy < 44);
    tip.hidden = false;
  }

  function ocultarTip() {
    tipRef = null;
    tip.hidden = true;
    iluminarTira(null);
  }

  function actualizarAyuda() {
    clearTimeout(tAviso);
    ayuda.classList.remove('tc-aviso');
    const conDobleces = sel && sel.tipo === 'cable' && sel.cable.puntos && sel.cable.puntos.length;
    ayuda.textContent = soloLectura
      ? 'Solo lectura: puedes mover la vista y hacer zoom.'
      : trazando
        ? trazando.puntos.length
          ? 'Clic en otro pin para terminar · Clic en el espacio libre para doblar · Teclas 0 a 9: color · Supr: quitar el último doblez · Esc: cancelar'
          : 'Clic en otro pin para terminar · Clic en el espacio libre para doblar el cable · Teclas 0 a 9: color · Esc: cancelar'
        : conDobleces
          ? 'Arrastra los puntos blancos para acomodar el cable · Teclas 0 a 9: color · Doble clic en un punto: quitarlo · Supr: borrar'
          : sel && sel.tipo === 'cable'
            ? 'Color: muestras de arriba o teclas 0 a 9 (código de colores) · Doble clic en el cable para doblarlo · Supr: borrar'
            : sel && montada(componente(sel.id))
              ? 'Va montada sobre el Uno: no se mueve · Clic en un borne para empezar un cable · Supr: quitarla'
            : sel && sel.id === 'protoboard'
              ? 'Arrástrala para moverla: las piezas encajadas se mueven con ella · Pasa por un hueco para ver su tira · Supr: borrar'
              : sel && datos.protoboard
                ? 'Arrástralo y suéltalo sobre la protoboard para encajarlo (los huecos se ven en verde) · R: girar · Supr: borrar'
                : sel
                  ? 'Arrástralo para moverlo · R: girar · Supr: borrar'
              : vistaSim.simulando && datos.componentes.some((c) => c.tipo === 'pulsador')
                ? 'Simulando · Mantén presionado un botón con el mouse para pulsarlo · Pasa por un pin para ver su voltaje'
                : 'Clic en un pin para empezar un cable · Arrastra las piezas para moverlas · Rueda del mouse: zoom';
  }

  function avisar(texto) {
    actualizarAyuda();
    ayuda.textContent = texto;
    ayuda.classList.add('tc-aviso');
    tAviso = setTimeout(actualizarAyuda, 2500);
  }

  // ---- Eventos y cambios

  function emitir(tipo, d) {
    if (!alEvento) return;
    try {
      alEvento({ t: Date.now(), origen: 'circuito', tipo, datos: d });
    } catch (err) {
      console.error(err); // un error de quien escucha no debe romper el lienzo
    }
  }

  function cambio() {
    const c = copia(datos);
    for (const fn of oyentes) {
      try {
        fn(c);
      } catch (err) {
        console.error(err);
      }
    }
  }

  // ---- API (contrato 1)

  function ponerTema(tema) {
    tc.classList.toggle('tc-oscuro', tema === 'oscuro');
    tc.classList.toggle('tc-claro', tema === 'claro');
  }

  const api = {
    circuito: () => copia(datos),
    alCambiar(fn) {
      if (typeof fn === 'function') oyentes.push(fn);
    },
    ponerPlaca(nueva) {
      if (nueva !== placa) throw new Error(`Este prototipo solo dibuja la placa «${placa}».`);
    },
    ponerTema,
    // Contrato 1: el circuito como texto SVG, tal como se ve (para documentar el proyecto o como evidencia).
    exportarSVG,
    // Contrato 1: el circuito como netlist de KiCad (.net), para empezar una placa en el editor de placas de KiCad.
    exportarNetlist: (opciones) => netlistKiCad(datos, opciones),
    // Interno (no es parte del contrato): el simulador escucha aquí los botones presionados con el mouse.
    _alPulsar(fn) {
      if (typeof fn === 'function') oyentesPulsar.push(fn);
    },
    // Interno (no es parte del contrato): el simulador escucha aquí «la mano» (refs bajo el mouse, o []).
    _alAcercar(fn) {
      if (typeof fn === 'function') oyentesMano.push(fn);
    },
    // Interno (no es parte del contrato): el simulador lo usa para mostrar lo que pasa.
    _mostrar(estado) {
      const antes = vistaSim.simulando;
      vistaSim = {
        simulando: !!estado.simulando,
        leds: estado.leds || {},
        quemados: estado.quemados || [],
        voltajes: estado.voltajes || {},
        placa: estado.placa || {},
        servos: estado.servos || {},
        piezas: estado.piezas || {},
      };
      if (antes !== vistaSim.simulando) {
        tc.classList.toggle('tc-simulando', vistaSim.simulando);
        if (!vistaSim.simulando) [...pulsados].forEach((id) => pulsar(id, false)); // al detener, se sueltan
        actualizarAyuda();
      }
      tipRef = null; // el rótulo del pin muestra el voltaje: se rehace con el valor nuevo
      for (const v of vistas.values()) if (v.lista) aplicarSim(v);
    },
    destruir() {
      destruido = true;
      ro.disconnect();
      clearTimeout(tAviso);
      oyentes.length = 0;
      vistas.clear();
      graficos.clear();
      host.remove();
    },
  };

  if (opciones.tema) ponerTema(opciones.tema);
  if (soloLectura) tc.classList.add('tc-solo-lectura');
  aplicarCamara();
  actualizarAyuda();
  // Si el lienzo nace oculto, se encuadra la primera vez que tenga tamaño. Y si cambia de tamaño (el aprendiz
  // agranda el panel o pasa a la vista «Circuito»), se vuelve a encuadrar, salvo que ya haya movido la vista a mano.
  // Solo cambios grandes (más del 10 %): los pequeños no deben mover la vista bajo el mouse del aprendiz.
  const ro = new ResizeObserver(() => {
    if (!listo || destruido) return;
    if (!encuadrado) {
      encuadrado = encuadrar();
      return;
    }
    if (camaraManual || !tamanoEncuadre) return;
    const cambio = (a, b) => Math.abs(a - b) / Math.max(1, b);
    if (cambio(area.clientWidth, tamanoEncuadre.ancho) > 0.1 || cambio(area.clientHeight, tamanoEncuadre.alto) > 0.1) encuadrar();
  });
  ro.observe(area);
  const vistaPlaca = crearVista('placa');
  if (!soloLectura) armarBiblioteca(); // desde el inicio: quien use el lienzo encuentra los botones de cada pieza
  pintarAgregar();
  Promise.all([vistaPlaca, ...(datos.protoboard ? [crearVistaProtoboard()] : []), ...datos.componentes.map((c) => crearVista(c.id, c.tipo, c.props))]).then(() => {
    if (destruido) return;
    listo = true;
    marcarOcupados();
    dibujarCables();
    encuadrado = encuadrar();
  });
  return api;
}

// Copia el circuito y completa lo que falte. Los campos desconocidos se conservan tal cual.
function normalizar(circuito, placa) {
  const c = circuito && typeof circuito === 'object' ? copia(circuito) : {};
  c.formato = c.formato || 1;
  c.placa = placa; // manda la placa que elige TecnoBloques
  const ids = new Set();
  c.componentes = (Array.isArray(c.componentes) ? c.componentes : []).filter(
    (k) => k && typeof k.id === 'string' && k.id && k.id !== 'placa' && !k.id.includes('.') && !ids.has(k.id) && ids.add(k.id),
  );
  for (const k of c.componentes) {
    k.x = Number(k.x) || 0;
    k.y = Number(k.y) || 0;
    k.rot = Number(k.rot) || 0;
    const base = TIPOS[k.tipo] ? TIPOS[k.tipo].props : {};
    k.props = { ...base, ...(k.props && typeof k.props === 'object' ? k.props : {}) };
  }
  c.cables = (Array.isArray(c.cables) ? c.cables : []).filter((k) => k && typeof k.de === 'string' && typeof k.a === 'string');
  for (const k of c.cables) {
    const valido = Array.isArray(k.puntos) && k.puntos.every((p) => Array.isArray(p) && p.length === 2 && p.every(Number.isFinite));
    if ('puntos' in k && !valido) delete k.puntos;
  }
  if (!c.protoboard || typeof c.protoboard !== 'object') c.protoboard = null;
  else {
    if (typeof c.protoboard.tipo !== 'string') c.protoboard.tipo = 'media';
    c.protoboard.x = Number(c.protoboard.x) || 0;
    c.protoboard.y = Number(c.protoboard.y) || 0;
  }
  // «en» (qué pata va en qué hueco) solo vale si hay protoboard y apunta a sus huecos.
  for (const k of c.componentes) {
    const valido = c.protoboard && k.en && typeof k.en === 'object' && Object.values(k.en).every((r) => typeof r === 'string' && r.startsWith('protoboard.'));
    if ('en' in k && !valido) delete k.en;
  }
  return c;
}

const escaparRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const escaparXML = (s) => String(s).replace(/[<>&"]/g, (ch) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[ch]);

// Cambia un identificador del dibujo (y sus referencias url(#…) y href="#…") por uno con el prefijo de la pieza.
function renombrarId(texto, id, prefijo) {
  const e = escaparRegex(id);
  const nuevo = `${prefijo}-${id}`;
  return texto
    .replace(new RegExp(`(\\s)id="${e}"`, 'g'), (_, sep) => `${sep}id="${nuevo}"`)
    .replace(new RegExp(`url\\(#${e}\\)`, 'g'), () => `url(#${nuevo})`)
    .replace(new RegExp(`href="#${e}"`, 'g'), () => `href="#${nuevo}"`);
}

// Los estilos del dibujo de Wokwi viven en su shadow DOM: se copian, limitados a esa pieza (#prefijo …).
function estilosDe(el, prefijo, ids) {
  const raizSombra = el.shadowRoot;
  const hojas = [...(raizSombra.adoptedStyleSheets || [])];
  raizSombra.querySelectorAll('style').forEach((s) => s.sheet && hojas.push(s.sheet));
  const reglas = [];
  for (const hoja of hojas) {
    let lista;
    try {
      lista = hoja.cssRules;
    } catch {
      continue;
    }
    for (const r of lista) {
      if (!r.selectorText || !r.style) continue; // solo reglas simples: lo demás no cambia el dibujo
      const selectores = r.selectorText
        .split(',')
        .map((s) => s.trim())
        .filter((s) => !/:host|\binput\b|:focus|\.hide-input/.test(s));
      if (!selectores.length) continue;
      const limitados = selectores.map((s) => {
        let x = s;
        for (const id of ids) x = x.replace(new RegExp(`#${escaparRegex(id)}(?![\\w-])`, 'g'), () => `#${prefijo}-${id}`);
        return /^svg\b/.test(x) ? x.replace(/^svg\b/, `#${prefijo}`) : `#${prefijo} ${x}`;
      });
      reglas.push(`${limitados.join(', ')} { ${r.style.cssText} }`);
    }
  }
  return reglas.join('\n');
}

// Tinta legible sobre una muestra de color: oscura sobre los colores claros y blanca sobre los oscuros.
function tintaSobre(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.55 ? '#1d2733' : '#ffffff';
}

function medida(valor) {
  const m = /^([\d.]+)\s*(mm|px)?$/.exec(String(valor || '').trim());
  return m ? parseFloat(m[1]) * (m[2] === 'mm' ? 96 / 25.4 : 1) : 0;
}

function trazo(pts) {
  const f = (p) => `${redondear(p.x)} ${redondear(p.y)}`;
  let d = `M${f(pts[0])}`;
  for (let k = 1; k < pts.length - 1; k++) {
    const a = pts[k - 1];
    const b = pts[k];
    const c = pts[k + 1];
    const r = Math.min(5, dist(a, b) / 2, dist(b, c) / 2); // esquinas redondeadas
    d += ` L${f(hacia(b, a, r))} Q${f(b)} ${f(hacia(b, c, r))}`;
  }
  return `${d} L${f(pts[pts.length - 1])}`;
}

function hacia(desde, hasta, r) {
  const L = dist(desde, hasta);
  return L ? { x: desde.x + ((hasta.x - desde.x) * r) / L, y: desde.y + ((hasta.y - desde.y) * r) / L } : desde;
}

// El punto del segmento a–b más cercano a p.
function proyectar(p, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const L2 = dx * dx + dy * dy;
  const t = L2 ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / L2)) : 0;
  return { x: a.x + t * dx, y: a.y + t * dy };
}

// ¿El puntero está sobre la perilla del potenciómetro de Wokwi? (sus partes tienen estos id y tamaños)
function esPerilla(n) {
  if (!n || !n.getAttribute) return false;
  if (n.id === 'knob' || n.id === 'rotating') return true;
  return n.tagName === 'ellipse' && Number(n.getAttribute('rx')) > 5;
}
