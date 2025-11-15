#!/usr/bin/env node

/**
 * Corrige las descripciones de conjuros usando terminología oficial D&D 3.5
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

  // Aplicar reemplazos del diccionario (ordenados por longitud para evitar reemplazos parciales)
  const terms = Object.entries(SPELL_TERMINOLOGY)
    .sort((a, b) => b[0].length - a[0].length);

  for (const [english, spanish] of terms) {
    // Crear regex para palabra completa
    const regex = new RegExp(
      `\\b${english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
      'gi'
    );

    translated = translated.replace(regex, (match) => {
      // Mantener capitalización si la palabra original estaba capitalizada
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
  processed = processed.replace(/\s+/g, ' '); // Espacios múltiples
  processed = processed.replace(/\s+\./g, '.'); // Espacio antes de punto
  processed = processed.replace(/\s+,/g, ','); // Espacio antes de coma

  return processed.trim();
}

/**
 * Traduce un campo
 */
function translate(text) {
  return postProcess(translateText(text));
}

async function fixDescriptions() {
  console.log('Corrigiendo descripciones de conjuros...');
  console.log('=' * 60);

  // Obtener todos los conjuros en español
  const { data: spells, error } = await supabase
    .from('spell_translations')
    .select('spell_id, name, description, casting_time, range_info, duration, saving_throw, spell_resistance, effect, material_components, focus')
    .eq('language_code', 'es');

  if (error) {
    console.error('Error al obtener conjuros:', error);
    return;
  }

  console.log(`Total de conjuros a procesar: ${spells.length}\n`);

  let updated = 0;
  const batchSize = 50;

  for (let i = 0; i < spells.length; i += batchSize) {
    const batch = spells.slice(i, i + batchSize);

    const updates = batch.map(spell => ({
      spell_id: spell.spell_id,
      language_code: 'es',
      name: spell.name, // Mantener el nombre (ya está bien traducido)
      description: translate(spell.description),
      casting_time: translate(spell.casting_time),
      range_info: translate(spell.range_info),
      duration: translate(spell.duration),
      saving_throw: translate(spell.saving_throw),
      spell_resistance: translate(spell.spell_resistance),
      effect: translate(spell.effect),
      material_components: translate(spell.material_components),
      focus: translate(spell.focus)
    }));

    const { error: updateError } = await supabase
      .from('spell_translations')
      .upsert(updates, { onConflict: 'spell_id,language_code' });

    if (updateError) {
      console.error(`Error en lote ${Math.floor(i / batchSize) + 1}:`, updateError.message);
    } else {
      updated += updates.length;
      console.log(`[OK] Lote ${Math.floor(i / batchSize) + 1}/${Math.ceil(spells.length / batchSize)} (${updated}/${spells.length})`);
    }

    // Pausa pequeña entre lotes
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n' + '=' * 60);
  console.log(`Total actualizado: ${updated} conjuros`);
  console.log('=' * 60);
}

fixDescriptions().catch(console.error);
