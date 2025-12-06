'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Loader2, Sparkles, Swords, BookOpen } from 'lucide-react';
import Link from 'next/link';
import {
  searchAll,
  searchSpells,
  searchFeats,
  searchClasses,
  getSearchCount,
  type GlobalSearchResult,
  type SearchCountResult
} from '@/lib/supabase/search';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [counts, setCounts] = useState<SearchCountResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'spell' | 'feat' | 'class'>('all');

  useEffect(() => {
    if (queryParam) {
      handleSearch(queryParam);
    }
  }, [queryParam]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setCounts([]);
      return;
    }

    setLoading(true);
    try {
      // Get counts
      const { data: countData } = await getSearchCount(searchQuery);
      if (countData) {
        setCounts(countData);
      }

      // Get results based on filter
      if (filter === 'all') {
        const { data } = await searchAll(searchQuery, 20);
        setResults(data || []);
      } else if (filter === 'spell') {
        const { data } = await searchSpells(searchQuery, 50);
        if (data) {
          setResults(data.map(item => ({
            result_type: 'spell' as const,
            id: item.id,
            name: item.name,
            category: item.school,
            description: item.description.substring(0, 200),
            relevance: item.relevance
          })));
        }
      } else if (filter === 'feat') {
        const { data } = await searchFeats(searchQuery, 50);
        if (data) {
          setResults(data.map(item => ({
            result_type: 'feat' as const,
            id: item.id,
            name: item.name,
            category: item.category,
            description: item.benefit.substring(0, 200),
            relevance: item.relevance
          })));
        }
      } else if (filter === 'class') {
        const { data } = await searchClasses(searchQuery, 20);
        if (data) {
          setResults(data.map(item => ({
            result_type: 'class' as const,
            id: item.id,
            name: item.name,
            category: item.class_type,
            description: item.description.substring(0, 200),
            relevance: item.relevance
          })));
        }
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'spell':
        return <Sparkles className="w-4 h-4" />;
      case 'feat':
        return <Swords className="w-4 h-4" />;
      case 'class':
        return <BookOpen className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'spell':
        return 'text-purple-400';
      case 'feat':
        return 'text-red-400';
      case 'class':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'spell':
        return 'Conjuro';
      case 'feat':
        return 'Dote';
      case 'class':
        return 'Clase';
      default:
        return type;
    }
  };

  const getResultLink = (result: GlobalSearchResult) => {
    switch (result.result_type) {
      case 'spell':
        return `/spells/${result.id}`;
      case 'feat':
        return `/feats/${result.id}`;
      case 'class':
        return `/clases/${result.name.toLowerCase()}`;
      default:
        return '#';
    }
  };

  const getTotalCount = () => {
    return counts.reduce((sum, item) => sum + Number(item.total_results), 0);
  };

  return (
    <div className="min-h-screen bg-dungeon-950 text-dungeon-100">
      {/* Header */}
      <div className="bg-dungeon-900 border-b border-gold-500/20 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gold-400 mb-4 font-heading">
            🔍 Búsqueda Global
          </h1>
          <p className="text-dungeon-300">
            Busca conjuros, dotes y clases en el compendio
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dungeon-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar en el compendio..."
                className="w-full input pl-12 pr-4 py-3"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              className="flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Buscar
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Filters */}
        {counts.length > 0 && (
          <div className="mb-6 flex gap-4 flex-wrap">
            <button
              onClick={() => { setFilter('all'); handleSearch(query); }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'all'
                  ? 'bg-gold-500 text-dungeon-950'
                  : 'bg-dungeon-800 text-dungeon-300 hover:bg-dungeon-700 border border-dungeon-700'
                }`}
            >
              Todos ({getTotalCount()})
            </button>
            {counts.map((count) => (
              <button
                key={count.result_type}
                onClick={() => {
                  setFilter(count.result_type as any);
                  handleSearch(query);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${filter === count.result_type
                    ? 'bg-gold-500 text-dungeon-950'
                    : 'bg-dungeon-800 text-dungeon-300 hover:bg-dungeon-700 border border-dungeon-700'
                  }`}
              >
                {getTypeIcon(count.result_type)}
                {getTypeLabel(count.result_type)}s ({count.total_results})
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result) => (
              <Link
                key={`${result.result_type}-${result.id}`}
                href={getResultLink(result)}
                className="block"
              >
                <Card className="hover:border-gold-500/50 transition-all group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 ${getTypeColor(result.result_type)}`}>
                        {getTypeIcon(result.result_type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-dungeon-100 group-hover:text-gold-400 transition-colors font-heading">
                            {result.name}
                          </h3>
                          <span className={`text-sm px-2 py-1 rounded ${getTypeColor(result.result_type)} bg-dungeon-900/50 border border-dungeon-700`}>
                            {getTypeLabel(result.result_type)}
                          </span>
                          {result.category && (
                            <span className="text-sm text-dungeon-400">
                              {result.category}
                            </span>
                          )}
                        </div>
                        <p className="text-dungeon-300 leading-relaxed">
                          {result.description}
                          {result.description.length >= 200 && '...'}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-dungeon-500">
                          <span>Relevancia: {(result.relevance * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : query && !loading ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-dungeon-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dungeon-400 mb-2 font-heading">
              No se encontraron resultados
            </h3>
            <p className="text-dungeon-500">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-dungeon-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dungeon-400 mb-2 font-heading">
              Comienza a buscar
            </h3>
            <p className="text-dungeon-500">
              Ingresa un término para buscar en el compendio
            </p>
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
