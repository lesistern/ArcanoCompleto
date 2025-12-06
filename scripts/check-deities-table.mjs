import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Falta credenciales de Supabase');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDeities() {
    console.log('🔍 Verificando tabla deities en Supabase...\n');
    
    const { data, error, count } = await supabase
        .from('deities')
        .select('slug, name_es, name_en', { count: 'exact' })
        .order('slug');
    
    if (error) {
        console.error('❌ Error:', error.message);
        console.log('📝 Posible razón: La tabla no existe en Supabase');
        process.exit(1);
    }
    
    console.log(`✅ Total de deidades en Supabase: ${count}`);
    
    if (data && data.length > 0) {
        console.log('\nPrimeras 5 deidades:');
        data.slice(0, 5).forEach(d => {
            console.log(`  - ${d.slug}: ${d.name_es} (EN: ${d.name_en})`);
        });
    } else {
        console.log('⚠️  No hay deidades en la tabla');
    }
}

checkDeities().catch(console.error);
