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

async function verifySearingLight() {
  console.log('🔍 Verificando Searing Light...\n');

  const { data, error } = await supabase
    .from('spells')
    .select('*')
    .eq('slug', 'searing-light')
    .single();

  if (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  console.log('📋 Searing Light:');
  console.log(`   Nombre: ${data.name}`);
  console.log(`   Escuela: ${data.school}`);
  console.log(`   Descripción: ${data.description ? '✅ Presente' : '❌ NULL'}`);

  if (data.description) {
    console.log(`\n📝 Descripción completa:`);
    console.log(`   ${data.description.substring(0, 150)}...`);
    console.log(`\n   Longitud: ${data.description.length} caracteres`);
  }
}

verifySearingLight().catch(console.error);
