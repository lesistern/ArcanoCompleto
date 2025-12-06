import { createClient } from '@supabase/supabase-js';

// Using service_role key to bypass RLS
const supabase = createClient(
  'https://akcuvlanpqpoizconuhm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrY3V2bGFucHFwb2l6Y29udWhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzExNzMwMCwiZXhwIjoyMDc4NjkzMzAwfQ.pIfA0AwG1J9VSp4jp50BaAqhgMR1V-A_QNmS5xs8AXA'
);

// =============================================
// PLAYER'S HANDBOOK II - 4 NEW CLASSES
// =============================================
const classes = [
  {
    slug: 'beguiler',
    titulo: 'Beguiler',
    titulo_en: 'Beguiler',
    subtitulo: 'Maestros del engaño y la magia de ilusión.',
    subtitulo_en: 'Masters of deception and illusion magic.',
    description: 'El beguiler combina la sutileza del pícaro con poderosos conjuros de encantamiento e ilusión. Prefieren evitar el combate directo, usando su magia para manipular, confundir y engañar a sus enemigos. Son maestros del sigilo y la infiltración.',
    dg: 6,
    class_skills: ['Appraise', 'Balance', 'Bluff', 'Climb', 'Concentration', 'Decipher Script', 'Diplomacy', 'Disable Device', 'Disguise', 'Escape Artist', 'Forgery', 'Gather Information', 'Hide', 'Jump', 'Knowledge (arcana)', 'Knowledge (local)', 'Listen', 'Move Silently', 'Open Lock', 'Profession', 'Search', 'Sense Motive', 'Sleight of Hand', 'Speak Language', 'Spellcraft', 'Spot', 'Swim', 'Tumble', 'Use Magic Device'],
    skill_points_first_level_base: 24,
    skill_points_per_level_base: 6,
    bab: 'medio',
    fort: 'pobre',
    ref: 'pobre',
    will: 'bueno',
    spellcasting: 'si',
    adventures: 'Los beguilers se aventuran para probar sus habilidades de engaño, obtener riquezas o infiltrarse en organizaciones.',
    characteristics: 'Combinan conjuros de ilusión y encantamiento con habilidades de pícaro para manipular a sus enemigos.',
    alignment: 'Pueden ser de cualquier alineamiento, pero muchos son caóticos debido a su naturaleza engañosa.',
    religion: 'Muchos veneran a dioses del engaño, la suerte o la magia.',
    background: 'Los beguilers suelen venir de entornos urbanos donde aprendieron a sobrevivir con su ingenio.',
    races: 'Gnomos y medianos son particularmente atraídos a esta clase.',
    other_classes: 'Se llevan bien con pícaros y bardos; pueden desconfiar de clases más directas.',
    role: 'Controlador y especialista en infiltración.',
    source_book: "Player's Handbook II",
    source_book_abbr: 'PHB2'
  },
  {
    slug: 'dragon-shaman',
    titulo: 'Chamán Dragón',
    titulo_en: 'Dragon Shaman',
    subtitulo: 'Guerreros inspirados por el poder de los dragones.',
    subtitulo_en: 'Warriors inspired by the power of dragons.',
    description: 'El chamán dragón es un guerrero devoto que canaliza el poder de los dragones. Escogen un tipo de dragón como tótem y obtienen habilidades similares a las de esa criatura, incluyendo un aura que beneficia a sus aliados y eventualmente un aliento devastador.',
    dg: 10,
    class_skills: ['Bluff', 'Craft', 'Diplomacy', 'Intimidate', 'Knowledge (nature)', 'Listen', 'Profession', 'Search', 'Sense Motive', 'Spot', 'Survival'],
    skill_points_first_level_base: 8,
    skill_points_per_level_base: 2,
    bab: 'medio',
    fort: 'bueno',
    ref: 'pobre',
    will: 'bueno',
    spellcasting: 'no',
    adventures: 'Se aventuran para honrar a su dragón tótem y demostrar la superioridad de su linaje elegido.',
    characteristics: 'Canalizan el poder de un tipo específico de dragón, obteniendo auras y eventualmente un arma de aliento.',
    alignment: 'Su alineamiento suele reflejar el de su dragón tótem elegido.',
    religion: 'Muchos veneran a Bahamut o Tiamat, dependiendo de su dragón tótem.',
    background: 'Algunos nacen con una conexión innata a los dragones; otros la desarrollan a través de dedicación.',
    races: 'Cualquier raza puede ser atraída a esta clase, especialmente aquellos con herencia dracónica.',
    other_classes: 'Respetan a otras clases que muestran honor y poder; desprecian a los cobardes.',
    role: 'Combatiente de soporte con auras beneficiosas.',
    source_book: "Player's Handbook II",
    source_book_abbr: 'PHB2'
  },
  {
    slug: 'duskblade',
    titulo: 'Duskblade',
    titulo_en: 'Duskblade',
    subtitulo: 'Guerreros arcanos que canalizan conjuros a través de sus armas.',
    subtitulo_en: 'Arcane warriors who channel spells through their weapons.',
    description: 'El duskblade es un guerrero arcano que fusiona perfectamente el combate cuerpo a cuerpo con la magia. Su habilidad más distintiva es canalizar conjuros de toque a través de sus ataques con armas, combinando el daño físico con efectos mágicos devastadores.',
    dg: 8,
    class_skills: ['Climb', 'Concentration', 'Craft', 'Decipher Script', 'Jump', 'Knowledge (arcana)', 'Knowledge (planes)', 'Profession', 'Ride', 'Sense Motive', 'Spellcraft', 'Swim'],
    skill_points_first_level_base: 8,
    skill_points_per_level_base: 2,
    bab: 'bueno',
    fort: 'bueno',
    ref: 'pobre',
    will: 'bueno',
    spellcasting: 'si',
    adventures: 'Los duskblades se aventuran para probar su combinación única de magia y acero en combate.',
    characteristics: 'Fusionan perfectamente conjuros arcanos con combate cuerpo a cuerpo mediante canalización arcana.',
    alignment: 'Pueden ser de cualquier alineamiento.',
    religion: 'Algunos veneran a dioses de la magia o la guerra; muchos no son particularmente devotos.',
    background: 'La mayoría se entrenan en academias especializadas que enseñan esta forma única de combate mágico.',
    races: 'Elfos y humanos son particularmente atraídos a esta clase.',
    other_classes: 'Se llevan bien con otras clases arcanas y guerreras.',
    role: 'Combatiente de primera línea con capacidad mágica.',
    source_book: "Player's Handbook II",
    source_book_abbr: 'PHB2'
  },
  {
    slug: 'knight',
    titulo: 'Caballero',
    titulo_en: 'Knight',
    subtitulo: 'Guerreros honorables que defienden a los débiles.',
    subtitulo_en: 'Honorable warriors who defend the weak.',
    description: 'El caballero es un guerrero devoto de un código de honor estricto. Combina habilidades de combate excepcionales con la capacidad de desafiar a enemigos a duelos y proteger a sus aliados. Su presencia en batalla inspira a sus compañeros y atemoriza a sus enemigos.',
    dg: 12,
    class_skills: ['Climb', 'Craft', 'Diplomacy', 'Handle Animal', 'Intimidate', 'Jump', 'Knowledge (nobility)', 'Profession', 'Ride', 'Swim'],
    skill_points_first_level_base: 8,
    skill_points_per_level_base: 2,
    bab: 'bueno',
    fort: 'bueno',
    ref: 'pobre',
    will: 'pobre',
    spellcasting: 'no',
    adventures: 'Se aventuran para defender el honor, proteger a los inocentes y derrotar el mal.',
    characteristics: 'Guerreros honorables con habilidades de desafío y protección de aliados.',
    alignment: 'Casi siempre legales; el honor es fundamental para su código.',
    religion: 'Muchos veneran dioses del honor, la guerra o la protección.',
    background: 'La mayoría provienen de familias nobles o fueron escuderos de otros caballeros.',
    races: 'Humanos y enanos son particularmente atraídos a esta clase.',
    other_classes: 'Respetan a otras clases honorables; pueden despreciar a quienes no siguen un código.',
    role: 'Defensor y tanque de primera línea.',
    source_book: "Player's Handbook II",
    source_book_abbr: 'PHB2'
  }
];

// =============================================
// PROGRESSIONS (Levels 1-20)
// =============================================
const progressions = {
  'beguiler': [
    { level: 1, base_attack_bonus: '+0', fort_save: 0, ref_save: 0, will_save: 2, special_abilities: 'Armored mage (light), surprise casting, trapfinding' },
    { level: 2, base_attack_bonus: '+1', fort_save: 0, ref_save: 0, will_save: 3, special_abilities: 'Cloaked casting (+1 DC), surprise casting +1d6' },
    { level: 3, base_attack_bonus: '+1', fort_save: 1, ref_save: 1, will_save: 3, special_abilities: 'Advanced learning' },
    { level: 4, base_attack_bonus: '+2', fort_save: 1, ref_save: 1, will_save: 4, special_abilities: '' },
    { level: 5, base_attack_bonus: '+2', fort_save: 1, ref_save: 1, will_save: 4, special_abilities: 'Silent spell' },
    { level: 6, base_attack_bonus: '+3', fort_save: 2, ref_save: 2, will_save: 5, special_abilities: 'Surprise casting +2d6' },
    { level: 7, base_attack_bonus: '+3', fort_save: 2, ref_save: 2, will_save: 5, special_abilities: 'Advanced learning' },
    { level: 8, base_attack_bonus: '+4', fort_save: 2, ref_save: 2, will_save: 6, special_abilities: 'Cloaked casting (+2 DC)' },
    { level: 9, base_attack_bonus: '+4', fort_save: 3, ref_save: 3, will_save: 6, special_abilities: '' },
    { level: 10, base_attack_bonus: '+5', fort_save: 3, ref_save: 3, will_save: 7, special_abilities: 'Still spell, surprise casting +3d6' },
    { level: 11, base_attack_bonus: '+5', fort_save: 3, ref_save: 3, will_save: 7, special_abilities: 'Advanced learning' },
    { level: 12, base_attack_bonus: '+6/+1', fort_save: 4, ref_save: 4, will_save: 8, special_abilities: '' },
    { level: 13, base_attack_bonus: '+6/+1', fort_save: 4, ref_save: 4, will_save: 8, special_abilities: '' },
    { level: 14, base_attack_bonus: '+7/+2', fort_save: 4, ref_save: 4, will_save: 9, special_abilities: 'Cloaked casting (+2 attack), surprise casting +4d6' },
    { level: 15, base_attack_bonus: '+7/+2', fort_save: 5, ref_save: 5, will_save: 9, special_abilities: 'Advanced learning' },
    { level: 16, base_attack_bonus: '+8/+3', fort_save: 5, ref_save: 5, will_save: 10, special_abilities: '' },
    { level: 17, base_attack_bonus: '+8/+3', fort_save: 5, ref_save: 5, will_save: 10, special_abilities: '' },
    { level: 18, base_attack_bonus: '+9/+4', fort_save: 6, ref_save: 6, will_save: 11, special_abilities: 'Surprise casting +5d6' },
    { level: 19, base_attack_bonus: '+9/+4', fort_save: 6, ref_save: 6, will_save: 11, special_abilities: 'Advanced learning' },
    { level: 20, base_attack_bonus: '+10/+5', fort_save: 6, ref_save: 6, will_save: 12, special_abilities: 'Cloaked casting (overcome SR)' }
  ],
  'dragon-shaman': [
    { level: 1, base_attack_bonus: '+0', fort_save: 2, ref_save: 0, will_save: 2, special_abilities: 'Draconic aura +1, totem dragon' },
    { level: 2, base_attack_bonus: '+1', fort_save: 3, ref_save: 0, will_save: 3, special_abilities: 'Skill focus' },
    { level: 3, base_attack_bonus: '+2', fort_save: 3, ref_save: 1, will_save: 3, special_abilities: 'Draconic adaptation' },
    { level: 4, base_attack_bonus: '+3', fort_save: 4, ref_save: 1, will_save: 4, special_abilities: 'Breath weapon (2d6)' },
    { level: 5, base_attack_bonus: '+3', fort_save: 4, ref_save: 1, will_save: 4, special_abilities: 'Draconic aura +2' },
    { level: 6, base_attack_bonus: '+4', fort_save: 5, ref_save: 2, will_save: 5, special_abilities: 'Touch of vitality' },
    { level: 7, base_attack_bonus: '+5', fort_save: 5, ref_save: 2, will_save: 5, special_abilities: 'Natural armor +1' },
    { level: 8, base_attack_bonus: '+6/+1', fort_save: 6, ref_save: 2, will_save: 6, special_abilities: 'Breath weapon (4d6)' },
    { level: 9, base_attack_bonus: '+6/+1', fort_save: 6, ref_save: 3, will_save: 6, special_abilities: 'Energy immunity' },
    { level: 10, base_attack_bonus: '+7/+2', fort_save: 7, ref_save: 3, will_save: 7, special_abilities: 'Draconic aura +3' },
    { level: 11, base_attack_bonus: '+8/+3', fort_save: 7, ref_save: 3, will_save: 7, special_abilities: 'Commune with dragon spirit' },
    { level: 12, base_attack_bonus: '+9/+4', fort_save: 8, ref_save: 4, will_save: 8, special_abilities: 'Breath weapon (6d6), natural armor +2' },
    { level: 13, base_attack_bonus: '+9/+4', fort_save: 8, ref_save: 4, will_save: 8, special_abilities: 'Draconic resolve' },
    { level: 14, base_attack_bonus: '+10/+5', fort_save: 9, ref_save: 4, will_save: 9, special_abilities: '' },
    { level: 15, base_attack_bonus: '+11/+6/+1', fort_save: 9, ref_save: 5, will_save: 9, special_abilities: 'Draconic aura +4' },
    { level: 16, base_attack_bonus: '+12/+7/+2', fort_save: 10, ref_save: 5, will_save: 10, special_abilities: 'Breath weapon (8d6)' },
    { level: 17, base_attack_bonus: '+12/+7/+2', fort_save: 10, ref_save: 5, will_save: 10, special_abilities: 'Natural armor +3' },
    { level: 18, base_attack_bonus: '+13/+8/+3', fort_save: 11, ref_save: 6, will_save: 11, special_abilities: '' },
    { level: 19, base_attack_bonus: '+14/+9/+4', fort_save: 11, ref_save: 6, will_save: 11, special_abilities: '' },
    { level: 20, base_attack_bonus: '+15/+10/+5', fort_save: 12, ref_save: 6, will_save: 12, special_abilities: 'Draconic aura +5, breath weapon (10d6)' }
  ],
  'duskblade': [
    { level: 1, base_attack_bonus: '+1', fort_save: 2, ref_save: 0, will_save: 2, special_abilities: 'Armored mage (light), arcane attunement' },
    { level: 2, base_attack_bonus: '+2', fort_save: 3, ref_save: 0, will_save: 3, special_abilities: 'Combat casting' },
    { level: 3, base_attack_bonus: '+3', fort_save: 3, ref_save: 1, will_save: 3, special_abilities: 'Arcane channeling (melee touch)' },
    { level: 4, base_attack_bonus: '+4', fort_save: 4, ref_save: 1, will_save: 4, special_abilities: 'Armored mage (medium)' },
    { level: 5, base_attack_bonus: '+5', fort_save: 4, ref_save: 1, will_save: 4, special_abilities: 'Quick cast (1/day)' },
    { level: 6, base_attack_bonus: '+6/+1', fort_save: 5, ref_save: 2, will_save: 5, special_abilities: 'Spell power +2' },
    { level: 7, base_attack_bonus: '+7/+2', fort_save: 5, ref_save: 2, will_save: 5, special_abilities: 'Armored mage (heavy)' },
    { level: 8, base_attack_bonus: '+8/+3', fort_save: 6, ref_save: 2, will_save: 6, special_abilities: '' },
    { level: 9, base_attack_bonus: '+9/+4', fort_save: 6, ref_save: 3, will_save: 6, special_abilities: '' },
    { level: 10, base_attack_bonus: '+10/+5', fort_save: 7, ref_save: 3, will_save: 7, special_abilities: 'Quick cast (2/day)' },
    { level: 11, base_attack_bonus: '+11/+6/+1', fort_save: 7, ref_save: 3, will_save: 7, special_abilities: 'Spell power +3' },
    { level: 12, base_attack_bonus: '+12/+7/+2', fort_save: 8, ref_save: 4, will_save: 8, special_abilities: '' },
    { level: 13, base_attack_bonus: '+13/+8/+3', fort_save: 8, ref_save: 4, will_save: 8, special_abilities: 'Arcane channeling (full attack)' },
    { level: 14, base_attack_bonus: '+14/+9/+4', fort_save: 9, ref_save: 4, will_save: 9, special_abilities: '' },
    { level: 15, base_attack_bonus: '+15/+10/+5', fort_save: 9, ref_save: 5, will_save: 9, special_abilities: 'Quick cast (3/day)' },
    { level: 16, base_attack_bonus: '+16/+11/+6/+1', fort_save: 10, ref_save: 5, will_save: 10, special_abilities: 'Spell power +4' },
    { level: 17, base_attack_bonus: '+17/+12/+7/+2', fort_save: 10, ref_save: 5, will_save: 10, special_abilities: '' },
    { level: 18, base_attack_bonus: '+18/+13/+8/+3', fort_save: 11, ref_save: 6, will_save: 11, special_abilities: '' },
    { level: 19, base_attack_bonus: '+19/+14/+9/+4', fort_save: 11, ref_save: 6, will_save: 11, special_abilities: '' },
    { level: 20, base_attack_bonus: '+20/+15/+10/+5', fort_save: 12, ref_save: 6, will_save: 12, special_abilities: 'Quick cast (4/day)' }
  ],
  'knight': [
    { level: 1, base_attack_bonus: '+1', fort_save: 2, ref_save: 0, will_save: 0, special_abilities: "Knight's challenge, fighting challenge +1" },
    { level: 2, base_attack_bonus: '+2', fort_save: 3, ref_save: 0, will_save: 0, special_abilities: 'Mounted combat, shield block +1' },
    { level: 3, base_attack_bonus: '+3', fort_save: 3, ref_save: 1, will_save: 1, special_abilities: 'Bulwark of defense' },
    { level: 4, base_attack_bonus: '+4', fort_save: 4, ref_save: 1, will_save: 1, special_abilities: 'Armor mastery (medium), test of mettle' },
    { level: 5, base_attack_bonus: '+5', fort_save: 4, ref_save: 1, will_save: 1, special_abilities: '' },
    { level: 6, base_attack_bonus: '+6/+1', fort_save: 5, ref_save: 2, will_save: 2, special_abilities: 'Vigilant defender' },
    { level: 7, base_attack_bonus: '+7/+2', fort_save: 5, ref_save: 2, will_save: 2, special_abilities: 'Shield block +2' },
    { level: 8, base_attack_bonus: '+8/+3', fort_save: 6, ref_save: 2, will_save: 2, special_abilities: 'Fighting challenge +2, call to battle' },
    { level: 9, base_attack_bonus: '+9/+4', fort_save: 6, ref_save: 3, will_save: 3, special_abilities: '' },
    { level: 10, base_attack_bonus: '+10/+5', fort_save: 7, ref_save: 3, will_save: 3, special_abilities: 'Shield ally' },
    { level: 11, base_attack_bonus: '+11/+6/+1', fort_save: 7, ref_save: 3, will_save: 3, special_abilities: 'Armor mastery (heavy), impetuous endurance' },
    { level: 12, base_attack_bonus: '+12/+7/+2', fort_save: 8, ref_save: 4, will_save: 4, special_abilities: 'Shield block +3' },
    { level: 13, base_attack_bonus: '+13/+8/+3', fort_save: 8, ref_save: 4, will_save: 4, special_abilities: '' },
    { level: 14, base_attack_bonus: '+14/+9/+4', fort_save: 9, ref_save: 4, will_save: 4, special_abilities: 'Fighting challenge +3' },
    { level: 15, base_attack_bonus: '+15/+10/+5', fort_save: 9, ref_save: 5, will_save: 5, special_abilities: '' },
    { level: 16, base_attack_bonus: '+16/+11/+6/+1', fort_save: 10, ref_save: 5, will_save: 5, special_abilities: 'Bond of loyalty' },
    { level: 17, base_attack_bonus: '+17/+12/+7/+2', fort_save: 10, ref_save: 5, will_save: 5, special_abilities: 'Shield block +4' },
    { level: 18, base_attack_bonus: '+18/+13/+8/+3', fort_save: 11, ref_save: 6, will_save: 6, special_abilities: '' },
    { level: 19, base_attack_bonus: '+19/+14/+9/+4', fort_save: 11, ref_save: 6, will_save: 6, special_abilities: '' },
    { level: 20, base_attack_bonus: '+20/+15/+10/+5', fort_save: 12, ref_save: 6, will_save: 6, special_abilities: 'Fighting challenge +4, loyal beyond death' }
  ]
};

// =============================================
// CLASS FEATURES
// =============================================
const classFeatures = [
  // === BEGUILER ===
  { class_slug: 'beguiler', level: 1, title: 'Mago Acorazado', summary: 'Puede lanzar conjuros con armadura ligera.', full_description: 'Un beguiler puede lanzar conjuros de beguiler mientras lleva armadura ligera sin incurrir en la posibilidad normal de fallo de conjuro arcano. Un beguiler multiclase sigue incurriendo en la posibilidad normal de fallo de conjuro arcano para conjuros de otras clases.' },
  { class_slug: 'beguiler', level: 1, title: 'Lanzamiento Sorpresa', summary: 'Daño adicional contra objetivos desprevenidos.', full_description: 'A nivel 1, cuando un beguiler lanza un conjuro que causa daño contra un objetivo que está desprevenido o privado de su bonificador de Destreza a la CA, el conjuro inflige +1d6 puntos de daño adicional. Este daño aumenta en +1d6 cada 4 niveles después del primero (+2d6 a nivel 6, +3d6 a nivel 10, etc.).' },
  { class_slug: 'beguiler', level: 1, title: 'Encontrar Trampas', summary: 'Puede encontrar y desactivar trampas mágicas.', full_description: 'Los beguilers pueden usar la habilidad Buscar para localizar trampas con CD superior a 20, y pueden usar Inutilizar Mecanismo para desactivar trampas mágicas.' },
  { class_slug: 'beguiler', level: 2, title: 'Lanzamiento Oculto', summary: 'Bonificadores cuando los conjuros se lanzan contra enemigos desprevenidos.', full_description: 'A partir del nivel 2, un beguiler obtiene un bonificador de +1 a la CD de salvación de sus conjuros cuando los lanza contra un objetivo que está desprevenido o privado de su bonificador de Destreza. Este bonificador aumenta a +2 a nivel 8, y a nivel 14 también obtiene +2 a las tiradas de ataque con conjuros. A nivel 20, sus conjuros pueden superar la resistencia a los conjuros de objetivos desprevenidos.' },
  { class_slug: 'beguiler', level: 3, title: 'Aprendizaje Avanzado', summary: 'Añade conjuros de otras listas.', full_description: 'A nivel 3 y cada 4 niveles posteriores, un beguiler puede añadir un nuevo conjuro a su lista de conjuros conocidos. El conjuro debe ser de una escuela de Encantamiento o Ilusión y debe ser de una lista de conjuros arcanos de otra clase.' },
  { class_slug: 'beguiler', level: 5, title: 'Conjuro Silencioso', summary: 'Obtiene la dote Conjuro Silencioso.', full_description: 'A nivel 5, un beguiler obtiene la dote Conjuro Silencioso como dote adicional.' },
  { class_slug: 'beguiler', level: 10, title: 'Conjuro Inmóvil', summary: 'Obtiene la dote Conjuro Inmóvil.', full_description: 'A nivel 10, un beguiler obtiene la dote Conjuro Inmóvil como dote adicional.' },

  // === DRAGON SHAMAN ===
  { class_slug: 'dragon-shaman', level: 1, title: 'Dragón Tótem', summary: 'Escoge un tipo de dragón como tótem.', full_description: 'Al primer nivel, un chamán dragón escoge un tipo de dragón como su tótem. Esta elección es permanente y afecta muchas de sus habilidades. El tipo de dragón determina el tipo de energía de su aliento, las habilidades que obtiene y a menudo influye en su alineamiento.' },
  { class_slug: 'dragon-shaman', level: 1, title: 'Aura Dracónica', summary: 'Emite un aura beneficiosa para los aliados.', full_description: 'A nivel 1, un chamán dragón obtiene un aura dracónica que beneficia a todos los aliados (incluyéndose a sí mismo) dentro de 30 pies. El chamán puede cambiar el tipo de aura como acción de movimiento. Las auras disponibles incluyen: energía (resistencia a energía), poder (bonificador al daño), presencia (bonificador a salvaciones contra miedo), resistencia (reducción de daño), senses (bonificador a Escuchar y Avistar), vigor (sanación rápida).' },
  { class_slug: 'dragon-shaman', level: 3, title: 'Adaptación Dracónica', summary: 'Obtiene habilidades especiales basadas en el dragón tótem.', full_description: 'A nivel 3, un chamán dragón obtiene una habilidad especial basada en su dragón tótem, como visión en oscuridad, inmunidad al sueño, habilidad de nadar, o resistencia a ciertos efectos.' },
  { class_slug: 'dragon-shaman', level: 4, title: 'Arma de Aliento', summary: 'Puede exhalar energía como un dragón.', full_description: 'A nivel 4, un chamán dragón obtiene un arma de aliento que inflige daño de energía del tipo asociado con su dragón tótem. El aliento inflige 2d6 puntos de daño, aumentando en 2d6 cada 4 niveles. Es un cono de 15 pies o línea de 30 pies según el dragón tótem. La CD de Reflejos es 10 + 1/2 nivel + modificador de Constitución.' },
  { class_slug: 'dragon-shaman', level: 6, title: 'Toque de Vitalidad', summary: 'Puede sanar con un toque.', full_description: 'A nivel 6, un chamán dragón puede sanar daño por un total de puntos de golpe por día igual a su nivel de chamán dragón × 2. Puede dividir esta sanación entre múltiples usos.' },
  { class_slug: 'dragon-shaman', level: 9, title: 'Inmunidad a Energía', summary: 'Inmune al tipo de energía de su dragón tótem.', full_description: 'A nivel 9, un chamán dragón se vuelve inmune al tipo de energía asociado con su dragón tótem.' },
  { class_slug: 'dragon-shaman', level: 11, title: 'Comunión con Espíritu Dragón', summary: 'Puede comunicarse con dragones.', full_description: 'A nivel 11, una vez al día, un chamán dragón puede entrar en trance para comunicarse con el espíritu de su dragón tótem, como si usara el conjuro Comunión.' },
  { class_slug: 'dragon-shaman', level: 13, title: 'Determinación Dracónica', summary: 'Puede resistir efectos debilitantes.', full_description: 'A nivel 13, un chamán dragón puede, como acción inmediata, gastar un uso de su arma de aliento para terminar uno de los siguientes efectos sobre sí mismo: ciego, confuso, aturdido, deslumbrado, exhausto, fatigado, nauseado, asustado, paralizado, sacudido o enfermo.' },

  // === DUSKBLADE ===
  { class_slug: 'duskblade', level: 1, title: 'Mago Acorazado', summary: 'Puede lanzar conjuros con armadura.', full_description: 'Un duskblade puede lanzar conjuros de duskblade mientras lleva armadura ligera sin incurrir en posibilidad de fallo de conjuro arcano. A nivel 4, esto se extiende a armadura media, y a nivel 7 a armadura pesada.' },
  { class_slug: 'duskblade', level: 1, title: 'Sintonización Arcana', summary: 'Puede usar habilidades mágicas menores a voluntad.', full_description: 'A nivel 1, un duskblade puede usar Detectar Magia a voluntad. También obtiene la capacidad de usar Dancing Lights, Flare y Ghost Sound un número combinado de veces al día igual a 3 + modificador de Inteligencia.' },
  { class_slug: 'duskblade', level: 2, title: 'Lanzamiento de Combate', summary: 'Obtiene la dote Lanzamiento de Combate.', full_description: 'A nivel 2, un duskblade obtiene la dote Lanzamiento de Combate como dote adicional.' },
  { class_slug: 'duskblade', level: 3, title: 'Canalización Arcana', summary: 'Puede canalizar conjuros de toque a través de su arma.', full_description: 'A nivel 3, un duskblade puede usar una acción estándar para lanzar cualquier conjuro de toque que conozca y hacer un ataque cuerpo a cuerpo como parte de la misma acción. Si el ataque golpea, el conjuro se descarga. A nivel 13, puede canalizar un conjuro de toque como parte de un ataque completo, aplicándolo al primer golpe que conecte.' },
  { class_slug: 'duskblade', level: 5, title: 'Lanzamiento Rápido', summary: 'Puede lanzar un conjuro como acción rápida.', full_description: 'A nivel 5, un duskblade puede lanzar un conjuro como acción rápida una vez al día. Obtiene usos adicionales a niveles 10, 15 y 20.' },
  { class_slug: 'duskblade', level: 6, title: 'Poder de Conjuro', summary: 'Bonificador al nivel de lanzador.', full_description: 'A nivel 6, un duskblade obtiene un bonificador de +2 a su nivel de lanzador para superar resistencia a los conjuros. Este bonificador aumenta a +3 a nivel 11 y a +4 a nivel 16.' },

  // === KNIGHT ===
  { class_slug: 'knight', level: 1, title: 'Desafío del Caballero', summary: 'Puede emitir desafíos en combate.', full_description: 'Un caballero puede emitir desafíos de combate que le dan ventajas contra enemigos específicos. Puede usar esta habilidad un número de veces al día igual a 1/2 su nivel de caballero + modificador de Carisma.' },
  { class_slug: 'knight', level: 1, title: 'Desafío de Combate', summary: 'Bonificador de daño contra un enemigo desafiado.', full_description: 'Como acción rápida, un caballero puede designar a un enemigo como su desafío de combate. Obtiene +1 de daño contra ese objetivo. Este bonificador aumenta a +2 a nivel 8, +3 a nivel 14 y +4 a nivel 20.' },
  { class_slug: 'knight', level: 2, title: 'Combate Montado', summary: 'Obtiene la dote Combate Montado.', full_description: 'A nivel 2, un caballero obtiene la dote Combate Montado como dote adicional.' },
  { class_slug: 'knight', level: 2, title: 'Bloqueo con Escudo', summary: 'Proporciona bonificador de CA a un aliado adyacente.', full_description: 'A nivel 2, cuando un caballero lucha con un escudo, puede proporcionar un bonificador de escudo de +1 a la CA de un aliado adyacente como acción gratuita. Este bonificador aumenta a +2 a nivel 7, +3 a nivel 12 y +4 a nivel 17.' },
  { class_slug: 'knight', level: 3, title: 'Baluarte de la Defensa', summary: 'Los enemigos no pueden pasar a través de ti fácilmente.', full_description: 'A nivel 3, un caballero se vuelve un defensor más efectivo. Los enemigos no pueden usar la opción de paso de 5 pies para moverse a través del espacio de un caballero o de los espacios adyacentes a él.' },
  { class_slug: 'knight', level: 4, title: 'Prueba de Coraje', summary: 'Puede forzar a enemigos a atacarte.', full_description: 'A nivel 4, un caballero puede emitir una prueba de coraje como acción rápida. Todos los enemigos dentro de 100 pies que puedan oírle deben hacer una tirada de Voluntad (CD 10 + 1/2 nivel de caballero + modificador de Carisma) o verse obligados a atacar al caballero en preferencia a otros objetivos por un número de rondas igual al modificador de Carisma del caballero.' },
  { class_slug: 'knight', level: 6, title: 'Defensor Vigilante', summary: 'Bonificador a CA contra enemigos que hayan atacado a aliados.', full_description: 'A nivel 6, un caballero obtiene un bonificador de +1 a la CA contra cualquier enemigo que haya atacado a un aliado del caballero (que no sea el caballero) desde el último turno del caballero.' },
  { class_slug: 'knight', level: 10, title: 'Proteger Aliado', summary: 'Puede interceptar ataques contra aliados adyacentes.', full_description: 'A nivel 10, como acción inmediata, un caballero puede convertirse en el objetivo de un ataque o efecto que normalmente afectaría a un aliado adyacente.' },
  { class_slug: 'knight', level: 16, title: 'Vínculo de Lealtad', summary: 'Los aliados cercanos ganan bonificador a salvaciones.', full_description: 'A nivel 16, todos los aliados dentro de 10 pies del caballero obtienen un bonificador de +4 a las tiradas de salvación contra efectos de miedo.' },
  { class_slug: 'knight', level: 20, title: 'Leal Más Allá de la Muerte', summary: 'Puede continuar luchando aunque debería estar muerto.', full_description: 'A nivel 20, cuando un caballero es reducido a puntos de golpe negativos pero no muerto, puede continuar actuando (aunque esté tambaleante) hasta que sus puntos de golpe negativos excedan su puntuación de Constitución.' }
];

async function run() {
  console.log('=== PLAYER\'S HANDBOOK II - 4 CLASSES ===\n');

  // 1. Insert classes
  console.log('1. Insertando clases...');
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
    .in('slug', ['beguiler', 'dragon-shaman', 'duskblade', 'knight']);

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

  // 4. Insert features
  console.log('\n3. Insertando rasgos de clase...');
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
  const { data: verifyClass } = await supabase.from('classes').select('slug, titulo').in('slug', ['beguiler', 'dragon-shaman', 'duskblade', 'knight']);
  const { data: verifyProg } = await supabase.from('class_progression').select('level').in('class_slug', ['beguiler', 'dragon-shaman', 'duskblade', 'knight']);
  const { data: verifyFeat } = await supabase.from('class_features').select('title').in('class_slug', ['beguiler', 'dragon-shaman', 'duskblade', 'knight']);

  console.log(`Clases: ${verifyClass?.length || 0}`);
  console.log(`Niveles de progresión: ${verifyProg?.length || 0}`);
  console.log(`Rasgos de clase: ${verifyFeat?.length || 0}`);
}

run().catch(console.error);
