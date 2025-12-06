DELETE FROM class_features WHERE class_slug = 'barbarian';
DELETE FROM class_progression WHERE class_slug = 'barbarian';
DELETE FROM starting_packages WHERE class_slug = 'barbarian';
DELETE FROM classes WHERE slug = 'barbarian';

INSERT INTO classes (
  slug, titulo, name_en, name_es, hit_die, skill_points_per_level,
  bab_progression, fort_save, ref_save, will_save,
  primary_ability_en, primary_ability_es,
  alignment_restriction_en, alignment_restriction_es,
  description_en, description_es,
  summary_en, summary_es,
  source_en, source_es
) VALUES (
  'barbarian',
  'Bárbaro',
  'Barbarian Re-Inserted',
  'Bárbaro Re-Insertado',
  12,
  4,
  'good', 'good', 'poor', 'poor',
  'Strength', 'Fuerza',
  'Any nonlawful', 'Cualquiera no legal',
  'Desc', 'Desc',
  'Summ', 'Summ',
  'PHB', 'PHB'
);
SELECT slug, name_en FROM classes WHERE slug = 'barbarian';
