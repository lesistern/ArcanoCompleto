require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing Supabase environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Updated paths based on user feedback and file system check
const BASE_DIR_NEW = path.join(__dirname, '../recursos/Textos/Nuevos');
const BASE_DIR_CLASSES = path.join(__dirname, '../recursos/Textos/Clases');

const DIRS = {
    CLASSES: BASE_DIR_CLASSES,
    RACES: path.join(BASE_DIR_NEW, 'Razas'),
    FEATS: path.join(BASE_DIR_NEW, 'Dotes'),
};

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

async function processFeats() {
    console.log('Processing Feats...');
    if (!fs.existsSync(DIRS.FEATS)) return;

    const files = fs.readdirSync(DIRS.FEATS);
    for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const content = fs.readFileSync(path.join(DIRS.FEATS, file), 'utf-8');
        const name = file.replace('.md', '');
        const slug = slugify(name);

        // Simple extraction using regex
        const prerequisitesMatch = content.match(/\*\*Prerequisites:\*\*\s*(.*?)(?:\n|$)/i);
        const benefitMatch = content.match(/\*\*Benefit:\*\*\s*([\s\S]*?)(?:\n\n\*\*|$)/i);
        const normalMatch = content.match(/\*\*Normal:\*\*\s*([\s\S]*?)(?:\n\n\*\*|$)/i);
        const specialMatch = content.match(/\*\*Special:\*\*\s*([\s\S]*?)(?:\n\n\*\*|$)/i);

        let category = 'General';
        if (name.includes('[Item Creation]')) category = 'Creación de objetos';
        else if (name.includes('[Metamagic]')) category = 'Metamágica';
        else if (name.includes('[Fighter Bonus Feat]')) category = 'Combate';

        const featData = {
            slug,
            name,
            category,
            prerequisites: prerequisitesMatch ? prerequisitesMatch[1].trim() : null,
            benefit: benefitMatch ? benefitMatch[1].trim() : (content.split('\n\n')[1] || ''),
            normal: normalMatch ? normalMatch[1].trim() : null,
            special: specialMatch ? specialMatch[1].trim() : null,
            source_book: 'SRD 3.5',
        };

        const { error } = await supabase.from('feats').upsert(featData, { onConflict: 'slug' });

        if (error) {
            const msg = `Error upserting feat ${name}: ${error.message}\n`;
            console.error(msg);
            fs.appendFileSync('ingest.log', msg);
        } else {
            // console.log(`Upserted feat: ${name}`);
        }
    }
}

async function processRaces() {
    console.log('Processing Races...');
    if (!fs.existsSync(DIRS.RACES)) return;

    const files = fs.readdirSync(DIRS.RACES);
    for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const content = fs.readFileSync(path.join(DIRS.RACES, file), 'utf-8');
        const name = file.replace('.md', '');
        const slug = slugify(name);

        let size = 'Mediano';
        if (content.match(/Small characters/i) || content.match(/size is Small/i)) size = 'Pequeño';

        let base_speed = 30;
        const speedMatch = content.match(/base land speed is (\d+) feet/i);
        if (speedMatch) base_speed = parseInt(speedMatch[1]);

        const raceData = {
            slug,
            name,
            size,
            base_speed,
            description: content,
            source_book: 'SRD 3.5',
        };

        const { error } = await supabase.from('races').upsert(raceData, { onConflict: 'slug' });

        if (error) {
            const msg = `Error upserting race ${name}: ${error.message}\n`;
            console.error(msg);
            fs.appendFileSync('ingest.log', msg);
        } else {
            console.log(`Upserted race: ${name}`);
        }
    }
}

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

async function processClasses() {
    console.log('Processing Classes...');
    if (!fs.existsSync(DIRS.CLASSES)) {
        console.error(`Classes directory not found: ${DIRS.CLASSES}`);
        return;
    }

    // Determine table name
    let tableName = 'classes';
    const { error: checkError } = await supabase.from('clases').select('id').limit(1);
    if (!checkError) {
        console.log('Detected table "clases" (Spanish). Using it.');
        tableName = 'clases';
    } else {
        console.log('Using table "classes" (English).');
    }

    const files = fs.readdirSync(DIRS.CLASSES);
    for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const name = file.replace('.md', '');
        // Skip Multiclass or other non-class files if necessary
        if (name === 'Multiclass') continue;

        const content = fs.readFileSync(path.join(DIRS.CLASSES, file), 'utf-8');
        const slug = CLASS_SLUG_MAP[name] || slugify(name);

        // Extract Hit Die
        let hit_die = 'd8';
        const hdMatch = content.match(/Hit Die\s*:?\s*(d\d+)/i); // Adjusted regex for potential variations
        if (hdMatch) hit_die = hdMatch[1];

        // Extract Skill Points
        let skill_points = 2;
        const spMatch = content.match(/Skill Points at 1st Level\s*:?\s*\(?(\d+)/i);
        if (spMatch) skill_points = parseInt(spMatch[1]);

        const classData = {
            // slug, // Don't update slug
            // name, // Don't update name
            hit_die,
            skill_points_per_level: skill_points,
            description: content,
            source_book: 'SRD 3.5',
            updated_at: new Date().toISOString()
        };

        // Try UPDATE first
        const { error: updateError } = await supabase
            .from(tableName)
            .update(classData)
            .eq('slug', slug);

        if (updateError) {
            const msg = `Error updating class ${name} (${slug}) in table ${tableName}: ${updateError.message}\n`;
            console.error(msg);
            fs.appendFileSync('ingest.log', msg);
        } else {
            const msg = `Updated class: ${name} -> ${slug}\n`;
            console.log(msg);
            fs.appendFileSync('ingest.log', msg);
        }
    }
}

async function main() {
    // await processFeats(); // Already done
    // await processRaces(); // Already done
    await processClasses();
}

main();
