import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer el archivo SQL limpio
const sqlPath = join(__dirname, '..', 'supabase', 'insert_spells_part1_clean.sql');
const content = readFileSync(sqlPath, 'utf-8');

// Estadísticas
let nullStringsFixed = 0;

// Reemplazar 'null' por NULL en todo el archivo
// Esto es seguro porque:
// 1. Los nombres de conjuros no contienen la palabra "null"
// 2. Las descripciones podrían, pero 'null' con comillas no aparece en texto normal
// 3. Solo afecta a valores de campos, no a nombres de conjuros
const fixedContent = content.replace(/'null'/g, () => {
  nullStringsFixed++;
  return 'NULL';
});

// Guardar archivo corregido
const outputPath = join(__dirname, '..', 'supabase', 'insert_spells_part1_fixed.sql');
writeFileSync(outputPath, fixedContent, 'utf-8');

// Contar INSERTs
const insertCount = fixedContent.match(/INSERT INTO spells/g)?.length || 0;

console.log('\n✅ Corrección de strings null completada:');
console.log(`   📄 Archivo entrada:  insert_spells_part1_clean.sql (${insertCount} INSERTs)`);
console.log(`   📄 Archivo corregido: insert_spells_part1_fixed.sql (${insertCount} INSERTs)`);
console.log(`   🔧 Strings 'null' reemplazados por NULL: ${nullStringsFixed}`);
console.log(`\n💡 Ahora ejecuta: insert_spells_part1_fixed.sql en Supabase`);
