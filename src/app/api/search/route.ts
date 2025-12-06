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

  let compendium: any[] = [];
  try {
    const { data, error } = await supabase
      .from('compendium_entries')
      .select('id, slug, name, type')
      .ilike('name', like)
      .limit(5);
    if (!error && data) {
      compendium = data;
    }
  } catch {
    compendium = [];
  }

  return NextResponse.json({ threads, compendium });
}
