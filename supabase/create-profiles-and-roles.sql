-- ============================================================================
-- SISTEMA DE PERFILES Y ROLES PARA BETA TESTERS
-- ============================================================================
--
-- Este script crea:
-- 1. Tabla `profiles` vinculada a auth.users
-- 2. Roles de usuario (beta_tester, user, admin)
-- 3. Trigger para crear perfil automáticamente al registrarse
-- 4. Row Level Security (RLS) policies
--
-- Ejecutar en: Supabase SQL Editor
-- ============================================================================

-- 1. CREAR ENUM DE ROLES
-- ============================================================================
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'beta_tester', 'admin');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 2. CREAR TABLA DE PERFILES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT profiles_email_unique UNIQUE (email)
);

-- Crear índices para performance
CREATE INDEX IF NOT EXISTS profiles_role_idx ON public.profiles(role);
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);

-- 3. HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Los usuarios pueden ver su propio perfil
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Los usuarios pueden actualizar su propio perfil (excepto role)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

-- Policy: Solo admins pueden ver todos los perfiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Solo admins pueden cambiar roles
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
CREATE POLICY "Admins can update any profile"
  ON public.profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 4. FUNCIÓN PARA ACTUALIZAR updated_at AUTOMÁTICAMENTE
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 5. FUNCIÓN PARA CREAR PERFIL AUTOMÁTICAMENTE AL REGISTRARSE
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    'user', -- Rol por defecto
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil al registrarse
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 6. FUNCIÓN HELPER PARA VERIFICAR SI USUARIO ES BETA TESTER
-- ============================================================================
CREATE OR REPLACE FUNCTION public.is_beta_tester(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role IN ('beta_tester', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. FUNCIÓN HELPER PARA OBTENER ROL DE USUARIO
-- ============================================================================
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role AS $$
BEGIN
  RETURN (
    SELECT role FROM public.profiles
    WHERE id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================
-- Verificar que la tabla se creó correctamente
SELECT
  'Tabla profiles creada' AS status,
  COUNT(*) AS total_profiles
FROM public.profiles;

-- Verificar roles disponibles
SELECT
  'Roles disponibles' AS status,
  enumlabel AS role
FROM pg_enum
JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
WHERE pg_type.typname = 'user_role'
ORDER BY enumlabel;

-- ============================================================================
-- NOTAS
-- ============================================================================
--
-- Para crear un beta tester manualmente:
-- UPDATE public.profiles SET role = 'beta_tester' WHERE email = 'user@example.com';
--
-- Para crear un admin:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@example.com';
--
-- Para verificar rol de un usuario:
-- SELECT email, role FROM public.profiles WHERE email = 'user@example.com';
--
-- ============================================================================
