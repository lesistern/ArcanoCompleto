-- ============================================
-- Migration: Expand classes table with lore fields
-- Description: Adds narrative and flavor fields to the classes table
-- Execute this in Supabase SQL Editor
-- ============================================

-- Add new columns to classes table
ALTER TABLE public.classes 
ADD COLUMN IF NOT EXISTS tiene_magia BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS tipo_magia TEXT, -- 'ninguna', 'arcana', 'divina', 'mixta'
ADD COLUMN IF NOT EXISTS estilo_conjuros TEXT, -- 'preparada', 'espontanea', 'no_aplica'
ADD COLUMN IF NOT EXISTS regla_alineamiento TEXT, -- "Any nonlawful", "Lawful good", etc.
ADD COLUMN IF NOT EXISTS tendencia_alineamiento TEXT, -- descriptive tendency
ADD COLUMN IF NOT EXISTS tipo_poder_principal TEXT, -- 'marcial', 'arcano', 'divino', 'habilidades', 'ki', 'mixto'
ADD COLUMN IF NOT EXISTS descripcion_poder TEXT, -- short summary of power source
ADD COLUMN IF NOT EXISTS rol_party TEXT, -- party role description  
ADD COLUMN IF NOT EXISTS motivacion_aventura TEXT, -- why they adventure
ADD COLUMN IF NOT EXISTS origen_social TEXT, -- social background
ADD COLUMN IF NOT EXISTS tipo_organizacion TEXT, -- 'iglesia', 'orden', 'colegio', 'gremio', 'maestro', 'ninguna'
ADD COLUMN IF NOT EXISTS enfoque_religioso TEXT, -- religious focus
ADD COLUMN IF NOT EXISTS deidades_tipicas TEXT, -- typical deities (comma-separated)
ADD COLUMN IF NOT EXISTS razas_comunes TEXT; -- common races (comma-separated)

-- Create indexes on commonly queried fields
CREATE INDEX IF NOT EXISTS idx_classes_tipo_magia ON public.classes(tipo_magia);
CREATE INDEX IF NOT EXISTS idx_classes_tipo_poder ON public.classes(tipo_poder_principal);
CREATE INDEX IF NOT EXISTS idx_classes_tipo_org ON public.classes(tipo_organizacion);

-- Add comments for documentation
COMMENT ON COLUMN public.classes.tiene_magia IS 'Indica si la clase tiene capacidades mágicas';
COMMENT ON COLUMN public.classes.tipo_magia IS 'Tipo de magia: ninguna, arcana, divina, mixta';
COMMENT ON COLUMN public.classes.estilo_conjuros IS 'Estilo de lanzamiento: preparada, espontánea, no_aplica';
COMMENT ON COLUMN public.classes.regla_alineamiento IS 'Restricción de alineamiento según reglas (ej: "Any nonlawful")';
COMMENT ON COLUMN public.classes.tendencia_alineamiento IS 'Descripción de la tendencia típica de alineamiento';
COMMENT ON COLUMN public.classes.tipo_poder_principal IS 'Fuente principal del poder de la clase';
COMMENT ON COLUMN public.classes.descripcion_poder IS'Resumen de cómo funciona el poder de la clase';
COMMENT ON COLUMN public.classes.rol_party IS 'Rol típico dentro de un grupo de aventureros';
COMMENT ON COLUMN public.classes.motivacion_aventura IS 'Por qué personajes de esta clase salen de aventura';
COMMENT ON COLUMN public.classes.origen_social IS 'Origen social típico (tribus, monasterios, ciudades, etc.)';
COMMENT ON COLUMN public.classes.tipo_organizacion IS 'Tipo de organización asociada con la clase';
COMMENT ON COLUMN public.classes.enfoque_religioso IS 'Relación de la clase con la religión';
COMMENT ON COLUMN public.classes.deidades_tipicas IS 'Deidades comúnmente veneradas por esta clase';
COMMENT ON COLUMN public.classes.razas_comunes IS 'Razas que frecuentemente toman esta clase';
