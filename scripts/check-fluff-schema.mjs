import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://akcuvlanpqpoizconuhm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrY3V2bGFucHFwb2l6Y29udWhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMTczMDAsImV4cCI6MjA3ODY5MzMwMH0.PGAmZHVfDsKg4O7qhUVoczlJFs4_C0sDrPf6VtFydNs'
);

const { data, error } = await supabase.from('class_fluff').select('*').limit(1);

if (error) {
  console.error('Error:', error);
} else if (data && data[0]) {
  console.log('Estructura de class_fluff:');
  for (const [key, value] of Object.entries(data[0])) {
    const type = Array.isArray(value) ? 'ARRAY' : typeof value;
    console.log(`  ${key}: ${type} = ${JSON.stringify(value)?.substring(0, 80)}...`);
  }
}
