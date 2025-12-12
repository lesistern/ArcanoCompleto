'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Filter, ChevronDown, Search, Sparkles, ArrowLeft, Zap } from 'lucide-react';
import FeatCard from '@/components/feats/FeatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DnDFeat, FeatType } from '@/lib/types/feat';
import { getFeatTypeIcon, getFeatTypeColor, extractTextColor } from '@/lib/utils/icons';
import ScrollReveal from '@/components/ScrollReveal';
import { BookFilter } from '@/components/books/BookFilter';
import {
    filterFeats,
    groupFeatsByType,
    FEAT_TYPES,
    FEAT_TYPE_ORDER,
    FeatsFilterState,
} from '@/lib/data/feats-management';

interface FeatsClientProps {
    feats: DnDFeat[];
}

export default function FeatsClient({ feats }: FeatsClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState<FeatType | 'all'>('all');
    const [fighterBonusFilter, setFighterBonusFilter] = useState<boolean | 'all'>('all');
    const [hasPrereqsFilter, setHasPrereqsFilter] = useState<boolean | 'all'>('all');
    const [multipleFilter, setMultipleFilter] = useState<boolean | 'all'>('all');
    const [bookIds, setBookIds] = useState<number[]>([]);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Build filter state object
    const filterState: FeatsFilterState = {
        selectedType,
        fighterBonusFilter,
        hasPrereqsFilter,
        multipleFilter,
        bookIds,
    };

    // Filter feats using centralized function
    // Note: filterFeats inside feats-management might not handle searchTerm if it wasn't designed for it.
    // Let's check if we need to add search filtering manually or if filterFeats supports it.
    // Looking at previous code, it didn't pass searchTerm to filterFeats.
    // So we'll apply search filter on top.

    const filteredByState = filterFeats(feats, filterState);

    const filteredFeats = filteredByState.filter(feat => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            feat.name.toLowerCase().includes(term) ||
            feat.slug.toLowerCase().includes(term) ||
            feat.benefit.toLowerCase().includes(term)
        );
    });

    // Group filtered feats by type
    const featsByType = groupFeatsByType(filteredFeats);

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl">
                <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-dungeon-950 via-dungeon-900/90 to-dungeon-950/50"></div>

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Link href="/3.5">
                                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-300 pl-0">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver al Inicio
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-300 leading-tight">
                            Dotes
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Personaliza tu personaje. Las dotes representan capacidades especiales, talentos innatos o entrenamiento intensivo.
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-500 pt-2">
                            <span className="bg-dungeon-950/50 border border-dungeon-700 rounded-full px-3 py-1">{feats.length} dotes disponibles</span>
                            <span className="bg-dungeon-950/50 border border-dungeon-700 rounded-full px-3 py-1">Incluye suplementos</span>
                        </div>
                    </div>

                    {/* Icon Display */}
                    <div className="p-6 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
                        <Zap className="h-12 w-12 text-purple-500" />
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
                            placeholder="Buscar dote..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-dungeon-900 border border-dungeon-700 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                        />
                    </div>

                    {/* Filter Toggle (Mobile) & Active Filters Summary */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                            <Sparkles className="h-4 w-4 text-gold-500" />
                            <span>{filteredFeats.length} dotes encontradas</span>
                        </div>

                        <button
                            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${mobileFiltersOpen
                                ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                                : 'bg-dungeon-800 border-dungeon-700 text-gray-400 hover:border-dungeon-600'
                                }`}
                        >
                            <Filter className="h-4 w-4" />
                            <span className="font-medium">Filtros</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Expanded Filters */}
                {mobileFiltersOpen && (
                    <div className="mt-6 pt-6 border-t border-dungeon-800 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-6">
                            <BookFilter onFilterChange={setBookIds} />

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Filtro por Tipo */}
                                <div>
                                    <label className="block text-sm font-semibold text-gold-500 mb-2">
                                        Tipo
                                    </label>
                                    <select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value as FeatType | 'all')}
                                        className="w-full input text-sm"
                                    >
                                        <option value="all">Todos</option>
                                        {FEAT_TYPES.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Filtro Múltiple */}
                                <div>
                                    <label className="block text-sm font-semibold text-gold-500 mb-2">
                                        Múltiple
                                    </label>
                                    <select
                                        value={multipleFilter === 'all' ? 'all' : String(multipleFilter)}
                                        onChange={(e) => setMultipleFilter(e.target.value === 'all' ? 'all' : e.target.value === 'true')}
                                        className="w-full input text-sm"
                                    >
                                        <option value="all">Todas</option>
                                        <option value="true">Se puede tomar múltiples veces</option>
                                        <option value="false">Solo una vez</option>
                                    </select>
                                </div>

                                {/* Filtro Dote de Guerrero */}
                                <div>
                                    <label className="block text-sm font-semibold text-gold-500 mb-2">
                                        Dote de Guerrero
                                    </label>
                                    <select
                                        value={fighterBonusFilter === 'all' ? 'all' : String(fighterBonusFilter)}
                                        onChange={(e) => setFighterBonusFilter(e.target.value === 'all' ? 'all' : e.target.value === 'true')}
                                        className="w-full input text-sm"
                                    >
                                        <option value="all">Todas</option>
                                        <option value="true">Solo dotes de guerrero</option>
                                        <option value="false">No dotes de guerrero</option>
                                    </select>
                                </div>

                                {/* Filtro Prerrequisitos */}
                                <div>
                                    <label className="block text-sm font-semibold text-gold-500 mb-2">
                                        Prerrequisitos
                                    </label>
                                    <select
                                        value={hasPrereqsFilter === 'all' ? 'all' : String(hasPrereqsFilter)}
                                        onChange={(e) => setHasPrereqsFilter(e.target.value === 'all' ? 'all' : e.target.value === 'true')}
                                        className="w-full input text-sm"
                                    >
                                        <option value="all">Todas</option>
                                        <option value="true">Con prerrequisitos</option>
                                        <option value="false">Sin prerrequisitos</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Dotes por Tipo */}
            {filteredFeats.length === 0 ? (
                <ScrollReveal delay={200}>
                    <div className="text-center py-16 bg-dungeon-900/50 rounded-xl border border-dungeon-800 border-dashed">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dungeon-800 mb-4">
                            <Search className="h-8 w-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-heading font-semibold text-gray-300 mb-2">No se encontraron dotes</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            Intenta ajustar los filtros o buscar con otros términos.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedType('all');
                                setFighterBonusFilter('all');
                                setHasPrereqsFilter('all');
                                setMultipleFilter('all');
                                setBookIds([]);
                            }}
                            className="mt-6 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </ScrollReveal>
            ) : (
                <div className="space-y-6 mb-16">
                    {FEAT_TYPE_ORDER.map((type, typeIndex) => {
                        const typeFeats = featsByType[type];

                        // Solo mostrar tipo si tiene dotes
                        if (typeFeats.length === 0) return null;

                        const Icon = getFeatTypeIcon(type);
                        const colorClasses = getFeatTypeColor(type);
                        const iconColor = extractTextColor(colorClasses);

                        return (
                            <ScrollReveal key={type} delay={typeIndex * 100}>
                                <Card className="card">
                                    <CardHeader>
                                        <CardTitle className={`flex items-center gap-2 ${iconColor}`}>
                                            <Icon className="h-5 w-5" />
                                            {type} ({typeFeats.length})
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {typeFeats.map((featData, index) => (
                                                <ScrollReveal
                                                    key={featData.id}
                                                    delay={index * 50}
                                                    direction="up"
                                                >
                                                    <FeatCard featData={featData} />
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
                    <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
                        Información de Dotes
                    </h3>
                    <div className="space-y-3 text-sm text-gray-400">
                        <p>
                            Las dotes representan capacidades especiales de tu personaje más allá de las otorgadas
                            por su raza y clase.
                        </p>
                        <p>
                            <span className="text-gold-500 font-semibold">Dotes de Guerrero:</span> Los guerreros
                            obtienen dotes adicionales de combate en ciertos niveles.
                        </p>
                        <p>
                            <span className="text-gold-500 font-semibold">Dotes de Metamagia:</span> Permiten a los
                            lanzadores de conjuros modificar sus hechizos de formas útiles.
                        </p>
                        <p>
                            <span className="text-gold-500 font-semibold">Múltiple:</span> Algunas dotes pueden
                            tomarse múltiples veces, con efectos que se acumulan o aplican a diferentes aspectos.
                        </p>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
