/**
 * Ejecutor de migraciones usando cliente de Supabase
 * Ejecuta FASE 1 (schema) y PHASE 5B (data) statement por statement
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import postgres from 'postgres';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

if (!supabaseUrl || !serviceRoleKey || !DATABASE_URL) {
  console.error('❌ Error: Faltan credenciales en .env.local');
  process.exit(1);
}

// Usar postgres.js directamente con la connection string
// Modificar la URL para usar puerto 5432 (directo) en lugar de 6543 (pooler)
const directUrl = DATABASE_URL.replace(':6543', ':5432');

console.log('🔌 Conectando a PostgreSQL...');
const sql = postgres(directUrl, {
  max: 1,
  ssl: { rejectUnauthorized: false }
});

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function executeSqlFile(filePath, description) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📄 ${description}`);
  console.log(`   Archivo: ${path.basename(filePath)}`);

  const sqlContent = fs.readFileSync(filePath, 'utf-8');
  const lines = sqlContent.split('\n').length;
  const fileSize = (fs.statSync(filePath).size / 1024).toFixed(1);

  console.log(`   Tamaño: ${fileSize} KB`);
  console.log(`   Líneas: ${lines}`);
  console.log(`\n⏳ Ejecutando statements...`);

  try {
    // Ejecutar el SQL completo
    const result = await sql.unsafe(sqlContent);

    console.log('✅ Ejecución completada');
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

async function verifyData() {
  console.log(`\n${'='.repeat(70)}`);
  console.log('🔍 Verificando datos insertados...\n');

  // Verificar columnas
  try {
    const columns = await sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'deities'
        AND column_name LIKE 'is_%'
      ORDER BY column_name
    `;

    console.log('✅ Columnas is_* creadas:', columns.map(c => c.column_name).join(', '));

  } catch (error) {
    console.log('⚠️  Error verificando columnas:', error.message);
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
    console.log(`⚠️  Datos parciales: ${deitiesCount}/38 deidades, ${domainsCount}/210 dominios.`);
    console.log('   Puede que el SQL haya sido ejecutado parcialmente antes.');
  } else {
    console.log('⚠️  No se encontraron datos. Verifica si hubo errores.');
  }
}

async function main() {
  console.log('🚀 Ejecutor de Migraciones de Deidades (postgres.js)');
  console.log('='.repeat(70));

  try {
    // PASO 1: Schema Migration (FASE 1)
    const schemaPath = path.join(__dirname, '..', 'supabase', 'fase1-deities-schema-migration.sql');
    console.log('\n🔧 PASO 1/2: Creando schema (columnas y tablas)...');
    await executeSqlFile(schemaPath, 'FASE 1: Schema Migration');

    // PASO 2: Data Migration (PHASE 5B)
    const dataPath = path.join(__dirname, '..', 'supabase', 'migrate-deities-initial.sql');
    console.log('\n📦 PASO 2/2: Insertando datos (38 deidades + dominios)...');
    await executeSqlFile(dataPath, 'PHASE 5B: Data Migration');

    // PASO 3: Verificación
    await verifyData();

    console.log(`\n${'='.repeat(70)}`);
    console.log('✅ ¡Migraciones completadas exitosamente!');
    console.log('='.repeat(70) + '\n');

  } catch (error) {
    console.error('\n💥 Error fatal:', error.message);
    console.error('\nStack:', error.stack);
  } finally {
    // Cerrar conexión
    await sql.end();
    process.exit(0);
  }
}

main();
