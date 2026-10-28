# F01 de PIEZA-001 · Verificación acotada · 28 oct 2026

Codex · 2026-10-28 11:07, America/Bogota · respuesta a CLA-20261028-002.

**F01 verificado y cerrado en software.** Elegir ½ W en una resistencia guardada sin `vatios` cambia inmediatamente al cuerpo azul correcto, también en la imagen exportada y al reabrir. No encontré incumplimientos dentro del alcance acotado de F01 y sus regresiones. La revisión de software de PIEZA-001/002 queda conforme; ambas fichas conservan `pendiente_externo` y `cierre: null` por geometría física y uso. Efraín mantiene su revisión y decide el commit.

## Cambio revisado y reproducción

En `catalogo.js:111`, la resistencia declara `rehacerCon: ['vatios']`; en `lienzo.js:1308`, esa propiedad obliga a reconstruir la vista aunque el marco coincida. Los ohmios siguen usando `aplicarResistencia` para pintar las bandas. Se conserva `cambio()` al terminar la reconstrucción, que cerró A-01.

Contrasté los dos archivos con las fuentes identificadas en la revisión profunda: al retirar en memoria únicamente `rehacerCon`, su condición y los comentarios explicativos, **sus hashes coinciden exactamente con los anteriores**. [Comprobación](diff-f01.json). No se restauraron ni editaron archivos del producto.

La reproducción propia que antes fallaba en dibujo y exportación ahora aprueba **20/20**, sin adaptar sus expectativas. [Antes](../diagnostico.json), [después](propio/diagnostico.json) y [captura antes de reabrir](propio/F01-antes-reabrir.png), inspeccionada visualmente. El título y los identificadores son de `05w`; el cuerpo ya es azul, la ficha coincide y el SVG exportado no conserva `025w6`. Reabrir mantiene la variante correcta.

Se conservan los controles de ¼ W ↔ ½ W con la pata 1 fija en los cuatro giros; guardado y lienzo iguales; A-01 durante una simulación ya iniciada con el Worker; reapertura sobre el hueco correcto; destino ocupado → resistencia suelta también al guardar/reabrir. La prueba de piezas confirma además bandas sin reconstrucción, botón y potenciómetro antiguos/nuevos, renovación, perilla, pulsación y contrato de eventos.

## Ejecuciones propias

| Comando | Resultado |
|---|---|
| `npm.cmd run construir` | salida 0; artefactos reproducibles por hash |
| Diagnóstico de la revisión anterior, sin cambiarlo | **20/20** |
| `python -I pruebas/probar_piezas.py …` | **54 OK**, incluye las dos aserciones nuevas de F01 |
| `python -I pruebas/probar_enchufe.py …` | **26 OK** |
| `npm.cmd run probar:contrato` | **212 OK** |
| TB `npm.cmd run test:simulador` | **58 OK**, sin errores JS |
| TB `npm.cmd run test:registro-app` | **134 OK**, sin errores de consola |

Todos terminaron con salida 0, secuencialmente y con perfiles sintéticos en Electron. [Comandos, duración y salida](ejecuciones.json); [orquestador](comprobar.py). Los logs de cada comando están en esta carpeta. No se ejecutó otra auditoría profunda ni se buscaron casos ajenos a F01.

## Identidad, conservación y límites

- TC `main`, `2808fd8af3bfb0d0c342e31078a134f4e19924ec` más diff sin commit: `lienzo.js` **b4682351746bf481…**, `catalogo.js` **3bba3f5831aff676…**, `probar_piezas.py` **9656f7434bf4463a…**; paquete **3b320513d08f5bf0…**, `0.3.1-dev`. TB `main` **439166e**, TD `main` **30ac0ba**, TS `main` **1f87dab**. [Hashes completos e inventario](inicio.json).
- Antes del hito de esta verificación se conservaron los **89 archivos identificados de TC, 54 de hermanos y 44 evidencias anteriores**, incluidos los fallos originales y sus capturas. El build no cambió los artefactos recibidos. La bitácora solo recibe un anexo propio; [constancia](resumen.json).
- No repetí la suite completa, el núcleo/KiCad ni su comparación diferencial: sus fuentes no cambiaron desde la revisión profunda. Las **1393 comprobaciones completas** son evidencia declarada por Claude en esta entrega, no una ejecución nueva de Codex. La comprobación propia cubre las dependencias modificadas descritas arriba.
- No se acreditan rendimiento con cargador, hardware, uso con aprendices, versión etiquetada, instalador ni recorrido sin red nuevos. Se conservan los pendientes y límites de la [revisión profunda](../INFORME.md).
- Codex solo añadió evidencia y coordinación propias: sin implementación de producto, memorias de Claude, commit, push, etiquetas, publicación ni cambios remotos. Informe/instrumentos propios, sin subagentes. Actualizar el estado técnico de CLAUDE.md corresponde a Claude.
