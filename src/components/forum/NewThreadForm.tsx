'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Send, X } from 'lucide-react';

interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category_type: string;
}

interface NewThreadFormProps {
  categories: Category[];
  defaultCategorySlug?: string;
}

export default function NewThreadForm({
  categories,
  defaultCategorySlug,
}: NewThreadFormProps) {
  const router = useRouter();
  const supabase = createClient();

  // Form state
  const [categoryId, setCategoryId] = useState(
    categories.find((c) => c.slug === defaultCategorySlug)?.id || ''
  );
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validación
  const titleError = title.length > 0 && (title.length < 10 || title.length > 200)
    ? 'El título debe tener entre 10 y 200 caracteres'
    : null;

  const contentError = content.length > 0 && content.length < 20
    ? 'El contenido debe tener al menos 20 caracteres'
    : null;

  const categoryError = !categoryId
    ? 'Debes seleccionar una categoría'
    : null;

  const isFormValid = !titleError && !contentError && !categoryError && title && content && categoryId;

  // Generar slug desde título
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD') // Descomponer acentos
      .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
      .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
      .trim()
      .replace(/\s+/g, '-') // Espacios a guiones
      .replace(/-+/g, '-') // Colapsar múltiples guiones
      .substring(0, 100); // Limitar longitud
  };

  // Manejar tags
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError('Por favor, completa todos los campos correctamente');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Obtener usuario actual
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('Debes iniciar sesión para crear un hilo');
        setIsSubmitting(false);
        return;
      }

      // Generar slug base
      let slug = generateSlug(title);
      let finalSlug = slug;
      let counter = 1;

      // Verificar si el slug ya existe y añadir número si es necesario
      while (true) {
        const { data: existingThread } = await supabase
          .from('forum_threads')
          .select('id')
          .eq('slug', finalSlug)
          .single();

        if (!existingThread) break;

        finalSlug = `${slug}-${counter}`;
        counter++;
      }

      // Insertar hilo
      const { data: newThread, error: insertError } = await supabase
        .from('forum_threads')
        .insert({
          category_id: categoryId,
          author_id: user.id,
          title,
          slug: finalSlug,
          content,
          tags: tags.length > 0 ? tags : null,
        })
        .select('id')
        .single();

      if (insertError) {
        console.error('Error creating thread:', insertError);
        setError('Error al crear el hilo. Por favor intenta nuevamente.');
        setIsSubmitting(false);
        return;
      }

      // Obtener categoría para redirección
      const category = categories.find((c) => c.id === categoryId);

      if (category && newThread) {
        // Redirigir al nuevo hilo
        router.push(`/foro/${category.slug}/${finalSlug}`);
      } else {
        router.push('/foro');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Error inesperado. Por favor intenta nuevamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-dungeon-800 rounded-lg border border-dungeon-700 p-6">
      {/* Error General */}
      {error && (
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 mb-6 text-sm text-red-200">
          {error}
        </div>
      )}

      {/* Categoría */}
      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-semibold text-dungeon-200 mb-2">
          Categoría <span className="text-red-400">*</span>
        </label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full px-4 py-2 bg-dungeon-900 border border-dungeon-600 rounded-lg text-dungeon-100 focus:outline-none focus:border-gold-500 transition-colors"
          disabled={isSubmitting}
        >
          <option value="">Selecciona una categoría...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
        {categoryError && (
          <p className="text-xs text-red-400 mt-1">{categoryError}</p>
        )}
      </div>

      {/* Título */}
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-semibold text-dungeon-200 mb-2">
          Título <span className="text-red-400">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="¿Cómo funciona el ataque de oportunidad?"
          maxLength={200}
          className="w-full px-4 py-2 bg-dungeon-900 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:border-gold-500 transition-colors"
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center mt-1">
          {titleError && (
            <p className="text-xs text-red-400">{titleError}</p>
          )}
          <p className={`text-xs ml-auto ${title.length < 10 ? 'text-dungeon-500' : title.length > 180 ? 'text-orange-400' : 'text-dungeon-400'}`}>
            {title.length}/200
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-semibold text-dungeon-200 mb-2">
          Contenido <span className="text-red-400">*</span>
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Explica tu pregunta o tema con detalle..."
          rows={10}
          className="w-full px-4 py-2 bg-dungeon-900 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:border-gold-500 transition-colors resize-vertical"
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center mt-1">
          {contentError && (
            <p className="text-xs text-red-400">{contentError}</p>
          )}
          <p className={`text-xs ml-auto ${content.length < 20 ? 'text-dungeon-500' : 'text-dungeon-400'}`}>
            {content.length} caracteres (mínimo 20)
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <label htmlFor="tags" className="block text-sm font-semibold text-dungeon-200 mb-2">
          Etiquetas <span className="text-dungeon-500">(opcional, máximo 5)</span>
        </label>
        <input
          id="tags"
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Presiona Enter para añadir etiqueta..."
          className="w-full px-4 py-2 bg-dungeon-900 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:border-gold-500 transition-colors"
          disabled={isSubmitting || tags.length >= 5}
        />
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-dungeon-700 text-dungeon-300 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-red-400 transition-colors"
                  disabled={isSubmitting}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="flex-1 px-6 py-3 bg-gold-500 text-dungeon-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creando...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Crear Hilo (+5 XP)
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="px-6 py-3 bg-dungeon-700 text-dungeon-300 font-semibold rounded-lg hover:bg-dungeon-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
