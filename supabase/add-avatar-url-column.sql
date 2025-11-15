-- ============================================================================
-- Agregar columna avatar_url a la tabla profiles (si no existe)
-- ============================================================================
-- Este script es idempotente - se puede ejecutar múltiples veces sin problemas
-- Fecha: 2025-11-15
-- ============================================================================

-- Agregar columna avatar_url si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'profiles'
      AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE public.profiles
    ADD COLUMN avatar_url TEXT;

    RAISE NOTICE 'Columna avatar_url agregada a la tabla profiles';
  ELSE
    RAISE NOTICE 'Columna avatar_url ya existe en la tabla profiles';
  END IF;
END $$;

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ Verificación completada:';
  RAISE NOTICE '   - La tabla profiles ahora tiene la columna avatar_url';
  RAISE NOTICE '   - Los usuarios pueden subir sus avatares a Supabase Storage';
  RAISE NOTICE '   - La URL del avatar se guardará en esta columna';
  RAISE NOTICE '';
END $$;
