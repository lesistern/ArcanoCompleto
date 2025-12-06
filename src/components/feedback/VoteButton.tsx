import { ThumbsUp, Loader2 } from 'lucide-react';

interface VoteButtonProps {
  ticketId: string;
  hasVoted: boolean;
  voteCount: number;
  isLoading: boolean;
  isLoggedIn: boolean;
  onVote: (ticketId: string) => Promise<void>;
}

export function VoteButton({
  ticketId,
  hasVoted,
  voteCount,
  isLoading,
  isLoggedIn,
  onVote,
}: VoteButtonProps) {
  return (
    <div className="flex flex-col items-center gap-1 pt-1">
      <button
        onClick={() => onVote(ticketId)}
        disabled={isLoading || !isLoggedIn}
        className={`p-2 rounded-lg border transition-all ${
          hasVoted
            ? 'bg-gold-500/20 border-gold-500 text-gold-400'
            : 'border-dungeon-700 text-dungeon-400 hover:border-gold-500 hover:text-gold-400'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        title={!isLoggedIn ? 'Inicia sesión para votar' : hasVoted ? 'Quitar voto' : 'Votar'}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <ThumbsUp className="w-5 h-5" fill={hasVoted ? 'currentColor' : 'none'} />
        )}
      </button>
      <span
        className={`text-sm font-semibold ${voteCount && voteCount > 0 ? 'text-gold-400' : 'text-dungeon-500'}`}
      >
        {voteCount || 0}
      </span>
    </div>
  );
}
