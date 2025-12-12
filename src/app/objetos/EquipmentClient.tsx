'use client';

import { useState } from 'react';
import { Filter, ChevronDown, Sword, Shield, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

interface EquipmentItem {
    id: number;
    name: string;
    slug: string;
    item_category: string;
    price_text: string | null;
    weight_text: string | null;
    weight_lb: number | null;
    srd_weapons?: any[];
    srd_armors?: any[];
}

interface EquipmentClientProps {
    items: EquipmentItem[];
}

export default function EquipmentClient({ items }: EquipmentClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [filtersOpen, setFiltersOpen] = useState(false);

    // Get unique categories
    const categories = Array.from(new Set(items.map(i => i.item_category).filter(Boolean))).sort();

    // Filter items
    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.item_category && item.item_category.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || item.item_category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Group items by category
    const itemsByCategory: Record<string, EquipmentItem[]> = {};
    filteredItems.forEach(item => {
        const category = item.item_category || 'Sin categoría';
        if (!itemsByCategory[category]) {
            itemsByCategory[category] = [];
        }
        itemsByCategory[category].push(item);
    });

    const categoryOrder = Object.keys(itemsByCategory).sort();

    // Get icon for category
    const getCategoryIcon = (category: string) => {
        if (category === 'weapon') return Sword;
        if (category === 'armor') return Shield;
        return Package;
    };

    // Get category label
    const getCategoryLabel = (category: string) => {
        const labels: Record<string, string> = {
            'weapon': 'Armas',
            'armor': 'Armaduras',
            'goods': 'Bienes y Servicios',
            'material': 'Materiales Especiales'
        };
        return labels[category] || category;
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            {/* Header */}
            <ScrollReveal direction="down">
                <div className="border-l-4 border-amber-500 pl-6 mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-200 mb-3">
                        Equipo y Objetos
                    </h1>
                    <p className="text-lg text-gray-400">
                        Armas, armaduras, bienes y servicios del SRD 3.5
                    </p>
                </div>
            </ScrollReveal>

            {/* Botón de Filtros Desplegable */}
            <ScrollReveal delay={100}>
                <div className="mb-6">
                    <button
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        className="w-full flex items-center justify-between bg-dungeon-800 border border-dungeon-700 rounded-lg px-4 py-3 text-gray-300 hover:border-amber-500 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-amber-500" />
                            <span className="font-semibold">Filtros</span>
                            <span className="text-sm text-gray-400">
                                ({filteredItems.length} de {items.length})
                            </span>
                        </div>
                        <ChevronDown
                            className={`h-5 w-5 text-amber-500 transition-transform ${filtersOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {/* Panel de Filtros Desplegable */}
                    {filtersOpen && (
                        <Card className="mt-4">
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Búsqueda */}
                                    <div>
                                        <label className="block text-sm font-semibold text-amber-500 mb-2">
                                            Buscar
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nombre o categoría..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full input text-sm"
                                        />
                                    </div>

                                    {/* Filtro por Categoría */}
                                    <div>
                                        <label className="block text-sm font-semibold text-amber-500 mb-2">
                                            Categoría
                                        </label>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="w-full input text-sm"
                                        >
                                            <option value="all">Todas</option>
                                            {categories.map(category => (
                                                <option key={category} value={category}>
                                                    {getCategoryLabel(category)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </ScrollReveal>

            {/* Items por Categoría */}
            {filteredItems.length === 0 ? (
                <ScrollReveal delay={200}>
                    <Card className="card mb-16">
                        <CardContent className="text-center py-12">
                            <p className="text-gray-400">No se encontraron objetos con los filtros seleccionados</p>
                        </CardContent>
                    </Card>
                </ScrollReveal>
            ) : (
                <div className="space-y-6 mb-16">
                    {categoryOrder.map((category, categoryIndex) => {
                        const categoryItems = itemsByCategory[category];
                        const Icon = getCategoryIcon(category);

                        return (
                            <ScrollReveal key={category} delay={categoryIndex * 100}>
                                <Card className="card">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-amber-400">
                                            <Icon className="h-5 w-5" />
                                            {getCategoryLabel(category)} ({categoryItems.length})
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {categoryItems.map((item, index) => (
                                                <ScrollReveal
                                                    key={item.id}
                                                    delay={index * 50}
                                                    direction="up"
                                                >
                                                    <Link
                                                        href={`/objetos/${item.slug}`}
                                                        className="block group bg-dungeon-800/50 hover:bg-dungeon-800 border border-dungeon-700 hover:border-amber-500 rounded-lg p-4 transition-all duration-200"
                                                    >
                                                        <h3 className="font-semibold text-gray-200 group-hover:text-amber-400 mb-2 transition-colors">
                                                            {item.name}
                                                        </h3>
                                                        {item.price_text && (
                                                            <p className="text-xs text-gray-400 mb-1">
                                                                {item.price_text}
                                                            </p>
                                                        )}
                                                        {item.weight_text && (
                                                            <p className="text-xs text-amber-500">
                                                                {item.weight_text}
                                                            </p>
                                                        )}
                                                    </Link>
                                                </ScrollReveal>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </ScrollReveal>
                        );
                    })}
                </div>
            )}

            {/* Información adicional */}
            <ScrollReveal delay={200}>
                <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-wider mb-3">
                        Información de Equipo
                    </h3>
                    <div className="space-y-3 text-sm text-gray-400">
                        <p>
                            El equipo es esencial para la supervivencia de los aventureros. Desde armas y armaduras
                            hasta herramientas y provisiones, cada objeto tiene su propósito.
                        </p>
                        <p>
                            <span className="text-amber-500 font-semibold">Armas:</span> Las armas se clasifican
                            en simples, marciales y exóticas, cada una con diferentes requisitos de competencia.
                        </p>
                        <p>
                            <span className="text-amber-500 font-semibold">Armaduras:</span> Las armaduras
                            proporcionan protección pero pueden limitar la movilidad y afectar el lanzamiento
                            de conjuros arcanos.
                        </p>
                        <p>
                            <span className="text-amber-500 font-semibold">Materiales Especiales:</span> Algunos
                            objetos están hechos de materiales especiales como mithral o adamantino, que otorgan
                            propiedades únicas.
                        </p>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
