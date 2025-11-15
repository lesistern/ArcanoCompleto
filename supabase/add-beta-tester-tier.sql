-- ============================================================================
-- SISTEMA DE BETA TESTERS - COMPATIBLE CON SISTEMA EXISTENTE
-- ============================================================================
--
-- Este script añade el tier 'beta_tester' a la tabla user_tiers existente
-- y crea funciones helper para gestionar beta testers.
--
-- IMPORTANTE: Compatible con sistema de tiers (tier_code) existente
--
-- Ejecutar en: Supabase SQL Editor
-- ============================================================================

-- 1. INSERTAR TIER 'beta_tester' EN user_tiers
-- ============================================================================
INSERT INTO public.user_tiers (code, name, description, can_translate, can_review, can_approve, max_edits_per_day)
VALUES (
  'beta_tester',
  'Beta Tester',
  'Usuario con acceso a la beta cerrada para pruebas y feedback. Ayuda a verificar estabilidad, información y traducciones.',
  false, -- No puede traducir
  false, -- No puede revisar
  false, -- No puede aprobar
  0      -- Sin límite (los beta testers no editan traducciones)
)
ON CONFLICT (code) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- 2. FUNCIÓN HELPER PARA VERIFICAR SI USUARIO ES BETA TESTER
-- ============================================================================
CREATE OR REPLACE FUNCTION public.is_beta_tester(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND tier_code IN ('beta_tester', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. FUNCIÓN HELPER PARA ASIGNAR TIER BETA_TESTER
-- ============================================================================
CREATE OR REPLACE FUNCTION public.assign_beta_tester(user_email TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  user_found BOOLEAN;
BEGIN
  UPDATE public.profiles
  SET tier_code = 'beta_tester'
  WHERE email = user_email;

  GET DIAGNOSTICS user_found = ROW_COUNT;

  RETURN user_found > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================
-- Verificar que el tier se creó correctamente
SELECT
  'Tier beta_tester creado' AS status,
  code,
  name,
  description
FROM public.user_tiers
WHERE code = 'beta_tester';

-- Contar beta testers actuales
SELECT
  'Beta testers actuales' AS status,
  COUNT(*) AS total
FROM public.profiles
WHERE tier_code = 'beta_tester';

-- ============================================================================
-- NOTAS DE USO
-- ============================================================================
--
-- Para asignar beta tester a un usuario existente:
-- SELECT public.assign_beta_tester('user@example.com');
--
-- Para asignar manualmente:
-- UPDATE public.profiles SET tier_code = 'beta_tester' WHERE email = 'user@example.com';
--
-- Para verificar si un usuario es beta tester:
-- SELECT public.is_beta_tester('uuid-del-usuario');
--
-- Para listar todos los beta testers:
-- SELECT email, display_name, tier_code FROM public.profiles WHERE tier_code = 'beta_tester';
--
-- ============================================================================
