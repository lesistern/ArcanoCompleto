-- =====================================================
-- Sistema de Perfiles Públicos
-- =====================================================
-- Páginas de perfil visibles con opción de ocultarse
-- Admins y moderadores pueden ver perfiles ocultos
-- =====================================================

-- 1. Agregar columnas necesarias
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS profile_hidden BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS username_slug TEXT,
ADD COLUMN IF NOT EXISTS karma_points INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS reports_submitted INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS reports_resolved INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_votes_received INTEGER DEFAULT 0;

-- 2. Generar slugs únicos basados en display_name o email
UPDATE public.profiles p
SET username_slug = LOWER(
  REGEXP_REPLACE(
    COALESCE(
      p.display_name,
      SPLIT_PART(u.email, '@', 1),
      'user-' || SUBSTR(p.id::TEXT, 1, 8)
    ),
    '[^a-zA-Z0-9]',
    '-',
    'g'
  )
)
FROM auth.users u
WHERE p.id = u.id
  AND p.username_slug IS NULL;

-- 3. Asegurar que los slugs sean únicos
-- Si hay duplicados, agregar números al final
DO $$
DECLARE
  profile_record RECORD;
  new_slug TEXT;
  counter INTEGER;
BEGIN
  FOR profile_record IN
    SELECT id, username_slug
    FROM profiles
    WHERE username_slug IS NOT NULL
  LOOP
    counter := 1;
    new_slug := profile_record.username_slug;

    -- Verificar si el slug ya existe
    WHILE EXISTS (
      SELECT 1 FROM profiles
      WHERE username_slug = new_slug
      AND id != profile_record.id
    ) LOOP
      new_slug := profile_record.username_slug || '-' || counter;
      counter := counter + 1;
    END LOOP;

    -- Actualizar si cambió
    IF new_slug != profile_record.username_slug THEN
      UPDATE profiles
      SET username_slug = new_slug
      WHERE id = profile_record.id;
    END IF;
  END LOOP;
END;
$$;

-- 4. Hacer username_slug único y no nulo
ALTER TABLE public.profiles
ALTER COLUMN username_slug SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_username_slug ON public.profiles(username_slug);

-- 5. Función para generar slug único automáticamente
CREATE OR REPLACE FUNCTION generate_unique_username_slug()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 1;
  user_email TEXT;
BEGIN
  -- Obtener email del usuario desde auth.users
  SELECT email INTO user_email
  FROM auth.users
  WHERE id = NEW.id;

  -- Generar slug base desde display_name o email
  base_slug := LOWER(
    REGEXP_REPLACE(
      COALESCE(
        NEW.display_name,
        SPLIT_PART(user_email, '@', 1),
        'user-' || SUBSTR(NEW.id::TEXT, 1, 8)
      ),
      '[^a-zA-Z0-9]',
      '-',
      'g'
    )
  );

  final_slug := base_slug;

  -- Asegurar unicidad
  WHILE EXISTS (
    SELECT 1 FROM profiles
    WHERE username_slug = final_slug
    AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
  ) LOOP
    final_slug := base_slug || '-' || counter;
    counter := counter + 1;
  END LOOP;

  NEW.username_slug := final_slug;

  RETURN NEW;
END;
$$;

-- 6. Triggers para generar slug automáticamente
-- Trigger para INSERT: solo si username_slug es NULL
DROP TRIGGER IF EXISTS trigger_generate_username_slug_insert ON public.profiles;
CREATE TRIGGER trigger_generate_username_slug_insert
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  WHEN (NEW.username_slug IS NULL)
  EXECUTE FUNCTION generate_unique_username_slug();

-- Trigger para UPDATE: solo si display_name cambió
DROP TRIGGER IF EXISTS trigger_generate_username_slug_update ON public.profiles;
CREATE TRIGGER trigger_generate_username_slug_update
  BEFORE UPDATE OF display_name ON public.profiles
  FOR EACH ROW
  WHEN (OLD.display_name IS DISTINCT FROM NEW.display_name)
  EXECUTE FUNCTION generate_unique_username_slug();

-- 7. Actualizar RLS para perfiles
-- Eliminar políticas antiguas
DROP POLICY IF EXISTS "Perfiles públicos visibles para todos" ON public.profiles;
DROP POLICY IF EXISTS "Usuarios pueden ver su propio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Usuarios pueden actualizar su propio perfil" ON public.profiles;

-- Crear nuevas políticas con lógica de perfil oculto
CREATE POLICY "Perfiles públicos visibles para todos"
  ON public.profiles
  FOR SELECT
  USING (
    -- Perfil no oculto - visible para todos
    profile_hidden = false
    OR
    -- Es el dueño del perfil
    auth.uid() = id
    OR
    -- Es admin o reviewer (pueden ver perfiles ocultos)
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.tier_code IN ('admin', 'reviewer')
    )
  );

CREATE POLICY "Usuarios pueden actualizar su propio perfil"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 8. Vista de perfil público (sin datos sensibles)
CREATE OR REPLACE VIEW v_public_profiles AS
SELECT
  p.id,
  p.username_slug,
  p.display_name,
  p.tier_code,
  p.karma_points,
  p.reports_submitted,
  p.reports_resolved,
  p.total_votes_received,
  p.profile_hidden,
  p.created_at,
  -- Ocultar email completamente
  NULL::TEXT AS email,
  -- Calcular estadísticas
  CASE
    WHEN p.reports_submitted > 0 THEN
      ROUND((p.reports_resolved::NUMERIC / p.reports_submitted::NUMERIC) * 100, 1)
    ELSE 0
  END AS success_rate,
  CASE
    WHEN p.reports_submitted > 0 THEN
      ROUND(p.total_votes_received::NUMERIC / p.reports_submitted::NUMERIC, 1)
    ELSE 0
  END AS avg_votes_per_report,
  -- Ranking
  (
    SELECT COUNT(*) + 1
    FROM profiles
    WHERE karma_points > p.karma_points
  )::INTEGER AS karma_rank
FROM profiles p
WHERE
  -- Solo mostrar si no está oculto o si tienes permiso
  p.profile_hidden = false
  OR p.id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM profiles admin
    WHERE admin.id = auth.uid()
    AND admin.tier_code IN ('admin', 'reviewer')
  );

-- 9. Función para obtener perfil por username
CREATE OR REPLACE FUNCTION get_profile_by_username(p_username_slug TEXT)
RETURNS TABLE(
  id UUID,
  username_slug TEXT,
  display_name TEXT,
  tier_code TEXT,
  karma_points INTEGER,
  reports_submitted INTEGER,
  reports_resolved INTEGER,
  total_votes_received INTEGER,
  profile_hidden BOOLEAN,
  created_at TIMESTAMPTZ,
  success_rate NUMERIC,
  avg_votes_per_report NUMERIC,
  karma_rank INTEGER,
  can_view BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  profile_owner_id UUID;
  current_user_tier TEXT;
BEGIN
  -- Obtener ID del dueño del perfil
  SELECT p.id INTO profile_owner_id
  FROM profiles p
  WHERE p.username_slug = p_username_slug;

  IF profile_owner_id IS NULL THEN
    RAISE EXCEPTION 'Perfil no encontrado';
  END IF;

  -- Obtener tier del usuario actual
  IF auth.uid() IS NOT NULL THEN
    SELECT p.tier_code INTO current_user_tier
    FROM profiles p
    WHERE p.id = auth.uid();
  END IF;

  -- Retornar datos del perfil
  RETURN QUERY
  SELECT
    p.id,
    p.username_slug,
    p.display_name,
    p.tier_code,
    p.karma_points,
    p.reports_submitted,
    p.reports_resolved,
    p.total_votes_received,
    p.profile_hidden,
    p.created_at,
    CASE
      WHEN p.reports_submitted > 0 THEN
        ROUND((p.reports_resolved::NUMERIC / p.reports_submitted::NUMERIC) * 100, 1)
      ELSE 0
    END AS success_rate,
    CASE
      WHEN p.reports_submitted > 0 THEN
        ROUND(p.total_votes_received::NUMERIC / p.reports_submitted::NUMERIC, 1)
      ELSE 0
    END AS avg_votes_per_report,
    (
      SELECT COUNT(*) + 1::INTEGER
      FROM profiles
      WHERE karma_points > p.karma_points
    ) AS karma_rank,
    -- Determinar si puede ver este perfil
    (
      p.profile_hidden = false
      OR p.id = auth.uid()
      OR current_user_tier IN ('admin', 'reviewer')
    ) AS can_view
  FROM profiles p
  WHERE p.id = profile_owner_id;
END;
$$;

-- 10. Vista de reportes del usuario (para página de perfil)
CREATE OR REPLACE VIEW v_user_public_reports AS
SELECT
  ft.id,
  ft.user_id,
  ft.title,
  ft.category,
  ft.priority,
  ft.status,
  ft.created_at,
  COALESCE(vote_counts.vote_count, 0) AS vote_count,
  p.username_slug AS author_username,
  p.display_name AS author_display_name
FROM feedback_tickets ft
JOIN profiles p ON ft.user_id = p.id
LEFT JOIN (
  SELECT ticket_id, COUNT(*) AS vote_count
  FROM feedback_votes
  GROUP BY ticket_id
) vote_counts ON ft.id = vote_counts.ticket_id
WHERE
  -- Solo mostrar reportes de perfiles públicos o si tienes permiso
  p.profile_hidden = false
  OR p.id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM profiles admin
    WHERE admin.id = auth.uid()
    AND admin.tier_code IN ('admin', 'reviewer')
  );

-- 11. Comentarios
COMMENT ON COLUMN profiles.profile_hidden IS 'Si es true, el perfil solo es visible para el dueño y admins/reviewers';
COMMENT ON COLUMN profiles.username_slug IS 'Slug único para URL del perfil (/u/username-slug)';

-- 12. Función para toggle profile visibility
CREATE OR REPLACE FUNCTION toggle_profile_visibility()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_status BOOLEAN;
BEGIN
  UPDATE profiles
  SET profile_hidden = NOT profile_hidden
  WHERE id = auth.uid()
  RETURNING profile_hidden INTO new_status;

  RETURN new_status;
END;
$$;

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================

-- Para verificar:
-- SELECT * FROM v_public_profiles ORDER BY karma_points DESC LIMIT 10;
-- SELECT * FROM get_profile_by_username('username-aqui');
-- SELECT toggle_profile_visibility(); -- Toggle tu propio perfil
