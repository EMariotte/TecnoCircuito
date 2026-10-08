// Lienzo del prototipo 0: la placa, las piezas y los cables, sin simulación.
// Sigue la API de crearLienzo del contrato 1, para que integrarlo a TecnoBloques sea directo.
import '@wokwi/elements/dist/esm/arduino-uno-element.js';
import '@wokwi/elements/dist/esm/resistor-element.js';
import '@wokwi/elements/dist/esm/led-element.js';
import '@wokwi/elements/dist/esm/potentiometer-element.js';
import estilos from './lienzo.css';
import { PLACAS, TIPOS, COLORES_CABLE, colorPorDefecto } from './catalogo.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
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
      <button type="button" data-accion="agregar" data-tipo="led">+ LED</button>
      <button type="button" data-accion="agregar" data-tipo="resistencia">+ Resistencia</button>
      <button type="button" data-accion="agregar" data-tipo="potenciometro">+ Potenciómetro</button>
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
</div>`;
  const $ = (s) => raiz.querySelector(s);
  const tc = $('.tc');
  const barra = $('.tc-barra');
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
  let destruido = false;
  let vistaSim = { leds: {}, quemados: [], voltajes: {}, placa: {} }; // lo que el simulador pide mostrar

  const componente = (id) => datos.componentes.find((c) => c.id === id);
  const lugar = (id) => (id === 'placa' ? { x: 0, y: 0, rot: 0 } : componente(id));

  // ---- Piezas

  function crearVista(id, tipo, props) {
    const def = id === 'placa' ? PLACAS[placa] : TIPOS[tipo];
    const div = document.createElement('div');
    div.className = 'tc-comp' + (id === 'placa' ? ' tc-placa' : '');
    div.dataset.id = id;
    let el;
    if (def) {
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
    capaComp.appendChild(div);
    const vista = { id, def, div, el, w: 64, h: 40, pines: new Map(), lista: false };
    vistas.set(id, vista);
    return Promise.resolve(el.updateComplete).then(() => {
      if (vistas.get(id) !== vista) return; // la quitaron mientras se dibujaba
      if (def) {
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

  // Prende o apaga en el dibujo lo que indica el simulador. Solo toca el dibujo, nunca `datos`.
  function aplicarSim(v) {
    if (v.id === 'placa') {
      for (const led of ['ledPower', 'led13', 'ledTX', 'ledRX']) v.el[led] = !!vistaSim.placa[led];
    } else if (v.def === TIPOS.led) {
      const brillo = Number(vistaSim.leds[v.id]) || 0; // 0 a 1, según la corriente
      v.el.value = brillo > 0.005;
      v.el.brightness = brillo;
      v.div.classList.toggle('tc-quemado', vistaSim.quemados.includes(v.id));
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
    const c = lugar(v.id);
    if (!c) return;
    Object.assign(v.div.style, {
      left: c.x + 'px',
      top: c.y + 'px',
      width: v.w + 'px',
      height: v.h + 'px',
      transform: c.rot ? `rotate(${c.rot}deg)` : '',
    });
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
    previaLinea.setAttribute('stroke', colorHex(colorPorDefecto(trazando.de, trazando.destino || '')));
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
    trazando = { de: ref, puntos: [], cursor: null, destino: null };
    tc.classList.add('tc-dibujando');
    marcarPin(ref, true);
    dibujarPrevia();
    actualizarAyuda();
  }

  function cancelarCable() {
    if (!trazando) return;
    marcarPin(trazando.de, false);
    trazando = null;
    tc.classList.remove('tc-dibujando');
    dibujarPrevia();
    actualizarAyuda();
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
    const cable = { de: t.de, a: ref, color: colorPorDefecto(t.de, ref) };
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
    barraSel.textContent = '';
    if (!sel || soloLectura) return;
    const agregar = (html) => barraSel.insertAdjacentHTML('beforeend', html);
    if (sel.tipo === 'cable') {
      agregar('<span class="tc-etiqueta">Cable</span>');
      for (const [nombre, hex] of Object.entries(COLORES_CABLE)) {
        const activa = sel.cable.color === nombre ? ' tc-activa' : '';
        agregar(
          `<button type="button" class="tc-muestra${activa}" data-accion="color" data-color="${nombre}" ` +
            `title="${nombre}" aria-label="Cable ${nombre}" style="background:${hex}"></button>`,
        );
      }
    } else {
      const c = componente(sel.id);
      const def = TIPOS[c.tipo];
      const v = vistas.get(c.id);
      agregar(`<span class="tc-etiqueta">${def ? def.nombre : 'Pieza desconocida'}</span>`);
      if (def && def.campo) {
        const actual = String(c.props[def.campo.prop]);
        const opciones = def.campo.opciones
          .map(([valor, texto]) => `<option value="${valor}"${actual === String(valor) ? ' selected' : ''}>${texto}</option>`)
          .join('');
        agregar(`<label class="tc-campo">${def.campo.etiqueta} <select data-prop="${def.campo.prop}">${opciones}</select></label>`);
      }
      if (def && def.perilla) {
        const valor = Math.round((Number(c.props[def.perilla.prop]) || 0) * 100);
        agregar(`<label class="tc-campo">${def.perilla.etiqueta} <input type="range" min="0" max="100" value="${valor}" data-perilla aria-label="${def.perilla.etiqueta} del potenciómetro"></label>`);
      }
      if (c.tipo === 'led') {
        const encendido = v && v.el.value ? ' checked' : '';
        agregar(`<label class="tc-check"><input type="checkbox" data-accion="encender"${encendido}> Ver encendido</label>`);
      }
      agregar('<button type="button" data-accion="girar">Girar</button>');
    }
    agregar('<button type="button" data-accion="borrar">Borrar</button>');
  }

  function agregarComponente(tipo) {
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
      x: Math.round(cx - 20 + corrimiento),
      y: Math.round(cy - 20 + corrimiento),
      rot: 0,
      props: copia(def.props),
    };
    datos.componentes.push(c);
    crearVista(id, tipo, c.props);
    emitir('componente_agregado', { id, tipo });
    seleccionar({ tipo: 'comp', id });
    cambio();
  }

  function girar() {
    if (!sel || sel.tipo !== 'comp') return;
    const c = componente(sel.id);
    c.rot = ((c.rot || 0) + 90) % 360;
    ubicar(vistas.get(c.id));
    dibujarCables();
    emitir('componente_cambiado', { id: c.id, rot: c.rot });
    cambio();
  }

  function borrar() {
    if (!sel) return;
    if (sel.tipo === 'cable') {
      quitarCable(sel.cable);
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
    }
    ocultarTip();
    seleccionar(null);
    cambio();
  }

  barra.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-accion]');
    if (!b) return;
    const accion = b.dataset.accion;
    if (accion === 'acercar') return zoom(1.25);
    if (accion === 'alejar') return zoom(0.8);
    if (accion === 'encuadrar') return encuadrar();
    if (soloLectura) return;
    if (accion === 'agregar') agregarComponente(b.dataset.tipo);
    else if (accion === 'girar') girar();
    else if (accion === 'borrar') borrar();
    else if (accion === 'color' && sel && sel.tipo === 'cable') {
      sel.cable.color = b.dataset.color;
      dibujarCables();
      pintarBarra();
      cambio();
    }
  });

  barra.addEventListener('change', (e) => {
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
    const valor = typeof def.props[prop] === 'number' ? Number(e.target.value) : e.target.value;
    c.props = { ...c.props, [prop]: valor };
    def.aplicar(v.el, c.props);
    emitir('componente_cambiado', { id: c.id, props: copia(c.props) });
    cambio();
  });

  barra.addEventListener('input', (e) => {
    if (soloLectura || !sel || sel.tipo !== 'comp' || !('perilla' in e.target.dataset)) return;
    const v = vistas.get(sel.id);
    girarPerilla(sel.id, Number(e.target.value) / 100);
    if (v) TIPOS.potenciometro.aplicar(v.el, componente(sel.id).props);
  });

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
    const deslizador = sel && sel.tipo === 'comp' && sel.id === id && barraSel.querySelector('[data-perilla]');
    if (deslizador && Number(deslizador.value) !== Math.round(p * 100)) deslizador.value = Math.round(p * 100);
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
      const c = componente(comp.dataset.id);
      seleccionar({ tipo: 'comp', id: c.id });
      // Sobre la perilla del potenciómetro, el arrastre la gira (lo maneja el dibujo de Wokwi): no se mueve la pieza.
      if (TIPOS[c.tipo] && TIPOS[c.tipo].perilla && e.composedPath().some(esPerilla)) return;
      gesto = { tipo: 'mover', id: c.id, dx: m.x - c.x, dy: m.y - c.y, x0: e.clientX, y0: e.clientY, movido: false };
      return capturar(e);
    }
    seleccionar(null);
    iniciarPaneo(e);
  });

  area.addEventListener('pointermove', (e) => {
    const m = aMundo(e);
    if (gesto) {
      if (!gesto.movido && Math.hypot(e.clientX - gesto.x0, e.clientY - gesto.y0) > UMBRAL_CLIC) gesto.movido = true;
      if (gesto.movido && gesto.tipo === 'mover') {
        const c = componente(gesto.id);
        c.x = Math.round(m.x - gesto.dx);
        c.y = Math.round(m.y - gesto.dy);
        ubicar(vistas.get(c.id));
        dibujarCables();
      } else if (gesto.movido && gesto.tipo === 'paneo') {
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
  });

  function alSoltar(e) {
    const g = gesto;
    gesto = null;
    area.classList.remove('tc-paneando');
    if (!g) return;
    if (g.tipo === 'mover' && g.movido) {
      const c = componente(g.id);
      emitir('componente_cambiado', { id: c.id, x: c.x, y: c.y });
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
  area.addEventListener('pointerleave', () => ocultarTip());

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
    if (e.key === 'Escape') {
      if (trazando) cancelarCable();
      else seleccionar(null);
    } else if (soloLectura) {
      return;
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      if (trazando) quitarPunto();
      else borrar();
    } else if ((e.key === 'r' || e.key === 'R') && !e.ctrlKey && !e.metaKey && !e.altKey) {
      girar();
    }
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

  function encuadrar() {
    const ancho = area.clientWidth;
    const alto = area.clientHeight;
    if (!ancho || !alto) return false;
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
    if (!isFinite(x0)) return false;
    const margen = 48;
    const ajuste = Math.min((ancho - 2 * margen) / (x1 - x0 || 1), (alto - 2 * margen) / (y1 - y0 || 1));
    const escala = Math.min(2.4, Math.max(ESCALA_MIN, ajuste));
    Object.assign(camara, { escala, px: ancho / 2 - ((x0 + x1) / 2) * escala, py: alto / 2 - ((y0 + y1) / 2) * escala });
    aplicarCamara();
    return true;
  }

  // ---- Rótulos y ayuda

  function rotulo(ref) {
    const [id, pin] = partirRef(ref);
    if (id === 'placa') return PLACAS[placa].rotulo(pin);
    const c = componente(id);
    const def = c && TIPOS[c.tipo];
    return def ? `${def.nombre}: ${def.rotulo(pin)}` : pin;
  }

  function mostrarTip(pin) {
    const ref = pin ? pin.dataset.ref : null;
    if (ref === tipRef) return;
    tipRef = ref;
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
  }

  function actualizarAyuda() {
    clearTimeout(tAviso);
    ayuda.classList.remove('tc-aviso');
    const conDobleces = sel && sel.tipo === 'cable' && sel.cable.puntos && sel.cable.puntos.length;
    ayuda.textContent = soloLectura
      ? 'Solo lectura: puedes mover la vista y hacer zoom.'
      : trazando
        ? trazando.puntos.length
          ? 'Clic en otro pin para terminar · Clic en el espacio libre para doblar · Supr: quitar el último doblez · Esc: cancelar'
          : 'Clic en otro pin para terminar · Clic en el espacio libre para doblar el cable · Esc: cancelar'
        : conDobleces
          ? 'Arrastra los puntos blancos para acomodar el cable · Doble clic en un punto: quitarlo · Supr: borrar'
          : sel && sel.tipo === 'cable'
            ? 'Elige el color arriba · Doble clic en el cable para doblarlo · Supr: borrar'
            : sel
              ? 'Arrástralo para moverlo · R: girar · Supr: borrar'
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
    // Interno (no es parte del contrato): el simulador lo usa para mostrar lo que pasa.
    _mostrar(estado) {
      vistaSim = { leds: estado.leds || {}, quemados: estado.quemados || [], voltajes: estado.voltajes || {}, placa: estado.placa || {} };
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
  // Si el lienzo nace oculto, se encuadra la primera vez que tenga tamaño.
  const ro = new ResizeObserver(() => {
    if (listo && !encuadrado && !destruido) encuadrado = encuadrar();
  });
  ro.observe(area);
  Promise.all([crearVista('placa'), ...datos.componentes.map((c) => crearVista(c.id, c.tipo, c.props))]).then(() => {
    if (destruido) return;
    listo = true;
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
  if (!('protoboard' in c)) c.protoboard = null;
  return c;
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
