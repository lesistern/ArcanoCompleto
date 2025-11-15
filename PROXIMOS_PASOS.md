# 🎯 Próximos Pasos - D&D Compendium

**Fecha**: 2025-11-15 (Noche)
**Estado**: 3 SQLs críticos completados ✅

---

## ✅ COMPLETADO HOY

1. ✅ **Extensiones PostgreSQL** - 6 extensiones + 3 tareas + búsqueda fuzzy
2. ✅ **Sistema de Experiencia** - 20 niveles + triggers automáticos + gamificación
3. ✅ **Dotes del PHB** - 109 dotes insertadas (143 totales en BD)

---

## 📋 SIGUIENTES TAREAS PRIORITARIAS

### 🟡 PRIORIDAD ALTA - Ejecutar SQLs Restantes

#### 1. Progresión de Clases (Recomendado AHORA) ✅ CORREGIDO

**Archivo**: `class_progression_complete-fixed.sql` (~386 líneas) ✅
**Tiempo**: 5-10 segundos

**⚠️ IMPORTANTE**: Usar el archivo **CORREGIDO** (`-fixed.sql`), no el original.

**Qué hace:**
- Crea tabla `class_progression`
- Inserta **220 registros** (11 clases × 20 niveles)
- BAB, salvaciones, habilidades por nivel
- Conjuros por día (clases mágicas)

**Por qué ejecutarlo:**
- ✅ Necesario para mostrar tablas de progresión en `/clases/[slug]`
- ✅ Datos ya scrapeados y validados
- ✅ No tiene dependencias adicionales
- ✅ Mejora significativa en páginas de clases

**Problema resuelto:**
- ❌ Archivo original contenía UPDATE de columnas inexistentes (`weapon_proficiency`, `armor_proficiency`)
- ✅ Archivo corregido elimina los UPDATE y solo hace CREATE + INSERT

**Verificación:**
```sql
SELECT COUNT(*) FROM class_progression;
-- Debe retornar: 220
```

**Guías completas**:
- Ver [GUIA_PROGRESION_CLASES.md](GUIA_PROGRESION_CLASES.md)
- Ver [SOLUCION_ERROR_PROGRESION.md](SOLUCION_ERROR_PROGRESION.md) ⭐ NUEVO

---

#### 2. Índices de Libros

**Archivo**: `book_contents_improved.sql` (42 KB)
**Tiempo**: 2-3 segundos

**Qué hace:**
- Crea tabla `book_contents`
- Inserta **311 índices** de 3 libros core:
  - Player's Handbook: 125 entradas
  - Dungeon Master's Guide: 67 entradas
  - Monster Manual: 121 entradas

**Por qué ejecutarlo:**
- ✅ Permite navegación estructurada de libros
- ✅ Base para futuras búsquedas por libro
- ✅ Complementa datos de tabla `books`

**Verificación:**
```sql
SELECT COUNT(*) FROM book_contents;
-- Debe retornar: 311

SELECT book_slug, COUNT(*) FROM book_contents GROUP BY book_slug;
-- PHB: 125, DMG: 67, MM: 121
```

---

### 🎨 PRIORIDAD ALTA - Actualizar Frontend

#### 3. Actualizar Leaderboard y Perfiles para Sistema de XP

**Páginas afectadas:**
- `/leaderboard` - Mostrar niveles en lugar de karma
- `/u/[username]` - Barra de progreso de XP
- Componente `BetaBadge` - Mostrar nivel actual

**Cambios necesarios:**

**Leaderboard (`/leaderboard/page.tsx`):**
```typescript
// Cambiar query de karma_points a experience_points
const { data } = await supabase
  .from('v_level_leaderboard')
  .select('*')
  .limit(100);

// Mostrar:
// - level (1-20)
// - level_title ("Héroe consagrado", etc.)
// - level_tier (Novato, Héroe, Épico, Legendario)
// - experience_points
// - exp_to_next_level
```

**Perfil de Usuario (`/u/[username]/page.tsx`):**
```typescript
// Usar función RPC get_user_stats()
const { data } = await supabase
  .rpc('get_user_stats', { user_id: profileId });

// Mostrar:
// - Título épico: "Héroe consagrado"
// - Nivel actual: 10
// - Barra de progreso: 45,000 / 64,000 XP (70%)
// - XP al siguiente nivel: 19,000 XP restantes
```

**BetaBadge Component:**
```typescript
// Mostrar nivel en lugar de tier
<div className="flex items-center gap-2">
  <span className="text-gold-400">Nivel {user.level}</span>
  <span className="text-dungeon-300">{user.level_title}</span>
</div>
```

---

#### 4. Implementar Búsqueda Fuzzy

**Páginas afectadas:**
- `/conjuros` - Búsqueda de conjuros
- `/dotes` - Búsqueda de dotes (futuro)

**Usar funciones creadas:**
```typescript
// Búsqueda con tolerancia a errores
const { data } = await supabase
  .rpc('search_spells_fuzzy', {
    search_term: userInput, // "fireboll"
    max_results: 10
  });

// Retorna conjuros similares con score de similitud
// "Fireball" con 0.85 de similitud
```

**Beneficio:**
- ✅ Usuarios pueden buscar con typos
- ✅ Mejor experiencia de usuario
- ✅ Funciones ya creadas, solo falta integrar

---

#### 5. Crear Componente `<ProgressionTable>`

**Ubicación**: `src/components/classes/ProgressionTable.tsx`

**Propósito**: Mostrar tabla de progresión 1-20 en `/clases/[slug]`

**Diseño:**
```tsx
<ProgressionTable progression={classProgression} />

// Muestra:
// - Niveles 1-20
// - BAB por nivel
// - Fort/Ref/Will saves
// - Habilidades especiales
// - Conjuros por día (si aplica)
```

**Features:**
- Responsive (colapsa en móviles)
- Highlight de niveles importantes (5, 10, 15, 20)
- Tooltip para habilidades largas
- Sticky header al hacer scroll

---

### 🟢 PRIORIDAD MEDIA - Mejoras Adicionales

#### 6. Implementar Tablas de Progresión en Frontend

**Después de ejecutar** `class_progression_complete.sql`:

1. Crear componente `<ProgressionTable>`
2. Integrar en `/clases/[slug]`
3. Agregar tab "Progresión" en página de clase
4. Mostrar tabla completa 1-20

---

#### 7. Conectar Frontend de Feedback (CRUD)

**Pendiente desde antes:**
- `/feedback` - Insertar tickets en `feedback_tickets`
- `/admin/tickets` - Listar y actualizar tickets
- Funciones ya existen en BD, solo falta conectar

---

## 📊 Orden Recomendado de Ejecución

### Opción A: SQLs Primero (Recomendado)

1. ✅ Ejecutar `class_progression_complete.sql` (5-10 segundos)
2. ✅ Ejecutar `book_contents_improved.sql` (2-3 segundos)
3. 🎨 Actualizar frontend de leaderboard/perfiles
4. 🎨 Crear componente `<ProgressionTable>`
5. 🎨 Implementar búsqueda fuzzy

**Ventaja**: Datos disponibles inmediatamente, frontend se actualiza después

---

### Opción B: Frontend Primero

1. 🎨 Actualizar leaderboard/perfiles para XP
2. 🎨 Implementar búsqueda fuzzy
3. ✅ Ejecutar SQLs cuando sea necesario

**Ventaja**: Usuarios ven cambios de XP inmediatamente, tablas de progresión después

---

### Opción C: Balanceada

1. ✅ Ejecutar `class_progression_complete.sql`
2. 🎨 Actualizar leaderboard/perfiles para XP
3. 🎨 Crear componente `<ProgressionTable>`
4. ✅ Ejecutar `book_contents_improved.sql`
5. 🎨 Implementar búsqueda fuzzy

**Ventaja**: Mezcla de backend y frontend, progreso visible constante

---

## 🎯 Recomendación

**Empezar con Opción A (SQLs Primero)**:

### Paso 1: Ejecutar Progresión de Clases (AHORA)
- Tiempo: 5-10 segundos
- Impacto: Alto (habilita tablas de progresión)
- Dificultad: Baja (copiar/pegar SQL)

### Paso 2: Actualizar Frontend de XP (Después)
- Tiempo: 1-2 horas
- Impacto: Muy Alto (usuarios ven nuevo sistema)
- Dificultad: Media (cambios en varios componentes)

### Paso 3: Crear Tabla de Progresión (Después)
- Tiempo: 2-3 horas
- Impacto: Alto (mejora páginas de clases)
- Dificultad: Media (componente nuevo responsive)

---

## 📈 Métricas de Progreso

**SQLs Críticos**:
- ✅ 3 completados
- 🟡 2 pendientes (progresión, índices)
- **Total**: 60% completado

**Frontend Crítico**:
- ✅ Editor de personajes funcionando
- ⏳ Leaderboard/perfiles con XP pendiente
- ⏳ Búsqueda fuzzy pendiente
- ⏳ Tabla de progresión pendiente
- **Total**: 25% completado

**Funcionalidades Habilitadas**:
- ✅ Sistema de gamificación (XP + niveles)
- ✅ 143 dotes disponibles
- ✅ Búsqueda fuzzy (backend listo)
- ✅ Tareas automatizadas (pg_cron)
- ⏳ Tablas de progresión (pendiente SQL)
- **Total**: 80% completado

---

## 🚀 ¿Por dónde empezamos?

**Opción 1**: Ejecutar `class_progression_complete.sql` ahora (5-10 segundos)
**Opción 2**: Actualizar frontend de leaderboard/perfiles (1-2 horas)
**Opción 3**: Otra tarea específica

**¿Qué prefieres?** 🎯
