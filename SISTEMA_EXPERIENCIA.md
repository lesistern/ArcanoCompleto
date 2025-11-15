# 🎮 Sistema de Experiencia y Niveles

**Última actualización:** 2025-11-15
**Estado:** ✅ Backend SQL completado | ⏳ Frontend pendiente

---

## 📖 Descripción General

El **Sistema de Experiencia (EXP)** reemplaza el antiguo sistema de "karma points" con un sistema de progresión basado en **D&D 5e** con **20 niveles** y títulos personalizados. Los usuarios ganan experiencia realizando acciones valiosas en la comunidad y suben de nivel automáticamente.

---

## 🎯 Niveles y Requisitos de EXP

El sistema está dividido en **4 tiers** con 20 niveles totales:

### 🌱 **Tier Novato** (Niveles 1-4)
Desarrollo básico, formación, descubrimiento de estilo.

| Nivel | XP Requerida | Título |
|-------|--------------|--------|
| **1** | 0 | Recién nacido en la aventura |
| **2** | 300 | Iniciado en pruebas |
| **3** | 900 | Portador del camino |
| **4** | 2,700 | Adepto formado |

### ⚔️ **Tier Héroe** (Niveles 5-10)
Salto de poder, hazañas regionales, dominio de habilidades.

| Nivel | XP Requerida | Título |
|-------|--------------|--------|
| **5** | 6,500 | Héroe en ascenso |
| **6** | 14,000 | Guardián competente |
| **7** | 23,000 | Campeón menor |
| **8** | 34,000 | Forjador de destino |
| **9** | 48,000 | Poder sobresaliente |
| **10** | 64,000 | Héroe consagrado |

### 🌟 **Tier Épico** (Niveles 11-16)
Impacto continental, magia/combate de escala mayor.

| Nivel | XP Requerida | Título |
|-------|--------------|--------|
| **11** | 85,000 | Campeón ascendido |
| **12** | 100,000 | Maestro del sendero |
| **13** | 120,000 | Tejedor de poder |
| **14** | 140,000 | Eminencia marcial / arcana |
| **15** | 165,000 | Portador de leyenda |
| **16** | 195,000 | Estrella del campo de batalla |

### 🏆 **Tier Legendario** (Niveles 17-20)
Poder mítico, amenaza o salvación del mundo.

| Nivel | XP Requerida | Título |
|-------|--------------|--------|
| **17** | 225,000 | Mano del destino |
| **18** | 265,000 | Voz de los mitos |
| **19** | 305,000 | Ascendido supremo |
| **20** | 355,000 | Leyenda viviente |

---

## 💰 Cómo Ganar Experiencia

Los usuarios ganan EXP realizando acciones valiosas en la comunidad:

### 🐛 Reportar Bugs/Errores
- **+50 EXP** por cada reporte enviado
- **+200 EXP bonus** cuando el reporte es marcado como "resuelto"
- **Total potencial:** 250 EXP por bug resuelto

### 📝 Traducir Contenido
- **+100 EXP** por cada traducción aprobada
- **+50 EXP** por revisar traducciones de otros usuarios
- **Total potencial:** 150 EXP por traducción completa

### 👍 Recibir Votos Positivos
- **+10 EXP** por cada voto positivo (+1) en tus reportes
- Sin límite de votos
- **Ejemplo:** 10 votos = 100 EXP

### 💬 Ayudar en Foros/Comentarios
- **+25 EXP** por comentario útil marcado como "helpful"
- Requiere validación de moderadores
- **Nota:** Feature pendiente de implementar

### 📚 Contribuciones Generales
- **Escribir guías:** +150 EXP (aprobadas por admin)
- **Añadir contenido faltante:** +75 EXP por entrada completa
- **Corregir errores de datos:** +30 EXP por corrección aprobada

---

## 🔧 Arquitectura Técnica

### Base de Datos

#### Tabla `user_levels`
Almacena los 20 niveles con sus requisitos y títulos.

```sql
CREATE TABLE public.user_levels (
  level INTEGER PRIMARY KEY,
  xp_required BIGINT NOT NULL,
  title TEXT NOT NULL,
  tier TEXT NOT NULL,
  description TEXT
);
```

#### Tabla `profiles` (modificada)
Columnas relacionadas con experiencia:

```sql
ALTER TABLE public.profiles
  ADD COLUMN experience_points BIGINT DEFAULT 0,
  ADD COLUMN level INTEGER DEFAULT 1,
  ADD COLUMN exp_to_next_level BIGINT DEFAULT 300;
```

### Funciones SQL

#### `calculate_level_from_exp(exp_points)`
Calcula el nivel del usuario basándose en su EXP acumulada.

```sql
SELECT calculate_level_from_exp(15000); -- Retorna: 6
```

#### `get_level_info(level)`
Devuelve toda la información de un nivel específico.

```sql
SELECT * FROM get_level_info(10);
-- Retorna: level=10, xp_required=64000, title='Héroe consagrado', tier='Héroe'
```

#### `award_exp(user_id, exp_amount, reason)`
Otorga experiencia a un usuario y actualiza su nivel automáticamente.

```sql
SELECT * FROM award_exp(
  '123e4567-e89b-12d3-a456-426614174000'::UUID,
  100,
  'Traducción de conjuro aprobada'
);
-- Retorna: new_exp, new_level, level_up (boolean), title
```

### Triggers Automáticos

#### `trigger_update_level_on_exp_change`
Se ejecuta cuando cambia `experience_points` y actualiza automáticamente:
- `level` (calculado desde XP)
- `exp_to_next_level` (XP faltante para siguiente nivel)

#### `trigger_update_exp_on_vote`
Otorga **+10 EXP** cuando un usuario recibe un voto positivo.

#### `trigger_update_exp_on_report_created`
Otorga **+50 EXP** cuando un usuario crea un reporte.

#### `trigger_update_exp_on_report_resolved`
Otorga **+200 EXP bonus** cuando un reporte es marcado como resuelto.

### Vistas

#### `v_level_leaderboard`
Top 100 usuarios ordenados por nivel y experiencia.

```sql
SELECT * FROM v_level_leaderboard LIMIT 10;
```

Columnas:
- `rank` - Posición en el ranking
- `display_name` - Nombre del usuario
- `level` - Nivel actual
- `level_title` - Título del nivel (ej: "Héroe consagrado")
- `level_tier` - Tier del nivel (Novato/Héroe/Épico/Legendario)
- `experience_points` - EXP total acumulada
- `exp_to_next_level` - EXP faltante para subir
- `reports_submitted`, `reports_resolved`, `total_votes_received`
- `resolution_rate` - % de reportes resueltos

#### `v_user_profile_with_level`
Vista completa del perfil con información de nivel y progreso.

```sql
SELECT * FROM v_user_profile_with_level WHERE id = 'user-uuid';
```

Columnas adicionales:
- `progress_percentage` - % de progreso hacia el siguiente nivel
- `global_rank` - Posición en el ranking global

---

## 🎨 UI/UX Recomendado

### Componente de Nivel (Profile Card)

```tsx
interface UserLevel {
  level: number;
  levelTitle: string;
  levelTier: 'Novato' | 'Héroe' | 'Épico' | 'Legendario';
  experiencePoints: number;
  expToNextLevel: number;
  nextLevelXp: number;
  progressPercentage: number;
}

// Ejemplo de visualización:
// [Nivel 8] Forjador de Destino (Tier Héroe)
// ████████░░░░░░░░░░ 65% (22,100 / 34,000 XP)
```

### Colores por Tier

- **Novato:** `text-gray-400` / `bg-gray-100`
- **Héroe:** `text-blue-500` / `bg-blue-100`
- **Épico:** `text-purple-600` / `bg-purple-100`
- **Legendario:** `text-amber-500` / `bg-amber-100`

### Barra de Progreso

```tsx
<div className="w-full bg-gray-200 rounded-full h-2.5">
  <div
    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
    style={{ width: `${progressPercentage}%` }}
  />
</div>
<p className="text-sm text-gray-600 mt-1">
  {experiencePoints.toLocaleString()} / {nextLevelXp.toLocaleString()} XP
</p>
```

### Notificación de Level Up

Cuando `award_exp()` retorna `level_up = true`:

```tsx
// Toast notification
🎉 ¡Has subido de nivel!
Nivel {newLevel}: {levelTitle}
+{expGained} EXP
```

---

## 📊 Ejemplos de Uso

### Ejemplo 1: Usuario Nuevo
- **Acciones:**
  - Registra cuenta (+0 EXP, empieza en nivel 1)
  - Reporta un bug (+50 EXP)
  - Recibe 3 votos positivos (+30 EXP)
  - Bug es resuelto (+200 EXP bonus)

- **Total:** 280 EXP
- **Nivel alcanzado:** 1 → **Nivel 2: "Iniciado en pruebas"** ✅

### Ejemplo 2: Traductor Activo
- **Acciones:**
  - Traduce 10 conjuros aprobados (10 × 100 = +1,000 EXP)
  - Revisa 20 traducciones (20 × 50 = +1,000 EXP)
  - Recibe 50 votos positivos (+500 EXP)

- **Total:** 2,500 EXP
- **Nivel alcanzado:** **Nivel 4: "Adepto formado"** (Tier Novato)

### Ejemplo 3: Contribuidor Veterano
- **Acciones:**
  - 100 reportes enviados (100 × 50 = +5,000 EXP)
  - 80 reportes resueltos (80 × 200 = +16,000 EXP)
  - 200 votos recibidos (+2,000 EXP)
  - 50 traducciones (50 × 100 = +5,000 EXP)

- **Total:** 28,000 EXP
- **Nivel alcanzado:** **Nivel 7: "Campeón menor"** (Tier Héroe) ⚔️

---

## 🚀 Migración desde Karma

### Paso 1: Ejecutar SQL en Supabase

```bash
# Abrir Supabase SQL Editor
# https://supabase.com/dashboard

# Copiar y ejecutar:
# dnd-compendium/supabase/reform-karma-to-exp-system.sql
```

### Paso 2: Verificar Migración

```sql
-- Verificar que se crearon los 20 niveles
SELECT COUNT(*) FROM user_levels; -- Debe retornar 20

-- Verificar que se renombró karma_points a experience_points
SELECT column_name FROM information_schema.columns
WHERE table_name = 'profiles'
AND column_name IN ('experience_points', 'level', 'exp_to_next_level');

-- Ver top 10 usuarios por nivel
SELECT display_name, level, level_title, experience_points
FROM v_level_leaderboard
LIMIT 10;
```

### Paso 3: Actualizar Frontend

Cambiar todas las referencias de:
- `karma_points` → `experience_points` (o `exp`)
- `v_karma_leaderboard` → `v_level_leaderboard`
- Agregar visualización de nivel y título
- Mostrar barra de progreso de EXP

### Archivos a Modificar

- `/src/app/leaderboard/page.tsx` - Vista del leaderboard
- `/src/app/u/[username]/page.tsx` - Perfil público
- `/src/app/profile/page.tsx` - Perfil propio (si existe)
- `/src/components/BetaBadge.tsx` - Badge de beta tester
- Cualquier componente que muestre karma

---

## 🎯 Próximos Pasos

### Backend (Completado ✅)
- ✅ Tabla `user_levels` con 20 niveles
- ✅ Modificar `profiles` para usar `experience_points`
- ✅ Funciones de cálculo de nivel
- ✅ Triggers para otorgar EXP automáticamente
- ✅ Vistas actualizadas (leaderboard, profile)

### Frontend (Pendiente ⏳)
- ⏳ Actualizar componente de Leaderboard
- ⏳ Mostrar nivel y título en perfiles
- ⏳ Agregar barra de progreso de EXP
- ⏳ Notificación de "Level Up"
- ⏳ Badge de tier (Novato/Héroe/Épico/Legendario)
- ⏳ Tooltip con info del nivel actual

### Gamificación Adicional (Futuro 🔮)
- ⏳ Tabla `exp_logs` para registrar cada transacción de EXP
- ⏳ Logros/Badges especiales (ej: "Primera traducción", "100 reportes")
- ⏳ Racha de días consecutivos (+bonus EXP)
- ⏳ Eventos especiales (doble EXP en fin de semana)
- ⏳ Sistema de "prestige" para usuarios nivel 20

---

## 🔍 FAQ

### ¿Se pierde experiencia?
No, la experiencia es acumulativa y nunca disminuye. Solo se gana EXP, nunca se pierde.

### ¿Qué pasa al llegar a nivel 20?
Al alcanzar el nivel máximo (355,000 XP), sigues acumulando experiencia pero no subes más de nivel. En el futuro podríamos implementar un sistema de "prestige".

### ¿Cómo se calculan los niveles?
El nivel se calcula automáticamente mediante la función `calculate_level_from_exp()` que busca el nivel más alto cuyo requisito de XP sea menor o igual a tu experiencia actual.

### ¿Puedo perder mi nivel?
No, los niveles son permanentes. Una vez alcanzado un nivel, nunca bajas.

### ¿Los admins tienen ventajas?
Los admins NO reciben EXP extra. Todos ganan experiencia de la misma forma. La única diferencia es que admins pueden otorgar EXP manualmente mediante `award_exp()` en casos especiales.

---

**Documentación creada:** 2025-11-15
**Archivo SQL:** `dnd-compendium/supabase/reform-karma-to-exp-system.sql`
**Estado:** ✅ Listo para ejecutar en Supabase
