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

// Descripciones con nombres EXACTOS de la BD
const REMAINING_DESCRIPTIONS = {
  // Adventuring Gear con nombres completos
  'Chain (10 ft.)': `<p>La <strong>cadena</strong> tiene dureza 10 y 5 puntos de golpe. Puede romperse con una tirada de Fuerza CD 26.</p>`,

  'Ink (1 oz. vial)': `<p>Este es un frasco de <strong>tinta negra</strong>. Puedes comprar tinta de otros colores, pero cuesta el doble.</p>`,

  'Oil (1-pint flask)': `<p>Un frasco de <strong>aceite</strong> de una pinta arde durante 6 horas en una linterna. Puedes usar el aceite para crear una zona resbaladiza o prenderle fuego. Requiere una acción estándar para verter y una acción de movimiento para encender.</p>
<p>Si se vierte sobre una criatura y se enciende, inflige 1d3 puntos de daño por fuego en el primer asalto y 1d3 en el segundo. Un personaje en llamas puede extinguir las llamas con una acción de asalto completo.</p>`,

  'Rope, hempen (50 ft.)': `<p>Esta <strong>cuerda de cáñamo</strong> tiene 2 puntos de golpe y puede romperse con una tirada de Fuerza CD 23.</p>`,

  'Rope, silk (50 ft.)': `<p>Esta <strong>cuerda de seda</strong> tiene 4 puntos de golpe y puede romperse con una tirada de Fuerza CD 24. Es más ligera que la cuerda de cáñamo del mismo largo.</p>`,

  'Backpack (empty)': `<p>Una <strong>mochila</strong> de cuero con correas. Puede contener hasta 1 pie cúbico o 30 libras de equipo.</p>`,

  'Bucket (empty)': `<p>Un <strong>cubo</strong> estándar de madera o metal que puede contener aproximadamente 1 galón de líquido.</p>`,

  'Chest (empty)': `<p>Un <strong>cofre</strong> de madera con bisagras y una tapa. Típicamente puede contener 2 pies cúbicos de material.</p>`,

  'Flask (empty)': `<p>Un <strong>frasco</strong> de cerámica con tapa que puede contener 1 pinta de líquido.</p>`,

  'Pouch, belt (empty)': `<p>Una <strong>bolsa de cinturón</strong> de cuero que puede contener objetos pequeños. Típicamente puede guardar 1/5 de pie cúbico o 10 libras de equipo.</p>`,

  'Sack (empty)': `<p>Un <strong>saco</strong> de tela o cuero que puede contener hasta 1 pie cúbico o 30 libras de equipo.</p>`,

  'Fishing net, 25 sq. ft.': `<p>Una <strong>red de pesca</strong> de 25 pies cuadrados usada para atrapar peces y otras criaturas acuáticas pequeñas.</p>`,

  'Pole 10-foot': `<p>Una <strong>pértiga de 10 pies</strong> de madera. Útil para revisar trampas, tantear profundidades o empujar objetos desde la distancia.</p>`,

  'Soap (per lb.)': `<p>Una libra de <strong>jabón</strong> común usado para limpiar.</p>`,

  'Rations, trail (per day)': `<p>Las <strong>raciones de viaje</strong> consisten en carne seca, fruta dura, galletas y nueces. Son comida nutritiva pero no particularmente sabrosa.</p>`,

  // Special Substances
  'Acid (flask)': `<p>Un frasco de <strong>ácido</strong>. Puedes lanzar un frasco de ácido como un arma de chapoteo. Trata este ataque como un ataque de toque a distancia con un incremento de alcance de 10 pies. Un impacto directo inflige 1d6 puntos de daño de ácido. Cada criatura a 5 pies del punto de impacto recibe 1 punto de daño de ácido por salpicadura.</p>`,

  'Alchemist\'s fire (flask)': `<p>El <strong>fuego alquimista</strong> es un líquido pegajoso que se enciende al exponerse al aire. Puedes lanzar un frasco de fuego alquimista como un arma de chapoteo. Trata este ataque como un ataque de toque a distancia con un incremento de alcance de 10 pies.</p>
<p>Un impacto directo inflige 1d6 puntos de daño por fuego. Cada criatura a 5 pies del punto de impacto recibe 1 punto de daño por fuego por salpicadura. En el asalto siguiente al impacto directo, el objetivo recibe 1d6 puntos adicionales de daño por fuego. El objetivo puede usar una acción de asalto completo para intentar extinguir las llamas antes de recibir este daño adicional.</p>`,

  'Antitoxin (vial)': `<p>El <strong>antitoxina</strong> te otorga un bonificador de alquimia +5 a las tiradas de salvación de Fortaleza contra veneno durante 1 hora.</p>`,

  'Holy water (flask)': `<p>El <strong>agua bendita</strong> daña a los muertos vivientes y las criaturas malvadas de los planos exteriores casi como si fuera ácido. Un frasco de agua bendita puede lanzarse como un arma de chapoteo.</p>
<p>Trata este ataque como un ataque de toque a distancia con un incremento de alcance de 10 pies. Un frasco se rompe si se lanza contra una criatura. Un impacto directo a un muerto viviente o criatura maligna de los planos exteriores inflige 2d4 puntos de daño. Cada criatura de estos tipos a 5 pies del punto de impacto recibe 1 punto de daño por salpicadura.</p>
<p>Templos del bien y capellanes alineados con el bien pueden suministrar agua bendita.</p>`,

  // Tools
  'Spellbook, wizard\'s (blank)': `<p>Un <strong>libro de conjuros</strong> en blanco tiene 100 páginas de pergamino fino, y cada conjuro ocupa una página por nivel del conjuro (un conjuro de nivel 0 ocupa una página). Un libro de conjuros con tapas de cuero tiene dureza 2 y 3 puntos de golpe.</p>`,

  // Mounts and Related
  'Stabling (per day)': `<p>El <strong>establo por día</strong> incluye un puesto, comida y agua para una montura.</p>`,

  // Símbolos no encontrados
  'Unholy symbol, silver': `<p>Un <strong>símbolo profano de plata</strong> es un foco divino necesario para ciertos conjuros de clérigos y otras clases divinas de deidades malvadas. Funciona de manera similar al símbolo sagrado pero para deidades de alineamiento malvado.</p>`,
};

async function updateRemainingDescriptions() {
  console.log('=== ACTUALIZANDO ITEMS RESTANTES ===\n');

  let updated = 0;
  let notFound = 0;
  const notFoundItems = [];

  for (const [itemName, description] of Object.entries(REMAINING_DESCRIPTIONS)) {
    const { data, error } = await supabase
      .from('srd_items')
      .update({ description_full: description })
      .eq('item_category', 'goods')
      .eq('name', itemName)
      .select('name');

    if (error) {
      console.error(`❌ Error actualizando ${itemName}:`, error.message);
      notFound++;
      notFoundItems.push(itemName);
    } else if (data && data.length > 0) {
      console.log(`✅ ${itemName}`);
      updated++;
    } else {
      console.log(`⚠️ No encontrado: ${itemName}`);
      notFound++;
      notFoundItems.push(itemName);
    }
  }

  console.log('\n=== RESUMEN ===');
  console.log(`Actualizados: ${updated}`);
  console.log(`No encontrados: ${notFound}`);

  if (notFoundItems.length > 0) {
    console.log('\nItems no encontrados:');
    notFoundItems.forEach(item => console.log(`  - ${item}`));
  }
}

updateRemainingDescriptions();
