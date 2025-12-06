-- ============================================================================
-- FIGHTER (GUERRERO)
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
  'fighter',
  'Fighter',
  'Guerrero',
  10,
  2,
  'good',
  'good',
  'poor',
  'poor',
  'Strength',
  'Fuerza',
  'Any',
  'Cualquiera',
  'The fighter excels at combat—defeating his enemies, controlling the flow of battle, and surviving such sorties himself. While his specific weapons and methods grant him a wide variety of tactics, his expertise with weapons and armor is the foundation of his success.',
  'El guerrero sobresale en combate: derrotando a sus enemigos, controlando el flujo de la batalla y sobreviviendo a tales salidas él mismo. Si bien sus armas y métodos específicos le otorgan una amplia variedad de tácticas, su experiencia con armas y armaduras es la base de su éxito.',
  'Master of weapons and armor, excels at combat',
  'Maestro de armas y armaduras, sobresale en combate',
  'Player''s Handbook v3.5',
  'Manual del Jugador v3.5'
) ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_es = EXCLUDED.name_es;

-- Class Skills
UPDATE classes SET 
  class_skills_en = ARRAY['Climb', 'Craft', 'Handle Animal', 'Intimidate', 'Jump', 'Ride', 'Swim'],
  class_skills_es = ARRAY['Trepar', 'Artesanía', 'Trato con animales', 'Intimidar', 'Saltar', 'Montar', 'Nadar'],
  weapon_proficiencies_en = 'All simple and martial weapons',
  weapon_proficiencies_es = 'Todas las armas simples y marciales',
  armor_proficiencies_en = 'All armor and shields (including tower shields)',
  armor_proficiencies_es = 'Todas las armaduras y escudos (incluyendo escudos torre)'
WHERE slug = 'fighter';

-- TODO: Agregar class_progression, class_features, starting_packages

