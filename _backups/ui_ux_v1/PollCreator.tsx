'use client';

import { useState } from 'react';
import { Plus, Trash2, BarChart2 } from 'lucide-react';

interface PollOption {
    id: string;
    text: string;
}

interface PollCreatorProps {
    question: string;
    options: PollOption[];
    onQuestionChange: (q: string) => void;
    onOptionsChange: (opts: PollOption[]) => void;
}

export default function PollCreator({ question, options, onQuestionChange, onOptionsChange }: PollCreatorProps) {
    const addOption = () => {
        if (options.length >= 10) return;
        onOptionsChange([...options, { id: crypto.randomUUID(), text: '' }]);
    };

    const removeOption = (id: string) => {
        if (options.length <= 2) return; // Mínimo 2 opciones
        onOptionsChange(options.filter((opt) => opt.id !== id));
    };

    const updateOption = (id: string, text: string) => {
        onOptionsChange(options.map((opt) => (opt.id === id ? { ...opt, text } : opt)));
    };

    return (
        <div className="space-y-4 p-4 rounded-xl bg-dungeon-900/30 border border-dungeon-800">
            <div className="flex items-center gap-2 mb-2 text-gold-400">
                <BarChart2 className="w-5 h-5" />
                <h3 className="font-semibold">Crear Encuesta</h3>
            </div>

            <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-dungeon-500 font-semibold">Pregunta</label>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => onQuestionChange(e.target.value)}
                    placeholder="¿Qué opinan sobre...?"
                    className="w-full rounded-lg bg-dungeon-950 border border-dungeon-800 px-3 py-2 text-dungeon-100 focus:outline-none focus:border-gold-500/50 transition-colors"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-dungeon-500 font-semibold">Opciones</label>
                {options.map((option, index) => (
                    <div key={option.id} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={option.text}
                            onChange={(e) => updateOption(option.id, e.target.value)}
                            placeholder={`Opción ${index + 1}`}
                            className="flex-1 rounded-lg bg-dungeon-950 border border-dungeon-800 px-3 py-2 text-dungeon-100 focus:outline-none focus:border-gold-500/50 transition-colors"
                        />
                        {options.length > 2 && (
                            <button
                                type="button"
                                onClick={() => removeOption(option.id)}
                                className="p-2 text-dungeon-500 hover:text-red-400 transition-colors"
                                title="Eliminar opción"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {options.length < 10 && (
                <button
                    type="button"
                    onClick={addOption}
                    className="text-sm text-gold-500 hover:text-gold-400 flex items-center gap-1 font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Añadir opción
                </button>
            )}
        </div>
    );
}
