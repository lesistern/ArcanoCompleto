'use client';

import { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import ClassCard from '@/components/classes/ClassCard';
import { DnDClass } from '@/lib/types/class';

interface SupplementalClassesSectionProps {
  classes: DnDClass[];
}

const CATEGORY_FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'Marciales', label: 'Marciales' },
  { id: 'Mágicas', label: 'Mágicas' },
  { id: 'Versátiles', label: 'Versátiles' },
];

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
  if (classData.classType) {
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

export default function SupplementalClassesSection({ classes }: SupplementalClassesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
      // Filtro por categoría
      if (selectedCategory !== 'all') {
        const classCategory = getCategoryForClass(classData);
        if (classCategory !== selectedCategory) return false;
      }

      // Filtro por libros (si hay alguno seleccionado)
      if (selectedBooks.size > 0) {
        if (!classData.source?.book || !selectedBooks.has(classData.source.book)) return false;
      }

      return true;
    });
  }, [classes, selectedCategory, selectedBooks]);

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
      <h2 className="text-2xl font-bold text-gold-500 mb-6">
        Clases de Suplementos
      </h2>

      {/* Filtros */}
      <div className="bg-dungeon-800/50 rounded-lg p-4 mb-6 border border-dungeon-700">
        <div className="flex items-center gap-2 text-dungeon-300 mb-4">
          <Filter className="h-5 w-5" />
          <span className="font-semibold">Filtros</span>
          <span className="text-dungeon-500 text-sm ml-2">
            ({filteredClasses.length} de {classes.length} clases)
          </span>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Filtro por categoría */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-dungeon-400 uppercase tracking-wide">Tipo</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_FILTERS.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCategory(filter.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === filter.id
                      ? 'bg-gold-500 text-dungeon-900'
                      : 'bg-dungeon-700 text-dungeon-300 hover:bg-dungeon-600'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Botón limpiar filtros de categoría */}
          {selectedCategory !== 'all' && (
            <div className="flex flex-col gap-2 justify-end">
              <span className="text-xs text-transparent">.</span>
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-3 py-1.5 rounded-md text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors"
              >
                Limpiar tipo
              </button>
            </div>
          )}
        </div>

        {/* Filtro por libros (pills multi-select) */}
        <div className="flex flex-col gap-2 mt-4">
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
                    ? 'bg-gold-500 text-dungeon-900'
                    : 'bg-dungeon-700 text-dungeon-300 hover:bg-dungeon-600'
                }`}
              >
                {book}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clases filtradas */}
      {filteredClasses.length === 0 ? (
        <div className="text-center py-12 text-dungeon-400">
          <p>No se encontraron clases con los filtros seleccionados.</p>
        </div>
      ) : selectedCategory !== 'all' ? (
        // Si hay un filtro de categoría específico, mostrar sin agrupar
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredClasses.map((classData) => (
            <ClassCard key={classData.slug} classData={classData} />
          ))}
        </div>
      ) : (
        // Si es "Todas", mostrar agrupadas por categoría
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
