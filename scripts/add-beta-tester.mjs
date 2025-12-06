// ============================================================================
// SCRIPT: Agregar Beta Tester
// ============================================================================
// Crea un usuario beta tester en Supabase Auth con contraseña aleatoria
// ============================================================================

import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Cargar variables de entorno desde .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env.local') });

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Faltan variables de entorno');
  console.error('   Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

// Cliente con service role (acceso admin)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Generar contraseña aleatoria segura (16 caracteres)
function generatePassword() {
  const length = 16;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    password += charset[randomIndex];
  }

  return password;
}

async function addBetaTester(email, displayName) {
  console.log('\n🚀 Agregando beta tester...');
  console.log(`   Email: ${email}`);
  console.log(`   Display Name: ${displayName}`);

  // Generar contraseña aleatoria
  const password = generatePassword();

  try {
    // 1. Crear usuario en Supabase Auth
    console.log('\n📝 Creando usuario en Supabase Auth...');
    const { data: user, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Auto-confirmar email
      user_metadata: {
        display_name: displayName
      }
    });

    if (authError) {
      console.error('❌ Error al crear usuario:', authError.message);
      return;
    }

    console.log('✅ Usuario creado en Auth:', user.user.id);

    // 2. Verificar que el perfil se creó automáticamente (trigger)
    console.log('\n🔍 Verificando perfil...');
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.user.id)
      .single();

    if (profileError) {
      console.error('❌ Error al verificar perfil:', profileError.message);
      return;
    }

    console.log('✅ Perfil encontrado');

    // 3. Actualizar tier a beta_tester
    console.log('\n🎫 Asignando tier beta_tester...');
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        tier_code: 'beta_tester',
        display_name: displayName
      })
      .eq('id', user.user.id);

    if (updateError) {
      console.error('❌ Error al actualizar tier:', updateError.message);
      return;
    }

    console.log('✅ Tier actualizado a beta_tester');

    // 4. Mostrar resumen
    console.log('\n' + '='.repeat(60));
    console.log('✅ BETA TESTER CREADO EXITOSAMENTE');
    console.log('='.repeat(60));
    console.log(`📧 Email:        ${email}`);
    console.log(`🔑 Contraseña:   ${password}`);
    console.log(`👤 Display Name: ${displayName}`);
    console.log(`🎫 Tier:         beta_tester`);
    console.log(`🆔 User ID:      ${user.user.id}`);
    console.log('='.repeat(60));
    console.log('\n⚠️  IMPORTANTE: Guarda esta contraseña en un lugar seguro.');
    console.log('   El usuario puede cambiarla después de iniciar sesión.');
    console.log('');

  } catch (error) {
    console.error('\n❌ Error inesperado:', error);
  }
}

// Ejecutar
const email = 'spike_spacecowboy@hotmail.com';
const displayName = 'Spike Spiegel';

addBetaTester(email, displayName);
