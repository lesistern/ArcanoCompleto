#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function showSampleTranslations() {
  console.log('📋 MUESTRA DE TRADUCCIONES\n');
  console.log('='.repeat(80));

  // Muestra de 3 hechizos
  console.log('\n🔮 HECHIZOS:\n');

  const { data: spells } = await supabase
    .from('spell_translations')
    .select('spell_id, language_code, name, description')
    .in('language_code', ['en', 'es'])
    .limit(6)
    .order('name');

  // Agrupar por spell_id
  const spellsGrouped = {};
  spells.forEach(s => {
    if (!spellsGrouped[s.spell_id]) spellsGrouped[s.spell_id] = {};
    spellsGrouped[s.spell_id][s.language_code] = s;
  });

  let count = 0;
  for (const spellId in spellsGrouped) {
    if (count >= 3) break;
    const spell = spellsGrouped[spellId];

    console.log(`🇬🇧 ${spell.en.name}`);
    console.log(`   ${spell.en.description.substring(0, 100)}...`);
    console.log(`\n🇪🇸 ${spell.es.name}`);
    console.log(`   ${spell.es.description.substring(0, 100)}...`);
    console.log('\n' + '-'.repeat(80) + '\n');
    count++;
  }

  // Muestra de clases
  console.log('\n⚔️  CLASES:\n');

  const { data: classes } = await supabase
    .from('class_translations')
    .select('class_id, language_code, name, description')
    .in('language_code', ['en', 'es'])
    .limit(4);

  const classesGrouped = {};
  classes.forEach(c => {
    if (!classesGrouped[c.class_id]) classesGrouped[c.class_id] = {};
    classesGrouped[c.class_id][c.language_code] = c;
  });

  count = 0;
  for (const classId in classesGrouped) {
    if (count >= 2) break;
    const cls = classesGrouped[classId];

    console.log(`🇬🇧 ${cls.en.name}`);
    console.log(`   ${cls.en.description.substring(0, 80)}...`);
    console.log(`\n🇪🇸 ${cls.es.name}`);
    console.log(`   ${cls.es.description.substring(0, 80)}...`);
    console.log('\n' + '-'.repeat(80) + '\n');
    count++;
  }

  console.log('\n='.repeat(80));
  console.log('✅ Muestra completada');
}

showSampleTranslations().catch(console.error);
