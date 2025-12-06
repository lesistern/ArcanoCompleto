import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para crear slug desde el nombre
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Función para escapar comillas simples en SQL
function escapeSQL(text) {
  if (!text) return null;
  return text.replace(/'/g, "''");
}

// Mapeo de nombres de clases en inglés a IDs/slugs de Supabase
const classMapping = {
  'sorcerer': 'hechicero',
  'wizard': 'mago',
  'cleric': 'clerigo',
  'druid': 'druida',
  'bard': 'bardo',
  'paladin': 'paladin',
  'ranger': 'explorador',
};

// Función principal
async function main() {
  const inputPath = path.join(__dirname, 'output', 'spells_complete.json');
  const outputDir = path.join(__dirname, '..', '..', 'supabase');

  // Crear directorio de salida si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('📖 Leyendo conjuros...');
  const spells = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  console.log(`   Encontrados ${spells.length} conjuros`);

  // Generar SQL
  console.log('\n⚙️  Generando SQL...');

  let sql = `-- ============================================================================
-- INSERCIÓN DE CONJUROS (SPELLS)
-- ============================================================================
-- Total de conjuros: ${spells.length}
-- Generado automáticamente desde d20srd.org scrape
-- Fecha: ${new Date().toISOString().split('T')[0]}
--
-- IMPORTANTE: Ejecutar DESPUÉS de insertar las clases base
-- ============================================================================

-- Habilitar extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

`;

  // PARTE 1: Insertar conjuros en la tabla spells
  sql += `\n-- ============================================================================
-- PARTE 1: INSERTAR CONJUROS
-- ============================================================================\n\n`;

  let insertCount = 0;

  for (const spell of spells) {
    const slug = createSlug(spell.name);
    const name = escapeSQL(spell.name);
    const school = escapeSQL(spell.school);
    const subschool = spell.subschool ? `'${escapeSQL(spell.subschool)}'` : 'NULL';
    const descriptors = spell.descriptors && spell.descriptors.length > 0
      ? `ARRAY[${spell.descriptors.map(d => `'${escapeSQL(d)}'`).join(', ')}]`
      : 'NULL';
    const casting_time = escapeSQL(spell.casting_time);
    const range_info = escapeSQL(spell.range);
    const target = spell.target ? `'${escapeSQL(spell.target)}'` : 'NULL';
    const effect = spell.effect ? `'${escapeSQL(spell.effect)}'` : 'NULL';
    const area = spell.area ? `'${escapeSQL(spell.area)}'` : 'NULL';
    const duration = escapeSQL(spell.duration);
    const saving_throw = spell.saving_throw ? `'${escapeSQL(spell.saving_throw)}'` : 'NULL';
    const spell_resistance = spell.spell_resistance ? `'${escapeSQL(spell.spell_resistance)}'` : 'NULL';
    const description = escapeSQL(spell.description);
    const material = spell.material_component ? `'${escapeSQL(spell.material_component)}'` : 'NULL';
    const focus = spell.focus ? `'${escapeSQL(spell.focus)}'` : 'NULL';
    const xp_cost = spell.xp_cost ? `'${escapeSQL(spell.xp_cost)}'` : 'NULL';

    // Componentes como array
    const components = spell.components && spell.components.length > 0
      ? spell.components.map(c => `'${c}'`).join(', ')
      : '';

    sql += `-- ${spell.name}\n`;
    sql += `INSERT INTO spells (slug, name, school, subschool, descriptors, casting_time, range_info, target, effect, area, duration, saving_throw, spell_resistance, description, material_components, focus, xp_cost, source_book)\n`;
    sql += `VALUES (\n`;
    sql += `  '${slug}',\n`;
    sql += `  '${name}',\n`;
    sql += `  '${school}',\n`;
    sql += `  ${subschool},\n`;
    sql += `  ${descriptors},\n`;
    sql += `  '${casting_time}',\n`;
    sql += `  '${range_info}',\n`;
    sql += `  ${target},\n`;
    sql += `  ${effect},\n`;
    sql += `  ${area},\n`;
    sql += `  '${duration}',\n`;
    sql += `  ${saving_throw},\n`;
    sql += `  ${spell_resistance},\n`;
    sql += `  '${description}',\n`;
    sql += `  ${material},\n`;
    sql += `  ${focus},\n`;
    sql += `  ${xp_cost},\n`;
    sql += `  'Player''s Handbook'\n`;
    sql += `)\n`;
    sql += `ON CONFLICT (slug) DO NOTHING;\n\n`;

    insertCount++;
  }

  console.log(`   ✅ Generados ${insertCount} INSERT statements para conjuros`);

  // PARTE 2: Insertar relaciones spell_class_levels
  sql += `\n-- ============================================================================
-- PARTE 2: RELACIONES SPELL_CLASS_LEVELS
-- ============================================================================
-- Relaciona cada conjuro con las clases que pueden lanzarlo
-- ============================================================================\n\n`;

  let relationCount = 0;

  for (const spell of spells) {
    if (!spell.level || Object.keys(spell.level).length === 0) continue;

    const slug = createSlug(spell.name);

    sql += `-- ${spell.name} - Niveles\n`;

    for (const [classKey, level] of Object.entries(spell.level)) {
      const classSlug = classMapping[classKey];
      if (!classSlug) {
        console.warn(`   ⚠️  Clase no mapeada: ${classKey}`);
        continue;
      }

      sql += `INSERT INTO spell_class_levels (spell_id, class_id, spell_level)\n`;
      sql += `SELECT \n`;
      sql += `  (SELECT id FROM spells WHERE slug = '${slug}'),\n`;
      sql += `  (SELECT id FROM classes WHERE slug = '${classSlug}'),\n`;
      sql += `  ${level}\n`;
      sql += `WHERE EXISTS (SELECT 1 FROM spells WHERE slug = '${slug}')\n`;
      sql += `  AND EXISTS (SELECT 1 FROM classes WHERE slug = '${classSlug}')\n`;
      sql += `ON CONFLICT (spell_id, class_id) DO NOTHING;\n\n`;

      relationCount++;
    }
  }

  console.log(`   ✅ Generados ${relationCount} INSERT statements para relaciones clase-conjuro`);

  // Guardar archivo SQL
  const sqlPath = path.join(outputDir, 'insert_spells_complete.sql');
  fs.writeFileSync(sqlPath, sql);
  console.log(`\n💾 Guardado SQL: ${sqlPath}`);

  // Estadísticas finales
  console.log(`\n📊 Resumen:`);
  console.log(`   - Total de conjuros: ${spells.length}`);
  console.log(`   - INSERT statements (spells): ${insertCount}`);
  console.log(`   - INSERT statements (spell_class_levels): ${relationCount}`);
  console.log(`   - Tamaño del archivo: ${(sql.length / 1024).toFixed(2)} KB`);

  // Mostrar algunas estadísticas
  const spellsBySchool = {};
  const spellsByLevel = {};

  spells.forEach(spell => {
    // Por escuela
    if (spell.school) {
      spellsBySchool[spell.school] = (spellsBySchool[spell.school] || 0) + 1;
    }

    // Por nivel (solo Hechicero/Mago)
    if (spell.level) {
      if (spell.level.sorcerer !== undefined) {
        const lvl = spell.level.sorcerer;
        spellsByLevel[lvl] = (spellsByLevel[lvl] || 0) + 1;
      } else if (spell.level.wizard !== undefined) {
        const lvl = spell.level.wizard;
        spellsByLevel[lvl] = (spellsByLevel[lvl] || 0) + 1;
      }
    }
  });

  console.log(`\n   Distribución por escuela:`);
  Object.entries(spellsBySchool)
    .sort((a, b) => b[1] - a[1])
    .forEach(([school, count]) => {
      console.log(`      ${school}: ${count}`);
    });

  console.log(`\n   Distribución por nivel (Hechicero/Mago):`);
  Object.keys(spellsByLevel)
    .sort()
    .forEach(level => {
      console.log(`      Nivel ${level}: ${spellsByLevel[level]}`);
    });

  console.log(`\n✨ ¡Generación de SQL completada!`);
  console.log(`\n📝 Siguiente paso:`);
  console.log(`   1. Abrir Supabase SQL Editor`);
  console.log(`   2. Ejecutar: ${sqlPath}`);
  console.log(`   3. Verificar con: SELECT COUNT(*) FROM spells;`);
}

main().catch(console.error);
