#!/usr/bin/env node

/**
 * GENERADOR DE SQL PARA CONJUROS
 *
 * Lee el JSON de conjuros generado por spell-scraper.mjs
 * y genera SQL para insertar en Supabase.
 *
 * Uso: node scripts/generate-spells-sql.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility: Normalizar nombre para slug
function normalizeSlug(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Utility: Escapar comillas simples para SQL
function escapeSql(text) {
  if (!text) return null;
  return text.replace(/'/g, "''");
}

// Utility: Convertir array a formato PostgreSQL
function arrayToSql(arr) {
  if (!arr || arr.length === 0) return 'NULL';
  const escaped = arr.map(item => `'${escapeSql(item)}'`);
  return `ARRAY[${escaped.join(', ')}]::TEXT[]`;
}

// Utility: Convertir objeto a JSONB
function objectToJsonb(obj) {
  if (!obj || Object.keys(obj).length === 0) return 'NULL';
  const json = JSON.stringify(obj);
  return `'${escapeSql(json)}'::JSONB`;
}

// Utility: Convertir boolean para SQL
function boolToSql(val) {
  if (val === true || val === 'Yes' || val === 'Sí') return 'true';
  if (val === false || val === 'No') return 'false';
  return 'NULL';
}

// Generar INSERT statement para un conjuro
function generateSpellInsert(spell, index) {
  const slug = normalizeSlug(spell.name);

  // Determinar verbal, somatic, material, etc.
  const components = spell.components || [];
  const verbal = components.includes('V') || components.includes('Verbal');
  const somatic = components.includes('S') || components.includes('Somático');
  const material = components.includes('M') || components.includes('Material');
  const focus = components.includes('F') || components.includes('Foco');
  const divine_focus = components.includes('DF') || components.includes('FD');
  const xp_component = components.includes('XP');

  // Convertir descriptors a array
  const descriptors = spell.descriptors || [];

  // Extraer spell resistance
  let spell_resistance = null;
  if (spell.spell_resistance) {
    if (spell.spell_resistance.toLowerCase().includes('yes') || spell.spell_resistance.toLowerCase().includes('sí')) {
      spell_resistance = true;
    } else if (spell.spell_resistance.toLowerCase().includes('no')) {
      spell_resistance = false;
    }
  }

  // Generar valores SQL
  const values = [
    `'${slug}'`, // slug
    `'${escapeSql(spell.name)}'`, // name
    spell.name_es ? `'${escapeSql(spell.name_es)}'` : 'NULL', // name_es
    spell.school ? `'${escapeSql(spell.school)}'` : 'NULL', // school
    spell.subschool ? `'${escapeSql(spell.subschool)}'` : 'NULL', // subschool
    descriptors.length > 0 ? arrayToSql(descriptors) : 'NULL', // descriptor
    objectToJsonb(spell.level), // level (JSONB)
    boolToSql(verbal), // verbal
    boolToSql(somatic), // somatic
    boolToSql(material), // material_component
    boolToSql(focus), // focus
    boolToSql(divine_focus), // divine_focus
    boolToSql(xp_component), // xp_component
    spell.material_component ? `'${escapeSql(spell.material_component)}'` : 'NULL', // material_description
    spell.focus ? `'${escapeSql(spell.focus)}'` : 'NULL', // focus_description
    spell.xp_cost ? `'${escapeSql(spell.xp_cost)}'` : 'NULL', // xp_cost_description
    spell.casting_time ? `'${escapeSql(spell.casting_time)}'` : 'NULL', // casting_time
    spell.range ? `'${escapeSql(spell.range)}'` : 'NULL', // range
    spell.target ? `'${escapeSql(spell.target)}'` : 'NULL', // target
    spell.area ? `'${escapeSql(spell.area)}'` : 'NULL', // area
    spell.effect ? `'${escapeSql(spell.effect)}'` : 'NULL', // effect
    spell.duration ? `'${escapeSql(spell.duration)}'` : 'NULL', // duration
    spell.saving_throw ? `'${escapeSql(spell.saving_throw)}'` : 'NULL', // saving_throw
    spell_resistance !== null ? boolToSql(spell_resistance) : 'NULL', // spell_resistance
    spell.description ? `'${escapeSql(spell.description)}'` : 'NULL', // description
    spell.description ? `'${escapeSql(spell.description)}'` : 'NULL', // description_es (inicialmente igual, se traducirá después)
  ];

  return `  (${values.join(', ')})`;
}

// Función principal
async function generateSql() {
  console.log('📜 Generador de SQL para Conjuros D&D 3.5\n');

  // Leer JSON de conjuros
  const inputPath = path.join(__dirname, 'scraper', 'output', 'spells_complete.json');

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Error: No se encontró ${inputPath}`);
    console.log('💡 Primero ejecuta: node scripts/scraper/spell-scraper.mjs');
    process.exit(1);
  }

  const spells = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  console.log(`📚 Cargados ${spells.length} conjuros desde JSON`);

  // Generar SQL Header
  let sql = `-- ============================================================================
-- CONJUROS DEL PLAYER'S HANDBOOK
-- Datos extraídos de d20srd.org
-- Total de conjuros: ${spells.length}
-- ============================================================================

-- Insertar conjuros
INSERT INTO public.spells (
  slug, name, name_es,
  school, subschool, descriptor,
  level,
  verbal, somatic, material_component, focus, divine_focus, xp_component,
  material_description, focus_description, xp_cost_description,
  casting_time, range, target, area, effect, duration,
  saving_throw, spell_resistance,
  description, description_es
)
VALUES
`;

  // Generar INSERTs
  const inserts = spells.map((spell, index) => generateSpellInsert(spell, index));
  sql += inserts.join(',\n');

  // Agregar ON CONFLICT
  sql += `\nON CONFLICT (slug) DO UPDATE
  SET
    name = EXCLUDED.name,
    name_es = EXCLUDED.name_es,
    school = EXCLUDED.school,
    subschool = EXCLUDED.subschool,
    descriptor = EXCLUDED.descriptor,
    level = EXCLUDED.level,
    verbal = EXCLUDED.verbal,
    somatic = EXCLUDED.somatic,
    material_component = EXCLUDED.material_component,
    focus = EXCLUDED.focus,
    divine_focus = EXCLUDED.divine_focus,
    xp_component = EXCLUDED.xp_component,
    material_description = EXCLUDED.material_description,
    focus_description = EXCLUDED.focus_description,
    xp_cost_description = EXCLUDED.xp_cost_description,
    casting_time = EXCLUDED.casting_time,
    range = EXCLUDED.range,
    target = EXCLUDED.target,
    area = EXCLUDED.area,
    effect = EXCLUDED.effect,
    duration = EXCLUDED.duration,
    saving_throw = EXCLUDED.saving_throw,
    spell_resistance = EXCLUDED.spell_resistance,
    description = EXCLUDED.description,
    description_es = EXCLUDED.description_es,
    updated_at = NOW();

-- Verificación
SELECT
  'Conjuros insertados exitosamente' AS status,
  COUNT(*) AS total_spells
FROM public.spells;

-- Estadísticas por escuela
SELECT
  school,
  COUNT(*) as count
FROM public.spells
GROUP BY school
ORDER BY count DESC;

-- Estadísticas por nivel (Sorcerer/Wizard)
SELECT
  (level->>'sorcerer')::INTEGER as spell_level,
  COUNT(*) as count
FROM public.spells
WHERE level ? 'sorcerer'
GROUP BY spell_level
ORDER BY spell_level;
`;

  // Guardar SQL
  const outputPath = path.join(__dirname, '..', 'dnd-compendium', 'supabase', 'insert-spells-phb.sql');
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, sql);

  console.log(`\n✅ SQL generado exitosamente!`);
  console.log(`📄 Archivo: ${outputPath}`);
  console.log(`📊 Total de conjuros: ${spells.length}`);

  // Estadísticas
  const bySchool = {};
  spells.forEach(spell => {
    const school = spell.school || 'Unknown';
    bySchool[school] = (bySchool[school] || 0) + 1;
  });

  console.log(`\n📊 Estadísticas por Escuela:`);
  Object.entries(bySchool)
    .sort((a, b) => b[1] - a[1])
    .forEach(([school, count]) => {
      console.log(`   ${school}: ${count}`);
    });

  // Conjuros por nivel (Sorcerer/Wizard)
  const byLevel = {};
  spells.forEach(spell => {
    if (spell.level && spell.level.sorcerer !== undefined) {
      const level = spell.level.sorcerer;
      byLevel[level] = (byLevel[level] || 0) + 1;
    } else if (spell.level && spell.level.wizard !== undefined) {
      const level = spell.level.wizard;
      byLevel[level] = (byLevel[level] || 0) + 1;
    }
  });

  console.log(`\n📊 Estadísticas por Nivel (Sorcerer/Wizard):`);
  Object.keys(byLevel)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .forEach(level => {
      console.log(`   Nivel ${level}: ${byLevel[level]}`);
    });

  console.log(`\n🎯 Siguiente paso:`);
  console.log(`   1. Abre Supabase SQL Editor`);
  console.log(`   2. Ejecuta: ${outputPath}`);
  console.log(`   3. Verifica que los ${spells.length} conjuros se insertaron correctamente`);
}

// Ejecutar
generateSql().catch(console.error);
