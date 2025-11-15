#!/usr/bin/env node

/**
 * Script para migrar las 11 clases base del Player's Handbook a Supabase
 *
 * Este script:
 * 1. Lee el archivo classes-player-handbook.json
 * 2. Transforma los datos al formato de la tabla classes de Supabase
 * 3. Inserta las clases en la base de datos
 *
 * Uso: node scripts/migrate-classes.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Verificar variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Falta configurar NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

// Crear cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function migrateClasses() {
  console.log('🏛️  Iniciando migración de clases del Player\'s Handbook...\n');

  try {
    // Leer archivo JSON
    const classesPath = join(__dirname, '..', 'src', 'lib', 'data', '3.5', 'classes-player-handbook.json');
    const classesData = JSON.parse(readFileSync(classesPath, 'utf-8'));

    console.log(`📚 Clases encontradas: ${classesData.length}`);

    // Transformar datos para Supabase
    const classesForDb = classesData.map(classData => ({
      slug: classData.slug,
      name: classData.name,
      hit_die: classData.hit_die,
      skill_points_per_level: classData.skill_points_per_level,
      class_skills: classData.class_skills,
      weapon_proficiencies: classData.weapon_proficiencies,
      armor_proficiencies: classData.armor_proficiencies,
      bab_progression: classData.bab_progression,
      fortitude_save: classData.fortitude_save,
      reflex_save: classData.reflex_save,
      will_save: classData.will_save,
      spellcasting_ability: classData.spellcasting_ability,
      description: classData.description,
      role: classData.role,
      source_book: classData.source_book,
      source_page: classData.source_page,
      class_type: classData.class_type || 'base'
    }));

    // Insertar en Supabase con upsert (actualizar si existe, insertar si no)
    console.log('\n📝 Insertando clases en Supabase...\n');

    let successCount = 0;
    let errorCount = 0;

    for (const classInfo of classesForDb) {
      const { data, error } = await supabase
        .from('classes')
        .upsert(classInfo, {
          onConflict: 'slug',
          ignoreDuplicates: false
        })
        .select();

      if (error) {
        console.error(`❌ Error al insertar ${classInfo.name}:`, error.message);
        errorCount++;
      } else {
        console.log(`✅ ${classInfo.name} insertada correctamente`);
        successCount++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`📊 Resumen de migración:`);
    console.log(`   ✅ Exitosas: ${successCount}`);
    console.log(`   ❌ Errores: ${errorCount}`);
    console.log(`   📚 Total: ${classesData.length}`);
    console.log('='.repeat(60));

    if (successCount === classesData.length) {
      console.log('\n🎉 ¡Migración completada exitosamente!');

      // Verificar inserción
      const { data: verifyData, error: verifyError } = await supabase
        .from('classes')
        .select('name, hit_die, bab_progression, source_book')
        .eq('source_book', 'Player\'s Handbook')
        .order('name');

      if (!verifyError && verifyData) {
        console.log('\n📋 Clases en la base de datos:');
        verifyData.forEach(c => {
          console.log(`   • ${c.name} (${c.hit_die}, BAB: ${c.bab_progression})`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  }
}

// Ejecutar migración
migrateClasses();
