'use client';

import { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface VoteButtonsProps {
  postId: string;
  initialUpvotes: number;
  initialDownvotes: number;
  initialUserVote?: 1 | -1 | null;
}

export default function VoteButtons({
  postId,
  initialUpvotes,
  initialDownvotes,
  initialUserVote = null,
}: VoteButtonsProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<1 | -1 | null>(initialUserVote);
  const [isVoting, setIsVoting] = useState(false);

  const voteScore = upvotes - downvotes;

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

      let newUpvotes = upvotes;
      let newDownvotes = downvotes;

      // Si el usuario ya votó con el mismo valor, eliminar voto
      if (userVote === value) {
        const { error } = await supabase
          .from('forum_post_votes')
          .delete()
          .eq('user_id', user.id)
          .eq('post_id', postId);

        if (error) throw error;

        if (value === 1) newUpvotes = Math.max(0, upvotes - 1);
        if (value === -1) newDownvotes = Math.max(0, downvotes - 1);

        await supabase
          .from('forum_posts')
          .update({
            upvotes_count: newUpvotes,
            downvotes_count: newDownvotes,
          })
          .eq('id', postId);

        setUpvotes(newUpvotes);
        setDownvotes(newDownvotes);
        setUserVote(null);
      } else {
        // Si el usuario tenía voto contrario, retirarlo primero
        if (userVote !== null) {
          const { error } = await supabase
            .from('forum_post_votes')
            .delete()
            .eq('user_id', user.id)
            .eq('post_id', postId);

          if (error) throw error;

          if (userVote === 1) newUpvotes = Math.max(0, newUpvotes - 1);
          if (userVote === -1) newDownvotes = Math.max(0, newDownvotes - 1);
        }

        // Insertar nuevo voto
        const { error } = await supabase
          .from('forum_post_votes')
          .insert({
            user_id: user.id,
            post_id: postId,
            value,
          });

        if (error) {
          if (error.message.includes('Users can vote if TL1+')) {
            alert('Necesitas al menos 100 XP (Trust Level 1) para votar. ¡Sigue participando en el foro!');
            return;
          }
          throw error;
        }

        if (value === 1) newUpvotes += 1;
        if (value === -1) newDownvotes += 1;

        await supabase
          .from('forum_posts')
          .update({
            upvotes_count: newUpvotes,
            downvotes_count: newDownvotes,
          })
          .eq('id', postId);

        setUpvotes(newUpvotes);
        setDownvotes(newDownvotes);
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
