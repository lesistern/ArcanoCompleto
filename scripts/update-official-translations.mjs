#!/usr/bin/env node

/**
 * Actualiza las traducciones de conjuros con traducciones oficiales
 * del Manual del Jugador español de D&D 3.5
 */

import { createClient } from '@supabase/supabase-js';
import { OFFICIAL_SPELL_TRANSLATIONS } from './official-spell-translations.mjs';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateOfficialTranslations() {
  console.log('Actualizando traducciones oficiales de conjuros...');
  console.log('=' * 60);

  // 1. Obtener todos los conjuros en inglés
  const { data: englishSpells, error: fetchError } = await supabase
    .from('spell_translations')
    .select('spell_id, name')
    .eq('language_code', 'en');

  if (fetchError) {
    console.error('Error al obtener conjuros:', fetchError);
    return;
  }

  console.log(`Total de conjuros en inglés: ${englishSpells.length}`);

  let updated = 0;
  let notFound = 0;
  const notFoundSpells = [];

  // 2. Actualizar cada conjuro que tenga traducción oficial
  for (const spell of englishSpells) {
    const officialName = OFFICIAL_SPELL_TRANSLATIONS[spell.name];

    if (officialName) {
      // Actualizar la traducción en español
      const { error: updateError } = await supabase
        .from('spell_translations')
        .update({
          name: officialName,
          translation_status: 'approved', // Marcar como aprobada
          translation_quality: 5 // Calidad máxima (traducción oficial)
        })
        .eq('spell_id', spell.spell_id)
        .eq('language_code', 'es');

      if (updateError) {
        console.error(`Error actualizando ${spell.name}:`, updateError.message);
      } else {
        updated++;
        console.log(`[OK] ${spell.name} -> ${officialName}`);
      }
    } else {
      notFound++;
      notFoundSpells.push(spell.name);
    }
  }

  console.log('\n' + '=' * 60);
  console.log('RESUMEN:');
  console.log(`Actualizados: ${updated}`);
  console.log(`No encontrados: ${notFound}`);
  console.log('=' * 60);

  if (notFoundSpells.length > 0 && notFoundSpells.length <= 50) {
    console.log('\nConjuros sin traducción oficial:');
    notFoundSpells.slice(0, 30).forEach(name => console.log(`  - ${name}`));
    if (notFoundSpells.length > 30) {
      console.log(`  ... y ${notFoundSpells.length - 30} más`);
    }
  }
}

updateOfficialTranslations().catch(console.error);
