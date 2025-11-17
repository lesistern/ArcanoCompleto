'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, XCircle, UserX, Loader2 } from 'lucide-react';

interface ModerationActionsProps {
  reportId: string;
  threadId: string | null;
  postId: string | null;
  reportedUserId: string | null;
}

export default function ModerationActions({
  reportId,
  threadId,
  postId,
  reportedUserId,
}: ModerationActionsProps) {
  const router = useRouter();
  const supabase = createClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  // Ocultar contenido
  const handleHideContent = async () => {
    if (!confirm('¿Estás seguro de que quieres ocultar este contenido?')) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (threadId && !postId) {
        // Ocultar hilo
        const { error } = await supabase
          .from('forum_threads')
          .update({ is_hidden: true })
          .eq('id', threadId);

        if (error) throw error;
      } else if (postId) {
        // Ocultar post
        const { error } = await supabase
          .from('forum_posts')
          .update({ is_hidden: true })
          .eq('id', postId);

        if (error) throw error;
      }

      // Marcar reporte como revisado
      await supabase
        .from('forum_reports')
        .update({ status: 'reviewed' })
        .eq('id', reportId);

      alert('Contenido ocultado exitosamente');
      router.refresh();
    } catch (err) {
      console.error('Error ocultando contenido:', err);
      alert('Error al ocultar el contenido');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Descartar reporte
  const handleDismissReport = async () => {
    if (!confirm('¿Estás seguro de que quieres descartar este reporte?')) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('forum_reports')
        .update({ status: 'dismissed' })
        .eq('id', reportId);

      if (error) throw error;

      alert('Reporte descartado');
      router.refresh();
    } catch (err) {
      console.error('Error descartando reporte:', err);
      alert('Error al descartar el reporte');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Suspender usuario
  const handleSuspendUser = async (duration: number, reason: string) => {
    if (!reportedUserId) return;

    setIsSubmitting(true);

    try {
      const suspendedUntil = new Date();
      suspendedUntil.setDate(suspendedUntil.getDate() + duration);

      const { error } = await supabase
        .from('forum_user_suspensions')
        .insert({
          user_id: reportedUserId,
          reason,
          suspended_until: suspendedUntil.toISOString(),
        });

      if (error) throw error;

      // Marcar reporte como revisado
      await supabase
        .from('forum_reports')
        .update({ status: 'reviewed' })
        .eq('id', reportId);

      alert(`Usuario suspendido por ${duration} día${duration > 1 ? 's' : ''}`);
      setShowSuspendModal(false);
      router.refresh();
    } catch (err) {
      console.error('Error suspendiendo usuario:', err);
      alert('Error al suspender el usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {/* Botón Ocultar */}
        <button
          onClick={handleHideContent}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border bg-purple-900/30 border-purple-500/50 text-purple-300 hover:bg-purple-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <EyeOff className="w-4 h-4" />
          )}
          Ocultar
        </button>

        {/* Botón Descartar */}
        <button
          onClick={handleDismissReport}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border bg-dungeon-700 border-dungeon-600 text-dungeon-300 hover:bg-dungeon-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
          Descartar
        </button>

        {/* Botón Suspender Usuario */}
        {reportedUserId && (
          <button
            onClick={() => setShowSuspendModal(true)}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border bg-red-900/30 border-red-500/50 text-red-300 hover:bg-red-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserX className="w-4 h-4" />
            Suspender Usuario
          </button>
        )}
      </div>

      {/* Modal de Suspensión */}
      {showSuspendModal && (
        <SuspendModal
          onClose={() => setShowSuspendModal(false)}
          onConfirm={handleSuspendUser}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}

// Modal de Suspensión
function SuspendModal({
  onClose,
  onConfirm,
  isSubmitting,
}: {
  onClose: () => void;
  onConfirm: (duration: number, reason: string) => void;
  isSubmitting: boolean;
}) {
  const [duration, setDuration] = useState(7);
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Por favor ingresa un motivo para la suspensión');
      return;
    }
    onConfirm(duration, reason);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dungeon-800 rounded-lg border border-red-500/50 max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
          <UserX className="w-5 h-5" />
          Suspender Usuario
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Duración */}
          <div className="mb-4">
            <label
              htmlFor="duration"
              className="block text-sm font-semibold text-dungeon-200 mb-2"
            >
              Duración de la suspensión
            </label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-4 py-2 bg-dungeon-900 border border-dungeon-600 rounded-lg text-dungeon-100 focus:outline-none focus:border-red-500 transition-colors"
              disabled={isSubmitting}
            >
              <option value={1}>1 día</option>
              <option value={3}>3 días</option>
              <option value={7}>7 días (1 semana)</option>
              <option value={14}>14 días (2 semanas)</option>
              <option value={30}>30 días (1 mes)</option>
              <option value={90}>90 días (3 meses)</option>
              <option value={365}>365 días (1 año)</option>
            </select>
          </div>

          {/* Motivo */}
          <div className="mb-6">
            <label
              htmlFor="reason"
              className="block text-sm font-semibold text-dungeon-200 mb-2"
            >
              Motivo de la suspensión <span className="text-red-400">*</span>
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explica por qué se suspende al usuario..."
              rows={4}
              className="w-full px-4 py-2 bg-dungeon-900 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:border-red-500 transition-colors resize-vertical"
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Suspendiendo...
                </>
              ) : (
                <>
                  <UserX className="w-4 h-4" />
                  Suspender
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-dungeon-700 text-dungeon-300 font-semibold rounded-lg hover:bg-dungeon-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
