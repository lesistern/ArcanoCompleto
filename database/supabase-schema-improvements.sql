-- ============================================================================
-- MEJORAS AL ESQUEMA DE SUPABASE
-- ============================================================================
-- Propósito: Mejorar el esquema actual con tipos de datos más específicos,
--            normalizar datos, y añadir validaciones.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- MEJORAS A LA TABLA WEAPONS
-- ----------------------------------------------------------------------------

-- Problema actual: cost, damage, weight son TEXT cuando deberían ser tipos numéricos
-- Solución: Añadir columnas numéricas separadas para costos y peso

-- 1. Añadir columnas numéricas para el costo
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS cost_gold NUMERIC(10,2);
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS cost_silver NUMERIC(10,2);

-- 2. Añadir columna numérica para peso
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS weight_lb NUMERIC(6,2);

-- 3. Añadir columnas para daño estructurado (pequeño, mediano, grande)
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS damage_small TEXT;
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS damage_medium TEXT;
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS damage_large TEXT;

-- 4. Separar weapon_type en tipo y categoría de combate
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS proficiency TEXT; -- 'simple', 'marcial', 'exótica'
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS combat_category TEXT; -- 'melee', 'ranged', 'melee-ranged'

-- 5. Añadir columna numérica para rango
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS range_feet INTEGER;

-- 6. Añadir propiedades del arma como array
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS properties TEXT[]; -- ['Ligera', 'A dos manos', 'Arrojadiza']

-- 7. Añadir columna para mano (ligera, una mano, dos manos)
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS hands TEXT; -- 'light', 'one-handed', 'two-handed', 'unarmed'

-- 8. Migrar datos existentes a las nuevas columnas numéricas
UPDATE weapons SET
  cost_gold = CASE
    WHEN cost LIKE '%po' THEN CAST(REPLACE(cost, ' po', '') AS NUMERIC)
    ELSE NULL
  END,
  cost_silver = CASE
    WHEN cost LIKE '%pp' THEN CAST(REPLACE(cost, ' pp', '') AS NUMERIC)
    ELSE NULL
  END,
  weight_lb = CAST(REPLACE(weight, ' lb', '') AS NUMERIC),
  range_feet = CASE
    WHEN range_increment IS NOT NULL THEN CAST(REPLACE(range_increment, ' pies', '') AS INTEGER)
    ELSE NULL
  END;

-- 9. Crear índices para las nuevas columnas numéricas
CREATE INDEX IF NOT EXISTS idx_weapons_cost_gold ON weapons(cost_gold) WHERE cost_gold IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_weapons_weight ON weapons(weight_lb);
CREATE INDEX IF NOT EXISTS idx_weapons_proficiency ON weapons(proficiency);
CREATE INDEX IF NOT EXISTS idx_weapons_hands ON weapons(hands);

-- 10. Añadir constraints de validación
ALTER TABLE weapons ADD CONSTRAINT check_proficiency
  CHECK (proficiency IN ('simple', 'marcial', 'exótica') OR proficiency IS NULL);

ALTER TABLE weapons ADD CONSTRAINT check_combat_category
  CHECK (combat_category IN ('melee', 'ranged', 'melee-ranged') OR combat_category IS NULL);

ALTER TABLE weapons ADD CONSTRAINT check_hands
  CHECK (hands IN ('unarmed', 'light', 'one-handed', 'two-handed') OR hands IS NULL);

-- ----------------------------------------------------------------------------
-- MEJORAS A LA TABLA SKILLS
-- ----------------------------------------------------------------------------

-- 1. Normalizar key_ability con enum-like constraint
ALTER TABLE skills ADD CONSTRAINT check_key_ability
  CHECK (key_ability IN ('Fuerza', 'Destreza', 'Constitución', 'Inteligencia', 'Sabiduría', 'Carisma'));

-- 2. Añadir columna para clases que tienen esta habilidad como class skill
ALTER TABLE skills ADD COLUMN IF NOT EXISTS class_skills TEXT[]; -- ['Bardo', 'Pícaro']

-- 3. Añadir nivel de dificultad típico (para ejemplos)
ALTER TABLE skills ADD COLUMN IF NOT EXISTS example_dcs JSONB;
-- Ejemplo: {"10": "Fácil", "15": "Normal", "20": "Difícil", "25": "Heroico"}

-- ----------------------------------------------------------------------------
-- MEJORAS A LA TABLA FEATS
-- ----------------------------------------------------------------------------

-- 1. Normalizar categorías con constraint
ALTER TABLE feats ADD CONSTRAINT check_feat_category
  CHECK (category IN ('General', 'Combate', 'Metamágica', 'Creación de objetos', 'Especial'));

-- 2. Separar prerequisites en campos estructurados
ALTER TABLE feats ADD COLUMN IF NOT EXISTS prerequisite_feats TEXT[]; -- Dotes requeridas
ALTER TABLE feats ADD COLUMN IF NOT EXISTS prerequisite_bab INTEGER; -- BAB mínimo
ALTER TABLE feats ADD COLUMN IF NOT EXISTS prerequisite_abilities JSONB; -- {"str": 13, "dex": 15}
ALTER TABLE feats ADD COLUMN IF NOT EXISTS prerequisite_skills JSONB; -- {"Montar": 1, "Saltar": 4}
ALTER TABLE feats ADD COLUMN IF NOT EXISTS prerequisite_other TEXT; -- Otros prerequisitos en texto

-- 3. Añadir columna para indicar si es metamágica
ALTER TABLE feats ADD COLUMN IF NOT EXISTS is_metamagic BOOLEAN DEFAULT FALSE;

-- 4. Añadir columna para indicar si es de creación de objetos
ALTER TABLE feats ADD COLUMN IF NOT EXISTS is_item_creation BOOLEAN DEFAULT FALSE;

-- 5. Añadir columna para múltiples adquisiciones
ALTER TABLE feats ADD COLUMN IF NOT EXISTS can_take_multiple BOOLEAN DEFAULT FALSE;

-- ----------------------------------------------------------------------------
-- MEJORAS A LA TABLA CLASSES
-- ----------------------------------------------------------------------------

-- 1. Normalizar hit_die
ALTER TABLE classes ADD CONSTRAINT check_hit_die
  CHECK (hit_die IN ('d4', 'd6', 'd8', 'd10', 'd12'));

-- 2. Normalizar progressions
ALTER TABLE classes ADD CONSTRAINT check_bab_progression
  CHECK (bab_progression IN ('poor', 'medium', 'good'));

ALTER TABLE classes ADD CONSTRAINT check_save_progression
  CHECK (fortitude_save IN ('poor', 'good') AND reflex_save IN ('poor', 'good') AND will_save IN ('poor', 'good'));

-- 3. Añadir tipo de clase
ALTER TABLE classes ADD COLUMN IF NOT EXISTS class_type TEXT DEFAULT 'base'; -- 'base', 'prestige', 'npc'
ALTER TABLE classes ADD CONSTRAINT check_class_type
  CHECK (class_type IN ('base', 'prestige', 'npc'));

-- 4. Añadir columna para puntos de habilidad por nivel (no solo INT)
-- Ya existe: skill_points_per_level

-- ----------------------------------------------------------------------------
-- MEJORAS A LA TABLA RACES
-- ----------------------------------------------------------------------------

-- 1. Normalizar size
ALTER TABLE races ADD CONSTRAINT check_race_size
  CHECK (size IN ('Diminuto', 'Pequeño', 'Mediano', 'Grande'));

-- 2. Añadir tipo de raza
ALTER TABLE races ADD COLUMN IF NOT EXISTS creature_type TEXT DEFAULT 'Humanoide';
-- 'Humanoide', 'Monstruoso Humanoide', 'Dragón', 'Extraplanar'

ALTER TABLE races ADD COLUMN IF NOT EXISTS subtypes TEXT[]; -- ['Elfo'], ['Goblinoide'], etc.

-- 3. Añadir darkvision
ALTER TABLE races ADD COLUMN IF NOT EXISTS darkvision INTEGER; -- rango en pies, NULL si no tiene

-- 4. Añadir low-light vision
ALTER TABLE races ADD COLUMN IF NOT EXISTS low_light_vision BOOLEAN DEFAULT FALSE;

-- ----------------------------------------------------------------------------
-- MEJORAS A LA TABLA SPELLS
-- ----------------------------------------------------------------------------

-- 1. Normalizar schools
ALTER TABLE spells ADD CONSTRAINT check_spell_school
  CHECK (school IN (
    'Abjuración', 'Conjuración', 'Adivinación', 'Encantamiento',
    'Evocación', 'Ilusión', 'Nigromancia', 'Transmutación', 'Universal'
  ));

-- 2. Añadir si tiene componentes verbales, somáticos, materiales
ALTER TABLE spells ADD COLUMN IF NOT EXISTS component_verbal BOOLEAN DEFAULT FALSE;
ALTER TABLE spells ADD COLUMN IF NOT EXISTS component_somatic BOOLEAN DEFAULT FALSE;
ALTER TABLE spells ADD COLUMN IF NOT EXISTS component_material BOOLEAN DEFAULT FALSE;
ALTER TABLE spells ADD COLUMN IF NOT EXISTS component_focus BOOLEAN DEFAULT FALSE;
ALTER TABLE spells ADD COLUMN IF NOT EXISTS component_divine_focus BOOLEAN DEFAULT FALSE;
ALTER TABLE spells ADD COLUMN IF NOT EXISTS component_xp BOOLEAN DEFAULT FALSE;

-- 3. Añadir si es un hechizo arcano, divino, o ambos
ALTER TABLE spells ADD COLUMN IF NOT EXISTS spell_type TEXT; -- 'arcane', 'divine', 'both'

-- ----------------------------------------------------------------------------
-- NUEVA TABLA: ARMOR (Armaduras)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS armor (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  armor_type TEXT NOT NULL, -- 'light', 'medium', 'heavy', 'shield'
  cost_gold NUMERIC(10,2),
  cost_silver NUMERIC(10,2),
  armor_bonus INTEGER NOT NULL,
  max_dex_bonus INTEGER, -- NULL si no tiene límite
  armor_check_penalty INTEGER DEFAULT 0,
  arcane_spell_failure INTEGER DEFAULT 0,
  base_speed_30 INTEGER, -- Velocidad si la base es 30 pies
  base_speed_20 INTEGER, -- Velocidad si la base es 20 pies
  weight_lb NUMERIC(6,2),
  description TEXT,
  special_properties TEXT,
  source_book TEXT DEFAULT 'Player''s Handbook',
  source_page INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_armor_slug ON armor(slug);
CREATE INDEX idx_armor_type ON armor(armor_type);
CREATE INDEX idx_armor_bonus ON armor(armor_bonus);

ALTER TABLE armor ADD CONSTRAINT check_armor_type
  CHECK (armor_type IN ('light', 'medium', 'heavy', 'shield'));

-- Trigger para updated_at
CREATE TRIGGER update_armor_updated_at BEFORE UPDATE ON armor
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ----------------------------------------------------------------------------
-- NUEVA TABLA: MAGIC_ITEMS (Objetos Mágicos)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS magic_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  item_type TEXT NOT NULL, -- 'weapon', 'armor', 'wondrous', 'ring', 'rod', 'staff', 'wand', 'potion', 'scroll'
  item_slot TEXT, -- 'head', 'eyes', 'neck', 'shoulders', 'chest', 'body', 'belt', 'wrists', 'hands', 'ring', 'feet'
  caster_level INTEGER NOT NULL,
  aura TEXT, -- 'Evocación moderada', 'Abjuración débil'
  price_gold NUMERIC(12,2),
  weight_lb NUMERIC(6,2),
  description TEXT NOT NULL,
  construction_requirements TEXT,
  construction_cost_gold NUMERIC(12,2),
  source_book TEXT DEFAULT 'Dungeon Master Guide',
  source_page INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_magic_items_slug ON magic_items(slug);
CREATE INDEX idx_magic_items_type ON magic_items(item_type);
CREATE INDEX idx_magic_items_slot ON magic_items(item_slot);
CREATE INDEX idx_magic_items_caster_level ON magic_items(caster_level);

-- Trigger para updated_at
CREATE TRIGGER update_magic_items_updated_at BEFORE UPDATE ON magic_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ----------------------------------------------------------------------------
-- NUEVA TABLA: MONSTERS (Monstruos)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS monsters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  creature_type TEXT NOT NULL,
  creature_subtypes TEXT[],
  size TEXT NOT NULL,
  hit_dice TEXT NOT NULL, -- '4d8+12'
  initiative INTEGER,
  speed JSONB, -- {"base": "30 pies", "fly": "60 pies (buena)"}
  armor_class INTEGER NOT NULL,
  touch_ac INTEGER,
  flat_footed_ac INTEGER,
  base_attack_bonus INTEGER,
  grapple_bonus INTEGER,
  attacks TEXT[],
  full_attack TEXT,
  space TEXT, -- '5 pies', '10 pies'
  reach TEXT, -- '5 pies', '10 pies'
  special_attacks TEXT[],
  special_qualities TEXT[],
  saves JSONB, -- {"fort": 4, "ref": 3, "will": 1}
  abilities JSONB, -- {"str": 15, "dex": 12, "con": 13, "int": 10, "wis": 11, "cha": 8}
  skills JSONB, -- {"Avistar": 8, "Escuchar": 4}
  feats TEXT[],
  environment TEXT,
  organization TEXT,
  challenge_rating TEXT, -- '1', '1/2', '1/4'
  treasure TEXT,
  alignment TEXT,
  advancement TEXT,
  level_adjustment TEXT,
  description TEXT NOT NULL,
  source_book TEXT DEFAULT 'Monster Manual',
  source_page INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_monsters_slug ON monsters(slug);
CREATE INDEX idx_monsters_type ON monsters(creature_type);
CREATE INDEX idx_monsters_size ON monsters(size);
CREATE INDEX idx_monsters_cr ON monsters(challenge_rating);
CREATE INDEX idx_monsters_search ON monsters USING gin(to_tsvector('spanish', name || ' ' || COALESCE(description, '')));

-- Trigger para updated_at
CREATE TRIGGER update_monsters_updated_at BEFORE UPDATE ON monsters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VISTAS ÚTILES
-- ============================================================================

-- Vista para armas con información completa y cálculos
CREATE OR REPLACE VIEW v_weapons_complete AS
SELECT
  w.*,
  -- Costo total en oro (convertir plata a oro)
  COALESCE(w.cost_gold, 0) + COALESCE(w.cost_silver, 0) / 10.0 AS cost_total_gold,
  -- Extraer tipo de arma del weapon_type
  CASE
    WHEN w.weapon_type ILIKE '%simple%' THEN 'simple'
    WHEN w.weapon_type ILIKE '%marcial%' THEN 'marcial'
    WHEN w.weapon_type ILIKE '%exótica%' THEN 'exótica'
  END AS proficiency_level,
  -- Determinar categoría de combate
  CASE
    WHEN w.weapon_type ILIKE '%distancia%' THEN 'ranged'
    WHEN w.weapon_type ILIKE '%cuerpo a cuerpo%' THEN 'melee'
  END AS combat_type
FROM weapons w;

-- Vista para habilidades con su atributo clave abreviado
CREATE OR REPLACE VIEW v_skills_complete AS
SELECT
  s.*,
  CASE
    WHEN s.key_ability = 'Fuerza' THEN 'FUE'
    WHEN s.key_ability = 'Destreza' THEN 'DES'
    WHEN s.key_ability = 'Constitución' THEN 'CON'
    WHEN s.key_ability = 'Inteligencia' THEN 'INT'
    WHEN s.key_ability = 'Sabiduría' THEN 'SAB'
    WHEN s.key_ability = 'Carisma' THEN 'CAR'
  END AS ability_abbr
FROM skills s;

-- Vista para dotes categorizadas
CREATE OR REPLACE VIEW v_feats_by_category AS
SELECT
  category,
  COUNT(*) as total_feats,
  array_agg(name ORDER BY name) as feat_names
FROM feats
GROUP BY category;

-- ============================================================================
-- FUNCIONES DE UTILIDAD
-- ============================================================================

-- Función para calcular el BAB en un nivel dado
CREATE OR REPLACE FUNCTION calculate_bab(
  progression TEXT,
  character_level INTEGER
)
RETURNS INTEGER AS $$
BEGIN
  RETURN CASE progression
    WHEN 'good' THEN character_level
    WHEN 'medium' THEN character_level * 3 / 4
    WHEN 'poor' THEN character_level / 2
    ELSE 0
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Función para calcular salvaciones en un nivel dado
CREATE OR REPLACE FUNCTION calculate_save(
  progression TEXT,
  character_level INTEGER
)
RETURNS INTEGER AS $$
BEGIN
  RETURN CASE progression
    WHEN 'good' THEN 2 + (character_level / 2)
    WHEN 'poor' THEN character_level / 3
    ELSE 0
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================================================
-- COMENTARIOS PARA DOCUMENTACIÓN
-- ============================================================================

COMMENT ON TABLE armor IS 'Armaduras y escudos del sistema D&D 3.5';
COMMENT ON TABLE magic_items IS 'Objetos mágicos de todos los tipos';
COMMENT ON TABLE monsters IS 'Bestiario de criaturas y monstruos';

COMMENT ON COLUMN weapons.cost_gold IS 'Costo en piezas de oro (separado de cost TEXT para queries numéricas)';
COMMENT ON COLUMN weapons.cost_silver IS 'Costo en piezas de plata (separado de cost TEXT para queries numéricas)';
COMMENT ON COLUMN weapons.weight_lb IS 'Peso en libras (separado de weight TEXT para queries numéricas)';
COMMENT ON COLUMN weapons.damage_logic IS 'Lógica de múltiples tipos de daño: "and" significa ambos, "or" significa uno u otro';

-- ============================================================================
-- FIN DE MEJORAS
-- ============================================================================
