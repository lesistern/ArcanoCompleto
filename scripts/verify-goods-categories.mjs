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

async function verifyCategories() {
  const { data, error } = await supabase
    .from('srd_items')
    .select('name, item_group, price_text')
    .eq('item_category', 'goods')
    .order('item_group, name');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('=== ITEMS POR CATEGORÍA ===\n');

  let currentGroup = '';
  let count = 0;

  data.forEach(item => {
    if (item.item_group !== currentGroup) {
      if (currentGroup) console.log(`  Total: ${count}\n`);
      currentGroup = item.item_group;
      console.log(`📦 ${currentGroup || 'Sin categoría'}`);
      console.log('─'.repeat(50));
      count = 0;
    }
    console.log(`  • ${item.name} (${item.price_text || 'N/A'})`);
    count++;
  });

  console.log(`  Total: ${count}\n`);
  console.log(`\n=== TOTAL: ${data.length} items ===`);
}

verifyCategories();
