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

async function fixGoodsNamesAndCategories() {
  console.log('=== CORRECCIÓN DE NOMBRES Y CATEGORÍAS DE GOODS ===\n');

  // PASO 1: Eliminar items huérfanos
  console.log('PASO 1: Eliminando items huérfanos...');
  const orphanItems = ['Heavy', 'Medium', 'Military', 'Horse, heavy'];
  const { error: deleteError, count: deleteCount } = await supabase
    .from('srd_items')
    .delete()
    .eq('item_category', 'goods')
    .in('name', orphanItems);

  if (deleteError) {
    console.error('Error eliminando items huérfanos:', deleteError);
  } else {
    console.log(`  ✓ Items huérfanos eliminados\n`);
  }

  // PASO 2: Arreglar entidades HTML
  console.log('PASO 2: Arreglando entidades HTML en nombres...');

  // Obtener todos los items con entidades HTML
  const { data: itemsWithHtml, error: fetchError } = await supabase
    .from('srd_items')
    .select('id, name')
    .eq('item_category', 'goods')
    .like('name', '%&%');

  if (fetchError) {
    console.error('Error obteniendo items:', fetchError);
    return;
  }

  let htmlFixed = 0;
  for (const item of itemsWithHtml || []) {
    let newName = item.name
      .replace(/&rsquo;/g, "'")
      .replace(/&mdash;/g, '—')
      .replace(/&ndash;/g, '–')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    if (newName !== item.name) {
      const { error: updateError } = await supabase
        .from('srd_items')
        .update({ name: newName })
        .eq('id', item.id);

      if (updateError) {
        console.error(`  Error actualizando ${item.name}:`, updateError);
      } else {
        console.log(`  ✓ ${item.name} → ${newName}`);
        htmlFixed++;
      }
    }
  }
  console.log(`  Total: ${htmlFixed} nombres corregidos\n`);

  // PASO 3: Asignar categorías
  console.log('PASO 3: Asignando categorías...');

  const categories = {
    'Special Substances': [
      'Acid (flask)', "Alchemist's fire (flask)", "Alchemist's lab",
      'Antitoxin (vial)', 'Everburning torch', 'Holy water (flask)',
      'Smokestick', 'Sunrod', 'Tanglefoot bag', 'Thunderstone', 'Tindertwig'
    ],
    'Tools and Skill Kits': [
      "Artisan's tools", "Artisan's tools, masterwork", "Climber's kit",
      'Disguise kit', "Healer's kit", 'Holly and mistletoe',
      'Holy symbol, wooden', 'Holy symbol, silver', 'Hourglass',
      'Magnifying glass', 'Musical instrument, common',
      'Musical instrument, masterwork', "Scale, merchant's",
      'Spell component pouch', "Spellbook, wizard's (blank)",
      "Thieves' tools", "Thieves' tools, masterwork", 'Tool, masterwork',
      'Water clock'
    ],
    'Clothing': [
      "Artisan's outfit", "Cleric's vestments", 'Cold weather outfit',
      "Courtier's outfit", "Entertainer's outfit", "Explorer's outfit",
      "Monk's outfit", "Noble's outfit", "Peasant's outfit",
      'Royal outfit', "Scholar's outfit", "Traveler's outfit"
    ],
    'Food, Drink, and Lodging': [
      'Ale', 'Wine', 'Inn stay (per day)', 'Meals (per day)',
      'Bread, per loaf', 'Cheese, hunk of', 'Meat, chunk of',
      'Banquet (per person)'
    ],
    'Mounts and Related Gear': [
      'Barding', 'Horse', 'Saddle', 'Saddle, Exotic',
      'Saddlebags', 'Stabling (per day)'
    ],
    'Transport': [
      'Carriage', 'Cart', 'Galley', 'Keelboat', 'Longship',
      'Oar', 'Rowboat', 'Sailing ship', 'Sled', 'Wagon', 'Warship'
    ],
    'Spellcasting and Services': [
      'Coach cab', 'Hireling, trained', 'Hireling, untrained',
      'Messenger', 'Road or gate toll', "Ship's passage",
      'Spell, 0-level', 'Spell, 1st-level', 'Spell, 2nd-level',
      'Spell, 3rd-level', 'Spell, 4th-level', 'Spell, 5th-level',
      'Spell, 6th-level', 'Spell, 7th-level', 'Spell, 8th-level',
      'Spell, 9th-level'
    ]
  };

  for (const [category, items] of Object.entries(categories)) {
    const { error: catError, count } = await supabase
      .from('srd_items')
      .update({ item_group: category })
      .eq('item_category', 'goods')
      .in('name', items);

    if (catError) {
      console.error(`  Error asignando ${category}:`, catError);
    } else {
      console.log(`  ✓ ${category}: ${items.length} items`);
    }
  }

  // Asignar "Adventuring Gear" al resto
  const { error: adventuringError } = await supabase
    .from('srd_items')
    .update({ item_group: 'Adventuring Gear' })
    .eq('item_category', 'goods')
    .or('item_group.is.null,item_group.eq.');

  if (adventuringError) {
    console.error('  Error asignando Adventuring Gear:', adventuringError);
  } else {
    console.log('  ✓ Adventuring Gear: resto de items');
  }

  console.log('');

  // PASO 4: Verificación
  console.log('PASO 4: Verificación final...\n');

  // Distribución por categoría
  const { data: distribution } = await supabase
    .from('srd_items')
    .select('item_group')
    .eq('item_category', 'goods');

  const categoryCount = {};
  (distribution || []).forEach(item => {
    const cat = item.item_group || 'Sin categoría';
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });

  console.log('=== DISTRIBUCIÓN POR CATEGORÍA ===');
  Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`);
    });

  console.log(`\n  TOTAL: ${(distribution || []).length} items`);

  // Verificar entidades HTML restantes
  const { data: htmlRemaining } = await supabase
    .from('srd_items')
    .select('name')
    .eq('item_category', 'goods')
    .like('name', '%&%');

  const htmlWithEntities = (htmlRemaining || []).filter(item =>
    item.name.includes('&') && item.name.includes(';')
  );

  if (htmlWithEntities.length > 0) {
    console.log('\n⚠️ Items con entidades HTML restantes:');
    htmlWithEntities.forEach(item => console.log(`  - ${item.name}`));
  } else {
    console.log('\n✓ No hay entidades HTML restantes');
  }

  console.log('\n=== CORRECCIÓN COMPLETADA ===');
}

fixGoodsNamesAndCategories().catch(console.error);
