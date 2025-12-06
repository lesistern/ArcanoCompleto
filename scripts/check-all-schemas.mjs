#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllSchemas() {
  const tables = ['spells', 'classes', 'races', 'feats', 'skills', 'weapons'];

  for (const table of tables) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📋 Tabla: ${table.toUpperCase()}`);
    console.log('='.repeat(60));

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1)
      .single();

    if (error) {
      console.error(`❌ Error en ${table}:`, error.message);
      continue;
    }

    if (!data) {
      console.log(`⚠️  Sin datos en ${table}`);
      continue;
    }

    const columns = Object.keys(data);
    console.log(`\nColumnas (${columns.length}):\n`);

    // Identificar columnas de texto traducibles
    const textColumns = columns.filter(col => {
      const value = data[col];
      return typeof value === 'string' && value.length > 20 &&
             !['id', 'slug', 'created_at', 'updated_at', 'source_book'].includes(col);
    });

    console.log('📝 Columnas de texto (traducibles):');
    textColumns.forEach(col => {
      const preview = data[col] ? data[col].substring(0, 50) + '...' : 'null';
      console.log(`   - ${col}: "${preview}"`);
    });

    console.log('\n📊 Todas las columnas:');
    columns.forEach(col => {
      const type = typeof data[col];
      const isArray = Array.isArray(data[col]);
      const typeStr = isArray ? 'array' : type;
      console.log(`   - ${col}: ${typeStr}`);
    });
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Análisis completado');
  console.log('='.repeat(60));
}

checkAllSchemas().catch(console.error);
