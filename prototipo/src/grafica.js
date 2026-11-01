// La gráfica de mediciones en el tiempo (MED-002, pedido de Efraín del 29 oct). Funciona como el graficador del monitor
// serial, pero toma los datos directamente del simulador: no hace falta cablear ni programar el Arduino para leer una
// variable. Es la misma en TecnoBloques y en la página de prueba, como la tabla de Mediciones (filasDeMediciones).
//
//   const g = TecnoCircuito.crearGrafica(contenedor, { alEvento });
//   g.conectar(sim);   // una simulación nueva: la gráfica empieza de cero y toma muestras de sim.mediciones()
//   g.desconectar();   // al detener: deja de tomar muestras y conserva lo que tiene
//   g.mostrar(true);   // la pestaña a la vista (solo se dibuja a la vista)
//   g.publicarPendiente();  // antes de cerrar o cambiar la sesión: el cambio de las marcadas que espera su evento sale ya
//
// Decisiones de Efraín: una lista de chequeo con todo lo medible; hasta 6 medidas, cada una con su color; ventana de
// 10 s que se llena y después avanza; un eje por unidad (dos a la vez, uno a cada lado); pausa, borrar y CSV; se
// reinicia al simular de nuevo; el registro guarda que se abrió y qué medidas se marcaron, sin valores ni tiempos.
// Reutiliza del graficador de TecnoBloques (src/graficador.js) las marcas de los ejes, la paleta y el dibujo en canvas.

import { tramosMostrados } from './mediciones.js';
import { VERSION_EVENTOS } from './eventos.js';

export const MAX_MEDIDAS = 6;
export const MAX_UNIDADES = 2;
export const VENTANA_MS = 10000;
const MUESTRAS_MAX = 12000; // a 20 muestras por segundo, 10 minutos simulados (lo que va en el CSV)
const CADA_MS = 50; // cada cuánto se pide una muestra al simulador (las mediciones ya vienen promediadas)
// Cuándo se quitan de las marcadas las medidas que el circuito nuevo no tiene: no con la primera muestra, porque en
// t = 0 el programa todavía no configuró sus pines (sus medidas llegan en el primer milisegundo).
const PODAR_MS = 500;
// Seis colores de la paleta del graficador de TecnoBloques (probada para daltonismo)
const COLORES = ['#2a78d6', '#eb6834', '#1baf7a', '#c98500', '#d55181', '#7a5fd0'];
// Lo menos que abarca un eje: una corriente de nA (la de un pin de entrada) se ve plana en 0, no estirada a todo el alto
const RANGO_MINIMO = { V: 0.5, mA: 0.5, '%': 10, 'kΩ': 0.5 };

// ---------------- Lo medible (no toca la página: se prueba con Node) ----------------

const nombrePin = (pin) => 'Pin ' + pin.replace(/^D/, '');
const ok = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null);

/** Todo lo que se puede graficar de una medición: [{ id, pieza, nombre, unidad, valor }], en el orden de la tabla.
 *  Los ids son nuestros (el id de la pieza o el pin, y la magnitud): no llevan nada que escriba el aprendiz. */
export function medidasDe(m) {
  if (!m || !m.leds) return [];
  const r = [];
  const medida = (id, pieza, nombre, unidad, valor) => r.push({ id, pieza, nombre: `${pieza} · ${nombre}`, unidad, valor: ok(valor) });
  const pwm = m.pwm || {};
  for (const p of m.pines || []) {
    const pieza = nombrePin(p.pin);
    medida(`${p.pin}.voltaje`, pieza, 'voltaje', 'V', p.v);
    medida(`${p.pin}.corriente`, pieza, 'corriente', 'mA', ok(p.i) === null ? null : p.i * 1000);
    // Un pin que no está en `pwm` está fijo: en ALTO es 100 % y en BAJO, 0 %
    const u = typeof pwm[p.pin] === 'number' ? pwm[p.pin] : ok(p.v) === null ? null : p.v > 2.5 ? 1 : 0;
    medida(`${p.pin}.pwm`, pieza, 'PWM', '%', u === null ? null : u * 100);
  }
  for (const x of m.potenciometros || []) {
    const { elegidos } = tramosMostrados(x);
    const uno = elegidos.length === 1 ? elegidos[0] : null; // con un solo tramo, la fila da su voltaje y su corriente
    medida(`${x.id}.voltaje`, x.id, 'voltaje', 'V', uno ? uno.v : x.v);
    medida(`${x.id}.corriente`, x.id, 'corriente', 'mA', (uno ? uno.i : x.i) * 1000);
    for (const t of elegidos) medida(`${x.id}.tramo_${t.pata}`, x.id, `tramo SIG–${t.pata}`, 'kΩ', t.ohmios / 1000);
  }
  for (const x of m.resistencias || []) {
    medida(`${x.id}.voltaje`, x.id, 'voltaje', 'V', x.v);
    medida(`${x.id}.corriente`, x.id, 'corriente', 'mA', ok(x.i) === null ? null : x.i * 1000);
  }
  for (const l of m.leds || []) {
    medida(`${l.id}.voltaje`, l.id, 'voltaje', 'V', l.v);
    medida(`${l.id}.corriente`, l.id, 'corriente', 'mA', ok(l.i) === null ? null : l.i * 1000);
    medida(`${l.id}.brillo`, l.id, 'brillo', '%', l.quemado ? 0 : ok(l.brillo) === null ? null : l.brillo * 100);
  }
  const mA = (a) => (ok(a) === null ? null : a * 1000);
  for (const s of m.servos || []) medida(`${s.id}.corriente`, `${s.id} (${s.modelo.toUpperCase()})`, 'corriente', 'mA', mA(s.i));
  for (const x of m.motores || []) {
    medida(`${x.id}.voltaje`, x.id, 'voltaje', 'V', x.voltios);
    medida(`${x.id}.corriente`, x.id, 'corriente', 'mA', mA(x.i));
  }
  for (const b of m.baterias || []) {
    medida(`${b.id}.voltaje`, `${b.id} (LiPo 2S)`, 'voltaje', 'V', b.voltios);
    medida(`${b.id}.corriente`, `${b.id} (LiPo 2S)`, 'corriente', 'mA', b.conectada ? mA(b.i) : 0);
  }
  // La placa, en todas (pedido de Efraín del 1 nov): lo que entregan sus salidas 5V y 3,3V y lo que pide a su
  // alimentación, para ver cuánta carga le pone el circuito y por qué se reinicia. El pico es el mayor del último
  // segundo: un arranque de servo dura milisegundos y el promedio de cada muestra lo esconde.
  const e = m.usb;
  if (e) {
    const v33 = e.referencia ? e.voltios3V3 : e.apagada ? 0 : 3.3; // el 3,3V del Uno es ideal en el modelo
    medida('placa_5V.voltaje', '5V de la placa', 'voltaje', 'V', e.voltios);
    medida('placa_5V.corriente', '5V de la placa', 'corriente', 'mA', mA(m.consumo5V));
    medida('placa_3V3.voltaje', '3,3V de la placa', 'voltaje', 'V', v33);
    medida('placa_3V3.corriente', '3,3V de la placa', 'corriente', 'mA', mA(m.consumo3V3));
    if (e.expansion) {
      medida('expansion_3V3.voltaje', 'Expansión · 3,3V', 'voltaje', 'V', e.voltios3V3Expansion);
      medida('expansion_3V3.corriente', 'Expansión · 3,3V', 'corriente', 'mA', mA(m.consumo3V3Expansion));
    }
    const fuente = e.referencia ? 'Nano · alimentación' : 'USB (placa y circuito)';
    if (e.referencia && e.fuente === 'jack') medida('alimentacion.voltaje', fuente, 'voltaje del jack', 'V', e.voltiosJack);
    medida('alimentacion.corriente', fuente, 'corriente', 'mA', mA(e.amperios));
    medida('alimentacion.pico', fuente, 'pico del último segundo', 'mA', mA(e.pico));
    if (!e.referencia) medida('alimentacion.fusible', fuente, 'calor del fusible', '%', ok(e.fusible) === null ? null : e.fusible * 100);
  }
  return r;
}

/** ¿Se puede marcar `id` además de `marcadas`? { ok, motivo }: hasta 6 medidas y hasta 2 unidades a la vez. */
export function sePuedeMarcar(marcadas, id, catalogo) {
  if (marcadas.includes(id)) return { ok: true };
  if (marcadas.length >= MAX_MEDIDAS) return { ok: false, motivo: `Hasta ${MAX_MEDIDAS} medidas a la vez: desmarca una para elegir otra.` };
  const unidades = new Set(marcadas.map((k) => catalogo.get(k)?.unidad).filter(Boolean));
  const unidad = catalogo.get(id)?.unidad;
  if (unidad && !unidades.has(unidad) && unidades.size >= MAX_UNIDADES) {
    return { ok: false, motivo: `Dos unidades a la vez (${[...unidades].join(' y ')}), una en cada eje: desmarca las de una para ver ${unidad}.` };
  }
  return { ok: true };
}

/** Las muestras de una simulación: { t (ms simulados), valores: { id: número o null } }, con todo lo medible, así una
 *  medida que se marca después ya tiene su historia. `catalogo`: id → { pieza, nombre, unidad }, en el orden de la
 *  tabla, aunque una medida llegue tarde (un pin que el programa configura después de la primera muestra). */
export function crearRegistroGrafica(max = MUESTRAS_MAX) {
  const r = { muestras: [], catalogo: new Map(), version: 0 };
  r.agregar = (t, m) => {
    if (typeof t !== 'number' || !Number.isFinite(t)) return false;
    const ultima = r.muestras[r.muestras.length - 1];
    if (ultima && t <= ultima.t) return false; // el reloj no avanzó (pausa) o volvió atrás: nada nuevo
    const valores = {};
    const lista = medidasDe(m);
    if (lista.some((x) => !r.catalogo.has(x.id))) {
      // Una medida nueva: la lista se ordena otra vez como la tabla; las que ya no vienen quedan al final
      const antes = new Map(r.catalogo);
      r.catalogo.clear();
      for (const x of lista) r.catalogo.set(x.id, antes.get(x.id) || { pieza: x.pieza, nombre: x.nombre, unidad: x.unidad });
      for (const [k, c] of antes) if (!r.catalogo.has(k)) r.catalogo.set(k, c);
    }
    for (const x of lista) valores[x.id] = x.valor;
    r.muestras.push({ t, valores });
    if (r.muestras.length > max + Math.ceil(max / 20)) r.muestras.splice(0, r.muestras.length - max); // por bloques
    r.version++;
    return true;
  };
  r.limpiar = () => {
    r.muestras.length = 0;
    r.version++;
  };
  /** Otra simulación: sin muestras y sin lista (el circuito pudo cambiar). Borrar, en cambio, conserva la lista. */
  r.reiniciar = () => {
    r.muestras.length = 0;
    r.catalogo.clear();
    r.version++;
  };
  /** Las muestras que se ven: la ventana de 10 s que termina en `tFin` (la última, o la de la pausa). Mientras no
   *  pasan 10 s, la ventana va de 0 a 10 s y se llena sola; después avanza. */
  r.ventana = (tFin) => {
    const L = r.muestras;
    const fin = typeof tFin === 'number' ? tFin : L.length ? L[L.length - 1].t : 0;
    const tIni = Math.max(0, fin - VENTANA_MS);
    const tFinEje = Math.max(fin, VENTANA_MS);
    const filas = [];
    for (let i = L.length - 1; i >= 0; i--) {
      if (L[i].t > fin) continue;
      if (L[i].t < tIni) break;
      filas.push(L[i]);
    }
    return { tIni, tFin: tFinEje, filas: filas.reverse() };
  };
  /** CSV para Excel en español («;», coma decimal, marca UTF-8), como el del monitor de TecnoBloques. `ids`: las
   *  columnas (las marcadas); sin ellas, todas. */
  r.csv = (ids) => {
    const cols = ids && ids.length ? ids : [...r.catalogo.keys()];
    const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? String(Math.round(v * 1e6) / 1e6).replace('.', ',') : '');
    const titulo = (k) => { const c = r.catalogo.get(k); return `"${(c ? `${c.nombre} (${c.unidad})` : k).replace(/"/g, '""')}"`; };
    const filas = [['t_s', ...cols.map(titulo)].join(';')];
    for (const x of r.muestras) filas.push([num(x.t / 1000), ...cols.map((k) => num(x.valores[k]))].join(';'));
    return '﻿' + filas.join('\r\n') + '\r\n';
  };
  return r;
}

// Marcas «redondas» para los ejes: 1, 2, 5 × 10^n (las del graficador de TecnoBloques)
export function marcasEje(min, max, cuantas) {
  const paso0 = (max - min) / Math.max(1, cuantas);
  if (!(paso0 > 0) || !Number.isFinite(paso0)) return [min];
  const p10 = Math.pow(10, Math.floor(Math.log10(paso0)));
  const paso = [1, 2, 5, 10].map((m) => m * p10).find((p) => p >= paso0) || p10 * 10;
  const r = [];
  const desde = Math.ceil(min / paso);
  for (let n = 0; n < 50; n++) {
    const v = (desde + n) * paso;
    if (v > max + paso * 1e-9) break;
    r.push(Math.round(v * 1e9) / 1e9);
  }
  return r.length ? r : [min];
}

// ---------------- En la página ----------------

const ESTILO = `
.tc-graf { display: flex; flex-direction: column; gap: 6px; font: 12.5px/1.4 system-ui, "Segoe UI", sans-serif; color: var(--ink, #1d2733); }
.tc-graf-barra { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.tc-graf-barra button { font: inherit; padding: 2px 9px; border: 1px solid var(--line, #c9d2dc); border-radius: 6px; background: var(--panel, #fff); color: inherit; cursor: pointer; }
.tc-graf-barra button:disabled { opacity: 0.5; cursor: default; }
.tc-graf-nota { color: var(--muted, #5a6673); font-size: 12px; }
.tc-graf-hueco { flex: 1 1 auto; }
.tc-graf-area { position: relative; height: 220px; border: 1px solid var(--line, #c9d2dc); border-radius: 6px; background: var(--panel, #fff); }
.tc-graf-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.tc-graf-vacio { position: absolute; inset: 0; margin: 0; display: grid; place-items: center; padding: 16px; text-align: center; color: var(--muted, #5a6673); }
.tc-graf-vacio[hidden] { display: none; }
.tc-graf-lista { display: flex; flex-direction: column; gap: 2px; max-height: 260px; overflow: auto; }
.tc-graf-pieza { margin: 6px 0 1px; font-weight: 600; color: var(--muted, #5a6673); font-size: 12px; }
.tc-graf-medida { display: flex; align-items: center; gap: 6px; cursor: pointer; }
.tc-graf-medida.tc-graf-apagada { color: var(--muted, #5a6673); cursor: not-allowed; }
.tc-graf-muestra { display: inline-block; width: 14px; height: 4px; border-radius: 2px; flex: none; background: transparent; }
.tc-graf-valor { margin-left: auto; font-variant-numeric: tabular-nums; color: var(--muted, #5a6673); }
`;

// Tres cifras; lo que es casi cero (una corriente de nA en un pin de entrada) se ve como 0, no como «6e-10»
const formato = (v) => (v === null || v === undefined || !Number.isFinite(v) ? '—' : Math.abs(v) < 5e-4 ? '0'
  : (Math.abs(v) >= 100 ? String(Math.round(v * 10) / 10) : String(+v.toPrecision(3))).replace('.', ','));

/** La gráfica en `caja` (un elemento de la página). `alEvento` recibe `grafica_vista` (origen `circuito`). */
export function crearGrafica(caja, { alEvento } = {}) {
  const doc = caja.ownerDocument;
  const raiz = caja.getRootNode();
  const dondeEstilo = raiz && raiz.nodeType === 11 ? raiz : doc.head; // en un shadowRoot, adentro
  if (!dondeEstilo.querySelector('style[data-tc-grafica]')) {
    const st = doc.createElement('style');
    st.setAttribute('data-tc-grafica', '');
    st.textContent = ESTILO;
    dondeEstilo.append(st);
  }
  const nuevo = (tag, attrs = {}, ...hijos) => {
    const e = doc.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    e.append(...hijos);
    return e;
  };
  const btnPausa = nuevo('button', { type: 'button', 'aria-pressed': 'false', 'data-grafica': 'pausa' }, '⏸ Pausar');
  const btnBorrar = nuevo('button', { type: 'button', 'data-grafica': 'borrar' }, 'Borrar');
  const btnCSV = nuevo('button', { type: 'button', 'data-grafica': 'csv' }, 'Exportar CSV');
  const nota = nuevo('span', { class: 'tc-graf-nota', 'aria-live': 'polite' });
  const lienzo = nuevo('canvas', { class: 'tc-graf-canvas', role: 'img', 'aria-label': 'Gráfica de las medidas marcadas en el tiempo' });
  const vacio = nuevo('p', { class: 'tc-graf-vacio' }, 'Pulsa Simular y marca hasta 6 medidas para verlas en el tiempo.');
  const area = nuevo('div', { class: 'tc-graf-area' }, lienzo, vacio);
  const aviso = nuevo('p', { class: 'tc-graf-nota', 'aria-live': 'polite', hidden: '' });
  const lista = nuevo('div', { class: 'tc-graf-lista', role: 'group', 'aria-label': 'Medidas para graficar' });
  const cuerpo = nuevo('div', { class: 'tc-graf' },
    nuevo('div', { class: 'tc-graf-barra' }, btnPausa, btnBorrar, btnCSV, nuevo('span', { class: 'tc-graf-hueco' }), nota), area, aviso, lista);
  caja.append(cuerpo);

  const registro = crearRegistroGrafica();
  let marcadas = []; // ids, en el orden en que se marcaron (de ahí sale su color)
  const colorDe = new Map(); // id → color, mientras está marcada
  let sim = null;
  let reloj = 0;
  let visible = false;
  let pausa = null; // { tFin } mientras está en pausa: la gráfica se congela, el registro sigue
  let cuadro = 0;
  let pintado = -1;
  let listaPintada = '';
  let avisoReloj = 0;
  let eventoReloj = 0;
  let ultimoEvento = null;
  let podar = false; // otra simulación: a los PODAR_MS se quita de las marcadas lo que el circuito ya no tiene

  // --- El registro: que se abrió la pestaña y qué medidas se marcaron, sin valores ni tiempos
  function emitir() {
    clearTimeout(eventoReloj);
    eventoReloj = 0;
    if (!alEvento || !visible) return;
    const medidas = [...marcadas];
    const clave = medidas.join('|');
    if (ultimoEvento === clave) return; // nada cambió desde el último
    ultimoEvento = clave;
    try {
      alEvento({ v: VERSION_EVENTOS, t: Date.now(), origen: 'circuito', tipo: 'grafica_vista', datos: { medidas } });
    } catch (err) {
      console.error(err); // un error de quien escucha no debe romper la gráfica
    }
  }
  // Marcar varias seguidas no deja un evento por clic: sale uno 1,5 s después del último cambio
  const emitirLuego = () => { clearTimeout(eventoReloj); eventoReloj = setTimeout(emitir, 1500); };
  // Un cambio que espera su evento sale ya: al dejar de verla (si no, se perdería) o al terminar la sesión del equipo
  // (si no, le tocaría al siguiente). F01 de la verificación de Codex (1 nov).
  const publicarPendiente = () => { if (eventoReloj) emitir(); };

  function avisar(texto) {
    aviso.textContent = texto;
    aviso.hidden = !texto;
    clearTimeout(avisoReloj);
    if (texto) avisoReloj = setTimeout(() => avisar(''), 6000);
  }

  function marcar(id, si) {
    if (si) {
      const r = sePuedeMarcar(marcadas, id, registro.catalogo);
      if (!r.ok) { avisar(r.motivo); return false; }
      if (!marcadas.includes(id)) {
        marcadas.push(id);
        const usados = new Set(colorDe.values());
        colorDe.set(id, COLORES.find((c) => !usados.has(c)) || COLORES[0]);
      }
    } else {
      marcadas = marcadas.filter((k) => k !== id);
      colorDe.delete(id);
    }
    avisar('');
    listaPintada = '';
    pintarLista();
    emitirLuego();
    pedir();
    return true;
  }

  // --- La lista de chequeo: todo lo medible, por pieza, con su valor actual
  function pintarLista() {
    const ultima = registro.muestras[registro.muestras.length - 1];
    const clave = [...registro.catalogo.keys()].join('|') + '#' + marcadas.join('|');
    if (clave !== listaPintada) {
      listaPintada = clave;
      const activo = caja.getRootNode().activeElement;
      const enfocada = activo && lista.contains(activo) ? activo.dataset.medida : null; // para seguir con el teclado
      lista.textContent = '';
      let pieza = null;
      for (const [id, c] of registro.catalogo) {
        if (c.pieza !== pieza) { pieza = c.pieza; lista.append(nuevo('p', { class: 'tc-graf-pieza' }, pieza)); }
        const casilla = nuevo('input', { type: 'checkbox', 'data-medida': id });
        casilla.checked = marcadas.includes(id);
        const permitido = sePuedeMarcar(marcadas, id, registro.catalogo).ok;
        const etiqueta = nuevo('label', { class: 'tc-graf-medida' + (permitido ? '' : ' tc-graf-apagada') },
          casilla, nuevo('span', { class: 'tc-graf-muestra', style: `background:${colorDe.get(id) || 'transparent'}` }),
          `${c.nombre.slice(c.pieza.length + 3)} (${c.unidad})`, nuevo('span', { class: 'tc-graf-valor', 'data-valor': id }));
        if (!permitido) etiqueta.title = sePuedeMarcar(marcadas, id, registro.catalogo).motivo;
        casilla.addEventListener('change', () => { if (!marcar(id, casilla.checked)) casilla.checked = false; });
        lista.append(etiqueta);
        if (id === enfocada) casilla.focus();
      }
    }
    for (const el of lista.querySelectorAll('[data-valor]')) el.textContent = ultima ? formato(ultima.valores[el.dataset.valor]) : '—';
  }

  // --- El dibujo
  const aLaVista = () => visible && caja.isConnected && caja.offsetParent !== null;
  function pedir() {
    if (!aLaVista() || cuadro) return;
    cuadro = requestAnimationFrame(pintar);
  }
  function pintar() {
    cuadro = 0;
    if (!aLaVista()) return;
    pintado = registro.version;
    pintarLista();
    const d = registro.ventana(pausa ? pausa.tFin : undefined);
    const series = marcadas.filter((k) => registro.catalogo.has(k));
    vacio.hidden = !!(series.length && d.filas.length);
    vacio.textContent = !registro.muestras.length ? 'Pulsa Simular y marca hasta 6 medidas para verlas en el tiempo.' : 'Marca hasta 6 medidas en la lista para verlas en el tiempo.';
    nota.textContent = pausa ? 'En pausa: sigue guardando' : sim ? 'Tiempo simulado' : registro.muestras.length ? 'Detenida' : '';
    const dpr = (doc.defaultView && doc.defaultView.devicePixelRatio) || 1;
    const W = lienzo.clientWidth;
    const H = lienzo.clientHeight;
    if (lienzo.width !== Math.round(W * dpr) || lienzo.height !== Math.round(H * dpr)) {
      lienzo.width = Math.round(W * dpr);
      lienzo.height = Math.round(H * dpr);
    }
    const g = lienzo.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, W, H);
    if (vacio.hidden === false || W < 80 || H < 60) return;

    // Un eje por unidad: la primera unidad marcada a la izquierda y la segunda a la derecha
    const unidades = [...new Set(series.map((k) => registro.catalogo.get(k).unidad))];
    const rango = (u) => {
      let min = Infinity;
      let max = -Infinity;
      for (const f of d.filas) for (const k of series) {
        if (registro.catalogo.get(k).unidad !== u) continue;
        const v = f.valores[k];
        if (typeof v === 'number' && Number.isFinite(v)) { min = Math.min(min, v); max = Math.max(max, v); }
      }
      if (!Number.isFinite(min)) [min, max] = [0, 1];
      if (min > 0 && min < max * 0.5) min = 0; // magnitudes positivas: desde 0, salvo que varíen poco
      const minimo = RANGO_MINIMO[u] || 0.5;
      if (max - min < minimo) { // poca variación: alrededor del valor, sin bajar de 0 si todo es positivo
        const centro = (max + min) / 2;
        min = Math.abs(centro) < minimo / 2 && min >= -1e-9 ? 0 : centro - minimo / 2;
        max = min + minimo;
      }
      const margen = (max - min) * 0.08;
      return [min - (min === 0 ? 0 : margen), max + margen];
    };
    const ejes = unidades.map((u) => ({ u, rango: rango(u) }));
    const css = getComputedStyle(caja);
    const tinta = css.getPropertyValue('--ink').trim() || '#1d2733';
    const suave = css.getPropertyValue('--muted').trim() || '#5a6673';
    const rejilla = css.getPropertyValue('--line').trim() || '#d8dee5';
    g.font = '11px system-ui, sans-serif';
    const arriba = 18;
    const abajo = 22;
    const alto = H - arriba - abajo;
    const marcasDe = (e) => marcasEje(e.rango[0], e.rango[1], Math.max(2, Math.floor(alto / 40)));
    // Lo que ocupa un eje: sus números y su unidad, que va arriba
    const anchoEje = (e) => (e ? Math.max(g.measureText(e.u).width, ...marcasDe(e).map((v) => g.measureText(formato(v)).width)) + 12 : 10);
    const izq = anchoEje(ejes[0]);
    const der = ejes[1] ? anchoEje(ejes[1]) : 12;
    const ancho = W - izq - der;
    const X = (t) => izq + ((t - d.tIni) / (d.tFin - d.tIni || 1)) * ancho;
    const Y = (e, v) => arriba + (1 - (v - e.rango[0]) / (e.rango[1] - e.rango[0] || 1)) * alto;

    // Rejilla del eje izquierdo y marcas de los dos ejes, con su unidad arriba
    g.lineWidth = 1;
    g.textBaseline = 'middle';
    ejes.forEach((e, n) => {
      g.fillStyle = suave;
      g.textAlign = n === 0 ? 'right' : 'left';
      for (const v of marcasDe(e)) {
        const y = Math.round(Y(e, v)) + 0.5;
        if (n === 0) { g.strokeStyle = rejilla; g.beginPath(); g.moveTo(izq, y); g.lineTo(izq + ancho, y); g.stroke(); }
        g.fillText(formato(v), n === 0 ? izq - 6 : izq + ancho + 6, y);
      }
      g.fillStyle = tinta;
      g.textBaseline = 'top';
      g.fillText(e.u, n === 0 ? izq - 6 : izq + ancho + 6, 2);
      g.textBaseline = 'middle';
    });
    g.textAlign = 'center';
    g.textBaseline = 'top';
    g.fillStyle = suave;
    for (const s of marcasEje(d.tIni / 1000, d.tFin / 1000, Math.max(2, Math.floor(ancho / 70)))) {
      const x = X(s * 1000);
      if (x < izq - 1 || x > izq + ancho + 1) continue;
      g.fillText(formato(s) + ' s', x, arriba + alto + 5);
    }

    // Las líneas (2 px); un hueco (sin valor) corta la línea
    g.save();
    g.beginPath(); g.rect(izq, arriba - 2, ancho, alto + 4); g.clip();
    g.lineWidth = 2;
    g.lineJoin = 'round';
    for (const k of series) {
      const e = ejes.find((x) => x.u === registro.catalogo.get(k).unidad);
      g.strokeStyle = colorDe.get(k);
      g.beginPath();
      let enLinea = false;
      for (const f of d.filas) {
        const v = f.valores[k];
        if (typeof v !== 'number' || !Number.isFinite(v)) { enLinea = false; continue; }
        if (enLinea) g.lineTo(X(f.t), Y(e, v)); else g.moveTo(X(f.t), Y(e, v));
        enLinea = true;
      }
      g.stroke();
    }
    g.restore();
  }

  // --- Las muestras: mientras hay simulación conectada, cada 50 ms (si el reloj simulado avanzó)
  function muestrear() {
    if (!sim) return;
    let m = null;
    let t = null;
    try {
      m = (sim.mediciones || sim._mediciones).call(sim);
      const md = (sim.medidas || sim._medidas).call(sim);
      t = md && md.msSimulados;
    } catch (err) {
      return; // un simulador que se está cerrando: la siguiente vez
    }
    const ultima = registro.muestras[registro.muestras.length - 1];
    if (ultima && typeof t === 'number' && t < ultima.t) { registro.limpiar(); quitarPausa(); } // «Reiniciar»: el reloj volvió a 0
    if (!m || !registro.agregar(t, m)) return;
    if (podar && t >= PODAR_MS) {
      podar = false;
      const siguen = marcadas.filter((k) => registro.catalogo.has(k));
      if (siguen.length !== marcadas.length) {
        for (const k of marcadas) if (!siguen.includes(k)) colorDe.delete(k);
        marcadas = siguen;
        listaPintada = '';
        emitirLuego();
      }
    }
    if (!pausa) pedir();
    else if (aLaVista()) pintarLista(); // en pausa la lista sigue mostrando el valor actual
  }

  function quitarPausa() {
    pausa = null;
    btnPausa.textContent = '⏸ Pausar';
    btnPausa.setAttribute('aria-pressed', 'false');
  }
  btnPausa.addEventListener('click', () => {
    const L = registro.muestras;
    pausa = pausa ? null : { tFin: L.length ? L[L.length - 1].t : 0 };
    btnPausa.textContent = pausa ? '▶ Seguir' : '⏸ Pausar';
    btnPausa.setAttribute('aria-pressed', String(!!pausa));
    pedir();
  });
  btnBorrar.addEventListener('click', () => {
    registro.limpiar();
    quitarPausa();
    pedir();
  });
  btnCSV.addEventListener('click', () => {
    const texto = registro.csv(marcadas);
    const url = URL.createObjectURL(new Blob([texto], { type: 'text/csv;charset=utf-8' }));
    const a = nuevo('a', { href: url, download: 'mediciones en el tiempo.csv' });
    doc.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  if (typeof ResizeObserver === 'function') new ResizeObserver(() => pedir()).observe(area);

  return {
    /** Una simulación nueva: la gráfica empieza de cero (las medidas marcadas se conservan). */
    conectar(nuevoSim) {
      clearInterval(reloj);
      sim = nuevoSim || null;
      registro.reiniciar();
      podar = true;
      quitarPausa();
      if (sim) reloj = setInterval(muestrear, CADA_MS);
      listaPintada = '';
      pedir();
    },
    /** Al detener: deja de tomar muestras y conserva lo que tiene (se puede mirar y exportar). */
    desconectar() {
      clearInterval(reloj);
      reloj = 0;
      if (sim) muestrear(); // la última
      sim = null;
      pedir();
    },
    /** La pestaña a la vista o no. Al abrirla sale `grafica_vista` con las medidas marcadas. */
    mostrar(si) {
      const antes = visible;
      if (antes && !si) publicarPendiente(); // con la pestaña todavía a la vista
      visible = !!si;
      if (visible && !antes) { ultimoEvento = null; emitir(); listaPintada = ''; }
      if (!visible) { clearTimeout(eventoReloj); eventoReloj = 0; }
      pedir();
    },
    /** Si hay un cambio de las marcadas esperando su evento, lo emite ya (antes de cerrar o cambiar la sesión). */
    publicarPendiente,
    /** Para las pruebas: qué hay ahora. */
    estado() {
      const d = registro.ventana(pausa ? pausa.tFin : undefined);
      return {
        marcadas: [...marcadas],
        colores: marcadas.map((k) => colorDe.get(k)),
        medidas: [...registro.catalogo.keys()],
        muestras: registro.muestras.length,
        ventana: { tIni: d.tIni, tFin: d.tFin, filas: d.filas.length },
        pausa: !!pausa,
        conectada: !!sim,
        aviso: aviso.hidden ? '' : aviso.textContent,
      };
    },
    /** Para las pruebas y para quien quiera marcar desde afuera: devuelve si se pudo. */
    marcar,
    /** El CSV de las medidas marcadas (lo mismo que descarga el botón). */
    csv: () => registro.csv(marcadas),
  };
}
