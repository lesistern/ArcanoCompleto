#!/usr/bin/env node

/**
 * GENERADOR DE SQL PARA DOTES
 *
 * Lee el JSON de dotes y genera SQL compatible con la tabla feats
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Normalizar nombre para slug
function normalizeSlug(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Escapar SQL
function escapeSql(text) {
  if (!text) return null;
  return text.replace(/'/g, "''");
}

// Convertir array a SQL
function arrayToSql(arr) {
  if (!arr || arr.length === 0) return 'NULL';
  const escaped = arr.map(item => `'${escapeSql(item)}'`);
  return `ARRAY[${escaped.join(', ')}]::TEXT[]`;
}

// Convertir objeto a JSONB
function objectToJsonb(obj) {
  if (!obj || Object.keys(obj).length === 0) return 'NULL';
  const json = JSON.stringify(obj);
  return `'${escapeSql(json)}'::JSONB`;
}

// Generar INSERT para una dote
function generateFeatInsert(feat) {
  const slug = normalizeSlug(feat.name);

  // Categorizar (en español para coincidir con el constraint de la BD)
  let category = 'General';
  if (feat.is_metamagic) category = 'Metamágica';
  else if (feat.is_item_creation) category = 'Creación de objetos';
  else if (feat.is_fighter_bonus) category = 'Combate';

  // Prerequisites como texto simple
  const prereqText = feat.prerequisites && feat.prerequisites !== 'None' ? feat.prerequisites : 'None';

  const values = [
    `'${slug}'`, // slug
    `'${escapeSql(feat.name)}'`, // name
    `'${category}'`, // category
    `'${escapeSql(prereqText)}'`, // prerequisites (TEXT simple)
    feat.benefit ? `'${escapeSql(feat.benefit)}'` : 'NULL', // benefit
    feat.special ? `'${escapeSql(feat.special)}'` : 'NULL', // special
    feat.normal ? `'${escapeSql(feat.normal)}'` : 'NULL', // normal
  ];

  return `  (${values.join(', ')})`;
}

// Función principal
async function generateSql() {
  console.log('📜 Generador de SQL para Dotes D&D 3.5\n');

  const inputPath = path.join(__dirname, 'scraper', 'output', 'feats_complete.json');

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Error: No se encontró ${inputPath}`);
    process.exit(1);
  }

  let feats = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  console.log(`📚 Cargadas ${feats.length} dotes desde JSON`);

  // Filtrar entries descriptivos
  const descriptiveNames = [
    'Fighter Bonus Feats',
    'Item Creation Feats',
    'Metamagic Feats',
    'Feat Name',
    'Feat Descriptions',
  ];

  feats = feats.filter(f =>
    !descriptiveNames.includes(f.name) &&
    !f.name.toLowerCase().includes('feats') &&
    !f.benefit.toLowerCase().includes('this category') &&
    !f.benefit.toLowerCase().includes('this designation')
  );

  console.log(`✅ Dotes válidas después de filtrar: ${feats.length}\n`);

  // Generar SQL
  let sql = `-- ============================================================================
-- DOTES DEL PLAYER'S HANDBOOK
-- Total de dotes: ${feats.length}
-- ============================================================================

-- Insertar dotes
INSERT INTO public.feats (
  slug, name, category, prerequisites, benefit, special, normal
)
VALUES
`;

  const inserts = feats.map(feat => generateFeatInsert(feat));
  sql += inserts.join(',\n');

  sql += `
ON CONFLICT (slug) DO UPDATE
  SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    prerequisites = EXCLUDED.prerequisites,
    benefit = EXCLUDED.benefit,
    special = EXCLUDED.special,
    normal = EXCLUDED.normal,
    updated_at = NOW();

-- Verificación
SELECT
  'Dotes insertadas exitosamente' AS status,
  COUNT(*) AS total_feats
FROM public.feats;

-- Estadísticas por categoría
SELECT
  category,
  COUNT(*) as count
FROM public.feats
GROUP BY category
ORDER BY count DESC;
`;

  // Guardar SQL
  const outputPath = path.join(__dirname, '..', 'supabase', 'insert-feats-phb.sql');
  fs.writeFileSync(outputPath, sql);

  const fileSizeKB = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(`✅ SQL generado exitosamente!`);
  console.log(`📄 Archivo: ${outputPath}`);
  console.log(`📊 Tamaño: ${fileSizeKB} KB`);
  console.log(`📊 Total de dotes: ${feats.length}`);

  // Estadísticas
  const byCategory = {};
  feats.forEach(feat => {
    const cat = feat.is_metamagic ? 'Metamágica' :
                feat.is_item_creation ? 'Creación de objetos' :
                feat.is_fighter_bonus ? 'Combate' : 'General';
    byCategory[cat] = (byCategory[cat] || 0) + 1;
  });

  console.log(`\n📊 Estadísticas por Categoría:`);
  Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count}`);
    });

  console.log(`\n🎯 Próximo paso:`);
  console.log(`   1. Abre Supabase SQL Editor`);
  console.log(`   2. Ejecuta: supabase/insert-feats-phb.sql`);
  console.log(`   3. Verifica que las ${feats.length} dotes se insertaron correctamente`);
}

generateSql().catch(console.error);
