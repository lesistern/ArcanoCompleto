import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { MessageSquare, TrendingUp, Clock, User, Pin, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import TrustLevelBadge, { TrustLevel } from '@/components/forum/TrustLevelBadge';

interface ForumThread {
  id: string;
  title: string;
  slug: string;
  tags?: string[] | null;
  is_pinned: boolean;
  is_locked: boolean;
  is_solved: boolean;
  view_count: number;
  reply_count: number;
  created_at: string;
  author_name: string;
  author_username: string;
  author_trust_level: TrustLevel;
}

interface ForumCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  thread_count: number;
  post_count: number;
}

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

async function loadCategoryData(categorySlug: string) {
  const supabase = await createClient();

  const { data: category } = await supabase
    .from('forum_categories')
    .select('*')
    .eq('slug', categorySlug)
    .eq('is_active', true)
    .single();

  if (!category) {
    return { category: null, threads: [] };
  }

  const { data: threads } = await supabase
    .from('v_forum_threads_with_info')
    .select('*')
    .eq('category_slug', categorySlug)
    .order('pinned', { ascending: false })
    .order('last_activity_at', { ascending: false });

  const mappedThreads: ForumThread[] =
    threads?.map((thread: any) => ({
      id: thread.id,
      title: thread.title,
      slug: thread.slug,
      tags: thread.tags || [],
      is_pinned: thread.pinned ?? false,
      is_locked: thread.locked ?? false,
      is_solved: thread.is_solved ?? false,
      view_count: thread.views_count ?? 0,
      reply_count: thread.replies_count ?? 0,
      created_at: thread.created_at,
      author_name: thread.author_name || 'Usuario',
      author_username: thread.author_username || '',
      author_trust_level: thread.author_trust_level || 'TL0',
    })) || [];

  return {
    category: category as ForumCategory,
    threads: mappedThreads,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const { category } = await loadCategoryData(categorySlug);

  if (!category) {
    return {
      title: 'Categoría no encontrada',
    };
  }

  return {
    title: `${category.name} | Foro D&D 3.5`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const { category, threads } = await loadCategoryData(categorySlug);

  if (!category) {
    notFound();
  }

  const pinnedThreads = threads.filter((t) => t.is_pinned);
  const normalThreads = threads.filter((t) => !t.is_pinned);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/foro"
          className="inline-flex items-center gap-2 text-sm text-dungeon-400 hover:text-gold-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Foro
        </Link>
      </div>

      <div className="bg-dungeon-800 rounded-xl p-6 border border-dungeon-700 mb-8 shadow-lg">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-gold-500 mb-2">{category.name}</h1>
        <p className="text-dungeon-300 mb-4 text-lg">{category.description}</p>
        <div className="flex items-center gap-4 text-sm text-dungeon-400">
          <div className="flex items-center gap-1 bg-dungeon-900/50 px-3 py-1 rounded-full border border-dungeon-700">
            <MessageSquare className="w-4 h-4 text-dungeon-500" />
            <span>{category.thread_count} hilos</span>
          </div>
          <div className="flex items-center gap-1 bg-dungeon-900/50 px-3 py-1 rounded-full border border-dungeon-700">
            <MessageSquare className="w-4 h-4 text-dungeon-500" />
            <span>{category.post_count} respuestas</span>
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-end">
        <Link
          href={`/foro/nuevo?category=${categorySlug}`}
          className="btn btn-primary flex items-center gap-2"
        >
          <MessageSquare className="w-5 h-5" />
          Crear Hilo
        </Link>
      </div>

      {pinnedThreads.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-dungeon-100 mb-3 flex items-center gap-2">
            <Pin className="w-5 h-5 text-gold-400" />
            Hilos Destacados
          </h2>
          <div className="space-y-2">
            {pinnedThreads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} categorySlug={categorySlug} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-bold text-dungeon-100 mb-3">
          {pinnedThreads.length > 0 ? 'Todos los Hilos' : 'Hilos'}
        </h2>
        {normalThreads.length === 0 ? (
          <div className="bg-dungeon-800 rounded-lg p-8 border border-dungeon-700 text-center">
            <MessageSquare className="w-12 h-12 text-dungeon-600 mx-auto mb-3" />
            <p className="text-dungeon-400">No hay hilos en esta categoría aún.</p>
            <Link
              href={`/foro/nuevo?category=${categorySlug}`}
              className="inline-block mt-4 text-gold-400 hover:text-gold-300 transition-colors"
            >
              ¡Sé el primero en crear uno!
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {normalThreads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} categorySlug={categorySlug} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ThreadCard({ thread, categorySlug }: { thread: ForumThread; categorySlug: string }) {
  return (
    <Link href={`/foro/${categorySlug}/${thread.slug}`} className="block group">
      <div className="card p-4 hover:border-gold-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/5 group-hover:-translate-y-0.5">
        <div className="flex items-start gap-4">
          <div className="flex flex-col gap-2 text-dungeon-500 mt-1">
            {thread.is_pinned && <Pin className="w-4 h-4 text-gold-500" />}
            {thread.is_locked && <Lock className="w-4 h-4 text-red-500" />}
            {thread.is_solved && <CheckCircle className="w-4 h-4 text-green-500" />}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-dungeon-100 group-hover:text-gold-400 transition-colors mb-2 line-clamp-2 font-heading">
              {thread.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 text-sm text-dungeon-400">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{thread.author_name}</span>
                <TrustLevelBadge level={thread.author_trust_level} size="sm" showLabel={false} />
              </div>

              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimeAgo(thread.created_at)}</span>
              </div>
            </div>

            {thread.tags && thread.tags.length > 0 && (
              <div className="flex gap-1 mt-2 flex-wrap">
                {thread.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-dungeon-900/50 border border-dungeon-700 text-dungeon-300 rounded text-xs">
                    #{tag}
                  </span>
                ))}
                {thread.tags.length > 4 && (
                  <span className="px-2 py-0.5 bg-dungeon-900/50 border border-dungeon-700 text-dungeon-300 rounded text-xs">
                    +{thread.tags.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm self-center">
            <div className="flex flex-col items-center gap-0.5 min-w-[3rem]">
              <span className={`font-bold text-lg ${thread.reply_count > 0 ? 'text-green-400' : 'text-dungeon-500'}`}>
                {thread.reply_count}
              </span>
              <span className="text-xs text-dungeon-500">respuestas</span>
            </div>

            <div className="flex flex-col items-center gap-0.5 min-w-[3rem] border-l border-dungeon-700 pl-4">
              <span className="font-bold text-lg text-dungeon-400">{thread.view_count}</span>
              <span className="text-xs text-dungeon-500">vistas</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'hace un momento';
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`;
  if (seconds < 604800) return `hace ${Math.floor(seconds / 86400)} días`;

  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}
