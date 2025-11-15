-- ============================================================================
-- FIX: Eliminar y recrear tablas de traducciones con esquema correcto
-- ============================================================================
-- Ejecuta este script para corregir los errores de esquema
-- ============================================================================

-- 1. Eliminar tablas existentes (en orden inverso por dependencias)
DROP TABLE IF EXISTS weapon_translations CASCADE;
DROP TABLE IF EXISTS skill_translations CASCADE;
DROP TABLE IF EXISTS feat_translations CASCADE;
DROP TABLE IF EXISTS race_translations CASCADE;
DROP TABLE IF EXISTS class_translations CASCADE;
DROP TABLE IF EXISTS spell_translations CASCADE;

-- 2. Ahora ejecuta create-translations-system.sql completo
-- O ejecuta las secciones individuales aquí:

SELECT '✅ Tablas eliminadas. Ahora ejecuta create-translations-system.sql' AS status;
