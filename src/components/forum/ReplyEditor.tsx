'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Send } from 'lucide-react';

interface ReplyEditorProps {
  threadId: string;
  threadSlug: string;
  categorySlug: string;
  isLocked: boolean;
}

export default function ReplyEditor({
  threadId,
  threadSlug,
  categorySlug,
  isLocked,
}: ReplyEditorProps) {
  const router = useRouter();
  const supabase = createClient();

  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contentError = content.length > 0 && content.length < 10
    ? 'La respuesta debe tener al menos 10 caracteres'
    : null;

  const isFormValid = !contentError && content.trim().length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError('Por favor, escribe una respuesta válida (mínimo 10 caracteres)');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Obtener usuario actual
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('Debes iniciar sesión para responder');
        setIsSubmitting(false);
        return;
      }

      // Verificar estado de ban/restricción
      const { data: profile } = await supabase
        .from('profiles')
        .select('forum_banned_until')
        .eq('id', user.id)
        .single();

      const isBanned = profile?.forum_banned_until && new Date(profile.forum_banned_until) > new Date();

      if (isBanned) {
        setError('Tu cuenta está suspendida. No puedes responder en este momento.');
        setIsSubmitting(false);
        return;
      }

      // Insertar respuesta
      const { error: insertError } = await supabase
        .from('forum_posts')
        .insert({
          thread_id: threadId,
          author_id: user.id,
          content: content.trim(),
        });

      if (insertError) {
        console.error('Error creating reply:', insertError);
        setError('Error al enviar la respuesta. Por favor intenta nuevamente.');
        setIsSubmitting(false);
        return;
      }

      // Limpiar formulario y recargar página
      setContent('');
      router.refresh();
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Error inesperado. Por favor intenta nuevamente.');
      setIsSubmitting(false);
    }
  };

  if (isLocked) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-300">
          Este hilo está bloqueado. No se permiten nuevas respuestas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-dungeon-800 rounded-lg border border-dungeon-700 p-6">
      <h3 className="text-lg font-bold text-dungeon-100 mb-4">
        Añadir Respuesta
      </h3>

      {/* Error General */}
      {error && (
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 mb-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {/* Contenido */}
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe tu respuesta aquí... (mínimo 10 caracteres)"
          rows={6}
          className="w-full px-4 py-3 bg-dungeon-900 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:border-gold-500 transition-colors resize-vertical"
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center mt-1">
          {contentError && (
            <p className="text-xs text-red-400">{contentError}</p>
          )}
          <p className={`text-xs ml-auto ${content.length < 10 ? 'text-dungeon-500' : 'text-dungeon-400'}`}>
            {content.length} caracteres (mínimo 10)
          </p>
        </div>
      </div>

      {/* Botón Submit */}
      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="px-6 py-2.5 bg-gold-500 text-dungeon-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Responder (+2 XP)
          </>
        )}
      </button>

      <p className="text-xs text-dungeon-500 mt-3">
        Recuerda ser respetuoso y constructivo. Las respuestas de calidad pueden recibir upvotes (+10 XP).
      </p>
    </form>
  );
}
