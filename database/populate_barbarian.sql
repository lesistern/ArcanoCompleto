-- ============================================================================
-- Población de Clases Base desde Player's Handbook
-- ============================================================================
-- Fecha: 2025-11-27
-- Descripción: Inserta las 11 clases base de D&D 3.5 con información completa
--              en inglés y español
-- ============================================================================

-- Primero, asegurarse de que las tablas existen
-- (ejecutar 20251127_class_tables.sql primero si es necesario)

-- ============================================================================
-- BARBARIAN (BÁRBARO)
-- ============================================================================

-- Información básica de la clase
INSERT INTO classes (
  slug, titulo, name_en, name_es, hit_die, dg, 
  skill_points_per_level, skill_points_per_level_base, skill_points_first_level_base,
  bab_progression, bab, fort_save, fort, ref_save, ref, will_save, will,
  primary_ability_en, primary_ability_es,
  alignment_restriction_en, alignment_restriction_es,
  description_en, description_es,
  summary_en, summary_es,
  source_en, source_es
) VALUES (
  'barbarian',
  'Bárbaro',
  'Barbarian',
  'Bárbaro',
  12, 12, -- hit_die / dg
  4, 4, 16, -- skill points: base, base, first level (base * 4)
  'good', 'bueno', -- bab_progression / bab
  'good', 'bueno', -- fort_save / fort
  'poor', 'pobre', -- ref_save / ref
  'poor', 'pobre', -- will_save / will
  'Strength',
  'Fuerza',
  'Any nonlawful',
  'Cualquiera no legal',
  'From the frozen wastes of the north and the hellish jungles of the south come brave, even reckless, warriors. Civilized people call them barbarians or berserkers and suspect them of mayhem, impiety, and atrocities. These "barbarians," however, have proven their mettle and their value to those who would be their allies. To enemies who underestimated them, they have proved their cunning, resourcefulness, persistence, and mercilessness.',
  'Desde los páramos helados del norte y las junglas infernales del sur vienen guerreros valientes, incluso temerarios. La gente civilizada los llama bárbaros o berserkers y sospecha de ellos por su caos, impiedad y atrocidades. Sin embargo, estos "bárbaros" han demostrado su temple y su valor para aquellos que serían sus aliados. A los enemigos que los subestimaron, han demostrado su astucia, ingenio, persistencia y falta de piedad.',
  'A barbarian''s typical primary role in a group of adventurers is as a front-line combat specialist.',
  'El rol principal típico de un bárbaro en un grupo de aventureros es como especialista de combate en primera línea.',
  'Player''s Handbook v3.5',
  'Manual del Jugador v3.5'
) ON CONFLICT (slug) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  name_en = EXCLUDED.name_en,
  name_es = EXCLUDED.name_es,
  hit_die = EXCLUDED.hit_die,
  dg = EXCLUDED.dg,
  skill_points_per_level = EXCLUDED.skill_points_per_level,
  skill_points_per_level_base = EXCLUDED.skill_points_per_level_base,
  skill_points_first_level_base = EXCLUDED.skill_points_first_level_base,
  bab_progression = EXCLUDED.bab_progression,
  bab = EXCLUDED.bab,
  fort_save = EXCLUDED.fort_save,
  fort = EXCLUDED.fort,
  ref_save = EXCLUDED.ref_save,
  ref = EXCLUDED.ref,
  will_save = EXCLUDED.will_save,
  will = EXCLUDED.will,
  primary_ability_en = EXCLUDED.primary_ability_en,
  primary_ability_es = EXCLUDED.primary_ability_es,
  alignment_restriction_en = EXCLUDED.alignment_restriction_en,
  alignment_restriction_es = EXCLUDED.alignment_restriction_es,
  description_en = EXCLUDED.description_en,
  description_es = EXCLUDED.description_es,
  summary_en = EXCLUDED.summary_en,
  summary_es = EXCLUDED.summary_es,
  source_en = EXCLUDED.source_en,
  source_es = EXCLUDED.source_es;

-- Class Skills para Barbarian
UPDATE classes SET class_skills_en = ARRAY[
  'Climb', 'Craft', 'Handle Animal', 'Intimidate', 'Jump', 'Listen', 'Ride', 'Survival', 'Swim'
], class_skills_es = ARRAY[
  'Trepar', 'Artesanía', 'Trato con animales', 'Intimidar', 'Saltar', 'Escuchar', 'Montar', 'Supervivencia', 'Nadar'
] WHERE slug = 'barbarian';

-- Weapon and Armor Proficiencies
UPDATE classes SET 
  weapon_proficiencies_en = 'All simple and martial weapons',
  weapon_proficiencies_es = 'Todas las armas simples y marciales',
  armor_proficiencies_en = 'Light armor, medium armor, and shields (except tower shields)',
  armor_proficiencies_es = 'Armadura ligera, armadura media y escudos (excepto escudos torre)'
WHERE slug = 'barbarian';

-- ============================================================================
-- Class Progression para Barbarian (niveles 1-20)
-- ============================================================================

-- Insertar progresión completa
INSERT INTO class_progression (
  class_slug, level, 
  bab, base_attack_bonus, 
  fort_save, ref_save, will_save, 
  special_en, special_es, special_abilities
) VALUES
('barbarian', 1, '+1', '+1', 2, 0, 0, ARRAY['Fast movement', 'Illiteracy', 'Rage 1/day'], ARRAY['Movimiento rápido', 'Analfabetismo', 'Ira 1/día'], 'Movimiento rápido, Analfabetismo, Ira 1/día'),
('barbarian', 2, '+2', '+2', 3, 0, 0, ARRAY['Uncanny dodge'], ARRAY['Esquiva asombrosa'], 'Esquiva asombrosa'),
('barbarian', 3, '+3', '+3', 3, 1, 1, ARRAY['Trap sense +1'], ARRAY['Sentido de las trampas +1'], 'Sentido de las trampas +1'),
('barbarian', 4, '+4', '+4', 4, 1, 1, ARRAY['Rage 2/day'], ARRAY['Ira 2/día'], 'Ira 2/día'),
('barbarian', 5, '+5', '+5', 4, 1, 1, ARRAY['Improved uncanny dodge'], ARRAY['Esquiva asombrosa mejorada'], 'Esquiva asombrosa mejorada'),
('barbarian', 6, '+6/+1', '+6/+1', 5, 2, 2, ARRAY['Trap sense +2'], ARRAY['Sentido de las trampas +2'], 'Sentido de las trampas +2'),
('barbarian', 7, '+7/+2', '+7/+2', 5, 2, 2, ARRAY['Damage reduction 1/—'], ARRAY['Reducción de daño 1/—'], 'Reducción de daño 1/—'),
('barbarian', 8, '+8/+3', '+8/+3', 6, 2, 2, ARRAY['Rage 3/day'], ARRAY['Ira 3/día'], 'Ira 3/día'),
('barbarian', 9, '+9/+4', '+9/+4', 6, 3, 3, ARRAY['Trap sense +3'], ARRAY['Sentido de las trampas +3'], 'Sentido de las trampas +3'),
('barbarian', 10, '+10/+5', '+10/+5', 7, 3, 3, ARRAY['Damage reduction 2/—'], ARRAY['Reducción de daño 2/—'], 'Reducción de daño 2/—'),
('barbarian', 11, '+11/+6/+1', '+11/+6/+1', 7, 3, 3, ARRAY['Greater rage'], ARRAY['Ira mayor'], 'Ira mayor'),
('barbarian', 12, '+12/+7/+2', '+12/+7/+2', 8, 4, 4, ARRAY['Rage 4/day', 'Trap sense +4'], ARRAY['Ira 4/día', 'Sentido de las trampas +4'], 'Ira 4/día, Sentido de las trampas +4'),
('barbarian', 13, '+13/+8/+3', '+13/+8/+3', 8, 4, 4, ARRAY['Damage reduction 3/—'], ARRAY['Reducción de daño 3/—'], 'Reducción de daño 3/—'),
('barbarian', 14, '+14/+9/+4', '+14/+9/+4', 9, 4, 4, ARRAY['Indomitable will'], ARRAY['Voluntad indomable'], 'Voluntad indomable'),
('barbarian', 15, '+15/+10/+5', '+15/+10/+5', 9, 5, 5, ARRAY['Trap sense +5'], ARRAY['Sentido de las trampas +5'], 'Sentido de las trampas +5'),
('barbarian', 16, '+16/+11/+6/+1', '+16/+11/+6/+1', 10, 5, 5, ARRAY['Damage reduction 4/—', 'Rage 5/day'], ARRAY['Reducción de daño 4/—', 'Ira 5/día'], 'Reducción de daño 4/—, Ira 5/día'),
('barbarian', 17, '+17/+12/+7/+2', '+17/+12/+7/+2', 10, 5, 5, ARRAY['Tireless rage'], ARRAY['Ira incansable'], 'Ira incansable'),
('barbarian', 18, '+18/+13/+8/+3', '+18/+13/+8/+3', 11, 6, 6, ARRAY['Trap sense +6'], ARRAY['Sentido de las trampas +6'], 'Sentido de las trampas +6'),
('barbarian', 19, '+19/+14/+9/+4', '+19/+14/+9/+4', 11, 6, 6, ARRAY['Damage reduction 5/—'], ARRAY['Reducción de daño 5/—'], 'Reducción de daño 5/—'),
('barbarian', 20, '+20/+15/+10/+5', '+20/+15/+10/+5', 12, 6, 6, ARRAY['Mighty rage', 'Rage 6/day'], ARRAY['Ira poderosa', 'Ira 6/día'], 'Ira poderosa, Ira 6/día')
ON CONFLICT (class_slug, level) DO UPDATE SET
  bab = EXCLUDED.bab,
  base_attack_bonus = EXCLUDED.base_attack_bonus,
  fort_save = EXCLUDED.fort_save,
  ref_save = EXCLUDED.ref_save,
  will_save = EXCLUDED.will_save,
  special_en = EXCLUDED.special_en,
  special_es = EXCLUDED.special_es,
  special_abilities = EXCLUDED.special_abilities;

-- ============================================================================
-- Class Features para Barbarian
-- ============================================================================

INSERT INTO class_features (
  class_slug, 
  name_en, name_es, title,
  level, type, 
  description_en, description_es, full_description,
  summary_en, summary_es, summary
) VALUES
('barbarian', 'Fast Movement', 'Movimiento Rápido', 'Movimiento Rápido', 1, 'Ex', 
  'A barbarian''s land speed is faster than the norm for his race by +10 feet. This benefit applies only when he is wearing no armor, light armor, or medium armor and not carrying a heavy load. Apply this bonus before modifying the barbarian''s speed because of any load carried or armor worn.',
  'La velocidad terrestre de un bárbaro es más rápida que la normal para su raza en +10 pies. Este beneficio se aplica solo cuando no lleva armadura, armadura ligera o armadura media y no lleva una carga pesada.',
  'La velocidad terrestre de un bárbaro es más rápida que la normal para su raza en +10 pies. Este beneficio se aplica solo cuando no lleva armadura, armadura ligera o armadura media y no lleva una carga pesada.',
  '+10 ft. speed in light/medium armor or no armor',
  '+10 pies de velocidad con armadura ligera/media o sin armadura',
  '+10 pies de velocidad con armadura ligera/media o sin armadura'),

('barbarian', 'Illiteracy', 'Analfabetismo', 'Analfabetismo', 1, NULL,
  'Barbarians are the only characters who do not automatically know how to read and write. A barbarian may spend 2 skill points to gain the ability to read and write all languages he is able to speak. A barbarian who gains a level in any other class automatically gains literacy.',
  'Los bárbaros son los únicos personajes que no saben leer y escribir automáticamente. Un bárbaro puede gastar 2 puntos de habilidad para obtener la capacidad de leer y escribir todos los idiomas que puede hablar. Un bárbaro que gana un nivel en cualquier otra clase obtiene automáticamente la alfabetización.',
  'Los bárbaros son los únicos personajes que no saben leer y escribir automáticamente. Un bárbaro puede gastar 2 puntos de habilidad para obtener la capacidad de leer y escribir todos los idiomas que puede hablar. Un bárbaro que gana un nivel en cualquier otra clase obtiene automáticamente la alfabetización.',
  'Cannot read/write unless spending 2 skill points',
  'No puede leer/escribir a menos que gaste 2 puntos de habilidad',
  'No puede leer/escribir a menos que gaste 2 puntos de habilidad'),

('barbarian', 'Rage', 'Ira', 'Ira', 1, 'Ex',
  'A barbarian can fly into a screaming blood frenzy a certain number of times per day. In a rage, a barbarian gains phenomenal strength and durability but becomes reckless and less able to defend himself. He temporarily gains a +4 bonus to Strength, a +4 bonus to Constitution, and a +2 morale bonus on Will saves, but he takes a –2 penalty to Armor Class. The increase in Constitution increases the barbarian''s hit points by 2 points per level, but these hit points go away at the end of the rage when his Constitution score drops back to normal. A barbarian can fly into a rage only once per encounter. At 1st level he can use his rage ability once per day. At 4th level and every four levels thereafter, he can use it one additional time per day.',
  'Un bárbaro puede entrar en un frenesí sangriento gritando un cierto número de veces por día. En ira, un bárbaro gana fuerza y durabilidad fenomenales pero se vuelve imprudente y menos capaz de defenderse. Gana temporalmente un bonificador +4 a Fuerza, un bonificador +4 a Constitución y un bonificador +2 de moral en salvaciones de Voluntad, pero sufre una penalización –2 a Clase de Armadura. El aumento en Constitución aumenta los puntos de golpe del bárbaro en 2 puntos por nivel, pero estos puntos de golpe desaparecen al final de la ira.',
  'Un bárbaro puede entrar en un frenesí sangriento gritando un cierto número de veces por día. En ira, un bárbaro gana fuerza y durabilidad fenomenales pero se vuelve imprudente y menos capaz de defenderse. Gana temporalmente un bonificador +4 a Fuerza, un bonificador +4 a Constitución y un bonificador +2 de moral en salvaciones de Voluntad, pero sufre una penalización –2 a Clase de Armadura. El aumento en Constitución aumenta los puntos de golpe del bárbaro en 2 puntos por nivel, pero estos puntos de golpe desaparecen al final de la ira.',
  '+4 Str, +4 Con, +2 Will, -2 AC while raging',
  '+4 Fue, +4 Con, +2 Vol, -2 CA mientras está en ira',
  '+4 Fue, +4 Con, +2 Vol, -2 CA mientras está en ira'),

('barbarian', 'Uncanny Dodge', 'Esquiva Asombrosa', 'Esquiva Asombrosa', 2, 'Ex',
  'At 2nd level, a barbarian gains the ability to react to danger before his senses would normally allow him to do so. He retains his Dexterity bonus to AC (if any) even if he is caught flat-footed or struck by an invisible attacker. However, he still loses his Dexterity bonus to AC if immobilized.',
  'En el nivel 2, un bárbaro gana la capacidad de reaccionar al peligro antes de que sus sentidos normalmente le permitan hacerlo. Retiene su bonificador de Destreza a la CA (si lo tiene) incluso si es sorprendido desprevenido o golpeado por un atacante invisible. Sin embargo, aún pierde su bonificador de Destreza a la CA si está inmovilizado.',
  'En el nivel 2, un bárbaro gana la capacidad de reaccionar al peligro antes de que sus sentidos normalmente le permitan hacerlo. Retiene su bonificador de Destreza a la CA (si lo tiene) incluso si es sorprendido desprevenido o golpeado por un atacante invisible. Sin embargo, aún pierde su bonificador de Destreza a la CA si está inmovilizado.',
  'Retain Dex bonus to AC when flat-footed',
  'Retiene bonificador de Des a CA cuando está desprevenido',
  'Retiene bonificador de Des a CA cuando está desprevenido'),

('barbarian', 'Trap Sense', 'Sentido de las Trampas', 'Sentido de las Trampas', 3, 'Ex',
  'Starting at 3rd level, a barbarian has an intuitive sense that alerts him to danger from traps, giving him a +1 bonus on Reflex saves made to avoid traps and a +1 dodge bonus to AC against attacks made by traps. These bonuses rise by +1 every three barbarian levels thereafter (6th, 9th, 12th, 15th, and 18th level).',
  'A partir del nivel 3, un bárbaro tiene un sentido intuitivo que lo alerta del peligro de las trampas, dándole un bonificador +1 en salvaciones de Reflejos para evitar trampas y un bonificador +1 de esquiva a la CA contra ataques hechos por trampas. Estos bonificadores aumentan en +1 cada tres niveles de bárbaro (niveles 6, 9, 12, 15 y 18).',
  'A partir del nivel 3, un bárbaro tiene un sentido intuitivo que lo alerta del peligro de las trampas, dándole un bonificador +1 en salvaciones de Reflejos para evitar trampas y un bonificador +1 de esquiva a la CA contra ataques hechos por trampas. Estos bonificadores aumentan en +1 cada tres niveles de bárbaro (niveles 6, 9, 12, 15 y 18).',
  '+1 bonus vs traps, increases every 3 levels',
  'Bonificador +1 contra trampas, aumenta cada 3 niveles',
  'Bonificador +1 contra trampas, aumenta cada 3 niveles'),

('barbarian', 'Improved Uncanny Dodge', 'Esquiva Asombrosa Mejorada', 'Esquiva Asombrosa Mejorada', 5, 'Ex',
  'At 5th level and higher, a barbarian can no longer be flanked; he can react to opponents on opposite sides of him as easily as he can react to a opponents on opposite sides of him as easily as he can react to a single attacker. This defense denies a rogue the ability to sneak attack the barbarian by flanking him, unless the attacker has at least four more rogue levels than the target has barbarian levels.',
  'En el nivel 5 y superior, un bárbaro ya no puede ser flanqueado; puede reaccionar a oponentes en lados opuestos de él tan fácilmente como puede reaccionar a un solo atacante. Esta defensa niega a un pícaro la capacidad de atacar furtivamente al bárbaro flanqueándolo, a menos que el atacante tenga al menos cuatro niveles más de pícaro que el objetivo tiene niveles de bárbaro.',
  'En el nivel 5 y superior, un bárbaro ya no puede ser flanqueado; puede reaccionar a oponentes en lados opuestos de él tan fácilmente como puede reaccionar a un solo atacante. Esta defensa niega a un pícaro la capacidad de atacar furtivamente al bárbaro flanqueándolo, a menos que el atacante tenga al menos cuatro niveles más de pícaro que el objetivo tiene niveles de bárbaro.',
  'Cannot be flanked',
  'No puede ser flanqueado',
  'No puede ser flanqueado'),

('barbarian', 'Damage Reduction', 'Reducción de Daño', 'Reducción de Daño', 7, 'Ex',
  'At 7th level, a barbarian gains the ability to shrug off some amount of injury from each blow or attack. Subtract 1 from the damage the barbarian takes each time he is dealt damage from a weapon or a natural attack. At 10th level, and every three barbarian levels thereafter (13th, 16th, and 19th level), this damage reduction rises by 1 point.',
  'En el nivel 7, un bárbaro gana la capacidad de resistir cierta cantidad de daño de cada golpe o ataque. Resta 1 del daño que recibe el bárbaro cada vez que recibe daño de un arma o un ataque natural. En el nivel 10, y cada tres niveles de bárbaro después (niveles 13, 16 y 19), esta reducción de daño aumenta en 1 punto.',
  'En el nivel 7, un bárbaro gana la capacidad de resistir cierta cantidad de daño de cada golpe o ataque. Resta 1 del daño que recibe el bárbaro cada vez que recibe daño de un arma o un ataque natural. En el nivel 10, y cada tres niveles de bárbaro después (niveles 13, 16 y 19), esta reducción de daño aumenta en 1 punto.',
  'DR 1/— at 7th, increases by 1 every 3 levels',
  'RD 1/— en nivel 7, aumenta 1 cada 3 niveles',
  'RD 1/— en nivel 7, aumenta 1 cada 3 niveles'),

('barbarian', 'Greater Rage', 'Ira Mayor', 'Ira Mayor', 11, 'Ex',
  'At 11th level, a barbarian''s bonuses to Strength and Constitution during his rage each increase to +6, and his morale bonus on Will saves increases to +3. The penalty to AC remains at –2.',
  'En el nivel 11, los bonificadores de un bárbaro a Fuerza y Constitución durante su ira aumentan cada uno a +6, y su bonificador de moral en salvaciones de Voluntad aumenta a +3. La penalización a la CA permanece en –2.',
  'En el nivel 11, los bonificadores de un bárbaro a Fuerza y Constitución durante su ira aumentan cada uno a +6, y su bonificador de moral en salvaciones de Voluntad aumenta a +3. La penalización a la CA permanece en –2.',
  '+6 Str/Con, +3 Will during rage',
  '+6 Fue/Con, +3 Vol durante la ira',
  '+6 Fue/Con, +3 Vol durante la ira'),

('barbarian', 'Indomitable Will', 'Voluntad Indomable', 'Voluntad Indomable', 14, 'Ex',
  'While in a rage, a barbarian of 14th level or higher gains a +4 bonus on Will saves to resist enchantment spells. This bonus stacks with all other modifiers, including the morale bonus on Will saves he also receives during his rage.',
  'Mientras está en ira, un bárbaro de nivel 14 o superior gana un bonificador +4 en salvaciones de Voluntad para resistir hechizos de encantamiento. Este bonificador se acumula con todos los demás modificadores, incluido el bonificador de moral en salvaciones de Voluntad que también recibe durante su ira.',
  'Mientras está en ira, un bárbaro de nivel 14 o superior gana un bonificador +4 en salvaciones de Voluntad para resistir hechizos de encantamiento. Este bonificador se acumula con todos los demás modificadores, incluido el bonificador de moral en salvaciones de Voluntad que también recibe durante su ira.',
  '+4 Will vs enchantment while raging',
  '+4 Vol contra encantamiento mientras está en ira',
  '+4 Vol contra encantamiento mientras está en ira'),

('barbarian', 'Tireless Rage', 'Ira Incansable', 'Ira Incansable', 17, 'Ex',
  'At 17th level and higher, a barbarian no longer becomes fatigued at the end of his rage.',
  'En el nivel 17 y superior, un bárbaro ya no se fatiga al final de su ira.',
  'En el nivel 17 y superior, un bárbaro ya no se fatiga al final de su ira.',
  'No fatigue after rage',
  'Sin fatiga después de la ira',
  'Sin fatiga después de la ira'),

('barbarian', 'Mighty Rage', 'Ira Poderosa', 'Ira Poderosa', 20, 'Ex',
  'At 20th level, a barbarian''s bonuses to Strength and Constitution during his rage each increase to +8, and his morale bonus on Will saves increases to +4. The penalty to AC remains at –2.',
  'En el nivel 20, los bonificadores de un bárbaro a Fuerza y Constitución durante su ira aumentan cada uno a +8, y su bonificador de moral en salvaciones de Voluntad aumenta a +4. La penalización a la CA permanece en –2.',
  'En el nivel 20, los bonificadores de un bárbaro a Fuerza y Constitución durante su ira aumentan cada uno a +8, y su bonificador de moral en salvaciones de Voluntad aumenta a +4. La penalización a la CA permanece en –2.',
  '+8 Str/Con, +4 Will during rage',
  '+8 Fue/Con, +4 Vol durante la ira',
  '+8 Fue/Con, +4 Vol durante la ira')
ON CONFLICT (class_slug, name_en, level) DO UPDATE SET
  description_en = EXCLUDED.description_en,
  description_es = EXCLUDED.description_es,
  summary_en = EXCLUDED.summary_en,
  summary_es = EXCLUDED.summary_es,
  title = EXCLUDED.title,
  full_description = EXCLUDED.full_description,
  summary = EXCLUDED.summary;

-- ============================================================================
-- Starting Package para Barbarian (Half-Orc)
-- ============================================================================

INSERT INTO starting_packages (class_slug, race_en, race_es, armor, weapons, skills, feat_en, feat_es, gear_en, gear_es, gold) VALUES
('barbarian', 'Half-Orc', 'Semiorco',
  '{"name_en": "Studded leather", "name_es": "Cuero tachonado", "ac": 3, "armor_check_penalty": -1, "speed": "40 ft.", "weight": "20 lb."}'::jsonb,
  ARRAY[
    '{"name_en": "Greataxe", "name_es": "Hacha grande", "damage": "1d12", "crit": "×3", "weight": "12 lb.", "type": "two-handed, slashing"}'::jsonb,
    '{"name_en": "Shortbow", "name_es": "Arco corto", "damage": "1d6", "crit": "×3", "range": "60 ft.", "weight": "2 lb.", "type": "piercing"}'::jsonb,
    '{"name_en": "Dagger", "name_es": "Daga", "damage": "1d4", "crit": "19-20/×2", "range": "10 ft.", "weight": "1 lb.", "type": "light, piercing"}'::jsonb
  ],
  ARRAY[
    '{"skill_en": "Climb", "skill_es": "Trepar", "ranks": 4, "ability": "Str", "armor_check_penalty": -1}'::jsonb,
    '{"skill_en": "Survival", "skill_es": "Supervivencia", "ranks": 4, "ability": "Wis", "armor_check_penalty": 0}'::jsonb,
    '{"skill_en": "Listen", "skill_es": "Escuchar", "ranks": 4, "ability": "Wis", "armor_check_penalty": 0}'::jsonb,
    '{"skill_en": "Jump", "skill_es": "Saltar", "ranks": 4, "ability": "Str", "armor_check_penalty": -1}'::jsonb,
    '{"skill_en": "Swim", "skill_es": "Nadar", "ranks": 4, "ability": "Str", "armor_check_penalty": -2}'::jsonb,
    '{"skill_en": "Ride", "skill_es": "Montar", "ranks": 4, "ability": "Dex", "armor_check_penalty": 0}'::jsonb,
    '{"skill_en": "Intimidate", "skill_es": "Intimidar", "ranks": 4, "ability": "Cha", "armor_check_penalty": 0}'::jsonb,
    '{"skill_en": "Spot", "skill_es": "Avistar", "ranks": 2, "ability": "Wis", "armor_check_penalty": 0}'::jsonb
  ],
  'Weapon Focus (greataxe)',
  'Soltura con arma (hacha grande)',
  ARRAY['Backpack', 'Waterskin', 'One day''s trail rations', 'Bedroll', 'Sack', 'Flint and steel', 'Quiver with 20 arrows'],
  ARRAY['Mochila', 'Odre', 'Raciones de viaje para un día', 'Saco de dormir', 'Saco', 'Pedernal y yesca', 'Carcaj con 20 flechas'],
  '2d4 gp'
) ON CONFLICT (class_slug, race_en) DO UPDATE SET
  armor = EXCLUDED.armor,
  weapons = EXCLUDED.weapons,
  skills = EXCLUDED.skills;

-- ============================================================================
-- TODO: Agregar las otras 10 clases siguiendo el mismo patrón
-- ============================================================================
-- BARD, CLERIC, DRUID, FIGHTER, MONK, PALADIN, RANGER, ROGUE, SORCERER, WIZARD

COMMENT ON TABLE class_features IS 'Contiene 11 características para Barbarian. Faltan 10 clases más.';
