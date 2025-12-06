'use client';

import { useState } from 'react';
import { Filter, ChevronDown, Sword, Shield, Package, Gem, Search, Sparkles, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface EquipmentItem {
    id: number;
    name: string;
    slug: string;
    item_category: string;
    subcategory?: string | null;
    item_group?: string | null;
    price_text?: string | null;
    weight_text?: string | null;
    weight_lb?: number | null;
    srd_weapons?: any[];
    srd_armors?: any[];
}

interface EquipmentCategoryClientProps {
    items: EquipmentItem[];
    category: string;
}

export default function EquipmentCategoryClient({ items, category }: EquipmentCategoryClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Mapeo de categorías inglés → español para bienes
    const GOODS_CATEGORY_NAMES: Record<string, string> = {
        'Adventuring Gear': 'Equipo de Aventurero',
        'Special Substances': 'Substancias Especiales',
        'Tools and Skill Kits': 'Herramientas y Kits',
        'Clothing': 'Ropa',
        'Food, Drink, and Lodging': 'Comida, Bebida y Alojamiento',
        'Mounts and Related Gear': 'Monturas y Equipo',
        'Transport': 'Transporte',
        'Spellcasting and Services': 'Servicios'
    };

    // Group items by subcategory
    const itemsBySubcategory = filteredItems.reduce((acc, item) => {
        // Para bienes, usar item_group de la BD (ya asignado)
        // Para armas y armaduras, usar las subcategorías de sus tablas relacionadas
        let subcat: string;

        if (category === 'bienes') {
            // Usar item_group de la BD y traducir al español
            const group = item.item_group || 'Adventuring Gear';
            subcat = GOODS_CATEGORY_NAMES[group] || group;
        } else if (category === 'armas' && item.srd_weapons?.[0]) {
            subcat = item.srd_weapons[0].weapon_category || 'Armas';
        } else if (category === 'armaduras' && item.srd_armors?.[0]) {
            subcat = item.srd_armors[0].armor_category || 'Armaduras';
        } else {
            subcat = item.subcategory || 'Sin categoría';
        }

        if (!acc[subcat]) {
            acc[subcat] = [];
        }
        acc[subcat].push(item);
        return acc;
    }, {} as Record<string, EquipmentItem[]>);

    // Sort subcategories alphabetically, but put default categories last
    const sortedSubcategories = Object.keys(itemsBySubcategory).sort((a, b) => {
        const lastCategories = ['Sin categoría', 'Equipo de Aventurero'];
        const aIsLast = lastCategories.includes(a);
        const bIsLast = lastCategories.includes(b);
        if (aIsLast && !bIsLast) return 1;
        if (!aIsLast && bIsLast) return -1;
        return a.localeCompare(b, 'es');
    });

    const getCategoryInfo = () => {
        const info: Record<string, { title: string; icon: any; color: string; description: string }> = {
            armas: { title: 'Armas', icon: Sword, color: 'red', description: 'Armas simples, marciales y exóticas del SRD 3.5' },
            armaduras: { title: 'Armaduras y Escudos', icon: Shield, color: 'blue', description: 'Armaduras ligeras, medias, pesadas y escudos' },
            bienes: { title: 'Bienes y Servicios', icon: Package, color: 'green', description: 'Equipo de aventurero, herramientas y servicios' },
            materiales: { title: 'Materiales Especiales', icon: Gem, color: 'purple', description: 'Materiales especiales como mithral, adamantino, etc.' }
        };
        return info[category] || info['armas'];
    };

    const { title, icon: Icon, color, description } = getCategoryInfo();

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl">
                <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-dungeon-950 via-dungeon-900/90 to-dungeon-950/50"></div>

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Link href="/objetos">
                                <Button variant="ghost" size="sm" className="text-dungeon-400 hover:text-dungeon-200 pl-0">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-dungeon-100 leading-tight">
                            {title}
                        </h1>
                        <p className="text-lg text-dungeon-300 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Icon Display */}
                    <div className={`p-6 rounded-full bg-${color}-500/10 border border-${color}-500/30 backdrop-blur-sm`}>
                        <Icon className={`h-12 w-12 text-${color}-500`} />
                    </div>
                </div>
            </div>

            {/* Control Panel / Filters */}
            <div className="sticky top-4 z-30 bg-dungeon-950/95 backdrop-blur-md border border-dungeon-800 rounded-xl shadow-lg p-4 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-dungeon-500 group-focus-within:text-gold-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar objeto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-dungeon-900 border border-dungeon-700 rounded-lg text-dungeon-100 placeholder-dungeon-500 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                        />
                    </div>

                    {/* Filter Toggle (Mobile) & Active Filters Summary */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <div className="hidden md:flex items-center gap-2 text-sm text-dungeon-400">
                            <Sparkles className="h-4 w-4 text-gold-500" />
                            <span>Mostrando {filteredItems.length} objetos</span>
                        </div>

                        <button
                            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${mobileFiltersOpen
                                ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                                : 'bg-dungeon-800 border-dungeon-700 text-dungeon-300 hover:border-dungeon-600'
                                }`}
                        >
                            <Filter className="h-4 w-4" />
                            <span className="font-medium">Filtros</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Items grid by subcategory */}
            {filteredItems.length === 0 ? (
                <div className="text-center py-16 bg-dungeon-900/50 rounded-xl border border-dungeon-800 border-dashed">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dungeon-800 mb-4">
                        <Search className="h-8 w-8 text-dungeon-500" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-dungeon-200 mb-2">No se encontraron objetos</h3>
                    <p className="text-dungeon-400 max-w-md mx-auto">
                        Intenta ajustar los filtros o buscar con otros términos.
                    </p>
                    <button
                        onClick={() => setSearchTerm('')}
                        className="mt-6 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors"
                    >
                        Limpiar filtros
                    </button>
                </div>
            ) : (
                <div className="space-y-8">
                    {sortedSubcategories.map((subcategory) => {
                        const subcatItems = itemsBySubcategory[subcategory];
                        return (
                            <ScrollReveal key={subcategory} delay={100}>
                                <Card className="card">
                                    <CardHeader>
                                        <CardTitle className={`flex items-center gap-2 text-${color}-400`}>
                                            <Icon className="h-5 w-5" />
                                            {subcategory}
                                            <span className="text-sm font-normal text-dungeon-400">
                                                ({subcatItems.length})
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {subcatItems.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={`/objetos/${category}/${item.slug}`}
                                                    className={`block group bg-dungeon-800/50 hover:bg-dungeon-800 border border-dungeon-700 hover:border-${color}-500 rounded-lg p-4 transition-all duration-200`}
                                                >
                                                    <h3 className={`font-semibold text-dungeon-100 group-hover:text-${color}-400 mb-2 transition-colors`}>{item.name}</h3>
                                                    {item.price_text && <p className="text-xs text-dungeon-400 mb-1">{item.price_text}</p>}
                                                    {item.weight_text && <p className="text-xs text-amber-500">{item.weight_text}</p>}
                                                </Link>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </ScrollReveal>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
