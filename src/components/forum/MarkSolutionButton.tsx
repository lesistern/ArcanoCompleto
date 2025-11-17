'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, Loader2 } from 'lucide-react';

interface MarkSolutionButtonProps {
  postId: string;
  threadId: string;
  isSolution: boolean;
  isThreadAuthor: boolean;
}

export default function MarkSolutionButton({
  postId,
  threadId,
  isSolution,
  isThreadAuthor,
}: MarkSolutionButtonProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Solo mostrar para autores del hilo
  if (!isThreadAuthor) {
    return null;
  }

  const handleToggleSolution = async () => {
    setIsSubmitting(true);

    try {
      // Toggle is_solution
      const { error } = await supabase
        .from('forum_posts')
        .update({ is_solution: !isSolution })
        .eq('id', postId);

      if (error) {
        console.error('Error marking solution:', error);
        alert('Error al marcar la solución. Por favor intenta nuevamente.');
        setIsSubmitting(false);
        return;
      }

      // Si estamos desmarcando la solución, actualizar el hilo
      if (isSolution) {
        await supabase
          .from('forum_threads')
          .update({ is_solved: false })
          .eq('id', threadId);
      } else {
        // Si estamos marcando como solución:
        // 1. Desmarcar cualquier otra solución existente
        await supabase
          .from('forum_posts')
          .update({ is_solution: false })
          .eq('thread_id', threadId)
          .neq('id', postId);

        // 2. Marcar el hilo como resuelto
        await supabase
          .from('forum_threads')
          .update({ is_solved: true })
          .eq('id', threadId);
      }

      // Recargar página para reflejar cambios
      router.refresh();
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Error inesperado. Por favor intenta nuevamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <button
      onClick={handleToggleSolution}
      disabled={isSubmitting}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
        isSolution
          ? 'bg-green-900/30 border border-green-500/50 text-green-300 hover:bg-green-900/50'
          : 'bg-dungeon-700 border border-dungeon-600 text-dungeon-300 hover:bg-dungeon-600'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      title={isSolution ? 'Desmarcar como solución' : 'Marcar como solución'}
    >
      {isSubmitting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <CheckCircle className="w-4 h-4" />
      )}
      {isSolution ? 'Solución' : 'Marcar como solución'}
    </button>
  );
}
