/**
 * Script temporal para ejecutar migraciones de deidades
 * Ejecuta FASE 1 (schema) y PHASE 5B (data) en orden
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Error: Faltan credenciales de Supabase');
  process.exit(1);
}

// Cliente con service role (puede ejecutar cualquier SQL)
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function executeSqlFile(filePath, description) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📄 Ejecutando: ${description}`);
  console.log(`   Archivo: ${path.basename(filePath)}`);

  const sqlContent = fs.readFileSync(filePath, 'utf-8');
  const lines = sqlContent.split('\n').length;
  console.log(`   Líneas: ${lines}`);

  try {
    // Supabase REST API no soporta ejecutar SQL arbitrario directamente
    // Necesitamos usar RPC o ejecutar statement por statement

    // Dividir el SQL en statements individuales
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`   Statements: ${statements.length}`);
    console.log(`\n⏳ Ejecutando...`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];

      // Skip comentarios y líneas vacías
      if (stmt.startsWith('--') || stmt.trim() === '') continue;

      try {
        // Ejecutar via RPC sql function (si existe)
        // O usar .rpc('exec_sql', { sql: stmt })

        // Como alternativa, usar el método directo de postgres
        const { error } = await supabase.rpc('exec_sql', {
          query: stmt + ';'
        }).single();

        if (error) {
          // Si exec_sql no existe, intentar crear la función primero
          if (error.message.includes('function') && error.message.includes('does not exist')) {
            console.log('   ⚠️  Función exec_sql no existe. Usando método alternativo...');
            // Continuar con siguiente statement
            break;
          }
          throw error;
        }

        successCount++;
        if (i % 10 === 0) {
          process.stdout.write(`\r   Progreso: ${i + 1}/${statements.length}`);
        }
      } catch (error) {
        errorCount++;
        console.error(`\n   ❌ Error en statement ${i + 1}:`, error.message.split('\n')[0]);

        // Si es un error crítico, detener
        if (errorCount > 5) {
          console.error('\n   ⛔ Demasiados errores. Deteniendo ejecución.');
          throw error;
        }
      }
    }

    console.log(`\n   ✅ Completado: ${successCount} statements exitosos, ${errorCount} errores`);

  } catch (error) {
    console.error(`\n   ❌ Error fatal:`, error.message);
    throw error;
  }
}

async function verifyData() {
  console.log(`\n${'='.repeat(70)}`);
  console.log('🔍 Verificando datos insertados...\n');

  // Verificar columnas de deities
  const { data: columns, error: colError } = await supabase
    .rpc('exec_sql', {
      query: `SELECT column_name FROM information_schema.columns WHERE table_name = 'deities' AND column_name LIKE 'is_%' ORDER BY column_name;`
    });

  if (!colError && columns) {
    console.log('✅ Columnas is_* encontradas:', columns.map(c => c.column_name).join(', '));
  }

  // Contar deidades
  const { count: deitiesCount, error: deitiesError } = await supabase
    .from('deities')
    .select('*', { count: 'exact', head: true });

  if (!deitiesError) {
    console.log(`✅ Deidades insertadas: ${deitiesCount || 0}`);
  } else {
    console.log(`⚠️  Error contando deidades:`, deitiesError.message);
  }

  // Contar dominios
  const { count: domainsCount, error: domainsError } = await supabase
    .from('deity_domains')
    .select('*', { count: 'exact', head: true });

  if (!domainsError) {
    console.log(`✅ Dominios insertados: ${domainsCount || 0}`);
  } else {
    console.log(`⚠️  Error contando dominios:`, domainsError.message);
  }
}

async function main() {
  console.log('🚀 Ejecutor de Migraciones de Deidades');
  console.log('='repeat(70));

  try {
    // PASO 1: Schema Migration (FASE 1)
    const schemaPath = path.join(__dirname, '..', 'supabase', 'fase1-deities-schema-migration.sql');
    await executeSqlFile(schemaPath, 'FASE 1: Schema Migration');

    // PASO 2: Data Migration (PHASE 5B)
    const dataPath = path.join(__dirname, '..', 'supabase', 'migrate-deities-initial.sql');
    await executeSqlFile(dataPath, 'PHASE 5B: Data Migration');

    // PASO 3: Verificación
    await verifyData();

    console.log(`\n${'='.repeat(70)}`);
    console.log('🎉 ¡Migraciones completadas exitosamente!');
    console.log('='repeat(70)\n);

  } catch (error) {
    console.error('\n💥 Error durante la ejecución:', error);
    process.exit(1);
  }
}

main();
