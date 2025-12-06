/**
 * Script para importar características de clases desde JSON a Supabase
 *
 * Uso:
 *   node scripts/import-class-features.mjs
 *   node scripts/import-class-features.mjs ruta/a/features.json
 *
 * El archivo JSON debe tener la estructura:
 * {
 *   "class_features": [
 *     {
 *       "class_slug": "barbarian",
 *       "level": 1,
 *       "title": "Ira",
 *       "summary": "Entra en frenesí de combate 1/día",
 *       "full_description": "Descripción completa de la habilidad..."
 *     }
 *   ]
 * }
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://akcuvlanpqpoizconuhm.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error('❌ Error: Se requiere SUPABASE_SERVICE_ROLE_KEY o NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Mapeo de nombres de columnas (español → inglés/DB)
const columnMap = {
  // Español
  'clase': 'class_slug',
  'slug_clase': 'class_slug',
  'nivel': 'level',
  'titulo': 'title',
  'nombre': 'title',
  'resumen': 'summary',
  'descripcion_corta': 'summary',
  'descripcion': 'full_description',
  'descripcion_larga': 'full_description',
  'descripcion_completa': 'full_description',

  // Inglés
  'class_slug': 'class_slug',
  'class': 'class_slug',
  'level': 'level',
  'title': 'title',
  'name': 'title',
  'summary': 'summary',
  'short_description': 'summary',
  'description': 'full_description',
  'full_description': 'full_description',
  'long_description': 'full_description'
};

/**
 * Normaliza un objeto de característica al formato de la BD
 */
function normalizeFeature(feature) {
  const normalized = {};

  for (const [key, value] of Object.entries(feature)) {
    // Ignorar campos de comentario
    if (key.startsWith('_')) continue;

    const normalizedKey = columnMap[key.toLowerCase()] || key.toLowerCase();

    if (['class_slug', 'level', 'title', 'summary', 'full_description'].includes(normalizedKey)) {
      normalized[normalizedKey] = value;
    }
  }

  // Validaciones
  if (!normalized.class_slug) {
    console.warn('⚠️  Característica sin class_slug, omitiendo:', feature);
    return null;
  }

  if (!normalized.level && normalized.level !== 0) {
    console.warn('⚠️  Característica sin level, omitiendo:', feature);
    return null;
  }

  if (!normalized.title) {
    console.warn('⚠️  Característica sin title, omitiendo:', feature);
    return null;
  }

  // Asegurar que level sea número
  normalized.level = parseInt(normalized.level, 10);

  // Limpiar strings
  normalized.class_slug = String(normalized.class_slug).toLowerCase().trim();
  normalized.title = String(normalized.title).trim();

  if (normalized.summary) {
    normalized.summary = String(normalized.summary).trim();
  }

  if (normalized.full_description) {
    normalized.full_description = String(normalized.full_description).trim();
  }

  return normalized;
}

/**
 * Importa características desde un archivo JSON
 */
async function importFeatures(jsonFilePath) {
  console.log('\n📚 Importador de Características de Clases D&D 3.5');
  console.log('================================================\n');

  // Determinar ruta del archivo
  const defaultPath = path.join(__dirname, '../data/class-features-to-import.json');
  const filePath = jsonFilePath || defaultPath;

  console.log(`📂 Buscando archivo: ${filePath}`);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Archivo no encontrado: ${filePath}`);
    console.log('\n💡 Crea un archivo JSON con la estructura:');
    console.log(`{
  "class_features": [
    {
      "class_slug": "barbarian",
      "level": 1,
      "title": "Ira",
      "summary": "Entra en frenesí de combate 1/día",
      "full_description": "Descripción completa..."
    }
  ]
}`);
    process.exit(1);
  }

  // Leer archivo JSON
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(rawData);

  // Extraer array de características
  const features = data.class_features || data.features || data;

  if (!Array.isArray(features)) {
    console.error('❌ El archivo debe contener un array de características');
    process.exit(1);
  }

  console.log(`📊 Encontradas ${features.length} características para importar\n`);

  // Verificar que las clases existan
  const classSlugs = [...new Set(features.map(f => f.class_slug || f.clase || f.slug_clase).filter(Boolean))];
  console.log(`🔍 Verificando clases: ${classSlugs.join(', ')}`);

  const { data: existingClasses, error: classError } = await supabase
    .from('classes')
    .select('slug')
    .in('slug', classSlugs);

  if (classError) {
    console.error('❌ Error verificando clases:', classError.message);
  } else {
    const existingSlugs = existingClasses.map(c => c.slug);
    const missingSlugs = classSlugs.filter(s => !existingSlugs.includes(s));

    if (missingSlugs.length > 0) {
      console.warn(`⚠️  Clases no encontradas: ${missingSlugs.join(', ')}`);
      console.warn('   Las características de estas clases se omitirán.\n');
    }
  }

  // Normalizar y filtrar características
  const normalizedFeatures = features
    .map(normalizeFeature)
    .filter(f => f !== null);

  console.log(`✅ ${normalizedFeatures.length} características válidas para importar\n`);

  if (normalizedFeatures.length === 0) {
    console.log('ℹ️  No hay características válidas para importar.');
    return;
  }

  // Agrupar por clase para mostrar progreso
  const byClass = {};
  for (const feature of normalizedFeatures) {
    if (!byClass[feature.class_slug]) {
      byClass[feature.class_slug] = [];
    }
    byClass[feature.class_slug].push(feature);
  }

  // Importar características
  let successCount = 0;
  let errorCount = 0;

  for (const [classSlug, classFeatures] of Object.entries(byClass)) {
    console.log(`\n📖 Importando ${classFeatures.length} características de ${classSlug}...`);

    for (const feature of classFeatures) {
      const { error } = await supabase
        .from('class_features')
        .upsert(feature, {
          onConflict: 'class_slug,title,level',
          ignoreDuplicates: false
        });

      if (error) {
        console.error(`   ❌ Error en "${feature.title}" (nivel ${feature.level}):`, error.message);
        errorCount++;
      } else {
        console.log(`   ✅ ${feature.title} (nivel ${feature.level})`);
        successCount++;
      }
    }
  }

  // Resumen final
  console.log('\n================================================');
  console.log('📊 RESUMEN DE IMPORTACIÓN');
  console.log('================================================');
  console.log(`✅ Importadas correctamente: ${successCount}`);
  console.log(`❌ Errores: ${errorCount}`);
  console.log(`📊 Total procesadas: ${normalizedFeatures.length}`);

  // Mostrar estadísticas actuales
  const { data: stats, error: statsError } = await supabase
    .from('class_features')
    .select('class_slug')
    .then(result => {
      if (result.error) return { data: null, error: result.error };

      const counts = {};
      for (const row of result.data) {
        counts[row.class_slug] = (counts[row.class_slug] || 0) + 1;
      }
      return { data: counts, error: null };
    });

  if (!statsError && stats) {
    console.log('\n📈 Características por clase en la BD:');
    for (const [slug, count] of Object.entries(stats).sort((a, b) => b[1] - a[1])) {
      console.log(`   ${slug}: ${count} características`);
    }
  }
}

// Ejecutar
const jsonFile = process.argv[2];
importFeatures(jsonFile).catch(console.error);
