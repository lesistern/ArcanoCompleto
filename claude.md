# D&D 3.5 Compendium - Documentación Completa para Claude

Este documento sirve como referencia completa del proyecto para futuras sesiones de desarrollo.

---

## 🚀 ÚLTIMA SESIÓN: Preparación para Deployment en Vercel (2025-01-14)

### ✅ Completado en esta sesión:

**1. Corrección de Errores TypeScript (8 errores)**
- ✅ Fixed missing properties en DnDClass (`classFeatures`, `levelProgression`, `source`)
- ✅ Fixed type assertions para `AbilityScore[]` y `SavingThrow[]`
- ✅ Fixed Button component prop "as" (removido)
- ✅ Fixed Size y CreatureType type assertions en páginas de razas
- ✅ Fixed `levelAdjustment` possibly undefined (3 instancias en BasicInfoSection)
- ✅ Fixed OAuthProvider type mismatch en AuthModal
- ✅ Fixed `useMergedContent` type assertion
- ✅ Fixed `getRaceBySlugBrowser` convertido a async/await

**2. Archivos de Deployment Creados**
- ✅ [.gitignore](d:\CalabozosYDragones\dnd-compendium\.gitignore) - Actualizado con exclusiones de `.env*` y `nul`
- ✅ [vercel.json](d:\CalabozosYDragones\dnd-compendium\vercel.json) - Configuración de Vercel con env variables
- ✅ [.env.example](d:\CalabozosYDragones\dnd-compendium\.env.example) - Template de variables de entorno
- ✅ [DEPLOY_VERCEL.md](d:\CalabozosYDragones\dnd-compendium\DEPLOY_VERCEL.md) - Guía completa paso a paso (400+ líneas)

**3. Build de Producción**
- ✅ Build exitoso: `npm run build` completa sin errores
- ✅ 214 páginas generadas (SSG + SSR):
  - 11 clases dinámicas
  - 16 razas dinámicas
  - 47 dotes estáticas
  - 43 habilidades estáticas
  - 73 objetos/armas estáticos
  - Páginas adicionales (home, editor, iconos, etc.)

**4. Git y GitHub**
- ✅ Repositorio Git inicializado
- ✅ Eliminados archivos problemáticos (`nul` - nombre reservado Windows)
- ✅ Configuración de usuario Git (`lesistern@gmail.com`)
- ✅ Commit inicial realizado (198 archivos, 113k+ insertions)
- ✅ Subido a GitHub: **https://github.com/lesistern/ArcanoCompleto**

**5. Estado Actual del Proyecto**
- ✅ **Código:** Listo para deployment
- ✅ **Build:** Completamente funcional
- ⏳ **Deployment en Vercel:** Pendiente (usuario configurando)
- ✅ **Documentación:** Completa y actualizada

### ⏳ Próximos Pasos INMEDIATOS:

1. **Configurar Variables de Entorno en Vercel:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. **Deploy en Vercel:**
   - Importar desde GitHub: `lesistern/ArcanoCompleto`
   - Configurar Root Directory: `dnd-compendium`
   - Deploy y verificar

3. **Post-Deployment:**
   - Configurar OAuth providers en Supabase (opcional)
   - Configurar dominio personalizado (opcional)
   - Monitorear logs y analytics

---

## 📋 Índice
1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Patrones y Convenciones](#patrones-y-convenciones)
5. [Componentes Principales](#componentes-principales)
6. [Datos y Tipos](#datos-y-tipos)
7. [Rutas Implementadas](#rutas-implementadas)
8. [Funcionalidades Completadas](#funcionalidades-completadas)
9. [Limitaciones Conocidas](#limitaciones-conocidas)
10. [Roadmap Futuro](#roadmap-futuro)

---

## Resumen del Proyecto

**Nombre:** D&D 3.5 Compendium (ArcanoCompleto)
**Descripción:** Aplicación web Next.js para consultar reglas, objetos, hechizos y personajes de Dungeons & Dragons 3.5 Edition en español
**Framework:** Next.js 15 (App Router)
**Lenguaje:** TypeScript
**Estilos:** Tailwind CSS
**Base de Datos:** Supabase (PostgreSQL)
**Autenticación:** Supabase Auth (OAuth + Magic Link + Password)
**Estado:** ✅ **LISTO PARA DEPLOYMENT** (Build completado, código en GitHub)
**Repositorio:** https://github.com/lesistern/ArcanoCompleto

### Objetivo
Crear un compendio digital completo y accesible del SRD (System Reference Document) de D&D 3.5, con interfaz temática medieval/fantasy, funcionalidades de búsqueda y filtrado avanzadas, sistema de autenticación completo, y editor de personajes interactivo.

---

## Estructura de Archivos

```
dnd-compendium/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Layout raíz con Header/Footer
│   │   ├── page.tsx                   # Página principal con cards de secciones
│   │   │
│   │   ├── dotes/                     # SECCIÓN COMPLETA ✅
│   │   │   ├── page.tsx               # Lista 34 dotes con filtros
│   │   │   └── [slug]/page.tsx        # Detalle individual de dote
│   │   │
│   │   ├── habilidades/               # SECCIÓN COMPLETA ✅
│   │   │   ├── page.tsx               # Lista 43 habilidades con filtros
│   │   │   └── [slug]/page.tsx        # Detalle individual de habilidad
│   │   │
│   │   ├── objetos/                   # PARCIALMENTE COMPLETO
│   │   │   ├── page.tsx               # Índice de categorías de objetos
│   │   │   ├── [slug]/page.tsx        # Detalle de objeto individual
│   │   │   ├── armas/                 # ✅ COMPLETO con filtros
│   │   │   │   └── page.tsx           # 78 armas con filtros múltiples
│   │   │   └── magicos/               # ⏳ Placeholder
│   │   │       └── page.tsx
│   │   │
│   │   ├── iconos/                    # SISTEMA DE REFERENCIA ✅
│   │   │   ├── page.tsx               # Índice con preview de Lucide
│   │   │   ├── lucide/                # 79 iconos organizados
│   │   │   │   └── page.tsx
│   │   │   ├── gameicons/             # Info sobre Game-icons.net
│   │   │   │   └── page.tsx
│   │   │   └── rpgawesome/            # Info sobre RPG Awesome
│   │   │       └── page.tsx
│   │   │
│   │   ├── clases/                    # ⏳ Placeholder
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   │
│   │   ├── razas/                     # ⏳ Placeholder
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   │
│   │   ├── 5e/page.tsx                # ⏳ Placeholder para D&D 5e
│   │   └── 5.5e/page.tsx              # ⏳ Placeholder para D&D 5.5e
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx             # Navegación principal
│   │   │   └── Footer.tsx             # Pie de página con créditos
│   │   │
│   │   ├── ui/                        # Componentes reutilizables
│   │   │   ├── Card.tsx               # Card con variantes
│   │   │   ├── Button.tsx             # Botón con variantes
│   │   │   └── Badge.tsx              # Badge para tags
│   │   │
│   │   ├── FeatCard.tsx               # Tarjeta para dotes
│   │   ├── SkillCard.tsx              # Tarjeta para habilidades
│   │   ├── ClassCard.tsx              # Tarjeta para clases (futuro)
│   │   └── RaceCard.tsx               # Tarjeta para razas (futuro)
│   │
│   └── lib/
│       └── types/
│           └── class.ts               # Tipos TypeScript
│
├── public/                            # Archivos estáticos
├── tailwind.config.ts                 # Configuración Tailwind custom
├── next.config.ts                     # Configuración Next.js
├── tsconfig.json                      # Configuración TypeScript
├── package.json                       # Dependencias
├── implementacion_plan.md             # Plan de implementación
├── WORKFLOW.md                        # Workflow de desarrollo
└── claude.md                          # Este documento
```

---

## Stack Tecnológico

### Core
- **Next.js 15.1.4** - Framework React con App Router
- **React 19** - Biblioteca UI
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 3.4** - Estilos utility-first

### Dependencias Principales
```json
{
  "dependencies": {
    "next": "^15.1.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.468.0"    // Iconos UI
  },
  "devDependencies": {
    "typescript": "^5",
    "tailwindcss": "^3.4.1",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "^15.1.4"
  }
}
```

### Configuración Tailwind

**Colores Custom (tailwind.config.ts):**
```javascript
colors: {
  dungeon: {
    50: '#f5f3f0',
    100: '#e8e4dd',
    200: '#d4ccc0',
    300: '#b8aa96',
    400: '#9d8a6d',
    500: '#8a7456',
    600: '#6f5d47',
    700: '#594a39',
    800: '#4a3f33',
    900: '#3f362d',
    950: '#221d18',
  },
  gold: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    950: '#422006',
  },
}
```

**Font Families:**
```javascript
fontFamily: {
  heading: ['"Cinzel Decorative"', 'serif'],
  body: ['"Merriweather"', 'serif'],
}
```

---

## Patrones y Convenciones

### 1. Estructura de Componentes

#### Server Components (por defecto)
```typescript
// Sin 'use client', usado para páginas estáticas
export default function Page() {
  return <div>...</div>
}
```

#### Client Components (cuando se necesita estado)
```typescript
'use client';

import { useState } from 'react';

export default function Page() {
  const [state, setState] = useState<Type>('initial');
  // ...
}
```

### 2. Patrón de Filtros

**Usado en:** Dotes, Habilidades, Armas

```typescript
'use client';

export default function FilteredListPage() {
  // 1. Estados de filtro
  const [selectedCategory, setSelectedCategory] = useState<'all' | Type>('all');

  // 2. Lógica de filtrado
  const filtered = items.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  // 3. UI de filtros (Card con selects)
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todos</option>
            {/* opciones */}
          </select>
        </CardContent>
      </Card>

      {/* Contador de resultados */}
      <p>{filtered.length} de {items.length} resultados</p>

      {/* Grid de resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => <ItemCard key={item.slug} item={item} />)}
      </div>
    </div>
  );
}
```

### 3. Páginas de Detalle Dinámicas

**Pattern con Next.js 15:**
```typescript
// app/seccion/[slug]/page.tsx
export default async function DetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const item = items.find(i => i.slug === slug);

  if (!item) {
    return <div>No encontrado</div>;
  }

  return <div>{/* Detalle del item */}</div>;
}
```

### 4. Datos Embebidos vs Externos

**Actualmente:** Datos embebidos en componentes
```typescript
const feats = [
  {
    name: 'Alerta',
    slug: 'alerta',
    category: 'General',
    // ...
  },
  // ...
];
```

**Consideración futura:** Migrar a archivos separados
```typescript
// src/data/feats.ts
export const feats: Feat[] = [/* ... */];
```

### 5. Limitación de Tailwind: Clases Dinámicas

**❌ NO FUNCIONA:**
```typescript
const color = 'blue';
const className = `bg-${color}-500`; // No generará la clase
```

**✅ SOLUCIÓN:**
```typescript
// Definir todas las clases completas explícitamente
if (type === 'A') {
  className = 'bg-blue-500/20 border-blue-500/30';
} else if (type === 'B') {
  className = 'bg-red-500/20 border-red-500/30';
}
```

### 6. Organización de Rutas

**Convención:**
- Nombres en español para URLs (e.g., `/dotes`, `/habilidades`)
- Slugs en minúsculas con guiones (e.g., `alerta`, `ataque-poderoso`)
- Subdirectorios para categorías (`/objetos/armas`, `/objetos/magicos`)

---

## Componentes Principales

### Layout (`src/app/layout.tsx`)
```typescript
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Merriweather, Cinzel_Decorative } from 'next/font/google';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-dungeon-950 text-dungeon-100">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### Header (`src/components/layout/Header.tsx`)
- Navegación principal sticky
- Logo "D&D 3.5 Compendium"
- Links a: Inicio, Dotes, Habilidades, Objetos, Clases, Razas
- Responsive con menú hamburguesa (TODO)

### Card Component (`src/components/ui/Card.tsx`)
```typescript
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={`bg-dungeon-900 border border-dungeon-700 rounded-lg ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="p-6 pb-4">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-6 pt-0">{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-heading font-bold text-dungeon-100">{children}</h3>;
}
```

### Button Component (`src/components/ui/Button.tsx`)
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded font-semibold transition-colors';

  const variants = {
    primary: 'bg-gold-500 text-dungeon-950 hover:bg-gold-600',
    secondary: 'bg-dungeon-700 text-dungeon-100 hover:bg-dungeon-600',
    ghost: 'text-dungeon-400 hover:text-dungeon-200',
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

---

## Datos y Tipos

### Feat (Dote)
```typescript
interface Feat {
  name: string;
  slug: string;
  category: 'General' | 'Combate' | 'Creación de objetos' | 'Metamágica' | 'Especial';
  prerequisites?: string;
  benefit: string;
  special?: string;
}
```

### Skill (Habilidad)
```typescript
interface Skill {
  name: string;
  slug: string;
  keyAbility: 'Fuerza' | 'Destreza' | 'Constitución' | 'Inteligencia' | 'Sabiduría' | 'Carisma';
  trained: boolean;
  armorPenalty: boolean;
  description: string;
  check?: string;
  action?: string;
  retry?: string;
  special?: string;
  synergy?: string;
  untrained?: string;
}
```

### Weapon (Arma)
```typescript
interface Weapon {
  name: string;
  slug: string;
  weaponType: string; // "Armas simples cuerpo a cuerpo", etc.
  size: 'Diminuta' | 'Pequeña' | 'Mediana' | 'Grande';
  stats: {
    cost: string;
    damage: string;
    critical: string;
    range?: string;
    weight: string;
    damageType: string[]; // ['Perforante'], ['Cortante', 'Perforante'], etc.
  };
  description?: string;
}
```

**Ejemplo de arma con daño múltiple:**
```typescript
{
  name: 'Lucero del alba',
  slug: 'lucero-del-alba',
  weaponType: 'Armas marciales cuerpo a cuerpo',
  size: 'Mediana',
  stats: {
    cost: '8 po',
    damage: '1d8',
    critical: '×2',
    weight: '6 lb.',
    damageType: ['Contundente', 'Perforante'], // "y" - ambos simultáneamente
  }
}

{
  name: 'Mangual ligero',
  slug: 'mangual-ligero',
  weaponType: 'Armas marciales cuerpo a cuerpo',
  size: 'Mediana',
  stats: {
    cost: '8 po',
    damage: '1d8',
    critical: '×2',
    weight: '5 lb.',
    damageType: ['Contundente', 'Perforante'], // "o" - uno u otro
  }
}
```

---

## Rutas Implementadas

### Páginas Funcionales ✅

| Ruta | Descripción | Estado |
|------|-------------|--------|
| `/` | Página principal con cards de secciones | ✅ |
| `/dotes` | Lista de 34 dotes con filtros | ✅ |
| `/dotes/[slug]` | Detalle de dote individual | ✅ |
| `/habilidades` | Lista de 43 habilidades con filtros | ✅ |
| `/habilidades/[slug]` | Detalle de habilidad individual | ✅ |
| `/objetos` | Índice de categorías de objetos | ✅ |
| `/objetos/armas` | Lista de 78 armas con filtros múltiples | ✅ |
| `/objetos/[slug]` | Detalle de arma/objeto individual | ✅ |
| `/iconos` | Índice de bibliotecas de iconos | ✅ |
| `/iconos/lucide` | Galería de 79 iconos Lucide | ✅ |
| `/iconos/gameicons` | Info sobre Game-icons.net | ✅ |
| `/iconos/rpgawesome` | Info sobre RPG Awesome | ✅ |

### Páginas Placeholder ⏳

| Ruta | Estado |
|------|--------|
| `/clases` | ⏳ Placeholder |
| `/clases/[slug]` | ⏳ Placeholder |
| `/razas` | ⏳ Placeholder |
| `/razas/[slug]` | ⏳ Placeholder |
| `/objetos/magicos` | ⏳ Placeholder |
| `/5e` | ⏳ Placeholder |
| `/5.5e` | ⏳ Placeholder |

---

## Funcionalidades Completadas

### 1. Sistema de Filtros para Armas

**Ubicación:** `src/app/objetos/armas/page.tsx`

**Filtros Implementados:**
```typescript
const [selectedWeaponType, setSelectedWeaponType] = useState<'all' | 'simple' | 'marcial' | 'exótica'>('all');
const [selectedCategory, setSelectedCategory] = useState<'all' | 'melee' | 'ranged'>('all');
const [selectedDamageType, setSelectedDamageType] = useState<'all' | 'Perforante' | 'Cortante' | 'Contundente'>('all');
const [selectedSize, setSelectedSize] = useState<'all' | 'Diminuta' | 'Pequeña' | 'Mediana' | 'Grande'>('all');
```

**Lógica de Filtrado:**
```typescript
const mundaneWeapons = allMundaneWeapons.filter(weapon => {
  // Filtro por tipo de arma
  if (selectedWeaponType !== 'all') {
    if (!weapon.weaponType.toLowerCase().includes(selectedWeaponType)) return false;
  }

  // Filtro por categoría melee/ranged
  if (selectedCategory !== 'all') {
    const isMelee = weapon.weaponType.includes('cuerpo a cuerpo');
    const isRanged = weapon.weaponType.includes('distancia');
    if (selectedCategory === 'melee' && !isMelee) return false;
    if (selectedCategory === 'ranged' && !isRanged) return false;
  }

  // Filtro por tipo de daño
  if (selectedDamageType !== 'all') {
    if (!weapon.stats.damageType.includes(selectedDamageType)) return false;
  }

  // Filtro por tamaño
  if (selectedSize !== 'all') {
    if (weapon.size !== selectedSize) return false;
  }

  return true;
});
```

**Contador de Resultados:**
```typescript
<p className="text-sm text-dungeon-400">
  Mostrando {mundaneWeapons.length} de {allMundaneWeapons.length} armas
</p>
```

### 2. Sistema Visual de Tipos de Daño

**Armas "A y B" (daño simultáneo - ej: Lucero del alba):**
- Badge con gradiente diagonal
- Separador "/" entre tipos
- Sin texto "y"

```typescript
// Ejemplo: Contundente Y Perforante
<span className="bg-gradient-to-br from-blue-500/20 to-green-500/20 border border-blue-500/30">
  <span className="text-blue-400">C</span>
  <span className="text-dungeon-400">/</span>
  <span className="text-green-400">P</span>
</span>
```

**Armas "A o B" (daño alternativo):**
- Dos badges separados
- Sin texto "o"
- Espacio gap-1 entre badges

```typescript
// Ejemplo: Contundente O Perforante
<div className="flex items-center gap-1">
  <span className="bg-blue-500/20 border-blue-500/30 text-blue-400">C</span>
  <span className="bg-green-500/20 border-green-500/30 text-green-400">P</span>
</div>
```

**Página de Detalle:**
- Muestra texto "y" u "o" entre badges
- Implementación mediante lista conocida de armas

```typescript
const andWeapons = ['lucero del alba', 'guadaña'];
const isAnd = andWeapons.some(name => itemData.name.toLowerCase().includes(name));

{damageTypes.map((type, idx) => (
  <>
    {idx > 0 && (
      <span className="text-sm text-dungeon-400 mx-1">
        {isAnd ? 'y' : 'o'}
      </span>
    )}
    <Badge>{type}</Badge>
  </>
))}
```

**Combinaciones de Gradientes Implementadas:**
```typescript
// Contundente + Perforante
'bg-gradient-to-br from-blue-500/20 to-green-500/20'

// Perforante + Cortante
'bg-gradient-to-br from-green-500/20 to-red-500/20'

// Cortante + Perforante
'bg-gradient-to-br from-red-500/20 to-green-500/20'

// Contundente + Cortante
'bg-gradient-to-br from-blue-500/20 to-red-500/20'
```

### 3. Sistema de Referencia de Iconos

**Estructura de Subdirectorios:**
```
/iconos/              → Índice con cards de 3 bibliotecas + preview Lucide
├── /lucide/          → 79 iconos organizados en 9 categorías D&D
├── /gameicons/       → Info sobre 4,170+ iconos RPG
└── /rpgawesome/      → Info sobre 495 iconos de mecánicas de juego
```

**Lucide React - 79 Iconos Organizados:**

| Categoría | Iconos | Ejemplos |
|-----------|--------|----------|
| Razas | 10 | User, TreePine, Mountain, Flame, Moon |
| Clases | 14 | Sword, Swords, Shield, Sparkles, Wand, Book |
| Armas | 10 | Sword, Axe, Hammer, Target, Crosshair |
| Hechizos - Elementos | 9 | Flame, Droplet, Wind, Snowflake, Zap, Sun, Moon |
| Hechizos - Tipos | 10 | Wand, Eye, Skull, Brain, Target, ShieldCheck |
| Objetos | 10 | Shield, FlaskConical, Scroll, Package, Coins, Gem |
| Efectos | 10 | HeartPulse, Heart, Skull, Flame, Snowflake, Zap |
| Atributos | 6 | Dumbbell, Footprints, Heart, Brain, Eye, MessageCircle |
| Varios | 10 | Dice1-6, Map, Compass, Castle, Flag |

**Funcionalidad de Búsqueda:**
```typescript
const [searchTerm, setSearchTerm] = useState('');

const filteredCategories = Object.entries(iconCategories).reduce((acc, [category, icons]) => {
  const filtered = icons.filter(icon =>
    icon.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (filtered.length > 0) {
    acc[category] = filtered;
  }
  return acc;
}, {} as Record<string, typeof iconCategories[keyof typeof iconCategories]>);
```

**Información de Bibliotecas:**

| Biblioteca | Iconos | Licencia | Especialización | URL |
|------------|--------|----------|-----------------|-----|
| Lucide React | 1,000+ | ISC | UI general, interfaz | https://lucide.dev |
| Game-icons.net | 4,170+ | CC BY 3.0 | Armas, criaturas, hechizos | https://game-icons.net |
| RPG Awesome | 495 | SIL OFL 1.1 + MIT | Dados, estadísticas, mecánicas | https://nagoshiashumari.github.io/Rpg-Awesome/ |

---

## Limitaciones Conocidas (Actualizadas 2025-01-14)

### 1. Tailwind CSS - Clases Dinámicas
**Problema:** Tailwind no puede generar clases desde template literals en tiempo de ejecución.

```typescript
// ❌ NO FUNCIONA
const color = 'blue';
const className = `bg-${color}-500`;

// ✅ SOLUCIÓN
if (color === 'blue') {
  className = 'bg-blue-500';
} else if (color === 'red') {
  className = 'bg-red-500';
}
```

### 2. Datos Embebidos
**Problema:** Todos los datos están embebidos en componentes, lo que aumenta el tamaño de los archivos.

**Consideración futura:** Migrar a archivos JSON o TypeScript separados en `/src/data/`.

### 3. Determinación de "y" vs "o" en Armas
**Problema:** No hay campo explícito para diferenciar armas con daño "A y B" vs "A o B".

**Solución actual:** Lista hardcoded de armas conocidas con "y":
```typescript
const andWeapons = ['lucero del alba', 'guadaña'];
```

**Solución futura:** Añadir campo `damageLogic: 'and' | 'or'` a la interfaz de arma.

### 4. Descripciones Faltantes
**Problema:** Muchas armas tienen descripción placeholder o vacía.

**Solución:** Consultar SRD oficial y añadir descripciones completas.

### 5. ~~Sin Backend~~ ✅ **RESUELTO**
**Solución Implementada:** Backend completo con Supabase PostgreSQL

**Funcionalidades Ahora Disponibles:**
- ✅ Autenticación completa (OAuth, Magic Link, Password)
- ✅ Perfiles de usuario con tiers
- ✅ Sistema de traducciones colaborativo
- ✅ Row Level Security (RLS)
- ✅ Base de datos relacional con 13 tablas
- ✅ API routes para funciones admin

**Pendiente:**
- ⏳ Persistencia de personajes en Supabase (actualmente localStorage)
- ⏳ Sistema de favoritos en backend
- ⏳ Historial de cambios de usuario

---

## Roadmap Futuro

### Fase 1: Completar Contenido Base ✅ **MAYORMENTE COMPLETADO**
- [x] ✅ Implementar razas core (7 razas del Player's Handbook)
- [x] ✅ Implementar razas suplementarias (9 razas adicionales con warnings)
- [x] ✅ Implementar clases core (11 clases base completas)
- [x] ✅ Integrar iconos temáticos por clase
- [x] ✅ 73 armas completas con filtros avanzados
- [x] ✅ 47 dotes completas
- [x] ✅ 43 habilidades completas
- [ ] ⏳ Añadir objetos mágicos básicos (en progreso)
- [ ] ⏳ Implementar sección de armaduras completa

### Fase 2: Autenticación y Backend ✅ **COMPLETADO**
- [x] ✅ Backend con Supabase PostgreSQL
- [x] ✅ Sistema de autenticación completo:
  - [x] ✅ Login con email y contraseña
  - [x] ✅ Registro de usuarios
  - [x] ✅ Magic Link (passwordless)
  - [x] ✅ Password reset
  - [x] ✅ OAuth con 21 providers (Google, Microsoft, Discord, Apple, GitHub, etc.)
  - [x] ✅ Admin invite system
- [x] ✅ Sistema de tiers de usuario (6 niveles: guest → admin)
- [x] ✅ Row Level Security (RLS) en Supabase
- [x] ✅ Perfiles de usuario extendidos

### Fase 3: Editor de Personajes ✅ **COMPLETADO**
- [x] ✅ Editor de personajes interactivo completo:
  - [x] ✅ Información básica (nombre, raza, alineamiento, deidad)
  - [x] ✅ Sistema de habilidades (Point Buy, 4d6 drop lowest, Manual)
  - [x] ✅ Modificadores raciales automáticos
  - [x] ✅ Estadísticas de combate (AC, Iniciativa, Velocidad)
  - [x] ✅ Sistema de pericias (44 skills D&D 3.5)
  - [x] ✅ Persistencia en localStorage
  - [x] ✅ Import/Export JSON
- [ ] ⏳ Export a PDF (pendiente)
- [ ] ⏳ Selector de clase y multiclase (pendiente)
- [ ] ⏳ Cálculo automático de BAB y salvaciones (requiere clase)

### Fase 4: Sistema de Traducciones Colaborativo ✅ **BACKEND COMPLETADO**
- [x] ✅ Sistema de traducciones oficiales (554/605 conjuros - 91.6%)
- [x] ✅ Integración DeepL API para traducción automática
- [x] ✅ Sistema de ediciones y votación comunitaria
- [x] ✅ Gamificación con puntos de reputación
- [ ] ⏳ Frontend de traducción `/contribute/translate` (pendiente)
- [ ] ⏳ Dashboard de usuario `/profile` (pendiente)

### Fase 5: Deployment y Producción ✅ **CASI COMPLETADO**
- [x] ✅ Build de producción completamente funcional
- [x] ✅ 214 páginas generadas (SSG + SSR)
- [x] ✅ Código subido a GitHub
- [x] ✅ Configuración de Vercel completa
- [x] ✅ Variables de entorno documentadas
- [ ] ⏳ Deploy en Vercel (en progreso por el usuario)
- [ ] ⏳ Configurar OAuth providers en Supabase
- [ ] ⏳ Configurar dominio personalizado (opcional)

### Fase 6: Expansión de Funcionalidades (Próximas)
- [ ] Sistema de búsqueda global
- [ ] Favoritos persistentes (backend con Supabase)
- [ ] Comparador de armas/objetos
- [ ] Calculadora de daño
- [ ] Generador de encuentros por CR
- [ ] Tabla de tesoros aleatorios
- [ ] Gestión de campaña

### Mejoras Técnicas Completadas ✅
- [x] ✅ Migrar datos a Supabase PostgreSQL
- [x] ✅ Separar servicios Server/Client para Supabase
- [x] ✅ Sistema de tipos TypeScript completo
- [x] ✅ Build de producción optimizado
- [x] ✅ Documentación completa del proyecto
- [ ] ⏳ Implementar lazy loading para listas largas
- [ ] ⏳ Añadir tests unitarios
- [ ] ⏳ Mejorar SEO y meta tags
- [ ] ⏳ Implementar modo oscuro/claro
- [ ] ⏳ Añadir breadcrumbs de navegación
- [ ] ⏳ Mejorar accesibilidad (ARIA, keyboard nav)
- [ ] ⏳ PWA con offline support

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo en http://localhost:3000

# Build
npm run build            # Crea build de producción
npm run start            # Inicia servidor de producción

# Linting
npm run lint             # Ejecuta ESLint

# Limpiar caché
rm -rf .next             # Elimina caché de Next.js (Windows: rmdir /s /q .next)
```

---

## Notas Finales

### Convenciones de Commit
- feat: Nueva funcionalidad
- fix: Corrección de bug
- docs: Cambios en documentación
- style: Cambios de formato (no afectan código)
- refactor: Refactorización de código
- test: Añadir o modificar tests
- chore: Tareas de mantenimiento

### Recursos Útiles
- [D&D 3.5 SRD Oficial](https://www.d20srd.org/)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [Game-icons.net](https://game-icons.net)
- [RPG Awesome](https://nagoshiashumari.github.io/Rpg-Awesome/)

### Contacto del Proyecto
- **Última actualización:** 2025-01-14 (Preparación para Deployment)
- **Versión de Claude:** Sonnet 4.5
- **Estado:** ✅ **LISTO PARA DEPLOYMENT EN VERCEL**
- **Repositorio GitHub:** https://github.com/lesistern/ArcanoCompleto
- **Autor:** lesistern@gmail.com

### Estado de Deployment
- ✅ Build de producción completado (214 páginas)
- ✅ TypeScript sin errores
- ✅ Código subido a GitHub
- ⏳ Deployment en Vercel (en progreso)

---

**Este documento fue actualizado el 2025-01-14 con toda la información de deployment, autenticación OAuth, editor de personajes, y sistema de traducciones colaborativo.**

**Próxima actualización:** Después del deployment exitoso en Vercel.
