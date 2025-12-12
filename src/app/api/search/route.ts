import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIP, RATE_LIMITS } from '@/lib/utils/rate-limiter';

export async function GET(req: Request) {
  // Rate limiting para prevenir abuso
  const clientIP = getClientIP(req);
  const rateLimit = checkRateLimit(clientIP, RATE_LIMITS.search);

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.', threads: [], compendium: [] },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.retryAfter || 60),
          'X-RateLimit-Limit': '30',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimit.resetTime),
        },
      }
    );
  }

  const url = new URL(req.url);
  const q = url.searchParams.get('q')?.trim() || '';
  if (!q) {
    return NextResponse.json({ threads: [], compendium: [] });
  }

  const supabase = await createClient();

  const like = `%${q}%`;

  let threads: any[] = [];
  try {
    const { data } = await supabase
      .from('mv_forum_threads_search')
      .select('id, title, slug, category_slug, category_name')
      .textSearch('search_vector', q, { config: 'spanish' })
      .limit(8);
    threads = data || [];
  } catch {
    const { data } = await supabase
      .from('v_forum_threads_with_info')
      .select('id, title, slug, category_slug, category_name')
      .ilike('title', like)
      .limit(8);
    threads = data || [];
  }

  // Búsqueda en múltiples entidades del compendio
  let compendium: any[] = [];

  try {
    // Búsqueda en clases
    const { data: classes } = await supabase
      .from('classes')
      .select('slug, titulo, description_es')
      .ilike('titulo', like)
      .limit(3);

    if (classes) {
      compendium.push(...classes.map((c: any) => ({
        id: c.slug,
        slug: c.slug,
        name: c.titulo,
        type: 'class',
        typeLabel: 'Clase',
        href: `/clases/${c.slug}`,
      })));
    }

    // Búsqueda en razas
    const { data: races } = await supabase
      .from('races')
      .select('slug, name_es')
      .ilike('name_es', like)
      .limit(3);

    if (races) {
      compendium.push(...races.map((r: any) => ({
        id: r.slug,
        slug: r.slug,
        name: r.name_es,
        type: 'race',
        typeLabel: 'Raza',
        href: `/razas/${r.slug}`,
      })));
    }

    // Búsqueda en conjuros
    const { data: spells } = await supabase
      .from('spells')
      .select('id, name_es, school, level')
      .ilike('name_es', like)
      .limit(3);

    if (spells) {
      compendium.push(...spells.map((s: any) => ({
        id: s.id,
        slug: s.id,
        name: s.name_es || s.id,
        type: 'spell',
        typeLabel: 'Conjuro',
        subtitle: `Nivel ${s.level} - ${s.school}`,
        href: `/conjuros/${s.id}`,
      })));
    }

    // Búsqueda en dotes
    const { data: feats } = await supabase
      .from('feats')
      .select('slug, name')
      .ilike('name', like)
      .limit(3);

    if (feats) {
      compendium.push(...feats.map((f: any) => ({
        id: f.slug,
        slug: f.slug,
        name: f.name,
        type: 'feat',
        typeLabel: 'Dote',
        href: `/dotes/${f.slug}`,
      })));
    }

    // Búsqueda en habilidades
    const { data: skills } = await supabase
      .from('skills')
      .select('slug, name')
      .ilike('name', like)
      .limit(3);

    if (skills) {
      compendium.push(...skills.map((s: any) => ({
        id: s.slug,
        slug: s.slug,
        name: s.name,
        type: 'skill',
        typeLabel: 'Habilidad',
        href: `/habilidades/${s.slug}`,
      })));
    }

    // Búsqueda en armas
    const { data: weapons } = await supabase
      .from('weapons')
      .select('slug, name')
      .ilike('name', like)
      .limit(3);

    if (weapons) {
      compendium.push(...weapons.map((w: any) => ({
        id: w.slug,
        slug: w.slug,
        name: w.name,
        type: 'weapon',
        typeLabel: 'Arma',
        href: `/objetos/armas/${w.slug}`,
      })));
    }

    // Búsqueda en monstruos
    const { data: monsters } = await supabase
      .from('monsters')
      .select('slug, name, challenge_rating')
      .ilike('name', like)
      .limit(3);

    if (monsters) {
      compendium.push(...monsters.map((m: any) => ({
        id: m.slug,
        slug: m.slug,
        name: m.name,
        type: 'monster',
        typeLabel: 'Monstruo',
        subtitle: `CR ${m.challenge_rating}`,
        href: `/monstruos/${m.slug}`,
      })));
    }

    // Ordenar por relevancia (coincidencias exactas primero)
    compendium.sort((a, b) => {
      const aExact = a.name.toLowerCase() === q.toLowerCase();
      const bExact = b.name.toLowerCase() === q.toLowerCase();
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      const aStarts = a.name.toLowerCase().startsWith(q.toLowerCase());
      const bStarts = b.name.toLowerCase().startsWith(q.toLowerCase());
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return 0;
    });

    // Limitar a 10 resultados
    compendium = compendium.slice(0, 10);
  } catch (error) {
    console.error('Compendium search error:', error);
    compendium = [];
  }

  return NextResponse.json({ threads, compendium });
}
