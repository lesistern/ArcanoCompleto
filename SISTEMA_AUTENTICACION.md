# 🔐 Sistema de Autenticación y Perfiles de Usuario

**Fecha de implementación:** 2025-11-14
**Estado:** ✅ Backend y Frontend Completados

---

## 📋 Descripción General

Sistema completo de autenticación y gestión de perfiles de usuario integrado con Supabase Auth, incluyendo sistema de tiers, gamificación y panel de usuario con estadísticas detalladas.

---

## 🎯 Características Implementadas

### Backend (Supabase)
- ✅ **Sistema de Tiers** - 6 niveles de usuario (guest → admin)
- ✅ **Perfiles Extendidos** - Información pública y estadísticas
- ✅ **Traducciones Colaborativas** - Sistema de ediciones y votación
- ✅ **Gamificación** - Puntos de reputación y progresión
- ✅ **Row Level Security (RLS)** - Seguridad a nivel de fila
- ✅ **Triggers Automáticos** - Creación automática de perfiles

### Frontend (Next.js)
- ✅ **Hook useAuth** - Gestión centralizada de autenticación
- ✅ **Modal de Login/Signup** - Interfaz unificada de autenticación
- ✅ **Header con User Menu** - Navegación con estado de sesión
- ✅ **Página de Perfil** - Dashboard con estadísticas completas
- ✅ **Configuración de Perfil** - Edición de información personal

---

## 🗄️ Estructura de Base de Datos

### Tabla: `user_tiers`
Define los 6 niveles de permisos:

| Tier | Nombre | Permisos | Ediciones/día |
|------|--------|----------|---------------|
| `guest` | Invitado | Solo lectura | 0 |
| `user` | Usuario | Registrado básico | 0 |
| `contributor` | Colaborador | Puede sugerir | 10 |
| `translator` | Traductor | Puede editar y revisar | 50 |
| `reviewer` | Revisor | Puede aprobar | 100 |
| `admin` | Administrador | Acceso total | Ilimitado |

### Tabla: `public.profiles`
Perfil extendido de cada usuario:

```sql
- id (UUID) → FK a auth.users
- tier_code (VARCHAR) → FK a user_tiers
- display_name (TEXT) → Nombre público
- avatar_url (TEXT) → URL del avatar
- bio (TEXT) → Biografía
- preferred_language (VARCHAR) → Idioma preferido
- translations_submitted (INT) → Total de contribuciones
- translations_approved (INT) → Contribuciones aprobadas
- reviews_completed (INT) → Revisiones realizadas
- reputation_points (INT) → Puntos de reputación
- created_at, updated_at, last_active_at
```

### Tabla: `translation_edits`
Registro de todas las ediciones de traducción:

```sql
- id (UUID)
- entity_type (VARCHAR) → 'spell', 'class', 'race', etc.
- entity_id (UUID)
- language_code (VARCHAR) → FK a languages
- field_name (VARCHAR) → 'name', 'description', etc.
- old_value, new_value (TEXT)
- submitted_by (UUID) → FK a profiles
- status (VARCHAR) → 'pending', 'approved', 'rejected'
- reviewed_by (UUID)
- translation_method (VARCHAR) → 'manual', 'deepl', etc.
- confidence_score (DECIMAL)
```

### Tabla: `translation_votes`
Sistema de votación comunitaria:

```sql
- id (UUID)
- edit_id (UUID) → FK a translation_edits
- user_id (UUID) → FK a profiles
- vote (SMALLINT) → -1 o 1
- created_at
```

---

## 🚀 Configuración Inicial

### 1. Ejecutar SQL en Supabase

**IMPORTANTE:** Debes ejecutar manualmente el SQL en Supabase Dashboard.

1. Abre el SQL Editor en tu proyecto Supabase:
   ```
   https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql
   ```

2. Copia el contenido de este archivo:
   ```
   dnd-compendium/supabase/create-user-tiers-system-fixed.sql
   ```

3. Pega el SQL en el editor y ejecuta (Run)

4. Verifica que se crearon las tablas:
   ```sql
   SELECT table_name
   FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_name IN ('user_tiers', 'profiles', 'translation_edits', 'translation_votes', 'languages');
   ```

5. Verifica que se insertaron los tiers:
   ```sql
   SELECT code, name, can_translate, can_review, can_approve
   FROM user_tiers
   ORDER BY code;
   ```

   **Resultado esperado:** 6 filas (guest, user, contributor, translator, reviewer, admin)

### 2. Verificar Variables de Entorno

Asegúrate de que `.env.local` contiene:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### 3. Instalar Dependencias (si es necesario)

```bash
cd dnd-compendium
npm install @supabase/supabase-js
```

---

## 📂 Estructura de Archivos Creados

```
dnd-compendium/
├── src/
│   ├── hooks/
│   │   └── useAuth.ts                    # Hook de autenticación
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthModal.tsx             # Modal de Login/Signup
│   │   └── layout/
│   │       └── Header.tsx                # Header actualizado con menú de usuario
│   └── app/
│       └── profile/
│           ├── page.tsx                  # Página de perfil principal
│           └── settings/
│               └── page.tsx              # Configuración del perfil
├── supabase/
│   └── create-user-tiers-system-fixed.sql  # SQL del sistema completo
└── scripts/
    └── setup-user-system.mjs             # Script auxiliar (no funcional por limitación de Supabase)
```

---

## 🎨 Componentes Frontend

### 1. Hook `useAuth`

**Ubicación:** `src/hooks/useAuth.ts`

Proporciona acceso centralizado a:
- Estado de autenticación
- Información del usuario y perfil
- Tier y permisos
- Funciones de autenticación (signIn, signUp, signOut)
- Función de actualización de perfil

**Uso:**
```typescript
import { useAuth } from '@/hooks/useAuth';

export default function MyComponent() {
  const {
    user,              // Usuario de Supabase Auth
    profile,           // Perfil extendido
    tier,              // Tier del usuario
    loading,           // Estado de carga
    isAuthenticated,   // Booleano de autenticación
    canTranslate,      // Permiso de traducción
    canReview,         // Permiso de revisión
    canApprove,        // Permiso de aprobación
    signIn,            // Función de login
    signUp,            // Función de registro
    signOut,           // Función de logout
    updateProfile      // Función de actualización
  } = useAuth();

  // ...
}
```

### 2. Componente `AuthModal`

**Ubicación:** `src/components/auth/AuthModal.tsx`

Modal unificado para Login y Signup con:
- Formularios validados
- Cambio dinámico entre modos
- Mensajes de error y éxito
- Integración con useAuth

**Props:**
```typescript
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (email: string, password: string) => Promise<{ error: any }>;
  onSignUp: (email: string, password: string, displayName: string) => Promise<{ error: any }>;
}
```

### 3. Header Actualizado

**Ubicación:** `src/components/layout/Header.tsx`

- Botón "Iniciar Sesión" para usuarios no autenticados
- Avatar y menú desplegable para usuarios autenticados
- Muestra tier con código de colores
- Puntos de reputación
- Enlaces a perfil y configuración
- Botón de cerrar sesión

### 4. Página de Perfil

**Ubicación:** `src/app/profile/page.tsx`

Dashboard completo con:
- **Header con Avatar** - Avatar generado con inicial, tier con gradiente
- **Barra de Progreso** - Progreso al siguiente tier
- **Estadísticas Grid** (4 cards):
  - Total Contribuciones
  - Aprobadas
  - Tasa de Aprobación
  - Revisiones Completadas
- **Actividad Reciente** - Últimas 10 ediciones con estado
- **Biografía** - Si el usuario la ha configurado

### 5. Configuración de Perfil

**Ubicación:** `src/app/profile/settings/page.tsx`

Formulario de edición con:
- Email (solo lectura)
- Nombre de usuario
- Biografía (máx. 500 caracteres)
- Idioma preferido
- Mensajes de éxito/error
- Guardado optimista

---

## 🎮 Flujo de Usuario

### 1. Registro de Nuevo Usuario

1. Usuario hace clic en "Iniciar Sesión" en el Header
2. Modal se abre en modo "Crear Cuenta"
3. Usuario completa:
   - Nombre de usuario
   - Email
   - Contraseña
   - Confirmar contraseña
4. Sistema crea usuario en `auth.users`
5. **Trigger automático** crea perfil en `public.profiles` con tier `user`
6. Usuario recibe email de confirmación
7. Tras confirmar, puede iniciar sesión

### 2. Inicio de Sesión

1. Usuario hace clic en "Iniciar Sesión"
2. Modal se abre en modo "Iniciar Sesión"
3. Usuario ingresa email y contraseña
4. Sistema valida credenciales
5. Hook `useAuth` carga:
   - Datos del usuario
   - Perfil extendido
   - Tier y permisos
6. Header muestra avatar y menú de usuario
7. `last_active_at` se actualiza automáticamente

### 3. Navegación de Usuario Autenticado

- **Ver Perfil:** Click en avatar → "Mi Perfil" → `/profile`
- **Editar Perfil:** Desde perfil → "Editar Perfil" → `/profile/settings`
- **Contribuir:** Header → "Contribuir" → `/contribute/translate`
- **Cerrar Sesión:** Menú de usuario → "Cerrar Sesión"

---

## 🏆 Sistema de Gamificación

### Puntos de Reputación

| Acción | Puntos |
|--------|--------|
| Traducción aprobada | +10 |
| Revisión completada | +1 |
| Voto positivo recibido | +1 |
| Traducción rechazada | -5 |

### Progresión de Tiers

| Tier | Puntos Requeridos |
|------|-------------------|
| user | 0 |
| contributor | 10 |
| translator | 50 |
| reviewer | 200 |
| admin | Manual |

### Cálculo de Progreso

La barra de progreso en `/profile` muestra:
```
Progreso = (puntos_actuales / puntos_tier_siguiente) * 100
```

---

## 🔒 Seguridad (RLS)

### Políticas Implementadas

**Tabla `profiles`:**
- ✅ Todos pueden ver todos los perfiles (públicos)
- ✅ Solo puedes actualizar tu propio perfil
- ❌ No se permite eliminar perfiles (CASCADE desde auth.users)

**Tabla `translation_edits`:**
- ✅ Todos pueden ver todas las ediciones
- ✅ Solo usuarios con tier `translator+` pueden crear ediciones
- ✅ Solo puedes actualizar tus propias ediciones pendientes

**Tabla `translation_votes`:**
- ✅ Todos pueden ver los votos
- ✅ Solo usuarios autenticados pueden votar
- ✅ Un voto por usuario por edición (UNIQUE constraint)

---

## 🧪 Testing Manual

### Test 1: Registro de Usuario

```bash
# Iniciar servidor
npm run dev

# Navegar a http://localhost:3000
# 1. Click en "Iniciar Sesión"
# 2. Click en "¿No tienes cuenta? Regístrate"
# 3. Completar formulario:
#    - Nombre: TestUser
#    - Email: test@example.com
#    - Contraseña: test1234
#    - Confirmar: test1234
# 4. Click "Crear Cuenta"
# 5. Verificar mensaje de éxito
# 6. Revisar email para confirmación
```

**Verificación en Supabase:**
```sql
SELECT * FROM auth.users WHERE email = 'test@example.com';
SELECT * FROM public.profiles WHERE id = (SELECT id FROM auth.users WHERE email = 'test@example.com');
```

### Test 2: Actualización de Perfil

```bash
# Con usuario autenticado:
# 1. Click en avatar en Header
# 2. Click "Mi Perfil"
# 3. Click "Editar Perfil"
# 4. Modificar:
#    - Nombre: "Mi Nuevo Nombre"
#    - Bio: "Soy un aventurero de D&D 3.5"
#    - Idioma: Español
# 5. Click "Guardar Cambios"
# 6. Verificar mensaje de éxito
# 7. Volver a perfil y verificar cambios
```

### Test 3: Navegación Completa

```bash
# 1. Login exitoso
# 2. Ver nombre en Header
# 3. Click en avatar → ver menú desplegable con:
#    - Nombre y email
#    - Tier y puntos
#    - "Mi Perfil"
#    - "Configuración"
#    - "Cerrar Sesión"
# 4. Navegar a cada sección
# 5. Cerrar sesión
# 6. Verificar que vuelve a mostrar "Iniciar Sesión"
```

---

## 🐛 Troubleshooting

### Error: "relation 'profiles' does not exist"

**Causa:** No se ejecutó el SQL en Supabase

**Solución:**
1. Abrir SQL Editor en Supabase
2. Ejecutar `supabase/create-user-tiers-system-fixed.sql`
3. Verificar tablas creadas

### Error: "User already registered"

**Causa:** Email ya existe en `auth.users`

**Solución:**
- Usar otro email
- O eliminar usuario en Supabase Dashboard → Authentication → Users

### Error: "Cannot read properties of null (reading 'display_name')"

**Causa:** Perfil no creado automáticamente (trigger no funcionó)

**Solución:**
```sql
-- Verificar trigger existe
SELECT * FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- Crear perfil manualmente
INSERT INTO public.profiles (id, display_name, tier_code)
VALUES ('user_uuid', 'Nombre', 'user');
```

### Perfiles no se crean automáticamente

**Causa:** Trigger no tiene permisos o función incorrecta

**Solución:**
```sql
-- Re-crear función con permisos correctos
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, tier_code)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    'user'
  );
  RETURN NEW;
END;
$$;
```

---

## 📈 Próximas Mejoras

### Fase 2: Características Adicionales

- [ ] **Avatar Upload** - Subida de imágenes de perfil
- [ ] **OAuth Providers** - Login con Google, GitHub, Discord
- [ ] **Email Verification** - Flujo completo de verificación
- [ ] **Password Reset** - Recuperación de contraseña
- [ ] **Two-Factor Authentication (2FA)** - Seguridad adicional
- [ ] **Notificaciones** - Sistema de notificaciones en tiempo real
- [ ] **Badges y Logros** - Sistema de insignias
- [ ] **Leaderboard** - Tabla de clasificación de contribuidores

### Fase 3: Moderación

- [ ] **Panel de Admin** - Gestión de usuarios y contenido
- [ ] **Ban System** - Suspensión de usuarios
- [ ] **Report System** - Reportes de contenido inapropiado
- [ ] **Activity Log** - Registro de actividad administrativa

---

## 📝 Changelog

### 2025-11-14 - Implementación Inicial

**Backend:**
- ✅ Sistema de tiers de usuario (6 niveles)
- ✅ Tabla de perfiles extendidos
- ✅ Sistema de traducciones colaborativas
- ✅ Sistema de votación comunitaria
- ✅ Triggers automáticos
- ✅ Row Level Security (RLS)
- ✅ Funciones auxiliares

**Frontend:**
- ✅ Hook `useAuth` para gestión de sesión
- ✅ Modal de Login/Signup
- ✅ Header con menú de usuario
- ✅ Página de perfil con estadísticas
- ✅ Página de configuración de perfil

**Documentación:**
- ✅ Guía completa de uso
- ✅ Instrucciones de configuración
- ✅ Guía de troubleshooting

---

## 🔗 Enlaces Útiles

- **Supabase Dashboard:** https://supabase.com/dashboard/project/YOUR_PROJECT_ID
- **Supabase Auth Docs:** https://supabase.com/docs/guides/auth
- **Next.js Auth:** https://nextjs.org/docs/authentication
- **RLS Guide:** https://supabase.com/docs/guides/auth/row-level-security

---

**Última actualización:** 2025-11-14
**Autor:** Claude Code
**Estado:** ✅ Completado - Listo para usar
