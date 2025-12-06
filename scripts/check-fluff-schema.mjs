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
