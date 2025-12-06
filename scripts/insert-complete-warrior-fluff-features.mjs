import { createClient } from '@supabase/supabase-js';

// Using service_role key to bypass RLS
const supabase = createClient(
  'https://akcuvlanpqpoizconuhm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrY3V2bGFucHFwb2l6Y29udWhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzExNzMwMCwiZXhwIjoyMDc4NjkzMzAwfQ.pIfA0AwG1J9VSp4jp50BaAqhgMR1V-A_QNmS5xs8AXA'
);

// Class IDs from database
const CLASS_IDS = {
  hexblade: '8fff4ea8-e7d5-4154-9584-e3f3a32b915a',
  samurai: 'a68a20ae-e3a1-4cf8-a9f2-56b5b123276d',
  swashbuckler: '496629d5-9ff3-4468-98d1-08ab6e50b057'
};

// =============================================
// CLASS_FLUFF DATA (Trasfondo y Narrativa)
// =============================================
const classFluff = [
  {
    class_id: CLASS_IDS.hexblade,
    intro_long: 'El hexblade combina la maestría marcial con poderes oscuros de maldición. Canaliza energías sobrenaturales para maldecir a sus enemigos mientras los enfrenta en combate cuerpo a cuerpo, debilitándolos antes de asestar el golpe final.',
    intro_long_en: 'The hexblade combines martial prowess with dark curse powers. They channel supernatural energies to curse their enemies while facing them in melee combat, weakening them before delivering the killing blow.',
    why_adventure_short: 'Poder y supervivencia',
    why_adventure_short_en: 'Power and survival',
    why_adventure_long: 'Los hexblades se aventuran para aumentar sus poderes sobrenaturales y probar su valía en combate. Muchos buscan entender el origen de sus oscuros dones, mientras otros simplemente anhelan el poder que la aventura puede otorgar.',
    why_adventure_long_en: 'Hexblades adventure to increase their supernatural powers and prove their worth in combat. Many seek to understand the origin of their dark gifts, while others simply crave the power that adventure can grant.',
    power_source_type: 'arcano',
    power_source_type_en: 'arcane',
    power_source_short: 'Maldiciones sobrenaturales',
    power_source_short_en: 'Supernatural curses',
    power_source_long: 'El hexblade canaliza energías arcanas oscuras de origen desconocido. Estas energías se manifiestan como maldiciones debilitantes que pueden afectar a sus enemigos, haciéndolos más vulnerables en combate.',
    power_source_long_en: 'The hexblade channels dark arcane energies of unknown origin. These energies manifest as debilitating curses that can affect their enemies, making them more vulnerable in combat.',
    group_role_short: 'Combatiente maldecidor',
    group_role_short_en: 'Curse-slinger fighter',
    group_role_long: 'En grupo, el hexblade funciona como un guerrero versátil que puede debilitar enemigos clave con sus maldiciones antes de enfrentarlos directamente. Su combinación de combate y magia lo hace efectivo contra objetivos individuales.',
    group_role_long_en: 'In a group, the hexblade functions as a versatile warrior who can weaken key enemies with curses before facing them directly. Their combination of combat and magic makes them effective against individual targets.',
    social_origin_short: 'Marginados o solitarios',
    social_origin_short_en: 'Outcasts or loners',
    social_origin_long: 'Los hexblades suelen provenir de orígenes variados: algunos descubrieron sus poderes tras un evento traumático, otros los heredaron de linajes oscuros, y algunos hicieron pactos que no comprenden completamente.',
    social_origin_long_en: 'Hexblades often come from varied backgrounds: some discovered their powers after a traumatic event, others inherited them from dark lineages, and some made pacts they do not fully understand.',
    religious_focus_short: 'Generalmente agnósticos',
    religious_focus_short_en: 'Generally agnostic',
    religious_focus_long: 'La mayoría de los hexblades no veneran deidades específicas, aunque algunos rinden homenaje a dioses del destino, la magia oscura o la muerte. Unos pocos creen que su poder proviene de entidades sobrenaturales.',
    religious_focus_long_en: 'Most hexblades do not worship specific deities, although some pay homage to gods of fate, dark magic, or death. A few believe their power comes from supernatural entities.',
    typical_deities: ['Wee Jas', 'Nerull', 'Vecna'],
    alignment_tendency: 'neutral',
    alignment_short: 'Cualquiera, tendencia neutral',
    alignment_short_en: 'Any, neutral tendency',
    alignment_long: 'Los hexblades pueden ser de cualquier alineamiento, aunque muchos tienden hacia el neutral o el mal debido a la naturaleza oscura de sus poderes. Los hexblades buenos son raros pero no imposibles.',
    alignment_long_en: 'Hexblades can be of any alignment, though many tend toward neutral or evil due to the dark nature of their powers. Good hexblades are rare but not impossible.',
    typical_races: ['Humano', 'Semielfo', 'Tiefling']
  },
  {
    class_id: CLASS_IDS.samurai,
    intro_long: 'El samurái es un guerrero noble que sigue un estricto código de honor. Entrenado desde la juventud en las artes marciales y la disciplina mental, el samurái combina habilidades de combate devastadoras con una determinación inquebrantable.',
    intro_long_en: 'The samurai is a noble warrior who follows a strict code of honor. Trained from youth in martial arts and mental discipline, the samurai combines devastating combat skills with unwavering determination.',
    why_adventure_short: 'Honor y deber',
    why_adventure_short_en: 'Honor and duty',
    why_adventure_long: 'Los samuráis se aventuran por deber hacia su señor, para restaurar el honor perdido, o para perfeccionar sus habilidades marciales. Algunos buscan venganza por agravios contra su clan o familia.',
    why_adventure_long_en: 'Samurai adventure out of duty to their lord, to restore lost honor, or to perfect their martial skills. Some seek revenge for wrongs against their clan or family.',
    power_source_type: 'marcial',
    power_source_type_en: 'martial',
    power_source_short: 'Disciplina y honor',
    power_source_short_en: 'Discipline and honor',
    power_source_long: 'El poder del samurái proviene de años de entrenamiento riguroso y una disciplina mental férrea. Su código de honor le otorga una fuerza de voluntad que puede manifestarse como habilidades especiales en momentos críticos.',
    power_source_long_en: 'The samurai\'s power comes from years of rigorous training and iron mental discipline. Their code of honor grants them a strength of will that can manifest as special abilities at critical moments.',
    group_role_short: 'Guerrero de élite',
    group_role_short_en: 'Elite warrior',
    group_role_long: 'El samurái es un combatiente de primera línea especializado en destruir enemigos poderosos. Su capacidad de infligir daño masivo con un solo golpe lo convierte en un cazador de jefes ideal.',
    group_role_long_en: 'The samurai is a frontline combatant specialized in destroying powerful enemies. Their ability to inflict massive damage with a single strike makes them an ideal boss-killer.',
    social_origin_short: 'Nobleza guerrera',
    social_origin_short_en: 'Warrior nobility',
    social_origin_long: 'La mayoría de los samuráis provienen de familias nobles o castas guerreras. Son educados desde niños en combate, etiqueta, caligrafía y otras artes consideradas dignas de su estatus.',
    social_origin_long_en: 'Most samurai come from noble families or warrior castes. They are educated from childhood in combat, etiquette, calligraphy, and other arts considered worthy of their status.',
    religious_focus_short: 'Tradiciones ancestrales',
    religious_focus_short_en: 'Ancestral traditions',
    religious_focus_long: 'Los samuráis suelen seguir tradiciones religiosas familiares, venerando a ancestros y dioses de la guerra o el honor. Algunos siguen filosofías de meditación y disciplina mental.',
    religious_focus_long_en: 'Samurai typically follow family religious traditions, venerating ancestors and gods of war or honor. Some follow philosophies of meditation and mental discipline.',
    typical_deities: ['Hextor', 'Heironeous', 'St. Cuthbert'],
    alignment_tendency: 'legal',
    alignment_short: 'Legal, cualquier ética',
    alignment_short_en: 'Lawful, any ethics',
    alignment_long: 'Los samuráis son casi siempre legales debido a su estricto código de honor. Pueden ser buenos, neutrales o malvados dependiendo de a quién sirven y cómo interpretan su código.',
    alignment_long_en: 'Samurai are almost always lawful due to their strict code of honor. They can be good, neutral, or evil depending on whom they serve and how they interpret their code.',
    typical_races: ['Humano', 'Enano', 'Hobgoblin']
  },
  {
    class_id: CLASS_IDS.swashbuckler,
    intro_long: 'El swashbuckler es un espadachín ágil y carismático que confía en su velocidad, inteligencia y estilo antes que en la fuerza bruta. Con una espada en mano y una sonrisa en los labios, el swashbuckler baila a través del campo de batalla con gracia mortal.',
    intro_long_en: 'The swashbuckler is an agile and charismatic swordsman who relies on speed, intelligence, and style rather than brute force. With a sword in hand and a smile on their lips, the swashbuckler dances through the battlefield with deadly grace.',
    why_adventure_short: 'Gloria y emoción',
    why_adventure_short_en: 'Glory and excitement',
    why_adventure_long: 'Los swashbucklers buscan la emoción de la aventura, la oportunidad de demostrar su habilidad y ganar fama. Muchos tienen un fuerte sentido de la justicia y protegen a los débiles con su espada.',
    why_adventure_long_en: 'Swashbucklers seek the thrill of adventure, the opportunity to demonstrate their skill and gain fame. Many have a strong sense of justice and protect the weak with their sword.',
    power_source_type: 'marcial',
    power_source_type_en: 'martial',
    power_source_short: 'Agilidad y astucia',
    power_source_short_en: 'Agility and cunning',
    power_source_long: 'El swashbuckler basa su estilo de combate en la velocidad y la precisión. Utiliza su inteligencia para encontrar debilidades en la defensa enemiga y su agilidad para esquivar ataques mientras contraataca.',
    power_source_long_en: 'The swashbuckler bases their combat style on speed and precision. They use their intelligence to find weaknesses in enemy defenses and their agility to dodge attacks while counterattacking.',
    group_role_short: 'Duelista ágil',
    group_role_short_en: 'Agile duelist',
    group_role_long: 'En grupo, el swashbuckler funciona como un guerrero móvil que puede flanquear enemigos, explotar oportunidades y mantener ocupados a múltiples oponentes con su estilo acrobático de combate.',
    group_role_long_en: 'In a group, the swashbuckler functions as a mobile warrior who can flank enemies, exploit opportunities, and keep multiple opponents busy with their acrobatic combat style.',
    social_origin_short: 'Variado, a menudo urbano',
    social_origin_short_en: 'Varied, often urban',
    social_origin_long: 'Los swashbucklers pueden provenir de cualquier trasfondo: nobles aburridos, soldados independientes, actores de esgrima, o incluso pícaros reformados. Muchos aprendieron su arte en escuelas de esgrima o academias.',
    social_origin_long_en: 'Swashbucklers can come from any background: bored nobles, independent soldiers, fencing actors, or even reformed rogues. Many learned their art at fencing schools or academies.',
    religious_focus_short: 'Libertad personal',
    religious_focus_short_en: 'Personal freedom',
    religious_focus_long: 'Los swashbucklers raramente son devotos religiosos. Aquellos que veneran deidades prefieren dioses del viaje, la libertad, la suerte o la guerra que favorecen la iniciativa individual.',
    religious_focus_long_en: 'Swashbucklers are rarely religious devotees. Those who venerate deities prefer gods of travel, freedom, luck, or war that favor individual initiative.',
    typical_deities: ['Fharlanghn', 'Olidammara', 'Kord'],
    alignment_tendency: 'caotico',
    alignment_short: 'Caótico o neutral',
    alignment_short_en: 'Chaotic or neutral',
    alignment_long: 'Los swashbucklers valoran la libertad personal y raramente se someten a códigos estrictos. La mayoría son caóticos buenos o caóticos neutrales, aunque existen swashbucklers de todos los alineamientos.',
    alignment_long_en: 'Swashbucklers value personal freedom and rarely submit to strict codes. Most are chaotic good or chaotic neutral, though swashbucklers of all alignments exist.',
    typical_races: ['Humano', 'Elfo', 'Mediano']
  }
];

// =============================================
// CLASS_FEATURES DATA (Rasgos de Clase)
// =============================================
const classFeatures = [
  // === HEXBLADE ===
  { class_slug: 'hexblade', level: 1, title: 'Maldición del Hexblade', summary: 'Maldice a un enemigo una vez al día, imponiendo penalizadores.', full_description: 'Una vez al día, como acción libre, un hexblade puede desatar una maldición sobre un enemigo a 60 pies que pueda ver. El objetivo sufre un penalizador de -2 a las tiradas de ataque, salvaciones, pruebas de habilidad, pruebas de característica y daño de armas durante 1 hora. Un objetivo que tenga éxito en una tirada de Voluntad (CD 10 + nivel de hexblade + modificador de Carisma) niega el efecto. Cualquier efecto que elimine o disipe una maldición elimina este efecto.' },
  { class_slug: 'hexblade', level: 1, title: 'Competencia con Armaduras', summary: 'Competente con armaduras ligeras.', full_description: 'Un hexblade es competente con armaduras ligeras pero no con escudos. Puede lanzar conjuros de hexblade mientras lleva armadura ligera sin incurrir en la posibilidad normal de fallo de conjuro arcano.' },
  { class_slug: 'hexblade', level: 2, title: 'Resistencia Arcana', summary: 'Bonificador a salvaciones contra conjuros y habilidades sortílegas.', full_description: 'A nivel 2, un hexblade obtiene un bonificador igual a su modificador de Carisma (mínimo +1) a todas las tiradas de salvación contra conjuros y habilidades sortílegas.' },
  { class_slug: 'hexblade', level: 3, title: 'Amenaza', summary: 'Puede desmoralizar enemigos en combate.', full_description: 'A nivel 3, un hexblade puede usar Intimidar para desmoralizar a un oponente como acción de movimiento en lugar de acción estándar.' },
  { class_slug: 'hexblade', level: 4, title: 'Conjuros', summary: 'Comienza a lanzar conjuros arcanos.', full_description: 'A partir del nivel 4, un hexblade obtiene la capacidad de lanzar un pequeño número de conjuros arcanos. Para lanzar un conjuro, debe tener una puntuación de Carisma de al menos 10 + el nivel del conjuro. Los conjuros de hexblade se basan en Carisma.' },
  { class_slug: 'hexblade', level: 5, title: 'Maldición del Hexblade (2/día)', summary: 'Puede usar su maldición dos veces al día.', full_description: 'A nivel 5, un hexblade puede usar su maldición del hexblade dos veces al día.' },
  { class_slug: 'hexblade', level: 6, title: 'Familiar del Hexblade', summary: 'Obtiene un familiar como un hechicero.', full_description: 'A nivel 6, un hexblade puede obtener un familiar. Este funciona como un familiar de hechicero, usando el nivel de hexblade -3 como nivel efectivo de hechicero.' },
  { class_slug: 'hexblade', level: 7, title: 'Maldición Mayor', summary: 'La maldición impone penalizador de -4.', full_description: 'A nivel 7, el penalizador impuesto por la maldición del hexblade aumenta a -4.' },
  { class_slug: 'hexblade', level: 9, title: 'Maldición del Hexblade (3/día)', summary: 'Puede usar su maldición tres veces al día.', full_description: 'A nivel 9, un hexblade puede usar su maldición del hexblade tres veces al día.' },
  { class_slug: 'hexblade', level: 12, title: 'Aura de Mala Suerte', summary: 'Enemigos cercanos sufren penalizadores a salvaciones.', full_description: 'A nivel 12, un hexblade irradia un aura de mala suerte. Todos los enemigos dentro de 60 pies del hexblade sufren un penalizador de -2 a todas las tiradas de salvación. Este es un efecto sobrenatural que funciona constantemente.' },
  { class_slug: 'hexblade', level: 13, title: 'Maldición del Hexblade (4/día)', summary: 'Puede usar su maldición cuatro veces al día.', full_description: 'A nivel 13, un hexblade puede usar su maldición del hexblade cuatro veces al día.' },
  { class_slug: 'hexblade', level: 17, title: 'Maldición del Hexblade (5/día)', summary: 'Puede usar su maldición cinco veces al día.', full_description: 'A nivel 17, un hexblade puede usar su maldición del hexblade cinco veces al día.' },
  { class_slug: 'hexblade', level: 19, title: 'Maldición Sombría', summary: 'La maldición impone penalizador de -6.', full_description: 'A nivel 19, el penalizador impuesto por la maldición del hexblade aumenta a -6. Además, puede seleccionar cualquier habilidad o estadística del objetivo para recibir un penalizador adicional de -2.' },

  // === SAMURAI ===
  { class_slug: 'samurai', level: 1, title: 'Dos Espadas', summary: 'Puede usar dos armas con facilidad.', full_description: 'Un samurái puede luchar con dos armas como si tuviera las dotes Combatir con Dos Armas, Defensa con Dos Armas y Combatir con Dos Armas Mejorado, incluso si no cumple los prerrequisitos.' },
  { class_slug: 'samurai', level: 1, title: 'Competencia con Katana', summary: 'Puede usar la katana como arma marcial.', full_description: 'Un samurái trata la katana (bastarda) como un arma marcial en lugar de exótica cuando la usa con una mano.' },
  { class_slug: 'samurai', level: 2, title: 'Kiai Smite', summary: 'Grito de guerra que potencia un ataque.', full_description: 'Una vez al día, un samurái de nivel 2 o superior puede dar un grito de batalla que aumenta su fuerza de ataque. El samurái añade su modificador de Carisma (mínimo +1) a su tirada de ataque y añade su nivel de samurái al daño. Debe declarar el kiai smite antes de hacer la tirada de ataque. A nivel 6, puede usarlo 2/día; a nivel 10, 3/día; a nivel 14, 4/día; a nivel 18, 5/día.' },
  { class_slug: 'samurai', level: 3, title: 'Estocada', summary: 'Puede cargar y atacar con letalidad.', full_description: 'A nivel 3, un samurái puede hacer una estocada mortal. Cuando carga, puede hacer un único ataque cuerpo a cuerpo con un bonificador de +2 al daño por cada 5 pies de movimiento en la carga (máximo +10).' },
  { class_slug: 'samurai', level: 4, title: 'Kiai Smite (2/día)', summary: 'Puede usar kiai smite dos veces al día.', full_description: 'A nivel 4, el samurái puede usar kiai smite dos veces al día.' },
  { class_slug: 'samurai', level: 5, title: 'Danza de Espadas', summary: 'Ataques adicionales con penalizador reducido.', full_description: 'A nivel 5, cuando usa el ataque completo, un samurái puede hacer un ataque adicional con su arma secundaria con solo un penalizador de -2 en lugar de -5.' },
  { class_slug: 'samurai', level: 8, title: 'Kiai Smite (3/día)', summary: 'Puede usar kiai smite tres veces al día.', full_description: 'A nivel 8, el samurái puede usar kiai smite tres veces al día.' },
  { class_slug: 'samurai', level: 10, title: 'Golpe Intimidante', summary: 'Ataque exitoso puede desmoralizar.', full_description: 'A nivel 10, cuando un samurái golpea a un enemigo con un ataque cuerpo a cuerpo, puede intentar desmoralizarlo como acción libre. Esto usa la habilidad Intimidar contra la CD normal del objetivo.' },
  { class_slug: 'samurai', level: 12, title: 'Kiai Smite (4/día)', summary: 'Puede usar kiai smite cuatro veces al día.', full_description: 'A nivel 12, el samurái puede usar kiai smite cuatro veces al día.' },
  { class_slug: 'samurai', level: 15, title: 'Espíritu Inquebrantable', summary: 'Inmune a efectos de miedo.', full_description: 'A nivel 15, un samurái se vuelve inmune a todos los efectos de miedo, incluyendo miedo mágico.' },
  { class_slug: 'samurai', level: 16, title: 'Kiai Smite (5/día)', summary: 'Puede usar kiai smite cinco veces al día.', full_description: 'A nivel 16, el samurái puede usar kiai smite cinco veces al día.' },
  { class_slug: 'samurai', level: 20, title: 'Kiai Supremo', summary: 'Kiai smite inflige daño máximo.', full_description: 'A nivel 20, cuando un samurái usa kiai smite, todo el daño (incluyendo el daño base del arma y el bonus de kiai smite) se considera daño máximo. No necesita tirar dados de daño.' },

  // === SWASHBUCKLER ===
  { class_slug: 'swashbuckler', level: 1, title: 'Arma Elegante', summary: 'Usa Destreza en lugar de Fuerza para ataques.', full_description: 'Un swashbuckler puede usar su modificador de Destreza en lugar de Fuerza para las tiradas de ataque con armas ligeras y estoque. Debe ser competente con el arma para usar esta habilidad.' },
  { class_slug: 'swashbuckler', level: 2, title: 'Gracia', summary: 'Bonificador de competencia a Reflejos.', full_description: 'A nivel 2, un swashbuckler obtiene un bonificador de +1 a las tiradas de salvación de Reflejos. Este bonificador aumenta a +2 a nivel 11 y a +3 a nivel 20.' },
  { class_slug: 'swashbuckler', level: 3, title: 'Sentido del Peligro', summary: 'Puede reaccionar ante emboscadas más fácilmente.', full_description: 'A nivel 3, un swashbuckler obtiene un bonificador de +1 a las tiradas de iniciativa y a las pruebas de percepción para evitar ser sorprendido. Este bonificador aumenta a +2 a nivel 8 y a +3 a nivel 13, +4 a nivel 18.' },
  { class_slug: 'swashbuckler', level: 5, title: 'Agilidad Sobrenatural', summary: 'Añade Inteligencia a la CA.', full_description: 'A nivel 5, un swashbuckler puede añadir su modificador de Inteligencia (mínimo +1) como bonificador de esquiva a la CA mientras lleve armadura ligera o ninguna armadura y no esté cargando más que una carga ligera.' },
  { class_slug: 'swashbuckler', level: 7, title: 'Acrobático', summary: 'Bonificador a Acrobacias y habilidades relacionadas.', full_description: 'A nivel 7, un swashbuckler obtiene un bonificador de competencia de +2 a las pruebas de Equilibrio, Saltar y Piruetas. Este bonificador aumenta a +4 a nivel 13 y a +6 a nivel 19.' },
  { class_slug: 'swashbuckler', level: 10, title: 'Esquiva Mejorada', summary: 'Puede evitar completamente ciertos ataques de área.', full_description: 'A nivel 10, un swashbuckler obtiene Esquiva Mejorada. No recibe daño en una tirada de salvación de Reflejos exitosa contra ataques de área, y solo la mitad del daño en una tirada fallida.' },
  { class_slug: 'swashbuckler', level: 13, title: 'Suerte', summary: 'Puede volver a tirar una salvación una vez al día.', full_description: 'Una vez al día, un swashbuckler de nivel 13 o superior puede volver a tirar una tirada de salvación fallida. Debe aceptar el segundo resultado, incluso si es peor.' },
  { class_slug: 'swashbuckler', level: 15, title: 'Ataque Debilitante', summary: 'Puede reducir atributos del enemigo al golpear.', full_description: 'A nivel 15, cuando un swashbuckler golpea a un objetivo con un arma ligera o estoque, puede elegir infligir 1 punto de daño de Destreza o Fuerza además del daño normal. El swashbuckler debe declarar el uso de esta habilidad antes de tirar el daño.' },
  { class_slug: 'swashbuckler', level: 17, title: 'Defensa Oportuna', summary: 'Puede contraatacar cuando un enemigo falla.', full_description: 'A nivel 17, una vez por ronda, cuando un oponente falla un ataque cuerpo a cuerpo contra el swashbuckler por 5 o más, el swashbuckler puede hacer un ataque de oportunidad inmediato contra ese oponente.' },
  { class_slug: 'swashbuckler', level: 19, title: 'Golpe de Suerte', summary: 'Golpes críticos confirmados automáticamente.', full_description: 'A nivel 19, cuando un swashbuckler amenaza un golpe crítico con un arma ligera o estoque, el crítico se confirma automáticamente. Esta habilidad no funciona si el swashbuckler está bajo efectos que ya confirman automáticamente los críticos.' }
];

async function run() {
  console.log('=== Insertando class_fluff (Trasfondo y Narrativa) ===\n');

  // Insert class_fluff
  for (const fluff of classFluff) {
    const { error } = await supabase.from('class_fluff').upsert(fluff, { onConflict: 'class_id' });
    if (error) {
      console.error(`❌ Error en fluff para class_id ${fluff.class_id}:`, error.message);
    } else {
      console.log(`✅ Fluff insertado para class_id: ${fluff.class_id}`);
    }
  }

  console.log('\n=== Insertando class_features (Rasgos de Clase) ===\n');

  // Insert class_features
  let featuresCount = 0;
  for (const feature of classFeatures) {
    const { error } = await supabase.from('class_features').insert(feature);
    if (error) {
      if (error.code === '23505') { // Duplicate key
        console.log(`⚠️ Feature ya existe: ${feature.class_slug} lvl ${feature.level} - ${feature.title}`);
      } else {
        console.error(`❌ Error en feature ${feature.title}:`, error.message);
      }
    } else {
      featuresCount++;
      console.log(`✅ Feature insertada: ${feature.class_slug} lvl ${feature.level} - ${feature.title}`);
    }
  }

  console.log(`\n=== RESUMEN ===`);
  console.log(`Fluff insertados: ${classFluff.length}`);
  console.log(`Features insertadas: ${featuresCount} de ${classFeatures.length}`);

  // Verificación
  console.log('\n=== VERIFICACIÓN ===');

  const { data: fluffCheck } = await supabase
    .from('class_fluff')
    .select('class_id, intro_long')
    .in('class_id', Object.values(CLASS_IDS));
  console.log(`\nFluff en BD para Complete Warrior: ${fluffCheck?.length || 0}`);

  const { data: featuresCheck } = await supabase
    .from('class_features')
    .select('class_slug, level, title')
    .in('class_slug', ['hexblade', 'samurai', 'swashbuckler']);
  console.log(`Features en BD para Complete Warrior: ${featuresCheck?.length || 0}`);
}

run().catch(console.error);
