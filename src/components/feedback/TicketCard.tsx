import Link from 'next/link';
import { Award, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { VoteButton } from './VoteButton';
import {
  getCategoryConfig,
  getPriorityConfig,
  getStatusLabel,
  type FeedbackStatus,
} from '@/lib/data/feedback-config';

export interface TicketCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: FeedbackStatus;
  page_url: string | null;
  created_at: string;
  user_email: string;
  vote_count?: number;
  user_has_voted?: boolean;
  author_display_name?: string | null;
  author_username?: string;
  author_karma?: number;
  isLoading: boolean;
  isLoggedIn: boolean;
  onVote: (ticketId: string) => Promise<void>;
}

export function TicketCard({
  id,
  title,
  description,
  category,
  priority,
  status,
  page_url,
  created_at,
  user_email,
  vote_count = 0,
  user_has_voted = false,
  author_display_name,
  author_username,
  author_karma,
  isLoading,
  isLoggedIn,
  onVote,
}: TicketCardProps) {
  const categoryInfo = getCategoryConfig(category);
  const CategoryIcon = categoryInfo?.icon || MessageSquare;
  const statusInfo = getStatusLabel(status);
  const StatusIcon = statusInfo.icon;
  const priorityInfo = getPriorityConfig(priority);

  return (
    <Card className="card hover:border-dungeon-600 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Vote Button */}
          <VoteButton
            ticketId={id}
            hasVoted={user_has_voted}
            voteCount={vote_count}
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            onVote={onVote}
          />

          {/* Ticket Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 flex-1">
                <CategoryIcon className={`w-5 h-5 ${categoryInfo?.color} flex-shrink-0`} />
                <h3 className="text-lg font-semibold text-dungeon-100 font-heading">{title}</h3>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {priorityInfo && priorityInfo.value !== 'all' && (
                  <span className={`px-2 py-0.5 text-xs rounded-full text-white ${priorityInfo.color}`}>
                    {priorityInfo.label}
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                  <span className={`text-sm ${statusInfo.color}`}>{statusInfo.label}</span>
                </div>
              </div>
            </div>

            <p className="text-dungeon-300 text-sm mb-3 whitespace-pre-line">{description}</p>

            <div className="flex items-center justify-between text-xs text-dungeon-500">
              <div className="flex items-center gap-3">
                <span>
                  Reportado por{' '}
                  {author_username ? (
                    <Link
                      href={`/u/${author_username}`}
                      className="text-dungeon-300 font-medium hover:text-gold-400 transition-colors"
                    >
                      {author_display_name || user_email.split('@')[0]}
                    </Link>
                  ) : (
                    <span className="text-dungeon-300 font-medium">
                      {author_display_name || user_email.split('@')[0]}
                    </span>
                  )}
                  {' '}el{' '}
                  {new Date(created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {author_karma !== undefined && author_karma > 0 && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-gold-500/10 border border-gold-500/30 rounded text-gold-400">
                    <Award className="w-3 h-3" />
                    <span className="font-semibold">{author_karma}</span>
                    <span className="text-dungeon-400">karma</span>
                  </span>
                )}
              </div>
              {page_url && (
                <a
                  href={page_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300 underline"
                >
                  Ver página
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
