/**
 * Script para importar progresión de clases desde JSON
 * Incluye: niveles, conjuros por día, habilidades especiales, etc.
 *
 * USO:
 * node scripts/import-class-progression.mjs
 *
 * ESTRUCTURA DEL JSON:
 * {
 *   "class_progression": [
 *     {
 *       "class_slug": "wizard",
 *       "level": 1,
 *       "base_attack_bonus": "+0",
 *       "fort_save": 0,
 *       "ref_save": 0,
 *       "will_save": 2,
 *       "special_abilities": "Summon familiar, Scribe Scroll",
 *       "spells_per_day": {
 *         "0": 3, "1": 1, "2": null, "3": null, ...
 *       }
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
const INPUT_FILE = join(__dirname, '../data/class-progression-to-import.json');

/**
 * Normaliza los datos de conjuros por día
 * Convierte varios formatos a un objeto JSONB consistente
 */
function normalizeSpellsPerDay(spells) {
    if (!spells) return null;

    // Si ya es un objeto, limpiarlo
    if (typeof spells === 'object' && !Array.isArray(spells)) {
        const normalized = {};
        for (let i = 0; i <= 9; i++) {
            const key = i.toString();
            const value = spells[key] ?? spells[i];
            if (value !== null && value !== undefined && value !== '—' && value !== '-') {
                normalized[key] = typeof value === 'string' ? parseInt(value) || 0 : value;
            }
        }
        return Object.keys(normalized).length > 0 ? normalized : null;
    }

    // Si es un array, convertir a objeto
    if (Array.isArray(spells)) {
        const normalized = {};
        spells.forEach((value, index) => {
            if (value !== null && value !== '—' && value !== '-' && index <= 9) {
                normalized[index.toString()] = typeof value === 'string' ? parseInt(value) || 0 : value;
            }
        });
        return Object.keys(normalized).length > 0 ? normalized : null;
    }

    // Si es un string con formato "3|1|—|—|..."
    if (typeof spells === 'string') {
        const parts = spells.split('|').map(s => s.trim());
        const normalized = {};
        parts.forEach((value, index) => {
            if (value && value !== '—' && value !== '-' && index <= 9) {
                const num = parseInt(value);
                if (!isNaN(num)) {
                    normalized[index.toString()] = num;
                }
            }
        });
        return Object.keys(normalized).length > 0 ? normalized : null;
    }

    return null;
}

/**
 * Valida y normaliza los datos de progresión
 */
function normalizeProgressionData(raw) {
    if (!raw.class_slug || !raw.level) {
        throw new Error('class_slug y level son requeridos');
    }

    return {
        class_slug: raw.class_slug.toLowerCase(),
        level: parseInt(raw.level),
        base_attack_bonus: raw.base_attack_bonus || raw.bab || '+0',
        fort_save: parseInt(raw.fort_save ?? raw.fortaleza ?? 0),
        ref_save: parseInt(raw.ref_save ?? raw.reflejos ?? 0),
        will_save: parseInt(raw.will_save ?? raw.voluntad ?? 0),
        special_abilities: raw.special_abilities || raw.habilidades_especiales || '',
        spells_per_day: normalizeSpellsPerDay(raw.spells_per_day || raw.conjuros_por_dia)
    };
}

/**
 * Importa la progresión de clases a Supabase
 */
async function importProgression() {
    console.log('🚀 Iniciando importación de progresión de clases...\n');

    // Verificar que existe el archivo
    if (!existsSync(INPUT_FILE)) {
        console.error(`❌ No se encontró el archivo: ${INPUT_FILE}`);
        console.log('\n📝 Crea el archivo con el siguiente formato:');
        console.log(`
{
  "class_progression": [
    {
      "class_slug": "wizard",
      "level": 1,
      "base_attack_bonus": "+0",
      "fort_save": 0,
      "ref_save": 0,
      "will_save": 2,
      "special_abilities": "Summon familiar, Scribe Scroll",
      "spells_per_day": {"0": 3, "1": 1}
    },
    {
      "class_slug": "wizard",
      "level": 2,
      "base_attack_bonus": "+1",
      "fort_save": 0,
      "ref_save": 0,
      "will_save": 3,
      "spells_per_day": {"0": 4, "1": 2}
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

    const progressions = data.class_progression || data;

    if (!Array.isArray(progressions)) {
        console.error('❌ El archivo debe contener un array de progresiones');
        process.exit(1);
    }

    console.log(`📦 Encontradas ${progressions.length} entradas de progresión\n`);

    let imported = 0;
    let updated = 0;
    let errors = 0;

    for (const raw of progressions) {
        try {
            const progressionData = normalizeProgressionData(raw);
            console.log(`📝 Procesando: ${progressionData.class_slug} nivel ${progressionData.level}`);

            // Verificar si ya existe
            const { data: existing } = await supabase
                .from('class_progression')
                .select('id')
                .eq('class_slug', progressionData.class_slug)
                .eq('level', progressionData.level)
                .single();

            if (existing) {
                // Actualizar existente
                const { error } = await supabase
                    .from('class_progression')
                    .update(progressionData)
                    .eq('class_slug', progressionData.class_slug)
                    .eq('level', progressionData.level);

                if (error) throw error;
                console.log(`   ✅ Actualizada`);
                updated++;
            } else {
                // Insertar nueva
                const { error } = await supabase
                    .from('class_progression')
                    .insert(progressionData);

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
    console.log(`📦 Total procesadas: ${progressions.length}`);
}

// Ejecutar
importProgression().catch(console.error);
