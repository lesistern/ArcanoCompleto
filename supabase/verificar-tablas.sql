-- ============================================================================
-- SCRIPT DE VERIFICACIÓN - Ejecutar ANTES del script principal
-- ============================================================================

-- 1. Verificar si las tablas ya existen
SELECT
  table_name,
  CASE
    WHEN table_name IN ('user_tiers', 'profiles', 'translation_edits', 'translation_votes', 'languages')
    THEN '✅ EXISTE'
    ELSE '❌ NO EXISTE'
  END as estado
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('user_tiers', 'profiles', 'translation_edits', 'translation_votes', 'languages')
ORDER BY table_name;

-- 2. Verificar vistas existentes que podrían causar conflicto
SELECT
  table_name as vista,
  '⚠️ EXISTE - Será recreada' as estado
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name IN ('v_translation_stats', 'v_top_contributors')
ORDER BY table_name;

-- 3. Verificar triggers existentes
SELECT
  trigger_name,
  event_object_table as tabla,
  '✅ EXISTE' as estado
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  AND trigger_name IN ('on_auth_user_created', 'update_profiles_updated_at')
ORDER BY trigger_name;

-- 4. Resumen de lo que se creará
SELECT
  '📋 RESUMEN' as tipo,
  'Si ejecutas create-user-tiers-system-clean.sql se creará:' as mensaje
UNION ALL
SELECT '', '- 5 tablas (user_tiers, profiles, translation_edits, translation_votes, languages)'
UNION ALL
SELECT '', '- 2 triggers (creación de perfil, actualización de fecha)'
UNION ALL
SELECT '', '- 2 funciones (check_user_permission, approve_translation_edit)'
UNION ALL
SELECT '', '- 2 vistas (v_translation_stats, v_top_contributors)'
UNION ALL
SELECT '', '- Políticas de Row Level Security (RLS)'
UNION ALL
SELECT '', '- 6 tiers de usuario iniciales';
