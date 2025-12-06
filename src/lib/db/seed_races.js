const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedRaces() {
    try {
        const racesPath = path.join(__dirname, '../../data/3.5/races.json');
        const racesData = JSON.parse(fs.readFileSync(racesPath, 'utf8'));

        console.log(`Found ${racesData.length} races to seed.`);

        const { data, error } = await supabase
            .from('races')
            .upsert(racesData.map(r => ({
                name: r.name,
                slug: r.slug,
                description: r.description,
                speed: r.speed,
                ability_bonuses: r.abilityModifiers, // Mapping to correct column name if needed, check schema
                traits: r.racialTraits,
                size: r.size,
                languages: r.languages.automatic, // Simplified for now
                srd: true,
            })), { onConflict: 'slug' })
            .select();

        if (error) {
            console.error('Error seeding races:', error);
        } else {
            console.log('Successfully seeded races:', data.length);
        }

    } catch (err) {
        console.error("Error reading or parsing races.json", err);
    }
}

seedRaces();
