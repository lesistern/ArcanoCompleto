-- ==================================================================
-- VERIFICACIÓN COMPLETA DE EXTENSIONES CONFIGURADAS
-- ==================================================================
-- Fecha: 2025-11-15
-- Propósito: Verificar que todas las configuraciones se aplicaron correctamente
-- ==================================================================

-- ============================================================
-- 1. Verificar Tareas de Cron Programadas
-- ============================================================

SELECT
  jobid,
  jobname,
  schedule,
  active,
  nodename,
  database
FROM cron.job
ORDER BY jobid;

-- Resultado esperado: 3 tareas
-- 1. refresh-leaderboard-stats (0 3 * * *)
-- 2. clean-expired-sessions (0 * * * *)
-- 3. recalculate-user-levels (0 4 * * *)


-- ============================================================
-- 2. Verificar Índices de Búsqueda Fuzzy
-- ============================================================

SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE indexname LIKE '%trgm%'
ORDER BY tablename, indexname;

-- Resultado esperado: 3 índices
-- - spells_name_trgm_idx
-- - feats_name_trgm_idx
-- - classes_name_trgm_idx


-- ============================================================
-- 3. Verificar Funciones de Búsqueda Fuzzy
-- ============================================================

SELECT
  proname AS function_name,
  pg_get_function_arguments(oid) AS arguments,
  prosrc AS source_code_length
FROM pg_proc
WHERE proname LIKE '%fuzzy%'
ORDER BY proname;

-- Resultado esperado: 2 funciones
-- - search_spells_fuzzy(search_term TEXT, max_results INT DEFAULT 10)
-- - search_feats_fuzzy(search_term TEXT, max_results INT DEFAULT 10)


-- ============================================================
-- 4. Verificar Vista de Queries Lentas
-- ============================================================

SELECT COUNT(*) AS view_exists
FROM pg_views
WHERE viewname = 'v_slow_queries';

-- Resultado esperado: 1 (la vista existe)


-- ============================================================
-- 5. Probar Búsqueda Fuzzy de Conjuros (Si hay datos)
-- ============================================================

-- Buscar conjuros con typo intencional "fireboll" (debería encontrar "Fireball")
SELECT * FROM search_spells_fuzzy('fireboll', 5);

-- Buscar conjuros con typo "acid arow" (debería encontrar "Acid Arrow")
SELECT * FROM search_spells_fuzzy('acid arow', 5);

-- Buscar conjuros con typo "magik misile" (debería encontrar "Magic Missile")
SELECT * FROM search_spells_fuzzy('magik misile', 5);


-- ============================================================
-- 6. Probar Búsqueda Fuzzy de Dotes (Si hay datos)
-- ============================================================

-- Buscar dotes con typo "power atack" (debería encontrar "Power Attack")
SELECT * FROM search_feats_fuzzy('power atack', 5);

-- Buscar dotes con typo "weapn focus" (debería encontrar "Weapon Focus")
SELECT * FROM search_feats_fuzzy('weapn focus', 5);


-- ============================================================
-- 7. Ver Configuración de pg_trgm
-- ============================================================

SHOW pg_trgm.similarity_threshold;

-- Resultado esperado: 0.3 (30% de similitud mínima)


-- ============================================================
-- 8. Verificar Extensiones Habilitadas
-- ============================================================

SELECT
  extname AS "Extensión",
  extversion AS "Versión",
  '✅ Habilitada' AS "Estado"
FROM pg_extension
WHERE extname IN ('vector', 'pg_cron', 'pgroonga', 'pg_trgm', 'uuid-ossp', 'pg_stat_statements')
ORDER BY extname;

-- Resultado esperado: 6 extensiones


-- ==================================================================
-- RESUMEN DE VERIFICACIÓN
-- ==================================================================

-- ✅ Extensiones: 6 habilitadas
-- ✅ Índices fuzzy: 3 creados (spells, feats, classes)
-- ✅ Funciones fuzzy: 2 creadas (search_spells_fuzzy, search_feats_fuzzy)
-- ✅ Vista de performance: v_slow_queries
-- ✅ Tareas de cron: 3 programadas
--
-- Si todos los resultados coinciden, la configuración está completa.
-- Próximo paso: Ejecutar SQLs críticos pendientes (dotes PHB, feedback system, etc.)
