/**
 * Script v2 para agregar columna rank al SQL de deidades
 * Estrategia más simple: agregar rank justo después de alignment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputFile = path.join(__dirname, '..', 'supabase', 'migrate-deities-with-name-en.sql');
const outputFile = path.join(__dirname, '..', 'supabase', 'migrate-deities-with-rank-v2.sql');

console.log('🔄 Agregando columna rank al SQL (versión 2)...\n');

let sql = fs.readFileSync(inputFile, 'utf-8');

// Paso 1: Agregar 'rank' a la lista de columnas en INSERT
console.log('📝 Paso 1: Agregando rank a lista de columnas...');
sql = sql.replace(
  'slug, name_en, name_es, alignment,',
  'slug, name_en, name_es, alignment, rank,'
);

// Paso 2: Procesar cada INSERT por separado
console.log('📝 Paso 2: Agregando valores de rank en cada VALUES...\n');

// Encontrar todos los bloques INSERT...VALUES
const insertPattern = /INSERT INTO public\.deities[\s\S]*?\) VALUES \(([\s\S]*?)\) ON CONFLICT/g;
let matches = 0;

sql = sql.replace(insertPattern, (fullMatch, valuesContent) => {
  matches++;

  // Extraer los valores en orden
  const lines = valuesContent.trim().split('\n').map(l => l.trim());

  // Los primeros 4 valores son: slug, name_en, name_es, alignment
  // Línea 0: 'slug', 'Name', 'Name', 'ALIGNMENT',
  // Necesitamos agregar rank después de la coma de alignment

  if (lines.length > 0) {
    const firstLine = lines[0];

    // Buscar el patrón: 'XX', donde XX son 2 letras mayúsculas (alignment)
    const alignmentMatch = firstLine.match(/'([A-Z]{2})',/);

    if (alignmentMatch) {
      const alignment = alignmentMatch[1];

      // Determinar rank basado en los flags booleanos (están cerca del final)
      // Buscar las 4 líneas con true/false
      const boolLines = lines.filter(l => l === 'true,' || l === 'false,');

      if (boolLines.length >= 4) {
        const isMajor = boolLines[0] === 'true,';
        const isMinor = boolLines[1] === 'true,';
        const isDemigod = boolLines[2] === 'true,';
        const isPhilo = boolLines[3] === 'true,';

        let rank = 'lesser'; // default
        if (isMajor) rank = 'greater';
        else if (isMinor) rank = 'intermediate';
        else if (isDemigod) rank = 'lesser';
        else if (isPhilo) rank = 'philosophy';

        // Reemplazar la primera línea agregando rank
        lines[0] = firstLine.replace(
          `'${alignment}',`,
          `'${alignment}', '${rank}',`
        );

        console.log(`   ✓ Procesado: alignment=${alignment}, rank=${rank}`);
      }
    }
  }

  // Reconstruir el INSERT con las líneas modificadas
  const newValuesContent = lines.join('\n  ');
  return fullMatch.replace(valuesContent, newValuesContent);
});

fs.writeFileSync(outputFile, sql);

const stats = fs.statSync(outputFile);
console.log('\n✅ Archivo generado exitosamente:');
console.log('   📄 Ubicación:', outputFile);
console.log('   📊 Tamaño:', (stats.size / 1024).toFixed(1), 'KB');
console.log('   📝 Líneas:', sql.split('\n').length);
console.log('   🔢 Deidades procesadas:', matches);
