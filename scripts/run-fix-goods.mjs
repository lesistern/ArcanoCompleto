import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Leer .env.local desde el proyecto dnd-compendium
const envContent = fs.readFileSync('D:/CalabozosYDragones/dnd-compendium/.env.local', 'utf8');
const supabaseUrl = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/)?.[1]?.trim();
const serviceKey = envContent.match(/SUPABASE_SERVICE_ROLE_KEY=(.+)/)?.[1]?.trim();

console.log('URL:', supabaseUrl);
console.log('Service Key:', serviceKey ? 'Encontrada (' + serviceKey.substring(0,30) + '...)' : 'No encontrada');

if (!supabaseUrl || !serviceKey) {
  console.log('Faltan credenciales');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false }
});

async function runFixes() {
  console.log('\n=== PASO 1: DIAGNÓSTICO ===');

  // Ver items actuales
  const { data: itemsBefore, error: err1 } = await supabase
    .from('srd_items')
    .select('id, name, slug, price_text, weight_text')
    .eq('item_category', 'goods')
    .order('name');

  if (err1) {
    console.log('Error al consultar:', err1.message);
    return;
  }

  console.log('Total items de goods:', itemsBefore?.length);

  // Buscar items que necesitan consolidación
  const targetItems = ['Very simple', 'Average', 'Good', 'Amazing',
    'Medium creature', 'Large creature', 'Bit and bridle',
    'Dog, guard', 'Dog, riding', 'Donkey or mule', 'Feed (per day)',
    'Horse, heavy', 'Horse, light', 'Pony', 'Warhorse, heavy', 'Warhorse, light', 'Warpony',
    'Military', 'Pack', 'Riding', 'Gallon', 'Mug',
    'Common (pitcher)', 'Fine (bottle)', 'Common', 'Poor'];

  const { data: targetData } = await supabase
    .from('srd_items')
    .select('id, name, price_text')
    .eq('item_category', 'goods')
    .in('name', targetItems);

  console.log('\nItems a consolidar encontrados:', targetData?.length || 0);
  targetData?.forEach(i => console.log('  -', i.name, '|', i.price_text));

  // =====================================================
  // PASO 2A: LOCK
  // =====================================================
  console.log('\n=== 2A: LOCK ===');

  const { data: lockData, error: lockErr } = await supabase
    .from('srd_items')
    .update({
      name: 'Lock',
      slug: 'lock',
      price_text: '20-150 gp',
      weight_text: '1 lb.',
      description: `The DC to open a lock with the Open Lock skill depends on the lock's quality:

| Quality | Cost | DC |
|---------|------|-----|
| Very Simple | 20 gp | DC 20 |
| Average | 40 gp | DC 25 |
| Good | 80 gp | DC 30 |
| Amazing/Superior | 150 gp | DC 40 |

A key is provided with a lock. Most manacles have locks; add the cost of the lock you want to the cost of the manacles.`
    })
    .eq('name', 'Very simple')
    .eq('item_category', 'goods')
    .select();

  if (lockErr) console.log('Error Lock update:', lockErr.message);
  else console.log('Lock actualizado:', lockData?.length || 0, 'filas');

  // Eliminar hijos de Lock
  const { error: lockDelErr, count: lockDelCount } = await supabase
    .from('srd_items')
    .delete()
    .in('name', ['Average', 'Good', 'Amazing'])
    .eq('item_category', 'goods');

  if (lockDelErr) console.log('Error Lock delete:', lockDelErr.message);
  else console.log('Lock hijos eliminados');

  // =====================================================
  // PASO 2B: BARDING
  // =====================================================
  console.log('\n=== 2B: BARDING ===');

  const { data: bardingData, error: bardingErr } = await supabase
    .from('srd_items')
    .update({
      name: 'Barding',
      slug: 'barding',
      price_text: '2 gp - 150 gp',
      weight_text: '1-10 lb.',
      description: `Equipment for mounts and animals.

**Barding (Armor for Mounts):**
| Size | Cost Multiplier | Weight Multiplier |
|------|-----------------|-------------------|
| Medium creature | x2 | x1 |
| Large creature | x4 | x2 |

**Riding Gear:**
| Item | Cost | Weight |
|------|------|--------|
| Bit and bridle | 2 gp | 1 lb. |

**Animals:**
| Animal | Cost |
|--------|------|
| Dog, guard | 25 gp |
| Dog, riding | 150 gp |
| Donkey or mule | 8 gp |

**Supplies:**
| Item | Cost | Weight |
|------|------|--------|
| Feed (per day) | 5 cp | 10 lb. |`
    })
    .eq('name', 'Medium creature')
    .eq('item_category', 'goods')
    .select();

  if (bardingErr) console.log('Error Barding update:', bardingErr.message);
  else console.log('Barding actualizado:', bardingData?.length || 0, 'filas');

  // Eliminar hijos de Barding
  const { error: bardingDelErr } = await supabase
    .from('srd_items')
    .delete()
    .in('name', ['Large creature', 'Bit and bridle', 'Dog, guard', 'Dog, riding', 'Donkey or mule', 'Feed (per day)'])
    .eq('item_category', 'goods');

  if (bardingDelErr) console.log('Error Barding delete:', bardingDelErr.message);
  else console.log('Barding hijos eliminados');

  // =====================================================
  // PASO 2C: HORSE
  // =====================================================
  console.log('\n=== 2C: HORSE ===');

  const { data: horseData, error: horseErr } = await supabase
    .from('srd_items')
    .update({
      name: 'Horse',
      slug: 'horse',
      price_text: '30-400 gp',
      weight_text: '—',
      description: `Horses and ponies for riding and combat.

| Type | Cost | Notes |
|------|------|-------|
| Pony | 30 gp | Small mount |
| Horse, light | 75 gp | Standard riding horse |
| Warpony | 100 gp | Combat-trained pony |
| Warhorse, light | 150 gp | Combat-trained light horse |
| Horse, heavy | 200 gp | Draft horse |
| Warhorse, heavy | 400 gp | Combat-trained heavy horse |

Warhorses are combat-trained and do not flee from battle.`
    })
    .eq('name', 'Horse, heavy')
    .eq('item_category', 'goods')
    .select();

  if (horseErr) console.log('Error Horse update:', horseErr.message);
  else console.log('Horse actualizado:', horseData?.length || 0, 'filas');

  // Eliminar hijos de Horse
  const { error: horseDelErr } = await supabase
    .from('srd_items')
    .delete()
    .in('name', ['Horse, light', 'Pony', 'Warhorse, heavy', 'Warhorse, light', 'Warpony'])
    .eq('item_category', 'goods');

  if (horseDelErr) console.log('Error Horse delete:', horseDelErr.message);
  else console.log('Horse hijos eliminados');

  // =====================================================
  // PASO 2D: SADDLE (normal)
  // =====================================================
  console.log('\n=== 2D: SADDLE ===');

  const { data: saddleData, error: saddleErr } = await supabase
    .from('srd_items')
    .update({
      name: 'Saddle',
      slug: 'saddle',
      price_text: '5-20 gp',
      weight_text: '15-30 lb.',
      description: `Saddles for normal mounts (horses, ponies).

| Type | Cost | Weight | Notes |
|------|------|--------|-------|
| Pack | 5 gp | 15 lb. | For carrying gear only |
| Riding | 10 gp | 25 lb. | Standard saddle |
| Military | 20 gp | 30 lb. | +2 bonus to stay in saddle |

A military saddle braces the rider, granting a +2 circumstance bonus on Ride checks related to staying in the saddle.`
    })
    .eq('name', 'Military')
    .eq('item_category', 'goods')
    .eq('price_text', '20 gp')
    .select();

  if (saddleErr) console.log('Error Saddle update:', saddleErr.message);
  else console.log('Saddle actualizado:', saddleData?.length || 0, 'filas');

  // Eliminar hijos de Saddle (5gp y 10gp)
  const { error: saddleDelErr } = await supabase
    .from('srd_items')
    .delete()
    .in('name', ['Pack', 'Riding'])
    .eq('item_category', 'goods')
    .in('price_text', ['5 gp', '10 gp']);

  if (saddleDelErr) console.log('Error Saddle delete:', saddleDelErr.message);
  else console.log('Saddle hijos eliminados');

  // =====================================================
  // PASO 2E: SADDLE, EXOTIC
  // =====================================================
  console.log('\n=== 2E: SADDLE, EXOTIC ===');

  const { data: saddleExData, error: saddleExErr } = await supabase
    .from('srd_items')
    .update({
      name: 'Saddle, Exotic',
      slug: 'saddle-exotic',
      price_text: '15-60 gp',
      weight_text: '20-40 lb.',
      description: `Exotic saddles for unusual mounts (griffons, dragons, etc.).

| Type | Cost | Weight |
|------|------|--------|
| Pack | 15 gp | 20 lb. |
| Riding | 30 gp | 30 lb. |
| Military | 60 gp | 40 lb. |`
    })
    .eq('name', 'Military')
    .eq('item_category', 'goods')
    .eq('price_text', '60 gp')
    .select();

  if (saddleExErr) console.log('Error Saddle Exotic update:', saddleExErr.message);
  else console.log('Saddle Exotic actualizado:', saddleExData?.length || 0, 'filas');

  // Eliminar hijos de Saddle Exotic (15gp y 30gp)
  const { error: saddleExDelErr } = await supabase
    .from('srd_items')
    .delete()
    .in('name', ['Pack', 'Riding'])
    .eq('item_category', 'goods')
    .in('price_text', ['15 gp', '30 gp']);

  if (saddleExDelErr) console.log('Error Saddle Exotic delete:', saddleExDelErr.message);
  else console.log('Saddle Exotic hijos eliminados');

  // =====================================================
  // PASO 2F: ALE
  // =====================================================
  console.log('\n=== 2F: ALE ===');

  const { data: aleData, error: aleErr } = await supabase
    .from('srd_items')
    .update({
      name: 'Ale',
      slug: 'ale',
      price_text: '4 cp - 2 sp',
      weight_text: '1-8 lb.',
      description: `A common alcoholic beverage brewed from grain.

| Quantity | Cost | Weight |
|----------|------|--------|
| Mug | 4 cp | 1 lb. |
| Gallon | 2 sp | 8 lb. |`
    })
    .eq('name', 'Gallon')
    .eq('item_category', 'goods')
    .eq('price_text', '2 sp')
    .select();

  if (aleErr) console.log('Error Ale update:', aleErr.message);
  else console.log('Ale actualizado:', aleData?.length || 0, 'filas');

  // Eliminar Mug
  const { error: aleDelErr } = await supabase
    .from('srd_items')
    .delete()
    .eq('name', 'Mug')
    .eq('item_category', 'goods')
    .eq('price_text', '4 cp');

  if (aleDelErr) console.log('Error Ale delete:', aleDelErr.message);
  else console.log('Ale hijos eliminados');

  // =====================================================
  // PASO 2G: WINE
  // =====================================================
  console.log('\n=== 2G: WINE ===');

  const { data: wineData, error: wineErr } = await supabase
    .from('srd_items')
    .update({
      name: 'Wine',
      slug: 'wine',
      price_text: '2 sp - 10 gp',
      weight_text: '1½-6 lb.',
      description: `Wine comes in various qualities.

| Type | Cost | Weight |
|------|------|--------|
| Common (pitcher) | 2 sp | 6 lb. |
| Fine (bottle) | 10 gp | 1½ lb. |`
    })
    .eq('name', 'Common (pitcher)')
    .eq('item_category', 'goods')
    .select();

  if (wineErr) console.log('Error Wine update:', wineErr.message);
  else console.log('Wine actualizado:', wineData?.length || 0, 'filas');

  // Eliminar Fine (bottle)
  const { error: wineDelErr } = await supabase
    .from('srd_items')
    .delete()
    .eq('name', 'Fine (bottle)')
    .eq('item_category', 'goods');

  if (wineDelErr) console.log('Error Wine delete:', wineDelErr.message);
  else console.log('Wine hijos eliminados');

  // =====================================================
  // PASO 2H: INN STAY
  // =====================================================
  console.log('\n=== 2H: INN STAY ===');

  const { data: innData, error: innErr } = await supabase
    .from('srd_items')
    .update({
      name: 'Inn stay (per day)',
      slug: 'inn-stay',
      price_text: '2 sp - 2 gp',
      weight_text: '—',
      description: `Lodging at an inn for one night.

| Quality | Cost | Description |
|---------|------|-------------|
| Poor | 2 sp | Floor near the hearth |
| Common | 5 sp | Raised floor, blanket and pillow |
| Good | 2 gp | Private room with bed |`
    })
    .eq('name', 'Good')
    .eq('item_category', 'goods')
    .eq('price_text', '2 gp')
    .select();

  if (innErr) console.log('Error Inn update:', innErr.message);
  else console.log('Inn stay actualizado:', innData?.length || 0, 'filas');

  // Eliminar Common y Poor (alojamiento)
  const { error: innDelErr } = await supabase
    .from('srd_items')
    .delete()
    .in('name', ['Common', 'Poor'])
    .eq('item_category', 'goods')
    .in('price_text', ['5 sp', '2 sp']);

  if (innDelErr) console.log('Error Inn delete:', innDelErr.message);
  else console.log('Inn stay hijos eliminados');

  // =====================================================
  // PASO 2I: MEALS
  // =====================================================
  console.log('\n=== 2I: MEALS ===');

  const { data: mealsData, error: mealsErr } = await supabase
    .from('srd_items')
    .update({
      name: 'Meals (per day)',
      slug: 'meals',
      price_text: '1 sp - 5 sp',
      weight_text: '—',
      description: `Food at an inn or tavern for one day.

| Quality | Cost | Description |
|---------|------|-------------|
| Poor | 1 sp | Bread, turnips, water |
| Common | 3 sp | Stew, bread, watered ale |
| Good | 5 sp | Beef, bread, ale or wine |`
    })
    .eq('name', 'Good')
    .eq('item_category', 'goods')
    .eq('price_text', '5 sp')
    .select();

  if (mealsErr) console.log('Error Meals update:', mealsErr.message);
  else console.log('Meals actualizado:', mealsData?.length || 0, 'filas');

  // Eliminar Common y Poor (comidas)
  const { error: mealsDelErr } = await supabase
    .from('srd_items')
    .delete()
    .in('name', ['Common', 'Poor'])
    .eq('item_category', 'goods')
    .in('price_text', ['3 sp', '1 sp']);

  if (mealsDelErr) console.log('Error Meals delete:', mealsDelErr.message);
  else console.log('Meals hijos eliminados');

  // =====================================================
  // PASO 3: VERIFICACIÓN FINAL
  // =====================================================
  console.log('\n=== VERIFICACIÓN FINAL ===');

  const { data: itemsAfter } = await supabase
    .from('srd_items')
    .select('id, name, slug, price_text, weight_text')
    .eq('item_category', 'goods')
    .order('name');

  console.log('\nTotal items de goods después:', itemsAfter?.length);

  // Verificar items consolidados
  const consolidatedNames = ['Lock', 'Barding', 'Horse', 'Saddle', 'Saddle, Exotic', 'Ale', 'Wine', 'Inn stay (per day)', 'Meals (per day)'];
  const { data: consolidated } = await supabase
    .from('srd_items')
    .select('name, price_text')
    .eq('item_category', 'goods')
    .in('name', consolidatedNames);

  console.log('\nItems consolidados correctamente:');
  consolidated?.forEach(i => console.log('  ✓', i.name, '|', i.price_text));

  // Verificar items huérfanos
  const orphanNames = ['Very simple', 'Average', 'Amazing', 'Medium creature', 'Large creature',
    'Bit and bridle', 'Dog, guard', 'Dog, riding', 'Donkey or mule', 'Feed (per day)',
    'Horse, light', 'Pony', 'Warhorse, heavy', 'Warhorse, light', 'Warpony',
    'Gallon', 'Mug', 'Common (pitcher)', 'Fine (bottle)'];

  const { data: orphans } = await supabase
    .from('srd_items')
    .select('name')
    .eq('item_category', 'goods')
    .in('name', orphanNames);

  console.log('\nItems huérfanos restantes:', orphans?.length || 0);
  if (orphans?.length > 0) {
    orphans.forEach(i => console.log('  ⚠', i.name));
  }
}

runFixes().catch(console.error);
