#!/usr/bin/env node

/**
 * Traduce descripciones de conjuros usando DeepL API
 * Mantiene terminología oficial de D&D 3.5 usando glosario
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const deeplApiKey = process.env.DEEPL_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Glosario de términos D&D que DeepL debe preservar
const DND_GLOSSARY = {
  'caster level': 'nivel de lanzador',
  'saving throw': 'tirada de salvación',
  'spell resistance': 'resistencia a conjuros',
  'hit points': 'puntos de golpe',
  'armor class': 'clase de armadura',
  'damage reduction': 'reducción de daño',
  'spell slot': 'espacio de conjuro',
  'concentration check': 'prueba de Concentración',
  'attack roll': 'tirada de ataque',
  'touch attack': 'ataque de toque',
  'ranged touch attack': 'ataque de toque a distancia',
  'fortitude save': 'salvación de Fortaleza',
  'reflex save': 'salvación de Reflejos',
  'will save': 'salvación de Voluntad',
  'caster': 'lanzador',
  'target': 'objetivo',
  'creature': 'criatura',
  'round': 'asalto',
  'turn': 'turno',
  'action': 'acción',
  'standard action': 'acción estándar',
  'move action': 'acción de movimiento',
  'full-round action': 'acción de asalto completo',
  'swift action': 'acción rápida',
  'immediate action': 'acción inmediata',
  'free action': 'acción gratuita'
};

/**
 * Traduce texto usando DeepL API
 */
async function translateWithDeepL(text, sourceLang = 'EN', targetLang = 'ES') {
  if (!deeplApiKey) {
    console.error('⚠️  DEEPL_API_KEY no configurada en .env.local');
    console.log('Para obtener una clave gratuita (500,000 caracteres/mes):');
    console.log('1. Visita https://www.deepl.com/pro-api');
    console.log('2. Regístrate para la API gratuita');
    console.log('3. Agrega DEEPL_API_KEY=tu_clave en .env.local\n');
    return null;
  }

  const apiUrl = deeplApiKey.endsWith(':fx')
    ? 'https://api-free.deepl.com/v2/translate'
    : 'https://api.deepl.com/v2/translate';

  const params = new URLSearchParams({
    auth_key: deeplApiKey,
    text: text,
    source_lang: sourceLang,
    target_lang: targetLang,
    formality: 'default',
    preserve_formatting: '1'
  });

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DeepL API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Error en traducción:', error.message);
    return null;
  }
}

/**
 * Post-procesa la traducción para corregir términos D&D
 */
function postProcessTranslation(text) {
  if (!text) return text;

  let processed = text;

  // Aplicar correcciones del glosario D&D
  for (const [english, spanish] of Object.entries(DND_GLOSSARY)) {
    const regex = new RegExp(english, 'gi');
    processed = processed.replace(regex, spanish);
  }

  return processed;
}

async function translateSpellDescriptions() {
  console.log('🌐 TRADUCCIÓN AUTOMÁTICA CON DEEPL');
  console.log('=' * 60);

  // Obtener conjuros en inglés con descripción
  const { data: spells, error } = await supabase
    .from('spell_translations')
    .select('spell_id, name, description')
    .eq('language_code', 'en')
    .not('description', 'is', null)
    .limit(5); // LIMITADO A 5 PARA PRUEBA

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total de conjuros: ${spells.length}`);
  console.log('NOTA: Limitado a 5 conjuros para prueba\n');

  let translated = 0;
  let failed = 0;

  for (const spell of spells) {
    console.log(`\nTraduciendo: ${spell.name}`);
    console.log(`Original (primeros 100 chars): ${spell.description.substring(0, 100)}...`);

    const translatedDesc = await translateWithDeepL(spell.description);

    if (translatedDesc) {
      const finalDesc = postProcessTranslation(translatedDesc);

      console.log(`Traducido: ${finalDesc.substring(0, 100)}...`);

      // Guardar en translation_edits para revisión
      const { error: editError } = await supabase
        .from('translation_edits')
        .insert({
          entity_type: 'spell',
          entity_id: spell.spell_id,
          language_code: 'es',
          field_name: 'description',
          old_value: null, // Desde traducción automática mala
          new_value: finalDesc,
          translation_method: 'deepl',
          confidence_score: 0.95,
          status: 'pending'
        });

      if (editError) {
        console.error(`Error guardando edición: ${editError.message}`);
        failed++;
      } else {
        console.log('✓ Traducción guardada para revisión');
        translated++;
      }

      // Pausa para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 500));
    } else {
      console.log('✗ Error en traducción');
      failed++;
    }
  }

  console.log('\n' + '=' * 60);
  console.log('RESUMEN:');
  console.log(`Traducidos: ${translated}`);
  console.log(`Fallidos: ${failed}`);
  console.log('=' * 60);
  console.log('\n💡 Las traducciones están guardadas en translation_edits');
  console.log('   Usuarios con tier "translator" pueden revisarlas y aprobarlas');
}

// Si no hay API key, mostrar instrucciones
if (!deeplApiKey) {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║  ⚠️  DEEPL API KEY NO CONFIGURADA                        ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('Para usar traducción automática con DeepL:');
  console.log('');
  console.log('1. Obtén una clave API GRATUITA (500,000 chars/mes):');
  console.log('   → https://www.deepl.com/pro-api');
  console.log('');
  console.log('2. Regístrate y copia tu API key');
  console.log('');
  console.log('3. Agrega a .env.local:');
  console.log('   DEEPL_API_KEY=tu_clave_aqui');
  console.log('');
  console.log('4. Ejecuta de nuevo este script');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  process.exit(0);
}

translateSpellDescriptions().catch(console.error);
