-- ============================================================================
-- VERIFICACIÓN FINAL - Ejecutar después del script clean
-- ============================================================================

-- 1. Verificar que los 6 tiers se crearon correctamente
SELECT
  '✅ TIERS DE USUARIO' as verificacion,
  code,
  name,
  CASE
    WHEN can_translate THEN '✓ Traducir'
    ELSE ''
  END as traducir,
  CASE
    WHEN can_review THEN '✓ Revisar'
    ELSE ''
  END as revisar,
  CASE
    WHEN can_approve THEN '✓ Aprobar'
    ELSE ''
  END as aprobar,
  COALESCE(max_edits_per_day::text, 'Ilimitado') as ediciones_dia
FROM user_tiers
ORDER BY
  CASE code
    WHEN 'guest' THEN 1
    WHEN 'user' THEN 2
    WHEN 'contributor' THEN 3
    WHEN 'translator' THEN 4
    WHEN 'reviewer' THEN 5
    WHEN 'admin' THEN 6
  END;

-- 2. Verificar tablas creadas
SELECT
  '✅ TABLAS CREADAS' as verificacion,
  table_name as tabla,
  (
    SELECT COUNT(*)
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = t.table_name
  ) as columnas
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN ('profiles', 'translation_edits', 'translation_votes', 'languages', 'user_tiers')
ORDER BY table_name;

-- 3. Verificar trigger de auto-creación de perfiles
SELECT
  '✅ TRIGGERS' as verificacion,
  trigger_name as nombre,
  event_object_table as tabla,
  action_timing as cuando,
  event_manipulation as evento
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  AND trigger_name IN ('on_auth_user_created', 'update_profiles_updated_at')
ORDER BY trigger_name;

-- 4. Verificar políticas de RLS
SELECT
  '✅ POLÍTICAS RLS' as verificacion,
  tablename as tabla,
  policyname as politica,
  CASE
    WHEN permissive = 'PERMISSIVE' THEN '✓'
    ELSE '✗'
  END as activa
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('profiles', 'translation_edits', 'translation_votes')
ORDER BY tablename, policyname;

-- 5. Verificar funciones creadas
SELECT
  '✅ FUNCIONES' as verificacion,
  routine_name as funcion,
  CASE
    WHEN routine_type = 'FUNCTION' THEN '✓ Función'
    ELSE routine_type
  END as tipo
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN ('handle_new_user', 'check_user_permission', 'approve_translation_edit', 'update_updated_at_column')
ORDER BY routine_name;

-- 6. Verificar vistas
SELECT
  '✅ VISTAS' as verificacion,
  table_name as vista,
  '✓ Creada' as estado
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name IN ('v_translation_stats', 'v_top_contributors')
ORDER BY table_name;

-- 7. Resumen final
SELECT
  '📊 RESUMEN FINAL' as tipo,
  'Sistema de autenticación instalado correctamente' as mensaje
UNION ALL
SELECT '', '✅ ' || (SELECT COUNT(*) FROM user_tiers)::text || ' tiers de usuario'
UNION ALL
SELECT '', '✅ ' || (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('profiles', 'translation_edits', 'translation_votes', 'languages', 'user_tiers'))::text || ' tablas creadas'
UNION ALL
SELECT '', '✅ ' || (SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_schema = 'public' AND trigger_name IN ('on_auth_user_created', 'update_profiles_updated_at'))::text || ' triggers activos'
UNION ALL
SELECT '', '✅ ' || (SELECT COUNT(DISTINCT tablename) FROM pg_policies WHERE schemaname = 'public' AND tablename IN ('profiles', 'translation_edits', 'translation_votes'))::text || ' tablas con RLS'
UNION ALL
SELECT '', '🚀 Todo listo para comenzar';
