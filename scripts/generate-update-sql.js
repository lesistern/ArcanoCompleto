const fs = require('fs');
const path = require('path');

const BASE_DIR_CLASSES = path.join(__dirname, '../recursos/Textos/Clases');
const OUTPUT_FILE = path.join(__dirname, 'update_classes_content.sql');

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

function escapeSql(text) {
    return text.replace(/'/g, "''");
}

function generateSql() {
    console.log('Generating SQL...');
    if (!fs.existsSync(BASE_DIR_CLASSES)) {
        console.error(`Classes directory not found: ${BASE_DIR_CLASSES}`);
        return;
    }

    let sqlContent = '-- Update Classes Content from SRD Markdown\n\n';

    const files = fs.readdirSync(BASE_DIR_CLASSES);
    for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const name = file.replace('.md', '');
        if (name === 'Multiclass') continue;

        const content = fs.readFileSync(path.join(BASE_DIR_CLASSES, file), 'utf-8');
        const slug = CLASS_SLUG_MAP[name];

        if (!slug) {
            console.warn(`Skipping ${name} (no slug map)`);
            continue;
        }

        // Extract Hit Die
        let hit_die = 'd8';
        const hdMatch = content.match(/Hit Die\s*:?\s*(d\d+)/i);
        if (hdMatch) hit_die = hdMatch[1];

        // Extract Skill Points
        let skill_points = 2;
        const spMatch = content.match(/Skill Points at 1st Level\s*:?\s*\(?(\d+)/i);
        if (spMatch) skill_points = parseInt(spMatch[1]);

        const description = escapeSql(content);

        sqlContent += `
UPDATE classes 
SET 
    description = '${description}',
    hit_die = '${hit_die}',
    skill_points_per_level = ${skill_points},
    updated_at = NOW()
WHERE slug = '${slug}';
`;
    }

    fs.writeFileSync(OUTPUT_FILE, sqlContent);
    console.log(`SQL generated at ${OUTPUT_FILE}`);
}

generateSql();
