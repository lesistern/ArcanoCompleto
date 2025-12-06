'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import { searchAll, type GlobalSearchResult } from '@/lib/supabase/search';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch(query);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    try {
      const { data } = await searchAll(searchQuery, 5);
      setResults(data || []);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowResults(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
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
      case 'race':
        return 'Raza';
      case 'skill':
        return 'Habilidad';
      case 'weapon':
        return 'Arma';
      case 'deity':
        return 'Deidad';
      case 'monster':
        return 'Monstruo';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'spell':
        return 'bg-purple-500/10 text-purple-400';
      case 'feat':
        return 'bg-red-500/10 text-red-400';
      case 'class':
        return 'bg-blue-500/10 text-blue-400';
      case 'race':
        return 'bg-green-500/10 text-green-400';
      case 'skill':
        return 'bg-cyan-500/10 text-cyan-400';
      case 'weapon':
        return 'bg-orange-500/10 text-orange-400';
      case 'deity':
        return 'bg-gold-500/10 text-gold-400';
      case 'monster':
        return 'bg-rose-500/10 text-rose-400';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  const getResultLink = (result: GlobalSearchResult) => {
    const slug = result.slug || result.id;
    switch (result.result_type) {
      case 'spell':
        return `/conjuros/${slug}`;
      case 'feat':
        return `/dotes/${slug}`;
      case 'class':
        return `/clases/${slug}`;
      case 'race':
        return `/razas/${slug}`;
      case 'skill':
        return `/habilidades/${slug}`;
      case 'weapon':
        return `/objetos/armas/${slug}`;
      case 'deity':
        return `/reglas/contenido/dioses/${slug}`;
      case 'monster':
        return `/monstruos/${slug}`;
      default:
        return '#';
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setQuery('');
  };

  return (
    <div className="relative flex-1 max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dungeon-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setFocused(true);
              if (results.length > 0) setShowResults(true);
            }}
            onBlur={() => setFocused(false)}
            placeholder="Buscar conjuros, dotes, clases..."
            className="w-full bg-dungeon-800 border border-dungeon-700 rounded-lg pl-10 pr-10 py-2 text-sm text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:border-gold-500 transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                setShowResults(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dungeon-400 hover:text-dungeon-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {loading && (
            <div className="absolute right-10 top-1/2 -translate-y-1/2">
              <Loader2 className="w-4 h-4 animate-spin text-gold-500" />
            </div>
          )}
        </div>
      </form>

      {/* Results Dropdown */}
      {showResults && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-dungeon-800 border border-dungeon-700 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50"
        >
          {results.map((result) => (
            <Link
              key={`${result.result_type}-${result.id}`}
              href={getResultLink(result)}
              onClick={handleResultClick}
              className="block px-4 py-3 hover:bg-dungeon-700 transition-colors border-b border-dungeon-700 last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <span className={`text-xs px-2 py-0.5 rounded mt-0.5 ${getTypeColor(result.result_type)}`}>
                  {getTypeLabel(result.result_type)}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-dungeon-100 truncate">
                    {result.name}
                  </h4>
                  {result.category && (
                    <p className="text-xs text-dungeon-400 mt-0.5">
                      {result.category}
                    </p>
                  )}
                  <p className="text-xs text-dungeon-500 mt-1 line-clamp-2">
                    {result.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={handleResultClick}
            className="block px-4 py-3 bg-dungeon-900 hover:bg-dungeon-800 transition-colors text-center"
          >
            <span className="text-sm text-gold-400 font-medium">
              Ver todos los resultados →
            </span>
          </Link>
        </div>
      )}

      {/* No Results Message */}
      {showResults && query.trim().length >= 2 && !loading && results.length === 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-dungeon-800 border border-dungeon-700 rounded-lg shadow-xl z-50"
        >
          <div className="px-4 py-6 text-center">
            <Search className="w-8 h-8 text-dungeon-600 mx-auto mb-2" />
            <p className="text-sm text-dungeon-400">No se encontraron resultados</p>
          </div>
        </div>
      )}
    </div>
  );
}
