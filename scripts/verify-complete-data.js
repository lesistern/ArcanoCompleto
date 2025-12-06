require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyCompleteData() {
    console.log('\n📊 Verificando integridad de datos completados...\n');

    // Get all classes
    const { data: classes } = await supabase
        .from('classes')
        .select('id, slug, titulo');

    console.log(`✅ Total de clases en BD: ${classes.length}\n`);

    // Check class_fluff records
    console.log('🔍 Verificando class_fluff (narrativa)...');
    const { data: fluff, error: fluffError } = await supabase
        .from('class_fluff')
        .select('class_id, why_adventure_long, power_source_type')
        .limit(100);

    if (fluffError) {
        console.log(`   ❌ Error: ${fluffError.message}`);
    } else {
        console.log(`   ✅ Registros encontrados: ${fluff.length}`);
        fluff.forEach(f => {
            const cls = classes.find(c => c.id === f.class_id);
            console.log(`      • ${cls?.titulo}: ${f.power_source_type || 'SIN DATOS'}`);
        });
    }

    // Check class_proficiencies records
    console.log('\n🔍 Verificando class_proficiencies (competencias)...');
    const { data: profs, error: profsError } = await supabase
        .from('class_proficiencies')
        .select('class_id, weapons, armors')
        .limit(100);

    if (profsError) {
        console.log(`   ❌ Error: ${profsError.message}`);
    } else {
        console.log(`   ✅ Registros encontrados: ${profs.length}`);
        profs.forEach(p => {
            const cls = classes.find(c => c.id === p.class_id);
            const weapCount = Array.isArray(p.weapons) ? p.weapons.length : 0;
            const armCount = Array.isArray(p.armors) ? p.armors.length : 0;
            console.log(`      • ${cls?.titulo}: ${weapCount} armas, ${armCount} armaduras`);
        });
    }

    console.log('\n✨ Verificación completada!\n');
}

verifyCompleteData().catch(console.error);
