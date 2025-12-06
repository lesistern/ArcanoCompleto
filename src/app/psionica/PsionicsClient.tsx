'use client';

import { useState } from 'react';
import { Filter, ChevronDown, Brain, Search, Sparkles, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

interface PsionicPower {
    id: number;
    name: string;
    slug: string;
    school: string | null;
    level: string | null;
    casting_time: string | null;
    range: string | null;
    target: string | null;
    duration: string | null;
    saving_throw: string | null;
    spell_resistance: string | null;
    description: string | null;
    power_points_section: string | null;
}

interface PsionicsClientProps {
    powers: PsionicPower[];
}

export default function PsionicsClient({ powers }: PsionicsClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Get unique disciplines
    const disciplines = Array.from(new Set(powers.map(p => p.school).filter((s): s is string => s !== null))).sort();

    // Filter powers
    const filteredPowers = powers.filter(power => {
        const matchesSearch = power.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (power.school && power.school.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (power.description && power.description.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesDiscipline = selectedDiscipline === 'all' || power.school === selectedDiscipline;

        return matchesSearch && matchesDiscipline;
    });

    // Group powers by discipline
    const powersByDiscipline: Record<string, PsionicPower[]> = {};
    filteredPowers.forEach(power => {
        const discipline = power.school || 'Sin disciplina';
        if (!powersByDiscipline[discipline]) {
            powersByDiscipline[discipline] = [];
        }
        powersByDiscipline[discipline].push(power);
    });

    const disciplineOrder = Object.keys(powersByDiscipline).sort();

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
                                <Button variant="ghost" size="sm" className="text-dungeon-400 hover:text-dungeon-200 pl-0">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver al Inicio
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-dungeon-100 leading-tight">
                            Poderes Psiónicos
                        </h1>
                        <p className="text-lg text-dungeon-300 leading-relaxed">
                            El poder de la mente. Explora las manifestaciones psiónicas del Manual Expandido de Psiónica.
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-dungeon-400 pt-2">
                            <span className="bg-dungeon-950/50 border border-dungeon-700 rounded-full px-3 py-1">{powers.length} poderes disponibles</span>
                            <span className="bg-dungeon-950/50 border border-dungeon-700 rounded-full px-3 py-1">XPH</span>
                        </div>
                    </div>

                    {/* Icon Display */}
                    <div className="p-6 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
                        <Brain className="h-12 w-12 text-purple-500" />
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
                            placeholder="Buscar poder..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-dungeon-900 border border-dungeon-700 rounded-lg text-dungeon-100 placeholder-dungeon-500 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                        />
                    </div>

                    {/* Filter Toggle (Mobile) & Active Filters Summary */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <div className="hidden md:flex items-center gap-2 text-sm text-dungeon-400">
                            <Sparkles className="h-4 w-4 text-gold-500" />
                            <span>{filteredPowers.length} poderes encontrados</span>
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

                {/* Expanded Filters */}
                {mobileFiltersOpen && (
                    <div className="mt-6 pt-6 border-t border-dungeon-800 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Filtro por Disciplina */}
                                <div>
                                    <label className="block text-sm font-semibold text-gold-500 mb-2">
                                        Disciplina
                                    </label>
                                    <select
                                        value={selectedDiscipline}
                                        onChange={(e) => setSelectedDiscipline(e.target.value)}
                                        className="w-full input text-sm"
                                    >
                                        <option value="all">Todas</option>
                                        {disciplines.map(discipline => (
                                            <option key={discipline} value={discipline}>{discipline}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Poderes por Disciplina */}
            {filteredPowers.length === 0 ? (
                <ScrollReveal delay={200}>
                    <div className="text-center py-16 bg-dungeon-900/50 rounded-xl border border-dungeon-800 border-dashed">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dungeon-800 mb-4">
                            <Search className="h-8 w-8 text-dungeon-500" />
                        </div>
                        <h3 className="text-xl font-heading font-semibold text-dungeon-200 mb-2">No se encontraron poderes</h3>
                        <p className="text-dungeon-400 max-w-md mx-auto">
                            Intenta ajustar los filtros o buscar con otros términos.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedDiscipline('all');
                            }}
                            className="mt-6 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </ScrollReveal>
            ) : (
                <div className="space-y-6 mb-16">
                    {disciplineOrder.map((discipline, disciplineIndex) => {
                        const disciplinePowers = powersByDiscipline[discipline];

                        return (
                            <ScrollReveal key={discipline} delay={disciplineIndex * 100}>
                                <Card className="card">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-purple-400">
                                            <Brain className="h-5 w-5" />
                                            {discipline} ({disciplinePowers.length})
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {disciplinePowers.map((power, index) => (
                                                <ScrollReveal
                                                    key={power.id}
                                                    delay={index * 50}
                                                    direction="up"
                                                >
                                                    <Link
                                                        href={`/psionica/poderes/${power.slug}`}
                                                        className="block group bg-dungeon-800/50 hover:bg-dungeon-800 border border-dungeon-700 hover:border-purple-500 rounded-lg p-4 transition-all duration-200"
                                                    >
                                                        <h3 className="font-semibold text-dungeon-100 group-hover:text-purple-400 mb-2 transition-colors">
                                                            {power.name}
                                                        </h3>
                                                        {power.level && (
                                                            <p className="text-xs text-dungeon-400 mb-1">
                                                                {power.level}
                                                            </p>
                                                        )}
                                                        {power.power_points_section && (
                                                            <p className="text-xs text-purple-500">
                                                                {power.power_points_section} PP
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
                    <h3 className="text-sm font-semibold text-purple-500 uppercase tracking-wider mb-3">
                        Información de Poderes Psiónicos
                    </h3>
                    <div className="space-y-3 text-sm text-dungeon-300">
                        <p>
                            Los poderes psiónicos representan las habilidades mentales de los personajes psiónicos,
                            manifestadas a través del gasto de puntos de poder.
                        </p>
                        <p>
                            <span className="text-purple-500 font-semibold">Disciplinas:</span> Cada poder pertenece
                            a una disciplina psiónica que define su naturaleza y efectos.
                        </p>
                        <p>
                            <span className="text-purple-500 font-semibold">Puntos de Poder:</span> Los poderes
                            requieren puntos de poder para ser manifestados, y algunos pueden ser aumentados
                            gastando puntos adicionales.
                        </p>
                        <p>
                            <span className="text-purple-500 font-semibold">Manifestación:</span> A diferencia de
                            los conjuros, los poderes psiónicos se manifiestan instantáneamente sin componentes
                            verbales o somáticos.
                        </p>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
