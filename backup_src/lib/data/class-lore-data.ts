// Datos de trasfondo y narrativa para las clases de D&D 3.5
// Basado en los archivos .md oficiales del Player's Handbook

export interface ClassLoreData {
  slug: string;
  motivacion_aventura: string;
  tipo_poder_principal: string;
  descripcion_poder: string;
  rol_party: string;
  origen_social: string;
  tipo_organizacion?: string;
  enfoque_religioso?: string;
  deidades_tipicas?: string;
  razas_comunes: string;
  regla_alineamiento: string;
  tendencia_alineamiento?: string;
  tiene_magia: boolean;
  tipo_magia?: string;
  estilo_conjuros?: string;
}

export const classLoreData: ClassLoreData[] = [
  {
    slug: 'barbaro',
    motivacion_aventura: 'La aventura es la mejor oportunidad para los bárbaros de encontrar un lugar en la sociedad civilizada. No están bien adaptados a la monotonía del trabajo de guardia o tareas mundanas. Los bárbaros aventuran para derrotar enemigos odiados y tienen una notable aversión hacia lo antinatural, incluyendo muertos vivientes, demonios y diablos.',
    tipo_poder_principal: 'Furia primigenia',
    descripcion_poder: 'Donde la habilidad del guerrero en combate proviene del entrenamiento y la disciplina, el bárbaro posee una poderosa furia. Durante esta furia berserker, se vuelve más fuerte y resistente, mejor capacitado para derrotar enemigos y resistir sus ataques. Estas furias lo dejan exhausto, y tiene energía solo para unas pocas demostraciones espectaculares por día.',
    rol_party: 'El rol típico del bárbaro en un grupo de aventureros es como especialista de combate de primera línea. Ningún otro personaje puede igualar su pura resistencia. También puede servir como buen explorador, gracias a su velocidad, selección de habilidades y sentido del peligro.',
    origen_social: 'Los bárbaros provienen de tierras incivilizadas o de tribus bárbaras en las afueras de la civilización. Un bárbaro aventurero puede haber sido atraído a las tierras colonizadas por la promesa de riquezas, puede haber escapado después de ser capturado en su tierra natal y vendido como esclavo, puede haber sido reclutado como soldado, o puede haber sido expulsado de su tierra natal por invasores.',
    enfoque_religioso: 'Algunos bárbaros desconfían de las religiones establecidas y prefieren una relación intuitiva y natural con el cosmos sobre la adoración formal. Otros se dedican a deidades poderosas del panteón.',
    deidades_tipicas: 'Kord (dios de la fuerza), Obad-Hai (dios de la naturaleza), Erythnul (dios de la matanza)',
    razas_comunes: 'Los bárbaros humanos vienen de las tierras salvajes distantes en el borde de la civilización. La mayoría de los bárbaros semiorcos vivieron entre orcos antes de abandonarlos por las tierras humanas. Los bárbaros enanos son raros, generalmente provenientes de reinos enanos que han caído en la barbarie como resultado de guerras recurrentes. Los bárbaros de otras razas son muy raros.',
    regla_alineamiento: 'Cualquier alineamiento no legal',
    tendencia_alineamiento: 'Los bárbaros nunca son legales. Pueden ser honorables, pero en el fondo son salvajes. Esta naturaleza salvaje es su fuerza, y no podría vivir en un alma legal. En el mejor de los casos, los bárbaros de alineamiento caótico son libres y expresivos. En el peor, son destructivos sin pensar.',
    tiene_magia: false,
    tipo_magia: 'ninguna',
    estilo_conjuros: 'no_aplica'
  },
  {
    slug: 'bardo',
    motivacion_aventura: 'Los bardos buscan aventuras para recolectar historias, perfeccionar sus habilidades y descubrir conocimientos perdidos. Son coleccionistas de leyendas y cuentos, viajando de lugar en lugar para aprender y compartir sus conocimientos a través de canciones y relatos.',
    tipo_poder_principal: 'Magia musical',
    descripcion_poder: 'Los bardos dominan la música mágica, una forma única de poder que combina arte y hechicería. Su música puede inspirar aliados, fascinar enemigos o alterar la realidad misma con sugestiones mágicas.',
    rol_party: 'Los bardos sirven como líderes inspiradores y apoyo versátil. Pueden fortalecer a sus aliados con canciones, debilitar enemigos con encantamientos y poseen conocimientos sobre casi cualquier tema que pueda surgir durante las aventuras.',
    origen_social: 'Los bardos provienen de diversos orígenes: algunos aprendieron en colegios de bardos formales, otros fueron aprendices de maestros viajeros, y algunos descubrieron su talento de forma natural y lo desarrollaron por cuenta propia.',
    enfoque_religioso: 'Los bardos típicamente veneran deidades del arte, conocimiento y viajes, aunque su naturaleza libre a menudo los lleva a ser más espirituales que devotamente religiosos.',
    deidades_tipicas: 'Fharlanghn (dios de los caminos), Olidammara (dios de los pícaros)',
    razas_comunes: 'Los bardos son comunes entre humanos, elfos, semielfos y gnomos. Su amor por la música y las historias trasciende las barreras raciales.',
    regla_alineamiento: 'Cualquier alineamiento no legal',
    tendencia_alineamiento: 'La naturaleza errante y la libertad creativa de los bardos los inclina hacia alineamientos caóticos o neutrales.',
    tiene_magia: true,
    tipo_magia: 'arcana',
    estilo_conjuros: 'espontaneo'
  },
  {
    slug: 'clerigo',
    motivacion_aventura: 'Los clérigos aventuran para cumplir la voluntad de sus deidades, expandir su fe, proteger a los inocentes o combatir las fuerzas del mal. Cada misión es una oportunidad para demostrar su devoción y aumentar el poder de su iglesia.',
    tipo_poder_principal: 'Poder divino',
    descripcion_poder: 'Los clérigos canalizan el poder directo de sus deidades. Este poder divino les permite realizar milagros de curación, protección y destrucción según la naturaleza de su dios.',
    rol_party: 'Los clérigos son el pilar de apoyo del grupo, proporcionando curación, protección y guía espiritual. También pueden servir como guerreros formidables cuando la situación lo requiere.',
    origen_social: 'Los clérigos provienen de templos, monasterios o comunidades religiosas donde recibieron su llamado divino y entrenamiento teológico.',
    tipo_organizacion: 'Iglesias jerárquicas',
    enfoque_religioso: 'Los clérigos dedican sus vidas al servicio de una deidad específica, siguiendo sus dogmas y expandiendo su influencia en el mundo mortal.',
    deidades_tipicas: 'Pelor (sol y curación), Heironeous (valor), Moradin (enanos), Nerull (muerte)',
    razas_comunes: 'Los clérigos se encuentran en todas las razas civilizadas, aunque son especialmente comunes entre humanos y enanos.',
    regla_alineamiento: 'Debe estar a un paso del alineamiento de su deidad',
    tendencia_alineamiento: 'El alineamiento del clérigo refleja fuertemente los valores y naturaleza de su deidad patrona.',
    tiene_magia: true,
    tipo_magia: 'divina',
    estilo_conjuros: 'preparado'
  },
  // Continuar con las demás clases...
];