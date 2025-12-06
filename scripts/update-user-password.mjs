/**
 * Script para actualizar contraseña de un usuario
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Faltan variables de entorno');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Usuario y contraseña
const USER_EMAIL = 'damecroftgames@gmail.com';
const NEW_PASSWORD = 'K7mX9#pQ2wR5nL';

async function updatePassword() {
  console.log(`🔄 Actualizando contraseña para: ${USER_EMAIL}\n`);

  // 1. Obtener el usuario por email
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) {
    console.error('❌ Error listando usuarios:', listError.message);
    return;
  }

  const user = users.find(u => u.email === USER_EMAIL);

  if (!user) {
    console.error(`❌ Usuario no encontrado: ${USER_EMAIL}`);
    return;
  }

  console.log(`✓ Usuario encontrado (ID: ${user.id})`);

  // 2. Actualizar contraseña
  const { data, error } = await supabase.auth.admin.updateUserById(
    user.id,
    { password: NEW_PASSWORD }
  );

  if (error) {
    console.error('❌ Error actualizando contraseña:', error.message);
    return;
  }

  console.log('✓ Contraseña actualizada exitosamente\n');
  console.log('📋 CREDENCIALES ACTUALIZADAS:');
  console.log('='.repeat(50));
  console.log(`Email:      ${USER_EMAIL}`);
  console.log(`Contraseña: ${NEW_PASSWORD}`);
  console.log('='.repeat(50));
  console.log('\n✅ Proceso completado');
}

updatePassword().catch(console.error);
