require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSchema() {
    console.log('Obteniendo una clase para ver el esquema...\n');

    const { data: barbarian, error } = await supabase
        .from('classes')
        .select('*')
        .eq('slug', 'barbarian')
        .single();

    if (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }

    console.log('Columnas en tabla classes:');
    console.log(JSON.stringify(barbarian, null, 2));
}

checkSchema();
