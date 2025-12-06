/**
 * Script para eliminar el duplicado de Heironeus/Heironeous
 * Mantiene: Heironeous (slug: heironeous) - con imagen
 * Elimina: Heironeus (slug: heironeus) - sin imagen
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Variables de entorno no configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixDuplicate() {
  console.log('🔧 Eliminando duplicado de Heironeus...\n');

  // ID del registro a eliminar (Heironeus SIN imagen)
  const idToDelete = 'c73a9867-5b63-4384-a907-b14cc58eb24e';

  // ID del registro a mantener (Heironeous CON imagen)
  const idToKeep = '84f9d596-1eff-4e47-bd29-0247646a28f8';

  console.log('📋 Registro a mantener:');
  console.log('   Slug: heironeous');
  console.log('   Name: Heironeous (correcto según D&D 3.5)');
  console.log('   Image: /images/deities/Heironeus-removebg-preview.webp');
  console.log('   ID:', idToKeep);
  console.log('');

  console.log('❌ Registro a eliminar:');
  console.log('   Slug: heironeus');
  console.log('   Name: Heironeus (typo)');
  console.log('   Image: (sin imagen)');
  console.log('   ID:', idToDelete);
  console.log('');

  // Primero verificar si hay relaciones en deity_domains
  const { data: domains, error: domainsError } = await supabase
    .from('deity_domains')
    .select('*')
    .eq('deity_id', idToDelete);

  if (domainsError) {
    console.error('❌ Error verificando dominios:', domainsError);
    return false;
  }

  if (domains && domains.length > 0) {
    console.log(`⚠️  El registro a eliminar tiene ${domains.length} dominios asociados.`);
    console.log('   Esto es esperado, se eliminarán en cascada por el ON DELETE CASCADE.\n');
  }

  // Eliminar el registro duplicado
  console.log('🗑️  Eliminando registro duplicado...');

  const { error: deleteError } = await supabase
    .from('deities')
    .delete()
    .eq('id', idToDelete);

  if (deleteError) {
    console.error('❌ Error eliminando registro:', deleteError);
    return false;
  }

  console.log('✅ Registro eliminado exitosamente!');
  console.log('');

  // Verificar que solo queda un registro
  const { data: remaining, error: checkError } = await supabase
    .from('deities')
    .select('slug, name_es, image_url')
    .or('slug.eq.heironeus,slug.eq.heironeous');

  if (checkError) {
    console.error('❌ Error verificando:', checkError);
    return false;
  }

  console.log('📊 Verificación final:');
  console.log(`   Registros restantes: ${remaining.length}`);

  if (remaining.length === 1) {
    console.log('   ✅ Slug:', remaining[0].slug);
    console.log('   ✅ Name:', remaining[0].name_es);
    console.log('   ✅ Image:', remaining[0].image_url || '(sin imagen)');
    console.log('');
    console.log('🎉 Duplicado eliminado correctamente!');
    console.log('   Heironeous es ahora la única deidad con ese nombre.');
    return true;
  } else {
    console.log('⚠️  Advertencia: Se esperaba 1 registro, pero hay', remaining.length);
    return false;
  }
}

// Ejecutar
fixDuplicate()
  .then(success => {
    if (success) {
      console.log('\n✅ Script completado exitosamente');
      console.log('📝 Próximo paso: Verificar en frontend /reglas/contenido/dioses');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('❌ Error fatal:', err);
    process.exit(1);
  });
