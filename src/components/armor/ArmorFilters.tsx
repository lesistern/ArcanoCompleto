import { Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ARMOR_TYPES, type ArmorType } from '@/lib/utils/armor-categorizer';

interface ArmorFiltersProps {
  selectedType: ArmorType;
  searchTerm: string;
  onTypeChange: (type: string) => void;
  onSearchChange: (term: string) => void;
  totalArmors: number;
  filteredCount: number;
}

/**
 * Filter component for armor listing
 * Allows filtering by type and searching by name
 */
export function ArmorFilters({
  selectedType,
  searchTerm,
  onTypeChange,
  onSearchChange,
  totalArmors,
  filteredCount,
}: ArmorFiltersProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search Input */}
          <div>
            <label className="text-sm font-semibold text-dungeon-300 mb-2 block">
              Buscar armadura
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dungeon-400" />
              <input
                type="text"
                placeholder="Ej: Coraza, Escudo..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          {/* Type Filter Buttons */}
          <div>
            <label className="text-sm font-semibold text-dungeon-300 mb-2 block">
              Tipo de armadura
            </label>
            <div className="flex flex-wrap gap-2">
              {ARMOR_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => onTypeChange(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === type
                      ? 'bg-gold-600 text-dungeon-900'
                      : 'bg-dungeon-700 text-dungeon-300 hover:bg-dungeon-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Results Counter */}
          <div className="text-sm text-dungeon-400">
            Mostrando{' '}
            <span className="text-gold-400 font-semibold">{filteredCount}</span> de{' '}
            <span className="text-dungeon-300 font-semibold">{totalArmors}</span>{' '}
            armaduras
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
