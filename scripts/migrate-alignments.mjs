import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Los 9 alineamientos de D&D 3.5
const ALIGNMENTS = [
  {
    code: 'LG',
    name_es: 'Legal Bueno',
    name_en: 'Lawful Good',
    description_es: 'Un personaje legal bueno actúa como se espera o requiere que actúe una persona buena. Combina el compromiso de oponerse al mal con la disciplina de luchar incansablemente. Dice la verdad, mantiene su palabra, ayuda a los necesitados y habla contra la injusticia.',
    description_en: 'A lawful good character acts as a good person is expected or required to act. They combine a commitment to oppose evil with the discipline to fight relentlessly. They tell the truth, keep their word, help those in need, and speak out against injustice.',
    axis_law_chaos: 'Lawful',
    axis_good_evil: 'Good',
    sort_order: 1
  },
  {
    code: 'NG',
    name_es: 'Neutral Bueno',
    name_en: 'Neutral Good',
    description_es: 'Un personaje neutral bueno hace lo mejor que una buena persona puede hacer. Está dedicado a ayudar a otros. Trabaja con reyes y magistrados pero no se siente en deuda con ellos.',
    description_en: 'A neutral good character does the best that a good person can do. They are devoted to helping others. They work with kings and magistrates but do not feel beholden to them.',
    axis_law_chaos: 'Neutral',
    axis_good_evil: 'Good',
    sort_order: 2
  },
  {
    code: 'CG',
    name_es: 'Caótico Bueno',
    name_en: 'Chaotic Good',
    description_es: 'Un personaje caótico bueno actúa según le dicta su conciencia, con poca consideración por lo que otros esperan de él. Hace su propio camino, pero es amable y benevolente. Cree en el bien y el derecho pero tiene poco uso para las leyes y regulaciones.',
    description_en: 'A chaotic good character acts as their conscience directs them with little regard for what others expect. They make their own way, but are kind and benevolent. They believe in goodness and right but have little use for laws and regulations.',
    axis_law_chaos: 'Chaotic',
    axis_good_evil: 'Good',
    sort_order: 3
  },
  {
    code: 'LN',
    name_es: 'Legal Neutral',
    name_en: 'Lawful Neutral',
    description_es: 'Un personaje legal neutral actúa según lo dicta la ley, la tradición o un código personal. El orden y la organización son primordiales. Puede creer en el orden personal y vivir según un código o estándar, o puede creer en el orden para todos.',
    description_en: 'A lawful neutral character acts as law, tradition, or a personal code directs them. Order and organization are paramount. They may believe in personal order and live by a code or standard, or they may believe in order for all.',
    axis_law_chaos: 'Lawful',
    axis_good_evil: 'Neutral',
    sort_order: 4
  },
  {
    code: 'TN',
    name_es: 'Neutral',
    name_en: 'True Neutral',
    description_es: 'Un personaje neutral no se inclina fuertemente hacia el bien o el mal, la ley o el caos. Evita tomar partido, no se siente fuertemente de una manera u otra. La mayoría de las personas neutrales son neutrales porque no tienen convicción en lugar de compromiso con la neutralidad.',
    description_en: 'A neutral character does not feel strongly one way or the other about good vs. evil or law vs. chaos. They avoid taking sides, not feeling strongly one way or the other. Most neutral people are neutral because they lack conviction rather than commitment to neutrality.',
    axis_law_chaos: 'Neutral',
    axis_good_evil: 'Neutral',
    sort_order: 5
  },
  {
    code: 'CN',
    name_es: 'Caótico Neutral',
    name_en: 'Chaotic Neutral',
    description_es: 'Un personaje caótico neutral sigue sus caprichos. Es un individualista primero y último. Valora su propia libertad pero no se esfuerza por proteger la libertad de otros. Evita la autoridad, resiente las restricciones y desafía las tradiciones.',
    description_en: 'A chaotic neutral character follows their whims. They are an individualist first and last. They value their own liberty but do not strive to protect others\' freedom. They avoid authority, resent restrictions, and challenge traditions.',
    axis_law_chaos: 'Chaotic',
    axis_good_evil: 'Neutral',
    sort_order: 6
  },
  {
    code: 'LE',
    name_es: 'Legal Malvado',
    name_en: 'Lawful Evil',
    description_es: 'Un personaje legal malvado toma metódicamente lo que quiere dentro de los límites de su código de conducta sin consideración por aquellos a quienes daña. Se preocupa por la tradición, la lealtad y el orden, pero no por la libertad, la dignidad o la vida.',
    description_en: 'A lawful evil character methodically takes what they want within the limits of their code of conduct without regard for whom it hurts. They care about tradition, loyalty, and order but not about freedom, dignity, or life.',
    axis_law_chaos: 'Lawful',
    axis_good_evil: 'Evil',
    sort_order: 7
  },
  {
    code: 'NE',
    name_es: 'Neutral Malvado',
    name_en: 'Neutral Evil',
    description_es: 'Un personaje neutral malvado hace lo que sea que pueda salirse con la suya. Es puro egoísmo sin honor y sin variación. No derrama lágrimas por aquellos a quienes mata, ya sea por beneficio, deporte o conveniencia.',
    description_en: 'A neutral evil character does whatever they can get away with. They are out for themselves, pure and simple. They shed no tears for those they kill, whether for profit, sport, or convenience.',
    axis_law_chaos: 'Neutral',
    axis_good_evil: 'Evil',
    sort_order: 8
  },
  {
    code: 'CE',
    name_es: 'Caótico Malvado',
    name_en: 'Chaotic Evil',
    description_es: 'Un personaje caótico malvado hace lo que su codicia, odio y lujuria por la destrucción lo impulsan a hacer. Es temperamental, vicioso, arbitrariamente violento e impredecible. Si simplemente está tras lo que puede obtener, es despiadado y brutal.',
    description_en: 'A chaotic evil character does whatever their greed, hatred, and lust for destruction drive them to do. They are hot-tempered, vicious, arbitrarily violent, and unpredictable. If they are simply out for whatever they can get, they are ruthless and brutal.',
    axis_law_chaos: 'Chaotic',
    axis_good_evil: 'Evil',
    sort_order: 9
  }
];

async function migrateAlignments() {
  console.log('🚀 Starting migration of alignments...\n');

  let successCount = 0;
  let failCount = 0;

  for (const alignment of ALIGNMENTS) {
    try {
      const { data, error } = await supabase
        .from('alignments')
        .upsert(alignment, {
          onConflict: 'code',
        })
        .select();

      if (error) {
        console.error(`❌ Error with "${alignment.name_es}" (${alignment.code}):`, error.message);
        failCount++;
      } else {
        console.log(`✅ Successfully migrated: ${alignment.name_es} (${alignment.code})`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Unexpected error with "${alignment.name_es}":`, err);
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 MIGRATION SUMMARY:');
  console.log('='.repeat(60));
  console.log(`Total alignments processed: ${ALIGNMENTS.length}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`Success rate: ${((successCount / ALIGNMENTS.length) * 100).toFixed(2)}%`);

  if (failCount === 0) {
    console.log('\n🎉 All alignments migrated successfully!');
  } else {
    console.log('\n⚠️  Some alignments failed to migrate. Please check the errors above.');
  }
}

// Ejecutar la migración
migrateAlignments()
  .then(() => {
    console.log('\n✅ Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration script failed:', error);
    process.exit(1);
  });