'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { EyeOff, XCircle, Loader2, Pin, PinOff, Lock, Unlock } from 'lucide-react';

interface ModerationActionsProps {
  reportId: string;
  threadId: string | null;
  postId: string | null;
  isDeleted?: boolean;
  threadPinned?: boolean;
  threadLocked?: boolean;
}

export default function ModerationActions({
  reportId,
  threadId,
  postId,
  isDeleted = false,
  threadPinned = false,
  threadLocked = false,
}: ModerationActionsProps) {
  const router = useRouter();
  const supabase = createClient();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleHideContent = async () => {
    if (!confirm('¿Estás seguro de que quieres ocultar este contenido?')) return;
    setIsSubmitting(true);
    try {
      if (postId) {
        await supabase
          .from('forum_posts')
          .update({ is_deleted: true, deleted_at: new Date().toISOString() })
          .eq('id', postId);
      } else if (threadId) {
        await supabase.from('forum_threads').update({ locked: true }).eq('id', threadId);
      }
      await supabase
        .from('forum_reports')
        .update({ status: 'reviewed', resolved_at: new Date().toISOString() })
        .eq('id', reportId);
      router.refresh();
    } catch (err) {
      console.error('Error moderating content', err);
      alert('No se pudo procesar la acción');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismiss = async () => {
    if (!confirm('¿Descartar este reporte?')) return;
    setIsSubmitting(true);
    try {
      await supabase
        .from('forum_reports')
        .update({ status: 'dismissed', resolved_at: new Date().toISOString() })
        .eq('id', reportId);
      router.refresh();
    } catch (err) {
      console.error('Error dismissing report', err);
      alert('No se pudo descartar el reporte');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestore = async () => {
    if (!postId || !isDeleted) return;
    setIsSubmitting(true);
    try {
      await supabase.from('forum_posts').update({ is_deleted: false, deleted_at: null }).eq('id', postId);
      await supabase
        .from('forum_reports')
        .update({ status: 'reviewed', resolved_at: new Date().toISOString() })
        .eq('id', reportId);
      router.refresh();
    } catch (err) {
      console.error('Error restoring post', err);
      alert('No se pudo restaurar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleLock = async () => {
    if (!threadId) return;
    setIsSubmitting(true);
    try {
      await supabase.from('forum_threads').update({ locked: !threadLocked }).eq('id', threadId);
      router.refresh();
    } catch (err) {
      console.error('Error toggling lock', err);
      alert('No se pudo cambiar el estado de bloqueo');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePin = async () => {
    if (!threadId) return;
    setIsSubmitting(true);
    try {
      await supabase.from('forum_threads').update({ pinned: !threadPinned }).eq('id', threadId);
      router.refresh();
    } catch (err) {
      console.error('Error toggling pin', err);
      alert('No se pudo cambiar el estado de pin');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      <button
        onClick={handleHideContent}
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border bg-red-900/30 border-red-500/50 text-red-200 hover:bg-red-900/50 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <EyeOff className="w-4 h-4" />}
        Ocultar / Bloquear
      </button>

      <button
        onClick={handleDismiss}
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border bg-gray-900/30 border-gray-500/50 text-gray-200 hover:bg-gray-900/50 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
        Descartar
      </button>

      {postId && isDeleted && (
        <button
          onClick={handleRestore}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border bg-green-900/30 border-green-500/50 text-green-200 hover:bg-green-900/50 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <EyeOff className="w-4 h-4 rotate-180" />}
          Restaurar
        </button>
      )}

      {threadId && (
        <>
          <button
            onClick={handleTogglePin}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border bg-blue-900/30 border-blue-500/50 text-blue-200 hover:bg-blue-900/50 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : threadPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
            {threadPinned ? 'Desfijar' : 'Fijar'}
          </button>
          <button
            onClick={handleToggleLock}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border bg-orange-900/30 border-orange-500/50 text-orange-200 hover:bg-orange-900/50 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : threadLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            {threadLocked ? 'Desbloquear' : 'Bloquear'}
          </button>
        </>
      )}
    </div>
  );
}
