-- ============================================================================
-- FIX: Corregir descripción de Searing Light
-- ============================================================================
-- La descripción estaba cortada al inicio
-- ============================================================================

UPDATE spells
SET description = 'Focusing divine power like a ray of the sun, you project a blast of light from your open palm. You must succeed on a ranged touch attack to strike your target. A creature struck by this ray of light takes 1d8 points of damage per two caster levels (maximum 5d8). An undead creature takes 1d6 points of damage per caster level (maximum 10d6), and an undead creature particularly vulnerable to bright light takes 1d8 points of damage per caster level (maximum 10d8). A construct or inanimate object takes only 1d6 points of damage per two caster levels (maximum 5d6).'
WHERE slug = 'searing-light';

-- Verificar corrección
SELECT
  name,
  slug,
  school,
  LEFT(description, 100) as description_preview
FROM spells
WHERE slug = 'searing-light';
