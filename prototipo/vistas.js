// Trae las vistas medidas por TecnoDiseñador (docs/ENTREGA-VISTAS-TECNODISENADOR.md) y las deja como módulos en
// src/piezas/vistas/. Uso: npm run vistas [-- --origen <carpeta de TecnoDiseñador>]
//
// 1. Pasa el revisor de la entrega (pruebas/revisar_vista_td.py) con todas las piezas juntas: si algo no cumple, no
//    escribe nada.
// 2. Por cada SVG «-tc» escribe un módulo con su contenido (sin la raíz ni la declaración XML), su marco y sus pines en
//    milímetros, los colores de sus LED y su origen. La raíz con el tamaño en píxeles la pone cada pieza (src/piezas/).
// Los módulos generados se versionan: construir el paquete o etiquetar una versión no depende de TecnoDiseñador.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const aqui = (f) => path.join(__dirname, f);
const i = process.argv.indexOf('--origen');
if (i > 0 && !process.argv[i + 1]) throw new Error('Falta la carpeta después de --origen (la de TecnoDiseñador).');
const ORIGEN = i > 0 ? path.resolve(process.argv[i + 1]) : path.resolve(__dirname, '../../TecnoDiseñador');
const ENTREGAS = [
  { modulo: 'uno', json: 'componentes/uno-clon/entrega/tecnocircuito/uno-tc.json' },
  { modulo: 'nano', json: 'componentes/nano-clon-ch340/entrega/tecnocircuito/nano-tc.json' },
  { modulo: 'shield_nano_io_roja', json: 'componentes/nano-expansion/entrega/tecnocircuito/shield_nano_io-roja-tc.json' },
  { modulo: 'shield_nano_io_azul', json: 'componentes/nano-expansion/entrega/tecnocircuito/shield_nano_io-azul-tc.json' },
  { modulo: 'shield_l293d', json: 'componentes/l293d-shield/entrega/tecnocircuito/shield_l293d-tc.json' },
];

const jsons = ENTREGAS.map((e) => path.join(ORIGEN, e.json));
for (const f of jsons) if (!fs.existsSync(f)) throw new Error(`No encuentro la entrega ${f}. ¿La carpeta de TecnoDiseñador es ${ORIGEN}?`);

// El revisor sale con 1 si algo no cumple; execFileSync lanza el error con su salida y aquí se detiene todo.
const python = process.platform === 'win32' ? 'python' : 'python3';
try {
  execFileSync(python, ['-I', aqui('pruebas/revisar_vista_td.py'), ...jsons], { stdio: 'pipe', encoding: 'utf8' });
} catch (e) {
  process.stdout.write(e.stdout || '');
  process.stderr.write(e.stderr || '');
  console.error('\nLa entrega no cumple la especificación: no se escribió ningún módulo.');
  process.exit(1);
}

// Contenido de la raíz, en una sola línea: sin BOM, declaración XML, comentarios ni DOCTYPE antes de <svg>, y sin los
// saltos de línea entre etiquetas. Solo se quita el espacio que trae un salto de línea: el de una misma línea puede ser
// texto («<tspan>A6</tspan> <tspan>A7</tspan>»). El revisor ya garantizó que no hay estilos ni scripts.
function cuerpo(svg) {
  const inicio = svg.replace(/^﻿/, '').replace(/^(\s*(<\?xml[^>]*\?>|<!--[\s\S]*?-->|<!DOCTYPE[^>]*>))*\s*/, '');
  const abre = inicio.match(/^<svg\b[^>]*>/);
  const cierra = inicio.lastIndexOf('</svg>');
  if (!abre || cierra < 0) throw new Error('El SVG no empieza con <svg> o no termina con </svg>.');
  return inicio.slice(abre[0].length, cierra).replace(/>[ \t]*\r?\n\s*</g, '><').trim();
}

const destino = aqui('src/piezas/vistas');
fs.mkdirSync(destino, { recursive: true });
for (const [k, e] of ENTREGAS.entries()) {
  const datos = JSON.parse(fs.readFileSync(jsons[k], 'utf8'));
  const svg = fs.readFileSync(path.join(path.dirname(jsons[k]), datos.archivo), 'utf8');
  const vista = {
    pieza: datos.pieza,
    variante: datos.variante,
    prefijo: datos.prefijo,
    marco: datos.marco,
    pines: datos.pines,
    leds: datos.leds,
    partes: datos.partes,
    origen: { registro: datos.origen.registro, generador: datos.origen.generador, fecha: datos.origen.fecha },
    diferencias: datos.diferencias,
    cuerpo: cuerpo(svg),
  };
  const nombre = datos.pieza + (datos.variante ? ` (${datos.variante})` : '');
  const texto =
    '// SPDX-License-Identifier: Apache-2.0\n' +
    `// © 2026 SENA – TecnoAcademia Tolima · Vista de ${nombre} medida por TecnoDiseñador\n` +
    `// Registro de origen: TecnoDiseñador/${datos.origen.registro} (${datos.origen.fecha})\n` +
    '// Archivo generado por «npm run vistas»: no se edita a mano.\n\n' +
    `export default ${JSON.stringify(vista, null, 1)};\n`;
  fs.writeFileSync(path.join(destino, e.modulo + '.js'), texto.replace(/\r?\n/g, '\n'));
  console.log(`OK    ${e.modulo}.js: ${Object.keys(datos.pines).length} contactos, ${(Buffer.byteLength(vista.cuerpo) / 1024).toFixed(1)} KB de dibujo`);
}
console.log('\nVistas al día. Siguiente: npm run construir y npm run probar.');
