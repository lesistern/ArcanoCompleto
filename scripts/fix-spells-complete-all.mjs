import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('═══════════════════════════════════════════════════════');
console.log('🔧 CORRECCIÓN DE ARCHIVO COMPLETE.SQL');
console.log('═══════════════════════════════════════════════════════\n');

// Leer el archivo SQL complete
const sqlPath = join(__dirname, '..', 'supabase', 'insert_spells_complete.sql');
const content = readFileSync(sqlPath, 'utf-8');

// Paso 1: Eliminar entradas placeholder
console.log('📋 Paso 1: Eliminando entradas placeholder...');
const placeholders = [
  'Greater (Spell Name)',
  'Lesser (Spell Name)',
  'Mass (Spell Name)'
];

let lines = content.split('\n');
let cleanedLines = [];
let skipUntilConflict = false;
let removedCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  for (const placeholder of placeholders) {
    if (line.trim() === `-- ${placeholder}`) {
      console.log(`   ❌ Eliminando: ${placeholder} (línea ${i + 1})`);
      skipUntilConflict = true;
      removedCount++;
      break;
    }
  }

  if (skipUntilConflict) {
    if (line.includes('ON CONFLICT')) {
      skipUntilConflict = false;
      continue;
    }
    continue;
  }

  cleanedLines.push(line);
}

let step1Content = cleanedLines.join('\n');
console.log(`   ✅ ${removedCount} entradas eliminadas\n`);

// Paso 2: Reemplazar 'null' por NULL
console.log('📋 Paso 2: Reemplazando strings \'null\' por NULL...');
let nullStringsReplaced = 0;
const step2Content = step1Content.replace(/'null'/g, () => {
  nullStringsReplaced++;
  return 'NULL';
});
console.log(`   ✅ ${nullStringsReplaced} strings reemplazados\n`);

// Paso 3: Encontrar y corregir campos NOT NULL con valor NULL
console.log('📋 Paso 3: Corrigiendo campos NOT NULL vacíos...');

// Dividir por INSERT statements de spells (no tocar spell_class_levels)
const inserts = step2Content.split(/(?=-- [A-Z])/);
let fixedCount = 0;

const fixedInserts = inserts.map(insert => {
  // Solo procesar INSERTs de spells, no de spell_class_levels
  if (!insert.includes('INSERT INTO spells')) {
    return insert;
  }

  // Extraer el VALUES block
  const valuesMatch = insert.match(/VALUES\s*\(([\s\S]*?)\)\s*ON CONFLICT/);
  if (!valuesMatch) {
    return insert;
  }

  const valuesBlock = valuesMatch[1];
  const values = valuesBlock.split(',\n').map(v => v.trim());

  // Los campos en orden según el INSERT:
  // 0: slug, 1: name, 2: school, 3: subschool, 4: descriptors,
  // 5: casting_time (NOT NULL), 6: range_info (NOT NULL),
  // 7: target, 8: effect, 9: area, 10: duration, 11: saving_throw,
  // 12: spell_resistance, 13: description, 14: material_components,
  // 15: focus, 16: xp_cost, 17: source_book

  let needsFix = false;

  // casting_time (índice 5)
  if (values[5] === 'NULL') {
    values[5] = "'Ver hechizo base'";
    needsFix = true;
  }

  // range_info (índice 6)
  if (values[6] === 'NULL') {
    values[6] = "'Ver hechizo base'";
    needsFix = true;
  }

  if (needsFix) {
    fixedCount++;
    // Reconstruir el INSERT
    const fixedValues = values.join(',\n  ');
    return insert.replace(valuesBlock, fixedValues);
  }

  return insert;
});

const step3Content = fixedInserts.join('');

console.log(`   ✅ ${fixedCount} conjuros corregidos\n`);

// Guardar archivo final
const outputPath = join(__dirname, '..', 'supabase', 'insert_spells_complete_final.sql');
writeFileSync(outputPath, step3Content, 'utf-8');

// Estadísticas finales
const finalSpells = step3Content.match(/INSERT INTO spells/g)?.length || 0;
const finalRelations = step3Content.match(/INSERT INTO spell_class_levels/g)?.length || 0;

console.log('═══════════════════════════════════════════════════════');
console.log('✅ CORRECCIÓN COMPLETA');
console.log('═══════════════════════════════════════════════════════');
console.log(`📄 Archivo generado: insert_spells_complete_final.sql`);
console.log(`📊 Total de conjuros: ${finalSpells}`);
console.log(`📊 Total de relaciones clase-hechizo: ${finalRelations}`);
console.log(`🗑️  Placeholders eliminados: ${removedCount}`);
console.log(`🔧 Strings 'null' reemplazados: ${nullStringsReplaced}`);
console.log(`🛠️  Campos NOT NULL corregidos: ${fixedCount}`);
console.log('═══════════════════════════════════════════════════════');
console.log('\n💡 Este archivo incluye:');
console.log('   - Inserción de todos los conjuros en tabla spells');
console.log('   - Relaciones spell_class_levels (qué clases pueden lanzar cada hechizo)');
console.log('\n🚀 Ejecuta este archivo en Supabase SQL Editor:');
console.log('   supabase/insert_spells_complete_final.sql\n');
