import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://akcuvlanpqpoizconuhm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrY3V2bGFucHFwb2l6Y29udWhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzExNzMwMCwiZXhwIjoyMDc4NjkzMzAwfQ.pIfA0AwG1J9VSp4jp50BaAqhgMR1V-A_QNmS5xs8AXA';

const supabase = createClient(supabaseUrl, supabaseKey);

// Textos LARGOS del SRD d20srd.org para cada clase base
const LONG_FLUFF = {
  barbarian: {
    adventures: `Los bárbaros se aventuran por diversas razones. Muchos buscan riqueza, pues en sus tierras natales los recursos suelen ser escasos. Otros buscan probar su valía contra los peligros más mortales del mundo. Algunos son exiliados de sus tribus, buscando un nuevo hogar o venganza contra quienes los expulsaron.

Los bárbaros de tribus nómadas pueden ver la aventura como un rito de paso natural. Para un joven guerrero, nada demuestra mejor su valor que regresar a casa con tesoros ganados en batalla contra monstruos y villanos.

Las tierras civilizadas les resultan extrañas y a veces perturbadoras, pero también ofrecen oportunidades que simplemente no existen en las tierras salvajes: riquezas concentradas, enemigos dignos de su furia, y la oportunidad de ganarse una reputación que se extenderá por todo el mundo conocido.`,

    characteristics: `El bárbaro es ante todo un combatiente feroz. Su ira es su arma más peligrosa, permitiéndole entrar en un frenesí de batalla que aumenta dramáticamente su fuerza y resistencia al daño. Mientras está en este estado de furia, es casi imparable, aunque paga el precio con fatiga cuando la ira se desvanece.

A diferencia del guerrero entrenado formalmente, el bárbaro confía en sus instintos y reflejos naturales. Su velocidad de movimiento superior le permite cerrar distancias rápidamente o perseguir enemigos que huyen. Con el tiempo, desarrolla sentidos casi sobrenaturales que le advierten del peligro, haciendo casi imposible atraparlo desprevenido.

Los bárbaros de alto nivel pueden entrar en furia con mayor frecuencia y por más tiempo, y su ira puede llegar a niveles épicos de poder destructivo. Algunos desarrollan la capacidad de reducir el daño que reciben incluso fuera del combate.`,

    alignment: `Los bárbaros nunca son legales. Su forma de vida rechaza las restricciones de la civilización y las reglas formales. Pueden ser buenos, protegiendo ferozmente a sus aliados y a los inocentes, o pueden ser malvados, usando su poder para dominar y destruir.

La mayoría de los bárbaros son caóticos neutrales, siguiendo sus propios impulsos y el código de honor de su tribu más que las leyes de la sociedad civilizada. Respetan la fuerza y la valentía por encima de todo, y desprecian la debilidad y la cobardía.

Un bárbaro que se vuelve legal pierde la capacidad de entrar en furia - su naturaleza disciplinada es incompatible con el abandono salvaje que la furia requiere. Sin embargo, puede recuperar esta capacidad si retorna a un alineamiento no-legal.`,

    religion: `Muchos bárbaros desconfían de la magia, incluyendo la magia divina, pero aún así pueden tener creencias religiosas fuertes. Típicamente veneran a deidades de la naturaleza, la guerra y la fuerza.

Kord, el dios de la fuerza, es popular entre los bárbaros que buscan probarse constantemente. Obad-Hai atrae a aquellos con lazos profundos con la naturaleza salvaje. Erythnul, dios del matadero, atrae a los bárbaros más violentos y sanguinarios.

Los chamanes tribales a menudo sirven como intermediarios entre los bárbaros y los poderes divinos, realizando rituales y ofreciendo guía espiritual sin requerir la disciplina formal de un clérigo.`,

    background: `Los bárbaros provienen de las regiones más salvajes del mundo: montañas heladas, junglas densas, desiertos áridos, o las estepas interminables. Sus tribus pueden ser nómadas que siguen manadas de animales, o asentamientos semi-permanentes en territorios que otros considerarían inhabitables.

La vida en estas tierras es dura. Desde pequeños, los bárbaros aprenden a luchar, cazar y sobrevivir. Los débiles mueren; los fuertes prosperan. Esta crianza brutal produce guerreros formidables que ven la violencia como una herramienta natural para resolver problemas.

Algunos bárbaros son los últimos supervivientes de tribus destruidas, buscando venganza o simplemente un nuevo propósito. Otros son exploradores enviados por sus pueblos, o exiliados que violaron las tradiciones tribales.`,

    races: `Los humanos y los semiorcos son las razas más comunes entre los bárbaros. Los humanos tienen la adaptabilidad para sobrevivir en cualquier entorno, mientras que los semiorcos tienen una predisposición natural hacia la furia y la violencia.

Los enanos salvajes de algunas regiones montañosas también producen bárbaros formidables, combinando la resistencia natural de su raza con la furia bárbara. Incluso algunos medianos de comunidades aisladas adoptan este camino.

Los elfos rara vez son bárbaros - su cultura refinada y amor por la magia los inclina hacia otras clases. Sin embargo, los elfos salvajes de algunas regiones remotas son una excepción notable.`,

    other_classes: `Los bárbaros respetan la fuerza en cualquier forma. Se llevan bien con guerreros, a quienes ven como espíritus afines en el combate. Los exploradores comparten su amor por la naturaleza salvaje, aunque los bárbaros pueden encontrar excesivamente cauteloso su estilo.

Los monjes confunden a muchos bárbaros - ¿cómo puede alguien tan disciplinado ser tan efectivo en combate? Los magos y hechiceros generan desconfianza; su magia es incomprensible y potencialmente peligrosa.

Los bárbaros tienen una relación complicada con los clérigos. Respetan su poder de curación, pero desconfían de su conexión con fuerzas invisibles. Los paladines son particularmente problemáticos - su moralidad rígida choca con la libertad que los bárbaros valoran.`,

    role: `En combate, el bárbaro sirve como la punta de lanza del grupo. Su alta resistencia y capacidad de daño lo hacen ideal para enfrentar a los enemigos más peligrosos directamente. Cuando entra en furia, se vuelve un torbellino de destrucción capaz de derribar enemigos que otros no podrían enfrentar.

Fuera del combate, el bárbaro aporta conocimientos de supervivencia y una perspectiva diferente. Puede guiar al grupo a través de terrenos salvajes, rastrear enemigos, y detectar peligros que otros pasarían por alto.

Su debilidad principal es la falta de versatilidad. No tiene muchas opciones cuando el combate directo no es viable, y su furia lo deja fatigado, haciéndolo vulnerable en encuentros prolongados.`
  },

  bard: {
    adventures: `Los bardos son aventureros por naturaleza. Para ellos, cada viaje es una historia esperando ser contada, cada batalla una canción por componer. Buscan constantemente nuevas experiencias que enriquezcan su arte y les den material para sus actuaciones.

Muchos bardos viajan para aprender nuevas canciones, historias y secretos. Las antiguas ruinas pueden contener conocimientos perdidos; las cortes extranjeras pueden tener tradiciones musicales únicas. El mundo entero es su escuela.

El dinero también motiva a muchos bardos - las actuaciones pagan bien, pero el tesoro de una mazmorra paga mejor. Y las historias de primera mano siempre son más emocionantes que las de segunda mano.`,

    characteristics: `El bardo es el último generalista. Puede luchar decentemente, lanzar conjuros arcanos, curar heridas menores, desactivar trampas, y convencer a casi cualquiera de casi cualquier cosa. Donde otras clases se especializan, el bardo diversifica.

Su magia única viene de la música y la palabra. Sus canciones pueden inspirar a los aliados, desconcertar a los enemigos, o producir efectos mágicos directos. A diferencia de los magos, sus conjuros brotan de la creatividad artística más que del estudio académico.

El conocimiento bárdico le permite saber un poco sobre casi todo. Viejas canciones y leyendas contienen verdades olvidadas, y el bardo experimentado puede reconocer artefactos, recordar historias de villanos antiguos, o identificar criaturas raras.`,

    alignment: `Los bardos deben ser al menos parcialmente caóticos. El arte verdadero no puede existir dentro de restricciones rígidas, y la creatividad requiere libertad. Los bardos legales pierden la chispa que alimenta su magia.

La mayoría de los bardos tienden hacia el bien o la neutralidad. Usan su carisma para ayudar a otros y hacer el mundo más interesante. Sin embargo, algunos bardos malvados usan sus talentos para manipular, engañar y destruir.

Un bardo que se vuelve legal pierde la capacidad de avanzar como bardo, aunque retiene las habilidades que ya tenía. Puede progresar nuevamente si retorna a un alineamiento no-legal.`,

    religion: `Los bardos pueden seguir a cualquier deidad, pero favorecen aquellas asociadas con el arte, la música, la belleza, o el engaño. Olidammara, el dios pícaro, es particularmente popular por su amor por la diversión y las travesuras.

Corellon Larethian atrae a bardos élficos con su patronazgo de las artes. Fharlanghn, dios de los caminos, bendice a los bardos viajeros. Algunos bardos más oscuros sirven a Erythnul, encontrando inspiración en el caos y la destrucción.

Muchos bardos tienen una relación informal con la religión, honrando a múltiples deidades según la ocasión sin comprometerse profundamente con ninguna.`,

    background: `Los bardos pueden provenir de colegios bárdicos formales, donde estudian junto a otros artistas y aprenden tradiciones antiguas. Estos colegios preservan conocimientos, entrenan nuevas generaciones, y mantienen redes de información.

Otros bardos son autodidactas, aprendiendo sus habilidades en las calles, tabernas, y caminos del mundo. Su educación puede ser menos formal, pero a menudo es más práctica y versátil.

Algunos bardos provienen de familias nobles, entrenados para entretener en la corte. Otros son hijos de bardos viajeros, nacidos en el camino y criados entre historias y canciones.`,

    races: `Los elfos tienen afinidad natural por la música y la magia, produciendo muchos bardos talentosos. Los humanos, como siempre, son versátiles y pueden destacar en cualquier tradición bárdica.

Los medianos y los gnomos también producen bardos excelentes, combinando su amor por las historias con talento natural para la música. Los gnomos en particular disfrutan de las ilusiones que los bardos pueden crear.

Los semiorcos rara vez son bardos - su cultura no valora las artes refinadas. Sin embargo, algunos semiorcos encuentran en la música bárdica una forma de conectar con su lado humano.`,

    other_classes: `Los bardos se llevan bien con casi todos gracias a su carisma natural. Son particularmente buenos mediadores cuando surgen conflictos en el grupo, usando su diplomacia para suavizar tensiones.

Aprecian a los pícaros como espíritus afines y a los hechiceros como compañeros arcanos. Los guerreros y bárbaros proporcionan protección mientras el bardo trabaja su magia. Los clérigos complementan sus capacidades de curación limitadas.

Los magos a veces desdeñan la magia "informal" de los bardos, pero los bardos sabios ignoran esta actitud y valoran el poder arcano de cualquier fuente.`,

    role: `El bardo es el soporte definitivo. Su música de inspiración mejora a todo el grupo, haciendo que los guerreros golpeen más fuerte, los lanzadores de conjuros sean más efectivos, y todos resistan mejor el miedo y otros efectos mentales.

En combate, el bardo puede luchar decentemente con armas ligeras mientras mantiene sus canciones activas. Sus conjuros de encantamiento pueden neutralizar enemigos sin necesidad de violencia.

Fuera del combate, el bardo brilla como el "cara" del grupo. Negocia, recoge información, entretiene para ganar favores, y usa su conocimiento extenso para identificar amenazas y oportunidades.`
  },

  cleric: {
    adventures: `Los clérigos se aventuran para cumplir la voluntad de sus deidades. Esto puede significar difundir la fe, destruir enemigos de su religión, recuperar reliquias sagradas, o proteger a los fieles de peligros mundanos y sobrenaturales.

Algunos clérigos son enviados específicamente por sus templos en misiones sagradas. Otros sienten un llamado personal que los lleva más allá de los muros del templo. Para muchos, la aventura es simplemente la mejor forma de hacer el trabajo de su dios en el mundo.

El tesoro adquirido puede financiar templos, ayudar a los pobres, o equipar cruzadas. La experiencia ganada hace del clérigo un servidor más poderoso de su deidad.`,

    characteristics: `El clérigo canaliza el poder divino. A través de la fe y la devoción, obtiene la capacidad de lanzar conjuros sagrados, curar heridas, expulsar (o controlar) a los muertos vivientes, y recibir guía directa de su deidad.

Los conjuros clericales cubren un rango enorme: curación, protección, mejoras, daño, adivinación, y mucho más. Un clérigo preparado tiene herramientas para casi cualquier situación.

Los dominios divinos enfocan el poder del clérigo. Cada deidad otorga acceso a ciertos dominios que reflejan su naturaleza, dando al clérigo conjuros adicionales y poderes especiales relacionados con esos aspectos.`,

    alignment: `El alineamiento de un clérigo debe estar dentro de un paso del de su deidad. Un clérigo de una deidad legal buena puede ser legal bueno, legal neutral, o neutral bueno, pero no caótico o malvado.

Los clérigos buenos canalizan energía positiva, pudiendo curar a los vivos y dañar a los muertos vivientes. Los clérigos malvados canalizan energía negativa, dañando a los vivos y potenciando a los no-muertos.

Los clérigos neutrales deben elegir al inicio de su carrera qué tipo de energía canalizan. Esta elección es permanente y refleja la inclinación personal del clérigo dentro de la doctrina de su fe.`,

    religion: `Los clérigos sirven a deidades específicas y obtienen su poder de esa conexión divina. Cada religión tiene sus propias tradiciones, rituales, vestimentas, y expectativas para sus clérigos.

Pelor, dios del sol, es popular entre clérigos sanadores. Heironeous atrae a aquellos que luchan contra el mal. St. Cuthbert demanda justicia y orden. Nerull otorga poder a quienes abrazan la muerte.

Los clérigos sin una deidad específica son raros. Algunos sirven a un concepto o fuerza (como la naturaleza o la guerra), pero esto es más difícil y menos común que la devoción a un dios específico.`,

    background: `Los clérigos típicamente comienzan como acólitos en templos, aprendiendo los rituales, doctrinas, y prácticas de su fe. Los años de entrenamiento culminan en la ordenación formal como clérigo.

Algunos clérigos reciben un llamado divino más directo, experimentando visiones o milagros que los llevan a la fe. Estos clérigos pueden tener menos entrenamiento formal pero una conexión más personal con su deidad.

La vida clerical varía enormemente según la religión. Algunos clérigos viven en monasterios aislados; otros trabajan en comunidades como sanadores y consejeros; otros viajan constantemente predicando y haciendo el trabajo de su dios.`,

    races: `Los humanos son los clérigos más comunes, sirviendo a todo el panteón de deidades humanas. Su versatilidad y fe fervorosa los hace siervos efectivos de casi cualquier dios.

Los enanos producen clérigos devotos de Moradin, el dios de la forja. Los elfos tienen clérigos de Corellon Larethian y otras deidades élficas. Cada raza tiene sus tradiciones religiosas propias.

Los semiorcos que superan su naturaleza brutal a veces se vuelven clérigos poderosos, sirviendo a deidades que valoran la redención o, alternativamente, abrazando completamente su lado oscuro al servicio de dioses malvados.`,

    other_classes: `Los clérigos trabajan bien con casi todas las clases, proporcionando curación, protección, y soporte que todos necesitan. Son particularmente valorados en grupos que enfrentan muertos vivientes u otras amenazas sobrenaturales.

Los paladines comparten la devoción del clérigo y a menudo sirven al mismo dios. Los guerreros aprecian la curación. Los magos valoran los conjuros de protección. Incluso los pícaros reconocen la utilidad de un sanador.

Pueden surgir tensiones con clérigos de deidades opuestas o con personajes cuyas acciones contradicen las enseñanzas del dios del clérigo.`,

    role: `El clérigo es el sanador principal de la mayoría de los grupos. Su capacidad para curar heridas, remover enfermedades, y resucitar a los muertos lo hace invaluable en aventuras largas y peligrosas.

En combate, muchos clérigos son combatientes capaces. Armaduras pesadas y escudos los protegen mientras sus conjuros de mejora los hacen aún más formidables. Contra muertos vivientes, son devastadores.

Como apoyo, el clérigo ofrece bendiciones, protecciones, y guía divina. Sus conjuros de adivinación pueden revelar información crucial, y su conexión con su deidad puede proporcionar consejos en momentos de necesidad.`
  },

  druid: {
    adventures: `Los druidas se aventuran para proteger la naturaleza de amenazas que van más allá de lo que pueden manejar en sus territorios locales. Demonios, muertos vivientes, y cultistas de deidades destructivas amenazan el balance natural, y alguien debe detenerlos.

Muchos druidas buscan conocimiento sobre el mundo natural. Nuevas especies de plantas, fenómenos naturales inexplicados, y lugares de poder primal los atraen. La exploración es una forma de expandir su comprensión del mundo.

Algunos druidas simplemente no pueden quedarse quietos. Así como los animales migran y los bosques se expanden, ellos sienten el impulso de moverse y ver qué hay más allá del horizonte.`,

    characteristics: `El druida tiene una conexión profunda con la naturaleza y todos los seres vivos. Su magia proviene del mundo natural mismo, no de libros ni de dioses, aunque muchos veneran a las fuerzas de la naturaleza.

La capacidad de cambiar de forma es el poder más distintivo del druida. Pueden transformarse en animales, ganando sus habilidades físicas mientras retienen su propia mente. A niveles altos, pueden tomar formas cada vez más poderosas.

Los compañeros animales son otra marca del druida. Estos animales leales luchan junto al druida, obedecen sus comandos, y comparten un vínculo casi telepático con su compañero humanoid.`,

    alignment: `Los druidas deben tener al menos un componente neutral en su alineamiento. La naturaleza no es buena ni malvada, legal ni caótica - simplemente es. Los druidas reflejan esta verdad fundamental.

La mayoría de los druidas son neutrales verdaderos, buscando el balance en todas las cosas. Algunos se inclinan hacia el bien o el mal, la ley o el caos, pero nunca abandonan completamente la neutralidad.

Un druida que viola los principios de la naturaleza o adopta un alineamiento sin neutralidad pierde sus poderes druídicos hasta que expíe sus transgresiones.`,

    religion: `Los druidas típicamente veneran a la naturaleza misma o a deidades de la naturaleza como Obad-Hai o Ehlonna. Algunos sirven a aspectos específicos como los bosques, los océanos, o las tormentas.

A diferencia de los clérigos, los druidas no necesariamente tienen una relación personal con una deidad. Su poder viene de la naturaleza, y su devoción puede ser a conceptos más que a dioses específicos.

Los círculos druídicos mantienen tradiciones antiguas y secretas que predatan muchas religiones organizadas. Estos misterios se transmiten de maestro a estudiante a través de generaciones incontables.`,

    background: `Los druidas son entrenados por otros druidas, a menudo en círculos secretos que se reúnen en bosques sagrados o lugares de poder natural. Este entrenamiento puede durar años y incluye conocimientos de plantas, animales, y los rituales druídicos.

Algunos druidas descubren su conexión con la naturaleza de forma independiente, y solo después buscan un maestro para refinar sus poderes. Estos "druidas salvajes" pueden tener perspectivas únicas.

Los druidas tienen idioma propio, el Druídico, que está prohibido enseñar a no-druidas. Es un idioma antiguo, lleno de términos para conceptos naturales que otras lenguas no pueden expresar.`,

    races: `Los elfos, especialmente los elfos salvajes, tienen afinidad natural por el druidismo. Su larga vida les permite desarrollar conexiones profundas con los bosques que habitan.

Los humanos son druidas comunes, capaces de adaptarse a cualquier entorno natural. Los medianos y gnomos de comunidades rurales también producen druidas ocasionalmente.

Los enanos y semiorcos rara vez son druidas - sus culturas no enfatizan la conexión con la naturaleza. Sin embargo, druidas de estas razas existen, a menudo como forasteros de sus propias sociedades.`,

    other_classes: `Los druidas se llevan bien con exploradores y bárbaros, que comparten su aprecio por la naturaleza salvaje. Los clérigos de deidades naturales son aliados naturales.

Pueden tener conflictos con personajes que dañan la naturaleza innecesariamente o que representan la "civilización" en su forma más destructiva. Las ciudades los incomodan, y la industrialización les resulta abominable.

Los magos y sus experimentos arcanos a veces preocupan a los druidas, especialmente cuando involucran la manipulación de la vida o la extracción de recursos naturales.`,

    role: `El druida es un lanzador de conjuros versátil con buenas capacidades de combate, especialmente en forma animal. Puede servir como sanador de respaldo, combatiente de primera línea, o artillería a distancia según la situación.

Su compañero animal proporciona flanqueo, daño adicional, y utilidad fuera del combate (exploración, guardia, etc.). En forma de animal pequeño, el druida puede explorar áreas inaccesibles.

En entornos naturales, el druida está en su elemento. Puede hablar con animales, moverse por terreno difícil sin problemas, y usar el entorno mismo como arma contra sus enemigos.`
  },

  fighter: {
    adventures: `Los guerreros aventureros provienen de todos los ámbitos de la vida. Algunos son mercenarios buscando el próximo contrato lucrativo. Otros son soldados retirados que extrañan la emoción del combate. Muchos simplemente buscan probar su valía contra los desafíos más peligrosos del mundo.

La riqueza es un motivador común - el tesoro de una mazmorra puede establecer a un guerrero de por vida. La gloria también atrae a muchos; las hazañas en batalla son la forma más segura de ganar reputación.

Algunos guerreros aventuran por causas más nobles: proteger a los inocentes, derrotar tiranos, o simplemente hacer del mundo un lugar más seguro.`,

    characteristics: `El guerrero se define por su maestría marcial. Mientras otras clases se distraen con magia, subterfugio, o poderes divinos, el guerrero se dedica completamente al arte del combate.

Esta dedicación se traduce en dotes de combate. Los guerreros obtienen más dotes que cualquier otra clase, permitiéndoles especializarse en estilos de combate específicos o volverse generalistas versátiles.

La capacidad de usar cualquier arma y cualquier armadura da al guerrero flexibilidad incomparable. Puede adaptarse a cualquier situación táctica, equipándose según las necesidades del momento.`,

    alignment: `Los guerreros pueden ser de cualquier alineamiento. El entrenamiento marcial es moralmente neutral - lo que importa es cómo se usa.

Los guerreros legales a menudo sirven en ejércitos, guardias, o como guardaespaldas de nobles. Los caóticos pueden ser mercenarios independientes o gladiadores. Los buenos protegen a los débiles; los malvados oprimen.

La mayoría de los guerreros tienden hacia la neutralidad, viendo el combate como un oficio más que como una causa.`,

    religion: `Los guerreros que son religiosos típicamente sirven a deidades de la guerra como Kord (fuerza y atletismo) o Heironeous (valor y justicia). Los guerreros malvados pueden servir a Hextor o Erythnul.

Muchos guerreros tienen una relación práctica con la religión. Rezan antes de las batallas, hacen ofrendas por victorias, pero no dedican sus vidas al servicio divino.

Algunos guerreros son completamente seculares, confiando solo en su espada y su habilidad.`,

    background: `Los guerreros pueden ser entrenados de muchas formas. Algunos aprenden en academias militares formales, estudiando tácticas y estilos de combate de múltiples tradiciones. Otros son veteranos de guerras, forjados en el fuego de batallas reales.

Los gladiadores desarrollan estilos llamativos pero efectivos en las arenas. Los guardaespaldas aprenden a proteger además de atacar. Los cazadores de monstruos se especializan en derrotar criaturas específicas.

La vida de un guerrero antes de aventurarse a menudo determina sus especialidades. Un arquero de un ejército luchará diferente que un duelista de una escuela de esgrima.`,

    races: `Los humanos son los guerreros más comunes, con escuelas marciales en casi toda cultura humana. Su versatilidad les permite dominar cualquier estilo de combate.

Los enanos producen guerreros excelentes, combinando resistencia natural con tradiciones marciales antiguas. El hacha y el martillo son sus armas favoritas.

Los elfos prefieren la elegancia en el combate, favoreciendo espadas largas y arcos. Los medianos compensan su tamaño con agilidad y astucia. Los semiorcos confían en fuerza bruta y agresividad.`,

    other_classes: `Los guerreros respetan a cualquiera que pueda aguantar en una pelea. Se llevan bien con bárbaros y paladines, que comparten su enfoque en el combate directo.

Aprecian la curación de clérigos, los buff de bardos, y la artillería de magos. Ven su rol como proteger a estos aliados más frágiles mientras hacen su trabajo.

Los guerreros pueden frustrarse con compañeros que evitan el combate directo, pero los veteranos aprenden a valorar la diversidad táctica.`,

    role: `El guerrero es el combatiente cuerpo a cuerpo definitivo. Con el mejor BAB, el mejor dado de golpe (junto con el bárbaro), y acceso a todas las armas y armaduras, puede enfrentar casi cualquier amenaza física.

Su rol típico es absorber daño y eliminar amenazas. Los guerreros se interponen entre los enemigos y los miembros más vulnerables del grupo.

Fuera del combate, los guerreros contribuyen con conocimiento táctico, experiencia militar, y la capacidad de intimidar. Muchos también tienen habilidades prácticas como montar, nadar, o escalar.`
  },

  monk: {
    adventures: `Los monjes se aventuran para probarse a sí mismos contra los desafíos del mundo. El camino hacia la perfección requiere superar obstáculos, y ¿qué mejor obstáculos que los peligros de una mazmorra o los villanos que amenazan al mundo?

Algunos monjes buscan la iluminación a través de la experiencia directa. Los libros y la meditación solo pueden enseñar tanto; el verdadero conocimiento viene de vivir.

Otros monjes son enviados por sus monasterios en misiones específicas, o han sido expulsados por violaciones del código monástico. Algunos simplemente sienten el llamado de los caminos y no pueden ignorarlo.`,

    characteristics: `El monje busca la perfección del cuerpo y la mente a través de la disciplina y el entrenamiento. Sin armadura y a menudo sin armas, depende de su propio cuerpo como su herramienta principal.

Su golpe desarmado es devastador, rivalizando con armas convencionales a niveles medios y superándolas en niveles altos. Puede atacar múltiples veces con rapidez sobrenatural.

Las habilidades especiales del monje reflejan su dominio sobre sí mismo: velocidad sobrenatural, resistencia a enfermedades y venenos, la capacidad de curar sus propias heridas con fuerza de voluntad, e incluso inmunidad a la magia de influencia mental.`,

    alignment: `Los monjes deben ser legales. La disciplina del entrenamiento monástico requiere orden y estructura. Un monje caótico no puede mantener el enfoque necesario para dominar las técnicas avanzadas.

Dentro de lo legal, los monjes pueden ser buenos, neutrales, o malvados. Los monjes buenos buscan la iluminación para ayudar a otros. Los neutrales se enfocan en su propio perfeccionamiento. Los malvados usan sus habilidades para dominar o destruir.

Un monje que se vuelve no-legal no puede progresar más como monje, aunque retiene sus habilidades existentes.`,

    religion: `Muchos monjes meditan sobre conceptos filosóficos más que adorar deidades específicas. La perfección del yo puede ser una forma de espiritualidad en sí misma.

Los monjes que sirven a deidades típicamente eligen aquellas que valoran la disciplina, como St. Cuthbert (ley y justicia) o Heironeous (valor y honor). Algunos monjes malvados sirven a Hextor.

Los monasterios a menudo tienen sus propias tradiciones espirituales, mezclando elementos de varias religiones con filosofías marciales únicas.`,

    background: `Los monjes típicamente son entrenados desde jóvenes en monasterios aislados. La vida monástica es dura: días largos de entrenamiento físico, meditación, y trabajo manual.

No todos los que entran al monasterio completan el entrenamiento. Los que lo logran emergen transformados, con cuerpos y mentes afinados hasta un grado que otros no pueden imaginar.

Algunos monjes aprenden sus habilidades fuera de los monasterios tradicionales, quizás de un maestro solitario o a través de disciplinas secretas pasadas dentro de familias.`,

    races: `Los humanos son los monjes más comunes. Su versatilidad y determinación los hace candidatos excelentes para el entrenamiento riguroso.

Los elfos y medianos también producen monjes capaces, aunque sus tradiciones monásticas difieren de las humanas. Los enanos y semiorcos rara vez son monjes - sus culturas no enfatizan la disciplina mental del mismo modo.

Los monjes de cualquier raza son relativamente raros; el camino monástico es difícil y pocos tienen la dedicación para recorrerlo.`,

    other_classes: `Los monjes respetan la disciplina en otros, pero pueden encontrar difícil relacionarse con quienes carecen de autocontrol. Los paladines comparten su enfoque en un código estricto.

Los bárbaros representan todo lo que los monjes rechazan: violencia sin control, ira sin disciplina. Pueden trabajar juntos, pero rara vez se entienden.

Los monjes valoran a los aliados que pueden mantener el ritmo con su movilidad. Aprecian la curación de los clérigos pero prefieren no depender de ella.`,

    role: `El monje es un combatiente móvil y versátil. Su velocidad superior le permite llegar a enemigos que otros no pueden alcanzar, eliminando lanzadores de conjuros y arqueros enemigos.

No es un tanque como el guerrero; el monje depende de la movilidad y la CA para sobrevivir más que de puntos de golpe y armadura. Debe elegir sus batallas cuidadosamente.

Fuera del combate, el monje contribuye con percepciones agudas, sabiduría, y la capacidad de moverse sigilosamente. Muchos monjes también tienen entrenamiento en conocimientos esotéricos.`
  },

  paladin: {
    adventures: `Los paladines se aventuran para combatir el mal dondequiera que lo encuentren. Demonios, muertos vivientes, tiranos, y villanos de todo tipo son sus enemigos naturales. El mundo está lleno de amenazas, y el paladín se siente obligado a enfrentarlas.

Para muchos paladines, la aventura es un deber sagrado. Sus deidades les han dado poder para luchar contra el mal, y usarlo es una forma de adoración.

La riqueza ganada financia causas nobles: templos, orfanatos, cruzadas contra el mal. El paladín no acumula tesoro para sí mismo, sino para servir a otros.`,

    characteristics: `El paladín combina proezas marciales con fe divina. Es un guerrero formidable por derecho propio, pero su devoción le otorga poderes adicionales que lo hacen especialmente efectivo contra el mal.

Imponer manos le permite curar heridas con un toque. Detectar el mal le revela la presencia de maldad sobrenatural. Inmunidad a enfermedades y miedos lo protege de debilidades comunes. Su aura de valor fortalece a los aliados cercanos.

El montura especial del paladín es una criatura celestial con inteligencia sobrenatural, leal hasta la muerte. Juntos, paladín y montura son una fuerza formidable.`,

    alignment: `Los paladines DEBEN ser legales buenos. Esta no es simplemente una preferencia; es un requisito absoluto de su poder. Un paladín que comete actos malvados o que abandona la ley pierde todos sus poderes de paladín.

El código del paladín es estricto: actuar con honor, ayudar a los necesitados, castigar a los malhechores. No pueden asociarse voluntariamente con personajes malvados conocidos, aunque pueden trabajar temporalmente con aquellos de otros alineamientos para causas justas.

Un paladín caído puede buscar redención a través de un conjuro de expiación, pero debe demostrar verdadero arrepentimiento y hacer penitencia por sus faltas.`,

    religion: `Los paladines sirven a deidades legales buenas. Heironeous (valor), St. Cuthbert (justicia), y Pelor (sol y sanación) son opciones populares. La deidad específica puede influir en el estilo y énfasis del paladín.

A diferencia de los clérigos, los paladines obtienen sus poderes de su rectitud personal más que de una conexión directa con su deidad. Su fe es un escudo contra el mal.

Las órdenes de paladines a menudo están asociadas con templos específicos, pero los paladines sirven al bien más que a una institución particular.`,

    background: `Los paladines son entrenados por órdenes sagradas o elegidos directamente por poderes divinos. El entrenamiento es riguroso, combinando artes marciales con educación religiosa y moral.

No cualquiera puede ser paladín. Los candidatos deben demostrar no solo habilidad sino pureza de corazón. Muchos que inician el entrenamiento no lo completan.

Algunos paladines surgen de forma espontánea, llamados por visiones o experiencias transformadoras. Estos paladines "naturales" pueden carecer de entrenamiento formal pero poseen una conexión directa con lo divino.`,

    races: `Los humanos producen la mayoría de los paladines. Su pasión por las causas y su naturaleza dual (capaz tanto de gran bien como de gran mal) los hace candidatos ideales.

Los enanos tienen tradiciones de paladines devotos de Moradin. Los medianos ocasionalmente producen paladines de Yondalla. Los elfos rara vez son paladines; su naturaleza caótica es incompatible con el código estricto.

Los semiorcos que se convierten en paladines son raros pero poderosos ejemplos de redención, demostrando que cualquiera puede elegir el camino del bien.`,

    other_classes: `Los paladines trabajan bien con clérigos (especialmente de la misma fe) y otros personajes buenos. Los guerreros son aliados de combate naturales.

Tienen dificultades con personajes moralmente ambiguos. Los pícaros los frustran con sus métodos dudosos. Los bárbaros y hechiceros pueden ser aliados incómodos.

Los paladines NO pueden asociarse voluntariamente con personajes malvados conocidos. Esta restricción puede crear tensión si un miembro del grupo cae en el mal.`,

    role: `El paladín es un combatiente de primera línea con capacidades de soporte. Puede luchar tan bien como un guerrero mientras proporciona curación y protección al grupo.

Contra el mal, especialmente muertos vivientes y demonios, el paladín es devastador. Destruir infame permite derrotar enemigos malvados con un solo golpe.

Como líder natural, el paladín a menudo toma la iniciativa en negociaciones con fuerzas del bien y en decisiones morales del grupo.`
  },

  ranger: {
    adventures: `Los exploradores se aventuran para proteger las fronteras de la civilización, cazar monstruos peligrosos, o simplemente explorar lo desconocido. Las tierras salvajes los llaman, y no pueden resistir.

Muchos exploradores tienen enemigos específicos - goblins que asolan las aldeas fronterizas, trolls que amenazan los caminos comerciales, o incluso dragones que deben ser rastreados y enfrentados.

Algunos exploradores son guías, ayudando a otros a cruzar territorios peligrosos. Otros son cazadores de recompensas, rastreando criminales que huyen hacia la naturaleza.`,

    characteristics: `El explorador combina habilidades de combate con conocimiento de la naturaleza. Es un cazador experto, capaz de rastrear presas a través de cualquier terreno y sobrevivir en las condiciones más duras.

Los enemigos favorecidos representan a criaturas que el explorador ha estudiado extensamente. Contra estos enemigos, el explorador tiene ventajas significativas en combate y rastreo.

A niveles superiores, el explorador desarrolla un vínculo con un compañero animal y gana acceso a conjuros divinos menores, reflejando su conexión con el mundo natural.`,

    alignment: `Los exploradores pueden ser de cualquier alineamiento, aunque muchos tienden hacia el bien. Proteger a los inocentes de las amenazas de las tierras salvajes es una motivación común.

Los exploradores buenos son defensores de las comunidades fronterizas. Los neutrales se enfocan en la supervivencia y la caza sin agenda moral. Los malvados pueden ser cazadores despiadados o guías que traicionan a sus clientes.

La mayoría de los exploradores valoran la libertad personal y tienden hacia alineamientos caóticos o neutrales más que legales.`,

    religion: `Los exploradores que son religiosos típicamente sirven a deidades de la naturaleza como Ehlonna (bosques) u Obad-Hai (naturaleza salvaje). Algunos sirven a Fharlanghn (caminos) o a deidades de la caza.

A diferencia de los druidas, los exploradores no necesitan una conexión religiosa profunda. Muchos tienen una espiritualidad práctica, honrando a la naturaleza sin servir a ninguna deidad específica.

La magia del explorador viene de su conexión con la tierra más que de la devoción divina.`,

    background: `Los exploradores típicamente provienen de comunidades fronterizas donde las habilidades de supervivencia son esenciales. Desde jóvenes aprenden a cazar, rastrear, y sobrevivir en la naturaleza.

Algunos exploradores son entrenados por otros exploradores en tradiciones antiguas. Otros desarrollan sus habilidades por necesidad, quizás como el único superviviente de una aldea destruida por monstruos.

El entrenamiento militar también puede producir exploradores, particularmente scouts y saboteadores que operan detrás de las líneas enemigas.`,

    races: `Los elfos tienen afinidad natural para el rol de explorador. Sus sentidos agudos, amor por la naturaleza, y longevidad los hacen rastreadores excelentes.

Los humanos son exploradores comunes en cualquier terreno. Los medianos, especialmente de comunidades rurales, producen exploradores hábiles. Los semiorcos pueden ser rastreadores brutalmente efectivos.

Los enanos rara vez son exploradores tradicionales, aunque los enanos de montaña tienen tradiciones de patrullas similares.`,

    other_classes: `Los exploradores trabajan bien con druidas y otros amantes de la naturaleza. Respetan a los guerreros y bárbaros como compañeros de combate.

Pueden encontrar frustrantes a los personajes urbanos que no saben moverse en la naturaleza. Los magos que dependen de comodidades pueden ser compañeros difíciles en expediciones largas.

Los exploradores valoran la competencia práctica sobre los títulos o la posición social.`,

    role: `El explorador es un combatiente versátil con capacidades únicas. Sus enemigos favorecidos lo hacen especialmente efectivo contra amenazas específicas, mientras su conocimiento de la naturaleza beneficia a todo el grupo.

En terreno salvaje, el explorador guía al grupo, encontrando comida, evitando peligros, y rastreando enemigos. Su compañero animal proporciona utilidad adicional.

En combate, el explorador puede luchar cuerpo a cuerpo o a distancia con igual efectividad. Su estilo de dos armas es particularmente devastador contra sus enemigos favorecidos.`
  },

  rogue: {
    adventures: `Los pícaros se aventuran por innumerables razones: riqueza, emoción, escapar del pasado, o simplemente porque tienen las habilidades perfectas para el trabajo. Las mazmorras están llenas de trampas que derrotar y tesoros que encontrar.

Muchos pícaros provienen de orígenes humildes donde la aventura es la única forma de escapar de la pobreza. Otros son nobles aburridos buscando emociones, o criminales huyendo de sus delitos.

El talento del pícaro para resolver problemas de formas creativas los hace valiosos en cualquier grupo de aventureros.`,

    characteristics: `El pícaro se define por sus habilidades, no por la fuerza bruta o la magia. Es el maestro del subterfugio, la infiltración, y la resolución de problemas. Donde otros fallan por la fuerza, el pícaro tiene éxito por la astucia.

El ataque furtivo es su técnica de combate característica. Cuando puede flanquear a un enemigo o atacar a uno que no lo espera, el pícaro inflige daño devastador. Esta capacidad lo hace mortal a pesar de su combate directo inferior.

Las habilidades del pícaro cubren un rango enorme: abrir cerraduras, desactivar trampas, moverse sigilosamente, trepar muros, encontrar objetos ocultos, y mucho más. Es el solucionador de problemas del grupo.`,

    alignment: `Los pícaros pueden ser de cualquier alineamiento, aunque tienden hacia los alineamientos caóticos. Valoran la libertad personal y la capacidad de tomar decisiones propias.

Los pícaros buenos son héroes populares, robando a los ricos para dar a los pobres o usando sus habilidades para proteger a los inocentes. Los neutrales son oportunistas, trabajando para quien pague mejor.

Los pícaros malvados son ladrones, asesinos, y criminales sin escrúpulos. Usan sus talentos para beneficio personal sin importar quién sufra.`,

    religion: `Muchos pícaros veneran a Olidammara, el dios pícaro de los ladrones y la diversión. Otros sirven a deidades del comercio, los viajes, o la suerte.

La religión no suele ser central en la vida del pícaro. Son pragmáticos, rezando cuando necesitan ayuda pero sin dedicar sus vidas al servicio divino.

Algunos pícaros son completamente irreligiosos, confiando solo en su propia habilidad y astucia.`,

    background: `Los pícaros provienen de orígenes diversos. Muchos crecieron en las calles, aprendiendo a robar para sobrevivir. Gremios de ladrones proporcionan entrenamiento formal a aquellos con talento.

Otros pícaros vienen de familias nobles, donde aprendieron etiqueta y engaño como parte de la política cortesana. Algunos son ex-espías, aventureros retirados, o simplemente personas con talento natural.

El entrenamiento de un pícaro nunca termina realmente. Cada nueva situación es una oportunidad de aprender, y los mejores pícaros siempre están ampliando su repertorio.`,

    races: `Los medianos tienen una inclinación natural hacia las habilidades del pícaro, combinando su tamaño pequeño con agilidad y sigilo naturales. Los elfos también producen pícaros excelentes.

Los humanos son pícaros comunes, adaptables a cualquier estilo. Los semielfos combinan talentos élficos y humanos. Los semiorcos rara vez son pícaros sutiles, pero pueden ser intimidadores efectivos.

Los gnomos producen pícaros con un toque ilusionista, usando magia menor para complementar sus habilidades.`,

    other_classes: `Los pícaros trabajan bien con cualquiera que respete sus habilidades únicas. Valoran a los compañeros que pueden crear oportunidades para ataques furtivos (guerreros, bárbaros) o que complementan sus debilidades (clérigos, magos).

Pueden tener fricciones con paladines y otros personajes que objetan a sus métodos. Los pícaros malvados pueden encontrar difícil trabajar con grupos heroicos.

Los mejores grupos aprecian lo que el pícaro aporta y le dan espacio para trabajar.`,

    role: `El pícaro es el especialista del grupo. Se encarga de trampas, cerraduras, y reconocimiento. En una mazmorra, el pícaro típicamente va adelante, buscando peligros antes de que el grupo avance.

En combate, el pícaro busca oportunidades de ataque furtivo. No puede enfrentar enemigos directamente como un guerrero, pero cuando puede flanquear o sorprender, su daño es devastador.

Fuera del combate, el pícaro es invaluable para recoger información, negociar desde las sombras, y resolver problemas que la fuerza bruta no puede tocar.`
  },

  sorcerer: {
    adventures: `Los hechiceros se aventuran para entender y desarrollar sus poderes innatos. La magia corre por sus venas, y solo a través de la experiencia pueden aprender a controlarla completamente.

Muchos hechiceros se sienten diferentes, aislados de la sociedad normal. La aventura les ofrece un lugar donde sus poderes son valorados y donde pueden encontrar a otros como ellos.

El tesoro también motiva - los componentes mágicos son caros, y un hechicero con recursos puede experimentar con su arte más libremente.`,

    characteristics: `El hechicero posee magia innata. A diferencia del mago, no aprende conjuros de libros; simplemente los conoce intuitivamente. Esta magia puede venir de sangre dracónica, conexiones feéricas, o simplemente talento natural inexplicable.

La limitación del hechicero es su conocimiento limitado de conjuros. Conoce pocos conjuros comparado con un mago, pero puede lanzarlos con mayor frecuencia y flexibilidad. No necesita preparar conjuros por adelantado.

A niveles altos, el hechicero puede desarrollar capacidades especiales relacionadas con la fuente de su poder. Un hechicero de sangre dracónica podría ganar resistencia a un tipo de energía o incluso alas.`,

    alignment: `Los hechiceros pueden ser de cualquier alineamiento. Su poder innato no dicta su moralidad; eso depende de ellos mismos.

Muchos hechiceros tienden hacia el caos, valorando la libertad que su poder les da. Pero hechiceros de todos los alineamientos existen, desde santos hasta villanos.

La sociedad a veces desconfía de los hechiceros debido a su poder impredecible. Esto puede empujar a algunos hacia el resentimiento y la oscuridad.`,

    religion: `Muchos hechiceros ven su poder como natural, no divino, y tienen poca conexión con la religión. Algunos veneran a deidades de la magia como Boccob o Wee Jas.

Los hechiceros con sangre dracónica pueden venerar (o temer) a los dragones mismos. Aquellos con conexiones feéricas pueden honrar a espíritus de la naturaleza.

La relación del hechicero con la religión es típicamente personal más que institucional.`,

    background: `Los hechiceros a menudo descubren sus poderes de forma espontánea, usualmente durante la adolescencia. Este despertar puede ser traumático - conjuros incontrolados, accidentes mágicos, y el rechazo de quienes los rodean.

Algunos hechiceros vienen de familias con tradición de magia de sangre. Otros son los primeros de su línea en manifestar el don. El origen del poder puede ser conocido o misterioso.

Sin escuelas formales, muchos hechiceros son autodidactas. Pueden buscar mentores o simplemente aprender por ensayo y error.`,

    races: `Los humanos son hechiceros comunes - su versatilidad incluye el potencial mágico innato. Los elfos también producen hechiceros, aunque muchos prefieren el estudio arcano formal.

Los gnomos tienen afinidad natural por las ilusiones, produciendo hechiceros especializados en ese ámbito. Los semidragones y planetouched (aasimar, tieflings) tienen predisposición natural hacia la hechicería.

Los enanos y medianos rara vez son hechiceros; su cultura no produce las conexiones mágicas necesarias con tanta frecuencia.`,

    other_classes: `Los hechiceros tienen una rivalidad amistosa con los magos sobre qué tradición arcana es superior. En la práctica, trabajan bien juntos, proporcionando diferentes fortalezas.

Aprecian a los combatientes que los protegen mientras lanzan conjuros. Los clérigos proporcionan curación que los hechiceros no pueden replicar fácilmente.

Los hechiceros pueden sentirse incómodos con personajes muy religiosos o tradicionales que no entienden la magia innata.`,

    role: `El hechicero es un lanzador arcano versátil con excelente capacidad de lanzamiento espontáneo. Puede repetir sus conjuros más útiles sin preparación previa, adaptándose a situaciones cambiantes.

En combate, el hechicero es artillería arcana. Bolas de fuego, relámpagos, y otros conjuros de daño son su especialidad. También puede controlar el campo de batalla con ilusiones y encantamientos.

Fuera del combate, los conjuros de utilidad del hechicero (vuelo, invisibilidad, detección de magia) proporcionan capacidades que ninguna otra clase puede igualar.`
  },

  wizard: {
    adventures: `Los magos aventureros buscan conocimiento, poder y los recursos para continuar sus estudios. Las antiguas ruinas contienen grimorios perdidos; los villanos poseen artefactos que deben ser estudiados (o destruidos).

La investigación arcana es cara. Los componentes materiales, los laboratorios, y los libros cuestan fortunas. El tesoro de las mazmorras puede financiar años de estudio.

Algunos magos se aventuran por curiosidad pura. El mundo está lleno de maravillas mágicas esperando ser descubiertas, catalogadas, y entendidas.`,

    characteristics: `El mago representa el dominio intelectual de la magia. A través de años de estudio riguroso, aprende a dar forma a las fuerzas arcanas del universo. Su poder viene del conocimiento, no del talento innato.

El grimorio del mago es su posesión más valiosa. Contiene todos los conjuros que conoce, y sin él no puede preparar nuevos conjuros. Los magos protegen sus libros celosamente.

La especialización en una escuela de magia (evocación, transmutación, etc.) permite al mago lanzar conjuros de esa escuela con mayor efectividad, a cambio de abandonar una o más escuelas opuestas.

### Sistema de Familiares

Los magos pueden invocar familiares, pequeñas criaturas mágicas que sirven como compañeros y ayudantes. La conexión entre mago y familiar es profunda - comparten sentidos, y el mago gana beneficios especiales según el tipo de familiar.

| Familiar | Beneficio para el Amo |
|----------|----------------------|
| Murciélago | +3 en pruebas de Escuchar |
| Gato | +3 en pruebas de Moverse Sigilosamente |
| Halcón | +3 en pruebas de Avistar en luz brillante |
| Lechuza | +3 en pruebas de Avistar en penumbra |
| Rata | +2 en salvaciones de Fortaleza |
| Cuervo | +3 en pruebas de Averiguar Intenciones |
| Serpiente (víbora pequeña) | +3 en pruebas de Engañar |
| Sapo | +3 puntos de golpe |
| Comadreja | +2 en salvaciones de Reflejos |

Un familiar muerto puede ser reemplazado después de un año, o inmediatamente si el mago lanza un conjuro especial.`,

    alignment: `Los magos pueden ser de cualquier alineamiento. El estudio arcano es moralmente neutral - lo que importa es cómo se aplica el conocimiento.

Los magos legales tienden a organizar su conocimiento metódicamente y trabajar dentro de academias estructuradas. Los caóticos experimentan libremente, a veces con resultados impredecibles.

Algunos de los villanos más peligrosos del mundo son magos. El poder corrompe, y pocos tienen más acceso al poder que un mago de alto nivel.`,

    religion: `Muchos magos veneran a Boccob, el dios de la magia, o a Wee Jas, diosa de la muerte y la magia. Algunos honran a deidades del conocimiento como Delleb.

La magia arcana no requiere fe religiosa. Muchos magos son agnósticos o ateos prácticos, viendo la magia como una fuerza natural más que divina.

Algunos magos religiosos ven su estudio como una forma de entender la creación divina. Otros lo ven como competencia con los dioses.`,

    background: `Los magos típicamente comienzan como aprendices de magos más experimentados, pasando años memorizando fórmulas arcanas y copiando conjuros.

Las academias mágicas proporcionan educación estructurada a quienes pueden pagarla. Algunos magos son autodidactas, aprendiendo de libros robados o descubiertos.

El camino del mago es largo. Mientras otras clases pueden surgir de forma natural, ser mago requiere años de estudio dedicado antes de lanzar el primer conjuro.`,

    races: `Los elfos tienen afinidad natural por la magia arcana y producen muchos magos excelentes. Su longevidad les permite décadas de estudio que otras razas no pueden igualar.

Los humanos son magos comunes, compensando con ambición lo que les falta en tiempo. Los gnomos se especializan en ilusiones. Los medianos rara vez son magos - su cultura práctica no enfatiza el estudio arcano.

Los enanos tienen una relación complicada con la magia arcana; sus magos existen pero son raros y a menudo marginados.`,

    other_classes: `Los magos respetan a otros lanzadores de conjuros pero a veces desdeñan la magia "inferior" de hechiceros (demasiado desordenada) o bardos (demasiado informal).

Valoran la protección de los combatientes mientras preparan sus conjuros más poderosos. Los clérigos proporcionan curación que los magos no pueden replicar fácilmente.

Los magos pueden frustrarse con compañeros que no entienden la importancia de sus investigaciones o que no respetan sus libros.`,

    role: `El mago es el maestro de la versatilidad arcana. Con preparación adecuada, tiene un conjuro para casi cualquier situación. Esta flexibilidad lo hace invaluable en grupos bien planificados.

En combate, el mago puede ser artillería devastadora, controlador del campo de batalla, o soporte - dependiendo de qué conjuros haya preparado. A niveles altos, sus conjuros pueden cambiar el curso de batallas enteras.

Fuera del combate, los conjuros de utilidad del mago (identificación de objetos mágicos, vuelo, teleportación, etc.) proporcionan capacidades que definen lo que el grupo puede lograr.`
  }
};

async function updateLongFluff() {
  console.log('🔄 Actualizando campos fluff con textos LARGOS del SRD...\n');

  let success = 0;
  let errors = 0;

  for (const [slug, fluff] of Object.entries(LONG_FLUFF)) {
    console.log(`📝 Actualizando ${slug}...`);

    const { error } = await supabase
      .from('classes')
      .update({
        adventures: fluff.adventures,
        characteristics: fluff.characteristics,
        alignment: fluff.alignment,
        religion: fluff.religion,
        background: fluff.background,
        races: fluff.races,
        other_classes: fluff.other_classes,
        role: fluff.role
      })
      .eq('slug', slug);

    if (error) {
      console.error(`   ❌ Error: ${error.message}`);
      errors++;
    } else {
      console.log(`   ✅ Actualizado correctamente`);
      success++;
    }
  }

  console.log(`\n📊 Resultado: ${success} exitosos, ${errors} errores`);
}

updateLongFluff();
