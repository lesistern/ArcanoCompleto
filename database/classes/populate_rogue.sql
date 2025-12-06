-- ============================================================================
-- ROGUE (PÍCARO)
-- ============================================================================

-- Información básica de la clase
INSERT INTO classes (
  slug, name_en, name_es, hit_die, skill_points_per_level,
  bab_progression, fort_save, ref_save, will_save,
  primary_ability_en, primary_ability_es,
  alignment_restriction_en, alignment_restriction_es,
  description_en, description_es,
  summary_en, summary_es,
  source_en, source_es
) VALUES (
  'rogue',
  'Rogue',
  'Pícaro',
  6,
  8,
  'average',
  'poor',
  'good',
  'poor',
  'Dexterity',
  'Destreza',
  'Any',
  'Cualquiera',
  'Rogues have little in common with each other. Some are stealthy thieves. Others are silver-tongued tricksters. Still others are scouts, infiltrators, spies, diplomats, or thugs. What they share is versatility, adaptability, and resourcefulness. In general, rogues are skilled at getting what others don''t want them to get: entrance into a locked treasure vault, safe passage past a deadly trap, secret battle plans, a guard''s trust, or some random person''s pocket money.',
  'Los pícaros tienen poco en común entre sí. Algunos son ladrones sigilosos. Otros son embaucadores de lengua de plata. Otros son exploradores, infiltradores, espías, diplomáticos o matones. Lo que comparten es versatilidad, adaptabilidad e ingenio. En general, los pícaros son hábiles para obtener lo que otros no quieren que obtengan: entrada a una bóveda del tesoro cerrada, paso seguro más allá de una trampa mortal, planes de batalla secretos, la confianza de un guardia o el dinero de bolsillo de alguna persona al azar.',
  'Skilled and versatile, master of stealth and deception',
  'Hábil y versátil, maestro del sigilo y el engaño',
  'Player''s Handbook v3.5',
  'Manual del Jugador v3.5'
) ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_es = EXCLUDED.name_es;

-- Class Skills
UPDATE classes SET 
  class_skills_en = ARRAY['Appraise', 'Balance', 'Bluff', 'Climb', 'Craft', 'Decipher Script', 'Diplomacy', 'Disable Device', 'Disguise', 'Escape Artist', 'Forgery', 'Gather Information', 'Hide', 'Intimidate', 'Jump', 'Knowledge (local)', 'Listen', 'Move Silently', 'Open Lock', 'Perform', 'Profession', 'Search', 'Sense Motive', 'Sleight of Hand', 'Spot', 'Swim', 'Tumble', 'Use Magic Device', 'Use Rope'],
  class_skills_es = ARRAY['Tasar', 'Equilibrio', 'Engañar', 'Trepar', 'Artesanía', 'Descifrar escritura', 'Diplomacia', 'Inutilizar mecanismo', 'Disfrazarse', 'Escapismo', 'Falsificar', 'Reunir información', 'Esconderse', 'Intimidar', 'Saltar', 'Conocimiento (local)', 'Escuchar', 'Moverse sigilosamente', 'Abrir cerraduras', 'Actuar', 'Profesión', 'Buscar', 'Sentir motivación', 'Juego de manos', 'Avistar', 'Nadar', 'Voltereta', 'Usar objeto mágico', 'Usar cuerdas'],
  weapon_proficiencies_en = 'All simple weapons, plus hand crossbow, rapier, sap, shortbow, and short sword',
  weapon_proficiencies_es = 'Todas las armas simples, más ballesta de mano, estoque, cachiporra, arco corto y espada corta',
  armor_proficiencies_en = 'Light armor',
  armor_proficiencies_es = 'Armadura ligera'
WHERE slug = 'rogue';

-- TODO: Agregar class_progression, class_features, starting_packages

