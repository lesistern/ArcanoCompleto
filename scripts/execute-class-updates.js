require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const BASE_DIR_CLASSES = path.join(__dirname, '../recursos/Textos/Clases');

const CLASS_SLUG_MAP = {
    'Barbarian': 'barbaro',
    'Bard': 'bardo',
    'Cleric': 'clerigo',
    'Druid': 'druida',
    'Fighter': 'guerrero',
    'Monk': 'monje',
    'Paladin': 'paladin',
    'Ranger': 'explorador',
    'Rogue': 'picaro',
    'Sorcerer': 'hechicero',
    'Wizard': 'mago'
};

async function updateClass(name, slug) {
    console.log(`\nUpdating ${name} (${slug})...`);

    const filePath = path.join(BASE_DIR_CLASSES, `${name}.md`);
    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        return false;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract Hit Die
    let hit_die = 'd8';
    const hdMatch = content.match(/Hit Die\s*:?\s*(d\d+)/i);
    if (hdMatch) hit_die = hdMatch[1];

    // Extract Skill Points
    let skill_points = 2;
    const spMatch = content.match(/Skill Points at 1st Level\s*:?\s*\(?(\ d+)/i);
    if (spMatch) skill_points = parseInt(spMatch[1]);

    try {
        const { data, error } = await supabase
            .from('classes')
            .update({
                description: content,
                hit_die: hit_die,
                skill_points_per_level: skill_points,
                updated_at: new Date().toISOString()
            })
            .eq('slug', slug);

        if (error) {
            console.error(`❌ Error updating ${name}:`, error.message);
            return false;
        }

        console.log(`✅ Successfully updated ${name}`);
        return true;
    } catch (err) {
        console.error(`❌ Exception updating ${name}:`, err.message);
        return false;
    }
}

async function main() {
    console.log('Starting class updates...\n');

    let successCount = 0;
    let failCount = 0;

    for (const [name, slug] of Object.entries(CLASS_SLUG_MAP)) {
        const success = await updateClass(name, slug);
        if (success) {
            successCount++;
        } else {
            failCount++;
        }

        // Small delay between updates
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log(`\n=== Summary ===`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`Total: ${Object.keys(CLASS_SLUG_MAP).length}`);
}

main();
