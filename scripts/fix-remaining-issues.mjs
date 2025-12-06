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

async function fixRemainingIssues() {
  console.log('=== CORRECCIONES ADICIONALES ===\n');

  // 1. Corregir entidades HTML en price_text
  console.log('1. Corrigiendo entidades HTML en price_text...');

  const { data: itemsWithHtmlPrice } = await supabase
    .from('srd_items')
    .select('id, name, price_text')
    .eq('item_category', 'goods')
    .like('price_text', '%&%');

  for (const item of itemsWithHtmlPrice || []) {
    let newPrice = item.price_text
      .replace(/&mdash;/g, '—')
      .replace(/&ndash;/g, '–')
      .replace(/&rsquo;/g, "'")
      .replace(/&amp;/g, '&');

    if (newPrice !== item.price_text) {
      const { error } = await supabase
        .from('srd_items')
        .update({ price_text: newPrice })
        .eq('id', item.id);

      if (!error) {
        console.log(`  ✓ ${item.name}: ${item.price_text} → ${newPrice}`);
      }
    }
  }

  // 2. Corregir precios de Inn stay y Meals que estaban consolidados
  console.log('\n2. Corrigiendo precios de items consolidados...');

  const priceUpdates = [
    { name: 'Inn stay (per day)', price_text: '2 sp - 2 gp' },
    { name: 'Meals (per day)', price_text: '1 sp - 5 sp' }
  ];

  for (const update of priceUpdates) {
    const { data: existing } = await supabase
      .from('srd_items')
      .select('id, price_text')
      .eq('item_category', 'goods')
      .eq('name', update.name)
      .single();

    if (existing && (!existing.price_text || existing.price_text === 'N/A' || existing.price_text === '')) {
      const { error } = await supabase
        .from('srd_items')
        .update({ price_text: update.price_text })
        .eq('id', existing.id);

      if (!error) {
        console.log(`  ✓ ${update.name}: → ${update.price_text}`);
      }
    }
  }

  // 3. Verificar que no quedan entidades HTML
  console.log('\n3. Verificación final...');

  const { data: remainingHtml } = await supabase
    .from('srd_items')
    .select('name, price_text')
    .eq('item_category', 'goods')
    .or('name.like.%&%;%,price_text.like.%&%;%');

  if (remainingHtml && remainingHtml.length > 0) {
    console.log('  ⚠️ Quedan items con entidades HTML:');
    remainingHtml.forEach(item => {
      console.log(`    - ${item.name}: ${item.price_text}`);
    });
  } else {
    console.log('  ✓ No quedan entidades HTML');
  }

  console.log('\n=== CORRECCIONES COMPLETADAS ===');
}

fixRemainingIssues();
