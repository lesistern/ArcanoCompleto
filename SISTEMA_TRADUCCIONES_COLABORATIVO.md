# 🌍 Sistema de Traducciones Colaborativo

**Fecha:** 2025-11-14
**Estado:** ✅ Infraestructura completa implementada

---

## 🎯 Visión General

Sistema completo de traducciones con:
- ✅ **Traducción automática** con DeepL API (calidad profesional)
- ✅ **Sistema de tiers** de usuario (guest → admin)
- ✅ **Corrección colaborativa** por usuarios registrados
- ✅ **Workflow de revisión** (pending → approved)
- ✅ **Sistema de reputación** y gamificación

---

## 👥 Tiers de Usuario

### 1. Guest (Invitado)
- **Permisos:** Solo lectura
- **Límite:** 0 ediciones/día
- **Características:**
  - Ver contenido público
  - No puede contribuir

### 2. User (Usuario)
- **Permisos:** Solo lectura
- **Límite:** 0 ediciones/día
- **Requisitos:** Registro con email
- **Características:**
  - Ver contenido público
  - Votar ediciones de otros

### 3. Contributor (Colaborador)
- **Permisos:** Sugerir correcciones
- **Límite:** 10 ediciones/día
- **Requisitos:**
  - Usuario registrado
  - Email verificado
- **Características:**
  - Sugerir correcciones de traducciones
  - Las ediciones requieren aprobación
  - +5 puntos por edición aprobada

### 4. **Translator (Traductor)** ⭐
- **Permisos:** Editar traducciones directamente
- **Límite:** 50 ediciones/día
- **Requisitos:**
  - 10+ ediciones aprobadas como Contributor
  - Reputación 100+ puntos
- **Características:**
  - Editar descripciones de conjuros
  - Revisar sugerencias de Contributors
  - +10 puntos por edición aprobada
  - +5 puntos por revisión completada

### 5. Reviewer (Revisor)
- **Permisos:** Aprobar traducciones
- **Límite:** 100 ediciones/día
- **Requisitos:**
  - 50+ ediciones aprobadas como Translator
  - Reputación 500+ puntos
- **Características:**
  - Aprobar/rechazar ediciones
  - Marcar traducciones como oficiales
  - +15 puntos por aprobación
  - Puede dar feedback a traductores

### 6. Admin (Administrador)
- **Permisos:** Acceso completo
- **Límite:** Sin límite
- **Características:**
  - Gestionar usuarios y tiers
  - Aprobar cualquier traducción
  - Ejecutar traducción automática masiva
  - Ver estadísticas completas

---

## 🔄 Flujo de Traducción

### Opción 1: Traducción Automática (DeepL)

```
1. Admin ejecuta script de traducción
   ↓
2. DeepL traduce descripciones
   ↓
3. Se aplica glosario de términos D&D
   ↓
4. Traducciones guardadas en translation_edits
   (status: pending, method: deepl)
   ↓
5. Traductores revisan y aprueban
   ↓
6. Traducción se aplica a spell_translations
   (status: approved, quality: 4)
```

### Opción 2: Corrección Manual por Traductor

```
1. Traductor ve conjuro con traducción mala
   ↓
2. Hace clic en "Editar traducción"
   ↓
3. Corrige la descripción
   ↓
4. Guarda (se crea translation_edit)
   (status: pending, method: manual)
   ↓
5. Revisor aprueba la edición
   ↓
6. Traducción se actualiza
   (status: approved, quality: 5)
```

### Opción 3: Sugerencia por Contributor

```
1. Contributor encuentra error
   ↓
2. Sugiere corrección
   ↓
3. Se crea translation_edit
   (status: pending, method: community)
   ↓
4. Otros usuarios votan (+1 / -1)
   ↓
5. Si 5+ votos positivos → Auto-aprobada
   O Traductor/Revisor aprueba manualmente
   ↓
6. Traducción se actualiza
```

---

## 📊 Base de Datos

### Tablas Nuevas

#### `user_tiers`
```sql
code             VARCHAR(20) PK
name             TEXT
can_translate    BOOLEAN
can_review       BOOLEAN
can_approve      BOOLEAN
max_edits_per_day INTEGER
```

#### `user_profiles`
```sql
id                      UUID PK (FK → auth.users)
tier_code               VARCHAR(20) (FK → user_tiers)
display_name            TEXT
translations_submitted  INTEGER
translations_approved   INTEGER
reviews_completed       INTEGER
reputation_points       INTEGER
```

#### `translation_edits`
```sql
id                 UUID PK
entity_type        VARCHAR(50)  -- 'spell', 'class', etc.
entity_id          UUID
language_code      VARCHAR(5)
field_name         VARCHAR(50)  -- 'description', 'name', etc.
old_value          TEXT
new_value          TEXT
submitted_by       UUID (FK → user_profiles)
status             VARCHAR(20)  -- 'pending', 'approved', 'rejected'
translation_method VARCHAR(20)  -- 'manual', 'deepl', 'community'
confidence_score   DECIMAL(3,2) -- 0.00 a 1.00
reviewed_by        UUID
reviewed_at        TIMESTAMP
```

#### `translation_votes`
```sql
id         UUID PK
edit_id    UUID (FK → translation_edits)
user_id    UUID (FK → user_profiles)
vote       SMALLINT  -- -1 o 1
created_at TIMESTAMP
```

---

## 🚀 Uso del Sistema

### Para Administradores

#### 1. Ejecutar SQL de creación
```bash
# En Supabase SQL Editor
\i supabase/create-user-tiers-system.sql
```

#### 2. Configurar DeepL API
```bash
# En .env.local
DEEPL_API_KEY=tu_clave_aqui
```

Obtener clave gratuita (500,000 caracteres/mes):
→ https://www.deepl.com/pro-api

#### 3. Ejecutar traducción automática
```bash
node scripts/deepl-translate-spells.mjs
```

### Para Traductores

#### Ver ediciones pendientes
```sql
SELECT
  te.id,
  te.entity_type,
  sp.name AS spell_name,
  te.field_name,
  te.new_value,
  up.display_name AS submitted_by,
  te.submitted_at
FROM translation_edits te
LEFT JOIN spell_translations sp ON te.entity_id = sp.spell_id
  AND sp.language_code = 'en'
LEFT JOIN user_profiles up ON te.submitted_by = up.id
WHERE te.status = 'pending'
  AND te.language_code = 'es'
ORDER BY te.submitted_at DESC;
```

#### Aprobar una edición
```sql
SELECT approve_translation_edit(
  'edit-id-aqui',
  'user-id-del-revisor'
);
```

---

## 🎮 Sistema de Reputación

### Ganar Puntos

| Acción | Puntos |
|--------|--------|
| Edición aprobada (Contributor) | +5 |
| Edición aprobada (Translator) | +10 |
| Revisión completada | +5 |
| Edición alcanza 5+ votos positivos | +20 |
| Primera traducción aprobada | +50 (bonus) |

### Perder Puntos

| Acción | Puntos |
|--------|--------|
| Edición rechazada | -2 |
| Edición con 5+ votos negativos | -10 |
| Spam detectado | -50 |

### Ascender de Tier

```
User → Contributor: Automático al verificar email
Contributor → Translator: 10 ediciones aprobadas + 100 puntos
Translator → Reviewer: 50 ediciones aprobadas + 500 puntos
Reviewer → Admin: Promoción manual
```

---

## 📱 Interfaz de Usuario (Frontend)

### Página: `/contribute/translate`

**Vista para Contributor:**
```
┌─────────────────────────────────────────┐
│ 🌍 Ayuda a Traducir D&D 3.5            │
├─────────────────────────────────────────┤
│ Tu nivel: Contributor                   │
│ Reputación: 45 puntos                   │
│ Ediciones hoy: 3/10                     │
├─────────────────────────────────────────┤
│                                         │
│ Conjuros Pendientes de Revisión:       │
│                                         │
│ ┌─────────────────────────────────┐    │
│ │ Alarma                           │    │
│ │ Descripción actual:              │    │
│ │ "Alarm sounds a mental or..."    │    │
│ │                                   │    │
│ │ [Sugerir Corrección]             │    │
│ └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

**Vista para Translator:**
```
┌─────────────────────────────────────────┐
│ ⚡ Editor de Traducciones               │
├─────────────────────────────────────────┤
│ Flecha Ácida                            │
├─────────────────────────────────────────┤
│ Descripción (EN):                       │
│ A magical arrow of acid springs from... │
│                                         │
│ Descripción (ES): [Editable]           │
│ ┌─────────────────────────────────┐    │
│ │ Una flecha mágica de ácido...   │    │
│ │                                  │    │
│ │                                  │    │
│ └─────────────────────────────────┘    │
│                                         │
│ Método: ○ Manual  ○ DeepL  ● Mixto    │
│                                         │
│ [Guardar] [Vista Previa]               │
└─────────────────────────────────────────┘
```

---

## 📈 Estadísticas del Sistema

### Vista: `v_translation_stats`
```sql
SELECT * FROM v_translation_stats;

language_code | entity_type | pending_edits | approved_edits | contributors
--------------|-------------|---------------|----------------|-------------
es            | spell       | 45            | 510            | 12
es            | class       | 2             | 9              | 4
es            | race        | 1             | 15             | 3
```

### Vista: `v_top_contributors`
```sql
SELECT * FROM v_top_contributors LIMIT 10;

display_name   | tier_name  | translations_approved | reputation_points
---------------|------------|-----------------------|------------------
Usuario1       | Translator | 145                   | 1450
Usuario2       | Reviewer   | 98                    | 1200
Usuario3       | Translator | 67                    | 670
```

---

## 🔒 Seguridad

### Row Level Security (RLS)

Todas las tablas tienen RLS habilitado:

1. **user_profiles**
   - ✅ Todos pueden ver perfiles públicos
   - ✅ Solo el usuario puede editar su perfil

2. **translation_edits**
   - ✅ Todos pueden ver ediciones
   - ✅ Solo usuarios con `can_translate=true` pueden crear
   - ✅ Solo el autor puede editar sus ediciones pendientes

3. **translation_votes**
   - ✅ Todos pueden ver votos
   - ✅ Solo usuarios registrados pueden votar
   - ✅ Un voto por usuario por edición

---

## 💡 Mejores Prácticas

### Para Traductores

1. **Mantén la terminología oficial**
   - Consulta el glosario en `scripts/dnd-terminology.mjs`
   - Usa "conjuro" no "hechizo"
   - Usa "nivel de lanzador" no "nivel de conjurador"

2. **Revisa el contexto**
   - Lee la descripción completa en inglés
   - Verifica que tenga sentido en español
   - Mantén el tono formal del juego

3. **Usa el formato correcto**
   - Respeta mayúsculas en nombres propios
   - Mantén la estructura de párrafos
   - Conserva las referencias cruzadas

### Para Revisores

1. **Criterios de aprobación**
   - Gramática y ortografía correctas
   - Terminología D&D oficial
   - Coherencia con otras traducciones
   - Fidelidad al texto original

2. **Dar feedback constructivo**
   - Explica por qué rechazas una edición
   - Sugiere mejoras
   - Agradece las contribuciones

---

## 🎯 Roadmap

### Fase 1: MVP (Actual)
- ✅ Sistema de tiers implementado
- ✅ Traducción automática con DeepL configurada
- ✅ Base de datos con RLS
- ⏳ Frontend pendiente

### Fase 2: Interfaz de Usuario
- ⏳ Página `/contribute/translate`
- ⏳ Editor de traducciones para tier Translator
- ⏳ Sistema de votación
- ⏳ Dashboard de estadísticas

### Fase 3: Gamificación
- ⏳ Badges y logros
- ⏳ Leaderboard público
- ⏳ Challenges semanales
- ⏳ Sistema de menciones

### Fase 4: Expansión
- ⏳ Traducción de más idiomas (FR, DE, PT, IT)
- ⏳ API pública de traducciones
- ⏳ Integración con Discord
- ⏳ App móvil

---

## 📚 Archivos del Sistema

### SQL
- `supabase/create-user-tiers-system.sql` - Creación de tablas y funciones

### Scripts
- `scripts/deepl-translate-spells.mjs` - Traducción automática con DeepL
- `scripts/official-spell-translations.mjs` - Diccionario de traducciones oficiales
- `scripts/dnd-terminology.mjs` - Glosario de términos D&D

### Documentación
- `SISTEMA_TRADUCCIONES_COLABORATIVO.md` - Esta guía
- `TRADUCCIONES_OFICIALES_COMPLETADO.md` - Resumen de traducciones
- `GUIA_USO_I18N.md` - Guía de internacionalización

---

## 🤝 Contribuir

### ¿Quieres ser Traductor?

1. Regístrate en la plataforma
2. Verifica tu email
3. Haz 10 sugerencias de calidad como Contributor
4. ¡Ascenderás automáticamente a Translator!

### ¿Quieres ayudar con el código?

- GitHub: (pendiente)
- Discord: (pendiente)
- Email: (pendiente)

---

**Última actualización:** 2025-11-14
**Versión:** 1.0
**Estado:** Infraestructura completa, frontend pendiente
