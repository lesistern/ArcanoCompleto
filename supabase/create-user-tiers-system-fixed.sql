-- Sistema de Tiers de Usuario para Colaboración en Traducciones
-- Fecha: 2025-11-14
-- VERSIÓN CORREGIDA: Incluye tabla languages

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

-- Nota: Supabase Auth proporciona automáticamente la tabla auth.users
-- Creamos una tabla de perfiles públicos siguiendo las mejores prácticas

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tier_code VARCHAR(20) NOT NULL DEFAULT 'user' REFERENCES user_tiers(code),

  -- Información pública del usuario
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  preferred_language VARCHAR(5) DEFAULT 'es',

  -- Estadísticas de contribución
  translations_submitted INTEGER DEFAULT 0,
  translations_approved INTEGER DEFAULT 0,
  reviews_completed INTEGER DEFAULT 0,
  reputation_points INTEGER DEFAULT 0,

  -- Timestamps
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

-- Función que se ejecuta cuando se crea un nuevo usuario en auth.users
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
    'user' -- Todos los usuarios nuevos empiezan como 'user'
  );
  RETURN NEW;
END;
$$;

-- Trigger que ejecuta la función cuando se inserta un usuario
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 4. TABLA DE EDICIONES/CORRECCIONES DE TRADUCCIONES
-- ============================================================================

CREATE TABLE IF NOT EXISTS translation_edits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Qué se editó
  entity_type VARCHAR(50) NOT NULL, -- 'spell', 'class', 'race', etc.
  entity_id UUID NOT NULL,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code),
  field_name VARCHAR(50) NOT NULL, -- 'name', 'description', etc.

  -- Contenido
  old_value TEXT,
  new_value TEXT NOT NULL,

  -- Quién y cuándo
  submitted_by UUID REFERENCES public.profiles(id),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Estado de la edición
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_comment TEXT,

  -- Metadatos
  translation_method VARCHAR(20), -- 'manual', 'deepl', 'google', 'community'
  confidence_score DECIMAL(3,2), -- 0.00 a 1.00

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
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  edit_id UUID NOT NULL REFERENCES translation_edits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  vote SMALLINT NOT NULL CHECK (vote IN (-1, 1)), -- -1 = downvote, 1 = upvote
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(edit_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_translation_votes_edit ON translation_votes(edit_id);

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_edits ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_votes ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
DROP POLICY IF EXISTS "Perfiles públicos visibles para todos" ON public.profiles;
CREATE POLICY "Perfiles públicos visibles para todos"
  ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Usuarios pueden actualizar su propio perfil" ON public.profiles;
CREATE POLICY "Usuarios pueden actualizar su propio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Políticas para translation_edits
DROP POLICY IF EXISTS "Ediciones visibles para todos" ON translation_edits;
CREATE POLICY "Ediciones visibles para todos"
  ON translation_edits FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Usuarios con tier traductor+ pueden crear ediciones" ON translation_edits;
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

DROP POLICY IF EXISTS "Usuarios pueden actualizar sus propias ediciones pendientes" ON translation_edits;
CREATE POLICY "Usuarios pueden actualizar sus propias ediciones pendientes"
  ON translation_edits FOR UPDATE
  USING (
    submitted_by = auth.uid()
    AND status = 'pending'
  );

-- Políticas para translation_votes
DROP POLICY IF EXISTS "Votos visibles para todos" ON translation_votes;
CREATE POLICY "Votos visibles para todos"
  ON translation_votes FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Usuarios registrados pueden votar" ON translation_votes;
CREATE POLICY "Usuarios registrados pueden votar"
  ON translation_votes FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND user_id = auth.uid()
  );

-- ============================================================================
-- 7. FUNCIONES AUXILIARES
-- ============================================================================

-- Función para verificar permisos de usuario
CREATE OR REPLACE FUNCTION check_user_permission(
  p_user_id UUID,
  p_permission TEXT -- 'can_translate', 'can_review', 'can_approve'
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

-- Función para aprobar una edición
CREATE OR REPLACE FUNCTION approve_translation_edit(
  p_edit_id UUID,
  p_reviewer_id UUID
)
RETURNS VOID AS $$
DECLARE
  v_entity_type VARCHAR(50);
  v_entity_id UUID;
  v_language_code VARCHAR(5);
  v_field_name VARCHAR(50);
  v_new_value TEXT;
BEGIN
  -- Verificar permisos
  IF NOT check_user_permission(p_reviewer_id, 'can_approve') THEN
    RAISE EXCEPTION 'Usuario no tiene permisos para aprobar traducciones';
  END IF;

  -- Obtener datos de la edición
  SELECT entity_type, entity_id, language_code, field_name, new_value
  INTO v_entity_type, v_entity_id, v_language_code, v_field_name, v_new_value
  FROM translation_edits
  WHERE id = p_edit_id AND status = 'pending';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Edición no encontrada o ya procesada';
  END IF;

  -- Actualizar la traducción correspondiente
  -- (Aquí iría la lógica específica para cada entity_type)
  -- Por ahora, solo marcamos la edición como aprobada

  UPDATE translation_edits
  SET
    status = 'approved',
    reviewed_by = p_reviewer_id,
    reviewed_at = CURRENT_TIMESTAMP
  WHERE id = p_edit_id;

  -- Actualizar estadísticas del usuario que hizo la edición
  UPDATE public.profiles
  SET
    translations_approved = translations_approved + 1,
    reputation_points = reputation_points + 10
  WHERE id = (SELECT submitted_by FROM translation_edits WHERE id = p_edit_id);

  -- Actualizar estadísticas del revisor
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
-- COMENTARIOS
-- ============================================================================

COMMENT ON TABLE languages IS 'Idiomas soportados en el sistema';
COMMENT ON TABLE user_tiers IS 'Niveles de permisos para usuarios (guest, user, contributor, translator, reviewer, admin)';
COMMENT ON TABLE public.profiles IS 'Perfiles extendidos de usuarios con estadísticas de contribución';
COMMENT ON TABLE translation_edits IS 'Registro de todas las ediciones/correcciones de traducciones';
COMMENT ON TABLE translation_votes IS 'Votos comunitarios para ediciones de traducción';

COMMENT ON COLUMN public.profiles.tier_code IS 'Tier del usuario que determina sus permisos';
COMMENT ON COLUMN public.profiles.reputation_points IS 'Puntos de reputación ganados por contribuciones aprobadas';

COMMENT ON COLUMN translation_edits.translation_method IS 'Método usado: manual, deepl, google, community';
COMMENT ON COLUMN translation_edits.confidence_score IS 'Confianza en la traducción automática (0.00-1.00)';

-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================

-- Mostrar resumen
SELECT 'Sistema de tiers de usuario creado exitosamente' AS status;
SELECT code, name, can_translate, can_review, can_approve FROM user_tiers ORDER BY
  CASE code
    WHEN 'guest' THEN 1
    WHEN 'user' THEN 2
    WHEN 'contributor' THEN 3
    WHEN 'translator' THEN 4
    WHEN 'reviewer' THEN 5
    WHEN 'admin' THEN 6
  END;
