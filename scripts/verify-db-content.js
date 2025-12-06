import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkContent() {
    const { data, error } = await supabase
        .from('rules_content')
        .select('content')
        .eq('slug', 'alineamiento-descripcion')
        .single();

    if (error) {
        console.error('Error fetching content:', error.message);
        return;
    }

    if (!data) {
        console.log('No data found for slug: alineamiento-descripcion');
        return;
    }

    console.log('Current Content Preview (first 200 chars):');
    console.log('-----------------------------------');
    console.log(data.content.substring(0, 200));
    console.log('-----------------------------------');
}

checkContent();
