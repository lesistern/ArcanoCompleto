require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getClassExample() {
    console.log('=== Ejemplo de clase: Barbaro ===\n');

    const { data, error } = await supabase
        .from('classes')
        .select('weapon_proficiencies, armor_proficiencies, class_skills')
        .eq('slug', 'barbaro')
        .single();

    if (error) {
        console.error('❌ Error:', error.message);
        return;
    }

    console.log('weapon_proficiencies:');
    console.log(JSON.stringify(data.weapon_proficiencies, null, 2));
    console.log('\narmor_proficiencies:');
    console.log(JSON.stringify(data.armor_proficiencies, null, 2));
    console.log('\nclass_skills:');
    console.log(JSON.stringify(data.class_skills, null, 2));
}

getClassExample();
