'use client';

import { Check, Loader2, AlertCircle, Clock } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils/text';

interface SaveStatusProps {
    isSaving: boolean;
    lastSaved: Date | null;
    hasUnsavedChanges: boolean;
    error: string | null;
}

export function SaveStatus({
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    error,
}: SaveStatusProps) {
    if (error) {
        return (
            <div className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="h-4 w-4" />
                <span>Error al guardar: {error}</span>
            </div>
        );
    }

    if (isSaving) {
        return (
            <div className="flex items-center gap-2 text-sm text-blue-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Guardando...</span>
            </div>
        );
    }

    if (hasUnsavedChanges) {
        return (
            <div className="flex items-center gap-2 text-sm text-yellow-400">
                <Clock className="h-4 w-4" />
                <span>Cambios sin guardar</span>
            </div>
        );
    }

    if (lastSaved) {
        return (
            <div className="flex items-center gap-2 text-sm text-green-400">
                <Check className="h-4 w-4" />
                <span>Guardado {formatRelativeTime(lastSaved)}</span>
            </div>
        );
    }

    return null;
}
