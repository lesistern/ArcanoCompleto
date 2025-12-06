/**
 * Script to import skills from JSON to Supabase
 * Run with: node import-skills-to-supabase.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials');
    console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importSkills() {
    try {
        console.log('📖 Reading skills.json...');
        const skillsPath = path.join(__dirname, 'src', 'lib', 'data', '3.5', 'skills.json');
        const skillsData = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));

        console.log(`✅ Found ${skillsData.length} skills to import`);

        // Transform the data to match our schema
        const transformedSkills = skillsData.map(skill => ({
            id: skill.id,
            name: skill.name,
            slug: skill.slug,
            short_description: skill.shortDescription || null,
            description: skill.description || null,
            key_ability: skill.keyAbility || null,
            category: skill.category || null,
            trained_only: skill.trainedOnly || false,
            armor_check_penalty: skill.armorCheckPenalty || false,
            uses: skill.uses || null,
            check_description: skill.check || null,
            action: skill.action || null,
            retry: skill.retry || false,
            retry_details: skill.retryDetails || null,
            special: skill.special || null,
            synergies: skill.synergies || null,
            class_skill_for: skill.classSkillFor || null,
            untrained_use: skill.untrainedUse || null,
            source: skill.source || null
        }));

        console.log('🚀 Importing skills to Supabase...');

        // Insert in batches of 50 to avoid timeout
        const batchSize = 50;
        let imported = 0;

        for (let i = 0; i < transformedSkills.length; i += batchSize) {
            const batch = transformedSkills.slice(i, i + batchSize);

            const { data, error } = await supabase
                .from('skills')
                .upsert(batch, { onConflict: 'id' });

            if (error) {
                console.error(`❌ Error importing batch ${i / batchSize + 1}:`, error);
                throw error;
            }

            imported += batch.length;
            console.log(`✅ Imported ${imported}/${transformedSkills.length} skills`);
        }

        console.log('🎉 All skills imported successfully!');

        // Verify the import
        const { count, error: countError } = await supabase
            .from('skills')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.error('❌ Error verifying import:', countError);
        } else {
            console.log(`✅ Verified: ${count} skills in database`);
        }

    } catch (error) {
        console.error('❌ Import failed:', error);
        process.exit(1);
    }
}

importSkills();
