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

async function checkMissingSpells() {
  console.log('🔍 Buscando hechizos problemáticos...\n');

  // Hechizos sin descripción
  const { data: noDesc, error: e1 } = await supabase
    .from('spells')
    .select('slug, name, school')
    .is('description', null);

  if (noDesc && noDesc.length > 0) {
    console.log('⚠️  Hechizos sin descripción:');
    noDesc.forEach(s => console.log(`   - ${s.name} (${s.slug})`));
  }

  // Hechizos sin duration
  const { data: noDuration, error: e2 } = await supabase
    .from('spells')
    .select('slug, name, school')
    .is('duration', null);

  if (noDuration && noDuration.length > 0) {
    console.log('\n⚠️  Hechizos sin duration:');
    noDuration.forEach(s => console.log(`   - ${s.name} (${s.slug})`));
  }

  // Hechizos sin casting_time
  const { data: noCasting, error: e3 } = await supabase
    .from('spells')
    .select('slug, name, school')
    .is('casting_time', null);

  if (noCasting && noCasting.length > 0) {
    console.log('\n⚠️  Hechizos sin casting_time:');
    noCasting.forEach(s => console.log(`   - ${s.name} (${s.slug})`));
  }

  // Total count
  const { count } = await supabase
    .from('spells')
    .select('*', { count: 'exact', head: true });

  console.log(`\n📊 Total de hechizos en base de datos: ${count}`);
  console.log('📋 Esperado según comentario SQL: 608');
  console.log(`❓ Diferencia: ${608 - count} hechizos`);
}

checkMissingSpells().catch(console.error);
