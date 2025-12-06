import { useEffect, useCallback, useRef } from 'react';

export interface KeyboardShortcut {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
    action: () => void;
    description: string;
    preventDefault?: boolean;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled = true) {
    const shortcutsRef = useRef(shortcuts);

    // Update ref when shortcuts change
    useEffect(() => {
        shortcutsRef.current = shortcuts;
    }, [shortcuts]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (!enabled) return;

        for (const shortcut of shortcutsRef.current) {
            const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
            const ctrlMatches = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey;
            const shiftMatches = shortcut.shift ? event.shiftKey : !event.shiftKey;
            const altMatches = shortcut.alt ? event.altKey : !event.altKey;

            if (keyMatches && ctrlMatches && shiftMatches && altMatches) {
                if (shortcut.preventDefault !== false) {
                    event.preventDefault();
                }
                shortcut.action();
                break;
            }
        }
    }, [enabled]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
}

// Common shortcuts
export const COMMON_SHORTCUTS = {
    SAVE: { key: 's', ctrl: true, description: 'Guardar' },
    CANCEL: { key: 'Escape', description: 'Cancelar' },
    EDIT_TOGGLE: { key: 'e', ctrl: true, description: 'Alternar edición/vista previa' },
    SEARCH: { key: 'k', ctrl: true, description: 'Buscar' },
    NEW: { key: 'n', ctrl: true, description: 'Nuevo' },
    DELETE: { key: 'Delete', description: 'Eliminar' },
} as const;
