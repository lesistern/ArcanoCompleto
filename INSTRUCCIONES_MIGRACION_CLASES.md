# Instrucciones para Migrar las 11 Clases Base a Supabase

## Archivos Generados

Se han creado los siguientes archivos:

### 1. Datos de Clases
**Ubicación:** `src/lib/data/3.5/classes-player-handbook.json`

Contiene las 11 clases base del Player's Handbook en formato JSON optimizado para Supabase:
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

### 2. Script de Migración
**Ubicación:** `scripts/migrate-classes.mjs`

Script Node.js que:
- Lee el archivo JSON
- Se conecta a Supabase
- Inserta/actualiza las clases en la tabla `classes`
- Muestra resumen de migración
- Verifica la inserción

### 3. Documentación Detallada
**Ubicación:** `CLASES_PLAYER_HANDBOOK.md`

Documentación completa en español con:
- Todas las estadísticas de cada clase
- Habilidades especiales detalladas por nivel
- Progresiones de BAB y salvaciones
- Competencias con armas y armaduras
- Información de lanzamiento de conjuros
- Roles de cada clase

---

## Pasos para Ejecutar la Migración

### Paso 1: Verificar Dependencias

Asegúrate de tener instalado `@supabase/supabase-js`:

```bash
npm install @supabase/supabase-js dotenv
```

### Paso 2: Configurar Variables de Entorno

Verifica que tu archivo `.env.local` contenga:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### Paso 3: Ejecutar el Script

Desde la raíz del proyecto:

```bash
cd dnd-compendium
node scripts/migrate-classes.mjs
```

### Paso 4: Verificar en Supabase

1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a "Table Editor"
4. Selecciona la tabla `classes`
5. Deberías ver las 11 clases insertadas

---

## Estructura de Datos

Cada clase tiene los siguientes campos:

```json
{
  "id": "barbarian",
  "name": "Bárbaro",
  "name_en": "Barbarian",
  "slug": "barbaro",
  "hit_die": "d12",
  "bab_progression": "good",
  "fortitude_save": "good",
  "reflex_save": "poor",
  "will_save": "poor",
  "skill_points_per_level": 4,
  "class_skills": ["Artesanía", "Escuchar", ...],
  "weapon_proficiencies": ["Todas las armas simples", ...],
  "armor_proficiencies": ["Armaduras ligeras", ...],
  "special_abilities": {
    "1": ["Furia 1/día", "Analfabetismo", ...],
    "2": ["Esquiva asombrosa"],
    ...
  },
  "spellcasting_ability": null,
  "description": "...",
  "role": "Striker",
  "source_book": "Player's Handbook",
  "source_page": 25,
  "class_type": "base"
}
```

---

## Campos de la Tabla `classes`

La tabla Supabase tiene estos campos:

- `id` (UUID) - Generado automáticamente
- `slug` (TEXT) - Identificador único (ej: "barbaro")
- `name` (TEXT) - Nombre en español (ej: "Bárbaro")
- `hit_die` (TEXT) - Dado de golpe (ej: "d12")
- `skill_points_per_level` (INTEGER) - Puntos de habilidad por nivel
- `class_skills` (TEXT[]) - Array de habilidades de clase
- `weapon_proficiencies` (TEXT[]) - Array de competencias con armas
- `armor_proficiencies` (TEXT[]) - Array de competencias con armaduras
- `bab_progression` (TEXT) - "poor", "medium", o "good"
- `fortitude_save` (TEXT) - "poor" o "good"
- `reflex_save` (TEXT) - "poor" o "good"
- `will_save` (TEXT) - "poor" o "good"
- `spellcasting_ability` (TEXT) - NULL, "Inteligencia", "Sabiduría", o "Carisma"
- `description` (TEXT) - Descripción de la clase
- `role` (TEXT) - "Striker", "Controller", "Leader", o "Defender"
- `source_book` (TEXT) - Libro fuente
- `source_page` (INTEGER) - Página del libro
- `class_type` (TEXT) - "base", "prestige", o "npc"

---

## Información Adicional Recopilada

El archivo `CLASES_PLAYER_HANDBOOK.md` contiene información detallada que NO está en el JSON actual pero que podría ser útil para futuras expansiones:

### Habilidades Especiales Detalladas
- Descripciones completas de cada habilidad
- Progresión exacta por nivel
- Mecánicas específicas (bonificadores, duraciones, usos/día)

### Información de Lanzamiento de Conjuros
- Tipo de lanzamiento (preparado vs espontáneo)
- Habilidad clave
- Nivel máximo de conjuros
- Mecánicas especiales

### Dotes Adicionales
- Niveles en que se obtienen
- Restricciones y opciones

---

## Próximos Pasos

Una vez migradas las clases base, considera:

1. **Crear tabla `class_features`** para almacenar habilidades especiales detalladas
2. **Poblar tabla `spells`** con los conjuros de cada clase
3. **Crear tabla `class_progression`** con la progresión nivel por nivel
4. **Migrar clases de prestigio** de otros libros
5. **Crear interfaces frontend** para mostrar esta información

---

## Troubleshooting

### Error: "duplicate key value violates unique constraint"
- Significa que las clases ya existen en la base de datos
- El script usa `upsert`, así que debería actualizar en vez de duplicar
- Verifica que no haya conflictos en los slugs

### Error: "relation classes does not exist"
- La tabla `classes` no existe en tu base de datos
- Ejecuta primero `apply-db-optimizations.sql` en Supabase SQL Editor

### Error: "NEXT_PUBLIC_SUPABASE_URL is not defined"
- Falta configurar las variables de entorno
- Verifica que `.env.local` existe y tiene las claves correctas

---

## Fuente de Datos

Toda la información fue extraída directamente de:
- **Sitio:** https://srd.dndtools.org/srd/classes/
- **Fecha:** 2025-01-14
- **Páginas consultadas:**
  - `/srd/classes/baseCore/barbarian.html`
  - `/srd/classes/baseCore/bard.html`
  - `/srd/classes/baseCore/cleric.html`
  - `/srd/classes/baseCore/druid.html`
  - `/srd/classes/baseCore/fighter.html`
  - `/srd/classes/baseCore/monk.html`
  - `/srd/classes/baseCore/paladin.html`
  - `/srd/classes/baseCore/ranger.html`
  - `/srd/classes/baseCore/rogue.html`
  - `/srd/classes/baseCore/sorcerer.html`
  - `/srd/classes/baseCore/wizard.html`

---

## Checklist de Migración

- [ ] Verificar dependencias instaladas
- [ ] Configurar `.env.local`
- [ ] Ejecutar `node scripts/migrate-classes.mjs`
- [ ] Verificar en Supabase que hay 11 clases
- [ ] Probar query: `SELECT name, hit_die, bab_progression FROM classes ORDER BY name`
- [ ] Actualizar `CLAUDE.md` marcando esta tarea como completada

---

**Fecha de creación:** 2025-01-14
**Proyecto:** D&D 3.5 Compendium
**Base de datos:** Supabase PostgreSQL
