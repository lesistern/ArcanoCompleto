-- ============================================================================
-- FULL-TEXT SEARCH COMPLETO - TODAS LAS TABLAS
-- ============================================================================
-- Este script implementa búsqueda full-text en spells, feats, classes y races
-- Ejecutar en: Supabase SQL Editor
-- Tiempo estimado: 30 segundos
-- ============================================================================

-- NOTA: Este script ejecuta los 3 SQLs anteriores + búsqueda global
-- Puedes ejecutar este archivo único o los individuales según prefieras

\i add-fulltext-search-spells.sql
\i add-fulltext-search-feats.sql
\i add-fulltext-search-classes.sql

-- ============================================================================
-- BÚSQUEDA GLOBAL (Todas las tablas)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.search_all(
  search_query TEXT,
  max_results_per_type INT DEFAULT 10
)
RETURNS TABLE (
  result_type TEXT,
  id UUID,
  name TEXT,
  category TEXT,
  description TEXT,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  -- Resultados de Conjuros
  SELECT
    'spell'::TEXT as result_type,
    s.id,
    s.name,
    s.school as category,
    LEFT(s.description, 200) as description,
    ts_rank(s.fts_search, websearch_to_tsquery('english', search_query)) as relevance
  FROM public.spells s
  WHERE s.fts_search @@ websearch_to_tsquery('english', search_query)
  ORDER BY relevance DESC
  LIMIT max_results_per_type

  UNION ALL

  -- Resultados de Dotes
  SELECT
    'feat'::TEXT as result_type,
    f.id,
    f.name,
    f.category,
    LEFT(f.benefit, 200) as description,
    ts_rank(f.fts_search, websearch_to_tsquery('spanish', search_query)) as relevance
  FROM public.feats f
  WHERE f.fts_search @@ websearch_to_tsquery('spanish', search_query)
  ORDER BY relevance DESC
  LIMIT max_results_per_type

  UNION ALL

  -- Resultados de Clases
  SELECT
    'class'::TEXT as result_type,
    c.id,
    c.name,
    c.class_type as category,
    LEFT(c.description, 200) as description,
    ts_rank(c.fts_search, websearch_to_tsquery('spanish', search_query)) as relevance
  FROM public.classes c
  WHERE c.fts_search @@ websearch_to_tsquery('spanish', search_query)
  ORDER BY relevance DESC
  LIMIT max_results_per_type

  ORDER BY relevance DESC;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- FUNCIÓN PARA CONTAR RESULTADOS POR TIPO
-- ============================================================================

CREATE OR REPLACE FUNCTION public.search_count(
  search_query TEXT
)
RETURNS TABLE (
  result_type TEXT,
  total_results BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 'spell'::TEXT as result_type,
         COUNT(*) as total_results
  FROM public.spells
  WHERE fts_search @@ websearch_to_tsquery('english', search_query)

  UNION ALL

  SELECT 'feat'::TEXT as result_type,
         COUNT(*) as total_results
  FROM public.feats
  WHERE fts_search @@ websearch_to_tsquery('spanish', search_query)

  UNION ALL

  SELECT 'class'::TEXT as result_type,
         COUNT(*) as total_results
  FROM public.classes
  WHERE fts_search @@ websearch_to_tsquery('spanish', search_query);
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- VERIFICACIÓN COMPLETA
-- ============================================================================

DO $$
DECLARE
  spells_count INT;
  feats_count INT;
  classes_count INT;
BEGIN
  -- Contar registros indexados
  SELECT COUNT(*) INTO spells_count FROM spells WHERE fts_search IS NOT NULL;
  SELECT COUNT(*) INTO feats_count FROM feats WHERE fts_search IS NOT NULL;
  SELECT COUNT(*) INTO classes_count FROM classes WHERE fts_search IS NOT NULL;

  RAISE NOTICE '✅ Full-Text Search Habilitado:';
  RAISE NOTICE '   - Spells:  % conjuros indexados', spells_count;
  RAISE NOTICE '   - Feats:   % dotes indexadas', feats_count;
  RAISE NOTICE '   - Classes: % clases indexadas', classes_count;
  RAISE NOTICE '';
  RAISE NOTICE '📊 Funciones RPC Creadas:';
  RAISE NOTICE '   - search_spells(query, max)';
  RAISE NOTICE '   - search_spells_filtered(query, min_level, max_level, school, max)';
  RAISE NOTICE '   - search_spells_with_highlights(query, max)';
  RAISE NOTICE '   - search_feats(query, max)';
  RAISE NOTICE '   - search_feats_filtered(query, category, max)';
  RAISE NOTICE '   - search_feats_with_highlights(query, max)';
  RAISE NOTICE '   - search_classes(query, max)';
  RAISE NOTICE '   - search_classes_filtered(query, type, max)';
  RAISE NOTICE '   - search_all(query, max_per_type) -- BÚSQUEDA GLOBAL';
  RAISE NOTICE '   - search_count(query) -- CONTEO POR TIPO';
END $$;

-- ============================================================================
-- PRUEBAS
-- ============================================================================

-- Búsqueda global de "fire"
SELECT * FROM search_all('fire', 3);

-- Conteo de resultados
SELECT * FROM search_count('fire');

-- ============================================================================
-- SIGUIENTE PASO: FRONTEND
-- ============================================================================
-- Ahora puedes usar estas funciones en tu frontend:
--
-- import { supabase } from '@/lib/supabase/client';
--
-- // Búsqueda global
-- const { data } = await supabase.rpc('search_all', {
--   search_query: 'fireball',
--   max_results_per_type: 10
-- });
--
-- // Búsqueda de conjuros con filtros
-- const { data } = await supabase.rpc('search_spells_filtered', {
--   search_query: 'fire',
--   min_level: 1,
--   max_level: 5,
--   spell_school: 'Evocation',
--   max_results: 20
-- });
-- ============================================================================
