#!/usr/bin/env node

/**
 * Script de traducción automática de hechizos D&D 3.5
 * Usa terminología oficial en español
 */

import { SPELL_TERMINOLOGY, TRANSLATION_RULES } from './dnd-terminology.mjs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Traduce un texto aplicando el diccionario de terminología
 */
function translateText(text) {
  if (!text) return text;

  let translated = text;

  // Aplicar reemplazos del diccionario (ordenados por longitud para evitar conflictos)
  const terms = Object.entries(SPELL_TERMINOLOGY)
    .sort((a, b) => b[0].length - a[0].length);

  for (const [english, spanish] of terms) {
    // Crear regex que respete mayúsculas solo al inicio de oración
    const regex = new RegExp(
      `\\b${english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
      'gi'
    );

    translated = translated.replace(regex, (match) => {
      // Si la palabra original empieza con mayúscula, mantener mayúscula
      if (match[0] === match[0].toUpperCase()) {
        return spanish.charAt(0).toUpperCase() + spanish.slice(1);
      }
      return spanish;
    });
  }

  return translated;
}

/**
 * Mejora la traducción con post-procesamiento
 */
function postProcess(text) {
  if (!text) return text;

  let processed = text;

  // Corregir artículos
  processed = processed.replace(/\bel la\b/gi, 'la');
  processed = processed.replace(/\bla el\b/gi, 'el');
  processed = processed.replace(/\bun una\b/gi, 'una');
  processed = processed.replace(/\buna un\b/gi, 'un');

  // Corregir duplicaciones comunes
  processed = processed.replace(/\b(\w+)\s+\1\b/gi, '$1');

  // Mejorar puntuación después de números
  processed = processed.replace(/(\d+)\s+\./g, '$1.');
  processed = processed.replace(/(\d+)\s+,/g, '$1,');

  // Espaciado correcto
  processed = processed.replace(/\s+/g, ' ');
  processed = processed.replace(/\s+\./g, '.');
  processed = processed.replace(/\s+,/g, ',');

  return processed.trim();
}

/**
 * Traduce todos los hechizos del archivo JSON
 */
async function translateSpells() {
  console.log('🌐 Traduciendo hechizos al español...\n');

  // Leer archivo de hechizos
  const inputPath = join(__dirname, 'output', 'spells-to-translate.json');
  const content = await fs.readFile(inputPath, 'utf-8');
  const spells = JSON.parse(content);

  console.log(`📋 Hechizos a traducir: ${spells.length}\n`);

  let translated = 0;
  let skipped = 0;

  // Traducir cada hechizo
  for (const spell of spells) {
    if (!spell.description) {
      skipped++;
      continue;
    }

    // Traducir descripción
    const translatedDesc = translateText(spell.description);
    const processedDesc = postProcess(translatedDesc);

    // Agregar campo traducido
    spell.description_es = processedDesc;

    // Traducir otros campos opcionales
    if (spell.casting_time) {
      spell.casting_time_es = translateText(spell.casting_time);
    }
    if (spell.range_info) {
      spell.range_info_es = translateText(spell.range_info);
    }
    if (spell.duration) {
      spell.duration_es = translateText(spell.duration);
    }
    if (spell.saving_throw) {
      spell.saving_throw_es = translateText(spell.saving_throw);
    }
    if (spell.spell_resistance) {
      spell.spell_resistance_es = translateText(spell.spell_resistance);
    }

    translated++;

    // Mostrar progreso cada 50 hechizos
    if (translated % 50 === 0) {
      console.log(`   ✅ ${translated} hechizos traducidos...`);
    }
  }

  // Guardar resultado
  const outputPath = join(__dirname, 'output', 'spells-translated.json');
  await fs.writeFile(outputPath, JSON.stringify(spells, null, 2));

  console.log('\n' + '='.repeat(60));
  console.log('✅ TRADUCCIÓN COMPLETADA');
  console.log('='.repeat(60));
  console.log(`Traducidos:   ${translated}`);
  console.log(`Omitidos:     ${skipped}`);
  console.log(`Archivo:      ${outputPath}`);
  console.log('='.repeat(60));

  // Mostrar muestra de 3 traducciones
  console.log('\n📝 MUESTRA DE TRADUCCIONES:\n');
  const samples = spells.filter(s => s.description_es).slice(0, 3);
  for (const sample of samples) {
    console.log(`🔹 ${sample.name}`);
    console.log(`   Original:  ${sample.description.substring(0, 80)}...`);
    console.log(`   Traducido: ${sample.description_es.substring(0, 80)}...`);
    console.log('');
  }

  console.log('\n💡 SIGUIENTE PASO:');
  console.log('   node scripts/import-translated-spells.mjs');
  console.log('   (Importará las traducciones a Supabase)');
}

// Ejecutar
translateSpells().catch(console.error);
