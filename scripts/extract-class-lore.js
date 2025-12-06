require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BASE_DIR = path.join(__dirname, '../recursos/Textos/Clases');

const CLASS_SLUG_MAP = {
    'Barbarian': 'barbaro',
    'Bard': 'bardo',
    'Cleric': 'clerigo',
    'Druid': 'druida',
    'Fighter': 'guerrero',
    'Monk': 'monje',
    'Ninja': 'ninja',
    'Paladin': 'paladin',
    'Physic Warrior': 'guerrero_psiquico',
    'Psionico': 'psionico',
    'Ranger': 'explorador',
    'Rogue': 'picaro',
    'Scout': 'explorador_scout',
    'Sorcerer': 'hechicero',
    'Soulknife': 'cuchilla_del_alma',
    'Spellthief': 'ladron_de_conjuros',
    'Warlock': 'brujo',
    'Wizard': 'mago',
    'shugenja': 'shugenja',
    'wu jen': 'wu_jen'
};

// Extrae párrafos antes de "Alignment:" o "Class Skills"
function extractIntroduction(content) {
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

    return intro;
}

// Extrae información de alineamiento
function extractAlignment(content) {
    const alignmentMatch = content.match(/^Alignment:\s*(.+?)$/mi);
    if (!alignmentMatch) return { regla: null, tendencia: null };

    const regla = alignmentMatch[1].trim();
    const intro = extractIntroduction(content);
    const paragraphs = intro.split(/\r?\n\r?\n/);

    const alignmentPara = paragraphs.find(p =>
        p.match(/(lawful|chaotic|good|evil|neutral|alignment)/i) &&
        !p.match(/adventur/i)
    );

    return {
        regla,
        tendencia: alignmentPara || null
    };
}

// Extrae información de magia
function extractMagicInfo(content) {
    const hasSpellcasting = content.match(/Spells:|Spellcasting|spell slots|spells per day/i);

    if (!hasSpellcasting) {
        return {
            tiene_magia: false,
            tipo_magia: 'ninguna',
            estilo_conjuros: 'no_aplica'
        };
    }

    let tipo_magia = 'arcana';
    if (content.match(/divine spells|cleric spell|druid spell|ranger spell|paladin spell/i)) {
        tipo_magia = 'divina';
    }

    let estilo_conjuros = 'preparada';
    if (content.match(/spontaneous|spontaneously|known spells|spells known/i)) {
        estilo_conjuros = 'espontanea';
    }

    return {
        tiene_magia: true,
        tipo_magia,
        estilo_conjuros
    };
}

// Extrae el rol en el party
function extractPartyRole(content) {
    const roleKeywords = [
        /primary role.*?is.*?(?:as )?(.+?)(?:\.|$)/i,
        /serves as.*?(.+?)(?:\.|,)/i,
        /best.*?(?:at|as).*?(.+?)(?:\.|,)/i,
        /typical.*?role.*?is.*?(.+?)(?:\.|$)/i
    ];

    for (const regex of roleKeywords) {
        const match = content.match(regex);
        if (match) return match[1].trim();
    }

    return null;
}

// Extrae motivación para aventurar
function extractAdventureMotivation(content) {
    const intro = extractIntroduction(content);
    const paragraphs = intro.split(/\r?\n\r?\n/);

    const adventurePara = paragraphs.find(p =>
        p.match(/adventuring|adventure/i) && p.length > 100
    );

    return adventurePara || null;
}

// Extrae origen social y organización
function extractSocialOrigin(content) {
    const intro = extractIntroduction(content);
    const originMatch = intro.match(/(come from|hail from|born in|raised in|trained in|learn from).*?(.+?)(?:\.|$)/i);

    let tipo_organizacion = 'ninguna';
    if (content.match(/tribe|clan|barbaric/i)) tipo_organizacion = 'tribu';
    else if (content.match(/monastery|monastic/i)) tipo_organizacion = 'monasterio';
    else if (content.match(/church|temple|clergy/i)) tipo_organizacion = 'iglesia';
    else if (content.match(/order|knighthood/i)) tipo_organizacion = 'orden';
    else if (content.match(/college|academy|school/i)) tipo_organizacion = 'colegio';
    else if (content.match(/guild|thieves/i)) tipo_organizacion = 'gremio';
    else if (content.match(/master|mentor|teacher/i)) tipo_organizacion = 'maestro';

    return {
        origen_social: originMatch ? originMatch[2].trim() : null,
        tipo_organizacion
    };
}

// Extrae información religiosa
function extractReligiousInfo(content) {
    const intro = extractIntroduction(content);
    const paragraphs = intro.split(/\r?\n\r?\n/);

    const religionPara = paragraphs.find(p =>
        p.match(/god|deity|deities|worship|divine|religion/i) &&
        !p.match(/adventur/i) &&
        p.length > 100
    );

    const deityMatches = content.match(/\b(Kord|Obad-Hai|Erythnul|Pelor|Heironeous|St\. Cuthbert|Ehlonna|Fharlanghn|Olidammara|Boccob|Wee Jas|Gruumsh|Moradin|Corellon Larethian|Garl Glittergold|Yondalla)\b/g);
    const deidades = deityMatches ? [...new Set(deityMatches)].join(', ') : null;

    return {
        enfoque_religioso: religionPara || null,
        deidades_tipicas: deidades
    };
}

// Extrae razas comunes
function extractCommonRaces(content) {
    const intro = extractIntroduction(content);
    const raceMatches = intro.match(/(Human|Dwarf|Elf|Gnome|Half-elf|Half-orc|Halfling)s?/gi);
    if (!raceMatches) return null;

    const races = [...new Set(raceMatches.map(r => {
        const normalized = r.replace(/s$/i, '');
        return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
    }))];

    return races.join(', ');
}

// Determina el tipo de poder principal
function determinePowerType(content, className) {
    if (content.match(/rage|fury|berserker/i)) return 'ira';
    if (content.match(/bardic music|performance|inspire/i)) return 'música_arcana';
    if (content.match(/divine.*?power|channel.*?deity|turn undead/i)) return 'divino';
    if (content.match(/wild shape|animal companion|nature/i) && className === 'Druid') return 'naturaleza_divina';
    if (content.match(/martial|weapon.*?training|combat.*?feat/i)) return 'marcial';
    if (content.match(/\bki\b|monk|unarmed/i)) return 'ki';
    if (content.match(/sneak attack|trap|skill/i) && className === 'Rogue') return 'habilidades';
    if (content.match(/innate.*?magic|sorcerous|bloodline/i)) return 'arcano_innato';
    if (content.match(/arcane.*?study|spellbook|wizard/i)) return 'arcano_estudiado';
    if (content.match(/smite evil|lay on hands|divine grace/i)) return 'divino_marcial';
    if (content.match(/favored enemy|track|ranger/i)) return 'marcial_naturaleza';

    return 'marcial';
}

// Función principal de extracción
async function extractClassLore(className, slug) {
    console.log(`\nExtrayendo datos de ${className}...`);

    const filePath = path.join(BASE_DIR, `${className}.md`);
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Archivo no encontrado: ${filePath}`);
        return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    const alignment = extractAlignment(content);
    const magic = extractMagicInfo(content);
    const social = extractSocialOrigin(content);
    const religious = extractReligiousInfo(content);
    const intro = extractIntroduction(content);
    const introParagraphs = intro.split(/\r?\n\r?\n/);

    const loreData = {
        tiene_magia: magic.tiene_magia,
        tipo_magia: magic.tipo_magia,
        estilo_conjuros: magic.estilo_conjuros,
        regla_alineamiento: alignment.regla,
        tendencia_alineamiento: alignment.tendencia,
        tipo_poder_principal: determinePowerType(content, className),
        descripcion_poder: introParagraphs[2] || null,
        rol_party: extractPartyRole(content),
        motivacion_aventura: extractAdventureMotivation(content),
        origen_social: social.origen_social,
        tipo_organizacion: social.tipo_organizacion,
        enfoque_religioso: religious.enfoque_religioso,
        deidades_tipicas: religious.deidades_tipicas,
        razas_comunes: extractCommonRaces(content)
    };

    console.log('Datos extraídos:');
    console.log(JSON.stringify(loreData, null, 2));

    return loreData;
}

// Actualizar en Supabase
async function updateClassLore(slug, loreData) {
    try {
        const { data, error } = await supabase
            .from('classes')
            .update(loreData)
            .eq('slug', slug);

        if (error) {
            console.error(`❌ Error actualizando ${slug}:`, error.message);
            return false;
        }

        console.log(`✅ Actualizado ${slug}`);
        return true;
    } catch (err) {
        console.error(`❌ Excepción actualizando ${slug}:`, err.message);
        return false;
    }
}

// Ejecutar para todas las clases
async function main() {
    console.log('=== Extracción de Lore de Clases ===\n');

    let successCount = 0;
    let failCount = 0;

    for (const [className, slug] of Object.entries(CLASS_SLUG_MAP)) {
        const loreData = await extractClassLore(className, slug);

        if (loreData) {
            const success = await updateClassLore(slug, loreData);
            if (success) {
                successCount++;
            } else {
                failCount++;
            }
        } else {
            failCount++;
        }

        await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log(`\n=== Resumen ===`);
    console.log(`✅ Exitosos: ${successCount}`);
    console.log(`❌ Fallidos: ${failCount}`);
    console.log(`Total: ${Object.keys(CLASS_SLUG_MAP).length}`);
}

if (require.main === module) {
    main();
} else {
    module.exports = {
        extractClassLore,
        extractAlignment,
        extractMagicInfo,
        extractPartyRole,
        extractAdventureMotivation,
        extractSocialOrigin,
        extractReligiousInfo,
        extractCommonRaces,
        determinePowerType
    };
}
