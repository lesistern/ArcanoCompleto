import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  MessageSquare,
  TrendingUp,
  Clock,
  User,
  Pin,
  Lock,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import TrustLevelBadge, { TrustLevel } from '@/components/forum/TrustLevelBadge';

interface ForumThread {
  id: string;
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

  // Cargar categoría
  const { data: category, error: categoryError } = await supabase
    .from('forum_categories')
    .select('*')
    .eq('slug', categorySlug)
    .eq('is_active', true)
    .single();

  if (categoryError || !category) {
    return { category: null, threads: [] };
  }

  // Cargar hilos de la categoría
  const { data: threads, error: threadsError } = await supabase
    .from('v_forum_threads_with_info')
    .select('*')
    .eq('category_slug', categorySlug)
    .order('is_pinned', { ascending: false })
    .order('last_activity_at', { ascending: false });

  if (threadsError) {
    console.error('Error loading threads:', threadsError);
  }

  return {
    category: category as ForumCategory,
    threads: (threads as ForumThread[]) || [],
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

  // Separar hilos pinneados de normales
  const pinnedThreads = threads.filter(t => t.is_pinned);
  const normalThreads = threads.filter(t => !t.is_pinned);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/foro"
          className="inline-flex items-center gap-2 text-sm text-dungeon-400 hover:text-gold-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Foro
        </Link>
      </div>

      {/* Header de Categoría */}
      <div className="bg-dungeon-800 rounded-lg p-6 border border-dungeon-700 mb-8">
        <h1 className="text-3xl font-bold text-gold-400 mb-2">
          {category.name}
        </h1>
        <p className="text-dungeon-300 mb-4">{category.description}</p>
        <div className="flex items-center gap-4 text-sm text-dungeon-400">
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{category.thread_count} hilos</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{category.post_count} respuestas</span>
          </div>
        </div>
      </div>

      {/* Botón Crear Hilo */}
      <div className="mb-6 flex justify-end">
        <Link
          href={`/foro/nuevo?category=${categorySlug}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 text-dungeon-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          Crear Hilo
        </Link>
      </div>

      {/* Hilos Pinneados */}
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

      {/* Hilos Normales */}
      <div>
        <h2 className="text-lg font-bold text-dungeon-100 mb-3">
          {pinnedThreads.length > 0 ? 'Todos los Hilos' : 'Hilos'}
        </h2>
        {normalThreads.length === 0 ? (
          <div className="bg-dungeon-800 rounded-lg p-8 border border-dungeon-700 text-center">
            <MessageSquare className="w-12 h-12 text-dungeon-600 mx-auto mb-3" />
            <p className="text-dungeon-400">
              No hay hilos en esta categoría aún.
            </p>
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

// Componente ThreadCard
function ThreadCard({ thread, categorySlug }: { thread: ForumThread; categorySlug: string }) {
  return (
    <Link
      href={`/foro/${categorySlug}/${thread.slug}`}
      className="block"
    >
      <div className="bg-dungeon-800 rounded-lg p-4 border border-dungeon-700 hover:border-gold-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/10">
        <div className="flex items-start gap-4">
          {/* Iconos de Estado */}
          <div className="flex flex-col gap-2 text-dungeon-500">
            {thread.is_pinned && <Pin className="w-4 h-4 text-gold-400" />}
            {thread.is_locked && <Lock className="w-4 h-4 text-red-400" />}
            {thread.is_solved && <CheckCircle className="w-4 h-4 text-green-400" />}
          </div>

          {/* Contenido Principal */}
          <div className="flex-1 min-w-0">
            {/* Título */}
            <h3 className="text-lg font-semibold text-dungeon-100 hover:text-gold-400 transition-colors mb-2 line-clamp-2">
              {thread.title}
            </h3>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-dungeon-400">
              {/* Autor */}
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{thread.author_name}</span>
                <TrustLevelBadge level={thread.author_trust_level} size="sm" showLabel={false} />
              </div>

              {/* Tiempo */}
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimeAgo(thread.created_at)}</span>
              </div>

              {/* Tags */}
              {thread.tags && thread.tags.length > 0 && (
                <div className="flex gap-1">
                  {thread.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-dungeon-700 text-dungeon-300 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {thread.tags.length > 3 && (
                    <span className="px-2 py-0.5 bg-dungeon-700 text-dungeon-300 rounded text-xs">
                      +{thread.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Estadísticas */}
          <div className="flex items-center gap-4 text-sm">
            {/* Votos */}
            <div className="flex items-center gap-1 text-dungeon-400">
              <TrendingUp className={`w-4 h-4 ${thread.vote_score > 0 ? 'text-green-400' : ''}`} />
              <span className={thread.vote_score > 0 ? 'text-green-400 font-semibold' : ''}>
                {thread.vote_score}
              </span>
            </div>

            {/* Respuestas */}
            <div className="flex items-center gap-1 text-dungeon-400">
              <MessageSquare className="w-4 h-4" />
              <span>{thread.reply_count}</span>
            </div>

            {/* Vistas */}
            <div className="text-dungeon-500 text-xs">
              {thread.view_count} vistas
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Función helper para formatear tiempo
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
