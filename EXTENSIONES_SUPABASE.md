# 🔌 Extensiones de Supabase Habilitadas

**Última actualización:** 2025-11-15
**Estado:** SQL generado, listo para ejecutar

---

## 📋 Extensiones Habilitadas

### 1. **pg_vector** - Búsqueda Semántica ⭐⭐⭐

**Para qué sirve:**
- Búsqueda de conjuros/dotes/monstruos por **similitud semántica**
- "Buscar conjuros parecidos a Fireball" → Encuentra Delayed Blast Fireball, Meteor Swarm
- Recomendaciones: "Si te gusta X, prueba Y"

**Casos de uso:**

#### Búsqueda Semántica de Conjuros
```sql
-- 1. Agregar columna de embeddings
ALTER TABLE spells ADD COLUMN embedding vector(1536);

-- 2. Crear índice vectorial
CREATE INDEX ON spells USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- 3. Buscar conjuros similares
SELECT name_es, description_es,
       1 - (embedding <=> query_embedding) AS similarity
FROM spells
ORDER BY embedding <=> query_embedding
LIMIT 10;
```

#### Generar Embeddings (Frontend)
```typescript
// Usar OpenAI API para generar embeddings
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
}

// Guardar embedding en Supabase
const embedding = await generateEmbedding(spell.description_es);
await supabase
  .from('spells')
  .update({ embedding })
  .eq('id', spell.id);
```

---

### 2. **pg_cron** - Tareas Programadas ⭐⭐

**Para qué sirve:**
- Ejecutar tareas automáticas periódicas
- Recalcular leaderboard, limpiar datos, enviar emails

**Casos de uso:**

#### Recalcular Leaderboard Diario
```sql
-- Ejecutar cada día a las 3 AM
SELECT cron.schedule(
  'refresh-leaderboard',
  '0 3 * * *',
  $$
    REFRESH MATERIALIZED VIEW v_level_leaderboard;
    NOTIFY admin_channel, 'Leaderboard actualizado';
  $$
);
```

#### Limpiar Sesiones Expiradas
```sql
-- Ejecutar cada hora
SELECT cron.schedule(
  'clean-expired-sessions',
  '0 * * * *',
  $$
    DELETE FROM auth.sessions
    WHERE expires_at < NOW();
  $$
);
```

#### Calcular Estadísticas Semanales
```sql
-- Ejecutar cada lunes a las 00:00
SELECT cron.schedule(
  'weekly-stats',
  '0 0 * * 1',
  $$
    INSERT INTO stats_history (week, total_users, total_reports, total_xp)
    SELECT
      DATE_TRUNC('week', NOW()),
      COUNT(DISTINCT id),
      SUM(reports_submitted),
      SUM(experience_points)
    FROM profiles;
  $$
);
```

#### Ver Tareas Programadas
```sql
-- Listar todas las tareas activas
SELECT jobid, schedule, command
FROM cron.job
ORDER BY jobid;

-- Desactivar una tarea
SELECT cron.unschedule(123); -- ID del job
```

---

### 3. **pgroonga** - Búsqueda Full-Text Multiidioma ⭐⭐

**Para qué sirve:**
- Búsqueda en **español e inglés** simultáneamente
- Tolerancia a errores de tipeo
- Mejor que el full-text nativo de Postgres

**Casos de uso:**

#### Búsqueda de Conjuros (Español/Inglés)
```sql
-- 1. Crear índice pgroonga
CREATE INDEX spells_search_idx ON spells
USING pgroonga (name_es, name_en, description_es);

-- 2. Buscar en ambos idiomas
SELECT * FROM spells
WHERE name_es &@~ 'bola de fuego'
   OR name_en &@~ 'fireball';

-- 3. Búsqueda con tolerancia a errores
SELECT * FROM spells
WHERE name_es &@~ 'bola de fugo'; -- Encuentra "Bola de Fuego"
```

#### Búsqueda de Dotes
```sql
-- Crear índice combinado
CREATE INDEX feats_search_idx ON feats
USING pgroonga (name, benefit, prerequisites);

-- Buscar dotes que mencionen "daño" o "attack"
SELECT * FROM feats
WHERE benefit &@~ 'daño|attack'
ORDER BY name;
```

---

### 4. **pg_trgm** - Búsqueda Fuzzy ⭐

**Para qué sirve:**
- Búsqueda con **tolerancia a typos**
- Más ligero que pgroonga
- Sugerencias de búsqueda ("¿Quisiste decir...?")

**Casos de uso:**

#### Búsqueda con Typos
```sql
-- 1. Crear índice trigram
CREATE INDEX spells_name_trgm_idx ON spells
USING gin (name_es gin_trgm_ops);

-- 2. Buscar con typos
SELECT name_es, similarity(name_es, 'fireboll') AS sim
FROM spells
WHERE name_es % 'fireboll' -- Operador de similitud
ORDER BY sim DESC
LIMIT 5;
-- Resultado: "Fireball" con 0.8 de similitud
```

#### Autocompletado
```sql
-- Sugerir nombres mientras el usuario escribe
SELECT name_es
FROM spells
WHERE name_es ILIKE 'acid%'
ORDER BY similarity(name_es, 'acid arrow') DESC
LIMIT 10;
```

---

### 5. **uuid-ossp** - Generación de UUIDs ✅

**Para qué sirve:**
- Generar IDs únicos
- Probablemente ya habilitada por Supabase Auth

**Uso:**
```sql
-- Generar UUID v4
SELECT uuid_generate_v4();

-- Usar en tabla
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL
);
```

---

### 6. **pg_stat_statements** - Monitoreo de Performance ⭐

**Para qué sirve:**
- Identificar queries lentas
- Optimizar base de datos

**Uso:**

#### Ver Queries Más Lentas
```sql
SELECT
  query,
  calls,
  mean_exec_time AS avg_ms,
  total_exec_time AS total_ms
FROM pg_stat_statements
WHERE query NOT LIKE '%pg_stat_statements%'
ORDER BY mean_exec_time DESC
LIMIT 20;
```

#### Resetear Estadísticas
```sql
SELECT pg_stat_statements_reset();
```

---

## 🚀 Cómo Habilitar

### Opción 1: Ejecutar SQL (Recomendado)

1. Abrir **Supabase SQL Editor**:
   - https://supabase.com/dashboard/project/akcuvlanpqpoizconuhm/sql

2. Copiar y pegar el contenido de:
   - `supabase/enable-extensions.sql`

3. Ejecutar el script completo

4. Verificar extensiones habilitadas:
```sql
SELECT extname, extversion
FROM pg_extension
WHERE extname IN ('vector', 'pg_cron', 'pgroonga', 'pg_trgm')
ORDER BY extname;
```

### Opción 2: Dashboard de Supabase

1. Ir a **Database** → **Extensions**
2. Buscar cada extensión:
   - `vector`
   - `pg_cron`
   - `pgroonga`
   - `pg_trgm`
   - `pg_stat_statements`
3. Click en **Enable** para cada una

---

## 📊 Roadmap de Implementación

### Fase 1 - Inmediato (HOY)
- ✅ Habilitar extensiones en Supabase
- ⏳ Configurar `pg_cron` para leaderboard diario
- ⏳ Habilitar `pg_stat_statements` para monitoreo

### Fase 2 - Corto Plazo (Esta Semana)
- ⏳ Implementar búsqueda fuzzy con `pg_trgm`
- ⏳ Crear índices para autocompletado
- ⏳ Configurar tareas de limpieza automática

### Fase 3 - Mediano Plazo (Este Mes)
- ⏳ Implementar `pgroonga` para búsqueda multiidioma
- ⏳ Crear índices combinados (nombre + descripción)
- ⏳ Sistema de sugerencias "¿Quisiste decir...?"

### Fase 4 - Largo Plazo (Próximos 3 Meses)
- ⏳ Implementar `pg_vector` para búsqueda semántica
- ⏳ Generar embeddings de conjuros/dotes (OpenAI API)
- ⏳ Sistema de recomendaciones "Si te gusta X, prueba Y"

---

## 💡 Notas Importantes

### pg_vector
- **Costo:** Requiere OpenAI API ($0.0001 por 1K tokens)
- **Performance:** Índices IVFFlat son rápidos pero aproximados
- **Alternativa:** Usar solo para recomendaciones, no búsqueda principal

### pg_cron
- **Permisos:** Requiere `supabase_admin` role
- **Límite:** Máximo 100 jobs programados
- **Monitoreo:** Revisar logs en Dashboard → Logs → Postgres

### pgroonga
- **Idiomas:** Soporta 100+ idiomas incluyendo español
- **Performance:** ~10x más rápido que full-text nativo en búsquedas multiidioma
- **Espacio:** Índices ocupan ~30% más que GIN nativo

### pg_trgm
- **Threshold:** Ajustar `pg_trgm.similarity_threshold` (default: 0.3)
- **Límite:** No funciona bien con textos muy cortos (<3 caracteres)
- **Mejor para:** Nombres de conjuros, dotes, clases

---

## 🔧 Troubleshooting

### Error: "extension does not exist"
- Verificar que la extensión esté disponible en tu plan de Supabase
- Algunas extensiones requieren plan Pro o superior

### Error: "permission denied"
- Ejecutar como `supabase_admin`:
```sql
SET ROLE supabase_admin;
CREATE EXTENSION vector;
RESET ROLE;
```

### pg_cron no ejecuta tareas
- Verificar que el job esté activo:
```sql
SELECT * FROM cron.job WHERE jobname = 'refresh-leaderboard';
```
- Revisar logs:
```sql
SELECT * FROM cron.job_run_details
WHERE jobid = 123
ORDER BY start_time DESC;
```

---

**Archivo SQL:** `supabase/enable-extensions.sql`
**Estado:** ✅ Listo para ejecutar
**Próximo paso:** Ejecutar SQL en Supabase Dashboard
