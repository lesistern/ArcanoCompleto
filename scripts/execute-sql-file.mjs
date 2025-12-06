#!/usr/bin/env node

/**
 * Ejecuta un archivo SQL en Supabase
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function executeSqlFile(filePath) {
  console.log(`Ejecutando: ${filePath}`);
  console.log('=' * 60);

  // Leer el archivo SQL
  const sql = readFileSync(filePath, 'utf-8');

  console.log(`Tamaño del archivo: ${(sql.length / 1024).toFixed(2)} KB`);
  console.log(`Líneas: ${sql.split('\n').length}`);
  console.log('\nEjecutando SQL...\n');

  try {
    // Ejecutar el SQL completo
    const { data, error } = await supabase.rpc('exec_sql', { sql_string: sql });

    if (error) {
      console.error('❌ Error al ejecutar SQL:');
      console.error(error);
      return false;
    }

    console.log('✅ SQL ejecutado exitosamente');
    if (data) {
      console.log('\nResultado:');
      console.log(data);
    }
    return true;
  } catch (err) {
    console.error('❌ Error:', err.message);
    return false;
  }
}

// Obtener archivo SQL del argumento
const sqlFile = process.argv[2] || join(__dirname, '..', 'supabase', 'create-user-tiers-system.sql');

executeSqlFile(sqlFile)
  .then(success => {
    if (success) {
      console.log('\n✅ Proceso completado exitosamente');
      process.exit(0);
    } else {
      console.log('\n❌ Proceso falló');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('❌ Error fatal:', err);
    process.exit(1);
  });
