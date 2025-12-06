'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface ProgressionRow {
    level: number;
    base_attack_bonus: string;
    fort_save: number;
    ref_save: number;
    will_save: number;
    special_abilities: string;
    spells_per_day: Record<string, number> | null;
}

interface LevelProgressionEditorProps {
    progression: ProgressionRow[];
    onChange: (progression: ProgressionRow[]) => void;
}

export function LevelProgressionEditor({ progression, onChange }: LevelProgressionEditorProps) {
    // Ensure we have 20 levels
    useEffect(() => {
        if (progression.length === 0) {
            const initialProgression = Array.from({ length: 20 }, (_, i) => ({
                level: i + 1,
                base_attack_bonus: '+0',
                fort_save: 0,
                ref_save: 0,
                will_save: 0,
                special_abilities: '',
                spells_per_day: null
            }));
            onChange(initialProgression);
        }
    }, []);

    const updateRow = (index: number, field: keyof ProgressionRow, value: any) => {
        const newProgression = [...progression];
        newProgression[index] = { ...newProgression[index], [field]: value };
        onChange(newProgression);
    };

    const updateSpells = (index: number, level: string, value: string) => {
        const newProgression = [...progression];
        const currentSpells = newProgression[index].spells_per_day || {};

        if (value === '') {
            delete currentSpells[level];
        } else {
            currentSpells[level] = parseInt(value) || 0;
        }

        newProgression[index] = {
            ...newProgression[index],
            spells_per_day: Object.keys(currentSpells).length > 0 ? currentSpells : null
        };
        onChange(newProgression);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-dungeon-900 text-dungeon-100">
                    <tr>
                        <th className="px-3 py-2 border border-dungeon-700">Nivel</th>
                        <th className="px-3 py-2 border border-dungeon-700">BAB</th>
                        <th className="px-3 py-2 border border-dungeon-700">Fort</th>
                        <th className="px-3 py-2 border border-dungeon-700">Ref</th>
                        <th className="px-3 py-2 border border-dungeon-700">Vol</th>
                        <th className="px-3 py-2 border border-dungeon-700 w-1/3">Especial</th>
                        <th className="px-3 py-2 border border-dungeon-700">Conjuros (0-9)</th>
                    </tr>
                </thead>
                <tbody>
                    {progression.map((row, index) => (
                        <tr key={row.level} className="bg-dungeon-800/50 border border-dungeon-700">
                            <td className="px-3 py-2 text-center font-bold text-dungeon-200">{row.level}</td>
                            <td className="px-3 py-2">
                                <input
                                    type="text"
                                    value={row.base_attack_bonus}
                                    onChange={(e) => updateRow(index, 'base_attack_bonus', e.target.value)}
                                    className="w-full bg-dungeon-900 border border-dungeon-600 rounded px-2 py-1 text-center"
                                />
                            </td>
                            <td className="px-3 py-2">
                                <input
                                    type="number"
                                    value={row.fort_save}
                                    onChange={(e) => updateRow(index, 'fort_save', parseInt(e.target.value))}
                                    className="w-16 bg-dungeon-900 border border-dungeon-600 rounded px-2 py-1 text-center"
                                />
                            </td>
                            <td className="px-3 py-2">
                                <input
                                    type="number"
                                    value={row.ref_save}
                                    onChange={(e) => updateRow(index, 'ref_save', parseInt(e.target.value))}
                                    className="w-16 bg-dungeon-900 border border-dungeon-600 rounded px-2 py-1 text-center"
                                />
                            </td>
                            <td className="px-3 py-2">
                                <input
                                    type="number"
                                    value={row.will_save}
                                    onChange={(e) => updateRow(index, 'will_save', parseInt(e.target.value))}
                                    className="w-16 bg-dungeon-900 border border-dungeon-600 rounded px-2 py-1 text-center"
                                />
                            </td>
                            <td className="px-3 py-2">
                                <input
                                    type="text"
                                    value={row.special_abilities}
                                    onChange={(e) => updateRow(index, 'special_abilities', e.target.value)}
                                    className="w-full bg-dungeon-900 border border-dungeon-600 rounded px-2 py-1"
                                    placeholder="Separar con comas..."
                                />
                            </td>
                            <td className="px-3 py-2">
                                <div className="flex gap-1">
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => (
                                        <input
                                            key={lvl}
                                            type="text"
                                            placeholder={lvl.toString()}
                                            value={row.spells_per_day?.[lvl.toString()] ?? ''}
                                            onChange={(e) => updateSpells(index, lvl.toString(), e.target.value)}
                                            className="w-8 bg-dungeon-900 border border-dungeon-600 rounded px-1 py-1 text-center text-xs"
                                            title={`Nivel ${lvl}`}
                                        />
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
