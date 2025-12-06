-- Verificación de datos de Barbarian
SELECT 
  slug, 
  titulo,
  name_en, 
  name_es, 
  hit_die, 
  dg,
  skill_points_per_level,
  skill_points_per_level_base,
  skill_points_first_level_base,
  bab_progression,
  bab
FROM classes 
WHERE slug = 'barbarian';

-- Verificar conteos
SELECT 
  (SELECT COUNT(*) FROM class_features WHERE class_slug = 'barbarian') as total_features,
  (SELECT COUNT(*) FROM class_progression WHERE class_slug = 'barbarian') as total_progression,
  (SELECT COUNT(*) FROM starting_packages WHERE class_slug = 'barbarian') as total_packages;

-- Verificar detalles de features
SELECT name_en, name_es, level, type FROM class_features WHERE class_slug = 'barbarian' ORDER BY level LIMIT 5;

-- Verificar detalles de progression
SELECT level, bab, base_attack_bonus, special_en, special_es FROM class_progression WHERE class_slug = 'barbarian' ORDER BY level LIMIT 5;

-- Verificar starting package
SELECT race_en, gold FROM starting_packages WHERE class_slug = 'barbarian';
