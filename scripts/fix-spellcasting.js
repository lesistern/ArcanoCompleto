require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixSpellcasting() {
    console.log('\n⚡ Corrigiendo campo spellcasting en clases\n');

    const classesWithSpellcasting = {
        'bard': 'si',
        'cleric': 'si',
        'druid': 'si',
        'paladin': 'si',
        'ranger': 'si',
        'sorcerer': 'si',
        'wizard': 'si'
    };

    for (const [slug, spellcasting] of Object.entries(classesWithSpellcasting)) {
        const { data, error } = await supabase
            .from('classes')
            .update({ spellcasting })
            .eq('slug', slug)
            .select();

        if (error) {
            console.log(`❌ ${slug}: ${error.message}`);
        } else {
            console.log(`✅ ${slug}: spellcasting = "${spellcasting}"`);
        }
    }

    console.log('\n✨ Actualización completada\n');
}

fixSpellcasting().catch(console.error);
