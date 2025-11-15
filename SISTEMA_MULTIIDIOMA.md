# 🌍 Sistema Multiidioma (i18n) - D&D 3.5 Compendium

## 📋 Visión General

Sistema de traducciones comunitario que permite que el compendio esté disponible en múltiples idiomas, con soporte para contribuciones de la comunidad.

---

## 🎯 Características

### ✅ Implementadas en Base de Datos
- **Múltiples idiomas**: inglés (en), español (es), francés (fr), alemán (de), portugués (pt), italiano (it)
- **Tablas de traducción** para todos los contenidos:
  - Spells (Conjuros)
  - Classes (Clases)
  - Races (Razas)
  - Feats (Dotes)
  - Skills (Habilidades)
  - Weapons (Armas)
- **Metadatos de traducción**:
  - Estado: pending, reviewed, approved
  - Calidad: 1-5 estrellas
  - Traductor y revisor (preparado para sistema de usuarios)
- **Fallback automático**: Si no existe traducción, muestra inglés
- **Vistas y funciones** optimizadas para consultas multiidioma
- **Estadísticas de progreso** por idioma

### ⏳ Pendientes (Frontend)
- Selector de idioma en el header
- Persistencia de idioma preferido (localStorage)
- Next.js i18n configuration
- Páginas traducidas dinámicamente
- Interfaz de contribución comunitaria

---

## 📁 Estructura de la Base de Datos

### Tabla Principal: `languages`
```sql
code          | VARCHAR(5)  | PRIMARY KEY
name          | TEXT        | Nombre en inglés
native_name   | TEXT        | Nombre nativo
is_active     | BOOLEAN     | Está activo
```

**Idiomas iniciales:**
- 🇬🇧 English (activo)
- 🇪🇸 Español (activo)
- 🇫🇷 Français (inactivo)
- 🇩🇪 Deutsch (inactivo)
- 🇵🇹 Português (inactivo)
- 🇮🇹 Italiano (inactivo)

### Tablas de Traducción

Todas siguen el mismo patrón:

```sql
{entity}_translations
  ├─ id                  UUID PRIMARY KEY
  ├─ {entity}_id         UUID REFERENCES {entity}(id)
  ├─ language_code       VARCHAR(5) REFERENCES languages(code)
  ├─ name                TEXT NOT NULL
  ├─ description         TEXT
  ├─ [campos específicos...]
  ├─ translated_by       UUID (futuro)
  ├─ reviewed_by         UUID (futuro)
  ├─ translation_status  VARCHAR(20)
  ├─ translation_quality INTEGER (1-5)
  ├─ created_at          TIMESTAMPTZ
  └─ updated_at          TIMESTAMPTZ

  UNIQUE(spell_id, language_code)
```

**Ejemplo: `spell_translations`**
- 605 hechizos × N idiomas
- Campos: name, description, casting_time, range_info, duration, etc.
- Estado: pending → reviewed → approved

---

## 🚀 Instalación

### Paso 1: Crear sistema de traducciones

```sql
-- Ejecutar en Supabase SQL Editor
-- Archivo: supabase/create-translations-system.sql
```

Este script crea:
- ✅ Tabla `languages` (6 idiomas)
- ✅ 6 tablas `*_translations` (spells, classes, races, feats, skills, weapons)
- ✅ Índices optimizados
- ✅ Función `get_translation()` con fallback
- ✅ Vista `v_spells_with_translations` (JSONB)
- ✅ Vista `v_translation_stats` (progreso por idioma)
- ✅ Triggers para actualizar timestamps
- ✅ Row Level Security (RLS) preparado

**Resultado esperado:**
```
✅ Sistema de traducciones creado
translation_tables: 6
active_languages: 2
```

### Paso 2: Migrar contenido existente (inglés)

```sql
-- Ejecutar DESPUÉS del Paso 1
-- Archivo: supabase/migrate-existing-content-to-translations.sql
```

Este script migra:
- ✅ 605 spells → `spell_translations` (en)
- ✅ 11 classes → `class_translations` (en)
- ✅ 16 races → `race_translations` (en)
- ✅ 34 feats → `feat_translations` (en)
- ✅ 43 skills → `skill_translations` (en)
- ✅ 72 weapons → `weapon_translations` (en)

**Total:** 781 traducciones base en inglés

---

## 🔄 Flujo de Traducción

### Opción 1: Traducción Automática (Inicial)

```bash
# 1. Exportar contenido para traducir
cd dnd-compendium
node scripts/translate-spells.mjs --export

# 2. Traducir automáticamente con terminología oficial
node scripts/auto-translate-spells.mjs

# 3. Importar traducciones a Supabase
node scripts/import-translations-to-db.mjs --language es
```

### Opción 2: Contribución Comunitaria (Futuro)

1. Usuario navega a `/contribute/translate`
2. Selecciona idioma y tipo de contenido
3. Sistema muestra items sin traducir o pendientes
4. Usuario ingresa traducción
5. Traducción guardada con estado `pending`
6. Moderador revisa → cambia a `reviewed`
7. Admin aprueba → cambia a `approved`

---

## 📊 Consultas Útiles

### Ver progreso de traducciones

```sql
SELECT * FROM v_translation_stats;
```

**Output:**
```
language_code | language_name | spells_translated | spells_percentage
en            | English       | 605               | 100.00
es            | Spanish       | 0                 | 0.00
```

### Obtener hechizo con traducción

```sql
-- Opción 1: Con fallback automático
SELECT * FROM get_translation('spells', 'spell-id-aqui', 'es', 'en');

-- Opción 2: Vista con todas las traducciones (JSONB)
SELECT * FROM v_spells_with_translations WHERE slug = 'fireball';
```

**Output (JSONB):**
```json
{
  "id": "...",
  "slug": "fireball",
  "translations": {
    "en": {
      "name": "Fireball",
      "description": "A fireball spell is an explosion...",
      "translation_status": "approved",
      "translation_quality": 5
    },
    "es": {
      "name": "Bola de Fuego",
      "description": "Un conjuro de bola de fuego es una explosión...",
      "translation_status": "pending",
      "translation_quality": null
    }
  }
}
```

### Listar contenido sin traducir

```sql
-- Hechizos sin traducción al español
SELECT s.slug, s.name
FROM spells s
LEFT JOIN spell_translations st ON s.id = st.spell_id AND st.language_code = 'es'
WHERE st.id IS NULL
ORDER BY s.name
LIMIT 20;
```

---

## 🎨 Implementación en Frontend (Next.js)

### Instalación de dependencias

```bash
npm install next-intl
```

### Configuración Next.js

```typescript
// next.config.mjs
const nextConfig = {
  i18n: {
    locales: ['en', 'es', 'fr', 'de', 'pt', 'it'],
    defaultLocale: 'en',
    localeDetection: true,
  },
};
```

### Hook para obtener traducciones

```typescript
// src/lib/hooks/useTranslatedContent.ts
import { useRouter } from 'next/router';

export function useTranslatedContent<T>(
  content: T,
  translations: Record<string, Partial<T>> | null
): T {
  const { locale } = useRouter();

  if (!translations || !translations[locale]) {
    return content; // Fallback al original
  }

  return {
    ...content,
    ...translations[locale],
  };
}
```

### Ejemplo de uso

```typescript
// src/app/conjuros/[slug]/page.tsx
import { useTranslatedContent } from '@/lib/hooks/useTranslatedContent';

export default function SpellPage({ spell, translations }) {
  const translated = useTranslatedContent(spell, translations);

  return (
    <div>
      <h1>{translated.name}</h1>
      <p>{translated.description}</p>
    </div>
  );
}
```

---

## 🔐 Seguridad (RLS)

### Lectura: Pública
Todos pueden ver las traducciones aprobadas.

```sql
-- Ya implementado
CREATE POLICY "Traducciones públicas para lectura"
  ON spell_translations FOR SELECT
  USING (true);
```

### Escritura: Usuarios autenticados (Futuro)

```sql
-- Cuando se implemente sistema de usuarios
CREATE POLICY "Usuarios autenticados pueden contribuir"
  ON spell_translations FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Solo el autor puede editar su traducción"
  ON spell_translations FOR UPDATE
  USING (translated_by = auth.uid());
```

---

## 📈 Métricas del Proyecto

### Estado Actual
- ✅ **Base de datos**: 100% implementado
- ✅ **Contenido base (inglés)**: 781 items migrados
- ⏳ **Traducción al español**: 0% (pendiente)
- ⏳ **Frontend i18n**: 0% (pendiente)
- ⏳ **Interfaz de contribución**: 0% (pendiente)

### Roadmap
1. **Fase 1**: ✅ Estructura de BD (COMPLETADO)
2. **Fase 2**: ⏳ Traducción automática al español (EN PROGRESO)
3. **Fase 3**: Implementar selector de idioma en frontend
4. **Fase 4**: Sistema de contribuciones comunitarias
5. **Fase 5**: Expansión a más idiomas

---

## 🛠️ Scripts Disponibles

### Traducción

```bash
# Exportar hechizos para traducir
node scripts/translate-spells.mjs --export

# Traducir automáticamente con terminología oficial
node scripts/auto-translate-spells.mjs

# Importar traducciones desde JSON
node scripts/import-translated-spells.mjs
```

### Verificación

```bash
# Ver estadísticas de traducción
node scripts/check-translation-stats.mjs

# Verificar calidad de traducciones
node scripts/validate-translations.mjs --language es
```

---

## 🤝 Contribuir

### Como Traductor

1. **Fork** el repositorio
2. **Exporta** contenido: `node scripts/export-to-translate.mjs --language es`
3. **Traduce** en el JSON generado
4. **Valida**: `node scripts/validate-translations.mjs`
5. **Pull Request** con tus traducciones

### Como Revisor

1. Revisar traducciones con estado `pending`
2. Verificar terminología oficial de D&D
3. Cambiar estado a `reviewed` o agregar comentarios
4. Asignar calidad (1-5 estrellas)

### Como Desarrollador

1. Implementar interfaz de contribución
2. Mejorar herramientas de traducción automática
3. Optimizar queries multiidioma
4. Crear tests de validación

---

## 📚 Referencias

- **Terminología oficial**: Player's Handbook (Devir Iberia, 2003)
- **Next.js i18n**: https://nextjs.org/docs/advanced-features/i18n-routing
- **Supabase RLS**: https://supabase.com/docs/guides/auth/row-level-security

---

## 🐛 Troubleshooting

### "No translation found"
- Verifica que exista traducción en `{entity}_translations`
- Revisa que `language_code` sea correcto
- Asegúrate de que el fallback a 'en' funcione

### Performance lento
- Usa la vista `v_spells_with_translations` (incluye JSONB con todos los idiomas)
- Implementa cache en el frontend
- Considera índices adicionales si hay muchas traducciones

---

**Última actualización:** 2025-11-14
**Estado:** Sistema implementado, listo para traducción al español
