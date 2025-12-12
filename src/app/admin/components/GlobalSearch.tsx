'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Search, X, Loader2, BookOpen, Users, Zap, Wand2, Church, Sword, Skull } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface SearchResult {
    id: string;
    type: 'class' | 'race' | 'feat' | 'spell' | 'deity' | 'item' | 'monster';
    title: string;
    subtitle?: string;
    href: string;
    icon: LucideIcon;
}

const typeConfig = {
    class: { label: 'Clase', icon: BookOpen, color: 'text-blue-400' },
    race: { label: 'Raza', icon: Users, color: 'text-green-400' },
    feat: { label: 'Dote', icon: Zap, color: 'text-yellow-400' },
    spell: { label: 'Conjuro', icon: Wand2, color: 'text-purple-400' },
    deity: { label: 'Deidad', icon: Church, color: 'text-gold-400' },
    item: { label: 'Objeto', icon: Sword, color: 'text-red-400' },
    monster: { label: 'Monstruo', icon: Skull, color: 'text-red-600' },
};

export function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const supabase = createClient();

    // Keyboard shortcut: Ctrl/Cmd + K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Search function
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const searchTimeout = setTimeout(async () => {
            setLoading(true);
            try {
                // Use websearch type for natural language query handling (e.g. "bola fuego" -> "bola & fuego")
                const { data, error } = await supabase
                    .from('global_search_index')
                    .select('type, name, slug, description, link')
                    .textSearch('search_vector', query, {
                        type: 'websearch',
                        config: 'spanish'
                    })
                    .limit(10);

                if (error) {
                    throw error;
                }

                const allResults: SearchResult[] = (data || []).map((item: any) => ({
                    id: `${item.type}-${item.slug}`, // Composite ID for key
                    type: item.type as any,
                    title: item.name,
                    subtitle: item.description,
                    href: item.link, // Link is now coming from the view
                    icon: typeConfig[item.type as keyof typeof typeConfig]?.icon || BookOpen,
                }));

                setResults(allResults);
                setSelectedIndex(0);
            } catch (error) {
                console.error('Error searching:', error);
            } finally {
                setLoading(false);
            }
        }, 300); // Debounce 300ms

        return () => clearTimeout(searchTimeout);
    }, [query, supabase]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % results.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        } else if (e.key === 'Enter' && results[selectedIndex]) {
            e.preventDefault();
            handleSelect(results[selectedIndex]);
        }
    };

    const handleSelect = (result: SearchResult) => {
        router.push(result.href);
        setIsOpen(false);
        setQuery('');
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:border-gold-400 transition-colors text-gray-400 hover:text-gold-400"
            >
                <Search className="h-4 w-4" />
                <span className="text-sm">Buscar...</span>
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-gray-900 border border-gray-700 rounded">
                    <span>⌘</span>K
                </kbd>
            </button>
        );
    }

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setIsOpen(false)}
            />

            {/* Search Modal */}
            <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
                <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 p-4 border-b border-gray-700">
                        <Search className="h-5 w-5 text-gray-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Buscar clases, razas, dotes, conjuros..."
                            className="flex-1 bg-transparent text-gray-100 placeholder-gray-500 outline-none"
                        />
                        {loading && <Loader2 className="h-5 w-5 text-gold-400 animate-spin" />}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 rounded hover:bg-gray-700 transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="max-h-96 overflow-y-auto">
                        {results.length === 0 && query.trim() && !loading && (
                            <div className="p-8 text-center text-gray-400">
                                <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>No se encontraron resultados</p>
                            </div>
                        )}

                        {results.length === 0 && !query.trim() && (
                            <div className="p-8 text-center text-gray-400">
                                <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>Escribe para buscar contenido</p>
                            </div>
                        )}

                        {results.map((result, index) => {
                            const config = typeConfig[result.type];
                            return (
                                <button
                                    key={result.id}
                                    onClick={() => handleSelect(result)}
                                    className={`
                    w-full flex items-center gap-3 p-3 text-left
                    transition-colors border-b border-gray-700 last:border-0
                    ${index === selectedIndex
                                            ? 'bg-gold-900/30 border-l-2 border-l-gold-400'
                                            : 'hover:bg-gray-700'
                                        }
                  `}
                                >
                                    <div className={`p-2 rounded-lg bg-gray-900 ${config.color}`}>
                                        <config.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-gray-100 truncate">
                                            {result.title}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {config.label}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    {results.length > 0 && (
                        <div className="p-2 border-t border-gray-700 bg-gray-900 flex items-center justify-between text-xs text-gray-400">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded">↑↓</kbd>
                                    Navegar
                                </span>
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded">Enter</kbd>
                                    Seleccionar
                                </span>
                            </div>
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded">Esc</kbd>
                                Cerrar
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
