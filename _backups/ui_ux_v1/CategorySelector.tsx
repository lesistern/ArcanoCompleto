'use client';

import { LayoutGrid, MessageSquare, Shield, Scroll, Sword, HelpCircle, BookOpen } from 'lucide-react';

interface Category {
    id: string;
    slug: string;
    name: string;
    description?: string;
    icon?: string;
    color?: string;
}

interface CategorySelectorProps {
    categories: Category[];
    selectedCategoryId: string;
    onSelect: (categoryId: string) => void;
}

const ICON_MAP: Record<string, any> = {
    default: MessageSquare,
    general: LayoutGrid,
    reglas: Shield,
    aventuras: Scroll,
    combate: Sword,
    dudas: HelpCircle,
    lore: BookOpen,
};

export default function CategorySelector({ categories, selectedCategoryId, onSelect }: CategorySelectorProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((category) => {
                // Determinar icono basado en slug o propiedad icon si existiera
                const IconComponent = ICON_MAP[category.slug] || ICON_MAP[category.icon || 'default'] || ICON_MAP.default;
                const isSelected = selectedCategoryId === category.id;

                return (
                    <button
                        key={category.id}
                        type="button"
                        onClick={() => onSelect(category.id)}
                        className={`
              relative flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-200
              border group hover:shadow-lg
              ${isSelected
                                ? 'bg-dungeon-800 border-gold-500/50 shadow-gold-900/20'
                                : 'bg-dungeon-900/50 border-dungeon-800 hover:border-dungeon-600 hover:bg-dungeon-800/50'
                            }
            `}
                    >
                        <div
                            className={`
              p-2 rounded-lg transition-colors
              ${isSelected ? 'bg-gold-500/20 text-gold-400' : 'bg-dungeon-950 text-dungeon-500 group-hover:text-dungeon-300'}
            `}
                        >
                            <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                            <h3
                                className={`font-semibold text-sm mb-1 ${isSelected ? 'text-gold-100' : 'text-dungeon-200 group-hover:text-dungeon-100'
                                    }`}
                            >
                                {category.name}
                            </h3>
                            {category.description && (
                                <p className={`text-xs line-clamp-2 ${isSelected ? 'text-dungeon-300' : 'text-dungeon-500'}`}>
                                    {category.description}
                                </p>
                            )}
                        </div>
                        {isSelected && (
                            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
