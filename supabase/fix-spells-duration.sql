-- ============================================================================
-- FIX: Permitir NULL en duration para hechizos que referencian otros
-- ============================================================================
-- El problema: Muchos hechizos tienen "Ver hechizo base" en casting_time/range
-- y dejan duration como NULL, pero la tabla lo requiere como NOT NULL
-- ============================================================================

-- Modificar la columna duration para permitir NULL
ALTER TABLE spells
ALTER COLUMN duration DROP NOT NULL;

-- Comentario explicativo
COMMENT ON COLUMN spells.duration IS 'Duration of the spell effect. Can be NULL for variant spells that reference a base spell.';

-- Verificar cambio
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'spells'
  AND column_name = 'duration';
