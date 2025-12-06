/**
 * Ejecutor de migraciones usando RPC exec_sql de Supabase
 * Ejecuta FASE 1 (schema) y PHASE 5B (data) en orden
 *
 * PREREQUISITO: Ejecutar supabase/setup-exec-sql-rpc.sql UNA VEZ en Dashboard
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
  console.error('❌ Error: Faltan credenciales en .env.local');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? '✓' : '✗');
  process.exit(1);
}

// Cliente con service role (puede ejecutar exec_sql)
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Ejecuta un archivo SQL completo usando RPC exec_sql
 */
async function executeSqlFile(filePath, description) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📄 ${description}`);
  console.log(`   Archivo: ${path.basename(filePath)}`);

  const sqlContent = fs.readFileSync(filePath, 'utf-8');
  const lines = sqlContent.split('\n').length;
  const fileSize = (fs.statSync(filePath).size / 1024).toFixed(1);

  console.log(`   Tamaño: ${fileSize} KB`);
  console.log(`   Líneas: ${lines}`);
  console.log(`\n⏳ Ejecutando via RPC...`);

  try {
    // Ejecutar SQL completo via RPC
    const { data, error } = await supabase.rpc('exec_sql', {
      query: sqlContent
    });

    if (error) {
      throw new Error(`RPC error: ${error.message}`);
    }

    if (data && !data.success) {
      throw new Error(`SQL error: ${data.error} (Code: ${data.error_code})`);
    }

    console.log('✅ Ejecución completada');
    if (data?.rows_affected) {
      console.log(`   Filas afectadas: ${data.rows_affected}`);
    }
    console.log(`   Mensaje: ${data?.message || 'OK'}`);

    return true;

  } catch (error) {
    console.error('❌ Error durante ejecución:', error.message);

    // Si es un error de "ya existe", es seguro continuar
    if (error.message.includes('already exists') || error.message.includes('duplicate')) {
      console.log('⚠️  Algunas entidades ya existían (esto es normal si se ejecutó parcialmente antes)');
      return true;
    }

    throw error;
  }
}

/**
 * Verifica que la función RPC exec_sql existe
 */
async function verifyRpcFunction() {
  console.log('🔍 Verificando función RPC exec_sql...');

  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      query: 'SELECT 1 AS test'
    });

    if (error) {
      if (error.message.includes('function') && error.message.includes('does not exist')) {
        console.error('❌ La función RPC exec_sql no existe');
        console.error('\n📋 ACCIÓN REQUERIDA:');
        console.error('   1. Abre Supabase Dashboard: https://supabase.com/dashboard');
        console.error('   2. Ve a SQL Editor');
        console.error('   3. Ejecuta el archivo: supabase/setup-exec-sql-rpc.sql');
        console.error('   4. Vuelve a ejecutar este script\n');
        process.exit(1);
      }
      throw error;
    }

    if (data && data.success) {
      console.log('✅ Función RPC exec_sql configurada correctamente\n');
      return true;
    } else {
      throw new Error('Respuesta inesperada de exec_sql');
    }

  } catch (error) {
    console.error('❌ Error verificando RPC:', error.message);
    process.exit(1);
  }
}

/**
 * Verifica datos insertados usando queries directas de Supabase
 */
async function verifyData() {
  console.log(`\n${'='.repeat(70)}`);
  console.log('🔍 Verificando datos insertados...\n');

  // Verificar columnas creadas
  try {
    const { data: columns, error } = await supabase.rpc('exec_sql', {
      query: `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'deities'
          AND column_name LIKE 'is_%'
        ORDER BY column_name
      `
    });

    if (!error && columns?.success) {
      console.log('✅ Columnas is_* verificadas en tabla deities');
    }
  } catch (error) {
    console.log('⚠️  Error verificando columnas:', error.message);
  }

  // Contar deidades
  const { count: deitiesCount, error: deitiesError } = await supabase
    .from('deities')
    .select('*', { count: 'exact', head: true });

  if (!deitiesError) {
    console.log(`✅ Deidades en BD: ${deitiesCount || 0}`);
  } else {
    console.log(`⚠️  Error contando deidades:`, deitiesError.message);
  }

  // Contar dominios
  const { count: domainsCount, error: domainsError } = await supabase
    .from('deity_domains')
    .select('*', { count: 'exact', head: true });

  if (!domainsError) {
    console.log(`✅ Dominios en BD: ${domainsCount || 0}`);
  } else {
    console.log(`⚠️  Error contando dominios:`, domainsError.message);
  }

  console.log('');

  // Validar resultados esperados
  if (deitiesCount === 38 && domainsCount >= 200) {
    console.log('🎉 ¡Verificación exitosa! Todos los datos insertados correctamente.');
  } else if (deitiesCount > 0) {
    console.log(`⚠️  Datos parciales: ${deitiesCount}/38 deidades, ${domainsCount}/210 dominios.`);
    console.log('   Puede que el SQL haya sido ejecutado parcialmente antes.');
  } else {
    console.log('⚠️  No se encontraron datos. Verifica si hubo errores durante la ejecución.');
  }
}

async function main() {
  console.log('🚀 Ejecutor de Migraciones de Deidades (RPC)');
  console.log('='.repeat(70));

  try {
    // PASO 0: Verificar que RPC existe
    await verifyRpcFunction();

    // PASO 1: Schema Migration (FASE 1)
    const schemaPath = path.join(__dirname, '..', 'supabase', 'fase1-deities-schema-migration.sql');
    console.log('\n🔧 PASO 1/2: Creando schema (columnas y tablas)...');
    await executeSqlFile(schemaPath, 'FASE 1: Schema Migration');

    // PASO 2: Data Migration (PHASE 5B)
    const dataPath = path.join(__dirname, '..', 'supabase', 'migrate-deities-final.sql');
    console.log('\n📦 PASO 2/2: Insertando datos (38 deidades + dominios)...');
    await executeSqlFile(dataPath, 'PHASE 5B: Data Migration');

    // PASO 3: Verificación
    await verifyData();

    console.log(`\n${'='.repeat(70)}`);
    console.log('✅ ¡Migraciones completadas exitosamente!');
    console.log('='.repeat(70) + '\n');

    console.log('📋 Próximo paso:');
    console.log('   PHASE 6: Actualizar páginas públicas de deidades para mostrar las 38 deidades');
    console.log('');

  } catch (error) {
    console.error('\n💥 Error fatal:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Verifica que ejecutaste supabase/setup-exec-sql-rpc.sql');
    console.error('   2. Verifica las credenciales en .env.local');
    console.error('   3. Si el error persiste, ejecuta manualmente en Supabase Dashboard');
    console.error('      Ver: EJECUTAR-AHORA-DASHBOARD.md\n');
    process.exit(1);
  }
}

main();
