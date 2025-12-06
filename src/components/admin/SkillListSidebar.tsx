'use client';

import { Search, Pencil, Loader2 } from 'lucide-react';
import { SkillData } from '@/types/admin-skills';

interface SkillListSidebarProps {
    skills: SkillData[];
    selectedSkill: SkillData | null;
    searchTerm: string;
    isLoading: boolean;
    onSearchChange: (term: string) => void;
    onSelectSkill: (skillData: SkillData) => void;
    onEdit: (skillData: SkillData) => void;
}

export function SkillListSidebar({
    skills,
    selectedSkill,
    searchTerm,
    isLoading,
    onSearchChange,
    onSelectSkill,
    onEdit,
}: SkillListSidebarProps) {
    const filteredSkills = skills.filter(s => {
        const displayName = (s.name || s.slug || '').toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        return displayName.includes(searchLower);
    });

    return (
        <div className="lg:col-span-1 bg-dungeon-800 rounded-lg p-4 flex flex-col h-[calc(100vh-200px)]">
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dungeon-400 h-4 w-4" />
                <input
                    type="text"
                    placeholder="Buscar habilidad..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-400"
                />
            </div>
            <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                {isLoading ? (
                    <div className="text-center py-4 text-dungeon-400">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                        Cargando habilidades...
                    </div>
                ) : skills.length === 0 ? (
                    <div className="text-center py-8 text-dungeon-400">
                        <p className="mb-2">No hay habilidades disponibles</p>
                        <p className="text-xs text-dungeon-500">Crea una nueva habilidad para comenzar</p>
                    </div>
                ) : filteredSkills.length === 0 ? (
                    <div className="text-center py-4 text-dungeon-400">
                        <p className="text-sm">No se encontraron habilidades</p>
                        <p className="text-xs text-dungeon-500">Ajusta tu búsqueda</p>
                    </div>
                ) : (
                    filteredSkills.map((s) => (
                        <div
                            key={s.id}
                            onClick={() => onSelectSkill(s)}
                            className={`p-3 rounded-lg cursor-pointer transition-all ${selectedSkill?.id === s.id
                                ? 'bg-gold-900/30 border border-gold-400'
                                : 'bg-dungeon-700 hover:bg-dungeon-600'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-gold-300">
                                        {s.name || s.slug}
                                    </div>
                                    <div className="text-xs text-dungeon-400">
                                        {s.keyAbility || '?'} | {s.category || '?'}
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(s);
                                    }}
                                    className="p-1 hover:bg-dungeon-600 rounded"
                                >
                                    <Pencil className="h-4 w-4 text-gold-400" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
