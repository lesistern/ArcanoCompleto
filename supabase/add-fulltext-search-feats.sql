-- ============================================================================
-- FULL-TEXT SEARCH PARA DOTES (FEATS)
-- ============================================================================

-- 1. AGREGAR COLUMNA DE BÚSQUEDA FULL-TEXT
ALTER TABLE public.feats
ADD COLUMN IF NOT EXISTS fts_search tsvector
GENERATED ALWAYS AS (
  -- Peso A: Nombre de la dote (máxima relevancia)
  setweight(to_tsvector('spanish', coalesce(name, '')), 'A') ||

  -- Peso B: Beneficio principal
  setweight(to_tsvector('spanish', coalesce(benefit, '')), 'B') ||

  -- Peso C: Categoría, prerrequisitos, especial
  setweight(to_tsvector('spanish',
    coalesce(category, '') || ' ' ||
    coalesce(prerequisites, '') || ' ' ||
    coalesce(special, '')
  ), 'C')
) STORED;

-- 2. CREAR ÍNDICE GIN
CREATE INDEX IF NOT EXISTS idx_feats_fts_search
ON public.feats
USING GIN (fts_search);

-- 3. FUNCIÓN RPC PARA BÚSQUEDA
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

-- 4. FUNCIÓN CON FILTROS
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

-- 5. FUNCIÓN CON DESTACADO
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
-- VERIFICACIÓN
-- ============================================================================

SELECT
  'Dotes indexadas' AS status,
  COUNT(*) AS total_feats
FROM public.feats
WHERE fts_search IS NOT NULL;

-- Prueba
SELECT * FROM public.search_feats('combate', 5);

-- ============================================================================
-- EJEMPLOS DE USO
-- ============================================================================
-- Buscar dotes de combate
-- SELECT * FROM search_feats('combate', 10);

-- Buscar por categoría
-- SELECT * FROM search_feats_filtered('ataque', 'Combate', 10);

-- Buscar dotes de metamagia
-- SELECT * FROM search_feats_filtered('hechizo', 'Metamágica', 10);
-- ============================================================================
