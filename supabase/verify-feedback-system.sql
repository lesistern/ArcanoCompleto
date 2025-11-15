-- ============================================================================
-- Verificación del Sistema de Feedback
-- ============================================================================
-- Este script verifica si las tablas y funciones del sistema de feedback
-- están creadas correctamente
-- ============================================================================

DO $$
DECLARE
  v_tickets_exists BOOLEAN;
  v_votes_exists BOOLEAN;
  v_vote_trigger_exists BOOLEAN;
  v_view_exists BOOLEAN;
BEGIN
  -- Verificar si existe la tabla feedback_tickets
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name = 'feedback_tickets'
  ) INTO v_tickets_exists;

  -- Verificar si existe la tabla feedback_votes
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name = 'feedback_votes'
  ) INTO v_votes_exists;

  -- Verificar si existe la vista v_feedback_tickets_with_author
  SELECT EXISTS (
    SELECT 1 FROM information_schema.views
    WHERE table_schema = 'public'
    AND table_name = 'v_feedback_tickets_with_author'
  ) INTO v_view_exists;

  -- Verificar si existe el trigger de XP
  SELECT EXISTS (
    SELECT 1 FROM information_schema.triggers
    WHERE trigger_schema = 'public'
    AND trigger_name = 'trigger_award_exp_for_report'
  ) INTO v_vote_trigger_exists;

  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════════════';
  RAISE NOTICE '         VERIFICACIÓN DEL SISTEMA DE FEEDBACK';
  RAISE NOTICE '═══════════════════════════════════════════════════════════';
  RAISE NOTICE '';

  -- Mostrar resultados
  IF v_tickets_exists THEN
    RAISE NOTICE '✅ Tabla feedback_tickets existe';
  ELSE
    RAISE NOTICE '❌ Tabla feedback_tickets NO existe';
  END IF;

  IF v_votes_exists THEN
    RAISE NOTICE '✅ Tabla feedback_votes existe';
  ELSE
    RAISE NOTICE '❌ Tabla feedback_votes NO existe';
  END IF;

  IF v_view_exists THEN
    RAISE NOTICE '✅ Vista v_feedback_tickets_with_author existe';
  ELSE
    RAISE NOTICE '❌ Vista v_feedback_tickets_with_author NO existe';
  END IF;

  IF v_vote_trigger_exists THEN
    RAISE NOTICE '✅ Trigger de XP (trigger_award_exp_for_report) existe';
  ELSE
    RAISE NOTICE '❌ Trigger de XP NO existe';
  END IF;

  RAISE NOTICE '';

  -- Verificar si hay tickets
  IF v_tickets_exists THEN
    DECLARE
      v_ticket_count INTEGER;
    BEGIN
      SELECT COUNT(*) INTO v_ticket_count FROM feedback_tickets;
      RAISE NOTICE '📊 Tickets en la base de datos: %', v_ticket_count;
    END;
  END IF;

  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════════════';

  IF v_tickets_exists AND v_votes_exists AND v_view_exists THEN
    RAISE NOTICE '✅ Sistema de Feedback: COMPLETAMENTE CONFIGURADO';
    RAISE NOTICE '';
    RAISE NOTICE '🎉 Todo está listo para usar!';
  ELSE
    RAISE NOTICE '⚠️  Sistema de Feedback: INCOMPLETO';
    RAISE NOTICE '';
    RAISE NOTICE '📝 Debes ejecutar:';
    RAISE NOTICE '   - supabase/create-feedback-system.sql (si feedback_tickets no existe)';
    RAISE NOTICE '   - supabase/add-feedback-votes.sql (si feedback_votes no existe)';
  END IF;

  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════════════';
  RAISE NOTICE '';
END $$;
