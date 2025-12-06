-- Actualizar el schema de racial_traits para guardar objetos completos
-- En lugar de TEXT[], usamos JSONB para guardar {name, description, type}

-- 1. Crear nueva columna temporal con tipo JSONB
ALTER TABLE races ADD COLUMN racial_traits_new JSONB;

-- 2. Los datos existentes en racial_traits son solo nombres (TEXT[])
-- No podemos convertir automáticamente sin las descripciones,
-- así que dejamos la columna nueva vacía por ahora
-- Los scripts de migración actualizarán esta columna

-- 3. Eliminar la columna antigua
ALTER TABLE races DROP COLUMN racial_traits;

-- 4. Renombrar la nueva columna
ALTER TABLE races RENAME COLUMN racial_traits_new TO racial_traits;

-- 5. Establecer valor por defecto
ALTER TABLE races ALTER COLUMN racial_traits SET DEFAULT '[]'::jsonb;

-- Ahora racial_traits puede contener:
-- [
--   {
--     "name": "Visión en la oscuridad",
--     "description": "Los gnomos susurrantes pueden ver...",
--     "type": "habilidad especial"
--   }
-- ]
