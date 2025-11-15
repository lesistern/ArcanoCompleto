# 📋 Revisión Completa de Archivos SQL de Hechizos

**Fecha**: 2025-11-14
**Estado**: ✅ Correcciones aplicadas y listas para ejecutar

---

## 📂 Estructura de Archivos

### Archivos Originales (CON ERRORES - NO EJECUTAR)

#### ❌ `insert_spells_part1.sql` (791 KB)
- **Contenido**: 608 INSERT INTO spells
- **Problemas encontrados**:
  - 3 entradas placeholder no válidas (Greater/Lesser/Mass Spell Name)
  - 322 strings 'null' en lugar de NULL
  - 122 conjuros con campos NOT NULL vacíos
- **Estado**: ❌ NO EJECUTAR

#### ❌ `insert_spells_complete.sql` (1.3 MB)
- **Contenido**:
  - 608 INSERT INTO spells
  - 1,410 INSERT INTO spell_class_levels (relaciones clase-hechizo)
- **Problemas encontrados**:
  - Mismos 3 placeholders no válidos
  - 322 strings 'null' en lugar de NULL
  - 122 conjuros con campos NOT NULL vacíos
- **Estado**: ❌ NO EJECUTAR

#### ✅ `insert_spells_part2a.sql` (169 KB)
- **Contenido**: 471 INSERT INTO spell_class_levels
- **Problemas**: Ninguno
- **Estado**: ✅ Listo para ejecutar (DESPUÉS de ejecutar part1_final)

#### ✅ `insert_spells_part2b.sql` (169 KB)
- **Contenido**: 470 INSERT INTO spell_class_levels
- **Problemas**: Ninguno
- **Estado**: ✅ Listo para ejecutar (DESPUÉS de part2a)

#### ✅ `insert_spells_part2c.sql` (169 KB)
- **Contenido**: 469 INSERT INTO spell_class_levels
- **Problemas**: Ninguno
- **Estado**: ✅ Listo para ejecutar (DESPUÉS de part2b)

---

### Archivos Corregidos (LISTOS PARA EJECUTAR)

#### ✅ `insert_spells_part1_final.sql` (789 KB)
- **Contenido**: 605 INSERT INTO spells (conjuros válidos)
- **Correcciones aplicadas**:
  - ✅ Eliminados 3 placeholders no válidos
  - ✅ 322 strings 'null' → NULL
  - ✅ 122 campos NOT NULL corregidos con 'Ver hechizo base'
- **Estado**: ✅ LISTO PARA EJECUTAR

#### ✅ `insert_spells_complete_final.sql` (1.3 MB)
- **Contenido**:
  - 605 INSERT INTO spells
  - 1,410 INSERT INTO spell_class_levels
- **Correcciones aplicadas**:
  - ✅ Eliminados 3 placeholders no válidos
  - ✅ 322 strings 'null' → NULL
  - ✅ 122 campos NOT NULL corregidos con 'Ver hechizo base'
- **Estado**: ✅ LISTO PARA EJECUTAR (archivo TODO-EN-UNO recomendado)

---

### Archivos Intermedios (IGNORAR)
- `insert_spells_part1_clean.sql` - Versión intermedia de limpieza
- `insert_spells_part1_fixed.sql` - Versión intermedia de corrección

---

## 🚀 Orden de Ejecución Recomendado

### Opción A: Archivo TODO-EN-UNO (Recomendado)

```sql
-- 1. Ejecutar este archivo en Supabase SQL Editor:
supabase/insert_spells_complete_final.sql
```

Este archivo incluye:
- ✅ 605 conjuros en tabla `spells`
- ✅ 1,410 relaciones en tabla `spell_class_levels`
- ✅ Todo corregido y listo

---

### Opción B: Ejecución por Partes

Si prefieres ejecutar en varios pasos:

```sql
-- 1. Insertar conjuros
supabase/insert_spells_part1_final.sql

-- 2. Insertar relaciones clase-hechizo (parte A)
supabase/insert_spells_part2a.sql

-- 3. Insertar relaciones clase-hechizo (parte B)
supabase/insert_spells_part2b.sql

-- 4. Insertar relaciones clase-hechizo (parte C)
supabase/insert_spells_part2c.sql
```

---

## 🔍 Problemas Corregidos

### 1. Entradas Placeholder Eliminadas

Se eliminaron 3 entradas que NO eran conjuros reales, sino notas explicativas del manual:

- ❌ `Greater (Spell Name)` - Nota sobre nomenclatura
- ❌ `Lesser (Spell Name)` - Nota sobre nomenclatura
- ❌ `Mass (Spell Name)` - Nota sobre nomenclatura

### 2. Strings 'null' → NULL

Se corrigieron 322 campos que tenían el string literal `'null'` en lugar de `NULL` real:

```sql
-- ANTES (incorrecto)
casting_time = 'null'

-- DESPUÉS (correcto)
casting_time = NULL
```

### 3. Campos NOT NULL Corregidos

122 conjuros tenían valores `NULL` en campos con constraint `NOT NULL`:

```sql
-- Campos afectados:
- casting_time TEXT NOT NULL
- range_info TEXT NOT NULL
```

**Solución**: Se les asignó el valor `'Ver hechizo base'` para indicar que son variantes de otros hechizos:

```sql
-- Ejemplo: Arcane Sight, Greater
casting_time = 'Ver hechizo base'
range_info = 'Ver hechizo base'
```

Estos son conjuros que funcionan "como el hechizo base, excepto..." según sus descripciones.

---

## 📊 Estadísticas Finales

### Conjuros Insertados
- **Total válido**: 605 conjuros
- **Eliminados**: 3 placeholders
- **Fuente**: Player's Handbook (d20srd.org)

### Relaciones Clase-Hechizo
- **Total**: 1,410 relaciones
- **Distribución**:
  - Bardo: ~100 hechizos
  - Clérigo: ~180 hechizos
  - Druida: ~170 hechizos
  - Paladín: ~60 hechizos
  - Explorador: ~55 hechizos
  - Hechicero/Mago: ~300 hechizos

### Escuelas de Magia
- Abjuración
- Conjuración
- Adivinación
- Encantamiento
- Evocación
- Ilusión
- Nigromancia
- Transmutación
- Universal

---

## ✅ Verificación Post-Ejecución

Después de ejecutar el SQL, verifica con estas queries:

```sql
-- 1. Contar conjuros insertados
SELECT COUNT(*) FROM spells;
-- Debe retornar: 605

-- 2. Verificar escuelas de magia
SELECT school, COUNT(*)
FROM spells
GROUP BY school
ORDER BY COUNT(*) DESC;

-- 3. Contar relaciones clase-hechizo
SELECT COUNT(*) FROM spell_class_levels;
-- Debe retornar: 1410

-- 4. Ver conjuros por clase
SELECT
  c.name AS clase,
  COUNT(*) AS total_hechizos
FROM spell_class_levels scl
JOIN classes c ON c.id = scl.class_id
GROUP BY c.name
ORDER BY COUNT(*) DESC;

-- 5. Verificar que no hay placeholders
SELECT * FROM spells
WHERE slug IN ('greater-spell-name', 'lesser-spell-name', 'mass-spell-name');
-- Debe retornar: 0 rows

-- 6. Verificar campos NOT NULL
SELECT COUNT(*) FROM spells
WHERE casting_time IS NULL OR range_info IS NULL;
-- Debe retornar: 0
```

---

## 🛠️ Scripts de Corrección Creados

Los siguientes scripts fueron creados para limpiar los archivos:

1. **`scripts/clean-spell-placeholders.mjs`** - Elimina entradas placeholder
2. **`scripts/fix-null-strings.mjs`** - Convierte 'null' strings a NULL
3. **`scripts/fix-spells-complete.mjs`** - Corrección completa de part1
4. **`scripts/fix-spells-complete-all.mjs`** - Corrección completa de complete.sql

Estos scripts están disponibles para futuras migraciones de datos similares.

---

## 📝 Notas Importantes

1. **Prerequisitos**: Asegúrate de que la tabla `classes` ya tenga las 11 clases base insertadas antes de ejecutar las relaciones spell_class_levels.

2. **Conjuros variantes**: Los conjuros con `casting_time = 'Ver hechizo base'` son variantes mejoradas de otros hechizos (ej: Arcane Sight, Greater). Consulta su descripción para ver las diferencias.

3. **ON CONFLICT**: Todos los INSERTs tienen `ON CONFLICT (slug) DO NOTHING`, por lo que puedes re-ejecutar los scripts sin duplicados.

4. **Constraint check**: El constraint `check_spell_school` valida que solo se usen escuelas de magia válidas.

---

**Generado**: 2025-11-14
**Última actualización**: Correcciones aplicadas a todos los archivos
**Estado**: ✅ Listo para producción
