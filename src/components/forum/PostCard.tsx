'use client';

import { CheckCircle, Clock, User } from 'lucide-react';
import Link from 'next/link';
import TrustLevelBadge, { TrustLevel } from '@/components/forum/TrustLevelBadge';
import ReputationBadge from '@/components/forum/ReputationBadge';
import VoteButtons from '@/components/forum/VoteButtons';
import MarkSolutionButton from '@/components/forum/MarkSolutionButton';
import PostActions from '@/components/forum/PostActions';
import PostReportButton from '@/components/forum/PostReportButton';
import ContentWithTooltips from '@/components/forum/ContentWithTooltips';

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

interface PostCardProps {
  post: ForumPost;
  threadId: string;
  isThreadAuthor: boolean;
  currentUserId: string | null;
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

export function PostCard({
  post,
  threadId,
  isThreadAuthor,
  currentUserId,
}: PostCardProps) {
  const isPostAuthor = currentUserId === post.author_id;

  if (post.is_deleted) {
    return (
      <div className="bg-dungeon-850 rounded-lg border border-dungeon-700 p-4 text-sm text-dungeon-500">
        Contenido eliminado por moderacion.
      </div>
    );
  }

  return (
    <div className={`card ${post.is_solution ? 'border-green-500/50 shadow-green-900/20' : 'border-dungeon-700'} shadow-md`}>
      {post.is_solution && (
        <div className="bg-green-900/30 border-b border-green-500/30 px-4 py-2 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-300 font-semibold">Solucion aceptada</span>
        </div>
      )}

      <div className="p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <VoteButtons
              postId={post.id}
              initialUpvotes={post.upvotes_count}
              initialDownvotes={post.downvotes_count}
              initialUserVote={post.user_vote ?? null}
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
              <Link
                href={`/u/${post.author_username}`}
                className="flex items-center gap-2 text-dungeon-300 hover:text-gold-400 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="font-semibold">{post.author_name}</span>
                <TrustLevelBadge level={post.author_trust_level} size="sm" showLabel={false} />
                <ReputationBadge trustLevel={post.author_trust_level} reputation={post.author_reputation ?? null} />
              </Link>

              <div className="flex items-center gap-1 text-dungeon-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDate(post.created_at)}</span>
              </div>

              {post.edited_at && <span className="text-dungeon-500 text-xs">(editado)</span>}
            </div>

            <div className="prose prose-invert max-w-none mb-4">
              <ContentWithTooltips content={post.content} />
            </div>

            <MarkSolutionButton
              postId={post.id}
              threadId={threadId}
              isSolution={post.is_solution}
              isThreadAuthor={isThreadAuthor}
            />
            <div className="flex items-center gap-3 mt-3">
              <PostActions
                postId={post.id}
                threadId={threadId}
                canEdit={isPostAuthor}
                initialContent={post.content}
              />
              <PostReportButton threadId={threadId} postId={post.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
