import fs from 'fs';
import path from 'path';
import { load } from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diccionario de traducciones
const translations = {
  // Schools of Magic
  'Abjuration': 'Abjuración',
  'Conjuration': 'Conjuración',
  'Divination': 'Adivinación',
  'Enchantment': 'Encantamiento',
  'Evocation': 'Evocación',
  'Illusion': 'Ilusión',
  'Necromancy': 'Nigromancia',
  'Transmutation': 'Transmutación',
  'Universal': 'Universal',

  // Subschools
  'Calling': 'Llamada',
  'Creation': 'Creación',
  'Healing': 'Curación',
  'Summoning': 'Convocación',
  'Teleportation': 'Teletransportación',
  'Scrying': 'Adivinación',
  'Charm': 'Hechizo',
  'Compulsion': 'Compulsión',
  'Figment': 'Engaño',
  'Glamer': 'Glamour',
  'Pattern': 'Patrón',
  'Phantasm': 'Fantasma',
  'Shadow': 'Sombra',

  // Descriptors
  'Acid': 'Ácido',
  'Air': 'Aire',
  'Chaotic': 'Caótico',
  'Cold': 'Frío',
  'Darkness': 'Oscuridad',
  'Death': 'Muerte',
  'Earth': 'Tierra',
  'Electricity': 'Electricidad',
  'Evil': 'Maligno',
  'Fear': 'Miedo',
  'Fire': 'Fuego',
  'Force': 'Fuerza',
  'Good': 'Bondadoso',
  'Language-Dependent': 'Dependiente del Lenguaje',
  'Lawful': 'Legal',
  'Light': 'Luz',
  'Mind-Affecting': 'Afecta la Mente',
  'Sonic': 'Sónico',
  'Water': 'Agua',

  // Components
  'V': 'V', // Verbal
  'S': 'S', // Somático
  'M': 'M', // Material
  'F': 'F', // Foco
  'DF': 'FD', // Foco Divino
  'XP': 'XP', // Puntos de Experiencia

  // Common terms
  'Level': 'Nivel',
  'Components': 'Componentes',
  'Casting Time': 'Tiempo de Lanzamiento',
  'Range': 'Alcance',
  'Target': 'Objetivo',
  'Area': 'Área',
  'Effect': 'Efecto',
  'Duration': 'Duración',
  'Saving Throw': 'Tirada de Salvación',
  'Spell Resistance': 'Resistencia a Conjuros',
  'Material Component': 'Componente Material',
  'Focus': 'Foco',
  'Arcane Focus': 'Foco Arcano',
  'Divine Focus': 'Foco Divino',
  'XP Cost': 'Coste de PX',

  // Classes
  'Sor/Wiz': 'Hechicero/Mago',
  'Brd': 'Bardo',
  'Clr': 'Clérigo',
  'Drd': 'Druida',
  'Pal': 'Paladín',
  'Rgr': 'Explorador',

  // Ranges
  'Personal': 'Personal',
  'Touch': 'Toque',
  'Close': 'Cercano',
  'Medium': 'Medio',
  'Long': 'Largo',
  'Unlimited': 'Ilimitado',

  // Durations
  'Instantaneous': 'Instantáneo',
  'Permanent': 'Permanente',
  'Concentration': 'Concentración',

  // Saving Throws
  'None': 'Ninguna',
  'Will': 'Voluntad',
  'Fortitude': 'Fortaleza',
  'Reflex': 'Reflejos',
  'negates': 'anula',
  'partial': 'parcial',
  'half': 'mitad',
  'disbelief': 'incredulidad',

  // Spell Resistance
  'Yes': 'Sí',
  'No': 'No',
};

// Función para traducir texto
function translate(text) {
  if (!text) return '';

  let translated = text;

  // Traducir palabras completas
  for (const [english, spanish] of Object.entries(translations)) {
    const regex = new RegExp(`\\b${english}\\b`, 'gi');
    translated = translated.replace(regex, spanish);
  }

  return translated;
}

// Función para limpiar texto (eliminar HTML extra)
function cleanText(text) {
  if (!text) return '';
  return text.trim().replace(/\s+/g, ' ');
}

// Función para extraer el nivel del conjuro
function extractSpellLevel(levelText) {
  if (!levelText) return null;

  // Buscar patrones como "Sor/Wiz 3", "Clr 5", etc.
  const levels = {};
  const patterns = [
    { class: 'sorcerer', regex: /Sor\/Wiz\s+(\d+)/ },
    { class: 'wizard', regex: /Sor\/Wiz\s+(\d+)/ },
    { class: 'cleric', regex: /Clr\s+(\d+)/ },
    { class: 'druid', regex: /Drd\s+(\d+)/ },
    { class: 'bard', regex: /Brd\s+(\d+)/ },
    { class: 'paladin', regex: /Pal\s+(\d+)/ },
    { class: 'ranger', regex: /Rgr\s+(\d+)/ },
  ];

  for (const pattern of patterns) {
    const match = levelText.match(pattern.regex);
    if (match) {
      levels[pattern.class] = parseInt(match[1]);
    }
  }

  return levels;
}

// Función para parsear un archivo de conjuro
function parseSpellFile(filePath) {
  try {
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = load(html);

    // Extraer nombre del conjuro
    const name = $('h1').first().text().trim();
    if (!name) {
      console.warn(`⚠️  No se encontró nombre en ${filePath}`);
      return null;
    }

    // Extraer school y descriptors del h4
    const schoolText = $('h4').first().text().trim();
    let school = '';
    let subschool = '';
    let descriptors = [];

    if (schoolText) {
      // Extraer school (primera palabra)
      const schoolMatch = schoolText.match(/^(\w+)/);
      if (schoolMatch) {
        school = translate(schoolMatch[1]);
      }

      // Extraer subschool si existe (entre paréntesis)
      const subschoolMatch = schoolText.match(/\(([^)]+)\)/);
      if (subschoolMatch && !subschoolMatch[1].includes('[')) {
        subschool = translate(subschoolMatch[1]);
      }

      // Extraer descriptors (entre corchetes)
      const descriptorMatches = schoolText.match(/\[([^\]]+)\]/g);
      if (descriptorMatches) {
        descriptors = descriptorMatches.map(d =>
          translate(d.replace(/[\[\]]/g, ''))
        );
      }
    }

    // Extraer datos de la tabla
    const data = {
      name: name,
      name_es: name, // TODO: Traducir después
      school: school,
      subschool: subschool || null,
      descriptors: descriptors.length > 0 ? descriptors : null,
      level: null,
      components: null,
      casting_time: null,
      range: null,
      target: null,
      area: null,
      effect: null,
      duration: null,
      saving_throw: null,
      spell_resistance: null,
      description: '',
      material_component: null,
      focus: null,
      xp_cost: null,
    };

    // Extraer datos de la tabla statBlock
    $('table.statBlock tr').each((i, row) => {
      const $row = $(row);
      const label = $row.find('th').text().trim().replace(':', '');
      const value = $row.find('td').text().trim();

      if (!label || !value) return;

      switch (label) {
        case 'Level':
          data.level = extractSpellLevel(value);
          break;
        case 'Components':
          data.components = value.split(',').map(c => c.trim());
          break;
        case 'Casting Time':
          data.casting_time = translate(value);
          break;
        case 'Range':
          data.range = translate(value);
          break;
        case 'Target':
        case 'Targets':
          data.target = translate(value);
          break;
        case 'Area':
          data.area = translate(value);
          break;
        case 'Effect':
          data.effect = translate(value);
          break;
        case 'Duration':
          data.duration = translate(value);
          break;
        case 'Saving Throw':
          data.saving_throw = translate(value);
          break;
        case 'Spell Resistance':
          data.spell_resistance = translate(value);
          break;
      }
    });

    // Extraer descripción (todos los párrafos antes del footer)
    const descriptionParagraphs = [];
    $('p').each((i, p) => {
      const $p = $(p);
      // Ignorar párrafos dentro del footer
      if ($p.closest('.footer').length > 0) return;

      const text = cleanText($p.text());
      if (text) {
        descriptionParagraphs.push(text);
      }
    });

    // La descripción principal son los primeros párrafos
    // Los últimos pueden ser Material Component, Focus, etc.
    let mainDescription = [];
    for (const para of descriptionParagraphs) {
      if (para.toLowerCase().includes('material component')) {
        data.material_component = para.replace(/Material Component:?\s*/i, '').trim();
      } else if (para.toLowerCase().includes('arcane focus')) {
        data.focus = para.replace(/Arcane Focus:?\s*/i, '').trim();
      } else if (para.toLowerCase().includes('focus')) {
        data.focus = para.replace(/Focus:?\s*/i, '').trim();
      } else if (para.toLowerCase().includes('xp cost')) {
        data.xp_cost = para.replace(/XP Cost:?\s*/i, '').trim();
      } else {
        mainDescription.push(para);
      }
    }

    data.description = mainDescription.join('\n\n');

    // Verificar que tengamos datos mínimos
    if (!data.school) {
      console.warn(`⚠️  ${name}: No se encontró escuela de magia`);
    }

    return data;

  } catch (error) {
    console.error(`❌ Error parseando ${filePath}:`, error.message);
    return null;
  }
}

// Función principal
async function main() {
  const spellsDir = path.join('D:', 'CalabozosYDragones', 'scrap', 'SRD20', 'www.d20srd.org', 'srd', 'spells');
  const outputDir = path.join(__dirname, 'output');

  // Crear directorio de salida si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🔍 Buscando archivos de conjuros...');

  // Leer todos los archivos HTML del directorio de spells
  const files = fs.readdirSync(spellsDir)
    .filter(file => file.endsWith('.html') || file.endsWith('.htm'))
    .filter(file => file !== 'index.html' && file !== 'index.htm');

  console.log(`📚 Encontrados ${files.length} archivos de conjuros`);
  console.log('⚙️  Parseando conjuros...\n');

  const spells = [];
  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const filePath = path.join(spellsDir, file);
    const spell = parseSpellFile(filePath);

    if (spell) {
      spells.push(spell);
      successCount++;
      if (successCount % 50 === 0) {
        console.log(`   ✅ Procesados ${successCount} conjuros...`);
      }
    } else {
      errorCount++;
    }
  }

  console.log(`\n✅ Parseado completado:`);
  console.log(`   - Exitosos: ${successCount}`);
  console.log(`   - Errores: ${errorCount}`);
  console.log(`   - Total: ${files.length}`);

  // Guardar JSON
  const jsonPath = path.join(outputDir, 'spells_complete.json');
  fs.writeFileSync(jsonPath, JSON.stringify(spells, null, 2));
  console.log(`\n💾 Guardado JSON: ${jsonPath}`);

  // Estadísticas
  console.log(`\n📊 Estadísticas:`);

  // Por escuela
  const bySchool = {};
  spells.forEach(spell => {
    if (spell.school) {
      bySchool[spell.school] = (bySchool[spell.school] || 0) + 1;
    }
  });
  console.log(`\n   Por Escuela:`);
  Object.entries(bySchool).sort((a, b) => b[1] - a[1]).forEach(([school, count]) => {
    console.log(`      ${school}: ${count}`);
  });

  // Por nivel de Hechicero/Mago
  const byLevel = {};
  spells.forEach(spell => {
    if (spell.level && spell.level.sorcerer) {
      const level = spell.level.sorcerer;
      byLevel[level] = (byLevel[level] || 0) + 1;
    } else if (spell.level && spell.level.wizard) {
      const level = spell.level.wizard;
      byLevel[level] = (byLevel[level] || 0) + 1;
    }
  });
  console.log(`\n   Por Nivel (Hechicero/Mago):`);
  Object.keys(byLevel).sort().forEach(level => {
    console.log(`      Nivel ${level}: ${byLevel[level]}`);
  });

  // Algunos ejemplos
  console.log(`\n🎯 Ejemplos de conjuros parseados:`);
  const examples = spells.slice(0, 3);
  examples.forEach(spell => {
    console.log(`\n   - ${spell.name} (${spell.school})`);
    if (spell.level) {
      const levels = Object.entries(spell.level).map(([cls, lvl]) => `${cls} ${lvl}`).join(', ');
      console.log(`     Niveles: ${levels}`);
    }
    console.log(`     Componentes: ${spell.components ? spell.components.join(', ') : 'N/A'}`);
    console.log(`     Descripción: ${spell.description.substring(0, 100)}...`);
  });

  console.log(`\n✨ ¡Scraping completado!`);
}

main().catch(console.error);
