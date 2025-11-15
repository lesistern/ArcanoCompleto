-- ============================================================================
-- VERIFICACIÓN DEL SISTEMA DE FEEDBACK
-- ============================================================================
-- Este script verifica que el sistema de feedback esté correctamente configurado
-- Ejecutar en: Supabase SQL Editor
-- ============================================================================

-- 1. VERIFICAR TABLA feedback_tickets
SELECT
  'Tabla feedback_tickets' AS verificacion,
  COUNT(*) AS total_tickets,
  COUNT(*) FILTER (WHERE status = 'open') AS abiertos,
  COUNT(*) FILTER (WHERE status = 'resolved') AS resueltos
FROM public.feedback_tickets;

-- 2. VERIFICAR VISTA v_feedback_tickets_with_author
SELECT
  'Vista v_feedback_tickets_with_author' AS verificacion,
  COUNT(*) AS registros
FROM v_feedback_tickets_with_author;

-- 3. VERIFICAR VISTA v_open_tickets
SELECT
  'Vista v_open_tickets' AS verificacion,
  COUNT(*) AS registros
FROM v_open_tickets;

-- 4. VERIFICAR ENUMS
SELECT
  'ENUM feedback_category' AS verificacion,
  COUNT(*) AS total_opciones
FROM pg_enum
JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
WHERE pg_type.typname = 'feedback_category';

SELECT
  'ENUM feedback_priority' AS verificacion,
  COUNT(*) AS total_opciones
FROM pg_enum
JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
WHERE pg_type.typname = 'feedback_priority';

SELECT
  'ENUM feedback_status' AS verificacion,
  COUNT(*) AS total_opciones
FROM pg_enum
JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
WHERE pg_type.typname = 'feedback_status';

-- 5. VERIFICAR RLS POLICIES
SELECT
  'Políticas RLS en feedback_tickets' AS verificacion,
  COUNT(*) AS total_policies
FROM pg_policies
WHERE tablename = 'feedback_tickets';

-- 6. VERIFICAR FUNCIONES
SELECT
  'Función close_ticket' AS verificacion,
  CASE
    WHEN EXISTS (
      SELECT 1 FROM pg_proc WHERE proname = 'close_ticket'
    ) THEN '✓ Existe'
    ELSE '✗ No existe'
  END AS estado;

SELECT
  'Función assign_ticket' AS verificacion,
  CASE
    WHEN EXISTS (
      SELECT 1 FROM pg_proc WHERE proname = 'assign_ticket'
    ) THEN '✓ Existe'
    ELSE '✗ No existe'
  END AS estado;

-- ============================================================================
-- RESULTADO ESPERADO:
-- ============================================================================
-- ✓ Tabla feedback_tickets creada
-- ✓ Vista v_feedback_tickets_with_author existe (requiere add-karma-system.sql)
-- ✓ Vista v_open_tickets existe
-- ✓ 7 categorías en feedback_category
-- ✓ 4 prioridades en feedback_priority
-- ✓ 5 estados en feedback_status
-- ✓ 5 políticas RLS
-- ✓ Funciones close_ticket y assign_ticket existen
-- ============================================================================
