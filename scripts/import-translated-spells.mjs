#!/usr/bin/env node

/**
 * Script para importar traducciones de hechizos desde JSON
 *
 * Uso:
 * 1. Edita scripts/output/spells-to-translate.json
 * 2. Agrega campo "description_es" a cada hechizo
 * 3. Ejecuta: node scripts/import-translated-spells.mjs
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

async function importTranslations(filePath) {
  console.log('📥 Importando traducciones...\n');

  // Leer archivo
  const content = await fs.readFile(filePath, 'utf-8');
  const spells = JSON.parse(content);

  console.log(`📋 Hechizos a procesar: ${spells.length}`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  // Procesar en lotes de 10
  const batchSize = 10;
  for (let i = 0; i < spells.length; i += batchSize) {
    const batch = spells.slice(i, i + batchSize);

    console.log(`\n🔄 Procesando lote ${Math.floor(i / batchSize) + 1}/${Math.ceil(spells.length / batchSize)}...`);

    for (const spell of batch) {
      // Solo actualizar si tiene traducción
      if (!spell.description_es) {
        skipped++;
        continue;
      }

      const { error } = await supabase
        .from('spells')
        .update({ description: spell.description_es })
        .eq('id', spell.id);

      if (error) {
        console.error(`   ❌ Error en ${spell.name}:`, error.message);
        errors++;
      } else {
        console.log(`   ✅ ${spell.name}`);
        updated++;
      }
    }

    // Pequeña pausa entre lotes
    if (i + batchSize < spells.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN DE IMPORTACIÓN');
  console.log('='.repeat(60));
  console.log(`Total procesados:  ${spells.length}`);
  console.log(`✅ Actualizados:   ${updated}`);
  console.log(`⏭️  Omitidos:       ${skipped}`);
  console.log(`❌ Errores:        ${errors}`);
  console.log('='.repeat(60));
}

async function main() {
  const inputPath = join(__dirname, 'output', 'spells-translated.json');

  try {
    await fs.access(inputPath);
  } catch {
    console.error('❌ Archivo no encontrado:', inputPath);
    console.log('\n💡 Pasos para traducir:');
    console.log('1. Ejecuta: node scripts/translate-spells.mjs --export');
    console.log('2. Edita: scripts/output/spells-to-translate.json');
    console.log('3. Agrega campo "description_es" con las traducciones');
    console.log('4. Guárdalo como: scripts/output/spells-translated.json');
    console.log('5. Ejecuta: node scripts/import-translated-spells.mjs');
    process.exit(1);
  }

  await importTranslations(inputPath);
}

main().catch(console.error);
