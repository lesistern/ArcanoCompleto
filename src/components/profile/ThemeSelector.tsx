'use client';

import { useState } from 'react';
import { Check, Loader2, Swords, Music, Cross, Sprout, Shield, Hand, Zap, Compass, Eye, Sparkles, BookOpen, Palette, X, AlertTriangle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  preview: string;
  icon: React.ComponentType<{ className?: string }>;
}

const THEMES: Theme[] = [
  {
    id: 'clasico',
    name: 'Clásico',
    description: 'Tema oscuro clásico con toques dorados',
    colors: {
      primary: 'bg-dungeon-900',
      secondary: 'bg-dungeon-800',
      accent: 'bg-gold-500',
    },
    preview: 'De la oscuridad de las mazmorras',
    icon: Shield,
  },
  {
    id: 'barbaro',
    name: 'Bárbaro',
    description: 'Furia desatada - Rojo sangre y poder bruto',
    colors: {
      primary: 'bg-red-950',
      secondary: 'bg-red-900',
      accent: 'bg-red-600',
    },
    preview: 'Forjado en batalla y furia',
    icon: Swords,
  },
  {
    id: 'bardo',
    name: 'Bardo',
    description: 'Elegancia artística - Púrpura real y dorado',
    colors: {
      primary: 'bg-purple-950',
      secondary: 'bg-purple-900',
      accent: 'bg-amber-500',
    },
    preview: 'La música de las esferas',
    icon: Music,
  },
  {
    id: 'clerigo',
    name: 'Clérigo',
    description: 'Luz divina - Blanco cálido y oro sacro',
    colors: {
      primary: 'bg-slate-100',
      secondary: 'bg-slate-200',
      accent: 'bg-amber-600',
    },
    preview: 'Bendecido por los cielos',
    icon: Cross,
  },
  {
    id: 'druida',
    name: 'Druida',
    description: 'Naturaleza salvaje - Verde bosque y tierra',
    colors: {
      primary: 'bg-green-950',
      secondary: 'bg-green-900',
      accent: 'bg-green-600',
    },
    preview: 'Guardián del equilibrio natural',
    icon: Sprout,
  },
  {
    id: 'guerrero',
    name: 'Guerrero',
    description: 'Maestría marcial - Acero plateado y rojo',
    colors: {
      primary: 'bg-slate-900',
      secondary: 'bg-slate-800',
      accent: 'bg-red-700',
    },
    preview: 'Templado en combate',
    icon: Shield,
  },
  {
    id: 'monje',
    name: 'Monje',
    description: 'Disciplina interior - Azul noche y ki',
    colors: {
      primary: 'bg-blue-950',
      secondary: 'bg-blue-900',
      accent: 'bg-sky-500',
    },
    preview: 'Perfección del cuerpo y mente',
    icon: Hand,
  },
  {
    id: 'paladin',
    name: 'Paladín',
    description: 'Justicia divina - Dorado radiante y blanco',
    colors: {
      primary: 'bg-slate-950',
      secondary: 'bg-slate-900',
      accent: 'bg-yellow-500',
    },
    preview: 'Campeón de la luz',
    icon: Zap,
  },
  {
    id: 'explorador',
    name: 'Explorador',
    description: 'Maestro de la naturaleza - Verde bosque oscuro',
    colors: {
      primary: 'bg-green-950',
      secondary: 'bg-emerald-900',
      accent: 'bg-lime-600',
    },
    preview: 'Rastreador de la naturaleza',
    icon: Compass,
  },
  {
    id: 'picaro',
    name: 'Pícaro',
    description: 'Sombras y astucia - Negro y púrpura',
    colors: {
      primary: 'bg-slate-950',
      secondary: 'bg-slate-900',
      accent: 'bg-fuchsia-600',
    },
    preview: 'Desde las sombras',
    icon: Eye,
  },
  {
    id: 'hechicero',
    name: 'Hechicero',
    description: 'Magia innata - Magenta y rosa profundo',
    colors: {
      primary: 'bg-fuchsia-950',
      secondary: 'bg-fuchsia-900',
      accent: 'bg-pink-600',
    },
    preview: 'Poder en la sangre',
    icon: Sparkles,
  },
  {
    id: 'mago',
    name: 'Mago',
    description: 'Conocimiento arcano - Azul medianoche',
    colors: {
      primary: 'bg-blue-950',
      secondary: 'bg-indigo-900',
      accent: 'bg-cyan-500',
    },
    preview: 'Dominio del arte arcano',
    icon: BookOpen,
  },
];

interface ThemeSelectorProps {
  currentTheme: string;
  userId: string;
  onThemeUpdate: (newTheme: string) => void;
}

export function ThemeSelector({
  currentTheme,
  userId,
  onThemeUpdate,
}: ThemeSelectorProps) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleThemeSelect = async (themeId: string) => {
    if (themeId === currentTheme) return;

    setIsUpdating(themeId);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ theme: themeId })
        .eq('id', userId);

      if (updateError) throw updateError;

      onThemeUpdate(themeId);
    } catch (err: any) {
      setError(err?.message || 'Error al cambiar el tema');
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="p-1 hover:bg-red-500/20 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-500/20 rounded-lg">
            <Palette className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-sm font-medium text-dungeon-200">Tema del Perfil</span>
        </div>
        <p className="text-xs text-dungeon-500">
          Selecciona un tema basado en tu clase favorita. Los visitantes verán tu perfil con este tema.
        </p>
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {THEMES.map((theme) => {
          const isSelected = theme.id === currentTheme;
          const isLoading = isUpdating === theme.id;
          const Icon = theme.icon;

          return (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              disabled={isLoading || isSelected}
              className={`
                group relative p-4 rounded-xl border-2 transition-all text-left
                ${
                  isSelected
                    ? 'border-gold-500 bg-gold-500/10'
                    : 'border-dungeon-700 hover:border-gold-500/50 bg-dungeon-900/50 hover:bg-dungeon-800/50'
                }
                ${isLoading ? 'opacity-50 cursor-wait' : ''}
              `}
            >
              {/* Icon and Color Preview */}
              <div className="flex items-center gap-3 mb-3">
                {/* Class Icon */}
                <div className="flex-shrink-0">
                  <Icon className={`h-8 w-8 ${isSelected ? 'text-gold-400' : 'text-dungeon-400 group-hover:text-gold-500'} transition-colors`} />
                </div>

                {/* Color Preview */}
                <div className="flex gap-2 flex-1">
                  <div className={`w-6 h-6 rounded ${theme.colors.primary} border border-dungeon-600`} />
                  <div className={`w-6 h-6 rounded ${theme.colors.secondary} border border-dungeon-600`} />
                  <div className={`w-6 h-6 rounded ${theme.colors.accent} border border-dungeon-600`} />
                </div>
              </div>

              {/* Theme Name */}
              <h3 className="text-lg font-bold text-gold-300 mb-1">
                {theme.name}
              </h3>

              {/* Theme Description */}
              <p className="text-sm text-dungeon-400 mb-2">
                {theme.description}
              </p>

              {/* Preview Text */}
              <p className="text-xs italic text-dungeon-500">
                "{theme.preview}"
              </p>

              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1 px-2 py-1 bg-gold-500/20 border border-gold-500/40 rounded-full">
                    <Check className="h-3 w-3 text-gold-400" />
                    <span className="text-xs font-semibold text-gold-300">Actual</span>
                  </div>
                </div>
              )}

              {/* Loading Spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-dungeon-900/80 rounded-xl">
                  <Loader2 className="h-6 w-6 text-gold-400 animate-spin" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="flex items-start gap-3 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
        <div className="p-1.5 bg-purple-500/20 rounded-lg flex-shrink-0">
          <Sparkles className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <p className="text-sm text-purple-300 font-medium">Temas basados en clases</p>
          <p className="text-xs text-dungeon-400 mt-0.5">
            Cada tema refleja la esencia de una clase de D&D 3.5. Solo afecta tu perfil público.
          </p>
        </div>
      </div>
    </div>
  );
}
