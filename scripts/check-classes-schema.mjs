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

async function checkClassesSchema() {
  console.log('🔍 Verificando esquema de tabla classes...\n');

  // Obtener una clase de ejemplo
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  console.log('📋 Columnas disponibles en tabla classes:\n');
  Object.keys(data).forEach(col => {
    console.log(`   - ${col}: ${typeof data[col]}`);
  });

  console.log('\n📝 Ejemplo (Bárbaro):');
  console.log(JSON.stringify(data, null, 2));
}

checkClassesSchema().catch(console.error);
