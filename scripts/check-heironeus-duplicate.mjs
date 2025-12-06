/**
 * Script para verificar duplicados de Heironeus/Heironeous
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

async function checkDuplicates() {
  console.log('🔍 Buscando duplicados de Heironeus/Heironeous...\n');

  // Buscar todas las variantes posibles
  const { data, error } = await supabase
    .from('deities')
    .select('id, slug, name_es, name_en, image_url, rank')
    .or('slug.eq.heironeus,slug.eq.heironeous,name_es.ilike.%heironeous%,name_es.ilike.%heironeus%')
    .order('slug');

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`📊 Encontradas ${data.length} deidad(es):\n`);

  data.forEach((deity, idx) => {
    console.log(`${idx + 1}. ${deity.name_es}`);
    console.log(`   Slug: ${deity.slug}`);
    console.log(`   Name EN: ${deity.name_en}`);
    console.log(`   Rank: ${deity.rank}`);
    console.log(`   Image URL: ${deity.image_url || '(sin imagen)'}`);
    console.log(`   ID: ${deity.id}`);
    console.log('');
  });

  // Verificar si hay duplicados
  if (data.length > 1) {
    console.log('⚠️  SE DETECTÓ DUPLICACIÓN!');
    console.log('');
    console.log('Opciones:');
    console.log('1. Eliminar uno de los registros');
    console.log('2. Mergear los datos (mantener el mejor)');
    console.log('3. Renombrar uno de ellos');
  } else if (data.length === 1) {
    console.log('✅ No hay duplicados, solo un registro encontrado.');
  } else {
    console.log('❌ No se encontró ninguna deidad con ese nombre.');
  }
}

// Ejecutar
checkDuplicates()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Error fatal:', err);
    process.exit(1);
  });
