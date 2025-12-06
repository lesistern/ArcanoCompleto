-- Populate class_fluff for Barbarian
-- Data from src/lib/data/class-lore-data.ts

INSERT INTO class_fluff (
  class_id,
  why_adventure_long,
  power_source_type,
  power_source_long,
  group_role_long,
  social_origin_long,
  religious_focus_long,
  typical_deities,
  typical_races,
  alignment_long,
  alignment_tendency
)
SELECT 
  id,
  'La aventura es la mejor oportunidad para los bárbaros de encontrar un lugar en la sociedad civilizada. No están bien adaptados a la monotonía del trabajo de guardia o tareas mundanas. Los bárbaros aventuran para derrotar enemigos odiados y tienen una notable aversión hacia lo antinatural, incluyendo muertos vivientes, demonios y diablos.',
  'Furia primigenia',
  'Donde la habilidad del guerrero en combate proviene del entrenamiento y la disciplina, el bárbaro posee una poderosa furia. Durante esta furia berserker, se vuelve más fuerte y resistente, mejor capacitado para derrotar enemigos y resistir sus ataques. Estas furias lo dejan exhausto, y tiene energía solo para unas pocas demostraciones espectaculares por día.',
  'El rol típico del bárbaro en un grupo de aventureros es como especialista de combate de primera línea. Ningún otro personaje puede igualar su pura resistencia. También puede servir como buen explorador, gracias a su velocidad, selección de habilidades y sentido del peligro.',
  'Los bárbaros provienen de tierras incivilizadas o de tribus bárbaras en las afueras de la civilización. Un bárbaro aventurero puede haber sido atraído a las tierras colonizadas por la promesa de riquezas, puede haber escapado después de ser capturado en su tierra natal y vendido como esclavo, puede haber sido reclutado como soldado, o puede haber sido expulsado de su tierra natal por invasores.',
  'Algunos bárbaros desconfían de las religiones establecidas y prefieren una relación intuitiva y natural con el cosmos sobre la adoración formal. Otros se dedican a deidades poderosas del panteón.',
  ARRAY['Kord (dios de la fuerza)', 'Obad-Hai (dios de la naturaleza)', 'Erythnul (dios de la matanza)'],
  ARRAY['Humanos', 'Semiorcos', 'Enanos'],
  'Cualquier alineamiento no legal',
  'Los bárbaros nunca son legales. Pueden ser honorables, pero en el fondo son salvajes. Esta naturaleza salvaje es su fuerza, y no podría vivir en un alma legal. En el mejor de los casos, los bárbaros de alineamiento caótico son libres y expresivos. En el peor, son destructivos sin pensar.'
FROM classes WHERE slug = 'barbarian'
ON CONFLICT (class_id) DO UPDATE SET
  why_adventure_long = EXCLUDED.why_adventure_long,
  power_source_type = EXCLUDED.power_source_type,
  power_source_long = EXCLUDED.power_source_long,
  group_role_long = EXCLUDED.group_role_long,
  social_origin_long = EXCLUDED.social_origin_long,
  religious_focus_long = EXCLUDED.religious_focus_long,
  typical_deities = EXCLUDED.typical_deities,
  typical_races = EXCLUDED.typical_races,
  alignment_long = EXCLUDED.alignment_long,
  alignment_tendency = EXCLUDED.alignment_tendency;
