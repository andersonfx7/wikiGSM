import { createInterface } from 'readline/promises';
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { stdin as input, stdout as output } from 'process';

const rl = createInterface({ input, output });

function toSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function preguntar(mensaje, valorDefecto) {
  const sufijo = valorDefecto ? ` [${valorDefecto}]: ` : ': ';
  const respuesta = await rl.question(mensaje + sufijo);
  return respuesta.trim() || valorDefecto || '';
}

async function main() {
  console.log('\n──────────────────────────────────');
  console.log('  Nuevo artículo — Wiki GSM');
  console.log('──────────────────────────────────\n');

  // ── Marca ──────────────────────────────────────────
  const marcaLabel = await preguntar('Marca (ej: Samsung, Apple, Motorola)');
  if (!marcaLabel) { console.log('\nError: la marca no puede estar vacía.'); process.exit(1); }
  const marcaSlugSug = toSlug(marcaLabel);
  const marcaSlug   = await preguntar('Carpeta de la marca', marcaSlugSug);

  // ── Modelo ─────────────────────────────────────────
  const modeloLabel = await preguntar('Modelo (ej: Galaxy A30s, iPhone 12)');
  if (!modeloLabel) { console.log('\nError: el modelo no puede estar vacío.'); process.exit(1); }
  const modeloSlugSug = toSlug(modeloLabel);
  const modeloSlug    = await preguntar('Carpeta del modelo', modeloSlugSug);

  // ── Artículo ───────────────────────────────────────
  const titulo = await preguntar('Título del artículo (ej: Cambio de pantalla)');
  if (!titulo) { console.log('\nError: el título no puede estar vacío.'); process.exit(1); }
  const descripcion = await preguntar('Descripción corta (para el buscador)');

  const difInput = await preguntar('Dificultad: 1=Fácil  2=Media  3=Difícil', '2');
  const dificultad = { '1': 'Fácil', '2': 'Media', '3': 'Difícil' }[difInput] ?? 'Media';

  const archivoSug = toSlug(titulo);
  const archivoSlug = await preguntar('Nombre del archivo (sin .md)', archivoSug);

  rl.close();

  // ── Rutas ──────────────────────────────────────────
  const docsRoot   = join('src', 'content', 'docs');
  const marcaPath  = join(docsRoot, marcaSlug);
  const modeloPath = join(marcaPath, modeloSlug);
  const artPath    = join(modeloPath, `${archivoSlug}.md`);

  if (existsSync(artPath)) {
    console.log(`\nError: ese artículo ya existe:\n  ${artPath}`);
    process.exit(1);
  }

  console.log('');

  // ── Crear marca si es nueva ────────────────────────
  if (!existsSync(marcaPath)) {
    mkdirSync(marcaPath, { recursive: true });
    writeFileSync(join(marcaPath, '_dir.yaml'), `label: ${marcaLabel}\ncollapsed: true\n`);
    agregarMarcaEnConfig(marcaSlug, marcaLabel);
    console.log(`✅ Marca nueva: ${marcaLabel}`);
  }

  // ── Crear modelo si es nuevo ───────────────────────
  if (!existsSync(modeloPath)) {
    mkdirSync(modeloPath, { recursive: true });
    writeFileSync(join(modeloPath, '_dir.yaml'), `label: ${modeloLabel}\ncollapsed: true\n`);
    console.log(`✅ Modelo nuevo: ${modeloLabel}`);
  }

  // ── Crear artículo ─────────────────────────────────
  const hoy = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const contenido = `---
title: ${titulo}
description: ${descripcion || 'Pendiente: agregar descripción.'}
---

| Campo             | Detalle                         |
|-------------------|---------------------------------|
| **Marca**         | ${marcaLabel}                   |
| **Modelo**        | ${modeloLabel}                  |
| **Componente o falla** | Pendiente: completar       |
| **Dificultad**    | ${dificultad}                   |
| **Herramientas**  | Pendiente: completar            |
| **Última actualización** | ${hoy}                   |

---

## Síntoma

Pendiente: describe qué le pasa al equipo.

## Diagnóstico

Pendiente: pasos para identificar la causa antes de abrir el equipo.

## Procedimiento

> ⚠️ Pendiente: agregar advertencia de seguridad.

1. Pendiente: paso 1.
2. Pendiente: paso 2.
3. Pendiente: continuar los pasos.

## Notas y advertencias

- Pendiente: agregar notas de seguridad o aclaraciones.
`;

  writeFileSync(artPath, contenido);
  console.log(`✅ Artículo creado: ${artPath}`);
  console.log('\n──────────────────────────────────');
  console.log('  Abre el archivo en VS Code y');
  console.log('  completa las secciones "Pendiente".');
  console.log('──────────────────────────────────\n');
}

function agregarMarcaEnConfig(slug, label) {
  const configPath = 'astro.config.mjs';
  const config = readFileSync(configPath, 'utf-8');
  const marcador = '// <<FIN-SIDEBAR>>';

  if (!config.includes(marcador)) {
    console.log(`\n⚠️  Agrega esta marca manualmente en astro.config.mjs dentro de sidebar[]:`);
    console.log(`\n\t\t\t\t{\n\t\t\t\t\tlabel: '${label}',\n\t\t\t\t\tcollapsed: true,\n\t\t\t\t\titems: [{ autogenerate: { directory: '${slug}', collapsed: true } }],\n\t\t\t\t},\n`);
    return;
  }

  const bloqueNuevo =
    `\t\t\t\t{\n\t\t\t\t\tlabel: '${label}',\n\t\t\t\t\tcollapsed: true,\n\t\t\t\t\titems: [{ autogenerate: { directory: '${slug}', collapsed: true } }],\n\t\t\t\t},\n\t\t\t\t${marcador}`;

  const actualizado = config.replace(marcador, bloqueNuevo);
  writeFileSync(configPath, actualizado);
  console.log(`✅ astro.config.mjs actualizado con "${label}"`);
}

main().catch(err => {
  console.error('\nError inesperado:', err.message);
  process.exit(1);
});
