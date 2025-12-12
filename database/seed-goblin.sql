-- Asegurar que la tabla monsters existe con el esquema correcto para soportar el sistema de avance
-- Nota: Usamos JSONB para campos complejos para permitir cálculos precisos en el frontend

CREATE TABLE IF NOT EXISTS monsters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  creature_type TEXT NOT NULL,
  creature_subtypes TEXT[],
  size TEXT NOT NULL,
  hit_dice TEXT NOT NULL, -- '4d8+12'
  initiative INTEGER,
  speed JSONB, -- {"base": 30}
  armor_class JSONB NOT NULL, -- {"total": 15, "breakdown": "..."}
  base_attack_bonus INTEGER,
  grapple_bonus INTEGER,
  attacks JSONB, -- [{"name": "...", "damage": "..."}]
  full_attack TEXT,
  space TEXT,
  reach TEXT,
  special_attacks TEXT[],
  special_qualities TEXT[],
  saves JSONB, -- {"fort": 4, "ref": 3, "will": 1}
  abilities JSONB, -- {"str": 15, "dex": 12, "con": 13, "int": 10, "wis": 11, "cha": 8}
  skills JSONB, -- [{"name": "...", "bonus": 5}]
  feats TEXT[],
  environment TEXT,
  organization TEXT,
  challenge_rating TEXT, -- '1', '1/2', '1/4'
  treasure TEXT,
  alignment TEXT,
  advancement TEXT,
  level_adjustment INTEGER DEFAULT 0,
  description TEXT NOT NULL,
  source_book TEXT DEFAULT 'Monster Manual',
  source_page INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_monsters_slug ON monsters(slug);
CREATE INDEX IF NOT EXISTS idx_monsters_type ON monsters(creature_type);
CREATE INDEX IF NOT EXISTS idx_monsters_cr ON monsters(challenge_rating);

-- Insertar o Actualizar Goblin
INSERT INTO monsters (
    slug, name, creature_type, creature_subtypes, size, hit_dice, hp, 
    initiative, speed, armor_class, base_attack_bonus, grapple_bonus, 
    attacks, full_attack, special_qualities, 
    abilities, saves, skills, feats, 
    environment, organization, challenge_rating, treasure, alignment, 
    advancement, level_adjustment, description, source_book
) VALUES (
    'goblin', 
    'Goblin', 
    'humanoide', 
    ARRAY['goblinoide'], 
    'Small', 
    '1d8+1', 
    5, 
    1, 
    '{"base": 30}'::jsonb, 
    '{"total": 15, "touch": 12, "flat_footed": 14, "breakdown": "10 +1 tamaño +1 Des +2 armadura de cuero +1 escudo ligero"}'::jsonb, 
    1, 
    -3, 
    '[
      {"name": "Maza de armas", "type": "melee", "bonus": 2, "damage": "1d6", "critical": "×2"},
      {"name": "Jabalina", "type": "ranged", "bonus": 3, "damage": "1d4", "critical": "×2", "range": 30}
    ]'::jsonb, 
    'Maza de armas +2 cuerpo a cuerpo (1d6) o jabalina +3 a distancia (1d4)', 
    ARRAY['Visión en la oscuridad 60 pies'], 
    '{"str": 11, "dex": 13, "con": 12, "int": 10, "wis": 9, "cha": 6}'::jsonb, 
    '{"fort": 3, "ref": 1, "will": -1}'::jsonb, 
    '[
      {"name": "Esconderse", "bonus": 5},
      {"name": "Escuchar", "bonus": 2},
      {"name": "Moverse Sigilosamente", "bonus": 5},
      {"name": "Montar", "bonus": 4},
      {"name": "Avistar", "bonus": 2}
    ]'::jsonb, 
    ARRAY['Alerta'], 
    'Llanuras templadas', 
    'Pandilla (4-9), banda (10-100 más 100% no combatientes más 1 sargento de nivel 3 por cada 20 adultos y 1 líder de nivel 4-6), partida de guerra (10-24 con monturas wargo), o tribu (40-400 más 100% no combatientes más 1 sargento de nivel 3 por cada 20 adultos, 1 o 2 tenientes de nivel 4 o 5, 1 líder de nivel 6-8, 10-24 wargos montados, y 2-4 lobos terribles)', 
    '1/3', 
    'Estándar', 
    'Usualmente neutral malvado', 
    'Por clase de personaje', 
    0, 
    E'Este pequeño humanoide tiene la cara plana, una nariz ancha, orejas puntiagudas, boca ancha y colmillos pequeños y afilados. Camina erguido, pero sus brazos cuelgan casi hasta las rodillas.\n\nLos goblins son humanoides pequeños y astutos que disfrutan atormentando a otras criaturas. Son cobardes y prefieren superar en número a sus enemigos.\n\n### COMBATE\nSer intimidados por criaturas más grandes y fuertes ha enseñado a los goblins a explotar las pocas ventajas que tienen: superioridad numérica e ingenio malicioso. El concepto de una pelea justa no tiene sentido en su sociedad. Prefieren emboscadas, probabilidades abrumadoras, trucos sucios y cualquier otra ventaja que puedan idear.\n\nLos goblins tienen una pobre comprensión de la estrategia y son cobardes por naturaleza, tendiendo a huir del campo si la batalla se vuelve en su contra. Con una supervisión adecuada, sin embargo, pueden implementar planes razonablemente complejos, y en tales circunstancias sus números pueden ser una ventaja mortal.\n\n**Habilidades:** Los goblins tienen un bonificador racial de +4 en pruebas de Moverse Sigilosamente y Montar. La caballería goblin (montada en wargos) usualmente selecciona la dote Combate Montado en lugar de Alerta, lo cual reduce sus modificadores de Avistar y Escuchar de +3 a +1.\n\n**Desafío:** Los goblins con niveles en clases de PNJ tienen un VD igual a su nivel de personaje -2.\n\n### SOCIEDAD GOBLIN\nLos goblins son tribales. Sus líderes son generalmente los más grandes, fuertes, o a veces los más inteligentes del grupo. Casi no tienen concepto de privacidad, viviendo y durmiendo en grandes áreas comunes; solo los líderes viven separados. Los goblins sobreviven asaltando y robando (preferiblemente de aquellos que no pueden defenderse fácilmente), colándose en guaridas, aldeas e incluso pueblos por la noche para tomar lo que puedan. No están por encima de asaltar a viajeros en el camino o en bosques y despojarlos de todas sus posesiones, hasta e incluyendo la ropa que llevan puesta. A veces capturan esclavos para realizar trabajos forzados en la guarida o campamento.\n\nEstas criaturas viven donde sea que puedan, desde cuevas húmedas hasta ruinas lúgubres, y sus guaridas siempre son malolientes y sucias debido a una falta total de saneamiento. Los goblins a menudo se asientan cerca de áreas civilizadas para saquear comida, ganado, herramientas, armas y suministros. Una vez que una tribu ha despojado un lugar, simplemente empaca y se mueve a la siguiente área conveniente. Hobgoblins y osgos a veces se encuentran en compañía de tribus goblin, usualmente como líderes intimidantes. Algunas tribus goblin forman alianzas con wargos, que los llevan al combate.\n\nLas bandas y tribus goblin tienen jóvenes no combatientes iguales en número a los adultos.\n\nLa deidad principal goblin es Maglubiyet, quien insta a sus adoradores a expandir sus números y abrumar a sus competidores.\n\n### GOBLINS COMO PERSONAJES\nLos líderes goblin tienden a ser pícaros o guerreros/pícaros. Los clérigos goblin adoran a Maglubiyet. Un clérigo goblin tiene acceso a dos de los siguientes dominios: Caos, Mal, o Superchería. La mayoría de los lanzadores de conjuros goblin son adeptos. Los adeptos goblin prefieren conjuros que engañen o confundan a los enemigos.\n\nRasgos raciales de los personajes goblin:\n–2 Fuerza, +2 Destreza, –2 Carisma.\nTamaño Pequeño: Bonificador de +1 a la Clase de Armadura, +1 a las tiradas de ataque, +4 a las pruebas de Esconderse, penalizador de –4 a las pruebas de presa, límites de carga y levantamiento son 3/4 de los de personajes Medianos.\nVelocidad base en tierra de 30 pies.\nVisión en la oscuridad hasta 60 pies.\nBonificador racial de +4 en pruebas de Moverse Sigilosamente y Montar.\nIdiomas Automáticos: Común, Goblin. Idiomas Adicionales: Dracónico, Élfico, Gigante, Gnoll, Orco.\nClase Predilecta: Pícaro.\nEl guerrero goblin presentado aquí tenía las siguientes puntuaciones de característica antes de los ajustes raciales: Fue 13, Des 11, Con 12, Int 10, Sab 9, Car 8.', 
    'Manual de Monstruos'
)
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    creature_type = EXCLUDED.creature_type,
    creature_subtypes = EXCLUDED.creature_subtypes,
    size = EXCLUDED.size,
    hit_dice = EXCLUDED.hit_dice,
    hp = EXCLUDED.hp,
    initiative = EXCLUDED.initiative,
    speed = EXCLUDED.speed,
    armor_class = EXCLUDED.armor_class,
    base_attack_bonus = EXCLUDED.base_attack_bonus,
    grapple_bonus = EXCLUDED.grapple_bonus,
    attacks = EXCLUDED.attacks,
    full_attack = EXCLUDED.full_attack,
    special_qualities = EXCLUDED.special_qualities,
    abilities = EXCLUDED.abilities,
    saves = EXCLUDED.saves,
    skills = EXCLUDED.skills,
    feats = EXCLUDED.feats,
    environment = EXCLUDED.environment,
    organization = EXCLUDED.organization,
    challenge_rating = EXCLUDED.challenge_rating,
    treasure = EXCLUDED.treasure,
    alignment = EXCLUDED.alignment,
    advancement = EXCLUDED.advancement,
    level_adjustment = EXCLUDED.level_adjustment,
    description = EXCLUDED.description,
    source_book = EXCLUDED.source_book,
    updated_at = NOW()
;
