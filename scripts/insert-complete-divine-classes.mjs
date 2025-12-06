import { createClient } from '@supabase/supabase-js';

// Using service_role key to bypass RLS
const supabase = createClient(
  'https://akcuvlanpqpoizconuhm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrY3V2bGFucHFwb2l6Y29udWhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzExNzMwMCwiZXhwIjoyMDc4NjkzMzAwfQ.pIfA0AwG1J9VSp4jp50BaAqhgMR1V-A_QNmS5xs8AXA'
);

// =============================================
// COMPLETE DIVINE - SPIRIT SHAMAN
// =============================================
const classes = [
  {
    slug: 'spirit-shaman',
    titulo: 'Chamán de los Espíritus',
    titulo_en: 'Spirit Shaman',
    subtitulo: 'Intermediarios entre el mundo mortal y el de los espíritus.',
    subtitulo_en: 'Intermediaries between the mortal and spirit worlds.',
    description: 'El chamán de los espíritus es un lanzador divino que obtiene su poder de los espíritus de la naturaleza. A diferencia del druida, el chamán no venera la naturaleza en sí misma, sino que forma alianzas y pactos con los espíritus que la habitan, actuando como intermediario entre el mundo mortal y el mundo de los espíritus.',
    dg: 8,
    class_skills: ['Concentration', 'Craft', 'Diplomacy', 'Handle Animal', 'Heal', 'Knowledge (nature)', 'Knowledge (the planes)', 'Listen', 'Profession', 'Ride', 'Spot', 'Survival', 'Swim'],
    skill_points_first_level_base: 16,
    skill_points_per_level_base: 4,
    bab: 'medio',
    fort: 'bueno',
    ref: 'pobre',
    will: 'bueno',
    spellcasting: 'si',
    adventures: 'Los chamanes de los espíritus se aventuran porque los espíritus les guían a hacerlo. Buscan lugares sagrados corrompidos para purificarlos o cazan criaturas que perturban el equilibrio espiritual.',
    characteristics: 'El chamán de los espíritus combina conjuros divinos con habilidades únicas contra espíritus y muertos vivientes incorpóreos.',
    alignment: 'Los chamanes tienden hacia la neutralidad, buscando mantener el equilibrio entre fuerzas opuestas.',
    religion: 'Practican una forma de animismo, creyendo que los espíritus habitan en todas las cosas naturales.',
    background: 'La mayoría provienen de culturas tribales donde las tradiciones chamánicas se han preservado durante generaciones.',
    races: 'Los humanos, elfos salvajes, medianos y orcos son los más atraídos hacia esta clase.',
    other_classes: 'Se llevan bien con druidas y rangers, pero pueden chocar con clérigos que desprecian su enfoque espiritual.',
    role: 'Lanzador divino con habilidades especiales contra espíritus e incorpóreos.',
    source_book: 'Complete Divine',
    source_book_abbr: 'CD'
  }
];

// Progression levels 1-20 for Spirit Shaman
const progressions = {
  'spirit-shaman': [
    { level: 1, base_attack_bonus: '+0', fort_save: 2, ref_save: 0, will_save: 2, special_abilities: 'Spirit guide, chastise spirits, detect spirits' },
    { level: 2, base_attack_bonus: '+1', fort_save: 3, ref_save: 0, will_save: 3, special_abilities: 'Blessing of the spirits, wild empathy' },
    { level: 3, base_attack_bonus: '+2', fort_save: 3, ref_save: 1, will_save: 3, special_abilities: 'Follow the guide' },
    { level: 4, base_attack_bonus: '+3', fort_save: 4, ref_save: 1, will_save: 4, special_abilities: 'Warding of the spirits' },
    { level: 5, base_attack_bonus: '+3', fort_save: 4, ref_save: 1, will_save: 4, special_abilities: '' },
    { level: 6, base_attack_bonus: '+4', fort_save: 5, ref_save: 2, will_save: 5, special_abilities: 'Ghost warrior' },
    { level: 7, base_attack_bonus: '+5', fort_save: 5, ref_save: 2, will_save: 5, special_abilities: '' },
    { level: 8, base_attack_bonus: '+6/+1', fort_save: 6, ref_save: 2, will_save: 6, special_abilities: '' },
    { level: 9, base_attack_bonus: '+6/+1', fort_save: 6, ref_save: 3, will_save: 6, special_abilities: 'Recall spirit' },
    { level: 10, base_attack_bonus: '+7/+2', fort_save: 7, ref_save: 3, will_save: 7, special_abilities: '' },
    { level: 11, base_attack_bonus: '+8/+3', fort_save: 7, ref_save: 3, will_save: 7, special_abilities: '' },
    { level: 12, base_attack_bonus: '+9/+4', fort_save: 8, ref_save: 4, will_save: 8, special_abilities: 'Exorcism' },
    { level: 13, base_attack_bonus: '+9/+4', fort_save: 8, ref_save: 4, will_save: 8, special_abilities: '' },
    { level: 14, base_attack_bonus: '+10/+5', fort_save: 9, ref_save: 4, will_save: 9, special_abilities: '' },
    { level: 15, base_attack_bonus: '+11/+6/+1', fort_save: 9, ref_save: 5, will_save: 9, special_abilities: '' },
    { level: 16, base_attack_bonus: '+12/+7/+2', fort_save: 10, ref_save: 5, will_save: 10, special_abilities: 'Spirit form (1/day)' },
    { level: 17, base_attack_bonus: '+12/+7/+2', fort_save: 10, ref_save: 5, will_save: 10, special_abilities: '' },
    { level: 18, base_attack_bonus: '+13/+8/+3', fort_save: 11, ref_save: 6, will_save: 11, special_abilities: 'Spirit form (2/day)' },
    { level: 19, base_attack_bonus: '+14/+9/+4', fort_save: 11, ref_save: 6, will_save: 11, special_abilities: '' },
    { level: 20, base_attack_bonus: '+15/+10/+5', fort_save: 12, ref_save: 6, will_save: 12, special_abilities: 'Spirit form (3/day), favored of the spirits' }
  ]
};

// Class fluff (narrative)
const classFluff = {
  'spirit-shaman': {
    intro_long: 'El chamán de los espíritus sirve como enlace entre el mundo mortal y el reino de los espíritus. A través de rituales ancestrales y la guía de su espíritu guía, puede canalizar el poder de los espíritus de la naturaleza para sanar, proteger y castigar.',
    intro_long_en: 'The spirit shaman serves as a link between the mortal world and the spirit realm. Through ancestral rituals and guidance from their spirit guide, they can channel the power of nature spirits to heal, protect, and punish.',
    why_adventure_short: 'Deber espiritual',
    why_adventure_short_en: 'Spiritual duty',
    why_adventure_long: 'Los chamanes de los espíritus se aventuran porque los espíritus les guían a hacerlo. Pueden buscar lugares sagrados corrompidos para purificarlos, cazar criaturas que perturban el equilibrio espiritual, o simplemente seguir el camino que su guía espiritual les muestra.',
    why_adventure_long_en: 'Spirit shamans adventure because the spirits guide them to do so. They may seek corrupted sacred sites to purify, hunt creatures that disturb the spiritual balance, or simply follow the path their spirit guide shows them.',
    power_source_type: 'divino',
    power_source_type_en: 'divine',
    power_source_short: 'Pactos con espíritus',
    power_source_short_en: 'Spirit pacts',
    power_source_long: 'El poder del chamán proviene de los espíritus de la naturaleza con los que ha formado pactos. Su guía espiritual actúa como intermediario, permitiéndole acceder a conjuros divinos sin venerar una deidad específica.',
    power_source_long_en: 'The shaman\'s power comes from nature spirits with whom they have formed pacts. Their spirit guide acts as an intermediary, allowing them to access divine spells without worshipping a specific deity.',
    group_role_short: 'Lanzador divino versátil',
    group_role_short_en: 'Versatile divine caster',
    group_role_long: 'El chamán de los espíritus funciona como sanador y lanzador de conjuros de soporte. Sus habilidades únicas contra espíritus y muertos vivientes lo hacen especialmente valioso en encuentros con tales criaturas.',
    group_role_long_en: 'The spirit shaman functions as a healer and support spellcaster. Their unique abilities against spirits and undead make them especially valuable in encounters with such creatures.',
    social_origin_short: 'Comunidades tribales',
    social_origin_short_en: 'Tribal communities',
    social_origin_long: 'La mayoría de los chamanes de los espíritus provienen de culturas tribales donde las tradiciones chamánicas se han preservado durante generaciones. El conocimiento se transmite de maestro a aprendiz a través de rituales y visiones.',
    social_origin_long_en: 'Most spirit shamans come from tribal cultures where shamanic traditions have been preserved for generations. Knowledge is passed from master to apprentice through rituals and visions.',
    religious_focus_short: 'Animismo espiritual',
    religious_focus_short_en: 'Spiritual animism',
    religious_focus_long: 'Los chamanes de los espíritus practican una forma de animismo, creyendo que los espíritus habitan en todas las cosas naturales. Pueden respetar a los dioses, pero su devoción principal es hacia los espíritus de la naturaleza.',
    religious_focus_long_en: 'Spirit shamans practice a form of animism, believing spirits inhabit all natural things. They may respect the gods, but their primary devotion is to the spirits of nature.',
    typical_deities: ['Obad-Hai', 'Ehlonna', 'Corellon Larethian'],
    alignment_tendency: 'neutral',
    alignment_short: 'Neutral, evita extremos',
    alignment_short_en: 'Neutral, avoids extremes',
    alignment_long: 'Los chamanes de los espíritus tienden hacia la neutralidad, buscando mantener el equilibrio entre fuerzas opuestas. Sin embargo, pueden ser de cualquier alineamiento dependiendo de los espíritus con los que pactan.',
    alignment_long_en: 'Spirit shamans tend toward neutrality, seeking to maintain balance between opposing forces. However, they can be of any alignment depending on the spirits they pact with.',
    typical_races: ['Humano', 'Elfo salvaje', 'Mediano', 'Orco']
  }
};

// Class features
const classFeatures = [
  { class_slug: 'spirit-shaman', level: 1, title: 'Guía Espiritual', summary: 'Obtiene un espíritu guía que lo asesora.', full_description: 'Un chamán de los espíritus tiene un guía espiritual, una entidad incorpórea que solo él puede ver y oír. El guía espiritual habita el mundo de los espíritus y otorga al chamán acceso a sus conjuros. El guía espiritual tiene una personalidad definida y puede aconsejar al chamán, aunque solo él puede interactuar con él.' },
  { class_slug: 'spirit-shaman', level: 1, title: 'Castigar Espíritus', summary: 'Puede dañar espíritus y muertos vivientes incorpóreos.', full_description: 'Un chamán de los espíritus puede canalizar energía espiritual para dañar espíritus y muertos vivientes incorpóreos. Funciona como Expulsar Muertos Vivientes, pero solo afecta a criaturas incorpóreas y espíritus. Puede usar esta habilidad 3 + modificador de Carisma veces por día.' },
  { class_slug: 'spirit-shaman', level: 1, title: 'Detectar Espíritus', summary: 'Puede sentir la presencia de espíritus cercanos.', full_description: 'A voluntad, el chamán puede detectar la presencia de espíritus (incluyendo muertos vivientes incorpóreos, elementales y fey) dentro de 60 pies. Esto funciona como Detectar Muertos Vivientes pero afecta a todas las criaturas espirituales.' },
  { class_slug: 'spirit-shaman', level: 2, title: 'Bendición de los Espíritus', summary: 'Puede aplicar metamagia espontánea a conjuros curativos.', full_description: 'A nivel 2, el chamán puede aplicar cualquier dote de metamagia que conozca a conjuros de curación sin aumentar el tiempo de lanzamiento ni gastar espacios de conjuro superiores. Solo puede usar una dote de metamagia por conjuro de esta manera.' },
  { class_slug: 'spirit-shaman', level: 2, title: 'Empatía Salvaje', summary: 'Puede comunicarse con animales.', full_description: 'El chamán puede mejorar la actitud de un animal, funcionando como la habilidad del druida del mismo nombre. Usa su nivel de chamán + modificador de Carisma.' },
  { class_slug: 'spirit-shaman', level: 3, title: 'Seguir al Guía', summary: 'El guía espiritual puede explorar adelante.', full_description: 'A nivel 3, el chamán puede enviar a su guía espiritual a explorar. El guía puede alejarse hasta 1 milla por nivel de chamán y reportar lo que ve. Mientras el guía está explorando, el chamán no puede lanzar conjuros.' },
  { class_slug: 'spirit-shaman', level: 4, title: 'Protección de los Espíritus', summary: 'Aura de protección contra espíritus malignos.', full_description: 'A nivel 4, el chamán está constantemente protegido como si estuviera bajo Protección contra el Mal, pero solo contra espíritus, muertos vivientes incorpóreos, elementales y fey. Esta es una habilidad sobrenatural siempre activa.' },
  { class_slug: 'spirit-shaman', level: 6, title: 'Guerrero Fantasma', summary: 'Las armas funcionan contra incorpóreos.', full_description: 'A nivel 6, las armas que empuña el chamán se consideran armas fantasmales, capaces de golpear a criaturas incorpóreas con toda su efectividad. Este es un efecto sobrenatural.' },
  { class_slug: 'spirit-shaman', level: 9, title: 'Invocar Espíritu', summary: 'Puede devolver un espíritu al cuerpo brevemente.', full_description: 'A nivel 9, una vez al día, el chamán puede invocar el espíritu de una criatura muerta recientemente (hasta 1 día por nivel de chamán) para hacerle preguntas. El espíritu debe responder honestamente y puede responder una pregunta por cada dos niveles de chamán.' },
  { class_slug: 'spirit-shaman', level: 12, title: 'Exorcismo', summary: 'Puede expulsar espíritus de cuerpos poseídos.', full_description: 'A nivel 12, el chamán puede intentar exorcizar un espíritu que posee una criatura o ubicación. Esto requiere un ritual de 1 minuto y una tirada de nivel de lanzador contra el espíritu (CD 11 + DG del espíritu). El éxito expulsa al espíritu y le impide regresar durante 24 horas.' },
  { class_slug: 'spirit-shaman', level: 16, title: 'Forma Espiritual', summary: 'Puede volverse incorpóreo temporalmente.', full_description: 'A nivel 16, una vez al día, el chamán puede volverse incorpóreo durante un número de rondas igual a su nivel de chamán. Mientras está incorpóreo, puede pasar a través de objetos sólidos y es inmune a ataques físicos normales, pero no puede afectar el mundo físico ni lanzar la mayoría de los conjuros.' },
  { class_slug: 'spirit-shaman', level: 18, title: 'Forma Espiritual (2/día)', summary: 'Puede usar forma espiritual dos veces al día.', full_description: 'A nivel 18, el chamán puede usar su habilidad de forma espiritual dos veces al día.' },
  { class_slug: 'spirit-shaman', level: 20, title: 'Favorito de los Espíritus', summary: 'Los espíritus lo protegen de la muerte.', full_description: 'A nivel 20, si el chamán muere, los espíritus lo protegen. Su cuerpo no puede ser animado como muerto viviente, no puede ser resucitado contra su voluntad, y si lo desea, puede elegir regresar a la vida una vez (como Resurrección Verdadera) sin necesidad de componentes materiales, siempre que su cuerpo no haya sido destruido.' },
  { class_slug: 'spirit-shaman', level: 20, title: 'Forma Espiritual (3/día)', summary: 'Puede usar forma espiritual tres veces al día.', full_description: 'A nivel 20, el chamán puede usar su habilidad de forma espiritual tres veces al día.' }
];

async function run() {
  console.log('=== COMPLETE DIVINE - SPIRIT SHAMAN ===\n');

  // 1. Insert class
  console.log('1. Insertando clase...');
  for (const cls of classes) {
    const { error } = await supabase.from('classes').upsert(cls, { onConflict: 'slug' });
    if (error) {
      console.error(`❌ Error insertando ${cls.slug}:`, error.message);
    } else {
      console.log(`✅ Clase insertada: ${cls.titulo}`);
    }
  }

  // 2. Get class IDs
  const { data: classData } = await supabase
    .from('classes')
    .select('id, slug')
    .in('slug', ['spirit-shaman']);

  const classIds = {};
  classData?.forEach(c => classIds[c.slug] = c.id);
  console.log('\nIDs obtenidos:', classIds);

  // 3. Insert progressions
  console.log('\n2. Insertando progresiones...');
  let progCount = 0;
  for (const [slug, levels] of Object.entries(progressions)) {
    for (const level of levels) {
      const { error } = await supabase.from('class_progression').insert({
        class_slug: slug,
        ...level
      });
      if (error && error.code !== '23505') {
        console.error(`❌ Error en progresión ${slug} lvl ${level.level}:`, error.message);
      } else {
        progCount++;
      }
    }
  }
  console.log(`✅ Progresiones insertadas: ${progCount}`);

  // 4. Insert fluff
  console.log('\n3. Insertando fluff (trasfondo)...');
  for (const [slug, fluff] of Object.entries(classFluff)) {
    const { error } = await supabase.from('class_fluff').upsert({
      class_id: classIds[slug],
      ...fluff
    }, { onConflict: 'class_id' });
    if (error) {
      console.error(`❌ Error en fluff ${slug}:`, error.message);
    } else {
      console.log(`✅ Fluff insertado: ${slug}`);
    }
  }

  // 5. Insert features
  console.log('\n4. Insertando rasgos de clase...');
  let featCount = 0;
  for (const feature of classFeatures) {
    const { error } = await supabase.from('class_features').insert(feature);
    if (error && error.code !== '23505') {
      console.error(`❌ Error en feature ${feature.title}:`, error.message);
    } else {
      featCount++;
      console.log(`✅ ${feature.class_slug} lvl ${feature.level}: ${feature.title}`);
    }
  }

  // Verification
  console.log('\n=== VERIFICACIÓN ===');
  const { data: verifyClass } = await supabase.from('classes').select('slug, titulo').eq('slug', 'spirit-shaman');
  const { data: verifyProg } = await supabase.from('class_progression').select('level').eq('class_slug', 'spirit-shaman');
  const { data: verifyFeat } = await supabase.from('class_features').select('title').eq('class_slug', 'spirit-shaman');

  console.log(`Clases: ${verifyClass?.length || 0}`);
  console.log(`Niveles de progresión: ${verifyProg?.length || 0}`);
  console.log(`Rasgos de clase: ${verifyFeat?.length || 0}`);
}

run().catch(console.error);
