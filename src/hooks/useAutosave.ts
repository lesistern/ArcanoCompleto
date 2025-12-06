import { useState, useEffect, useCallback, useRef } from 'react';

interface AutosaveOptions {
    delay?: number; // Delay in ms before saving (default: 2000)
    onSave: (data: any) => Promise<void>;
    enabled?: boolean;
}

interface AutosaveState {
    isSaving: boolean;
    lastSaved: Date | null;
    hasUnsavedChanges: boolean;
    error: string | null;
}

export function useAutosave<T>(
    data: T,
    options: AutosaveOptions
): AutosaveState {
    const { delay = 2000, onSave, enabled = true } = options;

    const [state, setState] = useState<AutosaveState>({
        isSaving: false,
        lastSaved: null,
        hasUnsavedChanges: false,
        error: null,
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const previousDataRef = useRef<T>(data);
    const isMountedRef = useRef(true);

    const save = useCallback(async () => {
        if (!enabled) return;

        setState(prev => ({ ...prev, isSaving: true, error: null }));

        try {
            await onSave(data);

            if (isMountedRef.current) {
                setState({
                    isSaving: false,
                    lastSaved: new Date(),
                    hasUnsavedChanges: false,
                    error: null,
                });
                previousDataRef.current = data;
            }
        } catch (error) {
            if (isMountedRef.current) {
                setState(prev => ({
                    ...prev,
                    isSaving: false,
                    error: error instanceof Error ? error.message : 'Error al guardar',
                }));
            }
        }
    }, [data, onSave, enabled]);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (!enabled) return;

        // Check if data has changed
        const hasChanged = JSON.stringify(data) !== JSON.stringify(previousDataRef.current);

        if (!hasChanged) return;

        setState(prev => ({ ...prev, hasUnsavedChanges: true }));

        // Clear existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout
        timeoutRef.current = setTimeout(() => {
            save();
        }, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [data, delay, save, enabled]);

    return state;
}
