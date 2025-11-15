#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feats = JSON.parse(fs.readFileSync(path.join(__dirname, 'scraper', 'output', 'feats_complete.json'), 'utf-8'));

console.log(`Total: ${feats.length} dotes\n`);

console.log('Primeras 15 dotes:');
feats.slice(0, 15).forEach((f, i) => {
  console.log(`${i+1}. ${f.name} [${f.type}]`);
  console.log(`   Prereq: ${f.prerequisites.substring(0, 50)}...`);
});

// Buscar entries descriptivos
const descriptive = feats.filter(f =>
  f.name.toLowerCase().includes('feats') ||
  f.name.toLowerCase().includes('descriptions') ||
  f.benefit.toLowerCase().includes('this category') ||
  f.benefit.toLowerCase().includes('this designation')
);

if (descriptive.length > 0) {
  console.log(`\n⚠️  Entries descriptivos encontrados (${descriptive.length}):`);
  descriptive.forEach(f => console.log(`   - ${f.name}`));
}
