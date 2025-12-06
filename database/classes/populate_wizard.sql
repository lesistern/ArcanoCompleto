-- ============================================================================
-- WIZARD (MAGO)
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
  'wizard',
  'Wizard',
  'Mago',
  4,
  2,
  'poor',
  'poor',
  'poor',
  'good',
  'Intelligence',
  'Inteligencia',
  'Any',
  'Cualquiera',
  'A few unintelligible words and fleeting gestures carry more power than a battleaxe, when they are the words and gestures of a wizard. These simple acts make magic seem easy, but they only hint at the time the wizard must spend poring over her spellbook preparing each spell for casting, and the years before that spent in apprenticeship to learn the arts of magic.',
  'Unas pocas palabras ininteligibles y gestos fugaces llevan más poder que un hacha de batalla, cuando son las palabras y gestos de un mago. Estos actos simples hacen que la magia parezca fácil, pero solo insinúan el tiempo que el mago debe pasar estudiando su libro de conjuros preparando cada hechizo para lanzar, y los años antes de eso pasados en aprendizaje para aprender las artes de la magia.',
  'Master of arcane magic through study and preparation',
  'Maestro de la magia arcana a través del estudio y la preparación',
  'Player''s Handbook v3.5',
  'Manual del Jugador v3.5'
) ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_es = EXCLUDED.name_es;

-- Class Skills
UPDATE classes SET 
  class_skills_en = ARRAY['Concentration', 'Craft', 'Decipher Script', 'Knowledge (all skills, taken individually)', 'Profession', 'Spellcraft'],
  class_skills_es = ARRAY['Concentración', 'Artesanía', 'Descifrar escritura', 'Conocimiento (todas las habilidades, tomadas individualmente)', 'Profesión', 'Conjuros'],
  weapon_proficiencies_en = 'Club, dagger, heavy crossbow, light crossbow, and quarterstaff',
  weapon_proficiencies_es = 'Garrote, daga, ballesta pesada, ballesta ligera y bastón',
  armor_proficiencies_en = 'None',
  armor_proficiencies_es = 'Ninguna'
WHERE slug = 'wizard';

-- TODO: Agregar class_progression, class_features, starting_packages

