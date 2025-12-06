-- ============================================================================
-- CLERIC (CLÉRIGO)
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
  'cleric',
  'Cleric',
  'Clérigo',
  8,
  2,
  'average',
  'good',
  'poor',
  'good',
  'Wisdom',
  'Sabiduría',
  'Any',
  'Cualquiera',
  'The handiwork of the gods is everywhere—in places of natural beauty, in mighty crusades, in soaring temples, and in the hearts of worshipers. Like people, gods run the gamut from benevolent to malicious, reserved to intrusive, simple to inscrutable. The gods, however, work mostly through intermediaries—their clerics.',
  'La obra de los dioses está en todas partes: en lugares de belleza natural, en poderosas cruzadas, en templos elevados y en los corazones de los adoradores. Como las personas, los dioses van desde benevolentes hasta maliciosos, reservados hasta intrusivos, simples hasta inescrutables. Los dioses, sin embargo, trabajan principalmente a través de intermediarios: sus clérigos.',
  'Divine spellcaster, channel of godly power',
  'Lanzador de conjuros divinos, canal del poder divino',
  'Player''s Handbook v3.5',
  'Manual del Jugador v3.5'
) ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_es = EXCLUDED.name_es;

-- Class Skills
UPDATE classes SET 
  class_skills_en = ARRAY['Concentration', 'Craft', 'Diplomacy', 'Heal', 'Knowledge (arcana)', 'Knowledge (history)', 'Knowledge (religion)', 'Knowledge (the planes)', 'Profession', 'Spellcraft'],
  class_skills_es = ARRAY['Concentración', 'Artesanía', 'Diplomacia', 'Sanar', 'Conocimiento (arcano)', 'Conocimiento (historia)', 'Conocimiento (religión)', 'Conocimiento (los planos)', 'Profesión', 'Conjuros'],
  weapon_proficiencies_en = 'All simple weapons',
  weapon_proficiencies_es = 'Todas las armas simples',
  armor_proficiencies_en = 'All armor and shields (except tower shields)',
  armor_proficiencies_es = 'Todas las armaduras y escudos (excepto escudos torre)'
WHERE slug = 'cleric';

-- TODO: Agregar class_progression, class_features, starting_packages

