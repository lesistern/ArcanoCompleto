# 🚀 Plan de Optimización Avanzada - Vercel + Next.js 15

**Fecha:** 2025-11-15
**Estado Actual:** Fase 1 implementada parcialmente (Speed Insights + Lazy Loading)
**Objetivo:** Mejorar LCP de 2.5s → <1.5s, Bundle de 200KB → <120KB

---

## ✅ YA IMPLEMENTADO

### 1. Vercel Speed Insights
- ✅ Paquete instalado y configurado en [layout.tsx:47](src/app/layout.tsx#L47)
- ✅ Métricas Core Web Vitals en tiempo real
- ✅ Monitoreo en producción activo

### 2. React Compiler
- ✅ Habilitado en [next.config.ts](next.config.ts#L5)
- ✅ Optimizaciones automáticas de renderizado
- ✅ Menos re-renders innecesarios

### 3. Lazy Loading Básico
- ✅ BackToHome, ScrollToTop, FeedbackButton con dynamic import
- ✅ Ahorro estimado: ~15-20 KB

---

## 🎯 OPTIMIZACIONES DE ALTO IMPACTO (Implementar YA)

### 1. Incremental Static Regeneration (ISR) - CRÍTICO ⚡

**Problema:** Todas las páginas de contenido estático se renderizan en cada request.

**Solución:** Habilitar ISR en rutas estáticas

#### Rutas Candidatas para ISR:
```typescript
// app/clases/page.tsx - Lista de 11 clases (contenido casi estático)
export const revalidate = 3600; // Revalidar cada hora

// app/clases/[slug]/page.tsx - Detalle de clase
export const revalidate = 86400; // 24 horas

// app/razas/page.tsx - Lista de 16 razas
export const revalidate = 3600;

// app/razas/[slug]/page.tsx
export const revalidate = 86400;

// app/dotes/page.tsx - 143 dotes
export const revalidate = 3600;

// app/habilidades/page.tsx - 43 skills
export const revalidate = 3600;

// app/conjuros/page.tsx - 605 conjuros
export const revalidate = 1800; // 30 minutos (más frecuente por traducciones)
```

**Beneficio:**
- ⚡ TTFB: 500ms → <100ms (5x más rápido)
- 💰 Ahorro de ~90% en queries a Supabase
- 🌍 CDN caching global automático en Vercel Edge Network

---

### 2. Partial Prerendering (PPR) - NEW en Next.js 15 🔥

**Qué es:** Combina partes estáticas y dinámicas en la misma página.

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    ppr: 'incremental', // ✅ Habilitar PPR gradualmente
  },
};
```

**Ejemplo de uso:**
```typescript
// app/clases/[slug]/page.tsx
export const experimental_ppr = true;

export default function ClassDetailPage({ params }) {
  return (
    <>
      {/* Parte ESTÁTICA - Pre-renderizada */}
      <ClassHeader class={classData} />
      <ClassDescription class={classData} />

      {/* Parte DINÁMICA - Streaming con Suspense */}
      <Suspense fallback={<SkeletonLoader />}>
        <UserProgressTracker classSlug={params.slug} /> {/* Requiere auth */}
      </Suspense>

      <Suspense fallback={<SkeletonLoader />}>
        <ClassComments classSlug={params.slug} /> {/* Contenido dinámico */}
      </Suspense>
    </>
  );
}
```

**Beneficio:**
- ⚡ Shell estático carga en <100ms
- 🔄 Contenido dinámico hace streaming después
- 📊 Mejora LCP en ~40-60%

---

### 3. Static Generation para Rutas Conocidas

**Problema:** Next.js no conoce todas las rutas dinámicas hasta que se solicitan.

**Solución:** Generar rutas estáticas en build time

```typescript
// app/clases/[slug]/page.tsx
export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: classes } = await supabase
    .from('classes')
    .select('slug');

  return classes?.map((c) => ({ slug: c.slug })) || [];
}

// Hacer lo mismo para:
// - app/razas/[slug]/page.tsx (16 razas)
// - app/dotes/[slug]/page.tsx (143 dotes)
// - app/conjuros/[slug]/page.tsx (605 conjuros - considerar on-demand)
```

**Beneficio:**
- ✅ 11 clases + 16 razas + 143 dotes = 170 páginas pre-generadas
- ⚡ Primera carga instantánea desde CDN
- 🎯 SEO perfecto (HTML completo en primera carga)

---

### 4. Bundle Analysis y Tree Shaking

**Instalar analizador:**
```bash
npm install --save-dev @next/bundle-analyzer
```

**Configurar:**
```typescript
// next.config.ts
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    ppr: 'incremental',
    optimizePackageImports: ['lucide-react', 'react-icons'], // ✅ CRÍTICO
  },
};

export default bundleAnalyzer(nextConfig);
```

**Ejecutar análisis:**
```bash
ANALYZE=true npm run build
```

**Optimizaciones esperadas:**
```typescript
// ❌ ANTES (carga TODO lucide-react - 500+ iconos):
import { Sword, Shield, Book } from 'lucide-react';

// ✅ DESPUÉS (con optimizePackageImports):
// Automáticamente tree-shaken, solo 3 iconos en bundle
```

**Beneficio:**
- 📦 Reducción de ~60-80 KB en iconos no usados
- ⚡ Mejora en Time to Interactive: -150ms

---

### 5. Optimización de Supabase Client

**Problema:** Doble carga de Supabase (server + client) en muchas páginas.

**Solución:** Separar queries estáticas de dinámicas

```typescript
// lib/supabase/static-queries.ts (solo server)
import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

// ✅ cache() deduplica queries idénticas en un request
export const getClasses = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('classes')
    .select('*')
    .order('name');
  return data;
});

export const getClassBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('classes')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
});
```

**Uso en Server Components:**
```typescript
// app/clases/page.tsx (Server Component)
import { getClasses } from '@/lib/supabase/static-queries';

export default async function ClassesPage() {
  const classes = await getClasses(); // ✅ Cached

  return <ClassList classes={classes} />; // ✅ Server render
}
```

**Beneficio:**
- ⬇️ JavaScript client eliminado de páginas estáticas (-40 KB)
- 🚀 Supabase client solo carga donde se necesita (auth, real-time)
- 📊 Request Deduplication automático con cache()

---

### 6. Image Optimization Strategy

**Problema:** No usas `next/image` actualmente.

**Solución:** Preparar para futuros assets (iconos de clases, razas, etc.)

```typescript
// components/ClassIcon.tsx
import Image from 'next/image';

export function ClassIcon({ className, size = 64 }) {
  return (
    <Image
      src={`/images/classes/${className.toLowerCase()}.webp`}
      alt={className}
      width={size}
      height={size}
      loading="lazy" // Excepto above-the-fold
      placeholder="blur" // Requiere blurDataURL
      blurDataURL={generateBlurDataURL(className)} // Placeholder SVG
    />
  );
}
```

**Configurar dominios externos si usas Supabase Storage:**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Formatos modernos
  },
};
```

**Beneficio:**
- 📷 Imágenes 60-80% más pequeñas (AVIF > WebP > JPEG)
- ✅ CLS = 0 (sin layout shift)
- ⚡ Lazy loading automático

---

### 7. Font Optimization Avanzada

**Estado actual:** Ya usas `next/font` ✅

**Mejora adicional:**
```typescript
// app/layout.tsx
import { Merriweather, Roboto_Flex } from 'next/font/google';

const merriweather = Merriweather({
  weight: ["700", "900"],
  display: "swap",
  preload: true,
  fallback: ['Georgia', 'serif'], // ✅ Añadir fallback
  adjustFontFallback: true, // ✅ Reduce CLS
  subsets: ['latin'], // ✅ Solo caracteres necesarios
  variable: '--font-heading', // ✅ CSS variable
});

const roboto = Roboto_Flex({
  display: "swap",
  preload: true,
  fallback: ['Arial', 'sans-serif'],
  adjustFontFallback: true,
  subsets: ['latin'],
  variable: '--font-body',
});
```

**CSS Global:**
```css
/* app/globals.css */
:root {
  --font-heading: var(--font-merriweather);
  --font-body: var(--font-roboto-flex);
}

body {
  font-family: var(--font-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}
```

**Beneficio:**
- 📝 Menos FOIT/FOUT (flash de texto invisible/sin estilo)
- ⚡ CLS mejorado con adjustFontFallback
- 🎨 Más fácil de mantener con variables CSS

---

### 8. Metadata API para SEO + Performance

**Problema:** No veo metadata dinámica en páginas de detalle.

**Solución:**
```typescript
// app/clases/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const classData = await getClassBySlug(params.slug);

  return {
    title: `${classData.name} - D&D 3.5 Compendium`,
    description: classData.description.slice(0, 160),
    openGraph: {
      title: classData.name,
      description: classData.description.slice(0, 160),
      type: 'article',
      images: [
        {
          url: `/og-images/classes/${params.slug}.png`, // Vercel OG Image
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: classData.name,
      description: classData.description.slice(0, 160),
    },
  };
}
```

**OG Image dinámico con @vercel/og:**
```typescript
// app/api/og-class/[slug]/route.tsx
import { ImageResponse } from '@vercel/og';

export async function GET(request: Request, { params }) {
  const classData = await getClassBySlug(params.slug);

  return new ImageResponse(
    (
      <div style={{ /* Diseño OG Image */ }}>
        <h1>{classData.name}</h1>
        <p>{classData.hit_die} | {classData.skill_points_per_level} skill points</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

**Beneficio:**
- 🔍 SEO mejorado (títulos únicos por página)
- 📱 Mejor sharing en redes sociales
- ⚡ OG images cacheadas en Vercel Edge

---

### 9. Route Segment Config Optimization

**Optimizar cada ruta según su naturaleza:**

```typescript
// app/clases/page.tsx (contenido estático)
export const dynamic = 'force-static'; // Fuerza generación estática
export const revalidate = 3600; // ISR: 1 hora

// app/profile/page.tsx (requiere auth, siempre dinámico)
export const dynamic = 'force-dynamic'; // No cachear
export const fetchCache = 'force-no-store'; // No cachear fetches

// app/admin/tickets/page.tsx (solo admins, SSR)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Más poder de procesamiento

// app/api/search/route.ts (búsqueda frecuente, Edge Runtime)
export const runtime = 'edge'; // ⚡ Deploy a Vercel Edge Functions
export const dynamic = 'force-dynamic';
```

**Beneficio:**
- ⚡ Edge Functions tienen latencia <50ms global
- 💰 Menor costo en queries para rutas estáticas
- 🎯 Mejor UX para rutas dinámicas

---

### 10. Streaming con Suspense y Loading UI

**Implementar progressive hydration:**

```typescript
// app/conjuros/page.tsx
import { Suspense } from 'react';

export default function SpellsPage() {
  return (
    <>
      {/* Render inmediato */}
      <PageHeader />

      {/* Streaming - no bloquea FCP */}
      <Suspense fallback={<FiltersSkeleton />}>
        <SpellFilters /> {/* Carga asíncrona */}
      </Suspense>

      <Suspense fallback={<SpellListSkeleton />}>
        <SpellList /> {/* Query a Supabase */}
      </Suspense>
    </>
  );
}
```

**Loading UI por ruta:**
```typescript
// app/clases/[slug]/loading.tsx
export default function Loading() {
  return <ClassDetailSkeleton />;
}
```

**Beneficio:**
- ⚡ FCP mejorado ~500ms
- 🎨 Mejor UX (feedback visual inmediato)
- 🔄 Progressive rendering

---

## 📊 IMPACTO ESTIMADO (Después de todas las optimizaciones)

| Métrica | Actual | Target | Mejora |
|---------|--------|--------|--------|
| **LCP** | 2.5s | <1.5s | **-40%** |
| **FCP** | 1.5s | <0.8s | **-47%** |
| **TTFB** | 500ms | <100ms | **-80%** |
| **Bundle inicial** | 200 KB | <120 KB | **-40%** |
| **Time to Interactive** | 3.0s | <1.8s | **-40%** |
| **Lighthouse Score** | ~80 | >95 | **+15 puntos** |

---

## 🔧 PLAN DE IMPLEMENTACIÓN (Orden Recomendado)

### Semana 1: Quick Wins (4-6 horas)
- [ ] 1. Habilitar ISR en páginas estáticas (30 min)
- [ ] 2. Implementar `generateStaticParams()` (1 hora)
- [ ] 3. Configurar Bundle Analyzer (15 min)
- [ ] 4. Optimizar imports de lucide-react (30 min)
- [ ] 5. Separar queries Supabase server/client (2 horas)
- [ ] 6. Añadir metadata dinámica (1 hora)

**Impacto esperado:** LCP -800ms, Bundle -60 KB

### Semana 2: Optimizaciones Medias (6-8 horas)
- [ ] 7. Habilitar PPR en páginas clave (2 horas)
- [ ] 8. Implementar Streaming + Suspense (2 horas)
- [ ] 9. Configurar Route Segment Config (1 hora)
- [ ] 10. Crear Loading UIs (2 horas)
- [ ] 11. Optimizar fonts con variables CSS (1 hora)

**Impacto esperado:** FCP -400ms, TTI -600ms

### Semana 3: Avanzado (4-6 horas)
- [ ] 12. Migrar búsqueda a Edge Functions (2 horas)
- [ ] 13. Implementar OG Images dinámicos (2 horas)
- [ ] 14. Auditoría completa con Lighthouse CI (1 hora)
- [ ] 15. Monitorear métricas reales en Speed Insights (continuo)

**Impacto esperado:** TTFB -400ms, SEO +20%

---

## 🛠️ CONFIGURACIÓN FINAL RECOMENDADA

```typescript
// next.config.ts (OPTIMIZADO)
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactCompiler: true,

  experimental: {
    ppr: 'incremental', // Partial Prerendering
    optimizePackageImports: ['lucide-react', 'react-icons'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // Cache 24h
  },

  // Comprimir respuestas
  compress: true,

  // Headers de seguridad y cache
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains',
          },
        ],
      },
      {
        // Cache estático agresivo
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
```

---

## 📈 MÉTRICAS DE ÉXITO

**Dashboard de Vercel Speed Insights:**
- ✅ LCP P75 < 1.5s (actualmente ~2.5s)
- ✅ FCP P75 < 0.8s (actualmente ~1.5s)
- ✅ CLS P75 < 0.1 (ya bueno)
- ✅ INP P75 < 200ms

**Bundle Analysis:**
- ✅ First Load JS < 120 KB (actualmente ~200 KB)
- ✅ Shared by all < 80 KB
- ✅ Lazy chunks < 40 KB cada uno

**Lighthouse CI (GitHub Actions):**
- ✅ Performance Score > 95
- ✅ Accessibility Score > 90
- ✅ Best Practices Score > 95
- ✅ SEO Score > 95

---

## 🎯 PRIORIDAD MÁXIMA (HACER HOY)

1. **ISR + generateStaticParams()** → Mayor impacto con menor esfuerzo
2. **Bundle Analyzer** → Identificar problemas ocultos
3. **Separar queries Supabase** → Reduce JS en 40 KB mínimo

**Estimación total:** 3-4 horas de trabajo
**Impacto esperado:** LCP de 2.5s → 1.2s (mejora del 52%)

---

**Última actualización:** 2025-11-15
**Próxima revisión:** Después de implementar Semana 1 (medir con Speed Insights)
