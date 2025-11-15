-- ============================================================================
-- SISTEMA DE TICKETS DE FEEDBACK PARA BETA TESTERS
-- ============================================================================
--
-- Este script crea:
-- 1. Tabla feedback_tickets para reportes de usuarios
-- 2. ENUM para categorías y estados
-- 3. Row Level Security (RLS) policies
-- 4. Función para notificaciones
--
-- Ejecutar en: Supabase SQL Editor
-- ============================================================================

-- 1. CREAR ENUMS
-- ============================================================================

-- Categorías de feedback
DO $$ BEGIN
  CREATE TYPE feedback_category AS ENUM (
    'bug',           -- Error/Bug en la aplicación
    'feature',       -- Solicitud de nueva funcionalidad
    'translation',   -- Error de traducción
    'data',          -- Error en datos (stats, descripción, etc.)
    'ui',            -- Problema de interfaz/diseño
    'performance',   -- Problema de rendimiento
    'other'          -- Otro tipo de feedback
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Prioridades
DO $$ BEGIN
  CREATE TYPE feedback_priority AS ENUM (
    'low',           -- Baja prioridad
    'medium',        -- Prioridad media
    'high',          -- Alta prioridad
    'critical'       -- Crítico (bloquea uso)
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Estados del ticket
DO $$ BEGIN
  CREATE TYPE feedback_status AS ENUM (
    'open',          -- Abierto, pendiente de revisión
    'in_progress',   -- En progreso
    'resolved',      -- Resuelto
    'closed',        -- Cerrado
    'wont_fix'       -- No se arreglará
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 2. CREAR TABLA DE TICKETS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.feedback_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Información del usuario
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL, -- Denormalizado para facilitar queries

  -- Contenido del ticket
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category feedback_category NOT NULL DEFAULT 'other',
  priority feedback_priority NOT NULL DEFAULT 'medium',
  status feedback_status NOT NULL DEFAULT 'open',

  -- Contexto técnico
  page_url TEXT, -- URL donde ocurrió el problema
  browser_info TEXT, -- Navegador y versión
  screenshot_url TEXT, -- URL de captura de pantalla (si la subió)

  -- Metadata
  assigned_to UUID REFERENCES auth.users(id), -- Admin asignado
  resolved_at TIMESTAMPTZ, -- Cuando se resolvió
  resolution_notes TEXT, -- Notas de resolución

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT title_not_empty CHECK (LENGTH(TRIM(title)) > 0),
  CONSTRAINT description_not_empty CHECK (LENGTH(TRIM(description)) > 0)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS feedback_tickets_user_id_idx ON public.feedback_tickets(user_id);
CREATE INDEX IF NOT EXISTS feedback_tickets_status_idx ON public.feedback_tickets(status);
CREATE INDEX IF NOT EXISTS feedback_tickets_category_idx ON public.feedback_tickets(category);
CREATE INDEX IF NOT EXISTS feedback_tickets_priority_idx ON public.feedback_tickets(priority);
CREATE INDEX IF NOT EXISTS feedback_tickets_created_at_idx ON public.feedback_tickets(created_at DESC);

-- 3. HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE public.feedback_tickets ENABLE ROW LEVEL SECURITY;

-- Policy: Usuarios pueden ver sus propios tickets
DROP POLICY IF EXISTS "Users can view own tickets" ON public.feedback_tickets;
CREATE POLICY "Users can view own tickets"
  ON public.feedback_tickets
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Usuarios pueden crear tickets
DROP POLICY IF EXISTS "Users can create tickets" ON public.feedback_tickets;
CREATE POLICY "Users can create tickets"
  ON public.feedback_tickets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Usuarios pueden actualizar sus propios tickets abiertos (solo descripción)
DROP POLICY IF EXISTS "Users can update own open tickets" ON public.feedback_tickets;
CREATE POLICY "Users can update own open tickets"
  ON public.feedback_tickets
  FOR UPDATE
  USING (auth.uid() = user_id AND status = 'open')
  WITH CHECK (
    auth.uid() = user_id
    AND status = 'open' -- No pueden cambiar el estado
  );

-- Policy: Admins pueden ver todos los tickets
DROP POLICY IF EXISTS "Admins can view all tickets" ON public.feedback_tickets;
CREATE POLICY "Admins can view all tickets"
  ON public.feedback_tickets
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND tier_code = 'admin'
    )
  );

-- Policy: Admins pueden actualizar cualquier ticket
DROP POLICY IF EXISTS "Admins can update all tickets" ON public.feedback_tickets;
CREATE POLICY "Admins can update all tickets"
  ON public.feedback_tickets
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND tier_code = 'admin'
    )
  );

-- 4. TRIGGER PARA ACTUALIZAR updated_at
-- ============================================================================
DROP TRIGGER IF EXISTS update_feedback_tickets_updated_at ON public.feedback_tickets;
CREATE TRIGGER update_feedback_tickets_updated_at
  BEFORE UPDATE ON public.feedback_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 5. VISTAS ÚTILES
-- ============================================================================

-- Vista de tickets abiertos con información del usuario
CREATE OR REPLACE VIEW v_open_tickets AS
SELECT
  ft.id,
  ft.title,
  ft.description,
  ft.category,
  ft.priority,
  ft.status,
  ft.page_url,
  ft.created_at,
  ft.user_email,
  p.display_name as user_name,
  p.tier_code as user_tier
FROM public.feedback_tickets ft
JOIN public.profiles p ON ft.user_id = p.id
WHERE ft.status IN ('open', 'in_progress')
ORDER BY
  CASE ft.priority
    WHEN 'critical' THEN 1
    WHEN 'high' THEN 2
    WHEN 'medium' THEN 3
    WHEN 'low' THEN 4
  END,
  ft.created_at DESC;

-- Vista de estadísticas de tickets
CREATE OR REPLACE VIEW v_ticket_stats AS
SELECT
  COUNT(*) as total_tickets,
  COUNT(*) FILTER (WHERE status = 'open') as open_tickets,
  COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_tickets,
  COUNT(*) FILTER (WHERE status = 'resolved') as resolved_tickets,
  COUNT(*) FILTER (WHERE status = 'closed') as closed_tickets,
  COUNT(*) FILTER (WHERE category = 'bug') as bug_reports,
  COUNT(*) FILTER (WHERE category = 'translation') as translation_issues,
  COUNT(*) FILTER (WHERE category = 'data') as data_issues,
  COUNT(*) FILTER (WHERE priority = 'critical') as critical_tickets,
  COUNT(*) FILTER (WHERE priority = 'high') as high_priority_tickets
FROM public.feedback_tickets;

-- 6. FUNCIONES HELPER
-- ============================================================================

-- Función para cerrar un ticket
CREATE OR REPLACE FUNCTION public.close_ticket(
  ticket_id UUID,
  notes TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  is_admin BOOLEAN;
BEGIN
  -- Verificar si el usuario es admin
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND tier_code = 'admin'
  ) INTO is_admin;

  IF NOT is_admin THEN
    RAISE EXCEPTION 'Only admins can close tickets';
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

-- Función para asignar ticket a admin
CREATE OR REPLACE FUNCTION public.assign_ticket(
  ticket_id UUID,
  admin_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  is_admin BOOLEAN;
  target_is_admin BOOLEAN;
BEGIN
  -- Verificar si el usuario actual es admin
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND tier_code = 'admin'
  ) INTO is_admin;

  IF NOT is_admin THEN
    RAISE EXCEPTION 'Only admins can assign tickets';
  END IF;

  -- Verificar si el target es admin
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = admin_id AND tier_code = 'admin'
  ) INTO target_is_admin;

  IF NOT target_is_admin THEN
    RAISE EXCEPTION 'Can only assign to admin users';
  END IF;

  -- Asignar el ticket
  UPDATE public.feedback_tickets
  SET assigned_to = admin_id
  WHERE id = ticket_id;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================

-- Verificar que la tabla se creó
SELECT
  'Tabla feedback_tickets creada' AS status,
  COUNT(*) AS total_tickets
FROM public.feedback_tickets;

-- Ver categorías disponibles
SELECT
  'Categorías de feedback' AS info,
  enumlabel AS category
FROM pg_enum
JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
WHERE pg_type.typname = 'feedback_category'
ORDER BY enumlabel;

-- Ver prioridades disponibles
SELECT
  'Prioridades disponibles' AS info,
  enumlabel AS priority
FROM pg_enum
JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
WHERE pg_type.typname = 'feedback_priority'
ORDER BY
  CASE enumlabel
    WHEN 'critical' THEN 1
    WHEN 'high' THEN 2
    WHEN 'medium' THEN 3
    WHEN 'low' THEN 4
  END;

-- Ver estados disponibles
SELECT
  'Estados de ticket' AS info,
  enumlabel AS status
FROM pg_enum
JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
WHERE pg_type.typname = 'feedback_status'
ORDER BY enumlabel;

-- ============================================================================
-- NOTAS DE USO
-- ============================================================================
--
-- Para crear un ticket (los usuarios lo harán desde la UI):
-- INSERT INTO public.feedback_tickets (user_id, user_email, title, description, category, priority, page_url)
-- VALUES (auth.uid(), 'user@example.com', 'Bug title', 'Description', 'bug', 'high', '/clases');
--
-- Para ver tickets abiertos:
-- SELECT * FROM v_open_tickets;
--
-- Para ver estadísticas:
-- SELECT * FROM v_ticket_stats;
--
-- Para cerrar un ticket:
-- SELECT public.close_ticket('ticket-uuid', 'Fixed in version X.Y.Z');
--
-- Para asignar un ticket:
-- SELECT public.assign_ticket('ticket-uuid', 'admin-uuid');
--
-- ============================================================================
