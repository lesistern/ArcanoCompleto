#!/usr/bin/env node
/**
 * Inserta las tablas de progresión de las 11 clases base (20 niveles cada una)
 * Datos extraídos del Player's Handbook
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Tablas de progresión completas (20 niveles)
// Formato: { level, bab, fort, ref, will, special }
const classProgression = {
  barbarian: [
    { level: 1, bab: '+1', fort: '+2', ref: '+0', will: '+0', special: 'Movimiento rápido, analfabetismo, furia 1/día' },
    { level: 2, bab: '+2', fort: '+3', ref: '+0', will: '+0', special: 'Esquiva asombrosa' },
    { level: 3, bab: '+3', fort: '+3', ref: '+1', will: '+1', special: 'Sentir trampas +1' },
    { level: 4, bab: '+4', fort: '+4', ref: '+1', will: '+1', special: 'Furia 2/día' },
    { level: 5, bab: '+5', fort: '+4', ref: '+1', will: '+1', special: 'Esquiva asombrosa mejorada' },
    { level: 6, bab: '+6/+1', fort: '+5', ref: '+2', will: '+2', special: 'Sentir trampas +2' },
    { level: 7, bab: '+7/+2', fort: '+5', ref: '+2', will: '+2', special: 'Reducción de daño 1/—' },
    { level: 8, bab: '+8/+3', fort: '+6', ref: '+2', will: '+2', special: 'Furia 3/día' },
    { level: 9, bab: '+9/+4', fort: '+6', ref: '+3', will: '+3', special: 'Sentir trampas +3' },
    { level: 10, bab: '+10/+5', fort: '+7', ref: '+3', will: '+3', special: 'Reducción de daño 2/—' },
    { level: 11, bab: '+11/+6/+1', fort: '+7', ref: '+3', will: '+3', special: 'Furia mayor' },
    { level: 12, bab: '+12/+7/+2', fort: '+8', ref: '+4', will: '+4', special: 'Furia 4/día, sentir trampas +4' },
    { level: 13, bab: '+13/+8/+3', fort: '+8', ref: '+4', will: '+4', special: 'Reducción de daño 3/—' },
    { level: 14, bab: '+14/+9/+4', fort: '+9', ref: '+4', will: '+4', special: 'Voluntad indomable' },
    { level: 15, bab: '+15/+10/+5', fort: '+9', ref: '+5', will: '+5', special: 'Sentir trampas +5' },
    { level: 16, bab: '+16/+11/+6/+1', fort: '+10', ref: '+5', will: '+5', special: 'Reducción de daño 4/—, furia 5/día' },
    { level: 17, bab: '+17/+12/+7/+2', fort: '+10', ref: '+5', will: '+5', special: 'Furia incansable' },
    { level: 18, bab: '+18/+13/+8/+3', fort: '+11', ref: '+6', will: '+6', special: 'Sentir trampas +6' },
    { level: 19, bab: '+19/+14/+9/+4', fort: '+11', ref: '+6', will: '+6', special: 'Reducción de daño 5/—' },
    { level: 20, bab: '+20/+15/+10/+5', fort: '+12', ref: '+6', will: '+6', special: 'Furia 6/día, furia poderosa' },
  ],

  bard: [
    { level: 1, bab: '+0', fort: '+0', ref: '+2', will: '+2', special: 'Música de bardo, conocimiento de bardo, contracanto, fascinar, inspirar valor +1' },
    { level: 2, bab: '+1', fort: '+0', ref: '+3', will: '+3', special: '—' },
    { level: 3, bab: '+2', fort: '+1', ref: '+3', will: '+3', special: 'Inspirar competencia' },
    { level: 4, bab: '+3', fort: '+1', ref: '+4', will: '+4', special: '—' },
    { level: 5, bab: '+3', fort: '+1', ref: '+4', will: '+4', special: '—' },
    { level: 6, bab: '+4', fort: '+2', ref: '+5', will: '+5', special: 'Sugestión' },
    { level: 7, bab: '+5', fort: '+2', ref: '+5', will: '+5', special: '—' },
    { level: 8, bab: '+6/+1', fort: '+2', ref: '+6', will: '+6', special: 'Inspirar valor +2' },
    { level: 9, bab: '+6/+1', fort: '+3', ref: '+6', will: '+6', special: 'Inspirar grandeza' },
    { level: 10, bab: '+7/+2', fort: '+3', ref: '+7', will: '+7', special: '—' },
    { level: 11, bab: '+8/+3', fort: '+3', ref: '+7', will: '+7', special: '—' },
    { level: 12, bab: '+9/+4', fort: '+4', ref: '+8', will: '+8', special: 'Canción de libertad' },
    { level: 13, bab: '+9/+4', fort: '+4', ref: '+8', will: '+8', special: '—' },
    { level: 14, bab: '+10/+5', fort: '+4', ref: '+9', will: '+9', special: 'Inspirar valor +3' },
    { level: 15, bab: '+11/+6/+1', fort: '+5', ref: '+9', will: '+9', special: 'Inspirar heroísmo' },
    { level: 16, bab: '+12/+7/+2', fort: '+5', ref: '+10', will: '+10', special: '—' },
    { level: 17, bab: '+12/+7/+2', fort: '+5', ref: '+10', will: '+10', special: '—' },
    { level: 18, bab: '+13/+8/+3', fort: '+6', ref: '+11', will: '+11', special: 'Sugestión en masa' },
    { level: 19, bab: '+14/+9/+4', fort: '+6', ref: '+11', will: '+11', special: '—' },
    { level: 20, bab: '+15/+10/+5', fort: '+6', ref: '+12', will: '+12', special: 'Inspirar valor +4' },
  ],

  // NOTA: Por ahora solo implementamos Bárbaro y Bardo como ejemplo
  // Necesitarás completar las otras 9 clases con sus tablas completas
};

async function insertProgression(classSlug, progressionData) {
  console.log(`\nInsertando progresión para ${classSlug}...`);

  let inserted = 0;
  let errors = 0;

  for (const level of progressionData) {
    try {
      const { data, error } = await supabase
        .from('class_progression')
        .upsert({
          class_slug: classSlug,
          ...level
        }, { onConflict: 'class_slug,level' })
        .select();

      if (error) {
        console.log(`  ✗ Nivel ${level.level}: ${error.message}`);
        errors++;
      } else {
        inserted++;
      }
    } catch (err) {
      console.log(`  ✗ Nivel ${level.level}: ${err.message}`);
      errors++;
    }
  }

  console.log(`  ✓ ${inserted}/20 niveles insertados`);
  if (errors > 0) console.log(`  ✗ ${errors} errores`);

  return { inserted, errors };
}

async function main() {
  console.log('='.repeat(80));
  console.log('INSERTANDO TABLAS DE PROGRESIÓN');
  console.log('='.repeat(80));

  let totalInserted = 0;
  let totalErrors = 0;

  for (const [classSlug, progression] of Object.entries(classProgression)) {
    const { inserted, errors } = await insertProgression(classSlug, progression);
    totalInserted += inserted;
    totalErrors += errors;
  }

  console.log();
  console.log('='.repeat(80));
  console.log('RESUMEN');
  console.log('='.repeat(80));
  console.log();
  console.log(`✓ Total de niveles insertados: ${totalInserted}`);
  console.log(`✗ Total de errores: ${totalErrors}`);
  console.log();
  console.log('NOTA: Solo se han insertado Bárbaro y Bardo (40 niveles)');
  console.log('Faltan 9 clases × 20 niveles = 180 niveles más');
  console.log();
}

main().catch(console.error);
