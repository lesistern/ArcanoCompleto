/**
 * Script to extract and update classes with real lore data from markdown files
 * Run with: node extract-lore-from-md.js
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Mapping from MD filenames to class slugs
const classFileMap = {
    'Barbarian.md': 'barbaro',
    'Bard.md': 'bardo',
    'Cleric.md': 'clerigo',
    'Druid.md': 'druida',
    'Fighter': 'guerrero',
    'Monk.md': 'monje',
    'Paladin.md': 'paladin',
    'Ranger.md': 'explorador',
    'Rogue.md': 'picaro',
    'Sorcerer.md': 'hechicero',
    'Wizard.md': 'mago'
};

// Helper to extract a section from markdown content
function extractSection(content, startMarker, endMarker = null) {
    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) return null;

    const actualStart = startIndex + startMarker.length;

    if (!endMarker) {
        // Extract until next major section or variant
        const nextSectionMatch = content.slice(actualStart).match(/\n(BARBARIAN VARIANTS|Alignment:|Hit Die:)/);
        return nextSectionMatch
            ? content.slice(actualStart, actualStart + nextSectionMatch.index).trim()
            : content.slice(actualStart, actualStart + 500).trim();
    }

    const endIndex = content.indexOf(endMarker, actualStart);
    if (endIndex === -1) return content.slice(actualStart, actualStart + 300).trim();

    return content.slice(actualStart, endIndex).trim();
}

// Extract lore from a class markdown file
function extractLoreFromMarkdown(filePath, className) {
    console.log(`\n📚 Extracting lore from ${path.basename(filePath)}...`);

    const content = fs.readFileSync(filePath, 'utf8');

    // Extract first few paragraphs (usually intro + adventuring + power source)
    const lines = content.split('\n');
    let paragraphs = [];
    let startCollecting = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Start after the class name header
        if (line.toUpperCase() === className.toUpperCase()) {
            startCollecting = true;
            continue;
        }

        // Stop at certain markers
        if (startCollecting && (line.startsWith('Alignment:') || line.startsWith('Hit Die:') || line.includes('VARIANTS'))) {
            break;
        }

        if (startCollecting && line.length > 0 && !line.startsWith('#')) {
            paragraphs.push(line);
        }
    }

    const fullText = paragraphs.join(' ');

    // Extract specific data based on patterns in the text
    const loreData = {};

    // Alignment - look for specific pattern
    const alignmentMatch = content.match(/Alignment:\s*([^\n]+)/i);
    loreData.regla_alineamiento = alignmentMatch ? alignmentMatch[1].trim() : 'Any';

    return loreData;
}

// Process all class files
async function processAllClasses() {
    console.log('🔄 Processing class markdown files...\n');

    const mdDir = 'D:\\CalabozosYDragones\\recursos\\Textos\\Clases';
    let successCount = 0;
    let errorCount = 0;

    for (const [filename, slug] of Object.entries(classFileMap)) {
        try {
            const filePath = path.join(mdDir, filename);

            if (!fs.existsSync(filePath)) {
                console.warn(`⚠️  File not found: ${filename}`);
                continue;
            }

            // Get class name from database first
            const { data: classInfo } = await supabase
                .from('classes')
                .select('name')
                .eq('slug', slug)
                .single();

            if (!classInfo) {
                console.warn(`⚠️  Class not found in DB: ${slug}`);
                continue;
            }

            const loreData = extractLoreFromMarkdown(filePath, classInfo.name);

            // For now, just updating alignment as a proof of concept
            // You can manually fill the rest or extend the extraction logic
            const { error } = await supabase
                .from('classes')
                .update({ regla_alineamiento: loreData.regla_alineamiento })
                .eq('slug', slug);

            if (error) {
                console.error(`❌ Error updating ${slug}:`, error.message);
                errorCount++;
            } else {
                console.log(`✅ Updated ${classInfo.name} - Alignment: ${loreData.regla_alineamiento}`);
                successCount++;
            }

        } catch (err) {
            console.error(`❌ Exception processing ${filename}:`, err.message);
            errorCount++;
        }
    }

    console.log(`\n📊 Summary:`);
    console.log(`✅ Successfully processed: ${successCount} classes`);
    if (errorCount > 0) {
        console.log(`❌ Errors: ${errorCount}`);
    }
    console.log(`\n💡 Note: Only alignment was auto-extracted. Use update-classes-lore.js for full lore data.`);
}

processAllClasses().catch(console.error);
