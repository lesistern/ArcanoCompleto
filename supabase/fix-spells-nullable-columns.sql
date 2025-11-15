-- ============================================================================
-- FIX: Permitir NULL en múltiples columnas de spells
-- ============================================================================
-- Problema: Muchos campos tienen restricción NOT NULL pero los datos scraped
-- pueden tener valores NULL cuando la información no está disponible
-- ============================================================================

-- Permitir NULL en duration
ALTER TABLE spells
ALTER COLUMN duration DROP NOT NULL;

-- Permitir NULL en description
ALTER TABLE spells
ALTER COLUMN description DROP NOT NULL;

-- Permitir NULL en saving_throw
ALTER TABLE spells
ALTER COLUMN saving_throw DROP NOT NULL;

-- Permitir NULL en spell_resistance
ALTER TABLE spells
ALTER COLUMN spell_resistance DROP NOT NULL;

-- Permitir NULL en casting_time
ALTER TABLE spells
ALTER COLUMN casting_time DROP NOT NULL;

-- Permitir NULL en range_info
ALTER TABLE spells
ALTER COLUMN range_info DROP NOT NULL;

-- Comentarios explicativos
COMMENT ON COLUMN spells.duration IS 'Duration of the spell effect. Can be NULL for incomplete data or variant spells.';
COMMENT ON COLUMN spells.description IS 'Full description of the spell. Can be NULL for incomplete data.';
COMMENT ON COLUMN spells.saving_throw IS 'Saving throw information. Can be NULL for spells without saves.';
COMMENT ON COLUMN spells.spell_resistance IS 'Spell resistance applicability. Can be NULL for incomplete data.';
COMMENT ON COLUMN spells.casting_time IS 'Time required to cast the spell. Can be NULL for incomplete data.';
COMMENT ON COLUMN spells.range_info IS 'Range of the spell. Can be NULL for incomplete data.';

-- Verificar cambios
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'spells'
  AND column_name IN ('duration', 'description', 'saving_throw', 'spell_resistance', 'casting_time', 'range_info')
ORDER BY ordinal_position;

-- Mostrar resumen
SELECT
  'Columnas modificadas para permitir NULL' as status,
  COUNT(*) as total_columns
FROM information_schema.columns
WHERE table_name = 'spells'
  AND column_name IN ('duration', 'description', 'saving_throw', 'spell_resistance', 'casting_time', 'range_info')
  AND is_nullable = 'YES';
