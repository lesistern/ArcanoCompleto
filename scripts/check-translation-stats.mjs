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

async function checkTranslationStats() {
  console.log('📊 ESTADÍSTICAS DE TRADUCCIÓN\n');
  console.log('='.repeat(60));

  const tables = [
    { name: 'spell_translations', label: 'Hechizos' },
    { name: 'class_translations', label: 'Clases' },
    { name: 'race_translations', label: 'Razas' },
    { name: 'feat_translations', label: 'Dotes' },
    { name: 'skill_translations', label: 'Habilidades' },
    { name: 'weapon_translations', label: 'Armas' }
  ];

  let totalEn = 0;
  let totalEs = 0;

  for (const table of tables) {
    // Contar inglés
    const { count: countEn } = await supabase
      .from(table.name)
      .select('*', { count: 'exact', head: true })
      .eq('language_code', 'en');

    // Contar español
    const { count: countEs } = await supabase
      .from(table.name)
      .select('*', { count: 'exact', head: true })
      .eq('language_code', 'es');

    totalEn += countEn || 0;
    totalEs += countEs || 0;

    console.log(`\n${table.label}:`);
    console.log(`  🇬🇧 Inglés:  ${countEn || 0}`);
    console.log(`  🇪🇸 Español: ${countEs || 0}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('TOTALES:');
  console.log(`  🇬🇧 Inglés:  ${totalEn}`);
  console.log(`  🇪🇸 Español: ${totalEs}`);
  console.log('='.repeat(60));

  // Usar la vista de estadísticas si existe
  const { data: stats, error } = await supabase
    .from('v_translation_stats')
    .select('*');

  if (!error && stats) {
    console.log('\n📈 VISTA DE ESTADÍSTICAS:\n');
    stats.forEach(lang => {
      if (lang.is_active) {
        console.log(`${lang.native_name} (${lang.code}):`);
        console.log(`  Spells: ${lang.spells_translated}/${lang.spells_percentage}%`);
        console.log(`  Classes: ${lang.classes_translated}/${lang.classes_percentage}%`);
        console.log(`  Races: ${lang.races_translated}`);
        console.log(`  Feats: ${lang.feats_translated}`);
        console.log(`  Skills: ${lang.skills_translated}`);
        console.log(`  Weapons: ${lang.weapons_translated}`);
        console.log('');
      }
    });
  }
}

checkTranslationStats().catch(console.error);
