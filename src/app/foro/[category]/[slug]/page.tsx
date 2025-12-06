import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MessageSquare, Clock, User, Pin, Lock, CheckCircle, Eye } from 'lucide-react';
import TrustLevelBadge from '@/components/forum/TrustLevelBadge';
import VoteButtons from '@/components/forum/VoteButtons';
import ReplyEditor from '@/components/forum/ReplyEditor';
import ThreadModerationActions from '@/components/forum/ThreadModerationActions';
import ReputationBadge from '@/components/forum/ReputationBadge';
import ContentWithTooltips from '@/components/forum/ContentWithTooltips';
import PostActions from '@/components/forum/PostActions';
import PostReportButton from '@/components/forum/PostReportButton';
import { PostCard } from '@/components/forum/PostCard';
import {
  loadThreadData,
  type ForumThread,
  type ForumPost,
  type ThreadDataResult,
} from '@/lib/utils/thread-data-loader';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, slug: threadSlug } = await params;
  const { thread, rootPost } = await loadThreadData(categorySlug, threadSlug, 1, 20);

  if (!thread) {
    return { title: 'Hilo no encontrado' };
  }

  const description = rootPost?.content ? rootPost.content.substring(0, 160) : thread.title;

  return {
    title: `${thread.title} | ${thread.category_name} | Foro D&D 3.5`,
    description,
  };
}

export default async function ThreadPage({ params, searchParams }: PageProps) {
  const { category: categorySlug, slug: threadSlug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const pageSize = 20;

  const { thread, rootPost, replies, pagination, currentUserId, isAdmin } = await loadThreadData(
    categorySlug,
    threadSlug,
    page,
    pageSize
  );

  if (!thread) {
    notFound();
  }

  const isThreadAuthor = currentUserId === thread.author_id;
  const tags = thread.tags ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dungeon-950 via-dungeon-900 to-dungeon-950">
      <div className="border-b border-dungeon-800 bg-dungeon-900/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-dungeon-400">
          <Link href="/foro" className="hover:text-gold-400 transition-colors">
            Foro
          </Link>
          <span>/</span>
          <Link href={`/foro/${categorySlug}`} className="hover:text-gold-400 transition-colors">
            {thread.category_name}
          </Link>
          <span>/</span>
          <span className="text-dungeon-200 line-clamp-1">{thread.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Hero del hilo */}
        {/* Hero del hilo */}
        <div className="card p-6 lg:p-8 bg-gradient-to-br from-dungeon-900/90 via-dungeon-900 to-dungeon-900/90 shadow-2xl border-dungeon-700">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-dungeon-400">
              <Link
                href={`/foro/${categorySlug}`}
                className="rounded-full bg-dungeon-800/80 px-3 py-1 border border-dungeon-700 hover:border-gold-500/60 text-dungeon-200 transition-colors"
              >
                {thread.category_name}
              </Link>
              {thread.is_pinned && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gold-900/30 px-3 py-1 border border-gold-600/40 text-gold-300">
                  <Pin className="w-3.5 h-3.5" />
                  Fijado
                </span>
              )}
              {thread.is_locked && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-900/30 px-3 py-1 border border-red-700/40 text-red-200">
                  <Lock className="w-3.5 h-3.5" />
                  Bloqueado
                </span>
              )}
              {thread.is_solved && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-900/30 px-3 py-1 border border-green-700/40 text-green-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Resuelto
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <h1 className="font-heading text-3xl lg:text-4xl font-extrabold text-dungeon-50 leading-tight">
                  {thread.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-dungeon-300">
                  <Link
                    href={`/u/${thread.author_username}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dungeon-700 bg-dungeon-850/80 hover:border-gold-500/60 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="font-semibold">{thread.author_name}</span>
                    <TrustLevelBadge level={thread.author_trust_level} size="sm" showLabel={false} />
                    <ReputationBadge trustLevel={thread.author_trust_level} reputation={thread.author_reputation} />
                  </Link>

                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-dungeon-500" />
                    <span>{formatDate(thread.created_at)}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-dungeon-500" />
                    <span>{thread.view_count} vistas</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4 text-dungeon-500" />
                    <span>{thread.reply_count} respuestas</span>
                  </div>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full border border-dungeon-700 bg-dungeon-850/70 text-dungeon-100 text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {isAdmin && (
                <div className="w-full lg:w-72 rounded-xl border border-dungeon-800 bg-dungeon-900/70 p-4 shadow-inner">
                  <p className="text-xs uppercase tracking-wide text-dungeon-500 font-semibold mb-2">Moderacion</p>
                  <ThreadModerationActions
                    threadId={thread.id}
                    initialLocked={thread.is_locked}
                    initialPinned={thread.is_pinned}
                    canModerate={isAdmin}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),320px]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-dungeon-800 bg-dungeon-900/80 shadow-xl">
              <div className="p-6">
                {rootPost ? (
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <VoteButtons
                        postId={rootPost.id}
                        initialUpvotes={rootPost.upvotes_count}
                        initialDownvotes={rootPost.downvotes_count}
                        initialUserVote={rootPost.user_vote ?? null}
                      />
                    </div>

                    {rootPost.is_deleted ? (
                      <div className="flex-1 text-dungeon-500 text-sm">Contenido eliminado por moderacion.</div>
                    ) : (
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-dungeon-300">
                          <span className="px-2 py-1 rounded bg-dungeon-850/80 border border-dungeon-700 text-xs font-semibold">
                            Publicacion original
                          </span>
                          <Link
                            href={`/u/${rootPost.author_username}`}
                            className="flex items-center gap-2 text-dungeon-200 hover:text-gold-400 transition-colors"
                          >
                            <User className="w-4 h-4" />
                            <span className="font-semibold">{rootPost.author_name}</span>
                            <TrustLevelBadge level={rootPost.author_trust_level} size="sm" showLabel={false} />
                            <ReputationBadge trustLevel={rootPost.author_trust_level} reputation={rootPost.author_reputation} />
                          </Link>
                          <div className="flex items-center gap-1 text-dungeon-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{formatDate(rootPost.created_at)}</span>
                          </div>
                        </div>

                        <div className="prose prose-invert max-w-none">
                          <ContentWithTooltips content={rootPost.content} />
                        </div>

                        <div className="flex items-center gap-3">
                          <PostActions
                            postId={rootPost.id}
                            threadId={thread.id}
                            canEdit={currentUserId === rootPost.author_id}
                            initialContent={rootPost.content}
                          />
                          <PostReportButton threadId={thread.id} postId={rootPost.id} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-dungeon-400">Contenido no disponible.</div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-dungeon-800 bg-dungeon-900/70 shadow-lg">
              <div className="flex items-center justify-between px-6 pt-6 pb-3">
                <div>
                  <h2 className="text-xl font-semibold text-dungeon-50">Respuestas</h2>
                  <p className="text-sm text-dungeon-500">
                    {pagination.totalReplies} {pagination.totalReplies === 1 ? 'respuesta' : 'respuestas'} en este hilo
                  </p>
                </div>
                <a
                  href="#responder"
                  className="px-3 py-1.5 rounded-lg border border-gold-600 text-gold-100 bg-gold-900/20 hover:bg-gold-900/40 text-sm transition-colors"
                >
                  Responder
                </a>
              </div>

              <div className="px-6 pb-6">
                {replies.length === 0 ? (
                  <div className="bg-dungeon-850/80 rounded-xl p-8 border border-dungeon-800 text-center">
                    <MessageSquare className="w-12 h-12 text-dungeon-600 mx-auto mb-3" />
                    <p className="text-dungeon-300">Aun no hay respuestas. Se el primero en compartir tu idea.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {replies.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        threadId={thread.id}
                        isThreadAuthor={isThreadAuthor}
                        currentUserId={currentUserId}
                      />
                    ))}
                  </div>
                )}

                {pagination.totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between text-sm text-dungeon-300">
                    <span>
                      Pagina {pagination.page} de {pagination.totalPages}
                    </span>
                    <div className="flex gap-2">
                      <Link
                        href={`/foro/${categorySlug}/${threadSlug}?page=${Math.max(1, pagination.page - 1)}`}
                        className={`px-3 py-1.5 rounded-md border border-dungeon-700 ${pagination.page === 1
                          ? 'text-dungeon-600 cursor-not-allowed pointer-events-none'
                          : 'text-dungeon-200 hover:bg-dungeon-700'
                          }`}
                      >
                        Anterior
                      </Link>
                      <Link
                        href={`/foro/${categorySlug}/${threadSlug}?page=${Math.min(pagination.totalPages, pagination.page + 1)}`}
                        className={`px-3 py-1.5 rounded-md border border-dungeon-700 ${pagination.page >= pagination.totalPages
                          ? 'text-dungeon-600 cursor-not-allowed pointer-events-none'
                          : 'text-dungeon-200 hover:bg-dungeon-700'
                          }`}
                      >
                        Siguiente
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div id="responder" className="rounded-2xl border border-dungeon-800 bg-dungeon-900/80 shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-dungeon-50">Agregar respuesta</h3>
                  <p className="text-sm text-dungeon-500">Comparte un aporte util y gana reputacion</p>
                </div>
                {thread.is_locked && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-900/30 px-3 py-1 border border-red-700/40 text-red-200 text-xs font-semibold">
                    <Lock className="w-3.5 h-3.5" />
                    Hilo bloqueado
                  </span>
                )}
              </div>
              <ReplyEditor
                threadId={thread.id}
                threadSlug={threadSlug}
                categorySlug={categorySlug}
                isLocked={thread.is_locked}
              />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-dungeon-800 bg-dungeon-900/80 p-5 shadow-xl">
              <h3 className="text-sm font-semibold text-dungeon-200 mb-3">Estado del hilo</h3>
              <div className="space-y-2 text-sm text-dungeon-300">
                <div className="flex items-center justify-between">
                  <span>Vistas</span>
                  <span className="font-semibold text-dungeon-100">{thread.view_count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Respuestas</span>
                  <span className="font-semibold text-dungeon-100">{thread.reply_count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Autor</span>
                  <span className="font-semibold text-dungeon-100">{thread.author_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Creado</span>
                  <span className="font-semibold text-dungeon-100">{formatDate(thread.created_at)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-dungeon-800 bg-dungeon-900/80 p-5 shadow-xl">
              <h3 className="text-sm font-semibold text-dungeon-200 mb-2">Acciones rapidas</h3>
              <div className="space-y-2">
                <a
                  href="#responder"
                  className={`block w-full text-center px-4 py-2 rounded-lg border ${thread.is_locked
                    ? 'border-dungeon-700 text-dungeon-500 cursor-not-allowed'
                    : 'border-gold-600 text-gold-100 bg-gold-900/10 hover:bg-gold-900/30'
                    } transition-colors`}
                >
                  {thread.is_locked ? 'Hilo bloqueado' : 'Responder en este hilo'}
                </a>
                <Link
                  href="/foro"
                  className="block w-full text-center px-4 py-2 rounded-lg border border-dungeon-700 text-dungeon-200 hover:bg-dungeon-800 transition-colors"
                >
                  Volver al indice
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

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
