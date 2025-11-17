'use client';

import { Check, Loader2, AlertCircle, Cloud, CloudOff } from 'lucide-react';

interface AutoSaveIndicatorProps {
  isSaving: boolean;
  lastSaved: number | null;
  saveError: string | null;
}

/**
 * Indicador de auto-guardado estilo Google Docs
 * Muestra el estado de guardado con feedback visual claro
 */
export default function AutoSaveIndicator({ isSaving, lastSaved, saveError }: AutoSaveIndicatorProps) {
  /**
   * Formatea el tiempo transcurrido desde el último guardado
   */
  const getLastSavedText = (): string => {
    if (!lastSaved) return '';

    const savedDate = new Date(lastSaved);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - savedDate.getTime()) / 1000);

    if (diffInSeconds < 5) return 'Guardado justo ahora';
    if (diffInSeconds < 60) return 'Guardado hace unos segundos';
    if (diffInSeconds < 120) return 'Guardado hace 1 minuto';
    if (diffInSeconds < 3600) return `Guardado hace ${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 7200) return 'Guardado hace 1 hora';
    if (diffInSeconds < 86400) return `Guardado hace ${Math.floor(diffInSeconds / 3600)} horas`;
    return `Guardado hace ${Math.floor(diffInSeconds / 86400)} días`;
  };

  // Estado: Guardando
  if (isSaving) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/30">
        <Loader2 className="h-3.5 w-3.5 text-blue-400 animate-spin" />
        <span className="text-xs font-medium text-blue-400">Guardando...</span>
      </div>
    );
  }

  // Estado: Error
  if (saveError) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-500/10 border border-red-500/30">
        <AlertCircle className="h-3.5 w-3.5 text-red-400" />
        <span className="text-xs font-medium text-red-400">Error al guardar</span>
      </div>
    );
  }

  // Estado: Guardado (con timestamp)
  if (lastSaved) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/30">
        <Cloud className="h-3.5 w-3.5 text-green-400" />
        <span className="text-xs font-medium text-green-400">{getLastSavedText()}</span>
      </div>
    );
  }

  // Estado: Sin guardar
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-dungeon-800/50 border border-dungeon-700">
      <CloudOff className="h-3.5 w-3.5 text-dungeon-500" />
      <span className="text-xs font-medium text-dungeon-500">Sin guardar</span>
    </div>
  );
}
