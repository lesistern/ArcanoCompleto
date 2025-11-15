/**
 * Script para catalogar un usuario como administrador
 * Actualiza el tier_code de un usuario a 'admin'
 *
 * Uso:
 *   node scripts/set-admin-user.mjs lesistern@gmail.com
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY deben estar definidas en .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setAdminUser(email) {
  try {
    console.log(`\n🔍 Buscando usuario con email: ${email}...\n`);

    // 1. Buscar el usuario por email usando Admin API
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
      throw new Error(`Error al listar usuarios: ${listError.message}`);
    }

    const user = users.users.find(u => u.email === email);

    if (!user) {
      throw new Error(`No se encontró ningún usuario con email: ${email}`);
    }

    console.log(`✅ Usuario encontrado:`);
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Creado: ${user.created_at}\n`);

    // 2. Verificar si ya existe un perfil
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileCheckError && profileCheckError.code !== 'PGRST116') {
      throw new Error(`Error al verificar perfil: ${profileCheckError.message}`);
    }

    // 3. Actualizar o crear perfil con tier admin
    if (existingProfile) {
      console.log(`📝 Actualizando perfil existente...\n`);

      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update({
          tier_code: 'admin',
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (updateError) {
        throw new Error(`Error al actualizar perfil: ${updateError.message}`);
      }

      console.log(`✅ Perfil actualizado exitosamente:`);
      console.log(`   Tier anterior: ${existingProfile.tier_code}`);
      console.log(`   Tier nuevo: ${updatedProfile.tier_code}`);
      console.log(`   Nombre: ${updatedProfile.display_name || '(sin nombre)'}`);
      console.log(`   Reputación: ${updatedProfile.reputation_points} puntos\n`);

    } else {
      console.log(`📝 Creando nuevo perfil con tier admin...\n`);

      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          tier_code: 'admin',
          display_name: user.user_metadata?.display_name || email.split('@')[0],
          preferred_language: 'es',
        })
        .select()
        .single();

      if (insertError) {
        throw new Error(`Error al crear perfil: ${insertError.message}`);
      }

      console.log(`✅ Perfil creado exitosamente:`);
      console.log(`   Tier: ${newProfile.tier_code}`);
      console.log(`   Nombre: ${newProfile.display_name}`);
      console.log(`   Idioma: ${newProfile.preferred_language}\n`);
    }

    // 4. Verificar permisos del tier admin
    const { data: adminTier, error: tierError } = await supabase
      .from('user_tiers')
      .select('*')
      .eq('code', 'admin')
      .single();

    if (tierError) {
      throw new Error(`Error al verificar tier admin: ${tierError.message}`);
    }

    console.log(`🔐 Permisos del tier Admin:`);
    console.log(`   Puede traducir: ${adminTier.can_translate ? '✅' : '❌'}`);
    console.log(`   Puede revisar: ${adminTier.can_review ? '✅' : '❌'}`);
    console.log(`   Puede aprobar: ${adminTier.can_approve ? '✅' : '❌'}`);
    console.log(`   Límite ediciones/día: ${adminTier.max_edits_per_day || 'Sin límite'}\n`);

    console.log(`✨ ${email} ahora es ADMINISTRADOR del Compendio Arcano ✨\n`);

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

// Obtener email del argumento de línea de comandos
const email = process.argv[2];

if (!email) {
  console.error('❌ Error: Debes proporcionar un email como argumento');
  console.log('\nUso: node scripts/set-admin-user.mjs <email>\n');
  console.log('Ejemplo: node scripts/set-admin-user.mjs lesistern@gmail.com\n');
  process.exit(1);
}

// Ejecutar script
setAdminUser(email);
