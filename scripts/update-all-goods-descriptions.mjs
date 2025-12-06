import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.SUPABASE_SERVICE_ROLE_KEY
);

// Descripciones del SRD en español
const itemDescriptions = {
  // === ADVENTURING GEAR ===
  'Caltrops': `<p>Un abrojo es una púa de hierro de cuatro puntas diseñada para que una punta siempre quede hacia arriba sin importar cómo caiga. Se esparcen abrojoss en el suelo con la esperanza de que los enemigos pisen uno o al menos se vean obligados a reducir la velocidad para evitarlos. Una bolsa de 1 kg de abrojoss cubre un área de 1,5 metros cuadrados.</p>

<p>Cada vez que una criatura se mueve a un área cubierta por abrojoss (o pasa una ronda luchando mientras está parada en dicha área), puede pisar uno. Los abrojoss hacen una tirada de ataque (bonificador de ataque base +0) contra la criatura. Para este ataque, los bonificadores de escudo, armadura y desviación de la criatura no cuentan. Si la criatura lleva zapatos u otro calzado, obtiene un bonificador de armadura +2 a la CA. Si los abrojoss tienen éxito en el ataque, la criatura ha pisado uno. El abrojo inflige 1 punto de daño, y la velocidad de la criatura se reduce a la mitad porque su pie está herido. Esta penalización de movimiento dura 24 horas, o hasta que la criatura sea tratada con éxito con una prueba de Sanar CD 15, o hasta que reciba al menos 1 punto de curación mágica.</p>

<p>Una criatura cargando o corriendo debe detenerse inmediatamente si pisa un abrojo. Cualquier criatura moviéndose a media velocidad o menos puede atravesar una zona de abrojoss sin problemas.</p>`,

  'Candle': `<p>Una vela ilumina tenuemente un radio de 1,5 metros y arde durante 1 hora.</p>`,

  'Chain': `<p>La cadena tiene dureza 10 y 5 puntos de golpe. Puede romperse con una prueba de Fuerza CD 26.</p>`,

  'Crowbar': `<p>Una palanca otorga un bonificador de circunstancia +2 en las pruebas de Fuerza realizadas para forzar puertas o abrir objetos. Si se usa en combate, trata la palanca como un arma improvisada a una mano que inflige daño contundente igual al de un garrote de su tamaño.</p>`,

  'Flint and steel': `<p>Encender una antorcha con pedernal y acero es una acción de asalto completo, y encender cualquier otro fuego con ellos toma al menos ese tiempo.</p>`,

  'Grappling hook': `<p>Lanzar un gancho de agarre exitosamente requiere una prueba de Usar Cuerdas (CD 10, +2 por cada 3 metros de distancia lanzada).</p>`,

  'Hammer': `<p>Si un martillo se usa en combate, trátalo como un arma improvisada a una mano que inflige daño contundente igual al de un guantelete con púas de su tamaño.</p>`,

  'Ink': `<p>Esta es tinta negra. Puedes comprar tinta en otros colores, pero cuesta el doble.</p>`,

  'Jug, clay': `<p>Esta jarra de cerámica básica está equipada con un tapón y contiene 4 litros de líquido.</p>`,

  'Lamp, common': `<p>Una lámpara ilumina claramente un radio de 4,5 metros, proporciona iluminación tenue hasta un radio de 9 metros, y arde durante 6 horas con medio litro de aceite. Puedes llevar una lámpara en una mano.</p>`,

  'Lantern, bullseye': `<p>Una linterna de ojo de buey proporciona iluminación clara en un cono de 18 metros e iluminación tenue en un cono de 36 metros. Arde durante 6 horas con medio litro de aceite. Puedes llevar una linterna de ojo de buey en una mano.</p>`,

  'Lantern, hooded': `<p>Una linterna con capucha ilumina claramente un radio de 9 metros y proporciona iluminación tenue en un radio de 18 metros. Arde durante 6 horas con medio litro de aceite. Puedes llevar una linterna con capucha en una mano.</p>`,

  'Manacles': `<p>Los grilletes pueden atar a una criatura Mediana. Una criatura esposada puede usar la habilidad Escapismo para liberarse (CD 30). Romper los grilletes requiere una prueba de Fuerza (CD 26). Los grilletes tienen dureza 10 y 10 puntos de golpe.</p>

<p>La mayoría de los grilletes tienen cerraduras; añade el costo de la cerradura que quieras al costo de los grilletes.</p>

<p>Por el mismo costo, puedes comprar grilletes para una criatura Pequeña. Para una criatura Grande, los grilletes cuestan diez veces la cantidad indicada, y para una criatura Enorme, cien veces esta cantidad.</p>`,

  'Manacles, masterwork': `<p>Los grilletes de obra maestra pueden atar a una criatura Mediana. Una criatura esposada puede usar la habilidad Escapismo para liberarse (CD 35). Romper los grilletes de obra maestra requiere una prueba de Fuerza (CD 28). Los grilletes tienen dureza 10 y 10 puntos de golpe.</p>

<p>La mayoría de los grilletes tienen cerraduras; añade el costo de la cerradura que quieras al costo de los grilletes.</p>`,

  'Oil': `<p>Medio litro de aceite arde durante 6 horas en una linterna. Puedes usar un frasco de aceite como arma de salpicadura. Usa las reglas para el fuego alquímico, excepto que toma una acción de asalto completo preparar un frasco con una mecha. Una vez lanzado, hay un 50% de probabilidad de que el frasco se encienda exitosamente.</p>

<p>Puedes verter medio litro de aceite en el suelo para cubrir un área de 1,5 metros cuadrados, siempre que la superficie sea lisa. Si se enciende, el aceite arde durante 2 asaltos e inflige 1d3 puntos de daño por fuego a cada criatura en el área.</p>`,

  'Ram, portable': `<p>Este ariete de madera con refuerzos de hierro te da un bonificador de circunstancia +2 en las pruebas de Fuerza realizadas para derribar una puerta y permite que una segunda persona te ayude sin tener que tirar, aumentando tu bonificador en 2.</p>`,

  'Rope, hempen': `<p>Esta cuerda tiene 2 puntos de golpe y puede romperse con una prueba de Fuerza CD 23.</p>`,

  'Rope, silk': `<p>Esta cuerda tiene 4 puntos de golpe y puede romperse con una prueba de Fuerza CD 24. Es tan flexible que proporciona un bonificador de circunstancia +2 en las pruebas de Usar Cuerdas.</p>`,

  'Spyglass': `<p>Los objetos vistos a través de un catalejo se magnifican al doble de su tamaño.</p>`,

  'Torch': `<p>Una antorcha arde durante 1 hora, iluminando claramente un radio de 6 metros y proporcionando iluminación tenue hasta un radio de 12 metros. Si una antorcha se usa en combate, trátala como un arma improvisada a una mano que inflige daño contundente igual al de un guantelete de su tamaño, más 1 punto de daño por fuego.</p>`,

  'Vial': `<p>Un vial contiene 30 ml de líquido. El contenedor con tapón generalmente no tiene más de 2,5 cm de ancho y 7,5 cm de alto.</p>`,

  // === SPECIAL SUBSTANCES ===
  'Acid': `<p>Puedes lanzar un frasco de ácido como arma de salpicadura. Trata este ataque como un ataque de toque a distancia con un incremento de alcance de 3 metros. Un impacto directo inflige 1d6 puntos de daño por ácido. Cada criatura a 1,5 metros del punto donde impacta el ácido recibe 1 punto de daño por ácido de la salpicadura.</p>`,

  "Alchemist's fire": `<p>Puedes lanzar un frasco de fuego alquímico como arma de salpicadura. Trata este ataque como un ataque de toque a distancia con un incremento de alcance de 3 metros.</p>

<p>Un impacto directo inflige 1d6 puntos de daño por fuego. Cada criatura a 1,5 metros del punto donde impacta el frasco recibe 1 punto de daño por fuego de la salpicadura. En el asalto siguiente a un impacto directo, el objetivo recibe 1d6 puntos de daño adicionales. Si lo desea, el objetivo puede usar una acción de asalto completo para intentar extinguir las llamas antes de recibir este daño adicional. Extinguir las llamas requiere una tirada de salvación de Reflejos CD 15. Rodar por el suelo proporciona al objetivo un bonificador +2 a la tirada de salvación. Saltar a un lago o extinguir mágicamente las llamas sofoca automáticamente el fuego.</p>`,

  'Antitoxin': `<p>Si bebes antitoxina, obtienes un bonificador alquímico +5 en las tiradas de salvación de Fortaleza contra veneno durante 1 hora.</p>`,

  'Everburning torch': `<p>Esta antorcha por lo demás normal tiene un conjuro de llama continua lanzado sobre ella. Una antorcha imperecedera ilumina claramente un radio de 6 metros y proporciona iluminación tenue hasta un radio de 12 metros.</p>`,

  'Holy water': `<p>El agua bendita daña a criaturas no muertas y externos malvados casi como si fuera ácido. Un frasco de agua bendita puede lanzarse como arma de salpicadura. Trata este ataque como un ataque de toque a distancia con un incremento de alcance de 3 metros. Un frasco se rompe si se lanza contra el cuerpo de una criatura corpórea, pero para usarlo contra una criatura incorpórea, debes abrir el frasco y verter el agua bendita sobre el objetivo. Por lo tanto, solo puedes empapar a una criatura incorpórea con agua bendita si estás adyacente a ella. Hacerlo es un ataque de toque a distancia que no provoca ataques de oportunidad.</p>

<p>Un impacto directo de un frasco de agua bendita inflige 2d4 puntos de daño a una criatura no muerta o un externo malvado. Cada criatura de este tipo a 1,5 metros del punto donde impacta el frasco recibe 1 punto de daño de la salpicadura.</p>

<p>Los templos de deidades bondadosas venden agua bendita al costo (sin obtener beneficio).</p>`,

  'Smokestick': `<p>Este palo de madera tratado alquímicamente crea instantáneamente humo espeso y opaco cuando se enciende. El humo llena un cubo de 3 metros (trata el efecto como un conjuro de nube de niebla, excepto que un viento moderado o más fuerte disipa el humo en 1 asalto). El palo se consume después de 1 asalto, y el humo se disipa naturalmente.</p>`,

  'Sunrod': `<p>Esta vara de hierro de 30 cm de largo con punta de oro brilla intensamente cuando se golpea. Ilumina claramente un radio de 9 metros y proporciona iluminación tenue en un radio de 18 metros. Brilla durante 6 horas, después de lo cual la punta de oro se quema y queda inservible.</p>`,

  'Tanglefoot bag': `<p>Cuando lanzas una bolsa enmarañadora a una criatura (como un ataque de toque a distancia con un incremento de alcance de 3 metros), la bolsa se rompe y el pegamento explota, enredando al objetivo y volviéndose duro y resistente al exponerse al aire. Una criatura enredada recibe una penalización de -2 a las tiradas de ataque y una penalización de -4 a la Destreza y debe hacer una tirada de salvación de Reflejos CD 15 o quedar pegada al suelo, sin poder moverse. Incluso con una tirada exitosa, solo puede moverse a media velocidad. Las criaturas Enormes o más grandes no se ven afectadas por una bolsa enmarañadora.</p>

<p>Una criatura que está pegada al suelo puede liberarse haciendo una prueba de Fuerza CD 17 o infligiendo 15 puntos de daño al pegamento con un arma cortante. El pegamento se vuelve quebradizo y frágil después de 2d4 asaltos, agrietándose y perdiendo su efectividad.</p>`,

  'Thunderstone': `<p>Puedes lanzar esta piedra como un ataque a distancia con un incremento de alcance de 6 metros. Cuando golpea una superficie dura (o es golpeada con fuerza), crea un estallido ensordecedor que se trata como un ataque sónico. Cada criatura en un radio de propagación de 3 metros debe hacer una tirada de salvación de Fortaleza CD 15 o quedar ensordecida durante 1 hora. Una criatura ensordecida, además de los efectos obvios, recibe una penalización de -4 a la iniciativa y tiene un 20% de probabilidad de fallar y perder cualquier conjuro con componente verbal que intente lanzar.</p>

<p>Como no necesitas golpear un objetivo específico, puedes simplemente apuntar a un cuadrado particular de 1,5 metros. Trata el cuadrado objetivo como CA 5.</p>`,

  'Tindertwig': `<p>La sustancia alquímica en el extremo de este pequeño palo de madera se enciende cuando se frota contra una superficie áspera. Crear una llama con una ramita de yesca es mucho más rápido que crear una llama con pedernal y acero (o una lupa) y yesca. Encender una antorcha con una ramita de yesca es una acción estándar (en lugar de una acción de asalto completo), y encender cualquier otro fuego con una es al menos una acción estándar.</p>`,

  // === TOOLS AND SKILL KITS ===
  "Alchemist's lab": `<p>Un laboratorio de alquimista siempre tiene la herramienta perfecta para hacer objetos alquímicos, por lo que proporciona un bonificador de circunstancia +2 en las pruebas de Artesanía (alquimia). No tiene relación con los costos relacionados con la habilidad Artesanía (alquimia). Sin este laboratorio, se asume que un personaje con la habilidad Artesanía (alquimia) tiene suficientes herramientas para usar la habilidad pero no suficientes para obtener el bonificador +2 que proporciona el laboratorio.</p>`,

  "Artisan's tools": `<p>Estas herramientas especiales incluyen los artículos necesarios para ejercer cualquier oficio. Sin ellas, tienes que usar herramientas improvisadas (penalización de -2 en las pruebas de Artesanía), si puedes hacer el trabajo en absoluto.</p>`,

  "Artisan's tools, masterwork": `<p>Estas herramientas cumplen el mismo propósito que las herramientas de artesano, pero las herramientas de artesano de obra maestra son las herramientas perfectas para el trabajo, por lo que obtienes un bonificador de circunstancia +2 en las pruebas de Artesanía realizadas con ellas.</p>`,

  "Climber's kit": `<p>Este es el equipo perfecto para escalar y te da un bonificador de circunstancia +2 en las pruebas de Trepar.</p>`,

  'Disguise kit': `<p>El kit es la herramienta perfecta para disfrazarse y proporciona un bonificador de circunstancia +2 en las pruebas de Disfrazarse. Un kit de disfraz se agota después de diez usos.</p>`,

  "Healer's kit": `<p>Es la herramienta perfecta para curar y proporciona un bonificador de circunstancia +2 en las pruebas de Sanar. Un botiquín de sanador se agota después de diez usos.</p>`,

  'Holy symbol, silver': `<p>Un símbolo sagrado canaliza energía positiva. Un clérigo o paladín lo usa como foco para sus conjuros y como herramienta para expulsar muertos vivientes. Cada religión tiene su propio símbolo sagrado.</p>`,

  'Holy symbol, wooden': `<p>Un símbolo sagrado canaliza energía positiva. Un clérigo o paladín lo usa como foco para sus conjuros y como herramienta para expulsar muertos vivientes. Cada religión tiene su propio símbolo sagrado. Un símbolo de madera es más económico pero igual de efectivo.</p>`,

  'Magnifying glass': `<p>Esta lente simple permite ver más de cerca objetos pequeños. También es útil como sustituto del pedernal y acero para encender fuegos. Encender un fuego con una lupa requiere luz tan brillante como la luz del sol para enfocar, yesca para encender, y al menos una acción de asalto completo. Una lupa otorga un bonificador de circunstancia +2 en las pruebas de Tasación que involucren cualquier objeto que sea pequeño o muy detallado.</p>`,

  'Musical instrument, common': `<p>Un instrumento musical común permite tocar música y usar la habilidad Interpretar.</p>`,

  'Musical instrument, masterwork': `<p>Un instrumento de obra maestra otorga un bonificador de circunstancia +2 en las pruebas de Interpretar que involucren su uso.</p>`,

  "Scale, merchant's": `<p>Una balanza otorga un bonificador de circunstancia +2 en las pruebas de Tasación que involucren objetos que se valoran por peso, incluyendo cualquier cosa hecha de metales preciosos.</p>`,

  'Spell component pouch': `<p>Se asume que un lanzador de conjuros con una bolsa de componentes tiene todos los componentes materiales y focos necesarios para lanzar conjuros, excepto aquellos componentes que tienen un costo específico, focos divinos y focos que no cabrían en una bolsa.</p>`,

  "Spellbook, wizard's": `<p>Un libro de conjuros tiene 100 páginas de pergamino, y cada conjuro ocupa una página por nivel de conjuro (una página cada uno para conjuros de nivel 0).</p>`,

  "Thieves' tools": `<p>Este kit contiene las herramientas que necesitas para usar las habilidades Inutilizar Mecanismo y Abrir Cerraduras. Sin estas herramientas, debes improvisar herramientas, y recibes una penalización de circunstancia -2 en las pruebas de Inutilizar Mecanismo y Abrir Cerraduras.</p>`,

  "Thieves' tools, masterwork": `<p>Este kit contiene herramientas adicionales y herramientas de mejor fabricación, que otorgan un bonificador de circunstancia +2 en las pruebas de Inutilizar Mecanismo y Abrir Cerraduras.</p>`,

  'Tool, masterwork': `<p>Este objeto bien hecho es la herramienta perfecta para el trabajo. Otorga un bonificador de circunstancia +2 en una prueba de habilidad relacionada (si la hay). Los bonificadores proporcionados por múltiples objetos de obra maestra usados hacia la misma prueba de habilidad no se acumulan.</p>`,

  'Water clock': `<p>Este artefacto grande y voluminoso da la hora con precisión de media hora por día desde que se configuró por última vez. Requiere una fuente de agua, y debe mantenerse quieto porque marca el tiempo por el flujo regulado de gotas de agua.</p>`,

  // === CLOTHING ===
  "Artisan's outfit": `<p>Este atuendo incluye una camisa con botones, una falda o pantalones con cordón, zapatos, y quizás una gorra o sombrero. También puede incluir un cinturón o un delantal de cuero o tela para llevar herramientas.</p>`,

  "Cleric's vestments": `<p>Estas ropas eclesiásticas son para realizar funciones sacerdotales, no para aventurarse.</p>`,

  'Cold weather outfit': `<p>Un atuendo de clima frío incluye un abrigo de lana, camisa de lino, gorra de lana, capa pesada, pantalones o falda gruesos, y botas. Este atuendo otorga un bonificador de circunstancia +5 en las tiradas de salvación de Fortaleza contra la exposición al clima frío.</p>`,

  "Courtier's outfit": `<p>Este atuendo incluye ropa elegante y a medida en cualquier moda que sea el estilo actual en las cortes de los nobles. Cualquiera que intente influir en nobles o cortesanos mientras usa ropa de calle tendrá dificultades (penalización de -2 en las pruebas de habilidad basadas en Carisma para influir en tales individuos). Si usas este atuendo sin joyas (que cuestan 50 po adicionales), pareces un plebeyo fuera de lugar.</p>`,

  "Entertainer's outfit": `<p>Este conjunto de ropa llamativa, quizás incluso extravagante, es para entretener. Aunque el atuendo parece caprichoso, su diseño práctico te permite hacer volteretas, bailar, caminar por la cuerda floja, o simplemente correr (si la audiencia se pone hostil).</p>`,

  "Explorer's outfit": `<p>Este es un conjunto completo de ropa para alguien que nunca sabe qué esperar. Incluye botas resistentes, calzones de cuero o una falda, un cinturón, una camisa (quizás con un chaleco o chaqueta), guantes y una capa. En lugar de una falda de cuero, se puede usar una sobretúnica de cuero sobre una falda de tela. La ropa tiene muchos bolsillos (especialmente la capa). El atuendo también incluye cualquier artículo extra que puedas necesitar, como una bufanda o un sombrero de ala ancha.</p>`,

  "Monk's outfit": `<p>Este atuendo simple incluye sandalias, pantalones holgados y una camisa holgada, todo unido con fajas. El atuendo está diseñado para darte máxima movilidad, y está hecho de tela de alta calidad. Puedes ocultar armas pequeñas en bolsillos ocultos en los pliegues, y las fajas son lo suficientemente fuertes como para servir como cuerdas cortas.</p>`,

  "Noble's outfit": `<p>Este conjunto de ropa está diseñado específicamente para ser caro y demostrarlo. Metales preciosos y gemas están trabajados en la ropa. Para encajar en la multitud noble, cada aspirante a noble también necesita un anillo de sello y joyas (que valen al menos 100 po).</p>`,

  "Peasant's outfit": `<p>Este conjunto de ropa consiste en una camisa holgada y pantalones anchos, o una camisa holgada y una falda o sobrevestido. Se usan envolturas de tela como zapatos.</p>`,

  'Royal outfit': `<p>Esta es solo la ropa, no el cetro real, corona, anillo y otros accesorios. La ropa real es ostentosa, con gemas, oro, seda y pieles en abundancia.</p>`,

  "Scholar's outfit": `<p>Perfecto para un erudito, este atuendo incluye una túnica, un cinturón, una gorra, zapatos suaves, y posiblemente una capa.</p>`,

  "Traveler's outfit": `<p>Este conjunto de ropa consiste en botas, una falda o calzones de lana, un cinturón resistente, una camisa (quizás con un chaleco o chaqueta), y una capa amplia con capucha.</p>`,

  // === TRANSPORT ===
  'Carriage': `<p>Este vehículo de cuatro ruedas puede transportar hasta cuatro personas dentro de una cabina cerrada, más dos conductores. En general, dos caballos (u otras bestias de carga) lo tiran. Un carruaje viene con el arnés necesario para tirar de él.</p>`,

  'Cart': `<p>Este vehículo de dos ruedas puede ser tirado por un solo caballo (u otra bestia de carga). Viene con un arnés.</p>`,

  'Galley': `<p>Este barco de tres mástiles tiene setenta remos a cada lado y requiere una tripulación total de 200. Una galera tiene 40 metros de largo y 6 metros de ancho, y puede transportar 150 toneladas de carga o 250 soldados. Por 8.000 po más, puede equiparse con un espolón y castillos con plataformas de tiro en proa, popa y en el centro. Este barco no puede hacer viajes por mar y se mantiene en la costa. Se mueve a unos 6,5 km por hora cuando es remado o bajo vela.</p>`,

  'Keelboat': `<p>Este barco de 15 a 23 metros de largo tiene de 4,5 a 6 metros de ancho y tiene unos pocos remos para complementar su único mástil con una vela cuadrada. Tiene una tripulación de ocho a quince y puede transportar de 40 a 50 toneladas de carga o 100 soldados. Puede hacer viajes por mar, así como navegar por ríos (gracias a su fondo plano). Se mueve a unos 1,6 km por hora.</p>`,

  'Longship': `<p>Este barco de 23 metros de largo con cuarenta remos requiere una tripulación total de 50. Tiene un solo mástil y una vela cuadrada, y puede transportar 50 toneladas de carga o 120 soldados. Un drakkar puede hacer viajes por mar. Se mueve a unos 5 km por hora cuando es remado o bajo vela.</p>`,

  'Rowboat': `<p>Este bote de 2,5 a 3,5 metros de largo puede llevar dos o tres pasajeros Medianos. Se mueve a unos 2,5 km por hora.</p>`,

  'Sailing ship': `<p>Este barco más grande y apto para el mar tiene de 23 a 27 metros de largo y 6 metros de ancho y tiene una tripulación de 20. Puede transportar 150 toneladas de carga. Tiene velas cuadradas en sus dos mástiles y puede hacer viajes por mar. Se mueve a unos 3 km por hora.</p>`,

  'Sled': `<p>Este es un vagón sobre patines para moverse a través de la nieve y sobre el hielo. En general, dos caballos (u otras bestias de carga) lo tiran. Un trineo viene con el arnés necesario para tirar de él.</p>`,

  'Wagon': `<p>Este es un vehículo abierto de cuatro ruedas para transportar cargas pesadas. En general, dos caballos (u otras bestias de carga) lo tiran. Un vagón viene con el arnés necesario para tirar de él.</p>`,

  'Warship': `<p>Este barco de 30 metros de largo tiene un solo mástil, aunque los remos también pueden propulsarlo. Tiene una tripulación de 60 a 80 remeros. Este barco puede transportar 160 soldados, pero no por largas distancias, ya que no hay espacio para suministros para mantener a tanta gente. El barco de guerra no puede hacer viajes por mar y se mantiene en la costa. No se usa para carga. Se mueve a unos 4 km por hora cuando es remado o bajo vela.</p>`,

  // === MOUNTS ===
  'Dog, riding': `<p>Este perro Mediano está especialmente entrenado para llevar un jinete humanoide Pequeño. Es valiente en combate como un caballo de guerra. No recibes daño cuando caes de un perro de montar.</p>`,

  'Donkey': `<p>Los burros y mulas son estoicos ante el peligro, resistentes, de paso seguro, y capaces de cargar cargas pesadas a través de vastas distancias. A diferencia de un caballo, un burro o una mula está dispuesto (aunque no ansioso) a entrar en mazmorras y otros lugares extraños o amenazantes.</p>`,

  'Mule': `<p>Los burros y mulas son estoicos ante el peligro, resistentes, de paso seguro, y capaces de cargar cargas pesadas a través de vastas distancias. A diferencia de un caballo, un burro o una mula está dispuesto (aunque no ansioso) a entrar en mazmorras y otros lugares extraños o amenazantes.</p>`,

  'Feed': `<p>Los caballos, burros, mulas y ponis pueden pastar para mantenerse, pero proporcionarles forraje es mucho mejor. Si tienes un perro de montar, debes alimentarlo con al menos algo de carne.</p>`,

  'Bit and bridle': `<p>Un bocado y brida son el equipo básico para controlar una montura. Sin ellos, usar una montura es mucho más difícil.</p>`,

  'Saddlebags': `<p>Las alforjas se atan a una silla y pueden contener hasta 125 kg de equipo dividido en dos bolsas laterales.</p>`,

  'Stabling': `<p>Incluye un espacio techado y limpio para tu montura por un día, típicamente con acceso a agua y heno.</p>`,

  // === SERVICES ===
  'Coach cab': `<p>El precio dado es para un viaje en un carruaje que transporta personas (y carga ligera) entre ciudades. Para un viaje en un taxi que transporta pasajeros dentro de una ciudad, 1 pieza de cobre generalmente te lleva a donde necesites ir.</p>`,

  'Hireling, trained': `<p>La cantidad dada es el salario diario típico para guerreros mercenarios, albañiles, artesanos, escribas, arrieros y otros trabajadores entrenados. Este valor representa un salario mínimo; muchos de estos trabajadores requieren un pago significativamente mayor.</p>`,

  'Hireling, untrained': `<p>La cantidad mostrada es el salario diario típico para trabajadores, porteadores, cocineros, sirvientas y otros trabajadores meniales.</p>`,

  'Messenger': `<p>Esta entrada incluye mensajeros a caballo y corredores. Aquellos dispuestos a llevar un mensaje a un lugar al que iban de todos modos pueden pedir solo la mitad de la cantidad indicada.</p>`,

  'Road or gate toll': `<p>A veces se cobra un peaje para cruzar un camino bien transitado, bien mantenido y bien vigilado para pagar las patrullas en él y su mantenimiento. Ocasionalmente, una gran ciudad amurallada cobra un peaje para entrar o salir (o a veces solo para entrar).</p>`,

  "Ship's passage": `<p>La mayoría de los barcos no se especializan en pasajeros, pero muchos tienen la capacidad de llevar algunos cuando transportan carga. Duplica el costo dado para criaturas más grandes que Medianas o criaturas que de otra manera son difíciles de subir a bordo de un barco.</p>`,

  'Spell, 0-level': `<p>La cantidad indicada es cuánto cuesta que un lanzador de conjuros lance un conjuro para ti. Este costo asume que puedes ir donde el lanzador de conjuros y hacer que lance el conjuro a su conveniencia (generalmente al menos 24 horas después, para que el lanzador tenga tiempo de preparar el conjuro en cuestión).</p>

<p>El costo dado es para un conjuro sin costo de componente material o componente de foco y sin costo de PX. Si el conjuro incluye un componente material, añade el costo de ese componente al costo del conjuro. Si el conjuro tiene un componente de foco (que no sea un foco divino), añade 1/10 del costo de ese foco al costo del conjuro. Si el conjuro tiene un costo de PX, añade 5 po por cada PX perdido.</p>`,

  'Spell, 1st-level': `<p>La cantidad indicada es cuánto cuesta que un lanzador de conjuros lance un conjuro de 1er nivel para ti. El costo base es nivel de lanzador × nivel de conjuro × 10 po.</p>`,

  'Spell, 2nd-level': `<p>La cantidad indicada es cuánto cuesta que un lanzador de conjuros lance un conjuro de 2do nivel para ti. El costo base es nivel de lanzador × nivel de conjuro × 10 po.</p>`,

  'Spell, 3rd-level': `<p>La cantidad indicada es cuánto cuesta que un lanzador de conjuros lance un conjuro de 3er nivel para ti. El costo base es nivel de lanzador × nivel de conjuro × 10 po.</p>`,

  'Spell, 4th-level': `<p>La cantidad indicada es cuánto cuesta que un lanzador de conjuros lance un conjuro de 4to nivel para ti. El costo base es nivel de lanzador × nivel de conjuro × 10 po.</p>`,

  'Spell, 5th-level': `<p>La cantidad indicada es cuánto cuesta que un lanzador de conjuros lance un conjuro de 5to nivel para ti. El costo base es nivel de lanzador × nivel de conjuro × 10 po.</p>`,

  'Spell, 6th-level': `<p>La cantidad indicada es cuánto cuesta que un lanzador de conjuros lance un conjuro de 6to nivel para ti. El costo base es nivel de lanzador × nivel de conjuro × 10 po.</p>`,

  'Spell, 7th-level': `<p>La cantidad indicada es cuánto cuesta que un lanzador de conjuros lance un conjuro de 7mo nivel para ti. El costo base es nivel de lanzador × nivel de conjuro × 10 po.</p>`,

  'Spell, 8th-level': `<p>La cantidad indicada es cuánto cuesta que un lanzador de conjuros lance un conjuro de 8vo nivel para ti. El costo base es nivel de lanzador × nivel de conjuro × 10 po.</p>`,

  'Spell, 9th-level': `<p>La cantidad indicada es cuánto cuesta que un lanzador de conjuros lance un conjuro de 9no nivel para ti. El costo base es nivel de lanzador × nivel de conjuro × 10 po.</p>`,

  // === Additional common items ===
  'Backpack': `<p>Una mochila puede contener hasta 30 kg o 30 litros de equipo. También puedes atar objetos como un saco de dormir o una cuerda enrollada a la parte exterior de una mochila.</p>`,

  'Bedroll': `<p>Un saco de dormir proporciona una superficie acolchada para dormir y algo de aislamiento contra el frío.</p>`,

  'Blanket, winter': `<p>Una manta gruesa de lana proporciona protección contra el frío durante la noche.</p>`,

  'Bucket': `<p>Un cubo de madera simple con asa de cuerda o metal. Puede contener aproximadamente 10 litros.</p>`,

  'Case, map or scroll': `<p>Este tubo de cuero o madera puede contener hasta diez hojas enrolladas de pergamino o cinco hojas enrolladas de papel.</p>`,

  'Chest': `<p>Un cofre de madera con bisagras y cerradura, útil para almacenar objetos valiosos.</p>`,

  'Fishing net': `<p>Una red de pesca de 3 metros cuadrados, útil para capturar peces o enredar criaturas pequeñas.</p>`,

  'Flask': `<p>Este contenedor de cerámica, vidrio o metal tiene un tapón y contiene medio litro de líquido.</p>`,

  'Mirror, small steel': `<p>Un espejo de acero pulido pequeño, útil para ver alrededor de esquinas o señalizar.</p>`,

  'Piton': `<p>Un clavo de hierro con una anilla, útil para escalar o asegurar cuerdas.</p>`,

  'Pole, 10-foot': `<p>Una pértiga de 3 metros de madera, útil para sondear trampas o alcanzar lugares distantes.</p>`,

  'Pot, iron': `<p>Una olla de hierro resistente para cocinar, con capacidad para aproximadamente 4 litros.</p>`,

  'Pouch, belt': `<p>Una bolsa pequeña de cuero que se ata al cinturón, puede contener hasta 2,5 kg.</p>`,

  'Rations, trail': `<p>Las raciones de viaje consisten en comida seca adecuada para viajes prolongados: carne seca, frutas secas, galletas duras y nueces.</p>`,

  'Sack': `<p>Un saco de tela puede contener hasta 30 kg de equipo o 30 litros.</p>`,

  'Sealing wax': `<p>Cera para sellar cartas y documentos con un sello personal.</p>`,

  'Sewing needle': `<p>Una aguja de coser de hierro para reparar ropa y equipo.</p>`,

  'Signal whistle': `<p>Un silbato que puede escucharse claramente a 400 metros de distancia.</p>`,

  'Signet ring': `<p>Un anillo con tu sello personal, usado para sellar documentos con cera.</p>`,

  'Sledge': `<p>Un mazo pesado de dos manos, útil para clavar estacas o romper objetos.</p>`,

  'Soap': `<p>Una barra de jabón hecho de grasa animal y ceniza, suficiente para aproximadamente 50 usos.</p>`,

  'Tent': `<p>Una tienda de lona simple para dos personas, con postes y estacas.</p>`,

  'Waterskin': `<p>Un odre de cuero que puede contener hasta 2 litros de líquido.</p>`,

  'Whetstone': `<p>Una piedra de afilar para mantener el filo de las armas cortantes.</p>`,

  // Holy items
  'Holly and mistletoe': `<p>El acebo y el muérdago sirven como foco divino para druidas. Se requiere para lanzar conjuros druídicos que necesitan un foco divino.</p>`,

  'Unholy symbol, silver': `<p>Un símbolo impío es como un símbolo sagrado excepto que canaliza energía negativa y es usado por clérigos malvados (o por clérigos neutrales que quieren lanzar conjuros malvados o comandar muertos vivientes).</p>`,

  // Light sources
  'Candles': `<p>Un paquete de velas para uso general. Cada vela ilumina tenuemente un radio de 1,5 metros y arde durante 1 hora.</p>`
};

async function updateDescriptions() {
  console.log('=== ACTUALIZANDO DESCRIPCIONES DE GOODS ===\n');

  let updated = 0;
  let notFound = 0;
  const notFoundItems = [];

  for (const [name, description] of Object.entries(itemDescriptions)) {
    // Buscar el item por nombre exacto o similar
    const { data: items, error: searchError } = await supabase
      .from('srd_items')
      .select('id, name')
      .eq('item_category', 'goods')
      .ilike('name', name);

    if (searchError) {
      console.error(`❌ Error buscando ${name}:`, searchError.message);
      continue;
    }

    if (!items || items.length === 0) {
      notFound++;
      notFoundItems.push(name);
      continue;
    }

    // Actualizar el item
    const { error: updateError } = await supabase
      .from('srd_items')
      .update({ description_full: description })
      .eq('id', items[0].id);

    if (updateError) {
      console.error(`❌ Error actualizando ${name}:`, updateError.message);
    } else {
      console.log(`✅ ${items[0].name}`);
      updated++;
    }
  }

  console.log(`\n=== RESUMEN ===`);
  console.log(`Actualizados: ${updated}`);
  console.log(`No encontrados: ${notFound}`);

  if (notFoundItems.length > 0) {
    console.log('\nItems no encontrados en la BD:');
    notFoundItems.forEach(item => console.log(`  - ${item}`));
  }
}

updateDescriptions();
