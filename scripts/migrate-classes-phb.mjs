#!/usr/bin/env node
/**
 * Migración de clases del Player's Handbook a Supabase
 * Usa los datos extraídos por parse-classes-improved.py
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno desde .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: Variables de entorno no configuradas');
  console.error('Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Cargar datos extraídos
const dataPath = path.join(__dirname, '../../scripts/data/phb/classes-improved.json');
const classesData = JSON.parse(await fs.readFile(dataPath, 'utf-8'));

/**
 * Mapeo de nombres de clase a slugs
 */
function classNameToSlug(name) {
  return name.toLowerCase();
}

/**
 * Encuentra el ID del libro "Player's Handbook"
 */
async function getPlayerHandbookId() {
  const { data, error } = await supabase
    .from('books')
    .select('id')
    .eq('slug', 'players-handbook')
    .single();

  if (error) {
    console.error('Error buscando Player\'s Handbook:', error);
    return null;
  }

  return data?.id;
}

/**
 * Inserta o actualiza una clase
 */
async function upsertClass(classData, bookId) {
  const slug = classNameToSlug(classData.name);

  // Preparar datos para inserción
  const classRecord = {
    slug: slug,
    name: classData.name,
    book_id: bookId,
    class_type: 'base', // Todas las clases del PHB son base
    hit_die: classData.hit_die,
    skill_points_per_level: classData.skill_points_per_level,
    alignment_restrictions: classData.alignment || null,
    bab_progression: classData.bab_progression ? classData.bab_progression.toLowerCase() : null,
    fort_save_progression: classData.fort_save_progression === 'Good' ? 'good' : 'poor',
    ref_save_progression: classData.ref_save_progression === 'Good' ? 'good' : 'poor',
    will_save_progression: classData.will_save_progression === 'Good' ? 'good' : 'poor',
    class_skills: classData.class_skills.length > 0 ? classData.class_skills : null,
    description: `The ${classData.name} is one of the eleven base classes from the Player's Handbook.`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // Intentar insertar
  const { data, error } = await supabase
    .from('classes')
    .upsert(classRecord, {
      onConflict: 'slug',
      ignoreDuplicates: false
    })
    .select();

  if (error) {
    console.error(`  ✗ Error insertando ${classData.name}:`, error.message);
    return false;
  }

  console.log(`  ✓ ${classData.name} insertado/actualizado`);
  return true;
}

/**
 * Inserta la tabla de progresión de una clase
 */
async function upsertClassProgression(classData, classId) {
  if (!classData.progression_data || classData.progression_data.length === 0) {
    console.log(`  → Sin tabla de progresión para ${classData.name}`);
    return true;
  }

  console.log(`  → Insertando ${classData.progression_data.length} niveles de progresión...`);

  // Eliminar progresión existente para esta clase
  await supabase
    .from('class_progression')
    .delete()
    .eq('class_id', classId);

  // Insertar cada nivel
  for (const level of classData.progression_data) {
    const progressionRecord = {
      class_id: classId,
      level: level.level,
      bab: level.bab,
      fort_save: parseInt(level.fort_save.replace('+', '')),
      ref_save: parseInt(level.ref_save.replace('+', '')),
      will_save: parseInt(level.will_save.replace('+', '')),
      special_features: level.special || null
    };

    const { error } = await supabase
      .from('class_progression')
      .insert(progressionRecord);

    if (error) {
      console.error(`  ✗ Error insertando nivel ${level.level}:`, error.message);
      return false;
    }
  }

  console.log(`  ✓ ${classData.progression_data.length} niveles insertados`);
  return true;
}

/**
 * Main
 */
async function main() {
  console.log('='.repeat(80));
  console.log('MIGRACIÓN DE CLASES DEL PLAYER\'S HANDBOOK');
  console.log('='.repeat(80));
  console.log();

  // Obtener ID del Player's Handbook
  console.log('Buscando Player\'s Handbook en la base de datos...');
  const bookId = await getPlayerHandbookId();

  if (!bookId) {
    console.error('ERROR: No se encontró el libro Player\'s Handbook');
    console.error('Ejecuta primero: node scripts/populate-books.mjs');
    process.exit(1);
  }

  console.log(`✓ Player's Handbook encontrado (ID: ${bookId})`);
  console.log();

  // Estadísticas
  let inserted = 0;
  let failed = 0;
  let withProgression = 0;

  console.log('Insertando clases...');
  console.log('-'.repeat(80));

  for (const [className, classData] of Object.entries(classesData)) {
    console.log(`\n${className}:`);

    // Validar que tenemos datos mínimos
    if (!classData.hit_die) {
      console.log(`  ✗ Sin Hit Die, omitiendo...`);
      failed++;
      continue;
    }

    // Insertar clase
    const success = await upsertClass(classData, bookId);

    if (success) {
      inserted++;

      // Obtener ID de la clase insertada
      const { data: insertedClass } = await supabase
        .from('classes')
        .select('id')
        .eq('slug', classNameToSlug(classData.name))
        .single();

      if (insertedClass && classData.total_levels_found > 0) {
        // Insertar progresión si existe
        const progressionSuccess = await upsertClassProgression(classData, insertedClass.id);
        if (progressionSuccess) {
          withProgression++;
        }
      }
    } else {
      failed++;
    }
  }

  console.log();
  console.log('='.repeat(80));
  console.log('RESUMEN');
  console.log('='.repeat(80));
  console.log();
  console.log(`Clases insertadas/actualizadas: ${inserted}`);
  console.log(`Clases con progresión: ${withProgression}`);
  console.log(`Errores: ${failed}`);
  console.log();

  if (inserted > 0) {
    console.log('✓ Migración completada exitosamente');
    console.log();
    console.log('Próximos pasos:');
    console.log('  1. Verificar clases en Supabase Dashboard');
    console.log('  2. Crear páginas /clases y /clases/[slug] en el frontend');
    console.log('  3. Extraer el resto del PHB (conjuros, dotes, armaduras)');
  } else {
    console.log('✗ No se insertaron clases');
  }

  console.log();
}

main().catch(console.error);
