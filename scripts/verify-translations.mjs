#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('=== MUESTRA DE TRADUCCIONES ACTUALIZADAS ===\n');

const { data } = await supabase
  .from('spell_translations')
  .select('name, translation_status, translation_quality')
  .eq('language_code', 'es')
  .eq('translation_status', 'approved')
  .order('name')
  .limit(20);

data.forEach((spell, i) => {
  const stars = '*'.repeat(spell.translation_quality || 0);
  console.log(`${i + 1}. ${spell.name} [${stars}]`);
});

console.log(`\n=== ESTADISTICAS ===`);

const { data: stats } = await supabase
  .from('spell_translations')
  .select('translation_status, translation_quality')
  .eq('language_code', 'es');

const approved = stats.filter(s => s.translation_status === 'approved').length;
const pending = stats.filter(s => s.translation_status === 'pending').length;
const highQuality = stats.filter(s => s.translation_quality === 5).length;

console.log(`\nConjuros aprobados: ${approved}/${stats.length}`);
console.log(`Conjuros pendientes: ${pending}/${stats.length}`);
console.log(`Calidad maxima (5 estrellas): ${highQuality}/${stats.length}`);
console.log(`Porcentaje aprobado: ${((approved/stats.length)*100).toFixed(1)}%`);
