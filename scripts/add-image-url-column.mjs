/**
 * Script para agregar columna image_url a la tabla deities
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

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

async function addImageUrlColumn() {
  console.log('🔧 Agregando columna image_url a tabla deities...\n');

  const sql = `
    -- Agregar columna image_url si no existe
    ALTER TABLE public.deities
    ADD COLUMN IF NOT EXISTS image_url TEXT;

    -- Crear índice para búsquedas por imagen
    CREATE INDEX IF NOT EXISTS idx_deities_image_url ON public.deities(image_url)
    WHERE image_url IS NOT NULL;
  `;

  try {
    const { data, error } = await supabase.rpc('exec_sql', { query: sql });

    if (error) {
      console.error('❌ Error ejecutando SQL:', error);
      return false;
    }

    console.log('✅ Columna image_url agregada exitosamente');
    console.log('✅ Índice idx_deities_image_url creado');

    // Verificar
    const { data: verification, error: verifyError } = await supabase
      .from('deities')
      .select('slug, name_es, image_url')
      .limit(3);

    if (verifyError) {
      console.error('⚠️  Error en verificación:', verifyError);
    } else {
      console.log('\n📊 Verificación - Sample de deidades:');
      verification.forEach(d => {
        console.log(`   - ${d.name_es}: ${d.image_url || '(sin imagen)'}`);
      });
    }

    return true;
  } catch (err) {
    console.error('❌ Error:', err.message);
    return false;
  }
}

// Ejecutar
addImageUrlColumn()
  .then(success => {
    if (success) {
      console.log('\n✅ Script completado exitosamente');
      console.log('📝 Siguiente paso: Ejecutar scripts/update-deity-images.mjs');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('❌ Error fatal:', err);
    process.exit(1);
  });
