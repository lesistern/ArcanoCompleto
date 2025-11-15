# 🚀 Sistema de Beta Testers - Guía Completa

Este documento explica cómo configurar y usar el sistema de Beta Testers para Arcano Completo (D&D 3.5 Compendium).

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Instalación](#instalación)
4. [Crear Usuarios Beta](#crear-usuarios-beta)
5. [Gestión de Usuarios](#gestión-de-usuarios)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Descripción General

El sistema de Beta Testers protege toda la aplicación detrás de una página de landing pública, permitiendo acceso solo a usuarios autenticados con tier `beta_tester` o superior.

### ✨ Características

- **Protección total**: Middleware de Next.js protege todas las rutas
- **Landing page público**: `/beta-landing` para no autenticados
- **Sistema de tiers**: Compatible con el sistema de permisos existente
- **Gestión automatizada**: Scripts para crear usuarios masivamente
- **Feedback de beta**: Página explica qué verificar (estabilidad, información, traducciones)

---

## 🏗️ Arquitectura del Sistema

### Componentes Creados

1. **SQL**: `supabase/add-beta-tester-tier.sql`
   - Añade tier `beta_tester` a tabla `user_tiers`
   - Funciones helper: `is_beta_tester()`, `assign_beta_tester()`

2. **Middleware**: `src/middleware.ts`
   - Verifica autenticación en TODAS las rutas (excepto públicas)
   - Verifica tier `beta_tester` o superior
   - Redirige a `/beta-landing` si no tiene acceso

3. **Página de Landing**: `src/app/beta-landing/page.tsx`
   - Formulario de login para beta testers
   - Explicación del programa de beta
   - Información sobre qué verificar

4. **Script de Creación**: `scripts/create-beta-users.mjs`
   - Crea usuarios en Supabase Auth
   - Asigna tier `beta_tester` automáticamente
   - Verifica y lista usuarios creados

### Rutas Públicas (Sin Protección)

- `/beta-landing` - Página de acceso
- `/api/auth/*` - Endpoints de autenticación
- `/_next/*` - Recursos estáticos de Next.js
- `/favicon.ico`, `/robots.txt`, `/sitemap.xml`

### Tiers con Acceso

Los siguientes tiers tienen acceso a la aplicación:

- `beta_tester` ✅ - Beta testers
- `contributor` ✅ - Contribuidores
- `translator` ✅ - Traductores
- `reviewer` ✅ - Revisores
- `admin` ✅ - Administradores

Tier `user` y `guest` **NO** tienen acceso.

---

## 🛠️ Instalación

### Paso 1: Ejecutar SQL en Supabase

1. Abre Supabase SQL Editor: https://supabase.com/dashboard
2. Selecciona tu proyecto: **dnd-35-compendium**
3. Copia el contenido de `supabase/add-beta-tester-tier.sql`
4. Ejecuta el script
5. Verifica la salida:

```sql
-- Deberías ver:
-- Tier beta_tester creado | beta_tester | Beta Tester | Usuario con acceso...
-- Beta testers actuales | 0
```

### Paso 2: Configurar Variables de Entorno

Verifica que `.env.local` tenga:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### Paso 3: Deploy a Vercel (Si Aplica)

Si ya deployaste a Vercel, el middleware funcionará automáticamente.

**NO** necesitas redeployar, el middleware se activa con el próximo push a GitHub.

---

## 👥 Crear Usuarios Beta

### Opción 1: Script Automático (Recomendado)

1. **Edita la lista de usuarios** en `scripts/create-beta-users.mjs`:

```javascript
const BETA_USERS = [
  {
    email: 'beta1@example.com',
    password: 'contraseña_segura_123',
    displayName: 'Juan Pérez'
  },
  {
    email: 'beta2@example.com',
    password: 'contraseña_segura_456',
    displayName: 'María García'
  },
  // Añade más usuarios aquí...
];
```

2. **Ejecuta el script**:

```bash
cd dnd-compendium
node scripts/create-beta-users.mjs
```

3. **Salida esperada**:

```
🚀 Iniciando creación de usuarios Beta Testers...

📊 Total usuarios a crear: 2

📝 Creando usuario: beta1@example.com
   ✓ Usuario creado en Auth (ID: abc-123)
   ✓ Tier 'beta_tester' asignado
   ✓ Perfil creado: { email: 'beta1@example.com', tier: 'beta_tester', ... }

📝 Creando usuario: beta2@example.com
   ✓ Usuario creado en Auth (ID: def-456)
   ✓ Tier 'beta_tester' asignado
   ✓ Perfil creado: { email: 'beta2@example.com', tier: 'beta_tester', ... }

============================================================
📊 RESUMEN
============================================================
✅ Usuarios creados: 2
⏭️  Usuarios existentes: 0
❌ Errores: 0
============================================================

📋 LISTA DE BETA TESTERS:
============================================================
┌─────────┬──────────────────────┬─────────────┬──────────────┬─────────────────────────┐
│ (index) │        email         │  tier_code  │ display_name │       created_at        │
├─────────┼──────────────────────┼─────────────┼──────────────┼─────────────────────────┤
│    0    │ 'beta1@example.com'  │'beta_tester'│ 'Juan Pérez' │ '2025-01-15T12:30:00Z' │
│    1    │ 'beta2@example.com'  │'beta_tester'│'María García'│ '2025-01-15T12:30:01Z' │
└─────────┴──────────────────────┴─────────────┴──────────────┴─────────────────────────┘

✅ Proceso completado
```

### Opción 2: Función SQL

En Supabase SQL Editor:

```sql
-- Asignar beta tester a usuario existente
SELECT public.assign_beta_tester('user@example.com');
```

### Opción 3: Update Manual

En Supabase SQL Editor:

```sql
UPDATE public.profiles
SET tier_code = 'beta_tester'
WHERE email = 'user@example.com';
```

---

## 🔧 Gestión de Usuarios

### Listar Beta Testers

```sql
SELECT email, tier_code, display_name, created_at
FROM public.profiles
WHERE tier_code = 'beta_tester'
ORDER BY created_at DESC;
```

### Verificar si un Usuario es Beta Tester

```sql
-- Por UUID
SELECT public.is_beta_tester('uuid-del-usuario');

-- Por email (primero obtener UUID)
SELECT id, email, tier_code
FROM public.profiles
WHERE email = 'user@example.com';
```

### Remover Acceso Beta

```sql
UPDATE public.profiles
SET tier_code = 'user'
WHERE email = 'user@example.com';
```

### Promover a Admin

```sql
UPDATE public.profiles
SET tier_code = 'admin'
WHERE email = 'admin@example.com';
```

---

## 🎮 Flujo de Usuario

### Usuario No Autenticado

1. Intenta acceder a cualquier página (ej: `/clases`)
2. Middleware detecta que no está autenticado
3. Redirige a `/beta-landing`
4. Ve explicación del programa de beta
5. Puede hacer login con credenciales de beta tester

### Usuario Autenticado (Sin Beta)

1. Tiene cuenta pero tier `user` o `guest`
2. Hace login exitosamente
3. Middleware detecta tier insuficiente
4. Redirige a `/beta-landing`
5. Ve mensaje: "Tu cuenta no tiene acceso a la beta"

### Beta Tester

1. Hace login en `/beta-landing`
2. Sistema verifica tier `beta_tester`
3. Redirige a `/` (página principal)
4. Tiene acceso completo a la aplicación
5. Ve badge "BETA TESTER" en el header (si implementado)

---

## 🐛 Troubleshooting

### Error: "supabaseUrl is required"

**Problema**: Falta configurar variables de entorno en Vercel

**Solución**:
1. Ve a Vercel Project Settings → Environment Variables
2. Añade las 3 variables (URL, ANON_KEY, SERVICE_ROLE_KEY)
3. Redeploy

### Error: "Tier beta_tester does not exist"

**Problema**: No se ejecutó el SQL `add-beta-tester-tier.sql`

**Solución**:
1. Abre Supabase SQL Editor
2. Ejecuta `supabase/add-beta-tester-tier.sql`
3. Verifica con: `SELECT * FROM user_tiers WHERE code = 'beta_tester';`

### Error: "Tu cuenta no tiene acceso a la beta"

**Problema**: Usuario existe pero no tiene tier correcto

**Solución**:
```sql
-- Verificar tier actual
SELECT email, tier_code FROM profiles WHERE email = 'user@example.com';

-- Asignar beta tester
UPDATE profiles SET tier_code = 'beta_tester' WHERE email = 'user@example.com';
```

### Error: "Error fetching profile"

**Problema**: Usuario existe en Auth pero no en tabla `profiles`

**Solución**:
```sql
-- Crear perfil manualmente
INSERT INTO public.profiles (id, email, tier_code, display_name)
VALUES (
  'uuid-del-usuario',
  'user@example.com',
  'beta_tester',
  'Nombre del Usuario'
);
```

### Loop de Redirección Infinito

**Problema**: Middleware redirige incorrectamente

**Solución**:
1. Verificar que `/beta-landing` esté en `publicPaths` del middleware
2. Verificar que usuario tenga tier correcto en BD
3. Revisar logs del navegador (F12 → Console)

---

## 📊 Monitoreo

### Ver Actividad de Beta Testers

```sql
SELECT
  p.email,
  p.display_name,
  p.tier_code,
  p.last_active_at,
  p.created_at
FROM public.profiles p
WHERE p.tier_code = 'beta_tester'
ORDER BY p.last_active_at DESC NULLS LAST;
```

### Estadísticas

```sql
-- Total de beta testers
SELECT COUNT(*) as total_beta_testers
FROM public.profiles
WHERE tier_code = 'beta_tester';

-- Beta testers activos última semana
SELECT COUNT(*) as active_last_week
FROM public.profiles
WHERE tier_code = 'beta_tester'
AND last_active_at > NOW() - INTERVAL '7 days';
```

---

## 🔐 Seguridad

### Buenas Prácticas

1. **Contraseñas Seguras**: Mínimo 12 caracteres para beta testers
2. **Limitar Invitaciones**: Solo crear usuarios que realmente van a participar
3. **Rotar Credenciales**: Cambiar contraseñas después de la beta
4. **Monitorear Accesos**: Revisar `last_active_at` regularmente
5. **RLS Habilitado**: Verificar que Row Level Security esté activo

### Verificar RLS

```sql
-- Ver policies de la tabla profiles
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```

---

## 📞 Soporte

### Recursos

- **Documentación Completa**: Ver archivos en `dnd-compendium/`
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Middleware**: https://nextjs.org/docs/app/building-your-application/routing/middleware

### Contacto

Para problemas o dudas sobre el sistema de beta testers, revisa:
1. Este archivo (`BETA_TESTERS_SETUP.md`)
2. Logs de Supabase Dashboard
3. Logs de Vercel Deployments

---

## ✅ Checklist de Implementación

Antes de lanzar la beta:

- [ ] Ejecutado `add-beta-tester-tier.sql` en Supabase
- [ ] Creados al menos 3 beta testers con el script
- [ ] Verificado login en `/beta-landing` funciona
- [ ] Verificado middleware bloquea usuarios sin tier
- [ ] Verificado usuarios beta tienen acceso completo
- [ ] Variables de entorno configuradas en Vercel (si aplica)
- [ ] Documentación compartida con beta testers
- [ ] Plan de feedback establecido (email, formulario, etc.)

---

**Última actualización:** 2025-01-15
**Versión:** 1.0
