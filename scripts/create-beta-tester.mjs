/**
 * Script para crear un usuario beta tester
 *
 * Uso: node scripts/create-beta-tester.mjs
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import crypto from 'crypto';

// Cargar variables de entorno
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Error: Faltan variables de entorno');
  console.error('   Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

// Cliente de Supabase con Service Role (puede crear usuarios)
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Generar contraseña aleatoria segura (16 caracteres)
function generateSecurePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  const randomBytes = crypto.randomBytes(16);

  for (let i = 0; i < 16; i++) {
    password += chars[randomBytes[i] % chars.length];
  }

  return password;
}

async function createBetaTester() {
  const email = 'alefzaba@gmail.com';
  const password = generateSecurePassword();
  const displayName = 'Alef Zaba';

  console.log('🚀 Creando usuario beta tester...\n');
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Contraseña: ${password}`);
  console.log(`👤 Nombre: ${displayName}\n`);

  try {
    // 1. Crear usuario en Supabase Auth
    console.log('1️⃣  Creando usuario en Supabase Auth...');
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Auto-confirmar email
      user_metadata: {
        display_name: displayName
      }
    });

    if (authError) {
      throw new Error(`Error al crear usuario: ${authError.message}`);
    }

    console.log(`   ✅ Usuario creado con ID: ${authData.user.id}`);

    // 2. Esperar un momento para que se cree el perfil automáticamente (trigger)
    console.log('\n2️⃣  Esperando creación automática del perfil...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 3. Verificar que el perfil se creó
    console.log('\n3️⃣  Verificando perfil...');
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, display_name, tier_code')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.warn(`   ⚠️  Perfil no encontrado (se creará automáticamente en el primer login)`);
    } else {
      console.log(`   ✅ Perfil encontrado: ${profile.display_name}`);
    }

    // 4. Asignar tier 'beta_tester'
    console.log('\n4️⃣  Asignando tier beta_tester...');

    // Primero verificar si ya tiene el tier
    const { data: existingTier } = await supabase
      .from('user_tier_assignments')
      .select('tier_code')
      .eq('user_id', authData.user.id)
      .eq('tier_code', 'beta_tester')
      .single();

    if (!existingTier) {
      const { error: tierError } = await supabase
        .from('user_tier_assignments')
        .insert({
          user_id: authData.user.id,
          tier_code: 'beta_tester',
          notes: 'Beta tester asignado automáticamente por script'
        });

      if (tierError) {
        throw new Error(`Error al asignar tier: ${tierError.message}`);
      }
      console.log('   ✅ Tier beta_tester asignado');
    } else {
      console.log('   ℹ️  Usuario ya tiene el tier beta_tester');
    }

    // 5. Verificar tiers finales
    console.log('\n5️⃣  Verificando tiers finales...');
    const { data: tiers, error: tiersError } = await supabase
      .from('user_tier_assignments')
      .select('tier_code')
      .eq('user_id', authData.user.id);

    if (tiersError) {
      console.warn(`   ⚠️  Error al verificar tiers: ${tiersError.message}`);
    } else {
      console.log(`   ✅ Tiers asignados: ${tiers.map(t => t.tier_code).join(', ')}`);
    }

    // 6. Resumen final
    console.log('\n' + '='.repeat(60));
    console.log('✅ USUARIO BETA TESTER CREADO EXITOSAMENTE');
    console.log('='.repeat(60));
    console.log(`\n📧 Email: ${email}`);
    console.log(`🔑 Contraseña: ${password}`);
    console.log(`🆔 User ID: ${authData.user.id}`);
    console.log(`👤 Nombre: ${displayName}`);
    console.log(`🎫 Tiers: ${tiers?.map(t => t.tier_code).join(', ') || 'user'}`);
    console.log('\n💡 El usuario puede iniciar sesión en la aplicación con estas credenciales.');
    console.log('💡 Guarda esta contraseña en un lugar seguro (no se puede recuperar).\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  }
}

// Ejecutar
createBetaTester()
  .then(() => {
    console.log('🎉 Script completado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
