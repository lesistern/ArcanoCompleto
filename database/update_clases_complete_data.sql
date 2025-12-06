-- Migration: Update clases table with complete class data
-- This migration updates the clases table to include all necessary fields
-- and populates them with data from classes_translated.json

-- First, alter column types to support new data formats
-- Change tiene_magia from BOOLEAN to TEXT to support "si"/"no"/"solo variantes"
ALTER TABLE clases 
ALTER COLUMN tiene_magia TYPE TEXT;

-- Change puntos_hab_nivel1 to TEXT to store formula (e.g., "(4 + Int mod) x 4")
ALTER TABLE clases 
ALTER COLUMN puntos_hab_nivel1 TYPE TEXT;

-- Update Druida (id_clase = 1)
UPDATE clases SET
    puntos_hab_nivel1 = '(4 + Int mod) x 4',
    puntos_hab_nivel = 4,
    tiene_magia = 'si',
    tipo_magia = 'Divina',
    estilo_conjuros = 'Preparados',
    regla_alineamiento = 'Debe ser neutral en al menos un eje (NB, LN, N, CN, NM)',
    tendencia_alineamiento = 'Cualquiera neutral',
    tipo_poder_principal = 'Poder divino-natural',
    descripcion_poder = 'Su poder proviene de la naturaleza misma o de deidades vinculadas a ella. El druida obtiene su magia al unificarse con la energía natural del mundo. No gobierna la naturaleza, sino que se vuelve parte de ella. Su fe surge de los ciclos naturales y del equilibrio entre vida y muerte.',
    rol_party = 'Apoyo versátil con magia divina, control del terreno y combate gracias a la forma salvaje. Combina curación, control ambiental y hechizos ofensivos orientados a animales y fuerzas naturales.',
    motivacion_aventura = 'Buscan conocimiento sobre la naturaleza y el poder que surge de ella. Viajan para aprender sobre ecosistemas desconocidos, fortalecer su vínculo con el mundo natural y actuar donde su influencia sea necesaria. Pueden ser enviados por líderes de su orden o reaccionar ante peligros que amenazan bosques, montañas, criaturas sagradas o ciclos ecológicos.',
    origen_social = 'Provienen de sociedades ocultas o comunidades cercanas a la naturaleza. Pertenecen a círculos con jerarquías secretas, unidos por rituales sagrados e iniciaciones que marcan su paso a la vida espiritual natural.',
    tipo_organizacion = 'Círculos druídicos con jerarquías secretas basadas en iniciación. A menudo deben obedecer a druidas de mayor rango, quienes pueden encomendarles misiones o exigir favores a cambio de conocimiento o protección.',
    enfoque_religioso = 'Reverencian la naturaleza como fuerza espiritual o a deidades vinculadas a ella. Su devoción principal suele dirigirse a la vida salvaje misma. Su espiritualidad busca equilibrio, no adoración directa.',
    deidades_tipicas = 'Obad-Hai, Ehlonna.',
    razas_comunes = 'Elfo, Gnomo, Humano, Semielfo, Humanos salvajes.',
    resumen_clase = 'Protector de los ciclos de la naturaleza que obtiene su poder de la vida salvaje y de la armonía con el mundo natural, utilizando su magia para conservar el equilibrio y combatir lo antinatural. Consideran profundamente antinaturales a las aberraciones y a los muertos vivientes, a los que enfrentan con dureza.'
WHERE id_clase = 1;

-- Update Guerrero (id_clase = 2)
UPDATE clases SET
    puntos_hab_nivel1 = '(2 + Int mod) x 4',
    puntos_hab_nivel = 2,
    tiene_magia = 'no',
    tipo_magia = NULL,
    estilo_conjuros = NULL,
    regla_alineamiento = 'Cualquiera',
    tendencia_alineamiento = 'Cualquiera',
    tipo_poder_principal = 'Dotes de Combate',
    descripcion_poder = 'Maestría en armas y armaduras, con dotes adicionales para especializarse en maniobras de combate.',
    rol_party = 'Combatiente de primera línea, protector, dañador físico.',
    motivacion_aventura = 'Gloria, riqueza, deber, desafío, servicio a un señor o causa.',
    origen_social = 'Ejércitos, milicias, academias de guerra, autodidactas, mercenarios.',
    tipo_organizacion = 'Unidades militares, compañías mercenarias, ninguna.',
    enfoque_religioso = 'Dioses de la guerra, valor o fuerza (Heironeous, Kord, Hextor).',
    deidades_tipicas = 'Heironeous, Kord, St. Cuthbert, Hextor, Erythnul.',
    razas_comunes = 'Humanos, Enanos, Orcos, Hobgoblins.',
    resumen_clase = 'El caballero en busca de aventuras, el señor conquistador, el campeón del rey, el soldado de infantería de élite, el mercenario endurecido y el rey bandido: todos son guerreros. Los guerreros pueden ser defensores incondicionales de los necesitados, crueles merodeadores o valientes aventureros. Algunos están entre las mejores almas de la tierra, dispuestos a enfrentar la muerte por el bien mayor.'
WHERE id_clase = 2;

-- Update Monje (id_clase = 3)
UPDATE clases SET
    puntos_hab_nivel1 = '(4 + Int mod) x 4',
    puntos_hab_nivel = 4,
    tiene_magia = 'no',
    tipo_magia = NULL,
    estilo_conjuros = NULL,
    regla_alineamiento = 'Cualquiera legal',
    tendencia_alineamiento = 'Legal',
    tipo_poder_principal = 'Ki y Combate Desarmado',
    descripcion_poder = 'Usa energía Ki para realizar hazañas sobrenaturales y combate sin armas ni armadura con gran velocidad.',
    rol_party = 'Combatiente móvil, explorador sigiloso, hostigador.',
    motivacion_aventura = 'Perfección personal, prueba de habilidades, trascendencia.',
    origen_social = 'Monasterios aislados, escuelas de artes marciales.',
    tipo_organizacion = 'Órdenes monásticas estrictas.',
    enfoque_religioso = 'Filosofía personal, meditación, dioses de la ley (Heironeous, St. Cuthbert, Hextor).',
    deidades_tipicas = 'Heironeous, St. Cuthbert, Hextor.',
    razas_comunes = 'Humanos, Semielfos, Semiorcos.',
    resumen_clase = 'Salpicados por el paisaje hay monasterios: pequeños claustros amurallados habitados por monjes que persiguen la perfección personal a través de la acción y la contemplación. Se entrenan para ser guerreros versátiles expertos en luchar sin armas ni armaduras. Los habitantes de monasterios dirigidos por buenos maestros sirven como protectores de la gente.'
WHERE id_clase = 3;

-- Update Bárbaro (id_clase = 4)
UPDATE clases SET
    puntos_hab_nivel1 = '(4 + Int mod) x 4',
    puntos_hab_nivel = 4,
    tiene_magia = 'no',
    tipo_magia = NULL,
    estilo_conjuros = NULL,
    regla_alineamiento = 'Cualquiera no legal',
    tendencia_alineamiento = 'Caótico',
    tipo_poder_principal = 'Furia',
    descripcion_poder = 'Entra en una furia berserker que aumenta fuerza y constitución temporalmente.',
    rol_party = 'Combatiente de primera línea, tanque, dañador.',
    motivacion_aventura = 'Prueba de fuerza, saqueo, venganza, defensa de la tribu.',
    origen_social = 'Tribus salvajes, tierras indómitas.',
    tipo_organizacion = 'Tribus, clanes.',
    enfoque_religioso = 'Espíritus animales, ancestros, Kord, Erythnul.',
    deidades_tipicas = 'Kord, Erythnul, Obad-Hai.',
    razas_comunes = 'Humanos, Semiorcos, Enanos, Gnomos (raro).',
    resumen_clase = 'Desde los helados páramos del norte y las infernales junglas del sur llegan valientes, incluso imprudentes, guerreros. Las personas civilizadas los llaman bárbaros o berserkers y los sospechan de caos, impiedad y atrocidades. Estos ''bárbaros'', sin embargo, han demostrado su valía a sus aliados una y otra vez.'
WHERE id_clase = 4;

-- Update Bardo (id_clase = 5)
UPDATE clases SET
    puntos_hab_nivel1 = '(6 + Int mod) x 4',
    puntos_hab_nivel = 6,
    tiene_magia = 'si',
    tipo_magia = 'Arcana',
    estilo_conjuros = 'Espontáneos',
    regla_alineamiento = 'Cualquiera no legal',
    tendencia_alineamiento = 'Caótico',
    tipo_poder_principal = 'Música de Bardo',
    descripcion_poder = 'Usa música para inspirar aliados, fascinar enemigos y realizar magia.',
    rol_party = 'Apoyo, diplomático, conocedor, sanador secundario.',
    motivacion_aventura = 'Historias, conocimiento, fama, dinero.',
    origen_social = 'Artistas itinerantes, cortes nobles, escuelas de bardos.',
    tipo_organizacion = 'Colegios de bardos, ninguna.',
    enfoque_religioso = 'Farlanghn, Olidammara, Pelor.',
    deidades_tipicas = 'Farlanghn, Olidammara, Pelor.',
    razas_comunes = 'Humanos, Elfos, Gnomos, Semielfos, Halflings.',
    resumen_clase = 'Se dice que la música tiene un encanto especial, y el bardo demuestra que ese dicho es cierto. Deambular por el mundo, reunir conocimientos, contar historias, hacer magia con su música y vivir de la gratitud de su audiencia: tal es la vida de un bardo. Cuando el azar o la oportunidad los arrastran a un conflicto, los bardos sirven como diplomáticos, negociadores, exploradores y espías.'
WHERE id_clase = 5;

-- Update Clérigo (id_clase = 6)
UPDATE clases SET
    puntos_hab_nivel1 = '(2 + Int mod) x 4',
    puntos_hab_nivel = 2,
    tiene_magia = 'si',
    tipo_magia = 'Divina',
    estilo_conjuros = 'Preparados',
    regla_alineamiento = 'A un paso de la deidad (no neutral verdadero a menos que la deidad lo sea)',
    tendencia_alineamiento = 'Según deidad',
    tipo_poder_principal = 'Expulsar/Reprender No-muertos',
    descripcion_poder = 'Canaliza energía divina para afectar a no-muertos y lanzar conjuros.',
    rol_party = 'Sanador principal, combatiente de apoyo, lanzador de conjuros divino.',
    motivacion_aventura = 'Servicio divino, cruzada, proselitismo, recuperación de reliquias.',
    origen_social = 'Templos, monasterios, órdenes religiosas.',
    tipo_organizacion = 'Iglesias, jerarquías eclesiásticas.',
    enfoque_religioso = 'Cualquier deidad.',
    deidades_tipicas = 'Cualquiera.',
    razas_comunes = 'Todas.',
    resumen_clase = 'Los actos de los dioses son la voluntad del clérigo. Un clérigo es un campeón de su dios, armado con símbolos sagrados y armas divinas. Algunos clérigos se dedican a difundir la palabra de su deidad, mientras que otros hacen cumplir la voluntad de su dios con la fuerza de las armas.'
WHERE id_clase = 6;

-- Update Paladín (id_clase = 7)
UPDATE clases SET
    puntos_hab_nivel1 = '(2 + Int mod) x 4',
    puntos_hab_nivel = 2,
    tiene_magia = 'si',
    tipo_magia = 'Divina',
    estilo_conjuros = 'Preparados',
    regla_alineamiento = 'Legal Bueno',
    tendencia_alineamiento = 'Legal Bueno',
    tipo_poder_principal = 'Imposición de manos y Castigar el Mal',
    descripcion_poder = 'Combate el mal con poder divino, sana y protege.',
    rol_party = 'Combatiente sagrado, protector, sanador menor.',
    motivacion_aventura = 'Luchar contra el mal, proteger a los inocentes, búsqueda sagrada.',
    origen_social = 'Órdenes de caballería, nobleza, elegidos divinos.',
    tipo_organizacion = 'Órdenes de paladines, iglesias.',
    enfoque_religioso = 'Heironeous, Pelor.',
    deidades_tipicas = 'Heironeous, Pelor.',
    razas_comunes = 'Humanos, Aasimar.',
    resumen_clase = 'La compasión para perseguir el bien, la voluntad para defender la ley y el poder para derrotar al mal: estas son las tres armas del paladín. Pocos tienen la pureza y la devoción necesarias para caminar por la senda del paladín, pero esos pocos son recompensados con el poder de proteger, sanar y castigar.'
WHERE id_clase = 7;

-- Update Explorador (id_clase = 8)
UPDATE clases SET
    puntos_hab_nivel1 = '(6 + Int mod) x 4',
    puntos_hab_nivel = 6,
    tiene_magia = 'si',
    tipo_magia = 'Divina',
    estilo_conjuros = 'Preparados',
    regla_alineamiento = 'Cualquiera',
    tendencia_alineamiento = 'Cualquiera',
    tipo_poder_principal = 'Enemigo Predilecto',
    descripcion_poder = 'Bonificaciones contra tipos específicos de criaturas y maestría en combate con dos armas o a distancia.',
    rol_party = 'Explorador, combatiente a distancia o con dos armas, rastreador.',
    motivacion_aventura = 'Caza, protección de la naturaleza, guía, venganza.',
    origen_social = 'Cazadores, guías, ermitaños.',
    tipo_organizacion = 'Cónclaves de exploradores, ninguna.',
    enfoque_religioso = 'Ehlonna, Obad-Hai.',
    deidades_tipicas = 'Ehlonna, Obad-Hai.',
    razas_comunes = 'Elfos, Humanos, Semielfos, Gnolls.',
    resumen_clase = 'Los bosques albergan criaturas feroces y astutas, como osos sangrientos y bestias desplazadoras. Pero más astuto y feroz que estos monstruos es el explorador, un hábil cazador y acechador. Él conoce los bosques como si fueran su hogar (de hecho, lo son) y conoce a su presa con un detalle mortal.'
WHERE id_clase = 8;

-- Update Pícaro (id_clase = 9)
UPDATE clases SET
    puntos_hab_nivel1 = '(8 + Int mod) x 4',
    puntos_hab_nivel = 8,
    tiene_magia = 'no',
    tipo_magia = NULL,
    estilo_conjuros = NULL,
    regla_alineamiento = 'Cualquiera',
    tendencia_alineamiento = 'Cualquiera',
    tipo_poder_principal = 'Ataque Furtivo',
    descripcion_poder = 'Inflige daño extra a enemigos distraídos o flanqueados, experto en habilidades.',
    rol_party = 'Especialista en habilidades, explorador, dañador furtivo.',
    motivacion_aventura = 'Riqueza, emoción, desafío, necesidad.',
    origen_social = 'Calles, gremios de ladrones, espías.',
    tipo_organizacion = 'Gremios de ladrones, redes de espionaje.',
    enfoque_religioso = 'Olidammara, ninguna.',
    deidades_tipicas = 'Olidammara.',
    razas_comunes = 'Halflings, Elfos, Humanos, Gnomos.',
    resumen_clase = 'Los pícaros tienen poco en común entre sí. Algunos son ladrones furtivos. Otros son embaucadores de lengua de plata. Otros son exploradores, infiltrados, espías, diplomáticos o matones. Lo único que tienen en común es que son versátiles, adaptables y capaces de sacar lo mejor de cualquier situación.'
WHERE id_clase = 9;

-- Update Hechicero (id_clase = 10)
UPDATE clases SET
    puntos_hab_nivel1 = '(2 + Int mod) x 4',
    puntos_hab_nivel = 2,
    tiene_magia = 'si',
    tipo_magia = 'Arcana',
    estilo_conjuros = 'Espontáneos',
    regla_alineamiento = 'Cualquiera',
    tendencia_alineamiento = 'Caótico',
    tipo_poder_principal = 'Magia Innata',
    descripcion_poder = 'Lanza conjuros arcanos sin preparación, basado en carisma.',
    rol_party = 'Lanzador de conjuros ofensivo, controlador, cara del grupo.',
    motivacion_aventura = 'Poder, autodescubrimiento, linaje.',
    origen_social = 'Linajes mágicos, accidentes mágicos.',
    tipo_organizacion = 'Ninguna, cabalas sueltas.',
    enfoque_religioso = 'Boccob, Wee Jas, o ninguna.',
    deidades_tipicas = 'Boccob, Wee Jas.',
    razas_comunes = 'Humanos, Kobolds, Semielfos.',
    resumen_clase = 'Los hechiceros crean magia de la misma manera que un poeta crea poemas, con talento innato perfeccionado por la práctica. No tienen libros, ni mentores, ni teorías, solo poder puro que dirigen a voluntad. Algunos hechiceros afirman que la sangre de los dragones corre por sus venas.'
WHERE id_clase = 10;

-- Update Mago (id_clase = 11)
UPDATE clases SET
    puntos_hab_nivel1 = '(2 + Int mod) x 4',
    puntos_hab_nivel = 2,
    tiene_magia = 'si',
    tipo_magia = 'Arcana',
    estilo_conjuros = 'Preparados',
    regla_alineamiento = 'Cualquiera',
    tendencia_alineamiento = 'Legal',
    tipo_poder_principal = 'Libro de Conjuros',
    descripcion_poder = 'Lanza conjuros arcanos preparados desde un libro, gran versatilidad.',
    rol_party = 'Lanzador de conjuros utilitario y ofensivo, sabio, controlador.',
    motivacion_aventura = 'Conocimiento, poder, investigación mágica.',
    origen_social = 'Academias de magia, aprendices.',
    tipo_organizacion = 'Gremios de magos, academias.',
    enfoque_religioso = 'Boccob, Wee Jas.',
    deidades_tipicas = 'Boccob, Wee Jas.',
    razas_comunes = 'Elfos, Humanos, Gnomos.',
    resumen_clase = 'Unas pocas palabras ininteligibles y gestos fugaces conllevan más poder que un hacha de batalla, cuando son las palabras y gestos de un mago. Estos actos simples hacen que la magia parezca fácil, pero solo insinúan el tiempo que el mago debe pasar estudiando su libro de hechizos preparando cada conjuro.'
WHERE id_clase = 11;
