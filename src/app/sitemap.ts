import { MetadataRoute } from 'next';
import { getAllClassSlugs, getAllRaceSlugs, getAllFeatSlugs } from '@/lib/supabase/cached-queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arcanocompleto.vercel.app';

  // Obtener slugs de contenido dinámico
  const [classes, races, feats] = await Promise.all([
    getAllClassSlugs(),
    getAllRaceSlugs(),
    getAllFeatSlugs(),
  ]);

  // Rutas estáticas principales
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/clases`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/razas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dotes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/habilidades`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/objetos/armas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/editor-personajes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Rutas dinámicas de clases
  const classRoutes: MetadataRoute.Sitemap = classes.map((c) => ({
    url: `${baseUrl}/clases/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Rutas dinámicas de razas
  const raceRoutes: MetadataRoute.Sitemap = races.map((r) => ({
    url: `${baseUrl}/razas/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Rutas dinámicas de dotes
  const featRoutes: MetadataRoute.Sitemap = feats.map((f) => ({
    url: `${baseUrl}/dotes/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...classRoutes, ...raceRoutes, ...featRoutes];
}
