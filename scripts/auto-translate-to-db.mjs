#!/usr/bin/env node

/**
 * Script para traducir contenido y insertarlo directamente en las tablas *_translations
 * con language_code='es'
 */

import { createClient } from '@supabase/supabase-js';
import { SPELL_TERMINOLOGY } from './dnd-terminology.mjs';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Traduce texto usando el diccionario de terminología
 */
function translateText(text) {
  if (!text) return text;

  let translated = text;

  // Aplicar reemplazos del diccionario (ordenados por longitud)
  const terms = Object.entries(SPELL_TERMINOLOGY)
    .sort((a, b) => b[0].length - a[0].length);

  for (const [english, spanish] of terms) {
    const regex = new RegExp(
      `\\b${english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
      'gi'
    );

    translated = translated.replace(regex, (match) => {
      if (match[0] === match[0].toUpperCase()) {
        return spanish.charAt(0).toUpperCase() + spanish.slice(1);
      }
      return spanish;
    });
  }

  return translated;
}

/**
 * Post-procesa la traducción
 */
function postProcess(text) {
  if (!text) return text;

  let processed = text;

  // Correcciones comunes
  processed = processed.replace(/\s+/g, ' ');
  processed = processed.replace(/\s+\./g, '.');
  processed = processed.replace(/\s+,/g, ',');

  return processed.trim();
}

/**
 * Traduce un campo
 */
function translate(text) {
  return postProcess(translateText(text));
}

/**
 * Traduce spells
 */
async function translateSpells() {
  console.log('\n🔮 Traduciendo hechizos...');

  // Obtener todos los hechizos en inglés
  const { data: spells, error } = await supabase
    .from('spell_translations')
    .select('*')
    .eq('language_code', 'en');

  if (error) {
    console.error('❌ Error:', error);
    return 0;
  }

  console.log(`   Total: ${spells.length} hechizos`);

  let inserted = 0;
  const batchSize = 50;

  for (let i = 0; i < spells.length; i += batchSize) {
    const batch = spells.slice(i, i + batchSize);

    const translations = batch.map(spell => ({
      spell_id: spell.spell_id,
      language_code: 'es',
      name: translate(spell.name),
      description: translate(spell.description),
      casting_time: translate(spell.casting_time),
      range_info: translate(spell.range_info),
      duration: translate(spell.duration),
      saving_throw: translate(spell.saving_throw),
      spell_resistance: translate(spell.spell_resistance),
      effect: translate(spell.effect),
      material_components: translate(spell.material_components),
      focus: translate(spell.focus),
      translation_status: 'pending'
    }));

    const { error: insertError } = await supabase
      .from('spell_translations')
      .upsert(translations, { onConflict: 'spell_id,language_code' });

    if (insertError) {
      console.error(`   ❌ Error en lote ${Math.floor(i / batchSize) + 1}:`, insertError.message);
    } else {
      inserted += translations.length;
      console.log(`   ✅ Lote ${Math.floor(i / batchSize) + 1}/${Math.ceil(spells.length / batchSize)} (${inserted}/${spells.length})`);
    }

    // Pausa pequeña entre lotes
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return inserted;
}

/**
 * Traduce classes
 */
async function translateClasses() {
  console.log('\n⚔️  Traduciendo clases...');

  const { data: classes, error } = await supabase
    .from('class_translations')
    .select('*')
    .eq('language_code', 'en');

  if (error) {
    console.error('❌ Error:', error);
    return 0;
  }

  const translations = classes.map(cls => ({
    class_id: cls.class_id,
    language_code: 'es',
    name: translate(cls.name),
    description: translate(cls.description),
    translation_status: 'pending'
  }));

  const { error: insertError } = await supabase
    .from('class_translations')
    .upsert(translations, { onConflict: 'class_id,language_code' });

  if (insertError) {
    console.error('❌ Error:', insertError.message);
    return 0;
  }

  console.log(`   ✅ ${translations.length} clases traducidas`);
  return translations.length;
}

/**
 * Traduce races
 */
async function translateRaces() {
  console.log('\n🧝 Traduciendo razas...');

  const { data: races, error } = await supabase
    .from('race_translations')
    .select('*')
    .eq('language_code', 'en');

  if (error) {
    console.error('❌ Error:', error);
    return 0;
  }

  const translations = races.map(race => ({
    race_id: race.race_id,
    language_code: 'es',
    name: translate(race.name),
    description: translate(race.description),
    translation_status: 'pending'
  }));

  const { error: insertError } = await supabase
    .from('race_translations')
    .upsert(translations, { onConflict: 'race_id,language_code' });

  if (insertError) {
    console.error('❌ Error:', insertError.message);
    return 0;
  }

  console.log(`   ✅ ${translations.length} razas traducidas`);
  return translations.length;
}

/**
 * Traduce feats
 */
async function translateFeats() {
  console.log('\n💪 Traduciendo dotes...');

  const { data: feats, error } = await supabase
    .from('feat_translations')
    .select('*')
    .eq('language_code', 'en');

  if (error) {
    console.error('❌ Error:', error);
    return 0;
  }

  const translations = feats.map(feat => ({
    feat_id: feat.feat_id,
    language_code: 'es',
    name: translate(feat.name),
    benefit: translate(feat.benefit),
    translation_status: 'pending'
  }));

  const { error: insertError } = await supabase
    .from('feat_translations')
    .upsert(translations, { onConflict: 'feat_id,language_code' });

  if (insertError) {
    console.error('❌ Error:', insertError.message);
    return 0;
  }

  console.log(`   ✅ ${translations.length} dotes traducidas`);
  return translations.length;
}

/**
 * Traduce skills
 */
async function translateSkills() {
  console.log('\n🎯 Traduciendo habilidades...');

  const { data: skills, error } = await supabase
    .from('skill_translations')
    .select('*')
    .eq('language_code', 'en');

  if (error) {
    console.error('❌ Error:', error);
    return 0;
  }

  const translations = skills.map(skill => ({
    skill_id: skill.skill_id,
    language_code: 'es',
    name: translate(skill.name),
    description: translate(skill.description),
    translation_status: 'pending'
  }));

  const { error: insertError } = await supabase
    .from('skill_translations')
    .upsert(translations, { onConflict: 'skill_id,language_code' });

  if (insertError) {
    console.error('❌ Error:', insertError.message);
    return 0;
  }

  console.log(`   ✅ ${translations.length} habilidades traducidas`);
  return translations.length;
}

/**
 * Traduce weapons
 */
async function translateWeapons() {
  console.log('\n🗡️  Traduciendo armas...');

  const { data: weapons, error } = await supabase
    .from('weapon_translations')
    .select('*')
    .eq('language_code', 'en');

  if (error) {
    console.error('❌ Error:', error);
    return 0;
  }

  const translations = weapons.map(weapon => ({
    weapon_id: weapon.weapon_id,
    language_code: 'es',
    name: translate(weapon.name),
    description: translate(weapon.description),
    translation_status: 'pending'
  }));

  const { error: insertError } = await supabase
    .from('weapon_translations')
    .upsert(translations, { onConflict: 'weapon_id,language_code' });

  if (insertError) {
    console.error('❌ Error:', insertError.message);
    return 0;
  }

  console.log(`   ✅ ${translations.length} armas traducidas`);
  return translations.length;
}

/**
 * Main
 */
async function main() {
  console.log('🌐 TRADUCCIÓN AUTOMÁTICA AL ESPAÑOL');
  console.log('='.repeat(60));
  console.log('Usando terminología oficial de D&D 3.5\n');

  const startTime = Date.now();

  const results = {
    spells: await translateSpells(),
    classes: await translateClasses(),
    races: await translateRaces(),
    feats: await translateFeats(),
    skills: await translateSkills(),
    weapons: await translateWeapons()
  };

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log('\n' + '='.repeat(60));
  console.log('✅ TRADUCCIÓN COMPLETADA');
  console.log('='.repeat(60));
  console.log(`Hechizos:     ${results.spells}`);
  console.log(`Clases:       ${results.classes}`);
  console.log(`Razas:        ${results.races}`);
  console.log(`Dotes:        ${results.feats}`);
  console.log(`Habilidades:  ${results.skills}`);
  console.log(`Armas:        ${results.weapons}`);
  console.log('-'.repeat(60));
  console.log(`TOTAL:        ${Object.values(results).reduce((a, b) => a + b, 0)}`);
  console.log(`Tiempo:       ${duration}s`);
  console.log('='.repeat(60));

  console.log('\n💡 SIGUIENTE PASO:');
  console.log('   node scripts/check-translation-stats.mjs');
  console.log('   (Verifica las estadísticas de traducción)');
}

main().catch(console.error);
