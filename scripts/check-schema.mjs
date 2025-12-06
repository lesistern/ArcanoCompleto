import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://akcuvlanpqpoizconuhm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrY3V2bGFucHFwb2l6Y29udWhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMTczMDAsImV4cCI6MjA3ODY5MzMwMH0.PGAmZHVfDsKg4O7qhUVoczlJFs4_C0sDrPf6VtFydNs'
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
