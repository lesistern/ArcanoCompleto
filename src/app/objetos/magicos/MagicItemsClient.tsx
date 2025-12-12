'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft, Filter, Search, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ScrollReveal from '@/components/ScrollReveal';

interface MagicItem {
    id: string;
    slug: string;
    name: string;
    item_type?: string;
    item_slot?: string;
    caster_level?: number;
    aura?: string;
    price_gold?: number;
    weight_lb?: number;
    description?: string;
    image_url?: string;
}

interface MagicItemsClientProps {
    magicItems: MagicItem[];
}

export default function MagicItemsClient({ magicItems }: MagicItemsClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const filteredItems = magicItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Agrupar por tipo
    const itemsByType = filteredItems.reduce((acc, item) => {
        const type = item.item_type || 'Sin clasificar';
        if (!acc[type]) acc[type] = [];
        acc[type].push(item);
        return acc;
    }, {} as Record<string, MagicItem[]>);

    const typeLabels: Record<string, string> = {
        'Objeto Maravilloso': 'Objetos Maravillosos',
        'Anillo': 'Anillos',
        'Bastón': 'Bastones',
        'Vara': 'Varas',
        'Varita': 'Varitas',
        'Poción': 'Pociones',
        'Pergamino': 'Pergaminos',
        'Arma': 'Armas Mágicas',
        'Armadura': 'Armaduras Mágicas',
        'Artefacto': 'Artefactos',
        'Sin clasificar': 'Sin Clasificar'
    };

    const formatPrice = (price?: number) => {
        if (!price) return 'Invaluable';
        return `${price.toLocaleString()} po`;
    };

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
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300 pl-0">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-200 leading-tight">
                            Objetos Mágicos
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Descubre tesoros arcanos y divinos. Desde pociones curativas hasta artefactos legendarios,
                            el poder de la magia está a tu alcance.
                        </p>
                    </div>

                    {/* Icon Display */}
                    <div className="p-6 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
                        <Sparkles className="h-12 w-12 text-purple-500" />
                    </div>
                </div>
            </div>

            {/* Control Panel / Filters */}
            <div className="sticky top-4 z-30 bg-dungeon-950/95 backdrop-blur-md border border-dungeon-800 rounded-xl shadow-lg p-4 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-500 group-focus-within:text-gold-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar objeto mágico..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-dungeon-900 border border-dungeon-700 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                        />
                    </div>

                    {/* Filter Toggle (Mobile) & Active Filters Summary */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                            <Sparkles className="h-4 w-4 text-gold-500" />
                            <span>Mostrando {filteredItems.length} objetos</span>
                        </div>

                        <button
                            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${mobileFiltersOpen
                                ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                                : 'bg-dungeon-800 border-dungeon-700 text-gray-300 hover:border-dungeon-600'
                                }`}
                        >
                            <Filter className="h-4 w-4" />
                            <span className="font-medium">Filtros</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <ScrollReveal delay={100}>
                <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-purple-500 uppercase tracking-wider mb-3">
                        Información de Objetos Mágicos
                    </h3>
                    <div className="space-y-3 text-sm text-gray-400">
                        <p>
                            Los objetos mágicos son tesoros codiciados por los aventureros. Desde anillos encantados
                            hasta poderosos artefactos, cada objeto tiene propiedades únicas.
                        </p>
                        <p>
                            <span className="text-purple-500 font-semibold">Nivel de Lanzador (NL):</span> Indica
                            el nivel de conjurador requerido para crear el objeto y afecta la potencia de sus efectos.
                        </p>
                        <p>
                            <span className="text-purple-500 font-semibold">Aura:</span> Los objetos mágicos emiten
                            un aura que puede ser detectada mediante conjuros como <em>detectar magia</em>.
                        </p>
                        <p>
                            <span className="text-purple-500 font-semibold">Espacio:</span> Algunos objetos ocupan
                            un espacio específico del cuerpo (manos, cabeza, cuello, etc.) y no pueden combinarse
                            con otros objetos del mismo tipo.
                        </p>
                    </div>
                </div>
            </ScrollReveal>

            {/* Empty State */}
            {filteredItems.length === 0 && (
                <div className="text-center py-16 bg-dungeon-900/50 rounded-xl border border-dungeon-800 border-dashed">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dungeon-800 mb-4">
                        <Search className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gray-300 mb-2">No se encontraron objetos mágicos</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Intenta ajustar los filtros o buscar con otros términos.
                    </p>
                    <button
                        onClick={() => setSearchTerm('')}
                        className="mt-6 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors"
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}

            {/* Items by Type */}
            {Object.keys(itemsByType).length > 0 && (
                <div className="space-y-12">
                    {Object.entries(itemsByType).map(([type, typeItems], typeIndex) => (
                        <ScrollReveal key={type} delay={typeIndex * 100}>
                            <Card className="card">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-purple-400">
                                        <Sparkles className="h-5 w-5" />
                                        {typeLabels[type] || type}
                                        <span className="text-sm font-normal text-gray-400">
                                            ({typeItems.length})
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {typeItems.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/objetos/magicos/${item.slug}`}
                                                className="block group bg-purple-500/5 hover:bg-purple-500/10 border border-dungeon-700 hover:border-purple-500/50 rounded-lg p-4 transition-all duration-200"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="font-semibold text-gray-200 group-hover:text-purple-400 transition-colors">
                                                        {item.name}
                                                    </h3>
                                                    {item.caster_level && (
                                                        <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                                            NL {item.caster_level}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {item.aura && (
                                                        <span className="text-xs px-2 py-0.5 rounded bg-dungeon-800 text-gray-400 border border-dungeon-700">
                                                            {item.aura}
                                                        </span>
                                                    )}
                                                    {item.item_slot && (
                                                        <span className="text-xs px-2 py-0.5 rounded bg-dungeon-800 text-gray-400 border border-dungeon-700">
                                                            {item.item_slot}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between text-xs text-gray-400">
                                                    <span className="text-gold-500 font-semibold">
                                                        {formatPrice(item.price_gold)}
                                                    </span>
                                                    {item.weight_lb && item.weight_lb > 0 && (
                                                        <span>{item.weight_lb} lb</span>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollReveal>
                    ))}
                </div>
            )}
        </div>
    );
}
