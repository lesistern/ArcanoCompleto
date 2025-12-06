'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Pencil, Trash2, X, Check } from 'lucide-react';

interface PostActionsProps {
  postId: string;
  threadId: string;
  canEdit: boolean;
  initialContent: string;
}

export default function PostActions({ postId, threadId, canEdit, initialContent }: PostActionsProps) {
  const router = useRouter();
  const supabase = createClient();
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!canEdit) return null;

  const handleDelete = async () => {
    if (!confirm('¿Eliminar esta respuesta?')) return;
    setLoading(true);
    setError(null);
    const { error: delError } = await supabase.from('forum_posts').delete().eq('id', postId);
    if (delError) {
      setError('No se pudo eliminar. Intenta de nuevo.');
      setLoading(false);
      return;
    }
    router.refresh();
  };

  const handleSave = async () => {
    if (content.trim().length < 5) {
      setError('El contenido debe tener al menos 5 caracteres.');
      return;
    }
    setLoading(true);
    setError(null);
    const { error: updError } = await supabase
      .from('forum_posts')
      .update({
        content_md: content.trim(),
        content_html: content.trim(),
      })
      .eq('id', postId);
    if (updError) {
      setError('No se pudo guardar. Intenta de nuevo.');
      setLoading(false);
      return;
    }
    setEditing(false);
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-3 text-sm text-dungeon-400">
      {editing ? (
        <div className="w-full">
          {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
          <textarea
            className="w-full bg-dungeon-900 border border-dungeon-700 rounded-md px-3 py-2 text-dungeon-100 mb-2"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Edita tu respuesta"
            disabled={loading}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-500 disabled:opacity-50"
            >
              <Check className="w-4 h-4" /> Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              disabled={loading}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-dungeon-700 text-dungeon-200 rounded-md hover:bg-dungeon-600 disabled:opacity-50"
            >
              <X className="w-4 h-4" /> Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              setContent(initialContent);
              setEditing(true);
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-dungeon-700 text-dungeon-200 rounded-md hover:bg-dungeon-600"
          >
            <Pencil className="w-4 h-4" /> Editar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-700 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" /> Borrar
          </button>
          {error && <span className="text-red-400 text-xs">{error}</span>}
        </>
      )}
    </div>
  );
}
