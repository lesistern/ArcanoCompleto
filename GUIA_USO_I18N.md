# 🌍 Guía de Uso del Sistema Multiidioma

**Fecha:** 2025-11-14
**Estado:** ✅ Sistema completamente implementado y funcional

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Componentes Disponibles](#componentes-disponibles)
3. [Uso en Frontend](#uso-en-frontend)
4. [Consultas a la Base de Datos](#consultas-a-la-base-de-datos)
5. [Agregar Nuevo Contenido Traducible](#agregar-nuevo-contenido-traducible)
6. [Mejores Prácticas](#mejores-prácticas)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Introducción

El D&D 3.5 Compendium ahora soporta múltiples idiomas mediante un sistema de tablas de traducciones separadas. Este sistema permite:

- ✅ **2 idiomas activos**: Inglés y Español (100% traducido)
- ✅ **4 idiomas preparados**: Francés, Alemán, Portugués, Italiano
- ✅ **Fallback automático** a inglés si no existe traducción
- ✅ **Sistema de calidad** con estados (pending, reviewed, approved)
- ✅ **Preparado para contribuciones** comunitarias

### Contenido Disponible

| Tipo | Inglés | Español | Total |
|------|--------|---------|-------|
| **Hechizos** | 605 | 605 | 1,210 |
| **Clases** | 11 | 11 | 22 |
| **Razas** | 16 | 16 | 32 |
| **Dotes** | 34 | 34 | 68 |
| **Habilidades** | 43 | 43 | 86 |
| **Armas** | 72 | 72 | 144 |
| **TOTAL** | **781** | **781** | **1,562** |

---

## 🧩 Componentes Disponibles

### 1. `LanguageSelector`

Componente UI para cambiar el idioma de la aplicación.

**Ubicación:** `src/components/LanguageSelector.tsx`

**Características:**
- Dropdown con banderas y nombres de idiomas
- Persistencia en `localStorage`
- Recarga automática de página al cambiar idioma
- Soporte para móvil y escritorio

**Uso:**
```typescript
import { LanguageSelector } from '@/components/LanguageSelector';

export default function MyPage() {
  return (
    <div>
      <LanguageSelector />
    </div>
  );
}
```

**Dónde está integrado:**
- ✅ Header principal (desktop y móvil)
- ✅ Página de demo `/i18n-demo`

---

### 2. `useLocale` Hook

Hook para obtener el idioma actual del usuario.

**Ubicación:** `src/components/LanguageSelector.tsx` (exportado)

**Uso:**
```typescript
'use client';

import { useLocale } from '@/components/LanguageSelector';

export default function MyComponent() {
  const locale = useLocale(); // 'en' | 'es'

  return <p>Idioma actual: {locale}</p>;
}
```

**Nota:** Solo funciona en Client Components (requiere `'use client'`).

---

### 3. `useTranslatedContent` Hook

Hook para obtener contenido traducido con fallback automático.

**Ubicación:** `src/lib/hooks/useTranslatedContent.ts`

**Uso:**
```typescript
'use client';

import { useLocale } from '@/components/LanguageSelector';
import { useTranslatedContent } from '@/lib/hooks/useTranslatedContent';

interface MyTranslation {
  name: string;
  description: string;
}

export default function MyComponent() {
  const locale = useLocale();

  // Supongamos que tienes traducciones desde Supabase
  const translations = {
    en: { name: 'Fireball', description: 'A ball of fire...' },
    es: { name: 'Bola de fuego', description: 'Una bola de fuego...' }
  };

  const content = useTranslatedContent<MyTranslation>(translations, locale);

  if (!content) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{content.name}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

---

## 🎨 Uso en Frontend

### Ejemplo Completo: Página de Hechizo

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/components/LanguageSelector';
import { createClient } from '@/lib/supabase/client';

interface SpellTranslation {
  spell_id: string;
  language_code: string;
  name: string;
  description: string;
  school?: string;
  level?: number;
}

export default function SpellDetailPage({ params }: { params: { slug: string } }) {
  const locale = useLocale();
  const [spell, setSpell] = useState<SpellTranslation | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchSpell() {
      setLoading(true);

      // Intentar obtener en el idioma actual
      let { data } = await supabase
        .from('spell_translations')
        .select('*')
        .eq('spell_id', params.slug)
        .eq('language_code', locale)
        .single();

      // Si no existe, fallback a inglés
      if (!data) {
        const fallback = await supabase
          .from('spell_translations')
          .select('*')
          .eq('spell_id', params.slug)
          .eq('language_code', 'en')
          .single();
        data = fallback.data;
      }

      setSpell(data);
      setLoading(false);
    }

    fetchSpell();
  }, [locale, params.slug, supabase]);

  if (loading) return <div>Cargando...</div>;
  if (!spell) return <div>Hechizo no encontrado</div>;

  return (
    <div>
      <h1>{spell.name}</h1>
      <p>{spell.description}</p>
    </div>
  );
}
```

---

## 🗄️ Consultas a la Base de Datos

### Obtener Contenido en un Idioma Específico

```sql
-- Obtener hechizos en español
SELECT *
FROM spell_translations
WHERE language_code = 'es'
ORDER BY name;
```

### Usar la Función `get_translation()`

```sql
-- Obtener traducción de un hechizo con fallback
SELECT *
FROM get_translation(
  'spell_translations',
  'spell-id-aqui',
  'es',  -- idioma deseado
  'en'   -- idioma de fallback
);
```

### Vista `v_spells_with_translations`

```sql
-- Obtener hechizos con todas sus traducciones en JSONB
SELECT
  id,
  slug,
  translations->'es'->>'name' AS nombre_espanol,
  translations->'en'->>'name' AS nombre_ingles
FROM v_spells_with_translations
WHERE slug = 'fireball';
```

### Vista `v_translation_stats`

```sql
-- Ver estadísticas de traducción por idioma
SELECT *
FROM v_translation_stats
ORDER BY language_code;
```

---

## ➕ Agregar Nuevo Contenido Traducible

### Paso 1: Insertar el Contenido Original en Inglés

```sql
-- Ejemplo: Nuevo hechizo en la tabla principal
INSERT INTO spells (
  name, slug, school, level, description
) VALUES (
  'New Spell',
  'new-spell',
  'evocation',
  3,
  'Description in English...'
) RETURNING id;
```

### Paso 2: Insertar Traducción en Inglés

```sql
-- Traducción en inglés (aprobada)
INSERT INTO spell_translations (
  spell_id,
  language_code,
  name,
  description,
  translation_status
) VALUES (
  '<id-del-hechizo>',
  'en',
  'New Spell',
  'Description in English...',
  'approved'
);
```

### Paso 3: Insertar Traducción en Español

```sql
-- Traducción en español (pendiente de revisión)
INSERT INTO spell_translations (
  spell_id,
  language_code,
  name,
  description,
  translation_status
) VALUES (
  '<id-del-hechizo>',
  'es',
  'Hechizo Nuevo',
  'Descripción en español...',
  'pending'
);
```

### Paso 4 (Opcional): Marcar como Revisado

```sql
UPDATE spell_translations
SET
  translation_status = 'reviewed',
  translation_quality = 4,
  reviewed_by = '<user-id>'
WHERE spell_id = '<id-del-hechizo>'
  AND language_code = 'es';
```

---

## ✅ Mejores Prácticas

### 1. Siempre Incluir Traducción en Inglés

El inglés es el idioma base del sistema. **SIEMPRE** debe existir una traducción en inglés con `translation_status = 'approved'`.

### 2. Usar Estados de Traducción Correctamente

- **`pending`**: Traducción automática o sin revisar
- **`reviewed`**: Revisada por un humano
- **`approved`**: Aprobada como traducción oficial

### 3. Aprovechar el Fallback Automático

En lugar de manejar manualmente el fallback, usa:
- La función SQL `get_translation()`
- El hook `useTranslatedContent()` en React
- Siempre intenta idioma actual → fallback a inglés

### 4. Mantener Consistencia en Terminología

Usa el diccionario de términos oficiales en `scripts/dnd-terminology.mjs` para mantener consistencia:

```javascript
import { SPELL_TERMINOLOGY } from '@/scripts/dnd-terminology.mjs';

// Ejemplo: "saving throw" → "tirada de salvación"
const spanishTerm = SPELL_TERMINOLOGY['saving throw'];
```

### 5. Cachear Traducciones en el Frontend

Evita consultas repetidas usando `useMemo` o React Query:

```typescript
const translation = useMemo(() => {
  return useTranslatedContent(translations, locale);
}, [translations, locale]);
```

---

## 🔧 Troubleshooting

### Problema 1: El idioma no cambia al seleccionar

**Causa:** localStorage no se actualiza o componente no se recarga.

**Solución:**
```typescript
// Asegúrate de que LanguageSelector recarga la página
const handleLocaleChange = (locale: Locale) => {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  window.location.reload(); // Forzar recarga
};
```

---

### Problema 2: Traducciones no aparecen

**Causa 1:** No existe traducción en el idioma seleccionado.

**Solución:** Verificar en la base de datos:
```sql
SELECT COUNT(*)
FROM spell_translations
WHERE language_code = 'es';
```

**Causa 2:** La consulta no incluye fallback.

**Solución:** Usar la función `get_translation()` o implementar lógica de fallback:
```typescript
// Primero intentar idioma actual
let { data } = await supabase
  .from('spell_translations')
  .eq('language_code', locale)
  .single();

// Si no existe, fallback a inglés
if (!data) {
  const fallback = await supabase
    .from('spell_translations')
    .eq('language_code', 'en')
    .single();
  data = fallback.data;
}
```

---

### Problema 3: Error "localStorage is not defined"

**Causa:** Intentando acceder a `localStorage` en Server Component.

**Solución:** Asegúrate de que el componente sea Client Component:
```typescript
'use client'; // <- Agregar esta línea al inicio

import { useLocale } from '@/components/LanguageSelector';
```

---

### Problema 4: Traducciones de baja calidad

**Causa:** Las traducciones actuales son automáticas (word-by-word replacement).

**Solución:**
1. **Corto plazo:** Revisar manualmente traducciones importantes
2. **Mediano plazo:** Usar API de traducción profesional (DeepL, Google Translate)
3. **Largo plazo:** Extraer traducciones oficiales de PDFs en español

```sql
-- Marcar traducción para revisión
UPDATE spell_translations
SET translation_quality = 2 -- Baja calidad
WHERE language_code = 'es'
  AND translation_status = 'pending';
```

---

## 🚀 Próximos Pasos

### Inmediato
1. ✅ Sistema multiidioma implementado
2. ✅ LanguageSelector integrado en header
3. ⏳ Adaptar páginas existentes (`/conjuros/[slug]`, `/clases/[slug]`)

### Corto Plazo
4. Mejorar calidad de traducciones en español
5. Implementar sistema de contribuciones comunitarias
6. Activar idiomas adicionales (francés, alemán, etc.)

### Mediano Plazo
7. Extraer traducciones oficiales de PDFs en español
8. Implementar revisión colaborativa
9. Añadir badge de calidad en UI

---

## 📚 Recursos Adicionales

### Archivos Importantes

- **SQL Schema:** `supabase/create-translations-system.sql`
- **Migración:** `supabase/migrate-existing-content-to-translations.sql`
- **Traducción Automática:** `scripts/auto-translate-to-db.mjs`
- **Diccionario:** `scripts/dnd-terminology.mjs`
- **Documentación Completa:** `SISTEMA_MULTIIDIOMA.md`
- **Resumen de Sesión:** `RESUMEN_SESION_2025-11-14_MULTIIDIOMA.md`

### Comandos Útiles

```bash
# Ver estadísticas de traducción
node scripts/check-translation-stats.mjs

# Ver muestra de traducciones
node scripts/sample-translations.mjs

# Re-traducir todo al español (solo si es necesario)
node scripts/auto-translate-to-db.mjs
```

---

**Última actualización:** 2025-11-14
**Versión:** 1.0
**Estado:** Sistema completamente funcional ✅
