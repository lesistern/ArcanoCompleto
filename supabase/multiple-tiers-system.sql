-- ============================================================================
-- SISTEMA DE MÚLTIPLES TIERS POR USUARIO
-- ============================================================================
--
-- Este script convierte el sistema de un solo tier por usuario a múltiples tiers
-- Ejemplo: Un usuario puede ser "beta_tester" + "mod" + "editor" simultáneamente
--
-- Ejecutar en: Supabase SQL Editor
-- ============================================================================

-- 1. ACTUALIZAR TIER "MOD" PARA EDICIONES ILIMITADAS
-- ============================================================================

UPDATE user_tiers
SET
  max_edits_per_day = NULL,
  description = 'Puede moderar, gestionar tickets y hacer ediciones ilimitadas'
WHERE code = 'mod';

-- 2. AGREGAR NUEVOS TIERS
-- ============================================================================

INSERT INTO user_tiers (code, name, description, can_translate, can_review, can_approve, max_edits_per_day) VALUES
  ('beta_tester', 'Beta Tester', 'Usuario de pruebas con acceso a funcionalidades beta', false, false, false, 5),
  ('editor', 'Editor', 'Puede editar contenido y traducciones', true, false, false, 30)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  can_translate = EXCLUDED.can_translate,
  can_review = EXCLUDED.can_review,
  can_approve = EXCLUDED.can_approve,
  max_edits_per_day = EXCLUDED.max_edits_per_day;

-- 3. CREAR TABLA DE ASIGNACIONES DE TIERS (MANY-TO-MANY)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.user_tier_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tier_code VARCHAR(20) NOT NULL REFERENCES user_tiers(code) ON DELETE CASCADE,
  assigned_by UUID REFERENCES public.profiles(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  notes TEXT, -- Notas sobre por qué se asignó este tier

  -- Un usuario no puede tener el mismo tier dos veces
  UNIQUE(user_id, tier_code)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_user_tier_assignments_user ON public.user_tier_assignments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tier_assignments_tier ON public.user_tier_assignments(tier_code);

-- Habilitar RLS
ALTER TABLE public.user_tier_assignments ENABLE ROW LEVEL SECURITY;

-- Policy: Todos pueden ver las asignaciones (es información pública)
CREATE POLICY "Asignaciones de tiers visibles para todos"
  ON public.user_tier_assignments FOR SELECT
  USING (true);

-- Policy: Solo admin/mod pueden asignar tiers
CREATE POLICY "Solo admin/mod pueden asignar tiers"
  ON public.user_tier_assignments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_tier_assignments uta
      JOIN user_tiers ut ON uta.tier_code = ut.code
      WHERE uta.user_id = auth.uid()
        AND uta.tier_code IN ('admin', 'mod')
    )
  );

-- Policy: Solo admin/mod pueden remover tiers
CREATE POLICY "Solo admin/mod pueden remover tiers"
  ON public.user_tier_assignments FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_tier_assignments uta
      JOIN user_tiers ut ON uta.tier_code = ut.code
      WHERE uta.user_id = auth.uid()
        AND uta.tier_code IN ('admin', 'mod')
    )
  );

-- 4. MIGRAR DATOS EXISTENTES
-- ============================================================================

-- Copiar tier_code actual de cada usuario a la tabla de asignaciones
INSERT INTO public.user_tier_assignments (user_id, tier_code, assigned_at, notes)
SELECT
  id,
  tier_code,
  created_at,
  'Migrado automáticamente del sistema anterior'
FROM public.profiles
WHERE tier_code IS NOT NULL
ON CONFLICT (user_id, tier_code) DO NOTHING;

-- 5. CREAR FUNCIONES ACTUALIZADAS PARA MÚLTIPLES TIERS
-- ============================================================================

-- Función: Obtener todos los tiers de un usuario
CREATE OR REPLACE FUNCTION public.get_user_tiers(p_user_id UUID)
RETURNS TABLE (
  tier_code VARCHAR(20),
  tier_name TEXT,
  can_translate BOOLEAN,
  can_review BOOLEAN,
  can_approve BOOLEAN,
  max_edits_per_day INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ut.code,
    ut.name,
    ut.can_translate,
    ut.can_review,
    ut.can_approve,
    ut.max_edits_per_day
  FROM public.user_tier_assignments uta
  JOIN user_tiers ut ON uta.tier_code = ut.code
  WHERE uta.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función: Verificar si un usuario tiene un tier específico
CREATE OR REPLACE FUNCTION public.user_has_tier(
  p_user_id UUID,
  p_tier_code VARCHAR(20)
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_tier_assignments
    WHERE user_id = p_user_id AND tier_code = p_tier_code
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función: Verificar si un usuario tiene al menos uno de varios tiers
CREATE OR REPLACE FUNCTION public.user_has_any_tier(
  p_user_id UUID,
  p_tier_codes VARCHAR(20)[]
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_tier_assignments
    WHERE user_id = p_user_id AND tier_code = ANY(p_tier_codes)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función: Verificar si un usuario tiene permiso (considerando TODOS sus tiers)
CREATE OR REPLACE FUNCTION public.user_has_permission(
  p_user_id UUID,
  p_permission TEXT -- 'can_translate', 'can_review', 'can_approve'
)
RETURNS BOOLEAN AS $$
DECLARE
  v_has_permission BOOLEAN;
BEGIN
  -- Si el usuario tiene al menos UN tier con el permiso, retorna true
  SELECT EXISTS (
    SELECT 1
    FROM public.user_tier_assignments uta
    JOIN user_tiers ut ON uta.tier_code = ut.code
    WHERE uta.user_id = p_user_id
      AND CASE p_permission
        WHEN 'can_translate' THEN ut.can_translate
        WHEN 'can_review' THEN ut.can_review
        WHEN 'can_approve' THEN ut.can_approve
        ELSE false
      END = true
  ) INTO v_has_permission;

  RETURN COALESCE(v_has_permission, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función: Obtener el límite de ediciones por día (toma el MÁXIMO de todos los tiers)
CREATE OR REPLACE FUNCTION public.get_user_max_edits_per_day(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_max_edits INTEGER;
BEGIN
  -- Si algún tier tiene NULL (ilimitado), retorna NULL
  IF EXISTS (
    SELECT 1
    FROM public.user_tier_assignments uta
    JOIN user_tiers ut ON uta.tier_code = ut.code
    WHERE uta.user_id = p_user_id AND ut.max_edits_per_day IS NULL
  ) THEN
    RETURN NULL; -- Ilimitado
  END IF;

  -- De lo contrario, retorna el máximo
  SELECT MAX(ut.max_edits_per_day)
  INTO v_max_edits
  FROM public.user_tier_assignments uta
  JOIN user_tiers ut ON uta.tier_code = ut.code
  WHERE uta.user_id = p_user_id;

  RETURN COALESCE(v_max_edits, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función: Asignar un tier a un usuario
CREATE OR REPLACE FUNCTION public.assign_tier_to_user(
  p_user_id UUID,
  p_tier_code VARCHAR(20),
  p_notes TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  v_current_user UUID;
  v_is_admin_or_mod BOOLEAN;
BEGIN
  v_current_user := auth.uid();

  -- Verificar que el usuario actual es admin o mod
  SELECT public.user_has_any_tier(v_current_user, ARRAY['admin', 'mod'])
  INTO v_is_admin_or_mod;

  IF NOT v_is_admin_or_mod THEN
    RAISE EXCEPTION 'Solo admin y moderadores pueden asignar tiers';
  END IF;

  -- Insertar la asignación
  INSERT INTO public.user_tier_assignments (user_id, tier_code, assigned_by, notes)
  VALUES (p_user_id, p_tier_code, v_current_user, p_notes)
  ON CONFLICT (user_id, tier_code) DO NOTHING;

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función: Remover un tier de un usuario
CREATE OR REPLACE FUNCTION public.remove_tier_from_user(
  p_user_id UUID,
  p_tier_code VARCHAR(20)
)
RETURNS BOOLEAN AS $$
DECLARE
  v_current_user UUID;
  v_is_admin_or_mod BOOLEAN;
BEGIN
  v_current_user := auth.uid();

  -- Verificar que el usuario actual es admin o mod
  SELECT public.user_has_any_tier(v_current_user, ARRAY['admin', 'mod'])
  INTO v_is_admin_or_mod;

  IF NOT v_is_admin_or_mod THEN
    RAISE EXCEPTION 'Solo admin y moderadores pueden remover tiers';
  END IF;

  -- No permitir remover el tier 'user' (tier base)
  IF p_tier_code = 'user' THEN
    RAISE EXCEPTION 'No se puede remover el tier base "user"';
  END IF;

  -- Remover la asignación
  DELETE FROM public.user_tier_assignments
  WHERE user_id = p_user_id AND tier_code = p_tier_code;

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. ACTUALIZAR FUNCIÓN HANDLE_NEW_USER PARA ASIGNAR TIER BASE
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Crear perfil
  INSERT INTO public.profiles (id, display_name, tier_code)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    'user' -- Mantener por compatibilidad
  );

  -- Asignar tier base 'user' automáticamente
  INSERT INTO public.user_tier_assignments (user_id, tier_code, notes)
  VALUES (NEW.id, 'user', 'Tier base asignado automáticamente al registrarse');

  RETURN NEW;
END;
$$;

-- 7. CREAR VISTA PARA FACILITAR CONSULTAS
-- ============================================================================

CREATE OR REPLACE VIEW v_users_with_tiers AS
SELECT
  p.id,
  p.display_name,
  p.avatar_url,
  p.bio,
  p.tier_code, -- Tier principal (por compatibilidad)
  p.reputation_points,
  p.translations_submitted,
  p.translations_approved,
  p.reviews_completed,
  p.created_at,
  p.last_active_at,
  -- Array de todos los tiers del usuario
  ARRAY_AGG(uta.tier_code) FILTER (WHERE uta.tier_code IS NOT NULL) AS all_tiers,
  -- Array de nombres de tiers
  ARRAY_AGG(ut.name) FILTER (WHERE ut.name IS NOT NULL) AS tier_names,
  -- Permisos (TRUE si tiene al menos un tier con el permiso)
  BOOL_OR(ut.can_translate) AS can_translate,
  BOOL_OR(ut.can_review) AS can_review,
  BOOL_OR(ut.can_approve) AS can_approve,
  -- Máximo de ediciones por día (NULL si ilimitado)
  CASE
    WHEN BOOL_OR(ut.max_edits_per_day IS NULL) THEN NULL
    ELSE MAX(ut.max_edits_per_day)
  END AS max_edits_per_day
FROM public.profiles p
LEFT JOIN public.user_tier_assignments uta ON p.id = uta.user_id
LEFT JOIN user_tiers ut ON uta.tier_code = ut.code
GROUP BY p.id, p.display_name, p.avatar_url, p.bio, p.tier_code, p.reputation_points,
         p.translations_submitted, p.translations_approved, p.reviews_completed,
         p.created_at, p.last_active_at;

-- 8. ACTUALIZAR FUNCIONES DE FEEDBACK PARA MÚLTIPLES TIERS
-- ============================================================================

-- Actualizar is_admin_or_mod para usar múltiples tiers
CREATE OR REPLACE FUNCTION public.is_admin_or_mod(user_id UUID DEFAULT NULL)
RETURNS BOOLEAN AS $$
DECLARE
  target_user_id UUID;
BEGIN
  target_user_id := COALESCE(user_id, auth.uid());
  RETURN public.user_has_any_tier(target_user_id, ARRAY['admin', 'mod']);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. COMENTARIOS
-- ============================================================================

COMMENT ON TABLE public.user_tier_assignments IS 'Asignaciones de tiers a usuarios (many-to-many)';
COMMENT ON FUNCTION public.get_user_tiers(UUID) IS 'Obtiene todos los tiers de un usuario';
COMMENT ON FUNCTION public.user_has_tier(UUID, VARCHAR) IS 'Verifica si un usuario tiene un tier específico';
COMMENT ON FUNCTION public.user_has_any_tier(UUID, VARCHAR[]) IS 'Verifica si un usuario tiene al menos uno de varios tiers';
COMMENT ON FUNCTION public.user_has_permission(UUID, TEXT) IS 'Verifica si un usuario tiene un permiso (considerando todos sus tiers)';
COMMENT ON FUNCTION public.assign_tier_to_user(UUID, VARCHAR, TEXT) IS 'Asigna un tier a un usuario (solo admin/mod)';
COMMENT ON FUNCTION public.remove_tier_from_user(UUID, VARCHAR) IS 'Remueve un tier de un usuario (solo admin/mod)';

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================

-- Ver todos los tiers disponibles
SELECT
  'Tiers disponibles' AS info,
  code,
  name,
  can_translate,
  can_review,
  can_approve,
  max_edits_per_day
FROM user_tiers
ORDER BY
  CASE code
    WHEN 'guest' THEN 1
    WHEN 'user' THEN 2
    WHEN 'beta_tester' THEN 3
    WHEN 'contributor' THEN 4
    WHEN 'editor' THEN 5
    WHEN 'translator' THEN 6
    WHEN 'reviewer' THEN 7
    WHEN 'mod' THEN 8
    WHEN 'admin' THEN 9
  END;

-- Ver usuarios con múltiples tiers (si existen)
SELECT
  display_name,
  all_tiers,
  tier_names,
  can_translate,
  can_review,
  can_approve,
  max_edits_per_day
FROM v_users_with_tiers
LIMIT 10;

-- ============================================================================
-- NOTAS DE USO
-- ============================================================================
--
-- Asignar múltiples tiers a un usuario:
-- SELECT public.assign_tier_to_user('user-uuid', 'beta_tester', 'Usuario de pruebas activo');
-- SELECT public.assign_tier_to_user('user-uuid', 'mod', 'Promovido a moderador');
-- SELECT public.assign_tier_to_user('user-uuid', 'editor', 'Excelente contribuidor');
--
-- Remover un tier:
-- SELECT public.remove_tier_from_user('user-uuid', 'beta_tester');
--
-- Ver tiers de un usuario:
-- SELECT * FROM public.get_user_tiers('user-uuid');
--
-- Verificar permisos:
-- SELECT public.user_has_permission('user-uuid', 'can_translate'); -- true/false
-- SELECT public.user_has_tier('user-uuid', 'mod'); -- true/false
-- SELECT public.user_has_any_tier('user-uuid', ARRAY['admin', 'mod']); -- true/false
--
-- ============================================================================
