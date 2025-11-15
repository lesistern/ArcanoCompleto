-- ============================================================================
-- EJECUCIÓN MANUAL PASO A PASO
-- Ejecuta cada bloque por separado si el script completo falla
-- ============================================================================

-- PASO 1: Crear tabla de idiomas
-- Ejecutar este bloque primero
CREATE TABLE IF NOT EXISTS languages (
  code VARCHAR(5) PRIMARY KEY,
  name TEXT NOT NULL,
  native_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO languages (code, name, native_name) VALUES
  ('en', 'English', 'English'),
  ('es', 'Spanish', 'Español')
ON CONFLICT (code) DO NOTHING;

-- Verificar: SELECT * FROM languages;

-- ============================================================================

-- PASO 2: Crear tabla de tiers
-- Ejecutar este bloque segundo
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

INSERT INTO user_tiers (code, name, description, can_translate, can_review, can_approve, max_edits_per_day) VALUES
  ('guest', 'Invitado', 'Usuario no registrado, solo lectura', false, false, false, 0),
  ('user', 'Usuario', 'Usuario registrado básico', false, false, false, 0),
  ('contributor', 'Colaborador', 'Puede sugerir correcciones', true, false, false, 10),
  ('translator', 'Traductor', 'Puede editar traducciones directamente', true, true, false, 50),
  ('reviewer', 'Revisor', 'Puede revisar y aprobar traducciones', true, true, true, 100),
  ('admin', 'Administrador', 'Acceso completo', true, true, true, NULL)
ON CONFLICT (code) DO NOTHING;

-- Verificar: SELECT * FROM user_tiers;

-- ============================================================================

-- PASO 3: Crear tabla de perfiles
-- Ejecutar este bloque tercero
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

CREATE INDEX IF NOT EXISTS idx_profiles_tier ON public.profiles(tier_code);
CREATE INDEX IF NOT EXISTS idx_profiles_reputation ON public.profiles(reputation_points DESC);

-- Verificar: SELECT COUNT(*) FROM public.profiles;

-- ============================================================================

-- PASO 4: Crear trigger de auto-creación de perfiles
-- Ejecutar este bloque cuarto
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
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Verificar: SELECT * FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created';

-- ============================================================================

-- PASO 5: Crear tabla de ediciones de traducción
-- Ejecutar este bloque quinto
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

CREATE INDEX IF NOT EXISTS idx_translation_edits_entity ON translation_edits(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_translation_edits_status ON translation_edits(status);
CREATE INDEX IF NOT EXISTS idx_translation_edits_user ON translation_edits(submitted_by);

-- Verificar: SELECT COUNT(*) FROM translation_edits;

-- ============================================================================

-- PASO 6: Crear tabla de votos
-- Ejecutar este bloque sexto
CREATE TABLE IF NOT EXISTS translation_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edit_id UUID NOT NULL REFERENCES translation_edits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  vote SMALLINT NOT NULL CHECK (vote IN (-1, 1)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(edit_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_translation_votes_edit ON translation_votes(edit_id);

-- Verificar: SELECT COUNT(*) FROM translation_votes;

-- ============================================================================

-- PASO 7: Habilitar Row Level Security
-- Ejecutar este bloque séptimo
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_edits ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Perfiles públicos visibles para todos" ON public.profiles;
CREATE POLICY "Perfiles públicos visibles para todos"
  ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Usuarios pueden actualizar su propio perfil" ON public.profiles;
CREATE POLICY "Usuarios pueden actualizar su propio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================================

-- PASO 8: VERIFICACIÓN FINAL
-- Ejecutar al final para confirmar que todo está bien
SELECT
  'user_tiers' as tabla,
  (SELECT COUNT(*) FROM user_tiers) as registros,
  '6 tiers esperados' as nota
UNION ALL
SELECT
  'profiles',
  (SELECT COUNT(*) FROM public.profiles),
  'Vacío al inicio (OK)'
UNION ALL
SELECT
  'translation_edits',
  (SELECT COUNT(*) FROM translation_edits),
  'Vacío al inicio (OK)'
UNION ALL
SELECT
  'translation_votes',
  (SELECT COUNT(*) FROM translation_votes),
  'Vacío al inicio (OK)'
UNION ALL
SELECT
  'languages',
  (SELECT COUNT(*) FROM languages),
  '2 idiomas (OK)';
