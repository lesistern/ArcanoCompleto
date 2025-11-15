# 🚀 Funcionalidades de Supabase Aplicables al Compendio D&D 3.5

**Fecha:** 2025-11-15
**Fuente:** https://supabase.com/docs

---

## 📊 Estado Actual vs Potencial

### ✅ Actualmente Implementado

1. **PostgreSQL Database** - Base de datos relacional con 13 tablas
2. **Supabase Auth** - Autenticación de usuarios (email/password)
3. **Row Level Security (RLS)** - Políticas de seguridad configuradas
4. **Extensiones PostgreSQL:**
   - pg_vector (0.8.0) - Para búsqueda semántica (no implementada aún)
   - pg_cron (1.6.4) - Tareas programadas (3 tareas activas)
   - pgroonga (3.2.5) - Búsqueda full-text multiidioma (no implementada)
   - pg_trgm (1.6) - Búsqueda fuzzy (2 funciones creadas)
   - uuid-ossp (1.1) - UUIDs
   - pg_stat_statements (1.11) - Monitoreo

### ⏳ Pendiente de Implementar

---

## 1️⃣ Búsqueda Full-Text Avanzada (ALTA PRIORIDAD)

### 📚 Documentación
- https://supabase.com/docs/guides/database/full-text-search

### 🎯 Beneficios para el Compendio
- Búsqueda inteligente de conjuros por descripción
- Buscar dotes por efectos similares
- Encontrar clases/razas por características
- **Soporte multiidioma** (español + inglés simultáneamente)

### 🛠️ Implementación Recomendada

#### Conjuros (Spells)
```sql
-- Agregar columna FTS multiidioma
ALTER TABLE spells
ADD COLUMN fts_multiidioma tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('spanish', coalesce(name_es, '')), 'A') ||
  setweight(to_tsvector('spanish', coalesce(description_es, '')), 'B') ||
  setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('spanish', coalesce(school, '')), 'C')
) STORED;

-- Índice GIN para performance
CREATE INDEX idx_spells_fts ON spells USING GIN (fts_multiidioma);

-- Función RPC para búsqueda con ranking
CREATE OR REPLACE FUNCTION search_spells(
  search_query TEXT,
  max_results INT DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  name_es TEXT,
  level INT,
  school TEXT,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.name,
    s.name_es,
    s.level,
    s.school,
    ts_rank(s.fts_multiidioma, websearch_to_tsquery('spanish', search_query)) as relevance
  FROM spells s
  WHERE s.fts_multiidioma @@ websearch_to_tsquery('spanish', search_query)
  ORDER BY relevance DESC, s.level ASC
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql;
```

#### Dotes (Feats)
```sql
ALTER TABLE feats
ADD COLUMN fts_multiidioma tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('spanish', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('spanish', coalesce(benefit, '')), 'B') ||
  setweight(to_tsvector('spanish', coalesce(category, '')), 'C')
) STORED;

CREATE INDEX idx_feats_fts ON feats USING GIN (fts_multiidioma);
```

#### Clases (Classes)
```sql
ALTER TABLE classes
ADD COLUMN fts_multiidioma tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('spanish', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('spanish', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('spanish', coalesce(alignment_restrictions, '')), 'C')
) STORED;

CREATE INDEX idx_classes_fts ON classes USING GIN (fts_multiidioma);
```

### 🎨 Frontend Integration
```typescript
// En src/lib/supabase/search.ts
export async function searchSpells(query: string, maxResults = 50) {
  const { data, error } = await supabase
    .rpc('search_spells', {
      search_query: query,
      max_results: maxResults
    });

  return { data, error };
}
```

### ✅ Checklist de Implementación
- [ ] Crear columnas `fts_multiidioma` en tablas principales
- [ ] Crear índices GIN
- [ ] Crear funciones RPC de búsqueda
- [ ] Crear página `/search` en frontend
- [ ] Componente `<SearchBar>` global
- [ ] Destacar términos coincidentes en resultados
- [ ] Agregar filtros (nivel, escuela, categoría, etc.)

---

## 2️⃣ Búsqueda Semántica con AI Vectors (MEDIA PRIORIDAD)

### 📚 Documentación
- https://supabase.com/docs/guides/ai
- https://supabase.com/docs/guides/ai/vector-columns

### 🎯 Beneficios para el Compendio
- **"Encuentra hechizos similares a Fireball"** → Devuelve Delayed Blast Fireball, Meteor Swarm, etc.
- **Recomendaciones de builds:** "Con Guerrero 5 / Bárbaro 2, ¿qué multiclase me conviene?"
- **Descubrimiento de sinergias:** "Qué dotes/hechizos combinan bien con Power Attack"
- **Enemigos similares:** "Mostrar criaturas parecidas a un Dragón Rojo Adulto"

### 🛠️ Implementación con pgvector

#### Setup de Vectores
```sql
-- Habilitar extensión (ya habilitada)
-- CREATE EXTENSION vector;

-- Agregar columna de embeddings a spells
ALTER TABLE spells
ADD COLUMN embedding vector(1536); -- OpenAI text-embedding-3-small

-- Índice para búsqueda rápida
CREATE INDEX ON spells
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

#### Generar Embeddings (Backend)
```typescript
// En scripts/generate-embeddings.ts
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(URL, KEY);

async function generateSpellEmbeddings() {
  const { data: spells } = await supabase
    .from('spells')
    .select('id, name, description, school, level');

  for (const spell of spells) {
    // Crear texto combinado
    const text = `${spell.name} (Nivel ${spell.level}, ${spell.school}): ${spell.description}`;

    // Generar embedding
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    const embedding = response.data[0].embedding;

    // Guardar en Supabase
    await supabase
      .from('spells')
      .update({ embedding })
      .eq('id', spell.id);
  }
}
```

#### Búsqueda de Similitud
```sql
-- Función para encontrar hechizos similares
CREATE OR REPLACE FUNCTION find_similar_spells(
  spell_id UUID,
  max_results INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  level INT,
  school TEXT,
  similarity FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.name,
    s.level,
    s.school,
    1 - (s.embedding <=> (SELECT embedding FROM spells WHERE id = spell_id)) as similarity
  FROM spells s
  WHERE s.id != spell_id
    AND s.embedding IS NOT NULL
  ORDER BY s.embedding <=> (SELECT embedding FROM spells WHERE id = spell_id)
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql;
```

#### Frontend
```typescript
// En página de detalle de conjuro
export default function SpellDetailPage({ params }: { params: { id: string } }) {
  const [similarSpells, setSimilarSpells] = useState([]);

  useEffect(() => {
    const loadSimilar = async () => {
      const { data } = await supabase
        .rpc('find_similar_spells', {
          spell_id: params.id,
          max_results: 5
        });

      setSimilarSpells(data);
    };

    loadSimilar();
  }, [params.id]);

  return (
    <div>
      {/* Contenido del conjuro */}

      <section>
        <h2>Conjuros Similares</h2>
        {similarSpells.map(spell => (
          <SpellCard key={spell.id} spell={spell} />
        ))}
      </section>
    </div>
  );
}
```

### 💰 Costos Estimados (OpenAI)
- **text-embedding-3-small**: $0.02 / 1M tokens
- **605 conjuros × ~200 tokens promedio** = 121,000 tokens = **$0.0024** (insignificante)
- **1,500 dotes × ~150 tokens** = 225,000 tokens = **$0.0045**
- **Total estimado**: < $0.01 (un centavo)

### ✅ Checklist de Implementación
- [ ] Configurar OpenAI API key
- [ ] Crear script de generación de embeddings
- [ ] Agregar columna `embedding vector(1536)` a tablas
- [ ] Crear índices ivfflat
- [ ] Generar embeddings para spells, feats, classes
- [ ] Crear funciones RPC de similitud
- [ ] Componente `<SimilarItems>` en páginas de detalle
- [ ] (Opcional) Búsqueda por descripción natural

---

## 3️⃣ Storage para Archivos (ALTA PRIORIDAD)

### 📚 Documentación
- https://supabase.com/docs/guides/storage

### 🎯 Beneficios para el Compendio
- **Imágenes de monstruos** (Monster Manual)
- **Iconos de clases/razas/escuelas de magia**
- **Mapas de dungeons** (para futuro VTT)
- **PDFs de referencia** (SRD, suplementos)
- **Avatares de usuarios**

### 🛠️ Implementación

#### Crear Buckets
```sql
-- Bucket público para iconos
INSERT INTO storage.buckets (id, name, public)
VALUES ('icons', 'icons', true);

-- Bucket privado para avatares
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', false);

-- Bucket público para imágenes de monstruos
INSERT INTO storage.buckets (id, name, public)
VALUES ('monsters', 'monsters', true);
```

#### RLS para Avatares
```sql
-- Usuarios pueden subir su propio avatar
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Usuarios pueden ver todos los avatares
CREATE POLICY "Avatars are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');
```

#### Frontend Upload
```typescript
// Componente de upload de avatar
async function uploadAvatar(file: File, userId: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) throw error;

  // Actualizar perfil con URL pública
  const { data: publicURL } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  await supabase
    .from('profiles')
    .update({ avatar_url: publicURL.publicUrl })
    .eq('id', userId);
}
```

### ✅ Checklist de Implementación
- [ ] Crear bucket `icons` (público)
- [ ] Crear bucket `avatars` (privado con RLS)
- [ ] Crear bucket `monsters` (público)
- [ ] Configurar RLS policies
- [ ] Componente `<AvatarUpload>`
- [ ] Subir iconos de clases (11 iconos)
- [ ] Subir iconos de escuelas de magia (8 iconos)
- [ ] Agregar `image_url` a tabla monsters

---

## 4️⃣ Realtime Subscriptions (BAJA PRIORIDAD)

### 📚 Documentación
- https://supabase.com/docs/guides/realtime

### 🎯 Beneficios para el Compendio
- **Colaboración en tiempo real** en hojas de personaje
- **Notificaciones** cuando tu reporte de feedback cambia de estado
- **Sincronización** de cambios entre pestañas/dispositivos

### 🛠️ Implementación

#### Suscripción a Cambios de Tickets
```typescript
// En /feedback page
useEffect(() => {
  const channel = supabase
    .channel('feedback-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'feedback_tickets',
        filter: `user_id=eq.${user.id}`,
      },
      (payload) => {
        console.log('Ticket actualizado:', payload.new);
        // Actualizar UI
        setMyTickets(prev =>
          prev.map(t => t.id === payload.new.id ? payload.new : t)
        );
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [user.id]);
```

### ✅ Checklist de Implementación
- [ ] Habilitar Realtime en tablas específicas
- [ ] Implementar suscripciones en feedback tickets
- [ ] Notificaciones toast cuando ticket se actualiza
- [ ] (Futuro) Colaboración en editor de personajes

---

## 5️⃣ Edge Functions (MEDIA PRIORIDAD)

### 📚 Documentación
- https://supabase.com/docs/guides/functions

### 🎯 Beneficios para el Compendio
- **Lógica compleja de D&D** ejecutada en el servidor
- **Calcular CR** (Challenge Rating) de encuentros
- **Generar NPCs** aleatorios
- **Validar builds** de personajes
- **Integraciones** con APIs externas

### 🛠️ Implementación

#### Función: Calcular Modificadores de Habilidad
```typescript
// supabase/functions/calculate-character-stats/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

interface CharacterInput {
  race: string;
  class: string;
  level: number;
  abilityScores: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
}

serve(async (req) => {
  const { race, class: charClass, level, abilityScores }: CharacterInput = await req.json();

  // Obtener modificadores raciales
  const { data: raceData } = await supabaseAdmin
    .from('races')
    .select('ability_modifiers')
    .eq('slug', race)
    .single();

  // Aplicar modificadores raciales
  const finalScores = {
    str: abilityScores.str + (raceData.ability_modifiers.str || 0),
    dex: abilityScores.dex + (raceData.ability_modifiers.dex || 0),
    // ... resto
  };

  // Calcular modificadores (score - 10) / 2
  const modifiers = Object.fromEntries(
    Object.entries(finalScores).map(([key, value]) =>
      [key, Math.floor((value - 10) / 2)]
    )
  );

  // Calcular BAB desde class_progression
  const { data: progression } = await supabaseAdmin
    .from('class_progression')
    .select('base_attack_bonus')
    .eq('class_slug', charClass)
    .eq('level', level)
    .single();

  return new Response(
    JSON.stringify({
      abilityScores: finalScores,
      modifiers,
      bab: progression.base_attack_bonus,
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
})
```

#### Uso en Frontend
```typescript
const { data, error } = await supabase.functions.invoke('calculate-character-stats', {
  body: {
    race: 'human',
    class: 'fighter',
    level: 5,
    abilityScores: { str: 16, dex: 14, con: 14, int: 10, wis: 12, cha: 8 }
  }
});

console.log(data);
// { abilityScores: {...}, modifiers: {...}, bab: "+5" }
```

### ✅ Checklist de Implementación
- [ ] Configurar Supabase CLI
- [ ] Crear función `calculate-character-stats`
- [ ] Crear función `generate-random-npc`
- [ ] Crear función `calculate-encounter-cr`
- [ ] Integrar en editor de personajes

---

## 6️⃣ Cron Jobs (BAJA PRIORIDAD)

### 📚 Documentación
- https://supabase.com/docs/guides/database/extensions/pg_cron

### ✅ Actualmente Implementado
- ✅ Recálculo de estadísticas de leaderboard (diario 3 AM UTC)
- ✅ Limpieza de sesiones expiradas (cada hora)
- ✅ Sincronización de niveles de usuarios (diario 4 AM UTC)

### 🎯 Futuras Tareas Automatizadas
- ⏳ **Backups automáticos** de datos críticos
- ⏳ **Notificaciones por email** de tickets resueltos
- ⏳ **Regeneración de embeddings** cuando se actualizan descripciones
- ⏳ **Limpieza de archivos** huérfanos en Storage

---

## 7️⃣ Funciones Avanzadas de PostgreSQL

### A. Materialized Views (Performance)
```sql
-- Vista materializada de estadísticas de conjuros
CREATE MATERIALIZED VIEW mv_spell_stats AS
SELECT
  school,
  level,
  COUNT(*) as spell_count,
  AVG(LENGTH(description)) as avg_description_length
FROM spells
GROUP BY school, level;

-- Refrescar cada noche
CREATE UNIQUE INDEX ON mv_spell_stats (school, level);
REFRESH MATERIALIZED VIEW CONCURRENTLY mv_spell_stats;
```

### B. Particionamiento (Escalabilidad)
```sql
-- Particionar feedback_tickets por fecha
CREATE TABLE feedback_tickets_2025 PARTITION OF feedback_tickets
FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
```

### C. Custom Aggregates
```sql
-- Agregado para calcular BAB total de multiclase
CREATE AGGREGATE sum_bab (text) (
  sfunc = concat_bab,
  stype = text,
  initcond = '+0'
);
```

---

## 🎯 Roadmap de Implementación Recomendado

### Fase 1: Búsqueda (Próximas 2 semanas)
1. ✅ Búsqueda fuzzy con pg_trgm (COMPLETADO)
2. ⏳ Full-Text Search multiidioma
3. ⏳ Página `/search` global
4. ⏳ Componente `<SearchBar>` en header

### Fase 2: Storage y Multimedia (Próximo mes)
1. ⏳ Buckets de Storage configurados
2. ⏳ Upload de avatares de usuario
3. ⏳ Iconos de clases/escuelas
4. ⏳ (Futuro) Imágenes de monstruos

### Fase 3: AI/Vectors (2-3 meses)
1. ⏳ Generar embeddings para spells
2. ⏳ Sección "Similares" en páginas de detalle
3. ⏳ Búsqueda por descripción natural
4. ⏳ Recomendaciones de builds

### Fase 4: Realtime y Edge (6+ meses)
1. ⏳ Notificaciones en tiempo real
2. ⏳ Edge Functions para lógica D&D
3. ⏳ Colaboración en hojas de personaje

---

## 📊 Priorización Final

| Feature | Prioridad | Esfuerzo | Impacto | ROI |
|---------|-----------|----------|---------|-----|
| **Full-Text Search** | 🔴 ALTA | Medio (1-2 días) | Alto | ⭐⭐⭐⭐⭐ |
| **Storage (avatares/iconos)** | 🔴 ALTA | Bajo (1 día) | Medio | ⭐⭐⭐⭐ |
| **AI Vectors (similitud)** | 🟡 MEDIA | Alto (3-4 días) | Alto | ⭐⭐⭐⭐ |
| **Edge Functions** | 🟡 MEDIA | Medio (2-3 días) | Medio | ⭐⭐⭐ |
| **Realtime** | 🟢 BAJA | Bajo (1 día) | Bajo | ⭐⭐ |

---

## 💡 Recursos Adicionales

- **Supabase AI Docs**: https://supabase.com/docs/guides/ai
- **pgvector Tutorial**: https://supabase.com/docs/guides/ai/vector-columns
- **Full-Text Search**: https://supabase.com/docs/guides/database/full-text-search
- **Storage Guide**: https://supabase.com/docs/guides/storage
- **Edge Functions**: https://supabase.com/docs/guides/functions

---

**✅ Siguiente paso recomendado:** Implementar Full-Text Search multiidioma (máximo ROI)

*Última actualización: 2025-11-15*
