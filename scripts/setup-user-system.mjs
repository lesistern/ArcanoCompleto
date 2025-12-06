#!/usr/bin/env node

/**
 * Script para configurar el sistema de usuarios en Supabase
 * Ejecuta el SQL del sistema de tiers y perfiles de usuario
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de Supabase
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: Variables de entorno no configuradas');
  console.error('Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

// Crear cliente con service role para operaciones administrativas
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupUserSystem() {
  console.log('🚀 Configurando sistema de usuarios en Supabase...\n');

  try {
    // Leer el SQL
    const sqlPath = join(__dirname, '..', 'supabase', 'create-user-tiers-system-fixed.sql');
    const sql = readFileSync(sqlPath, 'utf-8');

    console.log('📄 Ejecutando SQL del sistema de tiers...');

    // Nota: Supabase no permite ejecutar múltiples statements en una sola llamada
    // Dividimos el SQL en statements individuales
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'));

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];

      // Skip comentarios y statements vacíos
      if (!statement || statement.startsWith('COMMENT')) {
        continue;
      }

      try {
        // Para SELECTs de resumen al final, solo los mostramos
        if (statement.trim().toUpperCase().startsWith('SELECT')) {
          console.log(`\n📊 Ejecutando consulta de verificación...`);
          const { data, error } = await supabase.rpc('exec_sql', { sql_query: statement });

          if (error) {
            // Intentar ejecutar directamente
            console.log(`  ℹ️ Consulta: ${statement.substring(0, 50)}...`);
          } else if (data) {
            console.log(`  ✅ Resultado:`, data);
          }
          continue;
        }

        // Ejecutar el statement
        const { error } = await supabase.rpc('exec_sql', { sql_query: statement });

        if (error) {
          // Algunos errores son esperados (ej: "ya existe")
          if (error.message.includes('already exists') ||
              error.message.includes('ya existe') ||
              error.message.includes('duplicate')) {
            console.log(`  ⚠️ Ya existe: ${statement.substring(0, 60)}...`);
            successCount++;
          } else {
            console.error(`  ❌ Error en statement ${i + 1}:`, error.message);
            errorCount++;
          }
        } else {
          successCount++;
          if (i % 10 === 0) {
            console.log(`  ✅ ${successCount} statements ejecutados...`);
          }
        }
      } catch (err) {
        console.error(`  ❌ Excepción en statement ${i + 1}:`, err.message);
        errorCount++;
      }
    }

    console.log(`\n📊 Resumen de ejecución:`);
    console.log(`  ✅ Exitosos: ${successCount}`);
    console.log(`  ❌ Errores: ${errorCount}`);

    // Verificar que se crearon las tablas principales
    console.log('\n🔍 Verificando tablas creadas...');

    const tables = ['user_tiers', 'profiles', 'translation_edits', 'translation_votes', 'languages'];

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`  ❌ ${table}: No encontrada o error (${error.message})`);
      } else {
        console.log(`  ✅ ${table}: OK`);
      }
    }

    // Verificar tiers insertados
    console.log('\n👥 Verificando tiers de usuario...');
    const { data: tiers, error: tiersError } = await supabase
      .from('user_tiers')
      .select('code, name, can_translate, can_review, can_approve')
      .order('code');

    if (tiersError) {
      console.error('  ❌ Error al obtener tiers:', tiersError.message);
    } else if (tiers) {
      console.log(`  ✅ ${tiers.length} tiers configurados:`);
      tiers.forEach(tier => {
        const perms = [];
        if (tier.can_translate) perms.push('traducir');
        if (tier.can_review) perms.push('revisar');
        if (tier.can_approve) perms.push('aprobar');
        console.log(`     - ${tier.name} (${tier.code}): ${perms.join(', ') || 'solo lectura'}`);
      });
    }

    console.log('\n✅ Sistema de usuarios configurado exitosamente');
    console.log('\n📝 Próximos pasos:');
    console.log('  1. Crear componentes de autenticación en el frontend');
    console.log('  2. Implementar página de perfil de usuario');
    console.log('  3. Configurar proveedores de OAuth si es necesario');

  } catch (error) {
    console.error('\n❌ Error durante la configuración:', error);
    process.exit(1);
  }
}

// Ejecutar
setupUserSystem();
