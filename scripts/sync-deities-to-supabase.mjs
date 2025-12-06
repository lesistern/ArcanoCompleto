import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { initialDeities } from './src/lib/data/deities-initial.ts';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Falta credenciales de Supabase');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncDeities() {
    console.log('🔄 Sincronizando 38 deidades a Supabase...\n');
    
    // Convertir datos del archivo TypeScript al formato que espera Supabase
    const deities = initialDeities.map(deity => ({
        slug: deity.slug,
        name_en: deity.name_en,
        name_es: deity.name_es,
        rank: deity.rank,
        titles_en: deity.titles_en,
        titles_es: deity.titles_es,
        portfolio_en: deity.portfolio_en,
        portfolio_es: deity.portfolio_es,
        alignment: deity.alignment,
        domains: deity.domains,
        favored_weapon: deity.favored_weapon,
        symbol_en: deity.symbol_en,
        symbol_es: deity.symbol_es,
        worshipers_en: deity.worshipers_en,
        worshipers_es: deity.worshipers_es,
        home_plane_en: deity.home_plane_en,
        home_plane_es: deity.home_plane_es,
        description_en: deity.description_en,
        description_es: deity.description_es
    }));
    
    // Upsert (actualizar si existe, insertar si no)
    const { error } = await supabase
        .from('deities')
        .upsert(deities, { onConflict: 'slug' });
    
    if (error) {
        console.error('❌ Error al sincronizar:', error.message);
        process.exit(1);
    }
    
    console.log('✅ Sincronización completada exitosamente!');
    console.log(`📝 ${initialDeities.length} deidades actualizadas/insertadas`);
    console.log('\n✨ Todas las deidades ahora tienen datos completos en español y inglés');
}

syncDeities().catch(console.error);
