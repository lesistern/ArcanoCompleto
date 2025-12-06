import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY is missing in .env');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://akcuvlanpqpoizconuhm.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  // Check classes table structure
  console.log('=== Classes Table ===');
  const { data: classes, error: classesError } = await supabase.from('classes').select('*').limit(1);
  if (classesError) {
    console.error('Error:', classesError.message);
  } else if (classes && classes[0]) {
    console.log('Columnas disponibles:');
    for (const key of Object.keys(classes[0])) {
      console.log(`  - ${key}`);
    }
  }

  // Check class_progression table structure
  console.log('\n=== Class Progression Table ===');
  const { data: prog, error: progError } = await supabase.from('class_progression').select('*').limit(1);
  if (progError) {
    console.error('Error:', progError.message);
  } else if (prog && prog[0]) {
    console.log('Columnas disponibles:');
    for (const key of Object.keys(prog[0])) {
      console.log(`  - ${key}`);
    }
  }

  // Check class_fluff table structure
  console.log('\n=== Class Fluff Table ===');
  const { data: fluff, error: fluffError } = await supabase.from('class_fluff').select('*').limit(1);
  if (fluffError) {
    console.error('Error:', fluffError.message);
  } else if (fluff && fluff[0]) {
    console.log('Columnas disponibles:');
    for (const key of Object.keys(fluff[0])) {
      console.log(`  - ${key}`);
    }
  }
}

run().catch(console.error);
