'use client';

import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ValidationBadgeProps {
  isValid: boolean;
  label?: string;
}

/**
 * Badge de validación para mostrar estado de completitud de secciones
 * Muestra un ícono y texto indicando si la sección está completa o no
 */
export default function ValidationBadge({ isValid, label }: ValidationBadgeProps) {
  if (isValid) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
        <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
        <span className="text-xs font-semibold text-green-400">
          {label || 'Completo'}
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
      <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
      <span className="text-xs font-semibold text-amber-400">
        {label || 'Incompleto'}
      </span>
    </div>
  );
}
