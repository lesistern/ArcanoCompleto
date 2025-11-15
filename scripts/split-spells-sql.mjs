#!/usr/bin/env node

/**
 * DIVIDIR SQL DE CONJUROS EN ARCHIVOS MÁS PEQUEÑOS
 *
 * El archivo insert-spells-phb.sql es demasiado grande para el SQL Editor de Supabase.
 * Este script lo divide en 6 partes de ~100 conjuros cada una.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPELLS_PER_FILE = 100;

async function splitSql() {
  console.log('🔪 Dividiendo SQL de conjuros en partes más pequeñas\n');

  // Leer JSON de conjuros
  const inputJsonPath = path.join(__dirname, 'scraper', 'output', 'spells_complete.json');
  const spells = JSON.parse(fs.readFileSync(inputJsonPath, 'utf-8'));

  console.log(`📚 Total de conjuros: ${spells.length}`);

  // Calcular número de archivos necesarios
  const totalFiles = Math.ceil(spells.length / SPELLS_PER_FILE);
  console.log(`📄 Se crearán ${totalFiles} archivos de ~${SPELLS_PER_FILE} conjuros cada uno\n`);

  // Función para generar INSERT de un conjuro (copiada de generate-spells-sql.mjs)
  function normalizeSlug(name) {
    return name
      .toLowerCase()
      .replace(/['']/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function escapeSql(text) {
    if (!text) return null;
    return text.replace(/'/g, "''");
  }

  function arrayToSql(arr) {
    if (!arr || arr.length === 0) return 'NULL';
    const escaped = arr.map(item => `'${escapeSql(item)}'`);
    return `ARRAY[${escaped.join(', ')}]::TEXT[]`;
  }

  function objectToJsonb(obj) {
    if (!obj || Object.keys(obj).length === 0) return 'NULL';
    const json = JSON.stringify(obj);
    return `'${escapeSql(json)}'::JSONB`;
  }

  function boolToSql(val) {
    if (val === true || val === 'Yes' || val === 'Sí') return 'true';
    if (val === false || val === 'No') return 'false';
    return 'NULL';
  }

  function generateSpellInsert(spell) {
    const slug = normalizeSlug(spell.name);
    const components = spell.components || [];
    const verbal = components.includes('V') || components.includes('Verbal');
    const somatic = components.includes('S') || components.includes('Somático');
    const material = components.includes('M') || components.includes('Material');
    const focus = components.includes('F') || components.includes('Foco');
    const divine_focus = components.includes('DF') || components.includes('FD');
    const xp_component = components.includes('XP');

    const descriptors = spell.descriptors || [];

    let spell_resistance = null;
    if (spell.spell_resistance) {
      if (spell.spell_resistance.toLowerCase().includes('yes') || spell.spell_resistance.toLowerCase().includes('sí')) {
        spell_resistance = true;
      } else if (spell.spell_resistance.toLowerCase().includes('no')) {
        spell_resistance = false;
      }
    }

    const values = [
      `'${slug}'`,
      `'${escapeSql(spell.name)}'`,
      spell.name_es ? `'${escapeSql(spell.name_es)}'` : 'NULL',
      spell.school ? `'${escapeSql(spell.school)}'` : 'NULL',
      spell.subschool ? `'${escapeSql(spell.subschool)}'` : 'NULL',
      descriptors.length > 0 ? arrayToSql(descriptors) : 'NULL',
      objectToJsonb(spell.level),
      boolToSql(verbal),
      boolToSql(somatic),
      boolToSql(material),
      boolToSql(focus),
      boolToSql(divine_focus),
      boolToSql(xp_component),
      spell.material_component ? `'${escapeSql(spell.material_component)}'` : 'NULL',
      spell.focus ? `'${escapeSql(spell.focus)}'` : 'NULL',
      spell.xp_cost ? `'${escapeSql(spell.xp_cost)}'` : 'NULL',
      spell.casting_time ? `'${escapeSql(spell.casting_time)}'` : 'NULL',
      spell.range ? `'${escapeSql(spell.range)}'` : 'NULL',
      spell.target ? `'${escapeSql(spell.target)}'` : 'NULL',
      spell.area ? `'${escapeSql(spell.area)}'` : 'NULL',
      spell.effect ? `'${escapeSql(spell.effect)}'` : 'NULL',
      spell.duration ? `'${escapeSql(spell.duration)}'` : 'NULL',
      spell.saving_throw ? `'${escapeSql(spell.saving_throw)}'` : 'NULL',
      spell_resistance !== null ? boolToSql(spell_resistance) : 'NULL',
      spell.description ? `'${escapeSql(spell.description)}'` : 'NULL',
      spell.description ? `'${escapeSql(spell.description)}'` : 'NULL',
    ];

    return `  (${values.join(', ')})`;
  }

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
    const inserts = batchSpells.map(spell => generateSpellInsert(spell));
    sql += inserts.join(',\n');

    // Agregar ON CONFLICT
    sql += `
ON CONFLICT (slug) DO UPDATE
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

-- Verificación de la parte ${partNumber}
SELECT 'Parte ${partNumber}/${totalFiles} insertada' AS status, COUNT(*) AS count FROM public.spells;
`;

    // Guardar archivo
    const outputPath = path.join(__dirname, '..', 'supabase', `insert-spells-part${partNumber}.sql`);
    fs.writeFileSync(outputPath, sql);

    const fileSizeKB = Math.round(fs.statSync(outputPath).size / 1024);
    console.log(`   ✅ Guardado: insert-spells-part${partNumber}.sql (${fileSizeKB} KB)`);
  }

  console.log(`\n✅ División completada!`);
  console.log(`📁 Archivos generados en: supabase/`);
  console.log(`\n🎯 Próximos pasos:`);
  console.log(`   1. Abre Supabase SQL Editor`);
  console.log(`   2. Ejecuta los archivos en orden:`);
  for (let i = 1; i <= totalFiles; i++) {
    console.log(`      ${i}. insert-spells-part${i}.sql`);
  }
  console.log(`   3. Verifica que los ${spells.length} conjuros se insertaron correctamente`);
}

splitSql().catch(console.error);
