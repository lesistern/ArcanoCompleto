import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local (project root)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Mapping of markdown files to rule entries
const rulesFiles = [
    {
        filename: 'Alineamiento y descripcion.md',
        slug: 'alineamiento-descripcion',
        title: 'Alineamiento y Descripción',
        category: 'character-creation',
        description: 'Reglas sobre alineamientos, edad, altura y peso de los personajes.',
        order: 1,
    },
    {
        filename: 'Razas.md',
        slug: 'razas',
        title: 'Razas',
        category: 'character-creation',
        description: 'Listado completo de razas jugables y sus características.',
        order: 2,
    },
    {
        filename: 'Dioses.md',
        slug: 'dioses',
        title: 'Dioses y Deidades',
        category: 'setting',
        description: 'Panteón completo de deidades de D&D 3.5.',
        order: 3,
    },
    {
        filename: 'Monstruos como raza.md',
        slug: 'monstruos-como-raza',
        title: 'Monstruos como Raza',
        category: 'character-creation',
        description: 'Reglas para jugar monstruos como personajes jugadores.',
        order: 4,
    },
    {
        filename: 'carrying movement and exploration.md',
        slug: 'carga-movimiento-exploracion',
        title: 'Carga, Movimiento y Exploración',
        category: 'gameplay',
        description: 'Reglas de capacidad de carga, movimiento táctico y exploración.',
        order: 5,
    },
];

const rulesBasePath = path.join(__dirname, 'recursos', 'Textos', 'Reglas');

async function importRulesContent() {
    console.log('Starting rules content import...\n');

    for (const rule of rulesFiles) {
        const filePath = path.join(rulesBasePath, rule.filename);
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            if (!content || content.trim().length === 0) {
                console.log(`⚠️  Skipping ${rule.filename} - empty file`);
                continue;
            }
            const ruleData = {
                slug: rule.slug,
                title: rule.title,
                category: rule.category,
                description: rule.description,
                content: content,
                display_order: rule.order,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            const { data, error } = await supabase
                .from('rules_content')
                .upsert(ruleData, { onConflict: 'slug' })
                .select();
            if (error) {
                console.error(`❌ Error importing ${rule.filename}:`, error.message);
            } else {
                console.log(`✅ Successfully imported: ${rule.title}`);
            }
        } catch (err) {
            console.error(`❌ Error reading ${rule.filename}:`, err.message);
        }
    }
    console.log('\n✨ Import complete!');
}

importRulesContent();
