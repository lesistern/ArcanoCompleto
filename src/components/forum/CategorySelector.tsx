import { CATEGORY_CONFIG } from '@/lib/constants';

interface Category {
    id: string;
    slug: string;
    name: string;
    description?: string;
    icon?: string;
    color?: string;
    category_type?: string;
}

interface CategorySelectorProps {
    categories: Category[];
    selectedCategoryId: string;
    onSelect: (id: string) => void;
}

export default function CategorySelector({ categories, selectedCategoryId, onSelect }: CategorySelectorProps) {
    console.log('CategorySelector rendering with:', categories);
    return (
        <div className="space-y-4">
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {categories.map((category) => {
                    const config = CATEGORY_CONFIG[category.category_type || 'default'] || CATEGORY_CONFIG.default;
                    const Icon = config.icon;
                    const isSelected = selectedCategoryId === category.id;

                    return (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => onSelect(category.id)}
                            className={`
                group relative flex flex-col items-start p-4 text-left transition-all duration-200
                card hover:scale-[1.02] hover:shadow-lg
                ${isSelected
                                    ? 'border-gold-500 bg-dungeon-800/80 ring-1 ring-gold-500/50'
                                    : 'border-dungeon-700 hover:border-dungeon-500 bg-dungeon-900/40'
                                }
              `}
                        >
                            <div className="flex items-center gap-3 mb-2 w-full">
                                <div className={`p-2 rounded-lg transition-colors border shadow-inner ${isSelected ? 'bg-gold-500/20 border-gold-500/30' : `${config.bgColor} ${config.borderColor}`}`}>
                                    <Icon className={`w-5 h-5 ${isSelected ? 'text-gold-400' : config.color}`} />
                                </div>
                                <span className={`font-bold text-sm ${isSelected ? 'text-gold-400' : 'text-dungeon-200 group-hover:text-dungeon-100'}`}>
                                    {category.name}
                                </span>
                            </div>

                            {category.description && (
                                <p className="text-xs text-dungeon-400 line-clamp-2 pl-1">
                                    {category.description}
                                </p>
                            )}

                            {isSelected && (
                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(214,158,46,0.8)] animate-pulse" />
                            )}
                        </button>
                    );
                })}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-8 text-dungeon-500 italic border border-dashed border-dungeon-800 rounded-xl">
                    No se encontraron categorías
                </div>
            )}
        </div>
    );
}
