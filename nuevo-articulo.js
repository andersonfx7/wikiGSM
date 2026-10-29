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

  const marcaLabel  = await preguntar('Marca (ej: Xiaomi, Samsung)');
  const marcaSlug   = await preguntar('Carpeta de la marca', toSlug(marcaLabel));

  const modeloLabel = await preguntar('Modelo (ej: Redmi Note 12)');
  const modeloSlug  = await preguntar('Carpeta del modelo', toSlug(modeloLabel));

  const titulo      = await preguntar('Título del artículo (ej: Cambio de pantalla)');
  const descripcion = await preguntar('Descripción corta (opcional)');

  const difInput    = await preguntar('Dificultad: 1=Fácil  2=Media  3=Difícil', '2');
  const dificultad  = { '1': 'Fácil', '2': 'Media', '3': 'Difícil' }[difInput] ?? 'Media';

  const archivoSlug = await preguntar('Nombre del archivo (sin .md)', toSlug(titulo));

  rl.close();

  const marcaPath   = join(marcaSlug);
  const modeloPath  = join(marcaSlug, modeloSlug);
  const artPath     = join(modeloPath, `${archivoSlug}.md`);
  const indexPath   = join(modeloPath, 'README.md');

  if (existsSync(artPath)) {
    console.log(`\nEse artículo ya existe:\n  ${artPath}`);
    process.exit(1);
  }

  console.log('');

  // Crear carpetas si no existen
  mkdirSync(modeloPath, { recursive: true });

  // Crear README del modelo si no existe
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
    // Agregar fila al README del modelo
    const readme = readFileSync(indexPath, 'utf-8');
    const fila = `| [${titulo}](${archivoSlug}.md) | ${dificultad} |`;
    const actualizado = readme.replace(/(\[← Volver)/, `${fila}\n\n$1`);
    writeFileSync(indexPath, actualizado);
  }

  // Crear artículo
  const hoy = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  writeFileSync(artPath,
`# ${titulo} — ${marcaLabel} ${modeloLabel}

| Campo | Detalle |
|---|---|
| **Marca** | ${marcaLabel} |
| **Modelo** | ${modeloLabel} |
| **Componente** | Pendiente: completar |
| **Dificultad** | ${dificultad} |
| **Herramientas** | Pendiente: completar |
| **Última actualización** | ${hoy} |

---

## Síntoma

${descripcion || 'Pendiente: describe qué le pasa al equipo.'}

## Diagnóstico

Pendiente: pasos para identificar la causa.

## Procedimiento

> ⚠️ Pendiente: advertencia de seguridad.

1. Pendiente: paso 1.
2. Pendiente: paso 2.

## Notas y advertencias

- Pendiente: agregar notas.

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
