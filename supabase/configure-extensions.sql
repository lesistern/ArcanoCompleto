-- ==================================================================
-- CONFIGURACIÓN INICIAL DE EXTENSIONES
-- ==================================================================
-- Fecha: 2025-11-15
-- Requisito: Extensiones habilitadas (pg_cron, pg_trgm, etc.)
-- ==================================================================

-- ============================================================
-- 1. pg_trgm - Índices de Búsqueda Fuzzy
-- ============================================================

-- Índice para búsqueda fuzzy en nombres de conjuros
CREATE INDEX IF NOT EXISTS spells_name_trgm_idx ON spells
USING gin (name gin_trgm_ops);

COMMENT ON INDEX spells_name_trgm_idx IS 'Búsqueda fuzzy en nombres de conjuros (tolerancia a typos)';

-- Índice para búsqueda fuzzy en nombres de dotes
CREATE INDEX IF NOT EXISTS feats_name_trgm_idx ON feats
USING gin (name gin_trgm_ops);

COMMENT ON INDEX feats_name_trgm_idx IS 'Búsqueda fuzzy en nombres de dotes (tolerancia a typos)';

-- Índice para búsqueda fuzzy en nombres de clases
CREATE INDEX IF NOT EXISTS classes_name_trgm_idx ON classes
USING gin (name gin_trgm_ops);

COMMENT ON INDEX classes_name_trgm_idx IS 'Búsqueda fuzzy en nombres de clases (tolerancia a typos)';


-- ============================================================
-- 2. pg_cron - Tareas Programadas
-- ============================================================

-- Tarea 1: Recalcular estadísticas del leaderboard diariamente
-- Ejecuta cada día a las 3:00 AM UTC
DO $$
BEGIN
  PERFORM cron.schedule(
    'refresh-leaderboard-stats',
    '0 3 * * *',
    $$
      ANALYZE profiles;
      ANALYZE feedback_tickets;
      ANALYZE feedback_votes;
    $$
  );
END $$;

-- Tarea 2: Limpiar sesiones expiradas cada hora
DO $$
BEGIN
  PERFORM cron.schedule(
    'clean-expired-sessions',
    '0 * * * *',
    $$
      DELETE FROM auth.sessions
      WHERE expires_at < NOW()
      AND expires_at < NOW() - INTERVAL '7 days';
    $$
  );
END $$;

-- Tarea 3: Recalcular niveles de usuarios (por si hay desincronización)
-- Ejecuta cada día a las 4:00 AM UTC
DO $$
BEGIN
  PERFORM cron.schedule(
    'recalculate-user-levels',
    '0 4 * * *',
    $$
      UPDATE profiles
      SET level = calculate_level_from_exp(experience_points)
      WHERE level != calculate_level_from_exp(experience_points);
    $$
  );
END $$;


-- ============================================================
-- 3. Funciones Auxiliares de Búsqueda Fuzzy
-- ============================================================

-- Función para buscar conjuros con tolerancia a errores
CREATE OR REPLACE FUNCTION search_spells_fuzzy(search_term TEXT, max_results INT DEFAULT 10)
RETURNS TABLE (
  id UUID,
  name TEXT,
  school TEXT,
  level_text TEXT,
  similarity_score REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.name,
    s.school,
    s.level_text,
    similarity(s.name, search_term) AS similarity_score
  FROM spells s
  WHERE s.name % search_term  -- Operador de similitud de pg_trgm
  ORDER BY similarity(s.name, search_term) DESC
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION search_spells_fuzzy IS 'Búsqueda fuzzy de conjuros con tolerancia a errores de tipeo';

-- Ejemplo de uso:
-- SELECT * FROM search_spells_fuzzy('fireboll');  -- Encuentra "Fireball"


-- Función para buscar dotes con tolerancia a errores
CREATE OR REPLACE FUNCTION search_feats_fuzzy(search_term TEXT, max_results INT DEFAULT 10)
RETURNS TABLE (
  id UUID,
  name TEXT,
  category TEXT,
  similarity_score REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    f.id,
    f.name,
    f.category,
    similarity(f.name, search_term) AS similarity_score
  FROM feats f
  WHERE f.name % search_term
  ORDER BY similarity(f.name, search_term) DESC
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION search_feats_fuzzy IS 'Búsqueda fuzzy de dotes con tolerancia a errores de tipeo';


-- ============================================================
-- 4. Vista de Monitoreo de Queries Lentas
-- ============================================================

CREATE OR REPLACE VIEW v_slow_queries AS
SELECT
  query,
  calls,
  ROUND(mean_exec_time::numeric, 2) AS avg_ms,
  ROUND(total_exec_time::numeric, 2) AS total_ms,
  ROUND((mean_exec_time * calls)::numeric, 2) AS total_time,
  ROUND((100.0 * total_exec_time / SUM(total_exec_time) OVER ())::numeric, 2) AS pct
FROM pg_stat_statements
WHERE query NOT LIKE '%pg_stat_statements%'
  AND query NOT LIKE '%pg_catalog%'
  AND calls > 10
ORDER BY mean_exec_time DESC
LIMIT 20;

COMMENT ON VIEW v_slow_queries IS 'Top 20 queries más lentas para optimización';

-- Ejemplo de uso:
-- SELECT * FROM v_slow_queries;


-- ============================================================
-- 5. Configuración de pg_trgm
-- ============================================================

-- Ajustar threshold de similitud (0.3 = 30% de similitud mínima)
-- Valor por defecto: 0.3
-- Más bajo = más resultados pero menos precisos
-- Más alto = menos resultados pero más precisos
SET pg_trgm.similarity_threshold = 0.3;

-- Para hacerlo permanente en toda la base de datos:
-- ALTER DATABASE postgres SET pg_trgm.similarity_threshold = 0.3;


-- ============================================================
-- VERIFICACIÓN
-- ============================================================

-- Ver tareas programadas activas
SELECT
  jobid,
  jobname,
  schedule,
  active,
  nodename
FROM cron.job
ORDER BY jobid;

-- Ver índices creados
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE indexname LIKE '%trgm%'
ORDER BY tablename, indexname;

-- Probar búsqueda fuzzy de conjuros (si hay datos)
-- SELECT * FROM search_spells_fuzzy('acid arow');  -- Encuentra "Acid Arrow"

-- ==================================================================
-- FIN DE LA CONFIGURACIÓN
-- ==================================================================

-- Resultado esperado:
-- ✅ 3 tareas de cron programadas
-- ✅ 3 índices fuzzy creados (spells, feats, classes)
-- ✅ 2 funciones de búsqueda fuzzy
-- ✅ 1 vista de queries lentas
