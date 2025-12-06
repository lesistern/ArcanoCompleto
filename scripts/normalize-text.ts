
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const TARGET_COLUMNS = [
    'nombre',
    'resumen_clase',
    'descripcion_poder',
    'motivacion_aventura',
    'rol_party',
    'origen_social',
    'tipo_organizacion',
    'enfoque_religioso',
    'deidades_tipicas',
    'razas_comunes',
    'regla_alineamiento',
    'tendencia_alineamiento',
    'tipo_magia',
    'estilo_conjuros'
];

// Function to convert text to sentence case (first letter of each sentence capitalized)
function toSentenceCase(text: string): string {
    if (!text) return text;
    const lower = text.toLowerCase();
    // Capitalize first char of string and any char following a sentence terminator (.!?)
    return lower.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
}

async function normalizeClasses() {
    console.log('Fetching classes...');
    const { data: classes, error } = await supabase.from('clases').select('*');

    if (error) {
        console.error('Error fetching classes:', error);
        return;
    }

    console.log(`Found ${classes.length} classes. Processing...`);

    for (const cls of classes) {
        const updates: Record<string, string> = {};
        let hasChanges = false;

        for (const col of TARGET_COLUMNS) {
            const original = cls[col];
            if (typeof original === 'string') {
                const normalized = toSentenceCase(original);
                if (original !== normalized) {
                    updates[col] = normalized;
                    hasChanges = true;
                    console.log(`[${cls.nombre}] ${col}: "${original}" -> "${normalized}"`);
                }
            }
        }

        if (hasChanges) {
            const { error: updateError } = await supabase
                .from('clases')
                .update(updates)
                .eq('id_clase', cls.id_clase);

            if (updateError) {
                console.error(`Error updating class ${cls.nombre}:`, updateError);
            } else {
                console.log(`Updated ${cls.nombre}`);
            }
        }
    }

    console.log('Normalization complete.');
}

normalizeClasses();
