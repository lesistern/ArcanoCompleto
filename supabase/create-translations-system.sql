-- ============================================================================
-- SISTEMA DE TRADUCCIONES MULTIIDIOMA PARA D&D 3.5 COMPENDIUM
-- ============================================================================
-- Diseño comunitario: Permite que usuarios contribuyan traducciones
-- Soporta múltiples idiomas: en, es, fr, de, pt, it, etc.
-- ============================================================================

-- ============================================================================
-- 1. TABLA DE IDIOMAS SOPORTADOS
-- ============================================================================

CREATE TABLE IF NOT EXISTS languages (
  code VARCHAR(5) PRIMARY KEY,
  name TEXT NOT NULL,
  native_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar idiomas iniciales
INSERT INTO languages (code, name, native_name, is_active) VALUES
  ('en', 'English', 'English', true),
  ('es', 'Spanish', 'Español', true),
  ('fr', 'French', 'Français', false),
  ('de', 'German', 'Deutsch', false),
  ('pt', 'Portuguese', 'Português', false),
  ('it', 'Italian', 'Italiano', false)
ON CONFLICT (code) DO NOTHING;

COMMENT ON TABLE languages IS 'Idiomas soportados en el compendio';

-- ============================================================================
-- 2. TRADUCCIONES DE CONJUROS (SPELLS)
-- ============================================================================

CREATE TABLE IF NOT EXISTS spell_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  spell_id UUID NOT NULL REFERENCES spells(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code),

  -- Campos traducibles
  name TEXT NOT NULL,
  description TEXT,
  casting_time TEXT,
  range_info TEXT,
  target TEXT,
  effect TEXT,
  area TEXT,
  duration TEXT,
  saving_throw TEXT,
  spell_resistance TEXT,
  material_components TEXT,
  focus TEXT,

  -- Metadatos de traducción
  translated_by UUID, -- ID del usuario que tradujo (futuro)
  reviewed_by UUID, -- ID del revisor (futuro)
  translation_status VARCHAR(20) DEFAULT 'pending', -- pending, reviewed, approved
  translation_quality INTEGER CHECK (translation_quality BETWEEN 1 AND 5),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraint: Un solo idioma por hechizo
  UNIQUE(spell_id, language_code)
);

CREATE INDEX idx_spell_translations_spell_id ON spell_translations(spell_id);
CREATE INDEX idx_spell_translations_language ON spell_translations(language_code);
CREATE INDEX idx_spell_translations_status ON spell_translations(translation_status);

COMMENT ON TABLE spell_translations IS 'Traducciones de hechizos en múltiples idiomas';
COMMENT ON COLUMN spell_translations.translation_status IS 'pending: pendiente, reviewed: revisado, approved: aprobado';
COMMENT ON COLUMN spell_translations.translation_quality IS 'Calidad de 1 a 5 estrellas';

-- ============================================================================
-- 3. TRADUCCIONES DE CLASES (CLASSES)
-- ============================================================================

CREATE TABLE IF NOT EXISTS class_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code),

  name TEXT NOT NULL,
  description TEXT,

  translated_by UUID,
  reviewed_by UUID,
  translation_status VARCHAR(20) DEFAULT 'pending',
  translation_quality INTEGER CHECK (translation_quality BETWEEN 1 AND 5),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(class_id, language_code)
);

CREATE INDEX idx_class_translations_class_id ON class_translations(class_id);
CREATE INDEX idx_class_translations_language ON class_translations(language_code);

COMMENT ON TABLE class_translations IS 'Traducciones de clases en múltiples idiomas';

-- ============================================================================
-- 4. TRADUCCIONES DE RAZAS (RACES)
-- ============================================================================

CREATE TABLE IF NOT EXISTS race_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  race_id UUID NOT NULL REFERENCES races(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code),

  name TEXT NOT NULL,
  description TEXT,

  translated_by UUID,
  reviewed_by UUID,
  translation_status VARCHAR(20) DEFAULT 'pending',
  translation_quality INTEGER CHECK (translation_quality BETWEEN 1 AND 5),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(race_id, language_code)
);

CREATE INDEX idx_race_translations_race_id ON race_translations(race_id);
CREATE INDEX idx_race_translations_language ON race_translations(language_code);

COMMENT ON TABLE race_translations IS 'Traducciones de razas en múltiples idiomas';

-- ============================================================================
-- 5. TRADUCCIONES DE DOTES (FEATS)
-- ============================================================================

CREATE TABLE IF NOT EXISTS feat_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  feat_id UUID NOT NULL REFERENCES feats(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code),

  name TEXT NOT NULL,
  benefit TEXT,

  translated_by UUID,
  reviewed_by UUID,
  translation_status VARCHAR(20) DEFAULT 'pending',
  translation_quality INTEGER CHECK (translation_quality BETWEEN 1 AND 5),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(feat_id, language_code)
);

CREATE INDEX idx_feat_translations_feat_id ON feat_translations(feat_id);
CREATE INDEX idx_feat_translations_language ON feat_translations(language_code);

COMMENT ON TABLE feat_translations IS 'Traducciones de dotes en múltiples idiomas';

-- ============================================================================
-- 6. TRADUCCIONES DE SKILLS (HABILIDADES)
-- ============================================================================

CREATE TABLE IF NOT EXISTS skill_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code),

  name TEXT NOT NULL,
  description TEXT,

  translated_by UUID,
  reviewed_by UUID,
  translation_status VARCHAR(20) DEFAULT 'pending',
  translation_quality INTEGER CHECK (translation_quality BETWEEN 1 AND 5),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(skill_id, language_code)
);

CREATE INDEX idx_skill_translations_skill_id ON skill_translations(skill_id);
CREATE INDEX idx_skill_translations_language ON skill_translations(language_code);

COMMENT ON TABLE skill_translations IS 'Traducciones de habilidades en múltiples idiomas';

-- ============================================================================
-- 7. TRADUCCIONES DE ARMAS (WEAPONS)
-- ============================================================================

CREATE TABLE IF NOT EXISTS weapon_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  weapon_id UUID NOT NULL REFERENCES weapons(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code),

  name TEXT NOT NULL,
  description TEXT,

  translated_by UUID,
  reviewed_by UUID,
  translation_status VARCHAR(20) DEFAULT 'pending',
  translation_quality INTEGER CHECK (translation_quality BETWEEN 1 AND 5),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(weapon_id, language_code)
);

CREATE INDEX idx_weapon_translations_weapon_id ON weapon_translations(weapon_id);
CREATE INDEX idx_weapon_translations_language ON weapon_translations(language_code);

COMMENT ON TABLE weapon_translations IS 'Traducciones de armas en múltiples idiomas';

-- ============================================================================
-- 8. FUNCIÓN AUXILIAR: Obtener traducción con fallback
-- ============================================================================

CREATE OR REPLACE FUNCTION get_translation(
  p_table_name TEXT,
  p_entity_id UUID,
  p_language_code VARCHAR(5),
  p_fallback_language VARCHAR(5) DEFAULT 'en'
)
RETURNS TABLE (
  translation_id UUID,
  language_code VARCHAR(5),
  name TEXT,
  description TEXT
) AS $$
BEGIN
  -- Intentar obtener traducción en el idioma solicitado
  RETURN QUERY EXECUTE format(
    'SELECT id, language_code, name, description
     FROM %I
     WHERE %s_id = $1 AND language_code = $2
     LIMIT 1',
    p_table_name || '_translations',
    RTRIM(p_table_name, 's')
  )
  USING p_entity_id, p_language_code;

  -- Si no hay resultados, intentar con idioma de fallback
  IF NOT FOUND THEN
    RETURN QUERY EXECUTE format(
      'SELECT id, language_code, name, description
       FROM %I
       WHERE %s_id = $1 AND language_code = $2
       LIMIT 1',
      p_table_name || '_translations',
      RTRIM(p_table_name, 's')
    )
    USING p_entity_id, p_fallback_language;
  END IF;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_translation IS 'Obtiene traducción con fallback a inglés si no existe';

-- ============================================================================
-- 9. VISTA: Hechizos con traducciones
-- ============================================================================

CREATE OR REPLACE VIEW v_spells_with_translations AS
SELECT
  s.id,
  s.slug,
  s.school,
  s.source_book,
  s.created_at,
  jsonb_object_agg(
    st.language_code,
    jsonb_build_object(
      'name', st.name,
      'description', st.description,
      'casting_time', st.casting_time,
      'range_info', st.range_info,
      'duration', st.duration,
      'saving_throw', st.saving_throw,
      'spell_resistance', st.spell_resistance,
      'translation_status', st.translation_status,
      'translation_quality', st.translation_quality
    )
  ) FILTER (WHERE st.language_code IS NOT NULL) AS translations
FROM spells s
LEFT JOIN spell_translations st ON s.id = st.spell_id
GROUP BY s.id, s.slug, s.school, s.source_book, s.created_at;

COMMENT ON VIEW v_spells_with_translations IS 'Hechizos con todas sus traducciones en formato JSONB';

-- ============================================================================
-- 10. TRIGGER: Actualizar timestamp en traducciones
-- ============================================================================

CREATE OR REPLACE FUNCTION update_translation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_spell_translations_updated
  BEFORE UPDATE ON spell_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translation_timestamp();

CREATE TRIGGER trigger_class_translations_updated
  BEFORE UPDATE ON class_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translation_timestamp();

CREATE TRIGGER trigger_race_translations_updated
  BEFORE UPDATE ON race_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translation_timestamp();

CREATE TRIGGER trigger_feat_translations_updated
  BEFORE UPDATE ON feat_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translation_timestamp();

CREATE TRIGGER trigger_skill_translations_updated
  BEFORE UPDATE ON skill_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translation_timestamp();

CREATE TRIGGER trigger_weapon_translations_updated
  BEFORE UPDATE ON weapon_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translation_timestamp();

-- ============================================================================
-- 11. ESTADÍSTICAS DE TRADUCCIÓN
-- ============================================================================

CREATE OR REPLACE VIEW v_translation_stats AS
SELECT
  l.code AS language_code,
  l.name AS language_name,
  l.native_name,
  l.is_active,
  (SELECT COUNT(*) FROM spell_translations WHERE language_code = l.code) AS spells_translated,
  (SELECT COUNT(*) FROM class_translations WHERE language_code = l.code) AS classes_translated,
  (SELECT COUNT(*) FROM race_translations WHERE language_code = l.code) AS races_translated,
  (SELECT COUNT(*) FROM feat_translations WHERE language_code = l.code) AS feats_translated,
  (SELECT COUNT(*) FROM skill_translations WHERE language_code = l.code) AS skills_translated,
  (SELECT COUNT(*) FROM weapon_translations WHERE language_code = l.code) AS weapons_translated,
  -- Porcentajes
  ROUND((SELECT COUNT(*) FROM spell_translations WHERE language_code = l.code)::NUMERIC / NULLIF((SELECT COUNT(*) FROM spells), 0) * 100, 2) AS spells_percentage,
  ROUND((SELECT COUNT(*) FROM class_translations WHERE language_code = l.code)::NUMERIC / NULLIF((SELECT COUNT(*) FROM classes), 0) * 100, 2) AS classes_percentage
FROM languages l
ORDER BY l.code;

COMMENT ON VIEW v_translation_stats IS 'Estadísticas de progreso de traducción por idioma';

-- ============================================================================
-- 12. POLÍTICA RLS (Row Level Security) - Para contribuciones futuras
-- ============================================================================

-- Habilitar RLS en tablas de traducciones
ALTER TABLE spell_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE race_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE feat_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE weapon_translations ENABLE ROW LEVEL SECURITY;

-- Por ahora, permitir lectura pública
CREATE POLICY "Traducciones públicas para lectura"
  ON spell_translations FOR SELECT
  USING (true);

CREATE POLICY "Traducciones públicas para lectura"
  ON class_translations FOR SELECT
  USING (true);

CREATE POLICY "Traducciones públicas para lectura"
  ON race_translations FOR SELECT
  USING (true);

CREATE POLICY "Traducciones públicas para lectura"
  ON feat_translations FOR SELECT
  USING (true);

CREATE POLICY "Traducciones públicas para lectura"
  ON skill_translations FOR SELECT
  USING (true);

CREATE POLICY "Traducciones públicas para lectura"
  ON weapon_translations FOR SELECT
  USING (true);

-- Escritura: Solo usuarios autenticados (implementar más tarde)
-- CREATE POLICY "Usuarios autenticados pueden contribuir"
--   ON spell_translations FOR INSERT
--   WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- RESUMEN
-- ============================================================================

SELECT
  '✅ Sistema de traducciones creado' AS status,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_name LIKE '%_translations') AS translation_tables,
  (SELECT COUNT(*) FROM languages WHERE is_active = true) AS active_languages;
