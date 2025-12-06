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

async function updateHorseDescription() {
  const horseDescription = `<p>Los caballos son las monturas más comunes en el mundo de D&D. Existen varios tipos según su tamaño, entrenamiento y propósito:</p>

<table class="w-full border-collapse my-4">
<thead>
<tr class="bg-dungeon-800">
<th class="border border-dungeon-600 px-3 py-2 text-left">Tipo</th>
<th class="border border-dungeon-600 px-3 py-2 text-right">Precio</th>
<th class="border border-dungeon-600 px-3 py-2 text-center">Velocidad</th>
<th class="border border-dungeon-600 px-3 py-2 text-center">Capacidad de Carga</th>
</tr>
</thead>
<tbody>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>Pony</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">30 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">40 pies</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">75/225 lb</td>
</tr>
<tr class="bg-dungeon-800/30">
<td class="border border-dungeon-700 px-3 py-2"><strong>Caballo ligero</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">75 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">60 pies</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">150/450 lb</td>
</tr>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>Pony de guerra</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">100 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">40 pies</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">100/300 lb</td>
</tr>
<tr class="bg-dungeon-800/30">
<td class="border border-dungeon-700 px-3 py-2"><strong>Caballo de guerra ligero</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">150 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">60 pies</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">230/690 lb</td>
</tr>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>Caballo pesado</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">200 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">50 pies</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">200/600 lb</td>
</tr>
<tr class="bg-dungeon-800/30">
<td class="border border-dungeon-700 px-3 py-2"><strong>Caballo de guerra pesado</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">400 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">50 pies</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">300/900 lb</td>
</tr>
</tbody>
</table>

<p><strong>Pony:</strong> Un pony es más pequeño que un caballo normal. Es adecuado para jinetes pequeños como halflings y gnomos.</p>

<p><strong>Caballo ligero:</strong> Los caballos ligeros son veloces y se usan comúnmente para viajar y como monturas de mensajeros.</p>

<p><strong>Caballo pesado:</strong> Caballos de tiro más grandes y fuertes, ideales para transportar cargas pesadas o tirar de carretas.</p>

<p><strong>Caballos de guerra:</strong> Entrenados para el combate, no se asustan ante el ruido de batalla ni ante criaturas hostiles. Los caballos de guerra pueden atacar con cascos durante el combate.</p>`;

  const { error } = await supabase
    .from('srd_items')
    .update({ description_full: horseDescription })
    .eq('item_category', 'goods')
    .eq('name', 'Horse');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('✅ Descripción de Horse actualizada correctamente');
}

updateHorseDescription();
