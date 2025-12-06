'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import {
  feedbackFormSchema,
  FeedbackFormData,
  FeedbackCategory,
  FeedbackPriority
} from '@/lib/schemas/feedback';
import {
  Bug,
  Lightbulb,
  Languages,
  Database,
  Palette,
  Zap,
  MessageSquare,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface FeedbackFormProps {
  onSubmitSuccess?: () => void;
  onCheckSimilar?: (title: string) => void;
}

const CATEGORIES = [
  { value: 'bug' as const, label: 'Bug / Error', icon: Bug, color: 'text-red-400' },
  { value: 'feature' as const, label: 'Nueva Funcionalidad', icon: Lightbulb, color: 'text-yellow-400' },
  { value: 'translation' as const, label: 'Error de Traducción', icon: Languages, color: 'text-blue-400' },
  { value: 'data' as const, label: 'Error en Datos', icon: Database, color: 'text-purple-400' },
  { value: 'ui' as const, label: 'Problema de UI/Diseño', icon: Palette, color: 'text-pink-400' },
  { value: 'performance' as const, label: 'Rendimiento', icon: Zap, color: 'text-orange-400' },
  { value: 'other' as const, label: 'Otro', icon: MessageSquare, color: 'text-gray-400' },
];

const PRIORITIES = [
  { value: 'low' as const, label: 'Baja' },
  { value: 'medium' as const, label: 'Media' },
  { value: 'high' as const, label: 'Alta' },
  { value: 'critical' as const, label: 'Crítica' },
];

export function FeedbackForm({ onSubmitSuccess, onCheckSimilar }: FeedbackFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
    getValues,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackFormSchema),
    mode: 'onChange',
    defaultValues: {
      category: 'bug',
      priority: 'medium',
      title: '',
      description: '',
    },
  });

  const title = watch('title');

  // Notificar sobre tickets similares cuando cambia el título
  useEffect(() => {
    if (title.length >= 5 && onCheckSimilar) {
      onCheckSimilar(title);
    }
  }, [title, onCheckSimilar]);

  async function onSubmit(data: FeedbackFormData) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setSubmitError('Debes estar autenticado para reportar');
        return;
      }

      const pageUrl = typeof window !== 'undefined' ? window.location.pathname : null;

      const { error } = await supabase
        .from('feedback_tickets')
        .insert([
          {
            title: data.title,
            description: data.description,
            category: data.category,
            priority: data.priority,
            user_id: user.id,
            user_email: user.email,
            page_url: pageUrl,
            status: 'open',
            browser_info: typeof navigator !== 'undefined' ? navigator.userAgent : null,
          },
        ]);

      if (error) throw error;

      reset();
      onSubmitSuccess?.();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Error al enviar el reporte'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const titleValue = getValues('title');
  const titleLength = titleValue?.length || 0;
  const descValue = getValues('description');
  const descLength = descValue?.length || 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <div className="flex gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-400">{submitError}</p>
        </div>
      )}

      {/* Título */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-dungeon-200">
          Título del Reporte
          {errors.title && <span className="text-red-400 ml-1">*</span>}
        </label>
        <input
          {...register('title')}
          type="text"
          placeholder="Descripción breve del problema"
          className={`w-full px-3 py-2 rounded-lg bg-dungeon-800 border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 ${
            errors.title
              ? 'border-red-500/50 bg-red-500/5'
              : 'border-dungeon-700 focus-visible:border-gold-400'
          }`}
        />
        <div className="flex justify-between text-xs text-dungeon-500">
          <span>{titleLength}/200</span>
          {errors.title && <span className="text-red-400">{errors.title.message}</span>}
        </div>
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-dungeon-200">
          Descripción Detallada
          {errors.description && <span className="text-red-400 ml-1">*</span>}
        </label>
        <textarea
          {...register('description')}
          placeholder="Proporciona detalles sobre el problema, pasos para reproducir, o contexto adicional"
          rows={5}
          className={`w-full px-3 py-2 rounded-lg bg-dungeon-800 border transition-colors resize-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 ${
            errors.description
              ? 'border-red-500/50 bg-red-500/5'
              : 'border-dungeon-700 focus-visible:border-gold-400'
          }`}
        />
        <div className="flex justify-between text-xs text-dungeon-500">
          <span>{descLength}/5000</span>
          {errors.description && <span className="text-red-400">{errors.description.message}</span>}
        </div>
      </div>

      {/* Categoría */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-dungeon-200">Categoría</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {CATEGORIES.map(({ value, label, icon: Icon }) => (
            <label key={value} className="relative">
              <input
                {...register('category')}
                type="radio"
                value={value}
                className="sr-only peer"
              />
              <div className="peer-checked:border-gold-400 peer-checked:bg-gold-400/10 p-3 rounded-lg border border-dungeon-700 cursor-pointer transition-colors hover:border-dungeon-600">
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{label}</span>
              </div>
            </label>
          ))}
        </div>
        {errors.category && <span className="text-xs text-red-400">{errors.category.message}</span>}
      </div>

      {/* Prioridad */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-dungeon-200">Prioridad</label>
        <div className="grid grid-cols-4 gap-2">
          {PRIORITIES.map(({ value, label }) => (
            <label key={value} className="relative">
              <input
                {...register('priority')}
                type="radio"
                value={value}
                className="sr-only peer"
              />
              <div className="peer-checked:border-gold-400 peer-checked:bg-gold-400/10 p-3 rounded-lg border border-dungeon-700 cursor-pointer transition-colors hover:border-dungeon-600 text-center">
                <span className="text-xs font-medium">{label}</span>
              </div>
            </label>
          ))}
        </div>
        {errors.priority && <span className="text-xs text-red-400">{errors.priority.message}</span>}
      </div>

      {/* Botón de envío */}
      <Button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="w-full gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4" />
            Enviar Reporte (+50 XP)
          </>
        )}
      </Button>
    </form>
  );
}
