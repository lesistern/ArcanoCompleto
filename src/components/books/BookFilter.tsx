'use client';

import { useState, useEffect } from 'react';
import { useBooks } from '@/hooks/useBooks';
import { BookOpen, AlertCircle, Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface BookFilterProps {
    onFilterChange: (selectedBookIds: number[]) => void;
    className?: string;
}

export function BookFilter({ onFilterChange, className = '' }: BookFilterProps) {
    const { books, recommendedBooks, loading } = useBooks();
    const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

    // Initialize selection with recommended books once loaded
    useEffect(() => {
        if (!loading && recommendedBooks.length > 0 && selectedBooks.length === 0) {
            const ids = recommendedBooks.map(b => b.id);
            setSelectedBooks(ids);
            onFilterChange(ids);
        }
    }, [loading, recommendedBooks, onFilterChange, selectedBooks.length]);

    const toggleBook = (bookId: number) => {
        let newSelection: number[];
        if (selectedBooks.includes(bookId)) {
            newSelection = selectedBooks.filter(id => id !== bookId);
        } else {
            newSelection = [...selectedBooks, bookId];
        }

        setSelectedBooks(newSelection);
        onFilterChange(newSelection);
    };

    const selectAll = () => {
        const allIds = books.map(b => b.id);
        setSelectedBooks(allIds);
        onFilterChange(allIds);
    };

    const selectRecommended = () => {
        const recIds = recommendedBooks.map(b => b.id);
        setSelectedBooks(recIds);
        onFilterChange(recIds);
    };

    if (loading) {
        return (
            <div className={`p-4 bg-dungeon-900/50 rounded-lg border border-dungeon-700 animate-pulse ${className}`}>
                <div className="h-6 bg-dungeon-800 rounded w-1/3 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-8 bg-dungeon-800 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (books.length === 0) return null;

    return (
        <div className={`space-y-4 p-4 bg-dungeon-900/50 rounded-lg border border-dungeon-700 ${className}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-dungeon-100 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-gold-500" />
                    Fuentes Permitidas
                </h3>

                <div className="flex gap-2 text-xs">
                    <button
                        onClick={selectRecommended}
                        className="px-2 py-1 bg-dungeon-800 hover:bg-dungeon-700 text-gold-400 rounded border border-dungeon-600 transition-colors"
                    >
                        Recomendados
                    </button>
                    <button
                        onClick={selectAll}
                        className="px-2 py-1 bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-300 rounded border border-dungeon-600 transition-colors"
                    >
                        Todos
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {books.map(book => {
                    const isSelected = selectedBooks.includes(book.id);
                    const isRecommended = recommendedBooks.some(rb => rb.id === book.id);

                    return (
                        <label
                            key={book.id}
                            className={`
                flex items-center space-x-3 cursor-pointer p-2 rounded border transition-all duration-200
                ${isSelected
                                    ? 'bg-dungeon-800/80 border-gold-500/50 shadow-sm'
                                    : 'bg-dungeon-950/30 border-transparent hover:bg-dungeon-800/30'
                                }
              `}
                        >
                            <div className={`
                w-4 h-4 rounded border flex items-center justify-center transition-colors
                ${isSelected
                                    ? 'bg-gold-500 border-gold-500 text-dungeon-950'
                                    : 'border-dungeon-600 bg-dungeon-950'
                                }
              `}>
                                {isSelected && <Check className="w-3 h-3" />}
                            </div>

                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleBook(book.id)}
                                className="hidden"
                            />

                            <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <span className={`text-sm truncate ${isRecommended ? 'text-dungeon-100 font-medium' : 'text-dungeon-400'}`}>
                                        {book.title_es}
                                    </span>
                                    {book.is_core && (
                                        <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 border-gold-500/30 text-gold-500">Core</Badge>
                                    )}
                                </div>

                                {book.difficulty === 'advanced' && (
                                    <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5">
                                        <AlertCircle className="h-3 w-3" /> Contenido Avanzado
                                    </span>
                                )}
                            </div>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}
