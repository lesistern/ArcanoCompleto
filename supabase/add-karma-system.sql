-- =====================================================
-- Sistema de Karma para Beta Testers
-- =====================================================
-- Sistema de puntos estilo Reddit para reconocer contribuciones
-- Los usuarios ganan karma cuando sus reportes reciben votos
-- =====================================================

-- 1. Agregar columnas de karma y estadísticas a profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS karma_points INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS reports_submitted INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS reports_resolved INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_votes_received INTEGER DEFAULT 0;

-- 2. Crear índice para karma (para leaderboard)
CREATE INDEX IF NOT EXISTS idx_profiles_karma_points ON public.profiles(karma_points DESC);

-- 3. Función para actualizar karma del autor cuando recibe voto
CREATE OR REPLACE FUNCTION update_author_karma_on_vote()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_author_id UUID;
BEGIN
  -- Obtener el user_id del autor del ticket
  SELECT user_id INTO v_author_id
  FROM feedback_tickets
  WHERE id = NEW.ticket_id;

  IF v_author_id IS NOT NULL THEN
    -- Incrementar karma y total_votes_received
    UPDATE profiles
    SET
      karma_points = karma_points + 1,
      total_votes_received = total_votes_received + 1
    WHERE id = v_author_id;
  END IF;

  RETURN NEW;
END;
$$;

-- 4. Función para restar karma cuando se elimina un voto
CREATE OR REPLACE FUNCTION remove_author_karma_on_unvote()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_author_id UUID;
BEGIN
  -- Obtener el user_id del autor del ticket
  SELECT user_id INTO v_author_id
  FROM feedback_tickets
  WHERE id = OLD.ticket_id;

  IF v_author_id IS NOT NULL THEN
    -- Decrementar karma y total_votes_received
    UPDATE profiles
    SET
      karma_points = GREATEST(karma_points - 1, 0), -- No permitir karma negativo
      total_votes_received = GREATEST(total_votes_received - 1, 0)
    WHERE id = v_author_id;
  END IF;

  RETURN OLD;
END;
$$;

-- 5. Crear triggers para actualizar karma automáticamente
DROP TRIGGER IF EXISTS trigger_add_karma_on_vote ON public.feedback_votes;
CREATE TRIGGER trigger_add_karma_on_vote
  AFTER INSERT ON public.feedback_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_author_karma_on_vote();

DROP TRIGGER IF EXISTS trigger_remove_karma_on_unvote ON public.feedback_votes;
CREATE TRIGGER trigger_remove_karma_on_unvote
  AFTER DELETE ON public.feedback_votes
  FOR EACH ROW
  EXECUTE FUNCTION remove_author_karma_on_unvote();

-- 6. Función para incrementar reports_submitted al crear ticket
CREATE OR REPLACE FUNCTION increment_reports_submitted()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE profiles
  SET reports_submitted = reports_submitted + 1
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$;

-- 7. Trigger para contar reportes enviados
DROP TRIGGER IF EXISTS trigger_increment_reports ON public.feedback_tickets;
CREATE TRIGGER trigger_increment_reports
  AFTER INSERT ON public.feedback_tickets
  FOR EACH ROW
  EXECUTE FUNCTION increment_reports_submitted();

-- 8. Función para incrementar reports_resolved y dar bonus karma
CREATE OR REPLACE FUNCTION increment_reports_resolved()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Solo ejecutar si cambió de otro estado a 'resolved'
  IF OLD.status != 'resolved' AND NEW.status = 'resolved' THEN
    UPDATE profiles
    SET
      reports_resolved = reports_resolved + 1,
      karma_points = karma_points + 5 -- Bonus de 5 puntos por reporte resuelto
    WHERE id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$;

-- 9. Trigger para bonus por resolución
DROP TRIGGER IF EXISTS trigger_resolved_bonus ON public.feedback_tickets;
CREATE TRIGGER trigger_resolved_bonus
  AFTER UPDATE ON public.feedback_tickets
  FOR EACH ROW
  EXECUTE FUNCTION increment_reports_resolved();

-- 10. Vista de leaderboard de karma
CREATE OR REPLACE VIEW v_karma_leaderboard AS
SELECT
  p.id,
  p.email,
  p.display_name,
  p.tier_code,
  p.karma_points,
  p.reports_submitted,
  p.reports_resolved,
  p.total_votes_received,
  -- Calcular tasa de éxito
  CASE
    WHEN p.reports_submitted > 0 THEN
      ROUND((p.reports_resolved::NUMERIC / p.reports_submitted::NUMERIC) * 100, 1)
    ELSE 0
  END AS success_rate,
  -- Calcular promedio de votos por reporte
  CASE
    WHEN p.reports_submitted > 0 THEN
      ROUND(p.total_votes_received::NUMERIC / p.reports_submitted::NUMERIC, 1)
    ELSE 0
  END AS avg_votes_per_report
FROM profiles p
WHERE p.reports_submitted > 0 -- Solo mostrar usuarios con reportes
ORDER BY p.karma_points DESC, p.reports_submitted DESC
LIMIT 100;

-- 11. Vista mejorada de tickets con info del autor
CREATE OR REPLACE VIEW v_feedback_tickets_with_author AS
SELECT
  ft.*,
  p.display_name AS author_display_name,
  p.karma_points AS author_karma,
  p.tier_code AS author_tier,
  COALESCE(vote_counts.vote_count, 0) AS vote_count,
  CASE
    WHEN auth.uid() IS NOT NULL THEN EXISTS (
      SELECT 1 FROM feedback_votes fv
      WHERE fv.ticket_id = ft.id
      AND fv.user_id = auth.uid()
    )
    ELSE false
  END AS user_has_voted
FROM feedback_tickets ft
LEFT JOIN profiles p ON ft.user_id = p.id
LEFT JOIN (
  SELECT ticket_id, COUNT(*) AS vote_count
  FROM feedback_votes
  GROUP BY ticket_id
) vote_counts ON ft.id = vote_counts.ticket_id;

-- 12. Función para obtener estadísticas de usuario
CREATE OR REPLACE FUNCTION get_user_stats(p_user_id UUID)
RETURNS TABLE(
  karma_points INTEGER,
  reports_submitted INTEGER,
  reports_resolved INTEGER,
  total_votes_received INTEGER,
  success_rate NUMERIC,
  avg_votes_per_report NUMERIC,
  karma_rank INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.karma_points,
    p.reports_submitted,
    p.reports_resolved,
    p.total_votes_received,
    CASE
      WHEN p.reports_submitted > 0 THEN
        ROUND((p.reports_resolved::NUMERIC / p.reports_submitted::NUMERIC) * 100, 1)
      ELSE 0
    END AS success_rate,
    CASE
      WHEN p.reports_submitted > 0 THEN
        ROUND(p.total_votes_received::NUMERIC / p.reports_submitted::NUMERIC, 1)
      ELSE 0
    END AS avg_votes_per_report,
    (
      SELECT COUNT(*) + 1
      FROM profiles
      WHERE karma_points > p.karma_points
    )::INTEGER AS karma_rank
  FROM profiles p
  WHERE p.id = p_user_id;
END;
$$;

-- 13. Actualizar karma de usuarios existentes basado en votos actuales
-- (Solo ejecutar una vez para migración)
DO $$
DECLARE
  ticket_record RECORD;
  vote_count INTEGER;
BEGIN
  FOR ticket_record IN SELECT id, user_id FROM feedback_tickets LOOP
    -- Contar votos de este ticket
    SELECT COUNT(*) INTO vote_count
    FROM feedback_votes
    WHERE ticket_id = ticket_record.id;

    -- Actualizar karma del autor
    IF vote_count > 0 THEN
      UPDATE profiles
      SET
        karma_points = karma_points + vote_count,
        total_votes_received = total_votes_received + vote_count
      WHERE id = ticket_record.user_id;
    END IF;
  END LOOP;
END;
$$;

-- 14. Comentarios en columnas
COMMENT ON COLUMN profiles.karma_points IS 'Puntos de karma acumulados (estilo Reddit)';
COMMENT ON COLUMN profiles.reports_submitted IS 'Total de reportes enviados';
COMMENT ON COLUMN profiles.reports_resolved IS 'Total de reportes resueltos';
COMMENT ON COLUMN profiles.total_votes_received IS 'Total de votos recibidos en todos los reportes';

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================

-- Para verificar:
-- SELECT * FROM v_karma_leaderboard LIMIT 10;
-- SELECT * FROM get_user_stats('user-uuid-aqui');
-- SELECT * FROM v_feedback_tickets_with_author ORDER BY created_at DESC LIMIT 5;
