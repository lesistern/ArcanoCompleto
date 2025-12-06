'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Send, Hash, Sparkles, Eye, Edit3, BarChart2, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import CategorySelector from './CategorySelector';
import PollCreator from './PollCreator';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import ReactMarkdown from 'react-markdown';

// Dynamic import of TiptapEditor to avoid SSR issues
const PostEditor = dynamic(() => import('./ThreadEditor'), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full flex items-center justify-center bg-dungeon-900/30 border border-dungeon-800 rounded-2xl">
      <div className="flex flex-col items-center gap-2 text-dungeon-400">
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
        <p>Cargando editor...</p>
      </div>
    </div>
  ),
});

interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

interface NewThreadFormProps {
  categories: Category[];
  defaultCategorySlug?: string;
}

interface PollOption {
  id: string;
  text: string;
}

const TITLE_LIMIT = 300;
const TAG_SUGGESTIONS = [
  'barbaro', 'bardo', 'clerigo', 'druida', 'explorador', 'hechizo', 'combate',
  'reglas', 'aventura', 'objetos', 'monstruos', 'trasfondo', 'clase', 'nivel',
  'conjuro', 'dote', 'faq', 'build', 'guia', 'homebrew'
];

export default function NewThreadForm({ categories, defaultCategorySlug }: NewThreadFormProps) {
  const router = useRouter();
  const supabase = createClient();

  // State with Auto-save
  const [categoryId, setCategoryId] = useLocalStorage<string>('draft_category', categories.find((c) => c.slug === defaultCategorySlug)?.id || '');
  const [title, setTitle] = useLocalStorage<string>('draft_title', '');
  const [contentMd, setContentMd] = useLocalStorage<string>('draft_content', '');
  const [tags, setTags] = useLocalStorage<string[]>('draft_tags', []);

  // Local State
  const [contentJson, setContentJson] = useState<any>(null);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [showPoll, setShowPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<PollOption[]>([{ id: '1', text: '' }, { id: '2', text: '' }]);
  const [canUploadImages, setCanUploadImages] = useState(false);

  const trimmedTitle = title.trim();
  const trimmedContent = contentMd.trim();

  const titleError =
    trimmedTitle.length > 0 && (trimmedTitle.length < 10 || trimmedTitle.length > TITLE_LIMIT)
      ? `El título debe tener entre 10 y ${TITLE_LIMIT} caracteres`
      : null;

  const contentError =
    trimmedContent.length > 0 && trimmedContent.length < 20 ? 'El contenido debe tener al menos 20 caracteres' : null;

  const categoryError = !categoryId ? 'Debes seleccionar una categoría' : null;

  const isFormValid = !titleError && !contentError && !categoryError && trimmedTitle && trimmedContent && categoryId;

  const addTag = () => {
    const val = tagInput.trim().toLowerCase();
    if (!val) return;
    if (tags.includes(val)) return;
    if (tags.length >= 5) return;
    setTags([...tags, val]);
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const clearDraft = () => {
    if (confirm('¿Estás seguro de que quieres borrar el borrador?')) {
      setTitle('');
      setContentMd('');
      setTags([]);
      setCategoryId('');
      setPollQuestion('');
      setPollOptions([{ id: '1', text: '' }, { id: '2', text: '' }]);
      setShowPoll(false);
    }
  };

  const filteredSuggestions = useMemo(() => {
    const q = tagInput.trim().toLowerCase();
    if (!q) return [];
    return TAG_SUGGESTIONS.filter((s) => s.includes(q) && !tags.includes(s)).slice(0, 6);
  }, [tagInput, tags]);

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Only select columns that actually exist in the profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      // For now, disable image uploads until we properly configure patron detection
      // TODO: Add proper patron/collaborator detection when those columns are added to profiles table
      setCanUploadImages(false);
    };
    loadProfile();
  }, [supabase]);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError('Por favor, completa todos los campos correctamente');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError('Debes iniciar sesión para crear un hilo');
        setIsSubmitting(false);
        return;
      }

      const baseSlug = generateSlug(trimmedTitle);
      let finalSlug = baseSlug;
      let counter = 1;

      while (true) {
        const { data: existingThread } = await supabase.from('forum_threads').select('id').eq('slug', finalSlug).single();
        if (!existingThread) break;
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      // Prepare Poll Data if active
      const pollData = showPoll && pollQuestion.trim() ? {
        question: pollQuestion,
        options: pollOptions.filter(o => o.text.trim()).map(o => o.text.trim())
      } : null;

      const { data: newThread, error: insertError } = await supabase
        .from('forum_threads')
        .insert({
          category_id: categoryId,
          author_id: user.id,
          title: trimmedTitle,
          slug: finalSlug,
          is_question: categories.find(c => c.id === categoryId)?.slug === 'dudas', // Auto-detect question type
          tags: tags.length ? tags : null,
          poll_data: pollData, // Assuming DB supports this column, otherwise it will be ignored or error (handled by try/catch)
        })
        .select('id')
        .single();

      if (insertError || !newThread) {
        console.error('Error creating thread:', insertError);
        setError('Error al crear el hilo. Por favor intenta nuevamente.');
        setIsSubmitting(false);
        return;
      }

      const { error: postError } = await supabase.from('forum_posts').insert({
        thread_id: newThread.id,
        author_id: user.id,
        content_md: contentMd,
        content_html: contentMd, // In a real app we might want to render HTML server-side or sanitize here
        content_json: contentJson,
      });

      if (postError) {
        console.error('Error creating post:', postError);
        setError('Error al guardar el contenido. Por favor intenta nuevamente.');
        setIsSubmitting(false);
        return;
      }

      // Clear drafts on success
      setTitle('');
      setContentMd('');
      setTags([]);
      setCategoryId('');

      router.push(`/foro/${categories.find((c) => c.id === categoryId)?.slug || 'foro'}/${finalSlug}`);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Error inesperado. Por favor intenta nuevamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
      {error && (
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-sm text-red-200 animate-pulse">
          {error}
        </div>
      )}

      {/* Category Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="label">Categoría</label>
          {categoryError && <span className="text-xs text-red-400 font-medium">{categoryError}</span>}
        </div>
        <CategorySelector
          categories={categories}
          selectedCategoryId={categoryId}
          onSelect={setCategoryId}
        />
      </div>

      {/* Title Input */}
      <div className="space-y-2">
        <label className="label">Título</label>
        <div className="relative group">
          <input
            id="title"
            type="text"
            className="input text-lg font-medium"
            value={title}
            maxLength={TITLE_LIMIT}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Escribe un título descriptivo e interesante..."
            required
          />
          <div className="absolute right-3 bottom-3 text-xs text-dungeon-600 font-mono bg-dungeon-950/80 px-2 py-1 rounded">
            {title.length}/{TITLE_LIMIT}
          </div>
        </div>
        {titleError && <p className="text-sm text-red-400 mt-1">{titleError}</p>}
      </div>

      {/* Editor & Preview Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-dungeon-800 pb-1">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-2 pb-2 text-sm font-bold transition-colors ${activeTab === 'editor' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-dungeon-500 hover:text-dungeon-300'
                }`}
            >
              <Edit3 className="w-4 h-4" /> Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 pb-2 text-sm font-bold transition-colors ${activeTab === 'preview' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-dungeon-500 hover:text-dungeon-300'
                }`}
            >
              <Eye className="w-4 h-4" /> Vista Previa
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPoll(!showPoll)}
              className={`btn btn-ghost text-xs py-1 px-2 ${showPoll ? 'text-gold-400 bg-gold-400/10' : ''}`}
            >
              <BarChart2 className="w-3 h-3" /> {showPoll ? 'Quitar Encuesta' : 'Añadir Encuesta'}
            </button>
            <button
              type="button"
              onClick={clearDraft}
              className="btn btn-ghost text-xs py-1 px-2 hover:text-red-400"
              title="Borrar borrador"
            >
              <Trash2 className="w-3 h-3" /> Limpiar
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[300px]">
          {activeTab === 'editor' ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-dungeon-800 bg-dungeon-900/30 overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-gold-500/50 transition-all">
                <PostEditor
                  value={contentMd}
                  onChange={setContentMd}
                  onJsonChange={setContentJson}
                  canUploadImages={canUploadImages}
                  onUploadImage={async (file) => {
                    const { data: { user } } = await supabase.auth.getUser();
                    if (!user) throw new Error('auth');
                    const path = `${user.id}/${Date.now()}-${file.name}`;
                    const { data, error } = await supabase.storage.from('forum_uploads').upload(path, file, {
                      cacheControl: '3600',
                      upsert: true,
                    });
                    if (error || !data) throw error || new Error('upload');
                    const { data: pub } = supabase.storage.from('forum_uploads').getPublicUrl(data.path);
                    return pub?.publicUrl || '';
                  }}
                />
              </div>

              {showPoll && (
                <PollCreator
                  question={pollQuestion}
                  options={pollOptions}
                  onQuestionChange={setPollQuestion}
                  onOptionsChange={setPollOptions}
                />
              )}
            </div>
          ) : (
            <div className="prose prose-invert max-w-none p-6 rounded-2xl border border-dungeon-800 bg-dungeon-950/50 min-h-[300px]">
              {contentMd ? (
                <ReactMarkdown>{contentMd}</ReactMarkdown>
              ) : (
                <p className="text-dungeon-600 italic text-center mt-10">Nada para previsualizar aún...</p>
              )}
              {showPoll && pollQuestion && (
                <div className="mt-8 p-4 border border-dungeon-700 rounded-xl bg-dungeon-900/50">
                  <h4 className="font-bold text-gold-400 mb-4 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" /> {pollQuestion}
                  </h4>
                  <div className="space-y-2">
                    {pollOptions.filter(o => o.text).map((opt, i) => (
                      <div key={i} className="p-3 rounded-lg bg-dungeon-950 border border-dungeon-800 text-sm text-dungeon-300">
                        {opt.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-dungeon-500 px-1">
          <span>{contentMd.length > 0 ? 'Guardado automáticamente en borrador' : ''}</span>
          <span>
            {Math.max(0, 20 - trimmedContent.length) > 0
              ? `Faltan ${Math.max(0, 20 - trimmedContent.length)} caracteres`
              : `${trimmedContent.length} caracteres`}
          </span>
        </div>
        {contentError && <p className="text-sm text-red-400 text-right">{contentError}</p>}
      </div>

      {/* Tags Input */}
      <div className="space-y-2">
        <label htmlFor="tags" className="label">
          Etiquetas <span className="text-dungeon-500 font-normal normal-case">(Opcional, máx 5)</span>
        </label>
        <div className="flex flex-wrap gap-2 p-2 rounded-xl bg-dungeon-950/50 border border-dungeon-700 focus-within:border-gold-500/50 transition-colors">
          {tags.map((tag) => (
            <span
              key={tag}
              className="tag tag-primary animate-in fade-in zoom-in duration-200"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 p-0.5 hover:bg-gold-500/20 rounded-full transition-colors"
                aria-label={`Eliminar tag ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
          <div className="relative flex-1 min-w-[120px]">
            <input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              className="w-full bg-transparent border-0 focus:outline-none text-dungeon-100 placeholder:text-dungeon-600 py-1 px-2"
              placeholder={tags.length === 0 ? "Ej: reglas, monstruos, duda..." : "Añadir otro..."}
              disabled={tags.length >= 5}
            />
            {filteredSuggestions.length > 0 && (
              <div className="absolute bottom-full left-0 mb-2 w-64 rounded-lg border border-dungeon-700 bg-dungeon-900 shadow-xl overflow-hidden z-10">
                <div className="p-1">
                  {filteredSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-dungeon-800 text-dungeon-200 text-sm transition-colors"
                      onClick={() => {
                        setTags([...tags, s]);
                        setTagInput('');
                      }}
                    >
                      #{s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t border-dungeon-800">
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          )}
          Publicar Hilo
        </button>
      </div>
    </form>
  );
}
