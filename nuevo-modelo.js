// Uso: node nuevo-modelo.js <marca> <carpeta-modelo> "Nombre legible del modelo"
// Ejemplo: node nuevo-modelo.js samsung a30s "Galaxy A30s"

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const [marca, carpeta, label] = process.argv.slice(2);

if (!marca || !carpeta || !label) {
  console.log('');
  console.log('Uso:    node nuevo-modelo.js <marca> <carpeta> "Nombre del modelo"');
  console.log('');
  console.log('Ejemplos:');
  console.log('  node nuevo-modelo.js samsung a30s "Galaxy A30s"');
  console.log('  node nuevo-modelo.js apple iphone-12 "iPhone 12"');
  console.log('  node nuevo-modelo.js motorola moto-g54 "Moto G54"');
  console.log('');
  process.exit(1);
}

const ruta = join('src', 'content', 'docs', marca, carpeta);

if (existsSync(ruta)) {
  console.log(`⚠️  La carpeta ya existe: ${ruta}`);
  process.exit(1);
}

mkdirSync(ruta, { recursive: true });

writeFileSync(
  join(ruta, '_dir.yaml'),
  `label: ${label}\ncollapsed: true\n`
);

console.log('');
console.log(`✅ Modelo creado: ${ruta}`);
console.log(`   Etiqueta en el menú: "${label}"`);
console.log('');
console.log('Próximo paso: crea tu primer artículo en esa carpeta.');
console.log(`Ejemplo: src/content/docs/${marca}/${carpeta}/cambio-pantalla.md`);
console.log('');
