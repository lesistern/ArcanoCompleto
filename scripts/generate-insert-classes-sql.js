require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

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

// Escapa comillas simples para SQL
function escapeSql(str) {
    if (!str) return '';
    return str.replace(/'/g, "''");
}

// Extrae descripción del archivo Markdown
function extractDescription(content) {
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

-- ============================================================================
--Generado automáticamente
--Fecha: ${ new Date().toISOString() }
-- ============================================================================

`;

    for (const [className, classInfo] of Object.entries(NEW_CLASSES)) {
        console.log(`Procesando ${ className }...`);
        const insertSQL = generateInsertSQL(className, classInfo);
        if (insertSQL) {
            sql += insertSQL + '\n';
        }
    }

    const outputPath = path.join(__dirname, 'insert-new-classes.sql');
    fs.writeFileSync(outputPath, sql, 'utf-8');

    console.log(`\n✅ SQL generado en: ${ outputPath } `);
    console.log('\nPor favor ejecuta este archivo SQL en el editor SQL de Supabase.');
}

main();
