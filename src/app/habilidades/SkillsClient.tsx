'use client';

import { useState } from 'react';
import { Filter, ChevronDown, Search, BookOpen, Sparkles } from 'lucide-react';
import SkillCard from '@/components/skills/SkillCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DnDSkill, AbilityScore, SkillCategory } from '@/lib/types/skill';
import { getSkillCategoryIcon, getSkillCategoryColor, extractTextColor } from '@/lib/utils/icons';
import {
    filterSkills,
    getUniqueCategoriesFromSkills,
    groupSkillsByCategory,
    ABILITY_SCORES,
    CATEGORY_ORDER,
    SkillsFilterState,
} from '@/lib/data/skills-management';

interface SkillsClientProps {
    skills: DnDSkill[];
}

export default function SkillsClient({ skills }: SkillsClientProps) {
    const [selectedAbility, setSelectedAbility] = useState<AbilityScore | 'all'>('all');
    const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
    const [trainedOnlyFilter, setTrainedOnlyFilter] = useState<boolean | 'all'>('all');
    const [armorPenaltyFilter, setArmorPenaltyFilter] = useState<boolean | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Build filter state object
    const filterState: SkillsFilterState = {
        selectedAbility,
        selectedCategory,
        trainedOnlyFilter,
        armorPenaltyFilter,
        searchQuery,
    };

    // Filter skills using centralized function
    const filteredSkills = filterSkills(skills, filterState);

    // Get unique categories from skills
    const categories = getUniqueCategoriesFromSkills(skills);

    // Group filtered skills by category
    const skillsByCategory = groupSkillsByCategory(filteredSkills);

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl">
                <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-dungeon-950 via-dungeon-900/90 to-dungeon-950/50"></div>

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl space-y-4">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-300 leading-tight">
                            Habilidades y Maestrías
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Las habilidades representan las capacidades mundanas y el entrenamiento de tu personaje.
                            Desde acrobacias impresionantes hasta conocimientos arcanos prohibidos, dominar estas
                            habilidades es esencial para sobrevivir en el mundo.
                        </p>
                    </div>

                    {/* Link a Reglas de Habilidades */}
                    <a
                        href="/reglas/habilidades"
                        className="flex items-center gap-3 px-6 py-4 bg-dungeon-950/50 rounded-lg border border-dungeon-800 backdrop-blur-sm hover:border-gold-500/50 hover:bg-gold-500/10 transition-all group"
                    >
                        <BookOpen className="h-6 w-6 text-gold-500 group-hover:scale-110 transition-transform" />
                        <div className="text-left">
                            <div className="text-sm font-bold text-gold-500 uppercase tracking-wider">Ver Reglas</div>
                            <div className="text-xs text-gray-400">Cómo funcionan las habilidades</div>
                        </div>
                    </a>
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
                            placeholder="Buscar habilidad..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-dungeon-900 border border-dungeon-700 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                        />
                    </div>

                    {/* Filter Toggle (Mobile) & Active Filters Summary */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                            <Sparkles className="h-4 w-4 text-gold-500" />
                            <span>Mostrando {filteredSkills.length} habilidades</span>
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

                {/* Expanded Filters */}
                {mobileFiltersOpen && (
                    <div className="mt-6 pt-6 border-t border-dungeon-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2">
                        {/* Filtro por Habilidad Clave */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gold-500 uppercase tracking-wider">
                                Habilidad Clave
                            </label>
                            <select
                                value={selectedAbility}
                                onChange={(e) => setSelectedAbility(e.target.value as AbilityScore | 'all')}
                                className="w-full bg-dungeon-900 border border-dungeon-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                            >
                                <option value="all">Todas las características</option>
                                {ABILITY_SCORES.map(ability => (
                                    <option key={ability} value={ability}>{ability}</option>
                                ))}
                            </select>
                        </div>

                        {/* Filtro por Categoría */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gold-500 uppercase tracking-wider">
                                Categoría
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value as SkillCategory | 'all')}
                                className="w-full bg-dungeon-900 border border-dungeon-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                            >
                                <option value="all">Todas las categorías</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Filtro Solo Entrenado */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gold-500 uppercase tracking-wider">
                                Entrenamiento
                            </label>
                            <div className="flex bg-dungeon-900 rounded-lg p-1 border border-dungeon-700">
                                <button
                                    onClick={() => setTrainedOnlyFilter('all')}
                                    className={`flex-1 py-1.5 text-xs font-medium rounded ${trainedOnlyFilter === 'all' ? 'bg-dungeon-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                                >
                                    Todos
                                </button>
                                <button
                                    onClick={() => setTrainedOnlyFilter(true)}
                                    className={`flex-1 py-1.5 text-xs font-medium rounded ${trainedOnlyFilter === true ? 'bg-dungeon-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                                >
                                    Entrenado
                                </button>
                                <button
                                    onClick={() => setTrainedOnlyFilter(false)}
                                    className={`flex-1 py-1.5 text-xs font-medium rounded ${trainedOnlyFilter === false ? 'bg-dungeon-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                                >
                                    Simple
                                </button>
                            </div>
                        </div>

                        {/* Filtro Penalización Armadura */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gold-500 uppercase tracking-wider">
                                Penalización Armadura
                            </label>
                            <div className="flex bg-dungeon-900 rounded-lg p-1 border border-dungeon-700">
                                <button
                                    onClick={() => setArmorPenaltyFilter('all')}
                                    className={`flex-1 py-1.5 text-xs font-medium rounded ${armorPenaltyFilter === 'all' ? 'bg-dungeon-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                                >
                                    Todos
                                </button>
                                <button
                                    onClick={() => setArmorPenaltyFilter(true)}
                                    className={`flex-1 py-1.5 text-xs font-medium rounded ${armorPenaltyFilter === true ? 'bg-dungeon-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                                >
                                    Sí
                                </button>
                                <button
                                    onClick={() => setArmorPenaltyFilter(false)}
                                    className={`flex-1 py-1.5 text-xs font-medium rounded ${armorPenaltyFilter === false ? 'bg-dungeon-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Habilidades por Categoría */}
            {filteredSkills.length === 0 ? (
                <div className="text-center py-16 bg-dungeon-900/50 rounded-xl border border-dungeon-800 border-dashed">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dungeon-800 mb-4">
                        <Search className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gray-300 mb-2">No se encontraron habilidades</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Intenta ajustar los filtros o buscar con otros términos.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedAbility('all');
                            setSelectedCategory('all');
                            setTrainedOnlyFilter('all');
                            setArmorPenaltyFilter('all');
                        }}
                        className="mt-6 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors"
                    >
                        Limpiar filtros
                    </button>
                </div>
            ) : (
                <div className="space-y-12 mb-16">
                    {CATEGORY_ORDER.map((category) => {
                        const categorySkills = skillsByCategory[category];

                        // Solo mostrar categoría si tiene habilidades
                        if (categorySkills.length === 0) return null;

                        const Icon = getSkillCategoryIcon(category);
                        const colorClasses = getSkillCategoryColor(category);
                        const iconColor = extractTextColor(colorClasses);

                        return (
                            <div key={category} className="space-y-6">
                                <div className="flex items-center gap-4 pb-4 border-b border-dungeon-800">
                                    <div className={`p-2 rounded-lg bg-dungeon-900 border border-dungeon-700 ${iconColor}`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-heading font-bold text-gray-300">
                                            {category}
                                        </h2>
                                        <p className="text-sm text-gray-400">
                                            {categorySkills.length} habilidades disponibles
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {categorySkills.map((skillData) => (
                                        <SkillCard key={skillData.id} skillData={skillData} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Información adicional */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-dungeon-900/50 border border-dungeon-800 rounded-xl p-6">
                    <h3 className="text-sm font-bold text-gold-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        Solo Entrenado
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Algunas habilidades son tan complejas que no pueden usarse sin entrenamiento formal.
                        Debes tener al menos 1 rango en estas habilidades para intentar usarlas.
                    </p>
                </div>

                <div className="bg-dungeon-900/50 border border-dungeon-800 rounded-xl p-6">
                    <h3 className="text-sm font-bold text-gold-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        Penalización por Armadura
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Las habilidades que requieren libertad de movimiento sufren un penalizador igual al
                        penalizador de armadura de tu equipo. ¡Cuidado con las armaduras pesadas!
                    </p>
                </div>

                <div className="bg-dungeon-900/50 border border-dungeon-800 rounded-xl p-6">
                    <h3 className="text-sm font-bold text-gold-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Sinergia
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        El conocimiento en un área a menudo ayuda en otra. Tener 5 o más rangos en ciertas
                        habilidades otorga un bonificador de +2 en habilidades relacionadas.
                    </p>
                </div>
            </div>
        </div>
    );
}
