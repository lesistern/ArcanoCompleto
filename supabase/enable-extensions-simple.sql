-- ==================================================================
-- HABILITAR EXTENSIONES DE POSTGRES (VERSIÓN SIMPLE)
-- ==================================================================
-- Ejecutar este archivo completo en Supabase SQL Editor
-- ==================================================================

-- 1. pg_vector - Búsqueda Semántica
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. pg_cron - Tareas Programadas
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 3. pgroonga - Búsqueda Full-Text Multiidioma
CREATE EXTENSION IF NOT EXISTS pgroonga;

-- 4. pg_trgm - Búsqueda Fuzzy
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 5. uuid-ossp - Generación de UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 6. pg_stat_statements - Monitoreo de Performance
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- ==================================================================
-- VERIFICACIÓN
-- ==================================================================

SELECT
  extname AS "Extensión",
  extversion AS "Versión",
  '✅ Habilitada' AS "Estado"
FROM pg_extension
WHERE extname IN ('vector', 'pg_cron', 'pgroonga', 'pg_trgm', 'uuid-ossp', 'pg_stat_statements')
ORDER BY extname;
