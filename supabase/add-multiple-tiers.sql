-- =====================================================
-- Sistema de Múltiples Tiers por Usuario
-- =====================================================
-- Permite asignar varios tiers simultáneamente
-- Protege tier admin de degradación
-- Solo admins pueden degradar reviewers
-- =====================================================

-- 1. Cambiar tier_code a tier_codes (array)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS tier_codes TEXT[] DEFAULT ARRAY['user']::TEXT[];

-- 2. Migrar datos existentes de tier_code a tier_codes
UPDATE public.profiles
SET tier_codes = ARRAY[tier_code]::TEXT[]
WHERE tier_codes = ARRAY['user']::TEXT[]
  AND tier_code IS NOT NULL;

-- 3. Función para verificar si el usuario es admin
CREATE OR REPLACE FUNCTION user_is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT 'admin' = ANY(tier_codes)
  FROM profiles
  WHERE id = user_id;
$$;

-- 4. Función para verificar si el usuario tiene un tier específico
CREATE OR REPLACE FUNCTION user_has_tier(user_id UUID, tier TEXT)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT tier = ANY(tier_codes)
  FROM profiles
  WHERE id = user_id;
$$;

-- 5. Función para agregar tier a un usuario
CREATE OR REPLACE FUNCTION add_tier_to_user(
  target_user_id UUID,
  new_tier TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_user_tiers TEXT[];
  is_current_user_admin BOOLEAN;
BEGIN
  -- Verificar si el usuario actual es admin
  SELECT 'admin' = ANY(tier_codes) INTO is_current_user_admin
  FROM profiles
  WHERE id = auth.uid();

  IF NOT is_current_user_admin THEN
    RAISE EXCEPTION 'Solo los administradores pueden asignar tiers';
  END IF;

  -- Obtener tiers actuales del usuario objetivo
  SELECT tier_codes INTO current_user_tiers
  FROM profiles
  WHERE id = target_user_id;

  -- Verificar si ya tiene el tier
  IF new_tier = ANY(current_user_tiers) THEN
    RETURN FALSE; -- Ya tiene el tier
  END IF;

  -- Agregar el nuevo tier
  UPDATE profiles
  SET tier_codes = array_append(tier_codes, new_tier)
  WHERE id = target_user_id;

  RETURN TRUE;
END;
$$;

-- 6. Función para remover tier de un usuario (con protecciones)
CREATE OR REPLACE FUNCTION remove_tier_from_user(
  target_user_id UUID,
  tier_to_remove TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_user_tiers TEXT[];
  target_user_tiers TEXT[];
  is_current_user_admin BOOLEAN;
  is_current_user_reviewer BOOLEAN;
BEGIN
  -- Verificar tiers del usuario actual
  SELECT tier_codes INTO current_user_tiers
  FROM profiles
  WHERE id = auth.uid();

  is_current_user_admin := 'admin' = ANY(current_user_tiers);
  is_current_user_reviewer := 'reviewer' = ANY(current_user_tiers);

  -- Obtener tiers del usuario objetivo
  SELECT tier_codes INTO target_user_tiers
  FROM profiles
  WHERE id = target_user_id;

  -- PROTECCIÓN 1: No se puede remover tier admin
  IF tier_to_remove = 'admin' THEN
    RAISE EXCEPTION 'El tier admin no puede ser removido por seguridad';
  END IF;

  -- PROTECCIÓN 2: Solo admins pueden remover reviewer
  IF tier_to_remove = 'reviewer' AND NOT is_current_user_admin THEN
    RAISE EXCEPTION 'Solo los administradores pueden remover el tier reviewer';
  END IF;

  -- PROTECCIÓN 3: Solo admins pueden modificar tiers
  IF NOT is_current_user_admin THEN
    RAISE EXCEPTION 'Solo los administradores pueden remover tiers';
  END IF;

  -- Verificar si el usuario tiene el tier
  IF NOT (tier_to_remove = ANY(target_user_tiers)) THEN
    RETURN FALSE; -- No tiene el tier
  END IF;

  -- Remover el tier
  UPDATE profiles
  SET tier_codes = array_remove(tier_codes, tier_to_remove)
  WHERE id = target_user_id;

  RETURN TRUE;
END;
$$;

-- 7. Función para obtener el tier más alto de un usuario
-- (para mantener compatibilidad con tier_code)
CREATE OR REPLACE FUNCTION get_highest_tier(tiers TEXT[])
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  IF 'admin' = ANY(tiers) THEN RETURN 'admin';
  ELSIF 'reviewer' = ANY(tiers) THEN RETURN 'reviewer';
  ELSIF 'translator' = ANY(tiers) THEN RETURN 'translator';
  ELSIF 'contributor' = ANY(tiers) THEN RETURN 'contributor';
  ELSIF 'beta_tester' = ANY(tiers) THEN RETURN 'beta_tester';
  ELSE RETURN 'user';
  END IF;
END;
$$;

-- 8. Actualizar columna tier_code para mantener compatibilidad
-- (se auto-calcula desde tier_codes)
CREATE OR REPLACE FUNCTION sync_tier_code()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.tier_code := get_highest_tier(NEW.tier_codes);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_sync_tier_code ON public.profiles;
CREATE TRIGGER trigger_sync_tier_code
  BEFORE INSERT OR UPDATE OF tier_codes ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION sync_tier_code();

-- 9. Actualizar función is_admin_or_reviewer para usar tier_codes
CREATE OR REPLACE FUNCTION is_admin_or_reviewer()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND ('admin' = ANY(tier_codes) OR 'reviewer' = ANY(tier_codes))
  );
$$;

-- 10. Vista para obtener usuarios con sus tiers
CREATE OR REPLACE VIEW v_users_with_tiers AS
SELECT
  p.id,
  u.email,
  p.display_name,
  p.username_slug,
  p.tier_code,
  p.tier_codes,
  p.karma_points,
  p.reports_submitted,
  p.reports_resolved,
  p.total_votes_received,
  p.created_at,
  -- Flags de tiers
  'admin' = ANY(p.tier_codes) AS is_admin,
  'reviewer' = ANY(p.tier_codes) AS is_reviewer,
  'translator' = ANY(p.tier_codes) AS is_translator,
  'contributor' = ANY(p.tier_codes) AS is_contributor,
  'beta_tester' = ANY(p.tier_codes) AS is_beta_tester
FROM profiles p
JOIN auth.users u ON p.id = u.id;

-- 11. Comentarios
COMMENT ON COLUMN profiles.tier_codes IS 'Array de tiers asignados al usuario (puede tener múltiples)';
COMMENT ON COLUMN profiles.tier_code IS 'Tier más alto del usuario (auto-calculado desde tier_codes para compatibilidad)';
COMMENT ON FUNCTION add_tier_to_user IS 'Agrega un tier a un usuario (solo admins)';
COMMENT ON FUNCTION remove_tier_from_user IS 'Remueve un tier (protege admin, reviewer solo admins)';

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================

-- Para verificar:
-- SELECT * FROM v_users_with_tiers;
-- SELECT add_tier_to_user('user-id-here', 'beta_tester');
-- SELECT remove_tier_from_user('user-id-here', 'beta_tester');
