import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY is missing in .env');
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://akcuvlanpqpoizconuhm.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// NOTA: typical_races y typical_deities son ARRAYs de texto, NO strings
const classFluffData = [
  {
    class_id: '1a6dd308-84bb-4663-86b5-0ccdab0bad76', // ninja
    intro_long: 'El ninja es un maestro de las artes del sigilo, el espionaje y el asesinato silencioso. Entrenados en clanes secretos desde la infancia, los ninjas combinan habilidades marciales excepcionales con técnicas sobrenaturales que les permiten desvanecerse en las sombras, caminar sin hacer ruido y atacar desde ángulos imposibles. A diferencia de los pícaros comunes, los ninjas siguen estrictos códigos de conducta y lealtad hacia sus clanes.',
    why_adventure_long: 'Los ninjas se aventuran por diversas razones: algunos cumplen misiones asignadas por sus clanes, otros buscan perfeccionar sus habilidades enfrentando desafíos cada vez mayores. Algunos ninjas son renegados que han abandonado sus clanes y buscan forjar su propio destino, mientras que otros trabajan como mercenarios de élite para quienes puedan pagar sus servicios.',
    power_source_type: 'ki',
    power_source_long: 'El ninja canaliza su ki interior para realizar hazañas sobrenaturales. Esta energía vital, cultivada a través de riguroso entrenamiento, le permite desvanecerse momentáneamente, moverse sin ser detectado y golpear con precisión letal.',
    group_role_long: 'El ninja sobresale como explorador, infiltrador y eliminador de objetivos específicos. En combate, ataca desde las sombras infligiendo daño devastador con su ataque repentino antes de desaparecer de nuevo. Su movilidad y habilidades de sigilo lo hacen invaluable para misiones de reconocimiento y operaciones encubiertas.',
    alignment_short: 'Cualquier neutral',
    typical_races: ['Humanos', 'Medianos', 'Elfos'],
    typical_deities: [],
    social_origin_long: 'Los ninjas provienen casi exclusivamente de clanes secretos que operan en las sombras de la sociedad. Algunos fueron huérfanos adoptados por el clan, otros nacieron en familias de ninjas que han servido al clan durante generaciones.',
    religious_focus_long: 'Los ninjas raramente son devotos religiosos, prefiriendo confiar en sus propias habilidades. Aquellos que veneran deidades suelen elegir dioses del engaño, la oscuridad o la muerte.'
  },
  {
    class_id: '2d6f7bd1-135d-4f23-bcef-4b3918d9764d', // scout
    intro_long: 'El explorador de batalla es un guerrero que depende de la velocidad, la movilidad y el conocimiento del terreno más que de la armadura pesada o la fuerza bruta. Entrenados para operar en terrenos salvajes y hostiles, los scouts son maestros del combate en movimiento, capaces de infligir heridas devastadoras mientras se desplazan por el campo de batalla.',
    why_adventure_long: 'Los scouts se aventuran por amor a la exploración y el desafío. Muchos son contratados como guías de expediciones a tierras salvajes, mientras que otros sirven como exploradores militares. La vida sedentaria les resulta insoportable; necesitan el aire libre y la emoción del descubrimiento.',
    power_source_type: 'marcial',
    power_source_long: 'El scout depende enteramente de su entrenamiento físico y conocimiento del terreno. No utiliza magia ni poderes sobrenaturales, sino habilidades perfeccionadas a través de años de práctica en territorios salvajes.',
    group_role_long: 'El scout funciona como explorador y combatiente móvil del grupo. Su conocimiento del terreno y habilidades de supervivencia guían al grupo a través de territorios peligrosos, mientras que en combate se mueve constantemente, atacando y retirándose para maximizar su daño de skirmish.',
    alignment_short: 'Cualquier alineamiento',
    typical_races: ['Elfos', 'Medianos', 'Humanos'],
    typical_deities: ['Ehlonna', 'Obad-Hai', 'Fharlanghn'],
    social_origin_long: 'Los scouts suelen provenir de comunidades fronterizas, tribus nómadas o familias de guardabosques. Algunos fueron entrenados por ejércitos como exploradores especializados.',
    religious_focus_long: 'Muchos scouts veneran deidades de la naturaleza, los viajes o la libertad. Ehlonna, Obad-Hai y Fharlanghn son opciones populares.'
  },
  {
    class_id: 'f1db4df2-e969-44ef-8226-83ca7e390a5f', // spellthief
    intro_long: 'El ladrón de conjuros es un especialista único que combina las habilidades de un pícaro con la capacidad sobrenatural de robar energía mágica. Mediante el contacto físico, puede absorber conjuros preparados de sus enemigos y usarlos para sus propios fines. Esta habilidad los hace especialmente valiosos contra enemigos lanzadores de conjuros.',
    why_adventure_long: 'Los ladrones de conjuros se aventuran motivados por la curiosidad sobre la magia y el deseo de obtener poder sin el tedioso estudio que requieren los magos. Algunos buscan venganza contra lanzadores que los han perjudicado, mientras que otros simplemente disfrutan de la ironía de usar la magia de sus enemigos en su contra.',
    power_source_type: 'arcano',
    power_source_long: 'El ladrón de conjuros canaliza magia arcana robada de otros lanzadores. Su poder es parasitario por naturaleza, absorbiendo la energía mágica almacenada en otros y usándola temporalmente para sus propios fines.',
    group_role_long: 'El ladrón de conjuros es un neutralizador de amenazas mágicas. Su capacidad para robar conjuros lo hace invaluable contra enemigos lanzadores, mientras que sus habilidades de pícaro le permiten contribuir en situaciones que no involucran magia. Es más versátil que un pícaro pero menos especializado.',
    alignment_short: 'Cualquier no legal',
    typical_races: ['Humanos', 'Medianos', 'Gnomos'],
    typical_deities: ['Boccob', 'Olidammara'],
    social_origin_long: 'Los ladrones de conjuros descubren sus habilidades de formas diversas: algunos las desarrollan instintivamente, otros aprenden de mentores secretos. Pocos estudian en academias formales.',
    religious_focus_long: 'Los ladrones de conjuros raramente son religiosos, aunque algunos veneran deidades del engaño o la magia como Boccob u Olidammara.'
  },
  {
    class_id: '2b859b6b-354c-402d-9e92-05190f6a192d', // warlock
    intro_long: 'El brujo obtiene su poder de un pacto con una entidad sobrenatural: un demonio, un fey ancestral, un ser de los planos exteriores o una fuerza cósmica más allá de la comprensión mortal. A diferencia de los hechiceros cuyo poder es innato, o los magos que estudian, los brujos han negociado o heredado su magia. Su arma principal es el rayo místico, un haz de energía destructiva que pueden invocar a voluntad, sin límite.',
    why_adventure_long: 'Los brujos se aventuran por necesidad tanto como por elección. Muchos buscan entender la naturaleza de su poder o cumplir los términos de su pacto. Otros huyen de quienes los persiguen por su naturaleza sospechosa, mientras que algunos buscan más poder para igualar o superar a la entidad que les otorgó sus habilidades.',
    power_source_type: 'arcano',
    power_source_long: 'El poder del brujo fluye de un pacto sobrenatural con una entidad de gran poder. Esta conexión le otorga acceso a invocaciones y al temible rayo místico, habilidades que puede usar indefinidamente sin agotar su fuente de poder.',
    group_role_long: 'El brujo es un lanzador de daño consistente y confiable. Su rayo místico nunca se agota, permitiéndole contribuir en cada encuentro sin preocuparse por gestionar recursos. Sus invocaciones añaden versatilidad, desde vuelo hasta detección de magia.',
    alignment_short: 'Cualquier alineamiento',
    typical_races: ['Humanos', 'Tieflings'],
    typical_deities: [],
    social_origin_long: 'Los brujos pueden provenir de cualquier origen. Algunos nacen con su poder debido a pactos ancestrales, otros lo obtienen deliberadamente buscando entidades dispuestas a negociar, y algunos lo reciben sin buscarlo.',
    religious_focus_long: 'Los brujos tienen una relación complicada con la religión. Algunos veneran a la entidad de su pacto, otros buscan dioses que los protejan de ella, y muchos evitan la religión por completo.'
  },
  {
    class_id: 'ba4e68a7-71dc-455d-b4f8-054f47300307', // wu-jen
    intro_long: 'El wu jen es un mago oriental que ha dedicado su vida al estudio de la magia elemental. A través de años de meditación y práctica, dominan los cinco elementos clásicos: fuego, agua, tierra, madera y metal. Sin embargo, este poder tiene un precio: los wu jen deben seguir tabúes personales estrictos o arriesgarse a perder su conexión con la magia.',
    why_adventure_long: 'Los wu jen se aventuran para expandir su conocimiento de la magia elemental, buscar textos arcanos perdidos o encontrar lugares de poder donde puedan meditar. Algunos han sido exiliados de sus comunidades por violar tabúes, mientras que otros buscan componentes raros para sus conjuros más poderosos.',
    power_source_type: 'arcano',
    power_source_long: 'El wu jen canaliza la magia de los cinco elementos a través de estudio y meditación. Sus conjuros invocan las fuerzas primordiales del fuego, agua, tierra, madera y metal, manipulando la naturaleza misma a su voluntad.',
    group_role_long: 'El wu jen funciona como el principal lanzador arcano del grupo, similar a un mago pero con un enfoque en conjuros elementales. Su especialización en los elementos les permite controlar el campo de batalla con fuego, hielo, relámpagos y otros efectos devastadores.',
    alignment_short: 'Cualquier alineamiento',
    typical_races: ['Humanos'],
    typical_deities: [],
    social_origin_long: 'Los wu jen estudian con maestros solitarios en monasterios remotos o templos aislados en las montañas. El entrenamiento es largo y riguroso, y pocos completan el camino.',
    religious_focus_long: 'Los wu jen veneran a los espíritus elementales y fuerzas de la naturaleza más que a dioses específicos. Algunos honran a antepasados que también fueron wu jen.'
  },
  {
    class_id: 'feb5f520-9136-450e-8c32-8c3b6989a724', // psychic-warrior
    intro_long: 'El guerrero psíquico combina el entrenamiento marcial con poderes psiónicos, creando un combatiente que potencia sus habilidades físicas con la fuerza de su mente. A diferencia de los guerreros comunes que dependen solo del acero, o los psiónicos que evitan el combate directo, el guerrero psíquico abraza ambos aspectos, manifestando poderes que mejoran su velocidad, fuerza y resistencia.',
    why_adventure_long: 'Los guerreros psíquicos se aventuran para probar sus habilidades en combate real. Muchos buscan entender mejor la conexión entre mente y cuerpo, mientras que otros simplemente disfrutan de la sensación de poder que les otorga su combinación única de talentos.',
    power_source_type: 'psionico',
    power_source_long: 'El guerrero psíquico canaliza energía psiónica para potenciar sus capacidades marciales. Sus poderes surgen de la disciplina mental y la conexión entre mente y cuerpo, manifestándose como mejoras físicas sobrenaturales.',
    group_role_long: 'El guerrero psíquico es un combatiente de primera línea potenciado. Sus poderes psiónicos le permiten realizar hazañas imposibles para guerreros normales: saltos sobrehumanos, ataques devastadores, resistencia sobrenatural. Es más versátil que un guerrero pero menos especializado en combate puro.',
    alignment_short: 'Cualquier alineamiento',
    typical_races: ['Humanos', 'Elfos', 'Gith'],
    typical_deities: [],
    social_origin_long: 'Los guerreros psíquicos descubren sus habilidades de diversas formas: algunos fueron entrenados en academias psiónicas, otros desarrollaron sus poderes instintivamente durante situaciones de estrés extremo.',
    religious_focus_long: 'Los guerreros psíquicos pueden ser de cualquier fe o ninguna. Algunos veneran deidades de la guerra o la mente, pero muchos confían más en su propia fuerza interior que en poderes divinos.'
  },
  {
    class_id: '62d87bea-34d3-4ed7-a99d-024dc8ead94e', // psion
    intro_long: 'El psiónico es el maestro definitivo del poder mental. A través de disciplina, meditación y fuerza de voluntad, ha aprendido a manifestar una amplia variedad de poderes que desafían las leyes naturales. Elige una disciplina de especialización: clarividencia para la percepción extrasensorial, metacreatividad para crear materia de la nada, psicoportación para el movimiento instantáneo, psicoquinesis para manipular energía y materia, telepatía para leer y controlar mentes, o psicometabolismo para transformar su propio cuerpo.',
    why_adventure_long: 'Los psiónicos se aventuran para expandir los límites de su mente y descubrir nuevos poderes. Algunos buscan otros psiónicos para aprender de ellos, mientras que otros investigan fenómenos psíquicos en lugares remotos. La búsqueda del conocimiento y el autoperfeccionamiento son motivaciones comunes.',
    power_source_type: 'psionico',
    power_source_long: 'El psiónico canaliza el poder puro de la mente. A través de disciplina y meditación, ha aprendido a manifestar su voluntad en la realidad, creando efectos que desafían las leyes físicas sin necesidad de componentes mágicos.',
    group_role_long: 'El psiónico es el equivalente psiónico de un mago: un lanzador versátil y poderoso. Su disciplina elegida define su especialidad, pero tiene acceso a una amplia gama de poderes. Puede servir como controlador, atacante o soporte según su construcción.',
    alignment_short: 'Cualquier alineamiento',
    typical_races: ['Humanos', 'Elfos', 'Elan', 'Gith'],
    typical_deities: [],
    social_origin_long: 'Los psiónicos pueden descubrir sus habilidades espontáneamente o ser entrenados en academias especializadas. Muchos provienen de linajes con talento psíquico heredado.',
    religious_focus_long: 'Los psiónicos suelen ser agnósticos o ateos, confiando en su propia mente más que en dioses. Aquellos que son religiosos a menudo veneran deidades del conocimiento o la mente.'
  },
  {
    class_id: '07fc643a-0ac2-4980-874b-19483597cc64', // soulknife
    intro_long: 'La cuchilla del alma posee una habilidad psiónica única: puede manifestar una cuchilla de energía mental pura directamente desde su mente. Esta arma es una extensión de su voluntad, imposible de desarmar o destruir permanentemente. A medida que el soulknife gana experiencia, su cuchilla mental se vuelve más poderosa, capaz de ignorar armaduras, golpear a distancia o dividirse en dos armas.',
    why_adventure_long: 'Las cuchillas del alma se aventuran para poner a prueba sus habilidades y descubrir los límites de su poder mental. Muchos son atraídos por la vida de aventurero porque nunca necesitan preocuparse por perder su arma o quedarse desarmados.',
    power_source_type: 'psionico',
    power_source_long: 'La cuchilla del alma canaliza energía psiónica en forma de un arma de pura fuerza mental. Esta manifestación es una extensión de su voluntad, indestructible mientras el soulknife mantenga su concentración.',
    group_role_long: 'El soulknife es un combatiente cuerpo a cuerpo versátil. Su cuchilla mental le permite adaptarse a diferentes situaciones, y su capacidad de manifestarla a voluntad significa que siempre está armado. Es menos poderoso en psiónica pura que un guerrero psíquico, pero más enfocado en combate.',
    alignment_short: 'Cualquier alineamiento',
    typical_races: ['Humanos', 'Elfos', 'Xeph'],
    typical_deities: [],
    social_origin_long: 'Las cuchillas del alma descubren su poder de formas variadas. Algunos lo manifiestan en momentos de peligro extremo, otros lo desarrollan gradualmente durante la adolescencia. Pocos son entrenados formalmente.',
    religious_focus_long: 'Las cuchillas del alma pueden ser de cualquier fe. Algunos ven su poder como un don divino, otros como una habilidad puramente mental. Deidades de la guerra son opciones comunes para aquellos que son religiosos.'
  },
  {
    class_id: '0e6cf794-cb89-4b65-b2c1-37b2ff590d2a', // shugenja
    intro_long: 'El shugenja es un lanzador divino oriental que canaliza el poder de los elementos a través de su devoción a los espíritus de la naturaleza. A diferencia del clérigo que sirve a una deidad específica, el shugenja venera a los kami, los espíritus que habitan en todas las cosas: ríos, montañas, árboles y vientos. Cada shugenja tiene afinidad con un elemento particular (fuego, agua, aire o tierra) y antipatía hacia el elemento opuesto.',
    why_adventure_long: 'Los shugenja se aventuran para mantener el equilibrio entre el mundo mortal y el espiritual. Algunos buscan lugares donde los espíritus están perturbados para calmarlos, mientras que otros investigan fenómenos sobrenaturales. La protección de la naturaleza y sus espíritus es una motivación común.',
    power_source_type: 'divino',
    power_source_long: 'El shugenja canaliza el poder de los kami, los espíritus elementales de la naturaleza. A través de oraciones y rituales, invoca las fuerzas de fuego, agua, aire y tierra para manifestar efectos tanto destructivos como sanadores.',
    group_role_long: 'El shugenja es un lanzador divino con enfoque elemental. Puede sanar como un clérigo pero también tiene acceso a poderosos conjuros ofensivos basados en su elemento favorecido. Es más versátil que un druida en algunos aspectos pero más limitado en otros.',
    alignment_short: 'Cualquier alineamiento',
    typical_races: ['Humanos', 'Spirit Folk'],
    typical_deities: [],
    social_origin_long: 'Los shugenja son entrenados en templos y santuarios donde aprenden a comunicarse con los kami. El entrenamiento incluye rituales, meditación y servicio a los espíritus locales.',
    religious_focus_long: 'Los shugenja no veneran a dioses en el sentido tradicional, sino a los kami, los espíritus de la naturaleza. Algunos también honran a antepasados que fueron shugenja destacados.'
  }
];

async function run() {
  console.log('Insertando class_fluff para 9 clases suplementarias...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const fluff of classFluffData) {
    const { data, error } = await supabase
      .from('class_fluff')
      .upsert(fluff, { onConflict: 'class_id' })
      .select();

    if (error) {
      console.error(`❌ Error insertando fluff para class_id ${fluff.class_id}:`, error.message);
      errorCount++;
    } else {
      console.log(`✅ Fluff insertado para class_id: ${fluff.class_id}`);
      successCount++;
    }
  }

  console.log(`\n=== Resumen ===`);
  console.log(`✅ Exitosos: ${successCount}`);
  console.log(`❌ Errores: ${errorCount}`);

  // Verificar resultado final
  const { data: verification, error: verError } = await supabase
    .from('class_fluff')
    .select('class_id')
    .in('class_id', classFluffData.map(f => f.class_id));

  if (verError) {
    console.error('\n❌ Error en verificación:', verError.message);
  } else {
    console.log(`\n✅ Total registros en class_fluff para clases suplementarias: ${verification.length}`);
  }
}

run().catch(console.error);
