#!/usr/bin/env node

/**
 * Script para traducir descripciones de hechizos de inglés a español
 *
 * Estrategia:
 * 1. Obtener todos los hechizos de Supabase
 * 2. Filtrar los que tienen descripción en inglés
 * 3. Traducir en lotes usando una API de traducción
 * 4. Actualizar en Supabase
 *
 * NOTA: Este script requiere configuración de API de traducción
 * Opciones: Google Translate API, DeepL API, o traducción manual
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSpells() {
  console.log('🔍 Verificando hechizos en la base de datos...\n');

  // Obtener total de hechizos
  const { count: totalCount, error: countError } = await supabase
    .from('spells')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('❌ Error:', countError);
    process.exit(1);
  }

  console.log(`📊 Total de hechizos: ${totalCount}`);

  // Obtener muestra de hechizos con descripción
  const { data: sampleSpells, error: sampleError } = await supabase
    .from('spells')
    .select('slug, name, description, school')
    .not('description', 'is', null)
    .limit(10);

  if (sampleError) {
    console.error('❌ Error:', sampleError);
    process.exit(1);
  }

  console.log('\n📋 Muestra de hechizos (primeros 10 con descripción):\n');
  sampleSpells.forEach((spell, i) => {
    const descPreview = spell.description
      ? spell.description.substring(0, 100) + '...'
      : 'Sin descripción';
    console.log(`${i + 1}. ${spell.name} (${spell.school})`);
    console.log(`   ${descPreview}\n`);
  });

  // Contar hechizos sin descripción
  const { count: nullCount, error: nullError } = await supabase
    .from('spells')
    .select('*', { count: 'exact', head: true })
    .is('description', null);

  if (!nullError) {
    console.log(`⚠️  Hechizos sin descripción: ${nullCount}`);
  }

  console.log(`✅ Hechizos con descripción: ${totalCount - (nullCount || 0)}`);

  return {
    total: totalCount,
    withDescription: totalCount - (nullCount || 0),
    withoutDescription: nullCount || 0
  };
}

async function exportSpellsForTranslation() {
  console.log('\n📤 Exportando hechizos para traducción...\n');

  // Obtener todos los hechizos con descripción
  const { data: spells, error } = await supabase
    .from('spells')
    .select('id, slug, name, description, school, casting_time, range_info, duration, saving_throw, spell_resistance')
    .not('description', 'is', null)
    .order('name');

  if (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  // Exportar a JSON para revisión/traducción manual
  const outputPath = join(__dirname, 'output', 'spells-to-translate.json');
  await fs.mkdir(join(__dirname, 'output'), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(spells, null, 2));

  console.log(`✅ Exportado: ${spells.length} hechizos`);
  console.log(`📁 Archivo: ${outputPath}`);

  // Crear plantilla CSV para traducción más fácil
  const csvPath = join(__dirname, 'output', 'spells-to-translate.csv');
  const csvHeader = 'id,slug,name,school,description_en\n';
  const csvRows = spells.map(s => {
    const desc = (s.description || '').replace(/"/g, '""').replace(/\n/g, ' ');
    return `"${s.id}","${s.slug}","${s.name}","${s.school}","${desc}"`;
  }).join('\n');

  await fs.writeFile(csvPath, csvHeader + csvRows);
  console.log(`📁 CSV: ${csvPath}`);

  return spells;
}

// Función helper para traducción manual
async function createTranslationTemplate() {
  console.log('\n📝 Creando plantilla de traducción...\n');

  const template = `
# PLANTILLA DE TRADUCCIÓN DE HECHIZOS D&D 3.5

## Instrucciones:
1. Cada hechizo tiene su descripción en inglés
2. Agrega la traducción al español en el campo "description_es"
3. Guarda este archivo como spells-translated.json
4. Ejecuta: node scripts/import-translated-spells.mjs

## Notas:
- Mantén el formato de juego (dados, rangos, duraciones)
- Usa terminología oficial de D&D 3.5 en español
- Referencias: Player's Handbook en español

---

IMPORTANTE: Este archivo será generado automáticamente.
Ejecuta: node scripts/translate-spells.mjs --export

`;

  const templatePath = join(__dirname, 'TRADUCCION_HECHIZOS.md');
  await fs.writeFile(templatePath, template);
  console.log(`✅ Plantilla creada: ${templatePath}`);
}

// Main
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--export')) {
    await exportSpellsForTranslation();
  } else if (args.includes('--template')) {
    await createTranslationTemplate();
  } else {
    const stats = await checkSpells();

    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMEN');
    console.log('='.repeat(60));
    console.log(`Total de hechizos:          ${stats.total}`);
    console.log(`Con descripción (inglés):   ${stats.withDescription}`);
    console.log(`Sin descripción:            ${stats.withoutDescription}`);
    console.log('='.repeat(60));

    console.log('\n💡 SIGUIENTE PASO:');
    console.log('   node scripts/translate-spells.mjs --export');
    console.log('   (Exportará todos los hechizos a JSON/CSV para traducción)');
  }
}

main().catch(console.error);
