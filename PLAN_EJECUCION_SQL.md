# 📋 Plan de Ejecución de SQLs Pendientes

**Fecha**: 2025-11-15
**Estado**: ✅ Extensiones configuradas | ⏳ SQLs críticos pendientes

---

## ✅ COMPLETADO RECIENTEMENTE

### Extensiones de Supabase (100%)
- ✅ **6 extensiones habilitadas**: pg_vector, pg_cron, pgroonga, pg_trgm, uuid-ossp, pg_stat_statements
- ✅ **3 índices fuzzy creados**: spells_name_trgm_idx, feats_name_trgm_idx, classes_name_trgm_idx
- ✅ **3 tareas de cron programadas**: leaderboard stats, session cleanup, level recalculation
- ✅ **2 funciones fuzzy**: search_spells_fuzzy(), search_feats_fuzzy()
- ✅ **1 vista de performance**: v_slow_queries

**Archivos ejecutados**:
- `enable-extensions-simple.sql` ✅
- `configure-extensions.sql` ✅

**Verificación**: `verify-extensions-config.sql` (disponible para ejecutar)

---

## 🔴 PRIORIDAD CRÍTICA - EJECUTAR AHORA

### 1. Sistema de Experiencia (MÁXIMA PRIORIDAD) 🔴🔴🔴

**Archivo**: `reform-karma-to-exp-system.sql` (600+ líneas)

**Qué hace**:
- Convierte sistema de karma a sistema de experiencia D&D 5e
- 20 niveles de progresión (300 XP por nivel)
- Triggers automáticos para calcular nivel desde XP
- Función `calculate_level_from_exp()`
- Vista `v_level_leaderboard` actualizada
- Migra datos existentes de karma → experience_points

**Por qué es crítico**:
- Afecta leaderboard, perfiles de usuario, sistema de gamificación
- Frontend ya está preparado para usar experiencia en lugar de karma
- Bloquea otras funcionalidades dependientes

**Verificación después de ejecutar**:
```sql
-- Ver estructura actualizada
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'profiles'
AND column_name IN ('experience_points', 'level');

-- Ver leaderboard con niveles
SELECT display_name, level, experience_points
FROM v_level_leaderboard
LIMIT 10;

-- Probar función de cálculo de nivel
SELECT calculate_level_from_exp(0);    -- Debe retornar 1
SELECT calculate_level_from_exp(300);  -- Debe retornar 2
SELECT calculate_level_from_exp(6000); -- Debe retornar 20
```

---

### 2. Dotes del Player's Handbook (ALTA PRIORIDAD) 🔴🔴

**Archivo**: `insert-feats-phb.sql` (56 KB)

**Qué hace**:
- Inserta 109 dotes scrapeadas del Player's Handbook
- Categorías en español: General (92), Metamágica (9), Creación de objetos (8)
- Datos completos: nombre, categoría, prerequisitos, beneficio, especial, normal

**Por qué es crítico**:
- Datos ya scrapeados y validados, solo falta insertar
- Frontend de dotes necesita estos datos
- Editor de personajes depende de esto

**Verificación después de ejecutar**:
```sql
-- Contar dotes totales
SELECT COUNT(*) FROM feats;
-- Resultado esperado: 109

-- Ver distribución por categoría
SELECT category, COUNT(*)
FROM feats
GROUP BY category
ORDER BY COUNT(*) DESC;
-- Resultado esperado:
-- General: 92
-- Metamágica: 9
-- Creación de objetos: 8

-- Ver algunas dotes de ejemplo
SELECT name, category, prerequisites
FROM feats
WHERE name LIKE 'Power%' OR name LIKE 'Weapon%'
LIMIT 5;
```

---

## 🟡 PRIORIDAD ALTA - EJECUTAR DESPUÉS

### 3. Sistema de Feedback (si no está ejecutado) 🔴

**Archivo**: `create-feedback-system.sql` (341 líneas)

**Qué hace**:
- Crea tabla `feedback_tickets`
- 3 ENUMs: feedback_category, feedback_priority, feedback_status
- RLS completo para usuarios/admins
- Funciones: close_ticket(), assign_ticket()
- Vistas: v_open_tickets, v_ticket_stats

**Estado**: Frontend ya creado, falta conectar con BD

**Verificación**:
```sql
-- Verificar si ya existe
SELECT COUNT(*) FROM information_schema.tables
WHERE table_name = 'feedback_tickets';

-- Si retorna 0, ejecutar el SQL
-- Si retorna 1, ya está creado
```

---

### 4. Sistema de Votación de Feedback 🟡

**Archivo**: `add-feedback-votes.sql` (159 líneas)

**Qué hace**:
- Tabla `feedback_votes` (upvotes/downvotes)
- Función RPC `toggle_feedback_vote()`
- Actualiza vistas con conteo de votos

**Depende de**: create-feedback-system.sql debe estar ejecutado primero

---

### 5. Perfiles Públicos 🟡

**Archivo**: `add-public-profiles.sql` (335 líneas)

**Qué hace**:
- Columnas: `profile_hidden`, `username_slug`
- Triggers para generar slugs únicos
- Vista `v_public_profiles`
- Función `get_profile_by_username()`
- RLS con políticas separadas

**Frontend**: Página `/u/[username]` ya implementada

---

## 🟢 PRIORIDAD MEDIA - EJECUTAR CUANDO SEA POSIBLE

### 6. Tablas de Progresión de Clases 🟢

**Archivo**: `class_progression_complete.sql`

**Qué hace**:
- Crea tabla `class_progression`
- Inserta 220 niveles (11 clases × 20 niveles)
- BAB, Fort/Ref/Will saves por nivel
- Habilidades especiales por nivel

**Frontend**: Página `/clases/[slug]` necesita esto para mostrar tabla de progresión

**Verificación**:
```sql
SELECT COUNT(*) FROM class_progression;
-- Resultado esperado: 220
```

---

### 7. Índices de Libros 🟢

**Archivo**: `book_contents_improved.sql`

**Qué hace**:
- Tabla `book_contents`
- 311 índices extraídos de PDFs (PHB, DMG, MM)
- Categorización automática (chapter, class, race, feat, etc.)

**Verificación**:
```sql
SELECT COUNT(*) FROM book_contents;
-- Resultado esperado: 311
```

---

## ⚠️ ORDEN DE EJECUCIÓN RECOMENDADO

**Ejecutar en este orden** para evitar dependencias rotas:

1. ✅ `enable-extensions-simple.sql` - COMPLETADO
2. ✅ `configure-extensions.sql` - COMPLETADO
3. 🔴 `reform-karma-to-exp-system.sql` - **SIGUIENTE**
4. 🔴 `insert-feats-phb.sql` - **DESPUÉS**
5. 🟡 `create-feedback-system.sql` (verificar si existe primero)
6. 🟡 `add-feedback-votes.sql` (requiere paso 5)
7. 🟡 `add-public-profiles.sql`
8. 🟢 `class_progression_complete.sql`
9. 🟢 `book_contents_improved.sql`

---

## 📊 Impacto Esperado

### Después de ejecutar todos los SQLs:

**Tablas nuevas**: 4-5 tablas (feedback_tickets, feedback_votes, class_progression, book_contents, etc.)

**Funciones nuevas**:
- `calculate_level_from_exp()`
- `toggle_feedback_vote()`
- `get_profile_by_username()`
- `close_ticket()`, `assign_ticket()`
- `search_spells_fuzzy()`, `search_feats_fuzzy()`

**Datos insertados**:
- 109 dotes del PHB
- 220 niveles de progresión
- 311 índices de libros
- Sistema de experiencia configurado

**Frontend habilitado**:
- `/leaderboard` - Con niveles de usuario
- `/u/[username]` - Perfiles públicos
- `/feedback` - Sistema de reportes
- `/reportes-beta` - Con votación
- `/clases/[slug]` - Con tabla de progresión
- Editor de personajes - Con dotes del PHB

---

## 🎯 SIGUIENTE PASO INMEDIATO

**¿Qué quieres hacer?**

**Opción A - Ejecución Manual (Recomendado)**:
1. Abrir Supabase SQL Editor: https://supabase.com/dashboard
2. Copiar contenido de `reform-karma-to-exp-system.sql`
3. Ejecutar y verificar
4. Repetir con `insert-feats-phb.sql`
5. Continuar con los demás SQLs

**Opción B - Verificación Primero**:
1. Ejecutar `verify-extensions-config.sql` para confirmar extensiones
2. Verificar qué tablas ya existen (feedback_tickets, etc.)
3. Ejecutar solo los SQLs necesarios

**Opción C - Todo de una vez** (No recomendado):
- Ejecutar todos los SQLs en orden
- Alto riesgo de errores en cascada

---

**¿Por dónde empezamos?** 🚀
