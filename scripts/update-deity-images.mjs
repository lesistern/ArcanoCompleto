/**
 * Script para actualizar los image_url de deidades con las imágenes disponibles
 * Mapea slugs de deidades a archivos de imágenes en public/images/deities/
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
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Directorio de imágenes
const imagesDir = path.join(__dirname, '..', 'public', 'images', 'deities');

// Mapeo manual de slugs a nombres de archivos (para casos especiales)
const SLUG_TO_FILENAME = {
  'afflux': 'Afflux-removebg-preview.webp',
  'aasterinian': 'Aasterinian-removebg-preview.webp',
  'astilabor': 'Astilabor-removebg-preview.webp',
  'bahamut': 'Bahamut-removebg-preview.webp',
  'boccob': 'Boccob-removebg-preview.webp',
  'chronepsis': 'Chronepsis-removebg-preview.webp',
  'corellon-larethian': 'Corellon_Larethian-removebg-preview.webp',
  'doresain': 'Doresain-removebg-preview.webp',
  'ehlonna': 'Ehlonna-removebg-preview.webp',
  'erythnul': 'Erythnul-removebg-preview.webp',
  'evening-glory': 'Evening_Glory-removebg-preview.webp',
  'falazure': 'Falazure.webp',
  'fharlanghn': 'Fharlanghn-removebg-preview.webp',
  'garl-glittergold': 'Garl_Glittergold-removebg-preview.webp',
  'garyx': 'Garyx-removebg-preview.webp',
  'gruumsh': 'Gruumsh-removebg-preview.webp',
  'heironeous': 'Heironeus-removebg-preview.webp',
  'hextor': 'Hextor-removebg-preview.webp',
  'hlal': 'Hlal-removebg-preview.webp',
  'ilsensine': 'Ilsensine-removebg-preview.webp',
  'io': 'Io-removebg-preview.webp',
  'kord': 'Kord-removebg-preview.webp',
  'kurtulmak': 'Kurtulmak-removebg-preview.webp',
  'lendys': 'Lendys-removebg-preview.webp',
  'lolth': 'Lolth-removebg-preview.webp',
  'moradin': 'Moradin-removebg-preview.webp',
  'nerull': 'Nerull-removebg-preview.webp',
  'obad-hai': 'Obad-Hai-removebg-preview.webp',
  'olidammara': 'Olidammara-removebg-preview.webp',
  'orcus': 'Orcus-removebg-preview.webp',
  'pelor': 'Pelor-removebg-preview.webp',
  'st-cuthbert': 'St._Cuthbert-removebg-preview.webp',
  'tamara': 'Tamara-removebg-preview.webp',
  'tiamat': 'Tiamat-removebg-preview.webp',
  'vecna': 'Vecna-removebg-preview.webp',
  'wee-jas': 'Wee_Jas-removebg-preview.webp',
  'yondalla': 'Yondalla-removebg-preview.webp',
  'zuoken': 'Zuoken-removebg-preview.webp'
};

async function updateDeityImages() {
  console.log('🖼️  Actualizando imágenes de deidades...\n');

  // Obtener todas las deidades
  const { data: deities, error } = await supabase
    .from('deities')
    .select('id, slug, name_es, image_url');

  if (error) {
    console.error('❌ Error al obtener deidades:', error);
    return;
  }

  console.log(`📊 Total de deidades en BD: ${deities.length}\n`);

  let updated = 0;
  let skipped = 0;
  let notFound = 0;

  for (const deity of deities) {
    const filename = SLUG_TO_FILENAME[deity.slug];

    if (!filename) {
      console.log(`⏭️  ${deity.name_es} (${deity.slug}) - Sin mapeo de imagen`);
      notFound++;
      continue;
    }

    // Verificar que el archivo existe
    const imagePath = path.join(imagesDir, filename);
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  ${deity.name_es} - Archivo no encontrado: ${filename}`);
      notFound++;
      continue;
    }

    // Si ya tiene image_url, skip
    if (deity.image_url && deity.image_url.includes(filename.replace('-removebg-preview.webp', ''))) {
      console.log(`✓  ${deity.name_es} - Ya tiene imagen configurada`);
      skipped++;
      continue;
    }

    // Actualizar image_url
    const imageUrl = `/images/deities/${filename}`;
    const { error: updateError } = await supabase
      .from('deities')
      .update({ image_url: imageUrl })
      .eq('id', deity.id);

    if (updateError) {
      console.error(`❌ Error actualizando ${deity.name_es}:`, updateError);
    } else {
      console.log(`✅ ${deity.name_es} - Imagen actualizada: ${filename}`);
      updated++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Resumen de Actualización:');
  console.log('='.repeat(60));
  console.log(`✅ Actualizadas: ${updated}`);
  console.log(`⏭️  Ya configuradas: ${skipped}`);
  console.log(`❌ Sin imagen disponible: ${notFound}`);
  console.log(`📊 Total procesadas: ${deities.length}`);
  console.log('='.repeat(60));
}

// Ejecutar
updateDeityImages().catch(console.error);
