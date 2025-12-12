import { MetadataRoute } from 'next';
import {
  getAllClassSlugs,
  getAllRaceSlugs,
  getAllFeatSlugs,
  getAllSpellSlugs,
  getAllItemSlugs,
  getAllMonsterSlugs
} from '@/lib/supabase/cached-queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arcanocompleto.vercel.app';

  // Obtener slugs de contenido dinámico
  const [classes, races, feats, spells, items, monsters] = await Promise.all([
    getAllClassSlugs(),
    getAllRaceSlugs(),
    getAllFeatSlugs(),
    getAllSpellSlugs(),
    getAllItemSlugs(),
    getAllMonsterSlugs(),
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
      url: `${baseUrl}/conjuros`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/objetos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/monstruos`,
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

  // Rutas dinámicas
  const classRoutes: MetadataRoute.Sitemap = classes.map((c) => ({
    url: `${baseUrl}/clases/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const raceRoutes: MetadataRoute.Sitemap = races.map((r) => ({
    url: `${baseUrl}/razas/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const featRoutes: MetadataRoute.Sitemap = feats.map((f) => ({
    url: `${baseUrl}/dotes/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const spellRoutes: MetadataRoute.Sitemap = spells.map((s) => ({
    url: `${baseUrl}/conjuros/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const itemRoutes: MetadataRoute.Sitemap = items.map((i) => ({
    url: `${baseUrl}/objetos/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const monsterRoutes: MetadataRoute.Sitemap = monsters.map((m) => ({
    url: `${baseUrl}/monstruos/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...classRoutes,
    ...raceRoutes,
    ...featRoutes,
    ...spellRoutes,
    ...itemRoutes,
    ...monsterRoutes
  ];
}
