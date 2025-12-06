/**
 * Script para importar clases desde un archivo JSON
 *
 * USO:
 * 1. Crea un archivo JSON con tus clases (ver ejemplo en data/classes-template.json)
 * 2. Ejecuta: node scripts/import-classes-from-json.mjs
 *
 * También puedes convertir Excel a JSON usando:
 * - https://www.convertcsv.com/csv-to-json.htm
 * - O el script convert-excel-to-json.mjs incluido
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://akcuvlanpqpoizconuhm.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
    console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY no está configurada');
    console.log('Configura la variable de entorno o agrégala a .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Ruta al archivo JSON de entrada
const INPUT_FILE = join(__dirname, '../data/classes-to-import.json');

/**
 * Genera un slug a partir del título
 */
function generateSlug(title) {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Valida y normaliza los datos de una clase
 */
function normalizeClassData(rawClass) {
    const titulo = rawClass.titulo || rawClass.name || rawClass.nombre;

    if (!titulo) {
        throw new Error(`Clase sin título: ${JSON.stringify(rawClass)}`);
    }

    return {
        slug: rawClass.slug || generateSlug(titulo),
        titulo: titulo,
        subtitulo: rawClass.subtitulo || rawClass.short_description || '',
        descripcion: rawClass.descripcion || rawClass.description || '',
        hit_die: rawClass.hit_die || rawClass.dado_golpe || 'd8',
        skill_points: parseInt(rawClass.skill_points || rawClass.puntos_habilidad) || 2,
        bab_progression: rawClass.bab_progression || rawClass.bab || 'medium',
        fort_save: rawClass.fort_save || rawClass.fortaleza || 'poor',
        ref_save: rawClass.ref_save || rawClass.reflejos || 'poor',
        will_save: rawClass.will_save || rawClass.voluntad || 'poor',
        image_url: rawClass.image_url || rawClass.imagen || null,
        spell_type: rawClass.spell_type || rawClass.tipo_magia || null,
        spell_ability: rawClass.spell_ability || rawClass.habilidad_magia || null,
        // Arrays - soporta tanto strings separados por coma como arrays
        class_skills: parseArrayField(rawClass.class_skills || rawClass.habilidades_clase),
        weapon_proficiencies: parseArrayField(rawClass.weapon_proficiencies || rawClass.armas),
        armor_proficiencies: parseArrayField(rawClass.armor_proficiencies || rawClass.armaduras),
    };
}

/**
 * Parsea un campo que puede ser string (separado por comas) o array
 */
function parseArrayField(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
        return value.split(',').map(s => s.trim()).filter(s => s.length > 0);
    }
    return [];
}

/**
 * Importa las clases a Supabase
 */
async function importClasses() {
    console.log('🚀 Iniciando importación de clases...\n');

    // Verificar que existe el archivo
    if (!existsSync(INPUT_FILE)) {
        console.error(`❌ No se encontró el archivo: ${INPUT_FILE}`);
        console.log('\n📝 Crea el archivo con el siguiente formato:');
        console.log(`
{
  "classes": [
    {
      "titulo": "Bárbaro",
      "subtitulo": "Guerrero salvaje",
      "descripcion": "Un guerrero feroz...",
      "hit_die": "d12",
      "skill_points": 4,
      "bab_progression": "good",
      "fort_save": "good",
      "ref_save": "poor",
      "will_save": "poor",
      "class_skills": ["Trepar", "Saltar", "Nadar"],
      "weapon_proficiencies": ["Simples", "Marciales"],
      "armor_proficiencies": ["Ligeras", "Medias", "Escudos"]
    }
  ]
}
        `);
        process.exit(1);
    }

    // Leer el archivo JSON
    let data;
    try {
        const fileContent = readFileSync(INPUT_FILE, 'utf-8');
        data = JSON.parse(fileContent);
    } catch (error) {
        console.error(`❌ Error al leer el archivo JSON: ${error.message}`);
        process.exit(1);
    }

    const classes = data.classes || data;

    if (!Array.isArray(classes)) {
        console.error('❌ El archivo debe contener un array de clases (directamente o en la propiedad "classes")');
        process.exit(1);
    }

    console.log(`📦 Encontradas ${classes.length} clases para importar\n`);

    let imported = 0;
    let updated = 0;
    let errors = 0;

    for (const rawClass of classes) {
        try {
            const classData = normalizeClassData(rawClass);
            console.log(`📝 Procesando: ${classData.titulo} (${classData.slug})`);

            // Verificar si ya existe
            const { data: existing } = await supabase
                .from('classes')
                .select('id')
                .eq('slug', classData.slug)
                .single();

            if (existing) {
                // Actualizar existente
                const { error } = await supabase
                    .from('classes')
                    .update(classData)
                    .eq('slug', classData.slug);

                if (error) throw error;
                console.log(`   ✅ Actualizada`);
                updated++;
            } else {
                // Insertar nueva
                const { error } = await supabase
                    .from('classes')
                    .insert(classData);

                if (error) throw error;
                console.log(`   ✅ Insertada`);
                imported++;
            }
        } catch (error) {
            console.error(`   ❌ Error: ${error.message}`);
            errors++;
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 RESUMEN DE IMPORTACIÓN');
    console.log('='.repeat(50));
    console.log(`✅ Insertadas: ${imported}`);
    console.log(`🔄 Actualizadas: ${updated}`);
    console.log(`❌ Errores: ${errors}`);
    console.log(`📦 Total procesadas: ${classes.length}`);
}

// Ejecutar
importClasses().catch(console.error);
