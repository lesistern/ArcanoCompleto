require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyFrontendData() {
    console.log('\n🌐 Verificando datos que se mostrarán en el frontend...\n');

    // Test with Bard class
    const classSlug = 'bard';

    console.log(`Obteniendo datos completos para: ${classSlug}\n`);

    // Get class data
    const { data: classData, error: classError } = await supabase
        .from('classes')
        .select('*')
        .eq('slug', classSlug)
        .single();

    if (classError) {
        console.log(`❌ Error obteniendo clase: ${classError.message}`);
        return;
    }

    console.log('📋 TABLA CLASSES (Información básica):');
    console.log(`   ✅ Título: ${classData.titulo}`);
    console.log(`   ✅ Subtítulo: ${classData.subtitulo}`);
    console.log(`   ✅ Dado de golpe: d${classData.dg}`);
    console.log(`   ✅ BAB: ${classData.bab}`);
    console.log(`   ✅ Magia: ${classData.spellcasting}`);
    console.log(`   ✅ Salvaciones: Fort ${classData.fort}, Ref ${classData.ref}, Will ${classData.will}`);

    // Get class fluff
    const { data: fluffData, error: fluffError } = await supabase
        .from('class_fluff')
        .select('*')
        .eq('class_id', classData.id)
        .single();

    if (fluffError) {
        console.log(`\n❌ Error obteniendo class_fluff: ${fluffError.message}`);
        return;
    }

    console.log('\n🎭 TABLA CLASS_FLUFF (Narrativa y trasfondo):');
    console.log(`   ✅ Tipo de poder: ${fluffData.power_source_type}`);
    const groupRole = fluffData.group_role_long ? fluffData.group_role_long.substring(0, 50) : 'N/A';
    console.log(`   ✅ Rol en el grupo: ${groupRole}...`);
    const whyAdventure = fluffData.why_adventure_long ? fluffData.why_adventure_long.substring(0, 50) : 'N/A';
    console.log(`   ✅ ¿Por qué aventuran?: ${whyAdventure}...`);
    const origin = fluffData.social_origin_long ? fluffData.social_origin_long.substring(0, 50) : 'N/A';
    console.log(`   ✅ Origen social: ${origin}...`);
    console.log(`   ✅ Enfoque religioso: ${fluffData.religious_focus_long || 'N/A'}`);
    console.log(`   ✅ Alineamiento: ${fluffData.alignment_short}`);
    if (fluffData.typical_deities && fluffData.typical_deities.length > 0) {
        console.log(`   ✅ Deidades típicas: ${fluffData.typical_deities.join(', ')}`);
    }
    if (fluffData.typical_races && fluffData.typical_races.length > 0) {
        console.log(`   ✅ Razas comunes: ${fluffData.typical_races.join(', ')}`);
    }

    // Get class proficiencies
    const { data: profData, error: profError } = await supabase
        .from('class_proficiencies')
        .select('*')
        .eq('class_id', classData.id)
        .single();

    if (profError) {
        console.log(`\n❌ Error obteniendo class_proficiencies: ${profError.message}`);
        return;
    }

    console.log('\n⚔️  TABLA CLASS_PROFICIENCIES (Competencias):');
    console.log(`   ✅ Armas: ${profData.weapons ? profData.weapons.join(', ') : 'Ninguna'}`);
    console.log(`   ✅ Armaduras: ${profData.armors ? profData.armors.join(', ') : 'Ninguna'}`);
    if (profData.shields && profData.shields.length > 0) {
        console.log(`   ✅ Escudos: ${profData.shields.join(', ')}`);
    }

    console.log('\n✨ Todos los datos están disponibles para el frontend!\n');
}

verifyFrontendData().catch(console.error);
