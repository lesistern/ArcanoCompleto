/**
 * Script simple para agregar columnas faltantes al SQL de deidades
 * Estrategia: Procesar línea por línea y reconstruir INSERT completo
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputFile = path.join(__dirname, '..', 'supabase', 'migrate-deities-initial.sql');
const outputFile = path.join(__dirname, '..', 'supabase', 'migrate-deities-final.sql');

console.log('🔄 Procesando SQL de deidades...\n');

const lines = fs.readFileSync(inputFile, 'utf-8').split('\n');
const output = [];

let inInsert = false;
let insertData = {};
let lineNum = 0;
let deityCount = 0;

for (const line of lines) {
  lineNum++;

  // Skip header y BEGIN
  if (lineNum <= 5) continue;

  // Skip COMMIT al final
  if (line.trim() === 'COMMIT;') continue;
  if (line.trim().startsWith('-- Verificación')) continue;

  // Detectar inicio de INSERT de deidad
  if (line.includes('INSERT INTO public.deities')) {
    inInsert = true;
    insertData = { domains: [] };
    continue;
  }

  // Detectar lista de columnas (skip)
  if (inInsert && line.includes('slug, name_es, alignment')) {
    continue;
  }

  // Detectar inicio de VALUES
  if (inInsert && line.includes(') VALUES (')) {
    continue;
  }

  // Detectar final del INSERT de deidad
  if (inInsert && line.includes(') ON CONFLICT (slug) DO NOTHING;')) {
    inInsert = false;
    deityCount++;

    // Generar INSERT completo con todas las columnas
    const rank = insertData.isMajor ? 'greater' :
                 insertData.isMinor ? 'intermediate' :
                 insertData.isDemigod ? 'lesser' :
                 insertData.isPhilo ? 'philosophy' : 'lesser';

    output.push(`INSERT INTO public.deities (`);
    output.push(`  slug, name_en, name_es, rank, alignment,`);
    output.push(`  titles_en, titles_es,`);
    output.push(`  portfolio_en, portfolio_es,`);
    output.push(`  description_en, description_es,`);
    output.push(`  worshipers_en, worshipers_es,`);
    output.push(`  home_plane_en, home_plane_es,`);
    output.push(`  symbol_en, symbol_es,`);
    output.push(`  favored_weapon, domains,`);
    output.push(`  is_major_deity, is_minor_deity, is_demigod, is_philosophy,`);
    output.push(`  tags, created_at, updated_at`);
    output.push(`) VALUES (`);
    output.push(`  '${insertData.slug}',`);
    output.push(`  '${insertData.nameEs}', '${insertData.nameEs}',`); // name_en = name_es
    output.push(`  '${rank}',`);
    output.push(`  '${insertData.alignment}',`);
    output.push(`  '', '',`); // titles vacíos por ahora
    output.push(`  '${insertData.portfolioEs}', '${insertData.portfolioEs}',`); // portfolio_en = portfolio_es
    output.push(`  '${insertData.descriptionEs.replace(/'/g, "''")}', '${insertData.descriptionEs.replace(/'/g, "''")}',`); // Escapar comillas
    output.push(`  '${insertData.worshipersEs}', '${insertData.worshipersEs}',`);
    output.push(`  'Unknown', 'Desconocido',`); // home_plane default
    output.push(`  '${insertData.symbolEs}', '${insertData.symbolEs}',`);
    output.push(`  '${insertData.favoredWeapon}',`);
    output.push(`  ARRAY[]::TEXT[],`); // domains (array vacío, llenado por deity_domains)
    output.push(`  ${insertData.isMajor}, ${insertData.isMinor}, ${insertData.isDemigod}, ${insertData.isPhilo},`);
    output.push(`  ${insertData.tags},`);
    output.push(`  NOW(), NOW()`);
    output.push(`) ON CONFLICT (slug) DO NOTHING;`);

    console.log(`   ✓ ${deityCount}. ${insertData.nameEs} (${rank})`);
    continue;
  }

  // Si estamos dentro de un INSERT, capturar valores
  if (inInsert) {
    const trimmed = line.trim().replace(/,$/g, '');

    // Detectar cada campo por posición/patrón
    if (trimmed.startsWith("'") && !insertData.slug) {
      insertData.slug = trimmed.replace(/'/g, '');
    } else if (trimmed.startsWith("'") && !insertData.nameEs) {
      insertData.nameEs = trimmed.replace(/'/g, '');
    } else if (trimmed.match(/^'[A-Z]{2}'$/)) {
      insertData.alignment = trimmed.replace(/'/g, '');
    } else if (trimmed.startsWith("'") && !insertData.portfolioEs) {
      insertData.portfolioEs = trimmed.replace(/'/g, '');
    } else if (trimmed.startsWith("'") && !insertData.descriptionEs) {
      insertData.descriptionEs = trimmed.replace(/^'/, '').replace(/'$/, '');
    } else if (trimmed.startsWith("'") && !insertData.worshipersEs) {
      insertData.worshipersEs = trimmed.replace(/'/g, '');
    } else if (trimmed.startsWith("'") && !insertData.favoredWeapon) {
      insertData.favoredWeapon = trimmed.replace(/'/g, '');
    } else if (trimmed.startsWith("'") && !insertData.symbolEs) {
      insertData.symbolEs = trimmed.replace(/'/g, '');
    } else if (trimmed === 'true' || trimmed === 'false') {
      if (!('isMajor' in insertData)) insertData.isMajor = trimmed === 'true';
      else if (!('isMinor' in insertData)) insertData.isMinor = trimmed === 'true';
      else if (!('isDemigod' in insertData)) insertData.isDemigod = trimmed === 'true';
      else if (!('isPhilo' in insertData)) insertData.isPhilo = trimmed === 'true';
    } else if (trimmed.startsWith('ARRAY[')) {
      insertData.tags = trimmed;
    } else if (trimmed === 'NOW()') {
      // Skip timestamps
    }
    continue;
  }

  // Detectar INSERT de deity_domains y pasarlo tal cual
  if (line.includes('INSERT INTO public.deity_domains')) {
    output.push(line);
    continue;
  }

  // Pasar otras líneas tal cual (SELECT, ON CONFLICT de domains)
  if (!line.includes('INSERT INTO public.deities') && line.trim()) {
    output.push(line);
  }
}

fs.writeFileSync(outputFile, output.join('\n'));

const stats = fs.statSync(outputFile);
console.log('\n✅ Archivo generado exitosamente:');
console.log('   📄 Ubicación:', outputFile);
console.log('   📊 Tamaño:', (stats.size / 1024).toFixed(1), 'KB');
console.log('   📝 Líneas:', output.length);
console.log('   🔢 Deidades procesadas:', deityCount);
console.log('\n⚠️  Nota: Valores *_en duplicados de *_es (placeholder)');
