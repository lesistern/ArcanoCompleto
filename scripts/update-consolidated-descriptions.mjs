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

const consolidatedItems = [
  {
    name: 'Barding',
    price_text: '×2-×4 precio base',
    description_full: `<p>La barda es armadura diseñada para proteger la cabeza, cuello, pecho y cuerpo de un animal. El precio de la barda depende del tipo de armadura y el tamaño de la montura.</p>

<table class="w-full border-collapse my-4">
<thead>
<tr class="bg-dungeon-800">
<th class="border border-dungeon-600 px-3 py-2 text-left">Tamaño de Montura</th>
<th class="border border-dungeon-600 px-3 py-2 text-right">Modificador de Precio</th>
<th class="border border-dungeon-600 px-3 py-2 text-right">Modificador de Peso</th>
</tr>
</thead>
<tbody>
<tr>
<td class="border border-dungeon-700 px-3 py-2">Mediano</td>
<td class="border border-dungeon-700 px-3 py-2 text-right">×2</td>
<td class="border border-dungeon-700 px-3 py-2 text-right">×1</td>
</tr>
<tr class="bg-dungeon-800/30">
<td class="border border-dungeon-700 px-3 py-2">Grande</td>
<td class="border border-dungeon-700 px-3 py-2 text-right">×4</td>
<td class="border border-dungeon-700 px-3 py-2 text-right">×2</td>
</tr>
</tbody>
</table>

<p>La barda puede ser hecha de cualquier tipo de armadura (acolchada, cuero, cota de malla, etc.). El precio y peso base se toman de la armadura correspondiente y se multiplican por el modificador del tamaño.</p>

<p><strong>Ejemplo:</strong> Una cota de anillas (ringmail, 100 gp, 30 lb) como barda para un caballo de guerra (Grande) costaría 400 gp y pesaría 60 lb.</p>

<p>Los animales con barda pesada se mueven a ×2 velocidad normal, mientras que con barda media se mueven a ×3 velocidad normal.</p>`
  },
  {
    name: 'Saddle',
    price_text: '5-60 gp',
    description_full: `<p>Las sillas de montar son necesarias para montar cómodamente y controlar una montura durante viajes largos o combate.</p>

<table class="w-full border-collapse my-4">
<thead>
<tr class="bg-dungeon-800">
<th class="border border-dungeon-600 px-3 py-2 text-left">Tipo</th>
<th class="border border-dungeon-600 px-3 py-2 text-right">Precio</th>
<th class="border border-dungeon-600 px-3 py-2 text-right">Peso</th>
<th class="border border-dungeon-600 px-3 py-2 text-left">Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>Albarda</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">5 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-right">15 lb</td>
<td class="border border-dungeon-700 px-3 py-2">Para animales de carga</td>
</tr>
<tr class="bg-dungeon-800/30">
<td class="border border-dungeon-700 px-3 py-2"><strong>Militar</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">20 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-right">30 lb</td>
<td class="border border-dungeon-700 px-3 py-2">+2 a Montar para mantenerse</td>
</tr>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>De monta</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">10 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-right">25 lb</td>
<td class="border border-dungeon-700 px-3 py-2">Silla estándar para viajes</td>
</tr>
</tbody>
</table>

<p><strong>Albarda:</strong> Una albarda es una silla simple para animales de carga. No proporciona ventajas para el jinete.</p>

<p><strong>Silla militar:</strong> Diseñada para combate, con estribos reforzados y un alto borrén. Proporciona un bonificador +2 a las tiradas de Montar relacionadas con mantenerse en la silla.</p>

<p><strong>Silla de monta:</strong> La silla estándar para viajes largos, con alforjas y anclajes para equipo.</p>`
  },
  {
    name: 'Saddle, Exotic',
    price_text: '30-60 gp',
    description_full: `<p>Las sillas exóticas están diseñadas para monturas no convencionales como criaturas voladoras, acuáticas o de anatomía inusual.</p>

<table class="w-full border-collapse my-4">
<thead>
<tr class="bg-dungeon-800">
<th class="border border-dungeon-600 px-3 py-2 text-left">Tipo</th>
<th class="border border-dungeon-600 px-3 py-2 text-right">Precio</th>
<th class="border border-dungeon-600 px-3 py-2 text-right">Peso</th>
<th class="border border-dungeon-600 px-3 py-2 text-left">Uso</th>
</tr>
</thead>
<tbody>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>Exótica militar</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">60 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-right">40 lb</td>
<td class="border border-dungeon-700 px-3 py-2">Combate en montura exótica</td>
</tr>
<tr class="bg-dungeon-800/30">
<td class="border border-dungeon-700 px-3 py-2"><strong>Exótica de albarda</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">15 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-right">20 lb</td>
<td class="border border-dungeon-700 px-3 py-2">Carga en montura exótica</td>
</tr>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>Exótica de monta</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">30 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-right">30 lb</td>
<td class="border border-dungeon-700 px-3 py-2">Viaje en montura exótica</td>
</tr>
</tbody>
</table>

<p>Las sillas exóticas son necesarias para montar criaturas como grifos, pegasos, dragones, o cualquier criatura cuya anatomía difiera significativamente de un caballo normal.</p>

<p>La silla exótica militar proporciona el mismo bonificador +2 a Montar que una silla militar normal.</p>`
  },
  {
    name: 'Lock',
    price_text: '20-150 gp',
    description_full: `<p>Las cerraduras protegen cofres, puertas y otros objetos de ser abiertos sin autorización. La calidad de la cerradura determina la dificultad para abrirla sin llave.</p>

<table class="w-full border-collapse my-4">
<thead>
<tr class="bg-dungeon-800">
<th class="border border-dungeon-600 px-3 py-2 text-left">Calidad</th>
<th class="border border-dungeon-600 px-3 py-2 text-right">Precio</th>
<th class="border border-dungeon-600 px-3 py-2 text-center">CD para Abrir</th>
</tr>
</thead>
<tbody>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>Simple</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">20 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">CD 20</td>
</tr>
<tr class="bg-dungeon-800/30">
<td class="border border-dungeon-700 px-3 py-2"><strong>Media</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">40 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">CD 25</td>
</tr>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>Buena</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">80 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">CD 30</td>
</tr>
<tr class="bg-dungeon-800/30">
<td class="border border-dungeon-700 px-3 py-2"><strong>Superior</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">150 gp</td>
<td class="border border-dungeon-700 px-3 py-2 text-center">CD 40</td>
</tr>
</tbody>
</table>

<p>Para abrir una cerradura se requiere una tirada exitosa de <strong>Abrir Cerraduras</strong> contra la CD indicada. Las herramientas de ladrón son necesarias para este intento.</p>

<p>Las cerraduras pueden ser forzadas físicamente con una tirada de Fuerza (CD 25 para cerraduras simples, +5 CD por cada categoría superior), pero esto destruye la cerradura.</p>`
  },
  {
    name: 'Ale',
    price_text: '2-4 cp',
    description_full: `<p>La cerveza es la bebida alcohólica más común en tabernas y posadas de todo el mundo de fantasía.</p>

<table class="w-full border-collapse my-4">
<thead>
<tr class="bg-dungeon-800">
<th class="border border-dungeon-600 px-3 py-2 text-left">Tipo</th>
<th class="border border-dungeon-600 px-3 py-2 text-right">Precio</th>
<th class="border border-dungeon-600 px-3 py-2 text-left">Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>Jarra</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">4 cp</td>
<td class="border border-dungeon-700 px-3 py-2">Una porción individual</td>
</tr>
<tr class="bg-dungeon-800/30">
<td class="border border-dungeon-700 px-3 py-2"><strong>Galón</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">2 sp</td>
<td class="border border-dungeon-700 px-3 py-2">Para compartir o provisiones</td>
</tr>
</tbody>
</table>

<p>La calidad de la cerveza varía según el establecimiento. Las tabernas de mala muerte sirven cerveza aguada, mientras que las posadas de calidad ofrecen cervezas artesanales con sabores únicos.</p>`
  },
  {
    name: 'Wine',
    price_text: '2 sp - 10 gp',
    description_full: `<p>El vino es una bebida más refinada que la cerveza, popular entre nobles y mercaderes adinerados.</p>

<table class="w-full border-collapse my-4">
<thead>
<tr class="bg-dungeon-800">
<th class="border border-dungeon-600 px-3 py-2 text-left">Tipo</th>
<th class="border border-dungeon-600 px-3 py-2 text-right">Precio</th>
<th class="border border-dungeon-600 px-3 py-2 text-left">Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>Común (jarra)</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">2 sp</td>
<td class="border border-dungeon-700 px-3 py-2">Vino de mesa simple</td>
</tr>
<tr class="bg-dungeon-800/30">
<td class="border border-dungeon-700 px-3 py-2"><strong>Fino (botella)</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">10 gp</td>
<td class="border border-dungeon-700 px-3 py-2">Vino de calidad para ocasiones especiales</td>
</tr>
</tbody>
</table>

<p>Los vinos finos provienen de regiones específicas y algunos añejos pueden valer cientos de piezas de oro. Los vinos élficos son particularmente valorados por su sabor y rareza.</p>`
  },
  {
    name: 'Inn stay (per day)',
    price_text: '2 sp - 2 gp',
    description_full: `<p>Las posadas ofrecen alojamiento para viajeros cansados. La calidad del alojamiento varía enormemente según el establecimiento.</p>

<table class="w-full border-collapse my-4">
<thead>
<tr class="bg-dungeon-800">
<th class="border border-dungeon-600 px-3 py-2 text-left">Calidad</th>
<th class="border border-dungeon-600 px-3 py-2 text-right">Precio/día</th>
<th class="border border-dungeon-600 px-3 py-2 text-left">Incluye</th>
</tr>
</thead>
<tbody>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>Pobre</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">2 sp</td>
<td class="border border-dungeon-700 px-3 py-2">Suelo cerca del fuego, sin privacidad</td>
</tr>
<tr class="bg-dungeon-800/30">
<td class="border border-dungeon-700 px-3 py-2"><strong>Común</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">5 sp</td>
<td class="border border-dungeon-700 px-3 py-2">Habitación compartida, cama</td>
</tr>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>Buena</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">2 gp</td>
<td class="border border-dungeon-700 px-3 py-2">Habitación privada, cama limpia</td>
</tr>
</tbody>
</table>

<p>Los precios no incluyen comidas. La mayoría de posadas ofrecen establos para monturas por un costo adicional (típicamente 5 sp por noche para un caballo).</p>`
  },
  {
    name: 'Meals (per day)',
    price_text: '1 sp - 5 sp',
    description_full: `<p>Las comidas en tabernas y posadas varían en calidad y precio según el establecimiento.</p>

<table class="w-full border-collapse my-4">
<thead>
<tr class="bg-dungeon-800">
<th class="border border-dungeon-600 px-3 py-2 text-left">Calidad</th>
<th class="border border-dungeon-600 px-3 py-2 text-right">Precio/día</th>
<th class="border border-dungeon-600 px-3 py-2 text-left">Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>Pobre</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">1 sp</td>
<td class="border border-dungeon-700 px-3 py-2">Pan, queso y agua</td>
</tr>
<tr class="bg-dungeon-800/30">
<td class="border border-dungeon-700 px-3 py-2"><strong>Común</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">3 sp</td>
<td class="border border-dungeon-700 px-3 py-2">Estofado, pan, cerveza</td>
</tr>
<tr>
<td class="border border-dungeon-700 px-3 py-2"><strong>Buena</strong></td>
<td class="border border-dungeon-700 px-3 py-2 text-right">5 sp</td>
<td class="border border-dungeon-700 px-3 py-2">Carne asada, vegetales, vino</td>
</tr>
</tbody>
</table>

<p>Una ración de viaje (trail rations) cuesta 5 sp por día y es más práctico para aventureros en el camino, aunque menos satisfactorio que una comida caliente en una posada.</p>`
  }
];

async function updateDescriptions() {
  console.log('=== ACTUALIZANDO ITEMS CONSOLIDADOS ===\n');

  for (const item of consolidatedItems) {
    const { error } = await supabase
      .from('srd_items')
      .update({
        description_full: item.description_full,
        price_text: item.price_text
      })
      .eq('item_category', 'goods')
      .eq('name', item.name);

    if (error) {
      console.error(`❌ Error en ${item.name}:`, error.message);
    } else {
      console.log(`✅ ${item.name} actualizado`);
    }
  }

  console.log('\n=== ACTUALIZACIÓN COMPLETADA ===');
}

updateDescriptions();
