import { createClient } from '@/lib/supabase/server';
import { TrustLevel } from '@/components/forum/TrustLevelBadge';

export interface ForumThread {
  id: string;
  category_id: string;
  category_name: string;
  category_slug: string;
  author_id: string;
  author_name: string;
  author_username: string;
  author_trust_level: TrustLevel;
  author_reputation?: number | null;
  title: string;
  slug: string;
  tags?: string[] | null;
  is_pinned: boolean;
  is_locked: boolean;
  is_solved: boolean;
  view_count: number;
  reply_count: number;
  created_at: string;
}

export interface ForumPost {
  id: string;
  author_id: string;
  author_name: string;
  author_username: string;
  author_trust_level: TrustLevel;
  author_reputation?: number | null;
  content: string;
  is_solution: boolean;
  upvotes_count: number;
  downvotes_count: number;
  created_at: string;
  edited_at: string | null;
  user_vote?: 1 | -1 | null;
  is_deleted?: boolean;
}

export interface ThreadDataResult {
  thread: ForumThread | null;
  rootPost: ForumPost | null;
  replies: ForumPost[];
  pagination: {
    page: number;
    pageSize: number;
    totalReplies: number;
    totalPages: number;
  };
  currentUserId: string | null;
  isAdmin: boolean;
}

/**
 * Carga los datos completos de un hilo del foro incluyendo:
 * - Información del hilo
 * - Post raíz (original)
 * - Respuestas con paginación
 * - Información del usuario actual
 * - Votos del usuario actual
 */
export async function loadThreadData(
  categorySlug: string,
  threadSlug: string,
  page: number,
  pageSize: number
): Promise<ThreadDataResult> {
  const supabase = await createClient();

  // 1. Obtener usuario actual e información de admin
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currentUserId = user?.id || null;

  let isAdmin = false;
  if (currentUserId) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role,is_admin')
      .eq('id', currentUserId)
      .single();
    isAdmin = !!(profile && (profile.role === 'admin' || profile.is_admin === true));
  }

  // 2. Obtener hilo desde vista
  const { data: threadRow } = await supabase
    .from('v_forum_threads_with_info')
    .select('*')
    .eq('category_slug', categorySlug)
    .eq('slug', threadSlug)
    .single();

  if (!threadRow) {
    return {
      thread: null,
      rootPost: null,
      replies: [],
      pagination: { page, pageSize, totalReplies: 0, totalPages: 0 },
      currentUserId,
      isAdmin,
    };
  }

  // 3. Registrar vista mediante trigger
  await supabase
    .from('forum_thread_views')
    .insert({
      thread_id: threadRow.id,
      user_id: currentUserId,
    })
    .select('id')
    .maybeSingle();

  // 4. Obtener post raíz (publicación original)
  const { data: rootPostRaw } = await supabase
    .from('v_forum_posts_with_author')
    .select('*')
    .eq('thread_id', threadRow.id)
    .is('parent_id', null)
    .order('created_at', { ascending: true })
    .maybeSingle();

  // 5. Obtener respuestas con paginación
  const offset = (page - 1) * pageSize;
  let repliesQuery = supabase
    .from('v_forum_posts_with_author')
    .select('*', { count: 'exact' })
    .eq('thread_id', threadRow.id)
    .order('created_at', { ascending: true });

  if (rootPostRaw?.id) {
    repliesQuery = repliesQuery.neq('id', rootPostRaw.id);
  }

  const { data: repliesData, count: repliesCount } = await repliesQuery.range(
    offset,
    offset + pageSize - 1
  );

  // 6. Obtener votos del usuario actual
  let userVotes: Record<string, 1 | -1> = {};
  if (currentUserId) {
    const { data: voteRows } = await supabase
      .from('forum_post_votes')
      .select('post_id, value')
      .eq('user_id', currentUserId);

    voteRows?.forEach((row) => {
      userVotes[row.post_id] = row.value as 1 | -1;
    });
  }

  // 7. Helper function para normalizar profiles (pueden ser array o objeto)
  const normalizeProfile = (profile: any) =>
    Array.isArray(profile) ? profile[0] : profile;
  const rootProfile = normalizeProfile(rootPostRaw?.profiles);

  // 8. Construir objeto de hilo tipado
  const thread: ForumThread = {
    id: threadRow.id,
    category_id: threadRow.category_id,
    category_name: threadRow.category_name,
    category_slug: threadRow.category_slug,
    author_id: threadRow.author_id,
    author_name: threadRow.author_name || 'Usuario',
    author_username: threadRow.author_username || '',
    author_trust_level: threadRow.author_trust_level || 'TL0',
    author_reputation: threadRow.author_reputation ?? null,
    title: threadRow.title,
    slug: threadRow.slug,
    tags: threadRow.tags || [],
    is_pinned: threadRow.pinned ?? false,
    is_locked: threadRow.locked ?? false,
    is_solved: threadRow.is_solved ?? false,
    view_count: threadRow.views_count ?? 0,
    reply_count: threadRow.replies_count ?? repliesCount ?? 0,
    created_at: threadRow.created_at,
  };

  // 9. Construir post raíz
  const rootPost: ForumPost | null = rootPostRaw
    ? {
      id: rootPostRaw.id,
      author_id: rootPostRaw.author_id,
      author_name: rootProfile?.display_name || 'Usuario',
      author_username: rootProfile?.username_slug || '',
      author_trust_level: rootProfile?.forum_trust_level || 'TL0',
      author_reputation: null,
      content: rootPostRaw.content_html || rootPostRaw.content_md || '',
      is_solution: rootPostRaw.is_answer ?? false,
      upvotes_count: rootPostRaw.upvotes_count || 0,
      downvotes_count: rootPostRaw.downvotes_count || 0,
      created_at: rootPostRaw.created_at,
      edited_at: rootPostRaw.updated_at,
      user_vote: userVotes[rootPostRaw.id] ?? null,
      is_deleted: rootPostRaw.is_deleted ?? false,
    }
    : null;

  // 10. Construir array de respuestas
  const replies: ForumPost[] = (repliesData || []).map((post: any) => {
    const profile = normalizeProfile(post.profiles);
    return {
      id: post.id,
      author_id: post.author_id,
      author_name: profile?.display_name || 'Usuario',
      author_username: profile?.username_slug || '',
      author_trust_level: profile?.forum_trust_level || 'TL0',
      author_reputation: profile?.reputation_points ?? null,
      content: post.content_html || post.content_md || '',
      is_solution: post.is_answer ?? false,
      upvotes_count: post.upvotes_count || 0,
      downvotes_count: post.downvotes_count || 0,
      created_at: post.created_at,
      edited_at: post.updated_at,
      user_vote: userVotes[post.id] ?? null,
      is_deleted: post.is_deleted ?? false,
    };
  });

  // 11. Calcular paginación
  const totalReplies = repliesCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalReplies / pageSize));

  return {
    thread,
    rootPost,
    replies,
    pagination: {
      page,
      pageSize,
      totalReplies,
      totalPages,
    },
    currentUserId,
    isAdmin,
  };
}
