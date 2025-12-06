import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const filePath = path.join(process.cwd(), 'recursos', 'Textos', 'Reglas', 'Alineamiento y descripcion.md');

async function run() {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    const ruleData = {
      slug: 'alineamiento-descripcion-es',
      title: 'Alineamiento y Descripción (ES)',
      category: 'character-creation',
      description: 'Versión en español: reglas sobre alineamientos, edad, altura y peso de los personajes.',
      content: content,
      display_order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('rules_content')
      .upsert(ruleData, { onConflict: 'slug' })
      .select();

    if (error) {
      console.error('Upsert error:', error.message || error);
      process.exit(1);
    }

    console.log('✅ Upserted Spanish rule as slug="alineamiento-descripcion-es"');
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

run();
