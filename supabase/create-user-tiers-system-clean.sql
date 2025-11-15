-- Sistema de Tiers de Usuario para Colaboración en Traducciones
-- Fecha: 2025-11-14
-- VERSIÓN LIMPIA: Sin conflictos con vistas existentes

-- ============================================================================
-- 0. TABLA DE IDIOMAS (PREREQUISITO)
-- ============================================================================

CREATE TABLE IF NOT EXISTS languages (
  code VARCHAR(5) PRIMARY KEY,
  name TEXT NOT NULL,
  native_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertar idiomas iniciales
INSERT INTO languages (code, name, native_name) VALUES
  ('en', 'English', 'English'),
  ('es', 'Spanish', 'Español'),
  ('pt', 'Portuguese', 'Português'),
  ('fr', 'French', 'Français'),
  ('de', 'German', 'Deutsch')
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- 1. TABLA DE TIERS
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_tiers (
  code VARCHAR(20) PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  can_translate BOOLEAN DEFAULT false,
  can_review BOOLEAN DEFAULT false,
  can_approve BOOLEAN DEFAULT false,
  max_edits_per_day INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertar tiers predefinidos
INSERT INTO user_tiers (code, name, description, can_translate, can_review, can_approve, max_edits_per_day) VALUES
  ('guest', 'Invitado', 'Usuario no registrado, solo lectura', false, false, false, 0),
  ('user', 'Usuario', 'Usuario registrado básico', false, false, false, 0),
  ('contributor', 'Colaborador', 'Puede sugerir correcciones', true, false, false, 10),
  ('translator', 'Traductor', 'Puede editar traducciones directamente', true, true, false, 50),
  ('reviewer', 'Revisor', 'Puede revisar y aprobar traducciones', true, true, true, 100),
  ('admin', 'Administrador', 'Acceso completo', true, true, true, NULL)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  can_translate = EXCLUDED.can_translate,
  can_review = EXCLUDED.can_review,
  can_approve = EXCLUDED.can_approve,
  max_edits_per_day = EXCLUDED.max_edits_per_day;

-- ============================================================================
-- 2. EXTENDER TABLA DE USUARIOS (usando auth.users de Supabase)
-- ============================================================================

-- Crear tabla de perfiles si no existe
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tier_code VARCHAR(20) NOT NULL DEFAULT 'user' REFERENCES user_tiers(code),
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  preferred_language VARCHAR(5) DEFAULT 'es',
  translations_submitted INTEGER DEFAULT 0,
  translations_approved INTEGER DEFAULT 0,
  reviews_completed INTEGER DEFAULT 0,
  reputation_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_active_at TIMESTAMP WITH TIME ZONE
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_profiles_tier ON public.profiles(tier_code);
CREATE INDEX IF NOT EXISTS idx_profiles_reputation ON public.profiles(reputation_points DESC);

-- ============================================================================
-- 3. TRIGGER PARA AUTO-CREAR PERFILES
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, tier_code)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    'user'
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Si el perfil ya existe, no hacer nada
    RETURN NEW;
END;
$$;

-- Eliminar trigger existente si existe y crear nuevo
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 4. TABLA DE EDICIONES/CORRECCIONES DE TRADUCCIONES
-- ============================================================================

CREATE TABLE IF NOT EXISTS translation_edits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code),
  field_name VARCHAR(50) NOT NULL,
  old_value TEXT,
  new_value TEXT NOT NULL,
  submitted_by UUID REFERENCES public.profiles(id),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending',
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_comment TEXT,
  translation_method VARCHAR(20),
  confidence_score DECIMAL(3,2),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_translation_edits_entity ON translation_edits(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_translation_edits_status ON translation_edits(status);
CREATE INDEX IF NOT EXISTS idx_translation_edits_user ON translation_edits(submitted_by);
CREATE INDEX IF NOT EXISTS idx_translation_edits_language ON translation_edits(language_code);

-- ============================================================================
-- 5. TABLA DE VOTOS COMUNITARIOS
-- ============================================================================

CREATE TABLE IF NOT EXISTS translation_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edit_id UUID NOT NULL REFERENCES translation_edits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  vote SMALLINT NOT NULL CHECK (vote IN (-1, 1)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(edit_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_translation_votes_edit ON translation_votes(edit_id);

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_edits ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_votes ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Perfiles públicos visibles para todos" ON public.profiles;
DROP POLICY IF EXISTS "Usuarios pueden actualizar su propio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Ediciones visibles para todos" ON translation_edits;
DROP POLICY IF EXISTS "Usuarios con tier traductor+ pueden crear ediciones" ON translation_edits;
DROP POLICY IF EXISTS "Usuarios pueden actualizar sus propias ediciones pendientes" ON translation_edits;
DROP POLICY IF EXISTS "Votos visibles para todos" ON translation_votes;
DROP POLICY IF EXISTS "Usuarios registrados pueden votar" ON translation_votes;

-- Crear políticas
CREATE POLICY "Perfiles públicos visibles para todos"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Usuarios pueden actualizar su propio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Ediciones visibles para todos"
  ON translation_edits FOR SELECT
  USING (true);

CREATE POLICY "Usuarios con tier traductor+ pueden crear ediciones"
  ON translation_edits FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      JOIN user_tiers ut ON p.tier_code = ut.code
      WHERE p.id = auth.uid()
        AND ut.can_translate = true
    )
  );

CREATE POLICY "Usuarios pueden actualizar sus propias ediciones pendientes"
  ON translation_edits FOR UPDATE
  USING (
    submitted_by = auth.uid()
    AND status = 'pending'
  );

CREATE POLICY "Votos visibles para todos"
  ON translation_votes FOR SELECT
  USING (true);

CREATE POLICY "Usuarios registrados pueden votar"
  ON translation_votes FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND user_id = auth.uid()
  );

-- ============================================================================
-- 7. FUNCIONES AUXILIARES
-- ============================================================================

CREATE OR REPLACE FUNCTION check_user_permission(
  p_user_id UUID,
  p_permission TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  v_has_permission BOOLEAN;
BEGIN
  SELECT
    CASE p_permission
      WHEN 'can_translate' THEN ut.can_translate
      WHEN 'can_review' THEN ut.can_review
      WHEN 'can_approve' THEN ut.can_approve
      ELSE false
    END INTO v_has_permission
  FROM public.profiles p
  JOIN user_tiers ut ON p.tier_code = ut.code
  WHERE p.id = p_user_id;

  RETURN COALESCE(v_has_permission, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION approve_translation_edit(
  p_edit_id UUID,
  p_reviewer_id UUID
)
RETURNS VOID AS $$
DECLARE
  v_submitted_by UUID;
BEGIN
  IF NOT check_user_permission(p_reviewer_id, 'can_approve') THEN
    RAISE EXCEPTION 'Usuario no tiene permisos para aprobar traducciones';
  END IF;

  SELECT submitted_by INTO v_submitted_by
  FROM translation_edits
  WHERE id = p_edit_id AND status = 'pending';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Edición no encontrada o ya procesada';
  END IF;

  UPDATE translation_edits
  SET
    status = 'approved',
    reviewed_by = p_reviewer_id,
    reviewed_at = CURRENT_TIMESTAMP
  WHERE id = p_edit_id;

  UPDATE public.profiles
  SET
    translations_approved = translations_approved + 1,
    reputation_points = reputation_points + 10
  WHERE id = v_submitted_by;

  UPDATE public.profiles
  SET reviews_completed = reviews_completed + 1
  WHERE id = p_reviewer_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 8. TRIGGER PARA ACTUALIZAR updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 9. VISTA DE ESTADÍSTICAS DE TRADUCCIONES
-- ============================================================================

DROP VIEW IF EXISTS v_translation_stats;
CREATE OR REPLACE VIEW v_translation_stats AS
SELECT
  language_code,
  entity_type,
  COUNT(*) FILTER (WHERE status = 'pending') AS pending_edits,
  COUNT(*) FILTER (WHERE status = 'approved') AS approved_edits,
  COUNT(*) FILTER (WHERE status = 'rejected') AS rejected_edits,
  COUNT(DISTINCT submitted_by) AS contributors
FROM translation_edits
GROUP BY language_code, entity_type;

-- ============================================================================
-- 10. VISTA DE TOP CONTRIBUIDORES
-- ============================================================================

DROP VIEW IF EXISTS v_top_contributors;
CREATE OR REPLACE VIEW v_top_contributors AS
SELECT
  p.id,
  p.display_name,
  p.tier_code,
  ut.name AS tier_name,
  p.translations_submitted,
  p.translations_approved,
  p.reviews_completed,
  p.reputation_points,
  CASE
    WHEN p.translations_submitted > 0
    THEN ROUND((p.translations_approved::DECIMAL / p.translations_submitted) * 100, 2)
    ELSE 0
  END AS approval_rate
FROM public.profiles p
JOIN user_tiers ut ON p.tier_code = ut.code
WHERE p.translations_submitted > 0
ORDER BY p.reputation_points DESC, p.translations_approved DESC
LIMIT 100;

-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================

-- Mostrar resumen
DO $$
BEGIN
  RAISE NOTICE 'Sistema de tiers de usuario creado exitosamente';
END $$;
