'use client';

import { useEffect, useState, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Sword, Shield, Skull, Crown, Info, Search, X, Zap, BarChart3, BookOpen, Users } from 'lucide-react';
import { ALIGNMENT_CONFIG } from '@/lib/data/alignments';
import { DEITY_RANK_CONFIG } from '@/lib/data/deity-ranks';

// Función fuzzy search - permite errores de ortografía
function fuzzySearch(searchTerm: string, deities: Deity[]): Deity[] {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();

    return deities
        .map(deity => {
            const name = deity.name_es.toLowerCase();
            let score = 0;

            // Coincidencia exacta
            if (name === term) score = 1000;
            // Comienza con el término
            else if (name.startsWith(term)) score = 500;
            // Contiene el término
            else if (name.includes(term)) score = 100;
            // Fuzzy match - calcula distancia de Levenshtein simplificada
            else {
                score = calculateFuzzyScore(term, name);
            }

            return { deity, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ deity }) => deity);
}

// Calcula similitud entre dos strings (distancia de Levenshtein simplificada)
function calculateFuzzyScore(term: string, name: string): number {
    let matches = 0;
    let lastIndex = 0;

    for (const char of term) {
        const index = name.indexOf(char, lastIndex);
        if (index !== -1) {
            matches++;
            lastIndex = index + 1;
        }
    }

    // Score basado en el porcentaje de caracteres encontrados
    return Math.round((matches / term.length) * 50);
}

interface Deity {
    slug: string;
    name_es: string;
    rank: string;
    titles_es: string;
    portfolio_es: string;
    alignment: string;
    domains: string[];
    symbol_es: string;
    image_url?: string | null;
}


export default function DeitiesPage() {
    const [deities, setDeities] = useState<Deity[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');
    const [alignmentFilter, setAlignmentFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Deity[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [placeholderExamples, setPlaceholderExamples] = useState<string>('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        async function fetchDeities() {
            const { data, error} = await supabase
                .from('deities')
                .select('slug, name_es, rank, titles_es, portfolio_es, alignment, domains, symbol_es, image_url')
                .order('name_es');

            if (error) {
                console.error('Error fetching deities:', error);
            } else {
                setDeities(data || []);

                // Generar ejemplos dinámicos del placeholder desde las deidades cargadas
                if (data && data.length >= 3) {
                    // Seleccionar 3 deidades aleatorias
                    const shuffled = [...data].sort(() => Math.random() - 0.5);
                    const examples = shuffled.slice(0, 3).map(d => d.name_es).join(', ');
                    setPlaceholderExamples(`ej: ${examples}`);
                } else if (data && data.length > 0) {
                    // Si hay menos de 3 deidades, mostrar todas las disponibles
                    const examples = data.map(d => d.name_es).join(', ');
                    setPlaceholderExamples(`ej: ${examples}`);
                }
            }
            setLoading(false);
        }

        fetchDeities();
    }, [supabase]);

    // Actualizar resultados de búsqueda fuzzy
    useEffect(() => {
        if (searchTerm.trim()) {
            const results = fuzzySearch(searchTerm, deities);
            setSearchResults(results.slice(0, 8)); // Máximo 8 resultados
            setShowDropdown(true);
        } else {
            setSearchResults([]);
            setShowDropdown(false);
        }
    }, [searchTerm, deities]);

    // Cerrar dropdown cuando se hace click fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredDeities = deities.filter(deity => {
        const rankMatch = filter === 'all' || deity.rank === filter;
        const alignmentMatch = alignmentFilter === 'all' || deity.alignment === alignmentFilter;
        return rankMatch && alignmentMatch;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-dungeon-950 via-dungeon-900 to-dungeon-950 flex items-center justify-center">
                <div className="text-gold-400 text-xl">Cargando dioses...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-dungeon-950 via-dungeon-900 to-dungeon-950">
            {/* Header */}
            <div className="relative overflow-hidden border-b border-gold-500/20 bg-gradient-to-r from-dungeon-900 via-dungeon-800 to-dungeon-900">
                <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5"></div>
                <div className="container mx-auto px-4 py-16 relative">
                    <div className="flex items-center gap-4 mb-4">
                        <Sparkles className="w-12 h-12 text-gold-400" />
                        <h1 className="text-5xl font-bold text-gold-400 font-cinzel">
                            Dioses y Deidades
                        </h1>
                    </div>
                    <p className="text-dungeon-300 text-lg max-w-3xl">
                        Los dioses de D&D 3.5 otorgan poder a sus clérigos y guían a sus seguidores. Cada deidad tiene su propio dominio, alineamiento y filosofía.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* TL;DR - Resumen Rápido */}
                <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/20 to-dungeon-900 border-2 border-green-500/40 rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-500/20 rounded-full p-2">
                            <Zap className="h-6 w-6 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-400">TL;DR - Dioses en 30 Segundos</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 hover:bg-blue-900/30 transition-colors">
                            <Shield className="h-8 w-8 text-blue-400 mb-2" />
                            <div className="font-bold text-blue-400 mb-1">Clérigos Necesitan Dios</div>
                            <div className="text-dungeon-400 text-xs">
                                Clérigos y paladines DEBEN elegir una deidad para obtener poderes
                            </div>
                        </div>
                        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 hover:bg-red-900/30 transition-colors">
                            <Sword className="h-8 w-8 text-red-400 mb-2" />
                            <div className="font-bold text-red-400 mb-1">Arma Predilecta Gratis</div>
                            <div className="text-dungeon-400 text-xs">
                                Tu dios te da competencia con su arma favorita (ej: Pelor = maza)
                            </div>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-900/30 transition-colors">
                            <Users className="h-8 w-8 text-purple-400 mb-2" />
                            <div className="font-bold text-purple-400 mb-1">Alineamiento Similar</div>
                            <div className="text-dungeon-400 text-xs">
                                Tu alineamiento debe estar a 1 paso del de tu dios (no opuesto)
                            </div>
                        </div>
                        <div className="bg-gold-900/20 border border-gold-500/30 rounded-lg p-4 hover:bg-gold-900/30 transition-colors">
                            <BookOpen className="h-8 w-8 text-gold-400 mb-2" />
                            <div className="font-bold text-gold-400 mb-1">2 Dominios = 2 Poderes</div>
                            <div className="text-dungeon-400 text-xs">
                                Eliges 2 dominios de tu dios: conjuros extra + poder especial
                            </div>
                        </div>
                    </div>

                    {/* Ejemplo Visual de Clérigo */}
                    <div className="mt-6 bg-dungeon-950/50 border border-dungeon-700 rounded-lg p-4">
                        <div className="text-sm text-dungeon-400 mb-2 flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            <span>Ejemplo: Clérigo de Pelor (Dios del Sol):</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                            <span className="bg-dungeon-800 px-3 py-1 rounded font-mono">Clérigo LB</span>
                            <span className="text-dungeon-500">+</span>
                            <span className="bg-blue-900/40 border border-blue-500/30 px-3 py-1 rounded">Pelor (NB) <span className="text-green-400 text-xs">alineamiento compatible</span></span>
                            <span className="text-dungeon-500">=</span>
                            <span className="bg-gold-900/40 border border-gold-500/30 px-3 py-1 rounded">Dominios: Sol + Bien</span>
                            <span className="text-dungeon-500">+</span>
                            <span className="bg-red-900/40 border border-red-500/30 px-3 py-1 rounded">Arma: Maza pesada</span>
                        </div>
                        <p className="text-xs text-dungeon-500 mt-2">Un clérigo Legal Bueno puede servir a Pelor (Neutral Bueno) porque están a 1 paso de distancia.</p>
                    </div>
                </div>

                {/* Search Bar with Autocomplete */}
                <div className="mb-8 relative z-50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-400/60" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder={`Busca una deidad... (${placeholderExamples || 'cargando...'})`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => searchTerm && setShowDropdown(true)}
                            className="w-full pl-10 pr-10 py-3 bg-dungeon-800 border-2 border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-400 transition-colors"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    searchInputRef.current?.focus();
                                }}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dungeon-400 hover:text-gold-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Autocomplete Dropdown */}
                    {showDropdown && searchResults.length > 0 && (
                        <div
                            ref={dropdownRef}
                            className="absolute top-full left-0 right-0 mt-2 bg-dungeon-800 border-2 border-gold-400/50 rounded-lg shadow-lg max-h-96 overflow-y-auto"
                        >
                            {searchResults.map((deity) => {
                                const rankConfig = DEITY_RANK_CONFIG[deity.rank];
                                return (
                                    <Link
                                        key={deity.slug}
                                        href={`/reglas/contenido/dioses/${deity.slug}`}
                                        onClick={() => {
                                            setSearchTerm('');
                                            setShowDropdown(false);
                                        }}
                                        className="block px-4 py-3 border-b border-dungeon-700 last:border-b-0 hover:bg-dungeon-700 transition-colors group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="font-semibold text-gold-400 group-hover:text-gold-300">
                                                    {deity.name_es}
                                                </p>
                                                <p className="text-xs text-dungeon-400">
                                                    {rankConfig?.label} • {ALIGNMENT_CONFIG[deity.alignment]?.label}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}

                    {/* No results message */}
                    {showDropdown && searchTerm && searchResults.length === 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-dungeon-800 border-2 border-red-400/50 rounded-lg p-4 text-center text-dungeon-400">
                            No se encontraron deidades para "{searchTerm}"
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="mb-8 space-y-4">
                    {/* Rank Filter */}
                    <div>
                        <h3 className="text-gold-400 font-semibold mb-2">Rango:</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-lg border transition-all ${filter === 'all'
                                        ? 'bg-gold-500/20 border-gold-500 text-gold-400'
                                        : 'bg-dungeon-800/50 border-dungeon-700 text-dungeon-300 hover:border-gold-500/50'
                                    }`}
                            >
                                Todos
                            </button>
                            {Object.entries(DEITY_RANK_CONFIG).map(([key, config]) => (
                                <button
                                    key={key}
                                    onClick={() => setFilter(key)}
                                    className={`px-4 py-2 rounded-lg border transition-all group relative ${filter === key
                                            ? `border-2 text-dungeon-100`
                                            : 'bg-dungeon-800/50 border-dungeon-700 text-dungeon-300 hover:border-gold-500/50'
                                        }`}
                                    style={filter === key ? {
                                        borderColor: config.hex,
                                        backgroundColor: `${config.hex}20`,
                                        color: config.hex
                                    } : {}}
                                    title={config.justification}
                                >
                                    {config.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Alignment Filter */}
                    <div>
                        <h3 className="text-gold-400 font-semibold mb-2">Alineamiento:</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setAlignmentFilter('all')}
                                className={`px-4 py-2 rounded-lg border transition-all ${alignmentFilter === 'all'
                                        ? 'bg-gold-500/20 border-gold-500 text-gold-400'
                                        : 'bg-dungeon-800/50 border-dungeon-700 text-dungeon-300 hover:border-gold-500/50'
                                    }`}
                            >
                                Todos
                            </button>
                            {Object.entries(ALIGNMENT_CONFIG).map(([key, config]) => (
                                <button
                                    key={key}
                                    onClick={() => setAlignmentFilter(key)}
                                    className={`px-4 py-2 rounded-lg border transition-all group relative ${alignmentFilter === key
                                            ? `border-2 text-dungeon-100`
                                            : 'bg-dungeon-800/50 border-dungeon-700 text-dungeon-300 hover:border-gold-500/50'
                                        }`}
                                    style={alignmentFilter === key ? {
                                        borderColor: config.hex,
                                        backgroundColor: `${config.hex}20`,
                                        color: config.hex
                                    } : {}}
                                    title={config.description}
                                >
                                    {config.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Deities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDeities.map((deity) => {
                        const rankConfig = DEITY_RANK_CONFIG[deity.rank];
                        const RankIcon = rankConfig?.icon || Shield;
                        return (
                            <Link
                                key={deity.slug}
                                href={`/reglas/contenido/dioses/${deity.slug}`}
                                className="block group deity-card-wrapper"
                            >
                                <div className="h-full bg-gradient-to-br from-dungeon-800/90 to-dungeon-900/90 rounded-lg border border-dungeon-700 overflow-hidden deity-card relative">
                                    {/* Image */}
                                    {deity.image_url && (
                                        <div className="relative h-48 w-full overflow-hidden">
                                            {/* Efecto líquido de fondo con color de alineamiento - MÁS VISIBLE */}
                                            <div
                                                className="absolute inset-0 opacity-60"
                                                style={{
                                                    background: `linear-gradient(135deg,
                                                        ${ALIGNMENT_CONFIG[deity.alignment]?.hex || '#B8BBC2'} 0%,
                                                        ${ALIGNMENT_CONFIG[deity.alignment]?.hex || '#B8BBC2'}80 20%,
                                                        transparent 40%,
                                                        ${ALIGNMENT_CONFIG[deity.alignment]?.hex || '#B8BBC2'}80 60%,
                                                        ${ALIGNMENT_CONFIG[deity.alignment]?.hex || '#B8BBC2'} 80%,
                                                        transparent 100%)`,
                                                    backgroundSize: '300% 300%',
                                                    animation: 'liquid-flow 12s ease-in-out infinite'
                                                }}
                                            />
                                            {/* Segundo gradiente líquido para efecto más complejo */}
                                            <div
                                                className="absolute inset-0 opacity-50"
                                                style={{
                                                    background: `radial-gradient(circle at 20% 80%,
                                                        ${ALIGNMENT_CONFIG[deity.alignment]?.hex || '#B8BBC2'}90 0%,
                                                        ${ALIGNMENT_CONFIG[deity.alignment]?.hex || '#B8BBC2'}40 30%,
                                                        transparent 60%)`,
                                                    backgroundSize: '150% 150%',
                                                    animation: 'liquid-pulse 8s ease-in-out infinite'
                                                }}
                                            />
                                            {/* Tercer gradiente para efecto de olas */}
                                            <div
                                                className="absolute inset-0 opacity-40"
                                                style={{
                                                    background: `linear-gradient(60deg,
                                                        transparent 0%,
                                                        ${ALIGNMENT_CONFIG[deity.alignment]?.hex || '#B8BBC2'}60 30%,
                                                        transparent 60%)`,
                                                    backgroundSize: '200% 200%',
                                                    animation: 'liquid-flow 10s ease infinite reverse'
                                                }}
                                            />
                                            {/* Capa base oscura con transparencia */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-dungeon-800/60 to-dungeon-900/80" />
                                            {/* Imagen de la deidad */}
                                            <Image
                                                src={deity.image_url}
                                                alt={deity.name_es}
                                                fill
                                                className="object-contain p-4 relative z-10"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        </div>
                                    )}

                                    {/* Header */}
                                    <div className="p-6 border-b border-dungeon-700/50">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gold-400 group-hover:text-gold-300 transition-colors font-cinzel mb-1">
                                                    {deity.name_es}
                                                </h3>
                                                <p className="text-sm text-dungeon-400 italic">
                                                    {deity.titles_es}
                                                </p>
                                            </div>
                                            <RankIcon className="w-6 h-6 flex-shrink-0 ml-2" style={{ color: rankConfig?.hex || '#B8BBC2' }} />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`text-xs px-2 py-1 rounded bg-dungeon-900/50 border cursor-help`}
                                                style={{
                                                    color: rankConfig?.hex || '#B8BBC2',
                                                    borderColor: `${rankConfig?.hex || '#B8BBC2'}80`
                                                }}
                                                title={rankConfig?.justification || 'Rango desconocido'}
                                            >
                                                {rankConfig?.label || deity.rank}
                                            </span>
                                            <span
                                                className={`text-xs px-2 py-1 rounded border bg-dungeon-900/50 cursor-help`}
                                                style={{
                                                    color: ALIGNMENT_CONFIG[deity.alignment]?.hex || '#B8BBC2',
                                                    borderColor: `${ALIGNMENT_CONFIG[deity.alignment]?.hex || '#B8BBC2'}80`
                                                }}
                                                title={ALIGNMENT_CONFIG[deity.alignment]?.description || 'Alineamiento desconocido'}
                                            >
                                                {ALIGNMENT_CONFIG[deity.alignment]?.label || deity.alignment}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gold-400/80 mb-1">Portafolio:</h4>
                                            <p className="text-sm text-dungeon-300">{deity.portfolio_es}</p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-gold-400/80 mb-1">Símbolo:</h4>
                                            <p className="text-sm text-dungeon-300">{deity.symbol_es}</p>
                                        </div>

                                        {deity.domains && deity.domains.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-gold-400/80 mb-2">Dominios:</h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {deity.domains.slice(0, 5).map((domain, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="text-xs px-2 py-1 rounded-full bg-dungeon-900/70 border border-dungeon-600 text-dungeon-300"
                                                        >
                                                            {domain}
                                                        </span>
                                                    ))}
                                                    {deity.domains.length > 5 && (
                                                        <span className="text-xs px-2 py-1 text-dungeon-400">
                                                            +{deity.domains.length - 5} más
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="px-6 py-3 bg-dungeon-900/50 border-t border-dungeon-700/50">
                                        <span className="text-xs text-gold-400/70 group-hover:text-gold-400 transition-colors">
                                            Ver detalles →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {filteredDeities.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-dungeon-400 text-lg">
                            No se encontraron deidades con los filtros seleccionados.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
