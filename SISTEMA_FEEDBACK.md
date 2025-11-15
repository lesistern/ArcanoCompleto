# 📋 Sistema de Feedback para Beta Testers

**Última actualización:** 2025-11-15
**Estado:** ✅ Completamente implementado y funcional

---

## 📖 Índice

1. [Visión General](#-visión-general)
2. [Para Beta Testers](#-para-beta-testers)
3. [Para Administradores](#-para-administradores)
4. [Arquitectura Técnica](#-arquitectura-técnica)
5. [Base de Datos](#-base-de-datos)
6. [Componentes Frontend](#-componentes-frontend)
7. [Instalación y Configuración](#-instalación-y-configuración)
8. [Troubleshooting](#-troubleshooting)

---

## 🎯 Visión General

El **Sistema de Feedback** permite a los beta testers reportar problemas, bugs, errores de traducción y sugerencias de manera estructurada durante la fase de pruebas de **Arcano Completo**.

### Objetivos

- ✅ Capturar feedback de beta testers de manera organizada
- ✅ Categorizar problemas por tipo (bug, traducción, datos, UI, etc.)
- ✅ Priorizar tickets por severidad (baja, media, alta, crítica)
- ✅ Trackear estado de tickets (abierto, en progreso, resuelto)
- ✅ Proporcionar dashboard para administradores
- ✅ Mantener historial de todos los reportes

### Características Principales

- **Formulario de feedback** accesible desde botón flotante
- **Categorías específicas** para D&D (bugs, traducciones, datos, UI, rendimiento)
- **Sistema de prioridades** (baja, media, alta, crítica)
- **Historial personal** de tickets reportados
- **Panel de administración** con filtros y estadísticas
- **Captura automática** de contexto (URL, navegador)
- **Row Level Security** para protección de datos

---

## 👥 Para Beta Testers

### Cómo Reportar un Problema

#### 1. Acceso al Formulario

Hay dos formas de acceder al formulario de feedback:

**Opción A: Botón Flotante** (Recomendado)
- Busca el botón dorado en la esquina inferior derecha
- Haz clic en "Abrir Formulario"
- Serás redirigido a `/feedback`

**Opción B: URL Directa**
- Navega directamente a: `https://arcano-completo-tjz7.vercel.app/feedback`

#### 2. Completar el Formulario

**Título** (Requerido)
- Resumen breve del problema (máx. 200 caracteres)
- Ejemplos:
  - ✅ "Error al cargar tabla de progresión de Bárbaro"
  - ✅ "Traducción incorrecta de 'Fireball' como 'Llamarada'"
  - ❌ "No funciona" (muy vago)

**Categoría** (Requerido)
Selecciona la que mejor describa el problema:

- 🔴 **Bug / Error**: Funcionalidad rota o comportamiento inesperado
- 💡 **Nueva Funcionalidad**: Sugerencia de mejora o nueva feature
- 🌐 **Error de Traducción**: Traducción incorrecta o faltante
- 📊 **Error en Datos**: Estadísticas, descripciones o información incorrecta
- 🎨 **Problema de UI/Diseño**: Layout, colores, accesibilidad
- ⚡ **Rendimiento**: Página lenta, carga excesiva
- 💬 **Otro**: Cualquier otra cosa

**Prioridad** (Requerido)
Indica la severidad del problema:

- 🟢 **Baja**: Problema menor, no afecta uso
- 🔵 **Media**: Problema moderado, workaround disponible
- 🟠 **Alta**: Problema importante, dificulta uso
- 🔴 **Crítica**: Bloquea uso de la aplicación

**Descripción** (Requerido)
- Detalla el problema (máx. 2,000 caracteres)
- Incluye **pasos para reproducir** si es un bug
- Incluye **valor esperado vs valor actual**

**Ejemplo de descripción bien escrita:**

```
PASOS PARA REPRODUCIR:
1. Ir a /clases/barbaro
2. Scrollear hasta tabla de progresión
3. Observar nivel 5

RESULTADO ACTUAL:
BAB aparece como +4

RESULTADO ESPERADO:
BAB debería ser +5 (progresión buena)

NAVEGADOR: Chrome 120 en Windows 11
```

#### 3. Enviar y Dar Seguimiento

- Haz clic en **"Enviar Reporte"**
- Verás un mensaje de éxito
- El ticket aparecerá en **"Mis Reportes"** abajo del formulario
- Podrás ver el estado actualizado por los administradores

### Ver Mis Tickets

En la misma página `/feedback`, debajo del formulario, verás:

- **Lista de todos tus tickets** enviados
- **Estado actual**: Abierto, En Progreso, Resuelto, Cerrado
- **Fecha de creación**
- **Prioridad asignada**

### Estados de Tickets

- 🔵 **Abierto**: Recién creado, pendiente de revisión
- 🟡 **En Progreso**: El equipo está trabajando en ello
- 🟢 **Resuelto**: Problema solucionado
- ⚪ **Cerrado**: Ticket archivado
- 🔴 **No se Arreglará**: Problema fuera de alcance o WAI (Working As Intended)

---

## 👨‍💼 Para Administradores

### Acceso al Panel de Administración

1. Inicia sesión con cuenta de tier `admin`
2. Navega a: `https://arcano-completo-tjz7.vercel.app/admin/tickets`
3. El panel mostrará todos los tickets de todos los usuarios

### Dashboard de Estadísticas

El panel muestra métricas en tiempo real:

- **Total de tickets** creados
- **Tickets abiertos** (requieren atención)
- **Tickets en progreso** (siendo trabajados)
- **Tickets resueltos** (completados)
- **Tickets críticos** (máxima prioridad)

### Filtros Disponibles

**Por Categoría:**
- Todas
- Bug
- Feature
- Translation
- Data
- UI
- Performance
- Other

**Por Estado:**
- Todos
- Open
- In Progress
- Resolved
- Closed
- Won't Fix

**Por Prioridad:**
- Todas
- Low
- Medium
- High
- Critical

### Gestión de Tickets

#### Ver Detalles Completos

Haz clic en "Ver Detalles" en cualquier ticket para ver:

- Descripción completa
- URL de la página donde ocurrió
- Información del navegador
- Fecha de creación
- Email del usuario

#### Cambiar Estado

1. Haz clic en "Ver Detalles"
2. Selecciona nuevo estado del dropdown
3. Si resuelves, puedes añadir **Notas de Resolución**
4. Haz clic en "Actualizar Estado"
5. El ticket se actualizará automáticamente

**Notas de Resolución** (Opcionales)
- Explica cómo se solucionó el problema
- Referencia commits o PRs si aplica
- Ejemplo: "Corregido en commit abc123. El BAB ahora muestra +5 correctamente."

#### Workflow Recomendado

```
Nuevo Ticket
    ↓
[ABIERTO] → Revisar y validar
    ↓
[EN PROGRESO] → Trabajar en solución
    ↓
[RESUELTO] → Añadir notas de resolución
    ↓
[CERRADO] → Archivar (opcional)
```

**Casos especiales:**
- Marcar como **"No se Arreglará"** si:
  - Es comportamiento intencional (WAI)
  - Está fuera de alcance del proyecto
  - Es duplicado de otro ticket

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Backend**: Supabase (PostgreSQL + Row Level Security)
- **Auth**: Supabase Auth
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

### Flujo de Datos

```
Usuario Beta Tester
    ↓
[FeedbackButton] → Click
    ↓
[/feedback] → Formulario
    ↓
Supabase Auth → Verificar usuario
    ↓
[feedback_tickets] → INSERT
    ↓
RLS Policy → Validar permisos
    ↓
Base de Datos → Guardar ticket
    ↓
UI → Mostrar en "Mis Reportes"
```

```
Administrador
    ↓
[/admin/tickets] → Dashboard
    ↓
Supabase Auth → Verificar tier 'admin'
    ↓
RLS Policy → "Admins can view all tickets"
    ↓
[feedback_tickets] → SELECT * WHERE tier_code = 'admin'
    ↓
UI → Mostrar todos los tickets
    ↓
Administrador → Cambiar estado
    ↓
[feedback_tickets] → UPDATE status
    ↓
RLS Policy → "Admins can update all tickets"
    ↓
Base de Datos → Actualizar ticket
```

### Seguridad

**Row Level Security (RLS)**
- ✅ Usuarios solo ven sus propios tickets
- ✅ Admins ven todos los tickets
- ✅ Solo usuarios autenticados pueden crear tickets
- ✅ Solo admins pueden cambiar estado de tickets
- ✅ Políticas de UPDATE restringidas por tier

**Validación de Datos**
- ✅ Título no vacío (constraint SQL)
- ✅ Descripción no vacía (constraint SQL)
- ✅ Categoría debe ser ENUM válido
- ✅ Prioridad debe ser ENUM válido
- ✅ Estado debe ser ENUM válido

---

## 🗄️ Base de Datos

### Tablas Creadas

#### `feedback_tickets`

```sql
CREATE TABLE public.feedback_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Usuario
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,

  -- Contenido
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category feedback_category NOT NULL DEFAULT 'other',
  priority feedback_priority NOT NULL DEFAULT 'medium',
  status feedback_status NOT NULL DEFAULT 'open',

  -- Contexto técnico
  page_url TEXT,
  browser_info TEXT,
  screenshot_url TEXT,

  -- Gestión
  assigned_to UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### ENUMs Creados

#### `feedback_category`
```sql
CREATE TYPE feedback_category AS ENUM (
  'bug',           -- Error/Bug
  'feature',       -- Nueva funcionalidad
  'translation',   -- Error de traducción
  'data',          -- Error en datos
  'ui',            -- Problema de UI/diseño
  'performance',   -- Rendimiento
  'other'          -- Otro
);
```

#### `feedback_priority`
```sql
CREATE TYPE feedback_priority AS ENUM (
  'low',           -- Baja
  'medium',        -- Media
  'high',          -- Alta
  'critical'       -- Crítica
);
```

#### `feedback_status`
```sql
CREATE TYPE feedback_status AS ENUM (
  'open',          -- Abierto
  'in_progress',   -- En progreso
  'resolved',      -- Resuelto
  'closed',        -- Cerrado
  'wont_fix'       -- No se arreglará
);
```

### Índices

```sql
CREATE INDEX feedback_tickets_user_id_idx ON feedback_tickets(user_id);
CREATE INDEX feedback_tickets_status_idx ON feedback_tickets(status);
CREATE INDEX feedback_tickets_category_idx ON feedback_tickets(category);
CREATE INDEX feedback_tickets_priority_idx ON feedback_tickets(priority);
CREATE INDEX feedback_tickets_created_at_idx ON feedback_tickets(created_at DESC);
```

### Row Level Security Policies

#### Ver tickets propios
```sql
CREATE POLICY "Users can view own tickets"
  ON feedback_tickets
  FOR SELECT
  USING (auth.uid() = user_id);
```

#### Crear tickets
```sql
CREATE POLICY "Users can create tickets"
  ON feedback_tickets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### Admins ver todos
```sql
CREATE POLICY "Admins can view all tickets"
  ON feedback_tickets
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND tier_code = 'admin'
    )
  );
```

#### Admins actualizar todos
```sql
CREATE POLICY "Admins can update all tickets"
  ON feedback_tickets
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND tier_code = 'admin'
    )
  );
```

### Vistas Útiles

#### `v_open_tickets`
Tickets abiertos con info del usuario, ordenados por prioridad:

```sql
CREATE OR REPLACE VIEW v_open_tickets AS
SELECT
  ft.id,
  ft.title,
  ft.description,
  ft.category,
  ft.priority,
  ft.status,
  ft.page_url,
  ft.created_at,
  ft.user_email,
  p.display_name as user_name,
  p.tier_code as user_tier
FROM public.feedback_tickets ft
JOIN public.profiles p ON ft.user_id = p.id
WHERE ft.status IN ('open', 'in_progress')
ORDER BY
  CASE ft.priority
    WHEN 'critical' THEN 1
    WHEN 'high' THEN 2
    WHEN 'medium' THEN 3
    WHEN 'low' THEN 4
  END,
  ft.created_at DESC;
```

#### `v_ticket_stats`
Estadísticas agregadas de tickets:

```sql
CREATE OR REPLACE VIEW v_ticket_stats AS
SELECT
  COUNT(*) as total_tickets,
  COUNT(*) FILTER (WHERE status = 'open') as open_tickets,
  COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_tickets,
  COUNT(*) FILTER (WHERE status = 'resolved') as resolved_tickets,
  COUNT(*) FILTER (WHERE category = 'bug') as bug_reports,
  COUNT(*) FILTER (WHERE priority = 'critical') as critical_tickets
FROM public.feedback_tickets;
```

### Funciones Auxiliares

#### `close_ticket()`
```sql
CREATE OR REPLACE FUNCTION public.close_ticket(
  ticket_id UUID,
  notes TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.feedback_tickets
  SET
    status = 'resolved',
    resolved_at = NOW(),
    resolution_notes = notes
  WHERE id = ticket_id;
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Uso:**
```sql
SELECT public.close_ticket(
  'uuid-del-ticket',
  'Corregido en commit abc123'
);
```

---

## 🎨 Componentes Frontend

### Componentes Creados

#### 1. `/feedback/page.tsx`
**Página de feedback para usuarios**

**Ubicación**: `src/app/feedback/page.tsx`

**Características:**
- Formulario completo de feedback
- Selección visual de categoría (7 categorías con iconos)
- Selección visual de prioridad (4 niveles con colores)
- Textarea para descripción (2,000 caracteres)
- Lista de "Mis Reportes" con estado y fecha
- Mensajes de éxito/error
- Captura automática de `page_url` y `browser_info`

**Hooks usados:**
- `useState` para formulario y estado
- `useEffect` para cargar tickets al montar
- `useRouter` para navegación
- `createClient()` para Supabase

**TypeScript Interfaces:**
```typescript
type FeedbackCategory = 'bug' | 'feature' | 'translation' | 'data' | 'ui' | 'performance' | 'other';
type FeedbackPriority = 'low' | 'medium' | 'high' | 'critical';
type FeedbackStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'wont_fix';

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: FeedbackCategory;
  priority: FeedbackPriority;
  status: FeedbackStatus;
  page_url: string | null;
  created_at: string;
}
```

#### 2. `/admin/tickets/page.tsx`
**Panel de administración**

**Ubicación**: `src/app/admin/tickets/page.tsx`

**Características:**
- Dashboard con 5 estadísticas clave
- Filtros por categoría, estado y prioridad
- Lista completa de tickets con color coding
- Modal de detalles con información completa
- Selector de estado con actualización en tiempo real
- Campo de notas de resolución
- Verificación de permisos (solo tier 'admin')

**TypeScript Interfaces:**
```typescript
interface Ticket {
  id: string;
  user_id: string;
  user_email: string;
  title: string;
  description: string;
  category: FeedbackCategory;
  priority: FeedbackPriority;
  status: FeedbackStatus;
  page_url: string | null;
  browser_info: string | null;
  screenshot_url: string | null;
  assigned_to: string | null;
  resolved_at: string | null;
  resolution_notes: string | null;
  created_at: string;
  updated_at: string;
}
```

#### 3. `<FeedbackButton />`
**Botón flotante global**

**Ubicación**: `src/components/FeedbackButton.tsx`

**Características:**
- Botón flotante en esquina inferior derecha
- Visible solo para usuarios autenticados
- Dos estados: expandido y minimizado
- Redirige a `/feedback` al hacer clic
- Estilo consistente con tema dungeon (dorado/oscuro)
- Icono `MessageSquare` de Lucide React
- z-index alto para estar sobre todo
- Animaciones suaves con Tailwind

**Estilos aplicados:**
```css
- fixed bottom-6 right-6 z-50 (posicionamiento)
- bg-gold-600 hover:bg-gold-700 (colores)
- shadow-lg (sombra)
- transition-all duration-200 (animaciones)
- focus:ring-2 focus:ring-gold-500 (accesibilidad)
```

**Integrado en:** `src/app/layout.tsx` (aparece en todas las páginas)

---

## 🚀 Instalación y Configuración

### Prerequisitos

- ✅ Supabase project configurado
- ✅ Variables de entorno en `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
  ```
- ✅ Sistema de tiers de usuario instalado (tabla `user_tiers` y `profiles`)
- ✅ Tier `beta_tester` creado en `user_tiers`

### Paso 1: Ejecutar SQL en Supabase

1. Abre Supabase Dashboard → SQL Editor
2. Copia y pega el contenido de `supabase/create-feedback-system.sql`
3. Haz clic en "Run"
4. Verifica que se crearon:
   - 3 ENUMs: `feedback_category`, `feedback_priority`, `feedback_status`
   - 1 tabla: `feedback_tickets`
   - 5 índices
   - 6 políticas RLS
   - 2 vistas: `v_open_tickets`, `v_ticket_stats`
   - 2 funciones: `close_ticket()`, `assign_ticket()`

### Paso 2: Verificar Instalación

Ejecuta en SQL Editor:

```sql
-- Verificar tabla
SELECT COUNT(*) FROM public.feedback_tickets;
-- Debería retornar 0

-- Verificar categorías
SELECT enumlabel FROM pg_enum
JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
WHERE pg_type.typname = 'feedback_category';
-- Debería mostrar: bug, feature, translation, data, ui, performance, other

-- Verificar RLS habilitado
SELECT tablename, rowsecurity FROM pg_tables
WHERE tablename = 'feedback_tickets';
-- rowsecurity debería ser TRUE
```

### Paso 3: Commit y Deploy

Los archivos ya están creados:

```bash
# Ver cambios
git status

# Añadir archivos
git add .

# Commit
git commit -m "feat: Add complete feedback/ticket system for beta testers

- Add SQL schema for feedback_tickets table
- Add /feedback page for users to submit reports
- Add /admin/tickets dashboard for admins
- Add FeedbackButton floating component
- Add comprehensive documentation"

# Push
git push origin main
```

Vercel deployará automáticamente.

### Paso 4: Verificar en Producción

1. Accede a `/feedback` como beta tester
2. Crea un ticket de prueba
3. Verifica que aparece en "Mis Reportes"
4. Accede a `/admin/tickets` como admin
5. Verifica que aparece el ticket
6. Prueba cambiar el estado
7. Verifica que el botón flotante aparece en todas las páginas

---

## 🐛 Troubleshooting

### Problema: No veo el botón flotante

**Posibles causas:**
1. No estás autenticado → Inicia sesión primero
2. El componente no se renderizó → Revisa `src/app/layout.tsx`
3. z-index bajo → El botón usa `z-50`, aumenta si hay conflictos

**Solución:**
```typescript
// Verifica en layout.tsx que esté importado y renderizado
import FeedbackButton from "@/components/FeedbackButton";

// En el body:
<FeedbackButton />
```

### Problema: Error "Permission denied" al crear ticket

**Causa:** RLS policy bloqueando INSERT

**Solución:**
1. Verifica que estás autenticado
2. Ejecuta en SQL Editor:
```sql
-- Verificar política de INSERT
SELECT * FROM pg_policies
WHERE tablename = 'feedback_tickets' AND cmd = 'INSERT';
```
3. Si no existe, re-ejecuta `create-feedback-system.sql`

### Problema: No veo tickets en /admin/tickets

**Posibles causas:**
1. No tienes tier 'admin' → Verifica `SELECT tier_code FROM profiles WHERE id = auth.uid();`
2. RLS bloqueando SELECT → Verifica política "Admins can view all tickets"

**Solución:**
```sql
-- Verificar tier
SELECT id, email, tier_code FROM profiles
JOIN auth.users ON profiles.id = auth.users.id
WHERE auth.users.email = 'tu-email@example.com';

-- Si tier_code no es 'admin', actualizar:
UPDATE profiles
SET tier_code = 'admin'
WHERE id = 'tu-user-id';
```

### Problema: Error "relation feedback_tickets does not exist"

**Causa:** La tabla no fue creada

**Solución:**
1. Abre Supabase Dashboard → SQL Editor
2. Ejecuta `supabase/create-feedback-system.sql` completo
3. Verifica: `SELECT * FROM feedback_tickets;`

### Problema: Cambios no aparecen en Vercel

**Causa:** Archivos no pusheados a GitHub

**Solución:**
```bash
git status  # Ver archivos sin commit
git add .
git commit -m "Update feedback system"
git push origin main
```

Espera 1-2 minutos para re-deploy automático.

### Problema: Build error en Vercel

**Posibles causas:**
1. Imports incorrectos (case-sensitive)
2. TypeScript errors
3. Missing dependencies

**Solución:**
```bash
# Verificar build localmente
npm run build

# Si hay errores TypeScript, revisa:
# - Todos los imports usan nombres exactos (Button, Card, no button, card)
# - createClient, no createBrowserClient
# - Todas las interfaces están definidas
```

---

## 📊 Métricas y Monitoreo

### Queries Útiles para Admins

**Tickets por categoría:**
```sql
SELECT
  category,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE status = 'open') as open
FROM feedback_tickets
GROUP BY category
ORDER BY total DESC;
```

**Tickets por prioridad:**
```sql
SELECT
  priority,
  COUNT(*) as total
FROM feedback_tickets
GROUP BY priority
ORDER BY
  CASE priority
    WHEN 'critical' THEN 1
    WHEN 'high' THEN 2
    WHEN 'medium' THEN 3
    WHEN 'low' THEN 4
  END;
```

**Top usuarios reportando:**
```sql
SELECT
  user_email,
  COUNT(*) as tickets_submitted
FROM feedback_tickets
GROUP BY user_email
ORDER BY tickets_submitted DESC
LIMIT 10;
```

**Tiempo promedio de resolución:**
```sql
SELECT
  AVG(EXTRACT(EPOCH FROM (resolved_at - created_at)) / 3600) as avg_hours
FROM feedback_tickets
WHERE resolved_at IS NOT NULL;
```

---

## 🎯 Próximos Pasos

### Mejoras Futuras (Opcionales)

1. **Upload de Screenshots**
   - Integrar Supabase Storage
   - Añadir campo `screenshot_url`
   - Componente de drag & drop

2. **Asignación de Tickets**
   - Campo `assigned_to`
   - Selector de admins
   - Notificaciones por email

3. **Sistema de Comentarios**
   - Tabla `ticket_comments`
   - Conversación entre user y admin
   - Timeline de actividad

4. **Notificaciones**
   - Email al crear ticket
   - Email al cambiar estado
   - Notificaciones in-app

5. **Exportar Datos**
   - Export CSV de tickets
   - Reporte semanal/mensual
   - Analytics dashboard

6. **Votación de Features**
   - Usuarios votan +1 en features
   - Priorización por votos

---

## 📝 Changelog

### 2025-11-15 - Sistema Completo Implementado

**Backend:**
- ✅ Tabla `feedback_tickets` con ENUMs
- ✅ 6 políticas RLS (users + admins)
- ✅ 5 índices optimizados
- ✅ 2 vistas útiles
- ✅ 2 funciones auxiliares

**Frontend:**
- ✅ Página `/feedback` para usuarios
- ✅ Página `/admin/tickets` para admins
- ✅ Componente `<FeedbackButton />` flotante
- ✅ Integrado en layout global

**Documentación:**
- ✅ Guía completa para beta testers
- ✅ Guía completa para administradores
- ✅ Documentación técnica de arquitectura
- ✅ Troubleshooting y FAQ

**Estado:** Listo para producción ✅

---

## 📞 Soporte

Si encuentras problemas con el sistema de feedback:

1. Revisa esta documentación
2. Revisa [BETA_TESTERS_SETUP.md](./BETA_TESTERS_SETUP.md) para configuración de usuarios
3. Revisa logs de Supabase Dashboard
4. Contacta al administrador del proyecto

---

**Desarrollado para Arcano Completo - D&D 3.5 Compendium**
