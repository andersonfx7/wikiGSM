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

  // ── Identificación del equipo ──────────────────────
  const marcaLabel  = await preguntar('Marca (ej: Xiaomi, Redmi, POCO)');
  const marcaSlug   = await preguntar('Carpeta de la marca', toSlug(marcaLabel));

  const modeloLabel = await preguntar('Modelo (ej: Redmi Note 12)');
  const modeloSlug  = await preguntar('Carpeta del modelo', toSlug(modeloLabel));

  const codename    = await preguntar('Codename (ej: topaz, spes, cannon)', 'Pendiente');
  const region      = await preguntar('Región (ej: Global, EEA, CN)', 'Pendiente');
  const parche      = await preguntar('Parche de seguridad (ej: 2024-10-01)', 'Pendiente');
  const bootloader  = await preguntar('Status bootloader (Bloqueado / Desbloqueado)', 'Pendiente');
  const softVer     = await preguntar('Versión de software (ej: HyperOS 1.0.3, MIUI 14.0.6)', 'Pendiente');
  const kernelVer   = await preguntar('Versión de kernel (ej: 4.19.157)', 'Pendiente');

  // ── Artículo ───────────────────────────────────────
  const titulo      = await preguntar('Título del artículo (ej: Bootloop después de actualización)');
  const descripcion = await preguntar('Descripción corta (opcional)');
  const difInput    = await preguntar('Dificultad: 1=Fácil  2=Media  3=Difícil', '2');
  const dificultad  = { '1': 'Fácil', '2': 'Media', '3': 'Difícil' }[difInput] ?? 'Media';
  const requisitos  = await preguntar('Requisitos (ej: PC, cable USB, SP Flash Tool)', 'Pendiente');
  const archivoSlug = await preguntar('Nombre del archivo (sin .md)', toSlug(titulo));

  rl.close();

  const modeloPath = join(marcaSlug, modeloSlug);
  const artPath    = join(modeloPath, `${archivoSlug}.md`);
  const indexPath  = join(modeloPath, 'README.md');

  if (existsSync(artPath)) {
    console.log(`\nEse artículo ya existe:\n  ${artPath}`);
    process.exit(1);
  }

  console.log('');
  mkdirSync(modeloPath, { recursive: true });

  // ── README del modelo ──────────────────────────────
  if (!existsSync(indexPath)) {
    writeFileSync(indexPath,
`# ${marcaLabel} ${modeloLabel}

## Artículos

| Artículo | Dificultad |
|---|---|
| [${titulo}](${archivoSlug}.md) | ${dificultad} |

---

[← Volver al inicio](../../README.md)
`);
    console.log(`✅ Modelo creado: ${modeloPath}/`);
  } else {
    const readme = readFileSync(indexPath, 'utf-8');
    const fila = `| [${titulo}](${archivoSlug}.md) | ${dificultad} |`;
    writeFileSync(indexPath, readme.replace(/(\[← Volver)/, `${fila}\n\n$1`));
  }

  // ── Artículo ───────────────────────────────────────
  const hoy = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  writeFileSync(artPath,
`# ${titulo} — ${marcaLabel} ${modeloLabel}

| Campo | Detalle |
|---|---|
| **Marca** | ${marcaLabel} |
| **Modelo** | ${modeloLabel} |
| **Codename** | ${codename} |
| **Región** | ${region} |
| **Parche de seguridad** | ${parche} |
| **Status bootloader** | ${bootloader} |
| **Versión de software** | ${softVer} |
| **Versión de kernel** | ${kernelVer} |
| **Dificultad** | ${dificultad} |
| **Requisitos** | ${requisitos} |
| **Última actualización** | ${hoy} |

---

## Síntoma

${descripcion || 'Pendiente: describe el problema que presenta el equipo.'}

## Causa probable

Pendiente: explica por qué ocurre este problema.

## Requisitos previos

- Pendiente: drivers, apps necesarias, etc.

## Procedimiento

> ⚠️ Pendiente: advertencia de seguridad.

1. Pendiente: paso 1.
2. Pendiente: paso 2.

## Notas y advertencias

- Pendiente: agregar notas importantes.

---

[← Volver al ${modeloLabel}](README.md)
`);

  console.log(`✅ Artículo creado: ${artPath}`);
  console.log('\nAbre el archivo en VS Code y completa las secciones "Pendiente".\n');
}

main().catch(err => {
  console.error('\nError:', err.message);
  process.exit(1);
});
