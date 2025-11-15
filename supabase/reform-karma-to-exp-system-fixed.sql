-- =====================================================
-- REFORMA DEL SISTEMA DE KARMA A SISTEMA DE EXPERIENCIA (FIXED)
-- =====================================================
-- Versión corregida que elimina vistas antiguas antes de recrearlas
-- =====================================================

-- ====================================
-- 0. ELIMINAR VISTAS Y FUNCIONES ANTIGUAS
-- ====================================
-- Esto es necesario porque las vistas y funciones están cambiando su estructura
-- y PostgreSQL no permite cambiar nombres de columnas o tipos de retorno

-- Eliminar vistas antiguas
DROP VIEW IF EXISTS public.v_level_leaderboard CASCADE;
DROP VIEW IF EXISTS public.v_user_profile_with_level CASCADE;

-- Eliminar funciones que van a cambiar su firma
DROP FUNCTION IF EXISTS public.get_user_stats(UUID) CASCADE;
DROP FUNCTION IF EXISTS public.calculate_level_from_exp(BIGINT) CASCADE;
DROP FUNCTION IF EXISTS public.calculate_exp_to_next_level(BIGINT, INTEGER) CASCADE;
DROP FUNCTION IF EXISTS public.update_user_level() CASCADE;

-- Eliminar triggers antes de recrear funciones
DROP TRIGGER IF EXISTS trigger_update_user_level ON public.profiles;
DROP TRIGGER IF EXISTS trigger_award_exp_for_report ON public.feedback_tickets;
DROP TRIGGER IF EXISTS trigger_award_exp_for_resolved_report ON public.feedback_tickets;
DROP TRIGGER IF EXISTS trigger_award_exp_for_vote ON public.feedback_votes;
DROP TRIGGER IF EXISTS trigger_remove_exp_for_vote_deletion ON public.feedback_votes;

-- ====================================
-- 1. TABLA DE NIVELES
-- ====================================
-- Almacena los 20 niveles con sus requisitos de XP y títulos

CREATE TABLE IF NOT EXISTS public.user_levels (
  level INTEGER PRIMARY KEY CHECK (level >= 1 AND level <= 20),
  xp_required BIGINT NOT NULL CHECK (xp_required >= 0),
  title TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('Novato', 'Héroe', 'Épico', 'Legendario')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar los 20 niveles basados en D&D 5e
INSERT INTO public.user_levels (level, xp_required, title, tier, description) VALUES
  (1, 0, 'Recién nacido en la aventura', 'Novato', 'Desarrollo básico, formación, descubrimiento de estilo'),
  (2, 300, 'Iniciado en pruebas', 'Novato', 'Desarrollo básico, formación, descubrimiento de estilo'),
  (3, 900, 'Portador del camino', 'Novato', 'Desarrollo básico, formación, descubrimiento de estilo'),
  (4, 2700, 'Adepto formado', 'Novato', 'Desarrollo básico, formación, descubrimiento de estilo'),
  (5, 6500, 'Héroe en ascenso', 'Héroe', 'Salto de poder, hazañas regionales, dominio de habilidades'),
  (6, 14000, 'Guardián competente', 'Héroe', 'Salto de poder, hazañas regionales, dominio de habilidades'),
  (7, 23000, 'Campeón menor', 'Héroe', 'Salto de poder, hazañas regionales, dominio de habilidades'),
  (8, 34000, 'Forjador de destino', 'Héroe', 'Salto de poder, hazañas regionales, dominio de habilidades'),
  (9, 48000, 'Poder sobresaliente', 'Héroe', 'Salto de poder, hazañas regionales, dominio de habilidades'),
  (10, 64000, 'Héroe consagrado', 'Héroe', 'Salto de poder, hazañas regionales, dominio de habilidades'),
  (11, 85000, 'Campeón ascendido', 'Épico', 'Impacto continental, magia/combate de escala mayor'),
  (12, 100000, 'Maestro del sendero', 'Épico', 'Impacto continental, magia/combate de escala mayor'),
  (13, 120000, 'Tejedor de poder', 'Épico', 'Impacto continental, magia/combate de escala mayor'),
  (14, 140000, 'Eminencia marcial / arcana', 'Épico', 'Impacto continental, magia/combate de escala mayor'),
  (15, 165000, 'Portador de leyenda', 'Épico', 'Impacto continental, magia/combate de escala mayor'),
  (16, 195000, 'Estrella del campo de batalla', 'Épico', 'Impacto continental, magia/combate de escala mayor'),
  (17, 225000, 'Mano del destino', 'Legendario', 'Poder mítico, amenaza o salvación del mundo'),
  (18, 265000, 'Voz de los mitos', 'Legendario', 'Poder mítico, amenaza o salvación del mundo'),
  (19, 305000, 'Ascendido supremo', 'Legendario', 'Poder mítico, amenaza o salvación del mundo'),
  (20, 355000, 'Leyenda viviente', 'Legendario', 'Poder mítico, amenaza o salvación del mundo')
ON CONFLICT (level) DO UPDATE SET
  xp_required = EXCLUDED.xp_required,
  title = EXCLUDED.title,
  tier = EXCLUDED.tier,
  description = EXCLUDED.description;

COMMENT ON TABLE public.user_levels IS 'Tabla de niveles basados en D&D 5e con requisitos de XP y títulos personalizados';
COMMENT ON COLUMN public.user_levels.tier IS 'Tier del nivel: Novato (1-4), Héroe (5-10), Épico (11-16), Legendario (17-20)';

-- ====================================
-- 2. MODIFICAR TABLA PROFILES
-- ====================================
-- Renombrar karma_points a experience_points
-- Agregar columna level (calculada automáticamente)

-- Renombrar columna karma_points a experience_points
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'profiles'
    AND column_name = 'karma_points'
  ) THEN
    ALTER TABLE public.profiles RENAME COLUMN karma_points TO experience_points;
  END IF;
END $$;

-- Agregar columna level si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'profiles'
    AND column_name = 'level'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN level INTEGER DEFAULT 1 CHECK (level >= 1 AND level <= 20);
  END IF;
END $$;

-- Agregar columna exp_to_next_level si no existe (para mostrar en UI)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'profiles'
    AND column_name = 'exp_to_next_level'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN exp_to_next_level BIGINT DEFAULT 300;
  END IF;
END $$;

COMMENT ON COLUMN public.profiles.experience_points IS 'Puntos de experiencia acumulados (renombrado de karma_points)';
COMMENT ON COLUMN public.profiles.level IS 'Nivel del usuario (1-20) calculado automáticamente desde experience_points';
COMMENT ON COLUMN public.profiles.exp_to_next_level IS 'Experiencia restante para alcanzar el siguiente nivel';

-- ====================================
-- 3. FUNCIÓN PARA CALCULAR NIVEL DESDE XP
-- ====================================
CREATE OR REPLACE FUNCTION public.calculate_level_from_exp(exp_points BIGINT)
RETURNS INTEGER
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  user_level INTEGER;
BEGIN
  -- Encontrar el nivel más alto cuyo xp_required sea <= exp_points
  SELECT level INTO user_level
  FROM public.user_levels
  WHERE xp_required <= exp_points
  ORDER BY level DESC
  LIMIT 1;

  -- Si no se encuentra nivel (exp negativo o 0), retornar nivel 1
  RETURN COALESCE(user_level, 1);
END;
$$;

COMMENT ON FUNCTION public.calculate_level_from_exp IS 'Calcula el nivel del usuario basándose en sus puntos de experiencia';

-- Ejemplos de uso:
-- SELECT calculate_level_from_exp(0);      -- Retorna 1
-- SELECT calculate_level_from_exp(300);    -- Retorna 2
-- SELECT calculate_level_from_exp(6500);   -- Retorna 5
-- SELECT calculate_level_from_exp(355000); -- Retorna 20

-- ====================================
-- 4. FUNCIÓN PARA CALCULAR EXP AL SIGUIENTE NIVEL
-- ====================================
CREATE OR REPLACE FUNCTION public.calculate_exp_to_next_level(current_exp BIGINT, current_level INTEGER)
RETURNS BIGINT
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  next_level_xp BIGINT;
BEGIN
  -- Si ya está en nivel 20 (máximo), retornar 0
  IF current_level >= 20 THEN
    RETURN 0;
  END IF;

  -- Obtener XP requerido para el siguiente nivel
  SELECT xp_required INTO next_level_xp
  FROM public.user_levels
  WHERE level = current_level + 1;

  -- Retornar diferencia entre XP del siguiente nivel y XP actual
  RETURN next_level_xp - current_exp;
END;
$$;

COMMENT ON FUNCTION public.calculate_exp_to_next_level IS 'Calcula cuánta experiencia falta para alcanzar el siguiente nivel';

-- ====================================
-- 5. TRIGGER PARA ACTUALIZAR NIVEL AUTOMÁTICAMENTE
-- ====================================
-- Cada vez que se actualiza experience_points, recalcular level y exp_to_next_level

CREATE OR REPLACE FUNCTION public.update_user_level()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Calcular nuevo nivel basado en experiencia
  NEW.level := calculate_level_from_exp(NEW.experience_points);

  -- Calcular experiencia restante para siguiente nivel
  NEW.exp_to_next_level := calculate_exp_to_next_level(NEW.experience_points, NEW.level);

  RETURN NEW;
END;
$$;

-- Eliminar trigger anterior si existe
DROP TRIGGER IF EXISTS trigger_update_user_level ON public.profiles;

-- Crear trigger
CREATE TRIGGER trigger_update_user_level
  BEFORE INSERT OR UPDATE OF experience_points
  ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_user_level();

COMMENT ON FUNCTION public.update_user_level IS 'Trigger que actualiza automáticamente level y exp_to_next_level cuando cambia experience_points';

-- ====================================
-- 6. ACTUALIZAR TRIGGERS DE FEEDBACK
-- ====================================
-- Cambiar los triggers de feedback_tickets para otorgar EXP en lugar de karma

-- Trigger: Otorgar EXP cuando se crea un reporte
CREATE OR REPLACE FUNCTION public.award_exp_for_report()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Otorgar 50 XP por reportar un bug/error
  UPDATE public.profiles
  SET experience_points = experience_points + 50,
      reports_submitted = reports_submitted + 1
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_award_exp_for_report ON public.feedback_tickets;

CREATE TRIGGER trigger_award_exp_for_report
  AFTER INSERT ON public.feedback_tickets
  FOR EACH ROW
  EXECUTE FUNCTION award_exp_for_report();

-- Trigger: Otorgar bonus EXP cuando un reporte se marca como resuelto
CREATE OR REPLACE FUNCTION public.award_exp_for_resolved_report()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Solo otorgar bonus si el estado cambió a 'resolved'
  IF OLD.status != 'resolved' AND NEW.status = 'resolved' THEN
    -- Otorgar 200 XP de bonus por reporte resuelto
    UPDATE public.profiles
    SET experience_points = experience_points + 200,
        reports_resolved = reports_resolved + 1
    WHERE id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_award_exp_for_resolved_report ON public.feedback_tickets;

CREATE TRIGGER trigger_award_exp_for_resolved_report
  AFTER UPDATE OF status ON public.feedback_tickets
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION award_exp_for_resolved_report();

-- ====================================
-- 7. ACTUALIZAR TRIGGERS DE VOTOS
-- ====================================
-- Cambiar triggers de feedback_votes para otorgar EXP

CREATE OR REPLACE FUNCTION public.award_exp_for_vote()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  ticket_author_id UUID;
BEGIN
  -- Obtener el ID del autor del ticket
  SELECT user_id INTO ticket_author_id
  FROM public.feedback_tickets
  WHERE id = NEW.ticket_id;

  -- Otorgar 10 XP al autor del ticket por cada voto positivo
  IF NEW.vote_value = 1 THEN
    UPDATE public.profiles
    SET experience_points = experience_points + 10,
        total_votes_received = total_votes_received + 1
    WHERE id = ticket_author_id;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_award_exp_for_vote ON public.feedback_votes;

CREATE TRIGGER trigger_award_exp_for_vote
  AFTER INSERT ON public.feedback_votes
  FOR EACH ROW
  EXECUTE FUNCTION award_exp_for_vote();

-- Trigger para quitar EXP cuando se elimina un voto
CREATE OR REPLACE FUNCTION public.remove_exp_for_vote_deletion()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  ticket_author_id UUID;
BEGIN
  -- Obtener el ID del autor del ticket
  SELECT user_id INTO ticket_author_id
  FROM public.feedback_tickets
  WHERE id = OLD.ticket_id;

  -- Quitar 10 XP si era un voto positivo
  IF OLD.vote_value = 1 THEN
    UPDATE public.profiles
    SET experience_points = GREATEST(0, experience_points - 10),
        total_votes_received = GREATEST(0, total_votes_received - 1)
    WHERE id = ticket_author_id;
  END IF;

  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS trigger_remove_exp_for_vote_deletion ON public.feedback_votes;

CREATE TRIGGER trigger_remove_exp_for_vote_deletion
  BEFORE DELETE ON public.feedback_votes
  FOR EACH ROW
  EXECUTE FUNCTION remove_exp_for_vote_deletion();

-- ====================================
-- 8. VISTA DE LEADERBOARD CON NIVELES
-- ====================================
-- Vista actualizada del leaderboard con niveles y títulos

CREATE VIEW public.v_level_leaderboard AS
SELECT
  p.id,
  p.display_name,
  p.username_slug,
  p.avatar_url,
  p.experience_points,
  p.level,
  ul.title AS level_title,
  ul.tier AS level_tier,
  p.exp_to_next_level,
  (
    SELECT xp_required
    FROM public.user_levels
    WHERE level = LEAST(p.level + 1, 20)
  ) AS next_level_xp,
  p.reports_submitted,
  p.reports_resolved,
  p.total_votes_received,
  CASE
    WHEN p.reports_submitted > 0
    THEN ROUND((p.reports_resolved::NUMERIC / p.reports_submitted::NUMERIC) * 100, 2)
    ELSE 0
  END AS resolution_rate,
  p.created_at,
  p.updated_at,
  -- Ranking por nivel y luego por exp
  ROW_NUMBER() OVER (ORDER BY p.level DESC, p.experience_points DESC) AS rank
FROM public.profiles p
LEFT JOIN public.user_levels ul ON p.level = ul.level
WHERE p.display_name IS NOT NULL
  AND p.tier NOT IN ('admin')  -- Excluir admins del leaderboard público
ORDER BY p.level DESC, p.experience_points DESC
LIMIT 100;

COMMENT ON VIEW public.v_level_leaderboard IS 'Top 100 usuarios por nivel y experiencia (excluye admins)';

-- ====================================
-- 9. VISTA DE PERFIL COMPLETO CON NIVEL
-- ====================================
-- Vista con información completa del usuario incluyendo nivel y progreso

CREATE VIEW public.v_user_profile_with_level AS
SELECT
  p.id,
  p.display_name,
  p.username_slug,
  p.avatar_url,
  p.tier,
  p.experience_points,
  p.level,
  ul.title AS level_title,
  ul.tier AS level_tier,
  p.exp_to_next_level,
  (
    SELECT xp_required
    FROM public.user_levels
    WHERE level = LEAST(p.level + 1, 20)
  ) AS next_level_xp,
  -- Cálculo de progreso hacia siguiente nivel
  CASE
    WHEN p.level >= 20 THEN 100.0  -- Nivel máximo alcanzado
    ELSE ROUND(
      (1.0 - (p.exp_to_next_level::NUMERIC / (
        SELECT xp_required - COALESCE(
          (SELECT xp_required FROM public.user_levels WHERE level = p.level),
          0
        )
        FROM public.user_levels
        WHERE level = p.level + 1
      )::NUMERIC)) * 100.0,
      2
    )
  END AS progress_percentage,
  p.reports_submitted,
  p.reports_resolved,
  p.total_votes_received,
  CASE
    WHEN p.reports_submitted > 0
    THEN ROUND((p.reports_resolved::NUMERIC / p.reports_submitted::NUMERIC) * 100, 2)
    ELSE 0
  END AS resolution_rate,
  p.created_at,
  -- Calcular ranking global
  (
    SELECT COUNT(*) + 1
    FROM public.profiles p2
    WHERE p2.level > p.level
       OR (p2.level = p.level AND p2.experience_points > p.experience_points)
  ) AS global_rank
FROM public.profiles p
LEFT JOIN public.user_levels ul ON p.level = ul.level;

COMMENT ON VIEW public.v_user_profile_with_level IS 'Vista completa del perfil del usuario con nivel, título, tier y progreso detallado';

-- ====================================
-- 10. FUNCIÓN PARA OBTENER STATS DEL USUARIO
-- ====================================
CREATE OR REPLACE FUNCTION public.get_user_stats(user_id UUID)
RETURNS TABLE (
  id UUID,
  display_name TEXT,
  username_slug TEXT,
  avatar_url TEXT,
  tier TEXT,
  experience_points BIGINT,
  level INTEGER,
  level_title TEXT,
  level_tier TEXT,
  exp_to_next_level BIGINT,
  next_level_xp BIGINT,
  progress_percentage NUMERIC,
  reports_submitted INTEGER,
  reports_resolved INTEGER,
  total_votes_received INTEGER,
  resolution_rate NUMERIC,
  global_rank BIGINT
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    v.id,
    v.display_name,
    v.username_slug,
    v.avatar_url,
    v.tier,
    v.experience_points,
    v.level,
    v.level_title,
    v.level_tier,
    v.exp_to_next_level,
    v.next_level_xp,
    v.progress_percentage,
    v.reports_submitted,
    v.reports_resolved,
    v.total_votes_received,
    v.resolution_rate,
    v.global_rank
  FROM public.v_user_profile_with_level v
  WHERE v.id = user_id;
END;
$$;

COMMENT ON FUNCTION public.get_user_stats IS 'Devuelve estadísticas completas del usuario incluyendo nivel, experiencia y ranking';

-- ====================================
-- 11. ACTUALIZAR DATOS EXISTENTES
-- ====================================
-- Calcular el nivel de todos los usuarios basándose en su experiencia actual

UPDATE public.profiles
SET
  level = calculate_level_from_exp(experience_points),
  exp_to_next_level = calculate_exp_to_next_level(
    experience_points,
    calculate_level_from_exp(experience_points)
  )
WHERE experience_points IS NOT NULL;

-- ====================================
-- VERIFICACIÓN FINAL
-- ====================================

-- Ver niveles creados
SELECT * FROM public.user_levels ORDER BY level;

-- Ver usuarios con niveles
SELECT
  display_name,
  experience_points,
  level,
  (SELECT title FROM public.user_levels ul WHERE ul.level = p.level) AS level_title,
  exp_to_next_level
FROM public.profiles p
WHERE display_name IS NOT NULL
ORDER BY level DESC, experience_points DESC
LIMIT 10;

-- =====================================================
-- FIN DE LA REFORMA
-- =====================================================
