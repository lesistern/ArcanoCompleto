-- ============================================================================
-- Migration: Add Bilingual Columns and Core Stats to Classes Table
-- ============================================================================
-- Fecha: 2025-11-27
-- Descripción: Agrega columnas para soporte bilingüe y estadísticas base
--              a la tabla classes
-- ============================================================================

ALTER TABLE classes
ADD COLUMN IF NOT EXISTS name_en TEXT,
ADD COLUMN IF NOT EXISTS name_es TEXT,
ADD COLUMN IF NOT EXISTS primary_ability_en TEXT,
ADD COLUMN IF NOT EXISTS primary_ability_es TEXT,
ADD COLUMN IF NOT EXISTS alignment_restriction_en TEXT,
ADD COLUMN IF NOT EXISTS alignment_restriction_es TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS description_es TEXT,
ADD COLUMN IF NOT EXISTS summary_en TEXT,
ADD COLUMN IF NOT EXISTS summary_es TEXT,
ADD COLUMN IF NOT EXISTS source_en TEXT,
ADD COLUMN IF NOT EXISTS source_es TEXT,
ADD COLUMN IF NOT EXISTS class_skills_en TEXT[],
ADD COLUMN IF NOT EXISTS class_skills_es TEXT[],
ADD COLUMN IF NOT EXISTS weapon_proficiencies_en TEXT,
ADD COLUMN IF NOT EXISTS weapon_proficiencies_es TEXT,
ADD COLUMN IF NOT EXISTS armor_proficiencies_en TEXT,
ADD COLUMN IF NOT EXISTS armor_proficiencies_es TEXT,
-- Core Stats
ADD COLUMN IF NOT EXISTS hit_die INTEGER,
ADD COLUMN IF NOT EXISTS skill_points_per_level INTEGER,
ADD COLUMN IF NOT EXISTS bab_progression TEXT, -- 'good', 'average', 'poor'
ADD COLUMN IF NOT EXISTS fort_save TEXT, -- 'good', 'poor'
ADD COLUMN IF NOT EXISTS ref_save TEXT, -- 'good', 'poor'
ADD COLUMN IF NOT EXISTS will_save TEXT; -- 'good', 'poor'

-- Comentarios
COMMENT ON COLUMN classes.name_en IS 'Nombre de la clase en inglés';
COMMENT ON COLUMN classes.name_es IS 'Nombre de la clase en español';
COMMENT ON COLUMN classes.hit_die IS 'Dado de golpe (ej. 4, 6, 8, 10, 12)';
COMMENT ON COLUMN classes.skill_points_per_level IS 'Puntos de habilidad por nivel';
COMMENT ON COLUMN classes.bab_progression IS 'Progresión de ataque base (good, average, poor)';
