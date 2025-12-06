-- ============================================================================
-- Migration: Class-Related Tables with i18n Support
-- ============================================================================
-- Fecha: 2025-11-27
-- Descripción: Crea tablas para almacenar información detallada de clases
--              con soporte para inglés y español
-- ============================================================================

-- Tabla: class_features
-- Almacena características de clase por nivel con soporte bilingüe
CREATE TABLE IF NOT EXISTS class_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_slug TEXT NOT NULL REFERENCES classes(slug) ON DELETE CASCADE,
  name_en TEXT NOT NULL,
  name_es TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 1 AND level <= 20),
  type TEXT, -- Ex, Su, Sp, etc.
  description_en TEXT NOT NULL,
  description_es TEXT NOT NULL,
  summary_en TEXT, -- Resumen para cards
  summary_es TEXT, -- Resumen para cards
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_class_features_class ON class_features(class_slug);
CREATE INDEX idx_class_features_level ON class_features(level);
CREATE INDEX idx_class_features_class_level ON class_features(class_slug, level);

-- Tabla: class_progression
-- Almacena progresión de BAB y salvaciones por nivel
CREATE TABLE IF NOT EXISTS class_progression (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_slug TEXT NOT NULL REFERENCES classes(slug) ON DELETE CASCADE,
  level INTEGER NOT NULL CHECK (level >= 1 AND level <= 20),
  bab TEXT NOT NULL, -- "+1", "+6/+1", "+11/+6/+1", etc.
  fort_save INTEGER NOT NULL,
  ref_save INTEGER NOT NULL,
  will_save INTEGER NOT NULL,
  special_en TEXT[], -- Array de habilidades especiales en inglés
  special_es TEXT[], -- Array de habilidades especiales en español
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_slug, level)
);

CREATE INDEX idx_class_progression_class ON class_progression(class_slug);
CREATE INDEX idx_class_progression_level ON class_progression(level);

-- Tabla: class_spell_progression
-- Almacena progresión de hechizos para clases con magia
CREATE TABLE IF NOT EXISTS class_spell_progression (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_slug TEXT NOT NULL REFERENCES classes(slug) ON DELETE CASCADE,
  class_level INTEGER NOT NULL CHECK (class_level >= 1 AND class_level <= 20),
  spell_level INTEGER NOT NULL CHECK (spell_level >= 0 AND spell_level <= 9),
  spells_per_day INTEGER, -- NULL significa "—" (no puede lanzar)
  spells_known INTEGER, -- NULL para clases que preparan hechizos
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_slug, class_level, spell_level)
);

CREATE INDEX idx_spell_progression_class ON class_spell_progression(class_slug);
CREATE INDEX idx_spell_progression_class_level ON class_spell_progression(class_slug, class_level);

-- Tabla: starting_packages
-- Almacena paquetes de inicio por clase y raza
CREATE TABLE IF NOT EXISTS starting_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_slug TEXT NOT NULL REFERENCES classes(slug) ON DELETE CASCADE,
  race_en TEXT NOT NULL,
  race_es TEXT NOT NULL,
  armor JSONB, -- {name_en, name_es, ac, armor_check_penalty, speed, weight}
  weapons JSONB[], -- [{name_en, name_es, damage, crit, range, weight, type}]
  skills JSONB[], -- [{skill_en, skill_es, ranks, ability, armor_check_penalty}]
  feat_en TEXT,
  feat_es TEXT,
  gear_en TEXT[],
  gear_es TEXT[],
  gold TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_slug, race_en)
);

CREATE INDEX idx_starting_packages_class ON starting_packages(class_slug);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para class_features
CREATE TRIGGER update_class_features_updated_at BEFORE UPDATE ON class_features
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comentarios para documentación
COMMENT ON TABLE class_features IS 'Características de clase por nivel con soporte bilingüe (en/es)';
COMMENT ON TABLE class_progression IS 'Progresión de BAB y salvaciones por nivel para cada clase';
COMMENT ON TABLE class_spell_progression IS 'Progresión de hechizos por día y conocidos para clases con magia';
COMMENT ON TABLE starting_packages IS 'Paquetes de equipamiento inicial por clase y raza con soporte bilingüe';

COMMENT ON COLUMN class_features.summary_en IS 'Resumen breve para mostrar en cards (inglés)';
COMMENT ON COLUMN class_features.summary_es IS 'Resumen breve para mostrar en cards (español)';
COMMENT ON COLUMN class_features.description_en IS 'Descripción completa sin modificar del libro (inglés)';
COMMENT ON COLUMN class_features.description_es IS 'Descripción completa sin modificar del libro (español)';
