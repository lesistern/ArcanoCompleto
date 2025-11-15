-- =====================================================
-- Sistema de Votos para Feedback Tickets
-- =====================================================
-- Este script agrega un sistema de votos (+1) para reportes
-- Permite a los usuarios votar por los reportes más importantes
-- Un usuario solo puede votar una vez por reporte
-- =====================================================

-- 1. Crear tabla de votos
CREATE TABLE IF NOT EXISTS public.feedback_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.feedback_tickets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Constraint: Un usuario solo puede votar una vez por ticket
  UNIQUE(ticket_id, user_id)
);

-- 2. Crear índices para performance
CREATE INDEX IF NOT EXISTS idx_feedback_votes_ticket_id ON public.feedback_votes(ticket_id);
CREATE INDEX IF NOT EXISTS idx_feedback_votes_user_id ON public.feedback_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_votes_created_at ON public.feedback_votes(created_at DESC);

-- 3. Habilitar Row Level Security
ALTER TABLE public.feedback_votes ENABLE ROW LEVEL SECURITY;

-- 4. Políticas RLS para feedback_votes

-- Todos pueden ver los votos (para contar)
CREATE POLICY "Votos visibles para todos"
  ON public.feedback_votes
  FOR SELECT
  USING (true);

-- Solo usuarios autenticados pueden votar
CREATE POLICY "Usuarios autenticados pueden votar"
  ON public.feedback_votes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Los usuarios pueden eliminar su propio voto
CREATE POLICY "Usuarios pueden eliminar su voto"
  ON public.feedback_votes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 5. Crear vista con conteo de votos
CREATE OR REPLACE VIEW v_feedback_tickets_with_votes AS
SELECT
  ft.*,
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
LEFT JOIN (
  SELECT ticket_id, COUNT(*) AS vote_count
  FROM feedback_votes
  GROUP BY ticket_id
) vote_counts ON ft.id = vote_counts.ticket_id;

-- 6. Función para toggle voto (agregar o quitar)
CREATE OR REPLACE FUNCTION toggle_feedback_vote(p_ticket_id UUID)
RETURNS TABLE(success BOOLEAN, vote_count BIGINT, user_has_voted BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_vote_exists BOOLEAN;
  v_vote_count BIGINT;
BEGIN
  -- Obtener el user_id del usuario autenticado
  v_user_id := auth.uid();

  -- Verificar si el usuario está autenticado
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Usuario no autenticado';
  END IF;

  -- Verificar si el ticket existe
  IF NOT EXISTS (SELECT 1 FROM feedback_tickets WHERE id = p_ticket_id) THEN
    RAISE EXCEPTION 'Ticket no encontrado';
  END IF;

  -- Verificar si el voto ya existe
  SELECT EXISTS (
    SELECT 1 FROM feedback_votes
    WHERE ticket_id = p_ticket_id
    AND user_id = v_user_id
  ) INTO v_vote_exists;

  IF v_vote_exists THEN
    -- Eliminar voto
    DELETE FROM feedback_votes
    WHERE ticket_id = p_ticket_id
    AND user_id = v_user_id;

    -- Obtener nuevo conteo
    SELECT COUNT(*) INTO v_vote_count
    FROM feedback_votes
    WHERE ticket_id = p_ticket_id;

    RETURN QUERY SELECT true, v_vote_count, false;
  ELSE
    -- Agregar voto
    INSERT INTO feedback_votes (ticket_id, user_id)
    VALUES (p_ticket_id, v_user_id);

    -- Obtener nuevo conteo
    SELECT COUNT(*) INTO v_vote_count
    FROM feedback_votes
    WHERE ticket_id = p_ticket_id;

    RETURN QUERY SELECT true, v_vote_count, true;
  END IF;
END;
$$;

-- 7. Comentarios en la tabla
COMMENT ON TABLE public.feedback_votes IS 'Votos (+1) de usuarios en reportes de feedback';
COMMENT ON COLUMN public.feedback_votes.ticket_id IS 'ID del ticket al que se le dio voto';
COMMENT ON COLUMN public.feedback_votes.user_id IS 'ID del usuario que votó';
COMMENT ON COLUMN public.feedback_votes.created_at IS 'Fecha y hora del voto';

-- 8. Insertar datos de ejemplo (opcional - comentado)
-- INSERT INTO feedback_votes (ticket_id, user_id) VALUES
-- ('ticket-uuid-1', 'user-uuid-1'),
-- ('ticket-uuid-1', 'user-uuid-2'),
-- ('ticket-uuid-2', 'user-uuid-1');

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================

-- Para verificar que todo funciona:
-- SELECT * FROM v_feedback_tickets_with_votes ORDER BY vote_count DESC;
-- SELECT toggle_feedback_vote('ticket-uuid-aqui');
