/**
 * Script de diagnóstico para verificar schema de la tabla deities
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkSchema() {
  console.log('🔍 Verificando schema de tabla deities...\n');

  const { data, error } = await supabase.rpc('exec_sql', {
    query: `
      SELECT
        column_name,
        data_type,
        character_maximum_length,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'deities'
      ORDER BY ordinal_position;
    `
  });

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  if (data && data.success) {
    console.log('✅ Schema de tabla deities:\n');
    console.log('No se puede parsear el resultado directamente');
    console.log('Ejecuta esta query en Supabase Dashboard:\n');
    console.log(`
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'deities'
ORDER BY ordinal_position;
    `);
  }
}

checkSchema();
