-- ============================================
-- TABLA DE PROGRESIÓN DE CLASES
-- Almacena los 20 niveles de cada clase base
-- ============================================

CREATE TABLE IF NOT EXISTS public.class_progression (
  id BIGSERIAL PRIMARY KEY,
  class_slug TEXT NOT NULL REFERENCES public.classes(slug) ON DELETE CASCADE,
  level INTEGER NOT NULL CHECK (level >= 1 AND level <= 20),
  bab TEXT NOT NULL, -- Ej: "+1", "+6/+1", "+20/+15/+10/+5"
  fort TEXT NOT NULL, -- Salvación de Fortaleza (ej: "+2")
  ref TEXT NOT NULL, -- Salvación de Reflejos (ej: "+0")
  will TEXT NOT NULL, -- Salvación de Voluntad (ej: "+0")
  special TEXT, -- Rasgos especiales del nivel (ej: "Furia 1/día, movimiento rápido")
  spells_per_day JSONB, -- Para clases con conjuros: {0: 3, 1: 1, 2: 0}
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraint: Solo puede haber un registro por clase y nivel
  UNIQUE(class_slug, level)
);

-- Índices para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_class_progression_class ON public.class_progression(class_slug);
CREATE INDEX IF NOT EXISTS idx_class_progression_level ON public.class_progression(level);

-- Comentarios
COMMENT ON TABLE public.class_progression IS 'Tabla de progresión de las clases (20 niveles × 11 clases = 220 filas)';
COMMENT ON COLUMN public.class_progression.bab IS 'Bonus de Ataque Base (puede tener múltiples valores separados por /)';
COMMENT ON COLUMN public.class_progression.special IS 'Rasgos de clase que se obtienen en este nivel';
COMMENT ON COLUMN public.class_progression.spells_per_day IS 'Conjuros por día para clases lanzadoras (nivel de conjuro → cantidad)';

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_class_progression_modtime
  BEFORE UPDATE ON public.class_progression
  FOR EACH ROW
  EXECUTE FUNCTION update_modified_column();
