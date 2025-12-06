require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyClasses() {
    console.log('Verificando clases en Supabase...\n');

    const { data, error } = await supabase
        .from('classes')
        .select('id, slug, titulo')
        .order('slug');

    if (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }

    if (!data || data.length === 0) {
        console.log('❌ No hay clases en la tabla `classes`');
        process.exit(1);
    }

    console.log(`✅ Se encontraron ${data.length} clases:\n`);
    data.forEach(cls => {
        console.log(`   - ${cls.slug} (ID: ${cls.id})`);
    });
}

verifyClasses();
