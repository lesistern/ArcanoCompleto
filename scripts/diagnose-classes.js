require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function diagnose() {
    console.log('\n🔍 DIAGNÓSTICO DE DATOS DE CLASES\n');

    // Check classes table
    const { data: classes } = await supabase
        .from('classes')
        .select('slug, titulo, spellcasting')
        .limit(5);

    console.log('📋 TABLA CLASSES (primeras 5):');
    classes.forEach(c => {
        console.log(`   ${c.titulo}: spellcasting = "${c.spellcasting}"`);
    });

    // Check class_fluff
    const { data: fluff } = await supabase
        .from('class_fluff')
        .select('class_id, alignment_short, alignment_tendency')
        .limit(3);

    console.log('\n🎭 TABLA CLASS_FLUFF (primeras 3):');
    fluff.forEach(f => {
        console.log(`   ID ${f.class_id}:`);
        console.log(`     alignment_short: "${f.alignment_short}"`);
        console.log(`     alignment_tendency: "${f.alignment_tendency}"`);
    });

    // Check if class_progression exists
    const { data: prog, error: progError } = await supabase
        .from('class_progression')
        .select('class_slug, level')
        .limit(1);

    console.log('\n⏸️  TABLA CLASS_PROGRESSION:');
    if (progError) {
        console.log(`   ❌ ${progError.message}`);
    } else {
        console.log(`   ✅ Existe (${prog.length} registros encontrados)`);
    }

    // Check if class_features exists
    const { data: feats, error: featsError } = await supabase
        .from('class_features')
        .select('class_id, level')
        .limit(1);

    console.log('\n🎯 TABLA CLASS_FEATURES:');
    if (featsError) {
        console.log(`   ❌ ${featsError.message}`);
    } else {
        console.log(`   ✅ Existe (${feats.length} registros encontrados)`);
    }
}

diagnose().catch(console.error);
