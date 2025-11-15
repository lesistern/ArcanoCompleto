-- ============================================================================
-- SISTEMA DE HOJAS DE PERSONAJE (USER CHARACTERS)
-- ============================================================================
--
-- Este script crea:
-- 1. Tabla user_characters para guardar personajes de D&D 3.5
-- 2. Tabla user_favorites para marcar contenido favorito
-- 3. Row Level Security (RLS) policies
-- 4. Funciones helper para validación y cálculos
-- 5. Triggers para timestamps
--
-- Ejecutar en: Supabase SQL Editor
-- ============================================================================

-- ============================================================================
-- 1. TABLA DE PERSONAJES DE USUARIO
-- ============================================================================

DROP TABLE IF EXISTS public.user_characters CASCADE;

CREATE TABLE public.user_characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Información básica
  name TEXT NOT NULL,
  race_slug TEXT REFERENCES public.races(slug),
  alignment TEXT,
  deity TEXT,
  level INTEGER DEFAULT 1 CHECK (level >= 1 AND level <= 20),
  experience_points INTEGER DEFAULT 0,

  -- Habilidades (Ability Scores)
  -- Formato: {base: {str: 15, dex: 14, ...}, racial: {...}, current: {...}}
  ability_scores JSONB NOT NULL DEFAULT '{
    "base": {"str": 10, "dex": 10, "con": 10, "int": 10, "wis": 10, "cha": 10},
    "racial": {"str": 0, "dex": 0, "con": 0, "int": 0, "wis": 0, "cha": 0},
    "current": {"str": 10, "dex": 10, "con": 10, "int": 10, "wis": 10, "cha": 10}
  }'::JSONB,

  -- Modificadores calculados
  ability_modifiers JSONB DEFAULT '{
    "str": 0, "dex": 0, "con": 0, "int": 0, "wis": 0, "cha": 0
  }'::JSONB,

  -- Clases y niveles (soporte multiclase)
  -- Formato: [{"class_slug": "fighter", "level": 5}, {"class_slug": "wizard", "level": 3}]
  classes JSONB NOT NULL DEFAULT '[]'::JSONB,

  -- Stats de combate
  hit_points_max INTEGER,
  hit_points_current INTEGER,
  armor_class INTEGER,
  touch_ac INTEGER,
  flat_footed_ac INTEGER,
  initiative INTEGER,
  base_attack_bonus TEXT, -- "+8/+3" format

  -- Salvaciones (Saving Throws)
  fortitude_save INTEGER,
  reflex_save INTEGER,
  will_save INTEGER,

  -- Skills (Habilidades)
  -- Formato: {"climb": 8, "hide": 5, "search": 3, ...}
  skills JSONB DEFAULT '{}'::JSONB,

  -- Feats (Dotes)
  feats TEXT[] DEFAULT ARRAY[]::TEXT[],

  -- Equipo (Equipment)
  -- Formato: {
  --   "weapons": [{"slug": "longsword", "equipped": true, "magic_bonus": 1}],
  --   "armor": [{"slug": "chainmail", "equipped": true}],
  --   "items": [{"name": "Rope, silk (50 ft.)", "quantity": 1}],
  --   "money": {"pp": 0, "gp": 150, "sp": 0, "cp": 0}
  -- }
  equipment JSONB DEFAULT '{
    "weapons": [],
    "armor": [],
    "items": [],
    "money": {"pp": 0, "gp": 0, "sp": 0, "cp": 0}
  }'::JSONB,

  -- Conjuros (Spells) - para clases lanzadoras
  -- Formato: {
  --   "known": ["magic-missile", "shield", "fireball"],
  --   "prepared": ["magic-missile", "shield"],
  --   "slots": {"0": 4, "1": 3, "2": 2}
  -- }
  spells JSONB DEFAULT '{
    "known": [],
    "prepared": [],
    "slots": {}
  }'::JSONB,

  -- Descripción y apariencia
  background TEXT,
  personality TEXT,
  appearance TEXT,
  age INTEGER,
  height TEXT,
  weight TEXT,
  gender TEXT,

  -- Metadata
  is_public BOOLEAN DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_alignment CHECK (alignment IN (
    'Lawful Good', 'Neutral Good', 'Chaotic Good',
    'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
    'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
  )),
  CONSTRAINT valid_level CHECK (level >= 1 AND level <= 20),
  CONSTRAINT name_not_empty CHECK (LENGTH(TRIM(name)) > 0)
);

-- Índices para performance
CREATE INDEX idx_user_characters_user ON public.user_characters(user_id);
CREATE INDEX idx_user_characters_race ON public.user_characters(race_slug);
CREATE INDEX idx_user_characters_level ON public.user_characters(level);
CREATE INDEX idx_user_characters_public ON public.user_characters(is_public) WHERE is_public = true;
CREATE INDEX idx_user_characters_created ON public.user_characters(created_at DESC);

-- Comentarios
COMMENT ON TABLE public.user_characters IS 'Hojas de personaje de D&D 3.5 creadas por usuarios';
COMMENT ON COLUMN public.user_characters.ability_scores IS 'Puntuaciones de habilidad (base, racial, current) en formato JSONB';
COMMENT ON COLUMN public.user_characters.classes IS 'Array de clases con niveles para soporte multiclase';
COMMENT ON COLUMN public.user_characters.skills IS 'Ranks de skills del personaje';
COMMENT ON COLUMN public.user_characters.equipment IS 'Inventario completo del personaje';
COMMENT ON COLUMN public.user_characters.is_public IS 'Si es true, el personaje es visible para todos los usuarios';


-- ============================================================================
-- 2. TABLA DE FAVORITOS
-- ============================================================================

DROP TABLE IF EXISTS public.user_favorites CASCADE;

CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Entidad favorita
  entity_type TEXT NOT NULL, -- 'spell', 'feat', 'class', 'race', 'monster', 'item', 'character'
  entity_slug TEXT NOT NULL, -- slug de la entidad

  -- Notas personales del usuario sobre este favorito
  notes TEXT,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraint único: un usuario no puede marcar la misma entidad dos veces
  UNIQUE(user_id, entity_type, entity_slug)
);

-- Índices
CREATE INDEX idx_user_favorites_user ON public.user_favorites(user_id);
CREATE INDEX idx_user_favorites_type ON public.user_favorites(entity_type);
CREATE INDEX idx_user_favorites_entity ON public.user_favorites(entity_type, entity_slug);

-- Comentarios
COMMENT ON TABLE public.user_favorites IS 'Contenido marcado como favorito por los usuarios';
COMMENT ON COLUMN public.user_favorites.entity_type IS 'Tipo de entidad: spell, feat, class, race, monster, item, character';
COMMENT ON COLUMN public.user_favorites.entity_slug IS 'Slug de la entidad favorita';


-- ============================================================================
-- 3. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Habilitar RLS en user_characters
ALTER TABLE public.user_characters ENABLE ROW LEVEL SECURITY;

-- Policy: Los usuarios pueden ver sus propios personajes + personajes públicos
DROP POLICY IF EXISTS "Users can view own and public characters" ON public.user_characters;
CREATE POLICY "Users can view own and public characters"
  ON public.user_characters
  FOR SELECT
  USING (
    auth.uid() = user_id OR is_public = true
  );

-- Policy: Los usuarios pueden crear sus propios personajes
DROP POLICY IF EXISTS "Users can create own characters" ON public.user_characters;
CREATE POLICY "Users can create own characters"
  ON public.user_characters
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Los usuarios pueden actualizar solo sus propios personajes
DROP POLICY IF EXISTS "Users can update own characters" ON public.user_characters;
CREATE POLICY "Users can update own characters"
  ON public.user_characters
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Los usuarios pueden eliminar solo sus propios personajes
DROP POLICY IF EXISTS "Users can delete own characters" ON public.user_characters;
CREATE POLICY "Users can delete own characters"
  ON public.user_characters
  FOR DELETE
  USING (auth.uid() = user_id);

-- Habilitar RLS en user_favorites
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Policy: Los usuarios solo pueden ver sus propios favoritos
DROP POLICY IF EXISTS "Users can manage own favorites" ON public.user_favorites;
CREATE POLICY "Users can manage own favorites"
  ON public.user_favorites
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ============================================================================
-- 4. TRIGGERS
-- ============================================================================

-- Trigger para actualizar updated_at en user_characters
DROP TRIGGER IF EXISTS update_user_characters_updated_at ON public.user_characters;
CREATE TRIGGER update_user_characters_updated_at
  BEFORE UPDATE ON public.user_characters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- ============================================================================
-- 5. FUNCIONES HELPER
-- ============================================================================

-- Función: Calcular modificador de habilidad
CREATE OR REPLACE FUNCTION public.calculate_ability_modifier(score INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN FLOOR((score - 10) / 2.0);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION public.calculate_ability_modifier IS 'Calcula el modificador de una puntuación de habilidad';


-- Función: Calcular nivel total del personaje (suma de todos los niveles de clase)
CREATE OR REPLACE FUNCTION public.calculate_total_level(classes_json JSONB)
RETURNS INTEGER AS $$
DECLARE
  total INTEGER := 0;
  class_entry JSONB;
BEGIN
  FOR class_entry IN SELECT * FROM jsonb_array_elements(classes_json)
  LOOP
    total := total + (class_entry->>'level')::INTEGER;
  END LOOP;

  RETURN total;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION public.calculate_total_level IS 'Calcula el nivel total de un personaje multiclase';


-- Función: Validar que el personaje tiene las dotes requeridas
CREATE OR REPLACE FUNCTION public.validate_character_feats(
  character_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  char_feats TEXT[];
  char_level INTEGER;
  base_feats INTEGER;
  bonus_feats INTEGER := 0;
  total_allowed INTEGER;
BEGIN
  -- Obtener feats y nivel del personaje
  SELECT feats, level INTO char_feats, char_level
  FROM public.user_characters
  WHERE id = character_id;

  -- Calcular feats base (1 al nivel 1, +1 cada 3 niveles)
  base_feats := 1 + FLOOR((char_level - 1) / 3.0);

  -- TODO: Calcular bonus feats por clase (Fighter, Wizard, etc.)
  -- Por ahora solo validamos feats base

  total_allowed := base_feats + bonus_feats;

  -- Verificar que no tenga más feats de las permitidas
  IF array_length(char_feats, 1) > total_allowed THEN
    RETURN false;
  END IF;

  RETURN true;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION public.validate_character_feats IS 'Valida que el personaje no tenga más feats de las permitidas por nivel';


-- Función: Obtener personajes públicos destacados
CREATE OR REPLACE FUNCTION public.get_featured_characters(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  name TEXT,
  race_name TEXT,
  level INTEGER,
  classes JSONB,
  avatar_url TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    uc.id,
    uc.name,
    r.name as race_name,
    uc.level,
    uc.classes,
    uc.avatar_url,
    uc.created_at
  FROM public.user_characters uc
  LEFT JOIN public.races r ON uc.race_slug = r.slug
  WHERE uc.is_public = true
  ORDER BY uc.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.get_featured_characters IS 'Obtiene personajes públicos destacados para mostrar en la comunidad';


-- Función: Duplicar un personaje
CREATE OR REPLACE FUNCTION public.duplicate_character(
  source_character_id UUID,
  new_name TEXT
)
RETURNS UUID AS $$
DECLARE
  new_character_id UUID;
  source_char RECORD;
BEGIN
  -- Verificar que el usuario actual sea el dueño del personaje original
  SELECT * INTO source_char
  FROM public.user_characters
  WHERE id = source_character_id AND user_id = auth.uid();

  IF source_char IS NULL THEN
    RAISE EXCEPTION 'Character not found or access denied';
  END IF;

  -- Crear copia del personaje
  INSERT INTO public.user_characters (
    user_id, name, race_slug, alignment, deity, level, experience_points,
    ability_scores, ability_modifiers, classes,
    hit_points_max, hit_points_current, armor_class, touch_ac, flat_footed_ac, initiative, base_attack_bonus,
    fortitude_save, reflex_save, will_save,
    skills, feats, equipment, spells,
    background, personality, appearance, age, height, weight, gender,
    is_public
  )
  SELECT
    auth.uid(), new_name, race_slug, alignment, deity, level, experience_points,
    ability_scores, ability_modifiers, classes,
    hit_points_max, hit_points_max, armor_class, touch_ac, flat_footed_ac, initiative, base_attack_bonus,
    fortitude_save, reflex_save, will_save,
    skills, feats, equipment, spells,
    background, personality, appearance, age, height, weight, gender,
    false -- Nueva copia siempre privada
  FROM public.user_characters
  WHERE id = source_character_id
  RETURNING id INTO new_character_id;

  RETURN new_character_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.duplicate_character IS 'Crea una copia de un personaje existente con un nuevo nombre';


-- ============================================================================
-- 6. VISTAS ÚTILES
-- ============================================================================

-- Vista: Estadísticas de personajes por usuario
CREATE OR REPLACE VIEW v_user_character_stats AS
SELECT
  user_id,
  COUNT(*) as total_characters,
  COUNT(*) FILTER (WHERE is_public = true) as public_characters,
  AVG(level) as avg_level,
  MAX(level) as max_level,
  array_agg(DISTINCT race_slug) FILTER (WHERE race_slug IS NOT NULL) as races_used
FROM public.user_characters
GROUP BY user_id;

COMMENT ON VIEW v_user_character_stats IS 'Estadísticas de personajes por usuario';


-- Vista: Personajes por raza
CREATE OR REPLACE VIEW v_characters_by_race AS
SELECT
  r.name as race_name,
  r.slug as race_slug,
  COUNT(uc.id) as character_count,
  AVG(uc.level) as avg_level
FROM public.races r
LEFT JOIN public.user_characters uc ON r.slug = uc.race_slug
WHERE uc.is_public = true
GROUP BY r.name, r.slug
ORDER BY character_count DESC;

COMMENT ON VIEW v_characters_by_race IS 'Cantidad de personajes públicos por raza';


-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================

-- Verificar que las tablas se crearon
SELECT
  'Tabla user_characters creada' AS status,
  COUNT(*) AS total_characters
FROM public.user_characters;

SELECT
  'Tabla user_favorites creada' AS status,
  COUNT(*) AS total_favorites
FROM public.user_favorites;

-- Ver funciones creadas
SELECT
  'Funciones helper creadas' AS status,
  COUNT(*) AS total_functions
FROM pg_proc
WHERE proname IN (
  'calculate_ability_modifier',
  'calculate_total_level',
  'validate_character_feats',
  'get_featured_characters',
  'duplicate_character'
);

-- ============================================================================
-- NOTAS DE USO
-- ============================================================================
--
-- Para crear un personaje (desde la UI):
-- INSERT INTO public.user_characters (user_id, name, race_slug, classes)
-- VALUES (
--   auth.uid(),
--   'Thorin Ironforge',
--   'dwarf',
--   '[{"class_slug": "fighter", "level": 5}]'::JSONB
-- );
--
-- Para marcar un conjuro como favorito:
-- INSERT INTO public.user_favorites (user_id, entity_type, entity_slug)
-- VALUES (auth.uid(), 'spell', 'fireball');
--
-- Para duplicar un personaje:
-- SELECT public.duplicate_character('uuid-del-personaje', 'Thorin II');
--
-- Para ver personajes públicos destacados:
-- SELECT * FROM public.get_featured_characters(10);
--
-- ============================================================================
