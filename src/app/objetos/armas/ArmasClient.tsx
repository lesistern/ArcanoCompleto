'use client';

import { useState, useMemo } from 'react';
import { DnDWeapon } from '@/lib/types/item';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { ArrowLeft, Sword, Filter, Search, Sparkles, ChevronDown } from 'lucide-react';
import { WeaponsRulesInfo } from '@/components/equipment/WeaponsRulesInfo';
import { WeaponsTable } from '@/components/weapons/WeaponsTable';
import {
    categorizeWeapons,
    subcategorizeByType,
    simpleWeaponCategories,
    martialWeaponCategories,
    exoticWeaponCategories,
} from '@/lib/utils/weapon-categorizer';

interface ArmasClientProps {
    weapons: DnDWeapon[];
}

export default function ArmasClient({ weapons }: ArmasClientProps) {
    const [selectedWeaponType, setSelectedWeaponType] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedDamageType, setSelectedDamageType] = useState<string>('all');
    const [selectedSize, setSelectedSize] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Memoize filtering to avoid recalculating on every render
    const allMundaneWeapons = useMemo(() =>
        weapons.filter(weapon => !weapon.isMagic),
        [weapons]
    );

    // Memoize filtered weapons
    const mundaneWeapons = useMemo(() => {
        return allMundaneWeapons.filter(weapon => {
            // Filter by search query
            if (searchQuery) {
                if (!weapon.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            }

            // Filter by weapon type (simple, marcial, exótica)
            if (selectedWeaponType !== 'all') {
                const weaponTypeLower = weapon.weaponType.toLowerCase();
                if (selectedWeaponType === 'simple' && !weaponTypeLower.includes('simple')) return false;
                if (selectedWeaponType === 'marcial' && !weaponTypeLower.includes('marcial') && !weaponTypeLower.includes('martial')) return false;
                if (selectedWeaponType === 'exotica' && !weaponTypeLower.includes('exótica') && !weaponTypeLower.includes('exotic')) return false;
            }

            // Filter by category (melee/ranged)
            if (selectedCategory !== 'all') {
                const weaponTypeLower = weapon.weaponType.toLowerCase();
                if (selectedCategory === 'melee' && !weaponTypeLower.includes('cuerpo') && !weaponTypeLower.includes('melee')) return false;
                if (selectedCategory === 'ranged' && !weaponTypeLower.includes('distancia') && !weaponTypeLower.includes('ranged')) return false;
            }

            // Filter by damage type
            if (selectedDamageType !== 'all') {
                if (!weapon.stats.damageType.some(type =>
                    type.toLowerCase().includes(selectedDamageType.toLowerCase())
                )) return false;
            }

            // Filter by size
            if (selectedSize !== 'all' && weapon.size !== selectedSize) return false;

            return true;
        });
    }, [allMundaneWeapons, selectedWeaponType, selectedCategory, selectedDamageType, selectedSize, searchQuery]);

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
                            Armas y Equipo de Combate
                        </h1>
                        <p className="text-lg text-dungeon-300 leading-relaxed">
                            Elige tu herramienta de destrucción. Desde simples dagas hasta complejas armas exóticas,
                            aquí encontrarás todo lo necesario para enfrentarte a los peligros del mundo.
                        </p>
                    </div>

                    {/* Link a Reglas (Placeholder action) */}
                    <div className="flex items-center gap-3 px-6 py-4 bg-dungeon-950/50 rounded-lg border border-dungeon-800 backdrop-blur-sm hover:border-red-500/50 hover:bg-red-500/10 transition-all group cursor-pointer">
                        <Sword className="h-6 w-6 text-red-500 group-hover:scale-110 transition-transform" />
                        <div className="text-left">
                            <div className="text-sm font-bold text-red-500 uppercase tracking-wider">Manual de Combate</div>
                            <div className="text-xs text-dungeon-400">Reglas y propiedades</div>
                        </div>
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
                            placeholder="Buscar arma..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-dungeon-900 border border-dungeon-700 rounded-lg text-dungeon-100 placeholder-dungeon-500 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                        />
                    </div>

                    {/* Filter Toggle (Mobile) & Active Filters Summary */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <div className="hidden md:flex items-center gap-2 text-sm text-dungeon-400">
                            <Sparkles className="h-4 w-4 text-gold-500" />
                            <span>Mostrando {mundaneWeapons.length} armas</span>
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
                    <div className="mt-6 pt-6 border-t border-dungeon-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2">
                        {/* Filtro por Tipo de Arma */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gold-500 uppercase tracking-wider">
                                Tipo de arma
                            </label>
                            <select
                                value={selectedWeaponType}
                                onChange={(e) => setSelectedWeaponType(e.target.value)}
                                className="w-full bg-dungeon-900 border border-dungeon-700 rounded-lg px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                            >
                                <option value="all">Todas</option>
                                <option value="simple">Simple</option>
                                <option value="marcial">Marcial</option>
                                <option value="exotica">Exótica</option>
                            </select>
                        </div>

                        {/* Filtro por Categoría */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gold-500 uppercase tracking-wider">
                                Categoría
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full bg-dungeon-900 border border-dungeon-700 rounded-lg px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                            >
                                <option value="all">Todas</option>
                                <option value="melee">Cuerpo a cuerpo</option>
                                <option value="ranged">Distancia</option>
                            </select>
                        </div>

                        {/* Filtro por Tipo de Daño */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gold-500 uppercase tracking-wider">
                                Tipo de daño
                            </label>
                            <select
                                value={selectedDamageType}
                                onChange={(e) => setSelectedDamageType(e.target.value)}
                                className="w-full bg-dungeon-900 border border-dungeon-700 rounded-lg px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                            >
                                <option value="all">Todos</option>
                                <option value="Perforante">Perforante</option>
                                <option value="Cortante">Cortante</option>
                                <option value="Contundente">Contundente</option>
                            </select>
                        </div>

                        {/* Filtro por Tamaño */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gold-500 uppercase tracking-wider">
                                Tamaño
                            </label>
                            <select
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="w-full bg-dungeon-900 border border-dungeon-700 rounded-lg px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                            >
                                <option value="all">Todos</option>
                                <option value="Diminuta">Diminuta</option>
                                <option value="Pequeña">Pequeña</option>
                                <option value="Mediana">Mediana</option>
                                <option value="Grande">Grande</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Reglas de Armas (Optional, kept for reference but maybe collapsed or moved) */}
            <WeaponsRulesInfo />

            {/* Tabla de Armas */}
            {mundaneWeapons.length === 0 ? (
                <div className="text-center py-16 bg-dungeon-900/50 rounded-xl border border-dungeon-800 border-dashed">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dungeon-800 mb-4">
                        <Search className="h-8 w-8 text-dungeon-500" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-dungeon-200 mb-2">No se encontraron armas</h3>
                    <p className="text-dungeon-400 max-w-md mx-auto">
                        Intenta ajustar los filtros o buscar con otros términos.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedWeaponType('all');
                            setSelectedCategory('all');
                            setSelectedDamageType('all');
                            setSelectedSize('all');
                        }}
                        className="mt-6 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors"
                    >
                        Limpiar filtros
                    </button>
                </div>
            ) : (
                <WeaponsTable weapons={mundaneWeapons} />
            )}
        </div >
    );
}
