import { createClient } from '@supabase/supabase-js';

// Using service_role key to bypass RLS
const supabase = createClient(
  'https://akcuvlanpqpoizconuhm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrY3V2bGFucHFwb2l6Y29udWhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzExNzMwMCwiZXhwIjoyMDc4NjkzMzAwfQ.pIfA0AwG1J9VSp4jp50BaAqhgMR1V-A_QNmS5xs8AXA'
);

// =============================================================================
// COMPLETE WARRIOR CLASSES DATA - Using CORRECT schema (verified from DB)
// dg = INTEGER (not string)
// bab/fort/ref/will = 'bueno'/'pobre' (Spanish values)
// spellcasting = 'arcano'/'divino'/'no'
// fort_save/ref_save/will_save in progression = INTEGER (not string with '+')
// =============================================================================

const classes = [
  {
    slug: 'hexblade',
    titulo: 'Hexblade',
    titulo_en: 'Hexblade',
    subtitulo: 'Guerreros que combinan hechizos oscuros con habilidades de combate.',
    subtitulo_en: 'Warriors who combine dark magic with combat skills.',
    description: 'Combinando los poderes de hechizos y armas, el hexblade equilibra talentos en combate y magia arcana. Los hexblades maldicen a sus enemigos, volviéndoles la suerte en su contra. A niveles superiores, obtienen la capacidad de lanzar conjuros.',
    dg: 10, // INTEGER
    skill_points_first_level_base: 8,
    skill_points_per_level_base: 2,
    class_skills: ['Bluff', 'Concentration', 'Craft', 'Diplomacy', 'Intimidate', 'Knowledge (arcana)', 'Profession', 'Ride', 'Spellcraft'],
    bab: 'bueno',
    fort: 'pobre',
    ref: 'pobre',
    will: 'bueno',
    source_book: 'Complete Warrior',
    source_book_abbr: 'CW',
    spellcasting: 'si',
    adventures: 'Los hexblades se aventuran por ganancia personal, ya sea poder, fama o riqueza.',
    characteristics: 'Los hexblades equilibran talentos en combate y magia arcana.',
    alignment: 'La mayoría de los hexblades son neutrales o malvados. La mayoría son caóticos.',
    religion: 'Muchos hexblades no veneran ninguna deidad.',
    background: 'La mayoría desarrollan sus habilidades a través del autoestudio.',
    races: 'Los humanos y semiorcos son las razas más atraídas hacia la clase hexblade.',
    other_classes: 'Se llevan razonablemente bien con pícaros y bardos.',
    role: 'Combatiente cuerpo a cuerpo con habilidad mágica suplementaria.'
  },
  {
    slug: 'samurai',
    titulo: 'Samurái',
    titulo_en: 'Samurai',
    subtitulo: 'Nobles guerreros dedicados al servicio de un señor.',
    subtitulo_en: 'Noble warriors dedicated to serving a lord.',
    description: 'El samurái es el guerrero definitivo de las sociedades feudales. Maestros de la katana y el wakizashi, los samuráis viven bajo un estricto código de honor conocido como bushido. Son feroces guerreros que valoran su honor por encima de sus vidas.',
    dg: 10,
    skill_points_first_level_base: 8,
    skill_points_per_level_base: 2,
    class_skills: ['Concentration', 'Craft', 'Diplomacy', 'Intimidate', 'Knowledge (history)', 'Knowledge (nobility and royalty)', 'Ride', 'Sense Motive'],
    bab: 'bueno',
    fort: 'bueno',
    ref: 'pobre',
    will: 'pobre',
    source_book: 'Complete Warrior',
    source_book_abbr: 'CW',
    spellcasting: 'no',
    adventures: 'Los samuráis se aventuran principalmente para ganar honor y gloria.',
    characteristics: 'Maestros de las artes marciales con un código de honor inquebrantable.',
    alignment: 'Los samuráis deben ser legales. Viven bajo el código del bushido.',
    religion: 'Típicamente adoran dioses de la guerra, el honor o sus ancestros.',
    background: 'Nacen en su rol, parte de una clase guerrera hereditaria.',
    races: 'Los humanos son los samuráis predominantes.',
    other_classes: 'Trabajan bien con guerreros disciplinados como paladines.',
    role: 'Combatiente de primera línea con habilidades de intimidación.'
  },
  {
    slug: 'swashbuckler',
    titulo: 'Espadachín',
    titulo_en: 'Swashbuckler',
    subtitulo: 'Artista del combate que combina gracia y velocidad.',
    subtitulo_en: 'Combat artist combining grace and speed.',
    description: 'Un maestro del elegante juego de espadas, el swashbuckler confía en la agilidad, el ingenio y el encanto tanto como en la habilidad con la hoja. Favorecen la finura sobre la fuerza bruta, bailando alrededor de sus oponentes mientras entregan golpes precisos.',
    dg: 10,
    skill_points_first_level_base: 16,
    skill_points_per_level_base: 4,
    class_skills: ['Balance', 'Bluff', 'Climb', 'Craft', 'Diplomacy', 'Escape Artist', 'Jump', 'Profession', 'Sense Motive', 'Swim', 'Tumble', 'Use Rope'],
    bab: 'bueno',
    fort: 'bueno',
    ref: 'pobre',
    will: 'pobre',
    source_book: 'Complete Warrior',
    source_book_abbr: 'CW',
    spellcasting: 'no',
    adventures: 'Los swashbucklers se aventuran por gloria, emoción y riqueza.',
    characteristics: 'Confían en la agilidad e ingenio en lugar de fuerza bruta.',
    alignment: 'Pueden ser de cualquier alineamiento, aunque la mayoría tienden hacia el caos.',
    religion: 'Muchos son demasiado independientes para dedicarse a cualquier deidad.',
    background: 'Vienen de muchos ámbitos: nobles fracasados, piratas, plebeyos ágiles.',
    races: 'Humanos, semielfos y elfos. Los medianos también sobresalen.',
    other_classes: 'Se llevan bien con pícaros y bardos.',
    role: 'Combatiente cuerpo a cuerpo móvil con habilidades basadas en inteligencia.'
  }
];

// Class progression data - using correct column types (saves as INTEGER)
const progressions = {
  hexblade: [
    { level: 1, base_attack_bonus: '+1', fort_save: 0, ref_save: 0, will_save: 2, special_abilities: "Hexblade's curse 1/day" },
    { level: 2, base_attack_bonus: '+2', fort_save: 0, ref_save: 0, will_save: 3, special_abilities: 'Arcane resistance' },
    { level: 3, base_attack_bonus: '+3', fort_save: 1, ref_save: 1, will_save: 3, special_abilities: 'Mettle' },
    { level: 4, base_attack_bonus: '+4', fort_save: 1, ref_save: 1, will_save: 4, special_abilities: 'Summon familiar' },
    { level: 5, base_attack_bonus: '+5', fort_save: 1, ref_save: 1, will_save: 4, special_abilities: 'Bonus feat' },
    { level: 6, base_attack_bonus: '+6/+1', fort_save: 2, ref_save: 2, will_save: 5, special_abilities: "Hexblade's curse 2/day" },
    { level: 7, base_attack_bonus: '+7/+2', fort_save: 2, ref_save: 2, will_save: 5, special_abilities: "Greater hexblade's curse" },
    { level: 8, base_attack_bonus: '+8/+3', fort_save: 2, ref_save: 2, will_save: 6, special_abilities: '—' },
    { level: 9, base_attack_bonus: '+9/+4', fort_save: 3, ref_save: 3, will_save: 6, special_abilities: '—' },
    { level: 10, base_attack_bonus: '+10/+5', fort_save: 3, ref_save: 3, will_save: 7, special_abilities: 'Bonus feat' },
    { level: 11, base_attack_bonus: '+11/+6/+1', fort_save: 3, ref_save: 3, will_save: 7, special_abilities: "Hexblade's curse 3/day" },
    { level: 12, base_attack_bonus: '+12/+7/+2', fort_save: 4, ref_save: 4, will_save: 8, special_abilities: 'Aura of unluck' },
    { level: 13, base_attack_bonus: '+13/+8/+3', fort_save: 4, ref_save: 4, will_save: 8, special_abilities: '—' },
    { level: 14, base_attack_bonus: '+14/+9/+4', fort_save: 4, ref_save: 4, will_save: 9, special_abilities: '—' },
    { level: 15, base_attack_bonus: '+15/+10/+5', fort_save: 5, ref_save: 5, will_save: 9, special_abilities: 'Bonus feat' },
    { level: 16, base_attack_bonus: '+16/+11/+6/+1', fort_save: 5, ref_save: 5, will_save: 10, special_abilities: "Hexblade's curse 4/day" },
    { level: 17, base_attack_bonus: '+17/+12/+7/+2', fort_save: 5, ref_save: 5, will_save: 10, special_abilities: '—' },
    { level: 18, base_attack_bonus: '+18/+13/+8/+3', fort_save: 6, ref_save: 6, will_save: 11, special_abilities: '—' },
    { level: 19, base_attack_bonus: '+19/+14/+9/+4', fort_save: 6, ref_save: 6, will_save: 11, special_abilities: "Dire hexblade's curse" },
    { level: 20, base_attack_bonus: '+20/+15/+10/+5', fort_save: 6, ref_save: 6, will_save: 12, special_abilities: 'Bonus feat' }
  ],
  samurai: [
    { level: 1, base_attack_bonus: '+1', fort_save: 2, ref_save: 0, will_save: 0, special_abilities: 'Daisho proficiency, two swords as one' },
    { level: 2, base_attack_bonus: '+2', fort_save: 3, ref_save: 0, will_save: 0, special_abilities: '—' },
    { level: 3, base_attack_bonus: '+3', fort_save: 3, ref_save: 1, will_save: 1, special_abilities: 'Kiai smite 1/day' },
    { level: 4, base_attack_bonus: '+4', fort_save: 4, ref_save: 1, will_save: 1, special_abilities: '—' },
    { level: 5, base_attack_bonus: '+5', fort_save: 4, ref_save: 1, will_save: 1, special_abilities: 'Iaijutsu master' },
    { level: 6, base_attack_bonus: '+6/+1', fort_save: 5, ref_save: 2, will_save: 2, special_abilities: '—' },
    { level: 7, base_attack_bonus: '+7/+2', fort_save: 5, ref_save: 2, will_save: 2, special_abilities: 'Kiai smite 2/day, staredown' },
    { level: 8, base_attack_bonus: '+8/+3', fort_save: 6, ref_save: 2, will_save: 2, special_abilities: '—' },
    { level: 9, base_attack_bonus: '+9/+4', fort_save: 6, ref_save: 3, will_save: 3, special_abilities: 'Frightful presence' },
    { level: 10, base_attack_bonus: '+10/+5', fort_save: 7, ref_save: 3, will_save: 3, special_abilities: '—' },
    { level: 11, base_attack_bonus: '+11/+6/+1', fort_save: 7, ref_save: 3, will_save: 3, special_abilities: 'Kiai smite 3/day, mass staredown' },
    { level: 12, base_attack_bonus: '+12/+7/+2', fort_save: 8, ref_save: 4, will_save: 4, special_abilities: '—' },
    { level: 13, base_attack_bonus: '+13/+8/+3', fort_save: 8, ref_save: 4, will_save: 4, special_abilities: 'Improved initiative' },
    { level: 14, base_attack_bonus: '+14/+9/+4', fort_save: 9, ref_save: 4, will_save: 4, special_abilities: '—' },
    { level: 15, base_attack_bonus: '+15/+10/+5', fort_save: 9, ref_save: 5, will_save: 5, special_abilities: 'Kiai smite 4/day' },
    { level: 16, base_attack_bonus: '+16/+11/+6/+1', fort_save: 10, ref_save: 5, will_save: 5, special_abilities: '—' },
    { level: 17, base_attack_bonus: '+17/+12/+7/+2', fort_save: 10, ref_save: 5, will_save: 5, special_abilities: 'Daisho expertise' },
    { level: 18, base_attack_bonus: '+18/+13/+8/+3', fort_save: 11, ref_save: 6, will_save: 6, special_abilities: '—' },
    { level: 19, base_attack_bonus: '+19/+14/+9/+4', fort_save: 11, ref_save: 6, will_save: 6, special_abilities: 'Kiai smite 5/day, supreme staredown' },
    { level: 20, base_attack_bonus: '+20/+15/+10/+5', fort_save: 12, ref_save: 6, will_save: 6, special_abilities: 'Daisho mastery' }
  ],
  swashbuckler: [
    { level: 1, base_attack_bonus: '+1', fort_save: 2, ref_save: 0, will_save: 0, special_abilities: 'Weapon Finesse' },
    { level: 2, base_attack_bonus: '+2', fort_save: 3, ref_save: 0, will_save: 0, special_abilities: 'Grace +1' },
    { level: 3, base_attack_bonus: '+3', fort_save: 3, ref_save: 1, will_save: 1, special_abilities: 'Insightful strike' },
    { level: 4, base_attack_bonus: '+4', fort_save: 4, ref_save: 1, will_save: 1, special_abilities: '—' },
    { level: 5, base_attack_bonus: '+5', fort_save: 4, ref_save: 1, will_save: 1, special_abilities: 'Dodge bonus +1' },
    { level: 6, base_attack_bonus: '+6/+1', fort_save: 5, ref_save: 2, will_save: 2, special_abilities: '—' },
    { level: 7, base_attack_bonus: '+7/+2', fort_save: 5, ref_save: 2, will_save: 2, special_abilities: 'Acrobatic charge' },
    { level: 8, base_attack_bonus: '+8/+3', fort_save: 6, ref_save: 2, will_save: 2, special_abilities: 'Improved flanking' },
    { level: 9, base_attack_bonus: '+9/+4', fort_save: 6, ref_save: 3, will_save: 3, special_abilities: '—' },
    { level: 10, base_attack_bonus: '+10/+5', fort_save: 7, ref_save: 3, will_save: 3, special_abilities: 'Dodge bonus +2' },
    { level: 11, base_attack_bonus: '+11/+6/+1', fort_save: 7, ref_save: 3, will_save: 3, special_abilities: 'Grace +2, lucky' },
    { level: 12, base_attack_bonus: '+12/+7/+2', fort_save: 8, ref_save: 4, will_save: 4, special_abilities: '—' },
    { level: 13, base_attack_bonus: '+13/+8/+3', fort_save: 8, ref_save: 4, will_save: 4, special_abilities: 'Acrobatic skill mastery' },
    { level: 14, base_attack_bonus: '+14/+9/+4', fort_save: 9, ref_save: 4, will_save: 4, special_abilities: 'Weakening critical' },
    { level: 15, base_attack_bonus: '+15/+10/+5', fort_save: 9, ref_save: 5, will_save: 5, special_abilities: 'Dodge bonus +3' },
    { level: 16, base_attack_bonus: '+16/+11/+6/+1', fort_save: 10, ref_save: 5, will_save: 5, special_abilities: '—' },
    { level: 17, base_attack_bonus: '+17/+12/+7/+2', fort_save: 10, ref_save: 5, will_save: 5, special_abilities: 'Wounding critical' },
    { level: 18, base_attack_bonus: '+18/+13/+8/+3', fort_save: 11, ref_save: 6, will_save: 6, special_abilities: '—' },
    { level: 19, base_attack_bonus: '+19/+14/+9/+4', fort_save: 11, ref_save: 6, will_save: 6, special_abilities: 'Lucky (reroll 2/day)' },
    { level: 20, base_attack_bonus: '+20/+15/+10/+5', fort_save: 12, ref_save: 6, will_save: 6, special_abilities: 'Dodge bonus +4, grace +3' }
  ]
};

async function run() {
  console.log('=== Insertando Clases de Complete Warrior ===\n');

  // Insert classes
  for (const cls of classes) {
    console.log(`Insertando clase: ${cls.titulo}...`);
    const { error } = await supabase
      .from('classes')
      .upsert(cls, { onConflict: 'slug' });

    if (error) {
      console.error(`  Error: ${error.message}`);
    } else {
      console.log(`  ✓ ${cls.titulo} insertado`);
    }
  }

  // Insert progressions
  console.log('\n=== Insertando Progresiones de Clase ===\n');
  for (const [classSlug, levels] of Object.entries(progressions)) {
    console.log(`Progresión para ${classSlug}...`);
    let successCount = 0;
    for (const level of levels) {
      const { error } = await supabase
        .from('class_progression')
        .upsert({
          class_slug: classSlug,
          ...level
        }, { onConflict: 'class_slug,level' });

      if (error) {
        console.error(`  Error nivel ${level.level}: ${error.message}`);
      } else {
        successCount++;
      }
    }
    console.log(`  ✓ ${successCount}/20 niveles insertados para ${classSlug}`);
  }

  // Verification
  console.log('\n=== Verificación ===\n');

  const { data: classesData } = await supabase
    .from('classes')
    .select('slug, titulo, source_book, dg, bab')
    .eq('source_book', 'Complete Warrior');

  console.log('Clases de Complete Warrior en BD:');
  console.table(classesData);

  const { data: progressionCount } = await supabase
    .from('class_progression')
    .select('class_slug')
    .in('class_slug', ['hexblade', 'samurai', 'swashbuckler']);

  console.log(`\nTotal niveles de progresión CW: ${progressionCount?.length || 0}`);
}

run().catch(console.error);
