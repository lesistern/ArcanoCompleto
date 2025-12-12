'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, Loader2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface SearchResult {
  id: string;
  slug: string;
  name: string;
  type: string;
  typeLabel: string;
  subtitle?: string;
  href: string;
}

interface ForumThread {
  id: string;
  title: string;
  slug: string;
  category_slug: string;
  category_name: string;
}

interface SearchResponse {
  threads: ForumThread[];
  compendium: SearchResult[];
}

const ENTITY_TYPES = [
  { value: '', label: 'Todos' },
  { value: 'class', label: 'Clases' },
  { value: 'race', label: 'Razas' },
  { value: 'spell', label: 'Conjuros' },
  { value: 'feat', label: 'Dotes' },
  { value: 'skill', label: 'Habilidades' },
  { value: 'weapon', label: 'Armas' },
  { value: 'monster', label: 'Monstruos' },
];

const ITEMS_PER_PAGE = 20;

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState<SearchResponse>({ threads: [], compendium: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (query.trim().length >= 2) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Error al realizar la búsqueda');
      }
      const data: SearchResponse = await response.json();
      setResults(data);
      setCurrentPage(1); // Reset to first page on new search
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'spell':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'feat':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'class':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'race':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'skill':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'weapon':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'monster':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  // Filter results by selected type
  const filteredResults = selectedType
    ? results.compendium.filter(r => r.type === selectedType)
    : results.compendium;

  // Pagination
  const totalItems = filteredResults.length + results.threads.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Combine threads and compendium for pagination
  const allResults = [
    ...results.threads.map(t => ({ ...t, resultType: 'thread' as const })),
    ...filteredResults.map(c => ({ ...c, resultType: 'compendium' as const }))
  ];
  const paginatedResults = allResults.slice(startIndex, endIndex);

  // Empty state
  if (!loading && query.trim().length < 2) {
    return (
      <div className="min-h-screen bg-dungeon-950 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-dungeon-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-dungeon-100 mb-2">
              Buscar en el Compendio
            </h2>
            <p className="text-dungeon-400">
              Ingresa al menos 2 caracteres para comenzar la búsqueda
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dungeon-100 mb-2">
            Resultados de búsqueda
          </h1>
          <p className="text-dungeon-400">
            Buscando: <span className="text-gold-400 font-semibold">{query}</span>
          </p>
        </div>

        {/* Filters Toggle Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded-lg hover:border-gold-500 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filtros</span>
            {selectedType && (
              <span className="text-xs px-2 py-0.5 bg-gold-500/20 text-gold-400 rounded">
                1
              </span>
            )}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-dungeon-800 border border-dungeon-700 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-dungeon-100">
                Filtrar por tipo
              </h3>
              {selectedType && (
                <button
                  onClick={() => setSelectedType('')}
                  className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Limpiar
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {ENTITY_TYPES.map(type => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    selectedType === type.value
                      ? 'bg-gold-500 text-dungeon-950 font-medium'
                      : 'bg-dungeon-700 text-dungeon-300 hover:bg-dungeon-600'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="mb-4 text-sm text-dungeon-400">
            {totalItems === 0 ? (
              'No se encontraron resultados'
            ) : (
              <>
                Mostrando {startIndex + 1}-{Math.min(endIndex, totalItems)} de {totalItems} resultado{totalItems !== 1 ? 's' : ''}
              </>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && totalItems > 0 && (
          <div className="space-y-3 mb-8">
            {paginatedResults.map((result, index) => {
              if (result.resultType === 'thread') {
                const thread = result as typeof results.threads[0] & { resultType: 'thread' };
                return (
                  <Link
                    key={`thread-${thread.id}`}
                    href={`/foro/${thread.category_slug}/${thread.slug}`}
                    className="block bg-dungeon-800 border border-dungeon-700 rounded-lg p-4 hover:border-gold-500 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 mt-0.5">
                        Foro
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-dungeon-100 mb-1">
                          {thread.title}
                        </h3>
                        <p className="text-xs text-dungeon-400">
                          Categoría: {thread.category_name}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              } else {
                const item = result as SearchResult & { resultType: 'compendium' };
                return (
                  <Link
                    key={`${item.type}-${item.id}`}
                    href={item.href}
                    className="block bg-dungeon-800 border border-dungeon-700 rounded-lg p-4 hover:border-gold-500 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded border mt-0.5 ${getTypeColor(item.type)}`}>
                        {item.typeLabel}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-dungeon-100 mb-1">
                          {item.name}
                        </h3>
                        {item.subtitle && (
                          <p className="text-xs text-dungeon-400">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 bg-dungeon-800 border border-dungeon-700 rounded-lg hover:border-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      currentPage === pageNum
                        ? 'bg-gold-500 text-dungeon-950 font-semibold'
                        : 'bg-dungeon-800 border border-dungeon-700 text-dungeon-300 hover:border-gold-500'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 bg-dungeon-800 border border-dungeon-700 rounded-lg hover:border-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Empty Results */}
        {!loading && !error && totalItems === 0 && query.trim().length >= 2 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-dungeon-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dungeon-100 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-dungeon-400 mb-4">
              Intenta con otros términos de búsqueda
            </p>
            {selectedType && (
              <button
                onClick={() => setSelectedType('')}
                className="text-gold-400 hover:text-gold-300 text-sm"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-dungeon-700 rounded w-64"></div>
          <div className="h-64 bg-dungeon-800 rounded"></div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
