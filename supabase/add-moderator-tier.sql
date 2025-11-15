-- ============================================================================
-- AGREGAR TIER "MOD" (MODERADOR) AL SISTEMA
-- ============================================================================
--
-- Este script agrega el tier "mod" (moderador) entre "reviewer" y "admin"
-- y actualiza las políticas RLS para dar acceso a mod/admin al sistema de feedback
--
-- Ejecutar en: Supabase SQL Editor
-- ============================================================================

-- 1. AGREGAR TIER "MOD" (MODERADOR)
-- ============================================================================

INSERT INTO user_tiers (code, name, description, can_translate, can_review, can_approve, max_edits_per_day) VALUES
  ('mod', 'Moderador', 'Puede moderar y gestionar tickets de feedback', true, true, true, 200)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  can_translate = EXCLUDED.can_translate,
  can_review = EXCLUDED.can_review,
  can_approve = EXCLUDED.can_approve,
  max_edits_per_day = EXCLUDED.max_edits_per_day;

-- ============================================================================
-- 2. ACTUALIZAR RLS POLICIES PARA INCLUIR MOD
-- ============================================================================

-- Policy: Moderadores y Admins pueden ver todos los tickets
DROP POLICY IF EXISTS "Admins can view all tickets" ON public.feedback_tickets;
CREATE POLICY "Admins and Mods can view all tickets"
  ON public.feedback_tickets
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND tier_code IN ('admin', 'mod')
    )
  );

-- Policy: Moderadores y Admins pueden actualizar cualquier ticket
DROP POLICY IF EXISTS "Admins can update all tickets" ON public.feedback_tickets;
CREATE POLICY "Admins and Mods can update all tickets"
  ON public.feedback_tickets
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND tier_code IN ('admin', 'mod')
    )
  );

-- ============================================================================
-- 3. ACTUALIZAR FUNCIONES PARA INCLUIR MOD
-- ============================================================================

-- Actualizar función close_ticket para permitir mods
CREATE OR REPLACE FUNCTION public.close_ticket(
  ticket_id UUID,
  notes TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  is_admin_or_mod BOOLEAN;
BEGIN
  -- Verificar si el usuario es admin o mod
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND tier_code IN ('admin', 'mod')
  ) INTO is_admin_or_mod;

  IF NOT is_admin_or_mod THEN
    RAISE EXCEPTION 'Only admins and moderators can close tickets';
  END IF;

  -- Cerrar el ticket
  UPDATE public.feedback_tickets
  SET
    status = 'resolved',
    resolved_at = NOW(),
    resolution_notes = notes
  WHERE id = ticket_id;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Actualizar función assign_ticket para permitir mods
CREATE OR REPLACE FUNCTION public.assign_ticket(
  ticket_id UUID,
  admin_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  is_admin_or_mod BOOLEAN;
  target_is_admin_or_mod BOOLEAN;
BEGIN
  -- Verificar si el usuario actual es admin o mod
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND tier_code IN ('admin', 'mod')
  ) INTO is_admin_or_mod;

  IF NOT is_admin_or_mod THEN
    RAISE EXCEPTION 'Only admins and moderators can assign tickets';
  END IF;

  -- Verificar si el target es admin o mod
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = admin_id AND tier_code IN ('admin', 'mod')
  ) INTO target_is_admin_or_mod;

  IF NOT target_is_admin_or_mod THEN
    RAISE EXCEPTION 'Can only assign to admin or moderator users';
  END IF;

  -- Asignar el ticket
  UPDATE public.feedback_tickets
  SET assigned_to = admin_id
  WHERE id = ticket_id;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 4. CREAR FUNCIÓN HELPER PARA VERIFICAR SI ES ADMIN/MOD
-- ============================================================================

CREATE OR REPLACE FUNCTION public.is_admin_or_mod(user_id UUID DEFAULT NULL)
RETURNS BOOLEAN AS $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Si no se pasa user_id, usar el usuario actual
  target_user_id := COALESCE(user_id, auth.uid());

  -- Verificar si el usuario es admin o mod
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = target_user_id AND tier_code IN ('admin', 'mod')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================

-- Verificar que el tier se creó
SELECT
  'Tier MOD agregado exitosamente' AS status,
  code,
  name,
  can_translate,
  can_review,
  can_approve,
  max_edits_per_day
FROM user_tiers
WHERE code = 'mod';

-- Verificar todos los tiers ordenados
SELECT
  'Tiers disponibles' AS info,
  code,
  name,
  max_edits_per_day
FROM user_tiers
ORDER BY
  CASE code
    WHEN 'guest' THEN 1
    WHEN 'user' THEN 2
    WHEN 'contributor' THEN 3
    WHEN 'translator' THEN 4
    WHEN 'reviewer' THEN 5
    WHEN 'mod' THEN 6
    WHEN 'admin' THEN 7
  END;

-- ============================================================================
-- NOTAS DE USO
-- ============================================================================
--
-- Para asignar tier MOD a un usuario:
-- UPDATE public.profiles
-- SET tier_code = 'mod'
-- WHERE id = 'user-uuid';
--
-- Para verificar si un usuario es admin o mod:
-- SELECT public.is_admin_or_mod('user-uuid');
--
-- ============================================================================
