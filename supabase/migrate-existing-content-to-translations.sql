-- ============================================================================
-- MIGRAR CONTENIDO EXISTENTE A TABLAS DE TRADUCCIONES
-- ============================================================================
-- Este script migra todo el contenido actual (en inglés) a las tablas
-- de traducciones, manteniendo los datos originales intactos
-- ============================================================================

-- IMPORTANTE: Ejecutar DESPUÉS de create-translations-system.sql

-- ============================================================================
-- 1. MIGRAR CONJUROS (SPELLS) - 605 hechizos
-- ============================================================================

INSERT INTO spell_translations (
  spell_id,
  language_code,
  name,
  description,
  casting_time,
  range_info,
  target,
  effect,
  area,
  duration,
  saving_throw,
  spell_resistance,
  material_components,
  focus,
  translation_status
)
SELECT
  id AS spell_id,
  'en' AS language_code,
  name,
  description,
  casting_time,
  range_info,
  target,
  effect,
  area,
  duration,
  saving_throw,
  spell_resistance,
  material_components,
  focus,
  'approved' AS translation_status
FROM spells
ON CONFLICT (spell_id, language_code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  casting_time = EXCLUDED.casting_time,
  range_info = EXCLUDED.range_info,
  target = EXCLUDED.target,
  effect = EXCLUDED.effect,
  area = EXCLUDED.area,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  material_components = EXCLUDED.material_components,
  focus = EXCLUDED.focus,
  translation_status = EXCLUDED.translation_status;

-- Verificar migración de spells
SELECT
  '✅ Spells migrados' AS status,
  COUNT(*) AS total_en,
  COUNT(*) FILTER (WHERE translation_status = 'approved') AS approved
FROM spell_translations
WHERE language_code = 'en';

-- ============================================================================
-- 2. MIGRAR CLASES (CLASSES) - 11 clases
-- ============================================================================

INSERT INTO class_translations (
  class_id,
  language_code,
  name,
  description,
  translation_status
)
SELECT
  id AS class_id,
  'en' AS language_code,
  name,
  description,
  'approved' AS translation_status
FROM classes
ON CONFLICT (class_id, language_code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  translation_status = EXCLUDED.translation_status;

-- Verificar migración de classes
SELECT
  '✅ Classes migradas' AS status,
  COUNT(*) AS total_en
FROM class_translations
WHERE language_code = 'en';

-- ============================================================================
-- 3. MIGRAR RAZAS (RACES) - 16 razas
-- ============================================================================

INSERT INTO race_translations (
  race_id,
  language_code,
  name,
  description,
  translation_status
)
SELECT
  id AS race_id,
  'en' AS language_code,
  name,
  description,
  'approved' AS translation_status
FROM races
ON CONFLICT (race_id, language_code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  translation_status = EXCLUDED.translation_status;

-- Verificar migración de races
SELECT
  '✅ Races migradas' AS status,
  COUNT(*) AS total_en
FROM race_translations
WHERE language_code = 'en';

-- ============================================================================
-- 4. MIGRAR DOTES (FEATS) - 34 dotes
-- ============================================================================

INSERT INTO feat_translations (
  feat_id,
  language_code,
  name,
  benefit,
  translation_status
)
SELECT
  id AS feat_id,
  'en' AS language_code,
  name,
  benefit,
  'approved' AS translation_status
FROM feats
ON CONFLICT (feat_id, language_code) DO UPDATE SET
  name = EXCLUDED.name,
  benefit = EXCLUDED.benefit,
  translation_status = EXCLUDED.translation_status;

-- Verificar migración de feats
SELECT
  '✅ Feats migradas' AS status,
  COUNT(*) AS total_en
FROM feat_translations
WHERE language_code = 'en';

-- ============================================================================
-- 5. MIGRAR HABILIDADES (SKILLS) - 43 skills
-- ============================================================================

INSERT INTO skill_translations (
  skill_id,
  language_code,
  name,
  description,
  translation_status
)
SELECT
  id AS skill_id,
  'en' AS language_code,
  name,
  description,
  'approved' AS translation_status
FROM skills
ON CONFLICT (skill_id, language_code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  translation_status = EXCLUDED.translation_status;

-- Verificar migración de skills
SELECT
  '✅ Skills migradas' AS status,
  COUNT(*) AS total_en
FROM skill_translations
WHERE language_code = 'en';

-- ============================================================================
-- 6. MIGRAR ARMAS (WEAPONS) - 72 armas
-- ============================================================================

INSERT INTO weapon_translations (
  weapon_id,
  language_code,
  name,
  description,
  translation_status
)
SELECT
  id AS weapon_id,
  'en' AS language_code,
  name,
  description,
  'approved' AS translation_status
FROM weapons
ON CONFLICT (weapon_id, language_code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  translation_status = EXCLUDED.translation_status;

-- Verificar migración de weapons
SELECT
  '✅ Weapons migradas' AS status,
  COUNT(*) AS total_en
FROM weapon_translations
WHERE language_code = 'en';

-- ============================================================================
-- RESUMEN FINAL
-- ============================================================================

SELECT
  '=' AS divider,
  'MIGRACIÓN COMPLETADA' AS status,
  '=' AS divider2;

SELECT * FROM v_translation_stats WHERE language_code = 'en';

-- Mostrar totales
SELECT
  'Spells' AS tipo,
  (SELECT COUNT(*) FROM spell_translations WHERE language_code = 'en') AS migrados
UNION ALL
SELECT
  'Classes' AS tipo,
  (SELECT COUNT(*) FROM class_translations WHERE language_code = 'en') AS migrados
UNION ALL
SELECT
  'Races' AS tipo,
  (SELECT COUNT(*) FROM race_translations WHERE language_code = 'en') AS migrados
UNION ALL
SELECT
  'Feats' AS tipo,
  (SELECT COUNT(*) FROM feat_translations WHERE language_code = 'en') AS migrados
UNION ALL
SELECT
  'Skills' AS tipo,
  (SELECT COUNT(*) FROM skill_translations WHERE language_code = 'en') AS migrados
UNION ALL
SELECT
  'Weapons' AS tipo,
  (SELECT COUNT(*) FROM weapon_translations WHERE language_code = 'en') AS migrados;
