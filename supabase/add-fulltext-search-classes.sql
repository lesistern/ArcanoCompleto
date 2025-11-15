-- ============================================================================
-- FULL-TEXT SEARCH PARA CLASES (CLASSES)
-- ============================================================================

-- 1. AGREGAR COLUMNA DE BÚSQUEDA FULL-TEXT
ALTER TABLE public.classes
ADD COLUMN IF NOT EXISTS fts_search tsvector
GENERATED ALWAYS AS (
  -- Peso A: Nombre de la clase
  setweight(to_tsvector('spanish', coalesce(name, '')), 'A') ||

  -- Peso B: Descripción
  setweight(to_tsvector('spanish', coalesce(description, '')), 'B') ||

  -- Peso C: Tipo, alineamiento, competencias
  setweight(to_tsvector('spanish',
    coalesce(class_type, '') || ' ' ||
    coalesce(alignment_restrictions, '') || ' ' ||
    coalesce(weapon_proficiencies, '') || ' ' ||
    coalesce(armor_proficiencies, '')
  ), 'C')
) STORED;

-- 2. CREAR ÍNDICE GIN
CREATE INDEX IF NOT EXISTS idx_classes_fts_search
ON public.classes
USING GIN (fts_search);

-- 3. FUNCIÓN RPC PARA BÚSQUEDA
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

-- 4. FUNCIÓN CON FILTROS
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
-- VERIFICACIÓN
-- ============================================================================

SELECT
  'Clases indexadas' AS status,
  COUNT(*) AS total_classes
FROM public.classes
WHERE fts_search IS NOT NULL;

-- Prueba
SELECT * FROM public.search_classes('guerrero', 5);

-- ============================================================================
