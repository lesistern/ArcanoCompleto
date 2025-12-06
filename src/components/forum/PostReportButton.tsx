'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Flag, Loader2 } from 'lucide-react';

interface PostReportButtonProps {
  threadId: string;
  postId: string;
}

export default function PostReportButton({ threadId, postId }: PostReportButtonProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Debes iniciar sesión para reportar.');
        setLoading(false);
        return;
      }
      const { error: insertError } = await supabase.from('forum_reports').insert({
        thread_id: threadId,
        post_id: postId,
        reporter_id: user.id,
        reason: 'Contenido inapropiado',
      });
      if (insertError) {
        setError('No se pudo enviar el reporte.');
        setLoading(false);
        return;
      }
      setSent(true);
    } catch (err) {
      setError('Error al reportar.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return <span className="text-xs text-green-400">Reporte enviado</span>;
  }

  return (
    <button
      type="button"
      onClick={handleReport}
      disabled={loading}
      className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-200"
      aria-label="Reportar contenido"
    >
      {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Flag className="w-3 h-3" />}
      Reportar
      {error && <span className="text-red-400 ml-2">{error}</span>}
    </button>
  );
}
