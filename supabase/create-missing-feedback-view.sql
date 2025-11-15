-- ============================================================================
-- CREAR VISTA FALTANTE: v_feedback_tickets_with_author
-- ============================================================================
-- Esta vista debería existir en add-karma-system.sql, pero puede que no se
-- haya ejecutado o se haya omitido. Este script crea solo la vista necesaria.
-- ============================================================================

-- Vista mejorada de tickets con info del autor
CREATE OR REPLACE VIEW v_feedback_tickets_with_author AS
SELECT
  ft.*,
  p.display_name AS author_display_name,
  p.username_slug AS author_username,
  p.experience_points AS author_exp,  -- Cambiado de karma_points a experience_points
  p.level AS author_level,            -- Agregado nivel del autor
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

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================

-- Verificar que la vista se creó correctamente
SELECT
  'Vista v_feedback_tickets_with_author creada' AS status,
  COUNT(*) AS total_registros
FROM v_feedback_tickets_with_author;

-- ============================================================================
-- NOTAS
-- ============================================================================
-- Esta vista combina información de:
-- - feedback_tickets (tabla principal de tickets)
-- - profiles (info del usuario autor)
-- - feedback_votes (conteo de votos, si la tabla existe)
--
-- IMPORTANTE: Esta vista asume que ya existen:
-- ✓ Tabla feedback_tickets
-- ✓ Tabla profiles
-- ✓ Tabla feedback_votes (opcional, pero debería existir)
--
-- Si alguna de estas tablas no existe, ejecutar primero:
-- 1. create-feedback-system.sql
-- 2. add-feedback-votes.sql
-- 3. reform-karma-to-exp-system-fixed.sql (para columnas experience_points y level)
-- ============================================================================
