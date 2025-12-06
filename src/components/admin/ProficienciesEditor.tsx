'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface ProficienciesEditorProps {
    title: string;
    items: string[];
    onChange: (items: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
}

export function ProficienciesEditor({ title, items, onChange, placeholder, disabled }: ProficienciesEditorProps) {
    const [newItem, setNewItem] = useState('');

    const handleAdd = () => {
        if (newItem.trim()) {
            onChange([...items, newItem.trim()]);
            setNewItem('');
        }
    };

    const handleRemove = (index: number) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        onChange(newItems);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-dungeon-300">{title}</label>
            <div className="flex flex-wrap gap-2 mb-2">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-1 bg-dungeon-700 text-dungeon-100 px-2 py-1 rounded border border-dungeon-600">
                        <span className="text-sm">{item}</span>
                        <button onClick={() => handleRemove(index)} className="text-dungeon-400 hover:text-red-400">
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder || "Añadir nuevo..."}
                    disabled={disabled}
                    className="flex-1 px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                />
                <button
                    onClick={handleAdd}
                    disabled={disabled}
                    className="px-3 py-2 bg-dungeon-600 hover:bg-dungeon-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus className="h-5 w-5 text-gold-400" />
                </button>
            </div>
        </div>
    );
}
