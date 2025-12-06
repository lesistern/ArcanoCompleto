require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkClasses() {
    console.log('=== Clases en Supabase ===\n');

    const { data, error } = await supabase
        .from('classes')
        .select('slug, name')
        .order('slug');

    if (error) {
        console.error('❌ Error:', error.message);
        return;
    }

    console.log(`Total de clases: ${data.length}\n`);

    data.forEach(cls => {
        console.log(`${cls.slug.padEnd(25)} - ${cls.name}`);
    });
}

checkClasses();
