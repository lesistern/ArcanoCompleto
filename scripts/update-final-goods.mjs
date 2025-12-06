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

// Descripciones finales con nombres EXACTOS de la BD
const FINAL_DESCRIPTIONS = {
  // Adventuring Gear
  'Barrel (empty)': `<p>Un <strong>barril</strong> de madera vacío que puede contener aproximadamente 40 galones de líquido o hasta 8 pies cúbicos de material sólido.</p>`,

  'Basket (empty)': `<p>Una <strong>canasta</strong> tejida de mimbre o caña que puede contener aproximadamente 2 pies cúbicos o 20 libras de material.</p>`,

  'Bell': `<p>Una pequeña <strong>campana</strong> de latón o bronce. Puede usarse como señal, alarma o para llamar la atención.</p>`,

  'Block and tackle': `<p>Un <strong>aparejo de poleas</strong> multiplica la fuerza aplicada. Usado correctamente, otorga un bonificador de circunstancia +5 a las tiradas de Fuerza para levantar cargas pesadas.</p>`,

  'Bottle, wine glass': `<p>Una <strong>botella de vidrio</strong> para vino que puede contener aproximadamente una pinta de líquido.</p>`,

  'Canvas (sq. yd.)': `<p>Una <strong>yarda cuadrada de lona</strong>, un tejido de algodón o cáñamo resistente y pesado. Útil para crear refugios improvisados, cubrir cargas o hacer reparaciones.</p>`,

  'Chalk, 1 piece': `<p>Un trozo de <strong>tiza</strong> blanca que puede usarse para marcar superficies, dejar rastros en mazmorras o escribir mensajes temporales.</p>`,

  'Firewood (per day)': `<p><strong>Leña</strong> suficiente para mantener una fogata encendida durante un día. Proporciona luz y calor para un campamento pequeño.</p>`,

  'Fishhook': `<p>Un pequeño <strong>anzuelo</strong> de metal para pescar. Requiere sedal y cebo para usarse eficazmente.</p>`,

  'Inkpen': `<p>Una <strong>pluma</strong> de ave tratada para escribir con tinta. Es reutilizable indefinidamente si se cuida apropiadamente.</p>`,

  'Ladder, 10-foot': `<p>Una <strong>escalera</strong> de madera de 10 pies (3 metros) de largo. Puede soportar hasta 300 libras de peso.</p>`,

  'Mug/Tankard, clay': `<p>Una <strong>jarra</strong> o <strong>tazón de arcilla</strong> para beber. Puede contener aproximadamente una pinta de líquido.</p>`,

  'Paper (sheet)': `<p>Una hoja de <strong>papel</strong> fabricado con pulpa de madera o trapos. Más suave y fino que el pergamino, pero menos duradero.</p>`,

  'Parchment (sheet)': `<p>Una hoja de <strong>pergamino</strong> fabricado con piel de animal tratada. Más duradero que el papel y resistente a la humedad. Ideal para documentos importantes o mapas.</p>`,

  'Pick, miner\'s': `<p>Un <strong>pico de minero</strong> con cabeza de metal y mango de madera. Usado para excavar roca y tierra dura. También puede usarse como arma improvisada (1d6 de daño perforante).</p>`,

  'Pitcher, clay': `<p>Una <strong>jarra de arcilla</strong> con asa y pico vertedor. Puede contener aproximadamente medio galón de líquido.</p>`,

  'Spade or shovel': `<p>Una <strong>pala</strong> de metal con mango de madera. Usada para excavar tierra suelta, arena o nieve. También puede usarse como arma improvisada (1d4 de daño contundente).</p>`,

  'Vial ink or potion': `<p>Un pequeño <strong>vial</strong> de cristal o cerámica con tapón. Puede contener 1 onza de líquido, suficiente para tinta o una poción individual.</p>`,

  // Food, Drink, and Lodging
  'Banquet (per person)': `<p>Un <strong>banquete</strong> elaborado que incluye múltiples platos de carnes, pescados, verduras, postres, vinos finos y entretenimiento. Típico de celebraciones nobles o eventos importantes.</p>`,

  'Bread, per loaf': `<p>Una <strong>hogaza de pan</strong> fresco. Alimento básico que proporciona sustento para un día cuando se combina con otros alimentos.</p>`,

  'Cheese, hunk of': `<p>Un <strong>trozo de queso</strong> curado. Nutritivo y duradero, es un alimento común para viajeros.</p>`,

  'Meat, chunk of': `<p>Un <strong>trozo de carne</strong> fresca o salada. Puede ser de res, cerdo, cordero o caza. Proporciona proteína esencial para aventureros.</p>`,

  // Tools and Skill Kits
  'Hourglass': `<p>Un <strong>reloj de arena</strong> que mide el paso del tiempo. Los tamaños comunes miden 1 minuto, 1 hora o 4 horas. Útil para cronometrar conjuros, guardias o cocción.</p>`,

  // Transport
  'Oar': `<p>Un <strong>remo</strong> de madera usado para propulsar y dirigir botes y barcas. Típicamente mide entre 8 y 12 pies de largo.</p>`,
};

async function updateFinalDescriptions() {
  console.log('=== ACTUALIZANDO ITEMS FINALES ===\n');

  let updated = 0;
  let notFound = 0;
  const notFoundItems = [];

  for (const [itemName, description] of Object.entries(FINAL_DESCRIPTIONS)) {
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

  // Verificar total final
  const { data: finalCheck } = await supabase
    .from('srd_items')
    .select('name')
    .eq('item_category', 'goods')
    .or('description_full.is.null,description_full.eq.');

  console.log('\n=== ESTADO FINAL ===');
  console.log(`Items sin descripción restantes: ${finalCheck?.length || 0}`);
}

updateFinalDescriptions();
