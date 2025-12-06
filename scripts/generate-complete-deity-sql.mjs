/**
 * Script para generar SQL completo de deidades con TODAS las columnas requeridas
 * Basado en el schema real de Supabase que requiere columnas *_en y *_es
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔄 Generando SQL completo con todas las columnas...\n');

// Leer el archivo SQL original
const originalFile = path.join(__dirname, '..', 'supabase', 'migrate-deities-initial.sql');
const outputFile = path.join(__dirname, '..', 'supabase', 'migrate-deities-complete.sql');

let sql = fs.readFileSync(originalFile, 'utf-8');

// Remover BEGIN y COMMIT
console.log('📝 Paso 1: Removiendo transacciones...');
sql = sql.split('\n').slice(5).join('\n'); // Remover primeras 5 líneas
sql = sql.split('\n').slice(0, -2).join('\n'); // Remover últimas 2 líneas

console.log('📝 Paso 2: Actualizando lista de columnas en cada INSERT...\n');

// Nueva lista de columnas completa
const newColumns = `slug, name_en, name_es, rank, alignment,
  titles_en, titles_es,
  portfolio_en, portfolio_es,
  description_en, description_es,
  worshipers_en, worshipers_es,
  home_plane_en, home_plane_es,
  symbol_en, symbol_es,
  favored_weapon, domains,
  is_major_deity, is_minor_deity, is_demigod, is_philosophy,
  tags, created_at, updated_at`;

// Reemplazar la lista de columnas antigua
sql = sql.replace(
  /slug, name_es, alignment, portfolio_es, description_es,\s+worshipers_es, favored_weapon, symbol_es,\s+is_major_deity, is_minor_deity, is_demigod, is_philosophy,\s+tags, created_at, updated_at/g,
  newColumns
);

console.log('📝 Paso 3: Generando valores para cada deidad...\n');

// Mapeo de datos conocidos (del SQL original, añadiremos las versiones EN)
// Para esta primera versión, duplicaremos los valores ES como EN (placeholder)

// Función para determinar rank desde flags
function getRank(isMajor, isMinor, isDemigod, isPhilo) {
  if (isMajor === 'true') return 'greater';
  if (isMinor === 'true') return 'intermediate';
  if (isDemigod === 'true') return 'lesser';
  if (isPhilo === 'true') return 'philosophy';
  return 'lesser';
}

// Regex para capturar cada INSERT completo
const insertPattern = /INSERT INTO public\.deities[\s\S]*?\) VALUES \(([\s\S]*?)\) ON CONFLICT/g;
let deityCount = 0;

sql = sql.replace(insertPattern, (fullMatch, valuesContent) => {
  deityCount++;

  // Parsear los valores actuales
  const lines = valuesContent.trim().split('\n').map(l => l.trim());

  // Extraer valores (en orden del SQL original)
  // Línea 0: 'slug', 'name_es', 'alignment',
  const match0 = lines[0].match(/'([^']+)',\s*'([^']+)',\s*'([A-Z]{2})',/);
  if (!match0) {
    console.warn(`⚠️  No se pudo parsear deidad en línea: ${lines[0]}`);
    return fullMatch;
  }

  const slug = match0[1];
  const nameEs = match0[2];
  const alignment = match0[3];

  // Líneas 1-3: portfolio_es, description_es, worshipers_es
  const portfolioEs = lines[1].replace(/'/g, '').replace(/,$/,  '').trim();
  const descriptionEs = lines[2].replace(/'/g, '').replace(/,$/,  '').trim();
  const worshipersEs = lines[3].replace(/'/g, '').replace(/,$/,  '').trim();

  // Línea 4: favored_weapon
  const favoredWeapon = lines[4].replace(/'/g, '').replace(/,$/,  '').trim();

  // Línea 5: symbol_es
  const symbolEs = lines[5].replace(/'/g, '').replace(/,$/,  '').trim();

  // Líneas 6-9: flags booleanos
  const isMajor = lines[6].replace(/,$/,  '').trim();
  const isMinor = lines[7].replace(/,$/,  '').trim();
  const isDemigod = lines[8].replace(/,$/,  '').trim();
  const isPhilo = lines[9].replace(/,$/,  '').trim();

  // Línea 10: tags (ARRAY)
  const tags = lines[10].replace(/,$/,  '').trim();

  // Calcular rank
  const rank = getRank(isMajor, isMinor, isDemigod, isPhilo);

  // Generar valores EN (por ahora, duplicar ES)
  const nameEn = nameEs;
  const titlesEn = ''; // Vacío por ahora
  const titlesEs = '';
  const portfolioEn = portfolioEs; // TODO: Traducir
  const descriptionEn = descriptionEs; // TODO: Traducir
  const worshipersEn = worshipersEs; // TODO: Traducir
  const homePlaneEn = 'Unknown'; // Default
  const homePlaneEs = 'Desconocido';
  const symbolEn = symbolEs; // TODO: Traducir

  // Construir nuevo VALUES
  const newValues = `  '${slug}',
  '${nameEn}', '${nameEs}',
  '${rank}',
  '${alignment}',
  '${titlesEn}', '${titlesEs}',
  '${portfolioEn}', '${portfolioEs}',
  '${descriptionEn}', '${descriptionEs}',
  '${worshipersEn}', '${worshipersEs}',
  '${homePlaneEn}', '${homePlaneEs}',
  '${symbolEn}', '${symbolEs}',
  '${favoredWeapon}',
  NULL, -- domains (será llenado por deity_domains)
  ${isMajor}, ${isMinor}, ${isDemigod}, ${isPhilo},
  ${tags},
  NOW(), NOW()`;

  console.log(`   ✓ ${deityCount}. ${nameEs} (${rank}, ${alignment})`);

  return `INSERT INTO public.deities (\n  ${newColumns}\n) VALUES (\n${newValues}\n) ON CONFLICT`;
});

fs.writeFileSync(outputFile, sql);

const stats = fs.statSync(outputFile);
console.log('\n✅ Archivo generado exitosamente:');
console.log('   📄 Ubicación:', outputFile);
console.log('   📊 Tamaño:', (stats.size / 1024).toFixed(1), 'KB');
console.log('   📝 Líneas:', sql.split('\n').length);
console.log('   🔢 Deidades procesadas:', deityCount);
console.log('\n⚠️  Nota: Valores EN son duplicados de ES (placeholder para traducción futura)');
