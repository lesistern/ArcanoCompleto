import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  ArrowLeft,
  MessageSquare,
  Clock,
  User,
  Pin,
  Lock,
  CheckCircle,
  Eye,
  Tag
} from 'lucide-react';
import TrustLevelBadge, { TrustLevel } from '@/components/forum/TrustLevelBadge';
import VoteButtons from '@/components/forum/VoteButtons';
import ReplyEditor from '@/components/forum/ReplyEditor';
import MarkSolutionButton from '@/components/forum/MarkSolutionButton';

interface ForumThread {
  id: string;
  category_id: string;
  category_name: string;
  category_slug: string;
  author_id: string;
  author_name: string;
  author_username: string;
  author_trust_level: TrustLevel;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  is_pinned: boolean;
  is_locked: boolean;
  is_solved: boolean;
  view_count: number;
  reply_count: number;
  vote_score: number;
  created_at: string;
}

interface ForumPost {
  id: string;
  author_id: string;
  author_name: string;
  author_username: string;
  author_trust_level: TrustLevel;
  content: string;
  is_solution: boolean;
  vote_score: number;
  created_at: string;
  edited_at: string | null;
}

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

async function loadThreadData(categorySlug: string, threadSlug: string) {
  const supabase = await createClient();

  // Obtener usuario actual
  const { data: { user } } = await supabase.auth.getUser();
  const currentUserId = user?.id || null;

  // Cargar hilo
  const { data: thread, error: threadError } = await supabase
    .from('v_forum_threads_with_info')
    .select('*')
    .eq('category_slug', categorySlug)
    .eq('slug', threadSlug)
    .single();

  if (threadError || !thread) {
    return { thread: null, posts: [], currentUserId };
  }

  // Incrementar view_count
  await supabase
    .from('forum_threads')
    .update({ view_count: thread.view_count + 1 })
    .eq('id', thread.id);

  // Cargar posts/respuestas
  const { data: posts, error: postsError } = await supabase
    .from('forum_posts')
    .select(`
      id,
      author_id,
      content,
      is_solution,
      vote_score,
      created_at,
      edited_at,
      profiles:author_id (
        display_name,
        username_slug,
        forum_trust_level
      )
    `)
    .eq('thread_id', thread.id)
    .is('parent_post_id', null)
    .order('is_solution', { ascending: false })
    .order('created_at', { ascending: true });

  if (postsError) {
    console.error('Error loading posts:', postsError);
  }

  // Transformar posts para incluir datos del autor
  const formattedPosts = (posts || []).map((post: any) => ({
    id: post.id,
    author_id: post.author_id,
    author_name: post.profiles?.display_name || 'Usuario',
    author_username: post.profiles?.username_slug || '',
    author_trust_level: post.profiles?.forum_trust_level || 'TL0',
    content: post.content,
    is_solution: post.is_solution,
    vote_score: post.vote_score,
    created_at: post.created_at,
    edited_at: post.edited_at,
  }));

  return {
    thread: thread as ForumThread,
    posts: formattedPosts as ForumPost[],
    currentUserId,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, slug: threadSlug } = await params;
  const { thread } = await loadThreadData(categorySlug, threadSlug);

  if (!thread) {
    return {
      title: 'Hilo no encontrado',
    };
  }

  return {
    title: `${thread.title} | ${thread.category_name} | Foro D&D 3.5`,
    description: thread.content.substring(0, 160),
  };
}

export default async function ThreadPage({ params }: PageProps) {
  const { category: categorySlug, slug: threadSlug } = await params;
  const { thread, posts, currentUserId } = await loadThreadData(categorySlug, threadSlug);

  if (!thread) {
    notFound();
  }

  const isThreadAuthor = currentUserId === thread.author_id;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-dungeon-400">
        <Link href="/foro" className="hover:text-gold-400 transition-colors">
          Foro
        </Link>
        <span>/</span>
        <Link
          href={`/foro/${categorySlug}`}
          className="hover:text-gold-400 transition-colors"
        >
          {thread.category_name}
        </Link>
        <span>/</span>
        <span className="text-dungeon-300">{thread.title}</span>
      </div>

      {/* Header del Hilo */}
      <div className="bg-dungeon-800 rounded-lg border border-dungeon-700 mb-6">
        {/* Título y Badges */}
        <div className="p-6 border-b border-dungeon-700">
          <div className="flex items-start gap-3 mb-4">
            {thread.is_pinned && (
              <Pin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
            )}
            {thread.is_solved && (
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
            )}
            {thread.is_locked && (
              <Lock className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
            )}
            <h1 className="text-3xl font-bold text-dungeon-100 flex-1">
              {thread.title}
            </h1>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-dungeon-400">
            <Link
              href={`/u/${thread.author_username}`}
              className="flex items-center gap-2 hover:text-gold-400 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>{thread.author_name}</span>
              <TrustLevelBadge level={thread.author_trust_level} size="sm" showLabel={false} />
            </Link>

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatDate(thread.created_at)}</span>
            </div>

            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{thread.view_count} vistas</span>
            </div>

            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{thread.reply_count} respuestas</span>
            </div>
          </div>

          {/* Tags */}
          {thread.tags && thread.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-4">
              <Tag className="w-4 h-4 text-dungeon-500" />
              <div className="flex flex-wrap gap-2">
                {thread.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-dungeon-700 text-dungeon-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contenido del Hilo */}
        <div className="p-6">
          <div className="flex gap-4">
            {/* Votación */}
            <div className="flex-shrink-0">
              <VoteButtons
                targetType="thread"
                targetId={thread.id}
                initialVoteScore={thread.vote_score}
              />
            </div>

            {/* Contenido */}
            <div className="flex-1 prose prose-invert max-w-none">
              <div className="text-dungeon-200 whitespace-pre-wrap">
                {thread.content}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Respuestas */}
      <div>
        <h2 className="text-2xl font-bold text-dungeon-100 mb-4">
          {posts.length} {posts.length === 1 ? 'Respuesta' : 'Respuestas'}
        </h2>

        {posts.length === 0 ? (
          <div className="bg-dungeon-800 rounded-lg p-8 border border-dungeon-700 text-center">
            <MessageSquare className="w-12 h-12 text-dungeon-600 mx-auto mb-3" />
            <p className="text-dungeon-400">
              No hay respuestas aún. ¡Sé el primero en responder!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                threadId={thread.id}
                isThreadAuthor={isThreadAuthor}
              />
            ))}
          </div>
        )}
      </div>

      {/* Editor de Respuestas */}
      <div className="mt-8">
        <ReplyEditor
          threadId={thread.id}
          threadSlug={threadSlug}
          categorySlug={categorySlug}
          isLocked={thread.is_locked}
        />
      </div>
    </div>
  );
}

// Componente PostCard
function PostCard({
  post,
  threadId,
  isThreadAuthor,
}: {
  post: ForumPost;
  threadId: string;
  isThreadAuthor: boolean;
}) {
  return (
    <div className={`bg-dungeon-800 rounded-lg border ${post.is_solution ? 'border-green-500/50' : 'border-dungeon-700'}`}>
      {post.is_solution && (
        <div className="bg-green-900/30 border-b border-green-500/30 px-4 py-2 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-300 font-semibold">
            Solución Aceptada
          </span>
        </div>
      )}

      <div className="p-6">
        <div className="flex gap-4">
          {/* Votación */}
          <div className="flex-shrink-0">
            <VoteButtons
              targetType="post"
              targetId={post.id}
              initialVoteScore={post.vote_score}
            />
          </div>

          {/* Contenido */}
          <div className="flex-1">
            {/* Header con autor */}
            <div className="flex items-center gap-3 mb-4 text-sm">
              <Link
                href={`/u/${post.author_username}`}
                className="flex items-center gap-2 text-dungeon-300 hover:text-gold-400 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="font-semibold">{post.author_name}</span>
                <TrustLevelBadge level={post.author_trust_level} size="sm" showLabel={false} />
              </Link>

              <div className="flex items-center gap-1 text-dungeon-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDate(post.created_at)}</span>
              </div>

              {post.edited_at && (
                <span className="text-dungeon-500 text-xs">
                  (editado)
                </span>
              )}
            </div>

            {/* Contenido de la respuesta */}
            <div className="prose prose-invert max-w-none mb-4">
              <div className="text-dungeon-200 whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            {/* Botón Marcar como Solución */}
            <MarkSolutionButton
              postId={post.id}
              threadId={threadId}
              isSolution={post.is_solution}
              isThreadAuthor={isThreadAuthor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Función helper para formatear fecha
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
