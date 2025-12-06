import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

// Load .env.local manually
const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.SUPABASE_SERVICE_ROLE_KEY
);

async function listAllGoods() {
  const { data, error } = await supabase
    .from('srd_items')
    .select('name, item_group, price_text')
    .eq('item_category', 'goods')
    .order('name');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('=== TODOS LOS ITEMS DE GOODS ===');
  console.log('Total:', data.length);
  console.log('');

  data.forEach((item, i) => {
    const num = (i + 1).toString().padStart(3, ' ');
    console.log(`${num}. ${item.name}`);
  });
}

listAllGoods();
