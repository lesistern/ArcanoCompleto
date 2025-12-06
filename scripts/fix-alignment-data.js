require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Datos correctos de alineamiento por clase
const alignmentData = {
    'barbarian': {
        short: 'Cualquier no legal',
        long: null,
        tendency: null
    },
    'bard': {
        short: 'Cualquier alineamiento',
        long: null,
        tendency: null
    },
    'cleric': {
        short: 'Depende de la deidad',
        long: null,
        tendency: null
    },
    'druid': {
        short: 'Neutral obligatorio',
        long: null,
        tendency: null
    },
    'fighter': {
        short: 'Cualquier alineamiento',
        long: null,
        tendency: null
    },
    'monk': {
        short: 'Legal obligatorio',
        long: null,
        tendency: null
    },
    'paladin': {
        short: 'Legal bueno obligatorio',
        long: null,
        tendency: null
    },
    'ranger': {
        short: 'Cualquier alineamiento',
        long: null,
        tendency: null
    },
    'rogue': {
        short: 'Cualquier alineamiento',
        long: null,
        tendency: null
    },
    'sorcerer': {
        short: 'Cualquier alineamiento',
        long: null,
        tendency: null
    },
    'wizard': {
        short: 'Cualquier alineamiento',
        long: null,
        tendency: null
    }
};

async function fixAlignmentData() {
    console.log('\n✏️  Corrigiendo datos de alineamiento...\n');

    for (const [slug, alignmentInfo] of Object.entries(alignmentData)) {
        const { data: classData } = await supabase
            .from('classes')
            .select('id')
            .eq('slug', slug)
            .single();

        if (!classData) {
            console.log(`❌ ${slug}: Clase no encontrada`);
            continue;
        }

        const { error } = await supabase
            .from('class_fluff')
            .update({
                alignment_short: alignmentInfo.short,
                alignment_long: alignmentInfo.long,
                alignment_tendency: alignmentInfo.tendency
            })
            .eq('class_id', classData.id)
            .select();

        if (error) {
            console.log(`❌ ${slug}: ${error.message}`);
        } else {
            console.log(`✅ ${slug}: ${alignmentInfo.short}`);
        }
    }

    console.log('\n✨ Alineamientos corregidos\n');
}

fixAlignmentData().catch(console.error);
