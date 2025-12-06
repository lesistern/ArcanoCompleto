'use client';

import { Search, Pencil, Loader2 } from 'lucide-react';
import { ClassData } from '@/types/admin-classes';

interface ClassListSidebarProps {
    classes: ClassData[];
    selectedClass: ClassData | null;
    searchTerm: string;
    isLoading: boolean;
    onSearchChange: (term: string) => void;
    onSelectClass: (classData: ClassData) => void;
    onEdit: (classData: ClassData) => void;
}

export function ClassListSidebar({
    classes,
    selectedClass,
    searchTerm,
    isLoading,
    onSearchChange,
    onSelectClass,
    onEdit,
}: ClassListSidebarProps) {
    const filteredClasses = classes.filter(c => {
        const displayName = (c.titulo || c.name || c.title || c.class_name || c.label || c.slug || '').toLowerCase();
        const slug = (c.slug || '').toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        return displayName.includes(searchLower) || slug.includes(searchLower);
    });

    return (
        <div className="lg:col-span-1 bg-dungeon-800 rounded-lg p-4 flex flex-col h-[calc(100vh-200px)]">
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dungeon-400 h-4 w-4" />
                <input
                    type="text"
                    placeholder="Buscar clase..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-400"
                />
            </div>
            <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                {isLoading ? (
                    <div className="text-center py-4 text-dungeon-400">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                        Cargando clases...
                    </div>
                ) : classes.length === 0 ? (
                    <div className="text-center py-8 text-dungeon-400">
                        <p className="mb-2">No hay clases disponibles</p>
                        <p className="text-xs text-dungeon-500">Crea una nueva clase para comenzar</p>
                    </div>
                ) : filteredClasses.length === 0 ? (
                    <div className="text-center py-4 text-dungeon-400">
                        <p className="text-sm">No se encontraron clases</p>
                        <p className="text-xs text-dungeon-500">Ajusta tu búsqueda</p>
                    </div>
                ) : (
                    filteredClasses.map((c) => (
                        <div
                            key={c.id}
                            onClick={() => onSelectClass(c)}
                            className={`p-3 rounded-lg cursor-pointer transition-all ${selectedClass?.id === c.id
                                ? 'bg-gold-900/30 border border-gold-400'
                                : 'bg-dungeon-700 hover:bg-dungeon-600'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-gold-300">
                                        {c.titulo || c.name || c.title || c.class_name || c.label || c.slug}
                                    </div>
                                    <div className="text-xs text-dungeon-400">
                                        {(c.hit_die || c.slug)} | {c.bab_progression || '?'}
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(c);
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
