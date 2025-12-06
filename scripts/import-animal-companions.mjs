/**
 * Script para importar compañeros animales desde JSON
 *
 * USO:
 * node scripts/import-animal-companions.mjs
 *
 * ESTRUCTURA DEL JSON:
 * {
 *   "animal_companions": [
 *     {
 *       "name": "Wolf",
 *       "name_es": "Lobo",
 *       "min_druid_level": 1,
 *       "min_ranger_level": 4,
 *       "size": "Medium",
 *       "hit_dice": "2d8+4",
 *       "speed": "50 ft.",
 *       "armor_class": 14,
 *       "base_attack": 1,
 *       "attack_primary": "Bite +3 melee (1d6+1)",
 *       "strength": 13,
 *       "dexterity": 15,
 *       "constitution": 15,
 *       "intelligence": 2,
 *       "wisdom": 12,
 *       "charisma": 6,
 *       "fort_save": 5,
 *       "ref_save": 5,
 *       "will_save": 1,
 *       "special_qualities": "Low-light vision, scent",
 *       "skills": "Hide +2, Listen +3, Move Silently +3, Spot +3, Survival +1",
 *       "feats": "Track, Weapon Focus (bite)"
 *     }
 *   ]
 * }
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
const INPUT_FILE = join(__dirname, '../data/animal-companions-to-import.json');

/**
 * Genera un slug a partir del nombre
 */
function generateSlug(name) {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Valida y normaliza los datos de un compañero animal
 */
function normalizeCompanionData(raw) {
    if (!raw.name && !raw.nombre) {
        throw new Error('name o nombre es requerido');
    }

    const name = raw.name || raw.nombre;

    return {
        name: name,
        name_es: raw.name_es || raw.nombre_es || null,
        slug: raw.slug || generateSlug(name),

        // Requisitos de nivel
        min_druid_level: parseInt(raw.min_druid_level || raw.nivel_druida_min) || 1,
        min_ranger_level: raw.min_ranger_level !== undefined || raw.nivel_explorador_min !== undefined
            ? parseInt(raw.min_ranger_level || raw.nivel_explorador_min) || null
            : null,

        // Tamaño (validar valores permitidos)
        size: ['Tiny', 'Small', 'Medium', 'Large'].includes(raw.size || raw.tamano)
            ? (raw.size || raw.tamano)
            : 'Medium',

        // Estadísticas base
        hit_dice: raw.hit_dice || raw.dados_golpe || '1d8',
        speed: raw.speed || raw.velocidad || '30 ft.',
        armor_class: parseInt(raw.armor_class || raw.clase_armadura) || 10,
        base_attack: parseInt(raw.base_attack || raw.ataque_base) || 0,

        // Ataques
        attack_primary: raw.attack_primary || raw.ataque_primario || null,
        attack_secondary: raw.attack_secondary || raw.ataque_secundario || null,
        full_attack: raw.full_attack || raw.ataque_completo || null,

        // Atributos
        strength: parseInt(raw.strength || raw.fuerza) || 10,
        dexterity: parseInt(raw.dexterity || raw.destreza) || 10,
        constitution: parseInt(raw.constitution || raw.constitucion) || 10,
        intelligence: parseInt(raw.intelligence || raw.inteligencia) || 2,
        wisdom: parseInt(raw.wisdom || raw.sabiduria) || 10,
        charisma: parseInt(raw.charisma || raw.carisma) || 6,

        // Salvaciones
        fort_save: parseInt(raw.fort_save || raw.fortaleza) || 0,
        ref_save: parseInt(raw.ref_save || raw.reflejos) || 0,
        will_save: parseInt(raw.will_save || raw.voluntad) || 0,

        // Habilidades especiales
        special_qualities: raw.special_qualities || raw.cualidades_especiales || null,
        skills: raw.skills || raw.habilidades || null,
        feats: raw.feats || raw.dotes || null,

        // Descripción
        description: raw.description || raw.descripcion || null,
        description_es: raw.description_es || raw.descripcion_es || null,

        // Fuente
        source_book: raw.source_book || raw.libro_fuente || 'Player\'s Handbook'
    };
}

/**
 * Importa los compañeros animales a Supabase
 */
async function importCompanions() {
    console.log('🐾 Iniciando importación de compañeros animales...\n');

    // Verificar que existe el archivo
    if (!existsSync(INPUT_FILE)) {
        console.error(`❌ No se encontró el archivo: ${INPUT_FILE}`);
        console.log('\n📝 Crea el archivo con el siguiente formato:');
        console.log(`
{
  "animal_companions": [
    {
      "name": "Wolf",
      "name_es": "Lobo",
      "min_druid_level": 1,
      "min_ranger_level": 4,
      "size": "Medium",
      "hit_dice": "2d8+4",
      "speed": "50 ft.",
      "armor_class": 14,
      "base_attack": 1,
      "attack_primary": "Bite +3 melee (1d6+1)",
      "strength": 13,
      "dexterity": 15,
      "constitution": 15,
      "intelligence": 2,
      "wisdom": 12,
      "charisma": 6,
      "fort_save": 5,
      "ref_save": 5,
      "will_save": 1,
      "special_qualities": "Low-light vision, scent",
      "skills": "Hide +2, Listen +3",
      "feats": "Track"
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

    const companions = data.animal_companions || data;

    if (!Array.isArray(companions)) {
        console.error('❌ El archivo debe contener un array de compañeros animales');
        process.exit(1);
    }

    console.log(`📦 Encontrados ${companions.length} compañeros animales para importar\n`);

    let imported = 0;
    let updated = 0;
    let errors = 0;

    for (const raw of companions) {
        try {
            const companionData = normalizeCompanionData(raw);
            console.log(`🐺 Procesando: ${companionData.name} (${companionData.slug})`);

            // Verificar si ya existe
            const { data: existing } = await supabase
                .from('animal_companions')
                .select('id')
                .eq('slug', companionData.slug)
                .single();

            if (existing) {
                // Actualizar existente
                const { error } = await supabase
                    .from('animal_companions')
                    .update(companionData)
                    .eq('slug', companionData.slug);

                if (error) throw error;
                console.log(`   ✅ Actualizado`);
                updated++;
            } else {
                // Insertar nuevo
                const { error } = await supabase
                    .from('animal_companions')
                    .insert(companionData);

                if (error) throw error;
                console.log(`   ✅ Insertado`);
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
    console.log(`✅ Insertados: ${imported}`);
    console.log(`🔄 Actualizados: ${updated}`);
    console.log(`❌ Errores: ${errors}`);
    console.log(`📦 Total procesados: ${companions.length}`);
}

// Ejecutar
importCompanions().catch(console.error);
