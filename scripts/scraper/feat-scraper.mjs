#!/usr/bin/env node

/**
 * SCRAPER DE DOTES (FEATS) DE D&D 3.5
 *
 * Extrae todas las dotes del d20srd.org desde archivos HTML locales
 *
 * Salida: JSON con todas las dotes estructuradas
 */

import fs from 'fs';
import path from 'path';
import { load } from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diccionario de traducciones
const translations = {
  // Tipos de dotes
  'General': 'General',
  'Fighter Bonus Feat': 'Dote adicional de Guerrero',
  'Metamagic': 'Metamagia',
  'Item Creation': 'Creación de objetos',

  // Prerequisites comunes
  'None': 'Ninguno',
  'base attack bonus': 'bonificador base de ataque',
  'Str': 'Fue',
  'Dex': 'Des',
  'Con': 'Con',
  'Int': 'Int',
  'Wis': 'Sab',
  'Cha': 'Car',
};

// Función para traducir texto
function translate(text) {
  if (!text) return '';

  let translated = text;

  for (const [english, spanish] of Object.entries(translations)) {
    const regex = new RegExp(`\\b${english}\\b`, 'gi');
    translated = translated.replace(regex, spanish);
  }

  return translated;
}

// Función para limpiar texto
function cleanText(text) {
  if (!text) return '';
  return text.trim().replace(/\s+/g, ' ');
}

// Función para parsear prerequisites
function parsePrerequisites(prereqText) {
  if (!prereqText || prereqText.toLowerCase() === 'none') {
    return {
      feats: [],
      bab: null,
      abilities: {},
      skills: {},
      other: null
    };
  }

  const result = {
    feats: [],
    bab: null,
    abilities: {},
    skills: {},
    other: prereqText
  };

  // Extraer BAB (ej: "base attack bonus +4")
  const babMatch = prereqText.match(/base attack bonus \+(\d+)/i);
  if (babMatch) {
    result.bab = parseInt(babMatch[1]);
  }

  // Extraer habilidades (ej: "Str 13", "Dex 15")
  const abilityPattern = /(Str|Dex|Con|Int|Wis|Cha)\s+(\d+)/gi;
  let abilityMatch;
  while ((abilityMatch = abilityPattern.exec(prereqText)) !== null) {
    const ability = abilityMatch[1].toLowerCase();
    const score = parseInt(abilityMatch[2]);
    result.abilities[ability] = score;
  }

  // Extraer feats (nombres con mayúscula seguidos de coma o "and")
  // Esto es más difícil, por ahora dejamos en "other"

  return result;
}

// Función para parsear un archivo de dote
function parseFeatFile(filePath) {
  try {
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = load(html);

    // Extraer nombre de la dote (h1 o h2)
    let name = $('h1').first().text().trim();
    if (!name) {
      name = $('h2').first().text().trim();
    }

    if (!name) {
      console.warn(`⚠️  No se encontró nombre en ${path.basename(filePath)}`);
      return null;
    }

    // Inicializar datos
    const data = {
      name: name,
      type: 'General',
      prerequisites: 'None',
      benefit: '',
      normal: '',
      special: '',
      description: ''
    };

    // Buscar datos en la tabla statBlock (si existe)
    $('table.statBlock tr').each((i, row) => {
      const $row = $(row);
      const label = $row.find('th').text().trim().replace(':', '');
      const value = $row.find('td').text().trim();

      if (!label || !value) return;

      switch (label) {
        case 'Type':
          data.type = value;
          break;
        case 'Prerequisites':
        case 'Prerequisite':
          data.prerequisites = value;
          break;
      }
    });

    // Buscar secciones de texto
    let currentSection = '';

    $('p, b, strong, h3, h4').each((i, elem) => {
      const $elem = $(elem);
      const text = cleanText($elem.text());

      // Detectar encabezados de sección
      if ($elem.is('b') || $elem.is('strong') || $elem.is('h3') || $elem.is('h4')) {
        const lower = text.toLowerCase();
        if (lower.includes('benefit')) currentSection = 'benefit';
        else if (lower.includes('normal')) currentSection = 'normal';
        else if (lower.includes('special')) currentSection = 'special';
        else if (lower.includes('prerequisite')) currentSection = 'prerequisites';
        return;
      }

      // Agregar texto a la sección actual
      if ($elem.is('p') && text && currentSection) {
        if (currentSection === 'benefit') {
          data.benefit += (data.benefit ? '\n\n' : '') + text;
        } else if (currentSection === 'normal') {
          data.normal += (data.normal ? '\n\n' : '') + text;
        } else if (currentSection === 'special') {
          data.special += (data.special ? '\n\n' : '') + text;
        }
      }
    });

    // Si no encontramos benefit en secciones, tomar todos los párrafos
    if (!data.benefit) {
      const paragraphs = [];
      $('p').each((i, p) => {
        const text = cleanText($(p).text());
        if (text && !$(p).closest('.footer').length) {
          paragraphs.push(text);
        }
      });
      data.benefit = paragraphs.join('\n\n');
    }

    // Descripción general (resumen)
    data.description = data.benefit.substring(0, 200) + (data.benefit.length > 200 ? '...' : '');

    // Parsear prerequisites
    const parsed = parsePrerequisites(data.prerequisites);
    data.prerequisite_feats = parsed.feats;
    data.prerequisite_bab = parsed.bab;
    data.prerequisite_abilities = parsed.abilities;
    data.prerequisite_skills = parsed.skills;
    data.prerequisite_other = parsed.other;

    // Determinar categorías especiales
    data.is_metamagic = data.type.toLowerCase().includes('metamagic');
    data.is_item_creation = data.type.toLowerCase().includes('item creation');
    data.is_fighter_bonus = data.type.toLowerCase().includes('fighter');

    return data;

  } catch (error) {
    console.error(`❌ Error parseando ${path.basename(filePath)}:`, error.message);
    return null;
  }
}

// Función para parsear el archivo feats.html completo
function parseFeatsHtml(filePath) {
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = load(html);

  const feats = [];

  // Las dotes están en secciones con h3 para el nombre
  $('h3').each((i, heading) => {
    const $heading = $(heading);
    let name = cleanText($heading.text());

    if (!name || name.toLowerCase().includes('feat descriptions') || name.length === 0) {
      return; // Skip headers
    }

    // Extraer tipo del nombre (ej: "Acrobatic [General]" -> type = "General", name = "Acrobatic")
    let type = 'General';
    const typeMatch = name.match(/\[([^\]]+)\]/);
    if (typeMatch) {
      type = typeMatch[1];
      name = name.replace(/\s*\[([^\]]+)\]\s*/g, '').trim();
    }

    // Inicializar dote
    const feat = {
      name: name,
      type: type,
      prerequisites: 'None',
      benefit: '',
      normal: '',
      special: '',
      description: ''
    };

    // Buscar el siguiente contenido hasta el próximo h3
    let currentElem = $heading.next();
    let currentSection = '';

    while (currentElem.length && !currentElem.is('h3')) {
      const tagName = currentElem.prop('tagName')?.toLowerCase();
      const text = cleanText(currentElem.text());

      // Detectar secciones en h5 (estructura del HTML real)
      if (tagName === 'h5') {
        const lower = text.toLowerCase();
        if (lower.includes('benefit')) currentSection = 'benefit';
        else if (lower.includes('normal')) currentSection = 'normal';
        else if (lower.includes('special')) currentSection = 'special';
        else if (lower.includes('prerequisite')) currentSection = 'prerequisites';
      }

      // Detectar secciones en bold también (por si acaso)
      if (tagName === 'b' || tagName === 'strong') {
        const lower = text.toLowerCase();
        if (lower.includes('benefit')) currentSection = 'benefit';
        else if (lower.includes('normal')) currentSection = 'normal';
        else if (lower.includes('special')) currentSection = 'special';
        else if (lower.includes('prerequisite')) currentSection = 'prerequisites';
        else if (lower.includes('type') && text.includes(':')) {
          feat.type = text.split(':')[1].trim();
        }
      }

      // Capturar párrafos
      if (tagName === 'p' && text) {
        if (currentSection === 'benefit') {
          feat.benefit += (feat.benefit ? '\n\n' : '') + text;
        } else if (currentSection === 'normal') {
          feat.normal += (feat.normal ? '\n\n' : '') + text;
        } else if (currentSection === 'special') {
          feat.special += (feat.special ? '\n\n' : '') + text;
        } else if (currentSection === 'prerequisites') {
          feat.prerequisites = text;
        } else if (!currentSection) {
          // Si no hay sección, asumimos que es benefit
          feat.benefit += (feat.benefit ? '\n\n' : '') + text;
        }
      }

      currentElem = currentElem.next();
    }

    // Descripción general
    feat.description = feat.benefit.substring(0, 200) + (feat.benefit.length > 200 ? '...' : '');

    // Parsear prerequisites
    const parsed = parsePrerequisites(feat.prerequisites);
    feat.prerequisite_feats = parsed.feats;
    feat.prerequisite_bab = parsed.bab;
    feat.prerequisite_abilities = parsed.abilities;
    feat.prerequisite_skills = parsed.skills;
    feat.prerequisite_other = parsed.other;

    // Determinar categorías especiales
    feat.is_metamagic = feat.type.toLowerCase().includes('metamagic');
    feat.is_item_creation = feat.type.toLowerCase().includes('item creation');
    feat.is_fighter_bonus = feat.type.toLowerCase().includes('fighter');

    if (feat.benefit) {
      feats.push(feat);
    }
  });

  return feats;
}

// Función principal
async function main() {
  const featsFile = path.join('D:', 'CalabozosYDragones', 'scrap', 'SRD20', 'www.d20srd.org', 'srd', 'feats.html');
  const outputDir = path.join(__dirname, 'output');

  // Crear directorio de salida si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🔍 Leyendo archivo de dotes...');

  if (!fs.existsSync(featsFile)) {
    console.error(`❌ Error: No se encontró el archivo ${featsFile}`);
    console.log('💡 Asegúrate de tener los archivos scrapeados de d20srd.org');
    process.exit(1);
  }

  console.log('⚙️  Parseando dotes desde feats.html...\n');

  const feats = parseFeatsHtml(featsFile);
  const successCount = feats.length;
  const errorCount = 0;

  console.log(`\n✅ Parseado completado:`);
  console.log(`   - Exitosas: ${successCount}`);
  console.log(`   - Errores: ${errorCount}`);
  console.log(`   - Total: ${successCount}`);

  // Guardar JSON
  const jsonPath = path.join(outputDir, 'feats_complete.json');
  fs.writeFileSync(jsonPath, JSON.stringify(feats, null, 2));
  console.log(`\n💾 Guardado JSON: ${jsonPath}`);

  // Estadísticas
  console.log(`\n📊 Estadísticas:`);

  // Por tipo
  const byType = {};
  feats.forEach(feat => {
    const type = feat.type || 'Unknown';
    byType[type] = (byType[type] || 0) + 1;
  });
  console.log(`\n   Por Tipo:`);
  Object.entries(byType).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log(`      ${type}: ${count}`);
  });

  // Dotes especiales
  const metamagic = feats.filter(f => f.is_metamagic).length;
  const itemCreation = feats.filter(f => f.is_item_creation).length;
  const fighterBonus = feats.filter(f => f.is_fighter_bonus).length;

  console.log(`\n   Dotes Especiales:`);
  console.log(`      Metamagia: ${metamagic}`);
  console.log(`      Creación de objetos: ${itemCreation}`);
  console.log(`      Adicionales de Guerrero: ${fighterBonus}`);

  // Algunos ejemplos
  console.log(`\n🎯 Ejemplos de dotes parseadas:`);
  const examples = feats.slice(0, 3);
  examples.forEach(feat => {
    console.log(`\n   - ${feat.name} (${feat.type})`);
    console.log(`     Prerequisites: ${feat.prerequisites}`);
    console.log(`     Benefit: ${feat.benefit.substring(0, 100)}...`);
  });

  console.log(`\n✨ ¡Scraping completado!`);
}

main().catch(console.error);
