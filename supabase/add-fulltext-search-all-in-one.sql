-- ============================================================================
-- FULL-TEXT SEARCH COMPLETO - TODO EN UNO
-- ============================================================================
-- Este script implementa búsqueda full-text en spells, feats y classes
-- Ejecutar en: Supabase SQL Editor (todo en un archivo)
-- Tiempo estimado: 30 segundos
-- ============================================================================

-- ============================================================================
-- 1. SPELLS (CONJUROS)
-- ============================================================================

-- Agregar columna de búsqueda
ALTER TABLE public.spells
ADD COLUMN IF NOT EXISTS fts_search tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('english',
    coalesce(school, '') || ' ' ||
    coalesce(casting_time, '') || ' ' ||
    coalesce(range_info, '') || ' ' ||
    coalesce(duration, '')
  ), 'C')
) STORED;

-- Índice GIN
CREATE INDEX IF NOT EXISTS idx_spells_fts_search
ON public.spells USING GIN (fts_search);

-- Función de búsqueda simple
CREATE OR REPLACE FUNCTION public.search_spells(
  search_query TEXT,
  max_results INT DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  level INT,
  school TEXT,
  description TEXT,
  casting_time TEXT,
  range_info TEXT,
  duration TEXT,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.name,
    s.level,
    s.school,
    s.description,
    s.casting_time,
    s.range_info,
    s.duration,
    ts_rank(s.fts_search, websearch_to_tsquery('english', search_query)) as relevance
  FROM public.spells s
  WHERE s.fts_search @@ websearch_to_tsquery('english', search_query)
  ORDER BY relevance DESC, s.level ASC, s.name ASC
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql STABLE;

-- Función de búsqueda con filtros
CREATE OR REPLACE FUNCTION public.search_spells_filtered(
  search_query TEXT,
  min_level INT DEFAULT 0,
  max_level INT DEFAULT 9,
  spell_school TEXT DEFAULT NULL,
  max_results INT DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  level INT,
  school TEXT,
  description TEXT,
  casting_time TEXT,
  range_info TEXT,
  duration TEXT,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.name,
    s.level,
    s.school,
    s.description,
    s.casting_time,
    s.range_info,
    s.duration,
    ts_rank(s.fts_search, websearch_to_tsquery('english', search_query)) as relevance
  FROM public.spells s
  WHERE
    s.fts_search @@ websearch_to_tsquery('english', search_query)
    AND s.level BETWEEN min_level AND max_level
    AND (spell_school IS NULL OR s.school = spell_school)
  ORDER BY relevance DESC, s.level ASC, s.name ASC
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql STABLE;

-- Función con términos destacados
CREATE OR REPLACE FUNCTION public.search_spells_with_highlights(
  search_query TEXT,
  max_results INT DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  level INT,
  school TEXT,
  description_highlight TEXT,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.name,
    s.level,
    s.school,
    ts_headline(
      'english',
      s.description,
      websearch_to_tsquery('english', search_query),
      'StartSel=<mark>, StopSel=</mark>, MaxWords=50, MinWords=25, ShortWord=3'
    ) as description_highlight,
    ts_rank(s.fts_search, websearch_to_tsquery('english', search_query)) as relevance
  FROM public.spells s
  WHERE s.fts_search @@ websearch_to_tsquery('english', search_query)
  ORDER BY relevance DESC, s.level ASC
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- 2. FEATS (DOTES)
-- ============================================================================

-- Agregar columna de búsqueda
ALTER TABLE public.feats
ADD COLUMN IF NOT EXISTS fts_search tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('spanish', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('spanish', coalesce(benefit, '')), 'B') ||
  setweight(to_tsvector('spanish',
    coalesce(category, '') || ' ' ||
    coalesce(prerequisites, '') || ' ' ||
    coalesce(special, '')
  ), 'C')
) STORED;

-- Índice GIN
CREATE INDEX IF NOT EXISTS idx_feats_fts_search
ON public.feats USING GIN (fts_search);

-- Función de búsqueda simple
CREATE OR REPLACE FUNCTION public.search_feats(
  search_query TEXT,
  max_results INT DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  name TEXT,
  category TEXT,
  prerequisites TEXT,
  benefit TEXT,
  special TEXT,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    f.id,
    f.slug,
    f.name,
    f.category,
    f.prerequisites,
    f.benefit,
    f.special,
    ts_rank(f.fts_search, websearch_to_tsquery('spanish', search_query)) as relevance
  FROM public.feats f
  WHERE f.fts_search @@ websearch_to_tsquery('spanish', search_query)
  ORDER BY relevance DESC, f.name ASC
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql STABLE;

-- Función con filtros
CREATE OR REPLACE FUNCTION public.search_feats_filtered(
  search_query TEXT,
  feat_category TEXT DEFAULT NULL,
  max_results INT DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  name TEXT,
  category TEXT,
  prerequisites TEXT,
  benefit TEXT,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    f.id,
    f.slug,
    f.name,
    f.category,
    f.prerequisites,
    f.benefit,
    ts_rank(f.fts_search, websearch_to_tsquery('spanish', search_query)) as relevance
  FROM public.feats f
  WHERE
    f.fts_search @@ websearch_to_tsquery('spanish', search_query)
    AND (feat_category IS NULL OR f.category = feat_category)
  ORDER BY relevance DESC, f.name ASC
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql STABLE;

-- Función con términos destacados
CREATE OR REPLACE FUNCTION public.search_feats_with_highlights(
  search_query TEXT,
  max_results INT DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  category TEXT,
  benefit_highlight TEXT,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    f.id,
    f.name,
    f.category,
    ts_headline(
      'spanish',
      f.benefit,
      websearch_to_tsquery('spanish', search_query),
      'StartSel=<mark>, StopSel=</mark>, MaxWords=50, MinWords=25'
    ) as benefit_highlight,
    ts_rank(f.fts_search, websearch_to_tsquery('spanish', search_query)) as relevance
  FROM public.feats f
  WHERE f.fts_search @@ websearch_to_tsquery('spanish', search_query)
  ORDER BY relevance DESC
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- 3. CLASSES (CLASES)
-- ============================================================================

-- Agregar columna de búsqueda
ALTER TABLE public.classes
ADD COLUMN IF NOT EXISTS fts_search tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('spanish', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('spanish', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('spanish',
    coalesce(class_type, '')
  ), 'C')
) STORED;

-- Índice GIN
CREATE INDEX IF NOT EXISTS idx_classes_fts_search
ON public.classes USING GIN (fts_search);

-- Función de búsqueda simple
CREATE OR REPLACE FUNCTION public.search_classes(
  search_query TEXT,
  max_results INT DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  name TEXT,
  class_type TEXT,
  hit_die TEXT,
  skill_points_per_level INT,
  description TEXT,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.slug,
    c.name,
    c.class_type,
    c.hit_die,
    c.skill_points_per_level,
    c.description,
    ts_rank(c.fts_search, websearch_to_tsquery('spanish', search_query)) as relevance
  FROM public.classes c
  WHERE c.fts_search @@ websearch_to_tsquery('spanish', search_query)
  ORDER BY relevance DESC, c.name ASC
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql STABLE;

-- Función con filtros
CREATE OR REPLACE FUNCTION public.search_classes_filtered(
  search_query TEXT,
  class_type_filter TEXT DEFAULT NULL,
  max_results INT DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  name TEXT,
  class_type TEXT,
  hit_die TEXT,
  description TEXT,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.slug,
    c.name,
    c.class_type,
    c.hit_die,
    c.description,
    ts_rank(c.fts_search, websearch_to_tsquery('spanish', search_query)) as relevance
  FROM public.classes c
  WHERE
    c.fts_search @@ websearch_to_tsquery('spanish', search_query)
    AND (class_type_filter IS NULL OR c.class_type = class_type_filter)
  ORDER BY relevance DESC, c.name ASC
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- 4. BÚSQUEDA GLOBAL
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
  (
    -- Conjuros
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
  )
  UNION ALL
  (
    -- Dotes
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
  )
  UNION ALL
  (
    -- Clases
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
  )
  ORDER BY relevance DESC;
END;
$$ LANGUAGE plpgsql STABLE;

-- Función para contar resultados
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
-- VERIFICACIÓN
-- ============================================================================

DO $$
DECLARE
  spells_count INT;
  feats_count INT;
  classes_count INT;
BEGIN
  SELECT COUNT(*) INTO spells_count FROM spells WHERE fts_search IS NOT NULL;
  SELECT COUNT(*) INTO feats_count FROM feats WHERE fts_search IS NOT NULL;
  SELECT COUNT(*) INTO classes_count FROM classes WHERE fts_search IS NOT NULL;

  RAISE NOTICE '';
  RAISE NOTICE '✅ Full-Text Search Habilitado:';
  RAISE NOTICE '   - Spells:  % conjuros indexados', spells_count;
  RAISE NOTICE '   - Feats:   % dotes indexadas', feats_count;
  RAISE NOTICE '   - Classes: % clases indexadas', classes_count;
  RAISE NOTICE '';
  RAISE NOTICE '📊 Funciones RPC Creadas (12):';
  RAISE NOTICE '   SPELLS:';
  RAISE NOTICE '   - search_spells(query, max)';
  RAISE NOTICE '   - search_spells_filtered(query, min_level, max_level, school, max)';
  RAISE NOTICE '   - search_spells_with_highlights(query, max)';
  RAISE NOTICE '   FEATS:';
  RAISE NOTICE '   - search_feats(query, max)';
  RAISE NOTICE '   - search_feats_filtered(query, category, max)';
  RAISE NOTICE '   - search_feats_with_highlights(query, max)';
  RAISE NOTICE '   CLASSES:';
  RAISE NOTICE '   - search_classes(query, max)';
  RAISE NOTICE '   - search_classes_filtered(query, type, max)';
  RAISE NOTICE '   GLOBAL:';
  RAISE NOTICE '   - search_all(query, max_per_type)';
  RAISE NOTICE '   - search_count(query)';
  RAISE NOTICE '';
END $$;

-- Prueba rápida
SELECT 'Prueba de búsqueda global: "fire"' as test;
SELECT * FROM search_all('fire', 3);

-- ============================================================================
-- COMPLETADO
-- ============================================================================
