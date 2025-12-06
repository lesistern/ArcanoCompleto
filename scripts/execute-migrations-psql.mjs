/**
 * Ejecutor de migraciones usando psql directamente
 * Ejecuta FASE 1 (schema) y PHASE 5B (data) en orden
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const DATABASE_URL = process.env.DATABASE_URL;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!DATABASE_URL || !supabaseUrl || !serviceRoleKey) {
  console.error('❌ Error: Faltan credenciales en .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

function executeSqlFile(filePath, description) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📄 ${description}`);
  console.log(`   Archivo: ${path.basename(filePath)}`);

  const fileSize = (fs.statSync(filePath).size / 1024).toFixed(1);
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n').length;

  console.log(`   Tamaño: ${fileSize} KB`);
  console.log(`   Líneas: ${lines}`);
  console.log(`\n⏳ Ejecutando con psql...`);

  try {
    const result = execSync(
      `psql "${DATABASE_URL}" -f "${filePath}"`,
      {
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024,
        stdio: 'pipe'
      }
    );

    console.log('✅ Ejecución completada');

    // Mostrar últimas 10 líneas del output
    const outputLines = result.split('\n').filter(l => l.trim());
    if (outputLines.length > 0) {
      console.log('\n📋 Output (últimas líneas):');
      outputLines.slice(-10).forEach(line => console.log(`   ${line}`));
    }

    return true;

  } catch (error) {
    console.error('❌ Error durante ejecución:');

    if (error.stdout) {
      console.log('\n📋 Output:', error.stdout.toString().split('\n').slice(-10).join('\n   '));
    }

    if (error.stderr) {
      console.error('\n⚠️  Error:', error.stderr.toString().split('\n')[0]);
    }

    throw error;
  }
}

async function verifyData() {
  console.log(`\n${'='.repeat(70)}`);
  console.log('🔍 Verificando datos insertados...\n');

  // Verificar columnas
  try {
    const checkColumns = await execSync(
      `psql "${DATABASE_URL}" -t -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'deities' AND column_name LIKE 'is_%' ORDER BY column_name;"`,
      { encoding: 'utf-8' }
    );

    const columns = checkColumns.split('\n').filter(l => l.trim()).map(l => l.trim());
    console.log('✅ Columnas is_* creadas:', columns.join(', '));

  } catch (error) {
    console.log('⚠️  No se pudieron verificar columnas');
  }

  // Contar deidades
  const { count: deitiesCount } = await supabase
    .from('deities')
    .select('*', { count: 'exact', head: true });

  console.log(`✅ Deidades en BD: ${deitiesCount || 0}`);

  // Contar dominios
  const { count: domainsCount } = await supabase
    .from('deity_domains')
    .select('*', { count: 'exact', head: true });

  console.log(`✅ Dominios en BD: ${domainsCount || 0}\n`);

  // Validar resultados esperados
  if (deitiesCount === 38 && domainsCount >= 200) {
    console.log('🎉 ¡Verificación exitosa! Todos los datos insertados correctamente.');
  } else if (deitiesCount > 0) {
    console.log('⚠️  Datos parciales insertados. Puede que el SQL haya sido ejecutado parcialmente antes.');
  } else {
    console.log('⚠️  No se encontraron datos. Verifica si hubo errores durante la ejecución.');
  }
}

async function main() {
  console.log('🚀 Ejecutor de Migraciones de Deidades (psql)');
  console.log('='.repeat(70));

  try {
    // PASO 1: Schema Migration (FASE 1)
    const schemaPath = path.join(__dirname, '..', 'supabase', 'fase1-deities-schema-migration.sql');
    console.log('\n🔧 PASO 1/2: Creando schema (columnas y tablas)...');
    executeSqlFile(schemaPath, 'FASE 1: Schema Migration');

    // PASO 2: Data Migration (PHASE 5B)
    const dataPath = path.join(__dirname, '..', 'supabase', 'migrate-deities-initial.sql');
    console.log('\n📦 PASO 2/2: Insertando datos (38 deidades + dominios)...');
    executeSqlFile(dataPath, 'PHASE 5B: Data Migration');

    // PASO 3: Verificación
    await verifyData();

    console.log(`${'='.repeat(70)}`);
    console.log('✅ ¡Migraciones completadas exitosamente!');
    console.log('='.repeat(70) + '\n');

  } catch (error) {
    console.error('\n💥 Error fatal:', error.message);
    console.error('\n💡 Tip: Si el error persiste, ejecuta manualmente en Supabase Dashboard.');
    process.exit(1);
  }
}

main();
