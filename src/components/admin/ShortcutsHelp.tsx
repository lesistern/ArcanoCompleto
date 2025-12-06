'use client';

import { useState } from 'react';
import { X, Keyboard } from 'lucide-react';

interface Shortcut {
    keys: string[];
    description: string;
    category: string;
}

const shortcuts: Shortcut[] = [
    // Navigation
    { keys: ['Ctrl', 'K'], description: 'Abrir búsqueda global', category: 'Navegación' },

    // Editing
    { keys: ['Ctrl', 'S'], description: 'Guardar cambios', category: 'Edición' },
    { keys: ['Ctrl', 'E'], description: 'Alternar edición/vista previa', category: 'Edición' },
    { keys: ['Ctrl', 'N'], description: 'Crear nuevo elemento', category: 'Edición' },
    { keys: ['Esc'], description: 'Cancelar/Cerrar', category: 'Edición' },

    // General
    { keys: ['?'], description: 'Mostrar atajos de teclado', category: 'General' },
];

export function ShortcutsHelp() {
    const [isOpen, setIsOpen] = useState(false);

    // Listen for ? key
    useState(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                setIsOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 left-4 p-3 rounded-full bg-dungeon-800 border border-dungeon-700 hover:border-gold-400 transition-colors shadow-lg z-40"
                title="Atajos de teclado (?)"
            >
                <Keyboard className="h-5 w-5 text-gold-400" />
            </button>
        );
    }

    const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
        if (!acc[shortcut.category]) {
            acc[shortcut.category] = [];
        }
        acc[shortcut.category].push(shortcut);
        return acc;
    }, {} as Record<string, Shortcut[]>);

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 px-4">
                <div className="bg-dungeon-800 border border-dungeon-700 rounded-lg shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-dungeon-700">
                        <div className="flex items-center gap-3">
                            <Keyboard className="h-6 w-6 text-gold-400" />
                            <h2 className="text-xl font-bold text-gold-400">Atajos de teclado</h2>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg hover:bg-dungeon-700 transition-colors"
                        >
                            <X className="h-5 w-5 text-dungeon-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 max-h-96 overflow-y-auto">
                        {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
                            <div key={category} className="mb-6 last:mb-0">
                                <h3 className="text-sm font-semibold text-dungeon-300 mb-3 uppercase tracking-wide">
                                    {category}
                                </h3>
                                <div className="space-y-2">
                                    {categoryShortcuts.map((shortcut, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 bg-dungeon-900 rounded-lg"
                                        >
                                            <span className="text-dungeon-200">{shortcut.description}</span>
                                            <div className="flex items-center gap-1">
                                                {shortcut.keys.map((key, keyIndex) => (
                                                    <span key={keyIndex} className="flex items-center gap-1">
                                                        <kbd className="px-2 py-1 text-xs font-mono bg-dungeon-800 border border-dungeon-700 rounded">
                                                            {key}
                                                        </kbd>
                                                        {keyIndex < shortcut.keys.length - 1 && (
                                                            <span className="text-dungeon-500">+</span>
                                                        )}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-dungeon-700 bg-dungeon-900 text-center text-sm text-dungeon-400">
                        Presiona <kbd className="px-1.5 py-0.5 bg-dungeon-800 border border-dungeon-700 rounded">?</kbd> en cualquier momento para ver estos atajos
                    </div>
                </div>
            </div>
        </>
    );
}
