'use client';

import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Clock, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import Tooltip from '@/components/ui/Tooltip';

type TranslationStatusType = 'pending' | 'approved' | 'rejected' | 'loading' | 'unknown';

interface TranslationStatusProps {
  status?: TranslationStatusType;
  quality?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * TranslationStatus Component
 * Displays the status of a translation (pending, approved, rejected) with visual indicators.
 * Can show quality score if provided.
 *
 * @param status - Current status of the translation
 * @param quality - Optional quality score (0-5)
 * @param showLabel - Whether to show text label (default: true)
 * @param size - Size variant (sm, md, lg)
 * @param className - Additional CSS classes
 */
export function TranslationStatus({
  status = 'pending',
  quality,
  showLabel = true,
  size = 'md',
  className = '',
}: TranslationStatusProps) {
  // Status configuration
  const statusConfig: Record<TranslationStatusType, {
    icon: React.ReactNode;
    label: string;
    color: string;
    bgColor: string;
    description: string;
  }> = {
    pending: {
      icon: <Clock className="h-4 w-4" />,
      label: 'Pendiente',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10 border-yellow-500/30',
      description: 'Traducción pendiente de revisión',
    },
    approved: {
      icon: <CheckCircle2 className="h-4 w-4" />,
      label: 'Aprobada',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10 border-green-500/30',
      description: 'Traducción aprobada y verificada',
    },
    rejected: {
      icon: <XCircle className="h-4 w-4" />,
      label: 'Rechazada',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10 border-red-500/30',
      description: 'Traducción rechazada por calidad',
    },
    loading: {
      icon: <Loader2 className="h-4 w-4 animate-spin" />,
      label: 'Guardando',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/30',
      description: 'Guardando cambios...',
    },
    unknown: {
      icon: <AlertCircle className="h-4 w-4" />,
      label: 'Desconocido',
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/10 border-gray-500/30',
      description: 'Estado desconocido',
    },
  };

  const config = statusConfig[status];

  // Size mapping for badge
  const sizeClasses: Record<string, string> = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const badge = (
    <div
      className={`
        inline-flex items-center gap-2 rounded border
        ${config.bgColor}
        ${sizeClasses[size]}
        ${config.color}
        transition-colors duration-200
        ${className}
      `}
    >
      {config.icon}
      {showLabel && (
        <span className="font-semibold">
          {config.label}
        </span>
      )}
    </div>
  );

  // Quality indicator
  const qualityIndicator = quality !== undefined && (
    <div className="flex gap-1 ml-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full transition-colors ${
            i < quality
              ? 'bg-gold-400'
              : 'bg-dungeon-700'
          }`}
        />
      ))}
    </div>
  );

  return (
    <Tooltip content={config.description} position="top">
      <div className="inline-flex items-center">
        {badge}
        {qualityIndicator}
      </div>
    </Tooltip>
  );
}

/**
 * TranslationStatusBadge - Standalone badge component for use in lists
 */
export function TranslationStatusBadge({
  status = 'pending',
  quality,
}: {
  status?: TranslationStatusType;
  quality?: number;
}) {
  const statusConfig: Record<TranslationStatusType, {
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
    label: string;
  }> = {
    pending: { variant: 'outline', label: 'Pendiente' },
    approved: { variant: 'default', label: 'Aprobada' },
    rejected: { variant: 'destructive', label: 'Rechazada' },
    loading: { variant: 'secondary', label: 'Guardando' },
    unknown: { variant: 'outline', label: 'Desconocido' },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <Badge variant={config.variant}>
        {config.label}
      </Badge>
      {quality !== undefined && (
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i < quality ? 'bg-gold-400' : 'bg-dungeon-700'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
