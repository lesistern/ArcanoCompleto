'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Eye, EyeOff, AlertTriangle, Sparkles, ArrowLeft, Skull } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ScrollReveal from '@/components/ScrollReveal';
import { Monster } from '@/lib/services/monsterService.client';
import {
    CATEGORY_ORDER,
    getCategoryIcon,
    getCategoryColor,
    categorizeMonsters,
    filterMonstersByName
} from '@/lib/data/monster-management';

interface MonstersClientProps {
    monsters: Monster[];
}

export default function MonstersClient({ monsters }: MonstersClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [revealedMonsters, setRevealedMonsters] = useState<Set<string>>(new Set());

    // Filtrar monstruos por búsqueda
    const filteredMonsters = filterMonstersByName(monsters, searchTerm);

    // Agrupar monstruos por categoría
    const monstersByCategory = categorizeMonsters(filteredMonsters);

    // Toggle reveal de un monstruo específico
    const toggleReveal = (monsterId: string) => {
        setRevealedMonsters((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(monsterId)) {
                newSet.delete(monsterId);
            } else {
                newSet.add(monsterId);
            }
            return newSet;
        });
    };

    // Toggle reveal all
    const revealAll = () => {
        setRevealedMonsters(new Set(filteredMonsters.map((m) => m.id)));
    };

    const hideAll = () => {
        setRevealedMonsters(new Set());
    };

    // Renderizar card de monstruo
    const renderMonsterCard = (monster: Monster) => {
        const isRevealed = revealedMonsters.has(monster.id);

        return (
            <Card key={monster.id} className="card hover:border-gold-500/30 transition-all">
                <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-xl text-gold-400">{monster.name}</CardTitle>
                        <button
                            onClick={() => toggleReveal(monster.id)}
                            className={`
                p-2 rounded transition-all
                ${isRevealed
                                    ? 'bg-green-900/30 text-green-400 hover:bg-green-900/40'
                                    : 'bg-red-900/30 text-red-400 hover:bg-red-900/40'
                                }
              `}
                            aria-label={isRevealed ? 'Ocultar estadísticas' : 'Ver estadísticas'}
                        >
                            {isRevealed ? (
                                <Eye className="h-5 w-5" />
                            ) : (
                                <EyeOff className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Información siempre visible (no es spoiler) */}
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500">Tipo:</span>
                            <span className="text-gray-400">{monster.creature_type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500">Tamaño:</span>
                            <span className="text-gray-400">{monster.size}</span>
                        </div>
                    </div>

                    {/* Estadísticas (spoiler) */}
                    {isRevealed ? (
                        <div className="space-y-2 pt-4 border-t border-dungeon-700">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">CR:</span>
                                <span className="px-2 py-1 bg-purple-900/30 border border-purple-700/50 rounded text-purple-300 font-semibold">
                                    {monster.challenge_rating}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">CA:</span>
                                <span className="text-gray-400">
                                    {typeof monster.armor_class === 'object'
                                        ? monster.armor_class.total
                                        : monster.armor_class}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">DG:</span>
                                <span className="text-gray-400">
                                    {typeof monster.hit_dice === 'object'
                                        ? `${monster.hit_dice.dice} (${monster.hit_dice.average})`
                                        : monster.hit_dice}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">Alineamiento:</span>
                                <span className="text-gray-400">{monster.alignment}</span>
                            </div>
                            {monster.environment && (
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-500">Entorno:</span>
                                    <span className="text-gray-400">{monster.environment}</span>
                                </div>
                            )}

                            {/* Link a página de detalle */}
                            <Link
                                href={`/monstruos/${monster.slug}`}
                                className="mt-4 block w-full text-center btn btn-primary"
                            >
                                Ver Detalles Completos
                            </Link>
                        </div>
                    ) : (
                        <div className="pt-4 border-t border-dungeon-700">
                            <div className="flex items-center gap-2 text-sm text-gray-500 italic">
                                <EyeOff className="h-4 w-4" />
                                <span>Estadísticas ocultas (anti-spoiler)</span>
                            </div>
                            <button
                                onClick={() => toggleReveal(monster.id)}
                                className="mt-3 w-full btn btn-secondary"
                            >
                                Ver Estadísticas
                            </button>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
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
                            <Link href="/3.5">
                                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-300 pl-0">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver al Inicio
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-200 leading-tight">
                            Bestiario
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Monstruos de D&D 3.5 con sistema anti-spoiler. Ideal para jugadores que solo necesitan verificar el nombre durante una partida.
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-500 pt-2">
                            <span className="bg-dungeon-950/50 border border-dungeon-700 rounded-full px-3 py-1">{monsters.length} monstruos disponibles</span>
                            <span className="bg-dungeon-950/50 border border-dungeon-700 rounded-full px-3 py-1">Sistema Anti-Spoiler</span>
                        </div>
                    </div>

                    {/* Icon Display */}
                    <div className="p-6 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
                        <Skull className="h-12 w-12 text-red-500" />
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
                            placeholder="Buscar monstruo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-dungeon-900 border border-dungeon-700 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                        />
                    </div>

                    {/* Action Buttons & Filter Toggle */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
                        <div className="flex gap-2">
                            <button
                                onClick={revealAll}
                                className="btn btn-xs sm:btn-sm bg-green-900/30 border-green-800 text-green-400 hover:bg-green-900/50"
                                title="Revelar todos los spoilers"
                            >
                                <Eye className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">Revelar Todos</span>
                            </button>
                            <button
                                onClick={hideAll}
                                className="btn btn-xs sm:btn-sm bg-red-900/30 border-red-800 text-red-400 hover:bg-red-900/50"
                                title="Ocultar todos los spoilers"
                            >
                                <EyeOff className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">Ocultar Todos</span>
                            </button>
                        </div>

                        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 ml-2">
                            <Sparkles className="h-4 w-4 text-gold-500" />
                            <span>{filteredMonsters.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Advertencia de Spoilers */}
            <ScrollReveal delay={100}>
                <div className="flex items-start gap-3 rounded-lg border border-orange-500/30 bg-orange-900/20 p-4 mb-6">
                    <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                        <p className="font-semibold text-orange-300 mb-1">Sistema Anti-Spoiler Activado</p>
                        <p className="text-orange-200/80">
                            Las estadísticas de los monstruos están ocultas por defecto.
                        </p>
                    </div>
                </div>
            </ScrollReveal>

            {/* Monstruos por Categoría */}
            {filteredMonsters.length === 0 ? (
                <ScrollReveal delay={200}>
                    <div className="text-center py-16 bg-dungeon-900/50 rounded-xl border border-dungeon-800 border-dashed">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dungeon-800 mb-4">
                            <Search className="h-8 w-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-heading font-semibold text-gray-300 mb-2">No se encontraron monstruos</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Intenta buscar con otros términos.
                        </p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-6 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors"
                        >
                            Limpiar búsqueda
                        </button>
                    </div>
                </ScrollReveal>
            ) : (
                <div className="space-y-6 mb-16">
                    {CATEGORY_ORDER.map((category, catIndex) => {
                        const categoryMonsters = monstersByCategory[category];

                        // Solo mostrar categoría si tiene monstruos
                        if (categoryMonsters.length === 0) return null;

                        const Icon = getCategoryIcon(category);
                        const colorClass = getCategoryColor(category);

                        return (
                            <ScrollReveal key={category} delay={catIndex * 100}>
                                <Card className="card">
                                    <CardHeader>
                                        <CardTitle className={`flex items-center gap-2 ${colorClass}`}>
                                            <Icon className="h-5 w-5" />
                                            {category} ({categoryMonsters.length})
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {categoryMonsters.map((monster) => renderMonsterCard(monster))}
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
                        Información del Bestiario
                    </h3>
                    <div className="space-y-3 text-sm text-gray-400">
                        <p>
                            El bestiario contiene monstruos del Monster Manual de D&D 3.5. Usa el sistema anti-spoiler
                            para evitar revelaciones accidentales durante tus partidas.
                        </p>
                        <p>
                            <span className="text-gold-500 font-semibold">CR (Challenge Rating):</span> Indica la
                            dificultad del encuentro. Un CR igual al nivel del grupo es un desafío equilibrado.
                        </p>
                        <p>
                            <span className="text-gold-500 font-semibold">CA (Clase de Armadura):</span> Determina
                            qué tan difícil es golpear a la criatura.
                        </p>
                        <p>
                            <span className="text-gold-500 font-semibold">DG (Dados de Golpe):</span> Indica los
                            puntos de golpe y nivel aproximado de la criatura.
                        </p>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
