# 🔧 Troubleshooting - Base de Datos

## Error: "check constraint is violated by some row"

### Descripción del Error

```
ERROR: 23514: check constraint "check_key_ability" of relation "skills" is violated by some row
```

Este error ocurre cuando intentas aplicar un constraint a una tabla que ya tiene datos que no cumplen con la validación.

### Causa

El script `apply-db-optimizations.sql` ha sido actualizado para manejar este problema automáticamente. Sin embargo, si estás usando una versión anterior o tienes datos que no cumplen con los constraints, puedes seguir estos pasos.

### Solución 1: Usar el Script Actualizado (RECOMENDADO)

El archivo `apply-db-optimizations.sql` actualizado ahora:

1. ✅ Verifica los datos existentes antes de aplicar constraints
2. ✅ Normaliza automáticamente valores con mayúsculas/minúsculas
3. ✅ Solo aplica constraints si los datos son válidos o la tabla está vacía
4. ✅ Muestra warnings si hay problemas en lugar de fallar

**Simplemente ejecuta el script actualizado:**

```bash
# En Supabase SQL Editor
# Copiar y pegar apply-db-optimizations.sql
```

### Solución 2: Verificar Datos Manualmente

Si quieres ver qué datos están causando el problema:

#### Skills - Verificar key_ability

```sql
-- Ver todos los valores únicos de key_ability
SELECT DISTINCT key_ability, COUNT(*) as total
FROM skills
GROUP BY key_ability
ORDER BY key_ability;

-- Ver skills con valores inválidos
SELECT id, name, key_ability
FROM skills
WHERE key_ability NOT IN ('Fuerza', 'Destreza', 'Constitución', 'Inteligencia', 'Sabiduría', 'Carisma');
```

**Corregir manualmente:**

```sql
-- Normalizar valores (si hay variaciones de mayúsculas/minúsculas)
UPDATE skills SET key_ability = 'Fuerza' WHERE key_ability ILIKE 'fuerza';
UPDATE skills SET key_ability = 'Destreza' WHERE key_ability ILIKE 'destreza';
UPDATE skills SET key_ability = 'Constitución' WHERE key_ability ILIKE 'constitución' OR key_ability ILIKE 'constitucion';
UPDATE skills SET key_ability = 'Inteligencia' WHERE key_ability ILIKE 'inteligencia';
UPDATE skills SET key_ability = 'Sabiduría' WHERE key_ability ILIKE 'sabiduría' OR key_ability ILIKE 'sabiduria';
UPDATE skills SET key_ability = 'Carisma' WHERE key_ability ILIKE 'carisma';

-- Ahora aplicar el constraint
ALTER TABLE skills DROP CONSTRAINT IF EXISTS check_key_ability;
ALTER TABLE skills ADD CONSTRAINT check_key_ability
  CHECK (key_ability IN ('Fuerza', 'Destreza', 'Constitución', 'Inteligencia', 'Sabiduría', 'Carisma'));
```

#### Feats - Verificar category

```sql
-- Ver categorías actuales
SELECT DISTINCT category, COUNT(*) as total
FROM feats
GROUP BY category;

-- Ver feats con categorías inválidas
SELECT id, name, category
FROM feats
WHERE category NOT IN ('General', 'Combate', 'Metamágica', 'Creación de objetos', 'Especial');
```

**Corregir manualmente:**

```sql
-- Normalizar categorías
UPDATE feats SET category = 'General' WHERE category ILIKE 'general';
UPDATE feats SET category = 'Combate' WHERE category ILIKE 'combate';
UPDATE feats SET category = 'Metamágica' WHERE category ILIKE 'metamágica' OR category ILIKE 'metamagica';
UPDATE feats SET category = 'Creación de objetos' WHERE category ILIKE 'creación de objetos' OR category ILIKE 'creacion de objetos';
UPDATE feats SET category = 'Especial' WHERE category ILIKE 'especial';

-- Aplicar constraint
ALTER TABLE feats DROP CONSTRAINT IF EXISTS check_feat_category;
ALTER TABLE feats ADD CONSTRAINT check_feat_category
  CHECK (category IN ('General', 'Combate', 'Metamágica', 'Creación de objetos', 'Especial'));
```

### Solución 3: Aplicar Solo las Columnas (Sin Constraints)

Si prefieres añadir las columnas sin validaciones:

```sql
-- Solo añadir columnas nuevas a weapons
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS cost_gold NUMERIC(10,2);
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS cost_silver NUMERIC(10,2);
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS weight_lb NUMERIC(6,2);
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS range_feet INTEGER;
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS proficiency TEXT;
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS combat_category TEXT;
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS hands TEXT;
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS properties TEXT[];

-- Migrar datos
UPDATE weapons SET
  cost_gold = CASE
    WHEN cost LIKE '%po' THEN CAST(REGEXP_REPLACE(cost, '[^0-9.]', '', 'g') AS NUMERIC)
    ELSE NULL
  END
WHERE cost_gold IS NULL AND cost LIKE '%po';

-- ... etc
```

Luego puedes aplicar los constraints más tarde cuando los datos estén limpios.

---

## Error: "relation 'books' does not exist"

### Causa

El script SQL no se ha ejecutado aún.

### Solución

```bash
# Ejecutar en Supabase SQL Editor
# Copiar apply-db-optimizations.sql completo
```

---

## Error: "duplicate key value violates unique constraint"

### Descripción

```
ERROR: duplicate key value violates unique constraint "books_slug_key"
```

### Causa

Ya ejecutaste el script `populate-books.mjs` antes y los libros ya existen en la base de datos.

### Solución 1: Truncar y repoblar

```sql
-- Eliminar todos los libros actuales
TRUNCATE books CASCADE;
```

Luego ejecutar:

```bash
node scripts/populate-books.mjs
```

### Solución 2: Usar UPSERT

El script `populate-books.mjs` ya usa upsert, así que normalmente no deberías ver este error. Si lo ves, es porque:

1. El slug cambió en los datos
2. Hay datos corruptos

**Solución:**

```sql
-- Ver qué slugs hay actualmente
SELECT slug, name FROM books ORDER BY slug;

-- Eliminar un libro específico si es necesario
DELETE FROM books WHERE slug = 'nombre-del-slug-duplicado';
```

---

## Error: "permission denied for table"

### Descripción

```
ERROR: permission denied for table weapons
```

### Causa

Estás usando la clave pública (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) en lugar de la clave de servicio (`SUPABASE_SERVICE_ROLE_KEY`).

### Solución

Verifica tu archivo `.env.local`:

```bash
# Debe tener ambas claves
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (clave pública)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (clave privada - DIFERENTE)
```

**Para obtener la clave de servicio:**

1. Ve a Supabase Dashboard
2. Settings > API
3. Copia la clave "service_role" (no la "anon")
4. Añádela a `.env.local`

---

## Error: "column 'cost_gold' does not exist"

### Causa

El script SQL no se ejecutó completamente o falló a mitad.

### Solución

```sql
-- Verificar qué columnas existen
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'weapons'
ORDER BY ordinal_position;

-- Si falta cost_gold, ejecutar manualmente
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS cost_gold NUMERIC(10,2);
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS cost_silver NUMERIC(10,2);
ALTER TABLE weapons ADD COLUMN IF NOT EXISTS weight_lb NUMERIC(6,2);
```

---

## Los Queries Numéricos No Funcionan

### Síntoma

```sql
-- Esta query no devuelve resultados esperados
SELECT * FROM weapons WHERE cost_gold > 50;
```

### Causa

Los datos no se migraron de las columnas TEXT a las numéricas.

### Solución

```sql
-- Verificar si hay datos en cost_gold
SELECT COUNT(*) as con_costo,
       (SELECT COUNT(*) FROM weapons) as total
FROM weapons
WHERE cost_gold IS NOT NULL;

-- Si el conteo es 0 o muy bajo, migrar manualmente
UPDATE weapons SET
  cost_gold = CASE
    WHEN cost LIKE '%po' THEN CAST(REGEXP_REPLACE(cost, '[^0-9.]', '', 'g') AS NUMERIC)
    ELSE NULL
  END
WHERE cost_gold IS NULL AND cost LIKE '%po';

UPDATE weapons SET
  cost_silver = CASE
    WHEN cost LIKE '%pp' THEN CAST(REGEXP_REPLACE(cost, '[^0-9.]', '', 'g') AS NUMERIC)
    ELSE NULL
  END
WHERE cost_silver IS NULL AND cost LIKE '%pp';

UPDATE weapons SET
  weight_lb = CAST(REGEXP_REPLACE(weight, '[^0-9.]', '', 'g') AS NUMERIC)
WHERE weight_lb IS NULL AND weight IS NOT NULL AND weight != '';
```

---

## Verificar Estado de las Optimizaciones

Para verificar qué optimizaciones se aplicaron correctamente:

```sql
-- Ver columnas de weapons
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'weapons'
  AND column_name IN ('cost_gold', 'cost_silver', 'weight_lb', 'proficiency', 'hands')
ORDER BY column_name;

-- Ver si hay datos migrados
SELECT
  COUNT(*) as total_weapons,
  COUNT(cost_gold) as con_cost_gold,
  COUNT(weight_lb) as con_weight_lb,
  COUNT(proficiency) as con_proficiency
FROM weapons;

-- Ver constraints aplicados
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name IN ('weapons', 'skills', 'feats', 'classes', 'races', 'spells')
ORDER BY table_name, constraint_name;

-- Ver tablas nuevas
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('books', 'armor', 'magic_items', 'monsters')
ORDER BY table_name;

-- Ver vistas
SELECT table_name
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name LIKE 'v_%'
ORDER BY table_name;

-- Ver funciones
SELECT routine_name
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_type = 'FUNCTION'
  AND routine_name IN ('calculate_bab', 'calculate_save')
ORDER BY routine_name;
```

---

## Rollback Completo

Si algo sale mal y necesitas empezar de cero:

```sql
BEGIN;

-- Eliminar columnas añadidas
ALTER TABLE weapons
  DROP COLUMN IF EXISTS cost_gold,
  DROP COLUMN IF EXISTS cost_silver,
  DROP COLUMN IF EXISTS weight_lb,
  DROP COLUMN IF EXISTS range_feet,
  DROP COLUMN IF EXISTS proficiency,
  DROP COLUMN IF EXISTS combat_category,
  DROP COLUMN IF EXISTS hands,
  DROP COLUMN IF EXISTS properties,
  DROP COLUMN IF EXISTS damage_small,
  DROP COLUMN IF EXISTS damage_medium,
  DROP COLUMN IF EXISTS damage_large;

ALTER TABLE skills
  DROP COLUMN IF EXISTS class_skills,
  DROP COLUMN IF EXISTS example_dcs;

ALTER TABLE feats
  DROP COLUMN IF EXISTS prerequisite_feats,
  DROP COLUMN IF EXISTS prerequisite_bab,
  DROP COLUMN IF EXISTS prerequisite_abilities,
  DROP COLUMN IF EXISTS prerequisite_skills,
  DROP COLUMN IF EXISTS prerequisite_other,
  DROP COLUMN IF EXISTS is_metamagic,
  DROP COLUMN IF EXISTS is_item_creation,
  DROP COLUMN IF EXISTS can_take_multiple;

ALTER TABLE classes
  DROP COLUMN IF EXISTS class_type;

ALTER TABLE races
  DROP COLUMN IF EXISTS creature_type,
  DROP COLUMN IF EXISTS subtypes,
  DROP COLUMN IF EXISTS darkvision,
  DROP COLUMN IF EXISTS low_light_vision;

ALTER TABLE spells
  DROP COLUMN IF EXISTS component_verbal,
  DROP COLUMN IF EXISTS component_somatic,
  DROP COLUMN IF EXISTS component_material,
  DROP COLUMN IF EXISTS component_focus,
  DROP COLUMN IF EXISTS component_divine_focus,
  DROP COLUMN IF EXISTS component_xp,
  DROP COLUMN IF EXISTS spell_type;

-- Eliminar tablas nuevas
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS armor CASCADE;
DROP TABLE IF EXISTS magic_items CASCADE;
DROP TABLE IF EXISTS monsters CASCADE;

-- Eliminar vistas
DROP VIEW IF EXISTS v_weapons_complete;
DROP VIEW IF EXISTS v_skills_complete;
DROP VIEW IF EXISTS v_feats_by_category;
DROP VIEW IF EXISTS v_books_by_priority;

-- Eliminar funciones
DROP FUNCTION IF EXISTS calculate_bab;
DROP FUNCTION IF EXISTS calculate_save;
DROP FUNCTION IF EXISTS update_updated_at_column;

COMMIT;
```

---

## Soporte

Si ninguna de estas soluciones funciona:

1. Revisa los mensajes de error completos en el SQL Editor
2. Verifica que estás usando la versión actualizada de `apply-db-optimizations.sql`
3. Comprueba que tienes permisos de administrador en Supabase
4. Asegúrate de que no hay otros usuarios modificando la base de datos al mismo tiempo

---

**Última actualización**: 2025-01-14
**Versión del script**: 1.1 (con manejo automático de constraints)
