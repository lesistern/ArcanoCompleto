-- Ranger class population script
-- Generated from Ranger.md
-- 
-- This script populates:
-- - class_progression (20 levels)
-- - class_features (14 features)
-- - class_spell_progression (4 spell levels, 17 levels)

-- ============================================
-- CLASS PROGRESSION (20 levels)
-- ============================================

INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_en, special_es)
VALUES
('ranger', 1, '+1', 2, 2, 0, ARRAY['1st favored enemy', 'Track', 'wild empathy'], ARRAY['1er enemigo predilecto', 'Rastrear', 'empatía salvaje']),
('ranger', 2, '+2', 3, 3, 0, ARRAY['Combat style'], ARRAY['Estilo de combate']),
('ranger', 3, '+3', 3, 3, 1, ARRAY['Endurance'], ARRAY['Aguante']),
('ranger', 4, '+4', 4, 4, 1, ARRAY['Animal companion'], ARRAY['Compañero animal']),
('ranger', 5, '+5', 4, 4, 1, ARRAY['2nd favored enemy'], ARRAY['2do enemigo predilecto']),
('ranger', 6, '+6/+1', 5, 5, 2, ARRAY['Improved combat style'], ARRAY['Estilo de combate mejorado']),
('ranger', 7, '+7/+2', 5, 5, 2, ARRAY['Woodland stride'], ARRAY['Paso sin rastro']),
('ranger', 8, '+8/+3', 6, 6, 2, ARRAY['Swift tracker'], ARRAY['Rastreador veloz']),
('ranger', 9, '+9/+4', 6, 6, 3, ARRAY['Evasion'], ARRAY['Evasión']),
('ranger', 10, '+10/+5', 7, 7, 3, ARRAY['3rd favored enemy'], ARRAY['3er enemigo predilecto']),
('ranger', 11, '+11/+6/+1', 7, 7, 3, ARRAY['Combat style mastery'], ARRAY['Dominio del estilo de combate']),
('ranger', 12, '+12/+7/+2', 8, 8, 4, NULL, NULL),
('ranger', 13, '+13/+8/+3', 8, 8, 4, ARRAY['Camouflage'], ARRAY['Camuflaje']),
('ranger', 14, '+14/+9/+4', 9, 9, 4, NULL, NULL),
('ranger', 15, '+15/+10/+5', 9, 9, 5, ARRAY['4th favored enemy'], ARRAY['4to enemigo predilecto']),
('ranger', 16, '+16/+11/+6/+1', 10, 10, 5, NULL, NULL),
('ranger', 17, '+17/+12/+7/+2', 10, 10, 5, ARRAY['Hide in plain sight'], ARRAY['Ocultarse a plena vista']),
('ranger', 18, '+18/+13/+8/+3', 11, 11, 6, NULL, NULL),
('ranger', 19, '+19/+14/+9/+4', 11, 11, 6, NULL, NULL),
('ranger', 20, '+20/+15/+10/+5', 12, 12, 6, ARRAY['5th favored enemy'], ARRAY['5to enemigo predilecto'])
ON CONFLICT (class_slug, level) 
DO UPDATE SET
  base_attack_bonus = EXCLUDED.base_attack_bonus,
  fort_save = EXCLUDED.fort_save,
  ref_save = EXCLUDED.ref_save,
  will_save = EXCLUDED.will_save,
  special_en = EXCLUDED.special_en,
  special_es = EXCLUDED.special_es;

-- ============================================
-- CLASS FEATURES (14 features)
-- ============================================

INSERT INTO class_features (class_slug, level, name_en, name_es, description_en, description_es, summary_en, summary_es, feature_type)
VALUES
-- Level 1 features
('ranger', 1, 'Favored Enemy', 'Enemigo Predilecto', 
  'Favored Enemy (Ex): At 1st level, a ranger may select a type of creature from among those given on Table: Ranger Favored Enemies. The ranger gains a +2 bonus on Bluff, Listen, Sense Motive, Spot, and Survival checks when using these skills against creatures of this type. Likewise, he gets a +2 bonus on weapon damage rolls against such creatures.',
  'Enemigo Predilecto (Ex): A 1er nivel, un montaraz puede seleccionar un tipo de criatura de entre las indicadas en la Tabla: Enemigos Predilectos del Montaraz. El montaraz obtiene un bonificador +2 en las pruebas de Engañar, Escuchar, Sentir Motivación, Avistar y Supervivencia cuando use estas habilidades contra criaturas de este tipo. Asimismo, obtiene un bonificador +2 en las tiradas de daño con armas contra tales criaturas.',
  'Gain +2 bonus on certain skills and +2 damage versus chosen enemy type.',
  'Obtiene bonificador +2 en ciertas habilidades y +2 al daño contra un tipo de enemigo elegido.',
  'Ex'),

('ranger', 1, 'Track', 'Rastrear',
  'Track: A ranger gains Track as a bonus feat.',
  'Rastrear: Un montaraz obtiene Rastrear como dote adicional.',
  'Gains Track as bonus feat.',
  'Obtiene Rastrear como dote adicional.',
  NULL),

('ranger', 1, 'Wild Empathy', 'Empatía Salvaje',
  'Wild Empathy (Ex): A ranger can improve the attitude of an animal. This ability functions just like a Diplomacy check to improve the attitude of a person. The ranger rolls 1d20 and adds his ranger level and his Charisma bonus to determine the wild empathy check result. The typical domestic animal has a starting attitude of indifferent, while wild animals are usually unfriendly.',
  'Empatía Salvaje (Ex): Un montaraz puede mejorar la actitud de un animal. Esta habilidad funciona igual que una prueba de Diplomacia para mejorar la actitud de una persona. El montaraz lanza 1d20 y añade su nivel de montaraz y su bonificador de Carisma para determinar el resultado de la prueba de empatía salvaje. El animal doméstico típico tiene una actitud inicial de indiferente, mientras que los animales salvajes suelen ser hostiles.',
  'Can improve attitude of animals like Diplomacy.',
  'Puede mejorar la actitud de los animales como Diplomacia.',
  'Ex'),

-- Level 2
('ranger', 2, 'Combat Style', 'Estilo de Combate',
  'Combat Style (Ex): At 2nd level, a ranger must select one of two combat styles to pursue: archery or two-weapon combat. This choice affects the character''s class features but does not restrict his selection of feats or special abilities in any way.',
  'Estilo de Combate (Ex): A 2do nivel, un montaraz debe seleccionar uno de dos estilos de combate: arco o combate con dos armas. Esta elección afecta las características de clase del personaje pero no restringe su selección de dotes o habilidades especiales de ningún modo.',
  'Choose archery or two-weapon combat style.',
  'Elige estilo de arco o combate con dos armas.',
  'Ex'),

-- Level 3
('ranger', 3, 'Endurance', 'Aguante',
  'Endurance: A ranger gains Endurance as a bonus feat at 3rd level.',
  'Aguante: Un montaraz obtiene Aguante como dote adicional a 3er nivel.',
  'Gains Endurance as bonus feat.',
  'Obtiene Aguante como dote adicional.',
  NULL),

-- Level 4
('ranger', 4, 'Animal Companion', 'Compañero Animal',
  'Animal Companion (Ex): At 4th level, a ranger gains an animal companion selected from the following list: badger, camel, dire rat, dog, riding dog, eagle, hawk, horse (light or heavy), owl, pony, snake (Small or Medium viper), or wolf. If the campaign takes place wholly or partly in an aquatic environment, the following creatures may be added to the ranger''s list of options: crocodile, porpoise, Medium shark, and squid. This animal is a loyal companion that accompanies the ranger on his adventures as appropriate for its kind.',
  'Compañero Animal (Ex): A 4to nivel, un montaraz obtiene un compañero animal seleccionado de la siguiente lista: tejón, camello, rata atroz, perro, perro de montar, águila, halcón, caballo (ligero o pesado), lechuza, poni, serpiente (víbora Pequeña o Mediana), o lobo. Si la campaña tiene lugar total o parcialmente en un entorno acuático, las siguientes criaturas pueden añadirse a la lista de opciones del montaraz: cocodrilo, marsopa, tiburón Mediano y calamar. Este animal es un compañero leal que acompaña al montaraz en sus aventuras según corresponda a su tipo.',
  'Gains an animal companion (effective druid level = 1/2 ranger level).',
  'Obtiene un compañero animal (nivel efectivo de druida = 1/2 nivel de montaraz).',
  'Ex'),

('ranger', 4, 'Spells', 'Conjuros',
  'Spells: Beginning at 4th level, a ranger gains the ability to cast a small number of divine spells, which are drawn from the ranger spell list. A ranger must choose and prepare his spells in advance. To prepare or cast a spell, a ranger must have a Wisdom score equal to at least 10 + the spell level. A ranger can cast only a certain number of spells of each spell level per day. His caster level is one-half his ranger level.',
  'Conjuros: A partir de 4to nivel, un montaraz obtiene la habilidad de lanzar un pequeño número de conjuros divinos, que se extraen de la lista de conjuros de montaraz. Un montaraz debe elegir y preparar sus conjuros con antelación. Para preparar o lanzar un conjuro, un montaraz debe tener una puntuación de Sabiduría igual a al menos 10 + el nivel del conjuro. Un montaraz puede lanzar solo un cierto número de conjuros de cada nivel de conjuro al día. Su nivel de lanzador es la mitad de su nivel de montaraz.',
  'Gains ability to cast divine spells (caster level = 1/2 ranger level).',
  'Obtiene la habilidad de lanzar conjuros divinos (nivel de lanzador = 1/2 nivel de montaraz).',
  NULL),

-- Level 6
('ranger', 6, 'Improved Combat Style', 'Estilo de Combate Mejorado',
  'Improved Combat Style (Ex): At 6th level, a ranger''s aptitude in his chosen combat style (archery or two-weapon combat) improves. If he selected archery at 2nd level, he is treated as having the Manyshot feat, even if he does not have the normal prerequisites for that feat.',
  'Estilo de Combate Mejorado (Ex): A 6to nivel, la aptitud de un montaraz en su estilo de combate elegido (arco o combate con dos armas) mejora. Si seleccionó arco a 2do nivel, se le trata como si tuviera la dote Disparo Múltiple, incluso si no tiene los prerrequisitos normales para esa dote.',
  'Combat style improves (Manyshot for archery, Improved Two-Weapon Fighting for two-weapon).',
  'Estilo de combate mejora (Disparo Múltiple para arco, Lucha con Dos Armas Mejorada para dos armas).',
  'Ex'),

-- Level 7
('ranger', 7, 'Woodland Stride', 'Paso por Terreno Boscoso',
  'Woodland Stride (Ex): Starting at 7th level, a ranger may move through any sort of undergrowth (such as natural thorns, briars, overgrown areas, and similar terrain) at his normal speed and without taking damage or suffering any other impairment. However, thorns, briars, and overgrown areas that are enchanted or magically manipulated to impede motion still affect him.',
  'Paso por Terreno Boscoso (Ex): A partir de 7mo nivel, un montaraz puede moverse a través de cualquier tipo de maleza (como espinos naturales, zarzas, áreas cubiertas de vegetación y terreno similar) a su velocidad normal y sin sufrir daño ni ninguna otra penalización. Sin embargo, los espinos, zarzas y áreas cubiertas de vegetación que están encantados o manipulados mágicamente para impedir el movimiento todavía le afectan.',
  'Move through undergrowth at normal speed without taking damage.',
  'Se mueve a través de maleza a velocidad normal sin sufrir daño.',
  'Ex'),

-- Level 8
('ranger', 8, 'Swift Tracker', 'Rastreador Veloz',
  'Swift Tracker (Ex): Beginning at 8th level, a ranger can move at his normal speed while following tracks without taking the normal -5 penalty. He takes only a -10 penalty (instead of the normal -20) when moving at up to twice normal speed while tracking.',
  'Rastreador Veloz (Ex): A partir de 8vo nivel, un montaraz puede moverse a su velocidad normal mientras sigue rastros sin sufrir la penalización normal de -5. Sufre solo una penalización de -10 (en lugar de la normal de -20) cuando se mueve hasta el doble de su velocidad normal mientras rastrea.',
  'Track at normal speed with no penalty, or at double speed with -10 penalty.',
  'Rastrea a velocidad normal sin penalización, o a velocidad doble con penalización -10.',
  'Ex'),

-- Level 9
('ranger', 9, 'Evasion', 'Evasión',
  'Evasion (Ex): At 9th level, a ranger can avoid even magical and unusual attacks with great agility. If he makes a successful Reflex saving throw against an attack that normally deals half damage on a successful save, he instead takes no damage. Evasion can be used only if the ranger is wearing light armor or no armor. A helpless ranger does not gain the benefit of evasion.',
  'Evasión (Ex): A 9no nivel, un montaraz puede evitar incluso ataques mágicos e inusuales con gran agilidad. Si hace una tirada de salvación de Reflejos exitosa contra un ataque que normalmente inflige la mitad de daño en una salvación exitosa, en su lugar no sufre daño. La evasión puede usarse solo si el montaraz lleva armadura ligera o no lleva armadura. Un montaraz indefenso no obtiene el beneficio de evasión.',
  'Take no damage on successful Reflex save (instead of half).',
  'No sufre daño en salvación de Reflejos exitosa (en lugar de la mitad).',
  'Ex'),

-- Level 11
('ranger', 11, 'Combat Style Mastery', 'Dominio del Estilo de Combate',
  'Combat Style Mastery (Ex): At 11th level, a ranger''s aptitude in his chosen combat style (archery or two-weapon combat) improves again. If he selected archery at 2nd level, he is treated as having the Improved Precise Shot feat, even if he does not have the normal prerequisites for that feat.',
  'Dominio del Estilo de Combate (Ex): A 11vo nivel, la aptitud de un montaraz en su estilo de combate elegido (arco o combate con dos armas) mejora nuevamente. Si seleccionó arco a 2do nivel, se le trata como si tuviera la dote Disparo Preciso Mejorado, incluso si no tiene los prerrequisitos normales para esa dote.',
  'Combat style mastery (Improved Precise Shot for archery, Greater Two-Weapon Fighting for two-weapon).',
  'Dominio del estilo de combate (Disparo Preciso Mejorado para arco, Lucha con Dos Armas Superior para dos armas).',
  'Ex'),

-- Level 13
('ranger', 13, 'Camouflage', 'Camuflaje',
  'Camouflage (Ex): A ranger of 13th level or higher can use the Hide skill in any sort of natural terrain, even if the terrain doesn''t grant cover or concealment.',
  'Camuflaje (Ex): Un montaraz de 13er nivel o superior puede usar la habilidad Esconderse en cualquier tipo de terreno natural, incluso si el terreno no otorga cobertura u ocultación.',
  'Can use Hide in any natural terrain, even without cover.',
  'Puede usar Esconderse en cualquier terreno natural, incluso sin cobertura.',
  'Ex'),

-- Level 17
('ranger', 17, 'Hide in Plain Sight', 'Ocultarse a Plena Vista',
  'Hide in Plain Sight (Ex): While in any sort of natural terrain, a ranger of 17th level or higher can use the Hide skill even while being observed.',
  'Ocultarse a Plena Vista (Ex): Mientras esté en cualquier tipo de terreno natural, un montaraz de 17mo nivel o superior puede usar la habilidad Esconderse incluso mientras está siendo observado.',
  'Can hide even while being observed in natural terrain.',
  'Puede esconderse incluso mientras está siendo observado en terreno natural.',
  'Ex')
ON CONFLICT (class_slug, level, name_en) 
DO UPDATE SET
  name_es = EXCLUDED.name_es,
  description_en = EXCLUDED.description_en,
  description_es = EXCLUDED.description_es,
  summary_en = EXCLUDED.summary_en,
  summary_es = EXCLUDED.summary_es,
  feature_type = EXCLUDED.feature_type;

-- ============================================
-- CLASS SPELL PROGRESSION (Levels 4-20)
-- ============================================

INSERT INTO class_spell_progression (class_slug, level, spell_level, spells_per_day)
VALUES
-- Level 4
('ranger', 4, 1, 0),
-- Level 5
('ranger', 5, 1, 0),
-- Level 6
('ranger', 6, 1, 1),
-- Level 7
('ranger', 7, 1, 1),
-- Level 8
('ranger', 8, 1, 1),
('ranger', 8, 2, 0),
-- Level 9
('ranger', 9, 1, 1),
('ranger', 9, 2, 0),
-- Level 10
('ranger', 10, 1, 1),
('ranger', 10, 2, 1),
-- Level 11
('ranger', 11, 1, 1),
('ranger', 11, 2, 1),
('ranger', 11, 3, 0),
-- Level 12
('ranger', 12, 1, 1),
('ranger', 12, 2, 1),
('ranger', 12, 3, 1),
-- Level 13
('ranger', 13, 1, 1),
('ranger', 13, 2, 1),
('ranger', 13, 3, 1),
-- Level 14
('ranger', 14, 1, 2),
('ranger', 14, 2, 1),
('ranger', 14, 3, 1),
('ranger', 14, 4, 0),
-- Level 15
('ranger', 15, 1, 2),
('ranger', 15, 2, 1),
('ranger', 15, 3, 1),
('ranger', 15, 4, 1),
-- Level 16
('ranger', 16, 1, 2),
('ranger', 16, 2, 2),
('ranger', 16, 3, 1),
('ranger', 16, 4, 1),
-- Level 17
('ranger', 17, 1, 2),
('ranger', 17, 2, 2),
('ranger', 17, 3, 2),
('ranger', 17, 4, 1),
-- Level 18
('ranger', 18, 1, 3),
('ranger', 18, 2, 2),
('ranger', 18, 3, 2),
('ranger', 18, 4, 1),
-- Level 19
('ranger', 19, 1, 3),
('ranger', 19, 2, 3),
('ranger', 19, 3, 3),
('ranger', 19, 4, 2),
-- Level 20
('ranger', 20, 1, 3),
('ranger', 20, 2, 3),
('ranger',20, 3, 3),
('ranger', 20, 4, 3)
ON CONFLICT (class_slug, level, spell_level) 
DO UPDATE SET
  spells_per_day = EXCLUDED.spells_per_day;

-- Verification query
SELECT 'Ranger progression levels: ' || COUNT(*) FROM class_progression WHERE class_slug = 'ranger';
SELECT 'Ranger class features: ' || COUNT(*) FROM class_features WHERE class_slug = 'ranger';
SELECT 'Ranger spell progression entries: ' || COUNT(*) FROM class_spell_progression WHERE class_slug = 'ranger';
