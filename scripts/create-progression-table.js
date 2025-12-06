require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createTable() {
    console.log('\n📊 Creando tabla class_progression...\n');

    // Just create the table without DROP to be safe
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS public.class_progression (
          id BIGSERIAL PRIMARY KEY,
          class_slug TEXT NOT NULL REFERENCES public.classes(slug) ON DELETE CASCADE,
          level INTEGER NOT NULL CHECK (level >= 1 AND level <= 20),
          base_attack_bonus TEXT NOT NULL,
          fort_save INTEGER NOT NULL,
          ref_save INTEGER NOT NULL,
          will_save INTEGER NOT NULL,
          special_abilities TEXT,
          spells_per_day JSONB,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW(),
          UNIQUE(class_slug, level)
        );
    `;

    try {
        const { error } = await supabase.rpc('exec_sql', { sql_query: createTableSQL });
        
        if (error) {
            // Try with direct RPC call instead
            console.log('⚠️  RPC exec_sql no disponible, intentando con query directo...');
            
            // Supabase no permite ejecutar SQL directo desde cliente
            // Necesitamos ir al dashboard manualmente o usar script alternativo
            console.log('⚠️  Necesitas ejecutar este SQL manualmente en Supabase SQL Editor:');
            console.log(createTableSQL);
        } else {
            console.log('✅ Tabla creada exitosamente');
        }
    } catch (err) {
        console.log('⚠️  Error: ' + err.message);
        console.log('\n📋 Copia este SQL y ejecútalo en Supabase SQL Editor:');
        console.log(createTableSQL);
    }
}

createTable().catch(console.error);
