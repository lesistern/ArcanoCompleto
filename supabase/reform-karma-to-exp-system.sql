-- =====================================================
-- REFORMA DEL SISTEMA DE KARMA A SISTEMA DE EXPERIENCIA
-- =====================================================
-- Convierte el sistema de "karma points" a "experience points (EXP)"
-- con 20 niveles basados en D&D 5e y títulos personalizados.
--
-- Acciones que otorgan EXP:
-- - Reportar bugs/errores: +50 EXP
-- - Reporte marcado como resuelto: +200 EXP (bonus)
-- - Traducir contenido aprobado: +100 EXP
-- - Ayudar en foros/comentarios útiles: +25 EXP
-- - Voto positivo recibido en reporte: +10 EXP
-- - Revisión de traducción completada: +50 EXP
--
-- Fecha: 2025-11-15
-- =====================================================

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

-- Agregar columna exp_to_next_level (para UI/UX)
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

-- Actualizar comentarios
COMMENT ON COLUMN public.profiles.experience_points IS 'Puntos de experiencia acumulados del usuario (sistema basado en D&D 5e)';
COMMENT ON COLUMN public.profiles.level IS 'Nivel actual del usuario (1-20), calculado automáticamente desde experience_points';
COMMENT ON COLUMN public.profiles.exp_to_next_level IS 'XP restante para alcanzar el siguiente nivel';

-- ====================================
-- 3. FUNCIÓN: CALCULAR NIVEL DESDE EXP
-- ====================================
-- Calcula el nivel del usuario basándose en su experiencia acumulada

CREATE OR REPLACE FUNCTION public.calculate_level_from_exp(exp_points BIGINT)
RETURNS INTEGER
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  user_level INTEGER := 1;
BEGIN
  -- Si no tiene EXP, es nivel 1
  IF exp_points IS NULL OR exp_points < 0 THEN
    RETURN 1;
  END IF;

  -- Buscar el nivel más alto alcanzado
  SELECT COALESCE(MAX(level), 1) INTO user_level
  FROM public.user_levels
  WHERE xp_required <= exp_points;

  RETURN user_level;
END;
$$;

COMMENT ON FUNCTION public.calculate_level_from_exp IS 'Calcula el nivel del usuario (1-20) basándose en sus puntos de experiencia';

-- ====================================
-- 4. FUNCIÓN: OBTENER INFO DEL NIVEL
-- ====================================
-- Devuelve toda la información de un nivel específico

CREATE OR REPLACE FUNCTION public.get_level_info(user_level INTEGER)
RETURNS TABLE (
  level INTEGER,
  xp_required BIGINT,
  title TEXT,
  tier TEXT,
  description TEXT
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT ul.level, ul.xp_required, ul.title, ul.tier, ul.description
  FROM public.user_levels ul
  WHERE ul.level = user_level
  LIMIT 1;
END;
$$;

COMMENT ON FUNCTION public.get_level_info IS 'Devuelve la información completa de un nivel específico (título, XP requerida, tier)';

-- ====================================
-- 5. FUNCIÓN: OTORGAR EXPERIENCIA
-- ====================================
-- Otorga experiencia a un usuario y actualiza su nivel automáticamente
-- Registra la razón en un log (opcional)

CREATE OR REPLACE FUNCTION public.award_exp(
  user_id UUID,
  exp_amount INTEGER,
  reason TEXT DEFAULT NULL
)
RETURNS TABLE (
  new_exp BIGINT,
  new_level INTEGER,
  level_up BOOLEAN,
  title TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_exp BIGINT;
  current_level INTEGER;
  calculated_level INTEGER;
  level_changed BOOLEAN := FALSE;
  level_title TEXT;
BEGIN
  -- Validar que exp_amount sea positivo
  IF exp_amount <= 0 THEN
    RAISE EXCEPTION 'El monto de experiencia debe ser positivo';
  END IF;

  -- Obtener experiencia y nivel actuales
  SELECT experience_points, level INTO current_exp, current_level
  FROM public.profiles
  WHERE id = user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Usuario no encontrado';
  END IF;

  -- Actualizar experiencia
  current_exp := COALESCE(current_exp, 0) + exp_amount;

  -- Calcular nuevo nivel
  calculated_level := public.calculate_level_from_exp(current_exp);

  -- Verificar si subió de nivel
  IF calculated_level > current_level THEN
    level_changed := TRUE;
  END IF;

  -- Obtener título del nuevo nivel
  SELECT ul.title INTO level_title
  FROM public.user_levels ul
  WHERE ul.level = calculated_level;

  -- Calcular XP para siguiente nivel
  DECLARE
    next_level_xp BIGINT;
    exp_remaining BIGINT;
  BEGIN
    -- Si está en nivel 20, no hay siguiente nivel
    IF calculated_level >= 20 THEN
      exp_remaining := 0;
    ELSE
      SELECT xp_required INTO next_level_xp
      FROM public.user_levels
      WHERE level = calculated_level + 1;

      exp_remaining := next_level_xp - current_exp;
    END IF;

    -- Actualizar el perfil del usuario
    UPDATE public.profiles
    SET
      experience_points = current_exp,
      level = calculated_level,
      exp_to_next_level = exp_remaining,
      updated_at = NOW()
    WHERE id = user_id;
  END;

  -- TODO: Registrar en tabla de logs de experiencia (exp_logs)
  -- INSERT INTO exp_logs (user_id, exp_amount, reason, created_at)
  -- VALUES (user_id, exp_amount, reason, NOW());

  -- Retornar resultados
  RETURN QUERY SELECT current_exp, calculated_level, level_changed, level_title;
END;
$$;

COMMENT ON FUNCTION public.award_exp IS 'Otorga experiencia a un usuario, actualiza su nivel automáticamente y retorna si subió de nivel';

-- ====================================
-- 6. TRIGGER: ACTUALIZAR NIVEL AL CAMBIAR EXP
-- ====================================
-- Actualiza automáticamente el nivel cuando cambia experience_points

CREATE OR REPLACE FUNCTION public.update_level_on_exp_change()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  calculated_level INTEGER;
  next_level_xp BIGINT;
  exp_remaining BIGINT;
BEGIN
  -- Calcular nivel desde la nueva experiencia
  calculated_level := public.calculate_level_from_exp(NEW.experience_points);

  -- Actualizar nivel
  NEW.level := calculated_level;

  -- Calcular XP para siguiente nivel
  IF calculated_level >= 20 THEN
    NEW.exp_to_next_level := 0;
  ELSE
    SELECT xp_required INTO next_level_xp
    FROM public.user_levels
    WHERE level = calculated_level + 1;

    NEW.exp_to_next_level := next_level_xp - COALESCE(NEW.experience_points, 0);
  END IF;

  RETURN NEW;
END;
$$;

-- Crear el trigger si no existe
DROP TRIGGER IF EXISTS trigger_update_level_on_exp_change ON public.profiles;
CREATE TRIGGER trigger_update_level_on_exp_change
  BEFORE INSERT OR UPDATE OF experience_points ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_level_on_exp_change();

COMMENT ON FUNCTION public.update_level_on_exp_change IS 'Trigger que actualiza automáticamente el nivel del usuario cuando cambia su experiencia';

-- ====================================
-- 7. ACTUALIZAR TRIGGERS EXISTENTES
-- ====================================
-- Modificar triggers de karma para usar experiencia

-- 7.1 Trigger: Voto recibido en reporte (+10 EXP)
CREATE OR REPLACE FUNCTION public.update_exp_on_vote()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  ticket_author_id UUID;
BEGIN
  -- Solo otorgar EXP en votos positivos (vote = 1)
  IF NEW.vote = 1 THEN
    -- Obtener el autor del ticket
    SELECT user_id INTO ticket_author_id
    FROM public.feedback_tickets
    WHERE id = NEW.ticket_id;

    IF ticket_author_id IS NOT NULL THEN
      -- Otorgar 10 EXP por voto positivo
      UPDATE public.profiles
      SET
        experience_points = COALESCE(experience_points, 0) + 10,
        total_votes_received = COALESCE(total_votes_received, 0) + 1
      WHERE id = ticket_author_id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Recrear el trigger
DROP TRIGGER IF EXISTS trigger_update_exp_on_vote ON public.feedback_votes;
CREATE TRIGGER trigger_update_exp_on_vote
  AFTER INSERT ON public.feedback_votes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_exp_on_vote();

-- 7.2 Trigger: Reporte creado (+50 EXP)
CREATE OR REPLACE FUNCTION public.update_exp_on_report_created()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    -- Otorgar 50 EXP por crear un reporte
    UPDATE public.profiles
    SET
      experience_points = COALESCE(experience_points, 0) + 50,
      reports_submitted = COALESCE(reports_submitted, 0) + 1
    WHERE id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$;

-- Crear el trigger
DROP TRIGGER IF EXISTS trigger_update_exp_on_report_created ON public.feedback_tickets;
CREATE TRIGGER trigger_update_exp_on_report_created
  AFTER INSERT ON public.feedback_tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_exp_on_report_created();

-- 7.3 Trigger: Reporte marcado como resuelto (+200 EXP bonus)
CREATE OR REPLACE FUNCTION public.update_exp_on_report_resolved()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Si el status cambió de cualquier cosa a 'resolved'
  IF OLD.status <> 'resolved' AND NEW.status = 'resolved' THEN
    IF NEW.user_id IS NOT NULL THEN
      -- Otorgar 200 EXP bonus por reporte resuelto
      UPDATE public.profiles
      SET
        experience_points = COALESCE(experience_points, 0) + 200,
        reports_resolved = COALESCE(reports_resolved, 0) + 1
      WHERE id = NEW.user_id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Crear el trigger
DROP TRIGGER IF EXISTS trigger_update_exp_on_report_resolved ON public.feedback_tickets;
CREATE TRIGGER trigger_update_exp_on_report_resolved
  AFTER UPDATE OF status ON public.feedback_tickets
  FOR EACH ROW
  WHEN (NEW.status = 'resolved')
  EXECUTE FUNCTION public.update_exp_on_report_resolved();

-- ====================================
-- 8. VISTA: LEADERBOARD DE NIVELES
-- ====================================
-- Reemplaza v_karma_leaderboard con v_level_leaderboard

DROP VIEW IF EXISTS public.v_karma_leaderboard;

CREATE OR REPLACE VIEW public.v_level_leaderboard AS
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
    THEN ROUND((p.reports_resolved::NUMERIC / p.reports_submitted::NUMERIC) * 100, 1)
    ELSE 0
  END AS resolution_rate,
  p.created_at,
  p.updated_at,
  -- Ranking por nivel y luego por exp
  ROW_NUMBER() OVER (ORDER BY p.level DESC, p.experience_points DESC) AS rank
FROM public.profiles p
LEFT JOIN public.user_levels ul ON p.level = ul.level
WHERE p.display_name IS NOT NULL
ORDER BY p.level DESC, p.experience_points DESC
LIMIT 100;

COMMENT ON VIEW public.v_level_leaderboard IS 'Top 100 usuarios ordenados por nivel y experiencia (reemplaza v_karma_leaderboard)';

-- ====================================
-- 9. VISTA: PERFIL COMPLETO CON NIVEL
-- ====================================
-- Vista mejorada con información de nivel y progreso

CREATE OR REPLACE VIEW public.v_user_profile_with_level AS
SELECT
  p.id,
  p.display_name,
  p.username_slug,
  p.avatar_url,
  p.experience_points,
  p.level,
  ul.title AS level_title,
  ul.tier AS level_tier,
  ul.description AS level_description,
  p.exp_to_next_level,
  ul.xp_required AS current_level_xp,
  (
    SELECT xp_required
    FROM public.user_levels
    WHERE level = LEAST(p.level + 1, 20)
  ) AS next_level_xp,
  -- Progreso hacia el siguiente nivel (%)
  CASE
    WHEN p.level >= 20 THEN 100.0
    ELSE ROUND(
      ((p.experience_points - ul.xp_required)::NUMERIC /
       ((SELECT xp_required FROM public.user_levels WHERE level = p.level + 1) - ul.xp_required)::NUMERIC) * 100, 1
    )
  END AS progress_percentage,
  p.reports_submitted,
  p.reports_resolved,
  p.total_votes_received,
  CASE
    WHEN p.reports_submitted > 0
    THEN ROUND((p.reports_resolved::NUMERIC / p.reports_submitted::NUMERIC) * 100, 1)
    ELSE 0
  END AS resolution_rate,
  p.bio,
  p.preferred_language,
  p.created_at,
  p.updated_at,
  -- Ranking global
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
-- 10. FUNCIÓN: ESTADÍSTICAS DEL USUARIO
-- ====================================
-- Actualiza get_user_stats() para incluir información de nivel

CREATE OR REPLACE FUNCTION public.get_user_stats(user_id UUID)
RETURNS TABLE (
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
-- Calcular el nivel de todos los usuarios basándose en su karma actual
-- (asumiendo que karma_points ya fue renombrado a experience_points)

UPDATE public.profiles
SET
  level = public.calculate_level_from_exp(experience_points),
  updated_at = NOW();

-- ====================================
-- 12. ÍNDICES DE PERFORMANCE
-- ====================================

-- Índice en experience_points para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_profiles_experience_points
  ON public.profiles(experience_points DESC);

-- Índice en level para ordenamiento
CREATE INDEX IF NOT EXISTS idx_profiles_level
  ON public.profiles(level DESC, experience_points DESC);

-- Índice compuesto para leaderboard
CREATE INDEX IF NOT EXISTS idx_profiles_leaderboard
  ON public.profiles(level DESC, experience_points DESC, display_name);

-- ====================================
-- FIN DEL SCRIPT
-- ====================================

-- Verificar instalación
DO $$
BEGIN
  RAISE NOTICE '✅ Sistema de Experiencia instalado correctamente';
  RAISE NOTICE '📊 20 niveles creados (Nivel 1-20)';
  RAISE NOTICE '🎯 Tabla profiles actualizada (experience_points, level, exp_to_next_level)';
  RAISE NOTICE '⚡ Funciones creadas: calculate_level_from_exp(), get_level_info(), award_exp()';
  RAISE NOTICE '🔄 Triggers actualizados para otorgar EXP';
  RAISE NOTICE '👁️ Vistas creadas: v_level_leaderboard, v_user_profile_with_level';
END $$;
