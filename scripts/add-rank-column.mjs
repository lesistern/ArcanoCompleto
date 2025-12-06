/**
 * Script para agregar columna rank al SQL de deidades
 * Basado en los flags is_major_deity, is_minor_deity, is_demigod, is_philosophy
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputFile = path.join(__dirname, '..', 'supabase', 'migrate-deities-with-name-en.sql');
const outputFile = path.join(__dirname, '..', 'supabase', 'migrate-deities-with-rank.sql');

console.log('🔄 Agregando columna rank al SQL...\n');

const sql = fs.readFileSync(inputFile, 'utf-8');

// Paso 1: Agregar 'rank' a la lista de columnas
console.log('📝 Paso 1: Agregando rank a lista de columnas...');
const sqlWithRankColumn = sql.replace(
  /slug, name_en, name_es, alignment/g,
  'slug, name_en, name_es, rank, alignment'
);

// Paso 2: Agregar valor de rank después del alignment
console.log('📝 Paso 2: Calculando valores de rank basados en flags...');

// Regex para capturar alignment y los 4 flags booleanos
const sqlWithRankValues = sqlWithRankColumn.replace(
  /'([A-Z]{2})',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(true|false),\s*(true|false),\s*(true|false),\s*(true|false),/g,
  (match, alignment, portfolio, desc, worshipers, weapon, symbol, isMajor, isMinor, isDemigod, isPhilo) => {
    let rank = 'lesser'; // default

    if (isMajor === 'true') {
      rank = 'greater';
    } else if (isMinor === 'true') {
      rank = 'intermediate';
    } else if (isDemigod === 'true') {
      rank = 'lesser';
    } else if (isPhilo === 'true') {
      rank = 'philosophy';
    }

    // Reconstruir la línea con rank insertado después de alignment
    return `'${alignment}', '${rank}', '${portfolio}', '${desc}', '${worshipers}', '${weapon}', '${symbol}', ${isMajor}, ${isMinor}, ${isDemigod}, ${isPhilo},`;
  }
);

fs.writeFileSync(outputFile, sqlWithRankValues);

const stats = fs.statSync(outputFile);
console.log('\n✅ Archivo generado exitosamente:');
console.log('   📄 Ubicación:', outputFile);
console.log('   📊 Tamaño:', (stats.size / 1024).toFixed(1), 'KB');
console.log('   📝 Líneas:', sqlWithRankValues.split('\n').length);
console.log('\n🔍 Valores de rank asignados:');
console.log('   - greater: para is_major_deity = true');
console.log('   - intermediate: para is_minor_deity = true');
console.log('   - lesser: para is_demigod = true (default)');
console.log('   - philosophy: para is_philosophy = true');
