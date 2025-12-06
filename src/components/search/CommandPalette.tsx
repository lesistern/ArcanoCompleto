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

interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  // Internal state for query and results
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResponse>({ threads: [], compendium: [] });
  const [loading, setLoading] = useState(false);

  // If isOpen is controlled, use it. Otherwise default to false (though we really want it controlled now)
  const show = isOpen ?? false;

  const handleKey = useCallback((e: KeyboardEvent) => {
    // Only handle Escape here to close. Opening (Ctrl+K) should be handled by parent or a global listener if we want it global.
    // However, if we want to keep the "Ctrl+K" functionality globally, this component needs to be mounted.
    // If we defer "Open" logic to parent, we should remove it from here?
    // Let's keep a global listener for Open in Header, or keep it here but call a callback?
    // Parent should handle global hotkeys if possible, but let's see.
    // If I remove setOpen, I can't open it from here.
    if (e.key === 'Escape' && show && onClose) {
      onClose();
    }
  }, [show, onClose]);

  // We need to move the Open Listener to Header if we want Header to control the state efficiently.
  // OR we can emit an event.
  // Let's assume Header will handle the Ctrl+K logic or we'll add a separate hook.

  // Actually, to minimize changes, let's just use the props.

  // Reset when closing
  useEffect(() => {
    if (!show) {
      setQuery('');
      setResults({ threads: [], compendium: [] });
      return;
    }
  }, [show]);

  useEffect(() => {
    if (!show || query.trim().length < 2) {
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
  }, [show, query]);

  if (!show) {
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
            onClick={() => onClose?.()}
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
                  onClick={() => onClose?.()}
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
                  onClick={() => onClose?.()}
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
