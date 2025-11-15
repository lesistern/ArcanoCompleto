#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'scraper', 'output', 'spells_complete.json');
const spells = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// Buscar conjuros sin escuela
const invalid = spells.filter(s => !s.school || s.school === '' || s.school === 'Unknown');

console.log(`\n📊 Total de conjuros: ${spells.length}`);
console.log(`❌ Conjuros sin escuela válida: ${invalid.length}\n`);

if (invalid.length > 0) {
  console.log('Conjuros inválidos que serán filtrados:');
  invalid.forEach(s => {
    console.log(`  - "${s.name}" (school: ${s.school || 'NULL'})`);
  });

  // Filtrar conjuros válidos
  const valid = spells.filter(s => s.school && s.school !== '' && s.school !== 'Unknown');

  console.log(`\n✅ Conjuros válidos: ${valid.length}`);

  // Guardar versión limpia
  const cleanPath = path.join(__dirname, 'scraper', 'output', 'spells_clean.json');
  fs.writeFileSync(cleanPath, JSON.stringify(valid, null, 2));
  console.log(`💾 Guardado: ${cleanPath}`);
} else {
  console.log('✅ Todos los conjuros tienen escuela válida');
}
