import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://akcuvlanpqpoizconuhm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrY3V2bGFucHFwb2l6Y29udWhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzExNzMwMCwiZXhwIjoyMDc4NjkzMzAwfQ.pIfA0AwG1J9VSp4jp50BaAqhgMR1V-A_QNmS5xs8AXA';

const supabase = createClient(supabaseUrl, supabaseKey);

// All 11 classes with complete data
const classUpdates = [
  {
    slug: 'wizard',
    data: {
      summary_es: 'Maestro de la magia arcana que estudia y prepara conjuros de un libro de hechizos, con acceso a la lista de conjuros más amplia del juego.',
      subtitulo: 'Erudito de las artes arcanas',
      weapon_proficiencies_es: 'Garrote, daga, ballesta pesada, ballesta ligera, bastón',
      weapon_proficiencies_en: 'Club, dagger, heavy crossbow, light crossbow, quarterstaff',
      armor_proficiencies_es: 'Ninguna. Los magos no son competentes con ningún tipo de armadura ni escudo. La armadura interfiere con los gestos arcanos.',
      armor_proficiencies_en: 'None. Armor interferes with a wizard\'s arcane gestures.',
      alignment_restriction_es: null,
      description_es: `## Mago

El mago es el maestro supremo de la magia arcana. A diferencia del hechicero, cuyo poder fluye de manera innata, el mago adquiere su poder a través del estudio meticuloso y la disciplina intelectual.

### Rasgos de Clase
**Dado de Golpe:** d4
**Puntos de Habilidad:** 2 + Int por nivel

### Sistema de Familiares
Los magos pueden obtener un familiar - un animal mágico que comparte un vínculo sobrenatural con su amo.

| Familiar | Beneficio |
|----------|-----------|
| Murciélago | +3 Escuchar |
| Gato | +3 Moverse Sigilosamente |
| Halcón | +3 Avistar (luz brillante) |
| Búho | +3 Avistar (sombras) |
| Rata | +2 Fortaleza |
| Sapo | +3 puntos de golpe |
| Cuervo | +3 Tasación, puede hablar |
| Serpiente | +3 Engañar |

### Especialización de Escuela
Un mago puede especializarse en una de las 8 escuelas (Abjuración, Conjuración, Adivinación, Encantamiento, Evocación, Ilusión, Nigromancia, Transmutación) para obtener un conjuro extra por nivel de conjuro cada día.

### Dotes Adicionales
- Nivel 1: Escribir Pergamino (gratis)
- Niveles 5, 10, 15, 20: Dote de creación de objetos, metamágica, o Dominio de Conjuro`,
      adventures: 'Los magos aventureros buscan conocimiento, poder y riqueza. Muchos se aventuran para encontrar tomos antiguos de conjuros, artefactos mágicos perdidos, o acceder a bibliotecas olvidadas.',
      characteristics: 'El mago se define por su intelecto y dedicación al estudio. Mientras otros confían en la fuerza bruta o habilidades naturales, el mago pasa años memorizando fórmulas arcanas complejas.',
      alignment: 'Los magos pueden ser de cualquier alineamiento. Los magos legales tienden a organizar su conocimiento metódicamente, mientras que los caóticos experimentan libremente.',
      religion: 'Muchos magos veneran a Boccob (dios de la magia) o a Wee Jas (diosa de la muerte y la magia). Algunos son agnósticos, considerando la magia como ciencia.',
      background: 'La mayoría de los magos comenzaron como aprendices de otro mago, pasando años estudiando antes de aventurarse solos. Algunos fueron autodidactas que encontraron tomos arcanos.',
      races: 'Los elfos tienen afinidad natural por la magia arcana. Los humanos también son magos comunes debido a su versatilidad. Los gnomos prefieren la ilusión.',
      other_classes: 'Los magos respetan a otros lanzadores de conjuros pero a veces desdeñan la magia "no estudiada" de los hechiceros. Valoran a los guerreros como protectores.',
      role: 'El mago es el artillero arcano del grupo. Su trabajo es lanzar conjuros devastadores desde la seguridad de la retaguardia, mientras otros lo protegen.'
    }
  },
  {
    slug: 'cleric',
    data: {
      summary_es: 'Servidor de los dioses que canaliza poder divino para sanar aliados, destruir no-muertos y lanzar conjuros según los dominios de su deidad.',
      subtitulo: 'Campeón de la fe divina',
      weapon_proficiencies_es: 'Todas las armas simples. Si el dominio de Guerra está disponible: arma marcial de la deidad + Soltura con Armas.',
      weapon_proficiencies_en: 'All simple weapons. If War domain available: martial weapon proficiency with deity\'s weapon + Weapon Focus.',
      armor_proficiencies_es: 'Todas las armaduras (ligeras, medias, pesadas) y escudos (excepto escudos torre).',
      armor_proficiencies_en: 'All armor (light, medium, heavy) and shields (except tower shields).',
      alignment_restriction_es: 'El alineamiento del clérigo debe estar dentro de un paso del de su deidad. Un clérigo no puede lanzar conjuros de un alineamiento opuesto al suyo o al de su deidad.',
      description_es: `## Clérigo

El clérigo es el campeón de la fe divina. Sirve a un dios o panteón, canalizando poder divino para ayudar a sus aliados, castigar a sus enemigos y cumplir la voluntad de su deidad.

### Rasgos de Clase
**Dado de Golpe:** d8
**Puntos de Habilidad:** 2 + Int por nivel

### Sistema de Dominios
Al crear un clérigo, debes elegir dos dominios de entre los ofrecidos por tu deidad. Cada dominio otorga:
1. **Poder Concedido:** Una habilidad especial a nivel 1.
2. **Conjuro de Dominio:** Un espacio extra por nivel de conjuro.

### Expulsar/Descontrolar No-Muertos
Los clérigos buenos expulsan o destruyen no-muertos. Los clérigos malvados descontrolan o controlan no-muertos.
- Usos por día: 3 + modificador de Carisma
- +2 si tienes 5+ rangos en Conocimiento (religión)`,
      adventures: 'Los clérigos se aventuran para difundir la fe de su deidad, destruir enemigos de su religión, buscar reliquias sagradas, o simplemente ayudar a los necesitados.',
      characteristics: 'El clérigo se define por su devoción a un poder superior. Esta fe le otorga acceso a magia divina que puede sanar, proteger, dañar o transformar.',
      alignment: 'El alineamiento de un clérigo debe estar dentro de un paso del de su deidad. Los clérigos de deidades legales buenas tienden a ser paladines espirituales.',
      religion: 'Todos los clérigos sirven a una deidad o panteón. Deidades populares incluyen Pelor, Heironeous, St. Cuthbert, Corellon Larethian, y Moradin.',
      background: 'Los clérigos generalmente son entrenados en templos o monasterios dedicados a su deidad. Algunos nacen en familias devotas, otros experimentan conversión religiosa.',
      races: 'Los humanos son los clérigos más comunes. Los enanos producen clérigos devotos de Moradin, y los elfos de Corellon Larethian.',
      other_classes: 'Los clérigos trabajan bien con casi todas las clases. Respetan a los paladines como compañeros de fe y valoran a los guerreros por su protección.',
      role: 'El clérigo es el sanador y soporte principal del grupo. Su capacidad de curar heridas, eliminar enfermedades, y resucitar a los muertos lo hace indispensable.'
    }
  },
  {
    slug: 'fighter',
    data: {
      summary_es: 'Maestro del combate marcial que obtiene más dotes adicionales que cualquier otra clase, permitiéndole especializarse en cualquier estilo de combate.',
      subtitulo: 'Maestro de las armas',
      weapon_proficiencies_es: 'Todas las armas simples y marciales.',
      weapon_proficiencies_en: 'All simple and martial weapons.',
      armor_proficiencies_es: 'Todas las armaduras (ligeras, medias, pesadas) y todos los escudos (incluyendo escudos torre).',
      armor_proficiencies_en: 'All armor (light, medium, heavy) and all shields (including tower shields).',
      alignment_restriction_es: null,
      description_es: `## Guerrero

El guerrero es el combatiente más versátil del juego. Con acceso a todas las armas, todas las armaduras, y una cantidad inigualada de dotes adicionales, el guerrero puede especializarse en virtualmente cualquier estilo de combate.

### Rasgos de Clase
**Dado de Golpe:** d10
**Puntos de Habilidad:** 2 + Int por nivel

### Dotes Adicionales
La característica definitoria del guerrero es su abundancia de dotes adicionales de combate.
- **Nivel 1:** 1 dote adicional
- **Nivel 2:** 1 dote adicional
- **Niveles 4, 6, 8, 10, 12, 14, 16, 18, 20:** 1 dote adicional cada uno

**Total:** 11 dotes adicionales de combate en 20 niveles.`,
      adventures: 'Los guerreros aventureros provienen de todos los ámbitos. Algunos son soldados profesionales, otros nobles entrenados en las artes de la guerra.',
      characteristics: 'El guerrero se define por su destreza en el combate. Mientras otras clases tienen acceso a magia o habilidades especiales, el guerrero sobresale simplemente siendo mejor en la lucha.',
      alignment: 'Los guerreros pueden ser de cualquier alineamiento. Los guerreros legales sirven como soldados o caballeros. Los caóticos pueden ser mercenarios o gladiadores.',
      religion: 'Algunos guerreros son devotos de deidades de la guerra como Kord o Heironeous. Muchos son indiferentes a la religión, prefiriendo confiar en sus propias habilidades.',
      background: 'Los guerreros provienen de diversos orígenes. Algunos fueron entrenados desde la infancia, otros aprendieron a luchar por necesidad.',
      races: 'Los humanos son los guerreros más comunes. Los enanos producen guerreros excelentes con hachas y armadura pesada. Los elfos prefieren estilos más ágiles.',
      other_classes: 'Los guerreros respetan a cualquiera que pueda aguantar en una pelea. Se llevan bien con bárbaros y paladines. Valoran a los clérigos por su curación.',
      role: 'El guerrero es el combatiente cuerpo a cuerpo principal del grupo. Con el mejor BAB del juego, muchos puntos de golpe, y acceso a la mejor armadura.'
    }
  },
  {
    slug: 'rogue',
    data: {
      summary_es: 'Experto en sigilo y habilidades que usa el ingenio y la precisión para superar obstáculos, con un devastador ataque furtivo.',
      subtitulo: 'Maestro del sigilo y la astucia',
      weapon_proficiencies_es: 'Todas las armas simples, además de ballesta de mano, arco corto, estoque, porra y espada corta.',
      weapon_proficiencies_en: 'All simple weapons, plus the hand crossbow, rapier, sap, shortbow, and short sword.',
      armor_proficiencies_es: 'Armaduras ligeras (pero no escudos).',
      armor_proficiencies_en: 'Light armor (but not shields).',
      alignment_restriction_es: null,
      description_es: `## Pícaro

El pícaro es el especialista en habilidades y el artista del sigilo. Donde otros confían en la fuerza bruta o la magia, el pícaro usa el ingenio, la precisión y el conocimiento.

### Rasgos de Clase
**Dado de Golpe:** d6
**Puntos de Habilidad:** 8 + Int por nivel (la clase con más skills)

### Ataque Furtivo
El pícaro puede infligir daño extra cuando atrapa a un oponente desprevenido.
- Nivel 1: +1d6
- Cada 2 niveles: +1d6 adicional
- Nivel 19: +10d6

### Habilidades Especiales
- **Evasión (nivel 2):** Sin daño en éxito de Reflejos
- **Sentido de las Trampas (nivel 3):** Bonus a Reflejos y CA contra trampas
- **Esquiva Increíble (nivel 4):** No pierde bonus de Destreza
- **Evasión Mejorada (nivel 10):** Medio daño incluso en fallo`,
      adventures: 'Los pícaros se aventuran por riqueza, emoción, o para escapar de su pasado. Muchos son ladrones o estafadores reformados.',
      characteristics: 'El pícaro se define por su versatilidad y astucia. Prefiere la inteligencia a la fuerza bruta y el sigilo a la confrontación directa.',
      alignment: 'Los pícaros tienden hacia alineamientos caóticos, valorando la libertad personal sobre las reglas. Sin embargo, pueden ser de cualquier alineamiento.',
      religion: 'Muchos pícaros veneran a Olidammara (dios de los ladrones) u otros dioses del engaño y la suerte.',
      background: 'Los pícaros provienen de las calles, gremios de ladrones, o incluso familias nobles que valoran las habilidades sutiles.',
      races: 'Los medianos y los elfos tienen inclinación natural hacia las habilidades del pícaro. Los humanos también son pícaros comunes por su versatilidad.',
      other_classes: 'Los pícaros trabajan bien con cualquiera que respete sus habilidades únicas. Valoran a los guerreros como distracción.',
      role: 'El pícaro es el especialista del grupo. Se encarga de trampas, cerraduras, y reconocimiento. En combate, busca flanquear para ataque furtivo.'
    }
  },
  {
    slug: 'sorcerer',
    data: {
      summary_es: 'Lanzador de conjuros arcanos innato cuyo poder fluye de su linaje o naturaleza, lanzando magia de forma espontánea sin necesidad de estudiar.',
      subtitulo: 'Hechicero de sangre arcana',
      weapon_proficiencies_es: 'Todas las armas simples.',
      weapon_proficiencies_en: 'All simple weapons.',
      armor_proficiencies_es: 'Ninguna. Los hechiceros no son competentes con armaduras ni escudos.',
      armor_proficiencies_en: 'None. Sorcerers are not proficient with any armor or shields.',
      alignment_restriction_es: null,
      description_es: `## Hechicero

El hechicero posee magia en su sangre. A diferencia del mago, que aprende magia a través del estudio, el poder del hechicero fluye de manera innata.

### Rasgos de Clase
**Dado de Golpe:** d4
**Puntos de Habilidad:** 2 + Int por nivel

### Magia Innata
Los hechiceros no preparan conjuros. Pueden lanzar cualquier conjuro que conozcan, tantas veces como sus espacios lo permitan.

### Conjuros Conocidos vs Mago
- **Menos conjuros conocidos** que un mago
- **Más conjuros por día** que un mago
- **Sin libro de hechizos** - Conocen conjuros de forma innata

### Familiar
Los hechiceros pueden obtener un familiar igual que los magos.`,
      adventures: 'Los hechiceros se aventuran para entender sus poderes, probar sus límites, o porque su naturaleza mágica los hace inadaptados para la vida sedentaria.',
      characteristics: 'El hechicero se define por su magia innata. Su poder no viene del estudio sino de su esencia misma.',
      alignment: 'Los hechiceros pueden ser de cualquier alineamiento. Su poder innato no dicta su moralidad.',
      religion: 'Muchos hechiceros son independientes religiosamente, viendo su poder como natural más que divino.',
      background: 'Los hechiceros a menudo descubren sus poderes en la juventud, a veces de forma traumática. Algunos tienen linaje de dragón o fey.',
      races: 'Los humanos son hechiceros comunes. Los gnomos tienen afinidad por la magia. Los semidragones pueden ser hechiceros naturales.',
      other_classes: 'Los hechiceros a veces tienen rivalidad amistosa con magos sobre cuál tradición es "mejor". Trabajan bien con cualquier grupo.',
      role: 'El hechicero es un lanzador arcano versátil. Puede lanzar más conjuros por día que un mago pero conoce menos. Excelente para conjuros de uso frecuente.'
    }
  },
  {
    slug: 'barbarian',
    data: {
      summary_es: 'Guerrero feroz de las tierras salvajes que canaliza su furia en combate, obteniendo fuerza sobrehumana y resistencia al daño.',
      subtitulo: 'Furia de las tierras salvajes',
      weapon_proficiencies_es: 'Todas las armas simples y marciales.',
      weapon_proficiencies_en: 'All simple and martial weapons.',
      armor_proficiencies_es: 'Armaduras ligeras, medias, y escudos (excepto escudos torre).',
      armor_proficiencies_en: 'Light armor, medium armor, and shields (except tower shields).',
      alignment_restriction_es: 'Cualquier alineamiento no legal. Los bárbaros son demasiado indómitos para seguir órdenes estrictas.',
      description_es: `## Bárbaro

El bárbaro es un guerrero feroz de las tierras salvajes. Su ira descontrolada le otorga fuerza sobrehumana y resistencia en combate.

### Rasgos de Clase
**Dado de Golpe:** d12 (el más alto del juego)
**Puntos de Habilidad:** 4 + Int por nivel

### Ira
El bárbaro puede entrar en ira varias veces al día, ganando:
- +4 Fuerza, +4 Constitución
- +2 a tiradas de Voluntad
- -2 a la CA

### Movimiento Rápido
+10 pies a la velocidad base (sin armadura pesada).

### Sentido de las Trampas
Bonus a Reflejos y CA contra trampas.

### Reducción de Daño
A partir del nivel 7, el bárbaro gana reducción de daño que aumenta con el nivel.`,
      adventures: 'Los bárbaros se aventuran por gloria, riqueza, o simplemente porque la vida civilizada les aburre. Muchos buscan enemigos dignos.',
      characteristics: 'El bárbaro se define por su conexión con la naturaleza salvaje y su capacidad de canalizar ira en combate.',
      alignment: 'Los bárbaros deben ser no-legales. Su naturaleza salvaje rechaza las restricciones de la sociedad civilizada.',
      religion: 'Muchos bárbaros veneran a dioses de la fuerza y la guerra como Kord, o dioses de la naturaleza como Obad-Hai.',
      background: 'Los bárbaros provienen de tribus nómadas, pueblos montañeses, o simplemente de regiones alejadas de la civilización.',
      races: 'Los humanos y semiorcos son bárbaros comunes. Algunas tribus de enanos o medianos también producen bárbaros.',
      other_classes: 'Los bárbaros respetan a otros guerreros y pueden tener dificultades con clases "civilizadas" como magos.',
      role: 'El bárbaro es un combatiente de primera línea. Su alta resistencia y daño lo hacen ideal para absorber ataques enemigos.'
    }
  },
  {
    slug: 'bard',
    data: {
      summary_es: 'Artista versátil que combina magia, combate y habilidades, usando la música y la palabra para inspirar aliados y confundir enemigos.',
      subtitulo: 'Maestro de mil talentos',
      weapon_proficiencies_es: 'Todas las armas simples, más espada larga, estoque, porra, espada corta, arco corto y látigo.',
      weapon_proficiencies_en: 'All simple weapons, plus the longsword, rapier, sap, short sword, shortbow, and whip.',
      armor_proficiencies_es: 'Armaduras ligeras y escudos (excepto escudos torre). Los bardos pueden lanzar conjuros arcanos con armadura ligera sin penalización.',
      armor_proficiencies_en: 'Light armor and shields (except tower shields). Bards can cast arcane spells in light armor without arcane spell failure.',
      alignment_restriction_es: 'Cualquier alineamiento no legal. Los bardos son espíritus libres.',
      description_es: `## Bardo

El bardo es el artista consumado, combinando magia, combate y habilidades en una mezcla única. Su música y palabras pueden inspirar aliados o confundir enemigos.

### Rasgos de Clase
**Dado de Golpe:** d6
**Puntos de Habilidad:** 6 + Int por nivel

### Música de Bardos
El bardo puede usar música o poesía para crear efectos mágicos:
- **Contrahechizo:** Usar música para contrarrestar efectos sonoros
- **Fascinación:** Cautivar criaturas con su actuación
- **Inspirar Valor:** Aliados ganan +1 a ataque y daño
- **Inspirar Competencia:** +2 a skill checks de un aliado
- **Sugestión:** Influenciar a criaturas fascinadas

### Conocimiento Bárdico
El bardo puede hacer tiradas para recordar leyendas, eventos, o conocimiento oscuro.`,
      adventures: 'Los bardos se aventuran por historias, fama, o simplemente por el amor a la aventura. Muchos buscan inspiración para sus obras.',
      characteristics: 'El bardo se define por su versatilidad y carisma. Es el "hombre orquesta" que puede hacer un poco de todo.',
      alignment: 'Los bardos deben ser no-legales. Su naturaleza artística valora la libertad de expresión.',
      religion: 'Los bardos pueden venerar a cualquier deidad, pero favorecen dioses del arte, la música, o los viajes.',
      background: 'Los bardos pueden provenir de tradiciones bardicas formales, conservatorios, o simplemente haber desarrollado sus talentos en la calle.',
      races: 'Los humanos, elfos y medianos producen muchos bardos. Los gnomos también tienen afinidad por la música.',
      other_classes: 'Los bardos se llevan bien con casi todos. Su carisma les ayuda a mediar conflictos en el grupo.',
      role: 'El bardo es el soporte versátil. Proporciona buffs, algo de curación, reconocimiento, y cara del partido en situaciones sociales.'
    }
  },
  {
    slug: 'druid',
    data: {
      summary_es: 'Guardián de la naturaleza que canaliza magia primordial, puede transformarse en animales y cuenta con un compañero animal leal.',
      subtitulo: 'Guardián del mundo natural',
      weapon_proficiencies_es: 'Garrote, daga, dardo, bastón, cimitarra, hoz, honda y lanza. Los druidas tienen prohibido usar armas de metal.',
      weapon_proficiencies_en: 'Club, dagger, dart, quarterstaff, scimitar, sickle, shortspear, sling, and spear. Druids are prohibited from using metal weapons.',
      armor_proficiencies_es: 'Armaduras ligeras, medias, y escudos. Sin embargo, los druidas no pueden usar armaduras de metal ni escudos de metal.',
      armor_proficiencies_en: 'Light armor, medium armor, and shields. However, druids are prohibited from wearing metal armor or using metal shields.',
      alignment_restriction_es: 'Neutral bueno, legal neutral, neutral, caótico neutral, o neutral malvado. Los druidas deben mantener al menos un componente neutral.',
      description_es: `## Druida

El druida es el guardián del mundo natural. Su magia proviene de la naturaleza misma, y su misión es protegerla de aquellos que la dañarían.

### Rasgos de Clase
**Dado de Golpe:** d8
**Puntos de Habilidad:** 4 + Int por nivel

### Compañero Animal
A nivel 1, el druida obtiene un compañero animal leal que crece en poder con él.

### Forma Salvaje
A partir del nivel 5, el druida puede transformarse en animales:
- Nivel 5: Animal pequeño o mediano
- Nivel 8: Animal grande
- Nivel 11: Animal pequeño diminuto
- Nivel 15: Animal enorme

### Vínculo Natural
Los druidas pueden comunicarse con animales y obtienen bonus para tratar con la naturaleza.`,
      adventures: 'Los druidas se aventuran para proteger la naturaleza de amenazas, buscar conocimiento natural, o cumplir con los ciclos de la vida.',
      characteristics: 'El druida se define por su conexión con la naturaleza. Ve el mundo como un sistema interconectado que debe ser protegido.',
      alignment: 'Los druidas deben tener al menos un componente neutral. La naturaleza no es buena ni malvada, legal ni caótica.',
      religion: 'Los druidas típicamente veneran a la naturaleza misma o a deidades naturales como Obad-Hai o Ehlonna.',
      background: 'Los druidas son entrenados por círculos druídicos o descubren su conexión con la naturaleza de forma independiente.',
      races: 'Los elfos y humanos producen muchos druidas. Los gnomos de los bosques también tienen afinidad druídica.',
      other_classes: 'Los druidas respetan a quienes respetan la naturaleza y pueden chocar con quienes la dañan.',
      role: 'El druida es un lanzador versátil con buenas capacidades de combate. Puede servir como sanador secundario, luchador (en forma animal), o controlador.'
    }
  },
  {
    slug: 'monk',
    data: {
      summary_es: 'Artista marcial que perfecciona cuerpo y mente, combatiendo sin armas ni armadura usando su ki para lograr hazañas sobrehumanas.',
      subtitulo: 'Maestro del cuerpo y la mente',
      weapon_proficiencies_es: 'Garrote, ballesta (ligera o pesada), daga, hacha de mano, jabalina, kama, nunchaku, bastón, sai, shuriken, siangham y honda.',
      weapon_proficiencies_en: 'Club, crossbow (light or heavy), dagger, handaxe, javelin, kama, nunchaku, quarterstaff, sai, shuriken, siangham, and sling.',
      armor_proficiencies_es: 'Ninguna. Los monjes pierden muchas de sus habilidades especiales cuando usan armadura o escudo.',
      armor_proficiencies_en: 'None. Monks lose many of their special abilities when wearing armor or using shields.',
      alignment_restriction_es: 'Cualquier alineamiento legal. La disciplina del monje requiere una mente ordenada.',
      description_es: `## Monje

El monje es un artista marcial que busca la perfección del cuerpo y la mente. Sin armadura ni armas convencionales, el monje es una máquina de combate mortal.

### Rasgos de Clase
**Dado de Golpe:** d8
**Puntos de Habilidad:** 4 + Int por nivel

### CA sin Armadura
Los monjes añaden su modificador de Sabiduría a la CA cuando no usan armadura.

### Ataques Desarmados
El daño desarmado del monje aumenta con el nivel:
- Nivel 1: 1d6
- Nivel 4: 1d8
- Nivel 8: 1d10
- Nivel 12: 2d6
- Nivel 16: 2d8
- Nivel 20: 2d10

### Ráfaga de Golpes
El monje puede hacer ataques adicionales a cambio de penalizadores.

### Movimiento Rápido
El monje gana velocidad adicional que aumenta con el nivel.`,
      adventures: 'Los monjes se aventuran para probarse a sí mismos, alcanzar la iluminación, o servir a su monasterio.',
      characteristics: 'El monje se define por su disciplina y autocontrol. Busca la perfección en todas las cosas.',
      alignment: 'Los monjes deben ser legales. La disciplina del monje requiere orden y estructura mental.',
      religion: 'Muchos monjes meditan sobre conceptos filosóficos más que adorar deidades. Algunos veneran a deidades de la disciplina.',
      background: 'Los monjes típicamente son entrenados en monasterios desde jóvenes. Algunos encuentran el camino más tarde en la vida.',
      races: 'Los humanos son los monjes más comunes. Los elfos y medianos también producen monjes ocasionalmente.',
      other_classes: 'Los monjes respetan la disciplina en otros y pueden tener dificultades con clases caóticas o indisciplinadas.',
      role: 'El monje es un combatiente móvil y versátil. Excelente para flanquear, eliminar lanzadores enemigos, y combatir sin depender de equipo.'
    }
  },
  {
    slug: 'paladin',
    data: {
      summary_es: 'Guerrero sagrado que combina proeza marcial con poder divino, sirviendo como campeón de la justicia y la rectitud.',
      subtitulo: 'Campeón sagrado de la justicia',
      weapon_proficiencies_es: 'Todas las armas simples y marciales.',
      weapon_proficiencies_en: 'All simple and martial weapons.',
      armor_proficiencies_es: 'Todas las armaduras (ligeras, medias, pesadas) y escudos (excepto escudos torre).',
      armor_proficiencies_en: 'All armor (light, medium, heavy) and shields (except tower shields).',
      alignment_restriction_es: 'Legal bueno. Los paladines que dejan de ser legales buenos pierden todos sus poderes de paladín.',
      description_es: `## Paladín

El paladín es el guerrero sagrado, un campeón de la justicia y la rectitud. Combina proeza marcial con poder divino para combatir el mal.

### Rasgos de Clase
**Dado de Golpe:** d10
**Puntos de Habilidad:** 2 + Int por nivel

### Golpe Divino
El paladín puede añadir su modificador de Carisma al daño contra enemigos malvados. Usos: 1/día por nivel.

### Imposición de Manos
Puede curar puntos de golpe igual a su nivel × modificador de Carisma por día.

### Aura de Valor
Aliados dentro de 10 pies ganan +4 contra miedo.

### Montura Especial
A nivel 5, el paladín puede llamar a una montura celestial.

### Conjuros
A partir del nivel 4, puede lanzar conjuros divinos limitados.`,
      adventures: 'Los paladines se aventuran para combatir el mal, proteger a los inocentes, y servir a su deidad.',
      characteristics: 'El paladín se define por su devoción inquebrantable a la justicia y el bien. Es un faro de esperanza.',
      alignment: 'Los paladines DEBEN ser legal buenos. Cualquier desviación resulta en pérdida de poderes.',
      religion: 'Los paladines típicamente sirven a deidades legales buenas como Heironeous, St. Cuthbert, o Pelor.',
      background: 'Los paladines son entrenados por órdenes sagradas o elegidos directamente por una deidad.',
      races: 'Los humanos producen la mayoría de los paladines. Los enanos también tienen tradiciones paladinas fuertes.',
      other_classes: 'Los paladines se llevan bien con clérigos y guerreros. Pueden tener conflictos con pícaros o personajes moralmente ambiguos.',
      role: 'El paladín es un combatiente de primera línea con capacidades de soporte. Puede curar, bufar con auras, y hacer daño extra contra el mal.'
    }
  },
  {
    slug: 'ranger',
    data: {
      summary_es: 'Cazador experto de las tierras salvajes que combina habilidades de combate con magia natural, especializándose contra enemigos específicos.',
      subtitulo: 'Cazador de las tierras salvajes',
      weapon_proficiencies_es: 'Todas las armas simples y marciales.',
      weapon_proficiencies_en: 'All simple and martial weapons.',
      armor_proficiencies_es: 'Armaduras ligeras y escudos (excepto escudos torre).',
      armor_proficiencies_en: 'Light armor and shields (except tower shields).',
      alignment_restriction_es: null,
      description_es: `## Explorador

El explorador es el maestro de las tierras salvajes, un cazador experto que combina habilidades de combate con magia natural.

### Rasgos de Clase
**Dado de Golpe:** d8
**Puntos de Habilidad:** 6 + Int por nivel

### Enemigo Predilecto
El explorador selecciona un tipo de enemigo contra el que gana bonificadores a daño y habilidades.
- +2 inicial, más enemigos y bonus mayores a niveles superiores

### Estilo de Combate
A nivel 2, elige entre:
- **Combate con Dos Armas:** Dotes de combate con dos armas
- **Arquería:** Dotes de combate a distancia

### Compañero Animal
A nivel 4, obtiene un compañero animal como el druida.

### Conjuros
A partir del nivel 4, puede lanzar conjuros divinos de la naturaleza.`,
      adventures: 'Los exploradores se aventuran para proteger las fronteras, cazar monstruos, o simplemente porque la civilización les aburre.',
      characteristics: 'El explorador se define por su conexión con la naturaleza y su habilidad como cazador.',
      alignment: 'Los exploradores pueden ser de cualquier alineamiento, aunque muchos tienden hacia el bien.',
      religion: 'Los exploradores pueden venerar a deidades de la naturaleza como Ehlonna o Obad-Hai, o ser independientes.',
      background: 'Los exploradores provienen de comunidades fronterizas, tribus, o simplemente de una vida en la naturaleza.',
      races: 'Los elfos y humanos producen muchos exploradores. Los medianos también son exploradores competentes.',
      other_classes: 'Los exploradores trabajan bien con druidas y otros amantes de la naturaleza. Respetan a los guerreros.',
      role: 'El explorador es un combatiente versátil con habilidades de reconocimiento. Excelente contra sus enemigos predilectos y en terreno salvaje.'
    }
  }
];

async function updateClasses() {
  console.log('Iniciando actualización de 11 clases base...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const classUpdate of classUpdates) {
    console.log(`Actualizando: ${classUpdate.slug}...`);

    const { error } = await supabase
      .from('classes')
      .update(classUpdate.data)
      .eq('slug', classUpdate.slug);

    if (error) {
      console.error(`  ❌ Error: ${error.message}`);
      errorCount++;
    } else {
      console.log(`  ✅ Actualizado correctamente`);
      successCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Resultado: ${successCount} exitosos, ${errorCount} errores`);
  console.log(`========================================\n`);

  // Verificación
  console.log('Verificando datos actualizados...\n');

  const { data: classes, error: verifyError } = await supabase
    .from('classes')
    .select('slug, titulo, summary_es, adventures, role')
    .eq('class_type', 'base')
    .order('titulo');

  if (verifyError) {
    console.error('Error en verificación:', verifyError);
  } else {
    console.log('Clases actualizadas:');
    classes.forEach(c => {
      const hasFluff = c.adventures ? '✅' : '❌';
      const hasRole = c.role ? '✅' : '❌';
      console.log(`  ${c.slug.padEnd(12)} - ${c.titulo.padEnd(15)} - Adventures: ${hasFluff} - Role: ${hasRole}`);
    });
  }
}

updateClasses().catch(console.error);
