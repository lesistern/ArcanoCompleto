require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing Supabase environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
    const { count: featsCount, error: featsError } = await supabase.from('feats').select('*', { count: 'exact', head: true });
    if (featsError) console.error('Feats Error:', featsError.message);
    else console.log(`Feats count: ${featsCount}`);

    const { count: racesCount, error: racesError } = await supabase.from('races').select('*', { count: 'exact', head: true });
    if (racesError) console.error('Races Error:', racesError.message);
    else console.log(`Races count: ${racesCount}`);

    const { count: classesCount, error: classesError } = await supabase.from('classes').select('*', { count: 'exact', head: true });
    if (classesError) console.error('Classes Error:', classesError.message);
    else console.log(`Classes count: ${classesCount}`);

    // Test Upsert
    const testData = {
        slug: 'test-class',
        name: 'Test Class',
        hit_die: 'd8',
        skill_points_per_level: 2,
        source_book: 'Test'
    };
    const { error: upsertError } = await supabase.from('classes').upsert(testData, { onConflict: 'slug' });
    if (upsertError) console.error('Upsert Test Error:', upsertError.message);
    else console.log('Upsert Test Success');
}

verify();
