'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Filter, ChevronDown, Search, Sparkles, ArrowLeft, BookOpen, Scroll } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ScrollReveal from '@/components/ScrollReveal';
import { BookFilter } from '@/components/books/BookFilter';
import { SpellData, SPELL_SCHOOLS, getSchoolColor } from '@/lib/data/spell-management';

interface SpellsClientProps {
    spells: SpellData[];
}

export default function SpellsClient({ spells }: SpellsClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSchool, setSelectedSchool] = useState<string | 'all'>('all');
    const [selectedLevel, setSelectedLevel] = useState<string | 'all'>('all');
    const [bookIds, setBookIds] = useState<number[]>([]);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Filter spells
    const filteredSpells = spells.filter(spell => {
        // Search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const matchesSearch =
                spell.name.toLowerCase().includes(term) ||
                spell.slug.toLowerCase().includes(term) ||
                spell.school.toLowerCase().includes(term);
            if (!matchesSearch) return false;
        }

        // School filter
        if (selectedSchool !== 'all' && spell.school !== selectedSchool) {
            return false;
        }

        // Level filter (simple check if the level string contains the number)
        // This is a bit naive but works for "Mago 3" containing "3"
        if (selectedLevel !== 'all') {
            // Extract all numbers from the level string
            const levels = spell.level.match(/\d+/g);
            if (!levels || !levels.includes(selectedLevel)) {
                return false;
            }
        }

        // Book filter
        if (bookIds.length > 0) {
            if (!spell.book_id || !bookIds.includes(spell.book_id)) {
                return false;
            }
        }

        return true;
    });

    // Group spells by School or Level?
    // Let's group by School for now, similar to Feats by Type.
    const spellsBySchool: Record<string, SpellData[]> = {};
    SPELL_SCHOOLS.forEach(school => {
        spellsBySchool[school] = filteredSpells.filter(s => s.school === school);
    });

    // Also handle spells with schools not in the constant list (custom or typos)
    const otherSpells = filteredSpells.filter(s => !(SPELL_SCHOOLS as readonly string[]).includes(s.school));
    if (otherSpells.length > 0) {
        spellsBySchool['Otros'] = otherSpells;
    }

    const schoolsToShow = [...SPELL_SCHOOLS, 'Otros'].filter(school => spellsBySchool[school]?.length > 0);

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
                            Conjuros
                        </h1>
                        <p className="text-lg text-dungeon-300 leading-relaxed">
                            El poder de lo arcano y lo divino. Explora la lista completa de hechizos disponibles para tus aventuras.
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-dungeon-400 pt-2">
                            <span className="bg-dungeon-950/50 border border-dungeon-700 rounded-full px-3 py-1">{spells.length} conjuros disponibles</span>
                            <span className="bg-dungeon-950/50 border border-dungeon-700 rounded-full px-3 py-1">Arcanos y Divinos</span>
                        </div>
                    </div>

                    {/* Icon Display */}
                    <div className="p-6 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
                        <BookOpen className="h-12 w-12 text-blue-500" />
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
                            placeholder="Buscar conjuro..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-dungeon-900 border border-dungeon-700 rounded-lg text-dungeon-100 placeholder-dungeon-500 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                        />
                    </div>

                    {/* Filter Toggle (Mobile) & Active Filters Summary */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <div className="hidden md:flex items-center gap-2 text-sm text-dungeon-400">
                            <Sparkles className="h-4 w-4 text-gold-500" />
                            <span>{filteredSpells.length} conjuros encontrados</span>
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
                            <BookFilter onFilterChange={setBookIds} />

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Filtro por Escuela */}
                                <div>
                                    <label className="block text-sm font-semibold text-gold-500 mb-2">
                                        Escuela
                                    </label>
                                    <select
                                        value={selectedSchool}
                                        onChange={(e) => setSelectedSchool(e.target.value)}
                                        className="w-full input text-sm"
                                    >
                                        <option value="all">Todas</option>
                                        {SPELL_SCHOOLS.map(school => (
                                            <option key={school} value={school}>{school}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Filtro por Nivel */}
                                <div>
                                    <label className="block text-sm font-semibold text-gold-500 mb-2">
                                        Nivel
                                    </label>
                                    <select
                                        value={selectedLevel}
                                        onChange={(e) => setSelectedLevel(e.target.value)}
                                        className="w-full input text-sm"
                                    >
                                        <option value="all">Todos</option>
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(level => (
                                            <option key={level} value={level.toString()}>Nivel {level}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Conjuros por Escuela */}
            {filteredSpells.length === 0 ? (
                <ScrollReveal delay={200}>
                    <div className="text-center py-16 bg-dungeon-900/50 rounded-xl border border-dungeon-800 border-dashed">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dungeon-800 mb-4">
                            <Search className="h-8 w-8 text-dungeon-500" />
                        </div>
                        <h3 className="text-xl font-heading font-semibold text-dungeon-200 mb-2">No se encontraron conjuros</h3>
                        <p className="text-dungeon-400 max-w-md mx-auto">
                            Intenta ajustar los filtros o buscar con otros términos.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedSchool('all');
                                setSelectedLevel('all');
                            }}
                            className="mt-6 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </ScrollReveal>
            ) : (
                <div className="space-y-6 mb-16">
                    {schoolsToShow.map((school, schoolIndex) => {
                        const schoolSpells = spellsBySchool[school];
                        const colorClass = getSchoolColor(school);

                        return (
                            <ScrollReveal key={school} delay={schoolIndex * 100}>
                                <Card className="card">
                                    <CardHeader>
                                        <CardTitle className={`flex items-center gap-2 ${colorClass}`}>
                                            <Scroll className="h-5 w-5" />
                                            {school} ({schoolSpells.length})
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {schoolSpells.map((spell, index) => (
                                                <ScrollReveal
                                                    key={spell.id}
                                                    delay={index * 50}
                                                    direction="up"
                                                >
                                                    <Link href={`/conjuros/${spell.slug}`}>
                                                        <div className="p-4 rounded-lg bg-dungeon-800/50 border border-dungeon-700 hover:border-gold-500/50 hover:bg-dungeon-800 transition-all cursor-pointer h-full group">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h4 className="font-bold text-dungeon-200 group-hover:text-gold-400 transition-colors">
                                                                    {spell.name}
                                                                </h4>
                                                                <span className="text-xs text-dungeon-500 bg-dungeon-900/50 px-2 py-1 rounded">
                                                                    {spell.school}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-dungeon-400 line-clamp-2 mb-2">
                                                                {spell.description}
                                                            </p>
                                                            <div className="text-xs text-dungeon-500 pt-2 border-t border-dungeon-700/50">
                                                                {spell.level}
                                                            </div>
                                                        </div>
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
        </div>
    );
}
