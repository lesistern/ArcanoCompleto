-- ============================================================================
-- D&D 3.5 Compendium - Supabase Database Schema
-- ============================================================================
-- Versión: 1.0
-- Fecha: 2025-01-14
-- ============================================================================

-- Extension para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLAS PRINCIPALES DE CONTENIDO
-- ============================================================================

-- ----------------------------------------------------------------------------
-- DOTES (Feats)
-- ----------------------------------------------------------------------------
CREATE TABLE feats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'General', 'Combate', 'Metamágica', 'Creación de objetos', 'Especial'
  prerequisites TEXT,
  benefit TEXT NOT NULL,
  special TEXT,
  normal TEXT,
  source_book TEXT DEFAULT 'Player''s Handbook',
  source_page INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsqueda
CREATE INDEX idx_feats_slug ON feats(slug);
CREATE INDEX idx_feats_category ON feats(category);
CREATE INDEX idx_feats_name ON feats(name);

-- Índice fulltext para búsqueda
CREATE INDEX idx_feats_search ON feats USING gin(to_tsvector('spanish', name || ' ' || COALESCE(benefit, '')));

-- ----------------------------------------------------------------------------
-- HABILIDADES (Skills)
-- ----------------------------------------------------------------------------
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  key_ability TEXT NOT NULL, -- 'Fuerza', 'Destreza', 'Constitución', 'Inteligencia', 'Sabiduría', 'Carisma'
  trained_only BOOLEAN DEFAULT FALSE,
  armor_penalty BOOLEAN DEFAULT FALSE,
  description TEXT NOT NULL,
  check_info TEXT,
  action_info TEXT,
  retry_info TEXT,
  special TEXT,
  synergy TEXT,
  untrained TEXT,
  source_book TEXT DEFAULT 'Player''s Handbook',
  source_page INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_skills_slug ON skills(slug);
CREATE INDEX idx_skills_key_ability ON skills(key_ability);
CREATE INDEX idx_skills_name ON skills(name);
CREATE INDEX idx_skills_search ON skills USING gin(to_tsvector('spanish', name || ' ' || COALESCE(description, '')));

-- ----------------------------------------------------------------------------
-- ARMAS (Weapons)
-- ----------------------------------------------------------------------------
CREATE TABLE weapons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  weapon_type TEXT NOT NULL, -- 'simple', 'marcial', 'exótica'
  category TEXT NOT NULL, -- 'melee', 'ranged'
  size TEXT NOT NULL, -- 'Diminuta', 'Pequeña', 'Mediana', 'Grande'
  cost TEXT NOT NULL,
  damage TEXT NOT NULL,
  critical TEXT NOT NULL,
  range_increment TEXT,
  weight TEXT NOT NULL,
  damage_types TEXT[] NOT NULL, -- ['Perforante'], ['Cortante', 'Contundente'], etc.
  damage_logic TEXT DEFAULT 'or', -- 'and' o 'or' para múltiples tipos de daño
  description TEXT,
  special_properties TEXT,
  source_book TEXT DEFAULT 'Player''s Handbook',
  source_page INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_weapons_slug ON weapons(slug);
CREATE INDEX idx_weapons_type ON weapons(weapon_type);
CREATE INDEX idx_weapons_category ON weapons(category);
CREATE INDEX idx_weapons_size ON weapons(size);
CREATE INDEX idx_weapons_damage_types ON weapons USING gin(damage_types);
CREATE INDEX idx_weapons_search ON weapons USING gin(to_tsvector('spanish', name || ' ' || COALESCE(description, '')));

-- ----------------------------------------------------------------------------
-- CLASES (Classes)
-- ----------------------------------------------------------------------------
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  hit_die TEXT NOT NULL, -- 'd4', 'd6', 'd8', 'd10', 'd12'
  skill_points_per_level INTEGER NOT NULL,
  class_skills TEXT[] NOT NULL,
  weapon_proficiencies TEXT[] NOT NULL,
  armor_proficiencies TEXT[] NOT NULL,
  bab_progression TEXT NOT NULL, -- 'poor', 'medium', 'good'
  fortitude_save TEXT NOT NULL, -- 'poor', 'good'
  reflex_save TEXT NOT NULL,
  will_save TEXT NOT NULL,
  spellcasting_ability TEXT, -- NULL para no-casters, 'Int', 'Wis', 'Cha' para casters
  description TEXT NOT NULL,
  role TEXT, -- 'Tank', 'Striker', 'Controller', 'Leader', 'Defender'
  source_book TEXT DEFAULT 'Player''s Handbook',
  source_page INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_classes_slug ON classes(slug);
CREATE INDEX idx_classes_name ON classes(name);
CREATE INDEX idx_classes_search ON classes USING gin(to_tsvector('spanish', name || ' ' || COALESCE(description, '')));

-- ----------------------------------------------------------------------------
-- PROGRESIÓN DE CLASES (Class Progression)
-- ----------------------------------------------------------------------------
CREATE TABLE class_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  level INTEGER NOT NULL CHECK (level >= 1 AND level <= 20),
  bab INTEGER NOT NULL,
  fort_save INTEGER NOT NULL,
  ref_save INTEGER NOT NULL,
  will_save INTEGER NOT NULL,
  special_features TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_id, level)
);

CREATE INDEX idx_class_features_class ON class_features(class_id);
CREATE INDEX idx_class_features_level ON class_features(level);

-- ----------------------------------------------------------------------------
-- HECHIZOS POR DÍA (Spells Per Day)
-- ----------------------------------------------------------------------------
CREATE TABLE class_spells_per_day (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  level INTEGER NOT NULL CHECK (level >= 1 AND level <= 20),
  spell_level INTEGER NOT NULL CHECK (spell_level >= 0 AND spell_level <= 9),
  spells_per_day TEXT NOT NULL, -- '3', '4', '-', etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_id, level, spell_level)
);

CREATE INDEX idx_spells_per_day_class ON class_spells_per_day(class_id);

-- ----------------------------------------------------------------------------
-- RAZAS (Races)
-- ----------------------------------------------------------------------------
CREATE TABLE races (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  size TEXT NOT NULL, -- 'Pequeño', 'Mediano'
  base_speed INTEGER NOT NULL, -- en pies
  ability_adjustments JSONB NOT NULL, -- {"str": 0, "dex": 2, "con": -2, "int": 0, "wis": 0, "cha": 0}
  racial_traits TEXT[] NOT NULL,
  automatic_languages TEXT[] NOT NULL,
  bonus_languages TEXT[] NOT NULL,
  favored_class TEXT, -- 'Cualquiera', 'Guerrero', etc.
  level_adjustment INTEGER DEFAULT 0,
  description TEXT NOT NULL,
  source_book TEXT DEFAULT 'Player''s Handbook',
  source_page INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_races_slug ON races(slug);
CREATE INDEX idx_races_name ON races(name);
CREATE INDEX idx_races_size ON races(size);
CREATE INDEX idx_races_search ON races USING gin(to_tsvector('spanish', name || ' ' || COALESCE(description, '')));

-- ----------------------------------------------------------------------------
-- RASGOS RACIALES DETALLADOS
-- ----------------------------------------------------------------------------
CREATE TABLE racial_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  race_id UUID NOT NULL REFERENCES races(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_racial_features_race ON racial_features(race_id);

-- ----------------------------------------------------------------------------
-- HECHIZOS (Spells)
-- ----------------------------------------------------------------------------
CREATE TABLE spells (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  school TEXT NOT NULL, -- 'Abjuración', 'Conjuración', 'Adivinación', etc.
  subschool TEXT,
  descriptors TEXT[], -- ['Fuego'], ['Mal', 'Miedo'], etc.
  casting_time TEXT NOT NULL,
  range_info TEXT NOT NULL,
  target TEXT,
  effect TEXT,
  area TEXT,
  duration TEXT NOT NULL,
  saving_throw TEXT,
  spell_resistance TEXT,
  description TEXT NOT NULL,
  material_components TEXT,
  focus TEXT,
  xp_cost TEXT,
  source_book TEXT DEFAULT 'Player''s Handbook',
  source_page INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_spells_slug ON spells(slug);
CREATE INDEX idx_spells_school ON spells(school);
CREATE INDEX idx_spells_descriptors ON spells USING gin(descriptors);
CREATE INDEX idx_spells_search ON spells USING gin(to_tsvector('spanish', name || ' ' || COALESCE(description, '')));

-- ----------------------------------------------------------------------------
-- NIVELES DE HECHIZOS POR CLASE
-- ----------------------------------------------------------------------------
CREATE TABLE spell_class_levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  spell_id UUID NOT NULL REFERENCES spells(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  spell_level INTEGER NOT NULL CHECK (spell_level >= 0 AND spell_level <= 9),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(spell_id, class_id)
);

CREATE INDEX idx_spell_class_spell ON spell_class_levels(spell_id);
CREATE INDEX idx_spell_class_class ON spell_class_levels(class_id);
CREATE INDEX idx_spell_class_level ON spell_class_levels(spell_level);

-- ============================================================================
-- TABLAS DE USUARIOS Y FAVORITOS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- FAVORITOS (Favorites)
-- ----------------------------------------------------------------------------
CREATE TABLE user_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL, -- 'feat', 'skill', 'weapon', 'class', 'race', 'spell'
  item_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

CREATE INDEX idx_favorites_user ON user_favorites(user_id);
CREATE INDEX idx_favorites_type ON user_favorites(item_type);

-- ----------------------------------------------------------------------------
-- LISTAS PERSONALIZADAS (Custom Lists)
-- ----------------------------------------------------------------------------
CREATE TABLE user_lists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lists_user ON user_lists(user_id);
CREATE INDEX idx_lists_public ON user_lists(is_public);

-- ----------------------------------------------------------------------------
-- ITEMS EN LISTAS
-- ----------------------------------------------------------------------------
CREATE TABLE list_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  list_id UUID NOT NULL REFERENCES user_lists(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL,
  item_id UUID NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(list_id, item_type, item_id)
);

CREATE INDEX idx_list_items_list ON list_items(list_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Habilitar RLS en tablas de usuarios
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE list_items ENABLE ROW LEVEL SECURITY;

-- Políticas para favoritos
CREATE POLICY "Los usuarios pueden ver sus propios favoritos"
  ON user_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden insertar sus propios favoritos"
  ON user_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus propios favoritos"
  ON user_favorites FOR DELETE
  USING (auth.uid() = user_id);

-- Políticas para listas
CREATE POLICY "Los usuarios pueden ver sus propias listas"
  ON user_lists FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Los usuarios pueden crear sus propias listas"
  ON user_lists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden actualizar sus propias listas"
  ON user_lists FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus propias listas"
  ON user_lists FOR DELETE
  USING (auth.uid() = user_id);

-- Políticas para items de listas
CREATE POLICY "Los usuarios pueden ver items de sus listas o listas públicas"
  ON list_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_lists
      WHERE user_lists.id = list_items.list_id
      AND (user_lists.user_id = auth.uid() OR user_lists.is_public = true)
    )
  );

CREATE POLICY "Los usuarios pueden agregar items a sus listas"
  ON list_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_lists
      WHERE user_lists.id = list_items.list_id
      AND user_lists.user_id = auth.uid()
    )
  );

CREATE POLICY "Los usuarios pueden eliminar items de sus listas"
  ON list_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_lists
      WHERE user_lists.id = list_items.list_id
      AND user_lists.user_id = auth.uid()
    )
  );

-- ============================================================================
-- FUNCIONES Y TRIGGERS
-- ============================================================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_feats_updated_at BEFORE UPDATE ON feats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_weapons_updated_at BEFORE UPDATE ON weapons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_races_updated_at BEFORE UPDATE ON races
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_spells_updated_at BEFORE UPDATE ON spells
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_lists_updated_at BEFORE UPDATE ON user_lists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCIÓN DE BÚSQUEDA GLOBAL
-- ============================================================================

CREATE OR REPLACE FUNCTION search_all_content(search_query TEXT)
RETURNS TABLE (
  item_type TEXT,
  item_id UUID,
  name TEXT,
  description TEXT,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  (
    SELECT
      'feat'::TEXT as item_type,
      id as item_id,
      name,
      benefit as description,
      ts_rank(to_tsvector('spanish', name || ' ' || COALESCE(benefit, '')), plainto_tsquery('spanish', search_query)) as rank
    FROM feats
    WHERE to_tsvector('spanish', name || ' ' || COALESCE(benefit, '')) @@ plainto_tsquery('spanish', search_query)
  )
  UNION ALL
  (
    SELECT
      'skill'::TEXT,
      id,
      name,
      description,
      ts_rank(to_tsvector('spanish', name || ' ' || COALESCE(description, '')), plainto_tsquery('spanish', search_query))
    FROM skills
    WHERE to_tsvector('spanish', name || ' ' || COALESCE(description, '')) @@ plainto_tsquery('spanish', search_query)
  )
  UNION ALL
  (
    SELECT
      'weapon'::TEXT,
      id,
      name,
      description,
      ts_rank(to_tsvector('spanish', name || ' ' || COALESCE(description, '')), plainto_tsquery('spanish', search_query))
    FROM weapons
    WHERE to_tsvector('spanish', name || ' ' || COALESCE(description, '')) @@ plainto_tsquery('spanish', search_query)
  )
  UNION ALL
  (
    SELECT
      'class'::TEXT,
      id,
      name,
      description,
      ts_rank(to_tsvector('spanish', name || ' ' || COALESCE(description, '')), plainto_tsquery('spanish', search_query))
    FROM classes
    WHERE to_tsvector('spanish', name || ' ' || COALESCE(description, '')) @@ plainto_tsquery('spanish', search_query)
  )
  UNION ALL
  (
    SELECT
      'race'::TEXT,
      id,
      name,
      description,
      ts_rank(to_tsvector('spanish', name || ' ' || COALESCE(description, '')), plainto_tsquery('spanish', search_query))
    FROM races
    WHERE to_tsvector('spanish', name || ' ' || COALESCE(description, '')) @@ plainto_tsquery('spanish', search_query)
  )
  UNION ALL
  (
    SELECT
      'spell'::TEXT,
      id,
      name,
      description,
      ts_rank(to_tsvector('spanish', name || ' ' || COALESCE(description, '')), plainto_tsquery('spanish', search_query))
    FROM spells
    WHERE to_tsvector('spanish', name || ' ' || COALESCE(description, '')) @@ plainto_tsquery('spanish', search_query)
  )
  ORDER BY rank DESC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMENTARIOS PARA DOCUMENTACIÓN
-- ============================================================================

COMMENT ON TABLE feats IS 'Dotes del sistema D&D 3.5';
COMMENT ON TABLE skills IS 'Habilidades del sistema D&D 3.5';
COMMENT ON TABLE weapons IS 'Armas mundanas y mágicas';
COMMENT ON TABLE classes IS 'Clases base y de prestigio';
COMMENT ON TABLE races IS 'Razas jugables';
COMMENT ON TABLE spells IS 'Hechizos de todas las clases';
COMMENT ON TABLE user_favorites IS 'Favoritos de usuarios autenticados';
COMMENT ON TABLE user_lists IS 'Listas personalizadas de usuarios';

-- ============================================================================
-- FIN DEL ESQUEMA
-- ============================================================================
