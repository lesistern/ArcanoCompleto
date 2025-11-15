#!/usr/bin/env node

/**
 * GENERADOR DE SQL PARA NIVELES DE HECHIZO POR CLASE
 *
 * Lee el JSON de conjuros y genera SQL para insertar en la tabla spell_class_levels
 *
 * Tabla: spell_class_levels
 * - spell_id UUID (FK a spells)
 * - class_id UUID (FK a classes)
 * - spell_level INTEGER (0-9)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeo de nombres de clase en JSON (inglés) a slugs en DB (español)
const CLASS_SLUG_MAP = {
  'sorcerer': 'sorcerer',
  'wizard': 'wizard',
  'cleric': 'cleric',
  'druid': 'druid',
  'bard': 'bard',
  'paladin': 'paladin',
  'ranger': 'ranger',
  // Algunas variaciones posibles
  'sor': 'sorcerer',
  'wiz': 'wizard',
  'clr': 'cleric',
  'drd': 'druid',
  'brd': 'bard',
  'pal': 'paladin',
  'rgr': 'ranger',
};

// Normalizar nombre para slug
function normalizeSlug(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Función principal
async function generateSql() {
  console.log('📜 Generador de SQL para Niveles de Hechizo por Clase\n');

  // Leer JSON de conjuros
  const inputPath = path.join(__dirname, 'scraper', 'output', 'spells_clean.json');

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Error: No se encontró ${inputPath}`);
    process.exit(1);
  }

  const spells = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  console.log(`📚 Cargados ${spells.length} conjuros desde JSON`);

  // Recopilar todas las relaciones spell-class-level
  const relations = [];
  let spellsWithLevels = 0;

  for (const spell of spells) {
    if (!spell.level || typeof spell.level !== 'object') {
      continue;
    }

    const spellSlug = normalizeSlug(spell.name);
    let hasLevels = false;

    // Iterar sobre cada clase en el objeto level
    for (const [className, spellLevel] of Object.entries(spell.level)) {
      const classSlug = CLASS_SLUG_MAP[className.toLowerCase()];

      if (!classSlug) {
        console.warn(`⚠️  Clase desconocida: "${className}" en conjuro "${spell.name}"`);
        continue;
      }

      if (typeof spellLevel !== 'number' || spellLevel < 0 || spellLevel > 9) {
        console.warn(`⚠️  Nivel inválido: ${spellLevel} para ${spell.name} (${className})`);
        continue;
      }

      relations.push({
        spellSlug,
        spellName: spell.name,
        classSlug,
        className,
        spellLevel,
      });

      hasLevels = true;
    }

    if (hasLevels) {
      spellsWithLevels++;
    }
  }

  console.log(`\n📊 Estadísticas:`);
  console.log(`   - Conjuros con niveles: ${spellsWithLevels} de ${spells.length}`);
  console.log(`   - Relaciones conjuro-clase: ${relations.length}`);

  // Agrupar por clase
  const byClass = {};
  relations.forEach(r => {
    if (!byClass[r.className]) byClass[r.className] = 0;
    byClass[r.className]++;
  });

  console.log(`\n   Relaciones por clase:`);
  Object.entries(byClass)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cls, count]) => {
      console.log(`      ${cls}: ${count}`);
    });

  // Generar SQL
  console.log(`\n📝 Generando SQL...`);

  let sql = `-- ============================================================================
-- NIVELES DE HECHIZO POR CLASE
-- Relaciones entre conjuros y clases con sus niveles
-- Total de relaciones: ${relations.length}
-- ============================================================================

-- Insertar niveles de hechizo por clase
-- Usa subconsultas para obtener IDs desde slugs
INSERT INTO public.spell_class_levels (spell_id, class_id, spell_level)
VALUES
`;

  // Generar cada INSERT
  const inserts = relations.map(r => {
    return `  (
    (SELECT id FROM public.spells WHERE slug = '${r.spellSlug}'),
    (SELECT id FROM public.classes WHERE slug = '${r.classSlug}'),
    ${r.spellLevel}
  )`;
  });

  sql += inserts.join(',\n');

  // Agregar ON CONFLICT
  sql += `
ON CONFLICT (spell_id, class_id) DO UPDATE
  SET spell_level = EXCLUDED.spell_level;

-- Verificación
SELECT
  'Niveles de hechizo insertados' AS status,
  COUNT(*) AS total_relations
FROM public.spell_class_levels;

-- Estadísticas por clase
SELECT
  c.name as class_name,
  COUNT(*) as spell_count
FROM public.spell_class_levels scl
JOIN public.classes c ON scl.class_id = c.id
GROUP BY c.name
ORDER BY spell_count DESC;

-- Estadísticas por nivel de conjuro (Sorcerer/Wizard)
SELECT
  scl.spell_level,
  COUNT(*) as count
FROM public.spell_class_levels scl
JOIN public.classes c ON scl.class_id = c.id
WHERE c.slug IN ('sorcerer', 'wizard')
GROUP BY scl.spell_level
ORDER BY scl.spell_level;

-- Ver algunos ejemplos
SELECT
  s.name as spell_name,
  c.name as class_name,
  scl.spell_level
FROM public.spell_class_levels scl
JOIN public.spells s ON scl.spell_id = s.id
JOIN public.classes c ON scl.class_id = c.id
ORDER BY s.name, c.name
LIMIT 20;
`;

  // Guardar SQL
  const outputPath = path.join(__dirname, '..', 'supabase', 'insert-spell-class-levels.sql');
  fs.writeFileSync(outputPath, sql);

  const fileSizeKB = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(`\n✅ SQL generado exitosamente!`);
  console.log(`📄 Archivo: ${outputPath}`);
  console.log(`📊 Tamaño: ${fileSizeKB} KB`);
  console.log(`📊 Total de relaciones: ${relations.length}`);

  console.log(`\n🎯 Próximo paso:`);
  console.log(`   1. Abre Supabase SQL Editor`);
  console.log(`   2. Ejecuta: supabase/insert-spell-class-levels.sql`);
  console.log(`   3. Verifica que las ${relations.length} relaciones se insertaron correctamente`);
}

// Ejecutar
generateSql().catch(console.error);
