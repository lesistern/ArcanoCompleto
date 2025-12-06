require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BASE_DIR = path.join(__dirname, '../recursos/Textos/Clases');

// Clases que faltan en Supabase
const NEW_CLASSES = {
    'Ninja': {
        slug: 'ninja',
        name: 'Ninja',
        hit_die: 'd6',
        skill_points_per_level: 6
    },
    'Physic Warrior': {
        slug: 'guerrero_psiquico',
        name: 'Guerrero Psíquico',
        hit_die: 'd8',
        skill_points_per_level: 2
    },
    'Psionico': {
        slug: 'psionico',
        name: 'Psiónico',
        hit_die: 'd4',
        skill_points_per_level: 2
    },
    'Scout': {
        slug: 'explorador_scout',
        name: 'Scout',
        hit_die: 'd8',
        skill_points_per_level: 8
    },
    'Soulknife': {
        slug: 'cuchilla_del_alma',
        name: 'Cuchilla del Alma',
        hit_die: 'd10',
        skill_points_per_level: 4
    },
    'Spellthief': {
        slug: 'ladron_de_conjuros',
        name: 'Ladrón de Conjuros',
        hit_die: 'd6',
        skill_points_per_level: 6
    },
    'Warlock': {
        slug: 'brujo',
        name: 'Brujo',
        hit_die: 'd6',
        skill_points_per_level: 2
    },
    'shugenja': {
        slug: 'shugenja',
        name: 'Shugenja',
        hit_die: 'd6',
        skill_points_per_level: 2
    },
    'wu jen': {
        slug: 'wu_jen',
        name: 'Wu Jen',
        hit_die: 'd4',
        skill_points_per_level: 2
    }
};

// Extrae descripción del archivo Markdown
function extractDescription(content) {
    // Buscar el final de la introducción
    const endMarkers = [
        /^Alignment:/mi,
        /^Class Skills$/mi,
        /^Hit Die:/mi
    ];

    let endIndex = content.length;
    for (const marker of endMarkers) {
        const match = content.match(marker);
        if (match && match.index < endIndex) {
            endIndex = match.index;
        }
    }

    let intro = content.slice(0, endIndex).trim();
    intro = intro.replace(/^Character Classes\s+[A-Z]+\s+/i, '').trim();

    // Tomar solo los primeros 2-3 párrafos
    const paragraphs = intro.split(/\r?\n\r?\n/);
    return paragraphs.slice(0, 3).join('\n\n');
}

// Extrae habilidades de clase
function extractClassSkills(content) {
    const skillsMatch = content.match(/class skills.*?are\s+(.+?)(?:\.|$)/is);
    if (!skillsMatch) return [];

    const skillsText = skillsMatch[1];
    const skills = skillsText.split(/,\s*(?![^()]*\))/).map(s => s.trim());

    return skills.map(skill => {
        // Remover la habilidad clave entre paréntesis
        return skill.replace(/\s*\([^)]+\)\s*$/, '').trim();
    });
}

// Extrae proficiencias de armas
function extractWeaponProf(content) {
    const weaponMatch = content.match(/proficient with\s+(.+?)(?:\.|They are proficient)/is);
    if (!weaponMatch) return ['Simple weapons'];

    return [weaponMatch[1].trim()];
}

// Extrae proficiencias de armadura
function extractArmorProf(content) {
    const armorMatch = content.match(/proficient with\s+(.+?armor)(?:\s+but not|\s+and|\.|$)/is);
    if (!armorMatch) return ['Light armor'];

    return [armorMatch[1].trim()];
}

// Determina progresión de BAB
function determineBAB(content) {
    if (content.match(/\+15\/\+10\/\+5/)) return 'good';
    if (content.match(/\+7\/\+2/)) return 'medium';
    return 'poor';
}

// Determina salvaciones
function determineSaves(content) {
    // Buscar en la tabla
    const fortMatch = content.match(/1st\s+\+\d+\s+\+(\d+)/);
    const refMatch = content.match(/1st\s+\+\d+\s+\+\d+\s+\+(\d+)/);
    const willMatch = content.match(/1st\s+\+\d+\s+\+\d+\s+\+\d+\s+\+(\d+)/);

    return {
        fort: fortMatch && parseInt(fortMatch[1]) >= 2 ? 'good' : 'poor',
        ref: refMatch && parseInt(refMatch[1]) >= 2 ? 'good' : 'poor',
        will: willMatch && parseInt(willMatch[1]) >= 2 ? 'good' : 'poor'
    };
}

// Determina habilidad de lanzamiento
function determineSpellcastingAbility(content, className) {
    if (content.match(/invocations|eldritch blast/i) && className === 'Warlock') return 'Cha';
    if (content.match(/psion|psionic|power points/i)) return 'Int';
    if (content.match(/divine spells|cleric|druid/i)) return 'Wis';
    if (content.match(/arcane spells|wizard/i)) return 'Int';
    if (content.match(/sorcerer|bard/i)) return 'Cha';
    return null;
}

async function addNewClass(className, classInfo) {
    console.log(`\n=== Procesando ${className} ===`);

    const filePath = path.join(BASE_DIR, `${className}.md`);
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Archivo no encontrado: ${filePath}`);
        return false;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Extraer datos
    const description = extractDescription(content);
    const classSkills = extractClassSkills(content);
    const weaponProf = extractWeaponProf(content);
    const armorProf = extractArmorProf(content);
    const bab = determineBAB(content);
    const saves = determineSaves(content);
    const spellcastingAbility = determineSpellcastingAbility(content, className);

    const classData = {
        slug: classInfo.slug,
        name: classInfo.name,
        hit_die: classInfo.hit_die,
        skill_points_per_level: classInfo.skill_points_per_level,
        class_skills: classSkills,
        weapon_proficiencies: weaponProf,
        armor_proficiencies: armorProf,
        bab_progression: bab,
        fortitude_save: saves.fort,
        reflex_save: saves.ref,
        will_save: saves.will,
        spellcasting_ability: spellcastingAbility,
        description: description,
        role: null,
        source_book: 'Complete Arcane / Complete Psionic / Oriental Adventures',
        source_page: null
    };

    console.log('Datos extraídos:');
    console.log(`  - Slug: ${classData.slug}`);
    console.log(`  - Hit Die: ${classData.hit_die}`);
    console.log(`  - Skills: ${classSkills.length} habilidades`);
    console.log(`  - BAB: ${bab}`);
    console.log(`  - Saves: Fort ${saves.fort}, Ref ${saves.ref}, Will ${saves.will}`);
    console.log(`  - Spellcasting: ${spellcastingAbility || 'None'}`);

    // Insertar en Supabase
    try {
        const { data, error } = await supabase
            .from('classes')
            .insert([classData])
            .select();

        if (error) {
            console.error(`❌ Error insertando ${classInfo.slug}:`, error.message);
            return false;
        }

        console.log(`✅ Insertado ${classInfo.slug}`);
        return true;
    } catch (err) {
        console.error(`❌ Excepción insertando ${classInfo.slug}:`, err.message);
        return false;
    }
}

async function main() {
    console.log('=== Agregando Clases Faltantes ===\n');

    let successCount = 0;
    let failCount = 0;

    for (const [className, classInfo] of Object.entries(NEW_CLASSES)) {
        const success = await addNewClass(className, classInfo);
        if (success) {
            successCount++;
        } else {
            failCount++;
        }

        // Pausa entre inserciones
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log(`\n=== Resumen ===`);
    console.log(`✅ Exitosos: ${successCount}`);
    console.log(`❌ Fallidos: ${failCount}`);
    console.log(`Total: ${Object.keys(NEW_CLASSES).length}`);
}

if (require.main === module) {
    main();
}
