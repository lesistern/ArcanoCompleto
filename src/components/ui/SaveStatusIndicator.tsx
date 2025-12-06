'use client';

import { Loader2, Check, X, Cloud, CloudOff } from 'lucide-react';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface SaveStatusIndicatorProps {
  status: SaveStatus;
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

/**
 * Reusable save status indicator with consistent styling
 * Used across all settings components for auto-save feedback
 */
export function SaveStatusIndicator({
  status,
  size = 'sm',
  showLabel = true,
  className = '',
}: SaveStatusIndicatorProps) {
  if (status === 'idle') return null;

  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  const config = {
    saving: {
      icon: <Loader2 className={`${iconSize} animate-spin`} />,
      label: 'Guardando...',
      color: 'text-blue-400',
    },
    saved: {
      icon: <Check className={iconSize} />,
      label: 'Guardado',
      color: 'text-green-400',
    },
    error: {
      icon: <X className={iconSize} />,
      label: 'Error',
      color: 'text-red-400',
    },
  };

  const current = config[status as keyof typeof config];
  if (!current) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${textSize} font-medium transition-all duration-300 ${current.color} ${className}`}
    >
      {current.icon}
      {showLabel && <span>{current.label}</span>}
    </span>
  );
}

/**
 * Global save indicator for the entire form/page
 */
interface GlobalSaveIndicatorProps {
  isSaving: boolean;
  lastSaved?: Date | null;
  error?: string | null;
}

export function GlobalSaveIndicator({
  isSaving,
  lastSaved,
  error,
}: GlobalSaveIndicatorProps) {
  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm text-red-400">
        <CloudOff className="w-4 h-4" />
        <span>Error al guardar</span>
      </div>
    );
  }

  if (isSaving) {
    return (
      <div className="flex items-center gap-2 text-sm text-blue-400">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Guardando...</span>
      </div>
    );
  }

  if (lastSaved) {
    const timeAgo = getTimeAgo(lastSaved);
    return (
      <div className="flex items-center gap-2 text-sm text-green-400">
        <Cloud className="w-4 h-4" />
        <span>Guardado {timeAgo}</span>
      </div>
    );
  }

  return null;
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 5) return 'ahora';
  if (seconds < 60) return `hace ${seconds}s`;
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)}m`;
  return `hace ${Math.floor(seconds / 3600)}h`;
}
