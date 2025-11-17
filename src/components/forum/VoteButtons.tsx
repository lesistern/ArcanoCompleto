'use client';

import { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface VoteButtonsProps {
  targetType: 'thread' | 'post';
  targetId: string;
  initialVoteScore: number;
  initialUserVote?: 1 | -1 | null;
}

export default function VoteButtons({
  targetType,
  targetId,
  initialVoteScore,
  initialUserVote = null,
}: VoteButtonsProps) {
  const [voteScore, setVoteScore] = useState(initialVoteScore);
  const [userVote, setUserVote] = useState<1 | -1 | null>(initialUserVote);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (value: 1 | -1) => {
    setIsVoting(true);

    try {
      const supabase = createClient();

      // Verificar autenticación
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Debes iniciar sesión para votar');
        return;
      }

      // Si el usuario ya votó con el mismo valor, eliminar voto
      if (userVote === value) {
        const { error } = await supabase
          .from('forum_votes')
          .delete()
          .eq('user_id', user.id)
          .eq(targetType === 'thread' ? 'thread_id' : 'post_id', targetId);

        if (error) throw error;

        // Actualizar UI
        setVoteScore(voteScore - value);
        setUserVote(null);
      } else {
        // Si el usuario ya votó con valor opuesto, actualizar voto
        if (userVote !== null) {
          const { error } = await supabase
            .from('forum_votes')
            .delete()
            .eq('user_id', user.id)
            .eq(targetType === 'thread' ? 'thread_id' : 'post_id', targetId);

          if (error) throw error;
        }

        // Insertar nuevo voto
        const voteData = {
          user_id: user.id,
          vote_value: value,
          ...(targetType === 'thread' ? { thread_id: targetId } : { post_id: targetId }),
        };

        const { error } = await supabase
          .from('forum_votes')
          .insert(voteData);

        if (error) {
          // Error específico para usuarios que no pueden votar (TL0)
          if (error.message.includes('Users can vote if TL1+')) {
            alert('Necesitas al menos 100 XP (Trust Level 1) para votar. ¡Sigue participando en el foro!');
            return;
          }
          throw error;
        }

        // Actualizar UI
        const scoreDelta = userVote !== null ? (value - userVote) : value;
        setVoteScore(voteScore + scoreDelta);
        setUserVote(value);
      }
    } catch (error) {
      console.error('Error voting:', error);
      alert('Error al votar. Por favor intenta nuevamente.');
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Upvote */}
      <button
        onClick={() => handleVote(1)}
        disabled={isVoting}
        className={`p-1.5 rounded transition-colors ${
          userVote === 1
            ? 'bg-green-500/20 text-green-400'
            : 'text-dungeon-400 hover:bg-green-500/10 hover:text-green-400'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        title="Upvote (+10 XP al autor)"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Score */}
      <div
        className={`text-sm font-bold min-w-[2rem] text-center ${
          voteScore > 0
            ? 'text-green-400'
            : voteScore < 0
            ? 'text-red-400'
            : 'text-dungeon-400'
        }`}
      >
        {voteScore}
      </div>

      {/* Downvote */}
      <button
        onClick={() => handleVote(-1)}
        disabled={isVoting}
        className={`p-1.5 rounded transition-colors ${
          userVote === -1
            ? 'bg-red-500/20 text-red-400'
            : 'text-dungeon-400 hover:bg-red-500/10 hover:text-red-400'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        title="Downvote (-1 XP costo para ti)"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </div>
  );
}
