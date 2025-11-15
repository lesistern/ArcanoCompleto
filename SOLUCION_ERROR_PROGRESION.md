# 🔧 Solución: Error en class_progression_complete.sql

**Fecha**: 2025-11-15 (Noche)
**Error encontrado**: `ERROR: 42703: column "weapon_proficiency" of relation "classes" does not exist`

---

## ❌ Problema Identificado

El archivo `class_progression_complete.sql` original contenía 11 bloques UPDATE (líneas 37-233) que intentaban actualizar columnas que:

1. **No existen** en la tabla `classes`:
   - `weapon_proficiency` → La columna real es `weapon_proficiencies` (plural)
   - `armor_proficiency` → La columna real es `armor_proficiencies` (plural)

2. **Ya tienen datos correctos** desde migraciones anteriores:
   - La información de `hit_die`, `skill_points_per_level`, `class_skills`, etc. ya fue insertada con el script `insert-all-classes.mjs`

### Ejemplo del código problemático:
```sql
-- ❌ LÍNEA 45-46 - ERROR
UPDATE public.classes
SET
  weapon_proficiency = ARRAY['martial']::TEXT[],   -- ❌ Columna no existe
  armor_proficiency = ARRAY['light']::TEXT[],      -- ❌ Columna no existe
  ...
WHERE slug = 'barbarian';
```

---

## ✅ Solución Aplicada

Se creó un nuevo archivo **`class_progression_complete-fixed.sql`** que:

1. **Elimina todos los bloques UPDATE** (líneas 37-233 del original)
2. **Mantiene la tabla CREATE TABLE** (líneas 1-36)
3. **Mantiene todos los INSERT de progresión** (líneas 235-584 del original)

### Resultado:
- **Archivo original**: 584 líneas (incluía 11 UPDATE problemáticos)
- **Archivo corregido**: 386 líneas (solo CREATE + INSERT)
- **Registros a insertar**: 220 (11 clases × 20 niveles) ✅

---

## 📋 Instrucciones de Ejecución

### Paso 1: Abrir Supabase SQL Editor
```
https://supabase.com/dashboard/project/[tu-proyecto-id]/sql
```

### Paso 2: Copiar el SQL Corregido

**Archivo a usar**: `supabase/class_progression_complete-fixed.sql` ✅

1. Abrir el archivo corregido
2. Copiar **TODO** el contenido (386 líneas)
3. Pegar en Supabase SQL Editor

### Paso 3: Ejecutar

Click en **"Run"** y esperar confirmación.

**Tiempo estimado**: 5-10 segundos

---

## ✅ Verificación

Después de ejecutar, verificar con estas queries:

### 1. Verificar tabla creada
```sql
SELECT COUNT(*)
FROM information_schema.tables
WHERE table_name = 'class_progression';
-- Debe retornar: 1
```

### 2. Contar registros totales
```sql
SELECT COUNT(*) FROM class_progression;
-- Resultado esperado: 220
```

### 3. Distribución por clase
```sql
SELECT class_slug, COUNT(*) as levels
FROM class_progression
GROUP BY class_slug
ORDER BY class_slug;
```

**Resultado esperado:**
```
barbarian    | 20
bard         | 20
cleric       | 20
druid        | 20
fighter      | 20
monk         | 20
paladin      | 20
ranger       | 20
rogue        | 20
sorcerer     | 20
wizard       | 20
```

### 4. Ver progresión de una clase (ejemplo: Wizard)
```sql
SELECT
  level,
  base_attack_bonus as bab,
  fort_save,
  ref_save,
  will_save,
  special_abilities
FROM class_progression
WHERE class_slug = 'wizard'
ORDER BY level
LIMIT 5;
```

**Resultado esperado (primeros 5 niveles):**
```
level | bab | fort | ref | will | special_abilities
------|-----|------|-----|------|------------------
1     | +0  | 0    | 0   | 2    | Scribe Scroll, summon familiar
2     | +1  | 0    | 0   | 3    | —
3     | +1  | 1    | 1   | 3    | —
4     | +2  | 1    | 1   | 4    | —
5     | +2  | 1    | 1   | 4    | Bonus feat
```

---

## 🎯 Qué hace este SQL (versión corregida)

### 1. Crea la tabla `class_progression`
```sql
CREATE TABLE public.class_progression (
  id BIGSERIAL PRIMARY KEY,
  class_slug TEXT NOT NULL REFERENCES public.classes(slug) ON DELETE CASCADE,
  level INTEGER NOT NULL CHECK (level >= 1 AND level <= 20),
  base_attack_bonus TEXT NOT NULL,
  fort_save INTEGER NOT NULL,
  ref_save INTEGER NOT NULL,
  will_save INTEGER NOT NULL,
  special_abilities TEXT,
  spells_per_day JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_slug, level)
);
```

### 2. Crea índices optimizados
```sql
CREATE INDEX idx_class_progression_class ON public.class_progression(class_slug);
CREATE INDEX idx_class_progression_level ON public.class_progression(level);
```

### 3. Inserta 220 registros de progresión

**11 clases × 20 niveles**:
- Bárbaro (Barbarian)
- Bardo (Bard)
- Clérigo (Cleric)
- Druida (Druid)
- Guerrero (Fighter)
- Monje (Monk)
- Paladín (Paladin)
- Explorador (Ranger)
- Pícaro (Rogue)
- Hechicero (Sorcerer)
- Mago (Wizard)

**Datos por nivel**:
- Base Attack Bonus (BAB)
- Fort/Ref/Will saves
- Habilidades especiales
- Conjuros por día (para clases mágicas)

### 4. Usa ON CONFLICT para actualizaciones seguras
```sql
ON CONFLICT (class_slug, level) DO UPDATE
  SET base_attack_bonus = EXCLUDED.base_attack_bonus,
      fort_save = EXCLUDED.fort_save,
      ref_save = EXCLUDED.ref_save,
      will_save = EXCLUDED.will_save,
      special_abilities = EXCLUDED.special_abilities,
      updated_at = NOW();
```

---

## 📈 Impacto en el Frontend

Después de ejecutar este SQL, la página **`/clases/[slug]`** podrá mostrar:

✅ Tabla completa de progresión 1-20
✅ BAB por nivel
✅ Salvaciones por nivel (Fort, Ref, Will)
✅ Habilidades especiales por nivel
✅ Conjuros por día (clases mágicas)

### Ejemplo de Query para Frontend
```typescript
// Obtener progresión completa de una clase
const { data: progression } = await supabase
  .from('class_progression')
  .select('*')
  .eq('class_slug', 'barbarian')
  .order('level', { ascending: true });

// Resultado: Array de 20 objetos con toda la info por nivel
```

---

## 🚀 Próximos Pasos

Después de ejecutar este SQL exitosamente:

1. ✅ Verificar datos con las queries de arriba
2. 🎨 Crear componente `<ProgressionTable>` en frontend
3. 🎨 Integrar en `/clases/[slug]` para mostrar progresión
4. 🎨 Testear responsive en móviles

---

## 🔍 Diferencias: Original vs Corregido

| Aspecto | Original | Corregido |
|---------|----------|-----------|
| **Líneas totales** | 584 | 386 |
| **Bloques UPDATE** | 11 (líneas 37-233) | 0 (eliminados) ❌ |
| **Tabla CREATE** | ✅ | ✅ |
| **INSERT de progresión** | 220 registros ✅ | 220 registros ✅ |
| **ON CONFLICT** | ✅ | ✅ |
| **Errores** | Sí (columnas inexistentes) | No ✅ |

---

## ⚠️ Nota Importante

Los datos de `hit_die`, `skill_points_per_level`, `weapon_proficiencies`, `armor_proficiencies`, etc. de la tabla `classes` **ya están correctos** desde la migración anterior con `insert-all-classes.mjs`.

**No es necesario actualizarlos**, por eso eliminamos los bloques UPDATE.

---

**¿Listo para ejecutar?** Usa el archivo **`class_progression_complete-fixed.sql`** en Supabase SQL Editor. 🚀

---

**Resultado esperado:**
- ✅ Tabla `class_progression` creada
- ✅ 220 registros insertados (11 clases × 20 niveles)
- ✅ 2 índices creados
- ✅ Listo para usar en frontend
