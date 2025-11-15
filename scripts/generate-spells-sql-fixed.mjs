#!/usr/bin/env node

/**
 * GENERADOR DE SQL PARA CONJUROS - VERSIÓN CORREGIDA
 *
 * Lee el JSON de conjuros y genera SQL compatible con la estructura REAL de la tabla spells
 *
 * Estructura correcta de la tabla spells:
 * - slug, name, school, subschool, descriptors (TEXT[])
 * - casting_time, range_info, target, area, effect, duration
 * - saving_throw, spell_resistance, description
 * - material_components, focus, xp_cost
 * - source_book, source_page
 *
 * ADEMÁS: component_verbal, component_somatic, component_material, component_focus,
 * component_divine_focus, component_xp (añadidos en optimizaciones)
 *
 * Los niveles van en tabla separada: spell_class_levels
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPELLS_PER_FILE = 100;

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

// Utility: Convertir boolean para SQL
function boolToSql(val) {
  if (val === true || val === 'Yes' || val === 'Sí') return 'true';
  if (val === false || val === 'No') return 'false';
  return 'NULL';
}

// Generar INSERT statement para un conjuro
function generateSpellInsert(spell) {
  const slug = normalizeSlug(spell.name);

  // Determinar componentes verbal, somatic, material, etc.
  const components = spell.components || [];
  const verbal = components.includes('V') || components.includes('Verbal');
  const somatic = components.includes('S') || components.includes('Somático');
  const material = components.includes('M') || components.includes('Material');
  const focus_component = components.includes('F') || components.includes('Foco');
  const divine_focus = components.includes('DF') || components.includes('FD');
  const xp_component = components.includes('XP');

  // Convertir descriptors a array
  const descriptors = spell.descriptors || [];

  // Spell resistance como TEXT (no boolean)
  const spell_resistance = spell.spell_resistance || 'No';

  // Generar valores SQL
  const values = [
    `'${slug}'`, // slug
    `'${escapeSql(spell.name)}'`, // name
    spell.school ? `'${escapeSql(spell.school)}'` : 'NULL', // school
    spell.subschool ? `'${escapeSql(spell.subschool)}'` : 'NULL', // subschool
    descriptors.length > 0 ? arrayToSql(descriptors) : 'NULL', // descriptors (TEXT[])
    spell.casting_time ? `'${escapeSql(spell.casting_time)}'` : 'NULL', // casting_time
    spell.range ? `'${escapeSql(spell.range)}'` : 'NULL', // range_info
    spell.target ? `'${escapeSql(spell.target)}'` : 'NULL', // target
    spell.area ? `'${escapeSql(spell.area)}'` : 'NULL', // area
    spell.effect ? `'${escapeSql(spell.effect)}'` : 'NULL', // effect
    spell.duration ? `'${escapeSql(spell.duration)}'` : 'NULL', // duration
    spell.saving_throw ? `'${escapeSql(spell.saving_throw)}'` : 'NULL', // saving_throw
    `'${escapeSql(spell_resistance)}'`, // spell_resistance (TEXT)
    spell.description ? `'${escapeSql(spell.description)}'` : 'NULL', // description
    spell.material_component ? `'${escapeSql(spell.material_component)}'` : 'NULL', // material_components
    spell.focus ? `'${escapeSql(spell.focus)}'` : 'NULL', // focus
    spell.xp_cost ? `'${escapeSql(spell.xp_cost)}'` : 'NULL', // xp_cost
    boolToSql(verbal), // component_verbal
    boolToSql(somatic), // component_somatic
    boolToSql(material), // component_material
    boolToSql(focus_component), // component_focus
    boolToSql(divine_focus), // component_divine_focus
    boolToSql(xp_component), // component_xp
  ];

  return `  (${values.join(', ')})`;
}

// Función principal
async function generateSql() {
  console.log('📜 Generador de SQL para Conjuros D&D 3.5 (CORREGIDO)\n');

  // Leer JSON de conjuros (versión limpia sin placeholders)
  const inputPath = path.join(__dirname, 'scraper', 'output', 'spells_clean.json');

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Error: No se encontró ${inputPath}`);
    process.exit(1);
  }

  const spells = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  console.log(`📚 Cargados ${spells.length} conjuros desde JSON`);

  // Calcular número de archivos
  const totalFiles = Math.ceil(spells.length / SPELLS_PER_FILE);
  console.log(`📄 Se crearán ${totalFiles} archivos de ~${SPELLS_PER_FILE} conjuros cada uno\n`);

  // Dividir conjuros en partes
  for (let i = 0; i < totalFiles; i++) {
    const start = i * SPELLS_PER_FILE;
    const end = Math.min(start + SPELLS_PER_FILE, spells.length);
    const batchSpells = spells.slice(start, end);

    const partNumber = i + 1;
    console.log(`📝 Generando parte ${partNumber}/${totalFiles}: conjuros ${start + 1}-${end}`);

    // Generar SQL Header
    let sql = `-- ============================================================================
-- CONJUROS DEL PLAYER'S HANDBOOK - PARTE ${partNumber}/${totalFiles}
-- Conjuros ${start + 1}-${end} de ${spells.length} totales
-- Datos extraídos de d20srd.org
-- ============================================================================

-- Insertar conjuros (parte ${partNumber})
INSERT INTO public.spells (
  slug, name, school, subschool, descriptors,
  casting_time, range_info, target, area, effect, duration,
  saving_throw, spell_resistance, description,
  material_components, focus, xp_cost,
  component_verbal, component_somatic, component_material,
  component_focus, component_divine_focus, component_xp
)
VALUES
`;

    // Generar INSERTs
    const inserts = batchSpells.map(spell => generateSpellInsert(spell));
    sql += inserts.join(',\n');

    // Agregar ON CONFLICT
    sql += `
ON CONFLICT (slug) DO UPDATE
  SET
    name = EXCLUDED.name,
    school = EXCLUDED.school,
    subschool = EXCLUDED.subschool,
    descriptors = EXCLUDED.descriptors,
    casting_time = EXCLUDED.casting_time,
    range_info = EXCLUDED.range_info,
    target = EXCLUDED.target,
    area = EXCLUDED.area,
    effect = EXCLUDED.effect,
    duration = EXCLUDED.duration,
    saving_throw = EXCLUDED.saving_throw,
    spell_resistance = EXCLUDED.spell_resistance,
    description = EXCLUDED.description,
    material_components = EXCLUDED.material_components,
    focus = EXCLUDED.focus,
    xp_cost = EXCLUDED.xp_cost,
    component_verbal = EXCLUDED.component_verbal,
    component_somatic = EXCLUDED.component_somatic,
    component_material = EXCLUDED.component_material,
    component_focus = EXCLUDED.component_focus,
    component_divine_focus = EXCLUDED.component_divine_focus,
    component_xp = EXCLUDED.component_xp,
    updated_at = NOW();

-- Verificación de la parte ${partNumber}
SELECT 'Parte ${partNumber}/${totalFiles} insertada' AS status, COUNT(*) AS count FROM public.spells;
`;

    // Guardar archivo
    const outputPath = path.join(__dirname, '..', 'supabase', `insert-spells-part${partNumber}-fixed.sql`);
    fs.writeFileSync(outputPath, sql);

    const fileSizeKB = Math.round(fs.statSync(outputPath).size / 1024);
    console.log(`   ✅ Guardado: insert-spells-part${partNumber}-fixed.sql (${fileSizeKB} KB)`);
  }

  console.log(`\n✅ División completada!`);
  console.log(`📁 Archivos generados en: supabase/`);
  console.log(`\n🎯 Próximos pasos:`);
  console.log(`   1. Abre Supabase SQL Editor`);
  console.log(`   2. Ejecuta los archivos en orden:`);
  for (let i = 1; i <= totalFiles; i++) {
    console.log(`      ${i}. insert-spells-part${i}-fixed.sql`);
  }
  console.log(`   3. Verifica que los ${spells.length} conjuros se insertaron correctamente`);
  console.log(`\n⚠️  NOTA: Los niveles de hechizo por clase se insertarán en un paso separado`);
  console.log(`   (tabla spell_class_levels)`);
}

// Ejecutar
generateSql().catch(console.error);
