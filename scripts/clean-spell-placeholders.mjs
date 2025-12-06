import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer el archivo SQL
const sqlPath = join(__dirname, '..', 'supabase', 'insert_spells_part1.sql');
const content = readFileSync(sqlPath, 'utf-8');

// Dividir en líneas
const lines = content.split('\n');

// Encontrar y eliminar las tres entradas problemáticas
const placeholders = [
  'Greater (Spell Name)',
  'Lesser (Spell Name)',
  'Mass (Spell Name)'
];

let cleanedLines = [];
let skipUntilConflict = false;
let currentPlaceholder = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Detectar inicio de una entrada placeholder
  for (const placeholder of placeholders) {
    if (line.trim() === `-- ${placeholder}`) {
      console.log(`❌ Eliminando entrada placeholder en línea ${i + 1}: ${placeholder}`);
      skipUntilConflict = true;
      currentPlaceholder = placeholder;
      break;
    }
  }

  // Si estamos saltando, buscar el final del INSERT
  if (skipUntilConflict) {
    if (line.includes('ON CONFLICT')) {
      console.log(`   └─ Eliminado hasta línea ${i + 1} (ON CONFLICT)`);
      skipUntilConflict = false;
      currentPlaceholder = null;
      continue; // Saltar esta línea también
    }
    continue; // Saltar líneas del placeholder
  }

  // Agregar línea normal
  cleanedLines.push(line);
}

// Unir líneas y guardar
const cleanedContent = cleanedLines.join('\n');

// Guardar archivo limpio
const outputPath = join(__dirname, '..', 'supabase', 'insert_spells_part1_clean.sql');
writeFileSync(outputPath, cleanedContent, 'utf-8');

// Contar INSERTs antes y después
const originalInserts = content.match(/INSERT INTO spells/g)?.length || 0;
const cleanedInserts = cleanedContent.match(/INSERT INTO spells/g)?.length || 0;

console.log('\n✅ Limpieza completada:');
console.log(`   📄 Archivo original: insert_spells_part1.sql (${originalInserts} INSERTs)`);
console.log(`   📄 Archivo limpio:   insert_spells_part1_clean.sql (${cleanedInserts} INSERTs)`);
console.log(`   🗑️  Entradas eliminadas: ${originalInserts - cleanedInserts}`);
console.log(`\n💡 Ahora ejecuta: insert_spells_part1_clean.sql en Supabase`);
