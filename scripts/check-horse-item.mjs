import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

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

async function checkHorse() {
  const { data, error } = await supabase
    .from('srd_items')
    .select('*')
    .eq('item_category', 'goods')
    .eq('name', 'Horse')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('=== ITEM: Horse ===\n');
  console.log('ID:', data.id);
  console.log('Name:', data.name);
  console.log('Slug:', data.slug);
  console.log('Price:', data.price_text);
  console.log('Weight:', data.weight_text);
  console.log('Category:', data.item_category);
  console.log('Group:', data.item_group);
  console.log('\n=== DESCRIPTION ===');
  console.log(data.description_full || data.description || '(sin descripción)');
}

checkHorse();
