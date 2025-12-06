'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Command, Search, X } from 'lucide-react';

interface SearchResult {
  id: string;
  title?: string;
  slug: string;
  category_slug?: string;
  category_name?: string;
  name?: string;
  type?: string;
}

interface SearchResponse {
  threads: SearchResult[];
  compendium: SearchResult[];
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResponse>({ threads: [], compendium: [] });
  const [loading, setLoading] = useState(false);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    if (e.key === 'Escape') {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setResults({ threads: [], compendium: [] });
      return;
    }
  }, [open]);

  useEffect(() => {
    if (!open || query.trim().length < 2) {
      setResults({ threads: [], compendium: [] });
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal });
        if (res.ok) {
          const data = (await res.json()) as SearchResponse;
          setResults(data);
        }
      } catch (err) {
        if ((err as any).name !== 'AbortError') {
          console.error('search error', err);
        }
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [open, query]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1100] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-3xl bg-dungeon-900 border border-dungeon-700 rounded-xl shadow-2xl">
        <div className="flex items-center px-4 py-3 border-b border-dungeon-800">
          <Search className="w-4 h-4 text-dungeon-500 mr-2" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-dungeon-100 outline-none"
            placeholder="Busca hilos o compendio (Ctrl+K para cerrar)"
          />
          <button
            onClick={() => setOpen(false)}
            className="text-dungeon-500 hover:text-dungeon-200 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="px-4 py-3 text-sm text-dungeon-400">Buscando...</div>
          )}

          {!loading && query.trim().length >= 2 && results.threads.length === 0 && results.compendium.length === 0 && (
            <div className="px-4 py-3 text-sm text-dungeon-400">Sin resultados</div>
          )}

          {results.threads.length > 0 && (
            <div className="py-2">
              <div className="px-4 text-xs uppercase tracking-wide text-dungeon-500 mb-2">Hilos</div>
              {results.threads.map((t) => (
                <Link
                  key={t.id}
                  href={`/foro/${t.category_slug}/${t.slug}`}
                  className="block px-4 py-2 hover:bg-dungeon-800"
                  onClick={() => setOpen(false)}
                >
                  <div className="text-dungeon-100 font-semibold">{t.title}</div>
                  <div className="text-xs text-dungeon-500">{t.category_name}</div>
                </Link>
              ))}
            </div>
          )}

          {results.compendium.length > 0 && (
            <div className="py-2 border-t border-dungeon-800">
              <div className="px-4 text-xs uppercase tracking-wide text-dungeon-500 mb-2">Compendio</div>
              {results.compendium.map((c) => (
                <Link
                  key={c.id}
                  href={`/objetos/${c.slug}`}
                  className="block px-4 py-2 hover:bg-dungeon-800"
                  onClick={() => setOpen(false)}
                >
                  <div className="text-dungeon-100 font-semibold">{c.name}</div>
                  <div className="text-xs text-dungeon-500">{c.type}</div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-dungeon-800 text-xs text-dungeon-500 flex items-center gap-2">
          <Command className="w-4 h-4" />
          <span>Ctrl/Cmd + K para abrir/cerrar</span>
        </div>
      </div>
    </div>
  );
}
