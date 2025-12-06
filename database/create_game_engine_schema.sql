-- ============================================================================
-- Game Engine Ready Schema for D&D 3.5 / 5e / Pathfinder
-- ============================================================================
-- This schema separates mechanical data from fluff text, supports multiple
-- TTRPG systems, and is designed for scalability.
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. ENUMS
-- ============================================================================

-- Sistema / edición (podés ampliar si sumás más TTRPG)
CREATE TYPE system_edition AS ENUM (
  'dnd35',
  'dnd5e',
  'dnd55',
  'pathfinder1',
  'generic'
);

-- Tipo de progresión mágica global de la clase
CREATE TYPE spellcasting_mode AS ENUM (
  'none',        -- no lanza conjuros
  'full',        -- mago / clérigo / druida
  'half',        -- paladín / ranger 3.5 / 5e
  'third',       -- eldritch knight / arcane trickster, etc.
  'pact',        -- warlock style
  'other'
);

-- Fuente de poder de la magia
CREATE TYPE spell_source AS ENUM (
  'arcano',
  'divino',
  'primal',
  'psionico',
  'mixto',
  'otro'
);

-- Cómo lanza conjuros
CREATE TYPE spell_preparation AS ENUM (
  'preparado',      -- clérigo / druida / mago
  'espontaneo',     -- hechicero / bardo
  'mixto',
  'sin_conjuros'
);

-- Capacidad de lanzar conjuros (para fluff text)
CREATE TYPE spellcasting_capability AS ENUM (
  'si',
  'no',
  'depende_de_la_variante'
);

-- ============================================================================
-- 2. TABLA NÚCLEO: classes
-- ============================================================================

CREATE TABLE public.classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identificador tipo slug: 'druid', 'cleric', 'wizard'
  class_key text NOT NULL UNIQUE,

  -- Nombre visible
  name text NOT NULL,             -- "Druida", "Clérigo", etc.

  -- Sistema / edición
  system system_edition NOT NULL DEFAULT 'generic',

  -- Dado de golpe base: 4, 6, 8, 10, 12
  hit_die smallint NOT NULL,

  -- Progresión esperada de ataque y TS para reglas automáticas (opcional)
  bab_progression text,           -- 'full', 'three_quarters', 'half', etc.
  fort_progression text,          -- 'good' / 'poor'
  ref_progression  text,          -- 'good' / 'poor'
  will_progression text,          -- 'good' / 'poor'

  -- Spellcasting global de la clase
  spellcasting_mode   spellcasting_mode NOT NULL DEFAULT 'none',
  spell_source        spell_source      NOT NULL DEFAULT 'otro',
  spell_preparation   spell_preparation NOT NULL DEFAULT 'sin_conjuros',

  -- Estadísticas clave (pueden ser múltiples, ej. paladín 3.5: STR/WIS/CHA)
  primary_abilities   text[],           -- ej: {'SABIDURIA'} o {'CARISMA','SABIDURIA'}

  -- Flags varios
  is_pc_class boolean NOT NULL DEFAULT true,   -- clase de PJ
  is_npc_class boolean NOT NULL DEFAULT false, -- clase solo PNJ (experto, adepto, etc.)

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================================
-- 3. FLUFF TEXT: class_fluff
-- ============================================================================

CREATE TABLE public.class_fluff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,

  -- Título completo y subtítulo
  class_title text NOT NULL,          -- "Druida"
  subtitle_short varchar(255),

  -- ¿Por qué se aventuran?
  why_adventure_short varchar(255),
  why_adventure_long  text,

  -- Fuente de poder
  power_source_type   text,
  power_source_short  varchar(255),
  power_source_long   text,

  -- Rol en el grupo
  group_role_short varchar(255),
  group_role_long  text,

  -- Origen social
  social_origin_short varchar(255),
  social_origin_long  text,

  -- Enfoque religioso
  religious_focus_short varchar(255),
  religious_focus_long  text,
  typical_deities       text[],

  -- ¿Puede lanzar conjuros?
  spellcasting spellcasting_capability NOT NULL DEFAULT 'si',

  -- Restricciones de alineamiento
  alignment_restrictions text,

  -- Razas comunes
  common_races text[],

  -- Idioma del texto (por si después hacés multi-idioma)
  locale text NOT NULL DEFAULT 'es',

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  UNIQUE (class_id, locale)
);

-- ============================================================================
-- 4. PROGRESIÓN POR NIVEL: class_level_progression
-- ============================================================================

CREATE TABLE public.class_level_progression (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,

  level smallint NOT NULL CHECK (level >= 1 AND level <= 20),

  -- BAB como texto para soportar cosas tipo "+6/+1"
  base_attack_bonus text NOT NULL,

  -- TS numéricas (3.5 / PF) o lo que corresponda
  fort_save smallint NOT NULL,
  ref_save  smallint NOT NULL,
  will_save smallint NOT NULL,

  -- Texto libre para la columna "Special" / notas
  specials_summary text,  -- ej: "Animal companion, nature sense, wild empathy"

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  UNIQUE (class_id, level)
);

-- ============================================================================
-- 5. PROGRESIÓN MÁGICA POR NIVEL: class_level_spellcasting
-- ============================================================================

CREATE TABLE public.class_level_spellcasting (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  level smallint NOT NULL CHECK (level >= 1 AND level <= 20),

  -- Slots por nivel de conjuro (0–9). Null si el sistema no usa ese nivel.
  slots_lvl0 smallint,
  slots_lvl1 smallint,
  slots_lvl2 smallint,
  slots_lvl3 smallint,
  slots_lvl4 smallint,
  slots_lvl5 smallint,
  slots_lvl6 smallint,
  slots_lvl7 smallint,
  slots_lvl8 smallint,
  slots_lvl9 smallint,

  -- Conjuros conocidos por nivel de conjuro (opcional, para hechicero/bardo/warlock, etc.)
  known_lvl0 smallint,
  known_lvl1 smallint,
  known_lvl2 smallint,
  known_lvl3 smallint,
  known_lvl4 smallint,
  known_lvl5 smallint,
  known_lvl6 smallint,
  known_lvl7 smallint,
  known_lvl8 smallint,
  known_lvl9 smallint,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  UNIQUE (class_id, level)
);

-- ============================================================================
-- 6. RASGOS DE CLASE: class_features y class_feature_levels
-- ============================================================================

CREATE TABLE public.class_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,

  -- Identificador interno del feature dentro de la clase
  feature_key text NOT NULL,              -- ej: 'animal_companion', 'wild_shape'

  name text NOT NULL,                     -- "Animal Companion", "Wild Shape"
  description text NOT NULL,              -- texto largo (puede venir de tu parser de .md)

  -- Etiquetas para queries rápidas
  tags text[],                            -- ej: {'ex','su','magic','companion'}

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  UNIQUE (class_id, feature_key)
);

-- En qué niveles se obtiene cada rasgo (soporta rasgos que mejoran a varios niveles)
CREATE TABLE public.class_feature_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  class_feature_id uuid NOT NULL REFERENCES public.class_features(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,

  level smallint NOT NULL CHECK (level >= 1 AND level <= 20),

  -- Texto opcional para la "versión" en ese nivel
  level_note text,  -- ej: "Wild shape (1/day)", "Wild shape (2/day)", etc.

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  UNIQUE (class_feature_id, level)
);

-- ============================================================================
-- 7. SKILLS: skills y class_skills
-- ============================================================================

-- Catálogo de habilidades genéricas (puede contener las de 3.5, 5e, etc.)
CREATE TABLE public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  skill_key text NOT NULL UNIQUE,     -- ej: 'knowledge_nature', 'perception'
  name text NOT NULL,                 -- "Conocimiento (naturaleza)", "Percepción"
  system system_edition NOT NULL DEFAULT 'generic',

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Relación clase ↔ skill (class skill)
CREATE TABLE public.class_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  skill_id uuid NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,

  -- Por si hay sistemas donde una misma skill se comporta distinto
  is_class_skill boolean NOT NULL DEFAULT true,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  UNIQUE (class_id, skill_id)
);

-- ============================================================================
-- 8. TRIGGERS: updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar a todas las tablas
CREATE TRIGGER trg_classes_updated_at
BEFORE UPDATE ON public.classes
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_class_fluff_updated_at
BEFORE UPDATE ON public.class_fluff
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_class_level_progression_updated_at
BEFORE UPDATE ON public.class_level_progression
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_class_level_spellcasting_updated_at
BEFORE UPDATE ON public.class_level_spellcasting
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_class_features_updated_at
BEFORE UPDATE ON public.class_features
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_class_feature_levels_updated_at
BEFORE UPDATE ON public.class_feature_levels
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_skills_updated_at
BEFORE UPDATE ON public.skills
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_class_skills_updated_at
BEFORE UPDATE ON public.class_skills
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 9. INDEXES (para performance)
-- ============================================================================

-- Búsqueda por class_key
CREATE INDEX idx_classes_class_key ON public.classes(class_key);
CREATE INDEX idx_classes_system ON public.classes(system);

-- Búsqueda de fluff por locale
CREATE INDEX idx_class_fluff_locale ON public.class_fluff(locale);
CREATE INDEX idx_class_fluff_class_id ON public.class_fluff(class_id);

-- Búsqueda de progresión por nivel
CREATE INDEX idx_class_level_progression_class_id ON public.class_level_progression(class_id);
CREATE INDEX idx_class_level_progression_level ON public.class_level_progression(level);

-- Búsqueda de spellcasting por nivel
CREATE INDEX idx_class_level_spellcasting_class_id ON public.class_level_spellcasting(class_id);
CREATE INDEX idx_class_level_spellcasting_level ON public.class_level_spellcasting(level);

-- Búsqueda de features
CREATE INDEX idx_class_features_class_id ON public.class_features(class_id);
CREATE INDEX idx_class_features_feature_key ON public.class_features(feature_key);

-- Búsqueda de feature levels
CREATE INDEX idx_class_feature_levels_class_id ON public.class_feature_levels(class_id);
CREATE INDEX idx_class_feature_levels_level ON public.class_feature_levels(level);

-- Búsqueda de skills
CREATE INDEX idx_skills_skill_key ON public.skills(skill_key);
CREATE INDEX idx_skills_system ON public.skills(system);

-- Búsqueda de class skills
CREATE INDEX idx_class_skills_class_id ON public.class_skills(class_id);
CREATE INDEX idx_class_skills_skill_id ON public.class_skills(skill_id);

-- ============================================================================
-- COMENTARIOS (documentación en la BD)
-- ============================================================================

COMMENT ON TABLE public.classes IS 'Core mechanical data for character classes across multiple TTRPG systems';
COMMENT ON TABLE public.class_fluff IS 'Descriptive/flavor text for classes, supports multiple locales';
COMMENT ON TABLE public.class_level_progression IS 'Level-by-level progression data (BAB, saves, special abilities summary)';
COMMENT ON TABLE public.class_level_spellcasting IS 'Spell slots and known spells per level';
COMMENT ON TABLE public.class_features IS 'Catalog of class features/abilities';
COMMENT ON TABLE public.class_feature_levels IS 'Mapping of which features are gained at which levels';
COMMENT ON TABLE public.skills IS 'Catalog of skills across TTRPG systems';
COMMENT ON TABLE public.class_skills IS 'Mapping of which skills are class skills for each class';
