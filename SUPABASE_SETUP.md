# 🗄️ Guía de Configuración de Supabase

## 📋 Pasos para Configurar Supabase

### 1. Crear Proyecto en Supabase ☁️

1. **Ir a [supabase.com](https://supabase.com)**
2. **Crear cuenta** (recomendado con GitHub)
3. **Click en "New Project"**
4. **Llenar datos del proyecto:**
   - **Organization**: Crear nueva o usar existente
   - **Name**: `dnd-35-compendium`
   - **Database Password**: Genera una segura y **guárdala**
   - **Region**: Elige la más cercana (ej: Europe West)
   - **Pricing Plan**: Free (500MB, perfecto para empezar)
5. **Click en "Create new project"**
6. **Esperar 2-3 minutos** mientras Supabase crea la BD

---

### 2. Obtener Credenciales 🔑

Una vez creado el proyecto:

1. **En el Dashboard**, ve a **Settings** (⚙️ en la barra lateral)
2. Click en **API**
3. **Copiar las siguientes credenciales:**

   - **Project URL**
     - Ejemplo: `https://abcdefghijklmnop.supabase.co`
   - **anon public** (API Key)
     - Es una clave larga como: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

### 3. Configurar Variables de Entorno 🔐

1. **En la raíz del proyecto**, crea el archivo `.env.local`:

```bash
# Copiar el archivo de ejemplo
cp .env.local.example .env.local
```

2. **Editar `.env.local`** y reemplazar con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

⚠️ **IMPORTANTE**: Nunca commitees el archivo `.env.local` a Git (ya está en `.gitignore`)

---

### 4. Crear el Esquema de Base de Datos 🏗️

1. **En el Dashboard de Supabase**, ve a **SQL Editor** (icono de base de datos)
2. Click en **"New query"**
3. **Copiar TODO el contenido** del archivo `supabase-schema.sql`
4. **Pegar en el editor SQL**
5. Click en **"Run"** (o presiona `Ctrl+Enter`)
6. **Verificar que no haya errores**

Esto creará:
- ✅ 10+ tablas (feats, skills, weapons, classes, races, spells, etc.)
- ✅ Índices para búsqueda rápida
- ✅ Fulltext search en español
- ✅ Row Level Security (RLS) para usuarios
- ✅ Triggers automáticos
- ✅ Función de búsqueda global

---

### 5. Verificar Instalación ✅

1. **En el Dashboard**, ve a **Table Editor**
2. Deberías ver las siguientes tablas en la barra lateral:
   - `feats`
   - `skills`
   - `weapons`
   - `classes`
   - `class_features`
   - `class_spells_per_day`
   - `races`
   - `racial_features`
   - `spells`
   - `spell_class_levels`
   - `user_favorites`
   - `user_lists`
   - `list_items`

---

### 6. Configurar Autenticación (Opcional) 👤

Si quieres habilitar login de usuarios:

1. **En el Dashboard**, ve a **Authentication** > **Providers**
2. **Habilitar providers que desees:**
   - Email (habilitado por defecto)
   - GitHub
   - Google
   - Discord

Para GitHub/Google:
1. Crear OAuth App en GitHub/Google
2. Copiar Client ID y Client Secret
3. Pegar en Supabase
4. Añadir callback URL: `https://tu-proyecto.supabase.co/auth/v1/callback`

---

## 🚀 Usar Supabase en el Código

### En Client Components (`'use client'`)

```typescript
'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function FeatsPage() {
  const [feats, setFeats] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    async function loadFeats() {
      const { data, error } = await supabase
        .from('feats')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error loading feats:', error);
      } else {
        setFeats(data);
      }
    }

    loadFeats();
  }, []);

  return (
    <div>
      {feats.map(feat => (
        <div key={feat.id}>{feat.name}</div>
      ))}
    </div>
  );
}
```

### En Server Components (por defecto)

```typescript
import { createClient } from '@/lib/supabase/server';

export default async function FeatsPage() {
  const supabase = await createClient();

  const { data: feats, error } = await supabase
    .from('feats')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error:', error);
    return <div>Error loading feats</div>;
  }

  return (
    <div>
      {feats.map(feat => (
        <div key={feat.id}>{feat.name}</div>
      ))}
    </div>
  );
}
```

### Búsqueda Global

```typescript
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

// Búsqueda en todas las tablas
const { data, error } = await supabase
  .rpc('search_all_content', { search_query: 'fireball' });

// Retorna:
// [
//   { item_type: 'spell', item_id: '...', name: 'Fireball', description: '...', rank: 0.95 },
//   { item_type: 'feat', item_id: '...', name: 'Greater Spell Focus (Evocation)', description: '...', rank: 0.42 },
// ]
```

### Filtros con Supabase

```typescript
// Filtrar dotes por categoría
const { data: combatFeats } = await supabase
  .from('feats')
  .select('*')
  .eq('category', 'Combate')
  .order('name');

// Filtrar armas por tipo y tamaño
const { data: mediumMartialWeapons } = await supabase
  .from('weapons')
  .select('*')
  .eq('weapon_type', 'marcial')
  .eq('size', 'Mediana')
  .eq('category', 'melee');

// Habilidades por atributo clave
const { data: dexSkills } = await supabase
  .from('skills')
  .select('*')
  .eq('key_ability', 'Destreza');
```

---

## 📊 Scripts de Migración de Datos

Voy a crear scripts para migrar tus datos actuales a Supabase.

**Próximos pasos:**
1. ✅ Migrar 34 dotes existentes
2. ✅ Migrar 43 habilidades existentes
3. ✅ Migrar 78 armas existentes

---

## 🔍 Herramientas Útiles

### Dashboard de Supabase
- **Table Editor**: Ver y editar datos directamente
- **SQL Editor**: Ejecutar queries SQL custom
- **API Docs**: Documentación auto-generada de tu API
- **Logs**: Ver errores y queries en tiempo real

### Extensión de VS Code
- Instalar: [Supabase](https://marketplace.visualstudio.com/items?itemName=Supabase.supabase-vscode)

---

## 🐛 Troubleshooting

### Error: "Invalid API key"
- ✅ Verifica que hayas copiado la **anon public** key (no la service_role)
- ✅ Revisa que no haya espacios extra en `.env.local`
- ✅ Reinicia el servidor de desarrollo: `npm run dev`

### Error: "relation does not exist"
- ✅ Verifica que ejecutaste `supabase-schema.sql` completo
- ✅ En Table Editor, verifica que las tablas existan

### Error: "Failed to fetch"
- ✅ Verifica que el proyecto esté activo en Supabase
- ✅ Revisa la URL del proyecto (debe ser `https://`)

### No se muestran datos
- ✅ Verifica en Table Editor que las tablas tengan datos
- ✅ Revisa la consola del navegador para errores
- ✅ En Dashboard > API > Logs, revisa los requests

---

## 📚 Recursos

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

## ✅ Checklist de Configuración

- [ ] Proyecto creado en Supabase
- [ ] Credenciales copiadas
- [ ] Archivo `.env.local` configurado
- [ ] Schema SQL ejecutado sin errores
- [ ] Tablas visibles en Table Editor
- [ ] Servidor de desarrollo reiniciado
- [ ] Primera query funciona correctamente

---

**¿Necesitas ayuda?** Revisa los logs en:
- Consola del navegador (F12)
- Terminal de Next.js
- Dashboard de Supabase > Logs
