'use client';

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
        if (options.length <= 2) return;
        onOptionsChange(options.filter(o => o.id !== id));
    };

    const updateOption = (id: string, text: string) => {
        onOptionsChange(options.map(o => o.id === id ? { ...o, text } : o));
    };

    return (
        <div className="card p-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300 border-gold-500/20">
            <div className="flex items-center gap-3 text-gold-400 mb-2">
                <BarChart2 className="w-5 h-5" />
                <h3 className="font-bold text-lg">Crear Encuesta</h3>
            </div>

            <div className="space-y-2">
                <label className="label">Pregunta</label>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => onQuestionChange(e.target.value)}
                    placeholder="¿Qué opinan sobre...?"
                    className="input"
                />
            </div>

            <div className="space-y-3">
                <label className="label">Opciones</label>
                {options.map((option, index) => (
                    <div key={option.id} className="flex gap-2 items-center group">
                        <span className="text-xs font-mono text-dungeon-500 w-4">{index + 1}.</span>
                        <input
                            type="text"
                            value={option.text}
                            onChange={(e) => updateOption(option.id, e.target.value)}
                            placeholder={`Opción ${index + 1}`}
                            className="input py-2 text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => removeOption(option.id)}
                            disabled={options.length <= 2}
                            className="p-2 text-dungeon-500 hover:text-red-400 disabled:opacity-30 disabled:hover:text-dungeon-500 transition-colors"
                            title="Eliminar opción"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            {options.length < 10 && (
                <button
                    type="button"
                    onClick={addOption}
                    className="btn btn-secondary w-full text-sm py-2 border-dashed"
                >
                    <Plus className="w-4 h-4" /> Añadir Opción
                </button>
            )}
        </div>
    );
}
