-- ==================================================================
-- HABILITAR EXTENSIONES ÚTILES PARA EL COMPENDIUM D&D
-- ==================================================================
-- Fecha: 2025-11-15
-- Propósito: Habilitar extensiones de Postgres para mejorar funcionalidad
-- ==================================================================

-- ============================================================
-- 1. pg_vector - Búsqueda Semántica
-- ============================================================
-- Permite búsqueda por similitud de texto usando embeddings
-- Útil para: "buscar conjuros similares a Fireball"

CREATE EXTENSION IF NOT EXISTS vector;

COMMENT ON EXTENSION vector IS 'Búsqueda vectorial semántica para conjuros, dotes y monstruos';

-- Ejemplo de uso futuro:
-- ALTER TABLE spells ADD COLUMN embedding vector(1536);
-- CREATE INDEX ON spells USING ivfflat (embedding vector_cosine_ops);


-- ============================================================
-- 2. pg_cron - Tareas Programadas
-- ============================================================
-- Permite ejecutar tareas automáticas periódicas
-- Útil para: recalcular leaderboard, limpiar sesiones, etc.

CREATE EXTENSION IF NOT EXISTS pg_cron;

COMMENT ON EXTENSION pg_cron IS 'Scheduler para tareas automáticas (leaderboard, limpieza, stats)';

-- Ejemplos de tareas programadas:

-- Recalcular ranking diario a las 3 AM
-- SELECT cron.schedule(
--   'refresh-leaderboard',
--   '0 3 * * *',
--   'REFRESH MATERIALIZED VIEW v_level_leaderboard'
-- );

-- Limpiar sesiones expiradas cada hora
-- SELECT cron.schedule(
--   'clean-expired-sessions',
--   '0 * * * *',
--   'DELETE FROM auth.sessions WHERE expires_at < NOW()'
-- );


-- ============================================================
-- 3. pgroonga - Búsqueda Full-Text Multiidioma
-- ============================================================
-- Mejor búsqueda full-text que la nativa de Postgres
-- Útil para: buscar en español e inglés simultáneamente

CREATE EXTENSION IF NOT EXISTS pgroonga;

COMMENT ON EXTENSION pgroonga IS 'Búsqueda full-text avanzada en español/inglés con tolerancia a errores';

-- Ejemplo de uso futuro:
-- CREATE INDEX ON spells USING pgroonga (name_es, name_en, description_es);
-- SELECT * FROM spells WHERE name_es &@~ 'bola de fugo'; -- Encuentra "Bola de Fuego"


-- ============================================================
-- 4. pg_trgm - Búsqueda Fuzzy (Opcional)
-- ============================================================
-- Búsqueda de texto con tolerancia a errores de tipeo
-- Alternativa más ligera a pgroonga

CREATE EXTENSION IF NOT EXISTS pg_trgm;

COMMENT ON EXTENSION pg_trgm IS 'Búsqueda fuzzy con similitud de texto (typos, búsqueda aproximada)';

-- Ejemplo de uso:
-- CREATE INDEX ON spells USING gin (name_es gin_trgm_ops);
-- SELECT * FROM spells WHERE name_es % 'fireboll'; -- Encuentra "Fireball"


-- ============================================================
-- 5. uuid-ossp - Generación de UUIDs
-- ============================================================
-- Genera UUIDs únicos (probablemente ya habilitada por Supabase Auth)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

COMMENT ON EXTENSION "uuid-ossp" IS 'Generación de UUIDs para IDs únicos';


-- ============================================================
-- 6. pg_stat_statements - Monitoreo de Performance
-- ============================================================
-- Rastrea estadísticas de queries para optimización

CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

COMMENT ON EXTENSION pg_stat_statements IS 'Monitoreo de queries lentas para optimización';

-- Ver queries más lentas:
-- SELECT query, mean_exec_time, calls
-- FROM pg_stat_statements
-- ORDER BY mean_exec_time DESC
-- LIMIT 10;


-- ============================================================
-- VERIFICACIÓN
-- ============================================================

-- Ver todas las extensiones habilitadas
SELECT extname AS "Extensión", extversion AS "Versión"
FROM pg_extension
WHERE extname IN ('vector', 'pg_cron', 'pgroonga', 'pg_trgm', 'uuid-ossp', 'pg_stat_statements')
ORDER BY extname;

-- ==================================================================
-- FIN DEL SCRIPT
-- ==================================================================
