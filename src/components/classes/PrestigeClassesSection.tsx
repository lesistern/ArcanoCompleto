'use client';

import { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import ClassCard from '@/components/classes/ClassCard';
import { DnDClass } from '@/lib/types/class';

interface PrestigeClassesSectionProps {
  classes: DnDClass[];
}

// Mapping de categorías en inglés a español
const CATEGORY_MAP: Record<string, string> = {
  'martial': 'Marciales',
  'magical': 'Mágicas',
  'versatile': 'Versátiles',
  'Marciales': 'Marciales',
  'Mágicas': 'Mágicas',
  'Versátiles': 'Versátiles',
};

function getCategoryForClass(classData: DnDClass): string {
  // Primero verificar si tiene categoría definida en classType o source
  // La BD usa 'prestigio' (español), no 'prestige' (inglés)
  if (classData.classType && classData.classType !== 'prestigio') {
    const categoryFromType = CATEGORY_MAP[classData.classType];
    if (categoryFromType) return categoryFromType;
  }

  // Si no, inferir de las características
  const hasMagic = classData.spellcasting || classData.hasMagic;
  const isMartial = classData.goodSaves?.includes('Fortaleza') &&
    (classData.hitDie === 'd10' || classData.hitDie === 'd12');

  if (hasMagic && isMartial) return 'Versátiles';
  if (hasMagic) return 'Mágicas';
  return 'Marciales';
}

export default function PrestigeClassesSection({ classes }: PrestigeClassesSectionProps) {
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());

  // Extraer lista única de libros
  const availableBooks = useMemo(() => {
    const books = new Set<string>();
    classes.forEach(c => {
      if (c.source?.book) {
        books.add(c.source.book);
      }
    });
    return Array.from(books).sort();
  }, [classes]);

  // Toggle selección de libro
  const toggleBook = (book: string) => {
    setSelectedBooks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(book)) {
        newSet.delete(book);
      } else {
        newSet.add(book);
      }
      return newSet;
    });
  };

  // Limpiar todos los libros seleccionados
  const clearBooks = () => {
    setSelectedBooks(new Set());
  };

  // Filtrar clases según selección
  const filteredClasses = useMemo(() => {
    return classes.filter(classData => {
      // Filtro por libros (si hay alguno seleccionado)
      if (selectedBooks.size > 0) {
        if (!classData.source?.book || !selectedBooks.has(classData.source.book)) return false;
      }

      return true;
    });
  }, [classes, selectedBooks]);

  // Agrupar clases filtradas por categoría
  const classesByCategory = useMemo(() => {
    const grouped: Record<string, DnDClass[]> = {
      'Marciales': [],
      'Mágicas': [],
      'Versátiles': [],
    };

    filteredClasses.forEach(classData => {
      const category = getCategoryForClass(classData);
      if (grouped[category]) {
        grouped[category].push(classData);
      }
    });

    // Ordenar cada grupo por libro y nombre
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        const bookA = a.source?.book || '';
        const bookB = b.source?.book || '';
        if (bookA !== bookB) return bookA.localeCompare(bookB);
        return a.name.localeCompare(b.name);
      });
    });

    return grouped;
  }, [filteredClasses]);

  const categoryOrder = ['Marciales', 'Mágicas', 'Versátiles'];

  return (
    <section>
      {/* Filtros */}
      {availableBooks.length > 1 && (
        <div className="bg-dungeon-800/50 rounded-lg p-4 mb-6 border border-dungeon-700">
          <div className="flex items-center gap-2 text-dungeon-300 mb-4">
            <Filter className="h-5 w-5" />
            <span className="font-semibold">Filtrar por Libro</span>
            <span className="text-dungeon-500 text-sm ml-2">
              ({filteredClasses.length} de {classes.length} clases)
            </span>
          </div>

          {/* Filtro por libros (pills multi-select) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-dungeon-400 uppercase tracking-wide">
                Libros {selectedBooks.size > 0 && `(${selectedBooks.size} seleccionados)`}
              </span>
              {selectedBooks.size > 0 && (
                <button
                  onClick={clearBooks}
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="h-3 w-3" />
                  Limpiar
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {availableBooks.map(book => (
                <button
                  key={book}
                  onClick={() => toggleBook(book)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedBooks.has(book)
                      ? 'bg-purple-500 text-white'
                      : 'bg-dungeon-700 text-dungeon-300 hover:bg-dungeon-600'
                  }`}
                >
                  {book}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Clases filtradas */}
      {filteredClasses.length === 0 ? (
        <div className="text-center py-12 text-dungeon-400">
          <p>No se encontraron clases de prestigio con los filtros seleccionados.</p>
        </div>
      ) : (
        // Mostrar agrupadas por categoría
        categoryOrder.map(category => {
          const categoryClasses = classesByCategory[category];
          if (!categoryClasses || categoryClasses.length === 0) return null;

          return (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold text-dungeon-200 mb-4 flex items-center gap-2">
                {category}
                <span className="text-sm text-dungeon-500 font-normal">
                  ({categoryClasses.length})
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {categoryClasses.map((classData) => (
                  <ClassCard key={classData.slug} classData={classData} />
                ))}
              </div>
            </div>
          );
        })
      )}
    </section>
  );
}
