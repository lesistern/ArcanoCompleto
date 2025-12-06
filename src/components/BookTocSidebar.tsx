'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Book, BookOpen, Search, X } from 'lucide-react';
import bookSummary from '@/lib/data/book-summary.json';

interface Chapter {
  title: string;
  page: number;
}

interface BookData {
  slug: string;
  name: string;
  filename: string;
  toc_count: number;
  chapters: Chapter[];
}

// Categorizar libros por nombre
function categorizeBook(name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('monster manual') || lowerName.includes('fiend folio')) return 'Monstruos';
  if (lowerName.includes('complete')) return 'Serie Completa';
  if (lowerName.includes('races of')) return 'Razas';
  if (lowerName.includes('player') || lowerName.includes('jugador')) return 'Manual del Jugador';
  if (lowerName.includes('dungeon master') || lowerName.includes('dmg')) return 'Guía del DM';
  if (lowerName.includes('magic') || lowerName.includes('spell') || lowerName.includes('arcane')) return 'Magia';
  if (lowerName.includes('tome of')) return 'Tomos';
  if (lowerName.includes('codex')) return 'Códices';
  if (lowerName.includes('handbook')) return 'Manuales';
  return 'Suplementos';
}

// Nombres en español para libros conocidos
const SPANISH_NAMES: Record<string, string> = {
  'PlayersHandbookI': 'Manual del Jugador I',
  'PlayersHandbookII': 'Manual del Jugador II',
  'DungeonMastersGuide': 'Guía del Dungeon Master',
  'DungeonMastersGuideII': 'Guía del DM II',
  'MonsterManualI': 'Manual de Monstruos I',
  'MonsterManualII': 'Manual de Monstruos II',
  'MonsterManualIII': 'Manual de Monstruos III',
  'MonsterManualIV': 'Manual de Monstruos IV',
  'MonsterManualV': 'Manual de Monstruos V',
  'Complete Adventurer': 'Aventurero Completo',
  'Complete Arcane': 'Arcano Completo',
  'Complete Warrior': 'Guerrero Completo',
  'CompleteChampion': 'Campeón Completo',
  'CompleteDivine': 'Divino Completo',
  'CompleteMage': 'Mago Completo',
  'CompletePsionic': 'Psiónico Completo',
  'CompleteScoundrel': 'Sinvergüenza Completo',
  'Spell Compendium': 'Compendio de Conjuros',
  'Magic Item Compendium': 'Compendio de Objetos Mágicos',
  'Rules Compendium': 'Compendio de Reglas',
  'Unearthed Arcana': 'Arcana Desenterrada',
  'Deities And Demigods': 'Deidades y Semidioses',
  'Fiend Folio': 'Compendio de Demonios',
  'Manual Of The Planes': 'Manual de los Planos',
  'Expanded Psionics Handbook': 'Manual Psiónico',
  'Tome of Battle': 'Tomo de Batalla',
  'Tome of Magic': 'Tomo de Magia',
  'Races of Destiny': 'Razas del Destino',
  'Races of Stone': 'Razas de Piedra',
  'Races of the Dragon': 'Razas del Dragón',
  'Races of the Wild': 'Razas de lo Salvaje',
  'Libris Mortis': 'Libris Mortis',
  'Lords of Madness': 'Señores de la Locura',
  'Heroes of Horror': 'Héroes del Horror',
  'Draconomicon': 'Draconomicón',
  'Dragon Magic': 'Magia Dracónica',
  'Frostburn': 'Quemadura Gélida',
  'Sandstorm': 'Tormenta de Arena',
  'Stormwrack': 'Azote de Tormentas',
  'Cityscape': 'Paisaje Urbano',
  'Dungeonscape': 'Paisaje de Mazmorra',
};

function getSpanishName(name: string): string {
  return SPANISH_NAMES[name] || name;
}

export default function BookTocSidebar() {
  const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Manual del Jugador', 'Guía del DM']));
  const [searchTerm, setSearchTerm] = useState('');

  const books = bookSummary.books as BookData[];

  // Agrupar libros por categoría
  const categorizedBooks = useMemo(() => {
    const categories: Record<string, BookData[]> = {};

    books.forEach(book => {
      const category = categorizeBook(book.name);
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(book);
    });

    // Ordenar categorías
    const order = ['Manual del Jugador', 'Guía del DM', 'Monstruos', 'Serie Completa', 'Razas', 'Magia', 'Manuales', 'Tomos', 'Códices', 'Suplementos'];
    const sorted: Record<string, BookData[]> = {};
    order.forEach(cat => {
      if (categories[cat]) {
        sorted[cat] = categories[cat].sort((a, b) => a.name.localeCompare(b.name));
      }
    });

    return sorted;
  }, [books]);

  // Filtrar libros por búsqueda
  const filteredBooks = useMemo(() => {
    if (!searchTerm) return categorizedBooks;

    const term = searchTerm.toLowerCase();
    const filtered: Record<string, BookData[]> = {};

    Object.entries(categorizedBooks).forEach(([category, bookList]) => {
      const matchingBooks = bookList.filter(book =>
        book.name.toLowerCase().includes(term) ||
        getSpanishName(book.name).toLowerCase().includes(term) ||
        book.chapters.some(ch => ch.title.toLowerCase().includes(term))
      );
      if (matchingBooks.length > 0) {
        filtered[category] = matchingBooks;
      }
    });

    return filtered;
  }, [categorizedBooks, searchTerm]);

  const toggleBook = (slug: string) => {
    setExpandedBooks(prev => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  return (
    <div className="w-72 bg-dungeon-900 border-r border-dungeon-700 h-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-dungeon-700">
        <h2 className="text-lg font-bold text-gold-400 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Índice de Libros
        </h2>
        <p className="text-xs text-dungeon-400 mt-1">
          {books.length} libros disponibles
        </p>
      </div>

      {/* Búsqueda */}
      <div className="p-3 border-b border-dungeon-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dungeon-400" />
          <input
            type="text"
            placeholder="Buscar libro o capítulo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-dungeon-800 border border-dungeon-600 rounded-lg text-sm text-dungeon-200 placeholder-dungeon-500 focus:outline-none focus:border-gold-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-dungeon-400 hover:text-dungeon-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Lista de libros */}
      <div className="flex-1 overflow-y-auto p-2">
        {Object.entries(filteredBooks).map(([category, bookList]) => (
          <div key={category} className="mb-2">
            {/* Categoría */}
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center gap-2 px-2 py-2 text-sm font-semibold text-gold-400 hover:bg-dungeon-800 rounded-lg transition-colors"
            >
              {expandedCategories.has(category) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              {category}
              <span className="text-xs text-dungeon-500 ml-auto">
                {bookList.length}
              </span>
            </button>

            {/* Libros de la categoría */}
            {expandedCategories.has(category) && (
              <div className="ml-2 mt-1 space-y-1">
                {bookList.map(book => (
                  <div key={book.slug} className="border-l border-dungeon-700 pl-2">
                    {/* Libro */}
                    <button
                      onClick={() => toggleBook(book.slug)}
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-dungeon-300 hover:text-gold-300 hover:bg-dungeon-800 rounded transition-colors group"
                    >
                      {expandedBooks.has(book.slug) ? (
                        <ChevronDown className="h-3 w-3 text-dungeon-500" />
                      ) : (
                        <ChevronRight className="h-3 w-3 text-dungeon-500" />
                      )}
                      <Book className="h-3.5 w-3.5 text-dungeon-500 group-hover:text-gold-500" />
                      <span className="truncate flex-1 text-left">
                        {getSpanishName(book.name)}
                      </span>
                    </button>

                    {/* Capítulos del libro */}
                    {expandedBooks.has(book.slug) && (
                      <div className="ml-6 mt-1 space-y-0.5 pb-2">
                        {book.chapters
                          .filter(ch => !ch.title.toLowerCase().includes('cover') && !ch.title.toLowerCase().includes('contents'))
                          .slice(0, 12)
                          .map((chapter, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 px-2 py-1 text-xs text-dungeon-400 hover:text-dungeon-200 hover:bg-dungeon-800/50 rounded cursor-pointer transition-colors"
                            >
                              <span className="text-dungeon-600 w-6 text-right">
                                {chapter.page}
                              </span>
                              <span className="truncate">
                                {chapter.title}
                              </span>
                            </div>
                          ))}
                        {book.chapters.length > 12 && (
                          <div className="text-xs text-dungeon-500 pl-8 italic">
                            +{book.chapters.length - 12} más...
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {Object.keys(filteredBooks).length === 0 && (
          <div className="text-center py-8 text-dungeon-500">
            <Book className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No se encontraron libros</p>
          </div>
        )}
      </div>
    </div>
  );
}
