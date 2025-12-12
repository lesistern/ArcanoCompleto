'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Shield, Brain, Dices, BookOpen, Scroll, Users, Swords, Target, Zap,
    Backpack, Map, Wand2, Crown, UserPlus, Search, Sparkles, Filter,
    ChevronDown, ArrowLeft, AlertTriangle, Gem, Lock, Hammer, Skull,
    Globe, Flame, CloudSun, Trophy
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ScrollReveal from '@/components/ScrollReveal';
import { getAbilityIconById, getAbilityColorById } from '@/lib/utils/icons';
import { getDiceIcon } from '@/lib/utils/diceIcons';
import { RuleCard } from '@/components/reglas/RuleCard';
import { ExpandableRuleSection } from '@/components/reglas/ExpandableRuleSection';

// Interfaces
interface AbilityScore {
    id: string;
    name: string;
    abbreviation: string;
    description: string;
    slug: string;
}

interface SavingThrow {
    id: number;
    name: string;
    description: string;
    slug: string;
    ability_score_id: string;
}

interface Dice {
    id: string;
    sides: number;
    description: string;
    slug: string;
}

interface RuleContent {
    slug: string;
    title: string;
    description: string;
    category: string;
}

interface RulesClientProps {
    dice: Dice[];
    abilityScores: AbilityScore[];
    savingThrows: SavingThrow[];
    rulesContent: RuleContent[];
}

// Main Guides Data
const MAIN_GUIDES = [
    {
        title: 'Pantalla del DM',
        href: '/dm-screen',
        description: 'Herramientas esenciales para Dungeon Masters: tablas de referencia, construcción de encuentros, PNJs y más.',
        icon: Shield,
        color: 'text-red-500',
        featured: true
    },
    {
        title: 'Reglas básicas',
        href: '/reglas/reglas-basicas',
        description: 'Aprende la mecánica central del d20, tipos de tiradas, combate y conceptos fundamentales del juego.',
        icon: Dices,
        color: 'text-gold-400'
    },
    {
        title: 'Creación de personaje',
        href: '/reglas/creacion-personaje',
        description: 'Guía paso a paso para crear tu aventurero: características, raza, clase, habilidades y equipo.',
        icon: UserPlus,
        color: 'text-blue-400'
    },
    {
        title: 'Características',
        href: '/reglas/caracteristicas',
        description: 'Detalles completos sobre las seis características: Fuerza, Destreza, Constitución, Inteligencia, Sabiduría y Carisma.',
        icon: Brain,
        color: 'text-purple-400'
    },
    {
        title: 'Razas',
        href: '/reglas/razas',
        description: 'Cómo elegir una raza, cualidades raciales, idiomas y ajustes de característica.',
        icon: Users,
        color: 'text-green-400'
    },
    {
        title: 'Clases',
        href: '/reglas/clases',
        description: 'Resumen de clases, bonificadores, beneficios por nivel y progresión de personaje.',
        icon: Crown,
        color: 'text-red-400'
    },
    {
        title: 'Habilidades',
        href: '/reglas/habilidades',
        description: 'Reglas sobre obtención de rangos, pruebas de habilidad, sinergias y usos especiales.',
        icon: Target,
        color: 'text-orange-400'
    },
    {
        title: 'Dotes',
        href: '/reglas/dotes',
        description: 'Capacidades especiales, desde combate y magia hasta creación de objetos y herencias.',
        icon: Zap,
        color: 'text-yellow-400'
    },
    {
        title: 'Descripción',
        href: '/reglas/descripcion',
        description: 'Detalles que dan vida a tu personaje: alineamiento, religión, apariencia, personalidad y trasfondo.',
        icon: Scroll,
        color: 'text-gold-400'
    },
    {
        title: 'Equipamiento',
        href: '/reglas/equipamiento',
        description: 'Armas, armaduras, bienes y servicios para equipar a tu personaje para la aventura.',
        icon: Backpack,
        color: 'text-amber-500'
    },
    {
        title: 'Combate',
        href: '/reglas/combate',
        description: 'Iniciativa, acciones, ataque, daño, movimiento táctico y maniobras especiales.',
        icon: Swords,
        color: 'text-red-500'
    },
    {
        title: 'Aventura',
        href: '/reglas/aventura',
        description: 'Exploración, movimiento, luz, carga, trampas y peligros del entorno.',
        icon: Map,
        color: 'text-emerald-400'
    },
    {
        title: 'Magia',
        href: '/reglas/magia',
        description: 'Lanzamiento de conjuros, escuelas de magia, componentes y concentración.',
        icon: Wand2,
        color: 'text-violet-400'
    },
    {
        title: 'Crear Hoja de PJ',
        href: '/reglas/crear-hoja-pj',
        description: 'Guía paso a paso para completar tu hoja de personaje de D&D 3.5 correctamente.',
        icon: Scroll,
        color: 'text-indigo-400'
    },
    // === SECCIONES ADICIONALES DEL SRD ===
    {
        title: 'Condiciones',
        href: '/reglas/condiciones',
        description: 'Estados que afectan a las criaturas: cegado, aturdido, paralizado, envenenado y más.',
        icon: AlertTriangle,
        color: 'text-rose-400'
    },
    {
        title: 'Objetos Mágicos',
        href: '/reglas/objetos-magicos',
        description: 'Reglas para usar, identificar y crear objetos mágicos: armas, armaduras, anillos, varitas y más.',
        icon: Gem,
        color: 'text-cyan-400'
    },
    {
        title: 'Clases de Prestigio',
        href: '/reglas/clases-prestigio',
        description: 'Clases avanzadas con requisitos especiales: Asesino, Arcano Adepto, Campeón Arcano y más.',
        icon: Trophy,
        color: 'text-amber-400'
    },
    {
        title: 'Materiales Especiales',
        href: '/reglas/materiales-especiales',
        description: 'Materiales extraordinarios para armas y armaduras: adamantina, mithral, hierro frío, plata.',
        icon: Hammer,
        color: 'text-slate-400'
    }
];

export default function RulesClient({ dice, abilityScores, savingThrows, rulesContent }: RulesClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState<string>('Todas');

    // Helper to filter items
    const filterItem = (item: any) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            item.title?.toLowerCase().includes(term) ||
            item.name?.toLowerCase().includes(term) ||
            item.description?.toLowerCase().includes(term) ||
            item.id?.toLowerCase().includes(term)
        );
    };

    // Filtered Data
    const filteredGuides = MAIN_GUIDES.filter(filterItem);
    const filteredAbilities = abilityScores.filter(filterItem);
    const filteredSaves = savingThrows.filter(filterItem);
    const filteredDice = dice.filter(filterItem);
    const filteredRules = rulesContent.filter(filterItem);

    // Calculate total results
    const totalResults =
        filteredGuides.length +
        filteredAbilities.length +
        filteredSaves.length +
        filteredDice.length +
        filteredRules.length;

    // Sorting abilities
    const abilityOrder = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    const sortedAbilities = filteredAbilities.slice().sort(
        (a, b) => abilityOrder.indexOf(a.id) - abilityOrder.indexOf(b.id)
    );

    const sections = [
        { id: 'guias', label: 'Guías Principales', count: filteredGuides.length },
        { id: 'caracteristicas', label: 'Características', count: filteredAbilities.length },
        { id: 'salvaciones', label: 'Salvaciones', count: filteredSaves.length },
        { id: 'dados', label: 'Dados', count: filteredDice.length },
        { id: 'adicionales', label: 'Reglas Adicionales', count: filteredRules.length },
    ];

    const shouldShowSection = (sectionId: string, count: number) => {
        if (count === 0) return false;
        if (selectedSection === 'Todas') return true;
        return selectedSection === sectionId;
    };

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl">
                <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/90 to-gray-950/50"></div>

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <Link href="/3.5">
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200 pl-0">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver al Inicio
                                </Button>
                            </Link>
                            <Link href="/introduccion">
                                <Button variant="outline" size="sm" className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500">
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    ¿Nuevo en D&D? Aprende a jugar
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-100 leading-tight">
                            Reglas del Sistema
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Guía completa del sistema d20: mecánicas básicas, creación de personajes, combate y todo lo que necesitas para tu aventura.
                        </p>
                    </div>

                    {/* Icon Display */}
                    <div className="p-6 rounded-full bg-gold-500/10 border border-gold-500/30 backdrop-blur-sm">
                        <BookOpen className="h-12 w-12 text-gold-500" />
                    </div>
                </div>
            </div>

            {/* Control Panel / Filters */}
            <div className="sticky top-4 z-30 bg-gray-950/95 backdrop-blur-md border border-gray-800 rounded-xl shadow-lg p-4 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-500 group-focus-within:text-gold-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar reglas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                        />
                    </div>

                    {/* Filter Toggle (Mobile) & Active Filters Summary */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                            <Sparkles className="h-4 w-4 text-gold-500" />
                            <span>{totalResults} resultados</span>
                        </div>

                        <button
                            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${mobileFiltersOpen
                                ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                                : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                                }`}
                        >
                            <Filter className="h-4 w-4" />
                            <span className="font-medium">Secciones</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Expanded Filters */}
                {mobileFiltersOpen && (
                    <div className="mt-6 pt-6 border-t border-gray-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-2 col-span-full">
                            <label className="text-xs font-bold text-gold-500 uppercase tracking-wider block mb-2">
                                Filtrar por Sección
                            </label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedSection('Todas')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedSection === 'Todas'
                                        ? 'bg-gold-600 text-gray-950'
                                        : 'bg-gray-800 border border-gray-700 text-gray-300 hover:border-gold-500/50'
                                        }`}
                                >
                                    Todas
                                </button>
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setSelectedSection(section.id)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedSection === section.id
                                            ? 'bg-gold-600 text-gray-950'
                                            : 'bg-gray-800 border border-gray-700 text-gray-300 hover:border-gold-500/50'
                                            }`}
                                    >
                                        {section.label} ({section.count})
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Empty State */}
            {totalResults === 0 && (
                <div className="text-center py-16 bg-gray-900/50 rounded-xl border border-gray-800 border-dashed">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                        <Search className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gray-200 mb-2">No se encontraron reglas</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Intenta ajustar los filtros o buscar con otros términos.
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedSection('Todas');
                        }}
                        className="mt-6 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors"
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}

            {/* Guías Principales */}
            {shouldShowSection('guias', filteredGuides.length) && (
                <section id="guias-principales">
                    <div className="flex items-center gap-3 mb-6">
                        <BookOpen className="h-8 w-8 text-gold-500" />
                        <h2 className="text-2xl font-bold text-gray-100">Guías principales</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {filteredGuides.map((guide) => (
                            <Link
                                key={guide.title}
                                href={guide.href}
                                className="block transition-transform hover:scale-[1.02]"
                            >
                                <Card className="card h-full hover:border-gold-500/50 transition-colors">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-center mb-3">
                                            <guide.icon className={`h-12 w-12 ${guide.color}`} />
                                        </div>
                                        <CardTitle className="text-xl text-center text-gray-100">
                                            {guide.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-300 text-center">
                                            {guide.description}
                                        </p>
                                        <div className="mt-4 text-center">
                                            <span className="text-xs text-gold-500 font-medium">
                                                Leer guía completa →
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
