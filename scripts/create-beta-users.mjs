/**
 * Script para crear usuarios Beta Testers
 *
 * Este script:
 * 1. Crea usuarios en Supabase Auth con email y contraseña
 * 2. Les asigna automáticamente el rol 'beta_tester'
 *
 * USO:
 * node scripts/create-beta-users.mjs
 *
 * REQUISITOS:
 * - SUPABASE_SERVICE_ROLE_KEY en .env.local
 * - NEXT_PUBLIC_SUPABASE_URL en .env.local
 * - Haber ejecutado create-profiles-and-roles.sql en Supabase
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Faltan variables de entorno');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

// Cliente Supabase con Service Role (puede bypass RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Lista de usuarios Beta Testers a crear
 *
 * FORMATO:
 * {
 *   email: 'user@example.com',
 *   password: 'password123',
 *   displayName: 'Nombre del Usuario' (opcional)
 * }
 */
const BETA_USERS = [
  {
    email: 'damecroftgames@gmail.com',
    password: 'ArcanoCompleto2025!',
    displayName: 'Ayelen'
  },
  // Añadir más usuarios aquí...
];

/**
 * Crea un usuario Beta Tester en Supabase
 */
async function createBetaUser(email, password, displayName) {
  try {
    console.log(`\n📝 Creando usuario: ${email}`);

    // 1. Crear usuario en Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Confirmar email automáticamente
      user_metadata: {
        display_name: displayName || email.split('@')[0]
      }
    });

    if (authError) {
      console.error(`   ❌ Error creando usuario: ${authError.message}`);
      return { success: false, error: authError.message };
    }

    const userId = authData.user.id;
    console.log(`   ✓ Usuario creado en Auth (ID: ${userId})`);

    // 2. Esperar un momento para que el trigger cree el perfil
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 3. Actualizar tier_code a beta_tester
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ tier_code: 'beta_tester' })
      .eq('id', userId);

    if (updateError) {
      console.error(`   ❌ Error asignando tier beta_tester: ${updateError.message}`);
      return { success: false, error: updateError.message };
    }

    console.log(`   ✓ Tier 'beta_tester' asignado`);

    // 4. Verificar perfil
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error(`   ⚠️  Advertencia: No se pudo verificar perfil: ${profileError.message}`);
    } else {
      console.log(`   ✓ Perfil creado:`, {
        email: profile.email,
        tier: profile.tier_code,
        displayName: profile.display_name
      });
    }

    return { success: true, userId };

  } catch (error) {
    console.error(`   ❌ Error inesperado: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Verifica si un usuario ya existe
 */
async function userExists(email) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, tier_code')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    console.error(`   ⚠️  Error verificando usuario: ${error.message}`);
    return null;
  }

  return data;
}

/**
 * Main: Crear todos los usuarios beta
 */
async function main() {
  console.log('🚀 Iniciando creación de usuarios Beta Testers...\n');
  console.log(`📊 Total usuarios a crear: ${BETA_USERS.length}\n`);

  const results = {
    created: 0,
    skipped: 0,
    failed: 0
  };

  for (const user of BETA_USERS) {
    // Verificar si ya existe
    const existing = await userExists(user.email);

    if (existing) {
      console.log(`\n⏭️  Usuario ya existe: ${user.email}`);
      console.log(`   Tier actual: ${existing.tier_code}`);

      if (existing.tier_code !== 'beta_tester') {
        console.log(`   🔄 Actualizando tier a beta_tester...`);
        const { error } = await supabase
          .from('profiles')
          .update({ tier_code: 'beta_tester' })
          .eq('id', existing.id);

        if (error) {
          console.error(`   ❌ Error actualizando tier: ${error.message}`);
        } else {
          console.log(`   ✓ Tier actualizado a beta_tester`);
        }
      }

      results.skipped++;
      continue;
    }

    // Crear nuevo usuario
    const result = await createBetaUser(
      user.email,
      user.password,
      user.displayName
    );

    if (result.success) {
      results.created++;
    } else {
      results.failed++;
    }

    // Pequeña pausa entre creaciones
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Resumen final
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN');
  console.log('='.repeat(60));
  console.log(`✅ Usuarios creados: ${results.created}`);
  console.log(`⏭️  Usuarios existentes: ${results.skipped}`);
  console.log(`❌ Errores: ${results.failed}`);
  console.log('='.repeat(60));

  // Listar todos los beta testers
  console.log('\n📋 LISTA DE BETA TESTERS:');
  console.log('='.repeat(60));

  const { data: betaTesters, error } = await supabase
    .from('profiles')
    .select('email, tier_code, display_name, created_at')
    .eq('tier_code', 'beta_tester')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error listando beta testers:', error.message);
  } else {
    console.table(betaTesters);
  }

  console.log('\n✅ Proceso completado\n');
}

// Ejecutar
main().catch(console.error);
