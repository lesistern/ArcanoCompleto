-- ==================================================================
-- OCULTAR ADMINS DEL LEADERBOARD + DAR NIVEL MÁXIMO A ADMIN
-- ==================================================================
-- Fecha: 2025-11-15
-- Propósito:
--   1. Añadir columna 'tier' a profiles para roles de usuario (si no existe)
--   2. Marcar a lesistern@gmail.com como admin
--   3. Modificar v_level_leaderboard para excluir usuarios con tier 'admin'
--   4. Dar nivel máximo (20 = 355,000 XP) al usuario lesistern@gmail.com
-- ==================================================================

-- ============================================================
-- PASO 0: Crear columna tier en profiles si no existe
-- ============================================================

DO $$
BEGIN
  -- Verificar si la columna tier existe en profiles
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'profiles'
    AND column_name = 'tier'
  ) THEN
    -- Crear la columna tier para roles de usuario
    ALTER TABLE public.profiles
    ADD COLUMN tier TEXT DEFAULT 'user'
    CHECK (tier IN ('admin', 'reviewer', 'contributor', 'beta_tester', 'user', 'guest'));

    RAISE NOTICE '✅ Columna tier creada en profiles (para roles de usuario)';

    -- Crear índice para optimizar queries que filtren por tier
    CREATE INDEX IF NOT EXISTS idx_profiles_tier ON public.profiles(tier);

    RAISE NOTICE '✅ Índice idx_profiles_tier creado';
  ELSE
    RAISE NOTICE '✅ Columna tier ya existe en profiles';
  END IF;
END $$;

-- ============================================================
-- PASO 1: Marcar a lesistern@gmail.com como admin
-- ============================================================

UPDATE public.profiles
SET tier = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'lesistern@gmail.com');

RAISE NOTICE '✅ Usuario lesistern@gmail.com marcado como admin';

-- ============================================================
-- PASO 2: Modificar vista del leaderboard para excluir admins
-- ============================================================

DROP VIEW IF EXISTS public.v_level_leaderboard;

CREATE OR REPLACE VIEW public.v_level_leaderboard AS
SELECT
  p.id,
  p.display_name,
  p.username_slug,
  p.avatar_url,
  p.experience_points,
  p.level,
  ul.title AS level_title,
  ul.tier AS level_tier,
  p.exp_to_next_level,
  (
    SELECT xp_required
    FROM public.user_levels
    WHERE level = LEAST(p.level + 1, 20)
  ) AS next_level_xp,
  p.reports_submitted,
  p.reports_resolved,
  p.total_votes_received,
  CASE
    WHEN p.reports_submitted > 0 THEN
      ROUND((p.reports_resolved::NUMERIC / p.reports_submitted::NUMERIC) * 100)
    ELSE 0
  END AS resolution_rate,
  ROW_NUMBER() OVER (ORDER BY p.level DESC, p.experience_points DESC) AS rank
FROM public.profiles p
LEFT JOIN public.user_levels ul ON p.level = ul.level
WHERE COALESCE(p.tier, 'user') != 'admin'  -- ✨ Excluir admins (usa COALESCE por si tier es NULL)
ORDER BY p.level DESC, p.experience_points DESC
LIMIT 100;

COMMENT ON VIEW public.v_level_leaderboard IS 'Top 100 usuarios por nivel y experiencia (excluye admins)';

-- ============================================================
-- PASO 3: Dar nivel máximo (355,000 XP) a lesistern@gmail.com
-- ============================================================

DO $$
DECLARE
  v_user_id UUID;
  v_current_exp BIGINT;
  v_current_level INTEGER;
BEGIN
  -- Buscar el user_id desde auth.users
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = 'lesistern@gmail.com';

  IF v_user_id IS NULL THEN
    RAISE NOTICE '❌ Usuario lesistern@gmail.com no encontrado en auth.users';
  ELSE
    -- Obtener experiencia actual
    SELECT experience_points, level INTO v_current_exp, v_current_level
    FROM public.profiles
    WHERE id = v_user_id;

    RAISE NOTICE '✅ Usuario encontrado: %', v_user_id;
    RAISE NOTICE '📊 Experiencia actual: % XP (Nivel %)', v_current_exp, v_current_level;

    -- Actualizar a nivel máximo (355,000 XP)
    UPDATE public.profiles
    SET experience_points = 355000
    WHERE id = v_user_id;

    RAISE NOTICE '🎉 ¡Actualizado! Nuevo nivel: 20 - "Leyenda viviente" (355,000 XP)';
  END IF;
END $$;

-- ============================================================
-- PASO 4: Verificación
-- ============================================================

-- Ver el leaderboard actualizado (sin admins)
SELECT
  rank,
  display_name,
  level,
  level_title,
  level_tier,
  experience_points,
  reports_submitted,
  resolution_rate
FROM v_level_leaderboard
LIMIT 10;

-- Ver el perfil del admin actualizado (NO aparecerá en leaderboard)
SELECT
  display_name,
  level,
  ul.title AS level_title,
  ul.tier AS level_tier,
  experience_points,
  exp_to_next_level,
  p.tier AS user_tier
FROM public.profiles p
LEFT JOIN public.user_levels ul ON p.level = ul.level
WHERE id = (SELECT id FROM auth.users WHERE email = 'lesistern@gmail.com');

-- Verificar la estructura de la columna tier
SELECT
  column_name,
  data_type,
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'profiles'
  AND column_name = 'tier';
